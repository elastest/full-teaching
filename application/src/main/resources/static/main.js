(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./node_modules/core-js/es7/reflect.js":
/*!*********************************************!*\
  !*** ./node_modules/core-js/es7/reflect.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ../modules/es7.reflect.define-metadata */ "./node_modules/core-js/modules/es7.reflect.define-metadata.js");
__webpack_require__(/*! ../modules/es7.reflect.delete-metadata */ "./node_modules/core-js/modules/es7.reflect.delete-metadata.js");
__webpack_require__(/*! ../modules/es7.reflect.get-metadata */ "./node_modules/core-js/modules/es7.reflect.get-metadata.js");
__webpack_require__(/*! ../modules/es7.reflect.get-metadata-keys */ "./node_modules/core-js/modules/es7.reflect.get-metadata-keys.js");
__webpack_require__(/*! ../modules/es7.reflect.get-own-metadata */ "./node_modules/core-js/modules/es7.reflect.get-own-metadata.js");
__webpack_require__(/*! ../modules/es7.reflect.get-own-metadata-keys */ "./node_modules/core-js/modules/es7.reflect.get-own-metadata-keys.js");
__webpack_require__(/*! ../modules/es7.reflect.has-metadata */ "./node_modules/core-js/modules/es7.reflect.has-metadata.js");
__webpack_require__(/*! ../modules/es7.reflect.has-own-metadata */ "./node_modules/core-js/modules/es7.reflect.has-own-metadata.js");
__webpack_require__(/*! ../modules/es7.reflect.metadata */ "./node_modules/core-js/modules/es7.reflect.metadata.js");
module.exports = __webpack_require__(/*! ../modules/_core */ "./node_modules/core-js/modules/_core.js").Reflect;


/***/ }),

/***/ "./node_modules/core-js/modules/_a-function.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_a-function.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_an-instance.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_an-instance.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_an-object.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_an-object.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/core-js/modules/_is-object.js");
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_array-from-iterable.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/_array-from-iterable.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var forOf = __webpack_require__(/*! ./_for-of */ "./node_modules/core-js/modules/_for-of.js");

module.exports = function (iter, ITERATOR) {
  var result = [];
  forOf(iter, false, result.push, result, ITERATOR);
  return result;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_array-includes.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/_array-includes.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(/*! ./_to-iobject */ "./node_modules/core-js/modules/_to-iobject.js");
var toLength = __webpack_require__(/*! ./_to-length */ "./node_modules/core-js/modules/_to-length.js");
var toAbsoluteIndex = __webpack_require__(/*! ./_to-absolute-index */ "./node_modules/core-js/modules/_to-absolute-index.js");
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),

/***/ "./node_modules/core-js/modules/_array-methods.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/_array-methods.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 0 -> Array#forEach
// 1 -> Array#map
// 2 -> Array#filter
// 3 -> Array#some
// 4 -> Array#every
// 5 -> Array#find
// 6 -> Array#findIndex
var ctx = __webpack_require__(/*! ./_ctx */ "./node_modules/core-js/modules/_ctx.js");
var IObject = __webpack_require__(/*! ./_iobject */ "./node_modules/core-js/modules/_iobject.js");
var toObject = __webpack_require__(/*! ./_to-object */ "./node_modules/core-js/modules/_to-object.js");
var toLength = __webpack_require__(/*! ./_to-length */ "./node_modules/core-js/modules/_to-length.js");
var asc = __webpack_require__(/*! ./_array-species-create */ "./node_modules/core-js/modules/_array-species-create.js");
module.exports = function (TYPE, $create) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  var create = $create || asc;
  return function ($this, callbackfn, that) {
    var O = toObject($this);
    var self = IObject(O);
    var f = ctx(callbackfn, that, 3);
    var length = toLength(self.length);
    var index = 0;
    var result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
    var val, res;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      val = self[index];
      res = f(val, index, O);
      if (TYPE) {
        if (IS_MAP) result[index] = res;   // map
        else if (res) switch (TYPE) {
          case 3: return true;             // some
          case 5: return val;              // find
          case 6: return index;            // findIndex
          case 2: result.push(val);        // filter
        } else if (IS_EVERY) return false; // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
  };
};


/***/ }),

/***/ "./node_modules/core-js/modules/_array-species-constructor.js":
/*!********************************************************************!*\
  !*** ./node_modules/core-js/modules/_array-species-constructor.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/core-js/modules/_is-object.js");
var isArray = __webpack_require__(/*! ./_is-array */ "./node_modules/core-js/modules/_is-array.js");
var SPECIES = __webpack_require__(/*! ./_wks */ "./node_modules/core-js/modules/_wks.js")('species');

module.exports = function (original) {
  var C;
  if (isArray(original)) {
    C = original.constructor;
    // cross-realm fallback
    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
    if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return C === undefined ? Array : C;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_array-species-create.js":
/*!***************************************************************!*\
  !*** ./node_modules/core-js/modules/_array-species-create.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
var speciesConstructor = __webpack_require__(/*! ./_array-species-constructor */ "./node_modules/core-js/modules/_array-species-constructor.js");

module.exports = function (original, length) {
  return new (speciesConstructor(original))(length);
};


/***/ }),

/***/ "./node_modules/core-js/modules/_classof.js":
/*!**************************************************!*\
  !*** ./node_modules/core-js/modules/_classof.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(/*! ./_cof */ "./node_modules/core-js/modules/_cof.js");
var TAG = __webpack_require__(/*! ./_wks */ "./node_modules/core-js/modules/_wks.js")('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_cof.js":
/*!**********************************************!*\
  !*** ./node_modules/core-js/modules/_cof.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),

/***/ "./node_modules/core-js/modules/_collection-strong.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/_collection-strong.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var dP = __webpack_require__(/*! ./_object-dp */ "./node_modules/core-js/modules/_object-dp.js").f;
var create = __webpack_require__(/*! ./_object-create */ "./node_modules/core-js/modules/_object-create.js");
var redefineAll = __webpack_require__(/*! ./_redefine-all */ "./node_modules/core-js/modules/_redefine-all.js");
var ctx = __webpack_require__(/*! ./_ctx */ "./node_modules/core-js/modules/_ctx.js");
var anInstance = __webpack_require__(/*! ./_an-instance */ "./node_modules/core-js/modules/_an-instance.js");
var forOf = __webpack_require__(/*! ./_for-of */ "./node_modules/core-js/modules/_for-of.js");
var $iterDefine = __webpack_require__(/*! ./_iter-define */ "./node_modules/core-js/modules/_iter-define.js");
var step = __webpack_require__(/*! ./_iter-step */ "./node_modules/core-js/modules/_iter-step.js");
var setSpecies = __webpack_require__(/*! ./_set-species */ "./node_modules/core-js/modules/_set-species.js");
var DESCRIPTORS = __webpack_require__(/*! ./_descriptors */ "./node_modules/core-js/modules/_descriptors.js");
var fastKey = __webpack_require__(/*! ./_meta */ "./node_modules/core-js/modules/_meta.js").fastKey;
var validate = __webpack_require__(/*! ./_validate-collection */ "./node_modules/core-js/modules/_validate-collection.js");
var SIZE = DESCRIPTORS ? '_s' : 'size';

var getEntry = function (that, key) {
  // fast case
  var index = fastKey(key);
  var entry;
  if (index !== 'F') return that._i[index];
  // frozen object case
  for (entry = that._f; entry; entry = entry.n) {
    if (entry.k == key) return entry;
  }
};

module.exports = {
  getConstructor: function (wrapper, NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, NAME, '_i');
      that._t = NAME;         // collection type
      that._i = create(null); // index
      that._f = undefined;    // first entry
      that._l = undefined;    // last entry
      that[SIZE] = 0;         // size
      if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.1.3.1 Map.prototype.clear()
      // 23.2.3.2 Set.prototype.clear()
      clear: function clear() {
        for (var that = validate(this, NAME), data = that._i, entry = that._f; entry; entry = entry.n) {
          entry.r = true;
          if (entry.p) entry.p = entry.p.n = undefined;
          delete data[entry.i];
        }
        that._f = that._l = undefined;
        that[SIZE] = 0;
      },
      // 23.1.3.3 Map.prototype.delete(key)
      // 23.2.3.4 Set.prototype.delete(value)
      'delete': function (key) {
        var that = validate(this, NAME);
        var entry = getEntry(that, key);
        if (entry) {
          var next = entry.n;
          var prev = entry.p;
          delete that._i[entry.i];
          entry.r = true;
          if (prev) prev.n = next;
          if (next) next.p = prev;
          if (that._f == entry) that._f = next;
          if (that._l == entry) that._l = prev;
          that[SIZE]--;
        } return !!entry;
      },
      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
      forEach: function forEach(callbackfn /* , that = undefined */) {
        validate(this, NAME);
        var f = ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
        var entry;
        while (entry = entry ? entry.n : this._f) {
          f(entry.v, entry.k, this);
          // revert to the last existing entry
          while (entry && entry.r) entry = entry.p;
        }
      },
      // 23.1.3.7 Map.prototype.has(key)
      // 23.2.3.7 Set.prototype.has(value)
      has: function has(key) {
        return !!getEntry(validate(this, NAME), key);
      }
    });
    if (DESCRIPTORS) dP(C.prototype, 'size', {
      get: function () {
        return validate(this, NAME)[SIZE];
      }
    });
    return C;
  },
  def: function (that, key, value) {
    var entry = getEntry(that, key);
    var prev, index;
    // change existing entry
    if (entry) {
      entry.v = value;
    // create new entry
    } else {
      that._l = entry = {
        i: index = fastKey(key, true), // <- index
        k: key,                        // <- key
        v: value,                      // <- value
        p: prev = that._l,             // <- previous entry
        n: undefined,                  // <- next entry
        r: false                       // <- removed
      };
      if (!that._f) that._f = entry;
      if (prev) prev.n = entry;
      that[SIZE]++;
      // add to index
      if (index !== 'F') that._i[index] = entry;
    } return that;
  },
  getEntry: getEntry,
  setStrong: function (C, NAME, IS_MAP) {
    // add .keys, .values, .entries, [@@iterator]
    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
    $iterDefine(C, NAME, function (iterated, kind) {
      this._t = validate(iterated, NAME); // target
      this._k = kind;                     // kind
      this._l = undefined;                // previous
    }, function () {
      var that = this;
      var kind = that._k;
      var entry = that._l;
      // revert to the last existing entry
      while (entry && entry.r) entry = entry.p;
      // get next entry
      if (!that._t || !(that._l = entry = entry ? entry.n : that._t._f)) {
        // or finish the iteration
        that._t = undefined;
        return step(1);
      }
      // return step by kind
      if (kind == 'keys') return step(0, entry.k);
      if (kind == 'values') return step(0, entry.v);
      return step(0, [entry.k, entry.v]);
    }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);

    // add [@@species], 23.1.2.2, 23.2.2.2
    setSpecies(NAME);
  }
};


/***/ }),

/***/ "./node_modules/core-js/modules/_collection-weak.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/_collection-weak.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var redefineAll = __webpack_require__(/*! ./_redefine-all */ "./node_modules/core-js/modules/_redefine-all.js");
var getWeak = __webpack_require__(/*! ./_meta */ "./node_modules/core-js/modules/_meta.js").getWeak;
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/modules/_an-object.js");
var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/core-js/modules/_is-object.js");
var anInstance = __webpack_require__(/*! ./_an-instance */ "./node_modules/core-js/modules/_an-instance.js");
var forOf = __webpack_require__(/*! ./_for-of */ "./node_modules/core-js/modules/_for-of.js");
var createArrayMethod = __webpack_require__(/*! ./_array-methods */ "./node_modules/core-js/modules/_array-methods.js");
var $has = __webpack_require__(/*! ./_has */ "./node_modules/core-js/modules/_has.js");
var validate = __webpack_require__(/*! ./_validate-collection */ "./node_modules/core-js/modules/_validate-collection.js");
var arrayFind = createArrayMethod(5);
var arrayFindIndex = createArrayMethod(6);
var id = 0;

// fallback for uncaught frozen keys
var uncaughtFrozenStore = function (that) {
  return that._l || (that._l = new UncaughtFrozenStore());
};
var UncaughtFrozenStore = function () {
  this.a = [];
};
var findUncaughtFrozen = function (store, key) {
  return arrayFind(store.a, function (it) {
    return it[0] === key;
  });
};
UncaughtFrozenStore.prototype = {
  get: function (key) {
    var entry = findUncaughtFrozen(this, key);
    if (entry) return entry[1];
  },
  has: function (key) {
    return !!findUncaughtFrozen(this, key);
  },
  set: function (key, value) {
    var entry = findUncaughtFrozen(this, key);
    if (entry) entry[1] = value;
    else this.a.push([key, value]);
  },
  'delete': function (key) {
    var index = arrayFindIndex(this.a, function (it) {
      return it[0] === key;
    });
    if (~index) this.a.splice(index, 1);
    return !!~index;
  }
};

module.exports = {
  getConstructor: function (wrapper, NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, NAME, '_i');
      that._t = NAME;      // collection type
      that._i = id++;      // collection id
      that._l = undefined; // leak store for uncaught frozen objects
      if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.3.3.2 WeakMap.prototype.delete(key)
      // 23.4.3.3 WeakSet.prototype.delete(value)
      'delete': function (key) {
        if (!isObject(key)) return false;
        var data = getWeak(key);
        if (data === true) return uncaughtFrozenStore(validate(this, NAME))['delete'](key);
        return data && $has(data, this._i) && delete data[this._i];
      },
      // 23.3.3.4 WeakMap.prototype.has(key)
      // 23.4.3.4 WeakSet.prototype.has(value)
      has: function has(key) {
        if (!isObject(key)) return false;
        var data = getWeak(key);
        if (data === true) return uncaughtFrozenStore(validate(this, NAME)).has(key);
        return data && $has(data, this._i);
      }
    });
    return C;
  },
  def: function (that, key, value) {
    var data = getWeak(anObject(key), true);
    if (data === true) uncaughtFrozenStore(that).set(key, value);
    else data[that._i] = value;
    return that;
  },
  ufstore: uncaughtFrozenStore
};


/***/ }),

/***/ "./node_modules/core-js/modules/_collection.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_collection.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(/*! ./_global */ "./node_modules/core-js/modules/_global.js");
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var redefine = __webpack_require__(/*! ./_redefine */ "./node_modules/core-js/modules/_redefine.js");
var redefineAll = __webpack_require__(/*! ./_redefine-all */ "./node_modules/core-js/modules/_redefine-all.js");
var meta = __webpack_require__(/*! ./_meta */ "./node_modules/core-js/modules/_meta.js");
var forOf = __webpack_require__(/*! ./_for-of */ "./node_modules/core-js/modules/_for-of.js");
var anInstance = __webpack_require__(/*! ./_an-instance */ "./node_modules/core-js/modules/_an-instance.js");
var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/core-js/modules/_is-object.js");
var fails = __webpack_require__(/*! ./_fails */ "./node_modules/core-js/modules/_fails.js");
var $iterDetect = __webpack_require__(/*! ./_iter-detect */ "./node_modules/core-js/modules/_iter-detect.js");
var setToStringTag = __webpack_require__(/*! ./_set-to-string-tag */ "./node_modules/core-js/modules/_set-to-string-tag.js");
var inheritIfRequired = __webpack_require__(/*! ./_inherit-if-required */ "./node_modules/core-js/modules/_inherit-if-required.js");

module.exports = function (NAME, wrapper, methods, common, IS_MAP, IS_WEAK) {
  var Base = global[NAME];
  var C = Base;
  var ADDER = IS_MAP ? 'set' : 'add';
  var proto = C && C.prototype;
  var O = {};
  var fixMethod = function (KEY) {
    var fn = proto[KEY];
    redefine(proto, KEY,
      KEY == 'delete' ? function (a) {
        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'has' ? function has(a) {
        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'get' ? function get(a) {
        return IS_WEAK && !isObject(a) ? undefined : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'add' ? function add(a) { fn.call(this, a === 0 ? 0 : a); return this; }
        : function set(a, b) { fn.call(this, a === 0 ? 0 : a, b); return this; }
    );
  };
  if (typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails(function () {
    new C().entries().next();
  }))) {
    // create collection constructor
    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
    redefineAll(C.prototype, methods);
    meta.NEED = true;
  } else {
    var instance = new C();
    // early implementations not supports chaining
    var HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance;
    // V8 ~  Chromium 40- weak-collections throws on primitives, but should return false
    var THROWS_ON_PRIMITIVES = fails(function () { instance.has(1); });
    // most early implementations doesn't supports iterables, most modern - not close it correctly
    var ACCEPT_ITERABLES = $iterDetect(function (iter) { new C(iter); }); // eslint-disable-line no-new
    // for early implementations -0 and +0 not the same
    var BUGGY_ZERO = !IS_WEAK && fails(function () {
      // V8 ~ Chromium 42- fails only with 5+ elements
      var $instance = new C();
      var index = 5;
      while (index--) $instance[ADDER](index, index);
      return !$instance.has(-0);
    });
    if (!ACCEPT_ITERABLES) {
      C = wrapper(function (target, iterable) {
        anInstance(target, C, NAME);
        var that = inheritIfRequired(new Base(), target, C);
        if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
        return that;
      });
      C.prototype = proto;
      proto.constructor = C;
    }
    if (THROWS_ON_PRIMITIVES || BUGGY_ZERO) {
      fixMethod('delete');
      fixMethod('has');
      IS_MAP && fixMethod('get');
    }
    if (BUGGY_ZERO || HASNT_CHAINING) fixMethod(ADDER);
    // weak collections should not contains .clear method
    if (IS_WEAK && proto.clear) delete proto.clear;
  }

  setToStringTag(C, NAME);

  O[NAME] = C;
  $export($export.G + $export.W + $export.F * (C != Base), O);

  if (!IS_WEAK) common.setStrong(C, NAME, IS_MAP);

  return C;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_core.js":
/*!***********************************************!*\
  !*** ./node_modules/core-js/modules/_core.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var core = module.exports = { version: '2.6.4' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),

/***/ "./node_modules/core-js/modules/_ctx.js":
/*!**********************************************!*\
  !*** ./node_modules/core-js/modules/_ctx.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(/*! ./_a-function */ "./node_modules/core-js/modules/_a-function.js");
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),

/***/ "./node_modules/core-js/modules/_defined.js":
/*!**************************************************!*\
  !*** ./node_modules/core-js/modules/_defined.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_descriptors.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_descriptors.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(/*! ./_fails */ "./node_modules/core-js/modules/_fails.js")(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "./node_modules/core-js/modules/_dom-create.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_dom-create.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/core-js/modules/_is-object.js");
var document = __webpack_require__(/*! ./_global */ "./node_modules/core-js/modules/_global.js").document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),

/***/ "./node_modules/core-js/modules/_enum-bug-keys.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/_enum-bug-keys.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),

/***/ "./node_modules/core-js/modules/_export.js":
/*!*************************************************!*\
  !*** ./node_modules/core-js/modules/_export.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ./_global */ "./node_modules/core-js/modules/_global.js");
var core = __webpack_require__(/*! ./_core */ "./node_modules/core-js/modules/_core.js");
var hide = __webpack_require__(/*! ./_hide */ "./node_modules/core-js/modules/_hide.js");
var redefine = __webpack_require__(/*! ./_redefine */ "./node_modules/core-js/modules/_redefine.js");
var ctx = __webpack_require__(/*! ./_ctx */ "./node_modules/core-js/modules/_ctx.js");
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE];
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
  var key, own, out, exp;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // extend global
    if (target) redefine(target, key, out, type & $export.U);
    // export
    if (exports[key] != out) hide(exports, key, exp);
    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
  }
};
global.core = core;
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),

/***/ "./node_modules/core-js/modules/_fails.js":
/*!************************************************!*\
  !*** ./node_modules/core-js/modules/_fails.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),

/***/ "./node_modules/core-js/modules/_for-of.js":
/*!*************************************************!*\
  !*** ./node_modules/core-js/modules/_for-of.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(/*! ./_ctx */ "./node_modules/core-js/modules/_ctx.js");
var call = __webpack_require__(/*! ./_iter-call */ "./node_modules/core-js/modules/_iter-call.js");
var isArrayIter = __webpack_require__(/*! ./_is-array-iter */ "./node_modules/core-js/modules/_is-array-iter.js");
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/modules/_an-object.js");
var toLength = __webpack_require__(/*! ./_to-length */ "./node_modules/core-js/modules/_to-length.js");
var getIterFn = __webpack_require__(/*! ./core.get-iterator-method */ "./node_modules/core-js/modules/core.get-iterator-method.js");
var BREAK = {};
var RETURN = {};
var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
  var iterFn = ITERATOR ? function () { return iterable; } : getIterFn(iterable);
  var f = ctx(fn, that, entries ? 2 : 1);
  var index = 0;
  var length, step, iterator, result;
  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if (result === BREAK || result === RETURN) return result;
  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
    result = call(iterator, f, step.value, entries);
    if (result === BREAK || result === RETURN) return result;
  }
};
exports.BREAK = BREAK;
exports.RETURN = RETURN;


/***/ }),

/***/ "./node_modules/core-js/modules/_function-to-string.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/modules/_function-to-string.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./_shared */ "./node_modules/core-js/modules/_shared.js")('native-function-to-string', Function.toString);


/***/ }),

/***/ "./node_modules/core-js/modules/_global.js":
/*!*************************************************!*\
  !*** ./node_modules/core-js/modules/_global.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),

/***/ "./node_modules/core-js/modules/_has.js":
/*!**********************************************!*\
  !*** ./node_modules/core-js/modules/_has.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),

/***/ "./node_modules/core-js/modules/_hide.js":
/*!***********************************************!*\
  !*** ./node_modules/core-js/modules/_hide.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(/*! ./_object-dp */ "./node_modules/core-js/modules/_object-dp.js");
var createDesc = __webpack_require__(/*! ./_property-desc */ "./node_modules/core-js/modules/_property-desc.js");
module.exports = __webpack_require__(/*! ./_descriptors */ "./node_modules/core-js/modules/_descriptors.js") ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_html.js":
/*!***********************************************!*\
  !*** ./node_modules/core-js/modules/_html.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__(/*! ./_global */ "./node_modules/core-js/modules/_global.js").document;
module.exports = document && document.documentElement;


/***/ }),

/***/ "./node_modules/core-js/modules/_ie8-dom-define.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/_ie8-dom-define.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(/*! ./_descriptors */ "./node_modules/core-js/modules/_descriptors.js") && !__webpack_require__(/*! ./_fails */ "./node_modules/core-js/modules/_fails.js")(function () {
  return Object.defineProperty(__webpack_require__(/*! ./_dom-create */ "./node_modules/core-js/modules/_dom-create.js")('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "./node_modules/core-js/modules/_inherit-if-required.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/_inherit-if-required.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/core-js/modules/_is-object.js");
var setPrototypeOf = __webpack_require__(/*! ./_set-proto */ "./node_modules/core-js/modules/_set-proto.js").set;
module.exports = function (that, target, C) {
  var S = target.constructor;
  var P;
  if (S !== C && typeof S == 'function' && (P = S.prototype) !== C.prototype && isObject(P) && setPrototypeOf) {
    setPrototypeOf(that, P);
  } return that;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_iobject.js":
/*!**************************************************!*\
  !*** ./node_modules/core-js/modules/_iobject.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(/*! ./_cof */ "./node_modules/core-js/modules/_cof.js");
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),

/***/ "./node_modules/core-js/modules/_is-array-iter.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/_is-array-iter.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators = __webpack_require__(/*! ./_iterators */ "./node_modules/core-js/modules/_iterators.js");
var ITERATOR = __webpack_require__(/*! ./_wks */ "./node_modules/core-js/modules/_wks.js")('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};


/***/ }),

/***/ "./node_modules/core-js/modules/_is-array.js":
/*!***************************************************!*\
  !*** ./node_modules/core-js/modules/_is-array.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(/*! ./_cof */ "./node_modules/core-js/modules/_cof.js");
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};


/***/ }),

/***/ "./node_modules/core-js/modules/_is-object.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_is-object.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),

/***/ "./node_modules/core-js/modules/_iter-call.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_iter-call.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/modules/_an-object.js");
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};


/***/ }),

/***/ "./node_modules/core-js/modules/_iter-create.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_iter-create.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__(/*! ./_object-create */ "./node_modules/core-js/modules/_object-create.js");
var descriptor = __webpack_require__(/*! ./_property-desc */ "./node_modules/core-js/modules/_property-desc.js");
var setToStringTag = __webpack_require__(/*! ./_set-to-string-tag */ "./node_modules/core-js/modules/_set-to-string-tag.js");
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(/*! ./_hide */ "./node_modules/core-js/modules/_hide.js")(IteratorPrototype, __webpack_require__(/*! ./_wks */ "./node_modules/core-js/modules/_wks.js")('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),

/***/ "./node_modules/core-js/modules/_iter-define.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_iter-define.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(/*! ./_library */ "./node_modules/core-js/modules/_library.js");
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var redefine = __webpack_require__(/*! ./_redefine */ "./node_modules/core-js/modules/_redefine.js");
var hide = __webpack_require__(/*! ./_hide */ "./node_modules/core-js/modules/_hide.js");
var Iterators = __webpack_require__(/*! ./_iterators */ "./node_modules/core-js/modules/_iterators.js");
var $iterCreate = __webpack_require__(/*! ./_iter-create */ "./node_modules/core-js/modules/_iter-create.js");
var setToStringTag = __webpack_require__(/*! ./_set-to-string-tag */ "./node_modules/core-js/modules/_set-to-string-tag.js");
var getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ "./node_modules/core-js/modules/_object-gpo.js");
var ITERATOR = __webpack_require__(/*! ./_wks */ "./node_modules/core-js/modules/_wks.js")('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && typeof IteratorPrototype[ITERATOR] != 'function') hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_iter-detect.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_iter-detect.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR = __webpack_require__(/*! ./_wks */ "./node_modules/core-js/modules/_wks.js")('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () { throw 2; });
} catch (e) { /* empty */ }

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_iter-step.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_iter-step.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),

/***/ "./node_modules/core-js/modules/_iterators.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_iterators.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),

/***/ "./node_modules/core-js/modules/_library.js":
/*!**************************************************!*\
  !*** ./node_modules/core-js/modules/_library.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = false;


/***/ }),

/***/ "./node_modules/core-js/modules/_meta.js":
/*!***********************************************!*\
  !*** ./node_modules/core-js/modules/_meta.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var META = __webpack_require__(/*! ./_uid */ "./node_modules/core-js/modules/_uid.js")('meta');
var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/core-js/modules/_is-object.js");
var has = __webpack_require__(/*! ./_has */ "./node_modules/core-js/modules/_has.js");
var setDesc = __webpack_require__(/*! ./_object-dp */ "./node_modules/core-js/modules/_object-dp.js").f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !__webpack_require__(/*! ./_fails */ "./node_modules/core-js/modules/_fails.js")(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};


/***/ }),

/***/ "./node_modules/core-js/modules/_metadata.js":
/*!***************************************************!*\
  !*** ./node_modules/core-js/modules/_metadata.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Map = __webpack_require__(/*! ./es6.map */ "./node_modules/core-js/modules/es6.map.js");
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var shared = __webpack_require__(/*! ./_shared */ "./node_modules/core-js/modules/_shared.js")('metadata');
var store = shared.store || (shared.store = new (__webpack_require__(/*! ./es6.weak-map */ "./node_modules/core-js/modules/es6.weak-map.js"))());

var getOrCreateMetadataMap = function (target, targetKey, create) {
  var targetMetadata = store.get(target);
  if (!targetMetadata) {
    if (!create) return undefined;
    store.set(target, targetMetadata = new Map());
  }
  var keyMetadata = targetMetadata.get(targetKey);
  if (!keyMetadata) {
    if (!create) return undefined;
    targetMetadata.set(targetKey, keyMetadata = new Map());
  } return keyMetadata;
};
var ordinaryHasOwnMetadata = function (MetadataKey, O, P) {
  var metadataMap = getOrCreateMetadataMap(O, P, false);
  return metadataMap === undefined ? false : metadataMap.has(MetadataKey);
};
var ordinaryGetOwnMetadata = function (MetadataKey, O, P) {
  var metadataMap = getOrCreateMetadataMap(O, P, false);
  return metadataMap === undefined ? undefined : metadataMap.get(MetadataKey);
};
var ordinaryDefineOwnMetadata = function (MetadataKey, MetadataValue, O, P) {
  getOrCreateMetadataMap(O, P, true).set(MetadataKey, MetadataValue);
};
var ordinaryOwnMetadataKeys = function (target, targetKey) {
  var metadataMap = getOrCreateMetadataMap(target, targetKey, false);
  var keys = [];
  if (metadataMap) metadataMap.forEach(function (_, key) { keys.push(key); });
  return keys;
};
var toMetaKey = function (it) {
  return it === undefined || typeof it == 'symbol' ? it : String(it);
};
var exp = function (O) {
  $export($export.S, 'Reflect', O);
};

module.exports = {
  store: store,
  map: getOrCreateMetadataMap,
  has: ordinaryHasOwnMetadata,
  get: ordinaryGetOwnMetadata,
  set: ordinaryDefineOwnMetadata,
  keys: ordinaryOwnMetadataKeys,
  key: toMetaKey,
  exp: exp
};


/***/ }),

/***/ "./node_modules/core-js/modules/_object-assign.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/_object-assign.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var getKeys = __webpack_require__(/*! ./_object-keys */ "./node_modules/core-js/modules/_object-keys.js");
var gOPS = __webpack_require__(/*! ./_object-gops */ "./node_modules/core-js/modules/_object-gops.js");
var pIE = __webpack_require__(/*! ./_object-pie */ "./node_modules/core-js/modules/_object-pie.js");
var toObject = __webpack_require__(/*! ./_to-object */ "./node_modules/core-js/modules/_to-object.js");
var IObject = __webpack_require__(/*! ./_iobject */ "./node_modules/core-js/modules/_iobject.js");
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(/*! ./_fails */ "./node_modules/core-js/modules/_fails.js")(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
  } return T;
} : $assign;


/***/ }),

/***/ "./node_modules/core-js/modules/_object-create.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/_object-create.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/modules/_an-object.js");
var dPs = __webpack_require__(/*! ./_object-dps */ "./node_modules/core-js/modules/_object-dps.js");
var enumBugKeys = __webpack_require__(/*! ./_enum-bug-keys */ "./node_modules/core-js/modules/_enum-bug-keys.js");
var IE_PROTO = __webpack_require__(/*! ./_shared-key */ "./node_modules/core-js/modules/_shared-key.js")('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(/*! ./_dom-create */ "./node_modules/core-js/modules/_dom-create.js")('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(/*! ./_html */ "./node_modules/core-js/modules/_html.js").appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),

/***/ "./node_modules/core-js/modules/_object-dp.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_object-dp.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/modules/_an-object.js");
var IE8_DOM_DEFINE = __webpack_require__(/*! ./_ie8-dom-define */ "./node_modules/core-js/modules/_ie8-dom-define.js");
var toPrimitive = __webpack_require__(/*! ./_to-primitive */ "./node_modules/core-js/modules/_to-primitive.js");
var dP = Object.defineProperty;

exports.f = __webpack_require__(/*! ./_descriptors */ "./node_modules/core-js/modules/_descriptors.js") ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_object-dps.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_object-dps.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(/*! ./_object-dp */ "./node_modules/core-js/modules/_object-dp.js");
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/modules/_an-object.js");
var getKeys = __webpack_require__(/*! ./_object-keys */ "./node_modules/core-js/modules/_object-keys.js");

module.exports = __webpack_require__(/*! ./_descriptors */ "./node_modules/core-js/modules/_descriptors.js") ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_object-gopd.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_object-gopd.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__(/*! ./_object-pie */ "./node_modules/core-js/modules/_object-pie.js");
var createDesc = __webpack_require__(/*! ./_property-desc */ "./node_modules/core-js/modules/_property-desc.js");
var toIObject = __webpack_require__(/*! ./_to-iobject */ "./node_modules/core-js/modules/_to-iobject.js");
var toPrimitive = __webpack_require__(/*! ./_to-primitive */ "./node_modules/core-js/modules/_to-primitive.js");
var has = __webpack_require__(/*! ./_has */ "./node_modules/core-js/modules/_has.js");
var IE8_DOM_DEFINE = __webpack_require__(/*! ./_ie8-dom-define */ "./node_modules/core-js/modules/_ie8-dom-define.js");
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(/*! ./_descriptors */ "./node_modules/core-js/modules/_descriptors.js") ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),

/***/ "./node_modules/core-js/modules/_object-gops.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_object-gops.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),

/***/ "./node_modules/core-js/modules/_object-gpo.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_object-gpo.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__(/*! ./_has */ "./node_modules/core-js/modules/_has.js");
var toObject = __webpack_require__(/*! ./_to-object */ "./node_modules/core-js/modules/_to-object.js");
var IE_PROTO = __webpack_require__(/*! ./_shared-key */ "./node_modules/core-js/modules/_shared-key.js")('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_object-keys-internal.js":
/*!***************************************************************!*\
  !*** ./node_modules/core-js/modules/_object-keys-internal.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(/*! ./_has */ "./node_modules/core-js/modules/_has.js");
var toIObject = __webpack_require__(/*! ./_to-iobject */ "./node_modules/core-js/modules/_to-iobject.js");
var arrayIndexOf = __webpack_require__(/*! ./_array-includes */ "./node_modules/core-js/modules/_array-includes.js")(false);
var IE_PROTO = __webpack_require__(/*! ./_shared-key */ "./node_modules/core-js/modules/_shared-key.js")('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_object-keys.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_object-keys.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(/*! ./_object-keys-internal */ "./node_modules/core-js/modules/_object-keys-internal.js");
var enumBugKeys = __webpack_require__(/*! ./_enum-bug-keys */ "./node_modules/core-js/modules/_enum-bug-keys.js");

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),

/***/ "./node_modules/core-js/modules/_object-pie.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_object-pie.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),

/***/ "./node_modules/core-js/modules/_property-desc.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/_property-desc.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),

/***/ "./node_modules/core-js/modules/_redefine-all.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/_redefine-all.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var redefine = __webpack_require__(/*! ./_redefine */ "./node_modules/core-js/modules/_redefine.js");
module.exports = function (target, src, safe) {
  for (var key in src) redefine(target, key, src[key], safe);
  return target;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_redefine.js":
/*!***************************************************!*\
  !*** ./node_modules/core-js/modules/_redefine.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ./_global */ "./node_modules/core-js/modules/_global.js");
var hide = __webpack_require__(/*! ./_hide */ "./node_modules/core-js/modules/_hide.js");
var has = __webpack_require__(/*! ./_has */ "./node_modules/core-js/modules/_has.js");
var SRC = __webpack_require__(/*! ./_uid */ "./node_modules/core-js/modules/_uid.js")('src');
var $toString = __webpack_require__(/*! ./_function-to-string */ "./node_modules/core-js/modules/_function-to-string.js");
var TO_STRING = 'toString';
var TPL = ('' + $toString).split(TO_STRING);

__webpack_require__(/*! ./_core */ "./node_modules/core-js/modules/_core.js").inspectSource = function (it) {
  return $toString.call(it);
};

(module.exports = function (O, key, val, safe) {
  var isFunction = typeof val == 'function';
  if (isFunction) has(val, 'name') || hide(val, 'name', key);
  if (O[key] === val) return;
  if (isFunction) has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
  if (O === global) {
    O[key] = val;
  } else if (!safe) {
    delete O[key];
    hide(O, key, val);
  } else if (O[key]) {
    O[key] = val;
  } else {
    hide(O, key, val);
  }
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, TO_STRING, function toString() {
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});


/***/ }),

/***/ "./node_modules/core-js/modules/_set-proto.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_set-proto.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/core-js/modules/_is-object.js");
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/modules/_an-object.js");
var check = function (O, proto) {
  anObject(O);
  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function (test, buggy, set) {
      try {
        set = __webpack_require__(/*! ./_ctx */ "./node_modules/core-js/modules/_ctx.js")(Function.call, __webpack_require__(/*! ./_object-gopd */ "./node_modules/core-js/modules/_object-gopd.js").f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch (e) { buggy = true; }
      return function setPrototypeOf(O, proto) {
        check(O, proto);
        if (buggy) O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};


/***/ }),

/***/ "./node_modules/core-js/modules/_set-species.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_set-species.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(/*! ./_global */ "./node_modules/core-js/modules/_global.js");
var dP = __webpack_require__(/*! ./_object-dp */ "./node_modules/core-js/modules/_object-dp.js");
var DESCRIPTORS = __webpack_require__(/*! ./_descriptors */ "./node_modules/core-js/modules/_descriptors.js");
var SPECIES = __webpack_require__(/*! ./_wks */ "./node_modules/core-js/modules/_wks.js")('species');

module.exports = function (KEY) {
  var C = global[KEY];
  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
    configurable: true,
    get: function () { return this; }
  });
};


/***/ }),

/***/ "./node_modules/core-js/modules/_set-to-string-tag.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/_set-to-string-tag.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(/*! ./_object-dp */ "./node_modules/core-js/modules/_object-dp.js").f;
var has = __webpack_require__(/*! ./_has */ "./node_modules/core-js/modules/_has.js");
var TAG = __webpack_require__(/*! ./_wks */ "./node_modules/core-js/modules/_wks.js")('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),

/***/ "./node_modules/core-js/modules/_shared-key.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_shared-key.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(/*! ./_shared */ "./node_modules/core-js/modules/_shared.js")('keys');
var uid = __webpack_require__(/*! ./_uid */ "./node_modules/core-js/modules/_uid.js");
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),

/***/ "./node_modules/core-js/modules/_shared.js":
/*!*************************************************!*\
  !*** ./node_modules/core-js/modules/_shared.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__(/*! ./_core */ "./node_modules/core-js/modules/_core.js");
var global = __webpack_require__(/*! ./_global */ "./node_modules/core-js/modules/_global.js");
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: core.version,
  mode: __webpack_require__(/*! ./_library */ "./node_modules/core-js/modules/_library.js") ? 'pure' : 'global',
  copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
});


/***/ }),

/***/ "./node_modules/core-js/modules/_to-absolute-index.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/_to-absolute-index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(/*! ./_to-integer */ "./node_modules/core-js/modules/_to-integer.js");
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),

/***/ "./node_modules/core-js/modules/_to-integer.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_to-integer.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),

/***/ "./node_modules/core-js/modules/_to-iobject.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_to-iobject.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(/*! ./_iobject */ "./node_modules/core-js/modules/_iobject.js");
var defined = __webpack_require__(/*! ./_defined */ "./node_modules/core-js/modules/_defined.js");
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),

/***/ "./node_modules/core-js/modules/_to-length.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_to-length.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(/*! ./_to-integer */ "./node_modules/core-js/modules/_to-integer.js");
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),

/***/ "./node_modules/core-js/modules/_to-object.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_to-object.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(/*! ./_defined */ "./node_modules/core-js/modules/_defined.js");
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),

/***/ "./node_modules/core-js/modules/_to-primitive.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/_to-primitive.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/core-js/modules/_is-object.js");
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),

/***/ "./node_modules/core-js/modules/_uid.js":
/*!**********************************************!*\
  !*** ./node_modules/core-js/modules/_uid.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),

/***/ "./node_modules/core-js/modules/_validate-collection.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/_validate-collection.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/core-js/modules/_is-object.js");
module.exports = function (it, TYPE) {
  if (!isObject(it) || it._t !== TYPE) throw TypeError('Incompatible receiver, ' + TYPE + ' required!');
  return it;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_wks.js":
/*!**********************************************!*\
  !*** ./node_modules/core-js/modules/_wks.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(/*! ./_shared */ "./node_modules/core-js/modules/_shared.js")('wks');
var uid = __webpack_require__(/*! ./_uid */ "./node_modules/core-js/modules/_uid.js");
var Symbol = __webpack_require__(/*! ./_global */ "./node_modules/core-js/modules/_global.js").Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),

/***/ "./node_modules/core-js/modules/core.get-iterator-method.js":
/*!******************************************************************!*\
  !*** ./node_modules/core-js/modules/core.get-iterator-method.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(/*! ./_classof */ "./node_modules/core-js/modules/_classof.js");
var ITERATOR = __webpack_require__(/*! ./_wks */ "./node_modules/core-js/modules/_wks.js")('iterator');
var Iterators = __webpack_require__(/*! ./_iterators */ "./node_modules/core-js/modules/_iterators.js");
module.exports = __webpack_require__(/*! ./_core */ "./node_modules/core-js/modules/_core.js").getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),

/***/ "./node_modules/core-js/modules/es6.map.js":
/*!*************************************************!*\
  !*** ./node_modules/core-js/modules/es6.map.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var strong = __webpack_require__(/*! ./_collection-strong */ "./node_modules/core-js/modules/_collection-strong.js");
var validate = __webpack_require__(/*! ./_validate-collection */ "./node_modules/core-js/modules/_validate-collection.js");
var MAP = 'Map';

// 23.1 Map Objects
module.exports = __webpack_require__(/*! ./_collection */ "./node_modules/core-js/modules/_collection.js")(MAP, function (get) {
  return function Map() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.1.3.6 Map.prototype.get(key)
  get: function get(key) {
    var entry = strong.getEntry(validate(this, MAP), key);
    return entry && entry.v;
  },
  // 23.1.3.9 Map.prototype.set(key, value)
  set: function set(key, value) {
    return strong.def(validate(this, MAP), key === 0 ? 0 : key, value);
  }
}, strong, true);


/***/ }),

/***/ "./node_modules/core-js/modules/es6.set.js":
/*!*************************************************!*\
  !*** ./node_modules/core-js/modules/es6.set.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var strong = __webpack_require__(/*! ./_collection-strong */ "./node_modules/core-js/modules/_collection-strong.js");
var validate = __webpack_require__(/*! ./_validate-collection */ "./node_modules/core-js/modules/_validate-collection.js");
var SET = 'Set';

// 23.2 Set Objects
module.exports = __webpack_require__(/*! ./_collection */ "./node_modules/core-js/modules/_collection.js")(SET, function (get) {
  return function Set() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.2.3.1 Set.prototype.add(value)
  add: function add(value) {
    return strong.def(validate(this, SET), value = value === 0 ? 0 : value, value);
  }
}, strong);


/***/ }),

/***/ "./node_modules/core-js/modules/es6.weak-map.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/es6.weak-map.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(/*! ./_global */ "./node_modules/core-js/modules/_global.js");
var each = __webpack_require__(/*! ./_array-methods */ "./node_modules/core-js/modules/_array-methods.js")(0);
var redefine = __webpack_require__(/*! ./_redefine */ "./node_modules/core-js/modules/_redefine.js");
var meta = __webpack_require__(/*! ./_meta */ "./node_modules/core-js/modules/_meta.js");
var assign = __webpack_require__(/*! ./_object-assign */ "./node_modules/core-js/modules/_object-assign.js");
var weak = __webpack_require__(/*! ./_collection-weak */ "./node_modules/core-js/modules/_collection-weak.js");
var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/core-js/modules/_is-object.js");
var validate = __webpack_require__(/*! ./_validate-collection */ "./node_modules/core-js/modules/_validate-collection.js");
var NATIVE_WEAK_MAP = __webpack_require__(/*! ./_validate-collection */ "./node_modules/core-js/modules/_validate-collection.js");
var IS_IE11 = !global.ActiveXObject && 'ActiveXObject' in global;
var WEAK_MAP = 'WeakMap';
var getWeak = meta.getWeak;
var isExtensible = Object.isExtensible;
var uncaughtFrozenStore = weak.ufstore;
var InternalMap;

var wrapper = function (get) {
  return function WeakMap() {
    return get(this, arguments.length > 0 ? arguments[0] : undefined);
  };
};

var methods = {
  // 23.3.3.3 WeakMap.prototype.get(key)
  get: function get(key) {
    if (isObject(key)) {
      var data = getWeak(key);
      if (data === true) return uncaughtFrozenStore(validate(this, WEAK_MAP)).get(key);
      return data ? data[this._i] : undefined;
    }
  },
  // 23.3.3.5 WeakMap.prototype.set(key, value)
  set: function set(key, value) {
    return weak.def(validate(this, WEAK_MAP), key, value);
  }
};

// 23.3 WeakMap Objects
var $WeakMap = module.exports = __webpack_require__(/*! ./_collection */ "./node_modules/core-js/modules/_collection.js")(WEAK_MAP, wrapper, methods, weak, true, true);

// IE11 WeakMap frozen keys fix
if (NATIVE_WEAK_MAP && IS_IE11) {
  InternalMap = weak.getConstructor(wrapper, WEAK_MAP);
  assign(InternalMap.prototype, methods);
  meta.NEED = true;
  each(['delete', 'has', 'get', 'set'], function (key) {
    var proto = $WeakMap.prototype;
    var method = proto[key];
    redefine(proto, key, function (a, b) {
      // store frozen objects on internal weakmap shim
      if (isObject(a) && !isExtensible(a)) {
        if (!this._f) this._f = new InternalMap();
        var result = this._f[key](a, b);
        return key == 'set' ? this : result;
      // store all the rest on native weakmap
      } return method.call(this, a, b);
    });
  });
}


/***/ }),

/***/ "./node_modules/core-js/modules/es7.reflect.define-metadata.js":
/*!*********************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.reflect.define-metadata.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(/*! ./_metadata */ "./node_modules/core-js/modules/_metadata.js");
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/modules/_an-object.js");
var toMetaKey = metadata.key;
var ordinaryDefineOwnMetadata = metadata.set;

metadata.exp({ defineMetadata: function defineMetadata(metadataKey, metadataValue, target, targetKey) {
  ordinaryDefineOwnMetadata(metadataKey, metadataValue, anObject(target), toMetaKey(targetKey));
} });


/***/ }),

/***/ "./node_modules/core-js/modules/es7.reflect.delete-metadata.js":
/*!*********************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.reflect.delete-metadata.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(/*! ./_metadata */ "./node_modules/core-js/modules/_metadata.js");
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/modules/_an-object.js");
var toMetaKey = metadata.key;
var getOrCreateMetadataMap = metadata.map;
var store = metadata.store;

metadata.exp({ deleteMetadata: function deleteMetadata(metadataKey, target /* , targetKey */) {
  var targetKey = arguments.length < 3 ? undefined : toMetaKey(arguments[2]);
  var metadataMap = getOrCreateMetadataMap(anObject(target), targetKey, false);
  if (metadataMap === undefined || !metadataMap['delete'](metadataKey)) return false;
  if (metadataMap.size) return true;
  var targetMetadata = store.get(target);
  targetMetadata['delete'](targetKey);
  return !!targetMetadata.size || store['delete'](target);
} });


/***/ }),

/***/ "./node_modules/core-js/modules/es7.reflect.get-metadata-keys.js":
/*!***********************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.reflect.get-metadata-keys.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Set = __webpack_require__(/*! ./es6.set */ "./node_modules/core-js/modules/es6.set.js");
var from = __webpack_require__(/*! ./_array-from-iterable */ "./node_modules/core-js/modules/_array-from-iterable.js");
var metadata = __webpack_require__(/*! ./_metadata */ "./node_modules/core-js/modules/_metadata.js");
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/modules/_an-object.js");
var getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ "./node_modules/core-js/modules/_object-gpo.js");
var ordinaryOwnMetadataKeys = metadata.keys;
var toMetaKey = metadata.key;

var ordinaryMetadataKeys = function (O, P) {
  var oKeys = ordinaryOwnMetadataKeys(O, P);
  var parent = getPrototypeOf(O);
  if (parent === null) return oKeys;
  var pKeys = ordinaryMetadataKeys(parent, P);
  return pKeys.length ? oKeys.length ? from(new Set(oKeys.concat(pKeys))) : pKeys : oKeys;
};

metadata.exp({ getMetadataKeys: function getMetadataKeys(target /* , targetKey */) {
  return ordinaryMetadataKeys(anObject(target), arguments.length < 2 ? undefined : toMetaKey(arguments[1]));
} });


/***/ }),

/***/ "./node_modules/core-js/modules/es7.reflect.get-metadata.js":
/*!******************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.reflect.get-metadata.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(/*! ./_metadata */ "./node_modules/core-js/modules/_metadata.js");
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/modules/_an-object.js");
var getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ "./node_modules/core-js/modules/_object-gpo.js");
var ordinaryHasOwnMetadata = metadata.has;
var ordinaryGetOwnMetadata = metadata.get;
var toMetaKey = metadata.key;

var ordinaryGetMetadata = function (MetadataKey, O, P) {
  var hasOwn = ordinaryHasOwnMetadata(MetadataKey, O, P);
  if (hasOwn) return ordinaryGetOwnMetadata(MetadataKey, O, P);
  var parent = getPrototypeOf(O);
  return parent !== null ? ordinaryGetMetadata(MetadataKey, parent, P) : undefined;
};

metadata.exp({ getMetadata: function getMetadata(metadataKey, target /* , targetKey */) {
  return ordinaryGetMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
} });


/***/ }),

/***/ "./node_modules/core-js/modules/es7.reflect.get-own-metadata-keys.js":
/*!***************************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.reflect.get-own-metadata-keys.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(/*! ./_metadata */ "./node_modules/core-js/modules/_metadata.js");
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/modules/_an-object.js");
var ordinaryOwnMetadataKeys = metadata.keys;
var toMetaKey = metadata.key;

metadata.exp({ getOwnMetadataKeys: function getOwnMetadataKeys(target /* , targetKey */) {
  return ordinaryOwnMetadataKeys(anObject(target), arguments.length < 2 ? undefined : toMetaKey(arguments[1]));
} });


/***/ }),

/***/ "./node_modules/core-js/modules/es7.reflect.get-own-metadata.js":
/*!**********************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.reflect.get-own-metadata.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(/*! ./_metadata */ "./node_modules/core-js/modules/_metadata.js");
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/modules/_an-object.js");
var ordinaryGetOwnMetadata = metadata.get;
var toMetaKey = metadata.key;

metadata.exp({ getOwnMetadata: function getOwnMetadata(metadataKey, target /* , targetKey */) {
  return ordinaryGetOwnMetadata(metadataKey, anObject(target)
    , arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
} });


/***/ }),

/***/ "./node_modules/core-js/modules/es7.reflect.has-metadata.js":
/*!******************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.reflect.has-metadata.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(/*! ./_metadata */ "./node_modules/core-js/modules/_metadata.js");
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/modules/_an-object.js");
var getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ "./node_modules/core-js/modules/_object-gpo.js");
var ordinaryHasOwnMetadata = metadata.has;
var toMetaKey = metadata.key;

var ordinaryHasMetadata = function (MetadataKey, O, P) {
  var hasOwn = ordinaryHasOwnMetadata(MetadataKey, O, P);
  if (hasOwn) return true;
  var parent = getPrototypeOf(O);
  return parent !== null ? ordinaryHasMetadata(MetadataKey, parent, P) : false;
};

metadata.exp({ hasMetadata: function hasMetadata(metadataKey, target /* , targetKey */) {
  return ordinaryHasMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
} });


/***/ }),

/***/ "./node_modules/core-js/modules/es7.reflect.has-own-metadata.js":
/*!**********************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.reflect.has-own-metadata.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(/*! ./_metadata */ "./node_modules/core-js/modules/_metadata.js");
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/modules/_an-object.js");
var ordinaryHasOwnMetadata = metadata.has;
var toMetaKey = metadata.key;

metadata.exp({ hasOwnMetadata: function hasOwnMetadata(metadataKey, target /* , targetKey */) {
  return ordinaryHasOwnMetadata(metadataKey, anObject(target)
    , arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
} });


/***/ }),

/***/ "./node_modules/core-js/modules/es7.reflect.metadata.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.reflect.metadata.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var $metadata = __webpack_require__(/*! ./_metadata */ "./node_modules/core-js/modules/_metadata.js");
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/modules/_an-object.js");
var aFunction = __webpack_require__(/*! ./_a-function */ "./node_modules/core-js/modules/_a-function.js");
var toMetaKey = $metadata.key;
var ordinaryDefineOwnMetadata = $metadata.set;

$metadata.exp({ metadata: function metadata(metadataKey, metadataValue) {
  return function decorator(target, targetKey) {
    ordinaryDefineOwnMetadata(
      metadataKey, metadataValue,
      (targetKey !== undefined ? anObject : aFunction)(target),
      toMetaKey(targetKey)
    );
  };
} });


/***/ }),

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/app.component.css":
/*!***********************************!*\
  !*** ./src/app/app.component.css ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "footer.page-footer {\n  margin: 0;\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYXBwLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxTQUFTO0FBQ1giLCJmaWxlIjoic3JjL2FwcC9hcHAuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbImZvb3Rlci5wYWdlLWZvb3RlciB7XG4gIG1hcmdpbjogMDtcbn1cbiJdfQ== */"

/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div id=\"sticky-footer-div\">\n\n  <header *ngIf=\"!isVideoSessionUrl()\">\n    <navbar></navbar>\n  </header>\n\n  <main>\n    <router-outlet></router-outlet>\n  </main>\n\n  <footer *ngIf=\"!isVideoSessionUrl()\" class=\"page-footer secondaryColor-back\">\n    <app-footer></app-footer>\n  </footer>\n\n</div>\n"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AppComponent = /** @class */ (function () {
    function AppComponent(router) {
        this.router = router;
    }
    AppComponent.prototype.isVideoSessionUrl = function () {
        return (this.router.url.substring(0, '/session/'.length) === '/session/');
    };
    AppComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.css */ "./src/app/app.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"]])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/http */ "./node_modules/@angular/http/fesm5/http.js");
/* harmony import */ var _app_routing__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./app.routing */ "./src/app/app.routing.ts");
/* harmony import */ var angular2_materialize__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! angular2-materialize */ "./node_modules/angular2-materialize/dist/index.js");
/* harmony import */ var ng2_file_upload__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ng2-file-upload */ "./node_modules/ng2-file-upload/index.js");
/* harmony import */ var ng2_file_upload__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(ng2_file_upload__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/core */ "./node_modules/@angular/material/esm5/core.es5.js");
/* harmony import */ var _angular_material_button_toggle__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/button-toggle */ "./node_modules/@angular/material/esm5/button-toggle.es5.js");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/button */ "./node_modules/@angular/material/esm5/button.es5.js");
/* harmony import */ var _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/checkbox */ "./node_modules/@angular/material/esm5/checkbox.es5.js");
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/select */ "./node_modules/@angular/material/esm5/select.es5.js");
/* harmony import */ var _angular_material_slide_toggle__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/slide-toggle */ "./node_modules/@angular/material/esm5/slide-toggle.es5.js");
/* harmony import */ var _angular_material_slider__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/slider */ "./node_modules/@angular/material/esm5/slider.es5.js");
/* harmony import */ var _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/sidenav */ "./node_modules/@angular/material/esm5/sidenav.es5.js");
/* harmony import */ var _angular_material_list__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/material/list */ "./node_modules/@angular/material/esm5/list.es5.js");
/* harmony import */ var _angular_material_grid_list__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/material/grid-list */ "./node_modules/@angular/material/esm5/grid-list.es5.js");
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/material/card */ "./node_modules/@angular/material/esm5/card.es5.js");
/* harmony import */ var _angular_material_chips__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/material/chips */ "./node_modules/@angular/material/esm5/chips.es5.js");
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @angular/material/icon */ "./node_modules/@angular/material/esm5/icon.es5.js");
/* harmony import */ var _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @angular/material/progress-spinner */ "./node_modules/@angular/material/esm5/progress-spinner.es5.js");
/* harmony import */ var _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @angular/material/progress-bar */ "./node_modules/@angular/material/esm5/progress-bar.es5.js");
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! @angular/material/input */ "./node_modules/@angular/material/esm5/input.es5.js");
/* harmony import */ var _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! @angular/material/snack-bar */ "./node_modules/@angular/material/esm5/snack-bar.es5.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! @angular/material/toolbar */ "./node_modules/@angular/material/esm5/toolbar.es5.js");
/* harmony import */ var _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! @angular/material/tooltip */ "./node_modules/@angular/material/esm5/tooltip.es5.js");
/* harmony import */ var _angular_material_menu__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! @angular/material/menu */ "./node_modules/@angular/material/esm5/menu.es5.js");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! @angular/material/dialog */ "./node_modules/@angular/material/esm5/dialog.es5.js");
/* harmony import */ var _angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! @angular/material/autocomplete */ "./node_modules/@angular/material/esm5/autocomplete.es5.js");
/* harmony import */ var _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! @angular/material/datepicker */ "./node_modules/@angular/material/esm5/datepicker.es5.js");
/* harmony import */ var _angular_material_table__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! @angular/material/table */ "./node_modules/@angular/material/esm5/table.es5.js");
/* harmony import */ var _angular_material_sort__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! @angular/material/sort */ "./node_modules/@angular/material/esm5/sort.es5.js");
/* harmony import */ var _angular_material_paginator__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! @angular/material/paginator */ "./node_modules/@angular/material/esm5/paginator.es5.js");
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! @angular/material/form-field */ "./node_modules/@angular/material/esm5/form-field.es5.js");
/* harmony import */ var _angular_material_stepper__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! @angular/material/stepper */ "./node_modules/@angular/material/esm5/stepper.es5.js");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/fesm5/animations.js");
/* harmony import */ var _pipes_intervention_asked_pipe__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(/*! ./pipes/intervention-asked.pipe */ "./src/app/pipes/intervention-asked.pipe.ts");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_38__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _components_navbar_navbar_component__WEBPACK_IMPORTED_MODULE_39__ = __webpack_require__(/*! ./components/navbar/navbar.component */ "./src/app/components/navbar/navbar.component.ts");
/* harmony import */ var _components_footer_footer_component__WEBPACK_IMPORTED_MODULE_40__ = __webpack_require__(/*! ./components/footer/footer.component */ "./src/app/components/footer/footer.component.ts");
/* harmony import */ var _components_login_modal_login_modal_component__WEBPACK_IMPORTED_MODULE_41__ = __webpack_require__(/*! ./components/login-modal/login-modal.component */ "./src/app/components/login-modal/login-modal.component.ts");
/* harmony import */ var _components_presentation_presentation_component__WEBPACK_IMPORTED_MODULE_42__ = __webpack_require__(/*! ./components/presentation/presentation.component */ "./src/app/components/presentation/presentation.component.ts");
/* harmony import */ var _components_dashboard_dashboard_component__WEBPACK_IMPORTED_MODULE_43__ = __webpack_require__(/*! ./components/dashboard/dashboard.component */ "./src/app/components/dashboard/dashboard.component.ts");
/* harmony import */ var _components_course_details_course_details_component__WEBPACK_IMPORTED_MODULE_44__ = __webpack_require__(/*! ./components/course-details/course-details.component */ "./src/app/components/course-details/course-details.component.ts");
/* harmony import */ var _components_settings_settings_component__WEBPACK_IMPORTED_MODULE_45__ = __webpack_require__(/*! ./components/settings/settings.component */ "./src/app/components/settings/settings.component.ts");
/* harmony import */ var _components_error_message_error_message_component__WEBPACK_IMPORTED_MODULE_46__ = __webpack_require__(/*! ./components/error-message/error-message.component */ "./src/app/components/error-message/error-message.component.ts");
/* harmony import */ var _components_comment_comment_component__WEBPACK_IMPORTED_MODULE_47__ = __webpack_require__(/*! ./components/comment/comment.component */ "./src/app/components/comment/comment.component.ts");
/* harmony import */ var _components_file_group_file_group_component__WEBPACK_IMPORTED_MODULE_48__ = __webpack_require__(/*! ./components/file-group/file-group.component */ "./src/app/components/file-group/file-group.component.ts");
/* harmony import */ var _components_video_session_video_session_component__WEBPACK_IMPORTED_MODULE_49__ = __webpack_require__(/*! ./components/video-session/video-session.component */ "./src/app/components/video-session/video-session.component.ts");
/* harmony import */ var _components_file_uploader_file_uploader_component__WEBPACK_IMPORTED_MODULE_50__ = __webpack_require__(/*! ./components/file-uploader/file-uploader.component */ "./src/app/components/file-uploader/file-uploader.component.ts");
/* harmony import */ var _components_video_session_stream_component__WEBPACK_IMPORTED_MODULE_51__ = __webpack_require__(/*! ./components/video-session/stream.component */ "./src/app/components/video-session/stream.component.ts");
/* harmony import */ var _components_chat_line_chat_line_component__WEBPACK_IMPORTED_MODULE_52__ = __webpack_require__(/*! ./components/chat-line/chat-line.component */ "./src/app/components/chat-line/chat-line.component.ts");
/* harmony import */ var _services_authentication_service__WEBPACK_IMPORTED_MODULE_53__ = __webpack_require__(/*! ./services/authentication.service */ "./src/app/services/authentication.service.ts");
/* harmony import */ var _services_course_service__WEBPACK_IMPORTED_MODULE_54__ = __webpack_require__(/*! ./services/course.service */ "./src/app/services/course.service.ts");
/* harmony import */ var _services_session_service__WEBPACK_IMPORTED_MODULE_55__ = __webpack_require__(/*! ./services/session.service */ "./src/app/services/session.service.ts");
/* harmony import */ var _services_forum_service__WEBPACK_IMPORTED_MODULE_56__ = __webpack_require__(/*! ./services/forum.service */ "./src/app/services/forum.service.ts");
/* harmony import */ var _services_file_service__WEBPACK_IMPORTED_MODULE_57__ = __webpack_require__(/*! ./services/file.service */ "./src/app/services/file.service.ts");
/* harmony import */ var _services_course_details_modal_data_service__WEBPACK_IMPORTED_MODULE_58__ = __webpack_require__(/*! ./services/course-details-modal-data.service */ "./src/app/services/course-details-modal-data.service.ts");
/* harmony import */ var _services_login_modal_service__WEBPACK_IMPORTED_MODULE_59__ = __webpack_require__(/*! ./services/login-modal.service */ "./src/app/services/login-modal.service.ts");
/* harmony import */ var _services_uploader_modal_service__WEBPACK_IMPORTED_MODULE_60__ = __webpack_require__(/*! ./services/uploader-modal.service */ "./src/app/services/uploader-modal.service.ts");
/* harmony import */ var _services_user_service__WEBPACK_IMPORTED_MODULE_61__ = __webpack_require__(/*! ./services/user.service */ "./src/app/services/user.service.ts");
/* harmony import */ var _services_animation_service__WEBPACK_IMPORTED_MODULE_62__ = __webpack_require__(/*! ./services/animation.service */ "./src/app/services/animation.service.ts");
/* harmony import */ var _services_video_session_service__WEBPACK_IMPORTED_MODULE_63__ = __webpack_require__(/*! ./services/video-session.service */ "./src/app/services/video-session.service.ts");
/* harmony import */ var angular_calendar__WEBPACK_IMPORTED_MODULE_64__ = __webpack_require__(/*! angular-calendar */ "./node_modules/angular-calendar/fesm5/angular-calendar.js");
/* harmony import */ var angular_calendar_date_adapters_date_fns__WEBPACK_IMPORTED_MODULE_65__ = __webpack_require__(/*! angular-calendar/date-adapters/date-fns */ "./node_modules/angular-calendar/date-adapters/date-fns/index.js");
/* harmony import */ var angular_calendar_date_adapters_date_fns__WEBPACK_IMPORTED_MODULE_65___default = /*#__PURE__*/__webpack_require__.n(angular_calendar_date_adapters_date_fns__WEBPACK_IMPORTED_MODULE_65__);
/* harmony import */ var _components_calendar_calendar_component__WEBPACK_IMPORTED_MODULE_66__ = __webpack_require__(/*! ./components/calendar/calendar.component */ "./src/app/components/calendar/calendar.component.ts");
/* harmony import */ var time_ago_pipe__WEBPACK_IMPORTED_MODULE_67__ = __webpack_require__(/*! time-ago-pipe */ "./node_modules/time-ago-pipe/time-ago-pipe.js");
/* harmony import */ var time_ago_pipe__WEBPACK_IMPORTED_MODULE_67___default = /*#__PURE__*/__webpack_require__.n(time_ago_pipe__WEBPACK_IMPORTED_MODULE_67__);
/* harmony import */ var ng2_dragula_ng2_dragula__WEBPACK_IMPORTED_MODULE_68__ = __webpack_require__(/*! ng2-dragula/ng2-dragula */ "./node_modules/ng2-dragula/ng2-dragula.js");
/* harmony import */ var ng2_dragula_ng2_dragula__WEBPACK_IMPORTED_MODULE_68___default = /*#__PURE__*/__webpack_require__.n(ng2_dragula_ng2_dragula__WEBPACK_IMPORTED_MODULE_68__);
/* harmony import */ var primeng_components_editor_editor__WEBPACK_IMPORTED_MODULE_69__ = __webpack_require__(/*! primeng/components/editor/editor */ "./node_modules/primeng/components/editor/editor.js");
/* harmony import */ var primeng_components_editor_editor__WEBPACK_IMPORTED_MODULE_69___default = /*#__PURE__*/__webpack_require__.n(primeng_components_editor_editor__WEBPACK_IMPORTED_MODULE_69__);
/* harmony import */ var angular2_recaptcha__WEBPACK_IMPORTED_MODULE_70__ = __webpack_require__(/*! angular2-recaptcha */ "./node_modules/angular2-recaptcha/angular2-recaptcha.js");
/* harmony import */ var angular2_recaptcha__WEBPACK_IMPORTED_MODULE_70___default = /*#__PURE__*/__webpack_require__.n(angular2_recaptcha__WEBPACK_IMPORTED_MODULE_70__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};









































































var MATERIAL_MODULES = [
    _angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_29__["MatAutocompleteModule"],
    _angular_material_button__WEBPACK_IMPORTED_MODULE_9__["MatButtonModule"],
    _angular_material_button_toggle__WEBPACK_IMPORTED_MODULE_8__["MatButtonToggleModule"],
    _angular_material_card__WEBPACK_IMPORTED_MODULE_17__["MatCardModule"],
    _angular_material_chips__WEBPACK_IMPORTED_MODULE_18__["MatChipsModule"],
    _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_10__["MatCheckboxModule"],
    _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_30__["MatDatepickerModule"],
    _angular_material_table__WEBPACK_IMPORTED_MODULE_31__["MatTableModule"],
    _angular_material_dialog__WEBPACK_IMPORTED_MODULE_28__["MatDialogModule"],
    _angular_material_form_field__WEBPACK_IMPORTED_MODULE_34__["MatFormFieldModule"],
    _angular_material_grid_list__WEBPACK_IMPORTED_MODULE_16__["MatGridListModule"],
    _angular_material_icon__WEBPACK_IMPORTED_MODULE_19__["MatIconModule"],
    _angular_material_input__WEBPACK_IMPORTED_MODULE_22__["MatInputModule"],
    _angular_material_list__WEBPACK_IMPORTED_MODULE_15__["MatListModule"],
    _angular_material_menu__WEBPACK_IMPORTED_MODULE_27__["MatMenuModule"],
    _angular_material_paginator__WEBPACK_IMPORTED_MODULE_33__["MatPaginatorModule"],
    _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_21__["MatProgressBarModule"],
    _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_20__["MatProgressSpinnerModule"],
    _angular_material_core__WEBPACK_IMPORTED_MODULE_7__["MatRippleModule"],
    _angular_material_select__WEBPACK_IMPORTED_MODULE_11__["MatSelectModule"],
    _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_14__["MatSidenavModule"],
    _angular_material_slider__WEBPACK_IMPORTED_MODULE_13__["MatSliderModule"],
    _angular_material_slide_toggle__WEBPACK_IMPORTED_MODULE_12__["MatSlideToggleModule"],
    _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_23__["MatSnackBarModule"],
    _angular_material_sort__WEBPACK_IMPORTED_MODULE_32__["MatSortModule"],
    _angular_material_stepper__WEBPACK_IMPORTED_MODULE_35__["MatStepperModule"],
    _angular_material__WEBPACK_IMPORTED_MODULE_24__["MatTabsModule"],
    _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_25__["MatToolbarModule"],
    _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_26__["MatTooltipModule"],
    _angular_material_core__WEBPACK_IMPORTED_MODULE_7__["MatCommonModule"],
];
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"],
                _angular_http__WEBPACK_IMPORTED_MODULE_3__["HttpModule"],
                angular2_materialize__WEBPACK_IMPORTED_MODULE_5__["MaterializeModule"],
                MATERIAL_MODULES,
                _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_36__["BrowserAnimationsModule"],
                _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_36__["NoopAnimationsModule"],
                _app_routing__WEBPACK_IMPORTED_MODULE_4__["routing"],
                angular_calendar__WEBPACK_IMPORTED_MODULE_64__["CalendarModule"].forRoot({
                    provide: angular_calendar__WEBPACK_IMPORTED_MODULE_64__["DateAdapter"],
                    useFactory: angular_calendar_date_adapters_date_fns__WEBPACK_IMPORTED_MODULE_65__["adapterFactory"]
                }),
                ng2_dragula_ng2_dragula__WEBPACK_IMPORTED_MODULE_68__["DragulaModule"],
                primeng_components_editor_editor__WEBPACK_IMPORTED_MODULE_69__["EditorModule"],
                angular2_recaptcha__WEBPACK_IMPORTED_MODULE_70__["ReCaptchaModule"],
            ],
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_38__["AppComponent"],
                _components_presentation_presentation_component__WEBPACK_IMPORTED_MODULE_42__["PresentationComponent"],
                _components_dashboard_dashboard_component__WEBPACK_IMPORTED_MODULE_43__["DashboardComponent"],
                _components_course_details_course_details_component__WEBPACK_IMPORTED_MODULE_44__["CourseDetailsComponent"],
                _components_navbar_navbar_component__WEBPACK_IMPORTED_MODULE_39__["NavbarComponent"],
                _components_footer_footer_component__WEBPACK_IMPORTED_MODULE_40__["FooterComponent"],
                _components_login_modal_login_modal_component__WEBPACK_IMPORTED_MODULE_41__["LoginModalComponent"],
                _components_settings_settings_component__WEBPACK_IMPORTED_MODULE_45__["SettingsComponent"],
                _components_error_message_error_message_component__WEBPACK_IMPORTED_MODULE_46__["ErrorMessageComponent"],
                _components_comment_comment_component__WEBPACK_IMPORTED_MODULE_47__["CommentComponent"],
                _components_file_group_file_group_component__WEBPACK_IMPORTED_MODULE_48__["FileGroupComponent"],
                _components_calendar_calendar_component__WEBPACK_IMPORTED_MODULE_66__["CalendarComponent"],
                time_ago_pipe__WEBPACK_IMPORTED_MODULE_67__["TimeAgoPipe"],
                ng2_file_upload__WEBPACK_IMPORTED_MODULE_6__["FileSelectDirective"],
                ng2_file_upload__WEBPACK_IMPORTED_MODULE_6__["FileDropDirective"],
                _components_video_session_video_session_component__WEBPACK_IMPORTED_MODULE_49__["VideoSessionComponent"],
                _components_file_uploader_file_uploader_component__WEBPACK_IMPORTED_MODULE_50__["FileUploaderComponent"],
                _components_video_session_stream_component__WEBPACK_IMPORTED_MODULE_51__["StreamComponent"],
                _components_chat_line_chat_line_component__WEBPACK_IMPORTED_MODULE_52__["ChatLineComponent"],
                _pipes_intervention_asked_pipe__WEBPACK_IMPORTED_MODULE_37__["InterventionAskedPipe"]
            ],
            providers: [
                _services_authentication_service__WEBPACK_IMPORTED_MODULE_53__["AuthenticationService"],
                _services_course_service__WEBPACK_IMPORTED_MODULE_54__["CourseService"],
                _services_session_service__WEBPACK_IMPORTED_MODULE_55__["SessionService"],
                _services_forum_service__WEBPACK_IMPORTED_MODULE_56__["ForumService"],
                _services_file_service__WEBPACK_IMPORTED_MODULE_57__["FileService"],
                _services_course_details_modal_data_service__WEBPACK_IMPORTED_MODULE_58__["CourseDetailsModalDataService"],
                _services_login_modal_service__WEBPACK_IMPORTED_MODULE_59__["LoginModalService"],
                _services_uploader_modal_service__WEBPACK_IMPORTED_MODULE_60__["UploaderModalService"],
                _services_user_service__WEBPACK_IMPORTED_MODULE_61__["UserService"],
                _services_animation_service__WEBPACK_IMPORTED_MODULE_62__["AnimationService"],
                _services_video_session_service__WEBPACK_IMPORTED_MODULE_63__["VideoSessionService"],
            ],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_38__["AppComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/app.routing.ts":
/*!********************************!*\
  !*** ./src/app/app.routing.ts ***!
  \********************************/
/*! exports provided: routing */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "routing", function() { return routing; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _components_presentation_presentation_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/presentation/presentation.component */ "./src/app/components/presentation/presentation.component.ts");
/* harmony import */ var _components_dashboard_dashboard_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/dashboard/dashboard.component */ "./src/app/components/dashboard/dashboard.component.ts");
/* harmony import */ var _components_course_details_course_details_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/course-details/course-details.component */ "./src/app/components/course-details/course-details.component.ts");
/* harmony import */ var _components_settings_settings_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/settings/settings.component */ "./src/app/components/settings/settings.component.ts");
/* harmony import */ var _components_video_session_video_session_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/video-session/video-session.component */ "./src/app/components/video-session/video-session.component.ts");






var appRoutes = [
    {
        path: '',
        component: _components_presentation_presentation_component__WEBPACK_IMPORTED_MODULE_1__["PresentationComponent"],
        pathMatch: 'full',
    },
    {
        path: 'courses',
        component: _components_dashboard_dashboard_component__WEBPACK_IMPORTED_MODULE_2__["DashboardComponent"]
    },
    {
        path: 'courses/:id/:tabId',
        component: _components_course_details_course_details_component__WEBPACK_IMPORTED_MODULE_3__["CourseDetailsComponent"]
    },
    {
        path: 'settings',
        component: _components_settings_settings_component__WEBPACK_IMPORTED_MODULE_4__["SettingsComponent"]
    },
    {
        path: 'session/:id',
        component: _components_video_session_video_session_component__WEBPACK_IMPORTED_MODULE_5__["VideoSessionComponent"]
    },
];
var routing = _angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"].forRoot(appRoutes, { useHash: true });


/***/ }),

/***/ "./src/app/classes/chatline.ts":
/*!*************************************!*\
  !*** ./src/app/classes/chatline.ts ***!
  \*************************************/
/*! exports provided: Chatline */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Chatline", function() { return Chatline; });
var Chatline = /** @class */ (function () {
    function Chatline(type, author, picture, message, color) {
        this.type = type;
        this.author = author;
        this.picture = picture;
        this.message = message;
        this.color = color;
    }
    return Chatline;
}());



/***/ }),

/***/ "./src/app/classes/comment.ts":
/*!************************************!*\
  !*** ./src/app/classes/comment.ts ***!
  \************************************/
/*! exports provided: Comment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Comment", function() { return Comment; });
var Comment = /** @class */ (function () {
    function Comment(message, videourl, audioonly, commentParent) {
        this.message = message;
        this.videourl = videourl;
        this.audioonly = audioonly;
        this.replies = [];
        this.commentParent = commentParent;
        this.user = null; //Backend will take care of it
    }
    return Comment;
}());



/***/ }),

/***/ "./src/app/classes/course-details.ts":
/*!*******************************************!*\
  !*** ./src/app/classes/course-details.ts ***!
  \*******************************************/
/*! exports provided: CourseDetails */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CourseDetails", function() { return CourseDetails; });
var CourseDetails = /** @class */ (function () {
    function CourseDetails(forum, files) {
        this.info = '';
        this.forum = forum;
        this.files = files;
    }
    return CourseDetails;
}());



/***/ }),

/***/ "./src/app/classes/course.ts":
/*!***********************************!*\
  !*** ./src/app/classes/course.ts ***!
  \***********************************/
/*! exports provided: Course */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Course", function() { return Course; });
var Course = /** @class */ (function () {
    function Course(title, image, courseDetails) {
        this.title = title;
        this.teacher = null; //Backend will take care of it
        this.image = image;
        this.courseDetails = courseDetails;
        this.sessions = [];
        this.attenders = [];
    }
    return Course;
}());



/***/ }),

/***/ "./src/app/classes/entry.ts":
/*!**********************************!*\
  !*** ./src/app/classes/entry.ts ***!
  \**********************************/
/*! exports provided: Entry */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Entry", function() { return Entry; });
var Entry = /** @class */ (function () {
    function Entry(title, comments) {
        this.title = title;
        this.comments = comments;
        this.user = null; //Backend will take care of it
    }
    return Entry;
}());



/***/ }),

/***/ "./src/app/classes/file-group.ts":
/*!***************************************!*\
  !*** ./src/app/classes/file-group.ts ***!
  \***************************************/
/*! exports provided: FileGroup */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FileGroup", function() { return FileGroup; });
var FileGroup = /** @class */ (function () {
    function FileGroup(title, fileGroupParent) {
        this.title = title;
        this.fileGroupParent = fileGroupParent;
        this.files = [];
        this.fileGroups = [];
    }
    return FileGroup;
}());



/***/ }),

/***/ "./src/app/classes/file.ts":
/*!*********************************!*\
  !*** ./src/app/classes/file.ts ***!
  \*********************************/
/*! exports provided: File */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "File", function() { return File; });
var File = /** @class */ (function () {
    function File(type, name, link) {
        this.type = type;
        this.name = name;
        this.link = link;
    }
    return File;
}());



/***/ }),

/***/ "./src/app/classes/forum.ts":
/*!**********************************!*\
  !*** ./src/app/classes/forum.ts ***!
  \**********************************/
/*! exports provided: Forum */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Forum", function() { return Forum; });
var Forum = /** @class */ (function () {
    function Forum(activated) {
        this.activated = activated;
        this.entries = [];
    }
    return Forum;
}());



/***/ }),

/***/ "./src/app/classes/session.ts":
/*!************************************!*\
  !*** ./src/app/classes/session.ts ***!
  \************************************/
/*! exports provided: Session */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Session", function() { return Session; });
var Session = /** @class */ (function () {
    function Session(title, description, date) {
        this.title = title;
        this.description = description;
        this.date = date;
        this.course = null; //Backend will take care of it
    }
    return Session;
}());



/***/ }),

/***/ "./src/app/classes/user.ts":
/*!*********************************!*\
  !*** ./src/app/classes/user.ts ***!
  \*********************************/
/*! exports provided: User */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "User", function() { return User; });
var User = /** @class */ (function () {
    function User(u) {
        this.id = u.id;
        this.name = u.name;
        this.nickName = u.nickName;
        this.roles = u.roles;
        this.picture = u.picture;
        this.registrationDate = u.registrationDate;
        this.courses = [];
    }
    return User;
}());



/***/ }),

/***/ "./src/app/components/calendar/calendar.component.css":
/*!************************************************************!*\
  !*** ./src/app/components/calendar/calendar.component.css ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".calendar-container {\n  position: relative;\n}\n\n.my-calendar-header {\n  min-width: 365px;\n}\n\ni.material-icons {\n  cursor: pointer;\n  font-size: 30px;\n  padding-left: 5px;\n  padding-right: 5px;\n}\n\ni.material-icons:hover {\n  color: #91a59b;\n}\n\n.calendar-icon-group {\n  float: right;\n}\n\n.calendar-title {\n  font-weight: 300 !important;\n  text-align: left !important;\n}\n\n.loader-calendar {\n  height: 4px;\n  width: 100%;\n  position: relative;\n  overflow: hidden;\n  background-color: rgba(221, 221, 221, 0.5);\n}\n\n.loader-calendar:before{\n  display: block;\n  position: absolute;\n  content: \"\";\n  left: -200px;\n  width: 200px;\n  height: 4px;\n  background-color: #375646;\n  -webkit-animation: loading 0.5s linear infinite;\n          animation: loading 0.5s linear infinite;\n}\n\n@-webkit-keyframes loading {\n    from {left: -200px; width: 30%;}\n    50% {width: 30%;}\n    70% {width: 70%;}\n    80% { left: 50%;}\n    95% {left: 120%;}\n    to {left: 100%;}\n}\n\n@keyframes loading {\n    from {left: -200px; width: 30%;}\n    50% {width: 30%;}\n    70% {width: 70%;}\n    80% { left: 50%;}\n    95% {left: 120%;}\n    to {left: 100%;}\n}\n\n/*Mobile Phones*/\n\n@media only screen and (max-width: 600px) and (orientation: portrait), screen and (max-width: 992px) and (orientation: landscape) {\n  .my-calendar-header {\n    min-width: 0;\n  }\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29tcG9uZW50cy9jYWxlbmRhci9jYWxlbmRhci5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0Usa0JBQWtCO0FBQ3BCOztBQUVBO0VBQ0UsZ0JBQWdCO0FBQ2xCOztBQUVBO0VBQ0UsZUFBZTtFQUNmLGVBQWU7RUFDZixpQkFBaUI7RUFDakIsa0JBQWtCO0FBQ3BCOztBQUVBO0VBQ0UsY0FBYztBQUNoQjs7QUFFQTtFQUNFLFlBQVk7QUFDZDs7QUFFQTtFQUNFLDJCQUEyQjtFQUMzQiwyQkFBMkI7QUFDN0I7O0FBR0E7RUFDRSxXQUFXO0VBQ1gsV0FBVztFQUNYLGtCQUFrQjtFQUNsQixnQkFBZ0I7RUFDaEIsMENBQTBDO0FBQzVDOztBQUNBO0VBQ0UsY0FBYztFQUNkLGtCQUFrQjtFQUNsQixXQUFXO0VBQ1gsWUFBWTtFQUNaLFlBQVk7RUFDWixXQUFXO0VBQ1gseUJBQXlCO0VBQ3pCLCtDQUF1QztVQUF2Qyx1Q0FBdUM7QUFDekM7O0FBRUE7SUFDSSxNQUFNLFlBQVksRUFBRSxVQUFVLENBQUM7SUFDL0IsS0FBSyxVQUFVLENBQUM7SUFDaEIsS0FBSyxVQUFVLENBQUM7SUFDaEIsTUFBTSxTQUFTLENBQUM7SUFDaEIsS0FBSyxVQUFVLENBQUM7SUFDaEIsSUFBSSxVQUFVLENBQUM7QUFDbkI7O0FBUEE7SUFDSSxNQUFNLFlBQVksRUFBRSxVQUFVLENBQUM7SUFDL0IsS0FBSyxVQUFVLENBQUM7SUFDaEIsS0FBSyxVQUFVLENBQUM7SUFDaEIsTUFBTSxTQUFTLENBQUM7SUFDaEIsS0FBSyxVQUFVLENBQUM7SUFDaEIsSUFBSSxVQUFVLENBQUM7QUFDbkI7O0FBRUEsZ0JBQWdCOztBQUNoQjtFQUNFO0lBQ0UsWUFBWTtFQUNkO0FBQ0YiLCJmaWxlIjoic3JjL2FwcC9jb21wb25lbnRzL2NhbGVuZGFyL2NhbGVuZGFyLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuY2FsZW5kYXItY29udGFpbmVyIHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xufVxuXG4ubXktY2FsZW5kYXItaGVhZGVyIHtcbiAgbWluLXdpZHRoOiAzNjVweDtcbn1cblxuaS5tYXRlcmlhbC1pY29ucyB7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgZm9udC1zaXplOiAzMHB4O1xuICBwYWRkaW5nLWxlZnQ6IDVweDtcbiAgcGFkZGluZy1yaWdodDogNXB4O1xufVxuXG5pLm1hdGVyaWFsLWljb25zOmhvdmVyIHtcbiAgY29sb3I6ICM5MWE1OWI7XG59XG5cbi5jYWxlbmRhci1pY29uLWdyb3VwIHtcbiAgZmxvYXQ6IHJpZ2h0O1xufVxuXG4uY2FsZW5kYXItdGl0bGUge1xuICBmb250LXdlaWdodDogMzAwICFpbXBvcnRhbnQ7XG4gIHRleHQtYWxpZ246IGxlZnQgIWltcG9ydGFudDtcbn1cblxuXG4ubG9hZGVyLWNhbGVuZGFyIHtcbiAgaGVpZ2h0OiA0cHg7XG4gIHdpZHRoOiAxMDAlO1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjIxLCAyMjEsIDIyMSwgMC41KTtcbn1cbi5sb2FkZXItY2FsZW5kYXI6YmVmb3Jle1xuICBkaXNwbGF5OiBibG9jaztcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBjb250ZW50OiBcIlwiO1xuICBsZWZ0OiAtMjAwcHg7XG4gIHdpZHRoOiAyMDBweDtcbiAgaGVpZ2h0OiA0cHg7XG4gIGJhY2tncm91bmQtY29sb3I6ICMzNzU2NDY7XG4gIGFuaW1hdGlvbjogbG9hZGluZyAwLjVzIGxpbmVhciBpbmZpbml0ZTtcbn1cblxuQGtleWZyYW1lcyBsb2FkaW5nIHtcbiAgICBmcm9tIHtsZWZ0OiAtMjAwcHg7IHdpZHRoOiAzMCU7fVxuICAgIDUwJSB7d2lkdGg6IDMwJTt9XG4gICAgNzAlIHt3aWR0aDogNzAlO31cbiAgICA4MCUgeyBsZWZ0OiA1MCU7fVxuICAgIDk1JSB7bGVmdDogMTIwJTt9XG4gICAgdG8ge2xlZnQ6IDEwMCU7fVxufVxuXG4vKk1vYmlsZSBQaG9uZXMqL1xuQG1lZGlhIG9ubHkgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA2MDBweCkgYW5kIChvcmllbnRhdGlvbjogcG9ydHJhaXQpLCBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDk5MnB4KSBhbmQgKG9yaWVudGF0aW9uOiBsYW5kc2NhcGUpIHtcbiAgLm15LWNhbGVuZGFyLWhlYWRlciB7XG4gICAgbWluLXdpZHRoOiAwO1xuICB9XG59XG4iXX0= */"

/***/ }),

/***/ "./src/app/components/calendar/calendar.component.html":
/*!*************************************************************!*\
  !*** ./src/app/components/calendar/calendar.component.html ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"calendar-container\">\n    <div class=\"row no-margin my-calendar-header\">\n      <div class=\"col l7 m7 s7 no-padding-lateral\">\n        <h3 class=\"calendar-title\">{{ viewDate | calendarDate:(view + 'ViewTitle'):'en' }}</h3>\n      </div>\n      <div *ngIf=\"!loadingSessions\" class=\"col l5 m5 s5 no-padding-lateral\">\n        <div class=\"calendar-icon-group\">\n          <i class=\"material-icons no-padding-left\" (click)=\"decrement()\">chevron_left</i>\n          <i class=\"material-icons\" (click)=\"today()\">today</i>\n          <i class=\"material-icons\" (click)=\"increment()\">chevron_right</i>\n        </div>\n      </div>\n    </div>\n    <div *ngIf=\"!loadingSessions\">\n      <mwl-calendar-month-view [viewDate]=\"viewDate\" [events]=\"events\" [activeDayIsOpen]=\"activeDayIsOpen\" (dayClicked)=\"dayClicked($event.day)\"></mwl-calendar-month-view>\n    </div>\n    <div *ngIf=\"loadingSessions\" class=\"loader-calendar\"></div>\n</div>\n"

/***/ }),

/***/ "./src/app/components/calendar/calendar.component.ts":
/*!***********************************************************!*\
  !*** ./src/app/components/calendar/calendar.component.ts ***!
  \***********************************************************/
/*! exports provided: CalendarComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CalendarComponent", function() { return CalendarComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _services_authentication_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/authentication.service */ "./src/app/services/authentication.service.ts");
/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! date-fns */ "./node_modules/date-fns/index.js");
/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(date_fns__WEBPACK_IMPORTED_MODULE_3__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var colors = {
    red: {
        primary: '#ad2121',
        secondary: '#FAE3E3'
    },
    blue: {
        primary: '#1e90ff',
        secondary: '#D1E8FF'
    },
    yellow: {
        primary: '#e3bc08',
        secondary: '#FDF1BA'
    }
};
var MyCalendarEvent = /** @class */ (function () {
    function MyCalendarEvent() {
        this.color = colors.red;
    }
    return MyCalendarEvent;
}());
var CalendarComponent = /** @class */ (function () {
    function CalendarComponent(authenticationService, router) {
        this.authenticationService = authenticationService;
        this.router = router;
        this.view = 'month';
        this.viewDate = new Date();
        this.events = [];
        this.activeDayIsOpen = false;
        this.loadingSessions = true;
    }
    CalendarComponent.prototype.ngOnInit = function () {
        this.getAllSessions();
    };
    CalendarComponent.prototype.increment = function () {
        var addFn = {
            day: date_fns__WEBPACK_IMPORTED_MODULE_3__["addDays"],
            week: date_fns__WEBPACK_IMPORTED_MODULE_3__["addWeeks"],
            month: date_fns__WEBPACK_IMPORTED_MODULE_3__["addMonths"]
        }[this.view];
        this.viewDate = addFn(this.viewDate, 1);
        this.activeDayIsOpen = false;
    };
    CalendarComponent.prototype.decrement = function () {
        var subFn = {
            day: date_fns__WEBPACK_IMPORTED_MODULE_3__["subDays"],
            week: date_fns__WEBPACK_IMPORTED_MODULE_3__["subWeeks"],
            month: date_fns__WEBPACK_IMPORTED_MODULE_3__["subMonths"]
        }[this.view];
        this.viewDate = subFn(this.viewDate, 1);
        this.activeDayIsOpen = false;
    };
    CalendarComponent.prototype.today = function () {
        this.viewDate = new Date();
        this.activeDayIsOpen = true;
    };
    CalendarComponent.prototype.dayClicked = function (_a) {
        var date = _a.date, events = _a.events;
        if (Object(date_fns__WEBPACK_IMPORTED_MODULE_3__["isSameMonth"])(date, this.viewDate)) {
            if ((Object(date_fns__WEBPACK_IMPORTED_MODULE_3__["isSameDay"])(this.viewDate, date) && this.activeDayIsOpen === true) ||
                events.length === 0) {
                this.activeDayIsOpen = false;
            }
            else {
                this.activeDayIsOpen = true;
                this.viewDate = date;
            }
        }
    };
    CalendarComponent.prototype.getAllSessions = function () {
        var _this = this;
        var userCourses = this.authenticationService.getCurrentUser().courses;
        for (var _i = 0, userCourses_1 = userCourses; _i < userCourses_1.length; _i++) {
            var c = userCourses_1[_i];
            var _loop_1 = function (s) {
                /*By default when selecting sessions from the database their field
                "Course" is not retrieved in order to avoid inifinite recursiveness*/
                s.course = c;
                var d = void 0;
                d = new Date(s.date);
                var min = d.getMinutes();
                var minutesString = min.toString();
                if (min < 10) {
                    minutesString = "0" + minutesString;
                }
                this_1.events.push({
                    start: d,
                    title: s.title + '  |  ' + d.getHours() + ':' + minutesString,
                    color: colors.red,
                    actions: [
                        {
                            label: '<i class="material-icons calendar-event-icon">forward</i>',
                            onClick: function (_a) {
                                var event = _a.event;
                                _this.router.navigate(['/courses', s.course.id, 1]);
                            }
                        }
                    ],
                    session: s,
                });
            };
            var this_1 = this;
            for (var _a = 0, _b = c.sessions; _a < _b.length; _a++) {
                var s = _b[_a];
                _loop_1(s);
            }
        }
        this.loadingSessions = false;
    };
    CalendarComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'calendar-app',
            template: __webpack_require__(/*! ./calendar.component.html */ "./src/app/components/calendar/calendar.component.html"),
            styles: [__webpack_require__(/*! ./calendar.component.css */ "./src/app/components/calendar/calendar.component.css")]
        }),
        __metadata("design:paramtypes", [_services_authentication_service__WEBPACK_IMPORTED_MODULE_2__["AuthenticationService"], _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"]])
    ], CalendarComponent);
    return CalendarComponent;
}());



/***/ }),

/***/ "./src/app/components/chat-line/chat-line.component.css":
/*!**************************************************************!*\
  !*** ./src/app/components/chat-line/chat-line.component.css ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".outer-message {\n  display: block;\n}\n\n.system-msg {\n  color: #BDBDBD;\n  font-style: italic;\n  margin-top: 5px;\n  display: inline-block;\n  margin-bottom: 5px;\n}\n\n.own-msg {\n  text-align: right;\n}\n\n.own-msg .message-content {\n  background-color: rgba(142, 195, 168, 0.46);\n  margin-left: 15px;\n  text-align: left;\n  display: inline-block;\n  margin-top: 3px;\n  margin-bottom: 3px;\n  padding-top: 5px;\n  padding-right: 5px;\n  padding-bottom: 5px;\n  padding-left: 5px;\n  line-height: 1.3;\n}\n\n.own-msg .message-header {\n  display: block;\n  margin-top: 7px;\n}\n\n.own-msg .message-header img {\n  width: 2.7em;\n  margin-bottom: -6px;\n  background-color: #c5ddd1;\n  border-bottom-right-radius: 0% !important;\n}\n\n.stranger-msg {\n  text-align: left;\n}\n\n.stranger-msg .message-content {\n  background-color: #d0d0d0;\n  margin-right: 15px;\n  text-align: left;\n  display: inline-block;\n  margin-top: 3px;\n  margin-bottom: 3px;\n  padding-top: 5px;\n  padding-right: 5px;\n  padding-bottom: 5px;\n  padding-left: 5px;\n  line-height: 1.3;\n}\n\n.stranger-msg .message-header {\n  display: block;\n  margin-top: 7px;\n}\n\n.stranger-msg .message-header img {\n  width: 2.7em;\n  margin-bottom: -6px;\n  background-color: #d0d0d0;\n  border-bottom-left-radius: 0% !important;\n}\n\n.user-name {\n  font-size: small;\n  font-weight: 600;\n}\n\n.user-message {\n  font-size: small;\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29tcG9uZW50cy9jaGF0LWxpbmUvY2hhdC1saW5lLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxjQUFjO0FBQ2hCOztBQUVBO0VBQ0UsY0FBYztFQUNkLGtCQUFrQjtFQUNsQixlQUFlO0VBQ2YscUJBQXFCO0VBQ3JCLGtCQUFrQjtBQUNwQjs7QUFFQTtFQUNFLGlCQUFpQjtBQUNuQjs7QUFFQTtFQUNFLDJDQUEyQztFQUMzQyxpQkFBaUI7RUFDakIsZ0JBQWdCO0VBQ2hCLHFCQUFxQjtFQUNyQixlQUFlO0VBQ2Ysa0JBQWtCO0VBQ2xCLGdCQUFnQjtFQUNoQixrQkFBa0I7RUFDbEIsbUJBQW1CO0VBQ25CLGlCQUFpQjtFQUNqQixnQkFBZ0I7QUFDbEI7O0FBRUE7RUFDRSxjQUFjO0VBQ2QsZUFBZTtBQUNqQjs7QUFFQTtFQUNFLFlBQVk7RUFDWixtQkFBbUI7RUFDbkIseUJBQXlCO0VBQ3pCLHlDQUF5QztBQUMzQzs7QUFFQTtFQUNFLGdCQUFnQjtBQUNsQjs7QUFFQTtFQUNFLHlCQUF5QjtFQUN6QixrQkFBa0I7RUFDbEIsZ0JBQWdCO0VBQ2hCLHFCQUFxQjtFQUNyQixlQUFlO0VBQ2Ysa0JBQWtCO0VBQ2xCLGdCQUFnQjtFQUNoQixrQkFBa0I7RUFDbEIsbUJBQW1CO0VBQ25CLGlCQUFpQjtFQUNqQixnQkFBZ0I7QUFDbEI7O0FBRUE7RUFDRSxjQUFjO0VBQ2QsZUFBZTtBQUNqQjs7QUFFQTtFQUNFLFlBQVk7RUFDWixtQkFBbUI7RUFDbkIseUJBQXlCO0VBQ3pCLHdDQUF3QztBQUMxQzs7QUFFQTtFQUNFLGdCQUFnQjtFQUNoQixnQkFBZ0I7QUFDbEI7O0FBRUE7RUFDRSxnQkFBZ0I7QUFDbEIiLCJmaWxlIjoic3JjL2FwcC9jb21wb25lbnRzL2NoYXQtbGluZS9jaGF0LWxpbmUuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi5vdXRlci1tZXNzYWdlIHtcbiAgZGlzcGxheTogYmxvY2s7XG59XG5cbi5zeXN0ZW0tbXNnIHtcbiAgY29sb3I6ICNCREJEQkQ7XG4gIGZvbnQtc3R5bGU6IGl0YWxpYztcbiAgbWFyZ2luLXRvcDogNXB4O1xuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gIG1hcmdpbi1ib3R0b206IDVweDtcbn1cblxuLm93bi1tc2cge1xuICB0ZXh0LWFsaWduOiByaWdodDtcbn1cblxuLm93bi1tc2cgLm1lc3NhZ2UtY29udGVudCB7XG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMTQyLCAxOTUsIDE2OCwgMC40Nik7XG4gIG1hcmdpbi1sZWZ0OiAxNXB4O1xuICB0ZXh0LWFsaWduOiBsZWZ0O1xuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gIG1hcmdpbi10b3A6IDNweDtcbiAgbWFyZ2luLWJvdHRvbTogM3B4O1xuICBwYWRkaW5nLXRvcDogNXB4O1xuICBwYWRkaW5nLXJpZ2h0OiA1cHg7XG4gIHBhZGRpbmctYm90dG9tOiA1cHg7XG4gIHBhZGRpbmctbGVmdDogNXB4O1xuICBsaW5lLWhlaWdodDogMS4zO1xufVxuXG4ub3duLW1zZyAubWVzc2FnZS1oZWFkZXIge1xuICBkaXNwbGF5OiBibG9jaztcbiAgbWFyZ2luLXRvcDogN3B4O1xufVxuXG4ub3duLW1zZyAubWVzc2FnZS1oZWFkZXIgaW1nIHtcbiAgd2lkdGg6IDIuN2VtO1xuICBtYXJnaW4tYm90dG9tOiAtNnB4O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjYzVkZGQxO1xuICBib3JkZXItYm90dG9tLXJpZ2h0LXJhZGl1czogMCUgIWltcG9ydGFudDtcbn1cblxuLnN0cmFuZ2VyLW1zZyB7XG4gIHRleHQtYWxpZ246IGxlZnQ7XG59XG5cbi5zdHJhbmdlci1tc2cgLm1lc3NhZ2UtY29udGVudCB7XG4gIGJhY2tncm91bmQtY29sb3I6ICNkMGQwZDA7XG4gIG1hcmdpbi1yaWdodDogMTVweDtcbiAgdGV4dC1hbGlnbjogbGVmdDtcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICBtYXJnaW4tdG9wOiAzcHg7XG4gIG1hcmdpbi1ib3R0b206IDNweDtcbiAgcGFkZGluZy10b3A6IDVweDtcbiAgcGFkZGluZy1yaWdodDogNXB4O1xuICBwYWRkaW5nLWJvdHRvbTogNXB4O1xuICBwYWRkaW5nLWxlZnQ6IDVweDtcbiAgbGluZS1oZWlnaHQ6IDEuMztcbn1cblxuLnN0cmFuZ2VyLW1zZyAubWVzc2FnZS1oZWFkZXIge1xuICBkaXNwbGF5OiBibG9jaztcbiAgbWFyZ2luLXRvcDogN3B4O1xufVxuXG4uc3RyYW5nZXItbXNnIC5tZXNzYWdlLWhlYWRlciBpbWcge1xuICB3aWR0aDogMi43ZW07XG4gIG1hcmdpbi1ib3R0b206IC02cHg7XG4gIGJhY2tncm91bmQtY29sb3I6ICNkMGQwZDA7XG4gIGJvcmRlci1ib3R0b20tbGVmdC1yYWRpdXM6IDAlICFpbXBvcnRhbnQ7XG59XG5cbi51c2VyLW5hbWUge1xuICBmb250LXNpemU6IHNtYWxsO1xuICBmb250LXdlaWdodDogNjAwO1xufVxuXG4udXNlci1tZXNzYWdlIHtcbiAgZm9udC1zaXplOiBzbWFsbDtcbn1cbiJdfQ== */"

/***/ }),

/***/ "./src/app/components/chat-line/chat-line.component.html":
/*!***************************************************************!*\
  !*** ./src/app/components/chat-line/chat-line.component.html ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"outer-message\">\n\n  <div *ngIf=\"(this.chatLine.type === 'own-msg') || (this.chatLine.type === 'stranger-msg')\" [ngClass]=\"[this.chatLine.type]\">\n    <div class=\"message-header\">\n      <img *ngIf=\"this.chatLine.type === 'stranger-msg'\" [src]=\"this.chatLine.picture\" class=\"circle responsive-img\">\n      <span class='user-name' [style.color]=\"this.chatLine.color\">{{this.chatLine.author}}</span>\n      <img *ngIf=\"this.chatLine.type === 'own-msg'\" [src]=\"this.chatLine.picture\" class=\"circle responsive-img\">\n    </div>\n    <div class=\"message-content\">\n      <span class='user-message'>{{this.chatLine.message}}</span>\n    </div>\n  </div>\n\n  <div *ngIf=\"(this.chatLine.type === 'system-msg') || (this.chatLine.type === 'system-err')\" [ngClass]=\"[this.chatLine.type]\">\n    {{this.chatLine.message}}\n  </div>\n\n</div>\n"

/***/ }),

/***/ "./src/app/components/chat-line/chat-line.component.ts":
/*!*************************************************************!*\
  !*** ./src/app/components/chat-line/chat-line.component.ts ***!
  \*************************************************************/
/*! exports provided: ChatLineComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChatLineComponent", function() { return ChatLineComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _classes_chatline__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../classes/chatline */ "./src/app/classes/chatline.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ChatLineComponent = /** @class */ (function () {
    function ChatLineComponent() {
    }
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", _classes_chatline__WEBPACK_IMPORTED_MODULE_1__["Chatline"])
    ], ChatLineComponent.prototype, "chatLine", void 0);
    ChatLineComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-chat-line',
            template: __webpack_require__(/*! ./chat-line.component.html */ "./src/app/components/chat-line/chat-line.component.html"),
            styles: [__webpack_require__(/*! ./chat-line.component.css */ "./src/app/components/chat-line/chat-line.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], ChatLineComponent);
    return ChatLineComponent;
}());



/***/ }),

/***/ "./src/app/components/comment/comment.component.css":
/*!**********************************************************!*\
  !*** ./src/app/components/comment/comment.component.css ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".comment-div {\n  padding-left: 20px;\n}\n\n.row-margin-bottom {\n  margin-bottom: 10px;\n}\n\n.user-name {\n  display: inline-block;\n  font-size: small;\n  font-weight: 300;\n}\n\n.message {\n  display: inline-block;\n}\n\n.message-itself {\n  word-wrap: break-word;\n}\n\n.video-itself {\n  width: -webkit-fit-content;\n  width: -moz-fit-content;\n  width: fit-content;\n  border-radius: 6px;\n  overflow: hidden;\n  margin-top: 25px;\n  margin-bottom: 25px;\n  margin-left: auto;\n  margin-right: auto;\n}\n\n.video-itself video {\n  width: 500px;\n}\n\n.replay-icon {\n  font-size: 20px;\n  color: rgba(94, 97, 95, 0.51);\n  cursor: pointer;\n}\n\n.replay-icon:hover {\n  color: #91a59b;\n}\n\n.user-date-separator {\n  display: inline-block;\n  padding-right: 10px;\n  padding-left: 10px;\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29tcG9uZW50cy9jb21tZW50L2NvbW1lbnQuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGtCQUFrQjtBQUNwQjs7QUFFQTtFQUNFLG1CQUFtQjtBQUNyQjs7QUFFQTtFQUNFLHFCQUFxQjtFQUNyQixnQkFBZ0I7RUFDaEIsZ0JBQWdCO0FBQ2xCOztBQUVBO0VBQ0UscUJBQXFCO0FBQ3ZCOztBQUVBO0VBQ0UscUJBQXFCO0FBQ3ZCOztBQUVBO0VBQ0UsMEJBQWtCO0VBQWxCLHVCQUFrQjtFQUFsQixrQkFBa0I7RUFFbEIsa0JBQWtCO0VBQ2xCLGdCQUFnQjtFQUNoQixnQkFBZ0I7RUFDaEIsbUJBQW1CO0VBQ25CLGlCQUFpQjtFQUNqQixrQkFBa0I7QUFDcEI7O0FBRUE7RUFDRSxZQUFZO0FBQ2Q7O0FBRUE7RUFDRSxlQUFlO0VBQ2YsNkJBQTZCO0VBQzdCLGVBQWU7QUFDakI7O0FBRUE7RUFDRSxjQUFjO0FBQ2hCOztBQUVBO0VBQ0UscUJBQXFCO0VBQ3JCLG1CQUFtQjtFQUNuQixrQkFBa0I7QUFDcEIiLCJmaWxlIjoic3JjL2FwcC9jb21wb25lbnRzL2NvbW1lbnQvY29tbWVudC5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmNvbW1lbnQtZGl2IHtcbiAgcGFkZGluZy1sZWZ0OiAyMHB4O1xufVxuXG4ucm93LW1hcmdpbi1ib3R0b20ge1xuICBtYXJnaW4tYm90dG9tOiAxMHB4O1xufVxuXG4udXNlci1uYW1lIHtcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICBmb250LXNpemU6IHNtYWxsO1xuICBmb250LXdlaWdodDogMzAwO1xufVxuXG4ubWVzc2FnZSB7XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbn1cblxuLm1lc3NhZ2UtaXRzZWxmIHtcbiAgd29yZC13cmFwOiBicmVhay13b3JkO1xufVxuXG4udmlkZW8taXRzZWxmIHtcbiAgd2lkdGg6IGZpdC1jb250ZW50O1xuICAtbW96LWJvcmRlci1yYWRpdXM6IDZweDtcbiAgYm9yZGVyLXJhZGl1czogNnB4O1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICBtYXJnaW4tdG9wOiAyNXB4O1xuICBtYXJnaW4tYm90dG9tOiAyNXB4O1xuICBtYXJnaW4tbGVmdDogYXV0bztcbiAgbWFyZ2luLXJpZ2h0OiBhdXRvO1xufVxuXG4udmlkZW8taXRzZWxmIHZpZGVvIHtcbiAgd2lkdGg6IDUwMHB4O1xufVxuXG4ucmVwbGF5LWljb24ge1xuICBmb250LXNpemU6IDIwcHg7XG4gIGNvbG9yOiByZ2JhKDk0LCA5NywgOTUsIDAuNTEpO1xuICBjdXJzb3I6IHBvaW50ZXI7XG59XG5cbi5yZXBsYXktaWNvbjpob3ZlciB7XG4gIGNvbG9yOiAjOTFhNTliO1xufVxuXG4udXNlci1kYXRlLXNlcGFyYXRvciB7XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgcGFkZGluZy1yaWdodDogMTBweDtcbiAgcGFkZGluZy1sZWZ0OiAxMHB4O1xufVxuIl19 */"

/***/ }),

/***/ "./src/app/components/comment/comment.component.html":
/*!***********************************************************!*\
  !*** ./src/app/components/comment/comment.component.html ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"comment-div\">\n  <div class=\"row row-margin-bottom\">\n    <div class=\"col l11 m11 s11\" [class.teacher-forum]=\"isCommentTeacher(this.comment)\">\n      <div *ngIf=\"!!comment.message\" class=\"message-itself\">{{comment.message}}</div>\n      <div *ngIf=\"!!comment.videourl\" class=\"video-itself\">\n        <video [attr.id]=\"comment.videourl\" [src]=\"comment.videourl\" (mouseenter)=\"onHovering($event)\" (mouseleave)=\"onUnhovering($event)\"\n          [attr.poster]=\"comment.audioonly ? 'assets/images/volume.png' : ''\" [style.background-color]=\"comment.audioonly ? 'rgb(77,77,77)' : ''\"\n          [style.max-height]=\"comment.audioonly ? '375px' : ''\"></video>\n      </div>\n      <div class=\"user-name forum-comment-author\" [class.teacher-name]=\"isCommentTeacher(comment)\">{{comment.user.nickName}}</div>\n      <div class=\"user-date-separator\">-</div>\n      <div class=\"user-name\">{{comment.date | date}} - {{comment.date | date:'H:mm' }}</div>\n    </div>\n    <div class=\"col l1 m1 s1 no-padding-left right-align\">\n      <a href=\"#course-details-modal\" [title]=\"'Send replay'\" (click)=\"updatePostModalMode(1, 'New replay', null, this.comment, null); this.animationService.animateIfSmall()\">\n        <i class=\"material-icons replay-icon\">feedback</i>\n      </a>\n      <a href=\"#course-details-modal\" [title]=\"'Send video replay'\" (click)=\"updatePostModalMode(6, 'New video replay', null, this.comment, null); this.animationService.animateIfSmall()\">\n        <i class=\"material-icons replay-icon\">videocam</i>\n      </a>\n    </div>\n  </div>\n\n  <div *ngFor=\"let replay of comment.replies; let i = index\">\n    <app-comment [comment]=\"replay\"></app-comment>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/components/comment/comment.component.ts":
/*!*********************************************************!*\
  !*** ./src/app/components/comment/comment.component.ts ***!
  \*********************************************************/
/*! exports provided: CommentComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CommentComponent", function() { return CommentComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _classes_comment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../classes/comment */ "./src/app/classes/comment.ts");
/* harmony import */ var _services_course_details_modal_data_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/course-details-modal-data.service */ "./src/app/services/course-details-modal-data.service.ts");
/* harmony import */ var _services_animation_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../services/animation.service */ "./src/app/services/animation.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var CommentComponent = /** @class */ (function () {
    function CommentComponent(courseDetailsModalDataService, animationService) {
        this.courseDetailsModalDataService = courseDetailsModalDataService;
        this.animationService = animationService;
    }
    CommentComponent.prototype.ngOnInit = function () { };
    CommentComponent.prototype.updatePostModalMode = function (mode, title, header, commentReplay, fileGroup) {
        var objs = [mode, title, header, commentReplay, fileGroup];
        this.courseDetailsModalDataService.announcePostMode(objs);
    };
    CommentComponent.prototype.isCommentTeacher = function (comment) {
        return (comment.user.roles.indexOf('ROLE_TEACHER') > -1);
    };
    CommentComponent.prototype.onHovering = function (event) {
        $(event.target).attr("controls", "");
    };
    CommentComponent.prototype.onUnhovering = function (event) {
        $(event.target).removeAttr("controls");
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", _classes_comment__WEBPACK_IMPORTED_MODULE_1__["Comment"])
    ], CommentComponent.prototype, "comment", void 0);
    CommentComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-comment',
            template: __webpack_require__(/*! ./comment.component.html */ "./src/app/components/comment/comment.component.html"),
            styles: [__webpack_require__(/*! ./comment.component.css */ "./src/app/components/comment/comment.component.css")]
        }),
        __metadata("design:paramtypes", [_services_course_details_modal_data_service__WEBPACK_IMPORTED_MODULE_2__["CourseDetailsModalDataService"], _services_animation_service__WEBPACK_IMPORTED_MODULE_3__["AnimationService"]])
    ], CommentComponent);
    return CommentComponent;
}());



/***/ }),

/***/ "./src/app/components/course-details/course-details.component.css":
/*!************************************************************************!*\
  !*** ./src/app/components/course-details/course-details.component.css ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "#tabs-course-details{\n  margin-bottom: 30px;\n}\n\n/*Text editor*/\n\n.ql-editor-custom {\n  box-sizing: initial;\n  cursor: initial;\n  line-height: initial;\n  height: initial;\n  outline: initial;\n  overflow-y: initial;\n  padding: 20px;\n  -o-tab-size: initial;\n     tab-size: initial;\n  -moz-tab-size: initial;\n  text-align: initial;\n  white-space: initial;\n  word-wrap: initial;\n}\n\n#textEditorRowButtons{\n  padding-top: 10px;\n  margin: 0;\n}\n\n/*Text editor*/\n\n.course-detail-div {\n  padding-top: 30px;\n}\n\n.comments-col{\n  padding-left: 0;\n}\n\n.tab-template-content {\n  width: 100%;\n  height: 100%;\n  padding: 15px 15px 15px 15px;\n}\n\n.tab-template-content-2 {\n  width: inherit !important;\n  height: inherit !important;\n  padding: 15px 15px 15px 15px;\n}\n\n.md-tab-label-aux {\n  width: 100%;\n  height: 100%;\n}\n\n.md-tab-label-aux:hover {\n  color: #375646;\n}\n\n.md-tab-label-aux i {\n  padding-top: 10px;\n}\n\na.btn-floating {\n  background-color: #e0e0e0;\n}\n\n.delete-attenders-div {\n  float: right;\n  padding-right: 10px;\n  height: 30px;\n}\n\n.del-attender-icon {\n  cursor: pointer;\n}\n\n.del-attender-icon:hover {\n  color: #91a59b;\n}\n\n.user-attender-row {\n  background-color: #f3f3f3;\n  border-radius: 3px;\n  margin-top: 10px !important;\n  margin-bottom: 5px !important;\n}\n\n.att-row-padding {\n  padding: 20px;\n}\n\n.att-info-tooltip {\n  cursor: pointer;\n}\n\n#tooltip-file{\n  position: absolute;\n  margin-left: 10px;\n  margin-top: 10px;\n}\n\n/*Forum view*/\n\n.entries-side-view {\n  height: 100%;\n}\n\n#entries-sml-btn {\n  color: #375646;\n  cursor: pointer;\n}\n\n#entries-sml-btn:hover {\n  color: #91a59b;\n}\n\n.session-data {\n  padding: 25px 25px 25px 25px;\n  display: list-item !important;\n  transition: all .2s ease-out !important;\n}\n\n.session-data a {\n  color: inherit !important;\n}\n\n.session-title {\n  font-weight: bold;\n  font-size: 20px;\n}\n\n.entry-row-sep {\n  margin-bottom: 10px !important;\n}\n\n.entry-title {\n  cursor: pointer;\n  padding: 8px 0 8px 0;\n  display: list-item !important;\n  transition: all .2s ease-out !important;\n}\n\n.entry-title:hover {\n  background-color: rgba(224, 224, 224, 0.5);\n}\n\n.entry-title a {\n  color: #375646;\n  font-weight: bold;\n}\n\n.user-name {\n  display: inline-block;\n  font-size: small;\n  font-weight: 300;\n}\n\n.user-date-separator {\n  display: inline-block;\n  padding-right: 10px;\n  padding-left: 10px;\n}\n\n.user-date-column {\n  text-align: right;\n}\n\n.last-comment-row {\n  font-size: 13px;\n  font-weight: 300;\n  color: #375345;\n}\n\n.entry-user {\n  display: inline-block;\n  font-size: small;\n  font-weight: 500;\n}\n\n.comment-section-title {\n  font-weight: bold;\n}\n\n.comment-block {\n  padding: 8px 0 4px 0;\n}\n\n.comment-divider {\n  border-bottom: 1px solid #e0e0e0;\n}\n\n.forum-icon {\n  font-size: 22px;\n  color: #5e615f;\n  cursor: pointer;\n}\n\n.forum-icon:hover {\n  color: #91a59b;\n}\n\n.back-icon {\n  font-size: 28px;\n  color: #375646;\n  cursor: pointer;\n}\n\n.div-entry-icon {\n  padding-top: 10px;\n}\n\n.course-title {\n  font-weight: 300;\n}\n\n#inputDate {\n  cursor: pointer;\n}\n\n#inputTime {\n  cursor: pointer;\n}\n\n.userImage {\n  display: inline !important;\n}\n\n.attender-col {\n  margin: inherit !important;\n}\n\n.p-name{\n  font-size: small;\n  color: #828282;\n}\n\n#record-form-div {\n  margin-top: 10px;\n  margin-bottom: 30px;\n}\n\n#record-error-div {\n  margin-top: 20px;\n}\n\n@media only screen and (max-width: 600px) and (orientation: portrait), screen and (max-width: 992px) and (orientation: landscape) {\n  .p-nickName {\n    margin: 0;\n  }\n\n  .p-name {\n    font-size: small;\n    color: #828282;\n    margin: 0;\n  }\n}\n\n@media only screen and (min-width: 993px) {\n  .userImage {\n    width: 70px;\n    height: 70px;\n  }\n}\n\n@media only screen and (max-width: 992px) {\n  .userImage {\n    width: 45px;\n    height: 45px;\n  }\n}\n\n/*Active Session*/\n\n.session-ready{\n  background-color: rgba(55, 86, 70, 0.15);\n  cursor: pointer;\n}\n\n@keyframes sessionReadyFrames{\n  0% {\n    -webkit-transform:  scaleX(1.00) scaleY(1.00) ;\n            transform:  scaleX(1.00) scaleY(1.00) ;\n  }\n  50% {\n    -webkit-transform:  scaleX(1.06) scaleY(1.06) ;\n            transform:  scaleX(1.06) scaleY(1.06) ;\n  }\n  100% {\n    -webkit-transform:  scaleX(1.00) scaleY(1.00) ;\n            transform:  scaleX(1.00) scaleY(1.00) ;\n  }\n}\n\n@-webkit-keyframes sessionReadyFrames {\n  0% {\n    -webkit-transform:  scaleX(1.00) scaleY(1.00) ;\n  }\n  50% {\n    -webkit-transform:  scaleX(1.06) scaleY(1.06) ;\n  }\n  100% {\n    -webkit-transform:  scaleX(1.00) scaleY(1.00) ;\n  }\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29tcG9uZW50cy9jb3Vyc2UtZGV0YWlscy9jb3Vyc2UtZGV0YWlscy5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsbUJBQW1CO0FBQ3JCOztBQUVBLGNBQWM7O0FBQ2Q7RUFDRSxtQkFBbUI7RUFDbkIsZUFBZTtFQUNmLG9CQUFvQjtFQUNwQixlQUFlO0VBQ2YsZ0JBQWdCO0VBQ2hCLG1CQUFtQjtFQUNuQixhQUFhO0VBQ2Isb0JBQWlCO0tBQWpCLGlCQUFpQjtFQUNqQixzQkFBc0I7RUFDdEIsbUJBQW1CO0VBQ25CLG9CQUFvQjtFQUNwQixrQkFBa0I7QUFDcEI7O0FBRUE7RUFDRSxpQkFBaUI7RUFDakIsU0FBUztBQUNYOztBQUNBLGNBQWM7O0FBRWQ7RUFDRSxpQkFBaUI7QUFDbkI7O0FBRUE7RUFDRSxlQUFlO0FBQ2pCOztBQUVBO0VBQ0UsV0FBVztFQUNYLFlBQVk7RUFDWiw0QkFBNEI7QUFDOUI7O0FBRUE7RUFDRSx5QkFBeUI7RUFDekIsMEJBQTBCO0VBQzFCLDRCQUE0QjtBQUM5Qjs7QUFFQTtFQUNFLFdBQVc7RUFDWCxZQUFZO0FBQ2Q7O0FBRUE7RUFDRSxjQUFjO0FBQ2hCOztBQUVBO0VBQ0UsaUJBQWlCO0FBQ25COztBQUVBO0VBQ0UseUJBQXlCO0FBQzNCOztBQUVBO0VBQ0UsWUFBWTtFQUNaLG1CQUFtQjtFQUNuQixZQUFZO0FBQ2Q7O0FBRUE7RUFDRSxlQUFlO0FBQ2pCOztBQUVBO0VBQ0UsY0FBYztBQUNoQjs7QUFFQTtFQUNFLHlCQUF5QjtFQUN6QixrQkFBa0I7RUFDbEIsMkJBQTJCO0VBQzNCLDZCQUE2QjtBQUMvQjs7QUFFQTtFQUNFLGFBQWE7QUFDZjs7QUFFQTtFQUNFLGVBQWU7QUFDakI7O0FBRUE7RUFDRSxrQkFBa0I7RUFDbEIsaUJBQWlCO0VBQ2pCLGdCQUFnQjtBQUNsQjs7QUFFQSxhQUFhOztBQUViO0VBQ0UsWUFBWTtBQUNkOztBQUVBO0VBQ0UsY0FBYztFQUNkLGVBQWU7QUFDakI7O0FBRUE7RUFDRSxjQUFjO0FBQ2hCOztBQUVBO0VBQ0UsNEJBQTRCO0VBQzVCLDZCQUE2QjtFQUM3Qix1Q0FBdUM7QUFDekM7O0FBRUE7RUFDRSx5QkFBeUI7QUFDM0I7O0FBRUE7RUFDRSxpQkFBaUI7RUFDakIsZUFBZTtBQUNqQjs7QUFFQTtFQUNFLDhCQUE4QjtBQUNoQzs7QUFFQTtFQUNFLGVBQWU7RUFDZixvQkFBb0I7RUFDcEIsNkJBQTZCO0VBQzdCLHVDQUF1QztBQUN6Qzs7QUFFQTtFQUNFLDBDQUEwQztBQUM1Qzs7QUFFQTtFQUNFLGNBQWM7RUFDZCxpQkFBaUI7QUFDbkI7O0FBRUE7RUFDRSxxQkFBcUI7RUFDckIsZ0JBQWdCO0VBQ2hCLGdCQUFnQjtBQUNsQjs7QUFFQTtFQUNFLHFCQUFxQjtFQUNyQixtQkFBbUI7RUFDbkIsa0JBQWtCO0FBQ3BCOztBQUVBO0VBQ0UsaUJBQWlCO0FBQ25COztBQUVBO0VBQ0UsZUFBZTtFQUNmLGdCQUFnQjtFQUNoQixjQUFjO0FBQ2hCOztBQUVBO0VBQ0UscUJBQXFCO0VBQ3JCLGdCQUFnQjtFQUNoQixnQkFBZ0I7QUFDbEI7O0FBRUE7RUFDRSxpQkFBaUI7QUFDbkI7O0FBRUE7RUFDRSxvQkFBb0I7QUFDdEI7O0FBRUE7RUFDRSxnQ0FBZ0M7QUFDbEM7O0FBRUE7RUFDRSxlQUFlO0VBQ2YsY0FBYztFQUNkLGVBQWU7QUFDakI7O0FBRUE7RUFDRSxjQUFjO0FBQ2hCOztBQUVBO0VBQ0UsZUFBZTtFQUNmLGNBQWM7RUFDZCxlQUFlO0FBQ2pCOztBQUVBO0VBQ0UsaUJBQWlCO0FBQ25COztBQUVBO0VBQ0UsZ0JBQWdCO0FBQ2xCOztBQUVBO0VBQ0UsZUFBZTtBQUNqQjs7QUFFQTtFQUNFLGVBQWU7QUFDakI7O0FBRUE7RUFDRSwwQkFBMEI7QUFDNUI7O0FBRUE7RUFDRSwwQkFBMEI7QUFDNUI7O0FBRUE7RUFDRSxnQkFBZ0I7RUFDaEIsY0FBYztBQUNoQjs7QUFFQTtFQUNFLGdCQUFnQjtFQUNoQixtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSxnQkFBZ0I7QUFDbEI7O0FBRUE7RUFDRTtJQUNFLFNBQVM7RUFDWDs7RUFFQTtJQUNFLGdCQUFnQjtJQUNoQixjQUFjO0lBQ2QsU0FBUztFQUNYO0FBQ0Y7O0FBRUE7RUFDRTtJQUNFLFdBQVc7SUFDWCxZQUFZO0VBQ2Q7QUFDRjs7QUFFQTtFQUNFO0lBQ0UsV0FBVztJQUNYLFlBQVk7RUFDZDtBQUNGOztBQUVBLGlCQUFpQjs7QUFDakI7RUFDRSx3Q0FBd0M7RUFDeEMsZUFBZTtBQUNqQjs7QUFFQTtFQUNFO0lBQ0UsOENBQXNDO1lBQXRDLHNDQUFzQztFQUN4QztFQUNBO0lBQ0UsOENBQXNDO1lBQXRDLHNDQUFzQztFQUN4QztFQUNBO0lBQ0UsOENBQXNDO1lBQXRDLHNDQUFzQztFQUN4QztBQUNGOztBQWNBO0VBQ0U7SUFDRSw4Q0FBOEM7RUFDaEQ7RUFDQTtJQUNFLDhDQUE4QztFQUNoRDtFQUNBO0lBQ0UsOENBQThDO0VBQ2hEO0FBQ0YiLCJmaWxlIjoic3JjL2FwcC9jb21wb25lbnRzL2NvdXJzZS1kZXRhaWxzL2NvdXJzZS1kZXRhaWxzLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIjdGFicy1jb3Vyc2UtZGV0YWlsc3tcbiAgbWFyZ2luLWJvdHRvbTogMzBweDtcbn1cblxuLypUZXh0IGVkaXRvciovXG4ucWwtZWRpdG9yLWN1c3RvbSB7XG4gIGJveC1zaXppbmc6IGluaXRpYWw7XG4gIGN1cnNvcjogaW5pdGlhbDtcbiAgbGluZS1oZWlnaHQ6IGluaXRpYWw7XG4gIGhlaWdodDogaW5pdGlhbDtcbiAgb3V0bGluZTogaW5pdGlhbDtcbiAgb3ZlcmZsb3cteTogaW5pdGlhbDtcbiAgcGFkZGluZzogMjBweDtcbiAgdGFiLXNpemU6IGluaXRpYWw7XG4gIC1tb3otdGFiLXNpemU6IGluaXRpYWw7XG4gIHRleHQtYWxpZ246IGluaXRpYWw7XG4gIHdoaXRlLXNwYWNlOiBpbml0aWFsO1xuICB3b3JkLXdyYXA6IGluaXRpYWw7XG59XG5cbiN0ZXh0RWRpdG9yUm93QnV0dG9uc3tcbiAgcGFkZGluZy10b3A6IDEwcHg7XG4gIG1hcmdpbjogMDtcbn1cbi8qVGV4dCBlZGl0b3IqL1xuXG4uY291cnNlLWRldGFpbC1kaXYge1xuICBwYWRkaW5nLXRvcDogMzBweDtcbn1cblxuLmNvbW1lbnRzLWNvbHtcbiAgcGFkZGluZy1sZWZ0OiAwO1xufVxuXG4udGFiLXRlbXBsYXRlLWNvbnRlbnQge1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiAxMDAlO1xuICBwYWRkaW5nOiAxNXB4IDE1cHggMTVweCAxNXB4O1xufVxuXG4udGFiLXRlbXBsYXRlLWNvbnRlbnQtMiB7XG4gIHdpZHRoOiBpbmhlcml0ICFpbXBvcnRhbnQ7XG4gIGhlaWdodDogaW5oZXJpdCAhaW1wb3J0YW50O1xuICBwYWRkaW5nOiAxNXB4IDE1cHggMTVweCAxNXB4O1xufVxuXG4ubWQtdGFiLWxhYmVsLWF1eCB7XG4gIHdpZHRoOiAxMDAlO1xuICBoZWlnaHQ6IDEwMCU7XG59XG5cbi5tZC10YWItbGFiZWwtYXV4OmhvdmVyIHtcbiAgY29sb3I6ICMzNzU2NDY7XG59XG5cbi5tZC10YWItbGFiZWwtYXV4IGkge1xuICBwYWRkaW5nLXRvcDogMTBweDtcbn1cblxuYS5idG4tZmxvYXRpbmcge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZTBlMGUwO1xufVxuXG4uZGVsZXRlLWF0dGVuZGVycy1kaXYge1xuICBmbG9hdDogcmlnaHQ7XG4gIHBhZGRpbmctcmlnaHQ6IDEwcHg7XG4gIGhlaWdodDogMzBweDtcbn1cblxuLmRlbC1hdHRlbmRlci1pY29uIHtcbiAgY3Vyc29yOiBwb2ludGVyO1xufVxuXG4uZGVsLWF0dGVuZGVyLWljb246aG92ZXIge1xuICBjb2xvcjogIzkxYTU5Yjtcbn1cblxuLnVzZXItYXR0ZW5kZXItcm93IHtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2YzZjNmMztcbiAgYm9yZGVyLXJhZGl1czogM3B4O1xuICBtYXJnaW4tdG9wOiAxMHB4ICFpbXBvcnRhbnQ7XG4gIG1hcmdpbi1ib3R0b206IDVweCAhaW1wb3J0YW50O1xufVxuXG4uYXR0LXJvdy1wYWRkaW5nIHtcbiAgcGFkZGluZzogMjBweDtcbn1cblxuLmF0dC1pbmZvLXRvb2x0aXAge1xuICBjdXJzb3I6IHBvaW50ZXI7XG59XG5cbiN0b29sdGlwLWZpbGV7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgbWFyZ2luLWxlZnQ6IDEwcHg7XG4gIG1hcmdpbi10b3A6IDEwcHg7XG59XG5cbi8qRm9ydW0gdmlldyovXG5cbi5lbnRyaWVzLXNpZGUtdmlldyB7XG4gIGhlaWdodDogMTAwJTtcbn1cblxuI2VudHJpZXMtc21sLWJ0biB7XG4gIGNvbG9yOiAjMzc1NjQ2O1xuICBjdXJzb3I6IHBvaW50ZXI7XG59XG5cbiNlbnRyaWVzLXNtbC1idG46aG92ZXIge1xuICBjb2xvcjogIzkxYTU5Yjtcbn1cblxuLnNlc3Npb24tZGF0YSB7XG4gIHBhZGRpbmc6IDI1cHggMjVweCAyNXB4IDI1cHg7XG4gIGRpc3BsYXk6IGxpc3QtaXRlbSAhaW1wb3J0YW50O1xuICB0cmFuc2l0aW9uOiBhbGwgLjJzIGVhc2Utb3V0ICFpbXBvcnRhbnQ7XG59XG5cbi5zZXNzaW9uLWRhdGEgYSB7XG4gIGNvbG9yOiBpbmhlcml0ICFpbXBvcnRhbnQ7XG59XG5cbi5zZXNzaW9uLXRpdGxlIHtcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gIGZvbnQtc2l6ZTogMjBweDtcbn1cblxuLmVudHJ5LXJvdy1zZXAge1xuICBtYXJnaW4tYm90dG9tOiAxMHB4ICFpbXBvcnRhbnQ7XG59XG5cbi5lbnRyeS10aXRsZSB7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgcGFkZGluZzogOHB4IDAgOHB4IDA7XG4gIGRpc3BsYXk6IGxpc3QtaXRlbSAhaW1wb3J0YW50O1xuICB0cmFuc2l0aW9uOiBhbGwgLjJzIGVhc2Utb3V0ICFpbXBvcnRhbnQ7XG59XG5cbi5lbnRyeS10aXRsZTpob3ZlciB7XG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjI0LCAyMjQsIDIyNCwgMC41KTtcbn1cblxuLmVudHJ5LXRpdGxlIGEge1xuICBjb2xvcjogIzM3NTY0NjtcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XG59XG5cbi51c2VyLW5hbWUge1xuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gIGZvbnQtc2l6ZTogc21hbGw7XG4gIGZvbnQtd2VpZ2h0OiAzMDA7XG59XG5cbi51c2VyLWRhdGUtc2VwYXJhdG9yIHtcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICBwYWRkaW5nLXJpZ2h0OiAxMHB4O1xuICBwYWRkaW5nLWxlZnQ6IDEwcHg7XG59XG5cbi51c2VyLWRhdGUtY29sdW1uIHtcbiAgdGV4dC1hbGlnbjogcmlnaHQ7XG59XG5cbi5sYXN0LWNvbW1lbnQtcm93IHtcbiAgZm9udC1zaXplOiAxM3B4O1xuICBmb250LXdlaWdodDogMzAwO1xuICBjb2xvcjogIzM3NTM0NTtcbn1cblxuLmVudHJ5LXVzZXIge1xuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gIGZvbnQtc2l6ZTogc21hbGw7XG4gIGZvbnQtd2VpZ2h0OiA1MDA7XG59XG5cbi5jb21tZW50LXNlY3Rpb24tdGl0bGUge1xuICBmb250LXdlaWdodDogYm9sZDtcbn1cblxuLmNvbW1lbnQtYmxvY2sge1xuICBwYWRkaW5nOiA4cHggMCA0cHggMDtcbn1cblxuLmNvbW1lbnQtZGl2aWRlciB7XG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjZTBlMGUwO1xufVxuXG4uZm9ydW0taWNvbiB7XG4gIGZvbnQtc2l6ZTogMjJweDtcbiAgY29sb3I6ICM1ZTYxNWY7XG4gIGN1cnNvcjogcG9pbnRlcjtcbn1cblxuLmZvcnVtLWljb246aG92ZXIge1xuICBjb2xvcjogIzkxYTU5Yjtcbn1cblxuLmJhY2staWNvbiB7XG4gIGZvbnQtc2l6ZTogMjhweDtcbiAgY29sb3I6ICMzNzU2NDY7XG4gIGN1cnNvcjogcG9pbnRlcjtcbn1cblxuLmRpdi1lbnRyeS1pY29uIHtcbiAgcGFkZGluZy10b3A6IDEwcHg7XG59XG5cbi5jb3Vyc2UtdGl0bGUge1xuICBmb250LXdlaWdodDogMzAwO1xufVxuXG4jaW5wdXREYXRlIHtcbiAgY3Vyc29yOiBwb2ludGVyO1xufVxuXG4jaW5wdXRUaW1lIHtcbiAgY3Vyc29yOiBwb2ludGVyO1xufVxuXG4udXNlckltYWdlIHtcbiAgZGlzcGxheTogaW5saW5lICFpbXBvcnRhbnQ7XG59XG5cbi5hdHRlbmRlci1jb2wge1xuICBtYXJnaW46IGluaGVyaXQgIWltcG9ydGFudDtcbn1cblxuLnAtbmFtZXtcbiAgZm9udC1zaXplOiBzbWFsbDtcbiAgY29sb3I6ICM4MjgyODI7XG59XG5cbiNyZWNvcmQtZm9ybS1kaXYge1xuICBtYXJnaW4tdG9wOiAxMHB4O1xuICBtYXJnaW4tYm90dG9tOiAzMHB4O1xufVxuXG4jcmVjb3JkLWVycm9yLWRpdiB7XG4gIG1hcmdpbi10b3A6IDIwcHg7XG59XG5cbkBtZWRpYSBvbmx5IHNjcmVlbiBhbmQgKG1heC13aWR0aDogNjAwcHgpIGFuZCAob3JpZW50YXRpb246IHBvcnRyYWl0KSwgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA5OTJweCkgYW5kIChvcmllbnRhdGlvbjogbGFuZHNjYXBlKSB7XG4gIC5wLW5pY2tOYW1lIHtcbiAgICBtYXJnaW46IDA7XG4gIH1cblxuICAucC1uYW1lIHtcbiAgICBmb250LXNpemU6IHNtYWxsO1xuICAgIGNvbG9yOiAjODI4MjgyO1xuICAgIG1hcmdpbjogMDtcbiAgfVxufVxuXG5AbWVkaWEgb25seSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDk5M3B4KSB7XG4gIC51c2VySW1hZ2Uge1xuICAgIHdpZHRoOiA3MHB4O1xuICAgIGhlaWdodDogNzBweDtcbiAgfVxufVxuXG5AbWVkaWEgb25seSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDk5MnB4KSB7XG4gIC51c2VySW1hZ2Uge1xuICAgIHdpZHRoOiA0NXB4O1xuICAgIGhlaWdodDogNDVweDtcbiAgfVxufVxuXG4vKkFjdGl2ZSBTZXNzaW9uKi9cbi5zZXNzaW9uLXJlYWR5e1xuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDU1LCA4NiwgNzAsIDAuMTUpO1xuICBjdXJzb3I6IHBvaW50ZXI7XG59XG5cbkBrZXlmcmFtZXMgc2Vzc2lvblJlYWR5RnJhbWVze1xuICAwJSB7XG4gICAgdHJhbnNmb3JtOiAgc2NhbGVYKDEuMDApIHNjYWxlWSgxLjAwKSA7XG4gIH1cbiAgNTAlIHtcbiAgICB0cmFuc2Zvcm06ICBzY2FsZVgoMS4wNikgc2NhbGVZKDEuMDYpIDtcbiAgfVxuICAxMDAlIHtcbiAgICB0cmFuc2Zvcm06ICBzY2FsZVgoMS4wMCkgc2NhbGVZKDEuMDApIDtcbiAgfVxufVxuXG5ALW1vei1rZXlmcmFtZXMgc2Vzc2lvblJlYWR5RnJhbWVze1xuICAwJSB7XG4gICAgLW1vei10cmFuc2Zvcm06ICBzY2FsZVgoMS4wMCkgc2NhbGVZKDEuMDApIDtcbiAgfVxuICA1MCUge1xuICAgIC1tb3otdHJhbnNmb3JtOiAgc2NhbGVYKDEuMDYpIHNjYWxlWSgxLjA2KSA7XG4gIH1cbiAgMTAwJSB7XG4gICAgLW1vei10cmFuc2Zvcm06ICBzY2FsZVgoMS4wMCkgc2NhbGVZKDEuMDApIDtcbiAgfVxufVxuXG5ALXdlYmtpdC1rZXlmcmFtZXMgc2Vzc2lvblJlYWR5RnJhbWVzIHtcbiAgMCUge1xuICAgIC13ZWJraXQtdHJhbnNmb3JtOiAgc2NhbGVYKDEuMDApIHNjYWxlWSgxLjAwKSA7XG4gIH1cbiAgNTAlIHtcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogIHNjYWxlWCgxLjA2KSBzY2FsZVkoMS4wNikgO1xuICB9XG4gIDEwMCUge1xuICAgIC13ZWJraXQtdHJhbnNmb3JtOiAgc2NhbGVYKDEuMDApIHNjYWxlWSgxLjAwKSA7XG4gIH1cbn1cblxuQC1vLWtleWZyYW1lcyBzZXNzaW9uUmVhZHlGcmFtZXMge1xuICAwJSB7XG4gICAgLW8tdHJhbnNmb3JtOiAgc2NhbGVYKDEuMDApIHNjYWxlWSgxLjAwKSA7XG4gIH1cbiAgNTAlIHtcbiAgICAtby10cmFuc2Zvcm06ICBzY2FsZVgoMS4wNikgc2NhbGVZKDEuMDYpIDtcbiAgfVxuICAxMDAlIHtcbiAgICAtby10cmFuc2Zvcm06ICBzY2FsZVgoMS4wMCkgc2NhbGVZKDEuMDApIDtcbiAgfVxufVxuXG5ALW1zLWtleWZyYW1lcyBzZXNzaW9uUmVhZHlGcmFtZXMge1xuICAwJSB7XG4gICAgLW1zLXRyYW5zZm9ybTogIHNjYWxlWCgxLjAwKSBzY2FsZVkoMS4wMCkgO1xuICB9XG4gIDUwJSB7XG4gICAgLW1zLXRyYW5zZm9ybTogIHNjYWxlWCgxLjA2KSBzY2FsZVkoMS4wNikgO1xuICB9XG4gIDEwMCUge1xuICAgIC1tcy10cmFuc2Zvcm06ICBzY2FsZVgoMS4wMCkgc2NhbGVZKDEuMDApIDtcbiAgfVxufVxuIl19 */"

/***/ }),

/***/ "./src/app/components/course-details/course-details.component.html":
/*!*************************************************************************!*\
  !*** ./src/app/components/course-details/course-details.component.html ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"!this.course\" class=\"loading\"></div>\n\n<div *ngIf=\"this.course\" class=\"container course-detail-div\">\n\n\n  <!--POST DIALOG-->\n  <div id=\"course-details-modal\" class=\"modal my-modal-class course-details-modal\" materialize=\"modal\" [materializeParams]=\"[{dismissible: false}]\" [materializeActions]=\"actions2\">\n\n    <div *ngIf=\"processingPost\" class=\"loading\"></div>\n\n    <div class=\"modal-content\" [class.filtered]=\"processingPost\">\n      <p class=\"p-bold-modal-header\">{{this.postModalTitle}}</p>\n      <h5 *ngIf=\"isCurrentPostMode(['1', '6'])\">{{this.postModalEntry?.title}}</h5>\n      <p *ngIf=\"isCurrentPostMode(['1', '6'])\">{{this.postModalCommentReplay?.message}}</p>\n      <div class=\"row no-margin\">\n\n        <form materialize #courseDetailsForm id=\"courseDetailsForm\" class=\"col s12\" (ngSubmit)=\"onCourseDetailsSubmit(); courseDetailsForm.reset();\">\n          <div class=\"row no-margin\">\n\n            <div *ngIf=\"isCurrentPostMode(['0', '2', '3', '4'])\" class=\"row row-mobile\">\n              <div class=\"input-field col s12\">\n                <input [(ngModel)]=\"inputTitle\" name=\"inputTitle\" id=\"input-post-title\" type=\"text\" class=\"validate\" autocomplete=\"off\" required>\n                <label *ngIf=\"isCurrentPostMode(['0', '3'])\" for=\"inputTitle\">Entry title</label>\n                <label *ngIf=\"isCurrentPostMode(['2'])\" for=\"inputTitle\">Session title</label>\n                <label *ngIf=\"isCurrentPostMode(['4'])\" for=\"inputTitle\">File group title</label>\n              </div>\n            </div>\n\n            <div *ngIf=\"isCurrentPostMode(['0', '1', '2'])\" class=\"row row-mobile\">\n              <div class=\"input-field col s12\">\n                <textarea maxlength=\"2500\" [(ngModel)]=\"inputComment\" name=\"inputComment\" id=\"input-post-comment\" class=\"materialize-textarea validate\" required></textarea>\n                <label *ngIf=\"isCurrentPostMode(['0', '1'])\" for=\"inputComment\">Write your comment here</label>\n                <label *ngIf=\"isCurrentPostMode(['2'])\" for=\"inputComment\">Description</label>\n              </div>\n            </div>\n\n            <div *ngIf=\"isCurrentPostMode(['3', '6'])\" class=\"row row-mobile\">\n              <div class=\"col s12 center-align\">\n                <a *ngIf=\"!this.publisher\" (click)=\"recordVideo(this.getPublisherOptions('video'))\" class=\"waves-effect waves-light btn\">Record video</a>\n                <div *ngIf=\"!this.publisherErrorMessage\">\n                  <div id=\"record-form-div\">\n                    <form *ngIf=\"!!this.publisher\">\n                        <input name=\"record-radio\" type=\"radio\" id=\"record-video\" value=\"video\" checked (change)=\"recordRadioChange($event)\" [disabled]=\"!recordRadioEnabled\"/>\n                        <label for=\"record-video\">Video</label>\n                        <input name=\"record-radio\" type=\"radio\" id=\"record-audio\" value=\"audio\" (change)=\"recordRadioChange($event)\" [disabled]=\"!recordRadioEnabled\"/>\n                        <label for=\"record-audio\">Audio</label>\n                        <input name=\"record-radio\" type=\"radio\" id=\"record-screen\" value=\"screen\" (change)=\"recordRadioChange($event)\" [disabled]=\"!recordRadioEnabled\"/>\n                        <label for=\"record-screen\">Screen</label>\n                    </form>\n                  </div>\n                  <div id=\"post-video\"></div>\n                </div>\n                <div id=\"record-error-div\" *ngIf=\"!!this.publisherErrorMessage\">\n                  <app-error-message (eventShowable)=\"cleanRecording()\" [errorTitle]=\"'Error when initializing a Publisher!'\" [errorContent]=\"publisherErrorMessage\" [customClass]=\"'fail'\" [closable]=\"true\"></app-error-message>\n                </div>\n              </div>\n            </div>\n\n            <div class=\"row no-margin\">\n              <div class=\"col l6 m6 s6\">\n                <div *ngIf=\"isCurrentPostMode(['2'])\" class=\"row\">\n                  <label for=\"inputDate\">Date</label>\n                  <div class=\"input-field col s12\">\n                    <input [(ngModel)]=\"inputDate\" name=\"inputDate\" id=\"input-post-date\" type=\"date\" required>\n                  </div>\n                </div>\n              </div>\n              <div class=\"col l6 m6 s6\">\n                <div *ngIf=\"isCurrentPostMode(['2'])\" class=\"row\">\n                  <label for=\"inputTime\">Time</label>\n                  <div class=\"input-field col s12\">\n                    <input type=\"time\" [(ngModel)]=\"inputTime\" name=\"inputTime\" id=\"input-post-time\" class=\"validate\" required>\n                  </div>\n                </div>\n              </div>\n            </div>\n\n            <div *ngIf=\"isCurrentPostMode(['5'])\" class=\"row\">\n\n              <app-file-uploader (onCompleteFileUpload)=\"filesUploadCompleted($event)\" (onUploadStarted)=\"filesUploadStarted($event)\" [uniqueID]=\"1\" [isMultiple]=\"true\" [URLUPLOAD]=\"this.url_file_upload\" [typeOfFile]=\"'files'\" [buttonText]=\"'Select files'\"></app-file-uploader>\n\n            </div>\n\n          </div>\n          <div class=\"row no-margin-bottom right-align\">\n            <a *ngIf=\"!isCurrentPostMode(['5'])\" (click)=\"courseDetailsForm.reset(); this.cleanRecording()\" class=\"modal-action modal-close waves-effect btn-flat modal-footer-button cancel-modal-btn\">Cancel</a>\n            <a *ngIf=\"isCurrentPostMode(['5'])\" (click)=\"courseDetailsForm.reset(); this.uploaderModalService.announceUploaderClosed(true);\" id=\"close-upload-modal-btn\" class=\"modal-action modal-close waves-effect btn-flat modal-footer-button\">Close</a>\n            <button id=\"post-modal-btn\" *ngIf=\"!isCurrentPostMode(['5', '3'])\" type=\"submit\" class=\"waves-effect btn-flat modal-footer-button\">Send</button>\n          </div>\n        </form>\n\n      </div>\n    </div>\n  </div>\n  <!--POST DIALOG-->\n\n\n\n  <!--PUT/DELETE DIALOG-->\n  <div *ngIf=\"this.authenticationService.isTeacher()\" id=\"put-delete-modal\" class=\"modal my-modal-class course-details-modal\" materialize=\"modal\" [materializeParams]=\"[{dismissible: false}]\" [materializeActions]=\"actions3\">\n\n    <div *ngIf=\"processingPut\" class=\"loading\"></div>\n\n    <div class=\"modal-content\" [class.filtered]=\"processingPut\">\n      <p class=\"p-bold-modal-header\">{{this.putdeleteModalTitle}}</p>\n      <div class=\"row no-margin\">\n\n        <form materialize #putDeleteForm class=\"col s12\" (ngSubmit)=\"onPutDeleteSubmit(); putDeleteForm.reset(); this.allowSessionDeletion = false;\">\n\n          <div *ngIf=\"isCurrentPutdeleteMode(['0'])\" class=\"row no-margin\">\n            <div class=\"row row-mobile\">\n              <label for=\"inputSessionTitle\">Session title</label>\n              <div class=\"input-field col s12\">\n                <input [(ngModel)]=\"inputSessionTitle\" name=\"inputSessionTitle\" id=\"input-put-title\" type=\"text\" class=\"validate\" required>\n              </div>\n            </div>\n\n            <div class=\"row row-mobile\">\n              <label for=\"inputSessionDescription\">Description</label>\n              <div class=\"input-field col s12\">\n                <textarea [(ngModel)]=\"inputSessionDescription\" name=\"inputSessionDescription\" id=\"input-put-comment\" class=\"materialize-textarea validate\" required></textarea>\n              </div>\n            </div>\n\n            <div class=\"row\">\n              <div class=\"col l6 m6 s6\">\n                <div class=\"row row-mobile\">\n                  <label for=\"inputSessionDate\">Date</label>\n                  <div class=\"input-field col s12\">\n                    <input [(ngModel)]=\"this.updatedSessionDate\" name=\"inputSessionDate\" id=\"input-put-date\" type=\"date\" [value]=\"this.updatedSessionDate\" required>\n                  </div>\n                </div>\n              </div>\n              <div class=\"col l6 m6 s6\">\n                <div class=\"row row-mobile\">\n                  <label for=\"inputSessionTime\">Time</label>\n                  <div class=\"input-field col s12\">\n                    <input [(ngModel)]=\"this.inputSessionTime\" type=\"time\" name=\"inputSessionTime\" id=\"input-put-time\" class=\"validate\" [value]=\"this.inputSessionTime\" required>\n                  </div>\n                </div>\n              </div>\n            </div>\n          </div>\n\n          <div *ngIf=\"isCurrentPutdeleteMode(['1'])\" class=\"row no-margin-lateral\">\n            <input #forumCheckbox type=\"checkbox\" class=\"filled-in\" id=\"delete-checkbox\" name=\"delete-checkbox\" (change)=\"this.allowForumEdition = forumCheckbox.checked\"/>\n            <label for=\"delete-checkbox\" id=\"label-forum-checkbox\">Allow forum {{this.checkboxForumEdition}}?</label>\n          </div>\n\n          <div *ngIf=\"isCurrentPutdeleteMode(['2', '3'])\" class=\"row no-margin\">\n            <div class=\"row\">\n              <label *ngIf=\"isCurrentPutdeleteMode(['2'])\" for=\"inputFileTitle\">File group title</label>\n              <label *ngIf=\"isCurrentPutdeleteMode(['3'])\" for=\"inputFileTitle\">File name</label>\n              <div class=\"input-field col s12\">\n                <input [(ngModel)]=\"inputFileTitle\" name=\"inputFileTitle\" id=\"input-file-title\" type=\"text\" class=\"validate\" required>\n              </div>\n            </div>\n          </div>\n\n          <div *ngIf=\"isCurrentPutdeleteMode(['4'])\" id=\"tabs-attenders\" class=\"row no-margin\">\n            <mat-tab-group [(selectedIndex)]=\"this.attenderTabSelected\">\n              <mat-tab>\n                <ng-template mat-tab-label><div class=\"mat-tab-label-aux waves-effect\">SIMPLE</div></ng-template>\n                <ng-template matTabContent>\n                  <div class=\"row no-margin att-row-padding\">\n                    <div class=\"input-field col s12\">\n                      <input [(ngModel)]=\"inputAttenderSimple\" name=\"inputAttenderSimple\" id=\"input-attender-simple\" type=\"email\" class=\"validate\" required>\n                      <label for=\"inputAttenderSimple\">Attender email</label>\n                    </div>\n                  </div>\n                </ng-template>\n              </mat-tab>\n              <mat-tab>\n                <ng-template mat-tab-label><div class=\"mat-tab-label-aux waves-effect\">MULTIPLE</div></ng-template>\n                <ng-template matTabContent>\n                  <div class=\"row no-margin att-row-padding\">\n                    <i materialize=\"tooltip\" class=\"material-icons tooltipped att-info-tooltip\" data-position=\"right\" data-delay=\"65\" data-html=\"true\" data-tooltip=\"<p class='att-tooltip-text'>We always separate by <b>WHITE SPACES</b><br>and <b>NEW LINES</b>. If there's any other<br>combination of characters that should<br>be taken into account as separator,<br>include it here</p>\">info</i>\n                    <div class=\"input-field col l4 m4 s6\">\n                      <input [(ngModel)]=\"inputAttenderSeparator\" name=\"inputAttenderSeparator\" id=\"input-attender-separator\" type=\"text\" class=\"validate\">\n                      <label for=\"inputAttenderSeparator\">SEPARATOR</label>\n                    </div>\n                    <div class=\"input-field col s12\">\n                      <textarea maxlength=\"1500\" [(ngModel)]=\"inputAttenderMultiple\" name=\"inputAttenderMultiple\" id=\"input-attender-multiple\" class=\"materialize-textarea validate\" required></textarea>\n                      <label for=\"inputAttenderMultiple\">Attender emails</label>\n                    </div>\n                  </div>\n                </ng-template>\n              </mat-tab>\n              <mat-tab>\n                <ng-template mat-tab-label><div class=\"mat-tab-label-aux waves-effect\">FILE UPLOAD</div></ng-template>\n                <ng-template matTabContent>\n                  <i id=\"tooltip-file\" materialize=\"tooltip\" class=\"material-icons tooltipped att-info-tooltip\" data-position=\"right\" data-delay=\"65\" data-html=\"true\" data-tooltip=\"<p class='att-tooltip-text'>We will automatically find and add<br>to the course all the <b>EMAILS</b> in the file</p>\">info</i>\n                  <div class=\"row no-margin att-row-padding\">\n\n                    <app-file-uploader (onCompleteFileUpload)=\"fileReaderUploadCompleted($event)\" (onUploadStarted)=\"fileReaderUploadStarted($event)\" [uniqueID]=\"2\" [URLUPLOAD]=\"this.URL_FILE_READER_UPLOAD + this.course.id\" [isMultiple]=\"false\" [typeOfFile]=\"'file'\" [buttonText]=\"'Upload file'\"></app-file-uploader>\n\n                  </div>\n                </ng-template>\n              </mat-tab>\n            </mat-tab-group>\n          </div>\n\n          <div class=\"row no-margin-bottom right-align\">\n            <div *ngIf=\"isCurrentPutdeleteMode(['0'])\" class=\"valign-wrapper delete-div\">\n              <a id=\"delete-session-btn\" (click)=\"this.deleteSession(); putDeleteForm.reset(); this.allowSessionDeletion = false;\" class=\"waves-effect btn-flat modal-footer-button float-to-left\" [class.disabled]=\"!this.allowSessionDeletion\">Delete</a>\n              <div class=\"float-to-left\">\n                <input #deleteCheckbox type=\"checkbox\" class=\"filled-in\" id=\"delete-checkbox\" name=\"delete-checkbox\" (change)=\"this.allowSessionDeletion = deleteCheckbox.checked\"/>\n                <label for=\"delete-checkbox\" id=\"label-delete-checkbox\">Allow deletion?</label>\n              </div>\n            </div>\n            <a (click)=\"putDeleteForm.reset(); this.allowSessionDeletion = false; this.allowForumEdition = false; this.uploaderModalService.announceUploaderClosed(true);\" class=\"modal-action modal-close waves-effect btn-flat modal-footer-button cancel-modal-btn\">Cancel</a>\n            <button id=\"put-modal-btn\" *ngIf=\"!((this.putdeleteModalMode === 4) && (this.attenderTabSelected === 2))\" type=\"submit\" class=\"waves-effect btn-flat modal-footer-button\" [class.disabled]=\"isCurrentPutdeleteMode(['1']) && (!this.allowForumEdition)\">Send</button>\n          </div>\n        </form>\n\n      </div>\n    </div>\n  </div>\n  <!--PUT/DELETE DIALOG-->\n\n\n\n  <div class=\"row valign-wrapper\">\n    <div class=\"col l1 m1 s2 valign\"><a id=\"back-to-dashboard-btn\" routerLink=\"/courses\" [title]=\"'Back to courses'\" class=\"btn-floating\"><i class=\"material-icons medium back-icon\">arrow_back</i></a></div>\n    <div class=\"col l11 m11 s10 valign\">\n      <h4 id=\"main-course-title\" class=\"course-title\">{{course.title}}</h4></div>\n  </div>\n\n  <!--TABS-->\n  <div id=\"tabs-course-details\" class=\"row\">\n    <mat-tab-group [disableRipple]=\"true\">\n\n      <mat-tab><!--Course Info Tab-->\n        <ng-template mat-tab-label><div class=\"mat-tab-label-aux waves-effect\"><i id=\"info-tab-icon\" materialize=\"tooltip\" class=\"material-icons tooltipped\" data-position=\"top\" data-delay=\"65\" data-tooltip=\"Course info\">home</i></div></ng-template>\n        <ng-template matTabContent>\n\n            <div *ngIf=\"processingCourseInfo\" class=\"loading\"></div>\n\n            <div class=\"tab-template-content\" [class.filtered]=\"processingCourseInfo\">\n              <div class=\"row no-margin\">\n                <a *ngIf=\"this.authenticationService.isTeacher() && !this.welcomeTextEdition\" (click)=\"this.welcomeTextEdition = true\" class=\"right\" [title]=\"'Edit info'\">\n                  <i id=\"edit-course-info\" class=\"material-icons add-element-icon\">edit</i>\n                </a>\n              </div>\n              <div *ngIf=\"!this.welcomeTextEdition && this.course.courseDetails.info\" class=\"ql-editor ql-editor-custom\" [innerHTML]=\"this.course.courseDetails.info\"></div>\n              <div *ngIf=\"this.welcomeTextEdition\">\n                <p-editor *ngIf=\"!this.welcomeTextPreview\" [(ngModel)]=\"this.welcomeText\" [style]=\"{'height':'320px'}\"></p-editor>\n                <div *ngIf=\"this.welcomeTextPreview\" class=\"ql-editor ql-editor-custom\" [innerHTML]=\"this.welcomeText\"></div>\n                <div id=\"textEditorRowButtons\" class=\"row no-margin-bottom right-align\">\n                  <a (click)=\"this.closeUpdateCourseInfo()\" class=\"waves-effect btn-flat modal-footer-button\">Cancel</a>\n                  <button id=\"send-info-btn\" (click)=\"this.updateCourseInfo(); this.closeUpdateCourseInfo()\" class=\"waves-effect btn-flat modal-footer-button\">Send</button>\n                  <a (click)=\"this.welcomeTextPreview = !this.welcomeTextPreview; this.previewButton = (this.welcomeTextPreview ? 'edit' : 'preview');\" class=\"left waves-effect btn-flat modal-footer-button\">{{this.previewButton}}</a>\n                </div>\n              </div>\n              <div *ngIf=\"!this.course.courseDetails.info && !this.welcomeTextEdition\"><app-error-message [errorTitle]=\"'There is no info yet'\" [errorContent]=\"''\" [customClass]=\"'warning'\" [closable]=\"false\"></app-error-message></div>\n            </div>\n          </ng-template>\n      </mat-tab>\n\n      <mat-tab><!--Sessions Tab-->\n        <ng-template mat-tab-label><div class=\"mat-tab-label-aux waves-effect\"><i id=\"sessions-tab-icon\" materialize=\"tooltip\" class=\"material-icons tooltipped\" data-position=\"top\" data-delay=\"65\" data-tooltip=\"Sessions\">school</i></div></ng-template>\n        <ng-template matTabContent>\n            <div class=\"tab-template-content\">\n              <div class=\"row no-margin\">\n                <a href=\"#course-details-modal\" *ngIf=\"this.authenticationService.isTeacher()\" (click)=\"updatePostModalMode(2, 'New session', null, null, null); this.animationService.animateIfSmall()\" class=\"right\" [title]=\"'New session'\">\n                  <i id=\"add-session-icon\" class=\"material-icons add-element-icon\">add_circle_outline</i>\n                </a>\n              </div>\n              <ul>\n                <div *ngFor=\"let session of this.course.sessions; let last1 = last\">\n                  <li class=\"session-data\">\n                    <div class=\"row no-margin\">\n                      <div (click)=\"goToSessionVideo(session)\" [class.session-ready]=\"this.isSessionReady(session)\" class=\"col l7 m6 s6\">\n                        <div class=\"session-title\">{{session.title}}</div>\n                        <div class=\"session-description\">{{session.description}}</div>\n                      </div>\n                      <div class=\"col l4 m5 s5 right-align session-datetime\">\n                        {{numberToDate(session.date) | date}} - {{numberToDate(session.date) | date:'H:mm' }}\n                      </div>\n                      <div class=\"col l1 m1 s1 right-align no-padding-lateral\">\n                        <a href=\"#put-delete-modal\" *ngIf=\"this.authenticationService.isTeacher()\" (click)=\"updatePutDeleteModalMode(0, 'Modify session'); this.changeUpdatedSession(session); this.animationService.animateIfSmall()\" [title]=\"'Modify session'\">\n                          <i class=\"edit-session-icon material-icons forum-icon\">mode_edit</i>\n                        </a>\n                      </div>\n                    </div>\n                  </li>\n                  <li *ngIf=\"!last1\"><div class=\"divider\"></div></li>\n                </div>\n            </ul>\n            <div *ngIf=\"this.course.sessions.length === 0\"><app-error-message [errorTitle]=\"'There are no sessions'\" [errorContent]=\"''\" [customClass]=\"'warning'\" [closable]=\"false\"></app-error-message></div>\n            </div>\n          </ng-template>\n      </mat-tab>\n\n      <mat-tab><!--Forum Tab-->\n        <ng-template mat-tab-label><div class=\"mat-tab-label-aux waves-effect\"><i id=\"forum-tab-icon\" materialize=\"tooltip\" class=\"material-icons tooltipped\" data-position=\"top\" data-delay=\"65\" data-tooltip=\"Forum\">forum</i></div></ng-template>\n        <ng-template matTabContent>\n          <div class=\"tab-template-content row no-margin\" [class.tab-template-content-2]=\"!this.course.courseDetails?.forum.activated || !this.course.courseDetails?.forum.entries.length > 0\">\n\n            <!--Forum view-->\n            <ul class=\"entries-side-view row no-margin\" [class.hide]=\"this.fadeAnim === 'commentsShown'\">\n              <div *ngIf=\"this.course.courseDetails?.forum.activated\">\n                <div *ngFor=\"let entry of this.course.courseDetails?.forum.entries; let last2 = last\">\n                  <li (mousedown)=\"this.fadeAnim = 'commentsHidden';\" (click)=\"this.selectedEntry = entry; this.fadeAnim = 'commentsShown';\" class=\"entry-title waves-effect\" [class.teacher-forum]=\"isEntryTeacher(entry)\">\n                    <div class=\"row no-margin entry-row-sep\">\n                      <div class=\"col l6 m6 s6\">\n                        <a class=\"forum-entry-title\" [title]=\"entry.title\">{{entry.title}}</a>\n                      </div>\n                      <div class=\"col l6 m6 s6 user-date-column\">\n                        <div class=\"row no-margin\">\n                          <div class=\"col l6 m6 s6 user-name forum-entry-author\" [class.teacher-name]=\"isEntryTeacher(entry)\">{{entry?.user?.nickName}}</div>\n                          <div class=\"col l6 m6 s6 user-name forum-entry-date\">{{entry?.date | timeAgo}}</div>\n                        </div>\n                      </div>\n                    </div>\n                    <div *ngIf=\"entry.comments.length > 0\" class=\"row no-margin last-comment-row\">\n                      <div class=\"col\">Last comment:</div>\n                      <div class=\"col\">{{getLastEntryComment(entry)?.user?.nickName}}, {{getLastEntryComment(entry)?.date | timeAgo}}</div>\n                    </div>\n                    <div *ngIf=\"entry.comments.length === 0\" class=\"row no-margin last-comment-row\">\n                      <div class=\"col\">No comments</div>\n                    </div>\n                  </li>\n                  <li *ngIf=\"!last2\"><div class=\"divider\"></div></li>\n                </div>\n              </div>\n              <div class=\"center-align div-entry-icon\">\n                <a href=\"#course-details-modal\" *ngIf=\"this.course.courseDetails?.forum.activated\" (click)=\"updatePostModalMode(0, 'New entry', null, null, null); this.animationService.animateIfSmall()\" [title]=\"'New entry'\">\n                  <i id=\"add-entry-icon\" class=\"material-icons forum-icon\">chat</i>\n                </a>\n                <a href=\"#course-details-modal\" *ngIf=\"this.course.courseDetails?.forum.activated\" (click)=\"updatePostModalMode(3, 'New video entry', null, null, null); this.animationService.animateIfSmall()\" [title]=\"'New videoentry'\">\n                  <i id=\"add-videoentry-icon\" class=\"material-icons forum-icon\">videocam</i>\n                </a>\n                <a href=\"#put-delete-modal\" *ngIf=\"this.authenticationService.isTeacher()\" (click)=\"updatePutDeleteModalMode(1, 'Activate/Deactivate forum'); this.animationService.animateIfSmall()\" class=\"float-to-right\" title=\"Activate/Deactivate forum\">\n                    <i id=\"edit-forum-icon\" class=\"material-icons forum-icon\">mode_edit</i>\n                </a>\n              </div>\n            </ul>\n\n            <div *ngIf=\"this.course.courseDetails?.forum.activated\" id=\"row-of-comments\" class=\"row no-margin\" [@fadeAnim]=\"this.fadeAnim\" [class.hide]=\"this.fadeAnim === 'commentsHidden'\">\n              <div class=\"row no-margin-lateral\">\n                <a><i id=\"entries-sml-btn\" class=\"material-icons center-align col l1 m1 s1 no-padding-lateral\" (click)=\"this.fadeAnim = 'commentsHidden'\">arrow_back</i></a>\n                <div class=\"col l10 m10 s10 no-padding-lateral\">\n                  <div class=\"row no-margin comment-section-title\">\n                    <div class=\"col l6 m6 s6\">{{selectedEntry?.title}}</div>\n                    <div class=\"col l6 m6 s6 user-date-column\">\n                      <div class=\"row no-margin\">\n                        <div class=\"col l6 m6 s6 user-name\">{{selectedEntry?.user.nickName}}</div>\n                        <div class=\"col l6 m6 s6 user-name\">{{selectedEntry?.date | date}} - {{selectedEntry?.date | date:'H:mm' }}</div>\n                      </div>\n                    </div>\n                  </div>\n                </div>\n                <div class=\"col l1 m1 s1 no-padding-lateral right-align\">\n                  <a href=\"#course-details-modal\" [title]=\"'New comment'\" (click)=\"updatePostModalMode(1, 'New comment', selectedEntry, null, null); this.postModalCommentReplay = null; this.animationService.animateIfSmall()\">\n                    <i class=\"material-icons forum-icon\">chat</i>\n                  </a>\n                  <a href=\"#course-details-modal\" [title]=\"'New video comment'\" (click)=\"updatePostModalMode(6, 'New video comment', selectedEntry, null, null); this.postModalCommentReplay = null; this.animationService.animateIfSmall()\">\n                    <i class=\"material-icons forum-icon\">videocam</i>\n                  </a>\n                </div>\n              </div>\n              <div class=\"row no-margin comments-col\">\n                <div *ngFor=\"let comment of this.selectedEntry?.comments; let last3 = last\" class=\"comment-block\" [class.comment-divider]=\"!last3\">\n                  <app-comment [comment]=\"comment\"></app-comment>\n                </div>\n              </div>\n            </div>\n            <!--Forum view-->\n\n            <div *ngIf=\"!this.course.courseDetails?.forum.activated\"><app-error-message [errorTitle]=\"'The forum is not activated!'\" [errorContent]=\"'The teacher must activate it before you can comment'\" [customClass]=\"'warning'\" [closable]=\"false\"></app-error-message></div>\n            <div *ngIf=\"this.course.courseDetails?.forum.activated && this.course.courseDetails?.forum.entries.length === 0\"><app-error-message [errorTitle]=\"'There are no entries yet'\" [errorContent]=\"'Be the first one! Just click on the icon above'\" [customClass]=\"'warning'\" [closable]=\"false\"></app-error-message></div>\n          </div>\n        </ng-template>\n      </mat-tab>\n\n      <mat-tab><!--Files Tab-->\n        <ng-template mat-tab-label><div class=\"mat-tab-label-aux waves-effect\"><i id=\"files-tab-icon\" materialize=\"tooltip\" class=\"material-icons tooltipped\" data-position=\"top\" data-delay=\"65\" data-tooltip=\"Files\">description</i></div></ng-template>\n        <ng-template matTabContent>\n          <div class=\"tab-template-content row no-margin\">\n            <div *ngIf=\"this.authenticationService.isTeacher()\" class=\"row no-margin\">\n              <a href=\"#course-details-modal\" *ngIf=\"!allowFilesEdition\" (click)=\"updatePostModalMode(4, 'New file group', null, null, null); this.animationService.animateIfSmall()\" class=\"right\" [title]=\"'New file group'\">\n                <i id=\"add-files-icon\" class=\"material-icons add-element-icon\">add_circle_outline</i>\n              </a>\n              <i *ngIf=\"this.course.courseDetails.files.length > 0\" (click)=\"this.changeModeEdition()\" class=\"material-icons add-element-icon right\" [title]=\"'Modify file groups'\">{{this.filesEditionIcon}}</i>\n            </div>\n            <div *ngFor=\"let fileG of this.course.courseDetails?.files; let last4 = last\">\n              <app-file-group [fileGroup]=\"fileG\" [courseId]=\"this.course.id\" [depth]=\"0\"></app-file-group>\n              <div *ngIf=\"!last4\" class=\"divider\"></div>\n            </div>\n            <div *ngIf=\"this.course.courseDetails?.files.length === 0\"><app-error-message [errorTitle]=\"'There are no files associated'\" [errorContent]=\"'Need something? Just open an entry on the forum'\" [customClass]=\"'warning'\" [closable]=\"false\"></app-error-message></div>\n          </div>\n        </ng-template>\n      </mat-tab>\n\n      <mat-tab><!--Attenders Tab-->\n      <ng-template mat-tab-label><div class=\"mat-tab-label-aux waves-effect\"  (click)=\"changeUrlTab(4)\"><i id=\"attenders-tab-icon\" materialize=\"tooltip\" class=\"material-icons tooltipped\" data-position=\"top\" data-delay=\"65\" data-tooltip=\"Attenders\">supervisor_account</i></div></ng-template>\n        <ng-template matTabContent>\n          <div class=\"tab-template-content\">\n            <div *ngIf=\"this.authenticationService.isTeacher()\" class=\"row no-margin\">\n              <a  href=\"#put-delete-modal\" *ngIf=\"!this.allowAttendersEdition\" (click)=\"updatePutDeleteModalMode(4, 'Add attenders'); this.animationService.animateIfSmall()\" class=\"right\" [title]=\"'Add attenders'\">\n                <i id=\"add-attenders-icon\" class=\"material-icons add-element-icon\">add_circle_outline</i>\n              </a>\n              <i *ngIf=\"this.course.attenders.length > 1\" (click)=\"this.changeModeAttenders()\" id=\"edit-attenders-icon\" class=\"material-icons add-element-icon right\" [title]=\"'Modify attenders'\">{{this.attendersEditionIcon}}</i>\n            </div>\n\n            <app-error-message *ngIf=\"addAttendersCorrect\" (eventShowable)=\"addAttendersCorrect = false\" [errorTitle]=\"attCorrectTitle\" [errorContent]=\"attCorrectContent\" [customClass]=\"'correct'\" [closable]=\"true\"></app-error-message>\n            <app-error-message *ngIf=\"addAttendersError\" (eventShowable)=\"addAttendersError = false\" [errorTitle]=\"attErrorTitle\" [errorContent]=\"attErrorContent\" [customClass]=\"'fail'\" [closable]=\"true\"></app-error-message>\n\n            <div class=\"row no-margin valign-wrapper user-attender-row attender-row-div\">\n              <div class=\"col l2 m2 s3 valign attender-col\">\n                <img materialize=\"materialbox\" class=\"circle materialboxed userImage\" src={{this.authenticationService.getCurrentUser().picture}}>\n              </div>\n              <div class=\"col l5 m5 s9 valign attender-col\">\n                <p class=\"attender-name-p\">{{this.authenticationService.getCurrentUser().nickName}}</p>\n              </div>\n            </div>\n            <div *ngFor=\"let attender of this.course.attenders; let j = index\">\n              <div *ngIf=\"attender.id != this.authenticationService.getCurrentUser().id\" class=\"row no-margin valign-wrapper attender-row-div\">\n                <div class=\"col l2 m2 s3 valign attender-col\">\n                  <img materialize=\"materialbox\" class=\"circle materialboxed userImage\" src={{attender.picture}}>\n                </div>\n                <div class=\"col l9 l9 s7 no-margin-left\">\n                  <div class=\"row no-margin\">\n                    <div class=\"col l6 m6 s12 no-padding-lateral valign attender-col\">\n                      <p class=\"p-nickName\">{{attender?.nickName}}</p>\n                    </div>\n                    <div class=\"col l6 m6 s12 no-padding-lateral valign attender-col\">\n                      <p class=\"p-name\">{{attender?.name}}</p>\n                    </div>\n                  </div>\n                </div>\n                <i *ngIf=\"this.allowAttendersEdition && this.authenticationService.isTeacher() && !this.arrayOfAttDels[j]\" (click)=\"deleteAttender(attender, j)\" class=\"material-icons del-attender-icon\" [title]=\"'Remove ' + attender.nickName\">clear</i>\n                <i *ngIf=\"this.allowAttendersEdition && this.authenticationService.isTeacher() && this.arrayOfAttDels[j]\" class=\"material-icons del-attender-icon rotating\">cached</i>\n              </div>\n            </div>\n        </div>\n        </ng-template>\n\n      </mat-tab>\n\n    </mat-tab-group>\n  </div>\n  <!--TABS-->\n\n</div>\n"

/***/ }),

/***/ "./src/app/components/course-details/course-details.component.ts":
/*!***********************************************************************!*\
  !*** ./src/app/components/course-details/course-details.component.ts ***!
  \***********************************************************************/
/*! exports provided: CourseDetailsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CourseDetailsComponent", function() { return CourseDetailsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_animations__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/animations */ "./node_modules/@angular/animations/fesm5/animations.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var ng2_dragula_ng2_dragula__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ng2-dragula/ng2-dragula */ "./node_modules/ng2-dragula/ng2-dragula.js");
/* harmony import */ var ng2_dragula_ng2_dragula__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(ng2_dragula_ng2_dragula__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _services_course_details_modal_data_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../services/course-details-modal-data.service */ "./src/app/services/course-details-modal-data.service.ts");
/* harmony import */ var _services_uploader_modal_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../services/uploader-modal.service */ "./src/app/services/uploader-modal.service.ts");
/* harmony import */ var _services_files_edition_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../services/files-edition.service */ "./src/app/services/files-edition.service.ts");
/* harmony import */ var _services_course_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../services/course.service */ "./src/app/services/course.service.ts");
/* harmony import */ var _services_session_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../services/session.service */ "./src/app/services/session.service.ts");
/* harmony import */ var _services_forum_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../services/forum.service */ "./src/app/services/forum.service.ts");
/* harmony import */ var _services_file_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../services/file.service */ "./src/app/services/file.service.ts");
/* harmony import */ var _services_authentication_service__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../services/authentication.service */ "./src/app/services/authentication.service.ts");
/* harmony import */ var _services_video_session_service__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../services/video-session.service */ "./src/app/services/video-session.service.ts");
/* harmony import */ var _services_animation_service__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../services/animation.service */ "./src/app/services/animation.service.ts");
/* harmony import */ var _classes_session__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../classes/session */ "./src/app/classes/session.ts");
/* harmony import */ var _classes_course__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../../classes/course */ "./src/app/classes/course.ts");
/* harmony import */ var _classes_entry__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../../classes/entry */ "./src/app/classes/entry.ts");
/* harmony import */ var _classes_comment__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../../classes/comment */ "./src/app/classes/comment.ts");
/* harmony import */ var _classes_file_group__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ../../classes/file-group */ "./src/app/classes/file-group.ts");
/* harmony import */ var _classes_file__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ../../classes/file */ "./src/app/classes/file.ts");
/* harmony import */ var _classes_user__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ../../classes/user */ "./src/app/classes/user.ts");
/* harmony import */ var openvidu_browser__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! openvidu-browser */ "./node_modules/openvidu-browser/lib/index.js");
/* harmony import */ var openvidu_browser__WEBPACK_IMPORTED_MODULE_23___default = /*#__PURE__*/__webpack_require__.n(openvidu_browser__WEBPACK_IMPORTED_MODULE_23__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
























var CourseDetailsComponent = /** @class */ (function () {
    function CourseDetailsComponent(courseService, forumService, fileService, sessionService, animationService, authenticationService, videoSessionService, router, route, location, courseDetailsModalDataService, uploaderModalService, filesEditionService, dragulaService) {
        var _this = this;
        this.courseService = courseService;
        this.forumService = forumService;
        this.fileService = fileService;
        this.sessionService = sessionService;
        this.animationService = animationService;
        this.authenticationService = authenticationService;
        this.videoSessionService = videoSessionService;
        this.router = router;
        this.route = route;
        this.location = location;
        this.courseDetailsModalDataService = courseDetailsModalDataService;
        this.uploaderModalService = uploaderModalService;
        this.filesEditionService = filesEditionService;
        this.dragulaService = dragulaService;
        this.fadeAnim = 'commentsHidden';
        this.tabId = 0;
        //POST MODAL
        this.processingPost = false;
        this.postModalMode = 3; //0 -> New entry | 1 -> New comment | 2 -> New session | 4 -> Add fileGroup | 5 -> Add file | 6 -> New video comment
        this.postModalTitle = "New session";
        this.recordRadioEnabled = false;
        this.recordType = 'video';
        this.publisherErrorMessage = '';
        this.recording = false;
        this.paused = false;
        //PUT-DELETE MODAL
        this.processingPut = false;
        this.putdeleteModalMode = 0; //0 -> Modify session | 1 -> Modify forum | 2 -> Modify file group | 3 -> Modify file | 4 -> Add attenders
        this.putdeleteModalTitle = "Modify session";
        this.allowSessionDeletion = false;
        //Forum
        this.allowForumEdition = false;
        this.inputAttenderSeparator = "";
        this.attenderTabSelected = 0;
        //COURSE INFO TAB
        this.processingCourseInfo = false;
        this.welcomeTextEdition = false;
        this.welcomeTextPreview = false;
        this.previewButton = 'preview';
        //FILES TAB
        this.allowFilesEdition = false;
        this.filesEditionIcon = "mode_edit";
        //ATTENDERS TAB
        this.allowAttendersEdition = false;
        this.addAttendersError = false;
        this.addAttendersCorrect = false;
        this.attendersEditionIcon = "mode_edit";
        this.arrayOfAttDels = [];
        this.actions2 = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.actions3 = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        //URL for uploading files changes between development stage and production stage
        this.URL_UPLOAD = _environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].URL_UPLOAD;
        this.URL_FILE_READER_UPLOAD = _environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].URL_EMAIL_FILE_UPLOAD;
        //Activating handles for drag and drop files
        this.dragulaService.setOptions('drag-bag', {
            moves: function (el, container, handle) {
                return handle.className === 'drag-handle material-icons action-file-icon';
            }
        });
        //Subscription for receiving POST modal dialog changes
        this.subscription1 = this.courseDetailsModalDataService.postModeAnnounced$.subscribe(function (objs) {
            //objs is an array containing postModalMode, postModalTitle, postModalEntry, postModalCommentReplay and postModalFileGroup in that specific order
            _this.postModalMode = objs[0];
            _this.postModalTitle = objs[1];
            _this.postModalEntry = objs[2];
            _this.postModalCommentReplay = objs[3];
            _this.postModalFileGroup = objs[4];
        });
        //Subscription for receiving PUT/DELETE modal dialog changes
        this.subscription2 = this.courseDetailsModalDataService.putdeleteModeAnnounced$.subscribe(function (objs) {
            //objs is an array containing putdeleteModalMode and putdeleteModalTitle, in that specific order
            _this.putdeleteModalMode = objs[0];
            if (objs[1])
                _this.putdeleteModalTitle = objs[1]; //Only if the string is not empty
        });
        //Subscription for receiving FileGroup deletions
        this.subscription3 = this.filesEditionService.fileGroupDeletedAnnounced$.subscribe(function (fileGroupDeletedId) {
            //fileGroupDeletedId is the id of the FileGroup that has been deleted by the child component (FileGroupComponent)
            if (_this.recursiveFileGroupDeletion(_this.course.courseDetails.files, fileGroupDeletedId)) {
                if (_this.course.courseDetails.files.length == 0)
                    _this.changeModeEdition(); //If there are no fileGroups, mode edit is closed
            }
        });
        //Subscription for receiving FileGroup and File objects that are being updated by the child component (FileGroupComponent)
        this.subscription4 = this.filesEditionService.fileFilegroupUpdatedAnnounced$.subscribe(function (objs) {
            //objs is an array containing updatedFileGroup and updatedFile, in that specific order
            if (objs[0]) {
                _this.updatedFileGroup = objs[0];
                _this.inputFileTitle = _this.updatedFileGroup.title;
                _this.url_file_upload = _this.URL_UPLOAD + _this.course.id + "/file-group/" + _this.updatedFileGroup.id;
            }
            if (objs[1]) {
                _this.updatedFile = objs[1];
                _this.inputFileTitle = _this.updatedFile.name;
            }
        });
        this.subscription5 = this.dragulaService.dropModel.subscribe(function (value) {
            _this.changeFilesOrder(value);
        });
    }
    CourseDetailsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.authenticationService.checkCredentials()
            .then(function () {
            _this.route.params.forEach(function (params) {
                var id = +params['id'];
                _this.tabId = +params['tabId'];
                _this.courseService.getCourse(id).subscribe(function (course) {
                    _this.sortSessionsByDate(course.sessions);
                    _this.course = course;
                    _this.selectedEntry = _this.course.courseDetails.forum.entries[0]; //selectedEntry default to first entry
                    if (_this.course.sessions.length > 0)
                        _this.changeUpdatedSession(_this.course.sessions[0]); //updatedSession default to first session
                    _this.updateCheckboxForumEdition(_this.course.courseDetails.forum.activated);
                    _this.welcomeText = _this.course.courseDetails.info;
                }, function (error) { });
            });
        })
            .catch(function (e) { });
    };
    CourseDetailsComponent.prototype.ngOnDestroy = function () {
        this.subscription1.unsubscribe();
        this.subscription2.unsubscribe();
        this.subscription3.unsubscribe();
        this.subscription4.unsubscribe();
        this.subscription5.unsubscribe();
        this.dragulaService.destroy('drag-bag');
    };
    CourseDetailsComponent.prototype.goToSessionVideo = function (session) {
        this.videoSessionService.session = session;
        this.videoSessionService.course = this.course;
        if (this.isSessionReady(session))
            this.router.navigate(['/session', session.id]);
    };
    CourseDetailsComponent.prototype.updatePostModalMode = function (mode, title, header, commentReplay, fileGroup) {
        // mode[0: "New Entry", 1: "New comment", 2: "New session", 3: "New VideoEntry", 4: "New FileGroup", 5: "Add files"]
        var objs = [mode, title, header, commentReplay, fileGroup];
        this.courseDetailsModalDataService.announcePostMode(objs);
    };
    CourseDetailsComponent.prototype.updatePutDeleteModalMode = function (mode, title) {
        var objs = [mode, title];
        this.courseDetailsModalDataService.announcePutdeleteMode(objs);
    };
    CourseDetailsComponent.prototype.getLastEntryComment = function (entry) {
        var comment = entry.comments[0];
        for (var _i = 0, _a = entry.comments; _i < _a.length; _i++) {
            var c = _a[_i];
            if (c.date > comment.date)
                comment = c;
            comment = this.recursiveReplyDateCheck(comment);
        }
        return comment;
    };
    CourseDetailsComponent.prototype.numberToDate = function (d) {
        return new Date(d);
    };
    CourseDetailsComponent.prototype.changeUpdatedSession = function (session) {
        this.updatedSession = session;
        this.updatedSessionDate = (new Date(this.updatedSession.date)).toISOString().split("T")[0]; //YYYY-MM-DD format
        this.inputSessionTitle = this.updatedSession.title;
        this.inputSessionDescription = this.updatedSession.description;
        this.inputSessionDate = new Date(this.updatedSession.date);
        this.inputSessionTime = this.dateToTimeInputFormat(this.inputSessionDate);
    };
    CourseDetailsComponent.prototype.changeModeEdition = function () {
        this.allowFilesEdition = !this.allowFilesEdition;
        if (this.allowFilesEdition) {
            this.filesEditionIcon = "keyboard_arrow_left";
        }
        else {
            this.filesEditionIcon = "mode_edit";
        }
        this.filesEditionService.announceModeEdit(this.allowFilesEdition);
    };
    CourseDetailsComponent.prototype.changeModeAttenders = function () {
        this.allowAttendersEdition = !this.allowAttendersEdition;
        if (this.allowAttendersEdition) {
            this.attendersEditionIcon = "keyboard_arrow_left";
        }
        else {
            this.attendersEditionIcon = "mode_edit";
        }
    };
    CourseDetailsComponent.prototype.isCurrentPostMode = function (possiblePostModes) {
        return (possiblePostModes.indexOf(this.postModalMode.toString()) > -1);
    };
    CourseDetailsComponent.prototype.isCurrentPutdeleteMode = function (possiblePutdeleteModes) {
        return (possiblePutdeleteModes.indexOf(this.putdeleteModalMode.toString()) > -1);
    };
    CourseDetailsComponent.prototype.updateCheckboxForumEdition = function (b) {
        if (b) {
            this.checkboxForumEdition = "DEACTIVATION";
        }
        else {
            this.checkboxForumEdition = "ACTIVATION";
        }
    };
    CourseDetailsComponent.prototype.filesUploadStarted = function (event) {
        console.log("File upload started...");
    };
    CourseDetailsComponent.prototype.filesUploadCompleted = function (response) {
        var fg = JSON.parse(response);
        console.log("File upload completed (items successfully uploadded). Response: ", fg);
        for (var i = 0; i < this.course.courseDetails.files.length; i++) {
            if (this.course.courseDetails.files[i].id == fg.id) {
                this.course.courseDetails.files[i] = fg;
                this.updatedFileGroup = fg;
                break;
            }
        }
    };
    //POST new Entry, Comment or Session
    CourseDetailsComponent.prototype.onCourseDetailsSubmit = function () {
        var _this = this;
        this.processingPost = true;
        //If modal is opened in "New Entry" mode
        if (this.postModalMode === 0) {
            var e = new _classes_entry__WEBPACK_IMPORTED_MODULE_18__["Entry"](this.inputTitle, [new _classes_comment__WEBPACK_IMPORTED_MODULE_19__["Comment"](this.inputComment, '', false, null)]);
            this.forumService.newEntry(e, this.course.courseDetails.id).subscribe(//POST method requires an Entry and the CourseDetails id that contains its Forum
            function (//POST method requires an Entry and the CourseDetails id that contains its Forum
            response) {
                _this.course.courseDetails.forum.entries.push(response.entry); //Only on succesful post we update the modified forum
                _this.processingPost = false;
                _this.actions2.emit({ action: "modal", params: ['close'] });
            }, function (error) { _this.processingPost = false; });
        }
        //If modal is opened in "New Session" mode
        else if (this.postModalMode === 2) {
            var date = new Date(this.inputDate);
            var hoursMins = this.inputTime.split(":");
            date.setHours(parseInt(hoursMins[0]), parseInt(hoursMins[1]));
            var s = new _classes_session__WEBPACK_IMPORTED_MODULE_16__["Session"](this.inputTitle, this.inputComment, date.getTime());
            this.sessionService.newSession(s, this.course.id).subscribe(function (response) {
                _this.sortSessionsByDate(response.sessions);
                _this.course = response;
                _this.processingPost = false;
                _this.actions2.emit({ action: "modal", params: ['close'] });
            }, function (error) { _this.processingPost = false; });
        }
        //If modal is opened in "New Comment" mode (replaying or not replaying)
        else if (this.postModalMode === 1) {
            var c = new _classes_comment__WEBPACK_IMPORTED_MODULE_19__["Comment"](this.inputComment, '', false, this.postModalCommentReplay);
            this.forumService.newComment(c, this.selectedEntry.id, this.course.courseDetails.id).subscribe(function (response) {
                //Only on succesful post we locally update the created entry
                var ents = _this.course.courseDetails.forum.entries;
                for (var i = 0; i < ents.length; i++) {
                    if (ents[i].id == _this.selectedEntry.id) {
                        _this.course.courseDetails.forum.entries[i] = response.entry; //The entry with the required ID is updated
                        _this.selectedEntry = _this.course.courseDetails.forum.entries[i];
                        break;
                    }
                }
                _this.processingPost = false;
                _this.actions2.emit({ action: "modal", params: ['close'] });
            }, function (error) { _this.processingPost = false; });
        }
        //If modal is opened in "New FileGroup" mode
        else if (this.postModalMode === 4) {
            var f = new _classes_file_group__WEBPACK_IMPORTED_MODULE_20__["FileGroup"](this.inputTitle, this.postModalFileGroup);
            this.fileService.newFileGroup(f, this.course.courseDetails.id).subscribe(function (response) {
                //Only on succesful post we locally update the entire course details
                _this.course.courseDetails = response;
                _this.processingPost = false; // Stop the loading animation
                _this.actions2.emit({ action: "modal", params: ['close'] }); // CLose the modal
                if (!_this.allowFilesEdition)
                    _this.changeModeEdition(); // Activate file edition view if deactivated
            }, function (error) { _this.processingPost = false; });
        }
        //If modal is opened in "New Videoentry" mode
        else if (this.postModalMode === 3) {
            console.log('Sending new videoentry');
            var e = new _classes_entry__WEBPACK_IMPORTED_MODULE_18__["Entry"](this.inputTitle, [new _classes_comment__WEBPACK_IMPORTED_MODULE_19__["Comment"](this.inputComment, 'new-url', this.recordType === 'audio', null)]);
            this.forumService.newEntry(e, this.course.courseDetails.id).subscribe(//POST method requires an Entry and the CourseDetails id that contains its Forum
            function (//POST method requires an Entry and the CourseDetails id that contains its Forum
            response) {
                _this.recorder.uploadAsMultipartfile(_this.URL_UPLOAD + _this.course.id + '/comment/' + response.comment.id)
                    .then(function (responseAsText) {
                    _this.cleanRecording();
                    var comment = JSON.parse(responseAsText);
                    var entry = response.entry;
                    var index = entry.comments.map(function (c) { return c.id; }).indexOf(response.comment.id);
                    if (index != -1) {
                        entry.comments[index] = comment;
                    }
                    _this.course.courseDetails.forum.entries.push(entry); //Only on succesful post we update the modified forum
                    _this.processingPost = false;
                    _this.actions2.emit({ action: "modal", params: ['close'] });
                })
                    .catch(function (e) { });
            }, function (error) { _this.processingPost = false; });
        }
        //If modal is opened in "New Video Comment" mode (replaying or not replaying)
        else if (this.postModalMode === 6) {
            var c = new _classes_comment__WEBPACK_IMPORTED_MODULE_19__["Comment"](this.inputComment, 'new-url', this.recordType === 'audio', this.postModalCommentReplay);
            this.forumService.newComment(c, this.selectedEntry.id, this.course.courseDetails.id).subscribe(function (response) {
                _this.recorder.uploadAsMultipartfile(_this.URL_UPLOAD + _this.course.id + '/comment/' + response.comment.id)
                    .then(function (responseAsText) {
                    _this.cleanRecording();
                    var comment = JSON.parse(responseAsText);
                    var entry = response.entry;
                    _this.replaceComment(entry.comments, comment);
                    var ents = _this.course.courseDetails.forum.entries;
                    for (var i = 0; i < ents.length; i++) {
                        if (ents[i].id == _this.selectedEntry.id) {
                            _this.course.courseDetails.forum.entries[i] = entry; // The entry with the required ID is updated
                            _this.selectedEntry = _this.course.courseDetails.forum.entries[i];
                            break;
                        }
                    }
                    _this.processingPost = false;
                    _this.actions2.emit({ action: "modal", params: ['close'] });
                })
                    .catch(function (e) { });
            }, function (error) { _this.processingPost = false; });
        }
    };
    //PUT existing Session or Forum
    CourseDetailsComponent.prototype.onPutDeleteSubmit = function () {
        var _this = this;
        this.processingPut = true;
        //If modal is opened in PUT existing Session
        if (this.putdeleteModalMode === 0) {
            var modifiedDate = this.fromInputToNumberDate(this.updatedSessionDate, this.inputSessionTime);
            var s = new _classes_session__WEBPACK_IMPORTED_MODULE_16__["Session"](this.inputSessionTitle, this.inputSessionDescription, modifiedDate);
            s.id = this.updatedSession.id; //The new session must have the same id as the modified session in order to replace it
            this.sessionService.editSession(s).subscribe(function (response) {
                //Only on succesful put we locally update the modified session
                for (var i = 0; i < _this.course.sessions.length; i++) {
                    if (_this.course.sessions[i].id == response.id) {
                        _this.course.sessions[i] = response; //The session with the required ID is updated
                        _this.updatedSession = _this.course.sessions[i];
                        break;
                    }
                }
                _this.processingPut = false;
                _this.actions3.emit({ action: "modal", params: ['close'] });
            }, function (error) { _this.processingPut = false; });
        }
        //If modal is opened in PUT existing Forum
        else if (this.putdeleteModalMode === 1) {
            this.forumService.editForum(!this.course.courseDetails.forum.activated, this.course.courseDetails.id).subscribe(function (response) {
                //Only on succesful put we locally update the modified session
                _this.course.courseDetails.forum.activated = response;
                _this.allowForumEdition = false;
                _this.updateCheckboxForumEdition(response);
                _this.processingPut = false;
                _this.actions3.emit({ action: "modal", params: ['close'] });
            }, function (error) { _this.processingPut = false; });
        }
        //If modal is opened in PUT existing FileGroup
        else if (this.putdeleteModalMode === 2) {
            var fg = new _classes_file_group__WEBPACK_IMPORTED_MODULE_20__["FileGroup"](this.inputFileTitle, null);
            fg.id = this.updatedFileGroup.id;
            this.fileService.editFileGroup(fg, this.course.id).subscribe(function (response) {
                for (var i = 0; i < _this.course.courseDetails.files.length; i++) {
                    if (_this.course.courseDetails.files[i].id == response.id) {
                        _this.course.courseDetails.files[i] = response; //The root fileGroup with the required ID is updated
                        //this.updatedFileGroup = this.course.courseDetails.files[i];
                        break;
                    }
                }
                _this.processingPut = false;
                _this.actions3.emit({ action: "modal", params: ['close'] });
            }, function (error) { _this.processingPut = false; });
        }
        //If modal is opened in PUT existing File
        else if (this.putdeleteModalMode === 3) {
            var f = new _classes_file__WEBPACK_IMPORTED_MODULE_21__["File"](1, this.inputFileTitle, "www.newlink.com");
            f.id = this.updatedFile.id;
            this.fileService.editFile(f, this.updatedFileGroup.id, this.course.id).subscribe(function (response) {
                for (var i = 0; i < _this.course.courseDetails.files.length; i++) {
                    if (_this.course.courseDetails.files[i].id == response.id) {
                        _this.course.courseDetails.files[i] = response; //The root fileGroup with the required ID is updated
                        //this.updatedFileGroup = this.course.courseDetails.files[i];
                        break;
                    }
                }
                _this.processingPut = false;
                _this.actions3.emit({ action: "modal", params: ['close'] });
            }, function (error) { _this.processingPut = false; });
        }
        //If modal is opened in Add attenders
        else if (this.putdeleteModalMode === 4) {
            //If the attenders are being added in the SIMPLE tab
            if (this.attenderTabSelected === 0) {
                console.log("Adding one attender in the SIMPLE tab");
                var arrayNewAttenders = [this.inputAttenderSimple];
                this.courseService.addCourseAttenders(this.course.id, arrayNewAttenders).subscribe(function (response) {
                    var newAttenders = response.attendersAdded;
                    _this.course.attenders = _this.course.attenders.concat(newAttenders);
                    _this.handleAttendersMessage(response);
                    _this.processingPut = false;
                    _this.actions3.emit({ action: "modal", params: ['close'] });
                }, function (error) { _this.processingPut = false; });
            }
            //If the attenders are being added in the MULTIPLE tab
            else if (this.attenderTabSelected === 1) {
                console.log("Adding multiple attenders in the MULTIPLE tab");
                //The input text is divided into entire words (by whitespaces, new lines and the custom separator)
                var emailsFiltered = this.inputAttenderMultiple.replace('\n', ' ').replace('\r', ' ');
                if (this.inputAttenderSeparator) {
                    var regExSeparator = new RegExp(this.inputAttenderSeparator, 'g');
                    emailsFiltered = emailsFiltered.replace(regExSeparator, ' ');
                }
                var arrayNewAttenders = emailsFiltered.split(/\s+/).filter(function (v) { return v != ''; });
                this.courseService.addCourseAttenders(this.course.id, arrayNewAttenders).subscribe(function (response) {
                    var newAttenders = response.attendersAdded;
                    _this.course.attenders = _this.course.attenders.concat(newAttenders);
                    _this.handleAttendersMessage(response);
                    _this.processingPut = false;
                    _this.actions3.emit({ action: "modal", params: ['close'] });
                }, function (error) { _this.processingPut = false; });
            }
            //If the attenders are being added in the FILE UPLOAD tab
            else if (this.attenderTabSelected === 2) {
                console.log("Adding attenders by file upload in the FILE UPLOAD tab");
                this.processingPut = false;
            }
        }
    };
    //DELETE existing Session
    CourseDetailsComponent.prototype.deleteSession = function () {
        var _this = this;
        this.processingPut = true;
        this.sessionService.deleteSession(this.updatedSession.id).subscribe(function (response) {
            //Only on succesful put we locally delete the session
            for (var i = 0; i < _this.course.sessions.length; i++) {
                if (_this.course.sessions[i].id == response.id) {
                    _this.course.sessions.splice(i, 1); //The session with the required ID is deleted
                    _this.updatedSession = _this.course.sessions[0];
                    break;
                }
            }
            _this.processingPut = false;
            _this.actions3.emit({ action: "modal", params: ['close'] });
        }, function (error) { _this.processingPut = false; });
    };
    //Remove attender from course
    CourseDetailsComponent.prototype.deleteAttender = function (attender, j) {
        var _this = this;
        console.log("Deleting attender " + attender.nickName);
        this.arrayOfAttDels[j] = true; // Start deleting animation
        var c = new _classes_course__WEBPACK_IMPORTED_MODULE_17__["Course"](this.course.title, this.course.image, this.course.courseDetails);
        c.id = this.course.id;
        for (var i = 0; i < this.course.attenders.length; i++) {
            if (this.course.attenders[i].id !== attender.id) {
                c.attenders.push(new _classes_user__WEBPACK_IMPORTED_MODULE_22__["User"](this.course.attenders[i])); //Inserting a new User object equal to the attender but "courses" array empty
            }
        }
        this.courseService.deleteCourseAttenders(c).subscribe(function (response) {
            _this.course.attenders = response;
            _this.arrayOfAttDels[j] = false;
            if (_this.course.attenders.length <= 1)
                _this.changeModeAttenders(); //If there are no attenders, mode edit is closed
        }, function (error) { _this.arrayOfAttDels[j] = false; });
    };
    //Updates the course info
    CourseDetailsComponent.prototype.updateCourseInfo = function () {
        var _this = this;
        console.log("Updating course info");
        this.processingCourseInfo = true;
        var c = new _classes_course__WEBPACK_IMPORTED_MODULE_17__["Course"](this.course.title, this.course.image, this.course.courseDetails);
        c.courseDetails.info = this.welcomeText;
        c.id = this.course.id;
        this.courseService.editCourse(c, "updating course info").subscribe(function (response) {
            //Only on succesful put we locally update the modified course
            _this.course = response;
            _this.welcomeText = _this.course.courseDetails.info;
            _this.processingCourseInfo = false;
        }, function (error) { _this.processingCourseInfo = false; });
    };
    //Closes the course info editing mode
    CourseDetailsComponent.prototype.closeUpdateCourseInfo = function () {
        this.welcomeText = this.course.courseDetails.info;
        this.welcomeTextEdition = false;
        this.welcomeTextPreview = false;
        this.previewButton = 'preview';
    };
    CourseDetailsComponent.prototype.changeUrlTab = function (tab) {
        this.location.replaceState("/courses/" + this.course.id + "/" + tab);
    };
    CourseDetailsComponent.prototype.isEntryTeacher = function (entry) {
        return (entry.user.roles.indexOf('ROLE_TEACHER') > -1);
    };
    CourseDetailsComponent.prototype.fileReaderUploadStarted = function (started) {
        this.processingPut = started;
    };
    CourseDetailsComponent.prototype.fileReaderUploadCompleted = function (response) {
        console.log("File uploaded succesfully. Waiting for the system to add all students...  ");
        var objResponse = JSON.parse(response);
        if ("attendersAdded" in objResponse) {
            var newAttenders = objResponse.attendersAdded;
            console.log("New attenders added:");
            console.log(newAttenders);
            this.course.attenders = this.course.attenders.concat(newAttenders);
            this.handleAttendersMessage(objResponse);
            this.processingPut = false; // Stop the loading animation
            this.uploaderModalService.announceUploaderClosed(true); // Clear the uploader file queue
            this.actions3.emit({ action: "modal", params: ['close'] }); // Close the modal
        }
        else {
            this.processingPut = false;
            console.log("There has been an error: " + response);
        }
    };
    //INTERNAL AUXILIAR METHODS
    //Sorts an array of Session by their 'date' attribute (the first are the erliest)
    CourseDetailsComponent.prototype.sortSessionsByDate = function (sessionArray) {
        sessionArray.sort(function (a, b) { return (a.date > b.date) ? 1 : ((b.date > a.date) ? -1 : 0); });
    };
    //Transforms a Date object into a single string ("HH:MM")
    CourseDetailsComponent.prototype.dateToTimeInputFormat = function (date) {
        var hours = date.getHours() < 10 ? "0" + date.getHours().toString() : date.getHours().toString();
        var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes().toString() : date.getMinutes().toString();
        return (hours + ":" + minutes);
    };
    //Transforms two strings ("YYYY-MM-DD", "HH:MM") into a new Date object
    CourseDetailsComponent.prototype.fromInputToNumberDate = function (date, time) {
        var newDate = new Date(date); //date parameter has a valid ISO format: YYYY-MM-DD
        var timeArray = time.split(":");
        newDate.setHours(parseInt(timeArray[0]));
        newDate.setMinutes(parseInt(timeArray[1]));
        return newDate.getTime(); //returning miliseconds
    };
    //Returns the earliest Comment (by 'date' attribute) in the recursive structure of comments which has Comment 'c' as root
    CourseDetailsComponent.prototype.recursiveReplyDateCheck = function (c) {
        for (var _i = 0, _a = c.replies; _i < _a.length; _i++) {
            var r = _a[_i];
            if (r.date > c.date)
                c = r;
            c = this.recursiveReplyDateCheck(r);
        }
        return c;
    };
    //Delets a fileGroup from this.course.courseDetails.files recursively, given a fileGroup id
    CourseDetailsComponent.prototype.recursiveFileGroupDeletion = function (fileGroupLevel, fileGroupDeletedId) {
        if (fileGroupLevel) {
            for (var i = 0; i < fileGroupLevel.length; i++) {
                if (fileGroupLevel[i].id == fileGroupDeletedId) {
                    fileGroupLevel.splice(i, 1);
                    return true;
                }
                var deleted = this.recursiveFileGroupDeletion(fileGroupLevel[i].fileGroups, fileGroupDeletedId);
                if (deleted)
                    return deleted;
            }
        }
    };
    //Creates an error message when there is some problem when adding Attenders to a Course
    //It also generates a correct feedback message when any student has been correctly added to the Course
    CourseDetailsComponent.prototype.handleAttendersMessage = function (response) {
        var isError = false;
        var isCorrect = false;
        this.attErrorContent = "";
        this.attCorrectContent = "";
        if (response.attendersAdded.length > 0) {
            for (var _i = 0, _a = response.attendersAdded; _i < _a.length; _i++) {
                var user = _a[_i];
                this.attCorrectContent += "<span class='feedback-list'>" + user.name + "</span>";
            }
            isCorrect = true;
        }
        if (response.attendersAlreadyAdded.length > 0) {
            this.attErrorContent += "<span class='feedback-span'>The following users were already added to the course</span>";
            for (var _b = 0, _c = response.attendersAlreadyAdded; _b < _c.length; _b++) {
                var user = _c[_b];
                this.attErrorContent += "<span class='feedback-list'>" + user.name + "</span>";
            }
            isError = true;
        }
        if (response.emailsValidNotRegistered.length > 0) {
            this.attErrorContent += "<span class='feedback-span'>The following users are not registered</span>";
            for (var _d = 0, _e = response.emailsValidNotRegistered; _d < _e.length; _d++) {
                var email = _e[_d];
                this.attErrorContent += "<span class='feedback-list'>" + email + "</span>";
            }
            isError = true;
        }
        if (response.emailsInvalid) {
            if (response.emailsInvalid.length > 0) {
                this.attErrorContent += "<span class='feedback-span'>These are not valid emails</span>";
                for (var _f = 0, _g = response.emailsInvalid; _f < _g.length; _f++) {
                    var email = _g[_f];
                    this.attErrorContent += "<span class='feedback-list'>" + email + "</span>";
                }
                isError = true;
            }
        }
        if (isError) {
            this.attErrorTitle = "There have been some problems";
            this.addAttendersError = true;
        }
        else if (response.attendersAdded.length == 0) {
            this.attErrorTitle = "No emails there!";
            this.addAttendersError = true;
        }
        if (isCorrect) {
            this.attCorrectTitle = "The following users where properly added";
            this.addAttendersCorrect = true;
        }
    };
    CourseDetailsComponent.prototype.changeFilesOrder = function (dragAndDropArray) {
        var _this = this;
        var bagName = dragAndDropArray[0], el = dragAndDropArray[1], target = dragAndDropArray[2], source = dragAndDropArray[3];
        var fileMoved = el.dataset.id;
        var fileGroupSource = source.dataset.id;
        var fileGroupTarget = target.dataset.id;
        var fileNewPosition = this.getFilePosition(fileMoved, fileGroupTarget);
        this.fileService.editFileOrder(fileMoved, fileGroupSource, fileGroupTarget, fileNewPosition, this.course.id).subscribe(function (response) {
            _this.course.courseDetails.files = response;
        }, function (error) { });
    };
    CourseDetailsComponent.prototype.getFilePosition = function (fileMoved, fileGroupTarget) {
        var fileGroupFound = null;
        var i = 0;
        while (!fileGroupFound && i < this.course.courseDetails.files.length) {
            fileGroupFound = this.findFileGroup(fileGroupTarget, this.course.courseDetails.files[i]);
            i++;
        }
        if (fileGroupFound) {
            for (var j = 0; j < fileGroupFound.files.length; j++) {
                if (fileGroupFound.files[j].id == fileMoved) {
                    return j;
                }
            }
        }
        else
            return -1;
    };
    CourseDetailsComponent.prototype.findFileGroup = function (id, currentFileGroup) {
        var i;
        var currentChildFileGroup;
        var result;
        if (id == currentFileGroup.id) {
            return currentFileGroup;
        }
        else {
            for (i = 0; i < currentFileGroup.fileGroups.length; i++) {
                currentChildFileGroup = currentFileGroup.fileGroups[i];
                result = this.findFileGroup(id, currentChildFileGroup);
                if (result !== null) {
                    return result;
                }
            }
            return null;
        }
    };
    CourseDetailsComponent.prototype.isSessionReady = function (session) {
        var d = new Date();
        //return (d.toDateString() === this.numberToDate(session.date).toDateString());
        return true;
    };
    CourseDetailsComponent.prototype.recordVideo = function (publisherOptions) {
        var _this = this;
        this.recordRadioEnabled = false;
        this.OV = new openvidu_browser__WEBPACK_IMPORTED_MODULE_23__["OpenVidu"]();
        this.publisher = this.OV.initPublisher('post-video', publisherOptions, function (err) {
            if (err) {
                _this.publisherErrorMessage = err.message;
                console.warn(err);
                if (err.name === 'SCREEN_EXTENSION_NOT_INSTALLED') {
                    _this.publisherErrorMessage = 'In Chrome you need an extension installed to share your screen. Go to <a href="' + err.message + '">this link</a> to install the extension. YOU MUST REFRESH THE PAGE AFTER INSTALLING IT';
                }
            }
        });
        this.publisher.on('videoElementCreated', function (e) {
            if (publisherOptions.audio && !publisherOptions.video) {
                $(e.element).css({ 'background-color': '#4d4d4d', 'padding': '50px' });
                $(e.element).attr('poster', 'assets/images/volume.png');
            }
        });
        this.publisher.on('videoPlaying', function (e) {
            _this.recordRadioEnabled = true;
            _this.addRecordingControls(e.element);
        });
    };
    CourseDetailsComponent.prototype.startStopRecording = function () {
        var _this = this;
        if (!this.recording) {
            this.recorder = new openvidu_browser__WEBPACK_IMPORTED_MODULE_23__["LocalRecorder"](this.publisher.stream);
            this.recorder.record();
            document.getElementById('record-start-stop').innerHTML = 'Finish';
            document.getElementById('record-pause-resume').style.display = 'inline-block';
        }
        else {
            this.recorder.stop()
                .then(function () {
                document.getElementById('post-video').getElementsByTagName('video')[0].style.display = 'none';
                _this.removeRecordingControls();
                var recordingPreview = _this.recorder.preview('post-video');
                recordingPreview.controls = true;
                _this.addPostRecordingControls(recordingPreview);
            })
                .catch(function (e) { });
        }
        this.recording = !this.recording;
    };
    CourseDetailsComponent.prototype.pauseResumeRecording = function () {
        if (!this.paused) {
            this.recorder.pause();
            document.getElementById('record-pause-resume').innerHTML = 'Resume';
            document.getElementById('post-video').getElementsByTagName('video')[0].pause();
        }
        else {
            this.recorder.resume();
            document.getElementById('record-pause-resume').innerHTML = 'Pause';
            document.getElementById('post-video').getElementsByTagName('video')[0].play();
        }
        this.paused = !this.paused;
    };
    CourseDetailsComponent.prototype.recordRadioChange = function (event) {
        this.cleanRecording();
        this.recordType = event.target.value;
        this.recordVideo(this.getPublisherOptions(this.recordType));
    };
    CourseDetailsComponent.prototype.cleanRecording = function () {
        if (!!this.recorder)
            this.recorder.clean();
        delete this.publisher;
        this.recordRadioEnabled = true;
        this.publisherErrorMessage = '';
        this.recordType = 'video';
        this.removeRecordingControls();
        this.removePostRecordingControls();
        var el = document.getElementById('post-video');
        if (!!el) {
            el = el.getElementsByTagName('video')[0];
            if (!!el) {
                el.outerHTML = '';
            }
        }
        this.recording = false;
        this.paused = false;
    };
    CourseDetailsComponent.prototype.repeatRecording = function (type) {
        this.cleanRecording();
        this.recordType = type;
        this.recordVideo(this.getPublisherOptions(type));
    };
    CourseDetailsComponent.prototype.getPublisherOptions = function (option) {
        var options = {};
        switch (option) {
            case 'video':
                options = {
                    audio: true,
                    video: true,
                    quality: 'MEDIUM'
                };
                break;
            case 'audio':
                options = {
                    audio: true,
                    video: false
                };
                break;
            case 'screen':
                options = {
                    audio: true,
                    video: true,
                    quality: 'MEDIUM',
                    screen: true
                };
                break;
        }
        return options;
    };
    CourseDetailsComponent.prototype.addRecordingControls = function (videoElement) {
        var dataNode = document.createElement('div');
        dataNode.id = 'recording-controls';
        dataNode.innerHTML =
            '<a id="record-start-stop" class="btn waves-effect button-small button-small-margin" title="Start/End recording">Start</a>' +
                '<a id="record-pause-resume" class="btn waves-effect button-small button-small-margin" title="Pause/Resume recording" style="display: none">Pause</a>' +
                '<a id="record-cancel" class="btn waves-effect button-small button-small-margin" title="Cancel recording">Cancel</a>';
        videoElement.parentNode.insertBefore(dataNode, videoElement.nextSibling);
        document.getElementById('record-start-stop').addEventListener('click', this.startStopRecording.bind(this));
        document.getElementById('record-pause-resume').addEventListener('click', this.pauseResumeRecording.bind(this));
        document.getElementById('record-cancel').addEventListener('click', this.cleanRecording.bind(this));
    };
    CourseDetailsComponent.prototype.removeRecordingControls = function () {
        var el = document.getElementById('recording-controls');
        if (!!el) {
            el.outerHTML = '';
        }
    };
    CourseDetailsComponent.prototype.addPostRecordingControls = function (videoElement) {
        var dataNode = document.createElement('div');
        dataNode.id = 'recording-post-controls';
        dataNode.innerHTML =
            '<a id="record-post-repeat" class="btn waves-effect button-small button-small-margin" title="Repeat recording">Repeat</a>' +
                '<button id="record-post-send" class="btn waves-effect button-small button-small-margin" title="Send entry" type="submit">Send</button>';
        videoElement.parentNode.insertBefore(dataNode, videoElement.nextSibling);
        var recordTypeAux = this.recordType;
        document.getElementById('record-post-repeat').addEventListener('click', this.repeatRecording.bind(this, recordTypeAux));
    };
    CourseDetailsComponent.prototype.removePostRecordingControls = function () {
        var el = document.getElementById('recording-post-controls');
        if (!!el) {
            el.outerHTML = '';
        }
    };
    CourseDetailsComponent.prototype.replaceComment = function (comments, newComment) {
        var rep = false;
        for (var i = 0; i < comments.length; i++) {
            if (comments[i].id === newComment.id) {
                comments[i] = newComment;
                return true;
            }
            if (comments[i].replies.length > 0) {
                var replaced = this.replaceComment(comments[i].replies, newComment);
                if (replaced) {
                    rep = true;
                    break;
                }
            }
        }
        return rep;
    };
    CourseDetailsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-course-details',
            providers: [_services_files_edition_service__WEBPACK_IMPORTED_MODULE_8__["FilesEditionService"]],
            template: __webpack_require__(/*! ./course-details.component.html */ "./src/app/components/course-details/course-details.component.html"),
            animations: [
                Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["trigger"])('fadeAnim', [
                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["state"])('commentsShown', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["style"])({
                        opacity: 1
                    })),
                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["state"])('commentsHidden', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["style"])({
                        opacity: 0.2
                    })),
                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["transition"])('commentsHidden => commentsShown', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["animate"])('.4s')),
                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["transition"])('commentsShown => commentsHidden', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["animate"])('.1s')),
                ]),
            ],
            styles: [__webpack_require__(/*! ./course-details.component.css */ "./src/app/components/course-details/course-details.component.css")]
        }),
        __metadata("design:paramtypes", [_services_course_service__WEBPACK_IMPORTED_MODULE_9__["CourseService"],
            _services_forum_service__WEBPACK_IMPORTED_MODULE_11__["ForumService"],
            _services_file_service__WEBPACK_IMPORTED_MODULE_12__["FileService"],
            _services_session_service__WEBPACK_IMPORTED_MODULE_10__["SessionService"],
            _services_animation_service__WEBPACK_IMPORTED_MODULE_15__["AnimationService"],
            _services_authentication_service__WEBPACK_IMPORTED_MODULE_13__["AuthenticationService"],
            _services_video_session_service__WEBPACK_IMPORTED_MODULE_14__["VideoSessionService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"],
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["Location"],
            _services_course_details_modal_data_service__WEBPACK_IMPORTED_MODULE_6__["CourseDetailsModalDataService"],
            _services_uploader_modal_service__WEBPACK_IMPORTED_MODULE_7__["UploaderModalService"],
            _services_files_edition_service__WEBPACK_IMPORTED_MODULE_8__["FilesEditionService"],
            ng2_dragula_ng2_dragula__WEBPACK_IMPORTED_MODULE_5__["DragulaService"]])
    ], CourseDetailsComponent);
    return CourseDetailsComponent;
}());



/***/ }),

/***/ "./src/app/components/dashboard/dashboard.component.css":
/*!**************************************************************!*\
  !*** ./src/app/components/dashboard/dashboard.component.css ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".anchor-routing {\n  color: inherit !important;\n}\n\nli:hover {\n  background-color: rgba(224, 224, 224, 0.2);\n  transition: all .2s ease-out;\n}\n\n.dashboard-title {\n  font-size: 1.5rem;\n  font-weight: 300;\n  padding-bottom: 15px;\n}\n\n.course-title {\n  cursor: pointer;\n}\n\nspan.title {\n  font-weight: bold;\n}\n\n.session-list-item {\n  margin-top: 15px;\n  margin-bottom: 0;\n}\n\nli.collection-item {\n  position: relative;\n}\n\n.loading-details {\n  -webkit-animation: spinIcon 0.7s infinite linear;\n          animation: spinIcon 0.7s infinite linear;\n}\n\n.sessionImage {\n  display: inline;\n}\n\nli.li-warning {\n  padding-left: 7.5px;\n  padding-right: 7.5px;\n}\n\n.course-put-icon {\n  font-size: 20px;\n  color: #5e615f;\n  cursor: pointer;\n}\n\n.course-put-icon:hover {\n  color: #91a59b;\n}\n\n@media only screen and (min-width: 993px) {\n  .sessionImage {\n    width: 70px;\n    height: 70px;\n  }\n}\n\n@media only screen and (max-width: 992px) {\n  .sessionImage {\n    width: 45px;\n    height: 45px;\n  }\n}\n\n@media only screen and (min-width: 601px) {\n  .calendar-div {\n    display: flex;\n    align-items: center;\n  }\n}\n\n/*Mobile phones*/\n\n@media only screen and (max-width: 600px) and (orientation: portrait), screen and (max-width: 992px) and (orientation: landscape) {\n  .container-ul {\n    width: 100%;\n    margin-top: 0;\n    margin-bottom: 0;\n  }\n  .dashboard-title{\n    text-align: center;\n  }\n  .calendar-div{\n    margin-left: 12px;\n    margin-right: 12px;\n    margin-bottom: 35px;\n  }\n  .dashboard-col{\n    margin-top: 30px;\n  }\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29tcG9uZW50cy9kYXNoYm9hcmQvZGFzaGJvYXJkLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSx5QkFBeUI7QUFDM0I7O0FBRUE7RUFDRSwwQ0FBMEM7RUFDMUMsNEJBQTRCO0FBQzlCOztBQUVBO0VBQ0UsaUJBQWlCO0VBQ2pCLGdCQUFnQjtFQUNoQixvQkFBb0I7QUFDdEI7O0FBRUE7RUFDRSxlQUFlO0FBQ2pCOztBQUVBO0VBQ0UsaUJBQWlCO0FBQ25COztBQUVBO0VBQ0UsZ0JBQWdCO0VBQ2hCLGdCQUFnQjtBQUNsQjs7QUFFQTtFQUNFLGtCQUFrQjtBQUNwQjs7QUFFQTtFQUNFLGdEQUF3QztVQUF4Qyx3Q0FBd0M7QUFDMUM7O0FBRUE7RUFDRSxlQUFlO0FBQ2pCOztBQUVBO0VBQ0UsbUJBQW1CO0VBQ25CLG9CQUFvQjtBQUN0Qjs7QUFFQTtFQUNFLGVBQWU7RUFDZixjQUFjO0VBQ2QsZUFBZTtBQUNqQjs7QUFFQTtFQUNFLGNBQWM7QUFDaEI7O0FBRUE7RUFDRTtJQUNFLFdBQVc7SUFDWCxZQUFZO0VBQ2Q7QUFDRjs7QUFFQTtFQUNFO0lBQ0UsV0FBVztJQUNYLFlBQVk7RUFDZDtBQUNGOztBQUVBO0VBQ0U7SUFHRSxhQUFhO0lBR2IsbUJBQW1CO0VBQ3JCO0FBQ0Y7O0FBRUEsZ0JBQWdCOztBQUNoQjtFQUNFO0lBQ0UsV0FBVztJQUNYLGFBQWE7SUFDYixnQkFBZ0I7RUFDbEI7RUFDQTtJQUNFLGtCQUFrQjtFQUNwQjtFQUNBO0lBQ0UsaUJBQWlCO0lBQ2pCLGtCQUFrQjtJQUNsQixtQkFBbUI7RUFDckI7RUFDQTtJQUNFLGdCQUFnQjtFQUNsQjtBQUNGIiwiZmlsZSI6InNyYy9hcHAvY29tcG9uZW50cy9kYXNoYm9hcmQvZGFzaGJvYXJkLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuYW5jaG9yLXJvdXRpbmcge1xuICBjb2xvcjogaW5oZXJpdCAhaW1wb3J0YW50O1xufVxuXG5saTpob3ZlciB7XG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjI0LCAyMjQsIDIyNCwgMC4yKTtcbiAgdHJhbnNpdGlvbjogYWxsIC4ycyBlYXNlLW91dDtcbn1cblxuLmRhc2hib2FyZC10aXRsZSB7XG4gIGZvbnQtc2l6ZTogMS41cmVtO1xuICBmb250LXdlaWdodDogMzAwO1xuICBwYWRkaW5nLWJvdHRvbTogMTVweDtcbn1cblxuLmNvdXJzZS10aXRsZSB7XG4gIGN1cnNvcjogcG9pbnRlcjtcbn1cblxuc3Bhbi50aXRsZSB7XG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xufVxuXG4uc2Vzc2lvbi1saXN0LWl0ZW0ge1xuICBtYXJnaW4tdG9wOiAxNXB4O1xuICBtYXJnaW4tYm90dG9tOiAwO1xufVxuXG5saS5jb2xsZWN0aW9uLWl0ZW0ge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG59XG5cbi5sb2FkaW5nLWRldGFpbHMge1xuICBhbmltYXRpb246IHNwaW5JY29uIDAuN3MgaW5maW5pdGUgbGluZWFyO1xufVxuXG4uc2Vzc2lvbkltYWdlIHtcbiAgZGlzcGxheTogaW5saW5lO1xufVxuXG5saS5saS13YXJuaW5nIHtcbiAgcGFkZGluZy1sZWZ0OiA3LjVweDtcbiAgcGFkZGluZy1yaWdodDogNy41cHg7XG59XG5cbi5jb3Vyc2UtcHV0LWljb24ge1xuICBmb250LXNpemU6IDIwcHg7XG4gIGNvbG9yOiAjNWU2MTVmO1xuICBjdXJzb3I6IHBvaW50ZXI7XG59XG5cbi5jb3Vyc2UtcHV0LWljb246aG92ZXIge1xuICBjb2xvcjogIzkxYTU5Yjtcbn1cblxuQG1lZGlhIG9ubHkgc2NyZWVuIGFuZCAobWluLXdpZHRoOiA5OTNweCkge1xuICAuc2Vzc2lvbkltYWdlIHtcbiAgICB3aWR0aDogNzBweDtcbiAgICBoZWlnaHQ6IDcwcHg7XG4gIH1cbn1cblxuQG1lZGlhIG9ubHkgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA5OTJweCkge1xuICAuc2Vzc2lvbkltYWdlIHtcbiAgICB3aWR0aDogNDVweDtcbiAgICBoZWlnaHQ6IDQ1cHg7XG4gIH1cbn1cblxuQG1lZGlhIG9ubHkgc2NyZWVuIGFuZCAobWluLXdpZHRoOiA2MDFweCkge1xuICAuY2FsZW5kYXItZGl2IHtcbiAgICBkaXNwbGF5OiAtd2Via2l0LWZsZXg7XG4gICAgZGlzcGxheTogLW1zLWZsZXhib3g7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICAtd2Via2l0LWFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgLW1zLWZsZXgtYWxpZ246IGNlbnRlcjtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICB9XG59XG5cbi8qTW9iaWxlIHBob25lcyovXG5AbWVkaWEgb25seSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDYwMHB4KSBhbmQgKG9yaWVudGF0aW9uOiBwb3J0cmFpdCksIHNjcmVlbiBhbmQgKG1heC13aWR0aDogOTkycHgpIGFuZCAob3JpZW50YXRpb246IGxhbmRzY2FwZSkge1xuICAuY29udGFpbmVyLXVsIHtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBtYXJnaW4tdG9wOiAwO1xuICAgIG1hcmdpbi1ib3R0b206IDA7XG4gIH1cbiAgLmRhc2hib2FyZC10aXRsZXtcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIH1cbiAgLmNhbGVuZGFyLWRpdntcbiAgICBtYXJnaW4tbGVmdDogMTJweDtcbiAgICBtYXJnaW4tcmlnaHQ6IDEycHg7XG4gICAgbWFyZ2luLWJvdHRvbTogMzVweDtcbiAgfVxuICAuZGFzaGJvYXJkLWNvbHtcbiAgICBtYXJnaW4tdG9wOiAzMHB4O1xuICB9XG59XG4iXX0= */"

/***/ }),

/***/ "./src/app/components/dashboard/dashboard.component.html":
/*!***************************************************************!*\
  !*** ./src/app/components/dashboard/dashboard.component.html ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"!this.courses\" class=\"loading\"></div>\n\n<div *ngIf=\"this.courses\">\n\n  <!--POST COURSE DIALOG-->\n  <div id=\"course-modal\" class=\"modal my-modal-class course-modal\" materialize=\"modal\" [materializeParams]=\"[{dismissible: false}]\" [materializeActions]=\"actions1\">\n\n    <div *ngIf=\"processingPost\" class=\"loading\"></div>\n\n    <div class=\"modal-content\" [class.filtered]=\"processingPost\">\n      <p class=\"p-bold-modal-header\">New course</p>\n      <div class=\"row no-margin\">\n\n        <form materialize #courseForm class=\"col s12\" (ngSubmit)=\"onCourseSubmit(); courseForm.reset();\">\n          <div class=\"row no-margin\">\n\n            <div class=\"row row-mobile\">\n              <div class=\"input-field col s12\">\n                <input [(ngModel)]=\"inputPostCourseName\" name=\"inputPostCourseName\" id=\"input-post-course-name\" type=\"text\" class=\"validate\" autocomplete=\"off\" required>\n                <label for=\"inputPostCourseName\">Course name</label>\n              </div>\n            </div>\n\n            <div class=\"row\">\n              <div class=\"input-field file-field col s12\">\n                <div>\n                  <img class=\"circle\" src=\"../assets/images/default_session_image.png\">\n                  <input type=\"file\" name=\"inputPostCourseImage\" id=\"inputPostCourseImage\">\n                </div>\n              </div>\n            </div>\n\n          </div>\n          <div class=\"row right-align row-mobile\">\n            <a (click)=\"courseForm.reset();\" class=\"modal-action modal-close waves-effect btn-flat modal-footer-button cancel-modal-btn\">Cancel</a>\n            <button type=\"submit\" id=\"submit-post-course-btn\" class=\"waves-effect btn-flat modal-footer-button\">Send</button>\n          </div>\n        </form>\n\n      </div>\n    </div>\n  </div>\n  <!--POST COURSE DIALOG-->\n\n  <!--PUT/DELETE COURSE DIALOG-->\n  <div *ngIf=\"this.courses.length > 0 && this.authenticationService.isLoggedIn() && this.authenticationService.isTeacher()\" id=\"put-delete-course-modal\" class=\"modal my-modal-class course-modal\" materialize=\"modal\" [materializeParams]=\"[{dismissible: false}]\" [materializeActions]=\"actions4\">\n\n    <div *ngIf=\"processingPut\" class=\"loading\"></div>\n\n    <div class=\"modal-content\" [class.filtered]=\"processingPut\">\n      <p class=\"p-bold-modal-header\">Modify course</p>\n      <div class=\"row no-margin\">\n\n        <form materialize #putDeleteCourseForm class=\"col s12\" (ngSubmit)=\"onPutDeleteCourseSubmit(); putDeleteCourseForm.reset(); this.allowCourseDeletion = false;\">\n          <div class=\"row no-margin\">\n\n            <div class=\"row row-mobile\">\n              <label for=\"inputPutCourseName\">Course name</label>\n              <div class=\"input-field col s12\">\n                <input [(ngModel)]=\"inputPutCourseName\" name=\"inputPutCourseName\" id=\"input-put-course-name\" type=\"text\" class=\"validate\" required>\n              </div>\n            </div>\n\n            <div class=\"row\">\n              <div class=\"input-field file-field col s12\">\n                <div>\n                  <img class=\"circle\" src=\"../assets/images/default_session_image.png\">\n                  <input type=\"file\" name=\"inputPutCourseImage\" id=\"inputPutCourseImage\">\n                </div>\n              </div>\n            </div>\n\n          </div>\n          <div class=\"row no-margin-bottom right-align\">\n            <div class=\"valign-wrapper delete-div\">\n              <a id=\"delete-course-btn\" (click)=\"this.deleteCourse(); putDeleteCourseForm.reset();  this.allowCourseDeletion = false;\" class=\"waves-effect btn-flat modal-footer-button float-to-left\" [class.disabled]=\"!this.allowCourseDeletion\">Delete</a>\n              <div class=\"float-to-left\">\n                <input #deleteCheckbox type=\"checkbox\" class=\"filled-in\" id=\"delete-checkbox\" name=\"delete-checkbox\" (change)=\"this.allowCourseDeletion = deleteCheckbox.checked\"/>\n                <label for=\"delete-checkbox\" id=\"label-delete-checkbox\">Allow deletion?</label>\n              </div>\n            </div>\n            <a (click)=\"putDeleteCourseForm.reset(); this.allowCourseDeletion = false;\" class=\"modal-action modal-close waves-effect btn-flat modal-footer-button cancel-modal-btn\">Cancel</a>\n            <button type=\"submit\" id=\"submit-put-course-btn\" class=\"waves-effect btn-flat modal-footer-button\">Send</button>\n          </div>\n        </form>\n\n      </div>\n    </div>\n  </div>\n  <!--PUT/DELETE COURSE DIALOG-->\n\n  <div class=\"container container-ul margins-top-bottom\">\n    <div class=\"row no-margin\">\n\n      <div class=\"col l6 m5 s12 dashboard-col\">\n        <div class=\"dashboard-title\">MY COURSES\n          <a href=\"#course-modal\" id=\"add-new-course-btn\" *ngIf=\"this.authenticationService.isLoggedIn() && this.authenticationService.isTeacher()\" (click)=\"this.animationService.animateIfSmall()\" [title]=\"'Add new course'\">\n            <i id=\"add-course-icon\" class=\"material-icons add-element-icon\">add_circle_outline</i>\n          </a>\n        </div>\n        <ul id=\"course-list\" class=\"collection\">\n          <li *ngIf=\"courses.length === 0 && this.authenticationService.isStudent()\" class=\"li-warning\"><app-error-message [errorTitle]=\"'You do not have any courses'\" [errorContent]=\"'Your teacher must invite you'\" [customClass]=\"'warning'\" [closable]=\"false\"></app-error-message></li>\n          <li *ngIf=\"courses.length === 0 && this.authenticationService.isTeacher()\" class=\"li-warning\"><app-error-message [errorTitle]=\"'You do not have any courses'\" [errorContent]=\"'You can add one by clicking on the icon above'\" [customClass]=\"'warning'\" [closable]=\"false\"></app-error-message></li>\n          <li *ngFor=\"let course of courses; let i = index\" class=\"collection-item course-list-item\">\n            <div class=\"row session-list-item valign-wrapper\">\n\n              <div class=\"col l4 m3 s3 valign center-align\">\n                <img materialize=\"materialbox\" class=\"circle materialboxed sessionImage\" src={{this.getImage(course)}}>\n              </div>\n\n              <div (click)=\"goToCourseDetail(course.id)\" class=\"col l6 m7 s7 valign course-title\">\n                <span class=\"title\">{{course?.title}}</span>\n              </div>\n\n              <div class=\"col l2 m2 s2 right-align no-padding-lateral\">\n                <a href=\"#put-delete-course-modal\" *ngIf=\"this.authenticationService.isLoggedIn() && this.authenticationService.isTeacher()\" (click)=\"this.changeUpdatedCourse(course); this.animationService.animateIfSmall()\" [title]=\"'Modify course'\">\n                  <i class=\"material-icons course-put-icon\">mode_edit</i>\n                </a>\n              </div>\n\n            </div>\n          </li>\n        </ul>\n      </div>\n\n      <div class=\"col l6 m7 s12 dashboard-col\">\n        <div class=\"dashboard-title\">MY CALENDAR</div>\n        <div class=\"calendar-div\">\n          <calendar-app></calendar-app>\n        </div>\n      </div>\n\n    </div>\n  </div>\n\n</div>\n"

/***/ }),

/***/ "./src/app/components/dashboard/dashboard.component.ts":
/*!*************************************************************!*\
  !*** ./src/app/components/dashboard/dashboard.component.ts ***!
  \*************************************************************/
/*! exports provided: DashboardComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DashboardComponent", function() { return DashboardComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _classes_course__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../classes/course */ "./src/app/classes/course.ts");
/* harmony import */ var _classes_course_details__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../classes/course-details */ "./src/app/classes/course-details.ts");
/* harmony import */ var _classes_forum__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../classes/forum */ "./src/app/classes/forum.ts");
/* harmony import */ var _services_course_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../services/course.service */ "./src/app/services/course.service.ts");
/* harmony import */ var _services_authentication_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../services/authentication.service */ "./src/app/services/authentication.service.ts");
/* harmony import */ var _services_animation_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../services/animation.service */ "./src/app/services/animation.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var DashboardComponent = /** @class */ (function () {
    function DashboardComponent(courseService, authenticationService, animationService, router) {
        this.courseService = courseService;
        this.authenticationService = authenticationService;
        this.animationService = animationService;
        this.router = router;
        //POST MODAL
        this.processingPost = false;
        //PUT-DELETE MODAL
        this.processingPut = false;
        this.allowCourseDeletion = false;
        this.actions1 = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.actions4 = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
    }
    DashboardComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.authenticationService.checkCredentials()
            .then(function () { _this.getCourses(); })
            .catch(function (e) { });
    };
    DashboardComponent.prototype.goToCourseDetail = function (id) {
        this.router.navigate(['/courses', id, 0]);
    };
    DashboardComponent.prototype.logout = function () {
        this.authenticationService.logOut();
    };
    DashboardComponent.prototype.getCourses = function () {
        var _this = this;
        this.courseService.getCourses(this.authenticationService.getCurrentUser()).subscribe(function (courses) {
            _this.authenticationService.getCurrentUser().courses = courses;
            _this.courses = courses;
            if (_this.courses.length > 0)
                _this.updatedCourse = _this.courses[0];
        }, function (error) { });
    };
    DashboardComponent.prototype.getImage = function (c) {
        if (c.image) {
            return c.image;
        }
        else {
            //return c.teacher.picture;
            return "/../assets/images/default_session_image.png";
        }
    };
    //POST new Course
    DashboardComponent.prototype.onCourseSubmit = function () {
        var _this = this;
        this.processingPost = true;
        var newForum = new _classes_forum__WEBPACK_IMPORTED_MODULE_4__["Forum"](true);
        var newCourseDetails = new _classes_course_details__WEBPACK_IMPORTED_MODULE_3__["CourseDetails"](newForum, []);
        var newCourse = new _classes_course__WEBPACK_IMPORTED_MODULE_2__["Course"](this.inputPostCourseName, this.authenticationService.getCurrentUser().picture, newCourseDetails);
        this.courseService.newCourse(newCourse).subscribe(function (course) {
            _this.courses.push(course);
            _this.processingPost = false;
            _this.actions1.emit({ action: "modal", params: ['close'] });
        }, function (error) { _this.processingPost = false; });
    };
    //PUT existing Course
    DashboardComponent.prototype.onPutDeleteCourseSubmit = function () {
        var _this = this;
        this.processingPut = true;
        var c = new _classes_course__WEBPACK_IMPORTED_MODULE_2__["Course"](this.inputPutCourseName, this.updatedCourse.image, this.updatedCourse.courseDetails);
        c.id = this.updatedCourse.id;
        this.courseService.editCourse(c, "updating course name").subscribe(function (response) {
            //Only on succesful put we locally update the modified course
            for (var i = 0; i < _this.courses.length; i++) {
                if (_this.courses[i].id == response.id) {
                    _this.courses[i] = response; //The session with the required ID is updated
                    _this.updatedCourse = _this.courses[i];
                    break;
                }
            }
            _this.processingPut = false;
            _this.actions4.emit({ action: "modal", params: ['close'] });
        }, function (error) { _this.processingPut = false; });
    };
    //DELETE existing Course
    DashboardComponent.prototype.deleteCourse = function () {
        var _this = this;
        this.courseService.deleteCourse(this.updatedCourse.id).subscribe(function (response) {
            //Only on succesful put we locally delete the course
            for (var i = 0; i < _this.courses.length; i++) {
                if (_this.courses[i].id == response.id) {
                    _this.courses.splice(i, 1); //The course with the required ID is deleted
                    _this.updatedCourse = _this.courses[0];
                    break;
                }
            }
            _this.actions4.emit({ action: "modal", params: ['close'] });
        }, function (error) { });
    };
    DashboardComponent.prototype.changeUpdatedCourse = function (course) {
        this.updatedCourse = course;
        this.inputPutCourseName = this.updatedCourse.title;
    };
    DashboardComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-dashboard',
            template: __webpack_require__(/*! ./dashboard.component.html */ "./src/app/components/dashboard/dashboard.component.html"),
            styles: [__webpack_require__(/*! ./dashboard.component.css */ "./src/app/components/dashboard/dashboard.component.css")]
        }),
        __metadata("design:paramtypes", [_services_course_service__WEBPACK_IMPORTED_MODULE_5__["CourseService"],
            _services_authentication_service__WEBPACK_IMPORTED_MODULE_6__["AuthenticationService"],
            _services_animation_service__WEBPACK_IMPORTED_MODULE_7__["AnimationService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"]])
    ], DashboardComponent);
    return DashboardComponent;
}());



/***/ }),

/***/ "./src/app/components/error-message/error-message.component.css":
/*!**********************************************************************!*\
  !*** ./src/app/components/error-message/error-message.component.css ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".card-panel {\n  box-shadow: none !important;\n  text-align: initial;\n}\n\n.fail {\n  background-color: rgba(167, 56, 65, 0.2);\n  color: #a73841;\n}\n\n.warning {\n  background-color: rgba(175, 110, 0, 0.2);\n  color: #af6e00;\n}\n\n.card-panel.warning {\n  margin-bottom: 0.5rem;\n}\n\n.correct {\n  background-color: rgba(55, 86, 70, 0.25);\n  color: #375546;\n}\n\ni {\n  cursor: pointer;\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29tcG9uZW50cy9lcnJvci1tZXNzYWdlL2Vycm9yLW1lc3NhZ2UuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLDJCQUEyQjtFQUMzQixtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSx3Q0FBd0M7RUFDeEMsY0FBYztBQUNoQjs7QUFFQTtFQUNFLHdDQUF3QztFQUN4QyxjQUFjO0FBQ2hCOztBQUVBO0VBQ0UscUJBQXFCO0FBQ3ZCOztBQUVBO0VBQ0Usd0NBQXdDO0VBQ3hDLGNBQWM7QUFDaEI7O0FBRUE7RUFDRSxlQUFlO0FBQ2pCIiwiZmlsZSI6InNyYy9hcHAvY29tcG9uZW50cy9lcnJvci1tZXNzYWdlL2Vycm9yLW1lc3NhZ2UuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi5jYXJkLXBhbmVsIHtcbiAgYm94LXNoYWRvdzogbm9uZSAhaW1wb3J0YW50O1xuICB0ZXh0LWFsaWduOiBpbml0aWFsO1xufVxuXG4uZmFpbCB7XG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMTY3LCA1NiwgNjUsIDAuMik7XG4gIGNvbG9yOiAjYTczODQxO1xufVxuXG4ud2FybmluZyB7XG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMTc1LCAxMTAsIDAsIDAuMik7XG4gIGNvbG9yOiAjYWY2ZTAwO1xufVxuXG4uY2FyZC1wYW5lbC53YXJuaW5nIHtcbiAgbWFyZ2luLWJvdHRvbTogMC41cmVtO1xufVxuXG4uY29ycmVjdCB7XG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoNTUsIDg2LCA3MCwgMC4yNSk7XG4gIGNvbG9yOiAjMzc1NTQ2O1xufVxuXG5pIHtcbiAgY3Vyc29yOiBwb2ludGVyO1xufVxuIl19 */"

/***/ }),

/***/ "./src/app/components/error-message/error-message.component.html":
/*!***********************************************************************!*\
  !*** ./src/app/components/error-message/error-message.component.html ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"card-panel\" [ngClass]=\"customClass\">\n  <i *ngIf=\"closable\" class=\"material-icons right\" (click)=\"closeAlert()\">clear</i>\n  <h5>{{this.errorTitle}}</h5>\n  <p [innerHTML]=\"this.errorContent\"></p>\n</div>\n"

/***/ }),

/***/ "./src/app/components/error-message/error-message.component.ts":
/*!*********************************************************************!*\
  !*** ./src/app/components/error-message/error-message.component.ts ***!
  \*********************************************************************/
/*! exports provided: ErrorMessageComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ErrorMessageComponent", function() { return ErrorMessageComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ErrorMessageComponent = /** @class */ (function () {
    function ErrorMessageComponent() {
        this.eventShowable = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
    }
    ErrorMessageComponent.prototype.closeAlert = function () {
        this.eventShowable.emit(false);
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", String)
    ], ErrorMessageComponent.prototype, "errorTitle", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", String)
    ], ErrorMessageComponent.prototype, "errorContent", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", String)
    ], ErrorMessageComponent.prototype, "customClass", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Boolean)
    ], ErrorMessageComponent.prototype, "closable", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Number)
    ], ErrorMessageComponent.prototype, "timeable", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], ErrorMessageComponent.prototype, "eventShowable", void 0);
    ErrorMessageComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-error-message',
            template: __webpack_require__(/*! ./error-message.component.html */ "./src/app/components/error-message/error-message.component.html"),
            styles: [__webpack_require__(/*! ./error-message.component.css */ "./src/app/components/error-message/error-message.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], ErrorMessageComponent);
    return ErrorMessageComponent;
}());



/***/ }),

/***/ "./src/app/components/file-group/file-group.component.css":
/*!****************************************************************!*\
  !*** ./src/app/components/file-group/file-group.component.css ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".file-group-root {\n  padding-left: 15px;\n  margin-bottom: 30px;\n}\n\n.file-group-child {\n  padding-left: 30px !important;\n  margin-bottom: 20px !important;\n}\n\n.file-group-title h5 {\n  font-size: 1.1rem;\n  font-weight: 300;\n}\n\n.file-group-title-div {\n  padding-left: 0.656em;\n  margin-top: 20px;\n}\n\n.buttons-container-div {\n  padding-bottom: 0.656rem;\n  margin-bottom: 0.656em;\n}\n\n.mode-edit-icon {\n  max-height: 24px;\n  margin-left: 10px;\n}\n\n.chip-file {\n  display: flex;\n  min-width: 300px;\n  cursor: pointer;\n  padding-left: 0;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -o-user-select: none;\n  -ms-user-select: none;\n      user-select: none;\n}\n\n.file-extension {\n  background-color: #FFFFFF;\n  border-radius: 15px;\n  padding: 1px 3px 1px 3px;\n  margin-right: 2px;\n  font-size: 13px;\n  border: 3px solid #e0e0e0;\n  height: 32px;\n  line-height: 23px;\n  min-width: 32px;\n  text-align: center;\n}\n\nh5 {\n  display: inline-block;\n}\n\n.disp-inline-flex {\n  display: inline-flex;\n}\n\n.file-controls {\n  display: inline-block;\n}\n\n.button-add-file {\n  margin-left: 5px;\n  margin-right: 2.5px;\n  border: 1px solid #e4e4e4;\n  padding-left: 10px;\n  padding-right: 10px;\n  font-size: x-small;\n  font-weight: 500;\n}\n\n.action-file-icon {\n  cursor: pointer;\n  margin-left: 3px;\n  margin-right: 3px;\n}\n\n.action-file-icon:hover {\n  color: #91a59b;\n}\n\n.drag-bag-editable {\n  min-height: 35px;\n}\n\n.drag-handle {\n  cursor: move;\n  cursor: grab;\n  cursor: -webkit-grab;\n}\n\n.drag-handle:active {\n  cursor: grabbing;\n  cursor: -webkit-grabbing;\n}\n\n.title-edit {\n  background-color: rgb(243, 243, 243);\n}\n\n/*Mobile phones*/\n\n@media only screen and (max-width: 600px) and (orientation: portrait), screen and (max-width: 992px) and (orientation: landscape) {\n  .chip-file {\n    min-width: 230px !important;\n    margin-bottom: 0px !important;\n    margin-top: 5px !important;\n  }\n  .file-controls {\n    display: block !important;\n  }\n}\n\n/*End mobile phones*/\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29tcG9uZW50cy9maWxlLWdyb3VwL2ZpbGUtZ3JvdXAuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGtCQUFrQjtFQUNsQixtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSw2QkFBNkI7RUFDN0IsOEJBQThCO0FBQ2hDOztBQUVBO0VBQ0UsaUJBQWlCO0VBQ2pCLGdCQUFnQjtBQUNsQjs7QUFFQTtFQUNFLHFCQUFxQjtFQUNyQixnQkFBZ0I7QUFDbEI7O0FBRUE7RUFDRSx3QkFBd0I7RUFDeEIsc0JBQXNCO0FBQ3hCOztBQUVBO0VBQ0UsZ0JBQWdCO0VBQ2hCLGlCQUFpQjtBQUNuQjs7QUFFQTtFQUdFLGFBQWE7RUFDYixnQkFBZ0I7RUFDaEIsZUFBZTtFQUNmLGVBQWU7RUFDZix5QkFBeUI7RUFFekIsc0JBQXNCO0VBQ3RCLG9CQUFvQjtFQUNwQixxQkFBaUI7TUFBakIsaUJBQWlCO0FBQ25COztBQUVBO0VBQ0UseUJBQXlCO0VBQ3pCLG1CQUFtQjtFQUNuQix3QkFBd0I7RUFDeEIsaUJBQWlCO0VBQ2pCLGVBQWU7RUFDZix5QkFBeUI7RUFDekIsWUFBWTtFQUNaLGlCQUFpQjtFQUNqQixlQUFlO0VBQ2Ysa0JBQWtCO0FBQ3BCOztBQUVBO0VBQ0UscUJBQXFCO0FBQ3ZCOztBQUVBO0VBQ0Usb0JBQW9CO0FBQ3RCOztBQUVBO0VBQ0UscUJBQXFCO0FBQ3ZCOztBQUVBO0VBQ0UsZ0JBQWdCO0VBQ2hCLG1CQUFtQjtFQUNuQix5QkFBeUI7RUFDekIsa0JBQWtCO0VBQ2xCLG1CQUFtQjtFQUNuQixrQkFBa0I7RUFDbEIsZ0JBQWdCO0FBQ2xCOztBQUVBO0VBQ0UsZUFBZTtFQUNmLGdCQUFnQjtFQUNoQixpQkFBaUI7QUFDbkI7O0FBRUE7RUFDRSxjQUFjO0FBQ2hCOztBQUVBO0VBQ0UsZ0JBQWdCO0FBQ2xCOztBQUVBO0VBQ0UsWUFBWTtFQUNaLFlBQVk7RUFFWixvQkFBb0I7QUFDdEI7O0FBRUE7RUFDRSxnQkFBZ0I7RUFFaEIsd0JBQXdCO0FBQzFCOztBQUVBO0VBQ0Usb0NBQW9DO0FBQ3RDOztBQUVBLGdCQUFnQjs7QUFDaEI7RUFDRTtJQUNFLDJCQUEyQjtJQUMzQiw2QkFBNkI7SUFDN0IsMEJBQTBCO0VBQzVCO0VBQ0E7SUFDRSx5QkFBeUI7RUFDM0I7QUFDRjs7QUFDQSxvQkFBb0IiLCJmaWxlIjoic3JjL2FwcC9jb21wb25lbnRzL2ZpbGUtZ3JvdXAvZmlsZS1ncm91cC5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmZpbGUtZ3JvdXAtcm9vdCB7XG4gIHBhZGRpbmctbGVmdDogMTVweDtcbiAgbWFyZ2luLWJvdHRvbTogMzBweDtcbn1cblxuLmZpbGUtZ3JvdXAtY2hpbGQge1xuICBwYWRkaW5nLWxlZnQ6IDMwcHggIWltcG9ydGFudDtcbiAgbWFyZ2luLWJvdHRvbTogMjBweCAhaW1wb3J0YW50O1xufVxuXG4uZmlsZS1ncm91cC10aXRsZSBoNSB7XG4gIGZvbnQtc2l6ZTogMS4xcmVtO1xuICBmb250LXdlaWdodDogMzAwO1xufVxuXG4uZmlsZS1ncm91cC10aXRsZS1kaXYge1xuICBwYWRkaW5nLWxlZnQ6IDAuNjU2ZW07XG4gIG1hcmdpbi10b3A6IDIwcHg7XG59XG5cbi5idXR0b25zLWNvbnRhaW5lci1kaXYge1xuICBwYWRkaW5nLWJvdHRvbTogMC42NTZyZW07XG4gIG1hcmdpbi1ib3R0b206IDAuNjU2ZW07XG59XG5cbi5tb2RlLWVkaXQtaWNvbiB7XG4gIG1heC1oZWlnaHQ6IDI0cHg7XG4gIG1hcmdpbi1sZWZ0OiAxMHB4O1xufVxuXG4uY2hpcC1maWxlIHtcbiAgZGlzcGxheTogLXdlYmtpdC1mbGV4O1xuICBkaXNwbGF5OiAtbXMtZmxleGJveDtcbiAgZGlzcGxheTogZmxleDtcbiAgbWluLXdpZHRoOiAzMDBweDtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICBwYWRkaW5nLWxlZnQ6IDA7XG4gIC13ZWJraXQtdXNlci1zZWxlY3Q6IG5vbmU7XG4gIC1raHRtbC11c2VyLXNlbGVjdDogbm9uZTtcbiAgLW1vei11c2VyLXNlbGVjdDogbm9uZTtcbiAgLW8tdXNlci1zZWxlY3Q6IG5vbmU7XG4gIHVzZXItc2VsZWN0OiBub25lO1xufVxuXG4uZmlsZS1leHRlbnNpb24ge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjRkZGRkZGO1xuICBib3JkZXItcmFkaXVzOiAxNXB4O1xuICBwYWRkaW5nOiAxcHggM3B4IDFweCAzcHg7XG4gIG1hcmdpbi1yaWdodDogMnB4O1xuICBmb250LXNpemU6IDEzcHg7XG4gIGJvcmRlcjogM3B4IHNvbGlkICNlMGUwZTA7XG4gIGhlaWdodDogMzJweDtcbiAgbGluZS1oZWlnaHQ6IDIzcHg7XG4gIG1pbi13aWR0aDogMzJweDtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xufVxuXG5oNSB7XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbn1cblxuLmRpc3AtaW5saW5lLWZsZXgge1xuICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcbn1cblxuLmZpbGUtY29udHJvbHMge1xuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG59XG5cbi5idXR0b24tYWRkLWZpbGUge1xuICBtYXJnaW4tbGVmdDogNXB4O1xuICBtYXJnaW4tcmlnaHQ6IDIuNXB4O1xuICBib3JkZXI6IDFweCBzb2xpZCAjZTRlNGU0O1xuICBwYWRkaW5nLWxlZnQ6IDEwcHg7XG4gIHBhZGRpbmctcmlnaHQ6IDEwcHg7XG4gIGZvbnQtc2l6ZTogeC1zbWFsbDtcbiAgZm9udC13ZWlnaHQ6IDUwMDtcbn1cblxuLmFjdGlvbi1maWxlLWljb24ge1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIG1hcmdpbi1sZWZ0OiAzcHg7XG4gIG1hcmdpbi1yaWdodDogM3B4O1xufVxuXG4uYWN0aW9uLWZpbGUtaWNvbjpob3ZlciB7XG4gIGNvbG9yOiAjOTFhNTliO1xufVxuXG4uZHJhZy1iYWctZWRpdGFibGUge1xuICBtaW4taGVpZ2h0OiAzNXB4O1xufVxuXG4uZHJhZy1oYW5kbGUge1xuICBjdXJzb3I6IG1vdmU7XG4gIGN1cnNvcjogZ3JhYjtcbiAgY3Vyc29yOiAtbW96LWdyYWI7XG4gIGN1cnNvcjogLXdlYmtpdC1ncmFiO1xufVxuXG4uZHJhZy1oYW5kbGU6YWN0aXZlIHtcbiAgY3Vyc29yOiBncmFiYmluZztcbiAgY3Vyc29yOiAtbW96LWdyYWJiaW5nO1xuICBjdXJzb3I6IC13ZWJraXQtZ3JhYmJpbmc7XG59XG5cbi50aXRsZS1lZGl0IHtcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDI0MywgMjQzLCAyNDMpO1xufVxuXG4vKk1vYmlsZSBwaG9uZXMqL1xuQG1lZGlhIG9ubHkgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA2MDBweCkgYW5kIChvcmllbnRhdGlvbjogcG9ydHJhaXQpLCBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDk5MnB4KSBhbmQgKG9yaWVudGF0aW9uOiBsYW5kc2NhcGUpIHtcbiAgLmNoaXAtZmlsZSB7XG4gICAgbWluLXdpZHRoOiAyMzBweCAhaW1wb3J0YW50O1xuICAgIG1hcmdpbi1ib3R0b206IDBweCAhaW1wb3J0YW50O1xuICAgIG1hcmdpbi10b3A6IDVweCAhaW1wb3J0YW50O1xuICB9XG4gIC5maWxlLWNvbnRyb2xzIHtcbiAgICBkaXNwbGF5OiBibG9jayAhaW1wb3J0YW50O1xuICB9XG59XG4vKkVuZCBtb2JpbGUgcGhvbmVzKi9cbiJdfQ== */"

/***/ }),

/***/ "./src/app/components/file-group/file-group.component.html":
/*!*****************************************************************!*\
  !*** ./src/app/components/file-group/file-group.component.html ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div [class.file-group-root]=\"this.depth === 0\" [class.file-group-child]=\"this.depth > 0\">\n  <div class=\"file-group-title-div\" [class.title-edit]=\"this.modeEditActive\">\n    <div class=\"file-group-title valign-wrapper\">\n      <h5>{{fileGroup?.title}}</h5>\n    </div>\n    <div *ngIf=\"this.modeEditActive && this.authenticationService.isTeacher()\" class=\"buttons-container-div valign-wrapper\">\n      <a href=\"#course-details-modal\" class=\"button-add-file waves-effect btn-flat add-file-btn\" (click)=\"updatePostModalMode(5, 'Add files'); this.changeUpdatedFileGroup(); this.animationService.animateIfSmall()\">Add file</a>\n      <a href=\"#course-details-modal\" class=\"button-add-file waves-effect btn-flat add-subgroup-btn\" (click)=\"updatePostModalMode(4, 'New subgroup'); this.animationService.animateIfSmall()\">Add subgroup</a>\n      <a href=\"#put-delete-modal\" class=\"mode-edit-icon\" (click)=\"updatePutdeleteModalMode(2, 'Modify file group'); this.changeUpdatedFileGroup(); this.animationService.animateIfSmall()\" [title]=\"'Modify file group'\">\n        <i id=\"edit-filegroup-icon\" class=\"material-icons action-file-icon\">mode_edit</i>\n      </a>\n      <i *ngIf=\"!this.fileGroupDeletion\" class=\"material-icons action-file-icon delete-filegroup-icon\" (click)=\"deleteFileGroup()\" [title]=\"'Delete file group'\">clear</i>\n      <i *ngIf=\"this.fileGroupDeletion\" class=\"material-icons action-file-icon rotating\">cached</i>\n    </div>\n  </div>\n\n  <div class=\"drag-bag-editable\" [dragula]='\"drag-bag\"' [dragulaModel]=\"fileGroup?.files\" [attr.data-id]=\"fileGroup.id\">\n    <div *ngFor=\"let f of fileGroup?.files; let i = index\" [attr.data-id]=\"f.id\">\n        <div class=\"chip chip-file truncate valign-wrapper disp-inline-flex\" (click)=\"this.downloadFile(f)\">\n          <span class=\"file-extension\" [style.background-color]=\"getColorByFile(f.link)\">{{getFileExtension(f.link)}}</span><div class=\"file-name-div valign\">{{f.name}}</div>\n        </div>\n        <div *ngIf=\"this.modeEditActive && this.authenticationService.isTeacher()\" class=\"file-controls\">\n          <a href=\"#put-delete-modal\" (click)=\"updatePutdeleteModalMode(3, 'Modify file'); this.changeUpdatedFile(f); this.animationService.animateIfSmall()\" title=\"Modify file\">\n            <i class=\"edit-file-name-icon material-icons action-file-icon\">mode_edit</i>\n          </a>\n          <i *ngIf=\"!this.arrayOfDeletions[i]\" (click)=\"deleteFile(f, i)\" class=\"material-icons action-file-icon\" [title]=\"'Delete file'\">clear</i>\n          <i *ngIf=\"this.arrayOfDeletions[i]\" class=\"material-icons action-file-icon rotating\">cached</i>\n          <i class=\"drag-handle material-icons action-file-icon\" [title]=\"'Move file'\">reorder</i>\n        </div>\n    </div>\n  </div>\n\n  <div *ngFor=\"let subFileGroup of fileGroup?.fileGroups\">\n    <app-file-group [fileGroup]=\"subFileGroup\" [depth]=\"this.depth + 1\" [courseId]=\"this.courseId\" ></app-file-group>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/components/file-group/file-group.component.ts":
/*!***************************************************************!*\
  !*** ./src/app/components/file-group/file-group.component.ts ***!
  \***************************************************************/
/*! exports provided: FileGroupComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FileGroupComponent", function() { return FileGroupComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _classes_file_group__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../classes/file-group */ "./src/app/classes/file-group.ts");
/* harmony import */ var _services_file_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/file.service */ "./src/app/services/file.service.ts");
/* harmony import */ var _services_files_edition_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../services/files-edition.service */ "./src/app/services/files-edition.service.ts");
/* harmony import */ var _services_course_details_modal_data_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../services/course-details-modal-data.service */ "./src/app/services/course-details-modal-data.service.ts");
/* harmony import */ var _services_authentication_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../services/authentication.service */ "./src/app/services/authentication.service.ts");
/* harmony import */ var _services_animation_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../services/animation.service */ "./src/app/services/animation.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var FileGroupComponent = /** @class */ (function () {
    function FileGroupComponent(fileService, filesEditionService, courseDetailsModalDataService, authenticationService, animationService) {
        var _this = this;
        this.fileService = fileService;
        this.filesEditionService = filesEditionService;
        this.courseDetailsModalDataService = courseDetailsModalDataService;
        this.authenticationService = authenticationService;
        this.animationService = animationService;
        this.modeEditActive = false;
        this.fileGroupDeletion = false;
        this.arrayOfDeletions = [];
        this.typeOfFile = ['language', 'picture_as_pdf', 'videocam'];
        this.subscription = filesEditionService.modeEditAnnounced$.subscribe(function (active) {
            _this.modeEditActive = active;
        });
    }
    FileGroupComponent.prototype.ngOnInit = function () {
        this.modeEditActive = this.filesEditionService.currentModeEdit;
    };
    FileGroupComponent.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    FileGroupComponent.prototype.updatePostModalMode = function (mode, title) {
        var objs = [mode, title, null, null, this.fileGroup];
        this.courseDetailsModalDataService.announcePostMode(objs);
    };
    FileGroupComponent.prototype.updatePutdeleteModalMode = function (mode, title) {
        var objs = [mode, title];
        this.courseDetailsModalDataService.announcePutdeleteMode(objs);
    };
    FileGroupComponent.prototype.changeUpdatedFileGroup = function () {
        var objs = [this.fileGroup, null];
        this.filesEditionService.announceFileFilegroupUpdated(objs);
    };
    FileGroupComponent.prototype.changeUpdatedFile = function (file) {
        var objs = [this.fileGroup, file];
        this.filesEditionService.announceFileFilegroupUpdated(objs);
    };
    FileGroupComponent.prototype.deleteFileGroup = function () {
        var _this = this;
        this.fileGroupDeletion = true;
        this.fileService.deleteFileGroup(this.fileGroup.id, this.courseId).subscribe(function (response) {
            //Only on succesful DELETE we locally delete the fileGroup sending an event to the suscribed parent component (CourseDetailsComponent)
            _this.filesEditionService.announceFileGroupDeleted(response.id);
            _this.fileGroupDeletion = false;
        }, function (error) { _this.fileGroupDeletion = false; });
    };
    FileGroupComponent.prototype.deleteFile = function (file, i) {
        var _this = this;
        this.arrayOfDeletions[i] = true;
        this.fileService.deleteFile(file.id, this.fileGroup.id, this.courseId).subscribe(function (response) {
            //Only on succesful delete we locally delete the file
            for (var i_1 = 0; i_1 < _this.fileGroup.files.length; i_1++) {
                if (_this.fileGroup.files[i_1].id == response.id) {
                    _this.fileGroup.files.splice(i_1, 1);
                    break;
                }
            }
            _this.arrayOfDeletions[i] = false;
        }, function (error) { _this.arrayOfDeletions[i] = false; });
    };
    FileGroupComponent.prototype.downloadFile = function (file) {
        this.fileService.downloadFile(this.courseId, file);
    };
    FileGroupComponent.prototype.getFileExtension = function (fileLink) {
        var lastIndex = fileLink.lastIndexOf(".");
        if (lastIndex < 1)
            return "";
        return fileLink.substr(lastIndex + 1);
    };
    FileGroupComponent.prototype.getColorByFile = function (fileLink) {
        var ext = this.getFileExtension(fileLink);
        switch (ext) {
            case 'docx':
                return 'rgba(41, 84, 151, 0.46)';
            case 'doc':
                return 'rgba(41, 84, 151, 0.46)';
            case 'xlsx':
                return 'rgba(32, 115, 71, 0.46)';
            case 'xls':
                return 'rgba(32, 115, 71, 0.46)';
            case 'ppt':
                return 'rgba(208, 71, 39, 0.46)';
            case 'pptx':
                return 'rgba(208, 71, 39, 0.46)';
            case 'pdf':
                return 'rgba(239, 15, 17, 0.5)';
            case 'jpg':
                return 'rgba(231, 136, 60, 0.6)';
            case 'png':
                return 'rgba(231, 136, 60, 0.6)';
            case 'rar':
                return 'rgba(116, 0, 109, 0.46)';
            case 'zip':
                return 'rgba(116, 0, 109, 0.46)';
            case 'txt':
                return 'rgba(136, 136, 136, 0.46)';
            default: '#ffffff';
        }
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", _classes_file_group__WEBPACK_IMPORTED_MODULE_1__["FileGroup"])
    ], FileGroupComponent.prototype, "fileGroup", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Number)
    ], FileGroupComponent.prototype, "courseId", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Number)
    ], FileGroupComponent.prototype, "depth", void 0);
    FileGroupComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-file-group',
            template: __webpack_require__(/*! ./file-group.component.html */ "./src/app/components/file-group/file-group.component.html"),
            styles: [__webpack_require__(/*! ./file-group.component.css */ "./src/app/components/file-group/file-group.component.css")]
        }),
        __metadata("design:paramtypes", [_services_file_service__WEBPACK_IMPORTED_MODULE_2__["FileService"],
            _services_files_edition_service__WEBPACK_IMPORTED_MODULE_3__["FilesEditionService"],
            _services_course_details_modal_data_service__WEBPACK_IMPORTED_MODULE_4__["CourseDetailsModalDataService"],
            _services_authentication_service__WEBPACK_IMPORTED_MODULE_5__["AuthenticationService"],
            _services_animation_service__WEBPACK_IMPORTED_MODULE_6__["AnimationService"]])
    ], FileGroupComponent);
    return FileGroupComponent;
}());



/***/ }),

/***/ "./src/app/components/file-uploader/file-uploader.component.css":
/*!**********************************************************************!*\
  !*** ./src/app/components/file-uploader/file-uploader.component.css ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "input[type=\"file\"] {\n  display: none;\n}\n\n.queue-progress {\n  margin-top: 12px !important;\n  text-align: center;\n}\n\n.error-div {\n  margin-top: 2em;\n}\n\n/*Mobile phones*/\n\n@media only screen and (max-width: 600px) and (orientation: portrait), screen and (max-width: 992px) and (orientation: landscape) {\n  .file-name-td {\n    max-width: 8em;\n    overflow: hidden;\n    text-overflow: ellipsis;\n  }\n  .btn-uploader {\n    padding-left: 8px !important;\n    padding-right: 8px !important;\n    font-size: 10px !important;\n  }\n  .mobile-file-td {\n    padding-top: 7px !important;\n    padding-bottom: 7px !important;\n  }\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29tcG9uZW50cy9maWxlLXVwbG9hZGVyL2ZpbGUtdXBsb2FkZXIuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGFBQWE7QUFDZjs7QUFFQTtFQUNFLDJCQUEyQjtFQUMzQixrQkFBa0I7QUFDcEI7O0FBRUE7RUFDRSxlQUFlO0FBQ2pCOztBQUdBLGdCQUFnQjs7QUFDaEI7RUFDRTtJQUNFLGNBQWM7SUFDZCxnQkFBZ0I7SUFDaEIsdUJBQXVCO0VBQ3pCO0VBQ0E7SUFDRSw0QkFBNEI7SUFDNUIsNkJBQTZCO0lBQzdCLDBCQUEwQjtFQUM1QjtFQUNBO0lBQ0UsMkJBQTJCO0lBQzNCLDhCQUE4QjtFQUNoQztBQUNGIiwiZmlsZSI6InNyYy9hcHAvY29tcG9uZW50cy9maWxlLXVwbG9hZGVyL2ZpbGUtdXBsb2FkZXIuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbImlucHV0W3R5cGU9XCJmaWxlXCJdIHtcbiAgZGlzcGxheTogbm9uZTtcbn1cblxuLnF1ZXVlLXByb2dyZXNzIHtcbiAgbWFyZ2luLXRvcDogMTJweCAhaW1wb3J0YW50O1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG5cbi5lcnJvci1kaXYge1xuICBtYXJnaW4tdG9wOiAyZW07XG59XG5cblxuLypNb2JpbGUgcGhvbmVzKi9cbkBtZWRpYSBvbmx5IHNjcmVlbiBhbmQgKG1heC13aWR0aDogNjAwcHgpIGFuZCAob3JpZW50YXRpb246IHBvcnRyYWl0KSwgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA5OTJweCkgYW5kIChvcmllbnRhdGlvbjogbGFuZHNjYXBlKSB7XG4gIC5maWxlLW5hbWUtdGQge1xuICAgIG1heC13aWR0aDogOGVtO1xuICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7XG4gIH1cbiAgLmJ0bi11cGxvYWRlciB7XG4gICAgcGFkZGluZy1sZWZ0OiA4cHggIWltcG9ydGFudDtcbiAgICBwYWRkaW5nLXJpZ2h0OiA4cHggIWltcG9ydGFudDtcbiAgICBmb250LXNpemU6IDEwcHggIWltcG9ydGFudDtcbiAgfVxuICAubW9iaWxlLWZpbGUtdGQge1xuICAgIHBhZGRpbmctdG9wOiA3cHggIWltcG9ydGFudDtcbiAgICBwYWRkaW5nLWJvdHRvbTogN3B4ICFpbXBvcnRhbnQ7XG4gIH1cbn1cbiJdfQ== */"

/***/ }),

/***/ "./src/app/components/file-uploader/file-uploader.component.html":
/*!***********************************************************************!*\
  !*** ./src/app/components/file-uploader/file-uploader.component.html ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"row no-margin\">\n\n  <div *ngIf=\"uploader.queue.length == 0\" class=\"row no-margin text-centered\">\n    <div class=\"col l12 m12 s12\">\n      <label class=\"label-input-file waves-effect btn\" [attr.for]=\"'input-file-' + this.uniqueID\">{{buttonText}}</label>\n      <input *ngIf=\"!isMultiple\" class=\"input-file-uploader\" type=\"file\" [attr.name]=\"'input-file-' + this.uniqueID\" [attr.id]=\"'input-file-' + this.uniqueID\" ng2FileSelect [uploader]=\"uploader\"/>\n      <input *ngIf=\"isMultiple\" class=\"input-file-uploader\" type=\"file\" [attr.name]=\"'input-file-' + this.uniqueID\" [attr.id]=\"'input-file-' + this.uniqueID\" ng2FileSelect [uploader]=\"uploader\" multiple/>\n    </div>\n    <div class=\"col l12 m12\">\n      <div class=\"input-field\">\n        <div ng2FileDrop [ngClass]=\"{'nv-file-over': hasBaseDropZoneOver}\" (fileOver)=\"fileOverBase($event)\" [uploader]=\"uploader\" class=\"file-drop-zone\">\n          Or drop your {{typeOfFile}} here\n        </div>\n      </div>\n    </div>\n  </div>\n\n  <div class=\"row no-margin\">\n    <div *ngIf=\"uploader.queue.length > 0\" class=\"col s12 table-header\">\n      <div *ngIf=\"isMultiple\">\n        <h5 class=\"table-title\">Files to upload</h5>\n        <p class=\"table-subtitle\">You have <strong>{{ uploader?.getNotUploadedItems().length }}</strong> files waiting to be uploaded</p>\n      </div>\n\n      <table class=\"table\">\n        <thead *ngIf=\"isMultiple\">\n          <tr>\n               <th width=\"50%\">Name</th>\n               <th>Status</th>\n               <th>Actions</th>\n          </tr>\n        </thead>\n\n        <tbody *ngIf=\"isMultiple\">\n            <tr *ngFor=\"let item of uploader.queue\">\n              <td class=\"table-td file-name-td mobile-file-td\"><strong>{{ item?.file?.name }}</strong></td>\n              <td class=\"table-td text-center mobile-file-td\">\n                <span *ngIf=\"item.isSuccess\"><i class=\"icon-status-upload material-icons\">done</i></span>\n                <span *ngIf=\"item.isUploading\"><i class=\"icon-status-upload material-icons\">cloud_upload</i></span>\n                <span *ngIf=\"item.isCancel\"><i class=\"icon-status-upload material-icons\">warning</i></span>\n                <span *ngIf=\"item.isError\"><i class=\"icon-status-upload material-icons\">clear</i></span>\n                <span *ngIf=\"!item.isSuccess && !item.isUploading && !item.isCancel && !item.isError\"><i class=\"material-icons\">schedule</i></span>\n              </td>\n              <td nowrap class=\"table-td mobile-file-td\">\n                <button *ngIf=\"!(item.isReady || item.isUploading || item.isSuccess)\" type=\"button\" class=\"btn button-small btn-uploader\" (click)=\"item.upload()\">\n                     Upload\n                 </button>\n                <button *ngIf=\"item.isUploading\" type=\"button\" class=\"btn button-small btn-uploader\" (click)=\"item.cancel()\">\n                     Cancel\n                 </button>\n                <button *ngIf=\"!item.isSuccess && !item.isUploading\" type=\"button\" class=\"btn button-small btn-uploader\" (click)=\"item.remove()\">\n                     Cancel\n                 </button>\n              </td>\n            </tr>\n          </tbody>\n\n          <tbody *ngIf=\"!isMultiple\">\n            <tr>\n              <td class=\"table-td file-name-td\"><strong>{{ uploader.queue[0]?.file?.name }}</strong></td>\n              <td class=\"text-center\" class=\"table-td\">\n                <span *ngIf=\"uploader.queue[0].isSuccess\"><i class=\"material-icons\">done</i></span>\n                <span *ngIf=\"uploader.queue[0].isCancel\"><i class=\"material-icons\">warning</i></span>\n                <span *ngIf=\"uploader.queue[0].isError\"><i class=\"material-icons\">clear</i></span>\n              </td>\n              <td nowrap class=\"table-td\">\n                <button *ngIf=\"!(uploader.queue[0].isReady || uploader.queue[0].isUploading || uploader.queue[0].isSuccess)\" type=\"button\" class=\"btn button-small\" (click)=\"uploader.queue[0].upload()\">\n                     Upload\n                 </button>\n                <button *ngIf=\"uploader.queue[0].isUploading\" type=\"button\" class=\"btn button-small\" (click)=\"uploader.queue[0].cancel()\">\n                     Cancel\n                 </button>\n                <button *ngIf=\"!uploader.queue[0].isSuccess && !uploader.queue[0].isUploading\" type=\"button\" class=\"btn button-small\" (click)=\"uploader.queue[0].remove()\">\n                     Cancel\n                 </button>\n              </td>\n            </tr>\n          </tbody>\n\n      </table>\n\n      <div *ngIf=\"isMultiple\" class=\"queue-progress\">\n         <div>\n           <span class=\"left\">Queue progress</span>\n           <div class=\"progress\">\n               <div class=\"determinate\" [ngStyle]=\"{ 'width': uploader.progress + '%' }\"></div>\n           </div>\n         </div>\n         <button *ngIf=\"uploader.getNotUploadedItems().length && !uploader.isUploading\" id=\"upload-all-btn\" type=\"button\" class=\"btn btn-file-table\" (click)=\"uploader.uploadAll()\">\n             Upload all\n         </button>\n         <button *ngIf=\"uploader.isUploading\" type=\"button\" class=\"btn btn-file-table\" id=\"cancel-all-btn\" (click)=\"uploader.cancelAll()\">\n             Cancel all\n         </button>\n         <button *ngIf=\"uploader.getNotUploadedItems().length\" type=\"button\" class=\"btn btn-file-table\" id=\"remove-all-btn\" (click)=\"uploader.clearQueue()\">\n             Remove all\n         </button>\n     </div>\n\n    </div>\n\n    <div *ngIf=\"fileIncorrect\" class=\"col s12 error-div\">\n      <app-error-message (eventShowable)=\"fileIncorrect = false\" [errorTitle]=\"'Files cannot be bigger than 5MB!'\" [errorContent]=\"\" [customClass]=\"'fail'\" [closable]=\"true\"></app-error-message>\n    </div>\n\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/components/file-uploader/file-uploader.component.ts":
/*!*********************************************************************!*\
  !*** ./src/app/components/file-uploader/file-uploader.component.ts ***!
  \*********************************************************************/
/*! exports provided: FileUploaderComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FileUploaderComponent", function() { return FileUploaderComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../constants */ "./src/app/constants.ts");
/* harmony import */ var ng2_file_upload__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ng2-file-upload */ "./node_modules/ng2-file-upload/index.js");
/* harmony import */ var ng2_file_upload__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(ng2_file_upload__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _services_uploader_modal_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../services/uploader-modal.service */ "./src/app/services/uploader-modal.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var FileUploaderComponent = /** @class */ (function () {
    function FileUploaderComponent(uploaderModalService) {
        var _this = this;
        this.uploaderModalService = uploaderModalService;
        this.hasBaseDropZoneOver = false;
        this.fileIncorrect = false;
        this.URLUPLOAD = "/test";
        this.onCompleteFileUpload = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.onUploadStarted = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        //Subscription for clearing the queue
        this.subscription = this.uploaderModalService.uploaderClosedAnnounced$.subscribe(function (objs) { _this.uploader.clearQueue(); _this.fileIncorrect = false; });
    }
    FileUploaderComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.uploader = new ng2_file_upload__WEBPACK_IMPORTED_MODULE_2__["FileUploader"]({ url: this.URLUPLOAD, maxFileSize: _constants__WEBPACK_IMPORTED_MODULE_1__["Constants"].FILE_SIZE_LIMIT });
        this.uploader.onBeforeUploadItem = function (item) {
            _this.onUploadStarted.emit(true);
        };
        this.uploader.onCompleteItem = function (item, response, status, headers) {
            _this.onCompleteFileUpload.emit(response);
        };
        this.uploader.onWhenAddingFileFailed = function (fileItem, filter, options) {
            _this.handleFileSizeError();
        };
        this.uploader.onCancelItem = function (item, response, status, headers) {
            console.log("File upload canceled");
        };
    };
    FileUploaderComponent.prototype.ngOnChanges = function () {
        var _this = this;
        if (this.uploader) {
            this.uploader.destroy();
            this.uploader = new ng2_file_upload__WEBPACK_IMPORTED_MODULE_2__["FileUploader"]({ url: this.URLUPLOAD, maxFileSize: _constants__WEBPACK_IMPORTED_MODULE_1__["Constants"].FILE_SIZE_LIMIT });
            this.uploader.onCompleteItem = function (item, response, status, headers) {
                _this.onCompleteFileUpload.emit(response);
            };
            this.uploader.onWhenAddingFileFailed = function (fileItem) {
                _this.handleFileSizeError();
            };
        }
    };
    FileUploaderComponent.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
        if (this.uploader) {
            this.uploader.destroy();
            this.uploader.clearQueue();
        }
    };
    FileUploaderComponent.prototype.fileOverBase = function (e) {
        this.hasBaseDropZoneOver = e;
    };
    FileUploaderComponent.prototype.handleFileSizeError = function () {
        console.error("File too big. " + this.URLUPLOAD);
        if (window.innerWidth <= _constants__WEBPACK_IMPORTED_MODULE_1__["Constants"].PHONE_MAX_WIDTH) { // On mobile phones error on toast
            Materialize.toast('Files cannot be bigger than 5MB!', _constants__WEBPACK_IMPORTED_MODULE_1__["Constants"].TOAST_SHOW_TIME, 'rounded');
        }
        else { // On desktop error on error-message
            this.fileIncorrect = true;
        }
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Number)
    ], FileUploaderComponent.prototype, "uniqueID", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Boolean)
    ], FileUploaderComponent.prototype, "isMultiple", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", String)
    ], FileUploaderComponent.prototype, "URLUPLOAD", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", String)
    ], FileUploaderComponent.prototype, "typeOfFile", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", String)
    ], FileUploaderComponent.prototype, "buttonText", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], FileUploaderComponent.prototype, "onCompleteFileUpload", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], FileUploaderComponent.prototype, "onUploadStarted", void 0);
    FileUploaderComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-file-uploader',
            template: __webpack_require__(/*! ./file-uploader.component.html */ "./src/app/components/file-uploader/file-uploader.component.html"),
            styles: [__webpack_require__(/*! ./file-uploader.component.css */ "./src/app/components/file-uploader/file-uploader.component.css")]
        }),
        __metadata("design:paramtypes", [_services_uploader_modal_service__WEBPACK_IMPORTED_MODULE_3__["UploaderModalService"]])
    ], FileUploaderComponent);
    return FileUploaderComponent;
}());



/***/ }),

/***/ "./src/app/components/footer/footer.component.css":
/*!********************************************************!*\
  !*** ./src/app/components/footer/footer.component.css ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbXBvbmVudHMvZm9vdGVyL2Zvb3Rlci5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "./src/app/components/footer/footer.component.html":
/*!*********************************************************!*\
  !*** ./src/app/components/footer/footer.component.html ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\n  <div class=\"row\">\n    <div class=\"col l6 s12\">\n      <h5 class=\"white-text\">About this project</h5>\n      <p class=\"grey-text text-lighten-4\">This application is a final degree project in <a class=\"hover-link grey-color\" href=\"http://www.urjc.es/en/?id=147\" target=\"_blank\"> Universidad Rey Juan Carlos</a><br/>Pablo Fuente Pérez</p>\n    </div>\n    <div class=\"col l3 s6\">\n      <h5 class=\"white-text\">Technologies</h5>\n      <ul>\n        <li><a class=\"white-text hover-link\" href=\"https://angular.io/\" target=\"_blank\">Angular</a></li>\n        <li><a class=\"white-text hover-link\" href=\"https://www.kurento.org/\" target=\"_blank\">Kurento</a></li>\n      </ul>\n    </div>\n    <div class=\"col l3 s6\">\n      <h5 class=\"white-text\">Connect</h5>\n      <ul>\n        <li><a class=\"white-text hover-link\" href=\"https://github.com/pabloFuente/full-teaching\" target=\"_blank\">GitHub repository</a></li>\n        <li><a class=\"white-text hover-link\" href=\"https://es.linkedin.com/in/pablofuenteperez\" target=\"_blank\">LinkedIn</a></li>\n      </ul>\n    </div>\n  </div>\n</div>\n<div class=\"footer-copyright\">\n  <div class=\"container\">\n    Frame by <a class=\"brown-text text-lighten-3\" href=\"http://materializecss.com\" target=\"_blank\">Materialize</a>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/components/footer/footer.component.ts":
/*!*******************************************************!*\
  !*** ./src/app/components/footer/footer.component.ts ***!
  \*******************************************************/
/*! exports provided: FooterComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FooterComponent", function() { return FooterComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var FooterComponent = /** @class */ (function () {
    function FooterComponent() {
    }
    FooterComponent.prototype.ngOnInit = function () {
    };
    FooterComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-footer',
            template: __webpack_require__(/*! ./footer.component.html */ "./src/app/components/footer/footer.component.html"),
            styles: [__webpack_require__(/*! ./footer.component.css */ "./src/app/components/footer/footer.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], FooterComponent);
    return FooterComponent;
}());



/***/ }),

/***/ "./src/app/components/login-modal/login-modal.component.css":
/*!******************************************************************!*\
  !*** ./src/app/components/login-modal/login-modal.component.css ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".modal-content {\n  padding-bottom: 0 !important;\n}\n\n.row {\n  margin-bottom: 10px;\n}\n\n.modal-footer-button {\n  float: none !important;\n}\n\n.signUpColor {\n  background-color: #2196f3;\n}\n\n.signUpColor:hover {\n  background-color: rgba(33, 150, 244, 0.7);\n}\n\n.acceptColor-back {\n  background-color: #375646;\n}\n\n.cancelColor-back {\n  background-color: #A73841;\n}\n\n.acceptColor-back:hover {\n  background-color: rgba(55, 86, 70, 0.7);\n}\n\n.cancelColor-back:hover {\n  background-color: rgba(167, 56, 65, 0.7);\n}\n\n.recaptcha-div-outer {\n  margin-bottom: 2em;\n  text-align: center;\n}\n\n.recaptcha-div-inner {\n  display: inline-block;\n}\n\n#disabled-signup-btn {\n  background-color: #dadada;\n  color: #9e9e9e !important;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -o-user-select: none;\n  -ms-user-select: none;\n      user-select: none;\n}\n\n/*Mobile phones*/\n\n@media only screen and (max-width: 600px) and (orientation: portrait), screen and (max-width: 992px) and (orientation: landscape) {\n  .margin-top-buttons {\n    margin-top: 10px;\n  }\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29tcG9uZW50cy9sb2dpbi1tb2RhbC9sb2dpbi1tb2RhbC5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsNEJBQTRCO0FBQzlCOztBQUVBO0VBQ0UsbUJBQW1CO0FBQ3JCOztBQUVBO0VBQ0Usc0JBQXNCO0FBQ3hCOztBQUVBO0VBQ0UseUJBQXlCO0FBQzNCOztBQUVBO0VBQ0UseUNBQXlDO0FBQzNDOztBQUVBO0VBQ0UseUJBQXlCO0FBQzNCOztBQUVBO0VBQ0UseUJBQXlCO0FBQzNCOztBQUVBO0VBQ0UsdUNBQXVDO0FBQ3pDOztBQUVBO0VBQ0Usd0NBQXdDO0FBQzFDOztBQUVBO0VBQ0Usa0JBQWtCO0VBQ2xCLGtCQUFrQjtBQUNwQjs7QUFFQTtFQUNFLHFCQUFxQjtBQUN2Qjs7QUFFQTtFQUNFLHlCQUF5QjtFQUN6Qix5QkFBeUI7RUFDekIseUJBQXlCO0VBRXpCLHNCQUFzQjtFQUN0QixvQkFBb0I7RUFDcEIscUJBQWlCO01BQWpCLGlCQUFpQjtBQUNuQjs7QUFHQSxnQkFBZ0I7O0FBQ2hCO0VBQ0U7SUFDRSxnQkFBZ0I7RUFDbEI7QUFDRiIsImZpbGUiOiJzcmMvYXBwL2NvbXBvbmVudHMvbG9naW4tbW9kYWwvbG9naW4tbW9kYWwuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi5tb2RhbC1jb250ZW50IHtcbiAgcGFkZGluZy1ib3R0b206IDAgIWltcG9ydGFudDtcbn1cblxuLnJvdyB7XG4gIG1hcmdpbi1ib3R0b206IDEwcHg7XG59XG5cbi5tb2RhbC1mb290ZXItYnV0dG9uIHtcbiAgZmxvYXQ6IG5vbmUgIWltcG9ydGFudDtcbn1cblxuLnNpZ25VcENvbG9yIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzIxOTZmMztcbn1cblxuLnNpZ25VcENvbG9yOmhvdmVyIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgzMywgMTUwLCAyNDQsIDAuNyk7XG59XG5cbi5hY2NlcHRDb2xvci1iYWNrIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzM3NTY0Njtcbn1cblxuLmNhbmNlbENvbG9yLWJhY2sge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjQTczODQxO1xufVxuXG4uYWNjZXB0Q29sb3ItYmFjazpob3ZlciB7XG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoNTUsIDg2LCA3MCwgMC43KTtcbn1cblxuLmNhbmNlbENvbG9yLWJhY2s6aG92ZXIge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDE2NywgNTYsIDY1LCAwLjcpO1xufVxuXG4ucmVjYXB0Y2hhLWRpdi1vdXRlciB7XG4gIG1hcmdpbi1ib3R0b206IDJlbTtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xufVxuXG4ucmVjYXB0Y2hhLWRpdi1pbm5lciB7XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbn1cblxuI2Rpc2FibGVkLXNpZ251cC1idG4ge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZGFkYWRhO1xuICBjb2xvcjogIzllOWU5ZSAhaW1wb3J0YW50O1xuICAtd2Via2l0LXVzZXItc2VsZWN0OiBub25lO1xuICAta2h0bWwtdXNlci1zZWxlY3Q6IG5vbmU7XG4gIC1tb3otdXNlci1zZWxlY3Q6IG5vbmU7XG4gIC1vLXVzZXItc2VsZWN0OiBub25lO1xuICB1c2VyLXNlbGVjdDogbm9uZTtcbn1cblxuXG4vKk1vYmlsZSBwaG9uZXMqL1xuQG1lZGlhIG9ubHkgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA2MDBweCkgYW5kIChvcmllbnRhdGlvbjogcG9ydHJhaXQpLCBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDk5MnB4KSBhbmQgKG9yaWVudGF0aW9uOiBsYW5kc2NhcGUpIHtcbiAgLm1hcmdpbi10b3AtYnV0dG9ucyB7XG4gICAgbWFyZ2luLXRvcDogMTBweDtcbiAgfVxufVxuIl19 */"

/***/ }),

/***/ "./src/app/components/login-modal/login-modal.component.html":
/*!*******************************************************************!*\
  !*** ./src/app/components/login-modal/login-modal.component.html ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div id=\"login-modal\" class=\"modal my-modal-class\" materialize=\"modal\" [materializeParams]=\"[{dismissible: false}]\" [materializeActions]=\"actions\">\n\n  <div *ngIf=\"submitProcessing\" class=\"loading\"></div>\n\n  <div class=\"modal-content\" [class.filtered]=\"submitProcessing\">\n    <h4 *ngIf=\"loginView\" class=\"center\">Welcome to <a id=\"modal-title-trade\" class=\"app-title-header secondaryColor-color\">FullTeaching</a> !</h4>\n    <div class=\"row\">\n\n      <form materialize #myForm class=\"col s12\" (ngSubmit)=\"onSubmit()\">\n\n        <div class=\"row row-mobile\">\n          <div class=\"input-field col s12\">\n            <input [(ngModel)]=\"email\" name=\"email\" id=\"email\" type=\"email\" class=\"validate\" required autocomplete=\"email\">\n            <label for=\"email\" data-error=\"Not an e-mail format!\">Email</label>\n          </div>\n        </div>\n\n        <div *ngIf=\"!loginView\" class=\"row row-mobile\">\n          <div class=\"input-field col s12\">\n            <input [(ngModel)]=\"nickName\" name=\"nickName\" id=\"nickName\" type=\"text\" class=\"validate\" required>\n            <label for=\"nickName\">Name</label>\n          </div>\n        </div>\n\n        <div class=\"row row-mobile\">\n          <div class=\"input-field col s12\">\n            <input [(ngModel)]=\"password\" name=\"password\" id=\"password\" type=\"password\" class=\"validate\" required>\n            <label for=\"password\">Password</label>\n          </div>\n        </div>\n\n        <div *ngIf=\"!loginView\" class=\"row\">\n          <div class=\"input-field col s12\">\n            <input [(ngModel)]=\"confirmPassword\" name=\"confirmPassword\" id=\"confirmPassword\" type=\"password\" class=\"validate\">\n            <label for=\"confirmPassword\">Confirm password</label>\n          </div>\n        </div>\n\n        <div class=\"recaptcha-div-outer\" [class.hide]=\"loginView\">\n          <div class=\"recaptcha-div-inner\">\n            <re-captcha (captchaResponse)=\"handleCorrectCaptcha($event)\" site_key=\"{{this.captchaPublicKey}}\"></re-captcha>\n          </div>\n        </div>\n\n        <app-error-message *ngIf=\"fieldsIncorrect\" (eventShowable)=\"fieldsIncorrect = false\" [errorTitle]=\"this.errorTitle\" [errorContent]=\"this.errorContent\" [customClass]=\"this.customClass\" [closable]=\"true\"></app-error-message>\n\n        <div class=\"row center margin-top-buttons\">\n          <button type=\"submit\" *ngIf=\"loginView\" id=\"log-in-btn\" class=\"waves-effect waves-light btn-flat white-text acceptColor-back\">Log in</button>\n          <a *ngIf=\"!loginView && !this.captchaValidated\" id=\"disabled-signup-btn\" materialize=\"tooltip\" data-position=\"bottom\" data-delay=\"65\" data-html=\"true\" data-tooltip=\"Click on <b><i>I'm not a robot</i></b> above\" class=\"btn-flat\">Sign up</a>\n          <button type=\"submit\" *ngIf=\"!loginView && this.captchaValidated\" id=\"sign-up-btn\" class=\"waves-effect waves-light btn-flat white-text signUpColor\">Sign up</button>\n          <a (click)=\"setLoginView(true); myForm.reset(); this.fieldsIncorrect = false;\" class=\"modal-action modal-close waves-effect waves-light btn-flat white-text cancelColor-back\">Close</a>\n        </div>\n\n      </form>\n\n    </div>\n  </div>\n\n  <div class=\"modal-footer\" [class.filtered]=\"submitProcessing\">\n    <div *ngIf=\"loginView\" class=\"right-align\">Not registered yet?<a (click)=\"setLoginView(false)\" class=\"waves-effect btn-flat modal-footer-button\">Sign up</a></div>\n    <div *ngIf=\"!loginView\" class=\"right-align\">Already registered?<a (click)=\"setLoginView(true)\" class=\"waves-effect btn-flat modal-footer-button\">Log in</a></div>\n  </div>\n\n</div>\n"

/***/ }),

/***/ "./src/app/components/login-modal/login-modal.component.ts":
/*!*****************************************************************!*\
  !*** ./src/app/components/login-modal/login-modal.component.ts ***!
  \*****************************************************************/
/*! exports provided: LoginModalComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginModalComponent", function() { return LoginModalComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _services_authentication_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../services/authentication.service */ "./src/app/services/authentication.service.ts");
/* harmony import */ var _services_login_modal_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../services/login-modal.service */ "./src/app/services/login-modal.service.ts");
/* harmony import */ var _services_user_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../services/user.service */ "./src/app/services/user.service.ts");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../constants */ "./src/app/constants.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var LoginModalComponent = /** @class */ (function () {
    function LoginModalComponent(authenticationService, userService, router, loginModalService) {
        var _this = this;
        this.authenticationService = authenticationService;
        this.userService = userService;
        this.router = router;
        this.loginModalService = loginModalService;
        this.actions = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.captchaValidated = false;
        this.loginView = true;
        this.fieldsIncorrect = false;
        this.submitProcessing = false;
        this.errorTitle = 'Invalid field';
        this.errorContent = 'Please check your email or password';
        this.customClass = 'fail';
        this.toastMessage = 'Login error! Check your email or password';
        this.captchaPublicKey = _environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].PUBLIC_RECAPTCHA_KEY;
        // Suscription to LoginModal shared service (navbar actions on modal)
        this.loginModalService.wat$.subscribe(function (value) {
            _this.loginView = value;
        });
    }
    LoginModalComponent.prototype.setLoginView = function (option) {
        this.fieldsIncorrect = false;
        this.loginView = option;
    };
    LoginModalComponent.prototype.onSubmit = function () {
        console.log("Submit: email = " + this.email + " , password = " + this.password + ", confirmPassword = " + this.confirmPassword);
        this.submitProcessing = true;
        // If login view is activated
        if (this.loginView) {
            console.log("Logging in...");
            this.logIn(this.email, this.password);
        }
        // If signup view is activated
        else {
            console.log("Signing up...");
            this.signUp();
        }
    };
    LoginModalComponent.prototype.logIn = function (user, pass) {
        var _this = this;
        this.authenticationService.logIn(user, pass).subscribe(function (result) {
            _this.submitProcessing = false;
            console.log("Login succesful! LOGGED AS " + _this.authenticationService.getCurrentUser().name);
            // Login successful
            _this.fieldsIncorrect = false;
            _this.actions.emit({ action: "modal", params: ['close'] });
            _this.router.navigate(['/courses']);
        }, function (error) {
            console.log("Login failed (error): " + error);
            _this.errorTitle = 'Invalid field';
            _this.errorContent = 'Please check your email or password';
            _this.customClass = 'fail';
            _this.toastMessage = 'Login error! Check your email or password';
            // Login failed
            _this.handleError();
        });
    };
    LoginModalComponent.prototype.signUp = function () {
        var _this = this;
        //Captcha has not been validated (user must have tricked the front-end in order to enter this if)
        if (!this.captchaValidated) {
            this.errorTitle = 'You must validate the captcha!';
            this.errorContent = '';
            this.customClass = 'fail';
            this.toastMessage = 'Your must validate the captcha!';
            this.handleError();
        }
        else {
            //Passwords don't match
            if (this.password !== this.confirmPassword) {
                this.errorTitle = 'Your passwords don\'t match!';
                this.errorContent = '';
                this.customClass = 'fail';
                this.toastMessage = 'Your passwords don\'t match!';
                this.handleError();
            }
            else {
                var regex = new RegExp(_constants__WEBPACK_IMPORTED_MODULE_6__["Constants"].PASS_REGEX);
                if (!(this.password.match(regex))) {
                    this.errorTitle = 'Your password does not have a valid format!';
                    this.errorContent = 'It must be at least 8 characters long and include one uppercase, one lowercase and a number';
                    this.customClass = 'fail';
                    this.toastMessage = 'Password must be 8 characters long, one upperCase, one lowerCase and a number';
                    this.handleError();
                }
                else {
                    var userNameFixed_1 = this.email;
                    var userPasswordFixed_1 = this.password;
                    this.userService.newUser(userNameFixed_1, userPasswordFixed_1, this.nickName, this.captchaToken).subscribe(function (result) {
                        //Sign up succesful
                        _this.logIn(userNameFixed_1, userPasswordFixed_1);
                        console.log("Sign up succesful!");
                    }, function (error) {
                        console.log("Sign up failed (error): " + error);
                        if (error === 409) { //CONFLICT: Email already in use
                            _this.errorTitle = 'Invalid email';
                            _this.errorContent = 'That email is already in use';
                            _this.customClass = 'fail';
                            _this.toastMessage = 'That email is already in use!';
                        }
                        else if (error === 400) { //BAD_REQUEST: Invalid password format
                            _this.errorTitle = 'Invalid password format';
                            _this.errorContent = 'Our server has rejected that password';
                            _this.customClass = 'fail';
                            _this.toastMessage = 'That password has not a valid format according to our server!';
                        }
                        else if (error === 403) { //FORBIDDEN: Invalid email format
                            _this.errorTitle = 'Invalid email format';
                            _this.errorContent = 'Our server has rejected that email';
                            _this.customClass = 'fail';
                            _this.toastMessage = 'That email has not a valid format according to our server!';
                        }
                        else if (error === 401) { //UNAUTHORIZED: Captcha not validated
                            _this.errorTitle = 'Captcha not validated!';
                            _this.errorContent = 'I am sorry, but your bot does not work here :)';
                            _this.customClass = 'fail';
                            _this.toastMessage = 'You must be a human to sign up here!';
                        }
                        // Sign up failed
                        _this.handleError();
                    });
                }
            }
        }
    };
    LoginModalComponent.prototype.handleCorrectCaptcha = function (event) {
        console.log("Captcha SUCCESS");
        this.captchaToken = event;
        this.captchaValidated = true;
    };
    LoginModalComponent.prototype.handleError = function () {
        this.submitProcessing = false;
        if (window.innerWidth <= _constants__WEBPACK_IMPORTED_MODULE_6__["Constants"].PHONE_MAX_WIDTH) { // On mobile phones error on toast
            Materialize.toast(this.toastMessage, _constants__WEBPACK_IMPORTED_MODULE_6__["Constants"].TOAST_SHOW_TIME, 'rounded');
        }
        else { // On desktop error on error-message
            this.fieldsIncorrect = true;
        }
    };
    LoginModalComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'login-modal',
            template: __webpack_require__(/*! ./login-modal.component.html */ "./src/app/components/login-modal/login-modal.component.html"),
            styles: [__webpack_require__(/*! ./login-modal.component.css */ "./src/app/components/login-modal/login-modal.component.css")]
        }),
        __metadata("design:paramtypes", [_services_authentication_service__WEBPACK_IMPORTED_MODULE_3__["AuthenticationService"],
            _services_user_service__WEBPACK_IMPORTED_MODULE_5__["UserService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"],
            _services_login_modal_service__WEBPACK_IMPORTED_MODULE_4__["LoginModalService"]])
    ], LoginModalComponent);
    return LoginModalComponent;
}());



/***/ }),

/***/ "./src/app/components/navbar/navbar.component.css":
/*!********************************************************!*\
  !*** ./src/app/components/navbar/navbar.component.css ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/*Mobile phones*/\n@media only screen and (max-width: 600px) and (orientation: portrait), screen and (max-width: 992px) and (orientation: landscape) {\n  #navigation-bar {\n    position: absolute !important; /*Navbar will be fixed at top of the page in small devices*/\n  }\n}\n/*End mobile phones*/\n/*Till tablets*/\n@media only screen and (max-width: 992px) {\n  .add-session-small {\n    display: block !important;\n    float: right !important;\n  }\n}\n.add-session-small {\n  display: none;\n}\n#addSessionButton {\n  padding-right: 5px !important;\n}\n#navigation-bar {\n  top: 0;\n  transition: top 0.15s ease-in-out;\n}\n.nav-up {\n  top: -64px !important;\n}\na {\n  color: #333;\n}\na.button-collapse {\n  color: #FFFFFF;\n}\nul li {\n  text-transform: uppercase;\n}\n.navbar-button {\n  padding-left: 20px;\n  padding-right: 20px;\n  vertical-align: inherit;\n}\n.navbar-button:hover {\n  background-color: #375646;\n  color: #61ffae !important;\n}\n.dropdown-menu-button a {\n  background-color: #375646;\n  color: white;\n}\n.dropdown-menu-button a:hover{\n  background-color: #375646 !important;\n  color: #61ffae;\n}\n.dropdown-content li.divider {\n  background-color: #96a19b !important;\n}\n#arrow-drop-down:hover {\n  color: #61ffae !important;\n}\ni.material-icons {\n    transition: all .2s ease-out;\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29tcG9uZW50cy9uYXZiYXIvbmF2YmFyLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsZ0JBQWdCO0FBQ2hCO0VBQ0U7SUFDRSw2QkFBNkIsRUFBRSwyREFBMkQ7RUFDNUY7QUFDRjtBQUNBLG9CQUFvQjtBQUVwQixlQUFlO0FBQ2Y7RUFDRTtJQUNFLHlCQUF5QjtJQUN6Qix1QkFBdUI7RUFDekI7QUFDRjtBQUdBO0VBQ0UsYUFBYTtBQUNmO0FBRUE7RUFDRSw2QkFBNkI7QUFDL0I7QUFFQTtFQUNFLE1BQU07RUFDTixpQ0FBaUM7QUFDbkM7QUFFQTtFQUNFLHFCQUFxQjtBQUN2QjtBQUVBO0VBQ0UsV0FBVztBQUNiO0FBRUE7RUFDRSxjQUFjO0FBQ2hCO0FBRUE7RUFDRSx5QkFBeUI7QUFDM0I7QUFFQTtFQUNFLGtCQUFrQjtFQUNsQixtQkFBbUI7RUFDbkIsdUJBQXVCO0FBQ3pCO0FBRUE7RUFDRSx5QkFBeUI7RUFDekIseUJBQXlCO0FBQzNCO0FBRUE7RUFDRSx5QkFBeUI7RUFDekIsWUFBWTtBQUNkO0FBRUE7RUFDRSxvQ0FBb0M7RUFDcEMsY0FBYztBQUNoQjtBQUVBO0VBQ0Usb0NBQW9DO0FBQ3RDO0FBRUE7RUFDRSx5QkFBeUI7QUFDM0I7QUFFQTtJQUNJLDRCQUE0QjtBQUNoQyIsImZpbGUiOiJzcmMvYXBwL2NvbXBvbmVudHMvbmF2YmFyL25hdmJhci5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLypNb2JpbGUgcGhvbmVzKi9cbkBtZWRpYSBvbmx5IHNjcmVlbiBhbmQgKG1heC13aWR0aDogNjAwcHgpIGFuZCAob3JpZW50YXRpb246IHBvcnRyYWl0KSwgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA5OTJweCkgYW5kIChvcmllbnRhdGlvbjogbGFuZHNjYXBlKSB7XG4gICNuYXZpZ2F0aW9uLWJhciB7XG4gICAgcG9zaXRpb246IGFic29sdXRlICFpbXBvcnRhbnQ7IC8qTmF2YmFyIHdpbGwgYmUgZml4ZWQgYXQgdG9wIG9mIHRoZSBwYWdlIGluIHNtYWxsIGRldmljZXMqL1xuICB9XG59XG4vKkVuZCBtb2JpbGUgcGhvbmVzKi9cblxuLypUaWxsIHRhYmxldHMqL1xuQG1lZGlhIG9ubHkgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA5OTJweCkge1xuICAuYWRkLXNlc3Npb24tc21hbGwge1xuICAgIGRpc3BsYXk6IGJsb2NrICFpbXBvcnRhbnQ7XG4gICAgZmxvYXQ6IHJpZ2h0ICFpbXBvcnRhbnQ7XG4gIH1cbn1cblxuXG4uYWRkLXNlc3Npb24tc21hbGwge1xuICBkaXNwbGF5OiBub25lO1xufVxuXG4jYWRkU2Vzc2lvbkJ1dHRvbiB7XG4gIHBhZGRpbmctcmlnaHQ6IDVweCAhaW1wb3J0YW50O1xufVxuXG4jbmF2aWdhdGlvbi1iYXIge1xuICB0b3A6IDA7XG4gIHRyYW5zaXRpb246IHRvcCAwLjE1cyBlYXNlLWluLW91dDtcbn1cblxuLm5hdi11cCB7XG4gIHRvcDogLTY0cHggIWltcG9ydGFudDtcbn1cblxuYSB7XG4gIGNvbG9yOiAjMzMzO1xufVxuXG5hLmJ1dHRvbi1jb2xsYXBzZSB7XG4gIGNvbG9yOiAjRkZGRkZGO1xufVxuXG51bCBsaSB7XG4gIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XG59XG5cbi5uYXZiYXItYnV0dG9uIHtcbiAgcGFkZGluZy1sZWZ0OiAyMHB4O1xuICBwYWRkaW5nLXJpZ2h0OiAyMHB4O1xuICB2ZXJ0aWNhbC1hbGlnbjogaW5oZXJpdDtcbn1cblxuLm5hdmJhci1idXR0b246aG92ZXIge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMzc1NjQ2O1xuICBjb2xvcjogIzYxZmZhZSAhaW1wb3J0YW50O1xufVxuXG4uZHJvcGRvd24tbWVudS1idXR0b24gYSB7XG4gIGJhY2tncm91bmQtY29sb3I6ICMzNzU2NDY7XG4gIGNvbG9yOiB3aGl0ZTtcbn1cblxuLmRyb3Bkb3duLW1lbnUtYnV0dG9uIGE6aG92ZXJ7XG4gIGJhY2tncm91bmQtY29sb3I6ICMzNzU2NDYgIWltcG9ydGFudDtcbiAgY29sb3I6ICM2MWZmYWU7XG59XG5cbi5kcm9wZG93bi1jb250ZW50IGxpLmRpdmlkZXIge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjOTZhMTliICFpbXBvcnRhbnQ7XG59XG5cbiNhcnJvdy1kcm9wLWRvd246aG92ZXIge1xuICBjb2xvcjogIzYxZmZhZSAhaW1wb3J0YW50O1xufVxuXG5pLm1hdGVyaWFsLWljb25zIHtcbiAgICB0cmFuc2l0aW9uOiBhbGwgLjJzIGVhc2Utb3V0O1xufVxuIl19 */"

/***/ }),

/***/ "./src/app/components/navbar/navbar.component.html":
/*!*********************************************************!*\
  !*** ./src/app/components/navbar/navbar.component.html ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"navbar-fixed\">\n  <nav id=\"navigation-bar\" class=\"secondaryColor-back\" role=\"navigation\">\n    <div class=\"nav-wrapper container\">\n      <a id=\"logo-container\" href=\"/\" class=\"brand-logo app-title-header white-text\">FullTeaching</a>\n\n      <!--Logout view-->\n      <ul *ngIf=\"!this.authenticationService.isLoggedIn()\" class=\"right\">\n        <li><a href=\"#login-modal\" (click)=\"updateLoginModalView(false)\" id=\"signUpButton\" class=\"navbar-button waves-effect white-text\">Sign up</a></li>\n        <li><a href=\"#login-modal\" (click)=\"updateLoginModalView(true)\" class=\"navbar-button waves-effect white-text\">Log in</a></li>\n      </ul>\n\n      <!--Login view-->\n      <ul *ngIf=\"this.authenticationService.isLoggedIn()\" class=\"right\" >\n        <li><a id=\"courses-button\" routerLink=\"/courses\" class=\"navbar-button waves-effect white-text\">Courses</a></li>\n        <li><a id=\"settings-button\" routerLink=\"/settings\" class=\"navbar-button waves-effect white-text\">Settings</a></li>\n        <!-- Dropdown Content -->\n        <ul id=\"dropdown1\" class=\"dropdown-content\">\n          <li class=\"divider\"></li>\n          <li class=\"dropdown-menu-button\"><a id=\"logout-button\" class=\"waves-effect\" (click)=\"logout()\">Logout</a></li>\n          <li class=\"divider\"></li>\n          <li class=\"dropdown-menu-button\"><a id=\"contact-button\" class=\"waves-effect\">Contact</a></li>\n        </ul>\n        <!-- Dropdown Trigger -->\n        <li><a class=\"navbar-button\"><i id=\"arrow-drop-down\" class=\"material-icons white-text right dropdown-button\" data-activates=\"dropdown1\" data-beloworigin=\"true\" materialize=\"dropdown\" >arrow_drop_down</i></a></li>\n      </ul>\n\n      <!--Side nav mobile-->\n      <ul *ngIf=\"this.authenticationService.isLoggedIn()\" id=\"nav-mobile\" class=\"side-nav\">\n        <li><a routerLink=\"/courses\" class=\"waves-effect\">Courses</a></li>\n        <li><a routerLink=\"/settings\" class=\"waves-effect\">Settings</a></li>\n        <li class=\"divider\"></li>\n        <li><a class=\"waves-effect\">Contact</a></li>\n        <li><a class=\"waves-effect\" (click)=\"logout()\">Logout</a></li>\n      </ul>\n      <a *ngIf=\"this.authenticationService.isLoggedIn()\" class=\"button-collapse\" materialize=\"sideNav\" data-activates=\"nav-mobile\" [materializeParams]=\"[{closeOnClick: true}, {draggable: true}]\"><i class=\"material-icons\">menu</i></a>\n    </div>\n  </nav>\n</div>\n"

/***/ }),

/***/ "./src/app/components/navbar/navbar.component.ts":
/*!*******************************************************!*\
  !*** ./src/app/components/navbar/navbar.component.ts ***!
  \*******************************************************/
/*! exports provided: NavbarComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NavbarComponent", function() { return NavbarComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _services_authentication_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/authentication.service */ "./src/app/services/authentication.service.ts");
/* harmony import */ var _services_login_modal_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../services/login-modal.service */ "./src/app/services/login-modal.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var NavbarComponent = /** @class */ (function () {
    function NavbarComponent(authenticationService, loginModalService, location) {
        this.authenticationService = authenticationService;
        this.loginModalService = loginModalService;
        this.location = location;
    }
    NavbarComponent.prototype.updateLoginModalView = function (b) {
        this.loginModalService.activateLoginView(b);
    };
    //Checks if the route is "/courses".
    NavbarComponent.prototype.addSessionHidden = function () {
        var list = ["/courses"], route = this.location.path();
        return (list.indexOf(route) > -1);
    };
    NavbarComponent.prototype.logout = function () {
        this.authenticationService.logOut().subscribe(function (response) { $("div.drag-target").remove(); }, //This deletes the draggable element for the side menu (external to the menu itself in the DOM)
        function (//This deletes the draggable element for the side menu (external to the menu itself in the DOM)
        error) { return console.log("Error when trying to log out: " + error); });
    };
    NavbarComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'navbar',
            template: __webpack_require__(/*! ./navbar.component.html */ "./src/app/components/navbar/navbar.component.html"),
            styles: [__webpack_require__(/*! ./navbar.component.css */ "./src/app/components/navbar/navbar.component.css")]
        }),
        __metadata("design:paramtypes", [_services_authentication_service__WEBPACK_IMPORTED_MODULE_2__["AuthenticationService"], _services_login_modal_service__WEBPACK_IMPORTED_MODULE_3__["LoginModalService"], _angular_common__WEBPACK_IMPORTED_MODULE_1__["Location"]])
    ], NavbarComponent);
    return NavbarComponent;
}());



/***/ }),

/***/ "./src/app/components/presentation/presentation.component.css":
/*!********************************************************************!*\
  !*** ./src/app/components/presentation/presentation.component.css ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "nav ul a, nav .brand-logo {\n  color: #444;\n}\n\np {\n  line-height: 2rem;\n}\n\n.parallax-container {\n  min-height: 380px;\n  line-height: 0;\n  height: auto;\n  color: rgba(255, 255, 255, .9);\n}\n\n.parallax-container .section {\n  width: 100%;\n}\n\n@media only screen and (min-width: 993px) {\n  .parallax-container .section {\n    position: absolute;\n    top: 20%;\n  }\n  #index-banner .section {\n    top: 20%;\n  }\n}\n\n@media only screen and (max-width: 992px) {\n  .parallax-container .section {\n    position: absolute;\n  }\n  #index-banner .section {\n    top: 20%;\n  }\n}\n\n/*Mobile phones*/\n\n@media only screen and (max-width: 600px) and (orientation: portrait), screen and (max-width: 992px) and (orientation: landscape) {\n  img.welcome-image {\n    bottom: -180px !important;\n    left: -325px !important;\n    /*CSS transitions*/\n    transition-property: none !important;\n    /*CSS transforms*/\n    -webkit-transform: none !important;\n    transform: none !important;\n    /*CSS animations*/\n    -webkit-animation: none !important;\n    animation: none !important;\n  }\n\n  ul.slides li {\n    /*CSS transitions*/\n    transition-property: none !important;\n    /*CSS transforms*/\n    -webkit-transform: none !important;\n    transform: none !important;\n    /*CSS animations*/\n    -webkit-animation: none !important;\n    animation: none !important;\n  }\n}\n\n/*End Mobile phones*/\n\n.fixed-navbar-gap {\n  top: -64px;\n  min-height: 444px;\n}\n\n.welcome-image {\n  -webkit-filter: grayscale(0.25);\n  filter: grayscale(0.25);\n}\n\n.slider-images {\n  -webkit-filter: grayscale(1);\n  filter: grayscale(1);\n}\n\n.slider .slides li .caption {\n  color: #375646 !important;\n}\n\n.indicator-item.active {\n  background-color: #375646 !important;\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29tcG9uZW50cy9wcmVzZW50YXRpb24vcHJlc2VudGF0aW9uLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxXQUFXO0FBQ2I7O0FBRUE7RUFDRSxpQkFBaUI7QUFDbkI7O0FBRUE7RUFDRSxpQkFBaUI7RUFDakIsY0FBYztFQUNkLFlBQVk7RUFDWiw4QkFBOEI7QUFDaEM7O0FBRUE7RUFDRSxXQUFXO0FBQ2I7O0FBRUE7RUFDRTtJQUNFLGtCQUFrQjtJQUNsQixRQUFRO0VBQ1Y7RUFDQTtJQUNFLFFBQVE7RUFDVjtBQUNGOztBQUVBO0VBQ0U7SUFDRSxrQkFBa0I7RUFDcEI7RUFDQTtJQUNFLFFBQVE7RUFDVjtBQUNGOztBQUVBLGdCQUFnQjs7QUFDaEI7RUFDRTtJQUNFLHlCQUF5QjtJQUN6Qix1QkFBdUI7SUFDdkIsa0JBQWtCO0lBS2xCLG9DQUFvQztJQUNwQyxpQkFBaUI7SUFJakIsa0NBQWtDO0lBQ2xDLDBCQUEwQjtJQUMxQixpQkFBaUI7SUFDakIsa0NBQWtDO0lBSWxDLDBCQUEwQjtFQUM1Qjs7RUFFQTtJQUNFLGtCQUFrQjtJQUtsQixvQ0FBb0M7SUFDcEMsaUJBQWlCO0lBSWpCLGtDQUFrQztJQUNsQywwQkFBMEI7SUFDMUIsaUJBQWlCO0lBQ2pCLGtDQUFrQztJQUlsQywwQkFBMEI7RUFDNUI7QUFDRjs7QUFDQSxvQkFBb0I7O0FBRXBCO0VBQ0UsVUFBVTtFQUNWLGlCQUFpQjtBQUNuQjs7QUFFQTtFQUNFLCtCQUErQjtFQUMvQix1QkFBdUI7QUFDekI7O0FBRUE7RUFDRSw0QkFBNEI7RUFDNUIsb0JBQW9CO0FBQ3RCOztBQUNBO0VBQ0UseUJBQXlCO0FBQzNCOztBQUVBO0VBQ0Usb0NBQW9DO0FBQ3RDIiwiZmlsZSI6InNyYy9hcHAvY29tcG9uZW50cy9wcmVzZW50YXRpb24vcHJlc2VudGF0aW9uLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyJuYXYgdWwgYSwgbmF2IC5icmFuZC1sb2dvIHtcbiAgY29sb3I6ICM0NDQ7XG59XG5cbnAge1xuICBsaW5lLWhlaWdodDogMnJlbTtcbn1cblxuLnBhcmFsbGF4LWNvbnRhaW5lciB7XG4gIG1pbi1oZWlnaHQ6IDM4MHB4O1xuICBsaW5lLWhlaWdodDogMDtcbiAgaGVpZ2h0OiBhdXRvO1xuICBjb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAuOSk7XG59XG5cbi5wYXJhbGxheC1jb250YWluZXIgLnNlY3Rpb24ge1xuICB3aWR0aDogMTAwJTtcbn1cblxuQG1lZGlhIG9ubHkgc2NyZWVuIGFuZCAobWluLXdpZHRoOiA5OTNweCkge1xuICAucGFyYWxsYXgtY29udGFpbmVyIC5zZWN0aW9uIHtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgdG9wOiAyMCU7XG4gIH1cbiAgI2luZGV4LWJhbm5lciAuc2VjdGlvbiB7XG4gICAgdG9wOiAyMCU7XG4gIH1cbn1cblxuQG1lZGlhIG9ubHkgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA5OTJweCkge1xuICAucGFyYWxsYXgtY29udGFpbmVyIC5zZWN0aW9uIHtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIH1cbiAgI2luZGV4LWJhbm5lciAuc2VjdGlvbiB7XG4gICAgdG9wOiAyMCU7XG4gIH1cbn1cblxuLypNb2JpbGUgcGhvbmVzKi9cbkBtZWRpYSBvbmx5IHNjcmVlbiBhbmQgKG1heC13aWR0aDogNjAwcHgpIGFuZCAob3JpZW50YXRpb246IHBvcnRyYWl0KSwgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA5OTJweCkgYW5kIChvcmllbnRhdGlvbjogbGFuZHNjYXBlKSB7XG4gIGltZy53ZWxjb21lLWltYWdlIHtcbiAgICBib3R0b206IC0xODBweCAhaW1wb3J0YW50O1xuICAgIGxlZnQ6IC0zMjVweCAhaW1wb3J0YW50O1xuICAgIC8qQ1NTIHRyYW5zaXRpb25zKi9cbiAgICAtby10cmFuc2l0aW9uLXByb3BlcnR5OiBub25lICFpbXBvcnRhbnQ7XG4gICAgLW1vei10cmFuc2l0aW9uLXByb3BlcnR5OiBub25lICFpbXBvcnRhbnQ7XG4gICAgLW1zLXRyYW5zaXRpb24tcHJvcGVydHk6IG5vbmUgIWltcG9ydGFudDtcbiAgICAtd2Via2l0LXRyYW5zaXRpb24tcHJvcGVydHk6IG5vbmUgIWltcG9ydGFudDtcbiAgICB0cmFuc2l0aW9uLXByb3BlcnR5OiBub25lICFpbXBvcnRhbnQ7XG4gICAgLypDU1MgdHJhbnNmb3JtcyovXG4gICAgLW8tdHJhbnNmb3JtOiBub25lICFpbXBvcnRhbnQ7XG4gICAgLW1vei10cmFuc2Zvcm06IG5vbmUgIWltcG9ydGFudDtcbiAgICAtbXMtdHJhbnNmb3JtOiBub25lICFpbXBvcnRhbnQ7XG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IG5vbmUgIWltcG9ydGFudDtcbiAgICB0cmFuc2Zvcm06IG5vbmUgIWltcG9ydGFudDtcbiAgICAvKkNTUyBhbmltYXRpb25zKi9cbiAgICAtd2Via2l0LWFuaW1hdGlvbjogbm9uZSAhaW1wb3J0YW50O1xuICAgIC1tb3otYW5pbWF0aW9uOiBub25lICFpbXBvcnRhbnQ7XG4gICAgLW8tYW5pbWF0aW9uOiBub25lICFpbXBvcnRhbnQ7XG4gICAgLW1zLWFuaW1hdGlvbjogbm9uZSAhaW1wb3J0YW50O1xuICAgIGFuaW1hdGlvbjogbm9uZSAhaW1wb3J0YW50O1xuICB9XG5cbiAgdWwuc2xpZGVzIGxpIHtcbiAgICAvKkNTUyB0cmFuc2l0aW9ucyovXG4gICAgLW8tdHJhbnNpdGlvbi1wcm9wZXJ0eTogbm9uZSAhaW1wb3J0YW50O1xuICAgIC1tb3otdHJhbnNpdGlvbi1wcm9wZXJ0eTogbm9uZSAhaW1wb3J0YW50O1xuICAgIC1tcy10cmFuc2l0aW9uLXByb3BlcnR5OiBub25lICFpbXBvcnRhbnQ7XG4gICAgLXdlYmtpdC10cmFuc2l0aW9uLXByb3BlcnR5OiBub25lICFpbXBvcnRhbnQ7XG4gICAgdHJhbnNpdGlvbi1wcm9wZXJ0eTogbm9uZSAhaW1wb3J0YW50O1xuICAgIC8qQ1NTIHRyYW5zZm9ybXMqL1xuICAgIC1vLXRyYW5zZm9ybTogbm9uZSAhaW1wb3J0YW50O1xuICAgIC1tb3otdHJhbnNmb3JtOiBub25lICFpbXBvcnRhbnQ7XG4gICAgLW1zLXRyYW5zZm9ybTogbm9uZSAhaW1wb3J0YW50O1xuICAgIC13ZWJraXQtdHJhbnNmb3JtOiBub25lICFpbXBvcnRhbnQ7XG4gICAgdHJhbnNmb3JtOiBub25lICFpbXBvcnRhbnQ7XG4gICAgLypDU1MgYW5pbWF0aW9ucyovXG4gICAgLXdlYmtpdC1hbmltYXRpb246IG5vbmUgIWltcG9ydGFudDtcbiAgICAtbW96LWFuaW1hdGlvbjogbm9uZSAhaW1wb3J0YW50O1xuICAgIC1vLWFuaW1hdGlvbjogbm9uZSAhaW1wb3J0YW50O1xuICAgIC1tcy1hbmltYXRpb246IG5vbmUgIWltcG9ydGFudDtcbiAgICBhbmltYXRpb246IG5vbmUgIWltcG9ydGFudDtcbiAgfVxufVxuLypFbmQgTW9iaWxlIHBob25lcyovXG5cbi5maXhlZC1uYXZiYXItZ2FwIHtcbiAgdG9wOiAtNjRweDtcbiAgbWluLWhlaWdodDogNDQ0cHg7XG59XG5cbi53ZWxjb21lLWltYWdlIHtcbiAgLXdlYmtpdC1maWx0ZXI6IGdyYXlzY2FsZSgwLjI1KTtcbiAgZmlsdGVyOiBncmF5c2NhbGUoMC4yNSk7XG59XG5cbi5zbGlkZXItaW1hZ2VzIHtcbiAgLXdlYmtpdC1maWx0ZXI6IGdyYXlzY2FsZSgxKTtcbiAgZmlsdGVyOiBncmF5c2NhbGUoMSk7XG59XG4uc2xpZGVyIC5zbGlkZXMgbGkgLmNhcHRpb24ge1xuICBjb2xvcjogIzM3NTY0NiAhaW1wb3J0YW50O1xufVxuXG4uaW5kaWNhdG9yLWl0ZW0uYWN0aXZlIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzM3NTY0NiAhaW1wb3J0YW50O1xufVxuIl19 */"

/***/ }),

/***/ "./src/app/components/presentation/presentation.component.html":
/*!*********************************************************************!*\
  !*** ./src/app/components/presentation/presentation.component.html ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<login-modal></login-modal>\n\n<div id=\"index-banner\" class=\"parallax-container fixed-navbar-gap\">\n  <div class=\"section no-pad-bot\">\n    <div class=\"container\">\n      <br><br>\n      <h1 class=\"header center app-title-header text-lighten-2 secondaryColor-color\">FullTeaching</h1>\n      <div class=\"row center\">\n        <h5 class=\"header col s12 light\">Rediscover the joy of learning</h5>\n      </div>\n      <div class=\"row center\">\n        <a href=\"#login-modal\" id=\"download-button\" class=\"btn-large waves-effect lighten-1 accentColor1-back\">Welcome!</a>\n      </div>\n      <br><br>\n\n    </div>\n  </div>\n  <div materialize=\"parallax\" class=\"parallax\"><img class=\"welcome-image\" src=\"assets/images/background1.jpg\" alt=\"Unsplashed background img 1\"></div>\n</div>\n\n<!--Slider-->\n<div class=\"container\">\n  <div class=\"section\">\n\n    <!--   Icon Section   -->\n    <div class=\"row\">\n      <div materialize=\"slider\" class=\"slider\">\n        <ul class=\"slides\">\n          <li>\n            <img class=\"slider-images\" src=\"assets/images/slider1.jpg\">\n            <!-- first image -->\n            <div class=\"caption center-align\">\n              <h3>Do not limit yourself</h3>\n              <h5 class=\"light text-lighten-3\">Whenever you want. Wherever you are.<br/>Learning should have no limits</h5>\n            </div>\n          </li>\n          <li>\n            <img class=\"slider-images\" src=\"assets/images/slider2.jpg\">\n            <!-- second image -->\n            <div class=\"caption left-align\">\n              <h3>Connect with your partners</h3>\n              <h5 class=\"light text-lighten-3\">Teamwork is the cornerstone of an excellent education</h5>\n            </div>\n          </li>\n          <li>\n            <img class=\"slider-images\" src=\"assets/images/slider3.jpg\">\n            <!-- third image -->\n            <div class=\"caption left-align\">\n              <h3 class=\"white-text\">All on the web</h3>\n              <h5 class=\"light text-lighten-3 white-text\">FullTeaching lives on the Internet.<br/>No need of apps or any kind of download</h5>\n            </div>\n          </li>\n        </ul>\n      </div>\n    </div>\n  </div>\n</div>\n<!--End Slider-->\n\n<div class=\"parallax-container valign-wrapper\">\n  <div class=\"section no-pad-bot\">\n    <div class=\"container\">\n      <div class=\"row center\">\n        <h5 class=\"header col s12 light\">An educational web application for productive teaching and learning</h5>\n      </div>\n    </div>\n  </div>\n  <div materialize=\"parallax\" class=\"parallax\"><img class=\"welcome-image\" src=\"assets/images/background2.jpg\" alt=\"Unsplashed background img 2\"></div>\n</div>\n\n<div class=\"container\">\n  <div class=\"section\">\n\n    <div class=\"row\">\n      <div class=\"col s12 center\">\n        <h3><i class=\"mdi-content-send brown-text\"></i></h3>\n        <h4>What makes <a class=\"app-title-header secondaryColor-color\">FullTeaching</a> special?</h4>\n        <p class=\"light flow-text\">FullTeaching makes your online studies much more easier and simpler. Whether you are a teacher or student, FullTeaching provides a powerfull fully web-based platform that allows you to be in class no matter where you are. And how can you do it?\n          <br/><br/>And all to get what really matters: that you can focus on your studies.\n        </p>\n      </div>\n    </div>\n\n  </div>\n</div>\n\n<div class=\"parallax-container valign-wrapper\">\n  <div class=\"section no-pad-bot\">\n    <div class=\"container\">\n      <div class=\"row center\">\n        <h5 class=\"header col s12 light\">All in your favorite browser</h5>\n      </div>\n    </div>\n  </div>\n  <div materialize=\"parallax\" class=\"parallax\"><img class=\"welcome-image\" src=\"assets/images/background3.jpg\" alt=\"Unsplashed background img 3\"></div>\n</div>\n"

/***/ }),

/***/ "./src/app/components/presentation/presentation.component.ts":
/*!*******************************************************************!*\
  !*** ./src/app/components/presentation/presentation.component.ts ***!
  \*******************************************************************/
/*! exports provided: PresentationComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PresentationComponent", function() { return PresentationComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _services_authentication_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/authentication.service */ "./src/app/services/authentication.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var PresentationComponent = /** @class */ (function () {
    function PresentationComponent(authenticationService, router) {
        this.authenticationService = authenticationService;
        this.router = router;
    }
    PresentationComponent.prototype.ngOnInit = function () {
        var _this = this;
        //If the user is loggedIn, navigates to dashboard
        this.authenticationService.checkCredentials()
            .then(function () { _this.router.navigate(['/courses']); })
            .catch(function (e) { });
    };
    PresentationComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-presentation',
            template: __webpack_require__(/*! ./presentation.component.html */ "./src/app/components/presentation/presentation.component.html"),
            styles: [__webpack_require__(/*! ./presentation.component.css */ "./src/app/components/presentation/presentation.component.css")]
        }),
        __metadata("design:paramtypes", [_services_authentication_service__WEBPACK_IMPORTED_MODULE_2__["AuthenticationService"], _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"]])
    ], PresentationComponent);
    return PresentationComponent;
}());



/***/ }),

/***/ "./src/app/components/settings/settings.component.css":
/*!************************************************************!*\
  !*** ./src/app/components/settings/settings.component.css ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".profile-pic {\n  width: 100%;\n}\n\n.setting-title {\n  display: inline-block;\n  font-size: large;\n  font-variant: small-caps;\n  font-weight: 500;\n}\n\n.setting-content {\n  display: inline-block;\n}\n\n.setting-li {\n  padding: 15px 20px !important;\n}\n\n.setting-section {\n  font-size: 1.5rem;\n  font-weight: 300;\n  padding-bottom: 15px;\n}\n\n.profile-row {\n  margin-bottom: 30px;\n}\n\n#input-file {\n  display: none;\n}\n\ndiv.loading.loading-pic{\n  position: relative !important;\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29tcG9uZW50cy9zZXR0aW5ncy9zZXR0aW5ncy5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsV0FBVztBQUNiOztBQUVBO0VBQ0UscUJBQXFCO0VBQ3JCLGdCQUFnQjtFQUNoQix3QkFBd0I7RUFDeEIsZ0JBQWdCO0FBQ2xCOztBQUVBO0VBQ0UscUJBQXFCO0FBQ3ZCOztBQUVBO0VBQ0UsNkJBQTZCO0FBQy9COztBQUVBO0VBQ0UsaUJBQWlCO0VBQ2pCLGdCQUFnQjtFQUNoQixvQkFBb0I7QUFDdEI7O0FBRUE7RUFDRSxtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSxhQUFhO0FBQ2Y7O0FBRUE7RUFDRSw2QkFBNkI7QUFDL0IiLCJmaWxlIjoic3JjL2FwcC9jb21wb25lbnRzL3NldHRpbmdzL3NldHRpbmdzLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIucHJvZmlsZS1waWMge1xuICB3aWR0aDogMTAwJTtcbn1cblxuLnNldHRpbmctdGl0bGUge1xuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gIGZvbnQtc2l6ZTogbGFyZ2U7XG4gIGZvbnQtdmFyaWFudDogc21hbGwtY2FwcztcbiAgZm9udC13ZWlnaHQ6IDUwMDtcbn1cblxuLnNldHRpbmctY29udGVudCB7XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbn1cblxuLnNldHRpbmctbGkge1xuICBwYWRkaW5nOiAxNXB4IDIwcHggIWltcG9ydGFudDtcbn1cblxuLnNldHRpbmctc2VjdGlvbiB7XG4gIGZvbnQtc2l6ZTogMS41cmVtO1xuICBmb250LXdlaWdodDogMzAwO1xuICBwYWRkaW5nLWJvdHRvbTogMTVweDtcbn1cblxuLnByb2ZpbGUtcm93IHtcbiAgbWFyZ2luLWJvdHRvbTogMzBweDtcbn1cblxuI2lucHV0LWZpbGUge1xuICBkaXNwbGF5OiBub25lO1xufVxuXG5kaXYubG9hZGluZy5sb2FkaW5nLXBpY3tcbiAgcG9zaXRpb246IHJlbGF0aXZlICFpbXBvcnRhbnQ7XG59XG4iXX0= */"

/***/ }),

/***/ "./src/app/components/settings/settings.component.html":
/*!*************************************************************!*\
  !*** ./src/app/components/settings/settings.component.html ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container margins-top-bottom\">\n\n  <!--CHANGE PASSWORD DIALOG-->\n  <div id=\"password-modal\" class=\"modal my-modal-class course-modal\" materialize=\"modal\" [materializeParams]=\"[{dismissible: false}]\">\n\n    <div *ngIf=\"processingPass\" class=\"loading\"></div>\n\n    <div class=\"modal-content\" [class.filtered]=\"processingPass\">\n      <p class=\"p-bold-modal-header\">Change password</p>\n      <div class=\"row no-margin\">\n\n        <form materialize #passwordForm class=\"col s12\" (ngSubmit)=\"onPasswordSubmit()\">\n          <div class=\"row no-margin\">\n\n            <div class=\"row row-mobile\">\n              <div class=\"input-field col s12\">\n                <input [(ngModel)]=\"inputCurrentPassword\" name=\"inputCurrentPassword\" id=\"inputCurrentPassword\" type=\"password\" class=\"validate\" required>\n                <label for=\"inputCurrentPassword\">Current password</label>\n              </div>\n            </div>\n\n            <div class=\"row row-mobile\">\n              <div class=\"input-field col s12\">\n                <input [(ngModel)]=\"inputNewPassword\" name=\"inputNewPassword\" id=\"inputNewPassword\" type=\"password\" class=\"validate\" required>\n                <label for=\"inputNewPassword\">New password</label>\n              </div>\n            </div>\n\n            <div class=\"row\">\n              <div class=\"input-field col s12\">\n                <input [(ngModel)]=\"inputNewPassword2\" name=\"inputNewPassword2\" id=\"inputNewPassword2\" type=\"password\" class=\"validate\" required>\n                <label for=\"inputNewPassword2\">Repeat new password</label>\n              </div>\n            </div>\n\n          </div>\n\n          <app-error-message *ngIf=\"fieldsIncorrect\" (eventShowable)=\"fieldsIncorrect = false\" [errorTitle]=\"this.errorTitle\" [errorContent]=\"this.errorContent\" [customClass]=\"this.customClass\" [closable]=\"true\"></app-error-message>\n\n          <div class=\"row row-mobile right-align\">\n            <a (click)=\"passwordForm.reset(); this.fieldsIncorrect = false;\" class=\"modal-action modal-close waves-effect btn-flat modal-footer-button cancel-modal-btn\">Close</a>\n            <button type=\"submit\" class=\"waves-effect btn-flat modal-footer-button\">Send</button>\n          </div>\n\n        </form>\n\n      </div>\n    </div>\n  </div>\n  <!--CHANGE PASSWORD DIALOG-->\n\n  <div class=\"setting-section\">PROFILE\n    <div class=\"row divider\"></div>\n  </div>\n\n  <div class=\"row profile-row\">\n\n    <div class=\"col l4 m6 s12\">\n\n      <div *ngIf=\"processingPic\" class=\"loading loading-pic\"></div>\n\n      <div class=\"row no-margin\" [class.filtered]=\"processingPic\">\n        <div class=\"col s12\">\n          <img *ngIf=\"!!this.user\" class=\"circle profile-pic\" src=\"{{this.user.picture}}\">\n        </div>\n        <div class=\"col s12\">\n          <div class=\"row\">\n\n            <app-file-uploader *ngIf=\"!!this.user\" (onCompleteFileUpload)=\"pictureUploadCompleted($event)\" (onUploadStarted)=\"pictureUploadStarted($event)\" [uniqueID]=\"0\" [URLUPLOAD]=\"this.URL_UPLOAD + this.user.id\" [isMultiple]=\"false\" [typeOfFile]=\"'picture'\" [buttonText]=\"'Change picture'\"></app-file-uploader>\n\n          </div>\n        </div>\n      </div>\n    </div>\n\n    <div class=\"col l8 m6 s12\">\n      <ul class=\"collection\">\n        <li class=\"collection-item setting-li\">\n          <div class=\"setting-title\">Mail</div>\n          <div *ngIf=\"!!this.user\" id=\"stng-user-mail\" class=\"setting-content right\">{{this.user.name}}</div>\n        </li>\n        <li class=\"collection-item setting-li\">\n          <div class=\"setting-title\">Name</div>\n          <div *ngIf=\"!!this.user\" class=\"setting-content right\">{{this.user.nickName}}</div>\n        </li>\n        <li class=\"collection-item setting-li\">\n          <div class=\"setting-title\">Registration date</div>\n          <div *ngIf=\"!!this.user\" class=\"setting-content right\">{{this.user.registrationDate | date}}</div>\n        </li>\n        <li class=\"collection-item setting-li\">\n          <div class=\"setting-title\">Password</div>\n          <div class=\"setting-content right\">\n            <a href=\"#password-modal\" class=\"btn waves-effect button-small\" (click)=\"this.animationService.animateIfSmall()\">Change password</a>\n          </div>\n        </li>\n      </ul>\n    </div>\n\n  </div>\n\n  <div class=\"setting-section\">DEFAULT SETTINGS\n    <div class=\"row divider\"></div>\n  </div>\n\n  <div class=\"row\">\n\n    <div class=\"col l4 m6 s12\">\n      <div class=\"card\">\n        <div class=\"card-content\">\n          <span class=\"card-title grey-text text-darken-4\">Setting 1</span>\n          <p>About this particular setting</p>\n          <div class=\"switch\">\n            <label>Off<input type=\"checkbox\"><span class=\"lever\"></span> On</label>\n          </div>\n        </div>\n      </div>\n    </div>\n\n    <div class=\"col l4 m6 s12\">\n      <div class=\"card\">\n        <div class=\"card-content\">\n          <span class=\"card-title grey-text text-darken-4\">Setting 2</span>\n          <p>About this particular setting</p>\n          <div class=\"switch\">\n            <label>Off<input type=\"checkbox\"><span class=\"lever\"></span> On</label>\n          </div>\n        </div>\n      </div>\n    </div>\n\n    <div class=\"col l4 m6 s12\">\n      <div class=\"card\">\n        <div class=\"card-content\">\n          <span class=\"card-title grey-text text-darken-4\">Setting 3</span>\n          <p>About this particular setting</p>\n          <div class=\"switch\">\n            <label>Off<input type=\"checkbox\"><span class=\"lever\"></span> On</label>\n          </div>\n        </div>\n      </div>\n    </div>\n\n    <div class=\"col l4 m6 s12\">\n      <div class=\"card\">\n        <div class=\"card-content\">\n          <span class=\"card-title grey-text text-darken-4\">Setting 4</span>\n          <p>About this particular setting</p>\n          <div class=\"switch\">\n            <label>Off<input type=\"checkbox\"><span class=\"lever\"></span> On</label>\n          </div>\n        </div>\n      </div>\n    </div>\n\n    <div class=\"col l4 m6 s12\">\n      <div class=\"card\">\n        <div class=\"card-content\">\n          <span class=\"card-title grey-text text-darken-4\">Setting 5</span>\n          <p>About this particular setting</p>\n          <div class=\"switch\">\n            <label>Off<input type=\"checkbox\"><span class=\"lever\"></span> On</label>\n          </div>\n        </div>\n      </div>\n    </div>\n\n  </div>\n\n</div>\n"

/***/ }),

/***/ "./src/app/components/settings/settings.component.ts":
/*!***********************************************************!*\
  !*** ./src/app/components/settings/settings.component.ts ***!
  \***********************************************************/
/*! exports provided: SettingsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SettingsComponent", function() { return SettingsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _services_authentication_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/authentication.service */ "./src/app/services/authentication.service.ts");
/* harmony import */ var _services_user_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../services/user.service */ "./src/app/services/user.service.ts");
/* harmony import */ var _services_animation_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../services/animation.service */ "./src/app/services/animation.service.ts");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../constants */ "./src/app/constants.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var SettingsComponent = /** @class */ (function () {
    function SettingsComponent(authenticationService, userService, animationService) {
        this.authenticationService = authenticationService;
        this.userService = userService;
        this.animationService = animationService;
        this.processingPic = false;
        this.processingPass = false;
        this.fieldsIncorrect = false;
        //URL for uploading files changes between development stage and production stage
        this.URL_UPLOAD = _environments_environment__WEBPACK_IMPORTED_MODULE_1__["environment"].URL_PIC_UPLOAD;
    }
    SettingsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.authenticationService.checkCredentials()
            .then(function () { _this.user = _this.authenticationService.getCurrentUser(); })
            .catch(function (e) { });
    };
    SettingsComponent.prototype.pictureUploadStarted = function (started) {
        this.processingPic = started;
    };
    SettingsComponent.prototype.pictureUploadCompleted = function (response) {
        console.log("Picture changed successfully: " + response);
        this.user.picture = response;
        this.processingPic = false;
    };
    SettingsComponent.prototype.onPasswordSubmit = function () {
        var _this = this;
        this.processingPass = true;
        //New passwords don't match
        if (this.inputNewPassword !== this.inputNewPassword2) {
            this.errorTitle = 'Your passwords don\'t match!';
            this.errorContent = '';
            this.customClass = 'fail';
            this.toastMessage = 'Your passwords don\'t match!';
            this.handleError();
        }
        else {
            var regex = new RegExp(_constants__WEBPACK_IMPORTED_MODULE_5__["Constants"].PASS_REGEX);
            //The new password does not have a valid format
            if (!(this.inputNewPassword.match(regex))) {
                this.errorTitle = 'Your new password does not have a valid format!';
                this.errorContent = 'It must be at least 8 characters long and include one uppercase, one lowercase and a number';
                this.customClass = 'fail';
                this.toastMessage = 'Your new password must be 8 characters long, one upperCase, one lowerCase and a number';
                this.handleError();
            }
            else {
                this.userService.changePassword(this.inputCurrentPassword, this.inputNewPassword).subscribe(function (result) {
                    //Password changed succesfully
                    console.log("Password changed succesfully!");
                    _this.inputCurrentPassword = '';
                    _this.inputNewPassword = '';
                    _this.inputNewPassword2 = '';
                    _this.submitProcessing = false;
                    _this.fieldsIncorrect = false;
                    _this.errorTitle = 'Password changed succesfully!';
                    _this.errorContent = '';
                    _this.customClass = 'correct';
                    _this.toastMessage = 'Your password has been correctly changed';
                    _this.handleError();
                }, function (error) {
                    console.log("Password change failed (error): " + error);
                    if (error === 304) { //NOT_MODIFIED: New password not valid
                        _this.errorTitle = 'Your new password does not have a valid format!';
                        _this.errorContent = 'It must be at least 8 characters long and include one uppercase, one lowercase and a number';
                        _this.customClass = 'fail';
                        _this.toastMessage = 'Your new password must be 8 characters long, one upperCase, one lowerCase and a number';
                    }
                    else if (error === 409) { //CONFLICT: Current password not valid
                        _this.errorTitle = 'Invalid current password';
                        _this.errorContent = 'Our server has rejected that password';
                        _this.customClass = 'fail';
                        _this.toastMessage = 'Your current password is wrong!';
                    }
                    // Password change failed
                    _this.handleError();
                });
            }
        }
    };
    SettingsComponent.prototype.handleError = function () {
        this.processingPass = false;
        if (window.innerWidth <= _constants__WEBPACK_IMPORTED_MODULE_5__["Constants"].PHONE_MAX_WIDTH) { // On mobile phones error on toast
            Materialize.toast(this.toastMessage, _constants__WEBPACK_IMPORTED_MODULE_5__["Constants"].TOAST_SHOW_TIME, 'rounded');
        }
        else { // On desktop error on error-message
            this.fieldsIncorrect = true;
        }
    };
    SettingsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-settings',
            template: __webpack_require__(/*! ./settings.component.html */ "./src/app/components/settings/settings.component.html"),
            styles: [__webpack_require__(/*! ./settings.component.css */ "./src/app/components/settings/settings.component.css")]
        }),
        __metadata("design:paramtypes", [_services_authentication_service__WEBPACK_IMPORTED_MODULE_2__["AuthenticationService"],
            _services_user_service__WEBPACK_IMPORTED_MODULE_3__["UserService"],
            _services_animation_service__WEBPACK_IMPORTED_MODULE_4__["AnimationService"]])
    ], SettingsComponent);
    return SettingsComponent;
}());



/***/ }),

/***/ "./src/app/components/video-session/stream.component.css":
/*!***************************************************************!*\
  !*** ./src/app/components/video-session/stream.component.css ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".participant {\n  width: 100%;\n  margin: 0;\n}\n.participant video {\n  width: 100%;\n  height: auto;\n}\n.participant-small {\n  position: fixed;\n  width: 400px;\n  bottom: 0;\n  right: 0;\n  margin-bottom: 10px;\n  margin-right: 20px;\n}\n.participant-small video {\n  border: 2px solid black;\n  border-radius: 2px;\n}\n.participant-small .name-div {\n  position: absolute;\n}\n.name-div {\n  position: fixed;\n  width: 100%;\n  bottom: 0;\n  color: white;\n  text-align: left;\n}\n.name-p {\n  display: inline-block;\n  margin-left: 20px;\n  background-color: #375646;\n  padding: 5px;\n  border-radius: 2px;\n  font-weight: bold;\n}\n/*Mobile phones*/\n@media only screen and (max-width: 600px) and (orientation: portrait), screen and (max-width: 992px) and (orientation: landscape) {\n  .participant-small {\n    position: fixed;\n    width: 15em;\n    bottom: 0;\n    right: 0;\n    margin-bottom: 10px;\n    margin-right: 20px;\n  }\n\n  .participant-small .name-p {\n    display: inline-block;\n    margin-left: 5px;\n    margin-bottom: 10px;\n    background-color: #375646;\n    padding: 2px;\n    border-radius: 2px;\n    font-weight: bold;\n    font-size: x-small;\n  }\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29tcG9uZW50cy92aWRlby1zZXNzaW9uL3N0cmVhbS5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsV0FBVztFQUNYLFNBQVM7QUFDWDtBQUNBO0VBQ0UsV0FBVztFQUNYLFlBQVk7QUFDZDtBQUVBO0VBQ0UsZUFBZTtFQUNmLFlBQVk7RUFDWixTQUFTO0VBQ1QsUUFBUTtFQUNSLG1CQUFtQjtFQUNuQixrQkFBa0I7QUFDcEI7QUFFQTtFQUNFLHVCQUF1QjtFQUN2QixrQkFBa0I7QUFDcEI7QUFFQTtFQUNFLGtCQUFrQjtBQUNwQjtBQUVBO0VBQ0UsZUFBZTtFQUNmLFdBQVc7RUFDWCxTQUFTO0VBQ1QsWUFBWTtFQUNaLGdCQUFnQjtBQUNsQjtBQUVBO0VBQ0UscUJBQXFCO0VBQ3JCLGlCQUFpQjtFQUNqQix5QkFBeUI7RUFDekIsWUFBWTtFQUNaLGtCQUFrQjtFQUNsQixpQkFBaUI7QUFDbkI7QUFFQSxnQkFBZ0I7QUFDaEI7RUFDRTtJQUNFLGVBQWU7SUFDZixXQUFXO0lBQ1gsU0FBUztJQUNULFFBQVE7SUFDUixtQkFBbUI7SUFDbkIsa0JBQWtCO0VBQ3BCOztFQUVBO0lBQ0UscUJBQXFCO0lBQ3JCLGdCQUFnQjtJQUNoQixtQkFBbUI7SUFDbkIseUJBQXlCO0lBQ3pCLFlBQVk7SUFDWixrQkFBa0I7SUFDbEIsaUJBQWlCO0lBQ2pCLGtCQUFrQjtFQUNwQjtBQUNGIiwiZmlsZSI6InNyYy9hcHAvY29tcG9uZW50cy92aWRlby1zZXNzaW9uL3N0cmVhbS5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLnBhcnRpY2lwYW50IHtcbiAgd2lkdGg6IDEwMCU7XG4gIG1hcmdpbjogMDtcbn1cbi5wYXJ0aWNpcGFudCB2aWRlbyB7XG4gIHdpZHRoOiAxMDAlO1xuICBoZWlnaHQ6IGF1dG87XG59XG5cbi5wYXJ0aWNpcGFudC1zbWFsbCB7XG4gIHBvc2l0aW9uOiBmaXhlZDtcbiAgd2lkdGg6IDQwMHB4O1xuICBib3R0b206IDA7XG4gIHJpZ2h0OiAwO1xuICBtYXJnaW4tYm90dG9tOiAxMHB4O1xuICBtYXJnaW4tcmlnaHQ6IDIwcHg7XG59XG5cbi5wYXJ0aWNpcGFudC1zbWFsbCB2aWRlbyB7XG4gIGJvcmRlcjogMnB4IHNvbGlkIGJsYWNrO1xuICBib3JkZXItcmFkaXVzOiAycHg7XG59XG5cbi5wYXJ0aWNpcGFudC1zbWFsbCAubmFtZS1kaXYge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG59XG5cbi5uYW1lLWRpdiB7XG4gIHBvc2l0aW9uOiBmaXhlZDtcbiAgd2lkdGg6IDEwMCU7XG4gIGJvdHRvbTogMDtcbiAgY29sb3I6IHdoaXRlO1xuICB0ZXh0LWFsaWduOiBsZWZ0O1xufVxuXG4ubmFtZS1wIHtcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICBtYXJnaW4tbGVmdDogMjBweDtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzM3NTY0NjtcbiAgcGFkZGluZzogNXB4O1xuICBib3JkZXItcmFkaXVzOiAycHg7XG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xufVxuXG4vKk1vYmlsZSBwaG9uZXMqL1xuQG1lZGlhIG9ubHkgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA2MDBweCkgYW5kIChvcmllbnRhdGlvbjogcG9ydHJhaXQpLCBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDk5MnB4KSBhbmQgKG9yaWVudGF0aW9uOiBsYW5kc2NhcGUpIHtcbiAgLnBhcnRpY2lwYW50LXNtYWxsIHtcbiAgICBwb3NpdGlvbjogZml4ZWQ7XG4gICAgd2lkdGg6IDE1ZW07XG4gICAgYm90dG9tOiAwO1xuICAgIHJpZ2h0OiAwO1xuICAgIG1hcmdpbi1ib3R0b206IDEwcHg7XG4gICAgbWFyZ2luLXJpZ2h0OiAyMHB4O1xuICB9XG5cbiAgLnBhcnRpY2lwYW50LXNtYWxsIC5uYW1lLXAge1xuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICBtYXJnaW4tbGVmdDogNXB4O1xuICAgIG1hcmdpbi1ib3R0b206IDEwcHg7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzM3NTY0NjtcbiAgICBwYWRkaW5nOiAycHg7XG4gICAgYm9yZGVyLXJhZGl1czogMnB4O1xuICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xuICAgIGZvbnQtc2l6ZTogeC1zbWFsbDtcbiAgfVxufVxuIl19 */"

/***/ }),

/***/ "./src/app/components/video-session/stream.component.ts":
/*!**************************************************************!*\
  !*** ./src/app/components/video-session/stream.component.ts ***!
  \**************************************************************/
/*! exports provided: StreamComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StreamComponent", function() { return StreamComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var openvidu_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! openvidu-browser */ "./node_modules/openvidu-browser/lib/index.js");
/* harmony import */ var openvidu_browser__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(openvidu_browser__WEBPACK_IMPORTED_MODULE_1__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var StreamComponent = /** @class */ (function () {
    function StreamComponent() {
    }
    StreamComponent.prototype.ngAfterViewInit = function () {
        this.videoElement = this.elementRef.nativeElement;
    };
    StreamComponent.prototype.ngOnChanges = function (changes) {
        if (changes['muted']) {
            this.muted = changes['muted'].currentValue;
            console.warn("Small: " + this.small + " | Muted: " + this.muted);
        }
    };
    StreamComponent.prototype.ngDoCheck = function () {
        if (this.videoElement && (this.videoElement.srcObject !== this.stream.getMediaStream())) {
            this.videoElement.srcObject = this.stream.getMediaStream();
        }
    };
    StreamComponent.prototype.getName = function () {
        return ((JSON.parse(this.stream.connection.data))['name']);
    };
    StreamComponent.prototype.getVideoNameFromStream = function () {
        return (this.stream != null) ? 'VIDEO-' + this.getName() : 'VIDEO';
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('videoElement'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], StreamComponent.prototype, "elementRef", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", openvidu_browser__WEBPACK_IMPORTED_MODULE_1__["Stream"])
    ], StreamComponent.prototype, "stream", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Boolean)
    ], StreamComponent.prototype, "small", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Boolean)
    ], StreamComponent.prototype, "muted", void 0);
    StreamComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'stream',
            template: "\n        <div class='participant' [class.participant-small]=\"this.small\">\n          <div *ngIf=\"this.stream\" class=\"name-div\"><p class=\"name-p\">{{this.getName()}}</p></div>\n          <video #videoElement autoplay=\"true\" [muted]=\"this.muted\" [attr.title]=\"getVideoNameFromStream()\" ></video>\n        </div>",
            styles: [__webpack_require__(/*! ./stream.component.css */ "./src/app/components/video-session/stream.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], StreamComponent);
    return StreamComponent;
}());



/***/ }),

/***/ "./src/app/components/video-session/video-session.component.css":
/*!**********************************************************************!*\
  !*** ./src/app/components/video-session/video-session.component.css ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "#video-session-div {\n  width: 100%;\n  height: 100%;\n}\n\nvideo {\n  width: 100%;\n  height: 100%;\n}\n\n.video-icon {\n  font-size: 32px;\n  cursor: pointer;\n}\n\n.video-icon:hover {\n  color: rgb(133, 133, 133);\n}\n\n#div-header-buttons {\n  position: fixed;\n  width: 100%;\n  z-index: 900;\n}\n\n#side-menu-button {\n  position: fixed;\n  z-index: 1000;\n  margin-left: 10px;\n  margin-top: 10px;\n}\n\n#fixed-icon {\n  font-size: 42px;\n}\n\n.floating-button {\n  float: right;\n  z-index: 1000;\n  margin-right: 10px;\n  margin-top: 10px;\n  right: 0;\n}\n\n.usr-btn {\n  border: 7px;\n  border-style: solid;\n}\n\n.usr-btn i {\n  margin-left: -7px;\n  margin-top: -7px;\n}\n\n#exit-icon {\n  margin: 10px;\n}\n\n#show-chat-icon {\n  margin: 10px;\n  margin-left: 90px;\n}\n\n#fake-send-btn {\n  font-size: 11px;\n  font-weight: 600;\n  padding-left: 12px;\n  padding-right: 12px;\n  height: 27px;\n  line-height: 27px;\n  display: inline-block;\n  margin: 0;\n}\n\n.chat_wrapper {\n  position: relative;\n  margin-top: 50px;\n  height: 90%;\n  padding: 10px;\n  padding-bottom: 7rem;\n  margin-right: 10px;\n  margin-left: 10px;\n}\n\n#message-box-cont {\n  height: 100%;\n}\n\n#message_box {\n  height: 100%;\n  background: #f3f3f3;\n  overflow: auto;\n  padding: 10px;\n}\n\n.session-title-div {\n  text-align: center;\n  position: fixed;\n  width: 100%;\n}\n\n#session-title {\n  margin-top: 10px;\n  margin-bottom: 0;\n  font-weight: 200;\n  font-size: 3rem;\n}\n\n.session-bottom-div {\n  position: fixed;\n  width: 100%;\n  bottom: 0;\n  height: 80px;\n}\n\n.video-control {\n  background-color: rgba(255, 255, 255, 0.4) !important;\n  box-shadow: none;\n}\n\n.video-control:hover {\n  background-color: rgba(255, 255, 255, 0.6) !important;\n}\n\n.video-control-icon {\n  color: #ffffff;\n  font-size: 32px;\n}\n\n#div-video-control {\n  text-align: center;\n  width: 100%;\n}\n\n.div-video-control-shown {\n  visibility: visible !important;\n  opacity: 1 !important;\n}\n\n.box-video-control {\n  display: inline-block;\n  border-radius: 2px;\n  padding: 10px 20px 10px 20px;\n  background-color: rgba(0, 0, 0, 0.3);\n}\n\n.fade-in-controls {\n  visibility: visible;\n  opacity: 1;\n  transition: opacity 0.5s linear;\n}\n\n.fade-out-controls {\n  visibility: hidden;\n  opacity: 0;\n  transition: visibility 0s 5s, opacity 3s cubic-bezier(1, 0.01, 0.9, 0.26);\n}\n\n.num-attenders-div {\n  margin-top: 10px;\n  margin-bottom: 20px;\n  text-align: right;\n  font-weight: 300;\n}\n\n.num-connected {\n  font-size: large;\n  font-weight: bold;\n  color: green;\n}\n\n.num-total {\n  font-size: large;\n  font-weight: bold;\n  color: #c78100;\n}\n\n.attender-name {\n  font-weight: 600;\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29tcG9uZW50cy92aWRlby1zZXNzaW9uL3ZpZGVvLXNlc3Npb24uY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLFdBQVc7RUFDWCxZQUFZO0FBQ2Q7O0FBRUE7RUFDRSxXQUFXO0VBQ1gsWUFBWTtBQUNkOztBQUVBO0VBQ0UsZUFBZTtFQUNmLGVBQWU7QUFDakI7O0FBRUE7RUFDRSx5QkFBeUI7QUFDM0I7O0FBRUE7RUFDRSxlQUFlO0VBQ2YsV0FBVztFQUNYLFlBQVk7QUFDZDs7QUFFQTtFQUNFLGVBQWU7RUFDZixhQUFhO0VBQ2IsaUJBQWlCO0VBQ2pCLGdCQUFnQjtBQUNsQjs7QUFFQTtFQUNFLGVBQWU7QUFDakI7O0FBRUE7RUFDRSxZQUFZO0VBQ1osYUFBYTtFQUNiLGtCQUFrQjtFQUNsQixnQkFBZ0I7RUFDaEIsUUFBUTtBQUNWOztBQUVBO0VBQ0UsV0FBVztFQUNYLG1CQUFtQjtBQUNyQjs7QUFFQTtFQUNFLGlCQUFpQjtFQUNqQixnQkFBZ0I7QUFDbEI7O0FBRUE7RUFDRSxZQUFZO0FBQ2Q7O0FBRUE7RUFDRSxZQUFZO0VBQ1osaUJBQWlCO0FBQ25COztBQUVBO0VBQ0UsZUFBZTtFQUNmLGdCQUFnQjtFQUNoQixrQkFBa0I7RUFDbEIsbUJBQW1CO0VBQ25CLFlBQVk7RUFDWixpQkFBaUI7RUFDakIscUJBQXFCO0VBQ3JCLFNBQVM7QUFDWDs7QUFFQTtFQUNFLGtCQUFrQjtFQUNsQixnQkFBZ0I7RUFDaEIsV0FBVztFQUNYLGFBQWE7RUFDYixvQkFBb0I7RUFDcEIsa0JBQWtCO0VBQ2xCLGlCQUFpQjtBQUNuQjs7QUFFQTtFQUNFLFlBQVk7QUFDZDs7QUFFQTtFQUNFLFlBQVk7RUFDWixtQkFBbUI7RUFDbkIsY0FBYztFQUNkLGFBQWE7QUFDZjs7QUFFQTtFQUNFLGtCQUFrQjtFQUNsQixlQUFlO0VBQ2YsV0FBVztBQUNiOztBQUVBO0VBQ0UsZ0JBQWdCO0VBQ2hCLGdCQUFnQjtFQUNoQixnQkFBZ0I7RUFDaEIsZUFBZTtBQUNqQjs7QUFFQTtFQUNFLGVBQWU7RUFDZixXQUFXO0VBQ1gsU0FBUztFQUNULFlBQVk7QUFDZDs7QUFFQTtFQUNFLHFEQUFxRDtFQUNyRCxnQkFBZ0I7QUFDbEI7O0FBRUE7RUFDRSxxREFBcUQ7QUFDdkQ7O0FBRUE7RUFDRSxjQUFjO0VBQ2QsZUFBZTtBQUNqQjs7QUFFQTtFQUNFLGtCQUFrQjtFQUNsQixXQUFXO0FBQ2I7O0FBRUE7RUFDRSw4QkFBOEI7RUFDOUIscUJBQXFCO0FBQ3ZCOztBQUVBO0VBQ0UscUJBQXFCO0VBQ3JCLGtCQUFrQjtFQUNsQiw0QkFBNEI7RUFDNUIsb0NBQW9DO0FBQ3RDOztBQUVBO0VBQ0UsbUJBQW1CO0VBQ25CLFVBQVU7RUFDViwrQkFBK0I7QUFDakM7O0FBRUE7RUFDRSxrQkFBa0I7RUFDbEIsVUFBVTtFQUNWLHlFQUF5RTtBQUMzRTs7QUFFQTtFQUNFLGdCQUFnQjtFQUNoQixtQkFBbUI7RUFDbkIsaUJBQWlCO0VBQ2pCLGdCQUFnQjtBQUNsQjs7QUFFQTtFQUNFLGdCQUFnQjtFQUNoQixpQkFBaUI7RUFDakIsWUFBWTtBQUNkOztBQUVBO0VBQ0UsZ0JBQWdCO0VBQ2hCLGlCQUFpQjtFQUNqQixjQUFjO0FBQ2hCOztBQUVBO0VBQ0UsZ0JBQWdCO0FBQ2xCIiwiZmlsZSI6InNyYy9hcHAvY29tcG9uZW50cy92aWRlby1zZXNzaW9uL3ZpZGVvLXNlc3Npb24uY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIiN2aWRlby1zZXNzaW9uLWRpdiB7XG4gIHdpZHRoOiAxMDAlO1xuICBoZWlnaHQ6IDEwMCU7XG59XG5cbnZpZGVvIHtcbiAgd2lkdGg6IDEwMCU7XG4gIGhlaWdodDogMTAwJTtcbn1cblxuLnZpZGVvLWljb24ge1xuICBmb250LXNpemU6IDMycHg7XG4gIGN1cnNvcjogcG9pbnRlcjtcbn1cblxuLnZpZGVvLWljb246aG92ZXIge1xuICBjb2xvcjogcmdiKDEzMywgMTMzLCAxMzMpO1xufVxuXG4jZGl2LWhlYWRlci1idXR0b25zIHtcbiAgcG9zaXRpb246IGZpeGVkO1xuICB3aWR0aDogMTAwJTtcbiAgei1pbmRleDogOTAwO1xufVxuXG4jc2lkZS1tZW51LWJ1dHRvbiB7XG4gIHBvc2l0aW9uOiBmaXhlZDtcbiAgei1pbmRleDogMTAwMDtcbiAgbWFyZ2luLWxlZnQ6IDEwcHg7XG4gIG1hcmdpbi10b3A6IDEwcHg7XG59XG5cbiNmaXhlZC1pY29uIHtcbiAgZm9udC1zaXplOiA0MnB4O1xufVxuXG4uZmxvYXRpbmctYnV0dG9uIHtcbiAgZmxvYXQ6IHJpZ2h0O1xuICB6LWluZGV4OiAxMDAwO1xuICBtYXJnaW4tcmlnaHQ6IDEwcHg7XG4gIG1hcmdpbi10b3A6IDEwcHg7XG4gIHJpZ2h0OiAwO1xufVxuXG4udXNyLWJ0biB7XG4gIGJvcmRlcjogN3B4O1xuICBib3JkZXItc3R5bGU6IHNvbGlkO1xufVxuXG4udXNyLWJ0biBpIHtcbiAgbWFyZ2luLWxlZnQ6IC03cHg7XG4gIG1hcmdpbi10b3A6IC03cHg7XG59XG5cbiNleGl0LWljb24ge1xuICBtYXJnaW46IDEwcHg7XG59XG5cbiNzaG93LWNoYXQtaWNvbiB7XG4gIG1hcmdpbjogMTBweDtcbiAgbWFyZ2luLWxlZnQ6IDkwcHg7XG59XG5cbiNmYWtlLXNlbmQtYnRuIHtcbiAgZm9udC1zaXplOiAxMXB4O1xuICBmb250LXdlaWdodDogNjAwO1xuICBwYWRkaW5nLWxlZnQ6IDEycHg7XG4gIHBhZGRpbmctcmlnaHQ6IDEycHg7XG4gIGhlaWdodDogMjdweDtcbiAgbGluZS1oZWlnaHQ6IDI3cHg7XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgbWFyZ2luOiAwO1xufVxuXG4uY2hhdF93cmFwcGVyIHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBtYXJnaW4tdG9wOiA1MHB4O1xuICBoZWlnaHQ6IDkwJTtcbiAgcGFkZGluZzogMTBweDtcbiAgcGFkZGluZy1ib3R0b206IDdyZW07XG4gIG1hcmdpbi1yaWdodDogMTBweDtcbiAgbWFyZ2luLWxlZnQ6IDEwcHg7XG59XG5cbiNtZXNzYWdlLWJveC1jb250IHtcbiAgaGVpZ2h0OiAxMDAlO1xufVxuXG4jbWVzc2FnZV9ib3gge1xuICBoZWlnaHQ6IDEwMCU7XG4gIGJhY2tncm91bmQ6ICNmM2YzZjM7XG4gIG92ZXJmbG93OiBhdXRvO1xuICBwYWRkaW5nOiAxMHB4O1xufVxuXG4uc2Vzc2lvbi10aXRsZS1kaXYge1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIHBvc2l0aW9uOiBmaXhlZDtcbiAgd2lkdGg6IDEwMCU7XG59XG5cbiNzZXNzaW9uLXRpdGxlIHtcbiAgbWFyZ2luLXRvcDogMTBweDtcbiAgbWFyZ2luLWJvdHRvbTogMDtcbiAgZm9udC13ZWlnaHQ6IDIwMDtcbiAgZm9udC1zaXplOiAzcmVtO1xufVxuXG4uc2Vzc2lvbi1ib3R0b20tZGl2IHtcbiAgcG9zaXRpb246IGZpeGVkO1xuICB3aWR0aDogMTAwJTtcbiAgYm90dG9tOiAwO1xuICBoZWlnaHQ6IDgwcHg7XG59XG5cbi52aWRlby1jb250cm9sIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjQpICFpbXBvcnRhbnQ7XG4gIGJveC1zaGFkb3c6IG5vbmU7XG59XG5cbi52aWRlby1jb250cm9sOmhvdmVyIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjYpICFpbXBvcnRhbnQ7XG59XG5cbi52aWRlby1jb250cm9sLWljb24ge1xuICBjb2xvcjogI2ZmZmZmZjtcbiAgZm9udC1zaXplOiAzMnB4O1xufVxuXG4jZGl2LXZpZGVvLWNvbnRyb2wge1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIHdpZHRoOiAxMDAlO1xufVxuXG4uZGl2LXZpZGVvLWNvbnRyb2wtc2hvd24ge1xuICB2aXNpYmlsaXR5OiB2aXNpYmxlICFpbXBvcnRhbnQ7XG4gIG9wYWNpdHk6IDEgIWltcG9ydGFudDtcbn1cblxuLmJveC12aWRlby1jb250cm9sIHtcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICBib3JkZXItcmFkaXVzOiAycHg7XG4gIHBhZGRpbmc6IDEwcHggMjBweCAxMHB4IDIwcHg7XG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC4zKTtcbn1cblxuLmZhZGUtaW4tY29udHJvbHMge1xuICB2aXNpYmlsaXR5OiB2aXNpYmxlO1xuICBvcGFjaXR5OiAxO1xuICB0cmFuc2l0aW9uOiBvcGFjaXR5IDAuNXMgbGluZWFyO1xufVxuXG4uZmFkZS1vdXQtY29udHJvbHMge1xuICB2aXNpYmlsaXR5OiBoaWRkZW47XG4gIG9wYWNpdHk6IDA7XG4gIHRyYW5zaXRpb246IHZpc2liaWxpdHkgMHMgNXMsIG9wYWNpdHkgM3MgY3ViaWMtYmV6aWVyKDEsIDAuMDEsIDAuOSwgMC4yNik7XG59XG5cbi5udW0tYXR0ZW5kZXJzLWRpdiB7XG4gIG1hcmdpbi10b3A6IDEwcHg7XG4gIG1hcmdpbi1ib3R0b206IDIwcHg7XG4gIHRleHQtYWxpZ246IHJpZ2h0O1xuICBmb250LXdlaWdodDogMzAwO1xufVxuXG4ubnVtLWNvbm5lY3RlZCB7XG4gIGZvbnQtc2l6ZTogbGFyZ2U7XG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xuICBjb2xvcjogZ3JlZW47XG59XG5cbi5udW0tdG90YWwge1xuICBmb250LXNpemU6IGxhcmdlO1xuICBmb250LXdlaWdodDogYm9sZDtcbiAgY29sb3I6ICNjNzgxMDA7XG59XG5cbi5hdHRlbmRlci1uYW1lIHtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbn1cbiJdfQ== */"

/***/ }),

/***/ "./src/app/components/video-session/video-session.component.html":
/*!***********************************************************************!*\
  !*** ./src/app/components/video-session/video-session.component.html ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"this.authenticationService.isLoggedIn()\" id=\"video-session-div\">\n\n  <a id=\"side-menu-button\" materialize=\"sideNav\" data-activates=\"slide-out\" [materializeParams]=\"[{draggable: false}]\"><i id=\"fixed-icon\" class=\"material-icons video-icon\" (onclick)=\"document.getElementsByTagName('body')[0].style.overflowY = 'hidden'\">menu</i></a>\n  <div id=\"div-header-buttons\" class=\"row no-margin\">\n    <div class=\"col s12 m12 l12 no-padding-right\"><a class=\"btn-floating btn-large waves-effect waves-light red floating-button\" (click)=\"toggleFullScreen()\"><i class=\"material-icons\">{{fullscreenIcon}}</i></a></div>\n    <div class=\"col s12 m12 l12 no-padding-right\"><a *ngIf=\"this.authenticationService.isStudent() && !this.myStudentAccessGranted\" class=\"btn-floating btn-large waves-effect waves-light red floating-button\" (click)=\"askForIntervention()\"><i class=\"material-icons\">{{interventionIcon}}</i></a></div>\n    <div class=\"row no-margin\" *ngIf=\"this.authenticationService.isTeacher()\">\n      <div *ngFor=\"let userData of this.userData | interventionAskedFilter ; let i = index\" class=\"col s12 m12 l12 no-padding-right\">\n        <a *ngIf=\"!studentAccessGranted || userData.accessGranted\"  materialize=\"tooltip\" data-position=\"left\" data-delay=\"65\" [attr.data-tooltip]=\"userData.name\" class=\"btn-floating btn-large waves-effect floating-button white usr-btn\" (click)=\"grantIntervention(!studentAccessGranted, userData)\" [style.border-color]=\"userData.color\">\n          <i *ngIf=\"this.studentAccessGranted\" class=\"material-icons\" [style.color]=\"userData.color\">cancel</i>\n          <img *ngIf=\"!this.studentAccessGranted\" class=\"circle responsive-img\" [src]=\"userData.picture\">\n        </a>\n      </div>\n    </div>\n  </div>\n\n  <div *ngIf=\"OVSession\">\n    <div class=\"session-title-div\">\n      <h2 id=\"session-title\">{{this.sessionName}}</h2>\n    </div>\n    <div>\n      <stream *ngIf=\"bigStream\" [stream]=\"bigStream\" [small]=\"false\" [muted]=\"(this.authenticationService.isTeacher() && !studentAccessGranted) || (!this.authenticationService.isTeacher() && myStudentAccessGranted)\"></stream>\n      <stream *ngIf=\"smallStream && studentAccessGranted\" [stream]=\"smallStream\" [small]=\"true\" [muted]=\"this.authenticationService.isTeacher()\"></stream>\n    </div>\n    <div class=\"session-bottom-div valign-wrapper\" (mouseenter)=\"this.controlsShown = true\"  (mouseleave)=\"this.controlsShown = false\">\n      <div id=\"div-video-control\" [class.div-video-control-shown]=\"this.playPauseIcon==='play_arrow'\" [class.fade-in-controls]=\"this.controlsShown\" [class.fade-out-controls]=\"!this.controlsShown\">\n        <div class=\"box-video-control\">\n          <a class=\"btn-floating waves-effect video-control\" (click)=\"togglePlayPause()\">\n            <i class=\"material-icons video-control-icon\">{{this.playPauseIcon}}</i>\n          </a>\n          <a class=\"btn-floating waves-effect video-control\" (click)=\"toggleMute()\">\n            <i class=\"material-icons video-control-icon\">{{this.volumeMuteIcon}}</i>\n          </a>\n          <input id=\"slider-volume\" name=\"slider-volume\" type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" [(ngModel)]=\"this.volumeLevel\" (ngModelChange)=\"changeVolume($event)\"/>\n        </div>\n      </div>\n    </div>\n  </div>\n\n  <ul id=\"slide-out\" class=\"side-nav\">\n    <i (click)=\"this.exitFromSession()\" id=\"exit-icon\" class=\"right material-icons video-icon\" [title]=\"'Exit'\">exit_to_app</i>\n    <i (click)=\"changeShowChat()\" id=\"show-chat-icon\" class=\"left material-icons video-icon\">{{this.showChatIcon}}</i>\n    <div class=\"chat_wrapper\">\n\n      <div *ngIf=\"showChat\" id=\"message-box-cont\">\n        <div class=\"message_box\" id=\"message_box\">\n          <div *ngFor=\"let chatline of this.chatLines\">\n            <app-chat-line [chatLine]=\"chatline\"></app-chat-line>\n          </div>\n        </div>\n        <div class=\"panel\">\n          <form (ngSubmit)=\"sendChatMessage()\">\n            <input [(ngModel)]=\"myMessage\" type=\"text\" name=\"message\" id=\"message\" placeholder=\"Message\" maxlength=\"400\" autocomplete=\"off\"/>\n            <input *ngIf=\"this.myMessage\" type=\"submit\" id=\"send-btn\" class=\"btn waves-effect button-small\" value=\"Send\">\n            <a *ngIf=\"!this.myMessage\" id=\"fake-send-btn\" class=\"btn waves-effect button-small disabled\">Send</a>\n          </form>\n        </div>\n      </div>\n\n      <div *ngIf=\"!showChat\">\n        <div class=\"num-attenders-div\">\n          <span class=\"num-connected\">{{this.userData.length}}</span>\n           of\n           <span class=\"num-total\">{{this.course.attenders.length}}</span>\n            attenders connected\n        </div>\n        <div *ngFor=\"let user of this.userData\" class=\"attender-name\" [style.color]=\"user.color\">\n          {{user.name}}\n        </div>\n      </div>\n\n    </div>\n  </ul>\n\n</div>\n"

/***/ }),

/***/ "./src/app/components/video-session/video-session.component.ts":
/*!*********************************************************************!*\
  !*** ./src/app/components/video-session/video-session.component.ts ***!
  \*********************************************************************/
/*! exports provided: VideoSessionComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VideoSessionComponent", function() { return VideoSessionComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var openvidu_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! openvidu-browser */ "./node_modules/openvidu-browser/lib/index.js");
/* harmony import */ var openvidu_browser__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(openvidu_browser__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _classes_chatline__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../classes/chatline */ "./src/app/classes/chatline.ts");
/* harmony import */ var _services_authentication_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../services/authentication.service */ "./src/app/services/authentication.service.ts");
/* harmony import */ var _services_video_session_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../services/video-session.service */ "./src/app/services/video-session.service.ts");
/* harmony import */ var _services_animation_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../services/animation.service */ "./src/app/services/animation.service.ts");
/* harmony import */ var _pipes_intervention_asked_pipe__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../pipes/intervention-asked.pipe */ "./src/app/pipes/intervention-asked.pipe.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var VideoSessionComponent = /** @class */ (function () {
    function VideoSessionComponent(authenticationService, videoSessionService, animationService, router, route, location) {
        var _this = this;
        this.authenticationService = authenticationService;
        this.videoSessionService = videoSessionService;
        this.animationService = animationService;
        this.router = router;
        this.route = route;
        this.location = location;
        this.showChat = true;
        this.chatLines = [];
        this.interventionRequired = false;
        this.studentAccessGranted = false;
        this.myStudentAccessGranted = false;
        // Icon names
        this.showChatIcon = 'supervisor_account';
        this.interventionIcon = 'record_voice_over';
        this.fullscreenIcon = "fullscreen";
        this.playPauseIcon = "pause";
        this.volumeMuteIcon = "volume_up";
        this.OVConnections = [];
        this.userData = [];
        this.user = this.authenticationService.getCurrentUser();
        this.mySession = this.videoSessionService.session;
        this.course = this.videoSessionService.course;
        // Getting the session id from the url
        this.route.params.forEach(function (params) {
            var id = +params['id'];
            _this.mySessionId = id;
        });
    }
    VideoSessionComponent.prototype.beforeunloadHandler = function (event) {
        this.removeUser();
        this.leaveSession();
    };
    VideoSessionComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.authenticationService.checkCredentials()
            .then(function () {
            if (!_this.mySession) {
                _this.router.navigate(['/courses']);
            }
            else {
                // Stablishing OpenVidu session
                _this.generateParticipantInfo();
                _this.getParamsAndJoin();
                // Deletes the draggable element for the side menu (external to the menu itself in the DOM), avoiding memory leak
                $("div.drag-target").remove();
                _this.volumeLevel = 1;
            }
        })
            .catch(function (e) { });
    };
    VideoSessionComponent.prototype.ngAfterViewInit = function () {
        document.getElementsByTagName('body')[0].style.overflowY = 'hidden';
    };
    VideoSessionComponent.prototype.ngOnDestroy = function () {
        // Close the OpenVidu sesion
        this.leaveSession();
        // Delete the dark overlay (if side menu opened) when the component is destroyed
        $("#sidenav-overlay").remove();
        document.getElementsByTagName('body')[0].style.overflowY = 'initial';
    };
    VideoSessionComponent.prototype.sendChatMessage = function () {
        this.OVSession.signal({
            type: 'chat',
            to: [],
            data: this.myMessage
        });
        this.myMessage = "";
    };
    VideoSessionComponent.prototype.exitFromSession = function () {
        this.removeUser();
        this.leaveSession();
        this.location.back();
    };
    VideoSessionComponent.prototype.changeShowChat = function () {
        this.showChat = !this.showChat;
        this.showChatIcon = (this.showChat ? 'supervisor_account' : 'chat');
    };
    VideoSessionComponent.prototype.askForIntervention = function () {
        var _this = this;
        // Request camera
        this.initPublisher();
        this.OVPublisher.on('accessAllowed', function (event) {
            console.warn("OpenVidu camera access allowed");
            var msg = {
                interventionRequired: !_this.interventionRequired
            };
            _this.OVSession.signal({
                type: 'askIntervention',
                to: [_this.teacherConnection],
                data: JSON.stringify(msg)
            });
            // Invert intervention request
            _this.interventionRequired = !_this.interventionRequired;
            // Change intervention icon
            _this.interventionIcon = (_this.interventionRequired ? 'cancel' : 'record_voice_over');
        });
        this.OVPublisher.on('accessDenied', function (event) {
            console.error("OpenVidu camera access denied");
        });
    };
    VideoSessionComponent.prototype.grantIntervention = function (grant, userData) {
        this.OVSession.signal({
            type: 'grantIntervention',
            to: this.OVConnections.filter(function (connection) { return JSON.parse(connection.data).name === userData.name; }),
            data: grant.toString()
        });
        // Set 'accessGranted' property of proper userData to 'grant' value
        this.userData.map(function (u) {
            if (u.name === userData.name) {
                u.accessGranted = grant;
                u.interventionRequired = grant;
            }
        });
        this.studentAccessGranted = grant;
    };
    VideoSessionComponent.prototype.getPhotoByName = function (userName) {
        var user = (this.course.attenders.filter(function (u) { return u.nickName == userName; }))[0];
        return user.picture;
    };
    /* Video controls */
    VideoSessionComponent.prototype.toggleFullScreen = function () {
        var fs = $('#video-session-div').get(0);
        var document = window.document;
        if (!document.fullscreenElement &&
            !document.mozFullScreenElement &&
            !document.webkitFullscreenElement &&
            !document.msFullscreenElement) {
            console.log("Entering fullscreen");
            this.fullscreenIcon = 'fullscreen_exit';
            if (fs.requestFullscreen) {
                fs.requestFullscreen();
            }
            else if (fs.msRequestFullscreen) {
                fs.msRequestFullscreen();
            }
            else if (fs.mozRequestFullScreen) {
                fs.mozRequestFullScreen();
            }
            else if (fs.webkitRequestFullscreen) {
                fs.webkitRequestFullscreen();
            }
        }
        else {
            console.log("Exiting fullscreen");
            this.fullscreenIcon = 'fullscreen';
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
            else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
            else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            }
            else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            }
        }
    };
    VideoSessionComponent.prototype.togglePlayPause = function () {
        var video = $('video')[0];
        if (video) {
            if (video.paused) {
                this.playPauseIcon = 'pause';
                video.play();
            }
            else {
                this.playPauseIcon = 'play_arrow';
                video.pause();
            }
        }
    };
    VideoSessionComponent.prototype.toggleMute = function () {
        var video = $('video')[0];
        if (video) {
            if (video.volume == 0.0) {
                video.volume = this.storedVolumeLevel;
                this.volumeLevel = this.storedVolumeLevel;
                this.changeVolumeIcon(video);
            }
            else {
                this.storedVolumeLevel = video.volume;
                video.volume = 0.0;
                this.volumeLevel = 0.0;
                this.changeVolumeIcon(video);
            }
        }
    };
    VideoSessionComponent.prototype.changeVolume = function (event) {
        var video = $('video')[0];
        console.log('Changing volume to ' + this.volumeLevel);
        video.volume = this.volumeLevel;
        this.changeVolumeIcon(video);
    };
    VideoSessionComponent.prototype.changeVolumeIcon = function (video) {
        if (video.volume > 0.65)
            this.volumeMuteIcon = "volume_up";
        else if (video.volume == 0.0)
            this.volumeMuteIcon = "volume_off";
        else
            this.volumeMuteIcon = "volume_down";
    };
    /* Video controls */
    /* OpenVidu */
    VideoSessionComponent.prototype.generateParticipantInfo = function () {
        if (!!this.mySession)
            this.sessionName = this.mySession.title;
        if (!!this.user)
            this.participantName = this.user.nickName;
    };
    VideoSessionComponent.prototype.joinSession = function () {
        var _this = this;
        this.OV = new openvidu_browser__WEBPACK_IMPORTED_MODULE_3__["OpenVidu"]();
        this.OVSession = this.OV.initSession();
        this.OVSession.on('streamCreated', function (event) {
            console.warn("OpenVidu stream created: ", event.stream);
            _this.OVSession.subscribe(event.stream, 'nothing');
            var stream = event.stream;
            if (JSON.parse(stream.connection.data).isTeacher) {
                // Teacher's stream
                _this.teacherStream = stream;
                if (_this.studentAccessGranted) {
                    // There's a student publishing: setup the 2 videos
                    _this.smallStream = stream;
                }
                else {
                    // There's no student publishing: setup only big video for the teacher
                    _this.bigStream = stream;
                }
            }
            else {
                // A student stream
                _this.bigStream = stream;
                _this.smallStream = _this.teacherStream;
                _this.studentAccessGranted = true;
            }
        });
        this.OVSession.on('streamDestroyed', function (event) {
            console.warn("OpenVidu stream destroyed: ", event.stream);
            var stream = event.stream;
            if (JSON.parse(stream.connection.data).isTeacher) {
                // Removing all streams if the teacher leaves the room
                if (_this.myStudentAccessGranted) {
                    _this.unpublish();
                }
                delete _this.bigStream;
                delete _this.smallStream;
                _this.studentAccessGranted = false;
                _this.myStudentAccessGranted = false;
                _this.interventionRequired = false;
                _this.interventionIcon = 'record_voice_over';
            }
            else {
                if (_this.bigStream.connection.connectionId === stream.connection.connectionId) {
                    // Back to teacher's stream if an active user leaves the room
                    _this.studentAccessGranted = false;
                    _this.bigStream = _this.teacherStream;
                }
            }
        });
        this.OVSession.on('connectionCreated', function (event) {
            console.warn("OpenVidu connection created: ", event.connection);
            if (event.connection === _this.OVSession.connection) {
                _this.chatLines.push(new _classes_chatline__WEBPACK_IMPORTED_MODULE_4__["Chatline"]('system-msg', null, null, "Connected!", null));
            }
            else {
                if (JSON.parse(event.connection.data).isTeacher) {
                    _this.teacherConnection = event.connection;
                }
                _this.chatLines.push(new _classes_chatline__WEBPACK_IMPORTED_MODULE_4__["Chatline"]('system-msg', null, null, JSON.parse(event.connection.data).name + " has connected!", null));
            }
            _this.OVConnections.push(event.connection);
            var uData = JSON.parse(event.connection.data);
            uData.picture = _this.getPhotoByName(uData.name);
            _this.userData.push(uData);
        });
        this.OVSession.on('connectionDestroyed', function (event) {
            console.warn("OpenVidu connection destroyed: ", event.connection);
            // Remove Connection
            var i1 = _this.OVConnections.indexOf(event.connection);
            if (i1 !== -1) {
                _this.OVConnections.splice(i1, 1);
                _this.chatLines.push(new _classes_chatline__WEBPACK_IMPORTED_MODULE_4__["Chatline"]('system-msg', null, null, JSON.parse(event.connection.data).name + " has disconnected!", null));
            }
            // Remove UserData
            var i2 = _this.userData.map(function (data) { return data.name; }).indexOf(JSON.parse(event.connection.data).name);
            if (i2 !== -1) {
                _this.userData.splice(i2, 1);
            }
        });
        // Signals
        this.OVSession.on('signal:chat', function (msg) {
            var uData = _this.userData.filter(function (d) { return d.name === JSON.parse(msg.from.data).name; })[0];
            var classUserMsg = (uData.name === JSON.parse(_this.OVSession.connection.data).name ? "own-msg" : "stranger-msg");
            _this.chatLines.push(new _classes_chatline__WEBPACK_IMPORTED_MODULE_4__["Chatline"](classUserMsg, uData.name, uData.picture, msg.data, uData.color));
            _this.animationService.animateToBottom('#message_box', 500);
        });
        if (this.authenticationService.isStudent()) {
            this.OVSession.on('signal:grantIntervention', function (msg) {
                if (msg.data === 'true') {
                    // Publish
                    _this.publish();
                    _this.studentAccessGranted = true;
                    _this.myStudentAccessGranted = true;
                }
                else {
                    // Unpublish
                    _this.unpublish();
                    _this.bigStream = _this.teacherStream;
                    _this.studentAccessGranted = false;
                    _this.myStudentAccessGranted = false;
                    // Invert intervention request
                    _this.interventionRequired = !_this.interventionRequired;
                    // Change intervention icon
                    _this.interventionIcon = (_this.interventionRequired ? 'cancel' : 'record_voice_over');
                }
            });
        }
        if (this.authenticationService.isTeacher()) {
            this.OVSession.on('signal:askIntervention', function (msg) {
                var from = msg.from;
                var petition = JSON.parse(msg.data).interventionRequired;
                if (petition) {
                    // Set proper userData  'interventionRequired' property to true
                    _this.userData.map(function (uData) {
                        if (uData.name === JSON.parse(from.data).name) {
                            uData.interventionRequired = true;
                        }
                    });
                }
                else {
                    // Set proper userData  'interventionRequired' property to false
                    _this.userData.map(function (uData) {
                        if (uData.name === JSON.parse(from.data).name) {
                            uData.interventionRequired = false;
                        }
                    });
                }
            });
        }
        this.OVSession.connect(this.OVToken)
            .then(function () {
            if (_this.authenticationService.isTeacher()) {
                _this.initPublisher();
                _this.publish();
            }
        })
            .catch(function (error) {
            console.error("Error connecting to OpenVidu session: ", error);
        });
    };
    VideoSessionComponent.prototype.getParamsAndJoin = function () {
        var _this = this;
        this.videoSessionService.getSessionIdAndToken(this.mySession.id).subscribe(function (sessionIdToken) {
            _this.OVSessionId = sessionIdToken[0];
            _this.OVToken = sessionIdToken[1];
            _this.joinSession();
        }, function (error) {
            console.error("Error getting sessionId and token: " + error);
        });
    };
    VideoSessionComponent.prototype.leaveSession = function () {
        if (this.OVSession)
            this.OVSession.disconnect(); // Disconnect from Session
        this.generateParticipantInfo();
    };
    VideoSessionComponent.prototype.removeUser = function () {
        this.videoSessionService.removeUser(this.mySessionId).subscribe(function (res) {
            console.log("User left the session");
        }, function (error) {
            console.error("Error removing user");
        });
    };
    VideoSessionComponent.prototype.initPublisher = function () {
        this.OVPublisher = this.OV.initPublisher('nothing');
    };
    VideoSessionComponent.prototype.publish = function () {
        var _this = this;
        this.OVPublisher.on('streamCreated', function (event) {
            console.warn("OpenVidu stream created by Publisher: ", event.stream);
            var stream = event.stream;
            if (JSON.parse(stream.connection.data).isTeacher) {
                _this.teacherStream = stream;
            }
            else {
                _this.smallStream = _this.teacherStream;
            }
            _this.bigStream = stream;
        });
        this.OVPublisher.on('videoElementCreated', function (event) {
            console.warn("OpenVidu video element created by Publisher: ", event.element);
        });
        this.OVSession.publish(this.OVPublisher);
    };
    VideoSessionComponent.prototype.unpublish = function () {
        this.OVSession.unpublish(this.OVPublisher);
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"])('window:beforeunload', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], VideoSessionComponent.prototype, "beforeunloadHandler", null);
    VideoSessionComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-video-session',
            template: __webpack_require__(/*! ./video-session.component.html */ "./src/app/components/video-session/video-session.component.html"),
            providers: [_pipes_intervention_asked_pipe__WEBPACK_IMPORTED_MODULE_8__["InterventionAskedPipe"]],
            styles: [__webpack_require__(/*! ./video-session.component.css */ "./src/app/components/video-session/video-session.component.css")]
        }),
        __metadata("design:paramtypes", [_services_authentication_service__WEBPACK_IMPORTED_MODULE_5__["AuthenticationService"],
            _services_video_session_service__WEBPACK_IMPORTED_MODULE_6__["VideoSessionService"],
            _services_animation_service__WEBPACK_IMPORTED_MODULE_7__["AnimationService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"],
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["Location"]])
    ], VideoSessionComponent);
    return VideoSessionComponent;
}());



/***/ }),

/***/ "./src/app/constants.ts":
/*!******************************!*\
  !*** ./src/app/constants.ts ***!
  \******************************/
/*! exports provided: Constants */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Constants", function() { return Constants; });
var Constants = Object.freeze({
    PHONE_MAX_WIDTH: 500,
    TOAST_SHOW_TIME: 5000,
    PASS_REGEX: '^((?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,20})$',
    FILE_SIZE_LIMIT: 5 * 1024 * 1024 //5MB
});


/***/ }),

/***/ "./src/app/index.ts":
/*!**************************!*\
  !*** ./src/app/index.ts ***!
  \**************************/
/*! exports provided: AppComponent, AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return _app_component__WEBPACK_IMPORTED_MODULE_0__["AppComponent"]; });

/* harmony import */ var _app_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app.module */ "./src/app/app.module.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return _app_module__WEBPACK_IMPORTED_MODULE_1__["AppModule"]; });





/***/ }),

/***/ "./src/app/pipes/intervention-asked.pipe.ts":
/*!**************************************************!*\
  !*** ./src/app/pipes/intervention-asked.pipe.ts ***!
  \**************************************************/
/*! exports provided: InterventionAskedPipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InterventionAskedPipe", function() { return InterventionAskedPipe; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var InterventionAskedPipe = /** @class */ (function () {
    function InterventionAskedPipe() {
    }
    InterventionAskedPipe.prototype.transform = function (items) {
        if (!items) {
            return items;
        }
        // Return only those users which have asked for intervention
        return items.filter(function (item) { return item.interventionRequired; });
    };
    InterventionAskedPipe = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Pipe"])({
            name: 'interventionAskedFilter',
            pure: false
        })
    ], InterventionAskedPipe);
    return InterventionAskedPipe;
}());



/***/ }),

/***/ "./src/app/services/animation.service.ts":
/*!***********************************************!*\
  !*** ./src/app/services/animation.service.ts ***!
  \***********************************************/
/*! exports provided: AnimationService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AnimationService", function() { return AnimationService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var AnimationService = /** @class */ (function () {
    function AnimationService() {
    }
    AnimationService.prototype.animateIfSmall = function () {
        if ($(window).width() <= 600 || $(window).height() <= 600)
            $('html,body').animate({ scrollTop: 0 }, 200);
    };
    AnimationService.prototype.animateToBottom = function (selector, ms) {
        $(selector).stop().animate({
            scrollTop: $(selector)[0].scrollHeight
        }, ms);
    };
    AnimationService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [])
    ], AnimationService);
    return AnimationService;
}());



/***/ }),

/***/ "./src/app/services/authentication.service.ts":
/*!****************************************************!*\
  !*** ./src/app/services/authentication.service.ts ***!
  \****************************************************/
/*! exports provided: AuthenticationService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthenticationService", function() { return AuthenticationService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/http */ "./node_modules/@angular/http/fesm5/http.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var AuthenticationService = /** @class */ (function () {
    function AuthenticationService(http, router) {
        this.http = http;
        this.router = router;
        this.urlLogIn = '/api-logIn';
        this.urlLogOut = '/api-logOut';
        //this.reqIsLogged().catch((e) => { });
    }
    AuthenticationService.prototype.logIn = function (user, pass) {
        var _this = this;
        var userPass = user + ":" + pass;
        var headers = new _angular_http__WEBPACK_IMPORTED_MODULE_1__["Headers"]({
            'Authorization': 'Basic ' + utf8_to_b64(userPass),
            'X-Requested-With': 'XMLHttpRequest'
        });
        var options = new _angular_http__WEBPACK_IMPORTED_MODULE_1__["RequestOptions"]({ headers: headers });
        return this.http.get(this.urlLogIn, options).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (response) {
            _this.processLogInResponse(response);
            return _this.user;
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["catchError"])(function (error) { return rxjs__WEBPACK_IMPORTED_MODULE_3__["Observable"].throw(error); }));
    };
    AuthenticationService.prototype.logOut = function () {
        var _this = this;
        console.log("Logging out...");
        return this.http.get(this.urlLogOut).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (response) {
            console.log("Logout succesful!");
            _this.user = null;
            _this.role = null;
            // clear token remove user from local storage to log user out and navigates to welcome page
            _this.token = null;
            localStorage.removeItem('login');
            localStorage.removeItem('rol');
            _this.router.navigate(['']);
            return response;
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["catchError"])(function (error) { return rxjs__WEBPACK_IMPORTED_MODULE_3__["Observable"].throw(error); }));
    };
    AuthenticationService.prototype.processLogInResponse = function (response) {
        // Correctly logged in
        console.log("User is already logged");
        this.user = response.json();
        localStorage.setItem("login", "FULLTEACHING");
        if (this.user.roles.indexOf("ROLE_ADMIN") !== -1) {
            this.role = "ROLE_ADMIN";
            localStorage.setItem("rol", "ROLE_ADMIN");
        }
        if (this.user.roles.indexOf("ROLE_TEACHER") !== -1) {
            this.role = "ROLE_TEACHER";
            localStorage.setItem("rol", "ROLE_TEACHER");
        }
        if (this.user.roles.indexOf("ROLE_STUDENT") !== -1) {
            this.role = "ROLE_STUDENT";
            localStorage.setItem("rol", "ROLE_STUDENT");
        }
    };
    AuthenticationService.prototype.reqIsLogged = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            console.log("Checking if user is logged");
            var headers = new _angular_http__WEBPACK_IMPORTED_MODULE_1__["Headers"]({
                'X-Requested-With': 'XMLHttpRequest'
            });
            var options = new _angular_http__WEBPACK_IMPORTED_MODULE_1__["RequestOptions"]({ headers: headers });
            _this.http.get(_this.urlLogIn, options).subscribe(function (response) { _this.processLogInResponse(response); resolve(); }, function (error) {
                var msg = '';
                if (error.status != 401) {
                    msg = "Error when asking if logged: " + JSON.stringify(error);
                    console.error(msg);
                    _this.logOut();
                }
                else {
                    msg = "User is not logged in";
                    console.warn(msg);
                    _this.router.navigate(['']);
                }
                reject(msg);
            });
        });
    };
    AuthenticationService.prototype.checkCredentials = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (!_this.isLoggedIn()) {
                _this.reqIsLogged()
                    .then(function () {
                    resolve();
                })
                    .catch(function (error) {
                    reject(error);
                });
            }
            else {
                resolve();
            }
        });
    };
    AuthenticationService.prototype.isLoggedIn = function () {
        return (!!this.user);
    };
    AuthenticationService.prototype.getCurrentUser = function () {
        return this.user;
    };
    AuthenticationService.prototype.isTeacher = function () {
        return ((this.user.roles.indexOf("ROLE_TEACHER")) !== -1) && (localStorage.getItem('rol') === "ROLE_TEACHER");
    };
    AuthenticationService.prototype.isStudent = function () {
        return ((this.user.roles.indexOf("ROLE_STUDENT")) !== -1) && (localStorage.getItem('rol') === "ROLE_STUDENT");
    };
    AuthenticationService.prototype.isAdmin = function () {
        return ((this.user.roles.indexOf("ROLE_ADMIN")) !== -1) && (localStorage.getItem('rol') === "ROLE_ADMIN");
    };
    AuthenticationService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_angular_http__WEBPACK_IMPORTED_MODULE_1__["Http"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"]])
    ], AuthenticationService);
    return AuthenticationService;
}());

function utf8_to_b64(str) {
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function (match, p1) {
        return String.fromCharCode('0x' + p1);
    }));
}


/***/ }),

/***/ "./src/app/services/course-details-modal-data.service.ts":
/*!***************************************************************!*\
  !*** ./src/app/services/course-details-modal-data.service.ts ***!
  \***************************************************************/
/*! exports provided: CourseDetailsModalDataService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CourseDetailsModalDataService", function() { return CourseDetailsModalDataService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var CourseDetailsModalDataService = /** @class */ (function () {
    function CourseDetailsModalDataService() {
        this.postModeAnnounced$ = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
        this.putdeleteModeAnnounced$ = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
    }
    CourseDetailsModalDataService.prototype.announcePostMode = function (objs) {
        this.postModeAnnounced$.next(objs);
    };
    CourseDetailsModalDataService.prototype.announcePutdeleteMode = function (objs) {
        this.putdeleteModeAnnounced$.next(objs);
    };
    CourseDetailsModalDataService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [])
    ], CourseDetailsModalDataService);
    return CourseDetailsModalDataService;
}());



/***/ }),

/***/ "./src/app/services/course.service.ts":
/*!********************************************!*\
  !*** ./src/app/services/course.service.ts ***!
  \********************************************/
/*! exports provided: CourseService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CourseService", function() { return CourseService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/http */ "./node_modules/@angular/http/fesm5/http.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _authentication_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./authentication.service */ "./src/app/services/authentication.service.ts");
/* harmony import */ var rxjs_Rx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/Rx */ "./node_modules/rxjs-compat/_esm5/Rx.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var CourseService = /** @class */ (function () {
    function CourseService(http, authenticationService) {
        this.http = http;
        this.authenticationService = authenticationService;
        this.url = '/api-courses';
    }
    CourseService.prototype.getCourses = function (user) {
        var _this = this;
        console.log("GET courses for user " + user.nickName);
        var headers = new _angular_http__WEBPACK_IMPORTED_MODULE_1__["Headers"]({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.authenticationService.token });
        var options = new _angular_http__WEBPACK_IMPORTED_MODULE_1__["RequestOptions"]({ headers: headers });
        return this.http.get(this.url + "/user/" + user.id, options) //Must send userId
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (response) {
            console.log("GET courses SUCCESS. Response: ", response.json());
            return response.json();
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(function (error) { return _this.handleError("GET courses FAIL. Response: ", error); }));
    };
    CourseService.prototype.getCourse = function (courseId) {
        var _this = this;
        console.log("GET course " + courseId);
        var headers = new _angular_http__WEBPACK_IMPORTED_MODULE_1__["Headers"]({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.authenticationService.token });
        var options = new _angular_http__WEBPACK_IMPORTED_MODULE_1__["RequestOptions"]({ headers: headers });
        return this.http.get(this.url + "/course/" + courseId, options) //Must send userId
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (response) {
            console.log("GET course SUCCESS. Response: ", response.json());
            return response.json();
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(function (error) { return _this.handleError("GET course FAIL. Response: ", error); }));
    };
    //POST new course. On success returns the created course
    CourseService.prototype.newCourse = function (course) {
        var _this = this;
        console.log("POST new course");
        var body = JSON.stringify(course);
        var headers = new _angular_http__WEBPACK_IMPORTED_MODULE_1__["Headers"]({
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
        });
        var options = new _angular_http__WEBPACK_IMPORTED_MODULE_1__["RequestOptions"]({ headers: headers });
        return this.http.post(this.url + "/new", body, options)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (response) {
            console.log("POST new course SUCCESS. Response: ", response.json());
            return response.json();
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(function (error) { return _this.handleError("POST new course FAIL. Response: ", error); }));
    };
    //PUT existing course. On success returns the updated course
    CourseService.prototype.editCourse = function (course, context) {
        var _this = this;
        console.log("PUT existing course " + course.id + " (" + context + ")");
        var body = JSON.stringify(course);
        var headers = new _angular_http__WEBPACK_IMPORTED_MODULE_1__["Headers"]({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.authenticationService.token });
        var options = new _angular_http__WEBPACK_IMPORTED_MODULE_1__["RequestOptions"]({ headers: headers });
        return this.http.put(this.url + "/edit", body, options)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (response) {
            console.log("PUT existing course SUCCESS (" + context + "). Response: ", response.json());
            return response.json();
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(function (error) { return _this.handleError("PUT existing course FAIL (" + context + "). Response: ", error); }));
    };
    //DELETE existing course. On success returns the deleted course (simplified version)
    CourseService.prototype.deleteCourse = function (courseId) {
        var _this = this;
        console.log("DELETE course " + courseId);
        var headers = new _angular_http__WEBPACK_IMPORTED_MODULE_1__["Headers"]({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.authenticationService.token });
        var options = new _angular_http__WEBPACK_IMPORTED_MODULE_1__["RequestOptions"]({ headers: headers });
        return this.http.delete(this.url + "/delete/" + courseId, options)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (response) {
            console.log("DELETE course SUCCESS");
            return response.json();
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(function (error) { return _this.handleError("DELETE course FAIL. Response: ", error); }));
    };
    //PUT existing course, modifying its attenders (adding them). On success returns the updated course.attenders array
    CourseService.prototype.addCourseAttenders = function (courseId, userEmails) {
        var _this = this;
        console.log("PUT exsiting course (add attenders)");
        var body = JSON.stringify(userEmails);
        var headers = new _angular_http__WEBPACK_IMPORTED_MODULE_1__["Headers"]({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.authenticationService.token });
        var options = new _angular_http__WEBPACK_IMPORTED_MODULE_1__["RequestOptions"]({ headers: headers });
        return this.http.put(this.url + "/edit/add-attenders/course/" + courseId, body, options)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (response) {
            console.log("PUT exsiting course SUCCESS (add attenders). Response: ", response.json());
            return (response.json());
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(function (error) { return _this.handleError("PUT existing course FAIL (add attenders). Response: ", error); }));
    };
    //PUT existing course, modifying its attenders (deleting them). On success returns the updated course.attenders array
    CourseService.prototype.deleteCourseAttenders = function (course) {
        var _this = this;
        console.log("PUT exsiting course (remove attender)");
        var body = JSON.stringify(course);
        var headers = new _angular_http__WEBPACK_IMPORTED_MODULE_1__["Headers"]({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.authenticationService.token });
        var options = new _angular_http__WEBPACK_IMPORTED_MODULE_1__["RequestOptions"]({ headers: headers });
        return this.http.put(this.url + "/edit/delete-attenders", body, options)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (response) {
            console.log("PUT existing course SUCCESS (remove attender). Response: ", response.json());
            return response.json();
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(function (error) { return _this.handleError("PUT existing course FAIL (remove attender). Response: ", error); }));
    };
    CourseService.prototype.handleError = function (message, error) {
        console.error(message, error);
        return rxjs__WEBPACK_IMPORTED_MODULE_2__["Observable"].throw("Server error (" + error.status + "): " + error.text());
    };
    CourseService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_angular_http__WEBPACK_IMPORTED_MODULE_1__["Http"], _authentication_service__WEBPACK_IMPORTED_MODULE_4__["AuthenticationService"]])
    ], CourseService);
    return CourseService;
}());



/***/ }),

/***/ "./src/app/services/file.service.ts":
/*!******************************************!*\
  !*** ./src/app/services/file.service.ts ***!
  \******************************************/
/*! exports provided: FileService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FileService", function() { return FileService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/http */ "./node_modules/@angular/http/fesm5/http.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var file_saver__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! file-saver */ "./node_modules/file-saver/FileSaver.js");
/* harmony import */ var file_saver__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(file_saver__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _authentication_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./authentication.service */ "./src/app/services/authentication.service.ts");
/* harmony import */ var rxjs_Rx__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs/Rx */ "./node_modules/rxjs-compat/_esm5/Rx.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var FileService = /** @class */ (function () {
    function FileService(http, authenticationService) {
        this.http = http;
        this.authenticationService = authenticationService;
        this.url = "/api-files";
        this.pendingDownload = false;
    }
    //POST new FileGroup. Requires the FileGroup and the courseDetails id that owns it
    //On success returns the entire updated CourseDetails
    FileService.prototype.newFileGroup = function (fileGroup, courseDetailsId) {
        var _this = this;
        console.log("POST new filegroup");
        var body = JSON.stringify(fileGroup);
        var headers = new _angular_http__WEBPACK_IMPORTED_MODULE_1__["Headers"]({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.authenticationService.token });
        var options = new _angular_http__WEBPACK_IMPORTED_MODULE_1__["RequestOptions"]({ headers: headers });
        return this.http.post(this.url + "/" + courseDetailsId, body, options)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (response) {
            console.log("POST new filegroup SUCCESS. Response: ", response.json());
            return response.json();
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(function (error) { return _this.handleError("POST new filegroup FAIL. Response: ", error); }));
    };
    //DELETE existing FileGroup. Requires the fileGroup id and its course's id
    //On succes returns the deleted FileGroup
    FileService.prototype.deleteFileGroup = function (fileGroupId, courseId) {
        var _this = this;
        console.log("DELETE filegroup " + fileGroupId);
        var headers = new _angular_http__WEBPACK_IMPORTED_MODULE_1__["Headers"]({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.authenticationService.token });
        var options = new _angular_http__WEBPACK_IMPORTED_MODULE_1__["RequestOptions"]({ headers: headers });
        return this.http.delete(this.url + "/delete/file-group/" + fileGroupId + "/course/" + courseId, options)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (response) {
            console.log("DELETE filegroup SUCCESS");
            return response.json();
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(function (error) { return _this.handleError("DELETE filegroup FAIL. Response: ", error); }));
    };
    //DELETE existing File. Requires the file id, the fileGroup id that owns it and their course's id
    //On succes returns the deleted File
    FileService.prototype.deleteFile = function (fileId, fileGroupId, courseId) {
        var _this = this;
        console.log("DELETE file " + fileId);
        var headers = new _angular_http__WEBPACK_IMPORTED_MODULE_1__["Headers"]({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.authenticationService.token });
        var options = new _angular_http__WEBPACK_IMPORTED_MODULE_1__["RequestOptions"]({ headers: headers });
        return this.http.delete(this.url + "/delete/file/" + fileId + "/file-group/" + fileGroupId + "/course/" + courseId, options)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (response) {
            console.log("DELETE file SUCCESS");
            return response.json();
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(function (error) { return _this.handleError("DELETE file FAIL. Response: ", error); }));
    };
    //PUT existing FileGroup. Requires the modified FileGroup and the course id
    //On success returns the updated root FileGroup
    FileService.prototype.editFileGroup = function (fileGroup, courseId) {
        var _this = this;
        console.log("PUT existing filegroup " + fileGroup.id);
        var body = JSON.stringify(fileGroup);
        var headers = new _angular_http__WEBPACK_IMPORTED_MODULE_1__["Headers"]({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.authenticationService.token });
        var options = new _angular_http__WEBPACK_IMPORTED_MODULE_1__["RequestOptions"]({ headers: headers });
        return this.http.put(this.url + "/edit/file-group/course/" + courseId, body, options)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (response) {
            console.log("PUT existing filegroup SUCCESS. Response: ", response.json());
            return response.json();
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(function (error) { return _this.handleError("PUT existing filegroup FAIL. Response: ", error); }));
    };
    //PUT 2 FileGroups. Requires the id of the file moved, the ids of the source and the target FileGroups, the id of the Course and the position of the file in the target FileGroup
    //On success returns the all the fileGroups of the course
    FileService.prototype.editFileOrder = function (fileMovedId, fileGroupSourceId, fileGroupTargetId, filePosition, courseId) {
        var _this = this;
        console.log("PUT existing filegroups (editing file order). From " + fileGroupSourceId + " to " + fileGroupTargetId + " into position " + fileGroupTargetId);
        var headers = new _angular_http__WEBPACK_IMPORTED_MODULE_1__["Headers"]({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.authenticationService.token });
        var options = new _angular_http__WEBPACK_IMPORTED_MODULE_1__["RequestOptions"]({ headers: headers });
        return this.http.put(this.url + "/edit/file-order/course/" + courseId + "/file/" + fileMovedId + "/from/" + fileGroupSourceId + "/to/" + fileGroupTargetId + "/pos/" + filePosition, options)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (response) {
            console.log("PUT existing filegroups SUCCESS (edit file order). Response: ", response.json());
            return response.json();
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(function (error) { return _this.handleError("PUT existing filegroups FAIL (edit file order). Response: ", error); }));
    };
    //PUT existing File. Requires the modified File and the course id
    //On success returns the updated root FileGroup
    FileService.prototype.editFile = function (file, fileGroupId, courseId) {
        var _this = this;
        console.log("PUT existing file " + file.name);
        var body = JSON.stringify(file);
        var headers = new _angular_http__WEBPACK_IMPORTED_MODULE_1__["Headers"]({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.authenticationService.token });
        var options = new _angular_http__WEBPACK_IMPORTED_MODULE_1__["RequestOptions"]({ headers: headers });
        return this.http.put(this.url + "/edit/file/file-group/" + fileGroupId + "/course/" + courseId, body, options)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (response) {
            console.log("PUT existing file SUCCESS. Response: ", response.json());
            return response.json();
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(function (error) { return _this.handleError("PUT existing filegroup FAIL. Response: ", error); }));
    };
    FileService.prototype.downloadFile = function (courseId, file) {
        console.log("Downloading file " + file.name);
        // Xhr creates new context so we need to create reference to this
        var self = this;
        // Status flag used in the template.
        this.pendingDownload = true;
        // Create the Xhr request object
        var xhr = new XMLHttpRequest();
        var url = "/api-load-files/course/" + courseId + "/download/" + file.id;
        xhr.open('GET', url, true);
        xhr.responseType = 'blob';
        // Xhr callback when we get a result back
        // We are not using arrow function because we need the 'this' context
        xhr.onreadystatechange = function () {
            // We use setTimeout to trigger change detection in Zones
            setTimeout(function () { self.pendingDownload = false; }, 0);
            // If we get an HTTP status OK (200), save the file using fileSaver
            if (xhr.readyState === 4 && xhr.status === 200) {
                console.log("File download SUCCESS. Response: ", this.response);
                var blob = new Blob([this.response], { type: this.response.type });
                file_saver__WEBPACK_IMPORTED_MODULE_4__["saveAs"](blob, file.name);
            }
        };
        // Start the Ajax request
        xhr.send();
    };
    FileService.prototype.openFile = function (response) {
        var blob = new Blob([response._body], { type: 'text/plain' });
        var url = window.URL.createObjectURL(blob);
        window.open(url);
    };
    FileService.prototype.handleError = function (message, error) {
        console.error(message, error);
        return rxjs__WEBPACK_IMPORTED_MODULE_2__["Observable"].throw("Server error (" + error.status + "): " + error.text());
    };
    FileService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_angular_http__WEBPACK_IMPORTED_MODULE_1__["Http"], _authentication_service__WEBPACK_IMPORTED_MODULE_5__["AuthenticationService"]])
    ], FileService);
    return FileService;
}());



/***/ }),

/***/ "./src/app/services/files-edition.service.ts":
/*!***************************************************!*\
  !*** ./src/app/services/files-edition.service.ts ***!
  \***************************************************/
/*! exports provided: FilesEditionService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FilesEditionService", function() { return FilesEditionService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var FilesEditionService = /** @class */ (function () {
    function FilesEditionService() {
        this.currentModeEdit = false;
        this.modeEditAnnounced$ = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
        this.fileGroupDeletedAnnounced$ = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
        this.fileFilegroupUpdatedAnnounced$ = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
    }
    FilesEditionService.prototype.announceModeEdit = function (objs) {
        this.currentModeEdit = objs;
        this.modeEditAnnounced$.next(objs);
    };
    FilesEditionService.prototype.announceFileGroupDeleted = function (fileGroupDeletedId) {
        this.fileGroupDeletedAnnounced$.next(fileGroupDeletedId);
    };
    FilesEditionService.prototype.announceFileFilegroupUpdated = function (objs) {
        this.fileFilegroupUpdatedAnnounced$.next(objs);
    };
    FilesEditionService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [])
    ], FilesEditionService);
    return FilesEditionService;
}());



/***/ }),

/***/ "./src/app/services/forum.service.ts":
/*!*******************************************!*\
  !*** ./src/app/services/forum.service.ts ***!
  \*******************************************/
/*! exports provided: ForumService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ForumService", function() { return ForumService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/http */ "./node_modules/@angular/http/fesm5/http.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _authentication_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./authentication.service */ "./src/app/services/authentication.service.ts");
/* harmony import */ var rxjs_Rx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/Rx */ "./node_modules/rxjs-compat/_esm5/Rx.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var ForumService = /** @class */ (function () {
    function ForumService(http, authenticationService) {
        this.http = http;
        this.authenticationService = authenticationService;
        this.urlNewEntry = "/api-entries";
        this.urlNewComment = "/api-comments";
        this.urlEditForum = "/api-forum";
    }
    //POST new Entry. Requires an Entry and the id of the CourseDetails that owns the Forum
    //On success returns the updated Forum that owns the posted entry
    ForumService.prototype.newEntry = function (entry, courseDetailsId) {
        var _this = this;
        console.log("POST new entry");
        var body = JSON.stringify(entry);
        var headers = new _angular_http__WEBPACK_IMPORTED_MODULE_1__["Headers"]({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.authenticationService.token });
        var options = new _angular_http__WEBPACK_IMPORTED_MODULE_1__["RequestOptions"]({ headers: headers });
        return this.http.post(this.urlNewEntry + "/forum/" + courseDetailsId, body, options)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (response) {
            console.log("POST new entry SUCCESS. Response: ", (response.json()));
            return (response.json());
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(function (error) { return _this.handleError("POST new entry FAIL. Response: ", error); }));
    };
    //POST new Comment. Requires a Comment, the id of the Entry that owns it and the id of the CourseDetails that owns the Forum
    //On success returns the update Entry that owns the posted comment
    ForumService.prototype.newComment = function (comment, entryId, courseDetailsId) {
        var _this = this;
        console.log("POST new comment");
        var body = JSON.stringify(comment);
        var headers = new _angular_http__WEBPACK_IMPORTED_MODULE_1__["Headers"]({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.authenticationService.token });
        var options = new _angular_http__WEBPACK_IMPORTED_MODULE_1__["RequestOptions"]({ headers: headers });
        return this.http.post(this.urlNewComment + "/entry/" + entryId + "/forum/" + courseDetailsId, body, options)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (response) {
            console.log("POST new comment SUCCESS. Response: ", (response.json()));
            return (response.json());
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(function (error) { return _this.handleError("POST new comment FAIL. Response: ", error); }));
    };
    //PUT existing Forum. Requires a boolean value for activating/deactivating the Forum and the id of the CourseDetails that owns it
    //On success returns the updated 'activated' attribute
    ForumService.prototype.editForum = function (activated, courseDetailsId) {
        var _this = this;
        console.log("PUT existing forum " + (activated ? "(activate)" : "(deactivate)"));
        var body = JSON.stringify(activated);
        var headers = new _angular_http__WEBPACK_IMPORTED_MODULE_1__["Headers"]({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.authenticationService.token });
        var options = new _angular_http__WEBPACK_IMPORTED_MODULE_1__["RequestOptions"]({ headers: headers });
        return this.http.put(this.urlEditForum + "/edit/" + courseDetailsId, body, options)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (response) {
            console.log("PUT existing forum SUCCESS. Response: ", response.json());
            return response.json();
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(function (error) { return _this.handleError("PUT existing forum FAIL. Response: ", error); }));
    };
    ForumService.prototype.handleError = function (message, error) {
        console.error(message, error);
        return rxjs__WEBPACK_IMPORTED_MODULE_2__["Observable"].throw("Server error (" + error.status + "): " + error.text());
    };
    ForumService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_angular_http__WEBPACK_IMPORTED_MODULE_1__["Http"], _authentication_service__WEBPACK_IMPORTED_MODULE_4__["AuthenticationService"]])
    ], ForumService);
    return ForumService;
}());



/***/ }),

/***/ "./src/app/services/login-modal.service.ts":
/*!*************************************************!*\
  !*** ./src/app/services/login-modal.service.ts ***!
  \*************************************************/
/*! exports provided: LoginModalService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginModalService", function() { return LoginModalService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var LoginModalService = /** @class */ (function () {
    function LoginModalService() {
        this.wat$ = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
    }
    LoginModalService.prototype.activateLoginView = function (b) {
        this.wat$.next(b);
    };
    LoginModalService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [])
    ], LoginModalService);
    return LoginModalService;
}());



/***/ }),

/***/ "./src/app/services/session.service.ts":
/*!*********************************************!*\
  !*** ./src/app/services/session.service.ts ***!
  \*********************************************/
/*! exports provided: SessionService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SessionService", function() { return SessionService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/http */ "./node_modules/@angular/http/fesm5/http.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _authentication_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./authentication.service */ "./src/app/services/authentication.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var SessionService = /** @class */ (function () {
    function SessionService(http, authenticationService) {
        this.http = http;
        this.authenticationService = authenticationService;
        this.urlSessions = '/api-sessions';
    }
    //POST new session. On success returns the updated Course that owns the posted session
    SessionService.prototype.newSession = function (session, courseId) {
        var _this = this;
        console.log("POST new session");
        var body = JSON.stringify(session);
        var headers = new _angular_http__WEBPACK_IMPORTED_MODULE_1__["Headers"]({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.authenticationService.token });
        var options = new _angular_http__WEBPACK_IMPORTED_MODULE_1__["RequestOptions"]({ headers: headers });
        return this.http.post(this.urlSessions + "/course/" + courseId, body, options)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (response) {
            console.log("POST new session SUCCESS. Response: ", response.json());
            return response.json();
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(function (error) { return _this.handleError("POST new session FAIL. Response: ", error); }));
    };
    //PUT existing session. On success returns the updated session
    SessionService.prototype.editSession = function (session) {
        var _this = this;
        console.log("PUT existing session");
        var body = JSON.stringify(session);
        var headers = new _angular_http__WEBPACK_IMPORTED_MODULE_1__["Headers"]({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.authenticationService.token });
        var options = new _angular_http__WEBPACK_IMPORTED_MODULE_1__["RequestOptions"]({ headers: headers });
        return this.http.put(this.urlSessions + "/edit", body, options)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (response) {
            console.log("PUT existing session SUCCESS. Response: ", response.json());
            return response.json();
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(function (error) { return _this.handleError("PUT existing session FAIL. Response: ", error); }));
    };
    //DELETE existing session. On success returns the deleted session
    SessionService.prototype.deleteSession = function (sessionId) {
        var _this = this;
        console.log("DELETE session");
        var headers = new _angular_http__WEBPACK_IMPORTED_MODULE_1__["Headers"]({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.authenticationService.token });
        var options = new _angular_http__WEBPACK_IMPORTED_MODULE_1__["RequestOptions"]({ headers: headers });
        return this.http.delete(this.urlSessions + "/delete/" + sessionId, options)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (response) {
            console.log("DELETE session SUCCESS. Response: ", response.json());
            return response.json();
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(function (error) { return _this.handleError("DELETE session FAIL. Response: ", error); }));
    };
    SessionService.prototype.handleError = function (message, error) {
        console.error(message, error);
        return rxjs__WEBPACK_IMPORTED_MODULE_2__["Observable"].throw("Server error (" + error.status + "): " + error.text());
    };
    SessionService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_angular_http__WEBPACK_IMPORTED_MODULE_1__["Http"], _authentication_service__WEBPACK_IMPORTED_MODULE_4__["AuthenticationService"]])
    ], SessionService);
    return SessionService;
}());



/***/ }),

/***/ "./src/app/services/uploader-modal.service.ts":
/*!****************************************************!*\
  !*** ./src/app/services/uploader-modal.service.ts ***!
  \****************************************************/
/*! exports provided: UploaderModalService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UploaderModalService", function() { return UploaderModalService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var UploaderModalService = /** @class */ (function () {
    function UploaderModalService() {
        this.uploaderClosedAnnounced$ = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
    }
    UploaderModalService.prototype.announceUploaderClosed = function (objs) {
        this.uploaderClosedAnnounced$.next(objs);
    };
    UploaderModalService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [])
    ], UploaderModalService);
    return UploaderModalService;
}());



/***/ }),

/***/ "./src/app/services/user.service.ts":
/*!******************************************!*\
  !*** ./src/app/services/user.service.ts ***!
  \******************************************/
/*! exports provided: UserService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserService", function() { return UserService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/http */ "./node_modules/@angular/http/fesm5/http.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var UserService = /** @class */ (function () {
    function UserService(http) {
        this.http = http;
        this.url = '/api-users';
    }
    UserService.prototype.newUser = function (name, pass, nickName, captchaToken) {
        var _this = this;
        console.log("POST new user " + name);
        var body = JSON.stringify([name, pass, nickName, captchaToken]);
        var headers = new _angular_http__WEBPACK_IMPORTED_MODULE_1__["Headers"]({
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
        });
        var options = new _angular_http__WEBPACK_IMPORTED_MODULE_1__["RequestOptions"]({ headers: headers });
        return this.http.post(this.url + "/new", body, options)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (response) {
            console.log("POST new user SUCCESS. Response: ", response.json());
            return response.json();
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(function (error) { return _this.handleError("POST new user FAIL. Response: ", error); }));
    };
    UserService.prototype.changePassword = function (oldPassword, newPassword) {
        var _this = this;
        console.log("PUT existing user (change password)");
        var body = JSON.stringify([oldPassword, newPassword]);
        var headers = new _angular_http__WEBPACK_IMPORTED_MODULE_1__["Headers"]({
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
        });
        var options = new _angular_http__WEBPACK_IMPORTED_MODULE_1__["RequestOptions"]({ headers: headers });
        return this.http.put(this.url + "/changePassword", body, options)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (response) {
            console.log("PUT existing user SUCCESS (change password). Response: ", response.json());
            return response.json();
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(function (error) { return _this.handleError("PUT existing user FAIL (change password). Response: ", error); }));
    };
    // private helper methods
    UserService.prototype.jwt = function () {
        // create authorization header with jwt token
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            var headers = new _angular_http__WEBPACK_IMPORTED_MODULE_1__["Headers"]({ 'Authorization': 'Bearer ' + currentUser.token });
            return new _angular_http__WEBPACK_IMPORTED_MODULE_1__["RequestOptions"]({ headers: headers });
        }
    };
    UserService.prototype.handleError = function (message, error) {
        console.error(message, error);
        return rxjs__WEBPACK_IMPORTED_MODULE_2__["Observable"].throw("Server error (" + error.status + "): " + error.text());
    };
    UserService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_angular_http__WEBPACK_IMPORTED_MODULE_1__["Http"]])
    ], UserService);
    return UserService;
}());



/***/ }),

/***/ "./src/app/services/video-session.service.ts":
/*!***************************************************!*\
  !*** ./src/app/services/video-session.service.ts ***!
  \***************************************************/
/*! exports provided: VideoSessionService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VideoSessionService", function() { return VideoSessionService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/http */ "./node_modules/@angular/http/fesm5/http.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var VideoSessionService = /** @class */ (function () {
    function VideoSessionService(http) {
        this.http = http;
        this.urlSessions = '/api-video-sessions';
    }
    VideoSessionService.prototype.getSessionIdAndToken = function (mySessionId) {
        var _this = this;
        console.log("Getting OpenVidu sessionId and token for lesson '" + mySessionId + "'");
        return this.http.get(this.urlSessions + "/get-sessionid-token/" + mySessionId)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (response) {
            console.log("OpenVidu sessionId and token retrieval SUCCESS. Response: ", response);
            return (response.json());
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(function (error) { return _this.handleError("ERROR getting OpenVidu sessionId and token: ", error); }));
    };
    VideoSessionService.prototype.removeUser = function (sessionName) {
        var _this = this;
        console.log("Removing user from session " + sessionName);
        var jsonBody = JSON.stringify({
            'lessonId': sessionName
        });
        var headers = new _angular_http__WEBPACK_IMPORTED_MODULE_1__["Headers"]({ 'Content-Type': 'application/json' });
        var options = new _angular_http__WEBPACK_IMPORTED_MODULE_1__["RequestOptions"]({ headers: headers });
        return this.http.post(this.urlSessions + "/remove-user", jsonBody, options)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (response) {
            console.log("User removed from session succesfully. Response: ", response.text());
            return (response.text());
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(function (error) { return _this.handleError("ERROR removing user from session: ", error); }));
    };
    VideoSessionService.prototype.handleError = function (message, error) {
        console.error(message, error);
        return rxjs__WEBPACK_IMPORTED_MODULE_2__["Observable"].throw("Server error (" + error.status + "): " + error.text());
    };
    VideoSessionService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_angular_http__WEBPACK_IMPORTED_MODULE_1__["Http"]])
    ], VideoSessionService);
    return VideoSessionService;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.
var environment = {
    production: false,
    URL_UPLOAD: '/api-load-files/upload/course/',
    URL_PIC_UPLOAD: '/api-load-files/upload/picture/',
    URL_EMAIL_FILE_UPLOAD: '/api-file-reader/upload/course/',
    PUBLIC_RECAPTCHA_KEY: '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI',
    OPENVIDU_URL: 'wss://localhost:4443/'
};


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _polyfills_ts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./polyfills.ts */ "./src/polyfills.ts");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _app___WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./app/ */ "./src/app/index.ts");





if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app___WEBPACK_IMPORTED_MODULE_4__["AppModule"]);


/***/ }),

/***/ "./src/polyfills.ts":
/*!**************************!*\
  !*** ./src/polyfills.ts ***!
  \**************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_es6_symbol__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/es6/symbol */ "./node_modules/core-js/es6/symbol.js");
/* harmony import */ var core_js_es6_symbol__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_es6_symbol__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_es6_object__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/es6/object */ "./node_modules/core-js/es6/object.js");
/* harmony import */ var core_js_es6_object__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_es6_object__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_es6_function__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/es6/function */ "./node_modules/core-js/es6/function.js");
/* harmony import */ var core_js_es6_function__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_es6_function__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_es6_parse_int__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/es6/parse-int */ "./node_modules/core-js/es6/parse-int.js");
/* harmony import */ var core_js_es6_parse_int__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_es6_parse_int__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_es6_parse_float__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/es6/parse-float */ "./node_modules/core-js/es6/parse-float.js");
/* harmony import */ var core_js_es6_parse_float__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_es6_parse_float__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_es6_number__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/es6/number */ "./node_modules/core-js/es6/number.js");
/* harmony import */ var core_js_es6_number__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_es6_number__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_es6_math__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! core-js/es6/math */ "./node_modules/core-js/es6/math.js");
/* harmony import */ var core_js_es6_math__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_es6_math__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var core_js_es6_string__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! core-js/es6/string */ "./node_modules/core-js/es6/string.js");
/* harmony import */ var core_js_es6_string__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(core_js_es6_string__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var core_js_es6_date__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! core-js/es6/date */ "./node_modules/core-js/es6/date.js");
/* harmony import */ var core_js_es6_date__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(core_js_es6_date__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var core_js_es6_array__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! core-js/es6/array */ "./node_modules/core-js/es6/array.js");
/* harmony import */ var core_js_es6_array__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(core_js_es6_array__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var core_js_es6_regexp__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! core-js/es6/regexp */ "./node_modules/core-js/es6/regexp.js");
/* harmony import */ var core_js_es6_regexp__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(core_js_es6_regexp__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var core_js_es6_map__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! core-js/es6/map */ "./node_modules/core-js/es6/map.js");
/* harmony import */ var core_js_es6_map__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(core_js_es6_map__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var core_js_es6_set__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! core-js/es6/set */ "./node_modules/core-js/es6/set.js");
/* harmony import */ var core_js_es6_set__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(core_js_es6_set__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var core_js_es6_reflect__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! core-js/es6/reflect */ "./node_modules/core-js/es6/reflect.js");
/* harmony import */ var core_js_es6_reflect__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(core_js_es6_reflect__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var core_js_es7_reflect__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! core-js/es7/reflect */ "./node_modules/core-js/es7/reflect.js");
/* harmony import */ var core_js_es7_reflect__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(core_js_es7_reflect__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var zone_js_dist_zone__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! zone.js/dist/zone */ "./node_modules/zone.js/dist/zone.js");
/* harmony import */ var zone_js_dist_zone__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(zone_js_dist_zone__WEBPACK_IMPORTED_MODULE_15__);
// This file includes polyfills needed by Angular 2 and is loaded before
// the app. You can add your own extra polyfills to this file.
















window.global = window;


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /home/gtunon/FullTeachingWorkspace/full-teaching/application/src/main/angular/src/main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map