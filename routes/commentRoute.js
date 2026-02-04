import express from "express";
import { createComment, deleteComment, getCommentById, getCommentsAll, updateComment } from "../controllers/comment.js";


const router = express.Router();

router.post("/comment", createComment);
router.put("/comment/:id", updateComment);
router.delete("/comment/:id", deleteComment);
router.get("/comment", getCommentsAll);
router.get("/comment/:id", getCommentById)
export default router;