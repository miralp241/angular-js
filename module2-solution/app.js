(function() {
  'use strict';

  angular.module('ShoppingListCheckOff',[])
  .controller('ToBuyController',ToBuyController)
  .controller('AlreadyBoughtController',AlreadyBoughtController)
  .service('ShoppingListCheckOffService',ShoppingListCheckOffService);

  ToBuyController.$inject = ['ShoppingListCheckOffService'];
  function ToBuyController(ShoppingListCheckOffService){
    var buy = this;
    buy.toBuy= ShoppingListCheckOffService.getBuy();

    buy.bought = function(itemIndex){
      ShoppingListCheckOffService.bought(itemIndex);
    };

  }


  AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
  function AlreadyBoughtController(ShoppingListCheckOffService){
    var bought = this;
    bought.items = ShoppingListCheckOffService.getItems();
  }



  function ShoppingListCheckOffService(){
    var service = this;

    var toBuy = [{ name: "cookies", quantity: 10 },{ name: "chips", quantity: 5 },{ name: "cold drink", quantity: 2 },
    { name: "chocolates", quantity: 20 },{ name: "maggie", quantity: 8 }];

    var items =[];

    service.bought = function(itemIndex){
      var item ={
        name : toBuy[itemIndex].name,
        quantity : toBuy[itemIndex].quantity
      };
      items.push(item);

      toBuy.splice(itemIndex,1);

    };

    service.getBuy = function () {
      return toBuy;
    };

    service.getItems = function () {
      return items;
    };
  }

})();
