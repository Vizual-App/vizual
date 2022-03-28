import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Callback() {
    const router = useRouter();
    const { state, code } = router.query;

    useEffect(() => {
        getToken();
    }, []);

    const getToken = async () => {
        const request = {
            grant_type: "authorization_code",
            state: state,
            code: code,
            redirect_uri: "http://localhost:3000/callback",
        };

        fetch("http://10.142.202.251:5556/dex/token", {
            method: "POST",
            headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
            body: JSON.stringify(request)
        }).then((response) => {
            console.log(response);
        }).catch((err) => {
            console.log(err);
        });
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