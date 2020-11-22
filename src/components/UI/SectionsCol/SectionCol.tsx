import React from 'react';

type Props = {
    children: React.ReactNode;
    col: string;
}

const SectionCol: React.FC<Props> = ({
    children,
    col
}) => {
    return (
        <div
            className="section-content-col"
            style={{
                display: 'flex',
                overflowY: 'auto',
                overflowX: 'hidden',
                width: col,
                padding: '15px',                
                flexWrap: 'wrap',
                flexDirection: 'row',
                alignContent: 'baseline'
            }}
        >
            {children}
        </div>
    )
}

export default SectionCol;
