import { BookingCommission, DailyEarning, SupportTicket } from './types';

export const INITIAL_FAQS = [
  {
    id: 'faq-1',
    question: 'What is the HomeSarthi Ambassador program?',
    answer: 'A partner program where you earn money by referring tenants to our zero-brokerage housing platform. You leverage your campus network to help colleagues find great verified housing.'
  },
  {
    id: 'faq-2',
    question: 'How do I earn money?',
    answer: 'You get a Unique ID. When a tenant enters this ID while booking a room/flat on HomeSarthi, you instantly earn ₹5 as a standard tracking reward, and you can earn up to ₹5,000+ flat commissions per verified successful booking.'
  },
  {
    id: 'faq-3',
    question: 'Is there any joining fee?',
    answer: 'No, becoming an ambassador is 100% free with no hidden charges, ever.'
  },
  {
    id: 'faq-4',
    question: 'How do I track my earnings?',
    answer: 'Your secure dashboard provides real-time tracking of clicks, bookings, commission status (Pending/Verified), and weekly payout reports.'
  },
  {
    id: 'faq-5',
    question: 'When do I get paid?',
    answer: 'Payouts are processed weekly directly to your linked UPI ID or bank account once the minimum withdrawal threshold is met.'
  },
  {
    id: 'faq-6',
    question: 'What happens if a booking is cancelled?',
    answer: 'Commissions are only verified and credited after the tenant successfully moves in and pays the security deposit. If they cancel before moving in, the commission stays in void state.'
  }
];

export const INITIAL_BOOKINGS: BookingCommission[] = [
  {
    id: 'b-1',
    date: '2026-06-20',
    propertyName: '2 BHK Apartment, Gorakhnath',
    tenantInitial: 'A. Sharma',
    amount: 1500,
    status: 'Verified'
  },
  {
    id: 'b-2',
    date: '2026-06-19',
    propertyName: 'Studio Flat, Rapti Nagar',
    tenantInitial: 'S. Patel',
    amount: 1200,
    status: 'Pending'
  },
  {
    id: 'b-3',
    date: '2026-06-15',
    propertyName: 'Shared Twin Room, Civil Lines',
    tenantInitial: 'K. Verma',
    amount: 800,
    status: 'Verified'
  },
  {
    id: 'b-4',
    date: '2026-06-10',
    propertyName: 'Luxury Co-living Block A, Medical Road',
    tenantInitial: 'P. Singh',
    amount: 2000,
    status: 'Verified'
  },
  {
    id: 'b-5',
    date: '2026-06-05',
    propertyName: '1 BHK Premium Villa, Mohaddipur',
    tenantInitial: 'R. Yadav',
    amount: 1500,
    status: 'Pending'
  },
  {
    id: 'b-6',
    date: '2026-05-28',
    propertyName: 'Penthouse Apartment, Golghar',
    tenantInitial: 'N. Gupta',
    amount: 3000,
    status: 'Verified'
  }
];

export const EARNINGS_30_DAYS: DailyEarning[] = [
  { date: 'May 23', earnings: 150 },
  { date: 'May 25', earnings: 450 },
  { date: 'May 27', earnings: 800 },
  { date: 'May 29', earnings: 800 },
  { date: 'Jun 01', earnings: 1200 },
  { date: 'Jun 03', earnings: 1200 },
  { date: 'Jun 05', earnings: 1800 },
  { date: 'Jun 07', earnings: 2200 },
  { date: 'Jun 09', earnings: 3000 },
  { date: 'Jun 11', earnings: 2800 },
  { date: 'Jun 13', earnings: 3500 },
  { date: 'Jun 15', earnings: 4300 },
  { date: 'Jun 17', earnings: 5100 },
  { date: 'Jun 19', earnings: 5900 },
  { date: 'Jun 22', earnings: 7100 }
];

export const INITIAL_TICKETS: SupportTicket[] = [
  {
    id: 'TKT-9901',
    title: 'Payout delay for Rapti Nagar reference',
    category: 'Payout & Earnings',
    description: 'Tenant checked in on June 10 but commission status is still showing Pending. Please verify the move-in status.',
    createdAt: '2026-06-18',
    status: 'In Progress'
  },
  {
    id: 'TKT-9830',
    title: 'UID not tracking properly for Safari Villa booking',
    category: 'Tracking Issue',
    description: 'My colleague registered via my unique link but their booking dashboard does not show it was affiliated to me.',
    createdAt: '2026-06-12',
    status: 'Resolved'
  }
];

export const ACCOUNT_MANAGER = {
  name: 'Vikram Aditya',
  role: 'Elite Ambassador Lead',
  email: 'vikram.lead@homesarthi.in',
  phone: '+91 91194 58241',
  whatsapp: 'https://wa.me/919119458241',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200&h=200'
};
