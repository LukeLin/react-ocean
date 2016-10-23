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
/******/ 	var hotCurrentHash = "53983eef433f66998365"; // eslint-disable-line no-unused-vars
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
/******/ 			var chunkId = 1;
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

	module.exports = __webpack_require__(/*! D:\workspace\javascript\isomorphic-react-redux-starter/client/js/pages/index.js */112);


/***/ },
/* 1 */
/*!***************************!*\
  !*** external "libs_lib" ***!
  \***************************/
/***/ function(module, exports) {

	module.exports = libs_lib;

/***/ },
/* 2 */
/*!***********************************************************************************!*\
  !*** delegated ./node_modules/.15.3.2@react/react.js from dll-reference libs_lib ***!
  \***********************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = (__webpack_require__(1))(41);

/***/ },
/* 3 */
/*!*****************************************************!*\
  !*** ./~/.2.4.1@core-js/library/modules/_global.js ***!
  \*****************************************************/
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 4 */
/*!**************************************************!*\
  !*** ./~/.2.4.1@core-js/library/modules/_has.js ***!
  \**************************************************/
/***/ function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function(it, key){
	  return hasOwnProperty.call(it, key);
	};

/***/ },
/* 5 */
/*!*********************************************************!*\
  !*** ./~/.2.4.1@core-js/library/modules/_to-iobject.js ***!
  \*********************************************************/
/***/ function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(/*! ./_iobject */ 68)
	  , defined = __webpack_require__(/*! ./_defined */ 24);
	module.exports = function(it){
	  return IObject(defined(it));
	};

/***/ },
/* 6 */
/*!***********************************************************!*\
  !*** ./~/.6.11.6@babel-runtime/helpers/classCallCheck.js ***!
  \***********************************************************/
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
/*!*****************************************************!*\
  !*** ./~/.6.11.6@babel-runtime/helpers/inherits.js ***!
  \*****************************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _setPrototypeOf = __webpack_require__(/*! ../core-js/object/set-prototype-of */ 91);
	
	var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);
	
	var _create = __webpack_require__(/*! ../core-js/object/create */ 90);
	
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
/*!**********************************************************************!*\
  !*** ./~/.6.11.6@babel-runtime/helpers/possibleConstructorReturn.js ***!
  \**********************************************************************/
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
  !*** ./~/.2.4.1@core-js/library/modules/_core.js ***!
  \***************************************************/
/***/ function(module, exports) {

	var core = module.exports = {version: '2.4.0'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 10 */
/*!**********************************************************!*\
  !*** ./~/.2.4.1@core-js/library/modules/_descriptors.js ***!
  \**********************************************************/
/***/ function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(/*! ./_fails */ 18)(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 11 */
/*!***************************************************!*\
  !*** ./~/.2.4.1@core-js/library/modules/_hide.js ***!
  \***************************************************/
/***/ function(module, exports, __webpack_require__) {

	var dP         = __webpack_require__(/*! ./_object-dp */ 12)
	  , createDesc = __webpack_require__(/*! ./_property-desc */ 20);
	module.exports = __webpack_require__(/*! ./_descriptors */ 10) ? function(object, key, value){
	  return dP.f(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

/***/ },
/* 12 */
/*!********************************************************!*\
  !*** ./~/.2.4.1@core-js/library/modules/_object-dp.js ***!
  \********************************************************/
/***/ function(module, exports, __webpack_require__) {

	var anObject       = __webpack_require__(/*! ./_an-object */ 14)
	  , IE8_DOM_DEFINE = __webpack_require__(/*! ./_ie8-dom-define */ 42)
	  , toPrimitive    = __webpack_require__(/*! ./_to-primitive */ 34)
	  , dP             = Object.defineProperty;
	
	exports.f = __webpack_require__(/*! ./_descriptors */ 10) ? Object.defineProperty : function defineProperty(O, P, Attributes){
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
/* 13 */
/*!**************************************************!*\
  !*** ./~/.2.4.1@core-js/library/modules/_wks.js ***!
  \**************************************************/
/***/ function(module, exports, __webpack_require__) {

	var store      = __webpack_require__(/*! ./_shared */ 32)('wks')
	  , uid        = __webpack_require__(/*! ./_uid */ 21)
	  , Symbol     = __webpack_require__(/*! ./_global */ 3).Symbol
	  , USE_SYMBOL = typeof Symbol == 'function';
	
	var $exports = module.exports = function(name){
	  return store[name] || (store[name] =
	    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
	};
	
	$exports.store = store;

/***/ },
/* 14 */
/*!********************************************************!*\
  !*** ./~/.2.4.1@core-js/library/modules/_an-object.js ***!
  \********************************************************/
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(/*! ./_is-object */ 15);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 15 */
/*!********************************************************!*\
  !*** ./~/.2.4.1@core-js/library/modules/_is-object.js ***!
  \********************************************************/
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
	
	var _shallowEqual = __webpack_require__(/*! ../utils/shallowEqual */ 57);
	
	var _shallowEqual2 = _interopRequireDefault(_shallowEqual);
	
	var _events = __webpack_require__(/*! events */ 38);
	
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
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! ./~/.0.11.9@process/browser.js */ 22)))

/***/ },
/* 17 */
/*!*****************************************************!*\
  !*** ./~/.2.4.1@core-js/library/modules/_export.js ***!
  \*****************************************************/
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(/*! ./_global */ 3)
	  , core      = __webpack_require__(/*! ./_core */ 9)
	  , ctx       = __webpack_require__(/*! ./_ctx */ 40)
	  , hide      = __webpack_require__(/*! ./_hide */ 11)
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
/* 18 */
/*!****************************************************!*\
  !*** ./~/.2.4.1@core-js/library/modules/_fails.js ***!
  \****************************************************/
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },
/* 19 */
/*!**********************************************************!*\
  !*** ./~/.2.4.1@core-js/library/modules/_object-keys.js ***!
  \**********************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)
	var $keys       = __webpack_require__(/*! ./_object-keys-internal */ 47)
	  , enumBugKeys = __webpack_require__(/*! ./_enum-bug-keys */ 25);
	
	module.exports = Object.keys || function keys(O){
	  return $keys(O, enumBugKeys);
	};

/***/ },
/* 20 */
/*!************************************************************!*\
  !*** ./~/.2.4.1@core-js/library/modules/_property-desc.js ***!
  \************************************************************/
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
/* 21 */
/*!**************************************************!*\
  !*** ./~/.2.4.1@core-js/library/modules/_uid.js ***!
  \**************************************************/
/***/ function(module, exports) {

	var id = 0
	  , px = Math.random();
	module.exports = function(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ },
/* 22 */
/*!***************************************************************************************!*\
  !*** delegated ./node_modules/.0.11.9@process/browser.js from dll-reference libs_lib ***!
  \***************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = (__webpack_require__(1))(1);

/***/ },
/* 23 */
/*!***************************************************!*\
  !*** ./~/.6.11.6@babel-runtime/helpers/typeof.js ***!
  \***************************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _iterator = __webpack_require__(/*! ../core-js/symbol/iterator */ 93);
	
	var _iterator2 = _interopRequireDefault(_iterator);
	
	var _symbol = __webpack_require__(/*! ../core-js/symbol */ 50);
	
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
/*!******************************************************!*\
  !*** ./~/.2.4.1@core-js/library/modules/_defined.js ***!
  \******************************************************/
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 25 */
/*!************************************************************!*\
  !*** ./~/.2.4.1@core-js/library/modules/_enum-bug-keys.js ***!
  \************************************************************/
/***/ function(module, exports) {

	// IE 8- don't enum bug keys
	module.exports = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');

/***/ },
/* 26 */
/*!********************************************************!*\
  !*** ./~/.2.4.1@core-js/library/modules/_iterators.js ***!
  \********************************************************/
/***/ function(module, exports) {

	module.exports = {};

/***/ },
/* 27 */
/*!******************************************************!*\
  !*** ./~/.2.4.1@core-js/library/modules/_library.js ***!
  \******************************************************/
/***/ function(module, exports) {

	module.exports = true;

/***/ },
/* 28 */
/*!************************************************************!*\
  !*** ./~/.2.4.1@core-js/library/modules/_object-create.js ***!
  \************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	var anObject    = __webpack_require__(/*! ./_an-object */ 14)
	  , dPs         = __webpack_require__(/*! ./_object-dps */ 74)
	  , enumBugKeys = __webpack_require__(/*! ./_enum-bug-keys */ 25)
	  , IE_PROTO    = __webpack_require__(/*! ./_shared-key */ 31)('IE_PROTO')
	  , Empty       = function(){ /* empty */ }
	  , PROTOTYPE   = 'prototype';
	
	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var createDict = function(){
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = __webpack_require__(/*! ./_dom-create */ 41)('iframe')
	    , i      = enumBugKeys.length
	    , lt     = '<'
	    , gt     = '>'
	    , iframeDocument;
	  iframe.style.display = 'none';
	  __webpack_require__(/*! ./_html */ 67).appendChild(iframe);
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
/*!*********************************************************!*\
  !*** ./~/.2.4.1@core-js/library/modules/_object-pie.js ***!
  \*********************************************************/
/***/ function(module, exports) {

	exports.f = {}.propertyIsEnumerable;

/***/ },
/* 30 */
/*!****************************************************************!*\
  !*** ./~/.2.4.1@core-js/library/modules/_set-to-string-tag.js ***!
  \****************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var def = __webpack_require__(/*! ./_object-dp */ 12).f
	  , has = __webpack_require__(/*! ./_has */ 4)
	  , TAG = __webpack_require__(/*! ./_wks */ 13)('toStringTag');
	
	module.exports = function(it, tag, stat){
	  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
	};

/***/ },
/* 31 */
/*!*********************************************************!*\
  !*** ./~/.2.4.1@core-js/library/modules/_shared-key.js ***!
  \*********************************************************/
/***/ function(module, exports, __webpack_require__) {

	var shared = __webpack_require__(/*! ./_shared */ 32)('keys')
	  , uid    = __webpack_require__(/*! ./_uid */ 21);
	module.exports = function(key){
	  return shared[key] || (shared[key] = uid(key));
	};

/***/ },
/* 32 */
/*!*****************************************************!*\
  !*** ./~/.2.4.1@core-js/library/modules/_shared.js ***!
  \*****************************************************/
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(/*! ./_global */ 3)
	  , SHARED = '__core-js_shared__'
	  , store  = global[SHARED] || (global[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};

/***/ },
/* 33 */
/*!*********************************************************!*\
  !*** ./~/.2.4.1@core-js/library/modules/_to-integer.js ***!
  \*********************************************************/
/***/ function(module, exports) {

	// 7.1.4 ToInteger
	var ceil  = Math.ceil
	  , floor = Math.floor;
	module.exports = function(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

/***/ },
/* 34 */
/*!***********************************************************!*\
  !*** ./~/.2.4.1@core-js/library/modules/_to-primitive.js ***!
  \***********************************************************/
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
/*!*********************************************************!*\
  !*** ./~/.2.4.1@core-js/library/modules/_wks-define.js ***!
  \*********************************************************/
/***/ function(module, exports, __webpack_require__) {

	var global         = __webpack_require__(/*! ./_global */ 3)
	  , core           = __webpack_require__(/*! ./_core */ 9)
	  , LIBRARY        = __webpack_require__(/*! ./_library */ 27)
	  , wksExt         = __webpack_require__(/*! ./_wks-ext */ 36)
	  , defineProperty = __webpack_require__(/*! ./_object-dp */ 12).f;
	module.exports = function(name){
	  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
	  if(name.charAt(0) != '_' && !(name in $Symbol))defineProperty($Symbol, name, {value: wksExt.f(name)});
	};

/***/ },
/* 36 */
/*!******************************************************!*\
  !*** ./~/.2.4.1@core-js/library/modules/_wks-ext.js ***!
  \******************************************************/
/***/ function(module, exports, __webpack_require__) {

	exports.f = __webpack_require__(/*! ./_wks */ 13);

/***/ },
/* 37 */
/*!***********************************************************************************************!*\
  !*** delegated ./node_modules/.3.8.1@immutable/dist/immutable.js from dll-reference libs_lib ***!
  \***********************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = (__webpack_require__(1))(42);

/***/ },
/* 38 */
/*!***********************************!*\
  !*** ./~/.1.1.1@events/events.js ***!
  \***********************************/
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
/* 39 */
/*!**************************************************!*\
  !*** ./~/.2.4.1@core-js/library/modules/_cof.js ***!
  \**************************************************/
/***/ function(module, exports) {

	var toString = {}.toString;
	
	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};

/***/ },
/* 40 */
/*!**************************************************!*\
  !*** ./~/.2.4.1@core-js/library/modules/_ctx.js ***!
  \**************************************************/
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(/*! ./_a-function */ 63);
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
/* 41 */
/*!*********************************************************!*\
  !*** ./~/.2.4.1@core-js/library/modules/_dom-create.js ***!
  \*********************************************************/
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(/*! ./_is-object */ 15)
	  , document = __webpack_require__(/*! ./_global */ 3).document
	  // in old IE typeof document.createElement is 'object'
	  , is = isObject(document) && isObject(document.createElement);
	module.exports = function(it){
	  return is ? document.createElement(it) : {};
	};

/***/ },
/* 42 */
/*!*************************************************************!*\
  !*** ./~/.2.4.1@core-js/library/modules/_ie8-dom-define.js ***!
  \*************************************************************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = !__webpack_require__(/*! ./_descriptors */ 10) && !__webpack_require__(/*! ./_fails */ 18)(function(){
	  return Object.defineProperty(__webpack_require__(/*! ./_dom-create */ 41)('div'), 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 43 */
/*!**********************************************************!*\
  !*** ./~/.2.4.1@core-js/library/modules/_iter-define.js ***!
  \**********************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY        = __webpack_require__(/*! ./_library */ 27)
	  , $export        = __webpack_require__(/*! ./_export */ 17)
	  , redefine       = __webpack_require__(/*! ./_redefine */ 48)
	  , hide           = __webpack_require__(/*! ./_hide */ 11)
	  , has            = __webpack_require__(/*! ./_has */ 4)
	  , Iterators      = __webpack_require__(/*! ./_iterators */ 26)
	  , $iterCreate    = __webpack_require__(/*! ./_iter-create */ 70)
	  , setToStringTag = __webpack_require__(/*! ./_set-to-string-tag */ 30)
	  , getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ 76)
	  , ITERATOR       = __webpack_require__(/*! ./_wks */ 13)('iterator')
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
/* 44 */
/*!**********************************************************!*\
  !*** ./~/.2.4.1@core-js/library/modules/_object-gopd.js ***!
  \**********************************************************/
/***/ function(module, exports, __webpack_require__) {

	var pIE            = __webpack_require__(/*! ./_object-pie */ 29)
	  , createDesc     = __webpack_require__(/*! ./_property-desc */ 20)
	  , toIObject      = __webpack_require__(/*! ./_to-iobject */ 5)
	  , toPrimitive    = __webpack_require__(/*! ./_to-primitive */ 34)
	  , has            = __webpack_require__(/*! ./_has */ 4)
	  , IE8_DOM_DEFINE = __webpack_require__(/*! ./_ie8-dom-define */ 42)
	  , gOPD           = Object.getOwnPropertyDescriptor;
	
	exports.f = __webpack_require__(/*! ./_descriptors */ 10) ? gOPD : function getOwnPropertyDescriptor(O, P){
	  O = toIObject(O);
	  P = toPrimitive(P, true);
	  if(IE8_DOM_DEFINE)try {
	    return gOPD(O, P);
	  } catch(e){ /* empty */ }
	  if(has(O, P))return createDesc(!pIE.f.call(O, P), O[P]);
	};

/***/ },
/* 45 */
/*!**********************************************************!*\
  !*** ./~/.2.4.1@core-js/library/modules/_object-gopn.js ***!
  \**********************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
	var $keys      = __webpack_require__(/*! ./_object-keys-internal */ 47)
	  , hiddenKeys = __webpack_require__(/*! ./_enum-bug-keys */ 25).concat('length', 'prototype');
	
	exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O){
	  return $keys(O, hiddenKeys);
	};

/***/ },
/* 46 */
/*!**********************************************************!*\
  !*** ./~/.2.4.1@core-js/library/modules/_object-gops.js ***!
  \**********************************************************/
/***/ function(module, exports) {

	exports.f = Object.getOwnPropertySymbols;

/***/ },
/* 47 */
/*!*******************************************************************!*\
  !*** ./~/.2.4.1@core-js/library/modules/_object-keys-internal.js ***!
  \*******************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var has          = __webpack_require__(/*! ./_has */ 4)
	  , toIObject    = __webpack_require__(/*! ./_to-iobject */ 5)
	  , arrayIndexOf = __webpack_require__(/*! ./_array-includes */ 65)(false)
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
/* 48 */
/*!*******************************************************!*\
  !*** ./~/.2.4.1@core-js/library/modules/_redefine.js ***!
  \*******************************************************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(/*! ./_hide */ 11);

/***/ },
/* 49 */
/*!********************************************************!*\
  !*** ./~/.2.4.1@core-js/library/modules/es6.symbol.js ***!
  \********************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// ECMAScript 6 symbols shim
	var global         = __webpack_require__(/*! ./_global */ 3)
	  , has            = __webpack_require__(/*! ./_has */ 4)
	  , DESCRIPTORS    = __webpack_require__(/*! ./_descriptors */ 10)
	  , $export        = __webpack_require__(/*! ./_export */ 17)
	  , redefine       = __webpack_require__(/*! ./_redefine */ 48)
	  , META           = __webpack_require__(/*! ./_meta */ 73).KEY
	  , $fails         = __webpack_require__(/*! ./_fails */ 18)
	  , shared         = __webpack_require__(/*! ./_shared */ 32)
	  , setToStringTag = __webpack_require__(/*! ./_set-to-string-tag */ 30)
	  , uid            = __webpack_require__(/*! ./_uid */ 21)
	  , wks            = __webpack_require__(/*! ./_wks */ 13)
	  , wksExt         = __webpack_require__(/*! ./_wks-ext */ 36)
	  , wksDefine      = __webpack_require__(/*! ./_wks-define */ 35)
	  , keyOf          = __webpack_require__(/*! ./_keyof */ 72)
	  , enumKeys       = __webpack_require__(/*! ./_enum-keys */ 66)
	  , isArray        = __webpack_require__(/*! ./_is-array */ 69)
	  , anObject       = __webpack_require__(/*! ./_an-object */ 14)
	  , toIObject      = __webpack_require__(/*! ./_to-iobject */ 5)
	  , toPrimitive    = __webpack_require__(/*! ./_to-primitive */ 34)
	  , createDesc     = __webpack_require__(/*! ./_property-desc */ 20)
	  , _create        = __webpack_require__(/*! ./_object-create */ 28)
	  , gOPNExt        = __webpack_require__(/*! ./_object-gopn-ext */ 75)
	  , $GOPD          = __webpack_require__(/*! ./_object-gopd */ 44)
	  , $DP            = __webpack_require__(/*! ./_object-dp */ 12)
	  , $keys          = __webpack_require__(/*! ./_object-keys */ 19)
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
	  __webpack_require__(/*! ./_object-gopn */ 45).f = gOPNExt.f = $getOwnPropertyNames;
	  __webpack_require__(/*! ./_object-pie */ 29).f  = $propertyIsEnumerable;
	  __webpack_require__(/*! ./_object-gops */ 46).f = $getOwnPropertySymbols;
	
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
	$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(/*! ./_hide */ 11)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
	// 19.4.3.5 Symbol.prototype[@@toStringTag]
	setToStringTag($Symbol, 'Symbol');
	// 20.2.1.9 Math[@@toStringTag]
	setToStringTag(Math, 'Math', true);
	// 24.3.3 JSON[@@toStringTag]
	setToStringTag(global.JSON, 'JSON', true);

/***/ },
/* 50 */
/*!***************************************************!*\
  !*** ./~/.6.11.6@babel-runtime/core-js/symbol.js ***!
  \***************************************************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(/*! core-js/library/fn/symbol */ 61), __esModule: true };

/***/ },
/* 51 */
/*!********************************************************************************************!*\
  !*** delegated ./node_modules/.4.4.5@react-redux/lib/index.js from dll-reference libs_lib ***!
  \********************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = (__webpack_require__(1))(341);

/***/ },
/* 52 */
/*!************************************************!*\
  !*** ./~/.6.11.6@babel-runtime/helpers/jsx.js ***!
  \************************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _for = __webpack_require__(/*! ../core-js/symbol/for */ 92);
	
	var _for2 = _interopRequireDefault(_for);
	
	var _symbol = __webpack_require__(/*! ../core-js/symbol */ 50);
	
	var _symbol2 = _interopRequireDefault(_symbol);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = function () {
	  var REACT_ELEMENT_TYPE = typeof _symbol2.default === "function" && _for2.default && (0, _for2.default)("react.element") || 0xeac7;
	  return function createRawReactElement(type, props, key, children) {
	    var defaultProps = type && type.defaultProps;
	    var childrenLength = arguments.length - 3;
	
	    if (!props && childrenLength !== 0) {
	      props = {};
	    }
	
	    if (props && defaultProps) {
	      for (var propName in defaultProps) {
	        if (props[propName] === void 0) {
	          props[propName] = defaultProps[propName];
	        }
	      }
	    } else if (!props) {
	      props = defaultProps || {};
	    }
	
	    if (childrenLength === 1) {
	      props.children = children;
	    } else if (childrenLength > 1) {
	      var childArray = Array(childrenLength);
	
	      for (var i = 0; i < childrenLength; i++) {
	        childArray[i] = arguments[i + 3];
	      }
	
	      props.children = childArray;
	    }
	
	    return {
	      $$typeof: REACT_ELEMENT_TYPE,
	      type: type,
	      key: key === undefined ? null : '' + key,
	      ref: null,
	      props: props,
	      _owner: null
	    };
	  };
	}();

/***/ },
/* 53 */
/*!*****************************!*\
  !*** ./client/css/main.css ***!
  \*****************************/
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 54 */
/*!**************************************!*\
  !*** ./client/js/utils/createApp.js ***!
  \**************************************/
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	exports.__esModule = true;
	exports.default = createRender;
	
	var _react = __webpack_require__(/*! react */ 2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(/*! react-dom */ 98);
	
	var _reactRedux = __webpack_require__(/*! react-redux */ 51);
	
	var _fastclick = __webpack_require__(/*! fastclick */ 96);
	
	var _fastclick2 = _interopRequireDefault(_fastclick);
	
	var _App = __webpack_require__(/*! ../../../common/App.jsx */ 55);
	
	var _App2 = _interopRequireDefault(_App);
	
	var _index = __webpack_require__(/*! ../../../common/store/index */ 56);
	
	var _index2 = _interopRequireDefault(_index);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	if (process.env.NODE_ENV !== 'production') {
	    var whyDidYouUpdate = __webpack_require__(/*! why-did-you-update */ 95).default;
	    whyDidYouUpdate(_react2.default);
	    var ReactPerf = __webpack_require__(/*! react-addons-perf */ 97);
	    window.ReactPerf = ReactPerf;
	}
	
	// fastclick解决ios和部分安卓click事件的问题
	_fastclick2.default.attach(document.body);
	
	function createRender() {
	    var middlewareConfig = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	
	    var store = null;
	    var page = document.getElementById('page');
	    var onRenderCompleted = typeof middlewareConfig.onRenderCompleted === 'function' && middlewareConfig.onRenderCompleted;
	
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
	                { appConfig: window.__APP_CONFIG__ },
	                component
	            )
	        ), page, onRenderCompleted);
	
	        return Promise.resolve(store);
	    };
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! ./~/.0.11.9@process/browser.js */ 22)))

/***/ },
/* 55 */
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
	
	var _events = __webpack_require__(/*! events */ 38);
	
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
	        return _react2.default.Children.only(this.props.children);
	    };
	
	    return App;
	}(_react.Component);
	
	App.defaultProps = {
	    appConfig: null
	};
	
	App.childContextTypes = {
	    $eventBus: _react.PropTypes.instanceOf(_events2.default),
	    $appConfig: _react.PropTypes.object
	};
	
	exports.default = App;

/***/ },
/* 56 */
/*!*******************************!*\
  !*** ./common/store/index.js ***!
  \*******************************/
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	exports.__esModule = true;
	exports.default = configureStore;
	
	var _redux = __webpack_require__(/*! redux */ 94);
	
	var _reduxThunk = __webpack_require__(/*! redux-thunk */ 100);
	
	var _reduxThunk2 = _interopRequireDefault(_reduxThunk);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	if (process.env.NODE_ENV !== 'production' && process.browser) {
	    var createLogger = __webpack_require__(/*! redux-logger */ 101);
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
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! ./~/.0.11.9@process/browser.js */ 22)))

/***/ },
/* 57 */
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
	        return true;
	    } else {
	        if (typeof x === 'function' && typeof y === 'function') {
	            return x.toString() === y.toString();
	        }
	        // Step 6.a: NaN == NaN
	        return false;
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
/* 58 */
/*!******************************************************!*\
  !*** ./~/.2.4.1@core-js/library/fn/object/create.js ***!
  \******************************************************/
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(/*! ../../modules/es6.object.create */ 83);
	var $Object = __webpack_require__(/*! ../../modules/_core */ 9).Object;
	module.exports = function create(P, D){
	  return $Object.create(P, D);
	};

/***/ },
/* 59 */
/*!****************************************************************!*\
  !*** ./~/.2.4.1@core-js/library/fn/object/set-prototype-of.js ***!
  \****************************************************************/
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(/*! ../../modules/es6.object.set-prototype-of */ 84);
	module.exports = __webpack_require__(/*! ../../modules/_core */ 9).Object.setPrototypeOf;

/***/ },
/* 60 */
/*!***************************************************!*\
  !*** ./~/.2.4.1@core-js/library/fn/symbol/for.js ***!
  \***************************************************/
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(/*! ../../modules/es6.symbol */ 49);
	module.exports = __webpack_require__(/*! ../../modules/_core */ 9).Symbol['for'];

/***/ },
/* 61 */
/*!*****************************************************!*\
  !*** ./~/.2.4.1@core-js/library/fn/symbol/index.js ***!
  \*****************************************************/
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(/*! ../../modules/es6.symbol */ 49);
	__webpack_require__(/*! ../../modules/es6.object.to-string */ 85);
	__webpack_require__(/*! ../../modules/es7.symbol.async-iterator */ 87);
	__webpack_require__(/*! ../../modules/es7.symbol.observable */ 88);
	module.exports = __webpack_require__(/*! ../../modules/_core */ 9).Symbol;

/***/ },
/* 62 */
/*!********************************************************!*\
  !*** ./~/.2.4.1@core-js/library/fn/symbol/iterator.js ***!
  \********************************************************/
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(/*! ../../modules/es6.string.iterator */ 86);
	__webpack_require__(/*! ../../modules/web.dom.iterable */ 89);
	module.exports = __webpack_require__(/*! ../../modules/_wks-ext */ 36).f('iterator');

/***/ },
/* 63 */
/*!*********************************************************!*\
  !*** ./~/.2.4.1@core-js/library/modules/_a-function.js ***!
  \*********************************************************/
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 64 */
/*!*****************************************************************!*\
  !*** ./~/.2.4.1@core-js/library/modules/_add-to-unscopables.js ***!
  \*****************************************************************/
/***/ function(module, exports) {

	module.exports = function(){ /* empty */ };

/***/ },
/* 65 */
/*!*************************************************************!*\
  !*** ./~/.2.4.1@core-js/library/modules/_array-includes.js ***!
  \*************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// false -> Array#indexOf
	// true  -> Array#includes
	var toIObject = __webpack_require__(/*! ./_to-iobject */ 5)
	  , toLength  = __webpack_require__(/*! ./_to-length */ 80)
	  , toIndex   = __webpack_require__(/*! ./_to-index */ 79);
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
/* 66 */
/*!********************************************************!*\
  !*** ./~/.2.4.1@core-js/library/modules/_enum-keys.js ***!
  \********************************************************/
/***/ function(module, exports, __webpack_require__) {

	// all enumerable object keys, includes symbols
	var getKeys = __webpack_require__(/*! ./_object-keys */ 19)
	  , gOPS    = __webpack_require__(/*! ./_object-gops */ 46)
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
/* 67 */
/*!***************************************************!*\
  !*** ./~/.2.4.1@core-js/library/modules/_html.js ***!
  \***************************************************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(/*! ./_global */ 3).document && document.documentElement;

/***/ },
/* 68 */
/*!******************************************************!*\
  !*** ./~/.2.4.1@core-js/library/modules/_iobject.js ***!
  \******************************************************/
/***/ function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(/*! ./_cof */ 39);
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },
/* 69 */
/*!*******************************************************!*\
  !*** ./~/.2.4.1@core-js/library/modules/_is-array.js ***!
  \*******************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 7.2.2 IsArray(argument)
	var cof = __webpack_require__(/*! ./_cof */ 39);
	module.exports = Array.isArray || function isArray(arg){
	  return cof(arg) == 'Array';
	};

/***/ },
/* 70 */
/*!**********************************************************!*\
  !*** ./~/.2.4.1@core-js/library/modules/_iter-create.js ***!
  \**********************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var create         = __webpack_require__(/*! ./_object-create */ 28)
	  , descriptor     = __webpack_require__(/*! ./_property-desc */ 20)
	  , setToStringTag = __webpack_require__(/*! ./_set-to-string-tag */ 30)
	  , IteratorPrototype = {};
	
	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	__webpack_require__(/*! ./_hide */ 11)(IteratorPrototype, __webpack_require__(/*! ./_wks */ 13)('iterator'), function(){ return this; });
	
	module.exports = function(Constructor, NAME, next){
	  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
	  setToStringTag(Constructor, NAME + ' Iterator');
	};

/***/ },
/* 71 */
/*!********************************************************!*\
  !*** ./~/.2.4.1@core-js/library/modules/_iter-step.js ***!
  \********************************************************/
/***/ function(module, exports) {

	module.exports = function(done, value){
	  return {value: value, done: !!done};
	};

/***/ },
/* 72 */
/*!****************************************************!*\
  !*** ./~/.2.4.1@core-js/library/modules/_keyof.js ***!
  \****************************************************/
/***/ function(module, exports, __webpack_require__) {

	var getKeys   = __webpack_require__(/*! ./_object-keys */ 19)
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
/* 73 */
/*!***************************************************!*\
  !*** ./~/.2.4.1@core-js/library/modules/_meta.js ***!
  \***************************************************/
/***/ function(module, exports, __webpack_require__) {

	var META     = __webpack_require__(/*! ./_uid */ 21)('meta')
	  , isObject = __webpack_require__(/*! ./_is-object */ 15)
	  , has      = __webpack_require__(/*! ./_has */ 4)
	  , setDesc  = __webpack_require__(/*! ./_object-dp */ 12).f
	  , id       = 0;
	var isExtensible = Object.isExtensible || function(){
	  return true;
	};
	var FREEZE = !__webpack_require__(/*! ./_fails */ 18)(function(){
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
/* 74 */
/*!*********************************************************!*\
  !*** ./~/.2.4.1@core-js/library/modules/_object-dps.js ***!
  \*********************************************************/
/***/ function(module, exports, __webpack_require__) {

	var dP       = __webpack_require__(/*! ./_object-dp */ 12)
	  , anObject = __webpack_require__(/*! ./_an-object */ 14)
	  , getKeys  = __webpack_require__(/*! ./_object-keys */ 19);
	
	module.exports = __webpack_require__(/*! ./_descriptors */ 10) ? Object.defineProperties : function defineProperties(O, Properties){
	  anObject(O);
	  var keys   = getKeys(Properties)
	    , length = keys.length
	    , i = 0
	    , P;
	  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
	  return O;
	};

/***/ },
/* 75 */
/*!**************************************************************!*\
  !*** ./~/.2.4.1@core-js/library/modules/_object-gopn-ext.js ***!
  \**************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
	var toIObject = __webpack_require__(/*! ./_to-iobject */ 5)
	  , gOPN      = __webpack_require__(/*! ./_object-gopn */ 45).f
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
/* 76 */
/*!*********************************************************!*\
  !*** ./~/.2.4.1@core-js/library/modules/_object-gpo.js ***!
  \*********************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
	var has         = __webpack_require__(/*! ./_has */ 4)
	  , toObject    = __webpack_require__(/*! ./_to-object */ 81)
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
/* 77 */
/*!********************************************************!*\
  !*** ./~/.2.4.1@core-js/library/modules/_set-proto.js ***!
  \********************************************************/
/***/ function(module, exports, __webpack_require__) {

	// Works with __proto__ only. Old v8 can't work with null proto objects.
	/* eslint-disable no-proto */
	var isObject = __webpack_require__(/*! ./_is-object */ 15)
	  , anObject = __webpack_require__(/*! ./_an-object */ 14);
	var check = function(O, proto){
	  anObject(O);
	  if(!isObject(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");
	};
	module.exports = {
	  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
	    function(test, buggy, set){
	      try {
	        set = __webpack_require__(/*! ./_ctx */ 40)(Function.call, __webpack_require__(/*! ./_object-gopd */ 44).f(Object.prototype, '__proto__').set, 2);
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
/* 78 */
/*!********************************************************!*\
  !*** ./~/.2.4.1@core-js/library/modules/_string-at.js ***!
  \********************************************************/
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
/* 79 */
/*!*******************************************************!*\
  !*** ./~/.2.4.1@core-js/library/modules/_to-index.js ***!
  \*******************************************************/
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(/*! ./_to-integer */ 33)
	  , max       = Math.max
	  , min       = Math.min;
	module.exports = function(index, length){
	  index = toInteger(index);
	  return index < 0 ? max(index + length, 0) : min(index, length);
	};

/***/ },
/* 80 */
/*!********************************************************!*\
  !*** ./~/.2.4.1@core-js/library/modules/_to-length.js ***!
  \********************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 7.1.15 ToLength
	var toInteger = __webpack_require__(/*! ./_to-integer */ 33)
	  , min       = Math.min;
	module.exports = function(it){
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

/***/ },
/* 81 */
/*!********************************************************!*\
  !*** ./~/.2.4.1@core-js/library/modules/_to-object.js ***!
  \********************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(/*! ./_defined */ 24);
	module.exports = function(it){
	  return Object(defined(it));
	};

/***/ },
/* 82 */
/*!****************************************************************!*\
  !*** ./~/.2.4.1@core-js/library/modules/es6.array.iterator.js ***!
  \****************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var addToUnscopables = __webpack_require__(/*! ./_add-to-unscopables */ 64)
	  , step             = __webpack_require__(/*! ./_iter-step */ 71)
	  , Iterators        = __webpack_require__(/*! ./_iterators */ 26)
	  , toIObject        = __webpack_require__(/*! ./_to-iobject */ 5);
	
	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	module.exports = __webpack_require__(/*! ./_iter-define */ 43)(Array, 'Array', function(iterated, kind){
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
/* 83 */
/*!***************************************************************!*\
  !*** ./~/.2.4.1@core-js/library/modules/es6.object.create.js ***!
  \***************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(/*! ./_export */ 17)
	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	$export($export.S, 'Object', {create: __webpack_require__(/*! ./_object-create */ 28)});

/***/ },
/* 84 */
/*!*************************************************************************!*\
  !*** ./~/.2.4.1@core-js/library/modules/es6.object.set-prototype-of.js ***!
  \*************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.19 Object.setPrototypeOf(O, proto)
	var $export = __webpack_require__(/*! ./_export */ 17);
	$export($export.S, 'Object', {setPrototypeOf: __webpack_require__(/*! ./_set-proto */ 77).set});

/***/ },
/* 85 */
/*!******************************************************************!*\
  !*** ./~/.2.4.1@core-js/library/modules/es6.object.to-string.js ***!
  \******************************************************************/
/***/ function(module, exports) {



/***/ },
/* 86 */
/*!*****************************************************************!*\
  !*** ./~/.2.4.1@core-js/library/modules/es6.string.iterator.js ***!
  \*****************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $at  = __webpack_require__(/*! ./_string-at */ 78)(true);
	
	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__(/*! ./_iter-define */ 43)(String, 'String', function(iterated){
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
/* 87 */
/*!***********************************************************************!*\
  !*** ./~/.2.4.1@core-js/library/modules/es7.symbol.async-iterator.js ***!
  \***********************************************************************/
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(/*! ./_wks-define */ 35)('asyncIterator');

/***/ },
/* 88 */
/*!*******************************************************************!*\
  !*** ./~/.2.4.1@core-js/library/modules/es7.symbol.observable.js ***!
  \*******************************************************************/
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(/*! ./_wks-define */ 35)('observable');

/***/ },
/* 89 */
/*!**************************************************************!*\
  !*** ./~/.2.4.1@core-js/library/modules/web.dom.iterable.js ***!
  \**************************************************************/
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(/*! ./es6.array.iterator */ 82);
	var global        = __webpack_require__(/*! ./_global */ 3)
	  , hide          = __webpack_require__(/*! ./_hide */ 11)
	  , Iterators     = __webpack_require__(/*! ./_iterators */ 26)
	  , TO_STRING_TAG = __webpack_require__(/*! ./_wks */ 13)('toStringTag');
	
	for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
	  var NAME       = collections[i]
	    , Collection = global[NAME]
	    , proto      = Collection && Collection.prototype;
	  if(proto && !proto[TO_STRING_TAG])hide(proto, TO_STRING_TAG, NAME);
	  Iterators[NAME] = Iterators.Array;
	}

/***/ },
/* 90 */
/*!**********************************************************!*\
  !*** ./~/.6.11.6@babel-runtime/core-js/object/create.js ***!
  \**********************************************************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(/*! core-js/library/fn/object/create */ 58), __esModule: true };

/***/ },
/* 91 */
/*!********************************************************************!*\
  !*** ./~/.6.11.6@babel-runtime/core-js/object/set-prototype-of.js ***!
  \********************************************************************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(/*! core-js/library/fn/object/set-prototype-of */ 59), __esModule: true };

/***/ },
/* 92 */
/*!*******************************************************!*\
  !*** ./~/.6.11.6@babel-runtime/core-js/symbol/for.js ***!
  \*******************************************************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(/*! core-js/library/fn/symbol/for */ 60), __esModule: true };

/***/ },
/* 93 */
/*!************************************************************!*\
  !*** ./~/.6.11.6@babel-runtime/core-js/symbol/iterator.js ***!
  \************************************************************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(/*! core-js/library/fn/symbol/iterator */ 62), __esModule: true };

/***/ },
/* 94 */
/*!**************************************************************************************!*\
  !*** delegated ./node_modules/.3.6.0@redux/lib/index.js from dll-reference libs_lib ***!
  \**************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = (__webpack_require__(1))(117);

/***/ },
/* 95 */
/*!***************************************************************************************************!*\
  !*** delegated ./node_modules/.0.0.8@why-did-you-update/lib/index.js from dll-reference libs_lib ***!
  \***************************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = (__webpack_require__(1))(145);

/***/ },
/* 96 */
/*!**********************************************************************************************!*\
  !*** delegated ./node_modules/.1.0.6@fastclick/lib/fastclick.js from dll-reference libs_lib ***!
  \**********************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = (__webpack_require__(1))(166);

/***/ },
/* 97 */
/*!***********************************************************************************************!*\
  !*** delegated ./node_modules/.15.3.2@react-addons-perf/index.js from dll-reference libs_lib ***!
  \***********************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = (__webpack_require__(1))(168);

/***/ },
/* 98 */
/*!***************************************************************************************!*\
  !*** delegated ./node_modules/.15.3.2@react-dom/index.js from dll-reference libs_lib ***!
  \***************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = (__webpack_require__(1))(169);

/***/ },
/* 99 */
/*!************************************************************************************************************************!*\
  !*** delegated ./node_modules/.2.1.0@react-immutable-proptypes/dist/ImmutablePropTypes.js from dll-reference libs_lib ***!
  \************************************************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = (__webpack_require__(1))(239);

/***/ },
/* 100 */
/*!********************************************************************************************!*\
  !*** delegated ./node_modules/.2.1.0@redux-thunk/lib/index.js from dll-reference libs_lib ***!
  \********************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = (__webpack_require__(1))(240);

/***/ },
/* 101 */
/*!*********************************************************************************************!*\
  !*** delegated ./node_modules/.2.7.0@redux-logger/lib/index.js from dll-reference libs_lib ***!
  \*********************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = (__webpack_require__(1))(245);

/***/ },
/* 102 */,
/* 103 */,
/* 104 */
/*!**************************************************************************************************!*\
  !*** delegated ./node_modules/.0.0.8@redux-immutablejs/lib/index.js from dll-reference libs_lib ***!
  \**************************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = (__webpack_require__(1))(140);

/***/ },
/* 105 */,
/* 106 */
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
/* 107 */,
/* 108 */,
/* 109 */,
/* 110 */,
/* 111 */,
/* 112 */
/*!**********************************!*\
  !*** ./client/js/pages/index.js ***!
  \**********************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _react = __webpack_require__(/*! react */ 2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _immutable = __webpack_require__(/*! immutable */ 37);
	
	var _immutable2 = _interopRequireDefault(_immutable);
	
	var _createApp = __webpack_require__(/*! ../utils/createApp */ 54);
	
	var _createApp2 = _interopRequireDefault(_createApp);
	
	var _Index = __webpack_require__(/*! ../../../common/pages/index/Index.jsx */ 124);
	
	var _Index2 = _interopRequireDefault(_Index);
	
	var _indexReducers = __webpack_require__(/*! ../../../common/pages/index/indexReducers */ 125);
	
	var _indexReducers2 = _interopRequireDefault(_indexReducers);
	
	__webpack_require__(/*! ../../css/main.css */ 53);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var createApp = (0, _createApp2.default)({
	    transformer: _immutable2.default.fromJS
	});
	
	createApp({
	    rootReducer: _indexReducers2.default,
	    component: _react2.default.createElement(_Index2.default, null)
	});

/***/ },
/* 113 */,
/* 114 */,
/* 115 */,
/* 116 */,
/* 117 */,
/* 118 */
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
	
	var _classnames = __webpack_require__(/*! classnames */ 127);
	
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
/* 119 */
/*!*********************************************!*\
  !*** ./common/components/index/AddTodo.jsx ***!
  \*********************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _jsx2 = __webpack_require__(/*! babel-runtime/helpers/jsx */ 52);
	
	var _jsx3 = _interopRequireDefault(_jsx2);
	
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
	        return (0, _jsx3.default)('div', {}, void 0, _react2.default.createElement('input', { type: 'text', ref: 'input' }), (0, _jsx3.default)('button', {
	            onClick: this.onClick.bind(this)
	        }, void 0, 'Add'));
	    };
	
	    AddTodo.prototype.onClick = function onClick(e) {
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
/* 120 */
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
/* 121 */
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
	
	    Todo.prototype.componentWillUnmount = function componentWillUnmount() {
	        // unregister subscribe
	        _Base.prototype.componentWillUnmount.call(this);
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
/* 122 */
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
	
	var _reactImmutableProptypes = __webpack_require__(/*! react-immutable-proptypes */ 99);
	
	var _reactImmutableProptypes2 = _interopRequireDefault(_reactImmutableProptypes);
	
	var _Todo = __webpack_require__(/*! ./Todo */ 121);
	
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

/***/ },
/* 123 */,
/* 124 */
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
	
	var _reactRedux = __webpack_require__(/*! react-redux */ 51);
	
	var _immutable = __webpack_require__(/*! immutable */ 37);
	
	var _Base2 = __webpack_require__(/*! ../Base.jsx */ 16);
	
	var _Base3 = _interopRequireDefault(_Base2);
	
	var _indexActions = __webpack_require__(/*! ./indexActions */ 106);
	
	var _AddTodo = __webpack_require__(/*! ../../components/index/AddTodo */ 119);
	
	var _AddTodo2 = _interopRequireDefault(_AddTodo);
	
	var _TodoList = __webpack_require__(/*! ../../components/index/TodoList */ 122);
	
	var _TodoList2 = _interopRequireDefault(_TodoList);
	
	var _Footer = __webpack_require__(/*! ../../components/index/Footer */ 120);
	
	var _Footer2 = _interopRequireDefault(_Footer);
	
	var _Tab = __webpack_require__(/*! ../../components/common/Tab */ 118);
	
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
/* 125 */
/*!*********************************************!*\
  !*** ./common/pages/index/indexReducers.js ***!
  \*********************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _immutable = __webpack_require__(/*! immutable */ 37);
	
	var _reduxImmutablejs = __webpack_require__(/*! redux-immutablejs */ 104);
	
	var _indexActions = __webpack_require__(/*! ./indexActions */ 106);
	
	var SHOW_ALL = _indexActions.VisibilityFilters.SHOW_ALL; // import { combineReducers } from 'redux'
	
	function visibilityFilter() {
	    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : SHOW_ALL;
	    var action = arguments[1];
	
	    switch (action.type) {
	        case _indexActions.SET_VISIBILITY_FILTER:
	            return action.filter;
	        default:
	            return state;
	    }
	}
	
	function todos() {
	    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new _immutable.List();
	    var action = arguments[1];
	
	    switch (action.type) {
	        case _indexActions.ADD_TODO:
	            return state.push(new _immutable.Map({
	                text: action.text,
	                completed: false
	            }));
	        case _indexActions.COMPLETE_TODO:
	            return state.update(action.index, function (item) {
	                return item.set('completed', true);
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
/* 126 */,
/* 127 */
/*!**************************************!*\
  !*** ./~/.2.2.5@classnames/index.js ***!
  \**************************************/
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


/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNTM5ODNlZWY0MzNmNjY5OTgzNjU/NTU1MSIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJsaWJzX2xpYlwiPzhjOWQiLCJ3ZWJwYWNrOi8vL2RlbGVnYXRlZCAuL25vZGVfbW9kdWxlcy8uMTUuMy4yQHJlYWN0L3JlYWN0LmpzIGZyb20gZGxsLXJlZmVyZW5jZSBsaWJzX2xpYj85ZGVlIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19nbG9iYWwuanM/YWVjNCIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faGFzLmpzPzk4MTIiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLWlvYmplY3QuanM/NDMzZCIsIndlYnBhY2s6Ly8vLi9+Ly42LjExLjZAYmFiZWwtcnVudGltZS9oZWxwZXJzL2NsYXNzQ2FsbENoZWNrLmpzPzcwMmYiLCJ3ZWJwYWNrOi8vLy4vfi8uNi4xMS42QGJhYmVsLXJ1bnRpbWUvaGVscGVycy9pbmhlcml0cy5qcz84OTVmIiwid2VicGFjazovLy8uL34vLjYuMTEuNkBiYWJlbC1ydW50aW1lL2hlbHBlcnMvcG9zc2libGVDb25zdHJ1Y3RvclJldHVybi5qcz9kOTFlIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jb3JlLmpzPzk0NTQiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2Rlc2NyaXB0b3JzLmpzPzQwYTkiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2hpZGUuanM/ZDU0NSIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWRwLmpzPzdlODEiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3drcy5qcz8zMjRlIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hbi1vYmplY3QuanM/ZTAwZiIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXMtb2JqZWN0LmpzPzkxMGQiLCJ3ZWJwYWNrOi8vLy4vY29tbW9uL3BhZ2VzL0Jhc2UuanN4P2IwOTgiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2V4cG9ydC5qcz9lMTk1Iiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19mYWlscy5qcz83YjE4Iiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3Qta2V5cy5qcz9jZTAzIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19wcm9wZXJ0eS1kZXNjLmpzPzMwNzkiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3VpZC5qcz8zNTNhIiwid2VicGFjazovLy9kZWxlZ2F0ZWQgLi9ub2RlX21vZHVsZXMvLjAuMTEuOUBwcm9jZXNzL2Jyb3dzZXIuanMgZnJvbSBkbGwtcmVmZXJlbmNlIGxpYnNfbGliP2Y2OTYiLCJ3ZWJwYWNrOi8vLy4vfi8uNi4xMS42QGJhYmVsLXJ1bnRpbWUvaGVscGVycy90eXBlb2YuanM/NjgzNSIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZGVmaW5lZC5qcz9hNzM2Iiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19lbnVtLWJ1Zy1rZXlzLmpzPzE5MDUiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2l0ZXJhdG9ycy5qcz8zM2M4Iiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19saWJyYXJ5LmpzP2U4MzAiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1jcmVhdGUuanM/NGE0MCIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LXBpZS5qcz81MGY0Iiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zZXQtdG8tc3RyaW5nLXRhZy5qcz9hYzA3Iiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zaGFyZWQta2V5LmpzPzEwYjQiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3NoYXJlZC5qcz8yMTI5Iiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1pbnRlZ2VyLmpzPzQ1MWMiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLXByaW1pdGl2ZS5qcz9jZTUxIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL193a3MtZGVmaW5lLmpzPzM2MGYiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3drcy1leHQuanM/MmRmYiIsIndlYnBhY2s6Ly8vZGVsZWdhdGVkIC4vbm9kZV9tb2R1bGVzLy4zLjguMUBpbW11dGFibGUvZGlzdC9pbW11dGFibGUuanMgZnJvbSBkbGwtcmVmZXJlbmNlIGxpYnNfbGliPzg0NWMiLCJ3ZWJwYWNrOi8vLy4vfi8uMS4xLjFAZXZlbnRzL2V2ZW50cy5qcz9iZTk5Iiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jb2YuanM/MWEwMyIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY3R4LmpzP2RlNDQiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2RvbS1jcmVhdGUuanM/Y2E3NCIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faWU4LWRvbS1kZWZpbmUuanM/MWY4OSIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXRlci1kZWZpbmUuanM/MDRhNyIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWdvcGQuanM/MmVmNiIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWdvcG4uanM/ZTllMyIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWdvcHMuanM/NDVhYyIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWtleXMtaW50ZXJuYWwuanM/ZDA1MyIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fcmVkZWZpbmUuanM/ODBjOCIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYuc3ltYm9sLmpzPzllYjYiLCJ3ZWJwYWNrOi8vLy4vfi8uNi4xMS42QGJhYmVsLXJ1bnRpbWUvY29yZS1qcy9zeW1ib2wuanM/MTMyNCIsIndlYnBhY2s6Ly8vZGVsZWdhdGVkIC4vbm9kZV9tb2R1bGVzLy40LjQuNUByZWFjdC1yZWR1eC9saWIvaW5kZXguanMgZnJvbSBkbGwtcmVmZXJlbmNlIGxpYnNfbGliP2E0NTEiLCJ3ZWJwYWNrOi8vLy4vfi8uNi4xMS42QGJhYmVsLXJ1bnRpbWUvaGVscGVycy9qc3guanM/ZDA1NiIsIndlYnBhY2s6Ly8vLi9jbGllbnQvY3NzL21haW4uY3NzP2UyNDgiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2pzL3V0aWxzL2NyZWF0ZUFwcC5qcz9hYzQ2Iiwid2VicGFjazovLy8uL2NvbW1vbi9BcHAuanN4PzYzY2MiLCJ3ZWJwYWNrOi8vLy4vY29tbW9uL3N0b3JlL2luZGV4LmpzPzc1M2IiLCJ3ZWJwYWNrOi8vLy4vY29tbW9uL3V0aWxzL3NoYWxsb3dFcXVhbC5qcz9kYmI0Iiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvY3JlYXRlLmpzPzBlN2YiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9zZXQtcHJvdG90eXBlLW9mLmpzPzVmOWMiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L2ZuL3N5bWJvbC9mb3IuanM/OTg2ZCIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvZm4vc3ltYm9sL2luZGV4LmpzPzA4Y2UiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L2ZuL3N5bWJvbC9pdGVyYXRvci5qcz9lOTJjIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hLWZ1bmN0aW9uLmpzP2UzNDMiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2FkZC10by11bnNjb3BhYmxlcy5qcz85ZjdiIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hcnJheS1pbmNsdWRlcy5qcz83ZGM2Iiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19lbnVtLWtleXMuanM/NjNkMiIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faHRtbC5qcz83NjY3Iiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pb2JqZWN0LmpzP2I1NWUiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2lzLWFycmF5LmpzPzkxYmIiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2l0ZXItY3JlYXRlLmpzP2RmZGYiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2l0ZXItc3RlcC5qcz85ODJmIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19rZXlvZi5qcz83NTcyIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19tZXRhLmpzPzM2ZjUiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1kcHMuanM/OWE1ZiIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWdvcG4tZXh0LmpzPzJmZTgiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1ncG8uanM/NzcxOCIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc2V0LXByb3RvLmpzPzFhNzYiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3N0cmluZy1hdC5qcz8zZDliIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1pbmRleC5qcz8xZTkxIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1sZW5ndGguanM/YmEwMCIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8tb2JqZWN0LmpzPzdkOGMiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2LmFycmF5Lml0ZXJhdG9yLmpzPzlkOGUiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC5jcmVhdGUuanM/OGRiNiIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYub2JqZWN0LnNldC1wcm90b3R5cGUtb2YuanM/OGExNCIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYuc3RyaW5nLml0ZXJhdG9yLmpzPzA0NGYiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM3LnN5bWJvbC5hc3luYy1pdGVyYXRvci5qcz83ZGZhIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNy5zeW1ib2wub2JzZXJ2YWJsZS5qcz9iMzlkIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL3dlYi5kb20uaXRlcmFibGUuanM/NTdhMCIsIndlYnBhY2s6Ly8vLi9+Ly42LjExLjZAYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9jcmVhdGUuanM/MzRlZiIsIndlYnBhY2s6Ly8vLi9+Ly42LjExLjZAYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9zZXQtcHJvdG90eXBlLW9mLmpzPzI3MTYiLCJ3ZWJwYWNrOi8vLy4vfi8uNi4xMS42QGJhYmVsLXJ1bnRpbWUvY29yZS1qcy9zeW1ib2wvZm9yLmpzP2RhYmQiLCJ3ZWJwYWNrOi8vLy4vfi8uNi4xMS42QGJhYmVsLXJ1bnRpbWUvY29yZS1qcy9zeW1ib2wvaXRlcmF0b3IuanM/YWNmMSIsIndlYnBhY2s6Ly8vZGVsZWdhdGVkIC4vbm9kZV9tb2R1bGVzLy4zLjYuMEByZWR1eC9saWIvaW5kZXguanMgZnJvbSBkbGwtcmVmZXJlbmNlIGxpYnNfbGliP2VjMDAiLCJ3ZWJwYWNrOi8vL2RlbGVnYXRlZCAuL25vZGVfbW9kdWxlcy8uMC4wLjhAd2h5LWRpZC15b3UtdXBkYXRlL2xpYi9pbmRleC5qcyBmcm9tIGRsbC1yZWZlcmVuY2UgbGlic19saWI/NmE3ZiIsIndlYnBhY2s6Ly8vZGVsZWdhdGVkIC4vbm9kZV9tb2R1bGVzLy4xLjAuNkBmYXN0Y2xpY2svbGliL2Zhc3RjbGljay5qcyBmcm9tIGRsbC1yZWZlcmVuY2UgbGlic19saWI/N2Y0MSIsIndlYnBhY2s6Ly8vZGVsZWdhdGVkIC4vbm9kZV9tb2R1bGVzLy4xNS4zLjJAcmVhY3QtYWRkb25zLXBlcmYvaW5kZXguanMgZnJvbSBkbGwtcmVmZXJlbmNlIGxpYnNfbGliPzI1NWIiLCJ3ZWJwYWNrOi8vL2RlbGVnYXRlZCAuL25vZGVfbW9kdWxlcy8uMTUuMy4yQHJlYWN0LWRvbS9pbmRleC5qcyBmcm9tIGRsbC1yZWZlcmVuY2UgbGlic19saWI/ZTU4MCIsIndlYnBhY2s6Ly8vZGVsZWdhdGVkIC4vbm9kZV9tb2R1bGVzLy4yLjEuMEByZWFjdC1pbW11dGFibGUtcHJvcHR5cGVzL2Rpc3QvSW1tdXRhYmxlUHJvcFR5cGVzLmpzIGZyb20gZGxsLXJlZmVyZW5jZSBsaWJzX2xpYj83YzUzIiwid2VicGFjazovLy9kZWxlZ2F0ZWQgLi9ub2RlX21vZHVsZXMvLjIuMS4wQHJlZHV4LXRodW5rL2xpYi9pbmRleC5qcyBmcm9tIGRsbC1yZWZlcmVuY2UgbGlic19saWI/MGJlMCIsIndlYnBhY2s6Ly8vZGVsZWdhdGVkIC4vbm9kZV9tb2R1bGVzLy4yLjcuMEByZWR1eC1sb2dnZXIvbGliL2luZGV4LmpzIGZyb20gZGxsLXJlZmVyZW5jZSBsaWJzX2xpYj80N2JhIiwid2VicGFjazovLy9kZWxlZ2F0ZWQgLi9ub2RlX21vZHVsZXMvLjAuMC44QHJlZHV4LWltbXV0YWJsZWpzL2xpYi9pbmRleC5qcyBmcm9tIGRsbC1yZWZlcmVuY2UgbGlic19saWI/YjE5YyIsIndlYnBhY2s6Ly8vLi9jb21tb24vcGFnZXMvaW5kZXgvaW5kZXhBY3Rpb25zLmpzIiwid2VicGFjazovLy8uL2NsaWVudC9qcy9wYWdlcy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9jb21tb24vY29tcG9uZW50cy9jb21tb24vVGFiLmpzeCIsIndlYnBhY2s6Ly8vLi9jb21tb24vY29tcG9uZW50cy9pbmRleC9BZGRUb2RvLmpzeCIsIndlYnBhY2s6Ly8vLi9jb21tb24vY29tcG9uZW50cy9pbmRleC9Gb290ZXIuanN4Iiwid2VicGFjazovLy8uL2NvbW1vbi9jb21wb25lbnRzL2luZGV4L1RvZG8uanN4Iiwid2VicGFjazovLy8uL2NvbW1vbi9jb21wb25lbnRzL2luZGV4L1RvZG9MaXN0LmpzeCIsIndlYnBhY2s6Ly8vLi9jb21tb24vcGFnZXMvaW5kZXgvSW5kZXguanN4Iiwid2VicGFjazovLy8uL2NvbW1vbi9wYWdlcy9pbmRleC9pbmRleFJlZHVjZXJzLmpzIiwid2VicGFjazovLy8uL34vLjIuMi41QGNsYXNzbmFtZXMvaW5kZXguanMiXSwibmFtZXMiOlsiZXZlbnRNYXRjaFJlZyIsImdldEV2ZW50TWV0aG9kc1Byb3BzIiwiaW5zdGFuY2UiLCJtZXRob2RzIiwiT2JqZWN0IiwiZ2V0T3duUHJvcGVydHlOYW1lcyIsImZpbHRlciIsInByb3AiLCJ0ZXN0IiwiaW5zdGFuY2VQcm90b3R5cGUiLCJnZXRQcm90b3R5cGVPZiIsInByb3RvdHlwZSIsImNvbmNhdCIsIkJhc2UiLCJwcm9wcyIsImNvbnRleHQiLCJfX2V2ZW50TmFtZXMiLCJfX2JpbmRGdW5jdGlvbnMiLCJmdW5jQmluZGVkIiwiYmluZCIsIm9uIiwiZXZlbnROYW1lIiwiZm4iLCJFcnJvciIsInB1c2giLCIkZXZlbnRCdXMiLCJhZGRMaXN0ZW5lciIsImVtaXQiLCJhcmdzIiwib2ZmIiwiZXZlbnRzIiwiaW5kZXgiLCJpbmRleE9mIiwicmVtb3ZlTGlzdGVuZXIiLCJzcGxpY2UiLCJsZW5ndGgiLCJjb25zb2xlIiwid2FybiIsIl9yZWFjdEludGVybmFsSW5zdGFuY2UiLCJnZXROYW1lIiwiY29uc3RydWN0b3IiLCJuYW1lIiwic2hvdWxkQ29tcG9uZW50VXBkYXRlIiwibmV4dFByb3BzIiwibmV4dFN0YXRlIiwic2hvdWxkVXBkYXRlIiwic3RhdGUiLCJwcm9jZXNzIiwiZW52IiwiTk9ERV9FTlYiLCJsb2ciLCJjb21wb25lbnRXaWxsVW5tb3VudCIsImhhc093blByb3BlcnR5IiwiY29udGV4dFR5cGVzIiwiaW5zdGFuY2VPZiIsImNyZWF0ZVJlbmRlciIsIndoeURpZFlvdVVwZGF0ZSIsInJlcXVpcmUiLCJkZWZhdWx0IiwiUmVhY3RQZXJmIiwid2luZG93IiwiYXR0YWNoIiwiZG9jdW1lbnQiLCJib2R5IiwibWlkZGxld2FyZUNvbmZpZyIsInN0b3JlIiwicGFnZSIsImdldEVsZW1lbnRCeUlkIiwib25SZW5kZXJDb21wbGV0ZWQiLCJzdGFydCIsInJvb3RSZWR1Y2VyIiwiY29tcG9uZW50IiwidHJhbnNmb3JtZWREYXRhIiwidHJhbnNmb3JtZXIiLCJfX0lOSVRJQUxfU1RBVEVfXyIsInJlcGxhY2VSZWR1Y2VyIiwiX19BUFBfQ09ORklHX18iLCJQcm9taXNlIiwicmVzb2x2ZSIsImNvbmZpZ3VyZVN0b3JlIiwiYnJvd3NlciIsImNyZWF0ZUxvZ2dlciIsIm1pZGRsZXdhcmVCdWlsZGVyIiwibWlkZGxld2FyZSIsImRldlRvb2xzRXh0ZW5zaW9uIiwiYWxsQ29tcG9zZUVsZW1lbnRzIiwiZmluYWxDcmVhdGVTdG9yZSIsImluaXRpYWxTdGF0ZSIsImlzIiwieCIsInkiLCJ0b1N0cmluZyIsInNoYWxsb3dFcXVhbCIsIm9iakEiLCJvYmpCIiwia2V5c0EiLCJrZXlzIiwia2V5c0IiLCJpIiwiY2FsbCIsIm1vZHVsZSIsImV4cG9ydHMiLCJhZGRUb2RvIiwiY29tcGxldGVUb2RvIiwic2V0VmlzaWJpbGl0eUZpbHRlciIsIkFERF9UT0RPIiwiQ09NUExFVEVfVE9ETyIsIlNFVF9WSVNJQklMSVRZX0ZJTFRFUiIsIlZpc2liaWxpdHlGaWx0ZXJzIiwiU0hPV19BTEwiLCJTSE9XX0NPTVBMRVRFRCIsIlNIT1dfQUNUSVZFIiwidGV4dCIsInR5cGUiLCJjcmVhdGVBcHAiLCJmcm9tSlMiLCJUYWJzIiwic2VsZWN0ZWRUYWIiLCJkZWZhdWx0U2VsZWN0ZWRUYWIiLCJmaXJzdFRhYkxhYmVsIiwiZ2V0Q2hpbGRDb250ZXh0Iiwib25TZWxlY3QiLCJhY3RpdmVTdHlsZSIsImFjdGl2ZUxpbmtTdHlsZSIsImRlZmF1bHRBY3RpdmVTdHlsZSIsInRhYiIsInNldFN0YXRlIiwicmVzdCIsImZpbmRGaXJzdFRhYkxhYmVsIiwiY2hpbGRyZW4iLCJDaGlsZHJlbiIsImZvckVhY2giLCJjaGlsZCIsImxhYmVsIiwicmVuZGVyIiwiY2xhc3NOYW1lIiwic3R5bGUiLCJkZWZhdWx0UHJvcHMiLCJwcm9wVHlwZXMiLCJmdW5jIiwib2JqZWN0Iiwic3RyaW5nIiwiY2hpbGRDb250ZXh0VHlwZXMiLCJmb250V2VpZ2h0IiwiVGFiVGl0bGUiLCJjb21wb25lbnREaWRNb3VudCIsImlzQWN0aXZlIiwiY2xzTmFtZXMiLCJhY3RpdmUiLCJpc1JlcXVpcmVkIiwic3R5bGVzIiwidmlzaWJsZSIsImRpc3BsYXkiLCJoaWRkZW4iLCJUYWJQYW5lbCIsImFzc2lnbiIsImRpc3BsYXlTdHlsZSIsImZvciIsIkZvb3RlciIsInJlbmRlckZpbHRlciIsImUiLCJwcmV2ZW50RGVmYXVsdCIsIm9uRmlsdGVyQ2hhbmdlIiwib25lT2YiLCJjb21wbGV0ZWQiLCJ0ZXh0RGVjb3JhdGlvbiIsImN1cnNvciIsInVuY29tcGxldGVkIiwiVG9kbyIsIm9uQ2xpY2siLCJib29sIiwiVG9kb0xpc3QiLCJ0b2RvcyIsIm1hcCIsInRvZG8iLCJnZXQiLCJvblRvZG9DbGljayIsImxpc3RPZiIsImNvbnRhaW5zIiwiUGFnZSIsIiRhcHBDb25maWciLCJ1c2VyIiwiZGlzcGF0Y2giLCJ2aXNpYmxlVG9kb3MiLCJ2aXNpYmlsaXR5RmlsdGVyIiwibmV4dEZpbHRlciIsInNlbGVjdFRvZG9zIiwic2VsZWN0IiwiYWN0aW9uIiwidXBkYXRlIiwiaXRlbSIsInNldCIsInRvZG9BcHAiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBO0FBQ0EsbUVBQTJEO0FBQzNEO0FBQ0E7QUFDQTs7QUFFQSxvREFBNEM7QUFDNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsa0RBQTBDO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLGNBQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQUlBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQjtBQUMzQjtBQUNBLFlBQUk7QUFDSjtBQUNBLFdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0Esc0RBQThDO0FBQzlDO0FBQ0EscUNBQTZCOztBQUU3QiwrQ0FBdUM7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBTTtBQUNOLGFBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQU87QUFDUCxjQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFNO0FBQ047QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0wsWUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBOztBQUVBLDhDQUFzQztBQUN0QztBQUNBO0FBQ0EscUNBQTZCO0FBQzdCLHFDQUE2QjtBQUM3QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUFvQixnQkFBZ0I7QUFDcEM7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUFvQixnQkFBZ0I7QUFDcEM7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLGFBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsYUFBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHlCQUFpQiw4QkFBOEI7QUFDL0M7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsMEJBQWtCLHFCQUFxQjtBQUN2QztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQUk7QUFDSjs7QUFFQSw0REFBb0Q7QUFDcEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFlBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBLFlBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBbUIsMkJBQTJCO0FBQzlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLDBCQUFrQixjQUFjO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx5QkFBaUIsNEJBQTRCO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFNO0FBQ047O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLDBCQUFrQiw0QkFBNEI7QUFDOUM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsMEJBQWtCLDRCQUE0QjtBQUM5QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBbUIsdUNBQXVDO0FBQzFEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUFtQix1Q0FBdUM7QUFDMUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUFtQixzQkFBc0I7QUFDekM7QUFDQTtBQUNBO0FBQ0EsZUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHlCQUFpQix3Q0FBd0M7QUFDekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxlQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsY0FBTTtBQUNOO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLDhDQUFzQyx1QkFBdUI7O0FBRTdEO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDamtCQSwyQjs7Ozs7Ozs7O0FDQUEsK0M7Ozs7Ozs7OztBQ0FBO0FBQ0E7QUFDQTtBQUNBLHdDQUF1QyxnQzs7Ozs7Ozs7O0FDSHZDLHdCQUF1QjtBQUN2QjtBQUNBO0FBQ0EsRzs7Ozs7Ozs7O0FDSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEc7Ozs7Ozs7OztBQ0xBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRzs7Ozs7Ozs7O0FDUkE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUEsdUNBQXNDLHVDQUF1QyxnQkFBZ0I7O0FBRTdGO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0EsRzs7Ozs7Ozs7O0FDaENBOztBQUVBOztBQUVBOztBQUVBOztBQUVBLHVDQUFzQyx1Q0FBdUMsZ0JBQWdCOztBQUU3RjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEc7Ozs7Ozs7OztBQ2hCQSw4QkFBNkI7QUFDN0Isc0NBQXFDLGdDOzs7Ozs7Ozs7QUNEckM7QUFDQTtBQUNBLGtDQUFpQyxRQUFRLGdCQUFnQixVQUFVLEdBQUc7QUFDdEUsRUFBQyxFOzs7Ozs7Ozs7QUNIRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0EsRzs7Ozs7Ozs7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRyxVQUFVO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsRzs7Ozs7Ozs7O0FDZkE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsd0I7Ozs7Ozs7OztBQ1ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRzs7Ozs7Ozs7O0FDSkE7QUFDQTtBQUNBLEc7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNGQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQUVBLEtBQU1BLGdCQUFnQixVQUF0QjtBQUNBLFVBQVNDLG9CQUFULENBQThCQyxRQUE5QixFQUF1QztBQUNuQyxTQUFJQyxVQUFVQyxPQUFPQyxtQkFBUCxDQUEyQkgsUUFBM0IsRUFDVEksTUFEUyxDQUNGLFVBQUNDLElBQUQsRUFBVTtBQUNkLGdCQUFPUCxjQUFjUSxJQUFkLENBQW1CRCxJQUFuQixLQUNBLE9BQU9MLFNBQVNLLElBQVQsQ0FBUCxLQUEwQixVQURqQztBQUVILE1BSlMsQ0FBZDs7QUFNQSxTQUFJRSxvQkFBb0JMLE9BQU9NLGNBQVAsQ0FBc0JSLFFBQXRCLENBQXhCO0FBQ0EsU0FBR08sc0JBQXNCTCxPQUFPTyxTQUFoQyxFQUEyQztBQUN2Q1IsbUJBQVVBLFFBQVFTLE1BQVIsQ0FBZVgscUJBQXFCUSxpQkFBckIsQ0FBZixDQUFWO0FBQ0g7O0FBRUQsWUFBT04sT0FBUDtBQUNIOztLQUdvQlUsSTs7O0FBQ2pCLG1CQUFZQyxLQUFaLEVBQW1CQyxPQUFuQixFQUEyQjtBQUFBOztBQUFBLG9FQUN2QixzQkFBTUQsS0FBTixFQUFhQyxPQUFiLENBRHVCOztBQUd2QixlQUFLQyxZQUFMLEdBQW9CLEVBQXBCOztBQUVBLGVBQUtDLGVBQUw7QUFMdUI7QUFNMUI7O29CQUVEQSxlLDhCQUFpQjtBQUNiLGFBQUlILFFBQVFiLHFCQUFxQixJQUFyQixDQUFaO0FBQ0EsOEJBQWdCYSxLQUFoQixrSEFBc0I7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUFBLGlCQUFkUCxJQUFjOztBQUNsQixpQkFBRyxDQUFDLEtBQUtBLElBQUwsRUFBV1csVUFBZixFQUEwQjtBQUN0QixzQkFBS1gsSUFBTCxJQUFhLEtBQUtBLElBQUwsRUFBV1ksSUFBWCxDQUFnQixJQUFoQixDQUFiO0FBQ0Esc0JBQUtaLElBQUwsRUFBV1csVUFBWCxHQUF3QixJQUF4QjtBQUNIO0FBQ0o7QUFDSixNOztvQkFFREUsRSxlQUFHQyxTLEVBQVdDLEUsRUFBRztBQUNiLGFBQUcsT0FBT0EsRUFBUCxLQUFjLFVBQWpCLEVBQTZCLE1BQU0sSUFBSUMsS0FBSixDQUFVLHlCQUFWLENBQU47O0FBRTdCLGFBQUcsQ0FBQyxLQUFLUCxZQUFMLENBQWtCSyxTQUFsQixDQUFKLEVBQWlDO0FBQzdCLGtCQUFLTCxZQUFMLENBQWtCSyxTQUFsQixJQUErQixDQUFDQyxFQUFELENBQS9CO0FBQ0gsVUFGRCxNQUVPO0FBQ0gsa0JBQUtOLFlBQUwsQ0FBa0JLLFNBQWxCLEVBQTZCRyxJQUE3QixDQUFrQ0YsRUFBbEM7QUFDSDs7QUFFRCxnQkFBTyxLQUFLUCxPQUFMLENBQWFVLFNBQWIsQ0FBdUJDLFdBQXZCLENBQW1DTCxTQUFuQyxFQUE4Q0MsRUFBOUMsQ0FBUDtBQUNILE07O29CQUVESyxJLGlCQUFLTixTLEVBQW1CO0FBQUE7O0FBQUEsMkNBQUxPLElBQUs7QUFBTEEsaUJBQUs7QUFBQTs7QUFDcEIsZ0JBQU8sMkJBQUtiLE9BQUwsQ0FBYVUsU0FBYixFQUF1QkUsSUFBdkIsNEJBQTRCTixTQUE1QixTQUEwQ08sSUFBMUMsRUFBUDtBQUNILE07O29CQUVEQyxHLGdCQUFJUixTLEVBQVdDLEUsRUFBRztBQUNkLGFBQUlRLFNBQVMsS0FBS2QsWUFBTCxDQUFrQkssU0FBbEIsQ0FBYjtBQUNBLGFBQUdTLE1BQUgsRUFBVTtBQUNOLGlCQUFJQyxRQUFRRCxPQUFPRSxPQUFQLENBQWVWLEVBQWYsQ0FBWjs7QUFFQSxpQkFBR1MsU0FBUyxDQUFaLEVBQWU7QUFDWCxzQkFBS2hCLE9BQUwsQ0FBYVUsU0FBYixDQUF1QlEsY0FBdkIsQ0FBc0NaLFNBQXRDLEVBQWlEQyxFQUFqRDs7QUFFQVEsd0JBQU9JLE1BQVAsQ0FBY0gsS0FBZCxFQUFxQixDQUFyQjs7QUFFQSxxQkFBRyxDQUFDRCxPQUFPSyxNQUFYLEVBQW1CO0FBQ2YsNEJBQU8sS0FBS25CLFlBQUwsQ0FBa0JLLFNBQWxCLENBQVA7QUFDSDtBQUNKLGNBUkQsTUFRTztBQUNIZSx5QkFBUUMsSUFBUixDQUFhLFlBQVloQixTQUFaLEdBQXdCLHdCQUF4QixHQUFtRCxLQUFLaUIsc0JBQUwsQ0FBNEJDLE9BQTVCLEVBQW5ELEdBQTJGLFlBQXhHO0FBQ0g7O0FBRUQsb0JBQU8sSUFBUDtBQUNILFVBaEJELE1BZ0JPO0FBQ0hILHFCQUFRQyxJQUFSLENBQWEsWUFBWWhCLFNBQVosR0FBd0Isd0JBQXhCLEdBQW1ELEtBQUttQixXQUFMLENBQWlCQyxJQUFwRSxHQUEyRSxZQUF4Rjs7QUFFQSxvQkFBTyxLQUFQO0FBQ0g7QUFDSixNOztBQUdEOzs7Ozs7OztvQkFNQUMscUIsa0NBQXNCQyxTLEVBQVdDLFMsRUFBVTtBQUN2QyxhQUFJQyxlQUFlLENBQUMsNEJBQWEsS0FBSy9CLEtBQWxCLEVBQXlCNkIsU0FBekIsQ0FBRCxJQUF3QyxDQUFDLDRCQUFhLEtBQUtHLEtBQWxCLEVBQXlCRixTQUF6QixDQUE1RDs7QUFFQSxhQUFHQyxnQkFBZ0JFLFFBQVFDLEdBQVIsQ0FBWUMsUUFBWixLQUF5QixZQUE1QyxFQUEwRDtBQUN0RGIscUJBQVFjLEdBQVIsQ0FBWSxnQkFBZ0IsS0FBS1YsV0FBTCxDQUFpQkMsSUFBakMsR0FBd0MsY0FBcEQ7QUFDSDs7QUFFRCxnQkFBT0ksWUFBUDtBQUNILE07O29CQUVETSxvQixtQ0FBc0I7QUFDbEIsY0FBSSxJQUFJOUIsU0FBUixJQUFxQixLQUFLTCxZQUExQixFQUF1QztBQUNuQyxpQkFBRyxLQUFLQSxZQUFMLENBQWtCb0MsY0FBbEIsQ0FBaUMvQixTQUFqQyxDQUFILEVBQStDO0FBQzNDLHVDQUFjLEtBQUtMLFlBQUwsQ0FBa0JLLFNBQWxCLENBQWQseUhBQTJDO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFBQSx5QkFBbkNDLEVBQW1DOztBQUN2QywwQkFBS08sR0FBTCxDQUFTUixTQUFULEVBQW9CQyxFQUFwQjtBQUNIO0FBQ0o7QUFDSjtBQUNKLE07Ozs7O21CQXJGZ0JULEk7O0FBdUZyQkEsTUFBS3dDLFlBQUwsR0FBb0I7QUFDaEI1QixnQkFBVyxpQkFBVTZCLFVBQVY7QUFESyxFQUFwQixDOzs7Ozs7Ozs7O0FDNUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvRUFBbUU7QUFDbkU7QUFDQSxzRkFBcUY7QUFDckY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVc7QUFDWCxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBLGdEQUErQztBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFjO0FBQ2QsZUFBYztBQUNkLGVBQWM7QUFDZCxlQUFjO0FBQ2QsZ0JBQWU7QUFDZixnQkFBZTtBQUNmLGdCQUFlO0FBQ2YsaUJBQWdCO0FBQ2hCLDBCOzs7Ozs7Ozs7QUM1REE7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQSxHOzs7Ozs7Ozs7QUNOQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEc7Ozs7Ozs7OztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRzs7Ozs7Ozs7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHOzs7Ozs7Ozs7QUNKQSw4Qzs7Ozs7Ozs7O0FDQUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUEsa0hBQWlILG1CQUFtQixFQUFFLG1CQUFtQixzSEFBc0g7O0FBRS9RLHVDQUFzQyx1Q0FBdUMsZ0JBQWdCOztBQUU3RjtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0EsRzs7Ozs7Ozs7O0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRzs7Ozs7Ozs7O0FDSkE7QUFDQTtBQUNBO0FBQ0EsYzs7Ozs7Ozs7O0FDSEEscUI7Ozs7Ozs7OztBQ0FBLHVCOzs7Ozs7Ozs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOEJBQTZCO0FBQzdCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOEJBQTZCO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTs7Ozs7Ozs7OztBQ3hDQSxlQUFjLHNCOzs7Ozs7Ozs7QUNBZDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxtRUFBa0UsK0JBQStCO0FBQ2pHLEc7Ozs7Ozs7OztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRzs7Ozs7Ozs7O0FDSkE7QUFDQTtBQUNBLG9EQUFtRDtBQUNuRDtBQUNBLHdDQUF1QztBQUN2QyxHOzs7Ozs7Ozs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRzs7Ozs7Ozs7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEc7Ozs7Ozs7OztBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJEQUEwRCxzQkFBc0I7QUFDaEYsaUZBQWdGLHNCQUFzQjtBQUN0RyxHOzs7Ozs7Ozs7QUNSQSxtRDs7Ozs7Ozs7O0FDQUEsK0M7Ozs7Ozs7OztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFpQjtBQUNqQixRQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLGdCQUFlLFNBQVM7QUFDeEI7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLElBQUc7QUFDSCxxQkFBb0IsU0FBUztBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQzdTQSxrQkFBaUI7O0FBRWpCO0FBQ0E7QUFDQSxHOzs7Ozs7Ozs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEc7Ozs7Ozs7OztBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHOzs7Ozs7Ozs7QUNOQTtBQUNBLDJGQUFzRSxnQkFBZ0IsVUFBVSxHQUFHO0FBQ25HLEVBQUMsRTs7Ozs7Ozs7O0FDRkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLDZCQUE0QixhQUFhOztBQUV6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUNBQXdDLG9DQUFvQztBQUM1RSw2Q0FBNEMsb0NBQW9DO0FBQ2hGLE1BQUssMkJBQTJCLG9DQUFvQztBQUNwRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWdCLG1CQUFtQjtBQUNuQztBQUNBO0FBQ0Esa0NBQWlDLDJCQUEyQjtBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0EsRzs7Ozs7Ozs7O0FDckVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHLFVBQVU7QUFDYjtBQUNBLEc7Ozs7Ozs7OztBQ2ZBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsRzs7Ozs7Ozs7O0FDTkEsMEM7Ozs7Ozs7OztBQ0FBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHOzs7Ozs7Ozs7QUNoQkEseUQ7Ozs7Ozs7OztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF1QjtBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBc0I7QUFDdEIscUJBQW9CLHVCQUF1QixTQUFTLElBQUk7QUFDeEQsSUFBRztBQUNILEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwREFBeUQ7QUFDekQ7QUFDQSxNQUFLO0FBQ0w7QUFDQSx1QkFBc0IsaUNBQWlDO0FBQ3ZELE1BQUs7QUFDTCxJQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtEQUE4RCw4QkFBOEI7QUFDNUY7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLDJEQUEwRCxnQkFBZ0I7O0FBRTFFO0FBQ0E7QUFDQTtBQUNBLHFCQUFvQixvQkFBb0I7O0FBRXhDLDJDQUEwQyxvQkFBb0I7O0FBRTlEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSCx5QkFBd0IsZUFBZSxFQUFFO0FBQ3pDLHlCQUF3QixnQkFBZ0I7QUFDeEMsRUFBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscURBQW9ELEtBQUssUUFBUSxpQ0FBaUM7QUFDbEcsRUFBQztBQUNEO0FBQ0EsZ0RBQStDO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJDOzs7Ozs7Ozs7QUMxT0EsbUJBQWtCLHlGOzs7Ozs7Ozs7QUNBbEIsZ0Q7Ozs7Ozs7OztBQ0FBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBLHVDQUFzQyx1Q0FBdUMsZ0JBQWdCOztBQUU3RjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsTUFBSztBQUNMOztBQUVBLHNCQUFxQixvQkFBb0I7QUFDekM7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUMsRzs7Ozs7Ozs7O0FDdkRELDBDOzs7Ozs7Ozs7Ozs7bUJDa0J3QkMsWTs7QUFsQnhCOzs7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7QUFFQTs7OztBQUNBOzs7Ozs7QUFFQSxLQUFJUixRQUFRQyxHQUFSLENBQVlDLFFBQVosS0FBeUIsWUFBN0IsRUFBMkM7QUFDdkMsU0FBSU8sa0JBQWtCLG1CQUFBQyxDQUFRLDRCQUFSLEVBQThCQyxPQUFwRDtBQUNBRjtBQUNBLFNBQUlHLFlBQVksbUJBQUFGLENBQVEsMkJBQVIsQ0FBaEI7QUFDQUcsWUFBT0QsU0FBUCxHQUFtQkEsU0FBbkI7QUFDSDs7QUFFRDtBQUNBLHFCQUFVRSxNQUFWLENBQWlCQyxTQUFTQyxJQUExQjs7QUFFZSxVQUFTUixZQUFULEdBQTRDO0FBQUEsU0FBdEJTLGdCQUFzQix1RUFBSCxFQUFHOztBQUN2RCxTQUFJQyxRQUFRLElBQVo7QUFDQSxTQUFJQyxPQUFPSixTQUFTSyxjQUFULENBQXdCLE1BQXhCLENBQVg7QUFDQSxTQUFJQyxvQkFBb0IsT0FBT0osaUJBQWlCSSxpQkFBeEIsS0FBOEMsVUFBOUMsSUFBNERKLGlCQUFpQkksaUJBQXJHOztBQUVBLFNBQUlyQixRQUFRQyxHQUFSLENBQVlDLFFBQVosS0FBeUIsWUFBN0IsRUFBMkM7QUFDdkM7QUFDQSxhQUFJVyxPQUFPRCxTQUFYLEVBQXNCO0FBQ2xCQSx1QkFBVVUsS0FBVjtBQUNIO0FBQ0o7O0FBRUQsWUFBTyxnQkFJSjtBQUFBLHFDQUhDQyxXQUdEO0FBQUEsYUFIQ0EsV0FHRCxvQ0FIZ0IsWUFBTSxDQUNwQixDQUVGO0FBQUEsbUNBRENDLFNBQ0Q7QUFBQSxhQURDQSxTQUNELGtDQURhLElBQ2I7O0FBQ0MsYUFBSUMsa0JBQWtCLE9BQU9SLGlCQUFpQlMsV0FBeEIsS0FBd0MsVUFBeEMsR0FDaEJULGlCQUFpQlMsV0FBakIsQ0FBNkJiLE9BQU9jLGlCQUFwQyxDQURnQixHQUN5Q2QsT0FBT2MsaUJBRHRFO0FBRUEsYUFBSSxDQUFDVCxLQUFMLEVBQVk7QUFDUkEscUJBQVEscUJBQWVPLGVBQWYsRUFBZ0NGLFdBQWhDLENBQVI7QUFDSDtBQUNEO0FBSEEsY0FJSyxJQUFJdkIsUUFBUUMsR0FBUixDQUFZQyxRQUFaLEtBQXlCLFlBQTdCLEVBQTJDO0FBQzVDZ0IsdUJBQU1VLGNBQU4sQ0FBcUJMLFdBQXJCO0FBQ0g7O0FBRUQsK0JBQ0k7QUFBQTtBQUFBLGVBQVUsT0FBUUwsS0FBbEI7QUFDSTtBQUFBO0FBQUEsbUJBQUssV0FBWUwsT0FBT2dCLGNBQXhCO0FBQ01MO0FBRE47QUFESixVQURKLEVBTUdMLElBTkgsRUFNU0UsaUJBTlQ7O0FBUUEsZ0JBQU9TLFFBQVFDLE9BQVIsQ0FBZ0JiLEtBQWhCLENBQVA7QUFDSCxNQXhCRDtBQXlCSCxFOzs7Ozs7Ozs7O0FDdkREOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBLHVDQUFzQyx1Q0FBdUMsZ0JBQWdCOztBQUU3Rjs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxFQUFDOztBQUVEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSx1Qjs7Ozs7Ozs7Ozs7O21CQ2xDd0JjLGM7O0FBL0J4Qjs7QUFDQTs7Ozs7O0FBRUEsS0FBR2hDLFFBQVFDLEdBQVIsQ0FBWUMsUUFBWixLQUF5QixZQUF6QixJQUF5Q0YsUUFBUWlDLE9BQXBELEVBQTREO0FBQ3hELFNBQUlDLGVBQWUsbUJBQUF4QixDQUFRLHVCQUFSLENBQW5CO0FBQ0g7O0FBRUQsS0FBTXlCLG9CQUFvQixTQUFwQkEsaUJBQW9CLEdBQU07QUFDNUIsU0FBSUMsYUFBYSxpREFBakI7O0FBRUEsU0FBR3BDLFFBQVFpQyxPQUFSLElBQW1CakMsUUFBUUMsR0FBUixDQUFZQyxRQUFaLEtBQXlCLFlBQS9DLEVBQTREO0FBQ3hELGFBQUcsQ0FBQ1csT0FBT3dCLGlCQUFYLEVBQThCO0FBQzFCRCwwQkFBYSxrREFBdUJGLGNBQXZCLENBQWI7QUFDSDtBQUNKOztBQUVELFNBQUlJLHFCQUFxQixDQUNyQkYsVUFEcUIsQ0FBekI7O0FBSUEsU0FBR3BDLFFBQVFpQyxPQUFSLElBQW1CakMsUUFBUUMsR0FBUixDQUFZQyxRQUFaLEtBQXlCLFlBQS9DLEVBQTREO0FBQ3hELGFBQUdXLE9BQU93QixpQkFBVixFQUE0QjtBQUN4QkMsZ0NBQW1CN0QsSUFBbkIsQ0FBd0JvQyxPQUFPd0IsaUJBQVAsRUFBeEI7QUFDSDtBQUNKOztBQUVELFlBQU9DLGtCQUFQO0FBQ0gsRUFwQkQ7O0FBc0JBLEtBQU1DLG1CQUFtQixnQ0FBV0osbUJBQVgscUJBQXpCOztBQUVlLFVBQVNILGNBQVQsQ0FBd0JRLFlBQXhCLEVBQXNDakIsV0FBdEMsRUFBbUQ7QUFDOUQsU0FBTUwsUUFBUXFCLGlCQUFpQmhCLFdBQWpCLEVBQThCaUIsWUFBOUIsQ0FBZDs7QUFFQSxZQUFPdEIsS0FBUDtBQUNILEU7Ozs7Ozs7Ozs7QUNuQ0Q7QUFDQTs7Ozs7Ozs7Ozs7O0FBWUE7O0FBRUE7Ozs7Ozs7O0FBRUEsS0FBSWIsaUJBQWlCaEQsT0FBT08sU0FBUCxDQUFpQnlDLGNBQXRDOztBQUVBOzs7O0FBSUEsVUFBU29DLEVBQVQsQ0FBWUMsQ0FBWixFQUFlQyxDQUFmLEVBQWtCO0FBQ2Q7QUFDQSxTQUFJRCxNQUFNQyxDQUFWLEVBQWE7QUFDVDtBQUNBO0FBQ0EsZ0JBQU8sSUFBUDtBQUNILE1BSkQsTUFJTztBQUNILGFBQUcsT0FBT0QsQ0FBUCxLQUFhLFVBQWIsSUFBMkIsT0FBT0MsQ0FBUCxLQUFhLFVBQTNDLEVBQXNEO0FBQ2xELG9CQUFPRCxFQUFFRSxRQUFGLE9BQWlCRCxFQUFFQyxRQUFGLEVBQXhCO0FBQ0g7QUFDRDtBQUNBLGdCQUFPLEtBQVA7QUFDSDtBQUNKOztBQUVEOzs7OztBQUtBLFVBQVNDLFlBQVQsQ0FBc0JDLElBQXRCLEVBQTRCQyxJQUE1QixFQUFrQztBQUM5QixTQUFJTixHQUFHSyxJQUFILEVBQVNDLElBQVQsQ0FBSixFQUFvQjtBQUNoQixnQkFBTyxJQUFQO0FBQ0g7O0FBRUQsU0FBSSxRQUFPRCxJQUFQLHVEQUFPQSxJQUFQLE9BQWdCLFFBQWhCLElBQTRCQSxTQUFTLElBQXJDLElBQTZDLFFBQU9DLElBQVAsdURBQU9BLElBQVAsT0FBZ0IsUUFBN0QsSUFBeUVBLFNBQVMsSUFBdEYsRUFBNEY7QUFDeEYsZ0JBQU8sS0FBUDtBQUNIOztBQUVELFNBQUlDLFFBQVEzRixPQUFPNEYsSUFBUCxDQUFZSCxJQUFaLENBQVo7QUFDQSxTQUFJSSxRQUFRN0YsT0FBTzRGLElBQVAsQ0FBWUYsSUFBWixDQUFaOztBQUVBLFNBQUlDLE1BQU01RCxNQUFOLEtBQWlCOEQsTUFBTTlELE1BQTNCLEVBQW1DO0FBQy9CLGdCQUFPLEtBQVA7QUFDSDs7QUFFRDtBQUNBLFVBQUssSUFBSStELElBQUksQ0FBYixFQUFnQkEsSUFBSUgsTUFBTTVELE1BQTFCLEVBQWtDK0QsR0FBbEMsRUFBdUM7QUFDbkMsYUFBSSxDQUFDOUMsZUFBZStDLElBQWYsQ0FBb0JMLElBQXBCLEVBQTBCQyxNQUFNRyxDQUFOLENBQTFCLENBQUQsSUFBd0MsQ0FBQ1YsR0FBR0ssS0FBS0UsTUFBTUcsQ0FBTixDQUFMLENBQUgsRUFBbUJKLEtBQUtDLE1BQU1HLENBQU4sQ0FBTCxDQUFuQixDQUE3QyxFQUFpRjtBQUM3RSxvQkFBTyxLQUFQO0FBQ0g7QUFDSjs7QUFFRCxZQUFPLElBQVA7QUFDSDs7QUFFREUsUUFBT0MsT0FBUCxHQUFpQlQsWUFBakIsQzs7Ozs7Ozs7O0FDckVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRzs7Ozs7Ozs7O0FDSkE7QUFDQSwwRjs7Ozs7Ozs7O0FDREE7QUFDQSxrRjs7Ozs7Ozs7O0FDREE7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyRTs7Ozs7Ozs7O0FDSkE7QUFDQTtBQUNBLHNGOzs7Ozs7Ozs7QUNGQTtBQUNBO0FBQ0E7QUFDQSxHOzs7Ozs7Ozs7QUNIQSw2QkFBNEIsZTs7Ozs7Ozs7O0FDQTVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSyxXQUFXLGVBQWU7QUFDL0I7QUFDQSxNQUFLO0FBQ0w7QUFDQSxHOzs7Ozs7Ozs7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0gsRzs7Ozs7Ozs7O0FDZEEsK0Y7Ozs7Ozs7OztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRzs7Ozs7Ozs7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHOzs7Ozs7Ozs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EseUhBQWdGLGFBQWEsRUFBRTs7QUFFL0Y7QUFDQSxzREFBcUQsMEJBQTBCO0FBQy9FO0FBQ0EsRzs7Ozs7Ozs7O0FDWkE7QUFDQSxXQUFVO0FBQ1YsRzs7Ozs7Ozs7O0FDRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRzs7Ozs7Ozs7O0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0RBQWlEO0FBQ2pELEVBQUM7QUFDRDtBQUNBLHNCQUFxQjtBQUNyQjtBQUNBLFVBQVM7QUFDVCxLQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEc7Ozs7Ozs7OztBQ3BEQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEc7Ozs7Ozs7OztBQ1pBO0FBQ0E7QUFDQTtBQUNBLG1CQUFrQjs7QUFFbEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQ2xCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0gsRzs7Ozs7Ozs7O0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbURBQWtEO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFPLFVBQVUsY0FBYztBQUMvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLLEdBQUc7QUFDUjtBQUNBLEc7Ozs7Ozs7OztBQ3hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEc7Ozs7Ozs7OztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHOzs7Ozs7Ozs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDREQUEyRDtBQUMzRCxHOzs7Ozs7Ozs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEc7Ozs7Ozs7OztBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlDQUFnQztBQUNoQyxlQUFjO0FBQ2Qsa0JBQWlCO0FBQ2pCO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQzs7QUFFRDtBQUNBOztBQUVBO0FBQ0E7QUFDQSw2Qjs7Ozs7Ozs7O0FDakNBO0FBQ0E7QUFDQSwrQkFBOEIsd0RBQW9DLEU7Ozs7Ozs7OztBQ0ZsRTtBQUNBO0FBQ0EsK0JBQThCLGdFQUE0QyxFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNGMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsOEJBQTZCO0FBQzdCLGVBQWM7QUFDZDtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxnQ0FBK0I7QUFDL0I7QUFDQTtBQUNBLFdBQVU7QUFDVixFQUFDLEU7Ozs7Ozs7OztBQ2hCRCwrRDs7Ozs7Ozs7O0FDQUEsNEQ7Ozs7Ozs7OztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEseUdBQXdHLE9BQU87QUFDL0c7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEU7Ozs7Ozs7OztBQ1pBLG1CQUFrQixnRzs7Ozs7Ozs7O0FDQWxCLG1CQUFrQiwwRzs7Ozs7Ozs7O0FDQWxCLG1CQUFrQiw2Rjs7Ozs7Ozs7O0FDQWxCLG1CQUFrQixrRzs7Ozs7Ozs7O0FDQWxCLGdEOzs7Ozs7Ozs7QUNBQSxnRDs7Ozs7Ozs7O0FDQUEsZ0Q7Ozs7Ozs7OztBQ0FBLGdEOzs7Ozs7Ozs7QUNBQSxnRDs7Ozs7Ozs7O0FDQUEsZ0Q7Ozs7Ozs7OztBQ0FBLGdEOzs7Ozs7Ozs7QUNBQSxnRDs7Ozs7Ozs7Ozs7QUNBQSxnRDs7Ozs7Ozs7Ozs7OztTQ3NCZ0JVLE8sR0FBQUEsTztTQUlBQyxZLEdBQUFBLFk7U0FJQUMsbUIsR0FBQUEsbUI7QUE5QmhCOzs7O0FBSU8sS0FBTUMsOEJBQVcsVUFBakI7QUFDQSxLQUFNQyx3Q0FBZ0IsZUFBdEI7QUFDQSxLQUFNQyx3REFBd0IsdUJBQTlCOztBQUVQOzs7O0FBSU8sS0FBTUMsZ0RBQW9CO0FBQzdCQyxlQUFVLFVBRG1CO0FBRTdCQyxxQkFBZ0IsZ0JBRmE7QUFHN0JDLGtCQUFhO0FBSGdCLEVBQTFCOztBQU1QOzs7O0FBSU8sVUFBU1QsT0FBVCxDQUFpQlUsSUFBakIsRUFBdUI7QUFDMUIsWUFBTyxFQUFFQyxNQUFNUixRQUFSLEVBQWtCTyxVQUFsQixFQUFQO0FBQ0g7O0FBRU0sVUFBU1QsWUFBVCxDQUFzQnhFLEtBQXRCLEVBQTZCO0FBQ2hDLFlBQU8sRUFBRWtGLE1BQU1QLGFBQVIsRUFBdUIzRSxZQUF2QixFQUFQO0FBQ0g7O0FBRU0sVUFBU3lFLG1CQUFULENBQTZCbEcsTUFBN0IsRUFBcUM7QUFDeEMsWUFBTyxFQUFFMkcsTUFBTU4scUJBQVIsRUFBK0JyRyxjQUEvQixFQUFQO0FBQ0gsRTs7Ozs7Ozs7Ozs7Ozs7OztBQ2hDRDs7OztBQUNBOzs7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7Ozs7QUFFQSxLQUFJNEcsWUFBWSx5QkFBYTtBQUN6QnpDLGtCQUFhLG9CQUFVMEM7QUFERSxFQUFiLENBQWhCOztBQUlBRCxXQUFVO0FBQ041Qyx5Q0FETTtBQUVOQyxnQkFBVztBQUZMLEVBQVYsRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNiQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztLQUVxQjZDLEk7OztBQUNqQixtQkFBWXRHLEtBQVosRUFBbUJDLE9BQW5CLEVBQTRCO0FBQUE7O0FBQUEsb0VBQ3hCLGlCQUFNRCxLQUFOLEVBQWFDLE9BQWIsQ0FEd0I7O0FBR3hCLGVBQUsrQixLQUFMLEdBQWE7QUFDVHVFLDBCQUFhdkcsTUFBTXdHLGtCQUFOLElBQTRCO0FBRGhDLFVBQWI7O0FBSUEsZUFBS0MsYUFBTCxHQUFxQixJQUFyQjtBQVB3QjtBQVEzQjs7b0JBRURDLGUsOEJBQWlCO0FBQ2IsZ0JBQU87QUFDSEMsdUJBQVUsS0FBS0EsUUFBTCxDQUFjdEcsSUFBZCxDQUFtQixJQUFuQixDQURQO0FBRUhrRywwQkFBYSxLQUFLdkUsS0FBTCxDQUFXdUUsV0FBWCxJQUEwQixLQUFLdkcsS0FBTCxDQUFXd0csa0JBRi9DO0FBR0hJLDBCQUFhLEtBQUs1RyxLQUFMLENBQVc2RyxlQUFYLElBQThCQyxrQkFIeEM7QUFJSEwsNEJBQWUsS0FBS0E7QUFKakIsVUFBUDtBQU1ILE07O29CQUVERSxRLHFCQUFTSSxHLEVBQWM7QUFDbkIsYUFBRyxLQUFLL0UsS0FBTCxDQUFXdUUsV0FBWCxLQUEyQlEsR0FBOUIsRUFBbUM7O0FBRW5DLGNBQUtDLFFBQUwsQ0FBYztBQUNWVCwwQkFBYVE7QUFESCxVQUFkOztBQUlBLGFBQUcsT0FBTyxLQUFLL0csS0FBTCxDQUFXMkcsUUFBbEIsS0FBK0IsVUFBbEMsRUFBOEM7QUFBQTs7QUFBQSwrQ0FQakNNLElBT2lDO0FBUGpDQSxxQkFPaUM7QUFBQTs7QUFDMUMsNEJBQUtqSCxLQUFMLEVBQVcyRyxRQUFYLGdCQUFvQkksR0FBcEIsU0FBNEJFLElBQTVCO0FBQ0g7QUFDSixNOztvQkFFREMsaUIsOEJBQWtCQyxRLEVBQVM7QUFBQTs7QUFDdkIsYUFBSSxRQUFPQSxRQUFQLHVEQUFPQSxRQUFQLE9BQW9CLFFBQXBCLElBQWdDLEtBQUtWLGFBQXpDLEVBQXdEO0FBQ3BEO0FBQ0g7O0FBRUQseUJBQU1XLFFBQU4sQ0FBZUMsT0FBZixDQUF1QkYsUUFBdkIsRUFBaUMsVUFBQ0csS0FBRCxFQUFXO0FBQ3hDLGlCQUFHQSxNQUFNdEgsS0FBTixJQUFlc0gsTUFBTXRILEtBQU4sQ0FBWXVILEtBQTlCLEVBQXFDO0FBQ2pDLHFCQUFHLE9BQUtkLGFBQUwsSUFBc0IsSUFBekIsRUFBOEI7QUFDMUIsNEJBQUtBLGFBQUwsR0FBcUJhLE1BQU10SCxLQUFOLENBQVl1SCxLQUFqQztBQUNBO0FBQ0g7QUFDSjs7QUFFRCxvQkFBS0wsaUJBQUwsQ0FBdUJJLE1BQU10SCxLQUFOLElBQWVzSCxNQUFNdEgsS0FBTixDQUFZbUgsUUFBbEQ7QUFDSCxVQVREO0FBVUgsTTs7b0JBRURLLE0scUJBQVM7QUFDTCxjQUFLTixpQkFBTCxDQUF1QixLQUFLbEgsS0FBTCxDQUFXbUgsUUFBbEM7O0FBRUEsZ0JBQ0k7QUFBQTtBQUFBLGVBQUssV0FBWSxLQUFLbkgsS0FBTCxDQUFXeUgsU0FBNUIsRUFBd0MsT0FBUSxLQUFLekgsS0FBTCxDQUFXMEgsS0FBM0Q7QUFDSyxrQkFBSzFILEtBQUwsQ0FBV21IO0FBRGhCLFVBREo7QUFLSCxNOzs7OzttQkF6RGdCYixJOztBQTJEckJBLE1BQUtxQixZQUFMLEdBQW9CO0FBQ2hCaEIsZUFBVSxJQURNO0FBRWhCRSxzQkFBaUIsSUFGRDtBQUdoQkwseUJBQW9CLEVBSEo7QUFJaEJpQixnQkFBVyxFQUpLO0FBS2hCQyxZQUFPO0FBTFMsRUFBcEI7QUFPQXBCLE1BQUtzQixTQUFMLEdBQWlCO0FBQ2JqQixlQUFVLGlCQUFVa0IsSUFEUDtBQUViaEIsc0JBQWlCLGlCQUFVaUIsTUFGZDtBQUdidEIseUJBQW9CLGlCQUFVdUIsTUFIakI7QUFJYk4sZ0JBQVcsaUJBQVVNLE1BSlI7QUFLYkwsWUFBTyxpQkFBVUk7QUFMSixFQUFqQjtBQU9BeEIsTUFBSzBCLGlCQUFMLEdBQXlCO0FBQ3JCckIsZUFBVSxpQkFBVWtCLElBREM7QUFFckJ0QixrQkFBYSxpQkFBVXdCLE1BRkY7QUFHckJuQixrQkFBYSxpQkFBVWtCLE1BSEY7QUFJckJyQixvQkFBZSxpQkFBVXNCO0FBSkosRUFBekI7O0FBT0EsS0FBTWpCLHFCQUFxQjtBQUN2Qm1CLGlCQUFZO0FBRFcsRUFBM0I7O0tBSWFDLFEsV0FBQUEsUTs7O0FBQ1QsdUJBQVlsSSxLQUFaLEVBQW1CQyxPQUFuQixFQUEyQjtBQUFBOztBQUFBLHFFQUN2QixzQkFBTUQsS0FBTixFQUFhQyxPQUFiLENBRHVCOztBQUd2QixnQkFBSzBHLFFBQUwsR0FBZ0IsT0FBS0EsUUFBTCxDQUFjdEcsSUFBZCxRQUFoQjtBQUh1QjtBQUkxQjs7d0JBRURzRyxRLHVCQUFVO0FBQ04sY0FBSzFHLE9BQUwsQ0FBYTBHLFFBQWIsQ0FBc0IsS0FBSzNHLEtBQUwsQ0FBV3VILEtBQWpDO0FBQ0gsTTs7d0JBRURZLGlCLGdDQUFvQjtBQUNoQixhQUFJLEtBQUtsSSxPQUFMLENBQWFzRyxXQUFiLEtBQTZCLEtBQUt2RyxLQUFMLENBQVd1SCxLQUF4QyxJQUFrRCxDQUFDLEtBQUt0SCxPQUFMLENBQWFzRyxXQUFkLElBQTZCLEtBQUt0RyxPQUFMLENBQWF3RyxhQUFiLEtBQStCLEtBQUt6RyxLQUFMLENBQVd1SCxLQUE3SCxFQUFxSTtBQUNqSSxrQkFBS3RILE9BQUwsQ0FBYTBHLFFBQWIsQ0FBc0IsS0FBSzNHLEtBQUwsQ0FBV3VILEtBQWpDO0FBQ0g7QUFDSixNOzt3QkFFREMsTSxxQkFBUztBQUNMLGFBQUlFLFFBQVEsSUFBWjtBQUNBLGFBQUlVLFdBQVcsS0FBS25JLE9BQUwsQ0FBYXNHLFdBQWIsS0FBNkIsS0FBS3ZHLEtBQUwsQ0FBV3VILEtBQXZEO0FBQ0EsYUFBSWEsUUFBSixFQUFjO0FBQ1ZWLHFCQUFRLEtBQUt6SCxPQUFMLENBQWEyRyxXQUFyQjtBQUNIO0FBQ0QsYUFBSXlCLFdBQVcsMEJBQVcsS0FBS3JJLEtBQUwsQ0FBV3lILFNBQXRCLEVBQWlDLEVBQUVhLFFBQVFGLFFBQVYsRUFBakMsQ0FBZjs7QUFFQSxnQkFDSTtBQUFBO0FBQUE7QUFDSSw0QkFBWUMsUUFEaEI7QUFFSSx3QkFBT1gsS0FGWDtBQUdJLDBCQUFVLEtBQUtmO0FBSG5CO0FBS0ssa0JBQUszRyxLQUFMLENBQVdtSDtBQUxoQixVQURKO0FBU0gsTTs7Ozs7QUFFTGUsVUFBU1AsWUFBVCxHQUF3QjtBQUNwQkosWUFBTyxFQURhO0FBRXBCRSxnQkFBVztBQUZTLEVBQXhCO0FBSUFTLFVBQVNOLFNBQVQsR0FBcUI7QUFDakJMLFlBQU8saUJBQVVRLE1BQVYsQ0FBaUJRLFVBRFA7QUFFakJkLGdCQUFXLGlCQUFVTTtBQUZKLEVBQXJCO0FBSUFHLFVBQVMzRixZQUFULEdBQXdCO0FBQ3BCb0UsZUFBVSxpQkFBVWtCLElBREE7QUFFcEJwQixvQkFBZSxpQkFBVXNCLE1BRkw7QUFHcEJuQixrQkFBYSxpQkFBVWtCLE1BSEg7QUFJcEJ2QixrQkFBYSxpQkFBVXdCO0FBSkgsRUFBeEI7O0FBT0EsS0FBTVMsU0FBUztBQUNYQyxjQUFTO0FBQ0xDLGtCQUFTO0FBREosTUFERTtBQUlYQyxhQUFRO0FBQ0pELGtCQUFTO0FBREw7QUFKRyxFQUFmOztLQVNhRSxRLFdBQUFBLFE7OztBQUNULHVCQUFZNUksS0FBWixFQUFtQkMsT0FBbkIsRUFBMkI7QUFBQTs7QUFBQSxxRUFDdkIsdUJBQU1ELEtBQU4sRUFBYUMsT0FBYixDQUR1Qjs7QUFHdkIsY0FBSSxJQUFJeUgsS0FBUixJQUFpQmMsTUFBakIsRUFBd0I7QUFDcEIsaUJBQUdBLE9BQU9sRyxjQUFQLENBQXNCb0YsS0FBdEIsQ0FBSCxFQUFnQztBQUM1QnBJLHdCQUFPdUosTUFBUCxDQUFjTCxPQUFPZCxLQUFQLENBQWQsRUFBNkIsT0FBSzFILEtBQUwsQ0FBVzBILEtBQXhDO0FBQ0g7QUFDSjtBQVBzQjtBQVExQjs7d0JBRURGLE0scUJBQVM7QUFDTCxhQUFJc0IsZUFBZSxLQUFLN0ksT0FBTCxDQUFhc0csV0FBYixLQUE2QixLQUFLdkcsS0FBTCxDQUFXK0ksR0FBeEMsR0FDYlAsT0FBT0MsT0FETSxHQUNJRCxPQUFPRyxNQUQ5Qjs7QUFHQSxnQkFDSTtBQUFBO0FBQUE7QUFDSSw0QkFBWSxLQUFLM0ksS0FBTCxDQUFXeUgsU0FEM0I7QUFFSSx3QkFBUXFCLFlBRlo7QUFHSyxrQkFBSzlJLEtBQUwsQ0FBV21IO0FBSGhCLFVBREo7QUFPSCxNOzs7OztBQUVMeUIsVUFBU2pCLFlBQVQsR0FBd0I7QUFDcEJvQixVQUFLLEVBRGU7QUFFcEJ0QixnQkFBVyxhQUZTO0FBR3BCQyxZQUFPO0FBSGEsRUFBeEI7QUFLQWtCLFVBQVNoQixTQUFULEdBQXFCO0FBQ2pCbUIsVUFBSyxpQkFBVWhCLE1BQVYsQ0FBaUJRLFVBREw7QUFFakJkLGdCQUFXLGlCQUFVTSxNQUZKO0FBR2pCTCxZQUFPLGlCQUFVSTtBQUhBLEVBQXJCO0FBS0FjLFVBQVNyRyxZQUFULEdBQXdCO0FBQ3BCZ0Usa0JBQWEsaUJBQVV3QjtBQURILEVBQXhCLEM7Ozs7Ozs7OztBQ3RMQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQSx1Q0FBc0MsdUNBQXVDLGdCQUFnQjs7QUFFN0Y7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDRDQUEyQyxrREFBa0QsNkJBQTZCO0FBQzFIO0FBQ0EsVUFBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEVBQUM7O0FBRUQ7OztBQUdBO0FBQ0E7QUFDQSxHOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDM0RBOzs7O0FBQ0E7Ozs7OztLQUVxQmlCLE07OztBQUNqQixxQkFBWWhKLEtBQVosRUFBbUJDLE9BQW5CLEVBQTRCO0FBQUE7QUFBQSwrREFDeEIsaUJBQU1ELEtBQU4sRUFBYUMsT0FBYixDQUR3QjtBQUUzQjs7c0JBRURnSixZLHlCQUFhekosTSxFQUFRbUMsSSxFQUFNO0FBQUE7O0FBQ3ZCLGFBQUluQyxXQUFXLEtBQUtRLEtBQUwsQ0FBV1IsTUFBMUIsRUFBa0M7QUFDOUIsb0JBQU9tQyxJQUFQO0FBQ0g7O0FBRUQsZ0JBQ0k7QUFBQTtBQUFBLGVBQUcsTUFBSyxHQUFSLEVBQVksU0FBUyxvQkFBSztBQUN0QnVILHVCQUFFQyxjQUFGO0FBQ0EsNEJBQUtuSixLQUFMLENBQVdvSixjQUFYLENBQTBCNUosTUFBMUI7QUFDSCxrQkFIRDtBQUlLbUM7QUFKTCxVQURKO0FBUUgsTTs7c0JBRUQ2RixNLHFCQUFTO0FBQ0wsZ0JBQ0k7QUFBQTtBQUFBO0FBQUE7QUFFSyxnQkFGTDtBQUdLLGtCQUFLeUIsWUFBTCxDQUFrQixVQUFsQixFQUE4QixLQUE5QixDQUhMO0FBSUssaUJBSkw7QUFLSyxrQkFBS0EsWUFBTCxDQUFrQixnQkFBbEIsRUFBb0MsV0FBcEMsQ0FMTDtBQU1LLGlCQU5MO0FBT0ssa0JBQUtBLFlBQUwsQ0FBa0IsYUFBbEIsRUFBaUMsUUFBakMsQ0FQTDtBQUFBO0FBQUEsVUFESjtBQVlILE07Ozs7O21CQWpDZ0JELE07OztBQW9DckJBLFFBQU9wQixTQUFQLEdBQW1CO0FBQ2Z3QixxQkFBZ0IsaUJBQVV2QixJQUFWLENBQWVVLFVBRGhCO0FBRWYvSSxhQUFRLGlCQUFVNkosS0FBVixDQUFnQixDQUNwQixVQURvQixFQUVwQixnQkFGb0IsRUFHcEIsYUFIb0IsQ0FBaEIsRUFJTGQ7QUFOWSxFQUFuQixDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDdkNBOzs7O0FBQ0E7Ozs7OztBQUVBLEtBQUlDLFNBQVM7QUFDVGMsZ0JBQVc7QUFDUEMseUJBQWdCLGNBRFQ7QUFFUEMsaUJBQVE7QUFGRCxNQURGO0FBS1RDLGtCQUFhO0FBQ1RGLHlCQUFnQixNQURQO0FBRVRDLGlCQUFRO0FBRkM7QUFMSixFQUFiOztLQVdxQkUsSTs7O0FBQ2pCLG1CQUFZMUosS0FBWixFQUFtQkMsT0FBbkIsRUFBNEI7QUFBQTtBQUFBLCtEQUN4QixpQkFBTUQsS0FBTixFQUFhQyxPQUFiLENBRHdCO0FBRTNCOztvQkFFRGtJLGlCLGdDQUFvQjtBQUNoQixjQUFLN0gsRUFBTCxDQUFRLE1BQVIsRUFBZ0IsWUFBWTtBQUN4QmdCLHFCQUFRYyxHQUFSLENBQVksZ0JBQVo7QUFDSCxVQUZEO0FBR0gsTTs7b0JBRURDLG9CLG1DQUFzQjtBQUNsQjtBQUNBLHlCQUFNQSxvQkFBTjtBQUNILE07O29CQUVEbUYsTSxxQkFBUztBQUNMLGdCQUNJO0FBQUE7QUFBQSxlQUFJLFNBQVMsS0FBS3hILEtBQUwsQ0FBVzJKLE9BQXhCO0FBQ0ksd0JBQVEsS0FBSzNKLEtBQUwsQ0FBV3NKLFNBQVgsR0FBdUJkLE9BQU9jLFNBQTlCLEdBQTBDZCxPQUFPaUIsV0FEN0Q7QUFFTSxrQkFBS3pKLEtBQUwsQ0FBV2tHO0FBRmpCLFVBREo7QUFNSCxNOzs7OzttQkF2QmdCd0QsSTs7QUF5QnJCQSxNQUFLL0IsWUFBTCxHQUFvQjtBQUNoQmdDLGNBQVMsbUJBQVUsQ0FBRSxDQURMO0FBRWhCekQsV0FBTSxFQUZVO0FBR2hCb0QsZ0JBQVc7QUFISyxFQUFwQjtBQUtBSSxNQUFLOUIsU0FBTCxHQUFpQjtBQUNiK0IsY0FBUyxpQkFBVTlCLElBQVYsQ0FBZVUsVUFEWDtBQUVickMsV0FBTSxpQkFBVTZCLE1BQVYsQ0FBaUJRLFVBRlY7QUFHYmUsZ0JBQVcsaUJBQVVNLElBQVYsQ0FBZXJCO0FBSGIsRUFBakIsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzVDQTs7OztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0tBRXFCc0IsUTs7O0FBQ2pCLHVCQUFZN0osS0FBWixFQUFtQkMsT0FBbkIsRUFBNEI7QUFBQTtBQUFBLCtEQUN4QixpQkFBTUQsS0FBTixFQUFhQyxPQUFiLENBRHdCO0FBRTNCOzt3QkFFRHVILE0scUJBQVM7QUFBQTs7QUFDTCxnQkFDSTtBQUFBO0FBQUE7QUFDTSxrQkFBS3hILEtBQUwsQ0FBVzhKLEtBQVgsQ0FBaUJDLEdBQWpCLENBQXFCLFVBQUNDLElBQUQsRUFBTy9JLEtBQVA7QUFBQSx3QkFDbkIsZ0RBQU0sTUFBTytJLEtBQUtDLEdBQUwsQ0FBUyxNQUFULENBQWI7QUFDSSxnQ0FBWUQsS0FBS0MsR0FBTCxDQUFTLFdBQVQsQ0FEaEI7QUFFSSwwQkFBS2hKLEtBRlQ7QUFHSSw4QkFBUztBQUFBLGdDQUFNLE9BQUtqQixLQUFMLENBQVdrSyxXQUFYLENBQXVCakosS0FBdkIsQ0FBTjtBQUFBLHNCQUhiLEdBRG1CO0FBQUEsY0FBckI7QUFETixVQURKO0FBVUgsTTs7Ozs7bUJBaEJnQjRJLFE7OztBQW1CckJBLFVBQVNqQyxTQUFULEdBQXFCO0FBQ2pCc0Msa0JBQWEsaUJBQVVyQyxJQUFWLENBQWVVLFVBRFg7QUFFakJ1QixZQUFPLGtDQUFtQkssTUFBbkIsQ0FBMEIsa0NBQW1CQyxRQUFuQixDQUE0QjtBQUN6RGxFLGVBQU0saUJBQVU2QixNQUFWLENBQWlCUSxVQURrQztBQUV6RGUsb0JBQVcsaUJBQVVNLElBQVYsQ0FBZXJCO0FBRitCLE1BQTVCLENBQTFCO0FBRlUsRUFBckIsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN6QkE7Ozs7QUFDQTs7QUFDQTs7QUFDQTs7OztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7S0FFTThCLEk7OztBQUNGLG1CQUFZckssS0FBWixFQUFtQkMsT0FBbkIsRUFBNEI7QUFBQTtBQUFBLCtEQUN4QixpQkFBTUQsS0FBTixFQUFhQyxPQUFiLENBRHdCO0FBRTNCOztvQkFFRGtJLGlCLGdDQUFtQjtBQUNmN0csaUJBQVFjLEdBQVIsQ0FBWSxLQUFLbkMsT0FBTCxDQUFhcUssVUFBYixDQUF3QkMsSUFBcEM7O0FBRUEsY0FBSzFKLElBQUwsQ0FBVSxNQUFWO0FBQ0gsTTs7b0JBRUQyRyxNLHFCQUFTO0FBQ0w7QUFESyxzQkFFZ0QsS0FBS3hILEtBRnJEO0FBQUEsYUFFR3dLLFFBRkgsVUFFR0EsUUFGSDtBQUFBLGFBRWFDLFlBRmIsVUFFYUEsWUFGYjtBQUFBLGFBRTJCQyxnQkFGM0IsVUFFMkJBLGdCQUYzQjs7QUFHTCxnQkFDSTtBQUFBO0FBQUE7QUFDSTtBQUNJLDZCQUFZO0FBQUEsNEJBQ1JGLFNBQVMsMkJBQVF0RSxJQUFSLENBQVQsQ0FEUTtBQUFBLGtCQURoQixHQURKO0FBS0k7QUFDSSx3QkFBT3VFLFlBRFg7QUFFSSw4QkFBYTtBQUFBLDRCQUNURCxTQUFTLGdDQUFhdkosS0FBYixDQUFULENBRFM7QUFBQSxrQkFGakIsR0FMSjtBQVVJO0FBQ0kseUJBQVF5SixnQkFEWjtBQUVJLGlDQUFnQjtBQUFBLDRCQUNaRixTQUFTLHVDQUFvQkcsVUFBcEIsQ0FBVCxDQURZO0FBQUEsa0JBRnBCLEdBVko7QUFlSTtBQUFBO0FBQUEsbUJBQU0sb0JBQW1CLEdBQXpCO0FBQ0k7QUFBQTtBQUFBLHVCQUFVLE9BQU0sR0FBaEI7QUFBQTtBQUFBLGtCQURKO0FBSUk7QUFBQTtBQUFBLHVCQUFVLE9BQU0sR0FBaEI7QUFBQTtBQUFBLGtCQUpKO0FBT0k7QUFBQTtBQUFBLHVCQUFVLE9BQUksR0FBZDtBQUFBO0FBQUEsa0JBUEo7QUFVSTtBQUFBO0FBQUEsdUJBQVUsT0FBSSxHQUFkO0FBQUE7QUFBQTtBQVZKO0FBZkosVUFESjtBQWdDSCxNOzs7OztBQUdMTixNQUFLekMsU0FBTCxHQUFpQjtBQUNiNkMsbUJBQWMsaUJBQVVqSSxVQUFWLGtCQUEyQitGLFVBRDVCO0FBRWJtQyx1QkFBa0IsaUJBQVVyQixLQUFWLENBQWdCLENBQzlCLFVBRDhCLEVBRTlCLGdCQUY4QixFQUc5QixhQUg4QixDQUFoQixFQUlmZDtBQU5VLEVBQWpCO0FBUUE4QixNQUFLOUgsWUFBTCxHQUFvQjtBQUNoQitILGlCQUFZLGlCQUFVeEMsTUFETjtBQUVoQm5ILGdCQUFXLGlCQUFVbUg7QUFGTCxFQUFwQjs7QUFLQSxVQUFTOEMsV0FBVCxDQUFxQmQsS0FBckIsRUFBNEJ0SyxNQUE1QixFQUFvQztBQUNoQyxhQUFRQSxNQUFSO0FBQ0ksY0FBSyxnQ0FBa0J1RyxRQUF2QjtBQUNJLG9CQUFPK0QsS0FBUDtBQUNKLGNBQUssZ0NBQWtCOUQsY0FBdkI7QUFDSSxvQkFBTzhELE1BQU10SyxNQUFOLENBQWE7QUFBQSx3QkFBUXdLLEtBQUtDLEdBQUwsQ0FBUyxXQUFULENBQVI7QUFBQSxjQUFiLENBQVA7QUFDSixjQUFLLGdDQUFrQmhFLFdBQXZCO0FBQ0ksb0JBQU82RCxNQUFNdEssTUFBTixDQUFhO0FBQUEsd0JBQVEsQ0FBQ3dLLEtBQUtDLEdBQUwsQ0FBUyxXQUFULENBQVQ7QUFBQSxjQUFiLENBQVA7QUFOUjtBQVFIOztBQUVEO0FBQ0E7QUFDQSxVQUFTWSxNQUFULENBQWdCN0ksS0FBaEIsRUFBdUI7QUFDbkIsWUFBTztBQUNIeUksdUJBQWNHLFlBQVk1SSxNQUFNaUksR0FBTixDQUFVLE9BQVYsQ0FBWixFQUFnQ2pJLE1BQU1pSSxHQUFOLENBQVUsa0JBQVYsQ0FBaEMsQ0FEWDtBQUVIUywyQkFBa0IxSSxNQUFNaUksR0FBTixDQUFVLGtCQUFWO0FBRmYsTUFBUDtBQUlIOztBQUVEO21CQUNlLHlCQUFRWSxNQUFSLEVBQWdCUixJQUFoQixDOzs7Ozs7Ozs7Ozs7O0FDNUZmOztBQUNBOztBQUNBOztLQUNRdEUsUSxtQ0FBQUEsUSxFQUpSOztBQU1BLFVBQVMyRSxnQkFBVCxHQUFvRDtBQUFBLFNBQTFCMUksS0FBMEIsdUVBQWxCK0QsUUFBa0I7QUFBQSxTQUFSK0UsTUFBUTs7QUFDaEQsYUFBUUEsT0FBTzNFLElBQWY7QUFDSTtBQUNJLG9CQUFPMkUsT0FBT3RMLE1BQWQ7QUFDSjtBQUNJLG9CQUFPd0MsS0FBUDtBQUpSO0FBTUg7O0FBRUQsVUFBUzhILEtBQVQsR0FBMkM7QUFBQSxTQUE1QjlILEtBQTRCLHVFQUFwQixxQkFBb0I7QUFBQSxTQUFSOEksTUFBUTs7QUFDdkMsYUFBUUEsT0FBTzNFLElBQWY7QUFDSTtBQUNJLG9CQUFPbkUsTUFBTXRCLElBQU4sQ0FBVyxtQkFBUTtBQUNsQndGLHVCQUFNNEUsT0FBTzVFLElBREs7QUFFbEJvRCw0QkFBVztBQUZPLGNBQVIsQ0FBWCxDQUFQO0FBSUo7QUFDSSxvQkFBT3RILE1BQU0rSSxNQUFOLENBQWFELE9BQU83SixLQUFwQixFQUEyQixVQUFTK0osSUFBVCxFQUFjO0FBQzVDLHdCQUFPQSxLQUFLQyxHQUFMLENBQVMsV0FBVCxFQUFzQixJQUF0QixDQUFQO0FBQ0gsY0FGTSxDQUFQO0FBR0o7QUFDSSxvQkFBT2pKLEtBQVA7QUFYUjtBQWFIOztBQUVELEtBQU1rSixVQUFVLHVDQUFnQjtBQUM1QlIsdUNBRDRCO0FBRTVCWjtBQUY0QixFQUFoQixDQUFoQjs7bUJBS2VvQixPOzs7Ozs7Ozs7O0FDcENmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLGlCQUFnQjs7QUFFaEI7QUFDQTs7QUFFQSxrQkFBaUIsc0JBQXNCO0FBQ3ZDO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLEtBQUk7QUFDSjtBQUNBLEtBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNILEdBQUU7QUFDRjtBQUNBO0FBQ0EsRUFBQyIsImZpbGUiOiIvanMvZGVidWcvaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHR2YXIgcGFyZW50SG90VXBkYXRlQ2FsbGJhY2sgPSB0aGlzW1wid2VicGFja0hvdFVwZGF0ZVwiXTtcbiBcdHRoaXNbXCJ3ZWJwYWNrSG90VXBkYXRlXCJdID0gXHJcbiBcdGZ1bmN0aW9uIHdlYnBhY2tIb3RVcGRhdGVDYWxsYmFjayhjaHVua0lkLCBtb3JlTW9kdWxlcykgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXHJcbiBcdFx0aG90QWRkVXBkYXRlQ2h1bmsoY2h1bmtJZCwgbW9yZU1vZHVsZXMpO1xyXG4gXHRcdGlmKHBhcmVudEhvdFVwZGF0ZUNhbGxiYWNrKSBwYXJlbnRIb3RVcGRhdGVDYWxsYmFjayhjaHVua0lkLCBtb3JlTW9kdWxlcyk7XHJcbiBcdH1cclxuIFx0XHJcbiBcdGZ1bmN0aW9uIGhvdERvd25sb2FkVXBkYXRlQ2h1bmsoY2h1bmtJZCkgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXHJcbiBcdFx0dmFyIGhlYWQgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImhlYWRcIilbMF07XHJcbiBcdFx0dmFyIHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzY3JpcHRcIik7XHJcbiBcdFx0c2NyaXB0LnR5cGUgPSBcInRleHQvamF2YXNjcmlwdFwiO1xyXG4gXHRcdHNjcmlwdC5jaGFyc2V0ID0gXCJ1dGYtOFwiO1xyXG4gXHRcdHNjcmlwdC5zcmMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLnAgKyBcIlwiICsgY2h1bmtJZCArIFwiLlwiICsgaG90Q3VycmVudEhhc2ggKyBcIi5ob3QtdXBkYXRlLmpzXCI7XHJcbiBcdFx0aGVhZC5hcHBlbmRDaGlsZChzY3JpcHQpO1xyXG4gXHR9XHJcbiBcdFxyXG4gXHRmdW5jdGlvbiBob3REb3dubG9hZE1hbmlmZXN0KGNhbGxiYWNrKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcclxuIFx0XHRpZih0eXBlb2YgWE1MSHR0cFJlcXVlc3QgPT09IFwidW5kZWZpbmVkXCIpXHJcbiBcdFx0XHRyZXR1cm4gY2FsbGJhY2sobmV3IEVycm9yKFwiTm8gYnJvd3NlciBzdXBwb3J0XCIpKTtcclxuIFx0XHR0cnkge1xyXG4gXHRcdFx0dmFyIHJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuIFx0XHRcdHZhciByZXF1ZXN0UGF0aCA9IF9fd2VicGFja19yZXF1aXJlX18ucCArIFwiXCIgKyBob3RDdXJyZW50SGFzaCArIFwiLmhvdC11cGRhdGUuanNvblwiO1xyXG4gXHRcdFx0cmVxdWVzdC5vcGVuKFwiR0VUXCIsIHJlcXVlc3RQYXRoLCB0cnVlKTtcclxuIFx0XHRcdHJlcXVlc3QudGltZW91dCA9IDEwMDAwO1xyXG4gXHRcdFx0cmVxdWVzdC5zZW5kKG51bGwpO1xyXG4gXHRcdH0gY2F0Y2goZXJyKSB7XHJcbiBcdFx0XHRyZXR1cm4gY2FsbGJhY2soZXJyKTtcclxuIFx0XHR9XHJcbiBcdFx0cmVxdWVzdC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpIHtcclxuIFx0XHRcdGlmKHJlcXVlc3QucmVhZHlTdGF0ZSAhPT0gNCkgcmV0dXJuO1xyXG4gXHRcdFx0aWYocmVxdWVzdC5zdGF0dXMgPT09IDApIHtcclxuIFx0XHRcdFx0Ly8gdGltZW91dFxyXG4gXHRcdFx0XHRjYWxsYmFjayhuZXcgRXJyb3IoXCJNYW5pZmVzdCByZXF1ZXN0IHRvIFwiICsgcmVxdWVzdFBhdGggKyBcIiB0aW1lZCBvdXQuXCIpKTtcclxuIFx0XHRcdH0gZWxzZSBpZihyZXF1ZXN0LnN0YXR1cyA9PT0gNDA0KSB7XHJcbiBcdFx0XHRcdC8vIG5vIHVwZGF0ZSBhdmFpbGFibGVcclxuIFx0XHRcdFx0Y2FsbGJhY2soKTtcclxuIFx0XHRcdH0gZWxzZSBpZihyZXF1ZXN0LnN0YXR1cyAhPT0gMjAwICYmIHJlcXVlc3Quc3RhdHVzICE9PSAzMDQpIHtcclxuIFx0XHRcdFx0Ly8gb3RoZXIgZmFpbHVyZVxyXG4gXHRcdFx0XHRjYWxsYmFjayhuZXcgRXJyb3IoXCJNYW5pZmVzdCByZXF1ZXN0IHRvIFwiICsgcmVxdWVzdFBhdGggKyBcIiBmYWlsZWQuXCIpKTtcclxuIFx0XHRcdH0gZWxzZSB7XHJcbiBcdFx0XHRcdC8vIHN1Y2Nlc3NcclxuIFx0XHRcdFx0dHJ5IHtcclxuIFx0XHRcdFx0XHR2YXIgdXBkYXRlID0gSlNPTi5wYXJzZShyZXF1ZXN0LnJlc3BvbnNlVGV4dCk7XHJcbiBcdFx0XHRcdH0gY2F0Y2goZSkge1xyXG4gXHRcdFx0XHRcdGNhbGxiYWNrKGUpO1xyXG4gXHRcdFx0XHRcdHJldHVybjtcclxuIFx0XHRcdFx0fVxyXG4gXHRcdFx0XHRjYWxsYmFjayhudWxsLCB1cGRhdGUpO1xyXG4gXHRcdFx0fVxyXG4gXHRcdH07XHJcbiBcdH1cclxuXG4gXHRcclxuIFx0XHJcbiBcdC8vIENvcGllZCBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9mYWNlYm9vay9yZWFjdC9ibG9iL2JlZjQ1YjAvc3JjL3NoYXJlZC91dGlscy9jYW5EZWZpbmVQcm9wZXJ0eS5qc1xyXG4gXHR2YXIgY2FuRGVmaW5lUHJvcGVydHkgPSBmYWxzZTtcclxuIFx0dHJ5IHtcclxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoe30sIFwieFwiLCB7XHJcbiBcdFx0XHRnZXQ6IGZ1bmN0aW9uKCkge31cclxuIFx0XHR9KTtcclxuIFx0XHRjYW5EZWZpbmVQcm9wZXJ0eSA9IHRydWU7XHJcbiBcdH0gY2F0Y2goeCkge1xyXG4gXHRcdC8vIElFIHdpbGwgZmFpbCBvbiBkZWZpbmVQcm9wZXJ0eVxyXG4gXHR9XHJcbiBcdFxyXG4gXHR2YXIgaG90QXBwbHlPblVwZGF0ZSA9IHRydWU7XHJcbiBcdHZhciBob3RDdXJyZW50SGFzaCA9IFwiNTM5ODNlZWY0MzNmNjY5OTgzNjVcIjsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xyXG4gXHR2YXIgaG90Q3VycmVudE1vZHVsZURhdGEgPSB7fTtcclxuIFx0dmFyIGhvdEN1cnJlbnRQYXJlbnRzID0gW107IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcclxuIFx0XHJcbiBcdGZ1bmN0aW9uIGhvdENyZWF0ZVJlcXVpcmUobW9kdWxlSWQpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xyXG4gXHRcdHZhciBtZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xyXG4gXHRcdGlmKCFtZSkgcmV0dXJuIF9fd2VicGFja19yZXF1aXJlX187XHJcbiBcdFx0dmFyIGZuID0gZnVuY3Rpb24ocmVxdWVzdCkge1xyXG4gXHRcdFx0aWYobWUuaG90LmFjdGl2ZSkge1xyXG4gXHRcdFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW3JlcXVlc3RdKSB7XHJcbiBcdFx0XHRcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1tyZXF1ZXN0XS5wYXJlbnRzLmluZGV4T2YobW9kdWxlSWQpIDwgMClcclxuIFx0XHRcdFx0XHRcdGluc3RhbGxlZE1vZHVsZXNbcmVxdWVzdF0ucGFyZW50cy5wdXNoKG1vZHVsZUlkKTtcclxuIFx0XHRcdFx0XHRpZihtZS5jaGlsZHJlbi5pbmRleE9mKHJlcXVlc3QpIDwgMClcclxuIFx0XHRcdFx0XHRcdG1lLmNoaWxkcmVuLnB1c2gocmVxdWVzdCk7XHJcbiBcdFx0XHRcdH0gZWxzZSBob3RDdXJyZW50UGFyZW50cyA9IFttb2R1bGVJZF07XHJcbiBcdFx0XHR9IGVsc2Uge1xyXG4gXHRcdFx0XHRjb25zb2xlLndhcm4oXCJbSE1SXSB1bmV4cGVjdGVkIHJlcXVpcmUoXCIgKyByZXF1ZXN0ICsgXCIpIGZyb20gZGlzcG9zZWQgbW9kdWxlIFwiICsgbW9kdWxlSWQpO1xyXG4gXHRcdFx0XHRob3RDdXJyZW50UGFyZW50cyA9IFtdO1xyXG4gXHRcdFx0fVxyXG4gXHRcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18ocmVxdWVzdCk7XHJcbiBcdFx0fTtcclxuIFx0XHRmb3IodmFyIG5hbWUgaW4gX193ZWJwYWNrX3JlcXVpcmVfXykge1xyXG4gXHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKF9fd2VicGFja19yZXF1aXJlX18sIG5hbWUpKSB7XHJcbiBcdFx0XHRcdGlmKGNhbkRlZmluZVByb3BlcnR5KSB7XHJcbiBcdFx0XHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGZuLCBuYW1lLCAoZnVuY3Rpb24obmFtZSkge1xyXG4gXHRcdFx0XHRcdFx0cmV0dXJuIHtcclxuIFx0XHRcdFx0XHRcdFx0Y29uZmlndXJhYmxlOiB0cnVlLFxyXG4gXHRcdFx0XHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxyXG4gXHRcdFx0XHRcdFx0XHRnZXQ6IGZ1bmN0aW9uKCkge1xyXG4gXHRcdFx0XHRcdFx0XHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fW25hbWVdO1xyXG4gXHRcdFx0XHRcdFx0XHR9LFxyXG4gXHRcdFx0XHRcdFx0XHRzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XHJcbiBcdFx0XHRcdFx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfX1tuYW1lXSA9IHZhbHVlO1xyXG4gXHRcdFx0XHRcdFx0XHR9XHJcbiBcdFx0XHRcdFx0XHR9O1xyXG4gXHRcdFx0XHRcdH0obmFtZSkpKTtcclxuIFx0XHRcdFx0fSBlbHNlIHtcclxuIFx0XHRcdFx0XHRmbltuYW1lXSA9IF9fd2VicGFja19yZXF1aXJlX19bbmFtZV07XHJcbiBcdFx0XHRcdH1cclxuIFx0XHRcdH1cclxuIFx0XHR9XHJcbiBcdFxyXG4gXHRcdGZ1bmN0aW9uIGVuc3VyZShjaHVua0lkLCBjYWxsYmFjaykge1xyXG4gXHRcdFx0aWYoaG90U3RhdHVzID09PSBcInJlYWR5XCIpXHJcbiBcdFx0XHRcdGhvdFNldFN0YXR1cyhcInByZXBhcmVcIik7XHJcbiBcdFx0XHRob3RDaHVua3NMb2FkaW5nKys7XHJcbiBcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmUoY2h1bmtJZCwgZnVuY3Rpb24oKSB7XHJcbiBcdFx0XHRcdHRyeSB7XHJcbiBcdFx0XHRcdFx0Y2FsbGJhY2suY2FsbChudWxsLCBmbik7XHJcbiBcdFx0XHRcdH0gZmluYWxseSB7XHJcbiBcdFx0XHRcdFx0ZmluaXNoQ2h1bmtMb2FkaW5nKCk7XHJcbiBcdFx0XHRcdH1cclxuIFx0XHJcbiBcdFx0XHRcdGZ1bmN0aW9uIGZpbmlzaENodW5rTG9hZGluZygpIHtcclxuIFx0XHRcdFx0XHRob3RDaHVua3NMb2FkaW5nLS07XHJcbiBcdFx0XHRcdFx0aWYoaG90U3RhdHVzID09PSBcInByZXBhcmVcIikge1xyXG4gXHRcdFx0XHRcdFx0aWYoIWhvdFdhaXRpbmdGaWxlc01hcFtjaHVua0lkXSkge1xyXG4gXHRcdFx0XHRcdFx0XHRob3RFbnN1cmVVcGRhdGVDaHVuayhjaHVua0lkKTtcclxuIFx0XHRcdFx0XHRcdH1cclxuIFx0XHRcdFx0XHRcdGlmKGhvdENodW5rc0xvYWRpbmcgPT09IDAgJiYgaG90V2FpdGluZ0ZpbGVzID09PSAwKSB7XHJcbiBcdFx0XHRcdFx0XHRcdGhvdFVwZGF0ZURvd25sb2FkZWQoKTtcclxuIFx0XHRcdFx0XHRcdH1cclxuIFx0XHRcdFx0XHR9XHJcbiBcdFx0XHRcdH1cclxuIFx0XHRcdH0pO1xyXG4gXHRcdH1cclxuIFx0XHRpZihjYW5EZWZpbmVQcm9wZXJ0eSkge1xyXG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGZuLCBcImVcIiwge1xyXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxyXG4gXHRcdFx0XHR2YWx1ZTogZW5zdXJlXHJcbiBcdFx0XHR9KTtcclxuIFx0XHR9IGVsc2Uge1xyXG4gXHRcdFx0Zm4uZSA9IGVuc3VyZTtcclxuIFx0XHR9XHJcbiBcdFx0cmV0dXJuIGZuO1xyXG4gXHR9XHJcbiBcdFxyXG4gXHRmdW5jdGlvbiBob3RDcmVhdGVNb2R1bGUobW9kdWxlSWQpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xyXG4gXHRcdHZhciBob3QgPSB7XHJcbiBcdFx0XHQvLyBwcml2YXRlIHN0dWZmXHJcbiBcdFx0XHRfYWNjZXB0ZWREZXBlbmRlbmNpZXM6IHt9LFxyXG4gXHRcdFx0X2RlY2xpbmVkRGVwZW5kZW5jaWVzOiB7fSxcclxuIFx0XHRcdF9zZWxmQWNjZXB0ZWQ6IGZhbHNlLFxyXG4gXHRcdFx0X3NlbGZEZWNsaW5lZDogZmFsc2UsXHJcbiBcdFx0XHRfZGlzcG9zZUhhbmRsZXJzOiBbXSxcclxuIFx0XHJcbiBcdFx0XHQvLyBNb2R1bGUgQVBJXHJcbiBcdFx0XHRhY3RpdmU6IHRydWUsXHJcbiBcdFx0XHRhY2NlcHQ6IGZ1bmN0aW9uKGRlcCwgY2FsbGJhY2spIHtcclxuIFx0XHRcdFx0aWYodHlwZW9mIGRlcCA9PT0gXCJ1bmRlZmluZWRcIilcclxuIFx0XHRcdFx0XHRob3QuX3NlbGZBY2NlcHRlZCA9IHRydWU7XHJcbiBcdFx0XHRcdGVsc2UgaWYodHlwZW9mIGRlcCA9PT0gXCJmdW5jdGlvblwiKVxyXG4gXHRcdFx0XHRcdGhvdC5fc2VsZkFjY2VwdGVkID0gZGVwO1xyXG4gXHRcdFx0XHRlbHNlIGlmKHR5cGVvZiBkZXAgPT09IFwib2JqZWN0XCIpXHJcbiBcdFx0XHRcdFx0Zm9yKHZhciBpID0gMDsgaSA8IGRlcC5sZW5ndGg7IGkrKylcclxuIFx0XHRcdFx0XHRcdGhvdC5fYWNjZXB0ZWREZXBlbmRlbmNpZXNbZGVwW2ldXSA9IGNhbGxiYWNrO1xyXG4gXHRcdFx0XHRlbHNlXHJcbiBcdFx0XHRcdFx0aG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1tkZXBdID0gY2FsbGJhY2s7XHJcbiBcdFx0XHR9LFxyXG4gXHRcdFx0ZGVjbGluZTogZnVuY3Rpb24oZGVwKSB7XHJcbiBcdFx0XHRcdGlmKHR5cGVvZiBkZXAgPT09IFwidW5kZWZpbmVkXCIpXHJcbiBcdFx0XHRcdFx0aG90Ll9zZWxmRGVjbGluZWQgPSB0cnVlO1xyXG4gXHRcdFx0XHRlbHNlIGlmKHR5cGVvZiBkZXAgPT09IFwibnVtYmVyXCIpXHJcbiBcdFx0XHRcdFx0aG90Ll9kZWNsaW5lZERlcGVuZGVuY2llc1tkZXBdID0gdHJ1ZTtcclxuIFx0XHRcdFx0ZWxzZVxyXG4gXHRcdFx0XHRcdGZvcih2YXIgaSA9IDA7IGkgPCBkZXAubGVuZ3RoOyBpKyspXHJcbiBcdFx0XHRcdFx0XHRob3QuX2RlY2xpbmVkRGVwZW5kZW5jaWVzW2RlcFtpXV0gPSB0cnVlO1xyXG4gXHRcdFx0fSxcclxuIFx0XHRcdGRpc3Bvc2U6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XHJcbiBcdFx0XHRcdGhvdC5fZGlzcG9zZUhhbmRsZXJzLnB1c2goY2FsbGJhY2spO1xyXG4gXHRcdFx0fSxcclxuIFx0XHRcdGFkZERpc3Bvc2VIYW5kbGVyOiBmdW5jdGlvbihjYWxsYmFjaykge1xyXG4gXHRcdFx0XHRob3QuX2Rpc3Bvc2VIYW5kbGVycy5wdXNoKGNhbGxiYWNrKTtcclxuIFx0XHRcdH0sXHJcbiBcdFx0XHRyZW1vdmVEaXNwb3NlSGFuZGxlcjogZnVuY3Rpb24oY2FsbGJhY2spIHtcclxuIFx0XHRcdFx0dmFyIGlkeCA9IGhvdC5fZGlzcG9zZUhhbmRsZXJzLmluZGV4T2YoY2FsbGJhY2spO1xyXG4gXHRcdFx0XHRpZihpZHggPj0gMCkgaG90Ll9kaXNwb3NlSGFuZGxlcnMuc3BsaWNlKGlkeCwgMSk7XHJcbiBcdFx0XHR9LFxyXG4gXHRcclxuIFx0XHRcdC8vIE1hbmFnZW1lbnQgQVBJXHJcbiBcdFx0XHRjaGVjazogaG90Q2hlY2ssXHJcbiBcdFx0XHRhcHBseTogaG90QXBwbHksXHJcbiBcdFx0XHRzdGF0dXM6IGZ1bmN0aW9uKGwpIHtcclxuIFx0XHRcdFx0aWYoIWwpIHJldHVybiBob3RTdGF0dXM7XHJcbiBcdFx0XHRcdGhvdFN0YXR1c0hhbmRsZXJzLnB1c2gobCk7XHJcbiBcdFx0XHR9LFxyXG4gXHRcdFx0YWRkU3RhdHVzSGFuZGxlcjogZnVuY3Rpb24obCkge1xyXG4gXHRcdFx0XHRob3RTdGF0dXNIYW5kbGVycy5wdXNoKGwpO1xyXG4gXHRcdFx0fSxcclxuIFx0XHRcdHJlbW92ZVN0YXR1c0hhbmRsZXI6IGZ1bmN0aW9uKGwpIHtcclxuIFx0XHRcdFx0dmFyIGlkeCA9IGhvdFN0YXR1c0hhbmRsZXJzLmluZGV4T2YobCk7XHJcbiBcdFx0XHRcdGlmKGlkeCA+PSAwKSBob3RTdGF0dXNIYW5kbGVycy5zcGxpY2UoaWR4LCAxKTtcclxuIFx0XHRcdH0sXHJcbiBcdFxyXG4gXHRcdFx0Ly9pbmhlcml0IGZyb20gcHJldmlvdXMgZGlzcG9zZSBjYWxsXHJcbiBcdFx0XHRkYXRhOiBob3RDdXJyZW50TW9kdWxlRGF0YVttb2R1bGVJZF1cclxuIFx0XHR9O1xyXG4gXHRcdHJldHVybiBob3Q7XHJcbiBcdH1cclxuIFx0XHJcbiBcdHZhciBob3RTdGF0dXNIYW5kbGVycyA9IFtdO1xyXG4gXHR2YXIgaG90U3RhdHVzID0gXCJpZGxlXCI7XHJcbiBcdFxyXG4gXHRmdW5jdGlvbiBob3RTZXRTdGF0dXMobmV3U3RhdHVzKSB7XHJcbiBcdFx0aG90U3RhdHVzID0gbmV3U3RhdHVzO1xyXG4gXHRcdGZvcih2YXIgaSA9IDA7IGkgPCBob3RTdGF0dXNIYW5kbGVycy5sZW5ndGg7IGkrKylcclxuIFx0XHRcdGhvdFN0YXR1c0hhbmRsZXJzW2ldLmNhbGwobnVsbCwgbmV3U3RhdHVzKTtcclxuIFx0fVxyXG4gXHRcclxuIFx0Ly8gd2hpbGUgZG93bmxvYWRpbmdcclxuIFx0dmFyIGhvdFdhaXRpbmdGaWxlcyA9IDA7XHJcbiBcdHZhciBob3RDaHVua3NMb2FkaW5nID0gMDtcclxuIFx0dmFyIGhvdFdhaXRpbmdGaWxlc01hcCA9IHt9O1xyXG4gXHR2YXIgaG90UmVxdWVzdGVkRmlsZXNNYXAgPSB7fTtcclxuIFx0dmFyIGhvdEF2YWlsaWJsZUZpbGVzTWFwID0ge307XHJcbiBcdHZhciBob3RDYWxsYmFjaztcclxuIFx0XHJcbiBcdC8vIFRoZSB1cGRhdGUgaW5mb1xyXG4gXHR2YXIgaG90VXBkYXRlLCBob3RVcGRhdGVOZXdIYXNoO1xyXG4gXHRcclxuIFx0ZnVuY3Rpb24gdG9Nb2R1bGVJZChpZCkge1xyXG4gXHRcdHZhciBpc051bWJlciA9ICgraWQpICsgXCJcIiA9PT0gaWQ7XHJcbiBcdFx0cmV0dXJuIGlzTnVtYmVyID8gK2lkIDogaWQ7XHJcbiBcdH1cclxuIFx0XHJcbiBcdGZ1bmN0aW9uIGhvdENoZWNrKGFwcGx5LCBjYWxsYmFjaykge1xyXG4gXHRcdGlmKGhvdFN0YXR1cyAhPT0gXCJpZGxlXCIpIHRocm93IG5ldyBFcnJvcihcImNoZWNrKCkgaXMgb25seSBhbGxvd2VkIGluIGlkbGUgc3RhdHVzXCIpO1xyXG4gXHRcdGlmKHR5cGVvZiBhcHBseSA9PT0gXCJmdW5jdGlvblwiKSB7XHJcbiBcdFx0XHRob3RBcHBseU9uVXBkYXRlID0gZmFsc2U7XHJcbiBcdFx0XHRjYWxsYmFjayA9IGFwcGx5O1xyXG4gXHRcdH0gZWxzZSB7XHJcbiBcdFx0XHRob3RBcHBseU9uVXBkYXRlID0gYXBwbHk7XHJcbiBcdFx0XHRjYWxsYmFjayA9IGNhbGxiYWNrIHx8IGZ1bmN0aW9uKGVycikge1xyXG4gXHRcdFx0XHRpZihlcnIpIHRocm93IGVycjtcclxuIFx0XHRcdH07XHJcbiBcdFx0fVxyXG4gXHRcdGhvdFNldFN0YXR1cyhcImNoZWNrXCIpO1xyXG4gXHRcdGhvdERvd25sb2FkTWFuaWZlc3QoZnVuY3Rpb24oZXJyLCB1cGRhdGUpIHtcclxuIFx0XHRcdGlmKGVycikgcmV0dXJuIGNhbGxiYWNrKGVycik7XHJcbiBcdFx0XHRpZighdXBkYXRlKSB7XHJcbiBcdFx0XHRcdGhvdFNldFN0YXR1cyhcImlkbGVcIik7XHJcbiBcdFx0XHRcdGNhbGxiYWNrKG51bGwsIG51bGwpO1xyXG4gXHRcdFx0XHRyZXR1cm47XHJcbiBcdFx0XHR9XHJcbiBcdFxyXG4gXHRcdFx0aG90UmVxdWVzdGVkRmlsZXNNYXAgPSB7fTtcclxuIFx0XHRcdGhvdEF2YWlsaWJsZUZpbGVzTWFwID0ge307XHJcbiBcdFx0XHRob3RXYWl0aW5nRmlsZXNNYXAgPSB7fTtcclxuIFx0XHRcdGZvcih2YXIgaSA9IDA7IGkgPCB1cGRhdGUuYy5sZW5ndGg7IGkrKylcclxuIFx0XHRcdFx0aG90QXZhaWxpYmxlRmlsZXNNYXBbdXBkYXRlLmNbaV1dID0gdHJ1ZTtcclxuIFx0XHRcdGhvdFVwZGF0ZU5ld0hhc2ggPSB1cGRhdGUuaDtcclxuIFx0XHJcbiBcdFx0XHRob3RTZXRTdGF0dXMoXCJwcmVwYXJlXCIpO1xyXG4gXHRcdFx0aG90Q2FsbGJhY2sgPSBjYWxsYmFjaztcclxuIFx0XHRcdGhvdFVwZGF0ZSA9IHt9O1xyXG4gXHRcdFx0dmFyIGNodW5rSWQgPSAxO1xyXG4gXHRcdFx0eyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWxvbmUtYmxvY2tzXHJcbiBcdFx0XHRcdC8qZ2xvYmFscyBjaHVua0lkICovXHJcbiBcdFx0XHRcdGhvdEVuc3VyZVVwZGF0ZUNodW5rKGNodW5rSWQpO1xyXG4gXHRcdFx0fVxyXG4gXHRcdFx0aWYoaG90U3RhdHVzID09PSBcInByZXBhcmVcIiAmJiBob3RDaHVua3NMb2FkaW5nID09PSAwICYmIGhvdFdhaXRpbmdGaWxlcyA9PT0gMCkge1xyXG4gXHRcdFx0XHRob3RVcGRhdGVEb3dubG9hZGVkKCk7XHJcbiBcdFx0XHR9XHJcbiBcdFx0fSk7XHJcbiBcdH1cclxuIFx0XHJcbiBcdGZ1bmN0aW9uIGhvdEFkZFVwZGF0ZUNodW5rKGNodW5rSWQsIG1vcmVNb2R1bGVzKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcclxuIFx0XHRpZighaG90QXZhaWxpYmxlRmlsZXNNYXBbY2h1bmtJZF0gfHwgIWhvdFJlcXVlc3RlZEZpbGVzTWFwW2NodW5rSWRdKVxyXG4gXHRcdFx0cmV0dXJuO1xyXG4gXHRcdGhvdFJlcXVlc3RlZEZpbGVzTWFwW2NodW5rSWRdID0gZmFsc2U7XHJcbiBcdFx0Zm9yKHZhciBtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xyXG4gXHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcclxuIFx0XHRcdFx0aG90VXBkYXRlW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcclxuIFx0XHRcdH1cclxuIFx0XHR9XHJcbiBcdFx0aWYoLS1ob3RXYWl0aW5nRmlsZXMgPT09IDAgJiYgaG90Q2h1bmtzTG9hZGluZyA9PT0gMCkge1xyXG4gXHRcdFx0aG90VXBkYXRlRG93bmxvYWRlZCgpO1xyXG4gXHRcdH1cclxuIFx0fVxyXG4gXHRcclxuIFx0ZnVuY3Rpb24gaG90RW5zdXJlVXBkYXRlQ2h1bmsoY2h1bmtJZCkge1xyXG4gXHRcdGlmKCFob3RBdmFpbGlibGVGaWxlc01hcFtjaHVua0lkXSkge1xyXG4gXHRcdFx0aG90V2FpdGluZ0ZpbGVzTWFwW2NodW5rSWRdID0gdHJ1ZTtcclxuIFx0XHR9IGVsc2Uge1xyXG4gXHRcdFx0aG90UmVxdWVzdGVkRmlsZXNNYXBbY2h1bmtJZF0gPSB0cnVlO1xyXG4gXHRcdFx0aG90V2FpdGluZ0ZpbGVzKys7XHJcbiBcdFx0XHRob3REb3dubG9hZFVwZGF0ZUNodW5rKGNodW5rSWQpO1xyXG4gXHRcdH1cclxuIFx0fVxyXG4gXHRcclxuIFx0ZnVuY3Rpb24gaG90VXBkYXRlRG93bmxvYWRlZCgpIHtcclxuIFx0XHRob3RTZXRTdGF0dXMoXCJyZWFkeVwiKTtcclxuIFx0XHR2YXIgY2FsbGJhY2sgPSBob3RDYWxsYmFjaztcclxuIFx0XHRob3RDYWxsYmFjayA9IG51bGw7XHJcbiBcdFx0aWYoIWNhbGxiYWNrKSByZXR1cm47XHJcbiBcdFx0aWYoaG90QXBwbHlPblVwZGF0ZSkge1xyXG4gXHRcdFx0aG90QXBwbHkoaG90QXBwbHlPblVwZGF0ZSwgY2FsbGJhY2spO1xyXG4gXHRcdH0gZWxzZSB7XHJcbiBcdFx0XHR2YXIgb3V0ZGF0ZWRNb2R1bGVzID0gW107XHJcbiBcdFx0XHRmb3IodmFyIGlkIGluIGhvdFVwZGF0ZSkge1xyXG4gXHRcdFx0XHRpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoaG90VXBkYXRlLCBpZCkpIHtcclxuIFx0XHRcdFx0XHRvdXRkYXRlZE1vZHVsZXMucHVzaCh0b01vZHVsZUlkKGlkKSk7XHJcbiBcdFx0XHRcdH1cclxuIFx0XHRcdH1cclxuIFx0XHRcdGNhbGxiYWNrKG51bGwsIG91dGRhdGVkTW9kdWxlcyk7XHJcbiBcdFx0fVxyXG4gXHR9XHJcbiBcdFxyXG4gXHRmdW5jdGlvbiBob3RBcHBseShvcHRpb25zLCBjYWxsYmFjaykge1xyXG4gXHRcdGlmKGhvdFN0YXR1cyAhPT0gXCJyZWFkeVwiKSB0aHJvdyBuZXcgRXJyb3IoXCJhcHBseSgpIGlzIG9ubHkgYWxsb3dlZCBpbiByZWFkeSBzdGF0dXNcIik7XHJcbiBcdFx0aWYodHlwZW9mIG9wdGlvbnMgPT09IFwiZnVuY3Rpb25cIikge1xyXG4gXHRcdFx0Y2FsbGJhY2sgPSBvcHRpb25zO1xyXG4gXHRcdFx0b3B0aW9ucyA9IHt9O1xyXG4gXHRcdH0gZWxzZSBpZihvcHRpb25zICYmIHR5cGVvZiBvcHRpb25zID09PSBcIm9iamVjdFwiKSB7XHJcbiBcdFx0XHRjYWxsYmFjayA9IGNhbGxiYWNrIHx8IGZ1bmN0aW9uKGVycikge1xyXG4gXHRcdFx0XHRpZihlcnIpIHRocm93IGVycjtcclxuIFx0XHRcdH07XHJcbiBcdFx0fSBlbHNlIHtcclxuIFx0XHRcdG9wdGlvbnMgPSB7fTtcclxuIFx0XHRcdGNhbGxiYWNrID0gY2FsbGJhY2sgfHwgZnVuY3Rpb24oZXJyKSB7XHJcbiBcdFx0XHRcdGlmKGVycikgdGhyb3cgZXJyO1xyXG4gXHRcdFx0fTtcclxuIFx0XHR9XHJcbiBcdFxyXG4gXHRcdGZ1bmN0aW9uIGdldEFmZmVjdGVkU3R1ZmYobW9kdWxlKSB7XHJcbiBcdFx0XHR2YXIgb3V0ZGF0ZWRNb2R1bGVzID0gW21vZHVsZV07XHJcbiBcdFx0XHR2YXIgb3V0ZGF0ZWREZXBlbmRlbmNpZXMgPSB7fTtcclxuIFx0XHJcbiBcdFx0XHR2YXIgcXVldWUgPSBvdXRkYXRlZE1vZHVsZXMuc2xpY2UoKTtcclxuIFx0XHRcdHdoaWxlKHF1ZXVlLmxlbmd0aCA+IDApIHtcclxuIFx0XHRcdFx0dmFyIG1vZHVsZUlkID0gcXVldWUucG9wKCk7XHJcbiBcdFx0XHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcclxuIFx0XHRcdFx0aWYoIW1vZHVsZSB8fCBtb2R1bGUuaG90Ll9zZWxmQWNjZXB0ZWQpXHJcbiBcdFx0XHRcdFx0Y29udGludWU7XHJcbiBcdFx0XHRcdGlmKG1vZHVsZS5ob3QuX3NlbGZEZWNsaW5lZCkge1xyXG4gXHRcdFx0XHRcdHJldHVybiBuZXcgRXJyb3IoXCJBYm9ydGVkIGJlY2F1c2Ugb2Ygc2VsZiBkZWNsaW5lOiBcIiArIG1vZHVsZUlkKTtcclxuIFx0XHRcdFx0fVxyXG4gXHRcdFx0XHRpZihtb2R1bGVJZCA9PT0gMCkge1xyXG4gXHRcdFx0XHRcdHJldHVybjtcclxuIFx0XHRcdFx0fVxyXG4gXHRcdFx0XHRmb3IodmFyIGkgPSAwOyBpIDwgbW9kdWxlLnBhcmVudHMubGVuZ3RoOyBpKyspIHtcclxuIFx0XHRcdFx0XHR2YXIgcGFyZW50SWQgPSBtb2R1bGUucGFyZW50c1tpXTtcclxuIFx0XHRcdFx0XHR2YXIgcGFyZW50ID0gaW5zdGFsbGVkTW9kdWxlc1twYXJlbnRJZF07XHJcbiBcdFx0XHRcdFx0aWYocGFyZW50LmhvdC5fZGVjbGluZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdKSB7XHJcbiBcdFx0XHRcdFx0XHRyZXR1cm4gbmV3IEVycm9yKFwiQWJvcnRlZCBiZWNhdXNlIG9mIGRlY2xpbmVkIGRlcGVuZGVuY3k6IFwiICsgbW9kdWxlSWQgKyBcIiBpbiBcIiArIHBhcmVudElkKTtcclxuIFx0XHRcdFx0XHR9XHJcbiBcdFx0XHRcdFx0aWYob3V0ZGF0ZWRNb2R1bGVzLmluZGV4T2YocGFyZW50SWQpID49IDApIGNvbnRpbnVlO1xyXG4gXHRcdFx0XHRcdGlmKHBhcmVudC5ob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSkge1xyXG4gXHRcdFx0XHRcdFx0aWYoIW91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXSlcclxuIFx0XHRcdFx0XHRcdFx0b3V0ZGF0ZWREZXBlbmRlbmNpZXNbcGFyZW50SWRdID0gW107XHJcbiBcdFx0XHRcdFx0XHRhZGRBbGxUb1NldChvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF0sIFttb2R1bGVJZF0pO1xyXG4gXHRcdFx0XHRcdFx0Y29udGludWU7XHJcbiBcdFx0XHRcdFx0fVxyXG4gXHRcdFx0XHRcdGRlbGV0ZSBvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF07XHJcbiBcdFx0XHRcdFx0b3V0ZGF0ZWRNb2R1bGVzLnB1c2gocGFyZW50SWQpO1xyXG4gXHRcdFx0XHRcdHF1ZXVlLnB1c2gocGFyZW50SWQpO1xyXG4gXHRcdFx0XHR9XHJcbiBcdFx0XHR9XHJcbiBcdFxyXG4gXHRcdFx0cmV0dXJuIFtvdXRkYXRlZE1vZHVsZXMsIG91dGRhdGVkRGVwZW5kZW5jaWVzXTtcclxuIFx0XHR9XHJcbiBcdFxyXG4gXHRcdGZ1bmN0aW9uIGFkZEFsbFRvU2V0KGEsIGIpIHtcclxuIFx0XHRcdGZvcih2YXIgaSA9IDA7IGkgPCBiLmxlbmd0aDsgaSsrKSB7XHJcbiBcdFx0XHRcdHZhciBpdGVtID0gYltpXTtcclxuIFx0XHRcdFx0aWYoYS5pbmRleE9mKGl0ZW0pIDwgMClcclxuIFx0XHRcdFx0XHRhLnB1c2goaXRlbSk7XHJcbiBcdFx0XHR9XHJcbiBcdFx0fVxyXG4gXHRcclxuIFx0XHQvLyBhdCBiZWdpbiBhbGwgdXBkYXRlcyBtb2R1bGVzIGFyZSBvdXRkYXRlZFxyXG4gXHRcdC8vIHRoZSBcIm91dGRhdGVkXCIgc3RhdHVzIGNhbiBwcm9wYWdhdGUgdG8gcGFyZW50cyBpZiB0aGV5IGRvbid0IGFjY2VwdCB0aGUgY2hpbGRyZW5cclxuIFx0XHR2YXIgb3V0ZGF0ZWREZXBlbmRlbmNpZXMgPSB7fTtcclxuIFx0XHR2YXIgb3V0ZGF0ZWRNb2R1bGVzID0gW107XHJcbiBcdFx0dmFyIGFwcGxpZWRVcGRhdGUgPSB7fTtcclxuIFx0XHRmb3IodmFyIGlkIGluIGhvdFVwZGF0ZSkge1xyXG4gXHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGhvdFVwZGF0ZSwgaWQpKSB7XHJcbiBcdFx0XHRcdHZhciBtb2R1bGVJZCA9IHRvTW9kdWxlSWQoaWQpO1xyXG4gXHRcdFx0XHR2YXIgcmVzdWx0ID0gZ2V0QWZmZWN0ZWRTdHVmZihtb2R1bGVJZCk7XHJcbiBcdFx0XHRcdGlmKCFyZXN1bHQpIHtcclxuIFx0XHRcdFx0XHRpZihvcHRpb25zLmlnbm9yZVVuYWNjZXB0ZWQpXHJcbiBcdFx0XHRcdFx0XHRjb250aW51ZTtcclxuIFx0XHRcdFx0XHRob3RTZXRTdGF0dXMoXCJhYm9ydFwiKTtcclxuIFx0XHRcdFx0XHRyZXR1cm4gY2FsbGJhY2sobmV3IEVycm9yKFwiQWJvcnRlZCBiZWNhdXNlIFwiICsgbW9kdWxlSWQgKyBcIiBpcyBub3QgYWNjZXB0ZWRcIikpO1xyXG4gXHRcdFx0XHR9XHJcbiBcdFx0XHRcdGlmKHJlc3VsdCBpbnN0YW5jZW9mIEVycm9yKSB7XHJcbiBcdFx0XHRcdFx0aG90U2V0U3RhdHVzKFwiYWJvcnRcIik7XHJcbiBcdFx0XHRcdFx0cmV0dXJuIGNhbGxiYWNrKHJlc3VsdCk7XHJcbiBcdFx0XHRcdH1cclxuIFx0XHRcdFx0YXBwbGllZFVwZGF0ZVttb2R1bGVJZF0gPSBob3RVcGRhdGVbbW9kdWxlSWRdO1xyXG4gXHRcdFx0XHRhZGRBbGxUb1NldChvdXRkYXRlZE1vZHVsZXMsIHJlc3VsdFswXSk7XHJcbiBcdFx0XHRcdGZvcih2YXIgbW9kdWxlSWQgaW4gcmVzdWx0WzFdKSB7XHJcbiBcdFx0XHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHJlc3VsdFsxXSwgbW9kdWxlSWQpKSB7XHJcbiBcdFx0XHRcdFx0XHRpZighb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdKVxyXG4gXHRcdFx0XHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0gPSBbXTtcclxuIFx0XHRcdFx0XHRcdGFkZEFsbFRvU2V0KG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSwgcmVzdWx0WzFdW21vZHVsZUlkXSk7XHJcbiBcdFx0XHRcdFx0fVxyXG4gXHRcdFx0XHR9XHJcbiBcdFx0XHR9XHJcbiBcdFx0fVxyXG4gXHRcclxuIFx0XHQvLyBTdG9yZSBzZWxmIGFjY2VwdGVkIG91dGRhdGVkIG1vZHVsZXMgdG8gcmVxdWlyZSB0aGVtIGxhdGVyIGJ5IHRoZSBtb2R1bGUgc3lzdGVtXHJcbiBcdFx0dmFyIG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlcyA9IFtdO1xyXG4gXHRcdGZvcih2YXIgaSA9IDA7IGkgPCBvdXRkYXRlZE1vZHVsZXMubGVuZ3RoOyBpKyspIHtcclxuIFx0XHRcdHZhciBtb2R1bGVJZCA9IG91dGRhdGVkTW9kdWxlc1tpXTtcclxuIFx0XHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdICYmIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmhvdC5fc2VsZkFjY2VwdGVkKVxyXG4gXHRcdFx0XHRvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXMucHVzaCh7XHJcbiBcdFx0XHRcdFx0bW9kdWxlOiBtb2R1bGVJZCxcclxuIFx0XHRcdFx0XHRlcnJvckhhbmRsZXI6IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmhvdC5fc2VsZkFjY2VwdGVkXHJcbiBcdFx0XHRcdH0pO1xyXG4gXHRcdH1cclxuIFx0XHJcbiBcdFx0Ly8gTm93IGluIFwiZGlzcG9zZVwiIHBoYXNlXHJcbiBcdFx0aG90U2V0U3RhdHVzKFwiZGlzcG9zZVwiKTtcclxuIFx0XHR2YXIgcXVldWUgPSBvdXRkYXRlZE1vZHVsZXMuc2xpY2UoKTtcclxuIFx0XHR3aGlsZShxdWV1ZS5sZW5ndGggPiAwKSB7XHJcbiBcdFx0XHR2YXIgbW9kdWxlSWQgPSBxdWV1ZS5wb3AoKTtcclxuIFx0XHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcclxuIFx0XHRcdGlmKCFtb2R1bGUpIGNvbnRpbnVlO1xyXG4gXHRcclxuIFx0XHRcdHZhciBkYXRhID0ge307XHJcbiBcdFxyXG4gXHRcdFx0Ly8gQ2FsbCBkaXNwb3NlIGhhbmRsZXJzXHJcbiBcdFx0XHR2YXIgZGlzcG9zZUhhbmRsZXJzID0gbW9kdWxlLmhvdC5fZGlzcG9zZUhhbmRsZXJzO1xyXG4gXHRcdFx0Zm9yKHZhciBqID0gMDsgaiA8IGRpc3Bvc2VIYW5kbGVycy5sZW5ndGg7IGorKykge1xyXG4gXHRcdFx0XHR2YXIgY2IgPSBkaXNwb3NlSGFuZGxlcnNbal07XHJcbiBcdFx0XHRcdGNiKGRhdGEpO1xyXG4gXHRcdFx0fVxyXG4gXHRcdFx0aG90Q3VycmVudE1vZHVsZURhdGFbbW9kdWxlSWRdID0gZGF0YTtcclxuIFx0XHJcbiBcdFx0XHQvLyBkaXNhYmxlIG1vZHVsZSAodGhpcyBkaXNhYmxlcyByZXF1aXJlcyBmcm9tIHRoaXMgbW9kdWxlKVxyXG4gXHRcdFx0bW9kdWxlLmhvdC5hY3RpdmUgPSBmYWxzZTtcclxuIFx0XHJcbiBcdFx0XHQvLyByZW1vdmUgbW9kdWxlIGZyb20gY2FjaGVcclxuIFx0XHRcdGRlbGV0ZSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcclxuIFx0XHJcbiBcdFx0XHQvLyByZW1vdmUgXCJwYXJlbnRzXCIgcmVmZXJlbmNlcyBmcm9tIGFsbCBjaGlsZHJlblxyXG4gXHRcdFx0Zm9yKHZhciBqID0gMDsgaiA8IG1vZHVsZS5jaGlsZHJlbi5sZW5ndGg7IGorKykge1xyXG4gXHRcdFx0XHR2YXIgY2hpbGQgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZS5jaGlsZHJlbltqXV07XHJcbiBcdFx0XHRcdGlmKCFjaGlsZCkgY29udGludWU7XHJcbiBcdFx0XHRcdHZhciBpZHggPSBjaGlsZC5wYXJlbnRzLmluZGV4T2YobW9kdWxlSWQpO1xyXG4gXHRcdFx0XHRpZihpZHggPj0gMCkge1xyXG4gXHRcdFx0XHRcdGNoaWxkLnBhcmVudHMuc3BsaWNlKGlkeCwgMSk7XHJcbiBcdFx0XHRcdH1cclxuIFx0XHRcdH1cclxuIFx0XHR9XHJcbiBcdFxyXG4gXHRcdC8vIHJlbW92ZSBvdXRkYXRlZCBkZXBlbmRlbmN5IGZyb20gbW9kdWxlIGNoaWxkcmVuXHJcbiBcdFx0Zm9yKHZhciBtb2R1bGVJZCBpbiBvdXRkYXRlZERlcGVuZGVuY2llcykge1xyXG4gXHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG91dGRhdGVkRGVwZW5kZW5jaWVzLCBtb2R1bGVJZCkpIHtcclxuIFx0XHRcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xyXG4gXHRcdFx0XHR2YXIgbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMgPSBvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF07XHJcbiBcdFx0XHRcdGZvcih2YXIgaiA9IDA7IGogPCBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcy5sZW5ndGg7IGorKykge1xyXG4gXHRcdFx0XHRcdHZhciBkZXBlbmRlbmN5ID0gbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXNbal07XHJcbiBcdFx0XHRcdFx0dmFyIGlkeCA9IG1vZHVsZS5jaGlsZHJlbi5pbmRleE9mKGRlcGVuZGVuY3kpO1xyXG4gXHRcdFx0XHRcdGlmKGlkeCA+PSAwKSBtb2R1bGUuY2hpbGRyZW4uc3BsaWNlKGlkeCwgMSk7XHJcbiBcdFx0XHRcdH1cclxuIFx0XHRcdH1cclxuIFx0XHR9XHJcbiBcdFxyXG4gXHRcdC8vIE5vdCBpbiBcImFwcGx5XCIgcGhhc2VcclxuIFx0XHRob3RTZXRTdGF0dXMoXCJhcHBseVwiKTtcclxuIFx0XHJcbiBcdFx0aG90Q3VycmVudEhhc2ggPSBob3RVcGRhdGVOZXdIYXNoO1xyXG4gXHRcclxuIFx0XHQvLyBpbnNlcnQgbmV3IGNvZGVcclxuIFx0XHRmb3IodmFyIG1vZHVsZUlkIGluIGFwcGxpZWRVcGRhdGUpIHtcclxuIFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChhcHBsaWVkVXBkYXRlLCBtb2R1bGVJZCkpIHtcclxuIFx0XHRcdFx0bW9kdWxlc1ttb2R1bGVJZF0gPSBhcHBsaWVkVXBkYXRlW21vZHVsZUlkXTtcclxuIFx0XHRcdH1cclxuIFx0XHR9XHJcbiBcdFxyXG4gXHRcdC8vIGNhbGwgYWNjZXB0IGhhbmRsZXJzXHJcbiBcdFx0dmFyIGVycm9yID0gbnVsbDtcclxuIFx0XHRmb3IodmFyIG1vZHVsZUlkIGluIG91dGRhdGVkRGVwZW5kZW5jaWVzKSB7XHJcbiBcdFx0XHRpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob3V0ZGF0ZWREZXBlbmRlbmNpZXMsIG1vZHVsZUlkKSkge1xyXG4gXHRcdFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XHJcbiBcdFx0XHRcdHZhciBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcyA9IG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXTtcclxuIFx0XHRcdFx0dmFyIGNhbGxiYWNrcyA9IFtdO1xyXG4gXHRcdFx0XHRmb3IodmFyIGkgPSAwOyBpIDwgbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMubGVuZ3RoOyBpKyspIHtcclxuIFx0XHRcdFx0XHR2YXIgZGVwZW5kZW5jeSA9IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzW2ldO1xyXG4gXHRcdFx0XHRcdHZhciBjYiA9IG1vZHVsZS5ob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW2RlcGVuZGVuY3ldO1xyXG4gXHRcdFx0XHRcdGlmKGNhbGxiYWNrcy5pbmRleE9mKGNiKSA+PSAwKSBjb250aW51ZTtcclxuIFx0XHRcdFx0XHRjYWxsYmFja3MucHVzaChjYik7XHJcbiBcdFx0XHRcdH1cclxuIFx0XHRcdFx0Zm9yKHZhciBpID0gMDsgaSA8IGNhbGxiYWNrcy5sZW5ndGg7IGkrKykge1xyXG4gXHRcdFx0XHRcdHZhciBjYiA9IGNhbGxiYWNrc1tpXTtcclxuIFx0XHRcdFx0XHR0cnkge1xyXG4gXHRcdFx0XHRcdFx0Y2Iob3V0ZGF0ZWREZXBlbmRlbmNpZXMpO1xyXG4gXHRcdFx0XHRcdH0gY2F0Y2goZXJyKSB7XHJcbiBcdFx0XHRcdFx0XHRpZighZXJyb3IpXHJcbiBcdFx0XHRcdFx0XHRcdGVycm9yID0gZXJyO1xyXG4gXHRcdFx0XHRcdH1cclxuIFx0XHRcdFx0fVxyXG4gXHRcdFx0fVxyXG4gXHRcdH1cclxuIFx0XHJcbiBcdFx0Ly8gTG9hZCBzZWxmIGFjY2VwdGVkIG1vZHVsZXNcclxuIFx0XHRmb3IodmFyIGkgPSAwOyBpIDwgb3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzLmxlbmd0aDsgaSsrKSB7XHJcbiBcdFx0XHR2YXIgaXRlbSA9IG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlc1tpXTtcclxuIFx0XHRcdHZhciBtb2R1bGVJZCA9IGl0ZW0ubW9kdWxlO1xyXG4gXHRcdFx0aG90Q3VycmVudFBhcmVudHMgPSBbbW9kdWxlSWRdO1xyXG4gXHRcdFx0dHJ5IHtcclxuIFx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCk7XHJcbiBcdFx0XHR9IGNhdGNoKGVycikge1xyXG4gXHRcdFx0XHRpZih0eXBlb2YgaXRlbS5lcnJvckhhbmRsZXIgPT09IFwiZnVuY3Rpb25cIikge1xyXG4gXHRcdFx0XHRcdHRyeSB7XHJcbiBcdFx0XHRcdFx0XHRpdGVtLmVycm9ySGFuZGxlcihlcnIpO1xyXG4gXHRcdFx0XHRcdH0gY2F0Y2goZXJyKSB7XHJcbiBcdFx0XHRcdFx0XHRpZighZXJyb3IpXHJcbiBcdFx0XHRcdFx0XHRcdGVycm9yID0gZXJyO1xyXG4gXHRcdFx0XHRcdH1cclxuIFx0XHRcdFx0fSBlbHNlIGlmKCFlcnJvcilcclxuIFx0XHRcdFx0XHRlcnJvciA9IGVycjtcclxuIFx0XHRcdH1cclxuIFx0XHR9XHJcbiBcdFxyXG4gXHRcdC8vIGhhbmRsZSBlcnJvcnMgaW4gYWNjZXB0IGhhbmRsZXJzIGFuZCBzZWxmIGFjY2VwdGVkIG1vZHVsZSBsb2FkXHJcbiBcdFx0aWYoZXJyb3IpIHtcclxuIFx0XHRcdGhvdFNldFN0YXR1cyhcImZhaWxcIik7XHJcbiBcdFx0XHRyZXR1cm4gY2FsbGJhY2soZXJyb3IpO1xyXG4gXHRcdH1cclxuIFx0XHJcbiBcdFx0aG90U2V0U3RhdHVzKFwiaWRsZVwiKTtcclxuIFx0XHRjYWxsYmFjayhudWxsLCBvdXRkYXRlZE1vZHVsZXMpO1xyXG4gXHR9XHJcblxuIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlLFxuIFx0XHRcdGhvdDogaG90Q3JlYXRlTW9kdWxlKG1vZHVsZUlkKSxcbiBcdFx0XHRwYXJlbnRzOiBob3RDdXJyZW50UGFyZW50cyxcbiBcdFx0XHRjaGlsZHJlbjogW11cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgaG90Q3JlYXRlUmVxdWlyZShtb2R1bGVJZCkpO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL3N0YXRpY1wiO1xuXG4gXHQvLyBfX3dlYnBhY2tfaGFzaF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmggPSBmdW5jdGlvbigpIHsgcmV0dXJuIGhvdEN1cnJlbnRIYXNoOyB9O1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBob3RDcmVhdGVSZXF1aXJlKDApKDApO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgNTM5ODNlZWY0MzNmNjY5OTgzNjVcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IGxpYnNfbGliO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwgXCJsaWJzX2xpYlwiXG4gKiogbW9kdWxlIGlkID0gMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDEgMlxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gKF9fd2VicGFja19yZXF1aXJlX18oMSkpKDQxKTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGRlbGVnYXRlZCAuL25vZGVfbW9kdWxlcy8uMTUuMy4yQHJlYWN0L3JlYWN0LmpzIGZyb20gZGxsLXJlZmVyZW5jZSBsaWJzX2xpYlxuICoqIG1vZHVsZSBpZCA9IDJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDJcbiAqKi8iLCIvLyBodHRwczovL2dpdGh1Yi5jb20vemxvaXJvY2svY29yZS1qcy9pc3N1ZXMvODYjaXNzdWVjb21tZW50LTExNTc1OTAyOFxudmFyIGdsb2JhbCA9IG1vZHVsZS5leHBvcnRzID0gdHlwZW9mIHdpbmRvdyAhPSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuTWF0aCA9PSBNYXRoXG4gID8gd2luZG93IDogdHlwZW9mIHNlbGYgIT0gJ3VuZGVmaW5lZCcgJiYgc2VsZi5NYXRoID09IE1hdGggPyBzZWxmIDogRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcbmlmKHR5cGVvZiBfX2cgPT0gJ251bWJlcicpX19nID0gZ2xvYmFsOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVuZGVmXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19nbG9iYWwuanNcbiAqKiBtb2R1bGUgaWQgPSAzXG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAyXG4gKiovIiwidmFyIGhhc093blByb3BlcnR5ID0ge30uaGFzT3duUHJvcGVydHk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0LCBrZXkpe1xuICByZXR1cm4gaGFzT3duUHJvcGVydHkuY2FsbChpdCwga2V5KTtcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19oYXMuanNcbiAqKiBtb2R1bGUgaWQgPSA0XG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAyXG4gKiovIiwiLy8gdG8gaW5kZXhlZCBvYmplY3QsIHRvT2JqZWN0IHdpdGggZmFsbGJhY2sgZm9yIG5vbi1hcnJheS1saWtlIEVTMyBzdHJpbmdzXG52YXIgSU9iamVjdCA9IHJlcXVpcmUoJy4vX2lvYmplY3QnKVxuICAsIGRlZmluZWQgPSByZXF1aXJlKCcuL19kZWZpbmVkJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIElPYmplY3QoZGVmaW5lZChpdCkpO1xufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLWlvYmplY3QuanNcbiAqKiBtb2R1bGUgaWQgPSA1XG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAyXG4gKiovIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uIChpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHtcbiAgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpO1xuICB9XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+Ly42LjExLjZAYmFiZWwtcnVudGltZS9oZWxwZXJzL2NsYXNzQ2FsbENoZWNrLmpzXG4gKiogbW9kdWxlIGlkID0gNlxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDEgMlxuICoqLyIsIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG52YXIgX3NldFByb3RvdHlwZU9mID0gcmVxdWlyZShcIi4uL2NvcmUtanMvb2JqZWN0L3NldC1wcm90b3R5cGUtb2ZcIik7XG5cbnZhciBfc2V0UHJvdG90eXBlT2YyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfc2V0UHJvdG90eXBlT2YpO1xuXG52YXIgX2NyZWF0ZSA9IHJlcXVpcmUoXCIuLi9jb3JlLWpzL29iamVjdC9jcmVhdGVcIik7XG5cbnZhciBfY3JlYXRlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NyZWF0ZSk7XG5cbnZhciBfdHlwZW9mMiA9IHJlcXVpcmUoXCIuLi9oZWxwZXJzL3R5cGVvZlwiKTtcblxudmFyIF90eXBlb2YzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfdHlwZW9mMik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uIChzdWJDbGFzcywgc3VwZXJDbGFzcykge1xuICBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09IFwiZnVuY3Rpb25cIiAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uLCBub3QgXCIgKyAodHlwZW9mIHN1cGVyQ2xhc3MgPT09IFwidW5kZWZpbmVkXCIgPyBcInVuZGVmaW5lZFwiIDogKDAsIF90eXBlb2YzLmRlZmF1bHQpKHN1cGVyQ2xhc3MpKSk7XG4gIH1cblxuICBzdWJDbGFzcy5wcm90b3R5cGUgPSAoMCwgX2NyZWF0ZTIuZGVmYXVsdCkoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwge1xuICAgIGNvbnN0cnVjdG9yOiB7XG4gICAgICB2YWx1ZTogc3ViQ2xhc3MsXG4gICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfVxuICB9KTtcbiAgaWYgKHN1cGVyQ2xhc3MpIF9zZXRQcm90b3R5cGVPZjIuZGVmYXVsdCA/ICgwLCBfc2V0UHJvdG90eXBlT2YyLmRlZmF1bHQpKHN1YkNsYXNzLCBzdXBlckNsYXNzKSA6IHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+Ly42LjExLjZAYmFiZWwtcnVudGltZS9oZWxwZXJzL2luaGVyaXRzLmpzXG4gKiogbW9kdWxlIGlkID0gN1xuICoqIG1vZHVsZSBjaHVua3MgPSAwIDEgMlxuICoqLyIsIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG52YXIgX3R5cGVvZjIgPSByZXF1aXJlKFwiLi4vaGVscGVycy90eXBlb2ZcIik7XG5cbnZhciBfdHlwZW9mMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3R5cGVvZjIpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAoc2VsZiwgY2FsbCkge1xuICBpZiAoIXNlbGYpIHtcbiAgICB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7XG4gIH1cblxuICByZXR1cm4gY2FsbCAmJiAoKHR5cGVvZiBjYWxsID09PSBcInVuZGVmaW5lZFwiID8gXCJ1bmRlZmluZWRcIiA6ICgwLCBfdHlwZW9mMy5kZWZhdWx0KShjYWxsKSkgPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIGNhbGwgPT09IFwiZnVuY3Rpb25cIikgPyBjYWxsIDogc2VsZjtcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vLjYuMTEuNkBiYWJlbC1ydW50aW1lL2hlbHBlcnMvcG9zc2libGVDb25zdHJ1Y3RvclJldHVybi5qc1xuICoqIG1vZHVsZSBpZCA9IDhcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDJcbiAqKi8iLCJ2YXIgY29yZSA9IG1vZHVsZS5leHBvcnRzID0ge3ZlcnNpb246ICcyLjQuMCd9O1xuaWYodHlwZW9mIF9fZSA9PSAnbnVtYmVyJylfX2UgPSBjb3JlOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVuZGVmXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jb3JlLmpzXG4gKiogbW9kdWxlIGlkID0gOVxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDEgMlxuICoqLyIsIi8vIFRoYW5rJ3MgSUU4IGZvciBoaXMgZnVubnkgZGVmaW5lUHJvcGVydHlcbm1vZHVsZS5leHBvcnRzID0gIXJlcXVpcmUoJy4vX2ZhaWxzJykoZnVuY3Rpb24oKXtcbiAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh7fSwgJ2EnLCB7Z2V0OiBmdW5jdGlvbigpeyByZXR1cm4gNzsgfX0pLmEgIT0gNztcbn0pO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZGVzY3JpcHRvcnMuanNcbiAqKiBtb2R1bGUgaWQgPSAxMFxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDEgMlxuICoqLyIsInZhciBkUCAgICAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJylcbiAgLCBjcmVhdGVEZXNjID0gcmVxdWlyZSgnLi9fcHJvcGVydHktZGVzYycpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpID8gZnVuY3Rpb24ob2JqZWN0LCBrZXksIHZhbHVlKXtcbiAgcmV0dXJuIGRQLmYob2JqZWN0LCBrZXksIGNyZWF0ZURlc2MoMSwgdmFsdWUpKTtcbn0gOiBmdW5jdGlvbihvYmplY3QsIGtleSwgdmFsdWUpe1xuICBvYmplY3Rba2V5XSA9IHZhbHVlO1xuICByZXR1cm4gb2JqZWN0O1xufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2hpZGUuanNcbiAqKiBtb2R1bGUgaWQgPSAxMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDEgMlxuICoqLyIsInZhciBhbk9iamVjdCAgICAgICA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpXG4gICwgSUU4X0RPTV9ERUZJTkUgPSByZXF1aXJlKCcuL19pZTgtZG9tLWRlZmluZScpXG4gICwgdG9QcmltaXRpdmUgICAgPSByZXF1aXJlKCcuL190by1wcmltaXRpdmUnKVxuICAsIGRQICAgICAgICAgICAgID0gT2JqZWN0LmRlZmluZVByb3BlcnR5O1xuXG5leHBvcnRzLmYgPSByZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpID8gT2JqZWN0LmRlZmluZVByb3BlcnR5IDogZnVuY3Rpb24gZGVmaW5lUHJvcGVydHkoTywgUCwgQXR0cmlidXRlcyl7XG4gIGFuT2JqZWN0KE8pO1xuICBQID0gdG9QcmltaXRpdmUoUCwgdHJ1ZSk7XG4gIGFuT2JqZWN0KEF0dHJpYnV0ZXMpO1xuICBpZihJRThfRE9NX0RFRklORSl0cnkge1xuICAgIHJldHVybiBkUChPLCBQLCBBdHRyaWJ1dGVzKTtcbiAgfSBjYXRjaChlKXsgLyogZW1wdHkgKi8gfVxuICBpZignZ2V0JyBpbiBBdHRyaWJ1dGVzIHx8ICdzZXQnIGluIEF0dHJpYnV0ZXMpdGhyb3cgVHlwZUVycm9yKCdBY2Nlc3NvcnMgbm90IHN1cHBvcnRlZCEnKTtcbiAgaWYoJ3ZhbHVlJyBpbiBBdHRyaWJ1dGVzKU9bUF0gPSBBdHRyaWJ1dGVzLnZhbHVlO1xuICByZXR1cm4gTztcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZHAuanNcbiAqKiBtb2R1bGUgaWQgPSAxMlxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDEgMlxuICoqLyIsInZhciBzdG9yZSAgICAgID0gcmVxdWlyZSgnLi9fc2hhcmVkJykoJ3drcycpXG4gICwgdWlkICAgICAgICA9IHJlcXVpcmUoJy4vX3VpZCcpXG4gICwgU3ltYm9sICAgICA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpLlN5bWJvbFxuICAsIFVTRV9TWU1CT0wgPSB0eXBlb2YgU3ltYm9sID09ICdmdW5jdGlvbic7XG5cbnZhciAkZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obmFtZSl7XG4gIHJldHVybiBzdG9yZVtuYW1lXSB8fCAoc3RvcmVbbmFtZV0gPVxuICAgIFVTRV9TWU1CT0wgJiYgU3ltYm9sW25hbWVdIHx8IChVU0VfU1lNQk9MID8gU3ltYm9sIDogdWlkKSgnU3ltYm9sLicgKyBuYW1lKSk7XG59O1xuXG4kZXhwb3J0cy5zdG9yZSA9IHN0b3JlO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fd2tzLmpzXG4gKiogbW9kdWxlIGlkID0gMTNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDJcbiAqKi8iLCJ2YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICBpZighaXNPYmplY3QoaXQpKXRocm93IFR5cGVFcnJvcihpdCArICcgaXMgbm90IGFuIG9iamVjdCEnKTtcbiAgcmV0dXJuIGl0O1xufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2FuLW9iamVjdC5qc1xuICoqIG1vZHVsZSBpZCA9IDE0XG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAyXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiB0eXBlb2YgaXQgPT09ICdvYmplY3QnID8gaXQgIT09IG51bGwgOiB0eXBlb2YgaXQgPT09ICdmdW5jdGlvbic7XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXMtb2JqZWN0LmpzXG4gKiogbW9kdWxlIGlkID0gMTVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDJcbiAqKi8iLCJpbXBvcnQgUmVhY3QsIHsgUHJvcFR5cGVzLCBDb21wb25lbnQgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgc2hhbGxvd0VxdWFsIGZyb20gJy4uL3V0aWxzL3NoYWxsb3dFcXVhbCc7XG5pbXBvcnQgRXZlbnRFbWl0dGVyIGZyb20gJ2V2ZW50cyc7XG5cbmNvbnN0IGV2ZW50TWF0Y2hSZWcgPSAvXm9uW0EtWl0vO1xuZnVuY3Rpb24gZ2V0RXZlbnRNZXRob2RzUHJvcHMoaW5zdGFuY2Upe1xuICAgIGxldCBtZXRob2RzID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoaW5zdGFuY2UpXG4gICAgICAgIC5maWx0ZXIoKHByb3ApID0+IHtcbiAgICAgICAgICAgIHJldHVybiBldmVudE1hdGNoUmVnLnRlc3QocHJvcClcbiAgICAgICAgICAgICAgICAmJiB0eXBlb2YgaW5zdGFuY2VbcHJvcF0gPT09ICdmdW5jdGlvbic7XG4gICAgICAgIH0pO1xuXG4gICAgbGV0IGluc3RhbmNlUHJvdG90eXBlID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKGluc3RhbmNlKTtcbiAgICBpZihpbnN0YW5jZVByb3RvdHlwZSAhPT0gT2JqZWN0LnByb3RvdHlwZSkge1xuICAgICAgICBtZXRob2RzID0gbWV0aG9kcy5jb25jYXQoZ2V0RXZlbnRNZXRob2RzUHJvcHMoaW5zdGFuY2VQcm90b3R5cGUpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbWV0aG9kc1xufVxuXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJhc2UgZXh0ZW5kcyBDb21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzLCBjb250ZXh0KXtcbiAgICAgICAgc3VwZXIocHJvcHMsIGNvbnRleHQpO1xuXG4gICAgICAgIHRoaXMuX19ldmVudE5hbWVzID0ge307XG5cbiAgICAgICAgdGhpcy5fX2JpbmRGdW5jdGlvbnMoKTtcbiAgICB9XG5cbiAgICBfX2JpbmRGdW5jdGlvbnMoKXtcbiAgICAgICAgbGV0IHByb3BzID0gZ2V0RXZlbnRNZXRob2RzUHJvcHModGhpcyk7XG4gICAgICAgIGZvcihsZXQgcHJvcCBvZiBwcm9wcyl7XG4gICAgICAgICAgICBpZighdGhpc1twcm9wXS5mdW5jQmluZGVkKXtcbiAgICAgICAgICAgICAgICB0aGlzW3Byb3BdID0gdGhpc1twcm9wXS5iaW5kKHRoaXMpO1xuICAgICAgICAgICAgICAgIHRoaXNbcHJvcF0uZnVuY0JpbmRlZCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbihldmVudE5hbWUsIGZuKXtcbiAgICAgICAgaWYodHlwZW9mIGZuICE9PSAnZnVuY3Rpb24nKSB0aHJvdyBuZXcgRXJyb3IoJ2ZuIHNob3VsZCBiZSBhIGZ1bmN0aW9uJyk7XG5cbiAgICAgICAgaWYoIXRoaXMuX19ldmVudE5hbWVzW2V2ZW50TmFtZV0pe1xuICAgICAgICAgICAgdGhpcy5fX2V2ZW50TmFtZXNbZXZlbnROYW1lXSA9IFtmbl07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9fZXZlbnROYW1lc1tldmVudE5hbWVdLnB1c2goZm4pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuY29udGV4dC4kZXZlbnRCdXMuYWRkTGlzdGVuZXIoZXZlbnROYW1lLCBmbik7XG4gICAgfVxuXG4gICAgZW1pdChldmVudE5hbWUsIC4uLmFyZ3Mpe1xuICAgICAgICByZXR1cm4gdGhpcy5jb250ZXh0LiRldmVudEJ1cy5lbWl0KGV2ZW50TmFtZSwgLi4uYXJncyk7XG4gICAgfVxuXG4gICAgb2ZmKGV2ZW50TmFtZSwgZm4pe1xuICAgICAgICBsZXQgZXZlbnRzID0gdGhpcy5fX2V2ZW50TmFtZXNbZXZlbnROYW1lXTtcbiAgICAgICAgaWYoZXZlbnRzKXtcbiAgICAgICAgICAgIGxldCBpbmRleCA9IGV2ZW50cy5pbmRleE9mKGZuKTtcblxuICAgICAgICAgICAgaWYoaW5kZXggPj0gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuY29udGV4dC4kZXZlbnRCdXMucmVtb3ZlTGlzdGVuZXIoZXZlbnROYW1lLCBmbik7XG5cbiAgICAgICAgICAgICAgICBldmVudHMuc3BsaWNlKGluZGV4LCAxKTtcblxuICAgICAgICAgICAgICAgIGlmKCFldmVudHMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLl9fZXZlbnROYW1lc1tldmVudE5hbWVdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKCdldmVudDogJyArIGV2ZW50TmFtZSArICcgaXMgbm90IHJlZ2lzdGVyZWQgaW4gJyArIHRoaXMuX3JlYWN0SW50ZXJuYWxJbnN0YW5jZS5nZXROYW1lKCkgKyAnIENvbXBvbmVudCcpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybignZXZlbnQ6ICcgKyBldmVudE5hbWUgKyAnIGlzIG5vdCByZWdpc3RlcmVkIGluICcgKyB0aGlzLmNvbnN0cnVjdG9yLm5hbWUgKyAnIENvbXBvbmVudCcpO1xuXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIOajgOmqjOe7hOS7tuabtOaWsFxuICAgICAqIEBwYXJhbSBuZXh0UHJvcHNcbiAgICAgKiBAcGFyYW0gbmV4dFN0YXRlXG4gICAgICogQHJldHVybnMgeyp9XG4gICAgICovXG4gICAgc2hvdWxkQ29tcG9uZW50VXBkYXRlKG5leHRQcm9wcywgbmV4dFN0YXRlKXtcbiAgICAgICAgbGV0IHNob3VsZFVwZGF0ZSA9ICFzaGFsbG93RXF1YWwodGhpcy5wcm9wcywgbmV4dFByb3BzKSB8fCAhc2hhbGxvd0VxdWFsKHRoaXMuc3RhdGUsIG5leHRTdGF0ZSk7XG5cbiAgICAgICAgaWYoc2hvdWxkVXBkYXRlICYmIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdDb21wb25lbnQ6ICcgKyB0aGlzLmNvbnN0cnVjdG9yLm5hbWUgKyAnIHdpbGwgdXBkYXRlJyk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gc2hvdWxkVXBkYXRlO1xuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50KCl7XG4gICAgICAgIGZvcihsZXQgZXZlbnROYW1lIGluIHRoaXMuX19ldmVudE5hbWVzKXtcbiAgICAgICAgICAgIGlmKHRoaXMuX19ldmVudE5hbWVzLmhhc093blByb3BlcnR5KGV2ZW50TmFtZSkpe1xuICAgICAgICAgICAgICAgIGZvcihsZXQgZm4gb2YgdGhpcy5fX2V2ZW50TmFtZXNbZXZlbnROYW1lXSl7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub2ZmKGV2ZW50TmFtZSwgZm4pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cbkJhc2UuY29udGV4dFR5cGVzID0ge1xuICAgICRldmVudEJ1czogUHJvcFR5cGVzLmluc3RhbmNlT2YoRXZlbnRFbWl0dGVyKVxufTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vY29tbW9uL3BhZ2VzL0Jhc2UuanN4XG4gKiovIiwidmFyIGdsb2JhbCAgICA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpXG4gICwgY29yZSAgICAgID0gcmVxdWlyZSgnLi9fY29yZScpXG4gICwgY3R4ICAgICAgID0gcmVxdWlyZSgnLi9fY3R4JylcbiAgLCBoaWRlICAgICAgPSByZXF1aXJlKCcuL19oaWRlJylcbiAgLCBQUk9UT1RZUEUgPSAncHJvdG90eXBlJztcblxudmFyICRleHBvcnQgPSBmdW5jdGlvbih0eXBlLCBuYW1lLCBzb3VyY2Upe1xuICB2YXIgSVNfRk9SQ0VEID0gdHlwZSAmICRleHBvcnQuRlxuICAgICwgSVNfR0xPQkFMID0gdHlwZSAmICRleHBvcnQuR1xuICAgICwgSVNfU1RBVElDID0gdHlwZSAmICRleHBvcnQuU1xuICAgICwgSVNfUFJPVE8gID0gdHlwZSAmICRleHBvcnQuUFxuICAgICwgSVNfQklORCAgID0gdHlwZSAmICRleHBvcnQuQlxuICAgICwgSVNfV1JBUCAgID0gdHlwZSAmICRleHBvcnQuV1xuICAgICwgZXhwb3J0cyAgID0gSVNfR0xPQkFMID8gY29yZSA6IGNvcmVbbmFtZV0gfHwgKGNvcmVbbmFtZV0gPSB7fSlcbiAgICAsIGV4cFByb3RvICA9IGV4cG9ydHNbUFJPVE9UWVBFXVxuICAgICwgdGFyZ2V0ICAgID0gSVNfR0xPQkFMID8gZ2xvYmFsIDogSVNfU1RBVElDID8gZ2xvYmFsW25hbWVdIDogKGdsb2JhbFtuYW1lXSB8fCB7fSlbUFJPVE9UWVBFXVxuICAgICwga2V5LCBvd24sIG91dDtcbiAgaWYoSVNfR0xPQkFMKXNvdXJjZSA9IG5hbWU7XG4gIGZvcihrZXkgaW4gc291cmNlKXtcbiAgICAvLyBjb250YWlucyBpbiBuYXRpdmVcbiAgICBvd24gPSAhSVNfRk9SQ0VEICYmIHRhcmdldCAmJiB0YXJnZXRba2V5XSAhPT0gdW5kZWZpbmVkO1xuICAgIGlmKG93biAmJiBrZXkgaW4gZXhwb3J0cyljb250aW51ZTtcbiAgICAvLyBleHBvcnQgbmF0aXZlIG9yIHBhc3NlZFxuICAgIG91dCA9IG93biA/IHRhcmdldFtrZXldIDogc291cmNlW2tleV07XG4gICAgLy8gcHJldmVudCBnbG9iYWwgcG9sbHV0aW9uIGZvciBuYW1lc3BhY2VzXG4gICAgZXhwb3J0c1trZXldID0gSVNfR0xPQkFMICYmIHR5cGVvZiB0YXJnZXRba2V5XSAhPSAnZnVuY3Rpb24nID8gc291cmNlW2tleV1cbiAgICAvLyBiaW5kIHRpbWVycyB0byBnbG9iYWwgZm9yIGNhbGwgZnJvbSBleHBvcnQgY29udGV4dFxuICAgIDogSVNfQklORCAmJiBvd24gPyBjdHgob3V0LCBnbG9iYWwpXG4gICAgLy8gd3JhcCBnbG9iYWwgY29uc3RydWN0b3JzIGZvciBwcmV2ZW50IGNoYW5nZSB0aGVtIGluIGxpYnJhcnlcbiAgICA6IElTX1dSQVAgJiYgdGFyZ2V0W2tleV0gPT0gb3V0ID8gKGZ1bmN0aW9uKEMpe1xuICAgICAgdmFyIEYgPSBmdW5jdGlvbihhLCBiLCBjKXtcbiAgICAgICAgaWYodGhpcyBpbnN0YW5jZW9mIEMpe1xuICAgICAgICAgIHN3aXRjaChhcmd1bWVudHMubGVuZ3RoKXtcbiAgICAgICAgICAgIGNhc2UgMDogcmV0dXJuIG5ldyBDO1xuICAgICAgICAgICAgY2FzZSAxOiByZXR1cm4gbmV3IEMoYSk7XG4gICAgICAgICAgICBjYXNlIDI6IHJldHVybiBuZXcgQyhhLCBiKTtcbiAgICAgICAgICB9IHJldHVybiBuZXcgQyhhLCBiLCBjKTtcbiAgICAgICAgfSByZXR1cm4gQy5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfTtcbiAgICAgIEZbUFJPVE9UWVBFXSA9IENbUFJPVE9UWVBFXTtcbiAgICAgIHJldHVybiBGO1xuICAgIC8vIG1ha2Ugc3RhdGljIHZlcnNpb25zIGZvciBwcm90b3R5cGUgbWV0aG9kc1xuICAgIH0pKG91dCkgOiBJU19QUk9UTyAmJiB0eXBlb2Ygb3V0ID09ICdmdW5jdGlvbicgPyBjdHgoRnVuY3Rpb24uY2FsbCwgb3V0KSA6IG91dDtcbiAgICAvLyBleHBvcnQgcHJvdG8gbWV0aG9kcyB0byBjb3JlLiVDT05TVFJVQ1RPUiUubWV0aG9kcy4lTkFNRSVcbiAgICBpZihJU19QUk9UTyl7XG4gICAgICAoZXhwb3J0cy52aXJ0dWFsIHx8IChleHBvcnRzLnZpcnR1YWwgPSB7fSkpW2tleV0gPSBvdXQ7XG4gICAgICAvLyBleHBvcnQgcHJvdG8gbWV0aG9kcyB0byBjb3JlLiVDT05TVFJVQ1RPUiUucHJvdG90eXBlLiVOQU1FJVxuICAgICAgaWYodHlwZSAmICRleHBvcnQuUiAmJiBleHBQcm90byAmJiAhZXhwUHJvdG9ba2V5XSloaWRlKGV4cFByb3RvLCBrZXksIG91dCk7XG4gICAgfVxuICB9XG59O1xuLy8gdHlwZSBiaXRtYXBcbiRleHBvcnQuRiA9IDE7ICAgLy8gZm9yY2VkXG4kZXhwb3J0LkcgPSAyOyAgIC8vIGdsb2JhbFxuJGV4cG9ydC5TID0gNDsgICAvLyBzdGF0aWNcbiRleHBvcnQuUCA9IDg7ICAgLy8gcHJvdG9cbiRleHBvcnQuQiA9IDE2OyAgLy8gYmluZFxuJGV4cG9ydC5XID0gMzI7ICAvLyB3cmFwXG4kZXhwb3J0LlUgPSA2NDsgIC8vIHNhZmVcbiRleHBvcnQuUiA9IDEyODsgLy8gcmVhbCBwcm90byBtZXRob2QgZm9yIGBsaWJyYXJ5YCBcbm1vZHVsZS5leHBvcnRzID0gJGV4cG9ydDtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2V4cG9ydC5qc1xuICoqIG1vZHVsZSBpZCA9IDE3XG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAyXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihleGVjKXtcbiAgdHJ5IHtcbiAgICByZXR1cm4gISFleGVjKCk7XG4gIH0gY2F0Y2goZSl7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19mYWlscy5qc1xuICoqIG1vZHVsZSBpZCA9IDE4XG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAyXG4gKiovIiwiLy8gMTkuMS4yLjE0IC8gMTUuMi4zLjE0IE9iamVjdC5rZXlzKE8pXG52YXIgJGtleXMgICAgICAgPSByZXF1aXJlKCcuL19vYmplY3Qta2V5cy1pbnRlcm5hbCcpXG4gICwgZW51bUJ1Z0tleXMgPSByZXF1aXJlKCcuL19lbnVtLWJ1Zy1rZXlzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmtleXMgfHwgZnVuY3Rpb24ga2V5cyhPKXtcbiAgcmV0dXJuICRrZXlzKE8sIGVudW1CdWdLZXlzKTtcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3Qta2V5cy5qc1xuICoqIG1vZHVsZSBpZCA9IDE5XG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAyXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihiaXRtYXAsIHZhbHVlKXtcbiAgcmV0dXJuIHtcbiAgICBlbnVtZXJhYmxlICA6ICEoYml0bWFwICYgMSksXG4gICAgY29uZmlndXJhYmxlOiAhKGJpdG1hcCAmIDIpLFxuICAgIHdyaXRhYmxlICAgIDogIShiaXRtYXAgJiA0KSxcbiAgICB2YWx1ZSAgICAgICA6IHZhbHVlXG4gIH07XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fcHJvcGVydHktZGVzYy5qc1xuICoqIG1vZHVsZSBpZCA9IDIwXG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAyXG4gKiovIiwidmFyIGlkID0gMFxuICAsIHB4ID0gTWF0aC5yYW5kb20oKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oa2V5KXtcbiAgcmV0dXJuICdTeW1ib2woJy5jb25jYXQoa2V5ID09PSB1bmRlZmluZWQgPyAnJyA6IGtleSwgJylfJywgKCsraWQgKyBweCkudG9TdHJpbmcoMzYpKTtcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL191aWQuanNcbiAqKiBtb2R1bGUgaWQgPSAyMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDEgMlxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gKF9fd2VicGFja19yZXF1aXJlX18oMSkpKDEpO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZGVsZWdhdGVkIC4vbm9kZV9tb2R1bGVzLy4wLjExLjlAcHJvY2Vzcy9icm93c2VyLmpzIGZyb20gZGxsLXJlZmVyZW5jZSBsaWJzX2xpYlxuICoqIG1vZHVsZSBpZCA9IDIyXG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAyXG4gKiovIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbnZhciBfaXRlcmF0b3IgPSByZXF1aXJlKFwiLi4vY29yZS1qcy9zeW1ib2wvaXRlcmF0b3JcIik7XG5cbnZhciBfaXRlcmF0b3IyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaXRlcmF0b3IpO1xuXG52YXIgX3N5bWJvbCA9IHJlcXVpcmUoXCIuLi9jb3JlLWpzL3N5bWJvbFwiKTtcblxudmFyIF9zeW1ib2wyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfc3ltYm9sKTtcblxudmFyIF90eXBlb2YgPSB0eXBlb2YgX3N5bWJvbDIuZGVmYXVsdCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBfaXRlcmF0b3IyLmRlZmF1bHQgPT09IFwic3ltYm9sXCIgPyBmdW5jdGlvbiAob2JqKSB7IHJldHVybiB0eXBlb2Ygb2JqOyB9IDogZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gb2JqICYmIHR5cGVvZiBfc3ltYm9sMi5kZWZhdWx0ID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBfc3ltYm9sMi5kZWZhdWx0ID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7IH07XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmV4cG9ydHMuZGVmYXVsdCA9IHR5cGVvZiBfc3ltYm9sMi5kZWZhdWx0ID09PSBcImZ1bmN0aW9uXCIgJiYgX3R5cGVvZihfaXRlcmF0b3IyLmRlZmF1bHQpID09PSBcInN5bWJvbFwiID8gZnVuY3Rpb24gKG9iaikge1xuICByZXR1cm4gdHlwZW9mIG9iaiA9PT0gXCJ1bmRlZmluZWRcIiA/IFwidW5kZWZpbmVkXCIgOiBfdHlwZW9mKG9iaik7XG59IDogZnVuY3Rpb24gKG9iaikge1xuICByZXR1cm4gb2JqICYmIHR5cGVvZiBfc3ltYm9sMi5kZWZhdWx0ID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBfc3ltYm9sMi5kZWZhdWx0ID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmogPT09IFwidW5kZWZpbmVkXCIgPyBcInVuZGVmaW5lZFwiIDogX3R5cGVvZihvYmopO1xufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi8uNi4xMS42QGJhYmVsLXJ1bnRpbWUvaGVscGVycy90eXBlb2YuanNcbiAqKiBtb2R1bGUgaWQgPSAyM1xuICoqIG1vZHVsZSBjaHVua3MgPSAwIDEgMlxuICoqLyIsIi8vIDcuMi4xIFJlcXVpcmVPYmplY3RDb2VyY2libGUoYXJndW1lbnQpXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgaWYoaXQgPT0gdW5kZWZpbmVkKXRocm93IFR5cGVFcnJvcihcIkNhbid0IGNhbGwgbWV0aG9kIG9uICBcIiArIGl0KTtcbiAgcmV0dXJuIGl0O1xufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2RlZmluZWQuanNcbiAqKiBtb2R1bGUgaWQgPSAyNFxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDEgMlxuICoqLyIsIi8vIElFIDgtIGRvbid0IGVudW0gYnVnIGtleXNcbm1vZHVsZS5leHBvcnRzID0gKFxuICAnY29uc3RydWN0b3IsaGFzT3duUHJvcGVydHksaXNQcm90b3R5cGVPZixwcm9wZXJ0eUlzRW51bWVyYWJsZSx0b0xvY2FsZVN0cmluZyx0b1N0cmluZyx2YWx1ZU9mJ1xuKS5zcGxpdCgnLCcpO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZW51bS1idWcta2V5cy5qc1xuICoqIG1vZHVsZSBpZCA9IDI1XG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAyXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSB7fTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2l0ZXJhdG9ycy5qc1xuICoqIG1vZHVsZSBpZCA9IDI2XG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAyXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSB0cnVlO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fbGlicmFyeS5qc1xuICoqIG1vZHVsZSBpZCA9IDI3XG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAyXG4gKiovIiwiLy8gMTkuMS4yLjIgLyAxNS4yLjMuNSBPYmplY3QuY3JlYXRlKE8gWywgUHJvcGVydGllc10pXG52YXIgYW5PYmplY3QgICAgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKVxuICAsIGRQcyAgICAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwcycpXG4gICwgZW51bUJ1Z0tleXMgPSByZXF1aXJlKCcuL19lbnVtLWJ1Zy1rZXlzJylcbiAgLCBJRV9QUk9UTyAgICA9IHJlcXVpcmUoJy4vX3NoYXJlZC1rZXknKSgnSUVfUFJPVE8nKVxuICAsIEVtcHR5ICAgICAgID0gZnVuY3Rpb24oKXsgLyogZW1wdHkgKi8gfVxuICAsIFBST1RPVFlQRSAgID0gJ3Byb3RvdHlwZSc7XG5cbi8vIENyZWF0ZSBvYmplY3Qgd2l0aCBmYWtlIGBudWxsYCBwcm90b3R5cGU6IHVzZSBpZnJhbWUgT2JqZWN0IHdpdGggY2xlYXJlZCBwcm90b3R5cGVcbnZhciBjcmVhdGVEaWN0ID0gZnVuY3Rpb24oKXtcbiAgLy8gVGhyYXNoLCB3YXN0ZSBhbmQgc29kb215OiBJRSBHQyBidWdcbiAgdmFyIGlmcmFtZSA9IHJlcXVpcmUoJy4vX2RvbS1jcmVhdGUnKSgnaWZyYW1lJylcbiAgICAsIGkgICAgICA9IGVudW1CdWdLZXlzLmxlbmd0aFxuICAgICwgbHQgICAgID0gJzwnXG4gICAgLCBndCAgICAgPSAnPidcbiAgICAsIGlmcmFtZURvY3VtZW50O1xuICBpZnJhbWUuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgcmVxdWlyZSgnLi9faHRtbCcpLmFwcGVuZENoaWxkKGlmcmFtZSk7XG4gIGlmcmFtZS5zcmMgPSAnamF2YXNjcmlwdDonOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXNjcmlwdC11cmxcbiAgLy8gY3JlYXRlRGljdCA9IGlmcmFtZS5jb250ZW50V2luZG93Lk9iamVjdDtcbiAgLy8gaHRtbC5yZW1vdmVDaGlsZChpZnJhbWUpO1xuICBpZnJhbWVEb2N1bWVudCA9IGlmcmFtZS5jb250ZW50V2luZG93LmRvY3VtZW50O1xuICBpZnJhbWVEb2N1bWVudC5vcGVuKCk7XG4gIGlmcmFtZURvY3VtZW50LndyaXRlKGx0ICsgJ3NjcmlwdCcgKyBndCArICdkb2N1bWVudC5GPU9iamVjdCcgKyBsdCArICcvc2NyaXB0JyArIGd0KTtcbiAgaWZyYW1lRG9jdW1lbnQuY2xvc2UoKTtcbiAgY3JlYXRlRGljdCA9IGlmcmFtZURvY3VtZW50LkY7XG4gIHdoaWxlKGktLSlkZWxldGUgY3JlYXRlRGljdFtQUk9UT1RZUEVdW2VudW1CdWdLZXlzW2ldXTtcbiAgcmV0dXJuIGNyZWF0ZURpY3QoKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmNyZWF0ZSB8fCBmdW5jdGlvbiBjcmVhdGUoTywgUHJvcGVydGllcyl7XG4gIHZhciByZXN1bHQ7XG4gIGlmKE8gIT09IG51bGwpe1xuICAgIEVtcHR5W1BST1RPVFlQRV0gPSBhbk9iamVjdChPKTtcbiAgICByZXN1bHQgPSBuZXcgRW1wdHk7XG4gICAgRW1wdHlbUFJPVE9UWVBFXSA9IG51bGw7XG4gICAgLy8gYWRkIFwiX19wcm90b19fXCIgZm9yIE9iamVjdC5nZXRQcm90b3R5cGVPZiBwb2x5ZmlsbFxuICAgIHJlc3VsdFtJRV9QUk9UT10gPSBPO1xuICB9IGVsc2UgcmVzdWx0ID0gY3JlYXRlRGljdCgpO1xuICByZXR1cm4gUHJvcGVydGllcyA9PT0gdW5kZWZpbmVkID8gcmVzdWx0IDogZFBzKHJlc3VsdCwgUHJvcGVydGllcyk7XG59O1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtY3JlYXRlLmpzXG4gKiogbW9kdWxlIGlkID0gMjhcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDJcbiAqKi8iLCJleHBvcnRzLmYgPSB7fS5wcm9wZXJ0eUlzRW51bWVyYWJsZTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1waWUuanNcbiAqKiBtb2R1bGUgaWQgPSAyOVxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDEgMlxuICoqLyIsInZhciBkZWYgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKS5mXG4gICwgaGFzID0gcmVxdWlyZSgnLi9faGFzJylcbiAgLCBUQUcgPSByZXF1aXJlKCcuL193a3MnKSgndG9TdHJpbmdUYWcnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCwgdGFnLCBzdGF0KXtcbiAgaWYoaXQgJiYgIWhhcyhpdCA9IHN0YXQgPyBpdCA6IGl0LnByb3RvdHlwZSwgVEFHKSlkZWYoaXQsIFRBRywge2NvbmZpZ3VyYWJsZTogdHJ1ZSwgdmFsdWU6IHRhZ30pO1xufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3NldC10by1zdHJpbmctdGFnLmpzXG4gKiogbW9kdWxlIGlkID0gMzBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDJcbiAqKi8iLCJ2YXIgc2hhcmVkID0gcmVxdWlyZSgnLi9fc2hhcmVkJykoJ2tleXMnKVxuICAsIHVpZCAgICA9IHJlcXVpcmUoJy4vX3VpZCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihrZXkpe1xuICByZXR1cm4gc2hhcmVkW2tleV0gfHwgKHNoYXJlZFtrZXldID0gdWlkKGtleSkpO1xufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3NoYXJlZC1rZXkuanNcbiAqKiBtb2R1bGUgaWQgPSAzMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDEgMlxuICoqLyIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuL19nbG9iYWwnKVxuICAsIFNIQVJFRCA9ICdfX2NvcmUtanNfc2hhcmVkX18nXG4gICwgc3RvcmUgID0gZ2xvYmFsW1NIQVJFRF0gfHwgKGdsb2JhbFtTSEFSRURdID0ge30pO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihrZXkpe1xuICByZXR1cm4gc3RvcmVba2V5XSB8fCAoc3RvcmVba2V5XSA9IHt9KTtcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zaGFyZWQuanNcbiAqKiBtb2R1bGUgaWQgPSAzMlxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDEgMlxuICoqLyIsIi8vIDcuMS40IFRvSW50ZWdlclxudmFyIGNlaWwgID0gTWF0aC5jZWlsXG4gICwgZmxvb3IgPSBNYXRoLmZsb29yO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiBpc05hTihpdCA9ICtpdCkgPyAwIDogKGl0ID4gMCA/IGZsb29yIDogY2VpbCkoaXQpO1xufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLWludGVnZXIuanNcbiAqKiBtb2R1bGUgaWQgPSAzM1xuICoqIG1vZHVsZSBjaHVua3MgPSAwIDEgMlxuICoqLyIsIi8vIDcuMS4xIFRvUHJpbWl0aXZlKGlucHV0IFssIFByZWZlcnJlZFR5cGVdKVxudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0Jyk7XG4vLyBpbnN0ZWFkIG9mIHRoZSBFUzYgc3BlYyB2ZXJzaW9uLCB3ZSBkaWRuJ3QgaW1wbGVtZW50IEBAdG9QcmltaXRpdmUgY2FzZVxuLy8gYW5kIHRoZSBzZWNvbmQgYXJndW1lbnQgLSBmbGFnIC0gcHJlZmVycmVkIHR5cGUgaXMgYSBzdHJpbmdcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQsIFMpe1xuICBpZighaXNPYmplY3QoaXQpKXJldHVybiBpdDtcbiAgdmFyIGZuLCB2YWw7XG4gIGlmKFMgJiYgdHlwZW9mIChmbiA9IGl0LnRvU3RyaW5nKSA9PSAnZnVuY3Rpb24nICYmICFpc09iamVjdCh2YWwgPSBmbi5jYWxsKGl0KSkpcmV0dXJuIHZhbDtcbiAgaWYodHlwZW9mIChmbiA9IGl0LnZhbHVlT2YpID09ICdmdW5jdGlvbicgJiYgIWlzT2JqZWN0KHZhbCA9IGZuLmNhbGwoaXQpKSlyZXR1cm4gdmFsO1xuICBpZighUyAmJiB0eXBlb2YgKGZuID0gaXQudG9TdHJpbmcpID09ICdmdW5jdGlvbicgJiYgIWlzT2JqZWN0KHZhbCA9IGZuLmNhbGwoaXQpKSlyZXR1cm4gdmFsO1xuICB0aHJvdyBUeXBlRXJyb3IoXCJDYW4ndCBjb252ZXJ0IG9iamVjdCB0byBwcmltaXRpdmUgdmFsdWVcIik7XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8tcHJpbWl0aXZlLmpzXG4gKiogbW9kdWxlIGlkID0gMzRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDJcbiAqKi8iLCJ2YXIgZ2xvYmFsICAgICAgICAgPSByZXF1aXJlKCcuL19nbG9iYWwnKVxuICAsIGNvcmUgICAgICAgICAgID0gcmVxdWlyZSgnLi9fY29yZScpXG4gICwgTElCUkFSWSAgICAgICAgPSByZXF1aXJlKCcuL19saWJyYXJ5JylcbiAgLCB3a3NFeHQgICAgICAgICA9IHJlcXVpcmUoJy4vX3drcy1leHQnKVxuICAsIGRlZmluZVByb3BlcnR5ID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJykuZjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obmFtZSl7XG4gIHZhciAkU3ltYm9sID0gY29yZS5TeW1ib2wgfHwgKGNvcmUuU3ltYm9sID0gTElCUkFSWSA/IHt9IDogZ2xvYmFsLlN5bWJvbCB8fCB7fSk7XG4gIGlmKG5hbWUuY2hhckF0KDApICE9ICdfJyAmJiAhKG5hbWUgaW4gJFN5bWJvbCkpZGVmaW5lUHJvcGVydHkoJFN5bWJvbCwgbmFtZSwge3ZhbHVlOiB3a3NFeHQuZihuYW1lKX0pO1xufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3drcy1kZWZpbmUuanNcbiAqKiBtb2R1bGUgaWQgPSAzNVxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDEgMlxuICoqLyIsImV4cG9ydHMuZiA9IHJlcXVpcmUoJy4vX3drcycpO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fd2tzLWV4dC5qc1xuICoqIG1vZHVsZSBpZCA9IDM2XG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAyXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSAoX193ZWJwYWNrX3JlcXVpcmVfXygxKSkoNDIpO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZGVsZWdhdGVkIC4vbm9kZV9tb2R1bGVzLy4zLjguMUBpbW11dGFibGUvZGlzdC9pbW11dGFibGUuanMgZnJvbSBkbGwtcmVmZXJlbmNlIGxpYnNfbGliXG4gKiogbW9kdWxlIGlkID0gMzdcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxXG4gKiovIiwiLy8gQ29weXJpZ2h0IEpveWVudCwgSW5jLiBhbmQgb3RoZXIgTm9kZSBjb250cmlidXRvcnMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGFcbi8vIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGVcbi8vIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZ1xuLy8gd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLFxuLy8gZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdFxuLy8gcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlXG4vLyBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZFxuLy8gaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTU1xuLy8gT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRlxuLy8gTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTlxuLy8gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sXG4vLyBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1Jcbi8vIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEVcbi8vIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG5cbmZ1bmN0aW9uIEV2ZW50RW1pdHRlcigpIHtcbiAgdGhpcy5fZXZlbnRzID0gdGhpcy5fZXZlbnRzIHx8IHt9O1xuICB0aGlzLl9tYXhMaXN0ZW5lcnMgPSB0aGlzLl9tYXhMaXN0ZW5lcnMgfHwgdW5kZWZpbmVkO1xufVxubW9kdWxlLmV4cG9ydHMgPSBFdmVudEVtaXR0ZXI7XG5cbi8vIEJhY2t3YXJkcy1jb21wYXQgd2l0aCBub2RlIDAuMTAueFxuRXZlbnRFbWl0dGVyLkV2ZW50RW1pdHRlciA9IEV2ZW50RW1pdHRlcjtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5fZXZlbnRzID0gdW5kZWZpbmVkO1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5fbWF4TGlzdGVuZXJzID0gdW5kZWZpbmVkO1xuXG4vLyBCeSBkZWZhdWx0IEV2ZW50RW1pdHRlcnMgd2lsbCBwcmludCBhIHdhcm5pbmcgaWYgbW9yZSB0aGFuIDEwIGxpc3RlbmVycyBhcmVcbi8vIGFkZGVkIHRvIGl0LiBUaGlzIGlzIGEgdXNlZnVsIGRlZmF1bHQgd2hpY2ggaGVscHMgZmluZGluZyBtZW1vcnkgbGVha3MuXG5FdmVudEVtaXR0ZXIuZGVmYXVsdE1heExpc3RlbmVycyA9IDEwO1xuXG4vLyBPYnZpb3VzbHkgbm90IGFsbCBFbWl0dGVycyBzaG91bGQgYmUgbGltaXRlZCB0byAxMC4gVGhpcyBmdW5jdGlvbiBhbGxvd3Ncbi8vIHRoYXQgdG8gYmUgaW5jcmVhc2VkLiBTZXQgdG8gemVybyBmb3IgdW5saW1pdGVkLlxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5zZXRNYXhMaXN0ZW5lcnMgPSBmdW5jdGlvbihuKSB7XG4gIGlmICghaXNOdW1iZXIobikgfHwgbiA8IDAgfHwgaXNOYU4obikpXG4gICAgdGhyb3cgVHlwZUVycm9yKCduIG11c3QgYmUgYSBwb3NpdGl2ZSBudW1iZXInKTtcbiAgdGhpcy5fbWF4TGlzdGVuZXJzID0gbjtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmVtaXQgPSBmdW5jdGlvbih0eXBlKSB7XG4gIHZhciBlciwgaGFuZGxlciwgbGVuLCBhcmdzLCBpLCBsaXN0ZW5lcnM7XG5cbiAgaWYgKCF0aGlzLl9ldmVudHMpXG4gICAgdGhpcy5fZXZlbnRzID0ge307XG5cbiAgLy8gSWYgdGhlcmUgaXMgbm8gJ2Vycm9yJyBldmVudCBsaXN0ZW5lciB0aGVuIHRocm93LlxuICBpZiAodHlwZSA9PT0gJ2Vycm9yJykge1xuICAgIGlmICghdGhpcy5fZXZlbnRzLmVycm9yIHx8XG4gICAgICAgIChpc09iamVjdCh0aGlzLl9ldmVudHMuZXJyb3IpICYmICF0aGlzLl9ldmVudHMuZXJyb3IubGVuZ3RoKSkge1xuICAgICAgZXIgPSBhcmd1bWVudHNbMV07XG4gICAgICBpZiAoZXIgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgICB0aHJvdyBlcjsgLy8gVW5oYW5kbGVkICdlcnJvcicgZXZlbnRcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIEF0IGxlYXN0IGdpdmUgc29tZSBraW5kIG9mIGNvbnRleHQgdG8gdGhlIHVzZXJcbiAgICAgICAgdmFyIGVyciA9IG5ldyBFcnJvcignVW5jYXVnaHQsIHVuc3BlY2lmaWVkIFwiZXJyb3JcIiBldmVudC4gKCcgKyBlciArICcpJyk7XG4gICAgICAgIGVyci5jb250ZXh0ID0gZXI7XG4gICAgICAgIHRocm93IGVycjtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBoYW5kbGVyID0gdGhpcy5fZXZlbnRzW3R5cGVdO1xuXG4gIGlmIChpc1VuZGVmaW5lZChoYW5kbGVyKSlcbiAgICByZXR1cm4gZmFsc2U7XG5cbiAgaWYgKGlzRnVuY3Rpb24oaGFuZGxlcikpIHtcbiAgICBzd2l0Y2ggKGFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICAgIC8vIGZhc3QgY2FzZXNcbiAgICAgIGNhc2UgMTpcbiAgICAgICAgaGFuZGxlci5jYWxsKHRoaXMpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMjpcbiAgICAgICAgaGFuZGxlci5jYWxsKHRoaXMsIGFyZ3VtZW50c1sxXSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAzOlxuICAgICAgICBoYW5kbGVyLmNhbGwodGhpcywgYXJndW1lbnRzWzFdLCBhcmd1bWVudHNbMl0pO1xuICAgICAgICBicmVhaztcbiAgICAgIC8vIHNsb3dlclxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7XG4gICAgICAgIGhhbmRsZXIuYXBwbHkodGhpcywgYXJncyk7XG4gICAgfVxuICB9IGVsc2UgaWYgKGlzT2JqZWN0KGhhbmRsZXIpKSB7XG4gICAgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7XG4gICAgbGlzdGVuZXJzID0gaGFuZGxlci5zbGljZSgpO1xuICAgIGxlbiA9IGxpc3RlbmVycy5sZW5ndGg7XG4gICAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSsrKVxuICAgICAgbGlzdGVuZXJzW2ldLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmFkZExpc3RlbmVyID0gZnVuY3Rpb24odHlwZSwgbGlzdGVuZXIpIHtcbiAgdmFyIG07XG5cbiAgaWYgKCFpc0Z1bmN0aW9uKGxpc3RlbmVyKSlcbiAgICB0aHJvdyBUeXBlRXJyb3IoJ2xpc3RlbmVyIG11c3QgYmUgYSBmdW5jdGlvbicpO1xuXG4gIGlmICghdGhpcy5fZXZlbnRzKVxuICAgIHRoaXMuX2V2ZW50cyA9IHt9O1xuXG4gIC8vIFRvIGF2b2lkIHJlY3Vyc2lvbiBpbiB0aGUgY2FzZSB0aGF0IHR5cGUgPT09IFwibmV3TGlzdGVuZXJcIiEgQmVmb3JlXG4gIC8vIGFkZGluZyBpdCB0byB0aGUgbGlzdGVuZXJzLCBmaXJzdCBlbWl0IFwibmV3TGlzdGVuZXJcIi5cbiAgaWYgKHRoaXMuX2V2ZW50cy5uZXdMaXN0ZW5lcilcbiAgICB0aGlzLmVtaXQoJ25ld0xpc3RlbmVyJywgdHlwZSxcbiAgICAgICAgICAgICAgaXNGdW5jdGlvbihsaXN0ZW5lci5saXN0ZW5lcikgP1xuICAgICAgICAgICAgICBsaXN0ZW5lci5saXN0ZW5lciA6IGxpc3RlbmVyKTtcblxuICBpZiAoIXRoaXMuX2V2ZW50c1t0eXBlXSlcbiAgICAvLyBPcHRpbWl6ZSB0aGUgY2FzZSBvZiBvbmUgbGlzdGVuZXIuIERvbid0IG5lZWQgdGhlIGV4dHJhIGFycmF5IG9iamVjdC5cbiAgICB0aGlzLl9ldmVudHNbdHlwZV0gPSBsaXN0ZW5lcjtcbiAgZWxzZSBpZiAoaXNPYmplY3QodGhpcy5fZXZlbnRzW3R5cGVdKSlcbiAgICAvLyBJZiB3ZSd2ZSBhbHJlYWR5IGdvdCBhbiBhcnJheSwganVzdCBhcHBlbmQuXG4gICAgdGhpcy5fZXZlbnRzW3R5cGVdLnB1c2gobGlzdGVuZXIpO1xuICBlbHNlXG4gICAgLy8gQWRkaW5nIHRoZSBzZWNvbmQgZWxlbWVudCwgbmVlZCB0byBjaGFuZ2UgdG8gYXJyYXkuXG4gICAgdGhpcy5fZXZlbnRzW3R5cGVdID0gW3RoaXMuX2V2ZW50c1t0eXBlXSwgbGlzdGVuZXJdO1xuXG4gIC8vIENoZWNrIGZvciBsaXN0ZW5lciBsZWFrXG4gIGlmIChpc09iamVjdCh0aGlzLl9ldmVudHNbdHlwZV0pICYmICF0aGlzLl9ldmVudHNbdHlwZV0ud2FybmVkKSB7XG4gICAgaWYgKCFpc1VuZGVmaW5lZCh0aGlzLl9tYXhMaXN0ZW5lcnMpKSB7XG4gICAgICBtID0gdGhpcy5fbWF4TGlzdGVuZXJzO1xuICAgIH0gZWxzZSB7XG4gICAgICBtID0gRXZlbnRFbWl0dGVyLmRlZmF1bHRNYXhMaXN0ZW5lcnM7XG4gICAgfVxuXG4gICAgaWYgKG0gJiYgbSA+IDAgJiYgdGhpcy5fZXZlbnRzW3R5cGVdLmxlbmd0aCA+IG0pIHtcbiAgICAgIHRoaXMuX2V2ZW50c1t0eXBlXS53YXJuZWQgPSB0cnVlO1xuICAgICAgY29uc29sZS5lcnJvcignKG5vZGUpIHdhcm5pbmc6IHBvc3NpYmxlIEV2ZW50RW1pdHRlciBtZW1vcnkgJyArXG4gICAgICAgICAgICAgICAgICAgICdsZWFrIGRldGVjdGVkLiAlZCBsaXN0ZW5lcnMgYWRkZWQuICcgK1xuICAgICAgICAgICAgICAgICAgICAnVXNlIGVtaXR0ZXIuc2V0TWF4TGlzdGVuZXJzKCkgdG8gaW5jcmVhc2UgbGltaXQuJyxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZXZlbnRzW3R5cGVdLmxlbmd0aCk7XG4gICAgICBpZiAodHlwZW9mIGNvbnNvbGUudHJhY2UgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgLy8gbm90IHN1cHBvcnRlZCBpbiBJRSAxMFxuICAgICAgICBjb25zb2xlLnRyYWNlKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uID0gRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5hZGRMaXN0ZW5lcjtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vbmNlID0gZnVuY3Rpb24odHlwZSwgbGlzdGVuZXIpIHtcbiAgaWYgKCFpc0Z1bmN0aW9uKGxpc3RlbmVyKSlcbiAgICB0aHJvdyBUeXBlRXJyb3IoJ2xpc3RlbmVyIG11c3QgYmUgYSBmdW5jdGlvbicpO1xuXG4gIHZhciBmaXJlZCA9IGZhbHNlO1xuXG4gIGZ1bmN0aW9uIGcoKSB7XG4gICAgdGhpcy5yZW1vdmVMaXN0ZW5lcih0eXBlLCBnKTtcblxuICAgIGlmICghZmlyZWQpIHtcbiAgICAgIGZpcmVkID0gdHJ1ZTtcbiAgICAgIGxpc3RlbmVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfVxuICB9XG5cbiAgZy5saXN0ZW5lciA9IGxpc3RlbmVyO1xuICB0aGlzLm9uKHR5cGUsIGcpO1xuXG4gIHJldHVybiB0aGlzO1xufTtcblxuLy8gZW1pdHMgYSAncmVtb3ZlTGlzdGVuZXInIGV2ZW50IGlmZiB0aGUgbGlzdGVuZXIgd2FzIHJlbW92ZWRcbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucmVtb3ZlTGlzdGVuZXIgPSBmdW5jdGlvbih0eXBlLCBsaXN0ZW5lcikge1xuICB2YXIgbGlzdCwgcG9zaXRpb24sIGxlbmd0aCwgaTtcblxuICBpZiAoIWlzRnVuY3Rpb24obGlzdGVuZXIpKVxuICAgIHRocm93IFR5cGVFcnJvcignbGlzdGVuZXIgbXVzdCBiZSBhIGZ1bmN0aW9uJyk7XG5cbiAgaWYgKCF0aGlzLl9ldmVudHMgfHwgIXRoaXMuX2V2ZW50c1t0eXBlXSlcbiAgICByZXR1cm4gdGhpcztcblxuICBsaXN0ID0gdGhpcy5fZXZlbnRzW3R5cGVdO1xuICBsZW5ndGggPSBsaXN0Lmxlbmd0aDtcbiAgcG9zaXRpb24gPSAtMTtcblxuICBpZiAobGlzdCA9PT0gbGlzdGVuZXIgfHxcbiAgICAgIChpc0Z1bmN0aW9uKGxpc3QubGlzdGVuZXIpICYmIGxpc3QubGlzdGVuZXIgPT09IGxpc3RlbmVyKSkge1xuICAgIGRlbGV0ZSB0aGlzLl9ldmVudHNbdHlwZV07XG4gICAgaWYgKHRoaXMuX2V2ZW50cy5yZW1vdmVMaXN0ZW5lcilcbiAgICAgIHRoaXMuZW1pdCgncmVtb3ZlTGlzdGVuZXInLCB0eXBlLCBsaXN0ZW5lcik7XG5cbiAgfSBlbHNlIGlmIChpc09iamVjdChsaXN0KSkge1xuICAgIGZvciAoaSA9IGxlbmd0aDsgaS0tID4gMDspIHtcbiAgICAgIGlmIChsaXN0W2ldID09PSBsaXN0ZW5lciB8fFxuICAgICAgICAgIChsaXN0W2ldLmxpc3RlbmVyICYmIGxpc3RbaV0ubGlzdGVuZXIgPT09IGxpc3RlbmVyKSkge1xuICAgICAgICBwb3NpdGlvbiA9IGk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChwb3NpdGlvbiA8IDApXG4gICAgICByZXR1cm4gdGhpcztcblxuICAgIGlmIChsaXN0Lmxlbmd0aCA9PT0gMSkge1xuICAgICAgbGlzdC5sZW5ndGggPSAwO1xuICAgICAgZGVsZXRlIHRoaXMuX2V2ZW50c1t0eXBlXTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGlzdC5zcGxpY2UocG9zaXRpb24sIDEpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLl9ldmVudHMucmVtb3ZlTGlzdGVuZXIpXG4gICAgICB0aGlzLmVtaXQoJ3JlbW92ZUxpc3RlbmVyJywgdHlwZSwgbGlzdGVuZXIpO1xuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUFsbExpc3RlbmVycyA9IGZ1bmN0aW9uKHR5cGUpIHtcbiAgdmFyIGtleSwgbGlzdGVuZXJzO1xuXG4gIGlmICghdGhpcy5fZXZlbnRzKVxuICAgIHJldHVybiB0aGlzO1xuXG4gIC8vIG5vdCBsaXN0ZW5pbmcgZm9yIHJlbW92ZUxpc3RlbmVyLCBubyBuZWVkIHRvIGVtaXRcbiAgaWYgKCF0aGlzLl9ldmVudHMucmVtb3ZlTGlzdGVuZXIpIHtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMClcbiAgICAgIHRoaXMuX2V2ZW50cyA9IHt9O1xuICAgIGVsc2UgaWYgKHRoaXMuX2V2ZW50c1t0eXBlXSlcbiAgICAgIGRlbGV0ZSB0aGlzLl9ldmVudHNbdHlwZV07XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvLyBlbWl0IHJlbW92ZUxpc3RlbmVyIGZvciBhbGwgbGlzdGVuZXJzIG9uIGFsbCBldmVudHNcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApIHtcbiAgICBmb3IgKGtleSBpbiB0aGlzLl9ldmVudHMpIHtcbiAgICAgIGlmIChrZXkgPT09ICdyZW1vdmVMaXN0ZW5lcicpIGNvbnRpbnVlO1xuICAgICAgdGhpcy5yZW1vdmVBbGxMaXN0ZW5lcnMoa2V5KTtcbiAgICB9XG4gICAgdGhpcy5yZW1vdmVBbGxMaXN0ZW5lcnMoJ3JlbW92ZUxpc3RlbmVyJyk7XG4gICAgdGhpcy5fZXZlbnRzID0ge307XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBsaXN0ZW5lcnMgPSB0aGlzLl9ldmVudHNbdHlwZV07XG5cbiAgaWYgKGlzRnVuY3Rpb24obGlzdGVuZXJzKSkge1xuICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIodHlwZSwgbGlzdGVuZXJzKTtcbiAgfSBlbHNlIGlmIChsaXN0ZW5lcnMpIHtcbiAgICAvLyBMSUZPIG9yZGVyXG4gICAgd2hpbGUgKGxpc3RlbmVycy5sZW5ndGgpXG4gICAgICB0aGlzLnJlbW92ZUxpc3RlbmVyKHR5cGUsIGxpc3RlbmVyc1tsaXN0ZW5lcnMubGVuZ3RoIC0gMV0pO1xuICB9XG4gIGRlbGV0ZSB0aGlzLl9ldmVudHNbdHlwZV07XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmxpc3RlbmVycyA9IGZ1bmN0aW9uKHR5cGUpIHtcbiAgdmFyIHJldDtcbiAgaWYgKCF0aGlzLl9ldmVudHMgfHwgIXRoaXMuX2V2ZW50c1t0eXBlXSlcbiAgICByZXQgPSBbXTtcbiAgZWxzZSBpZiAoaXNGdW5jdGlvbih0aGlzLl9ldmVudHNbdHlwZV0pKVxuICAgIHJldCA9IFt0aGlzLl9ldmVudHNbdHlwZV1dO1xuICBlbHNlXG4gICAgcmV0ID0gdGhpcy5fZXZlbnRzW3R5cGVdLnNsaWNlKCk7XG4gIHJldHVybiByZXQ7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmxpc3RlbmVyQ291bnQgPSBmdW5jdGlvbih0eXBlKSB7XG4gIGlmICh0aGlzLl9ldmVudHMpIHtcbiAgICB2YXIgZXZsaXN0ZW5lciA9IHRoaXMuX2V2ZW50c1t0eXBlXTtcblxuICAgIGlmIChpc0Z1bmN0aW9uKGV2bGlzdGVuZXIpKVxuICAgICAgcmV0dXJuIDE7XG4gICAgZWxzZSBpZiAoZXZsaXN0ZW5lcilcbiAgICAgIHJldHVybiBldmxpc3RlbmVyLmxlbmd0aDtcbiAgfVxuICByZXR1cm4gMDtcbn07XG5cbkV2ZW50RW1pdHRlci5saXN0ZW5lckNvdW50ID0gZnVuY3Rpb24oZW1pdHRlciwgdHlwZSkge1xuICByZXR1cm4gZW1pdHRlci5saXN0ZW5lckNvdW50KHR5cGUpO1xufTtcblxuZnVuY3Rpb24gaXNGdW5jdGlvbihhcmcpIHtcbiAgcmV0dXJuIHR5cGVvZiBhcmcgPT09ICdmdW5jdGlvbic7XG59XG5cbmZ1bmN0aW9uIGlzTnVtYmVyKGFyZykge1xuICByZXR1cm4gdHlwZW9mIGFyZyA9PT0gJ251bWJlcic7XG59XG5cbmZ1bmN0aW9uIGlzT2JqZWN0KGFyZykge1xuICByZXR1cm4gdHlwZW9mIGFyZyA9PT0gJ29iamVjdCcgJiYgYXJnICE9PSBudWxsO1xufVxuXG5mdW5jdGlvbiBpc1VuZGVmaW5lZChhcmcpIHtcbiAgcmV0dXJuIGFyZyA9PT0gdm9pZCAwO1xufVxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vLjEuMS4xQGV2ZW50cy9ldmVudHMuanNcbiAqKiBtb2R1bGUgaWQgPSAzOFxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDEgMlxuICoqLyIsInZhciB0b1N0cmluZyA9IHt9LnRvU3RyaW5nO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwoaXQpLnNsaWNlKDgsIC0xKTtcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jb2YuanNcbiAqKiBtb2R1bGUgaWQgPSAzOVxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDEgMlxuICoqLyIsIi8vIG9wdGlvbmFsIC8gc2ltcGxlIGNvbnRleHQgYmluZGluZ1xudmFyIGFGdW5jdGlvbiA9IHJlcXVpcmUoJy4vX2EtZnVuY3Rpb24nKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oZm4sIHRoYXQsIGxlbmd0aCl7XG4gIGFGdW5jdGlvbihmbik7XG4gIGlmKHRoYXQgPT09IHVuZGVmaW5lZClyZXR1cm4gZm47XG4gIHN3aXRjaChsZW5ndGgpe1xuICAgIGNhc2UgMTogcmV0dXJuIGZ1bmN0aW9uKGEpe1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhhdCwgYSk7XG4gICAgfTtcbiAgICBjYXNlIDI6IHJldHVybiBmdW5jdGlvbihhLCBiKXtcbiAgICAgIHJldHVybiBmbi5jYWxsKHRoYXQsIGEsIGIpO1xuICAgIH07XG4gICAgY2FzZSAzOiByZXR1cm4gZnVuY3Rpb24oYSwgYiwgYyl7XG4gICAgICByZXR1cm4gZm4uY2FsbCh0aGF0LCBhLCBiLCBjKTtcbiAgICB9O1xuICB9XG4gIHJldHVybiBmdW5jdGlvbigvKiAuLi5hcmdzICovKXtcbiAgICByZXR1cm4gZm4uYXBwbHkodGhhdCwgYXJndW1lbnRzKTtcbiAgfTtcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jdHguanNcbiAqKiBtb2R1bGUgaWQgPSA0MFxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDEgMlxuICoqLyIsInZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpXG4gICwgZG9jdW1lbnQgPSByZXF1aXJlKCcuL19nbG9iYWwnKS5kb2N1bWVudFxuICAvLyBpbiBvbGQgSUUgdHlwZW9mIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQgaXMgJ29iamVjdCdcbiAgLCBpcyA9IGlzT2JqZWN0KGRvY3VtZW50KSAmJiBpc09iamVjdChkb2N1bWVudC5jcmVhdGVFbGVtZW50KTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gaXMgPyBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGl0KSA6IHt9O1xufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2RvbS1jcmVhdGUuanNcbiAqKiBtb2R1bGUgaWQgPSA0MVxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDEgMlxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gIXJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgJiYgIXJlcXVpcmUoJy4vX2ZhaWxzJykoZnVuY3Rpb24oKXtcbiAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShyZXF1aXJlKCcuL19kb20tY3JlYXRlJykoJ2RpdicpLCAnYScsIHtnZXQ6IGZ1bmN0aW9uKCl7IHJldHVybiA3OyB9fSkuYSAhPSA3O1xufSk7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pZTgtZG9tLWRlZmluZS5qc1xuICoqIG1vZHVsZSBpZCA9IDQyXG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAyXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xudmFyIExJQlJBUlkgICAgICAgID0gcmVxdWlyZSgnLi9fbGlicmFyeScpXG4gICwgJGV4cG9ydCAgICAgICAgPSByZXF1aXJlKCcuL19leHBvcnQnKVxuICAsIHJlZGVmaW5lICAgICAgID0gcmVxdWlyZSgnLi9fcmVkZWZpbmUnKVxuICAsIGhpZGUgICAgICAgICAgID0gcmVxdWlyZSgnLi9faGlkZScpXG4gICwgaGFzICAgICAgICAgICAgPSByZXF1aXJlKCcuL19oYXMnKVxuICAsIEl0ZXJhdG9ycyAgICAgID0gcmVxdWlyZSgnLi9faXRlcmF0b3JzJylcbiAgLCAkaXRlckNyZWF0ZSAgICA9IHJlcXVpcmUoJy4vX2l0ZXItY3JlYXRlJylcbiAgLCBzZXRUb1N0cmluZ1RhZyA9IHJlcXVpcmUoJy4vX3NldC10by1zdHJpbmctdGFnJylcbiAgLCBnZXRQcm90b3R5cGVPZiA9IHJlcXVpcmUoJy4vX29iamVjdC1ncG8nKVxuICAsIElURVJBVE9SICAgICAgID0gcmVxdWlyZSgnLi9fd2tzJykoJ2l0ZXJhdG9yJylcbiAgLCBCVUdHWSAgICAgICAgICA9ICEoW10ua2V5cyAmJiAnbmV4dCcgaW4gW10ua2V5cygpKSAvLyBTYWZhcmkgaGFzIGJ1Z2d5IGl0ZXJhdG9ycyB3L28gYG5leHRgXG4gICwgRkZfSVRFUkFUT1IgICAgPSAnQEBpdGVyYXRvcidcbiAgLCBLRVlTICAgICAgICAgICA9ICdrZXlzJ1xuICAsIFZBTFVFUyAgICAgICAgID0gJ3ZhbHVlcyc7XG5cbnZhciByZXR1cm5UaGlzID0gZnVuY3Rpb24oKXsgcmV0dXJuIHRoaXM7IH07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oQmFzZSwgTkFNRSwgQ29uc3RydWN0b3IsIG5leHQsIERFRkFVTFQsIElTX1NFVCwgRk9SQ0VEKXtcbiAgJGl0ZXJDcmVhdGUoQ29uc3RydWN0b3IsIE5BTUUsIG5leHQpO1xuICB2YXIgZ2V0TWV0aG9kID0gZnVuY3Rpb24oa2luZCl7XG4gICAgaWYoIUJVR0dZICYmIGtpbmQgaW4gcHJvdG8pcmV0dXJuIHByb3RvW2tpbmRdO1xuICAgIHN3aXRjaChraW5kKXtcbiAgICAgIGNhc2UgS0VZUzogcmV0dXJuIGZ1bmN0aW9uIGtleXMoKXsgcmV0dXJuIG5ldyBDb25zdHJ1Y3Rvcih0aGlzLCBraW5kKTsgfTtcbiAgICAgIGNhc2UgVkFMVUVTOiByZXR1cm4gZnVuY3Rpb24gdmFsdWVzKCl7IHJldHVybiBuZXcgQ29uc3RydWN0b3IodGhpcywga2luZCk7IH07XG4gICAgfSByZXR1cm4gZnVuY3Rpb24gZW50cmllcygpeyByZXR1cm4gbmV3IENvbnN0cnVjdG9yKHRoaXMsIGtpbmQpOyB9O1xuICB9O1xuICB2YXIgVEFHICAgICAgICA9IE5BTUUgKyAnIEl0ZXJhdG9yJ1xuICAgICwgREVGX1ZBTFVFUyA9IERFRkFVTFQgPT0gVkFMVUVTXG4gICAgLCBWQUxVRVNfQlVHID0gZmFsc2VcbiAgICAsIHByb3RvICAgICAgPSBCYXNlLnByb3RvdHlwZVxuICAgICwgJG5hdGl2ZSAgICA9IHByb3RvW0lURVJBVE9SXSB8fCBwcm90b1tGRl9JVEVSQVRPUl0gfHwgREVGQVVMVCAmJiBwcm90b1tERUZBVUxUXVxuICAgICwgJGRlZmF1bHQgICA9ICRuYXRpdmUgfHwgZ2V0TWV0aG9kKERFRkFVTFQpXG4gICAgLCAkZW50cmllcyAgID0gREVGQVVMVCA/ICFERUZfVkFMVUVTID8gJGRlZmF1bHQgOiBnZXRNZXRob2QoJ2VudHJpZXMnKSA6IHVuZGVmaW5lZFxuICAgICwgJGFueU5hdGl2ZSA9IE5BTUUgPT0gJ0FycmF5JyA/IHByb3RvLmVudHJpZXMgfHwgJG5hdGl2ZSA6ICRuYXRpdmVcbiAgICAsIG1ldGhvZHMsIGtleSwgSXRlcmF0b3JQcm90b3R5cGU7XG4gIC8vIEZpeCBuYXRpdmVcbiAgaWYoJGFueU5hdGl2ZSl7XG4gICAgSXRlcmF0b3JQcm90b3R5cGUgPSBnZXRQcm90b3R5cGVPZigkYW55TmF0aXZlLmNhbGwobmV3IEJhc2UpKTtcbiAgICBpZihJdGVyYXRvclByb3RvdHlwZSAhPT0gT2JqZWN0LnByb3RvdHlwZSl7XG4gICAgICAvLyBTZXQgQEB0b1N0cmluZ1RhZyB0byBuYXRpdmUgaXRlcmF0b3JzXG4gICAgICBzZXRUb1N0cmluZ1RhZyhJdGVyYXRvclByb3RvdHlwZSwgVEFHLCB0cnVlKTtcbiAgICAgIC8vIGZpeCBmb3Igc29tZSBvbGQgZW5naW5lc1xuICAgICAgaWYoIUxJQlJBUlkgJiYgIWhhcyhJdGVyYXRvclByb3RvdHlwZSwgSVRFUkFUT1IpKWhpZGUoSXRlcmF0b3JQcm90b3R5cGUsIElURVJBVE9SLCByZXR1cm5UaGlzKTtcbiAgICB9XG4gIH1cbiAgLy8gZml4IEFycmF5I3t2YWx1ZXMsIEBAaXRlcmF0b3J9Lm5hbWUgaW4gVjggLyBGRlxuICBpZihERUZfVkFMVUVTICYmICRuYXRpdmUgJiYgJG5hdGl2ZS5uYW1lICE9PSBWQUxVRVMpe1xuICAgIFZBTFVFU19CVUcgPSB0cnVlO1xuICAgICRkZWZhdWx0ID0gZnVuY3Rpb24gdmFsdWVzKCl7IHJldHVybiAkbmF0aXZlLmNhbGwodGhpcyk7IH07XG4gIH1cbiAgLy8gRGVmaW5lIGl0ZXJhdG9yXG4gIGlmKCghTElCUkFSWSB8fCBGT1JDRUQpICYmIChCVUdHWSB8fCBWQUxVRVNfQlVHIHx8ICFwcm90b1tJVEVSQVRPUl0pKXtcbiAgICBoaWRlKHByb3RvLCBJVEVSQVRPUiwgJGRlZmF1bHQpO1xuICB9XG4gIC8vIFBsdWcgZm9yIGxpYnJhcnlcbiAgSXRlcmF0b3JzW05BTUVdID0gJGRlZmF1bHQ7XG4gIEl0ZXJhdG9yc1tUQUddICA9IHJldHVyblRoaXM7XG4gIGlmKERFRkFVTFQpe1xuICAgIG1ldGhvZHMgPSB7XG4gICAgICB2YWx1ZXM6ICBERUZfVkFMVUVTID8gJGRlZmF1bHQgOiBnZXRNZXRob2QoVkFMVUVTKSxcbiAgICAgIGtleXM6ICAgIElTX1NFVCAgICAgPyAkZGVmYXVsdCA6IGdldE1ldGhvZChLRVlTKSxcbiAgICAgIGVudHJpZXM6ICRlbnRyaWVzXG4gICAgfTtcbiAgICBpZihGT1JDRUQpZm9yKGtleSBpbiBtZXRob2RzKXtcbiAgICAgIGlmKCEoa2V5IGluIHByb3RvKSlyZWRlZmluZShwcm90bywga2V5LCBtZXRob2RzW2tleV0pO1xuICAgIH0gZWxzZSAkZXhwb3J0KCRleHBvcnQuUCArICRleHBvcnQuRiAqIChCVUdHWSB8fCBWQUxVRVNfQlVHKSwgTkFNRSwgbWV0aG9kcyk7XG4gIH1cbiAgcmV0dXJuIG1ldGhvZHM7XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXRlci1kZWZpbmUuanNcbiAqKiBtb2R1bGUgaWQgPSA0M1xuICoqIG1vZHVsZSBjaHVua3MgPSAwIDEgMlxuICoqLyIsInZhciBwSUUgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1waWUnKVxuICAsIGNyZWF0ZURlc2MgICAgID0gcmVxdWlyZSgnLi9fcHJvcGVydHktZGVzYycpXG4gICwgdG9JT2JqZWN0ICAgICAgPSByZXF1aXJlKCcuL190by1pb2JqZWN0JylcbiAgLCB0b1ByaW1pdGl2ZSAgICA9IHJlcXVpcmUoJy4vX3RvLXByaW1pdGl2ZScpXG4gICwgaGFzICAgICAgICAgICAgPSByZXF1aXJlKCcuL19oYXMnKVxuICAsIElFOF9ET01fREVGSU5FID0gcmVxdWlyZSgnLi9faWU4LWRvbS1kZWZpbmUnKVxuICAsIGdPUEQgICAgICAgICAgID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcjtcblxuZXhwb3J0cy5mID0gcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSA/IGdPUEQgOiBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoTywgUCl7XG4gIE8gPSB0b0lPYmplY3QoTyk7XG4gIFAgPSB0b1ByaW1pdGl2ZShQLCB0cnVlKTtcbiAgaWYoSUU4X0RPTV9ERUZJTkUpdHJ5IHtcbiAgICByZXR1cm4gZ09QRChPLCBQKTtcbiAgfSBjYXRjaChlKXsgLyogZW1wdHkgKi8gfVxuICBpZihoYXMoTywgUCkpcmV0dXJuIGNyZWF0ZURlc2MoIXBJRS5mLmNhbGwoTywgUCksIE9bUF0pO1xufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1nb3BkLmpzXG4gKiogbW9kdWxlIGlkID0gNDRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDJcbiAqKi8iLCIvLyAxOS4xLjIuNyAvIDE1LjIuMy40IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKE8pXG52YXIgJGtleXMgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1rZXlzLWludGVybmFsJylcbiAgLCBoaWRkZW5LZXlzID0gcmVxdWlyZSgnLi9fZW51bS1idWcta2V5cycpLmNvbmNhdCgnbGVuZ3RoJywgJ3Byb3RvdHlwZScpO1xuXG5leHBvcnRzLmYgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyB8fCBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eU5hbWVzKE8pe1xuICByZXR1cm4gJGtleXMoTywgaGlkZGVuS2V5cyk7XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWdvcG4uanNcbiAqKiBtb2R1bGUgaWQgPSA0NVxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDEgMlxuICoqLyIsImV4cG9ydHMuZiA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHM7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZ29wcy5qc1xuICoqIG1vZHVsZSBpZCA9IDQ2XG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAyXG4gKiovIiwidmFyIGhhcyAgICAgICAgICA9IHJlcXVpcmUoJy4vX2hhcycpXG4gICwgdG9JT2JqZWN0ICAgID0gcmVxdWlyZSgnLi9fdG8taW9iamVjdCcpXG4gICwgYXJyYXlJbmRleE9mID0gcmVxdWlyZSgnLi9fYXJyYXktaW5jbHVkZXMnKShmYWxzZSlcbiAgLCBJRV9QUk9UTyAgICAgPSByZXF1aXJlKCcuL19zaGFyZWQta2V5JykoJ0lFX1BST1RPJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24ob2JqZWN0LCBuYW1lcyl7XG4gIHZhciBPICAgICAgPSB0b0lPYmplY3Qob2JqZWN0KVxuICAgICwgaSAgICAgID0gMFxuICAgICwgcmVzdWx0ID0gW11cbiAgICAsIGtleTtcbiAgZm9yKGtleSBpbiBPKWlmKGtleSAhPSBJRV9QUk9UTyloYXMoTywga2V5KSAmJiByZXN1bHQucHVzaChrZXkpO1xuICAvLyBEb24ndCBlbnVtIGJ1ZyAmIGhpZGRlbiBrZXlzXG4gIHdoaWxlKG5hbWVzLmxlbmd0aCA+IGkpaWYoaGFzKE8sIGtleSA9IG5hbWVzW2krK10pKXtcbiAgICB+YXJyYXlJbmRleE9mKHJlc3VsdCwga2V5KSB8fCByZXN1bHQucHVzaChrZXkpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWtleXMtaW50ZXJuYWwuanNcbiAqKiBtb2R1bGUgaWQgPSA0N1xuICoqIG1vZHVsZSBjaHVua3MgPSAwIDEgMlxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9faGlkZScpO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fcmVkZWZpbmUuanNcbiAqKiBtb2R1bGUgaWQgPSA0OFxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDEgMlxuICoqLyIsIid1c2Ugc3RyaWN0Jztcbi8vIEVDTUFTY3JpcHQgNiBzeW1ib2xzIHNoaW1cbnZhciBnbG9iYWwgICAgICAgICA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpXG4gICwgaGFzICAgICAgICAgICAgPSByZXF1aXJlKCcuL19oYXMnKVxuICAsIERFU0NSSVBUT1JTICAgID0gcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKVxuICAsICRleHBvcnQgICAgICAgID0gcmVxdWlyZSgnLi9fZXhwb3J0JylcbiAgLCByZWRlZmluZSAgICAgICA9IHJlcXVpcmUoJy4vX3JlZGVmaW5lJylcbiAgLCBNRVRBICAgICAgICAgICA9IHJlcXVpcmUoJy4vX21ldGEnKS5LRVlcbiAgLCAkZmFpbHMgICAgICAgICA9IHJlcXVpcmUoJy4vX2ZhaWxzJylcbiAgLCBzaGFyZWQgICAgICAgICA9IHJlcXVpcmUoJy4vX3NoYXJlZCcpXG4gICwgc2V0VG9TdHJpbmdUYWcgPSByZXF1aXJlKCcuL19zZXQtdG8tc3RyaW5nLXRhZycpXG4gICwgdWlkICAgICAgICAgICAgPSByZXF1aXJlKCcuL191aWQnKVxuICAsIHdrcyAgICAgICAgICAgID0gcmVxdWlyZSgnLi9fd2tzJylcbiAgLCB3a3NFeHQgICAgICAgICA9IHJlcXVpcmUoJy4vX3drcy1leHQnKVxuICAsIHdrc0RlZmluZSAgICAgID0gcmVxdWlyZSgnLi9fd2tzLWRlZmluZScpXG4gICwga2V5T2YgICAgICAgICAgPSByZXF1aXJlKCcuL19rZXlvZicpXG4gICwgZW51bUtleXMgICAgICAgPSByZXF1aXJlKCcuL19lbnVtLWtleXMnKVxuICAsIGlzQXJyYXkgICAgICAgID0gcmVxdWlyZSgnLi9faXMtYXJyYXknKVxuICAsIGFuT2JqZWN0ICAgICAgID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0JylcbiAgLCB0b0lPYmplY3QgICAgICA9IHJlcXVpcmUoJy4vX3RvLWlvYmplY3QnKVxuICAsIHRvUHJpbWl0aXZlICAgID0gcmVxdWlyZSgnLi9fdG8tcHJpbWl0aXZlJylcbiAgLCBjcmVhdGVEZXNjICAgICA9IHJlcXVpcmUoJy4vX3Byb3BlcnR5LWRlc2MnKVxuICAsIF9jcmVhdGUgICAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWNyZWF0ZScpXG4gICwgZ09QTkV4dCAgICAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtZ29wbi1leHQnKVxuICAsICRHT1BEICAgICAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWdvcGQnKVxuICAsICREUCAgICAgICAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJylcbiAgLCAka2V5cyAgICAgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1rZXlzJylcbiAgLCBnT1BEICAgICAgICAgICA9ICRHT1BELmZcbiAgLCBkUCAgICAgICAgICAgICA9ICREUC5mXG4gICwgZ09QTiAgICAgICAgICAgPSBnT1BORXh0LmZcbiAgLCAkU3ltYm9sICAgICAgICA9IGdsb2JhbC5TeW1ib2xcbiAgLCAkSlNPTiAgICAgICAgICA9IGdsb2JhbC5KU09OXG4gICwgX3N0cmluZ2lmeSAgICAgPSAkSlNPTiAmJiAkSlNPTi5zdHJpbmdpZnlcbiAgLCBQUk9UT1RZUEUgICAgICA9ICdwcm90b3R5cGUnXG4gICwgSElEREVOICAgICAgICAgPSB3a3MoJ19oaWRkZW4nKVxuICAsIFRPX1BSSU1JVElWRSAgID0gd2tzKCd0b1ByaW1pdGl2ZScpXG4gICwgaXNFbnVtICAgICAgICAgPSB7fS5wcm9wZXJ0eUlzRW51bWVyYWJsZVxuICAsIFN5bWJvbFJlZ2lzdHJ5ID0gc2hhcmVkKCdzeW1ib2wtcmVnaXN0cnknKVxuICAsIEFsbFN5bWJvbHMgICAgID0gc2hhcmVkKCdzeW1ib2xzJylcbiAgLCBPUFN5bWJvbHMgICAgICA9IHNoYXJlZCgnb3Atc3ltYm9scycpXG4gICwgT2JqZWN0UHJvdG8gICAgPSBPYmplY3RbUFJPVE9UWVBFXVxuICAsIFVTRV9OQVRJVkUgICAgID0gdHlwZW9mICRTeW1ib2wgPT0gJ2Z1bmN0aW9uJ1xuICAsIFFPYmplY3QgICAgICAgID0gZ2xvYmFsLlFPYmplY3Q7XG4vLyBEb24ndCB1c2Ugc2V0dGVycyBpbiBRdCBTY3JpcHQsIGh0dHBzOi8vZ2l0aHViLmNvbS96bG9pcm9jay9jb3JlLWpzL2lzc3Vlcy8xNzNcbnZhciBzZXR0ZXIgPSAhUU9iamVjdCB8fCAhUU9iamVjdFtQUk9UT1RZUEVdIHx8ICFRT2JqZWN0W1BST1RPVFlQRV0uZmluZENoaWxkO1xuXG4vLyBmYWxsYmFjayBmb3Igb2xkIEFuZHJvaWQsIGh0dHBzOi8vY29kZS5nb29nbGUuY29tL3AvdjgvaXNzdWVzL2RldGFpbD9pZD02ODdcbnZhciBzZXRTeW1ib2xEZXNjID0gREVTQ1JJUFRPUlMgJiYgJGZhaWxzKGZ1bmN0aW9uKCl7XG4gIHJldHVybiBfY3JlYXRlKGRQKHt9LCAnYScsIHtcbiAgICBnZXQ6IGZ1bmN0aW9uKCl7IHJldHVybiBkUCh0aGlzLCAnYScsIHt2YWx1ZTogN30pLmE7IH1cbiAgfSkpLmEgIT0gNztcbn0pID8gZnVuY3Rpb24oaXQsIGtleSwgRCl7XG4gIHZhciBwcm90b0Rlc2MgPSBnT1BEKE9iamVjdFByb3RvLCBrZXkpO1xuICBpZihwcm90b0Rlc2MpZGVsZXRlIE9iamVjdFByb3RvW2tleV07XG4gIGRQKGl0LCBrZXksIEQpO1xuICBpZihwcm90b0Rlc2MgJiYgaXQgIT09IE9iamVjdFByb3RvKWRQKE9iamVjdFByb3RvLCBrZXksIHByb3RvRGVzYyk7XG59IDogZFA7XG5cbnZhciB3cmFwID0gZnVuY3Rpb24odGFnKXtcbiAgdmFyIHN5bSA9IEFsbFN5bWJvbHNbdGFnXSA9IF9jcmVhdGUoJFN5bWJvbFtQUk9UT1RZUEVdKTtcbiAgc3ltLl9rID0gdGFnO1xuICByZXR1cm4gc3ltO1xufTtcblxudmFyIGlzU3ltYm9sID0gVVNFX05BVElWRSAmJiB0eXBlb2YgJFN5bWJvbC5pdGVyYXRvciA9PSAnc3ltYm9sJyA/IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIHR5cGVvZiBpdCA9PSAnc3ltYm9sJztcbn0gOiBmdW5jdGlvbihpdCl7XG4gIHJldHVybiBpdCBpbnN0YW5jZW9mICRTeW1ib2w7XG59O1xuXG52YXIgJGRlZmluZVByb3BlcnR5ID0gZnVuY3Rpb24gZGVmaW5lUHJvcGVydHkoaXQsIGtleSwgRCl7XG4gIGlmKGl0ID09PSBPYmplY3RQcm90bykkZGVmaW5lUHJvcGVydHkoT1BTeW1ib2xzLCBrZXksIEQpO1xuICBhbk9iamVjdChpdCk7XG4gIGtleSA9IHRvUHJpbWl0aXZlKGtleSwgdHJ1ZSk7XG4gIGFuT2JqZWN0KEQpO1xuICBpZihoYXMoQWxsU3ltYm9scywga2V5KSl7XG4gICAgaWYoIUQuZW51bWVyYWJsZSl7XG4gICAgICBpZighaGFzKGl0LCBISURERU4pKWRQKGl0LCBISURERU4sIGNyZWF0ZURlc2MoMSwge30pKTtcbiAgICAgIGl0W0hJRERFTl1ba2V5XSA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmKGhhcyhpdCwgSElEREVOKSAmJiBpdFtISURERU5dW2tleV0paXRbSElEREVOXVtrZXldID0gZmFsc2U7XG4gICAgICBEID0gX2NyZWF0ZShELCB7ZW51bWVyYWJsZTogY3JlYXRlRGVzYygwLCBmYWxzZSl9KTtcbiAgICB9IHJldHVybiBzZXRTeW1ib2xEZXNjKGl0LCBrZXksIEQpO1xuICB9IHJldHVybiBkUChpdCwga2V5LCBEKTtcbn07XG52YXIgJGRlZmluZVByb3BlcnRpZXMgPSBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKGl0LCBQKXtcbiAgYW5PYmplY3QoaXQpO1xuICB2YXIga2V5cyA9IGVudW1LZXlzKFAgPSB0b0lPYmplY3QoUCkpXG4gICAgLCBpICAgID0gMFxuICAgICwgbCA9IGtleXMubGVuZ3RoXG4gICAgLCBrZXk7XG4gIHdoaWxlKGwgPiBpKSRkZWZpbmVQcm9wZXJ0eShpdCwga2V5ID0ga2V5c1tpKytdLCBQW2tleV0pO1xuICByZXR1cm4gaXQ7XG59O1xudmFyICRjcmVhdGUgPSBmdW5jdGlvbiBjcmVhdGUoaXQsIFApe1xuICByZXR1cm4gUCA9PT0gdW5kZWZpbmVkID8gX2NyZWF0ZShpdCkgOiAkZGVmaW5lUHJvcGVydGllcyhfY3JlYXRlKGl0KSwgUCk7XG59O1xudmFyICRwcm9wZXJ0eUlzRW51bWVyYWJsZSA9IGZ1bmN0aW9uIHByb3BlcnR5SXNFbnVtZXJhYmxlKGtleSl7XG4gIHZhciBFID0gaXNFbnVtLmNhbGwodGhpcywga2V5ID0gdG9QcmltaXRpdmUoa2V5LCB0cnVlKSk7XG4gIGlmKHRoaXMgPT09IE9iamVjdFByb3RvICYmIGhhcyhBbGxTeW1ib2xzLCBrZXkpICYmICFoYXMoT1BTeW1ib2xzLCBrZXkpKXJldHVybiBmYWxzZTtcbiAgcmV0dXJuIEUgfHwgIWhhcyh0aGlzLCBrZXkpIHx8ICFoYXMoQWxsU3ltYm9scywga2V5KSB8fCBoYXModGhpcywgSElEREVOKSAmJiB0aGlzW0hJRERFTl1ba2V5XSA/IEUgOiB0cnVlO1xufTtcbnZhciAkZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yID0gZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKGl0LCBrZXkpe1xuICBpdCAgPSB0b0lPYmplY3QoaXQpO1xuICBrZXkgPSB0b1ByaW1pdGl2ZShrZXksIHRydWUpO1xuICBpZihpdCA9PT0gT2JqZWN0UHJvdG8gJiYgaGFzKEFsbFN5bWJvbHMsIGtleSkgJiYgIWhhcyhPUFN5bWJvbHMsIGtleSkpcmV0dXJuO1xuICB2YXIgRCA9IGdPUEQoaXQsIGtleSk7XG4gIGlmKEQgJiYgaGFzKEFsbFN5bWJvbHMsIGtleSkgJiYgIShoYXMoaXQsIEhJRERFTikgJiYgaXRbSElEREVOXVtrZXldKSlELmVudW1lcmFibGUgPSB0cnVlO1xuICByZXR1cm4gRDtcbn07XG52YXIgJGdldE93blByb3BlcnR5TmFtZXMgPSBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eU5hbWVzKGl0KXtcbiAgdmFyIG5hbWVzICA9IGdPUE4odG9JT2JqZWN0KGl0KSlcbiAgICAsIHJlc3VsdCA9IFtdXG4gICAgLCBpICAgICAgPSAwXG4gICAgLCBrZXk7XG4gIHdoaWxlKG5hbWVzLmxlbmd0aCA+IGkpe1xuICAgIGlmKCFoYXMoQWxsU3ltYm9scywga2V5ID0gbmFtZXNbaSsrXSkgJiYga2V5ICE9IEhJRERFTiAmJiBrZXkgIT0gTUVUQSlyZXN1bHQucHVzaChrZXkpO1xuICB9IHJldHVybiByZXN1bHQ7XG59O1xudmFyICRnZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPSBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eVN5bWJvbHMoaXQpe1xuICB2YXIgSVNfT1AgID0gaXQgPT09IE9iamVjdFByb3RvXG4gICAgLCBuYW1lcyAgPSBnT1BOKElTX09QID8gT1BTeW1ib2xzIDogdG9JT2JqZWN0KGl0KSlcbiAgICAsIHJlc3VsdCA9IFtdXG4gICAgLCBpICAgICAgPSAwXG4gICAgLCBrZXk7XG4gIHdoaWxlKG5hbWVzLmxlbmd0aCA+IGkpe1xuICAgIGlmKGhhcyhBbGxTeW1ib2xzLCBrZXkgPSBuYW1lc1tpKytdKSAmJiAoSVNfT1AgPyBoYXMoT2JqZWN0UHJvdG8sIGtleSkgOiB0cnVlKSlyZXN1bHQucHVzaChBbGxTeW1ib2xzW2tleV0pO1xuICB9IHJldHVybiByZXN1bHQ7XG59O1xuXG4vLyAxOS40LjEuMSBTeW1ib2woW2Rlc2NyaXB0aW9uXSlcbmlmKCFVU0VfTkFUSVZFKXtcbiAgJFN5bWJvbCA9IGZ1bmN0aW9uIFN5bWJvbCgpe1xuICAgIGlmKHRoaXMgaW5zdGFuY2VvZiAkU3ltYm9sKXRocm93IFR5cGVFcnJvcignU3ltYm9sIGlzIG5vdCBhIGNvbnN0cnVjdG9yIScpO1xuICAgIHZhciB0YWcgPSB1aWQoYXJndW1lbnRzLmxlbmd0aCA+IDAgPyBhcmd1bWVudHNbMF0gOiB1bmRlZmluZWQpO1xuICAgIHZhciAkc2V0ID0gZnVuY3Rpb24odmFsdWUpe1xuICAgICAgaWYodGhpcyA9PT0gT2JqZWN0UHJvdG8pJHNldC5jYWxsKE9QU3ltYm9scywgdmFsdWUpO1xuICAgICAgaWYoaGFzKHRoaXMsIEhJRERFTikgJiYgaGFzKHRoaXNbSElEREVOXSwgdGFnKSl0aGlzW0hJRERFTl1bdGFnXSA9IGZhbHNlO1xuICAgICAgc2V0U3ltYm9sRGVzYyh0aGlzLCB0YWcsIGNyZWF0ZURlc2MoMSwgdmFsdWUpKTtcbiAgICB9O1xuICAgIGlmKERFU0NSSVBUT1JTICYmIHNldHRlcilzZXRTeW1ib2xEZXNjKE9iamVjdFByb3RvLCB0YWcsIHtjb25maWd1cmFibGU6IHRydWUsIHNldDogJHNldH0pO1xuICAgIHJldHVybiB3cmFwKHRhZyk7XG4gIH07XG4gIHJlZGVmaW5lKCRTeW1ib2xbUFJPVE9UWVBFXSwgJ3RvU3RyaW5nJywgZnVuY3Rpb24gdG9TdHJpbmcoKXtcbiAgICByZXR1cm4gdGhpcy5faztcbiAgfSk7XG5cbiAgJEdPUEQuZiA9ICRnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I7XG4gICREUC5mICAgPSAkZGVmaW5lUHJvcGVydHk7XG4gIHJlcXVpcmUoJy4vX29iamVjdC1nb3BuJykuZiA9IGdPUE5FeHQuZiA9ICRnZXRPd25Qcm9wZXJ0eU5hbWVzO1xuICByZXF1aXJlKCcuL19vYmplY3QtcGllJykuZiAgPSAkcHJvcGVydHlJc0VudW1lcmFibGU7XG4gIHJlcXVpcmUoJy4vX29iamVjdC1nb3BzJykuZiA9ICRnZXRPd25Qcm9wZXJ0eVN5bWJvbHM7XG5cbiAgaWYoREVTQ1JJUFRPUlMgJiYgIXJlcXVpcmUoJy4vX2xpYnJhcnknKSl7XG4gICAgcmVkZWZpbmUoT2JqZWN0UHJvdG8sICdwcm9wZXJ0eUlzRW51bWVyYWJsZScsICRwcm9wZXJ0eUlzRW51bWVyYWJsZSwgdHJ1ZSk7XG4gIH1cblxuICB3a3NFeHQuZiA9IGZ1bmN0aW9uKG5hbWUpe1xuICAgIHJldHVybiB3cmFwKHdrcyhuYW1lKSk7XG4gIH1cbn1cblxuJGV4cG9ydCgkZXhwb3J0LkcgKyAkZXhwb3J0LlcgKyAkZXhwb3J0LkYgKiAhVVNFX05BVElWRSwge1N5bWJvbDogJFN5bWJvbH0pO1xuXG5mb3IodmFyIHN5bWJvbHMgPSAoXG4gIC8vIDE5LjQuMi4yLCAxOS40LjIuMywgMTkuNC4yLjQsIDE5LjQuMi42LCAxOS40LjIuOCwgMTkuNC4yLjksIDE5LjQuMi4xMCwgMTkuNC4yLjExLCAxOS40LjIuMTIsIDE5LjQuMi4xMywgMTkuNC4yLjE0XG4gICdoYXNJbnN0YW5jZSxpc0NvbmNhdFNwcmVhZGFibGUsaXRlcmF0b3IsbWF0Y2gscmVwbGFjZSxzZWFyY2gsc3BlY2llcyxzcGxpdCx0b1ByaW1pdGl2ZSx0b1N0cmluZ1RhZyx1bnNjb3BhYmxlcydcbikuc3BsaXQoJywnKSwgaSA9IDA7IHN5bWJvbHMubGVuZ3RoID4gaTsgKXdrcyhzeW1ib2xzW2krK10pO1xuXG5mb3IodmFyIHN5bWJvbHMgPSAka2V5cyh3a3Muc3RvcmUpLCBpID0gMDsgc3ltYm9scy5sZW5ndGggPiBpOyApd2tzRGVmaW5lKHN5bWJvbHNbaSsrXSk7XG5cbiRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogIVVTRV9OQVRJVkUsICdTeW1ib2wnLCB7XG4gIC8vIDE5LjQuMi4xIFN5bWJvbC5mb3Ioa2V5KVxuICAnZm9yJzogZnVuY3Rpb24oa2V5KXtcbiAgICByZXR1cm4gaGFzKFN5bWJvbFJlZ2lzdHJ5LCBrZXkgKz0gJycpXG4gICAgICA/IFN5bWJvbFJlZ2lzdHJ5W2tleV1cbiAgICAgIDogU3ltYm9sUmVnaXN0cnlba2V5XSA9ICRTeW1ib2woa2V5KTtcbiAgfSxcbiAgLy8gMTkuNC4yLjUgU3ltYm9sLmtleUZvcihzeW0pXG4gIGtleUZvcjogZnVuY3Rpb24ga2V5Rm9yKGtleSl7XG4gICAgaWYoaXNTeW1ib2woa2V5KSlyZXR1cm4ga2V5T2YoU3ltYm9sUmVnaXN0cnksIGtleSk7XG4gICAgdGhyb3cgVHlwZUVycm9yKGtleSArICcgaXMgbm90IGEgc3ltYm9sIScpO1xuICB9LFxuICB1c2VTZXR0ZXI6IGZ1bmN0aW9uKCl7IHNldHRlciA9IHRydWU7IH0sXG4gIHVzZVNpbXBsZTogZnVuY3Rpb24oKXsgc2V0dGVyID0gZmFsc2U7IH1cbn0pO1xuXG4kZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqICFVU0VfTkFUSVZFLCAnT2JqZWN0Jywge1xuICAvLyAxOS4xLjIuMiBPYmplY3QuY3JlYXRlKE8gWywgUHJvcGVydGllc10pXG4gIGNyZWF0ZTogJGNyZWF0ZSxcbiAgLy8gMTkuMS4yLjQgT2JqZWN0LmRlZmluZVByb3BlcnR5KE8sIFAsIEF0dHJpYnV0ZXMpXG4gIGRlZmluZVByb3BlcnR5OiAkZGVmaW5lUHJvcGVydHksXG4gIC8vIDE5LjEuMi4zIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKE8sIFByb3BlcnRpZXMpXG4gIGRlZmluZVByb3BlcnRpZXM6ICRkZWZpbmVQcm9wZXJ0aWVzLFxuICAvLyAxOS4xLjIuNiBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKE8sIFApXG4gIGdldE93blByb3BlcnR5RGVzY3JpcHRvcjogJGdldE93blByb3BlcnR5RGVzY3JpcHRvcixcbiAgLy8gMTkuMS4yLjcgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoTylcbiAgZ2V0T3duUHJvcGVydHlOYW1lczogJGdldE93blByb3BlcnR5TmFtZXMsXG4gIC8vIDE5LjEuMi44IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMoTylcbiAgZ2V0T3duUHJvcGVydHlTeW1ib2xzOiAkZ2V0T3duUHJvcGVydHlTeW1ib2xzXG59KTtcblxuLy8gMjQuMy4yIEpTT04uc3RyaW5naWZ5KHZhbHVlIFssIHJlcGxhY2VyIFssIHNwYWNlXV0pXG4kSlNPTiAmJiAkZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqICghVVNFX05BVElWRSB8fCAkZmFpbHMoZnVuY3Rpb24oKXtcbiAgdmFyIFMgPSAkU3ltYm9sKCk7XG4gIC8vIE1TIEVkZ2UgY29udmVydHMgc3ltYm9sIHZhbHVlcyB0byBKU09OIGFzIHt9XG4gIC8vIFdlYktpdCBjb252ZXJ0cyBzeW1ib2wgdmFsdWVzIHRvIEpTT04gYXMgbnVsbFxuICAvLyBWOCB0aHJvd3Mgb24gYm94ZWQgc3ltYm9sc1xuICByZXR1cm4gX3N0cmluZ2lmeShbU10pICE9ICdbbnVsbF0nIHx8IF9zdHJpbmdpZnkoe2E6IFN9KSAhPSAne30nIHx8IF9zdHJpbmdpZnkoT2JqZWN0KFMpKSAhPSAne30nO1xufSkpLCAnSlNPTicsIHtcbiAgc3RyaW5naWZ5OiBmdW5jdGlvbiBzdHJpbmdpZnkoaXQpe1xuICAgIGlmKGl0ID09PSB1bmRlZmluZWQgfHwgaXNTeW1ib2woaXQpKXJldHVybjsgLy8gSUU4IHJldHVybnMgc3RyaW5nIG9uIHVuZGVmaW5lZFxuICAgIHZhciBhcmdzID0gW2l0XVxuICAgICAgLCBpICAgID0gMVxuICAgICAgLCByZXBsYWNlciwgJHJlcGxhY2VyO1xuICAgIHdoaWxlKGFyZ3VtZW50cy5sZW5ndGggPiBpKWFyZ3MucHVzaChhcmd1bWVudHNbaSsrXSk7XG4gICAgcmVwbGFjZXIgPSBhcmdzWzFdO1xuICAgIGlmKHR5cGVvZiByZXBsYWNlciA9PSAnZnVuY3Rpb24nKSRyZXBsYWNlciA9IHJlcGxhY2VyO1xuICAgIGlmKCRyZXBsYWNlciB8fCAhaXNBcnJheShyZXBsYWNlcikpcmVwbGFjZXIgPSBmdW5jdGlvbihrZXksIHZhbHVlKXtcbiAgICAgIGlmKCRyZXBsYWNlcil2YWx1ZSA9ICRyZXBsYWNlci5jYWxsKHRoaXMsIGtleSwgdmFsdWUpO1xuICAgICAgaWYoIWlzU3ltYm9sKHZhbHVlKSlyZXR1cm4gdmFsdWU7XG4gICAgfTtcbiAgICBhcmdzWzFdID0gcmVwbGFjZXI7XG4gICAgcmV0dXJuIF9zdHJpbmdpZnkuYXBwbHkoJEpTT04sIGFyZ3MpO1xuICB9XG59KTtcblxuLy8gMTkuNC4zLjQgU3ltYm9sLnByb3RvdHlwZVtAQHRvUHJpbWl0aXZlXShoaW50KVxuJFN5bWJvbFtQUk9UT1RZUEVdW1RPX1BSSU1JVElWRV0gfHwgcmVxdWlyZSgnLi9faGlkZScpKCRTeW1ib2xbUFJPVE9UWVBFXSwgVE9fUFJJTUlUSVZFLCAkU3ltYm9sW1BST1RPVFlQRV0udmFsdWVPZik7XG4vLyAxOS40LjMuNSBTeW1ib2wucHJvdG90eXBlW0BAdG9TdHJpbmdUYWddXG5zZXRUb1N0cmluZ1RhZygkU3ltYm9sLCAnU3ltYm9sJyk7XG4vLyAyMC4yLjEuOSBNYXRoW0BAdG9TdHJpbmdUYWddXG5zZXRUb1N0cmluZ1RhZyhNYXRoLCAnTWF0aCcsIHRydWUpO1xuLy8gMjQuMy4zIEpTT05bQEB0b1N0cmluZ1RhZ11cbnNldFRvU3RyaW5nVGFnKGdsb2JhbC5KU09OLCAnSlNPTicsIHRydWUpO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYuc3ltYm9sLmpzXG4gKiogbW9kdWxlIGlkID0gNDlcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDJcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vc3ltYm9sXCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vLjYuMTEuNkBiYWJlbC1ydW50aW1lL2NvcmUtanMvc3ltYm9sLmpzXG4gKiogbW9kdWxlIGlkID0gNTBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDJcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IChfX3dlYnBhY2tfcmVxdWlyZV9fKDEpKSgzNDEpO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZGVsZWdhdGVkIC4vbm9kZV9tb2R1bGVzLy40LjQuNUByZWFjdC1yZWR1eC9saWIvaW5kZXguanMgZnJvbSBkbGwtcmVmZXJlbmNlIGxpYnNfbGliXG4gKiogbW9kdWxlIGlkID0gNTFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDJcbiAqKi8iLCJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxudmFyIF9mb3IgPSByZXF1aXJlKFwiLi4vY29yZS1qcy9zeW1ib2wvZm9yXCIpO1xuXG52YXIgX2ZvcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9mb3IpO1xuXG52YXIgX3N5bWJvbCA9IHJlcXVpcmUoXCIuLi9jb3JlLWpzL3N5bWJvbFwiKTtcblxudmFyIF9zeW1ib2wyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfc3ltYm9sKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZXhwb3J0cy5kZWZhdWx0ID0gZnVuY3Rpb24gKCkge1xuICB2YXIgUkVBQ1RfRUxFTUVOVF9UWVBFID0gdHlwZW9mIF9zeW1ib2wyLmRlZmF1bHQgPT09IFwiZnVuY3Rpb25cIiAmJiBfZm9yMi5kZWZhdWx0ICYmICgwLCBfZm9yMi5kZWZhdWx0KShcInJlYWN0LmVsZW1lbnRcIikgfHwgMHhlYWM3O1xuICByZXR1cm4gZnVuY3Rpb24gY3JlYXRlUmF3UmVhY3RFbGVtZW50KHR5cGUsIHByb3BzLCBrZXksIGNoaWxkcmVuKSB7XG4gICAgdmFyIGRlZmF1bHRQcm9wcyA9IHR5cGUgJiYgdHlwZS5kZWZhdWx0UHJvcHM7XG4gICAgdmFyIGNoaWxkcmVuTGVuZ3RoID0gYXJndW1lbnRzLmxlbmd0aCAtIDM7XG5cbiAgICBpZiAoIXByb3BzICYmIGNoaWxkcmVuTGVuZ3RoICE9PSAwKSB7XG4gICAgICBwcm9wcyA9IHt9O1xuICAgIH1cblxuICAgIGlmIChwcm9wcyAmJiBkZWZhdWx0UHJvcHMpIHtcbiAgICAgIGZvciAodmFyIHByb3BOYW1lIGluIGRlZmF1bHRQcm9wcykge1xuICAgICAgICBpZiAocHJvcHNbcHJvcE5hbWVdID09PSB2b2lkIDApIHtcbiAgICAgICAgICBwcm9wc1twcm9wTmFtZV0gPSBkZWZhdWx0UHJvcHNbcHJvcE5hbWVdO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICghcHJvcHMpIHtcbiAgICAgIHByb3BzID0gZGVmYXVsdFByb3BzIHx8IHt9O1xuICAgIH1cblxuICAgIGlmIChjaGlsZHJlbkxlbmd0aCA9PT0gMSkge1xuICAgICAgcHJvcHMuY2hpbGRyZW4gPSBjaGlsZHJlbjtcbiAgICB9IGVsc2UgaWYgKGNoaWxkcmVuTGVuZ3RoID4gMSkge1xuICAgICAgdmFyIGNoaWxkQXJyYXkgPSBBcnJheShjaGlsZHJlbkxlbmd0aCk7XG5cbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2hpbGRyZW5MZW5ndGg7IGkrKykge1xuICAgICAgICBjaGlsZEFycmF5W2ldID0gYXJndW1lbnRzW2kgKyAzXTtcbiAgICAgIH1cblxuICAgICAgcHJvcHMuY2hpbGRyZW4gPSBjaGlsZEFycmF5O1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAkJHR5cGVvZjogUkVBQ1RfRUxFTUVOVF9UWVBFLFxuICAgICAgdHlwZTogdHlwZSxcbiAgICAgIGtleToga2V5ID09PSB1bmRlZmluZWQgPyBudWxsIDogJycgKyBrZXksXG4gICAgICByZWY6IG51bGwsXG4gICAgICBwcm9wczogcHJvcHMsXG4gICAgICBfb3duZXI6IG51bGxcbiAgICB9O1xuICB9O1xufSgpO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+Ly42LjExLjZAYmFiZWwtcnVudGltZS9oZWxwZXJzL2pzeC5qc1xuICoqIG1vZHVsZSBpZCA9IDUyXG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAyXG4gKiovIiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vY2xpZW50L2Nzcy9tYWluLmNzc1xuICoqIG1vZHVsZSBpZCA9IDUzXG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAyXG4gKiovIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7cmVuZGVyfSBmcm9tICdyZWFjdC1kb20nO1xuaW1wb3J0IHtQcm92aWRlcn0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IGZhc3RjbGljayBmcm9tICdmYXN0Y2xpY2snO1xuXG5pbXBvcnQgQXBwIGZyb20gJy4uLy4uLy4uL2NvbW1vbi9BcHAuanN4JztcbmltcG9ydCBjb25maWd1cmVTdG9yZSBmcm9tICcuLi8uLi8uLi9jb21tb24vc3RvcmUvaW5kZXgnO1xuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgIHZhciB3aHlEaWRZb3VVcGRhdGUgPSByZXF1aXJlKCd3aHktZGlkLXlvdS11cGRhdGUnKS5kZWZhdWx0O1xuICAgIHdoeURpZFlvdVVwZGF0ZShSZWFjdCk7XG4gICAgdmFyIFJlYWN0UGVyZiA9IHJlcXVpcmUoJ3JlYWN0LWFkZG9ucy1wZXJmJyk7XG4gICAgd2luZG93LlJlYWN0UGVyZiA9IFJlYWN0UGVyZjtcbn1cblxuLy8gZmFzdGNsaWNr6Kej5YazaW9z5ZKM6YOo5YiG5a6J5Y2TY2xpY2vkuovku7bnmoTpl67pophcbmZhc3RjbGljay5hdHRhY2goZG9jdW1lbnQuYm9keSk7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNyZWF0ZVJlbmRlcihtaWRkbGV3YXJlQ29uZmlnID0ge30pe1xuICAgIGxldCBzdG9yZSA9IG51bGw7XG4gICAgbGV0IHBhZ2UgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGFnZScpO1xuICAgIGxldCBvblJlbmRlckNvbXBsZXRlZCA9IHR5cGVvZiBtaWRkbGV3YXJlQ29uZmlnLm9uUmVuZGVyQ29tcGxldGVkID09PSAnZnVuY3Rpb24nICYmIG1pZGRsZXdhcmVDb25maWcub25SZW5kZXJDb21wbGV0ZWQ7XG5cbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICAvLyBSZWFjdC5hZGRvbnMuUGVyZuaAp+iDveWIhuaekOS9v+eUqFxuICAgICAgICBpZiAod2luZG93LlJlYWN0UGVyZikge1xuICAgICAgICAgICAgUmVhY3RQZXJmLnN0YXJ0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZnVuY3Rpb24gKHtcbiAgICAgICAgcm9vdFJlZHVjZXIgPSAoKCkgPT4ge1xuICAgICAgICB9KSxcbiAgICAgICAgY29tcG9uZW50ID0gbnVsbFxuICAgIH0pIHtcbiAgICAgICAgbGV0IHRyYW5zZm9ybWVkRGF0YSA9IHR5cGVvZiBtaWRkbGV3YXJlQ29uZmlnLnRyYW5zZm9ybWVyID09PSAnZnVuY3Rpb24nXG4gICAgICAgICAgICA/IG1pZGRsZXdhcmVDb25maWcudHJhbnNmb3JtZXIod2luZG93Ll9fSU5JVElBTF9TVEFURV9fKSA6IHdpbmRvdy5fX0lOSVRJQUxfU1RBVEVfXztcbiAgICAgICAgaWYgKCFzdG9yZSkge1xuICAgICAgICAgICAgc3RvcmUgPSBjb25maWd1cmVTdG9yZSh0cmFuc2Zvcm1lZERhdGEsIHJvb3RSZWR1Y2VyKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBob3QgbG9hZCBmcm9tIGhtclxuICAgICAgICBlbHNlIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgICAgICBzdG9yZS5yZXBsYWNlUmVkdWNlcihyb290UmVkdWNlcik7XG4gICAgICAgIH1cblxuICAgICAgICByZW5kZXIoKFxuICAgICAgICAgICAgPFByb3ZpZGVyIHN0b3JlPXsgc3RvcmUgfT5cbiAgICAgICAgICAgICAgICA8QXBwIGFwcENvbmZpZz17IHdpbmRvdy5fX0FQUF9DT05GSUdfXyB9PlxuICAgICAgICAgICAgICAgICAgICB7IGNvbXBvbmVudCB9XG4gICAgICAgICAgICAgICAgPC9BcHA+XG4gICAgICAgICAgICA8L1Byb3ZpZGVyPlxuICAgICAgICApLCBwYWdlLCBvblJlbmRlckNvbXBsZXRlZCk7XG5cbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShzdG9yZSk7XG4gICAgfTtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vY2xpZW50L2pzL3V0aWxzL2NyZWF0ZUFwcC5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxudmFyIF9jbGFzc0NhbGxDaGVjazIgPSByZXF1aXJlKCdiYWJlbC1ydW50aW1lL2hlbHBlcnMvY2xhc3NDYWxsQ2hlY2snKTtcblxudmFyIF9jbGFzc0NhbGxDaGVjazMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jbGFzc0NhbGxDaGVjazIpO1xuXG52YXIgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4yID0gcmVxdWlyZSgnYmFiZWwtcnVudGltZS9oZWxwZXJzL3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4nKTtcblxudmFyIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4yKTtcblxudmFyIF9pbmhlcml0czIgPSByZXF1aXJlKCdiYWJlbC1ydW50aW1lL2hlbHBlcnMvaW5oZXJpdHMnKTtcblxudmFyIF9pbmhlcml0czMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pbmhlcml0czIpO1xuXG52YXIgX3JlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcblxudmFyIF9yZWFjdDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9yZWFjdCk7XG5cbnZhciBfZXZlbnRzID0gcmVxdWlyZSgnZXZlbnRzJyk7XG5cbnZhciBfZXZlbnRzMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2V2ZW50cyk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbnZhciBtZWRpYXRvciA9IG5ldyBfZXZlbnRzMi5kZWZhdWx0KCk7XG5cbnZhciBBcHAgPSBmdW5jdGlvbiAoX0NvbXBvbmVudCkge1xuICAgICgwLCBfaW5oZXJpdHMzLmRlZmF1bHQpKEFwcCwgX0NvbXBvbmVudCk7XG5cbiAgICBmdW5jdGlvbiBBcHAocHJvcHMsIGNvbnRleHQpIHtcbiAgICAgICAgKDAsIF9jbGFzc0NhbGxDaGVjazMuZGVmYXVsdCkodGhpcywgQXBwKTtcbiAgICAgICAgcmV0dXJuICgwLCBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjMuZGVmYXVsdCkodGhpcywgX0NvbXBvbmVudC5jYWxsKHRoaXMsIHByb3BzLCBjb250ZXh0KSk7XG4gICAgfVxuXG4gICAgQXBwLnByb3RvdHlwZS5nZXRDaGlsZENvbnRleHQgPSBmdW5jdGlvbiBnZXRDaGlsZENvbnRleHQoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAkZXZlbnRCdXM6IG1lZGlhdG9yLFxuICAgICAgICAgICAgJGFwcENvbmZpZzogdGhpcy5wcm9wcy5hcHBDb25maWdcbiAgICAgICAgfTtcbiAgICB9O1xuXG4gICAgQXBwLnByb3RvdHlwZS5jb21wb25lbnREaWRNb3VudCA9IGZ1bmN0aW9uIGNvbXBvbmVudERpZE1vdW50KCkge307XG5cbiAgICBBcHAucHJvdG90eXBlLmNvbXBvbmVudERpZFVwZGF0ZSA9IGZ1bmN0aW9uIGNvbXBvbmVudERpZFVwZGF0ZSgpIHt9O1xuXG4gICAgQXBwLnByb3RvdHlwZS5jb21wb25lbnRXaWxsVW5tb3VudCA9IGZ1bmN0aW9uIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge307XG5cbiAgICBBcHAucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIF9yZWFjdDIuZGVmYXVsdC5DaGlsZHJlbi5vbmx5KHRoaXMucHJvcHMuY2hpbGRyZW4pO1xuICAgIH07XG5cbiAgICByZXR1cm4gQXBwO1xufShfcmVhY3QuQ29tcG9uZW50KTtcblxuQXBwLmRlZmF1bHRQcm9wcyA9IHtcbiAgICBhcHBDb25maWc6IG51bGxcbn07XG5cbkFwcC5jaGlsZENvbnRleHRUeXBlcyA9IHtcbiAgICAkZXZlbnRCdXM6IF9yZWFjdC5Qcm9wVHlwZXMuaW5zdGFuY2VPZihfZXZlbnRzMi5kZWZhdWx0KSxcbiAgICAkYXBwQ29uZmlnOiBfcmVhY3QuUHJvcFR5cGVzLm9iamVjdFxufTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gQXBwO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9jb21tb24vQXBwLmpzeFxuICoqIG1vZHVsZSBpZCA9IDU1XG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAyXG4gKiovIiwiaW1wb3J0IHsgY3JlYXRlU3RvcmUsIGFwcGx5TWlkZGxld2FyZSwgY29tcG9zZSB9IGZyb20gJ3JlZHV4JztcclxuaW1wb3J0IHRodW5rIGZyb20gJ3JlZHV4LXRodW5rJztcclxuXHJcbmlmKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgJiYgcHJvY2Vzcy5icm93c2VyKXtcclxuICAgIHZhciBjcmVhdGVMb2dnZXIgPSByZXF1aXJlKCdyZWR1eC1sb2dnZXInKTtcclxufVxyXG5cclxuY29uc3QgbWlkZGxld2FyZUJ1aWxkZXIgPSAoKSA9PiB7XHJcbiAgICBsZXQgbWlkZGxld2FyZSA9IGFwcGx5TWlkZGxld2FyZSh0aHVuayk7XHJcblxyXG4gICAgaWYocHJvY2Vzcy5icm93c2VyICYmIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpe1xyXG4gICAgICAgIGlmKCF3aW5kb3cuZGV2VG9vbHNFeHRlbnNpb24pIHtcclxuICAgICAgICAgICAgbWlkZGxld2FyZSA9IGFwcGx5TWlkZGxld2FyZSh0aHVuaywgY3JlYXRlTG9nZ2VyKCkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBsZXQgYWxsQ29tcG9zZUVsZW1lbnRzID0gW1xyXG4gICAgICAgIG1pZGRsZXdhcmVcclxuICAgIF07XHJcblxyXG4gICAgaWYocHJvY2Vzcy5icm93c2VyICYmIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpe1xyXG4gICAgICAgIGlmKHdpbmRvdy5kZXZUb29sc0V4dGVuc2lvbil7XHJcbiAgICAgICAgICAgIGFsbENvbXBvc2VFbGVtZW50cy5wdXNoKHdpbmRvdy5kZXZUb29sc0V4dGVuc2lvbigpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGFsbENvbXBvc2VFbGVtZW50cztcclxufTtcclxuXHJcbmNvbnN0IGZpbmFsQ3JlYXRlU3RvcmUgPSBjb21wb3NlKC4uLm1pZGRsZXdhcmVCdWlsZGVyKCkpKGNyZWF0ZVN0b3JlKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbmZpZ3VyZVN0b3JlKGluaXRpYWxTdGF0ZSwgcm9vdFJlZHVjZXIpIHtcclxuICAgIGNvbnN0IHN0b3JlID0gZmluYWxDcmVhdGVTdG9yZShyb290UmVkdWNlciwgaW5pdGlhbFN0YXRlKTtcclxuXHJcbiAgICByZXR1cm4gc3RvcmU7XHJcbn1cclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9jb21tb24vc3RvcmUvaW5kZXguanNcbiAqKi8iLCIvLyBtb2RpZmllZFxuLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIEB0eXBlY2hlY2tzXG4gKlxuICovXG5cbi8qZXNsaW50LWRpc2FibGUgbm8tc2VsZi1jb21wYXJlICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIGhhc093blByb3BlcnR5ID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqXG4gKiBpbmxpbmVkIE9iamVjdC5pcyBwb2x5ZmlsbCB0byBhdm9pZCByZXF1aXJpbmcgY29uc3VtZXJzIHNoaXAgdGhlaXIgb3duXG4gKiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9PYmplY3QvaXNcbiAqL1xuZnVuY3Rpb24gaXMoeCwgeSkge1xuICAgIC8vIFNhbWVWYWx1ZSBhbGdvcml0aG1cbiAgICBpZiAoeCA9PT0geSkge1xuICAgICAgICAvLyBTdGVwcyAxLTUsIDctMTBcbiAgICAgICAgLy8gU3RlcHMgNi5iLTYuZTogKzAgIT0gLTBcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgaWYodHlwZW9mIHggPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIHkgPT09ICdmdW5jdGlvbicpe1xuICAgICAgICAgICAgcmV0dXJuIHgudG9TdHJpbmcoKSA9PT0geS50b1N0cmluZygpO1xuICAgICAgICB9XG4gICAgICAgIC8vIFN0ZXAgNi5hOiBOYU4gPT0gTmFOXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG59XG5cbi8qKlxuICogUGVyZm9ybXMgZXF1YWxpdHkgYnkgaXRlcmF0aW5nIHRocm91Z2gga2V5cyBvbiBhbiBvYmplY3QgYW5kIHJldHVybmluZyBmYWxzZVxuICogd2hlbiBhbnkga2V5IGhhcyB2YWx1ZXMgd2hpY2ggYXJlIG5vdCBzdHJpY3RseSBlcXVhbCBiZXR3ZWVuIHRoZSBhcmd1bWVudHMuXG4gKiBSZXR1cm5zIHRydWUgd2hlbiB0aGUgdmFsdWVzIG9mIGFsbCBrZXlzIGFyZSBzdHJpY3RseSBlcXVhbC5cbiAqL1xuZnVuY3Rpb24gc2hhbGxvd0VxdWFsKG9iakEsIG9iakIpIHtcbiAgICBpZiAoaXMob2JqQSwgb2JqQikpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBvYmpBICE9PSAnb2JqZWN0JyB8fCBvYmpBID09PSBudWxsIHx8IHR5cGVvZiBvYmpCICE9PSAnb2JqZWN0JyB8fCBvYmpCID09PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICB2YXIga2V5c0EgPSBPYmplY3Qua2V5cyhvYmpBKTtcbiAgICB2YXIga2V5c0IgPSBPYmplY3Qua2V5cyhvYmpCKTtcblxuICAgIGlmIChrZXlzQS5sZW5ndGggIT09IGtleXNCLmxlbmd0aCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLy8gVGVzdCBmb3IgQSdzIGtleXMgZGlmZmVyZW50IGZyb20gQi5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGtleXNBLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmICghaGFzT3duUHJvcGVydHkuY2FsbChvYmpCLCBrZXlzQVtpXSkgfHwgIWlzKG9iakFba2V5c0FbaV1dLCBvYmpCW2tleXNBW2ldXSkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0cnVlO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNoYWxsb3dFcXVhbDtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vY29tbW9uL3V0aWxzL3NoYWxsb3dFcXVhbC5qc1xuICoqLyIsInJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2Lm9iamVjdC5jcmVhdGUnKTtcbnZhciAkT2JqZWN0ID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9fY29yZScpLk9iamVjdDtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY3JlYXRlKFAsIEQpe1xuICByZXR1cm4gJE9iamVjdC5jcmVhdGUoUCwgRCk7XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2NyZWF0ZS5qc1xuICoqIG1vZHVsZSBpZCA9IDU4XG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAyXG4gKiovIiwicmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYub2JqZWN0LnNldC1wcm90b3R5cGUtb2YnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9fY29yZScpLk9iamVjdC5zZXRQcm90b3R5cGVPZjtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9zZXQtcHJvdG90eXBlLW9mLmpzXG4gKiogbW9kdWxlIGlkID0gNTlcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDJcbiAqKi8iLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5zeW1ib2wnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9fY29yZScpLlN5bWJvbFsnZm9yJ107XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9mbi9zeW1ib2wvZm9yLmpzXG4gKiogbW9kdWxlIGlkID0gNjBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDJcbiAqKi8iLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5zeW1ib2wnKTtcbnJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2Lm9iamVjdC50by1zdHJpbmcnKTtcbnJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM3LnN5bWJvbC5hc3luYy1pdGVyYXRvcicpO1xucmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczcuc3ltYm9sLm9ic2VydmFibGUnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9fY29yZScpLlN5bWJvbDtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L2ZuL3N5bWJvbC9pbmRleC5qc1xuICoqIG1vZHVsZSBpZCA9IDYxXG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAyXG4gKiovIiwicmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYuc3RyaW5nLml0ZXJhdG9yJyk7XG5yZXF1aXJlKCcuLi8uLi9tb2R1bGVzL3dlYi5kb20uaXRlcmFibGUnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9fd2tzLWV4dCcpLmYoJ2l0ZXJhdG9yJyk7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9mbi9zeW1ib2wvaXRlcmF0b3IuanNcbiAqKiBtb2R1bGUgaWQgPSA2MlxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDEgMlxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICBpZih0eXBlb2YgaXQgIT0gJ2Z1bmN0aW9uJyl0aHJvdyBUeXBlRXJyb3IoaXQgKyAnIGlzIG5vdCBhIGZ1bmN0aW9uIScpO1xuICByZXR1cm4gaXQ7XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYS1mdW5jdGlvbi5qc1xuICoqIG1vZHVsZSBpZCA9IDYzXG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAyXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpeyAvKiBlbXB0eSAqLyB9O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYWRkLXRvLXVuc2NvcGFibGVzLmpzXG4gKiogbW9kdWxlIGlkID0gNjRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDJcbiAqKi8iLCIvLyBmYWxzZSAtPiBBcnJheSNpbmRleE9mXG4vLyB0cnVlICAtPiBBcnJheSNpbmNsdWRlc1xudmFyIHRvSU9iamVjdCA9IHJlcXVpcmUoJy4vX3RvLWlvYmplY3QnKVxuICAsIHRvTGVuZ3RoICA9IHJlcXVpcmUoJy4vX3RvLWxlbmd0aCcpXG4gICwgdG9JbmRleCAgID0gcmVxdWlyZSgnLi9fdG8taW5kZXgnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oSVNfSU5DTFVERVMpe1xuICByZXR1cm4gZnVuY3Rpb24oJHRoaXMsIGVsLCBmcm9tSW5kZXgpe1xuICAgIHZhciBPICAgICAgPSB0b0lPYmplY3QoJHRoaXMpXG4gICAgICAsIGxlbmd0aCA9IHRvTGVuZ3RoKE8ubGVuZ3RoKVxuICAgICAgLCBpbmRleCAgPSB0b0luZGV4KGZyb21JbmRleCwgbGVuZ3RoKVxuICAgICAgLCB2YWx1ZTtcbiAgICAvLyBBcnJheSNpbmNsdWRlcyB1c2VzIFNhbWVWYWx1ZVplcm8gZXF1YWxpdHkgYWxnb3JpdGhtXG4gICAgaWYoSVNfSU5DTFVERVMgJiYgZWwgIT0gZWwpd2hpbGUobGVuZ3RoID4gaW5kZXgpe1xuICAgICAgdmFsdWUgPSBPW2luZGV4KytdO1xuICAgICAgaWYodmFsdWUgIT0gdmFsdWUpcmV0dXJuIHRydWU7XG4gICAgLy8gQXJyYXkjdG9JbmRleCBpZ25vcmVzIGhvbGVzLCBBcnJheSNpbmNsdWRlcyAtIG5vdFxuICAgIH0gZWxzZSBmb3IoO2xlbmd0aCA+IGluZGV4OyBpbmRleCsrKWlmKElTX0lOQ0xVREVTIHx8IGluZGV4IGluIE8pe1xuICAgICAgaWYoT1tpbmRleF0gPT09IGVsKXJldHVybiBJU19JTkNMVURFUyB8fCBpbmRleCB8fCAwO1xuICAgIH0gcmV0dXJuICFJU19JTkNMVURFUyAmJiAtMTtcbiAgfTtcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hcnJheS1pbmNsdWRlcy5qc1xuICoqIG1vZHVsZSBpZCA9IDY1XG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAyXG4gKiovIiwiLy8gYWxsIGVudW1lcmFibGUgb2JqZWN0IGtleXMsIGluY2x1ZGVzIHN5bWJvbHNcbnZhciBnZXRLZXlzID0gcmVxdWlyZSgnLi9fb2JqZWN0LWtleXMnKVxuICAsIGdPUFMgICAgPSByZXF1aXJlKCcuL19vYmplY3QtZ29wcycpXG4gICwgcElFICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1waWUnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICB2YXIgcmVzdWx0ICAgICA9IGdldEtleXMoaXQpXG4gICAgLCBnZXRTeW1ib2xzID0gZ09QUy5mO1xuICBpZihnZXRTeW1ib2xzKXtcbiAgICB2YXIgc3ltYm9scyA9IGdldFN5bWJvbHMoaXQpXG4gICAgICAsIGlzRW51bSAgPSBwSUUuZlxuICAgICAgLCBpICAgICAgID0gMFxuICAgICAgLCBrZXk7XG4gICAgd2hpbGUoc3ltYm9scy5sZW5ndGggPiBpKWlmKGlzRW51bS5jYWxsKGl0LCBrZXkgPSBzeW1ib2xzW2krK10pKXJlc3VsdC5wdXNoKGtleSk7XG4gIH0gcmV0dXJuIHJlc3VsdDtcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19lbnVtLWtleXMuanNcbiAqKiBtb2R1bGUgaWQgPSA2NlxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDEgMlxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9fZ2xvYmFsJykuZG9jdW1lbnQgJiYgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faHRtbC5qc1xuICoqIG1vZHVsZSBpZCA9IDY3XG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAyXG4gKiovIiwiLy8gZmFsbGJhY2sgZm9yIG5vbi1hcnJheS1saWtlIEVTMyBhbmQgbm9uLWVudW1lcmFibGUgb2xkIFY4IHN0cmluZ3NcbnZhciBjb2YgPSByZXF1aXJlKCcuL19jb2YnKTtcbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0KCd6JykucHJvcGVydHlJc0VudW1lcmFibGUoMCkgPyBPYmplY3QgOiBmdW5jdGlvbihpdCl7XG4gIHJldHVybiBjb2YoaXQpID09ICdTdHJpbmcnID8gaXQuc3BsaXQoJycpIDogT2JqZWN0KGl0KTtcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pb2JqZWN0LmpzXG4gKiogbW9kdWxlIGlkID0gNjhcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDJcbiAqKi8iLCIvLyA3LjIuMiBJc0FycmF5KGFyZ3VtZW50KVxudmFyIGNvZiA9IHJlcXVpcmUoJy4vX2NvZicpO1xubW9kdWxlLmV4cG9ydHMgPSBBcnJheS5pc0FycmF5IHx8IGZ1bmN0aW9uIGlzQXJyYXkoYXJnKXtcbiAgcmV0dXJuIGNvZihhcmcpID09ICdBcnJheSc7XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXMtYXJyYXkuanNcbiAqKiBtb2R1bGUgaWQgPSA2OVxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDEgMlxuICoqLyIsIid1c2Ugc3RyaWN0JztcbnZhciBjcmVhdGUgICAgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1jcmVhdGUnKVxuICAsIGRlc2NyaXB0b3IgICAgID0gcmVxdWlyZSgnLi9fcHJvcGVydHktZGVzYycpXG4gICwgc2V0VG9TdHJpbmdUYWcgPSByZXF1aXJlKCcuL19zZXQtdG8tc3RyaW5nLXRhZycpXG4gICwgSXRlcmF0b3JQcm90b3R5cGUgPSB7fTtcblxuLy8gMjUuMS4yLjEuMSAlSXRlcmF0b3JQcm90b3R5cGUlW0BAaXRlcmF0b3JdKClcbnJlcXVpcmUoJy4vX2hpZGUnKShJdGVyYXRvclByb3RvdHlwZSwgcmVxdWlyZSgnLi9fd2tzJykoJ2l0ZXJhdG9yJyksIGZ1bmN0aW9uKCl7IHJldHVybiB0aGlzOyB9KTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihDb25zdHJ1Y3RvciwgTkFNRSwgbmV4dCl7XG4gIENvbnN0cnVjdG9yLnByb3RvdHlwZSA9IGNyZWF0ZShJdGVyYXRvclByb3RvdHlwZSwge25leHQ6IGRlc2NyaXB0b3IoMSwgbmV4dCl9KTtcbiAgc2V0VG9TdHJpbmdUYWcoQ29uc3RydWN0b3IsIE5BTUUgKyAnIEl0ZXJhdG9yJyk7XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXRlci1jcmVhdGUuanNcbiAqKiBtb2R1bGUgaWQgPSA3MFxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDEgMlxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oZG9uZSwgdmFsdWUpe1xuICByZXR1cm4ge3ZhbHVlOiB2YWx1ZSwgZG9uZTogISFkb25lfTtcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pdGVyLXN0ZXAuanNcbiAqKiBtb2R1bGUgaWQgPSA3MVxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDEgMlxuICoqLyIsInZhciBnZXRLZXlzICAgPSByZXF1aXJlKCcuL19vYmplY3Qta2V5cycpXG4gICwgdG9JT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8taW9iamVjdCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihvYmplY3QsIGVsKXtcbiAgdmFyIE8gICAgICA9IHRvSU9iamVjdChvYmplY3QpXG4gICAgLCBrZXlzICAgPSBnZXRLZXlzKE8pXG4gICAgLCBsZW5ndGggPSBrZXlzLmxlbmd0aFxuICAgICwgaW5kZXggID0gMFxuICAgICwga2V5O1xuICB3aGlsZShsZW5ndGggPiBpbmRleClpZihPW2tleSA9IGtleXNbaW5kZXgrK11dID09PSBlbClyZXR1cm4ga2V5O1xufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2tleW9mLmpzXG4gKiogbW9kdWxlIGlkID0gNzJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDJcbiAqKi8iLCJ2YXIgTUVUQSAgICAgPSByZXF1aXJlKCcuL191aWQnKSgnbWV0YScpXG4gICwgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKVxuICAsIGhhcyAgICAgID0gcmVxdWlyZSgnLi9faGFzJylcbiAgLCBzZXREZXNjICA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpLmZcbiAgLCBpZCAgICAgICA9IDA7XG52YXIgaXNFeHRlbnNpYmxlID0gT2JqZWN0LmlzRXh0ZW5zaWJsZSB8fCBmdW5jdGlvbigpe1xuICByZXR1cm4gdHJ1ZTtcbn07XG52YXIgRlJFRVpFID0gIXJlcXVpcmUoJy4vX2ZhaWxzJykoZnVuY3Rpb24oKXtcbiAgcmV0dXJuIGlzRXh0ZW5zaWJsZShPYmplY3QucHJldmVudEV4dGVuc2lvbnMoe30pKTtcbn0pO1xudmFyIHNldE1ldGEgPSBmdW5jdGlvbihpdCl7XG4gIHNldERlc2MoaXQsIE1FVEEsIHt2YWx1ZToge1xuICAgIGk6ICdPJyArICsraWQsIC8vIG9iamVjdCBJRFxuICAgIHc6IHt9ICAgICAgICAgIC8vIHdlYWsgY29sbGVjdGlvbnMgSURzXG4gIH19KTtcbn07XG52YXIgZmFzdEtleSA9IGZ1bmN0aW9uKGl0LCBjcmVhdGUpe1xuICAvLyByZXR1cm4gcHJpbWl0aXZlIHdpdGggcHJlZml4XG4gIGlmKCFpc09iamVjdChpdCkpcmV0dXJuIHR5cGVvZiBpdCA9PSAnc3ltYm9sJyA/IGl0IDogKHR5cGVvZiBpdCA9PSAnc3RyaW5nJyA/ICdTJyA6ICdQJykgKyBpdDtcbiAgaWYoIWhhcyhpdCwgTUVUQSkpe1xuICAgIC8vIGNhbid0IHNldCBtZXRhZGF0YSB0byB1bmNhdWdodCBmcm96ZW4gb2JqZWN0XG4gICAgaWYoIWlzRXh0ZW5zaWJsZShpdCkpcmV0dXJuICdGJztcbiAgICAvLyBub3QgbmVjZXNzYXJ5IHRvIGFkZCBtZXRhZGF0YVxuICAgIGlmKCFjcmVhdGUpcmV0dXJuICdFJztcbiAgICAvLyBhZGQgbWlzc2luZyBtZXRhZGF0YVxuICAgIHNldE1ldGEoaXQpO1xuICAvLyByZXR1cm4gb2JqZWN0IElEXG4gIH0gcmV0dXJuIGl0W01FVEFdLmk7XG59O1xudmFyIGdldFdlYWsgPSBmdW5jdGlvbihpdCwgY3JlYXRlKXtcbiAgaWYoIWhhcyhpdCwgTUVUQSkpe1xuICAgIC8vIGNhbid0IHNldCBtZXRhZGF0YSB0byB1bmNhdWdodCBmcm96ZW4gb2JqZWN0XG4gICAgaWYoIWlzRXh0ZW5zaWJsZShpdCkpcmV0dXJuIHRydWU7XG4gICAgLy8gbm90IG5lY2Vzc2FyeSB0byBhZGQgbWV0YWRhdGFcbiAgICBpZighY3JlYXRlKXJldHVybiBmYWxzZTtcbiAgICAvLyBhZGQgbWlzc2luZyBtZXRhZGF0YVxuICAgIHNldE1ldGEoaXQpO1xuICAvLyByZXR1cm4gaGFzaCB3ZWFrIGNvbGxlY3Rpb25zIElEc1xuICB9IHJldHVybiBpdFtNRVRBXS53O1xufTtcbi8vIGFkZCBtZXRhZGF0YSBvbiBmcmVlemUtZmFtaWx5IG1ldGhvZHMgY2FsbGluZ1xudmFyIG9uRnJlZXplID0gZnVuY3Rpb24oaXQpe1xuICBpZihGUkVFWkUgJiYgbWV0YS5ORUVEICYmIGlzRXh0ZW5zaWJsZShpdCkgJiYgIWhhcyhpdCwgTUVUQSkpc2V0TWV0YShpdCk7XG4gIHJldHVybiBpdDtcbn07XG52YXIgbWV0YSA9IG1vZHVsZS5leHBvcnRzID0ge1xuICBLRVk6ICAgICAgTUVUQSxcbiAgTkVFRDogICAgIGZhbHNlLFxuICBmYXN0S2V5OiAgZmFzdEtleSxcbiAgZ2V0V2VhazogIGdldFdlYWssXG4gIG9uRnJlZXplOiBvbkZyZWV6ZVxufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX21ldGEuanNcbiAqKiBtb2R1bGUgaWQgPSA3M1xuICoqIG1vZHVsZSBjaHVua3MgPSAwIDEgMlxuICoqLyIsInZhciBkUCAgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpXG4gICwgYW5PYmplY3QgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKVxuICAsIGdldEtleXMgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWtleXMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpID8gT2JqZWN0LmRlZmluZVByb3BlcnRpZXMgOiBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKE8sIFByb3BlcnRpZXMpe1xuICBhbk9iamVjdChPKTtcbiAgdmFyIGtleXMgICA9IGdldEtleXMoUHJvcGVydGllcylcbiAgICAsIGxlbmd0aCA9IGtleXMubGVuZ3RoXG4gICAgLCBpID0gMFxuICAgICwgUDtcbiAgd2hpbGUobGVuZ3RoID4gaSlkUC5mKE8sIFAgPSBrZXlzW2krK10sIFByb3BlcnRpZXNbUF0pO1xuICByZXR1cm4gTztcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZHBzLmpzXG4gKiogbW9kdWxlIGlkID0gNzRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDJcbiAqKi8iLCIvLyBmYWxsYmFjayBmb3IgSUUxMSBidWdneSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyB3aXRoIGlmcmFtZSBhbmQgd2luZG93XG52YXIgdG9JT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8taW9iamVjdCcpXG4gICwgZ09QTiAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWdvcG4nKS5mXG4gICwgdG9TdHJpbmcgID0ge30udG9TdHJpbmc7XG5cbnZhciB3aW5kb3dOYW1lcyA9IHR5cGVvZiB3aW5kb3cgPT0gJ29iamVjdCcgJiYgd2luZG93ICYmIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzXG4gID8gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMod2luZG93KSA6IFtdO1xuXG52YXIgZ2V0V2luZG93TmFtZXMgPSBmdW5jdGlvbihpdCl7XG4gIHRyeSB7XG4gICAgcmV0dXJuIGdPUE4oaXQpO1xuICB9IGNhdGNoKGUpe1xuICAgIHJldHVybiB3aW5kb3dOYW1lcy5zbGljZSgpO1xuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cy5mID0gZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlOYW1lcyhpdCl7XG4gIHJldHVybiB3aW5kb3dOYW1lcyAmJiB0b1N0cmluZy5jYWxsKGl0KSA9PSAnW29iamVjdCBXaW5kb3ddJyA/IGdldFdpbmRvd05hbWVzKGl0KSA6IGdPUE4odG9JT2JqZWN0KGl0KSk7XG59O1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZ29wbi1leHQuanNcbiAqKiBtb2R1bGUgaWQgPSA3NVxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDEgMlxuICoqLyIsIi8vIDE5LjEuMi45IC8gMTUuMi4zLjIgT2JqZWN0LmdldFByb3RvdHlwZU9mKE8pXG52YXIgaGFzICAgICAgICAgPSByZXF1aXJlKCcuL19oYXMnKVxuICAsIHRvT2JqZWN0ICAgID0gcmVxdWlyZSgnLi9fdG8tb2JqZWN0JylcbiAgLCBJRV9QUk9UTyAgICA9IHJlcXVpcmUoJy4vX3NoYXJlZC1rZXknKSgnSUVfUFJPVE8nKVxuICAsIE9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxubW9kdWxlLmV4cG9ydHMgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YgfHwgZnVuY3Rpb24oTyl7XG4gIE8gPSB0b09iamVjdChPKTtcbiAgaWYoaGFzKE8sIElFX1BST1RPKSlyZXR1cm4gT1tJRV9QUk9UT107XG4gIGlmKHR5cGVvZiBPLmNvbnN0cnVjdG9yID09ICdmdW5jdGlvbicgJiYgTyBpbnN0YW5jZW9mIE8uY29uc3RydWN0b3Ipe1xuICAgIHJldHVybiBPLmNvbnN0cnVjdG9yLnByb3RvdHlwZTtcbiAgfSByZXR1cm4gTyBpbnN0YW5jZW9mIE9iamVjdCA/IE9iamVjdFByb3RvIDogbnVsbDtcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZ3BvLmpzXG4gKiogbW9kdWxlIGlkID0gNzZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDJcbiAqKi8iLCIvLyBXb3JrcyB3aXRoIF9fcHJvdG9fXyBvbmx5LiBPbGQgdjggY2FuJ3Qgd29yayB3aXRoIG51bGwgcHJvdG8gb2JqZWN0cy5cbi8qIGVzbGludC1kaXNhYmxlIG5vLXByb3RvICovXG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKVxuICAsIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0Jyk7XG52YXIgY2hlY2sgPSBmdW5jdGlvbihPLCBwcm90byl7XG4gIGFuT2JqZWN0KE8pO1xuICBpZighaXNPYmplY3QocHJvdG8pICYmIHByb3RvICE9PSBudWxsKXRocm93IFR5cGVFcnJvcihwcm90byArIFwiOiBjYW4ndCBzZXQgYXMgcHJvdG90eXBlIVwiKTtcbn07XG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgc2V0OiBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHwgKCdfX3Byb3RvX18nIGluIHt9ID8gLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgIGZ1bmN0aW9uKHRlc3QsIGJ1Z2d5LCBzZXQpe1xuICAgICAgdHJ5IHtcbiAgICAgICAgc2V0ID0gcmVxdWlyZSgnLi9fY3R4JykoRnVuY3Rpb24uY2FsbCwgcmVxdWlyZSgnLi9fb2JqZWN0LWdvcGQnKS5mKE9iamVjdC5wcm90b3R5cGUsICdfX3Byb3RvX18nKS5zZXQsIDIpO1xuICAgICAgICBzZXQodGVzdCwgW10pO1xuICAgICAgICBidWdneSA9ICEodGVzdCBpbnN0YW5jZW9mIEFycmF5KTtcbiAgICAgIH0gY2F0Y2goZSl7IGJ1Z2d5ID0gdHJ1ZTsgfVxuICAgICAgcmV0dXJuIGZ1bmN0aW9uIHNldFByb3RvdHlwZU9mKE8sIHByb3RvKXtcbiAgICAgICAgY2hlY2soTywgcHJvdG8pO1xuICAgICAgICBpZihidWdneSlPLl9fcHJvdG9fXyA9IHByb3RvO1xuICAgICAgICBlbHNlIHNldChPLCBwcm90byk7XG4gICAgICAgIHJldHVybiBPO1xuICAgICAgfTtcbiAgICB9KHt9LCBmYWxzZSkgOiB1bmRlZmluZWQpLFxuICBjaGVjazogY2hlY2tcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zZXQtcHJvdG8uanNcbiAqKiBtb2R1bGUgaWQgPSA3N1xuICoqIG1vZHVsZSBjaHVua3MgPSAwIDEgMlxuICoqLyIsInZhciB0b0ludGVnZXIgPSByZXF1aXJlKCcuL190by1pbnRlZ2VyJylcbiAgLCBkZWZpbmVkICAgPSByZXF1aXJlKCcuL19kZWZpbmVkJyk7XG4vLyB0cnVlICAtPiBTdHJpbmcjYXRcbi8vIGZhbHNlIC0+IFN0cmluZyNjb2RlUG9pbnRBdFxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihUT19TVFJJTkcpe1xuICByZXR1cm4gZnVuY3Rpb24odGhhdCwgcG9zKXtcbiAgICB2YXIgcyA9IFN0cmluZyhkZWZpbmVkKHRoYXQpKVxuICAgICAgLCBpID0gdG9JbnRlZ2VyKHBvcylcbiAgICAgICwgbCA9IHMubGVuZ3RoXG4gICAgICAsIGEsIGI7XG4gICAgaWYoaSA8IDAgfHwgaSA+PSBsKXJldHVybiBUT19TVFJJTkcgPyAnJyA6IHVuZGVmaW5lZDtcbiAgICBhID0gcy5jaGFyQ29kZUF0KGkpO1xuICAgIHJldHVybiBhIDwgMHhkODAwIHx8IGEgPiAweGRiZmYgfHwgaSArIDEgPT09IGwgfHwgKGIgPSBzLmNoYXJDb2RlQXQoaSArIDEpKSA8IDB4ZGMwMCB8fCBiID4gMHhkZmZmXG4gICAgICA/IFRPX1NUUklORyA/IHMuY2hhckF0KGkpIDogYVxuICAgICAgOiBUT19TVFJJTkcgPyBzLnNsaWNlKGksIGkgKyAyKSA6IChhIC0gMHhkODAwIDw8IDEwKSArIChiIC0gMHhkYzAwKSArIDB4MTAwMDA7XG4gIH07XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc3RyaW5nLWF0LmpzXG4gKiogbW9kdWxlIGlkID0gNzhcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDJcbiAqKi8iLCJ2YXIgdG9JbnRlZ2VyID0gcmVxdWlyZSgnLi9fdG8taW50ZWdlcicpXG4gICwgbWF4ICAgICAgID0gTWF0aC5tYXhcbiAgLCBtaW4gICAgICAgPSBNYXRoLm1pbjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaW5kZXgsIGxlbmd0aCl7XG4gIGluZGV4ID0gdG9JbnRlZ2VyKGluZGV4KTtcbiAgcmV0dXJuIGluZGV4IDwgMCA/IG1heChpbmRleCArIGxlbmd0aCwgMCkgOiBtaW4oaW5kZXgsIGxlbmd0aCk7XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8taW5kZXguanNcbiAqKiBtb2R1bGUgaWQgPSA3OVxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDEgMlxuICoqLyIsIi8vIDcuMS4xNSBUb0xlbmd0aFxudmFyIHRvSW50ZWdlciA9IHJlcXVpcmUoJy4vX3RvLWludGVnZXInKVxuICAsIG1pbiAgICAgICA9IE1hdGgubWluO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiBpdCA+IDAgPyBtaW4odG9JbnRlZ2VyKGl0KSwgMHgxZmZmZmZmZmZmZmZmZikgOiAwOyAvLyBwb3coMiwgNTMpIC0gMSA9PSA5MDA3MTk5MjU0NzQwOTkxXG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8tbGVuZ3RoLmpzXG4gKiogbW9kdWxlIGlkID0gODBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDJcbiAqKi8iLCIvLyA3LjEuMTMgVG9PYmplY3QoYXJndW1lbnQpXG52YXIgZGVmaW5lZCA9IHJlcXVpcmUoJy4vX2RlZmluZWQnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gT2JqZWN0KGRlZmluZWQoaXQpKTtcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1vYmplY3QuanNcbiAqKiBtb2R1bGUgaWQgPSA4MVxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDEgMlxuICoqLyIsIid1c2Ugc3RyaWN0JztcbnZhciBhZGRUb1Vuc2NvcGFibGVzID0gcmVxdWlyZSgnLi9fYWRkLXRvLXVuc2NvcGFibGVzJylcbiAgLCBzdGVwICAgICAgICAgICAgID0gcmVxdWlyZSgnLi9faXRlci1zdGVwJylcbiAgLCBJdGVyYXRvcnMgICAgICAgID0gcmVxdWlyZSgnLi9faXRlcmF0b3JzJylcbiAgLCB0b0lPYmplY3QgICAgICAgID0gcmVxdWlyZSgnLi9fdG8taW9iamVjdCcpO1xuXG4vLyAyMi4xLjMuNCBBcnJheS5wcm90b3R5cGUuZW50cmllcygpXG4vLyAyMi4xLjMuMTMgQXJyYXkucHJvdG90eXBlLmtleXMoKVxuLy8gMjIuMS4zLjI5IEFycmF5LnByb3RvdHlwZS52YWx1ZXMoKVxuLy8gMjIuMS4zLjMwIEFycmF5LnByb3RvdHlwZVtAQGl0ZXJhdG9yXSgpXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vX2l0ZXItZGVmaW5lJykoQXJyYXksICdBcnJheScsIGZ1bmN0aW9uKGl0ZXJhdGVkLCBraW5kKXtcbiAgdGhpcy5fdCA9IHRvSU9iamVjdChpdGVyYXRlZCk7IC8vIHRhcmdldFxuICB0aGlzLl9pID0gMDsgICAgICAgICAgICAgICAgICAgLy8gbmV4dCBpbmRleFxuICB0aGlzLl9rID0ga2luZDsgICAgICAgICAgICAgICAgLy8ga2luZFxuLy8gMjIuMS41LjIuMSAlQXJyYXlJdGVyYXRvclByb3RvdHlwZSUubmV4dCgpXG59LCBmdW5jdGlvbigpe1xuICB2YXIgTyAgICAgPSB0aGlzLl90XG4gICAgLCBraW5kICA9IHRoaXMuX2tcbiAgICAsIGluZGV4ID0gdGhpcy5faSsrO1xuICBpZighTyB8fCBpbmRleCA+PSBPLmxlbmd0aCl7XG4gICAgdGhpcy5fdCA9IHVuZGVmaW5lZDtcbiAgICByZXR1cm4gc3RlcCgxKTtcbiAgfVxuICBpZihraW5kID09ICdrZXlzJyAgKXJldHVybiBzdGVwKDAsIGluZGV4KTtcbiAgaWYoa2luZCA9PSAndmFsdWVzJylyZXR1cm4gc3RlcCgwLCBPW2luZGV4XSk7XG4gIHJldHVybiBzdGVwKDAsIFtpbmRleCwgT1tpbmRleF1dKTtcbn0sICd2YWx1ZXMnKTtcblxuLy8gYXJndW1lbnRzTGlzdFtAQGl0ZXJhdG9yXSBpcyAlQXJyYXlQcm90b192YWx1ZXMlICg5LjQuNC42LCA5LjQuNC43KVxuSXRlcmF0b3JzLkFyZ3VtZW50cyA9IEl0ZXJhdG9ycy5BcnJheTtcblxuYWRkVG9VbnNjb3BhYmxlcygna2V5cycpO1xuYWRkVG9VbnNjb3BhYmxlcygndmFsdWVzJyk7XG5hZGRUb1Vuc2NvcGFibGVzKCdlbnRyaWVzJyk7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5hcnJheS5pdGVyYXRvci5qc1xuICoqIG1vZHVsZSBpZCA9IDgyXG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAyXG4gKiovIiwidmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKVxuLy8gMTkuMS4yLjIgLyAxNS4yLjMuNSBPYmplY3QuY3JlYXRlKE8gWywgUHJvcGVydGllc10pXG4kZXhwb3J0KCRleHBvcnQuUywgJ09iamVjdCcsIHtjcmVhdGU6IHJlcXVpcmUoJy4vX29iamVjdC1jcmVhdGUnKX0pO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYub2JqZWN0LmNyZWF0ZS5qc1xuICoqIG1vZHVsZSBpZCA9IDgzXG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAyXG4gKiovIiwiLy8gMTkuMS4zLjE5IE9iamVjdC5zZXRQcm90b3R5cGVPZihPLCBwcm90bylcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG4kZXhwb3J0KCRleHBvcnQuUywgJ09iamVjdCcsIHtzZXRQcm90b3R5cGVPZjogcmVxdWlyZSgnLi9fc2V0LXByb3RvJykuc2V0fSk7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5vYmplY3Quc2V0LXByb3RvdHlwZS1vZi5qc1xuICoqIG1vZHVsZSBpZCA9IDg0XG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAyXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xudmFyICRhdCAgPSByZXF1aXJlKCcuL19zdHJpbmctYXQnKSh0cnVlKTtcblxuLy8gMjEuMS4zLjI3IFN0cmluZy5wcm90b3R5cGVbQEBpdGVyYXRvcl0oKVxucmVxdWlyZSgnLi9faXRlci1kZWZpbmUnKShTdHJpbmcsICdTdHJpbmcnLCBmdW5jdGlvbihpdGVyYXRlZCl7XG4gIHRoaXMuX3QgPSBTdHJpbmcoaXRlcmF0ZWQpOyAvLyB0YXJnZXRcbiAgdGhpcy5faSA9IDA7ICAgICAgICAgICAgICAgIC8vIG5leHQgaW5kZXhcbi8vIDIxLjEuNS4yLjEgJVN0cmluZ0l0ZXJhdG9yUHJvdG90eXBlJS5uZXh0KClcbn0sIGZ1bmN0aW9uKCl7XG4gIHZhciBPICAgICA9IHRoaXMuX3RcbiAgICAsIGluZGV4ID0gdGhpcy5faVxuICAgICwgcG9pbnQ7XG4gIGlmKGluZGV4ID49IE8ubGVuZ3RoKXJldHVybiB7dmFsdWU6IHVuZGVmaW5lZCwgZG9uZTogdHJ1ZX07XG4gIHBvaW50ID0gJGF0KE8sIGluZGV4KTtcbiAgdGhpcy5faSArPSBwb2ludC5sZW5ndGg7XG4gIHJldHVybiB7dmFsdWU6IHBvaW50LCBkb25lOiBmYWxzZX07XG59KTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2LnN0cmluZy5pdGVyYXRvci5qc1xuICoqIG1vZHVsZSBpZCA9IDg2XG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAyXG4gKiovIiwicmVxdWlyZSgnLi9fd2tzLWRlZmluZScpKCdhc3luY0l0ZXJhdG9yJyk7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNy5zeW1ib2wuYXN5bmMtaXRlcmF0b3IuanNcbiAqKiBtb2R1bGUgaWQgPSA4N1xuICoqIG1vZHVsZSBjaHVua3MgPSAwIDEgMlxuICoqLyIsInJlcXVpcmUoJy4vX3drcy1kZWZpbmUnKSgnb2JzZXJ2YWJsZScpO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczcuc3ltYm9sLm9ic2VydmFibGUuanNcbiAqKiBtb2R1bGUgaWQgPSA4OFxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDEgMlxuICoqLyIsInJlcXVpcmUoJy4vZXM2LmFycmF5Lml0ZXJhdG9yJyk7XG52YXIgZ2xvYmFsICAgICAgICA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpXG4gICwgaGlkZSAgICAgICAgICA9IHJlcXVpcmUoJy4vX2hpZGUnKVxuICAsIEl0ZXJhdG9ycyAgICAgPSByZXF1aXJlKCcuL19pdGVyYXRvcnMnKVxuICAsIFRPX1NUUklOR19UQUcgPSByZXF1aXJlKCcuL193a3MnKSgndG9TdHJpbmdUYWcnKTtcblxuZm9yKHZhciBjb2xsZWN0aW9ucyA9IFsnTm9kZUxpc3QnLCAnRE9NVG9rZW5MaXN0JywgJ01lZGlhTGlzdCcsICdTdHlsZVNoZWV0TGlzdCcsICdDU1NSdWxlTGlzdCddLCBpID0gMDsgaSA8IDU7IGkrKyl7XG4gIHZhciBOQU1FICAgICAgID0gY29sbGVjdGlvbnNbaV1cbiAgICAsIENvbGxlY3Rpb24gPSBnbG9iYWxbTkFNRV1cbiAgICAsIHByb3RvICAgICAgPSBDb2xsZWN0aW9uICYmIENvbGxlY3Rpb24ucHJvdG90eXBlO1xuICBpZihwcm90byAmJiAhcHJvdG9bVE9fU1RSSU5HX1RBR10paGlkZShwcm90bywgVE9fU1RSSU5HX1RBRywgTkFNRSk7XG4gIEl0ZXJhdG9yc1tOQU1FXSA9IEl0ZXJhdG9ycy5BcnJheTtcbn1cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvd2ViLmRvbS5pdGVyYWJsZS5qc1xuICoqIG1vZHVsZSBpZCA9IDg5XG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAyXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9jcmVhdGVcIiksIF9fZXNNb2R1bGU6IHRydWUgfTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi8uNi4xMS42QGJhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3QvY3JlYXRlLmpzXG4gKiogbW9kdWxlIGlkID0gOTBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDJcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L3NldC1wcm90b3R5cGUtb2ZcIiksIF9fZXNNb2R1bGU6IHRydWUgfTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi8uNi4xMS42QGJhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3Qvc2V0LXByb3RvdHlwZS1vZi5qc1xuICoqIG1vZHVsZSBpZCA9IDkxXG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAyXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL3N5bWJvbC9mb3JcIiksIF9fZXNNb2R1bGU6IHRydWUgfTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi8uNi4xMS42QGJhYmVsLXJ1bnRpbWUvY29yZS1qcy9zeW1ib2wvZm9yLmpzXG4gKiogbW9kdWxlIGlkID0gOTJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDJcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vc3ltYm9sL2l0ZXJhdG9yXCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vLjYuMTEuNkBiYWJlbC1ydW50aW1lL2NvcmUtanMvc3ltYm9sL2l0ZXJhdG9yLmpzXG4gKiogbW9kdWxlIGlkID0gOTNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDJcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IChfX3dlYnBhY2tfcmVxdWlyZV9fKDEpKSgxMTcpO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZGVsZWdhdGVkIC4vbm9kZV9tb2R1bGVzLy4zLjYuMEByZWR1eC9saWIvaW5kZXguanMgZnJvbSBkbGwtcmVmZXJlbmNlIGxpYnNfbGliXG4gKiogbW9kdWxlIGlkID0gOTRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDJcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IChfX3dlYnBhY2tfcmVxdWlyZV9fKDEpKSgxNDUpO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZGVsZWdhdGVkIC4vbm9kZV9tb2R1bGVzLy4wLjAuOEB3aHktZGlkLXlvdS11cGRhdGUvbGliL2luZGV4LmpzIGZyb20gZGxsLXJlZmVyZW5jZSBsaWJzX2xpYlxuICoqIG1vZHVsZSBpZCA9IDk1XG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAyXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSAoX193ZWJwYWNrX3JlcXVpcmVfXygxKSkoMTY2KTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGRlbGVnYXRlZCAuL25vZGVfbW9kdWxlcy8uMS4wLjZAZmFzdGNsaWNrL2xpYi9mYXN0Y2xpY2suanMgZnJvbSBkbGwtcmVmZXJlbmNlIGxpYnNfbGliXG4gKiogbW9kdWxlIGlkID0gOTZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDJcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IChfX3dlYnBhY2tfcmVxdWlyZV9fKDEpKSgxNjgpO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZGVsZWdhdGVkIC4vbm9kZV9tb2R1bGVzLy4xNS4zLjJAcmVhY3QtYWRkb25zLXBlcmYvaW5kZXguanMgZnJvbSBkbGwtcmVmZXJlbmNlIGxpYnNfbGliXG4gKiogbW9kdWxlIGlkID0gOTdcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDJcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IChfX3dlYnBhY2tfcmVxdWlyZV9fKDEpKSgxNjkpO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZGVsZWdhdGVkIC4vbm9kZV9tb2R1bGVzLy4xNS4zLjJAcmVhY3QtZG9tL2luZGV4LmpzIGZyb20gZGxsLXJlZmVyZW5jZSBsaWJzX2xpYlxuICoqIG1vZHVsZSBpZCA9IDk4XG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAyXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSAoX193ZWJwYWNrX3JlcXVpcmVfXygxKSkoMjM5KTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGRlbGVnYXRlZCAuL25vZGVfbW9kdWxlcy8uMi4xLjBAcmVhY3QtaW1tdXRhYmxlLXByb3B0eXBlcy9kaXN0L0ltbXV0YWJsZVByb3BUeXBlcy5qcyBmcm9tIGRsbC1yZWZlcmVuY2UgbGlic19saWJcbiAqKiBtb2R1bGUgaWQgPSA5OVxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDFcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IChfX3dlYnBhY2tfcmVxdWlyZV9fKDEpKSgyNDApO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZGVsZWdhdGVkIC4vbm9kZV9tb2R1bGVzLy4yLjEuMEByZWR1eC10aHVuay9saWIvaW5kZXguanMgZnJvbSBkbGwtcmVmZXJlbmNlIGxpYnNfbGliXG4gKiogbW9kdWxlIGlkID0gMTAwXG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAyXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSAoX193ZWJwYWNrX3JlcXVpcmVfXygxKSkoMjQ1KTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGRlbGVnYXRlZCAuL25vZGVfbW9kdWxlcy8uMi43LjBAcmVkdXgtbG9nZ2VyL2xpYi9pbmRleC5qcyBmcm9tIGRsbC1yZWZlcmVuY2UgbGlic19saWJcbiAqKiBtb2R1bGUgaWQgPSAxMDFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDJcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IChfX3dlYnBhY2tfcmVxdWlyZV9fKDEpKSgxNDApO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZGVsZWdhdGVkIC4vbm9kZV9tb2R1bGVzLy4wLjAuOEByZWR1eC1pbW11dGFibGVqcy9saWIvaW5kZXguanMgZnJvbSBkbGwtcmVmZXJlbmNlIGxpYnNfbGliXG4gKiogbW9kdWxlIGlkID0gMTA0XG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMVxuICoqLyIsIi8qXHJcbiAqIGFjdGlvbiDnsbvlnotcclxuICovXHJcblxyXG5leHBvcnQgY29uc3QgQUREX1RPRE8gPSAnQUREX1RPRE8nO1xyXG5leHBvcnQgY29uc3QgQ09NUExFVEVfVE9ETyA9ICdDT01QTEVURV9UT0RPJztcclxuZXhwb3J0IGNvbnN0IFNFVF9WSVNJQklMSVRZX0ZJTFRFUiA9ICdTRVRfVklTSUJJTElUWV9GSUxURVInXHJcblxyXG4vKlxyXG4gKiDlhbblroPnmoTluLjph49cclxuICovXHJcblxyXG5leHBvcnQgY29uc3QgVmlzaWJpbGl0eUZpbHRlcnMgPSB7XHJcbiAgICBTSE9XX0FMTDogJ1NIT1dfQUxMJyxcclxuICAgIFNIT1dfQ09NUExFVEVEOiAnU0hPV19DT01QTEVURUQnLFxyXG4gICAgU0hPV19BQ1RJVkU6ICdTSE9XX0FDVElWRSdcclxufTtcclxuXHJcbi8qXHJcbiAqIGFjdGlvbiDliJvlu7rlh73mlbBcclxuICovXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gYWRkVG9kbyh0ZXh0KSB7XHJcbiAgICByZXR1cm4geyB0eXBlOiBBRERfVE9ETywgdGV4dCB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBjb21wbGV0ZVRvZG8oaW5kZXgpIHtcclxuICAgIHJldHVybiB7IHR5cGU6IENPTVBMRVRFX1RPRE8sIGluZGV4IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHNldFZpc2liaWxpdHlGaWx0ZXIoZmlsdGVyKSB7XHJcbiAgICByZXR1cm4geyB0eXBlOiBTRVRfVklTSUJJTElUWV9GSUxURVIsIGZpbHRlciB9XHJcbn1cclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9jb21tb24vcGFnZXMvaW5kZXgvaW5kZXhBY3Rpb25zLmpzXG4gKiovIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IEltbXV0YWJsZSBmcm9tICdpbW11dGFibGUnO1xyXG5cclxuaW1wb3J0IGNyZWF0ZVJlbmRlciBmcm9tICcuLi91dGlscy9jcmVhdGVBcHAnO1xyXG5pbXBvcnQgUGFnZSBmcm9tICcuLi8uLi8uLi9jb21tb24vcGFnZXMvaW5kZXgvSW5kZXguanN4JztcclxuaW1wb3J0IHJvb3RSZWR1Y2VyIGZyb20gJy4uLy4uLy4uL2NvbW1vbi9wYWdlcy9pbmRleC9pbmRleFJlZHVjZXJzJztcclxuXHJcbmltcG9ydCAnLi4vLi4vY3NzL21haW4uY3NzJztcclxuXHJcbmxldCBjcmVhdGVBcHAgPSBjcmVhdGVSZW5kZXIoe1xyXG4gICAgdHJhbnNmb3JtZXI6IEltbXV0YWJsZS5mcm9tSlNcclxufSk7XHJcblxyXG5jcmVhdGVBcHAoe1xyXG4gICAgcm9vdFJlZHVjZXIsXHJcbiAgICBjb21wb25lbnQ6IDxQYWdlLz5cclxufSk7XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vY2xpZW50L2pzL3BhZ2VzL2luZGV4LmpzXG4gKiovIiwiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCwgUHJvcFR5cGVzIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IGNsYXNzbmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgQmFzZSBmcm9tICcuLi8uLi9wYWdlcy9CYXNlJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGFicyBleHRlbmRzIEJhc2Uge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzLCBjb250ZXh0KSB7XG4gICAgICAgIHN1cGVyKHByb3BzLCBjb250ZXh0KTtcblxuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgc2VsZWN0ZWRUYWI6IHByb3BzLmRlZmF1bHRTZWxlY3RlZFRhYiB8fCBudWxsXG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5maXJzdFRhYkxhYmVsID0gbnVsbDtcbiAgICB9XG5cbiAgICBnZXRDaGlsZENvbnRleHQoKXtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG9uU2VsZWN0OiB0aGlzLm9uU2VsZWN0LmJpbmQodGhpcyksXG4gICAgICAgICAgICBzZWxlY3RlZFRhYjogdGhpcy5zdGF0ZS5zZWxlY3RlZFRhYiB8fCB0aGlzLnByb3BzLmRlZmF1bHRTZWxlY3RlZFRhYixcbiAgICAgICAgICAgIGFjdGl2ZVN0eWxlOiB0aGlzLnByb3BzLmFjdGl2ZUxpbmtTdHlsZSB8fCBkZWZhdWx0QWN0aXZlU3R5bGUsXG4gICAgICAgICAgICBmaXJzdFRhYkxhYmVsOiB0aGlzLmZpcnN0VGFiTGFiZWxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBvblNlbGVjdCh0YWIsIC4uLnJlc3QpIHtcbiAgICAgICAgaWYodGhpcy5zdGF0ZS5zZWxlY3RlZFRhYiA9PT0gdGFiKSByZXR1cm47XG5cbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBzZWxlY3RlZFRhYjogdGFiXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmKHR5cGVvZiB0aGlzLnByb3BzLm9uU2VsZWN0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uU2VsZWN0KHRhYiwgLi4ucmVzdCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmaW5kRmlyc3RUYWJMYWJlbChjaGlsZHJlbil7XG4gICAgICAgIGlmICh0eXBlb2YgY2hpbGRyZW4gIT09ICdvYmplY3QnIHx8IHRoaXMuZmlyc3RUYWJMYWJlbCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgUmVhY3QuQ2hpbGRyZW4uZm9yRWFjaChjaGlsZHJlbiwgKGNoaWxkKSA9PiB7XG4gICAgICAgICAgICBpZihjaGlsZC5wcm9wcyAmJiBjaGlsZC5wcm9wcy5sYWJlbCkge1xuICAgICAgICAgICAgICAgIGlmKHRoaXMuZmlyc3RUYWJMYWJlbCA9PSBudWxsKXtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5maXJzdFRhYkxhYmVsID0gY2hpbGQucHJvcHMubGFiZWw7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuZmluZEZpcnN0VGFiTGFiZWwoY2hpbGQucHJvcHMgJiYgY2hpbGQucHJvcHMuY2hpbGRyZW4pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHRoaXMuZmluZEZpcnN0VGFiTGFiZWwodGhpcy5wcm9wcy5jaGlsZHJlbik7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXsgdGhpcy5wcm9wcy5jbGFzc05hbWUgfSBzdHlsZT17IHRoaXMucHJvcHMuc3R5bGUgfT5cbiAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5jaGlsZHJlbn1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblRhYnMuZGVmYXVsdFByb3BzID0ge1xuICAgIG9uU2VsZWN0OiBudWxsLFxuICAgIGFjdGl2ZUxpbmtTdHlsZTogbnVsbCxcbiAgICBkZWZhdWx0U2VsZWN0ZWRUYWI6ICcnLFxuICAgIGNsYXNzTmFtZTogJycsXG4gICAgc3R5bGU6IG51bGxcbn07XG5UYWJzLnByb3BUeXBlcyA9IHtcbiAgICBvblNlbGVjdDogUHJvcFR5cGVzLmZ1bmMsXG4gICAgYWN0aXZlTGlua1N0eWxlOiBQcm9wVHlwZXMub2JqZWN0LFxuICAgIGRlZmF1bHRTZWxlY3RlZFRhYjogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBjbGFzc05hbWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgc3R5bGU6IFByb3BUeXBlcy5vYmplY3Rcbn07XG5UYWJzLmNoaWxkQ29udGV4dFR5cGVzID0ge1xuICAgIG9uU2VsZWN0OiBQcm9wVHlwZXMuZnVuYyxcbiAgICBzZWxlY3RlZFRhYjogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBhY3RpdmVTdHlsZTogUHJvcFR5cGVzLm9iamVjdCxcbiAgICBmaXJzdFRhYkxhYmVsOiBQcm9wVHlwZXMuc3RyaW5nXG59O1xuXG5jb25zdCBkZWZhdWx0QWN0aXZlU3R5bGUgPSB7XG4gICAgZm9udFdlaWdodDogJ2JvbGQnXG59O1xuXG5leHBvcnQgY2xhc3MgVGFiVGl0bGUgZXh0ZW5kcyBDb21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzLCBjb250ZXh0KXtcbiAgICAgICAgc3VwZXIocHJvcHMsIGNvbnRleHQpO1xuXG4gICAgICAgIHRoaXMub25TZWxlY3QgPSB0aGlzLm9uU2VsZWN0LmJpbmQodGhpcyk7XG4gICAgfVxuXG4gICAgb25TZWxlY3QoKXtcbiAgICAgICAgdGhpcy5jb250ZXh0Lm9uU2VsZWN0KHRoaXMucHJvcHMubGFiZWwpO1xuICAgIH1cblxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgICBpZiAodGhpcy5jb250ZXh0LnNlbGVjdGVkVGFiID09PSB0aGlzLnByb3BzLmxhYmVsIHx8ICghdGhpcy5jb250ZXh0LnNlbGVjdGVkVGFiICYmIHRoaXMuY29udGV4dC5maXJzdFRhYkxhYmVsID09PSB0aGlzLnByb3BzLmxhYmVsKSkge1xuICAgICAgICAgICAgdGhpcy5jb250ZXh0Lm9uU2VsZWN0KHRoaXMucHJvcHMubGFiZWwpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICBsZXQgc3R5bGUgPSBudWxsO1xuICAgICAgICBsZXQgaXNBY3RpdmUgPSB0aGlzLmNvbnRleHQuc2VsZWN0ZWRUYWIgPT09IHRoaXMucHJvcHMubGFiZWw7XG4gICAgICAgIGlmIChpc0FjdGl2ZSkge1xuICAgICAgICAgICAgc3R5bGUgPSB0aGlzLmNvbnRleHQuYWN0aXZlU3R5bGU7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGNsc05hbWVzID0gY2xhc3NuYW1lcyh0aGlzLnByb3BzLmNsYXNzTmFtZSwgeyBhY3RpdmU6IGlzQWN0aXZlIH0pO1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXsgY2xzTmFtZXMgfVxuICAgICAgICAgICAgICAgIHN0eWxlPXtzdHlsZX1cbiAgICAgICAgICAgICAgICBvbkNsaWNrPXsgdGhpcy5vblNlbGVjdCB9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAge3RoaXMucHJvcHMuY2hpbGRyZW59XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5UYWJUaXRsZS5kZWZhdWx0UHJvcHMgPSB7XG4gICAgbGFiZWw6ICcnLFxuICAgIGNsYXNzTmFtZTogJ3RhYi1saW5rJ1xufTtcblRhYlRpdGxlLnByb3BUeXBlcyA9IHtcbiAgICBsYWJlbDogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgIGNsYXNzTmFtZTogUHJvcFR5cGVzLnN0cmluZ1xufTtcblRhYlRpdGxlLmNvbnRleHRUeXBlcyA9IHtcbiAgICBvblNlbGVjdDogUHJvcFR5cGVzLmZ1bmMsXG4gICAgZmlyc3RUYWJMYWJlbDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBhY3RpdmVTdHlsZTogUHJvcFR5cGVzLm9iamVjdCxcbiAgICBzZWxlY3RlZFRhYjogUHJvcFR5cGVzLnN0cmluZ1xufTtcblxuY29uc3Qgc3R5bGVzID0ge1xuICAgIHZpc2libGU6IHtcbiAgICAgICAgZGlzcGxheTogJ2Jsb2NrJ1xuICAgIH0sXG4gICAgaGlkZGVuOiB7XG4gICAgICAgIGRpc3BsYXk6ICdub25lJ1xuICAgIH1cbn07XG5cbmV4cG9ydCBjbGFzcyBUYWJQYW5lbCBleHRlbmRzIENvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMsIGNvbnRleHQpe1xuICAgICAgICBzdXBlcihwcm9wcywgY29udGV4dCk7XG5cbiAgICAgICAgZm9yKGxldCBzdHlsZSBpbiBzdHlsZXMpe1xuICAgICAgICAgICAgaWYoc3R5bGVzLmhhc093blByb3BlcnR5KHN0eWxlKSl7XG4gICAgICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihzdHlsZXNbc3R5bGVdLCB0aGlzLnByb3BzLnN0eWxlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgbGV0IGRpc3BsYXlTdHlsZSA9IHRoaXMuY29udGV4dC5zZWxlY3RlZFRhYiA9PT0gdGhpcy5wcm9wcy5mb3JcbiAgICAgICAgICAgID8gc3R5bGVzLnZpc2libGUgOiBzdHlsZXMuaGlkZGVuO1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXsgdGhpcy5wcm9wcy5jbGFzc05hbWUgfVxuICAgICAgICAgICAgICAgIHN0eWxlPXsgZGlzcGxheVN0eWxlIH0+XG4gICAgICAgICAgICAgICAge3RoaXMucHJvcHMuY2hpbGRyZW59XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5UYWJQYW5lbC5kZWZhdWx0UHJvcHMgPSB7XG4gICAgZm9yOiAnJyxcbiAgICBjbGFzc05hbWU6ICd0YWItY29udGVudCcsXG4gICAgc3R5bGU6IG51bGxcbn07XG5UYWJQYW5lbC5wcm9wVHlwZXMgPSB7XG4gICAgZm9yOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgY2xhc3NOYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIHN0eWxlOiBQcm9wVHlwZXMub2JqZWN0XG59O1xuVGFiUGFuZWwuY29udGV4dFR5cGVzID0ge1xuICAgIHNlbGVjdGVkVGFiOiBQcm9wVHlwZXMuc3RyaW5nXG59O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9jb21tb24vY29tcG9uZW50cy9jb21tb24vVGFiLmpzeFxuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxudmFyIF9qc3gyID0gcmVxdWlyZSgnYmFiZWwtcnVudGltZS9oZWxwZXJzL2pzeCcpO1xuXG52YXIgX2pzeDMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9qc3gyKTtcblxudmFyIF9jbGFzc0NhbGxDaGVjazIgPSByZXF1aXJlKCdiYWJlbC1ydW50aW1lL2hlbHBlcnMvY2xhc3NDYWxsQ2hlY2snKTtcblxudmFyIF9jbGFzc0NhbGxDaGVjazMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jbGFzc0NhbGxDaGVjazIpO1xuXG52YXIgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4yID0gcmVxdWlyZSgnYmFiZWwtcnVudGltZS9oZWxwZXJzL3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4nKTtcblxudmFyIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4yKTtcblxudmFyIF9pbmhlcml0czIgPSByZXF1aXJlKCdiYWJlbC1ydW50aW1lL2hlbHBlcnMvaW5oZXJpdHMnKTtcblxudmFyIF9pbmhlcml0czMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pbmhlcml0czIpO1xuXG52YXIgX3JlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcblxudmFyIF9yZWFjdDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9yZWFjdCk7XG5cbnZhciBfQmFzZTIgPSByZXF1aXJlKCcuLi8uLi9wYWdlcy9CYXNlJyk7XG5cbnZhciBfQmFzZTMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9CYXNlMik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbnZhciBBZGRUb2RvID0gZnVuY3Rpb24gKF9CYXNlKSB7XG4gICAgKDAsIF9pbmhlcml0czMuZGVmYXVsdCkoQWRkVG9kbywgX0Jhc2UpO1xuXG4gICAgZnVuY3Rpb24gQWRkVG9kbyhwcm9wcywgY29udGV4dCkge1xuICAgICAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMy5kZWZhdWx0KSh0aGlzLCBBZGRUb2RvKTtcbiAgICAgICAgcmV0dXJuICgwLCBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjMuZGVmYXVsdCkodGhpcywgX0Jhc2UuY2FsbCh0aGlzLCBwcm9wcywgY29udGV4dCkpO1xuICAgIH1cblxuICAgIEFkZFRvZG8ucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuICgwLCBfanN4My5kZWZhdWx0KSgnZGl2Jywge30sIHZvaWQgMCwgX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoJ2lucHV0JywgeyB0eXBlOiAndGV4dCcsIHJlZjogJ2lucHV0JyB9KSwgKDAsIF9qc3gzLmRlZmF1bHQpKCdidXR0b24nLCB7XG4gICAgICAgICAgICBvbkNsaWNrOiB0aGlzLm9uQ2xpY2suYmluZCh0aGlzKVxuICAgICAgICB9LCB2b2lkIDAsICdBZGQnKSk7XG4gICAgfTtcblxuICAgIEFkZFRvZG8ucHJvdG90eXBlLm9uQ2xpY2sgPSBmdW5jdGlvbiBvbkNsaWNrKGUpIHtcbiAgICAgICAgdmFyIG5vZGUgPSB0aGlzLnJlZnMuaW5wdXQ7XG4gICAgICAgIHZhciB0ZXh0ID0gbm9kZS52YWx1ZS50cmltKCk7XG4gICAgICAgIHRoaXMucHJvcHMub25BZGRDbGljayh0ZXh0KTtcbiAgICAgICAgbm9kZS52YWx1ZSA9ICcnO1xuICAgIH07XG5cbiAgICByZXR1cm4gQWRkVG9kbztcbn0oX0Jhc2UzLmRlZmF1bHQpO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBBZGRUb2RvO1xuXG5cbkFkZFRvZG8ucHJvcFR5cGVzID0ge1xuICAgIG9uQWRkQ2xpY2s6IF9yZWFjdC5Qcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkXG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9jb21tb24vY29tcG9uZW50cy9pbmRleC9BZGRUb2RvLmpzeFxuICoqIG1vZHVsZSBpZCA9IDExOVxuICoqIG1vZHVsZSBjaHVua3MgPSAxXG4gKiovIiwiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCwgUHJvcFR5cGVzIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IEJhc2UgZnJvbSAnLi4vLi4vcGFnZXMvQmFzZSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZvb3RlciBleHRlbmRzIEJhc2Uge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzLCBjb250ZXh0KSB7XG4gICAgICAgIHN1cGVyKHByb3BzLCBjb250ZXh0KTtcbiAgICB9XG5cbiAgICByZW5kZXJGaWx0ZXIoZmlsdGVyLCBuYW1lKSB7XG4gICAgICAgIGlmIChmaWx0ZXIgPT09IHRoaXMucHJvcHMuZmlsdGVyKSB7XG4gICAgICAgICAgICByZXR1cm4gbmFtZVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxhIGhyZWY9JyMnIG9uQ2xpY2s9e2UgPT4ge1xuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgICAgICAgICAgICAgIHRoaXMucHJvcHMub25GaWx0ZXJDaGFuZ2UoZmlsdGVyKVxuICAgICAgICAgICAgfSB9PlxuICAgICAgICAgICAgICAgIHtuYW1lfVxuICAgICAgICAgICAgPC9hPlxuICAgICAgICApXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPHA+XG4gICAgICAgICAgICAgICAgU2hvdzpcbiAgICAgICAgICAgICAgICB7JyAnfVxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlckZpbHRlcignU0hPV19BTEwnLCAnQWxsJykgfVxuICAgICAgICAgICAgICAgIHsnLCAnfVxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlckZpbHRlcignU0hPV19DT01QTEVURUQnLCAnQ29tcGxldGVkJykgfVxuICAgICAgICAgICAgICAgIHsnLCAnfVxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlckZpbHRlcignU0hPV19BQ1RJVkUnLCAnQWN0aXZlJykgfVxuICAgICAgICAgICAgICAgIC5cbiAgICAgICAgICAgIDwvcD5cbiAgICAgICAgKVxuICAgIH1cbn1cblxuRm9vdGVyLnByb3BUeXBlcyA9IHtcbiAgICBvbkZpbHRlckNoYW5nZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBmaWx0ZXI6IFByb3BUeXBlcy5vbmVPZihbXG4gICAgICAgICdTSE9XX0FMTCcsXG4gICAgICAgICdTSE9XX0NPTVBMRVRFRCcsXG4gICAgICAgICdTSE9XX0FDVElWRSdcbiAgICBdKS5pc1JlcXVpcmVkXG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2NvbW1vbi9jb21wb25lbnRzL2luZGV4L0Zvb3Rlci5qc3hcbiAqKi8iLCJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgQmFzZSBmcm9tICcuLi8uLi9wYWdlcy9CYXNlJztcclxuXHJcbmxldCBzdHlsZXMgPSB7XHJcbiAgICBjb21wbGV0ZWQ6IHtcclxuICAgICAgICB0ZXh0RGVjb3JhdGlvbjogJ2xpbmUtdGhyb3VnaCcsXHJcbiAgICAgICAgY3Vyc29yOiAnZGVmYXVsdCdcclxuICAgIH0sXHJcbiAgICB1bmNvbXBsZXRlZDoge1xyXG4gICAgICAgIHRleHREZWNvcmF0aW9uOiAnbm9uZScsXHJcbiAgICAgICAgY3Vyc29yOiAncG9pbnRlcidcclxuICAgIH1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRvZG8gZXh0ZW5kcyBCYXNlIHtcclxuICAgIGNvbnN0cnVjdG9yKHByb3BzLCBjb250ZXh0KSB7XHJcbiAgICAgICAgc3VwZXIocHJvcHMsIGNvbnRleHQpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xyXG4gICAgICAgIHRoaXMub24oJ3Rlc3QnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCd0ZXN0IGV2ZW50IGJ1cycpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50KCl7XHJcbiAgICAgICAgLy8gdW5yZWdpc3RlciBzdWJzY3JpYmVcclxuICAgICAgICBzdXBlci5jb21wb25lbnRXaWxsVW5tb3VudCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8bGkgb25DbGljaz17dGhpcy5wcm9wcy5vbkNsaWNrfVxyXG4gICAgICAgICAgICAgICAgc3R5bGU9eyB0aGlzLnByb3BzLmNvbXBsZXRlZCA/IHN0eWxlcy5jb21wbGV0ZWQgOiBzdHlsZXMudW5jb21wbGV0ZWQgfT5cclxuICAgICAgICAgICAgICAgIHsgdGhpcy5wcm9wcy50ZXh0IH1cclxuICAgICAgICAgICAgPC9saT5cclxuICAgICAgICApXHJcbiAgICB9XHJcbn1cclxuVG9kby5kZWZhdWx0UHJvcHMgPSB7XHJcbiAgICBvbkNsaWNrOiBmdW5jdGlvbigpe30sXHJcbiAgICB0ZXh0OiAnJyxcclxuICAgIGNvbXBsZXRlZDogZmFsc2VcclxufTtcclxuVG9kby5wcm9wVHlwZXMgPSB7XHJcbiAgICBvbkNsaWNrOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxyXG4gICAgdGV4dDogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxyXG4gICAgY29tcGxldGVkOiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkXHJcbn07XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vY29tbW9uL2NvbXBvbmVudHMvaW5kZXgvVG9kby5qc3hcbiAqKi8iLCJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50LCBQcm9wVHlwZXMgfSBmcm9tICdyZWFjdCdcbmltcG9ydCB7IExpc3QgfSBmcm9tICdpbW11dGFibGUnO1xuaW1wb3J0IEltbXV0YWJsZVByb3BUeXBlcyBmcm9tICdyZWFjdC1pbW11dGFibGUtcHJvcHR5cGVzJztcbmltcG9ydCBUb2RvIGZyb20gJy4vVG9kbydcbmltcG9ydCBCYXNlIGZyb20gJy4uLy4uL3BhZ2VzL0Jhc2UnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUb2RvTGlzdCBleHRlbmRzIEJhc2Uge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzLCBjb250ZXh0KSB7XG4gICAgICAgIHN1cGVyKHByb3BzLCBjb250ZXh0KTtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8dWw+XG4gICAgICAgICAgICAgICAgeyB0aGlzLnByb3BzLnRvZG9zLm1hcCgodG9kbywgaW5kZXgpID0+XG4gICAgICAgICAgICAgICAgICAgIDxUb2RvIHRleHQ9eyB0b2RvLmdldCgndGV4dCcpIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBsZXRlZD17IHRvZG8uZ2V0KCdjb21wbGV0ZWQnKSB9XG4gICAgICAgICAgICAgICAgICAgICAgICBrZXk9e2luZGV4fVxuICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gdGhpcy5wcm9wcy5vblRvZG9DbGljayhpbmRleCkgfSAvPlxuICAgICAgICAgICAgICAgICAgICApIH1cbiAgICAgICAgICAgIDwvdWw+XG4gICAgICAgIClcbiAgICB9XG59XG5cblRvZG9MaXN0LnByb3BUeXBlcyA9IHtcbiAgICBvblRvZG9DbGljazogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICB0b2RvczogSW1tdXRhYmxlUHJvcFR5cGVzLmxpc3RPZihJbW11dGFibGVQcm9wVHlwZXMuY29udGFpbnMoe1xuICAgICAgICB0ZXh0OiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgICAgIGNvbXBsZXRlZDogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZFxuICAgIH0pKVxufTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vY29tbW9uL2NvbXBvbmVudHMvaW5kZXgvVG9kb0xpc3QuanN4XG4gKiovIiwiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCwgUHJvcFR5cGVzIH0gZnJvbSAncmVhY3QnXHJcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCdcclxuaW1wb3J0IHsgTGlzdCB9IGZyb20gJ2ltbXV0YWJsZSc7XHJcbmltcG9ydCBCYXNlIGZyb20gJy4uL0Jhc2UuanN4JztcclxuaW1wb3J0IHsgYWRkVG9kbywgY29tcGxldGVUb2RvLCBzZXRWaXNpYmlsaXR5RmlsdGVyLCBWaXNpYmlsaXR5RmlsdGVycyB9IGZyb20gJy4vaW5kZXhBY3Rpb25zJ1xyXG5pbXBvcnQgQWRkVG9kbyBmcm9tICcuLi8uLi9jb21wb25lbnRzL2luZGV4L0FkZFRvZG8nXHJcbmltcG9ydCBUb2RvTGlzdCBmcm9tICcuLi8uLi9jb21wb25lbnRzL2luZGV4L1RvZG9MaXN0J1xyXG5pbXBvcnQgRm9vdGVyIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvaW5kZXgvRm9vdGVyJztcclxuaW1wb3J0IFRhYnMsIHsgVGFiVGl0bGUsIFRhYlBhbmVsIH0gZnJvbSAnLi4vLi4vY29tcG9uZW50cy9jb21tb24vVGFiJztcclxuXHJcbmNsYXNzIFBhZ2UgZXh0ZW5kcyBCYXNlIHtcclxuICAgIGNvbnN0cnVjdG9yKHByb3BzLCBjb250ZXh0KSB7XHJcbiAgICAgICAgc3VwZXIocHJvcHMsIGNvbnRleHQpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbXBvbmVudERpZE1vdW50KCl7XHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5jb250ZXh0LiRhcHBDb25maWcudXNlcik7XHJcblxyXG4gICAgICAgIHRoaXMuZW1pdCgndGVzdCcpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICAvLyBJbmplY3RlZCBieSBjb25uZWN0KCkgY2FsbDpcclxuICAgICAgICBjb25zdCB7IGRpc3BhdGNoLCB2aXNpYmxlVG9kb3MsIHZpc2liaWxpdHlGaWx0ZXIgfSA9IHRoaXMucHJvcHNcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICAgICAgPEFkZFRvZG9cclxuICAgICAgICAgICAgICAgICAgICBvbkFkZENsaWNrPXt0ZXh0ID0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BhdGNoKGFkZFRvZG8odGV4dCkpXHJcbiAgICAgICAgICAgICAgICAgICAgfSAvPlxyXG4gICAgICAgICAgICAgICAgPFRvZG9MaXN0XHJcbiAgICAgICAgICAgICAgICAgICAgdG9kb3M9e3Zpc2libGVUb2Rvc31cclxuICAgICAgICAgICAgICAgICAgICBvblRvZG9DbGljaz17aW5kZXggPT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGF0Y2goY29tcGxldGVUb2RvKGluZGV4KSlcclxuICAgICAgICAgICAgICAgICAgICB9IC8+XHJcbiAgICAgICAgICAgICAgICA8Rm9vdGVyXHJcbiAgICAgICAgICAgICAgICAgICAgZmlsdGVyPXt2aXNpYmlsaXR5RmlsdGVyfVxyXG4gICAgICAgICAgICAgICAgICAgIG9uRmlsdGVyQ2hhbmdlPXtuZXh0RmlsdGVyID0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BhdGNoKHNldFZpc2liaWxpdHlGaWx0ZXIobmV4dEZpbHRlcikpXHJcbiAgICAgICAgICAgICAgICAgICAgfSAvPlxyXG4gICAgICAgICAgICAgICAgPFRhYnMgZGVmYXVsdFNlbGVjdGVkVGFiPVwiMVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxUYWJUaXRsZSBsYWJlbD1cIjFcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGFiMVxyXG4gICAgICAgICAgICAgICAgICAgIDwvVGFiVGl0bGU+XHJcbiAgICAgICAgICAgICAgICAgICAgPFRhYlRpdGxlIGxhYmVsPVwiMlwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0YWIyXHJcbiAgICAgICAgICAgICAgICAgICAgPC9UYWJUaXRsZT5cclxuICAgICAgICAgICAgICAgICAgICA8VGFiUGFuZWwgZm9yPVwiMVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBUYWJDb250ZW50MVxyXG4gICAgICAgICAgICAgICAgICAgIDwvVGFiUGFuZWw+XHJcbiAgICAgICAgICAgICAgICAgICAgPFRhYlBhbmVsIGZvcj1cIjJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgVGFiQ29udGVudDJcclxuICAgICAgICAgICAgICAgICAgICA8L1RhYlBhbmVsPlxyXG4gICAgICAgICAgICAgICAgPC9UYWJzPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApXHJcbiAgICB9XHJcbn1cclxuXHJcblBhZ2UucHJvcFR5cGVzID0ge1xyXG4gICAgdmlzaWJsZVRvZG9zOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihMaXN0KS5pc1JlcXVpcmVkLFxyXG4gICAgdmlzaWJpbGl0eUZpbHRlcjogUHJvcFR5cGVzLm9uZU9mKFtcclxuICAgICAgICAnU0hPV19BTEwnLFxyXG4gICAgICAgICdTSE9XX0NPTVBMRVRFRCcsXHJcbiAgICAgICAgJ1NIT1dfQUNUSVZFJ1xyXG4gICAgXSkuaXNSZXF1aXJlZFxyXG59O1xyXG5QYWdlLmNvbnRleHRUeXBlcyA9IHtcclxuICAgICRhcHBDb25maWc6IFByb3BUeXBlcy5vYmplY3QsXHJcbiAgICAkZXZlbnRCdXM6IFByb3BUeXBlcy5vYmplY3RcclxufTtcclxuXHJcbmZ1bmN0aW9uIHNlbGVjdFRvZG9zKHRvZG9zLCBmaWx0ZXIpIHtcclxuICAgIHN3aXRjaCAoZmlsdGVyKSB7XHJcbiAgICAgICAgY2FzZSBWaXNpYmlsaXR5RmlsdGVycy5TSE9XX0FMTDpcclxuICAgICAgICAgICAgcmV0dXJuIHRvZG9zXHJcbiAgICAgICAgY2FzZSBWaXNpYmlsaXR5RmlsdGVycy5TSE9XX0NPTVBMRVRFRDpcclxuICAgICAgICAgICAgcmV0dXJuIHRvZG9zLmZpbHRlcih0b2RvID0+IHRvZG8uZ2V0KCdjb21wbGV0ZWQnKSlcclxuICAgICAgICBjYXNlIFZpc2liaWxpdHlGaWx0ZXJzLlNIT1dfQUNUSVZFOlxyXG4gICAgICAgICAgICByZXR1cm4gdG9kb3MuZmlsdGVyKHRvZG8gPT4gIXRvZG8uZ2V0KCdjb21wbGV0ZWQnKSlcclxuICAgIH1cclxufVxyXG5cclxuLy8gV2hpY2ggcHJvcHMgZG8gd2Ugd2FudCB0byBpbmplY3QsIGdpdmVuIHRoZSBnbG9iYWwgc3RhdGU/XHJcbi8vIE5vdGU6IHVzZSBodHRwczovL2dpdGh1Yi5jb20vZmFhc3Nlbi9yZXNlbGVjdCBmb3IgYmV0dGVyIHBlcmZvcm1hbmNlLlxyXG5mdW5jdGlvbiBzZWxlY3Qoc3RhdGUpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgdmlzaWJsZVRvZG9zOiBzZWxlY3RUb2RvcyhzdGF0ZS5nZXQoJ3RvZG9zJyksIHN0YXRlLmdldCgndmlzaWJpbGl0eUZpbHRlcicpKSxcclxuICAgICAgICB2aXNpYmlsaXR5RmlsdGVyOiBzdGF0ZS5nZXQoJ3Zpc2liaWxpdHlGaWx0ZXInKVxyXG4gICAgfVxyXG59XHJcblxyXG4vLyDljIXoo4UgY29tcG9uZW50IO+8jOazqOWFpSBkaXNwYXRjaCDlkowgc3RhdGUg5Yiw5YW26buY6K6k55qEIGNvbm5lY3Qoc2VsZWN0KShBcHApIOS4re+8m1xyXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KHNlbGVjdCkoUGFnZSk7XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vY29tbW9uL3BhZ2VzL2luZGV4L0luZGV4LmpzeFxuICoqLyIsIi8vIGltcG9ydCB7IGNvbWJpbmVSZWR1Y2VycyB9IGZyb20gJ3JlZHV4J1xuaW1wb3J0IHsgTGlzdCwgTWFwIH0gZnJvbSAnaW1tdXRhYmxlJztcbmltcG9ydCB7IGNvbWJpbmVSZWR1Y2VycyB9IGZyb20gJ3JlZHV4LWltbXV0YWJsZWpzJztcbmltcG9ydCB7IEFERF9UT0RPLCBDT01QTEVURV9UT0RPLCBTRVRfVklTSUJJTElUWV9GSUxURVIsIFZpc2liaWxpdHlGaWx0ZXJzIH0gZnJvbSAnLi9pbmRleEFjdGlvbnMnXG5jb25zdCB7IFNIT1dfQUxMIH0gPSBWaXNpYmlsaXR5RmlsdGVyc1xuXG5mdW5jdGlvbiB2aXNpYmlsaXR5RmlsdGVyKHN0YXRlID0gU0hPV19BTEwsIGFjdGlvbikge1xuICAgIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICAgICAgY2FzZSBTRVRfVklTSUJJTElUWV9GSUxURVI6XG4gICAgICAgICAgICByZXR1cm4gYWN0aW9uLmZpbHRlclxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgcmV0dXJuIHN0YXRlXG4gICAgfVxufVxuXG5mdW5jdGlvbiB0b2RvcyhzdGF0ZSA9IG5ldyBMaXN0KCksIGFjdGlvbikge1xuICAgIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICAgICAgY2FzZSBBRERfVE9ETzpcbiAgICAgICAgICAgIHJldHVybiBzdGF0ZS5wdXNoKG5ldyBNYXAoe1xuICAgICAgICAgICAgICAgICAgICB0ZXh0OiBhY3Rpb24udGV4dCxcbiAgICAgICAgICAgICAgICAgICAgY29tcGxldGVkOiBmYWxzZVxuICAgICAgICAgICAgICAgIH0pKVxuICAgICAgICBjYXNlIENPTVBMRVRFX1RPRE86XG4gICAgICAgICAgICByZXR1cm4gc3RhdGUudXBkYXRlKGFjdGlvbi5pbmRleCwgZnVuY3Rpb24oaXRlbSl7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW0uc2V0KCdjb21wbGV0ZWQnLCB0cnVlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgcmV0dXJuIHN0YXRlXG4gICAgfVxufVxuXG5jb25zdCB0b2RvQXBwID0gY29tYmluZVJlZHVjZXJzKHtcbiAgICB2aXNpYmlsaXR5RmlsdGVyLFxuICAgIHRvZG9zXG59KVxuXG5leHBvcnQgZGVmYXVsdCB0b2RvQXBwXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2NvbW1vbi9wYWdlcy9pbmRleC9pbmRleFJlZHVjZXJzLmpzXG4gKiovIiwiLyohXG4gIENvcHlyaWdodCAoYykgMjAxNiBKZWQgV2F0c29uLlxuICBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UgKE1JVCksIHNlZVxuICBodHRwOi8vamVkd2F0c29uLmdpdGh1Yi5pby9jbGFzc25hbWVzXG4qL1xuLyogZ2xvYmFsIGRlZmluZSAqL1xuXG4oZnVuY3Rpb24gKCkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0dmFyIGhhc093biA9IHt9Lmhhc093blByb3BlcnR5O1xuXG5cdGZ1bmN0aW9uIGNsYXNzTmFtZXMgKCkge1xuXHRcdHZhciBjbGFzc2VzID0gW107XG5cblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGFyZyA9IGFyZ3VtZW50c1tpXTtcblx0XHRcdGlmICghYXJnKSBjb250aW51ZTtcblxuXHRcdFx0dmFyIGFyZ1R5cGUgPSB0eXBlb2YgYXJnO1xuXG5cdFx0XHRpZiAoYXJnVHlwZSA9PT0gJ3N0cmluZycgfHwgYXJnVHlwZSA9PT0gJ251bWJlcicpIHtcblx0XHRcdFx0Y2xhc3Nlcy5wdXNoKGFyZyk7XG5cdFx0XHR9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkoYXJnKSkge1xuXHRcdFx0XHRjbGFzc2VzLnB1c2goY2xhc3NOYW1lcy5hcHBseShudWxsLCBhcmcpKTtcblx0XHRcdH0gZWxzZSBpZiAoYXJnVHlwZSA9PT0gJ29iamVjdCcpIHtcblx0XHRcdFx0Zm9yICh2YXIga2V5IGluIGFyZykge1xuXHRcdFx0XHRcdGlmIChoYXNPd24uY2FsbChhcmcsIGtleSkgJiYgYXJnW2tleV0pIHtcblx0XHRcdFx0XHRcdGNsYXNzZXMucHVzaChrZXkpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiBjbGFzc2VzLmpvaW4oJyAnKTtcblx0fVxuXG5cdGlmICh0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyAmJiBtb2R1bGUuZXhwb3J0cykge1xuXHRcdG1vZHVsZS5leHBvcnRzID0gY2xhc3NOYW1lcztcblx0fSBlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBkZWZpbmUuYW1kID09PSAnb2JqZWN0JyAmJiBkZWZpbmUuYW1kKSB7XG5cdFx0Ly8gcmVnaXN0ZXIgYXMgJ2NsYXNzbmFtZXMnLCBjb25zaXN0ZW50IHdpdGggbnBtIHBhY2thZ2UgbmFtZVxuXHRcdGRlZmluZSgnY2xhc3NuYW1lcycsIFtdLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRyZXR1cm4gY2xhc3NOYW1lcztcblx0XHR9KTtcblx0fSBlbHNlIHtcblx0XHR3aW5kb3cuY2xhc3NOYW1lcyA9IGNsYXNzTmFtZXM7XG5cdH1cbn0oKSk7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi8uMi4yLjVAY2xhc3NuYW1lcy9pbmRleC5qc1xuICoqIG1vZHVsZSBpZCA9IDEyN1xuICoqIG1vZHVsZSBjaHVua3MgPSAxXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==