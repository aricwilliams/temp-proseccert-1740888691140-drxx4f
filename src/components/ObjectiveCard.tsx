import React from 'react';
import { ArrowRight, Shield, Network, Lock, AlertTriangle, Database, Code } from 'lucide-react';
import type { ExamObjective } from '../types';

const iconMap = {
  Shield,
  Network,
  Lock,
  AlertTriangle,
  Database,
  Code
};

interface ObjectiveCardProps {
  objective: ExamObjective;
  onClick: (id: string) => void;
}

export function ObjectiveCard({ objective, onClick }: ObjectiveCardProps) {
  const Icon = iconMap[objective.icon as keyof typeof iconMap];
  
  return (
    <div 
      className="bg-gray-800 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow cursor-pointer border border-gray-700"
      onClick={() => onClick(objective.id)}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="p-3 bg-indigo-900/50 rounded-lg">
          <Icon className="w-6 h-6 text-indigo-400" />
        </div>
        <div className="text-right">
          <span className="text-sm text-gray-400">Progress</span>
          <div className="text-lg font-bold text-indigo-400">
            {objective.progress}%
          </div>
        </div>
      </div>
      
      <h3 className="text-lg font-semibold text-white mb-2">{objective.title}</h3>
      <p className="text-gray-400 text-sm mb-4">{objective.description}</p>
      
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-400">
          {objective.completedQuestions} / {objective.totalQuestions} questions
        </div>
        <ArrowRight className="w-5 h-5 text-indigo-400" />
      </div>
      
      <div className="mt-4 w-full bg-gray-700 rounded-full h-2">
        <div 
          style={{ width: `${objective.progress}%` }}
        />
      </div>
    </div>
  );
}