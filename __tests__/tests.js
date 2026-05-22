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