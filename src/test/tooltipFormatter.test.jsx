import React from 'react';
import { vi, describe, test } from 'vitest';
import { render, screen } from '@testing-library/react';

import HighchartsTest from './HighchartsTest';

describe('HC - Tooltip Formatter', () => {
    test('Chart should have a tooltip', () => {
        const onCreateChart = vi.fn();

        // this renders our test chart component
        render(<HighchartsTest onCreateChart={onCreateChart}/>);

        // here we receive the chart object from the onCreateChart 
        // Vitest function (which is called in useEffect in the component)
        const chart = onCreateChart.mockReturnValue().calls[0][0]; 
    
        // here we check if the tooltip object exists on chart
        expect(chart.tooltip).toBeDefined();
    });

    test('Testing tooltip formatter', (assert) => {
        const onCreateChart = vi.fn();
        
        render(<HighchartsTest onCreateChart={onCreateChart}/>);

        const chart = onCreateChart.mockReturnValue().calls[0][0],
            tooltip = chart.tooltip;

        // here we check if there is only one series in the chart (as in
        // the options in the component)
        expect(chart.series.length).toEqual(1);

        // here we check if adding series to the chart works
        chart.addSeries({ data: [2, 5, 2] });
        expect(chart.series.length).toEqual(2);

        // here we see what is going to be returned by the tooltip.formatter
        // for points 0 and 1 in the first series
        expect(tooltip.options.formatter.call(chart.series[0].points[0])).toEqual('FIRST');
        expect(tooltip.options.formatter.call(chart.series[1].points[1])).toEqual('OTHER');
    });
});
