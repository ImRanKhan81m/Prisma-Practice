import express from "express";
import { UserController } from "./user.controller";

const router = express.Router();

router.get("/", UserController.getAllUsers);
router.post("/", UserController.createUser);
router.post("/profile", UserController.updateProfile)
router.get("/:id", UserController.getUserById);

export const UserRoutes = router;
