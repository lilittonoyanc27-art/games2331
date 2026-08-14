import React, { useState, useMemo, useCallback } from 'react';
import {
  BookOpen,
  HelpCircle,
  MessageSquare,
  Sparkles,
  Volume2,
  CheckCircle2,
  XCircle,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  Languages,
  Eye,
  EyeOff,
  Trophy,
  Award,
  Zap,
  BookmarkCheck,
  ArrowRight,
  Info,
  Menu,
  X
} from 'lucide-react';
import {
  STORIES_DATA,
  QUIZZES_DATA,
  PRACTICE_QUESTIONS_DATA,
  VERB_EXCEPTIONS_DATA,
  type Story,
  type QuizSection,
  type PracticeQuestion,
  type VerbException
} from './data.ts';

type ActiveTab = 'texts' | 'quizzes' | 'practice' | 'game' | 'grammar';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('texts');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // Text reader states
  const [activeStoryIndex, setActiveStoryIndex] = useState<number>(0);
  const [revealedSentences, setRevealedSentences] = useState<Record<string, boolean>>({});

  // Quiz states
  const [activeQuizIndex, setActiveQuizIndex] = useState<number>(0);
  const [revealedQuestionTranslations, setRevealedQuestionTranslations] = useState<Record<string, boolean>>({});
  const [userAnswers, setUserAnswers] = useState<Record<string, 'A' | 'B' | 'C' | 'D'>>({});
  const [submittedQuizzes, setSubmittedQuizzes] = useState<Record<string, boolean>>({});

  // Practice questions states
  const [practiceFilter, setPracticeFilter] = useState<'ALL' | 'Pretérito Perfecto' | 'Pretérito Imperfecto'>('ALL');
  const [revealedPracticeTranslations, setRevealedPracticeTranslations] = useState<Record<number, boolean>>({});
  const [expandedPracticeAnswers, setExpandedPracticeAnswers] = useState<Record<number, boolean>>({});

  // Exception Game states
  const [gameScore, setGameScore] = useState<number>(0);
  const [gameStreak, setGameStreak] = useState<number>(0);
  const [currentGameIndex, setCurrentGameIndex] = useState<number>(0);
  const [selectedGameAnswer, setSelectedGameAnswer] = useState<string | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState<boolean>(false);
  const [gameFinished, setGameFinished] = useState<boolean>(false);

  // Audio helper (TTS for Spanish)
  const speakSpanish = useCallback((text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const cleanText = text.replace(/[*_#❌]/g, '').trim();
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = 'es-ES';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  }, []);

  // Text Reader handlers
  const currentStory: Story = STORIES_DATA[activeStoryIndex];

  const toggleSentence = (id: string) => {
    setRevealedSentences(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const revealAllCurrentStory = () => {
    const newRevealed: Record<string, boolean> = { ...revealedSentences };
    currentStory.paragraphs.flat().forEach(s => {
      newRevealed[s.id] = true;
    });
    setRevealedSentences(newRevealed);
  };

  const hideAllCurrentStory = () => {
    const newRevealed: Record<string, boolean> = { ...revealedSentences };
    currentStory.paragraphs.flat().forEach(s => {
      newRevealed[s.id] = false;
    });
    setRevealedSentences(newRevealed);
  };

  // Quiz handlers
  const currentQuiz: QuizSection = QUIZZES_DATA[activeQuizIndex];

  const toggleQuizQuestionTranslation = (quizId: string, qId: number) => {
    const key = `${quizId}-${qId}`;
    setRevealedQuestionTranslations(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSelectQuizOption = (quizId: string, qId: number, key: 'A' | 'B' | 'C' | 'D') => {
    const answerKey = `${quizId}-${qId}`;
    setUserAnswers(prev => ({
      ...prev,
      [answerKey]: key,
    }));
  };

  const resetQuiz = (quizId: string) => {
    const newAnswers = { ...userAnswers };
    currentQuiz.questions.forEach(q => {
      delete newAnswers[`${quizId}-${q.id}`];
    });
    setUserAnswers(newAnswers);
    setSubmittedQuizzes(prev => ({ ...prev, [quizId]: false }));
  };

  const currentQuizScore = useMemo(() => {
    let score = 0;
    currentQuiz.questions.forEach(q => {
      if (userAnswers[`${currentQuiz.id}-${q.id}`] === q.correctKey) {
        score += 1;
      }
    });
    return score;
  }, [currentQuiz, userAnswers]);

  // Practice handlers
  const filteredPracticeQuestions = useMemo(() => {
    if (practiceFilter === 'ALL') return PRACTICE_QUESTIONS_DATA;
    return PRACTICE_QUESTIONS_DATA.filter(q => q.tense === practiceFilter);
  }, [practiceFilter]);

  const togglePracticeQuestionTranslation = (num: number) => {
    setRevealedPracticeTranslations(prev => ({
      ...prev,
      [num]: !prev[num],
    }));
  };

  const togglePracticeAnswers = (num: number) => {
    setExpandedPracticeAnswers(prev => ({
      ...prev,
      [num]: !prev[num],
    }));
  };

  // Exception Game dataset
  const gameCards: VerbException[] = VERB_EXCEPTIONS_DATA;
  const currentException: VerbException = gameCards[currentGameIndex % gameCards.length];

  // Prepare randomized options for the game card
  const gameOptions = useMemo(() => {
    if (!currentException) return [];
    const correct = currentException.correctForm;
    const trap = currentException.regularTrap.replace('❌', '').trim();
    const items = [
      { text: correct, isCorrect: true },
      { text: trap, isCorrect: false },
    ];
    if (currentException.id.length % 2 === 0) {
      return items.reverse();
    }
    return items;
  }, [currentException]);

  const handleGameOptionClick = (chosenText: string, isCorrect: boolean) => {
    if (isAnswerChecked) return;
    setSelectedGameAnswer(chosenText);
    setIsAnswerChecked(true);
    if (isCorrect) {
      setGameScore(s => s + 10);
      setGameStreak(st => st + 1);
    } else {
      setGameStreak(0);
    }
  };

  const nextGameQuestion = () => {
    if (currentGameIndex + 1 >= gameCards.length) {
      setGameFinished(true);
    } else {
      setCurrentGameIndex(i => i + 1);
      setSelectedGameAnswer(null);
      setIsAnswerChecked(false);
    }
  };

  const restartGame = () => {
    setCurrentGameIndex(0);
    setGameScore(0);
    setGameStreak(0);
    setSelectedGameAnswer(null);
    setIsAnswerChecked(false);
    setGameFinished(false);
  };

  return (
    <div className="flex h-screen w-full max-w-full bg-slate-50 text-slate-900 font-sans overflow-hidden antialiased selection:bg-amber-200 selection:text-slate-900">
      
      {/* ========================================================================= */}
      {/* GEOMETRIC BALANCE SIDEBAR (Desktop & Mobile Drawer) */}
      {/* ========================================================================= */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-slate-900 flex flex-col text-white shadow-2xl transition-transform duration-300 ease-in-out md:static md:translate-x-0 shrink-0 ${
        mobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      }`}>
        {/* Brand Header */}
        <div className="p-8 border-b border-slate-800/80 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black tracking-tighter text-amber-500 flex items-center gap-2">
              <span>AR-ES LINGUA</span>
            </h1>
            <p className="text-xs text-slate-400 mt-1 uppercase tracking-widest font-semibold">
              Language Learning Hub
            </p>
          </div>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="md:hidden text-slate-400 hover:text-white p-1"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-4 py-6 space-y-2.5 overflow-y-auto">
          <button
            id="nav-stories"
            onClick={() => {
              setActiveTab('texts');
              setMobileMenuOpen(false);
            }}
            className={`w-full text-left px-5 py-4 rounded-2xl font-bold flex items-center transition-all duration-200 ${
              activeTab === 'texts'
                ? 'bg-slate-800 border-l-4 border-amber-500 text-white shadow-lg shadow-black/20'
                : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
            }`}
          >
            <span className="mr-3 text-xl">📖</span>
            <div className="flex-1">
              <div className="text-sm font-extrabold tracking-tight">Stories</div>
              <div className="text-[11px] text-slate-400 font-normal">Տեքստեր (AR ⇄ ES)</div>
            </div>
          </button>

          <button
            id="nav-quizzes"
            onClick={() => {
              setActiveTab('quizzes');
              setMobileMenuOpen(false);
            }}
            className={`w-full text-left px-5 py-4 rounded-2xl font-bold flex items-center transition-all duration-200 ${
              activeTab === 'quizzes'
                ? 'bg-slate-800 border-l-4 border-amber-500 text-white shadow-lg shadow-black/20'
                : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
            }`}
          >
            <span className="mr-3 text-xl">📝</span>
            <div className="flex-1">
              <div className="text-sm font-extrabold tracking-tight">Quizzes</div>
              <div className="text-[11px] text-slate-400 font-normal">Վիկտորինաներ (20 հարց)</div>
            </div>
          </button>

          <button
            id="nav-practice"
            onClick={() => {
              setActiveTab('practice');
              setMobileMenuOpen(false);
            }}
            className={`w-full text-left px-5 py-4 rounded-2xl font-bold flex items-center transition-all duration-200 ${
              activeTab === 'practice'
                ? 'bg-slate-800 border-l-4 border-amber-500 text-white shadow-lg shadow-black/20'
                : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
            }`}
          >
            <span className="mr-3 text-xl">💡</span>
            <div className="flex-1">
              <div className="text-sm font-extrabold tracking-tight">Grammar Q&A</div>
              <div className="text-[11px] text-slate-400 font-normal">Պրակտիկ հարցեր</div>
            </div>
          </button>

          <button
            id="nav-game"
            onClick={() => {
              setActiveTab('game');
              setMobileMenuOpen(false);
            }}
            className={`w-full text-left px-5 py-4 rounded-2xl font-bold flex items-center transition-all duration-200 ${
              activeTab === 'game'
                ? 'bg-slate-800 border-l-4 border-amber-500 text-white shadow-lg shadow-black/20'
                : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
            }`}
          >
            <span className="mr-3 text-xl">⚡</span>
            <div className="flex-1">
              <div className="text-sm font-extrabold tracking-tight">Exceptions Game</div>
              <div className="text-[11px] text-slate-400 font-normal">Անկանոն բացառություններ</div>
            </div>
          </button>

          <button
            id="nav-grammar"
            onClick={() => {
              setActiveTab('grammar');
              setMobileMenuOpen(false);
            }}
            className={`w-full text-left px-5 py-4 rounded-2xl font-bold flex items-center transition-all duration-200 ${
              activeTab === 'grammar'
                ? 'bg-slate-800 border-l-4 border-amber-500 text-white shadow-lg shadow-black/20'
                : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
            }`}
          >
            <span className="mr-3 text-xl">📚</span>
            <div className="flex-1">
              <div className="text-sm font-extrabold tracking-tight">Cheat Sheet</div>
              <div className="text-[11px] text-slate-400 font-normal">Քերականություն</div>
            </div>
          </button>
        </nav>

        {/* Sidebar Footer Indicator */}
        <div className="p-6 border-t border-slate-800 bg-slate-950/40">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-3 w-3 rounded-full bg-emerald-500 animate-pulse shadow-sm shadow-emerald-400"></div>
              <div>
                <span className="text-xs text-slate-300 font-bold block">System Ready</span>
                <span className="text-[10px] text-slate-500 uppercase tracking-wider font-mono">Level A2 • Interactive</span>
              </div>
            </div>
            <span className="text-xs font-mono text-amber-500 font-bold bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
              A2
            </span>
          </div>
        </div>
      </aside>

      {/* Backdrop for Mobile */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-40 md:hidden"
        />
      )}

      {/* ========================================================================= */}
      {/* MAIN VIEWPORT */}
      {/* ========================================================================= */}
      <main id="main-view" className="flex-1 min-w-0 flex flex-col h-screen overflow-y-auto overflow-x-hidden bg-slate-50">
        
        {/* Mobile Header Bar */}
        <div className="md:hidden flex items-center justify-between px-5 py-4 bg-slate-900 text-white sticky top-0 z-30 shadow-md">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-400"
            >
              <Menu className="w-6 h-6" />
            </button>
            <span className="text-lg font-black tracking-tighter text-amber-500">AR-ES LINGUA</span>
          </div>
          <span className="text-xs uppercase font-bold tracking-wider px-2.5 py-1 bg-slate-800 text-slate-300 rounded-full border border-slate-700">
            {activeTab}
          </span>
        </div>

        {/* View Content Wrapper */}
        <div className="flex-1 p-4 sm:p-6 md:p-8 lg:p-10 max-w-5xl w-full mx-auto space-y-6 sm:space-y-8 min-w-0">

          {/* ======================================================================= */}
          {/* TAB 1: STORIES (Geometric Balance Layout) */}
          {/* ======================================================================= */}
          {activeTab === 'texts' && (
            <div className="space-y-8">
              {/* Header Title Section */}
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                  <span className="px-4 py-1 bg-amber-100 text-amber-800 text-xs font-black rounded-full uppercase tracking-wider inline-block mb-2">
                    Interactive Dual-Reader
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900">
                    Stories & Texts
                  </h2>
                  <p className="text-sm text-slate-500 mt-1">
                    Սեղմեք յուրաքանչյուր նախադասության վրա՝ թարգմանությունը բացելու համար (Click sentences to reveal translation).
                  </p>
                </div>

                {/* Global Controls */}
                <div className="flex items-center gap-2">
                  <button
                    id="reveal-all-sentences-btn"
                    onClick={revealAllCurrentStory}
                    className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold bg-white hover:bg-slate-100 text-slate-700 rounded-xl border border-slate-200 transition-all shadow-xs"
                    title="Բացել բոլոր թարգմանությունները"
                  >
                    <Eye className="w-3.5 h-3.5 text-amber-600" />
                    <span>Բացել բոլորը</span>
                  </button>
                  <button
                    id="hide-all-sentences-btn"
                    onClick={hideAllCurrentStory}
                    className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold bg-white hover:bg-slate-100 text-slate-700 rounded-xl border border-slate-200 transition-all shadow-xs"
                    title="Փակել բոլոր թարգմանությունները"
                  >
                    <EyeOff className="w-3.5 h-3.5 text-slate-500" />
                    <span>Փակել բոլորը</span>
                  </button>
                </div>
              </div>

              {/* Story Switcher Buttons */}
              <div className="flex flex-wrap items-center gap-4">
                <button
                  id="story-switch-0"
                  onClick={() => setActiveStoryIndex(0)}
                  className={`px-6 py-2.5 font-bold rounded-full text-xs sm:text-sm tracking-wide transition-all shadow-sm ${
                    activeStoryIndex === 0
                      ? 'bg-amber-500 text-white shadow-amber-500/20 ring-2 ring-amber-400 ring-offset-2'
                      : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                  }`}
                >
                  PEDRO (AR ➡️ ES)
                </button>

                <button
                  id="story-switch-1"
                  onClick={() => setActiveStoryIndex(1)}
                  className={`px-6 py-2.5 font-bold rounded-full text-xs sm:text-sm tracking-wide transition-all shadow-sm ${
                    activeStoryIndex === 1
                      ? 'bg-amber-500 text-white shadow-amber-500/20 ring-2 ring-amber-400 ring-offset-2'
                      : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                  }`}
                >
                  CARLOS & LUCÍA (ES ➡️ AR)
                </button>
              </div>

              {/* Main Story Geometric Card */}
              <div className="bg-white rounded-3xl p-5 sm:p-8 md:p-10 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.05),0_8px_10px_-6px_rgba(0,0,0,0.05)] border border-slate-100 space-y-6 sm:space-y-8 min-w-0">
                
                {/* Story Title Header */}
                <div className="border-b border-slate-100 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4 min-w-0">
                  <div className="min-w-0 flex-1">
                    <div className="text-xs font-black tracking-widest text-amber-600 uppercase mb-1">
                      {activeStoryIndex === 0 ? 'Pretérito Perfecto Compuesto • Տեքստ 1' : 'Pretérito Imperfecto • Տեքստ 2'}
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-black text-slate-900 break-words">
                      {currentStory.titleSource}
                    </h3>
                    <p className="text-sm sm:text-base font-semibold text-amber-700 mt-1 italic break-words">
                      {currentStory.titleTarget}
                    </p>
                  </div>

                  <button
                    onClick={() => speakSpanish(currentStory.sourceLang === 'es' ? currentStory.titleSource : currentStory.titleTarget)}
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-amber-600 text-white font-bold rounded-xl text-xs transition-colors self-start md:self-auto shrink-0 shadow-sm cursor-pointer"
                    title="Լսել վերնագրի արտասանությունը"
                  >
                    <Volume2 className="w-4 h-4 text-amber-400 shrink-0" />
                    <span className="whitespace-nowrap">Լսել իսպաներենով</span>
                  </button>
                </div>

                {/* Paragraphs and Sentences */}
                <div className="space-y-8">
                  {currentStory.paragraphs.map((paragraph, pIdx) => (
                    <div key={`p-${pIdx}`} className="space-y-3.5 bg-slate-50/60 p-5 sm:p-6 rounded-2xl border border-slate-100">
                      <div className="text-[11px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                        <span>Պարբերություն {pIdx + 1}</span>
                      </div>

                      <div className="space-y-3">
                        {paragraph.map((sentence) => {
                          const isRevealed = !!revealedSentences[sentence.id];
                          const spanishAudioText = currentStory.sourceLang === 'es' ? sentence.sourceText : sentence.targetText;

                          return (
                            <div
                              key={sentence.id}
                              id={`sentence-item-${sentence.id}`}
                              onClick={() => toggleSentence(sentence.id)}
                              className={`p-3.5 sm:p-4 rounded-xl cursor-pointer transition-all duration-200 border-l-0 min-w-0 ${
                                isRevealed
                                  ? 'bg-amber-50/70 border-l-4 border-amber-500 pl-4 sm:pl-5 shadow-2xs'
                                  : 'bg-white hover:bg-amber-50/40 hover:border-l-4 hover:border-amber-500 hover:pl-4 sm:hover:pl-5 border border-slate-150'
                              }`}
                            >
                              <div className="flex items-start justify-between gap-3 sm:gap-4 min-w-0">
                                <div className="flex-1 min-w-0">
                                  <p className="text-base sm:text-lg font-medium text-slate-900 leading-relaxed break-words">
                                    {sentence.sourceText}
                                  </p>

                                  {/* Revealed Translation */}
                                  {isRevealed && (
                                    <div className="mt-2.5 pt-2.5 border-t border-amber-200/80 animate-in fade-in duration-150">
                                      <p className="text-base sm:text-lg text-amber-700 font-semibold italic leading-relaxed flex items-start gap-2 break-words">
                                        <span className="text-xs font-black uppercase tracking-wider px-1.5 py-0.5 rounded bg-amber-200/80 text-amber-900 not-italic shrink-0 mt-0.5">
                                          {currentStory.targetLang === 'es' ? 'ES' : 'ARM'}
                                        </span>
                                        <span className="break-words">{sentence.targetText}</span>
                                      </p>
                                    </div>
                                  )}
                                </div>

                                <div className="flex items-center gap-1.5 sm:gap-2 shrink-0 pt-0.5">
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      speakSpanish(spanishAudioText);
                                    }}
                                    className="p-1.5 sm:p-2 text-slate-400 hover:text-amber-600 hover:bg-amber-100/60 rounded-lg transition-colors cursor-pointer"
                                    title="Լսել արտասանությունը"
                                  >
                                    <Volume2 className="w-4 h-4" />
                                  </button>
                                  <span className={`text-[10px] sm:text-[11px] font-bold uppercase tracking-wider px-2 sm:px-2.5 py-1 rounded-lg transition-all whitespace-nowrap ${
                                    isRevealed ? 'bg-amber-500 text-white' : 'bg-slate-100 text-slate-500'
                                  }`}>
                                    {isRevealed ? 'Փակել' : 'Թարգմանել'}
                                  </span>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Bottom Navigation CTA */}
                <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-100 text-sm text-slate-500">
                  <div className="flex items-center gap-2">
                    <Info className="w-4 h-4 text-amber-500 shrink-0" />
                    <span>Յուրաքանչյուր նախադասություն ունի իսպաներենի բնական ձայնային աջակցություն։</span>
                  </div>
                  <button
                    onClick={() => setActiveTab('quizzes')}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-amber-600 text-white font-bold rounded-xl text-xs uppercase tracking-wider transition-all"
                  >
                    <span>Անցնել վիկտորինային</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ======================================================================= */}
          {/* TAB 2: COMPREHENSION QUIZZES (Geometric Balance Theme) */}
          {/* ======================================================================= */}
          {activeTab === 'quizzes' && (
            <div className="space-y-8">
              {/* Header Title Section */}
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                  <span className="px-4 py-1 bg-amber-100 text-amber-800 text-xs font-black rounded-full uppercase tracking-wider inline-block mb-2">
                    Level A2 • Interactive Quiz
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900">
                    Comprehension Quizzes
                  </h2>
                  <p className="text-sm text-slate-500 mt-1">
                    Ստուգեք տեքստի ըմբռնումը։ Սեղմեք հարցի վրա՝ հայերեն թարգմանությունը տեսնելու համար։
                  </p>
                </div>

                {/* Score Header Widget */}
                <div className="bg-slate-900 text-white px-6 py-3 rounded-2xl flex items-center gap-4 shadow-md">
                  <div className="flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-amber-400" />
                    <span className="text-xs uppercase tracking-widest text-slate-400 font-bold">Միավորներ՝</span>
                  </div>
                  <span className="text-xl font-black text-amber-400">
                    {currentQuizScore} / {currentQuiz.questions.length}
                  </span>
                  <button
                    onClick={() => resetQuiz(currentQuiz.id)}
                    className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs transition-colors"
                    title="Վերսկսել"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Quiz Switcher Tabs */}
              <div className="flex flex-wrap gap-4">
                {QUIZZES_DATA.map((quiz, qIdx) => (
                  <button
                    key={quiz.id}
                    id={`quiz-tab-${qIdx}`}
                    onClick={() => setActiveQuizIndex(qIdx)}
                    className={`px-6 py-2.5 font-bold rounded-full text-xs sm:text-sm tracking-wide transition-all shadow-sm ${
                      activeQuizIndex === qIdx
                        ? 'bg-amber-500 text-white shadow-amber-500/20 ring-2 ring-amber-400 ring-offset-2'
                        : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                    }`}
                  >
                    {quiz.titleEs}
                  </button>
                ))}
              </div>

              {/* Questions List */}
              <div className="space-y-6">
                {currentQuiz.questions.map((q) => {
                  const translationKey = `${currentQuiz.id}-${q.id}`;
                  const isTransRevealed = !!revealedQuestionTranslations[translationKey];
                  const chosenAnswer = userAnswers[`${currentQuiz.id}-${q.id}`];
                  const hasAnswered = !!chosenAnswer;
                  const isCorrect = chosenAnswer === q.correctKey;

                  return (
                    <div
                      key={q.id}
                      id={`quiz-card-${q.id}`}
                      className={`bg-white rounded-3xl p-6 sm:p-8 border shadow-[0_10px_25px_-5px_rgba(0,0,0,0.05)] transition-all ${
                        hasAnswered
                          ? isCorrect
                            ? 'border-emerald-300 ring-2 ring-emerald-100'
                            : 'border-rose-300 ring-2 ring-rose-100'
                          : 'border-slate-150 hover:border-slate-300'
                      }`}
                    >
                      {/* Question Header */}
                      <div
                        onClick={() => toggleQuizQuestionTranslation(currentQuiz.id, q.id)}
                        className="cursor-pointer group flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-slate-100"
                      >
                        <div className="space-y-1.5 flex-1">
                          <div className="flex items-center gap-3">
                            <span className="w-8 h-8 rounded-xl bg-slate-900 text-white text-xs font-black flex items-center justify-center shrink-0">
                              {q.id}
                            </span>
                            <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-amber-600 transition-colors">
                              {q.questionEs}
                            </h3>
                          </div>

                          {/* Armenian Question Translation */}
                          {isTransRevealed ? (
                            <p className="text-sm font-semibold italic text-amber-700 pl-11 animate-in fade-in duration-150">
                              🇦🇲 {q.questionHy}
                            </p>
                          ) : (
                            <p className="text-xs text-amber-600 font-medium pl-11 flex items-center gap-1">
                              <Eye className="w-3 h-3" />
                              <span>Սեղմեք՝ հայերեն թարգմանությունը բացելու համար</span>
                            </p>
                          )}
                        </div>

                        <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              speakSpanish(q.questionEs);
                            }}
                            className="p-2 text-slate-400 hover:text-amber-600 hover:bg-slate-100 rounded-xl transition-colors"
                            title="Լսել հարցը"
                          >
                            <Volume2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Options Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-6">
                        {q.options.map((opt) => {
                          const isOptionSelected = chosenAnswer === opt.key;
                          const isThisCorrect = opt.key === q.correctKey;

                          let optionClass = 'border-2 border-slate-200 hover:border-amber-500 hover:bg-amber-50/40 text-slate-800';

                          if (hasAnswered) {
                            if (isThisCorrect) {
                              optionClass = 'border-2 border-emerald-500 bg-emerald-50 text-emerald-950 font-bold';
                            } else if (isOptionSelected && !isThisCorrect) {
                              optionClass = 'border-2 border-rose-500 bg-rose-50 text-rose-950 font-medium';
                            } else {
                              optionClass = 'border-2 border-slate-150 text-slate-400 opacity-60';
                            }
                          }

                          return (
                            <button
                              key={opt.key}
                              id={`q${q.id}-option-${opt.key}`}
                              type="button"
                              onClick={() => handleSelectQuizOption(currentQuiz.id, q.id, opt.key)}
                              className={`p-4 rounded-2xl text-left font-bold transition-all flex items-center justify-between gap-3 ${optionClass}`}
                            >
                              <div className="flex items-center gap-3">
                                <span className={`w-7 h-7 rounded-lg text-xs font-black flex items-center justify-center shrink-0 ${
                                  hasAnswered && isThisCorrect
                                    ? 'bg-emerald-600 text-white'
                                    : hasAnswered && isOptionSelected
                                    ? 'bg-rose-600 text-white'
                                    : 'bg-slate-100 text-slate-700'
                                }`}>
                                  {opt.key}
                                </span>
                                <div>
                                  <div className="text-sm sm:text-base font-bold">{opt.es}</div>
                                  <div className="text-xs text-slate-400 font-normal">{opt.hy}</div>
                                </div>
                              </div>

                              {hasAnswered && isThisCorrect && (
                                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                              )}
                              {hasAnswered && isOptionSelected && !isThisCorrect && (
                                <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                              )}
                            </button>
                          );
                        })}
                      </div>

                      {/* Instant Feedback Banner */}
                      {hasAnswered && (
                        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold">
                          {isCorrect ? (
                            <span className="text-emerald-700 flex items-center gap-1.5">
                              <CheckCircle2 className="w-4 h-4" /> Ճիշտ է։ Շատ ապրեք։
                            </span>
                          ) : (
                            <span className="text-rose-700 flex items-center gap-1.5">
                              <XCircle className="w-4 h-4" /> Սխալ է։ Ճիշտ պատասխանն է՝ {q.correctKey}) {q.options.find(o => o.key === q.correctKey)?.es}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Quiz Results Summary */}
              <div className="bg-slate-900 text-white rounded-3xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
                <div className="space-y-1 text-center sm:text-left">
                  <div className="text-xs font-black uppercase tracking-widest text-amber-500">Արդյունքների ամփոփում</div>
                  <h4 className="text-2xl font-black">
                    {currentQuizScore} / {currentQuiz.questions.length} Ճիշտ պատասխան
                  </h4>
                  <p className="text-xs text-slate-400">
                    {currentQuizScore === currentQuiz.questions.length
                      ? '🎉 100% ճշգրտություն։ Գերազանց աշխատանք։'
                      : '💡 Կարող եք վերսկսել և կատարելագործել արդյունքը։'}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => resetQuiz(currentQuiz.id)}
                    className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl text-xs uppercase tracking-wider transition-all flex items-center gap-2"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Վերսկսել</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('practice')}
                    className="px-6 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black rounded-xl text-xs uppercase tracking-wider transition-all shadow-md shadow-amber-500/20 flex items-center gap-2"
                  >
                    <span>Անցնել Q&A-ին</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ======================================================================= */}
          {/* TAB 3: GRAMMAR PRACTICE Q&A (Geometric Balance Card Style) */}
          {/* ======================================================================= */}
          {activeTab === 'practice' && (
            <div className="space-y-8">
              {/* Header Title Section */}
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                  <span className="px-4 py-1 bg-amber-100 text-amber-800 text-xs font-black rounded-full uppercase tracking-wider inline-block mb-2">
                    Conversational Practice
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900">
                    Grammar Practice Q&A
                  </h2>
                  <p className="text-sm text-slate-500 mt-1">
                    Click questions for translation and buttons for answer variants.
                  </p>
                </div>

                {/* Filter Pills */}
                <div className="flex flex-wrap gap-2">
                  <button
                    id="filter-all-btn"
                    onClick={() => setPracticeFilter('ALL')}
                    className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                      practiceFilter === 'ALL'
                        ? 'bg-slate-900 text-white shadow-md'
                        : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                    }`}
                  >
                    All ({PRACTICE_QUESTIONS_DATA.length})
                  </button>
                  <button
                    id="filter-perf-btn"
                    onClick={() => setPracticeFilter('Pretérito Perfecto')}
                    className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                      practiceFilter === 'Pretérito Perfecto'
                        ? 'bg-amber-500 text-white shadow-md'
                        : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                    }`}
                  >
                    Perfecto
                  </button>
                  <button
                    id="filter-imp-btn"
                    onClick={() => setPracticeFilter('Pretérito Imperfecto')}
                    className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                      practiceFilter === 'Pretérito Imperfecto'
                        ? 'bg-amber-500 text-white shadow-md'
                        : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                    }`}
                  >
                    Imperfecto
                  </button>
                </div>
              </div>

              {/* Question Cards Grid */}
              <div className="grid grid-cols-1 gap-6">
                {filteredPracticeQuestions.map((pq) => {
                  const isTransOpen = !!revealedPracticeTranslations[pq.number];
                  const areAnswersOpen = !!expandedPracticeAnswers[pq.number];

                  return (
                    <div
                      key={pq.number}
                      id={`practice-card-${pq.number}`}
                      className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.05),0_8px_10px_-6px_rgba(0,0,0,0.05)] transition-all hover:border-slate-200"
                    >
                      {/* Clickable Question Block */}
                      <div
                        onClick={() => togglePracticeQuestionTranslation(pq.number)}
                        className="cursor-pointer group flex items-start justify-between gap-4"
                      >
                        <div className="space-y-2 flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                              Question #{pq.number}
                            </span>
                            <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${
                              pq.tense === 'Pretérito Perfecto'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-emerald-100 text-emerald-800'
                            }`}>
                              {pq.tense}
                            </span>
                          </div>

                          <h3 className="text-xl sm:text-2xl font-black text-slate-800 group-hover:text-amber-600 transition-colors">
                            {pq.questionEs}
                          </h3>

                          {/* Armenian Question Translation */}
                          {isTransOpen && (
                            <p className="text-base font-semibold italic text-amber-700 animate-in fade-in duration-150 pt-1">
                              🇦🇲 {pq.questionHy}
                            </p>
                          )}
                        </div>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            speakSpanish(pq.questionEs);
                          }}
                          className="p-2.5 text-slate-400 hover:text-amber-600 hover:bg-slate-100 rounded-xl transition-colors shrink-0"
                          title="Լսել հարցի արտասանությունը"
                        >
                          <Volume2 className="w-5 h-5" />
                        </button>
                      </div>

                      {/* Variants Toggle Button */}
                      <div className="mt-6 flex items-center justify-between">
                        <button
                          id={`toggle-variants-${pq.number}`}
                          onClick={() => togglePracticeAnswers(pq.number)}
                          className="px-5 py-2 bg-slate-900 text-white text-xs font-black rounded-xl uppercase tracking-widest hover:bg-amber-600 transition-colors flex items-center gap-2 shadow-sm"
                        >
                          <span>{areAnswersOpen ? 'Թաքցնել Variants' : 'Տեսնել Variants'}</span>
                          {areAnswersOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                        </button>

                        <span className="text-xs text-slate-400 font-medium">
                          {pq.sampleAnswers.length} Պատասխանի օրինակ
                        </span>
                      </div>

                      {/* Expandable Answer Variants */}
                      {areAnswersOpen && (
                        <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-1 gap-2.5 animate-in fade-in duration-200">
                          {pq.sampleAnswers.map((ans, aIdx) => (
                            <div
                              key={aIdx}
                              className="p-4 bg-slate-50 rounded-2xl text-sm text-slate-700 border border-slate-200/80 hover:border-amber-300 hover:bg-amber-50/30 transition-all flex items-center justify-between gap-4"
                            >
                              <div className="space-y-0.5 flex-1">
                                <div className="font-bold text-slate-900 text-sm sm:text-base">
                                  {ans.es}
                                </div>
                                <div className="text-xs sm:text-sm text-slate-500 font-medium">
                                  {ans.hy}
                                </div>
                              </div>

                              <button
                                type="button"
                                onClick={() => speakSpanish(ans.es)}
                                className="p-1.5 text-slate-400 hover:text-amber-600 hover:bg-white rounded-lg transition-colors shrink-0"
                                title="Լսել պատասխանը"
                              >
                                <Volume2 className="w-4 h-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ======================================================================= */}
          {/* TAB 4: EXCEPTIONS GAME & IRREGULAR FORMS */}
          {/* ======================================================================= */}
          {activeTab === 'game' && (
            <div className="space-y-6 sm:space-y-8 min-w-0">
              {/* Header Title Section */}
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 min-w-0">
                <div className="min-w-0">
                  <span className="px-4 py-1 bg-amber-100 text-amber-800 text-xs font-black rounded-full uppercase tracking-wider inline-block mb-2">
                    Irregular Forms & Exceptions
                  </span>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-slate-900 break-words">
                    Irregular Forms
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1 break-words">
                    Common exceptions in Pretérito Perfecto (participios) and Pretérito Imperfecto (Ser, Ir, Ver).
                  </p>
                </div>

                {/* Score Badge */}
                <div className="flex items-center gap-3 bg-slate-900 text-white px-4 sm:px-5 py-2.5 rounded-2xl shadow-md shrink-0 self-start sm:self-auto">
                  <div>
                    <div className="text-[10px] text-slate-400 uppercase font-black">Score</div>
                    <div className="text-lg sm:text-xl font-black text-amber-400">{gameScore} pts</div>
                  </div>
                  <div className="h-6 w-px bg-slate-700"></div>
                  <div className="flex items-center gap-1.5">
                    <Zap className="w-4 h-4 text-amber-400 fill-amber-400" />
                    <div>
                      <div className="text-[10px] text-slate-400 uppercase font-black">Streak</div>
                      <div className="text-lg sm:text-xl font-black text-white">{gameStreak}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Geometric Balance Duo Cards (Design Showcase) */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 min-w-0">
                {/* Dark Card: PERFECTO */}
                <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-800 space-y-5 min-w-0">
                  <h3 className="text-amber-500 font-black text-base sm:text-lg flex items-center tracking-wide">
                    <span className="mr-2 text-lg">★</span> PERFECTO (Participios Irregulares)
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm font-mono text-slate-200">
                    <div className="bg-slate-800/90 px-3 py-2 rounded-xl border border-slate-700/60 flex items-center justify-between min-w-0">
                      <span className="text-slate-300 truncate">Hacer</span>
                      <span className="text-amber-400 font-bold ml-2 shrink-0">Hecho</span>
                    </div>
                    <div className="bg-slate-800/90 px-3 py-2 rounded-xl border border-slate-700/60 flex items-center justify-between min-w-0">
                      <span className="text-slate-300 truncate">Decir</span>
                      <span className="text-amber-400 font-bold ml-2 shrink-0">Dicho</span>
                    </div>
                    <div className="bg-slate-800/90 px-3 py-2 rounded-xl border border-slate-700/60 flex items-center justify-between min-w-0">
                      <span className="text-slate-300 truncate">Ver</span>
                      <span className="text-amber-400 font-bold ml-2 shrink-0">Visto</span>
                    </div>
                    <div className="bg-slate-800/90 px-3 py-2 rounded-xl border border-slate-700/60 flex items-center justify-between min-w-0">
                      <span className="text-slate-300 truncate">Escribir</span>
                      <span className="text-amber-400 font-bold ml-2 shrink-0">Escrito</span>
                    </div>
                    <div className="bg-slate-800/90 px-3 py-2 rounded-xl border border-slate-700/60 flex items-center justify-between min-w-0">
                      <span className="text-slate-300 truncate">Volver</span>
                      <span className="text-amber-400 font-bold ml-2 shrink-0">Vuelto</span>
                    </div>
                    <div className="bg-slate-800/90 px-3 py-2 rounded-xl border border-slate-700/60 flex items-center justify-between min-w-0">
                      <span className="text-slate-300 truncate">Poner</span>
                      <span className="text-amber-400 font-bold ml-2 shrink-0">Puesto</span>
                    </div>
                    <div className="bg-slate-800/90 px-3 py-2 rounded-xl border border-slate-700/60 flex items-center justify-between min-w-0">
                      <span className="text-slate-300 truncate">Morir</span>
                      <span className="text-amber-400 font-bold ml-2 shrink-0">Muerto</span>
                    </div>
                    <div className="bg-slate-800/90 px-3 py-2 rounded-xl border border-slate-700/60 flex items-center justify-between min-w-0">
                      <span className="text-slate-300 truncate">Abrir</span>
                      <span className="text-amber-400 font-bold ml-2 shrink-0">Abierto</span>
                    </div>
                  </div>
                </div>

                {/* White Card with Amber Border: IMPERFECTO */}
                <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-amber-500 shadow-xl space-y-5 flex flex-col justify-between min-w-0">
                  <div>
                    <h3 className="text-slate-900 font-black text-base sm:text-lg flex items-center tracking-wide mb-4">
                      <span className="mr-2 text-lg">⏳</span> IMPERFECTO (Only 3 Irregulars)
                    </h3>
                    <div className="grid grid-cols-3 gap-2 sm:gap-3 text-center text-xs sm:text-sm font-bold text-slate-800">
                      <div className="bg-amber-50 p-2.5 sm:p-3 rounded-xl border border-amber-200 min-w-0">
                        <span className="text-slate-500 block text-[11px] font-semibold">Ser</span>
                        <span className="text-amber-800 font-mono font-black text-sm sm:text-base truncate block mt-0.5">era</span>
                      </div>
                      <div className="bg-amber-50 p-2.5 sm:p-3 rounded-xl border border-amber-200 min-w-0">
                        <span className="text-slate-500 block text-[11px] font-semibold">Ir</span>
                        <span className="text-amber-800 font-mono font-black text-sm sm:text-base truncate block mt-0.5">iba</span>
                      </div>
                      <div className="bg-amber-50 p-2.5 sm:p-3 rounded-xl border border-amber-200 min-w-0">
                        <span className="text-slate-500 block text-[11px] font-semibold">Ver</span>
                        <span className="text-amber-800 font-mono font-black text-sm sm:text-base truncate block mt-0.5">veía</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-slate-400 italic">
                    *Իսպաներենի Pretérito Imperfecto-ում գոյություն ունի ընդամենը 3 անկանոն բայ։
                  </p>
                </div>
              </div>

              {/* Interactive Challenge Game Box */}
              {!gameFinished ? (
                <div className="bg-white rounded-3xl border border-slate-100 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.05)] p-5 sm:p-8 space-y-6 min-w-0">
                  
                  {/* Progress & Header */}
                  <div className="flex items-center justify-between text-xs font-black uppercase tracking-wider text-slate-400 border-b border-slate-100 pb-4">
                    <span>Card {currentGameIndex + 1} of {gameCards.length}</span>
                    <span className="text-amber-600 font-bold truncate ml-2">{currentException.tense}</span>
                  </div>

                  {/* Challenge Prompt */}
                  <div className="text-center py-5 px-4 bg-slate-50 rounded-2xl border border-slate-150 space-y-2 min-w-0">
                    <span className="text-[10px] font-black uppercase tracking-widest text-amber-700 bg-amber-100 px-3 py-1 rounded-full inline-block">
                      Գտնել ճիշտ անկանոն ձևը
                    </span>
                    <div className="text-3xl sm:text-4xl font-black text-slate-900 pt-1 break-words">
                      « {currentException.verb} »
                    </div>
                    <div className="text-xs sm:text-sm font-semibold text-slate-600 break-words">
                      Հայերեն նշանակությունը՝ <strong className="text-amber-800">{currentException.infinitiveHy}</strong>
                    </div>
                  </div>

                  {/* Option Buttons */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 min-w-0">
                    {gameOptions.map((opt, idx) => {
                      const isSelected = selectedGameAnswer === opt.text;
                      let btnClass = 'border-2 border-slate-200 hover:border-amber-500 hover:bg-amber-50/40 text-slate-900';

                      if (isAnswerChecked) {
                        if (opt.isCorrect) {
                          btnClass = 'border-2 border-emerald-500 bg-emerald-50 text-emerald-950 font-black';
                        } else if (isSelected && !opt.isCorrect) {
                          btnClass = 'border-2 border-rose-500 bg-rose-50 text-rose-950 font-medium';
                        } else {
                          btnClass = 'border-2 border-slate-150 text-slate-400 opacity-60';
                        }
                      }

                      return (
                        <button
                          key={idx}
                          id={`game-opt-${idx}`}
                          onClick={() => handleGameOptionClick(opt.text, opt.isCorrect)}
                          disabled={isAnswerChecked}
                          className={`p-4 sm:p-5 rounded-2xl text-center font-bold text-sm sm:text-base transition-all break-words max-w-full min-w-0 cursor-pointer ${btnClass}`}
                        >
                          <span className="break-words block leading-snug">{opt.text}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Feedback Explanation */}
                  {isAnswerChecked && (
                    <div className="bg-amber-50/80 p-5 sm:p-6 rounded-2xl border border-amber-200 space-y-4 animate-in fade-in duration-200 min-w-0">
                      <div className="space-y-1 min-w-0">
                        <div className="text-sm font-black text-amber-950 break-words">
                          {currentException.explanation}
                        </div>
                        <div className="text-xs font-semibold text-amber-900 break-words">
                          {currentException.explanationHy}
                        </div>
                      </div>

                      <div className="bg-white p-3.5 sm:p-4 rounded-xl border border-amber-200/80 text-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3 min-w-0">
                        <div className="min-w-0 flex-1">
                          <div className="font-bold text-slate-900 break-words">{currentException.exampleSentenceEs}</div>
                          <div className="text-xs text-slate-500 break-words mt-0.5">{currentException.exampleSentenceHy}</div>
                        </div>
                        <button
                          type="button"
                          onClick={() => speakSpanish(currentException.exampleSentenceEs)}
                          className="p-2 text-amber-700 hover:bg-amber-100 rounded-lg shrink-0 self-start sm:self-auto cursor-pointer"
                          title="Լսել օրինակը"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                      </div>

                      <button
                        id="game-next-btn"
                        onClick={nextGameQuestion}
                        className="w-full py-3.5 bg-slate-900 hover:bg-amber-600 text-white rounded-xl font-black uppercase tracking-widest text-xs transition-colors flex items-center justify-center gap-2 shadow-md cursor-pointer"
                      >
                        <span>{currentGameIndex + 1 >= gameCards.length ? 'Ավարտել խաղը' : 'Հաջորդ հարցը'}</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                /* Victory Screen */
                <div className="bg-white rounded-3xl border border-slate-100 shadow-xl p-8 sm:p-10 max-w-md mx-auto text-center space-y-6 min-w-0">
                  <div className="w-20 h-20 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mx-auto shadow-inner">
                    <Award className="w-10 h-10" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-2xl font-black text-slate-900">Շնորհավորում ենք։</h3>
                    <p className="text-xs text-slate-500">Դուք անցաք բոլոր հիմնական անկանոն բացառությունները։</p>
                  </div>
                  <div className="bg-slate-900 text-white p-4 rounded-2xl">
                    <div className="text-xs text-slate-400 font-bold uppercase tracking-widest">Վերջնական միավոր</div>
                    <div className="text-3xl font-black text-amber-400">{gameScore} միավոր</div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={restartGame}
                      className="flex-1 py-3 px-4 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <RotateCcw className="w-4 h-4" />
                      <span>Խաղալ նորից</span>
                    </button>
                    <button
                      onClick={() => setActiveTab('grammar')}
                      className="flex-1 py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl text-xs uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      <span>Cheat Sheet</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ======================================================================= */}
          {/* TAB 5: GRAMMAR SUMMARY & CHEAT SHEET */}
          {/* ======================================================================= */}
          {activeTab === 'grammar' && (
            <div className="space-y-8">
              {/* Header Title Section */}
              <div>
                <span className="px-4 py-1 bg-amber-100 text-amber-800 text-xs font-black rounded-full uppercase tracking-wider inline-block mb-2">
                  Reference Guide
                </span>
                <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900">
                  Past Tenses Cheat Sheet
                </h2>
                <p className="text-sm text-slate-500 mt-1">
                  Pretérito Perfecto Compuesto vs Pretérito Imperfecto համեմատական կառուցվածքը և կիրառությունը։
                </p>
              </div>

              {/* Two Tense Reference Cards */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 min-w-0">
                {/* Perfecto Card */}
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.05)] space-y-6 min-w-0">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                    <span className="text-xs font-black uppercase tracking-widest text-blue-700 bg-blue-100 px-3 py-1 rounded-full">
                      Pretérito Perfecto
                    </span>
                    <span className="text-xs text-slate-400 font-bold">Վաղակատար ներկա</span>
                  </div>

                  <h3 className="text-xl font-black text-slate-900 break-words">
                    haber (ներկա) + Participio
                  </h3>

                  <div className="bg-slate-900 text-slate-200 p-4 rounded-2xl text-xs font-mono space-y-1.5 break-words">
                    <div>he + participio</div>
                    <div>has + participio</div>
                    <div>ha + participio (ha visitado, ha visto)</div>
                    <div>hemos + participio (hemos hablado)</div>
                    <div>habéis + participio</div>
                    <div>han + participio (han pasado)</div>
                  </div>

                  <div className="space-y-2 text-xs sm:text-sm text-slate-600">
                    <div className="font-bold text-slate-900">Հիմնական ազդանշանային բառեր՝</div>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>hoy, esta mañana, esta tarde</li>
                      <li>este año, este mes, esta semana</li>
                      <li>alguna vez, nunca, ya, todavía no</li>
                    </ul>
                  </div>
                </div>

                {/* Imperfecto Card */}
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.05)] space-y-6 min-w-0">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                    <span className="text-xs font-black uppercase tracking-widest text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
                      Pretérito Imperfecto
                    </span>
                    <span className="text-xs text-slate-400 font-bold">Անկատար անցյալ</span>
                  </div>

                  <h3 className="text-xl font-black text-slate-900 break-words">
                    -aba / -ía վերջավորություններ
                  </h3>

                  <div className="bg-slate-900 text-slate-200 p-4 rounded-2xl text-xs font-mono space-y-1.5 break-words">
                    <div>-AR: trabajaba, trabajabas, trabajaba...</div>
                    <div>-ER / -IR: vivía, vivías, vivía, vivíamos...</div>
                    <div className="text-amber-400 font-bold pt-1">
                      ⚠️ 3 բացառություններ՝ Ser (era), Ir (iba), Ver (veía)
                    </div>
                  </div>

                  <div className="space-y-2 text-xs sm:text-sm text-slate-600">
                    <div className="font-bold text-slate-900">Հիմնական ազդանշանային բառեր՝</div>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>cada mañana, todos los días, a veces</li>
                      <li>cuando era joven / niño/a, en aquella época</li>
                      <li>normalmente, siempre (անցյալի սովորություն)</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Comparative Story Analysis Box */}
              <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl min-w-0">
                <div className="flex items-center gap-2 text-amber-500 font-black text-xs uppercase tracking-widest">
                  <BookmarkCheck className="w-4 h-4" />
                  <span>Տեքստերի համեմատական կիրառությունը</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm text-slate-300">
                  <div className="bg-slate-800 p-4 rounded-2xl border border-slate-700 min-w-0">
                    <strong className="text-amber-400 block mb-1 text-sm font-bold">Տեքստ 1 • Pedro y sus viajes</strong>
                    Պեդրոյի ճանապարհորդությունները նկարագրված են <strong>Pretérito Perfecto</strong>-ով («ha visitado», «ha visto», «ha hecho»), որովհետև դրանք կատարվել են այս տարի (este año) և կապված են ներկայի հետ։
                  </div>
                  <div className="bg-slate-800 p-4 rounded-2xl border border-slate-700 min-w-0">
                    <strong className="text-amber-400 block mb-1 text-sm font-bold">Տեքստ 2 • Carlos y Lucía</strong>
                    Կառլոսի և Լուսիայի երիտասարդությունը նկարագրված է <strong>Pretérito Imperfecto</strong>-ով («cuando eran jóvenes», «vivían», «trabajaba», «iba»), որովհետև նկարագրում է անցյալի առօրյան և սովորությունները։
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}
