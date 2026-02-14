
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { COUNSELING_LESSON } from '../data/lessonContent';

interface LessonState {
  currentSlideIndex: number;
  completedSlides: number[];
  notes: Record<string, string>;
  isSidebarOpen: boolean;
  theme: 'light' | 'dark';
  isPlaying: boolean;
  isHelpOpen: boolean;
  
  nextSlide: () => void;
  prevSlide: () => void;
  goToSlide: (index: number) => void;
  setNote: (id: string, text: string) => void;
  toggleSidebar: () => void;
  toggleTheme: () => void;
  toggleAutoplay: () => void;
  toggleHelp: () => void;
  markSlideComplete: (index: number) => void;
  resetLesson: () => void;
}

export const useLessonStore = create<LessonState>()(
  persist(
    (set) => ({
      currentSlideIndex: 0,
      completedSlides: [],
      notes: {},
      isSidebarOpen: false,
      theme: 'dark',
      isPlaying: false,
      isHelpOpen: false,

      nextSlide: () => set((state) => ({ 
        currentSlideIndex: Math.min(state.currentSlideIndex + 1, COUNSELING_LESSON.totalSlides - 1) 
      })),
      prevSlide: () => set((state) => ({ 
        currentSlideIndex: Math.max(state.currentSlideIndex - 1, 0) 
      })),
      goToSlide: (index) => set({ currentSlideIndex: index }),
      setNote: (id, text) => set((state) => ({
        notes: { ...state.notes, [id]: text }
      })),
      toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
      toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
      toggleAutoplay: () => set((state) => ({ isPlaying: !state.isPlaying })),
      toggleHelp: () => set((state) => ({ isHelpOpen: !state.isHelpOpen })),
      markSlideComplete: (index) => set((state) => ({
        completedSlides: state.completedSlides.includes(index) 
          ? state.completedSlides 
          : [...state.completedSlides, index]
      })),
      resetLesson: () => set({
        currentSlideIndex: 0,
        completedSlides: [],
        notes: {},
        isPlaying: false
      }),
    }),
    { 
      name: 'counseling-progress-v2',
      partialize: (state) => ({ 
        currentSlideIndex: state.currentSlideIndex,
        completedSlides: state.completedSlides,
        notes: state.notes,
        theme: state.theme
      }),
    }
  )
);
