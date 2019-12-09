// ! important !
// for building use the following actions
// npx webpack src/source.js --output dist/final.js 
// npx webpack src/base.css --output dist/final.css

// don't forget to install dependencies, up until now 2019-12-08
// npm install webpack
// npm install webpack-cli
// npm install chart.js --save
// npm install css-loader 

// npm-watch is not needed (experimenting with automated build)


// chart.js import prereq 
import Chart from 'chart.js';
Chart.platform.disableCSSInjection = true;

// plot ITM chart on page load
plotChart();

// Lili
// function for plotting ITM chart based on reading from Local storage
function plotChart(){

// read from local storage
let readLocalStorage = JSON.parse(localStorage.getItem("itm"));
// set arrays to load data from localStorage and feed chart.js
let ITM_date_array = [];
let ITM_user_array = [];

// if there is no entry in local storage, hide chart.js
if (localStorage.getItem("itm") == undefined) {
    console.log("No ITMs in the DB!");
} else { // if entry in local storage exists, read and plot chart      
    readLocalStorage.forEach(function(item) {
    ITM_date_array.push(item.date_itm);
    ITM_user_array.push(item.itm_user);
    });

// prepare new chart (based from chart.js docu)
var ctx = document.getElementById('myChart');
var myChart = new Chart(ctx, {
    type: "bar",
    data: {
        labels: ITM_date_array, // set dates on x axis in an array
        datasets: [{
            label: "Show ITM",
            data: ITM_user_array, // set values to create graphs in an array
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 
                'rgba(54, 162, 235, 1)',
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});
}
}

// Matej
// meal input

//variables add getElementByClass
let var_date_time = document.getElementById("date_time");
let var_food_intake = document.getElementById("food_intake");
let var_kcal = document.getElementById("kcal");
let meal_result = document.getElementById("meal_result");  //2019-12-08 added to show Success message!
let food_input = []; //storage for all foods - replace with local storage

//eventListeners
let btn_save = document.getElementById("btn_save");
btn_save.addEventListener("click", function(){meal_input();});

// store meal function
function meal_input() {
    let readLocalStorage = JSON.parse(localStorage.getItem("meal"));
    // define meal
    let meal = {date_time:var_date_time.value, food_intake: var_food_intake.value, kcal: var_kcal.value};
    
    // if there is no entry in local storage, create array with first entry
    if (localStorage.getItem("meal") == undefined) {
        food_input.push(meal);
        localStorage.setItem("meal", JSON.stringify(food_input));
        console.log("1st Meal in DB!");
    } else { // if entry in local storage exists, add current meal to array
        food_input=readLocalStorage;
        food_input.push(meal);
        localStorage.removeItem("meal");
        localStorage.setItem("meal", JSON.stringify(food_input));
        console.log("another Meal in DB!");
    }
    
    // 2019-12-08 Success message
    meal_result.innerText = `Your meal ${var_food_intake.value} ${var_kcal.value} was successfully stored in DB.`;
    
    // run meals_output and show results from localStorage alongside with saved meal
    meals_output(var_date_time.value)
};

// Ziga
// Show food results

//declaration
let btn_show = document.getElementById("btn_show");
let date_input = document.getElementById("date_input");
food_input = JSON.parse(localStorage.getItem("meal"));

//button and function that lists all meals from local storage
btn_show.addEventListener("click", function() {meals_output()});

//2019-12-08 changed to standalone function for easier calling outside the button
function meals_output(meal_input_date) {
    let food_results = document.getElementById("food_results");
    let kcal_counter = 0;
    food_results.innerHTML = "";
    food_input.forEach(function(item) {
    
//list meals with selected date
    if (item.date_time === date_input.value || item.date_time === meal_input_date) { // 2019-12-08 MM added additional processing if I pass date from meal_input() that pushes .value already 
        let food_item= document.createElement("p")
        food_item.innerText=(item.food_intake + "  =  " + item.kcal + "kalorij")
        food_results.appendChild(food_item);
        kcal_counter +=Number(item.kcal); // converts string to number as item.kcal is parsed from JSON
    }  
})

 // 2019-12-08 MM - added total kcal counter
 if (kcal_counter !== 0) {
 let kcal_total = document.createElement("p");
 kcal_total.innerText=`Total: ${kcal_counter} kcal.`;
 food_results.appendChild(kcal_total);
 }

// after listing check food_results div and if no results, show No results text
//2019-12-08 MM removed LET and declared variable inside the function above
food_results = document.getElementById("food_results");

// Show error message if no elements in localStorage
if(food_results.innerHTML == "") {
    let food_item= document.createElement("p")
    food_item.innerText=("No food inputs this day.")
    food_results.appendChild(food_item);
} 
}

// Beni
// store ITM to local storage

//declaration + button + function
let btn_value=document.getElementById("btn_itm");
btn_value.addEventListener("click",function itm_calc(){
let weight_user=document.getElementById("weight_user");
let height_user=document.getElementById("height_user");
let date_itm = document.getElementById("date_itm");
let height_2= height_user.value*height_user.value;
let itm_results = document.getElementById("itm_results");
let itm_input = [];

//calculation of ITM
let itm_user=Math.floor((weight_user.value/height_2)*10000);
let itm_measurement = {date_itm:date_itm.value, itm_user:itm_user}; // watch out, itm_user is calculated in JS and is not .value
     
// store to local storage
let readLocalStorage = JSON.parse(localStorage.getItem("itm"));

// if there is no entry in local storage, create array with first entry
if (localStorage.getItem("itm") == undefined) {
    itm_input.push(itm_measurement);
    localStorage.setItem("itm", JSON.stringify(itm_input));
    console.log("1st ITM in DB!");
    console.log(itm_input);
} else { // if entry in local storage exists, add current itm measurement to array
    itm_input=readLocalStorage;
    itm_input.push(itm_measurement);
    localStorage.removeItem("itm");
    localStorage.setItem("itm", JSON.stringify(itm_input));
    console.log("another ITM in DB!");
    console.log(itm_input);
}
// show results and refresh chart
itm_results.innerText = `Your ITM ${itm_user} was successfully stored in DB.`;
plotChart()
});


// 2019-12-08 Load dummy data for testing
let btn_load = document.getElementById("btn_load");
btn_load.addEventListener("click", function(){loadDummyData()});

function loadDummyData() {
let dummy_meal = 
    [{"date_time":"2019-12-01","food_intake":"smoothie","kcal":250},
    {"date_time":"2019-12-01","food_intake":"hamburger","kcal":550},
    {"date_time":"2019-12-02","food_intake":"pizza","kcal":550},
    {"date_time":"2019-12-02","food_intake":"pasta","kcal":450},
    {"date_time":"2019-12-03","food_intake":"salad","kcal":200},
    {"date_time":"2019-12-03","food_intake":"sandwich","kcal":150},
    {"date_time":"2019-12-03","food_intake":"chocolate","kcal":200}];

let dummy_itm = 
    [{date_itm:"2019-01-01", itm_user:27},
    {date_itm:"2019-03-01", itm_user:26},
    {date_itm:"2019-06-01", itm_user:24},
    {date_itm:"2019-09-01", itm_user:25},
    {date_itm:"2019-11-01", itm_user:24}];

    // load dummy data to local storage
    localStorage.setItem("meal", JSON.stringify(dummy_meal));
    localStorage.setItem("itm", JSON.stringify(dummy_itm));

// update chart.js
plotChart()

}


// to-do

// add bootstrap
// figure out how to build CSS and JS at the same time
// add tracking of height and weight to JSON for future graph excercises (don't forget to load dummy data as well)
// add time for input meal for better tracking throughout the day
// CSS styling
