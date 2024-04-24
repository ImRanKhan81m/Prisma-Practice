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

  const skip = parseInt(page) * parseInt(limit) - parseInt(limit) || 0;
  const take = parseInt(limit) || 10;

  return await prisma.$transaction(async (prisma) => {
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

    const total = await prisma.post.count();
    return {
      data: result,
      total,
    };
  });
};

const updatePost = async (
  id: number,
  payload: Partial<Post>
): Promise<Post | number> => {
  // const result = await prisma.post.update({
  //   where: {
  //     id,
  //   },
  //   data: payload,
  //   include: {
  //     author: true,
  //     category: true,
  //   },
  // });

  const result = await prisma.$executeRaw`update posts set title = ${payload.title} where id = ${id}`;

  return result;
};

const deletePost = async (id: number): Promise<Post> => {
  const result = await prisma.post.delete({
    where: {
      id,
    },
  });

  // const result = await prisma.$executeRaw`DELETE FROM posts WHERE id = ${id}`; 

  return result;
};

const learnAggregateAndGrouping = async () => {
  // const result = await prisma.post.aggregate({
  //   _avg: {
  //     authorId: true,
  //     categoryId: true,
  //   },
  //   _count: {
  //     authorId: true,
  //   },
  //   _sum:{
  //     authorId: true,
  //   }
  // });

  const result = await prisma.post.groupBy({
    by: ["title"], 
    _count: {
      title: true
    }
  });

  return result;
};

export const PostService = {
  createPost,
  getAllPosts,
  updatePost,
  deletePost,
  learnAggregateAndGrouping,
};
