import axios from "axios/index";

export function getCountries() {

    const config = {
        method: 'get',
        url: 'https://restcountries.com/v3.1/region/europe',
        headers: {}
    };

    const countries = async function (): Promise<ApiResponseResult> {
        return await axios(config);
    };

    return {
        countries,
    };
}

export interface ApiResponseResult {
    data: object;
}
