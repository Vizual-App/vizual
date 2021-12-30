import { Fragment } from "react";

export default function TablePanel({ editmode }) {
    return (
        <Fragment>
            <div className="rounded-t mb-0 px-4 py-3 border-0">
                <div className="flex flex-wrap items-center">
                    <div className="relative w-full p-2 max-w-full flex-grow flex-1">
                        <h3 className="font-semibold text-md text-blueGray-600 uppercase">Social traffic</h3>
                    </div>
                    <div className="relative w-full px-2 max-w-full flex-grow flex-1 text-right">
                        {
                            editmode ?
                                <>
                                    <button className="text-blueGray-500 bg-blueGray-300 text-sm shadow-lg font-normal h-8 w-8 items-center justify-center align-center rounded-md outline-none mx-3 hover:text-white hover:bg-amber-500 active:bg-amber-600" type="button">
                                        <i className="fas fa-pencil-alt"></i>
                                    </button>

                                    <button className="text-blueGray-500 bg-blueGray-300 text-sm shadow-lg font-normal h-8 w-8 items-center justify-center align-center rounded-md outline-none hover:text-white hover:bg-amber-500 active:bg-amber-600" type="button">
                                        <i className="fas fa-times"></i>
                                    </button>
                                </> : null
                        }
                    </div>
                </div>
            </div>

            <div className="block w-full overflow-x-auto">
                <table className="items-center w-full bg-transparent border-collapse">
                    <thead className="thead-light">
                        <tr>
                            <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-sm border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">Referral</th>
                            <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-sm border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">Visitors</th>
                            <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-sm border-l-0 border-r-0 whitespace-nowrap font-semibold text-left min-w-140-px">Count</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 font-semibold text-sm text-blueGray-500 whitespace-nowrap p-4 text-left">Fetch</th>
                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 font-semibold text-sm text-blueGray-500 whitespace-nowrap p-4">10,480</td>
                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 font-semibold text-sm text-blueGray-500 whitespace-nowrap p-4">
                                <div className="flex items-center">
                                    <span className="mr-2">60%</span>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 font-semibold text-sm text-blueGray-500 whitespace-nowrap p-4 text-left">Axios</th>
                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 font-semibold text-sm text-blueGray-500 whitespace-nowrap p-4">3,107</td>
                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 font-semibold text-sm text-blueGray-500 whitespace-nowrap p-4">
                                <div className="flex items-center">
                                    <span className="mr-2">23%</span>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 font-semibold text-sm text-blueGray-500 whitespace-nowrap p-4 text-left">Superagent</th>
                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 font-semibold text-sm text-blueGray-500 whitespace-nowrap p-4">571</td>
                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 font-semibold text-sm text-blueGray-500 whitespace-nowrap p-4">
                                <div className="flex items-center">
                                    <span className="mr-2">48%</span>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 font-semibold text-sm text-blueGray-500 whitespace-nowrap p-4 text-left">Request</th>
                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 font-semibold text-sm text-blueGray-500 whitespace-nowrap p-4">12,564</td>
                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 font-semibold text-sm text-blueGray-500 whitespace-nowrap p-4">
                                <div className="flex items-center">
                                    <span className="mr-2">12%</span>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </Fragment>
    )
}