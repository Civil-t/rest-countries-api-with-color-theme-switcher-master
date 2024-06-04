/* Chaning theme to dark theme*/

const theme = document.getElementById("theme");
const navbar = document.getElementById("navbar");
const search = document.getElementById("search");
const filter = document.getElementById("filter");

theme.addEventListener("click", () => {
  document.body.style.backgroundColor = "#202D36";
  theme.style.color = "white";
  navbar.style.backgroundColor = "#2B3743";
  navbar.style.color = "white";
  search.style.backgroundColor = "#2B3743";
  search.style.color = "white";
  filter.style.backgroundColor = "#2B3743";
  filter.style.color = "white";

  let countryInfoChildren = document.querySelectorAll(
    ".country-info p, .country-info h3"
  );
  countryInfoChildren.forEach((child) => {
    child.style.color = "white";
  });
});

// fetching and using the Countries API in homepage
fetch("../data.json")
  .then((response) => response.json())
  .then((data) => {
    for (let i = 0; i < 8; i++) {
      const countryName = document.getElementById(`country-name${i + 1}`);
      const countryFlag = document.getElementById(`flag${i + 1}`);
      const countryPopulation = document.getElementById(`pop${i + 1}`);
      const countryRegion = document.getElementById(`reg${i + 1}`);
      const countryCapital = document.getElementById(`cap${i + 1}`);

      countryName.innerText = data[i].name;
      countryFlag.src = data[i].flags.png;
      countryPopulation.innerText = data[i].population;
      countryRegion.innerText = data[i].region;
      countryCapital.innerText = data[i].capital;
    }
  })
  .catch((error) => console.error("Error:", error));

// select country to view in detail functionality based on flag clicked

let countryCards = document.querySelectorAll(".flag");

for (let i = 0; i < countryCards.length; i++) {
  countryCards[i].addEventListener("click", function () {
    localStorage.setItem("flagSrc", countryCards[i].src);

    window.location.href = "../Components/detail.html";
  });
}

const flagSrc = localStorage.getItem("flagSrc");

fetch("../data.json")
  .then((response) => response.json())
  .then((data) => {
    const country = data.find((country) => country.flags.png === flagSrc);
    if (!country) return;

    const dtlFlag = document.getElementById("dtl-flag");
    const dtlCountryName = document.getElementById("dtl-country-name");
    const dtlNativeName = document.getElementById("dtl-native-name");
    const dtlPopulation = document.getElementById("dtl-pop");
    const dtlRegion = document.getElementById("dtl-reg");
    const dtlSubRegion = document.getElementById("dtl-subreg");
    const dtlCapital = document.getElementById("dtl-cap");
    const dtlTopLevelDomain = document.getElementById("dtl-tld");
    const dtlCurrencies = document.getElementById("dtl-currencies");
    const dtlLanguages = document.getElementById("dtl-languages");
    const dtlBorder1 = document.getElementById("border-countries-btn1");
    const dtlBorder2 = document.getElementById("border-countries-btn2");
    const dtlBorder3 = document.getElementById("border-countries-btn3");

    dtlFlag.src = country.flags.png;
    dtlCountryName.innerText = country.name;
    dtlNativeName.innerText = country.nativeName;
    dtlPopulation.innerText = country.population;
    dtlRegion.innerText = country.region;
    dtlSubRegion.innerText = country.subregion;
    dtlCapital.innerText = country.capital;
    dtlTopLevelDomain.innerText = country.topLevelDomain;
    dtlCurrencies.innerText = country.currencies[0].name;
    dtlLanguages.innerText = country.languages[0].name;
    dtlBorder1.innerText = country.borders[0];
    dtlBorder2.innerText = country.borders[1];
    dtlBorder3.innerText = country.borders[2];
  });

const backBtn = document.getElementById("back-btn");

backBtn.addEventListener("click", () => {
  window.location.href = "../Components/index.html";
});

// filter functionality
filter.addEventListener("click", (event) => {
  const filter = event.target.value;

  fetch("../data.json")
    .then((response) => response.json())
    .then((data) => {
      const filteredData = data.filter((country) => country.region === filter);

      for (let i = 0; i < filteredData.length && i < 8; i++) {
        const countryName = document.getElementById(`country-name${i + 1}`);
        const countryFlag = document.getElementById(`flag${i + 1}`);
        const countryPopulation = document.getElementById(`pop${i + 1}`);
        const countryRegion = document.getElementById(`reg${i + 1}`);
        const countryCapital = document.getElementById(`cap${i + 1}`);

        countryName.innerText = filteredData[i].name;
        countryFlag.src = filteredData[i].flags.png;
        countryPopulation.innerText = filteredData[i].population;
        countryRegion.innerText = filteredData[i].region;
        countryCapital.innerText = filteredData[i].capital;
      }
    })
    .catch((error) => console.error("Error:", error));
});

// back button functionality
