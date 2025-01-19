import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="bg-white bottom-0 min-w-full" aria-labelledby="footer-heading">
            <Link
                to="/"
                title="Нүүр хуудас"
                className="text-govblue fixed bottom-4 right-4 hover:cursor-pointer text-center
                        border-govblue rounded-full border-[2px] p-2 md:p-4 bg-white font-medium"
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 md:w-12 md:h-12 m-auto">
                    <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
                    <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
                </svg>
                Нүүр <br />
                хуудас
            </Link>
            <div className="mx-auto max-w-full">
                <div className="pt-4 border-t border-gray-900/10 flex justify-center items-center">
                    <img src="/mecore-logos/main-logo/orkhonitkh_logo.png" className="h-[100px]" alt="orkhonitkh_logo" />
                </div>
                <div className="py-4 text-center">
                    <p className="text-sm leading-5 text-black font-medium">&copy; Орхон аймгийн иргэдийн Төлөөлөгчдийн Хурал {new Date().getFullYear()}</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
