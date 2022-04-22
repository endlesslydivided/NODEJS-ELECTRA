import {makeAutoObservable} from "mobx";

export default class BasketDeviceStore{
    constructor() {
        this._basketDevices = []
        this._page = 1
        this._totalCount = 0
        this._limit = 9
        makeAutoObservable(this)
    }

    setBasketDevices(basketDevices) 
    {
        this._basketDevices = basketDevices
    }
    setPage(page) 
    {
        this._page = page
    }
    setTotalCount(count) 
    {
        this._totalCount = count
    }

    get basketDevices() {
        return this._basketDevices
    }
  
    get totalCount() {
        return this._totalCount
    }
    get page() {
        return this._page
    }
    get limit() {
        return this._limit
    }
}