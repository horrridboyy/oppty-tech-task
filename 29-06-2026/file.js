let sizeName = "Small";
let sizePrice = 0;
let activeBtn = null;

window.onload = function() {
    const buttons = document.querySelectorAll(".sizes button");
    buttons[0].classList.add("active");
    activeBtn = buttons[0];
    calculate();
};

function setSize(name, price, btn) {
    sizeName = name;
    sizePrice = price;

    if (activeBtn !== null) {
        activeBtn.classList.remove("active");
    }

    btn.classList.add("active");
    activeBtn = btn;

    calculate();
}

function calculate() {
    const crust = document.getElementById("crust");
    const crustPrice = Number(crust.value);
    const crustName = crust.options[crust.selectedIndex].text.split("-")[0].trim();

    const toppings = document.querySelectorAll(".top");
    let toppingPrice = 0;

    toppings.forEach(function(topping) {
        if (topping.checked) {
            toppingPrice += 0.50;
        }
    });

    const base = crustPrice + sizePrice;
    const subtotal = base + toppingPrice;
    const discount = subtotal * 0.10;
    const total = subtotal - discount;

    document.getElementById("pizzaName").innerHTML = sizeName + " " + crustName + " Pizza";
    document.getElementById("base").innerHTML = base.toFixed(2);
    document.getElementById("topPrice").innerHTML = toppingPrice.toFixed(2);
    document.getElementById("subtotal").innerHTML = subtotal.toFixed(2);
    document.getElementById("discount").innerHTML = discount.toFixed(2);
    document.getElementById("total").innerHTML = total.toFixed(2);
}