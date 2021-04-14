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
const cards = document.querySelector('#resturant_cards');
const options = document.querySelectorAll('option');
let categoriesSelected = [];

button.addEventListener('click', async () => {

    // while(cards.firstChild) {
    //     cards.removeChild(cards.firstChild);
    // }
    // Array.from(options).forEach(category => category.selected & categoriesSelected.push(category.value));

    // const category = categoriesSelected[Math.floor(Math.random() * categoriesSelected.length)];
    // const resturants = await getFoodbyCategory(category);
    
    // for(let i= 0; i < 3; i++) {
    //     const resturant = resturants.businesses[i];
    //     const resturantName = resturant.name;
    //     const resturantImage = resturant.image_url;

    //     const card = document.createElement('div');
    //     card.className = 'resturant_card';

    //     const img = document.createElement('img');
    //     const name = document.createElement('h3');

    //     img.src = resturantImage;
    //     img.className = 'resturant_img';
    //     name.textContent = resturantName
    //     card.append(img, name);
    //     cards.append(card);
    // }
    await fetch('http://localhost:8080/vote/temp');
    
});