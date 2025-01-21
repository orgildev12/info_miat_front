import { useEffect, useState } from "react";
const carouselTimer = 'carouselSessionTimer';
export const Carousel = ({ slides, delay = 7 }) => {
    const [current, setCurrent] = useState(0);

    const previousSlide = () => {
        localStorage.setItem(carouselTimer, new Date());
        const tmpcurrent = localStorage.getItem('Carousel-Current');
        if (tmpcurrent === 0) setCurrent(slides.length - 1);
        else setCurrent(tmpcurrent - 1);
    };

    const nextSlide = () => {
        localStorage.setItem(carouselTimer, new Date());
        const tmpcurrent = +localStorage.getItem('Carousel-Current');
        if (tmpcurrent === slides.length - 1) {
            setCurrent(0);
        } else {
            setCurrent(tmpcurrent + 1);
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            let time = localStorage.getItem(carouselTimer);
            if (!time) {
                localStorage.setItem(carouselTimer, new Date());
                time = new Date();
            } else {
                time = new Date(time);
            }
            let diffTime = new Date().getTime() - time.getTime();
            const lifetime = 1;
            const lateTokenTime = (lifetime * delay) - (diffTime / 1000);
            if (lateTokenTime < 1) {
                nextSlide()
            }
        }, 1000);
        return () => clearInterval(interval);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        localStorage.setItem('Carousel-Current', current);
    }, [current])

    return (
        <div className="overflow-hidden relative">
            <div
                className={`flex transition ease-out duration-1000`}
                style={{
                    transform: `translateX(-${current * 100}vw)`,
                }}
            >
                {slides.map((s, index) => {
                    return <div
                        key={index}
                        className="
                            max-w-[100vw] min-w-[100vw] 
                            h-[400px] text-white
                            bg-cover bg-center bg-no-repeat
                        "
                        style={{ backgroundImage: `url(${s.img})` }}>
                        <div
                            className="w-full h-full bg-gradient-to-br from-black via-transparent to-black justify-center items-center flex px-10"
                            style={{ backgroundColor: "radial-gradient(circle, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.7) 90%)" }}
                        >
                            {(current === index) && <div className="max-w-4xl text-center transition ease-out duration-40 fadeInDown animated delay-[3000ms]">
                                <div className="text-[#FFCB05] text-base font-semibold sm:text-xl sm:font-medium uppercase bg-black/10">
                                    Ж.САМБУУГИЙН НЭРЭМЖИТ МАЛ АЖ АХУЙН ЭРДЭМ ШИНЖИЛГЭЭНИЙ ХҮРЭЭЛЭН
                                </div>
                                <div className="font-semibold text-xl sm:text-2xl md:text-3xl">
                                    {s.title}
                                </div>
                            </div>}
                        </div>
                    </div>;
                })}
            </div>

            <div className="absolute top-0 h-full w-full justify-between items-center flex text-white px-5 text-3xl">
                <button onClick={previousSlide}>
                    <svg className="w-4 h-4 text-white rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4" />
                    </svg>
                    <span className="sr-only">Previous</span>
                </button>
                <button onClick={nextSlide}>
                    <svg className="w-4 h-4 text-white rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                    </svg>
                    <span className="sr-only">Next</span>
                </button>
            </div>

            <div className="absolute bottom-0 py-4 flex justify-center gap-2.5 w-full">
                {slides.map((s, i) => {
                    return (
                        <div
                            onClick={() => {
                                setCurrent(i);
                            }}
                            key={"circle" + i}
                            className={
                                `rounded-full w-2.5 h-2.5 cursor-pointer border
                                ${i === current ? "bg-white" : ""}`
                            }
                        ></div>
                    );
                })}
            </div>
        </div>
    );
}