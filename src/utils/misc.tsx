function getMonthName(monthNumber) {
    const date = new Date();
    date.setMonth(monthNumber);
  
    return date.toLocaleString('en-US', { month: 'long' });
}

function convertFirebaseTimestampToDate(timestamp) {
    return new Date(timestamp.seconds * 1000);
}

export { getMonthName, convertFirebaseTimestampToDate }