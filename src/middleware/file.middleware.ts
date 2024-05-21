import multer from "multer";

// Usamos memoria para almacenar el archivo temporalmente antes de subirlo a S3
const storage = multer.memoryStorage();
const upload = multer({ storage });

export { upload };