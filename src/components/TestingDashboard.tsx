import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle, XCircle } from 'lucide-react';
import { Question } from '../types';
import { questionSets } from '../data/questions';

interface TestingDashboardProps {
  objectiveId: string;
  onBack: () => void;
}

export function TestingDashboard({ objectiveId, onBack }: TestingDashboardProps) {
  const [state, setState] = useState({
    currentQuestionIndex: 0,
    selectedAnswer: null as number | null,
    showExplanation: false,
    score: 0,
    questionsAnswered: 0
  });

  const currentQuestions = questionSets[objectiveId] || [];
  const currentQuestion = currentQuestions[state.currentQuestionIndex];

  const handleAnswerSelect = (index: number) => {
    if (state.showExplanation) return;
    setState(prev => ({ ...prev, selectedAnswer: index }));
  };

  const handleSubmit = () => {
    if (state.selectedAnswer === null) return;
    
    setState(prev => ({
      ...prev,
      showExplanation: true,
      score: prev.score + (state.selectedAnswer === currentQuestion.correctAnswer ? 1 : 0),
      questionsAnswered: prev.questionsAnswered + 1
    }));
  };

  const handleNext = () => {
    setState(prev => ({
      ...prev,
      currentQuestionIndex: prev.currentQuestionIndex + 1,
      selectedAnswer: null,
      showExplanation: false
    }));
  };

  if (!currentQuestion) {
    return (
      <div className="max-w-4xl mx-auto p-8">
        <div className="bg-gray-800 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Section Complete!</h2>
          <p className="text-gray-300 mb-6">
            You scored {state.score} out of {state.questionsAnswered} questions
          </p>
          <button
            onClick={onBack}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <button
        onClick={onBack}
        className="flex items-center text-indigo-400 hover:text-indigo-300 mb-6"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back to Dashboard
      </button>

      <div className="bg-gray-800 rounded-lg p-8 shadow-lg border border-gray-700">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-white">
            Question {state.currentQuestionIndex + 1} of {currentQuestions.length}
          </h2>
          <div className="text-indigo-400">
            Score: {state.score}/{state.questionsAnswered}
          </div>
        </div>

        <div className="mb-8">
          <p className="text-gray-200 text-lg mb-6">{currentQuestion.scenario}</p>
          
          <div className="space-y-4">
            {currentQuestion.choices.map((choice, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={`w-full text-left p-4 rounded-lg transition-colors ${
                  state.selectedAnswer === index
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                } ${
                  state.showExplanation
                    ? index === currentQuestion.correctAnswer
                      ? 'bg-green-600 hover:bg-green-600'
                      : state.selectedAnswer === index
                      ? 'bg-red-600 hover:bg-red-600'
                      : ''
                    : ''
                }`}
                disabled={state.showExplanation}
              >
                <div className="flex items-center">
                  {state.showExplanation && index === currentQuestion.correctAnswer && (
                    <CheckCircle className="w-5 h-5 mr-2 text-white" />
                  )}
                  {state.showExplanation && state.selectedAnswer === index && index !== currentQuestion.correctAnswer && (
                    <XCircle className="w-5 h-5 mr-2 text-white" />
                  )}
                  {choice}
                </div>
              </button>
            ))}
          </div>
        </div>

        {state.showExplanation ? (
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-white mb-2">Explanation</h3>
            <p className="text-gray-300">{currentQuestion.explanation}</p>
          </div>
        ) : null}

        <div className="flex justify-end">
          {!state.showExplanation && state.selectedAnswer !== null && (
            <button
              onClick={handleSubmit}
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Submit Answer
            </button>
          )}
          {state.showExplanation && state.currentQuestionIndex < currentQuestions.length - 1 && (
            <button
              onClick={handleNext}
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center"
            >
              Next Question
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}