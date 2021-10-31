// main.js

// Here is where the recipes that you will fetch.
// Feel free to add your own here for part 2, if they are local files simply add their path as a string.
const recipes = [
  'https://introweb.tech/assets/json/ghostCookies.json',
  'https://introweb.tech/assets/json/birthdayCake.json',
  'https://introweb.tech/assets/json/chocolateChip.json',
  'assets/recipes/recipe1.json',
  'assets/recipes/recipe3.json',
  'assets/recipes/recipe2.json'
  

  
];

// Once all of the recipes that were specified above have been fetched, their
// data will be added to this object below. You may use whatever you like for the
// keys as long as it's unique, one suggestion might but the URL itself
const recipeData = {}

window.addEventListener('DOMContentLoaded', init);

// This is the first function to be called, so when you are tracing your code start here.
async function init() {
  // fetch the recipes and wait for them to load
  let fetchSuccessful = await fetchRecipes();
  // if they didn't successfully load, quit the function
  if (!fetchSuccessful) {
    console.log('Recipe fetch unsuccessful');
    return;
  };

  // console.log(recipeData);
  // Add the first three recipe cards to the page

  createRecipeCards();

  // Make the "Show more" button functional
  let flag = true;
  bindShowMore();
}

async function fetchRecipes() {
  return new Promise((resolve, reject) => {

    for(let i =0;i<recipes.length;i++){

      fetch(recipes[i])
      .then(response => response.json())// returns a promise that gets the json file
      .then(data =>{
        
        recipeData[i] = data;
        // console.log(data);
        var size = Object.keys(recipeData).length;

        if(recipes.length==(size)){

          resolve(true);
        }})//The date here is the json file
      .catch((error)=>{ reject(false)}); //If the fetch results in an error, call reject(false)

    }
    //do i need to wait to call this resolve(true)
 

    // if()
    
    // This function is called for you up above
    // From this function, you are going to fetch each of the recipes in the 'recipes' array above.
    // Once you have that data, store it in the 'recipeData' object. You can use whatever you like
    // for the keys. Once everything in the array has been successfully fetched, call the resolve(true)
    // callback function to resolve this promise. If there's any error fetching any of the items, call
    // the reject(false) function.

    // For part 2 - note that you can fetch local files as well, so store any JSON files you'd like to fetch
    // in the recipes folder and fetch them from there. You'll need to add their paths to the recipes array.

    // Part 1 Expose - TODO



  });
}

function createRecipeCards() {


let mainSelector = document.querySelector('main');
let newRecipeCard;
for(let i = 0; i<3; i++){
  newRecipeCard = document.createElement("recipe-card");
  // console.log("EXECUTED HERE");
  //console.log("EXECUTED HERE");

  newRecipeCard.data = recipeData[i];
  mainSelector.appendChild( newRecipeCard);
      
    }
  // This function is called for you up above.
  // From within this function you can access the recipe data from the JSON 
  // files with the recipeData Object above. Make sure you only display the 
  // three recipes we give you, you'll use the bindShowMore() function to
  // show any others you've added when the user clicks on the "Show more" button.

  // Part 1 Expose - TODO
}

function bindShowMore() {

  let buttonSelector = document.querySelector("button");

  buttonSelector.addEventListener('click',()=>{

      if(buttonSelector.textContent==="Show more"){
        buttonSelector.textContent= "Show less";
        let mainSelector = document.querySelector('main');
        let newRecipeCard;
        for(let i = 3; i<6; i++){
        newRecipeCard = document.createElement("recipe-card");
        // console.log("EXECUTED HERE");
        //console.log("EXECUTED HERE");

        newRecipeCard.data = recipeData[i];
        mainSelector.appendChild( newRecipeCard);
      
    }
      }else{
        buttonSelector.textContent = "Show more";
        let mainSelector = document.querySelector('main');
        let newRecipeCard;
        // for(let i in mainSelector){
        //   console.log(i);
        // }
        // console.log(mainSelector);
        for(let i = 0; i<3; i++){
          // console.log("REMOVE");
        // newRecipeCard = document.createElement("recipe-card");
        let removalElement = document.querySelector('main');
        // console.log(removalElement.childNodes[6]);

        // console.log(removalElement.childNodes[3]);
         removalElement.removeChild(removalElement.childNodes[6]);
        // console.log("EXECUTED HERE");
        //console.log("EXECUTED HERE");

        
      
    }




        
      }
  })


  // This function is also called for you up above.
  // Use this to add the event listener to the "Show more" button, from within 
  // that listener you can then create recipe cards for the rest of the .json files
  // that were fetched. You should fetch every recipe in the beginning, whether you
  // display it or not, so you don't need to fetch them again. Simply access them
  // in the recipeData object where you stored them/

  // Part 2 Explore - TODO
}