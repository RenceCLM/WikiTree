const cytoscape = require('cytoscape');
const cxtmenu = require('cytoscape-cxtmenu');
let history = [];
let currentState = -1;
let maxState = -1;

cytoscape.use(cxtmenu);

let cy;

document.addEventListener("DOMContentLoaded", function() {
    cy = cytoscape({
        container: document.getElementById("cy"),
        elements: [
            // nodes
            { data: { id: 'Philippines', article: 'Philippines' }, position: { x: 100, y: 100 } },
            { data: { id: 'Tarlac City', article: 'Tarlac City' }, position: { x: 200, y: 200 } },
        ],
        style: [
            {
                selector: 'node',
                style: {
                    'background-color': '#666',
                    'label': 'data(id)'
                }
            }
        ],
        layout: {
            name: 'preset'
        },
    });

    cy.cxtmenu({
    selector: 'node',
    commands: [
        {
            content: 'Lineup Outgoers',
            select: function(ele) {
                const outgoers = ele.outgoers().filter(outgoer => outgoer.isNode() && outgoer !== ele);                
                const elePosition = ele.position();
                const totalHeight = (outgoers.length - 1) * 50; // 50 is the new vertical distance between nodes
                const layout = outgoers.layout({
                    name: 'preset',
                    positions: (node) => {
                        const index = outgoers.indexOf(node);
                        return {
                            x: elePosition.x - 100, // 100 is the distance from the selected node
                            y: elePosition.y + index * 50 - totalHeight / 2 // Center the nodes on the y-axis of the selected node
                        };
                    },
                    fit: false // Prevents the viewport from being adjusted
                });
                layout.run();
                saveState();
            }
        },

        {
            content: 'Scroll Outgoers',
            select: function(ele) {
                const outgoers = ele.outgoers().filter(ele => ele.isNode());
                const animationSpeed = 300; // Speed of the animation in milliseconds
                let stopAnimation = false;
                let currentIndex = 0;
                let tapTimeout = null;
                let doubleTapped = false;

                function animateToNode(index) {
                    if (index < outgoers.length && !stopAnimation && !doubleTapped) {
                        cy.animate({
                            center: { eles: outgoers[index] },
                            duration: animationSpeed,
                            complete: function() {
                                currentIndex = index + 1;
                                animateToNode(currentIndex); // Call the function again for the next node
                            }
                        });
                    }
                }

                animateToNode(currentIndex); // Start the animation with the first node

                // Toggle the animation when the user clicks
                cy.on('tap', function() {
                    if (tapTimeout === null) {
                        // First tap
                        stopAnimation = !stopAnimation;
                        if (!stopAnimation) {
                            animateToNode(currentIndex); // Resume the animation
                        } else {
                            cy.stop();
                        }

                        tapTimeout = setTimeout(function() {
                            tapTimeout = null;
                        }, 300); // Wait for 300ms to see if it's a double tap
                    } else {
                        // Second tap
                        clearTimeout(tapTimeout);
                        tapTimeout = null;
                        // Double tap
                        doubleTapped = true;
                        stopAnimation = true;
                        cy.stop();

                        // Reset the animation
                        stopAnimation = false;
                        currentIndex = 0;
                    }
                });
            }
        },

        {
            content: 'Outgoers',
            select: function(ele){
                console.log("Selected Node: ", ele.data());
                const outgoers = ele.outgoers().filter(ele => ele.isNode());
                console.log("Outgoers: ", outgoers.map(ele => ele.id()).join(', '));
            }
        },

        { 
            content: 'Incomers',
            select: function(ele){
                console.log("Selected Node: ", ele.data());
                const incomers = ele.incomers().filter(ele => ele.isNode());
                console.log("Incomers: ", incomers.map(ele => ele.id()).join(', '));
            }
        },

        {
            content: 'Successors',
            select: function(ele){
                console.log("Selected Node: ", ele.data());
                const successors = ele.successors().filter(ele => ele.isNode());
                console.log("Successors: ", successors.map(ele => ele.id()).join(', '));
            }
        },

        {
            content: 'Predecessors',
            select: function(ele){
                console.log("Selected Node: ", ele.data());
                const predecessors = ele.predecessors().filter(ele => ele.isNode());
                console.log("Predecessors: ", predecessors.map(ele => ele.id()).join(', '));
            }
        },
    ]
    });

    cy.on('tap', 'node', function(evt){
        const node = evt.target.first();
    
        // Start the glowing effect
        let glow = 0;
        const glowInterval = setInterval(() => {
            glow = (Math.sin(Date.now() / 500) + 1) / 2; // Change 500 to adjust the speed of the glow
            node.style({
                'border-color': `rgba(255, 0, 0, ${glow})`, // Change the alpha value to create the glow effect
                'border-width': 10 * glow
            });
        }, 100); // Change this value to adjust the speed of the glow
    
        // Make a request to the route that returns a JSON of all the links to the article
        fetch(`/fetch/${node.data('article')}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(links => {
                // Stop the glowing effect
                clearInterval(glowInterval);
    
                // Reset the node style
                node.style({
                    'background-color': '', // Reset to default
                    'border-width': '' // Reset to default
                });
    
                // Add the new nodes and edges to the graph
                const newElements = links.map(link => ({
                    data: { id: link.data.name, name: link.data.name, article: link.data.name },
                    position: { x: node.position('x'), y: node.position('y') }
                })).concat(links.map(link => ({
                    data: { source: node.data('id'), target: link.data.name }
                })));
    
                const eles = cy.add(newElements);
                const nodePositions = node.position();
                // Run the circular layout on the new nodes
                eles.layout({
                    name: 'circle',
                    boundingBox: { x1: nodePositions.x-100, y1: nodePositions.y-100, x2: nodePositions.x+100, y2: nodePositions.y+100 },
                }).run();
                saveState();
    
            })
            .catch(e => {
                console.log('There was a problem with your fetch operation: ' + e.message);
    
                // Stop the glowing effect in case of error
                clearInterval(glowInterval);
    
                // Reset the node style in case of error
                node.style({
                    'background-color': '', // Reset to default
                    'border-width': '' // Reset to default
                });
            });
    
    });

    saveState();

});

function addNode(nodeId) {
    const existingNode = cy.$('#' + nodeId);

    if (existingNode.length) { // Node with given ID already exists, select it and center the screen on it
        existingNode.select();
        cy.center(existingNode);
        console.log("Selected node " + nodeId);
    } else { // Node with given ID doesn't exist, create it
        cy.add({
            data: { id: nodeId, name: nodeId, article: nodeId },
        });
        cy.center();
        console.log("Added node " + nodeId);
    }
}

function saveState() {
    // Remove states that cannot be redone
    history = history.slice(0, currentState + 1);
    // Save the current state
    history.push(cy.json());
    // Update the pointers
    currentState++;
    maxState++;
}

function undo() {
    if (currentState > 0) {
        currentState--;
        cy.json(history[currentState]);
    }
}

function redo() {
    if (currentState < maxState) {
        currentState++;
        cy.json(history[currentState]);
    }
}

window.addEventListener('keydown', function(event) {
    if (event.ctrlKey) {
        switch (event.key) {
            case 'z':
                event.preventDefault();
                undo();
                break;
            case 'y':
                event.preventDefault();
                redo();
                break;
        }
    }
});

module.exports = {
    addNode: addNode
}