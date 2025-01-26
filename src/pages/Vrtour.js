import React, { useEffect, useRef } from 'react'
import { ImagePanorama, Viewer, CONTROLS, Infospot } from 'panolens';


const panoramaDatas = [
    {
        index: 1,
        image: "https://pchen66.github.io/Panolens/examples/asset/textures/equirectangular/tunnel.jpg",
        infospots: [
            {
                texthover: "MIAT Mongolian Airlines",
                position: {
                    x: 1000,
                    y: 0,
                    z: -2000
                },
                switchindex: 2
            }
        ]
    },
    {
        index: 2,
        image: "/image/main/miat-1.jpg",
        infospots: [
            {
                image: "/logos/main-logo/logo_w.png",
                texthover: "MIAT Mongolian",
                position: {
                    x: 1000,
                    y: 0,
                    z: -2000
                },
                switchindex: 1
            }
        ]
    },
];

const Vrtour = () => {
    const containerRef = useRef(null);
    const panorama = useRef(null)
    const viewer = useRef(null)
    const infospot = useRef(null)
    const controls = useRef(null)

    const setPanoramaView = (setindex) => {
        for (let index = 0; index < panoramaDatas.length; index++) {
            const element = panoramaDatas[index];
            if (element.index === setindex) {
                console.log(element)
                // if (panorama.current || viewer.current) {
                //     return
                // }
                containerRef.current = null;
                controls.current = CONTROLS;

                panorama.current = new ImagePanorama(element.image);
                // panorama.current = new ImagePanorama('/image/main/miat-1.jpg');
                for (let index2 = 0; index2 < element.infospots.length; index2++) {
                    console.log('indefo')
                    const element2 = element.infospots[index2];
                    infospot.current = new Infospot(200, element2.image, true);
                    infospot.current.position.set(element2.position.x, element2.position.y, element2.position.z);
                    infospot.current.addHoverText(element2.texthover);
                    infospot.current.addEventListener('click', () => {
                        setPanoramaView(element2.switchindex);
                        // You can also execute custom logic here, such as navigating to a URL or displaying additional info
                    });

                    panorama.current.add(infospot.current)
                }


                viewer.current = new Viewer({ container: containerRef.current });
                viewer.current.add(panorama.current);
                break;
            }
        }
    }

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        setPanoramaView(1)
        // viewer.current.enableControl(controls.current.DEVICEORIENTATION);
        // viewer.current.enableControl(1);
    }, []);


    return (
        <div>
            {/* <div id="container" className='w-[700px] h-[400px] mx-auto'></div> */}
            <div
                ref={containerRef}
                id='panoCont'
                // style={{ width: '95vw', height: '400px', }} 
                className='mx-auto w-[100%] h-[80vh]'
            >

            </div>
        </div>
    )
}

export default Vrtour