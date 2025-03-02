import React from "react";
import { Trophy, Flame, Brain, FileText } from "lucide-react";
import type { UserProgress } from "../types";
import { NetworkSecurityQuestion } from "./NetworkSecurityQuestion";
import { networkSecurityData } from "../data/network-security-challenge";

interface DashboardHeaderProps {
  userProgress: UserProgress;
}

export function DashboardHeader({ userProgress, onNavigate }: DashboardHeaderProps) {
  return (
    <div className="bg-indigo-900 text-white p-6 rounded-lg shadow-lg mb-8 border border-indigo-700">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Welcome back!</h1>
          <p className="text-indigo-300">Continue your Security+ preparation journey</p>
        </div>
        <a
          href="https://assets.ctfassets.net/82ripq7fjls2/6TYWUym0Nudqa8nGEnegjG/0f9b974d3b1837fe85ab8e6553f4d623/CompTIA-Security-Plus-SY0-701-Exam-Objectives.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 bg-indigo-700 hover:bg-indigo-600 rounded-lg transition-colors"
        >
          <FileText className="w-5 h-5" />
          <span>View Exam Objectives</span>
        </a>
        <button onClick={() => onNavigate("/")} className="flex items-center gap-2 px-4 py-2 bg-indigo-700 hover:bg-indigo-600 rounded-lg transition-colors">
          <FileText className="w-5 h-5" />
          <span>Home</span>
        </button>
        <div className="flex gap-6">
          <button
            onClick={() => onNavigate("network-security")} // Navigate to network security screen
            className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-500 rounded-lg transition-colors"
          >
            <span>Start Network Security Challenge</span>
          </button>
          {/* <div className="flex items-center gap-2">
            <Flame className="w-6 h-6 text-yellow-300" />
            <div>
              <p className="text-sm text-indigo-300">Streak</p>
              <p className="text-xl font-bold">{userProgress.streak} days</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Trophy className="w-6 h-6 text-yellow-300" />
            <div>
              <p className="text-sm text-indigo-300">Exams Passed</p>
              <p className="text-xl font-bold">{userProgress.examsPassed}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Brain className="w-6 h-6 text-yellow-300" />
            <div>
              <p className="text-sm text-indigo-300">Questions</p>
              <p className="text-xl font-bold">{userProgress.totalQuestionsAnswered}</p>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}
