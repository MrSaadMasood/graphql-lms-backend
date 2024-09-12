import express from 'express';
import multer from 'multer';
import { csvUploadController } from './csvUploadController.js';
const storage = multer.diskStorage({
  destination(_req, _file, callback) {
    return callback(null, 'uploads/');
  },
  filename(_req, file, callback) {
    const filename = `${Date.now()}-${Math.floor(Math.random() * 1000000)}-${file.fieldname}.csv`;
    return callback(null, filename);
  },
});
const upload = multer({
  storage,
  fileFilter(_req, file, callback) {
    return file.mimetype === 'text/csv'
      ? callback(null, true)
      : callback(Error('incorrect file'));
  },
  limits: { fileSize: 25 * 1000000 },
});
const router = express.Router();
router.post('/', upload.single('csv'), csvUploadController);
export default router;
