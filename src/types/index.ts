export interface ExamObjective {
  id: string;
  title: string;
  description: string;
  progress: number;
  totalQuestions: number;
  completedQuestions: number;
  icon: string;
}

export interface UserProgress {
  streak: number;
  totalQuestionsAnswered: number;
  correctAnswers: number;
  examsPassed: number;
  lastActive: Date;
}

export interface UserStats {
  weakestAreas: string[];
  strongestAreas: string[];
  averageScore: number;
  timeSpent: number;
}