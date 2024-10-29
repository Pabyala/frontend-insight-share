// types.ts (you can also keep this in the same file)
// export interface Post {
//     _id: string;
//     authorId: {
//         _id: string;
//         username: string;
//         firstName: string;
//         middleName: string;
//         lastName: string;
//         avatarUrl: string;
//     };
//     captionPost: string;
//     comments: any[]; // You can create a specific type for comments if needed
//     createdAt: string;
//     updatedAt: string;
//     reactions: {
//         like: any[]; // You can specify more detailed types if needed
//         heart: any[];
//         wow: any[];
//         angry: any[];
//     };
// }



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

