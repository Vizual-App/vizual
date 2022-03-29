import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Callback() {
  const router = useRouter();

  useEffect(() => {
    getToken();
  }, []);

  const getToken = async () => {
    const [url, _] = router.asPath.split('#')[1].split('?');
    const hash = url.split('&');

    for (let i = 0; i < hash.length; i++) {
      const [key, value] = hash[i].split('=');
      if (key == 'access_token') {
        window.localStorage.setItem('USER_TOKEN', value);
        setTimeout(() => router.push('/'), 2000);
      }
    }
  };

  return (
    <>
      <div className="w-full h-full min-h-screen flex justify-center items-center flex-col">
        <Image src="/loading.gif" alt="loading" height="50px" width="50px" />
        <div className="text-center font-bold mt-8">
          <small>Setting up vizual ..</small>
        </div>
      </div>
    </>
  );
}