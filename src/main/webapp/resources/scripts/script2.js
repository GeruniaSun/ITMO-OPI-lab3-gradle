// приколы
const gavrillinaSound = new Audio('resources/sounds/Drama_Queen.mp3');
const easterEgg = document.getElementById('cringe_area');

// DOM elements
const form = document.getElementById('form');
const xInput = document.getElementById('x_input');
const ySlider = document.getElementById('yValue');
const xErrorLabel = document.getElementById('form:x_error_label');
const clickErrorDiv = document.getElementById('click_error_div');
const rButtons = document.getElementsByName('form:r');
const submitButton = document.getElementById('submit_button');
//const canvas = document.getElementById('grid');

//TODO фетч клика должен подставлять значения в кнопки и кликать на сабмит

//refreshTable();
extractDotsFromTable();
refreshCanvas(3);

// превращение кнопок R в радиокнопки
makeRadio(rButtons);

// вешаем обработчик на кнопки
xInput.addEventListener("input", confirmSubmit);
//ySlider.addEventListener(); его не надо проверять
rButtons.forEach(input => input.addEventListener("change", confirmSubmit));
rButtons.forEach(input => input.addEventListener("click", () => {
    if(isAnyActive(rButtons)) refreshCanvas(activeButtonIntValue(rButtons));
}));

canvas.addEventListener('click', function(event) {
    hideClickError();

    if (!isAnyActive(rButtons)) {
        showClickError('Выберите конкретное значение R!');
    } else {
        hideClickError();
        const { x: xValue, y: yValue } = getClickCoordinates();
        const rValue = activeButtonIntValue(rButtons);

        xInput.value = xValue;
        ySlider = yValue;

        submitButton.click();

        setTimeout(() => {
            const tableRows = document.querySelectorAll("#table tbody tr");
            const firstRow = tableRows[0];
            const hit_cell = firstRow.querySelectorAll("td")[3];
            const res = hit_cell.textContent.trim() === "hit";
            drawPoint(xValue, yValue, rValue, res);
        }, 315);
    }
});

// разрешает нажимать на submit только если x, y, r валидны
function confirmSubmit() {
    const xFilled = true;
    const ySelected = true;
    const rSelected = isAnyActive(rButtons);

    xErrorLabel.style.display = xIsValid() ? "none" : "inline";

    showEasterEgg(xInput.value === "mashusikthebest");

    submitButton.disabled = (xFilled && ySelected && rSelected) ? false : true;
}

// превращение кнопок в радиокнопки
function makeRadio(buttons){
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            buttons.forEach(btn => {
                btn.classList.remove('active');
            });

            button.classList.add('active');
        });
    });
}

function isAnyActive(buttons) {
    console.log(buttons);
    return Array.from(buttons).some(button => button.checked);
}

function activeButtonIntValue(buttons) {
    console.log(buttons);
    return parseInt(Array.from(buttons).find(button => button.checked.value));
}

// проверка X
function xIsValid() {
    console.log(xInput.value)
    xInput.value = xInput.value.replace(',', '.');
    if (xInput.value.trim() == "" || isNaN(xInput.value)) {
        return false;
    }
    const x = parseFloat(xInput.value);
    if (!isNaN(y) && -3 <= x  && x <= 5 &&
     -5 <= Number(xInput.value.replace(/0/g, '')) && Number(xInput.value.replace(/0/g, '') <= 3)) {
        return true;
     }
}

// для валидации клика
function showClickError(message) {
    clickErrorDiv.textContent = message;
    clickErrorDiv.style.display = 'block';
}

function hideClickError() {
    clickErrorDiv.textContent = '';
    clickErrorDiv.style.display = 'none';
}

// прикол
function showEasterEgg(status) {
    easterEgg.style.display = status ? "block" : "none";
    if (status) {
        gavrillinaSound.play().catch(error => {
            console.error("Ошибка при воспроизведении звука:", error);
        });
    }
    else {
        gavrillinaSound.pause();
        gavrillinaSound.currentTime = 0;
    }
}

// обработчик формы
//form?.addEventListener('submit', function(event){
//    event.preventDefault();
//
//    const xValue = activeButtonIntValue(xButtons);
//    const yValue = parseFloat(yInput.value);
//    const rValue = activeButtonIntValue(rButtons);
//
//    fetchHit(xValue, yValue, rValue);
//});
