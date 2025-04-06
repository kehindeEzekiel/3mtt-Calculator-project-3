const display = document.getElementById('display');
  const buttons = document.querySelectorAll('.btn');
  const toggleThemeBtn = document.getElementById('toggle-theme');
  const clickSound = new Audio('https://www.soundjay.com/button/sounds/button-29.mp3');

  let currentInput = '';

  function playSound() {
    clickSound.currentTime = 0;
    clickSound.play();
  }

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      playSound();
      const value = button.getAttribute('data-value');

      if (value === 'sqrt') {
        try {
          const result = Math.sqrt(eval(currentInput));
          display.value = result;
          currentInput = result;
        } catch {
          display.value = 'Error';
          currentInput = '';
        }
      } else if (value === '%') {
        try {
          const result = eval(currentInput) / 100;
          display.value = result;
          currentInput = result;
        } catch {
          display.value = 'Error';
          currentInput = '';
        }
      } else if (value !== null) {
        currentInput += value;
        display.value = currentInput;
      }

      if (button.id === 'equal') {
        try {
          display.value = eval(currentInput);
          currentInput = display.value;
        } catch {
          display.value = 'Error';
          currentInput = '';
        }
      }

      if (button.id === 'clear') {
        currentInput = '';
        display.value = '';
      }
    });
  });

  document.addEventListener('keydown', e => {
    if ((e.key >= 0 && e.key <= 9) || ['+', '-', '*', '/', '.'].includes(e.key)) {
      currentInput += e.key;
      display.value = currentInput;
    } else if (e.key === 'Enter') {
      try {
        display.value = eval(currentInput);
        currentInput = display.value;
      } catch {
        display.value = 'Error';
        currentInput = '';
      }
    } else if (e.key === 'Backspace') {
      currentInput = currentInput.slice(0, -1);
      display.value = currentInput;
    } else if (e.key.toLowerCase() === 'c') {
      currentInput = '';
      display.value = '';
    }
  });

  toggleThemeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
  });

