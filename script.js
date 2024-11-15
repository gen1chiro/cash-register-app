const changeDisplay = document.querySelector(".cid");
const totalDisplay = document.getElementById("total");
const cashDisplay = document.getElementById("cash");
const changeDueDisplay = document.getElementById("change-due");
const inputButtons = document.querySelectorAll(".button");
const clearButton = document.querySelector(".clear-button");
const purchaseButton = document.getElementById("purchase-btn");
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

const cidTotal = () => Array.from(cidMap.values()).reduce((a, c) => a + c, 0);

const checkCustomerCash = () => Number(cashDisplay.value) >= price;

const calculateChange = () => {
    const result = [];
    let status = "Status: OPEN";
    let cidValues = [];
    let change = Number(cashDisplay.value) - price;
    change = parseFloat(change.toFixed(2));

    if (change === 0.00) {
        updateChangeDueDisplay(result, "No change due - customer paid with exact cash");
        return;
    }

    if (change > cidTotal()) {
        updateChangeDueDisplay(result, "Status: INSUFFICIENT_FUNDS");
        return;
    }

    denominations.forEach(denomination => {
        let availableCash = cidMap.get(denomination.name);
        let count = 0;

        while (change >= denomination.value && availableCash >= denomination.value) {
            change -= denomination.value;
            change = parseFloat(change.toFixed(2));
            availableCash -= denomination.value;
            availableCash = parseFloat(availableCash.toFixed(2));
            count++;
        }

        cidMap.set(denomination.name, availableCash);

        if (count > 0) {
            result.push([denomination.name, denomination.value * count]);
        }
    });

    if (cidTotal() === 0) {
        status = "Status: CLOSED";
    }

    updateChangeDueDisplay(result, status);
}

const updateCidDisplay = () => {
    changeDisplay.innerHTML = "<p class=\"cid-header\"><strong>Change in Drawer</strong></p>";
    cidMap.forEach((value, key) => {
        const paragraph = document.createElement("p");
        paragraph.textContent = `${key}: ${value}`;
        changeDisplay.appendChild(paragraph);
    });
}

const updateChangeDueDisplay = (result, status) => {
    changeDueDisplay.innerHTML = `<p>${status}</p>`;
    result.forEach(result => {
        const paragraph = document.createElement("p");
        paragraph.textContent = `${result[0]}: ${result[1]}`;
        changeDueDisplay.appendChild(paragraph);
    })
}

const clearCashDisplay = () => {
    cashDisplay.value = "";
}

const displayTotal = () => {
    totalDisplay.value = price;
}

updateCidDisplay();
displayTotal();

purchaseButton.addEventListener("click", () => {
    if (!checkCustomerCash()) {
        alert("Customer does not have enough money to purchase the item");
        clearCashDisplay();
        return;
    }
    calculateChange();
    updateCidDisplay();
    clearCashDisplay();
});

inputButtons.forEach(button => {
    button.addEventListener("click", () => {
        if (button.value === "." && cashDisplay.value.includes(".")) {
            return;
        }
        if (button.value === "0" && cashDisplay.value === "") {
            return;
        }
        cashDisplay.value += button.value;
    });
});

clearButton.addEventListener("click", () => {
    cashDisplay.value = "";
});

