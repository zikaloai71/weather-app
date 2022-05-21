let cityInput = document.getElementById("city");
let submitCity = document.getElementById("submit-city");
let body = document.getElementsByTagName('body')[0];
let infoCard = document.getElementById('info-card');
submitCity.addEventListener("click", (e) => {
  e.preventDefault();
 let city = cityInput.value.toUpperCase();
 getCity(city);
});

async function getCity(city) {
  try{
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&APPID=615d9a39960a08f8647ec3a42b7937fe`;
    let response = await fetch(url, { mode: "cors" });
    let data = await response.json();
    showInfo(data.name,data.weather[0].main,data.weather[0].description,data.main.temp);
    getGif(data.weather[0].main);
  }
  catch(err){
    console.log(err);
  }
}

 async function getGif(weather) {
   try{
  let url =`https://api.giphy.com/v1/gifs/translate?api_key=7kvlzxt0QQN9wkv5jJpiIDSmZfBTDeyb&s=${weather}`;
    let response = await fetch(url, { mode: "cors" });
    let data = await response.json();
    body.style.backgroundImage =`url(${data.data.images.original.url})`;
  }
  catch(err){
    console.log(err);
  }
}

function showInfo(cityName,weatherMain,weatherDescription,temp,sym='°F'){
  infoCard.innerHTML=`<h1>city you choose : ${cityName}</h1><h2>the weather is ${weatherMain}</h2><p>It's ${weatherDescription}</p><p id="degree">It's ${temp} ${sym}</p><button id='changeDegree'> change F to C </button>`
  infoCard.classList.remove('display-none');

  let toggleDegree=document.getElementById('changeDegree');
  let tempDegree=document.getElementById('degree');

  toggleDegree.addEventListener('click',()=>{
  if(tempDegree.innerText.includes('°F')){
    temp=fToC(temp);
    showInfo(cityName,weatherMain,weatherDescription,temp,"°C")
  }
  else{
    temp=cToF(temp);
    showInfo(cityName,weatherMain,weatherDescription,temp,"°F")
  }
  })
  
}

function cToF(celsius) 
{
  let cTemp = celsius;
  let cToFahr = cTemp * 9 / 5 + 32;
  cToFahr=Math.round(cToFahr);
  let message =  cToFahr ;
  return message;
}

function fToC(fahrenheit) 
{
  let fTemp = fahrenheit;
  let fToCel = (fTemp - 32) * 5 / 9;
  fToCel=Math.round(fToCel);
  let message = fToCel ;
  return message;
} 
