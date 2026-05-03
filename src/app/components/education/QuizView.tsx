import { useState, useEffect } from "react";
import { ArrowLeft, CheckCircle2, Award, RotateCcw, ArrowRight, Download } from "lucide-react";
import confetti from "canvas-confetti";
import { QuizQuestion } from "./data";
import { Certificate } from "./Certificate";

interface QuizViewProps {
  courseTitle: string;
  questions: QuizQuestion[];
  onBack: () => void;
  onComplete: (score: number) => void;
  previousScore: number | null;
}

export function QuizView({ courseTitle, questions, onBack, onComplete, previousScore }: QuizViewProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>(new Array(questions.length).fill(-1));
  const [isSubmitted, setIsSubmitted] = useState(previousScore !== null);
  
  // If previously completed, we just show the score immediately
  const score = isSubmitted ? selectedAnswers.filter((ans, i) => ans === questions[i].correctAnswer).length : 0;
  const displayScore = isSubmitted && previousScore === null ? score : previousScore !== null ? previousScore : 0;
  const passed = displayScore >= Math.ceil(questions.length * 0.6); // 60% to pass

  useEffect(() => {
    // If opening an already passed quiz, or if we just passed it
    if (isSubmitted && passed) {
      triggerConfetti();
    }
  }, [isSubmitted, passed]);

  const triggerConfetti = () => {
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#2d6a4f', '#52b788', '#d8f3dc', '#facc15']
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#2d6a4f', '#52b788', '#d8f3dc', '#facc15']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  };

  const handleSelect = (index: number) => {
    if (isSubmitted) return;
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = index;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(c => c + 1);
    } else {
      // Submit
      setIsSubmitted(true);
      const finalScore = selectedAnswers.filter((ans, i) => ans === questions[i].correctAnswer).length;
      onComplete(finalScore);
    }
  };

  const handleRetry = () => {
    setIsSubmitted(false);
    setCurrentQuestion(0);
    setSelectedAnswers(new Array(questions.length).fill(-1));
  };

  if (isSubmitted) {
    return (
      <div className="max-w-4xl mx-auto animate-in zoom-in-95 fade-in duration-500 text-center py-8">
        <div className="w-24 h-24 mx-auto bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6 shadow-xl shadow-green-100">
          {passed ? <Award className="w-12 h-12" /> : <RotateCcw className="w-12 h-12" />}
        </div>
        
        <h1 className="text-3xl font-extrabold mb-3">{passed ? "Course Completed!" : "Keep Trying!"}</h1>
        <p className="text-lg text-muted-foreground mb-6">
          You scored <strong className="text-foreground">{displayScore} out of {questions.length}</strong>
        </p>

        {passed && (
          <div className="mb-10 animate-in slide-in-from-bottom-8 duration-700 delay-300 fill-mode-both">
            <div className="bg-gradient-to-r from-yellow-100 to-amber-100 border border-yellow-200 text-amber-900 px-6 py-3 rounded-2xl mb-8 shadow-sm inline-block">
              <p className="font-bold flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-600" />
                Badge Unlocked: Certified Carbon Learner 🌱
              </p>
            </div>
            
            {/* The Certificate */}
            <div className="relative group">
              <Certificate courseTitle={courseTitle} />
              <div className="absolute inset-0 bg-black/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-xl">
                <button className="flex items-center gap-2 bg-white text-slate-900 px-6 py-3 rounded-xl font-bold shadow-2xl hover:scale-105 transition-transform">
                  <Download className="w-5 h-5" /> Download Certificate
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="flex items-center justify-center gap-4 mt-8">
          <button 
            onClick={handleRetry}
            className="px-6 py-3 bg-muted text-foreground font-bold rounded-xl hover:bg-muted/80 transition-colors flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" /> {passed ? "Retake for Fun" : "Retry Quiz"}
          </button>
          <button 
            onClick={onBack}
            className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
          >
            Return to Courses
          </button>
        </div>
      </div>
    );
  }

  const q = questions[currentQuestion];
  const hasAnswered = selectedAnswers[currentQuestion] !== -1;

  return (
    <div className="max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-500 font-[Inter,DM_Sans,sans-serif] pb-24">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Leave Quiz
        </button>
        <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider bg-muted px-3 py-1 rounded-full">
          Question {currentQuestion + 1} of {questions.length}
        </span>
      </div>

      {/* Progress */}
      <div className="w-full h-2 bg-muted rounded-full overflow-hidden mb-12">
        <div 
          className="h-full bg-primary transition-all duration-300"
          style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
        ></div>
      </div>

      {/* Question */}
      <div className="mb-10">
        <h2 className="text-3xl font-extrabold leading-tight text-foreground">{q.question}</h2>
      </div>

      {/* Options */}
      <div className="space-y-3 mb-12">
        {q.options.map((option, index) => {
          const isSelected = selectedAnswers[currentQuestion] === index;
          return (
            <button
              key={index}
              onClick={() => handleSelect(index)}
              className={`w-full p-5 text-left rounded-2xl border-2 font-medium text-lg transition-all flex items-center justify-between group ${
                isSelected 
                  ? "border-primary bg-primary/5 text-primary shadow-sm" 
                  : "border-border bg-card hover:border-primary/40"
              }`}
            >
              <span>{option}</span>
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                isSelected ? "border-primary bg-primary" : "border-muted-foreground/30 group-hover:border-primary/40"
              }`}>
                {isSelected && <div className="w-2.5 h-2.5 bg-white rounded-full"></div>}
              </div>
            </button>
          )
        })}
      </div>

      {/* Footer */}
      <div className="flex justify-end pt-6 border-t border-border">
        <button
          onClick={handleNext}
          disabled={!hasAnswered}
          className={`flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-lg transition-all ${
            hasAnswered 
              ? "bg-primary text-primary-foreground hover:bg-primary/90 hover:-translate-y-1 shadow-lg shadow-primary/20 cursor-pointer" 
              : "bg-muted text-muted-foreground cursor-not-allowed"
          }`}
        >
          {currentQuestion === questions.length - 1 ? "Submit Quiz" : "Next Question"} <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
