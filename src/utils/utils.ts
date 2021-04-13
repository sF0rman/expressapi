const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const isValidEmail = (email: string): boolean => {
  return emailRegex.test(email);
}

enum DateUnits {
  sec = 'ss',
  min = 'mm',
  hr = 'hh',
  day = 'DD',
  month = 'MM',
  year = 'YYYY'
}

const addToDate = (amount: number, type?: DateUnits): number => {
  switch (type) {
    case DateUnits.sec:
      return amount * 1000;
      break;
    case DateUnits.min:
      return amount * 60 * 1000;
      break;
    case DateUnits.hr:
      return amount * 60 * 60 * 1000;
      break;
    case DateUnits.day:
      return amount * 24 * 60 * 60 * 1000;
      break;
    case DateUnits.month:
      // This needs adjusting for irregular month lengths.
      return amount * 30 * 24 * 60 * 60 * 1000;
      break;
    case DateUnits.year:
      // This needs adjusting for irregular month lengths.
      return amount * 12 * 30 * 24 * 60 * 60 * 1000
      break;
    default:
      return amount;
  }
}

export {
  isValidEmail,
  addToDate,
  DateUnits
}