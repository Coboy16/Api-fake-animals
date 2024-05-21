import express from "express";
// import fileUpload from "express-fileupload";
import cors from "cors";
import "dotenv/config";

import db from "./config/mongo.config"
import { router } from "./routes";


const PORT = process.env.PORT || 3001;
const app = express();

app.use(cors());
// app.use(fileUpload());
app.use(express.json());
app.use(router);

db().then(() => console.log('Ready Data Base'));
app.listen(PORT, () => console.log(`Ready port: ${PORT}`));

