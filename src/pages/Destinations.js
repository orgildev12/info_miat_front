import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@progress/kendo-react-buttons';
import Connected from './Connected';
import Domestic from './Domestic';
import FlightRoutes from './FlightRoutes';

const destTypes = [
    'routes',
    'connected',
    'domestic',
];
const Destinations = () => {
    const [destinationType, setDestinationType] = useState('connected');

    const { t } = useTranslation();


    return (
        <div className='mb-[4rem] h-[100vh]'>
            {
                destinationType === 'routes' && <FlightRoutes />
            }
            {
                destinationType === 'connected' && <Connected />
            }
            {
                destinationType === 'domestic' && <Domestic />
            }
            <div className='fixed top-20 right-12 flex flex-col gap-2 z-10'>
                {
                    destTypes.map((item) =>
                        <Button
                            type="button"
                            themeColor={'primary'} 
                            key={item}
                            onClick={() => {
                                setDestinationType(item)
                            }}
                        >
                            {t(item)}
                        </Button>)
                }
            </div>
        </div>
    )
}

export default Destinations