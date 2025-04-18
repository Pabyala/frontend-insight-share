export interface User {
    _id: string;
    username: string;
    firstName: string;
    middleName: string;
    lastName: string;
    avatarUrl: string;
}

export interface Reactions {
    like: string[];
    heart: string[];
    wow: string[];
    angry: string[];
}

export interface Post {
    _id: string;
    authorId: User;
    captionPost: string;
    reactions: Reactions;
    comments: string[];
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface GetAllPostsByUserResponse {
    yourAllPost: Post[];
}

/// saved post
export interface userSaved {
    _id: string;
    username: string;
    firstName: string;
    middleName?: string;
    lastName: string;
    avatarUrl: string;
}
export interface SavedPost {
    _id: string;
    postId: string;
    userSaved: userSaved;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface mySavedPost {
    _id: string;
    authorId: string;
    captionPost: string;
    comments: any[];
    reactions: Reactions;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface SavedPosts {
    message: string;
    savedPostCount: number,
    savedPosts: mySavedPost[];
}
