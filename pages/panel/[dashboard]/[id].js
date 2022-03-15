import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Navbar from "../../../components/navbar";

export default function CreatePanel() {
    const { register, handleSubmit, reset, setValue } = useForm();

    const router = useRouter();
    const id = router.query["dashboard"];
    const panelID = router.query["id"];

    const panelTypes = [
        { name: 'Area Chart', type: 'AREA_CHART' },
        { name: 'Bar Chart', type: 'BAR_CHART' },
        { name: 'Table', type: 'DATA_TABLE' }
    ];

    useEffect(() => {
        if (!router.isReady)
            return;

        getDashboard();
    }, [router.isReady]);

    const getDashboard = async () => {
        const res = await fetch("/api/dashboard/" + id);
        const json = await res.json();

        const panelInfo = json.panels.panels.filter(p => p.id == panelID);
        if (panelInfo.length > 0) {
            setValue("name", panelInfo[0].name);
            setValue("type", panelInfo[0].type);
            setValue("query", panelInfo[0].query);
        }
    };

    const create = async (info) => {
        const res = await fetch("/api/dashboard/" + id);
        const dashboard = await res.json();

        dashboard.panels.panels.forEach((p) => {
            if (panelID == p.id) {
                p.id = panelID;
                p.name = info.name;
                p.type = info.type;
                p.query = info.query;
            }
        });

        await fetch("/api/dashboard/" + id, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dashboard)
        });

        router.push("/dashboard/view/" + id);
    };

    return (
        <>
            <div className='min-h-screen bg-blueGray-100'>
                <Navbar></Navbar>

                <div className="mx-auto mt-5 mb-5">
                    <div className="flex flex-wrap h-16">
                        <div className="w-full flex flex-1 justify-start items-center px-20">
                            <i className="fas fa-braille text-blueGray-500 text-3xl"></i>
                            <p className="font-semibold text-blueGray-500 text-3xl px-6 py-3">Edit Vizual</p>
                        </div>
                    </div>
                </div>

                <div className="mx-auto px-6 pb-10">
                    <div className="flex flex-wrap">
                        <div className="w-4/12 bg-blueGray-50 shadow-lg ml-6 mr-10">
                            <div className="bg-white mb-6 px-6 py-6">
                                <div className="text-center flex justify-between">
                                    <h6 className="font-semibold text-blueGray-600 uppercase text-md">Panel Information</h6>
                                </div>
                            </div>

                            <div className="px-10">
                                <form onSubmit={handleSubmit(create)}>
                                    <div className="relative w-full mb-6">
                                        <label className="block text-blueGray-400 text-sm mb-2">Panel Title</label>
                                        <input {...register("name", { required: true })} type="text" className="border-0 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow w-full ease-linear transition-all duration-150" placeholder="Enter panel name" />
                                    </div>

                                    <div className="relative w-full mb-6">
                                        <label className="block text-blueGray-400 text-sm mb-2">Panel Type</label>
                                        <select {...register("type", { required: "select one option" })} defaultValue={'DEFAULT'} className="border-0 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow w-full ease-linear transition-all duration-150">
                                            {
                                                panelTypes.map(panel => (
                                                    <option value={panel.type} key={panel.type}>{panel.name}</option>
                                                ))
                                            }
                                        </select>
                                    </div>

                                    <div className="relative w-full mb-6">
                                        <label className="block text-blueGray-400 text-sm mb-2">Data Query</label>
                                        <textarea {...register("query", { required: true })} type="text" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow w-full ease-linear transition-all duration-150" rows="4" placeholder="Enter panel description"></textarea>
                                    </div>

                                    <button className="text-blueGray-500 bg-blueGray-300 active:bg-amber-600 font-bold uppercase text-sm px-6 py-2 mb-6 rounded-full shadow hover:text-white hover:shadow-lg hover:bg-amber-500 outline-none ease-linear transition-all duration-150" type="submit">
                                        Execute & Visualize
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}