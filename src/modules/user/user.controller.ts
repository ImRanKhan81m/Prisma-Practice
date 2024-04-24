import { Request, Response } from "express";
import { UserService } from "./user.services";

const createUser = async (req: Request, res: Response) => {
  const data = req.body;
  try {
    const result = await UserService.createUser(data);
    res.send({
      success: true,
      message: "User created successfully",
      data: result,
    });
  } catch (error) {
    res.send(error);
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const getUsers = await UserService.gerAllUsers();
    res.send({
      success: true,
      message: "Users fetched successfully",
      data: getUsers,
    });
  } catch (error) {
    res.send(error);
  }
};

const getUserById = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const user = await UserService.getUserById(Number(userId));
    res.send({
      success: true,
      message: "User fetched successfully",
      data: user,
    });
  } catch (error) {
    res.send(error);
  }
};

const updateProfile = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const result = await UserService.updateProfile(data);
    res.send({
      success: true,
      message: "Profile updated successfully",
      data: result,
    });
  } catch (error) {
    res.send(error);
  }
};

export const UserController = {
  createUser,
  getAllUsers,
  updateProfile,
  getUserById,
};
