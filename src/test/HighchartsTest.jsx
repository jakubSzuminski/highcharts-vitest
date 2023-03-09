import { useRef, useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';



function App(props) {
    const chart = useRef(null);

    const options = {
        series: [{
            data: [[Date.UTC(2022, 11, 12), 2.2027296E8], [Date.UTC(2022, 11, 13), 2.10952752E8]]
        }],
    
        tooltip: {
            formatter() {
                return this.x == Date.UTC(2022, 11, 12) ? 'FIRST' : 'OTHER'
            }
        }
    }

    useEffect(() => {
        if (chart) {
            // we push our chart object to the Vitest
            props.onCreateChart(chart.current.chart);
        }
    }, [props.onCreateChart]);

    return (
        <div className="App">
            <HighchartsReact
                highcharts={Highcharts}
                options={options}
                ref={chart}
            />
        </div>
    )
}

export default App;
