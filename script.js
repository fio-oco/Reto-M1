let apiURLCountries = "https://restcountries.com/v3.1/all";
// prettier-ignore
let allCountriesNames = ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua & Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia & Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Cape Verde","Cayman Islands","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cruise Ship","Cuba","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kuwait","Kyrgyz Republic","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Mauritania","Mauritius","Mexico","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Namibia","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","Norway","Oman","Pakistan","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre & Miquelon","Samoa","San Marino","Satellite","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","South Africa","South Korea","Spain","Sri Lanka","St Kitts & Nevis","St Lucia","St Vincent","St. Lucia","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad & Tobago","Tunisia","Turkey","Turkmenistan","Turks & Caicos","Uganda","Ukraine","United Arab Emirates","United Kingdom","Uruguay","Uzbekistan","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"];
let selectedCountry;

let getRandomElements = function (sourceArray, numberElements) {
  let results = [];

  for (let i = 0; i < numberElements; i++) {
    // results.push(sourceArray[Math.floor(Math.random()*sourceArray.length)]);
    // result = results[i];
    let resultTitle = document.createElement("h3");
    let resultButton = document.createElement("button");
    let resultInfo = document.createElement("p");

        let country = sourceArray[Math.floor(Math.random()*sourceArray.length)]
        resultButton.id = country;
        resultButton.innerHTML = country;
        //let countryName= country   
        //the link for fetch isn't working because I haven't declared countryName yet, need to figure out how to do that without changing the value of country
        
        document.getElementById("buttons").appendChild(resultButton);
    
         document.getElementById(country).addEventListener("click", function(){
            let countryInfo;
            let countryFlag = document.createElement("img");
            let countryGoogleMaps = document.createElement("a");

            fetch(`https://restcountries.com/v3.1/name/${encodeURIComponent(country)}`)
                .then(response => response.json())
                .then((countryData) => {
                    console.log(countryData);
                    let countryInfo = countryData[0];

                    document.querySelector('#countryInfo').innerHTML += `
                    <h3 id= "countryName">${countryInfo.name.common}</h3>
                    <p id="infoParagraph">Region:${countryInfo.region}</p>
                    <p id="latlng">Latitude and Longitude: ${countryInfo.latlng}</p>
                    <p id="capital">Capital City: ${countryInfo.capital}</p>
                    <p id="languages">Official Languages: ${Object.values(countryInfo.languages).join(", ")}</p>
                    <p id="population">Population: ${countryInfo.population}</p>
                    `

                   // document.getElementById(countryFlag).appendChild(id="flags">src = ${countryInfo.flags.png})
                })
                /* <p id="flags">${countryInfo.flags.png}</p>
                <p id="googleMaps">${countryInfo.maps.googleMaps}</p>
                <p id="openStreetMaps">${countryInfo.maps.openStreetMaps}</p> */
            .catch((error) => console.error(error));
        })
    };
    
// document.getElementById("countriesButtons").appendChild(`${result}`);
};

let btn = document.querySelector("#search");
btn.addEventListener("click", function () {
  getRandomElements(allCountriesNames, 3);
});

document.getElementById("storeCountry").addEventListener("click", function () {
  if (selectedCountry != null && selectedCountry != undefined) {
    console.log(selectedCountry);
    let previousCountry = localStorage.getItem("selectedCountry");
    if (previousCountry == null) {
      previousCountry = [];
    } else {
      previousCountry = JSON.parse(previousCountry);
    }
    previousCountry.push(JSON.stringify(selectedCountry));
    localStorage.setItem("selectedCountry", JSON.stringify(previousCountry));

    alert(`"${selectedCountry.name.common}" has been stored in local storage.`);
  } else {
    alert("Please select a country first.");
  }
});
