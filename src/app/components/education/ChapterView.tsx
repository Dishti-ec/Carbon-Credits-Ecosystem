import { useState } from "react";
import { ArrowLeft, CheckCircle2, Check, Sparkles, Volume2, BookOpen } from "lucide-react";
import { Chapter } from "./data";

interface ChapterViewProps {
  chapter: Chapter;
  chapterIndex: number;
  totalChapters: number;
  onBack: () => void;
  onComplete: () => void;
  isCompleted: boolean;
}

export function ChapterView({ chapter, chapterIndex, totalChapters, onBack, onComplete, isCompleted }: ChapterViewProps) {
  const [showAiSummary, setShowAiSummary] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleAnswerSelect = (index: number) => {
    setSelectedAnswer(index);
    setShowFeedback(true);
  };

  const isCorrect = selectedAnswer === chapter.quizQuestion.correctAnswer;

  return (
    <div className="max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-500 font-[Inter,DM_Sans,sans-serif] pb-24">
      {/* Top Nav */}
      <div className="flex items-center justify-between mb-8">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Roadmap
        </button>
        <div className="flex items-center gap-4">
          <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider bg-muted px-3 py-1 rounded-full">
            Chapter {chapterIndex + 1} of {totalChapters}
          </span>
          <button className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            <Volume2 className="w-4 h-4" /> Listen
          </button>
        </div>
      </div>

      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold text-foreground mb-4 leading-tight">{chapter.title}</h1>
        <p className="text-xl text-muted-foreground font-medium leading-relaxed border-l-4 border-primary pl-4">
          {chapter.intro}
        </p>
      </div>

      {/* Core Content */}
      <div className="prose prose-lg max-w-none text-foreground/90 mb-12">
        <p className="leading-relaxed">{chapter.concept}</p>
      </div>

      {/* Key Points */}
      <div className="bg-[#f8faf8] border border-[#e8f5e9] rounded-2xl p-6 mb-12">
        <h3 className="text-lg font-bold flex items-center gap-2 mb-4 text-[#1b4332]">
          <BookOpen className="w-5 h-5 text-primary" /> Key Takeaways
        </h3>
        <ul className="space-y-3">
          {chapter.keyPoints.map((point, i) => (
            <li key={i} className="flex items-start gap-3">
              <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <span className="font-medium">{point}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* AI Summary Toggle */}
      <div className="mb-12">
        <button 
          onClick={() => setShowAiSummary(!showAiSummary)}
          className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-purple-50 to-blue-50 text-purple-700 border border-purple-100 rounded-xl font-bold text-sm hover:shadow-md transition-all group"
        >
          <Sparkles className="w-4 h-4 text-purple-500 group-hover:scale-110 transition-transform" /> 
          {showAiSummary ? "Hide Simplified Summary" : "Simplify this topic with AI"}
        </button>
        
        {showAiSummary && (
          <div className="mt-4 p-5 bg-purple-50 border border-purple-100 rounded-2xl animate-in slide-in-from-top-2 fade-in">
            <p className="text-purple-900 font-medium flex gap-3">
              <Sparkles className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
              <span><strong className="text-purple-700">In simple terms:</strong> {chapter.recap}</span>
            </p>
          </div>
        )}
      </div>

      {/* Mini Interaction */}
      <div className="bg-card border-2 border-border rounded-3xl p-8 mb-12 shadow-sm">
        <h3 className="text-xl font-bold mb-2">Did you understand?</h3>
        <p className="text-muted-foreground mb-6">{chapter.quizQuestion.question}</p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {chapter.quizQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(index)}
              disabled={showFeedback}
              className={`p-4 rounded-xl text-left font-medium border-2 transition-all ${
                selectedAnswer === index
                  ? isCorrect
                    ? "border-green-500 bg-green-50 text-green-800"
                    : "border-red-500 bg-red-50 text-red-800"
                  : showFeedback && index === chapter.quizQuestion.correctAnswer
                  ? "border-green-500 bg-green-50 text-green-800"
                  : "border-border hover:border-primary/50 bg-background"
              }`}
            >
              {option}
            </button>
          ))}
        </div>

        {showFeedback && (
          <div className={`mt-6 p-4 rounded-xl flex items-center gap-3 animate-in fade-in ${isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {isCorrect ? (
              <>
                <CheckCircle2 className="w-5 h-5" />
                <span className="font-bold">Correct! Great job.</span>
              </>
            ) : (
              <>
                <span className="font-bold">Not quite. The correct answer was: {chapter.quizQuestion.options[chapter.quizQuestion.correctAnswer]}</span>
              </>
            )}
          </div>
        )}
      </div>

      {/* Bottom Action */}
      <div className="flex justify-end pt-6 border-t border-border">
        <button
          onClick={onComplete}
          className={`flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-lg transition-all shadow-md hover:-translate-y-1 ${
            isCompleted 
              ? "bg-secondary text-secondary-foreground hover:bg-secondary/80" 
              : "bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-primary/20 hover:shadow-lg"
          }`}
        >
          {isCompleted ? "Return to Roadmap" : (
            <>
              Mark as Complete <CheckCircle2 className="w-5 h-5" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
