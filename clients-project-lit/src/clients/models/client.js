export class Client{


    /**
     * 
     * @param {Like<Client>} param0 
     */



    constructor({id, isActive, balance, avatar, firstNames, lastNames, gender}){
        this.id = id;
        this.isActive = isActive;
        this.balance = balance;
        this.avatar = avatar;
        this.firstNames = firstNames;
        this.lastNames = lastNames;
        this.gender = gender;
    }
}

