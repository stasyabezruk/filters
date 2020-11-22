export interface SdkItem {
    title: string;
    id: string;
    tags: string[]
}

export enum FilterParamType {
    SEARCH = 'search',
    TAG = 'tag'
}

export interface FilterParam {
    type: FilterParamType;
    query: string;
}