export interface Followers {
    _id: string;
    username: string;
    firstName: string;
    middleName?: string;
    lastName: string;
    avatarUrl?: string;
    coverPhotoUrl?: string;
}
export interface FollowersData {
    _id: string;
    follower: Followers;
    following: string;
    createdAt: string;
    updatedAt: string;
    __v: string;
}

export interface YourFollowers {
    message: string;
    totalFollowers: number;
    yourFollowers: FollowersData[];
}


// my following
export interface FollowingData {
    _id: string;
    follower: string;
    following: Followers;
    createdAt: string;
    updatedAt: string;
    __v: string;
}

export interface YourFollowing {
    message: string;
    totalFollowing: number;
    youFollowed: FollowingData[];
}

// followed user 
export interface FollowedUserData {
    _id: string;
    username: string;
    firstName: string;
    middleName: string;
    lastName: string;
}
export interface FollowedUser {
    message: string;
    followedUser: FollowedUserData;
}