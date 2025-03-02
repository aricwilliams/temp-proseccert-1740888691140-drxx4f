import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { DashboardHeader } from "./components/DashboardHeader";
import { ObjectiveCard } from "./components/ObjectiveCard";
import { TestingDashboard } from "./components/TestingDashboard";
import { NetworkSecurityQuestion } from "./components/NetworkSecurityQuestion";
import { examObjectives } from "./data/questions";
import { networkSecurityData } from "./data/network-security-challenge";
import type { UserProgress } from "./types";

const mockUserProgress: UserProgress = {
  streak: 7,
  totalQuestionsAnswered: 342,
  correctAnswers: 289,
  examsPassed: 2,
  lastActive: new Date(),
};

function App() {
  const [selectedObjective, setSelectedObjective] = useState<string | null>(null);
  const navigate = useNavigate(); // ✅ React Router Navigation Hook

  const handleNavigate = (path: string) => {
    if (path === "/") {
      navigate("/"); // ✅ Ensure correct navigation to home
    } else {
      navigate(`/${path}`); // ✅ Correctly handle other paths
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Routes>
          {/* Home Page */}
          <Route
            path="/"
            element={
              <>
                <DashboardHeader userProgress={mockUserProgress} onNavigate={handleNavigate} />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {examObjectives.map((objective) => (
                    <ObjectiveCard key={objective.id} objective={objective} onClick={() => setSelectedObjective(objective.id)} />
                  ))}
                </div>
              </>
            }
          />

          {/* Network Security Question Page */}
          <Route
            path="/network-security"
            element={
              <>
                <DashboardHeader userProgress={mockUserProgress} onNavigate={handleNavigate} />
                <NetworkSecurityQuestion data={networkSecurityData} />
              </>
            }
          />

          {/* Testing Dashboard (Example Route for Other Challenges) */}
          {examObjectives.map((objective) => (
            <Route key={objective.id} path={`/${objective.id}`} element={<TestingDashboard objectiveId={objective.id} onBack={() => navigate("/")} />} />
          ))}
        </Routes>
      </div>
    </div>
  );
}

export default App;
