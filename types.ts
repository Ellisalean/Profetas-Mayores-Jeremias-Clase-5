
export type SlideType = 
  | 'intro' 
  | 'hermeneutics'
  | 'visual-info' 
  | 'split-visual'
  | 'timeline' 
  | 'scenario' 
  | 'interactive-reveal' 
  | 'stepped-overlay'
  | 'side-tabs-reveal'
  | 'tabs-reveal'
  | 'hotspot-reveal'
  | 'split-slider'
  | 'info-menu-reveal'
  | 'drag-drop'
  | 'quiz' 
  | 'puzzle'
  | 'reflection' 
  | 'completion'
  | 'interactive-video'
  | 'image-list-reveal'
  | 'grid-cards'
  | 'flashcards';

export interface SlideVisual {
  type: 'image' | 'icon' | 'diagram' | 'map';
  source: string; 
  alt?: string;
  position?: 'left' | 'right' | 'top' | 'background';
  effect?: 'vignette' | 'none' | 'blur' | 'overlay-dark';
}

export interface RevealItem {
  title: string;
  text: string;
  longContent?: string;
  icon: string;
  image?: string;
  tags?: string[];
  x?: number; // Hotspot X coordinate (0-100)
  y?: number; // Hotspot Y coordinate (0-100)
}

export interface SlideOption {
  id: string;
  label: string;
  feedback?: string;
  isCorrect?: boolean;
  options?: SlideOption[];
}

export interface Slide {
  id: string;
  type: SlideType;
  title: string;
  subtitle?: string;
  visual: SlideVisual;
  content?: string;
  bullets?: string[];
  interaction?: {
    type: 'click-reveal' | 'multiple-choice' | 'decision' | 'input' | 'matching' | 'side-reveal' | 'grid-cards' | 'stepped-reveal' | 'hotspots' | 'internal-slider' | 'menu-reveal' | 'drag-drop' | 'visual-selector' | 'embed-video' | 'tabs-reveal' | 'flashcards';
    options?: SlideOption[];
    revealItems?: RevealItem[];
  };
}

export interface Lesson {
  id: string;
  title: string;
  totalSlides: number;
  slides: Slide[];
  subtitle?: string;
  objectives?: string[];
  duration?: string;
}
