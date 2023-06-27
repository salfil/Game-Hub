import axios from 'axios';

export default axios.create({
    baseURL: 'https://api.rawg.io/api',
    params: {
        key: 'e51c7f6448f6425ea710b2f1f6bb580c'

    }
})