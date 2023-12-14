export const getMonthName = (monthNumber) => {
    const date = new Date();
    date.setMonth(monthNumber);
    return date.toLocaleString("default", { month: "long" });
  };
  
export const getMonthFromString = (mon) => {
    return new Date(Date.parse(mon + " 1, 2023")).getMonth();
  };
  
export const compareDates = (chartData, filterData, greater = true) => {
    const monthNumber = getMonthFromString(filterData.label.split(",")[0]);
    const year = filterData.label.split(",")[1];
    if (greater) {
      if (chartData.date.year > +year) {
        return true;
      }
      if (chartData.date.year < +year) {
        return false
      }
      if (chartData.date.month >= monthNumber) {
        return true;
      } else {
        return false;
      }
    } else {
      if (chartData.date.year < +year) {
        return true;
      }
      if (chartData.date.year > +year) {
        return false;
      }
      if (chartData.date.month <= monthNumber) {
        return true;
      } else {
        return false;
      }
    }
  };
  
export const filterDates = (chartItem, fromDate, toDate) => {
    if (!toDate && !fromDate) {
      return true;
    }
    if (!toDate && fromDate) {
      return compareDates(chartItem, fromDate);
    }
    if (toDate && !fromDate) {
      return compareDates(chartItem, toDate, false);
    }
    if (toDate && fromDate) {
      return (
        compareDates(chartItem, fromDate) &&
        compareDates(chartItem, toDate, false)
      );
    }
  };