import multer from 'multer';
import path from 'path';
import { Request, Response } from 'express';

// Set up multer for multiple file uploads
const storage = multer.diskStorage({
  destination: (req: Request, file, cb) => {
    cb(null, './public/uploads'); 
  },
  filename: (req: Request, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req: Request, file, cb) => {
    if (!file.mimetype.startsWith('image/')) {
      return cb(null, false);
    }
    cb(null, true);
  },
});

export const uploadFiles = upload.array('imageUrls', 5);

// Set up multer for single file uploads
// const upload = multer({ storage });

// export const uploadSingleImage = (req: Request, res: Response): Promise<void> => {
//   return new Promise((resolve, reject) => {
//     upload.single('image')(req, res, (err: any) => {
//       if (err) {
//         reject(err);
//       } else {
//         resolve();
//       }
//     });
//   });
// };

// export { upload };