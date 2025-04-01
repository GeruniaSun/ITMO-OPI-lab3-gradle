//const hitSounds = [
//    'resources/sounds/oue.mp3',
//    'resources/sounds/yeei.mp3',
//    'resources/sounds/oleg.mp3'
//];
//
//const missSounds = [
//    'resources/sounds/bruh.mp3',
//    'resources/sounds/datyche.mp3',
//    'resources/sounds/nepravilno.mp3',
//    'resources/sounds/nope.mp3'
//];

function fetchHit(xValue, yValue, rValue) { //!!!
    const startTime = performance.now();
    console.log(`X: ${xValue}, Y: ${yValue}, R: ${rValue}`);

    fetch(`/WebLab2/calc?x=${encodeURIComponent(xValue)}&y=${encodeURIComponent(yValue)}&r=${encodeURIComponent(rValue)}`, {
        method: 'GET'
    })
    .then(response => {
          if (!response.ok) {
              throw new Error('Ошибка сети: ' + response.status);
          }
          return response.json();
    })
    .then(attempt => {
        const result = attempt.hit;
        console.log(`response result: ${result}`);

        playRandomAudio(result ? hitSounds : missSounds); //хихик

        const newRow = {
            x: xValue,
            y: yValue,
            r: rValue,
            hit: result,
            currTime: attempt.currTime,
            execTime: attempt.execTime
        };

        tablePush(newRow);

        // рисовашки
        dotsPush([xValue, yValue, result]);
        refreshCanvas(rValue);
    })
    .catch(error => {
        alert('Ошибка отправки данных.\n' + error.message);
        console.log(error.message);
        console.log(error.stack);
    });
}

//function playRandomAudio(audios) {
//    const randomIndex = Math.floor(Math.random() * audios.length);
//    const audio = new Audio(audios[randomIndex]);
//
//    audio.play()
//        .catch(error => {
//            console.error('Что-то не так со звуком:', error);
//        });
//}