/* eslint-disable jsx-a11y/no-redundant-roles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { HomeIcon } from '@heroicons/react/20/solid'
import { Link, useLocation } from 'react-router-dom'
import { getMenuModules } from '../../../service/RequestService'
import { APP_SUB_MENU } from '../../../constants/token.const'
import { useTranslation } from 'react-i18next'
/**
 * Чиглүүлэгч Route зурна.
 * @param {object} emptyJumpUrl Тухайн элемент дээрх url-г дарж өмнөх элементийн url-тай адилхан болгоно.
 */
export const FibaBreadcrumb = ({ emptyJumpUrl = {} }) => {
    const location = useLocation()
    const [paths, setPaths] = useState([])
    const pathSplits = location.pathname.split('/');
    const { i18n, t } = useTranslation()

    useEffect(() => {
        const getModules = async () => {
            const modules = await getMenuModules();
            const tmp = [];
            let link = '', tmplink = '', moduleid = '', tmpFullLink = '';
            pathSplits.forEach((element, count) => {
                if (element) {
                    link = link + '/' + element;
                }
                if (element && element !== 'menu') {
                    let name = element, name2 = element;
                    if (tmplink === 'menu') {
                        for (let index = 0; index < modules.length; index++) {
                            const module = modules[index];
                            if (module.moduleid === element) {
                                name = module.name;
                                name2 = module.name2;
                                moduleid = module.moduleid;
                                break;
                            }
                        }
                    }
                    if (pathSplits.length === 2) {
                        name = t(element);
                    }
                    if (moduleid !== '' && element !== moduleid) {
                        let subMenuData = sessionStorage.getItem(APP_SUB_MENU);
                        if (subMenuData) {
                            subMenuData = JSON.parse(subMenuData);
                            if (subMenuData[moduleid] && subMenuData[moduleid].paths) {
                                for (let index2 = 0; index2 < subMenuData[moduleid].paths.length; index2++) {
                                    const subelements = subMenuData[moduleid].paths[index2];
                                    if (subelements.paths) {
                                        for (let index3 = 0; index3 < subelements.paths.length; index3++) {
                                            const pathelement = subelements.paths[index3];
                                            if (pathelement.pc === element) {
                                                name = pathelement.name;
                                                name2 = pathelement.name2;
                                                break;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        moduleid = '';
                    }
                    if (count > 4 && emptyJumpUrl[element]) {
                        tmp.push({
                            name: emptyJumpUrl[element],
                            name2: emptyJumpUrl[element],
                            to: tmpFullLink
                        });
                    } else {
                        tmp.push({
                            name: name,
                            name2: name2,
                            to: link
                        });
                    }
                    
                }
                tmpFullLink = link;
                tmplink = element;
            });
            setPaths(tmp);
        }
        setPaths([])
        if (pathSplits.length > 1) {
            if (pathSplits[1] !== '') {
                getModules()
            }
        }
    }, [location])
    return (
        <nav className="flex my-2 mx-2" aria-label="Breadcrumb">
            {paths.length > 0 && <ul role="list" className="flex items-center space-x-4">
                <li>
                    <div>
                        <Link to={"/"} className="text-gray-400 hover:text-gray-500" title='Home'>
                            <HomeIcon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
                            <span className="sr-only">Home</span>
                        </Link>
                    </div>
                </li>
                {paths.map((page, index) => (
                    <li key={index}>
                        <div className="flex items-center">
                            <svg
                                className="h-5 w-5 flex-shrink-0 text-gray-300"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                aria-hidden="true"
                            >
                                <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                            </svg>
                            <Link
                                to={page.to + window.location.search}
                                className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
                                aria-current={page.current ? 'page' : undefined}
                                title={(i18n.language === 'mn') ? page.name : page.name2}
                            >
                                {(i18n.language === 'mn') ? page.name : page.name2}
                            </Link>
                        </div>
                    </li>
                ))}
            </ul>}
        </nav>
    )
}