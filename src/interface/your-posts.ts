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
    like?: UserReact[];
    heart?: UserReact[];
    wow?: UserReact[];
    angry?: UserReact[];
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
