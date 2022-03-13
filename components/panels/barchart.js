import { useEffect, useRef, useState } from 'react';
import { BarChart } from 'react-d3-components';

export default function BarChartPanel({ source, query }) {
    const chartRef = useRef();

    const [initStatus, setInitStatus] = useState(false);
    const [chartData, setChartData] = useState([{ values: [{ x: 'Test', y: 0 }] }]);

    const getData = async () => {
        const request = await fetch("/api/panel", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ source: source, query: query })
        });

        const json = await request.json();
        const graphData = [];
        json.forEach((element, index) => {
            const headers = Object.keys(element);
            graphData.push({ x: element[headers[0]], y: element[headers[1]] });

            if (index === (json.length - 1)) {
                setChartData([{ values: graphData }]);
                setInitStatus(true);
            }
        });
    };

    useEffect(() => {
        getData();
    }, []);

    const displayLabel = (label) => {
        return label;
    }

    return (
        <div className="block w-full flex justify-center overflow-x-auto">
            {
                initStatus ?
                    <BarChart
                        ref={chartRef}
                        data={chartData}
                        width={500}
                        height={280}
                        tooltipHtml={displayLabel}
                        yAxis={{ tickArguments: [3] }}
                        color={"red"}
                        margin={{ top: 20, bottom: 50, left: 60, right: 40 }} />
                    :
                    <div className="flex justify-center">
                        <h6 className="text-xl font-normal leading-normal mt-0 mb-2 text-blueGray-800">
                            Loading ...
                        </h6>
                    </div>
            }
        </div>
    );
}