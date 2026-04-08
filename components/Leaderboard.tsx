import React, { useEffect, useState } from "react";

interface User {
  name: string;
  score: number;
}

const Leaderboard: React.FC = () => {

  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/score/leaderboard")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error("Error fetching leaderboard:", err));
  }, []);

  return (
    <div style={{ padding: "20px", color: "white" }}>
      <h2>🏆 CyberShield Leaderboard</h2>

      {users.length === 0 ? (
        <p>No scores yet</p>
      ) : (
        users.map((user, index) => {

  const medal =
    index === 0 ? "🥇" :
    index === 1 ? "🥈" :
    index === 2 ? "🥉" : "🏅";

  return (
    <div
      key={index}
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: "#0f172a",
        padding: "12px 18px",
        marginBottom: "10px",
        borderRadius: "12px",
        border: "1px solid #1e293b"
      }}
    >
      <span style={{ fontWeight: "bold" }}>
        {medal} {user.codename}
      </span>

      <span style={{ color: "#38bdf8", fontWeight: "bold" }}>
        {user.score} XP
      </span>
    </div>
  );

})
      )}
    </div>
  );
};

export default Leaderboard;