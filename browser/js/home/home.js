'use strict';
app.config(function ($stateProvider) {

    $stateProvider.state('home', {
        url: '/',
        controller: 'HomeCtrl',
        templateUrl: 'js/home/home.html'
    });

});

app.controller('HomeCtrl', function ($scope) {

	//have list of items
	//ability to add and remove items
	//---A
	//ability to drag and drop across a range of items

	//--B
	//can see same items in tree

	//both can respond to user input, and will change the other proportionally
  
  var tmpList = [];
  
  $scope.rawScreens = [
    [{
      icon: './img/icons/facebook.jpg',
      title: 'Build backend',
      link: 'http://www.facebook.com',
      owner: 'Peter'
    }, {
      icon: './img/icons/youtube.jpg',
      title: 'Add user oauth functionality',
      link: 'http://www.youtube.com',
      owner: 'Jenny'
    }],
    [{
      icon: './img/icons/facebook.jpg',
      title: 'Create user schema',
      link: 'http://www.facebook.com',
      owner: 'Lorence'
    }, {
      icon: './img/icons/youtube.jpg',
      title: 'Create item middleware',
      link: 'http://www.youtube.com',
      owner: 'Amber'
    }, {
      icon: './img/icons/gmail.jpg',
      title: 'Get awesome Pictures',
      link: 'http://www.gmail.com',
      owner: 'Jin'
    }],
    [],
    []
  ];
  
  $scope.list1 = $scope.rawScreens[0];
  $scope.list2 = $scope.rawScreens[1];
  $scope.list3 = $scope.rawScreens[2];
  $scope.list4 = $scope.rawScreens[3];
  
  $scope.sortingLog = [];
  
  $scope.sortableOptions = {
    placeholder: "app",
    connectWith: ".apps-container"
  };
  
  $scope.logModels = function () {
    $scope.sortingLog = [];
    for (var i = 0; i < $scope.rawScreens.length; i++) {
      var logEntry = $scope.rawScreens[i].map(function (x) {
        return x.title;
      }).join(', ');
      logEntry = 'container ' + (i+1) + ': ' + logEntry;
      $scope.sortingLog.push(logEntry);
    }
  };



  //part 2 the tree

  $scope.rootItem = {
    title: 'Root Item',
    items: [{
      title:'Item 1',
      items: []
    }, {
      title:'Item 2',
      items: [{
        title:'Item 2.1', items: []
      }, {
        title:'Item 2.2', items: []
      }]
    }]
  };

  $scope.items = $scope.rootItem.items;
  
  $scope.sortingLog = [];
  
  $scope.sortableOptions = {
    connectWith: ".apps-container",
  };

  $scope.getView = function (item) {
      /*
        you can return a different url
        to load a different template dynamically
        based on the provided item 
        */
      if (item) {
        return 'nestable_item.html';
      }
      return null;
  };


});
