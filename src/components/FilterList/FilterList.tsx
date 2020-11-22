import React, { useState } from 'react';
import { SectionCol } from "src/components/UI";
import { Search } from 'src/components';
import Tags from './Tags/Tags';
import { useDispatch } from 'react-redux';
import { filterItems } from "src/features/sdksSlice";
import { FilterParamType, FilterParam } from "src/types/sdk";

const FilterList = () => {
    const dispatch = useDispatch();

    const [filterVal, setFilterVal] = useState<string>('all');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilterVal(e.target.value);

        const filterParam: FilterParam = {
            type: FilterParamType.TAG,
            query: e.target.value
        }
        dispatch(filterItems(filterParam));
    };

    return (
        <SectionCol col='35%'>
            <Search
                selectedVal={filterVal}
                handleChange={handleChange}
                setFilterVal={setFilterVal}
            />
            <Tags
                selectedVal={filterVal}
                handleChange={handleChange}
            />
        </SectionCol>
    )
}

export default FilterList;