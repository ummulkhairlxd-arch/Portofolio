/* All site content. Edit here; no rebuild needed for content changes. Every number comes from Ummul Khair's CV. */
window.SITE = {
  person: {
    name: "Ummul Khair",
    short: "UK",
    /* the changing line on the left */
    typed: [
      "training people actually finish",
      "programs from real needs analysis",
      "gamified learning products",
      "AI-powered courses, 40% faster",
      "experiential workshops",
      "assessments that show real change"
    ],
    location: "Palopo, Indonesia",
    email: "ummulkhairlxd@gmail.com",
    linkedin: "https://www.linkedin.com/in/ummulkhairs",
    cv: "assets/doc/Ummul-Khair-CV.pdf"
  },

  about: [
    "I design learning that people finish and use. My work runs end to end: a Training Needs Analysis to find the real gap, an instructional design method like ADDIE or SAM to shape the program, and an evaluation plan so we can see what changed.",
    "Since late 2023 I've built bootcamp guidebooks, BNSP-certified curricula, AI-produced courses for blue-collar workers and experiential programs for professionals in Singapore. Today I'm a Learning Experience Design Associate at <b>Alvigor</b>.",
    "I studied education at the <b>Islamic Institute of Palopo</b>. I work in Indonesian, English and Arabic, and I use AI tools to move faster without lowering the quality of the learning."
  ],

  experience: [
    { when: "Aug 2025 – Now", role: "Learning Experience Design Associate", org: "Alvigor Pte. Ltd.", text: "Turn client training needs into experiential programs and learning products for professionals across Singaporean industries.", projects: ["alvigor"] },
    { when: "Jul 2025 – Sep 2025", role: "AI-Powered Course Creator (project)", org: "Pintarnya.com", text: "Built AI-integrated courses for blue-collar workforce training.", projects: ["pintarnya"] },
    { when: "Feb 2025 – May 2025", role: "Product Development Officer", org: "Magau Group (LPK Mentorbox)", text: "Ran needs analysis and designed curricula for BNSP-certified virtual training programs.", projects: ["mentorbox"] },
    { when: "Apr 2024 – Oct 2024", role: "Training Facilitator", org: "Bitlabs Academy", text: "Facilitated virtual cohorts and coached instructors with weekly performance feedback.", projects: ["bitlabs"] },
    { when: "Jan 2024 – Jun 2024", role: "HRD (People / Training Development)", org: "Youth Ranger Indonesia", text: "Ran TNA and built training programs with ADDIE and Kirkpatrick, lifting team performance metrics by 15%.", tags: ["TNA", "ADDIE", "Kirkpatrick", "Facilitation"] },
    { when: "Dec 2023 – Apr 2024", role: "Learning and Development", org: "PT. Karya Kaya Bahagia", text: "Standardized bootcamp content and built the assessment system for Front-end and Digital Marketing bootcamps.", projects: ["kkb"] }
  ],

  /* Programs: case studies. stats[0] is the key number shown on the card */
  projects: [
    {
      id: "alvigor", short: "Alvigor", featured: true, client: "Alvigor Pte. Ltd. · Corporate training, Singapore", when: "2025 – now",
      title: "Experiential learning programs for Singapore professionals",
      summary: "Client needs turned into hands-on programs, facilitator guides and learning aids, with satisfaction tracked after every run.",
      stats: [["90%", "learner satisfaction (NPS / CSAT)"], ["200+", "professionals reached"], ["15+", "learning products, portfolio +30%"]],
      context: "Clients across Singaporean industries needed training that changed how their people work, not slide decks. Each program had to fit the client's goals and be repeatable by other facilitators.",
      built: [
        "Worked with clients and stakeholders to pin down training needs and turn them into targeted learning solutions.",
        "Designed and developed 10+ experiential learning programs with facilitator guides, learner materials and interactive learning aids.",
        "Built 15+ scalable learning products, including gamified activities and assessment toolkits, growing the product portfolio by 30%.",
        "Coordinated logistics and materials, and tracked effectiveness through NPS and CSAT, reaching 90% learner satisfaction."
      ],
      flow: [["Needs", "client & stakeholders"], ["Design", "experiential (Kolb)"], ["Develop", "guides, materials, aids"], ["Deliver", "facilitated sessions"], ["Evaluate", "NPS + CSAT"]],
      stack: ["Experiential learning", "Gamification", "Assessment design", "Facilitator guides", "NPS / CSAT"]
    },
    {
      id: "pintarnya", short: "Pintarnya", featured: true, client: "Pintarnya.com · Workforce training", when: "2025",
      title: "AI-produced courses for blue-collar workers",
      summary: "Technical syllabi turned into short, clear video modules and assessments, built with a multi-AI production workflow.",
      stats: [["95%", "learner completion rate"], ["80+", "AI-integrated videos and assessments"], ["40%", "less production time"]],
      context: "Blue-collar workers needed technical training they could finish on a phone. The syllabi were dense and written for experts, and the course library had to be built quickly.",
      built: [
        "Developed 80+ AI-integrated learning videos and assessments.",
        "Transformed 15+ technical syllabi into accessible learning modules, contributing to a 95% completion rate.",
        "Optimized a multi-AI content production workflow to speed up course development without lowering instructional quality.",
        "Cut content production time by 40% while keeping learner engagement strong."
      ],
      flow: [["Syllabus", "technical source"], ["Restructure", "short modules"], ["Multi-AI production", "script, voice, video"], ["Assessments", "per module"], ["Publish", "mobile-first"]],
      stack: ["AI workflow", "Multi-AI video", "Rapid authoring", "Assessment design", "Microlearning"]
    },
    {
      id: "mentorbox", short: "Mentorbox", featured: true, client: "Magau Group (LPK Mentorbox) · Vocational training", when: "2025",
      title: "BNSP-certified Digital Marketing and Content Creator programs",
      summary: "Needs analysis and end-to-end curricula for virtual programs aligned with Indonesia's national competency standards.",
      stats: [["10+", "curricula on national standards"], ["20", "classes covered by TNA"], ["12+", "subject matter experts"]],
      context: "Mentorbox was launching BNSP-certified virtual programs. The content had to meet national competency standards and still be practical for learners.",
      built: [
        "Ran Training Needs Analysis for 10+ programs across 20 classes.",
        "Designed 10+ end-to-end curricula aligned with national competency standards.",
        "Worked with 12+ subject matter experts to turn complex technical knowledge into accessible workshop content.",
        "Aligned learning products with training objectives and market needs together with internal teams and external stakeholders."
      ],
      flow: [["TNA", "20 classes"], ["Standards", "BNSP competencies"], ["Curriculum", "end to end"], ["SME content", "12+ experts"], ["Virtual delivery", "certified programs"]],
      stack: ["TNA", "Curriculum mapping", "Competency standards", "SME collaboration", "Virtual training"]
    },
    {
      id: "bitlabs", short: "Bitlabs", featured: true, client: "Bitlabs Academy · Edutech", when: "2024",
      title: "Virtual cohorts in Data Analysis and Business Planning",
      summary: "Active-learning facilitation for online cohorts, plus a feedback loop that raised instructor delivery scores.",
      stats: [["4.8/5", "participant rating"], ["4.2 → 4.8", "instructor delivery scores"], ["+30%", "participation"]],
      context: "Online cohorts lose attention fast. The academy needed engaging sessions and a way to help instructors improve week by week.",
      built: [
        "Facilitated virtual training for 100+ participants across 10+ sessions, rated 4.8/5.",
        "Used active learning techniques to keep engagement high on digital platforms.",
        "Tracked weekly performance for 10+ instructors a month and set up feedback loops that raised average delivery scores from 4.2 to 4.8.",
        "Evaluated outcomes for 50+ learners; the changes lifted participation by 30% and comprehension scores by 20%."
      ],
      flow: [["Session", "active learning"], ["Feedback", "learner + instructor"], ["Weekly metrics", "10+ instructors"], ["Coaching", "targeted fixes"], ["Better delivery", "4.2 → 4.8"]],
      stack: ["Virtual facilitation", "Active learning", "Zoom / Google Meet", "Feedback loops", "Kirkpatrick"]
    },
    {
      id: "kkb", short: "Bootcamps", featured: true, client: "PT. Karya Kaya Bahagia · Tech bootcamps", when: "2023 – 2024",
      title: "Bootcamp guidebooks and gamified mission cards",
      summary: "Standardized content for Front-end and Digital Marketing bootcamps, with an assessment system built around gamified missions.",
      stats: [["90%", "program completion"], ["+25%", "student motivation"], ["20+", "self-paced modules"]],
      context: "Bootcamp content varied from class to class and students lost momentum mid-program. The team needed consistent materials and a reason for students to keep going.",
      built: [
        "Standardized technical content for Front-end and Digital Marketing bootcamps with internal guidebooks, raising learner satisfaction by 20% and knowledge retention by 15%.",
        "Designed an assessment system and gamified \"mission cards\", increasing student motivation by 25% and reaching 90% program completion.",
        "Partnered with 4 departments to design 20+ self-paced modules that beat company quality benchmarks by 15%."
      ],
      flow: [["Audit", "existing content"], ["Guidebooks", "standard materials"], ["Mission cards", "gamified tasks"], ["Assessments", "per mission"], ["Completion", "90%"]],
      stack: ["Gamification", "Assessment design", "Self-paced modules", "Content standards", "Bootcamps"]
    }
  ],

  /* Toolkit page */
  toolkit: [
    { t: "Instructional design methods", items: ["ADDIE", "SAM", "Kolb experiential learning", "Kirkpatrick evaluation", "Training / Learning Needs Analysis", "Curriculum mapping", "Pedagogy, andragogy, heutagogy"] },
    { t: "Authoring tools and LMS", items: ["Articulate Storyline", "Articulate Rise", "Adobe Captivate", "iSpring Suite", "Dominknow", "Lectora", "Mindsmith", "We Are Learning", "Moodle", "Canvas"] },
    { t: "AI and content production", items: ["AI workflow optimization", "Multi-AI video production", "Rapid content authoring", "Canva", "Google Workspace", "Microsoft Office"] },
    { t: "Product and delivery", items: ["Learning product strategy", "Market research", "Quality assurance", "Stakeholder management", "Project management", "Virtual facilitation (Zoom, Google Meet)"] }
  ],
  certs: [
    ["Gemini Certified Educator", "Google · 2025"],
    ["Certified AI-Powered Instructional Designer Professional", "Learnworlds · 2025"],
    ["Advancing Skills as an L&D Professional", "LinkedIn Learning · 2024"],
    ["Certified Educator", "ClassPoint · 2024"],
    ["Learning and Development", "HRCI · 2023"]
  ],
  languages: [["Indonesian", "Native"], ["English", "Professional"], ["Arabic", "Advanced"], ["Korean", "Beginner"]],
  education: { school: "Islamic Institute of Palopo", degree: "Bachelor of Education, Minor in Arabic Education" },

  /* Hire me page: what a team gets, each backed by a real result */
  why: [
    { t: "Training that starts from real needs", d: "I begin with a Training Needs Analysis, so the program fixes the actual skill gap, not a guess about it.", proof: "Mentorbox: TNA for 10+ programs across 20 classes" },
    { t: "Learners who finish", d: "Short modules, clear structure and a reason to keep going, so completion isn't left to willpower.", proof: "Pintarnya: 95% completion · Bootcamps: 90%" },
    { t: "Faster production, same quality", d: "A multi-AI workflow for scripts, voice and video, with instructional design checks at every step.", proof: "Pintarnya: 40% less production time, 80+ videos" },
    { t: "Engagement by design", d: "Gamified activities, mission cards and experiential exercises that make people want to take part.", proof: "Bootcamps: +25% student motivation" },
    { t: "Results you can measure", d: "Kirkpatrick-style evaluation, NPS and CSAT, so you see what the training changed.", proof: "Alvigor: 90% learner satisfaction" },
    { t: "Experts turned into clear content", d: "I work with subject matter experts and turn dense technical material into lessons people understand.", proof: "Mentorbox: 12+ SMEs · Pintarnya: 15+ syllabi" }
  ],
  process: [
    ["Analyse the need", "Talk to stakeholders and learners, run a TNA, and agree on what success looks like."],
    ["Design and build", "ADDIE or SAM, prototypes early, and content that's practical, gamified where it helps."],
    ["Deliver and evaluate", "Facilitate or launch on your LMS, then measure reaction, learning and behaviour change."]
  ],
  contact: {
    title: "Let's design learning people finish",
    text: "Tell me who you're training and what has to change: a program to build from scratch, content that needs to be clearer, or a course you want produced faster.",
    where: "Based in Palopo, Indonesia (UTC+8)"
  }
};
