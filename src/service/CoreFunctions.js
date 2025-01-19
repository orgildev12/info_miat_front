import hmacSHA512 from 'crypto-js/hmac-sha512';
import Base64 from 'crypto-js/enc-base64';

export function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export function encrtypth(text) {
    const hmacDigest = Base64.stringify(hmacSHA512(text, "TWVDb3JlRmliYUlLPQ=="));
    return hmacDigest;
}

export function numberFormat(props) {
    return parseFloat(props)
        .toFixed(2)
        .replace(/\d(?=(\d{3})+\.)/g, "$&,");
}

export function addMonthNoOverflow(date) {
    const originalMonth = date.getMonth();

    // Add 1 month
    date.setMonth(date.getMonth() + 1);

    // Check if the month has changed
    if (date.getMonth() !== ((originalMonth + 1) % 12)) {
        // If the month has changed, set the date to the last day of the previous month
        date.setDate(0);
    }

    return date;
}

export function millisecondsToFormat(milliseconds) {
    const diffInSeconds = Math.floor(milliseconds / 1000);

    const hours = Math.floor(diffInSeconds / 3600);
    const minutes = Math.floor((diffInSeconds % 3600) / 60);
    const seconds = diffInSeconds % 60;

    return `${hours}h ${minutes}m ${seconds}s`;
}

export function addMonthsNoOverflow(date, months) {
    const newDate = new Date(date.getTime());

    const currentMonth = newDate.getMonth();
    const targetMonth = currentMonth + months;

    newDate.setMonth(targetMonth);

    if (newDate.getMonth() !== (targetMonth % 12 + 12) % 12) {
        newDate.setDate(0);
    }

    return newDate;
}

export function isLastDayOfMonth(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth();
    const nextDay = new Date(year, month, date.getDate() + 1);

    return nextDay.getMonth() !== month;
}

export function getLastDayOfNextMonth(dateString) {
    const today = new Date(dateString);
    const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1);
    const lastDayOfMonth = new Date(nextMonth.getFullYear(), nextMonth.getMonth() + 1, 0);

    return lastDayOfMonth;
}