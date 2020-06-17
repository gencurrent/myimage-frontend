import axios from 'axios';
// import Cookies from 'universal-cookie';


export const initSystem = async () => {
    axios.get('http://127.0.0.1:3000/api/system',)
        .then(response => {
            // const cookies = new Cookies();
            // console.log(response)
            // cookies.set('X-Client-UUID', response.data.client_uuid, {path: '/'});
            // console.log(response.data)
            // console.log(cookies.get('X-Client-UUID'));
            // console.log(`Initialized system cookies`)
        })
}