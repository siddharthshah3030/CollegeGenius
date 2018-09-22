var demand = require('must');

var ExMatch = require('../ExMatch');

var searchFields,searchPatterns;

/** Test Matching */

before(function() {
	
	// Create a searchfield:value object and some test search objects
	searchFields = {
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
	
	searchPatterns = {
		/* true */
		e0: { or:[ {str1:['string1']} , {check1:'true'} ] ,num2:'2',num1:{$lt:2}},
		e01: { 
			str1: {
				or:['string1', 'string']
			},
			or:[ 
				{ check1: 'true' },
				{ check5: false }
			],
			num2:'2', 
			num1: { 
				$lt: 2
			}
		},
		test: { gte: [ { num1: 1 }, { num3: 2 } ] },
		trueplainarrayofexp: {
			str3: [
				{ or: ['plug1', 'plug'] }
			]
		},
		truetest01: { 
			$gt: { 
				num3: 1 
			}, 
			$and:[
				{ num1: 1 },
				{ str3: { or: ['cork','clog','plug'] } },
				{ num2: { 
						$lt: 4 
					}
				}
			] 
		},
		falsetest01: { 
			$gt: { 
				num3: 1 
			}, 
			$and:[
				{ num1: '1' },
				{ str3: ['cork','clog','plug'] },
				{ num2: { 
						$lt: 4 
					}
				}
			] 
		},
		e02: { str1: { or:['string','third']} },
		e1: { or:[ {str1:['string','third']} , {check1:'false'} ] },
		e2: { and:[ {str1:'string'} , {check2:false} ] },
		e3: { lte:[ {num1:1} , {num3:4} ] },
		e4: { gt:[{num3:1}],$and:[{num1:1},{str2:'hello'},{num2:{$lt:4}}] },
		e5: { or:[ {num1:{$gte:1}} , {num2:{$lte:1}} ] },
		truesinglevalue: { num2:['2', '1'] },
		truearrayvalue: { str4: ['2'] },
		e66: { $ne:[{num2:[2,1]}]},
		e7: { $not:{num2:1} },
		e007: { $gt:[{num3:1}],$and:[{num1:1},{str1:['string','third']},{num2:{$lt:4}}] },
		e77: { str1: 'string',str3: {regex: /plu.*/i}},
		e777: { $any: [ {num3:{$lte:2}},{$and:[{str1:'string1'},{str2:'hello'}]},{$or: [{str3: {$regex: /plu.*/i}},{check1:false}] }]},
		e88: { $truthy: 'check1' },
		e99: { $falsy: 'check4' },
		
		
		/* false */
		e8: { $or:[ {str1:['first','third']} , {check1:'false'} ] },
		e9: { $and:[ {str1:'string'} , {check2:true} ] },
		e10: { num1: { $gte: 14}, $gte:[ { num3: 1 } ] },
		e11: { lt:[ {num1:3} , {num3:2} ] },
		e12: { or:[ {num1:{$gte:13}} , {num2:{$lte:1}} ] },
		e13: { str4:[1,3]  },
		e14: { $lte:{num2:1} },
		e15: { num2:{$eq:2} ,$eq:{num2:2},$eq:[{num2:1}]},
		e16: { $and: { str2: ['2', '1']} },
		e17: { $eq: { str4: ['2', '1']} }
	}
});

describe('FALSE', function() {
		it('$gt, $and array normal should be false', function() {
			var m007 = new ExMatch(searchPatterns.e007, searchFields, false).match();
			demand(m007).be.false();
			m007 = undefined;
		});
		
		
		it('$or should be false', function() {
			var m8 = new ExMatch(searchPatterns.e8, searchFields, false).match();
			demand(m8).be.false();
			m8 = undefined;
		});
		
		it('$and should be false', function() {
			var m9 = new ExMatch(searchPatterns.e9, searchFields).match();
			demand(m9).be.false();
			m9 = undefined;
		});
		
		it('$gte should be false', function() {
			var m10 = new ExMatch(searchPatterns.e10, searchFields, false).match();
			demand(m10).be.false();
			m10 = undefined;
		});
		
		it('$lt should be false', function() {
			var m11 = new ExMatch(searchPatterns.e11, searchFields).match();
			demand(m11).be.false();
			m11 = undefined;
		});
		
		it('$or $gte should be false', function() {
			var m12 = new ExMatch(searchPatterns.e12, searchFields).match();
			demand(m12).be.false();
			m12 = undefined;
		});
		
		it('array inside plain should be false', function() {
			var m13 = new ExMatch(searchPatterns.e13, searchFields, false).match();
			demand(m13).be.false();
			m13 = undefined;
		});
		
		it('plain $lte should be false', function() {
			var m14 = new ExMatch(searchPatterns.e14, searchFields).match();
			demand(m14).be.false();
			m14 = undefined;
		});
		
		it('$eq should be false', function() {
			var m15 = new ExMatch(searchPatterns.e15, searchFields).match();
			demand(m15).be.false();
			m15 = undefined;
		});
		
		it('$and should be false', function() {
			var m16 = new ExMatch(searchPatterns.e16, searchFields, false).match();
			demand(m16).be.false();
			m16 = undefined;
		});
		
		it('$eq should be true', function() {
			var m17 = new ExMatch(searchPatterns.e17, searchFields, false).match();
			demand(m17).be.true();
			m17 = undefined;
		});
		
});


describe('TRUE', function() {
		
		it('custom tester', function() {
			var test = new ExMatch(searchPatterns.test, searchFields, true).match();
			demand(test).be.true();
			truetest01 = undefined;
		});
		
		it('testing truths', function() {
			var truetest01 = new ExMatch(searchPatterns.truetest01, searchFields, false).match();
			demand(truetest01).be.true();
			truetest01 = undefined;
		});
		
		it('plain key with array of expressions', function() {
			var trueplainarrayofexp = new ExMatch(searchPatterns.trueplainarrayofexp, searchFields, false).match();
			demand(trueplainarrayofexp).be.true();
			trueplainarrayofexp = undefined;
		});
		
		it('plain key with or as object', function() {
			/* debug is true instead of false in ExMatch */
			var m02 = new ExMatch(searchPatterns.e02, searchFields, false).match();
			demand(m02).be.true();
			m02 = undefined;
		});
		
		it('$or then plain $and should be true', function() {
			/* debug is true instead of false in ExMatch */
			var m0 = new ExMatch(searchPatterns.e01, searchFields, false).match();
			demand(m0).be.true();
			m0 = undefined;
		});
		
		it('$or should be true', function() {
			var m1 = new ExMatch(searchPatterns.e1,searchFields,false).match();
			demand(m1).be.true();
			m1 = undefined;
		});
		
		it('$truthy should be true', function() {
			var m1888 = new ExMatch(searchPatterns.e88,searchFields,false).match();
			demand(m1888).be.true();
			m1888 = undefined;
		});
		
		it('$falsy should be true', function() {
			var m19 = new ExMatch(searchPatterns.e99, searchFields, false).match();
			demand(m19).be.true();
			m19 = undefined;
		});
		
		it('$and should be true', function() {
			var m2 = new ExMatch(searchPatterns.e2, searchFields, false).match();
			demand(m2).be.true();
			m2 = undefined;
		});
		
		it('$lte should be true', function() {
			var m3 = new ExMatch(searchPatterns.e3, searchFields, false).match();
			demand(m3).be.true();
			m3 = undefined;
		});
		
		it('$gt $and should be true', function() {
			var m4 = new ExMatch(searchPatterns.e4, searchFields, false).match();
			demand(m4).be.true();
			m4 = undefined;
		});
		
		it('$or $gte should be true', function() {
			var m5 = new ExMatch(searchPatterns.e5, searchFields, false).match();
			demand(m5).be.true();
			m5 = undefined;
		});
		
		it('plain array for single value should be true', function() {
			var m6 = new ExMatch(searchPatterns.truesinglevalue, searchFields, false).match();
			demand(m6).be.true();
			m6 = undefined;
		});
		
		it('plain array for array value should be true', function() {
			var m6 = new ExMatch(searchPatterns.truearrayvalue, searchFields, false).match();
			demand(m6).be.true();
			m6 = undefined;
		});
		
		it('$ne should be true', function() {
			var m66 = new ExMatch(searchPatterns.e66, searchFields, false).match();
			demand(m66).be.true();
			m66 = undefined;
		});
		
		it('$not should be true', function() {
			var m7 = new ExMatch(searchPatterns.e7, searchFields).match();
			demand(m7).be.true();
			m7 = undefined;
		});
		
		it('$regex should be true', function() {
			var m77 = new ExMatch(searchPatterns.e77, searchFields, false).match();
			demand(m77).be.true();
			m77 = undefined;
		});
		
		it('$any include lte,or,and should be true', function() {
			var m777 = new ExMatch(searchPatterns.e777, searchFields, false).match();
			demand(m777).be.true();
			m777 = undefined;
		});
		
		it('miltiple expressions should be true', function() {
			var m7 = new ExMatch({}, searchFields, false);
			m7.and({check2:false})
				.any({check1:false})
				.any({ str2: { $regex: 'hel.*/i'} });
			var m7r = m7.match();
			demand(m7r).be.true();
			m7 = undefined;
			m7r = undefined;
		});
		
		it('run $regex only is true', function() {
			var regex = new ExMatch({}, searchFields, false);
			regex.regex({str2: { $regex: 'hel.*/i'}});
			var ret = regex.$regex();
			demand(ret).be.true();
			ret = undefined;
			regex = undefined;
		});
		 
		
		
});
	
	

