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
            total: posts.total,
            data: posts.data
        });
    } catch (error) {
        res.send(error);
    }
}

const updatePost = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const data = req.body;
        const result = await PostService.updatePost(id, data);
        res.send({
            success: true,
            message: "Post updated successfully",
            data: result
        });
    } catch (error) {
        res.send(error);
    }
}

const deletePost = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const result = await PostService.deletePost(id);
        res.send({
            success: true,
            message: "Post deleted successfully",
            data: result
        });
    } catch (error) {
        res.send(error);
    }
}

const learnAggregateAndGrouping = async ( req: Request, res: Response) => {
    try {
        const result = await PostService.learnAggregateAndGrouping();
        res.send({
            success: true,
            message: "Post fetch successfully",
            data: result
        });
    } catch (error) {
        res.send(error);
    }
}

export const PostController = {
    createPost,
    getAllPosts,
    updatePost,
    deletePost,
    learnAggregateAndGrouping
}