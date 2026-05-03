import { Play, BookOpen, ChevronRight } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { Course } from "./data";

interface CourseListProps {
  role: "farmer" | "company" | "public";
  activeTab: "farmers" | "corporates";
  setActiveTab: (tab: "farmers" | "corporates") => void;
  courses: Course[];
  onSelectCourse: (course: Course) => void;
}

export function CourseList({ role, activeTab, setActiveTab, courses, onSelectCourse }: CourseListProps) {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 font-[Inter,DM_Sans,sans-serif]">
      {/* Featured Banner based on Role */}
      <div className="grid grid-cols-1 gap-4">
        {role === "farmer" && (
          <div className="relative rounded-2xl overflow-hidden h-[220px] shadow-sm">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1685023620523-9c726f2c499b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmdhbmljJTIwc3VzdGFpbmFibGUlMjBmYXJtaW5nJTIwcHJhY3RpY2VzfGVufDF8fHx8MTc3Mjc5NjY4NXww&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Sustainable farming"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#2d6a4f]/90 via-[#2d6a4f]/70 to-transparent"></div>
            <div className="absolute inset-0 flex items-center p-8">
              <div className="max-w-lg">
                <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium text-white mb-3 inline-block">
                  Featured for Farmers
                </span>
                <h3 className="text-white text-2xl font-bold mb-2">
                  Agroforestry for Carbon Credits
                </h3>
                <p className="text-white/90 text-sm mb-4">
                  Learn how planting high-biomass trees on field boundaries can generate carbon credits and additional income.
                </p>
                <button 
                  onClick={() => onSelectCourse(courses[0])}
                  className="flex items-center gap-2 px-5 py-2.5 bg-white text-[#2d6a4f] rounded-xl text-sm font-bold hover:bg-white/90 transition-transform hover:scale-105"
                >
                  <Play className="w-4 h-4 fill-current" /> Start Learning
                </button>
              </div>
            </div>
          </div>
        )}

        {role === "company" && (
          <div className="relative rounded-2xl overflow-hidden h-[220px] shadow-sm">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1686100511314-7d4a52987f2f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3Jwb3JhdGUlMjBvZmZpY2UlMjBidXNpbmVzcyUyMG1lZXRpbmclMjBzdXN0YWluYWJpbGl0eXxlbnwxfHx8fDE3NzI3OTY2ODV8MA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Corporate sustainability"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#1b4332]/90 via-[#1b4332]/70 to-transparent"></div>
            <div className="absolute inset-0 flex items-center p-8">
              <div className="max-w-lg">
                <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium text-white mb-3 inline-block">
                  Priority for Companies
                </span>
                <h3 className="text-white text-2xl font-bold mb-2">
                  CCTS Compliance Framework
                </h3>
                <p className="text-white/90 text-sm mb-4">
                  Navigate Phase 1 compliance requirements, emission limits, and carbon credit trading opportunities.
                </p>
                <button 
                  onClick={() => onSelectCourse(courses[0])}
                  className="flex items-center gap-2 px-5 py-2.5 bg-white text-[#1b4332] rounded-xl text-sm font-bold hover:bg-white/90 transition-transform hover:scale-105"
                >
                  <Play className="w-4 h-4 fill-current" /> Start Learning
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {courses.map((course) => (
          <div
            key={course.id}
            onClick={() => {
              console.log("Card clicked!", course.title);
              onSelectCourse(course);
            }}
            style={{ cursor: "pointer", pointerEvents: "auto" }}
            className="bg-card rounded-2xl border border-border p-6 shadow-sm hover:shadow-md hover:border-primary/30 transition-all group flex flex-col h-full relative z-10"
          >
            <div className="flex items-start justify-between mb-4 pointer-events-none">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                <course.icon className="w-6 h-6 text-primary" />
              </div>
              <span className="px-2.5 py-1 bg-muted rounded-full text-xs font-medium text-muted-foreground">
                {course.level}
              </span>
            </div>
            
            <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors pointer-events-none">{course.title}</h3>
            <p className="text-sm text-muted-foreground mb-6 line-clamp-2 flex-1 pointer-events-none">
              {course.description}
            </p>
            
            <div className="flex items-center justify-between text-xs font-medium text-muted-foreground mb-4 pointer-events-none">
              <span className="flex items-center gap-1.5 bg-muted/50 px-2.5 py-1 rounded-md">
                <BookOpen className="w-3.5 h-3.5" /> {course.lessons} Chapters
              </span>
              <span className="bg-muted/50 px-2.5 py-1 rounded-md">{course.duration}</span>
            </div>
            
            {/* Progress Bar */}
            <div className="mb-4 pointer-events-none">
              <div className="flex items-center justify-between text-xs mb-1.5 font-medium">
                <span className="text-muted-foreground">Course Progress</span>
                <span className={course.progress > 0 ? "text-primary" : "text-muted-foreground"}>{course.progress}%</span>
              </div>
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-1000 ease-out"
                  style={{
                    width: `${course.progress}%`,
                    backgroundColor: course.progress === 100 ? "#2d6a4f" : "#52b788",
                  }}
                ></div>
              </div>
            </div>
            
            <button 
              onClick={(e) => { 
                e.stopPropagation();
                console.log("Button clicked!", course.title);
                onSelectCourse(course); 
              }}
              className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-bold transition-all transform hover:scale-105 active:scale-95 relative z-20 ${
              course.progress > 0 && course.progress < 100 
                ? "bg-primary text-primary-foreground shadow-md shadow-primary/20" 
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            }`}>
              {course.progress === 0 ? "Start Course" : course.progress === 100 ? "Review Material" : "Continue Learning"}
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
