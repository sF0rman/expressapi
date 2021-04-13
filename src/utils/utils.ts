const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const UUIDRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

const isValidEmail = (email: string): boolean => {
  return emailRegex.test(email);
}

const isValidUUID = (uuid: string): boolean => {
  return UUIDRegex.test(uuid);
}

const okResponse = (data: Array<object> | object): object => {
  let totalRows = 1;
  if(Array.isArray(data)) {
    totalRows = data.length;
  } else if((Object.keys(data).length < 1)) {
    // In the case we logout or return no data, set totalRows 0.
    totalRows = 0;
  }

  return {
    success: true,
    data,
    totalRows
  }
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
  isValidUUID,
  okResponse,
  addToDate,
  DateUnits
}