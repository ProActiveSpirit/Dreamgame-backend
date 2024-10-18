"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var _require = require('@prisma/client'),
  PrismaClient = _require.PrismaClient;
var _require2 = require('nintendo-switch-eshop'),
  getGamesEurope = _require2.getGamesEurope;
var prisma = new PrismaClient();

// Define the locales you want to fetch data for
var europeanCountryCodes = ['en', 'de', 'fr', 'es', 'it', 'nl', 'pt', 'ru']; // Add more as needed
function getProducts() {
  return _getProducts.apply(this, arguments);
}
function _getProducts() {
  _getProducts = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
    var allResults, _iterator, _step, countryCode, options, result, _iterator2, _step2, _game$play_mode_table, game, gameData;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          allResults = []; // Loop through each country code and fetch data
          _iterator = _createForOfIteratorHelper(europeanCountryCodes);
          _context.prev = 2;
          _iterator.s();
        case 4:
          if ((_step = _iterator.n()).done) {
            _context.next = 40;
            break;
          }
          countryCode = _step.value;
          options = {
            limit: 5,
            // Adjust the limit if needed
            locale: countryCode.toLowerCase() // Use the lowercase country code
          };
          _context.prev = 7;
          _context.next = 10;
          return getGamesEurope(options);
        case 10:
          result = _context.sent;
          _iterator2 = _createForOfIteratorHelper(result);
          _context.prev = 12;
          _iterator2.s();
        case 14:
          if ((_step2 = _iterator2.n()).done) {
            _context.next = 22;
            break;
          }
          game = _step2.value;
          gameData = {
            fs_id: game.fs_id,
            change_date: new Date(game.change_date),
            url: game.url,
            type: game.type,
            dates_released_dts: game.dates_released_dts.map(function (date) {
              return new Date(date);
            }),
            club_nintendo: game.club_nintendo,
            pretty_date_s: game.pretty_date_s,
            play_mode_tv_mode_b: game.play_mode_tv_mode_b,
            play_mode_handheld_mode_b: game.play_mode_handheld_mode_b,
            product_code_txt: game.product_code_txt,
            image_url_sq_s: game.image_url_sq_s,
            deprioritise_b: game.deprioritise_b,
            demo_availability: game.demo_availability,
            pg_s: game.pg_s,
            compatible_controller: game.compatible_controller,
            originally_for_t: game.originally_for_t,
            paid_subscription_required_b: game.paid_subscription_required_b,
            cloud_saves_b: game.cloud_saves_b,
            priority: new Date(game.priority),
            digital_version_b: game.digital_version_b,
            title_extras_txt: game.title_extras_txt,
            image_url_h2x1_s: game.image_url_h2x1_s,
            system_type: game.system_type,
            age_rating_sorting_i: game.age_rating_sorting_i,
            game_categories_txt: game.game_categories_txt,
            play_mode_tabletop_mode_b: (_game$play_mode_table = game.play_mode_tabletop_mode_b) !== null && _game$play_mode_table !== void 0 ? _game$play_mode_table : false,
            publisher: game.publisher,
            product_code_ss: game.product_code_ss,
            excerpt: game.excerpt,
            nsuid_txt: game.nsuid_txt,
            date_from: new Date(game.date_from),
            language_availability: game.language_availability,
            price_has_discount_b: game.price_has_discount_b,
            product_catalog_description_s: game.product_catalog_description_s,
            related_nsuids_txt: game.related_nsuids_txt,
            price_discount_percentage_f: game.price_discount_percentage_f,
            title: game.title,
            sorting_title: game.sorting_title,
            wishlist_email_square_image_url_s: game.wishlist_email_square_image_url_s,
            players_to: game.players_to,
            wishlist_email_banner640w_image_url_s: game.wishlist_email_banner640w_image_url_s,
            paid_subscription_online_play_b: game.paid_subscription_online_play_b,
            playable_on_txt: game.playable_on_txt,
            hits_i: game.hits_i,
            pretty_game_categories_txt: game.pretty_game_categories_txt,
            title_master_s: game.title_master_s,
            switch_game_voucher_b: game.switch_game_voucher_b,
            game_category: game.game_category,
            system_names_txt: game.system_names_txt,
            pretty_agerating_s: game.pretty_agerating_s,
            price_regular_f: game.price_regular_f,
            eshop_removed_b: game.eshop_removed_b,
            age_rating_type: game.age_rating_type,
            price_sorting_f: game.price_sorting_f,
            price_lowest_f: game.price_lowest_f,
            age_rating_value: game.age_rating_value,
            physical_version_b: game.physical_version_b,
            wishlist_email_banner460w_image_url_s: game.wishlist_email_banner460w_image_url_s,
            downloads_rank_i: game.downloads_rank_i,
            version: game._version_
          };
          console.log("sku", gameData.product_code_txt);
          //Save the game data to the database
          _context.next = 20;
          return prisma.nintendoData.create({
            data: _objectSpread(_objectSpread({}, gameData), {}, {
              version: String(gameData.version)
            })
          });
        case 20:
          _context.next = 14;
          break;
        case 22:
          _context.next = 27;
          break;
        case 24:
          _context.prev = 24;
          _context.t0 = _context["catch"](12);
          _iterator2.e(_context.t0);
        case 27:
          _context.prev = 27;
          _iterator2.f();
          return _context.finish(27);
        case 30:
          _context.next = 32;
          return prisma.nintendoData.findFirst({});
        case 32:
          allResults = _context.sent;
          _context.next = 38;
          break;
        case 35:
          _context.prev = 35;
          _context.t1 = _context["catch"](7);
          console.error("Failed to fetch data for country code ".concat(countryCode, ": ").concat(_context.t1.message));
        case 38:
          _context.next = 4;
          break;
        case 40:
          _context.next = 45;
          break;
        case 42:
          _context.prev = 42;
          _context.t2 = _context["catch"](2);
          _iterator.e(_context.t2);
        case 45:
          _context.prev = 45;
          _iterator.f();
          return _context.finish(45);
        case 48:
          return _context.abrupt("return", allResults);
        case 49:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[2, 42, 45, 48], [7, 35], [12, 24, 27, 30]]);
  }));
  return _getProducts.apply(this, arguments);
}
function clearNintendoData() {
  return _clearNintendoData.apply(this, arguments);
}
function _clearNintendoData() {
  _clearNintendoData = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
    var result;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return prisma.nintendoData.deleteMany({});
        case 3:
          result = _context2.sent;
          console.log("Deleted ".concat(result.count, " records from the NintendoData table."));
          _context2.next = 10;
          break;
        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](0);
          console.error('Error clearing NintendoData table:', _context2.t0);
        case 10:
          _context2.prev = 10;
          _context2.next = 13;
          return prisma.$disconnect();
        case 13:
          return _context2.finish(10);
        case 14:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 7, 10, 14]]);
  }));
  return _clearNintendoData.apply(this, arguments);
}
module.exports = {
  getProducts: getProducts
};

// clearNintendoData()
// Process and save each game data to the database
// for (const game of result) {
//   // Map the result to transform each game object according to your schema
//   const gameData = {
//     fs_id: game.fs_id,
//     change_date: new Date(game.change_date),
//     url: game.url,
//     type: game.type,
//     dates_released_dts: game.dates_released_dts.map(date => new Date(date)),
//     club_nintendo: game.club_nintendo,
//     pretty_date_s: game.pretty_date_s,
//     play_mode_tv_mode_b: game.play_mode_tv_mode_b,
//     play_mode_handheld_mode_b: game.play_mode_handheld_mode_b,
//     product_code_txt: game.product_code_txt,
//     image_url_sq_s: game.image_url_sq_s,
//     deprioritise_b: game.deprioritise_b,
//     demo_availability: game.demo_availability,
//     pg_s: game.pg_s,
//     compatible_controller: game.compatible_controller,
//     originally_for_t: game.originally_for_t,
//     paid_subscription_required_b: game.paid_subscription_required_b,
//     cloud_saves_b: game.cloud_saves_b,
//     priority: new Date(game.priority),
//     digital_version_b: game.digital_version_b,
//     title_extras_txt: game.title_extras_txt,
//     image_url_h2x1_s: game.image_url_h2x1_s,
//     system_type: game.system_type,
//     age_rating_sorting_i: game.age_rating_sorting_i,
//     game_categories_txt: game.game_categories_txt,
//     play_mode_tabletop_mode_b: game.play_mode_tabletop_mode_b ?? false,
//     publisher: game.publisher,
//     product_code_ss: game.product_code_ss,
//     excerpt: game.excerpt,
//     nsuid_txt: game.nsuid_txt,
//     date_from: new Date(game.date_from),
//     language_availability: game.language_availability,
//     price_has_discount_b: game.price_has_discount_b,
//     product_catalog_description_s: game.product_catalog_description_s,
//     related_nsuids_txt: game.related_nsuids_txt,
//     price_discount_percentage_f: game.price_discount_percentage_f,
//     title: game.title,
//     sorting_title: game.sorting_title,
//     wishlist_email_square_image_url_s: game.wishlist_email_square_image_url_s,
//     players_to: game.players_to,
//     wishlist_email_banner640w_image_url_s: game.wishlist_email_banner640w_image_url_s,
//     paid_subscription_online_play_b: game.paid_subscription_online_play_b,
//     playable_on_txt: game.playable_on_txt,
//     hits_i: game.hits_i,
//     pretty_game_categories_txt: game.pretty_game_categories_txt,
//     title_master_s: game.title_master_s,
//     switch_game_voucher_b: game.switch_game_voucher_b,
//     game_category: game.game_category,
//     system_names_txt: game.system_names_txt,
//     pretty_agerating_s: game.pretty_agerating_s,
//     price_regular_f: game.price_regular_f,
//     eshop_removed_b: game.eshop_removed_b,
//     age_rating_type: game.age_rating_type,
//     price_sorting_f: game.price_sorting_f,
//     price_lowest_f: game.price_lowest_f,
//     age_rating_value: game.age_rating_value,
//     physical_version_b: game.physical_version_b,
//     wishlist_email_banner460w_image_url_s: game.wishlist_email_banner460w_image_url_s,
//     downloads_rank_i: game.downloads_rank_i,
//     version: game._version_,
//   };

//   //Save the game data to the database
//   await prisma.nintendoData.create({
//     data: {
//       ...gameData,
//       version: String(gameData.version)
//     }
//   });

// }

// Map the result to transform each game object
// const transformedResult = result.map((game) => {
//   return {
//     name: game.title,
//     stock: "Stock",
//     price: game.price_regular_f,
//     provider: "Nintendo",
//     region: countryCode, // Use the current country code
//     sku: game.product_code_txt[0],
//     publisher: game.publisher,
//     status: "Active",
//     createdAt: game.pretty_date_s
//   };
// });