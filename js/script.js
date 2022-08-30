// load & display phones by name
const loadPhones = async (searchText) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res = await fetch(url);
    const data = await res.json();
    showPhones(data.data);
}

const showPhones = (phones) => {
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
    phones = phones.slice(0, 10);
    phones.forEach(phone => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card h-100">
            <img src="${phone.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${phone.phone_name}</h5>
                <p class="card-text">Brand: ${phone.brand}</p>
            </div>
        </div>
        `;
        phonesContainer.appendChild(div);
    });
    // stop loader
    toggleSpinner(false);
}

loadPhones('iphone');

// search option by name
document.getElementById('search-input-field').addEventListener('keyup', function (event) {
    // start loader
    toggleSpinner(true);

    if (event.key == 'Enter') {
        const searchInputField = document.getElementById('search-input-field');
        const searchValue = searchInputField.value;
        loadPhones(searchValue);
    }
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