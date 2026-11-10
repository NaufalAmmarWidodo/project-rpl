import prisma from "../config/prisma.js";

// GET ALL SERVICE TYPES (Layanan Servis)
export async function getServiceTypes(_req, res, next) {
  try {
    const types = await prisma.serviceType.findMany({
      where: { isActive: true },
      orderBy: { name: "asc" },
    });

    return res.json({
      success: true,
      data: types,
    });
  } catch (err) {
    next(err);
  }
}

// GET SERVICE TICKETS (Admin gets all, Customer gets own)
export async function getServiceTickets(req, res, next) {
  try {
    const { status } = req.query;
    const where = {};

    if (req.user.role !== "ADMIN") {
      where.userId = req.user.id;
    }

    if (status) {
      where.status = status;
    }

    const tickets = await prisma.serviceRequest.findMany({
      where,
      include: {
        user: { select: { id: true, fullName: true, email: true, phone: true } },
        serviceType: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return res.json({
      success: true,
      data: tickets,
    });
  } catch (err) {
    next(err);
  }
}

// CREATE SERVICE TICKET (Customer Booking Teknisi)
export async function createServiceTicket(req, res, next) {
  try {
    const {
      serviceTypeId,
      machineBrand,
      machineModel,
      machineSerial,
      problemDescription,
      serviceAddress,
      preferredAt,
    } = req.body;

    if (!serviceTypeId || !machineBrand || !problemDescription || !serviceAddress) {
      return res.status(400).json({
        success: false,
        message: "Lengkapi data wajib: tipe layanan, merek mesin, deskripsi kendala, dan alamat kunjungan",
      });
    }

    const ticket = await prisma.serviceRequest.create({
      data: {
        userId: req.user.id,
        serviceTypeId,
        machineBrand,
        machineModel,
        machineSerial,
        problemDescription,
        serviceAddress,
        preferredAt: preferredAt ? new Date(preferredAt) : null,
        status: "PENDING",
      },
      include: {
        serviceType: true,
      },
    });

    return res.status(201).json({
      success: true,
      message: "Tiket perbaikan mesin fotocopy berhasil dibuat!",
      data: ticket,
    });
  } catch (err) {
    next(err);
  }
}

// UPDATE TICKET (Admin Assign Technician, Diagnosis, Cost, Status)
export async function updateServiceTicket(req, res, next) {
  try {
    const { id } = req.params;
    const { status, estimatedCost, finalCost, notes } = req.body;

    const updated = await prisma.serviceRequest.update({
      where: { id },
      data: {
        ...(status && { status }),
        ...(estimatedCost !== undefined && { estimatedCost: Number(estimatedCost) }),
        ...(finalCost !== undefined && { finalCost: Number(finalCost) }),
        ...(notes && { notes }),
      },
      include: {
        user: { select: { id: true, fullName: true, phone: true } },
        serviceType: true,
      },
    });

    return res.json({
      success: true,
      message: "Data tiket service berhasil diperbarui",
      data: updated,
    });
  } catch (err) {
    next(err);
  }
}
