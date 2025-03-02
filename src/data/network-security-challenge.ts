import { NetworkSecurityData } from '../types/network-security';

export const networkSecurityData: NetworkSecurityData[] = [
  {
    scenario: {
      title: 'Network Security Challenge: SQL Injection',
      description: `An attacker is attempting to manipulate database queries to gain unauthorized access or extract sensitive data. They are bypassing input validation and injecting malicious SQL commands to compromise the system.`
    },
    tips: {
      'SQL Injection': 'The attacker tries to manipulate database queries to gain unauthorized access or extract sensitive data. Consider using a WAF to filter and block malicious queries.'
    },
    securityMeasures: [
      'Input Validation',
      'Code Review',
      'WAF (Web Application Firewall)',
      'URL Filtering',
      'Record Level Access Control'
    ],
    attackTypes: ['SQL Injection', 'Cross-Site Scripting'],
    correctAnswers: {
      'database-1': ['WAF (Web Application Firewall)', 'Input Validation'],
      'database-2': ['Record Level Access Control', 'Code Review'],
      explanation: 'Deploy a Web Application Firewall (WAF) to filter and block malicious SQL queries before they reach the database.'
    }
  },
  {
    scenario: {
      title: 'Network Security Challenge: Cross-Site Scripting (XSS)',
      description: `An attacker is injecting malicious scripts into a web application, causing those scripts to execute in the browsers of users who visit the site. This allows them to steal session tokens, redirect users, or deface web pages.`
    },
    tips: {
      'Cross-Site Scripting': 'This attack allows an attacker to inject malicious scripts into a web application. Think about how to validate and sanitize user inputs.'
    },
    securityMeasures: [
      'Input Validation',
      'Code Review',
      'WAF (Web Application Firewall)',
      'URL Filtering',
      'Record Level Access Control'
    ],
    attackTypes: ['Cross-Site Scripting', 'SQL Injection'],
    correctAnswers: {
      'webserver-1': ['Input Validation', 'WAF (Web Application Firewall)'],
      'webserver-2': ['Code Review', 'URL Filtering'],
      explanation: 'Apply Input Validation to ensure that user inputs are properly sanitized and do not contain harmful scripts.'
    }
  },
  {
    scenario: {
      title: 'Network Security Challenge: Session Hijacking',
      description: `An attacker is attempting to steal session tokens to impersonate legitimate users and gain unauthorized access to restricted areas of a web application.`
    },
    tips: {
      'Session Hijacking': 'The attacker attempts to steal user session tokens. Think about how access control can prevent unauthorized access even if a session is compromised.'
    },
    securityMeasures: [
      'Input Validation',
      'Code Review',
      'WAF (Web Application Firewall)',
      'URL Filtering',
      'Record Level Access Control',
      'Encryption'
    ],
    attackTypes: ['Session Hijacking', 'Man-in-the-Middle Attack'],
    correctAnswers: {
      'crm-1': ['Record Level Access Control', 'Encryption'],
      'crm-2': ['URL Filtering', 'WAF (Web Application Firewall)'],
      explanation: 'Implement Record Level Access Control, ensuring that even if a session is compromised, unauthorized users cannot access sensitive information.'
    }
  },
  {
    scenario: {
      title: 'Network Security Challenge: Denial of Service (DoS) Attack',
      description: `An attacker is overwhelming the system with excessive requests, making it unavailable to legitimate users.`
    },
    tips: {
      'Denial of Service (DoS) Attack': 'The attacker floods a system with excessive requests, making it unavailable. Think about how to implement rate limiting and firewalls to block malicious traffic.'
    },
    securityMeasures: [
      'Rate Limiting',
      'Input Validation',
      'Code Review',
      'WAF (Web Application Firewall)',
      'Record Level Access Control'
    ],
    attackTypes: ['Denial of Service (DoS) Attack', 'Man-in-the-Middle Attack'],
    correctAnswers: {
      'firewall-1': ['Rate Limiting', 'WAF (Web Application Firewall)'],
      'firewall-2': ['URL Filtering', 'Code Review'],
      explanation: 'Use Rate Limiting to restrict the number of requests per second and deploy a Web Application Firewall (WAF) to filter malicious traffic.'
    }
  },
  {
    scenario: {
      title: 'Network Security Challenge: Phishing Attack',
      description: `An attacker is tricking users into revealing sensitive information through deceptive emails or fake login pages.`
    },
    tips: {
      'Phishing Attack': 'The attacker tricks users into revealing sensitive information through deceptive emails or fake login pages. Consider user awareness training and email filtering.'
    },
    securityMeasures: [
      'User Awareness Training',
      'URL Filtering',
      'WAF (Web Application Firewall)',
      'Record Level Access Control'
    ],
    attackTypes: ['Phishing Attack', 'Zero-Day Exploit'],
    correctAnswers: {
      'email-server-1': ['User Awareness Training', 'URL Filtering'],
      'email-server-2': ['WAF (Web Application Firewall)', 'Record Level Access Control'],
      explanation: 'Implement User Awareness Training to help employees recognize phishing attempts and deploy URL Filtering to block malicious links.'
    }
  },
  {
    scenario: {
      title: 'Network Security Challenge: Zero-Day Exploit',
      description: `An attacker is exploiting an unknown vulnerability before a patch is available.`
    },
    tips: {
      'Zero-Day Exploit': 'The attacker exploits an unknown vulnerability before a patch is available. Consider proactive security monitoring and system updates.'
    },
    securityMeasures: [
      'Patch Management',
      'Code Review',
      'WAF (Web Application Firewall)',
      'Encryption'
    ],
    attackTypes: ['Zero-Day Exploit', 'Phishing Attack'],
    correctAnswers: {
      'system-1': ['Patch Management', 'Code Review'],
      'system-2': ['WAF (Web Application Firewall)', 'Encryption'],
      explanation: 'Implement Patch Management to ensure software is updated quickly and conduct Code Reviews to identify potential weaknesses before they are exploited.'
    }
  }
];
