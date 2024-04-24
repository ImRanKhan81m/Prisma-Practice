import { PostController } from "./post.controller";

const express = require("express");

const router = express.Router();

router.post("/", PostController.createPost);
router.get("/", PostController.getAllPosts);
router.patch("/:id", PostController.updatePost);
router.delete("/:id", PostController.deletePost);
router.get("/learn-query", PostController.learnAggregateAndGrouping);

export const PostRoutes = router;
