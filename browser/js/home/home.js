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
  
 //  $scope.infoArray = [
 //  {
 //      icon: './img/icons/facebook.jpg',
 //      title: 'Build backend',
 //      link: 'http://www.facebook.com',
 //      owner: 'Peter',
 //      status: 'blocked',
 //      ttc: 8,
 //      parents: [],
	//       children: [
	//       {
	//       icon: './img/icons/facebook.jpg',
	//       title: 'Create user schema',
	//       link: 'http://www.facebook.com',
	//       owner: 'Lorence',
	//       ttc: 4,
	//       status: 'blocked',
	//       parents: ['Build Backend'],
	//       children: [{
	// 	      icon: './img/icons/gmail.jpg',
	// 	      title: 'Do basic user research',
	// 	      link: 'http://www.gmail.com',
	// 	      owner: 'Jin',
	// 	      ttc: 4,
	// 	      status: 'process',
	// 	      parents: ['create user schema'],
	// 	      children: []
	// 		}]
	//     }
	//     ]
 //    }, {
 //      icon: './img/icons/youtube.jpg',
 //      title: 'Add user oauth functionality',
 //      link: 'http://www.youtube.com',
 //      owner: 'Jenny',
 //      ttc: 3,
 //      status: 'process',
 //      parents: [],
 //      children: []
 //    },
 //    {
 //      icon: './img/icons/facebook.jpg',
 //      title: 'Create user schema',
 //      link: 'http://www.facebook.com',
 //      owner: 'Lorence',
 //      status: 'blocked',
 //      ttc: 4,
 //      parents: [],
 //      children: []
 //    }, {
 //      icon: './img/icons/youtube.jpg',
 //      title: 'Create item middleware',
 //      link: 'http://www.youtube.com',
 //      owner: 'Amber',
 //      ttc: 16,
 //      status: 'finished',
 //      parents: [],
 //      children: []
 //    }, {
 //      icon: './img/icons/gmail.jpg',
 //      title: 'Get awesome Pictures',
 //      link: 'http://www.gmail.com',
 //      owner: 'Jin',
 //      ttc: 4,
 //      status: 'open',
 //      parents: [],
 //      children: []
 //    },{
 //      icon: './img/icons/gmail.jpg',
 //      title: 'Do basic user research',
 //      link: 'http://www.gmail.com',
 //      owner: 'Jin',
 //      ttc: 4,
 //      status: 'process',
 //      parents: ['create user schema'],
 //      children: []
	// }];

	$scope.infoArray = [
  {
      icon: './img/icons/facebook.jpg',
      title: 'Build backend',
      link: 'http://www.facebook.com',
      owner: 'Peter',
      status: 'blocked',
      ttc: 8,
      parents: [],
	      children: [
	      {
	      icon: './img/icons/facebook.jpg',
	      title: 'Create user schema',
	      link: 'http://www.facebook.com',
	      owner: 'Lorence',
	      ttc: 4,
	      status: 'blocked',
	      parents: ['Build Backend'],
	      children: [{
		      icon: './img/icons/gmail.jpg',
		      title: 'Do basic user research',
		      link: 'http://www.gmail.com',
		      owner: 'Jin',
		      ttc: 4,
		      status: 'process',
		      parents: ['create user schema'],
		      children: []
			}]
	    }
	    ]
    }, {
      icon: './img/icons/youtube.jpg',
      title: 'Add user oauth functionality',
      link: 'http://www.youtube.com',
      owner: 'Jenny',
      ttc: 3,
      status: 'process',
      parents: [],
      children: []
    }, {
      icon: './img/icons/youtube.jpg',
      title: 'Create item middleware',
      link: 'http://www.youtube.com',
      owner: 'Amber',
      ttc: 16,
      status: 'finished',
      parents: [],
      children: []
    }, {
      icon: './img/icons/gmail.jpg',
      title: 'Get awesome Pictures',
      link: 'http://www.gmail.com',
      owner: 'Jin',
      ttc: 4,
      status: 'open',
      parents: [],
      children: []
    }];

  // $scope.list1 = [$scope.infoArray[0], $scope.infoArray[1], $scope.infoArray[2]];
  // $scope.list2 = [$scope.infoArray[3], $scope.infoArray[4]];
  // $scope.list3 = [];
  // $scope.list4 = [];
  
  $scope.list1 = []; //blocked
  $scope.list2 = []; //open
  $scope.list3 = []; //process
  $scope.list4 = []; //finished

  function assignTasks (array){

  	for(var a = 0, len = array.length; a< len; a++){
  		switch ( array[a].status ) {
  			case 'blocked':
  				$scope.list1.push(array[a]) //task is blocked
  				break;
			case 'process':
  				$scope.list3.push(array[a]) //task is process
  				break;
  			case 'finished':
  				$scope.list4.push(array[a]) //task is finished
  				break;
  			default:
  				$scope.list2.push(array[a]) //default on open
  				break;
  		}
	  	if(array[a].children){
	  		console.log('going deeper with ', array[a].title);
	  		array[a].children.forEach(function(node){
	  			assignTasks(node);
	  		});
	  	}
	  	console.log('finished accessing array ', array[a].title);
	};
	console.log('going up or done..');
	return;
  };

  assignTasks($scope.infoArray);

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

  //find parents
  $scope.rootItem;
  function setParents (){

  	$scope.infoArray.forEach(function(node){
  		if(!node.parents){
  			$scope.rootItem.push(node);
  		}
  	});
  	$scope.items = $scope.rootItem.children;
  }

  setParents();

  // $scope.rootItem = {
  //   title: '', //is the main, necessary for overall spacing and objective
  //   children: [$scope.infoArray[0], {
  //     title:'Task 2',
  //     children: [$scope.infoArray[3], 
  //     $scope.infoArray[4]
  //     ]},
  //     $scope.infoArray[1]]
  // };

  
  
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
