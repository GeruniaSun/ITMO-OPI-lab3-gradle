const rowsPerPage = 10;
let currentPage = 1;
const data = [];

function tablePush(element) {
    addElement(element);
    refreshTable();
}

function refreshTable() {
    extractDataFromTable();
    setupPagination();
    showPage(currentPage);
}

function addElement(element) {
    data.unshift({
        x: element.x,
        y: element.y,
        r: element.r,
        hit: element.hit,
        currTime: element.currTime,
        execTime: element.execTime,
    });
}

function extractDataFromTable() {
    const tableBody = document.getElementById('tbody');

    for (let i = 0; i < tableBody.rows.length; i++) {
        const row = tableBody.rows[i];
        const rowData = {
            x: row.cells[0].innerText,
            y: row.cells[1].innerText,
            r: row.cells[2].innerText,
            hit: row.cells[3].innerText,
            currTime: row.cells[4].innerText,
            execTime: parseFloat(row.cells[5].innerText).toFixed(4) + " сек"
        };
        data.push(rowData);
    }
}

function setupPagination() {
    const pagination = document.getElementById('pagination');
    pagination.innerHTML = '';
    const pageCount = Math.ceil(data.length / rowsPerPage);

    for (let i = 1; i <= pageCount; i++) {
        const button = document.createElement('button');
        button.innerText = i;
        button.classList.add('page-button');
        button.addEventListener('click', () => {
            currentPage = i;
            showPage(currentPage);
            setupPagination(data.length);
        });
        if (i === currentPage) {
            button.disabled = true;
        }
        if (Math.abs(i - currentPage) > 5 && i !== pageCount) {
            button.hidden = true;
        }
        pagination.appendChild(button);
    }
}

function showPage(pageNumber) {
    const tableBody = document.getElementById('tbody');
    tableBody.innerHTML = '';
    const start = (pageNumber - 1) * rowsPerPage;
    const end = Math.min(start + rowsPerPage, data.length);

    for (let i = start; i < end; i++) {
        const row = `<tr>
                        <td>${data[i].x}</td>
                        <td>${data[i].y}</td>
                        <td>${data[i].r}</td>
                        <td>${data[i].hit}</td>
                        <td>${data[i].currTime}</td>
                        <td>${data[i].execTime}</td>
                    </tr>`;
        tableBody.innerHTML += row;
    }
}

function formatDate(date) {
    const zeroPad = (num) => String(num).padStart(2, '0'); // Функция для добавления нуля в начале, если число меньше 10

    const year = date.getFullYear(); // Получаем полный год
    const month = zeroPad(date.getMonth() + 1); // Месяцы начинаются с 0
    const day = zeroPad(date.getDate()); // Получаем день месяца
    const hours = zeroPad(date.getHours()); // Получаем часы
    const minutes = zeroPad(date.getMinutes()); // Получаем минуты
    const seconds = zeroPad(date.getSeconds()); // Получаем секунды

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`; // Форматирование даты
}