import { ArrowLeft, CheckCircle2, Lock, PlayCircle, BookOpen, Award } from "lucide-react";
import { Course } from "./data";

interface CourseRoadmapProps {
  course: Course;
  onBack: () => void;
  onSelectChapter: (chapterId: number | 'quiz') => void;
  completedChapters: number[];
  quizScore: number | null;
}

export function CourseRoadmap({ course, onBack, onSelectChapter, completedChapters, quizScore }: CourseRoadmapProps) {
  const isQuizUnlocked = completedChapters.length === course.chapters.length;

  return (
    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-right-8 duration-500 font-[Inter,DM_Sans,sans-serif] pb-24">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Courses
      </button>

      {/* HEADER */}
      <div className="bg-card border border-border rounded-3xl p-8 shadow-sm mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
              <course.icon className="w-6 h-6 text-primary" />
            </div>
            <span className="px-3 py-1 bg-muted rounded-full text-xs font-bold text-muted-foreground tracking-wide uppercase">
              {course.category}
            </span>
          </div>
          
          <h1 className="text-3xl font-extrabold mb-3">{course.title}</h1>
          <p className="text-muted-foreground text-lg mb-6 max-w-2xl">{course.description}</p>
          
          <div className="flex items-center gap-4 bg-background border border-border rounded-2xl p-4 max-w-md">
            <div className="flex-1">
              <div className="flex justify-between text-sm font-bold mb-2">
                <span>Course Progress</span>
                <span className="text-primary">{Math.round((completedChapters.length / (course.chapters.length + 1)) * 100)}%</span>
              </div>
              <div className="w-full h-2.5 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary rounded-full transition-all duration-1000"
                  style={{ width: `${(completedChapters.length / (course.chapters.length + 1)) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* WHAT YOU'LL LEARN */}
      <div className="bg-[#f8faf8] border border-[#e8f5e9] rounded-3xl p-8 mb-12">
        <h2 className="text-xl font-bold flex items-center gap-2 mb-4 text-[#1b4332]">
          <BookOpen className="w-5 h-5 text-primary" /> What You'll Learn
        </h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {course.learnings.map((learning, i) => (
            <li key={i} className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <span className="text-foreground/90 font-medium">{learning}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* ZIGZAG CHAPTER PATH */}
      <div className="relative py-8 px-4 md:px-12">
        {course?.chapters?.map((chapter, index) => {
          const isCompleted = completedChapters.includes(chapter.id);
          const isNext = !isCompleted && (index === 0 || completedChapters.includes(course.chapters[index - 1].id));
          const isLocked = !isCompleted && !isNext;
          const isLeft = index % 2 === 0;

          return (
            <div key={chapter.id} className={`relative flex items-center mb-16 ${isLeft ? 'justify-start md:pr-1/2' : 'justify-end md:pl-1/2'}`}>
              
              {/* Connector Line (except for last item) */}
              {index < (course.chapters.length - 1) && (
                <svg className="absolute w-full h-32 -bottom-20 left-0 hidden md:block pointer-events-none" preserveAspectRatio="none" viewBox="0 0 100 100">
                  <path 
                    d={isLeft ? "M 50 0 C 80 50, 20 50, 50 100" : "M 50 0 C 20 50, 80 50, 50 100"} 
                    fill="none" 
                    stroke={isCompleted ? "#52b788" : "#e2e8f0"} 
                    strokeWidth="4" 
                    strokeDasharray={isCompleted ? "none" : "8,8"}
                  />
                </svg>
              )}

              {/* Node Card */}
              <div 
                onClick={() => !isLocked && onSelectChapter(chapter.id)}
                className={`relative z-10 w-full md:w-[400px] bg-card rounded-2xl border-2 p-5 transition-all duration-300 flex items-center gap-4 group ${
                  isLocked ? 'border-border/50 opacity-70 cursor-not-allowed bg-muted/20' : 
                  isNext ? 'border-primary cursor-pointer shadow-lg shadow-primary/10 hover:-translate-y-1 bg-white' : 
                  'border-primary/30 cursor-pointer hover:border-primary hover:shadow-md bg-white'
                }`}
              >
                {/* Status Icon Indicator */}
                <div className={`w-12 h-12 shrink-0 rounded-full flex items-center justify-center border-4 border-background shadow-sm ${
                  isLocked ? 'bg-muted text-muted-foreground' :
                  isCompleted ? 'bg-primary text-primary-foreground' :
                  'bg-primary/20 text-primary'
                }`}>
                  {isCompleted ? <CheckCircle2 className="w-6 h-6" /> : 
                   isLocked ? <Lock className="w-5 h-5" /> : 
                   <span className="font-bold text-lg">{index + 1}</span>}
                </div>

                <div className="flex-1">
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">Chapter {index + 1}</p>
                  <h3 className={`font-bold ${isLocked ? 'text-muted-foreground' : 'text-foreground'} line-clamp-1`}>{chapter.title}</h3>
                </div>

                {!isLocked && !isCompleted && (
                  <button className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors shrink-0">
                    <PlayCircle className="w-6 h-6" />
                  </button>
                )}
              </div>
            </div>
          );
        })}

        {/* FINAL QUIZ NODE */}
        <div className="relative flex items-center justify-center mt-8">
          <div 
            onClick={() => isQuizUnlocked && onSelectChapter('quiz')}
            className={`relative z-10 w-full md:w-[450px] bg-card rounded-3xl border-2 p-6 text-center transition-all duration-300 ${
              !isQuizUnlocked ? 'border-border opacity-70 cursor-not-allowed bg-muted/20' : 
              quizScore !== null ? 'border-green-500 cursor-pointer bg-green-50/50' :
              'border-primary shadow-xl shadow-primary/20 cursor-pointer hover:-translate-y-1 hover:scale-105 bg-gradient-to-b from-white to-primary/5'
            }`}
          >
            <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 ${
              !isQuizUnlocked ? 'bg-muted text-muted-foreground' :
              quizScore !== null ? 'bg-green-100 text-green-600' :
              'bg-primary text-primary-foreground shadow-lg shadow-primary/30'
            }`}>
              {quizScore !== null ? <CheckCircle2 className="w-8 h-8" /> : 
               !isQuizUnlocked ? <Lock className="w-6 h-6" /> : 
               <Award className="w-8 h-8" />}
            </div>
            <h3 className={`text-2xl font-black mb-2 ${!isQuizUnlocked ? 'text-muted-foreground' : 'text-foreground'}`}>
              Final Certification Quiz
            </h3>
            <p className="text-muted-foreground font-medium mb-4">
              {quizScore !== null ? `You scored ${quizScore}/${course.finalQuiz.length}` : 
               !isQuizUnlocked ? 'Complete all chapters to unlock' : 'Test your knowledge to earn a badge!'}
            </p>
            {isQuizUnlocked && (
              <button className="w-full py-3 bg-primary text-primary-foreground font-bold rounded-xl hover:bg-primary/90 transition-colors">
                {quizScore !== null ? 'Review Results' : 'Start Final Quiz'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
