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
}

loadPhones();

// search option by name
document.getElementById('search-input-field').addEventListener('keyup', function (event) {
    if (event.key == 'Enter') {
        const searchInputField = document.getElementById('search-input-field');
        const searchValue = searchInputField.value;
        loadPhones(searchValue);
    }
})