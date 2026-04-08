import React, { useState } from "react";

interface AuthProps {
  onAuthSuccess: (user: any) => void;
}

const AuthScreen: React.FC<AuthProps> = ({ onAuthSuccess }) => {

  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {

  try {

    const endpoint = isLogin
      ? "http://localhost:5000/api/auth/login"
      : "http://localhost:5000/api/auth/signup";

    const body = isLogin
      ? { email, password }
      : { name, email, password };

    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });

    const data = await res.json();

    if (isLogin) {

      if (data.user) {
        onAuthSuccess({
  name: data.user.name,
  avatar: "/avatars/avatar1.png",
  xp: data.user.score || 0,
  level: 1,
  completedMissions: []
});
      } else {
        alert("Login failed");
      }

    } else {

      if (data.message) {
        alert("Registration successful! Please login.");
        setIsLogin(true);
      } else {
        alert("Registration failed");
      }

    }

  } catch (error) {
    console.error(error);
    alert("Authentication error");
  }

};

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-950 text-white">

      <h1 className="text-3xl font-bold mb-8">CyberShield Access Portal</h1>

      {!isLogin && (
        <input
          className="mb-4 p-3 rounded bg-slate-800"
          placeholder="Username"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      )}

      <input
        className="mb-4 p-3 rounded bg-slate-800"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        className="mb-4 p-3 rounded bg-slate-800"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        onClick={handleSubmit}
        className="bg-blue-600 px-6 py-3 rounded font-bold"
      >
        {isLogin ? "LOGIN" : "REGISTER"}
      </button>

      <p
        className="mt-4 text-blue-400 cursor-pointer"
        onClick={() => setIsLogin(!isLogin)}
      >
        {isLogin ? "Create account" : "Already have an account?"}
      </p>

    </div>
  );
};

export default AuthScreen;