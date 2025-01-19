export const SHOW_CONFIRM = "SHOW_CONFIRM";
export const HIDE_CONFIRM = "HIDE_CONFIRM";

export const CONFIRM_BOX = "confirm";
export const INFO_BOX = "info";
export const SUCCESS_BOX = "success";
export const WARNING_BOX = "warning";
export const ERROR_BOX = "error";
export const OTHER_BOX = "OTHER_BOX";

export const initialState = {
    show: false,
    text: "",
    type: "",
    icon: "fiba-i-warning",
    color: "green"
};

export const msgReducer = (state = initialState, action) => {
    switch (action.type) {
        case SHOW_CONFIRM:
            return {
                show: true,
                text: action.payload.text,
                type: action.payload.type,
                icon: action.payload.icon,
                color: action.payload.color,
                body: action.payload.body,
            };
        case HIDE_CONFIRM:
            return initialState;
        default:
            return initialState;
    }
};
