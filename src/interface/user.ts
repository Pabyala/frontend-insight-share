export interface UserInfo {
    _id: string;                     
    username: string;                
    firstName: string;
    middleName?: string;             
    lastName: string;                
    password: string;               
    email: string;                   
    gender: string; 
    phoneNumber: string;            
    dateOfBirth: string;
    isDateBirthShow: boolean;
    isFollowedShow: boolean; 
    bio?: string;            
    avatarUrl?: string;             
    coverPhotoUrl?: string;
    followers: string[];             
    following: string[];            
    socials: socialsData[];     
    studyAt: string;
    workAt: {
        companyName?: string;
        position?: string;
    }
    livesIn?: string;
    locFrom?: string;

    createdAt: string;               
    updatedAt: string;               
    __v: number;                    
    refreshToken: string;            
}

export interface UserInfo {
    userInfo: UserInfo;
}

// FOLLOWING
export interface FollowedUserDetails {
    _id: string;
    username: string;
    firstName: string;
    middleName: string;
    lastName: string;
    avatarUrl: string;
}

export interface FollowerData {
    _id: string;
    follower: FollowedUserDetails;
    following: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface Followers {
    totalFollowers: number;
    yourFollowers: FollowerData[];
}


// user details
export interface socialsData {
    urlId: string;
    url: string;
}

export interface UserDetails {
    livesIn: string;
    locFrom: string;
    isFollowedShow: boolean;
    studyAt: string;
    companyName: string;
    position: string;
    isDateBirthShow: boolean;
    bio: string;
    socials: socialsData[];
}