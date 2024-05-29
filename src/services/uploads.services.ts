import { GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import client from "../utils/clientS3.handdle";
import { Types } from "mongoose";
import "dotenv/config";

import { AWS_BUCKET_NAME } from "../config/aws.config";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

//inserta una imagen en el bucket de S3
const insertProfilePhotoAnimal = async (file: Express.Multer.File, animalId: string) => {
  if (!Types.ObjectId.isValid(animalId))
    return { messge: 'INVALID_ID' };

  const uploadParams = {
    Bucket: AWS_BUCKET_NAME,
    Key: `${animalId}/profile-photo/${file.originalname}`, //crea el orden de la carpetas en S3
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


const insertPhotoPerfilGlobal = async (file: Express.Multer.File, subjectId: string, subjetType: number) => {
  //todo: TYPES: (1 -> Animals), (2 -> Clients), (3 -> Enterprise)
  if (!Types.ObjectId.isValid(subjectId))
    return { messge: 'INVALID_ID' };

  const nameType: string = subjetType === 1 ? 'Animals' : subjetType === 2 ? 'Clients' : 'Enterprise';
  const uploadParams = {
    Bucket: AWS_BUCKET_NAME,
    Key: `${nameType}/profile-photo/${subjectId}/${file.originalname}`,
    Body: file.buffer,
    ContentType: file.mimetype,
  };

  try {
    const comand = new PutObjectCommand(uploadParams);
    const response = await client.send(comand);

    if (response.$metadata.httpStatusCode === 200)
      return {
        path: `${nameType}/profile-photo/${subjectId}/${file.originalname}`,
        status: true,
      };
    else
      return { status: false, message: 'ERROR_UPLOAD_PHOTO' };
  } catch (e) {
    console.log('ERROR_UPLOAD_PHOTO_S3', e);
    throw e;
  }
};

//obtiene la informacion de la imagen en S3, el metadato
const getProfileInfo = async (animalId: string, fileName: string) => {
  if (!Types.ObjectId.isValid(animalId))
    return { messge: 'INVALID_ID' };
  try {
    const key = `${animalId}/profile-photo/${fileName}`;
    const comand = new GetObjectCommand({ Bucket: AWS_BUCKET_NAME, Key: key });
    const response = await client.send(comand);

    if (response.$metadata.httpStatusCode === 200)
      return { metadata: response.$metadata };
    else
      return { message: '_ERROR_INFO_PHOTO_S3' };
  } catch (e) {
    console.log('ERROR_GET_INFO_PHOTO_S3', e);
    throw e;
  }
};

//obtine el url verificado de la imagen para que todos la puedan ver 
const getProfileUrl = async (animalId: string, fileName: string) => {
  try {
    const key = `${animalId}/profile-photo/${fileName}`;
    const comand = new GetObjectCommand({ Bucket: AWS_BUCKET_NAME, Key: key });
    const response = await getSignedUrl(client, comand, { expiresIn: parseInt(<string>process.env.TIME_S3) }); //7 dias
    return { urlProfile: response };
  } catch (e) {
    console.log('ERROR_GET_URL_PHOTO_S3', e);
    throw e;
  }
};

//obtine el url verificado de la imagen para que todos la puedan ver 
const getDataUrlGlobal = async (subjectId: string, fileName: string, typeSubjet: number) => {
  try {
    const nameType: string = typeSubjet === 1 ? 'Animals' : typeSubjet === 2 ? 'Clients' : 'Enterprise';

    const key = `${nameType}/profile-photo/${subjectId}/${fileName}`;
    const comand = new GetObjectCommand({ Bucket: AWS_BUCKET_NAME, Key: key });
    const response = await getSignedUrl(client, comand, { expiresIn: parseInt(<string>process.env.TIME_S3) }); //7 dias
    return { urlProfile: response };
  } catch (e) {
    console.log('ERROR_GET_URL_PHOTO_S3', e);
    throw e;
  }
};

export { insertProfilePhotoAnimal, getProfileUrl, getProfileInfo, insertPhotoPerfilGlobal, getDataUrlGlobal };