import "./App.css";
import { useState } from "react";

import twitterLogo from "./images/brand-logos/logo-twitter.svg";
import githubLogo from "./images/brand-logos/logo-github.svg";
import linkedinLogo from "./images/brand-logos/logo-linkedin.svg";
import mailLogo from "./images/brand-logos/mail.svg";
import angelLogo from "./images/brand-logos/angel-icon.svg";

function App() {
  const [bdayInput, setBdayInput] = useState("");
  const [output, setOutput] = useState("");
  const [textColor, setTextColor] = useState("#17a2b8");

  function isPalindrome(str) {
    const reverseStr = str.split("").reverse().join("");
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
    const dateStr = dateToString(date);
    const { day, month, year } = dateStr;
    let ddmmyyyy = day + month + year;
    let mmddyyyy = month + day + year;
    let yyyymmdd = year + month + day;
    let ddmmyy = day + month + year.slice(-2);
    let mmddyy = month + day + year.slice(-2);
    let yyddmm = year.slice(-2) + day + month;

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
  function getPrevDate(date) {
    let day = date.day - 1;
    let month = date.month;
    let year = date.year;

    const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (day === 0) {
      month--;

      if (month === 0) {
        month = 12;
        day = 31;
        year--;
      } else if (month === 2) {
        if (isLeapYear(year)) {
          day = 29;
        } else {
          day = 28;
        }
      } else {
        day = daysInMonth[month - 1];
      }
    }

    return {
      day: day,
      month: month,
      year: year,
    };
  }

  function getNextPalindromeDate(date) {
    let nextDate = getNextDate(date);
    let count = 0;
    while (1) {
      count++;
      const isPalindrome = checkPalindromeForAllDateFormats(nextDate);
      if (isPalindrome) {
        break;
      } else {
        nextDate = getNextDate(nextDate);
      }
    }

    return [count, nextDate];
  }
  function getPrevPalindromeDate(date) {
    let prevDate = getPrevDate(date);
    let count = 0;
    while (1) {
      count++;
      const isPalindrome = checkPalindromeForAllDateFormats(prevDate);
      if (isPalindrome) {
        break;
      } else {
        prevDate = getPrevDate(prevDate);
      }
    }

    return [count, prevDate];
  }

  // const date = { day: 11, month: 2, year: 2020 };

  // console.log("output: ", getPrevPalindromeDate(date));

  function getDate(date) {
    const dateArray = date.split("-");
    return {
      day: Number(dateArray[2]),
      month: Number(dateArray[1]),
      year: Number(dateArray[0]),
    };
  }

  function handleInput(e) {
    setBdayInput(e.target.value);
    setOutput("");
    setTextColor("");
  }

  function handleSubmit() {
    setTextColor("");
    if (bdayInput !== "") {
      let date = getDate(bdayInput);
      let dateStr = dateToString(date);
      let isPalindrome = checkPalindromeForAllDateFormats(dateStr);

      if (!isPalindrome) {
        const [countN, nextDate] = getNextPalindromeDate(date);
        const [countP, prevDate] = getPrevPalindromeDate(date);

        if (countN < countP) {
          setOutput(
            `Not a Palindrome. The nearest palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}, you missed by ${countN} days.`
          );
          setTextColor("#dc3545");
        } else {
          setOutput(
            `Not a Palindrome. The nearest palindrome date is ${prevDate.day}-${prevDate.month}-${prevDate.year}, you missed by ${countP} days.`
          );
          setTextColor("#dc3545");
        }
      } else {
        setOutput("Yay! Your birthday is palindrome!");
        setTextColor("#28a745");
      }
    } else {
      setOutput("Enter date to see the magic!");
    }
  }

  function handleReset() {
    setBdayInput("");
    setOutput("");
    setTextColor("");
  }

  return (
    <div className="App">
      <h1>Is your birthday Palindrome?</h1>
      <main>
        <input type="date" onChange={handleInput} value={bdayInput} />
        <button onClick={handleSubmit}>Show</button>
        <button
          style={{
            backgroundColor: "#dc3545",
            color: "white",
            borderColor: "#dc3545",
          }}
          onClick={handleReset}>
          Reset
        </button>
      </main>
      <div className="output" style={{ color: textColor }}>
        {output}
      </div>
      <footer className="footer">
        <div className="footer-header">
          © | 2022 |{" "}
          <a
            className="link"
            href="http://ankit-sharma15.netlify.app"
            target={"_blank"}>
            Ankit Sharma
          </a>{" "}
        </div>
        <ul className="list-non-bullet link-social">
          <li className="list-item-inline">
            <a
              className="link"
              href="https://twitter.com/ankit1595"
              target="_blank">
              <img src={twitterLogo} alt="twitter-logo" />
            </a>
          </li>
          <li className="list-item-inline">
            <a
              className="link"
              href="https://github.com/ankit1595"
              target="_blank">
              <img src={githubLogo} alt="github-logo" />
            </a>
          </li>
          <li className="list-item-inline">
            <a
              className="link"
              href="https://www.linkedin.com/in/ankit1595"
              target="_blank">
              <img src={linkedinLogo} alt="linkedin-logo" />
            </a>
          </li>
          <li className="list-item-inline">
            <a
              className="link"
              href="mailto:ankit.95sharma@gmail.com"
              target="_blank">
              <img src={mailLogo} alt="mail-logo" />
            </a>
          </li>
          <li className="list-item-inline">
            <a
              className="link"
              href="https://www.angel.co/u/ankit1595"
              target="_blank">
              <img src={angelLogo} alt="angel-logo" />
            </a>
          </li>
        </ul>
      </footer>
    </div>
  );
}

export default App;
