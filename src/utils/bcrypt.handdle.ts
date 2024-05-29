import { compare, hash } from "bcryptjs";

//ecripta la contraseña
const encrypPass = async (pass: string) => await hash(pass, 8);

//verifica la contraseña
const verifedPass = async (pass: string, passHash: string) => await compare(pass, passHash);

export { encrypPass, verifedPass };