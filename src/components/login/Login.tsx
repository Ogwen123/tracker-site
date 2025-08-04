import React from "react";
import { useData } from "../../App";
import { url } from "../../utils/url";
import { _Alert } from "../../global/types";
import LoadingWheel from "../LoadingWheel";
import Alert from "../Alert";

const Login = () => {
    const { width } = useData();

    const [identifier, setIdentifier] = React.useState<string>();
    const [password, setPassword] = React.useState<string>();

    const [submitting, setSubmitting] = React.useState<boolean>();
    const [alert, setAlert] = React.useState<_Alert>(["Alert", "ERROR", false]);

    const login = () => {
        setSubmitting(true);
        fetch(url("auth") + "login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                identifier,
                password,
                service: "TRACKER",
                sendData: true,
            }),
        })
            .then((res) => {
                if (!res.ok) {
                    res.json().then((data) => {
                        setAlert([
                            data.error instanceof Array
                                ? data.error[0]
                                : data.error,
                            "ERROR",
                            true,
                        ]);
                        setSubmitting(false);
                    });
                } else {
                    res.json().then((data) => {
                        setAlert(["Successfully logged in", "SUCCESS", true]);
                        setSubmitting(false);
                        localStorage.setItem("token", data.data.token);
                        localStorage.setItem(
                            "userData",
                            JSON.stringify({
                                username: data.data.username,
                                name: data.data.name,
                            }),
                        );
                        setTimeout(() => {
                            location.href = "/";
                        }, 250);
                    });
                }
            })
            .catch(() => {
                setAlert([
                    "An unknown error occured whilst logging in.",
                    "ERROR",
                    true,
                ]);
                setSubmitting(false);
            });
    };

    return (
        <div
            className={
                "page-full flex flex-row gradient sm:justify-center sm:items-center"
            }
        >
            <div
                className={
                    "w-[calc(40%-40px)] min-w-[320px] bg-bg/90 card-border rounded-md shadow-3xl flex flex-col items-center justify-center pb-[80px]" +
                    (width > 650 ? " h-[calc(100%-40px)] m-[20px]" : " h-[60%]")
                }
            >
                <Alert
                    content={alert[0] instanceof Array ? alert[0][1] : alert[0]}
                    severity={alert[1]}
                    show={alert[2]}
                    title={alert[0] instanceof Array ? alert[0][0] : undefined}
                    width="80%"
                />
                <a href="/" className="gradienttext text-center text-4xl">
                    Tracker
                </a>
                <div className=" text-subtext mb-[40px]">
                    Login to your ogwen.eu.org account.
                </div>
                <input
                    type="text"
                    className="form-input w-[80%] min-w-[300px] m-[5px]"
                    placeholder="Username or Email"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.code === "Enter") {
                            login();
                        }
                    }}
                />
                <input
                    type="password"
                    className="form-input w-[80%] min-w-[300px]"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.code === "Enter") {
                            login();
                        }
                    }}
                />
                <button
                    onClick={() => login()}
                    className="bg-main rounded-md p-[10px] m-[15px] w-[80%] min-w-[300px]"
                >
                    {submitting ? <LoadingWheel size={24} /> : "Login"}
                </button>
            </div>
        </div>
    );
};

export default Login;
