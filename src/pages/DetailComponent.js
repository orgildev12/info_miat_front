import React, { useEffect, useState } from "react";
import { SERVER_HOST } from "../components/service/ApiService";
import Tuluulugch from "./Tuluulugch";
import BurenErkh from "./BurenErkh";
import Photos from "./Photos";
import { DocumentDuplicateIcon, FolderIcon, HomeIcon, PhotoIcon, UsersIcon } from "@heroicons/react/24/outline";


const DetailComponent = ({ detail }) => {

    const [selectedtab, setSelectedTab] = useState(3);

    const [tabs, setTabs] = useState([]);

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        setTabs([
            {
                index: 3,
                name: detail.name,
                href: `/menu/${detail.id}`,
                icon: DocumentDuplicateIcon,
                current: false
            },
            {
                index: 1,
                name: "Хурлын төлөөлөгч танилцуулга",
                href: `/menu/${detail.id}/taniltsuulga`,
                icon: HomeIcon,
                current: false
            },
            {
                index: 2,
                name: "Бүрэн эрхийн тогтоол",
                href: `/menu/${detail.id}/togtool`,
                icon: FolderIcon,
                current: false
            },
            {
                index: 4,
                name: "Аймгийн иргэдийн төлөөлөгчдийн хурлын ажлын албаны танилцуулга",
                href: `/menu/${detail.id}/ajliin-alba`,
                icon: UsersIcon,
                current: false
            },
            {
                index: 5,
                name: "Фото агшин",
                href: `/menu/${detail.id}/photo`,
                icon: PhotoIcon,
                current: true
            },
        ])
    }, [detail])

    return (
        <div className="min-h-screen w-full mx-0 bg-white">
            <div className="mx-auto px-7 space-y-3 py-3">
                <div className="flex justify-center mx-auto">
                    <div className="sticky top-[120px] w-72 h-[80vh]">
                        <nav className="grid items-center h-[70vh] content-center">
                            <ul className="-mx-2 space-y-1">
                                {
                                    tabs.map((item) => {
                                        return <li key={item.name}>
                                            <div
                                                onClick={() => {
                                                    setSelectedTab(item.index)
                                                }}
                                                className={classNames(
                                                    (item.index === selectedtab)
                                                        ? 'bg-indigo-700 text-white'
                                                        : 'text-indigo-500 hover:bg-indigo-700 hover:text-white',
                                                    'cursor-pointer group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold',
                                                )}
                                            >
                                                <item.icon
                                                    aria-hidden="true"
                                                    className={classNames(
                                                        (item.index === selectedtab) ? 'text-white' : 'text-indigo-500 group-hover:text-white',
                                                        'w-6 h-6 shrink-0',
                                                    )}
                                                />
                                                {item.name}
                                            </div>
                                        </li>
                                    })
                                }
                            </ul>
                        </nav>
                    </div>
                    <div className="py-10 max-w-4xl min-w-[calc(100vw-22rem)]">
                        <div className="px-4 sm:px-3 lg:px-4">
                            <div className="sm:px-3 lg:px-4 border-l border-l-slate-300">
                                {selectedtab === 1 && <Tuluulugch type={1} parentid={detail.id} />}
                                {selectedtab === 2 && <BurenErkh parentid={detail.id} />}
                                {selectedtab === 3 && <>
                                    <div
                                        style={{
                                            backgroundImage: `url('${SERVER_HOST}/api/v1/image?type=GPA&id=${detail.photo1}')`,
                                        }}
                                        className={`relative isolate overflow-hidden px-6 py-48 lg:px-8 bg-contain bg-no-repeat bg-center sm:bg-top`}>

                                    </div>

                                    <div className="text-center text-3xl font-medium">{detail.name}</div>

                                    <div className="max-w-5xl mx-auto space-y-3">
                                        {detail.type === "01" && (
                                            <>
                                                <div className="text-sm editor">
                                                    <div style={{ maxWidth: "100vw" }} dangerouslySetInnerHTML={{ __html: detail.information }} />
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </>}
                                {selectedtab === 4 && <Tuluulugch type={2} parentid={detail.id} />}
                                {selectedtab === 5 && <Photos parentid={detail.id} />}
                            </div>

                        </div>

                    </div>
                </div>


            </div>
        </div>
    );
};

export default DetailComponent;
