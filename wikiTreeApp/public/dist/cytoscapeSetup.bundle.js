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

eval("var cy;\ndocument.addEventListener(\"DOMContentLoaded\", function () {\n  cy = cytoscape({\n    container: document.getElementById(\"cy\"),\n    elements: [\n    // nodes\n    {\n      data: {\n        id: 'Richard_Gadd',\n        article: 'Richard_Gadd'\n      },\n      position: {\n        x: 100,\n        y: 100\n      }\n    }, {\n      data: {\n        id: 'b',\n        article: 'b'\n      },\n      position: {\n        x: 200,\n        y: 200\n      }\n    }],\n    style: [{\n      selector: 'node',\n      style: {\n        'background-color': '#666',\n        'label': 'data(id)'\n      }\n    }],\n    layout: {\n      name: 'preset'\n    }\n  });\n  cy.on('tap', 'node', function (evt) {\n    var node = evt.target;\n    console.log('Clicked node:', node);\n\n    // Make a request to the route that returns a JSON of all the links to the article\n    fetch(\"/fetch/\".concat(node.data('article'))).then(function (response) {\n      if (!response.ok) {\n        throw new Error(\"HTTP error! status: \".concat(response.status));\n      }\n      return response.json();\n    }).then(function (links) {\n      console.log('Received links:', links);\n\n      // Add the new nodes and edges to the graph\n      var newElements = links.map(function (link) {\n        return {\n          data: {\n            id: link.data.name,\n            name: link.data.name,\n            article: link.data.name\n          },\n          position: {\n            x: node.position('x'),\n            y: node.position('y')\n          }\n        };\n      }).concat(links.map(function (link) {\n        return {\n          data: {\n            source: node.data('id'),\n            target: link.data.name\n          }\n        };\n      }));\n      console.log('Adding new elements:', newElements);\n      var eles = cy.add(newElements);\n      var nodePositions = node.position();\n      // Run the circular layout on the new nodes\n      eles.layout({\n        name: 'circle',\n        boundingBox: {\n          x1: nodePositions.x - 100,\n          y1: nodePositions.y - 100,\n          x2: nodePositions.x + 100,\n          y2: nodePositions.y + 100\n        }\n      }).run();\n    })[\"catch\"](function (e) {\n      return console.log('There was a problem with your fetch operation: ' + e.message);\n    });\n  });\n});\nfunction addNode(nodeId, article) {\n  var existingNode = cy.$('#' + nodeId);\n  if (existingNode.length) {\n    // Node with given ID already exists, select it and center the screen on it\n    existingNode.select();\n    cy.center(existingNode);\n    console.log(\"Selected node \" + nodeId);\n  } else {\n    // Node with given ID doesn't exist, create it\n    cy.add({\n      data: {\n        id: nodeId,\n        article: article\n      }\n    });\n    cy.center();\n    console.log(\"Added node \" + nodeId);\n  }\n}\nmodule.exports = {\n  addNode: addNode\n};\n\n//# sourceURL=webpack://wikitreeapp/./public/js/cytoscapeSetup.js?");

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