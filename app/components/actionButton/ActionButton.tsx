import React, { FC } from 'react';

interface ActionButtonProps {
    onClick: any;
}

const ActionButton: FC<ActionButtonProps> = ({ onClick }) => {
    return (
        <button className="pb-6 mr-6 pt-0 z-10 absolute bottom-0 right-0" onClick={onClick}>
            <svg  style={{
                height: 'var(--action-button-size, 120px)',
                width: 'var(--action-button-size, 120px)',
            }}
                viewBox="0 0 120 120"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                >
                <circle cx="60" cy="60" r="60" style={{fill: 'var(--active-color)'}}/>
                <path
                    d="M36 29.8321V90.1679C36 94.7688 41.0668 97.5643 44.9688 95.06L92.3755 64.8921C95.9864 62.6208 95.9864 57.3792 92.3755 55.0497L44.9688 24.94C41.0668 22.4357 36 25.2312 36 29.8321Z"
                    className="fill-white"
                />
            </svg>
        </button>
    );
};

export default ActionButton;
