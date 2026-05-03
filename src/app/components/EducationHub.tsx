import { useState, useEffect } from "react";
import { useUserRole } from "../context/UserProvider";
import { CourseList } from "./education/CourseList";
import { CourseRoadmap } from "./education/CourseRoadmap";
import { ChapterView } from "./education/ChapterView";
import { QuizView } from "./education/QuizView";
import { farmerCourses, corporateCourses, Course } from "./education/data";

type ViewState = "list" | "roadmap" | "chapter" | "quiz";

export function EducationHub() {
  const { role } = useUserRole();
  const [activeTab, setActiveTab] = useState<"farmers" | "corporates">(
    role === "company" ? "corporates" : "farmers"
  );
  
  // Navigation State
  const [view, setView] = useState<ViewState>("list");
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedChapterId, setSelectedChapterId] = useState<number | null>(null);
  
  // Progress State (In a real app, this would come from a database)
  const [completedChapters, setCompletedChapters] = useState<Record<number, number[]>>({}); // courseId -> array of completed chapter IDs
  const [quizScores, setQuizScores] = useState<Record<number, number>>({}); // courseId -> score

  // Sync tab with role on mount
  useEffect(() => {
    if (role === "company") setActiveTab("corporates");
    if (role === "farmer") setActiveTab("farmers");
  }, [role]);

  const currentCourses = activeTab === "farmers" ? farmerCourses : corporateCourses;

  const handleSelectCourse = (course: Course) => {
    console.log("handleSelectCourse called for", course.title);
    alert(`Attempting to open ${course.title}. If nothing happens after this alert, there is a rendering issue in CourseRoadmap.`);
    setSelectedCourse(course);
    setView("roadmap");
    // Initialize progress tracking for this course if not exists
    if (!completedChapters[course.id]) {
      setCompletedChapters(prev => ({ ...prev, [course.id]: [] }));
    }
  };

  const handleSelectChapter = (id: number | 'quiz') => {
    if (id === 'quiz') {
      setView("quiz");
    } else {
      setSelectedChapterId(id);
      setView("chapter");
    }
  };

  const handleCompleteChapter = () => {
    if (selectedCourse && selectedChapterId) {
      setCompletedChapters(prev => {
        const courseProgress = prev[selectedCourse.id] || [];
        if (!courseProgress.includes(selectedChapterId)) {
          return { ...prev, [selectedCourse.id]: [...courseProgress, selectedChapterId] };
        }
        return prev;
      });
    }
    setView("roadmap");
  };

  const handleCompleteQuiz = (score: number) => {
    if (selectedCourse) {
      setQuizScores(prev => ({ ...prev, [selectedCourse.id]: score }));
    }
  };

  // Rendering logic
  return (
    <div className="p-6 md:p-8">
      {/* Header (Only show on List view to keep sub-views clean) */}
      {view === "list" && (
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-foreground mb-2">Education Hub</h1>
          <p className="text-muted-foreground text-lg">
            Structured learning paths for sustainable practices and market compliance.
          </p>
          
          {/* Tab Switcher */}
          <div className="flex items-center gap-1 bg-muted rounded-xl p-1 w-fit mt-6">
            <button
              onClick={() => setActiveTab("farmers")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold transition-all ${
                activeTab === "farmers"
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              For Farmers
            </button>
            <button
              onClick={() => setActiveTab("corporates")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold transition-all ${
                activeTab === "corporates"
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              For Corporates
            </button>
          </div>
        </div>
      )}

      {/* Main Views */}
      {view === "list" && (
        <CourseList 
          role={role as any} 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          courses={currentCourses}
          onSelectCourse={handleSelectCourse} 
        />
      )}

      {view === "roadmap" && selectedCourse && (
        <CourseRoadmap 
          course={selectedCourse} 
          onBack={() => setView("list")} 
          onSelectChapter={handleSelectChapter}
          completedChapters={completedChapters[selectedCourse.id] || []}
          quizScore={quizScores[selectedCourse.id] ?? null}
        />
      )}

      {view === "chapter" && selectedCourse && selectedChapterId && (
        <ChapterView 
          chapter={selectedCourse.chapters.find(c => c.id === selectedChapterId)!} 
          chapterIndex={selectedCourse.chapters.findIndex(c => c.id === selectedChapterId)}
          totalChapters={selectedCourse.chapters.length}
          onBack={() => setView("roadmap")}
          onComplete={handleCompleteChapter}
          isCompleted={(completedChapters[selectedCourse.id] || []).includes(selectedChapterId)}
        />
      )}

      {view === "quiz" && selectedCourse && (
        <QuizView 
          courseTitle={selectedCourse.title}
          questions={selectedCourse.finalQuiz} 
          onBack={() => setView("roadmap")}
          onComplete={handleCompleteQuiz}
          previousScore={quizScores[selectedCourse.id] ?? null}
        />
      )}
    </div>
  );
}
