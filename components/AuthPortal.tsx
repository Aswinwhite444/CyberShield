import React, { useState } from "react";

interface Props {
  onAuthSuccess: (user: any) => void;
}

const AuthPortal: React.FC<Props> = ({ onAuthSuccess }) => {

  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [codename, setCodename] = useState("");
  const [password, setPassword] = useState("");

const handleSubmit = async () => {

  console.log({ email, codename, password });

  try {

    const endpoint = isLogin
      ? "http://localhost:5000/api/auth/login"
      : "http://localhost:5000/api/auth/signup";

    const body = isLogin
      ? { codename, password }
      : { email, codename, password };

    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });

    const data = await res.json();

    console.log(data);

    if (!data.success) {
      alert(data.message || "Authentication failed");
      return;
    }

    // save login session
    localStorage.setItem("cybershield_session", "true");

    // send user to App.tsx
    onAuthSuccess(data.user);

  } catch (error) {

    console.error(error);
    alert("Server error");

  }

};

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-950 text-white">

      <div className="glass-card p-10 rounded-3xl w-[420px]">

        <h2 className="text-2xl font-bold mb-6 text-center">
          CyberShield Access
        </h2>

        {!isLogin && (
          <input
            className="w-full mb-4 p-3 bg-slate-900 rounded-xl"
            placeholder="Email"
            onChange={(e)=>setEmail(e.target.value)}
          />
        )}

        <input
          className="w-full mb-4 p-3 bg-slate-900 rounded-xl"
          placeholder="Codename"
          onChange={(e)=>setCodename(e.target.value)}
        />

        <input
          type="password"
          className="w-full mb-6 p-3 bg-slate-900 rounded-xl"
          placeholder="Password"
          onChange={(e)=>setPassword(e.target.value)}
        />

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 py-3 rounded-xl font-bold"
        >
          {isLogin ? "LOGIN" : "REGISTER"}
        </button>

        <p
          className="text-blue-400 text-center mt-4 cursor-pointer"
          onClick={()=>setIsLogin(!isLogin)}
        >
          {isLogin ? "Create account" : "Already have an account?"}
        </p>

      </div>

    </div>
  );
};

export default AuthPortal;