import moment from 'moment';
export default function getTimeFromMins(minutes) { 
    minutes = +minutes; // parse to number
    if (minutes === 1) {
        return 'דקה';
    }

    if (minutes === 15) {
        return 'רבע שעה';
    }

    if (minutes === 30) {
        return 'חצי שעה';
    }

    if (minutes < 60) {
        return `${minutes} דקות`
    }

    if (minutes === 60) {
        return 'שעה'
    }
    
    if (minutes === 90) {
        return 'שעה וחצי'
    }

    if (minutes === 120) {
        return 'שעתיים'
    }

    if (minutes % 60 === 0) {
        return `${minutes % 60} שעות`
    }

    return `${moment.duration(minutes, 'minutes').format('h:mm')} שעות` ;
}
    