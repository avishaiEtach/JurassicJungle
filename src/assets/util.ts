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
    return { day: dd, month: MM, year: yyyy };
  }
}

export function compareObjects(
  obj1: { [key: string]: any },
  obj2: { [key: string]: any },
  ignoreFields: string[] = []
): Dictionary {
  const changes: Dictionary = {};
  const isISODateString = (value: any): boolean => {
    return (
      typeof value === "string" &&
      /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/.test(value)
    );
  };

  // Helper function to convert ISO date string to "dd/mm/yyyy" format
  const isoToDate = (isoString: string): string => {
    const date = new Date(isoString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Check for added or modified fields
  for (const key in obj1) {
    if (ignoreFields.includes(key)) {
      continue;
    }

    if (!(key in obj2)) {
      changes[key] = null; // or undefined, depending on your preference for indicating removal
    } else if (isISODateString(obj1[key]) && isISODateString(obj2[key])) {
      const formattedObj1Date = isoToDate(obj1[key]);
      const formattedObj2Date = isoToDate(obj2[key]);
      if (formattedObj1Date !== formattedObj2Date) {
        changes[key] = formattedObj2Date;
      }
    } else if (obj1[key] !== obj2[key]) {
      changes[key] = obj2[key];
    }
  }

  return changes;
}

export function parseDate(dateString: string) {
  // Split the date string by "/"
  const parts = dateString.split("/");

  // Ensure we have exactly three parts: day, month, year
  if (parts.length !== 3) {
    throw new Error('Invalid date format. Expected "dd/mm/yyyy".');
  }

  // Extract day, month, and year from parts
  const day = parseInt(parts[0], 10); // Parse day as integer
  const month = parseInt(parts[1], 10) - 1; // Parse month as integer (subtract 1 because months are zero-indexed in JavaScript)
  const year = parseInt(parts[2], 10); // Parse year as integer

  // Create a new Date object
  const date = new Date(year, month, day);

  // Validate the created Date object
  if (isNaN(date.getTime())) {
    throw new Error("Invalid date.");
  }

  return date.toISOString();
}

export function extractSections(articleStr: string): {
  sections: { header: string; paragraphs?: string[]; list?: string[] }[];
  mainHeader: string;
} {
  // Define the regex pattern to match the main header
  const mainHeaderPattern = /<h1>(.*?)<\/h1>/s;
  const mainHeaderMatch = articleStr.match(mainHeaderPattern);
  const mainHeader = mainHeaderMatch ? mainHeaderMatch[1].trim() : "";

  // Define the regex pattern to match each section
  const sectionPattern = /<section>(.*?)<\/section>/gs;
  const headerPattern = /<h2>(.*?)<\/h2>/s;
  const paragraphPattern = /<p>(.*?)<\/p>/gs;
  const listItemPattern = /<li>(.*?)<\/li>/gs;

  // Use match to get all section matches
  const sectionMatches = articleStr.match(sectionPattern);

  // If there are no matches, return an empty array
  const sections = sectionMatches
    ? sectionMatches.map((section) => {
        // Extract the header
        const headerMatch = section.match(headerPattern);
        const header = headerMatch ? headerMatch[1].trim() : "";

        // Extract all paragraphs
        const paragraphMatches = section.match(paragraphPattern);
        const paragraphs = paragraphMatches
          ? paragraphMatches.map((p) => p.replace(/<\/?p>/g, "").trim())
          : [];

        // Extract all list items if paragraphs are empty
        const listItemMatches = section.match(listItemPattern);
        const list =
          !paragraphMatches && listItemMatches
            ? listItemMatches.map((li) => li.replace(/<\/?li>/g, "").trim())
            : [];

        // Create section object
        const sectionObj: {
          header: string;
          paragraphs?: string[];
          list?: string[];
        } = { header };
        if (paragraphs.length > 0) {
          sectionObj.paragraphs = paragraphs;
        } else if (list.length > 0) {
          sectionObj.list = list;
        }

        return sectionObj;
      })
    : [];

  // Return the formatted result
  return { sections, mainHeader };
}

// NA - North America
// AS - Asia
// EU - Europe
// AF - Africa
// SA - Soth America
