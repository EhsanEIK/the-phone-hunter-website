// load & display phones by name
const loadPhones = async (searchText, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res = await fetch(url);
    const data = await res.json();
    showPhones(data.data, dataLimit);
}

const showPhones = (phones, dataLimit) => {
    const phonesContainer = document.getElementById('phones-container');
    phonesContainer.innerHTML = '';
    // warning message if no phones found
    const warningMessage = document.getElementById('warning-message');
    if (phones.length === 0) {
        warningMessage.classList.remove('d-none');
    }
    else {
        warningMessage.classList.add('d-none');
    }
    // show only 10 phones
    const showAll = document.getElementById('show-all');
    if (dataLimit && phones.length > 10) {
        phones = phones.slice(0, dataLimit);
        showAll.classList.remove('d-none');
    }
    else {
        showAll.classList.add('d-none');
    }
    phones.forEach(phone => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card h-100 p-3">
            <img src="${phone.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${phone.phone_name}</h5>
                <p class="card-text">Brand: ${phone.brand}</p>
                <button onclick="loadPhoneDetails('${phone.slug}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetailsModal">Get Details</button>
            </div>
        </div>
        `;
        phonesContainer.appendChild(div);
    });
    // stop loader
    toggleSpinner(false);
}

loadPhones('iphone');


const processFunction = (dataLimit) => {
    // start loader
    toggleSpinner(true);
    const searchInputField = document.getElementById('search-input-field');
    const searchValue = searchInputField.value;
    loadPhones(searchValue, dataLimit);
}

// search option by name [search by input field]
document.getElementById('search-input-field').addEventListener('keyup', function (event) {
    if (event.key == 'Enter') {
        processFunction(10);
    }
})

// search option by name [search by button]
document.getElementById('btn-search').addEventListener('click', function (event) {
    processFunction(10);
})

// show all button
document.getElementById('btn-show-all').addEventListener('click', function () {
    processFunction();
})

// function for loader/spinner
const toggleSpinner = isLoading => {
    const loader = document.getElementById('loader');
    if (isLoading) {
        loader.classList.remove('d-none');
    }
    else {
        loader.classList.add('d-none');
    }
}

//  show phone details
const loadPhoneDetails = (id) => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => showPhoneDetails(data.data));
}

const showPhoneDetails = (phone) => {
    const phoneDetailsTitle = document.getElementById('phoneDetailsModalLabel');
    phoneDetailsTitle.innerText = phone.name;

    const phoneDetailsBody = document.getElementById('phone-details');
    phoneDetailsBody.innerHTML = `
    <p>Brand: ${phone.brand}</p>
    <p>Display: ${phone.mainFeatures.displaySize}</p>
    <p>Memory: ${phone.mainFeatures.memory}</p>
    <p>BLuetooth: ${phone.others.Bluetooth ? phone.others.Bluetooth : 'No'}</p>
    <p>Radio: ${phone.others.Radio}</p>
    <p>WLAN: ${phone.others.WLAN}</p>
    <p>Release Date: ${phone.releaseDate ? phone.releaseDate : 'Not Published Yet'}</p>
    `;
}