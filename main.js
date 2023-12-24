const submit = document.getElementById("submit");
const day = document.getElementById("day");
const month = document.getElementById("month");
const year = document.getElementById("year");
const repeat = document.getElementById("repeat");
let currentDate = new Date();

window.onload = () => day.focus();
submit.onclick = () => checkDate();
day.onkeyup = () => checkDays();
month.onkeyup = () => checkMonth();
year.onkeyup = () => checkYear();
repeat.onclick = () => repeatAll();

day.addEventListener("keyup", (e) => { if (e.key === "Enter") month.focus(); });
month.addEventListener("keyup", (e) => { if (e.key === "Enter") year.focus(); });
year.addEventListener("keyup", (e) => { if (e.key === "Enter") checkDate(); });

function checkDate() {
  checkDays();
  checkMonth();
  checkYear();
  if (checkDays() != false && checkMonth() != false && checkYear() != false) {
    setTimeout(() => {
      repeat.classList.add("show");
    }, 1500);
    let birthDate = new Date(`${checkYear()}/${checkMonth()}/${checkDays()}`);
    calculetAndDisplayTheAge(birthDate);
  }
}

function calculetAndDisplayTheAge(dat) {
  let dif = new Date(currentDate - dat);
  fromZeroToValue(document.querySelector(".age.year"), dif.getFullYear() - 1970);
  fromZeroToValue(document.querySelector(".age.month"), dif.getMonth());
  fromZeroToValue(document.querySelector(".age.day"), dif.getDate() - 1);
}

function fromZeroToValue(ele, value) {
  let newValue = 0;
  let stop = setInterval(() => {
    ele.textContent = newValue++;
    if (newValue > value) clearInterval(stop);
  }, 500 / value);
}


function makeError(ele, message) {
  let parent = ele.parentElement;
  parent.classList.add("error");
  parent.querySelector("small").textContent = message;
}

function removeError(ele) {
  let parent = ele.parentElement;
  parent.classList.remove("error");
}

function checkDays() {
  let dayValue = day.value.trim();
  if (dayValue === "") {
    makeError(day, "This field is required");
    return false;
  }
  else if (!/^[0-9]{1,2}$/.test(dayValue)) {
    makeError(day, "Must be a valid day");
    return false;
  } else {
    if (+dayValue > 31) {
      makeError(day, "Must be a valid day");
      return false;
    } else {
      removeError(day);
      if (dayValue.toString().length === 2) month.focus();
    }
  }
  return dayValue;
}

function checkMonth() {
  let monthValue = month.value.trim();
  if (monthValue === "") {
    makeError(month, "This field is required");
    return false;
  }
  else if (!/^[0-9]{1,2}$/.test(monthValue)) {
    makeError(month, "Must be a valid month");
    return false;
  } else {
    if (+monthValue > 12) {
      makeError(month, "Must be a valid month");
      return false;
    } else {
      removeError(month);
      if (monthValue.toString().length === 2) year.focus();
    }
  }
  return monthValue;
}

function checkYear() {
  let yearValue = year.value.trim();
  if (yearValue === "") {
    makeError(year, "This field is required");
    return false;
  } else if (!/^[0-9]{4}$/.test(yearValue)) {
    makeError(year, "Must be a valid year");
    return false;
  } else {
    let currentYear = currentDate.getFullYear();
    if (yearValue > currentYear) {
      makeError(year, "Must be in the past");
      return false;
    } else {
      removeError(year);
    }
  }
  return yearValue;
}


function repeatAll() {
  let inputs = document.querySelectorAll("input");
  let ages = document.querySelectorAll(".age");
  ages.forEach(age => age.textContent = "- -");
  inputs.forEach(input => input.value = "");
  repeat.classList.remove("show");
}