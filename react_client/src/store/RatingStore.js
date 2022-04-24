import {makeAutoObservable} from "mobx";

export default class RatingStore{
    constructor() {
        this._deviceId = 0
        this._userId = 0
        this._rate = 0     
        this._ratings = []   
        this._page = 1
        this._totalCount = 0
        this._limit = 9
        makeAutoObservable(this)
    }

    setDeviceId(deviceId) {
        this._deviceId = deviceId
    }

    setRatings(ratings) {
        this._ratings = ratings
    }
    
    setUserId(userId) {
        this._userId = userId
    }
    
    setRate(rate) {
        this._rate = rate
    }
    setPage(page) {
        this._page = page
    }
    setTotalCount(count) {
        this._totalCount = count
    }

    get deviceId() {
        return this._deviceId
    }

    get ratings() {
        return this._ratings
    }
    get userId() {
        return this._userId
    }
    get rate() {
        return this._rate
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