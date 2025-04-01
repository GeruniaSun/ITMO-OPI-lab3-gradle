const canvas = document.getElementById('grid');
const ctx = canvas.getContext('2d');

let lastR = 1;

const styles = {
    'grid_line_color': 'white',
    'grid_line_width': 1,
    'axis_color': 'orange',
    'axis_width': 3,
    'axis_arrows_fill_color': 'rgba(255, 165, 0, 0.5)',
    'area_fill_color': 'rgba(255, 165, 0, 0.5)',
    'area_line_color': 'orange',
    'area_line_width': 1,
    'point_hit_color': 'orange',
    'point_miss_color': 'white'
}

const originX = canvas.width / 2;
const originY = canvas.height / 2;
const scale = 80;

let dots = []; // !!!

// TODO можно лейблы для X, Y, R, R/2 добавить (а можно не можно)
function refreshCanvas(r) {
    console.log("redrawing");
    lastR = r;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid(r);
    drawAxes(r);
    drawArea(r);
    dots.forEach(dot => drawPoint(dot[0], dot[1], dot[2])); // !!!
}

function dotsPush(dot) {
    dots.push(dot); // !!!
}

function extractDotsFromTable() {
    data.forEach(attempt => dots.push([attempt.x, attempt.y, attempt.hit])); // !!!
}

// возвращает координаты клика в нужных координатах
function getClickCoordinates(event) {
    const rect = canvas.getBoundingClientRect();

    const xClick = event.clientX - rect.left;
    const yClick = event.clientY - rect.top;

    const xRes = ((xClick - originX) / scale).toFixed(2);
    const yRes = (-1 * (yClick - originY) / scale).toFixed(2);

    return { x: xRes, y: yRes };
}

function drawPoint(x, y, hit) {
    ctx.fillStyle = hit ? styles.point_hit_color : styles.point_miss_color;
    ctx.beginPath();
    ctx.arc(originX + x * scale, originY - y * scale, 5, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
}

function drawGrid(r) {
    const gridSpacing = scale / 4;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // стили клеток
    ctx.strokeStyle = styles.grid_line_color;
    ctx.lineWidth = styles.grid_line_width;

    // вертикальные линии
    for (let x = 0; x <= canvas.width; x += gridSpacing) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
    }

    // горизонтальные линии
    for (let y = 0; y <= canvas.height; y += gridSpacing) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
    }
}

function drawAxes() {
    // стили стрелок и осей
    ctx.strokeStyle = styles.axis_color;
    ctx.fillStyle = styles.axis_arrows_fill_color;
    ctx.lineWidth = styles.axis_width;

    // оси
    ctx.beginPath();
    ctx.moveTo(originX, 0);
    ctx.lineTo(originX, canvas.height);
    ctx.moveTo(0, originY);
    ctx.lineTo(canvas.width, originY);
    ctx.stroke();

    // стрелка X
    ctx.beginPath();
    ctx.moveTo(canvas.width/2, 0)
    ctx.lineTo(canvas.width/2 - 15, 20);
    ctx.lineTo(canvas.width/2 + 15, 20);
    ctx.closePath();
    ctx.fill();

    // стрелка Y
    ctx.beginPath();
    ctx.moveTo(canvas.width, canvas.height/2)
    ctx.lineTo(canvas.width - 20, canvas.height/2 - 15);
    ctx.lineTo(canvas.width - 20, canvas.height/2 + 15);
    ctx.closePath();
    ctx.fill();
}

function drawArea(r) {
    // стили
    ctx.fillStyle = styles.area_fill_color;
    ctx.strokeStyle = styles.area_line_color;
    ctx.lineWidth = styles.area_line_width;

    ctx.beginPath();
    // 2-ая четверть
    ctx.moveTo(originX, originY);
    //ctx.lineTo(originX, originY - r * scale);
    ctx.arc(originX, originY, r * scale, Math.PI,  3 * Math.PI / 2);

    // 3-ья четверть
    ctx.lineTo(originX, originY);
    ctx.lineTo(originX - r/2 * scale, originY);
    ctx.lineTo(originX, originY + r/2 * scale);

    // 4-ая четверть
    ctx.lineTo(originX, originY + r * scale);
    ctx.lineTo(originX + r/2 * scale, originY + r * scale);
    ctx.lineTo(originX + r/2 * scale, originY);
    ctx.lineTo(originX, originY);

    ctx.fill();
    ctx.stroke();
    ctx.closePath();
}


