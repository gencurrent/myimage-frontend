import axios from 'axios';

export const setAxiosDefaults = () => {
    axios.defaults.baseURL = ``;
    axios.get(`/api/system`,)
}

export const initSystem = () => {
    // if (process.env === 'production') {
    //     const noop = () => {};
    //     console.log = noop;
    //     console.warn = noop;
    // }    
}