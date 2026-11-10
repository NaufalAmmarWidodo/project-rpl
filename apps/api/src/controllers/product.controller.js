import prisma from "../config/prisma.js";

// GET ALL PRODUCTS
export async function getAllProducts(req, res, next) {
  try {
    const { search, categoryId, lowStock, page = 1, limit = 20 } = req.query;

    const where = {};

    if (search) {
      where.OR = [
        { name: { contains: search } },
        { sku: { contains: search } },
        { description: { contains: search } },
      ];
    }

    if (categoryId) {
      where.categoryId = categoryId;
    }

    if (lowStock === "true") {
      where.stock = { lte: prisma.product.fields?.minStock || 5 };
    }

    const skip = (Number(page) - 1) * Number(limit);
    const take = Number(limit);

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        include: {
          category: { select: { id: true, name: true } },
          supplier: { select: { id: true, fullName: true, email: true } },
        },
        skip,
        take,
        orderBy: { createdAt: "desc" },
      }),
      prisma.product.count({ where }),
    ]);

    return res.json({
      success: true,
      data: products,
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

// GET PRODUCT BY ID
export async function getProductById(req, res, next) {
  try {
    const { id } = req.params;

    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        category: true,
        supplier: { select: { id: true, fullName: true, email: true } },
      },
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Produk tidak ditemukan",
      });
    }

    return res.json({
      success: true,
      data: product,
    });
  } catch (err) {
    next(err);
  }
}

// CREATE PRODUCT (ADMIN ONLY)
export async function createProduct(req, res, next) {
  try {
    const { categoryId, supplierId, sku, name, description, unit, price, stock, minStock } = req.body;

    const existingSku = await prisma.product.findUnique({
      where: { sku },
    });

    if (existingSku) {
      return res.status(409).json({
        success: false,
        message: `SKU '${sku}' sudah digunakan oleh produk lain`,
      });
    }

    const product = await prisma.product.create({
      data: {
        categoryId,
        supplierId: supplierId || null,
        sku,
        name,
        description,
        unit: unit || "pcs",
        price,
        stock: Number(stock) || 0,
        minStock: Number(minStock) || 0,
      },
    });

    return res.status(201).json({
      success: true,
      message: "Produk berhasil ditambahkan",
      data: product,
    });
  } catch (err) {
    next(err);
  }
}

// UPDATE PRODUCT (ADMIN ONLY)
export async function updateProduct(req, res, next) {
  try {
    const { id } = req.params;
    const { name, description, unit, price, stock, minStock, isActive, supplierId, categoryId } = req.body;

    const product = await prisma.product.update({
      where: { id },
      data: {
        ...(name && { name }),
        ...(description !== undefined && { description }),
        ...(unit && { unit }),
        ...(price !== undefined && { price }),
        ...(stock !== undefined && { stock: Number(stock) }),
        ...(minStock !== undefined && { minStock: Number(minStock) }),
        ...(isActive !== undefined && { isActive }),
        ...(supplierId !== undefined && { supplierId }),
        ...(categoryId !== undefined && { categoryId }),
      },
    });

    return res.json({
      success: true,
      message: "Produk berhasil diperbarui",
      data: product,
    });
  } catch (err) {
    next(err);
  }
}
