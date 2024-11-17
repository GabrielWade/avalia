import axios from "axios";
import {useState, useCallback} from "react";
import Particles from "react-tsparticles";
import {loadSlim} from "tsparticles-slim";

export const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const submit = async (e) => {
        e.preventDefault();

        const user = {
            username: username,
            password: password,
        };

        try {
            const {data} = await axios.post(
                'http://localhost:8000/token/',
                user,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                },
                {withCredentials: true}
            );

            console.log(data);
            localStorage.clear();
            localStorage.setItem('access_token', data.access);
            localStorage.setItem('refresh_token', data.refresh);
            axios.defaults.headers.common['Authorization'] = `Bearer ${data.access}`;
            window.location.href = '/';
        } catch (error) {
            console.error("Login failed:", error);
            setErrorMessage("Invalid username or password. Please try again.");
        }
    };

    const particlesInit = useCallback(async (engine) => {
        console.log("Particles engine initialized");
        await loadSlim(engine);
    }, []);

    const particlesOptions = {
        particles: {
            number: {
                value: 80,
                density: {
                    enable: true,
                    area: 800,
                },
            },
            size: {
                value: 3,
            },
            color: {
                value: "#ffffff",
            },
            lineLinked: {
                enable: true,
                distance: 150,
                color: "#ffffff",
                opacity: 0.4,
                width: 1,
            },
            move: {
                enable: true,
                speed: 1.5,
            },
        },
        interactivity: {
            events: {
                onHover: {
                    enable: true,
                    mode: "grab",
                },
                onClick: {
                    enable: true,
                    mode: "push",
                },
            },
            modes: {
                grab: {
                    distance: 200,
                    lineLinked: {
                        opacity: 1,
                    },
                },
                push: {
                    quantity: 4,
                },
            },
        },
    };

    return (
        <div
            style={{
                position: "relative",
                height: "100vh",
                overflow: "hidden",
                background: "radial-gradient(circle at top, #1e3a8a, #1e293b, #0f172a)",
            }}
        >
            <Particles
                id="tsparticles"
                init={particlesInit}
                options={particlesOptions}
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    zIndex: 1,
                    width: "100%",
                    height: "100%",
                }}
            />
            <div
                className="Auth-form-container"
                style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    zIndex: 2,
                    padding: "30px",
                }}
            >
                <form className="Auth-form" onSubmit={submit}>
                    <div className="Auth-form-content">
                        <h3 className="Auth-form-title">Sign In</h3>
                        {errorMessage && (
                            <div
                                style={{
                                    backgroundColor: "#ffcccc",
                                    color: "#cc0000",
                                    padding: "10px",
                                    borderRadius: "5px",
                                    marginBottom: "10px",
                                    textAlign: "center",
                                }}
                            >
                                {errorMessage}
                            </div>
                        )}
                        <div className="form-group mt-3">
                            <label>Username</label>
                            <input
                                className="form-control mt-1"
                                placeholder="Enter Username"
                                name="username"
                                type="text"
                                value={username}
                                required
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className="form-group mt-3">
                            <label>Password</label>
                            <input
                                name="password"
                                type="password"
                                className="form-control mt-1"
                                placeholder="Enter password"
                                value={password}
                                required
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="d-grid gap-2 mt-3">
                            <button type="submit" className="btn btn-primary">
                                Submit
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};
