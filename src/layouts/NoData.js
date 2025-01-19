import React from "react";

const NoData = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="text-center space-y-4">
                <div className="flex justify-center">
                    <svg
                        className="w-24 h-24 text-gray-400"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M3.375 12c0 4.771 3.854 8.625 8.625 8.625s8.625-3.854 8.625-8.625S16.771 3.375 12 3.375 3.375 7.229 3.375 12z"
                        />
                    </svg>
                </div>
                <h1 className="text-2xl font-semibold text-gray-700">
                    Мэдээлэл байхгүй байна
                </h1>
            </div>
        </div>
    );
};

export default NoData;
