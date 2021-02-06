'use strict'

let AccountAddress = $('#AccountAddress');
let AccountAddressConfirmBut = $('#AccountAddressConfirmBut');
let AccountAddressCancelBut = $('#AccountAddressCancelBut');

let DeployContractAddresss = $('#DeployContractAddress');
let DeployedOldContractBut = $('#DeployedOldContractBut');

let DeployNewContractBut = $('#DeployNewContractBut');

let HouseOwnerAddressInput = $('#HouseOwnerAddressInput');
let HouseTotalPriceInput = $('#HouseTotalPriceInput');
let HouseTotalSizeInput = $('#HouseTotalSizeInput');
let HouseAgeInput = $('#HouseAgeInput');
let HousePricePerSizeInput = $('#HousePricePerSizeInput');
let HouseTypeInput = $('#HouseTypeInput');
let HouseRoomNumber = $('#HouseRoomNumber');
let HouseHallNumber = $('#HouseHallNumber');
let HouseCityLocation = $('#HouseCityLocation');
let HouseDistrictLocation = $('#HouseDistrictLocation');
let HouseReminderLocation = $('#HouseReminderLocation');
let HouseFloorInput = $('#HouseFloorInput');
let HouseInputCheck = $('#HouseInputCheck');

let SearchByPriceLow = $('#SearchByPriceLow');
let SearchByPriceUp = $('#SearchByPriceUp');
let Search1Check = $('#Search1Check');
let Search1Body = $('#Search1Body');
let Search1Result = $('#Search1Result');

let Search2City = $('#Search2City');
let Search2SizeLow = $('#Search2SizeLow');
let Search2SizeUp = $('#Search2SizeUp');
let Search2PricePerSizeLow = $('#Search2PricePerSizeLow');
let Search2PricePerSizeUp = $('#Search2PricePerSizeUp');
let Search2AgeLow = $('#Search2AgeLow');
let Search2AgeUp = $('#Search2AgeUp');
let Search2Check = $('#Search2Check');
let Search2Result = $('#Search2Result');
let Search2Body = $('#Search2Body');

let FixAccountAddress = $('#FixAccountAddress');
let FixAccountAddressConfirmBut = $('#FixAccountAddressConfirmBut');
let FixAccountAddressCancelBut = $('#FixAccountAddressCancelBut');

let Fix = $('#Fix');
let FixTotalPriceInput = $('#FixTotalPriceInput');
let FixTotalSizeInput = $('#FixTotalSizeInput');
let FixAgeInput = $('#FixAgeInput');
let FixPricePerSizeInput = $('#FixPricePerSizeInput');
let FixTypeInput = $('#FixTypeInput');
let FixRoomNumber = $('#FixRoomNumber');
let FixHallNumber = $('#FixHallNumber');
let FixCityLocation = $('#FixCityLocation');
let FixDistrictLocation = $('#FixDistrictLocation');
let FixReminderLocation = $('#FixReminderLocation');
let FixFloorInput = $('#FixFloorInput');
let FixInputCheck = $('#FixInputCheck')

let DeployAccount = "";
let HouseAddress = "";
let NowAccount = "";
let FixAccount = "";
//---------------------------------------------------------------------

$.get('/accounts', function(accounts) {
    for (let account of accounts) {
        AccountAddress.append(`<option value="${account}">${account}</option>`)
        FixAccountAddress.append(`<option value="${account}">${account}</option>`)
    }
    //DeployAccount = AccountAddress.val();
})

AccountAddressConfirmBut.on('click', async function() {
    DeployAccount = AccountAddress.val();
    //console.log(DeployAccount);
});

AccountAddressCancelBut.on('click', async function() {
    DeployAccount = "";
    //console.log(DeployAccount);
});

DeployedOldContractBut.on('click', function() {
    loadHouseContract(DeployContractAddresss.val());
    //console.log(DeployContractAddresss.val());
})

// 當按下部署合約時
DeployNewContractBut.on('click', function() {
    newHouseContract();
})

function loadHouseContract(address) {
    if (!(address === undefined || address === null || address === '')) {
        $.get('/contract', {
            address: address
        }, function(result) {
            if (result.house != undefined) {
                HouseAddress = address;
            } else {
                console.log(address, '載入失敗')
            }
        })
    } else {
        alert("請輸入已部署合約位置");
    }
}

async function newHouseContract() {

    $.post('/deploy', {
        account: DeployAccount
    }, function(result) {
        if (result.contractAddress) {
            HouseAddress = result.contractAddress;
            DeployContractAddresss.val(result.contractAddress);
        }
    })
}

HouseInputCheck.on('click', function() {
    if (!(HouseOwnerAddressInput.val() === undefined || HouseOwnerAddressInput.val() === "" || HouseOwnerAddressInput.val() === null) &&
        !(HouseTotalPriceInput.val() === undefined || HouseTotalPriceInput.val() === "" || HouseTotalPriceInput.val() === null) &&
        !(HouseTotalSizeInput.val() === undefined || HouseTotalSizeInput.val() === "" || HouseTotalSizeInput.val() === null) &&
        !(HouseAgeInput.val() === undefined || HouseAgeInput.val() === "" || HouseAgeInput.val() === null) &&
        !(HousePricePerSizeInput.val() === undefined || HousePricePerSizeInput.val() === "" || HousePricePerSizeInput.val() === null) &&
        !(HouseTypeInput.val() === undefined || HouseTypeInput.val() === "" || HouseTypeInput.val() === null) &&
        !(HouseRoomNumber.val() === undefined || HouseRoomNumber.val() === "" || HouseRoomNumber.val() === null) &&
        !(HouseHallNumber.val() === undefined || HouseHallNumber.val() === "" || HouseHallNumber.val() === null) &&
        !(HouseCityLocation.val() === undefined || HouseCityLocation.val() === "" || HouseCityLocation.val() === null) &&
        !(HouseDistrictLocation.val() === undefined || HouseDistrictLocation.val() === "" || HouseDistrictLocation.val() === null) &&
        !(HouseReminderLocation.val() === undefined || HouseReminderLocation.val() === "" || HouseReminderLocation.val() === null) &&
        !(HouseFloorInput.val() === undefined || HouseFloorInput.val() === "" || HouseFloorInput.val() === null)) {
        NowAccount = HouseOwnerAddressInput.val();
        $.post('/AddHouse', {
            HouseAddress: HouseAddress,
            account: NowAccount,
            HouseOwnerAddressInput: HouseOwnerAddressInput.val(),
            HouseTotalPriceInput: parseInt(HouseTotalPriceInput.val(), 10),
            HouseTotalSizeInput: parseInt(HouseTotalSizeInput.val(), 10),
            HouseAgeInput: parseInt(HouseAgeInput.val(), 10),
            HouseRoomNumber: parseInt(HouseRoomNumber.val(), 10),
            HouseHallNumber: parseInt(HouseHallNumber.val(), 10),
            HouseCityLocation: HouseCityLocation.val(),
            HouseDistrictLocation: HouseDistrictLocation.val(),
            HouseReminderLocation: HouseReminderLocation.val(),
            HousePricePerSizeInput: parseInt(HousePricePerSizeInput.val(), 10),
            HouseTypeInput: HouseTypeInput.val(),
            HouseFloorInput: parseInt(HouseFloorInput.val(), 10)
        }, function(result) {
            if (result.events !== undefined) {
                console.log("Add Success");
            } else {
                console.log("Fail");
            }
        });
    } else {
        alert("您尚未填寫完整!");
    }

});

Search1Check.on('click', function() {
    if (!(SearchByPriceLow.val() === undefined || SearchByPriceLow.val() === "" || SearchByPriceLow.val() === null) &&
        !(SearchByPriceUp.val() === undefined || SearchByPriceUp.val() === "" || SearchByPriceUp.val() === null)) {
        Search1Body.remove();
        Search1Result.append(`<tbody id=\"Search1Body\"></tbody>`);
        Search1Body = $('#Search1Body');
        $.post('Search1', {
            HouseAddress: HouseAddress,
            LowPrice: parseInt(SearchByPriceLow.val(), 10),
            UpPrice: parseInt(SearchByPriceUp.val(), 10)
        }, function(result) {
            for (var i = 0; i < result.prices.length; ++i) {
                Search1Body.append(`<tr><td>${result.citys[i]}</td><td>${result.areas[i]}</td><td>${result.others[i]}</td><td>${result.prices[i]}</td><td>${result.sizes[i]}</td><td>${result.ages[i]}</td><td>${result.set0s[i]}</td><td>${result.set1s[i]}</td><td>${result.pricepersizes[i]}</td><td>${result.housetypes[i]}</td><td>${result.floors[i]}</td></tr>`);
            }
        });
    } else {
        alert("您尚未填寫完整!");
    }
});

Search2Check.on('click', function() {
    if (!(Search2City.val() === undefined || Search2City.val() === "" || Search2City.val() === null) &&
        !(Search2SizeLow.val() === undefined || Search2SizeLow.val() === "" || Search2SizeLow.val() === null) &&
        !(Search2SizeUp.val() === undefined || Search2SizeUp.val() === "" || Search2SizeUp.val() === null) &&
        !(Search2PricePerSizeLow.val() === undefined || Search2PricePerSizeLow.val() === "" || Search2PricePerSizeLow.val() === null) &&
        !(Search2PricePerSizeUp.val() === undefined || Search2PricePerSizeUp.val() === "" || Search2PricePerSizeUp.val() === null) &&
        !(Search2AgeLow.val() === undefined || Search2AgeLow.val() === "" || Search2AgeLow.val() === null) &&
        !(Search2AgeUp.val() === undefined || Search2AgeUp.val() === "" || Search2AgeUp.val() === null)) {
        Search2Body.remove();
        Search2Result.append(`<tbody id=\"Search2Body\"></tbody>`);
        Search2Body = $('#Search2Body');
        $.post('Search2', {
            HouseAddress: HouseAddress,
            City: Search2City.val(),
            LowSize: parseInt(Search2SizeLow.val(), 10),
            UpSize: parseInt(Search2SizeUp.val(), 10),
            LowAge: parseInt(Search2AgeLow.val(), 10),
            UpAge: parseInt(Search2AgeUp.val(), 10),
            LowPrice: parseInt(Search2PricePerSizeLow.val(), 10),
            UpPrice: parseInt(Search2PricePerSizeUp.val(), 10)
        }, function(result) {
            for (var i = 0; i < result.prices.length; ++i) {
                Search2Body.append(`<tr><td>${result.citys[i]}</td><td>${result.areas[i]}</td><td>${result.others[i]}</td><td>${result.prices[i]}</td><td>${result.sizes[i]}</td><td>${result.ages[i]}</td><td>${result.set0s[i]}</td><td>${result.set1s[i]}</td><td>${result.pricepersizes[i]}</td><td>${result.housetypes[i]}</td><td>${result.floors[i]}</td></tr>`);
            }
        });
    } else {
        alert("您尚未填寫完整!");
    }
});

FixAccountAddressConfirmBut.on('click', async function() {
    FixAccount = FixAccountAddress.val();
    //console.log(DeployAccount);
});

FixAccountAddressCancelBut.on('click', async function() {
    FixAccount = "";
    //console.log(DeployAccount);
});

FixInputCheck.on('click', function() {
    if (!(Fix.val() === undefined || Fix.val() === null || Fix.val() === "") &&
        !(FixTotalPriceInput.val() === undefined || FixTotalPriceInput.val() === "" || FixTotalPriceInput.val() === null) &&
        !(FixTotalSizeInput.val() === undefined || FixTotalSizeInput.val() === "" || FixTotalSizeInput.val() === null) &&
        !(FixAgeInput.val() === undefined || FixAgeInput.val() === "" || FixAgeInput.val() === null) &&
        !(FixPricePerSizeInput.val() === undefined || FixPricePerSizeInput.val() === "" || FixPricePerSizeInput.val() === null) &&
        !(FixTypeInput.val() === undefined || FixTypeInput.val() === "" || FixTypeInput.val() === null) &&
        !(FixRoomNumber.val() === undefined || FixRoomNumber.val() === "" || FixRoomNumber.val() === null) &&
        !(FixHallNumber.val() === undefined || FixHallNumber.val() === "" || FixHallNumber.val() === null) &&
        !(FixCityLocation.val() === undefined || FixCityLocation.val() === "" || FixCityLocation.val() === null) &&
        !(FixDistrictLocation.val() === undefined || FixDistrictLocation.val() === "" || FixDistrictLocation.val() === null) &&
        !(FixReminderLocation.val() === undefined || FixReminderLocation.val() === "" || FixReminderLocation.val() === null) &&
        !(FixFloorInput.val() === undefined || FixFloorInput.val() === "" || FixFloorInput.val() === null)) {
        //NowAccount = HouseOwnerAddressInput.val();
        $.post('/Fix', {
            HouseAddress: HouseAddress,
            account: FixAccount,
            Id: parseInt(Fix.val(), 10),
            FixTotalPriceInput: parseInt(FixTotalPriceInput.val(), 10),
            FixTotalSizeInput: parseInt(FixTotalSizeInput.val(), 10),
            FixAgeInput: parseInt(FixAgeInput.val(), 10),
            FixRoomNumber: parseInt(FixRoomNumber.val(), 10),
            FixHallNumber: parseInt(FixHallNumber.val(), 10),
            FixCityLocation: FixCityLocation.val(),
            FixDistrictLocation: FixDistrictLocation.val(),
            FixReminderLocation: FixReminderLocation.val(),
            FixPricePerSizeInput: parseInt(FixPricePerSizeInput.val(), 10),
            FixTypeInput: FixTypeInput.val(),
            FixFloorInput: parseInt(FixFloorInput.val(), 10)
        }, function(result) {
            if (result.events !== undefined) {
                console.log("Fix Success");
            } else {
                console.log("Fail");
            }
        });
    } else {
        alert("您尚未填寫完整!");
    }

});