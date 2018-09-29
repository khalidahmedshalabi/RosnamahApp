export default isNumeric = num => {
    return !isNaN(parseFloat(num)) && isFinite(num);
}