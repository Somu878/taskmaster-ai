"use server";
import { handleError } from "./../utils";
import prisma from "@/_db";
export async function createUser(user: CreateUserParams) {
  try {
    const newUser = await prisma.user.create({ data: user });
    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    handleError(error);
  }
}

export async function updateUser(user: UpdateUserParams) {
  try {
    const updatedUser = await prisma.user.update({
      where: {
        email: user.email,
      },
      data: {
        username: user.username!,
        firstName: user.firstName!,
        lastName: user.lastName!,
        photo: user.photo!,
      },
    });
    return JSON.parse(JSON.stringify(updatedUser));
  } catch (error) {
    handleError(error);
  }
}
// DELETE

export async function deleteUser(id: string) {
  try {
    const deleteUser = await prisma.user.delete({
      where: {
        clerkId: id,
      },
    });
    if (!deleteUser) {
      throw new Error("User not found");
    }
    return "User deleted Successfully";
  } catch (error) {
    handleError(error);
  }
}
