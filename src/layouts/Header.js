import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { send, SERVER_HOST, useFibaMsgBox, useLoading } from "../components";

const Header = () => {
    const navigate = useNavigate();
    const [isFullScreen] = useState(false);
    const { showLoading } = useLoading()
    const [settings, setSettings] = useState({});
    const { error } = useFibaMsgBox();

    const handleFullScreenToggle = () => {
        const element = document.documentElement;

        if (!isFullScreen) {
            // Request full screen
            if (element.requestFullscreen) {
                element.requestFullscreen().catch((err) => {
                    console.error("Error attempting to enable full screen:", err.message);
                });
            } else if (element.mozRequestFullScreen) {
                element.mozRequestFullScreen().catch((err) => {
                    console.error("Error attempting to enable full screen:", err.message);
                });
            } else if (element.webkitRequestFullscreen) {
                element.webkitRequestFullscreen().catch((err) => {
                    console.error("Error attempting to enable full screen:", err.message);
                });
            } else if (element.msRequestFullscreen) {
                element.msRequestFullscreen().catch((err) => {
                    console.error("Error attempting to enable full screen:", err.message);
                });
            }
        } else {
            // Exit full screen
            if (document.exitFullscreen) {
                document.exitFullscreen().catch((err) => {
                    console.error("Error attempting to exit full screen:", err.message);
                });
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen().catch((err) => {
                    console.error("Error attempting to exit full screen:", err.message);
                });
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen().catch((err) => {
                    console.error("Error attempting to exit full screen:", err.message);
                });
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen().catch((err) => {
                    console.error("Error attempting to exit full screen:", err.message);
                });
            }
        }

        // Toggle the state
        // setIsFullScreen(!isFullScreen);
    };

    const getMenu = async () => {
        const res = await send(
            "ml000031",
            {},
            showLoading
        );

        if (res.status === "error") {
            error(res.message);
        } else {
            setSettings(res)
        }
    };

    useEffect(() => {
        getMenu();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        setTimeout(handleFullScreenToggle, 3000);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    document.addEventListener("fullscreenchange", () => {
        if (document.fullscreenElement) console.info("We are fullscreen!!!");
        else console.info("Do nothing...");
    });

    useEffect(() => {
        const handleScroll = () => {
            localStorage.setItem("sessionTimer", new Date());
        };
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            let time = localStorage.getItem("sessionTimer");
            if (!time) {
                localStorage.setItem("sessionTimer", new Date());
                time = new Date();
            } else {
                time = new Date(time);
            }
            let diffTime = new Date().getTime() - time.getTime();
            const lifetime = 0.5;
            const lateTokenTime = lifetime * 60 - diffTime / 1000;
            if (lateTokenTime < 1) {
                // navigate("/");
            }
        }, 1000);
        return () => clearInterval(interval);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <header className="sticky top-0 bg-gradient-to-r from-100 from-0% via-primary-500 via-60% to-primary-100 to-100% shadow z-50">
            <div className="w-full bg-body border-b border-gray-900/10">
                <div className="mx-8 md:mx-16 lg:mx-32 py-3">
                    <div
                        className="flex items-center gap-4 cursor-pointer"
                        onClick={(e) => {
                            e.preventDefault();
                            navigate("/");
                        }}
                    >
                        {/* {settings.logo1 && <img
                            src={`${SERVER_HOST}/api/v1/image?type=GPA&id=${settings.logo1}`}
                            alt="orkhonitkh_uigarjin"
                            className="hidden lg:block h-[50px]"
                        />} */}
                        {settings.logo2 && <img
                            src={`${SERVER_HOST}/api/v1/image?type=GPA&id=${settings.logo2}`}
                            alt="orkhonitkh_main"
                            className="h-[25px] sm:h-[45px] md:h-[55px]"
                        />}
                        {!settings.logo2 && <div className="h-[45pt] sm:h-[65pt] md:h-[75pt]"/>}
                        <o className="text-govblue font-bold uppercase align-middle text-[8pt] sm:text-[12pt] md:text-[13pt] lg:text-[15pt]">
                            {settings.name}
                            <div className="hidden md:block font-bold text-[8pt]">{settings.description}</div>
                        </o>
                        {settings.logo3 && <img
                            src={`${SERVER_HOST}/api/v1/image?type=GPA&id=${settings.logo3}`}
                            alt="orkhonitkh_odon"
                            className="ms-auto h-[25px] sm:h-[45px] md:h-[55px]"
                        />}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
