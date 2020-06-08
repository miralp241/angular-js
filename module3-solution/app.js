(function() {
  'use strict';

  angular.module('NarrowItDownApp', [])
  .controller('NarrowItDownController', NarrowItDownController)
  .service('MenuSearchService', MenuSearchService)
  .constant('ApiBasePath', 'https://davids-restaurant.herokuapp.com')
  .directive('foundItems', FoundItemsDirective);


  function FoundItemsDirective(){
    var ddo ={
      templateUrl : 'foundItems.html',
      scope : {
        items : '<',
        onRemove : '&'
      },
      controller : FoundItemsDirectiveController,
      controllerAs : 'dir',
      bindToController : true
    };
    return ddo;
  }


  function FoundItemsDirectiveController() {
    var dir = this;

    dir.isNothingFound = function () {
      if(dir.items.length === 0){
        return true;
      }
      return false;
    };
  }


  NarrowItDownController.$inject = ['MenuSearchService'];
  function NarrowItDownController(MenuSearchService) {
    var menu = this;
    //menu.res="";
    menu.searchTerm = "";
    menu.ans = MenuSearchService.getItems();

    menu.found = function() {
      menu.res = "";
      if(menu.searchTerm === ""){
        menu.res = "Nothing found!";
      }
        MenuSearchService.getMatchedMenuItems(menu.searchTerm)
        .then(function(result) {
          menu.ans = result;
          if(menu.ans.length === 0 || menu.searchTerm === ""){
            menu.res = "Nothing found!";
          }
        });
    };
    menu.removeItem = function(itemIndex) {
      MenuSearchService.removeItem(itemIndex);
    };

  }


  MenuSearchService.$inject = ['$http', 'ApiBasePath'];
  function MenuSearchService($http, ApiBasePath) {
    var service = this;
    var foundItems = [];

    service.getMatchedMenuItems = function(searchTerm) {
      foundItems.splice(0, foundItems.length);
      if (searchTerm === "") {
      return foundItems;
      }
      var response = $http({
        method : "GET",
        url : (ApiBasePath + "/menu_items.json")
        //,
        // params : {
        //   category : searchTerm
        // }
      }).then(
        function(result){
          var items = result.data.menu_items;
          foundItems.splice(0, foundItems.length);
          for (var i = 0; i < items.length; i++) {
            if(items[i].description.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1){
              foundItems.push(items[i]);
            }
          }
          return foundItems;
        });
      return response;
    };

    service.removeItem = function(itemIndex) {
      foundItems.splice(itemIndex, 1);
    };

    service.getItems = function() {
      return foundItems;
    };
}


})();
