const wrapper = document.querySelector('.wrapper');
const alarmBtn = document.querySelector('#alarmButton');
const stopBtn = document.querySelector('#stopButton');
const title = document.querySelector('#title');
const selectList = document.querySelectorAll('[id^="select"]');
const output = document.querySelector('#output');
const alarmIcon = document.querySelector('.clock__icon');
const rigntone = new Audio('./src/audio/alarm-clock.mp3');
const selectMap = {
  0: 'Hour',
  1: 'Minute',
  2: 'AM/PM'
};
let alarmTime = null;

const setSelectOptions = () => {
  for (let i = 1; i <= 12; i++) {
    let hour = i < 10 ? `0${i}` : i;
    let option = `<option value=${hour}>${hour}</option>`;
    selectList[0].insertAdjacentHTML('beforeend', option);
  }

  for (let i = 0; i < 60; i++) {
    let minute = i < 10 ? `0${i}` : i;
    let option = `<option value=${minute}>${minute}</option>`;
    selectList[1].insertAdjacentHTML('beforeend', option);
  }

  for (let i = 1; i <= 2; i++) {
    let ampm = i === 1 ? 'AM' : 'PM';
    let option = `<option value=${ampm}>${ampm}</option>`;
    selectList[2].insertAdjacentHTML('beforeend', option);
  }
};

const ringAlarm = () => {
  rigntone.play();
  rigntone.loop = true;
  alarmIcon.classList.add('is-shaking');
  stopBtn.classList.remove('hide');
  alarmBtn.classList.add('hide');
};

const calculateTime = () => {
  const date = new Date();
  let [hh, mm, ss] = [
    date.getHours(),
    date.getMinutes(),
    date.getSeconds()
  ];
  let ampm = 'AM';

  if (hh >= 12) {
    hh -= 12;
    ampm = 'PM';
  }

  hh = hh === 0 ? '12' : hh;
  hh = hh < 10 ? `0${hh}` : hh;
  mm = mm < 10 ? `0${mm}` : mm;
  ss = ss < 10 ? `0${ss}` : ss;
  title.textContent = `${hh}:${mm}:${ss} ${ampm}`;

  if (alarmTime === `${hh}:${mm} ${ampm}`) {
    ringAlarm();
  }

  setTimeout(calculateTime, 1000);
};

const setAlarm = () => {
  const regex = /(Hour|Minute|AM\/PM)/;
  alarmTime = `${selectList[0].value}:${selectList[1].value} ${selectList[2].value}`;

  if (regex.test(alarmTime)) {
    output.textContent = 'Please, select a valid time to set Alarm!';
    output.classList.replace('hide', 'error');
    return;
  }

  selectList.forEach(s => s.setAttribute('disabled', true));
  alarmBtn.textContent = 'Clear Alarm';
  output.textContent = `Alarm set for ${alarmTime}!`;
  output.classList.remove('hide', 'error');
};

const clearAlarm = () => {
  selectList.forEach((s, i) => {
    s.removeAttribute('disabled');
    s.value = selectMap[i];
  });
  alarmBtn.textContent = 'Set Alarm';
  output.classList.add('hide');
  output.textContent = '';
}

const toggleAlarm = (evt) => {
  const targetContent = evt.target.textContent;

  targetContent === 'Set Alarm' ? setAlarm() : clearAlarm();
};

const stopAlarm = () => {
  alarmTime = null;
  rigntone.pause();
  alarmIcon.classList.remove('is-shaking');
  clearAlarm();
  alarmBtn.classList.remove('hide');
  stopBtn.classList.add('hide');
};

const setWrapperTheme = () => {
  const currentHour = new Date().getHours();

  if (6 <= currentHour && currentHour < 18) {
    wrapper.classList.replace('night', 'day');
  } else {
    wrapper.classList.replace('day', 'night');
  }
}

alarmBtn.addEventListener('click', toggleAlarm);
stopBtn.addEventListener('click', stopAlarm);

calculateTime();
setSelectOptions();
setWrapperTheme();
