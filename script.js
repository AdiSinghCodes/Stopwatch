let isRunning = false;
    let startTime;
    let elapsedTime = 0;
    let laps = [];
    let timer;

    function startPause() {
      if (isRunning) {
        isRunning = false;
        document.getElementById('startPause').textContent = 'Start';
        clearInterval(timer);
      } else {
        if (elapsedTime === 0) {
          // If reset, start from zero
          startTime = Date.now();
        } else {
          // If pause, resume from the current elapsed time
          startTime = Date.now() - elapsedTime;
        }
        isRunning = true;
        document.getElementById('startPause').textContent = 'Pause';
        timer = setInterval(updateDisplay, 10);
      }
    }

    function reset() {
      isRunning = false;
      document.getElementById('startPause').textContent = 'Start';
      clearInterval(timer);
      elapsedTime = 0;
      startTime = Date.now();
      updateDisplay();
      laps = [];
      updateLaps();
    }

    function lap() {
      if (isRunning) {
        const lapTime = Date.now() - startTime;
        laps.push(formatTime(lapTime));
        updateLaps();
      }
    }

    function updateDisplay() {
      const currentTime = Date.now();
      elapsedTime = currentTime - startTime;
      document.getElementById('display').textContent = formatTime(elapsedTime);
    }

    function formatTime(time) {
      const date = new Date(time);
      const hours = date.getUTCHours().toString().padStart(2, '0');
      const minutes = date.getUTCMinutes().toString().padStart(2, '0');
      const seconds = date.getUTCSeconds().toString().padStart(2, '0');
      const milliseconds = date.getUTCMilliseconds().toString().padStart(3, '0');
      return `${hours}:${minutes}:${seconds}.${milliseconds}`;
    }

    function updateLaps() {
      const lapsList = document.getElementById('laps');
      lapsList.innerHTML = '';
      laps.forEach((lap, index) => {
        const lapItem = document.createElement('li');
        lapItem.textContent = `Lap ${index + 1}: ${lap}`;
        lapsList.appendChild(lapItem);
      });
    } 
