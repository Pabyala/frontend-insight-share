interface Reaction {
    reactionId: string;     
    userId: string;
    firstName: string;
    middleName: string;
    lastName: string;
    avatarUrl: string;
    timestamp: string;     
}

interface Reply {
    replyId: string;
    userId: string;
    text: string;
    firstName: string;
    middleName?: string;
    lastName: string;
    avatarUrl: string;
    timestamp: string;
}

interface Comment {
    commentId: string;
    userId: string;
    text: string;
    firstName: string;
    middleName: string;
    lastName: string;
    avatarUrl: string;
    timestamp: string; 
    replies?: Reply[];   
}

interface Post {
    postId: string;    
    authorId: string;       
    captionPost: string;
    firstName: string;
    middleName: string;
    lastName: string;
    authorAvatarUrl: string  
    reactions: {
        like: Reaction[];    
        heart: Reaction[];   
    };
    comments: Comment[];    
    createdAt?: string;    
    updatedAt?: string;     
}


export const dummyPosts: Post[] = [
    {
        //1post
        postId: '1',
        authorId: "60c72b2f9b1d4b3e4e4e1b1a", 
        captionPost: "Just finished my first React app!",
        firstName: "Marco",
        middleName: "C.",
        lastName: "Daag",
        authorAvatarUrl: 'https://fastly.picsum.photos/id/582/256/256.jpg?hmac=peqwFP3WuZEwg549dK3PuPyou-m-mCW6Hmd3d3bzlrA',
        reactions: {
            like: [
                {
                    reactionId: "1",
                    userId: "60c72b2f9b1d4b3e4e4e1b2b",
                    firstName: "John",
                    middleName: "A.",
                    lastName: "Doe",
                    avatarUrl: "https://example.com/avatars/john.jpg",
                    timestamp: new Date().toISOString()
                },
                {
                    reactionId: "2",
                    userId: "60c72b2f9b1d4b3e4e4e1b3c",
                    firstName: "Jane",
                    middleName: "B.",
                    lastName: "Smith",
                    avatarUrl: "https://example.com/avatars/jane.jpg",
                    timestamp: new Date().toISOString()
                }
            ],
            heart: [
                {
                    reactionId: "3",
                    userId: "60c72b2f9b1d4b3e4e4e1b2b",
                    firstName: "John",
                    middleName: "A.",
                    lastName: "Doe",
                    avatarUrl: "https://example.com/avatars/john.jpg",
                    timestamp: new Date().toISOString()
                }
            ]
        },
        comments: [
            {
                commentId: "1",
                userId: "60c72b2f9b1d4b3e4e4e1b5e",
                text: "Great job!",
                firstName: "Alice",
                middleName: "C.",
                lastName: "Johnson",
                avatarUrl: "https://fastly.picsum.photos/id/131/256/256.jpg?hmac=M55oBxnpbg2cbTWNipji6v-THeRPY9cSHrFIjS05KZc",
                timestamp: new Date().toISOString(),
                replies: [
                    {
                        replyId: "1-1",
                        userId: "60c72b2f9b1d4b3e4e4e1b5f",
                        text: "Thanks, Alice!",
                        firstName: "Bob",
                        middleName: "D.",
                        lastName: "Smith",
                        avatarUrl: "https://fastly.picsum.photos/id/799/256/256.jpg?hmac=Fl9AM3DvzC3sgjlmAgyVacfoyKPPBhe7K_t_M6SCdn4",
                        timestamp: new Date().toISOString()
                    },
                    {
                        replyId: "1-2",
                        userId: "60c72b2f9b1d4b3e4e4e1b60",
                        text: "I agree with Alice, amazing work!",
                        firstName: "Charlie",
                        middleName: "E.",
                        lastName: "Brown",
                        avatarUrl: "https://fastly.picsum.photos/id/778/256/256.jpg?hmac=ROyXjieOYI5_lu2Z1wPejl2KSi0zq3DLuaYN38R0LkA",
                        timestamp: new Date().toISOString()
                    }
                ]
            },
            {
                commentId: "23434",
                userId: "60c72b2f9b1d4b3e4e4e1b61",
                text: "Keep up the great work!",
                firstName: "Diana",
                middleName: "F.",
                lastName: "Prince",
                avatarUrl: "https://fastly.picsum.photos/id/518/256/256.jpg?hmac=j5mBOAyfPJlfCPHv4pIMG7QVBThr8Te8Q1wESiujYNQ",
                timestamp: new Date().toISOString(),
                replies: [
                    {
                        replyId: "2-1",
                        userId: "60c72b2f9b1d4b3e4e4e1b62",
                        text: "Thanks, Diana!",
                        firstName: "Eve",
                        middleName: "G.",
                        lastName: "Adams",
                        avatarUrl: "https://fastly.picsum.photos/id/952/256/256.jpg?hmac=cqjEtIeeLXFDWCry9OpkV9uDbigAJoydAHBj0PPqwV4",
                        timestamp: new Date().toISOString()
                    }
                ]
            }
        ]
    },
    {
        //2nd post
        postId: '2',
        authorId: "60c72b2f9b1d4b3e4e4e1b1a",
        captionPost: "Learning Node.js is fun!",
        firstName: "Portgas",
        middleName: "D.",
        lastName: "Ace",
        authorAvatarUrl: 'https://fastly.picsum.photos/id/582/256/256.jpg?hmac=peqwFP3WuZEwg549dK3PuPyou-m-mCW6Hmd3d3bzlrA',
        reactions: {
            like: [],
            heart: [
                {
                    reactionId: "4",
                    userId: "60c72b2f9b1d4b3e4e4e1b2b",
                    firstName: "John",
                    middleName: "A.",
                    lastName: "Doe",
                    avatarUrl: "https://fastly.picsum.photos/id/223/256/256.jpg?hmac=8_dEx0quBjUuVEHH2UWHuB7vpQX73lw6zJl2MOILDUs",
                    timestamp: new Date().toISOString()
                }
            ]
        },
        comments: [
            {
                commentId: "11",
                userId: "60c72b2f9b1d4b3e4e4e1b61",
                text: "Keep up the great work!",
                firstName: "Diana",
                middleName: "F.",
                lastName: "Prince",
                avatarUrl: "https://fastly.picsum.photos/id/518/256/256.jpg?hmac=j5mBOAyfPJlfCPHv4pIMG7QVBThr8Te8Q1wESiujYNQ",
                timestamp: new Date().toISOString(),
                replies: []
            }
        ]
    },
    {
        //3rd Post
        postId: '3',
        authorId: "60c72b2f9b1d4b3e4e4e1b1b",
        captionPost: "Who else loves coding at night?",
        firstName: "Monkey",
        middleName: "D.",
        lastName: "Luffy",
        authorAvatarUrl: 'https://fastly.picsum.photos/id/925/256/256.jpg?hmac=DVD_og_saPRyWNwapFSqA4K2aJXt8RqEcreKnXkavy0',
        reactions: {
            like: [
                {
                    reactionId: "5",
                    userId: "60c72b2f9b1d4b3e4e4e1b3c",
                    firstName: "Jane",
                    middleName: "B.",
                    lastName: "Smith",
                    avatarUrl: "https://fastly.picsum.photos/id/81/256/256.jpg?hmac=ObrGC5DXhcsTiKljVNa0gC7EmY3Vvagfh2rYuP_0hFE",
                    timestamp: new Date().toISOString()
                }
            ],
            heart: []
        },
        comments: [
            {
                commentId: "2sadsad",
                userId: "60c72b2f9b1d4b3e4e4e1b61",
                text: "Keep up the great work!",
                firstName: "Diana",
                middleName: "F.",
                lastName: "Prince",
                avatarUrl: "https://fastly.picsum.photos/id/518/256/256.jpg?hmac=j5mBOAyfPJlfCPHv4pIMG7QVBThr8Te8Q1wESiujYNQ",
                timestamp: new Date().toISOString(),
                replies: [
                    {
                        replyId: "2-1",
                        userId: "60c72b2f9b1d4b3e4e4e1b62",
                        text: "Thanks, Diana!",
                        firstName: "Eve",
                        middleName: "G.",
                        lastName: "Adams",
                        avatarUrl: "https://fastly.picsum.photos/id/952/256/256.jpg?hmac=cqjEtIeeLXFDWCry9OpkV9uDbigAJoydAHBj0PPqwV4",
                        timestamp: new Date().toISOString()
                    }
                ]
            },
            {
                commentId: "2asd112",
                userId: "60c72b2f9b1d4b3e4e4e1b61",
                text: "Keep up the great work!",
                firstName: "Diana",
                middleName: "F.",
                lastName: "Prince",
                avatarUrl: "https://fastly.picsum.photos/id/518/256/256.jpg?hmac=j5mBOAyfPJlfCPHv4pIMG7QVBThr8Te8Q1wESiujYNQ",
                timestamp: new Date().toISOString(),
                replies: [
                    {
                        replyId: "2-1",
                        userId: "60c72b2f9b1d4b3e4e4e1b62",
                        text: "Thanks, Diana!",
                        firstName: "Eve",
                        middleName: "G.",
                        lastName: "Adams",
                        avatarUrl: "https://fastly.picsum.photos/id/952/256/256.jpg?hmac=cqjEtIeeLXFDWCry9OpkV9uDbigAJoydAHBj0PPqwV4",
                        timestamp: new Date().toISOString()
                    }
                ]
            }
        ]
    },
    // {
    //     authorId: "60c72b2f9b1d4b3e4e4e1b1a",
    //     captionPost: "React is great for building UIs!",
    //     authorAvatarUrl: 'https://fastly.picsum.photos/id/582/256/256.jpg?hmac=peqwFP3WuZEwg549dK3PuPyou-m-mCW6Hmd3d3bzlrA',
    //     reactions: {
    //         like: [],
    //         heart: [
    //             {
    //                 reactionId: "6",
    //                 userId: "60c72b2f9b1d4b3e4e4e1b3c",
    //                 firstName: "Jane",
    //                 middleName: "B.",
    //                 lastName: "Smith",
    //                 avatarUrl: "https://example.com/avatars/jane.jpg",
    //                 timestamp: new Date().toISOString()
    //             }
    //         ]
    //     },
    //     comments: [
    //         {
    //             commentId: "2",
    //             userId: "60c72b2f9b1d4b3e4e4e1b5e",
    //             text: "Absolutely!",
    //             firstName: "Alice",
    //             middleName: "C.",
    //             lastName: "Johnson",
    //             avatarUrl: "https://example.com/avatars/alice.jpg",
    //             timestamp: new Date().toISOString()
    //         }
    //     ]
    // },
    // {
    //     authorId: "60c72b2f9b1d4b3e4e4e1b2b",
    //     captionPost: "Anyone tried TypeScript yet?",
    //     authorAvatarUrl: 'https://fastly.picsum.photos/id/582/256/256.jpg?hmac=peqwFP3WuZEwg549dK3PuPyou-m-mCW6Hmd3d3bzlrA',
    //     reactions: {
    //         like: [],
    //         heart: []
    //     },
    //     comments: []
    // },
    // {
    //     authorId: "60c72b2f9b1d4b3e4e4e1b1a",
    //     captionPost: "Just completed a project using Express!",
    //     authorAvatarUrl: 'https://fastly.picsum.photos/id/582/256/256.jpg?hmac=peqwFP3WuZEwg549dK3PuPyou-m-mCW6Hmd3d3bzlrA',
    //     reactions: {
    //         like: [
    //             {
    //                 reactionId: "7",
    //                 userId: "60c72b2f9b1d4b3e4e4e1b2b",
    //                 firstName: "John",
    //                 middleName: "A.",
    //                 lastName: "Doe",
    //                 avatarUrl: "https://example.com/avatars/john.jpg",
    //                 timestamp: new Date().toISOString()
    //             }
    //         ],
    //         heart: []
    //     },
    //     comments: []
    // },
    // {
    //     authorId: "60c72b2f9b1d4b3e4e4e1b1b",
    //     captionPost: "The web is constantly evolving!",
    //     authorAvatarUrl: 'https://fastly.picsum.photos/id/582/256/256.jpg?hmac=peqwFP3WuZEwg549dK3PuPyou-m-mCW6Hmd3d3bzlrA',
    //     reactions: {
    //         like: [],
    //         heart: []
    //     },
    //     comments: []
    // },
    // {
    //     authorId: "60c72b2f9b1d4b3e4e4e1b1c",
    //     captionPost: "CSS makes everything beautiful!",
    //     authorAvatarUrl: 'https://fastly.picsum.photos/id/582/256/256.jpg?hmac=peqwFP3WuZEwg549dK3PuPyou-m-mCW6Hmd3d3bzlrA',
    //     reactions: {
    //         like: [],
    //         heart: []
    //     },
    //     comments: []
    // },
    // {
    //     authorId: "60c72b2f9b1d4b3e4e4e1b1a",
    //     captionPost: "Frontend or Backend? What's your preference?",
    //     authorAvatarUrl: 'https://fastly.picsum.photos/id/582/256/256.jpg?hmac=peqwFP3WuZEwg549dK3PuPyou-m-mCW6Hmd3d3bzlrA',
    //     reactions: {
    //         like: [
    //             {
    //                 reactionId: "8",
    //                 userId: "60c72b2f9b1d4b3e4e4e1b2b",
    //                 firstName: "John",
    //                 middleName: "A.",
    //                 lastName: "Doe",
    //                 avatarUrl: "https://example.com/avatars/john.jpg",
    //                 timestamp: new Date().toISOString()
    //             }
    //         ],
    //         heart: []
    //     },
    //     comments: [
    //         {
    //             commentId: "3",
    //             userId: "60c72b2f9b1d4b3e4e4e1b5e",
    //             text: "I prefer Backend!",
    //             firstName: "Alice",
    //             middleName: "C.",
    //             lastName: "Johnson",
    //             avatarUrl: "https://example.com/avatars/alice.jpg",
    //             timestamp: new Date().toISOString()
    //         }
    //     ]
    // },
    // {
    //     authorId: "60c72b2f9b1d4b3e4e4e1b1b",
    //     authorAvatarUrl: 'https://fastly.picsum.photos/id/582/256/256.jpg?hmac=peqwFP3WuZEwg549dK3PuPyou-m-mCW6Hmd3d3bzlrA',
    //     captionPost: "APIs are crucial for modern web development!",
    //     reactions: {
    //         like: [],
    //         heart: []
    //     },
    //     comments: []
    // },
    // {
    //     authorId: "60c72b2f9b1d4b3e4e4e1b1c",
    //     captionPost: "JavaScript is the language of the web!",
    //     authorAvatarUrl: 'https://fastly.picsum.photos/id/582/256/256.jpg?hmac=peqwFP3WuZEwg549dK3PuPyou-m-mCW6Hmd3d3bzlrA',
    //     reactions: {
    //         like: [],
    //         heart: []
    //     },
    //     comments: []
    // }
];
