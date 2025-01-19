import React, { useEffect, useState } from 'react'
// import { useParams } from 'react-router-dom';
import { send, useFibaMsgBox, useLoading } from '../components';
import { PDFViewer } from '@progress/kendo-react-pdf-viewer';
import NoData from '../layouts/NoData';
const BurenErkh = ({ parentid }) => {

    const { showLoading } = useLoading()
    const [people, setpeople] = useState([]);
    const { error } = useFibaMsgBox();

    const getMenu = async () => {
        const res = await send(
            "mf000015",
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
            <div className='grid grid-cols-1 place-items-center gap-y-14'>
                {people.map((item, index) => {
                    return <React.Fragment key={index}>
                        {item.type === 1 && <>
                            <img
                                alt={item.name}
                                src={`data:image/png;base64, ${item.rfile}`}
                            />
                        </>}
                        {item.type === 2 && <>
                            <PDFViewer data={item.rfile} tools={['zoomInOut', 'zoom']} />
                        </>}
                    </React.Fragment>
                })}
            </div>
            {people.length === 0 && <NoData />}
        </div>
    )
}

export default BurenErkh