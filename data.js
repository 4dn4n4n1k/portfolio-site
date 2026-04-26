
export const profile = {
    name: "Adnan Anik",
    role: "Security Researcher & Developer",
    tagline: "Securing the Digital Frontier",
    about: "I bridge the gap between offensive security and robust engineering, creating systems that are secure by design.",
    bio: [
        "I started learning cybersecurity out of curiosity about how websites and systems can break. That curiosity has grown into a strong interest in finding vulnerabilities, understanding how attacks work, and learning how to secure applications properly.",
        "Recently, I’ve started exploring cloud technologies and learning how modern applications are built and secured in cloud environments. My goal is to grow into a cloud security-focused role, combining offensive security knowledge with secure system design.",
    ],
    stats: [
        { label: "Vulnerabilities Patched", value: "40+" },
        { label: "CTF Competitions", value: "15+" },
        { label: "Years Experience", value: "3+" },
        { label: "Security Tools", value: "12+" }
    ],
    location: "Dhaka, Bangladesh",
    email: "adnananik301@gmail.com",
    social: {
        Github: "https://github.com/4dn4n4n1k",
        LinkedIn: "https://www.linkedin.com/in/adnananik/",
        Facebook: "https://facebook.com",
        X: "https://x.com/adnananikTwT",
        Gmail: "mailto:adnananik301@gmail.com",
        Blog: "#"
    }
};

export const projects = [
    {
        title: "Vulnerability Intelligence Platform",
        description: "Built a comprehensive backend platform for automated web attack surface discovery,<br>vulnerability detection with CVSS scoring, remediation lifecycle tracking,<br>and executive-grade security reporting with insights.",
        tags: ["FastAPI", "PostgreSQL", "CVSS", "Vulnerability Management", "Security Reporting"],
        link: "https://github.com/4dn4n4n1k/Vulnerability-Intelligence-platform",
        image: "/images/vuln.png"
    },
    {
        title: "Dark Market Simulator: Web Exploitation Lab",
        description: "A deliberately vulnerable web application designed to simulate a darknet-style marketplace, allowing hands-on practice of real-world web exploitation techniques such as SQL injection, cross-site scripting (XSS), and authentication bypass within a controlled and ethical environment.",
        tags: ["Web Application Security", "Vulnerability", "Ethical Hacking", "OWASP"],
        link: "https://github.com/4dn4n4n1k/darkmarket-vuln-lab",
        image: "/images/darkmarket.png"
    },
    {
        title: "Zero-Trust Network Design",
        description: "Architected enterprise-grade zero-trust network infrastructure for distributed cloud<br>environments with micro-segmentation and verification.",
        tags: ["Network Security", "Architecture", "Zero Trust"],
        link: "#",
        image: "https://placehold.co/600x400/1e293b/3b82f6?text=Network+Schema"
    }
];

export const skills = [
    { name: "Python", level: 90 },
    { name: "JavaScript", level: 85 },
    { name: "SQL", level: 85 },
    { name: "Linux", level: 80 },
    { name: "Networking (TCP/IP)", level: 75 },
    { name: "Packet Analysis", level: 70 },
    { name: "DVWA", level: 75 },
    { name: "OSINT", level: 65 },
    { name: "OWASP Top 10", level: 80 },
    { name: "Cloud", level: 75 },
    { name: "AWS", level: 70 },
    { name: "Nginx", level: 70 },
    { name: "Docker", level: 75 },
];


export const certifications = [
    {
        title: "AWS Certified Cloud Practitioner",
        issuer: "Amazon Web Services",
        image: "/certificates/AWS Cloud Practitioner.webp"
    },
    {
        title: "Ethical Hacking Essentials",
        issuer: "EC-Council",
        image: "/certificates/EC Council_Ethical Hacking Essentials.webp"
    },
    {
        title: "Open Source Intelligence",
        issuer: "EC-Council",
        image: "/certificates/EC Council OSINT.webp"
    },
    {
        title: "Web Application Hacking",
        issuer: "Cybrary",
        image: "/certificates/CYBRARY_WEBHacking.webp"
    },
    {
        title: "Wireless Network Hacking",
        issuer: "Cybrary",
        image: "/certificates/CYBRARY_WirelessHacking.webp"
    },
    {
        title: "System Hacking Phases and Attck Techniques",
        issuer: "Cybrary",
        image: "/certificates/Cybrary_Systemhacking.webp"
    },
    {
        title: "Reconnaissance Techniques",
        issuer: "Cybrary",
        image: "/certificates/Cybrary_Recon.webp"
    },
    {
        title: "OSINT",
        issuer: "Cybrary",
        image: "/certificates/Cybrary_OSINT.webp"
    },
    {
        title: "Cybersecurity Consequences",
        issuer: "Cybersecurity and Infrastructure Security Agency",
        image: "/certificates/Cybersecurity Consequences.webp"
    },
    {
        title: "Introduction to Cybersecurity",
        issuer: "Cisco Networking Academy",
        image: "/certificates/CISCO.webp"
    }
];
