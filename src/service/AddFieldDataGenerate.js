import { FibaCheckbox, FibaDatePicker, FibaInput, FibaInputNumber } from "../components";

export function addFieldDataGenerate (array1, array2) {
    const detail = {};
    for (let ind = 0; ind < array1.length; ind++) {
        const element = array1[ind];
        if (array2.length === 0 && element.defaultvalue) {
            if (element.tagtype !== 3) {detail[`${element.id}`] = element.defaultvalue};
        }
        for (let index = 0; index < array2.length; index++) {
            const elmnt = array2[index];
            if (element.id === elmnt.keyfield) {
                detail[element.id] = elmnt.itemvalue;
                break;
            }
        }
        switch (element.tagtype) {
            case 2:
                element.component = FibaInput
                break;
            case 1:
                element.component = FibaInputNumber
                break;
            case 4:
                element.component = FibaInputNumber
                break;
            case 3:
                element.component = FibaDatePicker
                break;
            case 5:
                element.component = FibaCheckbox
                break;
            default:
                element.component = FibaInput
                break;
        }
    }

    return { data: array2, dicdata: array1, detail };
}