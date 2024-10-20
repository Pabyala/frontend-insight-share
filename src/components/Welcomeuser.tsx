import React from 'react';
import { useGetUsersQuery } from '../features/users/usersApiSlice';
import { Link } from 'react-router-dom';

export interface User {
    _id: string;
    username: string;
    // Add other fields you may need
}

export default function Welcomeuser() {
    const { 
        data: users = [],  // Default to an empty array if no data
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetUsersQuery();  // Passing `undefined` if no arguments are needed
    console.log(users)
    let content;

    if (isLoading) {
        content = <p>Loading users...</p>;
    } else if (isSuccess) {
        content = (
            <section className="users">
                <h1>Users List</h1>
                {users.length > 0 ? (
                    <ul>
                        {users.map((user: User) => (
                            <li key={user._id}>{user.username}</li> 
                        ))}
                    </ul>
                ) : (
                    <p>No users found.</p>
                )}
                <Link to="/welcome">Back to Welcome</Link> <br />
                <Link to="/logout">go to logout</Link>
            </section>
        );
    } else if (isError) {
        content = <p>Error loading users: {JSON.stringify(error)}</p>;
    } else {
        // Provide a fallback for any other scenarios
        content = <p>Something went wrong.</p>;
    }

    return (
        <div>
            {content} {/* Ensure that the returned element is never undefined */}
        </div>
    );
}