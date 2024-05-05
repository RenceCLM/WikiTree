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

/***/ "./public/js/commandPalette.js":
/*!*************************************!*\
  !*** ./public/js/commandPalette.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("var addNode = (__webpack_require__(/*! ./cytoscapeSetup.js */ \"./public/js/cytoscapeSetup.js\").addNode);\nvar commandPalette = document.getElementById('command-palette');\nwindow.addEventListener('keydown', function (event) {\n  // Listen for Ctrl+P or Cmd+P\n  if ((event.ctrlKey || event.metaKey) && event.key === 'p') {\n    event.preventDefault();\n    commandPalette.focus();\n  }\n});\n\n// Listen for input in the command palette\n// ISN'T WORKING FOR NOW\n// commandPalette.addEventListener('input', function() {\n//     var input = commandPalette.value;\n//     var matchingCommands = commands.filter(function(command) {\n//         return command.toLowerCase().includes(input.toLowerCase());\n//     });\n\n//     // Display the matching commands to the user\n//     console.log(matchingCommands);\n// });\n\n// Listen for Enter in the command palette\ncommandPalette.addEventListener('keydown', function (event) {\n  if (event.key === 'Enter') {\n    var input = commandPalette.value;\n    addNode(input);\n    event.target.value = '';\n  }\n});\n\n//# sourceURL=webpack://wikitreeapp/./public/js/commandPalette.js?");

/***/ }),

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
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./public/js/commandPalette.js");
/******/ 	
/******/ })()
;