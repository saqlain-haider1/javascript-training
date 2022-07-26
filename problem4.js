const axios = require('axios');

// Object treated as local cache to store results
var cachedResponse = {};

/**
 * Following method will fetch the url from cache if present,
 * otherwise fetch results using axios.
 * @param {string} url 
 * @returns 
 */
const memoizedFetch = async (url) => {ß
    if(Object.keys(cachedResponse).includes(url)) {
        console.log('Found in cache');
        return cachedResponse[url].data;
    }

    console.log(`not found, fetching response...`)
    cachedResponse[url] = await axios.get(url);
    return cachedResponse[url].data;
}

// Testing
const fetchResponses = async() => {
    console.log(await memoizedFetch('https://reqres.in/api/users/1'))
    console.log(await memoizedFetch('https://reqres.in/api/users/2'))
    console.log(await memoizedFetch('https://reqres.in/api/users/1'))
    console.log(await memoizedFetch('https://reqres.in/api/users/2'))
    console.log(await memoizedFetch('https://reqres.in/api/users/3'))
}

fetchResponses();