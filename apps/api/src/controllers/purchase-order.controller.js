import prisma from "../config/prisma.js";

// GET ALL PURCHASE ORDERS (Admin sees all, Supplier sees their own)
export async function getAllPurchaseOrders(req, res, next) {
  try {
    const { status, page = 1, limit = 20 } = req.query;

    const where = {};
    if (req.user.role === "SUPPLIER") {
      where.supplierId = req.user.id;
    }

    if (status) {
      where.status = status;
    }

    const skip = (Number(page) - 1) * Number(limit);
    const take = Number(limit);

    const [pos, total] = await Promise.all([
      prisma.purchaseOrder.findMany({
        where,
        include: {
          admin: { select: { id: true, fullName: true, email: true } },
          supplier: { select: { id: true, fullName: true, email: true, phone: true } },
          items: {
            include: {
              product: { select: { id: true, name: true, sku: true, stock: true } },
            },
          },
        },
        skip,
        take,
        orderBy: { createdAt: "desc" },
      }),
      prisma.purchaseOrder.count({ where }),
    ]);

    return res.json({
      success: true,
      data: pos,
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

// CREATE PURCHASE ORDER (ADMIN TO SUPPLIER)
export async function createPurchaseOrder(req, res, next) {
  try {
    const { supplierId, items, notes } = req.body;

    if (!supplierId || !items || !items.length) {
      return res.status(400).json({
        success: false,
        message: "Supplier dan minimal 1 item pasokan wajib diisi",
      });
    }

    let totalCost = 0;
    const poItemsData = items.map((item) => {
      const subtotal = Number(item.unitCost) * Number(item.quantity);
      totalCost += subtotal;
      return {
        productId: item.productId,
        quantity: Number(item.quantity),
        unitCost: item.unitCost,
        subtotal,
      };
    });

    const poNumber = `PO-${new Date().getFullYear()}-${Date.now().toString().slice(-4)}`;

    const po = await prisma.purchaseOrder.create({
      data: {
        poNumber,
        adminId: req.user.id,
        supplierId,
        status: "SUBMITTED",
        totalCost,
        notes,
        items: {
          create: poItemsData,
        },
      },
      include: {
        items: {
          include: { product: true },
        },
        supplier: true,
      },
    });

    return res.status(201).json({
      success: true,
      message: "Purchase Order restock berhasil diterbitkan",
      data: po,
    });
  } catch (err) {
    next(err);
  }
}

// SHIP PURCHASE ORDER (SUPPLIER CONFIRMS & INPUTS TRACKING RESI)
export async function shipPurchaseOrder(req, res, next) {
  try {
    const { id } = req.params;
    const { trackingRef } = req.body;

    const po = await prisma.purchaseOrder.findUnique({
      where: { id },
    });

    if (!po) {
      return res.status(404).json({
        success: false,
        message: "Purchase Order tidak ditemukan",
      });
    }

    if (req.user.role === "SUPPLIER" && po.supplierId !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Anda tidak memiliki wewenang untuk PO ini",
      });
    }

    const updatedPo = await prisma.purchaseOrder.update({
      where: { id },
      data: {
        status: "SHIPPED",
        trackingRef: trackingRef || "PENGIRIMAN-INTERNAL",
        shippedAt: new Date(),
      },
      include: {
        items: true,
      },
    });

    return res.json({
      success: true,
      message: "PO berhasil dikonfirmasi dan status diubah menjadi Dikirim (SHIPPED)",
      data: updatedPo,
    });
  } catch (err) {
    next(err);
  }
}

// RECEIVE PURCHASE ORDER (ADMIN MARKS AS RECEIVED -> INCREMENTS INVENTORY)
export async function receivePurchaseOrder(req, res, next) {
  try {
    const { id } = req.params;

    const po = await prisma.purchaseOrder.findUnique({
      where: { id },
      include: { items: true },
    });

    if (!po) {
      return res.status(404).json({
        success: false,
        message: "Purchase Order tidak ditemukan",
      });
    }

    if (po.status === "RECEIVED") {
      return res.status(400).json({
        success: false,
        message: "PO ini sudah pernah diterima sebelumnya",
      });
    }

    // Execute receiving & stock update inside a database transaction
    const receivedPo = await prisma.$transaction(async (tx) => {
      // 1. Update PO Status
      const updated = await tx.purchaseOrder.update({
        where: { id },
        data: {
          status: "RECEIVED",
          receivedAt: new Date(),
        },
      });

      // 2. Increment product stock & record StockMovement IN
      for (const item of po.items) {
        await tx.product.update({
          where: { id: item.productId },
          data: {
            stock: { increment: item.quantity },
          },
        });

        await tx.stockMovement.create({
          data: {
            productId: item.productId,
            actorId: req.user.id,
            type: "IN",
            quantity: item.quantity,
            note: `Penerimaan restock dari PO ${po.poNumber}`,
          },
        });
      }

      return updated;
    });

    return res.json({
      success: true,
      message: "Pasokan berhasil diterima di gudang! Stok barang otomatis bertambah.",
      data: receivedPo,
    });
  } catch (err) {
    next(err);
  }
}
