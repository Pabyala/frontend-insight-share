import { genderOption, userSubmenuInterface } from "./interface";


export const userGender: genderOption[] = [
    {
        id: '1',
        value: 'male',
        label: 'Male'
    },
    {
        id: '2',
        value: 'female',
        label: 'Female'
    }
]


export const userSubmenu: userSubmenuInterface[] = [
    {
        id: '1',
        label: 'Profile',
        icon: 'profile'
    },
    {
        id: '2',
        label: 'Following',
        icon: 'following'
    },
    {
        id: '3',
        label: 'Post',
        icon: 'post'
    },
    {
        id: '4',
        label: "Today's birthday",
        icon: 'birthday'
    },
    {
        id: '5',
        label: "Suggested for you",
        icon: 'suggested'
    },
    {
        id: '6',
        label: 'Settings',
        icon: 'settings'
    },
    {
        id: '7',
        label: 'Logout',
        icon: 'logout'
    }
]