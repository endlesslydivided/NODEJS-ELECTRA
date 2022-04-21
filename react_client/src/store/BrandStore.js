import {makeAutoObservable} from "mobx";

export default class BrandStore{
    constructor() {
        this._brands = []
        this._page = 1
        this._totalCount = 0
        this._limit = 9
        makeAutoObservable(this)
    }

    setBrands(brands) {
        this._brands = brands
    }
    setPage(page) {
        this._page = page
    }
    setTotalCount(count) {
        this._totalCount = count
    }

    get brands() {
        return this._brands
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