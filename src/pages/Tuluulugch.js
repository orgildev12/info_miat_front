import React, { useEffect, useState } from 'react'
// import { useParams } from 'react-router-dom';
import { send, SERVER_HOST, useFibaMsgBox, useLoading } from '../components';
import { Dialog } from '@progress/kendo-react-dialogs';
import { XCircleIcon } from '@heroicons/react/24/outline';
import NoData from '../layouts/NoData';

const Tuluulugch = ({ type, parentid }) => {
    // const { parentid } = useParams();
    const { showLoading } = useLoading()
    const [people, setpeople] = useState([]);
    const [detail, setdetail] = useState();
    const { error } = useFibaMsgBox();

    const getMenu = async () => {
        const res = await send(
            "mf000014",
            {
                parentid,
                type
            },
            showLoading
        );

        if (res.status === "error") {
            error(res.message);
        } else {
            setpeople(res)
        }
    };

    const getdetail = async (id) => {
        const res = await send(
            "ml000019",
            {
                id,
            },
            showLoading
        );

        if (res.status === "error") {
            error(res.message);
        } else {
            setdetail(res)
        }
    };

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        getMenu();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <ul
                className="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 xl:grid-cols-4 text-center"
            >
                {people.map((person, index) => (
                    <li key={index} onClick={() => {
                        getdetail(person.id)
                    }}
                        className='cursor-pointer hover:scale-105 transition hover:border rounded-md text-center'
                    >
                        <img alt="" src={`${SERVER_HOST}/api/v1/image?type=GPA&id=${person.photo}`} className="aspect-[14/13] w-full rounded-2xl object-contain" />
                        <h3 className="mt-6 text-lg/8 font-semibold tracking-tight flex flex-wrap justify-center leading-5">
                            <div className='text-center'>{person.lname}</div>&nbsp;
                            <div className='uppercase'>{person.name}</div>
                        </h3>
                        <p className="text-sm text-gray-500 font-semibold">{person.position}</p>
                    </li>
                ))}
            </ul>
            {people.length === 0 && <NoData />}
            {detail && <Dialog onClose={() => { setdetail(null) }}>
                <div className='flex justify-end'>
                    <XCircleIcon className='h-5 w-5 cursor-pointer' onClick={() => {
                        setdetail(null)
                    }}
                    />
                </div>
                <div className="mx-auto max-w-7xl px-2 lg:px-4">

                    <div className="flex">
                        <div className='text-center max-w-xs'>
                            <img alt="" src={`${SERVER_HOST}/api/v1/image?type=GPA&id=${detail.photo}`} className="aspect-[14/13] w-full rounded-2xl object-contain" />
                            <h3 className="mt-6 text-lg/8 font-semibold tracking-tight">
                                <span>{detail.lname}</span>&nbsp;
                                <span className='uppercase'>{detail.name}</span>
                            </h3>
                            <p className="text-sm text-gray-500 font-semibold">{detail.position}</p>
                        </div>

                        <div className="text-sm editor ml-3 grid items-center">
                            <div style={{ maxWidth: "100vw" }} dangerouslySetInnerHTML={{ __html: detail.information }} />
                        </div>
                    </div>
                </div>
            </Dialog>}
        </div>
    )
}

export default Tuluulugch