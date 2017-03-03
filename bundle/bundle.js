/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	exports.__esModule = true;
	var app_1 = __webpack_require__(1);
	var audio_1 = __webpack_require__(3);
	var map_1 = __webpack_require__(4);
	var mainTank_1 = __webpack_require__(5);
	var tank_1 = __webpack_require__(15);
	var moveBullet_1 = __webpack_require__(16);
	var indexHelpers_1 = __webpack_require__(18);
	init();
	function init() {
	    audio_1["default"]();
	    if (indexHelpers_1.isMobile())
	        app_1["default"].variables.body.classList.add("_mobile");
	    map_1["default"]({
	        width: app_1["default"].variables.point * app_1["default"].variables.mapWidth,
	        height: app_1["default"].variables.point * app_1["default"].variables.mapHeight,
	        holder: app_1["default"].variables.main
	    });
	    createMainTank(app_1["default"].variables.minX, app_1["default"].variables.minY, app_1["default"]["const"].right);
	    setInterval(moveBullets, app_1["default"].variables.interval);
	    setInterval(function () {
	        var _a = indexHelpers_1.getRandomCell(app_1["default"]), x = _a.x, y = _a.y;
	        createTank(x, y, app_1["default"]["const"].right);
	    }, app_1["default"].variables.createTankInterval);
	    // ----------
	    function createTank(x, y, direction) {
	        app_1["default"].tanks.push(new tank_1["default"](app_1["default"], x, y, direction));
	    }
	    function createMainTank(x, y, direction) {
	        app_1["default"].mainTank = new mainTank_1["default"](app_1["default"], x, y, direction);
	    }
	    function moveBullets() {
	        app_1["default"].bullets.map(function (bullet) {
	            moveBullet_1["default"](app_1["default"], bullet);
	        });
	    }
	}


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	exports.__esModule = true;
	var isMobile_1 = __webpack_require__(2);
	var body = document.body;
	var point = 50;
	var bodyWidth = Math.floor(body.offsetWidth);
	var bodyHeight = isMobile_1["default"]() ? Math.floor(body.offsetHeight) - 60 : Math.floor(body.offsetHeight);
	var mapWidth = (bodyWidth - bodyWidth % point) / point;
	var mapHeight = (bodyHeight - bodyHeight % point) / point;
	var App = {
	    tanks: [],
	    bullets: [],
	    bulletsIndex: 0,
	    mainTank: {
	        x: 0,
	        y: 0,
	        direction: "",
	        avatar: null
	    },
	    "const": {
	        left: "_left",
	        top: "_top",
	        right: "_right",
	        bottom: "_bottom"
	    },
	    variables: {
	        body: body,
	        point: 50,
	        interval: 100,
	        intervalBulletsCreation: 300,
	        createTankInterval: 3000,
	        main: document.querySelector(".js-main"),
	        minX: 0,
	        minY: 0,
	        bodyWidth: bodyWidth,
	        bodyHeight: bodyHeight,
	        mapWidth: mapWidth,
	        mapHeight: mapHeight,
	        maxX: mapWidth - 1,
	        maxY: mapHeight - 1
	    }
	};
	exports["default"] = App;


/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";
	exports.__esModule = true;
	function isMobile() {
	    return 'ontouchstart' in window;
	}
	exports["default"] = isMobile;


/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";
	exports.__esModule = true;
	function initAudio() {
	    var holder = document.querySelector(".js-sounds");
	    var start = holder.querySelector(".js-sound-start");
	    start.play();
	}
	exports["default"] = initAudio;


/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";
	exports.__esModule = true;
	function initMap(options) {
	    var width = options.width, height = options.height;
	    var map = document.createElement("div");
	    map.className = "map";
	    map.style.width = width + "px";
	    map.style.height = height + "px";
	    options.holder.appendChild(map);
	}
	exports["default"] = initMap;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	exports.__esModule = true;
	var moveMainTank_1 = __webpack_require__(6);
	var controls_1 = __webpack_require__(7);
	var createBullet_1 = __webpack_require__(8);
	var isMobile_1 = __webpack_require__(2);
	var MainTank = (function () {
	    function MainTank(App, x, y, direction) {
	        if (direction === void 0) { direction = App["const"].top; }
	        this.x = x;
	        this.y = y;
	        this.direction = direction;
	        this.avatar = this.createAvatar(App, direction, x, y);
	        this.initListeners(App);
	        this.initTankControls(App);
	    }
	    MainTank.prototype.createAvatar = function (App, direction, x, y) {
	        var avatar = document.createElement("div");
	        avatar.className = "main-tank " + direction;
	        avatar.style.left = x * App.variables.point + "px";
	        avatar.style.top = y * App.variables.point + "px";
	        avatar.style.width = App.variables.point + "px";
	        avatar.style.height = App.variables.point + "px";
	        App.variables.main.appendChild(avatar);
	        return avatar;
	    };
	    MainTank.prototype.initTankControls = function (App) {
	        if (isMobile_1["default"]())
	            controls_1["default"](App, this, moveMainTank_1["default"], createBullet_1["default"]);
	    };
	    MainTank.prototype.initListeners = function (App) {
	        var _this = this;
	        var isPressedSpace = false;
	        App.variables.body.addEventListener("keydown", function (e) {
	            var code = e.keyCode;
	            switch (code) {
	                case 40:
	                    _this.direction = App["const"].bottom;
	                    break;
	                case 38:
	                    _this.direction = App["const"].top;
	                    break;
	                case 39:
	                    _this.direction = App["const"].right;
	                    break;
	                case 37:
	                    _this.direction = App["const"].left;
	                    break;
	                case 32:
	                    if (!isPressedSpace) {
	                        isPressedSpace = true;
	                        setTimeout(function () {
	                            isPressedSpace = false;
	                        }, App.variables.intervalBulletsCreation);
	                        createBullet_1["default"](App, _this.x, _this.y, _this.direction);
	                    }
	                    return;
	            }
	            moveMainTank_1["default"](App, _this);
	        });
	    };
	    return MainTank;
	}());
	exports["default"] = MainTank;


/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";
	exports.__esModule = true;
	function moveMainTank(App, item) {
	    switch (item.direction) {
	        case App["const"].bottom:
	            if (item.y + 1 < App.variables.mapHeight)
	                item.y += 1;
	            break;
	        case App["const"].top:
	            if (item.y - 1 >= 0)
	                item.y -= 1;
	            break;
	        case App["const"].right:
	            if (item.x + 1 < App.variables.mapWidth)
	                item.x += 1;
	            break;
	        case App["const"].left:
	            if (item.x - 1 >= 0)
	                item.x -= 1;
	            break;
	        default: console.log("move tank error");
	    }
	    item.avatar.style.left = item.x * App.variables.point + "px";
	    item.avatar.style.top = item.y * App.variables.point + "px";
	    item.avatar.classList.remove("_left", "_top", "_right", "_bottom");
	    item.avatar.classList.add(item.direction);
	}
	exports["default"] = moveMainTank;


/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";
	exports.__esModule = true;
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
	            item.direction = App["const"].left;
	            moveMainTank(App, item);
	        });
	        btnRight.addEventListener("click", function () {
	            item.direction = App["const"].right;
	            moveMainTank(App, item);
	        });
	        btnTop.addEventListener("click", function () {
	            item.direction = App["const"].top;
	            moveMainTank(App, item);
	        });
	        btnBottom.addEventListener("click", function () {
	            item.direction = App["const"].bottom;
	            moveMainTank(App, item);
	        });
	        shoot.addEventListener("click", function () {
	            createBullet(App, item.x, item.y, item.direction);
	        });
	    }
	}
	exports["default"] = initControls;


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	exports.__esModule = true;
	var isEmptyCell_1 = __webpack_require__(9);
	var Bullet_1 = __webpack_require__(10);
	function createBullet(App, x, y, direction) {
	    var cellInfo = isEmptyCell_1["default"](App, x, y);
	    if (cellInfo.isEmpty) {
	        App.bullets.push(new Bullet_1["default"](App, x, y, direction));
	    }
	}
	exports["default"] = createBullet;


/***/ },
/* 9 */
/***/ function(module, exports) {

	"use strict";
	exports.__esModule = true;
	function isEmptyCell(App, x, y, index) {
	    if (index === void 0) { index = false; }
	    var res = {
	        x: x,
	        y: y,
	        category: "",
	        item: "",
	        isEmpty: true
	    };
	    App.tanks.map(function (tank) {
	        if (tank.x === x && tank.y === y && tank.avatar.dataset.index !== index) {
	            res.category = "tanks";
	            res.item = tank;
	            res.isEmpty = false;
	            return res;
	        }
	    });
	    App.bullets.map(function (bullet) {
	        if (bullet.x === x && bullet.y === y && bullet.avatar.dataset.index !== index) {
	            res.category = "bullets";
	            res.item = bullet;
	            res.isEmpty = false;
	            return res;
	        }
	    });
	    if (App.mainTank.avatar.x === x && App.mainTank.avatar.y === y) {
	        res.category = "mainTank";
	        res.item = App.mainTank;
	        res.isEmpty = false;
	        return res;
	    }
	    return res;
	}
	exports["default"] = isEmptyCell;


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	exports.__esModule = true;
	var isEmptyCell_1 = __webpack_require__(9);
	var removeItem_1 = __webpack_require__(11);
	var makeExplore_1 = __webpack_require__(14);
	function Bullet(App, x, y, direction) {
	    if (direction === void 0) { direction = App["const"].top; }
	    switch (direction) {
	        case App["const"].bottom:
	            y = y + 1;
	            break;
	        case App["const"].top:
	            y = y - 1;
	            break;
	        case App["const"].right:
	            x = x + 1;
	            break;
	        case App["const"].left:
	            x = x - 1;
	            break;
	    }
	    this.x = x;
	    this.y = y;
	    this.direction = direction;
	    var avatar = document.createElement("div");
	    avatar.className = "bullet " + direction;
	    avatar.dataset["index"] = "" + ++App.bulletsIndex;
	    avatar.style.left = x * App.variables.point + "px";
	    avatar.style.top = y * App.variables.point + "px";
	    avatar.style.width = App.variables.point + "px";
	    avatar.style.height = App.variables.point + "px";
	    App.variables.main.appendChild(avatar);
	    this.avatar = avatar;
	    var cellInfo = isEmptyCell_1["default"](App, x, y);
	    if (!cellInfo.isEmpty) {
	        removeItem_1["default"](App, cellInfo);
	        makeExplore_1["default"](this);
	    }
	}
	exports["default"] = Bullet;


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	exports.__esModule = true;
	var changeScore_1 = __webpack_require__(12);
	function removeItem(App, cellInfo) {
	    App[cellInfo.category].map(function (item, index) {
	        if (item.avatar === cellInfo.item.avatar) {
	            if (cellInfo.category === "tanks")
	                changeScore_1["default"]();
	            App[cellInfo.category].splice(index, 1);
	            item && item.avatar.parentNode && item.avatar.parentNode.removeChild(item.avatar);
	        }
	    });
	}
	exports["default"] = removeItem;


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	exports.__esModule = true;
	var score_1 = __webpack_require__(13);
	var score = 0;
	function changeScore() {
	    score++;
	    score_1["default"](score);
	}
	exports["default"] = changeScore;


/***/ },
/* 13 */
/***/ function(module, exports) {

	"use strict";
	exports.__esModule = true;
	function showScore(score) {
	    var timer;
	    clearTimeout(timer);
	    var box = document.querySelector(".score");
	    box.innerText = score;
	    box.classList.add("_visible");
	    timer = setTimeout(function () { return box.classList.remove("_visible"); }, 2000);
	}
	exports["default"] = showScore;


/***/ },
/* 14 */
/***/ function(module, exports) {

	"use strict";
	exports.__esModule = true;
	function default_1(item) {
	    item.avatar.classList.add("_explosion");
	    setTimeout(function () {
	        item && item.avatar.parentNode && item.avatar.parentNode.removeChild(item.avatar);
	    }, 300);
	}
	exports["default"] = default_1;


/***/ },
/* 15 */
/***/ function(module, exports) {

	"use strict";
	exports.__esModule = true;
	var Tank = (function () {
	    function Tank(App, x, y, direction) {
	        if (direction === void 0) { direction = App["const"].top; }
	        this.x = x;
	        this.y = y;
	        this.direction = direction;
	        this.avatar = this.createAvatar(App, direction, x, y);
	    }
	    Tank.prototype.createAvatar = function (App, direction, x, y) {
	        var avatar = document.createElement("div");
	        avatar.className = "computer-tank " + direction;
	        avatar.style.left = x * App.variables.point + "px";
	        avatar.style.top = y * App.variables.point + "px";
	        avatar.style.width = App.variables.point + "px";
	        avatar.style.height = App.variables.point + "px";
	        App.variables.main.appendChild(avatar);
	        return avatar;
	    };
	    return Tank;
	}());
	exports["default"] = Tank;


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	exports.__esModule = true;
	var removeBullet_1 = __webpack_require__(17);
	var removeItem_1 = __webpack_require__(11);
	var isEmptyCell_1 = __webpack_require__(9);
	function moveBullet(App, bullet) {
	    if (bullet.avatar.classList.contains("_explosion"))
	        return false;
	    var x = bullet.x, y = bullet.y;
	    var cellInfo;
	    switch (bullet.direction) {
	        case App["const"].bottom:
	            if (bullet.y + 1 < App.variables.mapHeight) {
	                bullet.y += 1;
	            }
	            else {
	                removeBullet_1["default"](App, bullet);
	                return;
	            }
	            break;
	        case App["const"].top:
	            if (bullet.y - 1 >= 0) {
	                bullet.y -= 1;
	            }
	            else {
	                removeBullet_1["default"](App, bullet);
	                return;
	            }
	            break;
	        case App["const"].right:
	            if (bullet.x + 1 < App.variables.mapWidth) {
	                bullet.x += 1;
	            }
	            else {
	                removeBullet_1["default"](App, bullet);
	                return;
	            }
	            break;
	        case App["const"].left:
	            if (bullet.x - 1 >= 0) {
	                bullet.x -= 1;
	            }
	            else {
	                removeBullet_1["default"](App, bullet);
	                return;
	            }
	            break;
	        default: console.log("move bullet error");
	    }
	    cellInfo = isEmptyCell_1["default"](App, bullet.x, bullet.y, bullet.avatar.dataset.index);
	    if (!cellInfo.isEmpty) {
	        removeItem_1["default"](App, cellInfo);
	        //TODO remove bullet some time later
	        // setTimeout(() => {
	        removeBullet_1["default"](App, bullet);
	        // }, App.variables.interval)
	    }
	    else {
	        requestAnimationFrame(function () {
	            bullet.avatar.style.left = bullet.x * App.variables.point + "px";
	            bullet.avatar.style.top = bullet.y * App.variables.point + "px";
	        });
	    }
	}
	exports["default"] = moveBullet;


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	exports.__esModule = true;
	var makeExplore_1 = __webpack_require__(14);
	function removeBullet(App, bullet) {
	    App.bullets.map(function (item, index) {
	        if (item.avatar.dataset.index === bullet.avatar.dataset.index) {
	            App.bullets.splice(index, 1);
	            makeExplore_1["default"](item);
	        }
	    });
	}
	exports["default"] = removeBullet;


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	exports.__esModule = true;
	var getRandomCell_1 = __webpack_require__(19);
	exports.getRandomCell = getRandomCell_1["default"];
	var isEmptyCell_1 = __webpack_require__(9);
	exports.isEmptyCell = isEmptyCell_1["default"];
	var isMobile_1 = __webpack_require__(2);
	exports.isMobile = isMobile_1["default"];


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	exports.__esModule = true;
	var isEmptyCell_1 = __webpack_require__(9);
	function getRandomCell(App) {
	    var x;
	    var y;
	    while (true) {
	        x = Math.floor(Math.random() * (App.variables.maxX - App.variables.minX)) + App.variables.minX;
	        y = Math.floor(Math.random() * (App.variables.maxY - App.variables.minY)) + App.variables.minY;
	        var cellInfo = isEmptyCell_1["default"](App, x, y);
	        if (cellInfo.isEmpty)
	            break;
	    }
	    return { x: x, y: y };
	}
	exports["default"] = getRandomCell;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map