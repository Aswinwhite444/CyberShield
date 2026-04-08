<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/temp/1

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Run the app:
  `npm run dev`

🔍 Project Description

CyberShield Academy is a gamified cybersecurity training web application designed to improve user awareness of common cyber threats such as phishing, password attacks, and malware behavior.
The application uses interactive missions and real-time simulations to encourage decision-making, critical thinking, and practical learning rather than rote memorization.


🗄️ Why MongoDB Is Not Used

This project intentionally does not use MongoDB or any backend database, and this was a conscious architectural decision, not a limitation.

Reasons:

Frontend-Focused Learning Objective
The primary goal of the project is to deliver an interactive learning experience, not to manage large-scale user data.

No Multi-User Requirement

No login / signup system

No user accounts shared across devices

No admin dashboard
Hence, a database is unnecessary.

Client-Side State Management Is Sufficient

User progress (XP, level, streak) is stored using localStorage

Data persists across sessions on the same device

Reduces system complexity

Security Best Practice
Frontend applications cannot directly connect to MongoDB securely.
A backend (Node.js + Express) would be mandatory, which is outside the scope of this project.

Design Trade-off

MongoDB can be integrated in the future if features such as user authentication, cloud sync, or leaderboards are required.

🧠 Simulation Design Choice
Single-Scenario, High-Fidelity Simulation Model

Instead of traditional multiple-choice quizzes, CyberShield Academy uses a scenario-based simulation approach.

Key Design Decisions:

One Scenario per Session

Each simulation session presents one realistic cyber incident

Encourages deep analysis rather than fast guessing

Mimics real-world security decision workflows

Randomized Scenario Selection

Scenarios are randomly selected from a predefined repository

Ensures unpredictability and prevents memorization

Improves long-term learning retention

Evidence-Driven Feedback

After user decision, the system displays:

Red flags

Indicators of compromise

Explanation of the correct outcome

Reinforces conceptual understanding

Avoiding Quiz Fatigue

Multi-question sessions were intentionally avoided

Keeps the experience focused, immersive, and realistic

Rationale

In real cybersecurity environments, professionals analyze one incident at a time, not a list of questions.
This design choice aligns the simulation with real-world practices.