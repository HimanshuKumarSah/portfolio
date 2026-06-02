// Portfolio Data & Configuration for Himanshu Kumar Sah

var personalInfo = {
  name: "Himanshu Kumar Sah",
  dob: "2004-05-24", // Extracted from himanshu.sah2004 email context
  role: "Cybersecurity Analyst & Creative Designer",
  company: "Open to Work!",
  uptime: "Active since 2022 (B.Tech CSE - Cyber Security)",
  achievements: [
    "RHCSA Certified Linux Administrator (2026)",
    "Smart India Hackathon (SIH) 2023 National Finalist",
    "Track Lead at Open Source Community, VIT-AP (2024 - 2025)",
    "Stage Technical Coordinator & FOH at TEDxVITAP 2024"
  ],
  skills: {
    technical: ["Python", "Linux", "React.js", "Java"],
    security: ["OPNSense Firewall", "Splunk", "Wazuh SIEM", "Nmap / Wireshark"],
    creative: ["Figma", "Blender-3D", "Adobe After Effects", "Fusion 360"]
  },
  bio: "Creative technology professional specializing in cybersecurity and design. Homelab engineer running OPNsense and Proxmox virtualization alongside Splunk threat logs. Proactive lead coordinator for open source events and TEDx stages.",
  location: "Delhi, India",
  email: "himanshu.sah2004@gmail.com",
  github: "https://github.com/HimanshuKumarSah",
  linkedin: "https://www.linkedin.com/in/himanshu-k-sah/",
  twitter: "https://twitter.com"
};

// Technical Projects for timeline and grid
var techProjects = [
  {
    id: "tech-1",
    title: "AI Sales Call Automator",
    description: "Created enterprise-level automation software for sales calls during internship at MagicBricks. Engineered prompts and system controls for Large Language Models (LLMs) to achieve conversational goals and automate call processing.",
    role: "AI Dev Intern @ MagicBricks",
    tech: ["LLMs", "Prompt Engineering", "Python", "API Integration"],
    image: "assets/sales-calls.png",
    link: "https://github.com/HimanshuKumarSah/Large-Scale-Cold-Calling-Bot"
  },
  {
    id: "tech-2",
    title: "FileMon Encrypted Transfer",
    description: "A cross-platform file transfer utility designed to securely transfer files over local IP connections. Integrates end-to-end encryption via dynamic public-key exchange for private, peer-to-peer sharing.",
    role: "Main Developer",
    tech: ["React.js", "Node.js", "Web Crypto API", "Socket.io"],
    image: "assets/tech-filemon.jpg",
    link: "https://github.com/HimanshuKumarSah/Filemon"
  },
  {
    id: "tech-3",
    title: "Crypto Wallet Finder",
    description: "Developed a Python web scraping tool leveraging BeautifulSoup and Requests to scan, extract, and collect Bitcoin, Ethereum, Solana, and Monero wallet addresses from public web artifacts. Named SIH 2023 National Finalist.",
    role: "Lead Developer",
    tech: ["Python", "BeautifulSoup", "Requests", "Forensics"],
    image: "assets/crypto_wallet_finder.png",
    link: "https://github.com/HimanshuKumarSah/Crypto_Wallet_Finder"
  },
  {
    id: "tech-4",
    title: "Self-hosted Splunk & Wazuh SIEM",
    description: "Deployed Proxmox bare-metal virtualization running OPNSense firewall, forwarding security events and traffic logs to Splunk Enterprise and Wazuh SIEM for unified monitoring, Tailscale VPN links, and an OpenWRT router gateway.",
    role: "SecOps Architect",
    tech: ["OPNSense", "Splunk", "Wazuh SIEM", "Proxmox", "Tailscale"],
    image: "assets/wazuh-system-firewall.png",
    link: "https://drive.google.com/file/d/1RfrXGViRRmFMcUuHBXh1Gz-1k3_ne4P_/view?usp=sharing"
  },
  {
    id: "tech-5",
    title: "Virtual Vulnerability Homelab",
    description: "Built a multi-OS virtual home lab utilizing vulnerable machines to model penetration testing techniques. Executed Metasploit payload builds, backdoors, remote access exploits, and mitigations in AD DS and AD CS environments.",
    role: "Penetration Tester",
    tech: ["Metasploit", "Active Directory", "Ethical Hacking", "Virtualization"],
    image: "assets/tech-homelab.jpg",
    link: "https://www.linkedin.com/posts/himanshu-k-sah_first-personal-virtual-home-lab-completed-activity-7330272272722599941-sfwg?utm_source=share&utm_medium=member_desktop&rcm=ACoAAD5-VJEBFSXUcD8Tpc3rinxo8i1nUnfKCHA"
  }
];

// Creative Projects for timeline and grid
var creativeProjects = [
  {
    id: "creative-1",
    title: "Netts Mobility Brand Identity",
    description: "Created graphic designs, banners, and digital marketing materials as a Graphic Design Intern. Collaborated with marketing and product development teams to research and build visual assets that align with core NETTS goals.",
    role: "Graphic Designer",
    tech: ["Figma", "Adobe Creative Cloud", "UI Design"],
    image: "assets/netts.jpg",
    link: "https://netts.in/"
  },
  {
    id: "creative-2",
    title: "Jeena Girilal Freelance Video Editor",
    description: "Video editor for Jeena Girilal, a Therapist and Counsellor. Edited and produced short-form & long-form content for social media (Instagram & Youtube) using Adobe Suite of Programs and Figma",
    role: "Production Tech Lead",
    tech: ["Stage Logistics", "Sound Engineering", "Adobe CC"],
    image: "assets/jeena.png",
    link: "https://www.linkedin.com/posts/himanshu-k-sah_video-testimonials-are-a-great-way-of-proving-activity-7204477211490287616-BgN8?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAD5-VJEBFSXUcD8Tpc3rinxo8i1nUnfKCHA"
  },
  {
    id: "creative-3",
    title: "Open Source Club Visuals",
    description: "Created promotional templates, speaker slide layouts, and printed poster media as Graphic Designer & Track Lead at Open Source Community VIT-AP to boost student participant registrations.",
    role: "Graphic Designer",
    tech: ["Figma", "Digital Illustration", "Brand Asset Management"],
    image: "assets/osc.png",
    link: "https://www.instagram.com/osc.vitap/"
  },
  {
    id: "creative-4",
    title: "TEDx Speaker Trailer Video",
    description: "Edited and animated the official speaker trailers and logo reveal videos for TEDxVITAP using Adobe Premiere Pro and After Effects, managing tight timelines and audio sync.",
    role: "Video Editor & Animator",
    tech: ["Adobe After Effects", "Premiere Pro", "Motion Graphics"],
    image: "assets/tedxtrailer.png",
    link: "https://drive.google.com/drive/folders/1zDQZuGzEPmngxtPHUI2JJhiAgua9ZiqW?usp=sharing"
  },
  {
    id: "creative-6",
    title: "TEDxVITAP Production Assets",
    description: "Served as Stage Technical Coordinator, managing Sound Equipment configurations, setups, and real-time FOH logistics under tight timelines. Co-designed promotional print assets and digital presentation media for 500+ attendees.",
    role: "Production Tech Lead",
    tech: ["Stage Logistics", "Sound Engineering", "Adobe CC"],
    image: "assets/tedx2.jpg",
    link: "https://www.linkedin.com/posts/himanshu-k-sah_finally-its-done-tedxvitap-2024-is-over-activity-7191356865761480704-g3cT?utm_source=share&utm_medium=member_desktop&rcm=ACoAAD5-VJEBFSXUcD8Tpc3rinxo8i1nUnfKCHA"
  }
];

// ASCII TCP Handshake animation frames
var handshakeFrames = [
  // Frame 1: CLOSED / LISTEN (Idle)
  `
  [CLIENT:54321]                 [SERVER:80]
  State: CLOSED                  State: LISTEN
        |                             |
        |                             |
        |                             |
        |                             |
        |                             |
        |                             |
  `,
  // Frame 2: Client sends SYN
  `
  [CLIENT:54321]                 [SERVER:80]
  State: SYN_SENT                State: LISTEN
        |                             |
        |-- [SYN] Seq=100 ----------->|
        |                             |
        |                             |
        |                             |
        |                             |
  `,
  // Frame 3: SYN received at Server
  `
  [CLIENT:54321]                 [SERVER:80]
  State: SYN_SENT                State: SYN_RCVD
        |                             |
        |-------------------> [SYN]   |
        |                             |
        |                             |
        |                             |
        |                             |
  `,
  // Frame 4: Server sends SYN-ACK back
  `
  [CLIENT:54321]                 [SERVER:80]
  State: SYN_SENT                State: SYN_RCVD
        |                             |
        |                             |
        |<-- [SYN,ACK] Seq=500 Ack=101|
        |                             |
        |                             |
        |                             |
  `,
  // Frame 5: SYN-ACK received at Client, Client sends ACK
  `
  [CLIENT:54321]                 [SERVER:80]
  State: ESTABLISHED             State: SYN_RCVD
        |                             |
        |                             |
        |   [SYN,ACK] <---------------|
        |-- [ACK] Seq=101 Ack=501 --->|
        |                             |
        |                             |
  `,
  // Frame 6: ACK received at Server
  `
  [CLIENT:54321]                 [SERVER:80]
  State: ESTABLISHED             State: ESTABLISHED
        |                             |
        |                             |
        |                             |
        |-------------------> [ACK]   |
        |                             |
        |                             |
  `,
  // Frame 7: Connection established
  `
  [CLIENT:54321]                 [SERVER:80]
  State: ESTABLISHED             State: ESTABLISHED
        |                             |
        |                             |
        |                             |
        |                             |
     +-----------------------------------+
     |      TCP HANDSHAKE COMPLETE       |
     |      CONNECTION ESTABLISHED       |
       |   Github, LinkedIn Initialized    |  
     +-----------------------------------+
  `
];

// Expose variables globally
window.personalInfo = personalInfo;
window.techProjects = techProjects;
window.creativeProjects = creativeProjects;
window.handshakeFrames = handshakeFrames;
