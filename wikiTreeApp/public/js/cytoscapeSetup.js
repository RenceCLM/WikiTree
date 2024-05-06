const cytoscape = require('cytoscape');
const cxtmenu = require('cytoscape-cxtmenu');

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
            content: 'Scroll Through Outgoers',
            select: function(ele) {
                const outgoers = ele.outgoers().filter(ele => ele.isNode());
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
        console.log('Clicked node:', node.data());

        // Make a request to the route that returns a JSON of all the links to the article
        fetch(`/fetch/${node.data('article')}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(links => {
                console.log('Received links:', links);

                // Add the new nodes and edges to the graph
                const newElements = links.map(link => ({
                    data: { id: link.data.name, name: link.data.name, article: link.data.name },
                    position: { x: node.position('x'), y: node.position('y') }
                })).concat(links.map(link => ({
                    data: { source: node.data('id'), target: link.data.name }
                })));

                console.log('Adding new elements:', newElements);

                const eles = cy.add(newElements);
                const nodePositions = node.position();
                // Run the circular layout on the new nodes
                eles.layout({
                    name: 'circle',
                    boundingBox: { x1: nodePositions.x-100, y1: nodePositions.y-100, x2: nodePositions.x+100, y2: nodePositions.y+100 },
                }).run();
            })
            .catch(e => console.log('There was a problem with your fetch operation: ' + e.message));
    });
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

module.exports = {
    addNode: addNode
}