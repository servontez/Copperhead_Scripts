// ==UserScript==
// @name         Scheduler Timer
// @namespace    http://tampermonkey.net/
// @version      2025-07-02
// @description  Adds a line to the Scheduler to display the current time of day.
// @author       Drew Nicholas
// @match        https://copperhead-diesel.shop-ware.com/estimates
// @icon         https://www.google.com/s2/favicons?sz=64&domain=shop-ware.com
// @grant        none
// ==/UserScript==


setTimeout(function() {
  const container = document.getElementById('scheduler');
  const hourStart = 7; // 7:00 AM
  const hourEnd = 21; // 9:00 PM
  const startMinutes = hourStart * 60;
  const endMinutes = hourEnd * 60;
  const then = new Date();

  if (!container) {
    console.error('Container with id "container" not found.');
    return;
  }

  // Set container styles
  container.style.position = 'relative';

  const calendar = container.querySelector('.dhx_cal_data');
  if (!calendar) {
    console.error('Element with class "time-surface" not found inside #container.');
    return;
  }

  // Create the time line
  const line = document.createElement('div');
  line.style.position = 'absolute';
  line.style.left = '0';
  line.style.width = '100%';
  line.style.height = '2px';
  line.style.backgroundColor = 'red';
  line.style.zIndex = '10';
  line.style.display = 'none'; // Hide until in range
  calendar.appendChild(line);

  function updateTimeLine() {
    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();

    if (now.getHours() != then.getHours()) {
      window.location.reload();
    }


    if (currentMinutes < startMinutes || currentMinutes > endMinutes) {
      line.style.display = 'none';
      return;
    }

    const elapsed = currentMinutes - startMinutes;
    const totalDuration = endMinutes - startMinutes; // 780 minutes
    const containerHeight = calendar.firstElementChild.clientHeight;

    const position = (elapsed / totalDuration) * containerHeight;

    line.style.top = `${position}px`;
    line.style.display = 'block';
  }

  updateTimeLine();
  setInterval(updateTimeLine, 60 * 1000);

}, 5000);
