import { GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { Types } from "mongoose";
import "dotenv/config";

import { AWS_BUCKET_NAME } from "../config/aws.config";
import client from "../utils/clientS3.handdle";


//Inserta una foto en el bucket de S3 creando el orden de carpeta => Animals/photos/001/foto.png
const insertPhotoPerfilGlobal = async (file: Express.Multer.File, subjectId: string, subjetType: number, nameFile: boolean) => {
  //todo: TYPES: (1 -> Animals), (2 -> Clients), (3 -> Enterprise)
  //todo: NAMEFILE: (true -> 'profile-photo'), (false -> 'photos)

  if (!Types.ObjectId.isValid(subjectId))
    return { message: 'INVALID_ID' };

  const nameType: string = subjetType === 1 ? 'Animals' : subjetType === 2 ? 'Clients' : 'Enterprise';
  const nameFileKey: string = nameFile ? 'profile-photo' : 'photos';

  const uploadParams = {
    Bucket: AWS_BUCKET_NAME,
    Key: `${nameType}/${nameFileKey}/${subjectId}/${file.originalname}`,
    Body: file.buffer,
    ContentType: file.mimetype,
  };

  try {
    const comand = new PutObjectCommand(uploadParams);
    const response = await client.send(comand);

    if (response.$metadata.httpStatusCode === 200)
      return {
        path: `${nameType}/${nameFileKey}/${subjectId}/${file.originalname}`,
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
  //Todo: Mejorar con la nueva key para que sea gobla
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
const getDataUrlGlobal = async (subjectId: string, fileName: string, typeSubjet: number, nameFile: boolean) => {
  //todo: TYPES: (1 -> Animals), (2 -> Clients), (3 -> Enterprise)
  //todo: NAMEFILE: (true -> 'profile-photo'), (false -> 'photos)

  try {
    const nameType: string = typeSubjet === 1 ? 'Animals' : typeSubjet === 2 ? 'Clients' : 'Enterprise';
    const nameFileKey: string = nameFile ? 'profile-photo' : 'photos';
    const key = `${nameType}/${nameFileKey}/${subjectId}/${fileName}`;

    const comand = new GetObjectCommand({ Bucket: AWS_BUCKET_NAME, Key: key });
    const response = await getSignedUrl(client, comand, { expiresIn: parseInt(<string>process.env.TIME_S3) }); //6 dias
    return { urlProfile: response };
  } catch (e) {
    console.log('ERROR_GET_URL_PHOTO_S3', e);
    throw e;
  }
};

//Estructura de carpertas en S3: 
// animals/ --> 
// 	      0000001/ -->
// 		           profile-photo/ -->
// 			                      image-perro-centro.png
// 		           photos/ -->
// 		                 image-perro-costado.png
// 		                 image-perro-dormido.png
// 		                 image-perro-jugando.png
// clients/ --> 
// 	      0000001/ -->
// 		           profile-photo/ -->
// 			                      image-client-perfil.png
// enterprise/ -->
// 	         0000001/ -->
// 		             profile-photo/ -->
// 			                        image-enterprise-centro.png
// 		             photos/ -->
// 		                   image-enterprise-costado.png
// 		                   image-enterprise-dormido.png
// 		                   image-enterprise-jugando.png

export { getProfileInfo, insertPhotoPerfilGlobal, getDataUrlGlobal };