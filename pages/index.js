import Image from 'next/image';
import Link from 'next/link';
import Navbar from '../components/navbar';

export default function Home() {
  const src = "/pattern_nextjs.png";

  return (
    <div className='min-h-screen bg-blueGray-100'>
      <Navbar></Navbar>

      <div className="absolute w-2/5 h-4/6 pb-36 pt-10 right-0">
        <div className="flex flex-wrap">
          <Image src={src} layout="fill" alt='bg' />
        </div>
      </div>

      <div className="mx-auto pt-36 px-6 pb-10">
        <div className="w-full md:w-8/12 lg:w-6/12 xl:w-6/12 px-28">
          <h2 className="font-semibold text-4xl text-blueGray-600">Vizual</h2>
          <h2 className="mt-8 font-semibold text-2xl text-blueGray-600">A beautiful tool for visualizing data</h2>
          <p className="mt-4 text-lg leading-relaxed text-blueGray-500">Integrate different datasources easily and generate dashboards for data analytics. Supports Dashboard as Code. Runs on multiple platforms. Primary support would be for running on Kubernetes.</p>

          <br />
          <Link href="/dashboard/create">
            <a className="bg-blueGray-500 text-white active:bg-blueGray-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">
              Create Dashboard
            </a>
          </Link>
        </div>
      </div>
    </div>
  )
}
