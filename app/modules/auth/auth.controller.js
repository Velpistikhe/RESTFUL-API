const cookieOptions = require("../../config/cookieOptions");
const prisma = require("../../config/prismaClient");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res, next) => {
  const { username, nama, password } = req.body;

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

const login = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const existUser = await prisma.tD_User.findUnique({
      where: {
        username,
      },
    });

    if (!existUser)
      return res.status(401).json({
        success: false,
        message: "Login gagal! Silahkan login kembali",
      });

    const compare = await bcrypt.compare(password, existUser.password);

    if (!compare)
      return res.status(401).json({
        success: false,
        message: "Login gagal! Silahkan login kembali",
      });

    const token = jwt.sign({ id: existUser.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.cookie("Authorization", `Bearer ${token}`, {
      ...cookieOptions,
      maxAge: 2 * 60 * 60 * 1000,
    });

    res.status(200).json({ success: true, message: "Berhasil Login" });
  } catch (error) {
    next(error);
  }
};

const profile = async (req, res, next) => {
  try {
    const { id } = req.user;

    const user = await prisma.tD_User.findUnique({
      where: {
        id: id,
      },
    });

    if (!user) {
      res.clearCookie("Authorization", cookieOptions);

      return res
        .status(401)
        .json({ success: false, message: "Invalid Credentials" });
    }

    setTimeout(() => {
      res.status(200).json({
        success: true,
        user: { nama: user.nama, role: user.role === 0 ? "Admin" : "Staff" },
      });
    }, 3000);
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  res.clearCookie("Authorization", cookieOptions);

  res.status(200).json({ success: true, message: "Berhasil Logout" });
};

module.exports = { register, login, logout, profile };
