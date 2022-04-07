import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import Navbar from "../../../components/navbar";
import Panel from "../../../components/panel-container";

export default function Dashboard({ dashboard }) {
  const router = useRouter();
  const id = router.query["id"];

  const [panelEditStatus, setPanelEditStatus] = useState(false);

  const onDeleteBtnClick = async () => {
    await fetch("/api/dashboard/" + id, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" }
    });

    router.push("/");
  };

  const onEditBtnClick = () => {
    setPanelEditStatus(!panelEditStatus);
  };

  return (
    <div className="min-h-screen bg-blueGray-100">
      <Navbar></Navbar>

      <div className="absolute min-w-full	bg-blueGray-800 pb-36 pt-10">
        <div className="flex flex-wrap h-16">
          <div className="flex flex-wrap h-16">
            <div className="w-full flex flex-1 justify-start items-center px-20">
              <i className="fab fa-codepen text-white text-3xl"></i>
              <p className="font-semibold text-white text-3xl px-6 py-3 capitalize">{dashboard.name}</p>
            </div>
          </div>

          <div className="w-full flex flex-1 justify-end items-center px-16">
            <Link href={"/panel/create/" + dashboard.id} passHref>
              <button className="text-blueGray-500 bg-white hover:bg-amber-500 hover:text-white active:bg-amber-600 text-md rounded px-4 py-2 mx-2 mr-1 mb-1 ease-linear transition-all duration-150" type="button">
                <i className="pr-2 fas fa-plus"></i> Add Visual
              </button>
            </Link>

            <button className="text-blueGray-500 bg-white hover:bg-amber-500 hover:text-white active:bg-amber-600 text-md rounded p-2 mx-2 mr-1 mb-1 ease-linear transition-all duration-150" type="button" onClick={() => location.reload()}>
              <i className="px-2 fas fa-sync-alt"></i>
            </button>

            <button className="text-blueGray-500 bg-white hover:bg-amber-500 hover:text-white active:bg-amber-600 text-md rounded p-2 mx-2 mr-1 mb-1 ease-linear transition-all duration-150" type="button" onClick={onEditBtnClick}>
              {
                panelEditStatus ?
                  <i className="px-2 fas fa-times"></i>
                  : <i className="px-2 fas fa-pencil-alt"></i>
              }
            </button>

            <button className="text-blueGray-500 bg-white hover:bg-amber-500 hover:text-white active:bg-amber-600 text-md rounded p-2 mx-2 mr-1 mb-1 ease-linear transition-all duration-150" type="button" onClick={onDeleteBtnClick}>
              <i className="px-2 fas fa-trash-alt"></i>
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto pt-36 px-6 pb-10">
        <div className="px-4 mx-auto">
          <div className="flex flex-wrap">
            {
              dashboard.panels.panels.map(panel => (
                <div className="max-w-2xl h-auto px-4 flex-1" key={panel.id}>
                  <Panel
                    id={panel.id}
                    name={panel.name}
                    type={panel.type}
                    source={dashboard.datasource_id}
                    query={panel.query}
                    editmode={panelEditStatus}>
                  </Panel>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export async function getStaticProps({ params }) {
  const res = await fetch('http://localhost:5556/api/dashboard/' + params.id);
  const json = await res.json();
  return { props: { dashboard: json } };
}

export async function getStaticPaths() {
  return { paths: [], fallback: 'blocking' };
}