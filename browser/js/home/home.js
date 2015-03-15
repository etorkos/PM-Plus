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
  {	id:1,
      icon: './img/icons/facebook.jpg',
      title: 'Build backend',
      link: 'http://www.facebook.com',
      owner: 'Evan',
      status: 'blocked',
      ttc: 8,
      parents: [],
      locked: true,
	  children: [
	      {
	      	id:2,
	      icon: './img/icons/facebook.jpg',
	      title: 'Create user schema',
	      link: 'http://www.facebook.com',
	      owner: 'Evan',
	      ttc: 4,
	      status: 'blocked',
	      locked: true,
	      parents: [1],
	      children: [{
	      	id:3,
		      icon: './img/icons/gmail.jpg',
		      title: 'Do basic user research',
		      link: 'http://www.gmail.com',
		      owner: 'Evan',
		      ttc: 4,
		      status: 'process',
		      locked: false,
		      parents: [2],
		      children: []
		  }]
	    }]}, 
	 {
	 id:4,
      icon: './img/icons/youtube.jpg',
      title: 'Add user / oauth functionality',
      link: 'http://www.youtube.com',
      owner: 'Evan',
      ttc: 3,
      status: 'process',
      parents: [],
      locked: false,
      children: []
    }, {
    	id:5,
      icon: './img/icons/youtube.jpg',
      title: 'Create item middleware',
      link: 'http://www.youtube.com',
      owner: 'Evan',
      ttc: 16,
      status: 'finished',
      parents: [],
      locked: false,
      children: []
    }, {
    	id: 6,
      icon: './img/icons/gmail.jpg',
      title: 'Improve UI',
      link: 'http://www.gmail.com',
      owner: 'Evan',
      ttc: 10,
      status: 'open',
      parents: [],
      locked: false,
      children: []
    },{
    	id: 7,
      icon: './img/icons/gmail.jpg',
      title: 'Make the tree dynamically change rules for the list',
      link: 'http://www.gmail.com',
      owner: 'Evan',
      ttc: 4,
      status: 'open',
      parents: [],
      locked: false,
      children: []
    },{
    	id: 8,
      icon: './img/icons/gmail.jpg',
      title: 'Make a dynamic tree',
      link: 'http://www.gmail.com',
      owner: 'Evan',
      ttc: 3,
      status: 'finished',
      parents: [],
      locked: false,
      children: []
    },{
    	id: 9,
      icon: './img/icons/gmail.jpg',
      title: 'Make an interactive list with lockable features',
      link: 'http://www.gmail.com',
      owner: 'Evan',
      ttc: 6,
      status: 'finished',
      parents: [],
      locked: false,
      children: []
    },
    ];
  
  $scope.addThing = function(){
  	alert('Feature not yet added');
  }

  function assignT (node){ //doing the actual assinging of nodes to a task list
  	var myStatus = false;
  	switch ( node.status ) {
  			case 'blocked':
  				$scope.list1.push(node) //task is blocked
  				break;
			case 'process':
  				$scope.list3.push(node) //task is process
  				break;
  			case 'finished':
  				$scope.list4.push(node) //task is finished
  				myStatus = true;
  				break;
  			default:
  				$scope.list2.push(node) //default on open
  				break;
  		}
  		return myStatus;
  }

  function assignTasks (array){
  	// debugger;
  	var myChildStatus = true; //start off with open (not blocked)
  	if(!array.length){
  		// debugger;
  		if(array.children){ //if the node has children
  			array.children.forEach(function(node){
	  			var childStatus = assignTasks(node);
	  			if(myChildStatus && !childStatus){ //if a child is blocking
	  				myChildStatus = false;
	  			}
	  		});
  		}
  		checkLock(array, myChildStatus);
  		assignT(array);
  		return array.status === 'finished';
  	}
  	var len = array.length ? array.length : 1;
  	for(var a = 0; a< len; a++){ //cycle through all items in the array
  		// debugger;
  		var myChildStatus = true;
	  	if(array[a].children){
	  		array[a].children.forEach(function(node){
	  			var childStatus = assignTasks(node);
	  			if(myChildStatus && !childStatus){
	  				myChildStatus = false;
	  			}
	  		});
	  	}
	  	checkLock(array[a], myChildStatus);
	  	assignT(array[a]);
	};
	return array.status === 'finished';
  };

  function checkLock (node, childStatus){
  	if(node.status == 'blocked' && childStatus){ //if it was blocked and children no longer block, it will be open
		console.log(node.title, " is being un-blocked");
		node.status = 'open';
		node.locked = false;
	}
	else if(node.status != 'blocked' && !childStatus){ //if a child is addded which blocks, block the parent
		console.log(node.title, " is being blocked");
		node.status = 'blocked';
		node.locked = true;
	}
  }
  
  // function update(){ //updates display, sets parents from lists, how to capture information about tree update?
  // 	//uses location from 
  // 	function recursion(node, ){
  // 		if(node.children){ //if you have children, go to them first

  // 		}
  // 		//if you should be blocked, block item,
  // 		//if you should be unblocked, unblock item
  // 		//return status as blocked or unblocked
  // 	}
  // 	$scope.list1.forEach(function(node){//should i be combined with setparents?

  // 	})

  // }

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

  
  function setParents (){
  	$scope.rootItem = []; //hard reset
  	$scope.infoArray.forEach(function(node){
  		// console.log('node', node);
  		if(node.parents.length === 0){
  			// debugger;
  			$scope.rootItem.push(node);
  		}
  	});
  	// console.log('scope.rootitem ', $scope.rootItem)
  	$scope.rootItem = {title:'', children: $scope.rootItem};
  	$scope.items = $scope.rootItem;
  }

  //--//--//--//--//--//--//
  //startup process
  assignTasks($scope.infoArray); //convert array into list
  $scope.sortingLog = [];
  $scope.sortableOptions = {
    placeholder: "app",
    connectWith: ".apps-container"
  };
  $scope.rootItem = [];
  setParents(); 
  $scope.sortingLog = [];
  //--//--//--//--//--//--//

	function arrayObjectIndexOf(myArray, searchTerm, property) {
	    for(var i = 0, len = myArray.length; i < len; i++) {
	    	console.log(searchTerm, myArray[i][property])
	        if (myArray[i][property] === searchTerm) return i;
	    }
	    return -1;
	}

  function swap (item, fromLocation){ //pass in list1[index]
  	console.log('into swap');
  	console.log(arrayObjectIndexOf($scope.list1, item, 'id') > -1);
  	console.log(arrayObjectIndexOf($scope.list4, item, 'id') > -1);
  	if(fromLocation == 4){ //will do later

  	}

  	if(arrayObjectIndexOf($scope.list1, item, 'id') > -1){ //if object came back to blocked
  		console.log('item moved to list one');
  		var objSwap = $scope.list1[arrayObjectIndexOf($scope.list1, item, 'id')];
  		objSwap.locked = false;
  		objSwap.status = 'open';
  		return;
  	}
  	else if(arrayObjectIndexOf($scope.list4, item, 'id') > -1){ //if object landed at finished tasks
  		console.log('item moved to list 4');
  		var objSwap = $scope.list4[arrayObjectIndexOf($scope.list4, item, 'id')];
  		objSwap.locked = false;
  		objSwap.status = 'finished';
  		// console.log('main object', objSwap);
  		if(objSwap.parents && arrayObjectIndexOf($scope.list1, objSwap.parents[0], 'id') != -1) {
  			// console.log('statement is true!?!', arrayObjectIndexOf($scope.list1, objSwap.parents[0], 'id') != -1);
  			// console.log('location of parent ', arrayObjectIndexOf($scope.list1, objSwap.parents[0], 'id'));
  			var parent = $scope.list1.splice(arrayObjectIndexOf($scope.list1, objSwap.parents[0], 'id'), 1)[0];
  			// console.log('parent object', parent);
  			parent.locked = false;
  			parent.status = 'open';
  			$scope.list2.push(parent);
  		}
  		return;
  	}

  }

  $scope.sortableOptions = {
  	stop: function(e, ui){
  		// push to infoArray, reset values from updated info
  		console.log('e', e, 'ui', ui)
  		var objInfo=ui.item[0].attributes[1].value.split('-');
  		console.log('Item', objInfo[0], " moved from ", objInfo[1]);
  		swap(Number(objInfo[0]), objInfo[1]);

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

	//create data dynamically with hours from 
	function generateTable (){
		//i dont know how, well logic through it retard =P
		//get data from scopelist
		//assume person hours/day
		//make a person class
		//loop until 
		//list1 =>blocked, raw dump
		//finish all in process, before jumping to open with the same person
		//list2+3 =>open
	}
	$scope.data = [
	  {x: 0, val_0: 12, val_1: 21},
	  {x: 1, val_0: 8, val_1: 22},
	  {x: 2, val_0: 8, val_1: 14},
	  {x: 3, val_0: 0, val_1: 14},
	  {x: 4, val_0: 0, val_1: 14},
	  {x: 5, val_0: 0, val_1: 0}
	];

	$scope.options = {
  stacks: [{axis: "y", series: ["id_0", "id_1"]}],
  lineMode: "cardinal",
  series: [
    {
      id: "id_0",
      y: "val_0",
      label: "Blocked",
      type: "column",
      color: "#FF0000",
      axis: "y"
    },
    {
      id: "id_1",
      y: "val_1",
      label: "Open",
      type: "column",
      color: "#89CFF0",
      axis: "y"
    }
  ],
  axes: {x: {type: "linear", key: "x"}, y: {type: "linear"}},
  tension: 0.7,
  tooltip: {mode: "scrubber"},
  drawLegend: true,
  drawDots: true,
  columnsHGap: 5
};


	});
