import Image from 'next/image';

export default function Home() {
  const src = "/pattern_nextjs.png";

  const loginGithub = () => {
    window.location.href = getLoginUrl('8cb0ffb71a800aa61112', 'github');
  };

  const loginWithMicrosoft = () => {
    window.location.href = getLoginUrl('cddf4595-71b2-4629-88f2-d758e50efe8', 'microsoft');
  };

  const loginWithDex = () => {
    window.location.href = getLoginUrl('example-app', 'local');
  };

  const getLoginUrl = (id, type) => {
    return 'http://212.2.246.126:5556/dex/auth?client_id=' + id +
      '&redirect_uri=http://127.0.0.1:5556/dex/callback&response_type=id_token&' +
      'scope=email+openid&state=xBFykFZyP2bTGIS&nonce=1234567890&connector_id='
      + type;
  };

  return (
    <section className="relative w-full h-full py-40 min-h-screen">
      <div className="absolute top-0 w-full h-full bg-blueGray-800 bg-no-repeat bg-full" style={{ "backgroundImage": "url('https://demos.creative-tim.com/notus-nextjs/img/register_bg_2.png')" }}>
      </div>
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-4/12 px-4 mt-12">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
              <div className='flex-auto px-4 lg:px-10 py-10 pt-0'>
                <div className="w-auto flex flex-initial justify-center items-center m-8">
                  <div className='rounded-full bg-white px-3 py-2 shadow-xl'>
                    <Image src="/logo.png" alt="logo" height="50px" width="50px" />
                  </div>
                </div>
                <div className="w-auto flex flex-initial justify-center items-center">
                  <p className='text-blueGray-800 text-xl font-bold'>Vizual</p>
                </div>

                <div className='mt-6 mb-2 text-blueGray-400 text-center font-bold'>
                  <small>Sign in with</small>
                </div>

                <div className="btn-wrapper text-center">
                  <button className="bg-white active:bg-blueGray-50 text-blueGray-700 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-2 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150" type="button" onClick={loginGithub}>
                    <div className='className="w-5 mr-2'>
                      <Image alt="logo" height="15px" width="15px" className="w-5 mr-1" src="/github.svg" />
                    </div>
                    Github
                  </button>
                  <button className="bg-white active:bg-blueGray-50 text-blueGray-700 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150" type="button" onClick={loginWithMicrosoft}>
                    <div className='className="w-5 mr-2'>
                      <Image alt="logo" height="13px" width="13px" src="/microsoft.svg" />
                    </div>
                    Microsoft
                  </button>
                </div>

                <hr className="m-4 border-b-1 border-blueGray-300" />

                <div className='text-blueGray-400 text-center font-bold'>
                  <small>Or sign in with credentials</small>
                </div>

                <form>
                  <div className="text-center mt-2">
                    <button className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150" type="button" onClick={loginWithDex}>Sign In</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}