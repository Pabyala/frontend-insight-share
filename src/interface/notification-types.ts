export interface NotificationResponse {
    notifications: MyNotification[]; // The response object contains a "notifications" array
}

export interface MyNotification {
    _id: string;    
    senderId: UserData;
    receiverId: UserData;
    type: string; 
    postId?: PostContent; 
    // commentId?: 
    message: string;    
    typeOfNotification: string; 
    isRead: boolean;
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
    avatarUrl: string;
    coverPhotoUrl: string;
} 

export interface PostContent {
    _id: string;    
    captionPost: string;
}