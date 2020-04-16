process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let Product = require('../models/product');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();

chai.use(chaiHttp);
let products;
//Our parent block
describe('Product', () => {
    beforeEach((done) => { //Before each test we empty the database
        Product.remove({}, (err) => {
            done();
        });
    });
    /*
     * Test the /GET route
     */
    describe('/GET All products', () => {
        beforeEach( (done)=>{
            products = new Product({...pdts[1]}) ;
            products.save(done);
        })
        it('it should GET all the books', (done) => {
            chai.request(server)
                .get('/products')
                .end((err, res) => {
                    console.log(res.body);
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(1);
                    Product.remove({}, (err) => {
                        done();
                    })
                });
        });

    });

    /*
     * Test the /POST route
     */
    describe('/POST Product', () => {
        /*it('it should not POST a book without pages field', (done) => {
            let book = {
                title: "The Lord of the Rings",
                author: "J.R.R. Tolkien",
                year: 1954
            }
            chai.request(server)
                .post('/book')
                .send(book)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('errors');
                    res.body.errors.should.have.property('pages');
                    res.body.errors.pages.should.have.property('kind').eql('required');
                    done();
                });
        });*/
        it('it should POST a product ', (done) => {
            beforeEach( (done)=>{
                products = new Product({...pdts[1]}) ;
                products.save(done);
            })
            chai.request(server)
                .post('/products/new')
                .send(products)
                .end((err, res) => {
                    res.should.have.status(200);
                    // res.body.should.be.a('object');
                    // res.body.should.have.property('message').eql('products successfully added!');
                    // res.body.products.should.have.property('name');
                    // res.body.products.should.have.property('category');
                    // res.body.products.should.have.property('price');
                    Product.remove({}, (err) => {
                        done();
                    })
                });
        });
    });

    /*
     * Test the /GET/:id route
     */
    describe('/GET/:id Product by id', () => {
        beforeEach( (done)=>{
            products = new Product({...pdts[1]}) ;
            products.save(done);
        })
        it('it should GET a Product by the given id', (done) => {
                chai.request(server)
                    .get('/products/' + products.id)
                    .send(products)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('name');
                        res.body.should.have.property('category');
                        res.body.should.have.property('price');
                        res.body.should.have.property('status');
                        res.body.should.have.property('promotion');
                        res.body.should.have.property('image');
                        res.body.should.have.property('_id').eql(products.id);
                        Product.remove({}, (err) => {
                            done();
                        })
            });

        });
    });

    /*
     * Test the /PUT/:id route
     */
    describe('/PUT/:id product', () => {
        beforeEach( (done)=>{
            products = new Product({...pdts[1]}) ;
            products.save(done);
        })
        it('it should UPDATE a product given the id', (done) => {
            products.save((err, products) => {
                chai.request(server)
                    .post('/products/edit/' + products.id)
                    .send(pdts[2])
                    .end((err, res) => {
                        console.log(products.id)
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        Product.remove({}, (err) => {
                            done();
                        })
                    });
            });
        });
    });

    /*
     * Test the /DELETE/:id route
     */
    describe('/DELETE/:id book', () => {
        beforeEach( (done)=>{
            products = new Product({...pdts[1]}) ;
            products.save(done);
        })
        it('it should DELETE a product given the id', (done) => {
            products.save((err, book) => {
                chai.request(server)
                    .post('/products/delete/' + products.id)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        // res.body.should.have.property('message').eql('Product successfully deleted!');
                        // res.body.result.should.have.property('ok').eql(1);
                        // res.body.result.should.have.property('n').eql(1);
                        done();
                    });
            });
        });
    });
});


const pdts = [
    {
        name: 'sad',
        category: 'asd',
        price: 2,
        promotion: 2,
        status: 'IN_STOCK',
        image: 'sadf',
        createdAt: Date.now(),
    },
    {
        name: 'dsa',
        category: 'asd1',
        price: 1,
        promotion: 1,
        status: 'IN_STOCK',
        image: 'sadf',
        createdAt: Date.now(),
    },
    {
        name: '3asd',
        category: '3sad',
        price: 3,
        promotion: 3,
        status: 'IN_STOCK',
        image: "sadf",
        createdAt: Date.now(),
    },
    {
        name: '4sad',
        category: '4sad',
        price: 4,
        promotion: 4,
        status: 'IN_STOCK',
        image: '4',
        createdAt: Date.now(),
    }
]
