import { $authHost, $host } from "./index";
import jwt_decode from "jwt-decode";

/* #region  TypeMethods */
export const fetchAllTypes = async () => {
    const { data } = await $host.get('api/type/all')
    return data;
}

export const fetchTypes = async (page, limit = 9) => {
    const { data } = await $host.get('api/type', {
        params: {
            page, limit
        }
    })
    return data;
}

export const createType = async (type) => {
    const { data } = await $authHost.post('api/type', type)
    return data
}

export const deleteType= async (id) => {
    const { data } = await $authHost.delete('api/type/' + id)
    return data
}

export const fetchOneType = async (id) => {
    const { data } = await $host.get('api/type/' + id)
    return data
}
/* #endregion */

/* #region  BrandMethods */
export const createBrand = async (brand) => {
    const { data } = await $authHost.post('api/brand', brand)
    return data
}


export const fetchBrands = async (page, limit = 9) => {
    const { data } = await $host.get('api/brand', {
        params: {
            page, limit
        }
    })
    return data;
}

export const fetchAllBrands = async () => {
    const { data } = await $host.get('api/brand/all')
    return data;
}

export const deleteBrand = async (id) => {
    const { data } = await $authHost.delete('api/brand/' + id)
    return data
}

export const fetchOneBrand = async (id) => {
    const { data } = await $host.get('api/brand/' + id)
    return data
}
/* #endregion */

/* #region  DeviceMethods */

export const createDevice = async (device) => {
    const { data } = await $authHost.post('api/device', device)
    return data
}

export const fetchDevices = async (typeId, brandId, page, limit = 9) => {
    const { data } = await $host.get('api/device', {
        params: {
            typeId, brandId, page, limit
        }
    })
    return data
}

export const updateOneDevice = async (device,id) => {
    const { data } = await $authHost.post('api/device/' + id,device)
    return data
}

export const fetchOneDevice = async (id) => {
    const { data } = await $host.get('api/device/' + id)
    return data
}

export const deleteDevice = async (id) => {
    const { data } = await $authHost.delete('api/device/' + id)
    return data
}
/* #endregion */

/* #region  RatingMethods */

export const createRating = async (device) => {
    const { data } = await $authHost.post('api/rating', device)
    return data
}

export const fetchRatings = async (page, limit = 9) => {
    const { data } = await $host.get('api/rating', {
        params: {
            page, limit
        }
    })
    return data
}

export const updateOneRating = async (rating,id) => {
    const { data } = await $authHost.post('api/rating/' + id,rating)
    return data
}

export const fetchOneRating = async (id) => {
    const { data } = await $host.get('api/rating/' + id)
    return data
}

export const deleteRating = async (id) => {
    const { data } = await $authHost.delete('api/rating/' + id)
    return data
}
/* #endregion */

/* #region  BasketDeviceMethods */

export const createBasketDevice = async (basketdevice) => {
    const { data } = await $authHost.post('api/basketdevice', basketdevice)
    return data
}

export const fetchBasketDevices = async (page, limit = 9) => {
    const { data } = await $host.get('api/basketdevice', {
        params: {
            page, limit
        }
    })
    return data
}

export const updateOneBasketDevice = async (basketdevice,id) => {
    const { data } = await $authHost.post('api/basketdevice/' + id,basketdevice)
    return data
}

export const fetchOneBasketDevice = async (id) => {
    const { data } = await $host.get('api/basketdevice/' + id)
    return data
}

export const deleteBasketDevice = async (id) => {
    const { data } = await $authHost.delete('api/basketdevice/' + id)
    return data
}
/* #endregion */