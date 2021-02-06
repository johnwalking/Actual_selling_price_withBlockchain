var express = require('express');
var router = express.Router();

const Web3 = require('web3');

const web3 = new Web3('http://localhost:7545');
//console.log("web3: ", web3);

const contract = require('../contracts/house.json')

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get('/accounts', async function(req, res, next) {
    let accounts = await web3.eth.getAccounts()
    res.send(accounts)
});

router.get('/contract', function(req, res, next) {
    let House = new web3.eth.Contract(contract.abi);
    House.options.address = req.query.address;
    res.send({
        house: House
    })
});

router.post('/deploy', function(req, res, next) {
    let House = new web3.eth.Contract(contract.abi);
    House.deploy({
            data: contract.bytecode
        })
        .send({
            from: req.body.account,
            gas: 3400000
        })
        .on('receipt', function(receipt) {
            res.send(receipt);
        })
        .on('error', function(error) {
            res.send(error.toString());
        })
});

router.post('/AddHouse', function(req, res, next) {
    let house = new web3.eth.Contract(contract.abi);
    house.options.address = req.body.HouseAddress;
    house.methods.addEntry(req.body.HouseTotalPriceInput,
            req.body.HouseTotalSizeInput, req.body.HouseAgeInput,
            req.body.HouseRoomNumber, req.body.HouseHallNumber,
            req.body.HouseCityLocation, req.body.HouseDistrictLocation, req.body.HouseReminderLocation,
            req.body.HousePricePerSizeInput, req.body.HouseTypeInput,
            req.body.HouseFloorInput).send({
            from: req.body.account,
            gas: 3400000
        })
        .on('receipt', function(receipt) {
            res.send(receipt);
        })
        .on('error', function(error) {
            res.send(error.toString());
        })
});


router.post('/Search1', async function(req, res, next) {
    let house = new web3.eth.Contract(contract.abi);
    house.options.address = req.body.HouseAddress;
    let ids = await house.methods.searchByPrice(req.body.LowPrice, req.body.UpPrice).call();
    var prices = [];
    var sizes = [];
    var ages = [];
    var citys = [];
    var areas = [];
    var others = [];
    var set0s = [];
    var set1s = [];
    var pricepersizes = [];
    var housetypes = [];
    var floors = [];
    for (let id of ids) {
        if (id != 0) {
            let ret1 = await house.methods.getEntryPart1(id).call();
            prices.push(ret1[0]);
            sizes.push(ret1[1]);
            ages.push(ret1[2]);
            floors.push(ret1[3]);
            pricepersizes.push(ret1[4]);
            set0s.push(ret1[5]);
            set1s.push(ret1[6]);
            let ret2 = await house.methods.getEntryPart2(id).call();
            citys.push(ret2[0]);
            areas.push(ret2[1]);
            others.push(ret2[2]);
            housetypes.push(ret2[3]);
        }
    }
    res.send({
        prices: prices,
        sizes: sizes,
        ages: ages,
        floors: floors,
        pricepersizes: pricepersizes,
        set0s: set0s,
        set1s: set1s,
        citys: citys,
        areas: areas,
        others: others,
        housetypes: housetypes
    })
})

router.post('/Search2', async function(req, res, next) {
    let house = new web3.eth.Contract(contract.abi);
    house.options.address = req.body.HouseAddress;
    let ids = await house.methods.search(req.body.City, req.body.LowSize, req.body.UpSize, req.body.LowAge, req.body.UpAge, req.body.LowPrice, req.body.UpPrice).call();
    var prices = [];
    var sizes = [];
    var ages = [];
    var citys = [];
    var areas = [];
    var others = [];
    var set0s = [];
    var set1s = [];
    var pricepersizes = [];
    var housetypes = [];
    var floors = [];
    for (let id of ids) {
        if (id != 0) {
            let ret1 = await house.methods.getEntryPart1(id).call();
            prices.push(ret1[0]);
            sizes.push(ret1[1]);
            ages.push(ret1[2]);
            floors.push(ret1[3]);
            pricepersizes.push(ret1[4]);
            set0s.push(ret1[5]);
            set1s.push(ret1[6]);
            let ret2 = await house.methods.getEntryPart2(id).call();
            citys.push(ret2[0]);
            areas.push(ret2[1]);
            others.push(ret2[2]);
            housetypes.push(ret2[3]);
        }
    }
    res.send({
        prices: prices,
        sizes: sizes,
        ages: ages,
        floors: floors,
        pricepersizes: pricepersizes,
        set0s: set0s,
        set1s: set1s,
        citys: citys,
        areas: areas,
        others: others,
        housetypes: housetypes
    })
})

router.post('/Fix', function(req, res, next) {
    let house = new web3.eth.Contract(contract.abi);
    house.options.address = req.body.HouseAddress;
    house.methods.fix(req.body.Id, req.body.FixTotalPriceInput,
            req.body.FixTotalSizeInput, req.body.FixAgeInput,
            req.body.FixCityLocation, req.body.FixDistrictLocation, req.body.FixReminderLocation,
            req.body.FixRoomNumber, req.body.FixHallNumber,
            req.body.FixPricePerSizeInput, req.body.FixTypeInput,
            req.body.FixFloorInput).send({
            from: req.body.account,
            gas: 3400000
        })
        .on('receipt', function(receipt) {
            res.send(receipt);
        })
        .on('error', function(error) {
            res.send(error.toString());
        })
});

module.exports = router;