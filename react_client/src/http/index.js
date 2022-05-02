import React, {useContext,useEffect, useState} from 'react';
import axios from "axios";
import {Context} from "../index";
import { useNavigate } from 'react-router-dom';
import {ERROR_ROUTE} from '../utils/consts'

const $host = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

const $authHost = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})


const AxiosInterceptor = ({ children }) => {

    const {errorResult} = useContext(Context);
    const {navigate} = useNavigate();

    useEffect(() => {

        const authInterceptor = request => {
            request.headers.authorization = `Bearer ${localStorage.getItem('token')}`;
            return request;
        }

        const resInterceptor = response => 
        {
            return response;
        }

        const errInterceptor = error => 
        {
            if (error.response.status === 401) {
                navigate(ERROR_ROUTE,
                    {
                        errorCode: error.response.status,
                        errorMessage: "Неавторизованный доступ к ресурсу. Зарегистрируйтесь или войдите в свой аккаунт."
                    });
            }
            else if(error.response.status === 404)
            {
                navigate(ERROR_ROUTE,
                    {
                        errorCode: error.response.status,
                        errorMessage: "Ресурс не существует либо он был удалён..."
                    });
            }
            else if(error.response.status === 403)
            {
                navigate(ERROR_ROUTE,
                    {
                        errorCode: error.response.status,
                        errorMessage: "У вас недостаточно прав для доступа к данному ресурсу!"
                    });
            }

            errorResult.setMessage(error.response.data.message.message);
            return Promise.reject(error);
        }

        const authRequestInterceptor = $authHost.interceptors.request.use(authInterceptor);
        const authResponseInterceptor = $authHost.interceptors.response.use(resInterceptor,errInterceptor);
        
        const ResponseInterceptor = $host.interceptors.response.use(resInterceptor,errInterceptor);

        return () => 
        {
            

        }

    }, [navigate])
    return children;
}

export {
    $host,
    $authHost,
    AxiosInterceptor
    
}
