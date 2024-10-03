import { z } from "zod";

// Define the schema for Reaction
const reactionSchema = z.object({
  userId: z.string().nonempty('User ID is required'),
  reaction: z.enum(['like', 'dislike'])
});

// Define the schema for Comment
const commentSchema = z.object({
  userId: z.string().nonempty('User ID is required'),
  userName: z.string().nonempty('User Name is required'),
  text: z.string().nonempty('Text is required')
});

// Define the schema for Post
const createPostValidation = z.object({
  body: z.object({
    // postId: z.string().nonempty('Post ID is required'),
    // userEmail: z.string().nonempty('User ID is required'),
    text: z.string().optional(),
    images: z.array(z.string()).optional(),
    reactions: z.array(reactionSchema).optional(),
    comments: z.array(commentSchema).optional(),
  })
});

export const PostValidation = {
  createPostValidation
}
