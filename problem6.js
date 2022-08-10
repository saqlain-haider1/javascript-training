const EventEmitter = require('events');

const eventEmitter = new EventEmitter();


// EventEmitter for the three systems
const temprature = new EventEmitter();
const humidity = new EventEmitter();
const airPressure = new EventEmitter();

// EventEmitter for the observer
const observable = new EventEmitter();

// Display Objects to keep track of the current and previous values of the above three factors.

let currentValues = {
    temprature: Math.random(),
    humidity: Math.random(),
    airPressure: Math.random(),
};

let previousValues = {
    temprature: Math.random(),
    humidity: Math.random(),
    airPressure: Math.random(),
};

// Defining event handlers on these eventEmitters

// Observer

observable.on('observe', () => {
    setInterval(() => {
        temprature.emit('data');
        airPressure.emit('data');
        humidity.emit('data');
        
        if(JSON.stringify(currentValues) !== JSON.stringify(previousValues)) {
            observable.emit('display');
        }

        previousValues.airPressure = currentValues.airPressure;
        previousValues.temperature = currentValues.temperature;
        previousValues.humidity = currentValues.humidity;
    },100);
    
});


// Sensors

temprature.on('data', () => {
    let random = getRandomValues();
    setTimeout(() => {
        if (random < 1000) {
            currentValues.temprature = Math.random();
        } else {
            currentValues.temprature = 'N/A'
        }
    }, random);

});

airPressure.on('data', () => {
    let random = getRandomValues();
    setTimeout(() => {
        if (random < 1000) {
            currentValues.airPressure = Math.random();
        } else {
            currentValues.airPressure = 'N/A'
        }
    }, random);

});

humidity.on('data', () => {
    let random = getRandomValues();
    setTimeout(() => {
        if (random < 1000) {
            currentValues.humidity = Math.random();
        } else {
            currentValues.humidity = 'N/A'
        }
    }, random)

})

observable.on('display', () => {
    console.log(currentValues);
})

const observe = () => {
    setInterval(() => {
        observable.emit('observe');
    }, 100);
}
observe();

// Utility functions
/**
 * Function to get a random value between (100-2000)
 * @returns 
 */
function getRandomValues() {
    let random = (Math.floor(Math.random() * 20) + 1) * 100;
    return random;
}