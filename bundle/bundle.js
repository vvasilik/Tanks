/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _app = __webpack_require__(1);

	var _app2 = _interopRequireDefault(_app);

	var _map = __webpack_require__(3);

	var _map2 = _interopRequireDefault(_map);

	var _mainTank = __webpack_require__(4);

	var _mainTank2 = _interopRequireDefault(_mainTank);

	var _tank = __webpack_require__(10);

	var _tank2 = _interopRequireDefault(_tank);

	var _moveBullet = __webpack_require__(11);

	var _moveBullet2 = _interopRequireDefault(_moveBullet);

	var _indexHelpers = __webpack_require__(15);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	__webpack_require__(17);

	init();

	function init() {
	    if ((0, _indexHelpers.isMobile)()) _app2.default.variables.body.classList.add("_mobile");

	    (0, _map2.default)({
	        width: _app2.default.variables.point * _app2.default.variables.mapWidth,
	        height: _app2.default.variables.point * _app2.default.variables.mapHeight,
	        holder: _app2.default.variables.main
	    });

	    createMainTank(_app2.default.variables.minX, _app2.default.variables.minY, _app2.default.const.right);

	    setInterval(moveBullets, _app2.default.variables.interval);

	    setInterval(function () {
	        var _getRandomCell = (0, _indexHelpers.getRandomCell)(_app2.default),
	            x = _getRandomCell.x,
	            y = _getRandomCell.y;

	        createTank(x, y, _app2.default.const.right);
	    }, _app2.default.variables.createTankInterval);

	    // ----------

	    function createTank(x, y, direction) {
	        _app2.default.tanks.push(new _tank2.default(_app2.default, x, y, direction));
	    }

	    function createMainTank(x, y, direction) {
	        _app2.default.mainTank = new _mainTank2.default(_app2.default, x, y, direction);
	    }

	    function moveBullets() {
	        _app2.default.bullets.map(function (bullet) {
	            (0, _moveBullet2.default)(_app2.default, bullet);
	        });
	    }
	}

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _isMobile = __webpack_require__(2);

	var _isMobile2 = _interopRequireDefault(_isMobile);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var App = {};
	App.tanks = [];
	App.bullets = [];
	App.bulletsIndex = 0;

	App.const = {};
	App.const.left = "_left";
	App.const.top = "_top";
	App.const.right = "_right";
	App.const.bottom = "_bottom";

	App.variables = {};
	App.variables.body = document.body;
	App.variables.point = 50;
	App.variables.interval = 100;
	App.variables.intervalBulletsCreation = 300;
	App.variables.createTankInterval = 3000;
	App.variables.bodyWidth = Math.floor(App.variables.body.offsetWidth);
	App.variables.bodyHeight = (0, _isMobile2.default)() ? Math.floor(App.variables.body.offsetHeight) - 60 : Math.floor(App.variables.body.offsetHeight);
	App.variables.mapWidth = (App.variables.bodyWidth - App.variables.bodyWidth % App.variables.point) / App.variables.point;
	App.variables.mapHeight = (App.variables.bodyHeight - App.variables.bodyHeight % App.variables.point) / App.variables.point;
	App.variables.main = document.querySelector(".js-main");
	App.variables.minX = 0;
	App.variables.minY = 0;
	App.variables.maxX = App.variables.mapWidth - 1;
	App.variables.maxY = App.variables.mapHeight - 1;

	exports.default = App;

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = isMobile;
	function isMobile() {
	    return 'ontouchstart' in window;
	}

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = initMap;
	function initMap(options) {
	    var width = options.width,
	        height = options.height;

	    var map = document.createElement("div");
	    map.className = "map";
	    map.style.width = width + "px";
	    map.style.height = height + "px";

	    options.holder.appendChild(map);
	}

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = MainTank;

	var _moveMainTank = __webpack_require__(5);

	var _moveMainTank2 = _interopRequireDefault(_moveMainTank);

	var _controls = __webpack_require__(6);

	var _controls2 = _interopRequireDefault(_controls);

	var _createBullet = __webpack_require__(7);

	var _createBullet2 = _interopRequireDefault(_createBullet);

	var _isMobile = __webpack_require__(2);

	var _isMobile2 = _interopRequireDefault(_isMobile);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function MainTank(App, x, y) {
	    var _this = this;

	    var direction = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : App.const.top;

	    var isPressedSpace = false;

	    this.x = x;
	    this.y = y;
	    this.direction = direction;

	    var avatar = document.createElement("div");
	    avatar.className = "main-tank " + direction;
	    avatar.style.left = x * App.variables.point + "px";
	    avatar.style.top = y * App.variables.point + "px";
	    avatar.style.width = App.variables.point + "px";
	    avatar.style.height = App.variables.point + "px";
	    App.variables.main.appendChild(avatar);

	    this.avatar = avatar;

	    App.variables.body.addEventListener("keydown", function (e) {

	        var code = e.keyCode;

	        switch (code) {
	            case 40:
	                _this.direction = App.const.bottom;
	                break;

	            case 38:
	                _this.direction = App.const.top;
	                break;

	            case 39:
	                _this.direction = App.const.right;
	                break;

	            case 37:
	                _this.direction = App.const.left;
	                break;

	            case 32:
	                if (!isPressedSpace) {
	                    isPressedSpace = true;

	                    setTimeout(function () {
	                        isPressedSpace = false;
	                    }, App.variables.intervalBulletsCreation);

	                    (0, _createBullet2.default)(App, _this.x, _this.y, _this.direction);
	                }
	                return;
	        }

	        (0, _moveMainTank2.default)(App, _this);
	    });

	    if ((0, _isMobile2.default)()) (0, _controls2.default)(App, this, _moveMainTank2.default, _createBullet2.default);
	}

/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = moveMainTank;
	function moveMainTank(App, item) {
	    switch (item.direction) {
	        case App.const.bottom:
	            if (item.y + 1 < App.variables.mapHeight) item.y += 1;
	            break;

	        case App.const.top:
	            if (item.y - 1 >= 0) item.y -= 1;
	            break;

	        case App.const.right:
	            if (item.x + 1 < App.variables.mapWidth) item.x += 1;
	            break;

	        case App.const.left:
	            if (item.x - 1 >= 0) item.x -= 1;
	            break;

	        default:
	            console.log("move tank error");
	    }

	    item.avatar.style.left = item.x * App.variables.point + "px";
	    item.avatar.style.top = item.y * App.variables.point + "px";
	    item.avatar.classList.remove("_left", "_top", "_right", "_bottom");
	    item.avatar.classList.add(item.direction);
	}

/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = initControls;
	function initControls(App, item, moveMainTank, createBullet) {
	    var btnLeft = document.querySelector(".js-controls__left");
	    var btnRight = document.querySelector(".js-controls__right");
	    var btnTop = document.querySelector(".js-controls__top");
	    var btnBottom = document.querySelector(".js-controls__bottom");
	    var shoot = document.querySelector(".js-controls__shoot");

	    initListeners();

	    // -------

	    function initListeners() {
	        btnLeft.addEventListener("click", function () {
	            item.direction = App.const.left;
	            moveMainTank(App, item);
	        });

	        btnRight.addEventListener("click", function () {
	            item.direction = App.const.right;
	            moveMainTank(App, item);
	        });

	        btnTop.addEventListener("click", function () {
	            item.direction = App.const.top;
	            moveMainTank(App, item);
	        });

	        btnBottom.addEventListener("click", function () {
	            item.direction = App.const.bottom;
	            moveMainTank(App, item);
	        });

	        shoot.addEventListener("click", function () {
	            createBullet(App, item.x, item.y, item.direction);
	        });
	    }
	}

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = createBullet;

	var _isEmptyCell = __webpack_require__(8);

	var _isEmptyCell2 = _interopRequireDefault(_isEmptyCell);

	var _Bullet = __webpack_require__(9);

	var _Bullet2 = _interopRequireDefault(_Bullet);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function createBullet(App, x, y, direction) {
	    var cellInfo = (0, _isEmptyCell2.default)(App, x, y);

	    if (cellInfo.isEmpty) {
	        App.bullets.push(new _Bullet2.default(App, x, y, direction));
	    }
	}

/***/ },
/* 8 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = isEmptyCell;
	function isEmptyCell(App, x, y, index) {
	    var res = {
	        x: x,
	        y: y,
	        isEmpty: true
	    };

	    App.tanks.map(function (tank) {
	        if (tank.x === x && tank.y === y && tank.avatar.dataset.index !== index) {
	            res = {
	                x: x,
	                y: y,
	                category: "tanks",
	                item: tank,
	                isEmpty: false
	            };
	        }
	    });

	    App.bullets.map(function (bullet) {
	        if (bullet.x === x && bullet.y === y && bullet.avatar.dataset.index !== index) {
	            res = {
	                x: x,
	                y: y,
	                category: "bullets",
	                item: bullet,
	                isEmpty: false
	            };
	        }
	    });

	    if (App.mainTank.avatar.x === x && App.mainTank.avatar.y === y) {
	        res = {
	            x: x,
	            y: y,
	            category: "mainTank",
	            item: App.mainTank,
	            isEmpty: false
	        };
	    }

	    return res;
	}

/***/ },
/* 9 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = Bullet;
	function Bullet(App, x, y) {
	    var direction = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : App.const.top;


	    switch (direction) {
	        case App.const.bottom:
	            y = y + 1;
	            break;

	        case App.const.top:
	            y = y - 1;
	            break;

	        case App.const.right:
	            x = x + 1;
	            break;

	        case App.const.left:
	            x = x - 1;
	            break;
	    }

	    this.x = x;
	    this.y = y;
	    this.direction = direction;

	    var avatar = document.createElement("div");
	    avatar.className = "bullet " + direction;
	    avatar.dataset.index = ++App.bulletsIndex;
	    avatar.style.left = x * App.variables.point + "px";
	    avatar.style.top = y * App.variables.point + "px";
	    avatar.style.width = App.variables.point + "px";
	    avatar.style.height = App.variables.point + "px";
	    App.variables.main.appendChild(avatar);

	    this.avatar = avatar;
	}

/***/ },
/* 10 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = Tank;
	function Tank(App, x, y) {
	    var direction = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : App.const.top;

	    this.x = x;
	    this.y = y;
	    this.direction = direction;

	    var avatar = document.createElement("div");
	    avatar.className = "computer-tank " + direction;
	    avatar.style.left = x * App.variables.point + "px";
	    avatar.style.top = y * App.variables.point + "px";
	    avatar.style.width = App.variables.point + "px";
	    avatar.style.height = App.variables.point + "px";
	    App.variables.main.appendChild(avatar);

	    this.avatar = avatar;
	}

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = moveBullet;

	var _removeBullet = __webpack_require__(12);

	var _removeBullet2 = _interopRequireDefault(_removeBullet);

	var _changeScore = __webpack_require__(13);

	var _changeScore2 = _interopRequireDefault(_changeScore);

	var _isEmptyCell = __webpack_require__(8);

	var _isEmptyCell2 = _interopRequireDefault(_isEmptyCell);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function moveBullet(App, bullet) {
	    var x = bullet.x,
	        y = bullet.y;

	    var cellInfo = void 0;
	    var score = 0;

	    switch (bullet.direction) {
	        case App.const.bottom:
	            if (bullet.y + 1 < App.variables.mapHeight) {
	                bullet.y += 1;
	            } else {
	                (0, _removeBullet2.default)(App, bullet);
	                return;
	            }
	            break;

	        case App.const.top:
	            if (bullet.y - 1 >= 0) {
	                bullet.y -= 1;
	            } else {
	                (0, _removeBullet2.default)(App, bullet);
	                return;
	            }
	            break;

	        case App.const.right:
	            if (bullet.x + 1 < App.variables.mapWidth) {
	                bullet.x += 1;
	            } else {
	                (0, _removeBullet2.default)(App, bullet);
	                return;
	            }
	            break;

	        case App.const.left:
	            if (bullet.x - 1 >= 0) {
	                bullet.x -= 1;
	            } else {
	                (0, _removeBullet2.default)(App, bullet);
	                return;
	            }
	            break;

	        default:
	            console.log("move bullet error");
	    }

	    cellInfo = (0, _isEmptyCell2.default)(App, bullet.x, bullet.y, bullet.avatar.dataset.index);

	    if (!cellInfo.isEmpty) {
	        App[cellInfo.category].map(function (item, index) {
	            if (item.avatar === cellInfo.item.avatar) {
	                if (cellInfo.category === "tanks") (0, _changeScore2.default)(score);

	                App[cellInfo.category].splice(index, 1);
	                item.avatar.parentNode.removeChild(item.avatar);
	            }
	        });

	        setTimeout(function () {
	            (0, _removeBullet2.default)(App, bullet);
	        }, App.variables.interval);
	    }

	    requestAnimationFrame(function () {
	        bullet.avatar.style.left = bullet.x * App.variables.point + "px";
	        bullet.avatar.style.top = bullet.y * App.variables.point + "px";
	    });
	}

/***/ },
/* 12 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = removeBullet;
	function removeBullet(App, bullet) {
	    App.bullets.map(function (item, index) {
	        if (item.avatar.dataset.index === bullet.avatar.dataset.index) {
	            App.bullets.splice(index, 1);
	            item.avatar.classList.add("_explosion");
	            setTimeout(function () {
	                item.avatar.parentNode.removeChild(item.avatar);
	            }, 300);
	        }
	    });
	}

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = changeScore;

	var _score = __webpack_require__(14);

	var _score2 = _interopRequireDefault(_score);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var score = 0;

	function changeScore() {
	    score++;
	    (0, _score2.default)(score);
	}

/***/ },
/* 14 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = showScore;
	function showScore(score) {
	    clearTimeout(timer);
	    var box = document.querySelector(".score");
	    box.innerText = score;
	    box.classList.add("_visible");

	    var timer = setTimeout(function () {
	        return box.classList.remove("_visible");
	    }, 2000);
	}

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.isMobile = exports.isEmptyCell = exports.getRandomCell = undefined;

	var _getRandomCell = __webpack_require__(16);

	var _getRandomCell2 = _interopRequireDefault(_getRandomCell);

	var _isEmptyCell = __webpack_require__(8);

	var _isEmptyCell2 = _interopRequireDefault(_isEmptyCell);

	var _isMobile = __webpack_require__(2);

	var _isMobile2 = _interopRequireDefault(_isMobile);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.getRandomCell = _getRandomCell2.default;
	exports.isEmptyCell = _isEmptyCell2.default;
	exports.isMobile = _isMobile2.default;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = getRandomCell;

	var _isEmptyCell = __webpack_require__(8);

	var _isEmptyCell2 = _interopRequireDefault(_isEmptyCell);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function getRandomCell(App) {
	    var x = void 0;
	    var y = void 0;

	    while (true) {
	        x = Math.floor(Math.random() * (App.variables.maxX - App.variables.minX)) + App.variables.minX;
	        y = Math.floor(Math.random() * (App.variables.maxY - App.variables.minY)) + App.variables.minY;

	        var cellInfo = (0, _isEmptyCell2.default)(App, x, y);

	        if (cellInfo.isEmpty) break;
	    }

	    return { x: x, y: y };
	}

/***/ },
/* 17 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }
/******/ ]);