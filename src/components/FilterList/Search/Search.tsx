import React, { useState, ChangeEvent, useRef, useEffect } from 'react';
import SearchIcon from "./SearchIcon";
import "./Search.scoped.scss";
import { useDispatch } from 'react-redux';
import { filterItems } from "src/features/sdksSlice";
import { RadioBtn } from "src/components/UI";
import { FilterParamType, FilterParam } from "src/types/sdk";

type Props = {
    selectedVal: string;
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
    setFilterVal: (filter: string) => void
}

const Search: React.FC<Props> = ({
    selectedVal,
    handleChange,
    setFilterVal
}) => {

    const dispatch = useDispatch();
    const ref = useRef<HTMLInputElement>(null);

    const [searchTerm, setSearchTerm] = useState<string>("");

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);

        const filterParam: FilterParam = {
            type: FilterParamType.SEARCH,
            query: e.target.value
        }
        dispatch(filterItems(filterParam));
    };

    const onFocusSearch = () => {
        setFilterVal('search')
    }

    useEffect(() => {
        if (selectedVal === 'search') {
            ref.current?.focus();

            const filterParam: FilterParam = {
                type: FilterParamType.SEARCH,
                query: searchTerm
            }
            dispatch(filterItems(filterParam));
        } else {
            setSearchTerm('');
        }
    }, [selectedVal])

    return (
        <RadioBtn id="search" name="search" selectedVal={selectedVal} onChange={handleChange}
        >
            <div className="search-wrapper">
                <div className="svg">
                    <SearchIcon />
                </div>
                <input
                    ref={ref}
                    type="text"
                    name="search"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => { handleSearch(e) }}
                    onFocus={() => { onFocusSearch() }}
                />
            </div>
        </RadioBtn>
    )
}

export default Search;