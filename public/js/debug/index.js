/******/ (function(modules) { // webpackBootstrap
/******/ 	var parentHotUpdateCallback = this["webpackHotUpdate"];
/******/ 	this["webpackHotUpdate"] = 
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if(parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	}
/******/ 	
/******/ 	function hotDownloadUpdateChunk(chunkId) { // eslint-disable-line no-unused-vars
/******/ 		var head = document.getElementsByTagName("head")[0];
/******/ 		var script = document.createElement("script");
/******/ 		script.type = "text/javascript";
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		head.appendChild(script);
/******/ 	}
/******/ 	
/******/ 	function hotDownloadManifest(callback) { // eslint-disable-line no-unused-vars
/******/ 		if(typeof XMLHttpRequest === "undefined")
/******/ 			return callback(new Error("No browser support"));
/******/ 		try {
/******/ 			var request = new XMLHttpRequest();
/******/ 			var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 			request.open("GET", requestPath, true);
/******/ 			request.timeout = 10000;
/******/ 			request.send(null);
/******/ 		} catch(err) {
/******/ 			return callback(err);
/******/ 		}
/******/ 		request.onreadystatechange = function() {
/******/ 			if(request.readyState !== 4) return;
/******/ 			if(request.status === 0) {
/******/ 				// timeout
/******/ 				callback(new Error("Manifest request to " + requestPath + " timed out."));
/******/ 			} else if(request.status === 404) {
/******/ 				// no update available
/******/ 				callback();
/******/ 			} else if(request.status !== 200 && request.status !== 304) {
/******/ 				// other failure
/******/ 				callback(new Error("Manifest request to " + requestPath + " failed."));
/******/ 			} else {
/******/ 				// success
/******/ 				try {
/******/ 					var update = JSON.parse(request.responseText);
/******/ 				} catch(e) {
/******/ 					callback(e);
/******/ 					return;
/******/ 				}
/******/ 				callback(null, update);
/******/ 			}
/******/ 		};
/******/ 	}
/******/
/******/ 	
/******/ 	
/******/ 	// Copied from https://github.com/facebook/react/blob/bef45b0/src/shared/utils/canDefineProperty.js
/******/ 	var canDefineProperty = false;
/******/ 	try {
/******/ 		Object.defineProperty({}, "x", {
/******/ 			get: function() {}
/******/ 		});
/******/ 		canDefineProperty = true;
/******/ 	} catch(x) {
/******/ 		// IE will fail on defineProperty
/******/ 	}
/******/ 	
/******/ 	var hotApplyOnUpdate = true;
/******/ 	var hotCurrentHash = "088564b8505000af3f8e"; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentParents = []; // eslint-disable-line no-unused-vars
/******/ 	
/******/ 	function hotCreateRequire(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var me = installedModules[moduleId];
/******/ 		if(!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if(me.hot.active) {
/******/ 				if(installedModules[request]) {
/******/ 					if(installedModules[request].parents.indexOf(moduleId) < 0)
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					if(me.children.indexOf(request) < 0)
/******/ 						me.children.push(request);
/******/ 				} else hotCurrentParents = [moduleId];
/******/ 			} else {
/******/ 				console.warn("[HMR] unexpected require(" + request + ") from disposed module " + moduleId);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		for(var name in __webpack_require__) {
/******/ 			if(Object.prototype.hasOwnProperty.call(__webpack_require__, name)) {
/******/ 				if(canDefineProperty) {
/******/ 					Object.defineProperty(fn, name, (function(name) {
/******/ 						return {
/******/ 							configurable: true,
/******/ 							enumerable: true,
/******/ 							get: function() {
/******/ 								return __webpack_require__[name];
/******/ 							},
/******/ 							set: function(value) {
/******/ 								__webpack_require__[name] = value;
/******/ 							}
/******/ 						};
/******/ 					}(name)));
/******/ 				} else {
/******/ 					fn[name] = __webpack_require__[name];
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		function ensure(chunkId, callback) {
/******/ 			if(hotStatus === "ready")
/******/ 				hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			__webpack_require__.e(chunkId, function() {
/******/ 				try {
/******/ 					callback.call(null, fn);
/******/ 				} finally {
/******/ 					finishChunkLoading();
/******/ 				}
/******/ 	
/******/ 				function finishChunkLoading() {
/******/ 					hotChunksLoading--;
/******/ 					if(hotStatus === "prepare") {
/******/ 						if(!hotWaitingFilesMap[chunkId]) {
/******/ 							hotEnsureUpdateChunk(chunkId);
/******/ 						}
/******/ 						if(hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 							hotUpdateDownloaded();
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			});
/******/ 		}
/******/ 		if(canDefineProperty) {
/******/ 			Object.defineProperty(fn, "e", {
/******/ 				enumerable: true,
/******/ 				value: ensure
/******/ 			});
/******/ 		} else {
/******/ 			fn.e = ensure;
/******/ 		}
/******/ 		return fn;
/******/ 	}
/******/ 	
/******/ 	function hotCreateModule(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 	
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfAccepted = true;
/******/ 				else if(typeof dep === "function")
/******/ 					hot._selfAccepted = dep;
/******/ 				else if(typeof dep === "object")
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback;
/******/ 				else
/******/ 					hot._acceptedDependencies[dep] = callback;
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfDeclined = true;
/******/ 				else if(typeof dep === "number")
/******/ 					hot._declinedDependencies[dep] = true;
/******/ 				else
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if(idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if(!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if(idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		return hot;
/******/ 	}
/******/ 	
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/ 	
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for(var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/ 	
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailibleFilesMap = {};
/******/ 	var hotCallback;
/******/ 	
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/ 	
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = (+id) + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/ 	
/******/ 	function hotCheck(apply, callback) {
/******/ 		if(hotStatus !== "idle") throw new Error("check() is only allowed in idle status");
/******/ 		if(typeof apply === "function") {
/******/ 			hotApplyOnUpdate = false;
/******/ 			callback = apply;
/******/ 		} else {
/******/ 			hotApplyOnUpdate = apply;
/******/ 			callback = callback || function(err) {
/******/ 				if(err) throw err;
/******/ 			};
/******/ 		}
/******/ 		hotSetStatus("check");
/******/ 		hotDownloadManifest(function(err, update) {
/******/ 			if(err) return callback(err);
/******/ 			if(!update) {
/******/ 				hotSetStatus("idle");
/******/ 				callback(null, null);
/******/ 				return;
/******/ 			}
/******/ 	
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotAvailibleFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			for(var i = 0; i < update.c.length; i++)
/******/ 				hotAvailibleFilesMap[update.c[i]] = true;
/******/ 			hotUpdateNewHash = update.h;
/******/ 	
/******/ 			hotSetStatus("prepare");
/******/ 			hotCallback = callback;
/******/ 			hotUpdate = {};
/******/ 			var chunkId = 0;
/******/ 			{ // eslint-disable-line no-lone-blocks
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if(hotStatus === "prepare" && hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 		});
/******/ 	}
/******/ 	
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		if(!hotAvailibleFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for(var moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if(!hotAvailibleFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var callback = hotCallback;
/******/ 		hotCallback = null;
/******/ 		if(!callback) return;
/******/ 		if(hotApplyOnUpdate) {
/******/ 			hotApply(hotApplyOnUpdate, callback);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for(var id in hotUpdate) {
/******/ 				if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			callback(null, outdatedModules);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotApply(options, callback) {
/******/ 		if(hotStatus !== "ready") throw new Error("apply() is only allowed in ready status");
/******/ 		if(typeof options === "function") {
/******/ 			callback = options;
/******/ 			options = {};
/******/ 		} else if(options && typeof options === "object") {
/******/ 			callback = callback || function(err) {
/******/ 				if(err) throw err;
/******/ 			};
/******/ 		} else {
/******/ 			options = {};
/******/ 			callback = callback || function(err) {
/******/ 				if(err) throw err;
/******/ 			};
/******/ 		}
/******/ 	
/******/ 		function getAffectedStuff(module) {
/******/ 			var outdatedModules = [module];
/******/ 			var outdatedDependencies = {};
/******/ 	
/******/ 			var queue = outdatedModules.slice();
/******/ 			while(queue.length > 0) {
/******/ 				var moduleId = queue.pop();
/******/ 				var module = installedModules[moduleId];
/******/ 				if(!module || module.hot._selfAccepted)
/******/ 					continue;
/******/ 				if(module.hot._selfDeclined) {
/******/ 					return new Error("Aborted because of self decline: " + moduleId);
/******/ 				}
/******/ 				if(moduleId === 0) {
/******/ 					return;
/******/ 				}
/******/ 				for(var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if(parent.hot._declinedDependencies[moduleId]) {
/******/ 						return new Error("Aborted because of declined dependency: " + moduleId + " in " + parentId);
/******/ 					}
/******/ 					if(outdatedModules.indexOf(parentId) >= 0) continue;
/******/ 					if(parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if(!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push(parentId);
/******/ 				}
/******/ 			}
/******/ 	
/******/ 			return [outdatedModules, outdatedDependencies];
/******/ 		}
/******/ 	
/******/ 		function addAllToSet(a, b) {
/******/ 			for(var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if(a.indexOf(item) < 0)
/******/ 					a.push(item);
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/ 		for(var id in hotUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				var moduleId = toModuleId(id);
/******/ 				var result = getAffectedStuff(moduleId);
/******/ 				if(!result) {
/******/ 					if(options.ignoreUnaccepted)
/******/ 						continue;
/******/ 					hotSetStatus("abort");
/******/ 					return callback(new Error("Aborted because " + moduleId + " is not accepted"));
/******/ 				}
/******/ 				if(result instanceof Error) {
/******/ 					hotSetStatus("abort");
/******/ 					return callback(result);
/******/ 				}
/******/ 				appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 				addAllToSet(outdatedModules, result[0]);
/******/ 				for(var moduleId in result[1]) {
/******/ 					if(Object.prototype.hasOwnProperty.call(result[1], moduleId)) {
/******/ 						if(!outdatedDependencies[moduleId])
/******/ 							outdatedDependencies[moduleId] = [];
/******/ 						addAllToSet(outdatedDependencies[moduleId], result[1][moduleId]);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for(var i = 0; i < outdatedModules.length; i++) {
/******/ 			var moduleId = outdatedModules[i];
/******/ 			if(installedModules[moduleId] && installedModules[moduleId].hot._selfAccepted)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/ 	
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		var queue = outdatedModules.slice();
/******/ 		while(queue.length > 0) {
/******/ 			var moduleId = queue.pop();
/******/ 			var module = installedModules[moduleId];
/******/ 			if(!module) continue;
/******/ 	
/******/ 			var data = {};
/******/ 	
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for(var j = 0; j < disposeHandlers.length; j++) {
/******/ 				var cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/ 	
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/ 	
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/ 	
/******/ 			// remove "parents" references from all children
/******/ 			for(var j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if(!child) continue;
/******/ 				var idx = child.parents.indexOf(moduleId);
/******/ 				if(idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// remove outdated dependency from module children
/******/ 		for(var moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				var module = installedModules[moduleId];
/******/ 				var moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 				for(var j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 					var dependency = moduleOutdatedDependencies[j];
/******/ 					var idx = module.children.indexOf(dependency);
/******/ 					if(idx >= 0) module.children.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/ 	
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/ 	
/******/ 		// insert new code
/******/ 		for(var moduleId in appliedUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for(var moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				var module = installedModules[moduleId];
/******/ 				var moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 				var callbacks = [];
/******/ 				for(var i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 					var dependency = moduleOutdatedDependencies[i];
/******/ 					var cb = module.hot._acceptedDependencies[dependency];
/******/ 					if(callbacks.indexOf(cb) >= 0) continue;
/******/ 					callbacks.push(cb);
/******/ 				}
/******/ 				for(var i = 0; i < callbacks.length; i++) {
/******/ 					var cb = callbacks[i];
/******/ 					try {
/******/ 						cb(outdatedDependencies);
/******/ 					} catch(err) {
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Load self accepted modules
/******/ 		for(var i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			var moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch(err) {
/******/ 				if(typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch(err) {
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				} else if(!error)
/******/ 					error = err;
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if(error) {
/******/ 			hotSetStatus("fail");
/******/ 			return callback(error);
/******/ 		}
/******/ 	
/******/ 		hotSetStatus("idle");
/******/ 		callback(null, outdatedModules);
/******/ 	}
/******/
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
/******/ 			loaded: false,
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: hotCurrentParents,
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
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
/******/ 	__webpack_require__.p = "/static";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire(0)(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/*!*******************!*\
  !*** multi index ***!
  \*******************/
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(/*! webpack-hot-middleware/client */100);
	module.exports = __webpack_require__(/*! D:\workspace\javascript\isomorphic-react-redux-starter/client/js/pages/index.js */122);


/***/ },
/* 1 */
/*!***************************!*\
  !*** external "libs_lib" ***!
  \***************************/
/***/ function(module, exports) {

	module.exports = libs_lib;

/***/ },
/* 2 */
/*!***************************************************************************!*\
  !*** delegated ./node_modules/react/react.js from dll-reference libs_lib ***!
  \***************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = (__webpack_require__(1))(42);

/***/ },
/* 3 */
/*!**********************************************!*\
  !*** ./~/core-js/library/modules/_global.js ***!
  \**********************************************/
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 4 */
/*!*******************************************!*\
  !*** ./~/core-js/library/modules/_has.js ***!
  \*******************************************/
/***/ function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function(it, key){
	  return hasOwnProperty.call(it, key);
	};

/***/ },
/* 5 */
/*!**************************************************!*\
  !*** ./~/core-js/library/modules/_to-iobject.js ***!
  \**************************************************/
/***/ function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(/*! ./_iobject */ 67)
	  , defined = __webpack_require__(/*! ./_defined */ 24);
	module.exports = function(it){
	  return IObject(defined(it));
	};

/***/ },
/* 6 */
/*!***************************************************!*\
  !*** ./~/babel-runtime/helpers/classCallCheck.js ***!
  \***************************************************/
/***/ function(module, exports) {

	"use strict";
	
	exports.__esModule = true;
	
	exports.default = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};

/***/ },
/* 7 */
/*!*********************************************!*\
  !*** ./~/babel-runtime/helpers/inherits.js ***!
  \*********************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _setPrototypeOf = __webpack_require__(/*! ../core-js/object/set-prototype-of */ 55);
	
	var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);
	
	var _create = __webpack_require__(/*! ../core-js/object/create */ 54);
	
	var _create2 = _interopRequireDefault(_create);
	
	var _typeof2 = __webpack_require__(/*! ../helpers/typeof */ 23);
	
	var _typeof3 = _interopRequireDefault(_typeof2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = function (subClass, superClass) {
	  if (typeof superClass !== "function" && superClass !== null) {
	    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : (0, _typeof3.default)(superClass)));
	  }
	
	  subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, {
	    constructor: {
	      value: subClass,
	      enumerable: false,
	      writable: true,
	      configurable: true
	    }
	  });
	  if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass;
	};

/***/ },
/* 8 */
/*!**************************************************************!*\
  !*** ./~/babel-runtime/helpers/possibleConstructorReturn.js ***!
  \**************************************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _typeof2 = __webpack_require__(/*! ../helpers/typeof */ 23);
	
	var _typeof3 = _interopRequireDefault(_typeof2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = function (self, call) {
	  if (!self) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }
	
	  return call && ((typeof call === "undefined" ? "undefined" : (0, _typeof3.default)(call)) === "object" || typeof call === "function") ? call : self;
	};

/***/ },
/* 9 */
/*!***************************************************!*\
  !*** ./~/core-js/library/modules/_descriptors.js ***!
  \***************************************************/
/***/ function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(/*! ./_fails */ 19)(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 10 */
/*!********************************************!*\
  !*** ./~/core-js/library/modules/_hide.js ***!
  \********************************************/
/***/ function(module, exports, __webpack_require__) {

	var dP         = __webpack_require__(/*! ./_object-dp */ 11)
	  , createDesc = __webpack_require__(/*! ./_property-desc */ 21);
	module.exports = __webpack_require__(/*! ./_descriptors */ 9) ? function(object, key, value){
	  return dP.f(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

/***/ },
/* 11 */
/*!*************************************************!*\
  !*** ./~/core-js/library/modules/_object-dp.js ***!
  \*************************************************/
/***/ function(module, exports, __webpack_require__) {

	var anObject       = __webpack_require__(/*! ./_an-object */ 13)
	  , IE8_DOM_DEFINE = __webpack_require__(/*! ./_ie8-dom-define */ 41)
	  , toPrimitive    = __webpack_require__(/*! ./_to-primitive */ 34)
	  , dP             = Object.defineProperty;
	
	exports.f = __webpack_require__(/*! ./_descriptors */ 9) ? Object.defineProperty : function defineProperty(O, P, Attributes){
	  anObject(O);
	  P = toPrimitive(P, true);
	  anObject(Attributes);
	  if(IE8_DOM_DEFINE)try {
	    return dP(O, P, Attributes);
	  } catch(e){ /* empty */ }
	  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
	  if('value' in Attributes)O[P] = Attributes.value;
	  return O;
	};

/***/ },
/* 12 */
/*!*******************************************!*\
  !*** ./~/core-js/library/modules/_wks.js ***!
  \*******************************************/
/***/ function(module, exports, __webpack_require__) {

	var store      = __webpack_require__(/*! ./_shared */ 32)('wks')
	  , uid        = __webpack_require__(/*! ./_uid */ 22)
	  , Symbol     = __webpack_require__(/*! ./_global */ 3).Symbol
	  , USE_SYMBOL = typeof Symbol == 'function';
	
	var $exports = module.exports = function(name){
	  return store[name] || (store[name] =
	    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
	};
	
	$exports.store = store;

/***/ },
/* 13 */
/*!*************************************************!*\
  !*** ./~/core-js/library/modules/_an-object.js ***!
  \*************************************************/
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(/*! ./_is-object */ 15);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 14 */
/*!********************************************!*\
  !*** ./~/core-js/library/modules/_core.js ***!
  \********************************************/
/***/ function(module, exports) {

	var core = module.exports = {version: '2.4.0'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 15 */
/*!*************************************************!*\
  !*** ./~/core-js/library/modules/_is-object.js ***!
  \*************************************************/
/***/ function(module, exports) {

	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },
/* 16 */
/*!*******************************!*\
  !*** ./common/pages/Base.jsx ***!
  \*******************************/
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	exports.__esModule = true;
	
	var _classCallCheck2 = __webpack_require__(/*! babel-runtime/helpers/classCallCheck */ 6);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _possibleConstructorReturn2 = __webpack_require__(/*! babel-runtime/helpers/possibleConstructorReturn */ 8);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(/*! babel-runtime/helpers/inherits */ 7);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _react = __webpack_require__(/*! react */ 2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _shallowEqual = __webpack_require__(/*! ../utils/shallowEqual */ 94);
	
	var _shallowEqual2 = _interopRequireDefault(_shallowEqual);
	
	var _events = __webpack_require__(/*! events */ 48);
	
	var _events2 = _interopRequireDefault(_events);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var eventMatchReg = /^on[A-Z]/;
	function getEventMethodsProps(instance) {
	    var methods = Object.getOwnPropertyNames(instance).filter(function (prop) {
	        return eventMatchReg.test(prop) && typeof instance[prop] === 'function';
	    });
	
	    var instancePrototype = Object.getPrototypeOf(instance);
	    if (instancePrototype !== Object.prototype) {
	        methods = methods.concat(getEventMethodsProps(instancePrototype));
	    }
	
	    return methods;
	}
	
	var Base = function (_Component) {
	    (0, _inherits3.default)(Base, _Component);
	
	    function Base(props, context) {
	        (0, _classCallCheck3.default)(this, Base);
	
	        var _this = (0, _possibleConstructorReturn3.default)(this, _Component.call(this, props, context));
	
	        _this.__eventNames = {};
	
	        _this.__bindFunctions();
	        return _this;
	    }
	
	    Base.prototype.__bindFunctions = function __bindFunctions() {
	        var props = getEventMethodsProps(this);
	        for (var _iterator = props, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
	            var _ref;
	
	            if (_isArray) {
	                if (_i >= _iterator.length) break;
	                _ref = _iterator[_i++];
	            } else {
	                _i = _iterator.next();
	                if (_i.done) break;
	                _ref = _i.value;
	            }
	
	            var prop = _ref;
	
	            if (!this[prop].funcBinded) {
	                this[prop] = this[prop].bind(this);
	                this[prop].funcBinded = true;
	            }
	        }
	    };
	
	    Base.prototype.on = function on(eventName, fn) {
	        if (typeof fn !== 'function') throw new Error('fn should be a function');
	
	        if (!this.__eventNames[eventName]) {
	            this.__eventNames[eventName] = [fn];
	        } else {
	            this.__eventNames[eventName].push(fn);
	        }
	
	        return this.context.$eventBus.addListener(eventName, fn);
	    };
	
	    Base.prototype.emit = function emit(eventName) {
	        var _context$$eventBus;
	
	        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	            args[_key - 1] = arguments[_key];
	        }
	
	        return (_context$$eventBus = this.context.$eventBus).emit.apply(_context$$eventBus, [eventName].concat(args));
	    };
	
	    Base.prototype.off = function off(eventName, fn) {
	        var events = this.__eventNames[eventName];
	        if (events) {
	            var index = events.indexOf(fn);
	
	            if (index >= 0) {
	                this.context.$eventBus.removeListener(eventName, fn);
	
	                events.splice(index, 1);
	
	                if (!events.length) {
	                    delete this.__eventNames[eventName];
	                }
	            } else {
	                console.warn('event: ' + eventName + ' is not registered in ' + this._reactInternalInstance.getName() + ' Component');
	            }
	
	            return true;
	        } else {
	            console.warn('event: ' + eventName + ' is not registered in ' + this.constructor.name + ' Component');
	
	            return false;
	        }
	    };
	
	    /**
	     * 检验组件更新
	     * @param nextProps
	     * @param nextState
	     * @returns {*}
	     */
	
	
	    Base.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps, nextState) {
	        var shouldUpdate = !(0, _shallowEqual2.default)(this.props, nextProps) || !(0, _shallowEqual2.default)(this.state, nextState);
	
	        if (shouldUpdate && process.env.NODE_ENV !== 'production') {
	            console.log('Component: ' + this.constructor.name + ' will update');
	        }
	
	        return shouldUpdate;
	    };
	
	    Base.prototype.componentWillUnmount = function componentWillUnmount() {
	        for (var eventName in this.__eventNames) {
	            if (this.__eventNames.hasOwnProperty(eventName)) {
	                for (var _iterator2 = this.__eventNames[eventName], _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
	                    var _ref2;
	
	                    if (_isArray2) {
	                        if (_i2 >= _iterator2.length) break;
	                        _ref2 = _iterator2[_i2++];
	                    } else {
	                        _i2 = _iterator2.next();
	                        if (_i2.done) break;
	                        _ref2 = _i2.value;
	                    }
	
	                    var fn = _ref2;
	
	                    this.off(eventName, fn);
	                }
	            }
	        }
	    };
	
	    return Base;
	}(_react.Component);
	
	exports.default = Base;
	
	Base.contextTypes = {
	    $eventBus: _react.PropTypes.instanceOf(_events2.default)
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! ./~/process/browser.js */ 17)))

/***/ },
/* 17 */
/*!******************************!*\
  !*** ./~/process/browser.js ***!
  \******************************/
/***/ function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};
	
	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.
	
	var cachedSetTimeout;
	var cachedClearTimeout;
	
	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }
	
	
	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }
	
	
	
	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;
	
	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}
	
	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;
	
	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}
	
	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};
	
	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};
	
	function noop() {}
	
	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	
	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};
	
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 18 */
/*!**********************************************!*\
  !*** ./~/core-js/library/modules/_export.js ***!
  \**********************************************/
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(/*! ./_global */ 3)
	  , core      = __webpack_require__(/*! ./_core */ 14)
	  , ctx       = __webpack_require__(/*! ./_ctx */ 39)
	  , hide      = __webpack_require__(/*! ./_hide */ 10)
	  , PROTOTYPE = 'prototype';
	
	var $export = function(type, name, source){
	  var IS_FORCED = type & $export.F
	    , IS_GLOBAL = type & $export.G
	    , IS_STATIC = type & $export.S
	    , IS_PROTO  = type & $export.P
	    , IS_BIND   = type & $export.B
	    , IS_WRAP   = type & $export.W
	    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
	    , expProto  = exports[PROTOTYPE]
	    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
	    , key, own, out;
	  if(IS_GLOBAL)source = name;
	  for(key in source){
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    if(own && key in exports)continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? ctx(out, global)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? (function(C){
	      var F = function(a, b, c){
	        if(this instanceof C){
	          switch(arguments.length){
	            case 0: return new C;
	            case 1: return new C(a);
	            case 2: return new C(a, b);
	          } return new C(a, b, c);
	        } return C.apply(this, arguments);
	      };
	      F[PROTOTYPE] = C[PROTOTYPE];
	      return F;
	    // make static versions for prototype methods
	    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
	    if(IS_PROTO){
	      (exports.virtual || (exports.virtual = {}))[key] = out;
	      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
	      if(type & $export.R && expProto && !expProto[key])hide(expProto, key, out);
	    }
	  }
	};
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

/***/ },
/* 19 */
/*!*********************************************!*\
  !*** ./~/core-js/library/modules/_fails.js ***!
  \*********************************************/
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },
/* 20 */
/*!***************************************************!*\
  !*** ./~/core-js/library/modules/_object-keys.js ***!
  \***************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)
	var $keys       = __webpack_require__(/*! ./_object-keys-internal */ 46)
	  , enumBugKeys = __webpack_require__(/*! ./_enum-bug-keys */ 25);
	
	module.exports = Object.keys || function keys(O){
	  return $keys(O, enumBugKeys);
	};

/***/ },
/* 21 */
/*!*****************************************************!*\
  !*** ./~/core-js/library/modules/_property-desc.js ***!
  \*****************************************************/
/***/ function(module, exports) {

	module.exports = function(bitmap, value){
	  return {
	    enumerable  : !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable    : !(bitmap & 4),
	    value       : value
	  };
	};

/***/ },
/* 22 */
/*!*******************************************!*\
  !*** ./~/core-js/library/modules/_uid.js ***!
  \*******************************************/
/***/ function(module, exports) {

	var id = 0
	  , px = Math.random();
	module.exports = function(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ },
/* 23 */
/*!*******************************************!*\
  !*** ./~/babel-runtime/helpers/typeof.js ***!
  \*******************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _iterator = __webpack_require__(/*! ../core-js/symbol/iterator */ 57);
	
	var _iterator2 = _interopRequireDefault(_iterator);
	
	var _symbol = __webpack_require__(/*! ../core-js/symbol */ 56);
	
	var _symbol2 = _interopRequireDefault(_symbol);
	
	var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default ? "symbol" : typeof obj; };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
	  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
	} : function (obj) {
	  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
	};

/***/ },
/* 24 */
/*!***********************************************!*\
  !*** ./~/core-js/library/modules/_defined.js ***!
  \***********************************************/
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 25 */
/*!*****************************************************!*\
  !*** ./~/core-js/library/modules/_enum-bug-keys.js ***!
  \*****************************************************/
/***/ function(module, exports) {

	// IE 8- don't enum bug keys
	module.exports = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');

/***/ },
/* 26 */
/*!*************************************************!*\
  !*** ./~/core-js/library/modules/_iterators.js ***!
  \*************************************************/
/***/ function(module, exports) {

	module.exports = {};

/***/ },
/* 27 */
/*!***********************************************!*\
  !*** ./~/core-js/library/modules/_library.js ***!
  \***********************************************/
/***/ function(module, exports) {

	module.exports = true;

/***/ },
/* 28 */
/*!*****************************************************!*\
  !*** ./~/core-js/library/modules/_object-create.js ***!
  \*****************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	var anObject    = __webpack_require__(/*! ./_an-object */ 13)
	  , dPs         = __webpack_require__(/*! ./_object-dps */ 73)
	  , enumBugKeys = __webpack_require__(/*! ./_enum-bug-keys */ 25)
	  , IE_PROTO    = __webpack_require__(/*! ./_shared-key */ 31)('IE_PROTO')
	  , Empty       = function(){ /* empty */ }
	  , PROTOTYPE   = 'prototype';
	
	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var createDict = function(){
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = __webpack_require__(/*! ./_dom-create */ 40)('iframe')
	    , i      = enumBugKeys.length
	    , lt     = '<'
	    , gt     = '>'
	    , iframeDocument;
	  iframe.style.display = 'none';
	  __webpack_require__(/*! ./_html */ 66).appendChild(iframe);
	  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
	  // createDict = iframe.contentWindow.Object;
	  // html.removeChild(iframe);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
	  iframeDocument.close();
	  createDict = iframeDocument.F;
	  while(i--)delete createDict[PROTOTYPE][enumBugKeys[i]];
	  return createDict();
	};
	
	module.exports = Object.create || function create(O, Properties){
	  var result;
	  if(O !== null){
	    Empty[PROTOTYPE] = anObject(O);
	    result = new Empty;
	    Empty[PROTOTYPE] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO] = O;
	  } else result = createDict();
	  return Properties === undefined ? result : dPs(result, Properties);
	};


/***/ },
/* 29 */
/*!**************************************************!*\
  !*** ./~/core-js/library/modules/_object-pie.js ***!
  \**************************************************/
/***/ function(module, exports) {

	exports.f = {}.propertyIsEnumerable;

/***/ },
/* 30 */
/*!*********************************************************!*\
  !*** ./~/core-js/library/modules/_set-to-string-tag.js ***!
  \*********************************************************/
/***/ function(module, exports, __webpack_require__) {

	var def = __webpack_require__(/*! ./_object-dp */ 11).f
	  , has = __webpack_require__(/*! ./_has */ 4)
	  , TAG = __webpack_require__(/*! ./_wks */ 12)('toStringTag');
	
	module.exports = function(it, tag, stat){
	  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
	};

/***/ },
/* 31 */
/*!**************************************************!*\
  !*** ./~/core-js/library/modules/_shared-key.js ***!
  \**************************************************/
/***/ function(module, exports, __webpack_require__) {

	var shared = __webpack_require__(/*! ./_shared */ 32)('keys')
	  , uid    = __webpack_require__(/*! ./_uid */ 22);
	module.exports = function(key){
	  return shared[key] || (shared[key] = uid(key));
	};

/***/ },
/* 32 */
/*!**********************************************!*\
  !*** ./~/core-js/library/modules/_shared.js ***!
  \**********************************************/
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(/*! ./_global */ 3)
	  , SHARED = '__core-js_shared__'
	  , store  = global[SHARED] || (global[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};

/***/ },
/* 33 */
/*!**************************************************!*\
  !*** ./~/core-js/library/modules/_to-integer.js ***!
  \**************************************************/
/***/ function(module, exports) {

	// 7.1.4 ToInteger
	var ceil  = Math.ceil
	  , floor = Math.floor;
	module.exports = function(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

/***/ },
/* 34 */
/*!****************************************************!*\
  !*** ./~/core-js/library/modules/_to-primitive.js ***!
  \****************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 7.1.1 ToPrimitive(input [, PreferredType])
	var isObject = __webpack_require__(/*! ./_is-object */ 15);
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	module.exports = function(it, S){
	  if(!isObject(it))return it;
	  var fn, val;
	  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  throw TypeError("Can't convert object to primitive value");
	};

/***/ },
/* 35 */
/*!**************************************************!*\
  !*** ./~/core-js/library/modules/_wks-define.js ***!
  \**************************************************/
/***/ function(module, exports, __webpack_require__) {

	var global         = __webpack_require__(/*! ./_global */ 3)
	  , core           = __webpack_require__(/*! ./_core */ 14)
	  , LIBRARY        = __webpack_require__(/*! ./_library */ 27)
	  , wksExt         = __webpack_require__(/*! ./_wks-ext */ 36)
	  , defineProperty = __webpack_require__(/*! ./_object-dp */ 11).f;
	module.exports = function(name){
	  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
	  if(name.charAt(0) != '_' && !(name in $Symbol))defineProperty($Symbol, name, {value: wksExt.f(name)});
	};

/***/ },
/* 36 */
/*!***********************************************!*\
  !*** ./~/core-js/library/modules/_wks-ext.js ***!
  \***********************************************/
/***/ function(module, exports, __webpack_require__) {

	exports.f = __webpack_require__(/*! ./_wks */ 12);

/***/ },
/* 37 */
/*!****************************************************************************************!*\
  !*** delegated ./node_modules/immutable/dist/immutable.js from dll-reference libs_lib ***!
  \****************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = (__webpack_require__(1))(34);

/***/ },
/* 38 */
/*!*******************************************!*\
  !*** ./~/core-js/library/modules/_cof.js ***!
  \*******************************************/
/***/ function(module, exports) {

	var toString = {}.toString;
	
	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};

/***/ },
/* 39 */
/*!*******************************************!*\
  !*** ./~/core-js/library/modules/_ctx.js ***!
  \*******************************************/
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(/*! ./_a-function */ 62);
	module.exports = function(fn, that, length){
	  aFunction(fn);
	  if(that === undefined)return fn;
	  switch(length){
	    case 1: return function(a){
	      return fn.call(that, a);
	    };
	    case 2: return function(a, b){
	      return fn.call(that, a, b);
	    };
	    case 3: return function(a, b, c){
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function(/* ...args */){
	    return fn.apply(that, arguments);
	  };
	};

/***/ },
/* 40 */
/*!**************************************************!*\
  !*** ./~/core-js/library/modules/_dom-create.js ***!
  \**************************************************/
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(/*! ./_is-object */ 15)
	  , document = __webpack_require__(/*! ./_global */ 3).document
	  // in old IE typeof document.createElement is 'object'
	  , is = isObject(document) && isObject(document.createElement);
	module.exports = function(it){
	  return is ? document.createElement(it) : {};
	};

/***/ },
/* 41 */
/*!******************************************************!*\
  !*** ./~/core-js/library/modules/_ie8-dom-define.js ***!
  \******************************************************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = !__webpack_require__(/*! ./_descriptors */ 9) && !__webpack_require__(/*! ./_fails */ 19)(function(){
	  return Object.defineProperty(__webpack_require__(/*! ./_dom-create */ 40)('div'), 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 42 */
/*!***************************************************!*\
  !*** ./~/core-js/library/modules/_iter-define.js ***!
  \***************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY        = __webpack_require__(/*! ./_library */ 27)
	  , $export        = __webpack_require__(/*! ./_export */ 18)
	  , redefine       = __webpack_require__(/*! ./_redefine */ 47)
	  , hide           = __webpack_require__(/*! ./_hide */ 10)
	  , has            = __webpack_require__(/*! ./_has */ 4)
	  , Iterators      = __webpack_require__(/*! ./_iterators */ 26)
	  , $iterCreate    = __webpack_require__(/*! ./_iter-create */ 69)
	  , setToStringTag = __webpack_require__(/*! ./_set-to-string-tag */ 30)
	  , getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ 75)
	  , ITERATOR       = __webpack_require__(/*! ./_wks */ 12)('iterator')
	  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
	  , FF_ITERATOR    = '@@iterator'
	  , KEYS           = 'keys'
	  , VALUES         = 'values';
	
	var returnThis = function(){ return this; };
	
	module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
	  $iterCreate(Constructor, NAME, next);
	  var getMethod = function(kind){
	    if(!BUGGY && kind in proto)return proto[kind];
	    switch(kind){
	      case KEYS: return function keys(){ return new Constructor(this, kind); };
	      case VALUES: return function values(){ return new Constructor(this, kind); };
	    } return function entries(){ return new Constructor(this, kind); };
	  };
	  var TAG        = NAME + ' Iterator'
	    , DEF_VALUES = DEFAULT == VALUES
	    , VALUES_BUG = false
	    , proto      = Base.prototype
	    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
	    , $default   = $native || getMethod(DEFAULT)
	    , $entries   = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined
	    , $anyNative = NAME == 'Array' ? proto.entries || $native : $native
	    , methods, key, IteratorPrototype;
	  // Fix native
	  if($anyNative){
	    IteratorPrototype = getPrototypeOf($anyNative.call(new Base));
	    if(IteratorPrototype !== Object.prototype){
	      // Set @@toStringTag to native iterators
	      setToStringTag(IteratorPrototype, TAG, true);
	      // fix for some old engines
	      if(!LIBRARY && !has(IteratorPrototype, ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
	    }
	  }
	  // fix Array#{values, @@iterator}.name in V8 / FF
	  if(DEF_VALUES && $native && $native.name !== VALUES){
	    VALUES_BUG = true;
	    $default = function values(){ return $native.call(this); };
	  }
	  // Define iterator
	  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
	    hide(proto, ITERATOR, $default);
	  }
	  // Plug for library
	  Iterators[NAME] = $default;
	  Iterators[TAG]  = returnThis;
	  if(DEFAULT){
	    methods = {
	      values:  DEF_VALUES ? $default : getMethod(VALUES),
	      keys:    IS_SET     ? $default : getMethod(KEYS),
	      entries: $entries
	    };
	    if(FORCED)for(key in methods){
	      if(!(key in proto))redefine(proto, key, methods[key]);
	    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
	  }
	  return methods;
	};

/***/ },
/* 43 */
/*!***************************************************!*\
  !*** ./~/core-js/library/modules/_object-gopd.js ***!
  \***************************************************/
/***/ function(module, exports, __webpack_require__) {

	var pIE            = __webpack_require__(/*! ./_object-pie */ 29)
	  , createDesc     = __webpack_require__(/*! ./_property-desc */ 21)
	  , toIObject      = __webpack_require__(/*! ./_to-iobject */ 5)
	  , toPrimitive    = __webpack_require__(/*! ./_to-primitive */ 34)
	  , has            = __webpack_require__(/*! ./_has */ 4)
	  , IE8_DOM_DEFINE = __webpack_require__(/*! ./_ie8-dom-define */ 41)
	  , gOPD           = Object.getOwnPropertyDescriptor;
	
	exports.f = __webpack_require__(/*! ./_descriptors */ 9) ? gOPD : function getOwnPropertyDescriptor(O, P){
	  O = toIObject(O);
	  P = toPrimitive(P, true);
	  if(IE8_DOM_DEFINE)try {
	    return gOPD(O, P);
	  } catch(e){ /* empty */ }
	  if(has(O, P))return createDesc(!pIE.f.call(O, P), O[P]);
	};

/***/ },
/* 44 */
/*!***************************************************!*\
  !*** ./~/core-js/library/modules/_object-gopn.js ***!
  \***************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
	var $keys      = __webpack_require__(/*! ./_object-keys-internal */ 46)
	  , hiddenKeys = __webpack_require__(/*! ./_enum-bug-keys */ 25).concat('length', 'prototype');
	
	exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O){
	  return $keys(O, hiddenKeys);
	};

/***/ },
/* 45 */
/*!***************************************************!*\
  !*** ./~/core-js/library/modules/_object-gops.js ***!
  \***************************************************/
/***/ function(module, exports) {

	exports.f = Object.getOwnPropertySymbols;

/***/ },
/* 46 */
/*!************************************************************!*\
  !*** ./~/core-js/library/modules/_object-keys-internal.js ***!
  \************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var has          = __webpack_require__(/*! ./_has */ 4)
	  , toIObject    = __webpack_require__(/*! ./_to-iobject */ 5)
	  , arrayIndexOf = __webpack_require__(/*! ./_array-includes */ 64)(false)
	  , IE_PROTO     = __webpack_require__(/*! ./_shared-key */ 31)('IE_PROTO');
	
	module.exports = function(object, names){
	  var O      = toIObject(object)
	    , i      = 0
	    , result = []
	    , key;
	  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while(names.length > i)if(has(O, key = names[i++])){
	    ~arrayIndexOf(result, key) || result.push(key);
	  }
	  return result;
	};

/***/ },
/* 47 */
/*!************************************************!*\
  !*** ./~/core-js/library/modules/_redefine.js ***!
  \************************************************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(/*! ./_hide */ 10);

/***/ },
/* 48 */
/*!****************************!*\
  !*** ./~/events/events.js ***!
  \****************************/
/***/ function(module, exports) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.
	
	function EventEmitter() {
	  this._events = this._events || {};
	  this._maxListeners = this._maxListeners || undefined;
	}
	module.exports = EventEmitter;
	
	// Backwards-compat with node 0.10.x
	EventEmitter.EventEmitter = EventEmitter;
	
	EventEmitter.prototype._events = undefined;
	EventEmitter.prototype._maxListeners = undefined;
	
	// By default EventEmitters will print a warning if more than 10 listeners are
	// added to it. This is a useful default which helps finding memory leaks.
	EventEmitter.defaultMaxListeners = 10;
	
	// Obviously not all Emitters should be limited to 10. This function allows
	// that to be increased. Set to zero for unlimited.
	EventEmitter.prototype.setMaxListeners = function(n) {
	  if (!isNumber(n) || n < 0 || isNaN(n))
	    throw TypeError('n must be a positive number');
	  this._maxListeners = n;
	  return this;
	};
	
	EventEmitter.prototype.emit = function(type) {
	  var er, handler, len, args, i, listeners;
	
	  if (!this._events)
	    this._events = {};
	
	  // If there is no 'error' event listener then throw.
	  if (type === 'error') {
	    if (!this._events.error ||
	        (isObject(this._events.error) && !this._events.error.length)) {
	      er = arguments[1];
	      if (er instanceof Error) {
	        throw er; // Unhandled 'error' event
	      } else {
	        // At least give some kind of context to the user
	        var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
	        err.context = er;
	        throw err;
	      }
	    }
	  }
	
	  handler = this._events[type];
	
	  if (isUndefined(handler))
	    return false;
	
	  if (isFunction(handler)) {
	    switch (arguments.length) {
	      // fast cases
	      case 1:
	        handler.call(this);
	        break;
	      case 2:
	        handler.call(this, arguments[1]);
	        break;
	      case 3:
	        handler.call(this, arguments[1], arguments[2]);
	        break;
	      // slower
	      default:
	        args = Array.prototype.slice.call(arguments, 1);
	        handler.apply(this, args);
	    }
	  } else if (isObject(handler)) {
	    args = Array.prototype.slice.call(arguments, 1);
	    listeners = handler.slice();
	    len = listeners.length;
	    for (i = 0; i < len; i++)
	      listeners[i].apply(this, args);
	  }
	
	  return true;
	};
	
	EventEmitter.prototype.addListener = function(type, listener) {
	  var m;
	
	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');
	
	  if (!this._events)
	    this._events = {};
	
	  // To avoid recursion in the case that type === "newListener"! Before
	  // adding it to the listeners, first emit "newListener".
	  if (this._events.newListener)
	    this.emit('newListener', type,
	              isFunction(listener.listener) ?
	              listener.listener : listener);
	
	  if (!this._events[type])
	    // Optimize the case of one listener. Don't need the extra array object.
	    this._events[type] = listener;
	  else if (isObject(this._events[type]))
	    // If we've already got an array, just append.
	    this._events[type].push(listener);
	  else
	    // Adding the second element, need to change to array.
	    this._events[type] = [this._events[type], listener];
	
	  // Check for listener leak
	  if (isObject(this._events[type]) && !this._events[type].warned) {
	    if (!isUndefined(this._maxListeners)) {
	      m = this._maxListeners;
	    } else {
	      m = EventEmitter.defaultMaxListeners;
	    }
	
	    if (m && m > 0 && this._events[type].length > m) {
	      this._events[type].warned = true;
	      console.error('(node) warning: possible EventEmitter memory ' +
	                    'leak detected. %d listeners added. ' +
	                    'Use emitter.setMaxListeners() to increase limit.',
	                    this._events[type].length);
	      if (typeof console.trace === 'function') {
	        // not supported in IE 10
	        console.trace();
	      }
	    }
	  }
	
	  return this;
	};
	
	EventEmitter.prototype.on = EventEmitter.prototype.addListener;
	
	EventEmitter.prototype.once = function(type, listener) {
	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');
	
	  var fired = false;
	
	  function g() {
	    this.removeListener(type, g);
	
	    if (!fired) {
	      fired = true;
	      listener.apply(this, arguments);
	    }
	  }
	
	  g.listener = listener;
	  this.on(type, g);
	
	  return this;
	};
	
	// emits a 'removeListener' event iff the listener was removed
	EventEmitter.prototype.removeListener = function(type, listener) {
	  var list, position, length, i;
	
	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');
	
	  if (!this._events || !this._events[type])
	    return this;
	
	  list = this._events[type];
	  length = list.length;
	  position = -1;
	
	  if (list === listener ||
	      (isFunction(list.listener) && list.listener === listener)) {
	    delete this._events[type];
	    if (this._events.removeListener)
	      this.emit('removeListener', type, listener);
	
	  } else if (isObject(list)) {
	    for (i = length; i-- > 0;) {
	      if (list[i] === listener ||
	          (list[i].listener && list[i].listener === listener)) {
	        position = i;
	        break;
	      }
	    }
	
	    if (position < 0)
	      return this;
	
	    if (list.length === 1) {
	      list.length = 0;
	      delete this._events[type];
	    } else {
	      list.splice(position, 1);
	    }
	
	    if (this._events.removeListener)
	      this.emit('removeListener', type, listener);
	  }
	
	  return this;
	};
	
	EventEmitter.prototype.removeAllListeners = function(type) {
	  var key, listeners;
	
	  if (!this._events)
	    return this;
	
	  // not listening for removeListener, no need to emit
	  if (!this._events.removeListener) {
	    if (arguments.length === 0)
	      this._events = {};
	    else if (this._events[type])
	      delete this._events[type];
	    return this;
	  }
	
	  // emit removeListener for all listeners on all events
	  if (arguments.length === 0) {
	    for (key in this._events) {
	      if (key === 'removeListener') continue;
	      this.removeAllListeners(key);
	    }
	    this.removeAllListeners('removeListener');
	    this._events = {};
	    return this;
	  }
	
	  listeners = this._events[type];
	
	  if (isFunction(listeners)) {
	    this.removeListener(type, listeners);
	  } else if (listeners) {
	    // LIFO order
	    while (listeners.length)
	      this.removeListener(type, listeners[listeners.length - 1]);
	  }
	  delete this._events[type];
	
	  return this;
	};
	
	EventEmitter.prototype.listeners = function(type) {
	  var ret;
	  if (!this._events || !this._events[type])
	    ret = [];
	  else if (isFunction(this._events[type]))
	    ret = [this._events[type]];
	  else
	    ret = this._events[type].slice();
	  return ret;
	};
	
	EventEmitter.prototype.listenerCount = function(type) {
	  if (this._events) {
	    var evlistener = this._events[type];
	
	    if (isFunction(evlistener))
	      return 1;
	    else if (evlistener)
	      return evlistener.length;
	  }
	  return 0;
	};
	
	EventEmitter.listenerCount = function(emitter, type) {
	  return emitter.listenerCount(type);
	};
	
	function isFunction(arg) {
	  return typeof arg === 'function';
	}
	
	function isNumber(arg) {
	  return typeof arg === 'number';
	}
	
	function isObject(arg) {
	  return typeof arg === 'object' && arg !== null;
	}
	
	function isUndefined(arg) {
	  return arg === void 0;
	}


/***/ },
/* 49 */
/*!***********************************************!*\
  !*** ./~/html-entities/lib/html5-entities.js ***!
  \***********************************************/
/***/ function(module, exports) {

	var ENTITIES = [['Aacute', [193]], ['aacute', [225]], ['Abreve', [258]], ['abreve', [259]], ['ac', [8766]], ['acd', [8767]], ['acE', [8766, 819]], ['Acirc', [194]], ['acirc', [226]], ['acute', [180]], ['Acy', [1040]], ['acy', [1072]], ['AElig', [198]], ['aelig', [230]], ['af', [8289]], ['Afr', [120068]], ['afr', [120094]], ['Agrave', [192]], ['agrave', [224]], ['alefsym', [8501]], ['aleph', [8501]], ['Alpha', [913]], ['alpha', [945]], ['Amacr', [256]], ['amacr', [257]], ['amalg', [10815]], ['amp', [38]], ['AMP', [38]], ['andand', [10837]], ['And', [10835]], ['and', [8743]], ['andd', [10844]], ['andslope', [10840]], ['andv', [10842]], ['ang', [8736]], ['ange', [10660]], ['angle', [8736]], ['angmsdaa', [10664]], ['angmsdab', [10665]], ['angmsdac', [10666]], ['angmsdad', [10667]], ['angmsdae', [10668]], ['angmsdaf', [10669]], ['angmsdag', [10670]], ['angmsdah', [10671]], ['angmsd', [8737]], ['angrt', [8735]], ['angrtvb', [8894]], ['angrtvbd', [10653]], ['angsph', [8738]], ['angst', [197]], ['angzarr', [9084]], ['Aogon', [260]], ['aogon', [261]], ['Aopf', [120120]], ['aopf', [120146]], ['apacir', [10863]], ['ap', [8776]], ['apE', [10864]], ['ape', [8778]], ['apid', [8779]], ['apos', [39]], ['ApplyFunction', [8289]], ['approx', [8776]], ['approxeq', [8778]], ['Aring', [197]], ['aring', [229]], ['Ascr', [119964]], ['ascr', [119990]], ['Assign', [8788]], ['ast', [42]], ['asymp', [8776]], ['asympeq', [8781]], ['Atilde', [195]], ['atilde', [227]], ['Auml', [196]], ['auml', [228]], ['awconint', [8755]], ['awint', [10769]], ['backcong', [8780]], ['backepsilon', [1014]], ['backprime', [8245]], ['backsim', [8765]], ['backsimeq', [8909]], ['Backslash', [8726]], ['Barv', [10983]], ['barvee', [8893]], ['barwed', [8965]], ['Barwed', [8966]], ['barwedge', [8965]], ['bbrk', [9141]], ['bbrktbrk', [9142]], ['bcong', [8780]], ['Bcy', [1041]], ['bcy', [1073]], ['bdquo', [8222]], ['becaus', [8757]], ['because', [8757]], ['Because', [8757]], ['bemptyv', [10672]], ['bepsi', [1014]], ['bernou', [8492]], ['Bernoullis', [8492]], ['Beta', [914]], ['beta', [946]], ['beth', [8502]], ['between', [8812]], ['Bfr', [120069]], ['bfr', [120095]], ['bigcap', [8898]], ['bigcirc', [9711]], ['bigcup', [8899]], ['bigodot', [10752]], ['bigoplus', [10753]], ['bigotimes', [10754]], ['bigsqcup', [10758]], ['bigstar', [9733]], ['bigtriangledown', [9661]], ['bigtriangleup', [9651]], ['biguplus', [10756]], ['bigvee', [8897]], ['bigwedge', [8896]], ['bkarow', [10509]], ['blacklozenge', [10731]], ['blacksquare', [9642]], ['blacktriangle', [9652]], ['blacktriangledown', [9662]], ['blacktriangleleft', [9666]], ['blacktriangleright', [9656]], ['blank', [9251]], ['blk12', [9618]], ['blk14', [9617]], ['blk34', [9619]], ['block', [9608]], ['bne', [61, 8421]], ['bnequiv', [8801, 8421]], ['bNot', [10989]], ['bnot', [8976]], ['Bopf', [120121]], ['bopf', [120147]], ['bot', [8869]], ['bottom', [8869]], ['bowtie', [8904]], ['boxbox', [10697]], ['boxdl', [9488]], ['boxdL', [9557]], ['boxDl', [9558]], ['boxDL', [9559]], ['boxdr', [9484]], ['boxdR', [9554]], ['boxDr', [9555]], ['boxDR', [9556]], ['boxh', [9472]], ['boxH', [9552]], ['boxhd', [9516]], ['boxHd', [9572]], ['boxhD', [9573]], ['boxHD', [9574]], ['boxhu', [9524]], ['boxHu', [9575]], ['boxhU', [9576]], ['boxHU', [9577]], ['boxminus', [8863]], ['boxplus', [8862]], ['boxtimes', [8864]], ['boxul', [9496]], ['boxuL', [9563]], ['boxUl', [9564]], ['boxUL', [9565]], ['boxur', [9492]], ['boxuR', [9560]], ['boxUr', [9561]], ['boxUR', [9562]], ['boxv', [9474]], ['boxV', [9553]], ['boxvh', [9532]], ['boxvH', [9578]], ['boxVh', [9579]], ['boxVH', [9580]], ['boxvl', [9508]], ['boxvL', [9569]], ['boxVl', [9570]], ['boxVL', [9571]], ['boxvr', [9500]], ['boxvR', [9566]], ['boxVr', [9567]], ['boxVR', [9568]], ['bprime', [8245]], ['breve', [728]], ['Breve', [728]], ['brvbar', [166]], ['bscr', [119991]], ['Bscr', [8492]], ['bsemi', [8271]], ['bsim', [8765]], ['bsime', [8909]], ['bsolb', [10693]], ['bsol', [92]], ['bsolhsub', [10184]], ['bull', [8226]], ['bullet', [8226]], ['bump', [8782]], ['bumpE', [10926]], ['bumpe', [8783]], ['Bumpeq', [8782]], ['bumpeq', [8783]], ['Cacute', [262]], ['cacute', [263]], ['capand', [10820]], ['capbrcup', [10825]], ['capcap', [10827]], ['cap', [8745]], ['Cap', [8914]], ['capcup', [10823]], ['capdot', [10816]], ['CapitalDifferentialD', [8517]], ['caps', [8745, 65024]], ['caret', [8257]], ['caron', [711]], ['Cayleys', [8493]], ['ccaps', [10829]], ['Ccaron', [268]], ['ccaron', [269]], ['Ccedil', [199]], ['ccedil', [231]], ['Ccirc', [264]], ['ccirc', [265]], ['Cconint', [8752]], ['ccups', [10828]], ['ccupssm', [10832]], ['Cdot', [266]], ['cdot', [267]], ['cedil', [184]], ['Cedilla', [184]], ['cemptyv', [10674]], ['cent', [162]], ['centerdot', [183]], ['CenterDot', [183]], ['cfr', [120096]], ['Cfr', [8493]], ['CHcy', [1063]], ['chcy', [1095]], ['check', [10003]], ['checkmark', [10003]], ['Chi', [935]], ['chi', [967]], ['circ', [710]], ['circeq', [8791]], ['circlearrowleft', [8634]], ['circlearrowright', [8635]], ['circledast', [8859]], ['circledcirc', [8858]], ['circleddash', [8861]], ['CircleDot', [8857]], ['circledR', [174]], ['circledS', [9416]], ['CircleMinus', [8854]], ['CirclePlus', [8853]], ['CircleTimes', [8855]], ['cir', [9675]], ['cirE', [10691]], ['cire', [8791]], ['cirfnint', [10768]], ['cirmid', [10991]], ['cirscir', [10690]], ['ClockwiseContourIntegral', [8754]], ['CloseCurlyDoubleQuote', [8221]], ['CloseCurlyQuote', [8217]], ['clubs', [9827]], ['clubsuit', [9827]], ['colon', [58]], ['Colon', [8759]], ['Colone', [10868]], ['colone', [8788]], ['coloneq', [8788]], ['comma', [44]], ['commat', [64]], ['comp', [8705]], ['compfn', [8728]], ['complement', [8705]], ['complexes', [8450]], ['cong', [8773]], ['congdot', [10861]], ['Congruent', [8801]], ['conint', [8750]], ['Conint', [8751]], ['ContourIntegral', [8750]], ['copf', [120148]], ['Copf', [8450]], ['coprod', [8720]], ['Coproduct', [8720]], ['copy', [169]], ['COPY', [169]], ['copysr', [8471]], ['CounterClockwiseContourIntegral', [8755]], ['crarr', [8629]], ['cross', [10007]], ['Cross', [10799]], ['Cscr', [119966]], ['cscr', [119992]], ['csub', [10959]], ['csube', [10961]], ['csup', [10960]], ['csupe', [10962]], ['ctdot', [8943]], ['cudarrl', [10552]], ['cudarrr', [10549]], ['cuepr', [8926]], ['cuesc', [8927]], ['cularr', [8630]], ['cularrp', [10557]], ['cupbrcap', [10824]], ['cupcap', [10822]], ['CupCap', [8781]], ['cup', [8746]], ['Cup', [8915]], ['cupcup', [10826]], ['cupdot', [8845]], ['cupor', [10821]], ['cups', [8746, 65024]], ['curarr', [8631]], ['curarrm', [10556]], ['curlyeqprec', [8926]], ['curlyeqsucc', [8927]], ['curlyvee', [8910]], ['curlywedge', [8911]], ['curren', [164]], ['curvearrowleft', [8630]], ['curvearrowright', [8631]], ['cuvee', [8910]], ['cuwed', [8911]], ['cwconint', [8754]], ['cwint', [8753]], ['cylcty', [9005]], ['dagger', [8224]], ['Dagger', [8225]], ['daleth', [8504]], ['darr', [8595]], ['Darr', [8609]], ['dArr', [8659]], ['dash', [8208]], ['Dashv', [10980]], ['dashv', [8867]], ['dbkarow', [10511]], ['dblac', [733]], ['Dcaron', [270]], ['dcaron', [271]], ['Dcy', [1044]], ['dcy', [1076]], ['ddagger', [8225]], ['ddarr', [8650]], ['DD', [8517]], ['dd', [8518]], ['DDotrahd', [10513]], ['ddotseq', [10871]], ['deg', [176]], ['Del', [8711]], ['Delta', [916]], ['delta', [948]], ['demptyv', [10673]], ['dfisht', [10623]], ['Dfr', [120071]], ['dfr', [120097]], ['dHar', [10597]], ['dharl', [8643]], ['dharr', [8642]], ['DiacriticalAcute', [180]], ['DiacriticalDot', [729]], ['DiacriticalDoubleAcute', [733]], ['DiacriticalGrave', [96]], ['DiacriticalTilde', [732]], ['diam', [8900]], ['diamond', [8900]], ['Diamond', [8900]], ['diamondsuit', [9830]], ['diams', [9830]], ['die', [168]], ['DifferentialD', [8518]], ['digamma', [989]], ['disin', [8946]], ['div', [247]], ['divide', [247]], ['divideontimes', [8903]], ['divonx', [8903]], ['DJcy', [1026]], ['djcy', [1106]], ['dlcorn', [8990]], ['dlcrop', [8973]], ['dollar', [36]], ['Dopf', [120123]], ['dopf', [120149]], ['Dot', [168]], ['dot', [729]], ['DotDot', [8412]], ['doteq', [8784]], ['doteqdot', [8785]], ['DotEqual', [8784]], ['dotminus', [8760]], ['dotplus', [8724]], ['dotsquare', [8865]], ['doublebarwedge', [8966]], ['DoubleContourIntegral', [8751]], ['DoubleDot', [168]], ['DoubleDownArrow', [8659]], ['DoubleLeftArrow', [8656]], ['DoubleLeftRightArrow', [8660]], ['DoubleLeftTee', [10980]], ['DoubleLongLeftArrow', [10232]], ['DoubleLongLeftRightArrow', [10234]], ['DoubleLongRightArrow', [10233]], ['DoubleRightArrow', [8658]], ['DoubleRightTee', [8872]], ['DoubleUpArrow', [8657]], ['DoubleUpDownArrow', [8661]], ['DoubleVerticalBar', [8741]], ['DownArrowBar', [10515]], ['downarrow', [8595]], ['DownArrow', [8595]], ['Downarrow', [8659]], ['DownArrowUpArrow', [8693]], ['DownBreve', [785]], ['downdownarrows', [8650]], ['downharpoonleft', [8643]], ['downharpoonright', [8642]], ['DownLeftRightVector', [10576]], ['DownLeftTeeVector', [10590]], ['DownLeftVectorBar', [10582]], ['DownLeftVector', [8637]], ['DownRightTeeVector', [10591]], ['DownRightVectorBar', [10583]], ['DownRightVector', [8641]], ['DownTeeArrow', [8615]], ['DownTee', [8868]], ['drbkarow', [10512]], ['drcorn', [8991]], ['drcrop', [8972]], ['Dscr', [119967]], ['dscr', [119993]], ['DScy', [1029]], ['dscy', [1109]], ['dsol', [10742]], ['Dstrok', [272]], ['dstrok', [273]], ['dtdot', [8945]], ['dtri', [9663]], ['dtrif', [9662]], ['duarr', [8693]], ['duhar', [10607]], ['dwangle', [10662]], ['DZcy', [1039]], ['dzcy', [1119]], ['dzigrarr', [10239]], ['Eacute', [201]], ['eacute', [233]], ['easter', [10862]], ['Ecaron', [282]], ['ecaron', [283]], ['Ecirc', [202]], ['ecirc', [234]], ['ecir', [8790]], ['ecolon', [8789]], ['Ecy', [1069]], ['ecy', [1101]], ['eDDot', [10871]], ['Edot', [278]], ['edot', [279]], ['eDot', [8785]], ['ee', [8519]], ['efDot', [8786]], ['Efr', [120072]], ['efr', [120098]], ['eg', [10906]], ['Egrave', [200]], ['egrave', [232]], ['egs', [10902]], ['egsdot', [10904]], ['el', [10905]], ['Element', [8712]], ['elinters', [9191]], ['ell', [8467]], ['els', [10901]], ['elsdot', [10903]], ['Emacr', [274]], ['emacr', [275]], ['empty', [8709]], ['emptyset', [8709]], ['EmptySmallSquare', [9723]], ['emptyv', [8709]], ['EmptyVerySmallSquare', [9643]], ['emsp13', [8196]], ['emsp14', [8197]], ['emsp', [8195]], ['ENG', [330]], ['eng', [331]], ['ensp', [8194]], ['Eogon', [280]], ['eogon', [281]], ['Eopf', [120124]], ['eopf', [120150]], ['epar', [8917]], ['eparsl', [10723]], ['eplus', [10865]], ['epsi', [949]], ['Epsilon', [917]], ['epsilon', [949]], ['epsiv', [1013]], ['eqcirc', [8790]], ['eqcolon', [8789]], ['eqsim', [8770]], ['eqslantgtr', [10902]], ['eqslantless', [10901]], ['Equal', [10869]], ['equals', [61]], ['EqualTilde', [8770]], ['equest', [8799]], ['Equilibrium', [8652]], ['equiv', [8801]], ['equivDD', [10872]], ['eqvparsl', [10725]], ['erarr', [10609]], ['erDot', [8787]], ['escr', [8495]], ['Escr', [8496]], ['esdot', [8784]], ['Esim', [10867]], ['esim', [8770]], ['Eta', [919]], ['eta', [951]], ['ETH', [208]], ['eth', [240]], ['Euml', [203]], ['euml', [235]], ['euro', [8364]], ['excl', [33]], ['exist', [8707]], ['Exists', [8707]], ['expectation', [8496]], ['exponentiale', [8519]], ['ExponentialE', [8519]], ['fallingdotseq', [8786]], ['Fcy', [1060]], ['fcy', [1092]], ['female', [9792]], ['ffilig', [64259]], ['fflig', [64256]], ['ffllig', [64260]], ['Ffr', [120073]], ['ffr', [120099]], ['filig', [64257]], ['FilledSmallSquare', [9724]], ['FilledVerySmallSquare', [9642]], ['fjlig', [102, 106]], ['flat', [9837]], ['fllig', [64258]], ['fltns', [9649]], ['fnof', [402]], ['Fopf', [120125]], ['fopf', [120151]], ['forall', [8704]], ['ForAll', [8704]], ['fork', [8916]], ['forkv', [10969]], ['Fouriertrf', [8497]], ['fpartint', [10765]], ['frac12', [189]], ['frac13', [8531]], ['frac14', [188]], ['frac15', [8533]], ['frac16', [8537]], ['frac18', [8539]], ['frac23', [8532]], ['frac25', [8534]], ['frac34', [190]], ['frac35', [8535]], ['frac38', [8540]], ['frac45', [8536]], ['frac56', [8538]], ['frac58', [8541]], ['frac78', [8542]], ['frasl', [8260]], ['frown', [8994]], ['fscr', [119995]], ['Fscr', [8497]], ['gacute', [501]], ['Gamma', [915]], ['gamma', [947]], ['Gammad', [988]], ['gammad', [989]], ['gap', [10886]], ['Gbreve', [286]], ['gbreve', [287]], ['Gcedil', [290]], ['Gcirc', [284]], ['gcirc', [285]], ['Gcy', [1043]], ['gcy', [1075]], ['Gdot', [288]], ['gdot', [289]], ['ge', [8805]], ['gE', [8807]], ['gEl', [10892]], ['gel', [8923]], ['geq', [8805]], ['geqq', [8807]], ['geqslant', [10878]], ['gescc', [10921]], ['ges', [10878]], ['gesdot', [10880]], ['gesdoto', [10882]], ['gesdotol', [10884]], ['gesl', [8923, 65024]], ['gesles', [10900]], ['Gfr', [120074]], ['gfr', [120100]], ['gg', [8811]], ['Gg', [8921]], ['ggg', [8921]], ['gimel', [8503]], ['GJcy', [1027]], ['gjcy', [1107]], ['gla', [10917]], ['gl', [8823]], ['glE', [10898]], ['glj', [10916]], ['gnap', [10890]], ['gnapprox', [10890]], ['gne', [10888]], ['gnE', [8809]], ['gneq', [10888]], ['gneqq', [8809]], ['gnsim', [8935]], ['Gopf', [120126]], ['gopf', [120152]], ['grave', [96]], ['GreaterEqual', [8805]], ['GreaterEqualLess', [8923]], ['GreaterFullEqual', [8807]], ['GreaterGreater', [10914]], ['GreaterLess', [8823]], ['GreaterSlantEqual', [10878]], ['GreaterTilde', [8819]], ['Gscr', [119970]], ['gscr', [8458]], ['gsim', [8819]], ['gsime', [10894]], ['gsiml', [10896]], ['gtcc', [10919]], ['gtcir', [10874]], ['gt', [62]], ['GT', [62]], ['Gt', [8811]], ['gtdot', [8919]], ['gtlPar', [10645]], ['gtquest', [10876]], ['gtrapprox', [10886]], ['gtrarr', [10616]], ['gtrdot', [8919]], ['gtreqless', [8923]], ['gtreqqless', [10892]], ['gtrless', [8823]], ['gtrsim', [8819]], ['gvertneqq', [8809, 65024]], ['gvnE', [8809, 65024]], ['Hacek', [711]], ['hairsp', [8202]], ['half', [189]], ['hamilt', [8459]], ['HARDcy', [1066]], ['hardcy', [1098]], ['harrcir', [10568]], ['harr', [8596]], ['hArr', [8660]], ['harrw', [8621]], ['Hat', [94]], ['hbar', [8463]], ['Hcirc', [292]], ['hcirc', [293]], ['hearts', [9829]], ['heartsuit', [9829]], ['hellip', [8230]], ['hercon', [8889]], ['hfr', [120101]], ['Hfr', [8460]], ['HilbertSpace', [8459]], ['hksearow', [10533]], ['hkswarow', [10534]], ['hoarr', [8703]], ['homtht', [8763]], ['hookleftarrow', [8617]], ['hookrightarrow', [8618]], ['hopf', [120153]], ['Hopf', [8461]], ['horbar', [8213]], ['HorizontalLine', [9472]], ['hscr', [119997]], ['Hscr', [8459]], ['hslash', [8463]], ['Hstrok', [294]], ['hstrok', [295]], ['HumpDownHump', [8782]], ['HumpEqual', [8783]], ['hybull', [8259]], ['hyphen', [8208]], ['Iacute', [205]], ['iacute', [237]], ['ic', [8291]], ['Icirc', [206]], ['icirc', [238]], ['Icy', [1048]], ['icy', [1080]], ['Idot', [304]], ['IEcy', [1045]], ['iecy', [1077]], ['iexcl', [161]], ['iff', [8660]], ['ifr', [120102]], ['Ifr', [8465]], ['Igrave', [204]], ['igrave', [236]], ['ii', [8520]], ['iiiint', [10764]], ['iiint', [8749]], ['iinfin', [10716]], ['iiota', [8489]], ['IJlig', [306]], ['ijlig', [307]], ['Imacr', [298]], ['imacr', [299]], ['image', [8465]], ['ImaginaryI', [8520]], ['imagline', [8464]], ['imagpart', [8465]], ['imath', [305]], ['Im', [8465]], ['imof', [8887]], ['imped', [437]], ['Implies', [8658]], ['incare', [8453]], ['in', [8712]], ['infin', [8734]], ['infintie', [10717]], ['inodot', [305]], ['intcal', [8890]], ['int', [8747]], ['Int', [8748]], ['integers', [8484]], ['Integral', [8747]], ['intercal', [8890]], ['Intersection', [8898]], ['intlarhk', [10775]], ['intprod', [10812]], ['InvisibleComma', [8291]], ['InvisibleTimes', [8290]], ['IOcy', [1025]], ['iocy', [1105]], ['Iogon', [302]], ['iogon', [303]], ['Iopf', [120128]], ['iopf', [120154]], ['Iota', [921]], ['iota', [953]], ['iprod', [10812]], ['iquest', [191]], ['iscr', [119998]], ['Iscr', [8464]], ['isin', [8712]], ['isindot', [8949]], ['isinE', [8953]], ['isins', [8948]], ['isinsv', [8947]], ['isinv', [8712]], ['it', [8290]], ['Itilde', [296]], ['itilde', [297]], ['Iukcy', [1030]], ['iukcy', [1110]], ['Iuml', [207]], ['iuml', [239]], ['Jcirc', [308]], ['jcirc', [309]], ['Jcy', [1049]], ['jcy', [1081]], ['Jfr', [120077]], ['jfr', [120103]], ['jmath', [567]], ['Jopf', [120129]], ['jopf', [120155]], ['Jscr', [119973]], ['jscr', [119999]], ['Jsercy', [1032]], ['jsercy', [1112]], ['Jukcy', [1028]], ['jukcy', [1108]], ['Kappa', [922]], ['kappa', [954]], ['kappav', [1008]], ['Kcedil', [310]], ['kcedil', [311]], ['Kcy', [1050]], ['kcy', [1082]], ['Kfr', [120078]], ['kfr', [120104]], ['kgreen', [312]], ['KHcy', [1061]], ['khcy', [1093]], ['KJcy', [1036]], ['kjcy', [1116]], ['Kopf', [120130]], ['kopf', [120156]], ['Kscr', [119974]], ['kscr', [120000]], ['lAarr', [8666]], ['Lacute', [313]], ['lacute', [314]], ['laemptyv', [10676]], ['lagran', [8466]], ['Lambda', [923]], ['lambda', [955]], ['lang', [10216]], ['Lang', [10218]], ['langd', [10641]], ['langle', [10216]], ['lap', [10885]], ['Laplacetrf', [8466]], ['laquo', [171]], ['larrb', [8676]], ['larrbfs', [10527]], ['larr', [8592]], ['Larr', [8606]], ['lArr', [8656]], ['larrfs', [10525]], ['larrhk', [8617]], ['larrlp', [8619]], ['larrpl', [10553]], ['larrsim', [10611]], ['larrtl', [8610]], ['latail', [10521]], ['lAtail', [10523]], ['lat', [10923]], ['late', [10925]], ['lates', [10925, 65024]], ['lbarr', [10508]], ['lBarr', [10510]], ['lbbrk', [10098]], ['lbrace', [123]], ['lbrack', [91]], ['lbrke', [10635]], ['lbrksld', [10639]], ['lbrkslu', [10637]], ['Lcaron', [317]], ['lcaron', [318]], ['Lcedil', [315]], ['lcedil', [316]], ['lceil', [8968]], ['lcub', [123]], ['Lcy', [1051]], ['lcy', [1083]], ['ldca', [10550]], ['ldquo', [8220]], ['ldquor', [8222]], ['ldrdhar', [10599]], ['ldrushar', [10571]], ['ldsh', [8626]], ['le', [8804]], ['lE', [8806]], ['LeftAngleBracket', [10216]], ['LeftArrowBar', [8676]], ['leftarrow', [8592]], ['LeftArrow', [8592]], ['Leftarrow', [8656]], ['LeftArrowRightArrow', [8646]], ['leftarrowtail', [8610]], ['LeftCeiling', [8968]], ['LeftDoubleBracket', [10214]], ['LeftDownTeeVector', [10593]], ['LeftDownVectorBar', [10585]], ['LeftDownVector', [8643]], ['LeftFloor', [8970]], ['leftharpoondown', [8637]], ['leftharpoonup', [8636]], ['leftleftarrows', [8647]], ['leftrightarrow', [8596]], ['LeftRightArrow', [8596]], ['Leftrightarrow', [8660]], ['leftrightarrows', [8646]], ['leftrightharpoons', [8651]], ['leftrightsquigarrow', [8621]], ['LeftRightVector', [10574]], ['LeftTeeArrow', [8612]], ['LeftTee', [8867]], ['LeftTeeVector', [10586]], ['leftthreetimes', [8907]], ['LeftTriangleBar', [10703]], ['LeftTriangle', [8882]], ['LeftTriangleEqual', [8884]], ['LeftUpDownVector', [10577]], ['LeftUpTeeVector', [10592]], ['LeftUpVectorBar', [10584]], ['LeftUpVector', [8639]], ['LeftVectorBar', [10578]], ['LeftVector', [8636]], ['lEg', [10891]], ['leg', [8922]], ['leq', [8804]], ['leqq', [8806]], ['leqslant', [10877]], ['lescc', [10920]], ['les', [10877]], ['lesdot', [10879]], ['lesdoto', [10881]], ['lesdotor', [10883]], ['lesg', [8922, 65024]], ['lesges', [10899]], ['lessapprox', [10885]], ['lessdot', [8918]], ['lesseqgtr', [8922]], ['lesseqqgtr', [10891]], ['LessEqualGreater', [8922]], ['LessFullEqual', [8806]], ['LessGreater', [8822]], ['lessgtr', [8822]], ['LessLess', [10913]], ['lesssim', [8818]], ['LessSlantEqual', [10877]], ['LessTilde', [8818]], ['lfisht', [10620]], ['lfloor', [8970]], ['Lfr', [120079]], ['lfr', [120105]], ['lg', [8822]], ['lgE', [10897]], ['lHar', [10594]], ['lhard', [8637]], ['lharu', [8636]], ['lharul', [10602]], ['lhblk', [9604]], ['LJcy', [1033]], ['ljcy', [1113]], ['llarr', [8647]], ['ll', [8810]], ['Ll', [8920]], ['llcorner', [8990]], ['Lleftarrow', [8666]], ['llhard', [10603]], ['lltri', [9722]], ['Lmidot', [319]], ['lmidot', [320]], ['lmoustache', [9136]], ['lmoust', [9136]], ['lnap', [10889]], ['lnapprox', [10889]], ['lne', [10887]], ['lnE', [8808]], ['lneq', [10887]], ['lneqq', [8808]], ['lnsim', [8934]], ['loang', [10220]], ['loarr', [8701]], ['lobrk', [10214]], ['longleftarrow', [10229]], ['LongLeftArrow', [10229]], ['Longleftarrow', [10232]], ['longleftrightarrow', [10231]], ['LongLeftRightArrow', [10231]], ['Longleftrightarrow', [10234]], ['longmapsto', [10236]], ['longrightarrow', [10230]], ['LongRightArrow', [10230]], ['Longrightarrow', [10233]], ['looparrowleft', [8619]], ['looparrowright', [8620]], ['lopar', [10629]], ['Lopf', [120131]], ['lopf', [120157]], ['loplus', [10797]], ['lotimes', [10804]], ['lowast', [8727]], ['lowbar', [95]], ['LowerLeftArrow', [8601]], ['LowerRightArrow', [8600]], ['loz', [9674]], ['lozenge', [9674]], ['lozf', [10731]], ['lpar', [40]], ['lparlt', [10643]], ['lrarr', [8646]], ['lrcorner', [8991]], ['lrhar', [8651]], ['lrhard', [10605]], ['lrm', [8206]], ['lrtri', [8895]], ['lsaquo', [8249]], ['lscr', [120001]], ['Lscr', [8466]], ['lsh', [8624]], ['Lsh', [8624]], ['lsim', [8818]], ['lsime', [10893]], ['lsimg', [10895]], ['lsqb', [91]], ['lsquo', [8216]], ['lsquor', [8218]], ['Lstrok', [321]], ['lstrok', [322]], ['ltcc', [10918]], ['ltcir', [10873]], ['lt', [60]], ['LT', [60]], ['Lt', [8810]], ['ltdot', [8918]], ['lthree', [8907]], ['ltimes', [8905]], ['ltlarr', [10614]], ['ltquest', [10875]], ['ltri', [9667]], ['ltrie', [8884]], ['ltrif', [9666]], ['ltrPar', [10646]], ['lurdshar', [10570]], ['luruhar', [10598]], ['lvertneqq', [8808, 65024]], ['lvnE', [8808, 65024]], ['macr', [175]], ['male', [9794]], ['malt', [10016]], ['maltese', [10016]], ['Map', [10501]], ['map', [8614]], ['mapsto', [8614]], ['mapstodown', [8615]], ['mapstoleft', [8612]], ['mapstoup', [8613]], ['marker', [9646]], ['mcomma', [10793]], ['Mcy', [1052]], ['mcy', [1084]], ['mdash', [8212]], ['mDDot', [8762]], ['measuredangle', [8737]], ['MediumSpace', [8287]], ['Mellintrf', [8499]], ['Mfr', [120080]], ['mfr', [120106]], ['mho', [8487]], ['micro', [181]], ['midast', [42]], ['midcir', [10992]], ['mid', [8739]], ['middot', [183]], ['minusb', [8863]], ['minus', [8722]], ['minusd', [8760]], ['minusdu', [10794]], ['MinusPlus', [8723]], ['mlcp', [10971]], ['mldr', [8230]], ['mnplus', [8723]], ['models', [8871]], ['Mopf', [120132]], ['mopf', [120158]], ['mp', [8723]], ['mscr', [120002]], ['Mscr', [8499]], ['mstpos', [8766]], ['Mu', [924]], ['mu', [956]], ['multimap', [8888]], ['mumap', [8888]], ['nabla', [8711]], ['Nacute', [323]], ['nacute', [324]], ['nang', [8736, 8402]], ['nap', [8777]], ['napE', [10864, 824]], ['napid', [8779, 824]], ['napos', [329]], ['napprox', [8777]], ['natural', [9838]], ['naturals', [8469]], ['natur', [9838]], ['nbsp', [160]], ['nbump', [8782, 824]], ['nbumpe', [8783, 824]], ['ncap', [10819]], ['Ncaron', [327]], ['ncaron', [328]], ['Ncedil', [325]], ['ncedil', [326]], ['ncong', [8775]], ['ncongdot', [10861, 824]], ['ncup', [10818]], ['Ncy', [1053]], ['ncy', [1085]], ['ndash', [8211]], ['nearhk', [10532]], ['nearr', [8599]], ['neArr', [8663]], ['nearrow', [8599]], ['ne', [8800]], ['nedot', [8784, 824]], ['NegativeMediumSpace', [8203]], ['NegativeThickSpace', [8203]], ['NegativeThinSpace', [8203]], ['NegativeVeryThinSpace', [8203]], ['nequiv', [8802]], ['nesear', [10536]], ['nesim', [8770, 824]], ['NestedGreaterGreater', [8811]], ['NestedLessLess', [8810]], ['nexist', [8708]], ['nexists', [8708]], ['Nfr', [120081]], ['nfr', [120107]], ['ngE', [8807, 824]], ['nge', [8817]], ['ngeq', [8817]], ['ngeqq', [8807, 824]], ['ngeqslant', [10878, 824]], ['nges', [10878, 824]], ['nGg', [8921, 824]], ['ngsim', [8821]], ['nGt', [8811, 8402]], ['ngt', [8815]], ['ngtr', [8815]], ['nGtv', [8811, 824]], ['nharr', [8622]], ['nhArr', [8654]], ['nhpar', [10994]], ['ni', [8715]], ['nis', [8956]], ['nisd', [8954]], ['niv', [8715]], ['NJcy', [1034]], ['njcy', [1114]], ['nlarr', [8602]], ['nlArr', [8653]], ['nldr', [8229]], ['nlE', [8806, 824]], ['nle', [8816]], ['nleftarrow', [8602]], ['nLeftarrow', [8653]], ['nleftrightarrow', [8622]], ['nLeftrightarrow', [8654]], ['nleq', [8816]], ['nleqq', [8806, 824]], ['nleqslant', [10877, 824]], ['nles', [10877, 824]], ['nless', [8814]], ['nLl', [8920, 824]], ['nlsim', [8820]], ['nLt', [8810, 8402]], ['nlt', [8814]], ['nltri', [8938]], ['nltrie', [8940]], ['nLtv', [8810, 824]], ['nmid', [8740]], ['NoBreak', [8288]], ['NonBreakingSpace', [160]], ['nopf', [120159]], ['Nopf', [8469]], ['Not', [10988]], ['not', [172]], ['NotCongruent', [8802]], ['NotCupCap', [8813]], ['NotDoubleVerticalBar', [8742]], ['NotElement', [8713]], ['NotEqual', [8800]], ['NotEqualTilde', [8770, 824]], ['NotExists', [8708]], ['NotGreater', [8815]], ['NotGreaterEqual', [8817]], ['NotGreaterFullEqual', [8807, 824]], ['NotGreaterGreater', [8811, 824]], ['NotGreaterLess', [8825]], ['NotGreaterSlantEqual', [10878, 824]], ['NotGreaterTilde', [8821]], ['NotHumpDownHump', [8782, 824]], ['NotHumpEqual', [8783, 824]], ['notin', [8713]], ['notindot', [8949, 824]], ['notinE', [8953, 824]], ['notinva', [8713]], ['notinvb', [8951]], ['notinvc', [8950]], ['NotLeftTriangleBar', [10703, 824]], ['NotLeftTriangle', [8938]], ['NotLeftTriangleEqual', [8940]], ['NotLess', [8814]], ['NotLessEqual', [8816]], ['NotLessGreater', [8824]], ['NotLessLess', [8810, 824]], ['NotLessSlantEqual', [10877, 824]], ['NotLessTilde', [8820]], ['NotNestedGreaterGreater', [10914, 824]], ['NotNestedLessLess', [10913, 824]], ['notni', [8716]], ['notniva', [8716]], ['notnivb', [8958]], ['notnivc', [8957]], ['NotPrecedes', [8832]], ['NotPrecedesEqual', [10927, 824]], ['NotPrecedesSlantEqual', [8928]], ['NotReverseElement', [8716]], ['NotRightTriangleBar', [10704, 824]], ['NotRightTriangle', [8939]], ['NotRightTriangleEqual', [8941]], ['NotSquareSubset', [8847, 824]], ['NotSquareSubsetEqual', [8930]], ['NotSquareSuperset', [8848, 824]], ['NotSquareSupersetEqual', [8931]], ['NotSubset', [8834, 8402]], ['NotSubsetEqual', [8840]], ['NotSucceeds', [8833]], ['NotSucceedsEqual', [10928, 824]], ['NotSucceedsSlantEqual', [8929]], ['NotSucceedsTilde', [8831, 824]], ['NotSuperset', [8835, 8402]], ['NotSupersetEqual', [8841]], ['NotTilde', [8769]], ['NotTildeEqual', [8772]], ['NotTildeFullEqual', [8775]], ['NotTildeTilde', [8777]], ['NotVerticalBar', [8740]], ['nparallel', [8742]], ['npar', [8742]], ['nparsl', [11005, 8421]], ['npart', [8706, 824]], ['npolint', [10772]], ['npr', [8832]], ['nprcue', [8928]], ['nprec', [8832]], ['npreceq', [10927, 824]], ['npre', [10927, 824]], ['nrarrc', [10547, 824]], ['nrarr', [8603]], ['nrArr', [8655]], ['nrarrw', [8605, 824]], ['nrightarrow', [8603]], ['nRightarrow', [8655]], ['nrtri', [8939]], ['nrtrie', [8941]], ['nsc', [8833]], ['nsccue', [8929]], ['nsce', [10928, 824]], ['Nscr', [119977]], ['nscr', [120003]], ['nshortmid', [8740]], ['nshortparallel', [8742]], ['nsim', [8769]], ['nsime', [8772]], ['nsimeq', [8772]], ['nsmid', [8740]], ['nspar', [8742]], ['nsqsube', [8930]], ['nsqsupe', [8931]], ['nsub', [8836]], ['nsubE', [10949, 824]], ['nsube', [8840]], ['nsubset', [8834, 8402]], ['nsubseteq', [8840]], ['nsubseteqq', [10949, 824]], ['nsucc', [8833]], ['nsucceq', [10928, 824]], ['nsup', [8837]], ['nsupE', [10950, 824]], ['nsupe', [8841]], ['nsupset', [8835, 8402]], ['nsupseteq', [8841]], ['nsupseteqq', [10950, 824]], ['ntgl', [8825]], ['Ntilde', [209]], ['ntilde', [241]], ['ntlg', [8824]], ['ntriangleleft', [8938]], ['ntrianglelefteq', [8940]], ['ntriangleright', [8939]], ['ntrianglerighteq', [8941]], ['Nu', [925]], ['nu', [957]], ['num', [35]], ['numero', [8470]], ['numsp', [8199]], ['nvap', [8781, 8402]], ['nvdash', [8876]], ['nvDash', [8877]], ['nVdash', [8878]], ['nVDash', [8879]], ['nvge', [8805, 8402]], ['nvgt', [62, 8402]], ['nvHarr', [10500]], ['nvinfin', [10718]], ['nvlArr', [10498]], ['nvle', [8804, 8402]], ['nvlt', [60, 8402]], ['nvltrie', [8884, 8402]], ['nvrArr', [10499]], ['nvrtrie', [8885, 8402]], ['nvsim', [8764, 8402]], ['nwarhk', [10531]], ['nwarr', [8598]], ['nwArr', [8662]], ['nwarrow', [8598]], ['nwnear', [10535]], ['Oacute', [211]], ['oacute', [243]], ['oast', [8859]], ['Ocirc', [212]], ['ocirc', [244]], ['ocir', [8858]], ['Ocy', [1054]], ['ocy', [1086]], ['odash', [8861]], ['Odblac', [336]], ['odblac', [337]], ['odiv', [10808]], ['odot', [8857]], ['odsold', [10684]], ['OElig', [338]], ['oelig', [339]], ['ofcir', [10687]], ['Ofr', [120082]], ['ofr', [120108]], ['ogon', [731]], ['Ograve', [210]], ['ograve', [242]], ['ogt', [10689]], ['ohbar', [10677]], ['ohm', [937]], ['oint', [8750]], ['olarr', [8634]], ['olcir', [10686]], ['olcross', [10683]], ['oline', [8254]], ['olt', [10688]], ['Omacr', [332]], ['omacr', [333]], ['Omega', [937]], ['omega', [969]], ['Omicron', [927]], ['omicron', [959]], ['omid', [10678]], ['ominus', [8854]], ['Oopf', [120134]], ['oopf', [120160]], ['opar', [10679]], ['OpenCurlyDoubleQuote', [8220]], ['OpenCurlyQuote', [8216]], ['operp', [10681]], ['oplus', [8853]], ['orarr', [8635]], ['Or', [10836]], ['or', [8744]], ['ord', [10845]], ['order', [8500]], ['orderof', [8500]], ['ordf', [170]], ['ordm', [186]], ['origof', [8886]], ['oror', [10838]], ['orslope', [10839]], ['orv', [10843]], ['oS', [9416]], ['Oscr', [119978]], ['oscr', [8500]], ['Oslash', [216]], ['oslash', [248]], ['osol', [8856]], ['Otilde', [213]], ['otilde', [245]], ['otimesas', [10806]], ['Otimes', [10807]], ['otimes', [8855]], ['Ouml', [214]], ['ouml', [246]], ['ovbar', [9021]], ['OverBar', [8254]], ['OverBrace', [9182]], ['OverBracket', [9140]], ['OverParenthesis', [9180]], ['para', [182]], ['parallel', [8741]], ['par', [8741]], ['parsim', [10995]], ['parsl', [11005]], ['part', [8706]], ['PartialD', [8706]], ['Pcy', [1055]], ['pcy', [1087]], ['percnt', [37]], ['period', [46]], ['permil', [8240]], ['perp', [8869]], ['pertenk', [8241]], ['Pfr', [120083]], ['pfr', [120109]], ['Phi', [934]], ['phi', [966]], ['phiv', [981]], ['phmmat', [8499]], ['phone', [9742]], ['Pi', [928]], ['pi', [960]], ['pitchfork', [8916]], ['piv', [982]], ['planck', [8463]], ['planckh', [8462]], ['plankv', [8463]], ['plusacir', [10787]], ['plusb', [8862]], ['pluscir', [10786]], ['plus', [43]], ['plusdo', [8724]], ['plusdu', [10789]], ['pluse', [10866]], ['PlusMinus', [177]], ['plusmn', [177]], ['plussim', [10790]], ['plustwo', [10791]], ['pm', [177]], ['Poincareplane', [8460]], ['pointint', [10773]], ['popf', [120161]], ['Popf', [8473]], ['pound', [163]], ['prap', [10935]], ['Pr', [10939]], ['pr', [8826]], ['prcue', [8828]], ['precapprox', [10935]], ['prec', [8826]], ['preccurlyeq', [8828]], ['Precedes', [8826]], ['PrecedesEqual', [10927]], ['PrecedesSlantEqual', [8828]], ['PrecedesTilde', [8830]], ['preceq', [10927]], ['precnapprox', [10937]], ['precneqq', [10933]], ['precnsim', [8936]], ['pre', [10927]], ['prE', [10931]], ['precsim', [8830]], ['prime', [8242]], ['Prime', [8243]], ['primes', [8473]], ['prnap', [10937]], ['prnE', [10933]], ['prnsim', [8936]], ['prod', [8719]], ['Product', [8719]], ['profalar', [9006]], ['profline', [8978]], ['profsurf', [8979]], ['prop', [8733]], ['Proportional', [8733]], ['Proportion', [8759]], ['propto', [8733]], ['prsim', [8830]], ['prurel', [8880]], ['Pscr', [119979]], ['pscr', [120005]], ['Psi', [936]], ['psi', [968]], ['puncsp', [8200]], ['Qfr', [120084]], ['qfr', [120110]], ['qint', [10764]], ['qopf', [120162]], ['Qopf', [8474]], ['qprime', [8279]], ['Qscr', [119980]], ['qscr', [120006]], ['quaternions', [8461]], ['quatint', [10774]], ['quest', [63]], ['questeq', [8799]], ['quot', [34]], ['QUOT', [34]], ['rAarr', [8667]], ['race', [8765, 817]], ['Racute', [340]], ['racute', [341]], ['radic', [8730]], ['raemptyv', [10675]], ['rang', [10217]], ['Rang', [10219]], ['rangd', [10642]], ['range', [10661]], ['rangle', [10217]], ['raquo', [187]], ['rarrap', [10613]], ['rarrb', [8677]], ['rarrbfs', [10528]], ['rarrc', [10547]], ['rarr', [8594]], ['Rarr', [8608]], ['rArr', [8658]], ['rarrfs', [10526]], ['rarrhk', [8618]], ['rarrlp', [8620]], ['rarrpl', [10565]], ['rarrsim', [10612]], ['Rarrtl', [10518]], ['rarrtl', [8611]], ['rarrw', [8605]], ['ratail', [10522]], ['rAtail', [10524]], ['ratio', [8758]], ['rationals', [8474]], ['rbarr', [10509]], ['rBarr', [10511]], ['RBarr', [10512]], ['rbbrk', [10099]], ['rbrace', [125]], ['rbrack', [93]], ['rbrke', [10636]], ['rbrksld', [10638]], ['rbrkslu', [10640]], ['Rcaron', [344]], ['rcaron', [345]], ['Rcedil', [342]], ['rcedil', [343]], ['rceil', [8969]], ['rcub', [125]], ['Rcy', [1056]], ['rcy', [1088]], ['rdca', [10551]], ['rdldhar', [10601]], ['rdquo', [8221]], ['rdquor', [8221]], ['rdsh', [8627]], ['real', [8476]], ['realine', [8475]], ['realpart', [8476]], ['reals', [8477]], ['Re', [8476]], ['rect', [9645]], ['reg', [174]], ['REG', [174]], ['ReverseElement', [8715]], ['ReverseEquilibrium', [8651]], ['ReverseUpEquilibrium', [10607]], ['rfisht', [10621]], ['rfloor', [8971]], ['rfr', [120111]], ['Rfr', [8476]], ['rHar', [10596]], ['rhard', [8641]], ['rharu', [8640]], ['rharul', [10604]], ['Rho', [929]], ['rho', [961]], ['rhov', [1009]], ['RightAngleBracket', [10217]], ['RightArrowBar', [8677]], ['rightarrow', [8594]], ['RightArrow', [8594]], ['Rightarrow', [8658]], ['RightArrowLeftArrow', [8644]], ['rightarrowtail', [8611]], ['RightCeiling', [8969]], ['RightDoubleBracket', [10215]], ['RightDownTeeVector', [10589]], ['RightDownVectorBar', [10581]], ['RightDownVector', [8642]], ['RightFloor', [8971]], ['rightharpoondown', [8641]], ['rightharpoonup', [8640]], ['rightleftarrows', [8644]], ['rightleftharpoons', [8652]], ['rightrightarrows', [8649]], ['rightsquigarrow', [8605]], ['RightTeeArrow', [8614]], ['RightTee', [8866]], ['RightTeeVector', [10587]], ['rightthreetimes', [8908]], ['RightTriangleBar', [10704]], ['RightTriangle', [8883]], ['RightTriangleEqual', [8885]], ['RightUpDownVector', [10575]], ['RightUpTeeVector', [10588]], ['RightUpVectorBar', [10580]], ['RightUpVector', [8638]], ['RightVectorBar', [10579]], ['RightVector', [8640]], ['ring', [730]], ['risingdotseq', [8787]], ['rlarr', [8644]], ['rlhar', [8652]], ['rlm', [8207]], ['rmoustache', [9137]], ['rmoust', [9137]], ['rnmid', [10990]], ['roang', [10221]], ['roarr', [8702]], ['robrk', [10215]], ['ropar', [10630]], ['ropf', [120163]], ['Ropf', [8477]], ['roplus', [10798]], ['rotimes', [10805]], ['RoundImplies', [10608]], ['rpar', [41]], ['rpargt', [10644]], ['rppolint', [10770]], ['rrarr', [8649]], ['Rrightarrow', [8667]], ['rsaquo', [8250]], ['rscr', [120007]], ['Rscr', [8475]], ['rsh', [8625]], ['Rsh', [8625]], ['rsqb', [93]], ['rsquo', [8217]], ['rsquor', [8217]], ['rthree', [8908]], ['rtimes', [8906]], ['rtri', [9657]], ['rtrie', [8885]], ['rtrif', [9656]], ['rtriltri', [10702]], ['RuleDelayed', [10740]], ['ruluhar', [10600]], ['rx', [8478]], ['Sacute', [346]], ['sacute', [347]], ['sbquo', [8218]], ['scap', [10936]], ['Scaron', [352]], ['scaron', [353]], ['Sc', [10940]], ['sc', [8827]], ['sccue', [8829]], ['sce', [10928]], ['scE', [10932]], ['Scedil', [350]], ['scedil', [351]], ['Scirc', [348]], ['scirc', [349]], ['scnap', [10938]], ['scnE', [10934]], ['scnsim', [8937]], ['scpolint', [10771]], ['scsim', [8831]], ['Scy', [1057]], ['scy', [1089]], ['sdotb', [8865]], ['sdot', [8901]], ['sdote', [10854]], ['searhk', [10533]], ['searr', [8600]], ['seArr', [8664]], ['searrow', [8600]], ['sect', [167]], ['semi', [59]], ['seswar', [10537]], ['setminus', [8726]], ['setmn', [8726]], ['sext', [10038]], ['Sfr', [120086]], ['sfr', [120112]], ['sfrown', [8994]], ['sharp', [9839]], ['SHCHcy', [1065]], ['shchcy', [1097]], ['SHcy', [1064]], ['shcy', [1096]], ['ShortDownArrow', [8595]], ['ShortLeftArrow', [8592]], ['shortmid', [8739]], ['shortparallel', [8741]], ['ShortRightArrow', [8594]], ['ShortUpArrow', [8593]], ['shy', [173]], ['Sigma', [931]], ['sigma', [963]], ['sigmaf', [962]], ['sigmav', [962]], ['sim', [8764]], ['simdot', [10858]], ['sime', [8771]], ['simeq', [8771]], ['simg', [10910]], ['simgE', [10912]], ['siml', [10909]], ['simlE', [10911]], ['simne', [8774]], ['simplus', [10788]], ['simrarr', [10610]], ['slarr', [8592]], ['SmallCircle', [8728]], ['smallsetminus', [8726]], ['smashp', [10803]], ['smeparsl', [10724]], ['smid', [8739]], ['smile', [8995]], ['smt', [10922]], ['smte', [10924]], ['smtes', [10924, 65024]], ['SOFTcy', [1068]], ['softcy', [1100]], ['solbar', [9023]], ['solb', [10692]], ['sol', [47]], ['Sopf', [120138]], ['sopf', [120164]], ['spades', [9824]], ['spadesuit', [9824]], ['spar', [8741]], ['sqcap', [8851]], ['sqcaps', [8851, 65024]], ['sqcup', [8852]], ['sqcups', [8852, 65024]], ['Sqrt', [8730]], ['sqsub', [8847]], ['sqsube', [8849]], ['sqsubset', [8847]], ['sqsubseteq', [8849]], ['sqsup', [8848]], ['sqsupe', [8850]], ['sqsupset', [8848]], ['sqsupseteq', [8850]], ['square', [9633]], ['Square', [9633]], ['SquareIntersection', [8851]], ['SquareSubset', [8847]], ['SquareSubsetEqual', [8849]], ['SquareSuperset', [8848]], ['SquareSupersetEqual', [8850]], ['SquareUnion', [8852]], ['squarf', [9642]], ['squ', [9633]], ['squf', [9642]], ['srarr', [8594]], ['Sscr', [119982]], ['sscr', [120008]], ['ssetmn', [8726]], ['ssmile', [8995]], ['sstarf', [8902]], ['Star', [8902]], ['star', [9734]], ['starf', [9733]], ['straightepsilon', [1013]], ['straightphi', [981]], ['strns', [175]], ['sub', [8834]], ['Sub', [8912]], ['subdot', [10941]], ['subE', [10949]], ['sube', [8838]], ['subedot', [10947]], ['submult', [10945]], ['subnE', [10955]], ['subne', [8842]], ['subplus', [10943]], ['subrarr', [10617]], ['subset', [8834]], ['Subset', [8912]], ['subseteq', [8838]], ['subseteqq', [10949]], ['SubsetEqual', [8838]], ['subsetneq', [8842]], ['subsetneqq', [10955]], ['subsim', [10951]], ['subsub', [10965]], ['subsup', [10963]], ['succapprox', [10936]], ['succ', [8827]], ['succcurlyeq', [8829]], ['Succeeds', [8827]], ['SucceedsEqual', [10928]], ['SucceedsSlantEqual', [8829]], ['SucceedsTilde', [8831]], ['succeq', [10928]], ['succnapprox', [10938]], ['succneqq', [10934]], ['succnsim', [8937]], ['succsim', [8831]], ['SuchThat', [8715]], ['sum', [8721]], ['Sum', [8721]], ['sung', [9834]], ['sup1', [185]], ['sup2', [178]], ['sup3', [179]], ['sup', [8835]], ['Sup', [8913]], ['supdot', [10942]], ['supdsub', [10968]], ['supE', [10950]], ['supe', [8839]], ['supedot', [10948]], ['Superset', [8835]], ['SupersetEqual', [8839]], ['suphsol', [10185]], ['suphsub', [10967]], ['suplarr', [10619]], ['supmult', [10946]], ['supnE', [10956]], ['supne', [8843]], ['supplus', [10944]], ['supset', [8835]], ['Supset', [8913]], ['supseteq', [8839]], ['supseteqq', [10950]], ['supsetneq', [8843]], ['supsetneqq', [10956]], ['supsim', [10952]], ['supsub', [10964]], ['supsup', [10966]], ['swarhk', [10534]], ['swarr', [8601]], ['swArr', [8665]], ['swarrow', [8601]], ['swnwar', [10538]], ['szlig', [223]], ['Tab', [9]], ['target', [8982]], ['Tau', [932]], ['tau', [964]], ['tbrk', [9140]], ['Tcaron', [356]], ['tcaron', [357]], ['Tcedil', [354]], ['tcedil', [355]], ['Tcy', [1058]], ['tcy', [1090]], ['tdot', [8411]], ['telrec', [8981]], ['Tfr', [120087]], ['tfr', [120113]], ['there4', [8756]], ['therefore', [8756]], ['Therefore', [8756]], ['Theta', [920]], ['theta', [952]], ['thetasym', [977]], ['thetav', [977]], ['thickapprox', [8776]], ['thicksim', [8764]], ['ThickSpace', [8287, 8202]], ['ThinSpace', [8201]], ['thinsp', [8201]], ['thkap', [8776]], ['thksim', [8764]], ['THORN', [222]], ['thorn', [254]], ['tilde', [732]], ['Tilde', [8764]], ['TildeEqual', [8771]], ['TildeFullEqual', [8773]], ['TildeTilde', [8776]], ['timesbar', [10801]], ['timesb', [8864]], ['times', [215]], ['timesd', [10800]], ['tint', [8749]], ['toea', [10536]], ['topbot', [9014]], ['topcir', [10993]], ['top', [8868]], ['Topf', [120139]], ['topf', [120165]], ['topfork', [10970]], ['tosa', [10537]], ['tprime', [8244]], ['trade', [8482]], ['TRADE', [8482]], ['triangle', [9653]], ['triangledown', [9663]], ['triangleleft', [9667]], ['trianglelefteq', [8884]], ['triangleq', [8796]], ['triangleright', [9657]], ['trianglerighteq', [8885]], ['tridot', [9708]], ['trie', [8796]], ['triminus', [10810]], ['TripleDot', [8411]], ['triplus', [10809]], ['trisb', [10701]], ['tritime', [10811]], ['trpezium', [9186]], ['Tscr', [119983]], ['tscr', [120009]], ['TScy', [1062]], ['tscy', [1094]], ['TSHcy', [1035]], ['tshcy', [1115]], ['Tstrok', [358]], ['tstrok', [359]], ['twixt', [8812]], ['twoheadleftarrow', [8606]], ['twoheadrightarrow', [8608]], ['Uacute', [218]], ['uacute', [250]], ['uarr', [8593]], ['Uarr', [8607]], ['uArr', [8657]], ['Uarrocir', [10569]], ['Ubrcy', [1038]], ['ubrcy', [1118]], ['Ubreve', [364]], ['ubreve', [365]], ['Ucirc', [219]], ['ucirc', [251]], ['Ucy', [1059]], ['ucy', [1091]], ['udarr', [8645]], ['Udblac', [368]], ['udblac', [369]], ['udhar', [10606]], ['ufisht', [10622]], ['Ufr', [120088]], ['ufr', [120114]], ['Ugrave', [217]], ['ugrave', [249]], ['uHar', [10595]], ['uharl', [8639]], ['uharr', [8638]], ['uhblk', [9600]], ['ulcorn', [8988]], ['ulcorner', [8988]], ['ulcrop', [8975]], ['ultri', [9720]], ['Umacr', [362]], ['umacr', [363]], ['uml', [168]], ['UnderBar', [95]], ['UnderBrace', [9183]], ['UnderBracket', [9141]], ['UnderParenthesis', [9181]], ['Union', [8899]], ['UnionPlus', [8846]], ['Uogon', [370]], ['uogon', [371]], ['Uopf', [120140]], ['uopf', [120166]], ['UpArrowBar', [10514]], ['uparrow', [8593]], ['UpArrow', [8593]], ['Uparrow', [8657]], ['UpArrowDownArrow', [8645]], ['updownarrow', [8597]], ['UpDownArrow', [8597]], ['Updownarrow', [8661]], ['UpEquilibrium', [10606]], ['upharpoonleft', [8639]], ['upharpoonright', [8638]], ['uplus', [8846]], ['UpperLeftArrow', [8598]], ['UpperRightArrow', [8599]], ['upsi', [965]], ['Upsi', [978]], ['upsih', [978]], ['Upsilon', [933]], ['upsilon', [965]], ['UpTeeArrow', [8613]], ['UpTee', [8869]], ['upuparrows', [8648]], ['urcorn', [8989]], ['urcorner', [8989]], ['urcrop', [8974]], ['Uring', [366]], ['uring', [367]], ['urtri', [9721]], ['Uscr', [119984]], ['uscr', [120010]], ['utdot', [8944]], ['Utilde', [360]], ['utilde', [361]], ['utri', [9653]], ['utrif', [9652]], ['uuarr', [8648]], ['Uuml', [220]], ['uuml', [252]], ['uwangle', [10663]], ['vangrt', [10652]], ['varepsilon', [1013]], ['varkappa', [1008]], ['varnothing', [8709]], ['varphi', [981]], ['varpi', [982]], ['varpropto', [8733]], ['varr', [8597]], ['vArr', [8661]], ['varrho', [1009]], ['varsigma', [962]], ['varsubsetneq', [8842, 65024]], ['varsubsetneqq', [10955, 65024]], ['varsupsetneq', [8843, 65024]], ['varsupsetneqq', [10956, 65024]], ['vartheta', [977]], ['vartriangleleft', [8882]], ['vartriangleright', [8883]], ['vBar', [10984]], ['Vbar', [10987]], ['vBarv', [10985]], ['Vcy', [1042]], ['vcy', [1074]], ['vdash', [8866]], ['vDash', [8872]], ['Vdash', [8873]], ['VDash', [8875]], ['Vdashl', [10982]], ['veebar', [8891]], ['vee', [8744]], ['Vee', [8897]], ['veeeq', [8794]], ['vellip', [8942]], ['verbar', [124]], ['Verbar', [8214]], ['vert', [124]], ['Vert', [8214]], ['VerticalBar', [8739]], ['VerticalLine', [124]], ['VerticalSeparator', [10072]], ['VerticalTilde', [8768]], ['VeryThinSpace', [8202]], ['Vfr', [120089]], ['vfr', [120115]], ['vltri', [8882]], ['vnsub', [8834, 8402]], ['vnsup', [8835, 8402]], ['Vopf', [120141]], ['vopf', [120167]], ['vprop', [8733]], ['vrtri', [8883]], ['Vscr', [119985]], ['vscr', [120011]], ['vsubnE', [10955, 65024]], ['vsubne', [8842, 65024]], ['vsupnE', [10956, 65024]], ['vsupne', [8843, 65024]], ['Vvdash', [8874]], ['vzigzag', [10650]], ['Wcirc', [372]], ['wcirc', [373]], ['wedbar', [10847]], ['wedge', [8743]], ['Wedge', [8896]], ['wedgeq', [8793]], ['weierp', [8472]], ['Wfr', [120090]], ['wfr', [120116]], ['Wopf', [120142]], ['wopf', [120168]], ['wp', [8472]], ['wr', [8768]], ['wreath', [8768]], ['Wscr', [119986]], ['wscr', [120012]], ['xcap', [8898]], ['xcirc', [9711]], ['xcup', [8899]], ['xdtri', [9661]], ['Xfr', [120091]], ['xfr', [120117]], ['xharr', [10231]], ['xhArr', [10234]], ['Xi', [926]], ['xi', [958]], ['xlarr', [10229]], ['xlArr', [10232]], ['xmap', [10236]], ['xnis', [8955]], ['xodot', [10752]], ['Xopf', [120143]], ['xopf', [120169]], ['xoplus', [10753]], ['xotime', [10754]], ['xrarr', [10230]], ['xrArr', [10233]], ['Xscr', [119987]], ['xscr', [120013]], ['xsqcup', [10758]], ['xuplus', [10756]], ['xutri', [9651]], ['xvee', [8897]], ['xwedge', [8896]], ['Yacute', [221]], ['yacute', [253]], ['YAcy', [1071]], ['yacy', [1103]], ['Ycirc', [374]], ['ycirc', [375]], ['Ycy', [1067]], ['ycy', [1099]], ['yen', [165]], ['Yfr', [120092]], ['yfr', [120118]], ['YIcy', [1031]], ['yicy', [1111]], ['Yopf', [120144]], ['yopf', [120170]], ['Yscr', [119988]], ['yscr', [120014]], ['YUcy', [1070]], ['yucy', [1102]], ['yuml', [255]], ['Yuml', [376]], ['Zacute', [377]], ['zacute', [378]], ['Zcaron', [381]], ['zcaron', [382]], ['Zcy', [1047]], ['zcy', [1079]], ['Zdot', [379]], ['zdot', [380]], ['zeetrf', [8488]], ['ZeroWidthSpace', [8203]], ['Zeta', [918]], ['zeta', [950]], ['zfr', [120119]], ['Zfr', [8488]], ['ZHcy', [1046]], ['zhcy', [1078]], ['zigrarr', [8669]], ['zopf', [120171]], ['Zopf', [8484]], ['Zscr', [119989]], ['zscr', [120015]], ['zwj', [8205]], ['zwnj', [8204]]];
	
	var alphaIndex = {};
	var charIndex = {};
	
	createIndexes(alphaIndex, charIndex);
	
	/**
	 * @constructor
	 */
	function Html5Entities() {}
	
	/**
	 * @param {String} str
	 * @returns {String}
	 */
	Html5Entities.prototype.decode = function(str) {
	    if (str.length === 0) {
	        return '';
	    }
	    return str.replace(/&(#?[\w\d]+);?/g, function(s, entity) {
	        var chr;
	        if (entity.charAt(0) === "#") {
	            var code = entity.charAt(1) === 'x' ?
	                parseInt(entity.substr(2).toLowerCase(), 16) :
	                parseInt(entity.substr(1));
	
	            if (!(isNaN(code) || code < -32768 || code > 65535)) {
	                chr = String.fromCharCode(code);
	            }
	        } else {
	            chr = alphaIndex[entity];
	        }
	        return chr || s;
	    });
	};
	
	/**
	 * @param {String} str
	 * @returns {String}
	 */
	 Html5Entities.decode = function(str) {
	    return new Html5Entities().decode(str);
	 };
	
	/**
	 * @param {String} str
	 * @returns {String}
	 */
	Html5Entities.prototype.encode = function(str) {
	    var strLength = str.length;
	    if (strLength === 0) {
	        return '';
	    }
	    var result = '';
	    var i = 0;
	    while (i < strLength) {
	        var charInfo = charIndex[str.charCodeAt(i)];
	        if (charInfo) {
	            var alpha = charInfo[str.charCodeAt(i + 1)];
	            if (alpha) {
	                i++;
	            } else {
	                alpha = charInfo[''];
	            }
	            if (alpha) {
	                result += "&" + alpha + ";";
	                i++;
	                continue;
	            }
	        }
	        result += str.charAt(i);
	        i++;
	    }
	    return result;
	};
	
	/**
	 * @param {String} str
	 * @returns {String}
	 */
	 Html5Entities.encode = function(str) {
	    return new Html5Entities().encode(str);
	 };
	
	/**
	 * @param {String} str
	 * @returns {String}
	 */
	Html5Entities.prototype.encodeNonUTF = function(str) {
	    var strLength = str.length;
	    if (strLength === 0) {
	        return '';
	    }
	    var result = '';
	    var i = 0;
	    while (i < strLength) {
	        var c = str.charCodeAt(i);
	        var charInfo = charIndex[c];
	        if (charInfo) {
	            var alpha = charInfo[str.charCodeAt(i + 1)];
	            if (alpha) {
	                i++;
	            } else {
	                alpha = charInfo[''];
	            }
	            if (alpha) {
	                result += "&" + alpha + ";";
	                i++;
	                continue;
	            }
	        }
	        if (c < 32 || c > 126) {
	            result += '&#' + c + ';';
	        } else {
	            result += str.charAt(i);
	        }
	        i++;
	    }
	    return result;
	};
	
	/**
	 * @param {String} str
	 * @returns {String}
	 */
	 Html5Entities.encodeNonUTF = function(str) {
	    return new Html5Entities().encodeNonUTF(str);
	 };
	
	/**
	 * @param {String} str
	 * @returns {String}
	 */
	Html5Entities.prototype.encodeNonASCII = function(str) {
	    var strLength = str.length;
	    if (strLength === 0) {
	        return '';
	    }
	    var result = '';
	    var i = 0;
	    while (i < strLength) {
	        var c = str.charCodeAt(i);
	        if (c <= 255) {
	            result += str[i++];
	            continue;
	        }
	        result += '&#' + c + ';';
	        i++
	    }
	    return result;
	};
	
	/**
	 * @param {String} str
	 * @returns {String}
	 */
	 Html5Entities.encodeNonASCII = function(str) {
	    return new Html5Entities().encodeNonASCII(str);
	 };
	
	/**
	 * @param {Object} alphaIndex Passed by reference.
	 * @param {Object} charIndex Passed by reference.
	 */
	function createIndexes(alphaIndex, charIndex) {
	    var i = ENTITIES.length;
	    var _results = [];
	    while (i--) {
	        var e = ENTITIES[i];
	        var alpha = e[0];
	        var chars = e[1];
	        var chr = chars[0];
	        var addChar = (chr < 32 || chr > 126) || chr === 62 || chr === 60 || chr === 38 || chr === 34 || chr === 39;
	        var charInfo;
	        if (addChar) {
	            charInfo = charIndex[chr] = charIndex[chr] || {};
	        }
	        if (chars[1]) {
	            var chr2 = chars[1];
	            alphaIndex[alpha] = String.fromCharCode(chr) + String.fromCharCode(chr2);
	            _results.push(addChar && (charInfo[chr2] = alpha));
	        } else {
	            alphaIndex[alpha] = String.fromCharCode(chr);
	            _results.push(addChar && (charInfo[''] = alpha));
	        }
	    }
	}
	
	module.exports = Html5Entities;


/***/ },
/* 50 */
/*!*************************************************************************************!*\
  !*** delegated ./node_modules/react-redux/lib/index.js from dll-reference libs_lib ***!
  \*************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = (__webpack_require__(1))(163);

/***/ },
/* 51 */
/*!*******************************************************************************!*\
  !*** delegated ./node_modules/redux/lib/index.js from dll-reference libs_lib ***!
  \*******************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = (__webpack_require__(1))(117);

/***/ },
/* 52 */
/*!******************************!*\
  !*** ./~/ansi-html/index.js ***!
  \******************************/
/***/ function(module, exports) {

	module.exports = ansiHTML;
	
	// Reference to https://github.com/sindresorhus/ansi-regex
	var re_ansi = /(?:(?:\u001b\[)|\u009b)(?:(?:[0-9]{1,3})?(?:(?:;[0-9]{0,3})*)?[A-M|f-m])|\u001b[A-M]/;
	
	var _defColors = {
	  reset: ['fff', '000'], // [FOREGROUD_COLOR, BACKGROUND_COLOR]
	  black: '000',
	  red: 'ff0000',
	  green: '209805',
	  yellow: 'e8bf03',
	  blue: '0000ff',
	  magenta: 'ff00ff',
	  cyan: '00ffee',
	  lightgrey: 'f0f0f0',
	  darkgrey: '888'
	};
	var _styles = {
	  30: 'black',
	  31: 'red',
	  32: 'green',
	  33: 'yellow',
	  34: 'blue',
	  35: 'magenta',
	  36: 'cyan',
	  37: 'lightgrey'
	};
	var _openTags = {
	  '1': 'font-weight:bold', // bold
	  '2': 'opacity:0.8', // dim
	  '3': '<i>', // italic
	  '4': '<u>', // underscore
	  '8': 'display:none', // hidden
	  '9': '<del>', // delete
	};
	var _closeTags = {
	  '23': '</i>', // reset italic
	  '24': '</u>', // reset underscore
	  '29': '</del>' // reset delete
	};
	[0, 21, 22, 27, 28, 39, 49].forEach(function (n) {
	  _closeTags[n] = '</span>';
	});
	
	/**
	 * Converts text with ANSI color codes to HTML markup.
	 * @param {String} text
	 * @returns {*}
	 */
	function ansiHTML(text) {
	  // Returns the text if the string has no ANSI escape code.
	  if (!re_ansi.test(text)) {
	    return text;
	  }
	
	  // Cache opened sequence.
	  var ansiCodes = [];
	  // Replace with markup.
	  var ret = text.replace(/\033\[(\d+)*m/g, function (match, seq) {
	    var ot = _openTags[seq];
	    if (ot) {
	      // If current sequence has been opened, close it.
	      if (!!~ansiCodes.indexOf(seq)) {
	        ansiCodes.pop();
	        return '</span>';
	      }
	      // Open tag.
	      ansiCodes.push(seq);
	      return ot[0] == '<' ? ot : '<span style="' + ot + ';">';
	    }
	
	    var ct = _closeTags[seq];
	    if (ct) {
	      // Pop sequence
	      ansiCodes.pop();
	      return ct;
	    }
	    return '';
	  });
	
	  // Make sure tags are closed.
	  var l = ansiCodes.length;
	  (l > 0) && (ret += Array(l + 1).join('</span>'));
	
	  return ret;
	}
	
	/**
	 * Customize colors.
	 * @param {Object} colors reference to _defColors
	 */
	ansiHTML.setColors = function (colors) {
	  if (typeof colors != 'object') {
	    throw new Error('`colors` parameter must be an Object.');
	  }
	
	  var _finalColors = {};
	  for (var key in _defColors) {
	    var hex = colors.hasOwnProperty(key) ? colors[key] : null;
	    if (!hex) {
	      _finalColors[key] = _defColors[key];
	      continue;
	    }
	    if ('reset' == key) {
	    	if(typeof hex == 'string'){
	    		hex = [hex];
	    	}
	      if (!Array.isArray(hex) || hex.length == 0 || hex.some(function (h) {
	          return typeof h != 'string';
	        })) {
	        throw new Error('The value of `' + key + '` property must be an Array and each item could only be a hex string, e.g.: FF0000');
	      }
	      var defHexColor = _defColors[key];
	      if(!hex[0]){
	      	hex[0] = defHexColor[0];
	      }
	      if (hex.length == 1 || !hex[1]) {
	      	hex = [hex[0]];
	        hex.push(defHexColor[1]);
	      }
	
	      hex = hex.slice(0, 2);
	    } else if (typeof hex != 'string') {
	      throw new Error('The value of `' + key + '` property must be a hex string, e.g.: FF0000');
	    }
	    _finalColors[key] = hex;
	  }
	  _setTags(_finalColors);
	};
	
	/**
	 * Reset colors.
	 */
	ansiHTML.reset = function(){
		_setTags(_defColors);
	};
	
	/**
	 * Expose tags, including open and close.
	 * @type {Object}
	 */
	ansiHTML.tags = {
	  get open() {
	    return _openTags;
	  },
	  get close() {
	    return _closeTags;
	  }
	};
	
	function _setTags(colors) {
	  // reset all
	  _openTags['0'] = 'font-weight:normal;opacity:1;color:#' + colors.reset[0] + ';background:#' + colors.reset[1];
	  // inverse
	  _openTags['7'] = 'color:#' + colors.reset[1] + ';background:#' + colors.reset[0];
	  // dark grey
	  _openTags['90'] = 'color:#' + colors.darkgrey;
	
	  for (var code in _styles) {
	    var color = _styles[code];
	    var oriColor = colors[color] || '000';
	    _openTags[code] = 'color:#' + oriColor;
	    code = parseInt(code);
	    _openTags[(code + 10).toString()] = 'background:#' + oriColor;
	  }
	}
	
	ansiHTML.reset();


/***/ },
/* 53 */
/*!*******************************!*\
  !*** ./~/ansi-regex/index.js ***!
  \*******************************/
/***/ function(module, exports) {

	'use strict';
	module.exports = function () {
		return /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g;
	};


/***/ },
/* 54 */
/*!**************************************************!*\
  !*** ./~/babel-runtime/core-js/object/create.js ***!
  \**************************************************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(/*! core-js/library/fn/object/create */ 58), __esModule: true };

/***/ },
/* 55 */
/*!************************************************************!*\
  !*** ./~/babel-runtime/core-js/object/set-prototype-of.js ***!
  \************************************************************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(/*! core-js/library/fn/object/set-prototype-of */ 59), __esModule: true };

/***/ },
/* 56 */
/*!*******************************************!*\
  !*** ./~/babel-runtime/core-js/symbol.js ***!
  \*******************************************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(/*! core-js/library/fn/symbol */ 60), __esModule: true };

/***/ },
/* 57 */
/*!****************************************************!*\
  !*** ./~/babel-runtime/core-js/symbol/iterator.js ***!
  \****************************************************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(/*! core-js/library/fn/symbol/iterator */ 61), __esModule: true };

/***/ },
/* 58 */
/*!***********************************************!*\
  !*** ./~/core-js/library/fn/object/create.js ***!
  \***********************************************/
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(/*! ../../modules/es6.object.create */ 82);
	var $Object = __webpack_require__(/*! ../../modules/_core */ 14).Object;
	module.exports = function create(P, D){
	  return $Object.create(P, D);
	};

/***/ },
/* 59 */
/*!*********************************************************!*\
  !*** ./~/core-js/library/fn/object/set-prototype-of.js ***!
  \*********************************************************/
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(/*! ../../modules/es6.object.set-prototype-of */ 83);
	module.exports = __webpack_require__(/*! ../../modules/_core */ 14).Object.setPrototypeOf;

/***/ },
/* 60 */
/*!**********************************************!*\
  !*** ./~/core-js/library/fn/symbol/index.js ***!
  \**********************************************/
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(/*! ../../modules/es6.symbol */ 86);
	__webpack_require__(/*! ../../modules/es6.object.to-string */ 84);
	__webpack_require__(/*! ../../modules/es7.symbol.async-iterator */ 87);
	__webpack_require__(/*! ../../modules/es7.symbol.observable */ 88);
	module.exports = __webpack_require__(/*! ../../modules/_core */ 14).Symbol;

/***/ },
/* 61 */
/*!*************************************************!*\
  !*** ./~/core-js/library/fn/symbol/iterator.js ***!
  \*************************************************/
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(/*! ../../modules/es6.string.iterator */ 85);
	__webpack_require__(/*! ../../modules/web.dom.iterable */ 89);
	module.exports = __webpack_require__(/*! ../../modules/_wks-ext */ 36).f('iterator');

/***/ },
/* 62 */
/*!**************************************************!*\
  !*** ./~/core-js/library/modules/_a-function.js ***!
  \**************************************************/
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 63 */
/*!**********************************************************!*\
  !*** ./~/core-js/library/modules/_add-to-unscopables.js ***!
  \**********************************************************/
/***/ function(module, exports) {

	module.exports = function(){ /* empty */ };

/***/ },
/* 64 */
/*!******************************************************!*\
  !*** ./~/core-js/library/modules/_array-includes.js ***!
  \******************************************************/
/***/ function(module, exports, __webpack_require__) {

	// false -> Array#indexOf
	// true  -> Array#includes
	var toIObject = __webpack_require__(/*! ./_to-iobject */ 5)
	  , toLength  = __webpack_require__(/*! ./_to-length */ 79)
	  , toIndex   = __webpack_require__(/*! ./_to-index */ 78);
	module.exports = function(IS_INCLUDES){
	  return function($this, el, fromIndex){
	    var O      = toIObject($this)
	      , length = toLength(O.length)
	      , index  = toIndex(fromIndex, length)
	      , value;
	    // Array#includes uses SameValueZero equality algorithm
	    if(IS_INCLUDES && el != el)while(length > index){
	      value = O[index++];
	      if(value != value)return true;
	    // Array#toIndex ignores holes, Array#includes - not
	    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
	      if(O[index] === el)return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};

/***/ },
/* 65 */
/*!*************************************************!*\
  !*** ./~/core-js/library/modules/_enum-keys.js ***!
  \*************************************************/
/***/ function(module, exports, __webpack_require__) {

	// all enumerable object keys, includes symbols
	var getKeys = __webpack_require__(/*! ./_object-keys */ 20)
	  , gOPS    = __webpack_require__(/*! ./_object-gops */ 45)
	  , pIE     = __webpack_require__(/*! ./_object-pie */ 29);
	module.exports = function(it){
	  var result     = getKeys(it)
	    , getSymbols = gOPS.f;
	  if(getSymbols){
	    var symbols = getSymbols(it)
	      , isEnum  = pIE.f
	      , i       = 0
	      , key;
	    while(symbols.length > i)if(isEnum.call(it, key = symbols[i++]))result.push(key);
	  } return result;
	};

/***/ },
/* 66 */
/*!********************************************!*\
  !*** ./~/core-js/library/modules/_html.js ***!
  \********************************************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(/*! ./_global */ 3).document && document.documentElement;

/***/ },
/* 67 */
/*!***********************************************!*\
  !*** ./~/core-js/library/modules/_iobject.js ***!
  \***********************************************/
/***/ function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(/*! ./_cof */ 38);
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },
/* 68 */
/*!************************************************!*\
  !*** ./~/core-js/library/modules/_is-array.js ***!
  \************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 7.2.2 IsArray(argument)
	var cof = __webpack_require__(/*! ./_cof */ 38);
	module.exports = Array.isArray || function isArray(arg){
	  return cof(arg) == 'Array';
	};

/***/ },
/* 69 */
/*!***************************************************!*\
  !*** ./~/core-js/library/modules/_iter-create.js ***!
  \***************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var create         = __webpack_require__(/*! ./_object-create */ 28)
	  , descriptor     = __webpack_require__(/*! ./_property-desc */ 21)
	  , setToStringTag = __webpack_require__(/*! ./_set-to-string-tag */ 30)
	  , IteratorPrototype = {};
	
	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	__webpack_require__(/*! ./_hide */ 10)(IteratorPrototype, __webpack_require__(/*! ./_wks */ 12)('iterator'), function(){ return this; });
	
	module.exports = function(Constructor, NAME, next){
	  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
	  setToStringTag(Constructor, NAME + ' Iterator');
	};

/***/ },
/* 70 */
/*!*************************************************!*\
  !*** ./~/core-js/library/modules/_iter-step.js ***!
  \*************************************************/
/***/ function(module, exports) {

	module.exports = function(done, value){
	  return {value: value, done: !!done};
	};

/***/ },
/* 71 */
/*!*********************************************!*\
  !*** ./~/core-js/library/modules/_keyof.js ***!
  \*********************************************/
/***/ function(module, exports, __webpack_require__) {

	var getKeys   = __webpack_require__(/*! ./_object-keys */ 20)
	  , toIObject = __webpack_require__(/*! ./_to-iobject */ 5);
	module.exports = function(object, el){
	  var O      = toIObject(object)
	    , keys   = getKeys(O)
	    , length = keys.length
	    , index  = 0
	    , key;
	  while(length > index)if(O[key = keys[index++]] === el)return key;
	};

/***/ },
/* 72 */
/*!********************************************!*\
  !*** ./~/core-js/library/modules/_meta.js ***!
  \********************************************/
/***/ function(module, exports, __webpack_require__) {

	var META     = __webpack_require__(/*! ./_uid */ 22)('meta')
	  , isObject = __webpack_require__(/*! ./_is-object */ 15)
	  , has      = __webpack_require__(/*! ./_has */ 4)
	  , setDesc  = __webpack_require__(/*! ./_object-dp */ 11).f
	  , id       = 0;
	var isExtensible = Object.isExtensible || function(){
	  return true;
	};
	var FREEZE = !__webpack_require__(/*! ./_fails */ 19)(function(){
	  return isExtensible(Object.preventExtensions({}));
	});
	var setMeta = function(it){
	  setDesc(it, META, {value: {
	    i: 'O' + ++id, // object ID
	    w: {}          // weak collections IDs
	  }});
	};
	var fastKey = function(it, create){
	  // return primitive with prefix
	  if(!isObject(it))return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
	  if(!has(it, META)){
	    // can't set metadata to uncaught frozen object
	    if(!isExtensible(it))return 'F';
	    // not necessary to add metadata
	    if(!create)return 'E';
	    // add missing metadata
	    setMeta(it);
	  // return object ID
	  } return it[META].i;
	};
	var getWeak = function(it, create){
	  if(!has(it, META)){
	    // can't set metadata to uncaught frozen object
	    if(!isExtensible(it))return true;
	    // not necessary to add metadata
	    if(!create)return false;
	    // add missing metadata
	    setMeta(it);
	  // return hash weak collections IDs
	  } return it[META].w;
	};
	// add metadata on freeze-family methods calling
	var onFreeze = function(it){
	  if(FREEZE && meta.NEED && isExtensible(it) && !has(it, META))setMeta(it);
	  return it;
	};
	var meta = module.exports = {
	  KEY:      META,
	  NEED:     false,
	  fastKey:  fastKey,
	  getWeak:  getWeak,
	  onFreeze: onFreeze
	};

/***/ },
/* 73 */
/*!**************************************************!*\
  !*** ./~/core-js/library/modules/_object-dps.js ***!
  \**************************************************/
/***/ function(module, exports, __webpack_require__) {

	var dP       = __webpack_require__(/*! ./_object-dp */ 11)
	  , anObject = __webpack_require__(/*! ./_an-object */ 13)
	  , getKeys  = __webpack_require__(/*! ./_object-keys */ 20);
	
	module.exports = __webpack_require__(/*! ./_descriptors */ 9) ? Object.defineProperties : function defineProperties(O, Properties){
	  anObject(O);
	  var keys   = getKeys(Properties)
	    , length = keys.length
	    , i = 0
	    , P;
	  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
	  return O;
	};

/***/ },
/* 74 */
/*!*******************************************************!*\
  !*** ./~/core-js/library/modules/_object-gopn-ext.js ***!
  \*******************************************************/
/***/ function(module, exports, __webpack_require__) {

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
	var toIObject = __webpack_require__(/*! ./_to-iobject */ 5)
	  , gOPN      = __webpack_require__(/*! ./_object-gopn */ 44).f
	  , toString  = {}.toString;
	
	var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
	  ? Object.getOwnPropertyNames(window) : [];
	
	var getWindowNames = function(it){
	  try {
	    return gOPN(it);
	  } catch(e){
	    return windowNames.slice();
	  }
	};
	
	module.exports.f = function getOwnPropertyNames(it){
	  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
	};


/***/ },
/* 75 */
/*!**************************************************!*\
  !*** ./~/core-js/library/modules/_object-gpo.js ***!
  \**************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
	var has         = __webpack_require__(/*! ./_has */ 4)
	  , toObject    = __webpack_require__(/*! ./_to-object */ 80)
	  , IE_PROTO    = __webpack_require__(/*! ./_shared-key */ 31)('IE_PROTO')
	  , ObjectProto = Object.prototype;
	
	module.exports = Object.getPrototypeOf || function(O){
	  O = toObject(O);
	  if(has(O, IE_PROTO))return O[IE_PROTO];
	  if(typeof O.constructor == 'function' && O instanceof O.constructor){
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectProto : null;
	};

/***/ },
/* 76 */
/*!*************************************************!*\
  !*** ./~/core-js/library/modules/_set-proto.js ***!
  \*************************************************/
/***/ function(module, exports, __webpack_require__) {

	// Works with __proto__ only. Old v8 can't work with null proto objects.
	/* eslint-disable no-proto */
	var isObject = __webpack_require__(/*! ./_is-object */ 15)
	  , anObject = __webpack_require__(/*! ./_an-object */ 13);
	var check = function(O, proto){
	  anObject(O);
	  if(!isObject(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");
	};
	module.exports = {
	  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
	    function(test, buggy, set){
	      try {
	        set = __webpack_require__(/*! ./_ctx */ 39)(Function.call, __webpack_require__(/*! ./_object-gopd */ 43).f(Object.prototype, '__proto__').set, 2);
	        set(test, []);
	        buggy = !(test instanceof Array);
	      } catch(e){ buggy = true; }
	      return function setPrototypeOf(O, proto){
	        check(O, proto);
	        if(buggy)O.__proto__ = proto;
	        else set(O, proto);
	        return O;
	      };
	    }({}, false) : undefined),
	  check: check
	};

/***/ },
/* 77 */
/*!*************************************************!*\
  !*** ./~/core-js/library/modules/_string-at.js ***!
  \*************************************************/
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(/*! ./_to-integer */ 33)
	  , defined   = __webpack_require__(/*! ./_defined */ 24);
	// true  -> String#at
	// false -> String#codePointAt
	module.exports = function(TO_STRING){
	  return function(that, pos){
	    var s = String(defined(that))
	      , i = toInteger(pos)
	      , l = s.length
	      , a, b;
	    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	      ? TO_STRING ? s.charAt(i) : a
	      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};

/***/ },
/* 78 */
/*!************************************************!*\
  !*** ./~/core-js/library/modules/_to-index.js ***!
  \************************************************/
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(/*! ./_to-integer */ 33)
	  , max       = Math.max
	  , min       = Math.min;
	module.exports = function(index, length){
	  index = toInteger(index);
	  return index < 0 ? max(index + length, 0) : min(index, length);
	};

/***/ },
/* 79 */
/*!*************************************************!*\
  !*** ./~/core-js/library/modules/_to-length.js ***!
  \*************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 7.1.15 ToLength
	var toInteger = __webpack_require__(/*! ./_to-integer */ 33)
	  , min       = Math.min;
	module.exports = function(it){
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

/***/ },
/* 80 */
/*!*************************************************!*\
  !*** ./~/core-js/library/modules/_to-object.js ***!
  \*************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(/*! ./_defined */ 24);
	module.exports = function(it){
	  return Object(defined(it));
	};

/***/ },
/* 81 */
/*!*********************************************************!*\
  !*** ./~/core-js/library/modules/es6.array.iterator.js ***!
  \*********************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var addToUnscopables = __webpack_require__(/*! ./_add-to-unscopables */ 63)
	  , step             = __webpack_require__(/*! ./_iter-step */ 70)
	  , Iterators        = __webpack_require__(/*! ./_iterators */ 26)
	  , toIObject        = __webpack_require__(/*! ./_to-iobject */ 5);
	
	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	module.exports = __webpack_require__(/*! ./_iter-define */ 42)(Array, 'Array', function(iterated, kind){
	  this._t = toIObject(iterated); // target
	  this._i = 0;                   // next index
	  this._k = kind;                // kind
	// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , kind  = this._k
	    , index = this._i++;
	  if(!O || index >= O.length){
	    this._t = undefined;
	    return step(1);
	  }
	  if(kind == 'keys'  )return step(0, index);
	  if(kind == 'values')return step(0, O[index]);
	  return step(0, [index, O[index]]);
	}, 'values');
	
	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	Iterators.Arguments = Iterators.Array;
	
	addToUnscopables('keys');
	addToUnscopables('values');
	addToUnscopables('entries');

/***/ },
/* 82 */
/*!********************************************************!*\
  !*** ./~/core-js/library/modules/es6.object.create.js ***!
  \********************************************************/
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(/*! ./_export */ 18)
	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	$export($export.S, 'Object', {create: __webpack_require__(/*! ./_object-create */ 28)});

/***/ },
/* 83 */
/*!******************************************************************!*\
  !*** ./~/core-js/library/modules/es6.object.set-prototype-of.js ***!
  \******************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.19 Object.setPrototypeOf(O, proto)
	var $export = __webpack_require__(/*! ./_export */ 18);
	$export($export.S, 'Object', {setPrototypeOf: __webpack_require__(/*! ./_set-proto */ 76).set});

/***/ },
/* 84 */
/*!***********************************************************!*\
  !*** ./~/core-js/library/modules/es6.object.to-string.js ***!
  \***********************************************************/
/***/ function(module, exports) {



/***/ },
/* 85 */
/*!**********************************************************!*\
  !*** ./~/core-js/library/modules/es6.string.iterator.js ***!
  \**********************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $at  = __webpack_require__(/*! ./_string-at */ 77)(true);
	
	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__(/*! ./_iter-define */ 42)(String, 'String', function(iterated){
	  this._t = String(iterated); // target
	  this._i = 0;                // next index
	// 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , index = this._i
	    , point;
	  if(index >= O.length)return {value: undefined, done: true};
	  point = $at(O, index);
	  this._i += point.length;
	  return {value: point, done: false};
	});

/***/ },
/* 86 */
/*!*************************************************!*\
  !*** ./~/core-js/library/modules/es6.symbol.js ***!
  \*************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// ECMAScript 6 symbols shim
	var global         = __webpack_require__(/*! ./_global */ 3)
	  , has            = __webpack_require__(/*! ./_has */ 4)
	  , DESCRIPTORS    = __webpack_require__(/*! ./_descriptors */ 9)
	  , $export        = __webpack_require__(/*! ./_export */ 18)
	  , redefine       = __webpack_require__(/*! ./_redefine */ 47)
	  , META           = __webpack_require__(/*! ./_meta */ 72).KEY
	  , $fails         = __webpack_require__(/*! ./_fails */ 19)
	  , shared         = __webpack_require__(/*! ./_shared */ 32)
	  , setToStringTag = __webpack_require__(/*! ./_set-to-string-tag */ 30)
	  , uid            = __webpack_require__(/*! ./_uid */ 22)
	  , wks            = __webpack_require__(/*! ./_wks */ 12)
	  , wksExt         = __webpack_require__(/*! ./_wks-ext */ 36)
	  , wksDefine      = __webpack_require__(/*! ./_wks-define */ 35)
	  , keyOf          = __webpack_require__(/*! ./_keyof */ 71)
	  , enumKeys       = __webpack_require__(/*! ./_enum-keys */ 65)
	  , isArray        = __webpack_require__(/*! ./_is-array */ 68)
	  , anObject       = __webpack_require__(/*! ./_an-object */ 13)
	  , toIObject      = __webpack_require__(/*! ./_to-iobject */ 5)
	  , toPrimitive    = __webpack_require__(/*! ./_to-primitive */ 34)
	  , createDesc     = __webpack_require__(/*! ./_property-desc */ 21)
	  , _create        = __webpack_require__(/*! ./_object-create */ 28)
	  , gOPNExt        = __webpack_require__(/*! ./_object-gopn-ext */ 74)
	  , $GOPD          = __webpack_require__(/*! ./_object-gopd */ 43)
	  , $DP            = __webpack_require__(/*! ./_object-dp */ 11)
	  , $keys          = __webpack_require__(/*! ./_object-keys */ 20)
	  , gOPD           = $GOPD.f
	  , dP             = $DP.f
	  , gOPN           = gOPNExt.f
	  , $Symbol        = global.Symbol
	  , $JSON          = global.JSON
	  , _stringify     = $JSON && $JSON.stringify
	  , PROTOTYPE      = 'prototype'
	  , HIDDEN         = wks('_hidden')
	  , TO_PRIMITIVE   = wks('toPrimitive')
	  , isEnum         = {}.propertyIsEnumerable
	  , SymbolRegistry = shared('symbol-registry')
	  , AllSymbols     = shared('symbols')
	  , OPSymbols      = shared('op-symbols')
	  , ObjectProto    = Object[PROTOTYPE]
	  , USE_NATIVE     = typeof $Symbol == 'function'
	  , QObject        = global.QObject;
	// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
	var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;
	
	// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
	var setSymbolDesc = DESCRIPTORS && $fails(function(){
	  return _create(dP({}, 'a', {
	    get: function(){ return dP(this, 'a', {value: 7}).a; }
	  })).a != 7;
	}) ? function(it, key, D){
	  var protoDesc = gOPD(ObjectProto, key);
	  if(protoDesc)delete ObjectProto[key];
	  dP(it, key, D);
	  if(protoDesc && it !== ObjectProto)dP(ObjectProto, key, protoDesc);
	} : dP;
	
	var wrap = function(tag){
	  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
	  sym._k = tag;
	  return sym;
	};
	
	var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function(it){
	  return typeof it == 'symbol';
	} : function(it){
	  return it instanceof $Symbol;
	};
	
	var $defineProperty = function defineProperty(it, key, D){
	  if(it === ObjectProto)$defineProperty(OPSymbols, key, D);
	  anObject(it);
	  key = toPrimitive(key, true);
	  anObject(D);
	  if(has(AllSymbols, key)){
	    if(!D.enumerable){
	      if(!has(it, HIDDEN))dP(it, HIDDEN, createDesc(1, {}));
	      it[HIDDEN][key] = true;
	    } else {
	      if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
	      D = _create(D, {enumerable: createDesc(0, false)});
	    } return setSymbolDesc(it, key, D);
	  } return dP(it, key, D);
	};
	var $defineProperties = function defineProperties(it, P){
	  anObject(it);
	  var keys = enumKeys(P = toIObject(P))
	    , i    = 0
	    , l = keys.length
	    , key;
	  while(l > i)$defineProperty(it, key = keys[i++], P[key]);
	  return it;
	};
	var $create = function create(it, P){
	  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
	};
	var $propertyIsEnumerable = function propertyIsEnumerable(key){
	  var E = isEnum.call(this, key = toPrimitive(key, true));
	  if(this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return false;
	  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
	};
	var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key){
	  it  = toIObject(it);
	  key = toPrimitive(key, true);
	  if(it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return;
	  var D = gOPD(it, key);
	  if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
	  return D;
	};
	var $getOwnPropertyNames = function getOwnPropertyNames(it){
	  var names  = gOPN(toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i){
	    if(!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META)result.push(key);
	  } return result;
	};
	var $getOwnPropertySymbols = function getOwnPropertySymbols(it){
	  var IS_OP  = it === ObjectProto
	    , names  = gOPN(IS_OP ? OPSymbols : toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i){
	    if(has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true))result.push(AllSymbols[key]);
	  } return result;
	};
	
	// 19.4.1.1 Symbol([description])
	if(!USE_NATIVE){
	  $Symbol = function Symbol(){
	    if(this instanceof $Symbol)throw TypeError('Symbol is not a constructor!');
	    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
	    var $set = function(value){
	      if(this === ObjectProto)$set.call(OPSymbols, value);
	      if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
	      setSymbolDesc(this, tag, createDesc(1, value));
	    };
	    if(DESCRIPTORS && setter)setSymbolDesc(ObjectProto, tag, {configurable: true, set: $set});
	    return wrap(tag);
	  };
	  redefine($Symbol[PROTOTYPE], 'toString', function toString(){
	    return this._k;
	  });
	
	  $GOPD.f = $getOwnPropertyDescriptor;
	  $DP.f   = $defineProperty;
	  __webpack_require__(/*! ./_object-gopn */ 44).f = gOPNExt.f = $getOwnPropertyNames;
	  __webpack_require__(/*! ./_object-pie */ 29).f  = $propertyIsEnumerable;
	  __webpack_require__(/*! ./_object-gops */ 45).f = $getOwnPropertySymbols;
	
	  if(DESCRIPTORS && !__webpack_require__(/*! ./_library */ 27)){
	    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
	  }
	
	  wksExt.f = function(name){
	    return wrap(wks(name));
	  }
	}
	
	$export($export.G + $export.W + $export.F * !USE_NATIVE, {Symbol: $Symbol});
	
	for(var symbols = (
	  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
	  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
	).split(','), i = 0; symbols.length > i; )wks(symbols[i++]);
	
	for(var symbols = $keys(wks.store), i = 0; symbols.length > i; )wksDefine(symbols[i++]);
	
	$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
	  // 19.4.2.1 Symbol.for(key)
	  'for': function(key){
	    return has(SymbolRegistry, key += '')
	      ? SymbolRegistry[key]
	      : SymbolRegistry[key] = $Symbol(key);
	  },
	  // 19.4.2.5 Symbol.keyFor(sym)
	  keyFor: function keyFor(key){
	    if(isSymbol(key))return keyOf(SymbolRegistry, key);
	    throw TypeError(key + ' is not a symbol!');
	  },
	  useSetter: function(){ setter = true; },
	  useSimple: function(){ setter = false; }
	});
	
	$export($export.S + $export.F * !USE_NATIVE, 'Object', {
	  // 19.1.2.2 Object.create(O [, Properties])
	  create: $create,
	  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
	  defineProperty: $defineProperty,
	  // 19.1.2.3 Object.defineProperties(O, Properties)
	  defineProperties: $defineProperties,
	  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
	  // 19.1.2.7 Object.getOwnPropertyNames(O)
	  getOwnPropertyNames: $getOwnPropertyNames,
	  // 19.1.2.8 Object.getOwnPropertySymbols(O)
	  getOwnPropertySymbols: $getOwnPropertySymbols
	});
	
	// 24.3.2 JSON.stringify(value [, replacer [, space]])
	$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function(){
	  var S = $Symbol();
	  // MS Edge converts symbol values to JSON as {}
	  // WebKit converts symbol values to JSON as null
	  // V8 throws on boxed symbols
	  return _stringify([S]) != '[null]' || _stringify({a: S}) != '{}' || _stringify(Object(S)) != '{}';
	})), 'JSON', {
	  stringify: function stringify(it){
	    if(it === undefined || isSymbol(it))return; // IE8 returns string on undefined
	    var args = [it]
	      , i    = 1
	      , replacer, $replacer;
	    while(arguments.length > i)args.push(arguments[i++]);
	    replacer = args[1];
	    if(typeof replacer == 'function')$replacer = replacer;
	    if($replacer || !isArray(replacer))replacer = function(key, value){
	      if($replacer)value = $replacer.call(this, key, value);
	      if(!isSymbol(value))return value;
	    };
	    args[1] = replacer;
	    return _stringify.apply($JSON, args);
	  }
	});
	
	// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
	$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(/*! ./_hide */ 10)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
	// 19.4.3.5 Symbol.prototype[@@toStringTag]
	setToStringTag($Symbol, 'Symbol');
	// 20.2.1.9 Math[@@toStringTag]
	setToStringTag(Math, 'Math', true);
	// 24.3.3 JSON[@@toStringTag]
	setToStringTag(global.JSON, 'JSON', true);

/***/ },
/* 87 */
/*!****************************************************************!*\
  !*** ./~/core-js/library/modules/es7.symbol.async-iterator.js ***!
  \****************************************************************/
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(/*! ./_wks-define */ 35)('asyncIterator');

/***/ },
/* 88 */
/*!************************************************************!*\
  !*** ./~/core-js/library/modules/es7.symbol.observable.js ***!
  \************************************************************/
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(/*! ./_wks-define */ 35)('observable');

/***/ },
/* 89 */
/*!*******************************************************!*\
  !*** ./~/core-js/library/modules/web.dom.iterable.js ***!
  \*******************************************************/
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(/*! ./es6.array.iterator */ 81);
	var global        = __webpack_require__(/*! ./_global */ 3)
	  , hide          = __webpack_require__(/*! ./_hide */ 10)
	  , Iterators     = __webpack_require__(/*! ./_iterators */ 26)
	  , TO_STRING_TAG = __webpack_require__(/*! ./_wks */ 12)('toStringTag');
	
	for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
	  var NAME       = collections[i]
	    , Collection = global[NAME]
	    , proto      = Collection && Collection.prototype;
	  if(proto && !proto[TO_STRING_TAG])hide(proto, TO_STRING_TAG, NAME);
	  Iterators[NAME] = Iterators.Array;
	}

/***/ },
/* 90 */
/*!*****************************!*\
  !*** ./client/css/main.css ***!
  \*****************************/
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 91 */
/*!*********************************************!*\
  !*** ./client/js/utils/initializeRender.js ***!
  \*********************************************/
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	exports.__esModule = true;
	exports.default = createRender;
	
	var _react = __webpack_require__(/*! react */ 2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(/*! react-dom */ 104);
	
	var _reactRedux = __webpack_require__(/*! react-redux */ 50);
	
	var _fastclick = __webpack_require__(/*! fastclick */ 102);
	
	var _fastclick2 = _interopRequireDefault(_fastclick);
	
	var _App = __webpack_require__(/*! ../../../common/App.jsx */ 92);
	
	var _App2 = _interopRequireDefault(_App);
	
	var _index = __webpack_require__(/*! ../../../common/store/index */ 93);
	
	var _index2 = _interopRequireDefault(_index);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	if (process.env.NODE_ENV !== 'production') {
	    var whyDidYouUpdate = __webpack_require__(/*! why-did-you-update */ 109).default;
	    whyDidYouUpdate(_react2.default);
	    var ReactPerf = __webpack_require__(/*! react-addons-perf */ 103);
	    window.ReactPerf = ReactPerf;
	}
	
	// fastclick解决ios和部分安卓click事件的问题
	_fastclick2.default.attach(document.body);
	
	function createRender() {
	    var middlewareConfig = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	    var store = null;
	    var page = document.getElementById('page');
	
	    if (process.env.NODE_ENV !== 'production') {
	        // React.addons.Perf性能分析使用
	        if (window.ReactPerf) {
	            ReactPerf.start();
	        }
	    }
	
	    return function (_ref) {
	        var _ref$rootReducer = _ref.rootReducer;
	        var rootReducer = _ref$rootReducer === undefined ? function () {} : _ref$rootReducer;
	        var _ref$component = _ref.component;
	        var component = _ref$component === undefined ? null : _ref$component;
	
	        var transformedData = typeof middlewareConfig.transformer === 'function' ? middlewareConfig.transformer(window.__INITIAL_STATE__) : window.__INITIAL_STATE__;
	        if (!store) {
	            store = (0, _index2.default)(transformedData, rootReducer);
	        }
	        // hot load from hmr
	        else if (process.env.NODE_ENV !== 'production') {
	                store.replaceReducer(rootReducer);
	            }
	
	        (0, _reactDom.render)(_react2.default.createElement(
	            _reactRedux.Provider,
	            { store: store },
	            _react2.default.createElement(
	                _App2.default,
	                { appConfig: window.__App_CONFIG__ },
	                component
	            )
	        ), page);
	
	        return Promise.resolve(store);
	    };
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! ./~/process/browser.js */ 17)))

/***/ },
/* 92 */
/*!************************!*\
  !*** ./common/App.jsx ***!
  \************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _classCallCheck2 = __webpack_require__(/*! babel-runtime/helpers/classCallCheck */ 6);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _possibleConstructorReturn2 = __webpack_require__(/*! babel-runtime/helpers/possibleConstructorReturn */ 8);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(/*! babel-runtime/helpers/inherits */ 7);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _react = __webpack_require__(/*! react */ 2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _events = __webpack_require__(/*! events */ 48);
	
	var _events2 = _interopRequireDefault(_events);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var mediator = new _events2.default();
	
	var App = function (_Component) {
	    (0, _inherits3.default)(App, _Component);
	
	    function App(props, context) {
	        (0, _classCallCheck3.default)(this, App);
	        return (0, _possibleConstructorReturn3.default)(this, _Component.call(this, props, context));
	    }
	
	    App.prototype.getChildContext = function getChildContext() {
	        return {
	            $eventBus: mediator,
	            $appConfig: this.props.appConfig
	        };
	    };
	
	    App.prototype.componentDidMount = function componentDidMount() {};
	
	    App.prototype.componentDidUpdate = function componentDidUpdate() {};
	
	    App.prototype.componentWillUnmount = function componentWillUnmount() {};
	
	    App.prototype.render = function render() {
	        return _react2.default.createElement(
	            'div',
	            null,
	            this.props.children
	        );
	    };
	
	    return App;
	}(_react.Component);
	
	App.defaultProps = {
	    appConfig: null
	};
	App.propTypes = {
	    appConfig: _react.PropTypes.object
	};
	App.childContextTypes = {
	    $eventBus: _react.PropTypes.instanceOf(_events2.default),
	    $appConfig: _react.PropTypes.object
	};
	
	exports.default = App;

/***/ },
/* 93 */
/*!*******************************!*\
  !*** ./common/store/index.js ***!
  \*******************************/
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	exports.__esModule = true;
	exports.default = configureStore;
	
	var _redux = __webpack_require__(/*! redux */ 51);
	
	var _reduxThunk = __webpack_require__(/*! redux-thunk */ 107);
	
	var _reduxThunk2 = _interopRequireDefault(_reduxThunk);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	if (process.env.NODE_ENV !== 'production' && process.browser) {
	    var createLogger = __webpack_require__(/*! redux-logger */ 106);
	}
	
	var middlewareBuilder = function middlewareBuilder() {
	    var middleware = (0, _redux.applyMiddleware)(_reduxThunk2.default);
	
	    if (process.browser && process.env.NODE_ENV !== 'production') {
	        if (!window.devToolsExtension) {
	            middleware = (0, _redux.applyMiddleware)(_reduxThunk2.default, createLogger());
	        }
	    }
	
	    var allComposeElements = [middleware];
	
	    if (process.browser && process.env.NODE_ENV !== 'production') {
	        if (window.devToolsExtension) {
	            allComposeElements.push(window.devToolsExtension());
	        }
	    }
	
	    return allComposeElements;
	};
	
	var finalCreateStore = _redux.compose.apply(undefined, middlewareBuilder())(_redux.createStore);
	
	function configureStore(initialState, rootReducer) {
	    var store = finalCreateStore(rootReducer, initialState);
	
	    return store;
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! ./~/process/browser.js */ 17)))

/***/ },
/* 94 */
/*!**************************************!*\
  !*** ./common/utils/shallowEqual.js ***!
  \**************************************/
/***/ function(module, exports, __webpack_require__) {

	// modified
	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @typechecks
	 *
	 */
	
	/*eslint-disable no-self-compare */
	
	'use strict';
	
	var _typeof2 = __webpack_require__(/*! babel-runtime/helpers/typeof */ 23);
	
	var _typeof3 = _interopRequireDefault(_typeof2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	
	/**
	 * inlined Object.is polyfill to avoid requiring consumers ship their own
	 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
	 */
	function is(x, y) {
	    // SameValue algorithm
	    if (x === y) {
	        // Steps 1-5, 7-10
	        // Steps 6.b-6.e: +0 != -0
	        return x !== 0 || 1 / x === 1 / y;
	    } else {
	        if (typeof x === 'function' && typeof y === 'function') {
	            return x.toString() === y.toString();
	        }
	        // Step 6.a: NaN == NaN
	        return x !== x && y !== y;
	    }
	}
	
	/**
	 * Performs equality by iterating through keys on an object and returning false
	 * when any key has values which are not strictly equal between the arguments.
	 * Returns true when the values of all keys are strictly equal.
	 */
	function shallowEqual(objA, objB) {
	    if (is(objA, objB)) {
	        return true;
	    }
	
	    if ((typeof objA === 'undefined' ? 'undefined' : (0, _typeof3.default)(objA)) !== 'object' || objA === null || (typeof objB === 'undefined' ? 'undefined' : (0, _typeof3.default)(objB)) !== 'object' || objB === null) {
	        return false;
	    }
	
	    var keysA = Object.keys(objA);
	    var keysB = Object.keys(objB);
	
	    if (keysA.length !== keysB.length) {
	        return false;
	    }
	
	    // Test for A's keys different from B.
	    for (var i = 0; i < keysA.length; i++) {
	        if (!hasOwnProperty.call(objB, keysA[i]) || !is(objA[keysA[i]], objB[keysA[i]])) {
	            return false;
	        }
	    }
	
	    return true;
	}
	
	module.exports = shallowEqual;

/***/ },
/* 95 */
/*!**********************************!*\
  !*** ./~/html-entities/index.js ***!
  \**********************************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = {
	  XmlEntities: __webpack_require__(/*! ./lib/xml-entities.js */ 97),
	  Html4Entities: __webpack_require__(/*! ./lib/html4-entities.js */ 96),
	  Html5Entities: __webpack_require__(/*! ./lib/html5-entities.js */ 49),
	  AllHtmlEntities: __webpack_require__(/*! ./lib/html5-entities.js */ 49)
	};


/***/ },
/* 96 */
/*!***********************************************!*\
  !*** ./~/html-entities/lib/html4-entities.js ***!
  \***********************************************/
/***/ function(module, exports) {

	var HTML_ALPHA = ['apos', 'nbsp', 'iexcl', 'cent', 'pound', 'curren', 'yen', 'brvbar', 'sect', 'uml', 'copy', 'ordf', 'laquo', 'not', 'shy', 'reg', 'macr', 'deg', 'plusmn', 'sup2', 'sup3', 'acute', 'micro', 'para', 'middot', 'cedil', 'sup1', 'ordm', 'raquo', 'frac14', 'frac12', 'frac34', 'iquest', 'Agrave', 'Aacute', 'Acirc', 'Atilde', 'Auml', 'Aring', 'Aelig', 'Ccedil', 'Egrave', 'Eacute', 'Ecirc', 'Euml', 'Igrave', 'Iacute', 'Icirc', 'Iuml', 'ETH', 'Ntilde', 'Ograve', 'Oacute', 'Ocirc', 'Otilde', 'Ouml', 'times', 'Oslash', 'Ugrave', 'Uacute', 'Ucirc', 'Uuml', 'Yacute', 'THORN', 'szlig', 'agrave', 'aacute', 'acirc', 'atilde', 'auml', 'aring', 'aelig', 'ccedil', 'egrave', 'eacute', 'ecirc', 'euml', 'igrave', 'iacute', 'icirc', 'iuml', 'eth', 'ntilde', 'ograve', 'oacute', 'ocirc', 'otilde', 'ouml', 'divide', 'Oslash', 'ugrave', 'uacute', 'ucirc', 'uuml', 'yacute', 'thorn', 'yuml', 'quot', 'amp', 'lt', 'gt', 'oelig', 'oelig', 'scaron', 'scaron', 'yuml', 'circ', 'tilde', 'ensp', 'emsp', 'thinsp', 'zwnj', 'zwj', 'lrm', 'rlm', 'ndash', 'mdash', 'lsquo', 'rsquo', 'sbquo', 'ldquo', 'rdquo', 'bdquo', 'dagger', 'dagger', 'permil', 'lsaquo', 'rsaquo', 'euro', 'fnof', 'alpha', 'beta', 'gamma', 'delta', 'epsilon', 'zeta', 'eta', 'theta', 'iota', 'kappa', 'lambda', 'mu', 'nu', 'xi', 'omicron', 'pi', 'rho', 'sigma', 'tau', 'upsilon', 'phi', 'chi', 'psi', 'omega', 'alpha', 'beta', 'gamma', 'delta', 'epsilon', 'zeta', 'eta', 'theta', 'iota', 'kappa', 'lambda', 'mu', 'nu', 'xi', 'omicron', 'pi', 'rho', 'sigmaf', 'sigma', 'tau', 'upsilon', 'phi', 'chi', 'psi', 'omega', 'thetasym', 'upsih', 'piv', 'bull', 'hellip', 'prime', 'prime', 'oline', 'frasl', 'weierp', 'image', 'real', 'trade', 'alefsym', 'larr', 'uarr', 'rarr', 'darr', 'harr', 'crarr', 'larr', 'uarr', 'rarr', 'darr', 'harr', 'forall', 'part', 'exist', 'empty', 'nabla', 'isin', 'notin', 'ni', 'prod', 'sum', 'minus', 'lowast', 'radic', 'prop', 'infin', 'ang', 'and', 'or', 'cap', 'cup', 'int', 'there4', 'sim', 'cong', 'asymp', 'ne', 'equiv', 'le', 'ge', 'sub', 'sup', 'nsub', 'sube', 'supe', 'oplus', 'otimes', 'perp', 'sdot', 'lceil', 'rceil', 'lfloor', 'rfloor', 'lang', 'rang', 'loz', 'spades', 'clubs', 'hearts', 'diams'];
	var HTML_CODES = [39, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 174, 175, 176, 177, 178, 179, 180, 181, 182, 183, 184, 185, 186, 187, 188, 189, 190, 191, 192, 193, 194, 195, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 222, 223, 224, 225, 226, 227, 228, 229, 230, 231, 232, 233, 234, 235, 236, 237, 238, 239, 240, 241, 242, 243, 244, 245, 246, 247, 248, 249, 250, 251, 252, 253, 254, 255, 34, 38, 60, 62, 338, 339, 352, 353, 376, 710, 732, 8194, 8195, 8201, 8204, 8205, 8206, 8207, 8211, 8212, 8216, 8217, 8218, 8220, 8221, 8222, 8224, 8225, 8240, 8249, 8250, 8364, 402, 913, 914, 915, 916, 917, 918, 919, 920, 921, 922, 923, 924, 925, 926, 927, 928, 929, 931, 932, 933, 934, 935, 936, 937, 945, 946, 947, 948, 949, 950, 951, 952, 953, 954, 955, 956, 957, 958, 959, 960, 961, 962, 963, 964, 965, 966, 967, 968, 969, 977, 978, 982, 8226, 8230, 8242, 8243, 8254, 8260, 8472, 8465, 8476, 8482, 8501, 8592, 8593, 8594, 8595, 8596, 8629, 8656, 8657, 8658, 8659, 8660, 8704, 8706, 8707, 8709, 8711, 8712, 8713, 8715, 8719, 8721, 8722, 8727, 8730, 8733, 8734, 8736, 8743, 8744, 8745, 8746, 8747, 8756, 8764, 8773, 8776, 8800, 8801, 8804, 8805, 8834, 8835, 8836, 8838, 8839, 8853, 8855, 8869, 8901, 8968, 8969, 8970, 8971, 9001, 9002, 9674, 9824, 9827, 9829, 9830];
	
	var alphaIndex = {};
	var numIndex = {};
	
	var i = 0;
	var length = HTML_ALPHA.length;
	while (i < length) {
	    var a = HTML_ALPHA[i];
	    var c = HTML_CODES[i];
	    alphaIndex[a] = String.fromCharCode(c);
	    numIndex[c] = a;
	    i++;
	}
	
	/**
	 * @constructor
	 */
	function Html4Entities() {}
	
	/**
	 * @param {String} str
	 * @returns {String}
	 */
	Html4Entities.prototype.decode = function(str) {
	    if (str.length === 0) {
	        return '';
	    }
	    return str.replace(/&(#?[\w\d]+);?/g, function(s, entity) {
	        var chr;
	        if (entity.charAt(0) === "#") {
	            var code = entity.charAt(1).toLowerCase() === 'x' ?
	                parseInt(entity.substr(2), 16) :
	                parseInt(entity.substr(1));
	
	            if (!(isNaN(code) || code < -32768 || code > 65535)) {
	                chr = String.fromCharCode(code);
	            }
	        } else {
	            chr = alphaIndex[entity];
	        }
	        return chr || s;
	    });
	};
	
	/**
	 * @param {String} str
	 * @returns {String}
	 */
	Html4Entities.decode = function(str) {
	    return new Html4Entities().decode(str);
	};
	
	/**
	 * @param {String} str
	 * @returns {String}
	 */
	Html4Entities.prototype.encode = function(str) {
	    var strLength = str.length;
	    if (strLength === 0) {
	        return '';
	    }
	    var result = '';
	    var i = 0;
	    while (i < strLength) {
	        var alpha = numIndex[str.charCodeAt(i)];
	        result += alpha ? "&" + alpha + ";" : str.charAt(i);
	        i++;
	    }
	    return result;
	};
	
	/**
	 * @param {String} str
	 * @returns {String}
	 */
	Html4Entities.encode = function(str) {
	    return new Html4Entities().encode(str);
	};
	
	/**
	 * @param {String} str
	 * @returns {String}
	 */
	Html4Entities.prototype.encodeNonUTF = function(str) {
	    var strLength = str.length;
	    if (strLength === 0) {
	        return '';
	    }
	    var result = '';
	    var i = 0;
	    while (i < strLength) {
	        var cc = str.charCodeAt(i);
	        var alpha = numIndex[cc];
	        if (alpha) {
	            result += "&" + alpha + ";";
	        } else if (cc < 32 || cc > 126) {
	            result += "&#" + cc + ";";
	        } else {
	            result += str.charAt(i);
	        }
	        i++;
	    }
	    return result;
	};
	
	/**
	 * @param {String} str
	 * @returns {String}
	 */
	Html4Entities.encodeNonUTF = function(str) {
	    return new Html4Entities().encodeNonUTF(str);
	};
	
	/**
	 * @param {String} str
	 * @returns {String}
	 */
	Html4Entities.prototype.encodeNonASCII = function(str) {
	    var strLength = str.length;
	    if (strLength === 0) {
	        return '';
	    }
	    var result = '';
	    var i = 0;
	    while (i < strLength) {
	        var c = str.charCodeAt(i);
	        if (c <= 255) {
	            result += str[i++];
	            continue;
	        }
	        result += '&#' + c + ';';
	        i++;
	    }
	    return result;
	};
	
	/**
	 * @param {String} str
	 * @returns {String}
	 */
	Html4Entities.encodeNonASCII = function(str) {
	    return new Html4Entities().encodeNonASCII(str);
	};
	
	module.exports = Html4Entities;


/***/ },
/* 97 */
/*!*********************************************!*\
  !*** ./~/html-entities/lib/xml-entities.js ***!
  \*********************************************/
/***/ function(module, exports) {

	var ALPHA_INDEX = {
	    '&lt': '<',
	    '&gt': '>',
	    '&quot': '"',
	    '&apos': '\'',
	    '&amp': '&',
	    '&lt;': '<',
	    '&gt;': '>',
	    '&quot;': '"',
	    '&apos;': '\'',
	    '&amp;': '&'
	};
	
	var CHAR_INDEX = {
	    60: 'lt',
	    62: 'gt',
	    34: 'quot',
	    39: 'apos',
	    38: 'amp'
	};
	
	var CHAR_S_INDEX = {
	    '<': '&lt;',
	    '>': '&gt;',
	    '"': '&quot;',
	    '\'': '&apos;',
	    '&': '&amp;'
	};
	
	/**
	 * @constructor
	 */
	function XmlEntities() {}
	
	/**
	 * @param {String} str
	 * @returns {String}
	 */
	XmlEntities.prototype.encode = function(str) {
	    if (str.length === 0) {
	        return '';
	    }
	    return str.replace(/<|>|"|'|&/g, function(s) {
	        return CHAR_S_INDEX[s];
	    });
	};
	
	/**
	 * @param {String} str
	 * @returns {String}
	 */
	 XmlEntities.encode = function(str) {
	    return new XmlEntities().encode(str);
	 };
	
	/**
	 * @param {String} str
	 * @returns {String}
	 */
	XmlEntities.prototype.decode = function(str) {
	    if (str.length === 0) {
	        return '';
	    }
	    return str.replace(/&#?[0-9a-zA-Z]+;?/g, function(s) {
	        if (s.charAt(1) === '#') {
	            var code = s.charAt(2).toLowerCase() === 'x' ?
	                parseInt(s.substr(3), 16) :
	                parseInt(s.substr(2));
	
	            if (isNaN(code) || code < -32768 || code > 65535) {
	                return '';
	            }
	            return String.fromCharCode(code);
	        }
	        return ALPHA_INDEX[s] || s;
	    });
	};
	
	/**
	 * @param {String} str
	 * @returns {String}
	 */
	 XmlEntities.decode = function(str) {
	    return new XmlEntities().decode(str);
	 };
	
	/**
	 * @param {String} str
	 * @returns {String}
	 */
	XmlEntities.prototype.encodeNonUTF = function(str) {
	    var strLength = str.length;
	    if (strLength === 0) {
	        return '';
	    }
	    var result = '';
	    var i = 0;
	    while (i < strLength) {
	        var c = str.charCodeAt(i);
	        var alpha = CHAR_INDEX[c];
	        if (alpha) {
	            result += "&" + alpha + ";";
	            i++;
	            continue;
	        }
	        if (c < 32 || c > 126) {
	            result += '&#' + c + ';';
	        } else {
	            result += str.charAt(i);
	        }
	        i++;
	    }
	    return result;
	};
	
	/**
	 * @param {String} str
	 * @returns {String}
	 */
	 XmlEntities.encodeNonUTF = function(str) {
	    return new XmlEntities().encodeNonUTF(str);
	 };
	
	/**
	 * @param {String} str
	 * @returns {String}
	 */
	XmlEntities.prototype.encodeNonASCII = function(str) {
	    var strLenght = str.length;
	    if (strLenght === 0) {
	        return '';
	    }
	    var result = '';
	    var i = 0;
	    while (i < strLenght) {
	        var c = str.charCodeAt(i);
	        if (c <= 255) {
	            result += str[i++];
	            continue;
	        }
	        result += '&#' + c + ';';
	        i++;
	    }
	    return result;
	};
	
	/**
	 * @param {String} str
	 * @returns {String}
	 */
	 XmlEntities.encodeNonASCII = function(str) {
	    return new XmlEntities().encodeNonASCII(str);
	 };
	
	module.exports = XmlEntities;


/***/ },
/* 98 */
/*!*******************************!*\
  !*** ./~/strip-ansi/index.js ***!
  \*******************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var ansiRegex = __webpack_require__(/*! ansi-regex */ 53)();
	
	module.exports = function (str) {
		return typeof str === 'string' ? str.replace(ansiRegex, '') : str;
	};


/***/ },
/* 99 */
/*!**************************************************!*\
  !*** (webpack)-hot-middleware/client-overlay.js ***!
  \**************************************************/
/***/ function(module, exports, __webpack_require__) {

	/*eslint-env browser*/
	
	var clientOverlay = document.createElement('div');
	var styles = {
	  background: 'rgba(0,0,0,0.85)',
	  color: '#E8E8E8',
	  lineHeight: '1.2',
	  whiteSpace: 'pre',
	  fontFamily: 'Menlo, Consolas, monospace',
	  fontSize: '13px',
	  position: 'fixed',
	  zIndex: 9999,
	  padding: '10px',
	  left: 0,
	  right: 0,
	  top: 0,
	  bottom: 0,
	  overflow: 'auto',
	  dir: 'ltr'
	};
	for (var key in styles) {
	  clientOverlay.style[key] = styles[key];
	}
	
	var ansiHTML = __webpack_require__(/*! ansi-html */ 52);
	var colors = {
	  reset: ['transparent', 'transparent'],
	  black: '181818',
	  red: 'E36049',
	  green: 'B3CB74',
	  yellow: 'FFD080',
	  blue: '7CAFC2',
	  magenta: '7FACCA',
	  cyan: 'C3C2EF',
	  lightgrey: 'EBE7E3',
	  darkgrey: '6D7891'
	};
	ansiHTML.setColors(colors);
	
	var Entities = __webpack_require__(/*! html-entities */ 95).AllHtmlEntities;
	var entities = new Entities();
	
	exports.showProblems =
	function showProblems(type, lines) {
	  clientOverlay.innerHTML = '';
	  lines.forEach(function(msg) {
	    msg = ansiHTML(entities.encode(msg));
	    var div = document.createElement('div');
	    div.style.marginBottom = '26px';
	    div.innerHTML = problemType(type) + ' in ' + msg;
	    clientOverlay.appendChild(div);
	  });
	  if (document.body) {
	    document.body.appendChild(clientOverlay);
	  }
	};
	
	exports.clear =
	function clear() {
	  if (document.body && clientOverlay.parentNode) {
	    document.body.removeChild(clientOverlay);
	  }
	};
	
	var problemColors = {
	  errors: colors.red,
	  warnings: colors.yellow
	};
	
	function problemType (type) {
	  var color = problemColors[type] || colors.red;
	  return (
	    '<span style="background-color:#' + color + '; color:#fff; padding:2px 4px; border-radius: 2px">' +
	      type.slice(0, -1).toUpperCase() +
	    '</span>'
	  );
	}


/***/ },
/* 100 */
/*!******************************************!*\
  !*** (webpack)-hot-middleware/client.js ***!
  \******************************************/
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {/*eslint-env browser*/
	/*global __resourceQuery __webpack_public_path__*/
	
	var options = {
	  path: "/__webpack_hmr",
	  timeout: 20 * 1000,
	  overlay: true,
	  reload: false,
	  log: true,
	  warn: true
	};
	if (false) {
	  var querystring = require('querystring');
	  var overrides = querystring.parse(__resourceQuery.slice(1));
	  if (overrides.path) options.path = overrides.path;
	  if (overrides.timeout) options.timeout = overrides.timeout;
	  if (overrides.overlay) options.overlay = overrides.overlay !== 'false';
	  if (overrides.reload) options.reload = overrides.reload !== 'false';
	  if (overrides.noInfo && overrides.noInfo !== 'false') {
	    options.log = false;
	  }
	  if (overrides.quiet && overrides.quiet !== 'false') {
	    options.log = false;
	    options.warn = false;
	  }
	  if (overrides.dynamicPublicPath) {
	    options.path = __webpack_public_path__ + options.path;
	  }
	}
	
	if (typeof window === 'undefined') {
	  // do nothing
	} else if (typeof window.EventSource === 'undefined') {
	  console.warn(
	    "webpack-hot-middleware's client requires EventSource to work. " +
	    "You should include a polyfill if you want to support this browser: " +
	    "https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events#Tools"
	  );
	} else {
	  connect(window.EventSource);
	}
	
	function connect(EventSource) {
	  var source = new EventSource(options.path);
	  var lastActivity = new Date();
	
	  source.onopen = handleOnline;
	  source.onmessage = handleMessage;
	  source.onerror = handleDisconnect;
	
	  var timer = setInterval(function() {
	    if ((new Date() - lastActivity) > options.timeout) {
	      handleDisconnect();
	    }
	  }, options.timeout / 2);
	
	  function handleOnline() {
	    if (options.log) console.log("[HMR] connected");
	    lastActivity = new Date();
	  }
	
	  function handleMessage(event) {
	    lastActivity = new Date();
	    if (event.data == "\uD83D\uDC93") {
	      return;
	    }
	    try {
	      processMessage(JSON.parse(event.data));
	    } catch (ex) {
	      if (options.warn) {
	        console.warn("Invalid HMR message: " + event.data + "\n" + ex);
	      }
	    }
	  }
	
	  function handleDisconnect() {
	    clearInterval(timer);
	    source.close();
	    setTimeout(function() { connect(EventSource); }, options.timeout);
	  }
	
	}
	
	var reporter;
	// the reporter needs to be a singleton on the page
	// in case the client is being used by mutliple bundles
	// we only want to report once.
	// all the errors will go to all clients
	var singletonKey = '__webpack_hot_middleware_reporter__';
	if (typeof window !== 'undefined' && !window[singletonKey]) {
	  reporter = window[singletonKey] = createReporter();
	}
	
	function createReporter() {
	  var strip = __webpack_require__(/*! strip-ansi */ 98);
	
	  var overlay;
	  if (typeof document !== 'undefined' && options.overlay) {
	    overlay = __webpack_require__(/*! ./client-overlay */ 99);
	  }
	
	  return {
	    problems: function(type, obj) {
	      if (options.warn) {
	        console.warn("[HMR] bundle has " + type + ":");
	        obj[type].forEach(function(msg) {
	          console.warn("[HMR] " + strip(msg));
	        });
	      }
	      if (overlay && type !== 'warnings') overlay.showProblems(type, obj[type]);
	    },
	    success: function() {
	      if (overlay) overlay.clear();
	    },
	    useCustomOverlay: function(customOverlay) {
	      overlay = customOverlay;
	    }
	  };
	}
	
	var processUpdate = __webpack_require__(/*! ./process-update */ 101);
	
	var customHandler;
	var subscribeAllHandler;
	function processMessage(obj) {
	  if (obj.action == "building") {
	    if (options.log) console.log("[HMR] bundle rebuilding");
	  } else if (obj.action == "built") {
	    if (options.log) {
	      console.log(
	        "[HMR] bundle " + (obj.name ? obj.name + " " : "") +
	        "rebuilt in " + obj.time + "ms"
	      );
	    }
	    if (obj.errors.length > 0) {
	      if (reporter) reporter.problems('errors', obj);
	    } else {
	      if (reporter) {
	        if (obj.warnings.length > 0) reporter.problems('warnings', obj);
	        reporter.success();
	      }
	
	      processUpdate(obj.hash, obj.modules, options);
	    }
	  } else if (customHandler) {
	    customHandler(obj);
	  }
	
	  if (subscribeAllHandler) {
	    subscribeAllHandler(obj);
	  }
	}
	
	if (module) {
	  module.exports = {
	    subscribeAll: function subscribeAll(handler) {
	      subscribeAllHandler = handler;
	    },
	    subscribe: function subscribe(handler) {
	      customHandler = handler;
	    },
	    useCustomOverlay: function useCustomOverlay(customOverlay) {
	      if (reporter) reporter.useCustomOverlay(customOverlay);
	    }
	  };
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! ./../webpack/buildin/module.js */ 108)(module)))

/***/ },
/* 101 */
/*!**************************************************!*\
  !*** (webpack)-hot-middleware/process-update.js ***!
  \**************************************************/
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Based heavily on https://github.com/webpack/webpack/blob/
	 *  c0afdf9c6abc1dd70707c594e473802a566f7b6e/hot/only-dev-server.js
	 * Original copyright Tobias Koppers @sokra (MIT license)
	 */
	
	/* global window __webpack_hash__ */
	
	if (false) {
	  throw new Error("[HMR] Hot Module Replacement is disabled.");
	}
	
	var hmrDocsUrl = "http://webpack.github.io/docs/hot-module-replacement-with-webpack.html"; // eslint-disable-line max-len
	
	var lastHash;
	var failureStatuses = { abort: 1, fail: 1 };
	var applyOptions = { ignoreUnaccepted: true };
	
	function upToDate(hash) {
	  if (hash) lastHash = hash;
	  return lastHash == __webpack_require__.h();
	}
	
	module.exports = function(hash, moduleMap, options) {
	  var reload = options.reload;
	  if (!upToDate(hash) && module.hot.status() == "idle") {
	    if (options.log) console.log("[HMR] Checking for updates on the server...");
	    check();
	  }
	
	  function check() {
	    var cb = function(err, updatedModules) {
	      if (err) return handleError(err);
	
	      if(!updatedModules) {
	        if (options.warn) {
	          console.warn("[HMR] Cannot find update (Full reload needed)");
	          console.warn("[HMR] (Probably because of restarting the server)");
	        }
	        performReload();
	        return null;
	      }
	
	      var applyCallback = function(applyErr, renewedModules) {
	        if (applyErr) return handleError(applyErr);
	
	        if (!upToDate()) check();
	
	        logUpdates(updatedModules, renewedModules);
	      };
	
	      var applyResult = module.hot.apply(applyOptions, applyCallback);
	      // webpack 2 promise
	      if (applyResult && applyResult.then) {
	        // HotModuleReplacement.runtime.js refers to the result as `outdatedModules`
	        applyResult.then(function(outdatedModules) {
	          applyCallback(null, outdatedModules);
	        });
	        applyResult.catch(applyCallback);
	      }
	
	    };
	
	    var result = module.hot.check(false, cb);
	    // webpack 2 promise
	    if (result && result.then) {
	        result.then(function(updatedModules) {
	            cb(null, updatedModules);
	        });
	        result.catch(cb);
	    }
	  }
	
	  function logUpdates(updatedModules, renewedModules) {
	    var unacceptedModules = updatedModules.filter(function(moduleId) {
	      return renewedModules && renewedModules.indexOf(moduleId) < 0;
	    });
	
	    if(unacceptedModules.length > 0) {
	      if (options.warn) {
	        console.warn(
	          "[HMR] The following modules couldn't be hot updated: " +
	          "(Full reload needed)\n" +
	          "This is usually because the modules which have changed " +
	          "(and their parents) do not know how to hot reload themselves. " +
	          "See " + hmrDocsUrl + " for more details."
	        );
	        unacceptedModules.forEach(function(moduleId) {
	          console.warn("[HMR]  - " + moduleMap[moduleId]);
	        });
	      }
	      performReload();
	      return;
	    }
	
	    if (options.log) {
	      if(!renewedModules || renewedModules.length === 0) {
	        console.log("[HMR] Nothing hot updated.");
	      } else {
	        console.log("[HMR] Updated modules:");
	        renewedModules.forEach(function(moduleId) {
	          console.log("[HMR]  - " + moduleMap[moduleId]);
	        });
	      }
	
	      if (upToDate()) {
	        console.log("[HMR] App is up to date.");
	      }
	    }
	  }
	
	  function handleError(err) {
	    if (module.hot.status() in failureStatuses) {
	      if (options.warn) {
	        console.warn("[HMR] Cannot check for update (Full reload needed)");
	        console.warn("[HMR] " + err.stack || err.message);
	      }
	      performReload();
	      return;
	    }
	    if (options.warn) {
	      console.warn("[HMR] Update check failed: " + err.stack || err.message);
	    }
	  }
	
	  function performReload() {
	    if (reload) {
	      if (options.warn) console.warn("[HMR] Reloading page");
	      window.location.reload();
	    }
	  }
	};


/***/ },
/* 102 */
/*!***************************************************************************************!*\
  !*** delegated ./node_modules/fastclick/lib/fastclick.js from dll-reference libs_lib ***!
  \***************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = (__webpack_require__(1))(138);

/***/ },
/* 103 */
/*!***************************************************************************************!*\
  !*** delegated ./node_modules/react-addons-perf/index.js from dll-reference libs_lib ***!
  \***************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = (__webpack_require__(1))(158);

/***/ },
/* 104 */
/*!*******************************************************************************!*\
  !*** delegated ./node_modules/react-dom/index.js from dll-reference libs_lib ***!
  \*******************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = (__webpack_require__(1))(159);

/***/ },
/* 105 */
/*!*****************************************************************************************************************!*\
  !*** delegated ./node_modules/react-immutable-proptypes/dist/ImmutablePropTypes.js from dll-reference libs_lib ***!
  \*****************************************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = (__webpack_require__(1))(160);

/***/ },
/* 106 */
/*!**************************************************************************************!*\
  !*** delegated ./node_modules/redux-logger/lib/index.js from dll-reference libs_lib ***!
  \**************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = (__webpack_require__(1))(238);

/***/ },
/* 107 */
/*!*************************************************************************************!*\
  !*** delegated ./node_modules/redux-thunk/lib/index.js from dll-reference libs_lib ***!
  \*************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = (__webpack_require__(1))(239);

/***/ },
/* 108 */
/*!**************************************************************************************!*\
  !*** delegated ./node_modules/webpack/buildin/module.js from dll-reference libs_lib ***!
  \**************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = (__webpack_require__(1))(245);

/***/ },
/* 109 */
/*!********************************************************************************************!*\
  !*** delegated ./node_modules/why-did-you-update/lib/index.js from dll-reference libs_lib ***!
  \********************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = (__webpack_require__(1))(248);

/***/ },
/* 110 */,
/* 111 */,
/* 112 */,
/* 113 */,
/* 114 */
/*!**************************************!*\
  !*** ./common/pages/index/Index.jsx ***!
  \**************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _classCallCheck2 = __webpack_require__(/*! babel-runtime/helpers/classCallCheck */ 6);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _possibleConstructorReturn2 = __webpack_require__(/*! babel-runtime/helpers/possibleConstructorReturn */ 8);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(/*! babel-runtime/helpers/inherits */ 7);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _react = __webpack_require__(/*! react */ 2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactRedux = __webpack_require__(/*! react-redux */ 50);
	
	var _immutable = __webpack_require__(/*! immutable */ 37);
	
	var _Base2 = __webpack_require__(/*! ../Base.jsx */ 16);
	
	var _Base3 = _interopRequireDefault(_Base2);
	
	var _indexActions = __webpack_require__(/*! ./indexActions */ 118);
	
	var _AddTodo = __webpack_require__(/*! ../../components/index/AddTodo */ 129);
	
	var _AddTodo2 = _interopRequireDefault(_AddTodo);
	
	var _TodoList = __webpack_require__(/*! ../../components/index/TodoList */ 132);
	
	var _TodoList2 = _interopRequireDefault(_TodoList);
	
	var _Footer = __webpack_require__(/*! ../../components/index/Footer */ 130);
	
	var _Footer2 = _interopRequireDefault(_Footer);
	
	var _Tab = __webpack_require__(/*! ../../components/common/Tab */ 128);
	
	var _Tab2 = _interopRequireDefault(_Tab);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Page = function (_Base) {
	    (0, _inherits3.default)(Page, _Base);
	
	    function Page(props, context) {
	        (0, _classCallCheck3.default)(this, Page);
	        return (0, _possibleConstructorReturn3.default)(this, _Base.call(this, props, context));
	    }
	
	    Page.prototype.componentDidMount = function componentDidMount() {
	        console.log(this.context.$appConfig.user);
	
	        this.emit('test');
	    };
	
	    Page.prototype.render = function render() {
	        // Injected by connect() call:
	        var _props = this.props;
	        var dispatch = _props.dispatch;
	        var visibleTodos = _props.visibleTodos;
	        var visibilityFilter = _props.visibilityFilter;
	
	        return _react2.default.createElement(
	            'div',
	            null,
	            _react2.default.createElement(_AddTodo2.default, {
	                onAddClick: function onAddClick(text) {
	                    return dispatch((0, _indexActions.addTodo)(text));
	                } }),
	            _react2.default.createElement(_TodoList2.default, {
	                todos: visibleTodos,
	                onTodoClick: function onTodoClick(index) {
	                    return dispatch((0, _indexActions.completeTodo)(index));
	                } }),
	            _react2.default.createElement(_Footer2.default, {
	                filter: visibilityFilter,
	                onFilterChange: function onFilterChange(nextFilter) {
	                    return dispatch((0, _indexActions.setVisibilityFilter)(nextFilter));
	                } }),
	            _react2.default.createElement(
	                _Tab2.default,
	                { defaultSelectedTab: '1' },
	                _react2.default.createElement(
	                    _Tab.TabTitle,
	                    { label: '1' },
	                    'tab1'
	                ),
	                _react2.default.createElement(
	                    _Tab.TabTitle,
	                    { label: '2' },
	                    'tab2'
	                ),
	                _react2.default.createElement(
	                    _Tab.TabPanel,
	                    { 'for': '1' },
	                    'TabContent1'
	                ),
	                _react2.default.createElement(
	                    _Tab.TabPanel,
	                    { 'for': '2' },
	                    'TabContent2'
	                )
	            )
	        );
	    };
	
	    return Page;
	}(_Base3.default);
	
	Page.propTypes = {
	    visibleTodos: _react.PropTypes.instanceOf(_immutable.List).isRequired,
	    visibilityFilter: _react.PropTypes.oneOf(['SHOW_ALL', 'SHOW_COMPLETED', 'SHOW_ACTIVE']).isRequired
	};
	Page.contextTypes = {
	    $appConfig: _react.PropTypes.object,
	    $eventBus: _react.PropTypes.object
	};
	
	function selectTodos(todos, filter) {
	    switch (filter) {
	        case _indexActions.VisibilityFilters.SHOW_ALL:
	            return todos;
	        case _indexActions.VisibilityFilters.SHOW_COMPLETED:
	            return todos.filter(function (todo) {
	                return todo.get('completed');
	            });
	        case _indexActions.VisibilityFilters.SHOW_ACTIVE:
	            return todos.filter(function (todo) {
	                return !todo.get('completed');
	            });
	    }
	}
	
	// Which props do we want to inject, given the global state?
	// Note: use https://github.com/faassen/reselect for better performance.
	function select(state) {
	    return {
	        visibleTodos: selectTodos(state.get('todos'), state.get('visibilityFilter')),
	        visibilityFilter: state.get('visibilityFilter')
	    };
	}
	
	// 包装 component ，注入 dispatch 和 state 到其默认的 connect(select)(App) 中；
	exports.default = (0, _reactRedux.connect)(select)(Page);

/***/ },
/* 115 */
/*!*********************************************!*\
  !*** ./common/pages/index/indexReducers.js ***!
  \*********************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _immutable = __webpack_require__(/*! immutable */ 37);
	
	var _reduxImmutablejs = __webpack_require__(/*! redux-immutablejs */ 116);
	
	var _indexActions = __webpack_require__(/*! ./indexActions */ 118);
	
	var SHOW_ALL = _indexActions.VisibilityFilters.SHOW_ALL; // import { combineReducers } from 'redux'
	
	function visibilityFilter() {
	    var state = arguments.length <= 0 || arguments[0] === undefined ? SHOW_ALL : arguments[0];
	    var action = arguments[1];
	
	    switch (action.type) {
	        case _indexActions.SET_VISIBILITY_FILTER:
	            return action.filter;
	        default:
	            return state;
	    }
	}
	
	function todos() {
	    var state = arguments.length <= 0 || arguments[0] === undefined ? new _immutable.List() : arguments[0];
	    var action = arguments[1];
	
	    switch (action.type) {
	        case _indexActions.ADD_TODO:
	            return state.push(new _immutable.Map({
	                text: action.text,
	                completed: false
	            }));
	        case _indexActions.COMPLETE_TODO:
	            return state.update(action.index, function (item) {
	                return item.update('completed', true);
	            });
	        default:
	            return state;
	    }
	}
	
	var todoApp = (0, _reduxImmutablejs.combineReducers)({
	    visibilityFilter: visibilityFilter,
	    todos: todos
	});
	
	exports.default = todoApp;

/***/ },
/* 116 */
/*!*******************************************************************************************!*\
  !*** delegated ./node_modules/redux-immutablejs/lib/index.js from dll-reference libs_lib ***!
  \*******************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = (__webpack_require__(1))(235);

/***/ },
/* 117 */,
/* 118 */
/*!********************************************!*\
  !*** ./common/pages/index/indexActions.js ***!
  \********************************************/
/***/ function(module, exports) {

	'use strict';
	
	exports.__esModule = true;
	exports.addTodo = addTodo;
	exports.completeTodo = completeTodo;
	exports.setVisibilityFilter = setVisibilityFilter;
	/*
	 * action 类型
	 */
	
	var ADD_TODO = exports.ADD_TODO = 'ADD_TODO';
	var COMPLETE_TODO = exports.COMPLETE_TODO = 'COMPLETE_TODO';
	var SET_VISIBILITY_FILTER = exports.SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER';
	
	/*
	 * 其它的常量
	 */
	
	var VisibilityFilters = exports.VisibilityFilters = {
	    SHOW_ALL: 'SHOW_ALL',
	    SHOW_COMPLETED: 'SHOW_COMPLETED',
	    SHOW_ACTIVE: 'SHOW_ACTIVE'
	};
	
	/*
	 * action 创建函数
	 */
	
	function addTodo(text) {
	    return { type: ADD_TODO, text: text };
	}
	
	function completeTodo(index) {
	    return { type: COMPLETE_TODO, index: index };
	}
	
	function setVisibilityFilter(filter) {
	    return { type: SET_VISIBILITY_FILTER, filter: filter };
	}

/***/ },
/* 119 */
/*!*******************************!*\
  !*** ./~/classnames/index.js ***!
  \*******************************/
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	  Copyright (c) 2016 Jed Watson.
	  Licensed under the MIT License (MIT), see
	  http://jedwatson.github.io/classnames
	*/
	/* global define */
	
	(function () {
		'use strict';
	
		var hasOwn = {}.hasOwnProperty;
	
		function classNames () {
			var classes = [];
	
			for (var i = 0; i < arguments.length; i++) {
				var arg = arguments[i];
				if (!arg) continue;
	
				var argType = typeof arg;
	
				if (argType === 'string' || argType === 'number') {
					classes.push(arg);
				} else if (Array.isArray(arg)) {
					classes.push(classNames.apply(null, arg));
				} else if (argType === 'object') {
					for (var key in arg) {
						if (hasOwn.call(arg, key) && arg[key]) {
							classes.push(key);
						}
					}
				}
			}
	
			return classes.join(' ');
		}
	
		if (typeof module !== 'undefined' && module.exports) {
			module.exports = classNames;
		} else if (true) {
			// register as 'classnames', consistent with npm package name
			!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
				return classNames;
			}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else {
			window.classNames = classNames;
		}
	}());


/***/ },
/* 120 */,
/* 121 */,
/* 122 */
/*!**********************************!*\
  !*** ./client/js/pages/index.js ***!
  \**********************************/
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	var _react = __webpack_require__(/*! react */ 2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _immutable = __webpack_require__(/*! immutable */ 37);
	
	var _immutable2 = _interopRequireDefault(_immutable);
	
	var _initializeRender = __webpack_require__(/*! ../utils/initializeRender */ 91);
	
	var _initializeRender2 = _interopRequireDefault(_initializeRender);
	
	var _Index = __webpack_require__(/*! ../../../common/pages/index/Index.jsx */ 114);
	
	var _Index2 = _interopRequireDefault(_Index);
	
	var _indexReducers = __webpack_require__(/*! ../../../common/pages/index/indexReducers */ 115);
	
	var _indexReducers2 = _interopRequireDefault(_indexReducers);
	
	__webpack_require__(/*! ../../css/main.css */ 90);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var initializeRender = (0, _initializeRender2.default)({
	    transformer: _immutable2.default.fromJS
	});
	
	initializeRender({
	    rootReducer: _indexReducers2.default,
	    component: _react2.default.createElement(_Index2.default, null)
	}).then(function (store) {
	    if (process.env.NODE_ENV !== 'production' && module.hot) {
	        // Enable Webpack hot module replacement for reducers
	        module.hot.accept([/*! ../../../common/pages/index/Index.jsx */ 114, /*! ../../../common/pages/index/indexReducers */ 115], function () {
	            var NewPage = __webpack_require__(/*! ../../../common/pages/index/Index.jsx */ 114).default;
	            var newRootReducer = __webpack_require__(/*! ../../../common/pages/index/indexReducers */ 115).default;
	            initializeRender({
	                rootReducer: newRootReducer,
	                component: _react2.default.createElement(NewPage, null)
	            });
	        });
	    }
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! ./~/process/browser.js */ 17)))

/***/ },
/* 123 */,
/* 124 */,
/* 125 */,
/* 126 */,
/* 127 */,
/* 128 */
/*!******************************************!*\
  !*** ./common/components/common/Tab.jsx ***!
  \******************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports.TabPanel = exports.TabTitle = undefined;
	
	var _typeof2 = __webpack_require__(/*! babel-runtime/helpers/typeof */ 23);
	
	var _typeof3 = _interopRequireDefault(_typeof2);
	
	var _classCallCheck2 = __webpack_require__(/*! babel-runtime/helpers/classCallCheck */ 6);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _possibleConstructorReturn2 = __webpack_require__(/*! babel-runtime/helpers/possibleConstructorReturn */ 8);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(/*! babel-runtime/helpers/inherits */ 7);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _react = __webpack_require__(/*! react */ 2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(/*! classnames */ 119);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _Base2 = __webpack_require__(/*! ../../pages/Base */ 16);
	
	var _Base3 = _interopRequireDefault(_Base2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Tabs = function (_Base) {
	    (0, _inherits3.default)(Tabs, _Base);
	
	    function Tabs(props, context) {
	        (0, _classCallCheck3.default)(this, Tabs);
	
	        var _this = (0, _possibleConstructorReturn3.default)(this, _Base.call(this, props, context));
	
	        _this.state = {
	            selectedTab: props.defaultSelectedTab || null
	        };
	
	        _this.firstTabLabel = null;
	        return _this;
	    }
	
	    Tabs.prototype.getChildContext = function getChildContext() {
	        return {
	            onSelect: this.onSelect.bind(this),
	            selectedTab: this.state.selectedTab || this.props.defaultSelectedTab,
	            activeStyle: this.props.activeLinkStyle || defaultActiveStyle,
	            firstTabLabel: this.firstTabLabel
	        };
	    };
	
	    Tabs.prototype.onSelect = function onSelect(tab) {
	        if (this.state.selectedTab === tab) return;
	
	        this.setState({
	            selectedTab: tab
	        });
	
	        if (typeof this.props.onSelect === 'function') {
	            var _props;
	
	            for (var _len = arguments.length, rest = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	                rest[_key - 1] = arguments[_key];
	            }
	
	            (_props = this.props).onSelect.apply(_props, [tab].concat(rest));
	        }
	    };
	
	    Tabs.prototype.findFirstTabLabel = function findFirstTabLabel(children) {
	        var _this2 = this;
	
	        if ((typeof children === 'undefined' ? 'undefined' : (0, _typeof3.default)(children)) !== 'object' || this.firstTabLabel) {
	            return;
	        }
	
	        _react2.default.Children.forEach(children, function (child) {
	            if (child.props && child.props.label) {
	                if (_this2.firstTabLabel == null) {
	                    _this2.firstTabLabel = child.props.label;
	                    return;
	                }
	            }
	
	            _this2.findFirstTabLabel(child.props && child.props.children);
	        });
	    };
	
	    Tabs.prototype.render = function render() {
	        this.findFirstTabLabel(this.props.children);
	
	        return _react2.default.createElement(
	            'div',
	            { className: this.props.className, style: this.props.style },
	            this.props.children
	        );
	    };
	
	    return Tabs;
	}(_Base3.default);
	
	exports.default = Tabs;
	
	Tabs.defaultProps = {
	    onSelect: null,
	    activeLinkStyle: null,
	    defaultSelectedTab: '',
	    className: '',
	    style: null
	};
	Tabs.propTypes = {
	    onSelect: _react.PropTypes.func,
	    activeLinkStyle: _react.PropTypes.object,
	    defaultSelectedTab: _react.PropTypes.string,
	    className: _react.PropTypes.string,
	    style: _react.PropTypes.object
	};
	Tabs.childContextTypes = {
	    onSelect: _react.PropTypes.func,
	    selectedTab: _react.PropTypes.string,
	    activeStyle: _react.PropTypes.object,
	    firstTabLabel: _react.PropTypes.string
	};
	
	var defaultActiveStyle = {
	    fontWeight: 'bold'
	};
	
	var TabTitle = exports.TabTitle = function (_Component) {
	    (0, _inherits3.default)(TabTitle, _Component);
	
	    function TabTitle(props, context) {
	        (0, _classCallCheck3.default)(this, TabTitle);
	
	        var _this3 = (0, _possibleConstructorReturn3.default)(this, _Component.call(this, props, context));
	
	        _this3.onSelect = _this3.onSelect.bind(_this3);
	        return _this3;
	    }
	
	    TabTitle.prototype.onSelect = function onSelect() {
	        this.context.onSelect(this.props.label);
	    };
	
	    TabTitle.prototype.componentDidMount = function componentDidMount() {
	        if (this.context.selectedTab === this.props.label || !this.context.selectedTab && this.context.firstTabLabel === this.props.label) {
	            this.context.onSelect(this.props.label);
	        }
	    };
	
	    TabTitle.prototype.render = function render() {
	        var style = null;
	        var isActive = this.context.selectedTab === this.props.label;
	        if (isActive) {
	            style = this.context.activeStyle;
	        }
	        var clsNames = (0, _classnames2.default)(this.props.className, { active: isActive });
	
	        return _react2.default.createElement(
	            'div',
	            {
	                className: clsNames,
	                style: style,
	                onClick: this.onSelect
	            },
	            this.props.children
	        );
	    };
	
	    return TabTitle;
	}(_react.Component);
	
	TabTitle.defaultProps = {
	    label: '',
	    className: 'tab-link'
	};
	TabTitle.propTypes = {
	    label: _react.PropTypes.string.isRequired,
	    className: _react.PropTypes.string
	};
	TabTitle.contextTypes = {
	    onSelect: _react.PropTypes.func,
	    firstTabLabel: _react.PropTypes.string,
	    activeStyle: _react.PropTypes.object,
	    selectedTab: _react.PropTypes.string
	};
	
	var styles = {
	    visible: {
	        display: 'block'
	    },
	    hidden: {
	        display: 'none'
	    }
	};
	
	var TabPanel = exports.TabPanel = function (_Component2) {
	    (0, _inherits3.default)(TabPanel, _Component2);
	
	    function TabPanel(props, context) {
	        (0, _classCallCheck3.default)(this, TabPanel);
	
	        var _this4 = (0, _possibleConstructorReturn3.default)(this, _Component2.call(this, props, context));
	
	        for (var style in styles) {
	            if (styles.hasOwnProperty(style)) {
	                Object.assign(styles[style], _this4.props.style);
	            }
	        }
	        return _this4;
	    }
	
	    TabPanel.prototype.render = function render() {
	        var displayStyle = this.context.selectedTab === this.props.for ? styles.visible : styles.hidden;
	
	        return _react2.default.createElement(
	            'div',
	            {
	                className: this.props.className,
	                style: displayStyle },
	            this.props.children
	        );
	    };
	
	    return TabPanel;
	}(_react.Component);
	
	TabPanel.defaultProps = {
	    for: '',
	    className: 'tab-content',
	    style: null
	};
	TabPanel.propTypes = {
	    for: _react.PropTypes.string.isRequired,
	    className: _react.PropTypes.string,
	    style: _react.PropTypes.object
	};
	TabPanel.contextTypes = {
	    selectedTab: _react.PropTypes.string
	};

/***/ },
/* 129 */
/*!*********************************************!*\
  !*** ./common/components/index/AddTodo.jsx ***!
  \*********************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _classCallCheck2 = __webpack_require__(/*! babel-runtime/helpers/classCallCheck */ 6);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _possibleConstructorReturn2 = __webpack_require__(/*! babel-runtime/helpers/possibleConstructorReturn */ 8);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(/*! babel-runtime/helpers/inherits */ 7);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _react = __webpack_require__(/*! react */ 2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _Base2 = __webpack_require__(/*! ../../pages/Base */ 16);
	
	var _Base3 = _interopRequireDefault(_Base2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var AddTodo = function (_Base) {
	    (0, _inherits3.default)(AddTodo, _Base);
	
	    function AddTodo(props, context) {
	        (0, _classCallCheck3.default)(this, AddTodo);
	        return (0, _possibleConstructorReturn3.default)(this, _Base.call(this, props, context));
	    }
	
	    AddTodo.prototype.render = function render() {
	        return _react2.default.createElement(
	            'div',
	            null,
	            _react2.default.createElement('input', { type: 'text', ref: 'input' }),
	            _react2.default.createElement(
	                'button',
	                { onClick: this.handleClick },
	                'Add'
	            )
	        );
	    };
	
	    AddTodo.prototype.handleClick = function handleClick(e) {
	        var node = this.refs.input;
	        var text = node.value.trim();
	        this.props.onAddClick(text);
	        node.value = '';
	    };
	
	    return AddTodo;
	}(_Base3.default);
	
	exports.default = AddTodo;
	
	
	AddTodo.propTypes = {
	    onAddClick: _react.PropTypes.func.isRequired
	};

/***/ },
/* 130 */
/*!********************************************!*\
  !*** ./common/components/index/Footer.jsx ***!
  \********************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _classCallCheck2 = __webpack_require__(/*! babel-runtime/helpers/classCallCheck */ 6);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _possibleConstructorReturn2 = __webpack_require__(/*! babel-runtime/helpers/possibleConstructorReturn */ 8);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(/*! babel-runtime/helpers/inherits */ 7);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _react = __webpack_require__(/*! react */ 2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _Base2 = __webpack_require__(/*! ../../pages/Base */ 16);
	
	var _Base3 = _interopRequireDefault(_Base2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Footer = function (_Base) {
	    (0, _inherits3.default)(Footer, _Base);
	
	    function Footer(props, context) {
	        (0, _classCallCheck3.default)(this, Footer);
	        return (0, _possibleConstructorReturn3.default)(this, _Base.call(this, props, context));
	    }
	
	    Footer.prototype.renderFilter = function renderFilter(filter, name) {
	        var _this2 = this;
	
	        if (filter === this.props.filter) {
	            return name;
	        }
	
	        return _react2.default.createElement(
	            'a',
	            { href: '#', onClick: function onClick(e) {
	                    e.preventDefault();
	                    _this2.props.onFilterChange(filter);
	                } },
	            name
	        );
	    };
	
	    Footer.prototype.render = function render() {
	        return _react2.default.createElement(
	            'p',
	            null,
	            'Show:',
	            ' ',
	            this.renderFilter('SHOW_ALL', 'All'),
	            ', ',
	            this.renderFilter('SHOW_COMPLETED', 'Completed'),
	            ', ',
	            this.renderFilter('SHOW_ACTIVE', 'Active'),
	            '.'
	        );
	    };
	
	    return Footer;
	}(_Base3.default);
	
	exports.default = Footer;
	
	
	Footer.propTypes = {
	    onFilterChange: _react.PropTypes.func.isRequired,
	    filter: _react.PropTypes.oneOf(['SHOW_ALL', 'SHOW_COMPLETED', 'SHOW_ACTIVE']).isRequired
	};

/***/ },
/* 131 */
/*!******************************************!*\
  !*** ./common/components/index/Todo.jsx ***!
  \******************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _classCallCheck2 = __webpack_require__(/*! babel-runtime/helpers/classCallCheck */ 6);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _possibleConstructorReturn2 = __webpack_require__(/*! babel-runtime/helpers/possibleConstructorReturn */ 8);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(/*! babel-runtime/helpers/inherits */ 7);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _react = __webpack_require__(/*! react */ 2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _Base2 = __webpack_require__(/*! ../../pages/Base */ 16);
	
	var _Base3 = _interopRequireDefault(_Base2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var styles = {
	    completed: {
	        textDecoration: 'line-through',
	        cursor: 'default'
	    },
	    uncompleted: {
	        textDecoration: 'none',
	        cursor: 'pointer'
	    }
	};
	
	var Todo = function (_Base) {
	    (0, _inherits3.default)(Todo, _Base);
	
	    function Todo(props, context) {
	        (0, _classCallCheck3.default)(this, Todo);
	        return (0, _possibleConstructorReturn3.default)(this, _Base.call(this, props, context));
	    }
	
	    Todo.prototype.componentDidMount = function componentDidMount() {
	        this.on('test', function () {
	            console.log('test event bus');
	        });
	    };
	
	    Todo.prototype.render = function render() {
	        return _react2.default.createElement(
	            'li',
	            { onClick: this.props.onClick,
	                style: this.props.completed ? styles.completed : styles.uncompleted },
	            this.props.text
	        );
	    };
	
	    return Todo;
	}(_Base3.default);
	
	exports.default = Todo;
	
	Todo.defaultProps = {
	    onClick: function onClick() {},
	    text: '',
	    completed: false
	};
	Todo.propTypes = {
	    onClick: _react.PropTypes.func.isRequired,
	    text: _react.PropTypes.string.isRequired,
	    completed: _react.PropTypes.bool.isRequired
	};

/***/ },
/* 132 */
/*!**********************************************!*\
  !*** ./common/components/index/TodoList.jsx ***!
  \**********************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _classCallCheck2 = __webpack_require__(/*! babel-runtime/helpers/classCallCheck */ 6);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _possibleConstructorReturn2 = __webpack_require__(/*! babel-runtime/helpers/possibleConstructorReturn */ 8);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(/*! babel-runtime/helpers/inherits */ 7);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _react = __webpack_require__(/*! react */ 2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _immutable = __webpack_require__(/*! immutable */ 37);
	
	var _reactImmutableProptypes = __webpack_require__(/*! react-immutable-proptypes */ 105);
	
	var _reactImmutableProptypes2 = _interopRequireDefault(_reactImmutableProptypes);
	
	var _Todo = __webpack_require__(/*! ./Todo */ 131);
	
	var _Todo2 = _interopRequireDefault(_Todo);
	
	var _Base2 = __webpack_require__(/*! ../../pages/Base */ 16);
	
	var _Base3 = _interopRequireDefault(_Base2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var TodoList = function (_Base) {
	    (0, _inherits3.default)(TodoList, _Base);
	
	    function TodoList(props, context) {
	        (0, _classCallCheck3.default)(this, TodoList);
	        return (0, _possibleConstructorReturn3.default)(this, _Base.call(this, props, context));
	    }
	
	    TodoList.prototype.render = function render() {
	        var _this2 = this;
	
	        return _react2.default.createElement(
	            'ul',
	            null,
	            this.props.todos.map(function (todo, index) {
	                return _react2.default.createElement(_Todo2.default, { text: todo.get('text'),
	                    completed: todo.get('completed'),
	                    key: index,
	                    onClick: function onClick() {
	                        return _this2.props.onTodoClick(index);
	                    } });
	            })
	        );
	    };
	
	    return TodoList;
	}(_Base3.default);
	
	exports.default = TodoList;
	
	
	TodoList.propTypes = {
	    onTodoClick: _react.PropTypes.func.isRequired,
	    todos: _reactImmutableProptypes2.default.listOf(_reactImmutableProptypes2.default.contains({
	        text: _react.PropTypes.string.isRequired,
	        completed: _react.PropTypes.bool.isRequired
	    }))
	};

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMDg4NTY0Yjg1MDUwMDBhZjNmOGUiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibGlic19saWJcIiIsIndlYnBhY2s6Ly8vZGVsZWdhdGVkIC4vbm9kZV9tb2R1bGVzL3JlYWN0L3JlYWN0LmpzIGZyb20gZGxsLXJlZmVyZW5jZSBsaWJzX2xpYiIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19nbG9iYWwuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faGFzLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLWlvYmplY3QuanMiLCJ3ZWJwYWNrOi8vLy4vfi9iYWJlbC1ydW50aW1lL2hlbHBlcnMvY2xhc3NDYWxsQ2hlY2suanMiLCJ3ZWJwYWNrOi8vLy4vfi9iYWJlbC1ydW50aW1lL2hlbHBlcnMvaW5oZXJpdHMuanMiLCJ3ZWJwYWNrOi8vLy4vfi9iYWJlbC1ydW50aW1lL2hlbHBlcnMvcG9zc2libGVDb25zdHJ1Y3RvclJldHVybi5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19kZXNjcmlwdG9ycy5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19oaWRlLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1kcC5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL193a3MuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYW4tb2JqZWN0LmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2NvcmUuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXMtb2JqZWN0LmpzIiwid2VicGFjazovLy8uL2NvbW1vbi9wYWdlcy9CYXNlLmpzeCIsIndlYnBhY2s6Ly8vLi9+L3Byb2Nlc3MvYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19leHBvcnQuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZmFpbHMuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWtleXMuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fcHJvcGVydHktZGVzYy5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL191aWQuanMiLCJ3ZWJwYWNrOi8vLy4vfi9iYWJlbC1ydW50aW1lL2hlbHBlcnMvdHlwZW9mLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2RlZmluZWQuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZW51bS1idWcta2V5cy5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pdGVyYXRvcnMuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fbGlicmFyeS5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtY3JlYXRlLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1waWUuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc2V0LXRvLXN0cmluZy10YWcuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc2hhcmVkLWtleS5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zaGFyZWQuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8taW50ZWdlci5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1wcmltaXRpdmUuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fd2tzLWRlZmluZS5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL193a3MtZXh0LmpzIiwid2VicGFjazovLy9kZWxlZ2F0ZWQgLi9ub2RlX21vZHVsZXMvaW1tdXRhYmxlL2Rpc3QvaW1tdXRhYmxlLmpzIGZyb20gZGxsLXJlZmVyZW5jZSBsaWJzX2xpYiIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jb2YuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY3R4LmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2RvbS1jcmVhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faWU4LWRvbS1kZWZpbmUuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXRlci1kZWZpbmUuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWdvcGQuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWdvcG4uanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWdvcHMuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWtleXMtaW50ZXJuYWwuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fcmVkZWZpbmUuanMiLCJ3ZWJwYWNrOi8vLy4vfi9ldmVudHMvZXZlbnRzLmpzIiwid2VicGFjazovLy8uL34vaHRtbC1lbnRpdGllcy9saWIvaHRtbDUtZW50aXRpZXMuanMiLCJ3ZWJwYWNrOi8vL2RlbGVnYXRlZCAuL25vZGVfbW9kdWxlcy9yZWFjdC1yZWR1eC9saWIvaW5kZXguanMgZnJvbSBkbGwtcmVmZXJlbmNlIGxpYnNfbGliIiwid2VicGFjazovLy9kZWxlZ2F0ZWQgLi9ub2RlX21vZHVsZXMvcmVkdXgvbGliL2luZGV4LmpzIGZyb20gZGxsLXJlZmVyZW5jZSBsaWJzX2xpYiIsIndlYnBhY2s6Ly8vLi9+L2Fuc2ktaHRtbC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9+L2Fuc2ktcmVnZXgvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vfi9iYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2NyZWF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3Qvc2V0LXByb3RvdHlwZS1vZi5qcyIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9zeW1ib2wuanMiLCJ3ZWJwYWNrOi8vLy4vfi9iYWJlbC1ydW50aW1lL2NvcmUtanMvc3ltYm9sL2l0ZXJhdG9yLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9jcmVhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L3NldC1wcm90b3R5cGUtb2YuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvZm4vc3ltYm9sL2luZGV4LmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L2ZuL3N5bWJvbC9pdGVyYXRvci5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hLWZ1bmN0aW9uLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2FkZC10by11bnNjb3BhYmxlcy5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hcnJheS1pbmNsdWRlcy5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19lbnVtLWtleXMuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faHRtbC5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pb2JqZWN0LmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2lzLWFycmF5LmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2l0ZXItY3JlYXRlLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2l0ZXItc3RlcC5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19rZXlvZi5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19tZXRhLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1kcHMuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWdvcG4tZXh0LmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1ncG8uanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc2V0LXByb3RvLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3N0cmluZy1hdC5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1sZW5ndGguanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8tb2JqZWN0LmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2LmFycmF5Lml0ZXJhdG9yLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC5jcmVhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYub2JqZWN0LnNldC1wcm90b3R5cGUtb2YuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYuc3RyaW5nLml0ZXJhdG9yLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2LnN5bWJvbC5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNy5zeW1ib2wuYXN5bmMtaXRlcmF0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczcuc3ltYm9sLm9ic2VydmFibGUuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy93ZWIuZG9tLml0ZXJhYmxlLmpzIiwid2VicGFjazovLy8uL2NsaWVudC9jc3MvbWFpbi5jc3MiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2pzL3V0aWxzL2luaXRpYWxpemVSZW5kZXIuanMiLCJ3ZWJwYWNrOi8vLy4vY29tbW9uL0FwcC5qc3giLCJ3ZWJwYWNrOi8vLy4vY29tbW9uL3N0b3JlL2luZGV4LmpzIiwid2VicGFjazovLy8uL2NvbW1vbi91dGlscy9zaGFsbG93RXF1YWwuanMiLCJ3ZWJwYWNrOi8vLy4vfi9odG1sLWVudGl0aWVzL2luZGV4LmpzIiwid2VicGFjazovLy8uL34vaHRtbC1lbnRpdGllcy9saWIvaHRtbDQtZW50aXRpZXMuanMiLCJ3ZWJwYWNrOi8vLy4vfi9odG1sLWVudGl0aWVzL2xpYi94bWwtZW50aXRpZXMuanMiLCJ3ZWJwYWNrOi8vLy4vfi9zdHJpcC1hbnNpL2luZGV4LmpzIiwid2VicGFjazovLy8od2VicGFjayktaG90LW1pZGRsZXdhcmUvY2xpZW50LW92ZXJsYXkuanMiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS1ob3QtbWlkZGxld2FyZS9jbGllbnQuanMiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS1ob3QtbWlkZGxld2FyZS9wcm9jZXNzLXVwZGF0ZS5qcyIsIndlYnBhY2s6Ly8vZGVsZWdhdGVkIC4vbm9kZV9tb2R1bGVzL2Zhc3RjbGljay9saWIvZmFzdGNsaWNrLmpzIGZyb20gZGxsLXJlZmVyZW5jZSBsaWJzX2xpYiIsIndlYnBhY2s6Ly8vZGVsZWdhdGVkIC4vbm9kZV9tb2R1bGVzL3JlYWN0LWFkZG9ucy1wZXJmL2luZGV4LmpzIGZyb20gZGxsLXJlZmVyZW5jZSBsaWJzX2xpYiIsIndlYnBhY2s6Ly8vZGVsZWdhdGVkIC4vbm9kZV9tb2R1bGVzL3JlYWN0LWRvbS9pbmRleC5qcyBmcm9tIGRsbC1yZWZlcmVuY2UgbGlic19saWIiLCJ3ZWJwYWNrOi8vL2RlbGVnYXRlZCAuL25vZGVfbW9kdWxlcy9yZWFjdC1pbW11dGFibGUtcHJvcHR5cGVzL2Rpc3QvSW1tdXRhYmxlUHJvcFR5cGVzLmpzIGZyb20gZGxsLXJlZmVyZW5jZSBsaWJzX2xpYiIsIndlYnBhY2s6Ly8vZGVsZWdhdGVkIC4vbm9kZV9tb2R1bGVzL3JlZHV4LWxvZ2dlci9saWIvaW5kZXguanMgZnJvbSBkbGwtcmVmZXJlbmNlIGxpYnNfbGliIiwid2VicGFjazovLy9kZWxlZ2F0ZWQgLi9ub2RlX21vZHVsZXMvcmVkdXgtdGh1bmsvbGliL2luZGV4LmpzIGZyb20gZGxsLXJlZmVyZW5jZSBsaWJzX2xpYiIsIndlYnBhY2s6Ly8vZGVsZWdhdGVkIC4vbm9kZV9tb2R1bGVzL3dlYnBhY2svYnVpbGRpbi9tb2R1bGUuanMgZnJvbSBkbGwtcmVmZXJlbmNlIGxpYnNfbGliIiwid2VicGFjazovLy9kZWxlZ2F0ZWQgLi9ub2RlX21vZHVsZXMvd2h5LWRpZC15b3UtdXBkYXRlL2xpYi9pbmRleC5qcyBmcm9tIGRsbC1yZWZlcmVuY2UgbGlic19saWIiLCJ3ZWJwYWNrOi8vLy4vY29tbW9uL3BhZ2VzL2luZGV4L0luZGV4LmpzeCIsIndlYnBhY2s6Ly8vLi9jb21tb24vcGFnZXMvaW5kZXgvaW5kZXhSZWR1Y2Vycy5qcyIsIndlYnBhY2s6Ly8vZGVsZWdhdGVkIC4vbm9kZV9tb2R1bGVzL3JlZHV4LWltbXV0YWJsZWpzL2xpYi9pbmRleC5qcyBmcm9tIGRsbC1yZWZlcmVuY2UgbGlic19saWIiLCJ3ZWJwYWNrOi8vLy4vY29tbW9uL3BhZ2VzL2luZGV4L2luZGV4QWN0aW9ucy5qcyIsIndlYnBhY2s6Ly8vLi9+L2NsYXNzbmFtZXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2pzL3BhZ2VzL2luZGV4LmpzIiwid2VicGFjazovLy8uL2NvbW1vbi9jb21wb25lbnRzL2NvbW1vbi9UYWIuanN4Iiwid2VicGFjazovLy8uL2NvbW1vbi9jb21wb25lbnRzL2luZGV4L0FkZFRvZG8uanN4Iiwid2VicGFjazovLy8uL2NvbW1vbi9jb21wb25lbnRzL2luZGV4L0Zvb3Rlci5qc3giLCJ3ZWJwYWNrOi8vLy4vY29tbW9uL2NvbXBvbmVudHMvaW5kZXgvVG9kby5qc3giLCJ3ZWJwYWNrOi8vLy4vY29tbW9uL2NvbXBvbmVudHMvaW5kZXgvVG9kb0xpc3QuanN4Il0sIm5hbWVzIjpbImV2ZW50TWF0Y2hSZWciLCJnZXRFdmVudE1ldGhvZHNQcm9wcyIsImluc3RhbmNlIiwibWV0aG9kcyIsIk9iamVjdCIsImdldE93blByb3BlcnR5TmFtZXMiLCJmaWx0ZXIiLCJwcm9wIiwidGVzdCIsImluc3RhbmNlUHJvdG90eXBlIiwiZ2V0UHJvdG90eXBlT2YiLCJwcm90b3R5cGUiLCJjb25jYXQiLCJCYXNlIiwicHJvcHMiLCJjb250ZXh0IiwiX19ldmVudE5hbWVzIiwiX19iaW5kRnVuY3Rpb25zIiwiZnVuY0JpbmRlZCIsImJpbmQiLCJvbiIsImV2ZW50TmFtZSIsImZuIiwiRXJyb3IiLCJwdXNoIiwiJGV2ZW50QnVzIiwiYWRkTGlzdGVuZXIiLCJlbWl0IiwiYXJncyIsIm9mZiIsImV2ZW50cyIsImluZGV4IiwiaW5kZXhPZiIsInJlbW92ZUxpc3RlbmVyIiwic3BsaWNlIiwibGVuZ3RoIiwiY29uc29sZSIsIndhcm4iLCJfcmVhY3RJbnRlcm5hbEluc3RhbmNlIiwiZ2V0TmFtZSIsImNvbnN0cnVjdG9yIiwibmFtZSIsInNob3VsZENvbXBvbmVudFVwZGF0ZSIsIm5leHRQcm9wcyIsIm5leHRTdGF0ZSIsInNob3VsZFVwZGF0ZSIsInN0YXRlIiwicHJvY2VzcyIsImVudiIsIk5PREVfRU5WIiwibG9nIiwiY29tcG9uZW50V2lsbFVubW91bnQiLCJoYXNPd25Qcm9wZXJ0eSIsImNvbnRleHRUeXBlcyIsImluc3RhbmNlT2YiLCJjcmVhdGVSZW5kZXIiLCJ3aHlEaWRZb3VVcGRhdGUiLCJyZXF1aXJlIiwiZGVmYXVsdCIsIlJlYWN0UGVyZiIsIndpbmRvdyIsImF0dGFjaCIsImRvY3VtZW50IiwiYm9keSIsIm1pZGRsZXdhcmVDb25maWciLCJzdG9yZSIsInBhZ2UiLCJnZXRFbGVtZW50QnlJZCIsInN0YXJ0Iiwicm9vdFJlZHVjZXIiLCJjb21wb25lbnQiLCJ0cmFuc2Zvcm1lZERhdGEiLCJ0cmFuc2Zvcm1lciIsIl9fSU5JVElBTF9TVEFURV9fIiwicmVwbGFjZVJlZHVjZXIiLCJfX0FwcF9DT05GSUdfXyIsIlByb21pc2UiLCJyZXNvbHZlIiwibWVkaWF0b3IiLCJBcHAiLCJnZXRDaGlsZENvbnRleHQiLCIkYXBwQ29uZmlnIiwiYXBwQ29uZmlnIiwiY29tcG9uZW50RGlkTW91bnQiLCJjb21wb25lbnREaWRVcGRhdGUiLCJyZW5kZXIiLCJjaGlsZHJlbiIsImRlZmF1bHRQcm9wcyIsInByb3BUeXBlcyIsIm9iamVjdCIsImNoaWxkQ29udGV4dFR5cGVzIiwiY29uZmlndXJlU3RvcmUiLCJicm93c2VyIiwiY3JlYXRlTG9nZ2VyIiwibWlkZGxld2FyZUJ1aWxkZXIiLCJtaWRkbGV3YXJlIiwiZGV2VG9vbHNFeHRlbnNpb24iLCJhbGxDb21wb3NlRWxlbWVudHMiLCJmaW5hbENyZWF0ZVN0b3JlIiwiaW5pdGlhbFN0YXRlIiwiaXMiLCJ4IiwieSIsInRvU3RyaW5nIiwic2hhbGxvd0VxdWFsIiwib2JqQSIsIm9iakIiLCJrZXlzQSIsImtleXMiLCJrZXlzQiIsImkiLCJjYWxsIiwibW9kdWxlIiwiZXhwb3J0cyIsIlBhZ2UiLCJ1c2VyIiwiZGlzcGF0Y2giLCJ2aXNpYmxlVG9kb3MiLCJ2aXNpYmlsaXR5RmlsdGVyIiwidGV4dCIsIm5leHRGaWx0ZXIiLCJpc1JlcXVpcmVkIiwib25lT2YiLCJzZWxlY3RUb2RvcyIsInRvZG9zIiwiU0hPV19BTEwiLCJTSE9XX0NPTVBMRVRFRCIsInRvZG8iLCJnZXQiLCJTSE9XX0FDVElWRSIsInNlbGVjdCIsImFjdGlvbiIsInR5cGUiLCJjb21wbGV0ZWQiLCJ1cGRhdGUiLCJpdGVtIiwidG9kb0FwcCIsImFkZFRvZG8iLCJjb21wbGV0ZVRvZG8iLCJzZXRWaXNpYmlsaXR5RmlsdGVyIiwiQUREX1RPRE8iLCJDT01QTEVURV9UT0RPIiwiU0VUX1ZJU0lCSUxJVFlfRklMVEVSIiwiVmlzaWJpbGl0eUZpbHRlcnMiLCJpbml0aWFsaXplUmVuZGVyIiwiZnJvbUpTIiwidGhlbiIsImhvdCIsImFjY2VwdCIsIk5ld1BhZ2UiLCJuZXdSb290UmVkdWNlciIsIlRhYnMiLCJzZWxlY3RlZFRhYiIsImRlZmF1bHRTZWxlY3RlZFRhYiIsImZpcnN0VGFiTGFiZWwiLCJvblNlbGVjdCIsImFjdGl2ZVN0eWxlIiwiYWN0aXZlTGlua1N0eWxlIiwiZGVmYXVsdEFjdGl2ZVN0eWxlIiwidGFiIiwic2V0U3RhdGUiLCJyZXN0IiwiZmluZEZpcnN0VGFiTGFiZWwiLCJDaGlsZHJlbiIsImZvckVhY2giLCJjaGlsZCIsImxhYmVsIiwiY2xhc3NOYW1lIiwic3R5bGUiLCJmdW5jIiwic3RyaW5nIiwiZm9udFdlaWdodCIsIlRhYlRpdGxlIiwiaXNBY3RpdmUiLCJjbHNOYW1lcyIsImFjdGl2ZSIsInN0eWxlcyIsInZpc2libGUiLCJkaXNwbGF5IiwiaGlkZGVuIiwiVGFiUGFuZWwiLCJhc3NpZ24iLCJkaXNwbGF5U3R5bGUiLCJmb3IiLCJBZGRUb2RvIiwiaGFuZGxlQ2xpY2siLCJlIiwibm9kZSIsInJlZnMiLCJpbnB1dCIsInZhbHVlIiwidHJpbSIsIm9uQWRkQ2xpY2siLCJGb290ZXIiLCJyZW5kZXJGaWx0ZXIiLCJwcmV2ZW50RGVmYXVsdCIsIm9uRmlsdGVyQ2hhbmdlIiwidGV4dERlY29yYXRpb24iLCJjdXJzb3IiLCJ1bmNvbXBsZXRlZCIsIlRvZG8iLCJvbkNsaWNrIiwiYm9vbCIsIlRvZG9MaXN0IiwibWFwIiwib25Ub2RvQ2xpY2siLCJsaXN0T2YiLCJjb250YWlucyJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7QUFDQSxtRUFBMkQ7QUFDM0Q7QUFDQTtBQUNBOztBQUVBLG9EQUE0QztBQUM1QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxrREFBMEM7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsY0FBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FBSUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCO0FBQzNCO0FBQ0EsWUFBSTtBQUNKO0FBQ0EsV0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQSxzREFBOEM7QUFDOUM7QUFDQSxxQ0FBNkI7O0FBRTdCLCtDQUF1QztBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFNO0FBQ04sYUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxp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QUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx3QkFBdUIsc0JBQXNCO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXFCO0FBQ3JCOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSw0QkFBMkI7QUFDM0I7QUFDQTtBQUNBO0FBQ0EsNkJBQTRCLFVBQVU7Ozs7Ozs7Ozs7QUNuTHRDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvRUFBbUU7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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxnQkFBZSxTQUFTO0FBQ3hCO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxJQUFHO0FBQ0gscUJBQW9CLFNBQVM7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FB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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbURBQWtELFlBQVksaUJBQWlCO0FBQy9FO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDNUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLDRCQUEyQixzQkFBc0IsRUFBRTtBQUNuRDs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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LE1BQTVCLENBQTFCO0FBRlUsRUFBckIsQyIsImZpbGUiOiIvanMvZGVidWcvaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHR2YXIgcGFyZW50SG90VXBkYXRlQ2FsbGJhY2sgPSB0aGlzW1wid2VicGFja0hvdFVwZGF0ZVwiXTtcbiBcdHRoaXNbXCJ3ZWJwYWNrSG90VXBkYXRlXCJdID0gXHJcbiBcdGZ1bmN0aW9uIHdlYnBhY2tIb3RVcGRhdGVDYWxsYmFjayhjaHVua0lkLCBtb3JlTW9kdWxlcykgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXHJcbiBcdFx0aG90QWRkVXBkYXRlQ2h1bmsoY2h1bmtJZCwgbW9yZU1vZHVsZXMpO1xyXG4gXHRcdGlmKHBhcmVudEhvdFVwZGF0ZUNhbGxiYWNrKSBwYXJlbnRIb3RVcGRhdGVDYWxsYmFjayhjaHVua0lkLCBtb3JlTW9kdWxlcyk7XHJcbiBcdH1cclxuIFx0XHJcbiBcdGZ1bmN0aW9uIGhvdERvd25sb2FkVXBkYXRlQ2h1bmsoY2h1bmtJZCkgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXHJcbiBcdFx0dmFyIGhlYWQgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImhlYWRcIilbMF07XHJcbiBcdFx0dmFyIHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzY3JpcHRcIik7XHJcbiBcdFx0c2NyaXB0LnR5cGUgPSBcInRleHQvamF2YXNjcmlwdFwiO1xyXG4gXHRcdHNjcmlwdC5jaGFyc2V0ID0gXCJ1dGYtOFwiO1xyXG4gXHRcdHNjcmlwdC5zcmMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLnAgKyBcIlwiICsgY2h1bmtJZCArIFwiLlwiICsgaG90Q3VycmVudEhhc2ggKyBcIi5ob3QtdXBkYXRlLmpzXCI7XHJcbiBcdFx0aGVhZC5hcHBlbmRDaGlsZChzY3JpcHQpO1xyXG4gXHR9XHJcbiBcdFxyXG4gXHRmdW5jdGlvbiBob3REb3dubG9hZE1hbmlmZXN0KGNhbGxiYWNrKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcclxuIFx0XHRpZih0eXBlb2YgWE1MSHR0cFJlcXVlc3QgPT09IFwidW5kZWZpbmVkXCIpXHJcbiBcdFx0XHRyZXR1cm4gY2FsbGJhY2sobmV3IEVycm9yKFwiTm8gYnJvd3NlciBzdXBwb3J0XCIpKTtcclxuIFx0XHR0cnkge1xyXG4gXHRcdFx0dmFyIHJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuIFx0XHRcdHZhciByZXF1ZXN0UGF0aCA9IF9fd2VicGFja19yZXF1aXJlX18ucCArIFwiXCIgKyBob3RDdXJyZW50SGFzaCArIFwiLmhvdC11cGRhdGUuanNvblwiO1xyXG4gXHRcdFx0cmVxdWVzdC5vcGVuKFwiR0VUXCIsIHJlcXVlc3RQYXRoLCB0cnVlKTtcclxuIFx0XHRcdHJlcXVlc3QudGltZW91dCA9IDEwMDAwO1xyXG4gXHRcdFx0cmVxdWVzdC5zZW5kKG51bGwpO1xyXG4gXHRcdH0gY2F0Y2goZXJyKSB7XHJcbiBcdFx0XHRyZXR1cm4gY2FsbGJhY2soZXJyKTtcclxuIFx0XHR9XHJcbiBcdFx0cmVxdWVzdC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpIHtcclxuIFx0XHRcdGlmKHJlcXVlc3QucmVhZHlTdGF0ZSAhPT0gNCkgcmV0dXJuO1xyXG4gXHRcdFx0aWYocmVxdWVzdC5zdGF0dXMgPT09IDApIHtcclxuIFx0XHRcdFx0Ly8gdGltZW91dFxyXG4gXHRcdFx0XHRjYWxsYmFjayhuZXcgRXJyb3IoXCJNYW5pZmVzdCByZXF1ZXN0IHRvIFwiICsgcmVxdWVzdFBhdGggKyBcIiB0aW1lZCBvdXQuXCIpKTtcclxuIFx0XHRcdH0gZWxzZSBpZihyZXF1ZXN0LnN0YXR1cyA9PT0gNDA0KSB7XHJcbiBcdFx0XHRcdC8vIG5vIHVwZGF0ZSBhdmFpbGFibGVcclxuIFx0XHRcdFx0Y2FsbGJhY2soKTtcclxuIFx0XHRcdH0gZWxzZSBpZihyZXF1ZXN0LnN0YXR1cyAhPT0gMjAwICYmIHJlcXVlc3Quc3RhdHVzICE9PSAzMDQpIHtcclxuIFx0XHRcdFx0Ly8gb3RoZXIgZmFpbHVyZVxyXG4gXHRcdFx0XHRjYWxsYmFjayhuZXcgRXJyb3IoXCJNYW5pZmVzdCByZXF1ZXN0IHRvIFwiICsgcmVxdWVzdFBhdGggKyBcIiBmYWlsZWQuXCIpKTtcclxuIFx0XHRcdH0gZWxzZSB7XHJcbiBcdFx0XHRcdC8vIHN1Y2Nlc3NcclxuIFx0XHRcdFx0dHJ5IHtcclxuIFx0XHRcdFx0XHR2YXIgdXBkYXRlID0gSlNPTi5wYXJzZShyZXF1ZXN0LnJlc3BvbnNlVGV4dCk7XHJcbiBcdFx0XHRcdH0gY2F0Y2goZSkge1xyXG4gXHRcdFx0XHRcdGNhbGxiYWNrKGUpO1xyXG4gXHRcdFx0XHRcdHJldHVybjtcclxuIFx0XHRcdFx0fVxyXG4gXHRcdFx0XHRjYWxsYmFjayhudWxsLCB1cGRhdGUpO1xyXG4gXHRcdFx0fVxyXG4gXHRcdH07XHJcbiBcdH1cclxuXG4gXHRcclxuIFx0XHJcbiBcdC8vIENvcGllZCBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9mYWNlYm9vay9yZWFjdC9ibG9iL2JlZjQ1YjAvc3JjL3NoYXJlZC91dGlscy9jYW5EZWZpbmVQcm9wZXJ0eS5qc1xyXG4gXHR2YXIgY2FuRGVmaW5lUHJvcGVydHkgPSBmYWxzZTtcclxuIFx0dHJ5IHtcclxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoe30sIFwieFwiLCB7XHJcbiBcdFx0XHRnZXQ6IGZ1bmN0aW9uKCkge31cclxuIFx0XHR9KTtcclxuIFx0XHRjYW5EZWZpbmVQcm9wZXJ0eSA9IHRydWU7XHJcbiBcdH0gY2F0Y2goeCkge1xyXG4gXHRcdC8vIElFIHdpbGwgZmFpbCBvbiBkZWZpbmVQcm9wZXJ0eVxyXG4gXHR9XHJcbiBcdFxyXG4gXHR2YXIgaG90QXBwbHlPblVwZGF0ZSA9IHRydWU7XHJcbiBcdHZhciBob3RDdXJyZW50SGFzaCA9IFwiMDg4NTY0Yjg1MDUwMDBhZjNmOGVcIjsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xyXG4gXHR2YXIgaG90Q3VycmVudE1vZHVsZURhdGEgPSB7fTtcclxuIFx0dmFyIGhvdEN1cnJlbnRQYXJlbnRzID0gW107IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcclxuIFx0XHJcbiBcdGZ1bmN0aW9uIGhvdENyZWF0ZVJlcXVpcmUobW9kdWxlSWQpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xyXG4gXHRcdHZhciBtZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xyXG4gXHRcdGlmKCFtZSkgcmV0dXJuIF9fd2VicGFja19yZXF1aXJlX187XHJcbiBcdFx0dmFyIGZuID0gZnVuY3Rpb24ocmVxdWVzdCkge1xyXG4gXHRcdFx0aWYobWUuaG90LmFjdGl2ZSkge1xyXG4gXHRcdFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW3JlcXVlc3RdKSB7XHJcbiBcdFx0XHRcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1tyZXF1ZXN0XS5wYXJlbnRzLmluZGV4T2YobW9kdWxlSWQpIDwgMClcclxuIFx0XHRcdFx0XHRcdGluc3RhbGxlZE1vZHVsZXNbcmVxdWVzdF0ucGFyZW50cy5wdXNoKG1vZHVsZUlkKTtcclxuIFx0XHRcdFx0XHRpZihtZS5jaGlsZHJlbi5pbmRleE9mKHJlcXVlc3QpIDwgMClcclxuIFx0XHRcdFx0XHRcdG1lLmNoaWxkcmVuLnB1c2gocmVxdWVzdCk7XHJcbiBcdFx0XHRcdH0gZWxzZSBob3RDdXJyZW50UGFyZW50cyA9IFttb2R1bGVJZF07XHJcbiBcdFx0XHR9IGVsc2Uge1xyXG4gXHRcdFx0XHRjb25zb2xlLndhcm4oXCJbSE1SXSB1bmV4cGVjdGVkIHJlcXVpcmUoXCIgKyByZXF1ZXN0ICsgXCIpIGZyb20gZGlzcG9zZWQgbW9kdWxlIFwiICsgbW9kdWxlSWQpO1xyXG4gXHRcdFx0XHRob3RDdXJyZW50UGFyZW50cyA9IFtdO1xyXG4gXHRcdFx0fVxyXG4gXHRcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18ocmVxdWVzdCk7XHJcbiBcdFx0fTtcclxuIFx0XHRmb3IodmFyIG5hbWUgaW4gX193ZWJwYWNrX3JlcXVpcmVfXykge1xyXG4gXHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKF9fd2VicGFja19yZXF1aXJlX18sIG5hbWUpKSB7XHJcbiBcdFx0XHRcdGlmKGNhbkRlZmluZVByb3BlcnR5KSB7XHJcbiBcdFx0XHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGZuLCBuYW1lLCAoZnVuY3Rpb24obmFtZSkge1xyXG4gXHRcdFx0XHRcdFx0cmV0dXJuIHtcclxuIFx0XHRcdFx0XHRcdFx0Y29uZmlndXJhYmxlOiB0cnVlLFxyXG4gXHRcdFx0XHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxyXG4gXHRcdFx0XHRcdFx0XHRnZXQ6IGZ1bmN0aW9uKCkge1xyXG4gXHRcdFx0XHRcdFx0XHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fW25hbWVdO1xyXG4gXHRcdFx0XHRcdFx0XHR9LFxyXG4gXHRcdFx0XHRcdFx0XHRzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XHJcbiBcdFx0XHRcdFx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfX1tuYW1lXSA9IHZhbHVlO1xyXG4gXHRcdFx0XHRcdFx0XHR9XHJcbiBcdFx0XHRcdFx0XHR9O1xyXG4gXHRcdFx0XHRcdH0obmFtZSkpKTtcclxuIFx0XHRcdFx0fSBlbHNlIHtcclxuIFx0XHRcdFx0XHRmbltuYW1lXSA9IF9fd2VicGFja19yZXF1aXJlX19bbmFtZV07XHJcbiBcdFx0XHRcdH1cclxuIFx0XHRcdH1cclxuIFx0XHR9XHJcbiBcdFxyXG4gXHRcdGZ1bmN0aW9uIGVuc3VyZShjaHVua0lkLCBjYWxsYmFjaykge1xyXG4gXHRcdFx0aWYoaG90U3RhdHVzID09PSBcInJlYWR5XCIpXHJcbiBcdFx0XHRcdGhvdFNldFN0YXR1cyhcInByZXBhcmVcIik7XHJcbiBcdFx0XHRob3RDaHVua3NMb2FkaW5nKys7XHJcbiBcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmUoY2h1bmtJZCwgZnVuY3Rpb24oKSB7XHJcbiBcdFx0XHRcdHRyeSB7XHJcbiBcdFx0XHRcdFx0Y2FsbGJhY2suY2FsbChudWxsLCBmbik7XHJcbiBcdFx0XHRcdH0gZmluYWxseSB7XHJcbiBcdFx0XHRcdFx0ZmluaXNoQ2h1bmtMb2FkaW5nKCk7XHJcbiBcdFx0XHRcdH1cclxuIFx0XHJcbiBcdFx0XHRcdGZ1bmN0aW9uIGZpbmlzaENodW5rTG9hZGluZygpIHtcclxuIFx0XHRcdFx0XHRob3RDaHVua3NMb2FkaW5nLS07XHJcbiBcdFx0XHRcdFx0aWYoaG90U3RhdHVzID09PSBcInByZXBhcmVcIikge1xyXG4gXHRcdFx0XHRcdFx0aWYoIWhvdFdhaXRpbmdGaWxlc01hcFtjaHVua0lkXSkge1xyXG4gXHRcdFx0XHRcdFx0XHRob3RFbnN1cmVVcGRhdGVDaHVuayhjaHVua0lkKTtcclxuIFx0XHRcdFx0XHRcdH1cclxuIFx0XHRcdFx0XHRcdGlmKGhvdENodW5rc0xvYWRpbmcgPT09IDAgJiYgaG90V2FpdGluZ0ZpbGVzID09PSAwKSB7XHJcbiBcdFx0XHRcdFx0XHRcdGhvdFVwZGF0ZURvd25sb2FkZWQoKTtcclxuIFx0XHRcdFx0XHRcdH1cclxuIFx0XHRcdFx0XHR9XHJcbiBcdFx0XHRcdH1cclxuIFx0XHRcdH0pO1xyXG4gXHRcdH1cclxuIFx0XHRpZihjYW5EZWZpbmVQcm9wZXJ0eSkge1xyXG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGZuLCBcImVcIiwge1xyXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxyXG4gXHRcdFx0XHR2YWx1ZTogZW5zdXJlXHJcbiBcdFx0XHR9KTtcclxuIFx0XHR9IGVsc2Uge1xyXG4gXHRcdFx0Zm4uZSA9IGVuc3VyZTtcclxuIFx0XHR9XHJcbiBcdFx0cmV0dXJuIGZuO1xyXG4gXHR9XHJcbiBcdFxyXG4gXHRmdW5jdGlvbiBob3RDcmVhdGVNb2R1bGUobW9kdWxlSWQpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xyXG4gXHRcdHZhciBob3QgPSB7XHJcbiBcdFx0XHQvLyBwcml2YXRlIHN0dWZmXHJcbiBcdFx0XHRfYWNjZXB0ZWREZXBlbmRlbmNpZXM6IHt9LFxyXG4gXHRcdFx0X2RlY2xpbmVkRGVwZW5kZW5jaWVzOiB7fSxcclxuIFx0XHRcdF9zZWxmQWNjZXB0ZWQ6IGZhbHNlLFxyXG4gXHRcdFx0X3NlbGZEZWNsaW5lZDogZmFsc2UsXHJcbiBcdFx0XHRfZGlzcG9zZUhhbmRsZXJzOiBbXSxcclxuIFx0XHJcbiBcdFx0XHQvLyBNb2R1bGUgQVBJXHJcbiBcdFx0XHRhY3RpdmU6IHRydWUsXHJcbiBcdFx0XHRhY2NlcHQ6IGZ1bmN0aW9uKGRlcCwgY2FsbGJhY2spIHtcclxuIFx0XHRcdFx0aWYodHlwZW9mIGRlcCA9PT0gXCJ1bmRlZmluZWRcIilcclxuIFx0XHRcdFx0XHRob3QuX3NlbGZBY2NlcHRlZCA9IHRydWU7XHJcbiBcdFx0XHRcdGVsc2UgaWYodHlwZW9mIGRlcCA9PT0gXCJmdW5jdGlvblwiKVxyXG4gXHRcdFx0XHRcdGhvdC5fc2VsZkFjY2VwdGVkID0gZGVwO1xyXG4gXHRcdFx0XHRlbHNlIGlmKHR5cGVvZiBkZXAgPT09IFwib2JqZWN0XCIpXHJcbiBcdFx0XHRcdFx0Zm9yKHZhciBpID0gMDsgaSA8IGRlcC5sZW5ndGg7IGkrKylcclxuIFx0XHRcdFx0XHRcdGhvdC5fYWNjZXB0ZWREZXBlbmRlbmNpZXNbZGVwW2ldXSA9IGNhbGxiYWNrO1xyXG4gXHRcdFx0XHRlbHNlXHJcbiBcdFx0XHRcdFx0aG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1tkZXBdID0gY2FsbGJhY2s7XHJcbiBcdFx0XHR9LFxyXG4gXHRcdFx0ZGVjbGluZTogZnVuY3Rpb24oZGVwKSB7XHJcbiBcdFx0XHRcdGlmKHR5cGVvZiBkZXAgPT09IFwidW5kZWZpbmVkXCIpXHJcbiBcdFx0XHRcdFx0aG90Ll9zZWxmRGVjbGluZWQgPSB0cnVlO1xyXG4gXHRcdFx0XHRlbHNlIGlmKHR5cGVvZiBkZXAgPT09IFwibnVtYmVyXCIpXHJcbiBcdFx0XHRcdFx0aG90Ll9kZWNsaW5lZERlcGVuZGVuY2llc1tkZXBdID0gdHJ1ZTtcclxuIFx0XHRcdFx0ZWxzZVxyXG4gXHRcdFx0XHRcdGZvcih2YXIgaSA9IDA7IGkgPCBkZXAubGVuZ3RoOyBpKyspXHJcbiBcdFx0XHRcdFx0XHRob3QuX2RlY2xpbmVkRGVwZW5kZW5jaWVzW2RlcFtpXV0gPSB0cnVlO1xyXG4gXHRcdFx0fSxcclxuIFx0XHRcdGRpc3Bvc2U6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XHJcbiBcdFx0XHRcdGhvdC5fZGlzcG9zZUhhbmRsZXJzLnB1c2goY2FsbGJhY2spO1xyXG4gXHRcdFx0fSxcclxuIFx0XHRcdGFkZERpc3Bvc2VIYW5kbGVyOiBmdW5jdGlvbihjYWxsYmFjaykge1xyXG4gXHRcdFx0XHRob3QuX2Rpc3Bvc2VIYW5kbGVycy5wdXNoKGNhbGxiYWNrKTtcclxuIFx0XHRcdH0sXHJcbiBcdFx0XHRyZW1vdmVEaXNwb3NlSGFuZGxlcjogZnVuY3Rpb24oY2FsbGJhY2spIHtcclxuIFx0XHRcdFx0dmFyIGlkeCA9IGhvdC5fZGlzcG9zZUhhbmRsZXJzLmluZGV4T2YoY2FsbGJhY2spO1xyXG4gXHRcdFx0XHRpZihpZHggPj0gMCkgaG90Ll9kaXNwb3NlSGFuZGxlcnMuc3BsaWNlKGlkeCwgMSk7XHJcbiBcdFx0XHR9LFxyXG4gXHRcclxuIFx0XHRcdC8vIE1hbmFnZW1lbnQgQVBJXHJcbiBcdFx0XHRjaGVjazogaG90Q2hlY2ssXHJcbiBcdFx0XHRhcHBseTogaG90QXBwbHksXHJcbiBcdFx0XHRzdGF0dXM6IGZ1bmN0aW9uKGwpIHtcclxuIFx0XHRcdFx0aWYoIWwpIHJldHVybiBob3RTdGF0dXM7XHJcbiBcdFx0XHRcdGhvdFN0YXR1c0hhbmRsZXJzLnB1c2gobCk7XHJcbiBcdFx0XHR9LFxyXG4gXHRcdFx0YWRkU3RhdHVzSGFuZGxlcjogZnVuY3Rpb24obCkge1xyXG4gXHRcdFx0XHRob3RTdGF0dXNIYW5kbGVycy5wdXNoKGwpO1xyXG4gXHRcdFx0fSxcclxuIFx0XHRcdHJlbW92ZVN0YXR1c0hhbmRsZXI6IGZ1bmN0aW9uKGwpIHtcclxuIFx0XHRcdFx0dmFyIGlkeCA9IGhvdFN0YXR1c0hhbmRsZXJzLmluZGV4T2YobCk7XHJcbiBcdFx0XHRcdGlmKGlkeCA+PSAwKSBob3RTdGF0dXNIYW5kbGVycy5zcGxpY2UoaWR4LCAxKTtcclxuIFx0XHRcdH0sXHJcbiBcdFxyXG4gXHRcdFx0Ly9pbmhlcml0IGZyb20gcHJldmlvdXMgZGlzcG9zZSBjYWxsXHJcbiBcdFx0XHRkYXRhOiBob3RDdXJyZW50TW9kdWxlRGF0YVttb2R1bGVJZF1cclxuIFx0XHR9O1xyXG4gXHRcdHJldHVybiBob3Q7XHJcbiBcdH1cclxuIFx0XHJcbiBcdHZhciBob3RTdGF0dXNIYW5kbGVycyA9IFtdO1xyXG4gXHR2YXIgaG90U3RhdHVzID0gXCJpZGxlXCI7XHJcbiBcdFxyXG4gXHRmdW5jdGlvbiBob3RTZXRTdGF0dXMobmV3U3RhdHVzKSB7XHJcbiBcdFx0aG90U3RhdHVzID0gbmV3U3RhdHVzO1xyXG4gXHRcdGZvcih2YXIgaSA9IDA7IGkgPCBob3RTdGF0dXNIYW5kbGVycy5sZW5ndGg7IGkrKylcclxuIFx0XHRcdGhvdFN0YXR1c0hhbmRsZXJzW2ldLmNhbGwobnVsbCwgbmV3U3RhdHVzKTtcclxuIFx0fVxyXG4gXHRcclxuIFx0Ly8gd2hpbGUgZG93bmxvYWRpbmdcclxuIFx0dmFyIGhvdFdhaXRpbmdGaWxlcyA9IDA7XHJcbiBcdHZhciBob3RDaHVua3NMb2FkaW5nID0gMDtcclxuIFx0dmFyIGhvdFdhaXRpbmdGaWxlc01hcCA9IHt9O1xyXG4gXHR2YXIgaG90UmVxdWVzdGVkRmlsZXNNYXAgPSB7fTtcclxuIFx0dmFyIGhvdEF2YWlsaWJsZUZpbGVzTWFwID0ge307XHJcbiBcdHZhciBob3RDYWxsYmFjaztcclxuIFx0XHJcbiBcdC8vIFRoZSB1cGRhdGUgaW5mb1xyXG4gXHR2YXIgaG90VXBkYXRlLCBob3RVcGRhdGVOZXdIYXNoO1xyXG4gXHRcclxuIFx0ZnVuY3Rpb24gdG9Nb2R1bGVJZChpZCkge1xyXG4gXHRcdHZhciBpc051bWJlciA9ICgraWQpICsgXCJcIiA9PT0gaWQ7XHJcbiBcdFx0cmV0dXJuIGlzTnVtYmVyID8gK2lkIDogaWQ7XHJcbiBcdH1cclxuIFx0XHJcbiBcdGZ1bmN0aW9uIGhvdENoZWNrKGFwcGx5LCBjYWxsYmFjaykge1xyXG4gXHRcdGlmKGhvdFN0YXR1cyAhPT0gXCJpZGxlXCIpIHRocm93IG5ldyBFcnJvcihcImNoZWNrKCkgaXMgb25seSBhbGxvd2VkIGluIGlkbGUgc3RhdHVzXCIpO1xyXG4gXHRcdGlmKHR5cGVvZiBhcHBseSA9PT0gXCJmdW5jdGlvblwiKSB7XHJcbiBcdFx0XHRob3RBcHBseU9uVXBkYXRlID0gZmFsc2U7XHJcbiBcdFx0XHRjYWxsYmFjayA9IGFwcGx5O1xyXG4gXHRcdH0gZWxzZSB7XHJcbiBcdFx0XHRob3RBcHBseU9uVXBkYXRlID0gYXBwbHk7XHJcbiBcdFx0XHRjYWxsYmFjayA9IGNhbGxiYWNrIHx8IGZ1bmN0aW9uKGVycikge1xyXG4gXHRcdFx0XHRpZihlcnIpIHRocm93IGVycjtcclxuIFx0XHRcdH07XHJcbiBcdFx0fVxyXG4gXHRcdGhvdFNldFN0YXR1cyhcImNoZWNrXCIpO1xyXG4gXHRcdGhvdERvd25sb2FkTWFuaWZlc3QoZnVuY3Rpb24oZXJyLCB1cGRhdGUpIHtcclxuIFx0XHRcdGlmKGVycikgcmV0dXJuIGNhbGxiYWNrKGVycik7XHJcbiBcdFx0XHRpZighdXBkYXRlKSB7XHJcbiBcdFx0XHRcdGhvdFNldFN0YXR1cyhcImlkbGVcIik7XHJcbiBcdFx0XHRcdGNhbGxiYWNrKG51bGwsIG51bGwpO1xyXG4gXHRcdFx0XHRyZXR1cm47XHJcbiBcdFx0XHR9XHJcbiBcdFxyXG4gXHRcdFx0aG90UmVxdWVzdGVkRmlsZXNNYXAgPSB7fTtcclxuIFx0XHRcdGhvdEF2YWlsaWJsZUZpbGVzTWFwID0ge307XHJcbiBcdFx0XHRob3RXYWl0aW5nRmlsZXNNYXAgPSB7fTtcclxuIFx0XHRcdGZvcih2YXIgaSA9IDA7IGkgPCB1cGRhdGUuYy5sZW5ndGg7IGkrKylcclxuIFx0XHRcdFx0aG90QXZhaWxpYmxlRmlsZXNNYXBbdXBkYXRlLmNbaV1dID0gdHJ1ZTtcclxuIFx0XHRcdGhvdFVwZGF0ZU5ld0hhc2ggPSB1cGRhdGUuaDtcclxuIFx0XHJcbiBcdFx0XHRob3RTZXRTdGF0dXMoXCJwcmVwYXJlXCIpO1xyXG4gXHRcdFx0aG90Q2FsbGJhY2sgPSBjYWxsYmFjaztcclxuIFx0XHRcdGhvdFVwZGF0ZSA9IHt9O1xyXG4gXHRcdFx0dmFyIGNodW5rSWQgPSAwO1xyXG4gXHRcdFx0eyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWxvbmUtYmxvY2tzXHJcbiBcdFx0XHRcdC8qZ2xvYmFscyBjaHVua0lkICovXHJcbiBcdFx0XHRcdGhvdEVuc3VyZVVwZGF0ZUNodW5rKGNodW5rSWQpO1xyXG4gXHRcdFx0fVxyXG4gXHRcdFx0aWYoaG90U3RhdHVzID09PSBcInByZXBhcmVcIiAmJiBob3RDaHVua3NMb2FkaW5nID09PSAwICYmIGhvdFdhaXRpbmdGaWxlcyA9PT0gMCkge1xyXG4gXHRcdFx0XHRob3RVcGRhdGVEb3dubG9hZGVkKCk7XHJcbiBcdFx0XHR9XHJcbiBcdFx0fSk7XHJcbiBcdH1cclxuIFx0XHJcbiBcdGZ1bmN0aW9uIGhvdEFkZFVwZGF0ZUNodW5rKGNodW5rSWQsIG1vcmVNb2R1bGVzKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcclxuIFx0XHRpZighaG90QXZhaWxpYmxlRmlsZXNNYXBbY2h1bmtJZF0gfHwgIWhvdFJlcXVlc3RlZEZpbGVzTWFwW2NodW5rSWRdKVxyXG4gXHRcdFx0cmV0dXJuO1xyXG4gXHRcdGhvdFJlcXVlc3RlZEZpbGVzTWFwW2NodW5rSWRdID0gZmFsc2U7XHJcbiBcdFx0Zm9yKHZhciBtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xyXG4gXHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcclxuIFx0XHRcdFx0aG90VXBkYXRlW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcclxuIFx0XHRcdH1cclxuIFx0XHR9XHJcbiBcdFx0aWYoLS1ob3RXYWl0aW5nRmlsZXMgPT09IDAgJiYgaG90Q2h1bmtzTG9hZGluZyA9PT0gMCkge1xyXG4gXHRcdFx0aG90VXBkYXRlRG93bmxvYWRlZCgpO1xyXG4gXHRcdH1cclxuIFx0fVxyXG4gXHRcclxuIFx0ZnVuY3Rpb24gaG90RW5zdXJlVXBkYXRlQ2h1bmsoY2h1bmtJZCkge1xyXG4gXHRcdGlmKCFob3RBdmFpbGlibGVGaWxlc01hcFtjaHVua0lkXSkge1xyXG4gXHRcdFx0aG90V2FpdGluZ0ZpbGVzTWFwW2NodW5rSWRdID0gdHJ1ZTtcclxuIFx0XHR9IGVsc2Uge1xyXG4gXHRcdFx0aG90UmVxdWVzdGVkRmlsZXNNYXBbY2h1bmtJZF0gPSB0cnVlO1xyXG4gXHRcdFx0aG90V2FpdGluZ0ZpbGVzKys7XHJcbiBcdFx0XHRob3REb3dubG9hZFVwZGF0ZUNodW5rKGNodW5rSWQpO1xyXG4gXHRcdH1cclxuIFx0fVxyXG4gXHRcclxuIFx0ZnVuY3Rpb24gaG90VXBkYXRlRG93bmxvYWRlZCgpIHtcclxuIFx0XHRob3RTZXRTdGF0dXMoXCJyZWFkeVwiKTtcclxuIFx0XHR2YXIgY2FsbGJhY2sgPSBob3RDYWxsYmFjaztcclxuIFx0XHRob3RDYWxsYmFjayA9IG51bGw7XHJcbiBcdFx0aWYoIWNhbGxiYWNrKSByZXR1cm47XHJcbiBcdFx0aWYoaG90QXBwbHlPblVwZGF0ZSkge1xyXG4gXHRcdFx0aG90QXBwbHkoaG90QXBwbHlPblVwZGF0ZSwgY2FsbGJhY2spO1xyXG4gXHRcdH0gZWxzZSB7XHJcbiBcdFx0XHR2YXIgb3V0ZGF0ZWRNb2R1bGVzID0gW107XHJcbiBcdFx0XHRmb3IodmFyIGlkIGluIGhvdFVwZGF0ZSkge1xyXG4gXHRcdFx0XHRpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoaG90VXBkYXRlLCBpZCkpIHtcclxuIFx0XHRcdFx0XHRvdXRkYXRlZE1vZHVsZXMucHVzaCh0b01vZHVsZUlkKGlkKSk7XHJcbiBcdFx0XHRcdH1cclxuIFx0XHRcdH1cclxuIFx0XHRcdGNhbGxiYWNrKG51bGwsIG91dGRhdGVkTW9kdWxlcyk7XHJcbiBcdFx0fVxyXG4gXHR9XHJcbiBcdFxyXG4gXHRmdW5jdGlvbiBob3RBcHBseShvcHRpb25zLCBjYWxsYmFjaykge1xyXG4gXHRcdGlmKGhvdFN0YXR1cyAhPT0gXCJyZWFkeVwiKSB0aHJvdyBuZXcgRXJyb3IoXCJhcHBseSgpIGlzIG9ubHkgYWxsb3dlZCBpbiByZWFkeSBzdGF0dXNcIik7XHJcbiBcdFx0aWYodHlwZW9mIG9wdGlvbnMgPT09IFwiZnVuY3Rpb25cIikge1xyXG4gXHRcdFx0Y2FsbGJhY2sgPSBvcHRpb25zO1xyXG4gXHRcdFx0b3B0aW9ucyA9IHt9O1xyXG4gXHRcdH0gZWxzZSBpZihvcHRpb25zICYmIHR5cGVvZiBvcHRpb25zID09PSBcIm9iamVjdFwiKSB7XHJcbiBcdFx0XHRjYWxsYmFjayA9IGNhbGxiYWNrIHx8IGZ1bmN0aW9uKGVycikge1xyXG4gXHRcdFx0XHRpZihlcnIpIHRocm93IGVycjtcclxuIFx0XHRcdH07XHJcbiBcdFx0fSBlbHNlIHtcclxuIFx0XHRcdG9wdGlvbnMgPSB7fTtcclxuIFx0XHRcdGNhbGxiYWNrID0gY2FsbGJhY2sgfHwgZnVuY3Rpb24oZXJyKSB7XHJcbiBcdFx0XHRcdGlmKGVycikgdGhyb3cgZXJyO1xyXG4gXHRcdFx0fTtcclxuIFx0XHR9XHJcbiBcdFxyXG4gXHRcdGZ1bmN0aW9uIGdldEFmZmVjdGVkU3R1ZmYobW9kdWxlKSB7XHJcbiBcdFx0XHR2YXIgb3V0ZGF0ZWRNb2R1bGVzID0gW21vZHVsZV07XHJcbiBcdFx0XHR2YXIgb3V0ZGF0ZWREZXBlbmRlbmNpZXMgPSB7fTtcclxuIFx0XHJcbiBcdFx0XHR2YXIgcXVldWUgPSBvdXRkYXRlZE1vZHVsZXMuc2xpY2UoKTtcclxuIFx0XHRcdHdoaWxlKHF1ZXVlLmxlbmd0aCA+IDApIHtcclxuIFx0XHRcdFx0dmFyIG1vZHVsZUlkID0gcXVldWUucG9wKCk7XHJcbiBcdFx0XHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcclxuIFx0XHRcdFx0aWYoIW1vZHVsZSB8fCBtb2R1bGUuaG90Ll9zZWxmQWNjZXB0ZWQpXHJcbiBcdFx0XHRcdFx0Y29udGludWU7XHJcbiBcdFx0XHRcdGlmKG1vZHVsZS5ob3QuX3NlbGZEZWNsaW5lZCkge1xyXG4gXHRcdFx0XHRcdHJldHVybiBuZXcgRXJyb3IoXCJBYm9ydGVkIGJlY2F1c2Ugb2Ygc2VsZiBkZWNsaW5lOiBcIiArIG1vZHVsZUlkKTtcclxuIFx0XHRcdFx0fVxyXG4gXHRcdFx0XHRpZihtb2R1bGVJZCA9PT0gMCkge1xyXG4gXHRcdFx0XHRcdHJldHVybjtcclxuIFx0XHRcdFx0fVxyXG4gXHRcdFx0XHRmb3IodmFyIGkgPSAwOyBpIDwgbW9kdWxlLnBhcmVudHMubGVuZ3RoOyBpKyspIHtcclxuIFx0XHRcdFx0XHR2YXIgcGFyZW50SWQgPSBtb2R1bGUucGFyZW50c1tpXTtcclxuIFx0XHRcdFx0XHR2YXIgcGFyZW50ID0gaW5zdGFsbGVkTW9kdWxlc1twYXJlbnRJZF07XHJcbiBcdFx0XHRcdFx0aWYocGFyZW50LmhvdC5fZGVjbGluZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdKSB7XHJcbiBcdFx0XHRcdFx0XHRyZXR1cm4gbmV3IEVycm9yKFwiQWJvcnRlZCBiZWNhdXNlIG9mIGRlY2xpbmVkIGRlcGVuZGVuY3k6IFwiICsgbW9kdWxlSWQgKyBcIiBpbiBcIiArIHBhcmVudElkKTtcclxuIFx0XHRcdFx0XHR9XHJcbiBcdFx0XHRcdFx0aWYob3V0ZGF0ZWRNb2R1bGVzLmluZGV4T2YocGFyZW50SWQpID49IDApIGNvbnRpbnVlO1xyXG4gXHRcdFx0XHRcdGlmKHBhcmVudC5ob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSkge1xyXG4gXHRcdFx0XHRcdFx0aWYoIW91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXSlcclxuIFx0XHRcdFx0XHRcdFx0b3V0ZGF0ZWREZXBlbmRlbmNpZXNbcGFyZW50SWRdID0gW107XHJcbiBcdFx0XHRcdFx0XHRhZGRBbGxUb1NldChvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF0sIFttb2R1bGVJZF0pO1xyXG4gXHRcdFx0XHRcdFx0Y29udGludWU7XHJcbiBcdFx0XHRcdFx0fVxyXG4gXHRcdFx0XHRcdGRlbGV0ZSBvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF07XHJcbiBcdFx0XHRcdFx0b3V0ZGF0ZWRNb2R1bGVzLnB1c2gocGFyZW50SWQpO1xyXG4gXHRcdFx0XHRcdHF1ZXVlLnB1c2gocGFyZW50SWQpO1xyXG4gXHRcdFx0XHR9XHJcbiBcdFx0XHR9XHJcbiBcdFxyXG4gXHRcdFx0cmV0dXJuIFtvdXRkYXRlZE1vZHVsZXMsIG91dGRhdGVkRGVwZW5kZW5jaWVzXTtcclxuIFx0XHR9XHJcbiBcdFxyXG4gXHRcdGZ1bmN0aW9uIGFkZEFsbFRvU2V0KGEsIGIpIHtcclxuIFx0XHRcdGZvcih2YXIgaSA9IDA7IGkgPCBiLmxlbmd0aDsgaSsrKSB7XHJcbiBcdFx0XHRcdHZhciBpdGVtID0gYltpXTtcclxuIFx0XHRcdFx0aWYoYS5pbmRleE9mKGl0ZW0pIDwgMClcclxuIFx0XHRcdFx0XHRhLnB1c2goaXRlbSk7XHJcbiBcdFx0XHR9XHJcbiBcdFx0fVxyXG4gXHRcclxuIFx0XHQvLyBhdCBiZWdpbiBhbGwgdXBkYXRlcyBtb2R1bGVzIGFyZSBvdXRkYXRlZFxyXG4gXHRcdC8vIHRoZSBcIm91dGRhdGVkXCIgc3RhdHVzIGNhbiBwcm9wYWdhdGUgdG8gcGFyZW50cyBpZiB0aGV5IGRvbid0IGFjY2VwdCB0aGUgY2hpbGRyZW5cclxuIFx0XHR2YXIgb3V0ZGF0ZWREZXBlbmRlbmNpZXMgPSB7fTtcclxuIFx0XHR2YXIgb3V0ZGF0ZWRNb2R1bGVzID0gW107XHJcbiBcdFx0dmFyIGFwcGxpZWRVcGRhdGUgPSB7fTtcclxuIFx0XHRmb3IodmFyIGlkIGluIGhvdFVwZGF0ZSkge1xyXG4gXHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGhvdFVwZGF0ZSwgaWQpKSB7XHJcbiBcdFx0XHRcdHZhciBtb2R1bGVJZCA9IHRvTW9kdWxlSWQoaWQpO1xyXG4gXHRcdFx0XHR2YXIgcmVzdWx0ID0gZ2V0QWZmZWN0ZWRTdHVmZihtb2R1bGVJZCk7XHJcbiBcdFx0XHRcdGlmKCFyZXN1bHQpIHtcclxuIFx0XHRcdFx0XHRpZihvcHRpb25zLmlnbm9yZVVuYWNjZXB0ZWQpXHJcbiBcdFx0XHRcdFx0XHRjb250aW51ZTtcclxuIFx0XHRcdFx0XHRob3RTZXRTdGF0dXMoXCJhYm9ydFwiKTtcclxuIFx0XHRcdFx0XHRyZXR1cm4gY2FsbGJhY2sobmV3IEVycm9yKFwiQWJvcnRlZCBiZWNhdXNlIFwiICsgbW9kdWxlSWQgKyBcIiBpcyBub3QgYWNjZXB0ZWRcIikpO1xyXG4gXHRcdFx0XHR9XHJcbiBcdFx0XHRcdGlmKHJlc3VsdCBpbnN0YW5jZW9mIEVycm9yKSB7XHJcbiBcdFx0XHRcdFx0aG90U2V0U3RhdHVzKFwiYWJvcnRcIik7XHJcbiBcdFx0XHRcdFx0cmV0dXJuIGNhbGxiYWNrKHJlc3VsdCk7XHJcbiBcdFx0XHRcdH1cclxuIFx0XHRcdFx0YXBwbGllZFVwZGF0ZVttb2R1bGVJZF0gPSBob3RVcGRhdGVbbW9kdWxlSWRdO1xyXG4gXHRcdFx0XHRhZGRBbGxUb1NldChvdXRkYXRlZE1vZHVsZXMsIHJlc3VsdFswXSk7XHJcbiBcdFx0XHRcdGZvcih2YXIgbW9kdWxlSWQgaW4gcmVzdWx0WzFdKSB7XHJcbiBcdFx0XHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHJlc3VsdFsxXSwgbW9kdWxlSWQpKSB7XHJcbiBcdFx0XHRcdFx0XHRpZighb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdKVxyXG4gXHRcdFx0XHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0gPSBbXTtcclxuIFx0XHRcdFx0XHRcdGFkZEFsbFRvU2V0KG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSwgcmVzdWx0WzFdW21vZHVsZUlkXSk7XHJcbiBcdFx0XHRcdFx0fVxyXG4gXHRcdFx0XHR9XHJcbiBcdFx0XHR9XHJcbiBcdFx0fVxyXG4gXHRcclxuIFx0XHQvLyBTdG9yZSBzZWxmIGFjY2VwdGVkIG91dGRhdGVkIG1vZHVsZXMgdG8gcmVxdWlyZSB0aGVtIGxhdGVyIGJ5IHRoZSBtb2R1bGUgc3lzdGVtXHJcbiBcdFx0dmFyIG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlcyA9IFtdO1xyXG4gXHRcdGZvcih2YXIgaSA9IDA7IGkgPCBvdXRkYXRlZE1vZHVsZXMubGVuZ3RoOyBpKyspIHtcclxuIFx0XHRcdHZhciBtb2R1bGVJZCA9IG91dGRhdGVkTW9kdWxlc1tpXTtcclxuIFx0XHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdICYmIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmhvdC5fc2VsZkFjY2VwdGVkKVxyXG4gXHRcdFx0XHRvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXMucHVzaCh7XHJcbiBcdFx0XHRcdFx0bW9kdWxlOiBtb2R1bGVJZCxcclxuIFx0XHRcdFx0XHRlcnJvckhhbmRsZXI6IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmhvdC5fc2VsZkFjY2VwdGVkXHJcbiBcdFx0XHRcdH0pO1xyXG4gXHRcdH1cclxuIFx0XHJcbiBcdFx0Ly8gTm93IGluIFwiZGlzcG9zZVwiIHBoYXNlXHJcbiBcdFx0aG90U2V0U3RhdHVzKFwiZGlzcG9zZVwiKTtcclxuIFx0XHR2YXIgcXVldWUgPSBvdXRkYXRlZE1vZHVsZXMuc2xpY2UoKTtcclxuIFx0XHR3aGlsZShxdWV1ZS5sZW5ndGggPiAwKSB7XHJcbiBcdFx0XHR2YXIgbW9kdWxlSWQgPSBxdWV1ZS5wb3AoKTtcclxuIFx0XHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcclxuIFx0XHRcdGlmKCFtb2R1bGUpIGNvbnRpbnVlO1xyXG4gXHRcclxuIFx0XHRcdHZhciBkYXRhID0ge307XHJcbiBcdFxyXG4gXHRcdFx0Ly8gQ2FsbCBkaXNwb3NlIGhhbmRsZXJzXHJcbiBcdFx0XHR2YXIgZGlzcG9zZUhhbmRsZXJzID0gbW9kdWxlLmhvdC5fZGlzcG9zZUhhbmRsZXJzO1xyXG4gXHRcdFx0Zm9yKHZhciBqID0gMDsgaiA8IGRpc3Bvc2VIYW5kbGVycy5sZW5ndGg7IGorKykge1xyXG4gXHRcdFx0XHR2YXIgY2IgPSBkaXNwb3NlSGFuZGxlcnNbal07XHJcbiBcdFx0XHRcdGNiKGRhdGEpO1xyXG4gXHRcdFx0fVxyXG4gXHRcdFx0aG90Q3VycmVudE1vZHVsZURhdGFbbW9kdWxlSWRdID0gZGF0YTtcclxuIFx0XHJcbiBcdFx0XHQvLyBkaXNhYmxlIG1vZHVsZSAodGhpcyBkaXNhYmxlcyByZXF1aXJlcyBmcm9tIHRoaXMgbW9kdWxlKVxyXG4gXHRcdFx0bW9kdWxlLmhvdC5hY3RpdmUgPSBmYWxzZTtcclxuIFx0XHJcbiBcdFx0XHQvLyByZW1vdmUgbW9kdWxlIGZyb20gY2FjaGVcclxuIFx0XHRcdGRlbGV0ZSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcclxuIFx0XHJcbiBcdFx0XHQvLyByZW1vdmUgXCJwYXJlbnRzXCIgcmVmZXJlbmNlcyBmcm9tIGFsbCBjaGlsZHJlblxyXG4gXHRcdFx0Zm9yKHZhciBqID0gMDsgaiA8IG1vZHVsZS5jaGlsZHJlbi5sZW5ndGg7IGorKykge1xyXG4gXHRcdFx0XHR2YXIgY2hpbGQgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZS5jaGlsZHJlbltqXV07XHJcbiBcdFx0XHRcdGlmKCFjaGlsZCkgY29udGludWU7XHJcbiBcdFx0XHRcdHZhciBpZHggPSBjaGlsZC5wYXJlbnRzLmluZGV4T2YobW9kdWxlSWQpO1xyXG4gXHRcdFx0XHRpZihpZHggPj0gMCkge1xyXG4gXHRcdFx0XHRcdGNoaWxkLnBhcmVudHMuc3BsaWNlKGlkeCwgMSk7XHJcbiBcdFx0XHRcdH1cclxuIFx0XHRcdH1cclxuIFx0XHR9XHJcbiBcdFxyXG4gXHRcdC8vIHJlbW92ZSBvdXRkYXRlZCBkZXBlbmRlbmN5IGZyb20gbW9kdWxlIGNoaWxkcmVuXHJcbiBcdFx0Zm9yKHZhciBtb2R1bGVJZCBpbiBvdXRkYXRlZERlcGVuZGVuY2llcykge1xyXG4gXHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG91dGRhdGVkRGVwZW5kZW5jaWVzLCBtb2R1bGVJZCkpIHtcclxuIFx0XHRcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xyXG4gXHRcdFx0XHR2YXIgbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMgPSBvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF07XHJcbiBcdFx0XHRcdGZvcih2YXIgaiA9IDA7IGogPCBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcy5sZW5ndGg7IGorKykge1xyXG4gXHRcdFx0XHRcdHZhciBkZXBlbmRlbmN5ID0gbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXNbal07XHJcbiBcdFx0XHRcdFx0dmFyIGlkeCA9IG1vZHVsZS5jaGlsZHJlbi5pbmRleE9mKGRlcGVuZGVuY3kpO1xyXG4gXHRcdFx0XHRcdGlmKGlkeCA+PSAwKSBtb2R1bGUuY2hpbGRyZW4uc3BsaWNlKGlkeCwgMSk7XHJcbiBcdFx0XHRcdH1cclxuIFx0XHRcdH1cclxuIFx0XHR9XHJcbiBcdFxyXG4gXHRcdC8vIE5vdCBpbiBcImFwcGx5XCIgcGhhc2VcclxuIFx0XHRob3RTZXRTdGF0dXMoXCJhcHBseVwiKTtcclxuIFx0XHJcbiBcdFx0aG90Q3VycmVudEhhc2ggPSBob3RVcGRhdGVOZXdIYXNoO1xyXG4gXHRcclxuIFx0XHQvLyBpbnNlcnQgbmV3IGNvZGVcclxuIFx0XHRmb3IodmFyIG1vZHVsZUlkIGluIGFwcGxpZWRVcGRhdGUpIHtcclxuIFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChhcHBsaWVkVXBkYXRlLCBtb2R1bGVJZCkpIHtcclxuIFx0XHRcdFx0bW9kdWxlc1ttb2R1bGVJZF0gPSBhcHBsaWVkVXBkYXRlW21vZHVsZUlkXTtcclxuIFx0XHRcdH1cclxuIFx0XHR9XHJcbiBcdFxyXG4gXHRcdC8vIGNhbGwgYWNjZXB0IGhhbmRsZXJzXHJcbiBcdFx0dmFyIGVycm9yID0gbnVsbDtcclxuIFx0XHRmb3IodmFyIG1vZHVsZUlkIGluIG91dGRhdGVkRGVwZW5kZW5jaWVzKSB7XHJcbiBcdFx0XHRpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob3V0ZGF0ZWREZXBlbmRlbmNpZXMsIG1vZHVsZUlkKSkge1xyXG4gXHRcdFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XHJcbiBcdFx0XHRcdHZhciBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcyA9IG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXTtcclxuIFx0XHRcdFx0dmFyIGNhbGxiYWNrcyA9IFtdO1xyXG4gXHRcdFx0XHRmb3IodmFyIGkgPSAwOyBpIDwgbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMubGVuZ3RoOyBpKyspIHtcclxuIFx0XHRcdFx0XHR2YXIgZGVwZW5kZW5jeSA9IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzW2ldO1xyXG4gXHRcdFx0XHRcdHZhciBjYiA9IG1vZHVsZS5ob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW2RlcGVuZGVuY3ldO1xyXG4gXHRcdFx0XHRcdGlmKGNhbGxiYWNrcy5pbmRleE9mKGNiKSA+PSAwKSBjb250aW51ZTtcclxuIFx0XHRcdFx0XHRjYWxsYmFja3MucHVzaChjYik7XHJcbiBcdFx0XHRcdH1cclxuIFx0XHRcdFx0Zm9yKHZhciBpID0gMDsgaSA8IGNhbGxiYWNrcy5sZW5ndGg7IGkrKykge1xyXG4gXHRcdFx0XHRcdHZhciBjYiA9IGNhbGxiYWNrc1tpXTtcclxuIFx0XHRcdFx0XHR0cnkge1xyXG4gXHRcdFx0XHRcdFx0Y2Iob3V0ZGF0ZWREZXBlbmRlbmNpZXMpO1xyXG4gXHRcdFx0XHRcdH0gY2F0Y2goZXJyKSB7XHJcbiBcdFx0XHRcdFx0XHRpZighZXJyb3IpXHJcbiBcdFx0XHRcdFx0XHRcdGVycm9yID0gZXJyO1xyXG4gXHRcdFx0XHRcdH1cclxuIFx0XHRcdFx0fVxyXG4gXHRcdFx0fVxyXG4gXHRcdH1cclxuIFx0XHJcbiBcdFx0Ly8gTG9hZCBzZWxmIGFjY2VwdGVkIG1vZHVsZXNcclxuIFx0XHRmb3IodmFyIGkgPSAwOyBpIDwgb3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzLmxlbmd0aDsgaSsrKSB7XHJcbiBcdFx0XHR2YXIgaXRlbSA9IG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlc1tpXTtcclxuIFx0XHRcdHZhciBtb2R1bGVJZCA9IGl0ZW0ubW9kdWxlO1xyXG4gXHRcdFx0aG90Q3VycmVudFBhcmVudHMgPSBbbW9kdWxlSWRdO1xyXG4gXHRcdFx0dHJ5IHtcclxuIFx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCk7XHJcbiBcdFx0XHR9IGNhdGNoKGVycikge1xyXG4gXHRcdFx0XHRpZih0eXBlb2YgaXRlbS5lcnJvckhhbmRsZXIgPT09IFwiZnVuY3Rpb25cIikge1xyXG4gXHRcdFx0XHRcdHRyeSB7XHJcbiBcdFx0XHRcdFx0XHRpdGVtLmVycm9ySGFuZGxlcihlcnIpO1xyXG4gXHRcdFx0XHRcdH0gY2F0Y2goZXJyKSB7XHJcbiBcdFx0XHRcdFx0XHRpZighZXJyb3IpXHJcbiBcdFx0XHRcdFx0XHRcdGVycm9yID0gZXJyO1xyXG4gXHRcdFx0XHRcdH1cclxuIFx0XHRcdFx0fSBlbHNlIGlmKCFlcnJvcilcclxuIFx0XHRcdFx0XHRlcnJvciA9IGVycjtcclxuIFx0XHRcdH1cclxuIFx0XHR9XHJcbiBcdFxyXG4gXHRcdC8vIGhhbmRsZSBlcnJvcnMgaW4gYWNjZXB0IGhhbmRsZXJzIGFuZCBzZWxmIGFjY2VwdGVkIG1vZHVsZSBsb2FkXHJcbiBcdFx0aWYoZXJyb3IpIHtcclxuIFx0XHRcdGhvdFNldFN0YXR1cyhcImZhaWxcIik7XHJcbiBcdFx0XHRyZXR1cm4gY2FsbGJhY2soZXJyb3IpO1xyXG4gXHRcdH1cclxuIFx0XHJcbiBcdFx0aG90U2V0U3RhdHVzKFwiaWRsZVwiKTtcclxuIFx0XHRjYWxsYmFjayhudWxsLCBvdXRkYXRlZE1vZHVsZXMpO1xyXG4gXHR9XHJcblxuIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlLFxuIFx0XHRcdGhvdDogaG90Q3JlYXRlTW9kdWxlKG1vZHVsZUlkKSxcbiBcdFx0XHRwYXJlbnRzOiBob3RDdXJyZW50UGFyZW50cyxcbiBcdFx0XHRjaGlsZHJlbjogW11cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgaG90Q3JlYXRlUmVxdWlyZShtb2R1bGVJZCkpO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL3N0YXRpY1wiO1xuXG4gXHQvLyBfX3dlYnBhY2tfaGFzaF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmggPSBmdW5jdGlvbigpIHsgcmV0dXJuIGhvdEN1cnJlbnRIYXNoOyB9O1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBob3RDcmVhdGVSZXF1aXJlKDApKDApO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgMDg4NTY0Yjg1MDUwMDBhZjNmOGVcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IGxpYnNfbGliO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwgXCJsaWJzX2xpYlwiXG4gKiogbW9kdWxlIGlkID0gMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDEgMlxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gKF9fd2VicGFja19yZXF1aXJlX18oMSkpKDQyKTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGRlbGVnYXRlZCAuL25vZGVfbW9kdWxlcy9yZWFjdC9yZWFjdC5qcyBmcm9tIGRsbC1yZWZlcmVuY2UgbGlic19saWJcbiAqKiBtb2R1bGUgaWQgPSAyXG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAyXG4gKiovIiwiLy8gaHR0cHM6Ly9naXRodWIuY29tL3psb2lyb2NrL2NvcmUtanMvaXNzdWVzLzg2I2lzc3VlY29tbWVudC0xMTU3NTkwMjhcbnZhciBnbG9iYWwgPSBtb2R1bGUuZXhwb3J0cyA9IHR5cGVvZiB3aW5kb3cgIT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93Lk1hdGggPT0gTWF0aFxuICA/IHdpbmRvdyA6IHR5cGVvZiBzZWxmICE9ICd1bmRlZmluZWQnICYmIHNlbGYuTWF0aCA9PSBNYXRoID8gc2VsZiA6IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5pZih0eXBlb2YgX19nID09ICdudW1iZXInKV9fZyA9IGdsb2JhbDsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bmRlZlxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19nbG9iYWwuanNcbiAqKiBtb2R1bGUgaWQgPSAzXG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAyXG4gKiovIiwidmFyIGhhc093blByb3BlcnR5ID0ge30uaGFzT3duUHJvcGVydHk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0LCBrZXkpe1xuICByZXR1cm4gaGFzT3duUHJvcGVydHkuY2FsbChpdCwga2V5KTtcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2hhcy5qc1xuICoqIG1vZHVsZSBpZCA9IDRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDJcbiAqKi8iLCIvLyB0byBpbmRleGVkIG9iamVjdCwgdG9PYmplY3Qgd2l0aCBmYWxsYmFjayBmb3Igbm9uLWFycmF5LWxpa2UgRVMzIHN0cmluZ3NcbnZhciBJT2JqZWN0ID0gcmVxdWlyZSgnLi9faW9iamVjdCcpXG4gICwgZGVmaW5lZCA9IHJlcXVpcmUoJy4vX2RlZmluZWQnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gSU9iamVjdChkZWZpbmVkKGl0KSk7XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1pb2JqZWN0LmpzXG4gKiogbW9kdWxlIGlkID0gNVxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDEgMlxuICoqLyIsIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAoaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7XG4gIGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTtcbiAgfVxufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9iYWJlbC1ydW50aW1lL2hlbHBlcnMvY2xhc3NDYWxsQ2hlY2suanNcbiAqKiBtb2R1bGUgaWQgPSA2XG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAyXG4gKiovIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbnZhciBfc2V0UHJvdG90eXBlT2YgPSByZXF1aXJlKFwiLi4vY29yZS1qcy9vYmplY3Qvc2V0LXByb3RvdHlwZS1vZlwiKTtcblxudmFyIF9zZXRQcm90b3R5cGVPZjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9zZXRQcm90b3R5cGVPZik7XG5cbnZhciBfY3JlYXRlID0gcmVxdWlyZShcIi4uL2NvcmUtanMvb2JqZWN0L2NyZWF0ZVwiKTtcblxudmFyIF9jcmVhdGUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY3JlYXRlKTtcblxudmFyIF90eXBlb2YyID0gcmVxdWlyZShcIi4uL2hlbHBlcnMvdHlwZW9mXCIpO1xuXG52YXIgX3R5cGVvZjMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF90eXBlb2YyKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZXhwb3J0cy5kZWZhdWx0ID0gZnVuY3Rpb24gKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7XG4gIGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gXCJmdW5jdGlvblwiICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCBcIiArICh0eXBlb2Ygc3VwZXJDbGFzcyA9PT0gXCJ1bmRlZmluZWRcIiA/IFwidW5kZWZpbmVkXCIgOiAoMCwgX3R5cGVvZjMuZGVmYXVsdCkoc3VwZXJDbGFzcykpKTtcbiAgfVxuXG4gIHN1YkNsYXNzLnByb3RvdHlwZSA9ICgwLCBfY3JlYXRlMi5kZWZhdWx0KShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7XG4gICAgY29uc3RydWN0b3I6IHtcbiAgICAgIHZhbHVlOiBzdWJDbGFzcyxcbiAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9XG4gIH0pO1xuICBpZiAoc3VwZXJDbGFzcykgX3NldFByb3RvdHlwZU9mMi5kZWZhdWx0ID8gKDAsIF9zZXRQcm90b3R5cGVPZjIuZGVmYXVsdCkoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIDogc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzcztcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vYmFiZWwtcnVudGltZS9oZWxwZXJzL2luaGVyaXRzLmpzXG4gKiogbW9kdWxlIGlkID0gN1xuICoqIG1vZHVsZSBjaHVua3MgPSAwIDEgMlxuICoqLyIsIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG52YXIgX3R5cGVvZjIgPSByZXF1aXJlKFwiLi4vaGVscGVycy90eXBlb2ZcIik7XG5cbnZhciBfdHlwZW9mMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3R5cGVvZjIpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAoc2VsZiwgY2FsbCkge1xuICBpZiAoIXNlbGYpIHtcbiAgICB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7XG4gIH1cblxuICByZXR1cm4gY2FsbCAmJiAoKHR5cGVvZiBjYWxsID09PSBcInVuZGVmaW5lZFwiID8gXCJ1bmRlZmluZWRcIiA6ICgwLCBfdHlwZW9mMy5kZWZhdWx0KShjYWxsKSkgPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIGNhbGwgPT09IFwiZnVuY3Rpb25cIikgPyBjYWxsIDogc2VsZjtcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vYmFiZWwtcnVudGltZS9oZWxwZXJzL3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4uanNcbiAqKiBtb2R1bGUgaWQgPSA4XG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAyXG4gKiovIiwiLy8gVGhhbmsncyBJRTggZm9yIGhpcyBmdW5ueSBkZWZpbmVQcm9wZXJ0eVxubW9kdWxlLmV4cG9ydHMgPSAhcmVxdWlyZSgnLi9fZmFpbHMnKShmdW5jdGlvbigpe1xuICByZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnR5KHt9LCAnYScsIHtnZXQ6IGZ1bmN0aW9uKCl7IHJldHVybiA3OyB9fSkuYSAhPSA3O1xufSk7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2Rlc2NyaXB0b3JzLmpzXG4gKiogbW9kdWxlIGlkID0gOVxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDEgMlxuICoqLyIsInZhciBkUCAgICAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJylcbiAgLCBjcmVhdGVEZXNjID0gcmVxdWlyZSgnLi9fcHJvcGVydHktZGVzYycpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpID8gZnVuY3Rpb24ob2JqZWN0LCBrZXksIHZhbHVlKXtcbiAgcmV0dXJuIGRQLmYob2JqZWN0LCBrZXksIGNyZWF0ZURlc2MoMSwgdmFsdWUpKTtcbn0gOiBmdW5jdGlvbihvYmplY3QsIGtleSwgdmFsdWUpe1xuICBvYmplY3Rba2V5XSA9IHZhbHVlO1xuICByZXR1cm4gb2JqZWN0O1xufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faGlkZS5qc1xuICoqIG1vZHVsZSBpZCA9IDEwXG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAyXG4gKiovIiwidmFyIGFuT2JqZWN0ICAgICAgID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0JylcbiAgLCBJRThfRE9NX0RFRklORSA9IHJlcXVpcmUoJy4vX2llOC1kb20tZGVmaW5lJylcbiAgLCB0b1ByaW1pdGl2ZSAgICA9IHJlcXVpcmUoJy4vX3RvLXByaW1pdGl2ZScpXG4gICwgZFAgICAgICAgICAgICAgPSBPYmplY3QuZGVmaW5lUHJvcGVydHk7XG5cbmV4cG9ydHMuZiA9IHJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgPyBPYmplY3QuZGVmaW5lUHJvcGVydHkgOiBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0eShPLCBQLCBBdHRyaWJ1dGVzKXtcbiAgYW5PYmplY3QoTyk7XG4gIFAgPSB0b1ByaW1pdGl2ZShQLCB0cnVlKTtcbiAgYW5PYmplY3QoQXR0cmlidXRlcyk7XG4gIGlmKElFOF9ET01fREVGSU5FKXRyeSB7XG4gICAgcmV0dXJuIGRQKE8sIFAsIEF0dHJpYnV0ZXMpO1xuICB9IGNhdGNoKGUpeyAvKiBlbXB0eSAqLyB9XG4gIGlmKCdnZXQnIGluIEF0dHJpYnV0ZXMgfHwgJ3NldCcgaW4gQXR0cmlidXRlcyl0aHJvdyBUeXBlRXJyb3IoJ0FjY2Vzc29ycyBub3Qgc3VwcG9ydGVkIScpO1xuICBpZigndmFsdWUnIGluIEF0dHJpYnV0ZXMpT1tQXSA9IEF0dHJpYnV0ZXMudmFsdWU7XG4gIHJldHVybiBPO1xufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWRwLmpzXG4gKiogbW9kdWxlIGlkID0gMTFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDJcbiAqKi8iLCJ2YXIgc3RvcmUgICAgICA9IHJlcXVpcmUoJy4vX3NoYXJlZCcpKCd3a3MnKVxuICAsIHVpZCAgICAgICAgPSByZXF1aXJlKCcuL191aWQnKVxuICAsIFN5bWJvbCAgICAgPSByZXF1aXJlKCcuL19nbG9iYWwnKS5TeW1ib2xcbiAgLCBVU0VfU1lNQk9MID0gdHlwZW9mIFN5bWJvbCA9PSAnZnVuY3Rpb24nO1xuXG52YXIgJGV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG5hbWUpe1xuICByZXR1cm4gc3RvcmVbbmFtZV0gfHwgKHN0b3JlW25hbWVdID1cbiAgICBVU0VfU1lNQk9MICYmIFN5bWJvbFtuYW1lXSB8fCAoVVNFX1NZTUJPTCA/IFN5bWJvbCA6IHVpZCkoJ1N5bWJvbC4nICsgbmFtZSkpO1xufTtcblxuJGV4cG9ydHMuc3RvcmUgPSBzdG9yZTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fd2tzLmpzXG4gKiogbW9kdWxlIGlkID0gMTJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDJcbiAqKi8iLCJ2YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICBpZighaXNPYmplY3QoaXQpKXRocm93IFR5cGVFcnJvcihpdCArICcgaXMgbm90IGFuIG9iamVjdCEnKTtcbiAgcmV0dXJuIGl0O1xufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYW4tb2JqZWN0LmpzXG4gKiogbW9kdWxlIGlkID0gMTNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDJcbiAqKi8iLCJ2YXIgY29yZSA9IG1vZHVsZS5leHBvcnRzID0ge3ZlcnNpb246ICcyLjQuMCd9O1xuaWYodHlwZW9mIF9fZSA9PSAnbnVtYmVyJylfX2UgPSBjb3JlOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVuZGVmXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2NvcmUuanNcbiAqKiBtb2R1bGUgaWQgPSAxNFxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDEgMlxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gdHlwZW9mIGl0ID09PSAnb2JqZWN0JyA/IGl0ICE9PSBudWxsIDogdHlwZW9mIGl0ID09PSAnZnVuY3Rpb24nO1xufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXMtb2JqZWN0LmpzXG4gKiogbW9kdWxlIGlkID0gMTVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDJcbiAqKi8iLCJpbXBvcnQgUmVhY3QsIHsgUHJvcFR5cGVzLCBDb21wb25lbnQgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgc2hhbGxvd0VxdWFsIGZyb20gJy4uL3V0aWxzL3NoYWxsb3dFcXVhbCc7XG5pbXBvcnQgRXZlbnRFbWl0dGVyIGZyb20gJ2V2ZW50cyc7XG5cbmNvbnN0IGV2ZW50TWF0Y2hSZWcgPSAvXm9uW0EtWl0vO1xuZnVuY3Rpb24gZ2V0RXZlbnRNZXRob2RzUHJvcHMoaW5zdGFuY2Upe1xuICAgIGxldCBtZXRob2RzID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoaW5zdGFuY2UpXG4gICAgICAgIC5maWx0ZXIoKHByb3ApID0+IHtcbiAgICAgICAgICAgIHJldHVybiBldmVudE1hdGNoUmVnLnRlc3QocHJvcClcbiAgICAgICAgICAgICAgICAmJiB0eXBlb2YgaW5zdGFuY2VbcHJvcF0gPT09ICdmdW5jdGlvbic7XG4gICAgICAgIH0pO1xuXG4gICAgbGV0IGluc3RhbmNlUHJvdG90eXBlID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKGluc3RhbmNlKTtcbiAgICBpZihpbnN0YW5jZVByb3RvdHlwZSAhPT0gT2JqZWN0LnByb3RvdHlwZSkge1xuICAgICAgICBtZXRob2RzID0gbWV0aG9kcy5jb25jYXQoZ2V0RXZlbnRNZXRob2RzUHJvcHMoaW5zdGFuY2VQcm90b3R5cGUpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbWV0aG9kc1xufVxuXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJhc2UgZXh0ZW5kcyBDb21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzLCBjb250ZXh0KXtcbiAgICAgICAgc3VwZXIocHJvcHMsIGNvbnRleHQpO1xuXG4gICAgICAgIHRoaXMuX19ldmVudE5hbWVzID0ge307XG5cbiAgICAgICAgdGhpcy5fX2JpbmRGdW5jdGlvbnMoKTtcbiAgICB9XG5cbiAgICBfX2JpbmRGdW5jdGlvbnMoKXtcbiAgICAgICAgbGV0IHByb3BzID0gZ2V0RXZlbnRNZXRob2RzUHJvcHModGhpcyk7XG4gICAgICAgIGZvcihsZXQgcHJvcCBvZiBwcm9wcyl7XG4gICAgICAgICAgICBpZighdGhpc1twcm9wXS5mdW5jQmluZGVkKXtcbiAgICAgICAgICAgICAgICB0aGlzW3Byb3BdID0gdGhpc1twcm9wXS5iaW5kKHRoaXMpO1xuICAgICAgICAgICAgICAgIHRoaXNbcHJvcF0uZnVuY0JpbmRlZCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbihldmVudE5hbWUsIGZuKXtcbiAgICAgICAgaWYodHlwZW9mIGZuICE9PSAnZnVuY3Rpb24nKSB0aHJvdyBuZXcgRXJyb3IoJ2ZuIHNob3VsZCBiZSBhIGZ1bmN0aW9uJyk7XG5cbiAgICAgICAgaWYoIXRoaXMuX19ldmVudE5hbWVzW2V2ZW50TmFtZV0pe1xuICAgICAgICAgICAgdGhpcy5fX2V2ZW50TmFtZXNbZXZlbnROYW1lXSA9IFtmbl07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9fZXZlbnROYW1lc1tldmVudE5hbWVdLnB1c2goZm4pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuY29udGV4dC4kZXZlbnRCdXMuYWRkTGlzdGVuZXIoZXZlbnROYW1lLCBmbik7XG4gICAgfVxuXG4gICAgZW1pdChldmVudE5hbWUsIC4uLmFyZ3Mpe1xuICAgICAgICByZXR1cm4gdGhpcy5jb250ZXh0LiRldmVudEJ1cy5lbWl0KGV2ZW50TmFtZSwgLi4uYXJncyk7XG4gICAgfVxuXG4gICAgb2ZmKGV2ZW50TmFtZSwgZm4pe1xuICAgICAgICBsZXQgZXZlbnRzID0gdGhpcy5fX2V2ZW50TmFtZXNbZXZlbnROYW1lXTtcbiAgICAgICAgaWYoZXZlbnRzKXtcbiAgICAgICAgICAgIGxldCBpbmRleCA9IGV2ZW50cy5pbmRleE9mKGZuKTtcblxuICAgICAgICAgICAgaWYoaW5kZXggPj0gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuY29udGV4dC4kZXZlbnRCdXMucmVtb3ZlTGlzdGVuZXIoZXZlbnROYW1lLCBmbik7XG5cbiAgICAgICAgICAgICAgICBldmVudHMuc3BsaWNlKGluZGV4LCAxKTtcblxuICAgICAgICAgICAgICAgIGlmKCFldmVudHMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLl9fZXZlbnROYW1lc1tldmVudE5hbWVdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKCdldmVudDogJyArIGV2ZW50TmFtZSArICcgaXMgbm90IHJlZ2lzdGVyZWQgaW4gJyArIHRoaXMuX3JlYWN0SW50ZXJuYWxJbnN0YW5jZS5nZXROYW1lKCkgKyAnIENvbXBvbmVudCcpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybignZXZlbnQ6ICcgKyBldmVudE5hbWUgKyAnIGlzIG5vdCByZWdpc3RlcmVkIGluICcgKyB0aGlzLmNvbnN0cnVjdG9yLm5hbWUgKyAnIENvbXBvbmVudCcpO1xuXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIOajgOmqjOe7hOS7tuabtOaWsFxuICAgICAqIEBwYXJhbSBuZXh0UHJvcHNcbiAgICAgKiBAcGFyYW0gbmV4dFN0YXRlXG4gICAgICogQHJldHVybnMgeyp9XG4gICAgICovXG4gICAgc2hvdWxkQ29tcG9uZW50VXBkYXRlKG5leHRQcm9wcywgbmV4dFN0YXRlKXtcbiAgICAgICAgbGV0IHNob3VsZFVwZGF0ZSA9ICFzaGFsbG93RXF1YWwodGhpcy5wcm9wcywgbmV4dFByb3BzKSB8fCAhc2hhbGxvd0VxdWFsKHRoaXMuc3RhdGUsIG5leHRTdGF0ZSk7XG5cbiAgICAgICAgaWYoc2hvdWxkVXBkYXRlICYmIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdDb21wb25lbnQ6ICcgKyB0aGlzLmNvbnN0cnVjdG9yLm5hbWUgKyAnIHdpbGwgdXBkYXRlJyk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gc2hvdWxkVXBkYXRlO1xuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50KCl7XG4gICAgICAgIGZvcihsZXQgZXZlbnROYW1lIGluIHRoaXMuX19ldmVudE5hbWVzKXtcbiAgICAgICAgICAgIGlmKHRoaXMuX19ldmVudE5hbWVzLmhhc093blByb3BlcnR5KGV2ZW50TmFtZSkpe1xuICAgICAgICAgICAgICAgIGZvcihsZXQgZm4gb2YgdGhpcy5fX2V2ZW50TmFtZXNbZXZlbnROYW1lXSl7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub2ZmKGV2ZW50TmFtZSwgZm4pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cbkJhc2UuY29udGV4dFR5cGVzID0ge1xuICAgICRldmVudEJ1czogUHJvcFR5cGVzLmluc3RhbmNlT2YoRXZlbnRFbWl0dGVyKVxufTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vY29tbW9uL3BhZ2VzL0Jhc2UuanN4XG4gKiovIiwiLy8gc2hpbSBmb3IgdXNpbmcgcHJvY2VzcyBpbiBicm93c2VyXG52YXIgcHJvY2VzcyA9IG1vZHVsZS5leHBvcnRzID0ge307XG5cbi8vIGNhY2hlZCBmcm9tIHdoYXRldmVyIGdsb2JhbCBpcyBwcmVzZW50IHNvIHRoYXQgdGVzdCBydW5uZXJzIHRoYXQgc3R1YiBpdFxuLy8gZG9uJ3QgYnJlYWsgdGhpbmdzLiAgQnV0IHdlIG5lZWQgdG8gd3JhcCBpdCBpbiBhIHRyeSBjYXRjaCBpbiBjYXNlIGl0IGlzXG4vLyB3cmFwcGVkIGluIHN0cmljdCBtb2RlIGNvZGUgd2hpY2ggZG9lc24ndCBkZWZpbmUgYW55IGdsb2JhbHMuICBJdCdzIGluc2lkZSBhXG4vLyBmdW5jdGlvbiBiZWNhdXNlIHRyeS9jYXRjaGVzIGRlb3B0aW1pemUgaW4gY2VydGFpbiBlbmdpbmVzLlxuXG52YXIgY2FjaGVkU2V0VGltZW91dDtcbnZhciBjYWNoZWRDbGVhclRpbWVvdXQ7XG5cbmZ1bmN0aW9uIGRlZmF1bHRTZXRUaW1vdXQoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdzZXRUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG5mdW5jdGlvbiBkZWZhdWx0Q2xlYXJUaW1lb3V0ICgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2NsZWFyVGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuKGZ1bmN0aW9uICgpIHtcbiAgICB0cnkge1xuICAgICAgICBpZiAodHlwZW9mIHNldFRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICBpZiAodHlwZW9mIGNsZWFyVGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbiAgICB9XG59ICgpKVxuZnVuY3Rpb24gcnVuVGltZW91dChmdW4pIHtcbiAgICBpZiAoY2FjaGVkU2V0VGltZW91dCA9PT0gc2V0VGltZW91dCkge1xuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9XG4gICAgLy8gaWYgc2V0VGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZFNldFRpbWVvdXQgPT09IGRlZmF1bHRTZXRUaW1vdXQgfHwgIWNhY2hlZFNldFRpbWVvdXQpICYmIHNldFRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9IGNhdGNoKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0IHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKG51bGwsIGZ1biwgMCk7XG4gICAgICAgIH0gY2F0Y2goZSl7XG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvclxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbCh0aGlzLCBmdW4sIDApO1xuICAgICAgICB9XG4gICAgfVxuXG5cbn1cbmZ1bmN0aW9uIHJ1bkNsZWFyVGltZW91dChtYXJrZXIpIHtcbiAgICBpZiAoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9XG4gICAgLy8gaWYgY2xlYXJUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuICAgIGlmICgoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBkZWZhdWx0Q2xlYXJUaW1lb3V0IHx8ICFjYWNoZWRDbGVhclRpbWVvdXQpICYmIGNsZWFyVGltZW91dCkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfSBjYXRjaCAoZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgIHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwobnVsbCwgbWFya2VyKTtcbiAgICAgICAgfSBjYXRjaCAoZSl7XG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvci5cbiAgICAgICAgICAgIC8vIFNvbWUgdmVyc2lvbnMgb2YgSS5FLiBoYXZlIGRpZmZlcmVudCBydWxlcyBmb3IgY2xlYXJUaW1lb3V0IHZzIHNldFRpbWVvdXRcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbCh0aGlzLCBtYXJrZXIpO1xuICAgICAgICB9XG4gICAgfVxuXG5cblxufVxudmFyIHF1ZXVlID0gW107XG52YXIgZHJhaW5pbmcgPSBmYWxzZTtcbnZhciBjdXJyZW50UXVldWU7XG52YXIgcXVldWVJbmRleCA9IC0xO1xuXG5mdW5jdGlvbiBjbGVhblVwTmV4dFRpY2soKSB7XG4gICAgaWYgKCFkcmFpbmluZyB8fCAhY3VycmVudFF1ZXVlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBpZiAoY3VycmVudFF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBxdWV1ZSA9IGN1cnJlbnRRdWV1ZS5jb25jYXQocXVldWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICB9XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBkcmFpblF1ZXVlKCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBkcmFpblF1ZXVlKCkge1xuICAgIGlmIChkcmFpbmluZykge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciB0aW1lb3V0ID0gcnVuVGltZW91dChjbGVhblVwTmV4dFRpY2spO1xuICAgIGRyYWluaW5nID0gdHJ1ZTtcblxuICAgIHZhciBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgd2hpbGUobGVuKSB7XG4gICAgICAgIGN1cnJlbnRRdWV1ZSA9IHF1ZXVlO1xuICAgICAgICBxdWV1ZSA9IFtdO1xuICAgICAgICB3aGlsZSAoKytxdWV1ZUluZGV4IDwgbGVuKSB7XG4gICAgICAgICAgICBpZiAoY3VycmVudFF1ZXVlKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudFF1ZXVlW3F1ZXVlSW5kZXhdLnJ1bigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICAgICAgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIH1cbiAgICBjdXJyZW50UXVldWUgPSBudWxsO1xuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgcnVuQ2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xufVxuXG5wcm9jZXNzLm5leHRUaWNrID0gZnVuY3Rpb24gKGZ1bikge1xuICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGggLSAxKTtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGFyZ3NbaSAtIDFdID0gYXJndW1lbnRzW2ldO1xuICAgICAgICB9XG4gICAgfVxuICAgIHF1ZXVlLnB1c2gobmV3IEl0ZW0oZnVuLCBhcmdzKSk7XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCA9PT0gMSAmJiAhZHJhaW5pbmcpIHtcbiAgICAgICAgcnVuVGltZW91dChkcmFpblF1ZXVlKTtcbiAgICB9XG59O1xuXG4vLyB2OCBsaWtlcyBwcmVkaWN0aWJsZSBvYmplY3RzXG5mdW5jdGlvbiBJdGVtKGZ1biwgYXJyYXkpIHtcbiAgICB0aGlzLmZ1biA9IGZ1bjtcbiAgICB0aGlzLmFycmF5ID0gYXJyYXk7XG59XG5JdGVtLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5mdW4uYXBwbHkobnVsbCwgdGhpcy5hcnJheSk7XG59O1xucHJvY2Vzcy50aXRsZSA9ICdicm93c2VyJztcbnByb2Nlc3MuYnJvd3NlciA9IHRydWU7XG5wcm9jZXNzLmVudiA9IHt9O1xucHJvY2Vzcy5hcmd2ID0gW107XG5wcm9jZXNzLnZlcnNpb24gPSAnJzsgLy8gZW1wdHkgc3RyaW5nIHRvIGF2b2lkIHJlZ2V4cCBpc3N1ZXNcbnByb2Nlc3MudmVyc2lvbnMgPSB7fTtcblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbnByb2Nlc3Mub24gPSBub29wO1xucHJvY2Vzcy5hZGRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLm9uY2UgPSBub29wO1xucHJvY2Vzcy5vZmYgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUFsbExpc3RlbmVycyA9IG5vb3A7XG5wcm9jZXNzLmVtaXQgPSBub29wO1xuXG5wcm9jZXNzLmJpbmRpbmcgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5iaW5kaW5nIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5cbnByb2Nlc3MuY3dkID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gJy8nIH07XG5wcm9jZXNzLmNoZGlyID0gZnVuY3Rpb24gKGRpcikge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5jaGRpciBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xucHJvY2Vzcy51bWFzayA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gMDsgfTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3Byb2Nlc3MvYnJvd3Nlci5qc1xuICoqIG1vZHVsZSBpZCA9IDE3XG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAyXG4gKiovIiwidmFyIGdsb2JhbCAgICA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpXG4gICwgY29yZSAgICAgID0gcmVxdWlyZSgnLi9fY29yZScpXG4gICwgY3R4ICAgICAgID0gcmVxdWlyZSgnLi9fY3R4JylcbiAgLCBoaWRlICAgICAgPSByZXF1aXJlKCcuL19oaWRlJylcbiAgLCBQUk9UT1RZUEUgPSAncHJvdG90eXBlJztcblxudmFyICRleHBvcnQgPSBmdW5jdGlvbih0eXBlLCBuYW1lLCBzb3VyY2Upe1xuICB2YXIgSVNfRk9SQ0VEID0gdHlwZSAmICRleHBvcnQuRlxuICAgICwgSVNfR0xPQkFMID0gdHlwZSAmICRleHBvcnQuR1xuICAgICwgSVNfU1RBVElDID0gdHlwZSAmICRleHBvcnQuU1xuICAgICwgSVNfUFJPVE8gID0gdHlwZSAmICRleHBvcnQuUFxuICAgICwgSVNfQklORCAgID0gdHlwZSAmICRleHBvcnQuQlxuICAgICwgSVNfV1JBUCAgID0gdHlwZSAmICRleHBvcnQuV1xuICAgICwgZXhwb3J0cyAgID0gSVNfR0xPQkFMID8gY29yZSA6IGNvcmVbbmFtZV0gfHwgKGNvcmVbbmFtZV0gPSB7fSlcbiAgICAsIGV4cFByb3RvICA9IGV4cG9ydHNbUFJPVE9UWVBFXVxuICAgICwgdGFyZ2V0ICAgID0gSVNfR0xPQkFMID8gZ2xvYmFsIDogSVNfU1RBVElDID8gZ2xvYmFsW25hbWVdIDogKGdsb2JhbFtuYW1lXSB8fCB7fSlbUFJPVE9UWVBFXVxuICAgICwga2V5LCBvd24sIG91dDtcbiAgaWYoSVNfR0xPQkFMKXNvdXJjZSA9IG5hbWU7XG4gIGZvcihrZXkgaW4gc291cmNlKXtcbiAgICAvLyBjb250YWlucyBpbiBuYXRpdmVcbiAgICBvd24gPSAhSVNfRk9SQ0VEICYmIHRhcmdldCAmJiB0YXJnZXRba2V5XSAhPT0gdW5kZWZpbmVkO1xuICAgIGlmKG93biAmJiBrZXkgaW4gZXhwb3J0cyljb250aW51ZTtcbiAgICAvLyBleHBvcnQgbmF0aXZlIG9yIHBhc3NlZFxuICAgIG91dCA9IG93biA/IHRhcmdldFtrZXldIDogc291cmNlW2tleV07XG4gICAgLy8gcHJldmVudCBnbG9iYWwgcG9sbHV0aW9uIGZvciBuYW1lc3BhY2VzXG4gICAgZXhwb3J0c1trZXldID0gSVNfR0xPQkFMICYmIHR5cGVvZiB0YXJnZXRba2V5XSAhPSAnZnVuY3Rpb24nID8gc291cmNlW2tleV1cbiAgICAvLyBiaW5kIHRpbWVycyB0byBnbG9iYWwgZm9yIGNhbGwgZnJvbSBleHBvcnQgY29udGV4dFxuICAgIDogSVNfQklORCAmJiBvd24gPyBjdHgob3V0LCBnbG9iYWwpXG4gICAgLy8gd3JhcCBnbG9iYWwgY29uc3RydWN0b3JzIGZvciBwcmV2ZW50IGNoYW5nZSB0aGVtIGluIGxpYnJhcnlcbiAgICA6IElTX1dSQVAgJiYgdGFyZ2V0W2tleV0gPT0gb3V0ID8gKGZ1bmN0aW9uKEMpe1xuICAgICAgdmFyIEYgPSBmdW5jdGlvbihhLCBiLCBjKXtcbiAgICAgICAgaWYodGhpcyBpbnN0YW5jZW9mIEMpe1xuICAgICAgICAgIHN3aXRjaChhcmd1bWVudHMubGVuZ3RoKXtcbiAgICAgICAgICAgIGNhc2UgMDogcmV0dXJuIG5ldyBDO1xuICAgICAgICAgICAgY2FzZSAxOiByZXR1cm4gbmV3IEMoYSk7XG4gICAgICAgICAgICBjYXNlIDI6IHJldHVybiBuZXcgQyhhLCBiKTtcbiAgICAgICAgICB9IHJldHVybiBuZXcgQyhhLCBiLCBjKTtcbiAgICAgICAgfSByZXR1cm4gQy5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfTtcbiAgICAgIEZbUFJPVE9UWVBFXSA9IENbUFJPVE9UWVBFXTtcbiAgICAgIHJldHVybiBGO1xuICAgIC8vIG1ha2Ugc3RhdGljIHZlcnNpb25zIGZvciBwcm90b3R5cGUgbWV0aG9kc1xuICAgIH0pKG91dCkgOiBJU19QUk9UTyAmJiB0eXBlb2Ygb3V0ID09ICdmdW5jdGlvbicgPyBjdHgoRnVuY3Rpb24uY2FsbCwgb3V0KSA6IG91dDtcbiAgICAvLyBleHBvcnQgcHJvdG8gbWV0aG9kcyB0byBjb3JlLiVDT05TVFJVQ1RPUiUubWV0aG9kcy4lTkFNRSVcbiAgICBpZihJU19QUk9UTyl7XG4gICAgICAoZXhwb3J0cy52aXJ0dWFsIHx8IChleHBvcnRzLnZpcnR1YWwgPSB7fSkpW2tleV0gPSBvdXQ7XG4gICAgICAvLyBleHBvcnQgcHJvdG8gbWV0aG9kcyB0byBjb3JlLiVDT05TVFJVQ1RPUiUucHJvdG90eXBlLiVOQU1FJVxuICAgICAgaWYodHlwZSAmICRleHBvcnQuUiAmJiBleHBQcm90byAmJiAhZXhwUHJvdG9ba2V5XSloaWRlKGV4cFByb3RvLCBrZXksIG91dCk7XG4gICAgfVxuICB9XG59O1xuLy8gdHlwZSBiaXRtYXBcbiRleHBvcnQuRiA9IDE7ICAgLy8gZm9yY2VkXG4kZXhwb3J0LkcgPSAyOyAgIC8vIGdsb2JhbFxuJGV4cG9ydC5TID0gNDsgICAvLyBzdGF0aWNcbiRleHBvcnQuUCA9IDg7ICAgLy8gcHJvdG9cbiRleHBvcnQuQiA9IDE2OyAgLy8gYmluZFxuJGV4cG9ydC5XID0gMzI7ICAvLyB3cmFwXG4kZXhwb3J0LlUgPSA2NDsgIC8vIHNhZmVcbiRleHBvcnQuUiA9IDEyODsgLy8gcmVhbCBwcm90byBtZXRob2QgZm9yIGBsaWJyYXJ5YCBcbm1vZHVsZS5leHBvcnRzID0gJGV4cG9ydDtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZXhwb3J0LmpzXG4gKiogbW9kdWxlIGlkID0gMThcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDJcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGV4ZWMpe1xuICB0cnkge1xuICAgIHJldHVybiAhIWV4ZWMoKTtcbiAgfSBjYXRjaChlKXtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZmFpbHMuanNcbiAqKiBtb2R1bGUgaWQgPSAxOVxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDEgMlxuICoqLyIsIi8vIDE5LjEuMi4xNCAvIDE1LjIuMy4xNCBPYmplY3Qua2V5cyhPKVxudmFyICRrZXlzICAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWtleXMtaW50ZXJuYWwnKVxuICAsIGVudW1CdWdLZXlzID0gcmVxdWlyZSgnLi9fZW51bS1idWcta2V5cycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5rZXlzIHx8IGZ1bmN0aW9uIGtleXMoTyl7XG4gIHJldHVybiAka2V5cyhPLCBlbnVtQnVnS2V5cyk7XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3Qta2V5cy5qc1xuICoqIG1vZHVsZSBpZCA9IDIwXG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAyXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihiaXRtYXAsIHZhbHVlKXtcbiAgcmV0dXJuIHtcbiAgICBlbnVtZXJhYmxlICA6ICEoYml0bWFwICYgMSksXG4gICAgY29uZmlndXJhYmxlOiAhKGJpdG1hcCAmIDIpLFxuICAgIHdyaXRhYmxlICAgIDogIShiaXRtYXAgJiA0KSxcbiAgICB2YWx1ZSAgICAgICA6IHZhbHVlXG4gIH07XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19wcm9wZXJ0eS1kZXNjLmpzXG4gKiogbW9kdWxlIGlkID0gMjFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDJcbiAqKi8iLCJ2YXIgaWQgPSAwXG4gICwgcHggPSBNYXRoLnJhbmRvbSgpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihrZXkpe1xuICByZXR1cm4gJ1N5bWJvbCgnLmNvbmNhdChrZXkgPT09IHVuZGVmaW5lZCA/ICcnIDoga2V5LCAnKV8nLCAoKytpZCArIHB4KS50b1N0cmluZygzNikpO1xufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdWlkLmpzXG4gKiogbW9kdWxlIGlkID0gMjJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDJcbiAqKi8iLCJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxudmFyIF9pdGVyYXRvciA9IHJlcXVpcmUoXCIuLi9jb3JlLWpzL3N5bWJvbC9pdGVyYXRvclwiKTtcblxudmFyIF9pdGVyYXRvcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pdGVyYXRvcik7XG5cbnZhciBfc3ltYm9sID0gcmVxdWlyZShcIi4uL2NvcmUtanMvc3ltYm9sXCIpO1xuXG52YXIgX3N5bWJvbDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9zeW1ib2wpO1xuXG52YXIgX3R5cGVvZiA9IHR5cGVvZiBfc3ltYm9sMi5kZWZhdWx0ID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIF9pdGVyYXRvcjIuZGVmYXVsdCA9PT0gXCJzeW1ib2xcIiA/IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIHR5cGVvZiBvYmo7IH0gOiBmdW5jdGlvbiAob2JqKSB7IHJldHVybiBvYmogJiYgdHlwZW9mIF9zeW1ib2wyLmRlZmF1bHQgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IF9zeW1ib2wyLmRlZmF1bHQgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajsgfTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZXhwb3J0cy5kZWZhdWx0ID0gdHlwZW9mIF9zeW1ib2wyLmRlZmF1bHQgPT09IFwiZnVuY3Rpb25cIiAmJiBfdHlwZW9mKF9pdGVyYXRvcjIuZGVmYXVsdCkgPT09IFwic3ltYm9sXCIgPyBmdW5jdGlvbiAob2JqKSB7XG4gIHJldHVybiB0eXBlb2Ygb2JqID09PSBcInVuZGVmaW5lZFwiID8gXCJ1bmRlZmluZWRcIiA6IF90eXBlb2Yob2JqKTtcbn0gOiBmdW5jdGlvbiAob2JqKSB7XG4gIHJldHVybiBvYmogJiYgdHlwZW9mIF9zeW1ib2wyLmRlZmF1bHQgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IF9zeW1ib2wyLmRlZmF1bHQgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iaiA9PT0gXCJ1bmRlZmluZWRcIiA/IFwidW5kZWZpbmVkXCIgOiBfdHlwZW9mKG9iaik7XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2JhYmVsLXJ1bnRpbWUvaGVscGVycy90eXBlb2YuanNcbiAqKiBtb2R1bGUgaWQgPSAyM1xuICoqIG1vZHVsZSBjaHVua3MgPSAwIDEgMlxuICoqLyIsIi8vIDcuMi4xIFJlcXVpcmVPYmplY3RDb2VyY2libGUoYXJndW1lbnQpXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgaWYoaXQgPT0gdW5kZWZpbmVkKXRocm93IFR5cGVFcnJvcihcIkNhbid0IGNhbGwgbWV0aG9kIG9uICBcIiArIGl0KTtcbiAgcmV0dXJuIGl0O1xufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZGVmaW5lZC5qc1xuICoqIG1vZHVsZSBpZCA9IDI0XG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAyXG4gKiovIiwiLy8gSUUgOC0gZG9uJ3QgZW51bSBidWcga2V5c1xubW9kdWxlLmV4cG9ydHMgPSAoXG4gICdjb25zdHJ1Y3RvcixoYXNPd25Qcm9wZXJ0eSxpc1Byb3RvdHlwZU9mLHByb3BlcnR5SXNFbnVtZXJhYmxlLHRvTG9jYWxlU3RyaW5nLHRvU3RyaW5nLHZhbHVlT2YnXG4pLnNwbGl0KCcsJyk7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2VudW0tYnVnLWtleXMuanNcbiAqKiBtb2R1bGUgaWQgPSAyNVxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDEgMlxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0ge307XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2l0ZXJhdG9ycy5qc1xuICoqIG1vZHVsZSBpZCA9IDI2XG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAyXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSB0cnVlO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19saWJyYXJ5LmpzXG4gKiogbW9kdWxlIGlkID0gMjdcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDJcbiAqKi8iLCIvLyAxOS4xLjIuMiAvIDE1LjIuMy41IE9iamVjdC5jcmVhdGUoTyBbLCBQcm9wZXJ0aWVzXSlcbnZhciBhbk9iamVjdCAgICA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpXG4gICwgZFBzICAgICAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtZHBzJylcbiAgLCBlbnVtQnVnS2V5cyA9IHJlcXVpcmUoJy4vX2VudW0tYnVnLWtleXMnKVxuICAsIElFX1BST1RPICAgID0gcmVxdWlyZSgnLi9fc2hhcmVkLWtleScpKCdJRV9QUk9UTycpXG4gICwgRW1wdHkgICAgICAgPSBmdW5jdGlvbigpeyAvKiBlbXB0eSAqLyB9XG4gICwgUFJPVE9UWVBFICAgPSAncHJvdG90eXBlJztcblxuLy8gQ3JlYXRlIG9iamVjdCB3aXRoIGZha2UgYG51bGxgIHByb3RvdHlwZTogdXNlIGlmcmFtZSBPYmplY3Qgd2l0aCBjbGVhcmVkIHByb3RvdHlwZVxudmFyIGNyZWF0ZURpY3QgPSBmdW5jdGlvbigpe1xuICAvLyBUaHJhc2gsIHdhc3RlIGFuZCBzb2RvbXk6IElFIEdDIGJ1Z1xuICB2YXIgaWZyYW1lID0gcmVxdWlyZSgnLi9fZG9tLWNyZWF0ZScpKCdpZnJhbWUnKVxuICAgICwgaSAgICAgID0gZW51bUJ1Z0tleXMubGVuZ3RoXG4gICAgLCBsdCAgICAgPSAnPCdcbiAgICAsIGd0ICAgICA9ICc+J1xuICAgICwgaWZyYW1lRG9jdW1lbnQ7XG4gIGlmcmFtZS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICByZXF1aXJlKCcuL19odG1sJykuYXBwZW5kQ2hpbGQoaWZyYW1lKTtcbiAgaWZyYW1lLnNyYyA9ICdqYXZhc2NyaXB0Oic7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tc2NyaXB0LXVybFxuICAvLyBjcmVhdGVEaWN0ID0gaWZyYW1lLmNvbnRlbnRXaW5kb3cuT2JqZWN0O1xuICAvLyBodG1sLnJlbW92ZUNoaWxkKGlmcmFtZSk7XG4gIGlmcmFtZURvY3VtZW50ID0gaWZyYW1lLmNvbnRlbnRXaW5kb3cuZG9jdW1lbnQ7XG4gIGlmcmFtZURvY3VtZW50Lm9wZW4oKTtcbiAgaWZyYW1lRG9jdW1lbnQud3JpdGUobHQgKyAnc2NyaXB0JyArIGd0ICsgJ2RvY3VtZW50LkY9T2JqZWN0JyArIGx0ICsgJy9zY3JpcHQnICsgZ3QpO1xuICBpZnJhbWVEb2N1bWVudC5jbG9zZSgpO1xuICBjcmVhdGVEaWN0ID0gaWZyYW1lRG9jdW1lbnQuRjtcbiAgd2hpbGUoaS0tKWRlbGV0ZSBjcmVhdGVEaWN0W1BST1RPVFlQRV1bZW51bUJ1Z0tleXNbaV1dO1xuICByZXR1cm4gY3JlYXRlRGljdCgpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBPYmplY3QuY3JlYXRlIHx8IGZ1bmN0aW9uIGNyZWF0ZShPLCBQcm9wZXJ0aWVzKXtcbiAgdmFyIHJlc3VsdDtcbiAgaWYoTyAhPT0gbnVsbCl7XG4gICAgRW1wdHlbUFJPVE9UWVBFXSA9IGFuT2JqZWN0KE8pO1xuICAgIHJlc3VsdCA9IG5ldyBFbXB0eTtcbiAgICBFbXB0eVtQUk9UT1RZUEVdID0gbnVsbDtcbiAgICAvLyBhZGQgXCJfX3Byb3RvX19cIiBmb3IgT2JqZWN0LmdldFByb3RvdHlwZU9mIHBvbHlmaWxsXG4gICAgcmVzdWx0W0lFX1BST1RPXSA9IE87XG4gIH0gZWxzZSByZXN1bHQgPSBjcmVhdGVEaWN0KCk7XG4gIHJldHVybiBQcm9wZXJ0aWVzID09PSB1bmRlZmluZWQgPyByZXN1bHQgOiBkUHMocmVzdWx0LCBQcm9wZXJ0aWVzKTtcbn07XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWNyZWF0ZS5qc1xuICoqIG1vZHVsZSBpZCA9IDI4XG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAyXG4gKiovIiwiZXhwb3J0cy5mID0ge30ucHJvcGVydHlJc0VudW1lcmFibGU7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1waWUuanNcbiAqKiBtb2R1bGUgaWQgPSAyOVxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDEgMlxuICoqLyIsInZhciBkZWYgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKS5mXG4gICwgaGFzID0gcmVxdWlyZSgnLi9faGFzJylcbiAgLCBUQUcgPSByZXF1aXJlKCcuL193a3MnKSgndG9TdHJpbmdUYWcnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCwgdGFnLCBzdGF0KXtcbiAgaWYoaXQgJiYgIWhhcyhpdCA9IHN0YXQgPyBpdCA6IGl0LnByb3RvdHlwZSwgVEFHKSlkZWYoaXQsIFRBRywge2NvbmZpZ3VyYWJsZTogdHJ1ZSwgdmFsdWU6IHRhZ30pO1xufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc2V0LXRvLXN0cmluZy10YWcuanNcbiAqKiBtb2R1bGUgaWQgPSAzMFxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDEgMlxuICoqLyIsInZhciBzaGFyZWQgPSByZXF1aXJlKCcuL19zaGFyZWQnKSgna2V5cycpXG4gICwgdWlkICAgID0gcmVxdWlyZSgnLi9fdWlkJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGtleSl7XG4gIHJldHVybiBzaGFyZWRba2V5XSB8fCAoc2hhcmVkW2tleV0gPSB1aWQoa2V5KSk7XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zaGFyZWQta2V5LmpzXG4gKiogbW9kdWxlIGlkID0gMzFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDJcbiAqKi8iLCJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi9fZ2xvYmFsJylcbiAgLCBTSEFSRUQgPSAnX19jb3JlLWpzX3NoYXJlZF9fJ1xuICAsIHN0b3JlICA9IGdsb2JhbFtTSEFSRURdIHx8IChnbG9iYWxbU0hBUkVEXSA9IHt9KTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oa2V5KXtcbiAgcmV0dXJuIHN0b3JlW2tleV0gfHwgKHN0b3JlW2tleV0gPSB7fSk7XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zaGFyZWQuanNcbiAqKiBtb2R1bGUgaWQgPSAzMlxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDEgMlxuICoqLyIsIi8vIDcuMS40IFRvSW50ZWdlclxudmFyIGNlaWwgID0gTWF0aC5jZWlsXG4gICwgZmxvb3IgPSBNYXRoLmZsb29yO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiBpc05hTihpdCA9ICtpdCkgPyAwIDogKGl0ID4gMCA/IGZsb29yIDogY2VpbCkoaXQpO1xufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8taW50ZWdlci5qc1xuICoqIG1vZHVsZSBpZCA9IDMzXG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAyXG4gKiovIiwiLy8gNy4xLjEgVG9QcmltaXRpdmUoaW5wdXQgWywgUHJlZmVycmVkVHlwZV0pXG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKTtcbi8vIGluc3RlYWQgb2YgdGhlIEVTNiBzcGVjIHZlcnNpb24sIHdlIGRpZG4ndCBpbXBsZW1lbnQgQEB0b1ByaW1pdGl2ZSBjYXNlXG4vLyBhbmQgdGhlIHNlY29uZCBhcmd1bWVudCAtIGZsYWcgLSBwcmVmZXJyZWQgdHlwZSBpcyBhIHN0cmluZ1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCwgUyl7XG4gIGlmKCFpc09iamVjdChpdCkpcmV0dXJuIGl0O1xuICB2YXIgZm4sIHZhbDtcbiAgaWYoUyAmJiB0eXBlb2YgKGZuID0gaXQudG9TdHJpbmcpID09ICdmdW5jdGlvbicgJiYgIWlzT2JqZWN0KHZhbCA9IGZuLmNhbGwoaXQpKSlyZXR1cm4gdmFsO1xuICBpZih0eXBlb2YgKGZuID0gaXQudmFsdWVPZikgPT0gJ2Z1bmN0aW9uJyAmJiAhaXNPYmplY3QodmFsID0gZm4uY2FsbChpdCkpKXJldHVybiB2YWw7XG4gIGlmKCFTICYmIHR5cGVvZiAoZm4gPSBpdC50b1N0cmluZykgPT0gJ2Z1bmN0aW9uJyAmJiAhaXNPYmplY3QodmFsID0gZm4uY2FsbChpdCkpKXJldHVybiB2YWw7XG4gIHRocm93IFR5cGVFcnJvcihcIkNhbid0IGNvbnZlcnQgb2JqZWN0IHRvIHByaW1pdGl2ZSB2YWx1ZVwiKTtcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLXByaW1pdGl2ZS5qc1xuICoqIG1vZHVsZSBpZCA9IDM0XG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAyXG4gKiovIiwidmFyIGdsb2JhbCAgICAgICAgID0gcmVxdWlyZSgnLi9fZ2xvYmFsJylcbiAgLCBjb3JlICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2NvcmUnKVxuICAsIExJQlJBUlkgICAgICAgID0gcmVxdWlyZSgnLi9fbGlicmFyeScpXG4gICwgd2tzRXh0ICAgICAgICAgPSByZXF1aXJlKCcuL193a3MtZXh0JylcbiAgLCBkZWZpbmVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpLmY7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG5hbWUpe1xuICB2YXIgJFN5bWJvbCA9IGNvcmUuU3ltYm9sIHx8IChjb3JlLlN5bWJvbCA9IExJQlJBUlkgPyB7fSA6IGdsb2JhbC5TeW1ib2wgfHwge30pO1xuICBpZihuYW1lLmNoYXJBdCgwKSAhPSAnXycgJiYgIShuYW1lIGluICRTeW1ib2wpKWRlZmluZVByb3BlcnR5KCRTeW1ib2wsIG5hbWUsIHt2YWx1ZTogd2tzRXh0LmYobmFtZSl9KTtcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3drcy1kZWZpbmUuanNcbiAqKiBtb2R1bGUgaWQgPSAzNVxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDEgMlxuICoqLyIsImV4cG9ydHMuZiA9IHJlcXVpcmUoJy4vX3drcycpO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL193a3MtZXh0LmpzXG4gKiogbW9kdWxlIGlkID0gMzZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDJcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IChfX3dlYnBhY2tfcmVxdWlyZV9fKDEpKSgzNCk7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBkZWxlZ2F0ZWQgLi9ub2RlX21vZHVsZXMvaW1tdXRhYmxlL2Rpc3QvaW1tdXRhYmxlLmpzIGZyb20gZGxsLXJlZmVyZW5jZSBsaWJzX2xpYlxuICoqIG1vZHVsZSBpZCA9IDM3XG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMVxuICoqLyIsInZhciB0b1N0cmluZyA9IHt9LnRvU3RyaW5nO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwoaXQpLnNsaWNlKDgsIC0xKTtcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2NvZi5qc1xuICoqIG1vZHVsZSBpZCA9IDM4XG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAyXG4gKiovIiwiLy8gb3B0aW9uYWwgLyBzaW1wbGUgY29udGV4dCBiaW5kaW5nXG52YXIgYUZ1bmN0aW9uID0gcmVxdWlyZSgnLi9fYS1mdW5jdGlvbicpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihmbiwgdGhhdCwgbGVuZ3RoKXtcbiAgYUZ1bmN0aW9uKGZuKTtcbiAgaWYodGhhdCA9PT0gdW5kZWZpbmVkKXJldHVybiBmbjtcbiAgc3dpdGNoKGxlbmd0aCl7XG4gICAgY2FzZSAxOiByZXR1cm4gZnVuY3Rpb24oYSl7XG4gICAgICByZXR1cm4gZm4uY2FsbCh0aGF0LCBhKTtcbiAgICB9O1xuICAgIGNhc2UgMjogcmV0dXJuIGZ1bmN0aW9uKGEsIGIpe1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhhdCwgYSwgYik7XG4gICAgfTtcbiAgICBjYXNlIDM6IHJldHVybiBmdW5jdGlvbihhLCBiLCBjKXtcbiAgICAgIHJldHVybiBmbi5jYWxsKHRoYXQsIGEsIGIsIGMpO1xuICAgIH07XG4gIH1cbiAgcmV0dXJuIGZ1bmN0aW9uKC8qIC4uLmFyZ3MgKi8pe1xuICAgIHJldHVybiBmbi5hcHBseSh0aGF0LCBhcmd1bWVudHMpO1xuICB9O1xufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY3R4LmpzXG4gKiogbW9kdWxlIGlkID0gMzlcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDJcbiAqKi8iLCJ2YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKVxuICAsIGRvY3VtZW50ID0gcmVxdWlyZSgnLi9fZ2xvYmFsJykuZG9jdW1lbnRcbiAgLy8gaW4gb2xkIElFIHR5cGVvZiBkb2N1bWVudC5jcmVhdGVFbGVtZW50IGlzICdvYmplY3QnXG4gICwgaXMgPSBpc09iamVjdChkb2N1bWVudCkgJiYgaXNPYmplY3QoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIGlzID8gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChpdCkgOiB7fTtcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2RvbS1jcmVhdGUuanNcbiAqKiBtb2R1bGUgaWQgPSA0MFxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDEgMlxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gIXJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgJiYgIXJlcXVpcmUoJy4vX2ZhaWxzJykoZnVuY3Rpb24oKXtcbiAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShyZXF1aXJlKCcuL19kb20tY3JlYXRlJykoJ2RpdicpLCAnYScsIHtnZXQ6IGZ1bmN0aW9uKCl7IHJldHVybiA3OyB9fSkuYSAhPSA3O1xufSk7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2llOC1kb20tZGVmaW5lLmpzXG4gKiogbW9kdWxlIGlkID0gNDFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDJcbiAqKi8iLCIndXNlIHN0cmljdCc7XG52YXIgTElCUkFSWSAgICAgICAgPSByZXF1aXJlKCcuL19saWJyYXJ5JylcbiAgLCAkZXhwb3J0ICAgICAgICA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpXG4gICwgcmVkZWZpbmUgICAgICAgPSByZXF1aXJlKCcuL19yZWRlZmluZScpXG4gICwgaGlkZSAgICAgICAgICAgPSByZXF1aXJlKCcuL19oaWRlJylcbiAgLCBoYXMgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2hhcycpXG4gICwgSXRlcmF0b3JzICAgICAgPSByZXF1aXJlKCcuL19pdGVyYXRvcnMnKVxuICAsICRpdGVyQ3JlYXRlICAgID0gcmVxdWlyZSgnLi9faXRlci1jcmVhdGUnKVxuICAsIHNldFRvU3RyaW5nVGFnID0gcmVxdWlyZSgnLi9fc2V0LXRvLXN0cmluZy10YWcnKVxuICAsIGdldFByb3RvdHlwZU9mID0gcmVxdWlyZSgnLi9fb2JqZWN0LWdwbycpXG4gICwgSVRFUkFUT1IgICAgICAgPSByZXF1aXJlKCcuL193a3MnKSgnaXRlcmF0b3InKVxuICAsIEJVR0dZICAgICAgICAgID0gIShbXS5rZXlzICYmICduZXh0JyBpbiBbXS5rZXlzKCkpIC8vIFNhZmFyaSBoYXMgYnVnZ3kgaXRlcmF0b3JzIHcvbyBgbmV4dGBcbiAgLCBGRl9JVEVSQVRPUiAgICA9ICdAQGl0ZXJhdG9yJ1xuICAsIEtFWVMgICAgICAgICAgID0gJ2tleXMnXG4gICwgVkFMVUVTICAgICAgICAgPSAndmFsdWVzJztcblxudmFyIHJldHVyblRoaXMgPSBmdW5jdGlvbigpeyByZXR1cm4gdGhpczsgfTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihCYXNlLCBOQU1FLCBDb25zdHJ1Y3RvciwgbmV4dCwgREVGQVVMVCwgSVNfU0VULCBGT1JDRUQpe1xuICAkaXRlckNyZWF0ZShDb25zdHJ1Y3RvciwgTkFNRSwgbmV4dCk7XG4gIHZhciBnZXRNZXRob2QgPSBmdW5jdGlvbihraW5kKXtcbiAgICBpZighQlVHR1kgJiYga2luZCBpbiBwcm90bylyZXR1cm4gcHJvdG9ba2luZF07XG4gICAgc3dpdGNoKGtpbmQpe1xuICAgICAgY2FzZSBLRVlTOiByZXR1cm4gZnVuY3Rpb24ga2V5cygpeyByZXR1cm4gbmV3IENvbnN0cnVjdG9yKHRoaXMsIGtpbmQpOyB9O1xuICAgICAgY2FzZSBWQUxVRVM6IHJldHVybiBmdW5jdGlvbiB2YWx1ZXMoKXsgcmV0dXJuIG5ldyBDb25zdHJ1Y3Rvcih0aGlzLCBraW5kKTsgfTtcbiAgICB9IHJldHVybiBmdW5jdGlvbiBlbnRyaWVzKCl7IHJldHVybiBuZXcgQ29uc3RydWN0b3IodGhpcywga2luZCk7IH07XG4gIH07XG4gIHZhciBUQUcgICAgICAgID0gTkFNRSArICcgSXRlcmF0b3InXG4gICAgLCBERUZfVkFMVUVTID0gREVGQVVMVCA9PSBWQUxVRVNcbiAgICAsIFZBTFVFU19CVUcgPSBmYWxzZVxuICAgICwgcHJvdG8gICAgICA9IEJhc2UucHJvdG90eXBlXG4gICAgLCAkbmF0aXZlICAgID0gcHJvdG9bSVRFUkFUT1JdIHx8IHByb3RvW0ZGX0lURVJBVE9SXSB8fCBERUZBVUxUICYmIHByb3RvW0RFRkFVTFRdXG4gICAgLCAkZGVmYXVsdCAgID0gJG5hdGl2ZSB8fCBnZXRNZXRob2QoREVGQVVMVClcbiAgICAsICRlbnRyaWVzICAgPSBERUZBVUxUID8gIURFRl9WQUxVRVMgPyAkZGVmYXVsdCA6IGdldE1ldGhvZCgnZW50cmllcycpIDogdW5kZWZpbmVkXG4gICAgLCAkYW55TmF0aXZlID0gTkFNRSA9PSAnQXJyYXknID8gcHJvdG8uZW50cmllcyB8fCAkbmF0aXZlIDogJG5hdGl2ZVxuICAgICwgbWV0aG9kcywga2V5LCBJdGVyYXRvclByb3RvdHlwZTtcbiAgLy8gRml4IG5hdGl2ZVxuICBpZigkYW55TmF0aXZlKXtcbiAgICBJdGVyYXRvclByb3RvdHlwZSA9IGdldFByb3RvdHlwZU9mKCRhbnlOYXRpdmUuY2FsbChuZXcgQmFzZSkpO1xuICAgIGlmKEl0ZXJhdG9yUHJvdG90eXBlICE9PSBPYmplY3QucHJvdG90eXBlKXtcbiAgICAgIC8vIFNldCBAQHRvU3RyaW5nVGFnIHRvIG5hdGl2ZSBpdGVyYXRvcnNcbiAgICAgIHNldFRvU3RyaW5nVGFnKEl0ZXJhdG9yUHJvdG90eXBlLCBUQUcsIHRydWUpO1xuICAgICAgLy8gZml4IGZvciBzb21lIG9sZCBlbmdpbmVzXG4gICAgICBpZighTElCUkFSWSAmJiAhaGFzKEl0ZXJhdG9yUHJvdG90eXBlLCBJVEVSQVRPUikpaGlkZShJdGVyYXRvclByb3RvdHlwZSwgSVRFUkFUT1IsIHJldHVyblRoaXMpO1xuICAgIH1cbiAgfVxuICAvLyBmaXggQXJyYXkje3ZhbHVlcywgQEBpdGVyYXRvcn0ubmFtZSBpbiBWOCAvIEZGXG4gIGlmKERFRl9WQUxVRVMgJiYgJG5hdGl2ZSAmJiAkbmF0aXZlLm5hbWUgIT09IFZBTFVFUyl7XG4gICAgVkFMVUVTX0JVRyA9IHRydWU7XG4gICAgJGRlZmF1bHQgPSBmdW5jdGlvbiB2YWx1ZXMoKXsgcmV0dXJuICRuYXRpdmUuY2FsbCh0aGlzKTsgfTtcbiAgfVxuICAvLyBEZWZpbmUgaXRlcmF0b3JcbiAgaWYoKCFMSUJSQVJZIHx8IEZPUkNFRCkgJiYgKEJVR0dZIHx8IFZBTFVFU19CVUcgfHwgIXByb3RvW0lURVJBVE9SXSkpe1xuICAgIGhpZGUocHJvdG8sIElURVJBVE9SLCAkZGVmYXVsdCk7XG4gIH1cbiAgLy8gUGx1ZyBmb3IgbGlicmFyeVxuICBJdGVyYXRvcnNbTkFNRV0gPSAkZGVmYXVsdDtcbiAgSXRlcmF0b3JzW1RBR10gID0gcmV0dXJuVGhpcztcbiAgaWYoREVGQVVMVCl7XG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIHZhbHVlczogIERFRl9WQUxVRVMgPyAkZGVmYXVsdCA6IGdldE1ldGhvZChWQUxVRVMpLFxuICAgICAga2V5czogICAgSVNfU0VUICAgICA/ICRkZWZhdWx0IDogZ2V0TWV0aG9kKEtFWVMpLFxuICAgICAgZW50cmllczogJGVudHJpZXNcbiAgICB9O1xuICAgIGlmKEZPUkNFRClmb3Ioa2V5IGluIG1ldGhvZHMpe1xuICAgICAgaWYoIShrZXkgaW4gcHJvdG8pKXJlZGVmaW5lKHByb3RvLCBrZXksIG1ldGhvZHNba2V5XSk7XG4gICAgfSBlbHNlICRleHBvcnQoJGV4cG9ydC5QICsgJGV4cG9ydC5GICogKEJVR0dZIHx8IFZBTFVFU19CVUcpLCBOQU1FLCBtZXRob2RzKTtcbiAgfVxuICByZXR1cm4gbWV0aG9kcztcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2l0ZXItZGVmaW5lLmpzXG4gKiogbW9kdWxlIGlkID0gNDJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDJcbiAqKi8iLCJ2YXIgcElFICAgICAgICAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtcGllJylcbiAgLCBjcmVhdGVEZXNjICAgICA9IHJlcXVpcmUoJy4vX3Byb3BlcnR5LWRlc2MnKVxuICAsIHRvSU9iamVjdCAgICAgID0gcmVxdWlyZSgnLi9fdG8taW9iamVjdCcpXG4gICwgdG9QcmltaXRpdmUgICAgPSByZXF1aXJlKCcuL190by1wcmltaXRpdmUnKVxuICAsIGhhcyAgICAgICAgICAgID0gcmVxdWlyZSgnLi9faGFzJylcbiAgLCBJRThfRE9NX0RFRklORSA9IHJlcXVpcmUoJy4vX2llOC1kb20tZGVmaW5lJylcbiAgLCBnT1BEICAgICAgICAgICA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I7XG5cbmV4cG9ydHMuZiA9IHJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgPyBnT1BEIDogZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKE8sIFApe1xuICBPID0gdG9JT2JqZWN0KE8pO1xuICBQID0gdG9QcmltaXRpdmUoUCwgdHJ1ZSk7XG4gIGlmKElFOF9ET01fREVGSU5FKXRyeSB7XG4gICAgcmV0dXJuIGdPUEQoTywgUCk7XG4gIH0gY2F0Y2goZSl7IC8qIGVtcHR5ICovIH1cbiAgaWYoaGFzKE8sIFApKXJldHVybiBjcmVhdGVEZXNjKCFwSUUuZi5jYWxsKE8sIFApLCBPW1BdKTtcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1nb3BkLmpzXG4gKiogbW9kdWxlIGlkID0gNDNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDJcbiAqKi8iLCIvLyAxOS4xLjIuNyAvIDE1LjIuMy40IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKE8pXG52YXIgJGtleXMgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1rZXlzLWludGVybmFsJylcbiAgLCBoaWRkZW5LZXlzID0gcmVxdWlyZSgnLi9fZW51bS1idWcta2V5cycpLmNvbmNhdCgnbGVuZ3RoJywgJ3Byb3RvdHlwZScpO1xuXG5leHBvcnRzLmYgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyB8fCBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eU5hbWVzKE8pe1xuICByZXR1cm4gJGtleXMoTywgaGlkZGVuS2V5cyk7XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZ29wbi5qc1xuICoqIG1vZHVsZSBpZCA9IDQ0XG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAyXG4gKiovIiwiZXhwb3J0cy5mID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWdvcHMuanNcbiAqKiBtb2R1bGUgaWQgPSA0NVxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDEgMlxuICoqLyIsInZhciBoYXMgICAgICAgICAgPSByZXF1aXJlKCcuL19oYXMnKVxuICAsIHRvSU9iamVjdCAgICA9IHJlcXVpcmUoJy4vX3RvLWlvYmplY3QnKVxuICAsIGFycmF5SW5kZXhPZiA9IHJlcXVpcmUoJy4vX2FycmF5LWluY2x1ZGVzJykoZmFsc2UpXG4gICwgSUVfUFJPVE8gICAgID0gcmVxdWlyZSgnLi9fc2hhcmVkLWtleScpKCdJRV9QUk9UTycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG9iamVjdCwgbmFtZXMpe1xuICB2YXIgTyAgICAgID0gdG9JT2JqZWN0KG9iamVjdClcbiAgICAsIGkgICAgICA9IDBcbiAgICAsIHJlc3VsdCA9IFtdXG4gICAgLCBrZXk7XG4gIGZvcihrZXkgaW4gTylpZihrZXkgIT0gSUVfUFJPVE8paGFzKE8sIGtleSkgJiYgcmVzdWx0LnB1c2goa2V5KTtcbiAgLy8gRG9uJ3QgZW51bSBidWcgJiBoaWRkZW4ga2V5c1xuICB3aGlsZShuYW1lcy5sZW5ndGggPiBpKWlmKGhhcyhPLCBrZXkgPSBuYW1lc1tpKytdKSl7XG4gICAgfmFycmF5SW5kZXhPZihyZXN1bHQsIGtleSkgfHwgcmVzdWx0LnB1c2goa2V5KTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWtleXMtaW50ZXJuYWwuanNcbiAqKiBtb2R1bGUgaWQgPSA0NlxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDEgMlxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9faGlkZScpO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19yZWRlZmluZS5qc1xuICoqIG1vZHVsZSBpZCA9IDQ3XG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAyXG4gKiovIiwiLy8gQ29weXJpZ2h0IEpveWVudCwgSW5jLiBhbmQgb3RoZXIgTm9kZSBjb250cmlidXRvcnMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGFcbi8vIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGVcbi8vIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZ1xuLy8gd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLFxuLy8gZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdFxuLy8gcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlXG4vLyBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZFxuLy8gaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTU1xuLy8gT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRlxuLy8gTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTlxuLy8gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sXG4vLyBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1Jcbi8vIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEVcbi8vIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG5cbmZ1bmN0aW9uIEV2ZW50RW1pdHRlcigpIHtcbiAgdGhpcy5fZXZlbnRzID0gdGhpcy5fZXZlbnRzIHx8IHt9O1xuICB0aGlzLl9tYXhMaXN0ZW5lcnMgPSB0aGlzLl9tYXhMaXN0ZW5lcnMgfHwgdW5kZWZpbmVkO1xufVxubW9kdWxlLmV4cG9ydHMgPSBFdmVudEVtaXR0ZXI7XG5cbi8vIEJhY2t3YXJkcy1jb21wYXQgd2l0aCBub2RlIDAuMTAueFxuRXZlbnRFbWl0dGVyLkV2ZW50RW1pdHRlciA9IEV2ZW50RW1pdHRlcjtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5fZXZlbnRzID0gdW5kZWZpbmVkO1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5fbWF4TGlzdGVuZXJzID0gdW5kZWZpbmVkO1xuXG4vLyBCeSBkZWZhdWx0IEV2ZW50RW1pdHRlcnMgd2lsbCBwcmludCBhIHdhcm5pbmcgaWYgbW9yZSB0aGFuIDEwIGxpc3RlbmVycyBhcmVcbi8vIGFkZGVkIHRvIGl0LiBUaGlzIGlzIGEgdXNlZnVsIGRlZmF1bHQgd2hpY2ggaGVscHMgZmluZGluZyBtZW1vcnkgbGVha3MuXG5FdmVudEVtaXR0ZXIuZGVmYXVsdE1heExpc3RlbmVycyA9IDEwO1xuXG4vLyBPYnZpb3VzbHkgbm90IGFsbCBFbWl0dGVycyBzaG91bGQgYmUgbGltaXRlZCB0byAxMC4gVGhpcyBmdW5jdGlvbiBhbGxvd3Ncbi8vIHRoYXQgdG8gYmUgaW5jcmVhc2VkLiBTZXQgdG8gemVybyBmb3IgdW5saW1pdGVkLlxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5zZXRNYXhMaXN0ZW5lcnMgPSBmdW5jdGlvbihuKSB7XG4gIGlmICghaXNOdW1iZXIobikgfHwgbiA8IDAgfHwgaXNOYU4obikpXG4gICAgdGhyb3cgVHlwZUVycm9yKCduIG11c3QgYmUgYSBwb3NpdGl2ZSBudW1iZXInKTtcbiAgdGhpcy5fbWF4TGlzdGVuZXJzID0gbjtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmVtaXQgPSBmdW5jdGlvbih0eXBlKSB7XG4gIHZhciBlciwgaGFuZGxlciwgbGVuLCBhcmdzLCBpLCBsaXN0ZW5lcnM7XG5cbiAgaWYgKCF0aGlzLl9ldmVudHMpXG4gICAgdGhpcy5fZXZlbnRzID0ge307XG5cbiAgLy8gSWYgdGhlcmUgaXMgbm8gJ2Vycm9yJyBldmVudCBsaXN0ZW5lciB0aGVuIHRocm93LlxuICBpZiAodHlwZSA9PT0gJ2Vycm9yJykge1xuICAgIGlmICghdGhpcy5fZXZlbnRzLmVycm9yIHx8XG4gICAgICAgIChpc09iamVjdCh0aGlzLl9ldmVudHMuZXJyb3IpICYmICF0aGlzLl9ldmVudHMuZXJyb3IubGVuZ3RoKSkge1xuICAgICAgZXIgPSBhcmd1bWVudHNbMV07XG4gICAgICBpZiAoZXIgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgICB0aHJvdyBlcjsgLy8gVW5oYW5kbGVkICdlcnJvcicgZXZlbnRcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIEF0IGxlYXN0IGdpdmUgc29tZSBraW5kIG9mIGNvbnRleHQgdG8gdGhlIHVzZXJcbiAgICAgICAgdmFyIGVyciA9IG5ldyBFcnJvcignVW5jYXVnaHQsIHVuc3BlY2lmaWVkIFwiZXJyb3JcIiBldmVudC4gKCcgKyBlciArICcpJyk7XG4gICAgICAgIGVyci5jb250ZXh0ID0gZXI7XG4gICAgICAgIHRocm93IGVycjtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBoYW5kbGVyID0gdGhpcy5fZXZlbnRzW3R5cGVdO1xuXG4gIGlmIChpc1VuZGVmaW5lZChoYW5kbGVyKSlcbiAgICByZXR1cm4gZmFsc2U7XG5cbiAgaWYgKGlzRnVuY3Rpb24oaGFuZGxlcikpIHtcbiAgICBzd2l0Y2ggKGFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICAgIC8vIGZhc3QgY2FzZXNcbiAgICAgIGNhc2UgMTpcbiAgICAgICAgaGFuZGxlci5jYWxsKHRoaXMpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMjpcbiAgICAgICAgaGFuZGxlci5jYWxsKHRoaXMsIGFyZ3VtZW50c1sxXSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAzOlxuICAgICAgICBoYW5kbGVyLmNhbGwodGhpcywgYXJndW1lbnRzWzFdLCBhcmd1bWVudHNbMl0pO1xuICAgICAgICBicmVhaztcbiAgICAgIC8vIHNsb3dlclxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7XG4gICAgICAgIGhhbmRsZXIuYXBwbHkodGhpcywgYXJncyk7XG4gICAgfVxuICB9IGVsc2UgaWYgKGlzT2JqZWN0KGhhbmRsZXIpKSB7XG4gICAgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7XG4gICAgbGlzdGVuZXJzID0gaGFuZGxlci5zbGljZSgpO1xuICAgIGxlbiA9IGxpc3RlbmVycy5sZW5ndGg7XG4gICAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSsrKVxuICAgICAgbGlzdGVuZXJzW2ldLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmFkZExpc3RlbmVyID0gZnVuY3Rpb24odHlwZSwgbGlzdGVuZXIpIHtcbiAgdmFyIG07XG5cbiAgaWYgKCFpc0Z1bmN0aW9uKGxpc3RlbmVyKSlcbiAgICB0aHJvdyBUeXBlRXJyb3IoJ2xpc3RlbmVyIG11c3QgYmUgYSBmdW5jdGlvbicpO1xuXG4gIGlmICghdGhpcy5fZXZlbnRzKVxuICAgIHRoaXMuX2V2ZW50cyA9IHt9O1xuXG4gIC8vIFRvIGF2b2lkIHJlY3Vyc2lvbiBpbiB0aGUgY2FzZSB0aGF0IHR5cGUgPT09IFwibmV3TGlzdGVuZXJcIiEgQmVmb3JlXG4gIC8vIGFkZGluZyBpdCB0byB0aGUgbGlzdGVuZXJzLCBmaXJzdCBlbWl0IFwibmV3TGlzdGVuZXJcIi5cbiAgaWYgKHRoaXMuX2V2ZW50cy5uZXdMaXN0ZW5lcilcbiAgICB0aGlzLmVtaXQoJ25ld0xpc3RlbmVyJywgdHlwZSxcbiAgICAgICAgICAgICAgaXNGdW5jdGlvbihsaXN0ZW5lci5saXN0ZW5lcikgP1xuICAgICAgICAgICAgICBsaXN0ZW5lci5saXN0ZW5lciA6IGxpc3RlbmVyKTtcblxuICBpZiAoIXRoaXMuX2V2ZW50c1t0eXBlXSlcbiAgICAvLyBPcHRpbWl6ZSB0aGUgY2FzZSBvZiBvbmUgbGlzdGVuZXIuIERvbid0IG5lZWQgdGhlIGV4dHJhIGFycmF5IG9iamVjdC5cbiAgICB0aGlzLl9ldmVudHNbdHlwZV0gPSBsaXN0ZW5lcjtcbiAgZWxzZSBpZiAoaXNPYmplY3QodGhpcy5fZXZlbnRzW3R5cGVdKSlcbiAgICAvLyBJZiB3ZSd2ZSBhbHJlYWR5IGdvdCBhbiBhcnJheSwganVzdCBhcHBlbmQuXG4gICAgdGhpcy5fZXZlbnRzW3R5cGVdLnB1c2gobGlzdGVuZXIpO1xuICBlbHNlXG4gICAgLy8gQWRkaW5nIHRoZSBzZWNvbmQgZWxlbWVudCwgbmVlZCB0byBjaGFuZ2UgdG8gYXJyYXkuXG4gICAgdGhpcy5fZXZlbnRzW3R5cGVdID0gW3RoaXMuX2V2ZW50c1t0eXBlXSwgbGlzdGVuZXJdO1xuXG4gIC8vIENoZWNrIGZvciBsaXN0ZW5lciBsZWFrXG4gIGlmIChpc09iamVjdCh0aGlzLl9ldmVudHNbdHlwZV0pICYmICF0aGlzLl9ldmVudHNbdHlwZV0ud2FybmVkKSB7XG4gICAgaWYgKCFpc1VuZGVmaW5lZCh0aGlzLl9tYXhMaXN0ZW5lcnMpKSB7XG4gICAgICBtID0gdGhpcy5fbWF4TGlzdGVuZXJzO1xuICAgIH0gZWxzZSB7XG4gICAgICBtID0gRXZlbnRFbWl0dGVyLmRlZmF1bHRNYXhMaXN0ZW5lcnM7XG4gICAgfVxuXG4gICAgaWYgKG0gJiYgbSA+IDAgJiYgdGhpcy5fZXZlbnRzW3R5cGVdLmxlbmd0aCA+IG0pIHtcbiAgICAgIHRoaXMuX2V2ZW50c1t0eXBlXS53YXJuZWQgPSB0cnVlO1xuICAgICAgY29uc29sZS5lcnJvcignKG5vZGUpIHdhcm5pbmc6IHBvc3NpYmxlIEV2ZW50RW1pdHRlciBtZW1vcnkgJyArXG4gICAgICAgICAgICAgICAgICAgICdsZWFrIGRldGVjdGVkLiAlZCBsaXN0ZW5lcnMgYWRkZWQuICcgK1xuICAgICAgICAgICAgICAgICAgICAnVXNlIGVtaXR0ZXIuc2V0TWF4TGlzdGVuZXJzKCkgdG8gaW5jcmVhc2UgbGltaXQuJyxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZXZlbnRzW3R5cGVdLmxlbmd0aCk7XG4gICAgICBpZiAodHlwZW9mIGNvbnNvbGUudHJhY2UgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgLy8gbm90IHN1cHBvcnRlZCBpbiBJRSAxMFxuICAgICAgICBjb25zb2xlLnRyYWNlKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uID0gRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5hZGRMaXN0ZW5lcjtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vbmNlID0gZnVuY3Rpb24odHlwZSwgbGlzdGVuZXIpIHtcbiAgaWYgKCFpc0Z1bmN0aW9uKGxpc3RlbmVyKSlcbiAgICB0aHJvdyBUeXBlRXJyb3IoJ2xpc3RlbmVyIG11c3QgYmUgYSBmdW5jdGlvbicpO1xuXG4gIHZhciBmaXJlZCA9IGZhbHNlO1xuXG4gIGZ1bmN0aW9uIGcoKSB7XG4gICAgdGhpcy5yZW1vdmVMaXN0ZW5lcih0eXBlLCBnKTtcblxuICAgIGlmICghZmlyZWQpIHtcbiAgICAgIGZpcmVkID0gdHJ1ZTtcbiAgICAgIGxpc3RlbmVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfVxuICB9XG5cbiAgZy5saXN0ZW5lciA9IGxpc3RlbmVyO1xuICB0aGlzLm9uKHR5cGUsIGcpO1xuXG4gIHJldHVybiB0aGlzO1xufTtcblxuLy8gZW1pdHMgYSAncmVtb3ZlTGlzdGVuZXInIGV2ZW50IGlmZiB0aGUgbGlzdGVuZXIgd2FzIHJlbW92ZWRcbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucmVtb3ZlTGlzdGVuZXIgPSBmdW5jdGlvbih0eXBlLCBsaXN0ZW5lcikge1xuICB2YXIgbGlzdCwgcG9zaXRpb24sIGxlbmd0aCwgaTtcblxuICBpZiAoIWlzRnVuY3Rpb24obGlzdGVuZXIpKVxuICAgIHRocm93IFR5cGVFcnJvcignbGlzdGVuZXIgbXVzdCBiZSBhIGZ1bmN0aW9uJyk7XG5cbiAgaWYgKCF0aGlzLl9ldmVudHMgfHwgIXRoaXMuX2V2ZW50c1t0eXBlXSlcbiAgICByZXR1cm4gdGhpcztcblxuICBsaXN0ID0gdGhpcy5fZXZlbnRzW3R5cGVdO1xuICBsZW5ndGggPSBsaXN0Lmxlbmd0aDtcbiAgcG9zaXRpb24gPSAtMTtcblxuICBpZiAobGlzdCA9PT0gbGlzdGVuZXIgfHxcbiAgICAgIChpc0Z1bmN0aW9uKGxpc3QubGlzdGVuZXIpICYmIGxpc3QubGlzdGVuZXIgPT09IGxpc3RlbmVyKSkge1xuICAgIGRlbGV0ZSB0aGlzLl9ldmVudHNbdHlwZV07XG4gICAgaWYgKHRoaXMuX2V2ZW50cy5yZW1vdmVMaXN0ZW5lcilcbiAgICAgIHRoaXMuZW1pdCgncmVtb3ZlTGlzdGVuZXInLCB0eXBlLCBsaXN0ZW5lcik7XG5cbiAgfSBlbHNlIGlmIChpc09iamVjdChsaXN0KSkge1xuICAgIGZvciAoaSA9IGxlbmd0aDsgaS0tID4gMDspIHtcbiAgICAgIGlmIChsaXN0W2ldID09PSBsaXN0ZW5lciB8fFxuICAgICAgICAgIChsaXN0W2ldLmxpc3RlbmVyICYmIGxpc3RbaV0ubGlzdGVuZXIgPT09IGxpc3RlbmVyKSkge1xuICAgICAgICBwb3NpdGlvbiA9IGk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChwb3NpdGlvbiA8IDApXG4gICAgICByZXR1cm4gdGhpcztcblxuICAgIGlmIChsaXN0Lmxlbmd0aCA9PT0gMSkge1xuICAgICAgbGlzdC5sZW5ndGggPSAwO1xuICAgICAgZGVsZXRlIHRoaXMuX2V2ZW50c1t0eXBlXTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGlzdC5zcGxpY2UocG9zaXRpb24sIDEpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLl9ldmVudHMucmVtb3ZlTGlzdGVuZXIpXG4gICAgICB0aGlzLmVtaXQoJ3JlbW92ZUxpc3RlbmVyJywgdHlwZSwgbGlzdGVuZXIpO1xuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUFsbExpc3RlbmVycyA9IGZ1bmN0aW9uKHR5cGUpIHtcbiAgdmFyIGtleSwgbGlzdGVuZXJzO1xuXG4gIGlmICghdGhpcy5fZXZlbnRzKVxuICAgIHJldHVybiB0aGlzO1xuXG4gIC8vIG5vdCBsaXN0ZW5pbmcgZm9yIHJlbW92ZUxpc3RlbmVyLCBubyBuZWVkIHRvIGVtaXRcbiAgaWYgKCF0aGlzLl9ldmVudHMucmVtb3ZlTGlzdGVuZXIpIHtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMClcbiAgICAgIHRoaXMuX2V2ZW50cyA9IHt9O1xuICAgIGVsc2UgaWYgKHRoaXMuX2V2ZW50c1t0eXBlXSlcbiAgICAgIGRlbGV0ZSB0aGlzLl9ldmVudHNbdHlwZV07XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvLyBlbWl0IHJlbW92ZUxpc3RlbmVyIGZvciBhbGwgbGlzdGVuZXJzIG9uIGFsbCBldmVudHNcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApIHtcbiAgICBmb3IgKGtleSBpbiB0aGlzLl9ldmVudHMpIHtcbiAgICAgIGlmIChrZXkgPT09ICdyZW1vdmVMaXN0ZW5lcicpIGNvbnRpbnVlO1xuICAgICAgdGhpcy5yZW1vdmVBbGxMaXN0ZW5lcnMoa2V5KTtcbiAgICB9XG4gICAgdGhpcy5yZW1vdmVBbGxMaXN0ZW5lcnMoJ3JlbW92ZUxpc3RlbmVyJyk7XG4gICAgdGhpcy5fZXZlbnRzID0ge307XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBsaXN0ZW5lcnMgPSB0aGlzLl9ldmVudHNbdHlwZV07XG5cbiAgaWYgKGlzRnVuY3Rpb24obGlzdGVuZXJzKSkge1xuICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIodHlwZSwgbGlzdGVuZXJzKTtcbiAgfSBlbHNlIGlmIChsaXN0ZW5lcnMpIHtcbiAgICAvLyBMSUZPIG9yZGVyXG4gICAgd2hpbGUgKGxpc3RlbmVycy5sZW5ndGgpXG4gICAgICB0aGlzLnJlbW92ZUxpc3RlbmVyKHR5cGUsIGxpc3RlbmVyc1tsaXN0ZW5lcnMubGVuZ3RoIC0gMV0pO1xuICB9XG4gIGRlbGV0ZSB0aGlzLl9ldmVudHNbdHlwZV07XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmxpc3RlbmVycyA9IGZ1bmN0aW9uKHR5cGUpIHtcbiAgdmFyIHJldDtcbiAgaWYgKCF0aGlzLl9ldmVudHMgfHwgIXRoaXMuX2V2ZW50c1t0eXBlXSlcbiAgICByZXQgPSBbXTtcbiAgZWxzZSBpZiAoaXNGdW5jdGlvbih0aGlzLl9ldmVudHNbdHlwZV0pKVxuICAgIHJldCA9IFt0aGlzLl9ldmVudHNbdHlwZV1dO1xuICBlbHNlXG4gICAgcmV0ID0gdGhpcy5fZXZlbnRzW3R5cGVdLnNsaWNlKCk7XG4gIHJldHVybiByZXQ7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmxpc3RlbmVyQ291bnQgPSBmdW5jdGlvbih0eXBlKSB7XG4gIGlmICh0aGlzLl9ldmVudHMpIHtcbiAgICB2YXIgZXZsaXN0ZW5lciA9IHRoaXMuX2V2ZW50c1t0eXBlXTtcblxuICAgIGlmIChpc0Z1bmN0aW9uKGV2bGlzdGVuZXIpKVxuICAgICAgcmV0dXJuIDE7XG4gICAgZWxzZSBpZiAoZXZsaXN0ZW5lcilcbiAgICAgIHJldHVybiBldmxpc3RlbmVyLmxlbmd0aDtcbiAgfVxuICByZXR1cm4gMDtcbn07XG5cbkV2ZW50RW1pdHRlci5saXN0ZW5lckNvdW50ID0gZnVuY3Rpb24oZW1pdHRlciwgdHlwZSkge1xuICByZXR1cm4gZW1pdHRlci5saXN0ZW5lckNvdW50KHR5cGUpO1xufTtcblxuZnVuY3Rpb24gaXNGdW5jdGlvbihhcmcpIHtcbiAgcmV0dXJuIHR5cGVvZiBhcmcgPT09ICdmdW5jdGlvbic7XG59XG5cbmZ1bmN0aW9uIGlzTnVtYmVyKGFyZykge1xuICByZXR1cm4gdHlwZW9mIGFyZyA9PT0gJ251bWJlcic7XG59XG5cbmZ1bmN0aW9uIGlzT2JqZWN0KGFyZykge1xuICByZXR1cm4gdHlwZW9mIGFyZyA9PT0gJ29iamVjdCcgJiYgYXJnICE9PSBudWxsO1xufVxuXG5mdW5jdGlvbiBpc1VuZGVmaW5lZChhcmcpIHtcbiAgcmV0dXJuIGFyZyA9PT0gdm9pZCAwO1xufVxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vZXZlbnRzL2V2ZW50cy5qc1xuICoqIG1vZHVsZSBpZCA9IDQ4XG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAyXG4gKiovIiwidmFyIEVOVElUSUVTID0gW1snQWFjdXRlJywgWzE5M11dLCBbJ2FhY3V0ZScsIFsyMjVdXSwgWydBYnJldmUnLCBbMjU4XV0sIFsnYWJyZXZlJywgWzI1OV1dLCBbJ2FjJywgWzg3NjZdXSwgWydhY2QnLCBbODc2N11dLCBbJ2FjRScsIFs4NzY2LCA4MTldXSwgWydBY2lyYycsIFsxOTRdXSwgWydhY2lyYycsIFsyMjZdXSwgWydhY3V0ZScsIFsxODBdXSwgWydBY3knLCBbMTA0MF1dLCBbJ2FjeScsIFsxMDcyXV0sIFsnQUVsaWcnLCBbMTk4XV0sIFsnYWVsaWcnLCBbMjMwXV0sIFsnYWYnLCBbODI4OV1dLCBbJ0FmcicsIFsxMjAwNjhdXSwgWydhZnInLCBbMTIwMDk0XV0sIFsnQWdyYXZlJywgWzE5Ml1dLCBbJ2FncmF2ZScsIFsyMjRdXSwgWydhbGVmc3ltJywgWzg1MDFdXSwgWydhbGVwaCcsIFs4NTAxXV0sIFsnQWxwaGEnLCBbOTEzXV0sIFsnYWxwaGEnLCBbOTQ1XV0sIFsnQW1hY3InLCBbMjU2XV0sIFsnYW1hY3InLCBbMjU3XV0sIFsnYW1hbGcnLCBbMTA4MTVdXSwgWydhbXAnLCBbMzhdXSwgWydBTVAnLCBbMzhdXSwgWydhbmRhbmQnLCBbMTA4MzddXSwgWydBbmQnLCBbMTA4MzVdXSwgWydhbmQnLCBbODc0M11dLCBbJ2FuZGQnLCBbMTA4NDRdXSwgWydhbmRzbG9wZScsIFsxMDg0MF1dLCBbJ2FuZHYnLCBbMTA4NDJdXSwgWydhbmcnLCBbODczNl1dLCBbJ2FuZ2UnLCBbMTA2NjBdXSwgWydhbmdsZScsIFs4NzM2XV0sIFsnYW5nbXNkYWEnLCBbMTA2NjRdXSwgWydhbmdtc2RhYicsIFsxMDY2NV1dLCBbJ2FuZ21zZGFjJywgWzEwNjY2XV0sIFsnYW5nbXNkYWQnLCBbMTA2NjddXSwgWydhbmdtc2RhZScsIFsxMDY2OF1dLCBbJ2FuZ21zZGFmJywgWzEwNjY5XV0sIFsnYW5nbXNkYWcnLCBbMTA2NzBdXSwgWydhbmdtc2RhaCcsIFsxMDY3MV1dLCBbJ2FuZ21zZCcsIFs4NzM3XV0sIFsnYW5ncnQnLCBbODczNV1dLCBbJ2FuZ3J0dmInLCBbODg5NF1dLCBbJ2FuZ3J0dmJkJywgWzEwNjUzXV0sIFsnYW5nc3BoJywgWzg3MzhdXSwgWydhbmdzdCcsIFsxOTddXSwgWydhbmd6YXJyJywgWzkwODRdXSwgWydBb2dvbicsIFsyNjBdXSwgWydhb2dvbicsIFsyNjFdXSwgWydBb3BmJywgWzEyMDEyMF1dLCBbJ2FvcGYnLCBbMTIwMTQ2XV0sIFsnYXBhY2lyJywgWzEwODYzXV0sIFsnYXAnLCBbODc3Nl1dLCBbJ2FwRScsIFsxMDg2NF1dLCBbJ2FwZScsIFs4Nzc4XV0sIFsnYXBpZCcsIFs4Nzc5XV0sIFsnYXBvcycsIFszOV1dLCBbJ0FwcGx5RnVuY3Rpb24nLCBbODI4OV1dLCBbJ2FwcHJveCcsIFs4Nzc2XV0sIFsnYXBwcm94ZXEnLCBbODc3OF1dLCBbJ0FyaW5nJywgWzE5N11dLCBbJ2FyaW5nJywgWzIyOV1dLCBbJ0FzY3InLCBbMTE5OTY0XV0sIFsnYXNjcicsIFsxMTk5OTBdXSwgWydBc3NpZ24nLCBbODc4OF1dLCBbJ2FzdCcsIFs0Ml1dLCBbJ2FzeW1wJywgWzg3NzZdXSwgWydhc3ltcGVxJywgWzg3ODFdXSwgWydBdGlsZGUnLCBbMTk1XV0sIFsnYXRpbGRlJywgWzIyN11dLCBbJ0F1bWwnLCBbMTk2XV0sIFsnYXVtbCcsIFsyMjhdXSwgWydhd2NvbmludCcsIFs4NzU1XV0sIFsnYXdpbnQnLCBbMTA3NjldXSwgWydiYWNrY29uZycsIFs4NzgwXV0sIFsnYmFja2Vwc2lsb24nLCBbMTAxNF1dLCBbJ2JhY2twcmltZScsIFs4MjQ1XV0sIFsnYmFja3NpbScsIFs4NzY1XV0sIFsnYmFja3NpbWVxJywgWzg5MDldXSwgWydCYWNrc2xhc2gnLCBbODcyNl1dLCBbJ0JhcnYnLCBbMTA5ODNdXSwgWydiYXJ2ZWUnLCBbODg5M11dLCBbJ2JhcndlZCcsIFs4OTY1XV0sIFsnQmFyd2VkJywgWzg5NjZdXSwgWydiYXJ3ZWRnZScsIFs4OTY1XV0sIFsnYmJyaycsIFs5MTQxXV0sIFsnYmJya3RicmsnLCBbOTE0Ml1dLCBbJ2Jjb25nJywgWzg3ODBdXSwgWydCY3knLCBbMTA0MV1dLCBbJ2JjeScsIFsxMDczXV0sIFsnYmRxdW8nLCBbODIyMl1dLCBbJ2JlY2F1cycsIFs4NzU3XV0sIFsnYmVjYXVzZScsIFs4NzU3XV0sIFsnQmVjYXVzZScsIFs4NzU3XV0sIFsnYmVtcHR5dicsIFsxMDY3Ml1dLCBbJ2JlcHNpJywgWzEwMTRdXSwgWydiZXJub3UnLCBbODQ5Ml1dLCBbJ0Jlcm5vdWxsaXMnLCBbODQ5Ml1dLCBbJ0JldGEnLCBbOTE0XV0sIFsnYmV0YScsIFs5NDZdXSwgWydiZXRoJywgWzg1MDJdXSwgWydiZXR3ZWVuJywgWzg4MTJdXSwgWydCZnInLCBbMTIwMDY5XV0sIFsnYmZyJywgWzEyMDA5NV1dLCBbJ2JpZ2NhcCcsIFs4ODk4XV0sIFsnYmlnY2lyYycsIFs5NzExXV0sIFsnYmlnY3VwJywgWzg4OTldXSwgWydiaWdvZG90JywgWzEwNzUyXV0sIFsnYmlnb3BsdXMnLCBbMTA3NTNdXSwgWydiaWdvdGltZXMnLCBbMTA3NTRdXSwgWydiaWdzcWN1cCcsIFsxMDc1OF1dLCBbJ2JpZ3N0YXInLCBbOTczM11dLCBbJ2JpZ3RyaWFuZ2xlZG93bicsIFs5NjYxXV0sIFsnYmlndHJpYW5nbGV1cCcsIFs5NjUxXV0sIFsnYmlndXBsdXMnLCBbMTA3NTZdXSwgWydiaWd2ZWUnLCBbODg5N11dLCBbJ2JpZ3dlZGdlJywgWzg4OTZdXSwgWydia2Fyb3cnLCBbMTA1MDldXSwgWydibGFja2xvemVuZ2UnLCBbMTA3MzFdXSwgWydibGFja3NxdWFyZScsIFs5NjQyXV0sIFsnYmxhY2t0cmlhbmdsZScsIFs5NjUyXV0sIFsnYmxhY2t0cmlhbmdsZWRvd24nLCBbOTY2Ml1dLCBbJ2JsYWNrdHJpYW5nbGVsZWZ0JywgWzk2NjZdXSwgWydibGFja3RyaWFuZ2xlcmlnaHQnLCBbOTY1Nl1dLCBbJ2JsYW5rJywgWzkyNTFdXSwgWydibGsxMicsIFs5NjE4XV0sIFsnYmxrMTQnLCBbOTYxN11dLCBbJ2JsazM0JywgWzk2MTldXSwgWydibG9jaycsIFs5NjA4XV0sIFsnYm5lJywgWzYxLCA4NDIxXV0sIFsnYm5lcXVpdicsIFs4ODAxLCA4NDIxXV0sIFsnYk5vdCcsIFsxMDk4OV1dLCBbJ2Jub3QnLCBbODk3Nl1dLCBbJ0JvcGYnLCBbMTIwMTIxXV0sIFsnYm9wZicsIFsxMjAxNDddXSwgWydib3QnLCBbODg2OV1dLCBbJ2JvdHRvbScsIFs4ODY5XV0sIFsnYm93dGllJywgWzg5MDRdXSwgWydib3hib3gnLCBbMTA2OTddXSwgWydib3hkbCcsIFs5NDg4XV0sIFsnYm94ZEwnLCBbOTU1N11dLCBbJ2JveERsJywgWzk1NThdXSwgWydib3hETCcsIFs5NTU5XV0sIFsnYm94ZHInLCBbOTQ4NF1dLCBbJ2JveGRSJywgWzk1NTRdXSwgWydib3hEcicsIFs5NTU1XV0sIFsnYm94RFInLCBbOTU1Nl1dLCBbJ2JveGgnLCBbOTQ3Ml1dLCBbJ2JveEgnLCBbOTU1Ml1dLCBbJ2JveGhkJywgWzk1MTZdXSwgWydib3hIZCcsIFs5NTcyXV0sIFsnYm94aEQnLCBbOTU3M11dLCBbJ2JveEhEJywgWzk1NzRdXSwgWydib3hodScsIFs5NTI0XV0sIFsnYm94SHUnLCBbOTU3NV1dLCBbJ2JveGhVJywgWzk1NzZdXSwgWydib3hIVScsIFs5NTc3XV0sIFsnYm94bWludXMnLCBbODg2M11dLCBbJ2JveHBsdXMnLCBbODg2Ml1dLCBbJ2JveHRpbWVzJywgWzg4NjRdXSwgWydib3h1bCcsIFs5NDk2XV0sIFsnYm94dUwnLCBbOTU2M11dLCBbJ2JveFVsJywgWzk1NjRdXSwgWydib3hVTCcsIFs5NTY1XV0sIFsnYm94dXInLCBbOTQ5Ml1dLCBbJ2JveHVSJywgWzk1NjBdXSwgWydib3hVcicsIFs5NTYxXV0sIFsnYm94VVInLCBbOTU2Ml1dLCBbJ2JveHYnLCBbOTQ3NF1dLCBbJ2JveFYnLCBbOTU1M11dLCBbJ2JveHZoJywgWzk1MzJdXSwgWydib3h2SCcsIFs5NTc4XV0sIFsnYm94VmgnLCBbOTU3OV1dLCBbJ2JveFZIJywgWzk1ODBdXSwgWydib3h2bCcsIFs5NTA4XV0sIFsnYm94dkwnLCBbOTU2OV1dLCBbJ2JveFZsJywgWzk1NzBdXSwgWydib3hWTCcsIFs5NTcxXV0sIFsnYm94dnInLCBbOTUwMF1dLCBbJ2JveHZSJywgWzk1NjZdXSwgWydib3hWcicsIFs5NTY3XV0sIFsnYm94VlInLCBbOTU2OF1dLCBbJ2JwcmltZScsIFs4MjQ1XV0sIFsnYnJldmUnLCBbNzI4XV0sIFsnQnJldmUnLCBbNzI4XV0sIFsnYnJ2YmFyJywgWzE2Nl1dLCBbJ2JzY3InLCBbMTE5OTkxXV0sIFsnQnNjcicsIFs4NDkyXV0sIFsnYnNlbWknLCBbODI3MV1dLCBbJ2JzaW0nLCBbODc2NV1dLCBbJ2JzaW1lJywgWzg5MDldXSwgWydic29sYicsIFsxMDY5M11dLCBbJ2Jzb2wnLCBbOTJdXSwgWydic29saHN1YicsIFsxMDE4NF1dLCBbJ2J1bGwnLCBbODIyNl1dLCBbJ2J1bGxldCcsIFs4MjI2XV0sIFsnYnVtcCcsIFs4NzgyXV0sIFsnYnVtcEUnLCBbMTA5MjZdXSwgWydidW1wZScsIFs4NzgzXV0sIFsnQnVtcGVxJywgWzg3ODJdXSwgWydidW1wZXEnLCBbODc4M11dLCBbJ0NhY3V0ZScsIFsyNjJdXSwgWydjYWN1dGUnLCBbMjYzXV0sIFsnY2FwYW5kJywgWzEwODIwXV0sIFsnY2FwYnJjdXAnLCBbMTA4MjVdXSwgWydjYXBjYXAnLCBbMTA4MjddXSwgWydjYXAnLCBbODc0NV1dLCBbJ0NhcCcsIFs4OTE0XV0sIFsnY2FwY3VwJywgWzEwODIzXV0sIFsnY2FwZG90JywgWzEwODE2XV0sIFsnQ2FwaXRhbERpZmZlcmVudGlhbEQnLCBbODUxN11dLCBbJ2NhcHMnLCBbODc0NSwgNjUwMjRdXSwgWydjYXJldCcsIFs4MjU3XV0sIFsnY2Fyb24nLCBbNzExXV0sIFsnQ2F5bGV5cycsIFs4NDkzXV0sIFsnY2NhcHMnLCBbMTA4MjldXSwgWydDY2Fyb24nLCBbMjY4XV0sIFsnY2Nhcm9uJywgWzI2OV1dLCBbJ0NjZWRpbCcsIFsxOTldXSwgWydjY2VkaWwnLCBbMjMxXV0sIFsnQ2NpcmMnLCBbMjY0XV0sIFsnY2NpcmMnLCBbMjY1XV0sIFsnQ2NvbmludCcsIFs4NzUyXV0sIFsnY2N1cHMnLCBbMTA4MjhdXSwgWydjY3Vwc3NtJywgWzEwODMyXV0sIFsnQ2RvdCcsIFsyNjZdXSwgWydjZG90JywgWzI2N11dLCBbJ2NlZGlsJywgWzE4NF1dLCBbJ0NlZGlsbGEnLCBbMTg0XV0sIFsnY2VtcHR5dicsIFsxMDY3NF1dLCBbJ2NlbnQnLCBbMTYyXV0sIFsnY2VudGVyZG90JywgWzE4M11dLCBbJ0NlbnRlckRvdCcsIFsxODNdXSwgWydjZnInLCBbMTIwMDk2XV0sIFsnQ2ZyJywgWzg0OTNdXSwgWydDSGN5JywgWzEwNjNdXSwgWydjaGN5JywgWzEwOTVdXSwgWydjaGVjaycsIFsxMDAwM11dLCBbJ2NoZWNrbWFyaycsIFsxMDAwM11dLCBbJ0NoaScsIFs5MzVdXSwgWydjaGknLCBbOTY3XV0sIFsnY2lyYycsIFs3MTBdXSwgWydjaXJjZXEnLCBbODc5MV1dLCBbJ2NpcmNsZWFycm93bGVmdCcsIFs4NjM0XV0sIFsnY2lyY2xlYXJyb3dyaWdodCcsIFs4NjM1XV0sIFsnY2lyY2xlZGFzdCcsIFs4ODU5XV0sIFsnY2lyY2xlZGNpcmMnLCBbODg1OF1dLCBbJ2NpcmNsZWRkYXNoJywgWzg4NjFdXSwgWydDaXJjbGVEb3QnLCBbODg1N11dLCBbJ2NpcmNsZWRSJywgWzE3NF1dLCBbJ2NpcmNsZWRTJywgWzk0MTZdXSwgWydDaXJjbGVNaW51cycsIFs4ODU0XV0sIFsnQ2lyY2xlUGx1cycsIFs4ODUzXV0sIFsnQ2lyY2xlVGltZXMnLCBbODg1NV1dLCBbJ2NpcicsIFs5Njc1XV0sIFsnY2lyRScsIFsxMDY5MV1dLCBbJ2NpcmUnLCBbODc5MV1dLCBbJ2NpcmZuaW50JywgWzEwNzY4XV0sIFsnY2lybWlkJywgWzEwOTkxXV0sIFsnY2lyc2NpcicsIFsxMDY5MF1dLCBbJ0Nsb2Nrd2lzZUNvbnRvdXJJbnRlZ3JhbCcsIFs4NzU0XV0sIFsnQ2xvc2VDdXJseURvdWJsZVF1b3RlJywgWzgyMjFdXSwgWydDbG9zZUN1cmx5UXVvdGUnLCBbODIxN11dLCBbJ2NsdWJzJywgWzk4MjddXSwgWydjbHVic3VpdCcsIFs5ODI3XV0sIFsnY29sb24nLCBbNThdXSwgWydDb2xvbicsIFs4NzU5XV0sIFsnQ29sb25lJywgWzEwODY4XV0sIFsnY29sb25lJywgWzg3ODhdXSwgWydjb2xvbmVxJywgWzg3ODhdXSwgWydjb21tYScsIFs0NF1dLCBbJ2NvbW1hdCcsIFs2NF1dLCBbJ2NvbXAnLCBbODcwNV1dLCBbJ2NvbXBmbicsIFs4NzI4XV0sIFsnY29tcGxlbWVudCcsIFs4NzA1XV0sIFsnY29tcGxleGVzJywgWzg0NTBdXSwgWydjb25nJywgWzg3NzNdXSwgWydjb25nZG90JywgWzEwODYxXV0sIFsnQ29uZ3J1ZW50JywgWzg4MDFdXSwgWydjb25pbnQnLCBbODc1MF1dLCBbJ0NvbmludCcsIFs4NzUxXV0sIFsnQ29udG91ckludGVncmFsJywgWzg3NTBdXSwgWydjb3BmJywgWzEyMDE0OF1dLCBbJ0NvcGYnLCBbODQ1MF1dLCBbJ2NvcHJvZCcsIFs4NzIwXV0sIFsnQ29wcm9kdWN0JywgWzg3MjBdXSwgWydjb3B5JywgWzE2OV1dLCBbJ0NPUFknLCBbMTY5XV0sIFsnY29weXNyJywgWzg0NzFdXSwgWydDb3VudGVyQ2xvY2t3aXNlQ29udG91ckludGVncmFsJywgWzg3NTVdXSwgWydjcmFycicsIFs4NjI5XV0sIFsnY3Jvc3MnLCBbMTAwMDddXSwgWydDcm9zcycsIFsxMDc5OV1dLCBbJ0NzY3InLCBbMTE5OTY2XV0sIFsnY3NjcicsIFsxMTk5OTJdXSwgWydjc3ViJywgWzEwOTU5XV0sIFsnY3N1YmUnLCBbMTA5NjFdXSwgWydjc3VwJywgWzEwOTYwXV0sIFsnY3N1cGUnLCBbMTA5NjJdXSwgWydjdGRvdCcsIFs4OTQzXV0sIFsnY3VkYXJybCcsIFsxMDU1Ml1dLCBbJ2N1ZGFycnInLCBbMTA1NDldXSwgWydjdWVwcicsIFs4OTI2XV0sIFsnY3Vlc2MnLCBbODkyN11dLCBbJ2N1bGFycicsIFs4NjMwXV0sIFsnY3VsYXJycCcsIFsxMDU1N11dLCBbJ2N1cGJyY2FwJywgWzEwODI0XV0sIFsnY3VwY2FwJywgWzEwODIyXV0sIFsnQ3VwQ2FwJywgWzg3ODFdXSwgWydjdXAnLCBbODc0Nl1dLCBbJ0N1cCcsIFs4OTE1XV0sIFsnY3VwY3VwJywgWzEwODI2XV0sIFsnY3VwZG90JywgWzg4NDVdXSwgWydjdXBvcicsIFsxMDgyMV1dLCBbJ2N1cHMnLCBbODc0NiwgNjUwMjRdXSwgWydjdXJhcnInLCBbODYzMV1dLCBbJ2N1cmFycm0nLCBbMTA1NTZdXSwgWydjdXJseWVxcHJlYycsIFs4OTI2XV0sIFsnY3VybHllcXN1Y2MnLCBbODkyN11dLCBbJ2N1cmx5dmVlJywgWzg5MTBdXSwgWydjdXJseXdlZGdlJywgWzg5MTFdXSwgWydjdXJyZW4nLCBbMTY0XV0sIFsnY3VydmVhcnJvd2xlZnQnLCBbODYzMF1dLCBbJ2N1cnZlYXJyb3dyaWdodCcsIFs4NjMxXV0sIFsnY3V2ZWUnLCBbODkxMF1dLCBbJ2N1d2VkJywgWzg5MTFdXSwgWydjd2NvbmludCcsIFs4NzU0XV0sIFsnY3dpbnQnLCBbODc1M11dLCBbJ2N5bGN0eScsIFs5MDA1XV0sIFsnZGFnZ2VyJywgWzgyMjRdXSwgWydEYWdnZXInLCBbODIyNV1dLCBbJ2RhbGV0aCcsIFs4NTA0XV0sIFsnZGFycicsIFs4NTk1XV0sIFsnRGFycicsIFs4NjA5XV0sIFsnZEFycicsIFs4NjU5XV0sIFsnZGFzaCcsIFs4MjA4XV0sIFsnRGFzaHYnLCBbMTA5ODBdXSwgWydkYXNodicsIFs4ODY3XV0sIFsnZGJrYXJvdycsIFsxMDUxMV1dLCBbJ2RibGFjJywgWzczM11dLCBbJ0RjYXJvbicsIFsyNzBdXSwgWydkY2Fyb24nLCBbMjcxXV0sIFsnRGN5JywgWzEwNDRdXSwgWydkY3knLCBbMTA3Nl1dLCBbJ2RkYWdnZXInLCBbODIyNV1dLCBbJ2RkYXJyJywgWzg2NTBdXSwgWydERCcsIFs4NTE3XV0sIFsnZGQnLCBbODUxOF1dLCBbJ0REb3RyYWhkJywgWzEwNTEzXV0sIFsnZGRvdHNlcScsIFsxMDg3MV1dLCBbJ2RlZycsIFsxNzZdXSwgWydEZWwnLCBbODcxMV1dLCBbJ0RlbHRhJywgWzkxNl1dLCBbJ2RlbHRhJywgWzk0OF1dLCBbJ2RlbXB0eXYnLCBbMTA2NzNdXSwgWydkZmlzaHQnLCBbMTA2MjNdXSwgWydEZnInLCBbMTIwMDcxXV0sIFsnZGZyJywgWzEyMDA5N11dLCBbJ2RIYXInLCBbMTA1OTddXSwgWydkaGFybCcsIFs4NjQzXV0sIFsnZGhhcnInLCBbODY0Ml1dLCBbJ0RpYWNyaXRpY2FsQWN1dGUnLCBbMTgwXV0sIFsnRGlhY3JpdGljYWxEb3QnLCBbNzI5XV0sIFsnRGlhY3JpdGljYWxEb3VibGVBY3V0ZScsIFs3MzNdXSwgWydEaWFjcml0aWNhbEdyYXZlJywgWzk2XV0sIFsnRGlhY3JpdGljYWxUaWxkZScsIFs3MzJdXSwgWydkaWFtJywgWzg5MDBdXSwgWydkaWFtb25kJywgWzg5MDBdXSwgWydEaWFtb25kJywgWzg5MDBdXSwgWydkaWFtb25kc3VpdCcsIFs5ODMwXV0sIFsnZGlhbXMnLCBbOTgzMF1dLCBbJ2RpZScsIFsxNjhdXSwgWydEaWZmZXJlbnRpYWxEJywgWzg1MThdXSwgWydkaWdhbW1hJywgWzk4OV1dLCBbJ2Rpc2luJywgWzg5NDZdXSwgWydkaXYnLCBbMjQ3XV0sIFsnZGl2aWRlJywgWzI0N11dLCBbJ2RpdmlkZW9udGltZXMnLCBbODkwM11dLCBbJ2Rpdm9ueCcsIFs4OTAzXV0sIFsnREpjeScsIFsxMDI2XV0sIFsnZGpjeScsIFsxMTA2XV0sIFsnZGxjb3JuJywgWzg5OTBdXSwgWydkbGNyb3AnLCBbODk3M11dLCBbJ2RvbGxhcicsIFszNl1dLCBbJ0RvcGYnLCBbMTIwMTIzXV0sIFsnZG9wZicsIFsxMjAxNDldXSwgWydEb3QnLCBbMTY4XV0sIFsnZG90JywgWzcyOV1dLCBbJ0RvdERvdCcsIFs4NDEyXV0sIFsnZG90ZXEnLCBbODc4NF1dLCBbJ2RvdGVxZG90JywgWzg3ODVdXSwgWydEb3RFcXVhbCcsIFs4Nzg0XV0sIFsnZG90bWludXMnLCBbODc2MF1dLCBbJ2RvdHBsdXMnLCBbODcyNF1dLCBbJ2RvdHNxdWFyZScsIFs4ODY1XV0sIFsnZG91YmxlYmFyd2VkZ2UnLCBbODk2Nl1dLCBbJ0RvdWJsZUNvbnRvdXJJbnRlZ3JhbCcsIFs4NzUxXV0sIFsnRG91YmxlRG90JywgWzE2OF1dLCBbJ0RvdWJsZURvd25BcnJvdycsIFs4NjU5XV0sIFsnRG91YmxlTGVmdEFycm93JywgWzg2NTZdXSwgWydEb3VibGVMZWZ0UmlnaHRBcnJvdycsIFs4NjYwXV0sIFsnRG91YmxlTGVmdFRlZScsIFsxMDk4MF1dLCBbJ0RvdWJsZUxvbmdMZWZ0QXJyb3cnLCBbMTAyMzJdXSwgWydEb3VibGVMb25nTGVmdFJpZ2h0QXJyb3cnLCBbMTAyMzRdXSwgWydEb3VibGVMb25nUmlnaHRBcnJvdycsIFsxMDIzM11dLCBbJ0RvdWJsZVJpZ2h0QXJyb3cnLCBbODY1OF1dLCBbJ0RvdWJsZVJpZ2h0VGVlJywgWzg4NzJdXSwgWydEb3VibGVVcEFycm93JywgWzg2NTddXSwgWydEb3VibGVVcERvd25BcnJvdycsIFs4NjYxXV0sIFsnRG91YmxlVmVydGljYWxCYXInLCBbODc0MV1dLCBbJ0Rvd25BcnJvd0JhcicsIFsxMDUxNV1dLCBbJ2Rvd25hcnJvdycsIFs4NTk1XV0sIFsnRG93bkFycm93JywgWzg1OTVdXSwgWydEb3duYXJyb3cnLCBbODY1OV1dLCBbJ0Rvd25BcnJvd1VwQXJyb3cnLCBbODY5M11dLCBbJ0Rvd25CcmV2ZScsIFs3ODVdXSwgWydkb3duZG93bmFycm93cycsIFs4NjUwXV0sIFsnZG93bmhhcnBvb25sZWZ0JywgWzg2NDNdXSwgWydkb3duaGFycG9vbnJpZ2h0JywgWzg2NDJdXSwgWydEb3duTGVmdFJpZ2h0VmVjdG9yJywgWzEwNTc2XV0sIFsnRG93bkxlZnRUZWVWZWN0b3InLCBbMTA1OTBdXSwgWydEb3duTGVmdFZlY3RvckJhcicsIFsxMDU4Ml1dLCBbJ0Rvd25MZWZ0VmVjdG9yJywgWzg2MzddXSwgWydEb3duUmlnaHRUZWVWZWN0b3InLCBbMTA1OTFdXSwgWydEb3duUmlnaHRWZWN0b3JCYXInLCBbMTA1ODNdXSwgWydEb3duUmlnaHRWZWN0b3InLCBbODY0MV1dLCBbJ0Rvd25UZWVBcnJvdycsIFs4NjE1XV0sIFsnRG93blRlZScsIFs4ODY4XV0sIFsnZHJia2Fyb3cnLCBbMTA1MTJdXSwgWydkcmNvcm4nLCBbODk5MV1dLCBbJ2RyY3JvcCcsIFs4OTcyXV0sIFsnRHNjcicsIFsxMTk5NjddXSwgWydkc2NyJywgWzExOTk5M11dLCBbJ0RTY3knLCBbMTAyOV1dLCBbJ2RzY3knLCBbMTEwOV1dLCBbJ2Rzb2wnLCBbMTA3NDJdXSwgWydEc3Ryb2snLCBbMjcyXV0sIFsnZHN0cm9rJywgWzI3M11dLCBbJ2R0ZG90JywgWzg5NDVdXSwgWydkdHJpJywgWzk2NjNdXSwgWydkdHJpZicsIFs5NjYyXV0sIFsnZHVhcnInLCBbODY5M11dLCBbJ2R1aGFyJywgWzEwNjA3XV0sIFsnZHdhbmdsZScsIFsxMDY2Ml1dLCBbJ0RaY3knLCBbMTAzOV1dLCBbJ2R6Y3knLCBbMTExOV1dLCBbJ2R6aWdyYXJyJywgWzEwMjM5XV0sIFsnRWFjdXRlJywgWzIwMV1dLCBbJ2VhY3V0ZScsIFsyMzNdXSwgWydlYXN0ZXInLCBbMTA4NjJdXSwgWydFY2Fyb24nLCBbMjgyXV0sIFsnZWNhcm9uJywgWzI4M11dLCBbJ0VjaXJjJywgWzIwMl1dLCBbJ2VjaXJjJywgWzIzNF1dLCBbJ2VjaXInLCBbODc5MF1dLCBbJ2Vjb2xvbicsIFs4Nzg5XV0sIFsnRWN5JywgWzEwNjldXSwgWydlY3knLCBbMTEwMV1dLCBbJ2VERG90JywgWzEwODcxXV0sIFsnRWRvdCcsIFsyNzhdXSwgWydlZG90JywgWzI3OV1dLCBbJ2VEb3QnLCBbODc4NV1dLCBbJ2VlJywgWzg1MTldXSwgWydlZkRvdCcsIFs4Nzg2XV0sIFsnRWZyJywgWzEyMDA3Ml1dLCBbJ2VmcicsIFsxMjAwOThdXSwgWydlZycsIFsxMDkwNl1dLCBbJ0VncmF2ZScsIFsyMDBdXSwgWydlZ3JhdmUnLCBbMjMyXV0sIFsnZWdzJywgWzEwOTAyXV0sIFsnZWdzZG90JywgWzEwOTA0XV0sIFsnZWwnLCBbMTA5MDVdXSwgWydFbGVtZW50JywgWzg3MTJdXSwgWydlbGludGVycycsIFs5MTkxXV0sIFsnZWxsJywgWzg0NjddXSwgWydlbHMnLCBbMTA5MDFdXSwgWydlbHNkb3QnLCBbMTA5MDNdXSwgWydFbWFjcicsIFsyNzRdXSwgWydlbWFjcicsIFsyNzVdXSwgWydlbXB0eScsIFs4NzA5XV0sIFsnZW1wdHlzZXQnLCBbODcwOV1dLCBbJ0VtcHR5U21hbGxTcXVhcmUnLCBbOTcyM11dLCBbJ2VtcHR5dicsIFs4NzA5XV0sIFsnRW1wdHlWZXJ5U21hbGxTcXVhcmUnLCBbOTY0M11dLCBbJ2Vtc3AxMycsIFs4MTk2XV0sIFsnZW1zcDE0JywgWzgxOTddXSwgWydlbXNwJywgWzgxOTVdXSwgWydFTkcnLCBbMzMwXV0sIFsnZW5nJywgWzMzMV1dLCBbJ2Vuc3AnLCBbODE5NF1dLCBbJ0VvZ29uJywgWzI4MF1dLCBbJ2VvZ29uJywgWzI4MV1dLCBbJ0VvcGYnLCBbMTIwMTI0XV0sIFsnZW9wZicsIFsxMjAxNTBdXSwgWydlcGFyJywgWzg5MTddXSwgWydlcGFyc2wnLCBbMTA3MjNdXSwgWydlcGx1cycsIFsxMDg2NV1dLCBbJ2Vwc2knLCBbOTQ5XV0sIFsnRXBzaWxvbicsIFs5MTddXSwgWydlcHNpbG9uJywgWzk0OV1dLCBbJ2Vwc2l2JywgWzEwMTNdXSwgWydlcWNpcmMnLCBbODc5MF1dLCBbJ2VxY29sb24nLCBbODc4OV1dLCBbJ2Vxc2ltJywgWzg3NzBdXSwgWydlcXNsYW50Z3RyJywgWzEwOTAyXV0sIFsnZXFzbGFudGxlc3MnLCBbMTA5MDFdXSwgWydFcXVhbCcsIFsxMDg2OV1dLCBbJ2VxdWFscycsIFs2MV1dLCBbJ0VxdWFsVGlsZGUnLCBbODc3MF1dLCBbJ2VxdWVzdCcsIFs4Nzk5XV0sIFsnRXF1aWxpYnJpdW0nLCBbODY1Ml1dLCBbJ2VxdWl2JywgWzg4MDFdXSwgWydlcXVpdkREJywgWzEwODcyXV0sIFsnZXF2cGFyc2wnLCBbMTA3MjVdXSwgWydlcmFycicsIFsxMDYwOV1dLCBbJ2VyRG90JywgWzg3ODddXSwgWydlc2NyJywgWzg0OTVdXSwgWydFc2NyJywgWzg0OTZdXSwgWydlc2RvdCcsIFs4Nzg0XV0sIFsnRXNpbScsIFsxMDg2N11dLCBbJ2VzaW0nLCBbODc3MF1dLCBbJ0V0YScsIFs5MTldXSwgWydldGEnLCBbOTUxXV0sIFsnRVRIJywgWzIwOF1dLCBbJ2V0aCcsIFsyNDBdXSwgWydFdW1sJywgWzIwM11dLCBbJ2V1bWwnLCBbMjM1XV0sIFsnZXVybycsIFs4MzY0XV0sIFsnZXhjbCcsIFszM11dLCBbJ2V4aXN0JywgWzg3MDddXSwgWydFeGlzdHMnLCBbODcwN11dLCBbJ2V4cGVjdGF0aW9uJywgWzg0OTZdXSwgWydleHBvbmVudGlhbGUnLCBbODUxOV1dLCBbJ0V4cG9uZW50aWFsRScsIFs4NTE5XV0sIFsnZmFsbGluZ2RvdHNlcScsIFs4Nzg2XV0sIFsnRmN5JywgWzEwNjBdXSwgWydmY3knLCBbMTA5Ml1dLCBbJ2ZlbWFsZScsIFs5NzkyXV0sIFsnZmZpbGlnJywgWzY0MjU5XV0sIFsnZmZsaWcnLCBbNjQyNTZdXSwgWydmZmxsaWcnLCBbNjQyNjBdXSwgWydGZnInLCBbMTIwMDczXV0sIFsnZmZyJywgWzEyMDA5OV1dLCBbJ2ZpbGlnJywgWzY0MjU3XV0sIFsnRmlsbGVkU21hbGxTcXVhcmUnLCBbOTcyNF1dLCBbJ0ZpbGxlZFZlcnlTbWFsbFNxdWFyZScsIFs5NjQyXV0sIFsnZmpsaWcnLCBbMTAyLCAxMDZdXSwgWydmbGF0JywgWzk4MzddXSwgWydmbGxpZycsIFs2NDI1OF1dLCBbJ2ZsdG5zJywgWzk2NDldXSwgWydmbm9mJywgWzQwMl1dLCBbJ0ZvcGYnLCBbMTIwMTI1XV0sIFsnZm9wZicsIFsxMjAxNTFdXSwgWydmb3JhbGwnLCBbODcwNF1dLCBbJ0ZvckFsbCcsIFs4NzA0XV0sIFsnZm9yaycsIFs4OTE2XV0sIFsnZm9ya3YnLCBbMTA5NjldXSwgWydGb3VyaWVydHJmJywgWzg0OTddXSwgWydmcGFydGludCcsIFsxMDc2NV1dLCBbJ2ZyYWMxMicsIFsxODldXSwgWydmcmFjMTMnLCBbODUzMV1dLCBbJ2ZyYWMxNCcsIFsxODhdXSwgWydmcmFjMTUnLCBbODUzM11dLCBbJ2ZyYWMxNicsIFs4NTM3XV0sIFsnZnJhYzE4JywgWzg1MzldXSwgWydmcmFjMjMnLCBbODUzMl1dLCBbJ2ZyYWMyNScsIFs4NTM0XV0sIFsnZnJhYzM0JywgWzE5MF1dLCBbJ2ZyYWMzNScsIFs4NTM1XV0sIFsnZnJhYzM4JywgWzg1NDBdXSwgWydmcmFjNDUnLCBbODUzNl1dLCBbJ2ZyYWM1NicsIFs4NTM4XV0sIFsnZnJhYzU4JywgWzg1NDFdXSwgWydmcmFjNzgnLCBbODU0Ml1dLCBbJ2ZyYXNsJywgWzgyNjBdXSwgWydmcm93bicsIFs4OTk0XV0sIFsnZnNjcicsIFsxMTk5OTVdXSwgWydGc2NyJywgWzg0OTddXSwgWydnYWN1dGUnLCBbNTAxXV0sIFsnR2FtbWEnLCBbOTE1XV0sIFsnZ2FtbWEnLCBbOTQ3XV0sIFsnR2FtbWFkJywgWzk4OF1dLCBbJ2dhbW1hZCcsIFs5ODldXSwgWydnYXAnLCBbMTA4ODZdXSwgWydHYnJldmUnLCBbMjg2XV0sIFsnZ2JyZXZlJywgWzI4N11dLCBbJ0djZWRpbCcsIFsyOTBdXSwgWydHY2lyYycsIFsyODRdXSwgWydnY2lyYycsIFsyODVdXSwgWydHY3knLCBbMTA0M11dLCBbJ2djeScsIFsxMDc1XV0sIFsnR2RvdCcsIFsyODhdXSwgWydnZG90JywgWzI4OV1dLCBbJ2dlJywgWzg4MDVdXSwgWydnRScsIFs4ODA3XV0sIFsnZ0VsJywgWzEwODkyXV0sIFsnZ2VsJywgWzg5MjNdXSwgWydnZXEnLCBbODgwNV1dLCBbJ2dlcXEnLCBbODgwN11dLCBbJ2dlcXNsYW50JywgWzEwODc4XV0sIFsnZ2VzY2MnLCBbMTA5MjFdXSwgWydnZXMnLCBbMTA4NzhdXSwgWydnZXNkb3QnLCBbMTA4ODBdXSwgWydnZXNkb3RvJywgWzEwODgyXV0sIFsnZ2VzZG90b2wnLCBbMTA4ODRdXSwgWydnZXNsJywgWzg5MjMsIDY1MDI0XV0sIFsnZ2VzbGVzJywgWzEwOTAwXV0sIFsnR2ZyJywgWzEyMDA3NF1dLCBbJ2dmcicsIFsxMjAxMDBdXSwgWydnZycsIFs4ODExXV0sIFsnR2cnLCBbODkyMV1dLCBbJ2dnZycsIFs4OTIxXV0sIFsnZ2ltZWwnLCBbODUwM11dLCBbJ0dKY3knLCBbMTAyN11dLCBbJ2dqY3knLCBbMTEwN11dLCBbJ2dsYScsIFsxMDkxN11dLCBbJ2dsJywgWzg4MjNdXSwgWydnbEUnLCBbMTA4OThdXSwgWydnbGonLCBbMTA5MTZdXSwgWydnbmFwJywgWzEwODkwXV0sIFsnZ25hcHByb3gnLCBbMTA4OTBdXSwgWydnbmUnLCBbMTA4ODhdXSwgWydnbkUnLCBbODgwOV1dLCBbJ2duZXEnLCBbMTA4ODhdXSwgWydnbmVxcScsIFs4ODA5XV0sIFsnZ25zaW0nLCBbODkzNV1dLCBbJ0dvcGYnLCBbMTIwMTI2XV0sIFsnZ29wZicsIFsxMjAxNTJdXSwgWydncmF2ZScsIFs5Nl1dLCBbJ0dyZWF0ZXJFcXVhbCcsIFs4ODA1XV0sIFsnR3JlYXRlckVxdWFsTGVzcycsIFs4OTIzXV0sIFsnR3JlYXRlckZ1bGxFcXVhbCcsIFs4ODA3XV0sIFsnR3JlYXRlckdyZWF0ZXInLCBbMTA5MTRdXSwgWydHcmVhdGVyTGVzcycsIFs4ODIzXV0sIFsnR3JlYXRlclNsYW50RXF1YWwnLCBbMTA4NzhdXSwgWydHcmVhdGVyVGlsZGUnLCBbODgxOV1dLCBbJ0dzY3InLCBbMTE5OTcwXV0sIFsnZ3NjcicsIFs4NDU4XV0sIFsnZ3NpbScsIFs4ODE5XV0sIFsnZ3NpbWUnLCBbMTA4OTRdXSwgWydnc2ltbCcsIFsxMDg5Nl1dLCBbJ2d0Y2MnLCBbMTA5MTldXSwgWydndGNpcicsIFsxMDg3NF1dLCBbJ2d0JywgWzYyXV0sIFsnR1QnLCBbNjJdXSwgWydHdCcsIFs4ODExXV0sIFsnZ3Rkb3QnLCBbODkxOV1dLCBbJ2d0bFBhcicsIFsxMDY0NV1dLCBbJ2d0cXVlc3QnLCBbMTA4NzZdXSwgWydndHJhcHByb3gnLCBbMTA4ODZdXSwgWydndHJhcnInLCBbMTA2MTZdXSwgWydndHJkb3QnLCBbODkxOV1dLCBbJ2d0cmVxbGVzcycsIFs4OTIzXV0sIFsnZ3RyZXFxbGVzcycsIFsxMDg5Ml1dLCBbJ2d0cmxlc3MnLCBbODgyM11dLCBbJ2d0cnNpbScsIFs4ODE5XV0sIFsnZ3ZlcnRuZXFxJywgWzg4MDksIDY1MDI0XV0sIFsnZ3ZuRScsIFs4ODA5LCA2NTAyNF1dLCBbJ0hhY2VrJywgWzcxMV1dLCBbJ2hhaXJzcCcsIFs4MjAyXV0sIFsnaGFsZicsIFsxODldXSwgWydoYW1pbHQnLCBbODQ1OV1dLCBbJ0hBUkRjeScsIFsxMDY2XV0sIFsnaGFyZGN5JywgWzEwOThdXSwgWydoYXJyY2lyJywgWzEwNTY4XV0sIFsnaGFycicsIFs4NTk2XV0sIFsnaEFycicsIFs4NjYwXV0sIFsnaGFycncnLCBbODYyMV1dLCBbJ0hhdCcsIFs5NF1dLCBbJ2hiYXInLCBbODQ2M11dLCBbJ0hjaXJjJywgWzI5Ml1dLCBbJ2hjaXJjJywgWzI5M11dLCBbJ2hlYXJ0cycsIFs5ODI5XV0sIFsnaGVhcnRzdWl0JywgWzk4MjldXSwgWydoZWxsaXAnLCBbODIzMF1dLCBbJ2hlcmNvbicsIFs4ODg5XV0sIFsnaGZyJywgWzEyMDEwMV1dLCBbJ0hmcicsIFs4NDYwXV0sIFsnSGlsYmVydFNwYWNlJywgWzg0NTldXSwgWydoa3NlYXJvdycsIFsxMDUzM11dLCBbJ2hrc3dhcm93JywgWzEwNTM0XV0sIFsnaG9hcnInLCBbODcwM11dLCBbJ2hvbXRodCcsIFs4NzYzXV0sIFsnaG9va2xlZnRhcnJvdycsIFs4NjE3XV0sIFsnaG9va3JpZ2h0YXJyb3cnLCBbODYxOF1dLCBbJ2hvcGYnLCBbMTIwMTUzXV0sIFsnSG9wZicsIFs4NDYxXV0sIFsnaG9yYmFyJywgWzgyMTNdXSwgWydIb3Jpem9udGFsTGluZScsIFs5NDcyXV0sIFsnaHNjcicsIFsxMTk5OTddXSwgWydIc2NyJywgWzg0NTldXSwgWydoc2xhc2gnLCBbODQ2M11dLCBbJ0hzdHJvaycsIFsyOTRdXSwgWydoc3Ryb2snLCBbMjk1XV0sIFsnSHVtcERvd25IdW1wJywgWzg3ODJdXSwgWydIdW1wRXF1YWwnLCBbODc4M11dLCBbJ2h5YnVsbCcsIFs4MjU5XV0sIFsnaHlwaGVuJywgWzgyMDhdXSwgWydJYWN1dGUnLCBbMjA1XV0sIFsnaWFjdXRlJywgWzIzN11dLCBbJ2ljJywgWzgyOTFdXSwgWydJY2lyYycsIFsyMDZdXSwgWydpY2lyYycsIFsyMzhdXSwgWydJY3knLCBbMTA0OF1dLCBbJ2ljeScsIFsxMDgwXV0sIFsnSWRvdCcsIFszMDRdXSwgWydJRWN5JywgWzEwNDVdXSwgWydpZWN5JywgWzEwNzddXSwgWydpZXhjbCcsIFsxNjFdXSwgWydpZmYnLCBbODY2MF1dLCBbJ2lmcicsIFsxMjAxMDJdXSwgWydJZnInLCBbODQ2NV1dLCBbJ0lncmF2ZScsIFsyMDRdXSwgWydpZ3JhdmUnLCBbMjM2XV0sIFsnaWknLCBbODUyMF1dLCBbJ2lpaWludCcsIFsxMDc2NF1dLCBbJ2lpaW50JywgWzg3NDldXSwgWydpaW5maW4nLCBbMTA3MTZdXSwgWydpaW90YScsIFs4NDg5XV0sIFsnSUpsaWcnLCBbMzA2XV0sIFsnaWpsaWcnLCBbMzA3XV0sIFsnSW1hY3InLCBbMjk4XV0sIFsnaW1hY3InLCBbMjk5XV0sIFsnaW1hZ2UnLCBbODQ2NV1dLCBbJ0ltYWdpbmFyeUknLCBbODUyMF1dLCBbJ2ltYWdsaW5lJywgWzg0NjRdXSwgWydpbWFncGFydCcsIFs4NDY1XV0sIFsnaW1hdGgnLCBbMzA1XV0sIFsnSW0nLCBbODQ2NV1dLCBbJ2ltb2YnLCBbODg4N11dLCBbJ2ltcGVkJywgWzQzN11dLCBbJ0ltcGxpZXMnLCBbODY1OF1dLCBbJ2luY2FyZScsIFs4NDUzXV0sIFsnaW4nLCBbODcxMl1dLCBbJ2luZmluJywgWzg3MzRdXSwgWydpbmZpbnRpZScsIFsxMDcxN11dLCBbJ2lub2RvdCcsIFszMDVdXSwgWydpbnRjYWwnLCBbODg5MF1dLCBbJ2ludCcsIFs4NzQ3XV0sIFsnSW50JywgWzg3NDhdXSwgWydpbnRlZ2VycycsIFs4NDg0XV0sIFsnSW50ZWdyYWwnLCBbODc0N11dLCBbJ2ludGVyY2FsJywgWzg4OTBdXSwgWydJbnRlcnNlY3Rpb24nLCBbODg5OF1dLCBbJ2ludGxhcmhrJywgWzEwNzc1XV0sIFsnaW50cHJvZCcsIFsxMDgxMl1dLCBbJ0ludmlzaWJsZUNvbW1hJywgWzgyOTFdXSwgWydJbnZpc2libGVUaW1lcycsIFs4MjkwXV0sIFsnSU9jeScsIFsxMDI1XV0sIFsnaW9jeScsIFsxMTA1XV0sIFsnSW9nb24nLCBbMzAyXV0sIFsnaW9nb24nLCBbMzAzXV0sIFsnSW9wZicsIFsxMjAxMjhdXSwgWydpb3BmJywgWzEyMDE1NF1dLCBbJ0lvdGEnLCBbOTIxXV0sIFsnaW90YScsIFs5NTNdXSwgWydpcHJvZCcsIFsxMDgxMl1dLCBbJ2lxdWVzdCcsIFsxOTFdXSwgWydpc2NyJywgWzExOTk5OF1dLCBbJ0lzY3InLCBbODQ2NF1dLCBbJ2lzaW4nLCBbODcxMl1dLCBbJ2lzaW5kb3QnLCBbODk0OV1dLCBbJ2lzaW5FJywgWzg5NTNdXSwgWydpc2lucycsIFs4OTQ4XV0sIFsnaXNpbnN2JywgWzg5NDddXSwgWydpc2ludicsIFs4NzEyXV0sIFsnaXQnLCBbODI5MF1dLCBbJ0l0aWxkZScsIFsyOTZdXSwgWydpdGlsZGUnLCBbMjk3XV0sIFsnSXVrY3knLCBbMTAzMF1dLCBbJ2l1a2N5JywgWzExMTBdXSwgWydJdW1sJywgWzIwN11dLCBbJ2l1bWwnLCBbMjM5XV0sIFsnSmNpcmMnLCBbMzA4XV0sIFsnamNpcmMnLCBbMzA5XV0sIFsnSmN5JywgWzEwNDldXSwgWydqY3knLCBbMTA4MV1dLCBbJ0pmcicsIFsxMjAwNzddXSwgWydqZnInLCBbMTIwMTAzXV0sIFsnam1hdGgnLCBbNTY3XV0sIFsnSm9wZicsIFsxMjAxMjldXSwgWydqb3BmJywgWzEyMDE1NV1dLCBbJ0pzY3InLCBbMTE5OTczXV0sIFsnanNjcicsIFsxMTk5OTldXSwgWydKc2VyY3knLCBbMTAzMl1dLCBbJ2pzZXJjeScsIFsxMTEyXV0sIFsnSnVrY3knLCBbMTAyOF1dLCBbJ2p1a2N5JywgWzExMDhdXSwgWydLYXBwYScsIFs5MjJdXSwgWydrYXBwYScsIFs5NTRdXSwgWydrYXBwYXYnLCBbMTAwOF1dLCBbJ0tjZWRpbCcsIFszMTBdXSwgWydrY2VkaWwnLCBbMzExXV0sIFsnS2N5JywgWzEwNTBdXSwgWydrY3knLCBbMTA4Ml1dLCBbJ0tmcicsIFsxMjAwNzhdXSwgWydrZnInLCBbMTIwMTA0XV0sIFsna2dyZWVuJywgWzMxMl1dLCBbJ0tIY3knLCBbMTA2MV1dLCBbJ2toY3knLCBbMTA5M11dLCBbJ0tKY3knLCBbMTAzNl1dLCBbJ2tqY3knLCBbMTExNl1dLCBbJ0tvcGYnLCBbMTIwMTMwXV0sIFsna29wZicsIFsxMjAxNTZdXSwgWydLc2NyJywgWzExOTk3NF1dLCBbJ2tzY3InLCBbMTIwMDAwXV0sIFsnbEFhcnInLCBbODY2Nl1dLCBbJ0xhY3V0ZScsIFszMTNdXSwgWydsYWN1dGUnLCBbMzE0XV0sIFsnbGFlbXB0eXYnLCBbMTA2NzZdXSwgWydsYWdyYW4nLCBbODQ2Nl1dLCBbJ0xhbWJkYScsIFs5MjNdXSwgWydsYW1iZGEnLCBbOTU1XV0sIFsnbGFuZycsIFsxMDIxNl1dLCBbJ0xhbmcnLCBbMTAyMThdXSwgWydsYW5nZCcsIFsxMDY0MV1dLCBbJ2xhbmdsZScsIFsxMDIxNl1dLCBbJ2xhcCcsIFsxMDg4NV1dLCBbJ0xhcGxhY2V0cmYnLCBbODQ2Nl1dLCBbJ2xhcXVvJywgWzE3MV1dLCBbJ2xhcnJiJywgWzg2NzZdXSwgWydsYXJyYmZzJywgWzEwNTI3XV0sIFsnbGFycicsIFs4NTkyXV0sIFsnTGFycicsIFs4NjA2XV0sIFsnbEFycicsIFs4NjU2XV0sIFsnbGFycmZzJywgWzEwNTI1XV0sIFsnbGFycmhrJywgWzg2MTddXSwgWydsYXJybHAnLCBbODYxOV1dLCBbJ2xhcnJwbCcsIFsxMDU1M11dLCBbJ2xhcnJzaW0nLCBbMTA2MTFdXSwgWydsYXJydGwnLCBbODYxMF1dLCBbJ2xhdGFpbCcsIFsxMDUyMV1dLCBbJ2xBdGFpbCcsIFsxMDUyM11dLCBbJ2xhdCcsIFsxMDkyM11dLCBbJ2xhdGUnLCBbMTA5MjVdXSwgWydsYXRlcycsIFsxMDkyNSwgNjUwMjRdXSwgWydsYmFycicsIFsxMDUwOF1dLCBbJ2xCYXJyJywgWzEwNTEwXV0sIFsnbGJicmsnLCBbMTAwOThdXSwgWydsYnJhY2UnLCBbMTIzXV0sIFsnbGJyYWNrJywgWzkxXV0sIFsnbGJya2UnLCBbMTA2MzVdXSwgWydsYnJrc2xkJywgWzEwNjM5XV0sIFsnbGJya3NsdScsIFsxMDYzN11dLCBbJ0xjYXJvbicsIFszMTddXSwgWydsY2Fyb24nLCBbMzE4XV0sIFsnTGNlZGlsJywgWzMxNV1dLCBbJ2xjZWRpbCcsIFszMTZdXSwgWydsY2VpbCcsIFs4OTY4XV0sIFsnbGN1YicsIFsxMjNdXSwgWydMY3knLCBbMTA1MV1dLCBbJ2xjeScsIFsxMDgzXV0sIFsnbGRjYScsIFsxMDU1MF1dLCBbJ2xkcXVvJywgWzgyMjBdXSwgWydsZHF1b3InLCBbODIyMl1dLCBbJ2xkcmRoYXInLCBbMTA1OTldXSwgWydsZHJ1c2hhcicsIFsxMDU3MV1dLCBbJ2xkc2gnLCBbODYyNl1dLCBbJ2xlJywgWzg4MDRdXSwgWydsRScsIFs4ODA2XV0sIFsnTGVmdEFuZ2xlQnJhY2tldCcsIFsxMDIxNl1dLCBbJ0xlZnRBcnJvd0JhcicsIFs4Njc2XV0sIFsnbGVmdGFycm93JywgWzg1OTJdXSwgWydMZWZ0QXJyb3cnLCBbODU5Ml1dLCBbJ0xlZnRhcnJvdycsIFs4NjU2XV0sIFsnTGVmdEFycm93UmlnaHRBcnJvdycsIFs4NjQ2XV0sIFsnbGVmdGFycm93dGFpbCcsIFs4NjEwXV0sIFsnTGVmdENlaWxpbmcnLCBbODk2OF1dLCBbJ0xlZnREb3VibGVCcmFja2V0JywgWzEwMjE0XV0sIFsnTGVmdERvd25UZWVWZWN0b3InLCBbMTA1OTNdXSwgWydMZWZ0RG93blZlY3RvckJhcicsIFsxMDU4NV1dLCBbJ0xlZnREb3duVmVjdG9yJywgWzg2NDNdXSwgWydMZWZ0Rmxvb3InLCBbODk3MF1dLCBbJ2xlZnRoYXJwb29uZG93bicsIFs4NjM3XV0sIFsnbGVmdGhhcnBvb251cCcsIFs4NjM2XV0sIFsnbGVmdGxlZnRhcnJvd3MnLCBbODY0N11dLCBbJ2xlZnRyaWdodGFycm93JywgWzg1OTZdXSwgWydMZWZ0UmlnaHRBcnJvdycsIFs4NTk2XV0sIFsnTGVmdHJpZ2h0YXJyb3cnLCBbODY2MF1dLCBbJ2xlZnRyaWdodGFycm93cycsIFs4NjQ2XV0sIFsnbGVmdHJpZ2h0aGFycG9vbnMnLCBbODY1MV1dLCBbJ2xlZnRyaWdodHNxdWlnYXJyb3cnLCBbODYyMV1dLCBbJ0xlZnRSaWdodFZlY3RvcicsIFsxMDU3NF1dLCBbJ0xlZnRUZWVBcnJvdycsIFs4NjEyXV0sIFsnTGVmdFRlZScsIFs4ODY3XV0sIFsnTGVmdFRlZVZlY3RvcicsIFsxMDU4Nl1dLCBbJ2xlZnR0aHJlZXRpbWVzJywgWzg5MDddXSwgWydMZWZ0VHJpYW5nbGVCYXInLCBbMTA3MDNdXSwgWydMZWZ0VHJpYW5nbGUnLCBbODg4Ml1dLCBbJ0xlZnRUcmlhbmdsZUVxdWFsJywgWzg4ODRdXSwgWydMZWZ0VXBEb3duVmVjdG9yJywgWzEwNTc3XV0sIFsnTGVmdFVwVGVlVmVjdG9yJywgWzEwNTkyXV0sIFsnTGVmdFVwVmVjdG9yQmFyJywgWzEwNTg0XV0sIFsnTGVmdFVwVmVjdG9yJywgWzg2MzldXSwgWydMZWZ0VmVjdG9yQmFyJywgWzEwNTc4XV0sIFsnTGVmdFZlY3RvcicsIFs4NjM2XV0sIFsnbEVnJywgWzEwODkxXV0sIFsnbGVnJywgWzg5MjJdXSwgWydsZXEnLCBbODgwNF1dLCBbJ2xlcXEnLCBbODgwNl1dLCBbJ2xlcXNsYW50JywgWzEwODc3XV0sIFsnbGVzY2MnLCBbMTA5MjBdXSwgWydsZXMnLCBbMTA4NzddXSwgWydsZXNkb3QnLCBbMTA4NzldXSwgWydsZXNkb3RvJywgWzEwODgxXV0sIFsnbGVzZG90b3InLCBbMTA4ODNdXSwgWydsZXNnJywgWzg5MjIsIDY1MDI0XV0sIFsnbGVzZ2VzJywgWzEwODk5XV0sIFsnbGVzc2FwcHJveCcsIFsxMDg4NV1dLCBbJ2xlc3Nkb3QnLCBbODkxOF1dLCBbJ2xlc3NlcWd0cicsIFs4OTIyXV0sIFsnbGVzc2VxcWd0cicsIFsxMDg5MV1dLCBbJ0xlc3NFcXVhbEdyZWF0ZXInLCBbODkyMl1dLCBbJ0xlc3NGdWxsRXF1YWwnLCBbODgwNl1dLCBbJ0xlc3NHcmVhdGVyJywgWzg4MjJdXSwgWydsZXNzZ3RyJywgWzg4MjJdXSwgWydMZXNzTGVzcycsIFsxMDkxM11dLCBbJ2xlc3NzaW0nLCBbODgxOF1dLCBbJ0xlc3NTbGFudEVxdWFsJywgWzEwODc3XV0sIFsnTGVzc1RpbGRlJywgWzg4MThdXSwgWydsZmlzaHQnLCBbMTA2MjBdXSwgWydsZmxvb3InLCBbODk3MF1dLCBbJ0xmcicsIFsxMjAwNzldXSwgWydsZnInLCBbMTIwMTA1XV0sIFsnbGcnLCBbODgyMl1dLCBbJ2xnRScsIFsxMDg5N11dLCBbJ2xIYXInLCBbMTA1OTRdXSwgWydsaGFyZCcsIFs4NjM3XV0sIFsnbGhhcnUnLCBbODYzNl1dLCBbJ2xoYXJ1bCcsIFsxMDYwMl1dLCBbJ2xoYmxrJywgWzk2MDRdXSwgWydMSmN5JywgWzEwMzNdXSwgWydsamN5JywgWzExMTNdXSwgWydsbGFycicsIFs4NjQ3XV0sIFsnbGwnLCBbODgxMF1dLCBbJ0xsJywgWzg5MjBdXSwgWydsbGNvcm5lcicsIFs4OTkwXV0sIFsnTGxlZnRhcnJvdycsIFs4NjY2XV0sIFsnbGxoYXJkJywgWzEwNjAzXV0sIFsnbGx0cmknLCBbOTcyMl1dLCBbJ0xtaWRvdCcsIFszMTldXSwgWydsbWlkb3QnLCBbMzIwXV0sIFsnbG1vdXN0YWNoZScsIFs5MTM2XV0sIFsnbG1vdXN0JywgWzkxMzZdXSwgWydsbmFwJywgWzEwODg5XV0sIFsnbG5hcHByb3gnLCBbMTA4ODldXSwgWydsbmUnLCBbMTA4ODddXSwgWydsbkUnLCBbODgwOF1dLCBbJ2xuZXEnLCBbMTA4ODddXSwgWydsbmVxcScsIFs4ODA4XV0sIFsnbG5zaW0nLCBbODkzNF1dLCBbJ2xvYW5nJywgWzEwMjIwXV0sIFsnbG9hcnInLCBbODcwMV1dLCBbJ2xvYnJrJywgWzEwMjE0XV0sIFsnbG9uZ2xlZnRhcnJvdycsIFsxMDIyOV1dLCBbJ0xvbmdMZWZ0QXJyb3cnLCBbMTAyMjldXSwgWydMb25nbGVmdGFycm93JywgWzEwMjMyXV0sIFsnbG9uZ2xlZnRyaWdodGFycm93JywgWzEwMjMxXV0sIFsnTG9uZ0xlZnRSaWdodEFycm93JywgWzEwMjMxXV0sIFsnTG9uZ2xlZnRyaWdodGFycm93JywgWzEwMjM0XV0sIFsnbG9uZ21hcHN0bycsIFsxMDIzNl1dLCBbJ2xvbmdyaWdodGFycm93JywgWzEwMjMwXV0sIFsnTG9uZ1JpZ2h0QXJyb3cnLCBbMTAyMzBdXSwgWydMb25ncmlnaHRhcnJvdycsIFsxMDIzM11dLCBbJ2xvb3BhcnJvd2xlZnQnLCBbODYxOV1dLCBbJ2xvb3BhcnJvd3JpZ2h0JywgWzg2MjBdXSwgWydsb3BhcicsIFsxMDYyOV1dLCBbJ0xvcGYnLCBbMTIwMTMxXV0sIFsnbG9wZicsIFsxMjAxNTddXSwgWydsb3BsdXMnLCBbMTA3OTddXSwgWydsb3RpbWVzJywgWzEwODA0XV0sIFsnbG93YXN0JywgWzg3MjddXSwgWydsb3diYXInLCBbOTVdXSwgWydMb3dlckxlZnRBcnJvdycsIFs4NjAxXV0sIFsnTG93ZXJSaWdodEFycm93JywgWzg2MDBdXSwgWydsb3onLCBbOTY3NF1dLCBbJ2xvemVuZ2UnLCBbOTY3NF1dLCBbJ2xvemYnLCBbMTA3MzFdXSwgWydscGFyJywgWzQwXV0sIFsnbHBhcmx0JywgWzEwNjQzXV0sIFsnbHJhcnInLCBbODY0Nl1dLCBbJ2xyY29ybmVyJywgWzg5OTFdXSwgWydscmhhcicsIFs4NjUxXV0sIFsnbHJoYXJkJywgWzEwNjA1XV0sIFsnbHJtJywgWzgyMDZdXSwgWydscnRyaScsIFs4ODk1XV0sIFsnbHNhcXVvJywgWzgyNDldXSwgWydsc2NyJywgWzEyMDAwMV1dLCBbJ0xzY3InLCBbODQ2Nl1dLCBbJ2xzaCcsIFs4NjI0XV0sIFsnTHNoJywgWzg2MjRdXSwgWydsc2ltJywgWzg4MThdXSwgWydsc2ltZScsIFsxMDg5M11dLCBbJ2xzaW1nJywgWzEwODk1XV0sIFsnbHNxYicsIFs5MV1dLCBbJ2xzcXVvJywgWzgyMTZdXSwgWydsc3F1b3InLCBbODIxOF1dLCBbJ0xzdHJvaycsIFszMjFdXSwgWydsc3Ryb2snLCBbMzIyXV0sIFsnbHRjYycsIFsxMDkxOF1dLCBbJ2x0Y2lyJywgWzEwODczXV0sIFsnbHQnLCBbNjBdXSwgWydMVCcsIFs2MF1dLCBbJ0x0JywgWzg4MTBdXSwgWydsdGRvdCcsIFs4OTE4XV0sIFsnbHRocmVlJywgWzg5MDddXSwgWydsdGltZXMnLCBbODkwNV1dLCBbJ2x0bGFycicsIFsxMDYxNF1dLCBbJ2x0cXVlc3QnLCBbMTA4NzVdXSwgWydsdHJpJywgWzk2NjddXSwgWydsdHJpZScsIFs4ODg0XV0sIFsnbHRyaWYnLCBbOTY2Nl1dLCBbJ2x0clBhcicsIFsxMDY0Nl1dLCBbJ2x1cmRzaGFyJywgWzEwNTcwXV0sIFsnbHVydWhhcicsIFsxMDU5OF1dLCBbJ2x2ZXJ0bmVxcScsIFs4ODA4LCA2NTAyNF1dLCBbJ2x2bkUnLCBbODgwOCwgNjUwMjRdXSwgWydtYWNyJywgWzE3NV1dLCBbJ21hbGUnLCBbOTc5NF1dLCBbJ21hbHQnLCBbMTAwMTZdXSwgWydtYWx0ZXNlJywgWzEwMDE2XV0sIFsnTWFwJywgWzEwNTAxXV0sIFsnbWFwJywgWzg2MTRdXSwgWydtYXBzdG8nLCBbODYxNF1dLCBbJ21hcHN0b2Rvd24nLCBbODYxNV1dLCBbJ21hcHN0b2xlZnQnLCBbODYxMl1dLCBbJ21hcHN0b3VwJywgWzg2MTNdXSwgWydtYXJrZXInLCBbOTY0Nl1dLCBbJ21jb21tYScsIFsxMDc5M11dLCBbJ01jeScsIFsxMDUyXV0sIFsnbWN5JywgWzEwODRdXSwgWydtZGFzaCcsIFs4MjEyXV0sIFsnbUREb3QnLCBbODc2Ml1dLCBbJ21lYXN1cmVkYW5nbGUnLCBbODczN11dLCBbJ01lZGl1bVNwYWNlJywgWzgyODddXSwgWydNZWxsaW50cmYnLCBbODQ5OV1dLCBbJ01mcicsIFsxMjAwODBdXSwgWydtZnInLCBbMTIwMTA2XV0sIFsnbWhvJywgWzg0ODddXSwgWydtaWNybycsIFsxODFdXSwgWydtaWRhc3QnLCBbNDJdXSwgWydtaWRjaXInLCBbMTA5OTJdXSwgWydtaWQnLCBbODczOV1dLCBbJ21pZGRvdCcsIFsxODNdXSwgWydtaW51c2InLCBbODg2M11dLCBbJ21pbnVzJywgWzg3MjJdXSwgWydtaW51c2QnLCBbODc2MF1dLCBbJ21pbnVzZHUnLCBbMTA3OTRdXSwgWydNaW51c1BsdXMnLCBbODcyM11dLCBbJ21sY3AnLCBbMTA5NzFdXSwgWydtbGRyJywgWzgyMzBdXSwgWydtbnBsdXMnLCBbODcyM11dLCBbJ21vZGVscycsIFs4ODcxXV0sIFsnTW9wZicsIFsxMjAxMzJdXSwgWydtb3BmJywgWzEyMDE1OF1dLCBbJ21wJywgWzg3MjNdXSwgWydtc2NyJywgWzEyMDAwMl1dLCBbJ01zY3InLCBbODQ5OV1dLCBbJ21zdHBvcycsIFs4NzY2XV0sIFsnTXUnLCBbOTI0XV0sIFsnbXUnLCBbOTU2XV0sIFsnbXVsdGltYXAnLCBbODg4OF1dLCBbJ211bWFwJywgWzg4ODhdXSwgWyduYWJsYScsIFs4NzExXV0sIFsnTmFjdXRlJywgWzMyM11dLCBbJ25hY3V0ZScsIFszMjRdXSwgWyduYW5nJywgWzg3MzYsIDg0MDJdXSwgWyduYXAnLCBbODc3N11dLCBbJ25hcEUnLCBbMTA4NjQsIDgyNF1dLCBbJ25hcGlkJywgWzg3NzksIDgyNF1dLCBbJ25hcG9zJywgWzMyOV1dLCBbJ25hcHByb3gnLCBbODc3N11dLCBbJ25hdHVyYWwnLCBbOTgzOF1dLCBbJ25hdHVyYWxzJywgWzg0NjldXSwgWyduYXR1cicsIFs5ODM4XV0sIFsnbmJzcCcsIFsxNjBdXSwgWyduYnVtcCcsIFs4NzgyLCA4MjRdXSwgWyduYnVtcGUnLCBbODc4MywgODI0XV0sIFsnbmNhcCcsIFsxMDgxOV1dLCBbJ05jYXJvbicsIFszMjddXSwgWyduY2Fyb24nLCBbMzI4XV0sIFsnTmNlZGlsJywgWzMyNV1dLCBbJ25jZWRpbCcsIFszMjZdXSwgWyduY29uZycsIFs4Nzc1XV0sIFsnbmNvbmdkb3QnLCBbMTA4NjEsIDgyNF1dLCBbJ25jdXAnLCBbMTA4MThdXSwgWydOY3knLCBbMTA1M11dLCBbJ25jeScsIFsxMDg1XV0sIFsnbmRhc2gnLCBbODIxMV1dLCBbJ25lYXJoaycsIFsxMDUzMl1dLCBbJ25lYXJyJywgWzg1OTldXSwgWyduZUFycicsIFs4NjYzXV0sIFsnbmVhcnJvdycsIFs4NTk5XV0sIFsnbmUnLCBbODgwMF1dLCBbJ25lZG90JywgWzg3ODQsIDgyNF1dLCBbJ05lZ2F0aXZlTWVkaXVtU3BhY2UnLCBbODIwM11dLCBbJ05lZ2F0aXZlVGhpY2tTcGFjZScsIFs4MjAzXV0sIFsnTmVnYXRpdmVUaGluU3BhY2UnLCBbODIwM11dLCBbJ05lZ2F0aXZlVmVyeVRoaW5TcGFjZScsIFs4MjAzXV0sIFsnbmVxdWl2JywgWzg4MDJdXSwgWyduZXNlYXInLCBbMTA1MzZdXSwgWyduZXNpbScsIFs4NzcwLCA4MjRdXSwgWydOZXN0ZWRHcmVhdGVyR3JlYXRlcicsIFs4ODExXV0sIFsnTmVzdGVkTGVzc0xlc3MnLCBbODgxMF1dLCBbJ25leGlzdCcsIFs4NzA4XV0sIFsnbmV4aXN0cycsIFs4NzA4XV0sIFsnTmZyJywgWzEyMDA4MV1dLCBbJ25mcicsIFsxMjAxMDddXSwgWyduZ0UnLCBbODgwNywgODI0XV0sIFsnbmdlJywgWzg4MTddXSwgWyduZ2VxJywgWzg4MTddXSwgWyduZ2VxcScsIFs4ODA3LCA4MjRdXSwgWyduZ2Vxc2xhbnQnLCBbMTA4NzgsIDgyNF1dLCBbJ25nZXMnLCBbMTA4NzgsIDgyNF1dLCBbJ25HZycsIFs4OTIxLCA4MjRdXSwgWyduZ3NpbScsIFs4ODIxXV0sIFsnbkd0JywgWzg4MTEsIDg0MDJdXSwgWyduZ3QnLCBbODgxNV1dLCBbJ25ndHInLCBbODgxNV1dLCBbJ25HdHYnLCBbODgxMSwgODI0XV0sIFsnbmhhcnInLCBbODYyMl1dLCBbJ25oQXJyJywgWzg2NTRdXSwgWyduaHBhcicsIFsxMDk5NF1dLCBbJ25pJywgWzg3MTVdXSwgWyduaXMnLCBbODk1Nl1dLCBbJ25pc2QnLCBbODk1NF1dLCBbJ25pdicsIFs4NzE1XV0sIFsnTkpjeScsIFsxMDM0XV0sIFsnbmpjeScsIFsxMTE0XV0sIFsnbmxhcnInLCBbODYwMl1dLCBbJ25sQXJyJywgWzg2NTNdXSwgWydubGRyJywgWzgyMjldXSwgWydubEUnLCBbODgwNiwgODI0XV0sIFsnbmxlJywgWzg4MTZdXSwgWydubGVmdGFycm93JywgWzg2MDJdXSwgWyduTGVmdGFycm93JywgWzg2NTNdXSwgWydubGVmdHJpZ2h0YXJyb3cnLCBbODYyMl1dLCBbJ25MZWZ0cmlnaHRhcnJvdycsIFs4NjU0XV0sIFsnbmxlcScsIFs4ODE2XV0sIFsnbmxlcXEnLCBbODgwNiwgODI0XV0sIFsnbmxlcXNsYW50JywgWzEwODc3LCA4MjRdXSwgWydubGVzJywgWzEwODc3LCA4MjRdXSwgWydubGVzcycsIFs4ODE0XV0sIFsnbkxsJywgWzg5MjAsIDgyNF1dLCBbJ25sc2ltJywgWzg4MjBdXSwgWyduTHQnLCBbODgxMCwgODQwMl1dLCBbJ25sdCcsIFs4ODE0XV0sIFsnbmx0cmknLCBbODkzOF1dLCBbJ25sdHJpZScsIFs4OTQwXV0sIFsnbkx0dicsIFs4ODEwLCA4MjRdXSwgWydubWlkJywgWzg3NDBdXSwgWydOb0JyZWFrJywgWzgyODhdXSwgWydOb25CcmVha2luZ1NwYWNlJywgWzE2MF1dLCBbJ25vcGYnLCBbMTIwMTU5XV0sIFsnTm9wZicsIFs4NDY5XV0sIFsnTm90JywgWzEwOTg4XV0sIFsnbm90JywgWzE3Ml1dLCBbJ05vdENvbmdydWVudCcsIFs4ODAyXV0sIFsnTm90Q3VwQ2FwJywgWzg4MTNdXSwgWydOb3REb3VibGVWZXJ0aWNhbEJhcicsIFs4NzQyXV0sIFsnTm90RWxlbWVudCcsIFs4NzEzXV0sIFsnTm90RXF1YWwnLCBbODgwMF1dLCBbJ05vdEVxdWFsVGlsZGUnLCBbODc3MCwgODI0XV0sIFsnTm90RXhpc3RzJywgWzg3MDhdXSwgWydOb3RHcmVhdGVyJywgWzg4MTVdXSwgWydOb3RHcmVhdGVyRXF1YWwnLCBbODgxN11dLCBbJ05vdEdyZWF0ZXJGdWxsRXF1YWwnLCBbODgwNywgODI0XV0sIFsnTm90R3JlYXRlckdyZWF0ZXInLCBbODgxMSwgODI0XV0sIFsnTm90R3JlYXRlckxlc3MnLCBbODgyNV1dLCBbJ05vdEdyZWF0ZXJTbGFudEVxdWFsJywgWzEwODc4LCA4MjRdXSwgWydOb3RHcmVhdGVyVGlsZGUnLCBbODgyMV1dLCBbJ05vdEh1bXBEb3duSHVtcCcsIFs4NzgyLCA4MjRdXSwgWydOb3RIdW1wRXF1YWwnLCBbODc4MywgODI0XV0sIFsnbm90aW4nLCBbODcxM11dLCBbJ25vdGluZG90JywgWzg5NDksIDgyNF1dLCBbJ25vdGluRScsIFs4OTUzLCA4MjRdXSwgWydub3RpbnZhJywgWzg3MTNdXSwgWydub3RpbnZiJywgWzg5NTFdXSwgWydub3RpbnZjJywgWzg5NTBdXSwgWydOb3RMZWZ0VHJpYW5nbGVCYXInLCBbMTA3MDMsIDgyNF1dLCBbJ05vdExlZnRUcmlhbmdsZScsIFs4OTM4XV0sIFsnTm90TGVmdFRyaWFuZ2xlRXF1YWwnLCBbODk0MF1dLCBbJ05vdExlc3MnLCBbODgxNF1dLCBbJ05vdExlc3NFcXVhbCcsIFs4ODE2XV0sIFsnTm90TGVzc0dyZWF0ZXInLCBbODgyNF1dLCBbJ05vdExlc3NMZXNzJywgWzg4MTAsIDgyNF1dLCBbJ05vdExlc3NTbGFudEVxdWFsJywgWzEwODc3LCA4MjRdXSwgWydOb3RMZXNzVGlsZGUnLCBbODgyMF1dLCBbJ05vdE5lc3RlZEdyZWF0ZXJHcmVhdGVyJywgWzEwOTE0LCA4MjRdXSwgWydOb3ROZXN0ZWRMZXNzTGVzcycsIFsxMDkxMywgODI0XV0sIFsnbm90bmknLCBbODcxNl1dLCBbJ25vdG5pdmEnLCBbODcxNl1dLCBbJ25vdG5pdmInLCBbODk1OF1dLCBbJ25vdG5pdmMnLCBbODk1N11dLCBbJ05vdFByZWNlZGVzJywgWzg4MzJdXSwgWydOb3RQcmVjZWRlc0VxdWFsJywgWzEwOTI3LCA4MjRdXSwgWydOb3RQcmVjZWRlc1NsYW50RXF1YWwnLCBbODkyOF1dLCBbJ05vdFJldmVyc2VFbGVtZW50JywgWzg3MTZdXSwgWydOb3RSaWdodFRyaWFuZ2xlQmFyJywgWzEwNzA0LCA4MjRdXSwgWydOb3RSaWdodFRyaWFuZ2xlJywgWzg5MzldXSwgWydOb3RSaWdodFRyaWFuZ2xlRXF1YWwnLCBbODk0MV1dLCBbJ05vdFNxdWFyZVN1YnNldCcsIFs4ODQ3LCA4MjRdXSwgWydOb3RTcXVhcmVTdWJzZXRFcXVhbCcsIFs4OTMwXV0sIFsnTm90U3F1YXJlU3VwZXJzZXQnLCBbODg0OCwgODI0XV0sIFsnTm90U3F1YXJlU3VwZXJzZXRFcXVhbCcsIFs4OTMxXV0sIFsnTm90U3Vic2V0JywgWzg4MzQsIDg0MDJdXSwgWydOb3RTdWJzZXRFcXVhbCcsIFs4ODQwXV0sIFsnTm90U3VjY2VlZHMnLCBbODgzM11dLCBbJ05vdFN1Y2NlZWRzRXF1YWwnLCBbMTA5MjgsIDgyNF1dLCBbJ05vdFN1Y2NlZWRzU2xhbnRFcXVhbCcsIFs4OTI5XV0sIFsnTm90U3VjY2VlZHNUaWxkZScsIFs4ODMxLCA4MjRdXSwgWydOb3RTdXBlcnNldCcsIFs4ODM1LCA4NDAyXV0sIFsnTm90U3VwZXJzZXRFcXVhbCcsIFs4ODQxXV0sIFsnTm90VGlsZGUnLCBbODc2OV1dLCBbJ05vdFRpbGRlRXF1YWwnLCBbODc3Ml1dLCBbJ05vdFRpbGRlRnVsbEVxdWFsJywgWzg3NzVdXSwgWydOb3RUaWxkZVRpbGRlJywgWzg3NzddXSwgWydOb3RWZXJ0aWNhbEJhcicsIFs4NzQwXV0sIFsnbnBhcmFsbGVsJywgWzg3NDJdXSwgWyducGFyJywgWzg3NDJdXSwgWyducGFyc2wnLCBbMTEwMDUsIDg0MjFdXSwgWyducGFydCcsIFs4NzA2LCA4MjRdXSwgWyducG9saW50JywgWzEwNzcyXV0sIFsnbnByJywgWzg4MzJdXSwgWyducHJjdWUnLCBbODkyOF1dLCBbJ25wcmVjJywgWzg4MzJdXSwgWyducHJlY2VxJywgWzEwOTI3LCA4MjRdXSwgWyducHJlJywgWzEwOTI3LCA4MjRdXSwgWyducmFycmMnLCBbMTA1NDcsIDgyNF1dLCBbJ25yYXJyJywgWzg2MDNdXSwgWyduckFycicsIFs4NjU1XV0sIFsnbnJhcnJ3JywgWzg2MDUsIDgyNF1dLCBbJ25yaWdodGFycm93JywgWzg2MDNdXSwgWyduUmlnaHRhcnJvdycsIFs4NjU1XV0sIFsnbnJ0cmknLCBbODkzOV1dLCBbJ25ydHJpZScsIFs4OTQxXV0sIFsnbnNjJywgWzg4MzNdXSwgWyduc2NjdWUnLCBbODkyOV1dLCBbJ25zY2UnLCBbMTA5MjgsIDgyNF1dLCBbJ05zY3InLCBbMTE5OTc3XV0sIFsnbnNjcicsIFsxMjAwMDNdXSwgWyduc2hvcnRtaWQnLCBbODc0MF1dLCBbJ25zaG9ydHBhcmFsbGVsJywgWzg3NDJdXSwgWyduc2ltJywgWzg3NjldXSwgWyduc2ltZScsIFs4NzcyXV0sIFsnbnNpbWVxJywgWzg3NzJdXSwgWyduc21pZCcsIFs4NzQwXV0sIFsnbnNwYXInLCBbODc0Ml1dLCBbJ25zcXN1YmUnLCBbODkzMF1dLCBbJ25zcXN1cGUnLCBbODkzMV1dLCBbJ25zdWInLCBbODgzNl1dLCBbJ25zdWJFJywgWzEwOTQ5LCA4MjRdXSwgWyduc3ViZScsIFs4ODQwXV0sIFsnbnN1YnNldCcsIFs4ODM0LCA4NDAyXV0sIFsnbnN1YnNldGVxJywgWzg4NDBdXSwgWyduc3Vic2V0ZXFxJywgWzEwOTQ5LCA4MjRdXSwgWyduc3VjYycsIFs4ODMzXV0sIFsnbnN1Y2NlcScsIFsxMDkyOCwgODI0XV0sIFsnbnN1cCcsIFs4ODM3XV0sIFsnbnN1cEUnLCBbMTA5NTAsIDgyNF1dLCBbJ25zdXBlJywgWzg4NDFdXSwgWyduc3Vwc2V0JywgWzg4MzUsIDg0MDJdXSwgWyduc3Vwc2V0ZXEnLCBbODg0MV1dLCBbJ25zdXBzZXRlcXEnLCBbMTA5NTAsIDgyNF1dLCBbJ250Z2wnLCBbODgyNV1dLCBbJ050aWxkZScsIFsyMDldXSwgWydudGlsZGUnLCBbMjQxXV0sIFsnbnRsZycsIFs4ODI0XV0sIFsnbnRyaWFuZ2xlbGVmdCcsIFs4OTM4XV0sIFsnbnRyaWFuZ2xlbGVmdGVxJywgWzg5NDBdXSwgWydudHJpYW5nbGVyaWdodCcsIFs4OTM5XV0sIFsnbnRyaWFuZ2xlcmlnaHRlcScsIFs4OTQxXV0sIFsnTnUnLCBbOTI1XV0sIFsnbnUnLCBbOTU3XV0sIFsnbnVtJywgWzM1XV0sIFsnbnVtZXJvJywgWzg0NzBdXSwgWydudW1zcCcsIFs4MTk5XV0sIFsnbnZhcCcsIFs4NzgxLCA4NDAyXV0sIFsnbnZkYXNoJywgWzg4NzZdXSwgWydudkRhc2gnLCBbODg3N11dLCBbJ25WZGFzaCcsIFs4ODc4XV0sIFsnblZEYXNoJywgWzg4NzldXSwgWydudmdlJywgWzg4MDUsIDg0MDJdXSwgWydudmd0JywgWzYyLCA4NDAyXV0sIFsnbnZIYXJyJywgWzEwNTAwXV0sIFsnbnZpbmZpbicsIFsxMDcxOF1dLCBbJ252bEFycicsIFsxMDQ5OF1dLCBbJ252bGUnLCBbODgwNCwgODQwMl1dLCBbJ252bHQnLCBbNjAsIDg0MDJdXSwgWydudmx0cmllJywgWzg4ODQsIDg0MDJdXSwgWydudnJBcnInLCBbMTA0OTldXSwgWydudnJ0cmllJywgWzg4ODUsIDg0MDJdXSwgWydudnNpbScsIFs4NzY0LCA4NDAyXV0sIFsnbndhcmhrJywgWzEwNTMxXV0sIFsnbndhcnInLCBbODU5OF1dLCBbJ253QXJyJywgWzg2NjJdXSwgWydud2Fycm93JywgWzg1OThdXSwgWydud25lYXInLCBbMTA1MzVdXSwgWydPYWN1dGUnLCBbMjExXV0sIFsnb2FjdXRlJywgWzI0M11dLCBbJ29hc3QnLCBbODg1OV1dLCBbJ09jaXJjJywgWzIxMl1dLCBbJ29jaXJjJywgWzI0NF1dLCBbJ29jaXInLCBbODg1OF1dLCBbJ09jeScsIFsxMDU0XV0sIFsnb2N5JywgWzEwODZdXSwgWydvZGFzaCcsIFs4ODYxXV0sIFsnT2RibGFjJywgWzMzNl1dLCBbJ29kYmxhYycsIFszMzddXSwgWydvZGl2JywgWzEwODA4XV0sIFsnb2RvdCcsIFs4ODU3XV0sIFsnb2Rzb2xkJywgWzEwNjg0XV0sIFsnT0VsaWcnLCBbMzM4XV0sIFsnb2VsaWcnLCBbMzM5XV0sIFsnb2ZjaXInLCBbMTA2ODddXSwgWydPZnInLCBbMTIwMDgyXV0sIFsnb2ZyJywgWzEyMDEwOF1dLCBbJ29nb24nLCBbNzMxXV0sIFsnT2dyYXZlJywgWzIxMF1dLCBbJ29ncmF2ZScsIFsyNDJdXSwgWydvZ3QnLCBbMTA2ODldXSwgWydvaGJhcicsIFsxMDY3N11dLCBbJ29obScsIFs5MzddXSwgWydvaW50JywgWzg3NTBdXSwgWydvbGFycicsIFs4NjM0XV0sIFsnb2xjaXInLCBbMTA2ODZdXSwgWydvbGNyb3NzJywgWzEwNjgzXV0sIFsnb2xpbmUnLCBbODI1NF1dLCBbJ29sdCcsIFsxMDY4OF1dLCBbJ09tYWNyJywgWzMzMl1dLCBbJ29tYWNyJywgWzMzM11dLCBbJ09tZWdhJywgWzkzN11dLCBbJ29tZWdhJywgWzk2OV1dLCBbJ09taWNyb24nLCBbOTI3XV0sIFsnb21pY3JvbicsIFs5NTldXSwgWydvbWlkJywgWzEwNjc4XV0sIFsnb21pbnVzJywgWzg4NTRdXSwgWydPb3BmJywgWzEyMDEzNF1dLCBbJ29vcGYnLCBbMTIwMTYwXV0sIFsnb3BhcicsIFsxMDY3OV1dLCBbJ09wZW5DdXJseURvdWJsZVF1b3RlJywgWzgyMjBdXSwgWydPcGVuQ3VybHlRdW90ZScsIFs4MjE2XV0sIFsnb3BlcnAnLCBbMTA2ODFdXSwgWydvcGx1cycsIFs4ODUzXV0sIFsnb3JhcnInLCBbODYzNV1dLCBbJ09yJywgWzEwODM2XV0sIFsnb3InLCBbODc0NF1dLCBbJ29yZCcsIFsxMDg0NV1dLCBbJ29yZGVyJywgWzg1MDBdXSwgWydvcmRlcm9mJywgWzg1MDBdXSwgWydvcmRmJywgWzE3MF1dLCBbJ29yZG0nLCBbMTg2XV0sIFsnb3JpZ29mJywgWzg4ODZdXSwgWydvcm9yJywgWzEwODM4XV0sIFsnb3JzbG9wZScsIFsxMDgzOV1dLCBbJ29ydicsIFsxMDg0M11dLCBbJ29TJywgWzk0MTZdXSwgWydPc2NyJywgWzExOTk3OF1dLCBbJ29zY3InLCBbODUwMF1dLCBbJ09zbGFzaCcsIFsyMTZdXSwgWydvc2xhc2gnLCBbMjQ4XV0sIFsnb3NvbCcsIFs4ODU2XV0sIFsnT3RpbGRlJywgWzIxM11dLCBbJ290aWxkZScsIFsyNDVdXSwgWydvdGltZXNhcycsIFsxMDgwNl1dLCBbJ090aW1lcycsIFsxMDgwN11dLCBbJ290aW1lcycsIFs4ODU1XV0sIFsnT3VtbCcsIFsyMTRdXSwgWydvdW1sJywgWzI0Nl1dLCBbJ292YmFyJywgWzkwMjFdXSwgWydPdmVyQmFyJywgWzgyNTRdXSwgWydPdmVyQnJhY2UnLCBbOTE4Ml1dLCBbJ092ZXJCcmFja2V0JywgWzkxNDBdXSwgWydPdmVyUGFyZW50aGVzaXMnLCBbOTE4MF1dLCBbJ3BhcmEnLCBbMTgyXV0sIFsncGFyYWxsZWwnLCBbODc0MV1dLCBbJ3BhcicsIFs4NzQxXV0sIFsncGFyc2ltJywgWzEwOTk1XV0sIFsncGFyc2wnLCBbMTEwMDVdXSwgWydwYXJ0JywgWzg3MDZdXSwgWydQYXJ0aWFsRCcsIFs4NzA2XV0sIFsnUGN5JywgWzEwNTVdXSwgWydwY3knLCBbMTA4N11dLCBbJ3BlcmNudCcsIFszN11dLCBbJ3BlcmlvZCcsIFs0Nl1dLCBbJ3Blcm1pbCcsIFs4MjQwXV0sIFsncGVycCcsIFs4ODY5XV0sIFsncGVydGVuaycsIFs4MjQxXV0sIFsnUGZyJywgWzEyMDA4M11dLCBbJ3BmcicsIFsxMjAxMDldXSwgWydQaGknLCBbOTM0XV0sIFsncGhpJywgWzk2Nl1dLCBbJ3BoaXYnLCBbOTgxXV0sIFsncGhtbWF0JywgWzg0OTldXSwgWydwaG9uZScsIFs5NzQyXV0sIFsnUGknLCBbOTI4XV0sIFsncGknLCBbOTYwXV0sIFsncGl0Y2hmb3JrJywgWzg5MTZdXSwgWydwaXYnLCBbOTgyXV0sIFsncGxhbmNrJywgWzg0NjNdXSwgWydwbGFuY2toJywgWzg0NjJdXSwgWydwbGFua3YnLCBbODQ2M11dLCBbJ3BsdXNhY2lyJywgWzEwNzg3XV0sIFsncGx1c2InLCBbODg2Ml1dLCBbJ3BsdXNjaXInLCBbMTA3ODZdXSwgWydwbHVzJywgWzQzXV0sIFsncGx1c2RvJywgWzg3MjRdXSwgWydwbHVzZHUnLCBbMTA3ODldXSwgWydwbHVzZScsIFsxMDg2Nl1dLCBbJ1BsdXNNaW51cycsIFsxNzddXSwgWydwbHVzbW4nLCBbMTc3XV0sIFsncGx1c3NpbScsIFsxMDc5MF1dLCBbJ3BsdXN0d28nLCBbMTA3OTFdXSwgWydwbScsIFsxNzddXSwgWydQb2luY2FyZXBsYW5lJywgWzg0NjBdXSwgWydwb2ludGludCcsIFsxMDc3M11dLCBbJ3BvcGYnLCBbMTIwMTYxXV0sIFsnUG9wZicsIFs4NDczXV0sIFsncG91bmQnLCBbMTYzXV0sIFsncHJhcCcsIFsxMDkzNV1dLCBbJ1ByJywgWzEwOTM5XV0sIFsncHInLCBbODgyNl1dLCBbJ3ByY3VlJywgWzg4MjhdXSwgWydwcmVjYXBwcm94JywgWzEwOTM1XV0sIFsncHJlYycsIFs4ODI2XV0sIFsncHJlY2N1cmx5ZXEnLCBbODgyOF1dLCBbJ1ByZWNlZGVzJywgWzg4MjZdXSwgWydQcmVjZWRlc0VxdWFsJywgWzEwOTI3XV0sIFsnUHJlY2VkZXNTbGFudEVxdWFsJywgWzg4MjhdXSwgWydQcmVjZWRlc1RpbGRlJywgWzg4MzBdXSwgWydwcmVjZXEnLCBbMTA5MjddXSwgWydwcmVjbmFwcHJveCcsIFsxMDkzN11dLCBbJ3ByZWNuZXFxJywgWzEwOTMzXV0sIFsncHJlY25zaW0nLCBbODkzNl1dLCBbJ3ByZScsIFsxMDkyN11dLCBbJ3ByRScsIFsxMDkzMV1dLCBbJ3ByZWNzaW0nLCBbODgzMF1dLCBbJ3ByaW1lJywgWzgyNDJdXSwgWydQcmltZScsIFs4MjQzXV0sIFsncHJpbWVzJywgWzg0NzNdXSwgWydwcm5hcCcsIFsxMDkzN11dLCBbJ3BybkUnLCBbMTA5MzNdXSwgWydwcm5zaW0nLCBbODkzNl1dLCBbJ3Byb2QnLCBbODcxOV1dLCBbJ1Byb2R1Y3QnLCBbODcxOV1dLCBbJ3Byb2ZhbGFyJywgWzkwMDZdXSwgWydwcm9mbGluZScsIFs4OTc4XV0sIFsncHJvZnN1cmYnLCBbODk3OV1dLCBbJ3Byb3AnLCBbODczM11dLCBbJ1Byb3BvcnRpb25hbCcsIFs4NzMzXV0sIFsnUHJvcG9ydGlvbicsIFs4NzU5XV0sIFsncHJvcHRvJywgWzg3MzNdXSwgWydwcnNpbScsIFs4ODMwXV0sIFsncHJ1cmVsJywgWzg4ODBdXSwgWydQc2NyJywgWzExOTk3OV1dLCBbJ3BzY3InLCBbMTIwMDA1XV0sIFsnUHNpJywgWzkzNl1dLCBbJ3BzaScsIFs5NjhdXSwgWydwdW5jc3AnLCBbODIwMF1dLCBbJ1FmcicsIFsxMjAwODRdXSwgWydxZnInLCBbMTIwMTEwXV0sIFsncWludCcsIFsxMDc2NF1dLCBbJ3FvcGYnLCBbMTIwMTYyXV0sIFsnUW9wZicsIFs4NDc0XV0sIFsncXByaW1lJywgWzgyNzldXSwgWydRc2NyJywgWzExOTk4MF1dLCBbJ3FzY3InLCBbMTIwMDA2XV0sIFsncXVhdGVybmlvbnMnLCBbODQ2MV1dLCBbJ3F1YXRpbnQnLCBbMTA3NzRdXSwgWydxdWVzdCcsIFs2M11dLCBbJ3F1ZXN0ZXEnLCBbODc5OV1dLCBbJ3F1b3QnLCBbMzRdXSwgWydRVU9UJywgWzM0XV0sIFsnckFhcnInLCBbODY2N11dLCBbJ3JhY2UnLCBbODc2NSwgODE3XV0sIFsnUmFjdXRlJywgWzM0MF1dLCBbJ3JhY3V0ZScsIFszNDFdXSwgWydyYWRpYycsIFs4NzMwXV0sIFsncmFlbXB0eXYnLCBbMTA2NzVdXSwgWydyYW5nJywgWzEwMjE3XV0sIFsnUmFuZycsIFsxMDIxOV1dLCBbJ3JhbmdkJywgWzEwNjQyXV0sIFsncmFuZ2UnLCBbMTA2NjFdXSwgWydyYW5nbGUnLCBbMTAyMTddXSwgWydyYXF1bycsIFsxODddXSwgWydyYXJyYXAnLCBbMTA2MTNdXSwgWydyYXJyYicsIFs4Njc3XV0sIFsncmFycmJmcycsIFsxMDUyOF1dLCBbJ3JhcnJjJywgWzEwNTQ3XV0sIFsncmFycicsIFs4NTk0XV0sIFsnUmFycicsIFs4NjA4XV0sIFsnckFycicsIFs4NjU4XV0sIFsncmFycmZzJywgWzEwNTI2XV0sIFsncmFycmhrJywgWzg2MThdXSwgWydyYXJybHAnLCBbODYyMF1dLCBbJ3JhcnJwbCcsIFsxMDU2NV1dLCBbJ3JhcnJzaW0nLCBbMTA2MTJdXSwgWydSYXJydGwnLCBbMTA1MThdXSwgWydyYXJydGwnLCBbODYxMV1dLCBbJ3JhcnJ3JywgWzg2MDVdXSwgWydyYXRhaWwnLCBbMTA1MjJdXSwgWydyQXRhaWwnLCBbMTA1MjRdXSwgWydyYXRpbycsIFs4NzU4XV0sIFsncmF0aW9uYWxzJywgWzg0NzRdXSwgWydyYmFycicsIFsxMDUwOV1dLCBbJ3JCYXJyJywgWzEwNTExXV0sIFsnUkJhcnInLCBbMTA1MTJdXSwgWydyYmJyaycsIFsxMDA5OV1dLCBbJ3JicmFjZScsIFsxMjVdXSwgWydyYnJhY2snLCBbOTNdXSwgWydyYnJrZScsIFsxMDYzNl1dLCBbJ3JicmtzbGQnLCBbMTA2MzhdXSwgWydyYnJrc2x1JywgWzEwNjQwXV0sIFsnUmNhcm9uJywgWzM0NF1dLCBbJ3JjYXJvbicsIFszNDVdXSwgWydSY2VkaWwnLCBbMzQyXV0sIFsncmNlZGlsJywgWzM0M11dLCBbJ3JjZWlsJywgWzg5NjldXSwgWydyY3ViJywgWzEyNV1dLCBbJ1JjeScsIFsxMDU2XV0sIFsncmN5JywgWzEwODhdXSwgWydyZGNhJywgWzEwNTUxXV0sIFsncmRsZGhhcicsIFsxMDYwMV1dLCBbJ3JkcXVvJywgWzgyMjFdXSwgWydyZHF1b3InLCBbODIyMV1dLCBbJ3Jkc2gnLCBbODYyN11dLCBbJ3JlYWwnLCBbODQ3Nl1dLCBbJ3JlYWxpbmUnLCBbODQ3NV1dLCBbJ3JlYWxwYXJ0JywgWzg0NzZdXSwgWydyZWFscycsIFs4NDc3XV0sIFsnUmUnLCBbODQ3Nl1dLCBbJ3JlY3QnLCBbOTY0NV1dLCBbJ3JlZycsIFsxNzRdXSwgWydSRUcnLCBbMTc0XV0sIFsnUmV2ZXJzZUVsZW1lbnQnLCBbODcxNV1dLCBbJ1JldmVyc2VFcXVpbGlicml1bScsIFs4NjUxXV0sIFsnUmV2ZXJzZVVwRXF1aWxpYnJpdW0nLCBbMTA2MDddXSwgWydyZmlzaHQnLCBbMTA2MjFdXSwgWydyZmxvb3InLCBbODk3MV1dLCBbJ3JmcicsIFsxMjAxMTFdXSwgWydSZnInLCBbODQ3Nl1dLCBbJ3JIYXInLCBbMTA1OTZdXSwgWydyaGFyZCcsIFs4NjQxXV0sIFsncmhhcnUnLCBbODY0MF1dLCBbJ3JoYXJ1bCcsIFsxMDYwNF1dLCBbJ1JobycsIFs5MjldXSwgWydyaG8nLCBbOTYxXV0sIFsncmhvdicsIFsxMDA5XV0sIFsnUmlnaHRBbmdsZUJyYWNrZXQnLCBbMTAyMTddXSwgWydSaWdodEFycm93QmFyJywgWzg2NzddXSwgWydyaWdodGFycm93JywgWzg1OTRdXSwgWydSaWdodEFycm93JywgWzg1OTRdXSwgWydSaWdodGFycm93JywgWzg2NThdXSwgWydSaWdodEFycm93TGVmdEFycm93JywgWzg2NDRdXSwgWydyaWdodGFycm93dGFpbCcsIFs4NjExXV0sIFsnUmlnaHRDZWlsaW5nJywgWzg5NjldXSwgWydSaWdodERvdWJsZUJyYWNrZXQnLCBbMTAyMTVdXSwgWydSaWdodERvd25UZWVWZWN0b3InLCBbMTA1ODldXSwgWydSaWdodERvd25WZWN0b3JCYXInLCBbMTA1ODFdXSwgWydSaWdodERvd25WZWN0b3InLCBbODY0Ml1dLCBbJ1JpZ2h0Rmxvb3InLCBbODk3MV1dLCBbJ3JpZ2h0aGFycG9vbmRvd24nLCBbODY0MV1dLCBbJ3JpZ2h0aGFycG9vbnVwJywgWzg2NDBdXSwgWydyaWdodGxlZnRhcnJvd3MnLCBbODY0NF1dLCBbJ3JpZ2h0bGVmdGhhcnBvb25zJywgWzg2NTJdXSwgWydyaWdodHJpZ2h0YXJyb3dzJywgWzg2NDldXSwgWydyaWdodHNxdWlnYXJyb3cnLCBbODYwNV1dLCBbJ1JpZ2h0VGVlQXJyb3cnLCBbODYxNF1dLCBbJ1JpZ2h0VGVlJywgWzg4NjZdXSwgWydSaWdodFRlZVZlY3RvcicsIFsxMDU4N11dLCBbJ3JpZ2h0dGhyZWV0aW1lcycsIFs4OTA4XV0sIFsnUmlnaHRUcmlhbmdsZUJhcicsIFsxMDcwNF1dLCBbJ1JpZ2h0VHJpYW5nbGUnLCBbODg4M11dLCBbJ1JpZ2h0VHJpYW5nbGVFcXVhbCcsIFs4ODg1XV0sIFsnUmlnaHRVcERvd25WZWN0b3InLCBbMTA1NzVdXSwgWydSaWdodFVwVGVlVmVjdG9yJywgWzEwNTg4XV0sIFsnUmlnaHRVcFZlY3RvckJhcicsIFsxMDU4MF1dLCBbJ1JpZ2h0VXBWZWN0b3InLCBbODYzOF1dLCBbJ1JpZ2h0VmVjdG9yQmFyJywgWzEwNTc5XV0sIFsnUmlnaHRWZWN0b3InLCBbODY0MF1dLCBbJ3JpbmcnLCBbNzMwXV0sIFsncmlzaW5nZG90c2VxJywgWzg3ODddXSwgWydybGFycicsIFs4NjQ0XV0sIFsncmxoYXInLCBbODY1Ml1dLCBbJ3JsbScsIFs4MjA3XV0sIFsncm1vdXN0YWNoZScsIFs5MTM3XV0sIFsncm1vdXN0JywgWzkxMzddXSwgWydybm1pZCcsIFsxMDk5MF1dLCBbJ3JvYW5nJywgWzEwMjIxXV0sIFsncm9hcnInLCBbODcwMl1dLCBbJ3JvYnJrJywgWzEwMjE1XV0sIFsncm9wYXInLCBbMTA2MzBdXSwgWydyb3BmJywgWzEyMDE2M11dLCBbJ1JvcGYnLCBbODQ3N11dLCBbJ3JvcGx1cycsIFsxMDc5OF1dLCBbJ3JvdGltZXMnLCBbMTA4MDVdXSwgWydSb3VuZEltcGxpZXMnLCBbMTA2MDhdXSwgWydycGFyJywgWzQxXV0sIFsncnBhcmd0JywgWzEwNjQ0XV0sIFsncnBwb2xpbnQnLCBbMTA3NzBdXSwgWydycmFycicsIFs4NjQ5XV0sIFsnUnJpZ2h0YXJyb3cnLCBbODY2N11dLCBbJ3JzYXF1bycsIFs4MjUwXV0sIFsncnNjcicsIFsxMjAwMDddXSwgWydSc2NyJywgWzg0NzVdXSwgWydyc2gnLCBbODYyNV1dLCBbJ1JzaCcsIFs4NjI1XV0sIFsncnNxYicsIFs5M11dLCBbJ3JzcXVvJywgWzgyMTddXSwgWydyc3F1b3InLCBbODIxN11dLCBbJ3J0aHJlZScsIFs4OTA4XV0sIFsncnRpbWVzJywgWzg5MDZdXSwgWydydHJpJywgWzk2NTddXSwgWydydHJpZScsIFs4ODg1XV0sIFsncnRyaWYnLCBbOTY1Nl1dLCBbJ3J0cmlsdHJpJywgWzEwNzAyXV0sIFsnUnVsZURlbGF5ZWQnLCBbMTA3NDBdXSwgWydydWx1aGFyJywgWzEwNjAwXV0sIFsncngnLCBbODQ3OF1dLCBbJ1NhY3V0ZScsIFszNDZdXSwgWydzYWN1dGUnLCBbMzQ3XV0sIFsnc2JxdW8nLCBbODIxOF1dLCBbJ3NjYXAnLCBbMTA5MzZdXSwgWydTY2Fyb24nLCBbMzUyXV0sIFsnc2Nhcm9uJywgWzM1M11dLCBbJ1NjJywgWzEwOTQwXV0sIFsnc2MnLCBbODgyN11dLCBbJ3NjY3VlJywgWzg4MjldXSwgWydzY2UnLCBbMTA5MjhdXSwgWydzY0UnLCBbMTA5MzJdXSwgWydTY2VkaWwnLCBbMzUwXV0sIFsnc2NlZGlsJywgWzM1MV1dLCBbJ1NjaXJjJywgWzM0OF1dLCBbJ3NjaXJjJywgWzM0OV1dLCBbJ3NjbmFwJywgWzEwOTM4XV0sIFsnc2NuRScsIFsxMDkzNF1dLCBbJ3NjbnNpbScsIFs4OTM3XV0sIFsnc2Nwb2xpbnQnLCBbMTA3NzFdXSwgWydzY3NpbScsIFs4ODMxXV0sIFsnU2N5JywgWzEwNTddXSwgWydzY3knLCBbMTA4OV1dLCBbJ3Nkb3RiJywgWzg4NjVdXSwgWydzZG90JywgWzg5MDFdXSwgWydzZG90ZScsIFsxMDg1NF1dLCBbJ3NlYXJoaycsIFsxMDUzM11dLCBbJ3NlYXJyJywgWzg2MDBdXSwgWydzZUFycicsIFs4NjY0XV0sIFsnc2VhcnJvdycsIFs4NjAwXV0sIFsnc2VjdCcsIFsxNjddXSwgWydzZW1pJywgWzU5XV0sIFsnc2Vzd2FyJywgWzEwNTM3XV0sIFsnc2V0bWludXMnLCBbODcyNl1dLCBbJ3NldG1uJywgWzg3MjZdXSwgWydzZXh0JywgWzEwMDM4XV0sIFsnU2ZyJywgWzEyMDA4Nl1dLCBbJ3NmcicsIFsxMjAxMTJdXSwgWydzZnJvd24nLCBbODk5NF1dLCBbJ3NoYXJwJywgWzk4MzldXSwgWydTSENIY3knLCBbMTA2NV1dLCBbJ3NoY2hjeScsIFsxMDk3XV0sIFsnU0hjeScsIFsxMDY0XV0sIFsnc2hjeScsIFsxMDk2XV0sIFsnU2hvcnREb3duQXJyb3cnLCBbODU5NV1dLCBbJ1Nob3J0TGVmdEFycm93JywgWzg1OTJdXSwgWydzaG9ydG1pZCcsIFs4NzM5XV0sIFsnc2hvcnRwYXJhbGxlbCcsIFs4NzQxXV0sIFsnU2hvcnRSaWdodEFycm93JywgWzg1OTRdXSwgWydTaG9ydFVwQXJyb3cnLCBbODU5M11dLCBbJ3NoeScsIFsxNzNdXSwgWydTaWdtYScsIFs5MzFdXSwgWydzaWdtYScsIFs5NjNdXSwgWydzaWdtYWYnLCBbOTYyXV0sIFsnc2lnbWF2JywgWzk2Ml1dLCBbJ3NpbScsIFs4NzY0XV0sIFsnc2ltZG90JywgWzEwODU4XV0sIFsnc2ltZScsIFs4NzcxXV0sIFsnc2ltZXEnLCBbODc3MV1dLCBbJ3NpbWcnLCBbMTA5MTBdXSwgWydzaW1nRScsIFsxMDkxMl1dLCBbJ3NpbWwnLCBbMTA5MDldXSwgWydzaW1sRScsIFsxMDkxMV1dLCBbJ3NpbW5lJywgWzg3NzRdXSwgWydzaW1wbHVzJywgWzEwNzg4XV0sIFsnc2ltcmFycicsIFsxMDYxMF1dLCBbJ3NsYXJyJywgWzg1OTJdXSwgWydTbWFsbENpcmNsZScsIFs4NzI4XV0sIFsnc21hbGxzZXRtaW51cycsIFs4NzI2XV0sIFsnc21hc2hwJywgWzEwODAzXV0sIFsnc21lcGFyc2wnLCBbMTA3MjRdXSwgWydzbWlkJywgWzg3MzldXSwgWydzbWlsZScsIFs4OTk1XV0sIFsnc210JywgWzEwOTIyXV0sIFsnc210ZScsIFsxMDkyNF1dLCBbJ3NtdGVzJywgWzEwOTI0LCA2NTAyNF1dLCBbJ1NPRlRjeScsIFsxMDY4XV0sIFsnc29mdGN5JywgWzExMDBdXSwgWydzb2xiYXInLCBbOTAyM11dLCBbJ3NvbGInLCBbMTA2OTJdXSwgWydzb2wnLCBbNDddXSwgWydTb3BmJywgWzEyMDEzOF1dLCBbJ3NvcGYnLCBbMTIwMTY0XV0sIFsnc3BhZGVzJywgWzk4MjRdXSwgWydzcGFkZXN1aXQnLCBbOTgyNF1dLCBbJ3NwYXInLCBbODc0MV1dLCBbJ3NxY2FwJywgWzg4NTFdXSwgWydzcWNhcHMnLCBbODg1MSwgNjUwMjRdXSwgWydzcWN1cCcsIFs4ODUyXV0sIFsnc3FjdXBzJywgWzg4NTIsIDY1MDI0XV0sIFsnU3FydCcsIFs4NzMwXV0sIFsnc3FzdWInLCBbODg0N11dLCBbJ3Nxc3ViZScsIFs4ODQ5XV0sIFsnc3FzdWJzZXQnLCBbODg0N11dLCBbJ3Nxc3Vic2V0ZXEnLCBbODg0OV1dLCBbJ3Nxc3VwJywgWzg4NDhdXSwgWydzcXN1cGUnLCBbODg1MF1dLCBbJ3Nxc3Vwc2V0JywgWzg4NDhdXSwgWydzcXN1cHNldGVxJywgWzg4NTBdXSwgWydzcXVhcmUnLCBbOTYzM11dLCBbJ1NxdWFyZScsIFs5NjMzXV0sIFsnU3F1YXJlSW50ZXJzZWN0aW9uJywgWzg4NTFdXSwgWydTcXVhcmVTdWJzZXQnLCBbODg0N11dLCBbJ1NxdWFyZVN1YnNldEVxdWFsJywgWzg4NDldXSwgWydTcXVhcmVTdXBlcnNldCcsIFs4ODQ4XV0sIFsnU3F1YXJlU3VwZXJzZXRFcXVhbCcsIFs4ODUwXV0sIFsnU3F1YXJlVW5pb24nLCBbODg1Ml1dLCBbJ3NxdWFyZicsIFs5NjQyXV0sIFsnc3F1JywgWzk2MzNdXSwgWydzcXVmJywgWzk2NDJdXSwgWydzcmFycicsIFs4NTk0XV0sIFsnU3NjcicsIFsxMTk5ODJdXSwgWydzc2NyJywgWzEyMDAwOF1dLCBbJ3NzZXRtbicsIFs4NzI2XV0sIFsnc3NtaWxlJywgWzg5OTVdXSwgWydzc3RhcmYnLCBbODkwMl1dLCBbJ1N0YXInLCBbODkwMl1dLCBbJ3N0YXInLCBbOTczNF1dLCBbJ3N0YXJmJywgWzk3MzNdXSwgWydzdHJhaWdodGVwc2lsb24nLCBbMTAxM11dLCBbJ3N0cmFpZ2h0cGhpJywgWzk4MV1dLCBbJ3N0cm5zJywgWzE3NV1dLCBbJ3N1YicsIFs4ODM0XV0sIFsnU3ViJywgWzg5MTJdXSwgWydzdWJkb3QnLCBbMTA5NDFdXSwgWydzdWJFJywgWzEwOTQ5XV0sIFsnc3ViZScsIFs4ODM4XV0sIFsnc3ViZWRvdCcsIFsxMDk0N11dLCBbJ3N1Ym11bHQnLCBbMTA5NDVdXSwgWydzdWJuRScsIFsxMDk1NV1dLCBbJ3N1Ym5lJywgWzg4NDJdXSwgWydzdWJwbHVzJywgWzEwOTQzXV0sIFsnc3VicmFycicsIFsxMDYxN11dLCBbJ3N1YnNldCcsIFs4ODM0XV0sIFsnU3Vic2V0JywgWzg5MTJdXSwgWydzdWJzZXRlcScsIFs4ODM4XV0sIFsnc3Vic2V0ZXFxJywgWzEwOTQ5XV0sIFsnU3Vic2V0RXF1YWwnLCBbODgzOF1dLCBbJ3N1YnNldG5lcScsIFs4ODQyXV0sIFsnc3Vic2V0bmVxcScsIFsxMDk1NV1dLCBbJ3N1YnNpbScsIFsxMDk1MV1dLCBbJ3N1YnN1YicsIFsxMDk2NV1dLCBbJ3N1YnN1cCcsIFsxMDk2M11dLCBbJ3N1Y2NhcHByb3gnLCBbMTA5MzZdXSwgWydzdWNjJywgWzg4MjddXSwgWydzdWNjY3VybHllcScsIFs4ODI5XV0sIFsnU3VjY2VlZHMnLCBbODgyN11dLCBbJ1N1Y2NlZWRzRXF1YWwnLCBbMTA5MjhdXSwgWydTdWNjZWVkc1NsYW50RXF1YWwnLCBbODgyOV1dLCBbJ1N1Y2NlZWRzVGlsZGUnLCBbODgzMV1dLCBbJ3N1Y2NlcScsIFsxMDkyOF1dLCBbJ3N1Y2NuYXBwcm94JywgWzEwOTM4XV0sIFsnc3VjY25lcXEnLCBbMTA5MzRdXSwgWydzdWNjbnNpbScsIFs4OTM3XV0sIFsnc3VjY3NpbScsIFs4ODMxXV0sIFsnU3VjaFRoYXQnLCBbODcxNV1dLCBbJ3N1bScsIFs4NzIxXV0sIFsnU3VtJywgWzg3MjFdXSwgWydzdW5nJywgWzk4MzRdXSwgWydzdXAxJywgWzE4NV1dLCBbJ3N1cDInLCBbMTc4XV0sIFsnc3VwMycsIFsxNzldXSwgWydzdXAnLCBbODgzNV1dLCBbJ1N1cCcsIFs4OTEzXV0sIFsnc3VwZG90JywgWzEwOTQyXV0sIFsnc3VwZHN1YicsIFsxMDk2OF1dLCBbJ3N1cEUnLCBbMTA5NTBdXSwgWydzdXBlJywgWzg4MzldXSwgWydzdXBlZG90JywgWzEwOTQ4XV0sIFsnU3VwZXJzZXQnLCBbODgzNV1dLCBbJ1N1cGVyc2V0RXF1YWwnLCBbODgzOV1dLCBbJ3N1cGhzb2wnLCBbMTAxODVdXSwgWydzdXBoc3ViJywgWzEwOTY3XV0sIFsnc3VwbGFycicsIFsxMDYxOV1dLCBbJ3N1cG11bHQnLCBbMTA5NDZdXSwgWydzdXBuRScsIFsxMDk1Nl1dLCBbJ3N1cG5lJywgWzg4NDNdXSwgWydzdXBwbHVzJywgWzEwOTQ0XV0sIFsnc3Vwc2V0JywgWzg4MzVdXSwgWydTdXBzZXQnLCBbODkxM11dLCBbJ3N1cHNldGVxJywgWzg4MzldXSwgWydzdXBzZXRlcXEnLCBbMTA5NTBdXSwgWydzdXBzZXRuZXEnLCBbODg0M11dLCBbJ3N1cHNldG5lcXEnLCBbMTA5NTZdXSwgWydzdXBzaW0nLCBbMTA5NTJdXSwgWydzdXBzdWInLCBbMTA5NjRdXSwgWydzdXBzdXAnLCBbMTA5NjZdXSwgWydzd2FyaGsnLCBbMTA1MzRdXSwgWydzd2FycicsIFs4NjAxXV0sIFsnc3dBcnInLCBbODY2NV1dLCBbJ3N3YXJyb3cnLCBbODYwMV1dLCBbJ3N3bndhcicsIFsxMDUzOF1dLCBbJ3N6bGlnJywgWzIyM11dLCBbJ1RhYicsIFs5XV0sIFsndGFyZ2V0JywgWzg5ODJdXSwgWydUYXUnLCBbOTMyXV0sIFsndGF1JywgWzk2NF1dLCBbJ3RicmsnLCBbOTE0MF1dLCBbJ1RjYXJvbicsIFszNTZdXSwgWyd0Y2Fyb24nLCBbMzU3XV0sIFsnVGNlZGlsJywgWzM1NF1dLCBbJ3RjZWRpbCcsIFszNTVdXSwgWydUY3knLCBbMTA1OF1dLCBbJ3RjeScsIFsxMDkwXV0sIFsndGRvdCcsIFs4NDExXV0sIFsndGVscmVjJywgWzg5ODFdXSwgWydUZnInLCBbMTIwMDg3XV0sIFsndGZyJywgWzEyMDExM11dLCBbJ3RoZXJlNCcsIFs4NzU2XV0sIFsndGhlcmVmb3JlJywgWzg3NTZdXSwgWydUaGVyZWZvcmUnLCBbODc1Nl1dLCBbJ1RoZXRhJywgWzkyMF1dLCBbJ3RoZXRhJywgWzk1Ml1dLCBbJ3RoZXRhc3ltJywgWzk3N11dLCBbJ3RoZXRhdicsIFs5NzddXSwgWyd0aGlja2FwcHJveCcsIFs4Nzc2XV0sIFsndGhpY2tzaW0nLCBbODc2NF1dLCBbJ1RoaWNrU3BhY2UnLCBbODI4NywgODIwMl1dLCBbJ1RoaW5TcGFjZScsIFs4MjAxXV0sIFsndGhpbnNwJywgWzgyMDFdXSwgWyd0aGthcCcsIFs4Nzc2XV0sIFsndGhrc2ltJywgWzg3NjRdXSwgWydUSE9STicsIFsyMjJdXSwgWyd0aG9ybicsIFsyNTRdXSwgWyd0aWxkZScsIFs3MzJdXSwgWydUaWxkZScsIFs4NzY0XV0sIFsnVGlsZGVFcXVhbCcsIFs4NzcxXV0sIFsnVGlsZGVGdWxsRXF1YWwnLCBbODc3M11dLCBbJ1RpbGRlVGlsZGUnLCBbODc3Nl1dLCBbJ3RpbWVzYmFyJywgWzEwODAxXV0sIFsndGltZXNiJywgWzg4NjRdXSwgWyd0aW1lcycsIFsyMTVdXSwgWyd0aW1lc2QnLCBbMTA4MDBdXSwgWyd0aW50JywgWzg3NDldXSwgWyd0b2VhJywgWzEwNTM2XV0sIFsndG9wYm90JywgWzkwMTRdXSwgWyd0b3BjaXInLCBbMTA5OTNdXSwgWyd0b3AnLCBbODg2OF1dLCBbJ1RvcGYnLCBbMTIwMTM5XV0sIFsndG9wZicsIFsxMjAxNjVdXSwgWyd0b3Bmb3JrJywgWzEwOTcwXV0sIFsndG9zYScsIFsxMDUzN11dLCBbJ3RwcmltZScsIFs4MjQ0XV0sIFsndHJhZGUnLCBbODQ4Ml1dLCBbJ1RSQURFJywgWzg0ODJdXSwgWyd0cmlhbmdsZScsIFs5NjUzXV0sIFsndHJpYW5nbGVkb3duJywgWzk2NjNdXSwgWyd0cmlhbmdsZWxlZnQnLCBbOTY2N11dLCBbJ3RyaWFuZ2xlbGVmdGVxJywgWzg4ODRdXSwgWyd0cmlhbmdsZXEnLCBbODc5Nl1dLCBbJ3RyaWFuZ2xlcmlnaHQnLCBbOTY1N11dLCBbJ3RyaWFuZ2xlcmlnaHRlcScsIFs4ODg1XV0sIFsndHJpZG90JywgWzk3MDhdXSwgWyd0cmllJywgWzg3OTZdXSwgWyd0cmltaW51cycsIFsxMDgxMF1dLCBbJ1RyaXBsZURvdCcsIFs4NDExXV0sIFsndHJpcGx1cycsIFsxMDgwOV1dLCBbJ3RyaXNiJywgWzEwNzAxXV0sIFsndHJpdGltZScsIFsxMDgxMV1dLCBbJ3RycGV6aXVtJywgWzkxODZdXSwgWydUc2NyJywgWzExOTk4M11dLCBbJ3RzY3InLCBbMTIwMDA5XV0sIFsnVFNjeScsIFsxMDYyXV0sIFsndHNjeScsIFsxMDk0XV0sIFsnVFNIY3knLCBbMTAzNV1dLCBbJ3RzaGN5JywgWzExMTVdXSwgWydUc3Ryb2snLCBbMzU4XV0sIFsndHN0cm9rJywgWzM1OV1dLCBbJ3R3aXh0JywgWzg4MTJdXSwgWyd0d29oZWFkbGVmdGFycm93JywgWzg2MDZdXSwgWyd0d29oZWFkcmlnaHRhcnJvdycsIFs4NjA4XV0sIFsnVWFjdXRlJywgWzIxOF1dLCBbJ3VhY3V0ZScsIFsyNTBdXSwgWyd1YXJyJywgWzg1OTNdXSwgWydVYXJyJywgWzg2MDddXSwgWyd1QXJyJywgWzg2NTddXSwgWydVYXJyb2NpcicsIFsxMDU2OV1dLCBbJ1VicmN5JywgWzEwMzhdXSwgWyd1YnJjeScsIFsxMTE4XV0sIFsnVWJyZXZlJywgWzM2NF1dLCBbJ3VicmV2ZScsIFszNjVdXSwgWydVY2lyYycsIFsyMTldXSwgWyd1Y2lyYycsIFsyNTFdXSwgWydVY3knLCBbMTA1OV1dLCBbJ3VjeScsIFsxMDkxXV0sIFsndWRhcnInLCBbODY0NV1dLCBbJ1VkYmxhYycsIFszNjhdXSwgWyd1ZGJsYWMnLCBbMzY5XV0sIFsndWRoYXInLCBbMTA2MDZdXSwgWyd1ZmlzaHQnLCBbMTA2MjJdXSwgWydVZnInLCBbMTIwMDg4XV0sIFsndWZyJywgWzEyMDExNF1dLCBbJ1VncmF2ZScsIFsyMTddXSwgWyd1Z3JhdmUnLCBbMjQ5XV0sIFsndUhhcicsIFsxMDU5NV1dLCBbJ3VoYXJsJywgWzg2MzldXSwgWyd1aGFycicsIFs4NjM4XV0sIFsndWhibGsnLCBbOTYwMF1dLCBbJ3VsY29ybicsIFs4OTg4XV0sIFsndWxjb3JuZXInLCBbODk4OF1dLCBbJ3VsY3JvcCcsIFs4OTc1XV0sIFsndWx0cmknLCBbOTcyMF1dLCBbJ1VtYWNyJywgWzM2Ml1dLCBbJ3VtYWNyJywgWzM2M11dLCBbJ3VtbCcsIFsxNjhdXSwgWydVbmRlckJhcicsIFs5NV1dLCBbJ1VuZGVyQnJhY2UnLCBbOTE4M11dLCBbJ1VuZGVyQnJhY2tldCcsIFs5MTQxXV0sIFsnVW5kZXJQYXJlbnRoZXNpcycsIFs5MTgxXV0sIFsnVW5pb24nLCBbODg5OV1dLCBbJ1VuaW9uUGx1cycsIFs4ODQ2XV0sIFsnVW9nb24nLCBbMzcwXV0sIFsndW9nb24nLCBbMzcxXV0sIFsnVW9wZicsIFsxMjAxNDBdXSwgWyd1b3BmJywgWzEyMDE2Nl1dLCBbJ1VwQXJyb3dCYXInLCBbMTA1MTRdXSwgWyd1cGFycm93JywgWzg1OTNdXSwgWydVcEFycm93JywgWzg1OTNdXSwgWydVcGFycm93JywgWzg2NTddXSwgWydVcEFycm93RG93bkFycm93JywgWzg2NDVdXSwgWyd1cGRvd25hcnJvdycsIFs4NTk3XV0sIFsnVXBEb3duQXJyb3cnLCBbODU5N11dLCBbJ1VwZG93bmFycm93JywgWzg2NjFdXSwgWydVcEVxdWlsaWJyaXVtJywgWzEwNjA2XV0sIFsndXBoYXJwb29ubGVmdCcsIFs4NjM5XV0sIFsndXBoYXJwb29ucmlnaHQnLCBbODYzOF1dLCBbJ3VwbHVzJywgWzg4NDZdXSwgWydVcHBlckxlZnRBcnJvdycsIFs4NTk4XV0sIFsnVXBwZXJSaWdodEFycm93JywgWzg1OTldXSwgWyd1cHNpJywgWzk2NV1dLCBbJ1Vwc2knLCBbOTc4XV0sIFsndXBzaWgnLCBbOTc4XV0sIFsnVXBzaWxvbicsIFs5MzNdXSwgWyd1cHNpbG9uJywgWzk2NV1dLCBbJ1VwVGVlQXJyb3cnLCBbODYxM11dLCBbJ1VwVGVlJywgWzg4NjldXSwgWyd1cHVwYXJyb3dzJywgWzg2NDhdXSwgWyd1cmNvcm4nLCBbODk4OV1dLCBbJ3VyY29ybmVyJywgWzg5ODldXSwgWyd1cmNyb3AnLCBbODk3NF1dLCBbJ1VyaW5nJywgWzM2Nl1dLCBbJ3VyaW5nJywgWzM2N11dLCBbJ3VydHJpJywgWzk3MjFdXSwgWydVc2NyJywgWzExOTk4NF1dLCBbJ3VzY3InLCBbMTIwMDEwXV0sIFsndXRkb3QnLCBbODk0NF1dLCBbJ1V0aWxkZScsIFszNjBdXSwgWyd1dGlsZGUnLCBbMzYxXV0sIFsndXRyaScsIFs5NjUzXV0sIFsndXRyaWYnLCBbOTY1Ml1dLCBbJ3V1YXJyJywgWzg2NDhdXSwgWydVdW1sJywgWzIyMF1dLCBbJ3V1bWwnLCBbMjUyXV0sIFsndXdhbmdsZScsIFsxMDY2M11dLCBbJ3ZhbmdydCcsIFsxMDY1Ml1dLCBbJ3ZhcmVwc2lsb24nLCBbMTAxM11dLCBbJ3ZhcmthcHBhJywgWzEwMDhdXSwgWyd2YXJub3RoaW5nJywgWzg3MDldXSwgWyd2YXJwaGknLCBbOTgxXV0sIFsndmFycGknLCBbOTgyXV0sIFsndmFycHJvcHRvJywgWzg3MzNdXSwgWyd2YXJyJywgWzg1OTddXSwgWyd2QXJyJywgWzg2NjFdXSwgWyd2YXJyaG8nLCBbMTAwOV1dLCBbJ3ZhcnNpZ21hJywgWzk2Ml1dLCBbJ3ZhcnN1YnNldG5lcScsIFs4ODQyLCA2NTAyNF1dLCBbJ3ZhcnN1YnNldG5lcXEnLCBbMTA5NTUsIDY1MDI0XV0sIFsndmFyc3Vwc2V0bmVxJywgWzg4NDMsIDY1MDI0XV0sIFsndmFyc3Vwc2V0bmVxcScsIFsxMDk1NiwgNjUwMjRdXSwgWyd2YXJ0aGV0YScsIFs5NzddXSwgWyd2YXJ0cmlhbmdsZWxlZnQnLCBbODg4Ml1dLCBbJ3ZhcnRyaWFuZ2xlcmlnaHQnLCBbODg4M11dLCBbJ3ZCYXInLCBbMTA5ODRdXSwgWydWYmFyJywgWzEwOTg3XV0sIFsndkJhcnYnLCBbMTA5ODVdXSwgWydWY3knLCBbMTA0Ml1dLCBbJ3ZjeScsIFsxMDc0XV0sIFsndmRhc2gnLCBbODg2Nl1dLCBbJ3ZEYXNoJywgWzg4NzJdXSwgWydWZGFzaCcsIFs4ODczXV0sIFsnVkRhc2gnLCBbODg3NV1dLCBbJ1ZkYXNobCcsIFsxMDk4Ml1dLCBbJ3ZlZWJhcicsIFs4ODkxXV0sIFsndmVlJywgWzg3NDRdXSwgWydWZWUnLCBbODg5N11dLCBbJ3ZlZWVxJywgWzg3OTRdXSwgWyd2ZWxsaXAnLCBbODk0Ml1dLCBbJ3ZlcmJhcicsIFsxMjRdXSwgWydWZXJiYXInLCBbODIxNF1dLCBbJ3ZlcnQnLCBbMTI0XV0sIFsnVmVydCcsIFs4MjE0XV0sIFsnVmVydGljYWxCYXInLCBbODczOV1dLCBbJ1ZlcnRpY2FsTGluZScsIFsxMjRdXSwgWydWZXJ0aWNhbFNlcGFyYXRvcicsIFsxMDA3Ml1dLCBbJ1ZlcnRpY2FsVGlsZGUnLCBbODc2OF1dLCBbJ1ZlcnlUaGluU3BhY2UnLCBbODIwMl1dLCBbJ1ZmcicsIFsxMjAwODldXSwgWyd2ZnInLCBbMTIwMTE1XV0sIFsndmx0cmknLCBbODg4Ml1dLCBbJ3Zuc3ViJywgWzg4MzQsIDg0MDJdXSwgWyd2bnN1cCcsIFs4ODM1LCA4NDAyXV0sIFsnVm9wZicsIFsxMjAxNDFdXSwgWyd2b3BmJywgWzEyMDE2N11dLCBbJ3Zwcm9wJywgWzg3MzNdXSwgWyd2cnRyaScsIFs4ODgzXV0sIFsnVnNjcicsIFsxMTk5ODVdXSwgWyd2c2NyJywgWzEyMDAxMV1dLCBbJ3ZzdWJuRScsIFsxMDk1NSwgNjUwMjRdXSwgWyd2c3VibmUnLCBbODg0MiwgNjUwMjRdXSwgWyd2c3VwbkUnLCBbMTA5NTYsIDY1MDI0XV0sIFsndnN1cG5lJywgWzg4NDMsIDY1MDI0XV0sIFsnVnZkYXNoJywgWzg4NzRdXSwgWyd2emlnemFnJywgWzEwNjUwXV0sIFsnV2NpcmMnLCBbMzcyXV0sIFsnd2NpcmMnLCBbMzczXV0sIFsnd2VkYmFyJywgWzEwODQ3XV0sIFsnd2VkZ2UnLCBbODc0M11dLCBbJ1dlZGdlJywgWzg4OTZdXSwgWyd3ZWRnZXEnLCBbODc5M11dLCBbJ3dlaWVycCcsIFs4NDcyXV0sIFsnV2ZyJywgWzEyMDA5MF1dLCBbJ3dmcicsIFsxMjAxMTZdXSwgWydXb3BmJywgWzEyMDE0Ml1dLCBbJ3dvcGYnLCBbMTIwMTY4XV0sIFsnd3AnLCBbODQ3Ml1dLCBbJ3dyJywgWzg3NjhdXSwgWyd3cmVhdGgnLCBbODc2OF1dLCBbJ1dzY3InLCBbMTE5OTg2XV0sIFsnd3NjcicsIFsxMjAwMTJdXSwgWyd4Y2FwJywgWzg4OThdXSwgWyd4Y2lyYycsIFs5NzExXV0sIFsneGN1cCcsIFs4ODk5XV0sIFsneGR0cmknLCBbOTY2MV1dLCBbJ1hmcicsIFsxMjAwOTFdXSwgWyd4ZnInLCBbMTIwMTE3XV0sIFsneGhhcnInLCBbMTAyMzFdXSwgWyd4aEFycicsIFsxMDIzNF1dLCBbJ1hpJywgWzkyNl1dLCBbJ3hpJywgWzk1OF1dLCBbJ3hsYXJyJywgWzEwMjI5XV0sIFsneGxBcnInLCBbMTAyMzJdXSwgWyd4bWFwJywgWzEwMjM2XV0sIFsneG5pcycsIFs4OTU1XV0sIFsneG9kb3QnLCBbMTA3NTJdXSwgWydYb3BmJywgWzEyMDE0M11dLCBbJ3hvcGYnLCBbMTIwMTY5XV0sIFsneG9wbHVzJywgWzEwNzUzXV0sIFsneG90aW1lJywgWzEwNzU0XV0sIFsneHJhcnInLCBbMTAyMzBdXSwgWyd4ckFycicsIFsxMDIzM11dLCBbJ1hzY3InLCBbMTE5OTg3XV0sIFsneHNjcicsIFsxMjAwMTNdXSwgWyd4c3FjdXAnLCBbMTA3NThdXSwgWyd4dXBsdXMnLCBbMTA3NTZdXSwgWyd4dXRyaScsIFs5NjUxXV0sIFsneHZlZScsIFs4ODk3XV0sIFsneHdlZGdlJywgWzg4OTZdXSwgWydZYWN1dGUnLCBbMjIxXV0sIFsneWFjdXRlJywgWzI1M11dLCBbJ1lBY3knLCBbMTA3MV1dLCBbJ3lhY3knLCBbMTEwM11dLCBbJ1ljaXJjJywgWzM3NF1dLCBbJ3ljaXJjJywgWzM3NV1dLCBbJ1ljeScsIFsxMDY3XV0sIFsneWN5JywgWzEwOTldXSwgWyd5ZW4nLCBbMTY1XV0sIFsnWWZyJywgWzEyMDA5Ml1dLCBbJ3lmcicsIFsxMjAxMThdXSwgWydZSWN5JywgWzEwMzFdXSwgWyd5aWN5JywgWzExMTFdXSwgWydZb3BmJywgWzEyMDE0NF1dLCBbJ3lvcGYnLCBbMTIwMTcwXV0sIFsnWXNjcicsIFsxMTk5ODhdXSwgWyd5c2NyJywgWzEyMDAxNF1dLCBbJ1lVY3knLCBbMTA3MF1dLCBbJ3l1Y3knLCBbMTEwMl1dLCBbJ3l1bWwnLCBbMjU1XV0sIFsnWXVtbCcsIFszNzZdXSwgWydaYWN1dGUnLCBbMzc3XV0sIFsnemFjdXRlJywgWzM3OF1dLCBbJ1pjYXJvbicsIFszODFdXSwgWyd6Y2Fyb24nLCBbMzgyXV0sIFsnWmN5JywgWzEwNDddXSwgWyd6Y3knLCBbMTA3OV1dLCBbJ1pkb3QnLCBbMzc5XV0sIFsnemRvdCcsIFszODBdXSwgWyd6ZWV0cmYnLCBbODQ4OF1dLCBbJ1plcm9XaWR0aFNwYWNlJywgWzgyMDNdXSwgWydaZXRhJywgWzkxOF1dLCBbJ3pldGEnLCBbOTUwXV0sIFsnemZyJywgWzEyMDExOV1dLCBbJ1pmcicsIFs4NDg4XV0sIFsnWkhjeScsIFsxMDQ2XV0sIFsnemhjeScsIFsxMDc4XV0sIFsnemlncmFycicsIFs4NjY5XV0sIFsnem9wZicsIFsxMjAxNzFdXSwgWydab3BmJywgWzg0ODRdXSwgWydac2NyJywgWzExOTk4OV1dLCBbJ3pzY3InLCBbMTIwMDE1XV0sIFsnendqJywgWzgyMDVdXSwgWyd6d25qJywgWzgyMDRdXV07XG5cbnZhciBhbHBoYUluZGV4ID0ge307XG52YXIgY2hhckluZGV4ID0ge307XG5cbmNyZWF0ZUluZGV4ZXMoYWxwaGFJbmRleCwgY2hhckluZGV4KTtcblxuLyoqXG4gKiBAY29uc3RydWN0b3JcbiAqL1xuZnVuY3Rpb24gSHRtbDVFbnRpdGllcygpIHt9XG5cbi8qKlxuICogQHBhcmFtIHtTdHJpbmd9IHN0clxuICogQHJldHVybnMge1N0cmluZ31cbiAqL1xuSHRtbDVFbnRpdGllcy5wcm90b3R5cGUuZGVjb2RlID0gZnVuY3Rpb24oc3RyKSB7XG4gICAgaWYgKHN0ci5sZW5ndGggPT09IDApIHtcbiAgICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgICByZXR1cm4gc3RyLnJlcGxhY2UoLyYoIz9bXFx3XFxkXSspOz8vZywgZnVuY3Rpb24ocywgZW50aXR5KSB7XG4gICAgICAgIHZhciBjaHI7XG4gICAgICAgIGlmIChlbnRpdHkuY2hhckF0KDApID09PSBcIiNcIikge1xuICAgICAgICAgICAgdmFyIGNvZGUgPSBlbnRpdHkuY2hhckF0KDEpID09PSAneCcgP1xuICAgICAgICAgICAgICAgIHBhcnNlSW50KGVudGl0eS5zdWJzdHIoMikudG9Mb3dlckNhc2UoKSwgMTYpIDpcbiAgICAgICAgICAgICAgICBwYXJzZUludChlbnRpdHkuc3Vic3RyKDEpKTtcblxuICAgICAgICAgICAgaWYgKCEoaXNOYU4oY29kZSkgfHwgY29kZSA8IC0zMjc2OCB8fCBjb2RlID4gNjU1MzUpKSB7XG4gICAgICAgICAgICAgICAgY2hyID0gU3RyaW5nLmZyb21DaGFyQ29kZShjb2RlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNociA9IGFscGhhSW5kZXhbZW50aXR5XTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY2hyIHx8IHM7XG4gICAgfSk7XG59O1xuXG4vKipcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHJcbiAqIEByZXR1cm5zIHtTdHJpbmd9XG4gKi9cbiBIdG1sNUVudGl0aWVzLmRlY29kZSA9IGZ1bmN0aW9uKHN0cikge1xuICAgIHJldHVybiBuZXcgSHRtbDVFbnRpdGllcygpLmRlY29kZShzdHIpO1xuIH07XG5cbi8qKlxuICogQHBhcmFtIHtTdHJpbmd9IHN0clxuICogQHJldHVybnMge1N0cmluZ31cbiAqL1xuSHRtbDVFbnRpdGllcy5wcm90b3R5cGUuZW5jb2RlID0gZnVuY3Rpb24oc3RyKSB7XG4gICAgdmFyIHN0ckxlbmd0aCA9IHN0ci5sZW5ndGg7XG4gICAgaWYgKHN0ckxlbmd0aCA9PT0gMCkge1xuICAgICAgICByZXR1cm4gJyc7XG4gICAgfVxuICAgIHZhciByZXN1bHQgPSAnJztcbiAgICB2YXIgaSA9IDA7XG4gICAgd2hpbGUgKGkgPCBzdHJMZW5ndGgpIHtcbiAgICAgICAgdmFyIGNoYXJJbmZvID0gY2hhckluZGV4W3N0ci5jaGFyQ29kZUF0KGkpXTtcbiAgICAgICAgaWYgKGNoYXJJbmZvKSB7XG4gICAgICAgICAgICB2YXIgYWxwaGEgPSBjaGFySW5mb1tzdHIuY2hhckNvZGVBdChpICsgMSldO1xuICAgICAgICAgICAgaWYgKGFscGhhKSB7XG4gICAgICAgICAgICAgICAgaSsrO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBhbHBoYSA9IGNoYXJJbmZvWycnXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChhbHBoYSkge1xuICAgICAgICAgICAgICAgIHJlc3VsdCArPSBcIiZcIiArIGFscGhhICsgXCI7XCI7XG4gICAgICAgICAgICAgICAgaSsrO1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJlc3VsdCArPSBzdHIuY2hhckF0KGkpO1xuICAgICAgICBpKys7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG59O1xuXG4vKipcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHJcbiAqIEByZXR1cm5zIHtTdHJpbmd9XG4gKi9cbiBIdG1sNUVudGl0aWVzLmVuY29kZSA9IGZ1bmN0aW9uKHN0cikge1xuICAgIHJldHVybiBuZXcgSHRtbDVFbnRpdGllcygpLmVuY29kZShzdHIpO1xuIH07XG5cbi8qKlxuICogQHBhcmFtIHtTdHJpbmd9IHN0clxuICogQHJldHVybnMge1N0cmluZ31cbiAqL1xuSHRtbDVFbnRpdGllcy5wcm90b3R5cGUuZW5jb2RlTm9uVVRGID0gZnVuY3Rpb24oc3RyKSB7XG4gICAgdmFyIHN0ckxlbmd0aCA9IHN0ci5sZW5ndGg7XG4gICAgaWYgKHN0ckxlbmd0aCA9PT0gMCkge1xuICAgICAgICByZXR1cm4gJyc7XG4gICAgfVxuICAgIHZhciByZXN1bHQgPSAnJztcbiAgICB2YXIgaSA9IDA7XG4gICAgd2hpbGUgKGkgPCBzdHJMZW5ndGgpIHtcbiAgICAgICAgdmFyIGMgPSBzdHIuY2hhckNvZGVBdChpKTtcbiAgICAgICAgdmFyIGNoYXJJbmZvID0gY2hhckluZGV4W2NdO1xuICAgICAgICBpZiAoY2hhckluZm8pIHtcbiAgICAgICAgICAgIHZhciBhbHBoYSA9IGNoYXJJbmZvW3N0ci5jaGFyQ29kZUF0KGkgKyAxKV07XG4gICAgICAgICAgICBpZiAoYWxwaGEpIHtcbiAgICAgICAgICAgICAgICBpKys7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGFscGhhID0gY2hhckluZm9bJyddO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGFscGhhKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ICs9IFwiJlwiICsgYWxwaGEgKyBcIjtcIjtcbiAgICAgICAgICAgICAgICBpKys7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGMgPCAzMiB8fCBjID4gMTI2KSB7XG4gICAgICAgICAgICByZXN1bHQgKz0gJyYjJyArIGMgKyAnOyc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXN1bHQgKz0gc3RyLmNoYXJBdChpKTtcbiAgICAgICAgfVxuICAgICAgICBpKys7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG59O1xuXG4vKipcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHJcbiAqIEByZXR1cm5zIHtTdHJpbmd9XG4gKi9cbiBIdG1sNUVudGl0aWVzLmVuY29kZU5vblVURiA9IGZ1bmN0aW9uKHN0cikge1xuICAgIHJldHVybiBuZXcgSHRtbDVFbnRpdGllcygpLmVuY29kZU5vblVURihzdHIpO1xuIH07XG5cbi8qKlxuICogQHBhcmFtIHtTdHJpbmd9IHN0clxuICogQHJldHVybnMge1N0cmluZ31cbiAqL1xuSHRtbDVFbnRpdGllcy5wcm90b3R5cGUuZW5jb2RlTm9uQVNDSUkgPSBmdW5jdGlvbihzdHIpIHtcbiAgICB2YXIgc3RyTGVuZ3RoID0gc3RyLmxlbmd0aDtcbiAgICBpZiAoc3RyTGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHJldHVybiAnJztcbiAgICB9XG4gICAgdmFyIHJlc3VsdCA9ICcnO1xuICAgIHZhciBpID0gMDtcbiAgICB3aGlsZSAoaSA8IHN0ckxlbmd0aCkge1xuICAgICAgICB2YXIgYyA9IHN0ci5jaGFyQ29kZUF0KGkpO1xuICAgICAgICBpZiAoYyA8PSAyNTUpIHtcbiAgICAgICAgICAgIHJlc3VsdCArPSBzdHJbaSsrXTtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIHJlc3VsdCArPSAnJiMnICsgYyArICc7JztcbiAgICAgICAgaSsrXG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG59O1xuXG4vKipcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHJcbiAqIEByZXR1cm5zIHtTdHJpbmd9XG4gKi9cbiBIdG1sNUVudGl0aWVzLmVuY29kZU5vbkFTQ0lJID0gZnVuY3Rpb24oc3RyKSB7XG4gICAgcmV0dXJuIG5ldyBIdG1sNUVudGl0aWVzKCkuZW5jb2RlTm9uQVNDSUkoc3RyKTtcbiB9O1xuXG4vKipcbiAqIEBwYXJhbSB7T2JqZWN0fSBhbHBoYUluZGV4IFBhc3NlZCBieSByZWZlcmVuY2UuXG4gKiBAcGFyYW0ge09iamVjdH0gY2hhckluZGV4IFBhc3NlZCBieSByZWZlcmVuY2UuXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUluZGV4ZXMoYWxwaGFJbmRleCwgY2hhckluZGV4KSB7XG4gICAgdmFyIGkgPSBFTlRJVElFUy5sZW5ndGg7XG4gICAgdmFyIF9yZXN1bHRzID0gW107XG4gICAgd2hpbGUgKGktLSkge1xuICAgICAgICB2YXIgZSA9IEVOVElUSUVTW2ldO1xuICAgICAgICB2YXIgYWxwaGEgPSBlWzBdO1xuICAgICAgICB2YXIgY2hhcnMgPSBlWzFdO1xuICAgICAgICB2YXIgY2hyID0gY2hhcnNbMF07XG4gICAgICAgIHZhciBhZGRDaGFyID0gKGNociA8IDMyIHx8IGNociA+IDEyNikgfHwgY2hyID09PSA2MiB8fCBjaHIgPT09IDYwIHx8IGNociA9PT0gMzggfHwgY2hyID09PSAzNCB8fCBjaHIgPT09IDM5O1xuICAgICAgICB2YXIgY2hhckluZm87XG4gICAgICAgIGlmIChhZGRDaGFyKSB7XG4gICAgICAgICAgICBjaGFySW5mbyA9IGNoYXJJbmRleFtjaHJdID0gY2hhckluZGV4W2Nocl0gfHwge307XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNoYXJzWzFdKSB7XG4gICAgICAgICAgICB2YXIgY2hyMiA9IGNoYXJzWzFdO1xuICAgICAgICAgICAgYWxwaGFJbmRleFthbHBoYV0gPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGNocikgKyBTdHJpbmcuZnJvbUNoYXJDb2RlKGNocjIpO1xuICAgICAgICAgICAgX3Jlc3VsdHMucHVzaChhZGRDaGFyICYmIChjaGFySW5mb1tjaHIyXSA9IGFscGhhKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBhbHBoYUluZGV4W2FscGhhXSA9IFN0cmluZy5mcm9tQ2hhckNvZGUoY2hyKTtcbiAgICAgICAgICAgIF9yZXN1bHRzLnB1c2goYWRkQ2hhciAmJiAoY2hhckluZm9bJyddID0gYWxwaGEpKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBIdG1sNUVudGl0aWVzO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vaHRtbC1lbnRpdGllcy9saWIvaHRtbDUtZW50aXRpZXMuanNcbiAqKiBtb2R1bGUgaWQgPSA0OVxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDEgMlxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gKF9fd2VicGFja19yZXF1aXJlX18oMSkpKDE2Myk7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBkZWxlZ2F0ZWQgLi9ub2RlX21vZHVsZXMvcmVhY3QtcmVkdXgvbGliL2luZGV4LmpzIGZyb20gZGxsLXJlZmVyZW5jZSBsaWJzX2xpYlxuICoqIG1vZHVsZSBpZCA9IDUwXG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAyXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSAoX193ZWJwYWNrX3JlcXVpcmVfXygxKSkoMTE3KTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGRlbGVnYXRlZCAuL25vZGVfbW9kdWxlcy9yZWR1eC9saWIvaW5kZXguanMgZnJvbSBkbGwtcmVmZXJlbmNlIGxpYnNfbGliXG4gKiogbW9kdWxlIGlkID0gNTFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDJcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IGFuc2lIVE1MO1xuXG4vLyBSZWZlcmVuY2UgdG8gaHR0cHM6Ly9naXRodWIuY29tL3NpbmRyZXNvcmh1cy9hbnNpLXJlZ2V4XG52YXIgcmVfYW5zaSA9IC8oPzooPzpcXHUwMDFiXFxbKXxcXHUwMDliKSg/Oig/OlswLTldezEsM30pPyg/Oig/OjtbMC05XXswLDN9KSopP1tBLU18Zi1tXSl8XFx1MDAxYltBLU1dLztcblxudmFyIF9kZWZDb2xvcnMgPSB7XG4gIHJlc2V0OiBbJ2ZmZicsICcwMDAnXSwgLy8gW0ZPUkVHUk9VRF9DT0xPUiwgQkFDS0dST1VORF9DT0xPUl1cbiAgYmxhY2s6ICcwMDAnLFxuICByZWQ6ICdmZjAwMDAnLFxuICBncmVlbjogJzIwOTgwNScsXG4gIHllbGxvdzogJ2U4YmYwMycsXG4gIGJsdWU6ICcwMDAwZmYnLFxuICBtYWdlbnRhOiAnZmYwMGZmJyxcbiAgY3lhbjogJzAwZmZlZScsXG4gIGxpZ2h0Z3JleTogJ2YwZjBmMCcsXG4gIGRhcmtncmV5OiAnODg4J1xufTtcbnZhciBfc3R5bGVzID0ge1xuICAzMDogJ2JsYWNrJyxcbiAgMzE6ICdyZWQnLFxuICAzMjogJ2dyZWVuJyxcbiAgMzM6ICd5ZWxsb3cnLFxuICAzNDogJ2JsdWUnLFxuICAzNTogJ21hZ2VudGEnLFxuICAzNjogJ2N5YW4nLFxuICAzNzogJ2xpZ2h0Z3JleSdcbn07XG52YXIgX29wZW5UYWdzID0ge1xuICAnMSc6ICdmb250LXdlaWdodDpib2xkJywgLy8gYm9sZFxuICAnMic6ICdvcGFjaXR5OjAuOCcsIC8vIGRpbVxuICAnMyc6ICc8aT4nLCAvLyBpdGFsaWNcbiAgJzQnOiAnPHU+JywgLy8gdW5kZXJzY29yZVxuICAnOCc6ICdkaXNwbGF5Om5vbmUnLCAvLyBoaWRkZW5cbiAgJzknOiAnPGRlbD4nLCAvLyBkZWxldGVcbn07XG52YXIgX2Nsb3NlVGFncyA9IHtcbiAgJzIzJzogJzwvaT4nLCAvLyByZXNldCBpdGFsaWNcbiAgJzI0JzogJzwvdT4nLCAvLyByZXNldCB1bmRlcnNjb3JlXG4gICcyOSc6ICc8L2RlbD4nIC8vIHJlc2V0IGRlbGV0ZVxufTtcblswLCAyMSwgMjIsIDI3LCAyOCwgMzksIDQ5XS5mb3JFYWNoKGZ1bmN0aW9uIChuKSB7XG4gIF9jbG9zZVRhZ3Nbbl0gPSAnPC9zcGFuPic7XG59KTtcblxuLyoqXG4gKiBDb252ZXJ0cyB0ZXh0IHdpdGggQU5TSSBjb2xvciBjb2RlcyB0byBIVE1MIG1hcmt1cC5cbiAqIEBwYXJhbSB7U3RyaW5nfSB0ZXh0XG4gKiBAcmV0dXJucyB7Kn1cbiAqL1xuZnVuY3Rpb24gYW5zaUhUTUwodGV4dCkge1xuICAvLyBSZXR1cm5zIHRoZSB0ZXh0IGlmIHRoZSBzdHJpbmcgaGFzIG5vIEFOU0kgZXNjYXBlIGNvZGUuXG4gIGlmICghcmVfYW5zaS50ZXN0KHRleHQpKSB7XG4gICAgcmV0dXJuIHRleHQ7XG4gIH1cblxuICAvLyBDYWNoZSBvcGVuZWQgc2VxdWVuY2UuXG4gIHZhciBhbnNpQ29kZXMgPSBbXTtcbiAgLy8gUmVwbGFjZSB3aXRoIG1hcmt1cC5cbiAgdmFyIHJldCA9IHRleHQucmVwbGFjZSgvXFwwMzNcXFsoXFxkKykqbS9nLCBmdW5jdGlvbiAobWF0Y2gsIHNlcSkge1xuICAgIHZhciBvdCA9IF9vcGVuVGFnc1tzZXFdO1xuICAgIGlmIChvdCkge1xuICAgICAgLy8gSWYgY3VycmVudCBzZXF1ZW5jZSBoYXMgYmVlbiBvcGVuZWQsIGNsb3NlIGl0LlxuICAgICAgaWYgKCEhfmFuc2lDb2Rlcy5pbmRleE9mKHNlcSkpIHtcbiAgICAgICAgYW5zaUNvZGVzLnBvcCgpO1xuICAgICAgICByZXR1cm4gJzwvc3Bhbj4nO1xuICAgICAgfVxuICAgICAgLy8gT3BlbiB0YWcuXG4gICAgICBhbnNpQ29kZXMucHVzaChzZXEpO1xuICAgICAgcmV0dXJuIG90WzBdID09ICc8JyA/IG90IDogJzxzcGFuIHN0eWxlPVwiJyArIG90ICsgJztcIj4nO1xuICAgIH1cblxuICAgIHZhciBjdCA9IF9jbG9zZVRhZ3Nbc2VxXTtcbiAgICBpZiAoY3QpIHtcbiAgICAgIC8vIFBvcCBzZXF1ZW5jZVxuICAgICAgYW5zaUNvZGVzLnBvcCgpO1xuICAgICAgcmV0dXJuIGN0O1xuICAgIH1cbiAgICByZXR1cm4gJyc7XG4gIH0pO1xuXG4gIC8vIE1ha2Ugc3VyZSB0YWdzIGFyZSBjbG9zZWQuXG4gIHZhciBsID0gYW5zaUNvZGVzLmxlbmd0aDtcbiAgKGwgPiAwKSAmJiAocmV0ICs9IEFycmF5KGwgKyAxKS5qb2luKCc8L3NwYW4+JykpO1xuXG4gIHJldHVybiByZXQ7XG59XG5cbi8qKlxuICogQ3VzdG9taXplIGNvbG9ycy5cbiAqIEBwYXJhbSB7T2JqZWN0fSBjb2xvcnMgcmVmZXJlbmNlIHRvIF9kZWZDb2xvcnNcbiAqL1xuYW5zaUhUTUwuc2V0Q29sb3JzID0gZnVuY3Rpb24gKGNvbG9ycykge1xuICBpZiAodHlwZW9mIGNvbG9ycyAhPSAnb2JqZWN0Jykge1xuICAgIHRocm93IG5ldyBFcnJvcignYGNvbG9yc2AgcGFyYW1ldGVyIG11c3QgYmUgYW4gT2JqZWN0LicpO1xuICB9XG5cbiAgdmFyIF9maW5hbENvbG9ycyA9IHt9O1xuICBmb3IgKHZhciBrZXkgaW4gX2RlZkNvbG9ycykge1xuICAgIHZhciBoZXggPSBjb2xvcnMuaGFzT3duUHJvcGVydHkoa2V5KSA/IGNvbG9yc1trZXldIDogbnVsbDtcbiAgICBpZiAoIWhleCkge1xuICAgICAgX2ZpbmFsQ29sb3JzW2tleV0gPSBfZGVmQ29sb3JzW2tleV07XG4gICAgICBjb250aW51ZTtcbiAgICB9XG4gICAgaWYgKCdyZXNldCcgPT0ga2V5KSB7XG4gICAgXHRpZih0eXBlb2YgaGV4ID09ICdzdHJpbmcnKXtcbiAgICBcdFx0aGV4ID0gW2hleF07XG4gICAgXHR9XG4gICAgICBpZiAoIUFycmF5LmlzQXJyYXkoaGV4KSB8fCBoZXgubGVuZ3RoID09IDAgfHwgaGV4LnNvbWUoZnVuY3Rpb24gKGgpIHtcbiAgICAgICAgICByZXR1cm4gdHlwZW9mIGggIT0gJ3N0cmluZyc7XG4gICAgICAgIH0pKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignVGhlIHZhbHVlIG9mIGAnICsga2V5ICsgJ2AgcHJvcGVydHkgbXVzdCBiZSBhbiBBcnJheSBhbmQgZWFjaCBpdGVtIGNvdWxkIG9ubHkgYmUgYSBoZXggc3RyaW5nLCBlLmcuOiBGRjAwMDAnKTtcbiAgICAgIH1cbiAgICAgIHZhciBkZWZIZXhDb2xvciA9IF9kZWZDb2xvcnNba2V5XTtcbiAgICAgIGlmKCFoZXhbMF0pe1xuICAgICAgXHRoZXhbMF0gPSBkZWZIZXhDb2xvclswXTtcbiAgICAgIH1cbiAgICAgIGlmIChoZXgubGVuZ3RoID09IDEgfHwgIWhleFsxXSkge1xuICAgICAgXHRoZXggPSBbaGV4WzBdXTtcbiAgICAgICAgaGV4LnB1c2goZGVmSGV4Q29sb3JbMV0pO1xuICAgICAgfVxuXG4gICAgICBoZXggPSBoZXguc2xpY2UoMCwgMik7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgaGV4ICE9ICdzdHJpbmcnKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoZSB2YWx1ZSBvZiBgJyArIGtleSArICdgIHByb3BlcnR5IG11c3QgYmUgYSBoZXggc3RyaW5nLCBlLmcuOiBGRjAwMDAnKTtcbiAgICB9XG4gICAgX2ZpbmFsQ29sb3JzW2tleV0gPSBoZXg7XG4gIH1cbiAgX3NldFRhZ3MoX2ZpbmFsQ29sb3JzKTtcbn07XG5cbi8qKlxuICogUmVzZXQgY29sb3JzLlxuICovXG5hbnNpSFRNTC5yZXNldCA9IGZ1bmN0aW9uKCl7XG5cdF9zZXRUYWdzKF9kZWZDb2xvcnMpO1xufTtcblxuLyoqXG4gKiBFeHBvc2UgdGFncywgaW5jbHVkaW5nIG9wZW4gYW5kIGNsb3NlLlxuICogQHR5cGUge09iamVjdH1cbiAqL1xuYW5zaUhUTUwudGFncyA9IHtcbiAgZ2V0IG9wZW4oKSB7XG4gICAgcmV0dXJuIF9vcGVuVGFncztcbiAgfSxcbiAgZ2V0IGNsb3NlKCkge1xuICAgIHJldHVybiBfY2xvc2VUYWdzO1xuICB9XG59O1xuXG5mdW5jdGlvbiBfc2V0VGFncyhjb2xvcnMpIHtcbiAgLy8gcmVzZXQgYWxsXG4gIF9vcGVuVGFnc1snMCddID0gJ2ZvbnQtd2VpZ2h0Om5vcm1hbDtvcGFjaXR5OjE7Y29sb3I6IycgKyBjb2xvcnMucmVzZXRbMF0gKyAnO2JhY2tncm91bmQ6IycgKyBjb2xvcnMucmVzZXRbMV07XG4gIC8vIGludmVyc2VcbiAgX29wZW5UYWdzWyc3J10gPSAnY29sb3I6IycgKyBjb2xvcnMucmVzZXRbMV0gKyAnO2JhY2tncm91bmQ6IycgKyBjb2xvcnMucmVzZXRbMF07XG4gIC8vIGRhcmsgZ3JleVxuICBfb3BlblRhZ3NbJzkwJ10gPSAnY29sb3I6IycgKyBjb2xvcnMuZGFya2dyZXk7XG5cbiAgZm9yICh2YXIgY29kZSBpbiBfc3R5bGVzKSB7XG4gICAgdmFyIGNvbG9yID0gX3N0eWxlc1tjb2RlXTtcbiAgICB2YXIgb3JpQ29sb3IgPSBjb2xvcnNbY29sb3JdIHx8ICcwMDAnO1xuICAgIF9vcGVuVGFnc1tjb2RlXSA9ICdjb2xvcjojJyArIG9yaUNvbG9yO1xuICAgIGNvZGUgPSBwYXJzZUludChjb2RlKTtcbiAgICBfb3BlblRhZ3NbKGNvZGUgKyAxMCkudG9TdHJpbmcoKV0gPSAnYmFja2dyb3VuZDojJyArIG9yaUNvbG9yO1xuICB9XG59XG5cbmFuc2lIVE1MLnJlc2V0KCk7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9hbnNpLWh0bWwvaW5kZXguanNcbiAqKiBtb2R1bGUgaWQgPSA1MlxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDEgMlxuICoqLyIsIid1c2Ugc3RyaWN0Jztcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKCkge1xuXHRyZXR1cm4gL1tcXHUwMDFiXFx1MDA5Yl1bWygpIzs/XSooPzpbMC05XXsxLDR9KD86O1swLTldezAsNH0pKik/WzAtOUEtT1JaY2YtbnFyeT0+PF0vZztcbn07XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9hbnNpLXJlZ2V4L2luZGV4LmpzXG4gKiogbW9kdWxlIGlkID0gNTNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDJcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2NyZWF0ZVwiKSwgX19lc01vZHVsZTogdHJ1ZSB9O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3QvY3JlYXRlLmpzXG4gKiogbW9kdWxlIGlkID0gNTRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDJcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L3NldC1wcm90b3R5cGUtb2ZcIiksIF9fZXNNb2R1bGU6IHRydWUgfTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9iYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L3NldC1wcm90b3R5cGUtb2YuanNcbiAqKiBtb2R1bGUgaWQgPSA1NVxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDEgMlxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9zeW1ib2xcIiksIF9fZXNNb2R1bGU6IHRydWUgfTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9iYWJlbC1ydW50aW1lL2NvcmUtanMvc3ltYm9sLmpzXG4gKiogbW9kdWxlIGlkID0gNTZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDJcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vc3ltYm9sL2l0ZXJhdG9yXCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vYmFiZWwtcnVudGltZS9jb3JlLWpzL3N5bWJvbC9pdGVyYXRvci5qc1xuICoqIG1vZHVsZSBpZCA9IDU3XG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAyXG4gKiovIiwicmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYub2JqZWN0LmNyZWF0ZScpO1xudmFyICRPYmplY3QgPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzL19jb3JlJykuT2JqZWN0O1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBjcmVhdGUoUCwgRCl7XG4gIHJldHVybiAkT2JqZWN0LmNyZWF0ZShQLCBEKTtcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9jcmVhdGUuanNcbiAqKiBtb2R1bGUgaWQgPSA1OFxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDEgMlxuICoqLyIsInJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2Lm9iamVjdC5zZXQtcHJvdG90eXBlLW9mJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uLy4uL21vZHVsZXMvX2NvcmUnKS5PYmplY3Quc2V0UHJvdG90eXBlT2Y7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9zZXQtcHJvdG90eXBlLW9mLmpzXG4gKiogbW9kdWxlIGlkID0gNTlcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDJcbiAqKi8iLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5zeW1ib2wnKTtcbnJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2Lm9iamVjdC50by1zdHJpbmcnKTtcbnJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM3LnN5bWJvbC5hc3luYy1pdGVyYXRvcicpO1xucmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczcuc3ltYm9sLm9ic2VydmFibGUnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9fY29yZScpLlN5bWJvbDtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9jb3JlLWpzL2xpYnJhcnkvZm4vc3ltYm9sL2luZGV4LmpzXG4gKiogbW9kdWxlIGlkID0gNjBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDJcbiAqKi8iLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5zdHJpbmcuaXRlcmF0b3InKTtcbnJlcXVpcmUoJy4uLy4uL21vZHVsZXMvd2ViLmRvbS5pdGVyYWJsZScpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzL193a3MtZXh0JykuZignaXRlcmF0b3InKTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9jb3JlLWpzL2xpYnJhcnkvZm4vc3ltYm9sL2l0ZXJhdG9yLmpzXG4gKiogbW9kdWxlIGlkID0gNjFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDJcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgaWYodHlwZW9mIGl0ICE9ICdmdW5jdGlvbicpdGhyb3cgVHlwZUVycm9yKGl0ICsgJyBpcyBub3QgYSBmdW5jdGlvbiEnKTtcbiAgcmV0dXJuIGl0O1xufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYS1mdW5jdGlvbi5qc1xuICoqIG1vZHVsZSBpZCA9IDYyXG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAyXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpeyAvKiBlbXB0eSAqLyB9O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hZGQtdG8tdW5zY29wYWJsZXMuanNcbiAqKiBtb2R1bGUgaWQgPSA2M1xuICoqIG1vZHVsZSBjaHVua3MgPSAwIDEgMlxuICoqLyIsIi8vIGZhbHNlIC0+IEFycmF5I2luZGV4T2Zcbi8vIHRydWUgIC0+IEFycmF5I2luY2x1ZGVzXG52YXIgdG9JT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8taW9iamVjdCcpXG4gICwgdG9MZW5ndGggID0gcmVxdWlyZSgnLi9fdG8tbGVuZ3RoJylcbiAgLCB0b0luZGV4ICAgPSByZXF1aXJlKCcuL190by1pbmRleCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihJU19JTkNMVURFUyl7XG4gIHJldHVybiBmdW5jdGlvbigkdGhpcywgZWwsIGZyb21JbmRleCl7XG4gICAgdmFyIE8gICAgICA9IHRvSU9iamVjdCgkdGhpcylcbiAgICAgICwgbGVuZ3RoID0gdG9MZW5ndGgoTy5sZW5ndGgpXG4gICAgICAsIGluZGV4ICA9IHRvSW5kZXgoZnJvbUluZGV4LCBsZW5ndGgpXG4gICAgICAsIHZhbHVlO1xuICAgIC8vIEFycmF5I2luY2x1ZGVzIHVzZXMgU2FtZVZhbHVlWmVybyBlcXVhbGl0eSBhbGdvcml0aG1cbiAgICBpZihJU19JTkNMVURFUyAmJiBlbCAhPSBlbCl3aGlsZShsZW5ndGggPiBpbmRleCl7XG4gICAgICB2YWx1ZSA9IE9baW5kZXgrK107XG4gICAgICBpZih2YWx1ZSAhPSB2YWx1ZSlyZXR1cm4gdHJ1ZTtcbiAgICAvLyBBcnJheSN0b0luZGV4IGlnbm9yZXMgaG9sZXMsIEFycmF5I2luY2x1ZGVzIC0gbm90XG4gICAgfSBlbHNlIGZvcig7bGVuZ3RoID4gaW5kZXg7IGluZGV4KyspaWYoSVNfSU5DTFVERVMgfHwgaW5kZXggaW4gTyl7XG4gICAgICBpZihPW2luZGV4XSA9PT0gZWwpcmV0dXJuIElTX0lOQ0xVREVTIHx8IGluZGV4IHx8IDA7XG4gICAgfSByZXR1cm4gIUlTX0lOQ0xVREVTICYmIC0xO1xuICB9O1xufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYXJyYXktaW5jbHVkZXMuanNcbiAqKiBtb2R1bGUgaWQgPSA2NFxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDEgMlxuICoqLyIsIi8vIGFsbCBlbnVtZXJhYmxlIG9iamVjdCBrZXlzLCBpbmNsdWRlcyBzeW1ib2xzXG52YXIgZ2V0S2V5cyA9IHJlcXVpcmUoJy4vX29iamVjdC1rZXlzJylcbiAgLCBnT1BTICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWdvcHMnKVxuICAsIHBJRSAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtcGllJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgdmFyIHJlc3VsdCAgICAgPSBnZXRLZXlzKGl0KVxuICAgICwgZ2V0U3ltYm9scyA9IGdPUFMuZjtcbiAgaWYoZ2V0U3ltYm9scyl7XG4gICAgdmFyIHN5bWJvbHMgPSBnZXRTeW1ib2xzKGl0KVxuICAgICAgLCBpc0VudW0gID0gcElFLmZcbiAgICAgICwgaSAgICAgICA9IDBcbiAgICAgICwga2V5O1xuICAgIHdoaWxlKHN5bWJvbHMubGVuZ3RoID4gaSlpZihpc0VudW0uY2FsbChpdCwga2V5ID0gc3ltYm9sc1tpKytdKSlyZXN1bHQucHVzaChrZXkpO1xuICB9IHJldHVybiByZXN1bHQ7XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19lbnVtLWtleXMuanNcbiAqKiBtb2R1bGUgaWQgPSA2NVxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDEgMlxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9fZ2xvYmFsJykuZG9jdW1lbnQgJiYgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19odG1sLmpzXG4gKiogbW9kdWxlIGlkID0gNjZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDJcbiAqKi8iLCIvLyBmYWxsYmFjayBmb3Igbm9uLWFycmF5LWxpa2UgRVMzIGFuZCBub24tZW51bWVyYWJsZSBvbGQgVjggc3RyaW5nc1xudmFyIGNvZiA9IHJlcXVpcmUoJy4vX2NvZicpO1xubW9kdWxlLmV4cG9ydHMgPSBPYmplY3QoJ3onKS5wcm9wZXJ0eUlzRW51bWVyYWJsZSgwKSA/IE9iamVjdCA6IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIGNvZihpdCkgPT0gJ1N0cmluZycgPyBpdC5zcGxpdCgnJykgOiBPYmplY3QoaXQpO1xufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faW9iamVjdC5qc1xuICoqIG1vZHVsZSBpZCA9IDY3XG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAyXG4gKiovIiwiLy8gNy4yLjIgSXNBcnJheShhcmd1bWVudClcbnZhciBjb2YgPSByZXF1aXJlKCcuL19jb2YnKTtcbm1vZHVsZS5leHBvcnRzID0gQXJyYXkuaXNBcnJheSB8fCBmdW5jdGlvbiBpc0FycmF5KGFyZyl7XG4gIHJldHVybiBjb2YoYXJnKSA9PSAnQXJyYXknO1xufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXMtYXJyYXkuanNcbiAqKiBtb2R1bGUgaWQgPSA2OFxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDEgMlxuICoqLyIsIid1c2Ugc3RyaWN0JztcbnZhciBjcmVhdGUgICAgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1jcmVhdGUnKVxuICAsIGRlc2NyaXB0b3IgICAgID0gcmVxdWlyZSgnLi9fcHJvcGVydHktZGVzYycpXG4gICwgc2V0VG9TdHJpbmdUYWcgPSByZXF1aXJlKCcuL19zZXQtdG8tc3RyaW5nLXRhZycpXG4gICwgSXRlcmF0b3JQcm90b3R5cGUgPSB7fTtcblxuLy8gMjUuMS4yLjEuMSAlSXRlcmF0b3JQcm90b3R5cGUlW0BAaXRlcmF0b3JdKClcbnJlcXVpcmUoJy4vX2hpZGUnKShJdGVyYXRvclByb3RvdHlwZSwgcmVxdWlyZSgnLi9fd2tzJykoJ2l0ZXJhdG9yJyksIGZ1bmN0aW9uKCl7IHJldHVybiB0aGlzOyB9KTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihDb25zdHJ1Y3RvciwgTkFNRSwgbmV4dCl7XG4gIENvbnN0cnVjdG9yLnByb3RvdHlwZSA9IGNyZWF0ZShJdGVyYXRvclByb3RvdHlwZSwge25leHQ6IGRlc2NyaXB0b3IoMSwgbmV4dCl9KTtcbiAgc2V0VG9TdHJpbmdUYWcoQ29uc3RydWN0b3IsIE5BTUUgKyAnIEl0ZXJhdG9yJyk7XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pdGVyLWNyZWF0ZS5qc1xuICoqIG1vZHVsZSBpZCA9IDY5XG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAyXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihkb25lLCB2YWx1ZSl7XG4gIHJldHVybiB7dmFsdWU6IHZhbHVlLCBkb25lOiAhIWRvbmV9O1xufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXRlci1zdGVwLmpzXG4gKiogbW9kdWxlIGlkID0gNzBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDJcbiAqKi8iLCJ2YXIgZ2V0S2V5cyAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWtleXMnKVxuICAsIHRvSU9iamVjdCA9IHJlcXVpcmUoJy4vX3RvLWlvYmplY3QnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24ob2JqZWN0LCBlbCl7XG4gIHZhciBPICAgICAgPSB0b0lPYmplY3Qob2JqZWN0KVxuICAgICwga2V5cyAgID0gZ2V0S2V5cyhPKVxuICAgICwgbGVuZ3RoID0ga2V5cy5sZW5ndGhcbiAgICAsIGluZGV4ICA9IDBcbiAgICAsIGtleTtcbiAgd2hpbGUobGVuZ3RoID4gaW5kZXgpaWYoT1trZXkgPSBrZXlzW2luZGV4KytdXSA9PT0gZWwpcmV0dXJuIGtleTtcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2tleW9mLmpzXG4gKiogbW9kdWxlIGlkID0gNzFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDJcbiAqKi8iLCJ2YXIgTUVUQSAgICAgPSByZXF1aXJlKCcuL191aWQnKSgnbWV0YScpXG4gICwgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKVxuICAsIGhhcyAgICAgID0gcmVxdWlyZSgnLi9faGFzJylcbiAgLCBzZXREZXNjICA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpLmZcbiAgLCBpZCAgICAgICA9IDA7XG52YXIgaXNFeHRlbnNpYmxlID0gT2JqZWN0LmlzRXh0ZW5zaWJsZSB8fCBmdW5jdGlvbigpe1xuICByZXR1cm4gdHJ1ZTtcbn07XG52YXIgRlJFRVpFID0gIXJlcXVpcmUoJy4vX2ZhaWxzJykoZnVuY3Rpb24oKXtcbiAgcmV0dXJuIGlzRXh0ZW5zaWJsZShPYmplY3QucHJldmVudEV4dGVuc2lvbnMoe30pKTtcbn0pO1xudmFyIHNldE1ldGEgPSBmdW5jdGlvbihpdCl7XG4gIHNldERlc2MoaXQsIE1FVEEsIHt2YWx1ZToge1xuICAgIGk6ICdPJyArICsraWQsIC8vIG9iamVjdCBJRFxuICAgIHc6IHt9ICAgICAgICAgIC8vIHdlYWsgY29sbGVjdGlvbnMgSURzXG4gIH19KTtcbn07XG52YXIgZmFzdEtleSA9IGZ1bmN0aW9uKGl0LCBjcmVhdGUpe1xuICAvLyByZXR1cm4gcHJpbWl0aXZlIHdpdGggcHJlZml4XG4gIGlmKCFpc09iamVjdChpdCkpcmV0dXJuIHR5cGVvZiBpdCA9PSAnc3ltYm9sJyA/IGl0IDogKHR5cGVvZiBpdCA9PSAnc3RyaW5nJyA/ICdTJyA6ICdQJykgKyBpdDtcbiAgaWYoIWhhcyhpdCwgTUVUQSkpe1xuICAgIC8vIGNhbid0IHNldCBtZXRhZGF0YSB0byB1bmNhdWdodCBmcm96ZW4gb2JqZWN0XG4gICAgaWYoIWlzRXh0ZW5zaWJsZShpdCkpcmV0dXJuICdGJztcbiAgICAvLyBub3QgbmVjZXNzYXJ5IHRvIGFkZCBtZXRhZGF0YVxuICAgIGlmKCFjcmVhdGUpcmV0dXJuICdFJztcbiAgICAvLyBhZGQgbWlzc2luZyBtZXRhZGF0YVxuICAgIHNldE1ldGEoaXQpO1xuICAvLyByZXR1cm4gb2JqZWN0IElEXG4gIH0gcmV0dXJuIGl0W01FVEFdLmk7XG59O1xudmFyIGdldFdlYWsgPSBmdW5jdGlvbihpdCwgY3JlYXRlKXtcbiAgaWYoIWhhcyhpdCwgTUVUQSkpe1xuICAgIC8vIGNhbid0IHNldCBtZXRhZGF0YSB0byB1bmNhdWdodCBmcm96ZW4gb2JqZWN0XG4gICAgaWYoIWlzRXh0ZW5zaWJsZShpdCkpcmV0dXJuIHRydWU7XG4gICAgLy8gbm90IG5lY2Vzc2FyeSB0byBhZGQgbWV0YWRhdGFcbiAgICBpZighY3JlYXRlKXJldHVybiBmYWxzZTtcbiAgICAvLyBhZGQgbWlzc2luZyBtZXRhZGF0YVxuICAgIHNldE1ldGEoaXQpO1xuICAvLyByZXR1cm4gaGFzaCB3ZWFrIGNvbGxlY3Rpb25zIElEc1xuICB9IHJldHVybiBpdFtNRVRBXS53O1xufTtcbi8vIGFkZCBtZXRhZGF0YSBvbiBmcmVlemUtZmFtaWx5IG1ldGhvZHMgY2FsbGluZ1xudmFyIG9uRnJlZXplID0gZnVuY3Rpb24oaXQpe1xuICBpZihGUkVFWkUgJiYgbWV0YS5ORUVEICYmIGlzRXh0ZW5zaWJsZShpdCkgJiYgIWhhcyhpdCwgTUVUQSkpc2V0TWV0YShpdCk7XG4gIHJldHVybiBpdDtcbn07XG52YXIgbWV0YSA9IG1vZHVsZS5leHBvcnRzID0ge1xuICBLRVk6ICAgICAgTUVUQSxcbiAgTkVFRDogICAgIGZhbHNlLFxuICBmYXN0S2V5OiAgZmFzdEtleSxcbiAgZ2V0V2VhazogIGdldFdlYWssXG4gIG9uRnJlZXplOiBvbkZyZWV6ZVxufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fbWV0YS5qc1xuICoqIG1vZHVsZSBpZCA9IDcyXG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAyXG4gKiovIiwidmFyIGRQICAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJylcbiAgLCBhbk9iamVjdCA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpXG4gICwgZ2V0S2V5cyAgPSByZXF1aXJlKCcuL19vYmplY3Qta2V5cycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgPyBPYmplY3QuZGVmaW5lUHJvcGVydGllcyA6IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXMoTywgUHJvcGVydGllcyl7XG4gIGFuT2JqZWN0KE8pO1xuICB2YXIga2V5cyAgID0gZ2V0S2V5cyhQcm9wZXJ0aWVzKVxuICAgICwgbGVuZ3RoID0ga2V5cy5sZW5ndGhcbiAgICAsIGkgPSAwXG4gICAgLCBQO1xuICB3aGlsZShsZW5ndGggPiBpKWRQLmYoTywgUCA9IGtleXNbaSsrXSwgUHJvcGVydGllc1tQXSk7XG4gIHJldHVybiBPO1xufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWRwcy5qc1xuICoqIG1vZHVsZSBpZCA9IDczXG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAyXG4gKiovIiwiLy8gZmFsbGJhY2sgZm9yIElFMTEgYnVnZ3kgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMgd2l0aCBpZnJhbWUgYW5kIHdpbmRvd1xudmFyIHRvSU9iamVjdCA9IHJlcXVpcmUoJy4vX3RvLWlvYmplY3QnKVxuICAsIGdPUE4gICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1nb3BuJykuZlxuICAsIHRvU3RyaW5nICA9IHt9LnRvU3RyaW5nO1xuXG52YXIgd2luZG93TmFtZXMgPSB0eXBlb2Ygd2luZG93ID09ICdvYmplY3QnICYmIHdpbmRvdyAmJiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lc1xuICA/IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHdpbmRvdykgOiBbXTtcblxudmFyIGdldFdpbmRvd05hbWVzID0gZnVuY3Rpb24oaXQpe1xuICB0cnkge1xuICAgIHJldHVybiBnT1BOKGl0KTtcbiAgfSBjYXRjaChlKXtcbiAgICByZXR1cm4gd2luZG93TmFtZXMuc2xpY2UoKTtcbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMuZiA9IGZ1bmN0aW9uIGdldE93blByb3BlcnR5TmFtZXMoaXQpe1xuICByZXR1cm4gd2luZG93TmFtZXMgJiYgdG9TdHJpbmcuY2FsbChpdCkgPT0gJ1tvYmplY3QgV2luZG93XScgPyBnZXRXaW5kb3dOYW1lcyhpdCkgOiBnT1BOKHRvSU9iamVjdChpdCkpO1xufTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZ29wbi1leHQuanNcbiAqKiBtb2R1bGUgaWQgPSA3NFxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDEgMlxuICoqLyIsIi8vIDE5LjEuMi45IC8gMTUuMi4zLjIgT2JqZWN0LmdldFByb3RvdHlwZU9mKE8pXG52YXIgaGFzICAgICAgICAgPSByZXF1aXJlKCcuL19oYXMnKVxuICAsIHRvT2JqZWN0ICAgID0gcmVxdWlyZSgnLi9fdG8tb2JqZWN0JylcbiAgLCBJRV9QUk9UTyAgICA9IHJlcXVpcmUoJy4vX3NoYXJlZC1rZXknKSgnSUVfUFJPVE8nKVxuICAsIE9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxubW9kdWxlLmV4cG9ydHMgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YgfHwgZnVuY3Rpb24oTyl7XG4gIE8gPSB0b09iamVjdChPKTtcbiAgaWYoaGFzKE8sIElFX1BST1RPKSlyZXR1cm4gT1tJRV9QUk9UT107XG4gIGlmKHR5cGVvZiBPLmNvbnN0cnVjdG9yID09ICdmdW5jdGlvbicgJiYgTyBpbnN0YW5jZW9mIE8uY29uc3RydWN0b3Ipe1xuICAgIHJldHVybiBPLmNvbnN0cnVjdG9yLnByb3RvdHlwZTtcbiAgfSByZXR1cm4gTyBpbnN0YW5jZW9mIE9iamVjdCA/IE9iamVjdFByb3RvIDogbnVsbDtcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1ncG8uanNcbiAqKiBtb2R1bGUgaWQgPSA3NVxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDEgMlxuICoqLyIsIi8vIFdvcmtzIHdpdGggX19wcm90b19fIG9ubHkuIE9sZCB2OCBjYW4ndCB3b3JrIHdpdGggbnVsbCBwcm90byBvYmplY3RzLlxuLyogZXNsaW50LWRpc2FibGUgbm8tcHJvdG8gKi9cbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpXG4gICwgYW5PYmplY3QgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKTtcbnZhciBjaGVjayA9IGZ1bmN0aW9uKE8sIHByb3RvKXtcbiAgYW5PYmplY3QoTyk7XG4gIGlmKCFpc09iamVjdChwcm90bykgJiYgcHJvdG8gIT09IG51bGwpdGhyb3cgVHlwZUVycm9yKHByb3RvICsgXCI6IGNhbid0IHNldCBhcyBwcm90b3R5cGUhXCIpO1xufTtcbm1vZHVsZS5leHBvcnRzID0ge1xuICBzZXQ6IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fCAoJ19fcHJvdG9fXycgaW4ge30gPyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgZnVuY3Rpb24odGVzdCwgYnVnZ3ksIHNldCl7XG4gICAgICB0cnkge1xuICAgICAgICBzZXQgPSByZXF1aXJlKCcuL19jdHgnKShGdW5jdGlvbi5jYWxsLCByZXF1aXJlKCcuL19vYmplY3QtZ29wZCcpLmYoT2JqZWN0LnByb3RvdHlwZSwgJ19fcHJvdG9fXycpLnNldCwgMik7XG4gICAgICAgIHNldCh0ZXN0LCBbXSk7XG4gICAgICAgIGJ1Z2d5ID0gISh0ZXN0IGluc3RhbmNlb2YgQXJyYXkpO1xuICAgICAgfSBjYXRjaChlKXsgYnVnZ3kgPSB0cnVlOyB9XG4gICAgICByZXR1cm4gZnVuY3Rpb24gc2V0UHJvdG90eXBlT2YoTywgcHJvdG8pe1xuICAgICAgICBjaGVjayhPLCBwcm90byk7XG4gICAgICAgIGlmKGJ1Z2d5KU8uX19wcm90b19fID0gcHJvdG87XG4gICAgICAgIGVsc2Ugc2V0KE8sIHByb3RvKTtcbiAgICAgICAgcmV0dXJuIE87XG4gICAgICB9O1xuICAgIH0oe30sIGZhbHNlKSA6IHVuZGVmaW5lZCksXG4gIGNoZWNrOiBjaGVja1xufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc2V0LXByb3RvLmpzXG4gKiogbW9kdWxlIGlkID0gNzZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDJcbiAqKi8iLCJ2YXIgdG9JbnRlZ2VyID0gcmVxdWlyZSgnLi9fdG8taW50ZWdlcicpXG4gICwgZGVmaW5lZCAgID0gcmVxdWlyZSgnLi9fZGVmaW5lZCcpO1xuLy8gdHJ1ZSAgLT4gU3RyaW5nI2F0XG4vLyBmYWxzZSAtPiBTdHJpbmcjY29kZVBvaW50QXRcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oVE9fU1RSSU5HKXtcbiAgcmV0dXJuIGZ1bmN0aW9uKHRoYXQsIHBvcyl7XG4gICAgdmFyIHMgPSBTdHJpbmcoZGVmaW5lZCh0aGF0KSlcbiAgICAgICwgaSA9IHRvSW50ZWdlcihwb3MpXG4gICAgICAsIGwgPSBzLmxlbmd0aFxuICAgICAgLCBhLCBiO1xuICAgIGlmKGkgPCAwIHx8IGkgPj0gbClyZXR1cm4gVE9fU1RSSU5HID8gJycgOiB1bmRlZmluZWQ7XG4gICAgYSA9IHMuY2hhckNvZGVBdChpKTtcbiAgICByZXR1cm4gYSA8IDB4ZDgwMCB8fCBhID4gMHhkYmZmIHx8IGkgKyAxID09PSBsIHx8IChiID0gcy5jaGFyQ29kZUF0KGkgKyAxKSkgPCAweGRjMDAgfHwgYiA+IDB4ZGZmZlxuICAgICAgPyBUT19TVFJJTkcgPyBzLmNoYXJBdChpKSA6IGFcbiAgICAgIDogVE9fU1RSSU5HID8gcy5zbGljZShpLCBpICsgMikgOiAoYSAtIDB4ZDgwMCA8PCAxMCkgKyAoYiAtIDB4ZGMwMCkgKyAweDEwMDAwO1xuICB9O1xufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc3RyaW5nLWF0LmpzXG4gKiogbW9kdWxlIGlkID0gNzdcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDJcbiAqKi8iLCJ2YXIgdG9JbnRlZ2VyID0gcmVxdWlyZSgnLi9fdG8taW50ZWdlcicpXG4gICwgbWF4ICAgICAgID0gTWF0aC5tYXhcbiAgLCBtaW4gICAgICAgPSBNYXRoLm1pbjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaW5kZXgsIGxlbmd0aCl7XG4gIGluZGV4ID0gdG9JbnRlZ2VyKGluZGV4KTtcbiAgcmV0dXJuIGluZGV4IDwgMCA/IG1heChpbmRleCArIGxlbmd0aCwgMCkgOiBtaW4oaW5kZXgsIGxlbmd0aCk7XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1pbmRleC5qc1xuICoqIG1vZHVsZSBpZCA9IDc4XG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAyXG4gKiovIiwiLy8gNy4xLjE1IFRvTGVuZ3RoXG52YXIgdG9JbnRlZ2VyID0gcmVxdWlyZSgnLi9fdG8taW50ZWdlcicpXG4gICwgbWluICAgICAgID0gTWF0aC5taW47XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIGl0ID4gMCA/IG1pbih0b0ludGVnZXIoaXQpLCAweDFmZmZmZmZmZmZmZmZmKSA6IDA7IC8vIHBvdygyLCA1MykgLSAxID09IDkwMDcxOTkyNTQ3NDA5OTFcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLWxlbmd0aC5qc1xuICoqIG1vZHVsZSBpZCA9IDc5XG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAyXG4gKiovIiwiLy8gNy4xLjEzIFRvT2JqZWN0KGFyZ3VtZW50KVxudmFyIGRlZmluZWQgPSByZXF1aXJlKCcuL19kZWZpbmVkJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIE9iamVjdChkZWZpbmVkKGl0KSk7XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1vYmplY3QuanNcbiAqKiBtb2R1bGUgaWQgPSA4MFxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDEgMlxuICoqLyIsIid1c2Ugc3RyaWN0JztcbnZhciBhZGRUb1Vuc2NvcGFibGVzID0gcmVxdWlyZSgnLi9fYWRkLXRvLXVuc2NvcGFibGVzJylcbiAgLCBzdGVwICAgICAgICAgICAgID0gcmVxdWlyZSgnLi9faXRlci1zdGVwJylcbiAgLCBJdGVyYXRvcnMgICAgICAgID0gcmVxdWlyZSgnLi9faXRlcmF0b3JzJylcbiAgLCB0b0lPYmplY3QgICAgICAgID0gcmVxdWlyZSgnLi9fdG8taW9iamVjdCcpO1xuXG4vLyAyMi4xLjMuNCBBcnJheS5wcm90b3R5cGUuZW50cmllcygpXG4vLyAyMi4xLjMuMTMgQXJyYXkucHJvdG90eXBlLmtleXMoKVxuLy8gMjIuMS4zLjI5IEFycmF5LnByb3RvdHlwZS52YWx1ZXMoKVxuLy8gMjIuMS4zLjMwIEFycmF5LnByb3RvdHlwZVtAQGl0ZXJhdG9yXSgpXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vX2l0ZXItZGVmaW5lJykoQXJyYXksICdBcnJheScsIGZ1bmN0aW9uKGl0ZXJhdGVkLCBraW5kKXtcbiAgdGhpcy5fdCA9IHRvSU9iamVjdChpdGVyYXRlZCk7IC8vIHRhcmdldFxuICB0aGlzLl9pID0gMDsgICAgICAgICAgICAgICAgICAgLy8gbmV4dCBpbmRleFxuICB0aGlzLl9rID0ga2luZDsgICAgICAgICAgICAgICAgLy8ga2luZFxuLy8gMjIuMS41LjIuMSAlQXJyYXlJdGVyYXRvclByb3RvdHlwZSUubmV4dCgpXG59LCBmdW5jdGlvbigpe1xuICB2YXIgTyAgICAgPSB0aGlzLl90XG4gICAgLCBraW5kICA9IHRoaXMuX2tcbiAgICAsIGluZGV4ID0gdGhpcy5faSsrO1xuICBpZighTyB8fCBpbmRleCA+PSBPLmxlbmd0aCl7XG4gICAgdGhpcy5fdCA9IHVuZGVmaW5lZDtcbiAgICByZXR1cm4gc3RlcCgxKTtcbiAgfVxuICBpZihraW5kID09ICdrZXlzJyAgKXJldHVybiBzdGVwKDAsIGluZGV4KTtcbiAgaWYoa2luZCA9PSAndmFsdWVzJylyZXR1cm4gc3RlcCgwLCBPW2luZGV4XSk7XG4gIHJldHVybiBzdGVwKDAsIFtpbmRleCwgT1tpbmRleF1dKTtcbn0sICd2YWx1ZXMnKTtcblxuLy8gYXJndW1lbnRzTGlzdFtAQGl0ZXJhdG9yXSBpcyAlQXJyYXlQcm90b192YWx1ZXMlICg5LjQuNC42LCA5LjQuNC43KVxuSXRlcmF0b3JzLkFyZ3VtZW50cyA9IEl0ZXJhdG9ycy5BcnJheTtcblxuYWRkVG9VbnNjb3BhYmxlcygna2V5cycpO1xuYWRkVG9VbnNjb3BhYmxlcygndmFsdWVzJyk7XG5hZGRUb1Vuc2NvcGFibGVzKCdlbnRyaWVzJyk7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2LmFycmF5Lml0ZXJhdG9yLmpzXG4gKiogbW9kdWxlIGlkID0gODFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDJcbiAqKi8iLCJ2YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpXG4vLyAxOS4xLjIuMiAvIDE1LjIuMy41IE9iamVjdC5jcmVhdGUoTyBbLCBQcm9wZXJ0aWVzXSlcbiRleHBvcnQoJGV4cG9ydC5TLCAnT2JqZWN0Jywge2NyZWF0ZTogcmVxdWlyZSgnLi9fb2JqZWN0LWNyZWF0ZScpfSk7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC5jcmVhdGUuanNcbiAqKiBtb2R1bGUgaWQgPSA4MlxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDEgMlxuICoqLyIsIi8vIDE5LjEuMy4xOSBPYmplY3Quc2V0UHJvdG90eXBlT2YoTywgcHJvdG8pXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xuJGV4cG9ydCgkZXhwb3J0LlMsICdPYmplY3QnLCB7c2V0UHJvdG90eXBlT2Y6IHJlcXVpcmUoJy4vX3NldC1wcm90bycpLnNldH0pO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5vYmplY3Quc2V0LXByb3RvdHlwZS1vZi5qc1xuICoqIG1vZHVsZSBpZCA9IDgzXG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAyXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xudmFyICRhdCAgPSByZXF1aXJlKCcuL19zdHJpbmctYXQnKSh0cnVlKTtcblxuLy8gMjEuMS4zLjI3IFN0cmluZy5wcm90b3R5cGVbQEBpdGVyYXRvcl0oKVxucmVxdWlyZSgnLi9faXRlci1kZWZpbmUnKShTdHJpbmcsICdTdHJpbmcnLCBmdW5jdGlvbihpdGVyYXRlZCl7XG4gIHRoaXMuX3QgPSBTdHJpbmcoaXRlcmF0ZWQpOyAvLyB0YXJnZXRcbiAgdGhpcy5faSA9IDA7ICAgICAgICAgICAgICAgIC8vIG5leHQgaW5kZXhcbi8vIDIxLjEuNS4yLjEgJVN0cmluZ0l0ZXJhdG9yUHJvdG90eXBlJS5uZXh0KClcbn0sIGZ1bmN0aW9uKCl7XG4gIHZhciBPICAgICA9IHRoaXMuX3RcbiAgICAsIGluZGV4ID0gdGhpcy5faVxuICAgICwgcG9pbnQ7XG4gIGlmKGluZGV4ID49IE8ubGVuZ3RoKXJldHVybiB7dmFsdWU6IHVuZGVmaW5lZCwgZG9uZTogdHJ1ZX07XG4gIHBvaW50ID0gJGF0KE8sIGluZGV4KTtcbiAgdGhpcy5faSArPSBwb2ludC5sZW5ndGg7XG4gIHJldHVybiB7dmFsdWU6IHBvaW50LCBkb25lOiBmYWxzZX07XG59KTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYuc3RyaW5nLml0ZXJhdG9yLmpzXG4gKiogbW9kdWxlIGlkID0gODVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDJcbiAqKi8iLCIndXNlIHN0cmljdCc7XG4vLyBFQ01BU2NyaXB0IDYgc3ltYm9scyBzaGltXG52YXIgZ2xvYmFsICAgICAgICAgPSByZXF1aXJlKCcuL19nbG9iYWwnKVxuICAsIGhhcyAgICAgICAgICAgID0gcmVxdWlyZSgnLi9faGFzJylcbiAgLCBERVNDUklQVE9SUyAgICA9IHJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJylcbiAgLCAkZXhwb3J0ICAgICAgICA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpXG4gICwgcmVkZWZpbmUgICAgICAgPSByZXF1aXJlKCcuL19yZWRlZmluZScpXG4gICwgTUVUQSAgICAgICAgICAgPSByZXF1aXJlKCcuL19tZXRhJykuS0VZXG4gICwgJGZhaWxzICAgICAgICAgPSByZXF1aXJlKCcuL19mYWlscycpXG4gICwgc2hhcmVkICAgICAgICAgPSByZXF1aXJlKCcuL19zaGFyZWQnKVxuICAsIHNldFRvU3RyaW5nVGFnID0gcmVxdWlyZSgnLi9fc2V0LXRvLXN0cmluZy10YWcnKVxuICAsIHVpZCAgICAgICAgICAgID0gcmVxdWlyZSgnLi9fdWlkJylcbiAgLCB3a3MgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX3drcycpXG4gICwgd2tzRXh0ICAgICAgICAgPSByZXF1aXJlKCcuL193a3MtZXh0JylcbiAgLCB3a3NEZWZpbmUgICAgICA9IHJlcXVpcmUoJy4vX3drcy1kZWZpbmUnKVxuICAsIGtleU9mICAgICAgICAgID0gcmVxdWlyZSgnLi9fa2V5b2YnKVxuICAsIGVudW1LZXlzICAgICAgID0gcmVxdWlyZSgnLi9fZW51bS1rZXlzJylcbiAgLCBpc0FycmF5ICAgICAgICA9IHJlcXVpcmUoJy4vX2lzLWFycmF5JylcbiAgLCBhbk9iamVjdCAgICAgICA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpXG4gICwgdG9JT2JqZWN0ICAgICAgPSByZXF1aXJlKCcuL190by1pb2JqZWN0JylcbiAgLCB0b1ByaW1pdGl2ZSAgICA9IHJlcXVpcmUoJy4vX3RvLXByaW1pdGl2ZScpXG4gICwgY3JlYXRlRGVzYyAgICAgPSByZXF1aXJlKCcuL19wcm9wZXJ0eS1kZXNjJylcbiAgLCBfY3JlYXRlICAgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1jcmVhdGUnKVxuICAsIGdPUE5FeHQgICAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWdvcG4tZXh0JylcbiAgLCAkR09QRCAgICAgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1nb3BkJylcbiAgLCAkRFAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpXG4gICwgJGtleXMgICAgICAgICAgPSByZXF1aXJlKCcuL19vYmplY3Qta2V5cycpXG4gICwgZ09QRCAgICAgICAgICAgPSAkR09QRC5mXG4gICwgZFAgICAgICAgICAgICAgPSAkRFAuZlxuICAsIGdPUE4gICAgICAgICAgID0gZ09QTkV4dC5mXG4gICwgJFN5bWJvbCAgICAgICAgPSBnbG9iYWwuU3ltYm9sXG4gICwgJEpTT04gICAgICAgICAgPSBnbG9iYWwuSlNPTlxuICAsIF9zdHJpbmdpZnkgICAgID0gJEpTT04gJiYgJEpTT04uc3RyaW5naWZ5XG4gICwgUFJPVE9UWVBFICAgICAgPSAncHJvdG90eXBlJ1xuICAsIEhJRERFTiAgICAgICAgID0gd2tzKCdfaGlkZGVuJylcbiAgLCBUT19QUklNSVRJVkUgICA9IHdrcygndG9QcmltaXRpdmUnKVxuICAsIGlzRW51bSAgICAgICAgID0ge30ucHJvcGVydHlJc0VudW1lcmFibGVcbiAgLCBTeW1ib2xSZWdpc3RyeSA9IHNoYXJlZCgnc3ltYm9sLXJlZ2lzdHJ5JylcbiAgLCBBbGxTeW1ib2xzICAgICA9IHNoYXJlZCgnc3ltYm9scycpXG4gICwgT1BTeW1ib2xzICAgICAgPSBzaGFyZWQoJ29wLXN5bWJvbHMnKVxuICAsIE9iamVjdFByb3RvICAgID0gT2JqZWN0W1BST1RPVFlQRV1cbiAgLCBVU0VfTkFUSVZFICAgICA9IHR5cGVvZiAkU3ltYm9sID09ICdmdW5jdGlvbidcbiAgLCBRT2JqZWN0ICAgICAgICA9IGdsb2JhbC5RT2JqZWN0O1xuLy8gRG9uJ3QgdXNlIHNldHRlcnMgaW4gUXQgU2NyaXB0LCBodHRwczovL2dpdGh1Yi5jb20vemxvaXJvY2svY29yZS1qcy9pc3N1ZXMvMTczXG52YXIgc2V0dGVyID0gIVFPYmplY3QgfHwgIVFPYmplY3RbUFJPVE9UWVBFXSB8fCAhUU9iamVjdFtQUk9UT1RZUEVdLmZpbmRDaGlsZDtcblxuLy8gZmFsbGJhY2sgZm9yIG9sZCBBbmRyb2lkLCBodHRwczovL2NvZGUuZ29vZ2xlLmNvbS9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9Njg3XG52YXIgc2V0U3ltYm9sRGVzYyA9IERFU0NSSVBUT1JTICYmICRmYWlscyhmdW5jdGlvbigpe1xuICByZXR1cm4gX2NyZWF0ZShkUCh7fSwgJ2EnLCB7XG4gICAgZ2V0OiBmdW5jdGlvbigpeyByZXR1cm4gZFAodGhpcywgJ2EnLCB7dmFsdWU6IDd9KS5hOyB9XG4gIH0pKS5hICE9IDc7XG59KSA/IGZ1bmN0aW9uKGl0LCBrZXksIEQpe1xuICB2YXIgcHJvdG9EZXNjID0gZ09QRChPYmplY3RQcm90bywga2V5KTtcbiAgaWYocHJvdG9EZXNjKWRlbGV0ZSBPYmplY3RQcm90b1trZXldO1xuICBkUChpdCwga2V5LCBEKTtcbiAgaWYocHJvdG9EZXNjICYmIGl0ICE9PSBPYmplY3RQcm90bylkUChPYmplY3RQcm90bywga2V5LCBwcm90b0Rlc2MpO1xufSA6IGRQO1xuXG52YXIgd3JhcCA9IGZ1bmN0aW9uKHRhZyl7XG4gIHZhciBzeW0gPSBBbGxTeW1ib2xzW3RhZ10gPSBfY3JlYXRlKCRTeW1ib2xbUFJPVE9UWVBFXSk7XG4gIHN5bS5fayA9IHRhZztcbiAgcmV0dXJuIHN5bTtcbn07XG5cbnZhciBpc1N5bWJvbCA9IFVTRV9OQVRJVkUgJiYgdHlwZW9mICRTeW1ib2wuaXRlcmF0b3IgPT0gJ3N5bWJvbCcgPyBmdW5jdGlvbihpdCl7XG4gIHJldHVybiB0eXBlb2YgaXQgPT0gJ3N5bWJvbCc7XG59IDogZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gaXQgaW5zdGFuY2VvZiAkU3ltYm9sO1xufTtcblxudmFyICRkZWZpbmVQcm9wZXJ0eSA9IGZ1bmN0aW9uIGRlZmluZVByb3BlcnR5KGl0LCBrZXksIEQpe1xuICBpZihpdCA9PT0gT2JqZWN0UHJvdG8pJGRlZmluZVByb3BlcnR5KE9QU3ltYm9scywga2V5LCBEKTtcbiAgYW5PYmplY3QoaXQpO1xuICBrZXkgPSB0b1ByaW1pdGl2ZShrZXksIHRydWUpO1xuICBhbk9iamVjdChEKTtcbiAgaWYoaGFzKEFsbFN5bWJvbHMsIGtleSkpe1xuICAgIGlmKCFELmVudW1lcmFibGUpe1xuICAgICAgaWYoIWhhcyhpdCwgSElEREVOKSlkUChpdCwgSElEREVOLCBjcmVhdGVEZXNjKDEsIHt9KSk7XG4gICAgICBpdFtISURERU5dW2tleV0gPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZihoYXMoaXQsIEhJRERFTikgJiYgaXRbSElEREVOXVtrZXldKWl0W0hJRERFTl1ba2V5XSA9IGZhbHNlO1xuICAgICAgRCA9IF9jcmVhdGUoRCwge2VudW1lcmFibGU6IGNyZWF0ZURlc2MoMCwgZmFsc2UpfSk7XG4gICAgfSByZXR1cm4gc2V0U3ltYm9sRGVzYyhpdCwga2V5LCBEKTtcbiAgfSByZXR1cm4gZFAoaXQsIGtleSwgRCk7XG59O1xudmFyICRkZWZpbmVQcm9wZXJ0aWVzID0gZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyhpdCwgUCl7XG4gIGFuT2JqZWN0KGl0KTtcbiAgdmFyIGtleXMgPSBlbnVtS2V5cyhQID0gdG9JT2JqZWN0KFApKVxuICAgICwgaSAgICA9IDBcbiAgICAsIGwgPSBrZXlzLmxlbmd0aFxuICAgICwga2V5O1xuICB3aGlsZShsID4gaSkkZGVmaW5lUHJvcGVydHkoaXQsIGtleSA9IGtleXNbaSsrXSwgUFtrZXldKTtcbiAgcmV0dXJuIGl0O1xufTtcbnZhciAkY3JlYXRlID0gZnVuY3Rpb24gY3JlYXRlKGl0LCBQKXtcbiAgcmV0dXJuIFAgPT09IHVuZGVmaW5lZCA/IF9jcmVhdGUoaXQpIDogJGRlZmluZVByb3BlcnRpZXMoX2NyZWF0ZShpdCksIFApO1xufTtcbnZhciAkcHJvcGVydHlJc0VudW1lcmFibGUgPSBmdW5jdGlvbiBwcm9wZXJ0eUlzRW51bWVyYWJsZShrZXkpe1xuICB2YXIgRSA9IGlzRW51bS5jYWxsKHRoaXMsIGtleSA9IHRvUHJpbWl0aXZlKGtleSwgdHJ1ZSkpO1xuICBpZih0aGlzID09PSBPYmplY3RQcm90byAmJiBoYXMoQWxsU3ltYm9scywga2V5KSAmJiAhaGFzKE9QU3ltYm9scywga2V5KSlyZXR1cm4gZmFsc2U7XG4gIHJldHVybiBFIHx8ICFoYXModGhpcywga2V5KSB8fCAhaGFzKEFsbFN5bWJvbHMsIGtleSkgfHwgaGFzKHRoaXMsIEhJRERFTikgJiYgdGhpc1tISURERU5dW2tleV0gPyBFIDogdHJ1ZTtcbn07XG52YXIgJGdldE93blByb3BlcnR5RGVzY3JpcHRvciA9IGZ1bmN0aW9uIGdldE93blByb3BlcnR5RGVzY3JpcHRvcihpdCwga2V5KXtcbiAgaXQgID0gdG9JT2JqZWN0KGl0KTtcbiAga2V5ID0gdG9QcmltaXRpdmUoa2V5LCB0cnVlKTtcbiAgaWYoaXQgPT09IE9iamVjdFByb3RvICYmIGhhcyhBbGxTeW1ib2xzLCBrZXkpICYmICFoYXMoT1BTeW1ib2xzLCBrZXkpKXJldHVybjtcbiAgdmFyIEQgPSBnT1BEKGl0LCBrZXkpO1xuICBpZihEICYmIGhhcyhBbGxTeW1ib2xzLCBrZXkpICYmICEoaGFzKGl0LCBISURERU4pICYmIGl0W0hJRERFTl1ba2V5XSkpRC5lbnVtZXJhYmxlID0gdHJ1ZTtcbiAgcmV0dXJuIEQ7XG59O1xudmFyICRnZXRPd25Qcm9wZXJ0eU5hbWVzID0gZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlOYW1lcyhpdCl7XG4gIHZhciBuYW1lcyAgPSBnT1BOKHRvSU9iamVjdChpdCkpXG4gICAgLCByZXN1bHQgPSBbXVxuICAgICwgaSAgICAgID0gMFxuICAgICwga2V5O1xuICB3aGlsZShuYW1lcy5sZW5ndGggPiBpKXtcbiAgICBpZighaGFzKEFsbFN5bWJvbHMsIGtleSA9IG5hbWVzW2krK10pICYmIGtleSAhPSBISURERU4gJiYga2V5ICE9IE1FVEEpcmVzdWx0LnB1c2goa2V5KTtcbiAgfSByZXR1cm4gcmVzdWx0O1xufTtcbnZhciAkZ2V0T3duUHJvcGVydHlTeW1ib2xzID0gZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlTeW1ib2xzKGl0KXtcbiAgdmFyIElTX09QICA9IGl0ID09PSBPYmplY3RQcm90b1xuICAgICwgbmFtZXMgID0gZ09QTihJU19PUCA/IE9QU3ltYm9scyA6IHRvSU9iamVjdChpdCkpXG4gICAgLCByZXN1bHQgPSBbXVxuICAgICwgaSAgICAgID0gMFxuICAgICwga2V5O1xuICB3aGlsZShuYW1lcy5sZW5ndGggPiBpKXtcbiAgICBpZihoYXMoQWxsU3ltYm9scywga2V5ID0gbmFtZXNbaSsrXSkgJiYgKElTX09QID8gaGFzKE9iamVjdFByb3RvLCBrZXkpIDogdHJ1ZSkpcmVzdWx0LnB1c2goQWxsU3ltYm9sc1trZXldKTtcbiAgfSByZXR1cm4gcmVzdWx0O1xufTtcblxuLy8gMTkuNC4xLjEgU3ltYm9sKFtkZXNjcmlwdGlvbl0pXG5pZighVVNFX05BVElWRSl7XG4gICRTeW1ib2wgPSBmdW5jdGlvbiBTeW1ib2woKXtcbiAgICBpZih0aGlzIGluc3RhbmNlb2YgJFN5bWJvbCl0aHJvdyBUeXBlRXJyb3IoJ1N5bWJvbCBpcyBub3QgYSBjb25zdHJ1Y3RvciEnKTtcbiAgICB2YXIgdGFnID0gdWlkKGFyZ3VtZW50cy5sZW5ndGggPiAwID8gYXJndW1lbnRzWzBdIDogdW5kZWZpbmVkKTtcbiAgICB2YXIgJHNldCA9IGZ1bmN0aW9uKHZhbHVlKXtcbiAgICAgIGlmKHRoaXMgPT09IE9iamVjdFByb3RvKSRzZXQuY2FsbChPUFN5bWJvbHMsIHZhbHVlKTtcbiAgICAgIGlmKGhhcyh0aGlzLCBISURERU4pICYmIGhhcyh0aGlzW0hJRERFTl0sIHRhZykpdGhpc1tISURERU5dW3RhZ10gPSBmYWxzZTtcbiAgICAgIHNldFN5bWJvbERlc2ModGhpcywgdGFnLCBjcmVhdGVEZXNjKDEsIHZhbHVlKSk7XG4gICAgfTtcbiAgICBpZihERVNDUklQVE9SUyAmJiBzZXR0ZXIpc2V0U3ltYm9sRGVzYyhPYmplY3RQcm90bywgdGFnLCB7Y29uZmlndXJhYmxlOiB0cnVlLCBzZXQ6ICRzZXR9KTtcbiAgICByZXR1cm4gd3JhcCh0YWcpO1xuICB9O1xuICByZWRlZmluZSgkU3ltYm9sW1BST1RPVFlQRV0sICd0b1N0cmluZycsIGZ1bmN0aW9uIHRvU3RyaW5nKCl7XG4gICAgcmV0dXJuIHRoaXMuX2s7XG4gIH0pO1xuXG4gICRHT1BELmYgPSAkZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yO1xuICAkRFAuZiAgID0gJGRlZmluZVByb3BlcnR5O1xuICByZXF1aXJlKCcuL19vYmplY3QtZ29wbicpLmYgPSBnT1BORXh0LmYgPSAkZ2V0T3duUHJvcGVydHlOYW1lcztcbiAgcmVxdWlyZSgnLi9fb2JqZWN0LXBpZScpLmYgID0gJHByb3BlcnR5SXNFbnVtZXJhYmxlO1xuICByZXF1aXJlKCcuL19vYmplY3QtZ29wcycpLmYgPSAkZ2V0T3duUHJvcGVydHlTeW1ib2xzO1xuXG4gIGlmKERFU0NSSVBUT1JTICYmICFyZXF1aXJlKCcuL19saWJyYXJ5Jykpe1xuICAgIHJlZGVmaW5lKE9iamVjdFByb3RvLCAncHJvcGVydHlJc0VudW1lcmFibGUnLCAkcHJvcGVydHlJc0VudW1lcmFibGUsIHRydWUpO1xuICB9XG5cbiAgd2tzRXh0LmYgPSBmdW5jdGlvbihuYW1lKXtcbiAgICByZXR1cm4gd3JhcCh3a3MobmFtZSkpO1xuICB9XG59XG5cbiRleHBvcnQoJGV4cG9ydC5HICsgJGV4cG9ydC5XICsgJGV4cG9ydC5GICogIVVTRV9OQVRJVkUsIHtTeW1ib2w6ICRTeW1ib2x9KTtcblxuZm9yKHZhciBzeW1ib2xzID0gKFxuICAvLyAxOS40LjIuMiwgMTkuNC4yLjMsIDE5LjQuMi40LCAxOS40LjIuNiwgMTkuNC4yLjgsIDE5LjQuMi45LCAxOS40LjIuMTAsIDE5LjQuMi4xMSwgMTkuNC4yLjEyLCAxOS40LjIuMTMsIDE5LjQuMi4xNFxuICAnaGFzSW5zdGFuY2UsaXNDb25jYXRTcHJlYWRhYmxlLGl0ZXJhdG9yLG1hdGNoLHJlcGxhY2Usc2VhcmNoLHNwZWNpZXMsc3BsaXQsdG9QcmltaXRpdmUsdG9TdHJpbmdUYWcsdW5zY29wYWJsZXMnXG4pLnNwbGl0KCcsJyksIGkgPSAwOyBzeW1ib2xzLmxlbmd0aCA+IGk7ICl3a3Moc3ltYm9sc1tpKytdKTtcblxuZm9yKHZhciBzeW1ib2xzID0gJGtleXMod2tzLnN0b3JlKSwgaSA9IDA7IHN5bWJvbHMubGVuZ3RoID4gaTsgKXdrc0RlZmluZShzeW1ib2xzW2krK10pO1xuXG4kZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqICFVU0VfTkFUSVZFLCAnU3ltYm9sJywge1xuICAvLyAxOS40LjIuMSBTeW1ib2wuZm9yKGtleSlcbiAgJ2Zvcic6IGZ1bmN0aW9uKGtleSl7XG4gICAgcmV0dXJuIGhhcyhTeW1ib2xSZWdpc3RyeSwga2V5ICs9ICcnKVxuICAgICAgPyBTeW1ib2xSZWdpc3RyeVtrZXldXG4gICAgICA6IFN5bWJvbFJlZ2lzdHJ5W2tleV0gPSAkU3ltYm9sKGtleSk7XG4gIH0sXG4gIC8vIDE5LjQuMi41IFN5bWJvbC5rZXlGb3Ioc3ltKVxuICBrZXlGb3I6IGZ1bmN0aW9uIGtleUZvcihrZXkpe1xuICAgIGlmKGlzU3ltYm9sKGtleSkpcmV0dXJuIGtleU9mKFN5bWJvbFJlZ2lzdHJ5LCBrZXkpO1xuICAgIHRocm93IFR5cGVFcnJvcihrZXkgKyAnIGlzIG5vdCBhIHN5bWJvbCEnKTtcbiAgfSxcbiAgdXNlU2V0dGVyOiBmdW5jdGlvbigpeyBzZXR0ZXIgPSB0cnVlOyB9LFxuICB1c2VTaW1wbGU6IGZ1bmN0aW9uKCl7IHNldHRlciA9IGZhbHNlOyB9XG59KTtcblxuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiAhVVNFX05BVElWRSwgJ09iamVjdCcsIHtcbiAgLy8gMTkuMS4yLjIgT2JqZWN0LmNyZWF0ZShPIFssIFByb3BlcnRpZXNdKVxuICBjcmVhdGU6ICRjcmVhdGUsXG4gIC8vIDE5LjEuMi40IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShPLCBQLCBBdHRyaWJ1dGVzKVxuICBkZWZpbmVQcm9wZXJ0eTogJGRlZmluZVByb3BlcnR5LFxuICAvLyAxOS4xLjIuMyBPYmplY3QuZGVmaW5lUHJvcGVydGllcyhPLCBQcm9wZXJ0aWVzKVxuICBkZWZpbmVQcm9wZXJ0aWVzOiAkZGVmaW5lUHJvcGVydGllcyxcbiAgLy8gMTkuMS4yLjYgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihPLCBQKVxuICBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I6ICRnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IsXG4gIC8vIDE5LjEuMi43IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKE8pXG4gIGdldE93blByb3BlcnR5TmFtZXM6ICRnZXRPd25Qcm9wZXJ0eU5hbWVzLFxuICAvLyAxOS4xLjIuOCBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKE8pXG4gIGdldE93blByb3BlcnR5U3ltYm9sczogJGdldE93blByb3BlcnR5U3ltYm9sc1xufSk7XG5cbi8vIDI0LjMuMiBKU09OLnN0cmluZ2lmeSh2YWx1ZSBbLCByZXBsYWNlciBbLCBzcGFjZV1dKVxuJEpTT04gJiYgJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiAoIVVTRV9OQVRJVkUgfHwgJGZhaWxzKGZ1bmN0aW9uKCl7XG4gIHZhciBTID0gJFN5bWJvbCgpO1xuICAvLyBNUyBFZGdlIGNvbnZlcnRzIHN5bWJvbCB2YWx1ZXMgdG8gSlNPTiBhcyB7fVxuICAvLyBXZWJLaXQgY29udmVydHMgc3ltYm9sIHZhbHVlcyB0byBKU09OIGFzIG51bGxcbiAgLy8gVjggdGhyb3dzIG9uIGJveGVkIHN5bWJvbHNcbiAgcmV0dXJuIF9zdHJpbmdpZnkoW1NdKSAhPSAnW251bGxdJyB8fCBfc3RyaW5naWZ5KHthOiBTfSkgIT0gJ3t9JyB8fCBfc3RyaW5naWZ5KE9iamVjdChTKSkgIT0gJ3t9Jztcbn0pKSwgJ0pTT04nLCB7XG4gIHN0cmluZ2lmeTogZnVuY3Rpb24gc3RyaW5naWZ5KGl0KXtcbiAgICBpZihpdCA9PT0gdW5kZWZpbmVkIHx8IGlzU3ltYm9sKGl0KSlyZXR1cm47IC8vIElFOCByZXR1cm5zIHN0cmluZyBvbiB1bmRlZmluZWRcbiAgICB2YXIgYXJncyA9IFtpdF1cbiAgICAgICwgaSAgICA9IDFcbiAgICAgICwgcmVwbGFjZXIsICRyZXBsYWNlcjtcbiAgICB3aGlsZShhcmd1bWVudHMubGVuZ3RoID4gaSlhcmdzLnB1c2goYXJndW1lbnRzW2krK10pO1xuICAgIHJlcGxhY2VyID0gYXJnc1sxXTtcbiAgICBpZih0eXBlb2YgcmVwbGFjZXIgPT0gJ2Z1bmN0aW9uJykkcmVwbGFjZXIgPSByZXBsYWNlcjtcbiAgICBpZigkcmVwbGFjZXIgfHwgIWlzQXJyYXkocmVwbGFjZXIpKXJlcGxhY2VyID0gZnVuY3Rpb24oa2V5LCB2YWx1ZSl7XG4gICAgICBpZigkcmVwbGFjZXIpdmFsdWUgPSAkcmVwbGFjZXIuY2FsbCh0aGlzLCBrZXksIHZhbHVlKTtcbiAgICAgIGlmKCFpc1N5bWJvbCh2YWx1ZSkpcmV0dXJuIHZhbHVlO1xuICAgIH07XG4gICAgYXJnc1sxXSA9IHJlcGxhY2VyO1xuICAgIHJldHVybiBfc3RyaW5naWZ5LmFwcGx5KCRKU09OLCBhcmdzKTtcbiAgfVxufSk7XG5cbi8vIDE5LjQuMy40IFN5bWJvbC5wcm90b3R5cGVbQEB0b1ByaW1pdGl2ZV0oaGludClcbiRTeW1ib2xbUFJPVE9UWVBFXVtUT19QUklNSVRJVkVdIHx8IHJlcXVpcmUoJy4vX2hpZGUnKSgkU3ltYm9sW1BST1RPVFlQRV0sIFRPX1BSSU1JVElWRSwgJFN5bWJvbFtQUk9UT1RZUEVdLnZhbHVlT2YpO1xuLy8gMTkuNC4zLjUgU3ltYm9sLnByb3RvdHlwZVtAQHRvU3RyaW5nVGFnXVxuc2V0VG9TdHJpbmdUYWcoJFN5bWJvbCwgJ1N5bWJvbCcpO1xuLy8gMjAuMi4xLjkgTWF0aFtAQHRvU3RyaW5nVGFnXVxuc2V0VG9TdHJpbmdUYWcoTWF0aCwgJ01hdGgnLCB0cnVlKTtcbi8vIDI0LjMuMyBKU09OW0BAdG9TdHJpbmdUYWddXG5zZXRUb1N0cmluZ1RhZyhnbG9iYWwuSlNPTiwgJ0pTT04nLCB0cnVlKTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYuc3ltYm9sLmpzXG4gKiogbW9kdWxlIGlkID0gODZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDJcbiAqKi8iLCJyZXF1aXJlKCcuL193a3MtZGVmaW5lJykoJ2FzeW5jSXRlcmF0b3InKTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczcuc3ltYm9sLmFzeW5jLWl0ZXJhdG9yLmpzXG4gKiogbW9kdWxlIGlkID0gODdcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDJcbiAqKi8iLCJyZXF1aXJlKCcuL193a3MtZGVmaW5lJykoJ29ic2VydmFibGUnKTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczcuc3ltYm9sLm9ic2VydmFibGUuanNcbiAqKiBtb2R1bGUgaWQgPSA4OFxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDEgMlxuICoqLyIsInJlcXVpcmUoJy4vZXM2LmFycmF5Lml0ZXJhdG9yJyk7XG52YXIgZ2xvYmFsICAgICAgICA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpXG4gICwgaGlkZSAgICAgICAgICA9IHJlcXVpcmUoJy4vX2hpZGUnKVxuICAsIEl0ZXJhdG9ycyAgICAgPSByZXF1aXJlKCcuL19pdGVyYXRvcnMnKVxuICAsIFRPX1NUUklOR19UQUcgPSByZXF1aXJlKCcuL193a3MnKSgndG9TdHJpbmdUYWcnKTtcblxuZm9yKHZhciBjb2xsZWN0aW9ucyA9IFsnTm9kZUxpc3QnLCAnRE9NVG9rZW5MaXN0JywgJ01lZGlhTGlzdCcsICdTdHlsZVNoZWV0TGlzdCcsICdDU1NSdWxlTGlzdCddLCBpID0gMDsgaSA8IDU7IGkrKyl7XG4gIHZhciBOQU1FICAgICAgID0gY29sbGVjdGlvbnNbaV1cbiAgICAsIENvbGxlY3Rpb24gPSBnbG9iYWxbTkFNRV1cbiAgICAsIHByb3RvICAgICAgPSBDb2xsZWN0aW9uICYmIENvbGxlY3Rpb24ucHJvdG90eXBlO1xuICBpZihwcm90byAmJiAhcHJvdG9bVE9fU1RSSU5HX1RBR10paGlkZShwcm90bywgVE9fU1RSSU5HX1RBRywgTkFNRSk7XG4gIEl0ZXJhdG9yc1tOQU1FXSA9IEl0ZXJhdG9ycy5BcnJheTtcbn1cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy93ZWIuZG9tLml0ZXJhYmxlLmpzXG4gKiogbW9kdWxlIGlkID0gODlcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDJcbiAqKi8iLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9jbGllbnQvY3NzL21haW4uY3NzXG4gKiogbW9kdWxlIGlkID0gOTBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDJcbiAqKi8iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQge3JlbmRlcn0gZnJvbSAncmVhY3QtZG9tJztcclxuaW1wb3J0IHtQcm92aWRlcn0gZnJvbSAncmVhY3QtcmVkdXgnO1xyXG5pbXBvcnQgZmFzdGNsaWNrIGZyb20gJ2Zhc3RjbGljayc7XHJcblxyXG5pbXBvcnQgQXBwIGZyb20gJy4uLy4uLy4uL2NvbW1vbi9BcHAuanN4JztcclxuaW1wb3J0IGNvbmZpZ3VyZVN0b3JlIGZyb20gJy4uLy4uLy4uL2NvbW1vbi9zdG9yZS9pbmRleCc7XHJcblxyXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xyXG4gICAgdmFyIHdoeURpZFlvdVVwZGF0ZSA9IHJlcXVpcmUoJ3doeS1kaWQteW91LXVwZGF0ZScpLmRlZmF1bHQ7XHJcbiAgICB3aHlEaWRZb3VVcGRhdGUoUmVhY3QpO1xyXG4gICAgdmFyIFJlYWN0UGVyZiA9IHJlcXVpcmUoJ3JlYWN0LWFkZG9ucy1wZXJmJyk7XHJcbiAgICB3aW5kb3cuUmVhY3RQZXJmID0gUmVhY3RQZXJmO1xyXG59XHJcblxyXG4vLyBmYXN0Y2xpY2vop6PlhrNpb3Plkozpg6jliIblronljZNjbGlja+S6i+S7tueahOmXrumimFxyXG5mYXN0Y2xpY2suYXR0YWNoKGRvY3VtZW50LmJvZHkpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY3JlYXRlUmVuZGVyKG1pZGRsZXdhcmVDb25maWcgPSB7fSl7XHJcbiAgICBsZXQgc3RvcmUgPSBudWxsO1xyXG4gICAgbGV0IHBhZ2UgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGFnZScpO1xyXG5cclxuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XHJcbiAgICAgICAgLy8gUmVhY3QuYWRkb25zLlBlcmbmgKfog73liIbmnpDkvb/nlKhcclxuICAgICAgICBpZiAod2luZG93LlJlYWN0UGVyZikge1xyXG4gICAgICAgICAgICBSZWFjdFBlcmYuc3RhcnQoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGZ1bmN0aW9uICh7XHJcbiAgICAgICAgcm9vdFJlZHVjZXIgPSAoKSA9PiB7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBjb21wb25lbnQgPSBudWxsXHJcbiAgICB9KSB7XHJcbiAgICAgICAgbGV0IHRyYW5zZm9ybWVkRGF0YSA9IHR5cGVvZiBtaWRkbGV3YXJlQ29uZmlnLnRyYW5zZm9ybWVyID09PSAnZnVuY3Rpb24nXHJcbiAgICAgICAgICAgID8gbWlkZGxld2FyZUNvbmZpZy50cmFuc2Zvcm1lcih3aW5kb3cuX19JTklUSUFMX1NUQVRFX18pIDogd2luZG93Ll9fSU5JVElBTF9TVEFURV9fO1xyXG4gICAgICAgIGlmICghc3RvcmUpIHtcclxuICAgICAgICAgICAgc3RvcmUgPSBjb25maWd1cmVTdG9yZSh0cmFuc2Zvcm1lZERhdGEsIHJvb3RSZWR1Y2VyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gaG90IGxvYWQgZnJvbSBobXJcclxuICAgICAgICBlbHNlIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XHJcbiAgICAgICAgICAgIHN0b3JlLnJlcGxhY2VSZWR1Y2VyKHJvb3RSZWR1Y2VyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJlbmRlcigoXHJcbiAgICAgICAgICAgIDxQcm92aWRlciBzdG9yZT17IHN0b3JlIH0+XHJcbiAgICAgICAgICAgICAgICA8QXBwIGFwcENvbmZpZz17IHdpbmRvdy5fX0FwcF9DT05GSUdfXyB9PlxyXG4gICAgICAgICAgICAgICAgICAgIHsgY29tcG9uZW50IH1cclxuICAgICAgICAgICAgICAgIDwvQXBwPlxyXG4gICAgICAgICAgICA8L1Byb3ZpZGVyPlxyXG4gICAgICAgICksIHBhZ2UpO1xyXG5cclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHN0b3JlKTtcclxuICAgIH07XHJcbn1cclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9jbGllbnQvanMvdXRpbHMvaW5pdGlhbGl6ZVJlbmRlci5qc1xuICoqLyIsImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQsIFByb3BUeXBlcyB9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IEV2ZW50RW1pdHRlciBmcm9tICdldmVudHMnO1xyXG5cclxubGV0IG1lZGlhdG9yID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuXHJcbmNsYXNzIEFwcCBleHRlbmRzIENvbXBvbmVudCB7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcywgY29udGV4dCkge1xyXG4gICAgICAgIHN1cGVyKHByb3BzLCBjb250ZXh0KTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRDaGlsZENvbnRleHQoKXtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAkZXZlbnRCdXM6IG1lZGlhdG9yLFxyXG4gICAgICAgICAgICAkYXBwQ29uZmlnOiB0aGlzLnByb3BzLmFwcENvbmZpZ1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjb21wb25lbnREaWRNb3VudCgpe1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBjb21wb25lbnREaWRVcGRhdGUoKXtcclxuICAgIH1cclxuXHJcbiAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpe1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICAgICAgeyB0aGlzLnByb3BzLmNoaWxkcmVuIH1cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufVxyXG5BcHAuZGVmYXVsdFByb3BzID0ge1xyXG4gICAgYXBwQ29uZmlnOiBudWxsXHJcbn07XHJcbkFwcC5wcm9wVHlwZXMgPSB7XHJcbiAgICBhcHBDb25maWc6IFByb3BUeXBlcy5vYmplY3RcclxufTtcclxuQXBwLmNoaWxkQ29udGV4dFR5cGVzID0ge1xyXG4gICAgJGV2ZW50QnVzOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihFdmVudEVtaXR0ZXIpLFxyXG4gICAgJGFwcENvbmZpZzogUHJvcFR5cGVzLm9iamVjdFxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgQXBwO1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2NvbW1vbi9BcHAuanN4XG4gKiovIiwiaW1wb3J0IHsgY3JlYXRlU3RvcmUsIGFwcGx5TWlkZGxld2FyZSwgY29tcG9zZSB9IGZyb20gJ3JlZHV4JztcclxuaW1wb3J0IHRodW5rIGZyb20gJ3JlZHV4LXRodW5rJztcclxuXHJcbmlmKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgJiYgcHJvY2Vzcy5icm93c2VyKXtcclxuICAgIHZhciBjcmVhdGVMb2dnZXIgPSByZXF1aXJlKCdyZWR1eC1sb2dnZXInKTtcclxufVxyXG5cclxuY29uc3QgbWlkZGxld2FyZUJ1aWxkZXIgPSAoKSA9PiB7XHJcbiAgICBsZXQgbWlkZGxld2FyZSA9IGFwcGx5TWlkZGxld2FyZSh0aHVuayk7XHJcblxyXG4gICAgaWYocHJvY2Vzcy5icm93c2VyICYmIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpe1xyXG4gICAgICAgIGlmKCF3aW5kb3cuZGV2VG9vbHNFeHRlbnNpb24pIHtcclxuICAgICAgICAgICAgbWlkZGxld2FyZSA9IGFwcGx5TWlkZGxld2FyZSh0aHVuaywgY3JlYXRlTG9nZ2VyKCkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBsZXQgYWxsQ29tcG9zZUVsZW1lbnRzID0gW1xyXG4gICAgICAgIG1pZGRsZXdhcmVcclxuICAgIF07XHJcblxyXG4gICAgaWYocHJvY2Vzcy5icm93c2VyICYmIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpe1xyXG4gICAgICAgIGlmKHdpbmRvdy5kZXZUb29sc0V4dGVuc2lvbil7XHJcbiAgICAgICAgICAgIGFsbENvbXBvc2VFbGVtZW50cy5wdXNoKHdpbmRvdy5kZXZUb29sc0V4dGVuc2lvbigpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGFsbENvbXBvc2VFbGVtZW50cztcclxufTtcclxuXHJcbmNvbnN0IGZpbmFsQ3JlYXRlU3RvcmUgPSBjb21wb3NlKC4uLm1pZGRsZXdhcmVCdWlsZGVyKCkpKGNyZWF0ZVN0b3JlKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbmZpZ3VyZVN0b3JlKGluaXRpYWxTdGF0ZSwgcm9vdFJlZHVjZXIpIHtcclxuICAgIGNvbnN0IHN0b3JlID0gZmluYWxDcmVhdGVTdG9yZShyb290UmVkdWNlciwgaW5pdGlhbFN0YXRlKTtcclxuXHJcbiAgICByZXR1cm4gc3RvcmU7XHJcbn1cclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9jb21tb24vc3RvcmUvaW5kZXguanNcbiAqKi8iLCIvLyBtb2RpZmllZFxyXG4vKipcclxuICogQ29weXJpZ2h0IChjKSAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXHJcbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbiAqXHJcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxyXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcclxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXHJcbiAqXHJcbiAqIEB0eXBlY2hlY2tzXHJcbiAqXHJcbiAqL1xyXG5cclxuLyplc2xpbnQtZGlzYWJsZSBuby1zZWxmLWNvbXBhcmUgKi9cclxuXHJcbid1c2Ugc3RyaWN0JztcclxuXHJcbnZhciBoYXNPd25Qcm9wZXJ0eSA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XHJcblxyXG4vKipcclxuICogaW5saW5lZCBPYmplY3QuaXMgcG9seWZpbGwgdG8gYXZvaWQgcmVxdWlyaW5nIGNvbnN1bWVycyBzaGlwIHRoZWlyIG93blxyXG4gKiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9PYmplY3QvaXNcclxuICovXHJcbmZ1bmN0aW9uIGlzKHgsIHkpIHtcclxuICAgIC8vIFNhbWVWYWx1ZSBhbGdvcml0aG1cclxuICAgIGlmICh4ID09PSB5KSB7XHJcbiAgICAgICAgLy8gU3RlcHMgMS01LCA3LTEwXHJcbiAgICAgICAgLy8gU3RlcHMgNi5iLTYuZTogKzAgIT0gLTBcclxuICAgICAgICByZXR1cm4geCAhPT0gMCB8fCAxIC8geCA9PT0gMSAvIHk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGlmKHR5cGVvZiB4ID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiB5ID09PSAnZnVuY3Rpb24nKXtcclxuICAgICAgICAgICAgcmV0dXJuIHgudG9TdHJpbmcoKSA9PT0geS50b1N0cmluZygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBTdGVwIDYuYTogTmFOID09IE5hTlxyXG4gICAgICAgIHJldHVybiB4ICE9PSB4ICYmIHkgIT09IHk7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBQZXJmb3JtcyBlcXVhbGl0eSBieSBpdGVyYXRpbmcgdGhyb3VnaCBrZXlzIG9uIGFuIG9iamVjdCBhbmQgcmV0dXJuaW5nIGZhbHNlXHJcbiAqIHdoZW4gYW55IGtleSBoYXMgdmFsdWVzIHdoaWNoIGFyZSBub3Qgc3RyaWN0bHkgZXF1YWwgYmV0d2VlbiB0aGUgYXJndW1lbnRzLlxyXG4gKiBSZXR1cm5zIHRydWUgd2hlbiB0aGUgdmFsdWVzIG9mIGFsbCBrZXlzIGFyZSBzdHJpY3RseSBlcXVhbC5cclxuICovXHJcbmZ1bmN0aW9uIHNoYWxsb3dFcXVhbChvYmpBLCBvYmpCKSB7XHJcbiAgICBpZiAoaXMob2JqQSwgb2JqQikpIHtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodHlwZW9mIG9iakEgIT09ICdvYmplY3QnIHx8IG9iakEgPT09IG51bGwgfHwgdHlwZW9mIG9iakIgIT09ICdvYmplY3QnIHx8IG9iakIgPT09IG51bGwpIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIGtleXNBID0gT2JqZWN0LmtleXMob2JqQSk7XHJcbiAgICB2YXIga2V5c0IgPSBPYmplY3Qua2V5cyhvYmpCKTtcclxuXHJcbiAgICBpZiAoa2V5c0EubGVuZ3RoICE9PSBrZXlzQi5sZW5ndGgpIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gVGVzdCBmb3IgQSdzIGtleXMgZGlmZmVyZW50IGZyb20gQi5cclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwga2V5c0EubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBpZiAoIWhhc093blByb3BlcnR5LmNhbGwob2JqQiwga2V5c0FbaV0pIHx8ICFpcyhvYmpBW2tleXNBW2ldXSwgb2JqQltrZXlzQVtpXV0pKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRydWU7XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gc2hhbGxvd0VxdWFsO1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2NvbW1vbi91dGlscy9zaGFsbG93RXF1YWwuanNcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgWG1sRW50aXRpZXM6IHJlcXVpcmUoJy4vbGliL3htbC1lbnRpdGllcy5qcycpLFxuICBIdG1sNEVudGl0aWVzOiByZXF1aXJlKCcuL2xpYi9odG1sNC1lbnRpdGllcy5qcycpLFxuICBIdG1sNUVudGl0aWVzOiByZXF1aXJlKCcuL2xpYi9odG1sNS1lbnRpdGllcy5qcycpLFxuICBBbGxIdG1sRW50aXRpZXM6IHJlcXVpcmUoJy4vbGliL2h0bWw1LWVudGl0aWVzLmpzJylcbn07XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9odG1sLWVudGl0aWVzL2luZGV4LmpzXG4gKiogbW9kdWxlIGlkID0gOTVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDJcbiAqKi8iLCJ2YXIgSFRNTF9BTFBIQSA9IFsnYXBvcycsICduYnNwJywgJ2lleGNsJywgJ2NlbnQnLCAncG91bmQnLCAnY3VycmVuJywgJ3llbicsICdicnZiYXInLCAnc2VjdCcsICd1bWwnLCAnY29weScsICdvcmRmJywgJ2xhcXVvJywgJ25vdCcsICdzaHknLCAncmVnJywgJ21hY3InLCAnZGVnJywgJ3BsdXNtbicsICdzdXAyJywgJ3N1cDMnLCAnYWN1dGUnLCAnbWljcm8nLCAncGFyYScsICdtaWRkb3QnLCAnY2VkaWwnLCAnc3VwMScsICdvcmRtJywgJ3JhcXVvJywgJ2ZyYWMxNCcsICdmcmFjMTInLCAnZnJhYzM0JywgJ2lxdWVzdCcsICdBZ3JhdmUnLCAnQWFjdXRlJywgJ0FjaXJjJywgJ0F0aWxkZScsICdBdW1sJywgJ0FyaW5nJywgJ0FlbGlnJywgJ0NjZWRpbCcsICdFZ3JhdmUnLCAnRWFjdXRlJywgJ0VjaXJjJywgJ0V1bWwnLCAnSWdyYXZlJywgJ0lhY3V0ZScsICdJY2lyYycsICdJdW1sJywgJ0VUSCcsICdOdGlsZGUnLCAnT2dyYXZlJywgJ09hY3V0ZScsICdPY2lyYycsICdPdGlsZGUnLCAnT3VtbCcsICd0aW1lcycsICdPc2xhc2gnLCAnVWdyYXZlJywgJ1VhY3V0ZScsICdVY2lyYycsICdVdW1sJywgJ1lhY3V0ZScsICdUSE9STicsICdzemxpZycsICdhZ3JhdmUnLCAnYWFjdXRlJywgJ2FjaXJjJywgJ2F0aWxkZScsICdhdW1sJywgJ2FyaW5nJywgJ2FlbGlnJywgJ2NjZWRpbCcsICdlZ3JhdmUnLCAnZWFjdXRlJywgJ2VjaXJjJywgJ2V1bWwnLCAnaWdyYXZlJywgJ2lhY3V0ZScsICdpY2lyYycsICdpdW1sJywgJ2V0aCcsICdudGlsZGUnLCAnb2dyYXZlJywgJ29hY3V0ZScsICdvY2lyYycsICdvdGlsZGUnLCAnb3VtbCcsICdkaXZpZGUnLCAnT3NsYXNoJywgJ3VncmF2ZScsICd1YWN1dGUnLCAndWNpcmMnLCAndXVtbCcsICd5YWN1dGUnLCAndGhvcm4nLCAneXVtbCcsICdxdW90JywgJ2FtcCcsICdsdCcsICdndCcsICdvZWxpZycsICdvZWxpZycsICdzY2Fyb24nLCAnc2Nhcm9uJywgJ3l1bWwnLCAnY2lyYycsICd0aWxkZScsICdlbnNwJywgJ2Vtc3AnLCAndGhpbnNwJywgJ3p3bmonLCAnendqJywgJ2xybScsICdybG0nLCAnbmRhc2gnLCAnbWRhc2gnLCAnbHNxdW8nLCAncnNxdW8nLCAnc2JxdW8nLCAnbGRxdW8nLCAncmRxdW8nLCAnYmRxdW8nLCAnZGFnZ2VyJywgJ2RhZ2dlcicsICdwZXJtaWwnLCAnbHNhcXVvJywgJ3JzYXF1bycsICdldXJvJywgJ2Zub2YnLCAnYWxwaGEnLCAnYmV0YScsICdnYW1tYScsICdkZWx0YScsICdlcHNpbG9uJywgJ3pldGEnLCAnZXRhJywgJ3RoZXRhJywgJ2lvdGEnLCAna2FwcGEnLCAnbGFtYmRhJywgJ211JywgJ251JywgJ3hpJywgJ29taWNyb24nLCAncGknLCAncmhvJywgJ3NpZ21hJywgJ3RhdScsICd1cHNpbG9uJywgJ3BoaScsICdjaGknLCAncHNpJywgJ29tZWdhJywgJ2FscGhhJywgJ2JldGEnLCAnZ2FtbWEnLCAnZGVsdGEnLCAnZXBzaWxvbicsICd6ZXRhJywgJ2V0YScsICd0aGV0YScsICdpb3RhJywgJ2thcHBhJywgJ2xhbWJkYScsICdtdScsICdudScsICd4aScsICdvbWljcm9uJywgJ3BpJywgJ3JobycsICdzaWdtYWYnLCAnc2lnbWEnLCAndGF1JywgJ3Vwc2lsb24nLCAncGhpJywgJ2NoaScsICdwc2knLCAnb21lZ2EnLCAndGhldGFzeW0nLCAndXBzaWgnLCAncGl2JywgJ2J1bGwnLCAnaGVsbGlwJywgJ3ByaW1lJywgJ3ByaW1lJywgJ29saW5lJywgJ2ZyYXNsJywgJ3dlaWVycCcsICdpbWFnZScsICdyZWFsJywgJ3RyYWRlJywgJ2FsZWZzeW0nLCAnbGFycicsICd1YXJyJywgJ3JhcnInLCAnZGFycicsICdoYXJyJywgJ2NyYXJyJywgJ2xhcnInLCAndWFycicsICdyYXJyJywgJ2RhcnInLCAnaGFycicsICdmb3JhbGwnLCAncGFydCcsICdleGlzdCcsICdlbXB0eScsICduYWJsYScsICdpc2luJywgJ25vdGluJywgJ25pJywgJ3Byb2QnLCAnc3VtJywgJ21pbnVzJywgJ2xvd2FzdCcsICdyYWRpYycsICdwcm9wJywgJ2luZmluJywgJ2FuZycsICdhbmQnLCAnb3InLCAnY2FwJywgJ2N1cCcsICdpbnQnLCAndGhlcmU0JywgJ3NpbScsICdjb25nJywgJ2FzeW1wJywgJ25lJywgJ2VxdWl2JywgJ2xlJywgJ2dlJywgJ3N1YicsICdzdXAnLCAnbnN1YicsICdzdWJlJywgJ3N1cGUnLCAnb3BsdXMnLCAnb3RpbWVzJywgJ3BlcnAnLCAnc2RvdCcsICdsY2VpbCcsICdyY2VpbCcsICdsZmxvb3InLCAncmZsb29yJywgJ2xhbmcnLCAncmFuZycsICdsb3onLCAnc3BhZGVzJywgJ2NsdWJzJywgJ2hlYXJ0cycsICdkaWFtcyddO1xudmFyIEhUTUxfQ09ERVMgPSBbMzksIDE2MCwgMTYxLCAxNjIsIDE2MywgMTY0LCAxNjUsIDE2NiwgMTY3LCAxNjgsIDE2OSwgMTcwLCAxNzEsIDE3MiwgMTczLCAxNzQsIDE3NSwgMTc2LCAxNzcsIDE3OCwgMTc5LCAxODAsIDE4MSwgMTgyLCAxODMsIDE4NCwgMTg1LCAxODYsIDE4NywgMTg4LCAxODksIDE5MCwgMTkxLCAxOTIsIDE5MywgMTk0LCAxOTUsIDE5NiwgMTk3LCAxOTgsIDE5OSwgMjAwLCAyMDEsIDIwMiwgMjAzLCAyMDQsIDIwNSwgMjA2LCAyMDcsIDIwOCwgMjA5LCAyMTAsIDIxMSwgMjEyLCAyMTMsIDIxNCwgMjE1LCAyMTYsIDIxNywgMjE4LCAyMTksIDIyMCwgMjIxLCAyMjIsIDIyMywgMjI0LCAyMjUsIDIyNiwgMjI3LCAyMjgsIDIyOSwgMjMwLCAyMzEsIDIzMiwgMjMzLCAyMzQsIDIzNSwgMjM2LCAyMzcsIDIzOCwgMjM5LCAyNDAsIDI0MSwgMjQyLCAyNDMsIDI0NCwgMjQ1LCAyNDYsIDI0NywgMjQ4LCAyNDksIDI1MCwgMjUxLCAyNTIsIDI1MywgMjU0LCAyNTUsIDM0LCAzOCwgNjAsIDYyLCAzMzgsIDMzOSwgMzUyLCAzNTMsIDM3NiwgNzEwLCA3MzIsIDgxOTQsIDgxOTUsIDgyMDEsIDgyMDQsIDgyMDUsIDgyMDYsIDgyMDcsIDgyMTEsIDgyMTIsIDgyMTYsIDgyMTcsIDgyMTgsIDgyMjAsIDgyMjEsIDgyMjIsIDgyMjQsIDgyMjUsIDgyNDAsIDgyNDksIDgyNTAsIDgzNjQsIDQwMiwgOTEzLCA5MTQsIDkxNSwgOTE2LCA5MTcsIDkxOCwgOTE5LCA5MjAsIDkyMSwgOTIyLCA5MjMsIDkyNCwgOTI1LCA5MjYsIDkyNywgOTI4LCA5MjksIDkzMSwgOTMyLCA5MzMsIDkzNCwgOTM1LCA5MzYsIDkzNywgOTQ1LCA5NDYsIDk0NywgOTQ4LCA5NDksIDk1MCwgOTUxLCA5NTIsIDk1MywgOTU0LCA5NTUsIDk1NiwgOTU3LCA5NTgsIDk1OSwgOTYwLCA5NjEsIDk2MiwgOTYzLCA5NjQsIDk2NSwgOTY2LCA5NjcsIDk2OCwgOTY5LCA5NzcsIDk3OCwgOTgyLCA4MjI2LCA4MjMwLCA4MjQyLCA4MjQzLCA4MjU0LCA4MjYwLCA4NDcyLCA4NDY1LCA4NDc2LCA4NDgyLCA4NTAxLCA4NTkyLCA4NTkzLCA4NTk0LCA4NTk1LCA4NTk2LCA4NjI5LCA4NjU2LCA4NjU3LCA4NjU4LCA4NjU5LCA4NjYwLCA4NzA0LCA4NzA2LCA4NzA3LCA4NzA5LCA4NzExLCA4NzEyLCA4NzEzLCA4NzE1LCA4NzE5LCA4NzIxLCA4NzIyLCA4NzI3LCA4NzMwLCA4NzMzLCA4NzM0LCA4NzM2LCA4NzQzLCA4NzQ0LCA4NzQ1LCA4NzQ2LCA4NzQ3LCA4NzU2LCA4NzY0LCA4NzczLCA4Nzc2LCA4ODAwLCA4ODAxLCA4ODA0LCA4ODA1LCA4ODM0LCA4ODM1LCA4ODM2LCA4ODM4LCA4ODM5LCA4ODUzLCA4ODU1LCA4ODY5LCA4OTAxLCA4OTY4LCA4OTY5LCA4OTcwLCA4OTcxLCA5MDAxLCA5MDAyLCA5Njc0LCA5ODI0LCA5ODI3LCA5ODI5LCA5ODMwXTtcblxudmFyIGFscGhhSW5kZXggPSB7fTtcbnZhciBudW1JbmRleCA9IHt9O1xuXG52YXIgaSA9IDA7XG52YXIgbGVuZ3RoID0gSFRNTF9BTFBIQS5sZW5ndGg7XG53aGlsZSAoaSA8IGxlbmd0aCkge1xuICAgIHZhciBhID0gSFRNTF9BTFBIQVtpXTtcbiAgICB2YXIgYyA9IEhUTUxfQ09ERVNbaV07XG4gICAgYWxwaGFJbmRleFthXSA9IFN0cmluZy5mcm9tQ2hhckNvZGUoYyk7XG4gICAgbnVtSW5kZXhbY10gPSBhO1xuICAgIGkrKztcbn1cblxuLyoqXG4gKiBAY29uc3RydWN0b3JcbiAqL1xuZnVuY3Rpb24gSHRtbDRFbnRpdGllcygpIHt9XG5cbi8qKlxuICogQHBhcmFtIHtTdHJpbmd9IHN0clxuICogQHJldHVybnMge1N0cmluZ31cbiAqL1xuSHRtbDRFbnRpdGllcy5wcm90b3R5cGUuZGVjb2RlID0gZnVuY3Rpb24oc3RyKSB7XG4gICAgaWYgKHN0ci5sZW5ndGggPT09IDApIHtcbiAgICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgICByZXR1cm4gc3RyLnJlcGxhY2UoLyYoIz9bXFx3XFxkXSspOz8vZywgZnVuY3Rpb24ocywgZW50aXR5KSB7XG4gICAgICAgIHZhciBjaHI7XG4gICAgICAgIGlmIChlbnRpdHkuY2hhckF0KDApID09PSBcIiNcIikge1xuICAgICAgICAgICAgdmFyIGNvZGUgPSBlbnRpdHkuY2hhckF0KDEpLnRvTG93ZXJDYXNlKCkgPT09ICd4JyA/XG4gICAgICAgICAgICAgICAgcGFyc2VJbnQoZW50aXR5LnN1YnN0cigyKSwgMTYpIDpcbiAgICAgICAgICAgICAgICBwYXJzZUludChlbnRpdHkuc3Vic3RyKDEpKTtcblxuICAgICAgICAgICAgaWYgKCEoaXNOYU4oY29kZSkgfHwgY29kZSA8IC0zMjc2OCB8fCBjb2RlID4gNjU1MzUpKSB7XG4gICAgICAgICAgICAgICAgY2hyID0gU3RyaW5nLmZyb21DaGFyQ29kZShjb2RlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNociA9IGFscGhhSW5kZXhbZW50aXR5XTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY2hyIHx8IHM7XG4gICAgfSk7XG59O1xuXG4vKipcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHJcbiAqIEByZXR1cm5zIHtTdHJpbmd9XG4gKi9cbkh0bWw0RW50aXRpZXMuZGVjb2RlID0gZnVuY3Rpb24oc3RyKSB7XG4gICAgcmV0dXJuIG5ldyBIdG1sNEVudGl0aWVzKCkuZGVjb2RlKHN0cik7XG59O1xuXG4vKipcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHJcbiAqIEByZXR1cm5zIHtTdHJpbmd9XG4gKi9cbkh0bWw0RW50aXRpZXMucHJvdG90eXBlLmVuY29kZSA9IGZ1bmN0aW9uKHN0cikge1xuICAgIHZhciBzdHJMZW5ndGggPSBzdHIubGVuZ3RoO1xuICAgIGlmIChzdHJMZW5ndGggPT09IDApIHtcbiAgICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgICB2YXIgcmVzdWx0ID0gJyc7XG4gICAgdmFyIGkgPSAwO1xuICAgIHdoaWxlIChpIDwgc3RyTGVuZ3RoKSB7XG4gICAgICAgIHZhciBhbHBoYSA9IG51bUluZGV4W3N0ci5jaGFyQ29kZUF0KGkpXTtcbiAgICAgICAgcmVzdWx0ICs9IGFscGhhID8gXCImXCIgKyBhbHBoYSArIFwiO1wiIDogc3RyLmNoYXJBdChpKTtcbiAgICAgICAgaSsrO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xufTtcblxuLyoqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyXG4gKiBAcmV0dXJucyB7U3RyaW5nfVxuICovXG5IdG1sNEVudGl0aWVzLmVuY29kZSA9IGZ1bmN0aW9uKHN0cikge1xuICAgIHJldHVybiBuZXcgSHRtbDRFbnRpdGllcygpLmVuY29kZShzdHIpO1xufTtcblxuLyoqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyXG4gKiBAcmV0dXJucyB7U3RyaW5nfVxuICovXG5IdG1sNEVudGl0aWVzLnByb3RvdHlwZS5lbmNvZGVOb25VVEYgPSBmdW5jdGlvbihzdHIpIHtcbiAgICB2YXIgc3RyTGVuZ3RoID0gc3RyLmxlbmd0aDtcbiAgICBpZiAoc3RyTGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHJldHVybiAnJztcbiAgICB9XG4gICAgdmFyIHJlc3VsdCA9ICcnO1xuICAgIHZhciBpID0gMDtcbiAgICB3aGlsZSAoaSA8IHN0ckxlbmd0aCkge1xuICAgICAgICB2YXIgY2MgPSBzdHIuY2hhckNvZGVBdChpKTtcbiAgICAgICAgdmFyIGFscGhhID0gbnVtSW5kZXhbY2NdO1xuICAgICAgICBpZiAoYWxwaGEpIHtcbiAgICAgICAgICAgIHJlc3VsdCArPSBcIiZcIiArIGFscGhhICsgXCI7XCI7XG4gICAgICAgIH0gZWxzZSBpZiAoY2MgPCAzMiB8fCBjYyA+IDEyNikge1xuICAgICAgICAgICAgcmVzdWx0ICs9IFwiJiNcIiArIGNjICsgXCI7XCI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXN1bHQgKz0gc3RyLmNoYXJBdChpKTtcbiAgICAgICAgfVxuICAgICAgICBpKys7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG59O1xuXG4vKipcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHJcbiAqIEByZXR1cm5zIHtTdHJpbmd9XG4gKi9cbkh0bWw0RW50aXRpZXMuZW5jb2RlTm9uVVRGID0gZnVuY3Rpb24oc3RyKSB7XG4gICAgcmV0dXJuIG5ldyBIdG1sNEVudGl0aWVzKCkuZW5jb2RlTm9uVVRGKHN0cik7XG59O1xuXG4vKipcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHJcbiAqIEByZXR1cm5zIHtTdHJpbmd9XG4gKi9cbkh0bWw0RW50aXRpZXMucHJvdG90eXBlLmVuY29kZU5vbkFTQ0lJID0gZnVuY3Rpb24oc3RyKSB7XG4gICAgdmFyIHN0ckxlbmd0aCA9IHN0ci5sZW5ndGg7XG4gICAgaWYgKHN0ckxlbmd0aCA9PT0gMCkge1xuICAgICAgICByZXR1cm4gJyc7XG4gICAgfVxuICAgIHZhciByZXN1bHQgPSAnJztcbiAgICB2YXIgaSA9IDA7XG4gICAgd2hpbGUgKGkgPCBzdHJMZW5ndGgpIHtcbiAgICAgICAgdmFyIGMgPSBzdHIuY2hhckNvZGVBdChpKTtcbiAgICAgICAgaWYgKGMgPD0gMjU1KSB7XG4gICAgICAgICAgICByZXN1bHQgKz0gc3RyW2krK107XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICByZXN1bHQgKz0gJyYjJyArIGMgKyAnOyc7XG4gICAgICAgIGkrKztcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbn07XG5cbi8qKlxuICogQHBhcmFtIHtTdHJpbmd9IHN0clxuICogQHJldHVybnMge1N0cmluZ31cbiAqL1xuSHRtbDRFbnRpdGllcy5lbmNvZGVOb25BU0NJSSA9IGZ1bmN0aW9uKHN0cikge1xuICAgIHJldHVybiBuZXcgSHRtbDRFbnRpdGllcygpLmVuY29kZU5vbkFTQ0lJKHN0cik7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEh0bWw0RW50aXRpZXM7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9odG1sLWVudGl0aWVzL2xpYi9odG1sNC1lbnRpdGllcy5qc1xuICoqIG1vZHVsZSBpZCA9IDk2XG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAyXG4gKiovIiwidmFyIEFMUEhBX0lOREVYID0ge1xuICAgICcmbHQnOiAnPCcsXG4gICAgJyZndCc6ICc+JyxcbiAgICAnJnF1b3QnOiAnXCInLFxuICAgICcmYXBvcyc6ICdcXCcnLFxuICAgICcmYW1wJzogJyYnLFxuICAgICcmbHQ7JzogJzwnLFxuICAgICcmZ3Q7JzogJz4nLFxuICAgICcmcXVvdDsnOiAnXCInLFxuICAgICcmYXBvczsnOiAnXFwnJyxcbiAgICAnJmFtcDsnOiAnJidcbn07XG5cbnZhciBDSEFSX0lOREVYID0ge1xuICAgIDYwOiAnbHQnLFxuICAgIDYyOiAnZ3QnLFxuICAgIDM0OiAncXVvdCcsXG4gICAgMzk6ICdhcG9zJyxcbiAgICAzODogJ2FtcCdcbn07XG5cbnZhciBDSEFSX1NfSU5ERVggPSB7XG4gICAgJzwnOiAnJmx0OycsXG4gICAgJz4nOiAnJmd0OycsXG4gICAgJ1wiJzogJyZxdW90OycsXG4gICAgJ1xcJyc6ICcmYXBvczsnLFxuICAgICcmJzogJyZhbXA7J1xufTtcblxuLyoqXG4gKiBAY29uc3RydWN0b3JcbiAqL1xuZnVuY3Rpb24gWG1sRW50aXRpZXMoKSB7fVxuXG4vKipcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHJcbiAqIEByZXR1cm5zIHtTdHJpbmd9XG4gKi9cblhtbEVudGl0aWVzLnByb3RvdHlwZS5lbmNvZGUgPSBmdW5jdGlvbihzdHIpIHtcbiAgICBpZiAoc3RyLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICByZXR1cm4gJyc7XG4gICAgfVxuICAgIHJldHVybiBzdHIucmVwbGFjZSgvPHw+fFwifCd8Ji9nLCBmdW5jdGlvbihzKSB7XG4gICAgICAgIHJldHVybiBDSEFSX1NfSU5ERVhbc107XG4gICAgfSk7XG59O1xuXG4vKipcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHJcbiAqIEByZXR1cm5zIHtTdHJpbmd9XG4gKi9cbiBYbWxFbnRpdGllcy5lbmNvZGUgPSBmdW5jdGlvbihzdHIpIHtcbiAgICByZXR1cm4gbmV3IFhtbEVudGl0aWVzKCkuZW5jb2RlKHN0cik7XG4gfTtcblxuLyoqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyXG4gKiBAcmV0dXJucyB7U3RyaW5nfVxuICovXG5YbWxFbnRpdGllcy5wcm90b3R5cGUuZGVjb2RlID0gZnVuY3Rpb24oc3RyKSB7XG4gICAgaWYgKHN0ci5sZW5ndGggPT09IDApIHtcbiAgICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgICByZXR1cm4gc3RyLnJlcGxhY2UoLyYjP1swLTlhLXpBLVpdKzs/L2csIGZ1bmN0aW9uKHMpIHtcbiAgICAgICAgaWYgKHMuY2hhckF0KDEpID09PSAnIycpIHtcbiAgICAgICAgICAgIHZhciBjb2RlID0gcy5jaGFyQXQoMikudG9Mb3dlckNhc2UoKSA9PT0gJ3gnID9cbiAgICAgICAgICAgICAgICBwYXJzZUludChzLnN1YnN0cigzKSwgMTYpIDpcbiAgICAgICAgICAgICAgICBwYXJzZUludChzLnN1YnN0cigyKSk7XG5cbiAgICAgICAgICAgIGlmIChpc05hTihjb2RlKSB8fCBjb2RlIDwgLTMyNzY4IHx8IGNvZGUgPiA2NTUzNSkge1xuICAgICAgICAgICAgICAgIHJldHVybiAnJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBTdHJpbmcuZnJvbUNoYXJDb2RlKGNvZGUpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBBTFBIQV9JTkRFWFtzXSB8fCBzO1xuICAgIH0pO1xufTtcblxuLyoqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyXG4gKiBAcmV0dXJucyB7U3RyaW5nfVxuICovXG4gWG1sRW50aXRpZXMuZGVjb2RlID0gZnVuY3Rpb24oc3RyKSB7XG4gICAgcmV0dXJuIG5ldyBYbWxFbnRpdGllcygpLmRlY29kZShzdHIpO1xuIH07XG5cbi8qKlxuICogQHBhcmFtIHtTdHJpbmd9IHN0clxuICogQHJldHVybnMge1N0cmluZ31cbiAqL1xuWG1sRW50aXRpZXMucHJvdG90eXBlLmVuY29kZU5vblVURiA9IGZ1bmN0aW9uKHN0cikge1xuICAgIHZhciBzdHJMZW5ndGggPSBzdHIubGVuZ3RoO1xuICAgIGlmIChzdHJMZW5ndGggPT09IDApIHtcbiAgICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgICB2YXIgcmVzdWx0ID0gJyc7XG4gICAgdmFyIGkgPSAwO1xuICAgIHdoaWxlIChpIDwgc3RyTGVuZ3RoKSB7XG4gICAgICAgIHZhciBjID0gc3RyLmNoYXJDb2RlQXQoaSk7XG4gICAgICAgIHZhciBhbHBoYSA9IENIQVJfSU5ERVhbY107XG4gICAgICAgIGlmIChhbHBoYSkge1xuICAgICAgICAgICAgcmVzdWx0ICs9IFwiJlwiICsgYWxwaGEgKyBcIjtcIjtcbiAgICAgICAgICAgIGkrKztcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjIDwgMzIgfHwgYyA+IDEyNikge1xuICAgICAgICAgICAgcmVzdWx0ICs9ICcmIycgKyBjICsgJzsnO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVzdWx0ICs9IHN0ci5jaGFyQXQoaSk7XG4gICAgICAgIH1cbiAgICAgICAgaSsrO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xufTtcblxuLyoqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyXG4gKiBAcmV0dXJucyB7U3RyaW5nfVxuICovXG4gWG1sRW50aXRpZXMuZW5jb2RlTm9uVVRGID0gZnVuY3Rpb24oc3RyKSB7XG4gICAgcmV0dXJuIG5ldyBYbWxFbnRpdGllcygpLmVuY29kZU5vblVURihzdHIpO1xuIH07XG5cbi8qKlxuICogQHBhcmFtIHtTdHJpbmd9IHN0clxuICogQHJldHVybnMge1N0cmluZ31cbiAqL1xuWG1sRW50aXRpZXMucHJvdG90eXBlLmVuY29kZU5vbkFTQ0lJID0gZnVuY3Rpb24oc3RyKSB7XG4gICAgdmFyIHN0ckxlbmdodCA9IHN0ci5sZW5ndGg7XG4gICAgaWYgKHN0ckxlbmdodCA9PT0gMCkge1xuICAgICAgICByZXR1cm4gJyc7XG4gICAgfVxuICAgIHZhciByZXN1bHQgPSAnJztcbiAgICB2YXIgaSA9IDA7XG4gICAgd2hpbGUgKGkgPCBzdHJMZW5naHQpIHtcbiAgICAgICAgdmFyIGMgPSBzdHIuY2hhckNvZGVBdChpKTtcbiAgICAgICAgaWYgKGMgPD0gMjU1KSB7XG4gICAgICAgICAgICByZXN1bHQgKz0gc3RyW2krK107XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICByZXN1bHQgKz0gJyYjJyArIGMgKyAnOyc7XG4gICAgICAgIGkrKztcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbn07XG5cbi8qKlxuICogQHBhcmFtIHtTdHJpbmd9IHN0clxuICogQHJldHVybnMge1N0cmluZ31cbiAqL1xuIFhtbEVudGl0aWVzLmVuY29kZU5vbkFTQ0lJID0gZnVuY3Rpb24oc3RyKSB7XG4gICAgcmV0dXJuIG5ldyBYbWxFbnRpdGllcygpLmVuY29kZU5vbkFTQ0lJKHN0cik7XG4gfTtcblxubW9kdWxlLmV4cG9ydHMgPSBYbWxFbnRpdGllcztcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2h0bWwtZW50aXRpZXMvbGliL3htbC1lbnRpdGllcy5qc1xuICoqIG1vZHVsZSBpZCA9IDk3XG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAyXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGFuc2lSZWdleCA9IHJlcXVpcmUoJ2Fuc2ktcmVnZXgnKSgpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChzdHIpIHtcblx0cmV0dXJuIHR5cGVvZiBzdHIgPT09ICdzdHJpbmcnID8gc3RyLnJlcGxhY2UoYW5zaVJlZ2V4LCAnJykgOiBzdHI7XG59O1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vc3RyaXAtYW5zaS9pbmRleC5qc1xuICoqIG1vZHVsZSBpZCA9IDk4XG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAyXG4gKiovIiwiLyplc2xpbnQtZW52IGJyb3dzZXIqL1xuXG52YXIgY2xpZW50T3ZlcmxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xudmFyIHN0eWxlcyA9IHtcbiAgYmFja2dyb3VuZDogJ3JnYmEoMCwwLDAsMC44NSknLFxuICBjb2xvcjogJyNFOEU4RTgnLFxuICBsaW5lSGVpZ2h0OiAnMS4yJyxcbiAgd2hpdGVTcGFjZTogJ3ByZScsXG4gIGZvbnRGYW1pbHk6ICdNZW5sbywgQ29uc29sYXMsIG1vbm9zcGFjZScsXG4gIGZvbnRTaXplOiAnMTNweCcsXG4gIHBvc2l0aW9uOiAnZml4ZWQnLFxuICB6SW5kZXg6IDk5OTksXG4gIHBhZGRpbmc6ICcxMHB4JyxcbiAgbGVmdDogMCxcbiAgcmlnaHQ6IDAsXG4gIHRvcDogMCxcbiAgYm90dG9tOiAwLFxuICBvdmVyZmxvdzogJ2F1dG8nLFxuICBkaXI6ICdsdHInXG59O1xuZm9yICh2YXIga2V5IGluIHN0eWxlcykge1xuICBjbGllbnRPdmVybGF5LnN0eWxlW2tleV0gPSBzdHlsZXNba2V5XTtcbn1cblxudmFyIGFuc2lIVE1MID0gcmVxdWlyZSgnYW5zaS1odG1sJyk7XG52YXIgY29sb3JzID0ge1xuICByZXNldDogWyd0cmFuc3BhcmVudCcsICd0cmFuc3BhcmVudCddLFxuICBibGFjazogJzE4MTgxOCcsXG4gIHJlZDogJ0UzNjA0OScsXG4gIGdyZWVuOiAnQjNDQjc0JyxcbiAgeWVsbG93OiAnRkZEMDgwJyxcbiAgYmx1ZTogJzdDQUZDMicsXG4gIG1hZ2VudGE6ICc3RkFDQ0EnLFxuICBjeWFuOiAnQzNDMkVGJyxcbiAgbGlnaHRncmV5OiAnRUJFN0UzJyxcbiAgZGFya2dyZXk6ICc2RDc4OTEnXG59O1xuYW5zaUhUTUwuc2V0Q29sb3JzKGNvbG9ycyk7XG5cbnZhciBFbnRpdGllcyA9IHJlcXVpcmUoJ2h0bWwtZW50aXRpZXMnKS5BbGxIdG1sRW50aXRpZXM7XG52YXIgZW50aXRpZXMgPSBuZXcgRW50aXRpZXMoKTtcblxuZXhwb3J0cy5zaG93UHJvYmxlbXMgPVxuZnVuY3Rpb24gc2hvd1Byb2JsZW1zKHR5cGUsIGxpbmVzKSB7XG4gIGNsaWVudE92ZXJsYXkuaW5uZXJIVE1MID0gJyc7XG4gIGxpbmVzLmZvckVhY2goZnVuY3Rpb24obXNnKSB7XG4gICAgbXNnID0gYW5zaUhUTUwoZW50aXRpZXMuZW5jb2RlKG1zZykpO1xuICAgIHZhciBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBkaXYuc3R5bGUubWFyZ2luQm90dG9tID0gJzI2cHgnO1xuICAgIGRpdi5pbm5lckhUTUwgPSBwcm9ibGVtVHlwZSh0eXBlKSArICcgaW4gJyArIG1zZztcbiAgICBjbGllbnRPdmVybGF5LmFwcGVuZENoaWxkKGRpdik7XG4gIH0pO1xuICBpZiAoZG9jdW1lbnQuYm9keSkge1xuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoY2xpZW50T3ZlcmxheSk7XG4gIH1cbn07XG5cbmV4cG9ydHMuY2xlYXIgPVxuZnVuY3Rpb24gY2xlYXIoKSB7XG4gIGlmIChkb2N1bWVudC5ib2R5ICYmIGNsaWVudE92ZXJsYXkucGFyZW50Tm9kZSkge1xuICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQoY2xpZW50T3ZlcmxheSk7XG4gIH1cbn07XG5cbnZhciBwcm9ibGVtQ29sb3JzID0ge1xuICBlcnJvcnM6IGNvbG9ycy5yZWQsXG4gIHdhcm5pbmdzOiBjb2xvcnMueWVsbG93XG59O1xuXG5mdW5jdGlvbiBwcm9ibGVtVHlwZSAodHlwZSkge1xuICB2YXIgY29sb3IgPSBwcm9ibGVtQ29sb3JzW3R5cGVdIHx8IGNvbG9ycy5yZWQ7XG4gIHJldHVybiAoXG4gICAgJzxzcGFuIHN0eWxlPVwiYmFja2dyb3VuZC1jb2xvcjojJyArIGNvbG9yICsgJzsgY29sb3I6I2ZmZjsgcGFkZGluZzoycHggNHB4OyBib3JkZXItcmFkaXVzOiAycHhcIj4nICtcbiAgICAgIHR5cGUuc2xpY2UoMCwgLTEpLnRvVXBwZXJDYXNlKCkgK1xuICAgICc8L3NwYW4+J1xuICApO1xufVxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAod2VicGFjayktaG90LW1pZGRsZXdhcmUvY2xpZW50LW92ZXJsYXkuanNcbiAqKiBtb2R1bGUgaWQgPSA5OVxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDEgMlxuICoqLyIsIi8qZXNsaW50LWVudiBicm93c2VyKi9cbi8qZ2xvYmFsIF9fcmVzb3VyY2VRdWVyeSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyovXG5cbnZhciBvcHRpb25zID0ge1xuICBwYXRoOiBcIi9fX3dlYnBhY2tfaG1yXCIsXG4gIHRpbWVvdXQ6IDIwICogMTAwMCxcbiAgb3ZlcmxheTogdHJ1ZSxcbiAgcmVsb2FkOiBmYWxzZSxcbiAgbG9nOiB0cnVlLFxuICB3YXJuOiB0cnVlXG59O1xuaWYgKF9fcmVzb3VyY2VRdWVyeSkge1xuICB2YXIgcXVlcnlzdHJpbmcgPSByZXF1aXJlKCdxdWVyeXN0cmluZycpO1xuICB2YXIgb3ZlcnJpZGVzID0gcXVlcnlzdHJpbmcucGFyc2UoX19yZXNvdXJjZVF1ZXJ5LnNsaWNlKDEpKTtcbiAgaWYgKG92ZXJyaWRlcy5wYXRoKSBvcHRpb25zLnBhdGggPSBvdmVycmlkZXMucGF0aDtcbiAgaWYgKG92ZXJyaWRlcy50aW1lb3V0KSBvcHRpb25zLnRpbWVvdXQgPSBvdmVycmlkZXMudGltZW91dDtcbiAgaWYgKG92ZXJyaWRlcy5vdmVybGF5KSBvcHRpb25zLm92ZXJsYXkgPSBvdmVycmlkZXMub3ZlcmxheSAhPT0gJ2ZhbHNlJztcbiAgaWYgKG92ZXJyaWRlcy5yZWxvYWQpIG9wdGlvbnMucmVsb2FkID0gb3ZlcnJpZGVzLnJlbG9hZCAhPT0gJ2ZhbHNlJztcbiAgaWYgKG92ZXJyaWRlcy5ub0luZm8gJiYgb3ZlcnJpZGVzLm5vSW5mbyAhPT0gJ2ZhbHNlJykge1xuICAgIG9wdGlvbnMubG9nID0gZmFsc2U7XG4gIH1cbiAgaWYgKG92ZXJyaWRlcy5xdWlldCAmJiBvdmVycmlkZXMucXVpZXQgIT09ICdmYWxzZScpIHtcbiAgICBvcHRpb25zLmxvZyA9IGZhbHNlO1xuICAgIG9wdGlvbnMud2FybiA9IGZhbHNlO1xuICB9XG4gIGlmIChvdmVycmlkZXMuZHluYW1pY1B1YmxpY1BhdGgpIHtcbiAgICBvcHRpb25zLnBhdGggPSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArIG9wdGlvbnMucGF0aDtcbiAgfVxufVxuXG5pZiAodHlwZW9mIHdpbmRvdyA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgLy8gZG8gbm90aGluZ1xufSBlbHNlIGlmICh0eXBlb2Ygd2luZG93LkV2ZW50U291cmNlID09PSAndW5kZWZpbmVkJykge1xuICBjb25zb2xlLndhcm4oXG4gICAgXCJ3ZWJwYWNrLWhvdC1taWRkbGV3YXJlJ3MgY2xpZW50IHJlcXVpcmVzIEV2ZW50U291cmNlIHRvIHdvcmsuIFwiICtcbiAgICBcIllvdSBzaG91bGQgaW5jbHVkZSBhIHBvbHlmaWxsIGlmIHlvdSB3YW50IHRvIHN1cHBvcnQgdGhpcyBicm93c2VyOiBcIiArXG4gICAgXCJodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvU2VydmVyLXNlbnRfZXZlbnRzI1Rvb2xzXCJcbiAgKTtcbn0gZWxzZSB7XG4gIGNvbm5lY3Qod2luZG93LkV2ZW50U291cmNlKTtcbn1cblxuZnVuY3Rpb24gY29ubmVjdChFdmVudFNvdXJjZSkge1xuICB2YXIgc291cmNlID0gbmV3IEV2ZW50U291cmNlKG9wdGlvbnMucGF0aCk7XG4gIHZhciBsYXN0QWN0aXZpdHkgPSBuZXcgRGF0ZSgpO1xuXG4gIHNvdXJjZS5vbm9wZW4gPSBoYW5kbGVPbmxpbmU7XG4gIHNvdXJjZS5vbm1lc3NhZ2UgPSBoYW5kbGVNZXNzYWdlO1xuICBzb3VyY2Uub25lcnJvciA9IGhhbmRsZURpc2Nvbm5lY3Q7XG5cbiAgdmFyIHRpbWVyID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKSB7XG4gICAgaWYgKChuZXcgRGF0ZSgpIC0gbGFzdEFjdGl2aXR5KSA+IG9wdGlvbnMudGltZW91dCkge1xuICAgICAgaGFuZGxlRGlzY29ubmVjdCgpO1xuICAgIH1cbiAgfSwgb3B0aW9ucy50aW1lb3V0IC8gMik7XG5cbiAgZnVuY3Rpb24gaGFuZGxlT25saW5lKCkge1xuICAgIGlmIChvcHRpb25zLmxvZykgY29uc29sZS5sb2coXCJbSE1SXSBjb25uZWN0ZWRcIik7XG4gICAgbGFzdEFjdGl2aXR5ID0gbmV3IERhdGUoKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGhhbmRsZU1lc3NhZ2UoZXZlbnQpIHtcbiAgICBsYXN0QWN0aXZpdHkgPSBuZXcgRGF0ZSgpO1xuICAgIGlmIChldmVudC5kYXRhID09IFwiXFx1RDgzRFxcdURDOTNcIikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgcHJvY2Vzc01lc3NhZ2UoSlNPTi5wYXJzZShldmVudC5kYXRhKSk7XG4gICAgfSBjYXRjaCAoZXgpIHtcbiAgICAgIGlmIChvcHRpb25zLndhcm4pIHtcbiAgICAgICAgY29uc29sZS53YXJuKFwiSW52YWxpZCBITVIgbWVzc2FnZTogXCIgKyBldmVudC5kYXRhICsgXCJcXG5cIiArIGV4KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBoYW5kbGVEaXNjb25uZWN0KCkge1xuICAgIGNsZWFySW50ZXJ2YWwodGltZXIpO1xuICAgIHNvdXJjZS5jbG9zZSgpO1xuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7IGNvbm5lY3QoRXZlbnRTb3VyY2UpOyB9LCBvcHRpb25zLnRpbWVvdXQpO1xuICB9XG5cbn1cblxudmFyIHJlcG9ydGVyO1xuLy8gdGhlIHJlcG9ydGVyIG5lZWRzIHRvIGJlIGEgc2luZ2xldG9uIG9uIHRoZSBwYWdlXG4vLyBpbiBjYXNlIHRoZSBjbGllbnQgaXMgYmVpbmcgdXNlZCBieSBtdXRsaXBsZSBidW5kbGVzXG4vLyB3ZSBvbmx5IHdhbnQgdG8gcmVwb3J0IG9uY2UuXG4vLyBhbGwgdGhlIGVycm9ycyB3aWxsIGdvIHRvIGFsbCBjbGllbnRzXG52YXIgc2luZ2xldG9uS2V5ID0gJ19fd2VicGFja19ob3RfbWlkZGxld2FyZV9yZXBvcnRlcl9fJztcbmlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiAhd2luZG93W3NpbmdsZXRvbktleV0pIHtcbiAgcmVwb3J0ZXIgPSB3aW5kb3dbc2luZ2xldG9uS2V5XSA9IGNyZWF0ZVJlcG9ydGVyKCk7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVJlcG9ydGVyKCkge1xuICB2YXIgc3RyaXAgPSByZXF1aXJlKCdzdHJpcC1hbnNpJyk7XG5cbiAgdmFyIG92ZXJsYXk7XG4gIGlmICh0eXBlb2YgZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnICYmIG9wdGlvbnMub3ZlcmxheSkge1xuICAgIG92ZXJsYXkgPSByZXF1aXJlKCcuL2NsaWVudC1vdmVybGF5Jyk7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIHByb2JsZW1zOiBmdW5jdGlvbih0eXBlLCBvYmopIHtcbiAgICAgIGlmIChvcHRpb25zLndhcm4pIHtcbiAgICAgICAgY29uc29sZS53YXJuKFwiW0hNUl0gYnVuZGxlIGhhcyBcIiArIHR5cGUgKyBcIjpcIik7XG4gICAgICAgIG9ialt0eXBlXS5mb3JFYWNoKGZ1bmN0aW9uKG1zZykge1xuICAgICAgICAgIGNvbnNvbGUud2FybihcIltITVJdIFwiICsgc3RyaXAobXNnKSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgaWYgKG92ZXJsYXkgJiYgdHlwZSAhPT0gJ3dhcm5pbmdzJykgb3ZlcmxheS5zaG93UHJvYmxlbXModHlwZSwgb2JqW3R5cGVdKTtcbiAgICB9LFxuICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKG92ZXJsYXkpIG92ZXJsYXkuY2xlYXIoKTtcbiAgICB9LFxuICAgIHVzZUN1c3RvbU92ZXJsYXk6IGZ1bmN0aW9uKGN1c3RvbU92ZXJsYXkpIHtcbiAgICAgIG92ZXJsYXkgPSBjdXN0b21PdmVybGF5O1xuICAgIH1cbiAgfTtcbn1cblxudmFyIHByb2Nlc3NVcGRhdGUgPSByZXF1aXJlKCcuL3Byb2Nlc3MtdXBkYXRlJyk7XG5cbnZhciBjdXN0b21IYW5kbGVyO1xudmFyIHN1YnNjcmliZUFsbEhhbmRsZXI7XG5mdW5jdGlvbiBwcm9jZXNzTWVzc2FnZShvYmopIHtcbiAgaWYgKG9iai5hY3Rpb24gPT0gXCJidWlsZGluZ1wiKSB7XG4gICAgaWYgKG9wdGlvbnMubG9nKSBjb25zb2xlLmxvZyhcIltITVJdIGJ1bmRsZSByZWJ1aWxkaW5nXCIpO1xuICB9IGVsc2UgaWYgKG9iai5hY3Rpb24gPT0gXCJidWlsdFwiKSB7XG4gICAgaWYgKG9wdGlvbnMubG9nKSB7XG4gICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgXCJbSE1SXSBidW5kbGUgXCIgKyAob2JqLm5hbWUgPyBvYmoubmFtZSArIFwiIFwiIDogXCJcIikgK1xuICAgICAgICBcInJlYnVpbHQgaW4gXCIgKyBvYmoudGltZSArIFwibXNcIlxuICAgICAgKTtcbiAgICB9XG4gICAgaWYgKG9iai5lcnJvcnMubGVuZ3RoID4gMCkge1xuICAgICAgaWYgKHJlcG9ydGVyKSByZXBvcnRlci5wcm9ibGVtcygnZXJyb3JzJywgb2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHJlcG9ydGVyKSB7XG4gICAgICAgIGlmIChvYmoud2FybmluZ3MubGVuZ3RoID4gMCkgcmVwb3J0ZXIucHJvYmxlbXMoJ3dhcm5pbmdzJywgb2JqKTtcbiAgICAgICAgcmVwb3J0ZXIuc3VjY2VzcygpO1xuICAgICAgfVxuXG4gICAgICBwcm9jZXNzVXBkYXRlKG9iai5oYXNoLCBvYmoubW9kdWxlcywgb3B0aW9ucyk7XG4gICAgfVxuICB9IGVsc2UgaWYgKGN1c3RvbUhhbmRsZXIpIHtcbiAgICBjdXN0b21IYW5kbGVyKG9iaik7XG4gIH1cblxuICBpZiAoc3Vic2NyaWJlQWxsSGFuZGxlcikge1xuICAgIHN1YnNjcmliZUFsbEhhbmRsZXIob2JqKTtcbiAgfVxufVxuXG5pZiAobW9kdWxlKSB7XG4gIG1vZHVsZS5leHBvcnRzID0ge1xuICAgIHN1YnNjcmliZUFsbDogZnVuY3Rpb24gc3Vic2NyaWJlQWxsKGhhbmRsZXIpIHtcbiAgICAgIHN1YnNjcmliZUFsbEhhbmRsZXIgPSBoYW5kbGVyO1xuICAgIH0sXG4gICAgc3Vic2NyaWJlOiBmdW5jdGlvbiBzdWJzY3JpYmUoaGFuZGxlcikge1xuICAgICAgY3VzdG9tSGFuZGxlciA9IGhhbmRsZXI7XG4gICAgfSxcbiAgICB1c2VDdXN0b21PdmVybGF5OiBmdW5jdGlvbiB1c2VDdXN0b21PdmVybGF5KGN1c3RvbU92ZXJsYXkpIHtcbiAgICAgIGlmIChyZXBvcnRlcikgcmVwb3J0ZXIudXNlQ3VzdG9tT3ZlcmxheShjdXN0b21PdmVybGF5KTtcbiAgICB9XG4gIH07XG59XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqICh3ZWJwYWNrKS1ob3QtbWlkZGxld2FyZS9jbGllbnQuanNcbiAqKiBtb2R1bGUgaWQgPSAxMDBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDJcbiAqKi8iLCIvKipcbiAqIEJhc2VkIGhlYXZpbHkgb24gaHR0cHM6Ly9naXRodWIuY29tL3dlYnBhY2svd2VicGFjay9ibG9iL1xuICogIGMwYWZkZjljNmFiYzFkZDcwNzA3YzU5NGU0NzM4MDJhNTY2ZjdiNmUvaG90L29ubHktZGV2LXNlcnZlci5qc1xuICogT3JpZ2luYWwgY29weXJpZ2h0IFRvYmlhcyBLb3BwZXJzIEBzb2tyYSAoTUlUIGxpY2Vuc2UpXG4gKi9cblxuLyogZ2xvYmFsIHdpbmRvdyBfX3dlYnBhY2tfaGFzaF9fICovXG5cbmlmICghbW9kdWxlLmhvdCkge1xuICB0aHJvdyBuZXcgRXJyb3IoXCJbSE1SXSBIb3QgTW9kdWxlIFJlcGxhY2VtZW50IGlzIGRpc2FibGVkLlwiKTtcbn1cblxudmFyIGhtckRvY3NVcmwgPSBcImh0dHA6Ly93ZWJwYWNrLmdpdGh1Yi5pby9kb2NzL2hvdC1tb2R1bGUtcmVwbGFjZW1lbnQtd2l0aC13ZWJwYWNrLmh0bWxcIjsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBtYXgtbGVuXG5cbnZhciBsYXN0SGFzaDtcbnZhciBmYWlsdXJlU3RhdHVzZXMgPSB7IGFib3J0OiAxLCBmYWlsOiAxIH07XG52YXIgYXBwbHlPcHRpb25zID0geyBpZ25vcmVVbmFjY2VwdGVkOiB0cnVlIH07XG5cbmZ1bmN0aW9uIHVwVG9EYXRlKGhhc2gpIHtcbiAgaWYgKGhhc2gpIGxhc3RIYXNoID0gaGFzaDtcbiAgcmV0dXJuIGxhc3RIYXNoID09IF9fd2VicGFja19oYXNoX187XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaGFzaCwgbW9kdWxlTWFwLCBvcHRpb25zKSB7XG4gIHZhciByZWxvYWQgPSBvcHRpb25zLnJlbG9hZDtcbiAgaWYgKCF1cFRvRGF0ZShoYXNoKSAmJiBtb2R1bGUuaG90LnN0YXR1cygpID09IFwiaWRsZVwiKSB7XG4gICAgaWYgKG9wdGlvbnMubG9nKSBjb25zb2xlLmxvZyhcIltITVJdIENoZWNraW5nIGZvciB1cGRhdGVzIG9uIHRoZSBzZXJ2ZXIuLi5cIik7XG4gICAgY2hlY2soKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNoZWNrKCkge1xuICAgIHZhciBjYiA9IGZ1bmN0aW9uKGVyciwgdXBkYXRlZE1vZHVsZXMpIHtcbiAgICAgIGlmIChlcnIpIHJldHVybiBoYW5kbGVFcnJvcihlcnIpO1xuXG4gICAgICBpZighdXBkYXRlZE1vZHVsZXMpIHtcbiAgICAgICAgaWYgKG9wdGlvbnMud2Fybikge1xuICAgICAgICAgIGNvbnNvbGUud2FybihcIltITVJdIENhbm5vdCBmaW5kIHVwZGF0ZSAoRnVsbCByZWxvYWQgbmVlZGVkKVwiKTtcbiAgICAgICAgICBjb25zb2xlLndhcm4oXCJbSE1SXSAoUHJvYmFibHkgYmVjYXVzZSBvZiByZXN0YXJ0aW5nIHRoZSBzZXJ2ZXIpXCIpO1xuICAgICAgICB9XG4gICAgICAgIHBlcmZvcm1SZWxvYWQoKTtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG5cbiAgICAgIHZhciBhcHBseUNhbGxiYWNrID0gZnVuY3Rpb24oYXBwbHlFcnIsIHJlbmV3ZWRNb2R1bGVzKSB7XG4gICAgICAgIGlmIChhcHBseUVycikgcmV0dXJuIGhhbmRsZUVycm9yKGFwcGx5RXJyKTtcblxuICAgICAgICBpZiAoIXVwVG9EYXRlKCkpIGNoZWNrKCk7XG5cbiAgICAgICAgbG9nVXBkYXRlcyh1cGRhdGVkTW9kdWxlcywgcmVuZXdlZE1vZHVsZXMpO1xuICAgICAgfTtcblxuICAgICAgdmFyIGFwcGx5UmVzdWx0ID0gbW9kdWxlLmhvdC5hcHBseShhcHBseU9wdGlvbnMsIGFwcGx5Q2FsbGJhY2spO1xuICAgICAgLy8gd2VicGFjayAyIHByb21pc2VcbiAgICAgIGlmIChhcHBseVJlc3VsdCAmJiBhcHBseVJlc3VsdC50aGVuKSB7XG4gICAgICAgIC8vIEhvdE1vZHVsZVJlcGxhY2VtZW50LnJ1bnRpbWUuanMgcmVmZXJzIHRvIHRoZSByZXN1bHQgYXMgYG91dGRhdGVkTW9kdWxlc2BcbiAgICAgICAgYXBwbHlSZXN1bHQudGhlbihmdW5jdGlvbihvdXRkYXRlZE1vZHVsZXMpIHtcbiAgICAgICAgICBhcHBseUNhbGxiYWNrKG51bGwsIG91dGRhdGVkTW9kdWxlcyk7XG4gICAgICAgIH0pO1xuICAgICAgICBhcHBseVJlc3VsdC5jYXRjaChhcHBseUNhbGxiYWNrKTtcbiAgICAgIH1cblxuICAgIH07XG5cbiAgICB2YXIgcmVzdWx0ID0gbW9kdWxlLmhvdC5jaGVjayhmYWxzZSwgY2IpO1xuICAgIC8vIHdlYnBhY2sgMiBwcm9taXNlXG4gICAgaWYgKHJlc3VsdCAmJiByZXN1bHQudGhlbikge1xuICAgICAgICByZXN1bHQudGhlbihmdW5jdGlvbih1cGRhdGVkTW9kdWxlcykge1xuICAgICAgICAgICAgY2IobnVsbCwgdXBkYXRlZE1vZHVsZXMpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmVzdWx0LmNhdGNoKGNiKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBsb2dVcGRhdGVzKHVwZGF0ZWRNb2R1bGVzLCByZW5ld2VkTW9kdWxlcykge1xuICAgIHZhciB1bmFjY2VwdGVkTW9kdWxlcyA9IHVwZGF0ZWRNb2R1bGVzLmZpbHRlcihmdW5jdGlvbihtb2R1bGVJZCkge1xuICAgICAgcmV0dXJuIHJlbmV3ZWRNb2R1bGVzICYmIHJlbmV3ZWRNb2R1bGVzLmluZGV4T2YobW9kdWxlSWQpIDwgMDtcbiAgICB9KTtcblxuICAgIGlmKHVuYWNjZXB0ZWRNb2R1bGVzLmxlbmd0aCA+IDApIHtcbiAgICAgIGlmIChvcHRpb25zLndhcm4pIHtcbiAgICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICAgIFwiW0hNUl0gVGhlIGZvbGxvd2luZyBtb2R1bGVzIGNvdWxkbid0IGJlIGhvdCB1cGRhdGVkOiBcIiArXG4gICAgICAgICAgXCIoRnVsbCByZWxvYWQgbmVlZGVkKVxcblwiICtcbiAgICAgICAgICBcIlRoaXMgaXMgdXN1YWxseSBiZWNhdXNlIHRoZSBtb2R1bGVzIHdoaWNoIGhhdmUgY2hhbmdlZCBcIiArXG4gICAgICAgICAgXCIoYW5kIHRoZWlyIHBhcmVudHMpIGRvIG5vdCBrbm93IGhvdyB0byBob3QgcmVsb2FkIHRoZW1zZWx2ZXMuIFwiICtcbiAgICAgICAgICBcIlNlZSBcIiArIGhtckRvY3NVcmwgKyBcIiBmb3IgbW9yZSBkZXRhaWxzLlwiXG4gICAgICAgICk7XG4gICAgICAgIHVuYWNjZXB0ZWRNb2R1bGVzLmZvckVhY2goZnVuY3Rpb24obW9kdWxlSWQpIHtcbiAgICAgICAgICBjb25zb2xlLndhcm4oXCJbSE1SXSAgLSBcIiArIG1vZHVsZU1hcFttb2R1bGVJZF0pO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIHBlcmZvcm1SZWxvYWQoKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAob3B0aW9ucy5sb2cpIHtcbiAgICAgIGlmKCFyZW5ld2VkTW9kdWxlcyB8fCByZW5ld2VkTW9kdWxlcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJbSE1SXSBOb3RoaW5nIGhvdCB1cGRhdGVkLlwiKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiW0hNUl0gVXBkYXRlZCBtb2R1bGVzOlwiKTtcbiAgICAgICAgcmVuZXdlZE1vZHVsZXMuZm9yRWFjaChmdW5jdGlvbihtb2R1bGVJZCkge1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwiW0hNUl0gIC0gXCIgKyBtb2R1bGVNYXBbbW9kdWxlSWRdKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIGlmICh1cFRvRGF0ZSgpKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiW0hNUl0gQXBwIGlzIHVwIHRvIGRhdGUuXCIpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGhhbmRsZUVycm9yKGVycikge1xuICAgIGlmIChtb2R1bGUuaG90LnN0YXR1cygpIGluIGZhaWx1cmVTdGF0dXNlcykge1xuICAgICAgaWYgKG9wdGlvbnMud2Fybikge1xuICAgICAgICBjb25zb2xlLndhcm4oXCJbSE1SXSBDYW5ub3QgY2hlY2sgZm9yIHVwZGF0ZSAoRnVsbCByZWxvYWQgbmVlZGVkKVwiKTtcbiAgICAgICAgY29uc29sZS53YXJuKFwiW0hNUl0gXCIgKyBlcnIuc3RhY2sgfHwgZXJyLm1lc3NhZ2UpO1xuICAgICAgfVxuICAgICAgcGVyZm9ybVJlbG9hZCgpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAob3B0aW9ucy53YXJuKSB7XG4gICAgICBjb25zb2xlLndhcm4oXCJbSE1SXSBVcGRhdGUgY2hlY2sgZmFpbGVkOiBcIiArIGVyci5zdGFjayB8fCBlcnIubWVzc2FnZSk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcGVyZm9ybVJlbG9hZCgpIHtcbiAgICBpZiAocmVsb2FkKSB7XG4gICAgICBpZiAob3B0aW9ucy53YXJuKSBjb25zb2xlLndhcm4oXCJbSE1SXSBSZWxvYWRpbmcgcGFnZVwiKTtcbiAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcbiAgICB9XG4gIH1cbn07XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqICh3ZWJwYWNrKS1ob3QtbWlkZGxld2FyZS9wcm9jZXNzLXVwZGF0ZS5qc1xuICoqIG1vZHVsZSBpZCA9IDEwMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDEgMlxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gKF9fd2VicGFja19yZXF1aXJlX18oMSkpKDEzOCk7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBkZWxlZ2F0ZWQgLi9ub2RlX21vZHVsZXMvZmFzdGNsaWNrL2xpYi9mYXN0Y2xpY2suanMgZnJvbSBkbGwtcmVmZXJlbmNlIGxpYnNfbGliXG4gKiogbW9kdWxlIGlkID0gMTAyXG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAyXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSAoX193ZWJwYWNrX3JlcXVpcmVfXygxKSkoMTU4KTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGRlbGVnYXRlZCAuL25vZGVfbW9kdWxlcy9yZWFjdC1hZGRvbnMtcGVyZi9pbmRleC5qcyBmcm9tIGRsbC1yZWZlcmVuY2UgbGlic19saWJcbiAqKiBtb2R1bGUgaWQgPSAxMDNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDJcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IChfX3dlYnBhY2tfcmVxdWlyZV9fKDEpKSgxNTkpO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZGVsZWdhdGVkIC4vbm9kZV9tb2R1bGVzL3JlYWN0LWRvbS9pbmRleC5qcyBmcm9tIGRsbC1yZWZlcmVuY2UgbGlic19saWJcbiAqKiBtb2R1bGUgaWQgPSAxMDRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDJcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IChfX3dlYnBhY2tfcmVxdWlyZV9fKDEpKSgxNjApO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZGVsZWdhdGVkIC4vbm9kZV9tb2R1bGVzL3JlYWN0LWltbXV0YWJsZS1wcm9wdHlwZXMvZGlzdC9JbW11dGFibGVQcm9wVHlwZXMuanMgZnJvbSBkbGwtcmVmZXJlbmNlIGxpYnNfbGliXG4gKiogbW9kdWxlIGlkID0gMTA1XG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMVxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gKF9fd2VicGFja19yZXF1aXJlX18oMSkpKDIzOCk7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBkZWxlZ2F0ZWQgLi9ub2RlX21vZHVsZXMvcmVkdXgtbG9nZ2VyL2xpYi9pbmRleC5qcyBmcm9tIGRsbC1yZWZlcmVuY2UgbGlic19saWJcbiAqKiBtb2R1bGUgaWQgPSAxMDZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDJcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IChfX3dlYnBhY2tfcmVxdWlyZV9fKDEpKSgyMzkpO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZGVsZWdhdGVkIC4vbm9kZV9tb2R1bGVzL3JlZHV4LXRodW5rL2xpYi9pbmRleC5qcyBmcm9tIGRsbC1yZWZlcmVuY2UgbGlic19saWJcbiAqKiBtb2R1bGUgaWQgPSAxMDdcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDJcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IChfX3dlYnBhY2tfcmVxdWlyZV9fKDEpKSgyNDUpO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZGVsZWdhdGVkIC4vbm9kZV9tb2R1bGVzL3dlYnBhY2svYnVpbGRpbi9tb2R1bGUuanMgZnJvbSBkbGwtcmVmZXJlbmNlIGxpYnNfbGliXG4gKiogbW9kdWxlIGlkID0gMTA4XG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAyXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSAoX193ZWJwYWNrX3JlcXVpcmVfXygxKSkoMjQ4KTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGRlbGVnYXRlZCAuL25vZGVfbW9kdWxlcy93aHktZGlkLXlvdS11cGRhdGUvbGliL2luZGV4LmpzIGZyb20gZGxsLXJlZmVyZW5jZSBsaWJzX2xpYlxuICoqIG1vZHVsZSBpZCA9IDEwOVxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDEgMlxuICoqLyIsImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQsIFByb3BUeXBlcyB9IGZyb20gJ3JlYWN0J1xyXG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnXHJcbmltcG9ydCB7IExpc3QgfSBmcm9tICdpbW11dGFibGUnO1xyXG5pbXBvcnQgQmFzZSBmcm9tICcuLi9CYXNlLmpzeCc7XHJcbmltcG9ydCB7IGFkZFRvZG8sIGNvbXBsZXRlVG9kbywgc2V0VmlzaWJpbGl0eUZpbHRlciwgVmlzaWJpbGl0eUZpbHRlcnMgfSBmcm9tICcuL2luZGV4QWN0aW9ucydcclxuaW1wb3J0IEFkZFRvZG8gZnJvbSAnLi4vLi4vY29tcG9uZW50cy9pbmRleC9BZGRUb2RvJ1xyXG5pbXBvcnQgVG9kb0xpc3QgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9pbmRleC9Ub2RvTGlzdCdcclxuaW1wb3J0IEZvb3RlciBmcm9tICcuLi8uLi9jb21wb25lbnRzL2luZGV4L0Zvb3Rlcic7XHJcbmltcG9ydCBUYWJzLCB7IFRhYlRpdGxlLCBUYWJQYW5lbCB9IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvY29tbW9uL1RhYic7XHJcblxyXG5jbGFzcyBQYWdlIGV4dGVuZHMgQmFzZSB7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcywgY29udGV4dCkge1xyXG4gICAgICAgIHN1cGVyKHByb3BzLCBjb250ZXh0KTtcclxuICAgIH1cclxuXHJcbiAgICBjb21wb25lbnREaWRNb3VudCgpe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuY29udGV4dC4kYXBwQ29uZmlnLnVzZXIpO1xyXG5cclxuICAgICAgICB0aGlzLmVtaXQoJ3Rlc3QnKTtcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgLy8gSW5qZWN0ZWQgYnkgY29ubmVjdCgpIGNhbGw6XHJcbiAgICAgICAgY29uc3QgeyBkaXNwYXRjaCwgdmlzaWJsZVRvZG9zLCB2aXNpYmlsaXR5RmlsdGVyIH0gPSB0aGlzLnByb3BzXHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgICAgIDxBZGRUb2RvXHJcbiAgICAgICAgICAgICAgICAgICAgb25BZGRDbGljaz17dGV4dCA9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNwYXRjaChhZGRUb2RvKHRleHQpKVxyXG4gICAgICAgICAgICAgICAgICAgIH0gLz5cclxuICAgICAgICAgICAgICAgIDxUb2RvTGlzdFxyXG4gICAgICAgICAgICAgICAgICAgIHRvZG9zPXt2aXNpYmxlVG9kb3N9XHJcbiAgICAgICAgICAgICAgICAgICAgb25Ub2RvQ2xpY2s9e2luZGV4ID0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BhdGNoKGNvbXBsZXRlVG9kbyhpbmRleCkpXHJcbiAgICAgICAgICAgICAgICAgICAgfSAvPlxyXG4gICAgICAgICAgICAgICAgPEZvb3RlclxyXG4gICAgICAgICAgICAgICAgICAgIGZpbHRlcj17dmlzaWJpbGl0eUZpbHRlcn1cclxuICAgICAgICAgICAgICAgICAgICBvbkZpbHRlckNoYW5nZT17bmV4dEZpbHRlciA9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNwYXRjaChzZXRWaXNpYmlsaXR5RmlsdGVyKG5leHRGaWx0ZXIpKVxyXG4gICAgICAgICAgICAgICAgICAgIH0gLz5cclxuICAgICAgICAgICAgICAgIDxUYWJzIGRlZmF1bHRTZWxlY3RlZFRhYj1cIjFcIj5cclxuICAgICAgICAgICAgICAgICAgICA8VGFiVGl0bGUgbGFiZWw9XCIxXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhYjFcclxuICAgICAgICAgICAgICAgICAgICA8L1RhYlRpdGxlPlxyXG4gICAgICAgICAgICAgICAgICAgIDxUYWJUaXRsZSBsYWJlbD1cIjJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGFiMlxyXG4gICAgICAgICAgICAgICAgICAgIDwvVGFiVGl0bGU+XHJcbiAgICAgICAgICAgICAgICAgICAgPFRhYlBhbmVsIGZvcj1cIjFcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgVGFiQ29udGVudDFcclxuICAgICAgICAgICAgICAgICAgICA8L1RhYlBhbmVsPlxyXG4gICAgICAgICAgICAgICAgICAgIDxUYWJQYW5lbCBmb3I9XCIyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFRhYkNvbnRlbnQyXHJcbiAgICAgICAgICAgICAgICAgICAgPC9UYWJQYW5lbD5cclxuICAgICAgICAgICAgICAgIDwvVGFicz5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKVxyXG4gICAgfVxyXG59XHJcblxyXG5QYWdlLnByb3BUeXBlcyA9IHtcclxuICAgIHZpc2libGVUb2RvczogUHJvcFR5cGVzLmluc3RhbmNlT2YoTGlzdCkuaXNSZXF1aXJlZCxcclxuICAgIHZpc2liaWxpdHlGaWx0ZXI6IFByb3BUeXBlcy5vbmVPZihbXHJcbiAgICAgICAgJ1NIT1dfQUxMJyxcclxuICAgICAgICAnU0hPV19DT01QTEVURUQnLFxyXG4gICAgICAgICdTSE9XX0FDVElWRSdcclxuICAgIF0pLmlzUmVxdWlyZWRcclxufTtcclxuUGFnZS5jb250ZXh0VHlwZXMgPSB7XHJcbiAgICAkYXBwQ29uZmlnOiBQcm9wVHlwZXMub2JqZWN0LFxyXG4gICAgJGV2ZW50QnVzOiBQcm9wVHlwZXMub2JqZWN0XHJcbn07XHJcblxyXG5mdW5jdGlvbiBzZWxlY3RUb2Rvcyh0b2RvcywgZmlsdGVyKSB7XHJcbiAgICBzd2l0Y2ggKGZpbHRlcikge1xyXG4gICAgICAgIGNhc2UgVmlzaWJpbGl0eUZpbHRlcnMuU0hPV19BTEw6XHJcbiAgICAgICAgICAgIHJldHVybiB0b2Rvc1xyXG4gICAgICAgIGNhc2UgVmlzaWJpbGl0eUZpbHRlcnMuU0hPV19DT01QTEVURUQ6XHJcbiAgICAgICAgICAgIHJldHVybiB0b2Rvcy5maWx0ZXIodG9kbyA9PiB0b2RvLmdldCgnY29tcGxldGVkJykpXHJcbiAgICAgICAgY2FzZSBWaXNpYmlsaXR5RmlsdGVycy5TSE9XX0FDVElWRTpcclxuICAgICAgICAgICAgcmV0dXJuIHRvZG9zLmZpbHRlcih0b2RvID0+ICF0b2RvLmdldCgnY29tcGxldGVkJykpXHJcbiAgICB9XHJcbn1cclxuXHJcbi8vIFdoaWNoIHByb3BzIGRvIHdlIHdhbnQgdG8gaW5qZWN0LCBnaXZlbiB0aGUgZ2xvYmFsIHN0YXRlP1xyXG4vLyBOb3RlOiB1c2UgaHR0cHM6Ly9naXRodWIuY29tL2ZhYXNzZW4vcmVzZWxlY3QgZm9yIGJldHRlciBwZXJmb3JtYW5jZS5cclxuZnVuY3Rpb24gc2VsZWN0KHN0YXRlKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHZpc2libGVUb2Rvczogc2VsZWN0VG9kb3Moc3RhdGUuZ2V0KCd0b2RvcycpLCBzdGF0ZS5nZXQoJ3Zpc2liaWxpdHlGaWx0ZXInKSksXHJcbiAgICAgICAgdmlzaWJpbGl0eUZpbHRlcjogc3RhdGUuZ2V0KCd2aXNpYmlsaXR5RmlsdGVyJylcclxuICAgIH1cclxufVxyXG5cclxuLy8g5YyF6KOFIGNvbXBvbmVudCDvvIzms6jlhaUgZGlzcGF0Y2gg5ZKMIHN0YXRlIOWIsOWFtum7mOiupOeahCBjb25uZWN0KHNlbGVjdCkoQXBwKSDkuK3vvJtcclxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChzZWxlY3QpKFBhZ2UpO1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2NvbW1vbi9wYWdlcy9pbmRleC9JbmRleC5qc3hcbiAqKi8iLCIvLyBpbXBvcnQgeyBjb21iaW5lUmVkdWNlcnMgfSBmcm9tICdyZWR1eCdcclxuaW1wb3J0IHsgTGlzdCwgTWFwIH0gZnJvbSAnaW1tdXRhYmxlJztcclxuaW1wb3J0IHsgY29tYmluZVJlZHVjZXJzIH0gZnJvbSAncmVkdXgtaW1tdXRhYmxlanMnO1xyXG5pbXBvcnQgeyBBRERfVE9ETywgQ09NUExFVEVfVE9ETywgU0VUX1ZJU0lCSUxJVFlfRklMVEVSLCBWaXNpYmlsaXR5RmlsdGVycyB9IGZyb20gJy4vaW5kZXhBY3Rpb25zJ1xyXG5jb25zdCB7IFNIT1dfQUxMIH0gPSBWaXNpYmlsaXR5RmlsdGVyc1xyXG5cclxuZnVuY3Rpb24gdmlzaWJpbGl0eUZpbHRlcihzdGF0ZSA9IFNIT1dfQUxMLCBhY3Rpb24pIHtcclxuICAgIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcclxuICAgICAgICBjYXNlIFNFVF9WSVNJQklMSVRZX0ZJTFRFUjpcclxuICAgICAgICAgICAgcmV0dXJuIGFjdGlvbi5maWx0ZXJcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICByZXR1cm4gc3RhdGVcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gdG9kb3Moc3RhdGUgPSBuZXcgTGlzdCgpLCBhY3Rpb24pIHtcclxuICAgIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcclxuICAgICAgICBjYXNlIEFERF9UT0RPOlxyXG4gICAgICAgICAgICByZXR1cm4gc3RhdGUucHVzaChuZXcgTWFwKHtcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiBhY3Rpb24udGV4dCxcclxuICAgICAgICAgICAgICAgICAgICBjb21wbGV0ZWQ6IGZhbHNlXHJcbiAgICAgICAgICAgICAgICB9KSlcclxuICAgICAgICBjYXNlIENPTVBMRVRFX1RPRE86XHJcbiAgICAgICAgICAgIHJldHVybiBzdGF0ZS51cGRhdGUoYWN0aW9uLmluZGV4LCBmdW5jdGlvbihpdGVtKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiBpdGVtLnVwZGF0ZSgnY29tcGxldGVkJywgdHJ1ZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgIHJldHVybiBzdGF0ZVxyXG4gICAgfVxyXG59XHJcblxyXG5jb25zdCB0b2RvQXBwID0gY29tYmluZVJlZHVjZXJzKHtcclxuICAgIHZpc2liaWxpdHlGaWx0ZXIsXHJcbiAgICB0b2Rvc1xyXG59KVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgdG9kb0FwcFxyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2NvbW1vbi9wYWdlcy9pbmRleC9pbmRleFJlZHVjZXJzLmpzXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSAoX193ZWJwYWNrX3JlcXVpcmVfXygxKSkoMjM1KTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGRlbGVnYXRlZCAuL25vZGVfbW9kdWxlcy9yZWR1eC1pbW11dGFibGVqcy9saWIvaW5kZXguanMgZnJvbSBkbGwtcmVmZXJlbmNlIGxpYnNfbGliXG4gKiogbW9kdWxlIGlkID0gMTE2XG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMVxuICoqLyIsIi8qXHJcbiAqIGFjdGlvbiDnsbvlnotcclxuICovXHJcblxyXG5leHBvcnQgY29uc3QgQUREX1RPRE8gPSAnQUREX1RPRE8nO1xyXG5leHBvcnQgY29uc3QgQ09NUExFVEVfVE9ETyA9ICdDT01QTEVURV9UT0RPJztcclxuZXhwb3J0IGNvbnN0IFNFVF9WSVNJQklMSVRZX0ZJTFRFUiA9ICdTRVRfVklTSUJJTElUWV9GSUxURVInXHJcblxyXG4vKlxyXG4gKiDlhbblroPnmoTluLjph49cclxuICovXHJcblxyXG5leHBvcnQgY29uc3QgVmlzaWJpbGl0eUZpbHRlcnMgPSB7XHJcbiAgICBTSE9XX0FMTDogJ1NIT1dfQUxMJyxcclxuICAgIFNIT1dfQ09NUExFVEVEOiAnU0hPV19DT01QTEVURUQnLFxyXG4gICAgU0hPV19BQ1RJVkU6ICdTSE9XX0FDVElWRSdcclxufTtcclxuXHJcbi8qXHJcbiAqIGFjdGlvbiDliJvlu7rlh73mlbBcclxuICovXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gYWRkVG9kbyh0ZXh0KSB7XHJcbiAgICByZXR1cm4geyB0eXBlOiBBRERfVE9ETywgdGV4dCB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBjb21wbGV0ZVRvZG8oaW5kZXgpIHtcclxuICAgIHJldHVybiB7IHR5cGU6IENPTVBMRVRFX1RPRE8sIGluZGV4IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHNldFZpc2liaWxpdHlGaWx0ZXIoZmlsdGVyKSB7XHJcbiAgICByZXR1cm4geyB0eXBlOiBTRVRfVklTSUJJTElUWV9GSUxURVIsIGZpbHRlciB9XHJcbn1cclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9jb21tb24vcGFnZXMvaW5kZXgvaW5kZXhBY3Rpb25zLmpzXG4gKiovIiwiLyohXG4gIENvcHlyaWdodCAoYykgMjAxNiBKZWQgV2F0c29uLlxuICBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UgKE1JVCksIHNlZVxuICBodHRwOi8vamVkd2F0c29uLmdpdGh1Yi5pby9jbGFzc25hbWVzXG4qL1xuLyogZ2xvYmFsIGRlZmluZSAqL1xuXG4oZnVuY3Rpb24gKCkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0dmFyIGhhc093biA9IHt9Lmhhc093blByb3BlcnR5O1xuXG5cdGZ1bmN0aW9uIGNsYXNzTmFtZXMgKCkge1xuXHRcdHZhciBjbGFzc2VzID0gW107XG5cblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGFyZyA9IGFyZ3VtZW50c1tpXTtcblx0XHRcdGlmICghYXJnKSBjb250aW51ZTtcblxuXHRcdFx0dmFyIGFyZ1R5cGUgPSB0eXBlb2YgYXJnO1xuXG5cdFx0XHRpZiAoYXJnVHlwZSA9PT0gJ3N0cmluZycgfHwgYXJnVHlwZSA9PT0gJ251bWJlcicpIHtcblx0XHRcdFx0Y2xhc3Nlcy5wdXNoKGFyZyk7XG5cdFx0XHR9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkoYXJnKSkge1xuXHRcdFx0XHRjbGFzc2VzLnB1c2goY2xhc3NOYW1lcy5hcHBseShudWxsLCBhcmcpKTtcblx0XHRcdH0gZWxzZSBpZiAoYXJnVHlwZSA9PT0gJ29iamVjdCcpIHtcblx0XHRcdFx0Zm9yICh2YXIga2V5IGluIGFyZykge1xuXHRcdFx0XHRcdGlmIChoYXNPd24uY2FsbChhcmcsIGtleSkgJiYgYXJnW2tleV0pIHtcblx0XHRcdFx0XHRcdGNsYXNzZXMucHVzaChrZXkpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiBjbGFzc2VzLmpvaW4oJyAnKTtcblx0fVxuXG5cdGlmICh0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyAmJiBtb2R1bGUuZXhwb3J0cykge1xuXHRcdG1vZHVsZS5leHBvcnRzID0gY2xhc3NOYW1lcztcblx0fSBlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBkZWZpbmUuYW1kID09PSAnb2JqZWN0JyAmJiBkZWZpbmUuYW1kKSB7XG5cdFx0Ly8gcmVnaXN0ZXIgYXMgJ2NsYXNzbmFtZXMnLCBjb25zaXN0ZW50IHdpdGggbnBtIHBhY2thZ2UgbmFtZVxuXHRcdGRlZmluZSgnY2xhc3NuYW1lcycsIFtdLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRyZXR1cm4gY2xhc3NOYW1lcztcblx0XHR9KTtcblx0fSBlbHNlIHtcblx0XHR3aW5kb3cuY2xhc3NOYW1lcyA9IGNsYXNzTmFtZXM7XG5cdH1cbn0oKSk7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9jbGFzc25hbWVzL2luZGV4LmpzXG4gKiogbW9kdWxlIGlkID0gMTE5XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IEltbXV0YWJsZSBmcm9tICdpbW11dGFibGUnO1xuXG5pbXBvcnQgY3JlYXRlUmVuZGVyIGZyb20gJy4uL3V0aWxzL2luaXRpYWxpemVSZW5kZXInO1xuaW1wb3J0IFBhZ2UgZnJvbSAnLi4vLi4vLi4vY29tbW9uL3BhZ2VzL2luZGV4L0luZGV4LmpzeCc7XG5pbXBvcnQgcm9vdFJlZHVjZXIgZnJvbSAnLi4vLi4vLi4vY29tbW9uL3BhZ2VzL2luZGV4L2luZGV4UmVkdWNlcnMnO1xuXG5pbXBvcnQgJy4uLy4uL2Nzcy9tYWluLmNzcyc7XG5cbmxldCBpbml0aWFsaXplUmVuZGVyID0gY3JlYXRlUmVuZGVyKHtcbiAgICB0cmFuc2Zvcm1lcjogSW1tdXRhYmxlLmZyb21KU1xufSk7XG5cbmluaXRpYWxpemVSZW5kZXIoe1xuICAgIHJvb3RSZWR1Y2VyLFxuICAgIGNvbXBvbmVudDogPFBhZ2UvPlxufSkudGhlbigoc3RvcmUpID0+IHtcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyAmJiBtb2R1bGUuaG90KSB7XG4gICAgICAgIC8vIEVuYWJsZSBXZWJwYWNrIGhvdCBtb2R1bGUgcmVwbGFjZW1lbnQgZm9yIHJlZHVjZXJzXG4gICAgICAgIG1vZHVsZS5ob3QuYWNjZXB0KFsnLi4vLi4vLi4vY29tbW9uL3BhZ2VzL2luZGV4L0luZGV4LmpzeCcsICcuLi8uLi8uLi9jb21tb24vcGFnZXMvaW5kZXgvaW5kZXhSZWR1Y2VycyddLCAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBOZXdQYWdlID0gcmVxdWlyZSgnLi4vLi4vLi4vY29tbW9uL3BhZ2VzL2luZGV4L0luZGV4LmpzeCcpLmRlZmF1bHQ7XG4gICAgICAgICAgICBjb25zdCBuZXdSb290UmVkdWNlciA9IHJlcXVpcmUoJy4uLy4uLy4uL2NvbW1vbi9wYWdlcy9pbmRleC9pbmRleFJlZHVjZXJzJykuZGVmYXVsdDtcbiAgICAgICAgICAgIGluaXRpYWxpemVSZW5kZXIoe1xuICAgICAgICAgICAgICAgIHJvb3RSZWR1Y2VyOiBuZXdSb290UmVkdWNlcixcbiAgICAgICAgICAgICAgICBjb21wb25lbnQ6IDxOZXdQYWdlLz5cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vY2xpZW50L2pzL3BhZ2VzL2luZGV4LmpzXG4gKiovIiwiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCwgUHJvcFR5cGVzIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IGNsYXNzbmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgQmFzZSBmcm9tICcuLi8uLi9wYWdlcy9CYXNlJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGFicyBleHRlbmRzIEJhc2Uge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzLCBjb250ZXh0KSB7XG4gICAgICAgIHN1cGVyKHByb3BzLCBjb250ZXh0KTtcblxuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgc2VsZWN0ZWRUYWI6IHByb3BzLmRlZmF1bHRTZWxlY3RlZFRhYiB8fCBudWxsXG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5maXJzdFRhYkxhYmVsID0gbnVsbDtcbiAgICB9XG5cbiAgICBnZXRDaGlsZENvbnRleHQoKXtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG9uU2VsZWN0OiB0aGlzLm9uU2VsZWN0LmJpbmQodGhpcyksXG4gICAgICAgICAgICBzZWxlY3RlZFRhYjogdGhpcy5zdGF0ZS5zZWxlY3RlZFRhYiB8fCB0aGlzLnByb3BzLmRlZmF1bHRTZWxlY3RlZFRhYixcbiAgICAgICAgICAgIGFjdGl2ZVN0eWxlOiB0aGlzLnByb3BzLmFjdGl2ZUxpbmtTdHlsZSB8fCBkZWZhdWx0QWN0aXZlU3R5bGUsXG4gICAgICAgICAgICBmaXJzdFRhYkxhYmVsOiB0aGlzLmZpcnN0VGFiTGFiZWxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBvblNlbGVjdCh0YWIsIC4uLnJlc3QpIHtcbiAgICAgICAgaWYodGhpcy5zdGF0ZS5zZWxlY3RlZFRhYiA9PT0gdGFiKSByZXR1cm47XG5cbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBzZWxlY3RlZFRhYjogdGFiXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmKHR5cGVvZiB0aGlzLnByb3BzLm9uU2VsZWN0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uU2VsZWN0KHRhYiwgLi4ucmVzdCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmaW5kRmlyc3RUYWJMYWJlbChjaGlsZHJlbil7XG4gICAgICAgIGlmICh0eXBlb2YgY2hpbGRyZW4gIT09ICdvYmplY3QnIHx8IHRoaXMuZmlyc3RUYWJMYWJlbCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgUmVhY3QuQ2hpbGRyZW4uZm9yRWFjaChjaGlsZHJlbiwgKGNoaWxkKSA9PiB7XG4gICAgICAgICAgICBpZihjaGlsZC5wcm9wcyAmJiBjaGlsZC5wcm9wcy5sYWJlbCkge1xuICAgICAgICAgICAgICAgIGlmKHRoaXMuZmlyc3RUYWJMYWJlbCA9PSBudWxsKXtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5maXJzdFRhYkxhYmVsID0gY2hpbGQucHJvcHMubGFiZWw7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuZmluZEZpcnN0VGFiTGFiZWwoY2hpbGQucHJvcHMgJiYgY2hpbGQucHJvcHMuY2hpbGRyZW4pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHRoaXMuZmluZEZpcnN0VGFiTGFiZWwodGhpcy5wcm9wcy5jaGlsZHJlbik7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXsgdGhpcy5wcm9wcy5jbGFzc05hbWUgfSBzdHlsZT17IHRoaXMucHJvcHMuc3R5bGUgfT5cbiAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5jaGlsZHJlbn1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblRhYnMuZGVmYXVsdFByb3BzID0ge1xuICAgIG9uU2VsZWN0OiBudWxsLFxuICAgIGFjdGl2ZUxpbmtTdHlsZTogbnVsbCxcbiAgICBkZWZhdWx0U2VsZWN0ZWRUYWI6ICcnLFxuICAgIGNsYXNzTmFtZTogJycsXG4gICAgc3R5bGU6IG51bGxcbn07XG5UYWJzLnByb3BUeXBlcyA9IHtcbiAgICBvblNlbGVjdDogUHJvcFR5cGVzLmZ1bmMsXG4gICAgYWN0aXZlTGlua1N0eWxlOiBQcm9wVHlwZXMub2JqZWN0LFxuICAgIGRlZmF1bHRTZWxlY3RlZFRhYjogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBjbGFzc05hbWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgc3R5bGU6IFByb3BUeXBlcy5vYmplY3Rcbn07XG5UYWJzLmNoaWxkQ29udGV4dFR5cGVzID0ge1xuICAgIG9uU2VsZWN0OiBQcm9wVHlwZXMuZnVuYyxcbiAgICBzZWxlY3RlZFRhYjogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBhY3RpdmVTdHlsZTogUHJvcFR5cGVzLm9iamVjdCxcbiAgICBmaXJzdFRhYkxhYmVsOiBQcm9wVHlwZXMuc3RyaW5nXG59O1xuXG5jb25zdCBkZWZhdWx0QWN0aXZlU3R5bGUgPSB7XG4gICAgZm9udFdlaWdodDogJ2JvbGQnXG59O1xuXG5leHBvcnQgY2xhc3MgVGFiVGl0bGUgZXh0ZW5kcyBDb21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzLCBjb250ZXh0KXtcbiAgICAgICAgc3VwZXIocHJvcHMsIGNvbnRleHQpO1xuXG4gICAgICAgIHRoaXMub25TZWxlY3QgPSB0aGlzLm9uU2VsZWN0LmJpbmQodGhpcyk7XG4gICAgfVxuXG4gICAgb25TZWxlY3QoKXtcbiAgICAgICAgdGhpcy5jb250ZXh0Lm9uU2VsZWN0KHRoaXMucHJvcHMubGFiZWwpO1xuICAgIH1cblxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgICBpZiAodGhpcy5jb250ZXh0LnNlbGVjdGVkVGFiID09PSB0aGlzLnByb3BzLmxhYmVsIHx8ICghdGhpcy5jb250ZXh0LnNlbGVjdGVkVGFiICYmIHRoaXMuY29udGV4dC5maXJzdFRhYkxhYmVsID09PSB0aGlzLnByb3BzLmxhYmVsKSkge1xuICAgICAgICAgICAgdGhpcy5jb250ZXh0Lm9uU2VsZWN0KHRoaXMucHJvcHMubGFiZWwpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICBsZXQgc3R5bGUgPSBudWxsO1xuICAgICAgICBsZXQgaXNBY3RpdmUgPSB0aGlzLmNvbnRleHQuc2VsZWN0ZWRUYWIgPT09IHRoaXMucHJvcHMubGFiZWw7XG4gICAgICAgIGlmIChpc0FjdGl2ZSkge1xuICAgICAgICAgICAgc3R5bGUgPSB0aGlzLmNvbnRleHQuYWN0aXZlU3R5bGU7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGNsc05hbWVzID0gY2xhc3NuYW1lcyh0aGlzLnByb3BzLmNsYXNzTmFtZSwgeyBhY3RpdmU6IGlzQWN0aXZlIH0pO1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXsgY2xzTmFtZXMgfVxuICAgICAgICAgICAgICAgIHN0eWxlPXtzdHlsZX1cbiAgICAgICAgICAgICAgICBvbkNsaWNrPXsgdGhpcy5vblNlbGVjdCB9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAge3RoaXMucHJvcHMuY2hpbGRyZW59XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5UYWJUaXRsZS5kZWZhdWx0UHJvcHMgPSB7XG4gICAgbGFiZWw6ICcnLFxuICAgIGNsYXNzTmFtZTogJ3RhYi1saW5rJ1xufTtcblRhYlRpdGxlLnByb3BUeXBlcyA9IHtcbiAgICBsYWJlbDogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgIGNsYXNzTmFtZTogUHJvcFR5cGVzLnN0cmluZ1xufTtcblRhYlRpdGxlLmNvbnRleHRUeXBlcyA9IHtcbiAgICBvblNlbGVjdDogUHJvcFR5cGVzLmZ1bmMsXG4gICAgZmlyc3RUYWJMYWJlbDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBhY3RpdmVTdHlsZTogUHJvcFR5cGVzLm9iamVjdCxcbiAgICBzZWxlY3RlZFRhYjogUHJvcFR5cGVzLnN0cmluZ1xufTtcblxuY29uc3Qgc3R5bGVzID0ge1xuICAgIHZpc2libGU6IHtcbiAgICAgICAgZGlzcGxheTogJ2Jsb2NrJ1xuICAgIH0sXG4gICAgaGlkZGVuOiB7XG4gICAgICAgIGRpc3BsYXk6ICdub25lJ1xuICAgIH1cbn07XG5cbmV4cG9ydCBjbGFzcyBUYWJQYW5lbCBleHRlbmRzIENvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMsIGNvbnRleHQpe1xuICAgICAgICBzdXBlcihwcm9wcywgY29udGV4dCk7XG5cbiAgICAgICAgZm9yKGxldCBzdHlsZSBpbiBzdHlsZXMpe1xuICAgICAgICAgICAgaWYoc3R5bGVzLmhhc093blByb3BlcnR5KHN0eWxlKSl7XG4gICAgICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihzdHlsZXNbc3R5bGVdLCB0aGlzLnByb3BzLnN0eWxlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgbGV0IGRpc3BsYXlTdHlsZSA9IHRoaXMuY29udGV4dC5zZWxlY3RlZFRhYiA9PT0gdGhpcy5wcm9wcy5mb3JcbiAgICAgICAgICAgID8gc3R5bGVzLnZpc2libGUgOiBzdHlsZXMuaGlkZGVuO1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXsgdGhpcy5wcm9wcy5jbGFzc05hbWUgfVxuICAgICAgICAgICAgICAgIHN0eWxlPXsgZGlzcGxheVN0eWxlIH0+XG4gICAgICAgICAgICAgICAge3RoaXMucHJvcHMuY2hpbGRyZW59XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5UYWJQYW5lbC5kZWZhdWx0UHJvcHMgPSB7XG4gICAgZm9yOiAnJyxcbiAgICBjbGFzc05hbWU6ICd0YWItY29udGVudCcsXG4gICAgc3R5bGU6IG51bGxcbn07XG5UYWJQYW5lbC5wcm9wVHlwZXMgPSB7XG4gICAgZm9yOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgY2xhc3NOYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIHN0eWxlOiBQcm9wVHlwZXMub2JqZWN0XG59O1xuVGFiUGFuZWwuY29udGV4dFR5cGVzID0ge1xuICAgIHNlbGVjdGVkVGFiOiBQcm9wVHlwZXMuc3RyaW5nXG59O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9jb21tb24vY29tcG9uZW50cy9jb21tb24vVGFiLmpzeFxuICoqLyIsImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQsIFByb3BUeXBlcyB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBCYXNlIGZyb20gJy4uLy4uL3BhZ2VzL0Jhc2UnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBZGRUb2RvIGV4dGVuZHMgQmFzZSB7XG4gICAgY29uc3RydWN0b3IocHJvcHMsIGNvbnRleHQpIHtcbiAgICAgICAgc3VwZXIocHJvcHMsIGNvbnRleHQpO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9J3RleHQnIHJlZj0naW5wdXQnIC8+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXsgdGhpcy5oYW5kbGVDbGljayB9PlxuICAgICAgICAgICAgICAgICAgICBBZGRcbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApXG4gICAgfVxuXG4gICAgaGFuZGxlQ2xpY2soZSkge1xuICAgICAgICBjb25zdCBub2RlID0gdGhpcy5yZWZzLmlucHV0O1xuICAgICAgICBjb25zdCB0ZXh0ID0gbm9kZS52YWx1ZS50cmltKCk7XG4gICAgICAgIHRoaXMucHJvcHMub25BZGRDbGljayh0ZXh0KTtcbiAgICAgICAgbm9kZS52YWx1ZSA9ICcnO1xuICAgIH1cbn1cblxuQWRkVG9kby5wcm9wVHlwZXMgPSB7XG4gICAgb25BZGRDbGljazogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZFxufTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vY29tbW9uL2NvbXBvbmVudHMvaW5kZXgvQWRkVG9kby5qc3hcbiAqKi8iLCJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50LCBQcm9wVHlwZXMgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgQmFzZSBmcm9tICcuLi8uLi9wYWdlcy9CYXNlJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRm9vdGVyIGV4dGVuZHMgQmFzZSB7XG4gICAgY29uc3RydWN0b3IocHJvcHMsIGNvbnRleHQpIHtcbiAgICAgICAgc3VwZXIocHJvcHMsIGNvbnRleHQpO1xuICAgIH1cblxuICAgIHJlbmRlckZpbHRlcihmaWx0ZXIsIG5hbWUpIHtcbiAgICAgICAgaWYgKGZpbHRlciA9PT0gdGhpcy5wcm9wcy5maWx0ZXIpIHtcbiAgICAgICAgICAgIHJldHVybiBuYW1lXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGEgaHJlZj0nIycgb25DbGljaz17ZSA9PiB7XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5vbkZpbHRlckNoYW5nZShmaWx0ZXIpXG4gICAgICAgICAgICB9IH0+XG4gICAgICAgICAgICAgICAge25hbWV9XG4gICAgICAgICAgICA8L2E+XG4gICAgICAgIClcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgICBTaG93OlxuICAgICAgICAgICAgICAgIHsnICd9XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyRmlsdGVyKCdTSE9XX0FMTCcsICdBbGwnKSB9XG4gICAgICAgICAgICAgICAgeycsICd9XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyRmlsdGVyKCdTSE9XX0NPTVBMRVRFRCcsICdDb21wbGV0ZWQnKSB9XG4gICAgICAgICAgICAgICAgeycsICd9XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyRmlsdGVyKCdTSE9XX0FDVElWRScsICdBY3RpdmUnKSB9XG4gICAgICAgICAgICAgICAgLlxuICAgICAgICAgICAgPC9wPlxuICAgICAgICApXG4gICAgfVxufVxuXG5Gb290ZXIucHJvcFR5cGVzID0ge1xuICAgIG9uRmlsdGVyQ2hhbmdlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIGZpbHRlcjogUHJvcFR5cGVzLm9uZU9mKFtcbiAgICAgICAgJ1NIT1dfQUxMJyxcbiAgICAgICAgJ1NIT1dfQ09NUExFVEVEJyxcbiAgICAgICAgJ1NIT1dfQUNUSVZFJ1xuICAgIF0pLmlzUmVxdWlyZWRcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vY29tbW9uL2NvbXBvbmVudHMvaW5kZXgvRm9vdGVyLmpzeFxuICoqLyIsImltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgQmFzZSBmcm9tICcuLi8uLi9wYWdlcy9CYXNlJztcblxubGV0IHN0eWxlcyA9IHtcbiAgICBjb21wbGV0ZWQ6IHtcbiAgICAgICAgdGV4dERlY29yYXRpb246ICdsaW5lLXRocm91Z2gnLFxuICAgICAgICBjdXJzb3I6ICdkZWZhdWx0J1xuICAgIH0sXG4gICAgdW5jb21wbGV0ZWQ6IHtcbiAgICAgICAgdGV4dERlY29yYXRpb246ICdub25lJyxcbiAgICAgICAgY3Vyc29yOiAncG9pbnRlcidcbiAgICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUb2RvIGV4dGVuZHMgQmFzZSB7XG4gICAgY29uc3RydWN0b3IocHJvcHMsIGNvbnRleHQpIHtcbiAgICAgICAgc3VwZXIocHJvcHMsIGNvbnRleHQpO1xuICAgIH1cblxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgICB0aGlzLm9uKCd0ZXN0JywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ3Rlc3QgZXZlbnQgYnVzJyk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxsaSBvbkNsaWNrPXt0aGlzLnByb3BzLm9uQ2xpY2t9XG4gICAgICAgICAgICAgICAgc3R5bGU9eyB0aGlzLnByb3BzLmNvbXBsZXRlZCA/IHN0eWxlcy5jb21wbGV0ZWQgOiBzdHlsZXMudW5jb21wbGV0ZWQgfT5cbiAgICAgICAgICAgICAgICB7IHRoaXMucHJvcHMudGV4dCB9XG4gICAgICAgICAgICA8L2xpPlxuICAgICAgICApXG4gICAgfVxufVxuVG9kby5kZWZhdWx0UHJvcHMgPSB7XG4gICAgb25DbGljazogZnVuY3Rpb24oKXt9LFxuICAgIHRleHQ6ICcnLFxuICAgIGNvbXBsZXRlZDogZmFsc2Vcbn07XG5Ub2RvLnByb3BUeXBlcyA9IHtcbiAgICBvbkNsaWNrOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIHRleHQ6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICBjb21wbGV0ZWQ6IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWRcbn07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2NvbW1vbi9jb21wb25lbnRzL2luZGV4L1RvZG8uanN4XG4gKiovIiwiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCwgUHJvcFR5cGVzIH0gZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBMaXN0IH0gZnJvbSAnaW1tdXRhYmxlJztcbmltcG9ydCBJbW11dGFibGVQcm9wVHlwZXMgZnJvbSAncmVhY3QtaW1tdXRhYmxlLXByb3B0eXBlcyc7XG5pbXBvcnQgVG9kbyBmcm9tICcuL1RvZG8nXG5pbXBvcnQgQmFzZSBmcm9tICcuLi8uLi9wYWdlcy9CYXNlJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVG9kb0xpc3QgZXh0ZW5kcyBCYXNlIHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcywgY29udGV4dCkge1xuICAgICAgICBzdXBlcihwcm9wcywgY29udGV4dCk7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPHVsPlxuICAgICAgICAgICAgICAgIHsgdGhpcy5wcm9wcy50b2Rvcy5tYXAoKHRvZG8sIGluZGV4KSA9PlxuICAgICAgICAgICAgICAgICAgICA8VG9kbyB0ZXh0PXsgdG9kby5nZXQoJ3RleHQnKSB9XG4gICAgICAgICAgICAgICAgICAgICAgICBjb21wbGV0ZWQ9eyB0b2RvLmdldCgnY29tcGxldGVkJykgfVxuICAgICAgICAgICAgICAgICAgICAgICAga2V5PXtpbmRleH1cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHRoaXMucHJvcHMub25Ub2RvQ2xpY2soaW5kZXgpIH0gLz5cbiAgICAgICAgICAgICAgICAgICAgKSB9XG4gICAgICAgICAgICA8L3VsPlxuICAgICAgICApXG4gICAgfVxufVxuXG5Ub2RvTGlzdC5wcm9wVHlwZXMgPSB7XG4gICAgb25Ub2RvQ2xpY2s6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgdG9kb3M6IEltbXV0YWJsZVByb3BUeXBlcy5saXN0T2YoSW1tdXRhYmxlUHJvcFR5cGVzLmNvbnRhaW5zKHtcbiAgICAgICAgdGV4dDogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgICAgICBjb21wbGV0ZWQ6IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWRcbiAgICB9KSlcbn07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2NvbW1vbi9jb21wb25lbnRzL2luZGV4L1RvZG9MaXN0LmpzeFxuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=