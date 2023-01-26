import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js'

import { Radar } from 'react-chartjs-2'

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
)

const options = {
  responsive: true,
  aspectRatio: 1,
  //maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
      labels: {
        font: {
          size: 18,
        },
        color: "#93C01F",
      },
    },
  },
  scales: {
    r: {
      grid: {
        display: true,
      },
      angleLines: {
        display: false,
      },
      suggestedMin: 30, // equivale a 3 en la suma
      suggestedMax: 100, // equivale a 12 en la suma
      ticks: {
        stepSize: 10,
        color: "#93C01F",
        font: {
          size: 14,
        },
      },
      pointLabels: {
        padding: 2,
        color: "#93C01F",
        font: {
          family: "ASAP",
          size: 14,
        },
      },
    },
  },
}

const arrHash1 = [[4, 4, 2, 1], [1, 2, 3, 4], [1, 2, 3, 4]]
const arrHash2 = [[1, 2, 3, 4], [1, 2, 3, 4], [4, 3, 2, 1]]


const Graph = () => {
  
  const localData = JSON.parse(localStorage.getItem('quiz'))

  const getValues = () => {
    let step = 0
    let amount = 0
    let array = []

    new Array(15).fill(0).forEach((content, index) => {
      const tempStep = index % 3

      if (step !== 3) {
        amount += arrHash1[tempStep][localData["" + index] - 1]
      } else {
        amount += arrHash2[tempStep][localData["" + index] - 1]
      }

      if (index === 2 || (index !== 0 && tempStep === 2)) {
        array.push(Math.ceil((amount / 12) * 100))
        amount = 0
        step += 1
      }
    })

    return array
  }

  
  console.log(getValues())

  return <Radar data={{
    labels: ["RE", "A", "AM", "EX", "EM"],
    datasets: [
      {
        label: 'Pon tu nombre aqui',
        data: getValues(),
        backgroundColor: "rgba(147, 192, 31, 0.6)",
        borderColor: "#93C01F",
        borderWidth: 1,
      },
    ],
  }} options={options} />
}

export default Graph