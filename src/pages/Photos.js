import React, { useEffect, useState } from 'react'
// import { useParams } from 'react-router-dom';
import { send, SERVER_HOST, useFibaMsgBox, useLoading } from '../components';
const Photos = ({ parentid }) => {

    const { showLoading } = useLoading()
    const [people, setpeople] = useState([]);
    const { error } = useFibaMsgBox();

    const getMenu = async () => {
        const res = await send(
            "mf000016",
            {
                parentid
            },
            showLoading
        );

        if (res.status === "error") {
            error(res.message);
        } else {
            setpeople(res)
        }
    };

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        getMenu();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <div className='bg-white'>
            <div className='mx-auto max-w-7xl'>
                <div className='grid grid-cols-2 place-items-center gap-y-14 gap-x-5'>
                    {people.map((item, index) => {
                        return <div key={index}>
                            <img alt="" src={`${SERVER_HOST}/api/v1/image?type=GPA&id=${item.photo}`} />

                            <div className='text-center text-sm text-gray-500 font-medium'>
                                {index + 1}.{item.information}
                            </div>
                        </div>
                    })}
                </div>

            </div>

        </div>
    )
}

export default Photos