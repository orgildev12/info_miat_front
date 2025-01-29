import React, { useEffect, useRef } from 'react'
import { ImagePanorama, Viewer, CONTROLS, Infospot } from 'panolens';
import { useNavigate } from 'react-router-dom';

const Panorama = ({ panoramaDatas }) => {
    const containerRef = useRef(null);
    const panorama = useRef(null)
    const viewer = useRef(null)
    const infospot = useRef(null)
    const controls = useRef(null)
    const navigate = useNavigate()

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        if ((panorama.current || viewer.current)) {
            return
        }

        controls.current = CONTROLS;

        panorama.current = new ImagePanorama(panoramaDatas.image);
        // panorama.current = new ImagePanorama('/image/main/miat-1.jpg');
        for (let index2 = 0; index2 < panoramaDatas.infospots.length; index2++) {
            const element2 = panoramaDatas.infospots[index2];
            infospot.current = new Infospot(200, element2.image, true);
            infospot.current.position.set(element2.position.x, element2.position.y, element2.position.z);
            infospot.current.addHoverText(element2.texthover);
            infospot.current.addEventListener('click', () => {
                navigate(element2.switchhref);
                // You can also execute custom logic here, such as navigating to a URL or displaying additional info
            });

            panorama.current.add(infospot.current)
        }
        viewer.current = new Viewer({ container: containerRef.current });
        viewer.current.add(panorama.current);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    return (
        <div className='h-[100vh] mb-20'>
            {/* <div className='bg-background-dark fixed bg-cover h-full w-full top-0 left-0 -z-10 re'></div> */}
            {/* <div id="container" className='w-[700px] h-[400px] mx-auto'></div> */}
            <div
                ref={containerRef}
                id='panoCont'
                // style={{ width: '95vw', height: '400px', }} 
                className='mx-auto w-[100%] h-[100vh] fixed top-0 left-0'
            >

            </div>
        </div>
    )
}

export default Panorama