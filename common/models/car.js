'use strict';

module.exports = function(Car) {
    var moment = require('moment');
    Car.findCar = function(carType,  stDte, endDte,cb) {
        return new Promise((resolve,reject) => {
            const filter ={
                include :['bookingCar'],
                where :{
                    carType : carType
                }
            };
            Car.find(filter,(err,results)=>{
                if (err) return reject(err);
                // you can add more logic on the results here if needed
                var cars=results.cars;
                var newArray= [];
                for(var car in cars){
                    var bookingDeails=car.bookingCar;
                    var isAvailable=true;
                    for(var booking in bookingDeails){
                        var startDate= moment(booking.startDate).format('DD-MM-YYYY');
                        var endDate= moment(booking.endDate).format('DD-MM-YYYY');
                        if (moment(stDte).isBefore(startDate) && moment(endDte).isAfter(startDate) && moment(stDte).isBefore(endDate) && moment(endDte).isAfter(endDate) && moment(startDate).isBetween(stDte, endDte) && moment(endDte).isBetween(startDate, endDate)) {
                            isAvailable =false
                        }

                    }
                    if(isAvailable){
                        console.log(car, "\n")
                        newArray.push(car);
                    }
                }
                resolve(newArray);
            })
        }).then((res)=>{
            cb(null, res);
        }, (err)=>{
            console.error(err);
            
        })
        
    };

    Car.remoteMethod(
        'findCar', {
            http: {path: '/findCar', verb: 'get'},
            accepts: [
                // {arg: 'location', type: 'string', required: true},
                {arg: 'carType', type: 'string', required: true},
                {arg: 'stDte', type: 'date',required: true},
                {arg: 'endDte', type: 'date',required: true}
    
            ],
            returns: {arg: 'cars', type: 'array'}
        }
    );
    
};
