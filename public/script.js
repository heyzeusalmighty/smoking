
let tempData = [];
const ctx = document.getElementById('smoke-chart');
let myChart = new Chart(ctx);

const buildChart = () => {
  myChart.destroy();
  const labels = tempData.map(point => point.timestamp);

  myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels,
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
    console.log('HEY YOU GOT A MESSAGE', ev.data);
    tempData = tempData.concat(JSON.parse(ev.data));
    buildChart();
  }
  
});



/// OLD SHIT
// scales: {
      //   x: {
      //     type: 'time',
      //     title: {
      //       display: true,
      //       text: 'Time Time',
      //     },
      //     time: {
      //       unit: 'minute'
      //     }
          // time: {
          //   unit: 'hour',
          //   min: labels[0],
          //   max: labels[labels.length - 1],
          //   displayFormats: {
          //     hour: 'hh',
          //   },
          // }
        // },
      //   xAxes: [{
      //     title: 'Time Time',
      //     type: 'time',
      //     time: {
      //       format: 'hh',
      //       unit: 'hour',
      //       parser: 'hh:mm',
      //       displayFormats: {
      //         hour: 'hh'
      //       }
      //     },
      //  }],