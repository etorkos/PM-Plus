var thing = {
      icon: './img/icons/facebook.jpg',
      title: 'Build backend',
      link: 'http://www.facebook.com',
      owner: 'Peter',
      status: 'blocked',
      ttc: 8,
      parents: [],
      locked: true,
      children: []
};

var childThing = {
	   icon: './img/icons/facebook.jpg',
	      title: 'Create user schema',
	      link: 'http://www.facebook.com',
	      owner: 'Lorence',
	      ttc: 4,
	      status: 'blocked',
	      locked: true,
	      parents: [],
}

thing.children.push(childThing);
thing.children.indexOf(childThing);

function Card (children, parents) {

	
}