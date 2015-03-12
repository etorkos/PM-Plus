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
      owner: 'Peter',
      ttc: 8,
      parents: [],
      children: []
    }, {
      icon: './img/icons/youtube.jpg',
      title: 'Add user oauth functionality',
      link: 'http://www.youtube.com',
      owner: 'Jenny',
      ttc: 3,
      parents: [],
      children: []
    }],
    [{
      icon: './img/icons/facebook.jpg',
      title: 'Create user schema',
      link: 'http://www.facebook.com',
      owner: 'Lorence',
      ttc: 4,
      parents: [],
      children: []
    }, {
      icon: './img/icons/youtube.jpg',
      title: 'Create item middleware',
      link: 'http://www.youtube.com',
      owner: 'Amber',
      ttc: 16,
      parents: [],
      children: []
    }, {
      icon: './img/icons/gmail.jpg',
      title: 'Get awesome Pictures',
      link: 'http://www.gmail.com',
      owner: 'Jin',
      ttc: 4,
      parents: [],
      children: []
    }]
  ];
  
  // $scope.infoArray = [
  //   [{
  //     icon: './img/icons/facebook.jpg',
  //     title: 'Build backend',
  //     link: 'http://www.facebook.com',
  //     owner: 'Peter',
  //     ttc: 8,
  //     parents: [],
  //     children: []
  //   }, {
  //     icon: './img/icons/youtube.jpg',
  //     title: 'Add user oauth functionality',
  //     link: 'http://www.youtube.com',
  //     owner: 'Jenny',
  //     ttc: 3,
  //     parents: [],
  //     children: []
  //   },
  //   {
  //     icon: './img/icons/facebook.jpg',
  //     title: 'Create user schema',
  //     link: 'http://www.facebook.com',
  //     owner: 'Lorence',
  //     ttc: 4,
  //     parents: [],
  //     children: []
  //   }, {
  //     icon: './img/icons/youtube.jpg',
  //     title: 'Create item middleware',
  //     link: 'http://www.youtube.com',
  //     owner: 'Amber',
  //     ttc: 16,
  //     parents: [],
  //     children: []
  //   }, {
  //     icon: './img/icons/gmail.jpg',
  //     title: 'Get awesome Pictures',
  //     link: 'http://www.gmail.com',
  //     owner: 'Jin',
  //     ttc: 4,
  //     parents: [],
  //     children: []
  //   }];


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
    title: '', //is the main, necessary for overall spacing and objective
    children: [{
      title:'Task 1',
      children: []
    }, {
      title:'Task 2',
      children: [{
        title:'Task 3', children: []
      }, {
        title:'Task 4', children: []
      }]},
      {
      title: 'Task 5',
      children: []
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
