import { Request, Response } from "express";
import { PostService } from "./post.services";


const createPost = async (req: Request, res: Response) => {
    try {
        const data = req.body;
        const result = await PostService.createPost(data);
        res.send({
            success: true,
            message: "Post created successfully",
            data: result
        });
    } catch (error) {
        res.send(error);
    }
}

const getAllPosts = async (req: Request, res: Response) => {
    const options = req.query;
    try {
        const posts = await PostService.getAllPosts(options);
        res.send({
            success: true,
            message: "Posts fetched successfully",
            data: posts
        });
    } catch (error) {
        res.send(error);
    }
}

export const PostController = {
    createPost,
    getAllPosts
}