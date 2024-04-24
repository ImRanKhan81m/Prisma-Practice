import { PostController } from "./post.controller";

const express = require('express');

const router = express.Router();

router.post("/", PostController.createPost).get("/", PostController.getAllPosts);


export const PostRoutes = router;