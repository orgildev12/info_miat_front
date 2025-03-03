import React from 'react'
import Panorama from './Panorama';

const panoramaDatas =
{
    index: 1,
    image: "/image/vrtour/Business_aisle.jpg",
    infospots: [
        {
            texthover: "Economy",
            position: {
                x: -2000,
                y: 0,
                z: 100
            },
            switchindex: 2,
            switchhref: "/vrtour2"
        },
        {
            texthover: "Business twin",
            position: {
                x: 0,
                y: -200,
                z: -1000
            },
            switchindex: 3,
            switchhref: "/vrtour3"
        }
    ]
};

const Vrtour = () => {
    return (
        <Panorama panoramaDatas={panoramaDatas} />
    )
}

export default Vrtour