var people = [
{ 	name: "evan",
	modifier: .8
},
{ 	name: "peter",
	modifier: 1.2
}];

var tasks=[{
	name:'task1',
	time:8,
	link: null
},{
	name:'task2',
	time:8,
	link: 'task1'
},{
	name:'task3',
	time:8,
	link: 'task2'
},{
	name:'task4',
	time:4,
	link: null
},{
	name:'task5',
	time:4,
	link: 'task4'
},{
	name:'task6',
	time:4,
	link: 'task6'
}]

person1(task1), person2(task2), completion
person1(task4), person2(task3)

//goal eliminate all backlog

function length(obj) {
    var length = 0;
    for (var i in obj)
        length++;
    return length;
}
function clone(obj) {
    obj = JSON.parse(JSON.stringify(obj));
    return obj;
}
function pickRandomProperty(obj) {
    var result;
    var count = 0;
    for (var prop in obj)
        if (Math.random() < 1 / ++count)
           result = prop;
    return result;
}

var Chromosome = function(members) {
    this.members = members;
    for (var element in this.members)
    {
        if (typeof this.members[element]['active'] == 'undefined')
        {
            this.members[element]['active'] = Math.round( Math.random() );
        }
    }
    this.mutate();
    this.calcScore();
};
Chromosome.prototype.mutate = function() {
    if (Math.random() > this.mutationRate)
        return false;
    var element = pickRandomProperty(this.members);
    this.members[element]['active'] = Number(! this.members[element]['active']);
};
Chromosome.prototype.calcScore = function() {
    if (this.score)
        return this.score;

    this.time = 0;
    this.weight = 0;
    this.score = 0;

    for (var element in this.members)
    {
        if (this.members[element]['active'])
        {
            this.time += this.members[element]['time'];
            this.weight += this.members[element]['weight'];
        }
    }

    this.score = this.value;

    if (this.weight > this.maxWeight)
    {
        this.score -= (this.weight - this.maxWeight) * 50;
    }

    return this.score;
};
Chromosome.prototype.mateWith = function(other) {
    var child1 = {};
    var child2 = {};
    var pivot = Math.round( Math.random() * (length(this.members) - 1) );
    var i = 0;
    for (var element in elements)
    {
        if (i < pivot)
        {
            child1[element] = clone(this.members[element]);
            child2[element] = clone(other.members[element]);
        }
        else
        {
            child2[element] = clone(this.members[element]);
            child1[element] = clone(other.members[element]);
        }
        i++;
    }

    child1 = new Chromosome(child1);
    child2 = new Chromosome(child2);

    return [child1, child2];
};
Chromosome.prototype.weight = 0;
Chromosome.prototype.value = 0;
Chromosome.prototype.members = [];
Chromosome.prototype.maxWeight = 1000;
Chromosome.prototype.mutationRate = 0.7;
Chromosome.prototype.score = 0;


var Population = function(elements, size)
{
    if ( ! size )
        size = 20;
    this.elements = elements;
    this.size = size;
    this.fill();
};
Population.prototype.fill = function() {
    while (this.chromosomes.length < this.size)
    {
        if (this.chromosomes.length < this.size / 3)
        {
            this.chromosomes.push( new Chromosome( clone(this.elements) ) );
        }
        else
        {
            this.mate();
        }
    }
};
Population.prototype.sort = function() {
    this.chromosomes.sort(function(a, b) { return b.calcScore() - a.calcScore(); });
};
Population.prototype.kill = function() {
    var target = Math.floor( this.elitism * this.chromosomes.length );
    while (this.chromosomes.length > target)
    {
        this.chromosomes.pop();
    }
};
Population.prototype.mate = function() {
    var key1 = pickRandomProperty(this.chromosomes);
    var key2 = key1;

    while (key2 == key1)
    {
        key2 = pickRandomProperty(this.chromosomes);
    }

    var children = this.chromosomes[key1].mateWith(this.chromosomes[key2]);
    this.chromosomes = this.chromosomes.concat(children);
};
Population.prototype.generation = function(log) {
    this.sort();
    this.kill();
    this.mate();
    this.fill();
    this.sort();
};
Population.prototype.display = function(i, noImprovement) {
    document.getElementById('gen_no').innerHTML = i;
    document.getElementById('weight').innerHTML = this.chromosomes[0].weight;
    document.getElementById('value').innerHTML = this.chromosomes[0].score;
    document.getElementById('nochange').innerHTML = noImprovement;
    
};
Population.prototype.run = function(threshold, noImprovement, lastScore, i) {
    if ( ! threshold )
        threshold = 1000;
    if ( ! noImprovement )
        noImprovement = 0;
    if ( ! lastScore )
        lastScore = false;
    if ( ! i )
        i = 0;

    if (noImprovement < threshold)
    {
        lastScore = this.chromosomes[0].calcScore();
        this.generation();

        if (lastScore >= this.chromosomes[0].calcScore())
        {
            noImprovement++;
        }
        else
        {
            noImprovement = 0;
        }
        
        i++;

        if (i % 10 == 0)
            this.display(i, noImprovement);
        var scope = this;
        setTimeout(function() { scope.run(threshold, noImprovement, lastScore, i) }, 1);

        return false;

    }
    this.display(i, noImprovement);
};


Population.prototype.elitism = 0.2;
Population.prototype.chromosomes = [];
Population.prototype.size = 100;
Population.prototype.elements = false;

                   
var p;
p = new Population(clone(elements));

document.getElementById('runbutton').onclick = function() {
   p.run(document.getElementById('runfor').value);
};