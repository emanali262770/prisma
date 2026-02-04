import { prisma } from "../config/db.js";

export const createComment = async (req, res) => {
  try {
    const { post_id, comment, user_id } = req.body;

    // ✅ Guard 1 — required fields
    if (!user_id || !comment || !post_id) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // ✅ Guard 2 — user exists?
    const user = await prisma.user.findUnique({
      where: { id: Number(user_id) },
    });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    // comment count increase
    await prisma.post.update({
      where: { id: Number(post_id) },
      data: { comments_count: { increment: 1 } },
    });
    // ✅ Ab hi DB insert hoga
    const postCreate = await prisma.comment.create({
      data: {
        user_id: Number(user_id),
        post_id: Number(post_id),
        comment,
      },
    });

    return res.status(201).json({ message: "Comment created", postCreate });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// update user

export const updateComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { comment } = req.body;
    const postUpdate = await prisma.comment.update({
      where: { id: Number(id) },
      data: { comment },
    });
    res.status(200).json({ message: "Comment updated", postUpdate });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error });
    console.log(error);
  }
};

export const deleteComment = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.post.update({
      where: { id: Number(id) },
      data: { comments_count: { decrement: 1 } },
    });
    const user = await prisma.comment.delete({
      where: { id: Number(id) },
    });
    res.status(200).json({ message: "Comment deleted", user });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error });
  }
};
export const getCommentsAll = async (req, res) => {
  try {
    const post = await prisma.comment.findMany();
    res.status(200).json({ message: "Comments fetched", post });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error });
  }
};

export const getCommentById = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await prisma.comment.findUnique({
      where: { id: Number(id) },
    });
    res.status(200).json({
      message: "Comment fetched",
      post: post ? post : [],
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error });
  }
};
