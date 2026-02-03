import { prisma } from "../config/db.js";


export const createUser=async(req,res)=>{
    try {
        const {name,email,password}=req.body;
        const findUser=await prisma.user.findUnique({
            where:{email:email}
        })
          if (findUser) {
      return res.status(409).json({ message: "User already exist" }); // ✅ return
    }

        const user=await prisma.user.create({
            data:{name,email,password}
        })

        res.status(200).json({message:"User created",user})
    } catch (error) {
        res.status(500).json({message:"Something went wrong",error})
    }

}

// update user

export const updateUser=async(req,res)=>{
    try {
          const { id } = req.params; 
        const {name,email,password}=req.body;
        const user=await prisma.user.update({
            where:{id:Number(id)},
            data:{name,email,password}
        })
        res.status(200).json({message:"User updated",user
        })
    } catch (error) {
        res.status(500).json({message:"Something went wrong",error})
        console.log(error);
        
    }
}

export const deleteUser=async(req,res)=>{

    const { id } = req.params;
    try {
        const user=await prisma.user.delete({
            where:{id:Number(id)}
        })
        res.status(200).json({message:"User deleted",user
        })
    } catch (error) {
        res.status(500).json({message:"Something went wrong",error})
    }
}
export const getUserAll=async(req,res)=>{
    try {
        const users=await prisma.user.findMany()
        res.status(200).json({message:"Users fetched",users})
    } catch (error) {
        res.status(500).json({message:"Something went wrong",error})
    }
}


export const getUserById=async(req,res)=>{
    const { id } = req.params;
    try {
        const user=await prisma.user.findUnique({
            where:{id:Number(id)}
        })
        res.status(200).json({message:"User fetched",user})
    } catch (error) {
        res.status(500).json({message:"Something went wrong",error})
    }
}
