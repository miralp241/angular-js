(function() {
  'use strict';

  angular.module('ShoppingListCheckOff',[])
  .controller('ToBuyController',ToBuyController)
  .controller('AlreadyBoughtController',AlreadyBoughtController)
  .service('ShoppingListCheckOffService',ShoppingListCheckOffService);

  ToBuyController.$inject = ['ShoppingListCheckOffService'];
  function ToBuyController(ShoppingListCheckOffService){
    var buy = this;
    buy.toBuy= [{ name: "cookies", quantity: 10 },{ name: "chips", quantity: 5 },{ name: "cold drink", quantity: 2 },
    { name: "chocolates", quantity: 20 },{ name: "maggie", quantity: 8 }];

    buy.bought = function(itemIndex){
      var item = buy.toBuy[itemIndex]
      ShoppingListCheckOffService.bought(item);
      buy.toBuy.splice(itemIndex,1);
    }

  }


  AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
  function AlreadyBoughtController(ShoppingListCheckOffService){
    var bought = this;
    bought.items = ShoppingListCheckOffService.getItems();
  }



  function ShoppingListCheckOffService(){
    var service = this;

    var items =[];

    service.bought = function(item){
      var item ={
        name : item.name,
        quantity : item.quantity
      };
      items.push(item);
    };

    service.getItems = function () {
      return items;
    };
  }

})();
