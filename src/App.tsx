import { useState, useEffect } from 'react';
import PreLoginView from './components/PreLoginView';
import PostLoginView from './components/PostLoginView';
import { UserProfile, BookingCommission, SupportTicket } from './types';
import { INITIAL_BOOKINGS, INITIAL_TICKETS } from './data';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const savedAuth = localStorage.getItem('isLoggedIn');
      return savedAuth === 'true';
    }
    return false;
  });

  const [user, setUser] = useState<UserProfile>(() => {
    if (typeof window !== 'undefined') {
      const savedUser = localStorage.getItem('currentUser');
      if (savedUser) {
        try {
          return JSON.parse(savedUser);
        } catch (e) {
          // fallback
        }
      }
    }
    // Default mock user template gets customized upon PreLogin input
    return {
      name: 'Aman Tripathy',
      uid: 'HS-AMB-8824',
      email: 'aman.campus@edu.in',
      phone: '+91 78807 17527',
      campus: 'MMMUT Gorakhpur',
      linkedUpi: '',
      bankAccount: '',
      ifscCode: '',
      isUpiLinked: false,
      level: 'Standard'
    };
  });

  const [bookings, setBookings] = useState<BookingCommission[]>(() => {
    if (typeof window !== 'undefined') {
      const savedBookings = localStorage.getItem('bookingsData');
      if (savedBookings) {
        try { return JSON.parse(savedBookings); } catch (e) {}
      }
    }
    return INITIAL_BOOKINGS;
  });

  const [tickets, setTickets] = useState<SupportTicket[]>(() => {
    if (typeof window !== 'undefined') {
      const savedTickets = localStorage.getItem('ticketsData');
      if (savedTickets) {
        try { return JSON.parse(savedTickets); } catch (e) {}
      }
    }
    return INITIAL_TICKETS;
  });

  // Handle LocalStorage sync to keep the simulator completely persistent
  useEffect(() => {
    localStorage.setItem('isLoggedIn', String(isLoggedIn));
  }, [isLoggedIn]);

  useEffect(() => {
    localStorage.setItem('currentUser', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('bookingsData', JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem('ticketsData', JSON.stringify(tickets));
  }, [tickets]);

  // Handle Login State Transition
  const handleLogin = (name: string, email: string, campus: string, phone: string) => {
    // Determine random/custom UID for the ambassador
    const suffix = Math.floor(1000 + Math.random() * 9000);
    const generatedUid = `HS-AMB-${suffix}`;

    const newUser: UserProfile = {
      name,
      uid: generatedUid,
      email,
      phone,
      campus,
      linkedUpi: '',
      bankAccount: '',
      ifscCode: '',
      isUpiLinked: false,
      level: 'Standard'
    };

    setUser(newUser);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    // Keep credentials cached for frictionless re-logins on the public page
  };

  // Profile custom modifications
  const handleUpdateProfile = (updatedUser: UserProfile) => {
    setUser(updatedUser);
  };

  // Add internal tickets
  const handleAddTicket = (newSecretTicket: Omit<SupportTicket, 'id' | 'createdAt' | 'status'>) => {
    const freshId = `TKT-${Math.floor(9000 + Math.random() * 1000)}`;
    const today = new Date().toISOString().split('T')[0];
    
    const formedTicket: SupportTicket = {
      id: freshId,
      ...newSecretTicket,
      createdAt: today,
      status: 'Open'
    };

    setTickets([formedTicket, ...tickets]);
  };

  return (
    <>
      {isLoggedIn ? (
        <PostLoginView 
          user={user}
          bookings={bookings}
          tickets={tickets}
          onAddTicket={handleAddTicket}
          onUpdateProfile={handleUpdateProfile}
          onLogout={handleLogout}
        />
      ) : (
        <PreLoginView 
          onLogin={handleLogin}
        />
      )}
    </>
  );
}
