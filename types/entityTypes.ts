import { User } from "next-auth";
import { Post } from "@prisma/client";

export type ClientUser = Partial<Pick<User, "name" | "email" | "image">>;
export type ClientPost = Omit<Post, "user"> & { user: ClientUser };
export type ServerPost = Post & { user: ClientUser };
export type NewPost = Pick<ClientPost, "content">;