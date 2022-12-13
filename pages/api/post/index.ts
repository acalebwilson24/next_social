// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react';
import prisma from 'prisma/client';
import { Post } from "@prisma/client"
import { ServerPost } from 'types/entityTypes';
import { User } from 'next-auth';

type Data = {
    name: string
}

type Error = {
    message: string
}

type Response<T> = {
    data?: T;
    error?: Error;
}

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
        const posts = await prisma.post.findMany({
            include: {
                author: true
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
        res.status(200).json({
            data: posts.map(mapAuthorToUser)
        });
    }

    if (req.method === 'POST') {
        // create a new post

        const { content } = req.body;
        const session = await getSession({ req });

        if (!session?.user || !session.user.email) {
            return res.status(401).json({ message: 'Not authenticated' });
        }

        const newPost = await prisma.post.create({
            data: {
                content,
                author: {
                    connect: {
                        email: session.user.email
                    }
                }
            },
            include: {
                author: true
            }
        })

        res.status(201).json({ data: mapAuthorToUser(newPost) });
    }
}
