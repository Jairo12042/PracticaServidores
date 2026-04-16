window.onload = () => {
    const data = JSON.parse(localStorage.getItem("inventario"));
    if (data) renderTable(data);
};

function generateTable() {
    const num = document.getElementById('numProducts').value;
    if (num < 1) return alert("Ingresa un número válido");

    const container = document.getElementById('dynamicTableContainer');
    container.innerHTML = '';

    for (let i = 1; i <= num; i++) {
        container.innerHTML += `
            <div class="product-row">
                <input type="text" placeholder="Producto ${i}" class="p-name">
                <select class="p-unit">
                    <option value="Unidad">Unidad</option>
                    <option value="Kg">Kg</option>
                    <option value="Litros">Litros</option>
                </select>
                <input type="number" placeholder="Cantidad" class="p-qty">
            </div>
        `;
    }

    document.getElementById('step-1').classList.add('hidden');
    document.getElementById('step-2').classList.remove('hidden');
}

function saveAll() {
    const names = document.querySelectorAll('.p-name');
    const units = document.querySelectorAll('.p-unit');
    const qtys = document.querySelectorAll('.p-qty');

    let data = [];
    let error = false;

    names.forEach((n, i) => {
        if (!n.value || qtys[i].value <= 0) {
            n.style.borderColor = "red";
            qtys[i].style.borderColor = "red";
            error = true;
        } else {
            data.push({
                name: n.value,
                unit: units[i].value,
                qty: qtys[i].value
            });
        }
    });

    if (error) return alert("Completa todos los campos correctamente");

    localStorage.setItem("inventario", JSON.stringify(data));
    renderTable(data);
}

function renderTable(data) {
    const table = document.getElementById('finalData');
    table.innerHTML = "";

    data.forEach((item, index) => {
        table.innerHTML += `
            <tr>
                <td>${item.name}</td>
                <td><span class="badge">${item.unit}</span></td>
                <td>${item.qty}</td>
                <td><button class="delete-btn" onclick="deleteItem(${index})">X</button></td>
            </tr>
        `;
    });

    document.getElementById('step-2').classList.add('hidden');
    document.getElementById('step-3').classList.remove('hidden');
}

function deleteItem(index) {
    let data = JSON.parse(localStorage.getItem("inventario"));
    data.splice(index, 1);
    localStorage.setItem("inventario", JSON.stringify(data));
    renderTable(data);
}

function restart() {
    document.getElementById('step-3').classList.add('hidden');
    document.getElementById('step-1').classList.remove('hidden');
}
