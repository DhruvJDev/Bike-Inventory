// Toggle Sections
function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(sec => sec.classList.remove('active'));
    document.getElementById(sectionId).classList.add('active');
}

// Helper: Fetch API with error handling
async function postData(url, formData) {
    try {
        const res = await fetch(url, { method: 'POST', body: formData });
        const text = await res.text();
        if (!res.ok) throw new Error(text);
        return text;
    } catch (err) {
        alert("Error: " + err.message);
        throw err;
    }
}

// Fetch all stock
async function fetchStock() {
    try {
        const res = await fetch('get_stock.php');
        const data = await res.json();
        const tbody = document.querySelector('#bikeTable tbody');
        tbody.innerHTML = '';
        data.forEach(bike => {
            tbody.innerHTML += `<tr>
                <td>${bike.id}</td>
                <td>${bike.model_name}</td>
                <td>${bike.quantity}</td>
            </tr>`;
        });
    } catch (err) {
        console.error("Fetch error:", err);
    }
}

// Add stock to existing bike
async function addStock(e) {
    e.preventDefault();
    const id = document.getElementById('addId').value.trim();
    const quantity = parseInt(document.getElementById('addQuantity').value);

    if (!id || isNaN(quantity) || quantity <= 0) {
        alert("Enter valid ID and quantity.");
        return;
    }

    const formData = new FormData();
    formData.append('id', id);
    formData.append('quantity', quantity);

    await postData('add_stock.php', formData);
    alert("Stock added successfully!");
    e.target.reset();
    fetchStock();
    showSection('view');
}

// Subtract stock
async function subtractStock(e) {
    e.preventDefault();
    const id = document.getElementById('subId').value.trim();
    const quantity = parseInt(document.getElementById('subQuantity').value);

    if (!id || isNaN(quantity) || quantity <= 0) {
        alert("Enter valid ID and quantity.");
        return;
    }

    const formData = new FormData();
    formData.append('id', id);
    formData.append('quantity', quantity);

    await postData('delete_stock.php', formData);
    alert("Stock subtracted successfully!");
    e.target.reset();
    fetchStock();
    showSection('view');
}

// Update total quantity
async function updateStock(e) {
    e.preventDefault();
    const id = document.getElementById('updateId').value.trim();
    const quantity = parseInt(document.getElementById('updateQuantity').value);

    if (!id || isNaN(quantity) || quantity < 0) {
        alert("Enter valid ID and quantity (0 or more).");
        return;
    }

    const formData = new FormData();
    formData.append('id', id);
    formData.append('quantity', quantity);

    await postData('update_stock.php', formData);
    alert("Stock updated successfully!");
    e.target.reset();
    fetchStock();
    showSection('view');
}

// Add new bike model
async function addNewModel(e) {
    e.preventDefault();
    const model = document.getElementById('newModel').value.trim();
    const quantity = parseInt(document.getElementById('newQuantity').value);

    if (!model || isNaN(quantity) || quantity < 0) {
        alert("Enter valid model name and quantity.");
        return;
    }

    const formData = new FormData();
    formData.append('model', model);
    formData.append('quantity', quantity);

    await postData('add_new_model.php', formData);
    alert("New model added successfully!");
    e.target.reset();
    fetchStock();
    showSection('view');
}

// Delete bike
async function deleteStock(e) {
    e.preventDefault();
    const id = document.getElementById('deleteId').value.trim();

    if (!id) {
        alert("Enter a valid ID.");
        return;
    }

    const formData = new FormData();
    formData.append('id', id);

    await postData('delete_model.php', formData);
    alert("Stock deleted successfully!");
    e.target.reset();
    fetchStock();
    showSection('view');
}

// Search bike by id or model
async function searchStock(e) {
    e.preventDefault();
    const query = document.getElementById('searchQuery').value.trim().toLowerCase();
    if (!query) {
        alert("Enter ID or model name to search.");
        return;
    }

    try {
        const res = await fetch('get_stock.php');
        const data = await res.json();
        const tbody = document.querySelector('#searchTable tbody');
        tbody.innerHTML = '';

        const results = data.filter(bike =>
            bike.id.toString() === query ||
            bike.model_name.toLowerCase().includes(query)
        );

        if (results.length === 0) {
            tbody.innerHTML = `<tr><td colspan="3">No results found</td></tr>`;
            return;
        }

        results.forEach(bike => {
            tbody.innerHTML += `<tr>
                <td>${bike.id}</td>
                <td>${bike.model_name}</td>
                <td>${bike.quantity}</td>
            </tr>`;
        });
    } catch (err) {
        console.error("Search error:", err);
    }
}

// Load stock on page load
document.addEventListener("DOMContentLoaded", fetchStock);


// ---------------- PDF Download ----------------
function downloadPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.text("Hero Bike Inventory - Stock Report", 14, 15);

    // Generate table from HTML
    doc.autoTable({
        html: '#bikeTable',
        startY: 25,
        headStyles: { fillColor: [0, 123, 255] }, // Blue header
        styles: { halign: 'center' }
    });

    doc.save("bike_inventory.pdf");
}

// ---------------- Excel Download ----------------
function downloadExcel() {
    // Get the table element
    const table = document.getElementById("bikeTable");

    // Convert table to worksheet
    const wb = XLSX.utils.table_to_book(table, { sheet: "Stock" });

    // Save as Excel file
    XLSX.writeFile(wb, "bike_inventory.xlsx");
}

