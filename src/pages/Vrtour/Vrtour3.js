import React from 'react'
import Panorama from './Panorama';


const panoramaDatas = {
    index: 3,
    image: "/image/vrtour/Business_twin_general.jpg",
    infospots: [
        {
            image: "/logos/main-logo/logo_w.png",
            texthover: "Business",
            position: {
                x: 500,
                y: -200,
                z: -800
            },
            switchindex: 1,
            switchhref: "/vrtour"
        }
    ]
};

const Vrtour3 = () => {
    return (
        <Panorama panoramaDatas={panoramaDatas} />
    )
}

export default Vrtour3