// function for finding the sum of arguments
sum = (...args) => {
    try{
        let result = args.reduce((total,current) => {
            if(isNaN(current))
            {
                console.log(`${current} is not a number!`);
            }
            else
                total += current
            return total;
        },0);
        return result;
    }
    catch(error)
    {
        console.log(error);
    }

};


// Testing for some inputs
console.log(sum(1,2))
console.log(sum(1,2,3))
console.log(sum(1,2,3,4))
console.log(sum(1,2,3,4,5))
console.log(sum(1,2,'a'))