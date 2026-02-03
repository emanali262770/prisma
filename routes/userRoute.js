import express from "express";
import { createUser, deleteUser, getUserAll, getUserById, updateUser } from "../controllers/user.js";

const router = express.Router();

router.post("/users", createUser);
router.put("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);
router.get("/users", getUserAll);
router.get("/users/:id", getUserById)

export default router;