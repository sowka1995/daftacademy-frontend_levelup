export default class Clock {
  * seconds(initialSecond) {
    let second = initialSecond;
    while (true) {
      second++;
      if (second === 60) {
        second = 0;
      }
      yield second;
    }
  }

  * minutes(initialMinute) {
    let minute = initialMinute;
    while (true) {
      minute++;
      if (minute === 60) {
        minute = 0;
      }
      yield minute;
    }
  }

  * hours(initialHour) {
    let hour = initialHour;
    while (true) {
      hour++;
      if (this.clockFormat === 24 && hour === 24) {
        hour = 0;
      } else if (this.clockFormat === 12 && hour === 13) {
        hour = 1;
      }
      yield hour;
    }
  }

  constructor(clockFormat = 24, startDate = new Date()) {
    this._onChange = [];
    if (clockFormat !== 12 && clockFormat !== 24) throw new Error("Clock format should be 12 or 24.");
    this.clockFormat = clockFormat;
    this.second = startDate.getSeconds();
    this.minute = startDate.getMinutes();
    this.hour = this.getHourInClockFormat(startDate.getHours(), this.clockFormat);
    this.secondsGenerator = this.seconds(this.second);
    this.minutesGenerator = this.minutes(this.minute);
    this.hoursGenerator = this.hours(this.hour);

  }

  start() {
    setInterval(() => this.next(), 1000);
  }

  addOnChange(func) {
    this._onChange.push(func);
  }

  getClockEventData() {
    return {
      seconds: this.format(this.second),
      minutes: this.format(this.minute),
      hours: this.format(this.hour)
    }
  }

  fireOnChange() {
    const clockEventData = this.getClockEventData();   
    for (let i = 0; i < this._onChange.length; i++) {
      const func = this._onChange[i];
      if (func) {
        func(clockEventData);
      }
    }
  }
  
  next() {
    this.second = this.secondsGenerator.next().value;
    if (this.second === 0) {
      this.minute = this.minutesGenerator.next().value;
    }
    if (this.second === 0 && this.minute === 0) {
      this.hour = this.hoursGenerator.next().value;
    }
    this.fireOnChange();
  }
  
  format(val) {
    return val.toString().padStart(2, '0');
  }
  
  getHourInClockFormat(hour, clockFormat) {
    if (clockFormat === 12) {
      hour = hour % 12;
      hour = hour === 0 ? 12 : hour;
    }
    return hour;
  }
  
}