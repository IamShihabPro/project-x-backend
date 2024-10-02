export type TReaction = {
    userId: string;
    reaction: 'like' | 'dislike';
  };
  
  export type TComment = {
    userId: string;
    userName: string;
    text: string;
  };
  
  export type TPost = {
    postId: string;
    userId: string;
    text: string;
    images?: string[];            
    reactions: TReaction[]; 
    comments: TComment[]; 
  };
  