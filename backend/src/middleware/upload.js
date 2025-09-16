import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

// Fix __dirname trong ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Setup storage
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, path.join(__dirname, "../../uploads/")); // lưu trong thư mục uploads
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname.replace(/\s+/g, "_")}`);
  },
});

// Filter chỉ cho phép ảnh
function fileFilter(req, file, cb) {
  const allowed = ["image/jpeg", "image/png", "image/jpg"];
  if (allowed.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only .jpg, .jpeg, .png allowed!"), false);
  }
}

const upload = multer({ storage, fileFilter });

export default upload;
