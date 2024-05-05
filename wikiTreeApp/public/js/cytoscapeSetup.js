var cy;

document.addEventListener("DOMContentLoaded", function() {
    cy = cytoscape({
        container: document.getElementById("cy"),
        elements: [
            // nodes
            { data: { id: 'a' } },
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
            name: 'grid'
        },
    });

    cy.zoom(0.9);
    cy.center();
});

function addNode(nodeId) {
    var existingNode = cy.$('#' + nodeId);

    if (existingNode.length) { // Node with given ID already exists, select it and center the screen on it
        existingNode.select();
        cy.center(existingNode);
        console.log("Selected node " + nodeId);
    } else { // Node with given ID doesn't exist, create it
        cy.add({
            data: { id: nodeId },
        });
        cy.layout({ name: 'grid' }).run();
        cy.center();
        console.log("Added node " + nodeId);
    }
}

module.exports = {
    addNode: addNode
}