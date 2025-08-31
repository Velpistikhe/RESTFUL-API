const prisma = require("../../config/prismaClient");
const bcrypt = require("bcryptjs");

const register = async (req, res, next) => {
  const { username, nama, role, password } = req.body;

  try {
    const existingUser = await prisma.tD_User.findUnique({
      where: {
        username,
      },
    });

    if (existingUser)
      return res
        .status(409)
        .json({ success: false, message: "Username sudah digunakan" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await prisma.$transaction(async (tx) => {
      const user = await tx.tD_User.create({
        data: {
          username,
          nama: nama,
          role: parseInt(role),
          password: hashedPassword,
        },
      });

      await tx.tH_User.create({
        data: {
          userId: user.id,
          action: 1,
        },
      });

      return user;
    });

    const { password: _, ...safeUser } = newUser;

    res.status(201).json({
      success: true,
      message: "User berhasil ditambahkan",
      user: safeUser,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { register };
