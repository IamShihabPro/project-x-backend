import { model, Schema } from "mongoose";
import { TPost } from "./post.interface";

// Define the schema for the Reaction
const reactionSchema = new Schema({
  userId: { type: String, required: true },
  reaction: { type: String, enum: ['like', 'dislike'], required: true }
});

// Define the schema for the Comment
const commentSchema = new Schema({
  userId: { type: String, required: true },
  userName: { type: String, required: true },
  text: { type: String, required: true }
});

// Define the schema for the Post
const postSchema = new Schema<TPost>({
  // postId: { type: String, required: true },
  userEmail: { type: String, required: true },
  text: { type: String, required: true },
  images: [{ type: String }],
  reactions: [reactionSchema],
  comments: [commentSchema],
},
{
    timestamps: true,
}
);

export const Post = model<TPost>('Post', postSchema);
