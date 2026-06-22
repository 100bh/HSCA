import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Home, 
  LayoutDashboard, 
  HelpCircle, 
  PhoneCall, 
  Copy, 
  Check, 
  Bell, 
  Search, 
  Plus, 
  User, 
  Mail, 
  Building, 
  Wallet, 
  CheckCircle, 
  Clock, 
  Lock, 
  Key, 
  Send,
  MessageSquare,
  Sparkles,
  Phone,
  LogOut,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  Award
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import ThemeToggle from './ThemeToggle';
import { UserProfile, BookingCommission, SupportTicket, DailyEarning } from '../types';
import { EARNINGS_30_DAYS, ACCOUNT_MANAGER } from '../data';

interface PostLoginViewProps {
  user: UserProfile;
  bookings: BookingCommission[];
  tickets: SupportTicket[];
  onAddTicket: (ticket: Omit<SupportTicket, 'id' | 'createdAt' | 'status'>) => void;
  onUpdateProfile: (updatedUser: UserProfile) => void;
  onLogout: () => void;
}

type TabType = 'home' | 'dashboard' | 'support' | 'contact';

export default function PostLoginView({ 
  user, 
  bookings, 
  tickets, 
  onAddTicket, 
  onUpdateProfile,
  onLogout 
}: PostLoginViewProps) {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [copiedId, setCopiedId] = useState(false);
  const [alertDismissed, setAlertDismissed] = useState(false);

  // Search & Filter state for dashboard table
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Verified' | 'Pending'>('All');

  // Interactive profile/UPI update state
  const [isEditingPayment, setIsEditingPayment] = useState(false);
  const [upiField, setUpiField] = useState(user.linkedUpi);
  const [bankAccountField, setBankAccountField] = useState(user.bankAccount);
  const [ifscCodeField, setIfscCodeField] = useState(user.ifscCode);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Interactive Support ticket submission
  const [ticketTitle, setTicketTitle] = useState('');
  const [ticketCategory, setTicketCategory] = useState('Payout & Earnings');
  const [ticketDescription, setTicketDescription] = useState('');
  const [ticketSuccess, setTicketSuccess] = useState(false);

  // Clipboard UID Copy Handler
  const handleCopyUID = () => {
    navigator.clipboard.writeText(user.uid);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  // Profile Form Handler
  const handleUpdatePayment = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile({
      ...user,
      linkedUpi: upiField,
      bankAccount: bankAccountField,
      ifscCode: ifscCodeField,
      isUpiLinked: !!(upiField.trim() || bankAccountField.trim())
    });
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      setIsEditingPayment(false);
    }, 1500);
  };

  // Ticket Form Handler
  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketTitle.trim() || !ticketDescription.trim()) return;
    
    onAddTicket({
      title: ticketTitle,
      category: ticketCategory,
      description: ticketDescription,
    });
    
    setTicketTitle('');
    setTicketDescription('');
    setTicketSuccess(true);
    setTimeout(() => setTicketSuccess(false), 3000);
  };

  // Calculate stats dynamically based on current bookings props
  const stats = useMemo(() => {
    const verified = bookings.filter(b => b.status === 'Verified');
    const pending = bookings.filter(b => b.status === 'Pending');
    
    const lifetimeEarnings = bookings.reduce((sum, b) => sum + (b.status === 'Verified' ? b.amount : 0), 0);
    const pendingClearances = bookings.reduce((sum, b) => sum + (b.status === 'Pending' ? b.amount : 0), 0);
    const availableForWithdrawal = lifetimeEarnings - 1200 > 0 ? lifetimeEarnings - 1200 : lifetimeEarnings; 

    return {
      lifetimeEarnings,
      pendingClearances,
      availableForWithdrawal,
      totalReferrals: bookings.length,
      verifiedCount: verified.length,
      pendingCount: pending.length
    };
  }, [bookings]);

  // Filter properties in conversion table
  const filteredBookings = useMemo(() => {
    return bookings.filter(b => {
      const matchSearch = b.propertyName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          b.tenantInitial.toLowerCase().includes(searchQuery.toLowerCase());
      const matchStatus = statusFilter === 'All' || b.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [bookings, searchQuery, statusFilter]);

  // Navigation Items Config
  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'support', label: 'Support', icon: HelpCircle },
    { id: 'contact', label: 'Contact', icon: PhoneCall },
  ] as const;

  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-300 flex flex-col md:flex-row select-none">
      
      {/* Background Orbs */}
      <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-emerald-500/10 dark:bg-emerald-950/10 rounded-full blur-[100px] -z-10 pointer-events-none"></div>
      <div className="absolute bottom-10 left-10 w-[350px] h-[350px] bg-indigo-500/5 dark:bg-indigo-950/10 rounded-full blur-[100px] -z-10 pointer-events-none"></div>

      {/* DESKTOP GLASS SIDEBAR */}
      <aside className="hidden md:flex flex-col w-64 h-screen sticky top-0 bg-white/40 dark:bg-slate-950/40 border-r border-slate-200/50 dark:border-slate-800/80 backdrop-blur-xl p-6 z-30">
        
        {/* Brand name */}
        <div className="flex items-center space-x-2.5 mb-10 pt-2">
          <div className="w-9 h-9 bg-gradient-to-tr from-emerald-500 to-teal-400 rounded-xl flex items-center justify-center text-white font-extrabold shadow-sm">
            <span className="font-display text-base">H</span>
          </div>
          <div>
            <h1 className="font-display font-bold text-sm tracking-tight text-slate-900 dark:text-white leading-tight">
              HomeSarthi
            </h1>
            <span className="text-[10px] font-medium text-emerald-500 font-mono tracking-wider">
              AMBASSADOR HUB
            </span>
          </div>
        </div>

        {/* Navigation lists */}
        <div className="flex-1 space-y-2.5">
          <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest pl-2">Navigation</span>
          <nav className="space-y-1">
            {navItems.map((item) => {
              const IconComp = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all transform active:scale-97 cursor-pointer text-left ${
                    isActive 
                      ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20' 
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-900/5 dark:hover:bg-white/5 hover:text-slate-950 dark:hover:text-white border border-transparent'
                  }`}
                >
                  <IconComp className={`w-4 h-4 ${isActive ? 'text-emerald-500' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest pl-2 block pt-4">User Settings</span>
          <div className="px-2 py-3 bg-white/30 dark:bg-slate-900/10 rounded-xl border border-slate-200/40 dark:border-slate-800/60 backdrop-blur-sm">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-xs text-emerald-500 font-bold border border-emerald-500/20">
                {user.name.charAt(0)}
              </div>
              <div className="overflow-hidden">
                <p className="text-xs font-bold text-slate-800 dark:text-white truncate">{user.name}</p>
                <span className="text-[10.5px] text-emerald-500 dark:text-emerald-400 font-medium font-mono">
                  {user.level} AMB
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Global Utilities / Toggle / Logout */}
        <div className="space-y-4 pt-4 border-t border-slate-200/40 dark:border-slate-800/65">
          <div className="flex items-center justify-between px-2">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Appearance</span>
            <ThemeToggle />
          </div>

          <button
            onClick={onLogout}
            className="w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl text-xs font-bold text-red-500 hover:bg-red-500/10 transition-colors uppercase tracking-wider cursor-pointer border border-transparent hover:border-red-500/20"
          >
            <LogOut className="w-4 h-4" />
            <span>Terminate Session</span>
          </button>
        </div>
      </aside>

      {/* MOBILE BOTTOM NAVIGATION DOCK (Apple-inspired glass floating dock) */}
      <nav className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-sm glass-panel-heavy rounded-full px-4 py-2.5 flex items-center justify-between border shadow-lg">
        {navItems.map((item) => {
          const IconComp = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center justify-center p-2 rounded-full cursor-pointer relative ${
                isActive ? 'text-emerald-500' : 'text-slate-500 dark:text-slate-400'
              }`}
            >
              {isActive && (
                <motion.span 
                  layoutId="mobileNavActiveIndicator"
                  className="absolute inset-0 bg-emerald-500/10 rounded-full -z-10"
                  transition={{ type: "spring", stiffness: 350, damping: 25 }}
                />
              )}
              <IconComp className="w-5 h-5" />
              <span className="text-[9px] mt-0.5 font-bold tracking-tight">{item.label}</span>
            </button>
          );
        })}
        {/* Quick mobile theme toggler embedded in dock */}
        <ThemeToggle className="scale-85 bg-transparent border-none p-1" />
        {/* Logout button */}
        <button 
          onClick={onLogout} 
          className="text-red-500 p-2 cursor-pointer"
          title="Sign out"
        >
          <LogOut className="w-5 h-5" />
        </button>
      </nav>

      {/* MAIN SYSTEM CONTAINER */}
      <main className="flex-1 min-h-screen overflow-y-auto px-4 py-6 md:p-8 pb-28 md:pb-8">
        
        {/* MAIN SUB-HEADER WITH NOTIFICATIONS */}
        <header className="flex items-center justify-between mb-8 max-w-5xl mx-auto border-b border-slate-200/30 dark:border-slate-800/30 pb-4">
          <div>
            <h2 className="font-display font-black text-2xl md:text-3xl tracking-tight text-slate-900 dark:text-white capitalize">
              {activeTab} Management
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Secure Affiliated System Panel • {user.campus}
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <span className="text-xs font-bold bg-slate-900/5 dark:bg-white/5 border border-slate-200/40 dark:border-slate-800/80 px-3 py-1.5 rounded-full flex items-center space-x-1.5 font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>LIVE SERVER</span>
            </span>
          </div>
        </header>

        {/* DYNAMIC TAB CONTROLLER */}
        <div className="max-w-5xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -15, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              
              {/* TAB 1: HOME TAB (QUICK OVERVIEW) */}
              {activeTab === 'home' && (
                <div id="home-tab-panel" className="space-y-6">
                  
                  {/* Dynamic Alert Banner */}
                  {!alertDismissed && (
                    <div className="relative glass-panel bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border-emerald-500/30 p-4 rounded-2xl flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-500 animate-bounce">
                          <Bell className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-xs md:text-sm font-bold text-slate-800 dark:text-emerald-400">
                            🎉 2 new bookings verified today!
                          </p>
                          <p className="text-[11px] text-slate-500 dark:text-slate-300">Your UID commissions have updated. Withdraw cleared earnings immediately.</p>
                        </div>
                      </div>
                      <button 
                        onClick={() => setAlertDismissed(true)}
                        className="text-slate-400 hover:text-slate-700 dark:hover:text-white text-xs font-bold leading-none p-1 cursor-pointer"
                      >
                        Dismiss
                      </button>
                    </div>
                  )}

                  {/* UID Card & Metrics Grid */}
                  <div className="grid md:grid-cols-12 gap-6">
                    
                    {/* Unique Identifier Lead Card */}
                    <div className="md:col-span-6 glass-panel-heavy rounded-3xl p-6 border relative overflow-hidden flex flex-col justify-between">
                      {/* background mesh accent */}
                      <div className="absolute right-0 top-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl -z-10"></div>
                      
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-[10px] uppercase font-bold tracking-widest text-slate-500 dark:text-slate-400">
                            Exclusive Campus Code
                          </span>
                          <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-500">
                            <Award className="w-3 h-3" />
                            <span>{user.level} Tier</span>
                          </span>
                        </div>

                        <h3 className="text-slate-405 dark:text-slate-400 text-xs font-medium">Your Unique ID</h3>
                        <div className="flex items-center space-x-4 mt-2">
                          <span className="text-3xl md:text-4xl font-display font-black text-slate-900 dark:text-white tracking-wider font-mono">
                            {user.uid}
                          </span>
                          <button
                            onClick={handleCopyUID}
                            className="bg-slate-900/5 dark:bg-white/5 border border-slate-200/50 dark:border-slate-800/80 p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-emerald-500 hover:text-white transition-all transform active:scale-95 cursor-pointer"
                            title="Copy Code to Clipboard"
                          >
                            {copiedId ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                          </button>
                        </div>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2.5 leading-relaxed font-normal">
                          Refer tenants at zero-brokerage with your ID. When they enter this code during booking at HomeSarthi, ₹5.00 gets unlocked, plus flat referral premiums up to ₹3,000 per tenant sign-up.
                        </p>
                      </div>

                      <div className="pt-6 border-t border-slate-200/40 dark:border-slate-800/40 mt-6 flex justify-between items-center bg-slate-500/5 -mx-6 -mb-6 p-6 rounded-b-3xl">
                        <div>
                          <span className="text-[9px] uppercase font-bold text-slate-400 font-mono">Affiliation Link</span>
                          <div className="text-xs font-mono font-medium truncate text-emerald-500 max-w-[180px] sm:max-w-xs mt-0.5">
                            homesarthi.in/ref={user.uid}
                          </div>
                        </div>
                        <button 
                          onClick={handleCopyUID}
                          className="text-[10px] font-bold text-slate-800 dark:text-white hover:underline uppercase flex items-center space-x-1 cursor-pointer"
                        >
                          <span>Copy link</span>
                          <ExternalLink className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                    {/* Snapshot Cards */}
                    <div className="md:col-span-6 grid grid-cols-2 gap-4">
                      
                      <div className="glass-panel p-5 rounded-2xl border flex flex-col justify-between">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Total Referrals</span>
                          <div className="p-1 px-2.5 bg-emerald-500/10 text-emerald-500 rounded-full text-[10px] font-bold font-mono">
                            {stats.verifiedCount} verified
                          </div>
                        </div>
                        <div>
                          <p className="text-3xl font-display font-extrabold text-slate-900 dark:text-white mt-4">{stats.totalReferrals}</p>
                          <p className="text-xs text-slate-450 dark:text-slate-400 mt-1">Acquired Leads list</p>
                        </div>
                      </div>

                      <div className="glass-panel p-5 rounded-2xl border flex flex-col justify-between">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Visitor Clicks</span>
                          <span className="text-[10px] font-bold text-emerald-500 font-mono">+12.4%</span>
                        </div>
                        <div>
                          <p className="text-3xl font-display font-extrabold text-slate-900 dark:text-white mt-4">421</p>
                          <p className="text-xs text-slate-450 dark:text-slate-400 mt-1">Unique tracking hits</p>
                        </div>
                      </div>

                      <div className="glass-panel p-5 rounded-2xl border col-span-2 flex items-center justify-between">
                        <div>
                          <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">Withdrawal Status</span>
                          <span className="text-lg font-bold text-emerald-500 mt-1 block">
                            {user.isUpiLinked ? '✓ UPI Active' : '⚠ Action Needed'}
                          </span>
                        </div>
                        <button
                          onClick={() => { setActiveTab('dashboard'); setIsEditingPayment(true); }}
                          className="px-4 py-2 bg-slate-900/10 dark:bg-white/10 hover:bg-emerald-500 hover:text-white text-xs font-semibold rounded-xl border border-transparent hover:border-emerald-500/20 transition-all cursor-pointer"
                        >
                          {user.isUpiLinked ? 'Payment details' : 'Link Payment Now'}
                        </button>
                      </div>

                    </div>
                  </div>

                  {/* Short onboarding checklist */}
                  <div className="glass-panel p-6 rounded-3xl border">
                    <h3 className="font-display font-bold text-slate-900 dark:text-white mb-4">Ambassador Quick Onboarding Checklist</h3>
                    <div className="grid sm:grid-cols-3 gap-6">
                      <div className="flex items-start space-x-3">
                        <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center text-xs font-bold">&#10003;</span>
                        <div>
                          <h4 className="text-xs font-bold text-slate-800 dark:text-white">Unique ID Activated</h4>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Your code {user.uid} is running live across MMMUT and DDU campuses.</p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${user.isUpiLinked ? 'bg-emerald-500/20 text-emerald-500' : 'bg-slate-300 dark:bg-slate-800 text-slate-500'}`}>
                          {user.isUpiLinked ? '✓' : '2'}
                        </span>
                        <div>
                          <h4 className="text-xs font-bold text-slate-800 dark:text-white">Link Payment Account</h4>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                            {user.isUpiLinked ? 'Successfully verified for weekly bank transfers.' : 'Add UPI Address or Bank coordinates inside Dashboard tab.'}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <span className="w-5 h-5 rounded-full bg-slate-300 dark:bg-slate-800 text-slate-500 flex items-center justify-center text-xs font-bold">3</span>
                        <div>
                          <h4 className="text-xs font-bold text-slate-800 dark:text-white">Start Referral Group</h4>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Share your code link to WhatsApp student groups to generate first clicks.</p>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              )}

              {/* TAB 2: DASHBOARD TAB (DEEP DIVE ANALYTICS) */}
              {activeTab === 'dashboard' && (
                <div id="dashboard-tab-panel" className="space-y-6">
                  
                  {/* METRIC CARDS ROW */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {/* Metric 1 */}
                    <div className="glass-panel p-6 rounded-2xl border flex flex-col justify-between">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] uppercase tracking-wider font-extrabold text-slate-400 dark:text-slate-500">
                          Lifetime Earnings
                        </span>
                        <div className="w-7 h-7 rounded-lg bg-emerald-500/15 text-emerald-500 flex items-center justify-center">
                          <Wallet className="w-4 h-4" />
                        </div>
                      </div>
                      <div className="mt-4">
                        <span className="text-3xl font-display font-black text-slate-900 dark:text-white block">
                          ₹{stats.lifetimeEarnings.toLocaleString('en-IN')}.00
                        </span>
                        <p className="text-[10.5px] text-slate-400 mt-1 font-mono">Calculated from verified bookings</p>
                      </div>
                    </div>

                    {/* Metric 2 */}
                    <div className="glass-panel p-6 rounded-2xl border flex flex-col justify-between">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] uppercase tracking-wider font-extrabold text-slate-400 dark:text-slate-500">
                          Pending Clearances
                        </span>
                        <div className="w-7 h-7 rounded-lg bg-amber-500/15 text-amber-500 flex items-center justify-center">
                          <Clock className="w-4 h-4" />
                        </div>
                      </div>
                      <div className="mt-4">
                        <span className="text-3xl font-display font-black text-slate-900 dark:text-white block">
                          ₹{stats.pendingClearances.toLocaleString('en-IN')}.00
                        </span>
                        <p className="text-[10.5px] text-amber-500 mt-1 font-medium">Awaiting tenant move-in</p>
                      </div>
                    </div>

                    {/* Metric 3 */}
                    <div className="glass-panel p-6 rounded-2xl border flex flex-col justify-between">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] uppercase tracking-wider font-extrabold text-slate-400 dark:text-slate-500">
                          Available for Payout
                        </span>
                        <div className="w-7 h-7 rounded-lg bg-teal-500/15 text-teal-500 flex items-center justify-center">
                          <CheckCircle className="w-4 h-4" />
                        </div>
                      </div>
                      <div className="mt-4">
                        <span className="text-3xl font-display font-black text-emerald-500 dark:text-emerald-450 block">
                          ₹{stats.availableForWithdrawal.toLocaleString('en-IN')}.00
                        </span>
                        <p className="text-[10.5px] text-slate-400 mt-1 font-mono">Exceeds withdrawal threshold (₹500)</p>
                      </div>
                    </div>
                  </div>

                  {/* FLOW CHART SECTION (EXTRA TALL SHOWN OUTSIDE THE VIEWPORT HEIGHT EFFICIENTLY) */}
                  <div className="glass-panel p-6 rounded-3xl border">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
                      <div>
                        <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">Earnings & Analytics Timeline</h3>
                        <p className="text-xs text-slate-500">Progressive referral growth over the trailing 30 days (₹ INR)</p>
                      </div>
                      <span className="text-xs bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-bold px-3 py-1.5 rounded-xl border border-emerald-500/25 mt-2 sm:mt-0 font-mono">
                        Avg. ₹230 per check-in index
                      </span>
                    </div>

                    {/* Recharts Area Chart - TALL CONTAINER as requested */}
                    <div className="h-[420px] md:h-[450px] w-full pt-4">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                          data={EARNINGS_30_DAYS}
                          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                        >
                          <defs>
                            <linearGradient id="colorEarnings" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                              <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(156, 163, 175, 0.15)" />
                          <XAxis 
                            dataKey="date" 
                            tick={{ fontSize: 11, fill: '#888888', fontWeight: 500 }} 
                            axisLine={false}
                            tickLine={false}
                          />
                          <YAxis 
                            tick={{ fontSize: 11, fill: '#888888', fontWeight: 500 }} 
                            axisLine={false}
                            tickLine={false}
                            tickFormatter={(v) => `₹${v}`}
                          />
                          <Tooltip 
                            contentStyle={{ 
                              background: 'rgba(15, 23, 42, 0.85)', 
                              border: '1px solid rgba(255, 255, 255, 0.12)', 
                              borderRadius: '16px',
                              color: '#fff',
                              fontSize: '12px'
                            }}
                            formatter={(v: any) => [`₹${v}`, 'Cumulative Earnings']}
                          />
                          <Area 
                            type="monotone" 
                            dataKey="earnings" 
                            stroke="#10b981" 
                            strokeWidth={3} 
                            fillOpacity={1} 
                            fill="url(#colorEarnings)" 
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* USER INTERACTION: ACCOUNT DETAILS & LINK UPI PROFILE */}
                  <div className="grid md:grid-cols-2 gap-6">
                    
                    {/* Profile Information Panel */}
                    <div className="glass-panel p-6 rounded-2xl border">
                      <h3 className="font-display font-extrabold text-sm uppercase tracking-wider text-slate-500 mb-4 flex items-center space-x-2">
                        <User className="w-4 h-4 text-emerald-500" />
                        <span>Account Credentials</span>
                      </h3>

                      <div className="space-y-4">
                        <div className="flex items-center space-x-4">
                          <div className="w-16 h-16 rounded-2xl bg-zinc-200 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center font-extrabold text-slate-700 dark:text-slate-300 text-xl font-display">
                            {user.name.charAt(0)}
                          </div>
                          <div>
                            <h4 className="text-base font-bold text-slate-900 dark:text-white">{user.name}</h4>
                            <span className="text-xs bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold px-2.5 py-0.5 rounded-full inline-block mt-1">
                              {user.level} Level Link
                            </span>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                          <div>
                            <span className="text-[10px] text-slate-450 uppercase font-medium">Login Email (Read-Only)</span>
                            <div className="mt-1 p-2.5 rounded-xl bg-slate-900/5 dark:bg-white/5 border border-slate-200/50 dark:border-slate-850/80 text-xs text-slate-500 flex items-center space-x-1">
                              <Lock className="w-3 h-3 text-slate-450" />
                              <span className="select-all">{user.email}</span>
                            </div>
                          </div>

                          <div>
                            <span className="text-[10px] text-slate-450 uppercase font-medium">Contact Phone</span>
                            <div className="mt-1 p-2.5 rounded-xl border border-slate-250 dark:border-slate-850/80 text-xs text-slate-650 dark:text-slate-200 font-mono">
                              {user.phone}
                            </div>
                          </div>
                        </div>

                        <div>
                          <span className="text-[10px] uppercase font-bold text-slate-400 font-mono tracking-wider">Assigned Campaign Campus</span>
                          <div className="mt-1 p-3 rounded-xl bg-white/20 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 text-xs font-semibold flex items-center space-x-2">
                            <Building className="w-4 h-4 text-emerald-500" />
                            <span>{user.campus}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Interactive Linked Payment Form */}
                    <div className="glass-panel p-6 rounded-2xl border flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="font-display font-extrabold text-sm uppercase tracking-wider text-slate-500 flex items-center space-x-2">
                            <Wallet className="w-4 h-4 text-emerald-500" />
                            <span>Linked UPI & Bank Status</span>
                          </h3>
                          <span className={`text-[10px] uppercase font-mono font-bold px-2 py-0.5 rounded-full ${
                            user.isUpiLinked 
                              ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400' 
                              : 'bg-red-500/15 text-red-500'
                          }`}>
                            {user.isUpiLinked ? 'Active Verified' : 'Incomplete'}
                          </span>
                        </div>

                        {!isEditingPayment ? (
                          <div className="space-y-4">
                            <div className="p-4 rounded-xl bg-slate-500/5 border border-dashed border-slate-200 dark:border-slate-800 text-center">
                              {user.isUpiLinked ? (
                                <div className="space-y-3 text-left">
                                  {user.linkedUpi && (
                                    <div>
                                      <span className="text-[10px] text-slate-400 uppercase font-mono">Active UPI Target Address</span>
                                      <p className="text-xs font-bold font-mono text-slate-800 dark:text-slate-100">{user.linkedUpi}</p>
                                    </div>
                                  )}
                                  {user.bankAccount && (
                                    <div>
                                      <span className="text-[10px] text-slate-400 uppercase font-mono">Cleared Bank Acc (IMPS)</span>
                                      <p className="text-xs font-bold font-mono text-slate-800 dark:text-slate-100">
                                        Acc: {user.bankAccount} • IFSC: {user.ifscCode}
                                      </p>
                                    </div>
                                  )}
                                </div>
                              ) : (
                                <div>
                                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
                                    You have not linked any UPI target address or bank coordinates yet. Payouts cannot be processed until set up.
                                  </p>
                                </div>
                              )}
                            </div>

                            <button
                              onClick={() => setIsEditingPayment(true)}
                              className="w-full py-2.5 rounded-xl bg-emerald-500 text-white hover:bg-emerald-600 font-semibold text-xs transition-all cursor-pointer transform active:scale-95"
                            >
                              {user.isUpiLinked ? 'Modify Linked Account' : 'Link UPI / Bank Address'}
                            </button>
                          </div>
                        ) : (
                          <form onSubmit={handleUpdatePayment} className="space-y-3.5">
                            <div>
                              <label htmlFor="upi-form-input" className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Enter UPI ID</label>
                              <input
                                id="upi-form-input"
                                type="text"
                                placeholder="e.g. name@paytm / name@ybl"
                                value={upiField}
                                onChange={(e) => setUpiField(e.target.value)}
                                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/15 dark:bg-slate-950/20 text-xs text-slate-800 dark:text-white placeholder-slate-450 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
                              />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <label htmlFor="bank-acc-input" className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Bank Account No.</label>
                                <input
                                  id="bank-acc-input"
                                  type="text"
                                  placeholder="e.g. 10092451291"
                                  value={bankAccountField}
                                  onChange={(e) => setBankAccountField(e.target.value)}
                                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/15 dark:bg-slate-950/20 text-xs text-slate-800 dark:text-white placeholder-slate-450 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
                                />
                              </div>
                              <div>
                                <label htmlFor="ifsc-code-input" className="block text-[10px] uppercase font-bold text-slate-400 mb-1">IFSC Code</label>
                                <input
                                  id="ifsc-code-input"
                                  type="text"
                                  placeholder="e.g. SBIN00021"
                                  value={ifscCodeField}
                                  onChange={(e) => setIfscCodeField(e.target.value)}
                                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/15 dark:bg-slate-950/20 text-xs text-slate-800 dark:text-white placeholder-slate-450 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
                                />
                              </div>
                            </div>

                            <div className="flex space-x-3 pt-1">
                              <button
                                type="button"
                                onClick={() => setIsEditingPayment(false)}
                                className="w-1/2 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-900/5 dark:hover:bg-white/5 text-xs font-semibold cursor-pointer"
                              >
                                Cancel
                              </button>
                              <button
                                type="submit"
                                className="w-1/2 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold text-xs transition-all flex items-center justify-center space-x-1.5 cursor-pointer transform active:scale-95"
                              >
                                {saveSuccess ? (
                                  <>
                                    <Check className="w-3.5 h-3.5" />
                                    <span>Linked!</span>
                                  </>
                                ) : (
                                  <span>Save Credentials</span>
                                )}
                              </button>
                            </div>
                          </form>
                        )}
                      </div>
                    </div>

                  </div>

                  {/* LISTINGS & CONVERSIONS TABLE */}
                  <div className="glass-panel p-6 rounded-3xl border">
                    
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                      <div>
                        <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">Listings & Conversions Table</h3>
                        <p className="text-xs text-slate-500 font-normal">History of properties rented out using code: <strong className="font-mono text-emerald-500">{user.uid}</strong></p>
                      </div>

                      {/* Filter Actions */}
                      <div className="flex flex-wrap items-center gap-2.5">
                        {/* Search Input */}
                        <div className="relative">
                          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                          <input
                            type="text"
                            placeholder="Search properties or tenant..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-8.5 pr-4 py-1.5 w-48 rounded-full border border-slate-200 dark:border-slate-800 bg-white/20 dark:bg-slate-950/30 text-xs text-slate-800 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                          />
                        </div>

                        {/* Dropdown status selector */}
                        <select
                          value={statusFilter}
                          onChange={(e: any) => setStatusFilter(e.target.value)}
                          className="px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-800 bg-white/30 dark:bg-slate-950/30 text-xs text-slate-850 dark:text-slate-200 cursor-pointer focus:outline-none"
                        >
                          <option value="All">All statuses</option>
                          <option value="Verified">Verified commission</option>
                          <option value="Pending">Pending verify</option>
                        </select>
                      </div>
                    </div>

                    {/* Actual Glassmorphic Data Table */}
                    <div className="overflow-x-auto -mx-6">
                      <table className="w-full text-left border-collapse border-transparent">
                        <thead>
                          <tr className="border-b border-slate-200/50 dark:border-slate-800/80 bg-slate-500/5 font-mono text-[10px] text-slate-400 uppercase tracking-wider">
                            <th className="px-6 py-3">Date</th>
                            <th className="px-6 py-3">Property Name</th>
                            <th className="px-6 py-3">Tenant Name</th>
                            <th className="px-6 py-3 text-right">Commission</th>
                            <th className="px-6 py-3 text-center">Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200/20 dark:divide-slate-800/20 text-xs">
                          {filteredBookings.length > 0 ? (
                            filteredBookings.map((b) => (
                              <tr 
                                key={b.id} 
                                className="group hover:bg-slate-500/5 transition-all"
                              >
                                <td className="px-6 py-4 font-mono font-medium text-slate-450 dark:text-slate-400">
                                  {b.date}
                                </td>
                                <td className="px-6 py-4 font-bold text-slate-800 dark:text-white">
                                  {b.propertyName}
                                </td>
                                <td className="px-6 py-4 font-semibold text-slate-600 dark:text-slate-300">
                                  {b.tenantInitial}
                                </td>
                                <td className="px-6 py-4 text-right font-black font-mono text-slate-900 dark:text-white">
                                  ₹{b.amount}
                                </td>
                                <td className="px-6 py-4 text-center">
                                  <span className={`inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-[10.5px] font-bold ${
                                    b.status === 'Verified' 
                                      ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/15'
                                      : 'bg-amber-500/10 text-amber-500 border border-amber-500/15'
                                  }`}>
                                    <span className={`w-1.5 h-1.5 rounded-full ${
                                      b.status === 'Verified' ? 'bg-emerald-500' : 'bg-amber-500'
                                    }`}></span>
                                    <span>{b.status}</span>
                                  </span>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan={5} className="px-6 py-10 text-center text-slate-500 font-normal">
                                No properties found matching the search filters. Try clearing your search constraints.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>

                  </div>

                </div>
              )}

              {/* TAB 3: SUPPORT TAB (INTERNAL INTERNAL TICKETS & LIVE FORM) */}
              {activeTab === 'support' && (
                <div id="support-tab-panel" className="grid md:grid-cols-12 gap-8">
                  
                  {/* Left Col: Submission form */}
                  <div className="md:col-span-5 space-y-6">
                    <div className="glass-panel p-6 rounded-2xl border">
                      <h3 className="font-display font-extrabold text-sm uppercase tracking-wider text-slate-500 mb-2 flex items-center space-x-2">
                        <MessageSquare className="w-4 h-4 text-emerald-500" />
                        <span>Submit New Escalation Query</span>
                      </h3>
                      <p className="text-[11px] text-slate-450 dark:text-slate-400 mb-4 leading-relaxed font-normal">
                        Queries are routed securely directly to the HomeSarthi administration team. Average resolution SLA sits under 2 hours.
                      </p>

                      <form onSubmit={handleCreateTicket} className="space-y-4">
                        <div>
                          <label htmlFor="ticket-title-input" className="block text-[11px] uppercase tracking-wider font-semibold text-slate-500 mb-1.5 font-sans">Subject Title</label>
                          <input
                            id="ticket-title-input"
                            type="text"
                            required
                            placeholder="e.g. Commission amount miscount"
                            value={ticketTitle}
                            onChange={(e) => setTicketTitle(e.target.value)}
                            className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/20 dark:bg-slate-950/40 text-xs text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
                          />
                        </div>

                        <div>
                          <label htmlFor="ticket-category-select" className="block text-[11px] uppercase tracking-wider font-semibold text-slate-500 mb-1.5">Department Category</label>
                          <select
                            id="ticket-category-select"
                            value={ticketCategory}
                            onChange={(e) => setTicketCategory(e.target.value)}
                            className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/20 dark:bg-slate-950/40 text-xs text-slate-800 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500 cursor-pointer"
                          >
                            <option value="Payout & Earnings">Payout & Earnings</option>
                            <option value="Tracking Issue">Tracking Issue</option>
                            <option value="Hostel Verification request">Hostel Onboarding request</option>
                            <option value="Marketing Banner Delivery">Marketing Materials</option>
                          </select>
                        </div>

                        <div>
                          <label htmlFor="ticket-desc-input" className="block text-[11px] uppercase tracking-wider font-semibold text-slate-500 mb-1.5">Detailed Description</label>
                          <textarea
                            id="ticket-desc-input"
                            required
                            rows={4}
                            placeholder="Explain the detailed context here... Include dates, property names, or tenant initials if appropriate."
                            value={ticketDescription}
                            onChange={(e) => setTicketDescription(e.target.value)}
                            className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/20 dark:bg-slate-950/40 text-xs text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 resize-none"
                          />
                        </div>

                        <button
                          id="submit-support-ticket-btn"
                          type="submit"
                          className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold text-xs transition-all flex items-center justify-center space-x-1.5 cursor-pointer transform active:scale-95 shadow-md shadow-emerald-500/5 animate-none"
                        >
                          <Send className="w-3.5 h-3.5" />
                          <span>Submit Official Ticket</span>
                        </button>
                      </form>

                      {ticketSuccess && (
                        <div className="mt-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-[11.5px] text-emerald-600 dark:text-emerald-450 font-medium text-center">
                          ✓ Ticket logged successfully! It has been added to your live active list on the right.
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right Col: Personal active tickets */}
                  <div className="md:col-span-7 space-y-4">
                    <div className="glass-panel p-6 rounded-2xl border">
                      <h3 className="font-display font-extrabold text-sm uppercase tracking-wider text-slate-500 mb-4">
                        Your Ticket History ({tickets.length})
                      </h3>

                      <div className="space-y-4">
                        {tickets.length > 0 ? (
                          tickets.map((t) => (
                            <div 
                              key={t.id}
                              className="p-4 rounded-xl border border-slate-200/60 dark:border-slate-800/80 bg-white/10 dark:bg-slate-900/15"
                            >
                              <div className="flex items-start justify-between flex-wrap gap-2 mb-2">
                                <div>
                                  <span className="text-[10px] font-mono font-bold text-slate-400 bg-slate-900/5 dark:bg-white/5 border border-slate-200/50 dark:border-slate-800 px-2 py-0.5 rounded-md">
                                    {t.id}
                                  </span>
                                  <h4 className="font-bold text-sm text-slate-850 dark:text-white mt-1.5">{t.title}</h4>
                                </div>
                                <span className={`inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                                  t.status === 'Open' 
                                    ? 'bg-blue-500/10 text-blue-500 border border-blue-500/15'
                                    : t.status === 'In Progress'
                                    ? 'bg-amber-500/10 text-amber-500 border border-amber-500/15'
                                    : 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/15'
                                }`}>
                                  <span>{t.status}</span>
                                </span>
                              </div>

                              <p className="text-xs text-slate-500 dark:text-slate-450 leading-relaxed font-normal">
                                {t.description}
                              </p>

                              <div className="mt-3.5 pt-2.5 border-t border-slate-200/40 dark:border-slate-850/60 flex justify-between items-center text-[10.5px] text-slate-400 font-mono">
                                <span>Category: <strong>{t.category}</strong></span>
                                <span>Logged: {t.createdAt}</span>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="text-center py-10 text-slate-400 font-normal text-xs">
                            No tickets currently logged. Submit a query to initiate official escalation.
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                </div>
              )}

              {/* TAB 4: CONTACT TAB (INTERNAL CONTACTS & ESCALATION TIER) */}
              {activeTab === 'contact' && (
                <div id="contact-tab-panel" className="space-y-6">
                  
                  <div className="grid md:grid-cols-12 gap-8 items-start">
                    
                    {/* Dedicated Relationship Manager Profile Card */}
                    <div className="md:col-span-5 glass-panel p-6 rounded-3xl border flex flex-col items-center text-center">
                      <div className="inline-flex items-center space-x-1.5 px-3 py-1 bg-amber-500/10 text-amber-500 rounded-full text-[10px] font-bold uppercase mb-4">
                        <Award className="w-3.5 h-3.5" />
                        <span>Assigned Relationship Lead</span>
                      </div>

                      <div className="relative">
                        <img 
                          src={ACCOUNT_MANAGER.avatar} 
                          alt={ACCOUNT_MANAGER.name} 
                          className="w-24 h-24 rounded-full object-cover border-2 border-emerald-500/40 p-1"
                          referrerPolicy="no-referrer"
                        />
                        <span className="absolute bottom-1 right-1 w-4 h-4 bg-emerald-500 border-2 border-white dark:border-slate-950 rounded-full" title="On-duty active"></span>
                      </div>

                      <h3 className="font-display font-extrabold text-xl text-slate-900 dark:text-white mt-4">{ACCOUNT_MANAGER.name}</h3>
                      <p className="text-xs text-emerald-500 font-semibold uppercase tracking-wider mt-0.5">{ACCOUNT_MANAGER.role}</p>
                      
                      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed max-w-sm mt-3 pt-3 border-t border-slate-200/40 dark:border-slate-800/40 font-normal">
                        Vikram Aditya coordinates campaign deliveries across North India. He verified onboarding operations for Gorakhpur region and clears payout releases.
                      </p>

                      <div className="w-full space-y-2.5 pt-5 mt-3">
                        <a 
                          href={`mailto:${ACCOUNT_MANAGER.email}`}
                          className="w-full py-2 px-4 bg-slate-900/5 dark:bg-white/5 border border-slate-200/50 dark:border-slate-800/80 hover:bg-emerald-500 hover:text-white hover:border-transparent text-xs font-semibold rounded-xl text-slate-800 dark:text-slate-100 flex items-center justify-center space-x-2 transition-all transform active:scale-95 cursor-pointer"
                        >
                          <Mail className="w-4 h-4" />
                          <span>Email: {ACCOUNT_MANAGER.email}</span>
                        </a>

                        <a 
                          href={`tel:${ACCOUNT_MANAGER.phone}`}
                          className="w-full py-2 px-4 bg-slate-900/5 dark:bg-white/5 border border-slate-200/50 dark:border-slate-800/80 hover:bg-emerald-500 hover:text-white hover:border-transparent text-xs font-semibold rounded-xl text-slate-800 dark:text-slate-100 flex items-center justify-center space-x-2 transition-all transform active:scale-95 cursor-pointer"
                        >
                          <Phone className="w-4 h-4" />
                          <span>Direct Phone: {ACCOUNT_MANAGER.phone}</span>
                        </a>

                        <a 
                          href={ACCOUNT_MANAGER.whatsapp}
                          target="_blank"
                          rel="noreferrer"
                          className="w-full py-2.5 px-4 bg-emerald-500 text-white hover:bg-emerald-600 text-xs font-bold rounded-xl flex items-center justify-center space-x-2 transition-all transform active:scale-95 cursor-pointer shadow-sm shadow-emerald-500/10"
                        >
                          <MessageSquare className="w-4 h-4" />
                          <span>Chat on WhatsApp (Priority)</span>
                        </a>
                      </div>
                    </div>

                    {/* Elite Escalation Coordinates */}
                    <div className="md:col-span-7 space-y-6">
                      <div className="glass-panel p-6 rounded-3xl border">
                        <h3 className="font-display font-extrabold text-slate-900 dark:text-white tracking-tight mb-2">
                          Elite Ambassador Escalation Tier
                        </h3>
                        <p className="text-xs text-slate-500 mb-6 leading-relaxed font-normal">
                          If you log over 20 bookings in a calendar month, you become certified as an Elite Master Ambassador, gaining high payouts, branded customized merch, and tier-1 telephone integration.
                        </p>

                        <div className="grid sm:grid-cols-2 gap-4">
                          <div className="p-4 rounded-xl bg-slate-500/5 border border-slate-200/50 dark:border-slate-800">
                            <span className="text-[10px] font-mono font-bold text-slate-450 block uppercase tracking-wider">REGIONAL ESCALATION PHONE</span>
                            <span className="text-sm font-bold text-slate-800 dark:text-white block mt-1">+91 78807 17527</span>
                            <span className="text-[10px] text-emerald-500 font-medium block mt-1">Available 10:00 AM — 07:00 PM</span>
                          </div>

                          <div className="p-4 rounded-xl bg-slate-500/5 border border-slate-200/50 dark:border-slate-800">
                            <span className="text-[10px] font-mono font-bold text-slate-450 block uppercase tracking-wider">OFFICIAL ESCALATION EMAIL</span>
                            <span className="text-sm font-bold text-emerald-500 hover:underline block mt-1 select-all">homesarthi247@gmail.com</span>
                            <span className="text-[10px] text-slate-400 block mt-1">Direct router to directors board</span>
                          </div>
                        </div>

                        {/* Gorakhpur Operations Address Card */}
                        <div className="mt-6 p-5 rounded-2xl bg-white/20 dark:bg-slate-900/40 border border-slate-200/50 dark:border-slate-800">
                          <span className="text-[10px] uppercase font-bold text-slate-450 tracking-wider font-mono">Headquarters Location Address</span>
                          <h4 className="font-display font-extrabold text-sm text-slate-800 dark:text-white mt-1.5">Gorakhnath, Gorakhpur, Uttar Pradesh</h4>
                          <span className="text-xs text-slate-500 dark:text-slate-450 block mt-1">Pin Code Coordinates: 273015 • India</span>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2.5 leading-relaxed font-normal">
                            All localized agreements and physical welcome kits (includes customized identity badges, marketing banners, and flyers) are dispatched directly from our Gorakhpur operations command.
                          </p>
                        </div>
                      </div>
                    </div>

                  </div>

                </div>
              )}

            </motion.div>
          </AnimatePresence>
        </div>

      </main>

    </div>
  );
}
