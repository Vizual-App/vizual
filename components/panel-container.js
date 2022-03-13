import Link from "next/link";
import { useRouter } from "next/router";
import AreaChartPanel from "./panels/areachart";
import BarChartPanel from "./panels/barchart";
import TablePanel from "./panels/table";

export default function Panel({ id, name, type, source, query, editmode }) {
    const router = useRouter();
    const dashboardID = router.query["id"];

    const deletePanel = async () => {
        const res = await fetch("/api/dashboard/" + dashboardID);
        const dashboard = await res.json();

        const index = dashboard.panels.panels.findIndex(p => p.id == id);
        dashboard.panels.panels.splice(index, 1);

        await fetch("/api/dashboard/" + dashboardID, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dashboard)
        });
    };

    const renderPanel = (type) => {
        switch (type) {
            case "BAR_CHART":
                return <div style={{ 'min-height': '350px' }}>
                    <div className="rounded-t mb-0 px-4 py-3 border-0">
                        <div className="">
                            <div className="relative w-full p-2 max-w-full flex-grow flex-1">
                                <h3 className="font-semibold text-base text-blueGray-700">{name}</h3>
                            </div>
                            <div className="relative w-full px-2 max-w-full flex-grow flex-1 text-right">
                                {
                                    editmode ?
                                        <>
                                            <Link href={"/panel/" + dashboardID + "/" + id} passHref>
                                                <button className="text-blueGray-500 bg-blueGray-300 text-sm shadow-lg font-normal h-8 w-8 items-center justify-center align-center rounded-md outline-none mx-3 hover:text-white hover:bg-amber-500 active:bg-amber-600" type="button">
                                                    <i className="fas fa-pencil-alt"></i>
                                                </button>
                                            </Link>

                                            <button className="text-blueGray-500 bg-blueGray-300 text-sm shadow-lg font-normal h-8 w-8 items-center justify-center align-center rounded-md outline-none hover:text-white hover:bg-amber-500 active:bg-amber-600" type="button" onClick={deletePanel}>
                                                <i className="fas fa-times"></i>
                                            </button>
                                        </> : null
                                }
                            </div>
                        </div>
                    </div>
                    <BarChartPanel source={source} query={query}></BarChartPanel>
                </div>;

            case "DATA_TABLE":
                return <div style={{'min-height': '350px'}}>
                    <div className="rounded-t mb-0 px-4 py-3 border-0">
                        <div className="">
                            <div className="relative w-full p-2 max-w-full flex-grow flex-1">
                                <h3 className="font-semibold text-base text-blueGray-700">{name}</h3>
                            </div>
                            <div className="relative w-full px-2 max-w-full flex-grow flex-1 text-right">
                                {
                                    editmode ?
                                        <>
                                            <Link href={"/panel/" + dashboardID + "/" + id} passHref>
                                                <button className="text-blueGray-500 bg-blueGray-300 text-sm shadow-lg font-normal h-8 w-8 items-center justify-center align-center rounded-md outline-none mx-3 hover:text-white hover:bg-amber-500 active:bg-amber-600" type="button">
                                                    <i className="fas fa-pencil-alt"></i>
                                                </button>
                                            </Link>

                                            <button className="text-blueGray-500 bg-blueGray-300 text-sm shadow-lg font-normal h-8 w-8 items-center justify-center align-center rounded-md outline-none hover:text-white hover:bg-amber-500 active:bg-amber-600" type="button" onClick={deletePanel}>
                                                <i className="fas fa-times"></i>
                                            </button>
                                        </> : null
                                }
                            </div>
                        </div>
                    </div>
                    <TablePanel source={source} query={query}></TablePanel>
                </div>;

            case "AREA_CHART":
                return <div style={{ 'min-height': '350px' }}>
                    <div className="rounded-t mb-0 px-4 py-3 border-0">
                        <div className="">
                            <div className="relative w-full p-2 max-w-full flex-grow flex-1">
                                <h3 className="font-semibold text-base text-blueGray-700">{name}</h3>
                            </div>
                            <div className="relative w-full px-2 max-w-full flex-grow flex-1 text-right">
                                {
                                    editmode ?
                                        <>
                                            <Link href={"/panel/" + dashboardID + "/" + id} passHref>
                                                <button className="text-blueGray-500 bg-blueGray-300 text-sm shadow-lg font-normal h-8 w-8 items-center justify-center align-center rounded-md outline-none mx-3 hover:text-white hover:bg-amber-500 active:bg-amber-600" type="button">
                                                    <i className="fas fa-pencil-alt"></i>
                                                </button>
                                            </Link>

                                            <button className="text-blueGray-500 bg-blueGray-300 text-sm shadow-lg font-normal h-8 w-8 items-center justify-center align-center rounded-md outline-none hover:text-white hover:bg-amber-500 active:bg-amber-600" type="button" onClick={deletePanel}>
                                                <i className="fas fa-times"></i>
                                            </button>
                                        </> : null
                                }
                            </div>
                        </div>
                    </div>
                    <AreaChartPanel source={source} query={query}></AreaChartPanel>
                </div>;
        }
    }

    return (
        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
            {renderPanel(type)}
        </div>
    )
}