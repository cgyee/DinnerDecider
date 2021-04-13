const select = document.querySelector('#category');
const options = [
    'American',
    'Chinese',
    'Korean',
    'Japanese',
    'Mexican',
    'Bahamian',
    'Tapas'
];

const optionsElements = [];
for(let value of options) {
    const option = document.createElement('option');
    option.value = value;
    option.textContent = value
    select.append(option);
}