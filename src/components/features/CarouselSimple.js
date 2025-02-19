
export const CarouselSimple = ({ slides, delay = 7 }) => {
    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }

    return (
        <div className="overflow-hidden relative">
            <div className="flex mask-gradient">
                <div className={classNames(
                    "mx-auto items-center gap-x-20",
                    "scroll reverse w-full flex"
                )}>
                    {
                        slides.map((item, index) => {
                            return <img
                                alt={item.name}
                                src={item.img}
                                key={index}
                                className={
                                    classNames(item.className,
                                        'opacity-90 hover:opacity-100 cursor-pointer transition-opacity duration-300',
                                        'object-contain h-[100px]'
                                    )
                                }
                            />
                        })
                    }
                    {
                        slides.length < 10 &&  slides.map((item, index) => {
                            return <img
                                alt={item.name}
                                src={item.img}
                                key={index}
                                className={
                                    classNames(item.className,
                                        'opacity-90 hover:opacity-100 cursor-pointer transition-opacity duration-300',
                                        'object-contain h-[100px]'
                                    )
                                }
                            />
                        })
                    }
                </div>
            </div>
        </div>
    );
}