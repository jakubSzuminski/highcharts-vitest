import React from 'react';
import { vi, describe, test } from 'vitest';
import { render, screen } from '@testing-library/react';

import Highcharts from 'highcharts';
import HighchartsTest from './HighchartsTest';

const options = {
    series: [{
        data: [1, 2, 3]
    }, {
        data: [3, 3, 2]
    }]
}

describe('HC - Tooltip Formatter', () => {
    test('Chart should have a tooltip', () => {
        const onCreateChart = vi.fn();
        render(<HighchartsTest onCreateChart={onCreateChart} options={{...options}}/>);
        const chart = onCreateChart.mockReturnValue().calls[0][0]
    
        expect(chart.tooltip).toBeDefined();
    });

    test('Return false from tooltip.formatter', (assert) => {
        const onCreateChart = vi.fn();
        
        render(<HighchartsTest onCreateChart={onCreateChart} options={{
            ...options,
            tooltip: {
                formatter: function() {
                    return this.y > 1 ? 'Display' : false;
                }
            }
        }}/>);

        const chart = onCreateChart.mockReturnValue().calls[0][0],
            tooltip = chart.tooltip,
            p1 = chart.series[0].points[0],
            p2 = chart.series[0].points[1];

        expect(chart.series.length).toEqual(2);
        chart.addSeries({ data: [2, 5, 2] });
        expect(chart.series.length).toEqual(3);

        expect(tooltip.options.formatter.call({ y: 2 })).toEqual('Display');
        expect(tooltip.options.formatter.call({ y: 1 })).toEqual(false);
    });
});
