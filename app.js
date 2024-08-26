const countryList = {
    EUR: "FR",
    USD: "US",
    JPY: "JP",
    BGN: "BG",
    CZK: "CZ",
    DKK: "DK",
    GBP: "GB",
    HUF: "HU",
    PLN: "PL",
    RON: "RO",
    SEK: "SE",
    CHF: "CH",
    ISK: "IS",
    NOK: "KR",
    HRK: "HR",
    RUB: "RU",
    TRY: "TR",
    AUD: "AU",
    BRL: "BR",
    CAD: "CA",
    CNY: "CN",
    HKD: "HK",
    IDR: "ID",
    ILS: "IL",
    INR: "IN",
    KRW: "KR",
    MXN: "MX",
    MYR: "MY",
    NZD: "NZ",
    PHP: "PH",
    SGD: "SG",
    THB: "TH",
    ZAR: "ZA"
};
const url =
    "https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_hOPUvxLkKPnjzMHBnJkmT53sS8eKJruIpApLUWUH"


let dropdowns = document.querySelectorAll('.dropdown select');
const btn = document.querySelector('form button');
let fromCurr = document.querySelector(".from select");
let toCurr = document.querySelector(".to select");
const msg = document.querySelector('.message');
const reverseIcon = document.querySelector('i');

for (let selects of dropdowns) {
    for (country in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = country;
        newOption.value = country;
        //    to default selected INR
        if (selects.name === "to" && country === 'USD') {
            newOption.selected = 'selected';
        }
        // from default selected USD
        if (selects.name === "from" && country === 'INR') {
            newOption.selected = 'selected';
        }
        selects.append(newOption);
    }
    selects.addEventListener('change', (event) => {
        changeFlag(event.target);
    });
}

const changeFlag = (change) => {
    // change will give us selected options target change value
    const courencyCode = change.value;
    const countryCode = countryList[courencyCode];
    // accessing image through change
    const img = change.parentElement.querySelector('img');
    img.src = `https://flagsapi.com/${countryCode}/flat/64.png`;
}
const changeFlagManually = (from, to) => {
    const fromCountryCode = countryList[from];
    const toCountryCode = countryList[to];
    //swap the selected
    let temp = fromCurr.value;
    fromCurr.value = toCurr.value;
    toCurr.value = temp;
    // accessing image through change
    const img1 = document.querySelector('#img1');
    const img2 = document.querySelector('#img2');
    img1.src = `https://flagsapi.com/${toCountryCode}/flat/64.png`;
    img2.src = `https://flagsapi.com/${fromCountryCode}/flat/64.png`;
}

// change on click btn
btn.addEventListener('click', (event) => {
    // donot refresh page on change
    event.preventDefault();
    // access amt
    let amount = document.querySelector('.amount input');
    let amountVal = amount.value;
    // handle negative
    if (amountVal <= 0 || amountVal === "") {
        // also display 1 if condition is true
        amountVal = 1;
        amount.value = "1";
    }
    // now modify url
    let Url = `${url}&base_currency=${fromCurr.value}&currencies=${toCurr.value}`;
    // function call
    fetching(Url, fromCurr.value, toCurr.value, amountVal);
});
// funcntion to cal and call
async function fetching(URL, fromCurrency, toCurrency, amt) {
    msg.innerHTML = "<img src='load.gif' alt='Loading...' height='20px'/>"
    btn.innerHTML = "<img src='load.gif' alt='Loading...' height='20px'/>"
    btn.style.backgroundColor = "white";
    let response = await fetch(URL);
    let jsonData = await response.json();
    let data = jsonData.data;
    myCurrRate = data[toCurrency.toString()];
    let totalAmt = amt * myCurrRate;
    btn.innerHTML = "<button>Convert</button>"
    btn.style.backgroundColor = "#663399";
    msg.innerText = `${amt} ${fromCurrency} = ${totalAmt.toFixed(3)} ${toCurrency}`
}

// reverse the converter
reverseIcon.addEventListener("click", (event) => {
    // donot refresh page on change
    event.preventDefault();
    // changing flags
    changeFlagManually(fromCurr.value, toCurr.value);

    // access amt
    let amount = document.querySelector('.amount input');
    let amountVal = amount.value;
    // handle negative
    if (amountVal <= 0 || amountVal === "") {
        // also display 1 if condition is true
        amountVal = 1;
        amount.value = "1";
    }
    // now modify url
    let Url = `${url}&base_currency=${toCurr.value}&currencies=${fromCurr.value}`;
    // function call
    fetching(Url, toCurr.value, fromCurr.value, amountVal);
});

/*
demo url==> "https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_hOPUvxLkKPnjzMHBnJkmT53sS8eKJruIpApLUWUH&base_currency=INR&currencies=USD"

output
{
    "data": {
        "INR": 83.7408666468
    }
}
*/