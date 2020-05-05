var mongoose = require('mongoose');
var seeder = require('mongoose-seed');

// Connect to MongoDB via Mongoose
seeder.connect('mongodb://localhost/sample-dev', function () {
    // Load Mongoose models
    seeder.loadModels([
        'models/product.js',
        'models/order.js'
    ]);
    //
    // Clear specified collections
    seeder.clearModels(['Product', 'Order'], function () {
        // Callback to populate DB once collections have been cleared
        seeder.populateModels(ListOfOrders, function () {
            console.log(`Done`);
            seeder.disconnect();
        });
    });
});

var ListOfOrders = [
    {
        'model': 'Product',
        'documents': [{
            "name": "Dates",
            "category": "Sping Loaded Cup Dispenser",
            "price": 3,
            "promotion": 50,
            "status": "OUT_OF_STOCK",
            "image": "http://dummyimage.com/122x227.jpg/cc0000/ffffff"
        }, {
            "name": "Muffin Batt - Choc Chk",
            "category": "Island Oasis - Lemonade",
            "price": 27,
            "promotion": 100,
            "status": "OUT_OF_STOCK",
            "image": "http://dummyimage.com/162x106.png/dddddd/000000"
        }, {
            "name": "Bread Base - Toscano",
            "category": "Tarts Assorted",
            "price": 54,
            "promotion": 7,
            "status": "OUT_OF_STOCK",
            "image": "http://dummyimage.com/138x164.png/5fa2dd/ffffff"
        }, {
            "name": "Sponge Cake Mix - Vanilla",
            "category": "Wine - White, Riesling, Semi - Dry",
            "price": 84,
            "promotion": 83,
            "status": "IN_STOCK",
            "image": "http://dummyimage.com/181x228.bmp/5fa2dd/ffffff"
        }, {
            "name": "Spice - Peppercorn Melange",
            "category": "Table Cloth 90x90 White",
            "price": 95,
            "promotion": 7,
            "status": "OUT_OF_STOCK",
            "image": "http://dummyimage.com/104x162.png/5fa2dd/ffffff"
        }, {
            "name": "Compound - Pear",
            "category": "Soup - Cream Of Broccoli",
            "price": 51,
            "promotion": 5,
            "status": "IN_STOCK",
            "image": "http://dummyimage.com/113x145.bmp/5fa2dd/ffffff"
        }, {
            "name": "Ostrich - Prime Cut",
            "category": "Spaghetti Squash",
            "price": 29,
            "promotion": 65,
            "status": "OUT_OF_STOCK",
            "image": "http://dummyimage.com/222x159.jpg/dddddd/000000"
        }, {
            "name": "Coffee - Egg Nog Capuccino",
            "category": "Pepper - Chillies, Crushed",
            "price": 81,
            "promotion": 56,
            "status": "IN_STOCK",
            "image": "http://dummyimage.com/173x102.png/cc0000/ffffff"
        }, {
            "name": "Mace Ground",
            "category": "Bread - Rolls, Rye",
            "price": 28,
            "promotion": 31,
            "status": "OUT_OF_STOCK",
            "image": "http://dummyimage.com/132x107.jpg/dddddd/000000"
        }, {
            "name": "Orange Roughy 6/8 Oz",
            "category": "Pasta - Rotini, Colour, Dry",
            "price": 41,
            "promotion": 58,
            "status": "OUT_OF_STOCK",
            "image": "http://dummyimage.com/124x239.jpg/ff4444/ffffff"
        }, {
            "name": "Chocolate - Mi - Amere Semi",
            "category": "Scampi Tail",
            "price": 27,
            "promotion": 88,
            "status": "OUT_OF_STOCK",
            "image": "http://dummyimage.com/104x213.png/cc0000/ffffff"
        }, {
            "name": "Pasta - Tortellini, Fresh",
            "category": "Veal Inside - Provimi",
            "price": 38,
            "promotion": 18,
            "status": "IN_STOCK",
            "image": "http://dummyimage.com/126x100.jpg/dddddd/000000"
        }, {
            "name": "Wine - White, Concha Y Toro",
            "category": "Nestea - Iced Tea",
            "price": 41,
            "promotion": 34,
            "status": "IN_STOCK",
            "image": "http://dummyimage.com/190x118.jpg/cc0000/ffffff"
        }, {
            "name": "Cake Circle, Paprus",
            "category": "Jam - Apricot",
            "price": 1,
            "promotion": 87,
            "status": "OUT_OF_STOCK",
            "image": "http://dummyimage.com/171x160.jpg/cc0000/ffffff"
        }, {
            "name": "Chips - Potato Jalapeno",
            "category": "Soup - Campbells, Lentil",
            "price": 44,
            "promotion": 87,
            "status": "IN_STOCK",
            "image": "http://dummyimage.com/155x183.bmp/cc0000/ffffff"
        }, {
            "name": "Juice - Apple Cider",
            "category": "Food Colouring - Blue",
            "price": 38,
            "promotion": 93,
            "status": "IN_STOCK",
            "image": "http://dummyimage.com/100x248.bmp/ff4444/ffffff"
        }, {
            "name": "Pork - Sausage Casing",
            "category": "Mix - Cocktail Ice Cream",
            "price": 66,
            "promotion": 94,
            "status": "OUT_OF_STOCK",
            "image": "http://dummyimage.com/172x236.jpg/ff4444/ffffff"
        }, {
            "name": "Bread - Corn Muffaletta",
            "category": "Sauce - Roasted Red Pepper",
            "price": 11,
            "promotion": 10,
            "status": "IN_STOCK",
            "image": "http://dummyimage.com/247x232.jpg/5fa2dd/ffffff"
        }, {
            "name": "Juice - V8 Splash",
            "category": "Chicken - White Meat, No Tender",
            "price": 73,
            "promotion": 92,
            "status": "IN_STOCK",
            "image": "http://dummyimage.com/212x223.png/cc0000/ffffff"
        }, {
            "name": "Pork - Sausage Casing",
            "category": "Guinea Fowl",
            "price": 75,
            "promotion": 37,
            "status": "IN_STOCK",
            "image": "http://dummyimage.com/208x117.bmp/cc0000/ffffff"
        }]
    },
    {
        'model': 'Order',
        'documents': [
            {
                user_id: new mongoose.Types.ObjectId(),
                products: [
                    {_id: new mongoose.Types.ObjectId()},
                    {_id: new mongoose.Types.ObjectId()},
                    {_id: new mongoose.Types.ObjectId()}
                ],
                status: 'PENDING',
            },
            {
                user_id: new mongoose.Types.ObjectId(),
                products: [
                    {_id: new mongoose.Types.ObjectId()},
                    {_id: new mongoose.Types.ObjectId()},
                    {_id: new mongoose.Types.ObjectId()}],
                status: 'PENDING',
            },
            {
                user_id: new mongoose.Types.ObjectId(),
                products: [
                    {_id: new mongoose.Types.ObjectId()},
                    {_id: new mongoose.Types.ObjectId()},
                    {_id: new mongoose.Types.ObjectId()}],
                status: 'PENDING',
            },
        ]
    }
];
