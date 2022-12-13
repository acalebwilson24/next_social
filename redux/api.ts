import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Response } from 'types/responseTypes'
import { ServerPost } from 'types/entityTypes'

// Define a service using a base URL and expected endpoints
export const socialApi = createApi({
  reducerPath: 'socialApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/api/' }),
  tagTypes: ['Posts'],
  endpoints: (builder) => ({
    getPosts: builder.query<Response<ServerPost[]>, null>({
      query: (name) => `post/`,
      providesTags: ['Posts']
    }),
    createPost: builder.mutation<Response<ServerPost>, string>({
        query: (content) => ({
            url: `post/`,
            method: 'POST',
            body: {
                content
            }
        }),
        invalidatesTags: ['Posts']
    }),
    deletePost: builder.mutation<Response<ServerPost>, string>({
        query: (postId) => ({
            url: `post/${postId}`,
            method: 'DELETE'
        }),
        invalidatesTags: ['Posts']
    })
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetPostsQuery, useCreatePostMutation, useDeletePostMutation } = socialApi