export interface NotificationResponse {
    notifications: MyNotification[]; // The response object contains a "notifications" array
}

export interface MyNotification {
    _id: string;    
    senderId: UserData;
    receiverId: UserData;
    userId: UserData;
    postId?: PostContent; 
    type: string; 
    commentId?: CommentContent;
    message: string;    
    typeOfNotification: string; 
    isRead: boolean;
    commentContext: string;
    createdAt: string; 
    updatedAt: string; 
    __v:  number;
}

export interface UserData {
    _id: string;
    username: string;
    firstName: string;
    middleName?: string;
    lastName: string;
    avatarUrl?: string;
    coverPhotoUrl?: string;
} 

export interface PostContent {
    _id: string;    
    captionPost: string;
}

export interface CommentContent {
    _id: string;  
    comment: string;
    from: UserData;
    replies: RepliesData[];

}

export interface RepliesData {
    rid: string;
    userId: UserData; 
    comment: string;
    replyAt: string; 
    createdAt: string; 
    updatedAt: string; 
    heart: string[]; 
    _id: string;
}