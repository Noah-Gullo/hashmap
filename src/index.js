export class HashMap{
    constructor(){
        this.array = [];
        this.loadFactor = 0.75;
        this.capacity = 16;
        for(let i = 0; i < this.capacity; i++){
            this.array[i] = new LinkedList();
        }
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
        if(!key instanceof String) throw TypeError("Key must be a string.");

        let index = this.hash(key);
        let ll = this.array[index];
        if(!ll.contains(key)){
            ll.append(key, value);
        }else{
            console.log(key + "already exists with value: " + ll.contains(key));
        }

    }

    get(key){
        let index = this.hash(key);
        const ll = this.array[index].list;
        if(index < 0 || index >= this.capacity){
            return false;
        }else{
            return ll.contains(key);
        }
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

class LinkedList{
    constructor(){
        this.list = null;
    }

    append(key, value){
        if(this.list === null){
            this.list = new Node(key, value, null);
            return;
        }else{
            let copy = this.list;
            while(copy.nextNode != null){
                copy = copy.nextNode;
            }

            copy.nextNode = new Node(value, null);
        }
    }

    contains(key){
        let copy = this.list;
        while(copy != null){
            if(copy.key === key){
                return copy.value; 
            }
            copy = copy.nextNode;
        }

        return false;
    }
}

export class Node{
    key = null
    value = null;
    nextNode = null;

    constructor(key, value, nextNode){
        this.key = key;
        this.value = value;
        this.nextNode = nextNode;
    }
}

const hm = new HashMap();
hm.set("test", 1);
hm.set("test", 2);
console.log(hm);