import React from 'react'
import { send } from '../service';
import FibaButton from './FibaButton/FibaButton';
import { t } from "i18next"
import { CloudArrowUpIcon } from '@heroicons/react/24/outline';
import { useFibaMsgBox, useLoading } from '../features';

const ActiveParamBtn = ({ process_code }) => {
    const { confirm, error, success } = useFibaMsgBox();
    const { showLoading } = useLoading()
    const sendActiveRequest = async () => {
        const isconfirmtxn = await confirm(t('doactiveparam'));
        if (isconfirmtxn) {
            const res = await send(process_code, null, showLoading);
            if (res.status === 'error') {
                error(res.message)
            } else {
                success(t('success'))
            }
        }

    }
    return <FibaButton
        title={t('activateparam')}
        buttonType={'icon'}
        themeColor={'none'}
        icon={<CloudArrowUpIcon className="h-5 w-5" />}
        onClick={sendActiveRequest}
    ></FibaButton>
}

export default ActiveParamBtn