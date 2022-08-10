/**
 * Following method will fetch the results from the url
 * and place them into the array.
 * @param null
 */
Array.prototype.populate = function(){

    // For each element in the array, fetch the result and store in the array.
    this.forEach((element,index) => {
        fetch(element)
        .then(response => {
            if(response.ok)
            {
                this[index] = response;
            }
            else
            {
                throw Error('URL not valid!');
            }
        }).catch(error=>{
            console.log(error);
        });
       
    });
}

let urls = ['https://reqres.in/api/products/3','https://reqres.in/api/products/2','hello'];

// Testing
try{
    urls.populate();
    console.log(urls)
}
catch(Error){
    console.log(Error);
}