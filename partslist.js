// Function to add a click listener to a cell
function addClickListener(cell) {
    var clickCount = 0;


    cell.addEventListener('input', function () {
        // Save the data to localStorage whenever a cell is edited
        saveDataToLocalStorage();
    });

    cell.addEventListener('click', function () {
        clickCount++;
        if (clickCount === 1) {
            // First click: Allow cell selection
            this.classList.remove('strikethrough');
        } else if (clickCount === 2) {
            // Second click: Apply strikethrough
            this.classList.add('strikethrough');
        } else {
            // Third click: Remove strikethrough
            this.classList.remove('strikethrough');
            clickCount = 0; // Reset click count
        }
        // Save the data to localStorage
        saveDataToLocalStorage();
    });
}

// Function to add a new item to the table
function addNewItem(partNumber, partDescription, quantity, location) {
    var partsTable = document.getElementById('parts-table');
    var newRow = partsTable.insertRow(-1);

    // Make cells editable
    var partNumberCell = newRow.insertCell(0);
    var partDescriptionCell = newRow.insertCell(1);
    var quantityCell = newRow.insertCell(2);
    var locationCell = newRow.insertCell(3);

    partNumberCell.contentEditable = 'true';
    partDescriptionCell.contentEditable = 'true';
    quantityCell.contentEditable = 'true';
    locationCell.contentEditable = 'true';

    // Add the text to the cells
    partNumberCell.innerHTML = partNumber;
    partDescriptionCell.innerHTML = partDescription;
    quantityCell.innerHTML = quantity;
    locationCell.innerHTML = location;

    // Add click listener to each cell
    addClickListener(partNumberCell);
    addClickListener(partDescriptionCell);
    addClickListener(quantityCell);
    addClickListener(locationCell);
}

// Function to save data to localStorage
function saveDataToLocalStorage() {
    var partsTable = document.getElementById('parts-table');
    var data = [];

    // Iterate through each row in the table
    for (var i = 1; i < partsTable.rows.length; i++) {
        var row = partsTable.rows[i];
        var rowData = {
            partNumber: row.cells[0].innerHTML,
            partDescription: row.cells[1].innerHTML,
            quantity: row.cells[2].innerHTML,
            location: row.cells[3].innerHTML,
            isStrikethrough: row.cells[0].classList.contains('strikethrough'),
        };
        data.push(rowData);
    }

    // Convert data to JSON and store it in localStorage
    localStorage.setItem('partsListData', JSON.stringify(data));
}

// Function to load data from localStorage
function loadDataFromLocalStorage() {
    var partsTable = document.getElementById('parts-table');
    var data = localStorage.getItem('partsListData');

    // Clear existing rows
    while (partsTable.rows.length > 1) {
        partsTable.deleteRow(1);
    }

    // If there is stored data, populate the table with it
    if (data) {
        data = JSON.parse(data);
        for (var i = 0; i < data.length; i++) {
            var rowData = data[i];
            addNewItem(rowData.partNumber, rowData.partDescription, rowData.quantity, rowData.location);
            // Apply strikethrough if needed
            if (rowData.isStrikethrough) {
                partsTable.rows[i + 1].cells[0].classList.add('strikethrough');
            }
        }
    }
}

// Get the button element by its id
var addItemButton = document.getElementById('add-item-btn');

// Set the click event handler for the button
addItemButton.addEventListener('click', function () {
    // Add a new item with empty values
    addNewItem('', '', '', '');
    // Save the data to localStorage
    saveDataToLocalStorage();
});

// Load data from localStorage on page load
loadDataFromLocalStorage();