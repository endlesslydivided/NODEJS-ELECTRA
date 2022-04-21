import {makeAutoObservable} from "mobx";

export default class TypeStore{
    constructor() {
        this._types = []
        this._page = 1
        this._totalCount = 0
        this._limit = 9
        makeAutoObservable(this)
    }

    setTypes(types) {
        this._types = types
    }
    setPage(page) {
        this._page = page
    }
    setTotalCount(count) {
        this._totalCount = count
    }

    get types() {
        return this._types
    }
  
    get totalCount() 
    {
        return this._totalCount
    }

    get page() {
        return this._page
    }
    get limit() {
        return this._limit
    }
}