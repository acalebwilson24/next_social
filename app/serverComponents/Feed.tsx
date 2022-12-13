import FeedClient from "app/clientComponents/FeedClient";
import { Post } from "@prisma/client";
import { Response } from "types/responseTypes";
import { ServerPost } from "types/entityTypes";
import { use } from "react";

async function getPosts() {
    const res = await fetch(`${process.env.BASE_URL}/api/post`)
    const posts = await res.json() as Response<ServerPost[]>

    async function revalidate() {
        const res = await fetch(`${process.env.BASE_URL}/api/revalidate?secret=${process.env.REVALIDATE_TOKEN}`);
    }
 
    return { posts, revalidate }
}

const Feed: React.FC = () => {
    const postsHandler = use(getPosts());
    if (!postsHandler.posts.data) return null;

    const posts = postsHandler.posts.data;

    return (
        <FeedClient posts={posts.map(p => {
            return {
                ...p,
                id: p.id,
                content: p.content,
                user: {
                    username: p.user.name,
                    email: p.user.email,
                    image: p.user.image
                }
            }
        })} />
    )
}

export default Feed;