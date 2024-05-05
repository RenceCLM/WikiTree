/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./public/js/cytoscapeSetup.js":
/*!*************************************!*\
  !*** ./public/js/cytoscapeSetup.js ***!
  \*************************************/
/***/ ((module) => {

eval("var cy;\ndocument.addEventListener(\"DOMContentLoaded\", function () {\n  cy = cytoscape({\n    container: document.getElementById(\"cy\"),\n    elements: [\n    // nodes\n    {\n      data: {\n        id: 'a'\n      }\n    }],\n    style: [{\n      selector: 'node',\n      style: {\n        'background-color': '#666',\n        'label': 'data(id)'\n      }\n    }],\n    layout: {\n      name: 'grid'\n    }\n  });\n  cy.zoom(0.9);\n  cy.center();\n});\nfunction addNode(nodeId) {\n  var existingNode = cy.$('#' + nodeId);\n  if (existingNode.length) {\n    // Node with given ID already exists, select it and center the screen on it\n    existingNode.select();\n    cy.center(existingNode);\n    console.log(\"Selected node \" + nodeId);\n  } else {\n    // Node with given ID doesn't exist, create it\n    cy.add({\n      data: {\n        id: nodeId\n      }\n    });\n    cy.layout({\n      name: 'grid'\n    }).run();\n    cy.center();\n    console.log(\"Added node \" + nodeId);\n  }\n}\nmodule.exports = {\n  addNode: addNode\n};\n\n//# sourceURL=webpack://wikitreeapp/./public/js/cytoscapeSetup.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./public/js/cytoscapeSetup.js");
/******/ 	
/******/ })()
;