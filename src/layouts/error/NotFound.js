import React from "react";
export default function NotFound() {
    return (
        <div className="bg-cover flex min-h-screen flex-col pt-16 pb-12">
            <main className="mx-auto flex w-full flex-grow flex-col justify-center px-4 sm:px-6 lg:px-8">
                <div className="py-16">
                    <div className="text-center">
                        <p className="text-base font-semibold text-govblue">404</p>
                        <h1 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">Хуудас олдсонгүй.</h1>
                        <p className="mt-2 text-base text-gray-500">Уучлаарай, таны хайж буй хуудас олдсонгүй.</p>
                    </div>
                </div>
            </main>
        </div>
    );
}
