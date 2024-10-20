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
    // Add other fields as needed
}

export interface AllUsersResponse {
    allUsers: User[];
}
