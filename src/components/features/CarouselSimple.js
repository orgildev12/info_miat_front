
export const CarouselSimple = ({ slides, delay = 7 }) => {
    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }

    return (
        <div className="overflow-hidden relative">
            <div className="flex mask-gradient">
                <div className={classNames(
                    "mx-auto items-center gap-x-5",
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
                                        'object-cover w-[400px] h-[100px] rounded-md aspect-[8/4]'
                                    )
                                }
                            />
                        })
                    }
                    {
                        slides.map((item, index) => {
                            return <img
                                alt={item.name}
                                src={item.img}
                                key={index}
                                className={
                                    classNames(item.className,
                                        'opacity-90 hover:opacity-100 cursor-pointer transition-opacity duration-300',
                                        'object-cover w-[400px] h-[100px] rounded-md aspect-[8/4]'
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