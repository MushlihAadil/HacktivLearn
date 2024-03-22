function convert(value) {
    let hours = Math.floor(value / 60);
    let minutes = value % 60;;
    if (minutes == 0 && hours == 1) {
        return `${hours} hour`
    } else if (minutes == 0 && hours > 1) {
        return `${hours} hours`
    } else if (minutes > 0 && hours == 1) {
        return `${hours} hour, ${minutes} minutes`
    } else if (minutes > 0 && hours > 1) {
        return `${hours} hours, ${minutes} minutes`
    }
}

module.exports = convert;