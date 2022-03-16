const ISO_3166_ALPHA_2 =
  "^(A(D|E|F|G|I|L|M|N|O|R|S|T|Q|U|W|X|Z)|B(A|B|D|E|F|G|H|I|J|L|M|N|O|R|S|T|V|W|Y|Z)|C(A|C|D|F|G|H|I|K|L|M|N|O|R|U|V|X|Y|Z)|D(E|J|K|M|O|Z)|E(C|E|G|H|R|S|T)|F(I|J|K|M|O|R)|G(A|B|D|E|F|G|H|I|L|M|N|P|Q|R|S|T|U|W|Y)|H(K|M|N|R|T|U)|I(D|E|Q|L|M|N|O|R|S|T)|J(E|M|O|P)|K(E|G|H|I|M|N|P|R|W|Y|Z)|L(A|B|C|I|K|R|S|T|U|V|Y)|M(A|C|D|E|F|G|H|K|L|M|N|O|Q|P|R|S|T|U|V|W|X|Y|Z)|N(A|C|E|F|G|I|L|O|P|R|U|Z)|OM|P(A|E|F|G|H|K|L|M|N|R|S|T|W|Y)|QA|R(E|O|S|U|W)|S(A|B|C|D|E|G|H|I|J|K|L|M|N|O|R|T|V|Y|Z)|T(C|D|F|G|H|J|K|L|M|N|O|R|T|V|W|Z)|U(A|G|M|S|Y|Z)|V(A|C|E|G|I|N|U)|W(F|S)|Y(E|T)|Z(A|M|W))";
const ISO_639_1 = "[a-z]{2}|[A-Z]{2}";

function validationForm(formValues) {
  const { search, country, year, month, day, language } = formValues;
  let isValid = true;

  // validate the length of search
  if (search) {
    if (search?.trim().length < 5) {
      isValid = false;
      alert("Search holidays by name. Minimum 5 characters.");
    }
  }

  //validate the country
  if (country) {
    const regexISO_3166_A_2 = new RegExp(ISO_3166_ALPHA_2, "i");
    if (!regexISO_3166_A_2.test(country)) {
      isValid = false;
      alert("For countries, ISO 3166-1 alpha-2 format");
    }
  }

  // validate the year
  if (year) {
    const regex = new RegExp("\\d{4}");
    if (!regex.test(year)) {
      isValid = false;
      alert("The year should be an integer with 4 digits");
    }
  }

  // validate the month
  if (month) {
    const regex = new RegExp("^([1-9]|1[0-2])");
    if (!regex.test(month)) {
      isValid = false;
      alert("The month should be an integer between 1 and 12");
    }
  }
  // validate the day
  if (day) {
    if (!month) {
      isValid = false;
      alert("Day goes with month. Please input the month!");
    } else {
      const dayInMonth = new Date(year, month, 0).getDate();
      if (day > dayInMonth || day < 1) {
        isValid = false;
        alert(
          `Date of the month of  ${month}/${year} should be between 1 and ${dayInMonth}`
        );
      }
    }
  }

  // validate the language
  if (language) {
    const regex = new RegExp(ISO_639_1);
    if (!regex.test(language)) {
      isValid = false;
      alert("The language should be a string with 2 characters");
    }
  }
  return isValid;
}
