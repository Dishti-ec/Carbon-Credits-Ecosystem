import { TreePine, Droplets, Wheat, Users, ClipboardCheck, FileText, Award, Calculator, Leaf } from "lucide-react";

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface Chapter {
  id: number;
  title: string;
  intro: string;
  concept: string;
  keyPoints: string[];
  recap: string;
  quizQuestion: QuizQuestion;
}

export interface Course {
  id: number;
  title: string;
  description: string;
  category: string;
  duration: string;
  level: string;
  icon: any;
  progress: number;
  lessons: number;
  learnings: string[];
  chapters: Chapter[];
  finalQuiz: QuizQuestion[];
}

export const farmerCourses: Course[] = [
  {
    id: 1,
    title: "Agroforestry for Carbon Credits",
    description: "Learn how planting high-biomass trees on field boundaries can generate carbon credits and additional income.",
    category: "Agroforestry",
    duration: "4 hours",
    level: "Beginner",
    icon: TreePine,
    progress: 40,
    lessons: 6,
    learnings: [
      "Basics of carbon credits in agriculture",
      "How trees improve soil and land quality",
      "Estimating financial benefits of trees",
      "Digital KYC and onboarding process"
    ],
    chapters: [
      {
        id: 1,
        title: "Introduction to Agroforestry",
        intro: "What is agroforestry and why does it matter?",
        concept: "Agroforestry is a farming method where trees are grown along with crops on the same land. Farmers can plant trees on field boundaries, around farms, or between crops. Trees naturally absorb harmful gases from the air and store them in their structure, contributing to a healthier environment.",
        keyPoints: [
          "Grows trees alongside crops",
          "Improves environment",
          "Absorbs harmful gases"
        ],
        recap: "Trees on farms absorb CO2, improving both the environment and land quality.",
        quizQuestion: {
          question: "Where can farmers plant trees in agroforestry?",
          options: ["Only in forests", "On field boundaries and between crops", "Only in pots", "Never on farms"],
          correctAnswer: 1
        }
      },
      {
        id: 2,
        title: "Improving Soil Fertility",
        intro: "How do trees naturally improve your soil?",
        concept: "Trees play an important role in improving soil quality. Their roots hold the soil together and prevent it from being washed away during rain. Leaves falling from trees decompose and add natural nutrients to the soil. Agroforestry also helps in retaining moisture in the soil, reducing the need for frequent irrigation.",
        keyPoints: [
          "Roots prevent soil erosion",
          "Fallen leaves act as natural fertilizer",
          "Retains soil moisture"
        ],
        recap: "Trees act as natural anchors and fertilizers for your soil.",
        quizQuestion: {
          question: "How do tree roots help the soil?",
          options: ["They make it dry", "They hold it together and prevent washing away", "They remove all nutrients", "They stop crops from growing"],
          correctAnswer: 1
        }
      },
      {
        id: 3,
        title: "Additional Income Opportunities",
        intro: "Agroforestry is a smart financial safety net.",
        concept: "Agroforestry provides farmers with multiple sources of income. In addition to regular crops, farmers can earn from timber, fruits (like mango, guava), fodder for livestock, and other tree products. This reduces financial risk because farmers are not dependent on a single crop.",
        keyPoints: [
          "Sells timber and fruits",
          "Provides livestock fodder",
          "Reduces dependency on a single crop"
        ],
        recap: "Diversifying with trees means diversifying your income.",
        quizQuestion: {
          question: "Why is having multiple income sources beneficial?",
          options: ["It reduces financial risk", "It increases taxes", "It makes farming impossible", "It only helps livestock"],
          correctAnswer: 0
        }
      },
      {
        id: 4,
        title: "Understanding Carbon Credits",
        intro: "Turning green practices into financial rewards.",
        concept: "When farmers grow trees and follow sustainable practices, they can earn rewards in the form of carbon credits. These credits can be sold to companies that want to balance their environmental impact. This creates a new, passive income opportunity.",
        keyPoints: [
          "Sustainable practices earn credits",
          "Credits are sold to companies",
          "Creates passive income"
        ],
        recap: "Carbon credits reward you financially for helping the environment.",
        quizQuestion: {
          question: "Who typically buys carbon credits from farmers?",
          options: ["Other farmers", "Companies offsetting their impact", "Banks", "Local supermarkets"],
          correctAnswer: 1
        }
      },
      {
        id: 5,
        title: "Estimating Benefits from Trees",
        intro: "How to track the value of your agroforestry efforts.",
        concept: "Farmers can estimate the benefits of trees by observing their number, size, and growth over time. Larger and healthier trees provide more value. Digital tools and support from field experts can help farmers track these benefits accurately.",
        keyPoints: [
          "Count and measure tree growth",
          "Observe soil and crop improvements",
          "Use digital tools for accuracy"
        ],
        recap: "Bigger, healthier trees mean higher environmental and financial value.",
        quizQuestion: {
          question: "Which of these provides more value in carbon farming?",
          options: ["Small, dying trees", "Large, healthy trees", "Only crops", "Empty fields"],
          correctAnswer: 1
        }
      },
      {
        id: 6,
        title: "Registration & Participation",
        intro: "How to officially join the carbon market.",
        concept: "To take part in such programs, farmers need to complete a simple registration process: Provide basic personal details, submit land-related information, verify identity using official documents, and link a bank account for receiving payments.",
        keyPoints: [
          "Submit land details",
          "Verify identity officially",
          "Link bank account for payments"
        ],
        recap: "A simple registration connects your farm to global carbon markets.",
        quizQuestion: {
          question: "What is required to receive carbon credit payments?",
          options: ["Cash only", "Linking a verified bank account", "Selling land", "Buying a tractor"],
          correctAnswer: 1
        }
      }
    ],
    finalQuiz: [
      { question: "What is agroforestry?", options: ["Growing only crops", "Growing trees along with crops", "Raising animals only", "Using only machines"], correctAnswer: 1 },
      { question: "How do trees help the soil?", options: ["Make soil dry", "Remove nutrients", "Improve soil quality", "Stop crop growth"], correctAnswer: 2 },
      { question: "Which of the following can provide extra income in agroforestry?", options: ["Plastic", "Timber and fruits", "Stones", "Chemicals"], correctAnswer: 1 },
      { question: "Why is agroforestry useful for farmers?", options: ["Reduces income", "Increases risk", "Provides multiple income sources", "Stops farming"], correctAnswer: 2 },
      { question: "What should farmers observe to understand tree benefits?", options: ["Tree color only", "Tree number and growth", "Weather only", "Market price only"], correctAnswer: 1 },
      { question: "What is required to join such programs?", options: ["No information", "Only crops", "Basic details and land information", "Only tools"], correctAnswer: 2 }
    ]
  },
  {
    id: 2,
    title: "Methane Reduction in Rice Paddies",
    description: "Implement Alternate Wetting & Drying (AWD) and Direct Seeded Rice (DSR) techniques.",
    category: "Rice Cultivation",
    duration: "3 hours",
    level: "Intermediate",
    icon: Droplets,
    progress: 0,
    lessons: 5,
    learnings: ["Dangers of traditional flooding", "AWD Techniques", "DSR Techniques", "Maintaining Yields"],
    chapters: [
      {
        id: 1, title: "Rice Farming Challenges", intro: "The problem with traditional rice farming.",
        concept: "Rice farming usually requires large amounts of water. Continuous flooding can create harmful methane gases in the soil. Improving water management helps farmers save resources and reduce emissions.",
        keyPoints: ["Continuous flooding causes methane", "High water usage is inefficient"],
        recap: "Better water management reduces both costs and harmful gases.",
        quizQuestion: { question: "What does continuous flooding in rice fields create?", options: ["Oxygen", "Harmful methane gases", "More land", "Dry soil"], correctAnswer: 1 }
      },
      {
        id: 2, title: "Water Management Techniques", intro: "Introducing AWD and DSR.",
        concept: "Alternate Wetting and Drying (AWD) means fields are not kept flooded all the time; water is added only when needed. Direct Seeded Rice (DSR) means seeds are sown directly into the soil, reducing the need for transplanting and excess water.",
        keyPoints: ["AWD prevents constant flooding", "DSR sows seeds directly"],
        recap: "AWD and DSR drastically cut down water usage.",
        quizQuestion: { question: "What is DSR?", options: ["Planting trees", "Sowing seeds directly in soil", "Flooding fields", "Using machines only"], correctAnswer: 1 }
      },
      {
        id: 3, title: "Cost and Resource Savings", intro: "Financial benefits of AWD.",
        concept: "By using improved methods, water usage is reduced, which decreases electricity or fuel costs for irrigation. Labor costs for transplanting are also lowered, leading to higher overall profits.",
        keyPoints: ["Lower fuel/electricity costs", "Lower labor costs", "Higher profits"],
        recap: "Saving water directly means saving money.",
        quizQuestion: { question: "What is a financial benefit of improved irrigation?", options: ["Higher costs", "Cost reduction", "Crop damage", "More labor needed"], correctAnswer: 1 }
      },
      {
        id: 4, title: "Maintaining Crop Yield", intro: "Will AWD hurt my crops?",
        concept: "Farmers often worry that reducing water may reduce yield. However, proper timing of irrigation maintains crop health, and balanced practices can maintain or even improve yield.",
        keyPoints: ["Proper timing is key", "Yield is maintained or improved"],
        recap: "Less water does not mean less yield if done correctly.",
        quizQuestion: { question: "Does AWD inherently reduce crop yield?", options: ["Yes, always", "No, proper timing maintains health", "Yes, kills crops", "No, it doubles crops instantly"], correctAnswer: 1 }
      },
      {
        id: 5, title: "Record Keeping", intro: "Why track your water?",
        concept: "Farmers are encouraged to keep records of irrigation timing, track water usage, and monitor crop growth to improve farming decisions and prove compliance for carbon credits.",
        keyPoints: ["Track irrigation", "Monitor growth", "Prove compliance"],
        recap: "Good records lead to better decisions and verified credits.",
        quizQuestion: { question: "Why should farmers keep records?", options: ["To sell land", "To stop farming", "To track farming activities", "For decoration"], correctAnswer: 2 }
      }
    ],
    finalQuiz: [
      { question: "What is a common issue in traditional rice farming?", options: ["Less water use", "High water usage", "No soil", "No crops"], correctAnswer: 1 },
      { question: "What does AWD help reduce?", options: ["Crop growth", "Water usage", "Soil quality", "Income"], correctAnswer: 1 },
      { question: "What is Direct Seeded Rice (DSR)?", options: ["Planting trees", "Sowing seeds directly in soil", "Using machines only", "Dry farming"], correctAnswer: 1 },
      { question: "What is a benefit of improved irrigation?", options: ["Higher costs", "Lower savings", "Cost reduction", "Crop damage"], correctAnswer: 2 },
      { question: "Why should farmers keep records?", options: ["For decoration", "To track farming activities", "To sell land", "To stop farming"], correctAnswer: 1 }
    ]
  },
  {
    id: 3,
    title: "Soil Organic Carbon Enhancement",
    description: "Master the use of cover crops, biochar, and organic fertilization.",
    category: "Soil Health",
    duration: "5 hours",
    level: "Beginner",
    icon: Wheat,
    progress: 0,
    lessons: 5,
    learnings: ["Importance of healthy soil", "Natural farming practices", "Reduced Tillage", "Water retention"],
    chapters: [
      {
        id: 1, title: "Importance of Healthy Soil", intro: "The foundation of farming.",
        concept: "Healthy soil is the foundation of good farming. It supports plant growth, holds water, and provides nutrients. Improving soil quality helps increase crop yield and long-term productivity.",
        keyPoints: ["Foundation of farming", "Provides nutrients", "Increases yield"],
        recap: "Healthy soil ensures long-term farming success.",
        quizQuestion: { question: "Why is healthy soil important?", options: ["For decoration", "For plant growth", "For machines", "For roads"], correctAnswer: 1 }
      },
      {
        id: 2, title: "Natural Farming Practices", intro: "How to improve soil naturally.",
        concept: "Farmers can improve soil naturally by using compost and organic manure, growing cover crops, and avoiding excessive chemical use. These methods make soil richer and more productive.",
        keyPoints: ["Use compost/manure", "Grow cover crops", "Avoid chemicals"],
        recap: "Natural inputs create richer, more productive soil.",
        quizQuestion: { question: "Which method improves soil naturally?", options: ["Plastic use", "Composting", "Burning soil", "Removing crops"], correctAnswer: 1 }
      },
      {
        id: 3, title: "Reduced Tillage", intro: "Why you should plow less.",
        concept: "Reduced tillage means minimizing plowing and avoiding frequent soil disturbance. This helps maintain soil structure, prevents erosion, and keeps nutrients intact.",
        keyPoints: ["Minimize plowing", "Maintain soil structure", "Keep nutrients intact"],
        recap: "Leaving the soil undisturbed preserves its strength and nutrients.",
        quizQuestion: { question: "What is reduced tillage?", options: ["More plowing", "Less soil disturbance", "No farming", "Flooding"], correctAnswer: 1 }
      },
      {
        id: 4, title: "Water Retention", intro: "Holding water in the soil.",
        concept: "Healthy, undisturbed soil holds more water, reduces irrigation needs, and prevents soil erosion. This is especially helpful during dry seasons.",
        keyPoints: ["Holds more water", "Reduces irrigation", "Prevents erosion"],
        recap: "Good soil acts like a sponge for water.",
        quizQuestion: { question: "What does healthy soil prevent?", options: ["Rain", "Soil erosion", "Sunshine", "Plant growth"], correctAnswer: 1 }
      },
      {
        id: 5, title: "Long-Term Farm Benefits", intro: "Sustainable farming for the future.",
        concept: "Improved soil leads to better crop quality, stable yields over time, and reduced farming costs. It supports sustainable farming for future generations.",
        keyPoints: ["Better quality", "Stable yields", "Reduced costs"],
        recap: "Soil carbon enhancement is a long-term investment in your farm.",
        quizQuestion: { question: "What is a long-term benefit of soil health?", options: ["Soil loss", "Better productivity", "Higher cost", "Less growth"], correctAnswer: 1 }
      }
    ],
    finalQuiz: [
      { question: "Why is healthy soil important?", options: ["For decoration", "For plant growth", "For machines", "For roads"], correctAnswer: 1 },
      { question: "Which method improves soil naturally?", options: ["Plastic use", "Composting", "Burning soil", "Removing crops"], correctAnswer: 1 },
      { question: "What is reduced tillage?", options: ["More plowing", "Less soil disturbance", "No farming", "Flooding"], correctAnswer: 1 },
      { question: "What does healthy soil improve?", options: ["Pollution", "Crop yield", "Waste", "Damage"], correctAnswer: 1 },
      { question: "What is a long-term benefit?", options: ["Soil loss", "Better productivity", "Higher cost", "Less growth"], correctAnswer: 1 }
    ]
  },
  {
    id: 4,
    title: "Understanding FPOs & Carbon Markets",
    description: "How Farmer Producer Organizations help smallholders access carbon markets.",
    category: "Market Access",
    duration: "2 hours",
    level: "Beginner",
    icon: Users,
    progress: 0,
    lessons: 5,
    learnings: ["What are FPOs", "Benefits of aggregation", "Market access mechanics", "Carbon markets overview"],
    chapters: [
      {
        id: 1, title: "What are FPOs?", intro: "Strength in numbers.",
        concept: "Farmer Producer Organizations (FPOs) are groups of farmers who come together to work collectively. They help farmers share resources, reduce costs, and improve income.",
        keyPoints: ["Groups of farmers", "Share resources", "Reduce costs"],
        recap: "FPOs unite farmers to achieve things they couldn't alone.",
        quizQuestion: { question: "What is an FPO?", options: ["A machine", "A group of farmers", "A crop", "A tool"], correctAnswer: 1 }
      },
      {
        id: 2, title: "Benefits of Working in Groups", intro: "Why join an FPO?",
        concept: "By joining FPOs, farmers can sell products in bulk, get better prices, and reduce individual risks. Group efforts are vastly stronger than individual efforts in the market.",
        keyPoints: ["Sell in bulk", "Better prices", "Reduce risks"],
        recap: "Collective bargaining power guarantees better market outcomes.",
        quizQuestion: { question: "What is the benefit of FPOs?", options: ["Lower income", "Better prices", "More risk", "Less support"], correctAnswer: 1 }
      },
      {
        id: 3, title: "Market Access", intro: "Connecting to bigger buyers.",
        concept: "FPOs help farmers connect with larger corporate buyers, access premium markets, and drastically reduce dependency on local middlemen who take large cuts.",
        keyPoints: ["Connect with large buyers", "Access premium markets", "Bypass middlemen"],
        recap: "FPOs eliminate the middleman and maximize your profits.",
        quizQuestion: { question: "What do FPOs improve?", options: ["Market access", "Soil damage", "Water waste", "Pollution"], correctAnswer: 0 }
      },
      {
        id: 4, title: "Intro to Carbon Markets", intro: "Selling environmental benefits.",
        concept: "Farmers can earn extra income by adopting better farming practices. These practices generate carbon credits, which are valued in special markets where environmental benefits are financially rewarded.",
        keyPoints: ["Earn extra income", "Generate credits", "Environmental rewards"],
        recap: "Carbon markets pay you for farming sustainably.",
        quizQuestion: { question: "What do carbon markets reward?", options: ["Pesticide use", "Environmental benefits", "Burning crops", "Wasting water"], correctAnswer: 1 }
      },
      {
        id: 5, title: "Collective Participation", intro: "Why FPOs are essential for carbon.",
        concept: "Small farmers may not be able to participate individually in global carbon markets due to high auditing costs. Through FPOs, farmers combine their land and efforts, making participation easier and sharing benefits equally.",
        keyPoints: ["Combines land", "Lowers audit costs", "Shares benefits"],
        recap: "FPOs make carbon trading accessible to small-scale farmers.",
        quizQuestion: { question: "Why is group participation useful for carbon markets?", options: ["Harder work", "Easier access to opportunities", "No benefit", "Less income"], correctAnswer: 1 }
      }
    ],
    finalQuiz: [
      { question: "What is an FPO?", options: ["A machine", "A group of farmers", "A crop", "A tool"], correctAnswer: 1 },
      { question: "What is the benefit of FPOs?", options: ["Lower income", "Better prices", "More risk", "Less support"], correctAnswer: 1 },
      { question: "Why do farmers work in groups?", options: ["To reduce benefits", "To increase strength", "To stop farming", "To waste time"], correctAnswer: 1 },
      { question: "What do FPOs improve?", options: ["Market access", "Soil damage", "Water waste", "Pollution"], correctAnswer: 0 },
      { question: "Why is group participation useful?", options: ["Harder work", "Easier access to opportunities", "No benefit", "Less income"], correctAnswer: 1 }
    ]
  },
  {
    id: 5,
    title: "Digital KYC & Onboarding Guide",
    description: "Step-by-step guide for Aadhaar verification and mobile payments.",
    category: "Digital Tools",
    duration: "1.5 hours",
    level: "Beginner",
    icon: ClipboardCheck,
    progress: 0,
    lessons: 5,
    learnings: ["Digital registration", "Identity verification", "Land submission", "Bank linking"],
    chapters: [
      {
        id: 1, title: "Intro to Digital Registration", intro: "Joining platforms from your phone.",
        concept: "Digital registration allows farmers to join platforms easily using mobile phones. It helps in accessing services instantly without visiting government or corporate offices.",
        keyPoints: ["Use mobile phones", "No office visits", "Instant access"],
        recap: "Digital registration brings the platform to your fingertips.",
        quizQuestion: { question: "What is digital registration?", options: ["Paper work only", "Online registration", "No process", "Manual work"], correctAnswer: 1 }
      },
      {
        id: 2, title: "Identity Verification", intro: "Proving who you are securely.",
        concept: "Farmers need to provide basic personal details and verify identity using Aadhaar or other official documents. This ensures secure participation and prevents fraud.",
        keyPoints: ["Provide basic details", "Use Aadhaar", "Ensures security"],
        recap: "Identity verification protects your account and payments.",
        quizQuestion: { question: "Why is identity verification needed?", options: ["For security", "For delay", "For cost", "For rejection"], correctAnswer: 0 }
      },
      {
        id: 3, title: "Land Information Submission", intro: "Linking your farm to your account.",
        concept: "Farmers must submit land ownership details or lease information, alongside farm location details. This helps accurately link farmers to their specific land activities and calculate eligible credits.",
        keyPoints: ["Submit ownership details", "Provide location", "Calculates eligible credits"],
        recap: "Your land data is the basis for your carbon credit generation.",
        quizQuestion: { question: "What details are required?", options: ["Only name", "Land and personal details", "No details", "Only crops"], correctAnswer: 1 }
      },
      {
        id: 4, title: "Mobile and Bank Linking", intro: "How you get paid.",
        concept: "Mobile numbers are linked for constant communication and verification. Bank accounts are linked securely for receiving carbon credit payments directly without any middlemen.",
        keyPoints: ["Link mobile for communication", "Link bank for direct payments", "Bypass middlemen"],
        recap: "Linking your bank account ensures safe, direct payouts.",
        quizQuestion: { question: "Why link a bank account?", options: ["For loans only", "To receive payments", "For farming", "For storage"], correctAnswer: 1 }
      },
      {
        id: 5, title: "Secure Access and Benefits", intro: "What happens after onboarding?",
        concept: "After onboarding, farmers can access all training and services, receive payments directly into their accounts, and track their daily farming activities easily via the dashboard.",
        keyPoints: ["Access training", "Receive direct payments", "Track activities"],
        recap: "Onboarding unlocks the full potential of the carbon market platform.",
        quizQuestion: { question: "What is the benefit of onboarding?", options: ["No access", "Access to services", "More problems", "No income"], correctAnswer: 1 }
      }
    ],
    finalQuiz: [
      { question: "What is digital registration?", options: ["Paper work only", "Online registration", "No process", "Manual work"], correctAnswer: 1 },
      { question: "Why is identity verification needed?", options: ["For security", "For delay", "For cost", "For rejection"], correctAnswer: 0 },
      { question: "What details are required?", options: ["Only name", "Land and personal details", "No details", "Only crops"], correctAnswer: 1 },
      { question: "Why link a bank account?", options: ["For loans only", "To receive payments", "For farming", "For storage"], correctAnswer: 1 },
      { question: "What is the benefit of onboarding?", options: ["No access", "Access to services", "More problems", "No income"], correctAnswer: 1 }
    ]
  }
];

export const corporateCourses: Course[] = [
  {
    id: 6,
    title: "CCTS Compliance Framework",
    description: "Complete guide to the Carbon Credit Trading Scheme and regulatory requirements.",
    category: "Compliance",
    duration: "6 hours",
    level: "Advanced",
    icon: FileText,
    progress: 0,
    lessons: 5,
    learnings: [
      "Overview of CCTS system",
      "Understanding emission caps",
      "Industry-wise compliance requirements",
      "Penalty structure for non-compliance"
    ],
    chapters: [
      {
        id: 1, title: "Introduction to CCTS", intro: "What is the Carbon Credit Trading Scheme?",
        concept: "The CCTS Compliance Framework helps companies manage and reduce carbon emissions aligned with government regulations. Industries are assigned specific emission limits based on sector, size, and operational capacity.",
        keyPoints: ["Managed emission reduction", "Assigned limits based on sector", "Gradual reduction of national emissions"],
        recap: "CCTS assigns mandatory limits to drive systematic emission reduction.",
        quizQuestion: { question: "What determines a company's emission limit under CCTS?", options: ["Random assignment", "Sector, size, and capacity", "Employee count", "Profit margin"], correctAnswer: 1 }
      },
      {
        id: 2, title: "Rewards and Penalties", intro: "How the compliance incentives work.",
        concept: "If a company keeps its emissions below the assigned limit, it is rewarded with carbon credits. If it exceeds the limit, it must purchase credits from others, creating a financial incentive to reduce pollution.",
        keyPoints: ["Reward for staying below limit", "Must buy credits if exceeding limit", "Financial incentive to reduce pollution"],
        recap: "The system financially rewards low emitters and penalizes high emitters.",
        quizQuestion: { question: "What happens if a company exceeds its emission limit?", options: ["It gets rewarded", "It must purchase credits", "Nothing", "It receives free credits"], correctAnswer: 1 }
      },
      {
        id: 3, title: "The Compliance Lifecycle", intro: "Step-by-step compliance.",
        concept: "The compliance lifecycle involves Registration, Monitoring, Reporting, and Trading. Regular submission of emission data ensures transparency, and regulatory authorities track company performance across this cycle.",
        keyPoints: ["Registration & Monitoring", "Reporting & Verification", "Trading credits"],
        recap: "Compliance is a continuous cycle of tracking, reporting, and trading.",
        quizQuestion: { question: "Which of the following is part of the compliance lifecycle?", options: ["Ignoring data", "Registration and Monitoring", "Avoiding reports", "Deleting records"], correctAnswer: 1 }
      },
      {
        id: 4, title: "Business Advantage", intro: "Turning compliance into profit.",
        concept: "This framework transforms environmental responsibility into a business activity. Compliance becomes an opportunity for innovation, efficiency, and profitability, building trust among investors and stakeholders.",
        keyPoints: ["Opportunity for innovation", "Builds stakeholder trust", "Converts compliance to advantage"],
        recap: "Compliance isn't just a burden; it's a strategic business advantage.",
        quizQuestion: { question: "How should modern corporates view compliance?", options: ["As a pure burden", "As an opportunity for innovation", "As something to avoid", "As irrelevant"], correctAnswer: 1 }
      },
      {
        id: 5, title: "Legal Obligations", intro: "Documentation and regulations.",
        concept: "Companies must adhere to mandatory reporting to ensure transparency. Failure to comply results in a strict penalty structure. It's crucial to understand the role of government bodies in enforcing these rules.",
        keyPoints: ["Mandatory reporting", "Strict penalties for failure", "Government enforcement"],
        recap: "Legal obligations are strictly enforced to ensure market integrity.",
        quizQuestion: { question: "What does mandatory reporting ensure?", options: ["Transparency", "Confusion", "Higher taxes", "Less work"], correctAnswer: 0 }
      }
    ],
    finalQuiz: [
      { question: "What does CCTS stand for?", options: ["Carbon Credit Trading Scheme", "Corporate Carbon Tax System", "Centralized Carbon Trading Strategy", "Climate Change Target System"], correctAnswer: 0 },
      { question: "What determines a company's emission limit?", options: ["CEO preference", "Sector, size, and capacity", "Random selection", "Shareholder vote"], correctAnswer: 1 },
      { question: "What must a company do if it exceeds its cap?", options: ["Nothing", "Purchase carbon credits", "Ignore it", "Print money"], correctAnswer: 1 },
      { question: "How does CCTS view environmental responsibility?", options: ["A burden", "An opportunity for profitability", "A waste of time", "An optional task"], correctAnswer: 1 },
      { question: "Who tracks company performance in CCTS?", options: ["Competitors", "Regulatory authorities", "Customers only", "Nobody"], correctAnswer: 1 }
    ]
  },
  {
    id: 7,
    title: "MRV Plan Development",
    description: "Monitoring, Reporting, and Verification plan strategies.",
    category: "MRV",
    duration: "4 hours",
    level: "Intermediate",
    icon: ClipboardCheck,
    progress: 0,
    lessons: 5,
    learnings: ["Methods for real-time tracking", "Data collection systems", "Third-party verification", "Audit processes"],
    chapters: [
      {
        id: 1, title: "Foundation of Carbon Trading", intro: "What is MRV?",
        concept: "MRV (Monitoring, Reporting, and Verification) ensures that emission reductions claimed are real, measurable, and verified. Without MRV, the entire carbon trading process loses credibility.",
        keyPoints: ["Ensures reductions are real", "Provides system credibility", "Essential for trading"],
        recap: "MRV is the backbone of trust in carbon markets.",
        quizQuestion: { question: "What does MRV ensure about emission reductions?", options: ["They are fake", "They are real and measurable", "They are ignored", "They are irrelevant"], correctAnswer: 1 }
      },
      {
        id: 2, title: "Continuous Monitoring", intro: "Tracking emissions accurately.",
        concept: "Monitoring involves continuously tracking emissions using tools like IoT devices, smart meters, and software. This tracks emissions at every stage of operations to minimize errors.",
        keyPoints: ["Uses IoT and smart meters", "Tracks at every stage", "Minimizes errors"],
        recap: "Real-time monitoring provides the raw data needed for MRV.",
        quizQuestion: { question: "Which tools are used for continuous monitoring?", options: ["Pen and paper", "IoT devices and smart meters", "Guesswork", "Telescopes"], correctAnswer: 1 }
      },
      {
        id: 3, title: "Structured Reporting", intro: "Making sense of raw data.",
        concept: "Reporting involves organizing monitored data into structured formats and submitting it to regulatory authorities. This converts raw data into meaningful compliance insights.",
        keyPoints: ["Organizes data into formats", "Submitted to authorities", "Creates meaningful insights"],
        recap: "Reporting turns raw numbers into proof of compliance.",
        quizQuestion: { question: "What does reporting involve?", options: ["Hiding data", "Organizing data into structured formats", "Deleting records", "Guessing emissions"], correctAnswer: 1 }
      },
      {
        id: 4, title: "Independent Verification", intro: "Trust, but verify.",
        concept: "Verification is conducted by independent third-party agencies that validate the accuracy of reported data. This independent check is required to earn verified, tradable carbon credits.",
        keyPoints: ["Conducted by third-parties", "Validates accuracy", "Required for tradable credits"],
        recap: "Third-party verification makes your credits globally acceptable.",
        quizQuestion: { question: "Who conducts the verification process?", options: ["The company itself", "Independent third-party agencies", "The CEO", "Customers"], correctAnswer: 1 }
      },
      {
        id: 5, title: "Global Credibility", intro: "Why accuracy matters internationally.",
        concept: "A strong MRV system builds global credibility, prevents fraud, and makes credits acceptable in international markets. It also supports data-driven decision-making within the company.",
        keyPoints: ["Prevents fraud", "Makes credits internationally acceptable", "Supports data-driven decisions"],
        recap: "Flawless MRV execution opens the door to global trading.",
        quizQuestion: { question: "What does a strong MRV system prevent?", options: ["Profits", "Fraud and misreporting", "Efficiency", "Global trading"], correctAnswer: 1 }
      }
    ],
    finalQuiz: [
      { question: "What does MRV stand for?", options: ["Manage, Report, Value", "Monitoring, Reporting, and Verification", "Measure, Record, Validate", "Make, Read, Verify"], correctAnswer: 1 },
      { question: "What tools are used for monitoring?", options: ["Abacus", "IoT devices and smart meters", "Rulers", "Thermometers"], correctAnswer: 1 },
      { question: "Who conducts verification?", options: ["Internal staff", "Independent third-party agencies", "Competitors", "Shareholders"], correctAnswer: 1 },
      { question: "Why is MRV important for global markets?", options: ["It slows trading down", "It builds credibility and trust", "It is a formality", "It costs money"], correctAnswer: 1 },
      { question: "What does reporting do?", options: ["Hides raw data", "Converts raw data into structured insights", "Stops emissions", "Replaces monitoring"], correctAnswer: 1 }
    ]
  },
  {
    id: 8,
    title: "Carbon Credit Trading Strategy",
    description: "Navigate the exchange and develop optimal trading strategies.",
    category: "Trading",
    duration: "3 hours",
    level: "Advanced",
    icon: Award,
    progress: 0,
    lessons: 5,
    learnings: ["Understanding price fluctuations", "Strategic buying and selling", "Risk management techniques", "Portfolio management"],
    chapters: [
      {
        id: 1, title: "Dynamic Market Planning", intro: "Why strategy is essential.",
        concept: "Carbon credit trading is dynamic, requiring understanding of market trends, pricing patterns, and demand-supply dynamics. A well-planned strategy helps companies decide when to buy or sell.",
        keyPoints: ["Understand market trends", "Know demand-supply dynamics", "Plan when to buy/sell"],
        recap: "Trading without a strategy is gambling; analyze the market first.",
        quizQuestion: { question: "What is essential for carbon credit trading?", options: ["Luck", "Understanding market trends and pricing", "Ignoring data", "Only buying"], correctAnswer: 1 }
      },
      {
        id: 2, title: "Optimizing Buying & Selling", intro: "Timing the market.",
        concept: "Companies can invest in green tech to generate surplus credits, selling them when market prices are high. Alternatively, purchasing credits early when prices are low reduces future compliance costs.",
        keyPoints: ["Sell when prices are high", "Buy early when prices are low", "Optimize compliance costs"],
        recap: "Smart timing turns compliance into a profitable endeavor.",
        quizQuestion: { question: "When is the best time to sell surplus credits?", options: ["When prices are low", "When prices are high", "Never", "Immediately"], correctAnswer: 1 }
      },
      {
        id: 3, title: "Risk Management", intro: "Protecting your assets.",
        concept: "A strong strategy involves managing risks, forecasting future emission needs, and participating on regulated exchanges to avoid fraudulent trades or sudden price crashes.",
        keyPoints: ["Forecast future needs", "Use regulated exchanges", "Manage price crash risks"],
        recap: "Forecasting and using regulated platforms minimizes risk.",
        quizQuestion: { question: "How can companies mitigate trading risks?", options: ["Trade anywhere", "Use regulated exchanges and forecast needs", "Ignore the future", "Buy blindly"], correctAnswer: 1 }
      },
      {
        id: 4, title: "Portfolio Management", intro: "Balancing your carbon assets.",
        concept: "Credit Portfolio Management means maintaining a balance between buying credits for compliance and holding credits for future trading. It aligns trading decisions with long-term sustainability goals.",
        keyPoints: ["Balance buying and selling", "Align with sustainability goals", "Hold credits strategically"],
        recap: "Manage carbon credits just like a financial portfolio.",
        quizQuestion: { question: "What does Credit Portfolio Management involve?", options: ["Selling everything", "Balancing between buying and holding/selling", "Ignoring credits", "Only buying"], correctAnswer: 1 }
      },
      {
        id: 5, title: "Competitive Advantage", intro: "Why this matters financially.",
        concept: "Effective trading converts environmental efforts into financial gains, reduces operational costs, and provides a significant competitive advantage in global green markets.",
        keyPoints: ["Converts efforts to gains", "Reduces operational costs", "Provides competitive edge"],
        recap: "Strategic trading is a powerful financial tool for modern corporates.",
        quizQuestion: { question: "What is a major benefit of strategic trading?", options: ["It provides a competitive advantage", "It increases emissions", "It stops production", "It hides data"], correctAnswer: 0 }
      }
    ],
    finalQuiz: [
      { question: "What is required for successful carbon trading?", options: ["Ignoring the market", "Careful planning and strategy", "Only selling", "Only buying"], correctAnswer: 1 },
      { question: "When should a company strategically purchase credits?", options: ["When prices are at their peak", "Early when prices are low", "Never", "After penalties are applied"], correctAnswer: 1 },
      { question: "What does Portfolio Management help with?", options: ["Balancing buying and selling", "Ignoring emissions", "Stopping production", "Hiding assets"], correctAnswer: 0 },
      { question: "Where should companies trade to manage risk?", options: ["Unregulated dark markets", "Regulated exchanges", "Through friends", "Nowhere"], correctAnswer: 1 },
      { question: "What is the ultimate financial goal of this strategy?", options: ["To lose money", "To convert environmental efforts into financial gains", "To pay more taxes", "To ignore compliance"], correctAnswer: 1 }
    ]
  },
  {
    id: 9,
    title: "Emission Calculation Methodologies",
    description: "Sector-specific GHG calculation methods and Scope 1, 2, 3.",
    category: "Technical",
    duration: "5 hours",
    level: "Advanced",
    icon: Calculator,
    progress: 0,
    lessons: 5,
    learnings: ["Standard calculation formulas", "Sector-specific methods", "Scope 1, 2, 3 classification", "Tools for calculation"],
    chapters: [
      {
        id: 1, title: "Critical First Step", intro: "You can't reduce what you can't measure.",
        concept: "Emission calculation is the first and most critical step in carbon management. Standardized formulas ensure global consistency and accuracy based on fuel consumption and manufacturing data.",
        keyPoints: ["Critical first step", "Standardized formulas", "Ensures global consistency"],
        recap: "Accurate measurement is the foundation of carbon management.",
        quizQuestion: { question: "What is the first step in carbon management?", options: ["Selling credits", "Emission calculation", "Buying credits", "Ignoring data"], correctAnswer: 1 }
      },
      {
        id: 2, title: "Scope 1 Emissions", intro: "Direct emissions.",
        concept: "Scope 1 includes direct emissions from company-owned or controlled sources, such as fuel combustion in company vehicles or emissions directly from manufacturing processes like cement production.",
        keyPoints: ["Direct emissions", "Company-owned sources", "Fuel combustion"],
        recap: "Scope 1 covers the emissions you produce directly on-site.",
        quizQuestion: { question: "What are Scope 1 emissions?", options: ["Direct emissions from company-owned sources", "Emissions from suppliers", "Purchased electricity", "Employee commutes"], correctAnswer: 0 }
      },
      {
        id: 3, title: "Scope 2 Emissions", intro: "Indirect energy emissions.",
        concept: "Scope 2 covers indirect emissions from the generation of purchased electricity, steam, heating, and cooling consumed by the reporting company.",
        keyPoints: ["Indirect emissions", "Purchased electricity", "Heating and cooling"],
        recap: "Scope 2 relates entirely to the energy you buy and consume.",
        quizQuestion: { question: "Which of these is a Scope 2 emission?", options: ["Company car exhaust", "Purchased electricity", "Supplier transport", "Waste disposal"], correctAnswer: 1 }
      },
      {
        id: 4, title: "Scope 3 Emissions", intro: "Value chain emissions.",
        concept: "Scope 3 includes all other indirect emissions that occur in a company's value chain, including both upstream and downstream operations like suppliers, transport, and product use.",
        keyPoints: ["Value chain emissions", "Upstream and downstream", "Suppliers and transport"],
        recap: "Scope 3 is often the largest, covering everything outside your direct control.",
        quizQuestion: { question: "What does Scope 3 cover?", options: ["On-site combustion", "Purchased electricity", "The entire value chain (suppliers, transport)", "Nothing"], correctAnswer: 2 }
      },
      {
        id: 5, title: "Sector-Based Approaches", intro: "Industry specific formulas.",
        concept: "Calculations must be sector-specific (e.g., cement vs. textiles) and activity-based. Using software tools and international standards ensures error-free tracking and helps pinpoint reduction areas.",
        keyPoints: ["Sector-specific methods", "Activity-based data", "Identifies reduction areas"],
        recap: "Different industries require different calculation methodologies.",
        quizQuestion: { question: "Why use sector-based calculations?", options: ["Because one size fits all", "To provide customized, accurate methods for each industry", "To confuse regulators", "To avoid calculating"], correctAnswer: 1 }
      }
    ],
    finalQuiz: [
      { question: "What is the primary purpose of emission calculation?", options: ["To accurately measure greenhouse gas production", "To sell products", "To increase emissions", "To ignore laws"], correctAnswer: 0 },
      { question: "What do Scope 1 emissions include?", options: ["Purchased electricity", "Direct emissions from company-owned sources", "Supplier emissions", "Employee commutes"], correctAnswer: 1 },
      { question: "What do Scope 2 emissions include?", options: ["Direct combustion", "Indirect emissions from purchased electricity", "Waste generation", "Product use"], correctAnswer: 1 },
      { question: "What do Scope 3 emissions cover?", options: ["Direct emissions", "Only purchased steam", "The entire value chain (upstream/downstream)", "Nothing"], correctAnswer: 2 },
      { question: "Why are standard guidelines used?", options: ["To ensure global consistency", "To confuse companies", "To make calculations impossible", "To increase taxes"], correctAnswer: 0 }
    ]
  },
  {
    id: 10,
    title: "CBAM & Global Carbon Markets",
    description: "Understanding EU Carbon Border Adjustment Mechanism and global trade.",
    category: "International",
    duration: "2.5 hours",
    level: "Intermediate",
    icon: Leaf,
    progress: 0,
    lessons: 5,
    learnings: ["CBAM policy explanation", "Impact on exports", "Pricing variations across regions", "Global expansion opportunities"],
    chapters: [
      {
        id: 1, title: "What is CBAM?", intro: "The Carbon Border Adjustment Mechanism.",
        concept: "CBAM is an international policy introduced by regions like the EU to control carbon emissions in global trade. It requires exporting companies to pay a carbon cost based on the emissions generated during production.",
        keyPoints: ["International trade policy", "Requires exporting companies to pay", "Based on production emissions"],
        recap: "CBAM essentially taxes the carbon footprint of imported goods.",
        quizQuestion: { question: "What does CBAM stand for?", options: ["Corporate Business Assessment Method", "Carbon Border Adjustment Mechanism", "Climate Boundary Agreement Model", "Carbon Buying And Manufacturing"], correctAnswer: 1 }
      },
      {
        id: 2, title: "Impact on Exports", intro: "Competitiveness in global trade.",
        concept: "Companies with higher emissions face higher costs at the border, reducing their competitiveness. Companies with lower emissions benefit from reduced costs and gain better market access internationally.",
        keyPoints: ["High emissions = High costs", "Low emissions = Better market access", "Directly affects competitiveness"],
        recap: "Your emission levels now directly dictate your international competitiveness.",
        quizQuestion: { question: "How does high emission production affect a company under CBAM?", options: ["It reduces costs", "It increases costs and reduces competitiveness", "It has no effect", "It provides a subsidy"], correctAnswer: 1 }
      },
      {
        id: 3, title: "Global Trading Opportunities", intro: "Trading beyond domestic borders.",
        concept: "Global carbon markets allow companies to trade credits beyond domestic boundaries. Different regions offer different pricing structures, allowing companies to maximize profits by accessing wider markets.",
        keyPoints: ["Trade beyond domestic boundaries", "Access varying pricing structures", "Maximize global profits"],
        recap: "International markets offer broader avenues for trading carbon credits.",
        quizQuestion: { question: "What is an advantage of global carbon markets?", options: ["Fixed, low prices", "Opportunities to access wider markets with varying prices", "Inability to trade", "Higher domestic taxes"], correctAnswer: 1 }
      },
      {
        id: 4, title: "Pricing Variations", intro: "Capitalizing on differences.",
        concept: "Carbon credit prices vary significantly between domestic and international markets. Understanding these price advantages helps companies benefit from higher international prices when selling surplus credits.",
        keyPoints: ["Prices vary by region", "International prices often higher", "Strategic selling maximizes revenue"],
        recap: "Selling credits in the right international market yields higher returns.",
        quizQuestion: { question: "Why should companies monitor international carbon prices?", options: ["To find higher pricing advantages", "To pay more taxes", "To ignore domestic markets", "To stop trading"], correctAnswer: 0 }
      },
      {
        id: 5, title: "Aligning with Standards", intro: "Future-proofing your business.",
        concept: "Understanding CBAM and global markets protects export businesses from sudden additional taxes, opens new revenue streams, and aligns operations with international environmental standards.",
        keyPoints: ["Protects from sudden taxes", "Opens new revenue streams", "Aligns with global standards"],
        recap: "Global alignment is essential for the future survival of export businesses.",
        quizQuestion: { question: "What does aligning with global standards achieve?", options: ["It protects export businesses from sudden taxes", "It ruins businesses", "It increases emissions", "It stops global trade"], correctAnswer: 0 }
      }
    ],
    finalQuiz: [
      { question: "What does CBAM require exporting companies to do?", options: ["Pay a carbon cost based on emissions", "Stop exporting", "Ignore emissions", "Receive subsidies"], correctAnswer: 0 },
      { question: "How does CBAM affect companies with low emissions?", options: ["They face higher costs", "They benefit from reduced costs and better market access", "They are banned from exporting", "Nothing happens"], correctAnswer: 1 },
      { question: "What do global carbon markets provide?", options: ["Only domestic trading", "Opportunities to trade beyond domestic boundaries", "Fixed global prices", "No financial benefits"], correctAnswer: 1 },
      { question: "Why do prices vary across regions?", options: ["Because of different policies and demand", "Because it is random", "Because of currency color", "Prices do not vary"], correctAnswer: 0 },
      { question: "Why is understanding CBAM important for corporates?", options: ["To increase emissions", "To protect export business and enhance competitiveness", "To stop trading", "To ignore regulations"], correctAnswer: 1 }
    ]
  }
];
