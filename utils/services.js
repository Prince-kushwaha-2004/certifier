import axios from 'axios';
import { toast } from 'react-hot-toast';

const baseUrl = "https://10.21.96.199:8000/certifier"

export const apicall = (method, contentType, url, data, params, cb) => {
    axios({
        method: method,
        url: `${baseUrl}/${url}`,
        headers: {
            'Content-Type': contentType,
        },
        withCredentials: true,
        data: data,
        params: params
    })
        .then(function (response) {
            cb(response.data)
        })
        .catch((error) => {

            toast.error(error.response.data.status)
        })
}