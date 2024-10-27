// types.ts (you can also keep this in the same file)
export interface Post {
    _id: string;
    authorId: {
        _id: string;
        username: string;
        firstName: string;
        middleName: string;
        lastName: string;
        avatarUrl: string;
    };
    captionPost: string;
    comments: any[]; // You can create a specific type for comments if needed
    createdAt: string;
    updatedAt: string;
    reactions: {
        like: any[]; // You can specify more detailed types if needed
        heart: any[];
        wow: any[];
        angry: any[];
    };
}
