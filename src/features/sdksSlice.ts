import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from "src/app/store";
import { getSdksApi } from "src/api/sdksApi";
import { SdkItem, FilterParam, FilterParamType } from "src/types/sdk";

type SdkState = {
    items: SdkItem[],
    filteredResults: SdkItem[],
    tags: string[],
    error: string;
}
const initialState: SdkState = {
    items: [],
    filteredResults: [],
    tags: [],
    error: ''
};


const sdkReducer = createSlice({
    name: 'sdkReducer',
    initialState,
    reducers: {
        fetchDataSuccess: (state, { payload }: PayloadAction<SdkItem[]>) => {
            state.items = getUniqueSdk(payload).filter(({ title }) => title).sort((a, b) => a.title?.localeCompare(b.title));
            state.filteredResults = state.items;

            state.tags = ['all', ...getUniqueTags(payload)];
        },
        fetchDataError: (state, { payload }: PayloadAction<string>) => {
            state.error = payload;
        },

        filterItems: (state, { payload }: PayloadAction<FilterParam>) => {
            const { type, query } = payload;

            if (type === FilterParamType.SEARCH) {
                state.filteredResults = query.length > 0 ?
                    state.items
                        .filter(({ title }) => title.toLowerCase().includes(query.toLowerCase()))
                        .map((item) => {
                            const newTitle = item.title.replace(
                                new RegExp(query, 'gi'),
                                match => `<mark style="background: #00d5b466">${match}</mark>`
                            )
                            return {
                                ...item,
                                title: newTitle
                            }
                        })
                    : state.items;
            } else {
                state.filteredResults = query.toLowerCase() === 'all' ?
                    state.items :
                    state.items.filter(({ tags }) => tags?.includes(query.toLowerCase()));
            }
        },
    }
})

const getUniqueSdk = (items: SdkItem[]): SdkItem[] => {
    const result = [];
    const map = new Map();
    for (const item of items) {
        if (!map.has(item.id)) {
            map.set(item.id, true);
            result.push({
                id: item.id,
                title: item.title,
                tags: item.tags
            });
        }
    }
    return result;
}

const getUniqueTags = (items: SdkItem[]): string[] => {
    const result = [...new Set(items.flatMap(({ tags }) => tags))].filter(Boolean).sort();
    return result;
}

export const {
    fetchDataSuccess,
    fetchDataError,

    filterItems
} = sdkReducer.actions

export default sdkReducer.reducer;

export const fetchDataSdk = (): AppThunk => async dispatch => {
    try {
        const response: SdkItem[] = await getSdksApi();
        dispatch(fetchDataSuccess(response))
    } catch (err) {
        dispatch(fetchDataError(err.toString()))
    }
}

