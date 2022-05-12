import React, {useContext,useEffect, useState} from 'react';
import axios from "axios";
import {Context} from "../index";
import { useNavigate } from 'react-router-dom';
import {ERROR_ROUTE, LOGIN_ROUTE} from '../utils/consts'

const $host = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

const $authHost = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

const authInterceptor = request => {
    request.headers.authorization = `Bearer ${localStorage.getItem('token')}`;
    return request;
}

$authHost.interceptors.request.use(authInterceptor);

const AxiosInterceptor = ({ children }) => {

    const {errorResult} = useContext(Context);
    const navigate = useNavigate();

    useEffect(() => {

        
        const resInterceptor = response => 
        {
            return response;
        }

        const errInterceptor = error => 
        {
            if(error.response !== undefined)
            {
                if (error.response.status === 401) 
                {
                    navigate(LOGIN_ROUTE);
                }
                else if(error.response.status === 404)
                {
                    navigate(ERROR_ROUTE,{state:{errorCode:404}});
                }
                else if(error.response.status === 403)
                {
                    navigate(ERROR_ROUTE,{state:{errorCode:403}});
                }
                errorResult.setMessage(error.response.data.message);
            }
            else
            {
                errorResult.setMessage("Ошибка на стороне сервера");
            }

            return Promise.reject(error);
        }

        const authResponseInterceptor = $authHost.interceptors.response.use(resInterceptor,errInterceptor);
        
        const responseInterceptor = $host.interceptors.response.use(resInterceptor,errInterceptor);

        return () => 
        {
            $authHost.interceptors.response.eject(authResponseInterceptor);
            $host.interceptors.response.eject(responseInterceptor);

        }

    },[navigate])

    return children;

}

export {
    $host,
    $authHost,
    AxiosInterceptor
    
}
