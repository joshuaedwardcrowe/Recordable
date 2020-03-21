import moment from "moment";

const TIMESTAMP_FORMAT = "Do MMMM YYYY @ HH:mm";

export const FormatToBreakdown = timeInMilliseconds => {
    if (timeInMilliseconds < 0) timeInMilliseconds = 0;
    const seconds = timeInMilliseconds % 60;
    timeInMilliseconds = (timeInMilliseconds - seconds) / 60;
    const minutes = timeInMilliseconds % 60;
    const hours = (timeInMilliseconds - minutes) / 60;
    return `${hours}:${`0${minutes}`.slice(-2)}:${`0${seconds}`.slice(-2)}`;
};

export const FormatToTimestamp = parseableDate =>
    moment(parseableDate).format(TIMESTAMP_FORMAT);

export const CalculateSecondTimeDifference = (parseableStartDate, parseableEndDate) => {
    if (!parseableStartDate || !parseableEndDate) return 0;
    const parsedStartDate = new Date(parseableStartDate);
    const parsedEndDate = new Date(parseableEndDate);
    var difference = parsedEndDate.getTime() - parsedStartDate.getTime();
    return difference / 1000;
}

export const CalculateDateReached = (parseableStartDate, millisecondsCounted) => {
    var millisecondsReached = new Date(parseableStartDate).getTime() + (millisecondsCounted * 1000);
    return new Date(millisecondsReached);
}

export const Delay = (callback, milliseconds) => {
    const interval = setInterval(callback, milliseconds);
    return () => clearInterval(interval);
}