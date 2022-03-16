const API_KEY = "e6cc4e25-61dd-4dce-be3b-497780c72547";
const domain = "https://holidayapi.com/v1/";
const loadingSpin = `<div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>`;

// convert params to query string
const query = (params) =>
  "&" +
  Object.keys(params)
    .map(
      (key) => encodeURIComponent(key) + "=" + encodeURIComponent(params[key])
    )
    .join("&");

// get element
const getEle = (element) => document.querySelector(element);

// fetch data
const fetchDataFromAPI = async (API_KEY, domain, path, queryParams = "") => {
  try {
    const url = `${domain}${path}?pretty&key=${API_KEY}${queryParams}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

//render item in the list
const renderItem = async (pathUrl, eleList, queryParams) => {
  try {
    //check the list do render holidays
    const isHolidayList = pathUrl === "holidays";

    // Find the element with the id
    const itemList = getEle(eleList);

    // take out the `ul` element
    const indexUl = isHolidayList ? 1 : 2; //position of the node
    const ulItemList = itemList.children[indexUl];

    // set loading
    ulItemList.innerHTML = loadingSpin;

    //get data from API
    const result = await fetchDataFromAPI(
      API_KEY,
      domain,
      pathUrl,
      queryParams
    );
    const data = result[pathUrl];

    // remove loading
    ulItemList.innerHTML = "";

    // loop throught the list of countries
    const textHoliday = (item) => `${item.date} - ${item.weekday.date.name}`;
    const textList = (item) => `Code: ${item.code}`;

    data.forEach((item, index) => {
      const li = document.createElement("li");
      li.innerHTML = `<div class="bullet">${index + 1}</div>
        <div class="li-wrapper">
          <div class="li-title">${item.name}</div>
          <div class="li-text">${
            isHolidayList ? textHoliday(item) : textList(item)
          }</div>
        </div>`;
      ulItemList.appendChild(li);
    });
  } catch (error) {
    console.log(error);
  }
};

const renderList = (eleButton, eleList, pathUrl) => {
  const button = getEle(eleButton);
  button.addEventListener("click", (e) => {
    renderItem(pathUrl, eleList);
  });
};

const renderHolidaysList = (eleForm, eleList, pathUrl) => {
  //get element form
  const form = getEle(eleForm);

  // add submit event to form element
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    //default query params
    let params = {
      country: "VN",
      year: 2021,
    };

    // get data input in form
    let formData = new FormData(form);
    for (const [key, value] of formData) {
      if (value) params[key] = value;
    }

    if (pathUrl === "holidays") {
      if (validationForm(params)) {
        const queryParams = query(params);
        renderItem(pathUrl, eleList, queryParams);
      } else {
        return;
      }
    } else {
      renderItem(pathUrl, eleList);
    }
  });
};

renderHolidaysList("#form-holiday", "#holidays-list", "holidays");

renderList("#countries-list-btn", "#countries-list", "countries");

renderList("#languages-list-btn", "#languages-list", "languages");
