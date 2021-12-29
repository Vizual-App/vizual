import { useForm } from "react-hook-form";
import Navbar from "../../../components/navbar";

export default function Create() {
    const { register, handleSubmit, reset } = useForm();

    const createDashboard = (dashboard) => {
        console.log(dashboard);
        reset({ name: '', source: '' });
    };

    return (
        <>
            <div className='min-h-screen bg-blueGray-100'>
                <Navbar></Navbar>

                <div className="mx-auto mb-5">
                    <div className="flex flex-wrap h-16">
                        <div className="w-full flex flex-1 justify-start items-center px-20">
                            <i className="fas fa-braille text-blueGray-500 text-3xl"></i>
                            <p className="font-semibold text-blueGray-500 text-3xl px-6 py-3">Create Dashboard</p>
                        </div>
                    </div>
                </div>

                <div className="mx-auto px-6 pb-10">
                    <div className="flex flex-wrap">
                        <div className="w-4/12 bg-blueGray-50 shadow-lg ml-6 mr-10">
                            <div className="bg-white mb-6 px-6 py-6">
                                <div className="text-center flex justify-between">
                                    <h6 className="font-semibold text-blueGray-600 uppercase text-md">Dashboard Information</h6>
                                </div>
                            </div>

                            <div className="px-10">
                                <form onSubmit={handleSubmit(createDashboard)}>
                                    <div className="relative w-full mb-6">
                                        <label className="block text-blueGray-400 text-sm mb-2">Name</label>
                                        <input {...register("name", { required: true })} type="text" className="border-0 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow w-full ease-linear transition-all duration-150" placeholder="Enter name" />
                                    </div>

                                    <div className="relative w-full mb-10">
                                        <label className="block text-blueGray-400 text-sm mb-2">Data Source</label>
                                        <input {...register("source", { required: true })} type="text" className="border-0 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow w-full ease-linear transition-all duration-150" placeholder="Enter data source" />
                                    </div>

                                    <button className="text-blueGray-500 bg-blueGray-300 active:bg-amber-600 font-bold uppercase text-sm px-6 py-2 mb-6 rounded-full shadow hover:text-white hover:shadow-lg hover:bg-amber-500 outline-none ease-linear transition-all duration-150" type="submit">
                                        Create
                                    </button>
                                </form>
                            </div>
                        </div>

                        <div className="w-5/12 flex min-h-full justify-center items-center"></div>
                    </div>
                </div>
            </div>
        </>
    )
}