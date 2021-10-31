//Richard Yu Lab 6
class RecipeCard extends HTMLElement {
  constructor() {
    super();

    //attaching shadow dom
    this.attachShadow({mode:'open'});
    // Part 1 Expose - TODO

    // You'll want to attach the shadow DOM here
  }

  set data(data) {
    // This is the CSS that you'll use for your recipe cards
    const styleElem = document.createElement('style');
    const styles = `
      * {
        font-family: sans-serif;
        margin: 0;
        padding: 0;
      }
      
      a {
        text-decoration: none;
      }

      a:hover {
        text-decoration: underline;
      }
      
      article {
        align-items: center;
        border: 1px solid rgb(223, 225, 229);
        border-radius: 8px;
        display: grid;
        grid-template-rows: 118px 56px 14px 18px 15px 36px;
        height: auto;
        row-gap: 5px;
        padding: 0 16px 16px 16px;
        width: 178px;
      }

      div.rating {
        align-items: center;
        column-gap: 5px;
        display: flex;
      }
      
      div.rating > img {
        height: auto;
        display: inline-block;
        object-fit: scale-down;
        width: 78px;
      }

      article > img {
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
        height: 118px;
        object-fit: cover;
        margin-left: -16px;
        width: calc(100% + 32px);
      }

      p.ingredients {
        height: 32px;
        line-height: 16px;
        padding-top: 4px;
        overflow: hidden;
      }
      
      p.organization {
        color: black !important;
      }

      p.title {
        display: -webkit-box;
        font-size: 16px;
        height: 36px;
        line-height: 18px;
        overflow: hidden;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }

      p:not(.title), span, time {
        color: #70757A;
        font-size: 12px;
      }
    `;
    styleElem.innerHTML = styles;
    //appending css style file to shadow root

   

    // Here's the root element that you'll want to attach all of your other elements to
    const card = document.createElement('article');
    
    //Appending root article element to shadow root
    


  //creating image url and adding it to document
  let newElement = document.createElement("img");
// console.log(data);
  // console.log(searchForKey(data,"thumbnailUrl"));
  newElement.src = searchForKey(data,"thumbnailUrl");
  newElement.alt = "Recipe Title";

  // console.log("RIGHT HERE");
  card.appendChild(newElement);


     
  //Creating p with class title and a href inside it 
  newElement = document.createElement("p");
  newElement.classList.add('title');
  card.appendChild(newElement);
  console.log(newElement);
    
  //Creating a with class title and a href inside it 
  let nestNewElement = document.createElement("a");

  nestNewElement.innerHTML= searchForKey(data,"headline");
    // nestNewElement.innerHTML= data["name"];
  nestNewElement.href = searchForKey(data,"url");
  newElement.appendChild(nestNewElement);
  newElement.appendChild(nestNewElement);

  // console.log(newElement);


  //Creating p with class organization and a href inside it 
  newElement = document.createElement("p");
  newElement.classList.add('organization');
  newElement.innerHTML = searchForKey(data,"name");
  card.appendChild(newElement);

  //Create the rating div
  //NewElement->Rating Div
  newElement = document.createElement("div");
  newElement.classList.add('rating');
  card.appendChild(newElement);
  nestNewElement = document.createElement("span");

  newElement.appendChild(nestNewElement);
  // //if the datapoint contains rating, add image and span of number

 
  if(searchForKey(data,"ratingValue")){
    //set span to rating value
      nestNewElement.innerHTML = searchForKey(data,"ratingValue");
      console.log(searchForKey(data,"ratingValue"));
    //creating the image value
      // nestNewElement.value = searchForKey(data,"ratingValue");
      nestNewElement = document.createElement("img");
      nestNewElement.src = "";
      //getting the star value;
      let star = parseFloat(  searchForKey(data,"ratingValue") );
      console.log(star);
      if(star>=4.5){
        nestNewElement.src = "assets/images/icons/5-star.svg";
        nestNewElement.alt = "5 stars";
      }else if (star>=4){
        nestNewElement.src = "assets/images/icons/4-star.svg";
        nestNewElement.alt = "4 stars";
      }else if (star>=3){
        nestNewElement.src = "assets/images/icons/3-star.svg";
        nestNewElement.alt = "3 stars";
      }else if (star>=2){
        nestNewElement.src = "assets/images/icons/2-star.svg";
        nestNewElement.alt = "2 stars";
      }else if(star>=1){
        nestNewElement.src = "assets/images/icons/1-star.svg";
        nestNewElement.alt = "1 stars";
      }else{
        nestNewElement.src = "assets/images/icons/0-star.svg";
        nestNewElement.alt = "0 stars";
      }

     newElement.appendChild(nestNewElement);
      //create total number of reviews span
      nestNewElement = document.createElement("span");
      nestNewElement.value = `(${searchForKey(data,"ratingCount")})`;

  //case if the datapoint does not contain rating
      }  else
  {
    //setting span value to No Reviews
   nestNewElement.innerHTML = "No Reviews";
   newElement.appendChild(nestNewElement);
    
  }


  //Creating time element
  newElement = document.createElement("time");

  //getting prep time:
  newElement.innerHTML = convertTime(searchForKey(data,"totalTime"));
  card.appendChild(newElement);

  //creating ingredient list:


  newElement = document.createElement("p");
  newElement.classList.add('ingredients');
  newElement.innerHTML=createIngredientList(searchForKey(data,"recipeIngredient"));
  card.appendChild(newElement);



 this.shadowRoot.appendChild(card);
       this.shadowRoot.appendChild(styleElem);

    // Some functions that will be helpful here:
    //    document.createElement()
    //    document.querySelector()
    //    element.classList.add()
    //    element.setAttribute()
    //    element.appendChild()
    //    & All of the helper functions below

    // Make sure to attach your root element and styles to the shadow DOM you
    // created in the constructor()

    // Part 1 Expose - TODO
  }
}


/*********************************************************************/
/***                       Helper Functions:                       ***/
/***          Below are some functions I used when making          ***/
/***     the solution, feel free to use them or not, up to you     ***/
/*********************************************************************/

/**
 * Recursively search for a key nested somewhere inside an object
 * @param {Object} object the object with which you'd like to search
 * @param {String} key the key that you are looking for in the object
 * @returns {*} the value of the found key
 */
function searchForKey(object, key) {
  var value;
  Object.keys(object).some(function (k) {
    if (k === key) {
      value = object[k];
      return true;
    }
    if (object[k] && typeof object[k] === 'object') {
      value = searchForKey(object[k], key);
      return value !== undefined;
    }
  });
  return value;
}

/**
 * Extract the URL from the given recipe schema JSON object
 * @param {Object} data Raw recipe JSON to find the URL of
 * @returns {String} If found, it returns the URL as a string, otherwise null
 */
function getUrl(data) {
  if (data.url) return data.url;
  if (data['@graph']) {
    for (let i = 0; i < data['@graph'].length; i++) {
      if (data['@graph'][i]['@type'] == 'Article') return data['@graph'][i]['@id'];
    }
  };
  return null;
}

/**
 * Similar to getUrl(), this function extracts the organizations name from the
 * schema JSON object. It's not in a standard location so this function helps.
 * @param {Object} data Raw recipe JSON to find the org string of
 * @returns {String} If found, it retuns the name of the org as a string, otherwise null
 */
function getOrganization(data) {
  if (data.publisher?.name) return data.publisher?.name;
  if (data['@graph']) {
    for (let i = 0; i < data['@graph'].length; i++) {
      if (data['@graph'][i]['@type'] == 'Organization') {
        return data['@graph'][i].name;
      }
    }
  };
  return null;
}

/**
 * Converts ISO 8061 time strings to regular english time strings.
 * Not perfect but it works for this lab
 * @param {String} time time string to format
 * @return {String} formatted time string
 */
function convertTime(time) {
  let timeStr = '';

  // Remove the 'PT'
  time = time.slice(2);

  let timeArr = time.split('');
  if (time.includes('H')) {
    for (let i = 0; i < timeArr.length; i++) {
      if (timeArr[i] == 'H') return `${timeStr} hr`;
      timeStr += timeArr[i];
    }
  } else {
    for (let i = 0; i < timeArr.length; i++) {
      if (timeArr[i] == 'M') return `${timeStr} min`;
      timeStr += timeArr[i];
    }
  }

  return '';
}

// function convertTime(time) {
//   let timeStr = '';

//   // Remove the 'PT'
//   time = time.slice(2);

//   let timeArr = time.split('');
//   if (time.includes('H')) {
//     for (let i = 0; i < timeArr.length; i++) {
//       if (timeArr[i] == 'H') return (parseInt(timeStr)*60);
//       timeStr += timeArr[i];
//     }
//   } else {
//     for (let i = 0; i < timeArr.length; i++) {
//       if (timeArr[i] == 'M') return parseInt(timeStr);
//       timeStr += timeArr[i];
//     }
//   }

//   return '';
// }

/**
 * Takes in a list of ingredients raw from imported data and returns a neatly
 * formatted comma separated list.
 * @param {Array} ingredientArr The raw unprocessed array of ingredients from the
 *                              imported data
 * @return {String} the string comma separate list of ingredients from the array
 */
function createIngredientList(ingredientArr) {
  let finalIngredientList = '';

  /**
   * Removes the quantity and measurement from an ingredient string.
   * This isn't perfect, it makes the assumption that there will always be a quantity
   * (sometimes there isn't, so this would fail on something like '2 apples' or 'Some olive oil').
   * For the purposes of this lab you don't have to worry about those cases.
   * @param {String} ingredient the raw ingredient string you'd like to process
   * //Richard Yu Lab 6
   * @return {String} the ingredient without the measurement & quantity 
   * (e.g. '1 cup flour' returns 'flour')
   */
  function _removeQtyAndMeasurement(ingredient) {
    return ingredient.split(' ').splice(2).join(' ');
  }

  ingredientArr.forEach(ingredient => {
    ingredient = _removeQtyAndMeasurement(ingredient);
    finalIngredientList += `${ingredient}, `;
  });

  // The .slice(0,-2) here gets ride of the extra ', ' added to the last ingredient
  return finalIngredientList.slice(0, -2);
}

// Define the Class so you can use it as a custom element.
// This is critical, leave this here and don't touch it
customElements.define('recipe-card', RecipeCard);
//Richard Yu Lab 6