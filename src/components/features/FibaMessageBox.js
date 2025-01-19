import React from 'react'
import { useFibaMsgBox } from "./hooks/useFibaMsgBox";
import { useTranslation } from 'react-i18next'
import { Dialog, DialogActionsBar } from "@progress/kendo-react-dialogs";
import { CONFIRM_BOX } from "./store/MsgReducer";

export const FibaMessageBox = () => {
    const { onConfirm, onCancel, msgBoxState } = useFibaMsgBox();
    const { t } = useTranslation()
    const component = msgBoxState.show ? (
        <Dialog onClose={onCancel} width={400} className="fiba-messagebox-parent">
            <div className={`fiba-messagebox fiba-messagebox-${msgBoxState.type}`}>
                <div className="fiba-messagebox-title">{t(msgBoxState.title)}</div>
                <span className="fiba-messagebox-icon">
                    <i aria-hidden="true"
                        className={msgBoxState.icon}></i>
                    {msgBoxState.type === CONFIRM_BOX && <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-20 h-20 mx-auto">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
                    </svg>
                    }
                </span>
                <div className="fiba-messagebox-body">
                    {msgBoxState.text}
                </div>
                {msgBoxState.body &&
                    <div className="fiba-messagebox-body-bottom">
                        {msgBoxState.body}
                    </div>
                }
                {
                    (msgBoxState.type === CONFIRM_BOX) ?
                        <DialogActionsBar>
                            <button
                                onClick={onConfirm}
                                className="inline-flex w-full justify-center rounded-md border border-transparent bg-primary-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 sm:col-start-2 sm:text-sm"
                            >
                                {t("yes")}
                            </button>
                            <button
                                className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 sm:col-start-1 sm:mt-0 sm:text-sm"
                                onClick={onCancel}
                            >
                                {t("no")}
                            </button>
                        </DialogActionsBar> :
                        <DialogActionsBar layout="center">
                            <button
                                className="mt-5 sm:mt-6 inline-flex justify-center rounded-md border border-transparent bg-primary-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 sm:col-start-2 sm:text-sm"
                                onClick={onConfirm}
                            >
                                {t("close")}
                            </button>
                        </DialogActionsBar>
                }
            </div>
        </Dialog>
    ) : null;
    return component;
};
