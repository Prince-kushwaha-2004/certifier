import axios from 'axios';
import { toast } from 'react-hot-toast';
import * as constants from '../src/constants';
import { loadingStart, loadingStop } from '../src/features/loadingSlice';
import store from '../src/store';

const instance = axios.create({
    baseURL: constants.BASEURL
});

export const apicall = (method, url, data, params, cb) => {
    instance({
        method: method,
        url: url,
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
instance.interceptors.request.use(function (config) {
    store.dispatch(loadingStart())
    return config;
}, function (error) {
    return Promise.reject(error);
});
instance.interceptors.response.use(function (response) {
    store.dispatch(loadingStop())
    return response;
}, function (error) {
    store.dispatch(loadingStop())
    return Promise.reject(error);
});