import { Router } from "express";
import { readdirSync } from "fs";

const PATH_ROUTER = `${__dirname}`;
const router = Router();

//Renombra el nombre del archivo: animals.ts = animals
const cleanFileName = (fileName: string) => {
  const file = fileName.split(".").shift();
  return file;
};

readdirSync(PATH_ROUTER).filter((fileName: string) => {
  const cleanName = cleanFileName(fileName);
  if (cleanName !== "index") {

    //importacion dinamica
    import(`./${cleanName}`).then((moduleRoute) => {
      if (moduleRoute.router) {
        router.use(`/${cleanName}`, moduleRoute.router);
      } else {
        console.error(`El módulo ${cleanName} no exporta un router válido.`);
      }
    });
  }
});



export { router };