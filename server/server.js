var express = require('express');
var { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');
var cors =  require('cors');

// GraphQL schema
var schema = buildSchema(`
    type Query {
        car(id: Int!): Car
        cars(topic: String): [Car]
    },
    type Car {
        id: Int
        name: String
        image: String
        make: String
        createdAt: String 
    }
`);

var carsData = [{ "createdAt": "2021-09-18T18:17:36.033Z", "name": "Chrysler Wrangler", "image": "http://placeimg.com/640/480/abstract", "make": "Aston Martin", "id": "1" }, { "createdAt": "2021-09-19T06:57:07.239Z", "name": "Volkswagen Fortwo", "image": "http://placeimg.com/640/480/technics", "make": "Lamborghini", "id": "2" }, { "createdAt": "2021-09-19T08:27:48.961Z", "name": "Kia Accord", "image": "http://placeimg.com/640/480/abstract", "make": "Rolls Royce", "id": "3" }, { "createdAt": "2021-09-18T18:13:00.684Z", "name": "Kia Model S", "image": "http://placeimg.com/640/480/business", "make": "Mazda", "id": "4" }, { "createdAt": "2021-09-18T21:59:05.923Z", "name": "Chrysler Grand Cherokee", "image": "http://placeimg.com/640/480/fashion", "make": "Dodge", "id": "5" }, { "createdAt": "2021-09-19T10:01:23.645Z", "name": "Kia Grand Caravan", "image": "http://placeimg.com/640/480/people", "make": "Chevrolet", "id": "6" }, { "createdAt": "2021-09-19T02:39:18.365Z", "name": "Maserati Escalade", "image": "http://placeimg.com/640/480/people", "make": "Bentley", "id": "7" }, { "createdAt": "2021-09-19T06:02:41.890Z", "name": "Fiat Civic", "image": "http://placeimg.com/640/480/nightlife", "make": "Bugatti", "id": "8" }, { "createdAt": "2021-09-18T15:21:31.059Z", "name": "Volkswagen Impala", "image": "http://placeimg.com/640/480/food", "make": "Ferrari", "id": "9" }, { "createdAt": "2021-09-19T09:22:14.442Z", "name": "Mercedes Benz CTS", "image": "http://placeimg.com/640/480/nature", "make": "Chrysler", "id": "10" }, { "createdAt": "2021-09-18T21:17:09.249Z", "name": "Chrysler Roadster", "image": "http://placeimg.com/640/480/fashion", "make": "Audi", "id": "11" }, { "createdAt": "2021-09-19T07:28:33.089Z", "name": "Volkswagen Prius", "image": "http://placeimg.com/640/480/transport", "make": "Bugatti", "id": "12" }, { "createdAt": "2021-09-19T06:58:01.392Z", "name": "Nissan A4", "image": "http://placeimg.com/640/480/sports", "make": "Ferrari", "id": "13" }, { "createdAt": "2021-09-19T03:52:30.855Z", "name": "Mercedes Benz Silverado", "image": "http://placeimg.com/640/480/fashion", "make": "Rolls Royce", "id": "14" }, { "createdAt": "2021-09-18T16:36:13.651Z", "name": "Jeep Fortwo", "image": "http://placeimg.com/640/480/business", "make": "Hyundai", "id": "15" }, { "createdAt": "2021-09-19T01:56:03.538Z", "name": "Jaguar Grand Cherokee", "image": "http://placeimg.com/640/480/nightlife", "make": "BMW", "id": "16" }, { "createdAt": "2021-09-18T22:25:01.362Z", "name": "Maserati Mustang", "image": "http://placeimg.com/640/480/transport", "make": "Land Rover", "id": "17" }, { "createdAt": "2021-09-19T08:13:16.442Z", "name": "Mercedes Benz Expedition", "image": "http://placeimg.com/640/480/people", "make": "Land Rover", "id": "18" }, { "createdAt": "2021-09-18T14:04:38.925Z", "name": "Fiat Prius", "image": "http://placeimg.com/640/480/people", "make": "Toyota", "id": "19" }, { "createdAt": "2021-09-18T20:25:46.929Z", "name": "Audi Golf", "image": "http://placeimg.com/640/480/technics", "make": "Porsche", "id": "20" }, { "createdAt": "2021-09-19T10:07:56.551Z", "name": "Cadillac Model T", "image": "http://placeimg.com/640/480/business", "make": "Kia", "id": "21" }, { "createdAt": "2021-09-20T20:40:11.675Z", "name": "Toyota Explorer", "image": "http://placeimg.com/640/480/abstract", "make": "Bentley", "id": "22" }, { "createdAt": "2021-09-21T05:20:00.824Z", "name": "Tesla 1", "image": "http://placeimg.com/640/480/business", "make": "Toyota", "id": "23" }, { "createdAt": "2021-09-20T23:29:08.011Z", "name": "Bentley Charger", "image": "http://placeimg.com/640/480/cats", "make": "Bentley", "id": "24" }, { "createdAt": "2021-09-21T05:17:34.783Z", "name": "Mazda Camaro", "image": "http://placeimg.com/640/480/business", "make": "Kia", "id": "25" }, { "createdAt": "2021-09-21T01:51:12.035Z", "name": "Volkswagen Sentra", "image": "http://placeimg.com/640/480/animals", "make": "Smart", "id": "26" }, { "createdAt": "2021-09-21T00:03:43.591Z", "name": "Volkswagen Grand Cherokee", "image": "http://placeimg.com/640/480/animals", "make": "Fiat", "id": "27" }, { "createdAt": "2021-09-20T20:13:27.257Z", "name": "Toyota Jetta", "image": "http://placeimg.com/640/480/business", "make": "Volvo", "id": "28" }, { "createdAt": "2021-09-21T02:32:03.934Z", "name": "Honda Charger", "image": "http://placeimg.com/640/480/city", "make": "Bentley", "id": "29" }, { "createdAt": "2021-09-21T02:58:05.847Z", "name": "BMW Cruze", "image": "http://placeimg.com/640/480/city", "make": "Lamborghini", "id": "30" }, { "createdAt": "2021-09-20T21:48:05.310Z", "name": "Cadillac CX-9", "image": "http://placeimg.com/640/480/transport", "make": "Mercedes Benz", "id": "31" }, { "createdAt": "2021-09-21T00:01:14.613Z", "name": "Audi Land Cruiser", "image": "http://placeimg.com/640/480/nature", "make": "Nissan", "id": "32" }, { "createdAt": "2021-09-20T18:01:15.727Z", "name": "Mini Charger", "image": "http://placeimg.com/640/480/nightlife", "make": "Bentley", "id": "33" }, { "createdAt": "2021-09-21T06:16:06.689Z", "name": "Land Rover Escalade", "image": "http://placeimg.com/640/480/nightlife", "make": "Audi", "id": "34" }, { "createdAt": "2021-09-21T14:10:48.306Z", "name": "Mazda Element", "image": "http://placeimg.com/640/480/sports", "make": "Honda", "id": "35" }, { "createdAt": "2021-09-21T13:39:17.057Z", "name": "Nissan Malibu", "image": "http://placeimg.com/640/480/nature", "make": "Audi", "id": "36" }, { "createdAt": "2021-09-21T07:47:06.413Z", "name": "Polestar Roadster", "image": "http://placeimg.com/640/480/animals", "make": "Aston Martin", "id": "37" }, { "createdAt": "2021-09-20T18:08:39.563Z", "name": "Nissan LeBaron", "image": "http://placeimg.com/640/480/city", "make": "Ford", "id": "38" }, { "createdAt": "2021-09-20T23:16:54.938Z", "name": "Smart F-150", "image": "http://placeimg.com/640/480/fashion", "make": "Hyundai", "id": "39" }, { "createdAt": "2021-09-20T17:16:52.787Z", "name": "Ford LeBaron", "image": "http://placeimg.com/640/480/cats", "make": "Kia", "id": "40" }, { "createdAt": "2021-09-20T19:01:41.644Z", "name": "Aston Martin Focus", "image": "http://placeimg.com/640/480/technics", "make": "Smart", "id": "41" }, { "createdAt": "2021-09-21T15:57:01.943Z", "name": "Fiat ATS", "image": "http://placeimg.com/640/480/nightlife", "make": "Volkswagen", "id": "42" }, { "createdAt": "2021-09-21T15:18:24.803Z", "name": "Volvo Challenger", "image": "http://placeimg.com/640/480/food", "make": "Volkswagen", "id": "43" }, { "createdAt": "2021-09-21T16:08:51.136Z", "name": "Chevrolet A8", "image": "http://placeimg.com/640/480/technics", "make": "Rolls Royce", "id": "44" }, { "createdAt": "2021-09-20T22:14:41.636Z", "name": "Polestar Land Cruiser", "image": "http://placeimg.com/640/480/people", "make": "Volkswagen", "id": "45" }, { "createdAt": "2021-09-20T19:05:00.344Z", "name": "BMW Golf", "image": "http://placeimg.com/640/480/nightlife", "make": "Mazda", "id": "46" }, { "createdAt": "2021-09-21T00:34:04.787Z", "name": "Rolls Royce El Camino", "image": "http://placeimg.com/640/480/sports", "make": "Maserati", "id": "47" }, { "createdAt": "2021-09-21T15:36:12.935Z", "name": "Maserati Roadster", "image": "http://placeimg.com/640/480/fashion", "make": "Rolls Royce", "id": "48" }, { "createdAt": "2021-09-20T21:13:36.660Z", "name": "Chevrolet Challenger", "image": "http://placeimg.com/640/480/people", "make": "Bentley", "id": "49" }, { "createdAt": "2021-09-21T04:36:05.943Z", "name": "Chevrolet Expedition", "image": "http://placeimg.com/640/480/city", "make": "Chrysler", "id": "50" }, { "createdAt": "2021-09-20T20:45:06.178Z", "name": "Tesla XTS", "image": "http://placeimg.com/640/480/abstract", "make": "Hyundai", "id": "51" }, { "createdAt": "2021-09-21T01:02:51.894Z", "name": "Toyota Malibu", "image": "http://placeimg.com/640/480/transport", "make": "Lamborghini", "id": "52" }, { "createdAt": "2021-09-20T20:58:05.778Z", "name": "Chevrolet XTS", "image": "http://placeimg.com/640/480/fashion", "make": "Volkswagen", "id": "53" }, { "createdAt": "2021-09-21T11:36:56.229Z", "name": "Jeep Camry", "image": "http://placeimg.com/640/480/animals", "make": "Jaguar", "id": "54" }, { "createdAt": "2021-09-21T14:20:58.381Z", "name": "Polestar Prius", "image": "http://placeimg.com/640/480/abstract", "make": "Lamborghini", "id": "55" }, { "createdAt": "2021-09-21T09:42:18.285Z", "name": "Lamborghini Accord", "image": "http://placeimg.com/640/480/animals", "make": "Toyota", "id": "56" }, { "createdAt": "2021-09-21T12:21:46.833Z", "name": "BMW Sentra", "image": "http://placeimg.com/640/480/fashion", "make": "Aston Martin", "id": "57" }, { "createdAt": "2021-09-21T01:59:11.475Z", "name": "Smart Malibu", "image": "http://placeimg.com/640/480/sports", "make": "Maserati", "id": "58" }, { "createdAt": "2021-09-21T04:06:47.354Z", "name": "Chevrolet Golf", "image": "http://placeimg.com/640/480/city", "make": "Honda", "id": "59" }, { "createdAt": "2021-09-20T23:12:00.178Z", "name": "Toyota Taurus", "image": "http://placeimg.com/640/480/abstract", "make": "Jeep", "id": "60" }, { "createdAt": "2021-09-21T03:42:04.228Z", "name": "Tesla Spyder", "image": "http://placeimg.com/640/480/city", "make": "Volkswagen", "id": "61" }, { "createdAt": "2021-09-20T21:12:25.575Z", "name": "Rolls Royce CX-9", "image": "http://placeimg.com/640/480/food", "make": "Smart", "id": "62" }, { "createdAt": "2021-09-21T00:07:19.711Z", "name": "BMW Model T", "image": "http://placeimg.com/640/480/fashion", "make": "Bugatti", "id": "63" }, { "createdAt": "2021-09-21T13:21:58.781Z", "name": "Volvo Model 3", "image": "http://placeimg.com/640/480/nature", "make": "Ferrari", "id": "64" }, { "createdAt": "2021-09-21T05:52:13.739Z", "name": "Porsche Silverado", "image": "http://placeimg.com/640/480/city", "make": "Ford", "id": "65" }, { "createdAt": "2021-09-21T04:49:50.005Z", "name": "Chevrolet Mustang", "image": "http://placeimg.com/640/480/transport", "make": "Bugatti", "id": "66" }, { "createdAt": "2021-09-21T03:55:29.101Z", "name": "Smart Model T", "image": "http://placeimg.com/640/480/food", "make": "Kia", "id": "67" }, { "createdAt": "2021-09-21T01:52:25.356Z", "name": "Fiat Golf", "image": "http://placeimg.com/640/480/food", "make": "Chrysler", "id": "68" }, { "createdAt": "2021-09-21T16:39:17.808Z", "name": "Mazda Mercielago", "image": "http://placeimg.com/640/480/business", "make": "Tesla", "id": "69" }]

var getCar = function (args) {
    var id = args.id;
    return carsData.filter(car => {
        return car.id == id;
    })[0];
}

var getCars = function (args) {
    if (args.name) {
        var name = args.name;
        return carsData.filter(c => car.name === name);
    } else {
        return carsData;
    }
}

var root = {
    car: getCar,
    cars: getCars
};

// Create an express server and a GraphQL endpoint
var app = express();
// Add a list of allowed origins.
// If you have more origins you would like to add, you can add them to the array below.
const allowedOrigins = ['http://localhost:3000'];

const options = cors.CorsOptions = {
  origin: allowedOrigins
};

// Then pass these options to cors:
app.use(cors(options));
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
}));
app.listen(4000, () => console.log('Express GraphQL Server Now Running On localhost:4000/graphql'));