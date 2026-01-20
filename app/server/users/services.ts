import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import { type NewUser, type LoginDetails } from "@/types/index";

export type Role = "user" | "admin";

export const register = async (data: NewUser) => {
  const userData = data;

  const toLowerCaseEmail = userData.email.trim().toLowerCase();
  const existingUser = await prisma.users.findUnique({
    where: { email: toLowerCaseEmail },
    select: { id: true },
  });
  if (existingUser) {
    return {
      success: false,
      message: "User already exists",
      status: 409,
    };
  }
  const hashedpassword = await bcrypt.hash(userData.password, 10);
  const addUser = await prisma.users.create({
    data: {
      email: toLowerCaseEmail,
      password: hashedpassword,
      first_name: userData.first_name,
      last_name: userData.last_name,
    },
    select: {
      id: true,
      email: true,
      first_name: true,
      role: true,
    },
  });

  return {
    success: true,
    message: "User Added Successfully",
    data: addUser,
    status: 201,
  };
};

export const login = async (data: LoginDetails) => {
  const emailToLowerCase = data.email.trim().toLowerCase();
  const findUser = await prisma.users.findUnique({
    where: { email: emailToLowerCase },
  });

  if (!findUser?.password) {
    return {
      success: false,
      message: "Email or password is incorrect",
      status: 400,
    };
  }

  const isValid = await bcrypt.compare(data.password, findUser.password);

  if (!isValid) {
    return {
      success: false,
      message: "Email or password is incorrect",
      status: 400,
    };
  }

 

  return {
    success: true,
    message: "Logged In Successfully",
    data: {
      id: findUser.id,
      email: findUser.email,
      first_name: findUser.first_name,
      role: findUser.role,
      last_name: findUser.last_name,
    },
    status: 201,
  };
};

export const resetPassword = async (token: string, newPassword: string) => {
  if (!token || !newPassword) return { data: null, message: "Invaild Request" };

  const resetToken = await prisma.reset_password_token.findFirst({
    where: { token: token, expire_at: { gt: new Date() } },
  });
  if (resetToken?.token === undefined || resetToken.user_id === null)
    return { data: null, message: "Reset Password Link Expired", status: 409 };

  const newHashPassword = await bcrypt.hash(newPassword, 10);

  await prisma.users.update({
    where: { id: resetToken.user_id },
    data: {
      password: newHashPassword,
    },
  });

  await prisma.reset_password_token.delete({
    where: { id: resetToken.id },
  });

  return {
    result: true,
    message: "Password has been reset successfully",
    status: 201,
  };
};

export const changePassword = async (
  oldPassword: string,
  newPassword: string,
  user_id: string
) => {
  const findUser = await prisma.users.findUnique({
    where: { id: user_id },
    select: { password: true },
  });
  if (findUser === null)
    return { message: "User is not exist", status: 400, data: null };

  const isValid = await bcrypt.compare(oldPassword, findUser.password!);
  if (!isValid)
    return { message: "Password is not correct", status: 400, data: null };

  const hashedpassword = await bcrypt.hash(newPassword, 10);
  await prisma.users.update({
    where: { id: user_id },
    data: {
      password: hashedpassword,
    },
  });

  return { message: "Password updated successfully", status: 201, data: null };
};

export const updateRole = async (userId: string, newRole: Role) => {
  try {
    const existing = await prisma.users.findUnique({ where: { id: userId } });
    if (!existing)
      return { data: null, message: "User Not Found", status: 409 };

    const result = await prisma.users.update({
      where: { id: userId },
      data: { role: newRole },
    });
    return { data: result, message: "Role Updated Successfully", status: 201 };
  } catch (error) {
    return { data: error, message: "Error In Updating The Role", status: 500 };
  }
};

export const deleteUser= async (userId:string)=>{
  try {
    const result= await prisma.users.delete({where:{id:userId}})
    return {
      data:null,
      message:"Role Updated Successfully",
      status:201
    }
  } catch (error) {
    return {
      data:null,
      message:"Error In Updating Role",
      status:500
    }
  }
}

export const getAllUsers= async ()=>{
  try {
    const result= await prisma.users.findMany({})
    return {
      data:result,
      message:"All Users",
      status:200
    }
  } catch (error) {
     return {
      data:null,
      message:"Error In Getting Users",
      status:500
    }
  }
}

export const getUserById= async (userId:string)=>{
  try {
    const result= await prisma.users.findUnique({where:{id:userId}})
    return {
      data:result,
      message:`The User With This ID: ${userId}`,
      status:200
    }
  } catch (error) {
    return {
      data:null,
      message:`Error In Getting The User`,
      status:500
    }
  }
}
