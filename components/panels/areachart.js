import { useRef } from 'react';
import { AreaChart } from 'react-d3-components';

export default function AreaChartPanel() {
    const data = [
        {
            label: 'Fetch',
            values: [{ x: 0, y: 2 }, { x: 1.3, y: 5 }, { x: 3, y: 6 }, { x: 3.5, y: 6.5 }, { x: 4, y: 6 },
            { x: 4.5, y: 6 }, { x: 5, y: 7 }, { x: 5.5, y: 8 }]
        },
        {
            label: 'Axios',
            values: [{ x: 0, y: 3 }, { x: 1.3, y: 4 }, { x: 3, y: 7 }, { x: 3.5, y: 8 }, { x: 4, y: 7 },
            { x: 4.5, y: 7 }, { x: 5, y: 7.8 }, { x: 5.5, y: 9 }]
        }
    ];

    const chartRef = useRef();

    const displayLabel = (label) => {
        return label;
    }

    return (
        <div className="block w-full flex justify-center overflow-x-auto">
            <AreaChart
                ref={chartRef}
                data={data}
                width={500}
                height={280}
                tooltipHtml={displayLabel}
                xAxis={{ tickArguments: [5] }}
                yAxis={{ tickArguments: [3] }}
                margin={{ top: 20, bottom: 50, left: 60, right: 40 }} />
        </div>
    );
}