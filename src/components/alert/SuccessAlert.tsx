import React from "react";

interface SuccessAlertProps {
    message: string;
    onConfirm: () => void;
    buttonName: string
    icon: React.ReactNode;
}

export default function SuccessAlert({ message, onConfirm, buttonName, icon }: SuccessAlertProps) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center w-full h-full overflow-y-auto bg-black bg-opacity-50">
            <div className="relative p-4 w-full max-w-sm max-h-full">
                <div className="relative bg-white rounded-lg shadow p-3 space-y-3 lg:p-4">
                <span className="w-full flex item-center justify-center text-[100px]">
                    {icon}
                </span>
                <h2 className="text-base text-center font-medium text-gray-900">
                    {message}
                </h2>
                <div className="flex w-full space-x-3">
                    <button
                        onClick={onConfirm}
                        className="text-sm w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
                    >
                        {buttonName}
                    </button>
                </div>
                </div>
            </div>
        </div>
    );
}
