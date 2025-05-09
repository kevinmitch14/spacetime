export default {
  "main": {
    "goto": {
      "doc": "move to a new timezone, but at this same moment. Accepts an IANA code or abbreviation",
      "out": "clone"
    },
    "clone": {
      "doc": "make a copy of this object, with no references to the original",
      "out": "clone"
    },
    "timezone": {
      "doc": "return a bunch of meta-data about your current timezone",
      "out": "Object"
    },
    "format": {
      "doc": "output nicely-formatted strings",
      "out": "String/Object"
    },
    "startOf": {
      "doc": "move to the first millisecond of the day, week, month, year, etc.",
      "out": "clone"
    },
    "endOf": {
      "doc": "move to the last millisecond of the day, week, month, year, etc.",
      "out": "clone"
    },
    "add": {
      "doc": "increment the time by a number and unit - like an hour, minute, day, or year",
      "out": "clone"
    },
    "subtract": {
      "doc": "decrease the time by a number and unit - like an hour, minute, day, or year",
      "out": "clone"
    },
    "next": {
      "doc": "go to the beginning of the next unit",
      "out": "clone"
    },
    "last": {
      "doc": "go to the beginning of the previous unit",
      "out": "clone"
    },
    "nearest": {
      "doc": "move forward/backward to the closest unit",
      "out": "clone"
    },
    "every": {
      "doc": "list all dates up to a certain time",
      "out": "clone"
    },
    "isAfter": {
      "doc": "pass-in a spacetime object or date input and see if it takes-place after your spacetime date/time",
      "out": "Boolean"
    },
    "isBefore": {
      "doc": "pass-in a spacetime object or date input and see if it takes-place before your spacetime date/time",
      "out": "Boolean"
    },
    "isEqual": {
      "doc": "is this date on the exact same millisecond as another",
      "out": "Boolean"
    },
    "isSame": {
      "doc": " detect if two date/times are the same day, week, or year, etc",
      "out": "Boolean"
    },
    "diff": {
      "doc": "given a date amd a unit, count how many of them you'd need to make the dates equal",
      "out": "Number"
    }
  },
  "getters": {
    "millisecond": {
      "doc": "set or return the current number of milliseconds (0-999)",
      "out": "clone/Number"
    },
    "second": {
      "doc": "set or return the current number of seconds (0-59)",
      "out": "clone/Number"
    },
    "minute": {
      "doc": "set or return the current number of minutes (0-59)",
      "out": "clone/Number"
    },
    "hour": {
      "doc": "set or return the current hour, in 24 time (0-23). also accepts/parses '3pm'",
      "out": "clone/Number"
    },
    "date": {
      "doc": "set or return the day-number of the month (1- max31)",
      "out": "clone/Number"
    },
    "month": {
      "doc": "set or return the zero-based month-number (0-11). Also accepts 'June', or 'oct'.",
      "out": "clone/Number"
    },
    "year": {
      "doc": "set or return the 4-digit year as an integer",
      "out": "clone/Number"
    },
    "dayOfYear": {
      "doc": "set or return the day of the year (1-366). Jan 1st is 1, Dec 31st is 366.",
      "out": "clone/Number"
    },
    "time": {
      "doc": "set or return a formatted, 12-hour time, like '11:30pm'",
      "out": "clone/Number"
    },
    "week": {
      "doc": "set or return the week-number of the year (1-52).",
      "out": "clone/Number"
    },
    "quarter": {
      "doc": "set or return the fiscal-quarter (1-4)",
      "out": "clone/Number"
    },
    "season": {
      "doc": "set or return the name of the season, spring/summer/fall/autumn/winter",
      "out": "clone/String"
    },
    "hourFloat": {
      "doc": "set or return the hour + minute in decimal form, so '3:30am' is 3.5",
      "out": "clone/Number"
    },
    "day": {
      "doc": "set or return the day of the week as an integer, starting on sunday (day-0). Also accepts names like 'wednesday', or 'thurs'",
      "out": "clone/Number"
    },
    "ampm": {
      "doc": "set or return whether the time is am or pm",
      "out": "clone/String"
    },
    "epochSeconds": {
      "doc": "set or return the time in seconds since jan 1 1970",
      "out": "clone/Number"
    },
    "dayTime": {
      "doc": "set or return the general time-of-day, like 'afternoon'",
      "out": "clone/String"
    },
    "monthName": {
      "doc": "set or return the current month as a string, like 'april'",
      "out": "clone/String"
    }
  },
  "utils": {
    "set": {
      "doc": "change to a new date. ",
      "out": "clone"
    },
    "isValid": {
      "doc": "does this time exist on the gregorian/javascript calendar?",
      "out": "clone"
    },
    "log": {
      "doc": "pretty-print the date to the console, for nicer debugging",
      "out": "clone"
    },
    "progress": {
      "doc": "Between 0-1, how far the moment lands between the start and end of the day/week/month/year.",
      "out": "Object"
    },
    "leapYear": {
      "doc": "is the current year a leap year?",
      "out": "Boolean"
    },
    "inDST": {
      "doc": "is daylight-savings-time activated right now, for this timezone?",
      "out": "Boolean"
    },
    "hasDST": {
      "doc": "does this timezone ever use daylight-savings",
      "out": "Boolean"
    },
    "offset": {
      "doc": "the current, DST-aware time-difference from UTC, in hours",
      "out": "Number"
    },
    "isAsleep": {
      "doc": "checks if the current time is between 10pm and 8am",
      "out": "Boolean"
    },
    "i18n": {
      "doc": "changes the names of months and days",
      "out": "clone"
    },
    "weekStart": {
      "doc": "change the starting of the week (default is monday)",
      "out": "clone"
    },
    "daysInMonth": {
      "doc": "returns the amount of days the current month has (December => 31, June => 30, ...)",
      "out": "Number"
    }
  }
}
