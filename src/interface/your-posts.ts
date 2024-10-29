// types/PostTypes.ts
export interface Reactions {
    like: string[];
    heart: string[];
    wow: string[];
    angry: string[];
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

// export interface author

export interface Post {
    _id: string;
    reactions: Reactions;
    authorId: Author;
    captionPost: string;
    comments: any[];  // Replace `any` with a comment type if defined
    createdAt: string;
    updatedAt: string;
    __v: number;
}



export interface TimelinePosts {
    message: string;      
    dataPost: Post[];     
}