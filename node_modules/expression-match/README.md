# Match Objects with Expressions
### Use expression patterns to compare object values

**Table of Contents**

- [ExMatch.js](#expression-matcher)
	- [Installation](#installation)
	- [Expressions](#expressions)
	- [Configuration](#configuration)
	- [Methods](#add-patterns)
		- [Add Patterns](#add-patterns)
		- [Match](#match)
		- [Single Expression Match](#select-expression-match)
		- [Custom Selector and Comparer](#custom-selector-and-comparer)	
	- [Usage](#usage)
		- [Keystone dependsOn](#keystone-dependson)
		- [Examples](#examples)
	- [Testing](#testing)
	- [History](https://github.com/inquisive/expression-match/blob/master/HISTORY.md) 
	- [License](#license)


### Installation
```
npm install expression-match
```
### Expressions
  * add
  * any
  * eq
  * gt
  * gte
  * in
  * lt
  * lte
  * ne
  * not
  * or
  * regex

### Configuration
```javascript
var ExMatch = require('expression-match');

var searchFields = {
	str1: 'string',
	str2: 'hello',
	str3: 'plug',
	str4: ['1','2'],
	num1: 1,
	num2: '2',
	num3: '3',
	check1:'true',
	check2: false,
	check3: undefined,
	check4: 0,
	check5: true,
	check6: 'false'
}
var patterns = {
	// true
	e1: { $or:[ { str1:['first','third'] } , {check1: 'true'} ] },
	e2: { $gt: { num3:1 }, $and:[{num1:'1'}, {str3: { or: ['cork','clog','plug'] } }, {num2:{$lt:4}}] },
	e3: { str2: ['hi', 'hello'], str3: { $regex: 'plu.*/i' } },
	e4: { num3: { $lte: 3 } },
	e5: { str1: [{ or: 'strings' }, { or: 'string'}] },
}

/* debug can be any truthy or 2 for compare only
 * @param {object} matchPatterns
 * @param {object} matchAgainst
 * @param {object/boolean} options - debug only when boolean 
 * */
 
// `options.expression` changes the default expression which is `$and`.  
var Match = new ExMatch( patterns.e2, searchFields, { debug: true, expression: '$and' });  

// debig messages only.  
var Match = new ExMatch( patterns.e3, searchFields, true);
```

### Add Patterns
Each method returns `this` for chainability
```javascript
Match.
	addSearchParams( patterns.e3 ).
	and( patterns.e1 ).
	any( patterns.e3 ).
	eq( { num1: 2, str2: 'hello' } )
	gt( [ { num1: 2 } ] ).
	gte( [ { num1: 2 }, { num2: 5 } ] ).
	in( { num1: ['2', '1'] } )
	lt( { num1: 2 } ).
	lte( { num1: 2 } ).
	ne( { num1: 2 } ).
	not( { str1: 'test' } ).
	regex( { str1: 'fir.*/i' } );

```

### Match
Run all expression searches in the queue
```
Match.match()
```

### Select Expression Match
Run a single Expression search from the queue
```javascript

Match.regex({str2: { $regex: 'hel.*/i'}});
var ret = Match.$regex();

/* All return boolean true/false */
Match.$and();
Match.$any(); 
Match.$eq();
Match.$gt();
Match.$gte();
Match.$in();
Match.$lt();
Match.$lte();
Match.$ne();
Match.$not();
Match.$or();
Match.$regex();

```

### Custom Selector and Comparer
in progress

###Usage

### Keystone dependsOn
```
var Tester = new keystone.List('Tester');

var patterns = {
	earth: { $and:[ {str1:'earth'} , {check2:true} ] },
	and: { $lte:[ {num1:1} , {num3:4} ] },
	ice: { $gt:[{num3:1}],$and:[{num1:'1'},{sel1:['first','third']},{num2:{$lt:4}}] },
	water: { $or:[ {num1:{$gte:6}} , {num2:{$lte:4}} ] },
	fire: { sel1:'second',str3: {$regex: 'fir.*/i'} }
}

Tester.add({
}, 'Depends On', {
	isIce: { type: Boolean, label: 'Ice', dependsOn: patterns.ice},
	isFire: { type: Boolean, label: 'Fire' ,dependsOn: patterns.fire},
	isEarth: { type: Boolean, label: 'Earth', dependsOn: patterns.earth},
	isWater: { type: Boolean, label: 'Water', dependsOn: patterns.water},
	isAnd: { type: Boolean, label: 'And', dependsOn: patterns.and }

}, 'Show Dependants When', {

    sel1: { type: Types.Select, many: true, emptyOption: true },
	check1: { type: Boolean,  label: 'Check 1' , note:'earth ' },
	check2: { type: Boolean,  label: 'Check 2'  },
	num1: {type: Types.Number, note:'show `Water` when >= `6`  -- --  `<=1` == `And` with num3'  },
	num2: {type: Types.Number, note:'show `Water` when <= `4`'},
	num3: {type: Types.Number, note: '`<=4` show `And` with num1'  },
	str1: {type:String, note:'type earth with check2 to show `Earth`'},
	str2: String,
	str3: {type:String, note:'regex `fir*`  with `sel1`==`second` to show `Fire`'},
});

Tester.register();

```
### Examples
```
var ExMatch = require('exmatch');

// Create a searchfield:value object and some test search objects
	searchFields = {
		str1: 'string',  str2: 'hello',  str3: 'plug',
		num1: 1,  num2: '2',  num3: '3', 
        check1:'true',  check2: false
	}
	
    var Match = new ExMatch({
    	$or:[ {str1:['string1']}, {check1:'true'} ],
        num2:'2',
        num1:{ $lt:2 }
    },searchFields);
    var ret = Match.match();
    ==> true
    
    var m7 = new ExMatch({}, searchFields, 2);  //dubug on for compare only
	m7.
    	and({check2:false}).
		any({check1:false}).
		any({ str2: { $regex: 'hel.*/i'} });
	var ret = m7.match();
	==> true
    
    var Match = new ExMatch({ num2:{$eq:2} , $eq:{num3:'3'}, $eq:[{num1:'1'}] }, searchFields);
    var ret = Match.match();
    ==> false
    
    var Match = new ExMatch({ num2:{$eq:2} ,$eq:{num2:2}, $eq:[{num2:1}] } , searchFields);
    var ret = Match.match();
    ==> false
    
    var regex = new ExMatch({}, searchFields, true); //dubug on
	regex.regex({str2: { $regex: 'hel.*/i'}});
	var ret = regex.$regex();
	==> true
   

```

### Testing
Test file located in `test` dir
```
npm i -g mocha

npm test

```


### License
MIT License

