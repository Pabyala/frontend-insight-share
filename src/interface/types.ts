export interface User {
    _id: string;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    gender: string;
    phoneNumber: string;
    dateOfBirth: string;
    avatarUrl?: string; // Optional fields
    coverPhotoUrl?: string; // Optional fields
}

export interface AllUsersResponse {
    allUsers: User[];
}

// --------POSTS----------

export interface Reaction {
    like: string[];
    heart: string[];
    wow: string[];
    angry: string[];
}

export interface Author {
    _id: string;
    username: string;
    firstName: string;
    lastName: string;
}

export interface Post {
    _id: string;
    authorId: Author;
    captionPost: string;
    reactions: Reaction;
    comments: any[]; // Adjust type as needed
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface PostsOfUser {
    allPosts: Post[];
}



// types.ts
export interface Reaction {
    like: string[];
    heart: string[];
    wow: string[];
    angry: string[];
}

export interface Author {
    _id: string;
    username: string;
    firstName: string;
    lastName: string;
    avatarUrl: string;
    coverPhotoUrl?: string; // Optional if not always present
}

export interface Post {
    reactions: Reaction;
    _id: string;
    authorId: Author;
    captionPost: string;
    comments: any[]; // Adjust with a specific Comment interface if available
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export type UserPost = Post;
