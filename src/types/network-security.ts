export interface SecurityScenario {
  title: string;
  description: string;
}

export interface SecurityTips {
  [key: string]: string;
}

export interface SecurityAnswer {
  [key: string]: string;
  explanation: string;
}

export interface SecurityAnswers {
  [key: string]: SecurityAnswer;
}

export interface NetworkSecurityData {
  scenario: SecurityScenario;
  tips: SecurityTips;
  securityMeasures: string[];
  attackTypes: string[];
  correctAnswers: SecurityAnswers;
}

export interface NetworkSecurityQuestionProps {
  data: NetworkSecurityData[];
}