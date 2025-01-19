import * as React from "react";
/**
 * Нээгдэж хаагддаг FibaPanel нь бүх төрлын child component-үүдийг дэмжиж ажиллана.
 * `title` attirbute дээр panel толгой хэсэгт нэр өгч болно.
 */
export const FibaPanel = ({ string, title, disabled, background, collapsed, className, ...props }) => {
    const [cllpsd, setcollapsed] = React.useState(collapsed);
    const handleClick = () => {
        if (!disabled) {
            setcollapsed(!cllpsd);
        }
    }
    return (
        <div className={className}>
            <div className="fiba-panel-header" onClick={handleClick} style={{ marginBottom: cllpsd ? '16px' : '0' }}>
                <div className="flex title-container">
                    <i className={cllpsd ? 'icon fiba-i-up' : 'icon fiba-i-down'}></i>
                    <div className={`${string ? 'title strong' : 'title'}`}>
                        <p style={{ overflow: title !== '' ? 'hidden' : 'visible' }} className={'select-none'}>
                            {title}
                        </p>
                    </div >
                </div >
            </div >
            <div className={`${disabled ? 'fiba-panel-body fiba-panel-disabled' : 'fiba-panel-body'} ${background ? 'fiba-panel-detail' : ''}`} hidden={cllpsd} >
                {props.children}
            </div >
        </div >
    );
};
