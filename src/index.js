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

    remove(key){
        if(!this.has(key)){
            return false;
        }else{
            let index = this.hash(key);
            let ll = this.array[index].list;
            let newLL = new LinkedList();

            while(ll.nextNode != null){
                if(ll.key === key){
                    if(newLL.list == null){
                        this.array[index].list = ll.nextNode;
                    }else{
                        ll = ll.nextNode;
                        while(ll != null){
                            newLL.append(ll.key, ll.value);
                            ll = ll.nextNode;
                        }
                        this.array[index].list = newLL.list;
                    }
                    
                    return true;
                }

                newLL.append(ll.key, ll.value);
                ll = ll.nextNode;
            }

            this.array[index].list = newLL.list;
            return true;
        }
    }

    length(){
        let len = 0;

        for(let i = 0; i < this.capacity; i++){
            let ll = this.array[i].list;
            while(ll != null){
                len++;
                ll = ll.nextNode;
            }
        }

        return len;
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
hm.set("A", 0);
hm.set("a", 1);
hm.set("Q", 2);
hm.set("!", 3);
hm.set("1", 4);
console.log(hm.length())
hm.remove("!");
console.log(hm.length());
hm.remove("Q");
console.log(hm.length());