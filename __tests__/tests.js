import { HashMap, Node } from "../src/index.js";

test("Set into a HashMap with unique keys", () => {
    const hm = new HashMap();
    const indices = [hm.hash("Test"), hm.hash("New"), hm.hash("Three")];
    hm.set("Test", 0);
    hm.set("New", 1);
    hm.set("Three", 2);
    expect(hm.array[indices[0]].list).toMatchObject(new Node("Test", 0, null));
    expect(hm.array[indices[1]].list).toMatchObject(new Node("New", 1, null));
    expect(hm.array[indices[2]].list).toMatchObject(new Node("Three", 2, null));

    const hm2 = new HashMap();
    const indices2 = [hm2.hash("String"), hm2.hash("Apple"), hm2.hash("Season")];
    hm2.set("String", "Hello, world!");
    hm2.set("Apple", "Banana");
    hm2.set("Season", "Spring");
    expect(hm2.array[indices2[0]].list).toMatchObject(new Node("String", "Hello, world!", null));
    expect(hm2.array[indices2[1]].list).toMatchObject(new Node("Apple", "Banana", null));
    expect(hm2.array[indices2[2]].list).toMatchObject(new Node("Season", "Spring", null));
})

test("Update value if key already exists", () => {
    const hm = new HashMap();
    const indices = [hm.hash("Test"), hm.hash("Garbage"), hm.hash("Filler")];
    hm.set("Test", "Old value");
    hm.set("Garbage", "Data");
    hm.set("Filler", "Info");
    hm.set("Test", "New value");

    expect(hm.array[indices[0]].list).toMatchObject(new Node("Test", "New value", null));
    expect(hm.array[indices[1]].list).toMatchObject(new Node("Garbage", "Data", null));
    expect(hm.array[indices[2]].list).toMatchObject(new Node("Filler", "Info", null));
})

test("Set with non string keys", () => {
    const hm = new HashMap();
    expect(() => {hm.set(0.5, 0)}).toThrow();
    expect(() => {hm.set(11223, "string")}).toThrow();
})

test("Rehashes table correctly if load factor is overgrown", () => {
    const hm = new HashMap();
    hm.set("A", 0);
    hm.set("B", 1);
    hm.set("C", 2);
    hm.set("D", 3);

    hm.set("E", 4);
    hm.set("F", 5);
    hm.set("G", 6);
    hm.set("H", 7);

    hm.set("I", 8);
    hm.set("J", 9);
    hm.set("K", 10);
    hm.set("L", 11);
    expect(hm.length()).toBe(12);
    expect(hm.capacity).toBe(16);
    hm.set("M", 12);
    expect(hm.length()).toBe(13);
    expect(hm.capacity).toBe(32);
})

test("Get with non-existant keys", () => {
    const hm = new HashMap();
    hm.set("test", "hi");
    expect(hm.get("a")).toBe(false);
    expect(hm.get("b")).toBe(false);
    expect(hm.get("1234")).toBe(false);
})

test("Correct value of get for existant keys", () => {
    const hm = new HashMap();
    hm.set("hello", "World");
    hm.set("Can you hear me", "Adele");
    hm.set("John", "Brown");
    expect(hm.get("hello")).toBe("World");
    expect(hm.get("Can you hear me")).toBe("Adele");
    expect(hm.get("John")).toBe("Brown");

    const hm2 = new HashMap();
    hm2.set("X", 4);
    hm2.set("Y", 30);
    hm2.set("y", 29);
    expect(hm2.get("X")).toBe(4);
    expect(hm2.get("Y")).toBe(30);
    expect(hm2.get("y")).toBe(29);
})

test("Get for both existant and non-existant keys", () => {
    const hm = new HashMap();
    hm.set("The quick", "brown fox");
    hm.set("jumped over", "the lazy dog");
    expect(hm.get("The quick")).toBe("brown fox");
    expect(hm.get("jumped over")).toBe("the lazy dog");
    expect(hm.get("not a key in the HashMap")).toBe(false);
    expect(hm.get("another false case")).toBe(false);
})

test("Returns false if a key is not in the HashMap", () => {
    const hm = new HashMap();
    hm.set("Hello", 0);
    hm.set("Goodbye", 0);
    hm.set("Good morning", 0);

    expect(hm.has("Key1")).toBe(false);
    expect(hm.has("Non-existance")).toBe(false);
    expect(hm.has("Performant sorting")).toBe(false);
})

test("Returns true if a key is in the HashMap", () => {
    const hm = new HashMap();
    hm.set("Hello", 0);
    hm.set("Goodbye", 0);
    hm.set("Good morning", 0);

    expect(hm.has("Hello")).toBe(true);
    expect(hm.has("Goodbye")).toBe(true);
    expect(hm.has("Good morning")).toBe(true);
})

test("Testing has() for both true and false mixed", () => {
    const hm = new HashMap();
    hm.set("Testing", "testing testing 123");
    hm.set("The Raven", "Once upon a midnight dreary");
    hm.set("Oppenheimer", "And so I have become death");

    expect(hm.has("Testing")).toBe(true);
    expect(hm.has("AFJDLKAJFLKDMAKLVMELAKVm")).toBe(false);
    expect(hm.has("The Raven")).toBe(true);
    expect(hm.has("Oppenheimer")).toBe(true);
    expect(hm.has("What")).toBe(false);
    expect(hm.has("VERY COOL KEY")).toBe(false);
})

test("Remove with invalid keys should return false", () => {
    const hm = new HashMap();
    hm.set("Populate", "So not empty");
    expect(hm.remove("WOW THIS IS A REAL KEY")).toBe(false);
    expect(hm.remove("I'M GOING TO TAKE THIS GOLD KEY TO THE KEY SHOP")).toBe(false);
    expect(hm.remove("OH NO I BROKE MY LEG")).toBe(false);
})

test("Remove with valid key should remove the key and return true", () => {
    const hm = new HashMap();
    /* All of these hash to same index;*/
    hm.set("A", "1");
    hm.set("Q", "5");
    hm.set("1", "6");
    expect(hm.array[hm.hash("A")].list).toMatchObject(new Node("A", "1", new Node("Q", "5", new Node("1", "6", null))));
    hm.remove("Q");
    expect(hm.array[hm.hash("A")].list).toMatchObject(new Node("A", "1", new Node("1", "6", null)));
})

test("Remove first element", () => {
    /* All of these elements has to the same index;*/
    const hm = new HashMap();
    hm.set("A", 0);
    hm.set("a", 1);
    hm.set("Q", 2);
    hm.set("!", 3);
    hm.set("1", 4);
    expect(hm.array[hm.hash("Q")].list).toMatchObject(new Node("A", 0, new Node("a", 1, new Node("Q", 2, new Node("!", 3, new Node("1", 4, null))))));
    hm.remove("A");
    expect(hm.array[hm.hash("Q")].list).toMatchObject(new Node("a", 1, new Node("Q", 2, new Node("!", 3, new Node("1", 4, null)))));
})


test("Remove last element", () => {
    /* All of these elements has to the same index;*/
    const hm = new HashMap();
    hm.set("A", 0);
    hm.set("a", 1);
    hm.set("Q", 2);
    hm.set("!", 3);
    hm.set("1", 4);
    expect(hm.array[hm.hash("Q")].list).toMatchObject(new Node("A", 0, new Node("a", 1, new Node("Q", 2, new Node("!", 3, new Node("1", 4, null))))));
    hm.remove("1");
    expect(hm.array[hm.hash("Q")].list).toMatchObject(new Node("A", 0, new Node("a", 1, new Node("Q", 2, new Node("!", 3, null)))));
})


test("Remove middle element", () => {
    /* All of these elements has to the same index;*/
    const hm = new HashMap();
    hm.set("A", 0);
    hm.set("a", 1);
    hm.set("Q", 2);
    hm.set("!", 3);
    hm.set("1", 4);
    expect(hm.array[hm.hash("A")].list).toMatchObject(new Node("A", 0, new Node("a", 1, new Node("Q", 2, new Node("!", 3, new Node("1", 4, null))))));
    hm.remove("Q");
    expect(hm.array[hm.hash("A")].list).toMatchObject(new Node("A", 0, new Node("a", 1, new Node("!", 3, new Node("1", 4, null)))));
})


test("Length 0", () => {
    const hm = new HashMap();
    expect(hm.length()).toBe(0);
})

test("Length > 0", () => {
    const hm = new HashMap();
    hm.set("Test", 1);
    hm.set("Best", 2);
    hm.set("Crest", 3);
    expect(hm.length()).toBe(3);

    const hm2 = new HashMap();
    hm2.set("A", 1);
    hm2.set("B", 50);
    hm2.set("C", 100);
    hm2.set("D", 62);
    hm2.set("E", 12);
    expect(hm2.length()).toBe(5);
    hm2.remove("A");
    expect(hm2.length()).toBe(4);
    hm2.remove("B");
    hm2.remove("D")
    expect(hm2.length()).toBe(2);
    hm2.remove("C");
    hm2.remove("E");
    expect(hm2.length()).toBe(0);
})

test("Clear all entries in HashMap", () => {
    const hm = new HashMap();
    hm.set("A", 0);
    hm.set("B", 1);
    hm.set("C", 2);
    hm.set("D", 3);
    hm.set("E", 4);
    hm.set("F", 5);
    hm.set("G", 6);
    hm.set("H", 7);
    hm.set("I", 8);
    hm.set("J", 9);
    hm.set("K", 10);
    expect(hm.length()).toBe(11);
    hm.clear()
    expect(hm.length()).toBe(0);
})

test("Return keys in an array", () => {
    const hm = new HashMap();
    hm.set("Key", 0);
    hm.set("fits", 2);
    hm.set("in", 0);
    hm.set("a", 0);
    hm.set("lock.", 12);
    expect(hm.keys().sort()).toMatchObject(["Key", "fits", "in", "a", "lock."].sort());

    const hm2 = new HashMap();
    hm2.set("A", 0);
    hm2.set("B", 1);
    hm2.set("C", 2);
    hm2.set("D", 3);
    hm2.set("E", 4);
    hm2.set("F", 5);
    hm2.set("G", 6);
    hm2.set("H", 7);
    hm2.set("I", 8);
    hm2.set("J", 9);
    hm2.set("K", 10);
    expect(hm2.keys().sort()).toMatchObject(["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K"].sort());
})

test("Return values in an array", () => {
    const hm = new HashMap();
    hm.set("Key", 0);
    hm.set("fits", 2);
    hm.set("in", 0);
    hm.set("a", 0);
    hm.set("lock.", 12);
    expect(hm.values().sort()).toMatchObject([0, 2, 12].sort());

    const hm2 = new HashMap();
    hm2.set("A", 0);
    hm2.set("B", 1);
    hm2.set("C", 2);
    hm2.set("D", 3);
    hm2.set("E", 4);
    hm2.set("F", 5);
    hm2.set("G", 6);
    hm2.set("H", 7);
    hm2.set("I", 8);
    hm2.set("J", 9);
    hm2.set("K", 10);
    expect(hm2.values().sort()).toMatchObject([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].sort());

    const hm3 = new HashMap();
    hm3.set("Tom", "Jerry");
    hm3.set("Ronald", "McDonald");
    hm3.set("Tom", "Cruise");
    hm3.set("Test", "Best");
    expect(hm3.values().sort()).toMatchObject(["McDonald", "Best", "Cruise"].sort());
})

test("Return all entries in array", () => {
    const hm = new HashMap();
    hm.set("Mine", "Craft");
    hm.set("Hollow", "Knight");
    hm.set("Silk", "Song");
    expect(hm.entries().sort()).toMatchObject([["Mine", "Craft"], ["Hollow", "Knight"], ["Silk", "Song"]].sort());

    const hm2 = new HashMap();
    hm2.set("A", 0);
    hm2.set("B", 1);
    hm2.set("C", 2);
    hm2.set("D", 3);
    expect(hm2.entries().sort()).toMatchObject([["A", 0], ["B", 1], ["C", 2], ["D", 3]].sort());

    const hm3 = new HashMap();
    hm3.set("Birds of a feather", "we should stick");
    hm3.set("I used to rule", "the world.");
    hm3.set("Another love another love", "all my tears would be used up");
    expect(hm3.entries().sort()).toMatchObject([["Birds of a feather", "we should stick"], ["I used to rule", "the world."], ["Another love another love", "all my tears would be used up"]].sort());
})