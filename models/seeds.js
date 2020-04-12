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
    seeder.clearModels(['Product','Order'], function () {
        // Callback to populate DB once collections have been cleared
        seeder.populateModels(ListOfOrders, function () {
            console.log(`Done`);
            seeder.disconnect();
        });
    });
});

// Data array containing seed data - documents organized by Model
/*var ListOfProducts = [
    {
        'model': 'Product',
        'documents': [
            {
                name: '2',
                category: '2',
                price: '2',
                promotion: '2',
                status: 'IN_STOCK',
                image: '2',
            },
            {
                name: '1',
                category: '1',
                price: '1',
                promotion: '1',
                status: 'IN_STOCK',
                image: '1',
            },
            {
                name: '3',
                category: '3',
                price: '3',
                promotion: '3',
                status: 'IN_STOCK',
                image: '3',
            },
            {
                name: '4',
                category: '4',
                price: '4',
                promotion: '4',
                status: 'IN_STOCK',
                image: '4',
            }
        ]
    }
];*/
var ListOfOrders = [
    {
        'model': 'Product',
        'documents': [
            {
                name: '2',
                category: '2',
                price: '2',
                promotion: '2',
                status: 'IN_STOCK',
                image: '2',
            },
            {
                name: '1',
                category: '1',
                price: '1',
                promotion: '1',
                status: 'IN_STOCK',
                image: '1',
            },
            {
                name: '3',
                category: '3',
                price: '3',
                promotion: '3',
                status: 'IN_STOCK',
                image: '3',
            },
            {
                name: '4',
                category: '4',
                price: '4',
                promotion: '4',
                status: 'IN_STOCK',
                image: '4',
            }
        ]
    },
    {
        'model': 'Order',
        'documents': [
            {
                user_id: new mongoose.Types.ObjectId(),
                products: [
                    {_id:new mongoose.Types.ObjectId()},
                    {_id:new mongoose.Types.ObjectId()},
                    {_id:new mongoose.Types.ObjectId()}
                    ],
                status: 'PENDING',
            },
            {
                user_id: new mongoose.Types.ObjectId(),
                products: [
                    {_id:new mongoose.Types.ObjectId()},
                    {_id:new mongoose.Types.ObjectId()},
                    {_id:new mongoose.Types.ObjectId()}],
                status: 'PENDING',
            },
            {
                user_id: new mongoose.Types.ObjectId(),
                products: [
                    {_id:new mongoose.Types.ObjectId()},
                    {_id:new mongoose.Types.ObjectId()},
                    {_id:new mongoose.Types.ObjectId()}],
                status: 'PENDING',
            },
        ]
    }
];
