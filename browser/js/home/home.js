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
  $scope.list1 = []; //blocked
  $scope.list2 = []; //open
  $scope.list3 = []; //process
  $scope.list4 = []; //finished

	$scope.infoArray = [
  {
      icon: './img/icons/facebook.jpg',
      title: 'Build backend',
      link: 'http://www.facebook.com',
      owner: 'Peter',
      status: 'blocked',
      ttc: 8,
      parents: [],
      locked: true,
	  children: [
	      {
	      icon: './img/icons/facebook.jpg',
	      title: 'Create user schema',
	      link: 'http://www.facebook.com',
	      owner: 'Lorence',
	      ttc: 4,
	      status: 'blocked',
	      locked: true,
	      parents: ['Build Backend'],
	      children: [{
		      icon: './img/icons/gmail.jpg',
		      title: 'Do basic user research',
		      link: 'http://www.gmail.com',
		      owner: 'Jin',
		      ttc: 4,
		      status: 'process',
		      locked: false,
		      parents: ['create user schema'],
		      children: []
		  }]
	    }]}, 
	 {
      icon: './img/icons/youtube.jpg',
      title: 'Add user oauth functionality',
      link: 'http://www.youtube.com',
      owner: 'Jenny',
      ttc: 3,
      status: 'process',
      parents: [],
      locked: false,
      children: []
    }, {
      icon: './img/icons/youtube.jpg',
      title: 'Create item middleware',
      link: 'http://www.youtube.com',
      owner: 'Amber',
      ttc: 16,
      status: 'finished',
      parents: [],
      locked: false,
      children: []
    }, {
      icon: './img/icons/gmail.jpg',
      title: 'Get awesome Pictures',
      link: 'http://www.gmail.com',
      owner: 'Jin',
      ttc: 4,
      status: 'open',
      parents: [],
      locked: false,
      children: []
    }];
  
  

  function assignT (node){
  	switch ( node.status ) {
  			case 'blocked':
  				$scope.list1.push(node) //task is blocked
  				break;
			case 'process':
  				$scope.list3.push(node) //task is process
  				break;
  			case 'finished':
  				$scope.list4.push(node) //task is finished
  				break;
  			default:
  				$scope.list2.push(node) //default on open
  				break;
  		}
  		return;
  }

  function assignTasks (array){
  	// debugger;
  	var resolved = false;
  	// if(array.title){
  	 	// console.log('entered loop with ',array.title); //for debugging
  	// }
  	if(!array.length){
  		assignT(array);
  		if(array.children){
  			array.children.forEach(function(node){
	  			// console.log(node.title, ' is going into the rabbit hole!');
	  			assignTasks(node);
	  		});
  		}
  		return;
  	}

  	var len = array.length ? array.length : 1;
  	for(var a = 0; a< len; a++){
  		assignT(array[a]);
  		// debugger;
	  	if(array[a].children){
	  		// console.log('going deeper with ', array[a].title);
	  		array[a].children.forEach(function(node){
	  			// console.log(node.title, ' is going into the rabbit hole!');
	  			assignTasks(node);
	  		});
	  	}
	  	// console.log('finished accessing array ', array[a].title);
	};
	// console.log('going up or done..');
	return;
  };


  assignTasks($scope.infoArray); //convert array into list

  $scope.sortingLog = [];
  $scope.sortableOptions = {
    placeholder: "app",
    connectWith: ".apps-container"
  };
  
  $scope.logModels = function () {
    $scope.sortingLog = [];
    for (var i = 1; i < 5; i++) {
      var logEntry = $scope['list'+i].map(function (x) {
        return x.title;
      }).join(', ');
      logEntry = 'container ' + (i) + ': ' + logEntry;
      $scope.sortingLog.push(logEntry);
    }
  };

  //part 2 the tree

  //find parents
  $scope.rootItem = [];
  function setParents (){
  	$scope.rootItem = []; //hard reset
  	$scope.infoArray.forEach(function(node){
  		// console.log('node', node);
  		if(node.parents.length === 0){
  			debugger;
  			$scope.rootItem.push(node);
  		}
  	});
  	// console.log('scope.rootitem ', $scope.rootItem)
  	$scope.rootItem = {title:'', children: $scope.rootItem};
  	$scope.items = $scope.rootItem;

  // console.log('test shape', $scope.rootItem);
  }

  setParents(); 
  
  $scope.sortingLog = [];
  
  $scope.sortableOptions = {
  	stop: function(e, ui){
  		// push to infoArray, reset values from updated info
  		 console.log('e', e, 'ui', ui)
  		// //if lists were updated
  		// $scope.infoArray = $scope.list1.concat($scope.list2, $scope.list3, $scope.list4);
  		// setParents(); 
  		//if Tree was updated

  	},
    connectWith: ".apps-container",
     items: "div:not(.not-sortable)"
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
