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
    comments: any[]; 
    createdAt: string;
    updatedAt: string;
    __v: number;
}


export interface TimelinePosts {
    message: string;      
    dataPost: Post[];     
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
