(function(){
  'use strict';

  angular.module('ShoppingListCheckOff', [])
  .controller('ToBuyController', ToBuyController)
  .controller('AlreadyBoughtController', AlreadyBoughtController)
  .service('CheckOffService', ShoppingListCheckOffService)

  function ShoppingListCheckOffService(){
    var service = this;

    var toBuyList = [
      { name: "apple", quantity: 5 },
      { name: "banana", quantity: 10 },
      { name: "pear", quantity: 4 },
      { name: "watermelon", quantity: 1 },
      { name: "pinapple", quantity: 2 },
    ];
    var boughtList = [];

    service.moveToBought = function(index) {
      if(index >= 0 && index < toBuyList.length) {
        var item = toBuyList.splice(index,1);
        boughtList.push(item[0]);
      }
    };

    service.getToBuyList = function(){
      return toBuyList;
    };

    service.getBoughtList = function(){
      return boughtList;
    };
  };

  ToBuyController.$inject = ['CheckOffService'];
  function ToBuyController(CheckOffService){
    var list = this;

    list.items = CheckOffService.getToBuyList();

    list.moveToBought = function(index) {
      CheckOffService.moveToBought(index);
    };


  };

  AlreadyBoughtController.$inject = ['CheckOffService'];
  function AlreadyBoughtController(CheckOffService){
    var list = this;

    list.items = CheckOffService.getBoughtList();
    list.emptyListMsg = "Nothing bought yet";
  };

})();
