// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react';
import prisma from 'prisma/client';
import { Post } from "@prisma/client"
import { ServerPost } from 'types/entityTypes';
import { User } from 'next-auth';
import { Response, Error } from 'types/responseTypes';

function mapAuthorToUser(post: (Post & {
    author: User;
}), index?: number) {
    return {
        ...post,
        user: {
            name: post.author.name,
            email: post.author.email,
            image: post.author.image
        }
    }
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Response<ServerPost> | Response<ServerPost[]> | Error>
) {
    if (req.method === 'GET') {
        const postId = req.query.postId as string;
        const post = await prisma.post.findUnique({
            where: {
                id: postId
            },
            include: {
                author: true
            }
        });

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        res.status(200).json({
            data: mapAuthorToUser(post)
        });
    }

    if (req.method === 'DELETE') {
        // check user is authenticated
        const session = await getSession({ req });
        if (!session?.user || !session.user.email) {
            return res.status(401).json({ message: 'Not authenticated' });
        }

        // check user is the author of the post
        const postId = req.query.postId as string;
        const post = await prisma.post.findUnique({
            where: {
                id: postId
            }
        });

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        if (post.authorId !== session.user.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        // delete the post
        await prisma.post.delete({
            where: {
                id: postId
            }
        });

        res.status(200).json({ message: 'Post deleted' });
    }
}
