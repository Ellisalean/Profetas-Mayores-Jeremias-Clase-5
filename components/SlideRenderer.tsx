
import React, { useState, useEffect } from 'react';
import { Slide, RevealItem } from '../types';
import * as LucideIcons from 'lucide-react';
import { useLessonStore } from '../store/useLessonStore';

interface SlideRendererProps {
  slide: Slide;
}

const SlideRenderer: React.FC<SlideRendererProps> = ({ slide }) => {
  if (!slide) return null;

  const { markSlideComplete, currentSlideIndex, resetLesson, nextSlide } = useLessonStore();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [expandedItem, setExpandedItem] = useState<RevealItem | null>(null);
  const [viewedItems, setViewedItems] = useState<Set<number>>(new Set());
  
  const [internalStep, setInternalStep] = useState(0);
  const [activeTab, setActiveTab] = useState(0);
  const [activeHotspot, setActiveHotspot] = useState<RevealItem | null>(null);
  const [activeMenuItem, setActiveMenuItem] = useState<number>(0);

  const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({});
  const [isAppClosing, setIsAppClosing] = useState(false);

  const [quizQuestionIdx, setQuizQuestionIdx] = useState(0);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [isCorrectFeedback, setIsCorrectFeedback] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [showQuizSummary, setShowQuizSummary] = useState(false);

  useEffect(() => {
    setInternalStep(0);
    setActiveTab(0);
    setActiveHotspot(null);
    setActiveMenuItem(0);
    setSelectedOption(null);
    setExpandedItem(null);
    setFlippedCards({});
    setIsAppClosing(false);
    setViewedItems(new Set());
    setQuizQuestionIdx(0);
    setShowFeedbackModal(false);
    setCorrectCount(0);
    setIncorrectCount(0);
    setShowQuizSummary(false);
  }, [currentSlideIndex, slide.id]);

  const handleAbandon = () => setIsAppClosing(true);

  const toggleCard = (idx: number) => {
    setFlippedCards(prev => {
      const newState = { ...prev, [idx]: !prev[idx] };
      const flippedCount = Object.values(newState).filter(Boolean).length;
      if (flippedCount >= 1) markSlideComplete(currentSlideIndex);
      return newState;
    });
  };

  const openGridPopup = (item: RevealItem, idx: number) => {
    setExpandedItem(item);
    setViewedItems(prev => {
      const next = new Set(prev);
      next.add(idx);
      if (next.size === slide.interaction?.revealItems?.length) markSlideComplete(currentSlideIndex);
      return next;
    });
  };

  const renderIcon = (iconName: string, size = 24, color = "currentColor") => {
    const IconComponent = (LucideIcons as any)[iconName];
    if (IconComponent && (typeof IconComponent === 'function' || typeof IconComponent === 'object')) {
      return <IconComponent size={size} color={color} />;
    }
    return <LucideIcons.Info size={size} color={color} />;
  };

  const isBg = slide.visual.position === 'background';

  if (isAppClosing) {
    return (
      <div className="fixed inset-0 z-[200] bg-black flex flex-col items-center justify-center">
         <div className="w-24 h-24 bg-red-600 rounded-full animate-ping opacity-25 absolute" />
         <p className="text-white font-black uppercase tracking-[0.8em] animate-pulse">Sesión Finalizada</p>
      </div>
    );
  }

  if (slide.type === 'completion') {
    return (
      <div className="h-full w-full relative flex items-center justify-center overflow-hidden bg-[#111111] p-6 lg:p-12">
         <div className="absolute inset-0 z-0">
           <img src={slide.visual.source} className="w-full h-full object-cover opacity-20" alt="" />
           <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-[#111111]" />
         </div>
         <div className="relative z-10 text-center space-y-6 lg:space-y-8 animate-in zoom-in-95 duration-1000 max-w-3xl flex flex-col items-center">
            <div className="inline-block p-4 bg-red-600 rounded-[2rem] shadow-[0_0_40px_rgba(239,68,68,0.4)] animate-bounce mb-4">
               {renderIcon('Trophy', 48)}
            </div>
            <div className="space-y-3">
              <h2 className="text-4xl lg:text-6xl font-black uppercase tracking-tighter text-white leading-none drop-shadow-2xl">{slide.title}</h2>
              <p className="text-lg lg:text-xl font-bold text-red-500 uppercase tracking-[0.4em]">{slide.subtitle}</p>
            </div>
            <div className="space-y-4">
              <p className="text-lg lg:text-xl font-light text-slate-300 leading-relaxed opacity-95 max-w-2xl mx-auto drop-shadow-lg">{slide.content}</p>
            </div>
            <div className="flex flex-wrap justify-center gap-4 pt-6">
               <button onClick={resetLesson} className="px-8 py-4 bg-white/5 border border-white/10 rounded-full font-black uppercase text-[10px] tracking-[0.3em] hover:bg-red-600 transition-all flex items-center gap-3">
                 {renderIcon('RotateCcw', 14)} Reiniciar Curso
               </button>
               <button onClick={handleAbandon} className="px-8 py-4 bg-red-600 rounded-full font-black uppercase text-[10px] tracking-[0.3em] shadow-xl hover:scale-105 transition-all">
                 Finalizar Sesión
               </button>
            </div>
         </div>
      </div>
    );
  }

  if (slide.type === 'quiz' && slide.interaction?.options) {
    const questions = slide.interaction.options;
    if (showQuizSummary) {
      const score = Math.round((correctCount / questions.length) * 100);
      return (
        <div className="h-full w-full bg-white flex flex-col items-center justify-center p-8 lg:p-24 animate-in zoom-in-95 duration-500 text-[#1e293b]">
          <div className="w-full max-w-4xl bg-slate-50 rounded-[3rem] border border-slate-100 overflow-hidden shadow-2xl flex flex-col md:flex-row">
            <div className="bg-[#1e293b] p-12 text-white flex flex-col items-center justify-center space-y-6 md:w-1/3">
              <div className="p-5 bg-red-600 rounded-3xl shadow-lg">{renderIcon('Trophy', 48, 'white')}</div>
              <div className="text-center">
                <span className="text-5xl font-black">{score}%</span>
                <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">Puntaje Final</p>
              </div>
            </div>
            <div className="flex-1 p-12 lg:p-16 space-y-8">
              <div className="space-y-2">
                <h3 className="text-4xl font-black uppercase tracking-tight text-[#111]">¡Evaluación Finalizada!</h3>
                <p className="text-lg text-slate-500 font-medium">Has completado la evaluación del módulo.</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm">
                  <span className="block text-2xl font-black text-green-600">{correctCount}</span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Correctas</span>
                </div>
                <div className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm">
                  <span className="block text-2xl font-black text-red-500">{incorrectCount}</span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Incorrectas</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-4 pt-4">
                <button onClick={() => { setQuizQuestionIdx(0); setCorrectCount(0); setIncorrectCount(0); setShowQuizSummary(false); }} className="px-8 py-4 bg-slate-200 text-slate-700 rounded-full font-black uppercase text-[10px] tracking-widest hover:bg-slate-300 transition-all">Reiniciar Test</button>
                <button onClick={() => { markSlideComplete(currentSlideIndex); nextSlide(); }} className="px-10 py-4 bg-red-600 text-white rounded-full font-black uppercase text-[10px] tracking-widest shadow-xl hover:scale-105 transition-all">Continuar</button>
              </div>
            </div>
          </div>
        </div>
      );
    }
    const currentQuestion = questions[quizQuestionIdx];
    return (
      <div className="h-full w-full relative bg-white flex flex-col lg:flex-row overflow-hidden">
        <div className="flex-1 p-12 lg:p-20 flex flex-col justify-center text-[#1e293b] space-y-10 animate-in fade-in duration-500">
           <div className="space-y-4">
              <h2 className="text-3xl lg:text-4xl font-black uppercase tracking-tight text-[#111]">Evaluación de Módulo</h2>
              <p className="text-lg lg:text-xl font-bold leading-relaxed max-w-2xl text-slate-500">{currentQuestion.label}</p>
           </div>
           <div className="space-y-4 max-w-xl">
              {currentQuestion.options?.map((opt) => (
                <button key={opt.id} onClick={() => setSelectedOption(opt.id)} className={`w-full flex items-center gap-5 p-5 rounded-2xl border-2 transition-all ${selectedOption === opt.id ? 'border-blue-600 bg-blue-50/30' : 'border-slate-100 hover:border-blue-200'}`}>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 ${selectedOption === opt.id ? 'border-blue-600 bg-white' : 'border-slate-200 bg-white'}`}>
                    {selectedOption === opt.id && <div className="w-2.5 h-2.5 bg-blue-600 rounded-full" />}
                  </div>
                  <span className={`text-base lg:text-lg font-bold text-left ${selectedOption === opt.id ? 'text-blue-900' : 'text-slate-500'}`}>{opt.label}</span>
                </button>
              ))}
           </div>
           <button onClick={() => {
             const opt = currentQuestion.options?.find(o => o.id === selectedOption);
             setIsCorrectFeedback(!!opt?.isCorrect);
             if (opt?.isCorrect) setCorrectCount(c => c+1); else setIncorrectCount(c => c+1);
             setShowFeedbackModal(true);
           }} disabled={!selectedOption} className={`px-12 py-5 rounded-full font-black uppercase text-[10px] tracking-[0.3em] transition-all shadow-xl ${!selectedOption ? 'bg-slate-300 text-slate-500 cursor-not-allowed' : 'bg-[#1e293b] text-white hover:scale-105'}`}>Comprobar Respuesta</button>
        </div>
        <div className="hidden lg:flex w-[35%] bg-[#e2e8f0] relative items-center justify-center">
            <span className="text-[25rem] font-black text-white opacity-15">?</span>
        </div>
        {showFeedbackModal && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
            <div className={`relative w-full max-w-xl bg-white shadow-2xl rounded-3xl overflow-hidden flex flex-col border-t-8 ${isCorrectFeedback ? 'border-green-500' : 'border-red-500'} animate-in zoom-in-95 duration-300`}>
               <div className="p-10 lg:p-12 space-y-6 text-center">
                  <div className={`w-16 h-16 rounded-full mx-auto flex items-center justify-center ${isCorrectFeedback ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                    {renderIcon(isCorrectFeedback ? 'CheckCircle' : 'XCircle', 32)}
                  </div>
                  <h3 className={`text-3xl font-black uppercase tracking-tight ${isCorrectFeedback ? 'text-green-600' : 'text-red-600'}`}>
                    {isCorrectFeedback ? '¡Correcto!' : 'Incorrecto'}
                  </h3>
                  <p className="text-lg text-slate-600 leading-relaxed font-medium">
                    {currentQuestion.options?.find(o => o.id === selectedOption)?.feedback}
                  </p>
                  <button onClick={() => { setShowFeedbackModal(false); setSelectedOption(null); if (quizQuestionIdx < questions.length - 1) setQuizQuestionIdx(q => q+1); else setShowQuizSummary(true); }} className="px-12 py-5 bg-[#1e293b] text-white rounded-full font-black uppercase text-[10px] tracking-widest">Siguiente</button>
               </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // --- RENDERS FOR OTHER SLIDE TYPES ---
  const renderSlideContent = () => {
    switch (slide.type) {
      case 'intro':
        return (
          <div className="w-full h-full flex items-center justify-center p-8 lg:p-20 text-center space-y-10 animate-in zoom-in-95 duration-700 max-w-5xl px-6">
            <div className="space-y-4">
              <h1 className="text-6xl lg:text-9xl font-black uppercase tracking-tighter text-white leading-none drop-shadow-2xl">{slide.title}</h1>
              <p className="text-2xl lg:text-4xl font-bold text-red-500 uppercase tracking-[0.3em]">{slide.subtitle}</p>
              <div className="w-32 h-2 bg-red-600 mx-auto rounded-full mt-6" />
              <p className="text-2xl lg:text-3xl font-light text-slate-100 leading-relaxed max-w-4xl mx-auto opacity-100 pt-6">{slide.content}</p>
            </div>
          </div>
        );
      case 'hermeneutics':
        return (
          <div className="w-full flex flex-col gap-12 p-12">
            <div className="space-y-6 max-w-5xl text-left">
               <h2 className="text-5xl lg:text-7xl font-black uppercase tracking-tighter text-white">{slide.title}</h2>
               <div className="w-24 h-2 bg-red-600 rounded-full" />
               <p className="text-xl lg:text-3xl font-light opacity-90 leading-relaxed italic text-slate-300 border-l-8 border-red-600 pl-8">"{slide.content}"</p>
            </div>
            <div className="flex flex-col lg:flex-row gap-10 items-stretch h-full">
               <div className="lg:w-[40%] relative group rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl min-h-[300px]">
                  <img src={slide.visual.source} className="w-full h-full object-cover" alt="" />
               </div>
               <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {slide.interaction?.revealItems?.map((item, i) => (
                    <button key={i} onClick={() => setExpandedItem(item)} className="flex items-center gap-5 p-6 bg-white/5 rounded-[2.5rem] border border-white/5 transition-all hover:bg-white/10 hover:border-red-600/40 text-left">
                       <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-white">{renderIcon(item.icon, 24)}</div>
                       <div className="text-white">
                          <span className="block font-black uppercase text-[10px] tracking-widest opacity-50 mb-1">{item.title}</span>
                          <span className="block font-bold text-sm tracking-tight">{item.text}</span>
                       </div>
                    </button>
                  ))}
               </div>
            </div>
          </div>
        );
      case 'timeline':
        return (
          <div className="w-full h-full flex flex-col p-12 lg:p-16">
             <div className="mb-12 text-left shrink-0">
                <h2 className="text-4xl lg:text-6xl font-black uppercase tracking-tighter text-white">{slide.title}</h2>
                <div className="w-24 h-2 bg-red-600 rounded-full mt-4" />
                <p className="text-xs font-bold text-red-500 uppercase tracking-[0.4em] mt-3">{slide.subtitle}</p>
             </div>
             <div className="flex-1 relative flex flex-col lg:flex-row gap-12 min-h-0">
                <div className="w-full lg:w-1/3 overflow-y-auto pr-4 custom-scrollbar space-y-4">
                   {slide.interaction?.revealItems?.map((item, idx) => (
                      <button key={idx} onClick={() => { setActiveTab(idx); markSlideComplete(currentSlideIndex); }} className={`w-full p-8 rounded-[2rem] border transition-all duration-500 text-left flex items-start gap-6 ${activeTab === idx ? 'bg-red-600 border-red-500 shadow-2xl scale-105' : 'bg-white/5 border-white/5 hover:bg-white/10'}`}>
                         <div className={`p-4 rounded-2xl shrink-0 ${activeTab === idx ? 'bg-white/20' : 'bg-red-600/20 text-red-500'}`}>{renderIcon(item.icon, 24)}</div>
                         <div>
                            <h4 className={`text-xl font-black uppercase tracking-tight ${activeTab === idx ? 'text-white' : 'text-slate-200'}`}>{item.title}</h4>
                            <p className={`text-sm font-bold opacity-60 ${activeTab === idx ? 'text-white' : 'text-red-500'}`}>{item.text}</p>
                         </div>
                      </button>
                   ))}
                </div>
                <div className="flex-1 bg-[#1a1a1a] rounded-[4rem] border border-white/10 shadow-2xl overflow-hidden flex flex-col lg:flex-row">
                   <div className="flex-[1.2] p-12 lg:p-20 overflow-y-auto custom-scrollbar flex flex-col gap-10">
                      <div key={activeTab} className="space-y-10 animate-in fade-in duration-500">
                         <h3 className="text-4xl lg:text-5xl font-black text-white uppercase tracking-tighter">{slide.interaction?.revealItems?.[activeTab].title}</h3>
                         <p className="text-2xl font-black text-red-500 italic border-l-8 border-red-500 pl-8 bg-red-500/5 py-4 rounded-r-2xl">"{slide.interaction?.revealItems?.[activeTab].text}"</p>
                         <p className="text-xl lg:text-2xl font-light text-slate-300 leading-relaxed">{slide.interaction?.revealItems?.[activeTab].longContent}</p>
                      </div>
                   </div>
                   <div className="flex-1 relative min-h-[400px]">
                      <img key={activeTab} src={slide.interaction?.revealItems?.[activeTab].image} className="absolute inset-0 w-full h-full object-cover" alt="" />
                      <div className="absolute inset-0 bg-gradient-to-r from-[#1a1a1a] via-transparent to-transparent hidden lg:block" />
                   </div>
                </div>
             </div>
          </div>
        );
      case 'flashcards':
        return (
          <div className="w-full h-full flex flex-col p-6 lg:p-10">
             <div className="mb-4 text-center shrink-0">
                <h2 className="text-3xl lg:text-5xl font-black uppercase tracking-tighter text-white">{slide.title}</h2>
                <p className="text-[9px] font-black text-red-500 uppercase tracking-[0.4em] mt-2">{slide.subtitle}</p>
             </div>
             <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6 items-center justify-center py-2">
                {slide.interaction?.revealItems?.map((item, idx) => (
                  <div key={idx} onClick={() => toggleCard(idx)} className="perspective-1000 h-[380px] lg:h-[420px] w-full group cursor-pointer">
                    <div className={`relative w-full h-full transition-transform duration-700 transform-style-3d ${flippedCards[idx] ? 'rotate-y-180' : ''}`}>
                      <div className="absolute inset-0 backface-hidden bg-[#222222] rounded-[2.5rem] border border-white/10 overflow-hidden shadow-2xl flex flex-col">
                         <img src={item.image} className="flex-1 object-cover opacity-60" alt="" />
                         <div className="p-6 text-center space-y-3">
                            <h4 className="text-lg font-black uppercase tracking-tight text-white">{item.title}</h4>
                            <span className="text-[7px] font-black text-red-500 uppercase tracking-widest block opacity-50">Toca para descubrir</span>
                         </div>
                      </div>
                      <div className="absolute inset-0 backface-hidden bg-red-600 rounded-[2.5rem] border border-white/20 shadow-2xl rotate-y-180 flex flex-col items-center justify-center p-8 text-center overflow-hidden">
                         <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/60 mb-4">Concepto Clave</h4>
                         <p className="text-lg lg:text-xl font-bold text-white leading-relaxed">{item.text}</p>
                         <p className="mt-4 text-sm text-white/80 font-light">{item.longContent}</p>
                      </div>
                    </div>
                  </div>
                ))}
             </div>
          </div>
        );
      case 'hotspot-reveal':
        return (
          <div className="w-full h-full relative flex items-center justify-center p-8 lg:p-12">
              <div className="absolute inset-0 z-0 rounded-[4.5rem] overflow-hidden border border-white/10 shadow-2xl bg-black">
                 <img src={slide.visual.source} className="w-full h-full object-cover opacity-60 mix-blend-luminosity scale-110" alt="Map" />
                 <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/90" />
                 <div className="absolute top-16 left-16 text-white z-10">
                    <h3 className="text-5xl lg:text-7xl font-black uppercase tracking-tighter leading-none">{slide.title}</h3>
                    <p className="text-sm font-bold text-red-500 uppercase tracking-[0.5em] mt-2">{slide.subtitle}</p>
                 </div>
                 {slide.interaction?.revealItems?.map((item, idx) => (
                    <button key={idx} style={{ left: `${item.x}%`, top: `${item.y}%` }} onClick={() => setActiveHotspot(item)} className="absolute z-20 group -translate-x-1/2 -translate-y-1/2">
                       <div className="absolute w-12 h-12 bg-red-600/40 rounded-full animate-ping" />
                       <div className={`relative w-10 h-10 ${activeHotspot === item ? 'bg-white text-red-600 scale-125' : 'bg-red-600 text-white'} rounded-full flex items-center justify-center transition-all duration-300`}>
                          {renderIcon(item.icon, 18)}
                       </div>
                    </button>
                 ))}
              </div>
              {activeHotspot && (
                <div className="relative z-30 w-full max-w-2xl animate-in zoom-in-95">
                   <div className="bg-[#111111]/98 backdrop-blur-3xl p-12 rounded-[4rem] border border-white/10 shadow-2xl flex flex-col gap-8 ring-1 ring-white/5 max-h-[85vh] overflow-y-auto custom-scrollbar">
                      <div className="flex items-center justify-between border-b border-white/5 pb-6">
                         <div className="space-y-1">
                            <h4 className="text-3xl font-black uppercase text-white tracking-tighter">{activeHotspot.title}</h4>
                            <p className="text-xs font-bold text-red-500 uppercase tracking-widest">{activeHotspot.text}</p>
                         </div>
                         <button onClick={() => setActiveHotspot(null)} className="p-3 bg-white/5 rounded-full text-white/40 hover:text-white transition-all hover:bg-red-600">{renderIcon('X', 20)}</button>
                      </div>
                      <div className="space-y-6">
                         <p className="text-lg lg:text-xl opacity-90 text-slate-200 leading-relaxed font-light whitespace-pre-wrap">{activeHotspot.longContent}</p>
                      </div>
                      <button onClick={() => { setActiveHotspot(null); markSlideComplete(currentSlideIndex); }} className="w-full py-6 bg-red-600 rounded-[2.5rem] font-black uppercase text-xs tracking-[0.5em] text-white hover:scale-105 transition-all shadow-xl">Continuar Exploración</button>
                   </div>
                </div>
              )}
           </div>
        );
      case 'stepped-overlay':
        return (
          <div className="w-full h-full flex items-center justify-center p-12 lg:p-24 bg-[#111111]">
            <div className="relative w-full max-w-6xl bg-[#1a1a1a] rounded-[3.5rem] border border-white/10 shadow-2xl overflow-hidden min-h-[600px] flex flex-col">
               <div className="p-12 border-b border-white/5 flex items-center justify-between shrink-0 bg-[#222222]/50">
                  <h3 className="text-4xl font-black uppercase text-white tracking-tighter">{slide.title}</h3>
                  <div className="flex gap-4">
                     <button onClick={() => setInternalStep(Math.max(0, internalStep - 1))} className="p-4 bg-white/5 rounded-2xl text-white hover:bg-red-600 transition-all">{renderIcon('ChevronLeft', 24)}</button>
                     <button onClick={() => { const n = Math.min(slide.interaction!.revealItems!.length - 1, internalStep + 1); setInternalStep(n); if (n === slide.interaction!.revealItems!.length - 1) markSlideComplete(currentSlideIndex); }} className="p-4 bg-white/5 rounded-2xl text-white hover:bg-red-600 transition-all">{renderIcon('ChevronRight', 24)}</button>
                  </div>
               </div>
               <div className="flex-1 relative overflow-hidden text-white flex flex-col bg-gradient-to-br from-[#1a1a1a] to-[#222222]">
                  {slide.interaction?.revealItems?.map((item, i) => (
                    <div key={i} className={`absolute inset-0 p-16 flex flex-col lg:flex-row gap-16 transition-all duration-700 ${i === internalStep ? 'opacity-100 translate-x-0 z-10' : 'opacity-0 translate-x-12 z-0 pointer-events-none'}`}>
                       <img src={item.image} className="lg:w-[45%] aspect-square object-cover rounded-[2.5rem] shadow-2xl border border-white/5" />
                       <div className="flex-1 space-y-10 flex flex-col justify-center text-left">
                          <h4 className="text-6xl font-black uppercase tracking-tighter text-white">{item.title}</h4>
                          <div className="relative p-8 rounded-3xl border-l-8 border-red-600 bg-red-600/5">
                            <p className="text-2xl font-black text-red-500 italic">"{item.text}"</p>
                          </div>
                          <p className="text-xl lg:text-2xl opacity-80 text-slate-300 font-light leading-relaxed max-w-2xl">{item.longContent}</p>
                       </div>
                    </div>
                  ))}
               </div>
            </div>
          </div>
        );
      case 'info-menu-reveal':
        return (
          <div className="h-full w-full flex flex-col lg:flex-row bg-[#111111] p-12 lg:p-20 gap-12 items-center justify-center">
             <div className="w-full lg:w-[25%] flex flex-col gap-4 shrink-0">
                {slide.interaction?.revealItems?.map((item, idx) => (
                   <button key={idx} onClick={() => { setActiveMenuItem(idx); markSlideComplete(currentSlideIndex); }} className={`relative flex items-center justify-between px-10 py-6 rounded-2xl transition-all duration-300 font-black uppercase text-[11px] tracking-widest ${activeMenuItem === idx ? 'bg-white text-[#111111] shadow-2xl scale-110 z-10' : 'bg-white/5 text-white/40 hover:bg-white/10 hover:text-white'}`}>
                      <span>{item.title}</span>
                      {activeMenuItem === idx && <div className="absolute right-0 top-0 bottom-0 w-2 bg-red-600 rounded-r-2xl" />}
                   </button>
                ))}
             </div>
             <div className="flex-1 max-w-7xl w-full flex flex-col lg:flex-row bg-white rounded-[4rem] shadow-2xl overflow-hidden animate-in slide-in-from-right-12 duration-1000">
                <div className="flex-[1.3] p-12 lg:p-20 flex flex-col gap-10">
                   <div className="space-y-5">
                      <h3 className="text-4xl lg:text-6xl font-black text-[#111111] uppercase tracking-tighter leading-none">{slide.interaction?.revealItems?.[activeMenuItem].title}</h3>
                      <div className="w-20 h-2 bg-red-600 rounded-full" />
                   </div>
                   <div className="flex-1 overflow-y-auto pr-6 custom-scrollbar text-[#333333]">
                      <p className="text-2xl lg:text-3xl font-bold leading-snug mb-10 italic opacity-90 border-l-8 border-red-600 pl-10 py-3">{slide.interaction?.revealItems?.[activeMenuItem].text}</p>
                      <p className="text-xl lg:text-2xl font-medium leading-relaxed opacity-80 whitespace-pre-wrap">{slide.interaction?.revealItems?.[activeMenuItem].longContent}</p>
                   </div>
                </div>
                <div className="flex-1 relative min-h-[450px] lg:min-h-full">
                   <img key={activeMenuItem} src={slide.interaction?.revealItems?.[activeMenuItem].image} className="absolute inset-0 w-full h-full object-cover scale-105" alt="" />
                   <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-transparent lg:block hidden" />
                </div>
             </div>
          </div>
        );
      case 'tabs-reveal':
        return (
          <div className="h-full w-full flex flex-col p-8 lg:p-16">
             <div className="mb-6 text-white shrink-0">
                <h2 className="text-4xl lg:text-5xl font-black uppercase tracking-tighter mb-1">{slide.title}</h2>
                <div className="w-16 h-1 bg-red-500 rounded-full" />
                <p className="mt-2 text-[9px] font-black text-red-500 uppercase tracking-[0.5em] opacity-80">{slide.subtitle}</p>
             </div>
             <div className="flex-1 flex flex-col min-h-0">
                <div className="flex flex-wrap gap-1.5 shrink-0">
                   {slide.interaction?.revealItems?.map((item, idx) => (
                      <button key={idx} onClick={() => { setActiveTab(idx); markSlideComplete(currentSlideIndex); }} className={`px-10 py-5 rounded-t-[2rem] font-black uppercase text-[10px] tracking-widest transition-all duration-500 min-w-[160px] relative overflow-hidden ${activeTab === idx ? 'bg-red-500 text-white shadow-2xl z-10 scale-105 origin-bottom' : 'bg-[#222222] text-white/30 hover:bg-[#2a2a2a]'}`}>
                         {item.title}
                      </button>
                   ))}
                </div>
                <div className="flex-1 flex flex-col lg:flex-row bg-[#2a2a2a] rounded-b-[4rem] rounded-tr-[4rem] overflow-hidden shadow-2xl border border-white/5 relative">
                   <div className="flex-[1.2] p-12 lg:p-20 overflow-y-auto custom-scrollbar flex flex-col justify-center gap-10">
                      <div key={activeTab} className="space-y-10 animate-in fade-in duration-500">
                         <div className="space-y-4">
                            <h3 className="text-3xl lg:text-5xl font-black text-white uppercase tracking-tighter">{slide.interaction?.revealItems?.[activeTab].title}</h3>
                            <div className="w-16 h-1.5 bg-red-600 rounded-full" />
                         </div>
                         <p className="text-2xl lg:text-3xl font-bold text-red-500 leading-snug border-l-8 border-red-500 pl-10 bg-red-500/5 py-6 rounded-r-3xl italic">{slide.interaction?.revealItems?.[activeTab].text}</p>
                         <p className="text-xl lg:text-2xl font-light text-slate-300 leading-relaxed max-w-3xl opacity-90">{slide.interaction?.revealItems?.[activeTab].longContent}</p>
                      </div>
                   </div>
                   <div className="flex-1 relative min-h-[450px] lg:min-h-full">
                      <img key={activeTab} src={slide.interaction?.revealItems?.[activeTab].image} className="absolute inset-0 w-full h-full object-cover animate-in fade-in duration-700" alt="" />
                      <div className="absolute inset-0 bg-gradient-to-r from-[#2a2a2a] via-transparent to-transparent hidden lg:block" />
                   </div>
                </div>
             </div>
          </div>
        );
      case 'grid-cards':
        return (
          <div className="h-full w-full relative bg-white text-black overflow-hidden flex flex-col p-12 lg:p-20">
            <div className="relative z-10 mb-16 text-left">
               <h2 className="text-5xl lg:text-7xl font-black text-red-600 uppercase tracking-tighter leading-none">{slide.title}</h2>
               <p className="text-xl font-bold text-slate-400 uppercase tracking-[0.3em] mt-2">{slide.subtitle}</p>
            </div>
            <div className="relative z-10 flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
               {slide.interaction?.revealItems?.map((item, idx) => (
                  <div key={idx} className={`relative bg-white p-10 rounded-sm shadow-[0_15px_40px_rgba(0,0,0,0.08)] border-t-4 border-white transition-all hover:shadow-2xl hover:border-red-600 group cursor-pointer`} onClick={() => openGridPopup(item, idx)}>
                     {viewedItems.has(idx) && (
                        <div className="absolute -top-3 -right-3 w-8 h-8 bg-slate-400 rounded-full flex items-center justify-center text-white border-2 border-white shadow-md">
                           {renderIcon('Check', 16, 'white')}
                        </div>
                     )}
                     <div className="flex items-start justify-between gap-6 mb-6">
                        <div className="space-y-4 flex-1">
                           <h3 className="text-2xl font-black text-[#222] uppercase tracking-tight leading-tight group-hover:text-red-600 transition-colors">{item.title}</h3>
                           <p className="text-slate-500 text-sm leading-relaxed font-medium line-clamp-3">{item.text}</p>
                        </div>
                        <div className="shrink-0 pt-1 text-red-600 opacity-80 group-hover:scale-110 group-hover:opacity-100 transition-all">
                           {renderIcon(item.icon, 52, '#ef4444')}
                        </div>
                     </div>
                  </div>
               ))}
            </div>
            {expandedItem && (
              <div className="fixed inset-0 z-[150] flex items-center justify-center p-6 lg:p-12">
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setExpandedItem(null)} />
                <div className="relative w-full max-w-6xl bg-white shadow-2xl flex flex-col lg:flex-row overflow-hidden animate-in zoom-in-95 duration-500 rounded-sm">
                    <div className="lg:w-1/4 bg-slate-50 flex flex-col items-center justify-center p-12 border-r border-slate-100 relative">
                       <div className="text-red-600 mb-8 opacity-90">{renderIcon(expandedItem.icon, 120, '#ef4444')}</div>
                       <h4 className="text-xl font-black text-[#222] uppercase tracking-tighter text-center leading-none">{expandedItem.title}</h4>
                    </div>
                    <div className="flex-1 p-12 lg:p-20 overflow-y-auto custom-scrollbar space-y-8 bg-white text-slate-700">
                       <p className="text-xl lg:text-2xl font-medium leading-relaxed italic border-l-4 border-slate-200 pl-8">"{expandedItem.text}"</p>
                       <p className="text-lg lg:text-xl font-normal leading-loose opacity-90">{expandedItem.longContent}</p>
                    </div>
                    <button onClick={() => setExpandedItem(null)} className="absolute top-8 right-8 p-3 text-slate-300 hover:text-red-600 transition-all hover:bg-red-50 rounded-full group">{renderIcon('X', 32)}</button>
                </div>
              </div>
            )}
          </div>
        );
      default:
        return <div>Slide type not supported</div>;
    }
  };

  return (
    <div className="h-full w-full relative flex flex-col overflow-y-auto custom-scrollbar bg-[#111111]">
      {isBg && (
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img src={slide.visual.source} className="w-full h-full object-cover animate-in fade-in zoom-in-105 duration-1000" alt="" />
          <div className={`absolute inset-0 ${slide.type === 'intro' ? 'bg-black/40' : 'bg-black/85'} backdrop-blur-[1px] transition-all duration-700`} />
        </div>
      )}
      <div className={`relative z-10 flex-1 flex flex-col items-center justify-center w-full ${['intro', 'timeline', 'tabs-reveal', 'info-menu-reveal', 'stepped-overlay', 'hermeneutics', 'flashcards', 'hotspot-reveal', 'grid-cards'].includes(slide.type) ? 'p-0' : 'p-8 lg:p-12 max-w-7xl mx-auto'}`}>
        {renderSlideContent()}
      </div>
      <style>{`
        .perspective-1000 { perspective: 1000px; }
        .transform-style-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
      `}</style>
    </div>
  );
};

export default SlideRenderer;
