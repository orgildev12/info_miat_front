import React, { useEffect, useState } from "react";
import { send, SERVER_HOST, useFibaMsgBox, useLoading } from "../components";
import { Link } from "react-router-dom";
const ListV2 = () => {
    const { showLoading } = useLoading();
    const { error } = useFibaMsgBox();
    const [module, setModule] = useState([]);
    const [settings, setSettings] = useState({});

    const getMenu = async (parentid) => {
        const res1 = await send(
            "ml000031",
            {},
            showLoading
        );

        if (res1.status === "error") {
            error(res1.message);
        } else {
            setSettings(res1)
        }

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
            setModule(res);
        }
    };

    useEffect(() => {
        getMenu(null);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="w-full min-h-screen">

            <section>
                <div class="bg-white text-black py-8">
                    <div class="container mx-auto flex flex-col items-start md:flex-row my-5">
                        <div class="flex flex-col w-full sticky top-24 lg:w-1/3 mt-2 md:mt-12 pl-8">
                            <div className="mb-10">
                                {settings.logo2 && <img
                                    src={`${SERVER_HOST}/api/v1/image?type=GPA&id=${settings.logo2}`}
                                    alt="orkhonitkh_main"
                                    className="h-[100px]"
                                />}
                            </div>
                            <p class="font-bold uppercase align-middle text-2xl mb-2">{settings.name}</p>
                            <p class="text-sm md:text-base text-gray-600 mb-8 font-semibold">
                                {settings.description}
                            </p>
                            <div className="relative group">
                                {/* Blurred border effect */}
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 blur-md opacity-75 rounded-xl -z-10"></div>
                                {settings.logo1 && <img
                                    src={`${SERVER_HOST}/api/v1/image?type=GPA&id=${settings.logo1}`}
                                    alt="orkhonitkh_main"
                                    className="w-full rounded-lg"
                                />}
                            </div>

                        </div>
                        <div class="ml-0 md:ml-12 lg:w-2/3 sticky">
                            <div class="container mx-auto w-full h-full">
                                <div class="relative wrap overflow-hidden p-5 h-full">
                                    <div class="border-2-2 border-govblue absolute h-full border"
                                        style={{ right: "50%", border: "2px solid #0047BE", borderRadius: "1%" }}
                                    ></div>
                                    <div class="border-2-2 border-govblue absolute h-full border"
                                        style={{ left: "50%", border: "2px solid #0047BE", borderRadius: "1%" }}></div>

                                    {
                                        module.map((item, index) => {
                                            return <Link
                                                to={"/menu/" + item.id}
                                                key={index}
                                                class={`mb-5 flex justify-between items-center w-full ${index % 2 === 0 ? "flex-row-reverse left-timeline" : "left-timeline"}`}>
                                                <div class="order-1 w-5/12"></div>
                                                <div class={`order-1 w-5/12 px-1 py-4 text-${index % 2 === 0 ? "right" : "left"}`}>
                                                    <p class="mb-3 text-base text-govblue">...............................</p>
                                                    <h4 class="mb-3 font-bold text-lg md:text-2xl text-govblue">{item.name}</h4>
                                                    <p class="text-sm md:text-base leading-snug text-gray-900 text-opacity-100 line-clamp-3" dangerouslySetInnerHTML={{ __html: item.information }}>
                                                        {/* {item.information} */}
                                                    </p>
                                                    <p class="mb-3 text-base text-govblue">...............................</p>
                                                </div>
                                            </Link>
                                        })
                                    }

                                </div>
                                <img
                                    class="mx-auto -mt-36 md:-mt-36"
                                    alt=""
                                    src="/image/timeline.png"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ListV2;
