import express from "express";
import { createPost, deletePost, editPost, getAllPosts, viewPost } from "../controllers/blog.controller.js";

const router = express.Router();

router.post("/createpost", createPost);
router.get("/posts", getAllPosts);
router.get("/viewpost/:slug", viewPost);
router.put("/editpost/:slug", editPost);
router.delete("/deletepost/:slug", deletePost);

export default router;
