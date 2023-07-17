(function(scope){
'use strict';

function F(arity, fun, wrapper) {
  wrapper.a = arity;
  wrapper.f = fun;
  return wrapper;
}

function F2(fun) {
  return F(2, fun, function(a) { return function(b) { return fun(a,b); }; })
}
function F3(fun) {
  return F(3, fun, function(a) {
    return function(b) { return function(c) { return fun(a, b, c); }; };
  });
}
function F4(fun) {
  return F(4, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return fun(a, b, c, d); }; }; };
  });
}
function F5(fun) {
  return F(5, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return fun(a, b, c, d, e); }; }; }; };
  });
}
function F6(fun) {
  return F(6, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return fun(a, b, c, d, e, f); }; }; }; }; };
  });
}
function F7(fun) {
  return F(7, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return fun(a, b, c, d, e, f, g); }; }; }; }; }; };
  });
}
function F8(fun) {
  return F(8, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) {
    return fun(a, b, c, d, e, f, g, h); }; }; }; }; }; }; };
  });
}
function F9(fun) {
  return F(9, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) { return function(i) {
    return fun(a, b, c, d, e, f, g, h, i); }; }; }; }; }; }; }; };
  });
}

function A2(fun, a, b) {
  return fun.a === 2 ? fun.f(a, b) : fun(a)(b);
}
function A3(fun, a, b, c) {
  return fun.a === 3 ? fun.f(a, b, c) : fun(a)(b)(c);
}
function A4(fun, a, b, c, d) {
  return fun.a === 4 ? fun.f(a, b, c, d) : fun(a)(b)(c)(d);
}
function A5(fun, a, b, c, d, e) {
  return fun.a === 5 ? fun.f(a, b, c, d, e) : fun(a)(b)(c)(d)(e);
}
function A6(fun, a, b, c, d, e, f) {
  return fun.a === 6 ? fun.f(a, b, c, d, e, f) : fun(a)(b)(c)(d)(e)(f);
}
function A7(fun, a, b, c, d, e, f, g) {
  return fun.a === 7 ? fun.f(a, b, c, d, e, f, g) : fun(a)(b)(c)(d)(e)(f)(g);
}
function A8(fun, a, b, c, d, e, f, g, h) {
  return fun.a === 8 ? fun.f(a, b, c, d, e, f, g, h) : fun(a)(b)(c)(d)(e)(f)(g)(h);
}
function A9(fun, a, b, c, d, e, f, g, h, i) {
  return fun.a === 9 ? fun.f(a, b, c, d, e, f, g, h, i) : fun(a)(b)(c)(d)(e)(f)(g)(h)(i);
}

console.warn('Compiled in DEV mode. Follow the advice at https://elm-lang.org/0.19.1/optimize for better performance and smaller assets.');


// EQUALITY

function _Utils_eq(x, y)
{
	for (
		var pair, stack = [], isEqual = _Utils_eqHelp(x, y, 0, stack);
		isEqual && (pair = stack.pop());
		isEqual = _Utils_eqHelp(pair.a, pair.b, 0, stack)
		)
	{}

	return isEqual;
}

function _Utils_eqHelp(x, y, depth, stack)
{
	if (x === y)
	{
		return true;
	}

	if (typeof x !== 'object' || x === null || y === null)
	{
		typeof x === 'function' && _Debug_crash(5);
		return false;
	}

	if (depth > 100)
	{
		stack.push(_Utils_Tuple2(x,y));
		return true;
	}

	/**/
	if (x.$ === 'Set_elm_builtin')
	{
		x = $elm$core$Set$toList(x);
		y = $elm$core$Set$toList(y);
	}
	if (x.$ === 'RBNode_elm_builtin' || x.$ === 'RBEmpty_elm_builtin')
	{
		x = $elm$core$Dict$toList(x);
		y = $elm$core$Dict$toList(y);
	}
	//*/

	/**_UNUSED/
	if (x.$ < 0)
	{
		x = $elm$core$Dict$toList(x);
		y = $elm$core$Dict$toList(y);
	}
	//*/

	for (var key in x)
	{
		if (!_Utils_eqHelp(x[key], y[key], depth + 1, stack))
		{
			return false;
		}
	}
	return true;
}

var _Utils_equal = F2(_Utils_eq);
var _Utils_notEqual = F2(function(a, b) { return !_Utils_eq(a,b); });



// COMPARISONS

// Code in Generate/JavaScript.hs, Basics.js, and List.js depends on
// the particular integer values assigned to LT, EQ, and GT.

function _Utils_cmp(x, y, ord)
{
	if (typeof x !== 'object')
	{
		return x === y ? /*EQ*/ 0 : x < y ? /*LT*/ -1 : /*GT*/ 1;
	}

	/**/
	if (x instanceof String)
	{
		var a = x.valueOf();
		var b = y.valueOf();
		return a === b ? 0 : a < b ? -1 : 1;
	}
	//*/

	/**_UNUSED/
	if (typeof x.$ === 'undefined')
	//*/
	/**/
	if (x.$[0] === '#')
	//*/
	{
		return (ord = _Utils_cmp(x.a, y.a))
			? ord
			: (ord = _Utils_cmp(x.b, y.b))
				? ord
				: _Utils_cmp(x.c, y.c);
	}

	// traverse conses until end of a list or a mismatch
	for (; x.b && y.b && !(ord = _Utils_cmp(x.a, y.a)); x = x.b, y = y.b) {} // WHILE_CONSES
	return ord || (x.b ? /*GT*/ 1 : y.b ? /*LT*/ -1 : /*EQ*/ 0);
}

var _Utils_lt = F2(function(a, b) { return _Utils_cmp(a, b) < 0; });
var _Utils_le = F2(function(a, b) { return _Utils_cmp(a, b) < 1; });
var _Utils_gt = F2(function(a, b) { return _Utils_cmp(a, b) > 0; });
var _Utils_ge = F2(function(a, b) { return _Utils_cmp(a, b) >= 0; });

var _Utils_compare = F2(function(x, y)
{
	var n = _Utils_cmp(x, y);
	return n < 0 ? $elm$core$Basics$LT : n ? $elm$core$Basics$GT : $elm$core$Basics$EQ;
});


// COMMON VALUES

var _Utils_Tuple0_UNUSED = 0;
var _Utils_Tuple0 = { $: '#0' };

function _Utils_Tuple2_UNUSED(a, b) { return { a: a, b: b }; }
function _Utils_Tuple2(a, b) { return { $: '#2', a: a, b: b }; }

function _Utils_Tuple3_UNUSED(a, b, c) { return { a: a, b: b, c: c }; }
function _Utils_Tuple3(a, b, c) { return { $: '#3', a: a, b: b, c: c }; }

function _Utils_chr_UNUSED(c) { return c; }
function _Utils_chr(c) { return new String(c); }


// RECORDS

function _Utils_update(oldRecord, updatedFields)
{
	var newRecord = {};

	for (var key in oldRecord)
	{
		newRecord[key] = oldRecord[key];
	}

	for (var key in updatedFields)
	{
		newRecord[key] = updatedFields[key];
	}

	return newRecord;
}


// APPEND

var _Utils_append = F2(_Utils_ap);

function _Utils_ap(xs, ys)
{
	// append Strings
	if (typeof xs === 'string')
	{
		return xs + ys;
	}

	// append Lists
	if (!xs.b)
	{
		return ys;
	}
	var root = _List_Cons(xs.a, ys);
	xs = xs.b
	for (var curr = root; xs.b; xs = xs.b) // WHILE_CONS
	{
		curr = curr.b = _List_Cons(xs.a, ys);
	}
	return root;
}



var _List_Nil_UNUSED = { $: 0 };
var _List_Nil = { $: '[]' };

function _List_Cons_UNUSED(hd, tl) { return { $: 1, a: hd, b: tl }; }
function _List_Cons(hd, tl) { return { $: '::', a: hd, b: tl }; }


var _List_cons = F2(_List_Cons);

function _List_fromArray(arr)
{
	var out = _List_Nil;
	for (var i = arr.length; i--; )
	{
		out = _List_Cons(arr[i], out);
	}
	return out;
}

function _List_toArray(xs)
{
	for (var out = []; xs.b; xs = xs.b) // WHILE_CONS
	{
		out.push(xs.a);
	}
	return out;
}

var _List_map2 = F3(function(f, xs, ys)
{
	for (var arr = []; xs.b && ys.b; xs = xs.b, ys = ys.b) // WHILE_CONSES
	{
		arr.push(A2(f, xs.a, ys.a));
	}
	return _List_fromArray(arr);
});

var _List_map3 = F4(function(f, xs, ys, zs)
{
	for (var arr = []; xs.b && ys.b && zs.b; xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A3(f, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map4 = F5(function(f, ws, xs, ys, zs)
{
	for (var arr = []; ws.b && xs.b && ys.b && zs.b; ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A4(f, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map5 = F6(function(f, vs, ws, xs, ys, zs)
{
	for (var arr = []; vs.b && ws.b && xs.b && ys.b && zs.b; vs = vs.b, ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A5(f, vs.a, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_sortBy = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		return _Utils_cmp(f(a), f(b));
	}));
});

var _List_sortWith = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		var ord = A2(f, a, b);
		return ord === $elm$core$Basics$EQ ? 0 : ord === $elm$core$Basics$LT ? -1 : 1;
	}));
});



var _JsArray_empty = [];

function _JsArray_singleton(value)
{
    return [value];
}

function _JsArray_length(array)
{
    return array.length;
}

var _JsArray_initialize = F3(function(size, offset, func)
{
    var result = new Array(size);

    for (var i = 0; i < size; i++)
    {
        result[i] = func(offset + i);
    }

    return result;
});

var _JsArray_initializeFromList = F2(function (max, ls)
{
    var result = new Array(max);

    for (var i = 0; i < max && ls.b; i++)
    {
        result[i] = ls.a;
        ls = ls.b;
    }

    result.length = i;
    return _Utils_Tuple2(result, ls);
});

var _JsArray_unsafeGet = F2(function(index, array)
{
    return array[index];
});

var _JsArray_unsafeSet = F3(function(index, value, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[index] = value;
    return result;
});

var _JsArray_push = F2(function(value, array)
{
    var length = array.length;
    var result = new Array(length + 1);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[length] = value;
    return result;
});

var _JsArray_foldl = F3(function(func, acc, array)
{
    var length = array.length;

    for (var i = 0; i < length; i++)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_foldr = F3(function(func, acc, array)
{
    for (var i = array.length - 1; i >= 0; i--)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_map = F2(function(func, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = func(array[i]);
    }

    return result;
});

var _JsArray_indexedMap = F3(function(func, offset, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = A2(func, offset + i, array[i]);
    }

    return result;
});

var _JsArray_slice = F3(function(from, to, array)
{
    return array.slice(from, to);
});

var _JsArray_appendN = F3(function(n, dest, source)
{
    var destLen = dest.length;
    var itemsToCopy = n - destLen;

    if (itemsToCopy > source.length)
    {
        itemsToCopy = source.length;
    }

    var size = destLen + itemsToCopy;
    var result = new Array(size);

    for (var i = 0; i < destLen; i++)
    {
        result[i] = dest[i];
    }

    for (var i = 0; i < itemsToCopy; i++)
    {
        result[i + destLen] = source[i];
    }

    return result;
});



// LOG

var _Debug_log_UNUSED = F2(function(tag, value)
{
	return value;
});

var _Debug_log = F2(function(tag, value)
{
	console.log(tag + ': ' + _Debug_toString(value));
	return value;
});


// TODOS

function _Debug_todo(moduleName, region)
{
	return function(message) {
		_Debug_crash(8, moduleName, region, message);
	};
}

function _Debug_todoCase(moduleName, region, value)
{
	return function(message) {
		_Debug_crash(9, moduleName, region, value, message);
	};
}


// TO STRING

function _Debug_toString_UNUSED(value)
{
	return '<internals>';
}

function _Debug_toString(value)
{
	return _Debug_toAnsiString(false, value);
}

function _Debug_toAnsiString(ansi, value)
{
	if (typeof value === 'function')
	{
		return _Debug_internalColor(ansi, '<function>');
	}

	if (typeof value === 'boolean')
	{
		return _Debug_ctorColor(ansi, value ? 'True' : 'False');
	}

	if (typeof value === 'number')
	{
		return _Debug_numberColor(ansi, value + '');
	}

	if (value instanceof String)
	{
		return _Debug_charColor(ansi, "'" + _Debug_addSlashes(value, true) + "'");
	}

	if (typeof value === 'string')
	{
		return _Debug_stringColor(ansi, '"' + _Debug_addSlashes(value, false) + '"');
	}

	if (typeof value === 'object' && '$' in value)
	{
		var tag = value.$;

		if (typeof tag === 'number')
		{
			return _Debug_internalColor(ansi, '<internals>');
		}

		if (tag[0] === '#')
		{
			var output = [];
			for (var k in value)
			{
				if (k === '$') continue;
				output.push(_Debug_toAnsiString(ansi, value[k]));
			}
			return '(' + output.join(',') + ')';
		}

		if (tag === 'Set_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Set')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Set$toList(value));
		}

		if (tag === 'RBNode_elm_builtin' || tag === 'RBEmpty_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Dict')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Dict$toList(value));
		}

		if (tag === 'Array_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Array')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Array$toList(value));
		}

		if (tag === '::' || tag === '[]')
		{
			var output = '[';

			value.b && (output += _Debug_toAnsiString(ansi, value.a), value = value.b)

			for (; value.b; value = value.b) // WHILE_CONS
			{
				output += ',' + _Debug_toAnsiString(ansi, value.a);
			}
			return output + ']';
		}

		var output = '';
		for (var i in value)
		{
			if (i === '$') continue;
			var str = _Debug_toAnsiString(ansi, value[i]);
			var c0 = str[0];
			var parenless = c0 === '{' || c0 === '(' || c0 === '[' || c0 === '<' || c0 === '"' || str.indexOf(' ') < 0;
			output += ' ' + (parenless ? str : '(' + str + ')');
		}
		return _Debug_ctorColor(ansi, tag) + output;
	}

	if (typeof DataView === 'function' && value instanceof DataView)
	{
		return _Debug_stringColor(ansi, '<' + value.byteLength + ' bytes>');
	}

	if (typeof File !== 'undefined' && value instanceof File)
	{
		return _Debug_internalColor(ansi, '<' + value.name + '>');
	}

	if (typeof value === 'object')
	{
		var output = [];
		for (var key in value)
		{
			var field = key[0] === '_' ? key.slice(1) : key;
			output.push(_Debug_fadeColor(ansi, field) + ' = ' + _Debug_toAnsiString(ansi, value[key]));
		}
		if (output.length === 0)
		{
			return '{}';
		}
		return '{ ' + output.join(', ') + ' }';
	}

	return _Debug_internalColor(ansi, '<internals>');
}

function _Debug_addSlashes(str, isChar)
{
	var s = str
		.replace(/\\/g, '\\\\')
		.replace(/\n/g, '\\n')
		.replace(/\t/g, '\\t')
		.replace(/\r/g, '\\r')
		.replace(/\v/g, '\\v')
		.replace(/\0/g, '\\0');

	if (isChar)
	{
		return s.replace(/\'/g, '\\\'');
	}
	else
	{
		return s.replace(/\"/g, '\\"');
	}
}

function _Debug_ctorColor(ansi, string)
{
	return ansi ? '\x1b[96m' + string + '\x1b[0m' : string;
}

function _Debug_numberColor(ansi, string)
{
	return ansi ? '\x1b[95m' + string + '\x1b[0m' : string;
}

function _Debug_stringColor(ansi, string)
{
	return ansi ? '\x1b[93m' + string + '\x1b[0m' : string;
}

function _Debug_charColor(ansi, string)
{
	return ansi ? '\x1b[92m' + string + '\x1b[0m' : string;
}

function _Debug_fadeColor(ansi, string)
{
	return ansi ? '\x1b[37m' + string + '\x1b[0m' : string;
}

function _Debug_internalColor(ansi, string)
{
	return ansi ? '\x1b[36m' + string + '\x1b[0m' : string;
}

function _Debug_toHexDigit(n)
{
	return String.fromCharCode(n < 10 ? 48 + n : 55 + n);
}


// CRASH


function _Debug_crash_UNUSED(identifier)
{
	throw new Error('https://github.com/elm/core/blob/1.0.0/hints/' + identifier + '.md');
}


function _Debug_crash(identifier, fact1, fact2, fact3, fact4)
{
	switch(identifier)
	{
		case 0:
			throw new Error('What node should I take over? In JavaScript I need something like:\n\n    Elm.Main.init({\n        node: document.getElementById("elm-node")\n    })\n\nYou need to do this with any Browser.sandbox or Browser.element program.');

		case 1:
			throw new Error('Browser.application programs cannot handle URLs like this:\n\n    ' + document.location.href + '\n\nWhat is the root? The root of your file system? Try looking at this program with `elm reactor` or some other server.');

		case 2:
			var jsonErrorString = fact1;
			throw new Error('Problem with the flags given to your Elm program on initialization.\n\n' + jsonErrorString);

		case 3:
			var portName = fact1;
			throw new Error('There can only be one port named `' + portName + '`, but your program has multiple.');

		case 4:
			var portName = fact1;
			var problem = fact2;
			throw new Error('Trying to send an unexpected type of value through port `' + portName + '`:\n' + problem);

		case 5:
			throw new Error('Trying to use `(==)` on functions.\nThere is no way to know if functions are "the same" in the Elm sense.\nRead more about this at https://package.elm-lang.org/packages/elm/core/latest/Basics#== which describes why it is this way and what the better version will look like.');

		case 6:
			var moduleName = fact1;
			throw new Error('Your page is loading multiple Elm scripts with a module named ' + moduleName + '. Maybe a duplicate script is getting loaded accidentally? If not, rename one of them so I know which is which!');

		case 8:
			var moduleName = fact1;
			var region = fact2;
			var message = fact3;
			throw new Error('TODO in module `' + moduleName + '` ' + _Debug_regionToString(region) + '\n\n' + message);

		case 9:
			var moduleName = fact1;
			var region = fact2;
			var value = fact3;
			var message = fact4;
			throw new Error(
				'TODO in module `' + moduleName + '` from the `case` expression '
				+ _Debug_regionToString(region) + '\n\nIt received the following value:\n\n    '
				+ _Debug_toString(value).replace('\n', '\n    ')
				+ '\n\nBut the branch that handles it says:\n\n    ' + message.replace('\n', '\n    ')
			);

		case 10:
			throw new Error('Bug in https://github.com/elm/virtual-dom/issues');

		case 11:
			throw new Error('Cannot perform mod 0. Division by zero error.');
	}
}

function _Debug_regionToString(region)
{
	if (region.start.line === region.end.line)
	{
		return 'on line ' + region.start.line;
	}
	return 'on lines ' + region.start.line + ' through ' + region.end.line;
}



// MATH

var _Basics_add = F2(function(a, b) { return a + b; });
var _Basics_sub = F2(function(a, b) { return a - b; });
var _Basics_mul = F2(function(a, b) { return a * b; });
var _Basics_fdiv = F2(function(a, b) { return a / b; });
var _Basics_idiv = F2(function(a, b) { return (a / b) | 0; });
var _Basics_pow = F2(Math.pow);

var _Basics_remainderBy = F2(function(b, a) { return a % b; });

// https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/divmodnote-letter.pdf
var _Basics_modBy = F2(function(modulus, x)
{
	var answer = x % modulus;
	return modulus === 0
		? _Debug_crash(11)
		:
	((answer > 0 && modulus < 0) || (answer < 0 && modulus > 0))
		? answer + modulus
		: answer;
});


// TRIGONOMETRY

var _Basics_pi = Math.PI;
var _Basics_e = Math.E;
var _Basics_cos = Math.cos;
var _Basics_sin = Math.sin;
var _Basics_tan = Math.tan;
var _Basics_acos = Math.acos;
var _Basics_asin = Math.asin;
var _Basics_atan = Math.atan;
var _Basics_atan2 = F2(Math.atan2);


// MORE MATH

function _Basics_toFloat(x) { return x; }
function _Basics_truncate(n) { return n | 0; }
function _Basics_isInfinite(n) { return n === Infinity || n === -Infinity; }

var _Basics_ceiling = Math.ceil;
var _Basics_floor = Math.floor;
var _Basics_round = Math.round;
var _Basics_sqrt = Math.sqrt;
var _Basics_log = Math.log;
var _Basics_isNaN = isNaN;


// BOOLEANS

function _Basics_not(bool) { return !bool; }
var _Basics_and = F2(function(a, b) { return a && b; });
var _Basics_or  = F2(function(a, b) { return a || b; });
var _Basics_xor = F2(function(a, b) { return a !== b; });



var _String_cons = F2(function(chr, str)
{
	return chr + str;
});

function _String_uncons(string)
{
	var word = string.charCodeAt(0);
	return !isNaN(word)
		? $elm$core$Maybe$Just(
			0xD800 <= word && word <= 0xDBFF
				? _Utils_Tuple2(_Utils_chr(string[0] + string[1]), string.slice(2))
				: _Utils_Tuple2(_Utils_chr(string[0]), string.slice(1))
		)
		: $elm$core$Maybe$Nothing;
}

var _String_append = F2(function(a, b)
{
	return a + b;
});

function _String_length(str)
{
	return str.length;
}

var _String_map = F2(function(func, string)
{
	var len = string.length;
	var array = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = string.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			array[i] = func(_Utils_chr(string[i] + string[i+1]));
			i += 2;
			continue;
		}
		array[i] = func(_Utils_chr(string[i]));
		i++;
	}
	return array.join('');
});

var _String_filter = F2(function(isGood, str)
{
	var arr = [];
	var len = str.length;
	var i = 0;
	while (i < len)
	{
		var char = str[i];
		var word = str.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += str[i];
			i++;
		}

		if (isGood(_Utils_chr(char)))
		{
			arr.push(char);
		}
	}
	return arr.join('');
});

function _String_reverse(str)
{
	var len = str.length;
	var arr = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = str.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			arr[len - i] = str[i + 1];
			i++;
			arr[len - i] = str[i - 1];
			i++;
		}
		else
		{
			arr[len - i] = str[i];
			i++;
		}
	}
	return arr.join('');
}

var _String_foldl = F3(function(func, state, string)
{
	var len = string.length;
	var i = 0;
	while (i < len)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += string[i];
			i++;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_foldr = F3(function(func, state, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_split = F2(function(sep, str)
{
	return str.split(sep);
});

var _String_join = F2(function(sep, strs)
{
	return strs.join(sep);
});

var _String_slice = F3(function(start, end, str) {
	return str.slice(start, end);
});

function _String_trim(str)
{
	return str.trim();
}

function _String_trimLeft(str)
{
	return str.replace(/^\s+/, '');
}

function _String_trimRight(str)
{
	return str.replace(/\s+$/, '');
}

function _String_words(str)
{
	return _List_fromArray(str.trim().split(/\s+/g));
}

function _String_lines(str)
{
	return _List_fromArray(str.split(/\r\n|\r|\n/g));
}

function _String_toUpper(str)
{
	return str.toUpperCase();
}

function _String_toLower(str)
{
	return str.toLowerCase();
}

var _String_any = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (isGood(_Utils_chr(char)))
		{
			return true;
		}
	}
	return false;
});

var _String_all = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (!isGood(_Utils_chr(char)))
		{
			return false;
		}
	}
	return true;
});

var _String_contains = F2(function(sub, str)
{
	return str.indexOf(sub) > -1;
});

var _String_startsWith = F2(function(sub, str)
{
	return str.indexOf(sub) === 0;
});

var _String_endsWith = F2(function(sub, str)
{
	return str.length >= sub.length &&
		str.lastIndexOf(sub) === str.length - sub.length;
});

var _String_indexes = F2(function(sub, str)
{
	var subLen = sub.length;

	if (subLen < 1)
	{
		return _List_Nil;
	}

	var i = 0;
	var is = [];

	while ((i = str.indexOf(sub, i)) > -1)
	{
		is.push(i);
		i = i + subLen;
	}

	return _List_fromArray(is);
});


// TO STRING

function _String_fromNumber(number)
{
	return number + '';
}


// INT CONVERSIONS

function _String_toInt(str)
{
	var total = 0;
	var code0 = str.charCodeAt(0);
	var start = code0 == 0x2B /* + */ || code0 == 0x2D /* - */ ? 1 : 0;

	for (var i = start; i < str.length; ++i)
	{
		var code = str.charCodeAt(i);
		if (code < 0x30 || 0x39 < code)
		{
			return $elm$core$Maybe$Nothing;
		}
		total = 10 * total + code - 0x30;
	}

	return i == start
		? $elm$core$Maybe$Nothing
		: $elm$core$Maybe$Just(code0 == 0x2D ? -total : total);
}


// FLOAT CONVERSIONS

function _String_toFloat(s)
{
	// check if it is a hex, octal, or binary number
	if (s.length === 0 || /[\sxbo]/.test(s))
	{
		return $elm$core$Maybe$Nothing;
	}
	var n = +s;
	// faster isNaN check
	return n === n ? $elm$core$Maybe$Just(n) : $elm$core$Maybe$Nothing;
}

function _String_fromList(chars)
{
	return _List_toArray(chars).join('');
}




function _Char_toCode(char)
{
	var code = char.charCodeAt(0);
	if (0xD800 <= code && code <= 0xDBFF)
	{
		return (code - 0xD800) * 0x400 + char.charCodeAt(1) - 0xDC00 + 0x10000
	}
	return code;
}

function _Char_fromCode(code)
{
	return _Utils_chr(
		(code < 0 || 0x10FFFF < code)
			? '\uFFFD'
			:
		(code <= 0xFFFF)
			? String.fromCharCode(code)
			:
		(code -= 0x10000,
			String.fromCharCode(Math.floor(code / 0x400) + 0xD800, code % 0x400 + 0xDC00)
		)
	);
}

function _Char_toUpper(char)
{
	return _Utils_chr(char.toUpperCase());
}

function _Char_toLower(char)
{
	return _Utils_chr(char.toLowerCase());
}

function _Char_toLocaleUpper(char)
{
	return _Utils_chr(char.toLocaleUpperCase());
}

function _Char_toLocaleLower(char)
{
	return _Utils_chr(char.toLocaleLowerCase());
}



/**/
function _Json_errorToString(error)
{
	return $elm$json$Json$Decode$errorToString(error);
}
//*/


// CORE DECODERS

function _Json_succeed(msg)
{
	return {
		$: 0,
		a: msg
	};
}

function _Json_fail(msg)
{
	return {
		$: 1,
		a: msg
	};
}

function _Json_decodePrim(decoder)
{
	return { $: 2, b: decoder };
}

var _Json_decodeInt = _Json_decodePrim(function(value) {
	return (typeof value !== 'number')
		? _Json_expecting('an INT', value)
		:
	(-2147483647 < value && value < 2147483647 && (value | 0) === value)
		? $elm$core$Result$Ok(value)
		:
	(isFinite(value) && !(value % 1))
		? $elm$core$Result$Ok(value)
		: _Json_expecting('an INT', value);
});

var _Json_decodeBool = _Json_decodePrim(function(value) {
	return (typeof value === 'boolean')
		? $elm$core$Result$Ok(value)
		: _Json_expecting('a BOOL', value);
});

var _Json_decodeFloat = _Json_decodePrim(function(value) {
	return (typeof value === 'number')
		? $elm$core$Result$Ok(value)
		: _Json_expecting('a FLOAT', value);
});

var _Json_decodeValue = _Json_decodePrim(function(value) {
	return $elm$core$Result$Ok(_Json_wrap(value));
});

var _Json_decodeString = _Json_decodePrim(function(value) {
	return (typeof value === 'string')
		? $elm$core$Result$Ok(value)
		: (value instanceof String)
			? $elm$core$Result$Ok(value + '')
			: _Json_expecting('a STRING', value);
});

function _Json_decodeList(decoder) { return { $: 3, b: decoder }; }
function _Json_decodeArray(decoder) { return { $: 4, b: decoder }; }

function _Json_decodeNull(value) { return { $: 5, c: value }; }

var _Json_decodeField = F2(function(field, decoder)
{
	return {
		$: 6,
		d: field,
		b: decoder
	};
});

var _Json_decodeIndex = F2(function(index, decoder)
{
	return {
		$: 7,
		e: index,
		b: decoder
	};
});

function _Json_decodeKeyValuePairs(decoder)
{
	return {
		$: 8,
		b: decoder
	};
}

function _Json_mapMany(f, decoders)
{
	return {
		$: 9,
		f: f,
		g: decoders
	};
}

var _Json_andThen = F2(function(callback, decoder)
{
	return {
		$: 10,
		b: decoder,
		h: callback
	};
});

function _Json_oneOf(decoders)
{
	return {
		$: 11,
		g: decoders
	};
}


// DECODING OBJECTS

var _Json_map1 = F2(function(f, d1)
{
	return _Json_mapMany(f, [d1]);
});

var _Json_map2 = F3(function(f, d1, d2)
{
	return _Json_mapMany(f, [d1, d2]);
});

var _Json_map3 = F4(function(f, d1, d2, d3)
{
	return _Json_mapMany(f, [d1, d2, d3]);
});

var _Json_map4 = F5(function(f, d1, d2, d3, d4)
{
	return _Json_mapMany(f, [d1, d2, d3, d4]);
});

var _Json_map5 = F6(function(f, d1, d2, d3, d4, d5)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5]);
});

var _Json_map6 = F7(function(f, d1, d2, d3, d4, d5, d6)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6]);
});

var _Json_map7 = F8(function(f, d1, d2, d3, d4, d5, d6, d7)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7]);
});

var _Json_map8 = F9(function(f, d1, d2, d3, d4, d5, d6, d7, d8)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7, d8]);
});


// DECODE

var _Json_runOnString = F2(function(decoder, string)
{
	try
	{
		var value = JSON.parse(string);
		return _Json_runHelp(decoder, value);
	}
	catch (e)
	{
		return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, 'This is not valid JSON! ' + e.message, _Json_wrap(string)));
	}
});

var _Json_run = F2(function(decoder, value)
{
	return _Json_runHelp(decoder, _Json_unwrap(value));
});

function _Json_runHelp(decoder, value)
{
	switch (decoder.$)
	{
		case 2:
			return decoder.b(value);

		case 5:
			return (value === null)
				? $elm$core$Result$Ok(decoder.c)
				: _Json_expecting('null', value);

		case 3:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('a LIST', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _List_fromArray);

		case 4:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _Json_toElmArray);

		case 6:
			var field = decoder.d;
			if (typeof value !== 'object' || value === null || !(field in value))
			{
				return _Json_expecting('an OBJECT with a field named `' + field + '`', value);
			}
			var result = _Json_runHelp(decoder.b, value[field]);
			return ($elm$core$Result$isOk(result)) ? result : $elm$core$Result$Err(A2($elm$json$Json$Decode$Field, field, result.a));

		case 7:
			var index = decoder.e;
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			if (index >= value.length)
			{
				return _Json_expecting('a LONGER array. Need index ' + index + ' but only see ' + value.length + ' entries', value);
			}
			var result = _Json_runHelp(decoder.b, value[index]);
			return ($elm$core$Result$isOk(result)) ? result : $elm$core$Result$Err(A2($elm$json$Json$Decode$Index, index, result.a));

		case 8:
			if (typeof value !== 'object' || value === null || _Json_isArray(value))
			{
				return _Json_expecting('an OBJECT', value);
			}

			var keyValuePairs = _List_Nil;
			// TODO test perf of Object.keys and switch when support is good enough
			for (var key in value)
			{
				if (value.hasOwnProperty(key))
				{
					var result = _Json_runHelp(decoder.b, value[key]);
					if (!$elm$core$Result$isOk(result))
					{
						return $elm$core$Result$Err(A2($elm$json$Json$Decode$Field, key, result.a));
					}
					keyValuePairs = _List_Cons(_Utils_Tuple2(key, result.a), keyValuePairs);
				}
			}
			return $elm$core$Result$Ok($elm$core$List$reverse(keyValuePairs));

		case 9:
			var answer = decoder.f;
			var decoders = decoder.g;
			for (var i = 0; i < decoders.length; i++)
			{
				var result = _Json_runHelp(decoders[i], value);
				if (!$elm$core$Result$isOk(result))
				{
					return result;
				}
				answer = answer(result.a);
			}
			return $elm$core$Result$Ok(answer);

		case 10:
			var result = _Json_runHelp(decoder.b, value);
			return (!$elm$core$Result$isOk(result))
				? result
				: _Json_runHelp(decoder.h(result.a), value);

		case 11:
			var errors = _List_Nil;
			for (var temp = decoder.g; temp.b; temp = temp.b) // WHILE_CONS
			{
				var result = _Json_runHelp(temp.a, value);
				if ($elm$core$Result$isOk(result))
				{
					return result;
				}
				errors = _List_Cons(result.a, errors);
			}
			return $elm$core$Result$Err($elm$json$Json$Decode$OneOf($elm$core$List$reverse(errors)));

		case 1:
			return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, decoder.a, _Json_wrap(value)));

		case 0:
			return $elm$core$Result$Ok(decoder.a);
	}
}

function _Json_runArrayDecoder(decoder, value, toElmValue)
{
	var len = value.length;
	var array = new Array(len);
	for (var i = 0; i < len; i++)
	{
		var result = _Json_runHelp(decoder, value[i]);
		if (!$elm$core$Result$isOk(result))
		{
			return $elm$core$Result$Err(A2($elm$json$Json$Decode$Index, i, result.a));
		}
		array[i] = result.a;
	}
	return $elm$core$Result$Ok(toElmValue(array));
}

function _Json_isArray(value)
{
	return Array.isArray(value) || (typeof FileList !== 'undefined' && value instanceof FileList);
}

function _Json_toElmArray(array)
{
	return A2($elm$core$Array$initialize, array.length, function(i) { return array[i]; });
}

function _Json_expecting(type, value)
{
	return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, 'Expecting ' + type, _Json_wrap(value)));
}


// EQUALITY

function _Json_equality(x, y)
{
	if (x === y)
	{
		return true;
	}

	if (x.$ !== y.$)
	{
		return false;
	}

	switch (x.$)
	{
		case 0:
		case 1:
			return x.a === y.a;

		case 2:
			return x.b === y.b;

		case 5:
			return x.c === y.c;

		case 3:
		case 4:
		case 8:
			return _Json_equality(x.b, y.b);

		case 6:
			return x.d === y.d && _Json_equality(x.b, y.b);

		case 7:
			return x.e === y.e && _Json_equality(x.b, y.b);

		case 9:
			return x.f === y.f && _Json_listEquality(x.g, y.g);

		case 10:
			return x.h === y.h && _Json_equality(x.b, y.b);

		case 11:
			return _Json_listEquality(x.g, y.g);
	}
}

function _Json_listEquality(aDecoders, bDecoders)
{
	var len = aDecoders.length;
	if (len !== bDecoders.length)
	{
		return false;
	}
	for (var i = 0; i < len; i++)
	{
		if (!_Json_equality(aDecoders[i], bDecoders[i]))
		{
			return false;
		}
	}
	return true;
}


// ENCODE

var _Json_encode = F2(function(indentLevel, value)
{
	return JSON.stringify(_Json_unwrap(value), null, indentLevel) + '';
});

function _Json_wrap(value) { return { $: 0, a: value }; }
function _Json_unwrap(value) { return value.a; }

function _Json_wrap_UNUSED(value) { return value; }
function _Json_unwrap_UNUSED(value) { return value; }

function _Json_emptyArray() { return []; }
function _Json_emptyObject() { return {}; }

var _Json_addField = F3(function(key, value, object)
{
	object[key] = _Json_unwrap(value);
	return object;
});

function _Json_addEntry(func)
{
	return F2(function(entry, array)
	{
		array.push(_Json_unwrap(func(entry)));
		return array;
	});
}

var _Json_encodeNull = _Json_wrap(null);



// TASKS

function _Scheduler_succeed(value)
{
	return {
		$: 0,
		a: value
	};
}

function _Scheduler_fail(error)
{
	return {
		$: 1,
		a: error
	};
}

function _Scheduler_binding(callback)
{
	return {
		$: 2,
		b: callback,
		c: null
	};
}

var _Scheduler_andThen = F2(function(callback, task)
{
	return {
		$: 3,
		b: callback,
		d: task
	};
});

var _Scheduler_onError = F2(function(callback, task)
{
	return {
		$: 4,
		b: callback,
		d: task
	};
});

function _Scheduler_receive(callback)
{
	return {
		$: 5,
		b: callback
	};
}


// PROCESSES

var _Scheduler_guid = 0;

function _Scheduler_rawSpawn(task)
{
	var proc = {
		$: 0,
		e: _Scheduler_guid++,
		f: task,
		g: null,
		h: []
	};

	_Scheduler_enqueue(proc);

	return proc;
}

function _Scheduler_spawn(task)
{
	return _Scheduler_binding(function(callback) {
		callback(_Scheduler_succeed(_Scheduler_rawSpawn(task)));
	});
}

function _Scheduler_rawSend(proc, msg)
{
	proc.h.push(msg);
	_Scheduler_enqueue(proc);
}

var _Scheduler_send = F2(function(proc, msg)
{
	return _Scheduler_binding(function(callback) {
		_Scheduler_rawSend(proc, msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});

function _Scheduler_kill(proc)
{
	return _Scheduler_binding(function(callback) {
		var task = proc.f;
		if (task.$ === 2 && task.c)
		{
			task.c();
		}

		proc.f = null;

		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
}


/* STEP PROCESSES

type alias Process =
  { $ : tag
  , id : unique_id
  , root : Task
  , stack : null | { $: SUCCEED | FAIL, a: callback, b: stack }
  , mailbox : [msg]
  }

*/


var _Scheduler_working = false;
var _Scheduler_queue = [];


function _Scheduler_enqueue(proc)
{
	_Scheduler_queue.push(proc);
	if (_Scheduler_working)
	{
		return;
	}
	_Scheduler_working = true;
	while (proc = _Scheduler_queue.shift())
	{
		_Scheduler_step(proc);
	}
	_Scheduler_working = false;
}


function _Scheduler_step(proc)
{
	while (proc.f)
	{
		var rootTag = proc.f.$;
		if (rootTag === 0 || rootTag === 1)
		{
			while (proc.g && proc.g.$ !== rootTag)
			{
				proc.g = proc.g.i;
			}
			if (!proc.g)
			{
				return;
			}
			proc.f = proc.g.b(proc.f.a);
			proc.g = proc.g.i;
		}
		else if (rootTag === 2)
		{
			proc.f.c = proc.f.b(function(newRoot) {
				proc.f = newRoot;
				_Scheduler_enqueue(proc);
			});
			return;
		}
		else if (rootTag === 5)
		{
			if (proc.h.length === 0)
			{
				return;
			}
			proc.f = proc.f.b(proc.h.shift());
		}
		else // if (rootTag === 3 || rootTag === 4)
		{
			proc.g = {
				$: rootTag === 3 ? 0 : 1,
				b: proc.f.b,
				i: proc.g
			};
			proc.f = proc.f.d;
		}
	}
}



function _Process_sleep(time)
{
	return _Scheduler_binding(function(callback) {
		var id = setTimeout(function() {
			callback(_Scheduler_succeed(_Utils_Tuple0));
		}, time);

		return function() { clearTimeout(id); };
	});
}




// PROGRAMS


var _Platform_worker = F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function() { return function() {} }
	);
});



// INITIALIZE A PROGRAM


function _Platform_initialize(flagDecoder, args, init, update, subscriptions, stepperBuilder)
{
	var result = A2(_Json_run, flagDecoder, _Json_wrap(args ? args['flags'] : undefined));
	$elm$core$Result$isOk(result) || _Debug_crash(2 /**/, _Json_errorToString(result.a) /**/);
	var managers = {};
	var initPair = init(result.a);
	var model = initPair.a;
	var stepper = stepperBuilder(sendToApp, model);
	var ports = _Platform_setupEffects(managers, sendToApp);

	function sendToApp(msg, viewMetadata)
	{
		var pair = A2(update, msg, model);
		stepper(model = pair.a, viewMetadata);
		_Platform_enqueueEffects(managers, pair.b, subscriptions(model));
	}

	_Platform_enqueueEffects(managers, initPair.b, subscriptions(model));

	return ports ? { ports: ports } : {};
}



// TRACK PRELOADS
//
// This is used by code in elm/browser and elm/http
// to register any HTTP requests that are triggered by init.
//


var _Platform_preload;


function _Platform_registerPreload(url)
{
	_Platform_preload.add(url);
}



// EFFECT MANAGERS


var _Platform_effectManagers = {};


function _Platform_setupEffects(managers, sendToApp)
{
	var ports;

	// setup all necessary effect managers
	for (var key in _Platform_effectManagers)
	{
		var manager = _Platform_effectManagers[key];

		if (manager.a)
		{
			ports = ports || {};
			ports[key] = manager.a(key, sendToApp);
		}

		managers[key] = _Platform_instantiateManager(manager, sendToApp);
	}

	return ports;
}


function _Platform_createManager(init, onEffects, onSelfMsg, cmdMap, subMap)
{
	return {
		b: init,
		c: onEffects,
		d: onSelfMsg,
		e: cmdMap,
		f: subMap
	};
}


function _Platform_instantiateManager(info, sendToApp)
{
	var router = {
		g: sendToApp,
		h: undefined
	};

	var onEffects = info.c;
	var onSelfMsg = info.d;
	var cmdMap = info.e;
	var subMap = info.f;

	function loop(state)
	{
		return A2(_Scheduler_andThen, loop, _Scheduler_receive(function(msg)
		{
			var value = msg.a;

			if (msg.$ === 0)
			{
				return A3(onSelfMsg, router, value, state);
			}

			return cmdMap && subMap
				? A4(onEffects, router, value.i, value.j, state)
				: A3(onEffects, router, cmdMap ? value.i : value.j, state);
		}));
	}

	return router.h = _Scheduler_rawSpawn(A2(_Scheduler_andThen, loop, info.b));
}



// ROUTING


var _Platform_sendToApp = F2(function(router, msg)
{
	return _Scheduler_binding(function(callback)
	{
		router.g(msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});


var _Platform_sendToSelf = F2(function(router, msg)
{
	return A2(_Scheduler_send, router.h, {
		$: 0,
		a: msg
	});
});



// BAGS


function _Platform_leaf(home)
{
	return function(value)
	{
		return {
			$: 1,
			k: home,
			l: value
		};
	};
}


function _Platform_batch(list)
{
	return {
		$: 2,
		m: list
	};
}


var _Platform_map = F2(function(tagger, bag)
{
	return {
		$: 3,
		n: tagger,
		o: bag
	}
});



// PIPE BAGS INTO EFFECT MANAGERS
//
// Effects must be queued!
//
// Say your init contains a synchronous command, like Time.now or Time.here
//
//   - This will produce a batch of effects (FX_1)
//   - The synchronous task triggers the subsequent `update` call
//   - This will produce a batch of effects (FX_2)
//
// If we just start dispatching FX_2, subscriptions from FX_2 can be processed
// before subscriptions from FX_1. No good! Earlier versions of this code had
// this problem, leading to these reports:
//
//   https://github.com/elm/core/issues/980
//   https://github.com/elm/core/pull/981
//   https://github.com/elm/compiler/issues/1776
//
// The queue is necessary to avoid ordering issues for synchronous commands.


// Why use true/false here? Why not just check the length of the queue?
// The goal is to detect "are we currently dispatching effects?" If we
// are, we need to bail and let the ongoing while loop handle things.
//
// Now say the queue has 1 element. When we dequeue the final element,
// the queue will be empty, but we are still actively dispatching effects.
// So you could get queue jumping in a really tricky category of cases.
//
var _Platform_effectsQueue = [];
var _Platform_effectsActive = false;


function _Platform_enqueueEffects(managers, cmdBag, subBag)
{
	_Platform_effectsQueue.push({ p: managers, q: cmdBag, r: subBag });

	if (_Platform_effectsActive) return;

	_Platform_effectsActive = true;
	for (var fx; fx = _Platform_effectsQueue.shift(); )
	{
		_Platform_dispatchEffects(fx.p, fx.q, fx.r);
	}
	_Platform_effectsActive = false;
}


function _Platform_dispatchEffects(managers, cmdBag, subBag)
{
	var effectsDict = {};
	_Platform_gatherEffects(true, cmdBag, effectsDict, null);
	_Platform_gatherEffects(false, subBag, effectsDict, null);

	for (var home in managers)
	{
		_Scheduler_rawSend(managers[home], {
			$: 'fx',
			a: effectsDict[home] || { i: _List_Nil, j: _List_Nil }
		});
	}
}


function _Platform_gatherEffects(isCmd, bag, effectsDict, taggers)
{
	switch (bag.$)
	{
		case 1:
			var home = bag.k;
			var effect = _Platform_toEffect(isCmd, home, taggers, bag.l);
			effectsDict[home] = _Platform_insert(isCmd, effect, effectsDict[home]);
			return;

		case 2:
			for (var list = bag.m; list.b; list = list.b) // WHILE_CONS
			{
				_Platform_gatherEffects(isCmd, list.a, effectsDict, taggers);
			}
			return;

		case 3:
			_Platform_gatherEffects(isCmd, bag.o, effectsDict, {
				s: bag.n,
				t: taggers
			});
			return;
	}
}


function _Platform_toEffect(isCmd, home, taggers, value)
{
	function applyTaggers(x)
	{
		for (var temp = taggers; temp; temp = temp.t)
		{
			x = temp.s(x);
		}
		return x;
	}

	var map = isCmd
		? _Platform_effectManagers[home].e
		: _Platform_effectManagers[home].f;

	return A2(map, applyTaggers, value)
}


function _Platform_insert(isCmd, newEffect, effects)
{
	effects = effects || { i: _List_Nil, j: _List_Nil };

	isCmd
		? (effects.i = _List_Cons(newEffect, effects.i))
		: (effects.j = _List_Cons(newEffect, effects.j));

	return effects;
}



// PORTS


function _Platform_checkPortName(name)
{
	if (_Platform_effectManagers[name])
	{
		_Debug_crash(3, name)
	}
}



// OUTGOING PORTS


function _Platform_outgoingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		e: _Platform_outgoingPortMap,
		u: converter,
		a: _Platform_setupOutgoingPort
	};
	return _Platform_leaf(name);
}


var _Platform_outgoingPortMap = F2(function(tagger, value) { return value; });


function _Platform_setupOutgoingPort(name)
{
	var subs = [];
	var converter = _Platform_effectManagers[name].u;

	// CREATE MANAGER

	var init = _Process_sleep(0);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, cmdList, state)
	{
		for ( ; cmdList.b; cmdList = cmdList.b) // WHILE_CONS
		{
			// grab a separate reference to subs in case unsubscribe is called
			var currentSubs = subs;
			var value = _Json_unwrap(converter(cmdList.a));
			for (var i = 0; i < currentSubs.length; i++)
			{
				currentSubs[i](value);
			}
		}
		return init;
	});

	// PUBLIC API

	function subscribe(callback)
	{
		subs.push(callback);
	}

	function unsubscribe(callback)
	{
		// copy subs into a new array in case unsubscribe is called within a
		// subscribed callback
		subs = subs.slice();
		var index = subs.indexOf(callback);
		if (index >= 0)
		{
			subs.splice(index, 1);
		}
	}

	return {
		subscribe: subscribe,
		unsubscribe: unsubscribe
	};
}



// INCOMING PORTS


function _Platform_incomingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		f: _Platform_incomingPortMap,
		u: converter,
		a: _Platform_setupIncomingPort
	};
	return _Platform_leaf(name);
}


var _Platform_incomingPortMap = F2(function(tagger, finalTagger)
{
	return function(value)
	{
		return tagger(finalTagger(value));
	};
});


function _Platform_setupIncomingPort(name, sendToApp)
{
	var subs = _List_Nil;
	var converter = _Platform_effectManagers[name].u;

	// CREATE MANAGER

	var init = _Scheduler_succeed(null);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, subList, state)
	{
		subs = subList;
		return init;
	});

	// PUBLIC API

	function send(incomingValue)
	{
		var result = A2(_Json_run, converter, _Json_wrap(incomingValue));

		$elm$core$Result$isOk(result) || _Debug_crash(4, name, result.a);

		var value = result.a;
		for (var temp = subs; temp.b; temp = temp.b) // WHILE_CONS
		{
			sendToApp(temp.a(value));
		}
	}

	return { send: send };
}



// EXPORT ELM MODULES
//
// Have DEBUG and PROD versions so that we can (1) give nicer errors in
// debug mode and (2) not pay for the bits needed for that in prod mode.
//


function _Platform_export_UNUSED(exports)
{
	scope['Elm']
		? _Platform_mergeExportsProd(scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsProd(obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6)
				: _Platform_mergeExportsProd(obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}


function _Platform_export(exports)
{
	scope['Elm']
		? _Platform_mergeExportsDebug('Elm', scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsDebug(moduleName, obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6, moduleName)
				: _Platform_mergeExportsDebug(moduleName + '.' + name, obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}




// HELPERS


var _VirtualDom_divertHrefToApp;

var _VirtualDom_doc = typeof document !== 'undefined' ? document : {};


function _VirtualDom_appendChild(parent, child)
{
	parent.appendChild(child);
}

var _VirtualDom_init = F4(function(virtualNode, flagDecoder, debugMetadata, args)
{
	// NOTE: this function needs _Platform_export available to work

	/**_UNUSED/
	var node = args['node'];
	//*/
	/**/
	var node = args && args['node'] ? args['node'] : _Debug_crash(0);
	//*/

	node.parentNode.replaceChild(
		_VirtualDom_render(virtualNode, function() {}),
		node
	);

	return {};
});



// TEXT


function _VirtualDom_text(string)
{
	return {
		$: 0,
		a: string
	};
}



// NODE


var _VirtualDom_nodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 1,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_node = _VirtualDom_nodeNS(undefined);



// KEYED NODE


var _VirtualDom_keyedNodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 2,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_keyedNode = _VirtualDom_keyedNodeNS(undefined);



// CUSTOM


function _VirtualDom_custom(factList, model, render, diff)
{
	return {
		$: 3,
		d: _VirtualDom_organizeFacts(factList),
		g: model,
		h: render,
		i: diff
	};
}



// MAP


var _VirtualDom_map = F2(function(tagger, node)
{
	return {
		$: 4,
		j: tagger,
		k: node,
		b: 1 + (node.b || 0)
	};
});



// LAZY


function _VirtualDom_thunk(refs, thunk)
{
	return {
		$: 5,
		l: refs,
		m: thunk,
		k: undefined
	};
}

var _VirtualDom_lazy = F2(function(func, a)
{
	return _VirtualDom_thunk([func, a], function() {
		return func(a);
	});
});

var _VirtualDom_lazy2 = F3(function(func, a, b)
{
	return _VirtualDom_thunk([func, a, b], function() {
		return A2(func, a, b);
	});
});

var _VirtualDom_lazy3 = F4(function(func, a, b, c)
{
	return _VirtualDom_thunk([func, a, b, c], function() {
		return A3(func, a, b, c);
	});
});

var _VirtualDom_lazy4 = F5(function(func, a, b, c, d)
{
	return _VirtualDom_thunk([func, a, b, c, d], function() {
		return A4(func, a, b, c, d);
	});
});

var _VirtualDom_lazy5 = F6(function(func, a, b, c, d, e)
{
	return _VirtualDom_thunk([func, a, b, c, d, e], function() {
		return A5(func, a, b, c, d, e);
	});
});

var _VirtualDom_lazy6 = F7(function(func, a, b, c, d, e, f)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f], function() {
		return A6(func, a, b, c, d, e, f);
	});
});

var _VirtualDom_lazy7 = F8(function(func, a, b, c, d, e, f, g)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g], function() {
		return A7(func, a, b, c, d, e, f, g);
	});
});

var _VirtualDom_lazy8 = F9(function(func, a, b, c, d, e, f, g, h)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g, h], function() {
		return A8(func, a, b, c, d, e, f, g, h);
	});
});



// FACTS


var _VirtualDom_on = F2(function(key, handler)
{
	return {
		$: 'a0',
		n: key,
		o: handler
	};
});
var _VirtualDom_style = F2(function(key, value)
{
	return {
		$: 'a1',
		n: key,
		o: value
	};
});
var _VirtualDom_property = F2(function(key, value)
{
	return {
		$: 'a2',
		n: key,
		o: value
	};
});
var _VirtualDom_attribute = F2(function(key, value)
{
	return {
		$: 'a3',
		n: key,
		o: value
	};
});
var _VirtualDom_attributeNS = F3(function(namespace, key, value)
{
	return {
		$: 'a4',
		n: key,
		o: { f: namespace, o: value }
	};
});



// XSS ATTACK VECTOR CHECKS
//
// For some reason, tabs can appear in href protocols and it still works.
// So '\tjava\tSCRIPT:alert("!!!")' and 'javascript:alert("!!!")' are the same
// in practice. That is why _VirtualDom_RE_js and _VirtualDom_RE_js_html look
// so freaky.
//
// Pulling the regular expressions out to the top level gives a slight speed
// boost in small benchmarks (4-10%) but hoisting values to reduce allocation
// can be unpredictable in large programs where JIT may have a harder time with
// functions are not fully self-contained. The benefit is more that the js and
// js_html ones are so weird that I prefer to see them near each other.


var _VirtualDom_RE_script = /^script$/i;
var _VirtualDom_RE_on_formAction = /^(on|formAction$)/i;
var _VirtualDom_RE_js = /^\s*j\s*a\s*v\s*a\s*s\s*c\s*r\s*i\s*p\s*t\s*:/i;
var _VirtualDom_RE_js_html = /^\s*(j\s*a\s*v\s*a\s*s\s*c\s*r\s*i\s*p\s*t\s*:|d\s*a\s*t\s*a\s*:\s*t\s*e\s*x\s*t\s*\/\s*h\s*t\s*m\s*l\s*(,|;))/i;


function _VirtualDom_noScript(tag)
{
	return _VirtualDom_RE_script.test(tag) ? 'p' : tag;
}

function _VirtualDom_noOnOrFormAction(key)
{
	return _VirtualDom_RE_on_formAction.test(key) ? 'data-' + key : key;
}

function _VirtualDom_noInnerHtmlOrFormAction(key)
{
	return key == 'innerHTML' || key == 'formAction' ? 'data-' + key : key;
}

function _VirtualDom_noJavaScriptUri(value)
{
	return _VirtualDom_RE_js.test(value)
		? /**_UNUSED/''//*//**/'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'//*/
		: value;
}

function _VirtualDom_noJavaScriptOrHtmlUri(value)
{
	return _VirtualDom_RE_js_html.test(value)
		? /**_UNUSED/''//*//**/'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'//*/
		: value;
}

function _VirtualDom_noJavaScriptOrHtmlJson(value)
{
	return (typeof _Json_unwrap(value) === 'string' && _VirtualDom_RE_js_html.test(_Json_unwrap(value)))
		? _Json_wrap(
			/**_UNUSED/''//*//**/'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'//*/
		) : value;
}



// MAP FACTS


var _VirtualDom_mapAttribute = F2(function(func, attr)
{
	return (attr.$ === 'a0')
		? A2(_VirtualDom_on, attr.n, _VirtualDom_mapHandler(func, attr.o))
		: attr;
});

function _VirtualDom_mapHandler(func, handler)
{
	var tag = $elm$virtual_dom$VirtualDom$toHandlerInt(handler);

	// 0 = Normal
	// 1 = MayStopPropagation
	// 2 = MayPreventDefault
	// 3 = Custom

	return {
		$: handler.$,
		a:
			!tag
				? A2($elm$json$Json$Decode$map, func, handler.a)
				:
			A3($elm$json$Json$Decode$map2,
				tag < 3
					? _VirtualDom_mapEventTuple
					: _VirtualDom_mapEventRecord,
				$elm$json$Json$Decode$succeed(func),
				handler.a
			)
	};
}

var _VirtualDom_mapEventTuple = F2(function(func, tuple)
{
	return _Utils_Tuple2(func(tuple.a), tuple.b);
});

var _VirtualDom_mapEventRecord = F2(function(func, record)
{
	return {
		message: func(record.message),
		stopPropagation: record.stopPropagation,
		preventDefault: record.preventDefault
	}
});



// ORGANIZE FACTS


function _VirtualDom_organizeFacts(factList)
{
	for (var facts = {}; factList.b; factList = factList.b) // WHILE_CONS
	{
		var entry = factList.a;

		var tag = entry.$;
		var key = entry.n;
		var value = entry.o;

		if (tag === 'a2')
		{
			(key === 'className')
				? _VirtualDom_addClass(facts, key, _Json_unwrap(value))
				: facts[key] = _Json_unwrap(value);

			continue;
		}

		var subFacts = facts[tag] || (facts[tag] = {});
		(tag === 'a3' && key === 'class')
			? _VirtualDom_addClass(subFacts, key, value)
			: subFacts[key] = value;
	}

	return facts;
}

function _VirtualDom_addClass(object, key, newClass)
{
	var classes = object[key];
	object[key] = classes ? classes + ' ' + newClass : newClass;
}



// RENDER


function _VirtualDom_render(vNode, eventNode)
{
	var tag = vNode.$;

	if (tag === 5)
	{
		return _VirtualDom_render(vNode.k || (vNode.k = vNode.m()), eventNode);
	}

	if (tag === 0)
	{
		return _VirtualDom_doc.createTextNode(vNode.a);
	}

	if (tag === 4)
	{
		var subNode = vNode.k;
		var tagger = vNode.j;

		while (subNode.$ === 4)
		{
			typeof tagger !== 'object'
				? tagger = [tagger, subNode.j]
				: tagger.push(subNode.j);

			subNode = subNode.k;
		}

		var subEventRoot = { j: tagger, p: eventNode };
		var domNode = _VirtualDom_render(subNode, subEventRoot);
		domNode.elm_event_node_ref = subEventRoot;
		return domNode;
	}

	if (tag === 3)
	{
		var domNode = vNode.h(vNode.g);
		_VirtualDom_applyFacts(domNode, eventNode, vNode.d);
		return domNode;
	}

	// at this point `tag` must be 1 or 2

	var domNode = vNode.f
		? _VirtualDom_doc.createElementNS(vNode.f, vNode.c)
		: _VirtualDom_doc.createElement(vNode.c);

	if (_VirtualDom_divertHrefToApp && vNode.c == 'a')
	{
		domNode.addEventListener('click', _VirtualDom_divertHrefToApp(domNode));
	}

	_VirtualDom_applyFacts(domNode, eventNode, vNode.d);

	for (var kids = vNode.e, i = 0; i < kids.length; i++)
	{
		_VirtualDom_appendChild(domNode, _VirtualDom_render(tag === 1 ? kids[i] : kids[i].b, eventNode));
	}

	return domNode;
}



// APPLY FACTS


function _VirtualDom_applyFacts(domNode, eventNode, facts)
{
	for (var key in facts)
	{
		var value = facts[key];

		key === 'a1'
			? _VirtualDom_applyStyles(domNode, value)
			:
		key === 'a0'
			? _VirtualDom_applyEvents(domNode, eventNode, value)
			:
		key === 'a3'
			? _VirtualDom_applyAttrs(domNode, value)
			:
		key === 'a4'
			? _VirtualDom_applyAttrsNS(domNode, value)
			:
		((key !== 'value' && key !== 'checked') || domNode[key] !== value) && (domNode[key] = value);
	}
}



// APPLY STYLES


function _VirtualDom_applyStyles(domNode, styles)
{
	var domNodeStyle = domNode.style;

	for (var key in styles)
	{
		domNodeStyle[key] = styles[key];
	}
}



// APPLY ATTRS


function _VirtualDom_applyAttrs(domNode, attrs)
{
	for (var key in attrs)
	{
		var value = attrs[key];
		typeof value !== 'undefined'
			? domNode.setAttribute(key, value)
			: domNode.removeAttribute(key);
	}
}



// APPLY NAMESPACED ATTRS


function _VirtualDom_applyAttrsNS(domNode, nsAttrs)
{
	for (var key in nsAttrs)
	{
		var pair = nsAttrs[key];
		var namespace = pair.f;
		var value = pair.o;

		typeof value !== 'undefined'
			? domNode.setAttributeNS(namespace, key, value)
			: domNode.removeAttributeNS(namespace, key);
	}
}



// APPLY EVENTS


function _VirtualDom_applyEvents(domNode, eventNode, events)
{
	var allCallbacks = domNode.elmFs || (domNode.elmFs = {});

	for (var key in events)
	{
		var newHandler = events[key];
		var oldCallback = allCallbacks[key];

		if (!newHandler)
		{
			domNode.removeEventListener(key, oldCallback);
			allCallbacks[key] = undefined;
			continue;
		}

		if (oldCallback)
		{
			var oldHandler = oldCallback.q;
			if (oldHandler.$ === newHandler.$)
			{
				oldCallback.q = newHandler;
				continue;
			}
			domNode.removeEventListener(key, oldCallback);
		}

		oldCallback = _VirtualDom_makeCallback(eventNode, newHandler);
		domNode.addEventListener(key, oldCallback,
			_VirtualDom_passiveSupported
			&& { passive: $elm$virtual_dom$VirtualDom$toHandlerInt(newHandler) < 2 }
		);
		allCallbacks[key] = oldCallback;
	}
}



// PASSIVE EVENTS


var _VirtualDom_passiveSupported;

try
{
	window.addEventListener('t', null, Object.defineProperty({}, 'passive', {
		get: function() { _VirtualDom_passiveSupported = true; }
	}));
}
catch(e) {}



// EVENT HANDLERS


function _VirtualDom_makeCallback(eventNode, initialHandler)
{
	function callback(event)
	{
		var handler = callback.q;
		var result = _Json_runHelp(handler.a, event);

		if (!$elm$core$Result$isOk(result))
		{
			return;
		}

		var tag = $elm$virtual_dom$VirtualDom$toHandlerInt(handler);

		// 0 = Normal
		// 1 = MayStopPropagation
		// 2 = MayPreventDefault
		// 3 = Custom

		var value = result.a;
		var message = !tag ? value : tag < 3 ? value.a : value.message;
		var stopPropagation = tag == 1 ? value.b : tag == 3 && value.stopPropagation;
		var currentEventNode = (
			stopPropagation && event.stopPropagation(),
			(tag == 2 ? value.b : tag == 3 && value.preventDefault) && event.preventDefault(),
			eventNode
		);
		var tagger;
		var i;
		while (tagger = currentEventNode.j)
		{
			if (typeof tagger == 'function')
			{
				message = tagger(message);
			}
			else
			{
				for (var i = tagger.length; i--; )
				{
					message = tagger[i](message);
				}
			}
			currentEventNode = currentEventNode.p;
		}
		currentEventNode(message, stopPropagation); // stopPropagation implies isSync
	}

	callback.q = initialHandler;

	return callback;
}

function _VirtualDom_equalEvents(x, y)
{
	return x.$ == y.$ && _Json_equality(x.a, y.a);
}



// DIFF


// TODO: Should we do patches like in iOS?
//
// type Patch
//   = At Int Patch
//   | Batch (List Patch)
//   | Change ...
//
// How could it not be better?
//
function _VirtualDom_diff(x, y)
{
	var patches = [];
	_VirtualDom_diffHelp(x, y, patches, 0);
	return patches;
}


function _VirtualDom_pushPatch(patches, type, index, data)
{
	var patch = {
		$: type,
		r: index,
		s: data,
		t: undefined,
		u: undefined
	};
	patches.push(patch);
	return patch;
}


function _VirtualDom_diffHelp(x, y, patches, index)
{
	if (x === y)
	{
		return;
	}

	var xType = x.$;
	var yType = y.$;

	// Bail if you run into different types of nodes. Implies that the
	// structure has changed significantly and it's not worth a diff.
	if (xType !== yType)
	{
		if (xType === 1 && yType === 2)
		{
			y = _VirtualDom_dekey(y);
			yType = 1;
		}
		else
		{
			_VirtualDom_pushPatch(patches, 0, index, y);
			return;
		}
	}

	// Now we know that both nodes are the same $.
	switch (yType)
	{
		case 5:
			var xRefs = x.l;
			var yRefs = y.l;
			var i = xRefs.length;
			var same = i === yRefs.length;
			while (same && i--)
			{
				same = xRefs[i] === yRefs[i];
			}
			if (same)
			{
				y.k = x.k;
				return;
			}
			y.k = y.m();
			var subPatches = [];
			_VirtualDom_diffHelp(x.k, y.k, subPatches, 0);
			subPatches.length > 0 && _VirtualDom_pushPatch(patches, 1, index, subPatches);
			return;

		case 4:
			// gather nested taggers
			var xTaggers = x.j;
			var yTaggers = y.j;
			var nesting = false;

			var xSubNode = x.k;
			while (xSubNode.$ === 4)
			{
				nesting = true;

				typeof xTaggers !== 'object'
					? xTaggers = [xTaggers, xSubNode.j]
					: xTaggers.push(xSubNode.j);

				xSubNode = xSubNode.k;
			}

			var ySubNode = y.k;
			while (ySubNode.$ === 4)
			{
				nesting = true;

				typeof yTaggers !== 'object'
					? yTaggers = [yTaggers, ySubNode.j]
					: yTaggers.push(ySubNode.j);

				ySubNode = ySubNode.k;
			}

			// Just bail if different numbers of taggers. This implies the
			// structure of the virtual DOM has changed.
			if (nesting && xTaggers.length !== yTaggers.length)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			// check if taggers are "the same"
			if (nesting ? !_VirtualDom_pairwiseRefEqual(xTaggers, yTaggers) : xTaggers !== yTaggers)
			{
				_VirtualDom_pushPatch(patches, 2, index, yTaggers);
			}

			// diff everything below the taggers
			_VirtualDom_diffHelp(xSubNode, ySubNode, patches, index + 1);
			return;

		case 0:
			if (x.a !== y.a)
			{
				_VirtualDom_pushPatch(patches, 3, index, y.a);
			}
			return;

		case 1:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKids);
			return;

		case 2:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKeyedKids);
			return;

		case 3:
			if (x.h !== y.h)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
			factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

			var patch = y.i(x.g, y.g);
			patch && _VirtualDom_pushPatch(patches, 5, index, patch);

			return;
	}
}

// assumes the incoming arrays are the same length
function _VirtualDom_pairwiseRefEqual(as, bs)
{
	for (var i = 0; i < as.length; i++)
	{
		if (as[i] !== bs[i])
		{
			return false;
		}
	}

	return true;
}

function _VirtualDom_diffNodes(x, y, patches, index, diffKids)
{
	// Bail if obvious indicators have changed. Implies more serious
	// structural changes such that it's not worth it to diff.
	if (x.c !== y.c || x.f !== y.f)
	{
		_VirtualDom_pushPatch(patches, 0, index, y);
		return;
	}

	var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
	factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

	diffKids(x, y, patches, index);
}



// DIFF FACTS


// TODO Instead of creating a new diff object, it's possible to just test if
// there *is* a diff. During the actual patch, do the diff again and make the
// modifications directly. This way, there's no new allocations. Worth it?
function _VirtualDom_diffFacts(x, y, category)
{
	var diff;

	// look for changes and removals
	for (var xKey in x)
	{
		if (xKey === 'a1' || xKey === 'a0' || xKey === 'a3' || xKey === 'a4')
		{
			var subDiff = _VirtualDom_diffFacts(x[xKey], y[xKey] || {}, xKey);
			if (subDiff)
			{
				diff = diff || {};
				diff[xKey] = subDiff;
			}
			continue;
		}

		// remove if not in the new facts
		if (!(xKey in y))
		{
			diff = diff || {};
			diff[xKey] =
				!category
					? (typeof x[xKey] === 'string' ? '' : null)
					:
				(category === 'a1')
					? ''
					:
				(category === 'a0' || category === 'a3')
					? undefined
					:
				{ f: x[xKey].f, o: undefined };

			continue;
		}

		var xValue = x[xKey];
		var yValue = y[xKey];

		// reference equal, so don't worry about it
		if (xValue === yValue && xKey !== 'value' && xKey !== 'checked'
			|| category === 'a0' && _VirtualDom_equalEvents(xValue, yValue))
		{
			continue;
		}

		diff = diff || {};
		diff[xKey] = yValue;
	}

	// add new stuff
	for (var yKey in y)
	{
		if (!(yKey in x))
		{
			diff = diff || {};
			diff[yKey] = y[yKey];
		}
	}

	return diff;
}



// DIFF KIDS


function _VirtualDom_diffKids(xParent, yParent, patches, index)
{
	var xKids = xParent.e;
	var yKids = yParent.e;

	var xLen = xKids.length;
	var yLen = yKids.length;

	// FIGURE OUT IF THERE ARE INSERTS OR REMOVALS

	if (xLen > yLen)
	{
		_VirtualDom_pushPatch(patches, 6, index, {
			v: yLen,
			i: xLen - yLen
		});
	}
	else if (xLen < yLen)
	{
		_VirtualDom_pushPatch(patches, 7, index, {
			v: xLen,
			e: yKids
		});
	}

	// PAIRWISE DIFF EVERYTHING ELSE

	for (var minLen = xLen < yLen ? xLen : yLen, i = 0; i < minLen; i++)
	{
		var xKid = xKids[i];
		_VirtualDom_diffHelp(xKid, yKids[i], patches, ++index);
		index += xKid.b || 0;
	}
}



// KEYED DIFF


function _VirtualDom_diffKeyedKids(xParent, yParent, patches, rootIndex)
{
	var localPatches = [];

	var changes = {}; // Dict String Entry
	var inserts = []; // Array { index : Int, entry : Entry }
	// type Entry = { tag : String, vnode : VNode, index : Int, data : _ }

	var xKids = xParent.e;
	var yKids = yParent.e;
	var xLen = xKids.length;
	var yLen = yKids.length;
	var xIndex = 0;
	var yIndex = 0;

	var index = rootIndex;

	while (xIndex < xLen && yIndex < yLen)
	{
		var x = xKids[xIndex];
		var y = yKids[yIndex];

		var xKey = x.a;
		var yKey = y.a;
		var xNode = x.b;
		var yNode = y.b;

		var newMatch = undefined;
		var oldMatch = undefined;

		// check if keys match

		if (xKey === yKey)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNode, localPatches, index);
			index += xNode.b || 0;

			xIndex++;
			yIndex++;
			continue;
		}

		// look ahead 1 to detect insertions and removals.

		var xNext = xKids[xIndex + 1];
		var yNext = yKids[yIndex + 1];

		if (xNext)
		{
			var xNextKey = xNext.a;
			var xNextNode = xNext.b;
			oldMatch = yKey === xNextKey;
		}

		if (yNext)
		{
			var yNextKey = yNext.a;
			var yNextNode = yNext.b;
			newMatch = xKey === yNextKey;
		}


		// swap x and y
		if (newMatch && oldMatch)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			_VirtualDom_insertNode(changes, localPatches, xKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNextNode, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		// insert y
		if (newMatch)
		{
			index++;
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			index += xNode.b || 0;

			xIndex += 1;
			yIndex += 2;
			continue;
		}

		// remove x
		if (oldMatch)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 1;
			continue;
		}

		// remove x, insert y
		if (xNext && xNextKey === yNextKey)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNextNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		break;
	}

	// eat up any remaining nodes with removeNode and insertNode

	while (xIndex < xLen)
	{
		index++;
		var x = xKids[xIndex];
		var xNode = x.b;
		_VirtualDom_removeNode(changes, localPatches, x.a, xNode, index);
		index += xNode.b || 0;
		xIndex++;
	}

	while (yIndex < yLen)
	{
		var endInserts = endInserts || [];
		var y = yKids[yIndex];
		_VirtualDom_insertNode(changes, localPatches, y.a, y.b, undefined, endInserts);
		yIndex++;
	}

	if (localPatches.length > 0 || inserts.length > 0 || endInserts)
	{
		_VirtualDom_pushPatch(patches, 8, rootIndex, {
			w: localPatches,
			x: inserts,
			y: endInserts
		});
	}
}



// CHANGES FROM KEYED DIFF


var _VirtualDom_POSTFIX = '_elmW6BL';


function _VirtualDom_insertNode(changes, localPatches, key, vnode, yIndex, inserts)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		entry = {
			c: 0,
			z: vnode,
			r: yIndex,
			s: undefined
		};

		inserts.push({ r: yIndex, A: entry });
		changes[key] = entry;

		return;
	}

	// this key was removed earlier, a match!
	if (entry.c === 1)
	{
		inserts.push({ r: yIndex, A: entry });

		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(entry.z, vnode, subPatches, entry.r);
		entry.r = yIndex;
		entry.s.s = {
			w: subPatches,
			A: entry
		};

		return;
	}

	// this key has already been inserted or moved, a duplicate!
	_VirtualDom_insertNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, yIndex, inserts);
}


function _VirtualDom_removeNode(changes, localPatches, key, vnode, index)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		var patch = _VirtualDom_pushPatch(localPatches, 9, index, undefined);

		changes[key] = {
			c: 1,
			z: vnode,
			r: index,
			s: patch
		};

		return;
	}

	// this key was inserted earlier, a match!
	if (entry.c === 0)
	{
		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(vnode, entry.z, subPatches, index);

		_VirtualDom_pushPatch(localPatches, 9, index, {
			w: subPatches,
			A: entry
		});

		return;
	}

	// this key has already been removed or moved, a duplicate!
	_VirtualDom_removeNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, index);
}



// ADD DOM NODES
//
// Each DOM node has an "index" assigned in order of traversal. It is important
// to minimize our crawl over the actual DOM, so these indexes (along with the
// descendantsCount of virtual nodes) let us skip touching entire subtrees of
// the DOM if we know there are no patches there.


function _VirtualDom_addDomNodes(domNode, vNode, patches, eventNode)
{
	_VirtualDom_addDomNodesHelp(domNode, vNode, patches, 0, 0, vNode.b, eventNode);
}


// assumes `patches` is non-empty and indexes increase monotonically.
function _VirtualDom_addDomNodesHelp(domNode, vNode, patches, i, low, high, eventNode)
{
	var patch = patches[i];
	var index = patch.r;

	while (index === low)
	{
		var patchType = patch.$;

		if (patchType === 1)
		{
			_VirtualDom_addDomNodes(domNode, vNode.k, patch.s, eventNode);
		}
		else if (patchType === 8)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var subPatches = patch.s.w;
			if (subPatches.length > 0)
			{
				_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
			}
		}
		else if (patchType === 9)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var data = patch.s;
			if (data)
			{
				data.A.s = domNode;
				var subPatches = data.w;
				if (subPatches.length > 0)
				{
					_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
				}
			}
		}
		else
		{
			patch.t = domNode;
			patch.u = eventNode;
		}

		i++;

		if (!(patch = patches[i]) || (index = patch.r) > high)
		{
			return i;
		}
	}

	var tag = vNode.$;

	if (tag === 4)
	{
		var subNode = vNode.k;

		while (subNode.$ === 4)
		{
			subNode = subNode.k;
		}

		return _VirtualDom_addDomNodesHelp(domNode, subNode, patches, i, low + 1, high, domNode.elm_event_node_ref);
	}

	// tag must be 1 or 2 at this point

	var vKids = vNode.e;
	var childNodes = domNode.childNodes;
	for (var j = 0; j < vKids.length; j++)
	{
		low++;
		var vKid = tag === 1 ? vKids[j] : vKids[j].b;
		var nextLow = low + (vKid.b || 0);
		if (low <= index && index <= nextLow)
		{
			i = _VirtualDom_addDomNodesHelp(childNodes[j], vKid, patches, i, low, nextLow, eventNode);
			if (!(patch = patches[i]) || (index = patch.r) > high)
			{
				return i;
			}
		}
		low = nextLow;
	}
	return i;
}



// APPLY PATCHES


function _VirtualDom_applyPatches(rootDomNode, oldVirtualNode, patches, eventNode)
{
	if (patches.length === 0)
	{
		return rootDomNode;
	}

	_VirtualDom_addDomNodes(rootDomNode, oldVirtualNode, patches, eventNode);
	return _VirtualDom_applyPatchesHelp(rootDomNode, patches);
}

function _VirtualDom_applyPatchesHelp(rootDomNode, patches)
{
	for (var i = 0; i < patches.length; i++)
	{
		var patch = patches[i];
		var localDomNode = patch.t
		var newNode = _VirtualDom_applyPatch(localDomNode, patch);
		if (localDomNode === rootDomNode)
		{
			rootDomNode = newNode;
		}
	}
	return rootDomNode;
}

function _VirtualDom_applyPatch(domNode, patch)
{
	switch (patch.$)
	{
		case 0:
			return _VirtualDom_applyPatchRedraw(domNode, patch.s, patch.u);

		case 4:
			_VirtualDom_applyFacts(domNode, patch.u, patch.s);
			return domNode;

		case 3:
			domNode.replaceData(0, domNode.length, patch.s);
			return domNode;

		case 1:
			return _VirtualDom_applyPatchesHelp(domNode, patch.s);

		case 2:
			if (domNode.elm_event_node_ref)
			{
				domNode.elm_event_node_ref.j = patch.s;
			}
			else
			{
				domNode.elm_event_node_ref = { j: patch.s, p: patch.u };
			}
			return domNode;

		case 6:
			var data = patch.s;
			for (var i = 0; i < data.i; i++)
			{
				domNode.removeChild(domNode.childNodes[data.v]);
			}
			return domNode;

		case 7:
			var data = patch.s;
			var kids = data.e;
			var i = data.v;
			var theEnd = domNode.childNodes[i];
			for (; i < kids.length; i++)
			{
				domNode.insertBefore(_VirtualDom_render(kids[i], patch.u), theEnd);
			}
			return domNode;

		case 9:
			var data = patch.s;
			if (!data)
			{
				domNode.parentNode.removeChild(domNode);
				return domNode;
			}
			var entry = data.A;
			if (typeof entry.r !== 'undefined')
			{
				domNode.parentNode.removeChild(domNode);
			}
			entry.s = _VirtualDom_applyPatchesHelp(domNode, data.w);
			return domNode;

		case 8:
			return _VirtualDom_applyPatchReorder(domNode, patch);

		case 5:
			return patch.s(domNode);

		default:
			_Debug_crash(10); // 'Ran into an unknown patch!'
	}
}


function _VirtualDom_applyPatchRedraw(domNode, vNode, eventNode)
{
	var parentNode = domNode.parentNode;
	var newNode = _VirtualDom_render(vNode, eventNode);

	if (!newNode.elm_event_node_ref)
	{
		newNode.elm_event_node_ref = domNode.elm_event_node_ref;
	}

	if (parentNode && newNode !== domNode)
	{
		parentNode.replaceChild(newNode, domNode);
	}
	return newNode;
}


function _VirtualDom_applyPatchReorder(domNode, patch)
{
	var data = patch.s;

	// remove end inserts
	var frag = _VirtualDom_applyPatchReorderEndInsertsHelp(data.y, patch);

	// removals
	domNode = _VirtualDom_applyPatchesHelp(domNode, data.w);

	// inserts
	var inserts = data.x;
	for (var i = 0; i < inserts.length; i++)
	{
		var insert = inserts[i];
		var entry = insert.A;
		var node = entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u);
		domNode.insertBefore(node, domNode.childNodes[insert.r]);
	}

	// add end inserts
	if (frag)
	{
		_VirtualDom_appendChild(domNode, frag);
	}

	return domNode;
}


function _VirtualDom_applyPatchReorderEndInsertsHelp(endInserts, patch)
{
	if (!endInserts)
	{
		return;
	}

	var frag = _VirtualDom_doc.createDocumentFragment();
	for (var i = 0; i < endInserts.length; i++)
	{
		var insert = endInserts[i];
		var entry = insert.A;
		_VirtualDom_appendChild(frag, entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u)
		);
	}
	return frag;
}


function _VirtualDom_virtualize(node)
{
	// TEXT NODES

	if (node.nodeType === 3)
	{
		return _VirtualDom_text(node.textContent);
	}


	// WEIRD NODES

	if (node.nodeType !== 1)
	{
		return _VirtualDom_text('');
	}


	// ELEMENT NODES

	var attrList = _List_Nil;
	var attrs = node.attributes;
	for (var i = attrs.length; i--; )
	{
		var attr = attrs[i];
		var name = attr.name;
		var value = attr.value;
		attrList = _List_Cons( A2(_VirtualDom_attribute, name, value), attrList );
	}

	var tag = node.tagName.toLowerCase();
	var kidList = _List_Nil;
	var kids = node.childNodes;

	for (var i = kids.length; i--; )
	{
		kidList = _List_Cons(_VirtualDom_virtualize(kids[i]), kidList);
	}
	return A3(_VirtualDom_node, tag, attrList, kidList);
}

function _VirtualDom_dekey(keyedNode)
{
	var keyedKids = keyedNode.e;
	var len = keyedKids.length;
	var kids = new Array(len);
	for (var i = 0; i < len; i++)
	{
		kids[i] = keyedKids[i].b;
	}

	return {
		$: 1,
		c: keyedNode.c,
		d: keyedNode.d,
		e: kids,
		f: keyedNode.f,
		b: keyedNode.b
	};
}




// ELEMENT


var _Debugger_element;

var _Browser_element = _Debugger_element || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function(sendToApp, initialModel) {
			var view = impl.view;
			/**_UNUSED/
			var domNode = args['node'];
			//*/
			/**/
			var domNode = args && args['node'] ? args['node'] : _Debug_crash(0);
			//*/
			var currNode = _VirtualDom_virtualize(domNode);

			return _Browser_makeAnimator(initialModel, function(model)
			{
				var nextNode = view(model);
				var patches = _VirtualDom_diff(currNode, nextNode);
				domNode = _VirtualDom_applyPatches(domNode, currNode, patches, sendToApp);
				currNode = nextNode;
			});
		}
	);
});



// DOCUMENT


var _Debugger_document;

var _Browser_document = _Debugger_document || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function(sendToApp, initialModel) {
			var divertHrefToApp = impl.setup && impl.setup(sendToApp)
			var view = impl.view;
			var title = _VirtualDom_doc.title;
			var bodyNode = _VirtualDom_doc.body;
			var currNode = _VirtualDom_virtualize(bodyNode);
			return _Browser_makeAnimator(initialModel, function(model)
			{
				_VirtualDom_divertHrefToApp = divertHrefToApp;
				var doc = view(model);
				var nextNode = _VirtualDom_node('body')(_List_Nil)(doc.body);
				var patches = _VirtualDom_diff(currNode, nextNode);
				bodyNode = _VirtualDom_applyPatches(bodyNode, currNode, patches, sendToApp);
				currNode = nextNode;
				_VirtualDom_divertHrefToApp = 0;
				(title !== doc.title) && (_VirtualDom_doc.title = title = doc.title);
			});
		}
	);
});



// ANIMATION


var _Browser_cancelAnimationFrame =
	typeof cancelAnimationFrame !== 'undefined'
		? cancelAnimationFrame
		: function(id) { clearTimeout(id); };

var _Browser_requestAnimationFrame =
	typeof requestAnimationFrame !== 'undefined'
		? requestAnimationFrame
		: function(callback) { return setTimeout(callback, 1000 / 60); };


function _Browser_makeAnimator(model, draw)
{
	draw(model);

	var state = 0;

	function updateIfNeeded()
	{
		state = state === 1
			? 0
			: ( _Browser_requestAnimationFrame(updateIfNeeded), draw(model), 1 );
	}

	return function(nextModel, isSync)
	{
		model = nextModel;

		isSync
			? ( draw(model),
				state === 2 && (state = 1)
				)
			: ( state === 0 && _Browser_requestAnimationFrame(updateIfNeeded),
				state = 2
				);
	};
}



// APPLICATION


function _Browser_application(impl)
{
	var onUrlChange = impl.onUrlChange;
	var onUrlRequest = impl.onUrlRequest;
	var key = function() { key.a(onUrlChange(_Browser_getUrl())); };

	return _Browser_document({
		setup: function(sendToApp)
		{
			key.a = sendToApp;
			_Browser_window.addEventListener('popstate', key);
			_Browser_window.navigator.userAgent.indexOf('Trident') < 0 || _Browser_window.addEventListener('hashchange', key);

			return F2(function(domNode, event)
			{
				if (!event.ctrlKey && !event.metaKey && !event.shiftKey && event.button < 1 && !domNode.target && !domNode.hasAttribute('download'))
				{
					event.preventDefault();
					var href = domNode.href;
					var curr = _Browser_getUrl();
					var next = $elm$url$Url$fromString(href).a;
					sendToApp(onUrlRequest(
						(next
							&& curr.protocol === next.protocol
							&& curr.host === next.host
							&& curr.port_.a === next.port_.a
						)
							? $elm$browser$Browser$Internal(next)
							: $elm$browser$Browser$External(href)
					));
				}
			});
		},
		init: function(flags)
		{
			return A3(impl.init, flags, _Browser_getUrl(), key);
		},
		view: impl.view,
		update: impl.update,
		subscriptions: impl.subscriptions
	});
}

function _Browser_getUrl()
{
	return $elm$url$Url$fromString(_VirtualDom_doc.location.href).a || _Debug_crash(1);
}

var _Browser_go = F2(function(key, n)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		n && history.go(n);
		key();
	}));
});

var _Browser_pushUrl = F2(function(key, url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		history.pushState({}, '', url);
		key();
	}));
});

var _Browser_replaceUrl = F2(function(key, url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		history.replaceState({}, '', url);
		key();
	}));
});



// GLOBAL EVENTS


var _Browser_fakeNode = { addEventListener: function() {}, removeEventListener: function() {} };
var _Browser_doc = typeof document !== 'undefined' ? document : _Browser_fakeNode;
var _Browser_window = typeof window !== 'undefined' ? window : _Browser_fakeNode;

var _Browser_on = F3(function(node, eventName, sendToSelf)
{
	return _Scheduler_spawn(_Scheduler_binding(function(callback)
	{
		function handler(event)	{ _Scheduler_rawSpawn(sendToSelf(event)); }
		node.addEventListener(eventName, handler, _VirtualDom_passiveSupported && { passive: true });
		return function() { node.removeEventListener(eventName, handler); };
	}));
});

var _Browser_decodeEvent = F2(function(decoder, event)
{
	var result = _Json_runHelp(decoder, event);
	return $elm$core$Result$isOk(result) ? $elm$core$Maybe$Just(result.a) : $elm$core$Maybe$Nothing;
});



// PAGE VISIBILITY


function _Browser_visibilityInfo()
{
	return (typeof _VirtualDom_doc.hidden !== 'undefined')
		? { hidden: 'hidden', change: 'visibilitychange' }
		:
	(typeof _VirtualDom_doc.mozHidden !== 'undefined')
		? { hidden: 'mozHidden', change: 'mozvisibilitychange' }
		:
	(typeof _VirtualDom_doc.msHidden !== 'undefined')
		? { hidden: 'msHidden', change: 'msvisibilitychange' }
		:
	(typeof _VirtualDom_doc.webkitHidden !== 'undefined')
		? { hidden: 'webkitHidden', change: 'webkitvisibilitychange' }
		: { hidden: 'hidden', change: 'visibilitychange' };
}



// ANIMATION FRAMES


function _Browser_rAF()
{
	return _Scheduler_binding(function(callback)
	{
		var id = _Browser_requestAnimationFrame(function() {
			callback(_Scheduler_succeed(Date.now()));
		});

		return function() {
			_Browser_cancelAnimationFrame(id);
		};
	});
}


function _Browser_now()
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(Date.now()));
	});
}



// DOM STUFF


function _Browser_withNode(id, doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			var node = document.getElementById(id);
			callback(node
				? _Scheduler_succeed(doStuff(node))
				: _Scheduler_fail($elm$browser$Browser$Dom$NotFound(id))
			);
		});
	});
}


function _Browser_withWindow(doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			callback(_Scheduler_succeed(doStuff()));
		});
	});
}


// FOCUS and BLUR


var _Browser_call = F2(function(functionName, id)
{
	return _Browser_withNode(id, function(node) {
		node[functionName]();
		return _Utils_Tuple0;
	});
});



// WINDOW VIEWPORT


function _Browser_getViewport()
{
	return {
		scene: _Browser_getScene(),
		viewport: {
			x: _Browser_window.pageXOffset,
			y: _Browser_window.pageYOffset,
			width: _Browser_doc.documentElement.clientWidth,
			height: _Browser_doc.documentElement.clientHeight
		}
	};
}

function _Browser_getScene()
{
	var body = _Browser_doc.body;
	var elem = _Browser_doc.documentElement;
	return {
		width: Math.max(body.scrollWidth, body.offsetWidth, elem.scrollWidth, elem.offsetWidth, elem.clientWidth),
		height: Math.max(body.scrollHeight, body.offsetHeight, elem.scrollHeight, elem.offsetHeight, elem.clientHeight)
	};
}

var _Browser_setViewport = F2(function(x, y)
{
	return _Browser_withWindow(function()
	{
		_Browser_window.scroll(x, y);
		return _Utils_Tuple0;
	});
});



// ELEMENT VIEWPORT


function _Browser_getViewportOf(id)
{
	return _Browser_withNode(id, function(node)
	{
		return {
			scene: {
				width: node.scrollWidth,
				height: node.scrollHeight
			},
			viewport: {
				x: node.scrollLeft,
				y: node.scrollTop,
				width: node.clientWidth,
				height: node.clientHeight
			}
		};
	});
}


var _Browser_setViewportOf = F3(function(id, x, y)
{
	return _Browser_withNode(id, function(node)
	{
		node.scrollLeft = x;
		node.scrollTop = y;
		return _Utils_Tuple0;
	});
});



// ELEMENT


function _Browser_getElement(id)
{
	return _Browser_withNode(id, function(node)
	{
		var rect = node.getBoundingClientRect();
		var x = _Browser_window.pageXOffset;
		var y = _Browser_window.pageYOffset;
		return {
			scene: _Browser_getScene(),
			viewport: {
				x: x,
				y: y,
				width: _Browser_doc.documentElement.clientWidth,
				height: _Browser_doc.documentElement.clientHeight
			},
			element: {
				x: x + rect.left,
				y: y + rect.top,
				width: rect.width,
				height: rect.height
			}
		};
	});
}



// LOAD and RELOAD


function _Browser_reload(skipCache)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		_VirtualDom_doc.location.reload(skipCache);
	}));
}

function _Browser_load(url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		try
		{
			_Browser_window.location = url;
		}
		catch(err)
		{
			// Only Firefox can throw a NS_ERROR_MALFORMED_URI exception here.
			// Other browsers reload the page, so let's be consistent about that.
			_VirtualDom_doc.location.reload(false);
		}
	}));
}



function _Time_now(millisToPosix)
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(millisToPosix(Date.now())));
	});
}

var _Time_setInterval = F2(function(interval, task)
{
	return _Scheduler_binding(function(callback)
	{
		var id = setInterval(function() { _Scheduler_rawSpawn(task); }, interval);
		return function() { clearInterval(id); };
	});
});

function _Time_here()
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(
			A2($elm$time$Time$customZone, -(new Date().getTimezoneOffset()), _List_Nil)
		));
	});
}


function _Time_getZoneName()
{
	return _Scheduler_binding(function(callback)
	{
		try
		{
			var name = $elm$time$Time$Name(Intl.DateTimeFormat().resolvedOptions().timeZone);
		}
		catch (e)
		{
			var name = $elm$time$Time$Offset(new Date().getTimezoneOffset());
		}
		callback(_Scheduler_succeed(name));
	});
}



var _Bitwise_and = F2(function(a, b)
{
	return a & b;
});

var _Bitwise_or = F2(function(a, b)
{
	return a | b;
});

var _Bitwise_xor = F2(function(a, b)
{
	return a ^ b;
});

function _Bitwise_complement(a)
{
	return ~a;
};

var _Bitwise_shiftLeftBy = F2(function(offset, a)
{
	return a << offset;
});

var _Bitwise_shiftRightBy = F2(function(offset, a)
{
	return a >> offset;
});

var _Bitwise_shiftRightZfBy = F2(function(offset, a)
{
	return a >>> offset;
});



// SEND REQUEST

var _Http_toTask = F3(function(router, toTask, request)
{
	return _Scheduler_binding(function(callback)
	{
		function done(response) {
			callback(toTask(request.expect.a(response)));
		}

		var xhr = new XMLHttpRequest();
		xhr.addEventListener('error', function() { done($elm$http$Http$NetworkError_); });
		xhr.addEventListener('timeout', function() { done($elm$http$Http$Timeout_); });
		xhr.addEventListener('load', function() { done(_Http_toResponse(request.expect.b, xhr)); });
		$elm$core$Maybe$isJust(request.tracker) && _Http_track(router, xhr, request.tracker.a);

		try {
			xhr.open(request.method, request.url, true);
		} catch (e) {
			return done($elm$http$Http$BadUrl_(request.url));
		}

		_Http_configureRequest(xhr, request);

		request.body.a && xhr.setRequestHeader('Content-Type', request.body.a);
		xhr.send(request.body.b);

		return function() { xhr.c = true; xhr.abort(); };
	});
});


// CONFIGURE

function _Http_configureRequest(xhr, request)
{
	for (var headers = request.headers; headers.b; headers = headers.b) // WHILE_CONS
	{
		xhr.setRequestHeader(headers.a.a, headers.a.b);
	}
	xhr.timeout = request.timeout.a || 0;
	xhr.responseType = request.expect.d;
	xhr.withCredentials = request.allowCookiesFromOtherDomains;
}


// RESPONSES

function _Http_toResponse(toBody, xhr)
{
	return A2(
		200 <= xhr.status && xhr.status < 300 ? $elm$http$Http$GoodStatus_ : $elm$http$Http$BadStatus_,
		_Http_toMetadata(xhr),
		toBody(xhr.response)
	);
}


// METADATA

function _Http_toMetadata(xhr)
{
	return {
		url: xhr.responseURL,
		statusCode: xhr.status,
		statusText: xhr.statusText,
		headers: _Http_parseHeaders(xhr.getAllResponseHeaders())
	};
}


// HEADERS

function _Http_parseHeaders(rawHeaders)
{
	if (!rawHeaders)
	{
		return $elm$core$Dict$empty;
	}

	var headers = $elm$core$Dict$empty;
	var headerPairs = rawHeaders.split('\r\n');
	for (var i = headerPairs.length; i--; )
	{
		var headerPair = headerPairs[i];
		var index = headerPair.indexOf(': ');
		if (index > 0)
		{
			var key = headerPair.substring(0, index);
			var value = headerPair.substring(index + 2);

			headers = A3($elm$core$Dict$update, key, function(oldValue) {
				return $elm$core$Maybe$Just($elm$core$Maybe$isJust(oldValue)
					? value + ', ' + oldValue.a
					: value
				);
			}, headers);
		}
	}
	return headers;
}


// EXPECT

var _Http_expect = F3(function(type, toBody, toValue)
{
	return {
		$: 0,
		d: type,
		b: toBody,
		a: toValue
	};
});

var _Http_mapExpect = F2(function(func, expect)
{
	return {
		$: 0,
		d: expect.d,
		b: expect.b,
		a: function(x) { return func(expect.a(x)); }
	};
});

function _Http_toDataView(arrayBuffer)
{
	return new DataView(arrayBuffer);
}


// BODY and PARTS

var _Http_emptyBody = { $: 0 };
var _Http_pair = F2(function(a, b) { return { $: 0, a: a, b: b }; });

function _Http_toFormData(parts)
{
	for (var formData = new FormData(); parts.b; parts = parts.b) // WHILE_CONS
	{
		var part = parts.a;
		formData.append(part.a, part.b);
	}
	return formData;
}

var _Http_bytesToBlob = F2(function(mime, bytes)
{
	return new Blob([bytes], { type: mime });
});


// PROGRESS

function _Http_track(router, xhr, tracker)
{
	// TODO check out lengthComputable on loadstart event

	xhr.upload.addEventListener('progress', function(event) {
		if (xhr.c) { return; }
		_Scheduler_rawSpawn(A2($elm$core$Platform$sendToSelf, router, _Utils_Tuple2(tracker, $elm$http$Http$Sending({
			sent: event.loaded,
			size: event.total
		}))));
	});
	xhr.addEventListener('progress', function(event) {
		if (xhr.c) { return; }
		_Scheduler_rawSpawn(A2($elm$core$Platform$sendToSelf, router, _Utils_Tuple2(tracker, $elm$http$Http$Receiving({
			received: event.loaded,
			size: event.lengthComputable ? $elm$core$Maybe$Just(event.total) : $elm$core$Maybe$Nothing
		}))));
	});
}

// CREATE

var _Regex_never = /.^/;

var _Regex_fromStringWith = F2(function(options, string)
{
	var flags = 'g';
	if (options.multiline) { flags += 'm'; }
	if (options.caseInsensitive) { flags += 'i'; }

	try
	{
		return $elm$core$Maybe$Just(new RegExp(string, flags));
	}
	catch(error)
	{
		return $elm$core$Maybe$Nothing;
	}
});


// USE

var _Regex_contains = F2(function(re, string)
{
	return string.match(re) !== null;
});


var _Regex_findAtMost = F3(function(n, re, str)
{
	var out = [];
	var number = 0;
	var string = str;
	var lastIndex = re.lastIndex;
	var prevLastIndex = -1;
	var result;
	while (number++ < n && (result = re.exec(string)))
	{
		if (prevLastIndex == re.lastIndex) break;
		var i = result.length - 1;
		var subs = new Array(i);
		while (i > 0)
		{
			var submatch = result[i];
			subs[--i] = submatch
				? $elm$core$Maybe$Just(submatch)
				: $elm$core$Maybe$Nothing;
		}
		out.push(A4($elm$regex$Regex$Match, result[0], result.index, number, _List_fromArray(subs)));
		prevLastIndex = re.lastIndex;
	}
	re.lastIndex = lastIndex;
	return _List_fromArray(out);
});


var _Regex_replaceAtMost = F4(function(n, re, replacer, string)
{
	var count = 0;
	function jsReplacer(match)
	{
		if (count++ >= n)
		{
			return match;
		}
		var i = arguments.length - 3;
		var submatches = new Array(i);
		while (i > 0)
		{
			var submatch = arguments[i];
			submatches[--i] = submatch
				? $elm$core$Maybe$Just(submatch)
				: $elm$core$Maybe$Nothing;
		}
		return replacer(A4($elm$regex$Regex$Match, match, arguments[arguments.length - 2], count, _List_fromArray(submatches)));
	}
	return string.replace(re, jsReplacer);
});

var _Regex_splitAtMost = F3(function(n, re, str)
{
	var string = str;
	var out = [];
	var start = re.lastIndex;
	var restoreLastIndex = re.lastIndex;
	while (n--)
	{
		var result = re.exec(string);
		if (!result) break;
		out.push(string.slice(start, result.index));
		start = re.lastIndex;
	}
	out.push(string.slice(start));
	re.lastIndex = restoreLastIndex;
	return _List_fromArray(out);
});

var _Regex_infinity = Infinity;




// STRINGS


var _Parser_isSubString = F5(function(smallString, offset, row, col, bigString)
{
	var smallLength = smallString.length;
	var isGood = offset + smallLength <= bigString.length;

	for (var i = 0; isGood && i < smallLength; )
	{
		var code = bigString.charCodeAt(offset);
		isGood =
			smallString[i++] === bigString[offset++]
			&& (
				code === 0x000A /* \n */
					? ( row++, col=1 )
					: ( col++, (code & 0xF800) === 0xD800 ? smallString[i++] === bigString[offset++] : 1 )
			)
	}

	return _Utils_Tuple3(isGood ? offset : -1, row, col);
});



// CHARS


var _Parser_isSubChar = F3(function(predicate, offset, string)
{
	return (
		string.length <= offset
			? -1
			:
		(string.charCodeAt(offset) & 0xF800) === 0xD800
			? (predicate(_Utils_chr(string.substr(offset, 2))) ? offset + 2 : -1)
			:
		(predicate(_Utils_chr(string[offset]))
			? ((string[offset] === '\n') ? -2 : (offset + 1))
			: -1
		)
	);
});


var _Parser_isAsciiCode = F3(function(code, offset, string)
{
	return string.charCodeAt(offset) === code;
});



// NUMBERS


var _Parser_chompBase10 = F2(function(offset, string)
{
	for (; offset < string.length; offset++)
	{
		var code = string.charCodeAt(offset);
		if (code < 0x30 || 0x39 < code)
		{
			return offset;
		}
	}
	return offset;
});


var _Parser_consumeBase = F3(function(base, offset, string)
{
	for (var total = 0; offset < string.length; offset++)
	{
		var digit = string.charCodeAt(offset) - 0x30;
		if (digit < 0 || base <= digit) break;
		total = base * total + digit;
	}
	return _Utils_Tuple2(offset, total);
});


var _Parser_consumeBase16 = F2(function(offset, string)
{
	for (var total = 0; offset < string.length; offset++)
	{
		var code = string.charCodeAt(offset);
		if (0x30 <= code && code <= 0x39)
		{
			total = 16 * total + code - 0x30;
		}
		else if (0x41 <= code && code <= 0x46)
		{
			total = 16 * total + code - 55;
		}
		else if (0x61 <= code && code <= 0x66)
		{
			total = 16 * total + code - 87;
		}
		else
		{
			break;
		}
	}
	return _Utils_Tuple2(offset, total);
});



// FIND STRING


var _Parser_findSubString = F5(function(smallString, offset, row, col, bigString)
{
	var newOffset = bigString.indexOf(smallString, offset);
	var target = newOffset < 0 ? bigString.length : newOffset + smallString.length;

	while (offset < target)
	{
		var code = bigString.charCodeAt(offset++);
		code === 0x000A /* \n */
			? ( col=1, row++ )
			: ( col++, (code & 0xF800) === 0xD800 && offset++ )
	}

	return _Utils_Tuple3(newOffset, row, col);
});
var $author$project$Main$LinkClicked = function (a) {
	return {$: 'LinkClicked', a: a};
};
var $author$project$Main$UrlChanged = function (a) {
	return {$: 'UrlChanged', a: a};
};
var $elm$core$Basics$EQ = {$: 'EQ'};
var $elm$core$Basics$GT = {$: 'GT'};
var $elm$core$Basics$LT = {$: 'LT'};
var $elm$core$List$cons = _List_cons;
var $elm$core$Dict$foldr = F3(
	function (func, acc, t) {
		foldr:
		while (true) {
			if (t.$ === 'RBEmpty_elm_builtin') {
				return acc;
			} else {
				var key = t.b;
				var value = t.c;
				var left = t.d;
				var right = t.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3($elm$core$Dict$foldr, func, acc, right)),
					$temp$t = left;
				func = $temp$func;
				acc = $temp$acc;
				t = $temp$t;
				continue foldr;
			}
		}
	});
var $elm$core$Dict$toList = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, list) {
				return A2(
					$elm$core$List$cons,
					_Utils_Tuple2(key, value),
					list);
			}),
		_List_Nil,
		dict);
};
var $elm$core$Dict$keys = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, keyList) {
				return A2($elm$core$List$cons, key, keyList);
			}),
		_List_Nil,
		dict);
};
var $elm$core$Set$toList = function (_v0) {
	var dict = _v0.a;
	return $elm$core$Dict$keys(dict);
};
var $elm$core$Elm$JsArray$foldr = _JsArray_foldr;
var $elm$core$Array$foldr = F3(
	function (func, baseCase, _v0) {
		var tree = _v0.c;
		var tail = _v0.d;
		var helper = F2(
			function (node, acc) {
				if (node.$ === 'SubTree') {
					var subTree = node.a;
					return A3($elm$core$Elm$JsArray$foldr, helper, acc, subTree);
				} else {
					var values = node.a;
					return A3($elm$core$Elm$JsArray$foldr, func, acc, values);
				}
			});
		return A3(
			$elm$core$Elm$JsArray$foldr,
			helper,
			A3($elm$core$Elm$JsArray$foldr, func, baseCase, tail),
			tree);
	});
var $elm$core$Array$toList = function (array) {
	return A3($elm$core$Array$foldr, $elm$core$List$cons, _List_Nil, array);
};
var $elm$core$Result$Err = function (a) {
	return {$: 'Err', a: a};
};
var $elm$json$Json$Decode$Failure = F2(
	function (a, b) {
		return {$: 'Failure', a: a, b: b};
	});
var $elm$json$Json$Decode$Field = F2(
	function (a, b) {
		return {$: 'Field', a: a, b: b};
	});
var $elm$json$Json$Decode$Index = F2(
	function (a, b) {
		return {$: 'Index', a: a, b: b};
	});
var $elm$core$Result$Ok = function (a) {
	return {$: 'Ok', a: a};
};
var $elm$json$Json$Decode$OneOf = function (a) {
	return {$: 'OneOf', a: a};
};
var $elm$core$Basics$False = {$: 'False'};
var $elm$core$Basics$add = _Basics_add;
var $elm$core$Maybe$Just = function (a) {
	return {$: 'Just', a: a};
};
var $elm$core$Maybe$Nothing = {$: 'Nothing'};
var $elm$core$String$all = _String_all;
var $elm$core$Basics$and = _Basics_and;
var $elm$core$Basics$append = _Utils_append;
var $elm$json$Json$Encode$encode = _Json_encode;
var $elm$core$String$fromInt = _String_fromNumber;
var $elm$core$String$join = F2(
	function (sep, chunks) {
		return A2(
			_String_join,
			sep,
			_List_toArray(chunks));
	});
var $elm$core$String$split = F2(
	function (sep, string) {
		return _List_fromArray(
			A2(_String_split, sep, string));
	});
var $elm$json$Json$Decode$indent = function (str) {
	return A2(
		$elm$core$String$join,
		'\n    ',
		A2($elm$core$String$split, '\n', str));
};
var $elm$core$List$foldl = F3(
	function (func, acc, list) {
		foldl:
		while (true) {
			if (!list.b) {
				return acc;
			} else {
				var x = list.a;
				var xs = list.b;
				var $temp$func = func,
					$temp$acc = A2(func, x, acc),
					$temp$list = xs;
				func = $temp$func;
				acc = $temp$acc;
				list = $temp$list;
				continue foldl;
			}
		}
	});
var $elm$core$List$length = function (xs) {
	return A3(
		$elm$core$List$foldl,
		F2(
			function (_v0, i) {
				return i + 1;
			}),
		0,
		xs);
};
var $elm$core$List$map2 = _List_map2;
var $elm$core$Basics$le = _Utils_le;
var $elm$core$Basics$sub = _Basics_sub;
var $elm$core$List$rangeHelp = F3(
	function (lo, hi, list) {
		rangeHelp:
		while (true) {
			if (_Utils_cmp(lo, hi) < 1) {
				var $temp$lo = lo,
					$temp$hi = hi - 1,
					$temp$list = A2($elm$core$List$cons, hi, list);
				lo = $temp$lo;
				hi = $temp$hi;
				list = $temp$list;
				continue rangeHelp;
			} else {
				return list;
			}
		}
	});
var $elm$core$List$range = F2(
	function (lo, hi) {
		return A3($elm$core$List$rangeHelp, lo, hi, _List_Nil);
	});
var $elm$core$List$indexedMap = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$map2,
			f,
			A2(
				$elm$core$List$range,
				0,
				$elm$core$List$length(xs) - 1),
			xs);
	});
var $elm$core$Char$toCode = _Char_toCode;
var $elm$core$Char$isLower = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (97 <= code) && (code <= 122);
};
var $elm$core$Char$isUpper = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (code <= 90) && (65 <= code);
};
var $elm$core$Basics$or = _Basics_or;
var $elm$core$Char$isAlpha = function (_char) {
	return $elm$core$Char$isLower(_char) || $elm$core$Char$isUpper(_char);
};
var $elm$core$Char$isDigit = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (code <= 57) && (48 <= code);
};
var $elm$core$Char$isAlphaNum = function (_char) {
	return $elm$core$Char$isLower(_char) || ($elm$core$Char$isUpper(_char) || $elm$core$Char$isDigit(_char));
};
var $elm$core$List$reverse = function (list) {
	return A3($elm$core$List$foldl, $elm$core$List$cons, _List_Nil, list);
};
var $elm$core$String$uncons = _String_uncons;
var $elm$json$Json$Decode$errorOneOf = F2(
	function (i, error) {
		return '\n\n(' + ($elm$core$String$fromInt(i + 1) + (') ' + $elm$json$Json$Decode$indent(
			$elm$json$Json$Decode$errorToString(error))));
	});
var $elm$json$Json$Decode$errorToString = function (error) {
	return A2($elm$json$Json$Decode$errorToStringHelp, error, _List_Nil);
};
var $elm$json$Json$Decode$errorToStringHelp = F2(
	function (error, context) {
		errorToStringHelp:
		while (true) {
			switch (error.$) {
				case 'Field':
					var f = error.a;
					var err = error.b;
					var isSimple = function () {
						var _v1 = $elm$core$String$uncons(f);
						if (_v1.$ === 'Nothing') {
							return false;
						} else {
							var _v2 = _v1.a;
							var _char = _v2.a;
							var rest = _v2.b;
							return $elm$core$Char$isAlpha(_char) && A2($elm$core$String$all, $elm$core$Char$isAlphaNum, rest);
						}
					}();
					var fieldName = isSimple ? ('.' + f) : ('[\'' + (f + '\']'));
					var $temp$error = err,
						$temp$context = A2($elm$core$List$cons, fieldName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 'Index':
					var i = error.a;
					var err = error.b;
					var indexName = '[' + ($elm$core$String$fromInt(i) + ']');
					var $temp$error = err,
						$temp$context = A2($elm$core$List$cons, indexName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 'OneOf':
					var errors = error.a;
					if (!errors.b) {
						return 'Ran into a Json.Decode.oneOf with no possibilities' + function () {
							if (!context.b) {
								return '!';
							} else {
								return ' at json' + A2(
									$elm$core$String$join,
									'',
									$elm$core$List$reverse(context));
							}
						}();
					} else {
						if (!errors.b.b) {
							var err = errors.a;
							var $temp$error = err,
								$temp$context = context;
							error = $temp$error;
							context = $temp$context;
							continue errorToStringHelp;
						} else {
							var starter = function () {
								if (!context.b) {
									return 'Json.Decode.oneOf';
								} else {
									return 'The Json.Decode.oneOf at json' + A2(
										$elm$core$String$join,
										'',
										$elm$core$List$reverse(context));
								}
							}();
							var introduction = starter + (' failed in the following ' + ($elm$core$String$fromInt(
								$elm$core$List$length(errors)) + ' ways:'));
							return A2(
								$elm$core$String$join,
								'\n\n',
								A2(
									$elm$core$List$cons,
									introduction,
									A2($elm$core$List$indexedMap, $elm$json$Json$Decode$errorOneOf, errors)));
						}
					}
				default:
					var msg = error.a;
					var json = error.b;
					var introduction = function () {
						if (!context.b) {
							return 'Problem with the given value:\n\n';
						} else {
							return 'Problem with the value at json' + (A2(
								$elm$core$String$join,
								'',
								$elm$core$List$reverse(context)) + ':\n\n    ');
						}
					}();
					return introduction + ($elm$json$Json$Decode$indent(
						A2($elm$json$Json$Encode$encode, 4, json)) + ('\n\n' + msg));
			}
		}
	});
var $elm$core$Array$branchFactor = 32;
var $elm$core$Array$Array_elm_builtin = F4(
	function (a, b, c, d) {
		return {$: 'Array_elm_builtin', a: a, b: b, c: c, d: d};
	});
var $elm$core$Elm$JsArray$empty = _JsArray_empty;
var $elm$core$Basics$ceiling = _Basics_ceiling;
var $elm$core$Basics$fdiv = _Basics_fdiv;
var $elm$core$Basics$logBase = F2(
	function (base, number) {
		return _Basics_log(number) / _Basics_log(base);
	});
var $elm$core$Basics$toFloat = _Basics_toFloat;
var $elm$core$Array$shiftStep = $elm$core$Basics$ceiling(
	A2($elm$core$Basics$logBase, 2, $elm$core$Array$branchFactor));
var $elm$core$Array$empty = A4($elm$core$Array$Array_elm_builtin, 0, $elm$core$Array$shiftStep, $elm$core$Elm$JsArray$empty, $elm$core$Elm$JsArray$empty);
var $elm$core$Elm$JsArray$initialize = _JsArray_initialize;
var $elm$core$Array$Leaf = function (a) {
	return {$: 'Leaf', a: a};
};
var $elm$core$Basics$apL = F2(
	function (f, x) {
		return f(x);
	});
var $elm$core$Basics$apR = F2(
	function (x, f) {
		return f(x);
	});
var $elm$core$Basics$eq = _Utils_equal;
var $elm$core$Basics$floor = _Basics_floor;
var $elm$core$Elm$JsArray$length = _JsArray_length;
var $elm$core$Basics$gt = _Utils_gt;
var $elm$core$Basics$max = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) > 0) ? x : y;
	});
var $elm$core$Basics$mul = _Basics_mul;
var $elm$core$Array$SubTree = function (a) {
	return {$: 'SubTree', a: a};
};
var $elm$core$Elm$JsArray$initializeFromList = _JsArray_initializeFromList;
var $elm$core$Array$compressNodes = F2(
	function (nodes, acc) {
		compressNodes:
		while (true) {
			var _v0 = A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, nodes);
			var node = _v0.a;
			var remainingNodes = _v0.b;
			var newAcc = A2(
				$elm$core$List$cons,
				$elm$core$Array$SubTree(node),
				acc);
			if (!remainingNodes.b) {
				return $elm$core$List$reverse(newAcc);
			} else {
				var $temp$nodes = remainingNodes,
					$temp$acc = newAcc;
				nodes = $temp$nodes;
				acc = $temp$acc;
				continue compressNodes;
			}
		}
	});
var $elm$core$Tuple$first = function (_v0) {
	var x = _v0.a;
	return x;
};
var $elm$core$Array$treeFromBuilder = F2(
	function (nodeList, nodeListSize) {
		treeFromBuilder:
		while (true) {
			var newNodeSize = $elm$core$Basics$ceiling(nodeListSize / $elm$core$Array$branchFactor);
			if (newNodeSize === 1) {
				return A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, nodeList).a;
			} else {
				var $temp$nodeList = A2($elm$core$Array$compressNodes, nodeList, _List_Nil),
					$temp$nodeListSize = newNodeSize;
				nodeList = $temp$nodeList;
				nodeListSize = $temp$nodeListSize;
				continue treeFromBuilder;
			}
		}
	});
var $elm$core$Array$builderToArray = F2(
	function (reverseNodeList, builder) {
		if (!builder.nodeListSize) {
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder.tail),
				$elm$core$Array$shiftStep,
				$elm$core$Elm$JsArray$empty,
				builder.tail);
		} else {
			var treeLen = builder.nodeListSize * $elm$core$Array$branchFactor;
			var depth = $elm$core$Basics$floor(
				A2($elm$core$Basics$logBase, $elm$core$Array$branchFactor, treeLen - 1));
			var correctNodeList = reverseNodeList ? $elm$core$List$reverse(builder.nodeList) : builder.nodeList;
			var tree = A2($elm$core$Array$treeFromBuilder, correctNodeList, builder.nodeListSize);
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder.tail) + treeLen,
				A2($elm$core$Basics$max, 5, depth * $elm$core$Array$shiftStep),
				tree,
				builder.tail);
		}
	});
var $elm$core$Basics$idiv = _Basics_idiv;
var $elm$core$Basics$lt = _Utils_lt;
var $elm$core$Array$initializeHelp = F5(
	function (fn, fromIndex, len, nodeList, tail) {
		initializeHelp:
		while (true) {
			if (fromIndex < 0) {
				return A2(
					$elm$core$Array$builderToArray,
					false,
					{nodeList: nodeList, nodeListSize: (len / $elm$core$Array$branchFactor) | 0, tail: tail});
			} else {
				var leaf = $elm$core$Array$Leaf(
					A3($elm$core$Elm$JsArray$initialize, $elm$core$Array$branchFactor, fromIndex, fn));
				var $temp$fn = fn,
					$temp$fromIndex = fromIndex - $elm$core$Array$branchFactor,
					$temp$len = len,
					$temp$nodeList = A2($elm$core$List$cons, leaf, nodeList),
					$temp$tail = tail;
				fn = $temp$fn;
				fromIndex = $temp$fromIndex;
				len = $temp$len;
				nodeList = $temp$nodeList;
				tail = $temp$tail;
				continue initializeHelp;
			}
		}
	});
var $elm$core$Basics$remainderBy = _Basics_remainderBy;
var $elm$core$Array$initialize = F2(
	function (len, fn) {
		if (len <= 0) {
			return $elm$core$Array$empty;
		} else {
			var tailLen = len % $elm$core$Array$branchFactor;
			var tail = A3($elm$core$Elm$JsArray$initialize, tailLen, len - tailLen, fn);
			var initialFromIndex = (len - tailLen) - $elm$core$Array$branchFactor;
			return A5($elm$core$Array$initializeHelp, fn, initialFromIndex, len, _List_Nil, tail);
		}
	});
var $elm$core$Basics$True = {$: 'True'};
var $elm$core$Result$isOk = function (result) {
	if (result.$ === 'Ok') {
		return true;
	} else {
		return false;
	}
};
var $elm$json$Json$Decode$map = _Json_map1;
var $elm$json$Json$Decode$map2 = _Json_map2;
var $elm$json$Json$Decode$succeed = _Json_succeed;
var $elm$virtual_dom$VirtualDom$toHandlerInt = function (handler) {
	switch (handler.$) {
		case 'Normal':
			return 0;
		case 'MayStopPropagation':
			return 1;
		case 'MayPreventDefault':
			return 2;
		default:
			return 3;
	}
};
var $elm$browser$Browser$External = function (a) {
	return {$: 'External', a: a};
};
var $elm$browser$Browser$Internal = function (a) {
	return {$: 'Internal', a: a};
};
var $elm$core$Basics$identity = function (x) {
	return x;
};
var $elm$browser$Browser$Dom$NotFound = function (a) {
	return {$: 'NotFound', a: a};
};
var $elm$url$Url$Http = {$: 'Http'};
var $elm$url$Url$Https = {$: 'Https'};
var $elm$url$Url$Url = F6(
	function (protocol, host, port_, path, query, fragment) {
		return {fragment: fragment, host: host, path: path, port_: port_, protocol: protocol, query: query};
	});
var $elm$core$String$contains = _String_contains;
var $elm$core$String$length = _String_length;
var $elm$core$String$slice = _String_slice;
var $elm$core$String$dropLeft = F2(
	function (n, string) {
		return (n < 1) ? string : A3(
			$elm$core$String$slice,
			n,
			$elm$core$String$length(string),
			string);
	});
var $elm$core$String$indexes = _String_indexes;
var $elm$core$String$isEmpty = function (string) {
	return string === '';
};
var $elm$core$String$left = F2(
	function (n, string) {
		return (n < 1) ? '' : A3($elm$core$String$slice, 0, n, string);
	});
var $elm$core$String$toInt = _String_toInt;
var $elm$url$Url$chompBeforePath = F5(
	function (protocol, path, params, frag, str) {
		if ($elm$core$String$isEmpty(str) || A2($elm$core$String$contains, '@', str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, ':', str);
			if (!_v0.b) {
				return $elm$core$Maybe$Just(
					A6($elm$url$Url$Url, protocol, str, $elm$core$Maybe$Nothing, path, params, frag));
			} else {
				if (!_v0.b.b) {
					var i = _v0.a;
					var _v1 = $elm$core$String$toInt(
						A2($elm$core$String$dropLeft, i + 1, str));
					if (_v1.$ === 'Nothing') {
						return $elm$core$Maybe$Nothing;
					} else {
						var port_ = _v1;
						return $elm$core$Maybe$Just(
							A6(
								$elm$url$Url$Url,
								protocol,
								A2($elm$core$String$left, i, str),
								port_,
								path,
								params,
								frag));
					}
				} else {
					return $elm$core$Maybe$Nothing;
				}
			}
		}
	});
var $elm$url$Url$chompBeforeQuery = F4(
	function (protocol, params, frag, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '/', str);
			if (!_v0.b) {
				return A5($elm$url$Url$chompBeforePath, protocol, '/', params, frag, str);
			} else {
				var i = _v0.a;
				return A5(
					$elm$url$Url$chompBeforePath,
					protocol,
					A2($elm$core$String$dropLeft, i, str),
					params,
					frag,
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$url$Url$chompBeforeFragment = F3(
	function (protocol, frag, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '?', str);
			if (!_v0.b) {
				return A4($elm$url$Url$chompBeforeQuery, protocol, $elm$core$Maybe$Nothing, frag, str);
			} else {
				var i = _v0.a;
				return A4(
					$elm$url$Url$chompBeforeQuery,
					protocol,
					$elm$core$Maybe$Just(
						A2($elm$core$String$dropLeft, i + 1, str)),
					frag,
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$url$Url$chompAfterProtocol = F2(
	function (protocol, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '#', str);
			if (!_v0.b) {
				return A3($elm$url$Url$chompBeforeFragment, protocol, $elm$core$Maybe$Nothing, str);
			} else {
				var i = _v0.a;
				return A3(
					$elm$url$Url$chompBeforeFragment,
					protocol,
					$elm$core$Maybe$Just(
						A2($elm$core$String$dropLeft, i + 1, str)),
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$core$String$startsWith = _String_startsWith;
var $elm$url$Url$fromString = function (str) {
	return A2($elm$core$String$startsWith, 'http://', str) ? A2(
		$elm$url$Url$chompAfterProtocol,
		$elm$url$Url$Http,
		A2($elm$core$String$dropLeft, 7, str)) : (A2($elm$core$String$startsWith, 'https://', str) ? A2(
		$elm$url$Url$chompAfterProtocol,
		$elm$url$Url$Https,
		A2($elm$core$String$dropLeft, 8, str)) : $elm$core$Maybe$Nothing);
};
var $elm$core$Basics$never = function (_v0) {
	never:
	while (true) {
		var nvr = _v0.a;
		var $temp$_v0 = nvr;
		_v0 = $temp$_v0;
		continue never;
	}
};
var $elm$core$Task$Perform = function (a) {
	return {$: 'Perform', a: a};
};
var $elm$core$Task$succeed = _Scheduler_succeed;
var $elm$core$Task$init = $elm$core$Task$succeed(_Utils_Tuple0);
var $elm$core$List$foldrHelper = F4(
	function (fn, acc, ctr, ls) {
		if (!ls.b) {
			return acc;
		} else {
			var a = ls.a;
			var r1 = ls.b;
			if (!r1.b) {
				return A2(fn, a, acc);
			} else {
				var b = r1.a;
				var r2 = r1.b;
				if (!r2.b) {
					return A2(
						fn,
						a,
						A2(fn, b, acc));
				} else {
					var c = r2.a;
					var r3 = r2.b;
					if (!r3.b) {
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(fn, c, acc)));
					} else {
						var d = r3.a;
						var r4 = r3.b;
						var res = (ctr > 500) ? A3(
							$elm$core$List$foldl,
							fn,
							acc,
							$elm$core$List$reverse(r4)) : A4($elm$core$List$foldrHelper, fn, acc, ctr + 1, r4);
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(
									fn,
									c,
									A2(fn, d, res))));
					}
				}
			}
		}
	});
var $elm$core$List$foldr = F3(
	function (fn, acc, ls) {
		return A4($elm$core$List$foldrHelper, fn, acc, 0, ls);
	});
var $elm$core$List$map = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$foldr,
			F2(
				function (x, acc) {
					return A2(
						$elm$core$List$cons,
						f(x),
						acc);
				}),
			_List_Nil,
			xs);
	});
var $elm$core$Task$andThen = _Scheduler_andThen;
var $elm$core$Task$map = F2(
	function (func, taskA) {
		return A2(
			$elm$core$Task$andThen,
			function (a) {
				return $elm$core$Task$succeed(
					func(a));
			},
			taskA);
	});
var $elm$core$Task$map2 = F3(
	function (func, taskA, taskB) {
		return A2(
			$elm$core$Task$andThen,
			function (a) {
				return A2(
					$elm$core$Task$andThen,
					function (b) {
						return $elm$core$Task$succeed(
							A2(func, a, b));
					},
					taskB);
			},
			taskA);
	});
var $elm$core$Task$sequence = function (tasks) {
	return A3(
		$elm$core$List$foldr,
		$elm$core$Task$map2($elm$core$List$cons),
		$elm$core$Task$succeed(_List_Nil),
		tasks);
};
var $elm$core$Platform$sendToApp = _Platform_sendToApp;
var $elm$core$Task$spawnCmd = F2(
	function (router, _v0) {
		var task = _v0.a;
		return _Scheduler_spawn(
			A2(
				$elm$core$Task$andThen,
				$elm$core$Platform$sendToApp(router),
				task));
	});
var $elm$core$Task$onEffects = F3(
	function (router, commands, state) {
		return A2(
			$elm$core$Task$map,
			function (_v0) {
				return _Utils_Tuple0;
			},
			$elm$core$Task$sequence(
				A2(
					$elm$core$List$map,
					$elm$core$Task$spawnCmd(router),
					commands)));
	});
var $elm$core$Task$onSelfMsg = F3(
	function (_v0, _v1, _v2) {
		return $elm$core$Task$succeed(_Utils_Tuple0);
	});
var $elm$core$Task$cmdMap = F2(
	function (tagger, _v0) {
		var task = _v0.a;
		return $elm$core$Task$Perform(
			A2($elm$core$Task$map, tagger, task));
	});
_Platform_effectManagers['Task'] = _Platform_createManager($elm$core$Task$init, $elm$core$Task$onEffects, $elm$core$Task$onSelfMsg, $elm$core$Task$cmdMap);
var $elm$core$Task$command = _Platform_leaf('Task');
var $elm$core$Task$perform = F2(
	function (toMessage, task) {
		return $elm$core$Task$command(
			$elm$core$Task$Perform(
				A2($elm$core$Task$map, toMessage, task)));
	});
var $elm$browser$Browser$application = _Browser_application;
var $author$project$Main$AdjustTimeZone = function (a) {
	return {$: 'AdjustTimeZone', a: a};
};
var $author$project$Main$NavbarMsg = function (a) {
	return {$: 'NavbarMsg', a: a};
};
var $elm$core$Platform$Cmd$batch = _Platform_batch;
var $elm$time$Time$Name = function (a) {
	return {$: 'Name', a: a};
};
var $elm$time$Time$Offset = function (a) {
	return {$: 'Offset', a: a};
};
var $elm$time$Time$Zone = F2(
	function (a, b) {
		return {$: 'Zone', a: a, b: b};
	});
var $elm$time$Time$customZone = $elm$time$Time$Zone;
var $elm$time$Time$here = _Time_here(_Utils_Tuple0);
var $author$project$Main$LoginOff = {$: 'LoginOff'};
var $author$project$Main$Model = function (key) {
	return function (url) {
		return function (inputCred) {
			return function (tokenUserId) {
				return function (loginStatus) {
					return function (statusReason) {
						return function (userRegister) {
							return function (userInfo) {
								return function (myPageOpen) {
									return function (myPageState) {
										return function (gameState) {
											return function (gameId) {
												return function (inputEvent) {
													return function (eventId) {
														return function (navbarState) {
															return function (inputGameSettings) {
																return function (players) {
																	return function (active_players) {
																		return function (teams) {
																			return function (score_list) {
																				return function (scoreRecord) {
																					return function (joinedIds) {
																						return function (eventRecord) {
																							return function (inputRecordParam) {
																								return function (timeZone) {
																									return {active_players: active_players, eventId: eventId, eventRecord: eventRecord, gameId: gameId, gameState: gameState, inputCred: inputCred, inputEvent: inputEvent, inputGameSettings: inputGameSettings, inputRecordParam: inputRecordParam, joinedIds: joinedIds, key: key, loginStatus: loginStatus, myPageOpen: myPageOpen, myPageState: myPageState, navbarState: navbarState, players: players, scoreRecord: scoreRecord, score_list: score_list, statusReason: statusReason, teams: teams, timeZone: timeZone, tokenUserId: tokenUserId, url: url, userInfo: userInfo, userRegister: userRegister};
																								};
																							};
																						};
																					};
																				};
																			};
																		};
																	};
																};
															};
														};
													};
												};
											};
										};
									};
								};
							};
						};
					};
				};
			};
		};
	};
};
var $author$project$Main$Nonparticipation = {$: 'Nonparticipation'};
var $author$project$Main$Setting = {$: 'Setting'};
var $elm$core$Dict$RBEmpty_elm_builtin = {$: 'RBEmpty_elm_builtin'};
var $elm$core$Dict$empty = $elm$core$Dict$RBEmpty_elm_builtin;
var $TSFoster$elm_uuid$UUID$WrongFormat = {$: 'WrongFormat'};
var $TSFoster$elm_uuid$UUID$WrongLength = {$: 'WrongLength'};
var $elm$core$String$endsWith = _String_endsWith;
var $elm$core$List$maybeCons = F3(
	function (f, mx, xs) {
		var _v0 = f(mx);
		if (_v0.$ === 'Just') {
			var x = _v0.a;
			return A2($elm$core$List$cons, x, xs);
		} else {
			return xs;
		}
	});
var $elm$core$List$filterMap = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$foldr,
			$elm$core$List$maybeCons(f),
			_List_Nil,
			xs);
	});
var $TSFoster$elm_uuid$UUID$IsNil = {$: 'IsNil'};
var $TSFoster$elm_uuid$UUID$NoVersion = {$: 'NoVersion'};
var $TSFoster$elm_uuid$UUID$UUID = F4(
	function (a, b, c, d) {
		return {$: 'UUID', a: a, b: b, c: c, d: d};
	});
var $TSFoster$elm_uuid$UUID$UnsupportedVariant = {$: 'UnsupportedVariant'};
var $elm$core$Bitwise$shiftRightZfBy = _Bitwise_shiftRightZfBy;
var $TSFoster$elm_uuid$UUID$isVariant1 = function (_v0) {
	var c = _v0.c;
	return (c >>> 30) === 2;
};
var $elm$core$Basics$not = _Basics_not;
var $elm$core$Bitwise$and = _Bitwise_and;
var $TSFoster$elm_uuid$UUID$version = function (_v0) {
	var b = _v0.b;
	return 15 & (b >>> 12);
};
var $TSFoster$elm_uuid$UUID$fromInt32s = F4(
	function (a, b, c, d) {
		var wouldBeUUID = A4($TSFoster$elm_uuid$UUID$UUID, a, b, c, d);
		return ((!a) && ((!b) && ((!c) && (!d)))) ? $elm$core$Result$Err($TSFoster$elm_uuid$UUID$IsNil) : (($TSFoster$elm_uuid$UUID$version(wouldBeUUID) > 5) ? $elm$core$Result$Err($TSFoster$elm_uuid$UUID$NoVersion) : ((!$TSFoster$elm_uuid$UUID$isVariant1(wouldBeUUID)) ? $elm$core$Result$Err($TSFoster$elm_uuid$UUID$UnsupportedVariant) : $elm$core$Result$Ok(wouldBeUUID)));
	});
var $elm$core$Basics$negate = function (n) {
	return -n;
};
var $elm$core$Basics$neq = _Utils_notEqual;
var $TSFoster$elm_uuid$UUID$forceUnsigned = $elm$core$Bitwise$shiftRightZfBy(0);
var $elm$core$Bitwise$or = _Bitwise_or;
var $elm$core$Bitwise$shiftLeftBy = _Bitwise_shiftLeftBy;
var $TSFoster$elm_uuid$UUID$nibbleValuesToU32 = F8(
	function (a, b, c, d, e, f, g, h) {
		return $TSFoster$elm_uuid$UUID$forceUnsigned((a << 28) | ((b << 24) | ((c << 20) | ((d << 16) | ((e << 12) | ((f << 8) | ((g << 4) | h)))))));
	});
var $elm$core$String$replace = F3(
	function (before, after, string) {
		return A2(
			$elm$core$String$join,
			after,
			A2($elm$core$String$split, before, string));
	});
var $elm$core$String$foldr = _String_foldr;
var $elm$core$String$toList = function (string) {
	return A3($elm$core$String$foldr, $elm$core$List$cons, _List_Nil, string);
};
var $elm$core$String$toLower = _String_toLower;
var $TSFoster$elm_uuid$UUID$toNibbleValue = function (_char) {
	switch (_char.valueOf()) {
		case '0':
			return $elm$core$Maybe$Just(0);
		case '1':
			return $elm$core$Maybe$Just(1);
		case '2':
			return $elm$core$Maybe$Just(2);
		case '3':
			return $elm$core$Maybe$Just(3);
		case '4':
			return $elm$core$Maybe$Just(4);
		case '5':
			return $elm$core$Maybe$Just(5);
		case '6':
			return $elm$core$Maybe$Just(6);
		case '7':
			return $elm$core$Maybe$Just(7);
		case '8':
			return $elm$core$Maybe$Just(8);
		case '9':
			return $elm$core$Maybe$Just(9);
		case 'a':
			return $elm$core$Maybe$Just(10);
		case 'b':
			return $elm$core$Maybe$Just(11);
		case 'c':
			return $elm$core$Maybe$Just(12);
		case 'd':
			return $elm$core$Maybe$Just(13);
		case 'e':
			return $elm$core$Maybe$Just(14);
		case 'f':
			return $elm$core$Maybe$Just(15);
		default:
			return $elm$core$Maybe$Nothing;
	}
};
var $TSFoster$elm_uuid$UUID$fromString = function (string) {
	var normalized = function (str) {
		return A2($elm$core$String$startsWith, 'urn:uuid:', str) ? A2($elm$core$String$dropLeft, 9, str) : ((A2($elm$core$String$startsWith, '{', str) && A2($elm$core$String$endsWith, '}', str)) ? A3($elm$core$String$slice, 1, -1, str) : str);
	}(
		$elm$core$String$toLower(
			A3(
				$elm$core$String$replace,
				'-',
				'',
				A3(
					$elm$core$String$replace,
					' ',
					'',
					A3(
						$elm$core$String$replace,
						'\t',
						'',
						A3($elm$core$String$replace, '\n', '', string))))));
	if ($elm$core$String$length(normalized) !== 32) {
		return $elm$core$Result$Err($TSFoster$elm_uuid$UUID$WrongLength);
	} else {
		var _v0 = A2(
			$elm$core$List$filterMap,
			$TSFoster$elm_uuid$UUID$toNibbleValue,
			$elm$core$String$toList(normalized));
		if ((((((((((((((((((((((((((((((((_v0.b && _v0.b.b) && _v0.b.b.b) && _v0.b.b.b.b) && _v0.b.b.b.b.b) && _v0.b.b.b.b.b.b) && _v0.b.b.b.b.b.b.b) && _v0.b.b.b.b.b.b.b.b) && _v0.b.b.b.b.b.b.b.b.b) && _v0.b.b.b.b.b.b.b.b.b.b) && _v0.b.b.b.b.b.b.b.b.b.b.b) && _v0.b.b.b.b.b.b.b.b.b.b.b.b) && _v0.b.b.b.b.b.b.b.b.b.b.b.b.b) && _v0.b.b.b.b.b.b.b.b.b.b.b.b.b.b) && _v0.b.b.b.b.b.b.b.b.b.b.b.b.b.b.b) && _v0.b.b.b.b.b.b.b.b.b.b.b.b.b.b.b.b) && _v0.b.b.b.b.b.b.b.b.b.b.b.b.b.b.b.b.b) && _v0.b.b.b.b.b.b.b.b.b.b.b.b.b.b.b.b.b.b) && _v0.b.b.b.b.b.b.b.b.b.b.b.b.b.b.b.b.b.b.b) && _v0.b.b.b.b.b.b.b.b.b.b.b.b.b.b.b.b.b.b.b.b) && _v0.b.b.b.b.b.b.b.b.b.b.b.b.b.b.b.b.b.b.b.b.b) && _v0.b.b.b.b.b.b.b.b.b.b.b.b.b.b.b.b.b.b.b.b.b.b) && _v0.b.b.b.b.b.b.b.b.b.b.b.b.b.b.b.b.b.b.b.b.b.b.b) && _v0.b.b.b.b.b.b.b.b.b.b.b.b.b.b.b.b.b.b.b.b.b.b.b.b) && _v0.b.b.b.b.b.b.b.b.b.b.b.b.b.b.b.b.b.b.b.b.b.b.b.b.b) && _v0.b.b.b.b.b.b.b.b.b.b.b.b.b.b.b.b.b.b.b.b.b.b.b.b.b.b) && _v0.b.b.b.b.b.b.b.b.b.b.b.b.b.b.b.b.b.b.b.b.b.b.b.b.b.b.b) && _v0.b.b.b.b.b.b.b.b.b.b.b.b.b.b.b.b.b.b.b.b.b.b.b.b.b.b.b.b) && _v0.b.b.b.b.b.b.b.b.b.b.b.b.b.b.b.b.b.b.b.b.b.b.b.b.b.b.b.b.b) && _v0.b.b.b.b.b.b.b.b.b.b.b.b.b.b.b.b.b.b.b.b.b.b.b.b.b.b.b.b.b.b) && _v0.b.b.b.b.b.b.b.b.b.b.b.b.b.b.b.b.b.b.b.b.b.b.b.b.b.b.b.b.b.b.b) && _v0.b.b.b.b.b.b.b.b.b.b.b.b.b.b.b.b.b.b.b.b.b.b.b.b.b.b.b.b.b.b.b.b) && (!_v0.b.b.b.b.b.b.b.b.b.b.b.b.b.b.b.b.b.b.b.b.b.b.b.b.b.b.b.b.b.b.b.b.b)) {
			var a1 = _v0.a;
			var _v1 = _v0.b;
			var a2 = _v1.a;
			var _v2 = _v1.b;
			var a3 = _v2.a;
			var _v3 = _v2.b;
			var a4 = _v3.a;
			var _v4 = _v3.b;
			var a5 = _v4.a;
			var _v5 = _v4.b;
			var a6 = _v5.a;
			var _v6 = _v5.b;
			var a7 = _v6.a;
			var _v7 = _v6.b;
			var a8 = _v7.a;
			var _v8 = _v7.b;
			var b1 = _v8.a;
			var _v9 = _v8.b;
			var b2 = _v9.a;
			var _v10 = _v9.b;
			var b3 = _v10.a;
			var _v11 = _v10.b;
			var b4 = _v11.a;
			var _v12 = _v11.b;
			var b5 = _v12.a;
			var _v13 = _v12.b;
			var b6 = _v13.a;
			var _v14 = _v13.b;
			var b7 = _v14.a;
			var _v15 = _v14.b;
			var b8 = _v15.a;
			var _v16 = _v15.b;
			var c1 = _v16.a;
			var _v17 = _v16.b;
			var c2 = _v17.a;
			var _v18 = _v17.b;
			var c3 = _v18.a;
			var _v19 = _v18.b;
			var c4 = _v19.a;
			var _v20 = _v19.b;
			var c5 = _v20.a;
			var _v21 = _v20.b;
			var c6 = _v21.a;
			var _v22 = _v21.b;
			var c7 = _v22.a;
			var _v23 = _v22.b;
			var c8 = _v23.a;
			var _v24 = _v23.b;
			var d1 = _v24.a;
			var _v25 = _v24.b;
			var d2 = _v25.a;
			var _v26 = _v25.b;
			var d3 = _v26.a;
			var _v27 = _v26.b;
			var d4 = _v27.a;
			var _v28 = _v27.b;
			var d5 = _v28.a;
			var _v29 = _v28.b;
			var d6 = _v29.a;
			var _v30 = _v29.b;
			var d7 = _v30.a;
			var _v31 = _v30.b;
			var d8 = _v31.a;
			return A4(
				$TSFoster$elm_uuid$UUID$fromInt32s,
				A8($TSFoster$elm_uuid$UUID$nibbleValuesToU32, a1, a2, a3, a4, a5, a6, a7, a8),
				A8($TSFoster$elm_uuid$UUID$nibbleValuesToU32, b1, b2, b3, b4, b5, b6, b7, b8),
				A8($TSFoster$elm_uuid$UUID$nibbleValuesToU32, c1, c2, c3, c4, c5, c6, c7, c8),
				A8($TSFoster$elm_uuid$UUID$nibbleValuesToU32, d1, d2, d3, d4, d5, d6, d7, d8));
		} else {
			return $elm$core$Result$Err($TSFoster$elm_uuid$UUID$WrongFormat);
		}
	}
};
var $author$project$Main$Cred = F4(
	function (user_id, nickname, password, password2) {
		return {nickname: nickname, password: password, password2: password2, user_id: user_id};
	});
var $author$project$Main$initCred = A4($author$project$Main$Cred, '', '', '', '');
var $author$project$Main$EventRecord = F2(
	function (gamesRecord, playersRecord) {
		return {gamesRecord: gamesRecord, playersRecord: playersRecord};
	});
var $author$project$Main$initEventRecord = A2($author$project$Main$EventRecord, $elm$core$Dict$empty, $elm$core$Dict$empty);
var $author$project$Main$GameSettings = F3(
	function (numTeams, minUnit, rate) {
		return {minUnit: minUnit, numTeams: numTeams, rate: rate};
	});
var $author$project$Main$initGameSettings = A3($author$project$Main$GameSettings, '', '10', '10');
var $author$project$Main$RecordParam = F3(
	function (scoreSize, eventId, gameId) {
		return {eventId: eventId, gameId: gameId, scoreSize: scoreSize};
	});
var $author$project$Main$initRecordParam = A3($author$project$Main$RecordParam, '50', 'latest', 'Total');
var $author$project$Main$UserInfo = F3(
	function (user_id, password, nickname) {
		return {nickname: nickname, password: password, user_id: user_id};
	});
var $author$project$Main$initUserInfo = A3($author$project$Main$UserInfo, '', '', '');
var $rundis$elm_bootstrap$Bootstrap$Navbar$Hidden = {$: 'Hidden'};
var $rundis$elm_bootstrap$Bootstrap$Navbar$State = function (a) {
	return {$: 'State', a: a};
};
var $elm$browser$Browser$Dom$getViewport = _Browser_withWindow(_Browser_getViewport);
var $rundis$elm_bootstrap$Bootstrap$Navbar$mapState = F2(
	function (mapper, _v0) {
		var state = _v0.a;
		return $rundis$elm_bootstrap$Bootstrap$Navbar$State(
			mapper(state));
	});
var $rundis$elm_bootstrap$Bootstrap$Navbar$initWindowSize = F2(
	function (toMsg, state) {
		return A2(
			$elm$core$Task$perform,
			function (vp) {
				return toMsg(
					A2(
						$rundis$elm_bootstrap$Bootstrap$Navbar$mapState,
						function (s) {
							return _Utils_update(
								s,
								{
									windowWidth: $elm$core$Maybe$Just(vp.viewport.width)
								});
						},
						state));
			},
			$elm$browser$Browser$Dom$getViewport);
	});
var $rundis$elm_bootstrap$Bootstrap$Navbar$initialState = function (toMsg) {
	var state = $rundis$elm_bootstrap$Bootstrap$Navbar$State(
		{dropdowns: $elm$core$Dict$empty, height: $elm$core$Maybe$Nothing, visibility: $rundis$elm_bootstrap$Bootstrap$Navbar$Hidden, windowWidth: $elm$core$Maybe$Nothing});
	return _Utils_Tuple2(
		state,
		A2($rundis$elm_bootstrap$Bootstrap$Navbar$initWindowSize, toMsg, state));
};
var $elm$core$Array$fromListHelp = F3(
	function (list, nodeList, nodeListSize) {
		fromListHelp:
		while (true) {
			var _v0 = A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, list);
			var jsArray = _v0.a;
			var remainingItems = _v0.b;
			if (_Utils_cmp(
				$elm$core$Elm$JsArray$length(jsArray),
				$elm$core$Array$branchFactor) < 0) {
				return A2(
					$elm$core$Array$builderToArray,
					true,
					{nodeList: nodeList, nodeListSize: nodeListSize, tail: jsArray});
			} else {
				var $temp$list = remainingItems,
					$temp$nodeList = A2(
					$elm$core$List$cons,
					$elm$core$Array$Leaf(jsArray),
					nodeList),
					$temp$nodeListSize = nodeListSize + 1;
				list = $temp$list;
				nodeList = $temp$nodeList;
				nodeListSize = $temp$nodeListSize;
				continue fromListHelp;
			}
		}
	});
var $elm$core$Array$fromList = function (list) {
	if (!list.b) {
		return $elm$core$Array$empty;
	} else {
		return A3($elm$core$Array$fromListHelp, list, _List_Nil, 0);
	}
};
var $elm$core$Array$bitMask = 4294967295 >>> (32 - $elm$core$Array$shiftStep);
var $elm$core$Basics$ge = _Utils_ge;
var $elm$core$Elm$JsArray$unsafeGet = _JsArray_unsafeGet;
var $elm$core$Array$getHelp = F3(
	function (shift, index, tree) {
		getHelp:
		while (true) {
			var pos = $elm$core$Array$bitMask & (index >>> shift);
			var _v0 = A2($elm$core$Elm$JsArray$unsafeGet, pos, tree);
			if (_v0.$ === 'SubTree') {
				var subTree = _v0.a;
				var $temp$shift = shift - $elm$core$Array$shiftStep,
					$temp$index = index,
					$temp$tree = subTree;
				shift = $temp$shift;
				index = $temp$index;
				tree = $temp$tree;
				continue getHelp;
			} else {
				var values = _v0.a;
				return A2($elm$core$Elm$JsArray$unsafeGet, $elm$core$Array$bitMask & index, values);
			}
		}
	});
var $elm$core$Array$tailIndex = function (len) {
	return (len >>> 5) << 5;
};
var $elm$core$Array$get = F2(
	function (index, _v0) {
		var len = _v0.a;
		var startShift = _v0.b;
		var tree = _v0.c;
		var tail = _v0.d;
		return ((index < 0) || (_Utils_cmp(index, len) > -1)) ? $elm$core$Maybe$Nothing : ((_Utils_cmp(
			index,
			$elm$core$Array$tailIndex(len)) > -1) ? $elm$core$Maybe$Just(
			A2($elm$core$Elm$JsArray$unsafeGet, $elm$core$Array$bitMask & index, tail)) : $elm$core$Maybe$Just(
			A3($elm$core$Array$getHelp, startShift, index, tree)));
	});
var $author$project$Main$parseEventId = function (url) {
	var a = $elm$core$Array$fromList(
		A2($elm$core$String$split, 'event_id=', url));
	var _v0 = A2($elm$core$Array$get, 1, a);
	if (_v0.$ === 'Nothing') {
		return A2($elm$core$String$left, 36, url);
	} else {
		var s = _v0.a;
		return A2($elm$core$String$left, 36, s);
	}
};
var $elm$url$Url$addPort = F2(
	function (maybePort, starter) {
		if (maybePort.$ === 'Nothing') {
			return starter;
		} else {
			var port_ = maybePort.a;
			return starter + (':' + $elm$core$String$fromInt(port_));
		}
	});
var $elm$url$Url$addPrefixed = F3(
	function (prefix, maybeSegment, starter) {
		if (maybeSegment.$ === 'Nothing') {
			return starter;
		} else {
			var segment = maybeSegment.a;
			return _Utils_ap(
				starter,
				_Utils_ap(prefix, segment));
		}
	});
var $elm$url$Url$toString = function (url) {
	var http = function () {
		var _v0 = url.protocol;
		if (_v0.$ === 'Http') {
			return 'http://';
		} else {
			return 'https://';
		}
	}();
	return A3(
		$elm$url$Url$addPrefixed,
		'#',
		url.fragment,
		A3(
			$elm$url$Url$addPrefixed,
			'?',
			url.query,
			_Utils_ap(
				A2(
					$elm$url$Url$addPort,
					url.port_,
					_Utils_ap(http, url.host)),
				url.path)));
};
var $elm$time$Time$utc = A2($elm$time$Time$Zone, 0, _List_Nil);
var $author$project$Main$initModel = F2(
	function (url, key) {
		var inputEvent = $author$project$Main$parseEventId(
			$elm$url$Url$toString(url));
		var eventId = function () {
			var _v1 = $TSFoster$elm_uuid$UUID$fromString(inputEvent);
			if (_v1.$ === 'Err') {
				return '';
			} else {
				var uuid = _v1.a;
				return inputEvent;
			}
		}();
		var _v0 = $rundis$elm_bootstrap$Bootstrap$Navbar$initialState($author$project$Main$NavbarMsg);
		var navbarState = _v0.a;
		var navbarCmd = _v0.b;
		return $author$project$Main$Model(key)(url)($author$project$Main$initCred)($elm$core$Maybe$Nothing)($author$project$Main$LoginOff)('')(false)($author$project$Main$initUserInfo)(false)($author$project$Main$Setting)($author$project$Main$Nonparticipation)('')(inputEvent)(eventId)(navbarState)($author$project$Main$initGameSettings)($elm$core$Dict$empty)(_List_Nil)(_List_Nil)(_List_Nil)(_List_Nil)($elm$core$Dict$empty)($author$project$Main$initEventRecord)($author$project$Main$initRecordParam)($elm$time$Time$utc);
	});
var $elm$json$Json$Encode$string = _Json_wrap;
var $author$project$Main$portGetToken = _Platform_outgoingPort('portGetToken', $elm$json$Json$Encode$string);
var $author$project$Main$init = F3(
	function (flags, url, key) {
		var model = A2($author$project$Main$initModel, url, key);
		var _v0 = $rundis$elm_bootstrap$Bootstrap$Navbar$initialState($author$project$Main$NavbarMsg);
		var navbarState = _v0.a;
		var navbarCmd = _v0.b;
		return _Utils_Tuple2(
			model,
			$elm$core$Platform$Cmd$batch(
				_List_fromArray(
					[
						$author$project$Main$portGetToken('token'),
						navbarCmd,
						A2($elm$core$Task$perform, $author$project$Main$AdjustTimeZone, $elm$time$Time$here)
					])));
	});
var $author$project$Main$ResToken = function (a) {
	return {$: 'ResToken', a: a};
};
var $author$project$Main$Tick1 = function (a) {
	return {$: 'Tick1', a: a};
};
var $author$project$Main$Tick5 = function (a) {
	return {$: 'Tick5', a: a};
};
var $elm$core$Platform$Sub$batch = _Platform_batch;
var $elm$time$Time$Every = F2(
	function (a, b) {
		return {$: 'Every', a: a, b: b};
	});
var $elm$time$Time$State = F2(
	function (taggers, processes) {
		return {processes: processes, taggers: taggers};
	});
var $elm$time$Time$init = $elm$core$Task$succeed(
	A2($elm$time$Time$State, $elm$core$Dict$empty, $elm$core$Dict$empty));
var $elm$core$Basics$compare = _Utils_compare;
var $elm$core$Dict$get = F2(
	function (targetKey, dict) {
		get:
		while (true) {
			if (dict.$ === 'RBEmpty_elm_builtin') {
				return $elm$core$Maybe$Nothing;
			} else {
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var _v1 = A2($elm$core$Basics$compare, targetKey, key);
				switch (_v1.$) {
					case 'LT':
						var $temp$targetKey = targetKey,
							$temp$dict = left;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
					case 'EQ':
						return $elm$core$Maybe$Just(value);
					default:
						var $temp$targetKey = targetKey,
							$temp$dict = right;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
				}
			}
		}
	});
var $elm$core$Dict$Black = {$: 'Black'};
var $elm$core$Dict$RBNode_elm_builtin = F5(
	function (a, b, c, d, e) {
		return {$: 'RBNode_elm_builtin', a: a, b: b, c: c, d: d, e: e};
	});
var $elm$core$Dict$Red = {$: 'Red'};
var $elm$core$Dict$balance = F5(
	function (color, key, value, left, right) {
		if ((right.$ === 'RBNode_elm_builtin') && (right.a.$ === 'Red')) {
			var _v1 = right.a;
			var rK = right.b;
			var rV = right.c;
			var rLeft = right.d;
			var rRight = right.e;
			if ((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Red')) {
				var _v3 = left.a;
				var lK = left.b;
				var lV = left.c;
				var lLeft = left.d;
				var lRight = left.e;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Red,
					key,
					value,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					color,
					rK,
					rV,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, key, value, left, rLeft),
					rRight);
			}
		} else {
			if ((((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Red')) && (left.d.$ === 'RBNode_elm_builtin')) && (left.d.a.$ === 'Red')) {
				var _v5 = left.a;
				var lK = left.b;
				var lV = left.c;
				var _v6 = left.d;
				var _v7 = _v6.a;
				var llK = _v6.b;
				var llV = _v6.c;
				var llLeft = _v6.d;
				var llRight = _v6.e;
				var lRight = left.e;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Red,
					lK,
					lV,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, llK, llV, llLeft, llRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, key, value, lRight, right));
			} else {
				return A5($elm$core$Dict$RBNode_elm_builtin, color, key, value, left, right);
			}
		}
	});
var $elm$core$Dict$insertHelp = F3(
	function (key, value, dict) {
		if (dict.$ === 'RBEmpty_elm_builtin') {
			return A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, key, value, $elm$core$Dict$RBEmpty_elm_builtin, $elm$core$Dict$RBEmpty_elm_builtin);
		} else {
			var nColor = dict.a;
			var nKey = dict.b;
			var nValue = dict.c;
			var nLeft = dict.d;
			var nRight = dict.e;
			var _v1 = A2($elm$core$Basics$compare, key, nKey);
			switch (_v1.$) {
				case 'LT':
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						A3($elm$core$Dict$insertHelp, key, value, nLeft),
						nRight);
				case 'EQ':
					return A5($elm$core$Dict$RBNode_elm_builtin, nColor, nKey, value, nLeft, nRight);
				default:
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						nLeft,
						A3($elm$core$Dict$insertHelp, key, value, nRight));
			}
		}
	});
var $elm$core$Dict$insert = F3(
	function (key, value, dict) {
		var _v0 = A3($elm$core$Dict$insertHelp, key, value, dict);
		if ((_v0.$ === 'RBNode_elm_builtin') && (_v0.a.$ === 'Red')) {
			var _v1 = _v0.a;
			var k = _v0.b;
			var v = _v0.c;
			var l = _v0.d;
			var r = _v0.e;
			return A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, k, v, l, r);
		} else {
			var x = _v0;
			return x;
		}
	});
var $elm$time$Time$addMySub = F2(
	function (_v0, state) {
		var interval = _v0.a;
		var tagger = _v0.b;
		var _v1 = A2($elm$core$Dict$get, interval, state);
		if (_v1.$ === 'Nothing') {
			return A3(
				$elm$core$Dict$insert,
				interval,
				_List_fromArray(
					[tagger]),
				state);
		} else {
			var taggers = _v1.a;
			return A3(
				$elm$core$Dict$insert,
				interval,
				A2($elm$core$List$cons, tagger, taggers),
				state);
		}
	});
var $elm$core$Process$kill = _Scheduler_kill;
var $elm$core$Dict$foldl = F3(
	function (func, acc, dict) {
		foldl:
		while (true) {
			if (dict.$ === 'RBEmpty_elm_builtin') {
				return acc;
			} else {
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3($elm$core$Dict$foldl, func, acc, left)),
					$temp$dict = right;
				func = $temp$func;
				acc = $temp$acc;
				dict = $temp$dict;
				continue foldl;
			}
		}
	});
var $elm$core$Dict$merge = F6(
	function (leftStep, bothStep, rightStep, leftDict, rightDict, initialResult) {
		var stepState = F3(
			function (rKey, rValue, _v0) {
				stepState:
				while (true) {
					var list = _v0.a;
					var result = _v0.b;
					if (!list.b) {
						return _Utils_Tuple2(
							list,
							A3(rightStep, rKey, rValue, result));
					} else {
						var _v2 = list.a;
						var lKey = _v2.a;
						var lValue = _v2.b;
						var rest = list.b;
						if (_Utils_cmp(lKey, rKey) < 0) {
							var $temp$rKey = rKey,
								$temp$rValue = rValue,
								$temp$_v0 = _Utils_Tuple2(
								rest,
								A3(leftStep, lKey, lValue, result));
							rKey = $temp$rKey;
							rValue = $temp$rValue;
							_v0 = $temp$_v0;
							continue stepState;
						} else {
							if (_Utils_cmp(lKey, rKey) > 0) {
								return _Utils_Tuple2(
									list,
									A3(rightStep, rKey, rValue, result));
							} else {
								return _Utils_Tuple2(
									rest,
									A4(bothStep, lKey, lValue, rValue, result));
							}
						}
					}
				}
			});
		var _v3 = A3(
			$elm$core$Dict$foldl,
			stepState,
			_Utils_Tuple2(
				$elm$core$Dict$toList(leftDict),
				initialResult),
			rightDict);
		var leftovers = _v3.a;
		var intermediateResult = _v3.b;
		return A3(
			$elm$core$List$foldl,
			F2(
				function (_v4, result) {
					var k = _v4.a;
					var v = _v4.b;
					return A3(leftStep, k, v, result);
				}),
			intermediateResult,
			leftovers);
	});
var $elm$core$Platform$sendToSelf = _Platform_sendToSelf;
var $elm$time$Time$setInterval = _Time_setInterval;
var $elm$core$Process$spawn = _Scheduler_spawn;
var $elm$time$Time$spawnHelp = F3(
	function (router, intervals, processes) {
		if (!intervals.b) {
			return $elm$core$Task$succeed(processes);
		} else {
			var interval = intervals.a;
			var rest = intervals.b;
			var spawnTimer = $elm$core$Process$spawn(
				A2(
					$elm$time$Time$setInterval,
					interval,
					A2($elm$core$Platform$sendToSelf, router, interval)));
			var spawnRest = function (id) {
				return A3(
					$elm$time$Time$spawnHelp,
					router,
					rest,
					A3($elm$core$Dict$insert, interval, id, processes));
			};
			return A2($elm$core$Task$andThen, spawnRest, spawnTimer);
		}
	});
var $elm$time$Time$onEffects = F3(
	function (router, subs, _v0) {
		var processes = _v0.processes;
		var rightStep = F3(
			function (_v6, id, _v7) {
				var spawns = _v7.a;
				var existing = _v7.b;
				var kills = _v7.c;
				return _Utils_Tuple3(
					spawns,
					existing,
					A2(
						$elm$core$Task$andThen,
						function (_v5) {
							return kills;
						},
						$elm$core$Process$kill(id)));
			});
		var newTaggers = A3($elm$core$List$foldl, $elm$time$Time$addMySub, $elm$core$Dict$empty, subs);
		var leftStep = F3(
			function (interval, taggers, _v4) {
				var spawns = _v4.a;
				var existing = _v4.b;
				var kills = _v4.c;
				return _Utils_Tuple3(
					A2($elm$core$List$cons, interval, spawns),
					existing,
					kills);
			});
		var bothStep = F4(
			function (interval, taggers, id, _v3) {
				var spawns = _v3.a;
				var existing = _v3.b;
				var kills = _v3.c;
				return _Utils_Tuple3(
					spawns,
					A3($elm$core$Dict$insert, interval, id, existing),
					kills);
			});
		var _v1 = A6(
			$elm$core$Dict$merge,
			leftStep,
			bothStep,
			rightStep,
			newTaggers,
			processes,
			_Utils_Tuple3(
				_List_Nil,
				$elm$core$Dict$empty,
				$elm$core$Task$succeed(_Utils_Tuple0)));
		var spawnList = _v1.a;
		var existingDict = _v1.b;
		var killTask = _v1.c;
		return A2(
			$elm$core$Task$andThen,
			function (newProcesses) {
				return $elm$core$Task$succeed(
					A2($elm$time$Time$State, newTaggers, newProcesses));
			},
			A2(
				$elm$core$Task$andThen,
				function (_v2) {
					return A3($elm$time$Time$spawnHelp, router, spawnList, existingDict);
				},
				killTask));
	});
var $elm$time$Time$Posix = function (a) {
	return {$: 'Posix', a: a};
};
var $elm$time$Time$millisToPosix = $elm$time$Time$Posix;
var $elm$time$Time$now = _Time_now($elm$time$Time$millisToPosix);
var $elm$time$Time$onSelfMsg = F3(
	function (router, interval, state) {
		var _v0 = A2($elm$core$Dict$get, interval, state.taggers);
		if (_v0.$ === 'Nothing') {
			return $elm$core$Task$succeed(state);
		} else {
			var taggers = _v0.a;
			var tellTaggers = function (time) {
				return $elm$core$Task$sequence(
					A2(
						$elm$core$List$map,
						function (tagger) {
							return A2(
								$elm$core$Platform$sendToApp,
								router,
								tagger(time));
						},
						taggers));
			};
			return A2(
				$elm$core$Task$andThen,
				function (_v1) {
					return $elm$core$Task$succeed(state);
				},
				A2($elm$core$Task$andThen, tellTaggers, $elm$time$Time$now));
		}
	});
var $elm$core$Basics$composeL = F3(
	function (g, f, x) {
		return g(
			f(x));
	});
var $elm$time$Time$subMap = F2(
	function (f, _v0) {
		var interval = _v0.a;
		var tagger = _v0.b;
		return A2(
			$elm$time$Time$Every,
			interval,
			A2($elm$core$Basics$composeL, f, tagger));
	});
_Platform_effectManagers['Time'] = _Platform_createManager($elm$time$Time$init, $elm$time$Time$onEffects, $elm$time$Time$onSelfMsg, 0, $elm$time$Time$subMap);
var $elm$time$Time$subscription = _Platform_leaf('Time');
var $elm$time$Time$every = F2(
	function (interval, tagger) {
		return $elm$time$Time$subscription(
			A2($elm$time$Time$Every, interval, tagger));
	});
var $elm$json$Json$Decode$andThen = _Json_andThen;
var $elm$json$Json$Decode$index = _Json_decodeIndex;
var $elm$json$Json$Decode$string = _Json_decodeString;
var $author$project$Main$portResToken = _Platform_incomingPort(
	'portResToken',
	A2(
		$elm$json$Json$Decode$andThen,
		function (_v0) {
			return A2(
				$elm$json$Json$Decode$andThen,
				function (_v1) {
					return $elm$json$Json$Decode$succeed(
						_Utils_Tuple2(_v0, _v1));
				},
				A2($elm$json$Json$Decode$index, 1, $elm$json$Json$Decode$string));
		},
		A2($elm$json$Json$Decode$index, 0, $elm$json$Json$Decode$string)));
var $rundis$elm_bootstrap$Bootstrap$Navbar$AnimatingDown = {$: 'AnimatingDown'};
var $rundis$elm_bootstrap$Bootstrap$Navbar$AnimatingUp = {$: 'AnimatingUp'};
var $rundis$elm_bootstrap$Bootstrap$Navbar$Closed = {$: 'Closed'};
var $rundis$elm_bootstrap$Bootstrap$Navbar$ListenClicks = {$: 'ListenClicks'};
var $rundis$elm_bootstrap$Bootstrap$Navbar$Open = {$: 'Open'};
var $elm$core$List$any = F2(
	function (isOkay, list) {
		any:
		while (true) {
			if (!list.b) {
				return false;
			} else {
				var x = list.a;
				var xs = list.b;
				if (isOkay(x)) {
					return true;
				} else {
					var $temp$isOkay = isOkay,
						$temp$list = xs;
					isOkay = $temp$isOkay;
					list = $temp$list;
					continue any;
				}
			}
		}
	});
var $elm$core$Dict$map = F2(
	function (func, dict) {
		if (dict.$ === 'RBEmpty_elm_builtin') {
			return $elm$core$Dict$RBEmpty_elm_builtin;
		} else {
			var color = dict.a;
			var key = dict.b;
			var value = dict.c;
			var left = dict.d;
			var right = dict.e;
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				color,
				key,
				A2(func, key, value),
				A2($elm$core$Dict$map, func, left),
				A2($elm$core$Dict$map, func, right));
		}
	});
var $elm$core$Platform$Sub$none = $elm$core$Platform$Sub$batch(_List_Nil);
var $elm$browser$Browser$AnimationManager$Time = function (a) {
	return {$: 'Time', a: a};
};
var $elm$browser$Browser$AnimationManager$State = F3(
	function (subs, request, oldTime) {
		return {oldTime: oldTime, request: request, subs: subs};
	});
var $elm$browser$Browser$AnimationManager$init = $elm$core$Task$succeed(
	A3($elm$browser$Browser$AnimationManager$State, _List_Nil, $elm$core$Maybe$Nothing, 0));
var $elm$browser$Browser$AnimationManager$now = _Browser_now(_Utils_Tuple0);
var $elm$browser$Browser$AnimationManager$rAF = _Browser_rAF(_Utils_Tuple0);
var $elm$browser$Browser$AnimationManager$onEffects = F3(
	function (router, subs, _v0) {
		var request = _v0.request;
		var oldTime = _v0.oldTime;
		var _v1 = _Utils_Tuple2(request, subs);
		if (_v1.a.$ === 'Nothing') {
			if (!_v1.b.b) {
				var _v2 = _v1.a;
				return $elm$browser$Browser$AnimationManager$init;
			} else {
				var _v4 = _v1.a;
				return A2(
					$elm$core$Task$andThen,
					function (pid) {
						return A2(
							$elm$core$Task$andThen,
							function (time) {
								return $elm$core$Task$succeed(
									A3(
										$elm$browser$Browser$AnimationManager$State,
										subs,
										$elm$core$Maybe$Just(pid),
										time));
							},
							$elm$browser$Browser$AnimationManager$now);
					},
					$elm$core$Process$spawn(
						A2(
							$elm$core$Task$andThen,
							$elm$core$Platform$sendToSelf(router),
							$elm$browser$Browser$AnimationManager$rAF)));
			}
		} else {
			if (!_v1.b.b) {
				var pid = _v1.a.a;
				return A2(
					$elm$core$Task$andThen,
					function (_v3) {
						return $elm$browser$Browser$AnimationManager$init;
					},
					$elm$core$Process$kill(pid));
			} else {
				return $elm$core$Task$succeed(
					A3($elm$browser$Browser$AnimationManager$State, subs, request, oldTime));
			}
		}
	});
var $elm$browser$Browser$AnimationManager$onSelfMsg = F3(
	function (router, newTime, _v0) {
		var subs = _v0.subs;
		var oldTime = _v0.oldTime;
		var send = function (sub) {
			if (sub.$ === 'Time') {
				var tagger = sub.a;
				return A2(
					$elm$core$Platform$sendToApp,
					router,
					tagger(
						$elm$time$Time$millisToPosix(newTime)));
			} else {
				var tagger = sub.a;
				return A2(
					$elm$core$Platform$sendToApp,
					router,
					tagger(newTime - oldTime));
			}
		};
		return A2(
			$elm$core$Task$andThen,
			function (pid) {
				return A2(
					$elm$core$Task$andThen,
					function (_v1) {
						return $elm$core$Task$succeed(
							A3(
								$elm$browser$Browser$AnimationManager$State,
								subs,
								$elm$core$Maybe$Just(pid),
								newTime));
					},
					$elm$core$Task$sequence(
						A2($elm$core$List$map, send, subs)));
			},
			$elm$core$Process$spawn(
				A2(
					$elm$core$Task$andThen,
					$elm$core$Platform$sendToSelf(router),
					$elm$browser$Browser$AnimationManager$rAF)));
	});
var $elm$browser$Browser$AnimationManager$Delta = function (a) {
	return {$: 'Delta', a: a};
};
var $elm$browser$Browser$AnimationManager$subMap = F2(
	function (func, sub) {
		if (sub.$ === 'Time') {
			var tagger = sub.a;
			return $elm$browser$Browser$AnimationManager$Time(
				A2($elm$core$Basics$composeL, func, tagger));
		} else {
			var tagger = sub.a;
			return $elm$browser$Browser$AnimationManager$Delta(
				A2($elm$core$Basics$composeL, func, tagger));
		}
	});
_Platform_effectManagers['Browser.AnimationManager'] = _Platform_createManager($elm$browser$Browser$AnimationManager$init, $elm$browser$Browser$AnimationManager$onEffects, $elm$browser$Browser$AnimationManager$onSelfMsg, 0, $elm$browser$Browser$AnimationManager$subMap);
var $elm$browser$Browser$AnimationManager$subscription = _Platform_leaf('Browser.AnimationManager');
var $elm$browser$Browser$AnimationManager$onAnimationFrame = function (tagger) {
	return $elm$browser$Browser$AnimationManager$subscription(
		$elm$browser$Browser$AnimationManager$Time(tagger));
};
var $elm$browser$Browser$Events$onAnimationFrame = $elm$browser$Browser$AnimationManager$onAnimationFrame;
var $elm$browser$Browser$Events$Document = {$: 'Document'};
var $elm$browser$Browser$Events$MySub = F3(
	function (a, b, c) {
		return {$: 'MySub', a: a, b: b, c: c};
	});
var $elm$browser$Browser$Events$State = F2(
	function (subs, pids) {
		return {pids: pids, subs: subs};
	});
var $elm$browser$Browser$Events$init = $elm$core$Task$succeed(
	A2($elm$browser$Browser$Events$State, _List_Nil, $elm$core$Dict$empty));
var $elm$browser$Browser$Events$nodeToKey = function (node) {
	if (node.$ === 'Document') {
		return 'd_';
	} else {
		return 'w_';
	}
};
var $elm$browser$Browser$Events$addKey = function (sub) {
	var node = sub.a;
	var name = sub.b;
	return _Utils_Tuple2(
		_Utils_ap(
			$elm$browser$Browser$Events$nodeToKey(node),
			name),
		sub);
};
var $elm$core$Dict$fromList = function (assocs) {
	return A3(
		$elm$core$List$foldl,
		F2(
			function (_v0, dict) {
				var key = _v0.a;
				var value = _v0.b;
				return A3($elm$core$Dict$insert, key, value, dict);
			}),
		$elm$core$Dict$empty,
		assocs);
};
var $elm$browser$Browser$Events$Event = F2(
	function (key, event) {
		return {event: event, key: key};
	});
var $elm$browser$Browser$Events$spawn = F3(
	function (router, key, _v0) {
		var node = _v0.a;
		var name = _v0.b;
		var actualNode = function () {
			if (node.$ === 'Document') {
				return _Browser_doc;
			} else {
				return _Browser_window;
			}
		}();
		return A2(
			$elm$core$Task$map,
			function (value) {
				return _Utils_Tuple2(key, value);
			},
			A3(
				_Browser_on,
				actualNode,
				name,
				function (event) {
					return A2(
						$elm$core$Platform$sendToSelf,
						router,
						A2($elm$browser$Browser$Events$Event, key, event));
				}));
	});
var $elm$core$Dict$union = F2(
	function (t1, t2) {
		return A3($elm$core$Dict$foldl, $elm$core$Dict$insert, t2, t1);
	});
var $elm$browser$Browser$Events$onEffects = F3(
	function (router, subs, state) {
		var stepRight = F3(
			function (key, sub, _v6) {
				var deads = _v6.a;
				var lives = _v6.b;
				var news = _v6.c;
				return _Utils_Tuple3(
					deads,
					lives,
					A2(
						$elm$core$List$cons,
						A3($elm$browser$Browser$Events$spawn, router, key, sub),
						news));
			});
		var stepLeft = F3(
			function (_v4, pid, _v5) {
				var deads = _v5.a;
				var lives = _v5.b;
				var news = _v5.c;
				return _Utils_Tuple3(
					A2($elm$core$List$cons, pid, deads),
					lives,
					news);
			});
		var stepBoth = F4(
			function (key, pid, _v2, _v3) {
				var deads = _v3.a;
				var lives = _v3.b;
				var news = _v3.c;
				return _Utils_Tuple3(
					deads,
					A3($elm$core$Dict$insert, key, pid, lives),
					news);
			});
		var newSubs = A2($elm$core$List$map, $elm$browser$Browser$Events$addKey, subs);
		var _v0 = A6(
			$elm$core$Dict$merge,
			stepLeft,
			stepBoth,
			stepRight,
			state.pids,
			$elm$core$Dict$fromList(newSubs),
			_Utils_Tuple3(_List_Nil, $elm$core$Dict$empty, _List_Nil));
		var deadPids = _v0.a;
		var livePids = _v0.b;
		var makeNewPids = _v0.c;
		return A2(
			$elm$core$Task$andThen,
			function (pids) {
				return $elm$core$Task$succeed(
					A2(
						$elm$browser$Browser$Events$State,
						newSubs,
						A2(
							$elm$core$Dict$union,
							livePids,
							$elm$core$Dict$fromList(pids))));
			},
			A2(
				$elm$core$Task$andThen,
				function (_v1) {
					return $elm$core$Task$sequence(makeNewPids);
				},
				$elm$core$Task$sequence(
					A2($elm$core$List$map, $elm$core$Process$kill, deadPids))));
	});
var $elm$browser$Browser$Events$onSelfMsg = F3(
	function (router, _v0, state) {
		var key = _v0.key;
		var event = _v0.event;
		var toMessage = function (_v2) {
			var subKey = _v2.a;
			var _v3 = _v2.b;
			var node = _v3.a;
			var name = _v3.b;
			var decoder = _v3.c;
			return _Utils_eq(subKey, key) ? A2(_Browser_decodeEvent, decoder, event) : $elm$core$Maybe$Nothing;
		};
		var messages = A2($elm$core$List$filterMap, toMessage, state.subs);
		return A2(
			$elm$core$Task$andThen,
			function (_v1) {
				return $elm$core$Task$succeed(state);
			},
			$elm$core$Task$sequence(
				A2(
					$elm$core$List$map,
					$elm$core$Platform$sendToApp(router),
					messages)));
	});
var $elm$browser$Browser$Events$subMap = F2(
	function (func, _v0) {
		var node = _v0.a;
		var name = _v0.b;
		var decoder = _v0.c;
		return A3(
			$elm$browser$Browser$Events$MySub,
			node,
			name,
			A2($elm$json$Json$Decode$map, func, decoder));
	});
_Platform_effectManagers['Browser.Events'] = _Platform_createManager($elm$browser$Browser$Events$init, $elm$browser$Browser$Events$onEffects, $elm$browser$Browser$Events$onSelfMsg, 0, $elm$browser$Browser$Events$subMap);
var $elm$browser$Browser$Events$subscription = _Platform_leaf('Browser.Events');
var $elm$browser$Browser$Events$on = F3(
	function (node, name, decoder) {
		return $elm$browser$Browser$Events$subscription(
			A3($elm$browser$Browser$Events$MySub, node, name, decoder));
	});
var $elm$browser$Browser$Events$onClick = A2($elm$browser$Browser$Events$on, $elm$browser$Browser$Events$Document, 'click');
var $rundis$elm_bootstrap$Bootstrap$Navbar$dropdownSubscriptions = F2(
	function (state, toMsg) {
		var dropdowns = state.a.dropdowns;
		var updDropdowns = A2(
			$elm$core$Dict$map,
			F2(
				function (_v2, status) {
					switch (status.$) {
						case 'Open':
							return $rundis$elm_bootstrap$Bootstrap$Navbar$ListenClicks;
						case 'ListenClicks':
							return $rundis$elm_bootstrap$Bootstrap$Navbar$Closed;
						default:
							return $rundis$elm_bootstrap$Bootstrap$Navbar$Closed;
					}
				}),
			dropdowns);
		var updState = A2(
			$rundis$elm_bootstrap$Bootstrap$Navbar$mapState,
			function (s) {
				return _Utils_update(
					s,
					{dropdowns: updDropdowns});
			},
			state);
		var needsSub = function (s) {
			return A2(
				$elm$core$List$any,
				function (_v1) {
					var status = _v1.b;
					return _Utils_eq(status, s);
				},
				$elm$core$Dict$toList(dropdowns));
		};
		return $elm$core$Platform$Sub$batch(
			_List_fromArray(
				[
					needsSub($rundis$elm_bootstrap$Bootstrap$Navbar$Open) ? $elm$browser$Browser$Events$onAnimationFrame(
					function (_v0) {
						return toMsg(updState);
					}) : $elm$core$Platform$Sub$none,
					needsSub($rundis$elm_bootstrap$Bootstrap$Navbar$ListenClicks) ? $elm$browser$Browser$Events$onClick(
					$elm$json$Json$Decode$succeed(
						toMsg(updState))) : $elm$core$Platform$Sub$none
				]));
	});
var $elm$browser$Browser$Events$Window = {$: 'Window'};
var $elm$json$Json$Decode$field = _Json_decodeField;
var $elm$json$Json$Decode$int = _Json_decodeInt;
var $elm$browser$Browser$Events$onResize = function (func) {
	return A3(
		$elm$browser$Browser$Events$on,
		$elm$browser$Browser$Events$Window,
		'resize',
		A2(
			$elm$json$Json$Decode$field,
			'target',
			A3(
				$elm$json$Json$Decode$map2,
				func,
				A2($elm$json$Json$Decode$field, 'innerWidth', $elm$json$Json$Decode$int),
				A2($elm$json$Json$Decode$field, 'innerHeight', $elm$json$Json$Decode$int))));
};
var $rundis$elm_bootstrap$Bootstrap$Navbar$subscriptions = F2(
	function (state, toMsg) {
		var visibility = state.a.visibility;
		var updState = function (v) {
			return A2(
				$rundis$elm_bootstrap$Bootstrap$Navbar$mapState,
				function (s) {
					return _Utils_update(
						s,
						{visibility: v});
				},
				state);
		};
		return $elm$core$Platform$Sub$batch(
			_List_fromArray(
				[
					function () {
					switch (visibility.$) {
						case 'StartDown':
							return $elm$browser$Browser$Events$onAnimationFrame(
								function (_v1) {
									return toMsg(
										updState($rundis$elm_bootstrap$Bootstrap$Navbar$AnimatingDown));
								});
						case 'StartUp':
							return $elm$browser$Browser$Events$onAnimationFrame(
								function (_v2) {
									return toMsg(
										updState($rundis$elm_bootstrap$Bootstrap$Navbar$AnimatingUp));
								});
						default:
							return $elm$core$Platform$Sub$none;
					}
				}(),
					$elm$browser$Browser$Events$onResize(
					F2(
						function (x, _v3) {
							return toMsg(
								A2(
									$rundis$elm_bootstrap$Bootstrap$Navbar$mapState,
									function (s) {
										return _Utils_update(
											s,
											{
												windowWidth: $elm$core$Maybe$Just(x)
											});
									},
									state));
						})),
					A2($rundis$elm_bootstrap$Bootstrap$Navbar$dropdownSubscriptions, state, toMsg)
				]));
	});
var $author$project$Main$subscriptions = function (model) {
	return $elm$core$Platform$Sub$batch(
		_List_fromArray(
			[
				$author$project$Main$portResToken($author$project$Main$ResToken),
				A2($rundis$elm_bootstrap$Bootstrap$Navbar$subscriptions, model.navbarState, $author$project$Main$NavbarMsg),
				A2($elm$time$Time$every, 1399, $author$project$Main$Tick1),
				A2($elm$time$Time$every, 4999, $author$project$Main$Tick5)
			]));
};
var $author$project$Main$Event = {$: 'Event'};
var $author$project$Main$JoinGame = {$: 'JoinGame'};
var $author$project$Main$LoginFail = {$: 'LoginFail'};
var $author$project$Main$LoginSuccess = {$: 'LoginSuccess'};
var $author$project$Main$NoOp = {$: 'NoOp'};
var $author$project$Main$Player = F5(
	function (_break, score, handicap, income, typing) {
		return {_break: _break, handicap: handicap, income: income, score: score, typing: typing};
	});
var $author$project$Main$RandomList = function (a) {
	return {$: 'RandomList', a: a};
};
var $author$project$Main$RegisterFail = {$: 'RegisterFail'};
var $author$project$Main$RegisterPasswordFail = {$: 'RegisterPasswordFail'};
var $author$project$Main$RegisterSuccess = {$: 'RegisterSuccess'};
var $author$project$Main$ScoreInput = {$: 'ScoreInput'};
var $author$project$Main$Teaming = {$: 'Teaming'};
var $author$project$Main$TokenUserId = F2(
	function (token, user_id) {
		return {token: token, user_id: user_id};
	});
var $author$project$Main$applyScoreToPlayer = F3(
	function (score, handicap, player) {
		var toString = function (val) {
			return (!val) ? '' : $elm$core$String$fromInt(val);
		};
		if (player.$ === 'Nothing') {
			return $elm$core$Maybe$Just(
				A5(
					$author$project$Main$Player,
					false,
					toString(score),
					handicap,
					0,
					false));
		} else {
			var p = player.a;
			return p.typing ? $elm$core$Maybe$Just(p) : $elm$core$Maybe$Just(
				A5(
					$author$project$Main$Player,
					p._break,
					toString(score),
					handicap,
					p.income,
					p.typing));
		}
	});
var $author$project$Main$first = function (_v0) {
	var a = _v0.a;
	var b = _v0.b;
	var c = _v0.c;
	return a;
};
var $author$project$Main$second = function (_v0) {
	var a = _v0.a;
	var b = _v0.b;
	var c = _v0.c;
	return b;
};
var $author$project$Main$third = function (_v0) {
	var a = _v0.a;
	var b = _v0.b;
	var c = _v0.c;
	return c;
};
var $elm$core$Dict$getMin = function (dict) {
	getMin:
	while (true) {
		if ((dict.$ === 'RBNode_elm_builtin') && (dict.d.$ === 'RBNode_elm_builtin')) {
			var left = dict.d;
			var $temp$dict = left;
			dict = $temp$dict;
			continue getMin;
		} else {
			return dict;
		}
	}
};
var $elm$core$Dict$moveRedLeft = function (dict) {
	if (((dict.$ === 'RBNode_elm_builtin') && (dict.d.$ === 'RBNode_elm_builtin')) && (dict.e.$ === 'RBNode_elm_builtin')) {
		if ((dict.e.d.$ === 'RBNode_elm_builtin') && (dict.e.d.a.$ === 'Red')) {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v1 = dict.d;
			var lClr = _v1.a;
			var lK = _v1.b;
			var lV = _v1.c;
			var lLeft = _v1.d;
			var lRight = _v1.e;
			var _v2 = dict.e;
			var rClr = _v2.a;
			var rK = _v2.b;
			var rV = _v2.c;
			var rLeft = _v2.d;
			var _v3 = rLeft.a;
			var rlK = rLeft.b;
			var rlV = rLeft.c;
			var rlL = rLeft.d;
			var rlR = rLeft.e;
			var rRight = _v2.e;
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				$elm$core$Dict$Red,
				rlK,
				rlV,
				A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Black,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, lK, lV, lLeft, lRight),
					rlL),
				A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, rK, rV, rlR, rRight));
		} else {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v4 = dict.d;
			var lClr = _v4.a;
			var lK = _v4.b;
			var lV = _v4.c;
			var lLeft = _v4.d;
			var lRight = _v4.e;
			var _v5 = dict.e;
			var rClr = _v5.a;
			var rK = _v5.b;
			var rV = _v5.c;
			var rLeft = _v5.d;
			var rRight = _v5.e;
			if (clr.$ === 'Black') {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Black,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Black,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, rK, rV, rLeft, rRight));
			}
		}
	} else {
		return dict;
	}
};
var $elm$core$Dict$moveRedRight = function (dict) {
	if (((dict.$ === 'RBNode_elm_builtin') && (dict.d.$ === 'RBNode_elm_builtin')) && (dict.e.$ === 'RBNode_elm_builtin')) {
		if ((dict.d.d.$ === 'RBNode_elm_builtin') && (dict.d.d.a.$ === 'Red')) {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v1 = dict.d;
			var lClr = _v1.a;
			var lK = _v1.b;
			var lV = _v1.c;
			var _v2 = _v1.d;
			var _v3 = _v2.a;
			var llK = _v2.b;
			var llV = _v2.c;
			var llLeft = _v2.d;
			var llRight = _v2.e;
			var lRight = _v1.e;
			var _v4 = dict.e;
			var rClr = _v4.a;
			var rK = _v4.b;
			var rV = _v4.c;
			var rLeft = _v4.d;
			var rRight = _v4.e;
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				$elm$core$Dict$Red,
				lK,
				lV,
				A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, llK, llV, llLeft, llRight),
				A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Black,
					k,
					v,
					lRight,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, rK, rV, rLeft, rRight)));
		} else {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v5 = dict.d;
			var lClr = _v5.a;
			var lK = _v5.b;
			var lV = _v5.c;
			var lLeft = _v5.d;
			var lRight = _v5.e;
			var _v6 = dict.e;
			var rClr = _v6.a;
			var rK = _v6.b;
			var rV = _v6.c;
			var rLeft = _v6.d;
			var rRight = _v6.e;
			if (clr.$ === 'Black') {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Black,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Black,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, rK, rV, rLeft, rRight));
			}
		}
	} else {
		return dict;
	}
};
var $elm$core$Dict$removeHelpPrepEQGT = F7(
	function (targetKey, dict, color, key, value, left, right) {
		if ((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Red')) {
			var _v1 = left.a;
			var lK = left.b;
			var lV = left.c;
			var lLeft = left.d;
			var lRight = left.e;
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				color,
				lK,
				lV,
				lLeft,
				A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, key, value, lRight, right));
		} else {
			_v2$2:
			while (true) {
				if ((right.$ === 'RBNode_elm_builtin') && (right.a.$ === 'Black')) {
					if (right.d.$ === 'RBNode_elm_builtin') {
						if (right.d.a.$ === 'Black') {
							var _v3 = right.a;
							var _v4 = right.d;
							var _v5 = _v4.a;
							return $elm$core$Dict$moveRedRight(dict);
						} else {
							break _v2$2;
						}
					} else {
						var _v6 = right.a;
						var _v7 = right.d;
						return $elm$core$Dict$moveRedRight(dict);
					}
				} else {
					break _v2$2;
				}
			}
			return dict;
		}
	});
var $elm$core$Dict$removeMin = function (dict) {
	if ((dict.$ === 'RBNode_elm_builtin') && (dict.d.$ === 'RBNode_elm_builtin')) {
		var color = dict.a;
		var key = dict.b;
		var value = dict.c;
		var left = dict.d;
		var lColor = left.a;
		var lLeft = left.d;
		var right = dict.e;
		if (lColor.$ === 'Black') {
			if ((lLeft.$ === 'RBNode_elm_builtin') && (lLeft.a.$ === 'Red')) {
				var _v3 = lLeft.a;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					color,
					key,
					value,
					$elm$core$Dict$removeMin(left),
					right);
			} else {
				var _v4 = $elm$core$Dict$moveRedLeft(dict);
				if (_v4.$ === 'RBNode_elm_builtin') {
					var nColor = _v4.a;
					var nKey = _v4.b;
					var nValue = _v4.c;
					var nLeft = _v4.d;
					var nRight = _v4.e;
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						$elm$core$Dict$removeMin(nLeft),
						nRight);
				} else {
					return $elm$core$Dict$RBEmpty_elm_builtin;
				}
			}
		} else {
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				color,
				key,
				value,
				$elm$core$Dict$removeMin(left),
				right);
		}
	} else {
		return $elm$core$Dict$RBEmpty_elm_builtin;
	}
};
var $elm$core$Dict$removeHelp = F2(
	function (targetKey, dict) {
		if (dict.$ === 'RBEmpty_elm_builtin') {
			return $elm$core$Dict$RBEmpty_elm_builtin;
		} else {
			var color = dict.a;
			var key = dict.b;
			var value = dict.c;
			var left = dict.d;
			var right = dict.e;
			if (_Utils_cmp(targetKey, key) < 0) {
				if ((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Black')) {
					var _v4 = left.a;
					var lLeft = left.d;
					if ((lLeft.$ === 'RBNode_elm_builtin') && (lLeft.a.$ === 'Red')) {
						var _v6 = lLeft.a;
						return A5(
							$elm$core$Dict$RBNode_elm_builtin,
							color,
							key,
							value,
							A2($elm$core$Dict$removeHelp, targetKey, left),
							right);
					} else {
						var _v7 = $elm$core$Dict$moveRedLeft(dict);
						if (_v7.$ === 'RBNode_elm_builtin') {
							var nColor = _v7.a;
							var nKey = _v7.b;
							var nValue = _v7.c;
							var nLeft = _v7.d;
							var nRight = _v7.e;
							return A5(
								$elm$core$Dict$balance,
								nColor,
								nKey,
								nValue,
								A2($elm$core$Dict$removeHelp, targetKey, nLeft),
								nRight);
						} else {
							return $elm$core$Dict$RBEmpty_elm_builtin;
						}
					}
				} else {
					return A5(
						$elm$core$Dict$RBNode_elm_builtin,
						color,
						key,
						value,
						A2($elm$core$Dict$removeHelp, targetKey, left),
						right);
				}
			} else {
				return A2(
					$elm$core$Dict$removeHelpEQGT,
					targetKey,
					A7($elm$core$Dict$removeHelpPrepEQGT, targetKey, dict, color, key, value, left, right));
			}
		}
	});
var $elm$core$Dict$removeHelpEQGT = F2(
	function (targetKey, dict) {
		if (dict.$ === 'RBNode_elm_builtin') {
			var color = dict.a;
			var key = dict.b;
			var value = dict.c;
			var left = dict.d;
			var right = dict.e;
			if (_Utils_eq(targetKey, key)) {
				var _v1 = $elm$core$Dict$getMin(right);
				if (_v1.$ === 'RBNode_elm_builtin') {
					var minKey = _v1.b;
					var minValue = _v1.c;
					return A5(
						$elm$core$Dict$balance,
						color,
						minKey,
						minValue,
						left,
						$elm$core$Dict$removeMin(right));
				} else {
					return $elm$core$Dict$RBEmpty_elm_builtin;
				}
			} else {
				return A5(
					$elm$core$Dict$balance,
					color,
					key,
					value,
					left,
					A2($elm$core$Dict$removeHelp, targetKey, right));
			}
		} else {
			return $elm$core$Dict$RBEmpty_elm_builtin;
		}
	});
var $elm$core$Dict$remove = F2(
	function (key, dict) {
		var _v0 = A2($elm$core$Dict$removeHelp, key, dict);
		if ((_v0.$ === 'RBNode_elm_builtin') && (_v0.a.$ === 'Red')) {
			var _v1 = _v0.a;
			var k = _v0.b;
			var v = _v0.c;
			var l = _v0.d;
			var r = _v0.e;
			return A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, k, v, l, r);
		} else {
			var x = _v0;
			return x;
		}
	});
var $elm$core$Dict$update = F3(
	function (targetKey, alter, dictionary) {
		var _v0 = alter(
			A2($elm$core$Dict$get, targetKey, dictionary));
		if (_v0.$ === 'Just') {
			var value = _v0.a;
			return A3($elm$core$Dict$insert, targetKey, value, dictionary);
		} else {
			return A2($elm$core$Dict$remove, targetKey, dictionary);
		}
	});
var $author$project$Main$applyScoresToPlayers = F2(
	function (list, players) {
		applyScoresToPlayers:
		while (true) {
			var toString = function (val) {
				return (!val) ? '' : $elm$core$String$fromInt(val);
			};
			if (!list.b) {
				return players;
			} else {
				var x = list.a;
				var xs = list.b;
				var $temp$list = xs,
					$temp$players = A3(
					$elm$core$Dict$update,
					$author$project$Main$first(x),
					A2(
						$author$project$Main$applyScoreToPlayer,
						$author$project$Main$second(x),
						$author$project$Main$third(x)),
					players);
				list = $temp$list;
				players = $temp$players;
				continue applyScoresToPlayers;
			}
		}
	});
var $elm$core$List$append = F2(
	function (xs, ys) {
		if (!ys.b) {
			return xs;
		} else {
			return A3($elm$core$List$foldr, $elm$core$List$cons, ys, xs);
		}
	});
var $elm$core$List$concat = function (lists) {
	return A3($elm$core$List$foldr, $elm$core$List$append, _List_Nil, lists);
};
var $elm$json$Json$Encode$list = F2(
	function (func, entries) {
		return _Json_wrap(
			A3(
				$elm$core$List$foldl,
				_Json_addEntry(func),
				_Json_emptyArray(_Utils_Tuple0),
				entries));
	});
var $author$project$Main$copyToClipboard = _Platform_outgoingPort(
	'copyToClipboard',
	function ($) {
		var a = $.a;
		var b = $.b;
		return A2(
			$elm$json$Json$Encode$list,
			$elm$core$Basics$identity,
			_List_fromArray(
				[
					$elm$json$Json$Encode$string(a),
					$elm$json$Json$Encode$string(b)
				]));
	});
var $author$project$Main$errToString = function (err) {
	switch (err.$) {
		case 'Timeout':
			return 'Timeout exceeded';
		case 'NetworkError':
			return 'Network error';
		case 'BadUrl':
			var url = err.a;
			return 'Malformed url: ' + url;
		case 'BadBody':
			var body = err.a;
			return 'BadBody: ' + body;
		default:
			var status = err.a;
			switch (status) {
				case 400:
					return 'Invalid Game ID.';
				case 401:
					return 'User ID or Password is incorrect';
				default:
					return 'BadStatus : ' + $elm$core$String$fromInt(status);
			}
	}
};
var $author$project$Main$errorToString = function (err) {
	switch (err.$) {
		case 'Timeout':
			return 'Timeout exceeded';
		case 'NetworkError':
			return 'Network error';
		case 'BadUrl':
			var url = err.a;
			return 'Malformed url: ' + url;
		case 'BadBody':
			var metadata = err.a;
			var body = err.b;
			var reason = err.c;
			return 'BadBody: ' + body;
		default:
			var metadata = err.a;
			var body = err.b;
			return (metadata.statusCode === 409) ? metadata.statusText : ('BadStatus : ' + (body + (' : ' + ($elm$core$String$fromInt(metadata.statusCode) + (' : ' + metadata.statusText)))));
	}
};
var $elm$core$Dict$filter = F2(
	function (isGood, dict) {
		return A3(
			$elm$core$Dict$foldl,
			F3(
				function (k, v, d) {
					return A2(isGood, k, v) ? A3($elm$core$Dict$insert, k, v, d) : d;
				}),
			$elm$core$Dict$empty,
			dict);
	});
var $elm$core$String$filter = _String_filter;
var $elm$random$Random$Generate = function (a) {
	return {$: 'Generate', a: a};
};
var $elm$random$Random$Seed = F2(
	function (a, b) {
		return {$: 'Seed', a: a, b: b};
	});
var $elm$random$Random$next = function (_v0) {
	var state0 = _v0.a;
	var incr = _v0.b;
	return A2($elm$random$Random$Seed, ((state0 * 1664525) + incr) >>> 0, incr);
};
var $elm$random$Random$initialSeed = function (x) {
	var _v0 = $elm$random$Random$next(
		A2($elm$random$Random$Seed, 0, 1013904223));
	var state1 = _v0.a;
	var incr = _v0.b;
	var state2 = (state1 + x) >>> 0;
	return $elm$random$Random$next(
		A2($elm$random$Random$Seed, state2, incr));
};
var $elm$time$Time$posixToMillis = function (_v0) {
	var millis = _v0.a;
	return millis;
};
var $elm$random$Random$init = A2(
	$elm$core$Task$andThen,
	function (time) {
		return $elm$core$Task$succeed(
			$elm$random$Random$initialSeed(
				$elm$time$Time$posixToMillis(time)));
	},
	$elm$time$Time$now);
var $elm$random$Random$step = F2(
	function (_v0, seed) {
		var generator = _v0.a;
		return generator(seed);
	});
var $elm$random$Random$onEffects = F3(
	function (router, commands, seed) {
		if (!commands.b) {
			return $elm$core$Task$succeed(seed);
		} else {
			var generator = commands.a.a;
			var rest = commands.b;
			var _v1 = A2($elm$random$Random$step, generator, seed);
			var value = _v1.a;
			var newSeed = _v1.b;
			return A2(
				$elm$core$Task$andThen,
				function (_v2) {
					return A3($elm$random$Random$onEffects, router, rest, newSeed);
				},
				A2($elm$core$Platform$sendToApp, router, value));
		}
	});
var $elm$random$Random$onSelfMsg = F3(
	function (_v0, _v1, seed) {
		return $elm$core$Task$succeed(seed);
	});
var $elm$random$Random$Generator = function (a) {
	return {$: 'Generator', a: a};
};
var $elm$random$Random$map = F2(
	function (func, _v0) {
		var genA = _v0.a;
		return $elm$random$Random$Generator(
			function (seed0) {
				var _v1 = genA(seed0);
				var a = _v1.a;
				var seed1 = _v1.b;
				return _Utils_Tuple2(
					func(a),
					seed1);
			});
	});
var $elm$random$Random$cmdMap = F2(
	function (func, _v0) {
		var generator = _v0.a;
		return $elm$random$Random$Generate(
			A2($elm$random$Random$map, func, generator));
	});
_Platform_effectManagers['Random'] = _Platform_createManager($elm$random$Random$init, $elm$random$Random$onEffects, $elm$random$Random$onSelfMsg, $elm$random$Random$cmdMap);
var $elm$random$Random$command = _Platform_leaf('Random');
var $elm$random$Random$generate = F2(
	function (tagger, generator) {
		return $elm$random$Random$command(
			$elm$random$Random$Generate(
				A2($elm$random$Random$map, tagger, generator)));
	});
var $author$project$Main$GetCurrentResult = function (a) {
	return {$: 'GetCurrentResult', a: a};
};
var $elm$core$Tuple$pair = F2(
	function (a, b) {
		return _Utils_Tuple2(a, b);
	});
var $author$project$Main$currentDecoder = A3(
	$elm$json$Json$Decode$map2,
	$elm$core$Tuple$pair,
	A2($elm$json$Json$Decode$index, 0, $elm$json$Json$Decode$string),
	A2($elm$json$Json$Decode$index, 1, $elm$json$Json$Decode$string));
var $author$project$Main$eventAPI = 'event';
var $elm$json$Json$Decode$decodeString = _Json_runOnString;
var $elm$http$Http$BadStatus_ = F2(
	function (a, b) {
		return {$: 'BadStatus_', a: a, b: b};
	});
var $elm$http$Http$BadUrl_ = function (a) {
	return {$: 'BadUrl_', a: a};
};
var $elm$http$Http$GoodStatus_ = F2(
	function (a, b) {
		return {$: 'GoodStatus_', a: a, b: b};
	});
var $elm$http$Http$NetworkError_ = {$: 'NetworkError_'};
var $elm$http$Http$Receiving = function (a) {
	return {$: 'Receiving', a: a};
};
var $elm$http$Http$Sending = function (a) {
	return {$: 'Sending', a: a};
};
var $elm$http$Http$Timeout_ = {$: 'Timeout_'};
var $elm$core$Maybe$isJust = function (maybe) {
	if (maybe.$ === 'Just') {
		return true;
	} else {
		return false;
	}
};
var $elm$core$Basics$composeR = F3(
	function (f, g, x) {
		return g(
			f(x));
	});
var $elm$http$Http$expectStringResponse = F2(
	function (toMsg, toResult) {
		return A3(
			_Http_expect,
			'',
			$elm$core$Basics$identity,
			A2($elm$core$Basics$composeR, toResult, toMsg));
	});
var $elm$core$Result$mapError = F2(
	function (f, result) {
		if (result.$ === 'Ok') {
			var v = result.a;
			return $elm$core$Result$Ok(v);
		} else {
			var e = result.a;
			return $elm$core$Result$Err(
				f(e));
		}
	});
var $elm$http$Http$BadBody = function (a) {
	return {$: 'BadBody', a: a};
};
var $elm$http$Http$BadStatus = function (a) {
	return {$: 'BadStatus', a: a};
};
var $elm$http$Http$BadUrl = function (a) {
	return {$: 'BadUrl', a: a};
};
var $elm$http$Http$NetworkError = {$: 'NetworkError'};
var $elm$http$Http$Timeout = {$: 'Timeout'};
var $elm$http$Http$resolve = F2(
	function (toResult, response) {
		switch (response.$) {
			case 'BadUrl_':
				var url = response.a;
				return $elm$core$Result$Err(
					$elm$http$Http$BadUrl(url));
			case 'Timeout_':
				return $elm$core$Result$Err($elm$http$Http$Timeout);
			case 'NetworkError_':
				return $elm$core$Result$Err($elm$http$Http$NetworkError);
			case 'BadStatus_':
				var metadata = response.a;
				return $elm$core$Result$Err(
					$elm$http$Http$BadStatus(metadata.statusCode));
			default:
				var body = response.b;
				return A2(
					$elm$core$Result$mapError,
					$elm$http$Http$BadBody,
					toResult(body));
		}
	});
var $elm$http$Http$expectJson = F2(
	function (toMsg, decoder) {
		return A2(
			$elm$http$Http$expectStringResponse,
			toMsg,
			$elm$http$Http$resolve(
				function (string) {
					return A2(
						$elm$core$Result$mapError,
						$elm$json$Json$Decode$errorToString,
						A2($elm$json$Json$Decode$decodeString, decoder, string));
				}));
	});
var $elm$http$Http$Header = F2(
	function (a, b) {
		return {$: 'Header', a: a, b: b};
	});
var $elm$http$Http$header = $elm$http$Http$Header;
var $elm$http$Http$Request = function (a) {
	return {$: 'Request', a: a};
};
var $elm$http$Http$State = F2(
	function (reqs, subs) {
		return {reqs: reqs, subs: subs};
	});
var $elm$http$Http$init = $elm$core$Task$succeed(
	A2($elm$http$Http$State, $elm$core$Dict$empty, _List_Nil));
var $elm$http$Http$updateReqs = F3(
	function (router, cmds, reqs) {
		updateReqs:
		while (true) {
			if (!cmds.b) {
				return $elm$core$Task$succeed(reqs);
			} else {
				var cmd = cmds.a;
				var otherCmds = cmds.b;
				if (cmd.$ === 'Cancel') {
					var tracker = cmd.a;
					var _v2 = A2($elm$core$Dict$get, tracker, reqs);
					if (_v2.$ === 'Nothing') {
						var $temp$router = router,
							$temp$cmds = otherCmds,
							$temp$reqs = reqs;
						router = $temp$router;
						cmds = $temp$cmds;
						reqs = $temp$reqs;
						continue updateReqs;
					} else {
						var pid = _v2.a;
						return A2(
							$elm$core$Task$andThen,
							function (_v3) {
								return A3(
									$elm$http$Http$updateReqs,
									router,
									otherCmds,
									A2($elm$core$Dict$remove, tracker, reqs));
							},
							$elm$core$Process$kill(pid));
					}
				} else {
					var req = cmd.a;
					return A2(
						$elm$core$Task$andThen,
						function (pid) {
							var _v4 = req.tracker;
							if (_v4.$ === 'Nothing') {
								return A3($elm$http$Http$updateReqs, router, otherCmds, reqs);
							} else {
								var tracker = _v4.a;
								return A3(
									$elm$http$Http$updateReqs,
									router,
									otherCmds,
									A3($elm$core$Dict$insert, tracker, pid, reqs));
							}
						},
						$elm$core$Process$spawn(
							A3(
								_Http_toTask,
								router,
								$elm$core$Platform$sendToApp(router),
								req)));
				}
			}
		}
	});
var $elm$http$Http$onEffects = F4(
	function (router, cmds, subs, state) {
		return A2(
			$elm$core$Task$andThen,
			function (reqs) {
				return $elm$core$Task$succeed(
					A2($elm$http$Http$State, reqs, subs));
			},
			A3($elm$http$Http$updateReqs, router, cmds, state.reqs));
	});
var $elm$http$Http$maybeSend = F4(
	function (router, desiredTracker, progress, _v0) {
		var actualTracker = _v0.a;
		var toMsg = _v0.b;
		return _Utils_eq(desiredTracker, actualTracker) ? $elm$core$Maybe$Just(
			A2(
				$elm$core$Platform$sendToApp,
				router,
				toMsg(progress))) : $elm$core$Maybe$Nothing;
	});
var $elm$http$Http$onSelfMsg = F3(
	function (router, _v0, state) {
		var tracker = _v0.a;
		var progress = _v0.b;
		return A2(
			$elm$core$Task$andThen,
			function (_v1) {
				return $elm$core$Task$succeed(state);
			},
			$elm$core$Task$sequence(
				A2(
					$elm$core$List$filterMap,
					A3($elm$http$Http$maybeSend, router, tracker, progress),
					state.subs)));
	});
var $elm$http$Http$Cancel = function (a) {
	return {$: 'Cancel', a: a};
};
var $elm$http$Http$cmdMap = F2(
	function (func, cmd) {
		if (cmd.$ === 'Cancel') {
			var tracker = cmd.a;
			return $elm$http$Http$Cancel(tracker);
		} else {
			var r = cmd.a;
			return $elm$http$Http$Request(
				{
					allowCookiesFromOtherDomains: r.allowCookiesFromOtherDomains,
					body: r.body,
					expect: A2(_Http_mapExpect, func, r.expect),
					headers: r.headers,
					method: r.method,
					timeout: r.timeout,
					tracker: r.tracker,
					url: r.url
				});
		}
	});
var $elm$http$Http$MySub = F2(
	function (a, b) {
		return {$: 'MySub', a: a, b: b};
	});
var $elm$http$Http$subMap = F2(
	function (func, _v0) {
		var tracker = _v0.a;
		var toMsg = _v0.b;
		return A2(
			$elm$http$Http$MySub,
			tracker,
			A2($elm$core$Basics$composeR, toMsg, func));
	});
_Platform_effectManagers['Http'] = _Platform_createManager($elm$http$Http$init, $elm$http$Http$onEffects, $elm$http$Http$onSelfMsg, $elm$http$Http$cmdMap, $elm$http$Http$subMap);
var $elm$http$Http$command = _Platform_leaf('Http');
var $elm$http$Http$subscription = _Platform_leaf('Http');
var $elm$http$Http$request = function (r) {
	return $elm$http$Http$command(
		$elm$http$Http$Request(
			{allowCookiesFromOtherDomains: false, body: r.body, expect: r.expect, headers: r.headers, method: r.method, timeout: r.timeout, tracker: r.tracker, url: r.url}));
};
var $simonh1000$elm_jwt$Jwt$Http$createRequest = F3(
	function (method, token, _v0) {
		var url = _v0.url;
		var body = _v0.body;
		var expect = _v0.expect;
		var options = {
			body: body,
			expect: expect,
			headers: _List_fromArray(
				[
					A2($elm$http$Http$header, 'Authorization', 'Bearer ' + token)
				]),
			method: method,
			timeout: $elm$core$Maybe$Nothing,
			tracker: $elm$core$Maybe$Nothing,
			url: url
		};
		return $elm$http$Http$request(options);
	});
var $elm$http$Http$emptyBody = _Http_emptyBody;
var $simonh1000$elm_jwt$Jwt$Http$get = F2(
	function (token, _v0) {
		var url = _v0.url;
		var expect = _v0.expect;
		return A3(
			$simonh1000$elm_jwt$Jwt$Http$createRequest,
			'GET',
			token,
			{body: $elm$http$Http$emptyBody, expect: expect, url: url});
	});
var $author$project$Main$serverUrl = 'http://localhost:8821';
var $author$project$Main$getCurrent = function (model) {
	var token = function () {
		var _v0 = model.tokenUserId;
		if (_v0.$ === 'Nothing') {
			return A2($author$project$Main$TokenUserId, '', '');
		} else {
			var x = _v0.a;
			return x;
		}
	}();
	var url = A2(
		$elm$core$String$join,
		'/',
		_List_fromArray(
			[$author$project$Main$serverUrl, $author$project$Main$eventAPI, token.user_id]));
	return A2(
		$simonh1000$elm_jwt$Jwt$Http$get,
		token.token,
		{
			expect: A2($elm$http$Http$expectJson, $author$project$Main$GetCurrentResult, $author$project$Main$currentDecoder),
			url: url
		});
};
var $elm$core$Tuple$second = function (_v0) {
	var y = _v0.b;
	return y;
};
var $elm$core$List$sortBy = _List_sortBy;
var $author$project$Main$getEventDateList = function (idMap) {
	return $elm$core$List$reverse(
		A2(
			$elm$core$List$sortBy,
			function (x) {
				return x.b;
			},
			A2(
				$elm$core$List$map,
				function (_v0) {
					var id = _v0.a;
					var t = _v0.b;
					return _Utils_Tuple2(id, t.a);
				},
				$elm$core$Dict$toList(idMap))));
};
var $author$project$Main$GetEventRecordResult = function (a) {
	return {$: 'GetEventRecordResult', a: a};
};
var $elm$json$Json$Decode$fail = _Json_fail;
var $elm_community$json_extra$Json$Decode$Extra$decodeDictFromTuples = F2(
	function (keyDecoder, tuples) {
		if (!tuples.b) {
			return $elm$json$Json$Decode$succeed($elm$core$Dict$empty);
		} else {
			var _v1 = tuples.a;
			var strKey = _v1.a;
			var value = _v1.b;
			var rest = tuples.b;
			var _v2 = A2($elm$json$Json$Decode$decodeString, keyDecoder, strKey);
			if (_v2.$ === 'Ok') {
				var key = _v2.a;
				return A2(
					$elm$json$Json$Decode$andThen,
					A2(
						$elm$core$Basics$composeR,
						A2($elm$core$Dict$insert, key, value),
						$elm$json$Json$Decode$succeed),
					A2($elm_community$json_extra$Json$Decode$Extra$decodeDictFromTuples, keyDecoder, rest));
			} else {
				var error = _v2.a;
				return $elm$json$Json$Decode$fail(
					$elm$json$Json$Decode$errorToString(error));
			}
		}
	});
var $elm$json$Json$Decode$keyValuePairs = _Json_decodeKeyValuePairs;
var $elm_community$json_extra$Json$Decode$Extra$dict2 = F2(
	function (keyDecoder, valueDecoder) {
		return A2(
			$elm$json$Json$Decode$andThen,
			$elm_community$json_extra$Json$Decode$Extra$decodeDictFromTuples(keyDecoder),
			$elm$json$Json$Decode$keyValuePairs(valueDecoder));
	});
var $elm$json$Json$Decode$list = _Json_decodeList;
var $author$project$Main$PlayerResult = F4(
	function (name, score, handicap, income) {
		return {handicap: handicap, income: income, name: name, score: score};
	});
var $elm$json$Json$Decode$map4 = _Json_map4;
var $author$project$Main$playerDecoder = A5(
	$elm$json$Json$Decode$map4,
	$author$project$Main$PlayerResult,
	A2($elm$json$Json$Decode$field, 'name', $elm$json$Json$Decode$string),
	A2($elm$json$Json$Decode$field, 'score', $elm$json$Json$Decode$int),
	A2($elm$json$Json$Decode$field, 'handicap', $elm$json$Json$Decode$int),
	A2($elm$json$Json$Decode$field, 'income', $elm$json$Json$Decode$int));
var $author$project$Main$gameRecordDecoder = $elm$json$Json$Decode$list($author$project$Main$playerDecoder);
var $elm$json$Json$Decode$dict = function (decoder) {
	return A2(
		$elm$json$Json$Decode$map,
		$elm$core$Dict$fromList,
		$elm$json$Json$Decode$keyValuePairs(decoder));
};
var $author$project$Main$GameResult = F2(
	function (score_list, income_list) {
		return {income_list: income_list, score_list: score_list};
	});
var $author$project$Main$gameResultDecoder = A3(
	$elm$json$Json$Decode$map2,
	$author$project$Main$GameResult,
	A2(
		$elm$json$Json$Decode$field,
		'score_list',
		$elm$json$Json$Decode$list($elm$json$Json$Decode$int)),
	A2(
		$elm$json$Json$Decode$field,
		'income_list',
		$elm$json$Json$Decode$list($elm$json$Json$Decode$int)));
var $author$project$Main$playersRecordDecoder = $elm$json$Json$Decode$dict($author$project$Main$gameResultDecoder);
var $author$project$Main$eventRecordDecoder = A3(
	$elm$json$Json$Decode$map2,
	$author$project$Main$EventRecord,
	A2(
		$elm$json$Json$Decode$field,
		'gamesRecord',
		A2($elm_community$json_extra$Json$Decode$Extra$dict2, $elm$json$Json$Decode$int, $author$project$Main$gameRecordDecoder)),
	A2($elm$json$Json$Decode$field, 'playersRecord', $author$project$Main$playersRecordDecoder));
var $author$project$Main$recordScoreAPI = 'scores';
var $author$project$Main$getEventRecord = F2(
	function (model, eventId) {
		var url = A2(
			$elm$core$String$join,
			'/',
			_List_fromArray(
				[$author$project$Main$serverUrl, $author$project$Main$recordScoreAPI, eventId]));
		var token = function () {
			var _v0 = model.tokenUserId;
			if (_v0.$ === 'Nothing') {
				return A2($author$project$Main$TokenUserId, '', '');
			} else {
				var x = _v0.a;
				return x;
			}
		}();
		return A2(
			$simonh1000$elm_jwt$Jwt$Http$get,
			token.token,
			{
				expect: A2($elm$http$Http$expectJson, $author$project$Main$GetEventRecordResult, $author$project$Main$eventRecordDecoder),
				url: url
			});
	});
var $author$project$Main$GetJoinedIdsResult = function (a) {
	return {$: 'GetJoinedIdsResult', a: a};
};
var $author$project$Main$joinedIdsDecoder = $elm$json$Json$Decode$dict(
	A3(
		$elm$json$Json$Decode$map2,
		$elm$core$Tuple$pair,
		A2($elm$json$Json$Decode$index, 0, $elm$json$Json$Decode$string),
		A2(
			$elm$json$Json$Decode$index,
			1,
			$elm$json$Json$Decode$list($elm$json$Json$Decode$int))));
var $author$project$Main$recordAPI = 'record';
var $author$project$Main$getJoinedIds = function (model) {
	var token = function () {
		var _v0 = model.tokenUserId;
		if (_v0.$ === 'Nothing') {
			return A2($author$project$Main$TokenUserId, '', '');
		} else {
			var x = _v0.a;
			return x;
		}
	}();
	var url = A2(
		$elm$core$String$join,
		'/',
		_List_fromArray(
			[$author$project$Main$serverUrl, $author$project$Main$recordAPI, token.user_id]));
	return A2(
		$simonh1000$elm_jwt$Jwt$Http$get,
		token.token,
		{
			expect: A2($elm$http$Http$expectJson, $author$project$Main$GetJoinedIdsResult, $author$project$Main$joinedIdsDecoder),
			url: url
		});
};
var $author$project$Main$GetPlayersResult = function (a) {
	return {$: 'GetPlayersResult', a: a};
};
var $author$project$Main$playersDecoder = $elm$json$Json$Decode$list($elm$json$Json$Decode$string);
var $author$project$Main$getPlayers = function (model) {
	var token = function () {
		var _v0 = model.tokenUserId;
		if (_v0.$ === 'Nothing') {
			return A2($author$project$Main$TokenUserId, '', '');
		} else {
			var x = _v0.a;
			return x;
		}
	}();
	var url = A2(
		$elm$core$String$join,
		'/',
		_List_fromArray(
			[$author$project$Main$serverUrl, $author$project$Main$eventAPI, token.user_id, model.eventId]));
	return A2(
		$simonh1000$elm_jwt$Jwt$Http$get,
		token.token,
		{
			expect: A2($elm$http$Http$expectJson, $author$project$Main$GetPlayersResult, $author$project$Main$playersDecoder),
			url: url
		});
};
var $elm$core$List$drop = F2(
	function (n, list) {
		drop:
		while (true) {
			if (n <= 0) {
				return list;
			} else {
				if (!list.b) {
					return list;
				} else {
					var x = list.a;
					var xs = list.b;
					var $temp$n = n - 1,
						$temp$list = xs;
					n = $temp$n;
					list = $temp$list;
					continue drop;
				}
			}
		}
	});
var $elm$core$List$takeReverse = F3(
	function (n, list, kept) {
		takeReverse:
		while (true) {
			if (n <= 0) {
				return kept;
			} else {
				if (!list.b) {
					return kept;
				} else {
					var x = list.a;
					var xs = list.b;
					var $temp$n = n - 1,
						$temp$list = xs,
						$temp$kept = A2($elm$core$List$cons, x, kept);
					n = $temp$n;
					list = $temp$list;
					kept = $temp$kept;
					continue takeReverse;
				}
			}
		}
	});
var $elm$core$List$takeTailRec = F2(
	function (n, list) {
		return $elm$core$List$reverse(
			A3($elm$core$List$takeReverse, n, list, _List_Nil));
	});
var $elm$core$List$takeFast = F3(
	function (ctr, n, list) {
		if (n <= 0) {
			return _List_Nil;
		} else {
			var _v0 = _Utils_Tuple2(n, list);
			_v0$1:
			while (true) {
				_v0$5:
				while (true) {
					if (!_v0.b.b) {
						return list;
					} else {
						if (_v0.b.b.b) {
							switch (_v0.a) {
								case 1:
									break _v0$1;
								case 2:
									var _v2 = _v0.b;
									var x = _v2.a;
									var _v3 = _v2.b;
									var y = _v3.a;
									return _List_fromArray(
										[x, y]);
								case 3:
									if (_v0.b.b.b.b) {
										var _v4 = _v0.b;
										var x = _v4.a;
										var _v5 = _v4.b;
										var y = _v5.a;
										var _v6 = _v5.b;
										var z = _v6.a;
										return _List_fromArray(
											[x, y, z]);
									} else {
										break _v0$5;
									}
								default:
									if (_v0.b.b.b.b && _v0.b.b.b.b.b) {
										var _v7 = _v0.b;
										var x = _v7.a;
										var _v8 = _v7.b;
										var y = _v8.a;
										var _v9 = _v8.b;
										var z = _v9.a;
										var _v10 = _v9.b;
										var w = _v10.a;
										var tl = _v10.b;
										return (ctr > 1000) ? A2(
											$elm$core$List$cons,
											x,
											A2(
												$elm$core$List$cons,
												y,
												A2(
													$elm$core$List$cons,
													z,
													A2(
														$elm$core$List$cons,
														w,
														A2($elm$core$List$takeTailRec, n - 4, tl))))) : A2(
											$elm$core$List$cons,
											x,
											A2(
												$elm$core$List$cons,
												y,
												A2(
													$elm$core$List$cons,
													z,
													A2(
														$elm$core$List$cons,
														w,
														A3($elm$core$List$takeFast, ctr + 1, n - 4, tl)))));
									} else {
										break _v0$5;
									}
							}
						} else {
							if (_v0.a === 1) {
								break _v0$1;
							} else {
								break _v0$5;
							}
						}
					}
				}
				return list;
			}
			var _v1 = _v0.b;
			var x = _v1.a;
			return _List_fromArray(
				[x]);
		}
	});
var $elm$core$List$take = F2(
	function (n, list) {
		return A3($elm$core$List$takeFast, 0, n, list);
	});
var $elm_community$list_split$List$Split$chunksOfLeft = F2(
	function (k, xs) {
		return (!k) ? _List_fromArray(
			[_List_Nil]) : ((k < 0) ? _List_Nil : ((_Utils_cmp(
			$elm$core$List$length(xs),
			k) > 0) ? A2(
			$elm$core$List$cons,
			A2($elm$core$List$take, k, xs),
			A2(
				$elm_community$list_split$List$Split$chunksOfLeft,
				k,
				A2($elm$core$List$drop, k, xs))) : _List_fromArray(
			[xs])));
	});
var $elm$core$List$filter = F2(
	function (isGood, list) {
		return A3(
			$elm$core$List$foldr,
			F2(
				function (x, xs) {
					return isGood(x) ? A2($elm$core$List$cons, x, xs) : xs;
				}),
			_List_Nil,
			list);
	});
var $elm$core$List$isEmpty = function (xs) {
	if (!xs.b) {
		return true;
	} else {
		return false;
	}
};
var $author$project$Main$getRandomTeamList = function (model) {
	var str = model.inputGameSettings.numTeams;
	var active_list = model.active_players;
	var _v0 = $elm$core$String$toInt(str);
	if (_v0.$ === 'Nothing') {
		return _List_Nil;
	} else {
		var num = _v0.a;
		if ((str !== '') && ((0 < num) && (_Utils_cmp(
			num,
			$elm$core$List$length(active_list)) < 1))) {
			var length = $elm$core$List$length(active_list);
			var quotient = (length / num) | 0;
			var idx = (length - (quotient * num)) * (quotient + 1);
			var lactive = A2($elm$core$List$take, idx, active_list);
			var ractive = A2($elm$core$List$drop, idx, active_list);
			return A2(
				$elm$core$List$filter,
				function (x) {
					return !$elm$core$List$isEmpty(x);
				},
				_Utils_ap(
					A2($elm_community$list_split$List$Split$chunksOfLeft, quotient + 1, lactive),
					A2($elm_community$list_split$List$Split$chunksOfLeft, quotient, ractive)));
		} else {
			return _List_Nil;
		}
	}
};
var $author$project$Main$GetScoreResult = function (a) {
	return {$: 'GetScoreResult', a: a};
};
var $author$project$Main$gameAPI = 'game';
var $elm$json$Json$Decode$map3 = _Json_map3;
var $author$project$Main$triple = F3(
	function (a, b, c) {
		return _Utils_Tuple3(a, b, c);
	});
var $author$project$Main$tuple3Decoder = F3(
	function (dec1, dec2, dec3) {
		return A4(
			$elm$json$Json$Decode$map3,
			$author$project$Main$triple,
			A2($elm$json$Json$Decode$index, 0, dec1),
			A2($elm$json$Json$Decode$index, 1, dec2),
			A2($elm$json$Json$Decode$index, 2, dec3));
	});
var $author$project$Main$scoresDecoder = $elm$json$Json$Decode$list(
	$elm$json$Json$Decode$list(
		A3($author$project$Main$tuple3Decoder, $elm$json$Json$Decode$string, $elm$json$Json$Decode$int, $elm$json$Json$Decode$int)));
var $author$project$Main$getScore = function (model) {
	var token = function () {
		var _v0 = model.tokenUserId;
		if (_v0.$ === 'Nothing') {
			return A2($author$project$Main$TokenUserId, '', '');
		} else {
			var x = _v0.a;
			return x;
		}
	}();
	var url = A2(
		$elm$core$String$join,
		'/',
		_List_fromArray(
			[$author$project$Main$serverUrl, $author$project$Main$gameAPI, token.user_id, model.gameId]));
	return A2(
		$simonh1000$elm_jwt$Jwt$Http$get,
		token.token,
		{
			expect: A2($elm$http$Http$expectJson, $author$project$Main$GetScoreResult, $author$project$Main$scoresDecoder),
			url: url
		});
};
var $author$project$Main$GetScoreRecordResult = function (a) {
	return {$: 'GetScoreRecordResult', a: a};
};
var $author$project$Main$scoreRecordDecoder = $elm$json$Json$Decode$list($elm$json$Json$Decode$int);
var $author$project$Main$getScoreRecord = F2(
	function (model, size) {
		var token = function () {
			var _v0 = model.tokenUserId;
			if (_v0.$ === 'Nothing') {
				return A2($author$project$Main$TokenUserId, '', '');
			} else {
				var x = _v0.a;
				return x;
			}
		}();
		var url = A2(
			$elm$core$String$join,
			'/',
			_List_fromArray(
				[
					$author$project$Main$serverUrl,
					$author$project$Main$recordScoreAPI,
					token.user_id,
					$elm$core$String$fromInt(size)
				]));
		return A2(
			$simonh1000$elm_jwt$Jwt$Http$get,
			token.token,
			{
				expect: A2($elm$http$Http$expectJson, $author$project$Main$GetScoreRecordResult, $author$project$Main$scoreRecordDecoder),
				url: url
			});
	});
var $author$project$Main$GetTeamsResult = function (a) {
	return {$: 'GetTeamsResult', a: a};
};
var $author$project$Main$teamsDecoder = $elm$json$Json$Decode$list(
	$elm$json$Json$Decode$list($elm$json$Json$Decode$string));
var $author$project$Main$getTeams = function (model) {
	var token = function () {
		var _v0 = model.tokenUserId;
		if (_v0.$ === 'Nothing') {
			return A2($author$project$Main$TokenUserId, '', '');
		} else {
			var x = _v0.a;
			return x;
		}
	}();
	var url = A2(
		$elm$core$String$join,
		'/',
		_List_fromArray(
			[$author$project$Main$serverUrl, $author$project$Main$gameAPI, token.user_id]));
	return A2(
		$simonh1000$elm_jwt$Jwt$Http$get,
		token.token,
		{
			expect: A2($elm$http$Http$expectJson, $author$project$Main$GetTeamsResult, $author$project$Main$teamsDecoder),
			url: url
		});
};
var $author$project$Main$GetUserInfoResult = function (a) {
	return {$: 'GetUserInfoResult', a: a};
};
var $elm$http$Http$stringBody = _Http_pair;
var $author$project$Main$userAPI = 'user_info';
var $author$project$Main$userInfoDecoder = A4(
	$elm$json$Json$Decode$map3,
	$author$project$Main$UserInfo,
	A2($elm$json$Json$Decode$field, 'user_id', $elm$json$Json$Decode$string),
	A2($elm$json$Json$Decode$field, 'password', $elm$json$Json$Decode$string),
	A2($elm$json$Json$Decode$field, 'nickname', $elm$json$Json$Decode$string));
var $author$project$Main$getUserInfo = function (model) {
	var token = function () {
		var _v0 = model.tokenUserId;
		if (_v0.$ === 'Nothing') {
			return A2($author$project$Main$TokenUserId, '', '');
		} else {
			var x = _v0.a;
			return x;
		}
	}();
	var url = A2(
		$elm$core$String$join,
		'/',
		_List_fromArray(
			[$author$project$Main$serverUrl, $author$project$Main$userAPI, token.user_id]));
	var body = A2($elm$http$Http$stringBody, 'Access-Control-Allow-Origin', '');
	return A2(
		$simonh1000$elm_jwt$Jwt$Http$get,
		token.token,
		{
			expect: A2($elm$http$Http$expectJson, $author$project$Main$GetUserInfoResult, $author$project$Main$userInfoDecoder),
			url: url
		});
};
var $elm$core$List$head = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return $elm$core$Maybe$Just(x);
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $elm$browser$Browser$Navigation$replaceUrl = _Browser_replaceUrl;
var $author$project$Main$leaveGamePage = function (model) {
	return _Utils_Tuple2(
		_Utils_update(
			model,
			{active_players: _List_Nil, gameState: $author$project$Main$Nonparticipation, myPageOpen: true, players: $elm$core$Dict$empty, teams: _List_Nil}),
		$elm$core$Platform$Cmd$batch(
			_List_fromArray(
				[
					$author$project$Main$getPlayers(model),
					A2($elm$browser$Browser$Navigation$replaceUrl, model.key, '?')
				])));
};
var $elm$core$Basics$min = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) < 0) ? x : y;
	});
var $elm$core$Platform$Cmd$none = $elm$core$Platform$Cmd$batch(_List_Nil);
var $author$project$Main$portSetToken = _Platform_outgoingPort(
	'portSetToken',
	function ($) {
		var a = $.a;
		var b = $.b;
		return A2(
			$elm$json$Json$Encode$list,
			$elm$core$Basics$identity,
			_List_fromArray(
				[
					$elm$json$Json$Encode$string(a),
					$elm$json$Json$Encode$string(b)
				]));
	});
var $author$project$Main$ApplyTeamingResult = function (a) {
	return {$: 'ApplyTeamingResult', a: a};
};
var $author$project$Main$expectString = function (toMsg) {
	return A2(
		$elm$http$Http$expectStringResponse,
		toMsg,
		function (response) {
			switch (response.$) {
				case 'BadUrl_':
					var url = response.a;
					return $elm$core$Result$Err(
						$elm$http$Http$BadUrl(url));
				case 'Timeout_':
					return $elm$core$Result$Err($elm$http$Http$Timeout);
				case 'NetworkError_':
					return $elm$core$Result$Err($elm$http$Http$NetworkError);
				case 'BadStatus_':
					var metadata = response.a;
					var body = response.b;
					return $elm$core$Result$Err(
						$elm$http$Http$BadBody(body + (' \n' + metadata.statusText)));
				default:
					var metadata = response.a;
					var body = response.b;
					return $elm$core$Result$Ok(
						A2(
							$elm$core$String$filter,
							function (c) {
								return !_Utils_eq(
									c,
									_Utils_chr('\"'));
							},
							body));
			}
		});
};
var $elm$http$Http$jsonBody = function (value) {
	return A2(
		_Http_pair,
		'application/json',
		A2($elm$json$Json$Encode$encode, 0, value));
};
var $simonh1000$elm_jwt$Jwt$Http$post = $simonh1000$elm_jwt$Jwt$Http$createRequest('POST');
var $author$project$Main$teamListJson = function (team_list) {
	return A2(
		$elm$json$Json$Encode$list,
		$elm$json$Json$Encode$list($elm$json$Json$Encode$string),
		team_list);
};
var $author$project$Main$postApplyTeaming = F2(
	function (model, team_list) {
		var token = function () {
			var _v0 = model.tokenUserId;
			if (_v0.$ === 'Nothing') {
				return A2($author$project$Main$TokenUserId, '', '');
			} else {
				var x = _v0.a;
				return x;
			}
		}();
		var url = A2(
			$elm$core$String$join,
			'/',
			_List_fromArray(
				[$author$project$Main$serverUrl, $author$project$Main$gameAPI, token.user_id]));
		var body = $elm$http$Http$jsonBody(
			$author$project$Main$teamListJson(team_list));
		return A2(
			$simonh1000$elm_jwt$Jwt$Http$post,
			token.token,
			{
				body: body,
				expect: $author$project$Main$expectString($author$project$Main$ApplyTeamingResult),
				url: url
			});
	});
var $author$project$Main$CreateGameResult = function (a) {
	return {$: 'CreateGameResult', a: a};
};
var $author$project$Main$postCreateGame = function (model) {
	var token = function () {
		var _v0 = model.tokenUserId;
		if (_v0.$ === 'Nothing') {
			return A2($author$project$Main$TokenUserId, '', '');
		} else {
			var x = _v0.a;
			return x;
		}
	}();
	var url = A2(
		$elm$core$String$join,
		'/',
		_List_fromArray(
			[$author$project$Main$serverUrl, $author$project$Main$eventAPI, token.user_id]));
	var body = A2($elm$http$Http$stringBody, 'Access-Control-Allow-Origin', '');
	return A2(
		$simonh1000$elm_jwt$Jwt$Http$post,
		token.token,
		{
			body: body,
			expect: $author$project$Main$expectString($author$project$Main$CreateGameResult),
			url: url
		});
};
var $author$project$Main$FinishEventResult = function (a) {
	return {$: 'FinishEventResult', a: a};
};
var $author$project$Main$postFinishEvent = function (model) {
	var token = function () {
		var _v0 = model.tokenUserId;
		if (_v0.$ === 'Nothing') {
			return A2($author$project$Main$TokenUserId, '', '');
		} else {
			var x = _v0.a;
			return x;
		}
	}();
	var url = A2(
		$elm$core$String$join,
		'/',
		_List_fromArray(
			[$author$project$Main$serverUrl, $author$project$Main$gameAPI, token.user_id, model.eventId]));
	var body = A2($elm$http$Http$stringBody, 'Access-Control-Allow-Origin', '');
	return A2(
		$simonh1000$elm_jwt$Jwt$Http$post,
		token.token,
		{
			body: body,
			expect: A2($elm$http$Http$expectJson, $author$project$Main$FinishEventResult, $author$project$Main$playersRecordDecoder),
			url: url
		});
};
var $author$project$Main$FinishGameResult = function (a) {
	return {$: 'FinishGameResult', a: a};
};
var $elm$json$Json$Encode$int = _Json_wrap;
var $author$project$Main$tuple3Encoder = F4(
	function (enc1, enc2, enc3, _v0) {
		var val1 = _v0.a;
		var val2 = _v0.b;
		var val3 = _v0.c;
		return A2(
			$elm$json$Json$Encode$list,
			$elm$core$Basics$identity,
			_List_fromArray(
				[
					enc1(val1),
					enc2(val2),
					enc3(val3)
				]));
	});
var $author$project$Main$scoreListJson = $elm$json$Json$Encode$list(
	$elm$json$Json$Encode$list(
		A3($author$project$Main$tuple3Encoder, $elm$json$Json$Encode$string, $elm$json$Json$Encode$int, $elm$json$Json$Encode$int)));
var $author$project$Main$postFinishGame = F2(
	function (model, score_list) {
		var token = function () {
			var _v0 = model.tokenUserId;
			if (_v0.$ === 'Nothing') {
				return A2($author$project$Main$TokenUserId, '', '');
			} else {
				var x = _v0.a;
				return x;
			}
		}();
		var url = A2(
			$elm$core$String$join,
			'/',
			_List_fromArray(
				[$author$project$Main$serverUrl, $author$project$Main$gameAPI, token.user_id, model.gameId]));
		var body = $elm$http$Http$jsonBody(
			$author$project$Main$scoreListJson(score_list));
		return A2(
			$simonh1000$elm_jwt$Jwt$Http$post,
			token.token,
			{
				body: body,
				expect: A2($elm$http$Http$expectJson, $author$project$Main$FinishGameResult, $author$project$Main$gameRecordDecoder),
				url: url
			});
	});
var $author$project$Main$JoinGameResult = function (a) {
	return {$: 'JoinGameResult', a: a};
};
var $elm$core$String$right = F2(
	function (n, string) {
		return (n < 1) ? '' : A3(
			$elm$core$String$slice,
			-n,
			$elm$core$String$length(string),
			string);
	});
var $author$project$Main$postJoinGame = function (model) {
	var val = A2($elm$core$String$right, 36, model.inputEvent);
	var token = function () {
		var _v0 = model.tokenUserId;
		if (_v0.$ === 'Nothing') {
			return A2($author$project$Main$TokenUserId, '', '');
		} else {
			var x = _v0.a;
			return x;
		}
	}();
	var url = A2(
		$elm$core$String$join,
		'/',
		_List_fromArray(
			[$author$project$Main$serverUrl, $author$project$Main$eventAPI, token.user_id, model.eventId]));
	var body = A2($elm$http$Http$stringBody, 'Access-Control-Allow-Origin', '');
	return A2(
		$simonh1000$elm_jwt$Jwt$Http$post,
		token.token,
		{
			body: body,
			expect: $author$project$Main$expectString($author$project$Main$JoinGameResult),
			url: url
		});
};
var $author$project$Main$StartGameResult = function (a) {
	return {$: 'StartGameResult', a: a};
};
var $author$project$Main$postStartGame = function (model) {
	var token = function () {
		var _v0 = model.tokenUserId;
		if (_v0.$ === 'Nothing') {
			return A2($author$project$Main$TokenUserId, '', '');
		} else {
			var x = _v0.a;
			return x;
		}
	}();
	var url = A2(
		$elm$core$String$join,
		'/',
		_List_fromArray(
			[$author$project$Main$serverUrl, $author$project$Main$gameAPI, token.user_id, model.inputGameSettings.minUnit, model.inputGameSettings.rate]));
	var body = A2($elm$http$Http$stringBody, 'Access-Control-Allow-Origin', '');
	return A2(
		$simonh1000$elm_jwt$Jwt$Http$post,
		token.token,
		{
			body: body,
			expect: $author$project$Main$expectString($author$project$Main$StartGameResult),
			url: url
		});
};
var $author$project$Main$SetScoreResult = function (a) {
	return {$: 'SetScoreResult', a: a};
};
var $simonh1000$elm_jwt$Jwt$Http$put = $simonh1000$elm_jwt$Jwt$Http$createRequest('PUT');
var $author$project$Main$putScore = F5(
	function (model, teamId, nickname, score, handicap) {
		var url = A2(
			$elm$core$String$join,
			'/',
			_List_fromArray(
				[
					$author$project$Main$serverUrl,
					$author$project$Main$gameAPI,
					model.eventId,
					model.gameId,
					$elm$core$String$fromInt(teamId),
					nickname,
					score,
					$elm$core$String$fromInt(handicap)
				]));
		var token = function () {
			var _v0 = model.tokenUserId;
			if (_v0.$ === 'Nothing') {
				return A2($author$project$Main$TokenUserId, '', '');
			} else {
				var x = _v0.a;
				return x;
			}
		}();
		var body = A2($elm$http$Http$stringBody, '', '');
		return A2(
			$simonh1000$elm_jwt$Jwt$Http$put,
			token.token,
			{
				body: body,
				expect: $author$project$Main$expectString($author$project$Main$SetScoreResult),
				url: url
			});
	});
var $author$project$Main$UpdateUserInfoResult = function (a) {
	return {$: 'UpdateUserInfoResult', a: a};
};
var $elm$json$Json$Encode$object = function (pairs) {
	return _Json_wrap(
		A3(
			$elm$core$List$foldl,
			F2(
				function (_v0, obj) {
					var k = _v0.a;
					var v = _v0.b;
					return A3(_Json_addField, k, v, obj);
				}),
			_Json_emptyObject(_Utils_Tuple0),
			pairs));
};
var $author$project$Main$userJson = function (model) {
	return $elm$json$Json$Encode$object(
		_List_fromArray(
			[
				_Utils_Tuple2(
				'user_id',
				$elm$json$Json$Encode$string(model.inputCred.user_id)),
				_Utils_Tuple2(
				'password',
				$elm$json$Json$Encode$string(model.inputCred.password)),
				_Utils_Tuple2(
				'nickname',
				$elm$json$Json$Encode$string(model.inputCred.nickname))
			]));
};
var $author$project$Main$putUserInfo = function (model) {
	var token = function () {
		var _v0 = model.tokenUserId;
		if (_v0.$ === 'Nothing') {
			return A2($author$project$Main$TokenUserId, '', '');
		} else {
			var x = _v0.a;
			return x;
		}
	}();
	var url = A2(
		$elm$core$String$join,
		'/',
		_List_fromArray(
			[$author$project$Main$serverUrl, $author$project$Main$userAPI, token.user_id]));
	var body = $elm$http$Http$jsonBody(
		$author$project$Main$userJson(model));
	return A2(
		$simonh1000$elm_jwt$Jwt$Http$put,
		token.token,
		{
			body: body,
			expect: $author$project$Main$expectString($author$project$Main$UpdateUserInfoResult),
			url: url
		});
};
var $elm$browser$Browser$Navigation$reloadAndSkipCache = _Browser_reload(true);
var $elm$core$Maybe$withDefault = F2(
	function (_default, maybe) {
		if (maybe.$ === 'Just') {
			var value = maybe.a;
			return value;
		} else {
			return _default;
		}
	});
var $author$project$Main$scoresFromPlayers = F2(
	function (players_dict, teams) {
		var scoreFromName = F2(
			function (p, name) {
				var _v0 = A2($elm$core$Dict$get, name, p);
				if (_v0.$ === 'Nothing') {
					return _Utils_Tuple3(name, 0, 0);
				} else {
					var player = _v0.a;
					return _Utils_Tuple3(
						name,
						A2(
							$elm$core$Maybe$withDefault,
							0,
							$elm$core$String$toInt(player.score)),
						player.handicap);
				}
			});
		var scoreFromPlayers = F2(
			function (players, team) {
				return A2(
					$elm$core$List$map,
					scoreFromName(players),
					team);
			});
		return A2(
			$elm$core$List$map,
			function (x) {
				return A2(scoreFromPlayers, players_dict, x);
			},
			teams);
	});
var $elm$browser$Browser$Dom$setViewport = _Browser_setViewport;
var $elm$core$Bitwise$xor = _Bitwise_xor;
var $elm$random$Random$peel = function (_v0) {
	var state = _v0.a;
	var word = (state ^ (state >>> ((state >>> 28) + 4))) * 277803737;
	return ((word >>> 22) ^ word) >>> 0;
};
var $elm$random$Random$int = F2(
	function (a, b) {
		return $elm$random$Random$Generator(
			function (seed0) {
				var _v0 = (_Utils_cmp(a, b) < 0) ? _Utils_Tuple2(a, b) : _Utils_Tuple2(b, a);
				var lo = _v0.a;
				var hi = _v0.b;
				var range = (hi - lo) + 1;
				if (!((range - 1) & range)) {
					return _Utils_Tuple2(
						(((range - 1) & $elm$random$Random$peel(seed0)) >>> 0) + lo,
						$elm$random$Random$next(seed0));
				} else {
					var threshhold = (((-range) >>> 0) % range) >>> 0;
					var accountForBias = function (seed) {
						accountForBias:
						while (true) {
							var x = $elm$random$Random$peel(seed);
							var seedN = $elm$random$Random$next(seed);
							if (_Utils_cmp(x, threshhold) < 0) {
								var $temp$seed = seedN;
								seed = $temp$seed;
								continue accountForBias;
							} else {
								return _Utils_Tuple2((x % range) + lo, seedN);
							}
						}
					};
					return accountForBias(seed0);
				}
			});
	});
var $elm$random$Random$maxInt = 2147483647;
var $elm$random$Random$minInt = -2147483648;
var $elm_community$random_extra$Random$List$anyInt = A2($elm$random$Random$int, $elm$random$Random$minInt, $elm$random$Random$maxInt);
var $elm$random$Random$map3 = F4(
	function (func, _v0, _v1, _v2) {
		var genA = _v0.a;
		var genB = _v1.a;
		var genC = _v2.a;
		return $elm$random$Random$Generator(
			function (seed0) {
				var _v3 = genA(seed0);
				var a = _v3.a;
				var seed1 = _v3.b;
				var _v4 = genB(seed1);
				var b = _v4.a;
				var seed2 = _v4.b;
				var _v5 = genC(seed2);
				var c = _v5.a;
				var seed3 = _v5.b;
				return _Utils_Tuple2(
					A3(func, a, b, c),
					seed3);
			});
	});
var $elm$random$Random$independentSeed = $elm$random$Random$Generator(
	function (seed0) {
		var makeIndependentSeed = F3(
			function (state, b, c) {
				return $elm$random$Random$next(
					A2($elm$random$Random$Seed, state, (1 | (b ^ c)) >>> 0));
			});
		var gen = A2($elm$random$Random$int, 0, 4294967295);
		return A2(
			$elm$random$Random$step,
			A4($elm$random$Random$map3, makeIndependentSeed, gen, gen, gen),
			seed0);
	});
var $elm_community$random_extra$Random$List$shuffle = function (list) {
	return A2(
		$elm$random$Random$map,
		function (independentSeed) {
			return A2(
				$elm$core$List$map,
				$elm$core$Tuple$first,
				A2(
					$elm$core$List$sortBy,
					$elm$core$Tuple$second,
					A3(
						$elm$core$List$foldl,
						F2(
							function (item, _v0) {
								var acc = _v0.a;
								var seed = _v0.b;
								var _v1 = A2($elm$random$Random$step, $elm_community$random_extra$Random$List$anyInt, seed);
								var tag = _v1.a;
								var nextSeed = _v1.b;
								return _Utils_Tuple2(
									A2(
										$elm$core$List$cons,
										_Utils_Tuple2(item, tag),
										acc),
									nextSeed);
							}),
						_Utils_Tuple2(_List_Nil, independentSeed),
						list).a));
		},
		$elm$random$Random$independentSeed);
};
var $elm$core$Dict$sizeHelp = F2(
	function (n, dict) {
		sizeHelp:
		while (true) {
			if (dict.$ === 'RBEmpty_elm_builtin') {
				return n;
			} else {
				var left = dict.d;
				var right = dict.e;
				var $temp$n = A2($elm$core$Dict$sizeHelp, n + 1, right),
					$temp$dict = left;
				n = $temp$n;
				dict = $temp$dict;
				continue sizeHelp;
			}
		}
	});
var $elm$core$Dict$size = function (dict) {
	return A2($elm$core$Dict$sizeHelp, 0, dict);
};
var $author$project$Main$LoginResult = function (a) {
	return {$: 'LoginResult', a: a};
};
var $author$project$Main$crdentialJson = function (model) {
	return $elm$json$Json$Encode$object(
		_List_fromArray(
			[
				_Utils_Tuple2(
				'login_id',
				$elm$json$Json$Encode$string(model.inputCred.user_id)),
				_Utils_Tuple2(
				'login_password',
				$elm$json$Json$Encode$string(model.inputCred.password))
			]));
};
var $elm$http$Http$post = function (r) {
	return $elm$http$Http$request(
		{body: r.body, expect: r.expect, headers: _List_Nil, method: 'POST', timeout: $elm$core$Maybe$Nothing, tracker: $elm$core$Maybe$Nothing, url: r.url});
};
var $author$project$Main$submitCredentials = function (model) {
	var url = A2(
		$elm$core$String$join,
		'/',
		_List_fromArray(
			[$author$project$Main$serverUrl, $author$project$Main$userAPI]));
	var body = $elm$http$Http$jsonBody(
		$author$project$Main$crdentialJson(model));
	return $elm$http$Http$post(
		{
			body: body,
			expect: $author$project$Main$expectString($author$project$Main$LoginResult),
			url: url
		});
};
var $author$project$Main$RegisterResult = function (a) {
	return {$: 'RegisterResult', a: a};
};
var $elm$url$Url$Builder$toQueryPair = function (_v0) {
	var key = _v0.a;
	var value = _v0.b;
	return key + ('=' + value);
};
var $elm$url$Url$Builder$toQuery = function (parameters) {
	if (!parameters.b) {
		return '';
	} else {
		return '?' + A2(
			$elm$core$String$join,
			'&',
			A2($elm$core$List$map, $elm$url$Url$Builder$toQueryPair, parameters));
	}
};
var $elm$url$Url$Builder$crossOrigin = F3(
	function (prePath, pathSegments, parameters) {
		return prePath + ('/' + (A2($elm$core$String$join, '/', pathSegments) + $elm$url$Url$Builder$toQuery(parameters)));
	});
var $jzxhuang$http_extras$Http$Detailed$BadBody = F3(
	function (a, b, c) {
		return {$: 'BadBody', a: a, b: b, c: c};
	});
var $jzxhuang$http_extras$Http$Detailed$BadStatus = F2(
	function (a, b) {
		return {$: 'BadStatus', a: a, b: b};
	});
var $jzxhuang$http_extras$Http$Detailed$BadUrl = function (a) {
	return {$: 'BadUrl', a: a};
};
var $jzxhuang$http_extras$Http$Detailed$NetworkError = {$: 'NetworkError'};
var $jzxhuang$http_extras$Http$Detailed$Timeout = {$: 'Timeout'};
var $jzxhuang$http_extras$Http$Detailed$resolve = F2(
	function (toResult, response) {
		switch (response.$) {
			case 'BadUrl_':
				var url = response.a;
				return $elm$core$Result$Err(
					$jzxhuang$http_extras$Http$Detailed$BadUrl(url));
			case 'Timeout_':
				return $elm$core$Result$Err($jzxhuang$http_extras$Http$Detailed$Timeout);
			case 'NetworkError_':
				return $elm$core$Result$Err($jzxhuang$http_extras$Http$Detailed$NetworkError);
			case 'BadStatus_':
				var metadata = response.a;
				var body = response.b;
				return $elm$core$Result$Err(
					A2($jzxhuang$http_extras$Http$Detailed$BadStatus, metadata, body));
			default:
				var metadata = response.a;
				var body = response.b;
				return A2(
					$elm$core$Result$mapError,
					A2($jzxhuang$http_extras$Http$Detailed$BadBody, metadata, body),
					toResult(
						_Utils_Tuple2(metadata, body)));
		}
	});
var $jzxhuang$http_extras$Http$Detailed$responseToJson = F2(
	function (decoder, responseString) {
		return A2(
			$jzxhuang$http_extras$Http$Detailed$resolve,
			function (_v0) {
				var metadata = _v0.a;
				var body = _v0.b;
				return A2(
					$elm$core$Result$mapError,
					$elm$json$Json$Decode$errorToString,
					A2(
						$elm$json$Json$Decode$decodeString,
						A2(
							$elm$json$Json$Decode$map,
							function (res) {
								return _Utils_Tuple2(metadata, res);
							},
							decoder),
						body));
			},
			responseString);
	});
var $jzxhuang$http_extras$Http$Detailed$expectJson = F2(
	function (toMsg, decoder) {
		return A2(
			$elm$http$Http$expectStringResponse,
			toMsg,
			$jzxhuang$http_extras$Http$Detailed$responseToJson(decoder));
	});
var $author$project$Main$submitRegister = function (model) {
	var params = A2(
		$elm$core$List$filterMap,
		$elm$core$Basics$identity,
		$elm$core$List$concat(_List_Nil));
	var body = $elm$http$Http$jsonBody(
		$author$project$Main$userJson(model));
	return $elm$http$Http$request(
		{
			body: body,
			expect: A2($jzxhuang$http_extras$Http$Detailed$expectJson, $author$project$Main$RegisterResult, $author$project$Main$userInfoDecoder),
			headers: _List_Nil,
			method: 'POST',
			timeout: $elm$core$Maybe$Nothing,
			tracker: $elm$core$Maybe$Nothing,
			url: A3(
				$elm$url$Url$Builder$crossOrigin,
				$author$project$Main$serverUrl,
				_List_fromArray(
					[$author$project$Main$userAPI, model.inputCred.user_id]),
				params)
		});
};
var $elm$regex$Regex$Match = F4(
	function (match, index, number, submatches) {
		return {index: index, match: match, number: number, submatches: submatches};
	});
var $elm$regex$Regex$fromStringWith = _Regex_fromStringWith;
var $elm$regex$Regex$fromString = function (string) {
	return A2(
		$elm$regex$Regex$fromStringWith,
		{caseInsensitive: false, multiline: false},
		string);
};
var $elm$regex$Regex$replace = _Regex_replaceAtMost(_Regex_infinity);
var $author$project$Main$validUserId = function (rawString) {
	var _v0 = $elm$regex$Regex$fromString('^[-0-9a-zA-Z_.]+$');
	if (_v0.$ === 'Nothing') {
		return false;
	} else {
		var regex = _v0.a;
		return $elm$core$List$isEmpty(
			$elm$core$String$toList(
				A3(
					$elm$regex$Regex$replace,
					regex,
					function (_v1) {
						return '';
					},
					rawString)));
	}
};
var $author$project$Main$update = F2(
	function (msg, model) {
		update:
		while (true) {
			switch (msg.$) {
				case 'LinkClicked':
					var urlRequest = msg.a;
					if (urlRequest.$ === 'Internal') {
						var url = urlRequest.a;
						return _Utils_Tuple2(
							model,
							A2(
								$elm$browser$Browser$Navigation$replaceUrl,
								model.key,
								$elm$url$Url$toString(url)));
					} else {
						var href = urlRequest.a;
						return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
					}
				case 'UrlChanged':
					var url = msg.a;
					var _v2 = model.tokenUserId;
					if (_v2.$ === 'Just') {
						var tn = _v2.a;
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{url: url}),
							$elm$core$Platform$Cmd$none);
					} else {
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{url: url}),
							$elm$core$Platform$Cmd$none);
					}
				case 'FormInput':
					var inputId = msg.a;
					var val = msg.b;
					switch (inputId.$) {
						case 'Fuser_id':
							if ($author$project$Main$validUserId(val)) {
								var oldCred = model.inputCred;
								var newCred = _Utils_update(
									oldCred,
									{user_id: val});
								return _Utils_Tuple2(
									_Utils_update(
										model,
										{inputCred: newCred}),
									$elm$core$Platform$Cmd$none);
							} else {
								return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
							}
						case 'Fpass':
							if ($author$project$Main$validUserId(val)) {
								var oldCred = model.inputCred;
								var newCred = _Utils_update(
									oldCred,
									{password: val});
								return _Utils_Tuple2(
									_Utils_update(
										model,
										{inputCred: newCred}),
									$elm$core$Platform$Cmd$none);
							} else {
								return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
							}
						case 'Fpass2':
							var oldCred = model.inputCred;
							var newCred = _Utils_update(
								oldCred,
								{password2: val});
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{inputCred: newCred}),
								$elm$core$Platform$Cmd$none);
						case 'Fnickname':
							var oldCred = model.inputCred;
							var newCred = _Utils_update(
								oldCred,
								{nickname: val});
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{inputCred: newCred}),
								$elm$core$Platform$Cmd$none);
						case 'Fevent_id':
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{inputEvent: val}),
								$elm$core$Platform$Cmd$none);
						case 'Fnum_teams':
							var oldSettings = model.inputGameSettings;
							var newSettings = _Utils_update(
								oldSettings,
								{numTeams: val});
							if (val === '') {
								return _Utils_Tuple2(
									_Utils_update(
										model,
										{inputGameSettings: newSettings}),
									$elm$core$Platform$Cmd$none);
							} else {
								var _v4 = $elm$core$String$toInt(val);
								if (_v4.$ === 'Nothing') {
									return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
								} else {
									var num = _v4.a;
									return ((0 < num) && (_Utils_cmp(
										num,
										$elm$core$Dict$size(model.players)) < 1)) ? _Utils_Tuple2(
										_Utils_update(
											model,
											{inputGameSettings: newSettings}),
										$elm$core$Platform$Cmd$none) : _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
								}
							}
						case 'Fmin_unit':
							var oldSettings = model.inputGameSettings;
							var newSettings = _Utils_update(
								oldSettings,
								{minUnit: val});
							var _v5 = $elm$core$String$toInt(val);
							if (_v5.$ === 'Nothing') {
								return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
							} else {
								var num = _v5.a;
								return (0 < num) ? _Utils_Tuple2(
									_Utils_update(
										model,
										{inputGameSettings: newSettings}),
									$elm$core$Platform$Cmd$none) : _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
							}
						case 'Frate':
							var oldSettings = model.inputGameSettings;
							var newSettings = _Utils_update(
								oldSettings,
								{rate: val});
							var _v6 = $elm$core$String$toInt(val);
							if (_v6.$ === 'Nothing') {
								return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
							} else {
								var num = _v6.a;
								return (0 <= num) ? _Utils_Tuple2(
									_Utils_update(
										model,
										{inputGameSettings: newSettings}),
									$elm$core$Platform$Cmd$none) : _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
							}
						default:
							var oldParam = model.inputRecordParam;
							var newParam = _Utils_update(
								oldParam,
								{scoreSize: val});
							if (val === '') {
								return _Utils_Tuple2(
									_Utils_update(
										model,
										{inputRecordParam: newParam}),
									$elm$core$Platform$Cmd$none);
							} else {
								var _v7 = $elm$core$String$toInt(val);
								if (_v7.$ === 'Nothing') {
									return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
								} else {
									var num = _v7.a;
									return (_Utils_cmp(
										$elm$core$List$length(model.scoreRecord),
										num) < 0) ? _Utils_Tuple2(
										_Utils_update(
											model,
											{inputRecordParam: newParam}),
										$elm$core$Platform$Cmd$batch(
											_List_fromArray(
												[
													$author$project$Main$getJoinedIds(model),
													A2($author$project$Main$getScoreRecord, model, num)
												]))) : ((0 <= num) ? _Utils_Tuple2(
										_Utils_update(
											model,
											{inputRecordParam: newParam}),
										$elm$core$Platform$Cmd$none) : _Utils_Tuple2(model, $elm$core$Platform$Cmd$none));
								}
							}
					}
				case 'FormScoreInput':
					var inputId = msg.a;
					var idx = msg.b;
					var name = msg.c;
					var val = msg.d;
					if (inputId.$ === 'Fscore') {
						var _v9 = A2($elm$core$Dict$get, name, model.players);
						if (_v9.$ === 'Nothing') {
							return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
						} else {
							var player = _v9.a;
							var newPlayers = A3(
								$elm$core$Dict$insert,
								name,
								_Utils_update(
									player,
									{score: val}),
								model.players);
							if (val === '') {
								return _Utils_Tuple2(
									_Utils_update(
										model,
										{players: newPlayers}),
									$elm$core$Platform$Cmd$none);
							} else {
								var _v10 = $elm$core$String$toInt(val);
								if (_v10.$ === 'Nothing') {
									return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
								} else {
									var num = _v10.a;
									return ((0 <= num) && (num <= 300)) ? ((!player.typing) ? _Utils_Tuple2(
										_Utils_update(
											model,
											{players: newPlayers}),
										$elm$core$Platform$Cmd$none) : _Utils_Tuple2(
										_Utils_update(
											model,
											{players: newPlayers}),
										A5($author$project$Main$putScore, model, idx, name, val, player.handicap))) : _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
								}
							}
						}
					} else {
						var _v11 = A2($elm$core$Dict$get, name, model.players);
						if (_v11.$ === 'Nothing') {
							return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
						} else {
							var player = _v11.a;
							var handicap = A2(
								$elm$core$Maybe$withDefault,
								0,
								$elm$core$String$toInt(val));
							var newPlayers = A3(
								$elm$core$Dict$insert,
								name,
								_Utils_update(
									player,
									{handicap: handicap}),
								model.players);
							return ((0 <= handicap) && (handicap < 300)) ? ((!player.typing) ? _Utils_Tuple2(
								_Utils_update(
									model,
									{players: newPlayers}),
								$elm$core$Platform$Cmd$none) : _Utils_Tuple2(
								_Utils_update(
									model,
									{players: newPlayers}),
								A5($author$project$Main$putScore, model, idx, name, player.score, handicap))) : _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
						}
					}
				case 'FormScoreBlur':
					var inputId = msg.a;
					var idx = msg.b;
					var name = msg.c;
					var _v12 = A2($elm$core$Dict$get, name, model.players);
					if (_v12.$ === 'Nothing') {
						return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
					} else {
						var player = _v12.a;
						var newPlayers = A3(
							$elm$core$Dict$insert,
							name,
							_Utils_update(
								player,
								{typing: false}),
							model.players);
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{players: newPlayers}),
							A5($author$project$Main$putScore, model, idx, name, player.score, player.handicap));
					}
				case 'FormScoreFocus':
					var inputId = msg.a;
					var idx = msg.b;
					var name = msg.c;
					var _v13 = A2($elm$core$Dict$get, name, model.players);
					if (_v13.$ === 'Nothing') {
						return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
					} else {
						var player = _v13.a;
						var newPlayers = A3(
							$elm$core$Dict$insert,
							name,
							_Utils_update(
								player,
								{typing: true}),
							model.players);
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{players: newPlayers}),
							$elm$core$Platform$Cmd$none);
					}
				case 'FormEventSelect':
					var eventId = msg.a;
					var oldParam = model.inputRecordParam;
					var newParam = _Utils_update(
						oldParam,
						{eventId: eventId, gameId: 'Total'});
					return _Utils_eq(model.inputRecordParam.eventId, eventId) ? _Utils_Tuple2(
						_Utils_update(
							model,
							{inputRecordParam: newParam}),
						$elm$core$Platform$Cmd$none) : _Utils_Tuple2(
						_Utils_update(
							model,
							{inputRecordParam: newParam}),
						A2($author$project$Main$getEventRecord, model, eventId));
				case 'FormGameSelect':
					var gameId = msg.a;
					var oldParam = model.inputRecordParam;
					var newParam = _Utils_update(
						oldParam,
						{gameId: gameId});
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{inputRecordParam: newParam}),
						$elm$core$Platform$Cmd$none);
				case 'ToggleBreak':
					var name = msg.a;
					var newPlayers = function () {
						var _v14 = A2($elm$core$Dict$get, name, model.players);
						if (_v14.$ === 'Nothing') {
							return model.players;
						} else {
							var x = _v14.a;
							return A3(
								$elm$core$Dict$insert,
								name,
								_Utils_update(
									x,
									{_break: !x._break}),
								model.players);
						}
					}();
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{players: newPlayers}),
						$elm$core$Platform$Cmd$none);
				case 'ToggleRegister':
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{userRegister: !model.userRegister}),
						$elm$core$Platform$Cmd$none);
				case 'Login':
					return _Utils_Tuple2(
						model,
						$author$project$Main$submitCredentials(model));
				case 'LoginResult':
					var result = msg.a;
					if (result.$ === 'Ok') {
						var tn = result.a;
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									loginStatus: $author$project$Main$LoginSuccess,
									statusReason: '',
									tokenUserId: $elm$core$Maybe$Just(
										A2($author$project$Main$TokenUserId, tn, model.inputCred.user_id))
								}),
							$author$project$Main$portSetToken(
								_Utils_Tuple2(tn, model.inputCred.user_id)));
					} else {
						var err = result.a;
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									loginStatus: $author$project$Main$LoginFail,
									statusReason: $author$project$Main$errToString(err)
								}),
							$elm$core$Platform$Cmd$none);
					}
				case 'CreateGame':
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{eventId: 'starting', statusReason: ''}),
						$author$project$Main$postCreateGame(model));
				case 'CreateGameResult':
					var result = msg.a;
					if (result.$ === 'Ok') {
						var val = result.a;
						var event_id = A2(
							$elm$core$String$filter,
							function (c) {
								return !_Utils_eq(
									c,
									_Utils_chr('\"'));
							},
							val);
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{eventId: event_id, gameState: $author$project$Main$Teaming, inputEvent: event_id, statusReason: ''}),
							$elm$core$Platform$Cmd$batch(
								_List_fromArray(
									[
										$author$project$Main$getPlayers(
										_Utils_update(
											model,
											{eventId: event_id})),
										A2($elm$browser$Browser$Navigation$replaceUrl, model.key, '?event_id=' + event_id)
									])));
					} else {
						var err = result.a;
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									statusReason: $author$project$Main$errToString(err)
								}),
							A2($elm$browser$Browser$Navigation$replaceUrl, model.key, '?'));
					}
				case 'JoinGame':
					if (model.inputEvent === '') {
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{statusReason: 'Invalid game ID. ' + model.inputEvent}),
							$elm$core$Platform$Cmd$none);
					} else {
						var val = $author$project$Main$parseEventId(model.inputEvent);
						var _v17 = $TSFoster$elm_uuid$UUID$fromString(val);
						if (_v17.$ === 'Err') {
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{statusReason: 'Invalid game ID.' + model.inputEvent}),
								$elm$core$Platform$Cmd$none);
						} else {
							var uuid = _v17.a;
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{eventId: 'starting', inputEvent: val, statusReason: ''}),
								$author$project$Main$postJoinGame(
									_Utils_update(
										model,
										{eventId: val})));
						}
					}
				case 'JoinGameResult':
					var result = msg.a;
					if (result.$ === 'Ok') {
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{eventId: model.inputEvent, gameState: $author$project$Main$Teaming, statusReason: ''}),
							$elm$core$Platform$Cmd$batch(
								_List_fromArray(
									[
										$author$project$Main$getPlayers(
										_Utils_update(
											model,
											{eventId: model.inputEvent})),
										A2($elm$browser$Browser$Navigation$replaceUrl, model.key, '?event_id=' + model.inputEvent)
									])));
					} else {
						var err = result.a;
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									gameState: $author$project$Main$Nonparticipation,
									statusReason: $author$project$Main$errToString(err)
								}),
							A2($elm$browser$Browser$Navigation$replaceUrl, model.key, '?'));
					}
				case 'Register':
					if ((model.inputCred.password === '') || (model.inputCred.user_id === '')) {
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{loginStatus: $author$project$Main$RegisterFail}),
							$elm$core$Platform$Cmd$none);
					} else {
						var _v19 = _Utils_eq(model.inputCred.password, model.inputCred.password2);
						if (_v19) {
							return _Utils_Tuple2(
								model,
								$author$project$Main$submitRegister(model));
						} else {
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{loginStatus: $author$project$Main$RegisterPasswordFail}),
								$elm$core$Platform$Cmd$none);
						}
					}
				case 'RegisterResult':
					var result = msg.a;
					if (result.$ === 'Ok') {
						var _v21 = result.a;
						var metadata = _v21.a;
						var user_info = _v21.b;
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{loginStatus: $author$project$Main$RegisterSuccess, statusReason: '', userRegister: false}),
							$elm$core$Platform$Cmd$none);
					} else {
						var err = result.a;
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									loginStatus: $author$project$Main$RegisterFail,
									statusReason: $author$project$Main$errorToString(err)
								}),
							$elm$core$Platform$Cmd$none);
					}
				case 'UpdateUserInfo':
					return ((model.inputCred.password === '') || (model.inputCred.nickname === '')) ? _Utils_Tuple2(
						_Utils_update(
							model,
							{loginStatus: $author$project$Main$RegisterFail}),
						$elm$core$Platform$Cmd$none) : _Utils_Tuple2(
						model,
						$author$project$Main$putUserInfo(model));
				case 'UpdateUserInfoResult':
					var result = msg.a;
					if (result.$ === 'Ok') {
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{statusReason: 'User info updated!'}),
							$elm$core$Platform$Cmd$none);
					} else {
						var err = result.a;
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									statusReason: $author$project$Main$errToString(err)
								}),
							$elm$core$Platform$Cmd$none);
					}
				case 'DeleteUserInfoResult':
					var result = msg.a;
					if (result.$ === 'Ok') {
						var init_model = A2($author$project$Main$initModel, model.url, model.key);
						return _Utils_Tuple2(
							_Utils_update(
								init_model,
								{gameState: $author$project$Main$Nonparticipation, loginStatus: $author$project$Main$LoginOff, myPageOpen: false, statusReason: 'user data deleted'}),
							$elm$core$Platform$Cmd$batch(
								_List_fromArray(
									[
										$author$project$Main$portSetToken(
										_Utils_Tuple2('', '')),
										$author$project$Main$portGetToken('token'),
										$elm$browser$Browser$Navigation$reloadAndSkipCache
									])));
					} else {
						var err = result.a;
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									statusReason: $author$project$Main$errToString(err)
								}),
							$elm$core$Platform$Cmd$none);
					}
				case 'GetPlayersResult':
					var result = msg.a;
					if (result.$ === 'Ok') {
						var players = result.a;
						var newPlayers = A2(
							$elm$core$Dict$union,
							model.players,
							$elm$core$Dict$fromList(
								A2(
									$elm$core$List$map,
									function (x) {
										return _Utils_Tuple2(
											x,
											A5($author$project$Main$Player, false, '', 0, 0, false));
									},
									players)));
						var activePlayers = $elm$core$Dict$keys(
							A2(
								$elm$core$Dict$filter,
								function (_v25) {
									return function (player) {
										return !player._break;
									};
								},
								newPlayers));
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{active_players: activePlayers, players: newPlayers}),
							$elm$core$Platform$Cmd$none);
					} else {
						var err = result.a;
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									eventId: '',
									gameId: '',
									gameState: $author$project$Main$Nonparticipation,
									loginStatus: $author$project$Main$LoginOff,
									statusReason: $author$project$Main$errToString(err)
								}),
							$elm$core$Platform$Cmd$none);
					}
				case 'GetCurrentResult':
					var result = msg.a;
					if (result.$ === 'Ok') {
						var current = result.a;
						var currentGame = current.b;
						var currentEvent = current.a;
						return ((model.eventId === 'starting') && (currentEvent === '')) ? _Utils_Tuple2(model, $elm$core$Platform$Cmd$none) : (((model.gameId === 'starting') && (currentGame === '')) ? _Utils_Tuple2(model, $elm$core$Platform$Cmd$none) : (((model.gameId === 'finishing') && (currentGame !== '')) ? _Utils_Tuple2(model, $elm$core$Platform$Cmd$none) : (((model.eventId === 'finishing') && (currentEvent !== '')) ? _Utils_Tuple2(model, $elm$core$Platform$Cmd$none) : _Utils_Tuple2(
							_Utils_update(
								model,
								{eventId: currentEvent, gameId: currentGame}),
							$elm$core$Platform$Cmd$none))));
					} else {
						var init_model = A2($author$project$Main$initModel, model.url, model.key);
						return _Utils_Tuple2(
							_Utils_update(
								init_model,
								{eventId: '', gameId: '', gameState: $author$project$Main$Nonparticipation, loginStatus: $author$project$Main$LoginOff, statusReason: 'Failed to get current.'}),
							$elm$core$Platform$Cmd$batch(
								_List_fromArray(
									[
										$author$project$Main$portSetToken(
										_Utils_Tuple2('', '')),
										$author$project$Main$portGetToken('token')
									])));
					}
				case 'GetTeamsResult':
					var result = msg.a;
					if (result.$ === 'Ok') {
						var teams = result.a;
						return _Utils_eq(model.teams, teams) ? _Utils_Tuple2(model, $elm$core$Platform$Cmd$none) : _Utils_Tuple2(
							_Utils_update(
								model,
								{teams: teams}),
							A2(
								$elm$core$Task$perform,
								function (_v28) {
									return $author$project$Main$NoOp;
								},
								A2($elm$browser$Browser$Dom$setViewport, 0, 9999)));
					} else {
						var err = result.a;
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									statusReason: $author$project$Main$errToString(err),
									teams: _List_Nil
								}),
							$elm$core$Platform$Cmd$none);
					}
				case 'GetUserInfoResult':
					var result = msg.a;
					if (result.$ === 'Ok') {
						var user_info = result.a;
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{userInfo: user_info}),
							$elm$core$Platform$Cmd$none);
					} else {
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{myPageOpen: !model.myPageOpen}),
							$elm$core$Platform$Cmd$none);
					}
				case 'ResToken':
					var _v30 = msg.a;
					var token = _v30.a;
					var name = _v30.b;
					var _v31 = ($elm$core$String$length(token) > 0) && ($elm$core$String$length(name) > 0);
					if (!_v31) {
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{loginStatus: $author$project$Main$LoginOff, tokenUserId: $elm$core$Maybe$Nothing}),
							$elm$core$Platform$Cmd$none);
					} else {
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									loginStatus: $author$project$Main$LoginSuccess,
									tokenUserId: $elm$core$Maybe$Just(
										A2($author$project$Main$TokenUserId, token, name))
								}),
							$elm$core$Platform$Cmd$none);
					}
				case 'RemoveToken':
					var init_model = A2($author$project$Main$initModel, model.url, model.key);
					return _Utils_Tuple2(
						_Utils_update(
							init_model,
							{gameState: $author$project$Main$Nonparticipation, loginStatus: $author$project$Main$LoginOff, myPageOpen: false}),
						$elm$core$Platform$Cmd$batch(
							_List_fromArray(
								[
									$author$project$Main$portSetToken(
									_Utils_Tuple2('', '')),
									$author$project$Main$portGetToken('token'),
									$elm$browser$Browser$Navigation$reloadAndSkipCache
								])));
				case 'ToggleMyPage':
					var _v32 = $rundis$elm_bootstrap$Bootstrap$Navbar$initialState($author$project$Main$NavbarMsg);
					var navbarState = _v32.a;
					var navbarCmd = _v32.b;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{myPageOpen: !model.myPageOpen, navbarState: navbarState}),
						$elm$core$Platform$Cmd$batch(
							_List_fromArray(
								[
									$author$project$Main$getUserInfo(model),
									navbarCmd
								])));
				case 'ChangeMyPageState':
					var state = msg.a;
					var score_size = A2(
						$elm$core$Maybe$withDefault,
						50,
						$elm$core$String$toInt(model.inputRecordParam.scoreSize));
					var _v33 = $rundis$elm_bootstrap$Bootstrap$Navbar$initialState($author$project$Main$NavbarMsg);
					var navbarState = _v33.a;
					var navbarCmd = _v33.b;
					switch (state.$) {
						case 'Personal':
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{myPageOpen: true, myPageState: state, navbarState: navbarState}),
								$elm$core$Platform$Cmd$batch(
									_List_fromArray(
										[
											$author$project$Main$getJoinedIds(model),
											A2($author$project$Main$getScoreRecord, model, score_size),
											navbarCmd
										])));
						case 'Event':
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{myPageOpen: true, myPageState: state, navbarState: navbarState}),
								$elm$core$Platform$Cmd$batch(
									_List_fromArray(
										[
											A2($author$project$Main$getEventRecord, model, model.inputRecordParam.eventId),
											$author$project$Main$getJoinedIds(model),
											$author$project$Main$getUserInfo(model),
											navbarCmd
										])));
						default:
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{myPageOpen: true, myPageState: state, navbarState: navbarState}),
								$elm$core$Platform$Cmd$batch(
									_List_fromArray(
										[
											$author$project$Main$getUserInfo(model),
											navbarCmd
										])));
					}
				case 'NavbarMsg':
					var state = msg.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{navbarState: state}),
						$elm$core$Platform$Cmd$none);
				case 'SaveData':
					var newModel = msg.a;
					return _Utils_Tuple2(newModel, $elm$core$Platform$Cmd$none);
				case 'Copy':
					var input_id = msg.a;
					var button_id = msg.b;
					return _Utils_Tuple2(
						model,
						$author$project$Main$copyToClipboard(
							_Utils_Tuple2(input_id, button_id)));
				case 'ApplyTeaming':
					return $elm$core$List$isEmpty(model.active_players) ? _Utils_Tuple2(model, $elm$core$Platform$Cmd$none) : _Utils_Tuple2(
						model,
						A2(
							$elm$random$Random$generate,
							$author$project$Main$RandomList,
							$elm_community$random_extra$Random$List$shuffle(model.active_players)));
				case 'ApplyTeamingResult':
					var result = msg.a;
					if (result.$ === 'Ok') {
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{statusReason: ''}),
							$author$project$Main$getTeams(model));
					} else {
						var err = result.a;
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									statusReason: $author$project$Main$errToString(err),
									teams: _List_Nil
								}),
							$elm$core$Platform$Cmd$none);
					}
				case 'RandomList':
					var stringList = msg.a;
					var team_list = $author$project$Main$getRandomTeamList(
						_Utils_update(
							model,
							{active_players: stringList}));
					return $elm$core$List$isEmpty(team_list) ? _Utils_Tuple2(
						_Utils_update(
							model,
							{active_players: stringList, teams: team_list}),
						$elm$core$Platform$Cmd$none) : _Utils_Tuple2(
						_Utils_update(
							model,
							{active_players: stringList}),
						A2($author$project$Main$postApplyTeaming, model, team_list));
				case 'StartGame':
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{gameId: 'starting'}),
						$author$project$Main$postStartGame(model));
				case 'StartGameResult':
					var result = msg.a;
					if (result.$ === 'Ok') {
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{gameId: 'starting', gameState: $author$project$Main$ScoreInput, statusReason: ''}),
							$author$project$Main$getCurrent(model));
					} else {
						var err = result.a;
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									statusReason: $author$project$Main$errToString(err)
								}),
							$elm$core$Platform$Cmd$none);
					}
				case 'SetScoreResult':
					var result = msg.a;
					if (result.$ === 'Ok') {
						return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
					} else {
						var err = result.a;
						return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
					}
				case 'GetScoreResult':
					var result = msg.a;
					if (result.$ === 'Ok') {
						var val = result.a;
						if (_Utils_eq(model.score_list, val)) {
							return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
						} else {
							var newPlayers = A2(
								$author$project$Main$applyScoresToPlayers,
								$elm$core$List$concat(val),
								model.players);
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{players: newPlayers, score_list: val}),
								$elm$core$Platform$Cmd$none);
						}
					} else {
						var err = result.a;
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									score_list: _List_Nil,
									statusReason: $author$project$Main$errToString(err)
								}),
							$elm$core$Platform$Cmd$none);
					}
				case 'FinishGame':
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{gameId: 'finishing', inputEvent: model.gameId}),
						A2(
							$author$project$Main$postFinishGame,
							model,
							A2($author$project$Main$scoresFromPlayers, model.players, model.teams)));
				case 'FinishGameResult':
					var result = msg.a;
					if (result.$ === 'Ok') {
						var players = result.a;
						if (model.eventId === 'finishing') {
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{inputRecordParam: $author$project$Main$initRecordParam}),
								$elm$core$Platform$Cmd$batch(
									_List_fromArray(
										[
											A2($author$project$Main$getScoreRecord, model, 50),
											$author$project$Main$getJoinedIds(model),
											$author$project$Main$getUserInfo(model),
											A2($author$project$Main$getEventRecord, model, model.inputEvent),
											$author$project$Main$postFinishEvent(model)
										])));
						} else {
							var oldRecord = model.eventRecord;
							var oldParam = model.inputRecordParam;
							var newParam = _Utils_update(
								oldParam,
								{eventId: model.eventId, gameId: model.inputEvent, scoreSize: '50'});
							var gameId = A2(
								$elm$core$Maybe$withDefault,
								0,
								$elm$core$String$toInt(model.inputEvent));
							var newGames = A3($elm$core$Dict$insert, gameId, players, model.eventRecord.gamesRecord);
							var newRecord = _Utils_update(
								oldRecord,
								{gamesRecord: newGames});
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{active_players: _List_Nil, eventRecord: newRecord, gameId: 'finishing', gameState: $author$project$Main$Teaming, inputRecordParam: newParam, myPageOpen: true, myPageState: $author$project$Main$Event, players: $elm$core$Dict$empty, statusReason: '', teams: _List_Nil}),
								$elm$core$Platform$Cmd$batch(
									_List_fromArray(
										[
											A2($author$project$Main$getScoreRecord, model, 50),
											$author$project$Main$getJoinedIds(model),
											A2($author$project$Main$getEventRecord, model, model.eventId),
											$author$project$Main$getPlayers(model),
											$author$project$Main$getCurrent(model),
											$author$project$Main$getUserInfo(model)
										])));
						}
					} else {
						var err = result.a;
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									gameId: '',
									statusReason: $author$project$Main$errToString(err)
								}),
							$elm$core$Platform$Cmd$none);
					}
				case 'FinishEvent':
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{eventId: 'finishing', gameId: 'finishing', inputEvent: model.eventId}),
						A2(
							$author$project$Main$postFinishGame,
							_Utils_update(
								model,
								{eventId: 'finishing'}),
							A2($author$project$Main$scoresFromPlayers, model.players, model.teams)));
				case 'FinishEventResult':
					var result = msg.a;
					if (result.$ === 'Ok') {
						var players = result.a;
						var oldRecord = model.eventRecord;
						var oldParam = model.inputRecordParam;
						var newRecord = _Utils_update(
							oldRecord,
							{playersRecord: players});
						var eventList = $author$project$Main$getEventDateList(model.joinedIds);
						var newParam = function () {
							var _v41 = $elm$core$List$head(eventList);
							if (_v41.$ === 'Nothing') {
								return oldParam;
							} else {
								var x = _v41.a;
								return _Utils_update(
									oldParam,
									{eventId: x.a, gameId: 'Total'});
							}
						}();
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{active_players: _List_Nil, eventId: 'finishing', eventRecord: newRecord, gameId: '', gameState: $author$project$Main$Nonparticipation, inputRecordParam: newParam, myPageOpen: true, myPageState: $author$project$Main$Event, players: $elm$core$Dict$empty, statusReason: '', teams: _List_Nil}),
							$elm$core$Platform$Cmd$batch(
								_List_fromArray(
									[
										$author$project$Main$getCurrent(model),
										A2($elm$browser$Browser$Navigation$replaceUrl, model.key, '?')
									])));
					} else {
						var err = result.a;
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									eventId: '',
									gameId: '',
									statusReason: $author$project$Main$errToString(err)
								}),
							$elm$core$Platform$Cmd$none);
					}
				case 'GetScoreRecordResult':
					var result = msg.a;
					if (result.$ === 'Ok') {
						var val = result.a;
						var oldParam = model.inputRecordParam;
						var oldSize = A2(
							$elm$core$Maybe$withDefault,
							50,
							$elm$core$String$toInt(oldParam.scoreSize));
						var newSize = A2(
							$elm$core$Basics$min,
							oldSize,
							$elm$core$List$length(val));
						var newParam = _Utils_update(
							oldParam,
							{
								scoreSize: $elm$core$String$fromInt(newSize)
							});
						return _Utils_eq(model.scoreRecord, val) ? _Utils_Tuple2(
							_Utils_update(
								model,
								{inputRecordParam: newParam}),
							$elm$core$Platform$Cmd$none) : _Utils_Tuple2(
							_Utils_update(
								model,
								{inputRecordParam: newParam, scoreRecord: val}),
							$elm$core$Platform$Cmd$none);
					} else {
						var err = result.a;
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									scoreRecord: _List_Nil,
									statusReason: $author$project$Main$errToString(err)
								}),
							$elm$core$Platform$Cmd$none);
					}
				case 'GetJoinedIdsResult':
					var result = msg.a;
					if (result.$ === 'Ok') {
						var val = result.a;
						if (_Utils_eq(model.joinedIds, val)) {
							return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
						} else {
							var oldParam = model.inputRecordParam;
							var eventList = $author$project$Main$getEventDateList(val);
							var newParam = function () {
								var _v44 = $elm$core$List$head(eventList);
								if (_v44.$ === 'Nothing') {
									return oldParam;
								} else {
									var x = _v44.a;
									return _Utils_update(
										oldParam,
										{eventId: x.a});
								}
							}();
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{inputRecordParam: newParam, joinedIds: val}),
								A2($author$project$Main$getEventRecord, model, newParam.eventId));
						}
					} else {
						var err = result.a;
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									scoreRecord: _List_Nil,
									statusReason: $author$project$Main$errToString(err)
								}),
							$elm$core$Platform$Cmd$none);
					}
				case 'GetEventRecordResult':
					var result = msg.a;
					if (result.$ === 'Ok') {
						var val = result.a;
						return _Utils_eq(model.eventRecord, val) ? _Utils_Tuple2(model, $elm$core$Platform$Cmd$none) : _Utils_Tuple2(
							_Utils_update(
								model,
								{eventRecord: val}),
							$elm$core$Platform$Cmd$none);
					} else {
						var err = result.a;
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									eventRecord: A2($author$project$Main$EventRecord, $elm$core$Dict$empty, $elm$core$Dict$empty),
									statusReason: $author$project$Main$errToString(err)
								}),
							$elm$core$Platform$Cmd$none);
					}
				case 'Tick1':
					var time = msg.a;
					var _v46 = model.tokenUserId;
					if (_v46.$ === 'Nothing') {
						return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
					} else {
						var tn = _v46.a;
						if (model.myPageOpen) {
							return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
						} else {
							var _v47 = model.gameState;
							switch (_v47.$) {
								case 'Nonparticipation':
									if ((model.eventId === 'starting') || ((model.eventId === 'finishing') || (model.eventId === ''))) {
										return _Utils_Tuple2(
											model,
											$author$project$Main$getCurrent(model));
									} else {
										var $temp$msg = $author$project$Main$JoinGame,
											$temp$model = _Utils_update(
											model,
											{inputEvent: model.eventId});
										msg = $temp$msg;
										model = $temp$model;
										continue update;
									}
								case 'Teaming':
									var _v48 = model.eventId;
									switch (_v48) {
										case 'finishing':
											return $author$project$Main$leaveGamePage(model);
										case '':
											return $author$project$Main$leaveGamePage(model);
										case 'starting':
											return _Utils_Tuple2(
												model,
												$author$project$Main$getCurrent(model));
										default:
											var _v49 = model.gameId;
											switch (_v49) {
												case 'starting':
													return _Utils_Tuple2(
														model,
														$author$project$Main$getCurrent(model));
												case 'finishing':
													return _Utils_Tuple2(
														model,
														$author$project$Main$getCurrent(model));
												case '':
													return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
												default:
													return _Utils_Tuple2(
														_Utils_update(
															model,
															{gameState: $author$project$Main$ScoreInput}),
														$elm$core$Platform$Cmd$batch(
															_List_fromArray(
																[
																	$author$project$Main$getPlayers(model),
																	$author$project$Main$getTeams(model),
																	$author$project$Main$getCurrent(model)
																])));
											}
									}
								default:
									if ((model.gameId === 'finishing') || ((model.eventId === 'finishing') || (model.gameId === 'starting'))) {
										return _Utils_Tuple2(
											model,
											$author$project$Main$getCurrent(model));
									} else {
										if (model.eventId === '') {
											var oldParam = model.inputRecordParam;
											var eventList = $author$project$Main$getEventDateList(model.joinedIds);
											var newParam = function () {
												var _v50 = $elm$core$List$head(eventList);
												if (_v50.$ === 'Nothing') {
													return oldParam;
												} else {
													var x = _v50.a;
													return _Utils_update(
														oldParam,
														{eventId: x.a, gameId: 'Total'});
												}
											}();
											return _Utils_Tuple2(
												_Utils_update(
													model,
													{active_players: _List_Nil, gameState: $author$project$Main$Nonparticipation, inputRecordParam: newParam, myPageOpen: true, myPageState: $author$project$Main$Event, players: $elm$core$Dict$empty, teams: _List_Nil}),
												$elm$core$Platform$Cmd$batch(
													_List_fromArray(
														[
															$author$project$Main$getScore(model),
															$author$project$Main$getJoinedIds(model),
															A2($elm$browser$Browser$Navigation$replaceUrl, model.key, '?')
														])));
										} else {
											if (model.gameId === '') {
												return _Utils_Tuple2(
													_Utils_update(
														model,
														{active_players: _List_Nil, gameState: $author$project$Main$Teaming, players: $elm$core$Dict$empty, teams: _List_Nil}),
													$elm$core$Platform$Cmd$batch(
														_List_fromArray(
															[
																A2($author$project$Main$getScoreRecord, model, 50),
																$author$project$Main$getJoinedIds(model),
																A2($author$project$Main$getEventRecord, model, model.eventId)
															])));
											} else {
												return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
											}
										}
									}
							}
						}
					}
				case 'Tick5':
					var time = msg.a;
					var _v51 = model.tokenUserId;
					if (_v51.$ === 'Nothing') {
						return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
					} else {
						var tn = _v51.a;
						if (model.myPageOpen) {
							return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
						} else {
							var _v52 = model.gameState;
							switch (_v52.$) {
								case 'Nonparticipation':
									return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
								case 'Teaming':
									return ((model.gameId === 'starting') || ((model.eventId === 'starting') || ((model.gameId === 'finishing') || ((model.eventId === 'finishing') || (model.eventId === ''))))) ? _Utils_Tuple2(model, $elm$core$Platform$Cmd$none) : _Utils_Tuple2(
										model,
										$elm$core$Platform$Cmd$batch(
											_List_fromArray(
												[
													$author$project$Main$getPlayers(model),
													$author$project$Main$getTeams(model),
													$author$project$Main$getCurrent(model)
												])));
								default:
									return ((model.gameId === 'finishing') || ((model.eventId === 'finishing') || ((model.gameId === 'starting') || ((model.eventId === '') || (model.gameId === ''))))) ? _Utils_Tuple2(model, $elm$core$Platform$Cmd$none) : _Utils_Tuple2(
										model,
										$elm$core$Platform$Cmd$batch(
											_List_fromArray(
												[
													$author$project$Main$getScore(model),
													$author$project$Main$getCurrent(model)
												])));
							}
						}
					}
				case 'AdjustTimeZone':
					var newZone = msg.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{timeZone: newZone}),
						$elm$core$Platform$Cmd$none);
				default:
					return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
			}
		}
	});
var $author$project$Main$FormInput = F2(
	function (a, b) {
		return {$: 'FormInput', a: a, b: b};
	});
var $author$project$Main$Fpass = {$: 'Fpass'};
var $author$project$Main$Fuser_id = {$: 'Fuser_id'};
var $author$project$Main$Login = {$: 'Login'};
var $author$project$Main$ToggleRegister = {$: 'ToggleRegister'};
var $rundis$elm_bootstrap$Bootstrap$Card$Internal$AlignedBlock = function (a) {
	return {$: 'AlignedBlock', a: a};
};
var $rundis$elm_bootstrap$Bootstrap$Card$Block$align = function (halign) {
	return $rundis$elm_bootstrap$Bootstrap$Card$Internal$AlignedBlock(halign);
};
var $rundis$elm_bootstrap$Bootstrap$Internal$Text$Right = {$: 'Right'};
var $rundis$elm_bootstrap$Bootstrap$General$Internal$XS = {$: 'XS'};
var $rundis$elm_bootstrap$Bootstrap$Text$alignXs = function (dir) {
	return {dir: dir, size: $rundis$elm_bootstrap$Bootstrap$General$Internal$XS};
};
var $rundis$elm_bootstrap$Bootstrap$Text$alignXsRight = $rundis$elm_bootstrap$Bootstrap$Text$alignXs($rundis$elm_bootstrap$Bootstrap$Internal$Text$Right);
var $rundis$elm_bootstrap$Bootstrap$Internal$Button$Attrs = function (a) {
	return {$: 'Attrs', a: a};
};
var $rundis$elm_bootstrap$Bootstrap$Button$attrs = function (attrs_) {
	return $rundis$elm_bootstrap$Bootstrap$Internal$Button$Attrs(attrs_);
};
var $rundis$elm_bootstrap$Bootstrap$Card$Config = function (a) {
	return {$: 'Config', a: a};
};
var $rundis$elm_bootstrap$Bootstrap$Card$Internal$CardBlock = function (a) {
	return {$: 'CardBlock', a: a};
};
var $rundis$elm_bootstrap$Bootstrap$Card$Internal$applyBlockModifier = F2(
	function (option, options) {
		switch (option.$) {
			case 'AlignedBlock':
				var align = option.a;
				return _Utils_update(
					options,
					{
						aligned: $elm$core$Maybe$Just(align)
					});
			case 'BlockColoring':
				var role = option.a;
				return _Utils_update(
					options,
					{
						coloring: $elm$core$Maybe$Just(role)
					});
			case 'BlockTextColoring':
				var color = option.a;
				return _Utils_update(
					options,
					{
						textColoring: $elm$core$Maybe$Just(color)
					});
			default:
				var attrs = option.a;
				return _Utils_update(
					options,
					{
						attributes: _Utils_ap(options.attributes, attrs)
					});
		}
	});
var $elm$html$Html$Attributes$stringProperty = F2(
	function (key, string) {
		return A2(
			_VirtualDom_property,
			key,
			$elm$json$Json$Encode$string(string));
	});
var $elm$html$Html$Attributes$class = $elm$html$Html$Attributes$stringProperty('className');
var $rundis$elm_bootstrap$Bootstrap$Card$Internal$defaultBlockOptions = {aligned: $elm$core$Maybe$Nothing, attributes: _List_Nil, coloring: $elm$core$Maybe$Nothing, textColoring: $elm$core$Maybe$Nothing};
var $elm$core$Maybe$map = F2(
	function (f, maybe) {
		if (maybe.$ === 'Just') {
			var value = maybe.a;
			return $elm$core$Maybe$Just(
				f(value));
		} else {
			return $elm$core$Maybe$Nothing;
		}
	});
var $rundis$elm_bootstrap$Bootstrap$General$Internal$screenSizeOption = function (size) {
	switch (size.$) {
		case 'XS':
			return $elm$core$Maybe$Nothing;
		case 'SM':
			return $elm$core$Maybe$Just('sm');
		case 'MD':
			return $elm$core$Maybe$Just('md');
		case 'LG':
			return $elm$core$Maybe$Just('lg');
		default:
			return $elm$core$Maybe$Just('xl');
	}
};
var $rundis$elm_bootstrap$Bootstrap$Internal$Text$textAlignDirOption = function (dir) {
	switch (dir.$) {
		case 'Center':
			return 'center';
		case 'Left':
			return 'left';
		default:
			return 'right';
	}
};
var $rundis$elm_bootstrap$Bootstrap$Internal$Text$textAlignClass = function (_v0) {
	var dir = _v0.dir;
	var size = _v0.size;
	return $elm$html$Html$Attributes$class(
		'text' + (A2(
			$elm$core$Maybe$withDefault,
			'-',
			A2(
				$elm$core$Maybe$map,
				function (s) {
					return '-' + (s + '-');
				},
				$rundis$elm_bootstrap$Bootstrap$General$Internal$screenSizeOption(size))) + $rundis$elm_bootstrap$Bootstrap$Internal$Text$textAlignDirOption(dir)));
};
var $rundis$elm_bootstrap$Bootstrap$Internal$Role$toClass = F2(
	function (prefix, role) {
		return $elm$html$Html$Attributes$class(
			prefix + ('-' + function () {
				switch (role.$) {
					case 'Primary':
						return 'primary';
					case 'Secondary':
						return 'secondary';
					case 'Success':
						return 'success';
					case 'Info':
						return 'info';
					case 'Warning':
						return 'warning';
					case 'Danger':
						return 'danger';
					case 'Light':
						return 'light';
					default:
						return 'dark';
				}
			}()));
	});
var $rundis$elm_bootstrap$Bootstrap$Internal$Text$textColorClass = function (color) {
	if (color.$ === 'White') {
		return $elm$html$Html$Attributes$class('text-white');
	} else {
		var role = color.a;
		return A2($rundis$elm_bootstrap$Bootstrap$Internal$Role$toClass, 'text', role);
	}
};
var $rundis$elm_bootstrap$Bootstrap$Card$Internal$blockAttributes = function (modifiers) {
	var options = A3($elm$core$List$foldl, $rundis$elm_bootstrap$Bootstrap$Card$Internal$applyBlockModifier, $rundis$elm_bootstrap$Bootstrap$Card$Internal$defaultBlockOptions, modifiers);
	return _Utils_ap(
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('card-body')
			]),
		_Utils_ap(
			function () {
				var _v0 = options.aligned;
				if (_v0.$ === 'Just') {
					var align = _v0.a;
					return _List_fromArray(
						[
							$rundis$elm_bootstrap$Bootstrap$Internal$Text$textAlignClass(align)
						]);
				} else {
					return _List_Nil;
				}
			}(),
			_Utils_ap(
				function () {
					var _v1 = options.coloring;
					if (_v1.$ === 'Just') {
						var role = _v1.a;
						return _List_fromArray(
							[
								A2($rundis$elm_bootstrap$Bootstrap$Internal$Role$toClass, 'bg', role)
							]);
					} else {
						return _List_Nil;
					}
				}(),
				_Utils_ap(
					function () {
						var _v2 = options.textColoring;
						if (_v2.$ === 'Just') {
							var color = _v2.a;
							return _List_fromArray(
								[
									$rundis$elm_bootstrap$Bootstrap$Internal$Text$textColorClass(color)
								]);
						} else {
							return _List_Nil;
						}
					}(),
					options.attributes))));
};
var $elm$html$Html$div = _VirtualDom_node('div');
var $rundis$elm_bootstrap$Bootstrap$Card$Internal$block = F2(
	function (options, items) {
		return $rundis$elm_bootstrap$Bootstrap$Card$Internal$CardBlock(
			A2(
				$elm$html$Html$div,
				$rundis$elm_bootstrap$Bootstrap$Card$Internal$blockAttributes(options),
				A2(
					$elm$core$List$map,
					function (_v0) {
						var e = _v0.a;
						return e;
					},
					items)));
	});
var $rundis$elm_bootstrap$Bootstrap$Card$block = F3(
	function (options, items, _v0) {
		var conf = _v0.a;
		return $rundis$elm_bootstrap$Bootstrap$Card$Config(
			_Utils_update(
				conf,
				{
					blocks: _Utils_ap(
						conf.blocks,
						_List_fromArray(
							[
								A2($rundis$elm_bootstrap$Bootstrap$Card$Internal$block, options, items)
							]))
				}));
	});
var $rundis$elm_bootstrap$Bootstrap$Grid$Internal$Bottom = {$: 'Bottom'};
var $rundis$elm_bootstrap$Bootstrap$General$Internal$LG = {$: 'LG'};
var $rundis$elm_bootstrap$Bootstrap$Grid$Internal$ColAlign = function (a) {
	return {$: 'ColAlign', a: a};
};
var $rundis$elm_bootstrap$Bootstrap$Grid$Internal$VAlign = F2(
	function (screenSize, align) {
		return {align: align, screenSize: screenSize};
	});
var $rundis$elm_bootstrap$Bootstrap$Grid$Internal$colVAlign = F2(
	function (size, align) {
		return $rundis$elm_bootstrap$Bootstrap$Grid$Internal$ColAlign(
			A2($rundis$elm_bootstrap$Bootstrap$Grid$Internal$VAlign, size, align));
	});
var $rundis$elm_bootstrap$Bootstrap$Grid$Col$bottomLg = A2($rundis$elm_bootstrap$Bootstrap$Grid$Internal$colVAlign, $rundis$elm_bootstrap$Bootstrap$General$Internal$LG, $rundis$elm_bootstrap$Bootstrap$Grid$Internal$Bottom);
var $elm$html$Html$button = _VirtualDom_node('button');
var $elm$core$Maybe$andThen = F2(
	function (callback, maybeValue) {
		if (maybeValue.$ === 'Just') {
			var value = maybeValue.a;
			return callback(value);
		} else {
			return $elm$core$Maybe$Nothing;
		}
	});
var $rundis$elm_bootstrap$Bootstrap$Internal$Button$applyModifier = F2(
	function (modifier, options) {
		switch (modifier.$) {
			case 'Size':
				var size = modifier.a;
				return _Utils_update(
					options,
					{
						size: $elm$core$Maybe$Just(size)
					});
			case 'Coloring':
				var coloring = modifier.a;
				return _Utils_update(
					options,
					{
						coloring: $elm$core$Maybe$Just(coloring)
					});
			case 'Block':
				return _Utils_update(
					options,
					{block: true});
			case 'Disabled':
				var val = modifier.a;
				return _Utils_update(
					options,
					{disabled: val});
			default:
				var attrs = modifier.a;
				return _Utils_update(
					options,
					{
						attributes: _Utils_ap(options.attributes, attrs)
					});
		}
	});
var $elm$html$Html$Attributes$classList = function (classes) {
	return $elm$html$Html$Attributes$class(
		A2(
			$elm$core$String$join,
			' ',
			A2(
				$elm$core$List$map,
				$elm$core$Tuple$first,
				A2($elm$core$List$filter, $elm$core$Tuple$second, classes))));
};
var $rundis$elm_bootstrap$Bootstrap$Internal$Button$defaultOptions = {attributes: _List_Nil, block: false, coloring: $elm$core$Maybe$Nothing, disabled: false, size: $elm$core$Maybe$Nothing};
var $elm$json$Json$Encode$bool = _Json_wrap;
var $elm$html$Html$Attributes$boolProperty = F2(
	function (key, bool) {
		return A2(
			_VirtualDom_property,
			key,
			$elm$json$Json$Encode$bool(bool));
	});
var $elm$html$Html$Attributes$disabled = $elm$html$Html$Attributes$boolProperty('disabled');
var $rundis$elm_bootstrap$Bootstrap$Internal$Button$roleClass = function (role) {
	switch (role.$) {
		case 'Primary':
			return 'primary';
		case 'Secondary':
			return 'secondary';
		case 'Success':
			return 'success';
		case 'Info':
			return 'info';
		case 'Warning':
			return 'warning';
		case 'Danger':
			return 'danger';
		case 'Dark':
			return 'dark';
		case 'Light':
			return 'light';
		default:
			return 'link';
	}
};
var $rundis$elm_bootstrap$Bootstrap$Internal$Button$buttonAttributes = function (modifiers) {
	var options = A3($elm$core$List$foldl, $rundis$elm_bootstrap$Bootstrap$Internal$Button$applyModifier, $rundis$elm_bootstrap$Bootstrap$Internal$Button$defaultOptions, modifiers);
	return _Utils_ap(
		_List_fromArray(
			[
				$elm$html$Html$Attributes$classList(
				_List_fromArray(
					[
						_Utils_Tuple2('btn', true),
						_Utils_Tuple2('btn-block', options.block),
						_Utils_Tuple2('disabled', options.disabled)
					])),
				$elm$html$Html$Attributes$disabled(options.disabled)
			]),
		_Utils_ap(
			function () {
				var _v0 = A2($elm$core$Maybe$andThen, $rundis$elm_bootstrap$Bootstrap$General$Internal$screenSizeOption, options.size);
				if (_v0.$ === 'Just') {
					var s = _v0.a;
					return _List_fromArray(
						[
							$elm$html$Html$Attributes$class('btn-' + s)
						]);
				} else {
					return _List_Nil;
				}
			}(),
			_Utils_ap(
				function () {
					var _v1 = options.coloring;
					if (_v1.$ === 'Just') {
						if (_v1.a.$ === 'Roled') {
							var role = _v1.a.a;
							return _List_fromArray(
								[
									$elm$html$Html$Attributes$class(
									'btn-' + $rundis$elm_bootstrap$Bootstrap$Internal$Button$roleClass(role))
								]);
						} else {
							var role = _v1.a.a;
							return _List_fromArray(
								[
									$elm$html$Html$Attributes$class(
									'btn-outline-' + $rundis$elm_bootstrap$Bootstrap$Internal$Button$roleClass(role))
								]);
						}
					} else {
						return _List_Nil;
					}
				}(),
				options.attributes)));
};
var $rundis$elm_bootstrap$Bootstrap$Button$button = F2(
	function (options, children) {
		return A2(
			$elm$html$Html$button,
			$rundis$elm_bootstrap$Bootstrap$Internal$Button$buttonAttributes(options),
			children);
	});
var $rundis$elm_bootstrap$Bootstrap$General$Internal$Center = {$: 'Center'};
var $rundis$elm_bootstrap$Bootstrap$General$Internal$HAlign = F2(
	function (screenSize, align) {
		return {align: align, screenSize: screenSize};
	});
var $rundis$elm_bootstrap$Bootstrap$Grid$Internal$RowHAlign = function (a) {
	return {$: 'RowHAlign', a: a};
};
var $rundis$elm_bootstrap$Bootstrap$Grid$Internal$rowHAlign = F2(
	function (size, align) {
		return $rundis$elm_bootstrap$Bootstrap$Grid$Internal$RowHAlign(
			A2($rundis$elm_bootstrap$Bootstrap$General$Internal$HAlign, size, align));
	});
var $rundis$elm_bootstrap$Bootstrap$Grid$Row$centerXs = A2($rundis$elm_bootstrap$Bootstrap$Grid$Internal$rowHAlign, $rundis$elm_bootstrap$Bootstrap$General$Internal$XS, $rundis$elm_bootstrap$Bootstrap$General$Internal$Center);
var $rundis$elm_bootstrap$Bootstrap$Grid$Column = function (a) {
	return {$: 'Column', a: a};
};
var $rundis$elm_bootstrap$Bootstrap$Grid$col = F2(
	function (options, children) {
		return $rundis$elm_bootstrap$Bootstrap$Grid$Column(
			{children: children, options: options});
	});
var $rundis$elm_bootstrap$Bootstrap$Card$config = function (options) {
	return $rundis$elm_bootstrap$Bootstrap$Card$Config(
		{blocks: _List_Nil, footer: $elm$core$Maybe$Nothing, header: $elm$core$Maybe$Nothing, imgBottom: $elm$core$Maybe$Nothing, imgTop: $elm$core$Maybe$Nothing, options: options});
};
var $rundis$elm_bootstrap$Bootstrap$Grid$container = F2(
	function (attributes, children) {
		return A2(
			$elm$html$Html$div,
			_Utils_ap(
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('container')
					]),
				attributes),
			children);
	});
var $rundis$elm_bootstrap$Bootstrap$Grid$containerFluid = F2(
	function (attributes, children) {
		return A2(
			$elm$html$Html$div,
			_Utils_ap(
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('container-fluid')
					]),
				attributes),
			children);
	});
var $rundis$elm_bootstrap$Bootstrap$Card$Internal$BlockItem = function (a) {
	return {$: 'BlockItem', a: a};
};
var $rundis$elm_bootstrap$Bootstrap$Card$Block$custom = function (element) {
	return $rundis$elm_bootstrap$Bootstrap$Card$Internal$BlockItem(element);
};
var $elm$html$Html$form = _VirtualDom_node('form');
var $rundis$elm_bootstrap$Bootstrap$Form$form = F2(
	function (attributes, children) {
		return A2($elm$html$Html$form, attributes, children);
	});
var $elm$html$Html$h4 = _VirtualDom_node('h4');
var $rundis$elm_bootstrap$Bootstrap$Card$Header = function (a) {
	return {$: 'Header', a: a};
};
var $rundis$elm_bootstrap$Bootstrap$Card$headerPrivate = F4(
	function (elemFn, attributes, children, _v0) {
		var conf = _v0.a;
		return $rundis$elm_bootstrap$Bootstrap$Card$Config(
			_Utils_update(
				conf,
				{
					header: $elm$core$Maybe$Just(
						$rundis$elm_bootstrap$Bootstrap$Card$Header(
							A2(
								elemFn,
								A2(
									$elm$core$List$cons,
									$elm$html$Html$Attributes$class('card-header'),
									attributes),
								children)))
				}));
	});
var $rundis$elm_bootstrap$Bootstrap$Card$headerH4 = $rundis$elm_bootstrap$Bootstrap$Card$headerPrivate($elm$html$Html$h4);
var $elm$html$Html$Attributes$href = function (url) {
	return A2(
		$elm$html$Html$Attributes$stringProperty,
		'href',
		_VirtualDom_noJavaScriptUri(url));
};
var $elm$html$Html$label = _VirtualDom_node('label');
var $rundis$elm_bootstrap$Bootstrap$Form$label = F2(
	function (attributes, children) {
		return A2(
			$elm$html$Html$label,
			A2(
				$elm$core$List$cons,
				$elm$html$Html$Attributes$class('form-control-label'),
				attributes),
			children);
	});
var $rundis$elm_bootstrap$Bootstrap$General$Internal$Left = {$: 'Left'};
var $rundis$elm_bootstrap$Bootstrap$Grid$Row$leftLg = A2($rundis$elm_bootstrap$Bootstrap$Grid$Internal$rowHAlign, $rundis$elm_bootstrap$Bootstrap$General$Internal$LG, $rundis$elm_bootstrap$Bootstrap$General$Internal$Left);
var $rundis$elm_bootstrap$Bootstrap$Grid$Internal$Col4 = {$: 'Col4'};
var $rundis$elm_bootstrap$Bootstrap$Grid$Internal$ColWidth = function (a) {
	return {$: 'ColWidth', a: a};
};
var $rundis$elm_bootstrap$Bootstrap$Grid$Internal$Width = F2(
	function (screenSize, columnCount) {
		return {columnCount: columnCount, screenSize: screenSize};
	});
var $rundis$elm_bootstrap$Bootstrap$Grid$Internal$width = F2(
	function (size, count) {
		return $rundis$elm_bootstrap$Bootstrap$Grid$Internal$ColWidth(
			A2($rundis$elm_bootstrap$Bootstrap$Grid$Internal$Width, size, count));
	});
var $rundis$elm_bootstrap$Bootstrap$Grid$Col$lg4 = A2($rundis$elm_bootstrap$Bootstrap$Grid$Internal$width, $rundis$elm_bootstrap$Bootstrap$General$Internal$LG, $rundis$elm_bootstrap$Bootstrap$Grid$Internal$Col4);
var $rundis$elm_bootstrap$Bootstrap$Grid$Internal$Col8 = {$: 'Col8'};
var $rundis$elm_bootstrap$Bootstrap$Grid$Col$lg8 = A2($rundis$elm_bootstrap$Bootstrap$Grid$Internal$width, $rundis$elm_bootstrap$Bootstrap$General$Internal$LG, $rundis$elm_bootstrap$Bootstrap$Grid$Internal$Col8);
var $elm$html$Html$a = _VirtualDom_node('a');
var $rundis$elm_bootstrap$Bootstrap$Card$Block$link = F2(
	function (attributes, children) {
		return $rundis$elm_bootstrap$Bootstrap$Card$Internal$BlockItem(
			A2(
				$elm$html$Html$a,
				_Utils_ap(
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('card-link')
						]),
					attributes),
				children));
	});
var $rundis$elm_bootstrap$Bootstrap$Utilities$Spacing$mb3 = $elm$html$Html$Attributes$class('mb-3');
var $elm$virtual_dom$VirtualDom$MayPreventDefault = function (a) {
	return {$: 'MayPreventDefault', a: a};
};
var $elm$virtual_dom$VirtualDom$on = _VirtualDom_on;
var $elm$html$Html$Events$preventDefaultOn = F2(
	function (event, decoder) {
		return A2(
			$elm$virtual_dom$VirtualDom$on,
			event,
			$elm$virtual_dom$VirtualDom$MayPreventDefault(decoder));
	});
var $rundis$elm_bootstrap$Bootstrap$Button$onClick = function (message) {
	return $rundis$elm_bootstrap$Bootstrap$Button$attrs(
		_List_fromArray(
			[
				A2(
				$elm$html$Html$Events$preventDefaultOn,
				'click',
				$elm$json$Json$Decode$succeed(
					_Utils_Tuple2(message, true)))
			]));
};
var $elm$virtual_dom$VirtualDom$Normal = function (a) {
	return {$: 'Normal', a: a};
};
var $elm$html$Html$Events$on = F2(
	function (event, decoder) {
		return A2(
			$elm$virtual_dom$VirtualDom$on,
			event,
			$elm$virtual_dom$VirtualDom$Normal(decoder));
	});
var $elm$html$Html$Events$onClick = function (msg) {
	return A2(
		$elm$html$Html$Events$on,
		'click',
		$elm$json$Json$Decode$succeed(msg));
};
var $rundis$elm_bootstrap$Bootstrap$Form$Input$OnInput = function (a) {
	return {$: 'OnInput', a: a};
};
var $rundis$elm_bootstrap$Bootstrap$Form$Input$onInput = function (toMsg) {
	return $rundis$elm_bootstrap$Bootstrap$Form$Input$OnInput(toMsg);
};
var $rundis$elm_bootstrap$Bootstrap$Card$Internal$Coloring = function (a) {
	return {$: 'Coloring', a: a};
};
var $rundis$elm_bootstrap$Bootstrap$Internal$Role$Light = {$: 'Light'};
var $rundis$elm_bootstrap$Bootstrap$Card$Internal$Outlined = function (a) {
	return {$: 'Outlined', a: a};
};
var $rundis$elm_bootstrap$Bootstrap$Card$outlineLight = $rundis$elm_bootstrap$Bootstrap$Card$Internal$Coloring(
	$rundis$elm_bootstrap$Bootstrap$Card$Internal$Outlined($rundis$elm_bootstrap$Bootstrap$Internal$Role$Light));
var $rundis$elm_bootstrap$Bootstrap$Form$Input$Password = {$: 'Password'};
var $rundis$elm_bootstrap$Bootstrap$Form$Input$Input = function (a) {
	return {$: 'Input', a: a};
};
var $rundis$elm_bootstrap$Bootstrap$Form$Input$Type = function (a) {
	return {$: 'Type', a: a};
};
var $rundis$elm_bootstrap$Bootstrap$Form$Input$create = F2(
	function (tipe, options) {
		return $rundis$elm_bootstrap$Bootstrap$Form$Input$Input(
			{
				options: A2(
					$elm$core$List$cons,
					$rundis$elm_bootstrap$Bootstrap$Form$Input$Type(tipe),
					options)
			});
	});
var $elm$html$Html$input = _VirtualDom_node('input');
var $rundis$elm_bootstrap$Bootstrap$Form$Input$applyModifier = F2(
	function (modifier, options) {
		switch (modifier.$) {
			case 'Size':
				var size_ = modifier.a;
				return _Utils_update(
					options,
					{
						size: $elm$core$Maybe$Just(size_)
					});
			case 'Id':
				var id_ = modifier.a;
				return _Utils_update(
					options,
					{
						id: $elm$core$Maybe$Just(id_)
					});
			case 'Type':
				var tipe = modifier.a;
				return _Utils_update(
					options,
					{tipe: tipe});
			case 'Disabled':
				var val = modifier.a;
				return _Utils_update(
					options,
					{disabled: val});
			case 'Value':
				var value_ = modifier.a;
				return _Utils_update(
					options,
					{
						value: $elm$core$Maybe$Just(value_)
					});
			case 'Placeholder':
				var value_ = modifier.a;
				return _Utils_update(
					options,
					{
						placeholder: $elm$core$Maybe$Just(value_)
					});
			case 'OnInput':
				var onInput_ = modifier.a;
				return _Utils_update(
					options,
					{
						onInput: $elm$core$Maybe$Just(onInput_)
					});
			case 'Validation':
				var validation_ = modifier.a;
				return _Utils_update(
					options,
					{
						validation: $elm$core$Maybe$Just(validation_)
					});
			case 'Readonly':
				var val = modifier.a;
				return _Utils_update(
					options,
					{readonly: val});
			case 'PlainText':
				var val = modifier.a;
				return _Utils_update(
					options,
					{plainText: val});
			default:
				var attrs_ = modifier.a;
				return _Utils_update(
					options,
					{
						attributes: _Utils_ap(options.attributes, attrs_)
					});
		}
	});
var $rundis$elm_bootstrap$Bootstrap$Form$Input$Text = {$: 'Text'};
var $rundis$elm_bootstrap$Bootstrap$Form$Input$defaultOptions = {attributes: _List_Nil, disabled: false, id: $elm$core$Maybe$Nothing, onInput: $elm$core$Maybe$Nothing, placeholder: $elm$core$Maybe$Nothing, plainText: false, readonly: false, size: $elm$core$Maybe$Nothing, tipe: $rundis$elm_bootstrap$Bootstrap$Form$Input$Text, validation: $elm$core$Maybe$Nothing, value: $elm$core$Maybe$Nothing};
var $elm$html$Html$Attributes$id = $elm$html$Html$Attributes$stringProperty('id');
var $elm$html$Html$Events$alwaysStop = function (x) {
	return _Utils_Tuple2(x, true);
};
var $elm$virtual_dom$VirtualDom$MayStopPropagation = function (a) {
	return {$: 'MayStopPropagation', a: a};
};
var $elm$html$Html$Events$stopPropagationOn = F2(
	function (event, decoder) {
		return A2(
			$elm$virtual_dom$VirtualDom$on,
			event,
			$elm$virtual_dom$VirtualDom$MayStopPropagation(decoder));
	});
var $elm$json$Json$Decode$at = F2(
	function (fields, decoder) {
		return A3($elm$core$List$foldr, $elm$json$Json$Decode$field, decoder, fields);
	});
var $elm$html$Html$Events$targetValue = A2(
	$elm$json$Json$Decode$at,
	_List_fromArray(
		['target', 'value']),
	$elm$json$Json$Decode$string);
var $elm$html$Html$Events$onInput = function (tagger) {
	return A2(
		$elm$html$Html$Events$stopPropagationOn,
		'input',
		A2(
			$elm$json$Json$Decode$map,
			$elm$html$Html$Events$alwaysStop,
			A2($elm$json$Json$Decode$map, tagger, $elm$html$Html$Events$targetValue)));
};
var $elm$html$Html$Attributes$placeholder = $elm$html$Html$Attributes$stringProperty('placeholder');
var $elm$html$Html$Attributes$readonly = $elm$html$Html$Attributes$boolProperty('readOnly');
var $rundis$elm_bootstrap$Bootstrap$Form$Input$sizeAttribute = function (size) {
	return A2(
		$elm$core$Maybe$map,
		function (s) {
			return $elm$html$Html$Attributes$class('form-control-' + s);
		},
		$rundis$elm_bootstrap$Bootstrap$General$Internal$screenSizeOption(size));
};
var $elm$html$Html$Attributes$type_ = $elm$html$Html$Attributes$stringProperty('type');
var $rundis$elm_bootstrap$Bootstrap$Form$Input$typeAttribute = function (inputType) {
	return $elm$html$Html$Attributes$type_(
		function () {
			switch (inputType.$) {
				case 'Text':
					return 'text';
				case 'Password':
					return 'password';
				case 'DatetimeLocal':
					return 'datetime-local';
				case 'Date':
					return 'date';
				case 'Month':
					return 'month';
				case 'Time':
					return 'time';
				case 'Week':
					return 'week';
				case 'Number':
					return 'number';
				case 'Email':
					return 'email';
				case 'Url':
					return 'url';
				case 'Search':
					return 'search';
				case 'Tel':
					return 'tel';
				default:
					return 'color';
			}
		}());
};
var $rundis$elm_bootstrap$Bootstrap$Form$FormInternal$validationToString = function (validation) {
	if (validation.$ === 'Success') {
		return 'is-valid';
	} else {
		return 'is-invalid';
	}
};
var $rundis$elm_bootstrap$Bootstrap$Form$Input$validationAttribute = function (validation) {
	return $elm$html$Html$Attributes$class(
		$rundis$elm_bootstrap$Bootstrap$Form$FormInternal$validationToString(validation));
};
var $elm$html$Html$Attributes$value = $elm$html$Html$Attributes$stringProperty('value');
var $rundis$elm_bootstrap$Bootstrap$Form$Input$toAttributes = function (modifiers) {
	var options = A3($elm$core$List$foldl, $rundis$elm_bootstrap$Bootstrap$Form$Input$applyModifier, $rundis$elm_bootstrap$Bootstrap$Form$Input$defaultOptions, modifiers);
	return _Utils_ap(
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class(
				options.plainText ? 'form-control-plaintext' : 'form-control'),
				$elm$html$Html$Attributes$disabled(options.disabled),
				$elm$html$Html$Attributes$readonly(options.readonly || options.plainText),
				$rundis$elm_bootstrap$Bootstrap$Form$Input$typeAttribute(options.tipe)
			]),
		_Utils_ap(
			A2(
				$elm$core$List$filterMap,
				$elm$core$Basics$identity,
				_List_fromArray(
					[
						A2($elm$core$Maybe$map, $elm$html$Html$Attributes$id, options.id),
						A2($elm$core$Maybe$andThen, $rundis$elm_bootstrap$Bootstrap$Form$Input$sizeAttribute, options.size),
						A2($elm$core$Maybe$map, $elm$html$Html$Attributes$value, options.value),
						A2($elm$core$Maybe$map, $elm$html$Html$Attributes$placeholder, options.placeholder),
						A2($elm$core$Maybe$map, $elm$html$Html$Events$onInput, options.onInput),
						A2($elm$core$Maybe$map, $rundis$elm_bootstrap$Bootstrap$Form$Input$validationAttribute, options.validation)
					])),
			options.attributes));
};
var $rundis$elm_bootstrap$Bootstrap$Form$Input$view = function (_v0) {
	var options = _v0.a.options;
	return A2(
		$elm$html$Html$input,
		$rundis$elm_bootstrap$Bootstrap$Form$Input$toAttributes(options),
		_List_Nil);
};
var $rundis$elm_bootstrap$Bootstrap$Form$Input$input = F2(
	function (tipe, options) {
		return $rundis$elm_bootstrap$Bootstrap$Form$Input$view(
			A2($rundis$elm_bootstrap$Bootstrap$Form$Input$create, tipe, options));
	});
var $rundis$elm_bootstrap$Bootstrap$Form$Input$password = $rundis$elm_bootstrap$Bootstrap$Form$Input$input($rundis$elm_bootstrap$Bootstrap$Form$Input$Password);
var $rundis$elm_bootstrap$Bootstrap$Form$Input$Placeholder = function (a) {
	return {$: 'Placeholder', a: a};
};
var $rundis$elm_bootstrap$Bootstrap$Form$Input$placeholder = function (value_) {
	return $rundis$elm_bootstrap$Bootstrap$Form$Input$Placeholder(value_);
};
var $rundis$elm_bootstrap$Bootstrap$Internal$Button$Coloring = function (a) {
	return {$: 'Coloring', a: a};
};
var $rundis$elm_bootstrap$Bootstrap$Internal$Button$Primary = {$: 'Primary'};
var $rundis$elm_bootstrap$Bootstrap$Internal$Button$Roled = function (a) {
	return {$: 'Roled', a: a};
};
var $rundis$elm_bootstrap$Bootstrap$Button$primary = $rundis$elm_bootstrap$Bootstrap$Internal$Button$Coloring(
	$rundis$elm_bootstrap$Bootstrap$Internal$Button$Roled($rundis$elm_bootstrap$Bootstrap$Internal$Button$Primary));
var $rundis$elm_bootstrap$Bootstrap$Grid$Internal$Col = {$: 'Col'};
var $rundis$elm_bootstrap$Bootstrap$Grid$Internal$applyColAlign = F2(
	function (align_, options) {
		var _v0 = align_.screenSize;
		switch (_v0.$) {
			case 'XS':
				return _Utils_update(
					options,
					{
						alignXs: $elm$core$Maybe$Just(align_)
					});
			case 'SM':
				return _Utils_update(
					options,
					{
						alignSm: $elm$core$Maybe$Just(align_)
					});
			case 'MD':
				return _Utils_update(
					options,
					{
						alignMd: $elm$core$Maybe$Just(align_)
					});
			case 'LG':
				return _Utils_update(
					options,
					{
						alignLg: $elm$core$Maybe$Just(align_)
					});
			default:
				return _Utils_update(
					options,
					{
						alignXl: $elm$core$Maybe$Just(align_)
					});
		}
	});
var $rundis$elm_bootstrap$Bootstrap$Grid$Internal$applyColOffset = F2(
	function (offset_, options) {
		var _v0 = offset_.screenSize;
		switch (_v0.$) {
			case 'XS':
				return _Utils_update(
					options,
					{
						offsetXs: $elm$core$Maybe$Just(offset_)
					});
			case 'SM':
				return _Utils_update(
					options,
					{
						offsetSm: $elm$core$Maybe$Just(offset_)
					});
			case 'MD':
				return _Utils_update(
					options,
					{
						offsetMd: $elm$core$Maybe$Just(offset_)
					});
			case 'LG':
				return _Utils_update(
					options,
					{
						offsetLg: $elm$core$Maybe$Just(offset_)
					});
			default:
				return _Utils_update(
					options,
					{
						offsetXl: $elm$core$Maybe$Just(offset_)
					});
		}
	});
var $rundis$elm_bootstrap$Bootstrap$Grid$Internal$applyColOrder = F2(
	function (order_, options) {
		var _v0 = order_.screenSize;
		switch (_v0.$) {
			case 'XS':
				return _Utils_update(
					options,
					{
						orderXs: $elm$core$Maybe$Just(order_)
					});
			case 'SM':
				return _Utils_update(
					options,
					{
						orderSm: $elm$core$Maybe$Just(order_)
					});
			case 'MD':
				return _Utils_update(
					options,
					{
						orderMd: $elm$core$Maybe$Just(order_)
					});
			case 'LG':
				return _Utils_update(
					options,
					{
						orderLg: $elm$core$Maybe$Just(order_)
					});
			default:
				return _Utils_update(
					options,
					{
						orderXl: $elm$core$Maybe$Just(order_)
					});
		}
	});
var $rundis$elm_bootstrap$Bootstrap$Grid$Internal$applyColPull = F2(
	function (pull_, options) {
		var _v0 = pull_.screenSize;
		switch (_v0.$) {
			case 'XS':
				return _Utils_update(
					options,
					{
						pullXs: $elm$core$Maybe$Just(pull_)
					});
			case 'SM':
				return _Utils_update(
					options,
					{
						pullSm: $elm$core$Maybe$Just(pull_)
					});
			case 'MD':
				return _Utils_update(
					options,
					{
						pullMd: $elm$core$Maybe$Just(pull_)
					});
			case 'LG':
				return _Utils_update(
					options,
					{
						pullLg: $elm$core$Maybe$Just(pull_)
					});
			default:
				return _Utils_update(
					options,
					{
						pullXl: $elm$core$Maybe$Just(pull_)
					});
		}
	});
var $rundis$elm_bootstrap$Bootstrap$Grid$Internal$applyColPush = F2(
	function (push_, options) {
		var _v0 = push_.screenSize;
		switch (_v0.$) {
			case 'XS':
				return _Utils_update(
					options,
					{
						pushXs: $elm$core$Maybe$Just(push_)
					});
			case 'SM':
				return _Utils_update(
					options,
					{
						pushSm: $elm$core$Maybe$Just(push_)
					});
			case 'MD':
				return _Utils_update(
					options,
					{
						pushMd: $elm$core$Maybe$Just(push_)
					});
			case 'LG':
				return _Utils_update(
					options,
					{
						pushLg: $elm$core$Maybe$Just(push_)
					});
			default:
				return _Utils_update(
					options,
					{
						pushXl: $elm$core$Maybe$Just(push_)
					});
		}
	});
var $rundis$elm_bootstrap$Bootstrap$Grid$Internal$applyColWidth = F2(
	function (width_, options) {
		var _v0 = width_.screenSize;
		switch (_v0.$) {
			case 'XS':
				return _Utils_update(
					options,
					{
						widthXs: $elm$core$Maybe$Just(width_)
					});
			case 'SM':
				return _Utils_update(
					options,
					{
						widthSm: $elm$core$Maybe$Just(width_)
					});
			case 'MD':
				return _Utils_update(
					options,
					{
						widthMd: $elm$core$Maybe$Just(width_)
					});
			case 'LG':
				return _Utils_update(
					options,
					{
						widthLg: $elm$core$Maybe$Just(width_)
					});
			default:
				return _Utils_update(
					options,
					{
						widthXl: $elm$core$Maybe$Just(width_)
					});
		}
	});
var $rundis$elm_bootstrap$Bootstrap$Grid$Internal$applyColOption = F2(
	function (modifier, options) {
		switch (modifier.$) {
			case 'ColAttrs':
				var attrs = modifier.a;
				return _Utils_update(
					options,
					{
						attributes: _Utils_ap(options.attributes, attrs)
					});
			case 'ColWidth':
				var width_ = modifier.a;
				return A2($rundis$elm_bootstrap$Bootstrap$Grid$Internal$applyColWidth, width_, options);
			case 'ColOffset':
				var offset_ = modifier.a;
				return A2($rundis$elm_bootstrap$Bootstrap$Grid$Internal$applyColOffset, offset_, options);
			case 'ColPull':
				var pull_ = modifier.a;
				return A2($rundis$elm_bootstrap$Bootstrap$Grid$Internal$applyColPull, pull_, options);
			case 'ColPush':
				var push_ = modifier.a;
				return A2($rundis$elm_bootstrap$Bootstrap$Grid$Internal$applyColPush, push_, options);
			case 'ColOrder':
				var order_ = modifier.a;
				return A2($rundis$elm_bootstrap$Bootstrap$Grid$Internal$applyColOrder, order_, options);
			case 'ColAlign':
				var align = modifier.a;
				return A2($rundis$elm_bootstrap$Bootstrap$Grid$Internal$applyColAlign, align, options);
			default:
				var align = modifier.a;
				return _Utils_update(
					options,
					{
						textAlign: $elm$core$Maybe$Just(align)
					});
		}
	});
var $rundis$elm_bootstrap$Bootstrap$Grid$Internal$columnCountOption = function (size) {
	switch (size.$) {
		case 'Col':
			return $elm$core$Maybe$Nothing;
		case 'Col1':
			return $elm$core$Maybe$Just('1');
		case 'Col2':
			return $elm$core$Maybe$Just('2');
		case 'Col3':
			return $elm$core$Maybe$Just('3');
		case 'Col4':
			return $elm$core$Maybe$Just('4');
		case 'Col5':
			return $elm$core$Maybe$Just('5');
		case 'Col6':
			return $elm$core$Maybe$Just('6');
		case 'Col7':
			return $elm$core$Maybe$Just('7');
		case 'Col8':
			return $elm$core$Maybe$Just('8');
		case 'Col9':
			return $elm$core$Maybe$Just('9');
		case 'Col10':
			return $elm$core$Maybe$Just('10');
		case 'Col11':
			return $elm$core$Maybe$Just('11');
		case 'Col12':
			return $elm$core$Maybe$Just('12');
		default:
			return $elm$core$Maybe$Just('auto');
	}
};
var $rundis$elm_bootstrap$Bootstrap$Grid$Internal$colWidthClass = function (_v0) {
	var screenSize = _v0.screenSize;
	var columnCount = _v0.columnCount;
	return $elm$html$Html$Attributes$class(
		'col' + (A2(
			$elm$core$Maybe$withDefault,
			'',
			A2(
				$elm$core$Maybe$map,
				function (v) {
					return '-' + v;
				},
				$rundis$elm_bootstrap$Bootstrap$General$Internal$screenSizeOption(screenSize))) + A2(
			$elm$core$Maybe$withDefault,
			'',
			A2(
				$elm$core$Maybe$map,
				function (v) {
					return '-' + v;
				},
				$rundis$elm_bootstrap$Bootstrap$Grid$Internal$columnCountOption(columnCount)))));
};
var $rundis$elm_bootstrap$Bootstrap$Grid$Internal$colWidthsToAttributes = function (widths) {
	var width_ = function (w) {
		return A2($elm$core$Maybe$map, $rundis$elm_bootstrap$Bootstrap$Grid$Internal$colWidthClass, w);
	};
	return A2(
		$elm$core$List$filterMap,
		$elm$core$Basics$identity,
		A2($elm$core$List$map, width_, widths));
};
var $rundis$elm_bootstrap$Bootstrap$Grid$Internal$defaultColOptions = {alignLg: $elm$core$Maybe$Nothing, alignMd: $elm$core$Maybe$Nothing, alignSm: $elm$core$Maybe$Nothing, alignXl: $elm$core$Maybe$Nothing, alignXs: $elm$core$Maybe$Nothing, attributes: _List_Nil, offsetLg: $elm$core$Maybe$Nothing, offsetMd: $elm$core$Maybe$Nothing, offsetSm: $elm$core$Maybe$Nothing, offsetXl: $elm$core$Maybe$Nothing, offsetXs: $elm$core$Maybe$Nothing, orderLg: $elm$core$Maybe$Nothing, orderMd: $elm$core$Maybe$Nothing, orderSm: $elm$core$Maybe$Nothing, orderXl: $elm$core$Maybe$Nothing, orderXs: $elm$core$Maybe$Nothing, pullLg: $elm$core$Maybe$Nothing, pullMd: $elm$core$Maybe$Nothing, pullSm: $elm$core$Maybe$Nothing, pullXl: $elm$core$Maybe$Nothing, pullXs: $elm$core$Maybe$Nothing, pushLg: $elm$core$Maybe$Nothing, pushMd: $elm$core$Maybe$Nothing, pushSm: $elm$core$Maybe$Nothing, pushXl: $elm$core$Maybe$Nothing, pushXs: $elm$core$Maybe$Nothing, textAlign: $elm$core$Maybe$Nothing, widthLg: $elm$core$Maybe$Nothing, widthMd: $elm$core$Maybe$Nothing, widthSm: $elm$core$Maybe$Nothing, widthXl: $elm$core$Maybe$Nothing, widthXs: $elm$core$Maybe$Nothing};
var $rundis$elm_bootstrap$Bootstrap$Grid$Internal$offsetCountOption = function (size) {
	switch (size.$) {
		case 'Offset0':
			return '0';
		case 'Offset1':
			return '1';
		case 'Offset2':
			return '2';
		case 'Offset3':
			return '3';
		case 'Offset4':
			return '4';
		case 'Offset5':
			return '5';
		case 'Offset6':
			return '6';
		case 'Offset7':
			return '7';
		case 'Offset8':
			return '8';
		case 'Offset9':
			return '9';
		case 'Offset10':
			return '10';
		default:
			return '11';
	}
};
var $rundis$elm_bootstrap$Bootstrap$Grid$Internal$screenSizeToPartialString = function (screenSize) {
	var _v0 = $rundis$elm_bootstrap$Bootstrap$General$Internal$screenSizeOption(screenSize);
	if (_v0.$ === 'Just') {
		var s = _v0.a;
		return '-' + (s + '-');
	} else {
		return '-';
	}
};
var $rundis$elm_bootstrap$Bootstrap$Grid$Internal$offsetClass = function (_v0) {
	var screenSize = _v0.screenSize;
	var offsetCount = _v0.offsetCount;
	return $elm$html$Html$Attributes$class(
		'offset' + ($rundis$elm_bootstrap$Bootstrap$Grid$Internal$screenSizeToPartialString(screenSize) + $rundis$elm_bootstrap$Bootstrap$Grid$Internal$offsetCountOption(offsetCount)));
};
var $rundis$elm_bootstrap$Bootstrap$Grid$Internal$offsetsToAttributes = function (offsets) {
	var offset_ = function (m) {
		return A2($elm$core$Maybe$map, $rundis$elm_bootstrap$Bootstrap$Grid$Internal$offsetClass, m);
	};
	return A2(
		$elm$core$List$filterMap,
		$elm$core$Basics$identity,
		A2($elm$core$List$map, offset_, offsets));
};
var $rundis$elm_bootstrap$Bootstrap$Grid$Internal$orderColOption = function (size) {
	switch (size.$) {
		case 'OrderFirst':
			return 'first';
		case 'Order1':
			return '1';
		case 'Order2':
			return '2';
		case 'Order3':
			return '3';
		case 'Order4':
			return '4';
		case 'Order5':
			return '5';
		case 'Order6':
			return '6';
		case 'Order7':
			return '7';
		case 'Order8':
			return '8';
		case 'Order9':
			return '9';
		case 'Order10':
			return '10';
		case 'Order11':
			return '11';
		case 'Order12':
			return '12';
		default:
			return 'last';
	}
};
var $rundis$elm_bootstrap$Bootstrap$Grid$Internal$orderToAttributes = function (orders) {
	var order_ = function (m) {
		if (m.$ === 'Just') {
			var screenSize = m.a.screenSize;
			var moveCount = m.a.moveCount;
			return $elm$core$Maybe$Just(
				$elm$html$Html$Attributes$class(
					'order' + ($rundis$elm_bootstrap$Bootstrap$Grid$Internal$screenSizeToPartialString(screenSize) + $rundis$elm_bootstrap$Bootstrap$Grid$Internal$orderColOption(moveCount))));
		} else {
			return $elm$core$Maybe$Nothing;
		}
	};
	return A2(
		$elm$core$List$filterMap,
		$elm$core$Basics$identity,
		A2($elm$core$List$map, order_, orders));
};
var $rundis$elm_bootstrap$Bootstrap$Grid$Internal$moveCountOption = function (size) {
	switch (size.$) {
		case 'Move0':
			return '0';
		case 'Move1':
			return '1';
		case 'Move2':
			return '2';
		case 'Move3':
			return '3';
		case 'Move4':
			return '4';
		case 'Move5':
			return '5';
		case 'Move6':
			return '6';
		case 'Move7':
			return '7';
		case 'Move8':
			return '8';
		case 'Move9':
			return '9';
		case 'Move10':
			return '10';
		case 'Move11':
			return '11';
		default:
			return '12';
	}
};
var $rundis$elm_bootstrap$Bootstrap$Grid$Internal$pullsToAttributes = function (pulls) {
	var pull_ = function (m) {
		if (m.$ === 'Just') {
			var screenSize = m.a.screenSize;
			var moveCount = m.a.moveCount;
			return $elm$core$Maybe$Just(
				$elm$html$Html$Attributes$class(
					'pull' + ($rundis$elm_bootstrap$Bootstrap$Grid$Internal$screenSizeToPartialString(screenSize) + $rundis$elm_bootstrap$Bootstrap$Grid$Internal$moveCountOption(moveCount))));
		} else {
			return $elm$core$Maybe$Nothing;
		}
	};
	return A2(
		$elm$core$List$filterMap,
		$elm$core$Basics$identity,
		A2($elm$core$List$map, pull_, pulls));
};
var $rundis$elm_bootstrap$Bootstrap$Grid$Internal$pushesToAttributes = function (pushes) {
	var push_ = function (m) {
		if (m.$ === 'Just') {
			var screenSize = m.a.screenSize;
			var moveCount = m.a.moveCount;
			return $elm$core$Maybe$Just(
				$elm$html$Html$Attributes$class(
					'push' + ($rundis$elm_bootstrap$Bootstrap$Grid$Internal$screenSizeToPartialString(screenSize) + $rundis$elm_bootstrap$Bootstrap$Grid$Internal$moveCountOption(moveCount))));
		} else {
			return $elm$core$Maybe$Nothing;
		}
	};
	return A2(
		$elm$core$List$filterMap,
		$elm$core$Basics$identity,
		A2($elm$core$List$map, push_, pushes));
};
var $rundis$elm_bootstrap$Bootstrap$Grid$Internal$verticalAlignOption = function (align) {
	switch (align.$) {
		case 'Top':
			return 'start';
		case 'Middle':
			return 'center';
		default:
			return 'end';
	}
};
var $rundis$elm_bootstrap$Bootstrap$Grid$Internal$vAlignClass = F2(
	function (prefix, _v0) {
		var align = _v0.align;
		var screenSize = _v0.screenSize;
		return $elm$html$Html$Attributes$class(
			_Utils_ap(
				prefix,
				_Utils_ap(
					A2(
						$elm$core$Maybe$withDefault,
						'',
						A2(
							$elm$core$Maybe$map,
							function (v) {
								return v + '-';
							},
							$rundis$elm_bootstrap$Bootstrap$General$Internal$screenSizeOption(screenSize))),
					$rundis$elm_bootstrap$Bootstrap$Grid$Internal$verticalAlignOption(align))));
	});
var $rundis$elm_bootstrap$Bootstrap$Grid$Internal$vAlignsToAttributes = F2(
	function (prefix, aligns) {
		var align = function (a) {
			return A2(
				$elm$core$Maybe$map,
				$rundis$elm_bootstrap$Bootstrap$Grid$Internal$vAlignClass(prefix),
				a);
		};
		return A2(
			$elm$core$List$filterMap,
			$elm$core$Basics$identity,
			A2($elm$core$List$map, align, aligns));
	});
var $rundis$elm_bootstrap$Bootstrap$Grid$Internal$colAttributes = function (modifiers) {
	var options = A3($elm$core$List$foldl, $rundis$elm_bootstrap$Bootstrap$Grid$Internal$applyColOption, $rundis$elm_bootstrap$Bootstrap$Grid$Internal$defaultColOptions, modifiers);
	var shouldAddDefaultXs = !$elm$core$List$length(
		A2(
			$elm$core$List$filterMap,
			$elm$core$Basics$identity,
			_List_fromArray(
				[options.widthXs, options.widthSm, options.widthMd, options.widthLg, options.widthXl])));
	return _Utils_ap(
		$rundis$elm_bootstrap$Bootstrap$Grid$Internal$colWidthsToAttributes(
			_List_fromArray(
				[
					shouldAddDefaultXs ? $elm$core$Maybe$Just(
					A2($rundis$elm_bootstrap$Bootstrap$Grid$Internal$Width, $rundis$elm_bootstrap$Bootstrap$General$Internal$XS, $rundis$elm_bootstrap$Bootstrap$Grid$Internal$Col)) : options.widthXs,
					options.widthSm,
					options.widthMd,
					options.widthLg,
					options.widthXl
				])),
		_Utils_ap(
			$rundis$elm_bootstrap$Bootstrap$Grid$Internal$offsetsToAttributes(
				_List_fromArray(
					[options.offsetXs, options.offsetSm, options.offsetMd, options.offsetLg, options.offsetXl])),
			_Utils_ap(
				$rundis$elm_bootstrap$Bootstrap$Grid$Internal$pullsToAttributes(
					_List_fromArray(
						[options.pullXs, options.pullSm, options.pullMd, options.pullLg, options.pullXl])),
				_Utils_ap(
					$rundis$elm_bootstrap$Bootstrap$Grid$Internal$pushesToAttributes(
						_List_fromArray(
							[options.pushXs, options.pushSm, options.pushMd, options.pushLg, options.pushXl])),
					_Utils_ap(
						$rundis$elm_bootstrap$Bootstrap$Grid$Internal$orderToAttributes(
							_List_fromArray(
								[options.orderXs, options.orderSm, options.orderMd, options.orderLg, options.orderXl])),
						_Utils_ap(
							A2(
								$rundis$elm_bootstrap$Bootstrap$Grid$Internal$vAlignsToAttributes,
								'align-self-',
								_List_fromArray(
									[options.alignXs, options.alignSm, options.alignMd, options.alignLg, options.alignXl])),
							_Utils_ap(
								function () {
									var _v0 = options.textAlign;
									if (_v0.$ === 'Just') {
										var a = _v0.a;
										return _List_fromArray(
											[
												$rundis$elm_bootstrap$Bootstrap$Internal$Text$textAlignClass(a)
											]);
									} else {
										return _List_Nil;
									}
								}(),
								options.attributes)))))));
};
var $elm$virtual_dom$VirtualDom$keyedNode = function (tag) {
	return _VirtualDom_keyedNode(
		_VirtualDom_noScript(tag));
};
var $elm$html$Html$Keyed$node = $elm$virtual_dom$VirtualDom$keyedNode;
var $rundis$elm_bootstrap$Bootstrap$Grid$renderCol = function (column) {
	switch (column.$) {
		case 'Column':
			var options = column.a.options;
			var children = column.a.children;
			return A2(
				$elm$html$Html$div,
				$rundis$elm_bootstrap$Bootstrap$Grid$Internal$colAttributes(options),
				children);
		case 'ColBreak':
			var e = column.a;
			return e;
		default:
			var options = column.a.options;
			var children = column.a.children;
			return A3(
				$elm$html$Html$Keyed$node,
				'div',
				$rundis$elm_bootstrap$Bootstrap$Grid$Internal$colAttributes(options),
				children);
	}
};
var $rundis$elm_bootstrap$Bootstrap$Grid$Internal$applyRowHAlign = F2(
	function (align, options) {
		var _v0 = align.screenSize;
		switch (_v0.$) {
			case 'XS':
				return _Utils_update(
					options,
					{
						hAlignXs: $elm$core$Maybe$Just(align)
					});
			case 'SM':
				return _Utils_update(
					options,
					{
						hAlignSm: $elm$core$Maybe$Just(align)
					});
			case 'MD':
				return _Utils_update(
					options,
					{
						hAlignMd: $elm$core$Maybe$Just(align)
					});
			case 'LG':
				return _Utils_update(
					options,
					{
						hAlignLg: $elm$core$Maybe$Just(align)
					});
			default:
				return _Utils_update(
					options,
					{
						hAlignXl: $elm$core$Maybe$Just(align)
					});
		}
	});
var $rundis$elm_bootstrap$Bootstrap$Grid$Internal$applyRowVAlign = F2(
	function (align_, options) {
		var _v0 = align_.screenSize;
		switch (_v0.$) {
			case 'XS':
				return _Utils_update(
					options,
					{
						vAlignXs: $elm$core$Maybe$Just(align_)
					});
			case 'SM':
				return _Utils_update(
					options,
					{
						vAlignSm: $elm$core$Maybe$Just(align_)
					});
			case 'MD':
				return _Utils_update(
					options,
					{
						vAlignMd: $elm$core$Maybe$Just(align_)
					});
			case 'LG':
				return _Utils_update(
					options,
					{
						vAlignLg: $elm$core$Maybe$Just(align_)
					});
			default:
				return _Utils_update(
					options,
					{
						vAlignXl: $elm$core$Maybe$Just(align_)
					});
		}
	});
var $rundis$elm_bootstrap$Bootstrap$Grid$Internal$applyRowOption = F2(
	function (modifier, options) {
		switch (modifier.$) {
			case 'RowAttrs':
				var attrs = modifier.a;
				return _Utils_update(
					options,
					{
						attributes: _Utils_ap(options.attributes, attrs)
					});
			case 'RowVAlign':
				var align = modifier.a;
				return A2($rundis$elm_bootstrap$Bootstrap$Grid$Internal$applyRowVAlign, align, options);
			default:
				var align = modifier.a;
				return A2($rundis$elm_bootstrap$Bootstrap$Grid$Internal$applyRowHAlign, align, options);
		}
	});
var $rundis$elm_bootstrap$Bootstrap$Grid$Internal$defaultRowOptions = {attributes: _List_Nil, hAlignLg: $elm$core$Maybe$Nothing, hAlignMd: $elm$core$Maybe$Nothing, hAlignSm: $elm$core$Maybe$Nothing, hAlignXl: $elm$core$Maybe$Nothing, hAlignXs: $elm$core$Maybe$Nothing, vAlignLg: $elm$core$Maybe$Nothing, vAlignMd: $elm$core$Maybe$Nothing, vAlignSm: $elm$core$Maybe$Nothing, vAlignXl: $elm$core$Maybe$Nothing, vAlignXs: $elm$core$Maybe$Nothing};
var $rundis$elm_bootstrap$Bootstrap$General$Internal$horizontalAlignOption = function (align) {
	switch (align.$) {
		case 'Left':
			return 'start';
		case 'Center':
			return 'center';
		case 'Right':
			return 'end';
		case 'Around':
			return 'around';
		default:
			return 'between';
	}
};
var $rundis$elm_bootstrap$Bootstrap$General$Internal$hAlignClass = function (_v0) {
	var align = _v0.align;
	var screenSize = _v0.screenSize;
	return $elm$html$Html$Attributes$class(
		'justify-content-' + (A2(
			$elm$core$Maybe$withDefault,
			'',
			A2(
				$elm$core$Maybe$map,
				function (v) {
					return v + '-';
				},
				$rundis$elm_bootstrap$Bootstrap$General$Internal$screenSizeOption(screenSize))) + $rundis$elm_bootstrap$Bootstrap$General$Internal$horizontalAlignOption(align)));
};
var $rundis$elm_bootstrap$Bootstrap$Grid$Internal$hAlignsToAttributes = function (aligns) {
	var align = function (a) {
		return A2($elm$core$Maybe$map, $rundis$elm_bootstrap$Bootstrap$General$Internal$hAlignClass, a);
	};
	return A2(
		$elm$core$List$filterMap,
		$elm$core$Basics$identity,
		A2($elm$core$List$map, align, aligns));
};
var $rundis$elm_bootstrap$Bootstrap$Grid$Internal$rowAttributes = function (modifiers) {
	var options = A3($elm$core$List$foldl, $rundis$elm_bootstrap$Bootstrap$Grid$Internal$applyRowOption, $rundis$elm_bootstrap$Bootstrap$Grid$Internal$defaultRowOptions, modifiers);
	return _Utils_ap(
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('row')
			]),
		_Utils_ap(
			A2(
				$rundis$elm_bootstrap$Bootstrap$Grid$Internal$vAlignsToAttributes,
				'align-items-',
				_List_fromArray(
					[options.vAlignXs, options.vAlignSm, options.vAlignMd, options.vAlignLg, options.vAlignXl])),
			_Utils_ap(
				$rundis$elm_bootstrap$Bootstrap$Grid$Internal$hAlignsToAttributes(
					_List_fromArray(
						[options.hAlignXs, options.hAlignSm, options.hAlignMd, options.hAlignLg, options.hAlignXl])),
				options.attributes)));
};
var $rundis$elm_bootstrap$Bootstrap$Grid$row = F2(
	function (options, cols) {
		return A2(
			$elm$html$Html$div,
			$rundis$elm_bootstrap$Bootstrap$Grid$Internal$rowAttributes(options),
			A2($elm$core$List$map, $rundis$elm_bootstrap$Bootstrap$Grid$renderCol, cols));
	});
var $author$project$Main$showLoginStatus = function (status) {
	switch (status.$) {
		case 'LoginOff':
			return 'Not logged in yet.';
		case 'LoginFail':
			return 'Login failed.';
		case 'LoginSuccess':
			return 'You are logged in.';
		case 'RegisterSuccess':
			return 'User registration succeeded.';
		case 'RegisterFail':
			return 'User registration failed.';
		default:
			return 'Confirmation password does not match';
	}
};
var $elm$virtual_dom$VirtualDom$node = function (tag) {
	return _VirtualDom_node(
		_VirtualDom_noScript(tag));
};
var $elm$html$Html$node = $elm$virtual_dom$VirtualDom$node;
var $elm$html$Html$Attributes$rel = _VirtualDom_attribute('rel');
var $rundis$elm_bootstrap$Bootstrap$CDN$stylesheet = A3(
	$elm$html$Html$node,
	'link',
	_List_fromArray(
		[
			$elm$html$Html$Attributes$rel('stylesheet'),
			$elm$html$Html$Attributes$href('https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css')
		]),
	_List_Nil);
var $elm$html$Html$p = _VirtualDom_node('p');
var $rundis$elm_bootstrap$Bootstrap$Card$Block$text = F2(
	function (attributes, children) {
		return $rundis$elm_bootstrap$Bootstrap$Card$Internal$BlockItem(
			A2(
				$elm$html$Html$p,
				_Utils_ap(
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('card-text')
						]),
					attributes),
				children));
	});
var $rundis$elm_bootstrap$Bootstrap$Form$Input$text = $rundis$elm_bootstrap$Bootstrap$Form$Input$input($rundis$elm_bootstrap$Bootstrap$Form$Input$Text);
var $elm$virtual_dom$VirtualDom$text = _VirtualDom_text;
var $elm$html$Html$text = $elm$virtual_dom$VirtualDom$text;
var $rundis$elm_bootstrap$Bootstrap$Card$Block$title = F3(
	function (elemFn, attributes, children) {
		return $rundis$elm_bootstrap$Bootstrap$Card$Internal$BlockItem(
			A2(
				elemFn,
				A2(
					$elm$core$List$cons,
					$elm$html$Html$Attributes$class('card-title'),
					attributes),
				children));
	});
var $rundis$elm_bootstrap$Bootstrap$Card$Block$titleH4 = $rundis$elm_bootstrap$Bootstrap$Card$Block$title($elm$html$Html$h4);
var $rundis$elm_bootstrap$Bootstrap$Form$Input$Value = function (a) {
	return {$: 'Value', a: a};
};
var $rundis$elm_bootstrap$Bootstrap$Form$Input$value = function (value_) {
	return $rundis$elm_bootstrap$Bootstrap$Form$Input$Value(value_);
};
var $rundis$elm_bootstrap$Bootstrap$Card$Internal$applyModifier = F2(
	function (option, options) {
		switch (option.$) {
			case 'Aligned':
				var align = option.a;
				return _Utils_update(
					options,
					{
						aligned: $elm$core$Maybe$Just(align)
					});
			case 'Coloring':
				var coloring = option.a;
				return _Utils_update(
					options,
					{
						coloring: $elm$core$Maybe$Just(coloring)
					});
			case 'TextColoring':
				var coloring = option.a;
				return _Utils_update(
					options,
					{
						textColoring: $elm$core$Maybe$Just(coloring)
					});
			default:
				var attrs = option.a;
				return _Utils_update(
					options,
					{
						attributes: _Utils_ap(options.attributes, attrs)
					});
		}
	});
var $rundis$elm_bootstrap$Bootstrap$Card$Internal$defaultOptions = {aligned: $elm$core$Maybe$Nothing, attributes: _List_Nil, coloring: $elm$core$Maybe$Nothing, textColoring: $elm$core$Maybe$Nothing};
var $rundis$elm_bootstrap$Bootstrap$Card$Internal$cardAttributes = function (modifiers) {
	var options = A3($elm$core$List$foldl, $rundis$elm_bootstrap$Bootstrap$Card$Internal$applyModifier, $rundis$elm_bootstrap$Bootstrap$Card$Internal$defaultOptions, modifiers);
	return _Utils_ap(
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('card')
			]),
		_Utils_ap(
			function () {
				var _v0 = options.coloring;
				if (_v0.$ === 'Just') {
					if (_v0.a.$ === 'Roled') {
						var role = _v0.a.a;
						return _List_fromArray(
							[
								A2($rundis$elm_bootstrap$Bootstrap$Internal$Role$toClass, 'bg', role)
							]);
					} else {
						var role = _v0.a.a;
						return _List_fromArray(
							[
								A2($rundis$elm_bootstrap$Bootstrap$Internal$Role$toClass, 'border', role)
							]);
					}
				} else {
					return _List_Nil;
				}
			}(),
			_Utils_ap(
				function () {
					var _v1 = options.textColoring;
					if (_v1.$ === 'Just') {
						var color = _v1.a;
						return _List_fromArray(
							[
								$rundis$elm_bootstrap$Bootstrap$Internal$Text$textColorClass(color)
							]);
					} else {
						return _List_Nil;
					}
				}(),
				_Utils_ap(
					function () {
						var _v2 = options.aligned;
						if (_v2.$ === 'Just') {
							var align = _v2.a;
							return _List_fromArray(
								[
									$rundis$elm_bootstrap$Bootstrap$Internal$Text$textAlignClass(align)
								]);
						} else {
							return _List_Nil;
						}
					}(),
					options.attributes))));
};
var $rundis$elm_bootstrap$Bootstrap$Card$Internal$renderBlocks = function (blocks) {
	return A2(
		$elm$core$List$map,
		function (block_) {
			if (block_.$ === 'CardBlock') {
				var e = block_.a;
				return e;
			} else {
				var e = block_.a;
				return e;
			}
		},
		blocks);
};
var $rundis$elm_bootstrap$Bootstrap$Card$view = function (_v0) {
	var conf = _v0.a;
	return A2(
		$elm$html$Html$div,
		$rundis$elm_bootstrap$Bootstrap$Card$Internal$cardAttributes(conf.options),
		_Utils_ap(
			A2(
				$elm$core$List$filterMap,
				$elm$core$Basics$identity,
				_List_fromArray(
					[
						A2(
						$elm$core$Maybe$map,
						function (_v1) {
							var e = _v1.a;
							return e;
						},
						conf.header),
						A2(
						$elm$core$Maybe$map,
						function (_v2) {
							var e = _v2.a;
							return e;
						},
						conf.imgTop)
					])),
			_Utils_ap(
				$rundis$elm_bootstrap$Bootstrap$Card$Internal$renderBlocks(conf.blocks),
				A2(
					$elm$core$List$filterMap,
					$elm$core$Basics$identity,
					_List_fromArray(
						[
							A2(
							$elm$core$Maybe$map,
							function (_v3) {
								var e = _v3.a;
								return e;
							},
							conf.footer),
							A2(
							$elm$core$Maybe$map,
							function (_v4) {
								var e = _v4.a;
								return e;
							},
							conf.imgBottom)
						])))));
};
var $rundis$elm_bootstrap$Bootstrap$Grid$Internal$Col12 = {$: 'Col12'};
var $rundis$elm_bootstrap$Bootstrap$Grid$Col$xs12 = A2($rundis$elm_bootstrap$Bootstrap$Grid$Internal$width, $rundis$elm_bootstrap$Bootstrap$General$Internal$XS, $rundis$elm_bootstrap$Bootstrap$Grid$Internal$Col12);
var $rundis$elm_bootstrap$Bootstrap$Grid$Col$xs8 = A2($rundis$elm_bootstrap$Bootstrap$Grid$Internal$width, $rundis$elm_bootstrap$Bootstrap$General$Internal$XS, $rundis$elm_bootstrap$Bootstrap$Grid$Internal$Col8);
var $author$project$Main$viewLogin = function (model) {
	return A2(
		$rundis$elm_bootstrap$Bootstrap$Grid$container,
		_List_Nil,
		_List_fromArray(
			[
				$rundis$elm_bootstrap$Bootstrap$CDN$stylesheet,
				A2(
				$rundis$elm_bootstrap$Bootstrap$Grid$row,
				_List_fromArray(
					[$rundis$elm_bootstrap$Bootstrap$Grid$Row$centerXs]),
				_List_fromArray(
					[
						A2(
						$rundis$elm_bootstrap$Bootstrap$Grid$col,
						_List_fromArray(
							[$rundis$elm_bootstrap$Bootstrap$Grid$Col$xs12, $rundis$elm_bootstrap$Bootstrap$Grid$Col$lg8]),
						_List_fromArray(
							[
								$rundis$elm_bootstrap$Bootstrap$Card$view(
								A3(
									$rundis$elm_bootstrap$Bootstrap$Card$block,
									_List_Nil,
									_List_fromArray(
										[
											A2(
											$rundis$elm_bootstrap$Bootstrap$Card$Block$text,
											_List_Nil,
											_List_fromArray(
												[
													$elm$html$Html$text(
													$author$project$Main$showLoginStatus(model.loginStatus))
												])),
											A2(
											$rundis$elm_bootstrap$Bootstrap$Card$Block$text,
											_List_Nil,
											_List_fromArray(
												[
													$elm$html$Html$text(model.statusReason)
												]))
										]),
									A3(
										$rundis$elm_bootstrap$Bootstrap$Card$block,
										_List_fromArray(
											[
												$rundis$elm_bootstrap$Bootstrap$Card$Block$align($rundis$elm_bootstrap$Bootstrap$Text$alignXsRight)
											]),
										_List_fromArray(
											[
												A2(
												$rundis$elm_bootstrap$Bootstrap$Card$Block$link,
												_List_fromArray(
													[
														$elm$html$Html$Attributes$href('#'),
														$elm$html$Html$Events$onClick($author$project$Main$ToggleRegister)
													]),
												_List_fromArray(
													[
														$elm$html$Html$text('New Registration')
													]))
											]),
										A3(
											$rundis$elm_bootstrap$Bootstrap$Card$block,
											_List_Nil,
											_List_fromArray(
												[
													A2(
													$rundis$elm_bootstrap$Bootstrap$Card$Block$titleH4,
													_List_Nil,
													_List_fromArray(
														[
															$elm$html$Html$text('Login')
														])),
													$rundis$elm_bootstrap$Bootstrap$Card$Block$custom(
													A2(
														$rundis$elm_bootstrap$Bootstrap$Grid$containerFluid,
														_List_Nil,
														_List_fromArray(
															[
																A2(
																$rundis$elm_bootstrap$Bootstrap$Grid$row,
																_List_fromArray(
																	[$rundis$elm_bootstrap$Bootstrap$Grid$Row$leftLg]),
																_List_fromArray(
																	[
																		A2(
																		$rundis$elm_bootstrap$Bootstrap$Grid$col,
																		_List_fromArray(
																			[$rundis$elm_bootstrap$Bootstrap$Grid$Col$xs8, $rundis$elm_bootstrap$Bootstrap$Grid$Col$lg4]),
																		_List_fromArray(
																			[
																				A2(
																				$rundis$elm_bootstrap$Bootstrap$Form$form,
																				_List_fromArray(
																					[$rundis$elm_bootstrap$Bootstrap$Utilities$Spacing$mb3]),
																				_List_fromArray(
																					[
																						A2(
																						$rundis$elm_bootstrap$Bootstrap$Form$label,
																						_List_Nil,
																						_List_fromArray(
																							[
																								$elm$html$Html$text('User ID')
																							])),
																						$rundis$elm_bootstrap$Bootstrap$Form$Input$text(
																						_List_fromArray(
																							[
																								$rundis$elm_bootstrap$Bootstrap$Form$Input$placeholder('User ID'),
																								$rundis$elm_bootstrap$Bootstrap$Form$Input$value(model.inputCred.user_id),
																								$rundis$elm_bootstrap$Bootstrap$Form$Input$onInput(
																								$author$project$Main$FormInput($author$project$Main$Fuser_id))
																							]))
																					]))
																			])),
																		A2(
																		$rundis$elm_bootstrap$Bootstrap$Grid$col,
																		_List_fromArray(
																			[$rundis$elm_bootstrap$Bootstrap$Grid$Col$xs8, $rundis$elm_bootstrap$Bootstrap$Grid$Col$lg4]),
																		_List_fromArray(
																			[
																				A2(
																				$rundis$elm_bootstrap$Bootstrap$Form$form,
																				_List_fromArray(
																					[$rundis$elm_bootstrap$Bootstrap$Utilities$Spacing$mb3]),
																				_List_fromArray(
																					[
																						A2(
																						$rundis$elm_bootstrap$Bootstrap$Form$label,
																						_List_Nil,
																						_List_fromArray(
																							[
																								$elm$html$Html$text('Password')
																							])),
																						$rundis$elm_bootstrap$Bootstrap$Form$Input$password(
																						_List_fromArray(
																							[
																								$rundis$elm_bootstrap$Bootstrap$Form$Input$placeholder('Password'),
																								$rundis$elm_bootstrap$Bootstrap$Form$Input$value(model.inputCred.password),
																								$rundis$elm_bootstrap$Bootstrap$Form$Input$onInput(
																								$author$project$Main$FormInput($author$project$Main$Fpass))
																							]))
																					]))
																			])),
																		A2(
																		$rundis$elm_bootstrap$Bootstrap$Grid$col,
																		_List_fromArray(
																			[$rundis$elm_bootstrap$Bootstrap$Grid$Col$xs8, $rundis$elm_bootstrap$Bootstrap$Grid$Col$lg4, $rundis$elm_bootstrap$Bootstrap$Grid$Col$bottomLg]),
																		_List_fromArray(
																			[
																				A2(
																				$rundis$elm_bootstrap$Bootstrap$Button$button,
																				_List_fromArray(
																					[
																						$rundis$elm_bootstrap$Bootstrap$Button$attrs(
																						_List_fromArray(
																							[$rundis$elm_bootstrap$Bootstrap$Utilities$Spacing$mb3])),
																						$rundis$elm_bootstrap$Bootstrap$Button$primary,
																						$rundis$elm_bootstrap$Bootstrap$Button$onClick($author$project$Main$Login)
																					]),
																				_List_fromArray(
																					[
																						$elm$html$Html$text('Login')
																					]))
																			]))
																	]))
															])))
												]),
											A3(
												$rundis$elm_bootstrap$Bootstrap$Card$headerH4,
												_List_Nil,
												_List_fromArray(
													[
														$elm$html$Html$text('BGC')
													]),
												$rundis$elm_bootstrap$Bootstrap$Card$config(
													_List_fromArray(
														[$rundis$elm_bootstrap$Bootstrap$Card$outlineLight])))))))
							]))
					]))
			]));
};
var $author$project$Main$CreateGame = {$: 'CreateGame'};
var $author$project$Main$Fevent_id = {$: 'Fevent_id'};
var $elm$html$Html$h6 = _VirtualDom_node('h6');
var $rundis$elm_bootstrap$Bootstrap$Card$headerH6 = $rundis$elm_bootstrap$Bootstrap$Card$headerPrivate($elm$html$Html$h6);
var $rundis$elm_bootstrap$Bootstrap$Grid$Internal$Col5 = {$: 'Col5'};
var $rundis$elm_bootstrap$Bootstrap$Grid$Col$lg5 = A2($rundis$elm_bootstrap$Bootstrap$Grid$Internal$width, $rundis$elm_bootstrap$Bootstrap$General$Internal$LG, $rundis$elm_bootstrap$Bootstrap$Grid$Internal$Col5);
var $rundis$elm_bootstrap$Bootstrap$Grid$Internal$Col6 = {$: 'Col6'};
var $rundis$elm_bootstrap$Bootstrap$Grid$Col$lg6 = A2($rundis$elm_bootstrap$Bootstrap$Grid$Internal$width, $rundis$elm_bootstrap$Bootstrap$General$Internal$LG, $rundis$elm_bootstrap$Bootstrap$Grid$Internal$Col6);
var $rundis$elm_bootstrap$Bootstrap$Internal$Button$Secondary = {$: 'Secondary'};
var $rundis$elm_bootstrap$Bootstrap$Button$secondary = $rundis$elm_bootstrap$Bootstrap$Internal$Button$Coloring(
	$rundis$elm_bootstrap$Bootstrap$Internal$Button$Roled($rundis$elm_bootstrap$Bootstrap$Internal$Button$Secondary));
var $rundis$elm_bootstrap$Bootstrap$Grid$Internal$Col10 = {$: 'Col10'};
var $rundis$elm_bootstrap$Bootstrap$Grid$Col$xs10 = A2($rundis$elm_bootstrap$Bootstrap$Grid$Internal$width, $rundis$elm_bootstrap$Bootstrap$General$Internal$XS, $rundis$elm_bootstrap$Bootstrap$Grid$Internal$Col10);
var $author$project$Main$viewBegin = F2(
	function (model, tn) {
		return A2(
			$rundis$elm_bootstrap$Bootstrap$Grid$row,
			_List_fromArray(
				[$rundis$elm_bootstrap$Bootstrap$Grid$Row$centerXs]),
			_List_fromArray(
				[
					A2(
					$rundis$elm_bootstrap$Bootstrap$Grid$col,
					_List_fromArray(
						[$rundis$elm_bootstrap$Bootstrap$Grid$Col$xs10, $rundis$elm_bootstrap$Bootstrap$Grid$Col$lg6]),
					_List_fromArray(
						[
							$rundis$elm_bootstrap$Bootstrap$Card$view(
							A3(
								$rundis$elm_bootstrap$Bootstrap$Card$block,
								_List_Nil,
								_List_fromArray(
									[
										A2(
										$rundis$elm_bootstrap$Bootstrap$Card$Block$text,
										_List_Nil,
										_List_fromArray(
											[
												$elm$html$Html$text('Create a new game as a host')
											])),
										$rundis$elm_bootstrap$Bootstrap$Card$Block$custom(
										A2(
											$rundis$elm_bootstrap$Bootstrap$Button$button,
											_List_fromArray(
												[
													$rundis$elm_bootstrap$Bootstrap$Button$secondary,
													$rundis$elm_bootstrap$Bootstrap$Button$onClick($author$project$Main$CreateGame)
												]),
											_List_fromArray(
												[
													$elm$html$Html$text('Start a new game')
												])))
									]),
								A3(
									$rundis$elm_bootstrap$Bootstrap$Card$headerH6,
									_List_Nil,
									_List_fromArray(
										[
											$elm$html$Html$text('Create')
										]),
									$rundis$elm_bootstrap$Bootstrap$Card$config(
										_List_fromArray(
											[$rundis$elm_bootstrap$Bootstrap$Card$outlineLight])))))
						])),
					A2(
					$rundis$elm_bootstrap$Bootstrap$Grid$col,
					_List_fromArray(
						[$rundis$elm_bootstrap$Bootstrap$Grid$Col$xs10, $rundis$elm_bootstrap$Bootstrap$Grid$Col$lg6]),
					_List_fromArray(
						[
							$rundis$elm_bootstrap$Bootstrap$Card$view(
							A3(
								$rundis$elm_bootstrap$Bootstrap$Card$block,
								_List_Nil,
								_List_fromArray(
									[
										$rundis$elm_bootstrap$Bootstrap$Card$Block$custom(
										A2(
											$rundis$elm_bootstrap$Bootstrap$Grid$containerFluid,
											_List_Nil,
											_List_fromArray(
												[
													A2(
													$rundis$elm_bootstrap$Bootstrap$Grid$row,
													_List_Nil,
													_List_fromArray(
														[
															A2(
															$rundis$elm_bootstrap$Bootstrap$Grid$col,
															_List_fromArray(
																[$rundis$elm_bootstrap$Bootstrap$Grid$Col$xs12, $rundis$elm_bootstrap$Bootstrap$Grid$Col$lg6]),
															_List_fromArray(
																[
																	$elm$html$Html$text('Join a game that already exists')
																]))
														])),
													A2(
													$rundis$elm_bootstrap$Bootstrap$Grid$row,
													_List_Nil,
													_List_fromArray(
														[
															A2(
															$rundis$elm_bootstrap$Bootstrap$Grid$col,
															_List_fromArray(
																[$rundis$elm_bootstrap$Bootstrap$Grid$Col$xs10, $rundis$elm_bootstrap$Bootstrap$Grid$Col$lg5]),
															_List_fromArray(
																[
																	A2(
																	$rundis$elm_bootstrap$Bootstrap$Form$form,
																	_List_fromArray(
																		[$rundis$elm_bootstrap$Bootstrap$Utilities$Spacing$mb3]),
																	_List_fromArray(
																		[
																			A2(
																			$rundis$elm_bootstrap$Bootstrap$Form$label,
																			_List_Nil,
																			_List_fromArray(
																				[
																					$elm$html$Html$text('Paste \'URL\' or \'UUID\'')
																				])),
																			$rundis$elm_bootstrap$Bootstrap$Form$Input$text(
																			_List_fromArray(
																				[
																					$rundis$elm_bootstrap$Bootstrap$Form$Input$placeholder('https://matchey.github.io/BGC/game?event_id=550e8400-e29b-41d4-a716-446655441233'),
																					$rundis$elm_bootstrap$Bootstrap$Form$Input$onInput(
																					$author$project$Main$FormInput($author$project$Main$Fevent_id))
																				]))
																		]))
																])),
															A2(
															$rundis$elm_bootstrap$Bootstrap$Grid$col,
															_List_fromArray(
																[$rundis$elm_bootstrap$Bootstrap$Grid$Col$xs8, $rundis$elm_bootstrap$Bootstrap$Grid$Col$lg4, $rundis$elm_bootstrap$Bootstrap$Grid$Col$bottomLg]),
															_List_fromArray(
																[
																	A2(
																	$rundis$elm_bootstrap$Bootstrap$Button$button,
																	_List_fromArray(
																		[
																			$rundis$elm_bootstrap$Bootstrap$Button$attrs(
																			_List_fromArray(
																				[$rundis$elm_bootstrap$Bootstrap$Utilities$Spacing$mb3])),
																			$rundis$elm_bootstrap$Bootstrap$Button$secondary,
																			$rundis$elm_bootstrap$Bootstrap$Button$onClick($author$project$Main$JoinGame)
																		]),
																	_List_fromArray(
																		[
																			$elm$html$Html$text('Join a game')
																		]))
																]))
														]))
												]))),
										A2(
										$rundis$elm_bootstrap$Bootstrap$Card$Block$text,
										_List_Nil,
										_List_fromArray(
											[
												$elm$html$Html$text(model.statusReason)
											]))
									]),
								A3(
									$rundis$elm_bootstrap$Bootstrap$Card$headerH6,
									_List_Nil,
									_List_fromArray(
										[
											$elm$html$Html$text('Join')
										]),
									$rundis$elm_bootstrap$Bootstrap$Card$config(
										_List_fromArray(
											[$rundis$elm_bootstrap$Bootstrap$Card$outlineLight])))))
						]))
				]));
	});
var $author$project$Main$FinishEvent = {$: 'FinishEvent'};
var $author$project$Main$FinishGame = {$: 'FinishGame'};
var $rundis$elm_bootstrap$Bootstrap$Internal$Button$Disabled = function (a) {
	return {$: 'Disabled', a: a};
};
var $rundis$elm_bootstrap$Bootstrap$Button$disabled = function (disabled_) {
	return $rundis$elm_bootstrap$Bootstrap$Internal$Button$Disabled(disabled_);
};
var $rundis$elm_bootstrap$Bootstrap$Utilities$Spacing$m1 = $elm$html$Html$Attributes$class('m-1');
var $elm$html$Html$h5 = _VirtualDom_node('h5');
var $rundis$elm_bootstrap$Bootstrap$Card$Block$titleH5 = $rundis$elm_bootstrap$Bootstrap$Card$Block$title($elm$html$Html$h5);
var $elm$core$List$all = F2(
	function (isOkay, list) {
		return !A2(
			$elm$core$List$any,
			A2($elm$core$Basics$composeL, $elm$core$Basics$not, isOkay),
			list);
	});
var $elm$core$Dict$member = F2(
	function (key, dict) {
		var _v0 = A2($elm$core$Dict$get, key, dict);
		if (_v0.$ === 'Just') {
			return true;
		} else {
			return false;
		}
	});
var $elm$core$Dict$intersect = F2(
	function (t1, t2) {
		return A2(
			$elm$core$Dict$filter,
			F2(
				function (k, _v0) {
					return A2($elm$core$Dict$member, k, t2);
				}),
			t1);
	});
var $elm$core$Dict$values = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, valueList) {
				return A2($elm$core$List$cons, value, valueList);
			}),
		_List_Nil,
		dict);
};
var $author$project$Main$validInputScores = function (model) {
	var player_list = A2(
		$elm$core$List$map,
		function (x) {
			return _Utils_Tuple2(
				x,
				A5($author$project$Main$Player, false, '', 0, 0, false));
		},
		$elm$core$List$concat(model.teams));
	var players = A2(
		$elm$core$Dict$intersect,
		model.players,
		$elm$core$Dict$fromList(player_list));
	var score_list = A2(
		$elm$core$List$map,
		function (x) {
			return x.score;
		},
		$elm$core$Dict$values(players));
	return A2(
		$elm$core$List$all,
		function (x) {
			return x !== '';
		},
		score_list);
};
var $rundis$elm_bootstrap$Bootstrap$Form$Attrs = function (a) {
	return {$: 'Attrs', a: a};
};
var $rundis$elm_bootstrap$Bootstrap$Form$attrs = $rundis$elm_bootstrap$Bootstrap$Form$Attrs;
var $rundis$elm_bootstrap$Bootstrap$Form$applyModifier = F2(
	function (modifier, options) {
		var value = modifier.a;
		return _Utils_update(
			options,
			{
				attributes: _Utils_ap(options.attributes, value)
			});
	});
var $rundis$elm_bootstrap$Bootstrap$Form$defaultOptions = {attributes: _List_Nil};
var $rundis$elm_bootstrap$Bootstrap$Form$toAttributes = function (modifiers) {
	var options = A3($elm$core$List$foldl, $rundis$elm_bootstrap$Bootstrap$Form$applyModifier, $rundis$elm_bootstrap$Bootstrap$Form$defaultOptions, modifiers);
	return _Utils_ap(
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('form-group')
			]),
		options.attributes);
};
var $rundis$elm_bootstrap$Bootstrap$Form$group = F2(
	function (options, children) {
		return A2(
			$elm$html$Html$div,
			$rundis$elm_bootstrap$Bootstrap$Form$toAttributes(options),
			children);
	});
var $author$project$Main$Fhandicap = {$: 'Fhandicap'};
var $author$project$Main$FormScoreBlur = F3(
	function (a, b, c) {
		return {$: 'FormScoreBlur', a: a, b: b, c: c};
	});
var $author$project$Main$FormScoreFocus = F3(
	function (a, b, c) {
		return {$: 'FormScoreFocus', a: a, b: b, c: c};
	});
var $author$project$Main$FormScoreInput = F4(
	function (a, b, c, d) {
		return {$: 'FormScoreInput', a: a, b: b, c: c, d: d};
	});
var $author$project$Main$Fscore = {$: 'Fscore'};
var $rundis$elm_bootstrap$Bootstrap$Form$Input$Attrs = function (a) {
	return {$: 'Attrs', a: a};
};
var $rundis$elm_bootstrap$Bootstrap$Form$Input$attrs = function (attrs_) {
	return $rundis$elm_bootstrap$Bootstrap$Form$Input$Attrs(attrs_);
};
var $rundis$elm_bootstrap$Bootstrap$Grid$Internal$ColAttrs = function (a) {
	return {$: 'ColAttrs', a: a};
};
var $rundis$elm_bootstrap$Bootstrap$Grid$Col$attrs = function (attrs_) {
	return $rundis$elm_bootstrap$Bootstrap$Grid$Internal$ColAttrs(attrs_);
};
var $rundis$elm_bootstrap$Bootstrap$Form$Col = function (a) {
	return {$: 'Col', a: a};
};
var $rundis$elm_bootstrap$Bootstrap$Form$col = F2(
	function (options, children) {
		return $rundis$elm_bootstrap$Bootstrap$Form$Col(
			{children: children, elemFn: $elm$html$Html$div, options: options});
	});
var $rundis$elm_bootstrap$Bootstrap$Form$colLabel = F2(
	function (options, children) {
		return $rundis$elm_bootstrap$Bootstrap$Form$Col(
			{
				children: children,
				elemFn: $elm$html$Html$label,
				options: A2(
					$elm$core$List$cons,
					$rundis$elm_bootstrap$Bootstrap$Grid$Col$attrs(
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('col-form-label')
							])),
					options)
			});
	});
var $rundis$elm_bootstrap$Bootstrap$Grid$Internal$Col2 = {$: 'Col2'};
var $rundis$elm_bootstrap$Bootstrap$Grid$Col$lg2 = A2($rundis$elm_bootstrap$Bootstrap$Grid$Internal$width, $rundis$elm_bootstrap$Bootstrap$General$Internal$LG, $rundis$elm_bootstrap$Bootstrap$Grid$Internal$Col2);
var $rundis$elm_bootstrap$Bootstrap$Grid$Internal$Col3 = {$: 'Col3'};
var $rundis$elm_bootstrap$Bootstrap$Grid$Col$lg3 = A2($rundis$elm_bootstrap$Bootstrap$Grid$Internal$width, $rundis$elm_bootstrap$Bootstrap$General$Internal$LG, $rundis$elm_bootstrap$Bootstrap$Grid$Internal$Col3);
var $rundis$elm_bootstrap$Bootstrap$Form$Input$Number = {$: 'Number'};
var $rundis$elm_bootstrap$Bootstrap$Form$Input$number = $rundis$elm_bootstrap$Bootstrap$Form$Input$input($rundis$elm_bootstrap$Bootstrap$Form$Input$Number);
var $elm$html$Html$Events$onBlur = function (msg) {
	return A2(
		$elm$html$Html$Events$on,
		'blur',
		$elm$json$Json$Decode$succeed(msg));
};
var $elm$html$Html$Events$onFocus = function (msg) {
	return A2(
		$elm$html$Html$Events$on,
		'focus',
		$elm$json$Json$Decode$succeed(msg));
};
var $rundis$elm_bootstrap$Bootstrap$Utilities$Spacing$p0 = $elm$html$Html$Attributes$class('p-0');
var $rundis$elm_bootstrap$Bootstrap$Form$renderCol = function (_v0) {
	var elemFn = _v0.a.elemFn;
	var options = _v0.a.options;
	var children = _v0.a.children;
	return A2(
		elemFn,
		$rundis$elm_bootstrap$Bootstrap$Grid$Internal$colAttributes(options),
		children);
};
var $rundis$elm_bootstrap$Bootstrap$Form$row = F2(
	function (options, cols) {
		return A2(
			$elm$html$Html$div,
			A2(
				$elm$core$List$cons,
				$elm$html$Html$Attributes$class('form-group'),
				$rundis$elm_bootstrap$Bootstrap$Grid$Internal$rowAttributes(options)),
			A2($elm$core$List$map, $rundis$elm_bootstrap$Bootstrap$Form$renderCol, cols));
	});
var $rundis$elm_bootstrap$Bootstrap$General$Internal$SM = {$: 'SM'};
var $rundis$elm_bootstrap$Bootstrap$Form$Input$Size = function (a) {
	return {$: 'Size', a: a};
};
var $rundis$elm_bootstrap$Bootstrap$Form$Input$small = $rundis$elm_bootstrap$Bootstrap$Form$Input$Size($rundis$elm_bootstrap$Bootstrap$General$Internal$SM);
var $elm$virtual_dom$VirtualDom$style = _VirtualDom_style;
var $elm$html$Html$Attributes$style = $elm$virtual_dom$VirtualDom$style;
var $rundis$elm_bootstrap$Bootstrap$Grid$Internal$TextAlign = function (a) {
	return {$: 'TextAlign', a: a};
};
var $rundis$elm_bootstrap$Bootstrap$Grid$Col$textAlign = function (align) {
	return $rundis$elm_bootstrap$Bootstrap$Grid$Internal$TextAlign(align);
};
var $rundis$elm_bootstrap$Bootstrap$Grid$Col$xs2 = A2($rundis$elm_bootstrap$Bootstrap$Grid$Internal$width, $rundis$elm_bootstrap$Bootstrap$General$Internal$XS, $rundis$elm_bootstrap$Bootstrap$Grid$Internal$Col2);
var $rundis$elm_bootstrap$Bootstrap$Grid$Col$xs3 = A2($rundis$elm_bootstrap$Bootstrap$Grid$Internal$width, $rundis$elm_bootstrap$Bootstrap$General$Internal$XS, $rundis$elm_bootstrap$Bootstrap$Grid$Internal$Col3);
var $rundis$elm_bootstrap$Bootstrap$Grid$Col$xs5 = A2($rundis$elm_bootstrap$Bootstrap$Grid$Internal$width, $rundis$elm_bootstrap$Bootstrap$General$Internal$XS, $rundis$elm_bootstrap$Bootstrap$Grid$Internal$Col5);
var $author$project$Main$viewPlayerInput = F3(
	function (model, idx, name) {
		var _v0 = A2($elm$core$Dict$get, name, model.players);
		if (_v0.$ === 'Nothing') {
			return A2(
				$rundis$elm_bootstrap$Bootstrap$Form$row,
				_List_Nil,
				_List_fromArray(
					[
						A2(
						$rundis$elm_bootstrap$Bootstrap$Form$col,
						_List_Nil,
						_List_fromArray(
							[
								$elm$html$Html$text(name)
							]))
					]));
		} else {
			var player = _v0.a;
			return A2(
				$rundis$elm_bootstrap$Bootstrap$Form$row,
				_List_Nil,
				_List_fromArray(
					[
						A2(
						$rundis$elm_bootstrap$Bootstrap$Form$colLabel,
						_List_fromArray(
							[
								$rundis$elm_bootstrap$Bootstrap$Grid$Col$textAlign($rundis$elm_bootstrap$Bootstrap$Text$alignXsRight),
								$rundis$elm_bootstrap$Bootstrap$Grid$Col$attrs(
								_List_fromArray(
									[$rundis$elm_bootstrap$Bootstrap$Utilities$Spacing$p0, $rundis$elm_bootstrap$Bootstrap$Utilities$Spacing$m1])),
								$rundis$elm_bootstrap$Bootstrap$Grid$Col$xs5,
								$rundis$elm_bootstrap$Bootstrap$Grid$Col$lg3
							]),
						_List_fromArray(
							[
								$elm$html$Html$text(name)
							])),
						A2(
						$rundis$elm_bootstrap$Bootstrap$Form$col,
						_List_fromArray(
							[
								$rundis$elm_bootstrap$Bootstrap$Grid$Col$xs3,
								$rundis$elm_bootstrap$Bootstrap$Grid$Col$lg2,
								$rundis$elm_bootstrap$Bootstrap$Grid$Col$attrs(
								_List_fromArray(
									[$rundis$elm_bootstrap$Bootstrap$Utilities$Spacing$p0, $rundis$elm_bootstrap$Bootstrap$Utilities$Spacing$m1]))
							]),
						_List_fromArray(
							[
								$rundis$elm_bootstrap$Bootstrap$Form$Input$number(
								_List_fromArray(
									[
										$rundis$elm_bootstrap$Bootstrap$Form$Input$value(player.score),
										$rundis$elm_bootstrap$Bootstrap$Form$Input$small,
										$rundis$elm_bootstrap$Bootstrap$Form$Input$attrs(
										_List_fromArray(
											[
												A2($elm$html$Html$Attributes$style, 'text-align', 'right'),
												$elm$html$Html$Events$onBlur(
												A3($author$project$Main$FormScoreBlur, $author$project$Main$Fscore, idx, name)),
												$elm$html$Html$Events$onFocus(
												A3($author$project$Main$FormScoreFocus, $author$project$Main$Fscore, idx, name))
											])),
										$rundis$elm_bootstrap$Bootstrap$Form$Input$onInput(
										A3($author$project$Main$FormScoreInput, $author$project$Main$Fscore, idx, name))
									]))
							])),
						A2(
						$rundis$elm_bootstrap$Bootstrap$Form$col,
						_List_fromArray(
							[
								$rundis$elm_bootstrap$Bootstrap$Grid$Col$xs2,
								$rundis$elm_bootstrap$Bootstrap$Grid$Col$lg2,
								$rundis$elm_bootstrap$Bootstrap$Grid$Col$attrs(
								_List_fromArray(
									[$rundis$elm_bootstrap$Bootstrap$Utilities$Spacing$p0, $rundis$elm_bootstrap$Bootstrap$Utilities$Spacing$m1]))
							]),
						_List_fromArray(
							[
								$rundis$elm_bootstrap$Bootstrap$Form$Input$number(
								_List_fromArray(
									[
										$rundis$elm_bootstrap$Bootstrap$Form$Input$value(
										$elm$core$String$fromInt(player.handicap)),
										$rundis$elm_bootstrap$Bootstrap$Form$Input$small,
										$rundis$elm_bootstrap$Bootstrap$Form$Input$attrs(
										_List_fromArray(
											[
												A2($elm$html$Html$Attributes$style, 'text-align', 'right'),
												$elm$html$Html$Events$onBlur(
												A3($author$project$Main$FormScoreBlur, $author$project$Main$Fhandicap, idx, name)),
												$elm$html$Html$Events$onFocus(
												A3($author$project$Main$FormScoreFocus, $author$project$Main$Fhandicap, idx, name))
											])),
										$rundis$elm_bootstrap$Bootstrap$Form$Input$onInput(
										A3($author$project$Main$FormScoreInput, $author$project$Main$Fhandicap, idx, name))
									]))
							]))
					]));
		}
	});
var $author$project$Main$viewTeamForm = F3(
	function (model, num, team) {
		return A2(
			$rundis$elm_bootstrap$Bootstrap$Form$group,
			_List_fromArray(
				[
					$rundis$elm_bootstrap$Bootstrap$Form$attrs(_List_Nil)
				]),
			_Utils_ap(
				_List_fromArray(
					[
						A2(
						$rundis$elm_bootstrap$Bootstrap$Form$label,
						_List_Nil,
						_List_fromArray(
							[
								$elm$html$Html$text(
								'  Team ' + $elm$core$String$fromInt(num + 1))
							]))
					]),
				A2(
					$elm$core$List$map,
					A2($author$project$Main$viewPlayerInput, model, num),
					team)));
	});
var $author$project$Main$viewScoreInput = function (model) {
	return A2(
		$elm$core$List$indexedMap,
		$author$project$Main$viewTeamForm(model),
		model.teams);
};
var $author$project$Main$viewGame = F2(
	function (model, tn) {
		return $rundis$elm_bootstrap$Bootstrap$Card$view(
			A3(
				$rundis$elm_bootstrap$Bootstrap$Card$block,
				_List_Nil,
				_List_fromArray(
					[
						$rundis$elm_bootstrap$Bootstrap$Card$Block$custom(
						A2(
							$rundis$elm_bootstrap$Bootstrap$Grid$row,
							_List_fromArray(
								[$rundis$elm_bootstrap$Bootstrap$Grid$Row$centerXs]),
							_List_fromArray(
								[
									A2(
									$rundis$elm_bootstrap$Bootstrap$Grid$col,
									_List_fromArray(
										[$rundis$elm_bootstrap$Bootstrap$Grid$Col$xs8, $rundis$elm_bootstrap$Bootstrap$Grid$Col$lg5]),
									_List_fromArray(
										[
											A2(
											$rundis$elm_bootstrap$Bootstrap$Button$button,
											_List_fromArray(
												[
													$rundis$elm_bootstrap$Bootstrap$Button$primary,
													$rundis$elm_bootstrap$Bootstrap$Button$attrs(
													_List_fromArray(
														[$rundis$elm_bootstrap$Bootstrap$Utilities$Spacing$m1])),
													$rundis$elm_bootstrap$Bootstrap$Button$disabled(
													!$author$project$Main$validInputScores(model)),
													$rundis$elm_bootstrap$Bootstrap$Button$onClick($author$project$Main$FinishGame)
												]),
											_List_fromArray(
												[
													$elm$html$Html$text('Next Game')
												])),
											A2(
											$rundis$elm_bootstrap$Bootstrap$Button$button,
											_List_fromArray(
												[
													$rundis$elm_bootstrap$Bootstrap$Button$secondary,
													$rundis$elm_bootstrap$Bootstrap$Button$attrs(
													_List_fromArray(
														[$rundis$elm_bootstrap$Bootstrap$Utilities$Spacing$m1])),
													$rundis$elm_bootstrap$Bootstrap$Button$disabled(
													!$author$project$Main$validInputScores(model)),
													$rundis$elm_bootstrap$Bootstrap$Button$onClick($author$project$Main$FinishEvent)
												]),
											_List_fromArray(
												[
													$elm$html$Html$text('Finish')
												]))
										]))
								])))
					]),
				A3(
					$rundis$elm_bootstrap$Bootstrap$Card$block,
					_List_Nil,
					_List_fromArray(
						[
							$rundis$elm_bootstrap$Bootstrap$Card$Block$custom(
							A2(
								$rundis$elm_bootstrap$Bootstrap$Grid$row,
								_List_fromArray(
									[$rundis$elm_bootstrap$Bootstrap$Grid$Row$centerXs]),
								_List_fromArray(
									[
										A2(
										$rundis$elm_bootstrap$Bootstrap$Grid$col,
										_List_fromArray(
											[$rundis$elm_bootstrap$Bootstrap$Grid$Col$xs10, $rundis$elm_bootstrap$Bootstrap$Grid$Col$lg6]),
										$author$project$Main$viewScoreInput(model))
									])))
						]),
					A3(
						$rundis$elm_bootstrap$Bootstrap$Card$block,
						_List_Nil,
						_List_fromArray(
							[
								A2(
								$rundis$elm_bootstrap$Bootstrap$Card$Block$titleH5,
								_List_Nil,
								_List_fromArray(
									[
										$elm$html$Html$text('Input Scores (+Handicap)')
									]))
							]),
						$rundis$elm_bootstrap$Bootstrap$Card$config(
							_List_fromArray(
								[$rundis$elm_bootstrap$Bootstrap$Card$outlineLight]))))));
	});
var $author$project$Main$ApplyTeaming = {$: 'ApplyTeaming'};
var $author$project$Main$Copy = F2(
	function (a, b) {
		return {$: 'Copy', a: a, b: b};
	});
var $author$project$Main$Fmin_unit = {$: 'Fmin_unit'};
var $author$project$Main$Fnum_teams = {$: 'Fnum_teams'};
var $author$project$Main$Frate = {$: 'Frate'};
var $author$project$Main$StartGame = {$: 'StartGame'};
var $rundis$elm_bootstrap$Bootstrap$Utilities$Flex$block = $elm$html$Html$Attributes$class('d-flex');
var $rundis$elm_bootstrap$Bootstrap$Form$InputGroup$Addon = function (a) {
	return {$: 'Addon', a: a};
};
var $rundis$elm_bootstrap$Bootstrap$Form$InputGroup$button = F2(
	function (options, children) {
		return $rundis$elm_bootstrap$Bootstrap$Form$InputGroup$Addon(
			A2($rundis$elm_bootstrap$Bootstrap$Button$button, options, children));
	});
var $rundis$elm_bootstrap$Bootstrap$Grid$Row$centerLg = A2($rundis$elm_bootstrap$Bootstrap$Grid$Internal$rowHAlign, $rundis$elm_bootstrap$Bootstrap$General$Internal$LG, $rundis$elm_bootstrap$Bootstrap$General$Internal$Center);
var $rundis$elm_bootstrap$Bootstrap$Form$InputGroup$Config = function (a) {
	return {$: 'Config', a: a};
};
var $rundis$elm_bootstrap$Bootstrap$Form$InputGroup$config = function (input_) {
	return $rundis$elm_bootstrap$Bootstrap$Form$InputGroup$Config(
		{attributes: _List_Nil, input: input_, predecessors: _List_Nil, size: $elm$core$Maybe$Nothing, successors: _List_Nil});
};
var $rundis$elm_bootstrap$Bootstrap$Internal$Button$Info = {$: 'Info'};
var $rundis$elm_bootstrap$Bootstrap$Button$info = $rundis$elm_bootstrap$Bootstrap$Internal$Button$Coloring(
	$rundis$elm_bootstrap$Bootstrap$Internal$Button$Roled($rundis$elm_bootstrap$Bootstrap$Internal$Button$Info));
var $rundis$elm_bootstrap$Bootstrap$Utilities$Flex$justifyEnd = $elm$html$Html$Attributes$class('justify-content-end');
var $rundis$elm_bootstrap$Bootstrap$Utilities$Flex$justifyStartLg = $elm$html$Html$Attributes$class('justify-content-lg-start');
var $rundis$elm_bootstrap$Bootstrap$Internal$Button$Light = {$: 'Light'};
var $rundis$elm_bootstrap$Bootstrap$Button$light = $rundis$elm_bootstrap$Bootstrap$Internal$Button$Coloring(
	$rundis$elm_bootstrap$Bootstrap$Internal$Button$Roled($rundis$elm_bootstrap$Bootstrap$Internal$Button$Light));
var $rundis$elm_bootstrap$Bootstrap$Utilities$Spacing$m0 = $elm$html$Html$Attributes$class('m-0');
var $rundis$elm_bootstrap$Bootstrap$Form$InputGroup$Input = function (a) {
	return {$: 'Input', a: a};
};
var $rundis$elm_bootstrap$Bootstrap$Form$InputGroup$input = F2(
	function (inputFn, options) {
		return $rundis$elm_bootstrap$Bootstrap$Form$InputGroup$Input(
			inputFn(options));
	});
var $rundis$elm_bootstrap$Bootstrap$Form$InputGroup$number = $rundis$elm_bootstrap$Bootstrap$Form$InputGroup$input($rundis$elm_bootstrap$Bootstrap$Form$Input$number);
var $rundis$elm_bootstrap$Bootstrap$Form$InputGroup$predecessors = F2(
	function (addons, _v0) {
		var conf = _v0.a;
		return $rundis$elm_bootstrap$Bootstrap$Form$InputGroup$Config(
			_Utils_update(
				conf,
				{predecessors: addons}));
	});
var $rundis$elm_bootstrap$Bootstrap$Form$Input$Readonly = function (a) {
	return {$: 'Readonly', a: a};
};
var $rundis$elm_bootstrap$Bootstrap$Form$Input$readonly = function (readonly_) {
	return $rundis$elm_bootstrap$Bootstrap$Form$Input$Readonly(readonly_);
};
var $rundis$elm_bootstrap$Bootstrap$Form$InputGroup$small = function (_v0) {
	var conf = _v0.a;
	return $rundis$elm_bootstrap$Bootstrap$Form$InputGroup$Config(
		_Utils_update(
			conf,
			{
				size: $elm$core$Maybe$Just($rundis$elm_bootstrap$Bootstrap$General$Internal$SM)
			}));
};
var $elm$html$Html$span = _VirtualDom_node('span');
var $rundis$elm_bootstrap$Bootstrap$Form$InputGroup$span = F2(
	function (attributes, children) {
		return $rundis$elm_bootstrap$Bootstrap$Form$InputGroup$Addon(
			A2(
				$elm$html$Html$span,
				A2(
					$elm$core$List$cons,
					$elm$html$Html$Attributes$class('input-group-text'),
					attributes),
				children));
	});
var $rundis$elm_bootstrap$Bootstrap$Form$InputGroup$successors = F2(
	function (addons, _v0) {
		var conf = _v0.a;
		return $rundis$elm_bootstrap$Bootstrap$Form$InputGroup$Config(
			_Utils_update(
				conf,
				{successors: addons}));
	});
var $rundis$elm_bootstrap$Bootstrap$Form$Input$Url = {$: 'Url'};
var $rundis$elm_bootstrap$Bootstrap$Form$Input$url = $rundis$elm_bootstrap$Bootstrap$Form$Input$input($rundis$elm_bootstrap$Bootstrap$Form$Input$Url);
var $rundis$elm_bootstrap$Bootstrap$Form$InputGroup$url = $rundis$elm_bootstrap$Bootstrap$Form$InputGroup$input($rundis$elm_bootstrap$Bootstrap$Form$Input$url);
var $author$project$Main$validNumTeams = F2(
	function (model, str) {
		var active_list = model.active_players;
		var _v0 = $elm$core$String$toInt(str);
		if (_v0.$ === 'Nothing') {
			return false;
		} else {
			var num = _v0.a;
			return ((str !== '') && ((0 < num) && (_Utils_cmp(
				num,
				$elm$core$List$length(active_list)) < 1))) ? true : false;
		}
	});
var $rundis$elm_bootstrap$Bootstrap$Form$InputGroup$sizeAttribute = function (size) {
	return A2(
		$elm$core$Maybe$map,
		function (s) {
			return $elm$html$Html$Attributes$class('input-group-' + s);
		},
		$rundis$elm_bootstrap$Bootstrap$General$Internal$screenSizeOption(size));
};
var $rundis$elm_bootstrap$Bootstrap$Form$InputGroup$view = function (_v0) {
	var conf = _v0.a;
	var _v1 = conf.input;
	var input_ = _v1.a;
	return A2(
		$elm$html$Html$div,
		_Utils_ap(
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('input-group')
				]),
			_Utils_ap(
				A2(
					$elm$core$List$filterMap,
					$elm$core$Basics$identity,
					_List_fromArray(
						[
							A2($elm$core$Maybe$andThen, $rundis$elm_bootstrap$Bootstrap$Form$InputGroup$sizeAttribute, conf.size)
						])),
				conf.attributes)),
		_Utils_ap(
			A2(
				$elm$core$List$map,
				function (_v2) {
					var e = _v2.a;
					return A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('input-group-prepend')
							]),
						_List_fromArray(
							[e]));
				},
				conf.predecessors),
			_Utils_ap(
				_List_fromArray(
					[input_]),
				A2(
					$elm$core$List$map,
					function (_v3) {
						var e = _v3.a;
						return A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('input-group-append')
								]),
							_List_fromArray(
								[e]));
					},
					conf.successors))));
};
var $rundis$elm_bootstrap$Bootstrap$Card$Internal$Attrs = function (a) {
	return {$: 'Attrs', a: a};
};
var $rundis$elm_bootstrap$Bootstrap$Card$attrs = function (attrs_) {
	return $rundis$elm_bootstrap$Bootstrap$Card$Internal$Attrs(attrs_);
};
var $rundis$elm_bootstrap$Bootstrap$Card$Internal$BlockAttrs = function (a) {
	return {$: 'BlockAttrs', a: a};
};
var $rundis$elm_bootstrap$Bootstrap$Card$Block$attrs = function (attrs_) {
	return $rundis$elm_bootstrap$Bootstrap$Card$Internal$BlockAttrs(attrs_);
};
var $rundis$elm_bootstrap$Bootstrap$Grid$Internal$RowAttrs = function (a) {
	return {$: 'RowAttrs', a: a};
};
var $rundis$elm_bootstrap$Bootstrap$Grid$Row$attrs = function (attrs_) {
	return $rundis$elm_bootstrap$Bootstrap$Grid$Internal$RowAttrs(attrs_);
};
var $elm$html$Html$Attributes$dropzone = $elm$html$Html$Attributes$stringProperty('dropzone');
var $rundis$elm_bootstrap$Bootstrap$Utilities$Spacing$ml1 = $elm$html$Html$Attributes$class('ml-1');
var $rundis$elm_bootstrap$Bootstrap$Utilities$Flex$nowrap = $elm$html$Html$Attributes$class('flex-nowrap');
var $rundis$elm_bootstrap$Bootstrap$Internal$Role$Dark = {$: 'Dark'};
var $rundis$elm_bootstrap$Bootstrap$Card$outlineDark = $rundis$elm_bootstrap$Bootstrap$Card$Internal$Coloring(
	$rundis$elm_bootstrap$Bootstrap$Card$Internal$Outlined($rundis$elm_bootstrap$Bootstrap$Internal$Role$Dark));
var $elm$html$Html$Attributes$draggable = _VirtualDom_attribute('draggable');
var $rundis$elm_bootstrap$Bootstrap$Utilities$Spacing$pl1 = $elm$html$Html$Attributes$class('pl-1');
var $rundis$elm_bootstrap$Bootstrap$Utilities$Spacing$pr1 = $elm$html$Html$Attributes$class('pr-1');
var $author$project$Main$viewPlayer = F2(
	function (model, name) {
		return A2(
			$rundis$elm_bootstrap$Bootstrap$Grid$col,
			_List_fromArray(
				[
					$rundis$elm_bootstrap$Bootstrap$Grid$Col$attrs(_List_Nil)
				]),
			_List_fromArray(
				[
					A2(
					$rundis$elm_bootstrap$Bootstrap$Form$form,
					_List_fromArray(
						[
							$rundis$elm_bootstrap$Bootstrap$Utilities$Spacing$m1,
							$rundis$elm_bootstrap$Bootstrap$Utilities$Spacing$pl1,
							$rundis$elm_bootstrap$Bootstrap$Utilities$Spacing$pr1,
							$elm$html$Html$Attributes$draggable('true'),
							A2($elm$html$Html$Attributes$style, 'background-color', 'rgba(20, 200, 200, 0.1)'),
							A2($elm$html$Html$Attributes$style, 'text-align', 'center'),
							A2($elm$html$Html$Attributes$style, 'box-shadow', 'inset 0 -2em 2em rgba(0,0,0,0.1),\n                                    0 0  0 2px rgb(255,255,255),\n                                    0.2em 0.2em 0.7em rgba(0,0,0,0.2)'),
							A2($elm$html$Html$Attributes$style, 'white-space', 'nowrap')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text(name)
						]))
				]));
	});
var $author$project$Main$viewTeamCard = F3(
	function (model, num, team) {
		return A2(
			$rundis$elm_bootstrap$Bootstrap$Grid$col,
			_List_fromArray(
				[
					$rundis$elm_bootstrap$Bootstrap$Grid$Col$attrs(_List_Nil)
				]),
			_List_fromArray(
				[
					$rundis$elm_bootstrap$Bootstrap$Card$view(
					A3(
						$rundis$elm_bootstrap$Bootstrap$Card$block,
						_List_fromArray(
							[
								$rundis$elm_bootstrap$Bootstrap$Card$Block$attrs(
								_List_fromArray(
									[$rundis$elm_bootstrap$Bootstrap$Utilities$Spacing$p0, $rundis$elm_bootstrap$Bootstrap$Utilities$Spacing$m1]))
							]),
						_List_fromArray(
							[
								$rundis$elm_bootstrap$Bootstrap$Card$Block$custom(
								A2(
									$rundis$elm_bootstrap$Bootstrap$Grid$row,
									_List_fromArray(
										[
											$rundis$elm_bootstrap$Bootstrap$Grid$Row$attrs(_List_Nil)
										]),
									A2(
										$elm$core$List$map,
										$author$project$Main$viewPlayer(model),
										team)))
							]),
						A3(
							$rundis$elm_bootstrap$Bootstrap$Card$block,
							_List_fromArray(
								[
									$rundis$elm_bootstrap$Bootstrap$Card$Block$attrs(
									_List_fromArray(
										[$rundis$elm_bootstrap$Bootstrap$Utilities$Spacing$p0, $rundis$elm_bootstrap$Bootstrap$Utilities$Spacing$m0]))
								]),
							_List_fromArray(
								[
									A2(
									$rundis$elm_bootstrap$Bootstrap$Card$Block$text,
									_List_fromArray(
										[$rundis$elm_bootstrap$Bootstrap$Utilities$Spacing$p0, $rundis$elm_bootstrap$Bootstrap$Utilities$Spacing$ml1, $rundis$elm_bootstrap$Bootstrap$Utilities$Flex$nowrap]),
									_List_fromArray(
										[
											$elm$html$Html$text(
											'  Team ' + $elm$core$String$fromInt(num + 1))
										]))
								]),
							$rundis$elm_bootstrap$Bootstrap$Card$config(
								_List_fromArray(
									[
										$rundis$elm_bootstrap$Bootstrap$Card$outlineDark,
										$rundis$elm_bootstrap$Bootstrap$Card$attrs(
										_List_fromArray(
											[
												$rundis$elm_bootstrap$Bootstrap$Utilities$Spacing$m1,
												$elm$html$Html$Attributes$dropzone('true')
											]))
									])))))
				]));
	});
var $author$project$Main$viewTeams = function (model) {
	return $elm$core$List$isEmpty(model.teams) ? _List_fromArray(
		[
			A2(
			$rundis$elm_bootstrap$Bootstrap$Card$Block$text,
			_List_fromArray(
				[$rundis$elm_bootstrap$Bootstrap$Utilities$Spacing$m0]),
			_List_fromArray(
				[
					$elm$html$Html$text(model.statusReason)
				]))
		]) : _List_fromArray(
		[
			$rundis$elm_bootstrap$Bootstrap$Card$Block$custom(
			A2(
				$rundis$elm_bootstrap$Bootstrap$Grid$row,
				_List_Nil,
				A2(
					$elm$core$List$indexedMap,
					$author$project$Main$viewTeamCard(model),
					model.teams)))
		]);
};
var $author$project$Main$ToggleBreak = function (a) {
	return {$: 'ToggleBreak', a: a};
};
var $rundis$elm_bootstrap$Bootstrap$Internal$Button$Dark = {$: 'Dark'};
var $rundis$elm_bootstrap$Bootstrap$Internal$Button$Outlined = function (a) {
	return {$: 'Outlined', a: a};
};
var $rundis$elm_bootstrap$Bootstrap$Button$outlineDark = $rundis$elm_bootstrap$Bootstrap$Internal$Button$Coloring(
	$rundis$elm_bootstrap$Bootstrap$Internal$Button$Outlined($rundis$elm_bootstrap$Bootstrap$Internal$Button$Dark));
var $rundis$elm_bootstrap$Bootstrap$Button$outlineLight = $rundis$elm_bootstrap$Bootstrap$Internal$Button$Coloring(
	$rundis$elm_bootstrap$Bootstrap$Internal$Button$Outlined($rundis$elm_bootstrap$Bootstrap$Internal$Button$Light));
var $rundis$elm_bootstrap$Bootstrap$Internal$Button$Size = function (a) {
	return {$: 'Size', a: a};
};
var $rundis$elm_bootstrap$Bootstrap$Button$small = $rundis$elm_bootstrap$Bootstrap$Internal$Button$Size($rundis$elm_bootstrap$Bootstrap$General$Internal$SM);
var $author$project$Main$viewUser = F2(
	function (model, name) {
		var _v0 = function () {
			var _v1 = A2($elm$core$Dict$get, name, model.players);
			if (_v1.$ === 'Nothing') {
				return _Utils_Tuple2(
					$rundis$elm_bootstrap$Bootstrap$Button$outlineLight,
					A2($elm$html$Html$Attributes$style, 'color', 'darkgray'));
			} else {
				var x = _v1.a;
				return x._break ? _Utils_Tuple2(
					$rundis$elm_bootstrap$Bootstrap$Button$outlineLight,
					A2($elm$html$Html$Attributes$style, 'color', 'darkgray')) : _Utils_Tuple2(
					$rundis$elm_bootstrap$Bootstrap$Button$outlineDark,
					A2($elm$html$Html$Attributes$style, 'color', 'black'));
			}
		}();
		var color = _v0.a;
		var attr = _v0.b;
		return $rundis$elm_bootstrap$Bootstrap$Card$Block$custom(
			A2(
				$rundis$elm_bootstrap$Bootstrap$Button$button,
				_List_fromArray(
					[
						color,
						$rundis$elm_bootstrap$Bootstrap$Button$small,
						$rundis$elm_bootstrap$Bootstrap$Button$attrs(
						_List_fromArray(
							[
								$rundis$elm_bootstrap$Bootstrap$Utilities$Spacing$m1,
								A2($elm$html$Html$Attributes$style, 'background-color', '#FFF'),
								attr
							])),
						$rundis$elm_bootstrap$Bootstrap$Button$onClick(
						$author$project$Main$ToggleBreak(name))
					]),
				_List_fromArray(
					[
						$elm$html$Html$text(name)
					])));
	});
var $author$project$Main$viewUsers = function (model) {
	return _Utils_ap(
		_List_fromArray(
			[
				A2(
				$rundis$elm_bootstrap$Bootstrap$Card$Block$text,
				_List_fromArray(
					[$rundis$elm_bootstrap$Bootstrap$Utilities$Spacing$m0]),
				_List_fromArray(
					[
						$elm$html$Html$text('Select any players to take a break')
					]))
			]),
		A2(
			$elm$core$List$map,
			$author$project$Main$viewUser(model),
			$elm$core$Dict$keys(model.players)));
};
var $author$project$Main$viewTeaming = F2(
	function (model, tn) {
		return A2(
			$rundis$elm_bootstrap$Bootstrap$Grid$row,
			_List_fromArray(
				[$rundis$elm_bootstrap$Bootstrap$Grid$Row$centerXs, $rundis$elm_bootstrap$Bootstrap$Grid$Row$centerLg]),
			_List_fromArray(
				[
					A2(
					$rundis$elm_bootstrap$Bootstrap$Grid$col,
					_List_Nil,
					_List_fromArray(
						[
							$rundis$elm_bootstrap$Bootstrap$Card$view(
							A3(
								$rundis$elm_bootstrap$Bootstrap$Card$block,
								_List_Nil,
								_List_fromArray(
									[
										A2(
										$rundis$elm_bootstrap$Bootstrap$Card$Block$text,
										_List_Nil,
										_List_fromArray(
											[
												$elm$html$Html$text('eventId: ' + model.eventId)
											])),
										A2(
										$rundis$elm_bootstrap$Bootstrap$Card$Block$text,
										_List_Nil,
										_List_fromArray(
											[
												$elm$html$Html$text('gameId: ' + model.gameId)
											])),
										A2(
										$rundis$elm_bootstrap$Bootstrap$Card$Block$text,
										_List_Nil,
										_List_fromArray(
											[
												$elm$html$Html$text('reason: ' + model.statusReason)
											]))
									]),
								A3(
									$rundis$elm_bootstrap$Bootstrap$Card$block,
									_List_Nil,
									_List_fromArray(
										[
											$rundis$elm_bootstrap$Bootstrap$Card$Block$custom(
											A2(
												$rundis$elm_bootstrap$Bootstrap$Grid$container,
												_List_fromArray(
													[$rundis$elm_bootstrap$Bootstrap$Utilities$Flex$block, $rundis$elm_bootstrap$Bootstrap$Utilities$Flex$justifyStartLg, $rundis$elm_bootstrap$Bootstrap$Utilities$Flex$justifyEnd]),
												_List_fromArray(
													[
														A2(
														$rundis$elm_bootstrap$Bootstrap$Grid$row,
														_List_fromArray(
															[$rundis$elm_bootstrap$Bootstrap$Grid$Row$centerXs]),
														_List_fromArray(
															[
																A2(
																$rundis$elm_bootstrap$Bootstrap$Grid$col,
																_List_Nil,
																_List_fromArray(
																	[
																		A2(
																		$rundis$elm_bootstrap$Bootstrap$Button$button,
																		_List_fromArray(
																			[
																				$rundis$elm_bootstrap$Bootstrap$Button$primary,
																				$rundis$elm_bootstrap$Bootstrap$Button$disabled(
																				$elm$core$List$isEmpty(model.teams)),
																				$rundis$elm_bootstrap$Bootstrap$Button$onClick($author$project$Main$StartGame)
																			]),
																		_List_fromArray(
																			[
																				$elm$html$Html$text('Start a game')
																			]))
																	]))
															]))
													])))
										]),
									A3(
										$rundis$elm_bootstrap$Bootstrap$Card$block,
										_List_Nil,
										$author$project$Main$viewTeams(model),
										A3(
											$rundis$elm_bootstrap$Bootstrap$Card$block,
											_List_Nil,
											_List_fromArray(
												[
													$rundis$elm_bootstrap$Bootstrap$Card$Block$custom(
													A2(
														$rundis$elm_bootstrap$Bootstrap$Grid$container,
														_List_Nil,
														_List_fromArray(
															[
																A2(
																$rundis$elm_bootstrap$Bootstrap$Form$row,
																_List_Nil,
																_List_fromArray(
																	[
																		A2(
																		$rundis$elm_bootstrap$Bootstrap$Form$col,
																		_List_Nil,
																		_List_fromArray(
																			[
																				A2(
																				$rundis$elm_bootstrap$Bootstrap$Form$form,
																				_List_Nil,
																				_List_fromArray(
																					[
																						A2(
																						$rundis$elm_bootstrap$Bootstrap$Form$label,
																						_List_fromArray(
																							[$rundis$elm_bootstrap$Bootstrap$Utilities$Spacing$m0]),
																						_List_fromArray(
																							[
																								$elm$html$Html$text('Input game settings')
																							]))
																					]))
																			]))
																	])),
																A2(
																$rundis$elm_bootstrap$Bootstrap$Form$row,
																_List_Nil,
																_List_fromArray(
																	[
																		A2(
																		$rundis$elm_bootstrap$Bootstrap$Form$col,
																		_List_fromArray(
																			[$rundis$elm_bootstrap$Bootstrap$Grid$Col$xs5, $rundis$elm_bootstrap$Bootstrap$Grid$Col$lg2]),
																		_List_fromArray(
																			[
																				A2(
																				$rundis$elm_bootstrap$Bootstrap$Form$form,
																				_List_Nil,
																				_List_fromArray(
																					[
																						$rundis$elm_bootstrap$Bootstrap$Form$InputGroup$view(
																						$rundis$elm_bootstrap$Bootstrap$Form$InputGroup$small(
																							A2(
																								$rundis$elm_bootstrap$Bootstrap$Form$InputGroup$predecessors,
																								_List_fromArray(
																									[
																										A2(
																										$rundis$elm_bootstrap$Bootstrap$Form$InputGroup$span,
																										_List_Nil,
																										_List_fromArray(
																											[
																												$elm$html$Html$text('Unit')
																											]))
																									]),
																								$rundis$elm_bootstrap$Bootstrap$Form$InputGroup$config(
																									$rundis$elm_bootstrap$Bootstrap$Form$InputGroup$number(
																										_List_fromArray(
																											[
																												$rundis$elm_bootstrap$Bootstrap$Form$Input$value(model.inputGameSettings.minUnit),
																												$rundis$elm_bootstrap$Bootstrap$Form$Input$onInput(
																												$author$project$Main$FormInput($author$project$Main$Fmin_unit))
																											]))))))
																					]))
																			])),
																		A2(
																		$rundis$elm_bootstrap$Bootstrap$Form$col,
																		_List_fromArray(
																			[$rundis$elm_bootstrap$Bootstrap$Grid$Col$xs5, $rundis$elm_bootstrap$Bootstrap$Grid$Col$lg2]),
																		_List_fromArray(
																			[
																				A2(
																				$rundis$elm_bootstrap$Bootstrap$Form$form,
																				_List_Nil,
																				_List_fromArray(
																					[
																						$rundis$elm_bootstrap$Bootstrap$Form$InputGroup$view(
																						$rundis$elm_bootstrap$Bootstrap$Form$InputGroup$small(
																							A2(
																								$rundis$elm_bootstrap$Bootstrap$Form$InputGroup$predecessors,
																								_List_fromArray(
																									[
																										A2(
																										$rundis$elm_bootstrap$Bootstrap$Form$InputGroup$span,
																										_List_Nil,
																										_List_fromArray(
																											[
																												$elm$html$Html$text('Rate')
																											]))
																									]),
																								$rundis$elm_bootstrap$Bootstrap$Form$InputGroup$config(
																									$rundis$elm_bootstrap$Bootstrap$Form$InputGroup$number(
																										_List_fromArray(
																											[
																												$rundis$elm_bootstrap$Bootstrap$Form$Input$value(model.inputGameSettings.rate),
																												$rundis$elm_bootstrap$Bootstrap$Form$Input$onInput(
																												$author$project$Main$FormInput($author$project$Main$Frate))
																											]))))))
																					]))
																			]))
																	]))
															]))),
													$rundis$elm_bootstrap$Bootstrap$Card$Block$custom(
													A2(
														$rundis$elm_bootstrap$Bootstrap$Grid$container,
														_List_Nil,
														_List_fromArray(
															[
																A2(
																$rundis$elm_bootstrap$Bootstrap$Grid$row,
																_List_Nil,
																_List_fromArray(
																	[
																		A2(
																		$rundis$elm_bootstrap$Bootstrap$Grid$col,
																		_List_fromArray(
																			[$rundis$elm_bootstrap$Bootstrap$Grid$Col$xs10, $rundis$elm_bootstrap$Bootstrap$Grid$Col$lg4]),
																		_List_fromArray(
																			[
																				A2(
																				$rundis$elm_bootstrap$Bootstrap$Form$form,
																				_List_Nil,
																				_List_fromArray(
																					[
																						A2(
																						$rundis$elm_bootstrap$Bootstrap$Form$label,
																						_List_Nil,
																						_List_fromArray(
																							[
																								$elm$html$Html$text('Divide the players into teams')
																							])),
																						$rundis$elm_bootstrap$Bootstrap$Form$InputGroup$view(
																						A2(
																							$rundis$elm_bootstrap$Bootstrap$Form$InputGroup$successors,
																							_List_fromArray(
																								[
																									A2(
																									$rundis$elm_bootstrap$Bootstrap$Form$InputGroup$button,
																									_List_fromArray(
																										[
																											$rundis$elm_bootstrap$Bootstrap$Button$info,
																											$rundis$elm_bootstrap$Bootstrap$Button$onClick($author$project$Main$ApplyTeaming),
																											$rundis$elm_bootstrap$Bootstrap$Button$disabled(
																											!A2($author$project$Main$validNumTeams, model, model.inputGameSettings.numTeams))
																										]),
																									_List_fromArray(
																										[
																											$elm$html$Html$text('Apply')
																										]))
																								]),
																							$rundis$elm_bootstrap$Bootstrap$Form$InputGroup$small(
																								A2(
																									$rundis$elm_bootstrap$Bootstrap$Form$InputGroup$predecessors,
																									_List_fromArray(
																										[
																											A2(
																											$rundis$elm_bootstrap$Bootstrap$Form$InputGroup$span,
																											_List_Nil,
																											_List_fromArray(
																												[
																													$elm$html$Html$text('Number of teams')
																												]))
																										]),
																									$rundis$elm_bootstrap$Bootstrap$Form$InputGroup$config(
																										$rundis$elm_bootstrap$Bootstrap$Form$InputGroup$number(
																											_List_fromArray(
																												[
																													$rundis$elm_bootstrap$Bootstrap$Form$Input$value(model.inputGameSettings.numTeams),
																													$rundis$elm_bootstrap$Bootstrap$Form$Input$onInput(
																													$author$project$Main$FormInput($author$project$Main$Fnum_teams))
																												])))))))
																					]))
																			]))
																	]))
															])))
												]),
											A3(
												$rundis$elm_bootstrap$Bootstrap$Card$block,
												_List_Nil,
												$author$project$Main$viewUsers(model),
												A3(
													$rundis$elm_bootstrap$Bootstrap$Card$block,
													_List_Nil,
													_List_fromArray(
														[
															$rundis$elm_bootstrap$Bootstrap$Card$Block$custom(
															A2(
																$rundis$elm_bootstrap$Bootstrap$Grid$container,
																_List_Nil,
																_List_fromArray(
																	[
																		A2(
																		$rundis$elm_bootstrap$Bootstrap$Grid$row,
																		_List_Nil,
																		_List_fromArray(
																			[
																				A2(
																				$rundis$elm_bootstrap$Bootstrap$Grid$col,
																				_List_fromArray(
																					[$rundis$elm_bootstrap$Bootstrap$Grid$Col$xs10, $rundis$elm_bootstrap$Bootstrap$Grid$Col$lg4]),
																				_List_fromArray(
																					[
																						A2(
																						$rundis$elm_bootstrap$Bootstrap$Form$form,
																						_List_Nil,
																						_List_fromArray(
																							[
																								A2(
																								$rundis$elm_bootstrap$Bootstrap$Form$label,
																								_List_Nil,
																								_List_fromArray(
																									[
																										$elm$html$Html$text('Share this link with players.')
																									])),
																								$rundis$elm_bootstrap$Bootstrap$Form$InputGroup$view(
																								A2(
																									$rundis$elm_bootstrap$Bootstrap$Form$InputGroup$successors,
																									_List_fromArray(
																										[
																											A2(
																											$rundis$elm_bootstrap$Bootstrap$Form$InputGroup$button,
																											_List_fromArray(
																												[
																													$rundis$elm_bootstrap$Bootstrap$Button$light,
																													$rundis$elm_bootstrap$Bootstrap$Button$attrs(
																													_List_fromArray(
																														[
																															$elm$html$Html$Attributes$id('id_copy_button')
																														])),
																													$rundis$elm_bootstrap$Bootstrap$Button$onClick(
																													A2($author$project$Main$Copy, 'id_copy_input', 'id_copy_button'))
																												]),
																											_List_fromArray(
																												[
																													$elm$html$Html$text('Copy')
																												]))
																										]),
																									$rundis$elm_bootstrap$Bootstrap$Form$InputGroup$small(
																										$rundis$elm_bootstrap$Bootstrap$Form$InputGroup$config(
																											$rundis$elm_bootstrap$Bootstrap$Form$InputGroup$url(
																												_List_fromArray(
																													[
																														$rundis$elm_bootstrap$Bootstrap$Form$Input$value(
																														$elm$url$Url$toString(model.url)),
																														$rundis$elm_bootstrap$Bootstrap$Form$Input$attrs(
																														_List_fromArray(
																															[
																																$elm$html$Html$Attributes$id('id_copy_input')
																															])),
																														$rundis$elm_bootstrap$Bootstrap$Form$Input$readonly(true)
																													]))))))
																							]))
																					]))
																			]))
																	])))
														]),
													$rundis$elm_bootstrap$Bootstrap$Card$config(
														_List_fromArray(
															[$rundis$elm_bootstrap$Bootstrap$Card$outlineLight])))))))))
						]))
				]));
	});
var $author$project$Main$mainContent = F2(
	function (model, tn) {
		var _v0 = model.gameState;
		switch (_v0.$) {
			case 'Nonparticipation':
				return A2($author$project$Main$viewBegin, model, tn);
			case 'Teaming':
				return A2($author$project$Main$viewTeaming, model, tn);
			default:
				return A2($author$project$Main$viewGame, model, tn);
		}
	});
var $author$project$Main$ChangeMyPageState = function (a) {
	return {$: 'ChangeMyPageState', a: a};
};
var $author$project$Main$ToggleMyPage = {$: 'ToggleMyPage'};
var $rundis$elm_bootstrap$Bootstrap$Navbar$Brand = function (a) {
	return {$: 'Brand', a: a};
};
var $rundis$elm_bootstrap$Bootstrap$Navbar$Config = function (a) {
	return {$: 'Config', a: a};
};
var $rundis$elm_bootstrap$Bootstrap$Navbar$updateConfig = F2(
	function (mapper, _v0) {
		var conf = _v0.a;
		return $rundis$elm_bootstrap$Bootstrap$Navbar$Config(
			mapper(conf));
	});
var $rundis$elm_bootstrap$Bootstrap$Navbar$brand = F3(
	function (attributes, children, config_) {
		return A2(
			$rundis$elm_bootstrap$Bootstrap$Navbar$updateConfig,
			function (conf) {
				return _Utils_update(
					conf,
					{
						brand: $elm$core$Maybe$Just(
							$rundis$elm_bootstrap$Bootstrap$Navbar$Brand(
								A2(
									$elm$html$Html$a,
									_Utils_ap(
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('navbar-brand')
											]),
										attributes),
									children)))
					});
			},
			config_);
	});
var $rundis$elm_bootstrap$Bootstrap$Navbar$Light = {$: 'Light'};
var $rundis$elm_bootstrap$Bootstrap$Navbar$Roled = function (a) {
	return {$: 'Roled', a: a};
};
var $rundis$elm_bootstrap$Bootstrap$Navbar$config = function (toMsg) {
	return $rundis$elm_bootstrap$Bootstrap$Navbar$Config(
		{
			brand: $elm$core$Maybe$Nothing,
			customItems: _List_Nil,
			items: _List_Nil,
			options: {
				attributes: _List_Nil,
				fix: $elm$core$Maybe$Nothing,
				isContainer: false,
				scheme: $elm$core$Maybe$Just(
					{
						bgColor: $rundis$elm_bootstrap$Bootstrap$Navbar$Roled($rundis$elm_bootstrap$Bootstrap$Internal$Role$Light),
						modifier: $rundis$elm_bootstrap$Bootstrap$Navbar$Light
					}),
				toggleAt: $rundis$elm_bootstrap$Bootstrap$General$Internal$XS
			},
			toMsg: toMsg,
			withAnimation: false
		});
};
var $rundis$elm_bootstrap$Bootstrap$Navbar$Top = {$: 'Top'};
var $rundis$elm_bootstrap$Bootstrap$Navbar$updateOptions = F2(
	function (mapper, _v0) {
		var conf = _v0.a;
		return $rundis$elm_bootstrap$Bootstrap$Navbar$Config(
			_Utils_update(
				conf,
				{
					options: mapper(conf.options)
				}));
	});
var $rundis$elm_bootstrap$Bootstrap$Navbar$fixTop = function (conf) {
	return A2(
		$rundis$elm_bootstrap$Bootstrap$Navbar$updateOptions,
		function (opts) {
			return _Utils_update(
				opts,
				{
					fix: $elm$core$Maybe$Just($rundis$elm_bootstrap$Bootstrap$Navbar$Top)
				});
		},
		conf);
};
var $rundis$elm_bootstrap$Bootstrap$Navbar$Item = function (a) {
	return {$: 'Item', a: a};
};
var $rundis$elm_bootstrap$Bootstrap$Navbar$itemLink = F2(
	function (attributes, children) {
		return $rundis$elm_bootstrap$Bootstrap$Navbar$Item(
			{attributes: attributes, children: children});
	});
var $rundis$elm_bootstrap$Bootstrap$Navbar$itemLinkActive = function (attributes) {
	return $rundis$elm_bootstrap$Bootstrap$Navbar$itemLink(
		A2(
			$elm$core$List$cons,
			$elm$html$Html$Attributes$class('active'),
			attributes));
};
var $rundis$elm_bootstrap$Bootstrap$Navbar$items = F2(
	function (items_, config_) {
		return A2(
			$rundis$elm_bootstrap$Bootstrap$Navbar$updateConfig,
			function (conf) {
				return _Utils_update(
					conf,
					{items: items_});
			},
			config_);
	});
var $rundis$elm_bootstrap$Bootstrap$Navbar$maybeBrand = function (brand_) {
	if (brand_.$ === 'Just') {
		var b = brand_.a.a;
		return _List_fromArray(
			[b]);
	} else {
		return _List_Nil;
	}
};
var $rundis$elm_bootstrap$Bootstrap$Navbar$sizeToComparable = function (size) {
	switch (size.$) {
		case 'XS':
			return 1;
		case 'SM':
			return 2;
		case 'MD':
			return 3;
		case 'LG':
			return 4;
		default:
			return 5;
	}
};
var $rundis$elm_bootstrap$Bootstrap$General$Internal$MD = {$: 'MD'};
var $rundis$elm_bootstrap$Bootstrap$General$Internal$XL = {$: 'XL'};
var $rundis$elm_bootstrap$Bootstrap$Navbar$toScreenSize = function (windowWidth) {
	return (windowWidth <= 576) ? $rundis$elm_bootstrap$Bootstrap$General$Internal$XS : ((windowWidth <= 768) ? $rundis$elm_bootstrap$Bootstrap$General$Internal$SM : ((windowWidth <= 992) ? $rundis$elm_bootstrap$Bootstrap$General$Internal$MD : ((windowWidth <= 1200) ? $rundis$elm_bootstrap$Bootstrap$General$Internal$LG : $rundis$elm_bootstrap$Bootstrap$General$Internal$XL)));
};
var $rundis$elm_bootstrap$Bootstrap$Navbar$shouldHideMenu = F2(
	function (_v0, _v1) {
		var windowWidth = _v0.a.windowWidth;
		var options = _v1.options;
		var winMedia = function () {
			if (windowWidth.$ === 'Just') {
				var s = windowWidth.a;
				return $rundis$elm_bootstrap$Bootstrap$Navbar$toScreenSize(s);
			} else {
				return $rundis$elm_bootstrap$Bootstrap$General$Internal$XS;
			}
		}();
		return _Utils_cmp(
			$rundis$elm_bootstrap$Bootstrap$Navbar$sizeToComparable(winMedia),
			$rundis$elm_bootstrap$Bootstrap$Navbar$sizeToComparable(options.toggleAt)) > 0;
	});
var $rundis$elm_bootstrap$Bootstrap$Navbar$Shown = {$: 'Shown'};
var $rundis$elm_bootstrap$Bootstrap$Navbar$StartDown = {$: 'StartDown'};
var $rundis$elm_bootstrap$Bootstrap$Navbar$StartUp = {$: 'StartUp'};
var $rundis$elm_bootstrap$Bootstrap$Navbar$visibilityTransition = F2(
	function (withAnimation_, visibility) {
		var _v0 = _Utils_Tuple2(withAnimation_, visibility);
		if (_v0.a) {
			switch (_v0.b.$) {
				case 'Hidden':
					var _v1 = _v0.b;
					return $rundis$elm_bootstrap$Bootstrap$Navbar$StartDown;
				case 'StartDown':
					var _v2 = _v0.b;
					return $rundis$elm_bootstrap$Bootstrap$Navbar$AnimatingDown;
				case 'AnimatingDown':
					var _v3 = _v0.b;
					return $rundis$elm_bootstrap$Bootstrap$Navbar$Shown;
				case 'Shown':
					var _v4 = _v0.b;
					return $rundis$elm_bootstrap$Bootstrap$Navbar$StartUp;
				case 'StartUp':
					var _v5 = _v0.b;
					return $rundis$elm_bootstrap$Bootstrap$Navbar$AnimatingUp;
				default:
					var _v6 = _v0.b;
					return $rundis$elm_bootstrap$Bootstrap$Navbar$Hidden;
			}
		} else {
			switch (_v0.b.$) {
				case 'Hidden':
					var _v7 = _v0.b;
					return $rundis$elm_bootstrap$Bootstrap$Navbar$Shown;
				case 'Shown':
					var _v8 = _v0.b;
					return $rundis$elm_bootstrap$Bootstrap$Navbar$Hidden;
				default:
					return $rundis$elm_bootstrap$Bootstrap$Navbar$Hidden;
			}
		}
	});
var $rundis$elm_bootstrap$Bootstrap$Navbar$transitionHandler = F2(
	function (state, configRec) {
		return $elm$json$Json$Decode$succeed(
			configRec.toMsg(
				A2(
					$rundis$elm_bootstrap$Bootstrap$Navbar$mapState,
					function (s) {
						return _Utils_update(
							s,
							{
								visibility: A2($rundis$elm_bootstrap$Bootstrap$Navbar$visibilityTransition, configRec.withAnimation, s.visibility)
							});
					},
					state)));
	});
var $elm$core$String$fromFloat = _String_fromNumber;
var $rundis$elm_bootstrap$Bootstrap$Navbar$transitionStyle = function (maybeHeight) {
	var pixelHeight = A2(
		$elm$core$Maybe$withDefault,
		'0',
		A2(
			$elm$core$Maybe$map,
			function (v) {
				return $elm$core$String$fromFloat(v) + 'px';
			},
			maybeHeight));
	return _List_fromArray(
		[
			A2($elm$html$Html$Attributes$style, 'position', 'relative'),
			A2($elm$html$Html$Attributes$style, 'height', pixelHeight),
			A2($elm$html$Html$Attributes$style, 'width', '100%'),
			A2($elm$html$Html$Attributes$style, 'overflow', 'hidden'),
			A2($elm$html$Html$Attributes$style, '-webkit-transition-timing-function', 'ease'),
			A2($elm$html$Html$Attributes$style, '-o-transition-timing-function', 'ease'),
			A2($elm$html$Html$Attributes$style, 'transition-timing-function', 'ease'),
			A2($elm$html$Html$Attributes$style, '-webkit-transition-duration', '0.35s'),
			A2($elm$html$Html$Attributes$style, '-o-transition-duration', '0.35s'),
			A2($elm$html$Html$Attributes$style, 'transition-duration', '0.35s'),
			A2($elm$html$Html$Attributes$style, '-webkit-transition-property', 'height'),
			A2($elm$html$Html$Attributes$style, '-o-transition-property', 'height'),
			A2($elm$html$Html$Attributes$style, 'transition-property', 'height')
		]);
};
var $rundis$elm_bootstrap$Bootstrap$Navbar$menuAttributes = F2(
	function (state, configRec) {
		var visibility = state.a.visibility;
		var height = state.a.height;
		var defaults = _List_fromArray(
			[
				$elm$html$Html$Attributes$class('collapse navbar-collapse')
			]);
		switch (visibility.$) {
			case 'Hidden':
				if (height.$ === 'Nothing') {
					return ((!configRec.withAnimation) || A2($rundis$elm_bootstrap$Bootstrap$Navbar$shouldHideMenu, state, configRec)) ? defaults : _List_fromArray(
						[
							A2($elm$html$Html$Attributes$style, 'display', 'block'),
							A2($elm$html$Html$Attributes$style, 'height', '0'),
							A2($elm$html$Html$Attributes$style, 'overflow', 'hidden'),
							A2($elm$html$Html$Attributes$style, 'width', '100%')
						]);
				} else {
					return defaults;
				}
			case 'StartDown':
				return $rundis$elm_bootstrap$Bootstrap$Navbar$transitionStyle($elm$core$Maybe$Nothing);
			case 'AnimatingDown':
				return _Utils_ap(
					$rundis$elm_bootstrap$Bootstrap$Navbar$transitionStyle(height),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$Events$on,
							'transitionend',
							A2($rundis$elm_bootstrap$Bootstrap$Navbar$transitionHandler, state, configRec))
						]));
			case 'AnimatingUp':
				return _Utils_ap(
					$rundis$elm_bootstrap$Bootstrap$Navbar$transitionStyle($elm$core$Maybe$Nothing),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$Events$on,
							'transitionend',
							A2($rundis$elm_bootstrap$Bootstrap$Navbar$transitionHandler, state, configRec))
						]));
			case 'StartUp':
				return $rundis$elm_bootstrap$Bootstrap$Navbar$transitionStyle(height);
			default:
				return _Utils_ap(
					defaults,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('show')
						]));
		}
	});
var $rundis$elm_bootstrap$Bootstrap$Navbar$menuWrapperAttributes = F2(
	function (state, confRec) {
		var visibility = state.a.visibility;
		var height = state.a.height;
		var styleBlock = _List_fromArray(
			[
				A2($elm$html$Html$Attributes$style, 'display', 'block'),
				A2($elm$html$Html$Attributes$style, 'width', '100%')
			]);
		var display = function () {
			if (height.$ === 'Nothing') {
				return ((!confRec.withAnimation) || A2($rundis$elm_bootstrap$Bootstrap$Navbar$shouldHideMenu, state, confRec)) ? 'flex' : 'block';
			} else {
				return 'flex';
			}
		}();
		switch (visibility.$) {
			case 'Hidden':
				return _List_fromArray(
					[
						A2($elm$html$Html$Attributes$style, 'display', display),
						A2($elm$html$Html$Attributes$style, 'width', '100%')
					]);
			case 'StartDown':
				return styleBlock;
			case 'AnimatingDown':
				return styleBlock;
			case 'AnimatingUp':
				return styleBlock;
			case 'StartUp':
				return styleBlock;
			default:
				return ((!confRec.withAnimation) || A2($rundis$elm_bootstrap$Bootstrap$Navbar$shouldHideMenu, state, confRec)) ? _List_fromArray(
					[
						$elm$html$Html$Attributes$class('collapse navbar-collapse show')
					]) : _List_fromArray(
					[
						A2($elm$html$Html$Attributes$style, 'display', 'block')
					]);
		}
	});
var $elm$html$Html$nav = _VirtualDom_node('nav');
var $rundis$elm_bootstrap$Bootstrap$Navbar$expandOption = function (size) {
	var toClass = function (sz) {
		return $elm$html$Html$Attributes$class(
			'navbar-expand' + A2(
				$elm$core$Maybe$withDefault,
				'',
				A2(
					$elm$core$Maybe$map,
					function (s) {
						return '-' + s;
					},
					$rundis$elm_bootstrap$Bootstrap$General$Internal$screenSizeOption(sz))));
	};
	switch (size.$) {
		case 'XS':
			return _List_fromArray(
				[
					toClass($rundis$elm_bootstrap$Bootstrap$General$Internal$SM)
				]);
		case 'SM':
			return _List_fromArray(
				[
					toClass($rundis$elm_bootstrap$Bootstrap$General$Internal$MD)
				]);
		case 'MD':
			return _List_fromArray(
				[
					toClass($rundis$elm_bootstrap$Bootstrap$General$Internal$LG)
				]);
		case 'LG':
			return _List_fromArray(
				[
					toClass($rundis$elm_bootstrap$Bootstrap$General$Internal$XL)
				]);
		default:
			return _List_Nil;
	}
};
var $rundis$elm_bootstrap$Bootstrap$Navbar$fixOption = function (fix) {
	if (fix.$ === 'Top') {
		return 'fixed-top';
	} else {
		return 'fixed-bottom';
	}
};
var $elm$core$String$concat = function (strings) {
	return A2($elm$core$String$join, '', strings);
};
var $elm$core$Basics$round = _Basics_round;
var $avh4$elm_color$Color$toCssString = function (_v0) {
	var r = _v0.a;
	var g = _v0.b;
	var b = _v0.c;
	var a = _v0.d;
	var roundTo = function (x) {
		return $elm$core$Basics$round(x * 1000) / 1000;
	};
	var pct = function (x) {
		return $elm$core$Basics$round(x * 10000) / 100;
	};
	return $elm$core$String$concat(
		_List_fromArray(
			[
				'rgba(',
				$elm$core$String$fromFloat(
				pct(r)),
				'%,',
				$elm$core$String$fromFloat(
				pct(g)),
				'%,',
				$elm$core$String$fromFloat(
				pct(b)),
				'%,',
				$elm$core$String$fromFloat(
				roundTo(a)),
				')'
			]));
};
var $rundis$elm_bootstrap$Bootstrap$Navbar$backgroundColorOption = function (bgClass) {
	switch (bgClass.$) {
		case 'Roled':
			var role = bgClass.a;
			return A2($rundis$elm_bootstrap$Bootstrap$Internal$Role$toClass, 'bg', role);
		case 'Custom':
			var color = bgClass.a;
			return A2(
				$elm$html$Html$Attributes$style,
				'background-color',
				$avh4$elm_color$Color$toCssString(color));
		default:
			var classString = bgClass.a;
			return $elm$html$Html$Attributes$class(classString);
	}
};
var $rundis$elm_bootstrap$Bootstrap$Navbar$linkModifierClass = function (modifier) {
	return $elm$html$Html$Attributes$class(
		function () {
			if (modifier.$ === 'Dark') {
				return 'navbar-dark';
			} else {
				return 'navbar-light';
			}
		}());
};
var $rundis$elm_bootstrap$Bootstrap$Navbar$schemeAttributes = function (_v0) {
	var modifier = _v0.modifier;
	var bgColor = _v0.bgColor;
	return _List_fromArray(
		[
			$rundis$elm_bootstrap$Bootstrap$Navbar$linkModifierClass(modifier),
			$rundis$elm_bootstrap$Bootstrap$Navbar$backgroundColorOption(bgColor)
		]);
};
var $rundis$elm_bootstrap$Bootstrap$Navbar$navbarAttributes = function (options) {
	return _Utils_ap(
		_List_fromArray(
			[
				$elm$html$Html$Attributes$classList(
				_List_fromArray(
					[
						_Utils_Tuple2('navbar', true),
						_Utils_Tuple2('container', options.isContainer)
					]))
			]),
		_Utils_ap(
			$rundis$elm_bootstrap$Bootstrap$Navbar$expandOption(options.toggleAt),
			_Utils_ap(
				function () {
					var _v0 = options.scheme;
					if (_v0.$ === 'Just') {
						var scheme_ = _v0.a;
						return $rundis$elm_bootstrap$Bootstrap$Navbar$schemeAttributes(scheme_);
					} else {
						return _List_Nil;
					}
				}(),
				_Utils_ap(
					function () {
						var _v1 = options.fix;
						if (_v1.$ === 'Just') {
							var fix = _v1.a;
							return _List_fromArray(
								[
									$elm$html$Html$Attributes$class(
									$rundis$elm_bootstrap$Bootstrap$Navbar$fixOption(fix))
								]);
						} else {
							return _List_Nil;
						}
					}(),
					options.attributes))));
};
var $rundis$elm_bootstrap$Bootstrap$Navbar$renderCustom = function (items_) {
	return A2(
		$elm$core$List$map,
		function (_v0) {
			var item = _v0.a;
			return item;
		},
		items_);
};
var $rundis$elm_bootstrap$Bootstrap$Navbar$getOrInitDropdownStatus = F2(
	function (id, _v0) {
		var dropdowns = _v0.a.dropdowns;
		return A2(
			$elm$core$Maybe$withDefault,
			$rundis$elm_bootstrap$Bootstrap$Navbar$Closed,
			A2($elm$core$Dict$get, id, dropdowns));
	});
var $elm$html$Html$li = _VirtualDom_node('li');
var $elm$virtual_dom$VirtualDom$Custom = function (a) {
	return {$: 'Custom', a: a};
};
var $elm$html$Html$Events$custom = F2(
	function (event, decoder) {
		return A2(
			$elm$virtual_dom$VirtualDom$on,
			event,
			$elm$virtual_dom$VirtualDom$Custom(decoder));
	});
var $rundis$elm_bootstrap$Bootstrap$Navbar$toggleOpen = F3(
	function (state, id, _v0) {
		var toMsg = _v0.toMsg;
		var currStatus = A2($rundis$elm_bootstrap$Bootstrap$Navbar$getOrInitDropdownStatus, id, state);
		var newStatus = function () {
			switch (currStatus.$) {
				case 'Open':
					return $rundis$elm_bootstrap$Bootstrap$Navbar$Closed;
				case 'ListenClicks':
					return $rundis$elm_bootstrap$Bootstrap$Navbar$Closed;
				default:
					return $rundis$elm_bootstrap$Bootstrap$Navbar$Open;
			}
		}();
		return toMsg(
			A2(
				$rundis$elm_bootstrap$Bootstrap$Navbar$mapState,
				function (s) {
					return _Utils_update(
						s,
						{
							dropdowns: A3($elm$core$Dict$insert, id, newStatus, s.dropdowns)
						});
				},
				state));
	});
var $rundis$elm_bootstrap$Bootstrap$Navbar$renderDropdownToggle = F4(
	function (state, id, configRec, _v0) {
		var attributes = _v0.a.attributes;
		var children = _v0.a.children;
		return A2(
			$elm$html$Html$a,
			_Utils_ap(
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('nav-link dropdown-toggle'),
						$elm$html$Html$Attributes$href('#'),
						A2(
						$elm$html$Html$Events$custom,
						'click',
						$elm$json$Json$Decode$succeed(
							{
								message: A3($rundis$elm_bootstrap$Bootstrap$Navbar$toggleOpen, state, id, configRec),
								preventDefault: true,
								stopPropagation: false
							}))
					]),
				attributes),
			children);
	});
var $rundis$elm_bootstrap$Bootstrap$Navbar$renderDropdown = F3(
	function (state, configRec, _v0) {
		var ddRec = _v0.a;
		var needsDropup = A2(
			$elm$core$Maybe$withDefault,
			false,
			A2(
				$elm$core$Maybe$map,
				function (fix) {
					if (fix.$ === 'Bottom') {
						return true;
					} else {
						return false;
					}
				},
				configRec.options.fix));
		var isShown = !_Utils_eq(
			A2($rundis$elm_bootstrap$Bootstrap$Navbar$getOrInitDropdownStatus, ddRec.id, state),
			$rundis$elm_bootstrap$Bootstrap$Navbar$Closed);
		return A2(
			$elm$html$Html$li,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$classList(
					_List_fromArray(
						[
							_Utils_Tuple2('nav-item', true),
							_Utils_Tuple2('dropdown', true),
							_Utils_Tuple2('shown', isShown),
							_Utils_Tuple2('dropup', needsDropup)
						]))
				]),
			_List_fromArray(
				[
					A4($rundis$elm_bootstrap$Bootstrap$Navbar$renderDropdownToggle, state, ddRec.id, configRec, ddRec.toggle),
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$classList(
							_List_fromArray(
								[
									_Utils_Tuple2('dropdown-menu', true),
									_Utils_Tuple2('show', isShown)
								]))
						]),
					A2(
						$elm$core$List$map,
						function (_v1) {
							var item = _v1.a;
							return item;
						},
						ddRec.items))
				]));
	});
var $rundis$elm_bootstrap$Bootstrap$Navbar$renderItemLink = function (_v0) {
	var attributes = _v0.attributes;
	var children = _v0.children;
	return A2(
		$elm$html$Html$li,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('nav-item')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$a,
				_Utils_ap(
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('nav-link')
						]),
					attributes),
				children)
			]));
};
var $elm$html$Html$ul = _VirtualDom_node('ul');
var $rundis$elm_bootstrap$Bootstrap$Navbar$renderNav = F3(
	function (state, configRec, navItems) {
		return A2(
			$elm$html$Html$ul,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('navbar-nav mr-auto')
				]),
			A2(
				$elm$core$List$map,
				function (item) {
					if (item.$ === 'Item') {
						var item_ = item.a;
						return $rundis$elm_bootstrap$Bootstrap$Navbar$renderItemLink(item_);
					} else {
						var dropdown_ = item.a;
						return A3($rundis$elm_bootstrap$Bootstrap$Navbar$renderDropdown, state, configRec, dropdown_);
					}
				},
				navItems));
	});
var $elm$json$Json$Decode$decodeValue = _Json_run;
var $elm$json$Json$Decode$float = _Json_decodeFloat;
var $elm$json$Json$Decode$oneOf = _Json_oneOf;
var $rundis$elm_bootstrap$Bootstrap$Utilities$DomHelper$parentElement = function (decoder) {
	return A2($elm$json$Json$Decode$field, 'parentElement', decoder);
};
var $rundis$elm_bootstrap$Bootstrap$Utilities$DomHelper$target = function (decoder) {
	return A2($elm$json$Json$Decode$field, 'target', decoder);
};
var $elm$json$Json$Decode$value = _Json_decodeValue;
var $rundis$elm_bootstrap$Bootstrap$Navbar$heightDecoder = function () {
	var tagDecoder = A3(
		$elm$json$Json$Decode$map2,
		F2(
			function (tag, val) {
				return _Utils_Tuple2(tag, val);
			}),
		A2($elm$json$Json$Decode$field, 'tagName', $elm$json$Json$Decode$string),
		$elm$json$Json$Decode$value);
	var resToDec = function (res) {
		if (res.$ === 'Ok') {
			var v = res.a;
			return $elm$json$Json$Decode$succeed(v);
		} else {
			var err = res.a;
			return $elm$json$Json$Decode$fail(
				$elm$json$Json$Decode$errorToString(err));
		}
	};
	var fromNavDec = $elm$json$Json$Decode$oneOf(
		_List_fromArray(
			[
				A2(
				$elm$json$Json$Decode$at,
				_List_fromArray(
					['childNodes', '2', 'childNodes', '0', 'offsetHeight']),
				$elm$json$Json$Decode$float),
				A2(
				$elm$json$Json$Decode$at,
				_List_fromArray(
					['childNodes', '1', 'childNodes', '0', 'offsetHeight']),
				$elm$json$Json$Decode$float)
			]));
	var fromButtonDec = $rundis$elm_bootstrap$Bootstrap$Utilities$DomHelper$parentElement(fromNavDec);
	return A2(
		$elm$json$Json$Decode$andThen,
		function (_v0) {
			var tag = _v0.a;
			var val = _v0.b;
			switch (tag) {
				case 'NAV':
					return resToDec(
						A2($elm$json$Json$Decode$decodeValue, fromNavDec, val));
				case 'BUTTON':
					return resToDec(
						A2($elm$json$Json$Decode$decodeValue, fromButtonDec, val));
				default:
					return $elm$json$Json$Decode$succeed(0);
			}
		},
		$rundis$elm_bootstrap$Bootstrap$Utilities$DomHelper$target(
			$rundis$elm_bootstrap$Bootstrap$Utilities$DomHelper$parentElement(tagDecoder)));
}();
var $rundis$elm_bootstrap$Bootstrap$Navbar$toggleHandler = F2(
	function (state, configRec) {
		var height = state.a.height;
		var updState = function (h) {
			return A2(
				$rundis$elm_bootstrap$Bootstrap$Navbar$mapState,
				function (s) {
					return _Utils_update(
						s,
						{
							height: $elm$core$Maybe$Just(h),
							visibility: A2($rundis$elm_bootstrap$Bootstrap$Navbar$visibilityTransition, configRec.withAnimation, s.visibility)
						});
				},
				state);
		};
		return A2(
			$elm$html$Html$Events$on,
			'click',
			A2(
				$elm$json$Json$Decode$andThen,
				function (v) {
					return $elm$json$Json$Decode$succeed(
						configRec.toMsg(
							(v > 0) ? updState(v) : updState(
								A2($elm$core$Maybe$withDefault, 0, height))));
				},
				$rundis$elm_bootstrap$Bootstrap$Navbar$heightDecoder));
	});
var $rundis$elm_bootstrap$Bootstrap$Navbar$view = F2(
	function (state, conf) {
		var configRec = conf.a;
		return A2(
			$elm$html$Html$nav,
			$rundis$elm_bootstrap$Bootstrap$Navbar$navbarAttributes(configRec.options),
			_Utils_ap(
				$rundis$elm_bootstrap$Bootstrap$Navbar$maybeBrand(configRec.brand),
				_Utils_ap(
					_List_fromArray(
						[
							A2(
							$elm$html$Html$button,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class(
									'navbar-toggler' + A2(
										$elm$core$Maybe$withDefault,
										'',
										A2(
											$elm$core$Maybe$map,
											function (_v0) {
												return ' navbar-toggler-right';
											},
											configRec.brand))),
									$elm$html$Html$Attributes$type_('button'),
									A2($rundis$elm_bootstrap$Bootstrap$Navbar$toggleHandler, state, configRec)
								]),
							_List_fromArray(
								[
									A2(
									$elm$html$Html$span,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('navbar-toggler-icon')
										]),
									_List_Nil)
								]))
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$div,
							A2($rundis$elm_bootstrap$Bootstrap$Navbar$menuAttributes, state, configRec),
							_List_fromArray(
								[
									A2(
									$elm$html$Html$div,
									A2($rundis$elm_bootstrap$Bootstrap$Navbar$menuWrapperAttributes, state, configRec),
									_Utils_ap(
										_List_fromArray(
											[
												A3($rundis$elm_bootstrap$Bootstrap$Navbar$renderNav, state, configRec, configRec.items)
											]),
										$rundis$elm_bootstrap$Bootstrap$Navbar$renderCustom(configRec.customItems)))
								]))
						]))));
	});
var $rundis$elm_bootstrap$Bootstrap$Navbar$withAnimation = function (config_) {
	return A2(
		$rundis$elm_bootstrap$Bootstrap$Navbar$updateConfig,
		function (conf) {
			return _Utils_update(
				conf,
				{withAnimation: true});
		},
		config_);
};
var $author$project$Main$navbar = function (model) {
	return A2(
		$rundis$elm_bootstrap$Bootstrap$Navbar$view,
		model.navbarState,
		A2(
			$rundis$elm_bootstrap$Bootstrap$Navbar$items,
			_List_fromArray(
				[
					A2(
					$rundis$elm_bootstrap$Bootstrap$Navbar$itemLink,
					_List_Nil,
					_List_fromArray(
						[
							$elm$html$Html$text('Join Game')
						])),
					A2(
					$rundis$elm_bootstrap$Bootstrap$Navbar$itemLinkActive,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$href('#'),
							$elm$html$Html$Events$onClick($author$project$Main$ToggleMyPage)
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('My Page')
						])),
					A2(
					$rundis$elm_bootstrap$Bootstrap$Navbar$itemLinkActive,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$href('#'),
							$elm$html$Html$Events$onClick(
							$author$project$Main$ChangeMyPageState($author$project$Main$Event))
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('Result')
						]))
				]),
			A3(
				$rundis$elm_bootstrap$Bootstrap$Navbar$brand,
				_List_fromArray(
					[
						A2($elm$html$Html$Attributes$style, 'font-weight', 'bold'),
						$elm$html$Html$Attributes$href('#')
					]),
				_List_fromArray(
					[
						$elm$html$Html$text('BGC')
					]),
				$rundis$elm_bootstrap$Bootstrap$Navbar$withAnimation(
					$rundis$elm_bootstrap$Bootstrap$Navbar$fixTop(
						$rundis$elm_bootstrap$Bootstrap$Navbar$config($author$project$Main$NavbarMsg))))));
};
var $author$project$Main$viewMain = F2(
	function (model, tn) {
		return A2(
			$rundis$elm_bootstrap$Bootstrap$Grid$container,
			_List_fromArray(
				[
					A2($elm$html$Html$Attributes$style, 'margin-top', '4rem'),
					A2($elm$html$Html$Attributes$style, 'margin-bottom', '3rem')
				]),
			_List_fromArray(
				[
					$rundis$elm_bootstrap$Bootstrap$CDN$stylesheet,
					$author$project$Main$navbar(model),
					A2($author$project$Main$mainContent, model, tn)
				]));
	});
var $author$project$Main$Personal = {$: 'Personal'};
var $author$project$Main$myPageNavbar = function (model) {
	return A2(
		$rundis$elm_bootstrap$Bootstrap$Navbar$view,
		model.navbarState,
		A2(
			$rundis$elm_bootstrap$Bootstrap$Navbar$items,
			_List_fromArray(
				[
					A2(
					$rundis$elm_bootstrap$Bootstrap$Navbar$itemLinkActive,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$href('#'),
							$elm$html$Html$Events$onClick($author$project$Main$ToggleMyPage)
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('Join Game')
						])),
					A2(
					$rundis$elm_bootstrap$Bootstrap$Navbar$itemLink,
					_List_Nil,
					_List_fromArray(
						[
							$elm$html$Html$text('My Page')
						])),
					A2(
					$rundis$elm_bootstrap$Bootstrap$Navbar$itemLinkActive,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$href('#'),
							$elm$html$Html$Events$onClick(
							$author$project$Main$ChangeMyPageState($author$project$Main$Event))
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('Result')
						])),
					A2(
					$rundis$elm_bootstrap$Bootstrap$Navbar$itemLinkActive,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$href('#'),
							$elm$html$Html$Events$onClick(
							$author$project$Main$ChangeMyPageState($author$project$Main$Personal))
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('My Scores')
						])),
					A2(
					$rundis$elm_bootstrap$Bootstrap$Navbar$itemLinkActive,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$href('#'),
							$elm$html$Html$Events$onClick(
							$author$project$Main$ChangeMyPageState($author$project$Main$Setting))
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('User Info')
						]))
				]),
			A3(
				$rundis$elm_bootstrap$Bootstrap$Navbar$brand,
				_List_fromArray(
					[
						A2($elm$html$Html$Attributes$style, 'font-weight', 'bold'),
						$elm$html$Html$Attributes$href('#')
					]),
				_List_fromArray(
					[
						$elm$html$Html$text('BGC')
					]),
				$rundis$elm_bootstrap$Bootstrap$Navbar$withAnimation(
					$rundis$elm_bootstrap$Bootstrap$Navbar$fixTop(
						$rundis$elm_bootstrap$Bootstrap$Navbar$config($author$project$Main$NavbarMsg))))));
};
var $author$project$Main$FormEventSelect = function (a) {
	return {$: 'FormEventSelect', a: a};
};
var $author$project$Main$FormGameSelect = function (a) {
	return {$: 'FormGameSelect', a: a};
};
var $rundis$elm_bootstrap$Bootstrap$Form$Select$Attrs = function (a) {
	return {$: 'Attrs', a: a};
};
var $rundis$elm_bootstrap$Bootstrap$Form$Select$attrs = function (attrs_) {
	return $rundis$elm_bootstrap$Bootstrap$Form$Select$Attrs(attrs_);
};
var $rundis$elm_bootstrap$Bootstrap$Grid$Col$bottomXs = A2($rundis$elm_bootstrap$Bootstrap$Grid$Internal$colVAlign, $rundis$elm_bootstrap$Bootstrap$General$Internal$XS, $rundis$elm_bootstrap$Bootstrap$Grid$Internal$Bottom);
var $rundis$elm_bootstrap$Bootstrap$Form$Select$Id = function (a) {
	return {$: 'Id', a: a};
};
var $rundis$elm_bootstrap$Bootstrap$Form$Select$id = function (id_) {
	return $rundis$elm_bootstrap$Bootstrap$Form$Select$Id(id_);
};
var $rundis$elm_bootstrap$Bootstrap$Grid$Row$leftXs = A2($rundis$elm_bootstrap$Bootstrap$Grid$Internal$rowHAlign, $rundis$elm_bootstrap$Bootstrap$General$Internal$XS, $rundis$elm_bootstrap$Bootstrap$General$Internal$Left);
var $rundis$elm_bootstrap$Bootstrap$Form$Select$OnChange = function (a) {
	return {$: 'OnChange', a: a};
};
var $rundis$elm_bootstrap$Bootstrap$Form$Select$onChange = function (toMsg) {
	return $rundis$elm_bootstrap$Bootstrap$Form$Select$OnChange(toMsg);
};
var $rundis$elm_bootstrap$Bootstrap$Utilities$Spacing$p1 = $elm$html$Html$Attributes$class('p-1');
var $rundis$elm_bootstrap$Bootstrap$Form$Input$PlainText = function (a) {
	return {$: 'PlainText', a: a};
};
var $rundis$elm_bootstrap$Bootstrap$Form$Input$plainText = function (val) {
	return $rundis$elm_bootstrap$Bootstrap$Form$Input$PlainText(val);
};
var $rundis$elm_bootstrap$Bootstrap$General$Internal$Right = {$: 'Right'};
var $rundis$elm_bootstrap$Bootstrap$Grid$Row$rightXs = A2($rundis$elm_bootstrap$Bootstrap$Grid$Internal$rowHAlign, $rundis$elm_bootstrap$Bootstrap$General$Internal$XS, $rundis$elm_bootstrap$Bootstrap$General$Internal$Right);
var $rundis$elm_bootstrap$Bootstrap$Form$Select$Select = function (a) {
	return {$: 'Select', a: a};
};
var $rundis$elm_bootstrap$Bootstrap$Form$Select$create = F2(
	function (options, items) {
		return $rundis$elm_bootstrap$Bootstrap$Form$Select$Select(
			{items: items, options: options});
	});
var $elm$html$Html$select = _VirtualDom_node('select');
var $rundis$elm_bootstrap$Bootstrap$Form$Select$applyModifier = F2(
	function (modifier, options) {
		switch (modifier.$) {
			case 'Size':
				var size_ = modifier.a;
				return _Utils_update(
					options,
					{
						size: $elm$core$Maybe$Just(size_)
					});
			case 'Id':
				var id_ = modifier.a;
				return _Utils_update(
					options,
					{
						id: $elm$core$Maybe$Just(id_)
					});
			case 'Custom':
				return _Utils_update(
					options,
					{custom: true});
			case 'Disabled':
				var val = modifier.a;
				return _Utils_update(
					options,
					{disabled: val});
			case 'OnChange':
				var onChange_ = modifier.a;
				return _Utils_update(
					options,
					{
						onChange: $elm$core$Maybe$Just(onChange_)
					});
			case 'Validation':
				var validation_ = modifier.a;
				return _Utils_update(
					options,
					{
						validation: $elm$core$Maybe$Just(validation_)
					});
			default:
				var attrs_ = modifier.a;
				return _Utils_update(
					options,
					{
						attributes: _Utils_ap(options.attributes, attrs_)
					});
		}
	});
var $rundis$elm_bootstrap$Bootstrap$Form$Select$customEventOnChange = function (tagger) {
	return A2(
		$elm$html$Html$Events$on,
		'change',
		A2($elm$json$Json$Decode$map, tagger, $elm$html$Html$Events$targetValue));
};
var $rundis$elm_bootstrap$Bootstrap$Form$Select$defaultOptions = {attributes: _List_Nil, custom: false, disabled: false, id: $elm$core$Maybe$Nothing, onChange: $elm$core$Maybe$Nothing, size: $elm$core$Maybe$Nothing, validation: $elm$core$Maybe$Nothing};
var $rundis$elm_bootstrap$Bootstrap$Form$Select$sizeAttribute = F2(
	function (isCustom, size_) {
		var prefix = isCustom ? 'custom-select-' : 'form-control-';
		return A2(
			$elm$core$Maybe$map,
			function (s) {
				return $elm$html$Html$Attributes$class(
					_Utils_ap(prefix, s));
			},
			$rundis$elm_bootstrap$Bootstrap$General$Internal$screenSizeOption(size_));
	});
var $rundis$elm_bootstrap$Bootstrap$Form$Select$validationAttribute = function (validation_) {
	return $elm$html$Html$Attributes$class(
		$rundis$elm_bootstrap$Bootstrap$Form$FormInternal$validationToString(validation_));
};
var $rundis$elm_bootstrap$Bootstrap$Form$Select$toAttributes = function (modifiers) {
	var options = A3($elm$core$List$foldl, $rundis$elm_bootstrap$Bootstrap$Form$Select$applyModifier, $rundis$elm_bootstrap$Bootstrap$Form$Select$defaultOptions, modifiers);
	return _Utils_ap(
		_List_fromArray(
			[
				$elm$html$Html$Attributes$classList(
				_List_fromArray(
					[
						_Utils_Tuple2('form-control', !options.custom),
						_Utils_Tuple2('custom-select', options.custom)
					])),
				$elm$html$Html$Attributes$disabled(options.disabled)
			]),
		_Utils_ap(
			A2(
				$elm$core$List$filterMap,
				$elm$core$Basics$identity,
				_List_fromArray(
					[
						A2($elm$core$Maybe$map, $elm$html$Html$Attributes$id, options.id),
						A2(
						$elm$core$Maybe$andThen,
						$rundis$elm_bootstrap$Bootstrap$Form$Select$sizeAttribute(options.custom),
						options.size),
						A2($elm$core$Maybe$map, $rundis$elm_bootstrap$Bootstrap$Form$Select$customEventOnChange, options.onChange),
						A2($elm$core$Maybe$map, $rundis$elm_bootstrap$Bootstrap$Form$Select$validationAttribute, options.validation)
					])),
			options.attributes));
};
var $rundis$elm_bootstrap$Bootstrap$Form$Select$view = function (_v0) {
	var options = _v0.a.options;
	var items = _v0.a.items;
	return A2(
		$elm$html$Html$select,
		$rundis$elm_bootstrap$Bootstrap$Form$Select$toAttributes(options),
		A2(
			$elm$core$List$map,
			function (_v1) {
				var e = _v1.a;
				return e;
			},
			items));
};
var $rundis$elm_bootstrap$Bootstrap$Form$Select$select = F2(
	function (options, items) {
		return $rundis$elm_bootstrap$Bootstrap$Form$Select$view(
			A2($rundis$elm_bootstrap$Bootstrap$Form$Select$create, options, items));
	});
var $rundis$elm_bootstrap$Bootstrap$Form$Select$Size = function (a) {
	return {$: 'Size', a: a};
};
var $rundis$elm_bootstrap$Bootstrap$Form$Select$small = $rundis$elm_bootstrap$Bootstrap$Form$Select$Size($rundis$elm_bootstrap$Bootstrap$General$Internal$SM);
var $rundis$elm_bootstrap$Bootstrap$Table$TableAttr = function (a) {
	return {$: 'TableAttr', a: a};
};
var $rundis$elm_bootstrap$Bootstrap$Table$attr = function (attr_) {
	return $rundis$elm_bootstrap$Bootstrap$Table$TableAttr(attr_);
};
var $rundis$elm_bootstrap$Bootstrap$Table$CellAttr = function (a) {
	return {$: 'CellAttr', a: a};
};
var $rundis$elm_bootstrap$Bootstrap$Table$cellAttr = function (attr_) {
	return $rundis$elm_bootstrap$Bootstrap$Table$CellAttr(attr_);
};
var $rundis$elm_bootstrap$Bootstrap$Table$Small = {$: 'Small'};
var $rundis$elm_bootstrap$Bootstrap$Table$small = $rundis$elm_bootstrap$Bootstrap$Table$Small;
var $rundis$elm_bootstrap$Bootstrap$Table$Inversed = {$: 'Inversed'};
var $rundis$elm_bootstrap$Bootstrap$Table$isResponsive = function (option) {
	if (option.$ === 'Responsive') {
		return true;
	} else {
		return false;
	}
};
var $rundis$elm_bootstrap$Bootstrap$Table$KeyedTBody = function (a) {
	return {$: 'KeyedTBody', a: a};
};
var $rundis$elm_bootstrap$Bootstrap$Table$TBody = function (a) {
	return {$: 'TBody', a: a};
};
var $rundis$elm_bootstrap$Bootstrap$Table$InversedRow = function (a) {
	return {$: 'InversedRow', a: a};
};
var $rundis$elm_bootstrap$Bootstrap$Table$KeyedRow = function (a) {
	return {$: 'KeyedRow', a: a};
};
var $rundis$elm_bootstrap$Bootstrap$Table$Row = function (a) {
	return {$: 'Row', a: a};
};
var $rundis$elm_bootstrap$Bootstrap$Table$InversedCell = function (a) {
	return {$: 'InversedCell', a: a};
};
var $rundis$elm_bootstrap$Bootstrap$Table$Td = function (a) {
	return {$: 'Td', a: a};
};
var $rundis$elm_bootstrap$Bootstrap$Table$Th = function (a) {
	return {$: 'Th', a: a};
};
var $rundis$elm_bootstrap$Bootstrap$Table$mapInversedCell = function (cell) {
	var inverseOptions = function (options) {
		return A2(
			$elm$core$List$map,
			function (opt) {
				if (opt.$ === 'RoledCell') {
					var role = opt.a;
					return $rundis$elm_bootstrap$Bootstrap$Table$InversedCell(role);
				} else {
					return opt;
				}
			},
			options);
	};
	if (cell.$ === 'Th') {
		var cellCfg = cell.a;
		return $rundis$elm_bootstrap$Bootstrap$Table$Th(
			_Utils_update(
				cellCfg,
				{
					options: inverseOptions(cellCfg.options)
				}));
	} else {
		var cellCfg = cell.a;
		return $rundis$elm_bootstrap$Bootstrap$Table$Td(
			_Utils_update(
				cellCfg,
				{
					options: inverseOptions(cellCfg.options)
				}));
	}
};
var $rundis$elm_bootstrap$Bootstrap$Table$mapInversedRow = function (row) {
	var inversedOptions = function (options) {
		return A2(
			$elm$core$List$map,
			function (opt) {
				if (opt.$ === 'RoledRow') {
					var role = opt.a;
					return $rundis$elm_bootstrap$Bootstrap$Table$InversedRow(role);
				} else {
					return opt;
				}
			},
			options);
	};
	if (row.$ === 'Row') {
		var options = row.a.options;
		var cells = row.a.cells;
		return $rundis$elm_bootstrap$Bootstrap$Table$Row(
			{
				cells: A2($elm$core$List$map, $rundis$elm_bootstrap$Bootstrap$Table$mapInversedCell, cells),
				options: inversedOptions(options)
			});
	} else {
		var options = row.a.options;
		var cells = row.a.cells;
		return $rundis$elm_bootstrap$Bootstrap$Table$KeyedRow(
			{
				cells: A2(
					$elm$core$List$map,
					function (_v1) {
						var key = _v1.a;
						var cell = _v1.b;
						return _Utils_Tuple2(
							key,
							$rundis$elm_bootstrap$Bootstrap$Table$mapInversedCell(cell));
					},
					cells),
				options: inversedOptions(options)
			});
	}
};
var $rundis$elm_bootstrap$Bootstrap$Table$maybeMapInversedTBody = F2(
	function (isTableInversed, tbody_) {
		var _v0 = _Utils_Tuple2(isTableInversed, tbody_);
		if (!_v0.a) {
			return tbody_;
		} else {
			if (_v0.b.$ === 'TBody') {
				var body = _v0.b.a;
				return $rundis$elm_bootstrap$Bootstrap$Table$TBody(
					_Utils_update(
						body,
						{
							rows: A2($elm$core$List$map, $rundis$elm_bootstrap$Bootstrap$Table$mapInversedRow, body.rows)
						}));
			} else {
				var keyedBody = _v0.b.a;
				return $rundis$elm_bootstrap$Bootstrap$Table$KeyedTBody(
					_Utils_update(
						keyedBody,
						{
							rows: A2(
								$elm$core$List$map,
								function (_v1) {
									var key = _v1.a;
									var row = _v1.b;
									return _Utils_Tuple2(
										key,
										$rundis$elm_bootstrap$Bootstrap$Table$mapInversedRow(row));
								},
								keyedBody.rows)
						}));
			}
		}
	});
var $rundis$elm_bootstrap$Bootstrap$Table$InversedHead = {$: 'InversedHead'};
var $rundis$elm_bootstrap$Bootstrap$Table$THead = function (a) {
	return {$: 'THead', a: a};
};
var $rundis$elm_bootstrap$Bootstrap$Table$maybeMapInversedTHead = F2(
	function (isTableInversed, _v0) {
		var thead_ = _v0.a;
		var isHeadInversed = A2(
			$elm$core$List$any,
			function (opt) {
				return _Utils_eq(opt, $rundis$elm_bootstrap$Bootstrap$Table$InversedHead);
			},
			thead_.options);
		return $rundis$elm_bootstrap$Bootstrap$Table$THead(
			(isTableInversed || isHeadInversed) ? _Utils_update(
				thead_,
				{
					rows: A2($elm$core$List$map, $rundis$elm_bootstrap$Bootstrap$Table$mapInversedRow, thead_.rows)
				}) : thead_);
	});
var $rundis$elm_bootstrap$Bootstrap$Table$maybeWrapResponsive = F2(
	function (options, table_) {
		var responsiveClass = $elm$html$Html$Attributes$class(
			'table-responsive' + A2(
				$elm$core$Maybe$withDefault,
				'',
				A2(
					$elm$core$Maybe$map,
					function (v) {
						return '-' + v;
					},
					A2(
						$elm$core$Maybe$andThen,
						$rundis$elm_bootstrap$Bootstrap$General$Internal$screenSizeOption,
						A2(
							$elm$core$Maybe$andThen,
							function (opt) {
								if (opt.$ === 'Responsive') {
									var val = opt.a;
									return val;
								} else {
									return $elm$core$Maybe$Nothing;
								}
							},
							$elm$core$List$head(
								A2($elm$core$List$filter, $rundis$elm_bootstrap$Bootstrap$Table$isResponsive, options)))))));
		return A2($elm$core$List$any, $rundis$elm_bootstrap$Bootstrap$Table$isResponsive, options) ? A2(
			$elm$html$Html$div,
			_List_fromArray(
				[responsiveClass]),
			_List_fromArray(
				[table_])) : table_;
	});
var $elm$html$Html$Attributes$scope = $elm$html$Html$Attributes$stringProperty('scope');
var $rundis$elm_bootstrap$Bootstrap$Table$addScopeIfTh = function (cell) {
	if (cell.$ === 'Th') {
		var cellConfig = cell.a;
		return $rundis$elm_bootstrap$Bootstrap$Table$Th(
			_Utils_update(
				cellConfig,
				{
					options: A2(
						$elm$core$List$cons,
						$rundis$elm_bootstrap$Bootstrap$Table$cellAttr(
							$elm$html$Html$Attributes$scope('row')),
						cellConfig.options)
				}));
	} else {
		return cell;
	}
};
var $rundis$elm_bootstrap$Bootstrap$Table$maybeAddScopeToFirstCell = function (row) {
	if (row.$ === 'Row') {
		var options = row.a.options;
		var cells = row.a.cells;
		if (!cells.b) {
			return row;
		} else {
			var first = cells.a;
			var rest = cells.b;
			return $rundis$elm_bootstrap$Bootstrap$Table$Row(
				{
					cells: A2(
						$elm$core$List$cons,
						$rundis$elm_bootstrap$Bootstrap$Table$addScopeIfTh(first),
						rest),
					options: options
				});
		}
	} else {
		var options = row.a.options;
		var cells = row.a.cells;
		if (!cells.b) {
			return row;
		} else {
			var _v3 = cells.a;
			var firstKey = _v3.a;
			var first = _v3.b;
			var rest = cells.b;
			return $rundis$elm_bootstrap$Bootstrap$Table$KeyedRow(
				{
					cells: A2(
						$elm$core$List$cons,
						_Utils_Tuple2(
							firstKey,
							$rundis$elm_bootstrap$Bootstrap$Table$addScopeIfTh(first)),
						rest),
					options: options
				});
		}
	}
};
var $rundis$elm_bootstrap$Bootstrap$Table$cellAttribute = function (option) {
	switch (option.$) {
		case 'RoledCell':
			if (option.a.$ === 'Roled') {
				var role = option.a.a;
				return A2($rundis$elm_bootstrap$Bootstrap$Internal$Role$toClass, 'table', role);
			} else {
				var _v1 = option.a;
				return $elm$html$Html$Attributes$class('table-active');
			}
		case 'InversedCell':
			if (option.a.$ === 'Roled') {
				var role = option.a.a;
				return A2($rundis$elm_bootstrap$Bootstrap$Internal$Role$toClass, 'bg-', role);
			} else {
				var _v2 = option.a;
				return $elm$html$Html$Attributes$class('bg-active');
			}
		default:
			var attr_ = option.a;
			return attr_;
	}
};
var $rundis$elm_bootstrap$Bootstrap$Table$cellAttributes = function (options) {
	return A2($elm$core$List$map, $rundis$elm_bootstrap$Bootstrap$Table$cellAttribute, options);
};
var $elm$html$Html$td = _VirtualDom_node('td');
var $elm$html$Html$th = _VirtualDom_node('th');
var $rundis$elm_bootstrap$Bootstrap$Table$renderCell = function (cell) {
	if (cell.$ === 'Td') {
		var options = cell.a.options;
		var children = cell.a.children;
		return A2(
			$elm$html$Html$td,
			$rundis$elm_bootstrap$Bootstrap$Table$cellAttributes(options),
			children);
	} else {
		var options = cell.a.options;
		var children = cell.a.children;
		return A2(
			$elm$html$Html$th,
			$rundis$elm_bootstrap$Bootstrap$Table$cellAttributes(options),
			children);
	}
};
var $rundis$elm_bootstrap$Bootstrap$Table$rowClass = function (option) {
	switch (option.$) {
		case 'RoledRow':
			if (option.a.$ === 'Roled') {
				var role_ = option.a.a;
				return A2($rundis$elm_bootstrap$Bootstrap$Internal$Role$toClass, 'table', role_);
			} else {
				var _v1 = option.a;
				return $elm$html$Html$Attributes$class('table-active');
			}
		case 'InversedRow':
			if (option.a.$ === 'Roled') {
				var role_ = option.a.a;
				return A2($rundis$elm_bootstrap$Bootstrap$Internal$Role$toClass, 'bg', role_);
			} else {
				var _v2 = option.a;
				return $elm$html$Html$Attributes$class('bg-active');
			}
		default:
			var attr_ = option.a;
			return attr_;
	}
};
var $rundis$elm_bootstrap$Bootstrap$Table$rowAttributes = function (options) {
	return A2($elm$core$List$map, $rundis$elm_bootstrap$Bootstrap$Table$rowClass, options);
};
var $elm$html$Html$tr = _VirtualDom_node('tr');
var $rundis$elm_bootstrap$Bootstrap$Table$renderRow = function (row) {
	if (row.$ === 'Row') {
		var options = row.a.options;
		var cells = row.a.cells;
		return A2(
			$elm$html$Html$tr,
			$rundis$elm_bootstrap$Bootstrap$Table$rowAttributes(options),
			A2($elm$core$List$map, $rundis$elm_bootstrap$Bootstrap$Table$renderCell, cells));
	} else {
		var options = row.a.options;
		var cells = row.a.cells;
		return A3(
			$elm$html$Html$Keyed$node,
			'tr',
			$rundis$elm_bootstrap$Bootstrap$Table$rowAttributes(options),
			A2(
				$elm$core$List$map,
				function (_v1) {
					var key = _v1.a;
					var cell = _v1.b;
					return _Utils_Tuple2(
						key,
						$rundis$elm_bootstrap$Bootstrap$Table$renderCell(cell));
				},
				cells));
	}
};
var $elm$html$Html$tbody = _VirtualDom_node('tbody');
var $rundis$elm_bootstrap$Bootstrap$Table$renderTBody = function (body) {
	if (body.$ === 'TBody') {
		var attributes = body.a.attributes;
		var rows = body.a.rows;
		return A2(
			$elm$html$Html$tbody,
			attributes,
			A2(
				$elm$core$List$map,
				function (row) {
					return $rundis$elm_bootstrap$Bootstrap$Table$renderRow(
						$rundis$elm_bootstrap$Bootstrap$Table$maybeAddScopeToFirstCell(row));
				},
				rows));
	} else {
		var attributes = body.a.attributes;
		var rows = body.a.rows;
		return A3(
			$elm$html$Html$Keyed$node,
			'tbody',
			attributes,
			A2(
				$elm$core$List$map,
				function (_v1) {
					var key = _v1.a;
					var row = _v1.b;
					return _Utils_Tuple2(
						key,
						$rundis$elm_bootstrap$Bootstrap$Table$renderRow(
							$rundis$elm_bootstrap$Bootstrap$Table$maybeAddScopeToFirstCell(row)));
				},
				rows));
	}
};
var $elm$html$Html$thead = _VirtualDom_node('thead');
var $rundis$elm_bootstrap$Bootstrap$Table$theadAttribute = function (option) {
	switch (option.$) {
		case 'InversedHead':
			return $elm$html$Html$Attributes$class('thead-dark');
		case 'DefaultHead':
			return $elm$html$Html$Attributes$class('thead-default');
		default:
			var attr_ = option.a;
			return attr_;
	}
};
var $rundis$elm_bootstrap$Bootstrap$Table$theadAttributes = function (options) {
	return A2($elm$core$List$map, $rundis$elm_bootstrap$Bootstrap$Table$theadAttribute, options);
};
var $rundis$elm_bootstrap$Bootstrap$Table$renderTHead = function (_v0) {
	var options = _v0.a.options;
	var rows = _v0.a.rows;
	return A2(
		$elm$html$Html$thead,
		$rundis$elm_bootstrap$Bootstrap$Table$theadAttributes(options),
		A2($elm$core$List$map, $rundis$elm_bootstrap$Bootstrap$Table$renderRow, rows));
};
var $elm$html$Html$table = _VirtualDom_node('table');
var $rundis$elm_bootstrap$Bootstrap$Table$tableClass = function (option) {
	switch (option.$) {
		case 'Inversed':
			return $elm$core$Maybe$Just(
				$elm$html$Html$Attributes$class('table-dark'));
		case 'Striped':
			return $elm$core$Maybe$Just(
				$elm$html$Html$Attributes$class('table-striped'));
		case 'Bordered':
			return $elm$core$Maybe$Just(
				$elm$html$Html$Attributes$class('table-bordered'));
		case 'Hover':
			return $elm$core$Maybe$Just(
				$elm$html$Html$Attributes$class('table-hover'));
		case 'Small':
			return $elm$core$Maybe$Just(
				$elm$html$Html$Attributes$class('table-sm'));
		case 'Responsive':
			return $elm$core$Maybe$Nothing;
		case 'Reflow':
			return $elm$core$Maybe$Just(
				$elm$html$Html$Attributes$class('table-reflow'));
		default:
			var attr_ = option.a;
			return $elm$core$Maybe$Just(attr_);
	}
};
var $rundis$elm_bootstrap$Bootstrap$Table$tableAttributes = function (options) {
	return A2(
		$elm$core$List$cons,
		$elm$html$Html$Attributes$class('table'),
		A2(
			$elm$core$List$filterMap,
			$elm$core$Basics$identity,
			A2($elm$core$List$map, $rundis$elm_bootstrap$Bootstrap$Table$tableClass, options)));
};
var $rundis$elm_bootstrap$Bootstrap$Table$table = function (rec) {
	var isInversed = A2(
		$elm$core$List$any,
		function (opt) {
			return _Utils_eq(opt, $rundis$elm_bootstrap$Bootstrap$Table$Inversed);
		},
		rec.options);
	var classOptions = A2(
		$elm$core$List$filter,
		function (opt) {
			return !$rundis$elm_bootstrap$Bootstrap$Table$isResponsive(opt);
		},
		rec.options);
	return A2(
		$rundis$elm_bootstrap$Bootstrap$Table$maybeWrapResponsive,
		rec.options,
		A2(
			$elm$html$Html$table,
			$rundis$elm_bootstrap$Bootstrap$Table$tableAttributes(classOptions),
			_List_fromArray(
				[
					$rundis$elm_bootstrap$Bootstrap$Table$renderTHead(
					A2($rundis$elm_bootstrap$Bootstrap$Table$maybeMapInversedTHead, isInversed, rec.thead)),
					$rundis$elm_bootstrap$Bootstrap$Table$renderTBody(
					A2($rundis$elm_bootstrap$Bootstrap$Table$maybeMapInversedTBody, isInversed, rec.tbody))
				])));
};
var $rundis$elm_bootstrap$Bootstrap$Table$tbody = F2(
	function (attributes, rows) {
		return $rundis$elm_bootstrap$Bootstrap$Table$TBody(
			{attributes: attributes, rows: rows});
	});
var $rundis$elm_bootstrap$Bootstrap$Table$th = F2(
	function (options, children) {
		return $rundis$elm_bootstrap$Bootstrap$Table$Th(
			{children: children, options: options});
	});
var $rundis$elm_bootstrap$Bootstrap$Table$thead = F2(
	function (options, rows) {
		return $rundis$elm_bootstrap$Bootstrap$Table$THead(
			{options: options, rows: rows});
	});
var $rundis$elm_bootstrap$Bootstrap$Table$tr = F2(
	function (options, cells) {
		return $rundis$elm_bootstrap$Bootstrap$Table$Row(
			{cells: cells, options: options});
	});
var $elm$core$Basics$abs = function (n) {
	return (n < 0) ? (-n) : n;
};
var $myrho$elm_round$Round$addSign = F2(
	function (signed, str) {
		var isNotZero = A2(
			$elm$core$List$any,
			function (c) {
				return (!_Utils_eq(
					c,
					_Utils_chr('0'))) && (!_Utils_eq(
					c,
					_Utils_chr('.')));
			},
			$elm$core$String$toList(str));
		return _Utils_ap(
			(signed && isNotZero) ? '-' : '',
			str);
	});
var $elm$core$String$cons = _String_cons;
var $elm$core$Char$fromCode = _Char_fromCode;
var $myrho$elm_round$Round$increaseNum = function (_v0) {
	var head = _v0.a;
	var tail = _v0.b;
	if (_Utils_eq(
		head,
		_Utils_chr('9'))) {
		var _v1 = $elm$core$String$uncons(tail);
		if (_v1.$ === 'Nothing') {
			return '01';
		} else {
			var headtail = _v1.a;
			return A2(
				$elm$core$String$cons,
				_Utils_chr('0'),
				$myrho$elm_round$Round$increaseNum(headtail));
		}
	} else {
		var c = $elm$core$Char$toCode(head);
		return ((c >= 48) && (c < 57)) ? A2(
			$elm$core$String$cons,
			$elm$core$Char$fromCode(c + 1),
			tail) : '0';
	}
};
var $elm$core$Basics$isInfinite = _Basics_isInfinite;
var $elm$core$Basics$isNaN = _Basics_isNaN;
var $elm$core$String$fromChar = function (_char) {
	return A2($elm$core$String$cons, _char, '');
};
var $elm$core$Bitwise$shiftRightBy = _Bitwise_shiftRightBy;
var $elm$core$String$repeatHelp = F3(
	function (n, chunk, result) {
		return (n <= 0) ? result : A3(
			$elm$core$String$repeatHelp,
			n >> 1,
			_Utils_ap(chunk, chunk),
			(!(n & 1)) ? result : _Utils_ap(result, chunk));
	});
var $elm$core$String$repeat = F2(
	function (n, chunk) {
		return A3($elm$core$String$repeatHelp, n, chunk, '');
	});
var $elm$core$String$padRight = F3(
	function (n, _char, string) {
		return _Utils_ap(
			string,
			A2(
				$elm$core$String$repeat,
				n - $elm$core$String$length(string),
				$elm$core$String$fromChar(_char)));
	});
var $elm$core$String$reverse = _String_reverse;
var $myrho$elm_round$Round$splitComma = function (str) {
	var _v0 = A2($elm$core$String$split, '.', str);
	if (_v0.b) {
		if (_v0.b.b) {
			var before = _v0.a;
			var _v1 = _v0.b;
			var after = _v1.a;
			return _Utils_Tuple2(before, after);
		} else {
			var before = _v0.a;
			return _Utils_Tuple2(before, '0');
		}
	} else {
		return _Utils_Tuple2('0', '0');
	}
};
var $elm$core$Tuple$mapFirst = F2(
	function (func, _v0) {
		var x = _v0.a;
		var y = _v0.b;
		return _Utils_Tuple2(
			func(x),
			y);
	});
var $myrho$elm_round$Round$toDecimal = function (fl) {
	var _v0 = A2(
		$elm$core$String$split,
		'e',
		$elm$core$String$fromFloat(
			$elm$core$Basics$abs(fl)));
	if (_v0.b) {
		if (_v0.b.b) {
			var num = _v0.a;
			var _v1 = _v0.b;
			var exp = _v1.a;
			var e = A2(
				$elm$core$Maybe$withDefault,
				0,
				$elm$core$String$toInt(
					A2($elm$core$String$startsWith, '+', exp) ? A2($elm$core$String$dropLeft, 1, exp) : exp));
			var _v2 = $myrho$elm_round$Round$splitComma(num);
			var before = _v2.a;
			var after = _v2.b;
			var total = _Utils_ap(before, after);
			var zeroed = (e < 0) ? A2(
				$elm$core$Maybe$withDefault,
				'0',
				A2(
					$elm$core$Maybe$map,
					function (_v3) {
						var a = _v3.a;
						var b = _v3.b;
						return a + ('.' + b);
					},
					A2(
						$elm$core$Maybe$map,
						$elm$core$Tuple$mapFirst($elm$core$String$fromChar),
						$elm$core$String$uncons(
							_Utils_ap(
								A2(
									$elm$core$String$repeat,
									$elm$core$Basics$abs(e),
									'0'),
								total))))) : A3(
				$elm$core$String$padRight,
				e + 1,
				_Utils_chr('0'),
				total);
			return _Utils_ap(
				(fl < 0) ? '-' : '',
				zeroed);
		} else {
			var num = _v0.a;
			return _Utils_ap(
				(fl < 0) ? '-' : '',
				num);
		}
	} else {
		return '';
	}
};
var $myrho$elm_round$Round$roundFun = F3(
	function (functor, s, fl) {
		if ($elm$core$Basics$isInfinite(fl) || $elm$core$Basics$isNaN(fl)) {
			return $elm$core$String$fromFloat(fl);
		} else {
			var signed = fl < 0;
			var _v0 = $myrho$elm_round$Round$splitComma(
				$myrho$elm_round$Round$toDecimal(
					$elm$core$Basics$abs(fl)));
			var before = _v0.a;
			var after = _v0.b;
			var r = $elm$core$String$length(before) + s;
			var normalized = _Utils_ap(
				A2($elm$core$String$repeat, (-r) + 1, '0'),
				A3(
					$elm$core$String$padRight,
					r,
					_Utils_chr('0'),
					_Utils_ap(before, after)));
			var totalLen = $elm$core$String$length(normalized);
			var roundDigitIndex = A2($elm$core$Basics$max, 1, r);
			var increase = A2(
				functor,
				signed,
				A3($elm$core$String$slice, roundDigitIndex, totalLen, normalized));
			var remains = A3($elm$core$String$slice, 0, roundDigitIndex, normalized);
			var num = increase ? $elm$core$String$reverse(
				A2(
					$elm$core$Maybe$withDefault,
					'1',
					A2(
						$elm$core$Maybe$map,
						$myrho$elm_round$Round$increaseNum,
						$elm$core$String$uncons(
							$elm$core$String$reverse(remains))))) : remains;
			var numLen = $elm$core$String$length(num);
			var numZeroed = (num === '0') ? num : ((s <= 0) ? _Utils_ap(
				num,
				A2(
					$elm$core$String$repeat,
					$elm$core$Basics$abs(s),
					'0')) : ((_Utils_cmp(
				s,
				$elm$core$String$length(after)) < 0) ? (A3($elm$core$String$slice, 0, numLen - s, num) + ('.' + A3($elm$core$String$slice, numLen - s, numLen, num))) : _Utils_ap(
				before + '.',
				A3(
					$elm$core$String$padRight,
					s,
					_Utils_chr('0'),
					after))));
			return A2($myrho$elm_round$Round$addSign, signed, numZeroed);
		}
	});
var $myrho$elm_round$Round$round = $myrho$elm_round$Round$roundFun(
	F2(
		function (signed, str) {
			var _v0 = $elm$core$String$uncons(str);
			if (_v0.$ === 'Nothing') {
				return false;
			} else {
				if ('5' === _v0.a.a.valueOf()) {
					if (_v0.a.b === '') {
						var _v1 = _v0.a;
						return !signed;
					} else {
						var _v2 = _v0.a;
						return true;
					}
				} else {
					var _v3 = _v0.a;
					var _int = _v3.a;
					return function (i) {
						return ((i > 53) && signed) || ((i >= 53) && (!signed));
					}(
						$elm$core$Char$toCode(_int));
				}
			}
		}));
var $elm$core$List$sum = function (numbers) {
	return A3($elm$core$List$foldl, $elm$core$Basics$add, 0, numbers);
};
var $author$project$Main$average = F2(
	function (list, length) {
		var size = A2(
			$elm$core$Basics$min,
			length,
			$elm$core$List$length(list));
		return (!size) ? '0' : A2(
			$myrho$elm_round$Round$round,
			1,
			$elm$core$List$sum(
				A2($elm$core$List$take, size, list)) / size);
	});
var $rundis$elm_bootstrap$Bootstrap$Table$td = F2(
	function (options, children) {
		return $rundis$elm_bootstrap$Bootstrap$Table$Td(
			{children: children, options: options});
	});
var $author$project$Main$viewAverageIncome = function (_v0) {
	var name = _v0.a;
	var result = _v0.b;
	var sum = $elm$core$String$fromInt(
		$elm$core$List$sum(result.income_list));
	var ave = A2(
		$author$project$Main$average,
		result.score_list,
		$elm$core$List$length(result.score_list));
	return A2(
		$rundis$elm_bootstrap$Bootstrap$Table$tr,
		_List_Nil,
		_List_fromArray(
			[
				A2(
				$rundis$elm_bootstrap$Bootstrap$Table$td,
				_List_fromArray(
					[
						$rundis$elm_bootstrap$Bootstrap$Table$cellAttr(
						A2($elm$html$Html$Attributes$style, 'text-align', 'left'))
					]),
				_List_fromArray(
					[
						$elm$html$Html$text(name)
					])),
				A2(
				$rundis$elm_bootstrap$Bootstrap$Table$td,
				_List_Nil,
				_List_fromArray(
					[
						$elm$html$Html$text(ave)
					])),
				A2(
				$rundis$elm_bootstrap$Bootstrap$Table$td,
				_List_Nil,
				_List_fromArray(
					[
						$elm$html$Html$text(sum)
					]))
			]));
};
var $author$project$Main$viewScoreIncome = function (player) {
	var score = player.score;
	var name = player.name;
	var income = player.income;
	return A2(
		$rundis$elm_bootstrap$Bootstrap$Table$tr,
		_List_Nil,
		_List_fromArray(
			[
				A2(
				$rundis$elm_bootstrap$Bootstrap$Table$td,
				_List_fromArray(
					[
						$rundis$elm_bootstrap$Bootstrap$Table$cellAttr(
						A2($elm$html$Html$Attributes$style, 'text-align', 'left'))
					]),
				_List_fromArray(
					[
						$elm$html$Html$text(name)
					])),
				A2(
				$rundis$elm_bootstrap$Bootstrap$Table$td,
				_List_Nil,
				_List_fromArray(
					[
						$elm$html$Html$text(
						$elm$core$String$fromInt(score))
					])),
				A2(
				$rundis$elm_bootstrap$Bootstrap$Table$td,
				_List_Nil,
				_List_fromArray(
					[
						$elm$html$Html$text(
						$elm$core$String$fromInt(income))
					]))
			]));
};
var $author$project$Main$viewEventResult = function (model) {
	var _v0 = model.inputRecordParam.gameId;
	if (_v0 === 'Total') {
		return $rundis$elm_bootstrap$Bootstrap$Table$table(
			{
				options: _List_fromArray(
					[
						$rundis$elm_bootstrap$Bootstrap$Table$small,
						$rundis$elm_bootstrap$Bootstrap$Table$attr(
						A2($elm$html$Html$Attributes$style, 'text-align', 'right'))
					]),
				tbody: A2(
					$rundis$elm_bootstrap$Bootstrap$Table$tbody,
					_List_Nil,
					A2(
						$elm$core$List$map,
						function (x) {
							return $author$project$Main$viewAverageIncome(x);
						},
						$elm$core$Dict$toList(model.eventRecord.playersRecord))),
				thead: A2(
					$rundis$elm_bootstrap$Bootstrap$Table$thead,
					_List_Nil,
					_List_fromArray(
						[
							A2(
							$rundis$elm_bootstrap$Bootstrap$Table$tr,
							_List_Nil,
							_List_fromArray(
								[
									A2(
									$rundis$elm_bootstrap$Bootstrap$Table$th,
									_List_fromArray(
										[
											$rundis$elm_bootstrap$Bootstrap$Table$cellAttr(
											A2($elm$html$Html$Attributes$style, 'text-align', 'left')),
											$rundis$elm_bootstrap$Bootstrap$Table$cellAttr(
											A2($elm$html$Html$Attributes$style, 'border-top', '1px solid #FFF')),
											$rundis$elm_bootstrap$Bootstrap$Table$cellAttr(
											A2($elm$html$Html$Attributes$style, 'width', '40%'))
										]),
									_List_fromArray(
										[
											$elm$html$Html$text('Name')
										])),
									A2(
									$rundis$elm_bootstrap$Bootstrap$Table$th,
									_List_fromArray(
										[
											$rundis$elm_bootstrap$Bootstrap$Table$cellAttr(
											A2($elm$html$Html$Attributes$style, 'border-top', '1px solid #FFF'))
										]),
									_List_fromArray(
										[
											$elm$html$Html$text('Average Score')
										])),
									A2(
									$rundis$elm_bootstrap$Bootstrap$Table$th,
									_List_fromArray(
										[
											$rundis$elm_bootstrap$Bootstrap$Table$cellAttr(
											A2($elm$html$Html$Attributes$style, 'border-top', '1px solid #FFF'))
										]),
									_List_fromArray(
										[
											$elm$html$Html$text('Total Revenue')
										]))
								]))
						]))
			});
	} else {
		return $rundis$elm_bootstrap$Bootstrap$Table$table(
			{
				options: _List_fromArray(
					[
						$rundis$elm_bootstrap$Bootstrap$Table$small,
						$rundis$elm_bootstrap$Bootstrap$Table$attr(
						A2($elm$html$Html$Attributes$style, 'text-align', 'right'))
					]),
				tbody: A2(
					$rundis$elm_bootstrap$Bootstrap$Table$tbody,
					_List_Nil,
					function () {
						var _v1 = A2(
							$elm$core$Dict$get,
							A2(
								$elm$core$Maybe$withDefault,
								0,
								$elm$core$String$toInt(model.inputRecordParam.gameId)),
							model.eventRecord.gamesRecord);
						if (_v1.$ === 'Nothing') {
							return _List_Nil;
						} else {
							var players = _v1.a;
							return A2(
								$elm$core$List$map,
								function (x) {
									return $author$project$Main$viewScoreIncome(x);
								},
								players);
						}
					}()),
				thead: A2(
					$rundis$elm_bootstrap$Bootstrap$Table$thead,
					_List_Nil,
					_List_fromArray(
						[
							A2(
							$rundis$elm_bootstrap$Bootstrap$Table$tr,
							_List_Nil,
							_List_fromArray(
								[
									A2(
									$rundis$elm_bootstrap$Bootstrap$Table$th,
									_List_fromArray(
										[
											$rundis$elm_bootstrap$Bootstrap$Table$cellAttr(
											A2($elm$html$Html$Attributes$style, 'text-align', 'left')),
											$rundis$elm_bootstrap$Bootstrap$Table$cellAttr(
											A2($elm$html$Html$Attributes$style, 'border-top', '1px solid #FFF')),
											$rundis$elm_bootstrap$Bootstrap$Table$cellAttr(
											A2($elm$html$Html$Attributes$style, 'width', '40%'))
										]),
									_List_fromArray(
										[
											$elm$html$Html$text('Name')
										])),
									A2(
									$rundis$elm_bootstrap$Bootstrap$Table$th,
									_List_fromArray(
										[
											$rundis$elm_bootstrap$Bootstrap$Table$cellAttr(
											A2($elm$html$Html$Attributes$style, 'border-top', '1px solid #FFF'))
										]),
									_List_fromArray(
										[
											$elm$html$Html$text('Score')
										])),
									A2(
									$rundis$elm_bootstrap$Bootstrap$Table$th,
									_List_fromArray(
										[
											$rundis$elm_bootstrap$Bootstrap$Table$cellAttr(
											A2($elm$html$Html$Attributes$style, 'border-top', '1px solid #FFF'))
										]),
									_List_fromArray(
										[
											$elm$html$Html$text('Revenue')
										]))
								]))
						]))
			});
	}
};
var $justinmimbs$time_extra$Time$Extra$Minute = {$: 'Minute'};
var $justinmimbs$time_extra$Time$Extra$Day = {$: 'Day'};
var $justinmimbs$date$Date$Days = {$: 'Days'};
var $justinmimbs$time_extra$Time$Extra$Millisecond = {$: 'Millisecond'};
var $justinmimbs$time_extra$Time$Extra$Month = {$: 'Month'};
var $justinmimbs$date$Date$Months = {$: 'Months'};
var $justinmimbs$date$Date$RD = function (a) {
	return {$: 'RD', a: a};
};
var $elm$core$Basics$modBy = _Basics_modBy;
var $justinmimbs$date$Date$isLeapYear = function (y) {
	return ((!A2($elm$core$Basics$modBy, 4, y)) && (!(!A2($elm$core$Basics$modBy, 100, y)))) || (!A2($elm$core$Basics$modBy, 400, y));
};
var $justinmimbs$date$Date$daysBeforeMonth = F2(
	function (y, m) {
		var leapDays = $justinmimbs$date$Date$isLeapYear(y) ? 1 : 0;
		switch (m.$) {
			case 'Jan':
				return 0;
			case 'Feb':
				return 31;
			case 'Mar':
				return 59 + leapDays;
			case 'Apr':
				return 90 + leapDays;
			case 'May':
				return 120 + leapDays;
			case 'Jun':
				return 151 + leapDays;
			case 'Jul':
				return 181 + leapDays;
			case 'Aug':
				return 212 + leapDays;
			case 'Sep':
				return 243 + leapDays;
			case 'Oct':
				return 273 + leapDays;
			case 'Nov':
				return 304 + leapDays;
			default:
				return 334 + leapDays;
		}
	});
var $justinmimbs$date$Date$floorDiv = F2(
	function (a, b) {
		return $elm$core$Basics$floor(a / b);
	});
var $justinmimbs$date$Date$daysBeforeYear = function (y1) {
	var y = y1 - 1;
	var leapYears = (A2($justinmimbs$date$Date$floorDiv, y, 4) - A2($justinmimbs$date$Date$floorDiv, y, 100)) + A2($justinmimbs$date$Date$floorDiv, y, 400);
	return (365 * y) + leapYears;
};
var $justinmimbs$date$Date$daysInMonth = F2(
	function (y, m) {
		switch (m.$) {
			case 'Jan':
				return 31;
			case 'Feb':
				return $justinmimbs$date$Date$isLeapYear(y) ? 29 : 28;
			case 'Mar':
				return 31;
			case 'Apr':
				return 30;
			case 'May':
				return 31;
			case 'Jun':
				return 30;
			case 'Jul':
				return 31;
			case 'Aug':
				return 31;
			case 'Sep':
				return 30;
			case 'Oct':
				return 31;
			case 'Nov':
				return 30;
			default:
				return 31;
		}
	});
var $justinmimbs$date$Date$monthToNumber = function (m) {
	switch (m.$) {
		case 'Jan':
			return 1;
		case 'Feb':
			return 2;
		case 'Mar':
			return 3;
		case 'Apr':
			return 4;
		case 'May':
			return 5;
		case 'Jun':
			return 6;
		case 'Jul':
			return 7;
		case 'Aug':
			return 8;
		case 'Sep':
			return 9;
		case 'Oct':
			return 10;
		case 'Nov':
			return 11;
		default:
			return 12;
	}
};
var $elm$time$Time$Apr = {$: 'Apr'};
var $elm$time$Time$Aug = {$: 'Aug'};
var $elm$time$Time$Dec = {$: 'Dec'};
var $elm$time$Time$Feb = {$: 'Feb'};
var $elm$time$Time$Jan = {$: 'Jan'};
var $elm$time$Time$Jul = {$: 'Jul'};
var $elm$time$Time$Jun = {$: 'Jun'};
var $elm$time$Time$Mar = {$: 'Mar'};
var $elm$time$Time$May = {$: 'May'};
var $elm$time$Time$Nov = {$: 'Nov'};
var $elm$time$Time$Oct = {$: 'Oct'};
var $elm$time$Time$Sep = {$: 'Sep'};
var $justinmimbs$date$Date$numberToMonth = function (mn) {
	var _v0 = A2($elm$core$Basics$max, 1, mn);
	switch (_v0) {
		case 1:
			return $elm$time$Time$Jan;
		case 2:
			return $elm$time$Time$Feb;
		case 3:
			return $elm$time$Time$Mar;
		case 4:
			return $elm$time$Time$Apr;
		case 5:
			return $elm$time$Time$May;
		case 6:
			return $elm$time$Time$Jun;
		case 7:
			return $elm$time$Time$Jul;
		case 8:
			return $elm$time$Time$Aug;
		case 9:
			return $elm$time$Time$Sep;
		case 10:
			return $elm$time$Time$Oct;
		case 11:
			return $elm$time$Time$Nov;
		default:
			return $elm$time$Time$Dec;
	}
};
var $justinmimbs$date$Date$toCalendarDateHelp = F3(
	function (y, m, d) {
		toCalendarDateHelp:
		while (true) {
			var monthDays = A2($justinmimbs$date$Date$daysInMonth, y, m);
			var mn = $justinmimbs$date$Date$monthToNumber(m);
			if ((mn < 12) && (_Utils_cmp(d, monthDays) > 0)) {
				var $temp$y = y,
					$temp$m = $justinmimbs$date$Date$numberToMonth(mn + 1),
					$temp$d = d - monthDays;
				y = $temp$y;
				m = $temp$m;
				d = $temp$d;
				continue toCalendarDateHelp;
			} else {
				return {day: d, month: m, year: y};
			}
		}
	});
var $justinmimbs$date$Date$divWithRemainder = F2(
	function (a, b) {
		return _Utils_Tuple2(
			A2($justinmimbs$date$Date$floorDiv, a, b),
			A2($elm$core$Basics$modBy, b, a));
	});
var $justinmimbs$date$Date$year = function (_v0) {
	var rd = _v0.a;
	var _v1 = A2($justinmimbs$date$Date$divWithRemainder, rd, 146097);
	var n400 = _v1.a;
	var r400 = _v1.b;
	var _v2 = A2($justinmimbs$date$Date$divWithRemainder, r400, 36524);
	var n100 = _v2.a;
	var r100 = _v2.b;
	var _v3 = A2($justinmimbs$date$Date$divWithRemainder, r100, 1461);
	var n4 = _v3.a;
	var r4 = _v3.b;
	var _v4 = A2($justinmimbs$date$Date$divWithRemainder, r4, 365);
	var n1 = _v4.a;
	var r1 = _v4.b;
	var n = (!r1) ? 0 : 1;
	return ((((n400 * 400) + (n100 * 100)) + (n4 * 4)) + n1) + n;
};
var $justinmimbs$date$Date$toOrdinalDate = function (_v0) {
	var rd = _v0.a;
	var y = $justinmimbs$date$Date$year(
		$justinmimbs$date$Date$RD(rd));
	return {
		ordinalDay: rd - $justinmimbs$date$Date$daysBeforeYear(y),
		year: y
	};
};
var $justinmimbs$date$Date$toCalendarDate = function (_v0) {
	var rd = _v0.a;
	var date = $justinmimbs$date$Date$toOrdinalDate(
		$justinmimbs$date$Date$RD(rd));
	return A3($justinmimbs$date$Date$toCalendarDateHelp, date.year, $elm$time$Time$Jan, date.ordinalDay);
};
var $justinmimbs$date$Date$add = F3(
	function (unit, n, _v0) {
		var rd = _v0.a;
		switch (unit.$) {
			case 'Years':
				return A3(
					$justinmimbs$date$Date$add,
					$justinmimbs$date$Date$Months,
					12 * n,
					$justinmimbs$date$Date$RD(rd));
			case 'Months':
				var date = $justinmimbs$date$Date$toCalendarDate(
					$justinmimbs$date$Date$RD(rd));
				var wholeMonths = ((12 * (date.year - 1)) + ($justinmimbs$date$Date$monthToNumber(date.month) - 1)) + n;
				var m = $justinmimbs$date$Date$numberToMonth(
					A2($elm$core$Basics$modBy, 12, wholeMonths) + 1);
				var y = A2($justinmimbs$date$Date$floorDiv, wholeMonths, 12) + 1;
				return $justinmimbs$date$Date$RD(
					($justinmimbs$date$Date$daysBeforeYear(y) + A2($justinmimbs$date$Date$daysBeforeMonth, y, m)) + A2(
						$elm$core$Basics$min,
						date.day,
						A2($justinmimbs$date$Date$daysInMonth, y, m)));
			case 'Weeks':
				return $justinmimbs$date$Date$RD(rd + (7 * n));
			default:
				return $justinmimbs$date$Date$RD(rd + n);
		}
	});
var $elm$core$Basics$clamp = F3(
	function (low, high, number) {
		return (_Utils_cmp(number, low) < 0) ? low : ((_Utils_cmp(number, high) > 0) ? high : number);
	});
var $justinmimbs$date$Date$fromCalendarDate = F3(
	function (y, m, d) {
		return $justinmimbs$date$Date$RD(
			($justinmimbs$date$Date$daysBeforeYear(y) + A2($justinmimbs$date$Date$daysBeforeMonth, y, m)) + A3(
				$elm$core$Basics$clamp,
				1,
				A2($justinmimbs$date$Date$daysInMonth, y, m),
				d));
	});
var $elm$time$Time$flooredDiv = F2(
	function (numerator, denominator) {
		return $elm$core$Basics$floor(numerator / denominator);
	});
var $elm$time$Time$toAdjustedMinutesHelp = F3(
	function (defaultOffset, posixMinutes, eras) {
		toAdjustedMinutesHelp:
		while (true) {
			if (!eras.b) {
				return posixMinutes + defaultOffset;
			} else {
				var era = eras.a;
				var olderEras = eras.b;
				if (_Utils_cmp(era.start, posixMinutes) < 0) {
					return posixMinutes + era.offset;
				} else {
					var $temp$defaultOffset = defaultOffset,
						$temp$posixMinutes = posixMinutes,
						$temp$eras = olderEras;
					defaultOffset = $temp$defaultOffset;
					posixMinutes = $temp$posixMinutes;
					eras = $temp$eras;
					continue toAdjustedMinutesHelp;
				}
			}
		}
	});
var $elm$time$Time$toAdjustedMinutes = F2(
	function (_v0, time) {
		var defaultOffset = _v0.a;
		var eras = _v0.b;
		return A3(
			$elm$time$Time$toAdjustedMinutesHelp,
			defaultOffset,
			A2(
				$elm$time$Time$flooredDiv,
				$elm$time$Time$posixToMillis(time),
				60000),
			eras);
	});
var $elm$time$Time$toCivil = function (minutes) {
	var rawDay = A2($elm$time$Time$flooredDiv, minutes, 60 * 24) + 719468;
	var era = (((rawDay >= 0) ? rawDay : (rawDay - 146096)) / 146097) | 0;
	var dayOfEra = rawDay - (era * 146097);
	var yearOfEra = ((((dayOfEra - ((dayOfEra / 1460) | 0)) + ((dayOfEra / 36524) | 0)) - ((dayOfEra / 146096) | 0)) / 365) | 0;
	var dayOfYear = dayOfEra - (((365 * yearOfEra) + ((yearOfEra / 4) | 0)) - ((yearOfEra / 100) | 0));
	var mp = (((5 * dayOfYear) + 2) / 153) | 0;
	var month = mp + ((mp < 10) ? 3 : (-9));
	var year = yearOfEra + (era * 400);
	return {
		day: (dayOfYear - ((((153 * mp) + 2) / 5) | 0)) + 1,
		month: month,
		year: year + ((month <= 2) ? 1 : 0)
	};
};
var $elm$time$Time$toDay = F2(
	function (zone, time) {
		return $elm$time$Time$toCivil(
			A2($elm$time$Time$toAdjustedMinutes, zone, time)).day;
	});
var $elm$time$Time$toMonth = F2(
	function (zone, time) {
		var _v0 = $elm$time$Time$toCivil(
			A2($elm$time$Time$toAdjustedMinutes, zone, time)).month;
		switch (_v0) {
			case 1:
				return $elm$time$Time$Jan;
			case 2:
				return $elm$time$Time$Feb;
			case 3:
				return $elm$time$Time$Mar;
			case 4:
				return $elm$time$Time$Apr;
			case 5:
				return $elm$time$Time$May;
			case 6:
				return $elm$time$Time$Jun;
			case 7:
				return $elm$time$Time$Jul;
			case 8:
				return $elm$time$Time$Aug;
			case 9:
				return $elm$time$Time$Sep;
			case 10:
				return $elm$time$Time$Oct;
			case 11:
				return $elm$time$Time$Nov;
			default:
				return $elm$time$Time$Dec;
		}
	});
var $elm$time$Time$toYear = F2(
	function (zone, time) {
		return $elm$time$Time$toCivil(
			A2($elm$time$Time$toAdjustedMinutes, zone, time)).year;
	});
var $justinmimbs$date$Date$fromPosix = F2(
	function (zone, posix) {
		return A3(
			$justinmimbs$date$Date$fromCalendarDate,
			A2($elm$time$Time$toYear, zone, posix),
			A2($elm$time$Time$toMonth, zone, posix),
			A2($elm$time$Time$toDay, zone, posix));
	});
var $justinmimbs$date$Date$toRataDie = function (_v0) {
	var rd = _v0.a;
	return rd;
};
var $justinmimbs$time_extra$Time$Extra$dateToMillis = function (date) {
	var daysSinceEpoch = $justinmimbs$date$Date$toRataDie(date) - 719163;
	return daysSinceEpoch * 86400000;
};
var $justinmimbs$time_extra$Time$Extra$timeFromClock = F4(
	function (hour, minute, second, millisecond) {
		return (((hour * 3600000) + (minute * 60000)) + (second * 1000)) + millisecond;
	});
var $elm$time$Time$toHour = F2(
	function (zone, time) {
		return A2(
			$elm$core$Basics$modBy,
			24,
			A2(
				$elm$time$Time$flooredDiv,
				A2($elm$time$Time$toAdjustedMinutes, zone, time),
				60));
	});
var $elm$time$Time$toMillis = F2(
	function (_v0, time) {
		return A2(
			$elm$core$Basics$modBy,
			1000,
			$elm$time$Time$posixToMillis(time));
	});
var $elm$time$Time$toMinute = F2(
	function (zone, time) {
		return A2(
			$elm$core$Basics$modBy,
			60,
			A2($elm$time$Time$toAdjustedMinutes, zone, time));
	});
var $elm$time$Time$toSecond = F2(
	function (_v0, time) {
		return A2(
			$elm$core$Basics$modBy,
			60,
			A2(
				$elm$time$Time$flooredDiv,
				$elm$time$Time$posixToMillis(time),
				1000));
	});
var $justinmimbs$time_extra$Time$Extra$timeFromPosix = F2(
	function (zone, posix) {
		return A4(
			$justinmimbs$time_extra$Time$Extra$timeFromClock,
			A2($elm$time$Time$toHour, zone, posix),
			A2($elm$time$Time$toMinute, zone, posix),
			A2($elm$time$Time$toSecond, zone, posix),
			A2($elm$time$Time$toMillis, zone, posix));
	});
var $justinmimbs$time_extra$Time$Extra$toOffset = F2(
	function (zone, posix) {
		var millis = $elm$time$Time$posixToMillis(posix);
		var localMillis = $justinmimbs$time_extra$Time$Extra$dateToMillis(
			A2($justinmimbs$date$Date$fromPosix, zone, posix)) + A2($justinmimbs$time_extra$Time$Extra$timeFromPosix, zone, posix);
		return ((localMillis - millis) / 60000) | 0;
	});
var $justinmimbs$time_extra$Time$Extra$posixFromDateTime = F3(
	function (zone, date, time) {
		var millis = $justinmimbs$time_extra$Time$Extra$dateToMillis(date) + time;
		var offset0 = A2(
			$justinmimbs$time_extra$Time$Extra$toOffset,
			zone,
			$elm$time$Time$millisToPosix(millis));
		var posix1 = $elm$time$Time$millisToPosix(millis - (offset0 * 60000));
		var offset1 = A2($justinmimbs$time_extra$Time$Extra$toOffset, zone, posix1);
		if (_Utils_eq(offset0, offset1)) {
			return posix1;
		} else {
			var posix2 = $elm$time$Time$millisToPosix(millis - (offset1 * 60000));
			var offset2 = A2($justinmimbs$time_extra$Time$Extra$toOffset, zone, posix2);
			return _Utils_eq(offset1, offset2) ? posix2 : posix1;
		}
	});
var $justinmimbs$time_extra$Time$Extra$add = F4(
	function (interval, n, zone, posix) {
		add:
		while (true) {
			switch (interval.$) {
				case 'Millisecond':
					return $elm$time$Time$millisToPosix(
						$elm$time$Time$posixToMillis(posix) + n);
				case 'Second':
					var $temp$interval = $justinmimbs$time_extra$Time$Extra$Millisecond,
						$temp$n = n * 1000,
						$temp$zone = zone,
						$temp$posix = posix;
					interval = $temp$interval;
					n = $temp$n;
					zone = $temp$zone;
					posix = $temp$posix;
					continue add;
				case 'Minute':
					var $temp$interval = $justinmimbs$time_extra$Time$Extra$Millisecond,
						$temp$n = n * 60000,
						$temp$zone = zone,
						$temp$posix = posix;
					interval = $temp$interval;
					n = $temp$n;
					zone = $temp$zone;
					posix = $temp$posix;
					continue add;
				case 'Hour':
					var $temp$interval = $justinmimbs$time_extra$Time$Extra$Millisecond,
						$temp$n = n * 3600000,
						$temp$zone = zone,
						$temp$posix = posix;
					interval = $temp$interval;
					n = $temp$n;
					zone = $temp$zone;
					posix = $temp$posix;
					continue add;
				case 'Day':
					return A3(
						$justinmimbs$time_extra$Time$Extra$posixFromDateTime,
						zone,
						A3(
							$justinmimbs$date$Date$add,
							$justinmimbs$date$Date$Days,
							n,
							A2($justinmimbs$date$Date$fromPosix, zone, posix)),
						A2($justinmimbs$time_extra$Time$Extra$timeFromPosix, zone, posix));
				case 'Month':
					return A3(
						$justinmimbs$time_extra$Time$Extra$posixFromDateTime,
						zone,
						A3(
							$justinmimbs$date$Date$add,
							$justinmimbs$date$Date$Months,
							n,
							A2($justinmimbs$date$Date$fromPosix, zone, posix)),
						A2($justinmimbs$time_extra$Time$Extra$timeFromPosix, zone, posix));
				case 'Year':
					var $temp$interval = $justinmimbs$time_extra$Time$Extra$Month,
						$temp$n = n * 12,
						$temp$zone = zone,
						$temp$posix = posix;
					interval = $temp$interval;
					n = $temp$n;
					zone = $temp$zone;
					posix = $temp$posix;
					continue add;
				case 'Quarter':
					var $temp$interval = $justinmimbs$time_extra$Time$Extra$Month,
						$temp$n = n * 3,
						$temp$zone = zone,
						$temp$posix = posix;
					interval = $temp$interval;
					n = $temp$n;
					zone = $temp$zone;
					posix = $temp$posix;
					continue add;
				case 'Week':
					var $temp$interval = $justinmimbs$time_extra$Time$Extra$Day,
						$temp$n = n * 7,
						$temp$zone = zone,
						$temp$posix = posix;
					interval = $temp$interval;
					n = $temp$n;
					zone = $temp$zone;
					posix = $temp$posix;
					continue add;
				default:
					var weekday = interval;
					var $temp$interval = $justinmimbs$time_extra$Time$Extra$Day,
						$temp$n = n * 7,
						$temp$zone = zone,
						$temp$posix = posix;
					interval = $temp$interval;
					n = $temp$n;
					zone = $temp$zone;
					posix = $temp$posix;
					continue add;
			}
		}
	});
var $elm$core$String$padLeft = F3(
	function (n, _char, string) {
		return _Utils_ap(
			A2(
				$elm$core$String$repeat,
				n - $elm$core$String$length(string),
				$elm$core$String$fromChar(_char)),
			string);
	});
var $elm$parser$Parser$Advanced$Bad = F2(
	function (a, b) {
		return {$: 'Bad', a: a, b: b};
	});
var $elm$parser$Parser$Advanced$Good = F3(
	function (a, b, c) {
		return {$: 'Good', a: a, b: b, c: c};
	});
var $elm$parser$Parser$Advanced$Parser = function (a) {
	return {$: 'Parser', a: a};
};
var $elm$parser$Parser$Advanced$andThen = F2(
	function (callback, _v0) {
		var parseA = _v0.a;
		return $elm$parser$Parser$Advanced$Parser(
			function (s0) {
				var _v1 = parseA(s0);
				if (_v1.$ === 'Bad') {
					var p = _v1.a;
					var x = _v1.b;
					return A2($elm$parser$Parser$Advanced$Bad, p, x);
				} else {
					var p1 = _v1.a;
					var a = _v1.b;
					var s1 = _v1.c;
					var _v2 = callback(a);
					var parseB = _v2.a;
					var _v3 = parseB(s1);
					if (_v3.$ === 'Bad') {
						var p2 = _v3.a;
						var x = _v3.b;
						return A2($elm$parser$Parser$Advanced$Bad, p1 || p2, x);
					} else {
						var p2 = _v3.a;
						var b = _v3.b;
						var s2 = _v3.c;
						return A3($elm$parser$Parser$Advanced$Good, p1 || p2, b, s2);
					}
				}
			});
	});
var $elm$parser$Parser$andThen = $elm$parser$Parser$Advanced$andThen;
var $elm$parser$Parser$ExpectingEnd = {$: 'ExpectingEnd'};
var $elm$parser$Parser$Advanced$AddRight = F2(
	function (a, b) {
		return {$: 'AddRight', a: a, b: b};
	});
var $elm$parser$Parser$Advanced$DeadEnd = F4(
	function (row, col, problem, contextStack) {
		return {col: col, contextStack: contextStack, problem: problem, row: row};
	});
var $elm$parser$Parser$Advanced$Empty = {$: 'Empty'};
var $elm$parser$Parser$Advanced$fromState = F2(
	function (s, x) {
		return A2(
			$elm$parser$Parser$Advanced$AddRight,
			$elm$parser$Parser$Advanced$Empty,
			A4($elm$parser$Parser$Advanced$DeadEnd, s.row, s.col, x, s.context));
	});
var $elm$parser$Parser$Advanced$end = function (x) {
	return $elm$parser$Parser$Advanced$Parser(
		function (s) {
			return _Utils_eq(
				$elm$core$String$length(s.src),
				s.offset) ? A3($elm$parser$Parser$Advanced$Good, false, _Utils_Tuple0, s) : A2(
				$elm$parser$Parser$Advanced$Bad,
				false,
				A2($elm$parser$Parser$Advanced$fromState, s, x));
		});
};
var $elm$parser$Parser$end = $elm$parser$Parser$Advanced$end($elm$parser$Parser$ExpectingEnd);
var $elm$parser$Parser$Advanced$isSubChar = _Parser_isSubChar;
var $elm$parser$Parser$Advanced$chompWhileHelp = F5(
	function (isGood, offset, row, col, s0) {
		chompWhileHelp:
		while (true) {
			var newOffset = A3($elm$parser$Parser$Advanced$isSubChar, isGood, offset, s0.src);
			if (_Utils_eq(newOffset, -1)) {
				return A3(
					$elm$parser$Parser$Advanced$Good,
					_Utils_cmp(s0.offset, offset) < 0,
					_Utils_Tuple0,
					{col: col, context: s0.context, indent: s0.indent, offset: offset, row: row, src: s0.src});
			} else {
				if (_Utils_eq(newOffset, -2)) {
					var $temp$isGood = isGood,
						$temp$offset = offset + 1,
						$temp$row = row + 1,
						$temp$col = 1,
						$temp$s0 = s0;
					isGood = $temp$isGood;
					offset = $temp$offset;
					row = $temp$row;
					col = $temp$col;
					s0 = $temp$s0;
					continue chompWhileHelp;
				} else {
					var $temp$isGood = isGood,
						$temp$offset = newOffset,
						$temp$row = row,
						$temp$col = col + 1,
						$temp$s0 = s0;
					isGood = $temp$isGood;
					offset = $temp$offset;
					row = $temp$row;
					col = $temp$col;
					s0 = $temp$s0;
					continue chompWhileHelp;
				}
			}
		}
	});
var $elm$parser$Parser$Advanced$chompWhile = function (isGood) {
	return $elm$parser$Parser$Advanced$Parser(
		function (s) {
			return A5($elm$parser$Parser$Advanced$chompWhileHelp, isGood, s.offset, s.row, s.col, s);
		});
};
var $elm$parser$Parser$chompWhile = $elm$parser$Parser$Advanced$chompWhile;
var $elm$core$Basics$always = F2(
	function (a, _v0) {
		return a;
	});
var $elm$parser$Parser$Advanced$mapChompedString = F2(
	function (func, _v0) {
		var parse = _v0.a;
		return $elm$parser$Parser$Advanced$Parser(
			function (s0) {
				var _v1 = parse(s0);
				if (_v1.$ === 'Bad') {
					var p = _v1.a;
					var x = _v1.b;
					return A2($elm$parser$Parser$Advanced$Bad, p, x);
				} else {
					var p = _v1.a;
					var a = _v1.b;
					var s1 = _v1.c;
					return A3(
						$elm$parser$Parser$Advanced$Good,
						p,
						A2(
							func,
							A3($elm$core$String$slice, s0.offset, s1.offset, s0.src),
							a),
						s1);
				}
			});
	});
var $elm$parser$Parser$Advanced$getChompedString = function (parser) {
	return A2($elm$parser$Parser$Advanced$mapChompedString, $elm$core$Basics$always, parser);
};
var $elm$parser$Parser$getChompedString = $elm$parser$Parser$Advanced$getChompedString;
var $elm$parser$Parser$Problem = function (a) {
	return {$: 'Problem', a: a};
};
var $elm$parser$Parser$Advanced$problem = function (x) {
	return $elm$parser$Parser$Advanced$Parser(
		function (s) {
			return A2(
				$elm$parser$Parser$Advanced$Bad,
				false,
				A2($elm$parser$Parser$Advanced$fromState, s, x));
		});
};
var $elm$parser$Parser$problem = function (msg) {
	return $elm$parser$Parser$Advanced$problem(
		$elm$parser$Parser$Problem(msg));
};
var $elm$parser$Parser$Advanced$succeed = function (a) {
	return $elm$parser$Parser$Advanced$Parser(
		function (s) {
			return A3($elm$parser$Parser$Advanced$Good, false, a, s);
		});
};
var $elm$parser$Parser$succeed = $elm$parser$Parser$Advanced$succeed;
var $elm$core$String$toFloat = _String_toFloat;
var $rtfeldman$elm_iso8601_date_strings$Iso8601$fractionsOfASecondInMs = A2(
	$elm$parser$Parser$andThen,
	function (str) {
		if ($elm$core$String$length(str) <= 9) {
			var _v0 = $elm$core$String$toFloat('0.' + str);
			if (_v0.$ === 'Just') {
				var floatVal = _v0.a;
				return $elm$parser$Parser$succeed(
					$elm$core$Basics$round(floatVal * 1000));
			} else {
				return $elm$parser$Parser$problem('Invalid float: \"' + (str + '\"'));
			}
		} else {
			return $elm$parser$Parser$problem(
				'Expected at most 9 digits, but got ' + $elm$core$String$fromInt(
					$elm$core$String$length(str)));
		}
	},
	$elm$parser$Parser$getChompedString(
		$elm$parser$Parser$chompWhile($elm$core$Char$isDigit)));
var $rtfeldman$elm_iso8601_date_strings$Iso8601$fromParts = F6(
	function (monthYearDayMs, hour, minute, second, ms, utcOffsetMinutes) {
		return $elm$time$Time$millisToPosix((((monthYearDayMs + (((hour * 60) * 60) * 1000)) + (((minute - utcOffsetMinutes) * 60) * 1000)) + (second * 1000)) + ms);
	});
var $elm$parser$Parser$Advanced$map2 = F3(
	function (func, _v0, _v1) {
		var parseA = _v0.a;
		var parseB = _v1.a;
		return $elm$parser$Parser$Advanced$Parser(
			function (s0) {
				var _v2 = parseA(s0);
				if (_v2.$ === 'Bad') {
					var p = _v2.a;
					var x = _v2.b;
					return A2($elm$parser$Parser$Advanced$Bad, p, x);
				} else {
					var p1 = _v2.a;
					var a = _v2.b;
					var s1 = _v2.c;
					var _v3 = parseB(s1);
					if (_v3.$ === 'Bad') {
						var p2 = _v3.a;
						var x = _v3.b;
						return A2($elm$parser$Parser$Advanced$Bad, p1 || p2, x);
					} else {
						var p2 = _v3.a;
						var b = _v3.b;
						var s2 = _v3.c;
						return A3(
							$elm$parser$Parser$Advanced$Good,
							p1 || p2,
							A2(func, a, b),
							s2);
					}
				}
			});
	});
var $elm$parser$Parser$Advanced$ignorer = F2(
	function (keepParser, ignoreParser) {
		return A3($elm$parser$Parser$Advanced$map2, $elm$core$Basics$always, keepParser, ignoreParser);
	});
var $elm$parser$Parser$ignorer = $elm$parser$Parser$Advanced$ignorer;
var $elm$parser$Parser$Advanced$keeper = F2(
	function (parseFunc, parseArg) {
		return A3($elm$parser$Parser$Advanced$map2, $elm$core$Basics$apL, parseFunc, parseArg);
	});
var $elm$parser$Parser$keeper = $elm$parser$Parser$Advanced$keeper;
var $elm$parser$Parser$Advanced$Append = F2(
	function (a, b) {
		return {$: 'Append', a: a, b: b};
	});
var $elm$parser$Parser$Advanced$oneOfHelp = F3(
	function (s0, bag, parsers) {
		oneOfHelp:
		while (true) {
			if (!parsers.b) {
				return A2($elm$parser$Parser$Advanced$Bad, false, bag);
			} else {
				var parse = parsers.a.a;
				var remainingParsers = parsers.b;
				var _v1 = parse(s0);
				if (_v1.$ === 'Good') {
					var step = _v1;
					return step;
				} else {
					var step = _v1;
					var p = step.a;
					var x = step.b;
					if (p) {
						return step;
					} else {
						var $temp$s0 = s0,
							$temp$bag = A2($elm$parser$Parser$Advanced$Append, bag, x),
							$temp$parsers = remainingParsers;
						s0 = $temp$s0;
						bag = $temp$bag;
						parsers = $temp$parsers;
						continue oneOfHelp;
					}
				}
			}
		}
	});
var $elm$parser$Parser$Advanced$oneOf = function (parsers) {
	return $elm$parser$Parser$Advanced$Parser(
		function (s) {
			return A3($elm$parser$Parser$Advanced$oneOfHelp, s, $elm$parser$Parser$Advanced$Empty, parsers);
		});
};
var $elm$parser$Parser$oneOf = $elm$parser$Parser$Advanced$oneOf;
var $elm$parser$Parser$Done = function (a) {
	return {$: 'Done', a: a};
};
var $elm$parser$Parser$Loop = function (a) {
	return {$: 'Loop', a: a};
};
var $elm$core$String$append = _String_append;
var $elm$parser$Parser$UnexpectedChar = {$: 'UnexpectedChar'};
var $elm$parser$Parser$Advanced$chompIf = F2(
	function (isGood, expecting) {
		return $elm$parser$Parser$Advanced$Parser(
			function (s) {
				var newOffset = A3($elm$parser$Parser$Advanced$isSubChar, isGood, s.offset, s.src);
				return _Utils_eq(newOffset, -1) ? A2(
					$elm$parser$Parser$Advanced$Bad,
					false,
					A2($elm$parser$Parser$Advanced$fromState, s, expecting)) : (_Utils_eq(newOffset, -2) ? A3(
					$elm$parser$Parser$Advanced$Good,
					true,
					_Utils_Tuple0,
					{col: 1, context: s.context, indent: s.indent, offset: s.offset + 1, row: s.row + 1, src: s.src}) : A3(
					$elm$parser$Parser$Advanced$Good,
					true,
					_Utils_Tuple0,
					{col: s.col + 1, context: s.context, indent: s.indent, offset: newOffset, row: s.row, src: s.src}));
			});
	});
var $elm$parser$Parser$chompIf = function (isGood) {
	return A2($elm$parser$Parser$Advanced$chompIf, isGood, $elm$parser$Parser$UnexpectedChar);
};
var $elm$parser$Parser$Advanced$loopHelp = F4(
	function (p, state, callback, s0) {
		loopHelp:
		while (true) {
			var _v0 = callback(state);
			var parse = _v0.a;
			var _v1 = parse(s0);
			if (_v1.$ === 'Good') {
				var p1 = _v1.a;
				var step = _v1.b;
				var s1 = _v1.c;
				if (step.$ === 'Loop') {
					var newState = step.a;
					var $temp$p = p || p1,
						$temp$state = newState,
						$temp$callback = callback,
						$temp$s0 = s1;
					p = $temp$p;
					state = $temp$state;
					callback = $temp$callback;
					s0 = $temp$s0;
					continue loopHelp;
				} else {
					var result = step.a;
					return A3($elm$parser$Parser$Advanced$Good, p || p1, result, s1);
				}
			} else {
				var p1 = _v1.a;
				var x = _v1.b;
				return A2($elm$parser$Parser$Advanced$Bad, p || p1, x);
			}
		}
	});
var $elm$parser$Parser$Advanced$loop = F2(
	function (state, callback) {
		return $elm$parser$Parser$Advanced$Parser(
			function (s) {
				return A4($elm$parser$Parser$Advanced$loopHelp, false, state, callback, s);
			});
	});
var $elm$parser$Parser$Advanced$map = F2(
	function (func, _v0) {
		var parse = _v0.a;
		return $elm$parser$Parser$Advanced$Parser(
			function (s0) {
				var _v1 = parse(s0);
				if (_v1.$ === 'Good') {
					var p = _v1.a;
					var a = _v1.b;
					var s1 = _v1.c;
					return A3(
						$elm$parser$Parser$Advanced$Good,
						p,
						func(a),
						s1);
				} else {
					var p = _v1.a;
					var x = _v1.b;
					return A2($elm$parser$Parser$Advanced$Bad, p, x);
				}
			});
	});
var $elm$parser$Parser$map = $elm$parser$Parser$Advanced$map;
var $elm$parser$Parser$Advanced$Done = function (a) {
	return {$: 'Done', a: a};
};
var $elm$parser$Parser$Advanced$Loop = function (a) {
	return {$: 'Loop', a: a};
};
var $elm$parser$Parser$toAdvancedStep = function (step) {
	if (step.$ === 'Loop') {
		var s = step.a;
		return $elm$parser$Parser$Advanced$Loop(s);
	} else {
		var a = step.a;
		return $elm$parser$Parser$Advanced$Done(a);
	}
};
var $elm$parser$Parser$loop = F2(
	function (state, callback) {
		return A2(
			$elm$parser$Parser$Advanced$loop,
			state,
			function (s) {
				return A2(
					$elm$parser$Parser$map,
					$elm$parser$Parser$toAdvancedStep,
					callback(s));
			});
	});
var $rtfeldman$elm_iso8601_date_strings$Iso8601$paddedInt = function (quantity) {
	var helper = function (str) {
		if (_Utils_eq(
			$elm$core$String$length(str),
			quantity)) {
			var _v0 = $elm$core$String$toInt(str);
			if (_v0.$ === 'Just') {
				var intVal = _v0.a;
				return A2(
					$elm$parser$Parser$map,
					$elm$parser$Parser$Done,
					$elm$parser$Parser$succeed(intVal));
			} else {
				return $elm$parser$Parser$problem('Invalid integer: \"' + (str + '\"'));
			}
		} else {
			return A2(
				$elm$parser$Parser$map,
				function (nextChar) {
					return $elm$parser$Parser$Loop(
						A2($elm$core$String$append, str, nextChar));
				},
				$elm$parser$Parser$getChompedString(
					$elm$parser$Parser$chompIf($elm$core$Char$isDigit)));
		}
	};
	return A2($elm$parser$Parser$loop, '', helper);
};
var $elm$parser$Parser$ExpectingSymbol = function (a) {
	return {$: 'ExpectingSymbol', a: a};
};
var $elm$parser$Parser$Advanced$Token = F2(
	function (a, b) {
		return {$: 'Token', a: a, b: b};
	});
var $elm$parser$Parser$Advanced$isSubString = _Parser_isSubString;
var $elm$parser$Parser$Advanced$token = function (_v0) {
	var str = _v0.a;
	var expecting = _v0.b;
	var progress = !$elm$core$String$isEmpty(str);
	return $elm$parser$Parser$Advanced$Parser(
		function (s) {
			var _v1 = A5($elm$parser$Parser$Advanced$isSubString, str, s.offset, s.row, s.col, s.src);
			var newOffset = _v1.a;
			var newRow = _v1.b;
			var newCol = _v1.c;
			return _Utils_eq(newOffset, -1) ? A2(
				$elm$parser$Parser$Advanced$Bad,
				false,
				A2($elm$parser$Parser$Advanced$fromState, s, expecting)) : A3(
				$elm$parser$Parser$Advanced$Good,
				progress,
				_Utils_Tuple0,
				{col: newCol, context: s.context, indent: s.indent, offset: newOffset, row: newRow, src: s.src});
		});
};
var $elm$parser$Parser$Advanced$symbol = $elm$parser$Parser$Advanced$token;
var $elm$parser$Parser$symbol = function (str) {
	return $elm$parser$Parser$Advanced$symbol(
		A2(
			$elm$parser$Parser$Advanced$Token,
			str,
			$elm$parser$Parser$ExpectingSymbol(str)));
};
var $rtfeldman$elm_iso8601_date_strings$Iso8601$epochYear = 1970;
var $rtfeldman$elm_iso8601_date_strings$Iso8601$invalidDay = function (day) {
	return $elm$parser$Parser$problem(
		'Invalid day: ' + $elm$core$String$fromInt(day));
};
var $rtfeldman$elm_iso8601_date_strings$Iso8601$isLeapYear = function (year) {
	return (!A2($elm$core$Basics$modBy, 4, year)) && ((!(!A2($elm$core$Basics$modBy, 100, year))) || (!A2($elm$core$Basics$modBy, 400, year)));
};
var $rtfeldman$elm_iso8601_date_strings$Iso8601$leapYearsBefore = function (y1) {
	var y = y1 - 1;
	return (((y / 4) | 0) - ((y / 100) | 0)) + ((y / 400) | 0);
};
var $rtfeldman$elm_iso8601_date_strings$Iso8601$msPerDay = 86400000;
var $rtfeldman$elm_iso8601_date_strings$Iso8601$msPerYear = 31536000000;
var $rtfeldman$elm_iso8601_date_strings$Iso8601$yearMonthDay = function (_v0) {
	var year = _v0.a;
	var month = _v0.b;
	var dayInMonth = _v0.c;
	if (dayInMonth < 0) {
		return $rtfeldman$elm_iso8601_date_strings$Iso8601$invalidDay(dayInMonth);
	} else {
		var succeedWith = function (extraMs) {
			var yearMs = $rtfeldman$elm_iso8601_date_strings$Iso8601$msPerYear * (year - $rtfeldman$elm_iso8601_date_strings$Iso8601$epochYear);
			var days = ((month < 3) || (!$rtfeldman$elm_iso8601_date_strings$Iso8601$isLeapYear(year))) ? (dayInMonth - 1) : dayInMonth;
			var dayMs = $rtfeldman$elm_iso8601_date_strings$Iso8601$msPerDay * (days + ($rtfeldman$elm_iso8601_date_strings$Iso8601$leapYearsBefore(year) - $rtfeldman$elm_iso8601_date_strings$Iso8601$leapYearsBefore($rtfeldman$elm_iso8601_date_strings$Iso8601$epochYear)));
			return $elm$parser$Parser$succeed((extraMs + yearMs) + dayMs);
		};
		switch (month) {
			case 1:
				return (dayInMonth > 31) ? $rtfeldman$elm_iso8601_date_strings$Iso8601$invalidDay(dayInMonth) : succeedWith(0);
			case 2:
				return ((dayInMonth > 29) || ((dayInMonth === 29) && (!$rtfeldman$elm_iso8601_date_strings$Iso8601$isLeapYear(year)))) ? $rtfeldman$elm_iso8601_date_strings$Iso8601$invalidDay(dayInMonth) : succeedWith(2678400000);
			case 3:
				return (dayInMonth > 31) ? $rtfeldman$elm_iso8601_date_strings$Iso8601$invalidDay(dayInMonth) : succeedWith(5097600000);
			case 4:
				return (dayInMonth > 30) ? $rtfeldman$elm_iso8601_date_strings$Iso8601$invalidDay(dayInMonth) : succeedWith(7776000000);
			case 5:
				return (dayInMonth > 31) ? $rtfeldman$elm_iso8601_date_strings$Iso8601$invalidDay(dayInMonth) : succeedWith(10368000000);
			case 6:
				return (dayInMonth > 30) ? $rtfeldman$elm_iso8601_date_strings$Iso8601$invalidDay(dayInMonth) : succeedWith(13046400000);
			case 7:
				return (dayInMonth > 31) ? $rtfeldman$elm_iso8601_date_strings$Iso8601$invalidDay(dayInMonth) : succeedWith(15638400000);
			case 8:
				return (dayInMonth > 31) ? $rtfeldman$elm_iso8601_date_strings$Iso8601$invalidDay(dayInMonth) : succeedWith(18316800000);
			case 9:
				return (dayInMonth > 30) ? $rtfeldman$elm_iso8601_date_strings$Iso8601$invalidDay(dayInMonth) : succeedWith(20995200000);
			case 10:
				return (dayInMonth > 31) ? $rtfeldman$elm_iso8601_date_strings$Iso8601$invalidDay(dayInMonth) : succeedWith(23587200000);
			case 11:
				return (dayInMonth > 30) ? $rtfeldman$elm_iso8601_date_strings$Iso8601$invalidDay(dayInMonth) : succeedWith(26265600000);
			case 12:
				return (dayInMonth > 31) ? $rtfeldman$elm_iso8601_date_strings$Iso8601$invalidDay(dayInMonth) : succeedWith(28857600000);
			default:
				return $elm$parser$Parser$problem(
					'Invalid month: \"' + ($elm$core$String$fromInt(month) + '\"'));
		}
	}
};
var $rtfeldman$elm_iso8601_date_strings$Iso8601$monthYearDayInMs = A2(
	$elm$parser$Parser$andThen,
	$rtfeldman$elm_iso8601_date_strings$Iso8601$yearMonthDay,
	A2(
		$elm$parser$Parser$keeper,
		A2(
			$elm$parser$Parser$keeper,
			A2(
				$elm$parser$Parser$keeper,
				$elm$parser$Parser$succeed(
					F3(
						function (year, month, day) {
							return _Utils_Tuple3(year, month, day);
						})),
				$rtfeldman$elm_iso8601_date_strings$Iso8601$paddedInt(4)),
			$elm$parser$Parser$oneOf(
				_List_fromArray(
					[
						A2(
						$elm$parser$Parser$keeper,
						A2(
							$elm$parser$Parser$ignorer,
							$elm$parser$Parser$succeed($elm$core$Basics$identity),
							$elm$parser$Parser$symbol('-')),
						$rtfeldman$elm_iso8601_date_strings$Iso8601$paddedInt(2)),
						$rtfeldman$elm_iso8601_date_strings$Iso8601$paddedInt(2)
					]))),
		$elm$parser$Parser$oneOf(
			_List_fromArray(
				[
					A2(
					$elm$parser$Parser$keeper,
					A2(
						$elm$parser$Parser$ignorer,
						$elm$parser$Parser$succeed($elm$core$Basics$identity),
						$elm$parser$Parser$symbol('-')),
					$rtfeldman$elm_iso8601_date_strings$Iso8601$paddedInt(2)),
					$rtfeldman$elm_iso8601_date_strings$Iso8601$paddedInt(2)
				]))));
var $rtfeldman$elm_iso8601_date_strings$Iso8601$utcOffsetInMinutes = function () {
	var utcOffsetMinutesFromParts = F3(
		function (multiplier, hours, minutes) {
			return (multiplier * (hours * 60)) + minutes;
		});
	return A2(
		$elm$parser$Parser$keeper,
		$elm$parser$Parser$succeed($elm$core$Basics$identity),
		$elm$parser$Parser$oneOf(
			_List_fromArray(
				[
					A2(
					$elm$parser$Parser$map,
					function (_v0) {
						return 0;
					},
					$elm$parser$Parser$symbol('Z')),
					A2(
					$elm$parser$Parser$keeper,
					A2(
						$elm$parser$Parser$keeper,
						A2(
							$elm$parser$Parser$keeper,
							$elm$parser$Parser$succeed(utcOffsetMinutesFromParts),
							$elm$parser$Parser$oneOf(
								_List_fromArray(
									[
										A2(
										$elm$parser$Parser$map,
										function (_v1) {
											return 1;
										},
										$elm$parser$Parser$symbol('+')),
										A2(
										$elm$parser$Parser$map,
										function (_v2) {
											return -1;
										},
										$elm$parser$Parser$symbol('-'))
									]))),
						$rtfeldman$elm_iso8601_date_strings$Iso8601$paddedInt(2)),
					$elm$parser$Parser$oneOf(
						_List_fromArray(
							[
								A2(
								$elm$parser$Parser$keeper,
								A2(
									$elm$parser$Parser$ignorer,
									$elm$parser$Parser$succeed($elm$core$Basics$identity),
									$elm$parser$Parser$symbol(':')),
								$rtfeldman$elm_iso8601_date_strings$Iso8601$paddedInt(2)),
								$rtfeldman$elm_iso8601_date_strings$Iso8601$paddedInt(2),
								$elm$parser$Parser$succeed(0)
							]))),
					A2(
					$elm$parser$Parser$ignorer,
					$elm$parser$Parser$succeed(0),
					$elm$parser$Parser$end)
				])));
}();
var $rtfeldman$elm_iso8601_date_strings$Iso8601$iso8601 = A2(
	$elm$parser$Parser$andThen,
	function (datePart) {
		return $elm$parser$Parser$oneOf(
			_List_fromArray(
				[
					A2(
					$elm$parser$Parser$keeper,
					A2(
						$elm$parser$Parser$keeper,
						A2(
							$elm$parser$Parser$keeper,
							A2(
								$elm$parser$Parser$keeper,
								A2(
									$elm$parser$Parser$keeper,
									A2(
										$elm$parser$Parser$ignorer,
										$elm$parser$Parser$succeed(
											$rtfeldman$elm_iso8601_date_strings$Iso8601$fromParts(datePart)),
										$elm$parser$Parser$symbol('T')),
									$rtfeldman$elm_iso8601_date_strings$Iso8601$paddedInt(2)),
								$elm$parser$Parser$oneOf(
									_List_fromArray(
										[
											A2(
											$elm$parser$Parser$keeper,
											A2(
												$elm$parser$Parser$ignorer,
												$elm$parser$Parser$succeed($elm$core$Basics$identity),
												$elm$parser$Parser$symbol(':')),
											$rtfeldman$elm_iso8601_date_strings$Iso8601$paddedInt(2)),
											$rtfeldman$elm_iso8601_date_strings$Iso8601$paddedInt(2)
										]))),
							$elm$parser$Parser$oneOf(
								_List_fromArray(
									[
										A2(
										$elm$parser$Parser$keeper,
										A2(
											$elm$parser$Parser$ignorer,
											$elm$parser$Parser$succeed($elm$core$Basics$identity),
											$elm$parser$Parser$symbol(':')),
										$rtfeldman$elm_iso8601_date_strings$Iso8601$paddedInt(2)),
										$rtfeldman$elm_iso8601_date_strings$Iso8601$paddedInt(2),
										$elm$parser$Parser$succeed(0)
									]))),
						$elm$parser$Parser$oneOf(
							_List_fromArray(
								[
									A2(
									$elm$parser$Parser$keeper,
									A2(
										$elm$parser$Parser$ignorer,
										$elm$parser$Parser$succeed($elm$core$Basics$identity),
										$elm$parser$Parser$symbol('.')),
									$rtfeldman$elm_iso8601_date_strings$Iso8601$fractionsOfASecondInMs),
									$elm$parser$Parser$succeed(0)
								]))),
					A2($elm$parser$Parser$ignorer, $rtfeldman$elm_iso8601_date_strings$Iso8601$utcOffsetInMinutes, $elm$parser$Parser$end)),
					A2(
					$elm$parser$Parser$ignorer,
					$elm$parser$Parser$succeed(
						A6($rtfeldman$elm_iso8601_date_strings$Iso8601$fromParts, datePart, 0, 0, 0, 0, 0)),
					$elm$parser$Parser$end)
				]));
	},
	$rtfeldman$elm_iso8601_date_strings$Iso8601$monthYearDayInMs);
var $elm$parser$Parser$DeadEnd = F3(
	function (row, col, problem) {
		return {col: col, problem: problem, row: row};
	});
var $elm$parser$Parser$problemToDeadEnd = function (p) {
	return A3($elm$parser$Parser$DeadEnd, p.row, p.col, p.problem);
};
var $elm$parser$Parser$Advanced$bagToList = F2(
	function (bag, list) {
		bagToList:
		while (true) {
			switch (bag.$) {
				case 'Empty':
					return list;
				case 'AddRight':
					var bag1 = bag.a;
					var x = bag.b;
					var $temp$bag = bag1,
						$temp$list = A2($elm$core$List$cons, x, list);
					bag = $temp$bag;
					list = $temp$list;
					continue bagToList;
				default:
					var bag1 = bag.a;
					var bag2 = bag.b;
					var $temp$bag = bag1,
						$temp$list = A2($elm$parser$Parser$Advanced$bagToList, bag2, list);
					bag = $temp$bag;
					list = $temp$list;
					continue bagToList;
			}
		}
	});
var $elm$parser$Parser$Advanced$run = F2(
	function (_v0, src) {
		var parse = _v0.a;
		var _v1 = parse(
			{col: 1, context: _List_Nil, indent: 1, offset: 0, row: 1, src: src});
		if (_v1.$ === 'Good') {
			var value = _v1.b;
			return $elm$core$Result$Ok(value);
		} else {
			var bag = _v1.b;
			return $elm$core$Result$Err(
				A2($elm$parser$Parser$Advanced$bagToList, bag, _List_Nil));
		}
	});
var $elm$parser$Parser$run = F2(
	function (parser, source) {
		var _v0 = A2($elm$parser$Parser$Advanced$run, parser, source);
		if (_v0.$ === 'Ok') {
			var a = _v0.a;
			return $elm$core$Result$Ok(a);
		} else {
			var problems = _v0.a;
			return $elm$core$Result$Err(
				A2($elm$core$List$map, $elm$parser$Parser$problemToDeadEnd, problems));
		}
	});
var $rtfeldman$elm_iso8601_date_strings$Iso8601$toTime = function (str) {
	return A2($elm$parser$Parser$run, $rtfeldman$elm_iso8601_date_strings$Iso8601$iso8601, str);
};
var $author$project$Main$dateFromEventId = F3(
	function (zone, eventBegin, addMinute) {
		var time = $rtfeldman$elm_iso8601_date_strings$Iso8601$toTime(eventBegin);
		var utctime = function () {
			if (time.$ === 'Ok') {
				var utc = time.a;
				return A4($justinmimbs$time_extra$Time$Extra$add, $justinmimbs$time_extra$Time$Extra$Minute, addMinute, $elm$time$Time$utc, utc);
			} else {
				return $elm$time$Time$millisToPosix(0);
			}
		}();
		var year = $elm$core$String$fromInt(
			A2($elm$time$Time$toYear, zone, utctime));
		var minute = A3(
			$elm$core$String$padLeft,
			2,
			_Utils_chr('0'),
			$elm$core$String$fromInt(
				A2($elm$time$Time$toMinute, zone, utctime)));
		var hour = A3(
			$elm$core$String$padLeft,
			2,
			_Utils_chr('0'),
			$elm$core$String$fromInt(
				A2($elm$time$Time$toHour, zone, utctime)));
		var fromMonth = function (m) {
			switch (m.$) {
				case 'Jan':
					return '01';
				case 'Feb':
					return '02';
				case 'Mar':
					return '03';
				case 'Apr':
					return '04';
				case 'May':
					return '05';
				case 'Jun':
					return '06';
				case 'Jul':
					return '07';
				case 'Aug':
					return '08';
				case 'Sep':
					return '09';
				case 'Oct':
					return '10';
				case 'Nov':
					return '11';
				default:
					return '12';
			}
		};
		var month = fromMonth(
			A2($elm$time$Time$toMonth, zone, utctime));
		var day = A3(
			$elm$core$String$padLeft,
			2,
			_Utils_chr('0'),
			$elm$core$String$fromInt(
				A2($elm$time$Time$toDay, zone, utctime)));
		return year + ('/' + (month + ('/' + (day + (' ' + (hour + (':' + minute)))))));
	});
var $rundis$elm_bootstrap$Bootstrap$Form$Select$Item = function (a) {
	return {$: 'Item', a: a};
};
var $elm$html$Html$option = _VirtualDom_node('option');
var $rundis$elm_bootstrap$Bootstrap$Form$Select$item = F2(
	function (attributes, children) {
		return $rundis$elm_bootstrap$Bootstrap$Form$Select$Item(
			A2($elm$html$Html$option, attributes, children));
	});
var $author$project$Main$viewSelect = F2(
	function (zone, _v0) {
		var id = _v0.a;
		var eventBegin = _v0.b;
		return A2(
			$rundis$elm_bootstrap$Bootstrap$Form$Select$item,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$value(id)
				]),
			_List_fromArray(
				[
					$elm$html$Html$text(
					A3($author$project$Main$dateFromEventId, zone, eventBegin, 0))
				]));
	});
var $author$project$Main$viewEventSelect = function (model) {
	var sorted = $author$project$Main$getEventDateList(model.joinedIds);
	return A2(
		$elm$core$List$map,
		$author$project$Main$viewSelect(model.timeZone),
		sorted);
};
var $lynn$elm_ordinal$Ordinal$ordinalSuffix = function (n) {
	var n_ = $elm$core$Basics$abs(n);
	if (((A2($elm$core$Basics$modBy, 100, n_) / 10) | 0) === 1) {
		return 'th';
	} else {
		var _v0 = A2($elm$core$Basics$modBy, 10, n_);
		switch (_v0) {
			case 1:
				return 'st';
			case 2:
				return 'nd';
			case 3:
				return 'rd';
			default:
				return 'th';
		}
	}
};
var $lynn$elm_ordinal$Ordinal$ordinal = function (n) {
	return _Utils_ap(
		$elm$core$String$fromInt(n),
		$lynn$elm_ordinal$Ordinal$ordinalSuffix(n));
};
var $author$project$Main$viewGameSelect = F2(
	function (model, eventId) {
		var list = function () {
			var _v0 = A2($elm$core$Dict$get, eventId, model.joinedIds);
			if (_v0.$ === 'Nothing') {
				return _List_Nil;
			} else {
				var x = _v0.a;
				return x.b;
			}
		}();
		return A2(
			$elm$core$List$cons,
			A2(
				$rundis$elm_bootstrap$Bootstrap$Form$Select$item,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$value('Total')
					]),
				_List_fromArray(
					[
						$elm$html$Html$text('Total')
					])),
			A2(
				$elm$core$List$map,
				function (x) {
					return A2(
						$rundis$elm_bootstrap$Bootstrap$Form$Select$item,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$value(
								$elm$core$String$fromInt(x))
							]),
						_List_fromArray(
							[
								$elm$html$Html$text(
								$lynn$elm_ordinal$Ordinal$ordinal(x + 1) + ' game')
							]));
				},
				list));
	});
var $rundis$elm_bootstrap$Bootstrap$Grid$Col$xs4 = A2($rundis$elm_bootstrap$Bootstrap$Grid$Internal$width, $rundis$elm_bootstrap$Bootstrap$General$Internal$XS, $rundis$elm_bootstrap$Bootstrap$Grid$Internal$Col4);
var $rundis$elm_bootstrap$Bootstrap$Grid$Col$xs6 = A2($rundis$elm_bootstrap$Bootstrap$Grid$Internal$width, $rundis$elm_bootstrap$Bootstrap$General$Internal$XS, $rundis$elm_bootstrap$Bootstrap$Grid$Internal$Col6);
var $author$project$Main$viewHistory = function (model) {
	return $rundis$elm_bootstrap$Bootstrap$Card$view(
		A3(
			$rundis$elm_bootstrap$Bootstrap$Card$block,
			_List_Nil,
			_List_fromArray(
				[
					A2(
					$rundis$elm_bootstrap$Bootstrap$Card$Block$titleH4,
					_List_Nil,
					_List_fromArray(
						[
							$elm$html$Html$text('Game History')
						])),
					$rundis$elm_bootstrap$Bootstrap$Card$Block$custom(
					A2(
						$rundis$elm_bootstrap$Bootstrap$Grid$row,
						_List_fromArray(
							[$rundis$elm_bootstrap$Bootstrap$Grid$Row$leftXs]),
						_List_fromArray(
							[
								A2(
								$rundis$elm_bootstrap$Bootstrap$Grid$col,
								_List_fromArray(
									[$rundis$elm_bootstrap$Bootstrap$Grid$Col$xs8, $rundis$elm_bootstrap$Bootstrap$Grid$Col$lg5]),
								_List_fromArray(
									[
										A2(
										$rundis$elm_bootstrap$Bootstrap$Form$Select$select,
										_List_fromArray(
											[
												$rundis$elm_bootstrap$Bootstrap$Form$Select$id(''),
												$rundis$elm_bootstrap$Bootstrap$Form$Select$onChange($author$project$Main$FormEventSelect),
												$rundis$elm_bootstrap$Bootstrap$Form$Select$small
											]),
										$author$project$Main$viewEventSelect(model))
									])),
								A2(
								$rundis$elm_bootstrap$Bootstrap$Grid$col,
								_List_fromArray(
									[$rundis$elm_bootstrap$Bootstrap$Grid$Col$xs4, $rundis$elm_bootstrap$Bootstrap$Grid$Col$lg3, $rundis$elm_bootstrap$Bootstrap$Grid$Col$bottomXs]),
								_List_fromArray(
									[
										$elm$html$Html$text(
										$elm$core$String$fromInt(
											$elm$core$Dict$size(model.eventRecord.gamesRecord)) + ' games')
									])),
								A2(
								$rundis$elm_bootstrap$Bootstrap$Grid$col,
								_List_fromArray(
									[$rundis$elm_bootstrap$Bootstrap$Grid$Col$xs12, $rundis$elm_bootstrap$Bootstrap$Grid$Col$lg8]),
								_List_fromArray(
									[
										A2(
										$rundis$elm_bootstrap$Bootstrap$Form$row,
										_List_fromArray(
											[
												$rundis$elm_bootstrap$Bootstrap$Grid$Row$attrs(
												_List_fromArray(
													[
														$rundis$elm_bootstrap$Bootstrap$Utilities$Spacing$m1,
														$rundis$elm_bootstrap$Bootstrap$Utilities$Spacing$p0,
														A2($elm$html$Html$Attributes$style, 'text-align', 'right')
													]))
											]),
										_List_fromArray(
											[
												A2(
												$rundis$elm_bootstrap$Bootstrap$Form$col,
												_List_fromArray(
													[
														$rundis$elm_bootstrap$Bootstrap$Grid$Col$attrs(
														_List_fromArray(
															[$rundis$elm_bootstrap$Bootstrap$Utilities$Spacing$m1, $rundis$elm_bootstrap$Bootstrap$Utilities$Spacing$p0]))
													]),
												_List_fromArray(
													[
														$elm$html$Html$text(model.userInfo.nickname + '\'s')
													])),
												A2(
												$rundis$elm_bootstrap$Bootstrap$Form$col,
												_List_fromArray(
													[
														$rundis$elm_bootstrap$Bootstrap$Grid$Col$attrs(
														_List_fromArray(
															[$rundis$elm_bootstrap$Bootstrap$Utilities$Spacing$m1, $rundis$elm_bootstrap$Bootstrap$Utilities$Spacing$p0]))
													]),
												_List_fromArray(
													[
														A2(
														$rundis$elm_bootstrap$Bootstrap$Form$label,
														_List_fromArray(
															[$rundis$elm_bootstrap$Bootstrap$Utilities$Spacing$m0, $rundis$elm_bootstrap$Bootstrap$Utilities$Spacing$p0]),
														_List_fromArray(
															[
																$elm$html$Html$text('High Score')
															])),
														$rundis$elm_bootstrap$Bootstrap$Form$Input$number(
														_List_fromArray(
															[
																$rundis$elm_bootstrap$Bootstrap$Form$Input$value('200'),
																$rundis$elm_bootstrap$Bootstrap$Form$Input$small,
																$rundis$elm_bootstrap$Bootstrap$Form$Input$plainText(true),
																$rundis$elm_bootstrap$Bootstrap$Form$Input$attrs(
																_List_fromArray(
																	[
																		$rundis$elm_bootstrap$Bootstrap$Utilities$Spacing$m1,
																		$rundis$elm_bootstrap$Bootstrap$Utilities$Spacing$p1,
																		A2($elm$html$Html$Attributes$style, 'text-align', 'right')
																	]))
															]))
													])),
												A2(
												$rundis$elm_bootstrap$Bootstrap$Form$col,
												_List_fromArray(
													[
														$rundis$elm_bootstrap$Bootstrap$Grid$Col$attrs(
														_List_fromArray(
															[$rundis$elm_bootstrap$Bootstrap$Utilities$Spacing$m1, $rundis$elm_bootstrap$Bootstrap$Utilities$Spacing$p0]))
													]),
												_List_fromArray(
													[
														A2(
														$rundis$elm_bootstrap$Bootstrap$Form$label,
														_List_fromArray(
															[$rundis$elm_bootstrap$Bootstrap$Utilities$Spacing$m0, $rundis$elm_bootstrap$Bootstrap$Utilities$Spacing$p0]),
														_List_fromArray(
															[
																$elm$html$Html$text('Average')
															])),
														$rundis$elm_bootstrap$Bootstrap$Form$Input$number(
														_List_fromArray(
															[
																$rundis$elm_bootstrap$Bootstrap$Form$Input$small,
																$rundis$elm_bootstrap$Bootstrap$Form$Input$value('180'),
																$rundis$elm_bootstrap$Bootstrap$Form$Input$plainText(true),
																$rundis$elm_bootstrap$Bootstrap$Form$Input$attrs(
																_List_fromArray(
																	[
																		$rundis$elm_bootstrap$Bootstrap$Utilities$Spacing$m1,
																		$rundis$elm_bootstrap$Bootstrap$Utilities$Spacing$p1,
																		A2($elm$html$Html$Attributes$style, 'text-align', 'right')
																	]))
															]))
													]))
											]))
									]))
							]))),
					$rundis$elm_bootstrap$Bootstrap$Card$Block$custom(
					A2(
						$rundis$elm_bootstrap$Bootstrap$Grid$row,
						_List_fromArray(
							[$rundis$elm_bootstrap$Bootstrap$Grid$Row$rightXs, $rundis$elm_bootstrap$Bootstrap$Grid$Row$centerLg]),
						_List_fromArray(
							[
								A2(
								$rundis$elm_bootstrap$Bootstrap$Grid$col,
								_List_fromArray(
									[$rundis$elm_bootstrap$Bootstrap$Grid$Col$xs6, $rundis$elm_bootstrap$Bootstrap$Grid$Col$lg4]),
								_List_fromArray(
									[
										A2(
										$rundis$elm_bootstrap$Bootstrap$Form$Select$select,
										_List_fromArray(
											[
												$rundis$elm_bootstrap$Bootstrap$Form$Select$id('gameIdSelect'),
												$rundis$elm_bootstrap$Bootstrap$Form$Select$onChange($author$project$Main$FormGameSelect),
												$rundis$elm_bootstrap$Bootstrap$Form$Select$small,
												$rundis$elm_bootstrap$Bootstrap$Form$Select$attrs(
												_List_fromArray(
													[
														$elm$html$Html$Attributes$value(model.inputRecordParam.gameId)
													]))
											]),
										A2($author$project$Main$viewGameSelect, model, model.inputRecordParam.eventId))
									]))
							]))),
					$rundis$elm_bootstrap$Bootstrap$Card$Block$custom(
					A2(
						$rundis$elm_bootstrap$Bootstrap$Grid$row,
						_List_fromArray(
							[$rundis$elm_bootstrap$Bootstrap$Grid$Row$centerXs]),
						_List_fromArray(
							[
								A2(
								$rundis$elm_bootstrap$Bootstrap$Grid$col,
								_List_fromArray(
									[$rundis$elm_bootstrap$Bootstrap$Grid$Col$xs12, $rundis$elm_bootstrap$Bootstrap$Grid$Col$lg6]),
								_List_fromArray(
									[
										$author$project$Main$viewEventResult(model)
									]))
							]))),
					$rundis$elm_bootstrap$Bootstrap$Card$Block$custom(
					A2(
						$rundis$elm_bootstrap$Bootstrap$Grid$row,
						_List_fromArray(
							[$rundis$elm_bootstrap$Bootstrap$Grid$Row$rightXs]),
						_List_fromArray(
							[
								A2(
								$rundis$elm_bootstrap$Bootstrap$Grid$col,
								_List_fromArray(
									[$rundis$elm_bootstrap$Bootstrap$Grid$Col$xs5, $rundis$elm_bootstrap$Bootstrap$Grid$Col$lg3]),
								_List_fromArray(
									[
										A2(
										$rundis$elm_bootstrap$Bootstrap$Button$button,
										_List_fromArray(
											[
												$rundis$elm_bootstrap$Bootstrap$Button$secondary,
												$rundis$elm_bootstrap$Bootstrap$Button$onClick($author$project$Main$ToggleMyPage)
											]),
										_List_fromArray(
											[
												$elm$html$Html$text('Join Game')
											]))
									]))
							])))
				]),
			$rundis$elm_bootstrap$Bootstrap$Card$config(_List_Nil)));
};
var $author$project$Main$Fscore_size = {$: 'Fscore_size'};
var $elm$core$List$maximum = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return $elm$core$Maybe$Just(
			A3($elm$core$List$foldl, $elm$core$Basics$max, x, xs));
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $elm$core$List$concatMap = F2(
	function (f, list) {
		return $elm$core$List$concat(
			A2($elm$core$List$map, f, list));
	});
var $author$project$Main$joinedGameIdList = F2(
	function (zone, joinedIds) {
		var sorted = $elm$core$List$reverse(
			A2(
				$elm$core$List$sortBy,
				function (r) {
					return r.a;
				},
				joinedIds));
		var joinEventAndGame = F2(
			function (eventBegin, gameId) {
				var eventDate = A3($author$project$Main$dateFromEventId, zone, eventBegin, gameId * 23);
				return _Utils_Tuple2(
					eventDate,
					$elm$core$String$fromInt(gameId + 1));
			});
		return A2(
			$elm$core$List$concatMap,
			function (_v0) {
				var eventBegin = _v0.a;
				var gameIds = _v0.b;
				return A2(
					$elm$core$List$map,
					joinEventAndGame(eventBegin),
					gameIds);
			},
			sorted);
	});
var $elm$core$List$map3 = _List_map3;
var $author$project$Main$viewMyScore = F3(
	function (idx, _v0, score) {
		var eventId = _v0.a;
		var gameId = _v0.b;
		return A2(
			$rundis$elm_bootstrap$Bootstrap$Table$tr,
			_List_Nil,
			_List_fromArray(
				[
					A2(
					$rundis$elm_bootstrap$Bootstrap$Table$td,
					_List_Nil,
					_List_fromArray(
						[
							$elm$html$Html$text(
							$elm$core$String$fromInt(idx))
						])),
					A2(
					$rundis$elm_bootstrap$Bootstrap$Table$td,
					_List_Nil,
					_List_fromArray(
						[
							$elm$html$Html$text(eventId)
						])),
					A2(
					$rundis$elm_bootstrap$Bootstrap$Table$td,
					_List_Nil,
					_List_fromArray(
						[
							$elm$html$Html$text(gameId)
						])),
					A2(
					$rundis$elm_bootstrap$Bootstrap$Table$td,
					_List_Nil,
					_List_fromArray(
						[
							$elm$html$Html$text(
							$elm$core$String$fromInt(score))
						]))
				]));
	});
var $author$project$Main$viewMyScores = function (model) {
	return $rundis$elm_bootstrap$Bootstrap$Table$table(
		{
			options: _List_fromArray(
				[
					$rundis$elm_bootstrap$Bootstrap$Table$small,
					$rundis$elm_bootstrap$Bootstrap$Table$attr(
					A2($elm$html$Html$Attributes$style, 'text-align', 'right'))
				]),
			tbody: A2(
				$rundis$elm_bootstrap$Bootstrap$Table$tbody,
				_List_Nil,
				function () {
					var score_size = A2(
						$elm$core$Maybe$withDefault,
						50,
						$elm$core$String$toInt(model.inputRecordParam.scoreSize));
					return A4(
						$elm$core$List$map3,
						$author$project$Main$viewMyScore,
						A2($elm$core$List$range, 1, score_size),
						A2(
							$author$project$Main$joinedGameIdList,
							model.timeZone,
							$elm$core$Dict$values(model.joinedIds)),
						A2($elm$core$List$take, score_size, model.scoreRecord));
				}()),
			thead: A2(
				$rundis$elm_bootstrap$Bootstrap$Table$thead,
				_List_Nil,
				_List_fromArray(
					[
						A2(
						$rundis$elm_bootstrap$Bootstrap$Table$tr,
						_List_Nil,
						_List_fromArray(
							[
								A2(
								$rundis$elm_bootstrap$Bootstrap$Table$th,
								_List_fromArray(
									[
										$rundis$elm_bootstrap$Bootstrap$Table$cellAttr(
										A2($elm$html$Html$Attributes$style, 'border-top', '1px solid #FFF'))
									]),
								_List_fromArray(
									[
										$elm$html$Html$text('')
									])),
								A2(
								$rundis$elm_bootstrap$Bootstrap$Table$th,
								_List_fromArray(
									[
										$rundis$elm_bootstrap$Bootstrap$Table$cellAttr(
										A2($elm$html$Html$Attributes$style, 'border-top', '1px solid #FFF'))
									]),
								_List_fromArray(
									[
										$elm$html$Html$text('')
									])),
								A2(
								$rundis$elm_bootstrap$Bootstrap$Table$th,
								_List_fromArray(
									[
										$rundis$elm_bootstrap$Bootstrap$Table$cellAttr(
										A2($elm$html$Html$Attributes$style, 'border-top', '1px solid #FFF'))
									]),
								_List_fromArray(
									[
										$elm$html$Html$text('')
									])),
								A2(
								$rundis$elm_bootstrap$Bootstrap$Table$th,
								_List_fromArray(
									[
										$rundis$elm_bootstrap$Bootstrap$Table$cellAttr(
										A2($elm$html$Html$Attributes$style, 'border-top', '1px solid #FFF'))
									]),
								_List_fromArray(
									[
										$elm$html$Html$text('Score')
									]))
							]))
					]))
		});
};
var $rundis$elm_bootstrap$Bootstrap$Grid$Internal$Col7 = {$: 'Col7'};
var $rundis$elm_bootstrap$Bootstrap$Grid$Col$xs7 = A2($rundis$elm_bootstrap$Bootstrap$Grid$Internal$width, $rundis$elm_bootstrap$Bootstrap$General$Internal$XS, $rundis$elm_bootstrap$Bootstrap$Grid$Internal$Col7);
var $author$project$Main$viewMyData = function (model) {
	return $rundis$elm_bootstrap$Bootstrap$Card$view(
		A3(
			$rundis$elm_bootstrap$Bootstrap$Card$block,
			_List_Nil,
			_List_fromArray(
				[
					A2(
					$rundis$elm_bootstrap$Bootstrap$Card$Block$titleH4,
					_List_Nil,
					_List_fromArray(
						[
							$elm$html$Html$text('My Score Data')
						])),
					$rundis$elm_bootstrap$Bootstrap$Card$Block$custom(
					A2(
						$rundis$elm_bootstrap$Bootstrap$Grid$row,
						_List_fromArray(
							[$rundis$elm_bootstrap$Bootstrap$Grid$Row$leftXs, $rundis$elm_bootstrap$Bootstrap$Grid$Row$centerLg]),
						_List_fromArray(
							[
								A2(
								$rundis$elm_bootstrap$Bootstrap$Grid$col,
								_List_fromArray(
									[$rundis$elm_bootstrap$Bootstrap$Grid$Col$xs7, $rundis$elm_bootstrap$Bootstrap$Grid$Col$lg3]),
								_List_fromArray(
									[
										$rundis$elm_bootstrap$Bootstrap$Form$InputGroup$view(
										A2(
											$rundis$elm_bootstrap$Bootstrap$Form$InputGroup$successors,
											_List_fromArray(
												[
													A2(
													$rundis$elm_bootstrap$Bootstrap$Form$InputGroup$span,
													_List_fromArray(
														[
															A2($elm$html$Html$Attributes$style, 'background-color', '#FFF'),
															A2($elm$html$Html$Attributes$style, 'border', '1px solid #FFF'),
															A2($elm$html$Html$Attributes$style, 'border-bottom', '1px solid lightgray'),
															A2($elm$html$Html$Attributes$style, 'text-align', 'left')
														]),
													_List_fromArray(
														[
															$elm$html$Html$text('games')
														]))
												]),
											A2(
												$rundis$elm_bootstrap$Bootstrap$Form$InputGroup$predecessors,
												_List_fromArray(
													[
														A2(
														$rundis$elm_bootstrap$Bootstrap$Form$InputGroup$span,
														_List_fromArray(
															[
																A2($elm$html$Html$Attributes$style, 'background-color', '#FFF'),
																A2($elm$html$Html$Attributes$style, 'border', '1px solid #FFF'),
																A2($elm$html$Html$Attributes$style, 'border-bottom', '1px solid lightgray'),
																A2($elm$html$Html$Attributes$style, 'text-align', 'right')
															]),
														_List_fromArray(
															[
																$elm$html$Html$text('of last')
															]))
													]),
												$rundis$elm_bootstrap$Bootstrap$Form$InputGroup$small(
													$rundis$elm_bootstrap$Bootstrap$Form$InputGroup$config(
														$rundis$elm_bootstrap$Bootstrap$Form$InputGroup$number(
															_List_fromArray(
																[
																	$rundis$elm_bootstrap$Bootstrap$Form$Input$value(model.inputRecordParam.scoreSize),
																	$rundis$elm_bootstrap$Bootstrap$Form$Input$attrs(
																	_List_fromArray(
																		[
																			A2($elm$html$Html$Attributes$style, 'border', '1px solid #FFF'),
																			A2($elm$html$Html$Attributes$style, 'border-bottom', '1px solid lightgray'),
																			A2($elm$html$Html$Attributes$style, 'text-align', 'center')
																		])),
																	$rundis$elm_bootstrap$Bootstrap$Form$Input$onInput(
																	$author$project$Main$FormInput($author$project$Main$Fscore_size))
																])))))))
									]))
							]))),
					$rundis$elm_bootstrap$Bootstrap$Card$Block$custom(
					A2(
						$rundis$elm_bootstrap$Bootstrap$Grid$row,
						_List_fromArray(
							[$rundis$elm_bootstrap$Bootstrap$Grid$Row$leftXs]),
						_List_fromArray(
							[
								A2(
								$rundis$elm_bootstrap$Bootstrap$Grid$col,
								_List_fromArray(
									[$rundis$elm_bootstrap$Bootstrap$Grid$Col$xs12, $rundis$elm_bootstrap$Bootstrap$Grid$Col$lg8]),
								_List_fromArray(
									[
										A2(
										$rundis$elm_bootstrap$Bootstrap$Form$row,
										_List_fromArray(
											[
												$rundis$elm_bootstrap$Bootstrap$Grid$Row$attrs(
												_List_fromArray(
													[
														$rundis$elm_bootstrap$Bootstrap$Utilities$Spacing$m1,
														$rundis$elm_bootstrap$Bootstrap$Utilities$Spacing$p0,
														A2($elm$html$Html$Attributes$style, 'text-align', 'right')
													]))
											]),
										_List_fromArray(
											[
												A2(
												$rundis$elm_bootstrap$Bootstrap$Form$col,
												_List_fromArray(
													[
														$rundis$elm_bootstrap$Bootstrap$Grid$Col$attrs(
														_List_fromArray(
															[$rundis$elm_bootstrap$Bootstrap$Utilities$Spacing$m1, $rundis$elm_bootstrap$Bootstrap$Utilities$Spacing$p0]))
													]),
												_List_fromArray(
													[
														A2(
														$rundis$elm_bootstrap$Bootstrap$Form$label,
														_List_fromArray(
															[$rundis$elm_bootstrap$Bootstrap$Utilities$Spacing$m0, $rundis$elm_bootstrap$Bootstrap$Utilities$Spacing$p0]),
														_List_fromArray(
															[
																$elm$html$Html$text('High Score')
															])),
														$rundis$elm_bootstrap$Bootstrap$Form$Input$number(
														_List_fromArray(
															[
																$rundis$elm_bootstrap$Bootstrap$Form$Input$value(
																function () {
																	var score_size = A2(
																		$elm$core$Maybe$withDefault,
																		50,
																		$elm$core$String$toInt(model.inputRecordParam.scoreSize));
																	var list = A2($elm$core$List$take, score_size, model.scoreRecord);
																	return $elm$core$String$fromInt(
																		A2(
																			$elm$core$Maybe$withDefault,
																			0,
																			$elm$core$List$maximum(list)));
																}()),
																$rundis$elm_bootstrap$Bootstrap$Form$Input$small,
																$rundis$elm_bootstrap$Bootstrap$Form$Input$plainText(true),
																$rundis$elm_bootstrap$Bootstrap$Form$Input$attrs(
																_List_fromArray(
																	[
																		$rundis$elm_bootstrap$Bootstrap$Utilities$Spacing$m1,
																		$rundis$elm_bootstrap$Bootstrap$Utilities$Spacing$p1,
																		A2($elm$html$Html$Attributes$style, 'text-align', 'right')
																	]))
															]))
													])),
												A2(
												$rundis$elm_bootstrap$Bootstrap$Form$col,
												_List_fromArray(
													[
														$rundis$elm_bootstrap$Bootstrap$Grid$Col$attrs(
														_List_fromArray(
															[$rundis$elm_bootstrap$Bootstrap$Utilities$Spacing$m1, $rundis$elm_bootstrap$Bootstrap$Utilities$Spacing$p0]))
													]),
												_List_fromArray(
													[
														A2(
														$rundis$elm_bootstrap$Bootstrap$Form$label,
														_List_fromArray(
															[$rundis$elm_bootstrap$Bootstrap$Utilities$Spacing$m0, $rundis$elm_bootstrap$Bootstrap$Utilities$Spacing$p0]),
														_List_fromArray(
															[
																$elm$html$Html$text('Average')
															])),
														$rundis$elm_bootstrap$Bootstrap$Form$Input$number(
														_List_fromArray(
															[
																$rundis$elm_bootstrap$Bootstrap$Form$Input$small,
																$rundis$elm_bootstrap$Bootstrap$Form$Input$value(
																function () {
																	var score_size = A2(
																		$elm$core$Maybe$withDefault,
																		50,
																		$elm$core$String$toInt(model.inputRecordParam.scoreSize));
																	return A2($author$project$Main$average, model.scoreRecord, score_size);
																}()),
																$rundis$elm_bootstrap$Bootstrap$Form$Input$plainText(true),
																$rundis$elm_bootstrap$Bootstrap$Form$Input$attrs(
																_List_fromArray(
																	[
																		$rundis$elm_bootstrap$Bootstrap$Utilities$Spacing$m1,
																		$rundis$elm_bootstrap$Bootstrap$Utilities$Spacing$p1,
																		A2($elm$html$Html$Attributes$style, 'text-align', 'right')
																	]))
															]))
													]))
											]))
									]))
							]))),
					$rundis$elm_bootstrap$Bootstrap$Card$Block$custom(
					A2(
						$rundis$elm_bootstrap$Bootstrap$Grid$row,
						_List_fromArray(
							[$rundis$elm_bootstrap$Bootstrap$Grid$Row$centerXs]),
						_List_fromArray(
							[
								A2(
								$rundis$elm_bootstrap$Bootstrap$Grid$col,
								_List_fromArray(
									[$rundis$elm_bootstrap$Bootstrap$Grid$Col$xs10, $rundis$elm_bootstrap$Bootstrap$Grid$Col$lg3]),
								_List_fromArray(
									[
										$author$project$Main$viewMyScores(model)
									]))
							])))
				]),
			$rundis$elm_bootstrap$Bootstrap$Card$config(_List_Nil)));
};
var $author$project$Main$Fnickname = {$: 'Fnickname'};
var $author$project$Main$RemoveToken = {$: 'RemoveToken'};
var $author$project$Main$UpdateUserInfo = {$: 'UpdateUserInfo'};
var $author$project$Main$viewMySetting = function (model) {
	return A2(
		$rundis$elm_bootstrap$Bootstrap$Grid$row,
		_List_fromArray(
			[$rundis$elm_bootstrap$Bootstrap$Grid$Row$centerXs]),
		_List_fromArray(
			[
				A2(
				$rundis$elm_bootstrap$Bootstrap$Grid$col,
				_List_fromArray(
					[$rundis$elm_bootstrap$Bootstrap$Grid$Col$xs12, $rundis$elm_bootstrap$Bootstrap$Grid$Col$lg8]),
				_List_fromArray(
					[
						$rundis$elm_bootstrap$Bootstrap$Card$view(
						A3(
							$rundis$elm_bootstrap$Bootstrap$Card$block,
							_List_fromArray(
								[
									$rundis$elm_bootstrap$Bootstrap$Card$Block$align($rundis$elm_bootstrap$Bootstrap$Text$alignXsRight)
								]),
							_List_fromArray(
								[
									A2(
									$rundis$elm_bootstrap$Bootstrap$Card$Block$link,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$href('/logout'),
											$elm$html$Html$Events$onClick($author$project$Main$RemoveToken),
											$elm$html$Html$Attributes$href('#')
										]),
									_List_fromArray(
										[
											$elm$html$Html$text('Log out')
										]))
								]),
							A3(
								$rundis$elm_bootstrap$Bootstrap$Card$block,
								_List_fromArray(
									[
										$rundis$elm_bootstrap$Bootstrap$Card$Block$align($rundis$elm_bootstrap$Bootstrap$Text$alignXsRight)
									]),
								_List_fromArray(
									[
										A2(
										$rundis$elm_bootstrap$Bootstrap$Card$Block$link,
										_List_fromArray(
											[
												$elm$html$Html$Events$onClick($author$project$Main$NoOp),
												$elm$html$Html$Attributes$href('#')
											]),
										_List_fromArray(
											[
												$elm$html$Html$text('Leave current event')
											]))
									]),
								A3(
									$rundis$elm_bootstrap$Bootstrap$Card$block,
									_List_fromArray(
										[
											$rundis$elm_bootstrap$Bootstrap$Card$Block$align($rundis$elm_bootstrap$Bootstrap$Text$alignXsRight)
										]),
									_List_fromArray(
										[
											A2(
											$rundis$elm_bootstrap$Bootstrap$Card$Block$link,
											_List_fromArray(
												[
													$elm$html$Html$Events$onClick($author$project$Main$NoOp),
													$elm$html$Html$Attributes$href('#')
												]),
											_List_fromArray(
												[
													$elm$html$Html$text('Change password')
												]))
										]),
									A3(
										$rundis$elm_bootstrap$Bootstrap$Card$block,
										_List_Nil,
										_List_fromArray(
											[
												A2(
												$rundis$elm_bootstrap$Bootstrap$Card$Block$titleH4,
												_List_Nil,
												_List_fromArray(
													[
														$elm$html$Html$text('User Settings')
													])),
												$rundis$elm_bootstrap$Bootstrap$Card$Block$custom(
												A2(
													$rundis$elm_bootstrap$Bootstrap$Grid$row,
													_List_fromArray(
														[$rundis$elm_bootstrap$Bootstrap$Grid$Row$leftLg]),
													_List_fromArray(
														[
															A2(
															$rundis$elm_bootstrap$Bootstrap$Grid$col,
															_List_fromArray(
																[$rundis$elm_bootstrap$Bootstrap$Grid$Col$xs8, $rundis$elm_bootstrap$Bootstrap$Grid$Col$lg4]),
															_List_fromArray(
																[
																	A2(
																	$rundis$elm_bootstrap$Bootstrap$Form$form,
																	_List_fromArray(
																		[$rundis$elm_bootstrap$Bootstrap$Utilities$Spacing$mb3]),
																	_List_fromArray(
																		[
																			A2(
																			$rundis$elm_bootstrap$Bootstrap$Form$label,
																			_List_Nil,
																			_List_fromArray(
																				[
																					$elm$html$Html$text('User ID')
																				])),
																			$rundis$elm_bootstrap$Bootstrap$Form$Input$text(
																			_List_fromArray(
																				[
																					$rundis$elm_bootstrap$Bootstrap$Form$Input$value(model.userInfo.user_id),
																					$rundis$elm_bootstrap$Bootstrap$Form$Input$small,
																					$rundis$elm_bootstrap$Bootstrap$Form$Input$attrs(
																					_List_fromArray(
																						[
																							A2($elm$html$Html$Attributes$style, 'background-color', '#FFF')
																						])),
																					$rundis$elm_bootstrap$Bootstrap$Form$Input$readonly(true)
																				]))
																		]))
																])),
															A2(
															$rundis$elm_bootstrap$Bootstrap$Grid$col,
															_List_fromArray(
																[$rundis$elm_bootstrap$Bootstrap$Grid$Col$xs8, $rundis$elm_bootstrap$Bootstrap$Grid$Col$lg4]),
															_List_fromArray(
																[
																	A2(
																	$rundis$elm_bootstrap$Bootstrap$Form$form,
																	_List_fromArray(
																		[$rundis$elm_bootstrap$Bootstrap$Utilities$Spacing$mb3]),
																	_List_fromArray(
																		[
																			A2(
																			$rundis$elm_bootstrap$Bootstrap$Form$label,
																			_List_Nil,
																			_List_fromArray(
																				[
																					$elm$html$Html$text('Nickname')
																				])),
																			$rundis$elm_bootstrap$Bootstrap$Form$Input$text(
																			_List_fromArray(
																				[
																					$rundis$elm_bootstrap$Bootstrap$Form$Input$placeholder(model.userInfo.nickname),
																					$rundis$elm_bootstrap$Bootstrap$Form$Input$small,
																					$rundis$elm_bootstrap$Bootstrap$Form$Input$value(model.inputCred.nickname),
																					$rundis$elm_bootstrap$Bootstrap$Form$Input$onInput(
																					$author$project$Main$FormInput($author$project$Main$Fnickname))
																				]))
																		]))
																])),
															A2(
															$rundis$elm_bootstrap$Bootstrap$Grid$col,
															_List_fromArray(
																[$rundis$elm_bootstrap$Bootstrap$Grid$Col$xs8, $rundis$elm_bootstrap$Bootstrap$Grid$Col$lg4]),
															_List_fromArray(
																[
																	A2(
																	$rundis$elm_bootstrap$Bootstrap$Form$form,
																	_List_fromArray(
																		[$rundis$elm_bootstrap$Bootstrap$Utilities$Spacing$mb3]),
																	_List_fromArray(
																		[
																			A2(
																			$rundis$elm_bootstrap$Bootstrap$Form$label,
																			_List_Nil,
																			_List_fromArray(
																				[
																					$elm$html$Html$text('Password')
																				])),
																			$rundis$elm_bootstrap$Bootstrap$Form$Input$password(
																			_List_fromArray(
																				[
																					$rundis$elm_bootstrap$Bootstrap$Form$Input$placeholder('Password'),
																					$rundis$elm_bootstrap$Bootstrap$Form$Input$small,
																					$rundis$elm_bootstrap$Bootstrap$Form$Input$value(model.inputCred.password),
																					$rundis$elm_bootstrap$Bootstrap$Form$Input$onInput(
																					$author$project$Main$FormInput($author$project$Main$Fpass))
																				]))
																		]))
																])),
															A2(
															$rundis$elm_bootstrap$Bootstrap$Grid$col,
															_List_fromArray(
																[$rundis$elm_bootstrap$Bootstrap$Grid$Col$xs8, $rundis$elm_bootstrap$Bootstrap$Grid$Col$lg4, $rundis$elm_bootstrap$Bootstrap$Grid$Col$bottomLg]),
															_List_fromArray(
																[
																	A2(
																	$rundis$elm_bootstrap$Bootstrap$Button$button,
																	_List_fromArray(
																		[
																			$rundis$elm_bootstrap$Bootstrap$Button$attrs(
																			_List_fromArray(
																				[$rundis$elm_bootstrap$Bootstrap$Utilities$Spacing$mb3])),
																			$rundis$elm_bootstrap$Bootstrap$Button$primary,
																			$rundis$elm_bootstrap$Bootstrap$Button$onClick($author$project$Main$UpdateUserInfo)
																		]),
																	_List_fromArray(
																		[
																			$elm$html$Html$text('Update')
																		]))
																]))
														]))),
												A2(
												$rundis$elm_bootstrap$Bootstrap$Card$Block$text,
												_List_Nil,
												_List_fromArray(
													[
														$elm$html$Html$text(model.statusReason)
													]))
											]),
										$rundis$elm_bootstrap$Bootstrap$Card$config(_List_Nil))))))
					]))
			]));
};
var $author$project$Main$viewMyPage = function (model) {
	return A2(
		$rundis$elm_bootstrap$Bootstrap$Grid$container,
		_List_fromArray(
			[
				A2($elm$html$Html$Attributes$style, 'margin-top', '4rem'),
				A2($elm$html$Html$Attributes$style, 'margin-bottom', '3rem')
			]),
		_List_fromArray(
			[
				$rundis$elm_bootstrap$Bootstrap$CDN$stylesheet,
				$author$project$Main$myPageNavbar(model),
				function () {
				var _v0 = model.myPageState;
				switch (_v0.$) {
					case 'Personal':
						return $author$project$Main$viewMyData(model);
					case 'Event':
						return $author$project$Main$viewHistory(model);
					default:
						return $author$project$Main$viewMySetting(model);
				}
			}()
			]));
};
var $author$project$Main$Fpass2 = {$: 'Fpass2'};
var $author$project$Main$Register = {$: 'Register'};
var $rundis$elm_bootstrap$Bootstrap$Grid$ColBreak = function (a) {
	return {$: 'ColBreak', a: a};
};
var $rundis$elm_bootstrap$Bootstrap$Grid$colBreak = function (attributes) {
	return $rundis$elm_bootstrap$Bootstrap$Grid$ColBreak(
		A2(
			$elm$html$Html$div,
			_Utils_ap(
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('w-100')
					]),
				attributes),
			_List_Nil));
};
var $rundis$elm_bootstrap$Bootstrap$Grid$Col$lg12 = A2($rundis$elm_bootstrap$Bootstrap$Grid$Internal$width, $rundis$elm_bootstrap$Bootstrap$General$Internal$LG, $rundis$elm_bootstrap$Bootstrap$Grid$Internal$Col12);
var $author$project$Main$viewRegister = function (model) {
	var myStyle = A2($elm$html$Html$Attributes$style, 'height', '5px');
	return A2(
		$rundis$elm_bootstrap$Bootstrap$Grid$container,
		_List_Nil,
		_List_fromArray(
			[
				$rundis$elm_bootstrap$Bootstrap$CDN$stylesheet,
				A2(
				$rundis$elm_bootstrap$Bootstrap$Grid$row,
				_List_fromArray(
					[$rundis$elm_bootstrap$Bootstrap$Grid$Row$centerXs]),
				_List_fromArray(
					[
						A2(
						$rundis$elm_bootstrap$Bootstrap$Grid$col,
						_List_fromArray(
							[$rundis$elm_bootstrap$Bootstrap$Grid$Col$xs12, $rundis$elm_bootstrap$Bootstrap$Grid$Col$lg8]),
						_List_fromArray(
							[
								$rundis$elm_bootstrap$Bootstrap$Card$view(
								A3(
									$rundis$elm_bootstrap$Bootstrap$Card$block,
									_List_Nil,
									_List_fromArray(
										[
											A2(
											$rundis$elm_bootstrap$Bootstrap$Card$Block$text,
											_List_Nil,
											_List_fromArray(
												[
													$elm$html$Html$text(
													$author$project$Main$showLoginStatus(model.loginStatus))
												])),
											A2(
											$rundis$elm_bootstrap$Bootstrap$Card$Block$text,
											_List_Nil,
											_List_fromArray(
												[
													$elm$html$Html$text(model.statusReason)
												]))
										]),
									A3(
										$rundis$elm_bootstrap$Bootstrap$Card$block,
										_List_fromArray(
											[
												$rundis$elm_bootstrap$Bootstrap$Card$Block$align($rundis$elm_bootstrap$Bootstrap$Text$alignXsRight)
											]),
										_List_fromArray(
											[
												A2(
												$rundis$elm_bootstrap$Bootstrap$Card$Block$link,
												_List_fromArray(
													[
														$elm$html$Html$Attributes$href('#'),
														$elm$html$Html$Events$onClick($author$project$Main$ToggleRegister)
													]),
												_List_fromArray(
													[
														$elm$html$Html$text('Login')
													]))
											]),
										A3(
											$rundis$elm_bootstrap$Bootstrap$Card$block,
											_List_Nil,
											_List_fromArray(
												[
													A2(
													$rundis$elm_bootstrap$Bootstrap$Card$Block$titleH4,
													_List_Nil,
													_List_fromArray(
														[
															$elm$html$Html$text('Register Form')
														])),
													$rundis$elm_bootstrap$Bootstrap$Card$Block$custom(
													A2(
														$rundis$elm_bootstrap$Bootstrap$Grid$container,
														_List_Nil,
														_List_fromArray(
															[
																A2(
																$rundis$elm_bootstrap$Bootstrap$Grid$row,
																_List_Nil,
																_List_fromArray(
																	[
																		A2(
																		$rundis$elm_bootstrap$Bootstrap$Grid$col,
																		_List_fromArray(
																			[$rundis$elm_bootstrap$Bootstrap$Grid$Col$xs12, $rundis$elm_bootstrap$Bootstrap$Grid$Col$lg12]),
																		_List_fromArray(
																			[
																				$rundis$elm_bootstrap$Bootstrap$Form$Input$text(
																				_List_fromArray(
																					[
																						$rundis$elm_bootstrap$Bootstrap$Form$Input$attrs(
																						_List_fromArray(
																							[
																								$elm$html$Html$Attributes$placeholder('User ID')
																							])),
																						$rundis$elm_bootstrap$Bootstrap$Form$Input$value(model.inputCred.user_id),
																						$rundis$elm_bootstrap$Bootstrap$Form$Input$onInput(
																						$author$project$Main$FormInput($author$project$Main$Fuser_id))
																					]))
																			])),
																		$rundis$elm_bootstrap$Bootstrap$Grid$colBreak(_List_Nil),
																		A2(
																		$rundis$elm_bootstrap$Bootstrap$Grid$col,
																		_List_Nil,
																		_List_fromArray(
																			[
																				A2(
																				$elm$html$Html$div,
																				_List_fromArray(
																					[myStyle]),
																				_List_Nil)
																			]))
																	])),
																A2(
																$rundis$elm_bootstrap$Bootstrap$Grid$row,
																_List_Nil,
																_List_fromArray(
																	[
																		A2(
																		$rundis$elm_bootstrap$Bootstrap$Grid$col,
																		_List_fromArray(
																			[$rundis$elm_bootstrap$Bootstrap$Grid$Col$xs12, $rundis$elm_bootstrap$Bootstrap$Grid$Col$lg12]),
																		_List_fromArray(
																			[
																				$rundis$elm_bootstrap$Bootstrap$Form$Input$password(
																				_List_fromArray(
																					[
																						$rundis$elm_bootstrap$Bootstrap$Form$Input$attrs(
																						_List_fromArray(
																							[
																								$elm$html$Html$Attributes$placeholder('Password')
																							])),
																						$rundis$elm_bootstrap$Bootstrap$Form$Input$value(model.inputCred.password),
																						$rundis$elm_bootstrap$Bootstrap$Form$Input$onInput(
																						$author$project$Main$FormInput($author$project$Main$Fpass))
																					]))
																			])),
																		$rundis$elm_bootstrap$Bootstrap$Grid$colBreak(_List_Nil),
																		A2(
																		$rundis$elm_bootstrap$Bootstrap$Grid$col,
																		_List_Nil,
																		_List_fromArray(
																			[
																				A2(
																				$elm$html$Html$div,
																				_List_fromArray(
																					[myStyle]),
																				_List_Nil)
																			]))
																	])),
																A2(
																$rundis$elm_bootstrap$Bootstrap$Grid$row,
																_List_Nil,
																_List_fromArray(
																	[
																		A2(
																		$rundis$elm_bootstrap$Bootstrap$Grid$col,
																		_List_fromArray(
																			[$rundis$elm_bootstrap$Bootstrap$Grid$Col$xs12, $rundis$elm_bootstrap$Bootstrap$Grid$Col$lg12]),
																		_List_fromArray(
																			[
																				$rundis$elm_bootstrap$Bootstrap$Form$Input$password(
																				_List_fromArray(
																					[
																						$rundis$elm_bootstrap$Bootstrap$Form$Input$attrs(
																						_List_fromArray(
																							[
																								$elm$html$Html$Attributes$placeholder('Retype password for confirmation')
																							])),
																						$rundis$elm_bootstrap$Bootstrap$Form$Input$value(model.inputCred.password2),
																						$rundis$elm_bootstrap$Bootstrap$Form$Input$onInput(
																						$author$project$Main$FormInput($author$project$Main$Fpass2))
																					]))
																			])),
																		$rundis$elm_bootstrap$Bootstrap$Grid$colBreak(_List_Nil),
																		A2(
																		$rundis$elm_bootstrap$Bootstrap$Grid$col,
																		_List_Nil,
																		_List_fromArray(
																			[
																				A2(
																				$elm$html$Html$div,
																				_List_fromArray(
																					[myStyle]),
																				_List_Nil)
																			]))
																	])),
																A2(
																$rundis$elm_bootstrap$Bootstrap$Grid$row,
																_List_Nil,
																_List_fromArray(
																	[
																		A2(
																		$rundis$elm_bootstrap$Bootstrap$Grid$col,
																		_List_fromArray(
																			[$rundis$elm_bootstrap$Bootstrap$Grid$Col$xs12, $rundis$elm_bootstrap$Bootstrap$Grid$Col$lg12]),
																		_List_fromArray(
																			[
																				$rundis$elm_bootstrap$Bootstrap$Form$Input$text(
																				_List_fromArray(
																					[
																						$rundis$elm_bootstrap$Bootstrap$Form$Input$attrs(
																						_List_fromArray(
																							[
																								$elm$html$Html$Attributes$placeholder('ジェイソン')
																							])),
																						$rundis$elm_bootstrap$Bootstrap$Form$Input$value(model.inputCred.nickname),
																						$rundis$elm_bootstrap$Bootstrap$Form$Input$onInput(
																						$author$project$Main$FormInput($author$project$Main$Fnickname))
																					]))
																			])),
																		$rundis$elm_bootstrap$Bootstrap$Grid$colBreak(_List_Nil),
																		A2(
																		$rundis$elm_bootstrap$Bootstrap$Grid$col,
																		_List_Nil,
																		_List_fromArray(
																			[
																				A2(
																				$elm$html$Html$div,
																				_List_fromArray(
																					[myStyle]),
																				_List_Nil)
																			]))
																	])),
																A2(
																$rundis$elm_bootstrap$Bootstrap$Grid$row,
																_List_Nil,
																_List_fromArray(
																	[
																		A2(
																		$rundis$elm_bootstrap$Bootstrap$Grid$col,
																		_List_fromArray(
																			[$rundis$elm_bootstrap$Bootstrap$Grid$Col$xs6, $rundis$elm_bootstrap$Bootstrap$Grid$Col$lg4]),
																		_List_fromArray(
																			[
																				A2(
																				$rundis$elm_bootstrap$Bootstrap$Button$button,
																				_List_fromArray(
																					[
																						$rundis$elm_bootstrap$Bootstrap$Button$primary,
																						$rundis$elm_bootstrap$Bootstrap$Button$onClick($author$project$Main$Register)
																					]),
																				_List_fromArray(
																					[
																						$elm$html$Html$text('Register')
																					]))
																			]))
																	]))
															])))
												]),
											$rundis$elm_bootstrap$Bootstrap$Card$config(_List_Nil)))))
							]))
					]))
			]));
};
var $author$project$Main$view = function (model) {
	var _v0 = model.tokenUserId;
	if (_v0.$ === 'Just') {
		var tn = _v0.a;
		var _v1 = model.myPageOpen;
		if (!_v1) {
			return {
				body: _List_fromArray(
					[
						A2($author$project$Main$viewMain, model, tn)
					]),
				title: 'BGC'
			};
		} else {
			return {
				body: _List_fromArray(
					[
						$author$project$Main$viewMyPage(model)
					]),
				title: 'BGC'
			};
		}
	} else {
		var _v2 = model.userRegister;
		if (!_v2) {
			return {
				body: _List_fromArray(
					[
						$author$project$Main$viewLogin(model)
					]),
				title: 'BGC'
			};
		} else {
			return {
				body: _List_fromArray(
					[
						$author$project$Main$viewRegister(model)
					]),
				title: 'BGC'
			};
		}
	}
};
var $author$project$Main$main = $elm$browser$Browser$application(
	{init: $author$project$Main$init, onUrlChange: $author$project$Main$UrlChanged, onUrlRequest: $author$project$Main$LinkClicked, subscriptions: $author$project$Main$subscriptions, update: $author$project$Main$update, view: $author$project$Main$view});
_Platform_export({'Main':{'init':$author$project$Main$main(
	$elm$json$Json$Decode$succeed(_Utils_Tuple0))(0)}});}(this));