import React, { ChangeEvent } from 'react';
import './RadioBtn.scoped.scss';

type Props = {
    id: string;
    name: string;
    selectedVal: string;
    children: React.ReactNode;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const RadioBtn: React.FC<Props> = ({
    id,
    name,
    selectedVal,
    children,
    onChange
}) => {
    return (
        <div
            className='checkbox-item'
            key={id}
        >
            <input
                type="radio"
                name={name}
                className="styled-checkbox"
                id={id}
                value={id}
                checked={id === selectedVal}
                onChange={onChange}
            />
            <label htmlFor={id}>
                {children}
            </label>
        </div>
    )
}

export default RadioBtn;