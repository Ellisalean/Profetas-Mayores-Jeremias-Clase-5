
import React, { useEffect, useState } from 'react';
import { useLessonStore } from './store/useLessonStore';
import { COUNSELING_LESSON } from './data/lessonContent';
import SlideRenderer from './components/SlideRenderer';
import { 
  ChevronRight, ChevronLeft, Menu, 
  X, PanelLeftClose,
  Home, HelpCircle, Play, Pause,
  Keyboard, MousePointer2, Smartphone, Monitor
} from 'lucide-react';

const App: React.FC = () => {
  const { 
    currentSlideIndex, nextSlide, prevSlide, goToSlide,
    isSidebarOpen, toggleSidebar,
    completedSlides, isPlaying, toggleAutoplay,
    isHelpOpen, toggleHelp
  } = useLessonStore();

  const [isDesktopCollapsed, setIsDesktopCollapsed] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === ' ') {
        e.preventDefault();
        toggleAutoplay();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide, toggleAutoplay]);

  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 400);
    return () => clearTimeout(timer);
  }, [currentSlideIndex]);

  const currentSlide = COUNSELING_LESSON.slides[currentSlideIndex];
  const total = COUNSELING_LESSON.totalSlides;

  return (
    <div className="h-screen w-screen bg-[#111111] flex transition-all duration-500 overflow-hidden text-white relative">
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[60] lg:hidden" onClick={toggleSidebar} />
      )}

      {isHelpOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 lg:p-12 animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-black/95 backdrop-blur-2xl" onClick={toggleHelp} />
          <div className="relative w-full max-w-4xl bg-[#1a1a1a] rounded-[3rem] border border-white/10 shadow-2xl overflow-hidden flex flex-col">
            <div className="p-10 border-b border-white/5 flex items-center justify-between bg-gradient-to-r from-red-600/10 to-transparent">
              <div>
                <h2 className="text-4xl font-black uppercase tracking-tighter text-white leading-none">Guía de Navegación</h2>
                <p className="text-xs font-bold text-red-500 uppercase tracking-widest mt-1">Manual de Usuario</p>
              </div>
              <button onClick={toggleHelp} className="p-3 bg-white/5 rounded-full hover:bg-red-500 transition-all text-white"><X size={24} /></button>
            </div>
            <div className="p-10 lg:p-16 grid grid-cols-1 md:grid-cols-2 gap-12 overflow-y-auto max-h-[70vh] custom-scrollbar">
              <div className="space-y-8">
                <div className="flex items-center gap-4 text-red-500"><Keyboard size={28} /><h3 className="text-xl font-black uppercase tracking-tight">Atajos</h3></div>
                <div className="grid grid-cols-1 gap-4 text-xs">
                  <div className="flex justify-between p-4 bg-white/5 rounded-2xl"><span>Siguiente</span><kbd className="bg-red-600 px-2 rounded">→</kbd></div>
                  <div className="flex justify-between p-4 bg-white/5 rounded-2xl"><span>Anterior</span><kbd className="bg-red-600 px-2 rounded">←</kbd></div>
                </div>
              </div>
            </div>
            <div className="p-8 bg-black/20 flex justify-center">
               <button onClick={toggleHelp} className="px-12 py-5 bg-red-600 rounded-full font-black uppercase text-xs tracking-widest">Empezar</button>
            </div>
          </div>
        </div>
      )}

      <aside className={`fixed inset-y-0 left-0 z-[70] bg-[#1a1a1a] border-r border-white/5 transition-all duration-500 lg:relative 
        ${isSidebarOpen ? 'w-80 translate-x-0' : '-translate-x-full lg:translate-x-0'}
        ${isDesktopCollapsed ? 'lg:w-0 lg:border-none' : 'lg:w-80'}
      `}>
        <div className="h-full flex flex-col overflow-hidden">
          <div className="p-8 border-b border-white/5 flex items-center justify-between">
            <h4 className="font-black uppercase tracking-tighter text-xs text-red-500">Contenido del Módulo</h4>
            <button onClick={() => setIsDesktopCollapsed(true)} className="hidden lg:block text-white/60 hover:text-white"><PanelLeftClose size={20} /></button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-1 custom-scrollbar">
            {COUNSELING_LESSON.slides.map((s, idx) => (
              <button key={s.id} onClick={() => { goToSlide(idx); if (window.innerWidth < 1024) toggleSidebar(); }} className={`w-full flex items-center gap-4 p-4 rounded-xl transition-all text-left ${currentSlideIndex === idx ? 'bg-red-600 text-white' : 'text-white/40 hover:bg-white/5'}`}>
                <span className="text-[10px] font-black opacity-30 w-4">{idx + 1}.</span>
                <span className="text-[10px] font-black uppercase tracking-tight truncate">{s.title}</span>
                {completedSlides.includes(idx) && <div className="ml-auto w-1.5 h-1.5 bg-red-400 rounded-full" />}
              </button>
            ))}
          </div>
        </div>
      </aside>

      <main className="flex-1 flex flex-col h-full relative bg-[#111111]">
        <header className="h-16 px-6 lg:px-10 flex items-center justify-between border-b border-white/5 bg-[#1a1a1a] z-50 shrink-0">
           <div className="flex items-center gap-6">
              <button onClick={() => { if (window.innerWidth >= 1024) setIsDesktopCollapsed(!isDesktopCollapsed); else toggleSidebar(); }} className="text-white/60 hover:text-white"><Menu size={20} /></button>
              <h1 className="hidden sm:block text-[10px] font-black uppercase tracking-widest text-white/80">{COUNSELING_LESSON.title}</h1>
           </div>
           <div className="absolute left-1/2 -translate-x-1/2 text-[10px] font-black tracking-[0.4em] text-red-600">{currentSlideIndex + 1} / {total}</div>
           <div className="flex items-center gap-6 text-white/60">
              <button onClick={toggleAutoplay} className={isPlaying ? 'text-red-500' : ''}>{isPlaying ? <Pause size={18} /> : <Play size={18} />}</button>
              <button onClick={() => goToSlide(0)}><Home size={18} /></button>
              <button onClick={toggleHelp}><HelpCircle size={18} /></button>
              <div className="flex items-center gap-2">
                <button onClick={prevSlide} disabled={currentSlideIndex === 0}><ChevronLeft size={24} /></button>
                <button onClick={nextSlide} disabled={currentSlideIndex === total - 1}><ChevronRight size={24} /></button>
              </div>
           </div>
        </header>

        <div className="flex-1 relative overflow-hidden">
           <div className={`h-full w-full transition-all duration-500 ease-out transform ${isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
              <SlideRenderer slide={currentSlide} />
           </div>
        </div>

        <div className="absolute top-16 left-0 right-0 h-[3px] bg-white/5 z-[60]">
           <div className="h-full bg-red-600 transition-all duration-1000 ease-in-out" style={{ width: `${((currentSlideIndex + 1) / total) * 100}%` }} />
        </div>
      </main>
    </div>
  );
};

export default App;
