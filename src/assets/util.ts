export function makeId(length = 6) {
  var txt = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return txt;
}

export function getRandomIntInclusive(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}

export function delay(ms = 1500) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export function getDate(date: Date | undefined) {
  if (date) {
    const yyyy: number = date.getFullYear();
    let MM: number | string = date.getMonth() + 1;
    let dd: number | string = date.getDate();
    if (dd < 10) {
      dd = "0" + dd;
    }

    if (MM < 10) {
      MM = "0" + MM;
    }

    return `${dd}/${MM}/${yyyy}`;
  }
}

export function hasNonEmptyValues(
  object: Dictionary,
  fidesToIgnore?: string[]
): boolean {
  for (const key in object) {
    if (typeof object[key] !== "object") {
      if (fidesToIgnore && fidesToIgnore.includes(key)) {
        continue;
      }
      if (
        typeof object[key] === "string" &&
        object[key] !== "" &&
        object[key] !== "-"
      ) {
        continue;
      } else if (typeof object[key] === "number" && object[key] !== 0) {
        continue;
      } else {
        return false;
      }
    } else {
      const nestedObjectNotEmpty = hasNonEmptyValues(
        object[key],
        fidesToIgnore
      );
      if (!nestedObjectNotEmpty) {
        return false;
      }
    }
  }
  return true;
}

export function stringToColor(string: string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

export function stringAvatar(name: string) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(" ")[0][0].toUpperCase()}${name
      .split(" ")[1][0]
      .toUpperCase()}`,
  };
}

export function getTimeParameters(param: string): any {
  const currentYear = new Date().getFullYear();

  if (param === "day") {
    return Array.from({ length: 31 }, (_, i) => i + 1);
  } else if (param === "month") {
    return Array.from({ length: 12 }, (_, i) => i + 1);
  } else if (param === "year") {
    return Array.from(
      { length: currentYear - 1969 },
      (_, i) => currentYear - i
    );
  }
}

export function getMonthName(monthNumber: number): string {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return monthNames[monthNumber - 1];
}

export function splitCamelCaseToSnakeCase(input: string) {
  const result = input
    .replace(/([a-z])([A-Z])/g, "$1_$2") // Insert an underscore between lowercase and uppercase letters
    .replace(/\b\w/g, (char) => char.toUpperCase())
    .split("_")
    .join(" "); // Capitalize the first letter of each word
  return result;
}

export function getDateToObject(date: Date | undefined) {
  if (date) {
    const yyyy: number = date.getFullYear();
    let MM: number | string = date.getMonth() + 1;
    let dd: number | string = date.getDate();
    return {day : dd , month :MM , year : yyyy };
  }
}

// NA - North America
// AS - Asia
// EU - Europe
// AF - Africa
// SA - Soth America
