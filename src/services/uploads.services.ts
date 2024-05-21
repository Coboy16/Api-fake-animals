import { PutObjectCommand } from "@aws-sdk/client-s3";
import { Types } from "mongoose";

import client from "../utils/clientS3.handdle";
import { AWS_BUCKET_NAME } from "../config/aws.config";


const insertProfilePhotoAnimal = async (file: Express.Multer.File, animalId: string) => {

  if (!Types.ObjectId.isValid(animalId))
    return { messge: 'INVALID_ID' };

  const uploadParams = {
    Bucket: AWS_BUCKET_NAME,
    Key: `profile-photo/${animalId}/${file.originalname}`, //crea el orden de la carpetas en S3
    Body: file.buffer,
    ContentType: file.mimetype,
  };

  try {
    const comand = new PutObjectCommand(uploadParams);
    const response = await client.send(comand);

    if (response.$metadata.httpStatusCode === 200)
      return {
        path: `profile-photo/${animalId}/${file.originalname}`,
        animalId: animalId,
        status: true,
      };
    else
      return { status: false, message: 'ERROR_UPLOAD_PHOTO' };
  } catch (e) {
    console.log('ERROR_UPLOAD_PHOTO_S3', e);
    throw e;
  }
};

export { insertProfilePhotoAnimal };