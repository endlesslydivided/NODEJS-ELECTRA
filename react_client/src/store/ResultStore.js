import {makeAutoObservable} from "mobx";

export default class ResultStore
{
    
    constructor() 
    {
        this._message = ''
        makeAutoObservable(this)
    }

    setMessage(message) 
    {
        this._message = message
    }
   
    get message() 
    {
        return this._message
    }
      
}