/*
 * Javascript Document
 */

/**
 * Returns all triplet values in a range
 * @param {Number} min minimal value
 * @param {Number} max maximal value (excluded)
 * @returns {Array<Number>} an array of triplets
 */
function allTriplets(min, max) {
    return [...Array(max-min)].map((_,i) => i+min).filter(i => i%3==0);
}

/**
 * Generates a FizzBuzz stream
 * @param {Number} size The amount of instances
 * @returns {String} A Fizzbuzz stream with spaces between each instance
 */
function fizzBuzz(size) {
    return [...Array(size)].map((_,i) => {
        i++; let string = "";
        if (i % 3 == 0) string += "Fizz";
        if (i % 5 == 0) string += "Buzz";
        return string || i;
    }).join(" ");
}

/**
 * Calculates the factorial of a number
 * @param {Number} x The number to calculate from
 * @returns {Number} The factorial number
 */
function fact(x) {
    return [...Array(x)].map((_,i) => ++i).reduce((a,b) => a*b);
}
/**
 * Filters on every nth character of a string
 * @param {String} string The string to filter
 * @param {Number} n The nth to filter
 * @returns {String} The modified string
 */
function everyNth(string, n) {
    return [...string].reduce((s,c,i) => i%n==0 ? s+c : s);
}
/**
 * 
 * @param {Array<Number>} array 
 * @returns {Number}
 */
function sumOfQuadraticOdd(array) {
    return array.filter(n => n%2!=0).map(n => n*n).reduce((a,b) => a+b);
}

console.log(fizzBuzz(100));
