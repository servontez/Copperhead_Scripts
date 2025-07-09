
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
  container.style.width = '100vw';
  container.style.height = '100vh';
  container.style.margin = '0';
  container.style.padding = '0';
  container.style.overflow = 'hidden';
  container.style.zIndex = '10000';

  document.querySelector('.main-container').style.display = 'none';

  const calendar = container.querySelector('.dhx_cal_data');
  if (!calendar) {
    console.error('Element with class "time-surface" not found inside #container.');
    return;
  }

  // Move #scheduler to be the first element inside <body>
  if (container.parentElement !== document.body) {
    document.body.insertBefore(container, document.body.firstChild);
  }

  scheduler.updateView();
  const hourlyHeight = (calendar.clientHeight + 50) / (hourEnd - hourStart);
  scheduler.config.hour_size_px = hourlyHeight;
  scheduler.updateView();

  // Create the time line
  const line = document.createElement('div');
  line.style.position = 'absolute';
  line.style.left = '0';
  line.style.width = '100%';
  line.style.height = '2px';
  line.style.backgroundColor = 'red';
  line.style.zIndex = '10001';
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

}, 5000)();
