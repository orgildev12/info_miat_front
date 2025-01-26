import React from 'react'
import Panorama from './Panorama';


const panoramaDatas = {
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
            switchindex: 1,
            switchhref: "/vrtour"
        }
    ]
};

const Vrtour2 = () => {
    return (
        <Panorama panoramaDatas={panoramaDatas} />
    )
}

export default Vrtour2