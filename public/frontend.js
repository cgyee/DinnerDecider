async function getResturantsByCategory(str) {
    const res = await fetch(`/api/${str}`);
    const resturants = await res.json();
    return resturants;
}

function getRandomCategory(categories) {
    return categories[Math.floor(Math.random() * categories.length)]
}

const select = document.querySelector('#categories');
const button = document.querySelector('button');

button.addEventListener('click', async () => {
    const options = document.querySelectorAll('option');
    const categories = Array.from(options).filter(option => option.selected === true);
    let category = getRandomCategory(categories);
    category = category.value;
    console.log(category);
    const resturants = await getResturantsByCategory(category);
    console.log(resturants);
});