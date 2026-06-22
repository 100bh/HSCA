import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronDown, 
  HelpCircle, 
  Book, 
  MessageCircle, 
  Ticket, 
  Mail, 
  Phone as PhoneIcon, 
  MapPin, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  TrendingUp, 
  LogIn,
  School,
  X,
  CreditCard
} from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { INITIAL_FAQS } from '../data';

interface PreLoginViewProps {
  onLogin: (name: string, email: string, campus: string, phone: string) => void;
}

export default function PreLoginView({ onLogin }: PreLoginViewProps) {
  const [openFaq, setOpenFaq] = useState<string | null>(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [prefillReason, setPrefillReason] = useState<string | null>(null);
  
  // Login form state
  const [loginName, setLoginName] = useState('');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPhone, setLoginPhone] = useState('');
  const [loginCampus, setLoginCampus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleOpenLogin = (reason?: string) => {
    if (reason) {
      setPrefillReason(reason);
    } else {
      setPrefillReason(null);
    }
    setIsLoginModalOpen(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Smooth delay for professional feel
    setTimeout(() => {
      const name = loginName.trim() || 'Aman Tripathy';
      const email = loginEmail.trim() || 'aman.campus@edu.in';
      const campus = loginCampus.trim() || 'MMMUT Gorakhpur';
      const phone = loginPhone.trim() || '+91 78807 17527';
      
      onLogin(name, email, campus, phone);
      setIsSubmitting(false);
      setIsLoginModalOpen(false);
    }, 800);
  };

  const handlePrefillMock = () => {
    setLoginName('Prashant Mishra');
    setLoginEmail('prashant.btech@mmmut.ac.in');
    setLoginPhone('+91 94523 88102');
    setLoginCampus('MMMUT Gorakhpur');
  };

  const toggleFaq = (id: string) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-300 font-sans overflow-x-hidden selection:bg-emerald-500/25">
      {/* Decorative Blob backgrounds */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-emerald-300/20 dark:bg-emerald-950/15 rounded-full blur-3xl -z-10 animate-pulse-slow"></div>
      <div className="absolute top-[400px] right-10 w-[600px] h-[600px] bg-cyan-300/20 dark:bg-cyan-900/10 rounded-full blur-3xl -z-10 animate-pulse-slow-reverse"></div>
      <div className="absolute bottom-40 left-10 w-[450px] h-[450px] bg-amber-200/15 dark:bg-amber-950/10 rounded-full blur-3xl -z-10 animate-pulse-slow"></div>

      {/* FLOATING HEADER */}
      <header className="sticky top-0 z-40 px-4 py-3 md:py-4">
        <nav className="max-w-6xl mx-auto glass-panel-heavy rounded-full px-6 py-2.5 flex items-center justify-between transition-all">
          <div className="flex items-center space-x-2">
            <div className="w-8 md:w-10 h-8 md:h-10 bg-gradient-to-tr from-emerald-500 to-teal-400 rounded-xl flex items-center justify-center text-white font-extrabold shadow-sm shadow-emerald-500/20">
              <span className="font-display text-lg tracking-wider">H</span>
            </div>
            <span className="font-display font-bold text-base md:text-lg tracking-tight text-slate-900 dark:text-white">
              HomeSarthi <span className="text-emerald-500 font-medium text-xs md:text-sm bg-emerald-500/10 px-2 py-0.5 rounded-full ml-1">Ambassador</span>
            </span>
          </div>

          {/* Nav Links */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-sm font-medium text-slate-600 hover:text-emerald-500 dark:text-slate-300 dark:hover:text-emerald-400 transition-colors">Home</a>
            <a href="#faq" className="text-sm font-medium text-slate-600 hover:text-emerald-500 dark:text-slate-300 dark:hover:text-emerald-400 transition-colors">FAQs</a>
            <a href="#support" className="text-sm font-medium text-slate-600 hover:text-emerald-500 dark:text-slate-300 dark:hover:text-emerald-400 transition-colors">Support Services</a>
            <a href="#contact" className="text-sm font-medium text-slate-600 hover:text-emerald-500 dark:text-slate-300 dark:hover:text-emerald-400 transition-colors">Contact</a>
          </div>

          {/* Secondary Actions */}
          <div className="flex items-center space-x-3">
            <ThemeToggle />
            <button
              id="member-login-nav-btn"
              onClick={() => handleOpenLogin()}
              className="flex items-center space-x-1.5 px-4 py-2 rounded-full text-xs md:text-sm font-medium glass-panel border border-slate-200/50 dark:border-slate-800/80 hover:bg-emerald-500 hover:text-white dark:hover:bg-emerald-500 dark:hover:text-white transition-all transform active:scale-95 duration-200 cursor-pointer"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Login</span>
            </button>
          </div>
        </nav>
      </header>

      {/* SECTION 1: HERO (HOME) */}
      <section id="home" className="pt-8 md:pt-20 pb-16 px-4 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-12 gap-12 items-center">
          
          <div className="md:col-span-7 flex flex-col space-y-6 text-center md:text-left">
            <div className="inline-flex items-center justify-center md:justify-start space-x-2">
              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-full text-xs font-semibold uppercase tracking-wider flex items-center space-x-1">
                <Sparkles className="w-3 h-3 text-emerald-500 animate-spin-slow" />
                <span>Now live for session 2026</span>
              </span>
            </div>

            <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-slate-900 dark:text-white leading-[1.05]">
              Turn Your Campus Network into <span className="bg-gradient-to-r from-emerald-500 to-teal-400 bg-clip-text text-transparent">Net Worth</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal max-w-xl mx-auto md:mx-0">
              Join the official HomeSarthi Campus Ambassador program. Share your Unique ID, help students find verified hassle-free flats, and earn handsome flat commissions on every successful booking. Zero investment required.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start space-y-3 sm:space-y-0 sm:space-x-4 pt-2">
              <button
                id="apply-now-hero-btn"
                onClick={() => handleOpenLogin('Apply for free in 60s')}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold shadow-lg shadow-emerald-500/15 transform hover:-translate-y-0.5 active:translate-y-0 active:scale-98 transition-all hover:shadow-xl hover:shadow-emerald-500/20 flex items-center justify-center space-x-2 cursor-pointer group"
              >
                <span>Apply Now</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                id="member-login-hero-btn"
                onClick={() => handleOpenLogin()}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white/40 dark:bg-slate-900/40 hover:bg-white/80 dark:hover:bg-slate-900/80 border border-slate-300/40 dark:border-slate-800/85 text-slate-700 dark:text-slate-200 hover:text-slate-950 dark:hover:text-white font-semibold transition-all transform active:scale-98 flex items-center justify-center space-x-2 cursor-pointer"
              >
                <span>Member Login</span>
              </button>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 max-w-lg mx-auto md:mx-0">
              <div className="p-3 bg-white/30 dark:bg-slate-900/20 rounded-xl border border-white/40 dark:border-white/5 backdrop-blur-sm">
                <p className="text-xs text-slate-500 dark:text-slate-400">Zero brokerage</p>
                <p className="text-lg font-bold text-slate-800 dark:text-white mt-0.5">Free Leads</p>
              </div>
              <div className="p-3 bg-white/30 dark:bg-slate-900/20 rounded-xl border border-white/40 dark:border-white/5 backdrop-blur-sm">
                <p className="text-xs text-slate-500 dark:text-slate-400">Payout Period</p>
                <p className="text-lg font-bold text-emerald-500 dark:text-emerald-400 mt-0.5">Weekly</p>
              </div>
              <div className="col-span-2 sm:col-span-1 p-3 bg-white/30 dark:bg-slate-900/20 rounded-xl border border-white/40 dark:border-white/5 backdrop-blur-sm flex flex-col justify-center">
                <p className="text-xs text-slate-500 dark:text-slate-400">Active Campus Partners</p>
                <p className="text-lg font-bold text-slate-800 dark:text-white mt-0.5">500+ Ambassadors</p>
              </div>
            </div>
          </div>

          {/* VISUAL COMPONENT: APPLE INSPIRED GLASSMOPHIC FLOATING CARDS */}
          <div className="md:col-span-5 relative flex justify-center items-center py-10 md:py-0">
            {/* Spotlight Accent Ring behind cards */}
            <div className="absolute w-72 h-72 bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full blur-[80px] opacity-15 dark:opacity-25 -z-10 animate-pulse"></div>

            <div className="relative w-full max-w-[340px]">
              
              {/* Card 1: MAIN CARD FOR PATOUT TRACKING */}
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="w-full glass-panel-heavy rounded-3xl p-6 border relative z-20"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-2.5">
                    <div className="w-7 h-7 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                      <CreditCard className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 font-mono">UID: HS-AMB-8824</span>
                  </div>
                  <span className="text-[10px] uppercase font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                    Active Partner
                  </span>
                </div>

                <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Ambassador Balance</p>
                <div className="flex items-baseline space-x-1.5 mt-1">
                  <span className="text-3xl font-display font-extrabold text-slate-900 dark:text-white">₹5.00</span>
                  <span className="text-xs font-semibold text-slate-400">Earned</span>
                </div>

                {/* Micro Chart Simulator for realistic view */}
                <div className="mt-5 pt-4 border-t border-slate-200/40 dark:border-slate-800/45 flex justify-between items-center">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-slate-400 font-mono font-medium">VERIFIED LEADS</span>
                    <span className="text-sm font-bold text-slate-800 dark:text-slate-100">12 Booking Referrals</span>
                  </div>
                  <div className="flex items-center space-x-1 text-xs text-emerald-500 font-semibold bg-emerald-500/10 px-2 py-1 rounded-lg">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>81% convs</span>
                  </div>
                </div>

                {/* Instant Copy Invitation Mock */}
                <div className="mt-4 p-2.5 bg-slate-900/5 dark:bg-white/5 rounded-xl flex items-center justify-between border border-slate-900/5 dark:border-white/5">
                  <span className="text-[10px] font-mono font-medium truncate text-slate-500 dark:text-slate-400">homesarthi.in?ref=HS-8824</span>
                  <span className="text-[9px] font-bold text-emerald-500 cursor-pointer hover:underline">Copy Code</span>
                </div>
              </motion.div>

              {/* FLOATING MINI CARD: COMMISSION SHIELD (Card 2) */}
              <motion.div 
                initial={{ x: 40, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="absolute -right-6 -bottom-6 w-44 glass-panel rounded-2xl p-4 border border-emerald-500/20 shadow-md z-30 hidden sm:block"
              >
                <div className="flex items-center space-x-2">
                  <div className="p-1 px-1.5 bg-emerald-500 text-white rounded-md text-[10px] font-bold">
                    ✓
                  </div>
                  <div>
                    <h4 className="text-[11px] font-semibold text-slate-800 dark:text-white leading-tight">Payout Cleared</h4>
                    <span className="text-[9px] text-emerald-500 dark:text-emerald-400 font-medium font-mono">100% Secure via UPI</span>
                  </div>
                </div>
              </motion.div>

              {/* FLOATING DECORATIVE ICON (Card 3) */}
              <motion.div 
                initial={{ x: -30, y: -45, opacity: 0 }}
                animate={{ x: -10, y: -30, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="absolute -left-8 -top-8 w-14 h-14 glass-panel rounded-2xl flex items-center justify-center border border-white/50 shadow-md z-10"
              >
                <div className="w-9 h-9 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500">
                  <ShieldCheck className="w-5 h-5" />
                </div>
              </motion.div>

            </div>
          </div>

        </div>
      </section>

      {/* SECTION 2: THE AMBASSADOR VALUE PROP (AESTHETIC GRID) */}
      <section className="py-16 bg-white/20 dark:bg-slate-900/10 border-y border-slate-200/30 dark:border-slate-800/30 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-12">
            <h2 className="font-display font-extrabold text-2xl md:text-3xl text-slate-900 dark:text-white">Why Join HomeSarthi Ecosystem?</h2>
            <p className="text-slate-500 dark:text-slate-400 text-xs md:text-sm mt-2">Zero-brokerage flat referrals designed to optimize campus tenant acquisition seamlessly.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="glass-panel p-5 rounded-2xl border flex flex-col space-y-3">
              <span className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center font-bold">₹</span>
              <h3 className="font-display font-bold text-slate-800 dark:text-white">Instant Flat Payouts</h3>
              <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed">Earn reliable flat commissions of ₹5.00 or higher for every visitor registering or successfully checking in with your code.</p>
            </div>
            
            <div className="glass-panel p-5 rounded-2xl border flex flex-col space-y-3">
              <School className="w-6 h-6 text-emerald-500" />
              <h3 className="font-display font-bold text-slate-800 dark:text-white">Expand Campus Authority</h3>
              <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed">Become an official representative, networking with hundreds of students looking for premium flats around Gorakhpur MMMUT or DDU area.</p>
            </div>

            <div className="glass-panel p-5 rounded-2xl border flex flex-col space-y-3">
              <ShieldCheck className="w-6 h-6 text-emerald-500" />
              <h3 className="font-display font-bold text-slate-800 dark:text-white">Verified Flat Catalog</h3>
              <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed">Guarantee peace of mind to friends. All single-room, PG, and apartment listings are pre-verified with actual walk-through videos.</p>
            </div>

            <div className="glass-panel p-5 rounded-2xl border flex flex-col space-y-3">
              <MessageCircle className="w-6 h-6 text-emerald-500" />
              <h3 className="font-display font-bold text-slate-800 dark:text-white">24/7 Priority Support</h3>
              <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed">Dedicated relationship managers allocated to Elite Ambassadors, resolving tenant onboarding disputes in real-time.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: FAQ ACCORDION */}
      <section id="faq" className="py-20 px-4 max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 bg-teal-500/10 text-teal-600 dark:text-teal-400 rounded-full text-xs font-semibold uppercase mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Got Questions?</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl md:text-4xl text-slate-900 dark:text-white tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-sm md:text-base text-slate-500 dark:text-slate-400 mt-2 max-w-lg mx-auto">
            Everything you need to know about the HomeSarthi Campus Ambassador program rules and payout operations.
          </p>
        </div>

        {/* Accordion Component */}
        <div className="space-y-4">
          {INITIAL_FAQS.map((faq) => {
            const isOpen = openFaq === faq.id;
            return (
              <div 
                key={faq.id}
                className="glass-panel rounded-2xl border overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full text-left px-6 py-4 md:py-5 flex items-center justify-between font-display font-semibold text-sm md:text-base text-slate-800 dark:text-white cursor-pointer select-none active:bg-slate-500/5 focus:outline-none"
                >
                  <span>{faq.question}</span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-emerald-500' : ''}`} />
                </button>
                
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                    >
                      <div className="px-6 pb-5 pt-1 text-xs md:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-200/20 dark:border-slate-800/25">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION 4: SUPPORT SERVICES SECTION */}
      <section id="support" className="py-16 bg-slate-100/40 dark:bg-slate-900/20 border-y border-slate-200/50 dark:border-slate-800/40 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-12">
            <h2 className="font-display font-extrabold text-2xl md:text-3xl text-slate-900 dark:text-white">Support Channels</h2>
            <p className="text-slate-500 dark:text-slate-400 text-xs md:text-sm mt-1">Get immediate answers through our specialized pre-login partner services.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {/* SLA Card 1 */}
            <div 
              onClick={() => handleOpenLogin('Access Knowledge Base')}
              className="glass-panel p-6 rounded-2xl border text-center flex flex-col items-center space-y-4 hover:shadow-lg hover:border-emerald-500/20 transition-all cursor-pointer transform hover:-translate-y-1 active:scale-98"
            >
              <div className="w-12 h-12 rounded-2xl bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center">
                <Book className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-display font-bold text-sm text-slate-800 dark:text-white">Knowledge Base</h3>
                <p className="text-slate-400 text-[11px] mt-1.5 leading-relaxed">Read ambassador onboarding guides, marketing resources, and sample pitch template catalogs.</p>
              </div>
              <span className="text-[10px] font-bold text-emerald-500 dark:text-emerald-400 flex items-center space-x-1 mt-auto">
                <span>Browse Guides</span>
                <ArrowRight className="w-3 h-3" />
              </span>
            </div>

            {/* SLA Card 2 */}
            <div 
              onClick={() => handleOpenLogin('Start Live Support Chat')}
              className="glass-panel p-6 rounded-2xl border text-center flex flex-col items-center space-y-4 hover:shadow-lg hover:border-emerald-500/20 transition-all cursor-pointer transform hover:-translate-y-1 active:scale-98"
            >
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
                <MessageCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-display font-bold text-sm text-slate-800 dark:text-white">Live Chat</h3>
                <p className="text-slate-400 text-[11px] mt-1.5 leading-relaxed">Connect with our Gorakhpur operations office via instant telegram/whatsapp chat. SLA of under 5 minutes.</p>
              </div>
              <span className="text-[10px] font-bold text-emerald-500 dark:text-emerald-400 flex items-center space-x-1 mt-auto">
                <span>Start Chat</span>
                <ArrowRight className="w-3 h-3" />
              </span>
            </div>

            {/* SLA Card 3 */}
            <div 
              onClick={() => handleOpenLogin('Raise a Ticket')}
              className="glass-panel p-6 rounded-2xl border text-center flex flex-col items-center space-y-4 hover:shadow-lg hover:border-emerald-500/20 transition-all cursor-pointer transform hover:-translate-y-1 active:scale-98"
            >
              <div className="w-12 h-12 rounded-2xl bg-red-500/10 text-red-500 flex items-center justify-center">
                <Ticket className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-display font-bold text-sm text-slate-800 dark:text-white">Raise a Ticket</h3>
                <p className="text-slate-400 text-[11px] mt-1.5 leading-relaxed font-normal">Report conversion lags, update bank account info, or seek assistance with specific customer files.</p>
              </div>
              <span className="text-[10px] font-bold text-emerald-500 dark:text-emerald-400 flex items-center space-x-1 mt-auto">
                <span>Submit Ticket</span>
                <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: CONTACT SECTION & FOOTER */}
      <footer id="contact" className="pt-20 pb-12 bg-slate-100 dark:bg-slate-900/60 border-t border-slate-200/50 dark:border-slate-800/80 transition-all">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-12 gap-10 items-start">
            
            {/* Info Col */}
            <div className="md:col-span-5 flex flex-col space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center text-white font-extrabold">
                  <span className="font-display text-base">H</span>
                </div>
                <span className="font-display font-bold text-base tracking-tight text-slate-900 dark:text-white">
                  HomeSarthi Campus Ambassador
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-normal max-w-sm">
                Empowering college students across Uttar Pradesh to earn side income by recommending high-quality, verified, brokerage-free flats and hostels to their peers.
              </p>
              
              <div className="space-y-3 pt-2">
                <div className="flex items-center space-x-3 text-xs text-slate-600 dark:text-slate-300">
                  <Mail className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <a href="mailto:homesarthi247@gmail.com" className="hover:text-emerald-500 transition-colors">homesarthi247@gmail.com</a>
                </div>
                <div className="flex items-center space-x-3 text-xs text-slate-600 dark:text-slate-300">
                  <PhoneIcon className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <a href="tel:+917880717527" className="hover:text-emerald-500 transition-colors">+91 78807 17527</a>
                </div>
                <div className="flex items-start space-x-3 text-xs text-slate-600 dark:text-slate-300">
                  <MapPin className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <span>Gorakhnath, Gorakhpur, Uttar Pradesh, 273015</span>
                </div>
              </div>
            </div>

            {/* Quick Links Col */}
            <div className="md:col-span-3 flex flex-col space-y-3">
              <h4 className="font-display font-semibold text-xs text-slate-900 dark:text-white uppercase tracking-wider">Quick Navigation</h4>
              <ul className="space-y-2.5 text-xs text-slate-500 dark:text-slate-400">
                <li><a href="#home" className="hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors">Ambassador Home</a></li>
                <li><a href="#faq" className="hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors font-normal">Faq list</a></li>
                <li><a href="#support" className="hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors">Onboarding Support</a></li>
                <li><button onClick={() => handleOpenLogin()} className="hover:text-emerald-500 dark:hover:text-emerald-400 text-left transition-colors cursor-pointer focus:outline-none">Sign In Account</button></li>
              </ul>
            </div>

            {/* Newsletter/Disclaimer */}
            <div className="md:col-span-4 flex flex-col space-y-3">
              <h4 className="font-display font-semibold text-xs text-slate-900 dark:text-white uppercase tracking-wider">Verification Standards</h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
                HomeSarthi guarantees 100% zero brokerage housing. Each listing undergoes a rigorous 4-step security checklist before ambassador code affiliation is activated. 
              </p>
              <div className="p-3 bg-white/40 dark:bg-slate-950/40 rounded-xl border border-slate-200/50 dark:border-slate-800/80 mt-1">
                <span className="text-[10px] font-semibold text-emerald-500 font-mono tracking-tight block">OFFICIAL SUPPORT PHONE</span>
                <span className="text-xs font-bold text-slate-800 dark:text-slate-100 block mt-0.5">+91 78807 17527</span>
              </div>
            </div>

          </div>

          <div className="mt-12 pt-6 border-t border-slate-350 dark:border-slate-850 text-center flex flex-col sm:flex-row justify-between items-center text-slate-450 dark:text-slate-500 text-[11px]">
            <p>© 2026 HomeSarthi Ecosystem. All rights reserved.</p>
            <div className="flex space-x-4 mt-2 sm:mt-0">
              <a href="#" className="hover:underline">Privacy Policy</a>
              <a href="#" className="hover:underline">Terms of Ambassador Agreement</a>
            </div>
          </div>
        </div>
      </footer>

      {/* LOGIN MODAL (AUTHENTICATION STATE CHANGE HANDLER) */}
      <AnimatePresence>
        {isLoginModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            
            {/* Backdrop Blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsLoginModalOpen(false)}
              className="absolute inset-0 bg-slate-950/40 dark:bg-slate-950/70 backdrop-blur-md"
            ></motion.div>

            {/* Modal Body */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              className="relative w-full max-w-md glass-panel-heavy rounded-3xl p-6 md:p-8 border shadow-2xl z-10 text-slate-850 dark:text-slate-100"
            >
              <button
                onClick={() => setIsLoginModalOpen(false)}
                className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-900 border border-transparent hover:border-slate-200 dark:hover:border-slate-800 text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="text-center mb-6">
                <div className="w-12 h-12 bg-emerald-500/15 text-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <LogIn className="w-6 h-6" />
                </div>
                <h3 className="font-display font-extrabold text-2xl text-slate-900 dark:text-white tracking-tight">
                  {prefillReason ? 'Apply for Ambassador' : 'Ambassador Sign In'}
                </h3>
                <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
                  {prefillReason || 'Access your secure real-time tracking, conversion tables, and earnings.'}
                </p>
              </div>

              {/* Instant prefill helper for quick testing */}
              <div className="mb-4 bg-emerald-500/10 border border-emerald-500/25 p-3 rounded-xl flex items-center justify-between text-[11px] text-emerald-700 dark:text-emerald-400">
                <span>Want to test immediately?</span>
                <button 
                  type="button"
                  onClick={handlePrefillMock}
                  className="font-bold underline uppercase cursor-pointer hover:text-emerald-500 transition-all"
                >
                  Prefill Demo Data
                </button>
              </div>

              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div>
                  <label htmlFor="login-name" className="block text-[11px] uppercase tracking-wider font-semibold text-slate-500 dark:text-slate-400 mb-1.5 font-sans">Full Name</label>
                  <input
                    id="login-name"
                    type="text"
                    required
                    placeholder="e.g. Aman Tripathy"
                    value={loginName}
                    onChange={(e) => setLoginName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800/80 bg-white/20 dark:bg-slate-950/40 text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="login-email" className="block text-[11px] uppercase tracking-wider font-semibold text-slate-500 dark:text-slate-400 mb-1.5">Email Address</label>
                  <input
                    id="login-email"
                    type="email"
                    required
                    placeholder="e.g. aman@gmail.com"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800/80 bg-white/20 dark:bg-slate-950/40 text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 text-sm"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="login-phone" className="block text-[11px] uppercase tracking-wider font-semibold text-slate-500 dark:text-slate-400 mb-1.5">Phone Number</label>
                    <input
                      id="login-phone"
                      type="text"
                      required
                      placeholder="e.g. +91 78807 17527"
                      value={loginPhone}
                      onChange={(e) => setLoginPhone(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800/80 bg-white/20 dark:bg-slate-950/40 text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="login-campus" className="block text-[11px] uppercase tracking-wider font-semibold text-slate-500 dark:text-slate-400 mb-1.5">Campus Name</label>
                    <input
                      id="login-campus"
                      type="text"
                      required
                      placeholder="e.g. MMMUT Gorakhpur"
                      value={loginCampus}
                      onChange={(e) => setLoginCampus(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800/80 bg-white/20 dark:bg-slate-950/40 text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 text-sm"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    id="submit-login-credentials-btn"
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:from-emerald-600 hover:to-teal-600 font-semibold transition-all transform active:scale-95 flex items-center justify-center space-x-2 cursor-pointer shadow-md shadow-emerald-500/10"
                  >
                    {isSubmitting ? (
                      <span className="inline-block w-4 h-4 rounded-full border-2 border-white/50 border-t-transparent animate-spin"></span>
                    ) : (
                      <>
                        <span>Enter Dashboard Ecosystem</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
