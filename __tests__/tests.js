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