import express from "express";
import { createPost, deletePost, getPostAll, getPostById, updatePost } from "../controllers/post.js";

const router = express.Router();

router.post("/post", createPost);
router.put("/post/:id", updatePost);
router.delete("/post/:id", deletePost);
router.get("/post", getPostAll);
router.get("/post/:id", getPostById)

export default router;