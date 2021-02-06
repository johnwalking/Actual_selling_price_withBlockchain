pragma solidity ^0.4.24;


contract HousePrice{

    address admin;
    constructor () public{
        admin = msg.sender;
     }

    uint houseLength = 1;

    struct House{
        address houseOwner;
        uint256 price;
        uint256 size;
        uint256 age;

        string city;    //縣市
        string area;    //鄉鎮市區
        string other ; //ex:幾鄰幾號

        uint256 set0;       //房 廳
        uint256 set1;

        uint256 pricepersize;
        string housetype;   //公寓 大樓
        uint256 floor;         //樓層

    }

    mapping(uint => House) houses;

    event getAverageprice(uint averageprice);


    event getHouse(

        uint256 price, //價格
        uint256 size,            //坪數
        uint256 age,             // 屋齡
        string city,          //縣市 ex:台北市
        string area,        //鄉鎮市區 ex: 文山區
        string other,
        uint256 pricepersize,    // 單坪價格

        uint256 set0,
        uint256 set1,//房 廳 衛

        string housetype,      //型態:套房 公寓 大樓 社區
        uint256 floor);          // 樓層

   //insert a data
   function addEntry (uint256 _price, uint256 _size, uint256 _age, uint256 _a, uint256 _b, string _city, string _area, string _other, uint256 _pricepersize, string _housetype, uint256 _floor) public {

    houses[houseLength].houseOwner = msg.sender;

    houses[houseLength].price = _price;

    houses[houseLength].size = _size;
    houses[houseLength].age = _age;

    houses[houseLength].city = _city;
    houses[houseLength].area = _area;
    houses[houseLength].other = _other;

    houses[houseLength].set0 = _a;
    houses[houseLength].set1 = _b;

    houses[houseLength].pricepersize = _pricepersize;
    houses[houseLength].housetype = _housetype;
    houses[houseLength].floor = _floor;

    houseLength += 1;

   }

   //get the total length
   function  getLengeth() public constant returns (uint) {
       return  houseLength;
   }

   function getEntryPart1(uint _id) public returns (uint256, uint256, uint256, uint256, uint256, uint256, uint256) {
    return (houses[_id].price, houses[_id].size, houses[_id].age, houses[_id].floor, houses[_id].pricepersize, houses[_id].set0, houses[_id].set1);
   }

   function getEntryPart2(uint _id) public returns (string, string, string, string) {
    return (houses[_id].city, houses[_id].area, houses[_id].other, houses[_id].housetype);
   }
   //average the pricepersize of certain city  and  area in city
   function averagePrice(string _city, string _area) public {

        uint sum = 0;
        uint count = 0;
        for (uint i = 0; i<houseLength; i++) {
            if(keccak256(abi.encodePacked(houses[i].city)) == keccak256(abi.encodePacked(_city)) && keccak256(abi.encodePacked(houses[i].area)) == keccak256(abi.encodePacked(_area))){

                sum += houses[i].pricepersize;
                count += 1;
            }

        }
    emit getAverageprice (sum/count);
   }
   //average the pricepersize of certain city
   function averagePriceCity(string _city) public {

        uint sum = 0;
        uint count = 0;
        for (uint i = 0;i<houseLength;i++){
            if(keccak256(abi.encodePacked(houses[i].city)) == keccak256(abi.encodePacked(_city))){

                sum += houses[i].pricepersize;
                count += 1;
            }

        }
        emit getAverageprice(sum/count);
   }

    function searchByPrice(uint256 low, uint256 high) public view returns(uint[]) {

        uint256[] memory x = new uint256[](20);
        uint256 k = 0;
        for(uint i = 1;i<houseLength;i++){
            if(houses[i].price>=low && houses[i].price<=high){
                //getEntry(i);
                x[k] = i;
                k += 1;
                if(k==20){
                    break;
                }
            }
        }
        return x;
    }
    //_city :縣市, lsize :最低坪數 rsize: 最高坪數 lage:最低屋齡 rage:最高屋齡 lpriceperszie:最低單坪價格 rpricepersize:最高單坪價格
    function search(string _city, uint lsize, uint256 rsize, uint256 lage, uint256 rage, uint256 lpriceperszie, uint256 rpricepersize) public view returns (uint[]) {

        uint[] memory x = new uint[](20);
        uint k = 0;
        for(uint i = 0;i<houseLength;i++){
            if(keccak256(abi.encodePacked(houses[i].city)) == keccak256(abi.encodePacked(_city))&&
            houses[i].pricepersize>=lpriceperszie && houses[i].pricepersize<=rpricepersize&&
            houses[i].size>=lsize && houses[i].size<=rsize&&
            houses[i].age>=lage&&houses[i].age<=rage
            ){
                x[k] = i;
                k += 1;
                if(k==20){
                    break;
                }
            }

        } return x;


    }
    //fix the wrong data
    function fix(uint256 _id, uint256 _price, uint256 _size, uint256 _age, string _city, string _area, string _other, uint256 _a, uint256 _b , uint256 _pricepersize, string _housetype, uint256 _floor) public {
        require(msg.sender == admin);
    houses[_id].price = _price;
    houses[_id].age = _age;
    houses[_id].size = _size;

    houses[_id].city = _city;
    houses[_id].area = _area;
    houses[_id].other = _other;

    houses[_id].set0 = _a;
    houses[_id].set1 = _b;

    houses[_id].pricepersize = _pricepersize;
    houses[_id].housetype = _housetype;
    houses[_id].floor = _floor;

   }

}


