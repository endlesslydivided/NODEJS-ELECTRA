
export class ValidationMessage
{
    constructor(status = false,field = "",message ="") 
    {
        this._status= status
        this._field = field
        this._message = message
    }

    setField(field)
    {
        this._field = field
    }

    setMessage(message)
    {
        this._message = message
    }
    
    get field()
    {
        return this._field
    }

    get message()
    {
        return this._message
    }

    get status()
    {
        return this._status
    }
}

export const validateAuth = (email,password) =>
{
    if(!email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      ) )
    {
        return new ValidationMessage(true,"email","Неверный EMail");
    }
    if(email.length === 0)
    {
        return new ValidationMessage(true,"email","Email - заполните поле");
    }   
    if(password.length < 8 && password.length > 25)
    {
        return new ValidationMessage(true,"password","Длина пароля: от 8 до 25 символов");
    }
    if(password.length === 0)
    {
        return new ValidationMessage(true,"password","Пароль - заполните поле");
    }
    return new ValidationMessage();
}


export const validateDevice = (selectedType, selectedBrand,deviceName,price,file = "",infos) =>
{
    if(selectedType === undefined)
    {
        return new ValidationMessage(true,"selectedType","Выберите тип товара");
    }
    if(selectedBrand=== undefined)
    {
        return new ValidationMessage(true,"selectedBrand","Выберите бренд товара");
    }
    if(deviceName.length === 0)
    {
        return new ValidationMessage(true,"deviceName","Введите название товара");
    }
    if(price === 0)
    {
        return new ValidationMessage(true,"price","Введите цену товара");
    }
    if(file === null)
    {
        return new ValidationMessage(true,"file","Добавьте фотографию товара");
    }
    for(let i = 0; i < infos.length; i++)
    {
        if(infos[i].title === "" || infos[i].description === "")
        {
            return new ValidationMessage(true,"info","Добавьте описание характеристики");
        }
    }
    

    return new ValidationMessage();
}