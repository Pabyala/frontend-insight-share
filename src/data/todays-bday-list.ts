import { UserInfo } from "../interface/user";

interface BdayToday {
    _id: string;
    username: string;
    firstName: string;
    middleName: string;
    lastName: string;
}

export const toDaysBday: BdayToday []= [
    {
        _id: '12312314324234',
        username: '@marcothedoctor',
        firstName: 'Marco',
        middleName: 'W.',
        lastName: 'Phoenix',
    },
    {
        _id: '1231231432445',
        username: '@luffytaro',
        firstName: 'Monkey',
        middleName: 'D.',
        lastName: 'luffy',
    },
    {
        _id: '123123453434',
        username: '@legendthegarp',
        firstName: 'Monkey',
        middleName: 'D.',
        lastName: 'Garp',
    },
    {
        _id: '12312313433342',
        username: '@zorotaro',
        firstName: 'Roronoa',
        middleName: '',
        lastName: 'Zoro',
    }

]