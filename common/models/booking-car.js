'use strict';
// var Bookingcar = require('./booking-car.json');
module.exports = function(Bookingcar) {
    var Car = require('./car.js');
Bookingcar.findCar = function(location, carType,  stDte, endDte,cb) {
    return new Promise((resolve,reject) => {
        const filter ={
            include :['booking-car'],
            where :{
                carType : carType
            }
        };
        Car.find(filter,(err,results)=>{
            if (err) return reject(err);
            // you can add more logic on the results here if needed
            resolve(results);
        })
    }).then((res)=>{
        cb(null, res);
    }, (err)=>{
        cb(err,null);
    })
    
};

  Bookingcar.remoteMethod(
    'findCar', {
        http: {path: '/findCar', verb: 'get'},
        accepts: [
            {arg: 'location', type: 'string', required: true},
            {arg: 'carType', type: 'string', required: true},
            {arg: 'stDte', type: 'date',required: true},
            {arg: 'endDte', type: 'date',required: true}

        ],
        returns: {arg: 'cars', type: 'array'}
    }
);
  
};