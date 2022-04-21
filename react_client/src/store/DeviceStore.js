import {makeAutoObservable} from "mobx";

export default class DeviceStore{
    constructor() {
        this._updateName = ""
        this._updatePrice = 0
        this._updateId = 0
        this._updateInfo = []

        this._types = []
        this._brands = []

        this._devices = []

        this._selectedType = {}
        this._selectedBrand = {}

        this._page = 1
        this._totalCount = 0
        this._limit = 9
        makeAutoObservable(this)
    }

    setUpdateName(updateName) 
    {
        this._updateName = updateName
    }

    setUpdateId(updateId) 
    {
        this._updateId = updateId
    }

    setUpdatePrice(updatePrice) 
    {
        this._updatePrice = updatePrice
    }
    setUpdateInfo(updateInfo) 
    {
        this._updateInfo = updateInfo
    }

    setTypes(types) {
        this._types = types
    }
    setBrands(brands) {
        this._brands = brands
    }
    setDevices(devices) {
        this._devices = devices
    }

    setSelectedType(type) {
        this.setPage(1)
        this._selectedType = type
    }
    setSelectedBrand(brand) {
        this.setPage(1)
        this._selectedBrand = brand
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
    get brands() {
        return this._brands
    }
    get devices() {
        return this._devices
    }
    get selectedType() {
        return this._selectedType
    }
    get selectedBrand() {
        return this._selectedBrand
    }
    get totalCount() {
        return this._totalCount
    }
    get page() {
        return this._page
    }

    get updateId() {
        return this._updateId
    }
    get limit() {
        return this._limit
    }

    get updateName() 
    {
        return this._updateName
    }


    get updatePrice() 
    {
        return this._updatePrice
    }

    get updateInfo() 
    {
        return this._updateInfo
    }

   
}