import { useState, useEffect } from "react";
import { ArrowLeft, CheckCircle2, Check, Sparkles, Volume2, BookOpen, PlayCircle, Lock } from "lucide-react";
import { Chapter, Course } from "./data";

interface ChapterViewProps {
  course: Course;
  chapter: Chapter;
  chapterIndex: number;
  totalChapters: number;
  completedChapters: number[];
  onSelectChapter: (id: number | 'quiz') => void;
  onBack: () => void;
  onComplete: () => void;
  isCompleted: boolean;
}

export function ChapterView({ course, chapter, chapterIndex, totalChapters, completedChapters, onSelectChapter, onBack, onComplete, isCompleted }: ChapterViewProps) {
  const [showAiSummary, setShowAiSummary] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleAnswerSelect = (index: number) => {
    setSelectedAnswer(index);
    setShowFeedback(true);
  };

  const isCorrect = selectedAnswer === chapter.quizQuestion.correctAnswer;
  const progressPercent = Math.round((completedChapters.length / totalChapters) * 100);

  // Reset quiz state when chapter changes
  useEffect(() => {
    setSelectedAnswer(null);
    setShowFeedback(false);
    setShowAiSummary(false);
  }, [chapter.id]);

  return (
    <div className="fixed inset-0 z-[100] flex min-h-screen overflow-hidden font-body-md text-on-background selection:bg-secondary-container bg-background">
      <style>{`
        .glass-card {
            background: rgba(252, 249, 248, 0.7);
            backdrop-filter: blur(16px);
            border: 1px solid rgba(255, 255, 255, 0.4);
            box-shadow: inset 1px 1px 0px rgba(255, 255, 255, 0.2);
        }
        .mist-bg {
            background: linear-gradient(135deg, #fcf9f8 0%, #e2eeea 100%);
        }
        .step-line::before {
            content: '';
            position: absolute;
            left: 11px;
            top: 24px;
            bottom: -8px;
            width: 2px;
            background: #c0c9c1;
        }
        .step-line-last::before {
            display: none;
        }
      `}</style>
      
      {/* Background Decoration */}
      <div className="fixed top-0 right-0 -z-50 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-[10%] right-[-5%] w-[40%] h-[60%] bg-emerald-500/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[30%] h-[50%] bg-emerald-600/5 rounded-full blur-[100px]"></div>
      </div>

      {/* Sidebar Navigation */}
      <aside className="hidden md:flex flex-col h-screen w-72 border-r border-emerald-900/10 bg-emerald-950/5 backdrop-blur-2xl py-8 px-4 gap-y-4 z-40 shrink-0">
        <div className="flex items-center gap-3 px-2 mb-8 cursor-pointer group" onClick={onBack}>
          <div className="p-2 bg-emerald-100 rounded-full group-hover:bg-emerald-200 transition-colors">
             <ArrowLeft className="w-5 h-5 text-emerald-800" />
          </div>
          <span className="text-xl font-black tracking-tighter text-emerald-800 font-headline-lg line-clamp-1" title={course.title}>{course.title}</span>
        </div>
        
        <nav className="flex-1 space-y-2 overflow-y-auto pr-2">
          {course.chapters.map((ch, idx) => {
            const isChCompleted = completedChapters.includes(ch.id);
            const isCurrent = ch.id === chapter.id;
            const isNext = !isChCompleted && (idx === 0 || completedChapters.includes(course.chapters[idx - 1].id));
            const isLocked = !isChCompleted && !isNext && !isCurrent;
            const isLast = idx === course.chapters.length - 1;

            return (
              <div key={ch.id} 
                onClick={() => !isLocked && onSelectChapter(ch.id)}
                className={`relative ${isLast ? 'step-line-last' : 'step-line'} pl-8 pb-6 flex items-start gap-4 ${isLocked ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:opacity-80 transition-opacity'}`}>
                
                <div className={`absolute left-0 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold z-10 transition-all duration-300 ${
                  isCurrent ? 'bg-primary text-white scale-110 shadow-md ring-4 ring-primary/20' :
                  isChCompleted ? 'bg-emerald-600 text-white' : 
                  'border-2 border-outline-variant bg-surface text-outline'
                }`}>
                  {isChCompleted && !isCurrent ? <Check className="w-3.5 h-3.5" /> : (idx + 1)}
                </div>
                
                <div className="flex flex-col mt-0.5">
                  <span className={`text-xs font-bold ${isCurrent ? 'text-primary' : isChCompleted ? 'text-emerald-700' : 'text-on-surface opacity-60'}`}>
                    {isCurrent ? 'Current Lesson' : isChCompleted ? 'Completed' : `Chapter ${idx + 1}`}
                  </span>
                  <span className={`text-sm font-semibold line-clamp-2 ${isCurrent ? 'text-primary' : isChCompleted ? 'text-emerald-900' : 'text-on-surface'}`}>
                    {ch.title}
                  </span>
                </div>
              </div>
            );
          })}
        </nav>
        
        <div className="mt-auto p-4 rounded-xl bg-emerald-900/5 border border-emerald-900/10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center">
              <course.icon className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-bold text-primary">Your Progress</span>
          </div>
          <div className="w-full bg-white/50 rounded-full h-2 overflow-hidden mb-2">
            <div className="bg-emerald-600 h-full transition-all duration-500" style={{ width: `${progressPercent}%` }}></div>
          </div>
          <p className="text-xs text-emerald-900/60 font-medium">{completedChapters.length} of {totalChapters} Complete</p>
        </div>
      </aside>

      {/* Main Content Wrapper */}
      <main className="flex-1 flex flex-col h-screen mist-bg overflow-y-auto relative z-10">
        
        {/* TopAppBar */}
        <header className="flex justify-between items-center w-full px-4 md:px-8 h-16 sticky top-0 z-50 bg-emerald-950/10 backdrop-blur-lg border-b border-white/20 shrink-0">
          <div className="flex items-center gap-6">
            <button onClick={onBack} className="flex md:hidden items-center gap-2 text-emerald-900/60 hover:text-emerald-900 transition-colors text-sm font-bold">
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
            <div className="hidden md:block h-4 w-[1px] bg-emerald-900/10"></div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-emerald-900/60">Topic Progress</span>
              <div className="w-24 md:w-32 bg-white/30 rounded-full h-1.5 overflow-hidden">
                <div className="bg-emerald-600 h-full transition-all" style={{ width: `${(chapterIndex / totalChapters) * 100}%` }}></div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="hidden md:flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-900/20 hover:bg-white/20 transition-all text-xs font-bold text-emerald-900">
              <Volume2 className="w-4 h-4" />
              <span>Listen to Chapter</span>
            </button>
          </div>
        </header>

        {/* Page Canvas */}
        <div className="flex-1 w-full max-w-[1280px] mx-auto px-4 md:px-8 py-8 md:py-12">
          
          {/* Hero Section */}
          <section className="mb-16 md:mb-24">
            <div className="flex flex-col lg:flex-row gap-12 items-center">
              <div className="lg:w-1/2 space-y-6">
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[12px] font-bold uppercase tracking-wider">
                  Module 0{chapterIndex + 1}: {course.category}
                </span>
                <h1 className="text-4xl md:text-5xl font-extrabold text-primary leading-tight">
                  {chapter.title}
                </h1>
                <p className="text-lg text-on-surface-variant max-w-xl">
                  {chapter.intro}
                </p>
                <div className="flex flex-wrap gap-4 pt-2">
                  <div className="px-6 py-4 bg-white/60 backdrop-blur-md rounded-xl border-l-4 border-primary text-primary font-medium text-sm leading-relaxed shadow-sm">
                    {chapter.concept}
                  </div>
                </div>
              </div>
              <div className="lg:w-1/2 relative w-full mt-8 lg:mt-0">
                <div className="absolute -top-12 -right-12 w-64 h-64 bg-emerald-200/40 rounded-full blur-3xl -z-10"></div>
                <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-primary/10 rounded-full blur-3xl -z-10"></div>
                <div className="glass-card p-2 md:p-4 rounded-2xl border border-white/50 overflow-hidden group">
                  <div className="w-full aspect-[4/3] rounded-xl bg-gradient-to-br from-emerald-100 to-emerald-50 flex flex-col items-center justify-center p-8 text-center border border-white relative overflow-hidden">
                    <course.icon className="w-32 h-32 text-emerald-600/10 absolute -right-4 -bottom-4 group-hover:scale-110 transition-transform duration-700" />
                    <BookOpen className="w-16 h-16 text-emerald-700 mb-4 relative z-10" />
                    <h3 className="text-xl font-bold text-emerald-900 relative z-10">{course.title}</h3>
                    <p className="text-sm text-emerald-800/60 mt-2 relative z-10 font-bold uppercase tracking-widest">Chapter {chapterIndex + 1} Visual Guide</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Key Takeaways & Content Grid */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-24">
            <div className="lg:col-span-2 space-y-8">
              <div className="glass-card p-6 md:p-8 rounded-3xl">
                <h3 className="text-2xl font-bold text-primary mb-6 flex items-center gap-3">
                  <CheckCircle2 className="text-emerald-600 w-6 h-6" />
                  Key Learning Objectives
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {chapter.keyPoints.map((point, i) => (
                    <div key={i} className="flex gap-4 items-start">
                      <div className="p-2 rounded-lg bg-emerald-100 text-emerald-700 shrink-0">
                        <Check className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-primary mb-1">Takeaway 0{i + 1}</h4>
                        <p className="text-sm text-on-surface-variant leading-relaxed">{point}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Flashcard Section */}
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-primary px-2">Key Concepts</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  <div className="group h-56 [perspective:1000px] cursor-pointer">
                    <div className="relative h-full w-full transition-all duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                      <div className="absolute inset-0 bg-white p-6 rounded-2xl border border-emerald-100 shadow-sm flex flex-col justify-between [backface-visibility:hidden]">
                        <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest">Summary</span>
                        <h4 className="text-2xl font-bold text-primary leading-tight">{chapter.title} Recap</h4>
                        <span className="text-emerald-900/40 text-xs italic font-medium">Hover to reveal definition</span>
                      </div>
                      <div className="absolute inset-0 bg-primary p-6 rounded-2xl flex flex-col justify-center [backface-visibility:hidden] [transform:rotateY(180deg)] text-white shadow-lg">
                        <p className="text-sm leading-relaxed text-center font-medium">
                          {chapter.recap}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="group h-56 [perspective:1000px] cursor-pointer" onClick={() => setShowAiSummary(!showAiSummary)}>
                    <div className={`relative h-full w-full transition-all duration-700 [transform-style:preserve-3d] ${showAiSummary ? '[transform:rotateY(180deg)]' : 'group-hover:[transform:rotateY(180deg)]'}`}>
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-indigo-50 p-6 rounded-2xl border border-purple-100 shadow-sm flex flex-col justify-between [backface-visibility:hidden]">
                        <span className="text-xs font-bold text-purple-600 uppercase tracking-widest flex items-center gap-1"><Sparkles className="w-3 h-3"/> AI Simplified</span>
                        <h4 className="text-2xl font-bold text-purple-900 leading-tight">Need it simpler?</h4>
                        <span className="text-purple-900/40 text-xs italic font-medium">Hover or click to simplify</span>
                      </div>
                      <div className="absolute inset-0 bg-purple-600 p-6 rounded-2xl flex flex-col justify-center [backface-visibility:hidden] [transform:rotateY(180deg)] text-white shadow-lg">
                        <p className="text-sm leading-relaxed text-center font-medium">
                          {chapter.recap}
                        </p>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>

            {/* Sidebar Content: Quiz & Actions */}
            <aside className="space-y-8">
              <div className="bg-emerald-900 p-6 md:p-8 rounded-3xl text-white shadow-2xl relative overflow-hidden border border-emerald-800">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-2xl rounded-full"></div>
                <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-emerald-600/20 blur-3xl rounded-full"></div>
                
                <h3 className="text-2xl font-bold mb-4 relative z-10 text-white">Did you understand?</h3>
                <p className="text-emerald-100/70 text-sm mb-6 relative z-10">Test your knowledge on the core components before proceeding.</p>
                
                <div className="space-y-4 relative z-10">
                  <div className="text-sm font-bold text-emerald-300 uppercase tracking-widest">Question:</div>
                  <p className="text-base font-medium leading-relaxed">{chapter.quizQuestion.question}</p>
                  
                  <div className="grid grid-cols-1 gap-3 mt-4">
                    {chapter.quizQuestion.options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleAnswerSelect(index)}
                        disabled={showFeedback}
                        className={`w-full text-left p-3 md:p-4 rounded-xl border transition-all text-sm font-medium ${
                          selectedAnswer === index
                            ? isCorrect
                              ? "border-green-400 bg-green-500/30 text-white shadow-inner"
                              : "border-red-400 bg-red-500/30 text-white shadow-inner"
                            : showFeedback && index === chapter.quizQuestion.correctAnswer
                            ? "border-green-400 bg-green-500/30 text-white"
                            : "border-white/10 bg-white/5 hover:bg-white/10 text-white/90"
                        }`}
                      >
                        {String.fromCharCode(65 + index)}. {option}
                      </button>
                    ))}
                  </div>

                  {showFeedback && (
                    <div className={`mt-6 p-4 rounded-xl flex items-center gap-3 text-sm font-bold animate-in zoom-in-95 duration-300 ${isCorrect ? 'bg-green-500/20 text-green-300 border border-green-500/30' : 'bg-red-500/20 text-red-300 border border-red-500/30'}`}>
                      {isCorrect ? (
                        <><CheckCircle2 className="w-5 h-5 shrink-0" /> <span className="leading-tight">Correct! Excellent job.</span></>
                      ) : (
                        <><span className="leading-tight">Not quite. The correct answer was {String.fromCharCode(65 + chapter.quizQuestion.correctAnswer)}.</span></>
                      )}
                    </div>
                  )}

                </div>
              </div>

            </aside>
          </section>

          {/* Final Action Section */}
          <section className="flex flex-col md:flex-row items-center justify-between p-6 md:p-8 rounded-3xl bg-white shadow-sm border border-emerald-900/5 mb-12 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/3"></div>
            
            <div className="flex items-center gap-6 mb-6 md:mb-0 relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                <CheckCircle2 className="text-primary w-8 h-8" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-primary">
                  {chapterIndex < totalChapters - 1 ? `Ready for Chapter ${chapterIndex + 2}?` : 'Ready for the Final Quiz?'}
                </h3>
                <p className="text-base text-on-surface-variant mt-1 font-medium">Complete this section to unlock the next part of the course.</p>
              </div>
            </div>
            
            <button 
              onClick={() => {
                if (!isCompleted && showFeedback && isCorrect) {
                  onComplete();
                } else if (isCompleted) {
                  onBack();
                }
              }}
              disabled={!isCompleted && (!showFeedback || !isCorrect)}
              className={`relative z-10 w-full md:w-auto px-10 py-4 rounded-xl font-bold flex items-center justify-center gap-3 transition-all ${
                isCompleted 
                  ? "bg-secondary text-white hover:bg-secondary/90 shadow-lg" 
                  : showFeedback && isCorrect
                  ? "bg-primary text-white hover:-translate-y-1 hover:shadow-xl shadow-lg"
                  : "bg-muted text-muted-foreground cursor-not-allowed opacity-70"
              }`}
            >
              {isCompleted ? (
                "Return to Roadmap"
              ) : showFeedback && isCorrect ? (
                <>Mark as Complete <Check className="w-5 h-5" /></>
              ) : (
                <>Pass the quiz to complete <Lock className="w-4 h-4" /></>
              )}
            </button>
          </section>
          
        </div>
      </main>
    </div>
  );
}
