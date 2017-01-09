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

	var _map = __webpack_require__(1);

	__webpack_require__(2);

	init();

	function init() {
	    window.App = {};
	    App.tanks = [];
	    App.bullets = [];
	    App.bulletsIndex = 0;

	    App.const = {};
	    App.const.left = "_left";
	    App.const.top = "_top";
	    App.const.right = "_right";
	    App.const.bottom = "_bottom";

	    var body = document.body;
	    var point = 50;
	    var interval = 100;
	    var intervalBulletsCreation = 300;
	    var createTankInterval = 3000;
	    var bodyWidth = Math.floor(body.offsetWidth);
	    var bodyHeight = Math.floor(body.offsetHeight);
	    var mapWidth = (bodyWidth - bodyWidth % point) / point;
	    var mapHeight = (bodyHeight - bodyHeight % point) / point;
	    var main = document.querySelector(".js-main");
	    var minX = 0;
	    var minY = 0;
	    var maxX = mapWidth - 1;
	    var maxY = mapHeight - 1;

	    var score = 0;

	    (0, _map.initMap)({
	        width: point * mapWidth,
	        height: point * mapHeight,
	        holder: main
	    });

	    createMainTank(minX, minY, App.const.right);

	    setInterval(moveBullets, interval);

	    setInterval(function () {
	        var _getRandomCell = getRandomCell(),
	            x = _getRandomCell.x,
	            y = _getRandomCell.y;

	        createTank(x, y, App.const.right);
	    }, createTankInterval);

	    // ----------

	    function createTank(x, y, direction) {
	        App.tanks.push(new Tank(x, y, direction));
	    }

	    function createMainTank(x, y, direction) {
	        App.mainTank = new MainTank(x, y, direction);
	    }

	    function createBullet(x, y, direction) {
	        var cellInfo = isEmptyCell(x, y);

	        if (cellInfo.isEmpty) {
	            App.bullets.push(new Bullet(x, y, direction));
	        }
	    }

	    function getRandomCell() {
	        var x = void 0;
	        var y = void 0;

	        while (true) {
	            x = Math.floor(Math.random() * (maxX - minX)) + minX;
	            y = Math.floor(Math.random() * (maxY - minY)) + minY;

	            var cellInfo = isEmptyCell(x, y);

	            if (cellInfo.isEmpty) break;
	        }

	        return { x: x, y: y };
	    }

	    function isEmptyCell(x, y, index) {
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

	    function Tank(x, y) {
	        var direction = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : App.const.top;

	        this.x = x;
	        this.y = y;
	        this.direction = direction;

	        var avatar = document.createElement("div");
	        avatar.className = "computer-tank " + direction;
	        avatar.style.left = x * point + "px";
	        avatar.style.top = y * point + "px";
	        avatar.style.width = point + "px";
	        avatar.style.height = point + "px";
	        main.appendChild(avatar);

	        this.avatar = avatar;
	    }

	    function MainTank(x, y) {
	        var _this = this;

	        var direction = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : App.const.top;

	        var isPressedSpace = false;
	        var timer = void 0;

	        this.x = x;
	        this.y = y;
	        this.direction = direction;

	        var avatar = document.createElement("div");
	        avatar.className = "main-tank " + direction;
	        avatar.style.left = x * point + "px";
	        avatar.style.top = y * point + "px";
	        avatar.style.width = point + "px";
	        avatar.style.height = point + "px";
	        main.appendChild(avatar);

	        this.avatar = avatar;

	        body.addEventListener("keydown", function (e) {

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
	                        }, intervalBulletsCreation);

	                        createBullet(_this.x, _this.y, _this.direction);
	                    }
	                    return;
	            }

	            moveMainTank(_this);
	        });
	    }

	    function Bullet(x, y) {
	        var direction = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : App.const.top;


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
	        avatar.style.left = x * point + "px";
	        avatar.style.top = y * point + "px";
	        avatar.style.width = point + "px";
	        avatar.style.height = point + "px";
	        main.appendChild(avatar);

	        this.avatar = avatar;
	    }

	    function moveMainTank(item) {
	        switch (item.direction) {
	            case App.const.bottom:
	                if (item.y + 1 < mapHeight) item.y += 1;
	                break;

	            case App.const.top:
	                if (item.y - 1 >= 0) item.y -= 1;
	                break;

	            case App.const.right:
	                if (item.x + 1 < mapWidth) item.x += 1;
	                break;

	            case App.const.left:
	                if (item.x - 1 >= 0) item.x -= 1;
	                break;

	            default:
	                console.log("move tank error");
	        }

	        item.avatar.style.left = item.x * point + "px";
	        item.avatar.style.top = item.y * point + "px";
	        item.avatar.classList.remove("_left", "_top", "_right", "_bottom");
	        item.avatar.classList.add(item.direction);
	    }

	    function moveBullets() {
	        App.bullets.map(function (bullet) {
	            moveBullet(bullet);
	        });
	    }

	    function moveBullet(bullet) {
	        var x = bullet.x,
	            y = bullet.y;

	        var cellInfo = void 0;

	        switch (bullet.direction) {
	            case App.const.bottom:
	                if (bullet.y + 1 < mapHeight) {
	                    bullet.y += 1;
	                } else {
	                    removeBullet(bullet);
	                    return;
	                }
	                break;

	            case App.const.top:
	                if (bullet.y - 1 >= 0) {
	                    bullet.y -= 1;
	                } else {
	                    removeBullet(bullet);
	                    return;
	                }
	                break;

	            case App.const.right:
	                if (bullet.x + 1 < mapWidth) {
	                    bullet.x += 1;
	                } else {
	                    removeBullet(bullet);
	                    return;
	                }
	                break;

	            case App.const.left:
	                if (bullet.x - 1 >= 0) {
	                    bullet.x -= 1;
	                } else {
	                    removeBullet(bullet);
	                    return;
	                }
	                break;

	            default:
	                console.log("move bullet error");
	        }

	        cellInfo = isEmptyCell(bullet.x, bullet.y, bullet.avatar.dataset.index);

	        if (!cellInfo.isEmpty) {
	            App[cellInfo.category].map(function (item, index) {
	                if (item.avatar === cellInfo.item.avatar) {
	                    if (cellInfo.category === "tanks") changeScore();

	                    App[cellInfo.category].splice(index, 1);
	                    item.avatar.parentNode.removeChild(item.avatar);
	                }
	            });

	            setTimeout(function () {
	                removeBullet(bullet);
	            }, interval);
	        }

	        requestAnimationFrame(function () {
	            bullet.avatar.style.left = bullet.x * point + "px";
	            bullet.avatar.style.top = bullet.y * point + "px";
	        });
	    }

	    function removeBullet(bullet) {
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

	    function changeScore() {
	        score++;
	        console.log(score);
	    }
	}

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.initMap = initMap;
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
/* 2 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }
/******/ ]);