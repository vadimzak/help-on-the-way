import moment from 'moment';
export default function getTimeFromMins(minutes, format) { 
    let unit;
    let count;
    minutes = +minutes; // parse to number
    if (minutes === 1) {
        unit = 'דקה';
    } else if (minutes < 60) {
        unit = 'דקות' 
        count = minutes
    } else {
        const toHours = 
        count = Math.round((minutes / 60) * 2) / 2; // convert to half hours scale
        unit = 'שעות'
    }

    switch (format) {
        case 'unitOnly':
            return unit    
        break;   
        case 'countOnly':
            return  count   
        break;
        default:
            return `${count} ${units}`
        break;    
    }
}
    