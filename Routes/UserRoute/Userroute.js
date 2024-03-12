import express from "express"

import { updateUser,deleteuser,followUser,UnFollowUser,getAllUsers } from "../../Controllers/UserController.js";
import authMiddleWare from "../../middleware/AuthMiddleware.js";
import { loginUser } from "../../Controllers/AuthController.js";

const router=express.Router()
router.get("/",getAllUsers)

router.put('/:id/follow', authMiddleWare,followUser)
router.put('/:id/unfollow',authMiddleWare, UnFollowUser)
router.put("/:id",authMiddleWare,updateUser)
router.delete("/:id",authMiddleWare,deleteuser)

export default router
