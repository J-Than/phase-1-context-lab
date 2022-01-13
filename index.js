function createEmployeeRecord(array) {
    const newEmployeeRecord = {
      'firstName': array[0],
      'familyName': array[1],
      'title': array[2],
      'payPerHour': array[3],
      'timeInEvents': [],
      'timeOutEvents': []
    }
    return newEmployeeRecord;
  };
  
  function createEmployeeRecords(nestedArray) {
    return nestedArray.map(createEmployeeRecord);
  }
  
  function createTimeInEvent(timeIn){
    const timeInObject = parseTime.call(timeIn, 'TimeIn');
    this.timeInEvents.push(timeInObject);
    return this;
  }
  
  function createTimeOutEvent(timeOut){
    const timeOutObject = parseTime.call(timeOut, 'TimeOut');
    this.timeOutEvents.push(timeOutObject);
    return this;
  }
  
  function parseTime(eventType) {
    const date = this.split(' ')[0];
    const hour = parseInt(this.split(' ')[1], 10);
    const parsedTime = {
      'type': eventType,
      'year': parseInt(date.split('-')[0]),
      'month': parseInt(date.split('-')[1]),
      'day': parseInt(date.split('-')[2]),
      'hour': hour,
      'date': date,
      'sort': this
    }
    return parsedTime
  }
  
  function hoursWorkedOnDate(date) {
    const inRecord = findDate.call(this, date);
    const outRecord = findDate.call(this, date);
    return (this.timeOutEvents[outRecord].hour - this.timeInEvents[inRecord].hour) / 100;
  }
  
  function findDate(date) {
    for (let i = 0; i < this.timeInEvents.length; i++) {
      if (this.timeInEvents[i].date === date) return i;
    }
    return null;
  }
  
  function wagesEarnedOnDate(date) {
    return this.payPerHour * hoursWorkedOnDate.call(this, date);
  }
  
  function allWagesFor() {
    let wageTotal = 0;
    for (let i = 0; i < this.timeInEvents.length; i++) {
      wageTotal = wageTotal + wagesEarnedOnDate.call(this, this.timeInEvents[i].date)
    }
    return wageTotal;
  }
  
  function calculatePayroll(employeeArray) {
    let payrollTotal = 0;
    for (let i = 0; i < employeeArray.length; i++) {
      payrollTotal = payrollTotal + allWagesFor.call(employeeArray[i]);
    }
    return payrollTotal;
  }

  function findEmployeeByFirstName(srcArray, firstName) {
    for (let i = 0; i < srcArray.length; i++) {
      if (srcArray[i].firstName === firstName) return srcArray[i];
    }
    return undefined;
  }
  
/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

// function allWagesFor() {
//     const eligibleDates = this.timeInEvents.map(function (e) {
//         return e.date
//     })

//     const payable = eligibleDates.reduce(function (memo, d) {
//         return memo + wagesEarnedOnDate.call(this, d)
//     }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

//     return payable
// }

cRecord = createEmployeeRecord(["Julius", "Caesar", "General", 27])
        // Earns 324
        createTimeInEvent.call(cRecord, "2044-03-14 0900")
        createTimeOutEvent.call(cRecord, "2044-03-14 2100")
        // Earns 54
        createTimeInEvent.call(cRecord, "2044-03-15 0900")
        createTimeOutEvent.call(cRecord, "2044-03-15 1100")
        // 324 + 54
        console.log(hoursWorkedOnDate.call(cRecord, "2044-03-14"))
        console.log(wagesEarnedOnDate.call(cRecord, "2044-03-14"))
        console.log(hoursWorkedOnDate.call(cRecord, "2044-03-15"))
        console.log(wagesEarnedOnDate.call(cRecord, "2044-03-15"))
        console.log(cRecord)
        console.log(allWagesFor.call(cRecord))