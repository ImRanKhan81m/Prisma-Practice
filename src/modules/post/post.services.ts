import { Post, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const createPost = async (post: Post): Promise<Post> => {
  const result = await prisma.post.create({
    data: post,
    include: {
      author: true,
      category: true,
    },
  });
  return result;
};

const getAllPosts = async (options: any) => {
  const { sortBy, sortOrder, searchTerm, page, limit } = options;

  const skip = parseInt(page) * parseInt(limit) - parseInt(limit);
  const take = parseInt(limit);

  const result = await prisma.post.findMany({
    skip,
    take,
    include: {
      author: true,
      category: true,
    },
    orderBy:
      sortBy && sortOrder
        ? {
            [sortBy]: sortOrder,
          }
        : {
            createdAt: "desc",
          },
    where: {
      //   title: {
      //     contains: searchTerm,
      //     mode: "insensitive",
      //   },
      OR: [
        {
          title: {
            contains: searchTerm,
            mode: "insensitive",
          },
        },
        {
          author: {
            name: {
              contains: searchTerm,
              mode: "insensitive",
            },
          },
        },
      ],
    },
  });
  return result;
};

export const PostService = {
  createPost,
  getAllPosts,
};

/**
 * limit = 5
 * page = 2
 * total= 20
 * take = limit
 * skip = (page-1)*limit
 * totalPage = Math.ceil(total/limit)
 * 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20
 */
