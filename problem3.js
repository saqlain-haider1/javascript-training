/**
 * Following method will sum the given arguments using closure
 * @param {number} a 
 * @returns 
 */
const sum = (a) =>
{
    let total = a;
    return function innerFunction(b){
        if(!isNaN(b))
        {
            total+=b;
            return innerFunction;
        }
        else 
            return total;
    }
}





// Testing
// () is assumed as a delimeter as without this stopping condition cannot be determined
console.log(sum(1)(2)(3)(4)());
console.log(sum(1)(2)(3)(4)(5)());
console.log(sum(1)());

