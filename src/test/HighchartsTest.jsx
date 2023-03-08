import { useRef, useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

function App(props) {
    const chart = useRef(null);

    useEffect(() => {
        if (chart) {
            props.onCreateChart(chart.current.chart);
        }
    }, [props.onCreateChart]);

    return (
        <div className="App">
            <HighchartsReact
                highcharts={Highcharts}
                options={props.options}
                ref={chart}
            />
        </div>
    )
}

export default App;
