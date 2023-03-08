import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const options = {
    title: {
        text: 'My chart'
    },
    series: [{
        data: [1, 2, 3]
    }]
}

function App() {
  return (
    <div className="App">
        <HighchartsReact
            highcharts={Highcharts}
            options={options}
        />
    </div>
  )
}

export default App
