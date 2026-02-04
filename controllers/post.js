import { prisma } from "../config/db.js";


export const createPost = async (req, res) => {
  try {
    const { user_id, title, description } = req.body;

  // ✅ Guard 1 — required fields
    if (!user_id || !title || !description) {
      return res.status(400).json({ message: "All fields are required" });
    }

  // ✅ Guard 2 — user exists?
    const user = await prisma.user.findUnique({
      where: { id: Number(user_id) },
    });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

  // ✅ Ab hi DB insert hoga
    const postCreate = await prisma.post.create({
      data: {
        user_id: Number(user_id),
        title,
        description,
      },
    });

    return res.status(201).json({ message: "Post created", postCreate });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};



// update user

export const updatePost=async(req,res)=>{
    try {
          const { id } = req.params; 
        const {title,description}=req.body;
        const postUpdate=await prisma.post.update({
            where:{id:Number(id)},
            data:{title,description}
        })
        res.status(200).json({message:"Post updated",postUpdate
        })
    } catch (error) {
        res.status(500).json({message:"Something went wrong",error})
        console.log(error);
        
    }
}

export const deletePost=async(req,res)=>{

    const { id } = req.params;
    try {
        const user=await prisma.post.delete({
            where:{id:Number(id)}
        })
        res.status(200).json({message:"Post deleted",user
        })
    } catch (error) {
        res.status(500).json({message:"Something went wrong",error})
    }
}
export const getPostAll = async (req, res) => {
  try {
    const post = await prisma.post.findMany({
      orderBy: { createdAt: "desc" },   // ✅ latest post first

      include: {
        comments: {
          orderBy: { createdAt: "desc" }, // ✅ latest comment first
          include: {
            user: {
              select: { name: true, email: true },
            },
          },
        },
      },
    });

    res.status(200).json({ message: "Post fetched", post });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error });
  }
};



export const getPostById=async(req,res)=>{
    const { id } = req.params;
    try {
        const post=await prisma.post.findUnique({
            where:{id:Number(id)}
        })
        res.status(200).json({
  message: "Post fetched",
  post: post ? post : []
});

    } catch (error) {
        res.status(500).json({message:"Something went wrong",error})
    }
}
