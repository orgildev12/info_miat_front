import { GlobeAltIcon } from '@heroicons/react/24/outline';
import React from 'react'
import { useTranslation } from 'react-i18next';

export const ChangeLanguage = () => {
    const { i18n } = useTranslation();
    const changeLanguage = () => {
        let lng = 'mn';
        if (i18n.language === 'mn') {
            lng = 'en';
        }
        i18n.changeLanguage(lng)
        localStorage.setItem('i18nextLngMeCoreBack', lng);
    }

    return (
        <button
            type="button"
            className="flex px-4 py-2 text-sm text-gray-700 w-full text-left leading-tight rounded hover:bg-gray-100 focus:bg-gray-100 focus:outline-none focus:ring-0 active:bg-gray-200 transition duration-150 ease-in-out"
            onClick={changeLanguage}
        >
            <GlobeAltIcon className='h-5 w-5' />&ensp;
            {
                i18n.language === 'en' && <React.Fragment>Монгол</React.Fragment>
            }
            {
                i18n.language === 'mn' && <React.Fragment>English</React.Fragment>
            }
        </button>
    )
}