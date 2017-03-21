/**
 *  日期处理工具类
 *
 */

class DateUtil {

    constructor() {

    }

    getToday() {
        let date = new Date().getTime();
        return this.formatDate(date);
    }

    getEndDate() {
        let date = new Date();
        date.setDate(date.getDate() + 4);
        return this.formatDate(date.getTime());
    }

    // 格式化日期输出
    formatDate(dateObj) {
        let date = new Date(dateObj);
        let month = date.getMonth() + 1;
        if (month < 10) {
            month = '0' + month;
        }
        let _date = date.getDate();
        if(_date < 10) {
            _date = '0'+ _date;
        }
        let day = date.getDay();
        let week = '';
        switch (day) {
            case 0:
                week = ' 星期天';
                break;
            case 1:
                week = ' 星期一';
                break;
            case 2:
                week = ' 星期二';
                break;
            case 3:
                week = ' 星期三';
                break;
            case 4:
                week = ' 星期四';
                break;
            case 5:
                week = ' 星期五';
                break;
            case 6:
                week = ' 星期六';
                break;
            default :
                break;
        }
        return {
            getTime: date.getTime(),
            onlyDate: date.getFullYear() + '-' + month + '-' + _date,
            dateWithWeek: date.getFullYear() + '-' + month + '-' + _date + week
        }
    }

    getCurYear() {
        return new Date().getFullYear();
    }

    getCurMonth() {
        return new Date().getMonth();
    }

    getCurDate() {
        return new Date().getDate();
    }

    // 获取当前时间（毫秒）
    getNow() {
        let date = new Date();
        return date.getTime();
    }

    // 加一天
    addOneDay(dateObj) {
        let date = this.setTimeFrom0Hour(dateObj);
        date.setDate(date.getDate()+1);

        return this.formatDate(date.getTime());
    }

    // 减一天
    decreaseOneDay(dateObj) {
        let date = this.setTimeFrom0Hour(dateObj);
        date.setDate(date.getDate()-1);

        return this.formatDate(date.getTime());
    }

    setTimeFrom0Hour(dateObj) {
        let date = new Date(dateObj);
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        date.setMilliseconds(0);

        return date;
    }

    isToday(dateObj) {
        let paramDate = new Date(dateObj);
        let curYear = this.getCurYear();
        let curMonth = this.getCurMonth();
        let curDate = this.getCurDate();
        let pYear = paramDate.getFullYear();
        let pMonth = paramDate.getMonth();
        let pDate = paramDate.getDate();
        if(curYear === pYear && curMonth === pMonth && curDate === pDate) {
            return true;
        }
        return false;
    }
}

module.exports = new DateUtil();