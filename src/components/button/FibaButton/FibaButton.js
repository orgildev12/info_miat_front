import React from 'react'
import { classNames } from '../../../service/CoreFunctions';

const FibaButton = ({
    type = 'button', onClick, children, themeColor = 'primary',
    buttonType = 'primary', icon, className, ...rest
}) => {
    let class_name = '';
    switch (themeColor) {
        case 'primary':
            class_name = 'bg-primary-600 hover:bg-primary-700 focus:ring-primary-500 text-white';
            break;
        case 'error':
            class_name = 'bg-rose-600 hover:bg-rose-700 focus:ring-rose-500 text-white';
            break;
        case 'none':
            class_name = 'border hover:bg-gray-200 focus:ring-primary-500 text-gray-700';
            break;
        default:
            break;
    }

    class_name = classNames(class_name, className)

    switch (buttonType) {
        case 'icon':
            class_name = classNames(class_name, 'rounded-full p-1.5');
            break;
        case 'primary':
            class_name = classNames(class_name, 'rounded px-3 py-1.5');
            break;
        default:
            break;
    }

    return (
        <button type={type} onClick={onClick} {...rest}
            className={
                classNames(class_name, 'inline-flex items-center border border-transparent text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2')
            }
        >
            {/* <div className='flex overflow-x-auto'> */}
                {icon}
                {children}
            {/* </div> */}

        </button>
    )
}

export default FibaButton