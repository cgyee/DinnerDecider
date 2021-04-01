async function foo() {
    const get = await fetch('http://localhost:8080/');
    const result = await get.json();
    const span = document.querySelector('#target');
    console.log(result);
    span.textContent = result['test'];   
}

async function bar(s) {
    const get = await fetch(`http://localhost:8080/${s}`);
    const result =  await get.json();
    console.log(result);
}

async function postman() {
    const get = await fetch('http://localhost:8080/post');
    const res = await get.json();
    console.log(res);
}
 
async function getFoodbyCategory(s) {
    const get = await fetch(`http://localhost:8080/categories/${s}`);
    const res = await get.json();
    console.log(res);
    return res;
}

const button = document.querySelector('#action_button');
const span = document.querySelector('#target');
const input = document.querySelector('#select_options');
// button.addEventListener('click', () => foo())
button.addEventListener('click', async () => {
    console.log(input.value);
    const s = input.value;
    // postman();
    const resturants = await getFoodbyCategory(s);
    const resturant = resturants.businesses[0];
    const resturantName = resturant.name;
    span.textContent = resturantName;
});