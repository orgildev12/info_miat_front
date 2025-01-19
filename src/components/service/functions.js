const error = {
    status: 'error',
    message: 'Хүсэлт илгээхэд алдаа гарлаа. Та дахин оролдоно уу.',
    info: ''
};

const getInfoRespError = (errors) => {
    let msg = error.message;
    if (errors.data) {
        if (errors.data.message) {
            msg = errors.data.message;
        } else {
            if (typeof errors.data === 'string') {
                msg = errors.data;
            } else {
                msg = JSON.stringify(errors.data);
            }
        }
    }
    return msg;
}

/**
 * Form дэлгэц дээр Validation тодорхойлох function
 * @param  {object} values
 * @param  {object} validations
 * @param  {translate function} t
 * example:
 * values = {rn: '19', roleid: 50, rolename: '', rolenameeng: '1', status: 1}
 * validation = {rolename: {required: true, maxLength: 30,title: t('dashboard.role.rolename')},rolenameeng: {}}
 * return msg = 'rolname талбар хоосон'
 */
export const formValidationFunc = (values, validations, t) => {
    const msg = {};
    for (const field in validations) {
        const fieldValids = validations[field];
        /**
         * талбар хоосон утга зөвшөөрөх эсэхийг шалгана.
         * @param  {boolean} fieldValids.required
         */
        if (fieldValids.required) {
            if (!values[field]) {
                if (fieldValids.type === "numeric")
                    msg[field] = `${fieldValids.title ? fieldValids.title : ''} ${t('validation.mustNotNull')}`
                else {
                    if (values[field] !== 0) {
                        msg[field] = `${fieldValids.title ? fieldValids.title : ''} ${t('validation.mustNotNull')}`
                    }
                }
            }
        }

        /**
         * талбарын утгын уртыг шалгана.
         * @param  {number} fieldValids.maxLength
         */
        if (fieldValids.maxLength) {
            if (values[field] && values[field].length > fieldValids.maxLength) {
                msg[field] = `${fieldValids.title ? fieldValids.title : ''} ${t('validation.notValidMaxLength')} ${values[field].length}/${fieldValids.maxLength}`
            }
        }

        /**
         * талбарын утгын бага утгыг шалгана.
         * @param  {number} fieldValids.min
         */
        if (fieldValids.min || fieldValids.min === 0) {
            if (values[field] && values[field] < fieldValids.min) {
                msg[field] = `${fieldValids.title ? fieldValids.title : ''} ${t('validation.notValidMinimum')}`
            }
        }

        /**
         * Validator
         */
        if (fieldValids.validators) {
            if (values[field]) {
                for (let index = 0; index < fieldValids.validators.length; index++) {
                    const element = fieldValids.validators[index];
                    if (!element.test(values[field])) {
                        msg[field] = `${fieldValids.title ? fieldValids.title : ''} ${t('validation.not_validator')}`;
                    }
                }
            }
        }
    }
    // for (const property in values) {
    //     if (validations[property]) {
    //         const fieldValids = validations[property];
    //         /**
    //          * талбар хоосон утга зөвшөөрөх эсэхийг шалгана.
    //          * @param  {boolean} fieldValids.required
    //          */
    //         if (fieldValids.required) {
    //             if (!values[property]) {
    //                 msg[property] = `${fieldValids.title ? fieldValids.title : ''} ${t('validation.mustNotNull')}`
    //             }
    //         }

    //         /**
    //          * талбарын утгын уртыг шалгана.
    //          * @param  {number} fieldValids.maxLength
    //          */
    //         if (fieldValids.maxLength) {
    //             if (values[property] && values[property].length > fieldValids.maxLength) {
    //                 msg[property] = `${fieldValids.title ? fieldValids.title : ''} ${t('validation.notValidMaxLength')} ${values[property].length}/${fieldValids.maxLength}`
    //             }
    //         }
    //     }
    // }
    return msg;
}

const functions = {
    getInfoRespError,
    error,
};

export default functions;

// Нууц үгийн полиси шалгах
export const checkPassPolicy = (password, policies) => {
    if (policies && policies.length > 0) {
        const tmpPolicy = {};
        for (let index = 0; index < policies.length; index++) {
            const element = policies[index];
            tmpPolicy[element.optionname] = element.optionvalue;
        }

        if (!password) {
            return 'Нууц үг оруулна уу';
        }

        if (password.length > Number(tmpPolicy['PassHighLength'])) {
            return `Нууц үгийн урт хэтэрсэн байна. ${tmpPolicy['PassHighLength']}/${password.length}`
        }

        if (password.length < Number(tmpPolicy['PassLowLength'])) {
            return `Нууц үг хамгийн багадаа ${tmpPolicy['PassLowLength']} байна.`
        }

        if (Number(tmpPolicy['MustUpperLetter']) === 1) {
            const medRegex = new RegExp(`^(?=.*[${tmpPolicy['UpperLetter']}])`)
            if (!medRegex.test(password)) {
                return `Том үсэг оруулна уу. /${tmpPolicy['UpperLetter']}/`
            }
        }

        if (Number(tmpPolicy['MustLowerLetter']) === 1) {
            const medRegex = new RegExp(`^(?=.*[${tmpPolicy['LowerLetter']}])`)
            if (!medRegex.test(password)) {
                return `Жижиг үсэг оруулна уу.`
            }
        }

        if (Number(tmpPolicy['MustPunctuation']) === 1) {
            const medRegex = new RegExp(`^(?=.*[${tmpPolicy['Punctuation']}])`)
            if (!medRegex.test(password)) {
                return `Тусгай тэмдэгт оруулна уу. /${tmpPolicy['Punctuation']}/`
            }
        }

        if (Number(tmpPolicy['MustNumber']) === 1) {
            const medRegex = new RegExp(`^(?=.*[${tmpPolicy['Numbers']}])`)
            if (!medRegex.test(password)) {
                return `Тоо оруулна уу.`
            }
        }
    }
}

export const dateFormat = (date, isTime = false) => {
    if (date) {
        const d = new Date(date);
        let dateS = d.getFullYear() + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2);
        if (isTime) {
            dateS = `${dateS} ${("0" + d.getHours()).slice(-2)}:${("0" + d.getMinutes()).slice(-2)}:${("0" + d.getSeconds()).slice(-2)}`;
        }
        return dateS;
    } else {
        return null;
    }
};

export const getDateFormatTime = (date) => {
    if (date) {
        const d = new Date(date);
        let dateS = `${("0" + d.getHours()).slice(-2)}:${("0" + d.getMinutes()).slice(-2)}:${("0" + d.getSeconds()).slice(-2)}`;

        return dateS;
    } else {
        return null;
    }
};