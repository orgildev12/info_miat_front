import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { send, useFibaMsgBox, useLoading } from "../components";
import DetailComponent from "./DetailComponent";

const InformationDetail = () => {
    const { id } = useParams();
    const { showLoading } = useLoading();
    const { error } = useFibaMsgBox();
    const [detail, setdetail] = useState({});

    const getMenu = async () => {
        const res = await send(
            "mf000011",
            {
                id,
            },
            showLoading
        );

        if (res.status === "error") {
            error(res.message);
        } else {
            setdetail(res);
        }
    };

    useEffect(() => {
        getMenu();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    return (
        <div className="w-full min-h-screen">
            <nav className="w-full flex py-2 mx-0 pl-5 sticky top-[80px] bg-white z-50 min-h-12" aria-label="Breadcrumb">
                <ol className="flex items-center space-x-4">
                    <li>
                        <div>
                            <Link to={"/"} className=" font-bold">
                                Нүүр хуудас
                            </Link>
                        </div>
                    </li>
                    <li>
                        <div className="flex items-center">
                            <svg className="h-5 w-5 flex-shrink-0 text-gray-300" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                                <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                            </svg>
                            <div className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700" aria-current={"page"}>
                                {detail.name}
                            </div>
                        </div>
                    </li>
                </ol>
            </nav>
            <DetailComponent detail={detail} />
        </div>
    );
};

export default InformationDetail;
