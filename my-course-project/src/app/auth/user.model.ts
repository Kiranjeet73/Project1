export class User{
   
    constructor(
        public email:string,
        public id: string,
        private _token: string,
        private _tokenExpirationDate: Date
    ){}
    
    get token(){      
        if(!this._tokenExpirationDate || new Date() > this._tokenExpirationDate){
            return null;
        }                                              //this getter looks like a function but it is a speacial property
return this._token
    }



   // user.token    and we can access it like this
}