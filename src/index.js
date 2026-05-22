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
        if (key.length < 0) return "Invalid key length";
        let hashCode = 0;
        const primeNumber = 31;

        for (let i = 0; i < key.length; i++) {
            hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
        }

        return hashCode;
    }

    set(key, value){
        if(typeof key != 'string') {
            throw TypeError("Key must be a string.")
        };

        let index = this.hash(key);
        let ll = this.array[index];
        if(!ll.contains(key)){
            ll.append(key, value);
        }else{
            let copy = this.array[index].list;
            while(copy != null){
                if(copy.key == key){
                    copy.value = value;
                    break;
                }
                copy = copy.nextNode
            }
            this.array[index].list = copy;
        }

    }

    get(key){
        if(typeof key != 'string') {
            throw TypeError("Key must be a string.")
        };

        let index = this.hash(key);
        if(index < 0 || index >= this.capacity){
            return false;
        }else{
            for(let i = 0; i < this.capacity; i++){
                let ll = this.array[i].list;
                while(ll != null){
                    if(ll.key === key){
                        return ll.value;
                    }
                    ll = ll.nextNode;
                }
            }

            return false;
        }
    }

    has(key){
        if(typeof key != 'string') {
            throw TypeError("Key must be a string.")
        };

        for(let i = 0; i < this.capacity; i++){
            let ll = this.array[i];
            if(ll.contains(key) != false){
                return true;
            }
        }

        return false;
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

            copy.nextNode = new Node(key, value, null);
        }
    }

    contains(key){
        let copy = this.list;
        while(copy != null){
            if(copy.key === key){
                return new Node(copy.key, copy.value, null); 
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
hm.set("X", 4);
hm.set("Y", 30);
hm.set("y", 29);
console.log(hm);