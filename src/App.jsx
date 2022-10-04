import "./App.css";
import { useState } from "react";

function App() {
  const [bdayInput, setBdayInput] = useState("");

  function isPalindrome(str) {
    const reverseStr = str.split("").reverse().join("");
    console.log("reverse", reverseStr);
    return str === reverseStr;
  }

  function dateToString(date) {
    const { day, month, year } = date;
    const dateStr = { day: "", month: "", year: "" };
    if (day < 10) {
      dateStr.day = "0" + day;
    } else {
      dateStr.day = day.toString();
    }
    if (month < 10) {
      dateStr.month = "0" + month;
    } else {
      dateStr.month = month.toString();
    }

    dateStr.year = year.toString();

    return dateStr;
  }

  function getDateInAllFormats(date) {
    const { day, month, year } = date;
    var ddmmyyyy = day + month + year;
    var mmddyyyy = month + day + year;
    var yyyymmdd = year + month + day;
    var ddmmyy = day + month + year.slice(-2);
    var mmddyy = month + day + year.slice(-2);
    var yyddmm = year.slice(-2) + day + month;

    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yyddmm];
  }

  function checkPalindromeForAllDateFormats(date) {
    const dateInAllFormats = getDateInAllFormats(date);
    for (let i = 0; i < dateInAllFormats.length; i++) {
      if (isPalindrome(dateInAllFormats[i])) {
        return true;
      }
    }
    return false;
  }

  function isLeapYear(year) {
    if (year % 400 === 0 || year % 4 === 0) {
      return true;
    }
    if (year % 100 === 0) {
      return false;
    }
    return false;
  }

  function getNextDate(date) {
    let day = date.day + 1;
    let month = date.month;
    let year = date.year;

    const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (month === 2) {
      if (isLeapYear(year)) {
        if (day > 29) {
          day = 1;
          month = 3;
        }
      } else {
        if (day > 28) {
          day = 1;
          month = 3;
        }
      }
    } else {
      if (day > daysInMonth[month - 1]) {
        day = 1;
        month++;
      }
    }

    if (month > 12) {
      month = 1;
      year++;
    }

    return { day, month, year };
  }

  const date = { day: 29, month: 2, year: 2021 };

  console.log("output: ", getNextDate(date));

  function getDate(date) {
    const dateArray = date.split("-");
    console.log(dateArray);
    return {
      day: dateArray[2],
      month: dateArray[1],
      year: dateArray[0],
    };
  }

  function handleInput(e) {
    setBdayInput(e.target.value);
    // getDate(inputDate);
  }

  return (
    <div className="App">
      <h1>Is your birthday Palindrome?</h1>
      <input type="date" onChange={handleInput} />
    </div>
  );
}

export default App;
