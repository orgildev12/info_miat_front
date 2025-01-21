import React from "react";
import { useNavigate } from "react-router-dom";
import { Carousel } from "../components/features/Carousel";

let slides = [
    // {
    //     img: "/background-image/riah/Picture1.jpg",
    //     title: ""
    // },
    {
        img: "/background-image/livery/1.jpg",
        title: ""
    },
    {
        img: "/background-image/livery/2.jpg",
        title: ""
    },
    {
        img: "/background-image/livery/3.jpg",
        title: ""
    },
    {
        img: "/background-image/livery/4.jpg",
        title: ""
    }
];

const Home = () => {
    const navigate = useNavigate();



    return (
        <div className="h-full min-h-screen bg-slate-100/90">
            {/* <Carousel slides={slides} /> */}
        </div>
    );
};

export default Home;
