/**
 * Following method will reterive the results from given URL
 * and return it.
 * @param {String} url 
 * @returns 
 */
const getResponse = async (url) => {
    
        return new Promise((resolve, reject) => {
            fetch(url,{method: 'GET'})
            .then(response => 
            {
                //console.log(response);
                resolve (response)
            })
            .catch(err => reject (err));
        })
}

/**
 * Following method will reterive the results from given URL in sequential execution order
 * using callback function.
 * @param {String} url 
 * @param {Function} callback 
 * @returns 
 */
const processRequestSerialUsingCallback = async (url, callback = getResponse) => {
    let results = [];
    for (let index = 0; index < urls.length; index++) {
        callback(urls[index])
        .then(response => results.push(response))
        .catch(err => results.push(err.message));
        
    }
    return results;
}

/**
 * Following method will reterive the results from given URL in sequential execution order using Promise.
 * @param {String} urls 
 * @returns 
 */
const processRequestSerialUsingPromises = async (urls) => {
    let results = [];
    return new Promise(function (resolve){
        urls.forEach((url) => {
            getResponse(url)
            .then((data) => {
              results.push(data);
            })
            .catch((err) => {
              results.push(err.message);
            });
        });
        resolve(results);
        
    });
}

/**
 * Following method will reterive the results from given URL in Parallel execution order using Promise.
 * @param {String} urls 
 * @returns 
 */
const processRequestParallelUsingPromises = async (urls) => {

    let results = [];
    const promises = urls.map(async (url) => getResponse(url));
    return Promise.all(promises)
    .then((responses) => {
        results = responses;
        return results;
    })
    .catch((err) => {
        console.log(err);
    });``
}

/**
 * Following method will reterive the results from given URL using Async and Await.
 * @param {String} urls 
 * @returns 
 */
const processRequestParallelUsingAsyncAwait = async (urls) => {
    let results = [];
    for (let index = 0; index < urls.length; index++) {
        try{
            let res = await getResponse(urls[index]);
            results.push(res);
        }
        catch(err){
            console.error(err);
        }   
        
    }
    return results;
}

let urls = ['https://www.boredapi.com/api/activity,','https://api.agify.io/?name=meelad','invalid url']
/**
 * Following method is used to comapre the performance of different execution scenarios.
 * @param {String} urls 
 */
async function performanceTest(urls){
    console.time("Callbacks (Serial Execution)");
    results = await processRequestSerialUsingCallback(urls, getResponse);
    console.timeEnd("Callbacks (Serial Execution)");


    console.time("Promises (Serial Execution)");
    results = await processRequestSerialUsingPromises(urls);
    console.timeEnd("Promises (Serial Execution)");

    console.time("Promises (Parallel Execution)");
    results = await processRequestParallelUsingPromises(urls);
    console.timeEnd("Promises (Parallel Execution)");


    console.time("Async-Await");
    results = await processRequestParallelUsingAsyncAwait(urls);
    console.timeEnd("Async-Await");
}


// Calling Performance Tests
performanceTest(urls);