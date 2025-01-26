import React from 'react'
import Panorama from './Panorama';

const panoramaDatas =
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
            switchindex: 2,
            switchhref: "/vrtour2"
        }
    ]
};

const Vrtour = () => {
    return (
        <Panorama panoramaDatas={panoramaDatas} />
    )
}

export default Vrtour