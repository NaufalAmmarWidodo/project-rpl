import prisma from "../config/prisma.js";

// GET ALL ORDERS (Admin gets all, Customer gets own)
export async function getAllOrders(req, res, next) {
  try {
    const { status, page = 1, limit = 20 } = req.query;

    const where = {};
    if (req.user.role !== "ADMIN") {
      where.userId = req.user.id;
    }

    if (status) {
      where.status = status;
    }

    const skip = (Number(page) - 1) * Number(limit);
    const take = Number(limit);

    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        where,
        include: {
          user: { select: { id: true, fullName: true, email: true, phone: true } },
          items: {
            include: {
              product: { select: { id: true, name: true, sku: true } },
            },
          },
          payments: true,
        },
        skip,
        take,
        orderBy: { createdAt: "desc" },
      }),
      prisma.order.count({ where }),
    ]);

    return res.json({
      success: true,
      data: orders,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        totalPages: Math.ceil(total / Number(limit)),
      },
    });
  } catch (err) {
    next(err);
  }
}

// GET ORDER BY ID
export async function getOrderById(req, res, next) {
  try {
    const { id } = req.params;

    const order = await prisma.order.findUnique({
      where: { id },
      include: {
        user: { select: { id: true, fullName: true, email: true, phone: true } },
        items: true,
        payments: true,
      },
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Pesanan tidak ditemukan",
      });
    }

    // Customer can only view their own order
    if (req.user.role !== "ADMIN" && order.userId !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Anda tidak memiliki akses ke pesanan ini",
      });
    }

    return res.json({
      success: true,
      data: order,
    });
  } catch (err) {
    next(err);
  }
}

// CREATE ORDER (CUSTOMER CHECKOUT)
export async function createOrder(req, res, next) {
  try {
    const { items, shippingAddress, notes, paymentMethod = "TRANSFER" } = req.body;

    if (!items || !items.length) {
      return res.status(400).json({
        success: false,
        message: "Pesanan harus memiliki minimal 1 item barang",
      });
    }

    // Fetch product pricing
    const productIds = items.map((i) => i.productId);
    const products = await prisma.product.findMany({
      where: { id: { in: productIds } },
    });

    let subtotal = 0;
    const orderItemsData = [];

    for (const item of items) {
      const prod = products.find((p) => p.id === item.productId);
      if (!prod) {
        return res.status(400).json({
          success: false,
          message: `Produk ID '${item.productId}' tidak ditemukan`,
        });
      }

      const itemSubtotal = Number(prod.price) * item.quantity;
      subtotal += itemSubtotal;

      orderItemsData.push({
        productId: prod.id,
        productName: prod.name,
        sku: prod.sku,
        quantity: item.quantity,
        unitPrice: prod.price,
        subtotal: itemSubtotal,
      });
    }

    const shippingCost = 0;
    const total = subtotal + shippingCost;
    const orderNumber = `ORD-${Date.now().toString().slice(-6)}`;

    // Create order and deduct stock in a transaction
    const order = await prisma.$transaction(async (tx) => {
      const newOrder = await tx.order.create({
        data: {
          orderNumber,
          userId: req.user.id,
          shippingAddress: shippingAddress || "Ambil di Toko",
          subtotal,
          shippingCost,
          total,
          status: "PENDING",
          notes,
          items: {
            create: orderItemsData,
          },
          payments: {
            create: {
              method: paymentMethod,
              amount: total,
              status: "PENDING",
            },
          },
        },
        include: {
          items: true,
          payments: true,
        },
      });

      // Deduct product stock & record StockMovement OUT
      for (const item of items) {
        await tx.product.update({
          where: { id: item.productId },
          data: { stock: { decrement: item.quantity } },
        });

        await tx.stockMovement.create({
          data: {
            productId: item.productId,
            actorId: req.user.id,
            type: "OUT",
            quantity: item.quantity,
            note: `Pengurangan untuk pesanan ${orderNumber}`,
          },
        });
      }

      return newOrder;
    });

    return res.status(201).json({
      success: true,
      message: "Pesanan berhasil dibuat",
      data: order,
    });
  } catch (err) {
    next(err);
  }
}

// UPDATE ORDER STATUS (ADMIN ONLY)
export async function updateOrderStatus(req, res, next) {
  try {
    const { id } = req.params;
    const { status, paymentStatus } = req.body;

    const order = await prisma.order.update({
      where: { id },
      data: {
        ...(status && { status }),
        ...(paymentStatus && { paymentStatus }),
      },
      include: {
        items: true,
        payments: true,
      },
    });

    return res.json({
      success: true,
      message: `Status pesanan berhasil diubah menjadi ${status || paymentStatus}`,
      data: order,
    });
  } catch (err) {
    next(err);
  }
}

// UPLOAD PAYMENT PROOF
export async function uploadPaymentProof(req, res, next) {
  try {
    const { id } = req.params;
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Berkas bukti pembayaran tidak ditemukan",
      });
    }

    const proofUrl = `/uploads/proofs/${req.file.filename}`;

    await prisma.payment.updateMany({
      where: { orderId: id },
      data: {
        proofUrl,
        status: "PAID",
      },
    });

    const updatedOrder = await prisma.order.update({
      where: { id },
      data: {
        paymentStatus: "PAID",
        status: "PROCESSING",
      },
      include: {
        payments: true,
      },
    });

    return res.json({
      success: true,
      message: "Bukti pembayaran berhasil diunggah dan diverifikasi",
      data: updatedOrder,
    });
  } catch (err) {
    next(err);
  }
}
