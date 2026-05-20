import "./styles.css";

class HashMap{
    constructor(){
        this.loadFactor = 0.75;
        this.capacity = 16;
    }
    
    hash(key){
        let hashCode = 0;
        const primeNumber = 31;

        for (let i = 0; i < key.length; i++) {
            hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
        }

        return hashCode;
    }

    set(key, value){

    }

    get(key){

    }

    remove(key){

    }

    length(){

    }

    clear(){

    }

    keys(){

    }

    values(){

    }

    entries(){

    }
}