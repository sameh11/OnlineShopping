process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let User = require('../models/user');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();

chai.use(chaiHttp);
let users;
//Our parent block
describe('USER', () => {
    beforeEach((done) => { //Before each test we empty the database
        User.remove({}, (err) => {
            done();
        });
    });
    describe('/GET All products', () => {
        beforeEach( (done)=>{
            users = new User(urs[0]) ;
            users1 = new User(urs[1]) ;
            users2 = new User(urs[2]) ;
            users3 = new User(urs[3]) ;
            users.save();
            users1.save();
            users2.save();
            users3.save(done);
        })
        it('it should GET all the User', (done) => {
            chai.request(server)
                .get('/users/')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    User.remove({}, (err) => {
                        done();
                    })
                });
        });
    });
    describe('/POST User', () => {
        beforeEach( (done)=>{
            users = new User({...urs[0]}) ;
            // users.save(done);
            done();
        })
        it('it should Create a User ', (done) => {
            chai.request(server)
                .post('/users/create/')
                .send(users)
                .end((err, res) => {
                    res.should.have.status(200);
                    User.remove({}, (err) => {
                        done();
                    })
                });
        });
        it('it should return error with details ', (done) => {
            chai.request(server)
                .post('/users/create/')
                .send(users)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property('details').should.be.a('object');
                    User.remove({}, (err) => {
                        done();
                    })
                });
        });
        it('it should return Unauthorized error', (done) => {
            chai.request(server)
                .post('/users/create/')
                .send(users)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property('error');
                    User.remove({}, (err) => {
                        done();
                    })
                });
        });
    });
    describe('/GET/:id user by id', () => {
        beforeEach((done)=>{
            users = new User({...urs[0]}) ;
            // console.log(users.id)
            users.save(done);
        })
        it('it should GET a user by the given id', (done) => {
            chai.request(server)
                .get('/users/' + users.id)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('username');
                    res.body.should.have.property('displayName');
                    res.body.should.have.property('password');
                    res.body.should.have.property('gender');
                    res.body.should.have.property('image');
                    res.body.should.have.property('createdAt');
                    res.body.should.have.property('_id').eql(users.id);
                    User.remove({}, (err) => {
                        done();
                    })
                });
        });
    });
});



const urs = [
    {
        username: "asdf",
        displayName: "asdf",
        email: "asdf@asdf.com",
        password: "asdf",
        gender: 'MALE',
        image: ["asdf","asdf","asdf"],
        createdAt:  Date.now(),
    },
    {
        username: "qwer",
        displayName: "qwer",
        email: "qwer@qwer.com",
        password: "qwer",
        gender: 'MALE',
        image: ["asdf","asdf","asdf"],
        createdAt:  Date.now(),
    },
    {
        username: "zxv",
        displayName: "zxcv",
        email: "zxcv@zzxc.com",
        password: "zxcv",
        gender: 'MALE',
        image: ["asdf","asdf","asdf"],
        createdAt:  Date.now(),
    },
    {
        username: "erty",
        displayName: "erty",
        email: "erty",
        password: "erty",
        gender: 'MALE',
        image: ["asdf","asdf","asdf"],
        createdAt:  Date.now(),
    }
]
