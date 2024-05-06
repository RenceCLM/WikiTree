let cy;

document.addEventListener("DOMContentLoaded", function() {
    cy = cytoscape({
        container: document.getElementById("cy"),
        elements: [
            // nodes
            { data: { id: 'Richard_Gadd', article: 'Richard_Gadd' }, position: { x: 100, y: 100 } },
            { data: { id: 'b', article: 'b' }, position: { x: 200, y: 200 } },
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

    cy.on('tap', 'node', function(evt){
        const node = evt.target;
        console.log('Clicked node:', node);

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

function addNode(nodeId, article) {
    const existingNode = cy.$('#' + nodeId);

    if (existingNode.length) { // Node with given ID already exists, select it and center the screen on it
        existingNode.select();
        cy.center(existingNode);
        console.log("Selected node " + nodeId);
    } else { // Node with given ID doesn't exist, create it
        cy.add({
            data: { id: nodeId, article: article },
        });
        cy.center();
        console.log("Added node " + nodeId);
    }
}

module.exports = {
    addNode: addNode
}