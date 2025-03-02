import type { Question } from '../../types';

export const questionSets: Record<string, Question[]> = {
  '1': [
    {
      id: '1-1',
      scenario: 'A company needs to implement security controls that ensure data maintains its accuracy and completeness throughout its lifecycle. Which part of the CIA triad addresses this requirement?',
      choices: [
        'Confidentiality',
        'Integrity',
        'Availability',
        'Authentication'
      ],
      correctAnswer: 1,
      explanation: 'Integrity, part of the CIA triad, ensures that data remains accurate and unaltered throughout its lifecycle. This is achieved through controls like hashing, digital signatures, and checksums.'
    },
    {
      id: '1-2',
      scenario: 'An organization is implementing a defense-in-depth strategy. Which of the following combinations BEST represents this approach?',
      choices: [
        'Firewalls and antivirus only',
        'Encryption and access controls only',
        'Firewalls, IDS, encryption, access controls, and security awareness training',
        'Physical security and logical security only'
      ],
      correctAnswer: 2,
      explanation: 'Defense-in-depth requires multiple layers of security controls. The combination of firewalls, IDS, encryption, access controls, and security awareness training provides comprehensive protection across different security layers.'
    }
  ],
  '2': [
    {
      id: '2-1',
      scenario: 'A network administrator notices unusual outbound traffic patterns during non-business hours. Which security tool would BEST help identify the content of this traffic?',
      choices: [
        'Firewall logs',
        'Packet analyzer',
        'Port scanner',
        'Protocol analyzer'
      ],
      correctAnswer: 1,
      explanation: 'A packet analyzer (like Wireshark) is the best tool for examining the content of network traffic. It allows detailed inspection of packets to identify potential data exfiltration or malicious activity.'
    },
    {
      id: '2-2',
      scenario: 'Which wireless security protocol is considered the most secure for enterprise networks?',
      choices: [
        'WEP',
        'WPA',
        'WPA2',
        'WPA3'
      ],
      correctAnswer: 3,
      explanation: 'WPA3 is the latest and most secure wireless security protocol. It provides enhanced authentication and stronger encryption compared to its predecessors, making it the best choice for enterprise networks.'
    }
  ],
  '3': [
    {
      id: '3-1',
      scenario: 'Which access control model is BEST suited for a military environment where information classification levels must be strictly enforced?',
      choices: [
        'Discretionary Access Control (DAC)',
        'Role-Based Access Control (RBAC)',
        'Mandatory Access Control (MAC)',
        'Rule-Based Access Control'
      ],
      correctAnswer: 2,
      explanation: 'Mandatory Access Control (MAC) is ideal for military environments as it enforces strict security levels and clearances. It ensures that access to information is based on security classifications and user clearance levels.'
    },
    {
      id: '3-2',
      scenario: 'A company implements multi-factor authentication using a password and a fingerprint scanner. This is an example of authentication using:',
      choices: [
        'Something you know and something you have',
        'Something you know and something you are',
        'Something you have and something you are',
        'Two things you know'
      ],
      correctAnswer: 1,
      explanation: 'This is an example of using something you know (password) and something you are (fingerprint biometric). This combination provides stronger security than single-factor authentication.'
    }
  ],
  '4': [
    {
      id: '4-1',
      scenario: 'Which type of attack involves sending a large number of ICMP echo requests with a spoofed source address to cause network congestion?',
      choices: [
        'Man-in-the-middle attack',
        'Smurf attack',
        'SQL injection',
        'Cross-site scripting'
      ],
      correctAnswer: 1,
      explanation: 'A Smurf attack is a type of DDoS attack that uses ICMP echo requests (pings) with a spoofed source address, causing network devices to respond to the spoofed address and potentially overwhelming the target network.'
    }
  ],
  '5': [
    {
      id: '5-1',
      scenario: 'Which encryption algorithm is considered asymmetric and commonly used for secure key exchange?',
      choices: [
        'AES',
        '3DES',
        'RSA',
        'Blowfish'
      ],
      correctAnswer: 2,
      explanation: 'RSA is an asymmetric encryption algorithm that uses public and private key pairs. It\'s commonly used for secure key exchange and digital signatures in public key infrastructure (PKI).'
    }
  ],
  '6': [
    {
      id: '6-1',
      scenario: 'Which secure coding practice helps prevent SQL injection attacks?',
      choices: [
        'Input validation only',
        'Parameterized queries',
        'Client-side validation',
        'Basic authentication'
      ],
      correctAnswer: 1,
      explanation: 'Parameterized queries are the most effective way to prevent SQL injection attacks. They ensure that user input is treated as data rather than executable code, preventing malicious SQL from being injected into the query.'
    }
  ]
};