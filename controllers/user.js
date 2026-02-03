import { prisma } from "../config/db.js";


export const createUser=async(req,res)=>{
    try {
        const {name,email,password}=req.body;
        const findUser=await prisma.user.findUnique({
            where:{email:email}
        })
        if (findUser) {
            res.status(200).json({message:"User already exist",user:findUser})
        }

        const user=await prisma.user.create({
            data:{name,email,password}
        })

        res.status(200).json({message:"User created",user})
    } catch (error) {
        res.status(500).json({message:"Something went wrong",error})
    }

}

