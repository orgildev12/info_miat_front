import { Listbox } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';

const languages = [
    {
        id: 'mn',
        name: 'Монгол',
    },
    {
        id: 'en',
        name: 'English',
    }
];

export const ChangeLanguage = () => {
    const { i18n } = useTranslation();
    const [selected, setSelected] = useState({})

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng)
        localStorage.setItem('i18nextLngMeCoreBack', lng);
    }

    useEffect(() => {
        let isfound = false;
        for (let index = 0; index < languages.length; index++) {
            const language = languages[index];
            if (i18n.language === language.id) {
                setSelected(language)
            }
        }
        if (!isfound) {
            setSelected(languages[0])
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (selected && selected.id) {
            changeLanguage(selected.id)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selected])

    return (
        <Listbox value={selected} onChange={setSelected}>
            <div className="relative mt-3">
                <Listbox.Button className="cursor-default rounded-md flex items-center">
                    <img alt="" src={`/logos/flags/${selected.id}.svg`} className="w-5 shrink-0" />
                    <ChevronDownIcon
                        aria-hidden="true"
                        className="col-start-1 row-start-1 h-5 w-5 self-center justify-self-end text-white sm:h-4 sm:w-4"
                    />
                </Listbox.Button>
                <Listbox.Options
                    className="absolute z-10 mt-1 max-h-56 overflow-auto rounded-md bg-white py-1 w-14"
                >
                    {languages.map((lang) => (
                        lang.id !== selected.id ? <Listbox.Option
                            key={lang.id}
                            value={lang}
                            className="group relative cursor-default select-none"
                            title={lang.name}
                        >
                            <div className="flex items-center justify-center">
                                <img alt="" src={`/logos/flags/${lang.id}.svg`} className="h-5 shrink-0" />
                            </div>
                        </Listbox.Option> : <React.Fragment key={lang.id}></React.Fragment>
                    ))}
                </Listbox.Options>
            </div>
        </Listbox>
    )
}