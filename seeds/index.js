const mongoose = require('mongoose');
const cities = require('./cities');
const {places, descriptors} = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
}); 

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async() => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++){
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author:'62c6c902d300d343ae9eeff5',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title : `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit',
            price,
            geometry: { 
              type : "Point", 
              coordinates : [
                cities[random1000].longitude, 
                cities[random1000].latitude] 
            },
            images: [
                {
                  url: 'https://res.cloudinary.com/df8tzsrvm/image/upload/v1657283281/YelpCamp/pobncb00sew5tajc08jn.jpg',
                  filename: 'YelpCamp/pobncb00sew5tajc08jn',
                },
                {
                  url: 'https://res.cloudinary.com/df8tzsrvm/image/upload/v1657283283/YelpCamp/j8xqfovepw0uxalwlr6x.jpg',
                  filename: 'YelpCamp/j8xqfovepw0uxalwlr6x',
                }
              ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})

