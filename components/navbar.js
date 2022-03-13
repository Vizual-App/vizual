import { createPopper } from "@popperjs/core";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { createRef, useEffect, useState } from "react";

export default function Navbar() {
  const [dashboards, setDashboards] = useState([]);
  const [dashboardsDropdownStatus, setDashboardsDropdownStatus] = useState(false);
  const [profileDropdownStatus, setProfileDropdownStatus] = useState(false);
  const [navStatus, setNavStatus] = useState(false);

  const dashboardsBtnRef = createRef();
  const dashboardsDropdownRef = createRef();
  const profileBtnRef = createRef();
  const profileDropdownRef = createRef();

  const router = useRouter();

  useEffect(() => {
    getDashboards();
  }, []);

  const getDashboards = async () => {
    let res = await fetch("/api/dashboard");
    let dashboards = await res.json();
    setDashboards(dashboards);
  };

  const openDropdownPopover = (type) => {
    switch (type) {
      case 'dashboard':
        createPopper(dashboardsBtnRef.current, dashboardsDropdownRef.current, {
          placement: "bottom-start"
        });
        setDashboardsDropdownStatus(true);
        break;

      case 'profile':
        createPopper(profileBtnRef.current, profileDropdownRef.current, {
          placement: "bottom-end"
        });
        setProfileDropdownStatus(true);
    }
  };

  const closeDropdownPopover = (type) => {
    switch (type) {
      case 'dashboard':
        setDashboardsDropdownStatus(false);
        break;

      case 'profile':
        setProfileDropdownStatus(false);
        break;
    }
  };

  const toggleNavbar = () => {
    setNavStatus(!navStatus);
  };

  const changeDashboard = (id) => {
    closeDropdownPopover('dashboard');
    router.push("/dashboard/view/" + id);
  };

  return (
    <div className="mx-auto bg-white shadow-lg">
      <div className="flex flex-wrap h-16">
        {/* Menu button */}
        <div className="w-full flex flex-1 justify-start items-center px-10 lg:hidden">
          <button
            className="font-semibold text-blueGray-600 uppercase text-md px-4 py-3 rounded hover:text-amber-500 outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="button"
            onClick={() => toggleNavbar()}
          >
            <i className="fas fa-bars"></i>
          </button>
        </div>

        {/* Actions */}
        <div className={"w-full flex flex-1 justify-start items-center px-10 lg:flex md:hidden sm:hidden"}>
          <div className="relative inline-flex align-middle">
            <button
              className="font-semibold text-blueGray-600 uppercase text-md px-4 py-3 rounded hover:text-amber-500 outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
              ref={dashboardsBtnRef}
              onClick={() => {
                dashboardsDropdownStatus
                  ? closeDropdownPopover('dashboard')
                  : openDropdownPopover('dashboard');
              }}
            >
              Dashboard
              <i className={`px-2 fas ${dashboardsDropdownStatus ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
            </button>
            <div
              ref={dashboardsDropdownRef}
              className={
                (dashboardsDropdownStatus ? "block " : "hidden ") +
                "bg-blueGray-700 text-base z-50 float-left py-2 list-none text-left rounded shadow-lg mt-40 min-w-48"
              }
            >
              {
                dashboards.map(dashboard => (
                  <a onClick={() => changeDashboard(dashboard.id)} key={dashboard.id} className="text-sm py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent text-white hover:font-semibold hover:text-amber-500 active:text-amber-600 cursor-pointer">
                    {dashboard.name}
                  </a>
                ))
              }

              <div className="h-0 my-2 border border-solid border-t-0 border-blueGray-800 opacity-25" />

              <Link href="/dashboard/create">
                <a className="text-sm py-2 px-4 font-semibold block w-full whitespace-no-wrap uppercase bg-transparent text-white hover:font-semibold hover:text-amber-500 active:text-amber-600">Create</a>
              </Link>
            </div>
          </div>

          <Link href="/datasource" passHref>
            <button
              className="font-semibold text-blueGray-600 uppercase text-md px-6 py-3 rounded hover:text-amber-500 outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button">
              Datasource
            </button>
          </Link>
        </div>

        {/* Logo */}
        <div className="w-auto flex flex-initial justify-center items-center">
          <Image src="/logo.png" alt="logo" height="50px" width="50px" />
        </div>

        {/* Profile */}
        <div className="w-full flex flex-1 justify-end items-center px-10 ">
          <Image className="shadow rounded-full max-w-full h-auto align-middle border-none" height="40px" width="40px" src="/avatar.png" alt="avatar" />

          <button
            className="font-semibold text-blueGray-600 uppercase text-md px-4 py-3 rounded hover:text-amber-500 outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="button"
            ref={profileBtnRef}
            onClick={() => {
              profileDropdownStatus
                ? closeDropdownPopover('profile')
                : openDropdownPopover('profile');
            }}>
            Madhu
            <i className={`px-2 fas ${profileDropdownStatus ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
          </button>
          <div
            ref={profileDropdownRef}
            className={
              (profileDropdownStatus ? "block " : "hidden ") +
              "bg-blueGray-700 text-base z-50 float-left py-2 list-none text-left rounded shadow-lg mt-40 min-w-48"
            }
          >
            <a
              href="#pablo"
              className="text-sm py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent text-white hover:font-semibold"
              onClick={e => e.preventDefault()}
            >Settings</a>

            <a
              href="#pablo"
              className="text-sm py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent text-white hover:font-semibold"
              onClick={e => e.preventDefault()}
            >Logout</a>
          </div>
        </div>

      </div>
    </div>
  )
}