import React, { useEffect } from 'react';
import './SdkListModal.scoped.scss';
import { FilterList, SdkList } from "src/components";
import { useDispatch } from 'react-redux';
import { fetchDataSdk } from 'src/features/sdksSlice';

const SdkListModal = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchDataSdk());
    }, []);

    return (
        <div className="container">
            <div className="section">
                <div className="section-header">SDKs</div>
                <div className="section-content">
                    <FilterList />
                    <SdkList />
                </div>
            </div>
        </div>

    )
}

export default SdkListModal;