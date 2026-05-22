import { HashMap, Node } from "../src/index.js";

test("Blank HashMap", () =>{
    const hm = new HashMap();
    expect(hm).toMatchObject({array: [], loadFactor: 0.75, capacity: 16});
})

test("Set with a new key", () => {
    const hm = new HashMap();
    hm.set("Hello", 1);
    expect(hm).toMatchObject({array: [new Node("Hello", 1, null)]});
})