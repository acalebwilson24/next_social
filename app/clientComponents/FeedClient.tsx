"use client"

import CreatePost from "./CreatePost";
import PostWrapper from "../serverComponents/PostWrapper";
import { Post } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { ClientPost, NewPost } from "types/entityTypes";
import { useCreatePostMutation, useDeletePostMutation, useGetPostsQuery } from "redux/api";

const Feed: React.FC<{ posts: ClientPost[] }> = ({ posts: _posts }) => {
    const { data: response, isLoading } = useGetPostsQuery(null);
    const [createPost, { isLoading: isPostCreating }] = useCreatePostMutation();
    const [deletePost, { isLoading: isPostDeleting }] = useDeletePostMutation();
    const session = useSession();

    const posts = response?.data;

    function submitPost(content: string) {
        if (!session.data?.user) return;
        createPost(content);
    }

    return (
        <div className="border-l border-r border-slate-300">
            <CreatePost submitPost={submitPost} />
            <div className="flex flex-col">
                {posts && posts.map((post, index) => (
                    <PostWrapper key={index} user={post.user} deletePost={() => deletePost(post.id)}>
                        <p>{post.content}</p>
                    </PostWrapper>
                ))}
                {isLoading && <p>Loading...</p>}
            </div>
        </div>
    )
}

export default Feed;