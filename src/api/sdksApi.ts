import axios from './axios';

export async function getSdksApi() {
    const url = `/json/sdks.json`;
    const { data } = await axios.get(url)
    return data;
}