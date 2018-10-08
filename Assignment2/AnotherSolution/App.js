(function(){
  'use strict';

  angular.module('ShoppingListCheckOff', [])
  .controller('ToBuyController', ToBuyController)
  .controller('AlreadyBoughtController', AlreadyBoughtController)
  .provider('CheckOffService', CheckOffServiceProvider)
  .config(Config);

  Config.$inject = ['CheckOffServiceProvider'];
  function Config(CheckOffServiceProvider){
    CheckOffServiceProvider.defaults.toBuyList = [
      { name: "apple", quantity: '5' },
      { name: "banana", quantity: '10' },
      { name: "strawberry", quantity: '1 boxes' },
      { name: "blueberry", quantity: '3 boxes' },
      { name: "pinapple", quantity: '2' },
    ];
  };

  function CheckOffServiceProvider() {
    var provider = this;

    provider.defaults = {
      toBuyList: []
    };

    provider.$get = function(){
      var list = new CheckOffService(provider.defaults.toBuyList);
      return list;
    };
  };

  function CheckOffService(list){
    var service = this;


    var toBuyList = list;
    var boughtList = [];

    service.moveToBought = function(index) {
      if(index >= 0 && index < toBuyList.length) {
        var item = toBuyList.splice(index,1);
        boughtList.push(item[0]);
      }
    };

    service.getToBuyList = function(){
      console.log("toBuyList", toBuyList);
      return toBuyList;
    };

    service.getBoughtList = function(){
      console.log("boughtlist", boughtList);
      return boughtList;
    };


  }

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
