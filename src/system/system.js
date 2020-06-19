import axios from 'axios';
// import Cookies from 'universal-cookie';



export const setAxiosDefaults = () => {
    axios.defaults.baseURL = 'http://192.168.1.63:3000';
    axios.get(`/api/system`,)
        .then(response => {
            // const cookies = new Cookies();
            // console.log(response)
            // cookies.set('X-Client-UUID', response.data.client_uuid, {path: '/'});
            // console.log(response.data)
            // console.log(cookies.get('X-Client-UUID'));
            // console.log(`Initialized system cookies`)
        })
}


export const initSystem = () => {
    
}