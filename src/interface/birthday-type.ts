export interface BirthdayData {
    _id: string;
    username: string;
    firstName: string;
    middleName: string;
    lastName: string;
    dateOfBirth: string;
    avatarUrl?: string;
    coverPhotoUrl?: string;
}

export interface TodaysBday {
    message: string;
    countBirthday: number;
    birthdaysToday: BirthdayData[];
}