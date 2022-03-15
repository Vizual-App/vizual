import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Navbar from "../components/navbar";

export default function DataSource() {
    const [editMode, setEditMode] = useState(false);
    const [sources, setSources] = useState([]);

    const { register, handleSubmit, reset, setValue } = useForm();

    const sourceTypes = [
        { name: "Select type", type: "" },
        { name: 'Postgres', type: 'POSTGRES' },
        { name: 'Clickhouse', type: 'CLICKHOUSE' }
    ];

    useEffect(() => {
        getSources();
    }, []);

    const getSources = async () => {
        let res = await fetch("/api/datasource");
        let sources = await res.json();
        setSources(sources);
    };

    const createSource = async (source) => {
        if (editMode) {
            updateSource(source);
            return;
        }
        
        const request = {
            name: source.name,
            type: source.type,
            metadata: {
                host: source.host,
                port: source.port,
                user: source.user,
                password: source.password,
                database: source.database
            }
        };

        await fetch("/api/datasource", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(request)
        });

        reset();
        getSources();
    };

    const selectStore = (source) => {
        setValue("id", source.id);
        setValue("name", source.name);
        setValue("type", source.type);
        setValue("host", source.metadata?.host);
        setValue("port", source.metadata?.port);
        setValue("user", source.metadata?.user);
        setValue("password", source.metadata?.password);
        setValue("database", source.metadata?.database);
        setEditMode(true);
    };

    const updateSource = async (source) => {
        const request = {
            id: source.id,
            name: source.name,
            type: source.type,
            metadata: {
                host: source.host,
                port: source.port,
                user: source.user,
                password: source.password,
                database: source.database
            }
        };

        await fetch("/api/datasource", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(request)
        });

        reset();
        getSources();
    };

    const deleteSource = async (source) => {
        await fetch("/api/datasource", {
            method: "DELETE",
            body: JSON.stringify({ "id": source.id }),
            headers: { "Content-Type": "application/json" }
        });

        getSources();
    };

    return (
        <>
            <div className="min-h-screen bg-blueGray-100">
                <Navbar></Navbar>

                <div className="mx-auto mb-5 mt-5">
                    <div className="flex flex-wrap h-16">
                        <div className="w-full flex flex-1 justify-start items-center px-20">
                            <i className="fas fa-database text-blueGray-500 text-3xl"></i>
                            <p className="font-semibold text-blueGray-500 text-3xl px-6 py-3">Data Source</p>
                        </div>
                    </div>
                </div>

                <div className="mx-auto px-6 pb-10">
                    <div className="flex flex-wrap">
                        <div className="w-5/12 bg-blueGray-50 shadow-lg ml-6 mr-10">
                            <div className="bg-white px-6 py-6">
                                <div className="text-center flex justify-between">
                                    <h6 className="font-semibold text-blueGray-600 uppercase text-md">Sources</h6>
                                </div>
                            </div>

                            <div>
                                <table className="items-center w-full bg-transparent border-collapse">
                                    <tbody>
                                        {
                                            sources.map(source => (
                                                <tr className="hover:bg-blueGray-100" key={source.id}>
                                                    <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 font-semibold text-md text-blueGray-500 whitespace-nowrap p-4 text-left">
                                                        {source.name}
                                                    </th>
                                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-md whitespace-nowrap text-right">
                                                        <button className="text-blueGray-500 bg-blueGray-300 text-sm shadow-lg font-normal h-8 w-8 items-center justify-center align-center rounded-md outline-none mx-5 hover:text-white hover:bg-amber-500 active:bg-amber-600" type="button" onClick={() => selectStore(source)}>
                                                            <i className="fas fa-pencil-alt"></i>
                                                        </button>

                                                        <button className="text-blueGray-500 bg-blueGray-300 text-sm shadow-lg font-normal h-8 w-8 items-center justify-center align-center rounded-md outline-none hover:text-white hover:bg-amber-500 active:bg-amber-600" type="button" onClick={() => deleteSource(source)}>
                                                            <i className="fas fa-times"></i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="w-5/12 bg-blueGray-50 shadow-lg justify-center items-center">
                            <div className="bg-white mb-6 px-6 py-6">
                                <div className="text-center flex justify-between">
                                    <h6 className="font-semibold text-blueGray-600 uppercase text-md">Source Information</h6>
                                </div>
                            </div>

                            <div className="px-10">
                                <form onSubmit={handleSubmit(createSource)}>
                                    <div className="relative w-full mb-6">
                                        <label className="block text-blueGray-400 text-sm mb-2">Name</label>
                                        <input {...register("name", { required: true })} type="text" className="border-0 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow w-full ease-linear transition-all duration-150" placeholder="Enter name" />
                                    </div>

                                    <div className="relative w-full mb-6">
                                        <label className="block text-blueGray-400 text-sm mb-2">Type</label>
                                        <select {...register("type", { required: "select one option" })} defaultValue={'DEFAULT'} className="border-0 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow w-full ease-linear transition-all duration-150">
                                            {
                                                sourceTypes.map(source => (
                                                    <option value={source.type} key={source.type}>{source.name}</option>
                                                ))
                                            }
                                        </select>
                                    </div>

                                    <div className="relative w-full mb-6">
                                        <label className="block text-blueGray-400 text-sm mb-2">Host / URL</label>
                                        <input {...register("host", { required: true })} type="text" className="border-0 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow w-full ease-linear transition-all duration-150" placeholder="Enter host" />
                                    </div>

                                    <div className="relative w-full mb-6">
                                        <label className="block text-blueGray-400 text-sm mb-2">Port</label>
                                        <input {...register("port")} type="text" className="border-0 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow w-full ease-linear transition-all duration-150" placeholder="Enter port" />
                                    </div>

                                    <div className="relative w-full mb-6">
                                        <label className="block text-blueGray-400 text-sm mb-2">Database</label>
                                        <input {...register("database")} type="text" className="border-0 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow w-full ease-linear transition-all duration-150" placeholder="Enter database" />
                                    </div>

                                    <div className="relative w-full mb-6">
                                        <label className="block text-blueGray-400 text-sm mb-2">Username</label>
                                        <input {...register("user")} type="text" className="border-0 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow w-full ease-linear transition-all duration-150" placeholder="Enter username" />
                                    </div>

                                    <div className="relative w-full mb-10">
                                        <label className="block text-blueGray-400 text-sm mb-2">Password</label>
                                        <input {...register("password")} type="password" className="border-0 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow w-full ease-linear transition-all duration-150" placeholder="Enter password" />
                                    </div>

                                    <button className="text-blueGray-500 bg-blueGray-300 active:bg-amber-600 font-bold uppercase text-sm px-6 py-2 mb-6 mr-6 rounded-full shadow hover:text-white hover:shadow-lg hover:bg-amber-500 outline-none ease-linear transition-all duration-150" type="submit">
                                        Save
                                    </button>

                                    <button className="text-blueGray-500 bg-blueGray-300 active:bg-amber-600 font-bold uppercase text-sm px-6 py-2 mb-6 rounded-full shadow hover:text-white hover:shadow-lg hover:bg-amber-500 outline-none ease-linear transition-all duration-150" type="button" onClick={() => { setEditMode(false); reset(); }}>
                                        Reset
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