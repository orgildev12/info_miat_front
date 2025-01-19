import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { send } from "../components/service/api-service/services";
import { useLoading } from "../components/features/hooks/useLoading";
import { useFibaMsgBox } from "../components/features/hooks/useFibaMsgBox";
import { SERVER_HOST } from "../components/service/ApiService";

const Home = () => {
    const { showLoading } = useLoading();
    const { error } = useFibaMsgBox();
    const navigate = useNavigate();

    const [module, setModule] = useState([]);

    const getMenu = async (parentid) => {
        const res = await send(
            "mf000001",
            {
                page: 1,
                perPage: 500,
                parentid,
            },
            showLoading
        );

        if (res.status === "error") {
            error(res.message);
        } else {
            if (parentid) {
                if (res.length > 0) {
                    setModule(res);
                } else {
                    navigate("/menu/" + parentid);
                }
            } else {
                setModule(res);
            }
        }
    };

    useEffect(() => {
        getMenu(null);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="h-full min-h-screen bg-slate-100/90">
            {/* <ul className="cb-slideshow">
                {Array.from({ length: 7 }, (_, i) => String(i + 1).padStart(2, "0")).map((elm, idx) => (
                    <li key={idx}>
                        <span>{elm}</span>
                    </li>
                ))}
            </ul> */}
            <div className="mx-auto w-full gap-y-6 px-4 py-6 sm:gap-8 sm:px-6 sm:py-8 lg:px-8 lg:py-12 xl:py-16 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {module &&
                    module.map((item, index) => {
                        return (
                            <MainCard
                                key={index}
                                item={item}
                            />
                        );
                    })}
            </div>
        </div>
    );
};

const MainCard = ({ item }) => {
    return (
        <Link
            to={"/menu/" + item.id}
            className="relative flex items-center space-x-3 rounded-lg border-[2.5px]
                hover:cursor-pointer
                border-govblue50 bg-white px-6 py-5 
                shadow-sm focus-within:ring-2 
                focus-within:ring-govblue50
                focus-within:ring-offset-2 hover:border-govblue"
        >
            <div className="flex-shrink-0">
                {/* <BriefcaseIcon className="w-8 h-8 text-govblue" /> */}
                <img src={SERVER_HOST + "/api/v1/image?type=GPA&id=" + item.photo1 } className="w-36" alt="" />
            </div>
            <div className="min-w-0 flex-1">
                <div className="focus:outline-none">
                    <span className="absolute inset-0" aria-hidden="true"></span>
                    <p className="text-lg font-medium text-gray-900 uppercase">{item.name}</p>
                    {/* <p className="truncate text-sm text-gray-500">{item.description}</p> */}
                </div>
            </div>
        </Link>
    );
};

export default Home;
