import prisma from "@/lib/prisma";
import crypto from "crypto";

export const generateToken = async (email: string) => {

  const findUser = await prisma.users.findUnique({ where: { email: email }, select:{id:true, email:true} } );
  if (findUser?.email === undefined) return null

  const token:string= crypto.randomBytes(36).toString("hex")
  const expire_at= new Date(Date.now()+1000*60*60)

  await prisma.reset_password_token.deleteMany({where:{user_id:findUser.id}})

   await prisma.reset_password_token.create({data:{
    user_id:findUser.id,
    token:token,
    expire_at:expire_at,
  }})

  return token
};
