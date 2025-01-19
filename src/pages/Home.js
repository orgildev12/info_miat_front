import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();



    return (
        <div className="h-full min-h-screen bg-slate-100/90">
            {/* <ul className="cb-slideshow">
                {Array.from({ length: 7 }, (_, i) => String(i + 1).padStart(2, "0")).map((elm, idx) => (
                    <li key={idx}>
                        <span>{elm}</span>
                    </li>
                ))}
            </ul> */}
        </div>
    );
};

export default Home;
