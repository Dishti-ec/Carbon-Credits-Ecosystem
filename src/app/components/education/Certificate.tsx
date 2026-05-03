import { useUserRole } from "../../context/UserProvider";
import { Leaf } from "lucide-react";

export function Certificate({ courseTitle }: { courseTitle: string }) {
  const { fullName } = useUserRole();
  const date = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="w-full max-w-4xl mx-auto bg-white p-4 md:p-6 rounded-xl shadow-2xl relative overflow-hidden aspect-[1.414/1] text-center font-serif text-slate-800" style={{ backgroundImage: 'radial-gradient(#f8fafc, #e2e8f0)' }}>
      {/* Outer Border */}
      <div className="absolute inset-4 border-[12px] border-slate-800 flex items-center justify-center p-2">
        {/* Inner Border */}
        <div className="w-full h-full border-[2px] border-slate-600 flex flex-col items-center justify-center p-6 relative bg-white/90 backdrop-blur-sm shadow-inner">
          
          {/* Logo / Header */}
          <div className="absolute top-6 left-6 flex flex-col items-center">
             <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-1 shadow-sm border border-blue-200">
               <Leaf className="w-6 h-6 text-blue-600" />
             </div>
             <span className="text-[8px] font-bold tracking-widest text-blue-800 uppercase">CarbonBridge</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-serif italic font-bold mb-6 text-slate-800" style={{ fontFamily: '"Playfair Display", "Times New Roman", serif' }}>
            Certificate of Completion
          </h1>
          
          <p className="text-xs md:text-sm text-slate-500 uppercase tracking-widest mb-4">
            This document verifies that
          </p>
          
          <h2 className="text-2xl md:text-4xl text-slate-900 border-b-2 border-slate-300 pb-2 px-12 mb-4" style={{ fontFamily: '"Dancing Script", "Brush Script MT", cursive', fontWeight: 700 }}>
            {fullName || "Certified User"}
          </h2>
          
          <p className="text-xs md:text-sm text-slate-600 max-w-2xl leading-relaxed mb-8">
            has successfully completed all requirements for the certified professional course from <strong className="text-slate-800">CarbonBridge Institute</strong>. Demonstrating advanced understanding and practical knowledge in <strong className="text-slate-800">{courseTitle}</strong> to achieve sustainable objectives.
          </p>
          
          {/* Footer Signatures */}
          <div className="w-full max-w-xl flex justify-between items-end px-8 absolute bottom-8">
            <div className="flex flex-col items-center">
              <span className="text-xs text-slate-800 font-medium border-b border-slate-400 pb-1 px-4 mb-1">{date}</span>
              <span className="text-[10px] text-slate-500 uppercase tracking-wider">Date</span>
            </div>
            
            <div className="flex flex-col items-center">
              <span className="text-xl text-slate-800 border-b border-slate-400 pb-1 px-4 mb-1" style={{ fontFamily: '"Dancing Script", "Brush Script MT", cursive' }}>Dr. A. Sterling</span>
              <span className="text-[10px] text-slate-500 uppercase tracking-wider">Course Coordinator</span>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
