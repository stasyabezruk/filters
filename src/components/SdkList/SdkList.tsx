import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'src/app/store';
import { SectionCol } from "src/components/UI";
import { SdkItem } from 'src/types/sdk';
import "./SdkList.scoped.scss";

const SdkList = () => {

    const items: SdkItem[] = useSelector((state: RootState) => state.sdk.filteredResults);

    return (
        <SectionCol col='65%'>
            <div style={{
                width: '100%',
                fontWeight: 'bold',
                padding: '10px',
                fontSize: '18px'
            }}>Amount: {items.length}</div>

            {items.map((item: SdkItem) => {
                return (
                    <div key={item.id} className="sdk-item">

                        <div className="sdk-title" dangerouslySetInnerHTML={{ __html: item.title }} />

                        {(item.tags && item.tags.length > 0) && (
                            <div className="sdk-tags">{item.tags.join(", ")}</div>
                        )}
                    </div>
                )
            })}

        </SectionCol>

    )
}
export default SdkList;