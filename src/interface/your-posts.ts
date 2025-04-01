// types/PostTypes.ts
export interface UserReact {
    _id: string;
    username: string;
    firstName: string;
    lastName: string;
    avatarUrl: string;
    coverPhotoUrl?: string;
}


export interface Reactions {
    // like?: UserReact[];
    heart?: UserReact[];
    // wow?: UserReact[];
    // angry?: UserReact[];
    fire?: UserReact[];
    handsUp?: UserReact[];
    disLike?: UserReact[];
}

export interface Author {
    _id: string;
    username: string;
    firstName: string;
    middleName?: string;
    lastName: string;
    avatarUrl?: string;
    coverPhotoUrl?: string;
}

export interface CommentFrom {
    _id: string;
    username: string;
    firstName: string;
    middleName?: string;
    lastName: string;
    avatarUrl?: string;
    coverPhotoUrl?: string;
}

export interface ReplytoComment {
    _id: string;
    rid: string;
    userId: Author;
    from: string;
    replyAt: string;
    comment: string;
    createdAt: string;
    updatedAt: string;
    heart: HeartReaction[];
}

export interface HeartReaction {
    _id: string;
    username: string;
    firstName: string;
    middleName?: string;
    lastName: string;
    avatarUrl?: string;
    coverPhotoUrl?: string;
}


export interface PostComment {
    _id: string;
    comment: string;
    from: CommentFrom;
    heart: HeartReaction[];
    replies: ReplytoComment[];
    createdAt: string;
    updatedAt: string;
    __v: string;
}

// export interface author

export interface Post {
    _id: string;
    reactions: Reactions;
    authorId: Author;
    captionPost: string;
    comments: PostComment[]; 
    createdAt: string;
    updatedAt: string;
    __v: number;
}


export interface TimelinePosts {
    message: string;    
    postCount: number;  
    dataPost: Post[];    
    savedPostCount: number,
    savedPosts: Post[]; 
}

/// added post
export interface newPost {
    authorId: string;
    captionPost: string
    reactions: Reactions;
    comments: any[]
    _id: string;
    createdAt: string;
    updatedAt: string;
    __v: number;

}

export interface AddPost {
    message: string; 
    newPost: newPost;
}


export interface TypeReactions {
    all?: UserReact[];
    like?: UserReact[]; 
    fire?: UserReact[]; 
    handsUp?: UserReact[]; 
    disLike?: UserReact[]; 
    heart?: UserReact[];
}

export interface UserReact {
    avatarUrl: string;
    coverPhotoUrl?: string;
    firstName: string;
    middleName?: string;
    lastName: string;
    reactionType: string;
    username: string;
    _id: string;
}

export interface AllUserReactions {
    message: string;
    reactions: TypeReactions;
    reactionType: string;

}