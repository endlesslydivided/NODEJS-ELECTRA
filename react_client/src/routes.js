import Admin from './pages/AdminPanel'
import Basket from './pages/Basket'
import DevicePage from './pages/DevicePage'
import Auth from './pages/Auth'
import Shop from './pages/Shop'
import UserChat from './pages/UserChat'


import {ADMIN_ROUTE,BASKET_ROUTE, DEVICE_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE,INTO_CHAT_ROUTE} from './utils/consts'

export const auhtRoutes = 
[
    {
        path : ADMIN_ROUTE,
        Component: Admin
    },
    {
        path : BASKET_ROUTE,
        Component: Basket
    }
]


export const publicRoutes = 
[
    {
        path : SHOP_ROUTE,
        Component: Shop
    },

    {
        path : LOGIN_ROUTE,
        Component: Auth
    },

    {
        path : REGISTRATION_ROUTE,
        Component: Auth
    },

    {
        path : DEVICE_ROUTE + '/:id',
        Component: DevicePage
    },
    {
        path : INTO_CHAT_ROUTE,
        Component: UserChat
    },
    {
        path : INTO_CHAT_ROUTE + '/:id',
        Component: UserChat
    },

]