import { useState, useEffect } from "react";
import {
  Sprout,
  Factory,
  BookOpen,
  Play,
  ChevronRight,
  TreePine,
  Droplets,
  Wheat,
  Leaf,
  FileText,
  Award,
  Calculator,
  Users,
  ClipboardCheck,
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useUserRole } from "../context/UserProvider";

type Tab = "farmers" | "corporates";

interface CourseCard {
  id: number;
  title: string;
  description: string;
  category: string;
  duration: string;
  level: string;
  icon: typeof TreePine;
  progress: number;
  lessons: number;
}

const farmerCourses: CourseCard[] = [
  {
    id: 1,
    title: "Agroforestry for Carbon Credits",
    description: "Learn how planting high-biomass trees on field boundaries can generate carbon credits and additional income.",
    category: "Agroforestry",
    duration: "4 hours",
    level: "Beginner",
    icon: TreePine,
    progress: 65,
    lessons: 12,
  },
  {
    id: 2,
    title: "Methane Reduction in Rice Paddies",
    description: "Implement Alternate Wetting & Drying (AWD) and Direct Seeded Rice (DSR) techniques to reduce methane emissions.",
    category: "Rice Cultivation",
    duration: "3 hours",
    level: "Intermediate",
    icon: Droplets,
    progress: 30,
    lessons: 8,
  },
  {
    id: 3,
    title: "Soil Organic Carbon Enhancement",
    description: "Master the use of cover crops, biochar, and organic fertilization to lock carbon into your soil.",
    category: "Soil Health",
    duration: "5 hours",
    level: "Beginner",
    icon: Wheat,
    progress: 0,
    lessons: 15,
  },
  {
    id: 4,
    title: "Understanding FPOs & Carbon Markets",
    description: "How Farmer Producer Organizations help smallholders access carbon markets through aggregation.",
    category: "Market Access",
    duration: "2 hours",
    level: "Beginner",
    icon: Users,
    progress: 100,
    lessons: 6,
  },
  {
    id: 5,
    title: "Digital KYC & Onboarding Guide",
    description: "Step-by-step guide for Aadhaar verification, land documentation, and mobile-linked payments.",
    category: "Digital Tools",
    duration: "1.5 hours",
    level: "Beginner",
    icon: ClipboardCheck,
    progress: 45,
    lessons: 5,
  },
];

const corporateCourses: CourseCard[] = [
  {
    id: 6,
    title: "CCTS Compliance Framework",
    description: "Complete guide to the Carbon Credit Trading Scheme, regulatory requirements, and compliance cycles.",
    category: "Compliance",
    duration: "6 hours",
    level: "Advanced",
    icon: FileText,
    progress: 20,
    lessons: 18,
  },
  {
    id: 7,
    title: "MRV Plan Development",
    description: "Learn to create a Monitoring, Reporting, and Verification plan for Scope 1 and Scope 2 emissions.",
    category: "MRV",
    duration: "4 hours",
    level: "Intermediate",
    icon: ClipboardCheck,
    progress: 55,
    lessons: 10,
  },
  {
    id: 8,
    title: "Carbon Credit Trading Strategy",
    description: "Navigate the ICM exchange, understand price corridors, and develop optimal trading strategies.",
    category: "Trading",
    duration: "3 hours",
    level: "Advanced",
    icon: Award,
    progress: 0,
    lessons: 9,
  },
  {
    id: 9,
    title: "Emission Calculation Methodologies",
    description: "Sector-specific GHG calculation methods for cement, steel, aluminium, petroleum, and textiles.",
    category: "Technical",
    duration: "5 hours",
    level: "Advanced",
    icon: Calculator,
    progress: 10,
    lessons: 14,
  },
  {
    id: 10,
    title: "CBAM & Global Carbon Markets",
    description: "Understanding EU Carbon Border Adjustment Mechanism and its impact on Indian exporters.",
    category: "International",
    duration: "2.5 hours",
    level: "Intermediate",
    icon: Leaf,
    progress: 0,
    lessons: 7,
  },
];

const quickFacts = [
  { label: "1 Carbon Credit", value: "= 1 tonne CO2e removed/avoided" },
  { label: "India's Target", value: "45% emission intensity reduction by 2030" },
  { label: "Phase 1 Sectors", value: "9 energy-intensive industries" },
  { label: "FPO Role", value: "Aggregating smallholder farmers for market access" },
];

export function EducationHub() {
  const { role } = useUserRole();
  const [activeTab, setActiveTab] = useState<Tab>(role === "company" ? "corporates" : "farmers");

  useEffect(() => {
    setActiveTab(role === "company" ? "corporates" : "farmers");
  }, [role]);

  const courses = activeTab === "farmers" ? farmerCourses : corporateCourses;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl" style={{ fontWeight: 600 }}>Education Hub</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Awareness and training resources for farmers and corporate entities
          </p>
        </div>
      </div>

      {/* Featured Banner based on Role */}
      <div className="grid grid-cols-1 gap-4">
        {role === "farmer" && (
          <div className="relative rounded-xl overflow-hidden h-[200px]">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1685023620523-9c726f2c499b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmdhbmljJTIwc3VzdGFpbmFibGUlMjBmYXJtaW5nJTIwcHJhY3RpY2VzfGVufDF8fHx8MTc3Mjc5NjY4NXww&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Sustainable farming"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#2d6a4f]/90 to-transparent"></div>
            <div className="absolute inset-0 flex items-center p-6">
              <div>
                <span className="px-2 py-1 bg-white/20 backdrop-blur-sm rounded text-xs text-white mb-2 inline-block">
                  Priority for Farmers
                </span>
                <h3 className="text-white text-lg mb-1" style={{ fontWeight: 600 }}>
                  How to increase soil carbon
                </h3>
                <p className="text-white/80 text-sm max-w-xs">
                  Comprehensive practices for carbon sequestration and sustainable income
                </p>
                <button className="mt-3 flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg text-white text-sm hover:bg-white/30 transition-colors">
                  <Play className="w-4 h-4" /> Start Learning
                </button>
              </div>
            </div>
          </div>
        )}

        {role === "company" && (
          <div className="relative rounded-xl overflow-hidden h-[200px]">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1686100511314-7d4a52987f2f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3Jwb3JhdGUlMjBvZmZpY2UlMjBidXNpbmVzcyUyMG1lZXRpbmclMjBzdXN0YWluYWJpbGl0eXxlbnwxfHx8fDE3NzI3OTY2ODV8MA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Corporate sustainability"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#1b4332]/90 to-transparent"></div>
            <div className="absolute inset-0 flex items-center p-6">
              <div>
                <span className="px-2 py-1 bg-white/20 backdrop-blur-sm rounded text-xs text-white mb-2 inline-block">
                  Priority for Companies
                </span>
                <h3 className="text-white text-lg mb-1" style={{ fontWeight: 600 }}>
                  New Government Regulations for ESG
                </h3>
                <p className="text-white/80 text-sm max-w-xs">
                  Navigate Phase 1 compliance requirements and carbon credit trading
                </p>
                <button className="mt-3 flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg text-white text-sm hover:bg-white/30 transition-colors">
                  <Play className="w-4 h-4" /> Start Learning
                </button>
              </div>
            </div>
          </div>
        )}

        {role !== "farmer" && role !== "company" && (
          <div className="relative rounded-xl overflow-hidden h-[200px]">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1657348477443-df0e64783d8b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBmYXJtZXIlMjBncmVlbiUyMGZpZWxkJTIwYWdyaWN1bHR1cmV8ZW58MXx8fHwxNzcyNzk2NjgzfDA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Public Overview"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#1b4332]/90 to-transparent"></div>
            <div className="absolute inset-0 flex items-center p-6">
              <div>
                <span className="px-2 py-1 bg-white/20 backdrop-blur-sm rounded text-xs text-white mb-2 inline-block">
                  General Overview
                </span>
                <h3 className="text-white text-lg mb-1" style={{ fontWeight: 600 }}>
                  Why Carbon Credits?
                </h3>
                <p className="text-white/80 text-sm max-w-xs">
                  Discover the impact of the Indian Carbon Market on sustainability and the economy
                </p>
                <button className="mt-3 flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg text-white text-sm hover:bg-white/30 transition-colors">
                  <Play className="w-4 h-4" /> Start Learning
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Quick Facts */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {quickFacts.map((fact, i) => (
          <div key={i} className="bg-card rounded-xl border border-border p-4">
            <p className="text-xs text-muted-foreground mb-1">{fact.label}</p>
            <p className="text-sm" style={{ fontWeight: 600 }}>{fact.value}</p>
          </div>
        ))}
      </div>

      {/* Tab Switcher */}
      <div className="flex items-center gap-1 bg-muted rounded-lg p-1 w-fit">
        <button
          onClick={() => setActiveTab("farmers")}
          className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm transition-all ${
            activeTab === "farmers"
              ? "bg-card text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
          style={activeTab === "farmers" ? { fontWeight: 500 } : {}}
        >
          <Sprout className="w-4 h-4" />
          For Farmers
        </button>
        <button
          onClick={() => setActiveTab("corporates")}
          className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm transition-all ${
            activeTab === "corporates"
              ? "bg-card text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
          style={activeTab === "corporates" ? { fontWeight: 500 } : {}}
        >
          <Factory className="w-4 h-4" />
          For Corporates
        </button>
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {courses.map((course) => (
          <div
            key={course.id}
            className="bg-card rounded-xl border border-border p-5 hover:shadow-md transition-shadow group"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                <course.icon className="w-5 h-5 text-primary" />
              </div>
              <span className="px-2 py-0.5 bg-muted rounded text-xs text-muted-foreground">
                {course.level}
              </span>
            </div>
            <h3 className="text-sm mb-2" style={{ fontWeight: 600 }}>{course.title}</h3>
            <p className="text-xs text-muted-foreground mb-4 line-clamp-2">
              {course.description}
            </p>
            <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
              <span className="flex items-center gap-1">
                <BookOpen className="w-3 h-3" /> {course.lessons} lessons
              </span>
              <span>{course.duration}</span>
            </div>
            {/* Progress Bar */}
            <div className="mb-3">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-muted-foreground">Progress</span>
                <span style={{ fontWeight: 500 }}>{course.progress}%</span>
              </div>
              <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${course.progress}%`,
                    backgroundColor: course.progress === 100 ? "#2d6a4f" : "#52b788",
                  }}
                ></div>
              </div>
            </div>
            <button className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-secondary text-secondary-foreground text-sm hover:bg-accent transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
              {course.progress === 0 ? "Start Course" : course.progress === 100 ? "Review" : "Continue"}
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
