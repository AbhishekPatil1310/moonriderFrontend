// src/pages/Home.jsx
import LoginForm from "../componete/LoginForm";
import GoogleLogin from "../componete/GoogleLogin";

export default function Home() {
    return (
        <div className="p-4 flex flex-col gap-4">
            <h1 className="text-2xl font-bold">Welcome</h1>
            <LoginForm />
        </div>
    );
}
