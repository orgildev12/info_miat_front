import React, { useEffect, useState } from "react";
import { SERVER_HOST } from "../components/service/ApiService";
import Tuluulugch from "./Tuluulugch";
import BurenErkh from "./BurenErkh";
import Photos from "./Photos";


const DetailComponent = ({ detail }) => {

    const [selectedtab, setSelectedTab] = useState(3);

    const [tabs, setTabs] = useState([]);

    useEffect(() => {
        setTabs([
            {
                index: 1,
                name: "Хурлын төлөөлөгч танилцуулга",
                href: `/menu/${detail.id}/taniltsuulga`
            },
            {
                index: 2,
                name: "Бүрэн эрхийн тогтоол",
                href: `/menu/${detail.id}/togtool`
            },
            {
                index: 3,
                name: detail.name,
                href: `/menu/${detail.id}`
            },
            {
                index: 4,
                name: "Аймгийн иргэдийн төлөөлөгчдийн хурлын ажлын албаны танилцуулга",
                href: `/menu/${detail.id}/ajliin-alba`
            },
            {
                index: 5,
                name: "Фото агшин",
                href: `/menu/${detail.id}/photo`
            },
        ])
    }, [detail])

    return (
        <div className="min-h-screen w-full mx-0 bg-white">
            <div className="mx-auto px-7 space-y-3 py-3">
                <div className="isolate mx-auto mt-10 mb-16 grid max-w-md grid-cols-1 gap-8 md:max-w-2xl md:grid-cols-2 lg:max-w-4xl xl:mx-0 xl:max-w-none xl:grid-cols-5 text-center justify-center">
                    {tabs.map((item, index) => {
                        return <div
                            to={item.href}
                            key={index}
                            onClick={() => {
                                setSelectedTab(item.index)
                                // clickTabs(item.index)
                            }}
                            className={`cursor-pointer -m-2 grid grid-cols-1 rounded-[2rem] shadow-[inset_0_0_2px_1px_#ffffff4d] ring-1 ring-black/5 max-lg:mx-auto max-lg:w-full max-lg:max-w-md ${selectedtab === item.index ? "scale-125" : ""}`}
                        >
                            <div className="grid grid-cols-1 rounded-[2rem] p-2 shadow-md shadow-black/5 bg-gradient-to-r from-cyan-500 to-blue-500 w-full"

                            >
                                <div className="rounded-3xl bg-white p-10 pb-9 shadow-2xl ring-1 ring-black/5 flex items-center text-center">
                                    <div className={`text-xl font-semibold text-indigo-600 mx-auto`}>
                                        {item.name}
                                    </div>
                                </div>
                            </div>
                        </div>
                    })}

                </div>

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

                    <div className="max-w-7xl mx-auto space-y-3">
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
    );
};

export default DetailComponent;
