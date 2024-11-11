let cash = 5;
let price = 3.26;
let cid = [
    ['PENNY', 1.01],
    ['NICKEL', 2.05],
    ['DIME', 3.1],
    ['QUARTER', 4.25],
    ['ONE', 90],
    ['FIVE', 55],
    ['TEN', 20],
    ['TWENTY', 60],
    ['ONE HUNDRED', 100]
];
const denominations = [
    { name: 'ONE HUNDRED', value: 100 },
    { name: 'TWENTY', value: 20 },
    { name: 'TEN', value: 10 },
    { name: 'FIVE', value: 5 },
    { name: 'ONE', value: 1 },
    { name: 'QUARTER', value: 0.25 },
    { name: 'DIME', value: 0.1 },
    { name: 'NICKEL', value: 0.05 },
    { name: 'PENNY', value: 0.01 }
];

const cidMap = new Map(cid);
let change = cash - price;
//change = parseFloat(change.toFixed(2));
const result = [];

denominations.forEach(denomination => {
    let availableCash = cidMap.get(denomination.name);
    let count = 0;

    while (change >= denomination.value && availableCash >= denomination.value) {
        change -= denomination.value;
        //change = parseFloat(change.toFixed(2));
        availableCash -= denomination.value;
        count++;
    }

    cidMap.set(denomination.name, availableCash);

    if (count > 0) {
        result.push([denomination.name, denomination.value * count]);
    }
});
console.log(cidMap);
console.log(result);