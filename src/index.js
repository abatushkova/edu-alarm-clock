const alarmBtn = document.querySelector('#alarmButton');
const wrapper = document.querySelector('.wrapper');
const title = document.querySelector('#title');
const selectList = document.querySelectorAll('[id^="select"]');

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

const calculateTime = () => {
  const date = new Date();
  let [hour, minute, second] = [
    date.getHours(),
    date.getMinutes(),
    date.getSeconds()
  ];
  let ampm = 'AM';

  if (hour >= 12) {
    hour -= 12;
    ampm = 'PM';
  }

  hour = hour === 0 ? '12' : hour;
  hour = hour < 10 ? `0${hour}` : hour;
  minute = minute < 10 ? `0${minute}` : minute;
  second = second < 10 ? `0${second}` : second;
  title.textContent = `${hour}:${minute}:${second} ${ampm}`;

  setTimeout(calculateTime, 1000);
};

const setAlarm = () => {
  console.log('alarm set');
};

alarmBtn.addEventListener('click', setAlarm);

calculateTime();
setSelectOptions();
