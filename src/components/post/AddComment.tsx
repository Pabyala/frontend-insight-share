import { Avatar } from '@mui/material'

export default function AddComment() {
    return (
        <div className="w-full flex space-x-4 p-3 mb-3 bg-lightWhite rounded">
                <div className="flex" style={{ margin: "auto" }}>
                    <Avatar
                        sx={{ width: 38, height: 38 }}
                        alt="Remy Sharp"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    />
                </div>
                <div
                    className="w-full flex flex-grow cursor-pointer"
                >
                <input type="text" />
                </div>
            </div>
    )
}