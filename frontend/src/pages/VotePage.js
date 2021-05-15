import React, {useState, useEffect} from 'react';
import AsyncSelect from 'react-select/async';
import {useHistory} from 'react-router-dom';

const defaultOptions = [
    {label:'American', value:'tradamerican'},
    {label:'Barbeque', value:'bbq'},
    {label:'Caribbean', value:'caribbean'},
    {label:'Cuban', value:'cuban'},
    {label:'German', value:'german'},
    {label:'Greek', value:'greek'},
    {label:'Korean', value:'korean'},
    {label:'Vietnamese', value:'vietnamese'},
  ];

const allOptions = [
    {label:'Afghan', value:'afghani'},
    {label:'African', value:'african'},
    {label:'Senegalese', value:'senegalese'},
    {label:'South African', value:'southafrican'},
    {label:'American', value:'tradamerican'},
    {label:'Arabian', value:'arabian'},
    {label:'Argentine', value:'argentine'},
    {label:'Armenian', value:'armenian'},
    {label:'Asian Fusion', value:'asianfusion'},
    {label:'Australian', value:'australian'},
    {label:'Austrian', value:'austrian'},
    {label:'Bangladeshi', value:'bangladeshi'},
    {label:'Barbeque', value:'bbq'},
    {label:'Basque', value:'basque'},
    {label:'Belgian', value:'belgian'},
    {label:'Brasseries', value:'brasseries'},
    {label:'Brazilian', value:'brazilian'},
    {label:'Breakfast & Brunch', value:'breakfast_brunch'},
    {label:'Pancakes', value:'pancakes'},
    {label:'British', value:'british'},
    {label:'Buffets', value:'buffets'},
    {label:'Bulgarian', value:'bulgarian'},
    {label:'Burgers', value:'burgers'},
    {label:'Burmese', value:'burmese'},
    {label:'Cafes', value:'cafes'},
    {label:'Themed Cafes', value:'themedcafes'},
    {label:'Cafeteria', value:'cafeteria'},
    {label:'Creole', value:'cajun'},
    {label:'Cambodian', value:'cambodian'},
    {label:'Caribbean', value:'caribbean'},
    {label:'Dominican', value:'dominican'},
    {label:'Haitian', value:'haitian'},
    {label:'Puerto Rican', value:'puertorican'},
    {label:'Trinidadian', value:'trinidadian'},
    {label:'Catalan', value:'catalan'},
    {label:'Cheesesteaks', value:'cheesesteaks'},
    {label:'Chicken Shop', value:'chickenshop'},
    {label:'Chicken Wings', value:'chicken_wings'},
    {label:'Chinese', value:'chinese'},
    {label:'Cantonese', value:'cantonese'},
    {label:'Dim Sum', value:'dimsum'},
    {label:'Hainan', value:'hainan'},
    {label:'Shanghainese', value:'shanghainese'},
    {label:'Szechuan', value:'szechuan'},
    {label:'Comfort Food', value:'comfortfood'},
    {label:'Creperies', value:'creperies'},
    {label:'Cuban', value:'cuban'},
    {label:'Czech', value:'czech'},
    {label:'Delis', value:'delis'},
    {label:'Diners', value:'diners'},
    {label:'Dinner Theater', value:'dinnertheater'},
    {label:'Eritrean', value:'eritrean'},
    {label:'Ethiopian', value:'ethiopian'},
    {label:'Fast Food', value:'hotdogs'},
    {label:'Filipino', value:'filipino'},
    {label:'Fish & Chips', value:'fishnchips'},
    {label:'Fondue', value:'fondue'},
    {label:'Food Court', value:'food_court'},
    {label:'Food Stands', value:'foodstands'},
    {label:'French', value:'french'},
    {label:'Mauritius', value:'mauritius'},
    {label:'Reunion', value:'reunion'},
    {label:'Game Meat', value:'gamemeat'},
    {label:'Gastropubs', value:'gastropubs'},
    {label:'Georgian', value:'georgian'},
    {label:'German', value:'german'},
    {label:'Free', value:'gluten_free'},
    {label:'Greek', value:'greek'},
    {label:'Guamanian', value:'guamanian'},
    {label:'Halal', value:'halal'},
    {label:'Hawaiian', value:'hawaiian'},
    {label:'Nepalese', value:'himalayan'},
    {label:'Honduran', value:'honduran'},
    {label:'Hong Kong Style Cafe', value:'hkcafe'},
    {label:'Hot Dogs', value:'hotdog'},
    {label:'Hot Pot', value:'hotpot'},
    {label:'Hungarian', value:'hungarian'},
    {label:'Iberian', value:'iberian'},
    {label:'Indian', value:'indpak'},
    {label:'Indonesian', value:'indonesian'},
    {label:'Irish', value:'irish'},
    {label:'Italian', value:'italian'},
    {label:'Calabrian', value:'calabrian'},
    {label:'Sardinian', value:'sardinian'},
    {label:'Sicilian', value:'sicilian'},
    {label:'Tuscan', value:'tuscan'},
    {label:'Japanese', value:'japanese'},
    {label:'Conveyor Belt Sushi', value:'conveyorsushi'},
    {label:'Izakaya', value:'izakaya'},
    {label:'Japanese Curry', value:'japacurry'},
    {label:'Ramen', value:'ramen'},
    {label:'Teppanyaki', value:'teppanyaki'},
    {label:'Kebab', value:'kebab'},
    {label:'Korean', value:'korean'},
    {label:'Kosher', value:'kosher'},
    {label:'Laotian', value:'laotian'},
    {label:'Latin American', value:'latin'},
    {label:'Colombian', value:'colombian'},
    {label:'Salvadoran', value:'salvadoran'},
    {label:'Venezuelan', value:'venezuelan'},
    {label:'Raw Food', value:'raw_food'},
    {label:'Malaysian', value:'malaysian'},
    {label:'Mediterranean', value:'mediterranean'},
    {label:'Falafel', value:'falafel'},
    {label:'Mexican', value:'mexican'},
    {label:'Tacos', value:'tacos'},
    {label:'Middle Eastern', value:'mideastern'},
    {label:'Egyptian', value:'egyptian'},
    {label:'Lebanese', value:'lebanese'},
    {label:'Modern European', value:'modern_european'},
    {label:'Mongolian', value:'mongolian'},
    {label:'Moroccan', value:'moroccan'},
    {label:'New Mexican Cuisine', value:'newmexican'},
    {label:'Nicaraguan', value:'nicaraguan'},
    {label:'Noodles', value:'noodles'},
    {label:'Pakistani', value:'pakistani'},
    {label:'Pan Asian', value:'panasian'},
    {label:'Iranian', value:'persian'},
    {label:'Peruvian', value:'peruvian'},
    {label:'Pizza', value:'pizza'},
    {label:'Polish', value:'polish'},
    {label:'Polynesian', value:'polynesian'},
    {label:'Up Restaurants', value:'popuprestaurants'},
    {label:'Portuguese', value:'portuguese'},
    {label:'Poutineries', value:'poutineries'},
    {label:'Russian', value:'russian'},
    {label:'Salad', value:'salad'},
    {label:'Sandwiches', value:'sandwiches'},
    {label:'Scandinavian', value:'scandinavian'},
    {label:'Scottish', value:'scottish'},
    {label:'Seafood', value:'seafood'},
    {label:'Singaporean', value:'singaporean'},
    {label:'Slovakian', value:'slovakian'},
    {label:'Somali', value:'somali'},
    {label:'Soul Food', value:'soulfood'},
    {label:'Soup', value:'soup'},
    {label:'Southern', value:'southern'},
    {label:'Spanish', value:'spanish'},
    {label:'Sri Lankan', value:'srilankan'},
    {label:'Steakhouses', value:'steak'},
    {label:'Supper Clubs', value:'supperclubs'},
    {label:'Sushi Bars', value:'sushi'},
    {label:'Syrian', value:'syrian'},
    {label:'Taiwanese', value:'taiwanese'},
    {label:'Tapas Bars', value:'tapas'},
    {label:'Small Plates', value:'tapasmallplates'},
    {label:'Mex', value:'tex-mex'},
    {label:'Thai', value:'thai'},
    {label:'Turkish', value:'turkish'},
    {label:'Ukrainian', value:'ukrainian'},
    {label:'Uzbek', value:'uzbek'},
    {label:'Vegan', value:'vegan'},
    {label:'Vegetarian', value:'vegetarian'},
    {label:'Vietnamese', value:'vietnamese'},
    {label:'Waffles', value:'waffles'},
    {label:'Wraps', value:'wraps'}
];

const filterOptions = (userInput) => {
    return allOptions.filter(i => 
        i.label.toLowerCase().includes(userInput.toLowerCase())
    );
}

const promiseOptions = (userInput) =>
    new Promise(resolve => {
        setTimeout(() => {
            resolve(filterOptions(userInput));
        }, 1000)
    });

const VotePage = (props) => {
    const [currentSelectedOptions, setCurrentSelectedOptions] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [pollId, setPollId] = useState('')
    const hist = useHistory()
    const history = props.history || hist
    
    useEffect(() => {
        currentSelectedOptions.length === 3 && setSelectedOptions(currentSelectedOptions)
    }, [currentSelectedOptions, setSelectedOptions])

    useEffect(() => {
        if(history.location.state && 'id' in history.location.state) {
            setPollId(history.location.state.id)
        } else {
            ( async () => {
                const URI = history.location.pathname
                const response = await fetch(`http://localhost:5000/api${URI}`)
                console.log("🚀 ~ file: VotePage.js ~ line 211 ~ response", response)
                const data = await response.json()
                console.log("🚀 ~ file: VotePage.js ~ line 210 ~ data", data)
                setPollId(data.id)
            })(); 
        }
    },[]);

    const onClick = () => {
        (async () =>{
            const URI = history.location.pathname
            console.log("🚀 ~ file: VotePage.js ~ line 218 ~ URI", URI)
            const categories = {...selectedOptions}
            const response = await fetch(`http://localhost:5000/api${URI}`, 
            {
                method: 'PUT',
                mode: 'cors',
                headers: {'Content-type':'Application/json'},
                body: JSON.stringify({...selectedOptions})
            })
        })();
        history.push({
            pathname:`/Results/${pollId}`,
            state: {pollId}
        });
    }
    

    return (
        <div className='center-abs row ' style={{'flexDirection':'column'}}>
            <AsyncSelect
                isMulti
                cacheOptions
                defaultOptions={defaultOptions}
                loadOptions={promiseOptions}
                value={currentSelectedOptions}
                onChange={currentSelectedOptions => {
                    setCurrentSelectedOptions(currentSelectedOptions)
                }}
            />
            <button 
                className='btn button-text'
                disabled={!(currentSelectedOptions.length === 3)}
                onClick={onClick}
                style={{'margin':'40px 0 0 0', 'borderRadius':'5px', 'backgroundColor':'cadetblue', 'color':'white'}}
                >Submit
            </button>
        </div>
    )
}
export default VotePage;