import User from "../models/User.js";

// Lấy thông tin tài khoản (profile)
export const getMyProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    if (!user)
      return res.status(404).json({ message: "Không tìm thấy tài khoản" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Lỗi khi lấy thông tin tài khoản" });
  }
};

// Cập nhật thông tin tài khoản
export const updateMyProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user)
      return res.status(404).json({ message: "Không tìm thấy tài khoản" });

    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) user.password = req.body.password;

    const updated = await user.save();
    res.json({
      _id: updated._id,
      name: updated.name,
      email: updated.email,
      role: updated.role,
    });
  } catch (err) {
    res.status(500).json({ message: "Lỗi khi cập nhật tài khoản" });
  }
};

// Người dùng tự xóa tài khoản
export const deleteMyAccount = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.user._id);
    res.json({ message: "Tài khoản của bạn đã bị xóa" });
  } catch (err) {
    res.status(500).json({ message: "Lỗi khi xóa tài khoản" });
  }
};

// Admin xóa tài khoản bất kỳ
export const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "Người dùng đã bị xóa bởi admin" });
  } catch (err) {
    res.status(500).json({ message: "Lỗi khi xóa tài khoản" });
  }
};
