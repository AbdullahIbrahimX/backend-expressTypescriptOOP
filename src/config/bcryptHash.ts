import bcrypt from "bcrypt";


export default async function (phrase: string, saltRounds: number) : Promise<string> {
    const salt = await bcrypt.genSalt(saltRounds);
    return  await bcrypt.hash(phrase, salt);
}
