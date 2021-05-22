
let tempData = [];
const ctx = document.getElementById('smoke-chart');
let myChart = new Chart(ctx);

const buildChart = () => {
  myChart.destroy();
  myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: tempData.map(point => point.timestamp * 1000),
      datasets: [
        {
          label: 'Food Temp',
          data: tempData.map(x => Number(x.food)),
          borderColor: 'rgba(30, 139, 195, 1)',
          backgroundColor: 'rgba(30, 139, 195, 0.5)',
        },
        {
          label: 'BBQ Temp',
          data: tempData.map(x => Number(x.bbq)),
          borderColor: 'rgba(240, 52, 52, 1)',
          backgroundColor: 'rgba(240, 52, 52, 0.5)',
        },
      ]
    },
    options: {
      responsive: true,
      scales: {
        x: {
          type: 'time',
          time: {
            displayFormats: {
              hour: 'HH mm:ss'
            }
          },
        }
      }
    }
  });
}


document.addEventListener("DOMContentLoaded", () => {
  console.log('loaded');
  buildChart();

  var socket = new WebSocket("ws://localhost:8080");
  socket.onopen = ev => {
    socket.send('get_last_24')
  };

  socket.onmessage = ev => {
    tempData = tempData.concat(JSON.parse(ev.data));
    buildChart();
  }
  
});