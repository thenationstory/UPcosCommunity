/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { AnnouncementBanner } from './components/layout/AnnouncementBanner';
import { Navbar } from './components/layout/Navbar';
import { MobileBottomNav } from './components/layout/MobileBottomNav';
import { GlobalSearchModal } from './components/layout/GlobalSearchModal';
import { EmblemIcon } from './components/common/BrandLogo';
import { DisclaimerModal } from './components/common/DisclaimerModal';
import { Footer } from './components/layout/Footer';

// Auth Modals
import { LoginModal } from './components/auth/LoginModal';
import { RegisterModal } from './components/auth/RegisterModal';
import { OnboardingModal } from './components/auth/OnboardingModal';

// Post Creation
import { CreatePostModal } from './components/feed/CreatePostModal';

// Views
import { LandingPage } from './components/landing/LandingPage';
import { FeedView } from './components/feed/FeedView';
import { DistrictsView } from './components/community/DistrictsView';
import { DepartmentsView } from './components/community/DepartmentsView';
import { DirectoryView } from './components/directory/DirectoryView';
import { DigitalIdCardView } from './components/idcard/DigitalIdCardView';
import { QAView } from './components/qa/QAView';
import { DocumentsView } from './components/documents/DocumentsView';
import { GroupsView } from './components/groups/GroupsView';
import { ProfileView } from './components/profile/ProfileView';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { NewsAndJobsView } from './components/news/NewsAndJobsView';

const AppContent: React.FC = () => {
  const { currentView } = useApp();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors duration-200 w-full max-w-full">
      
      {/* Pinned Top Announcement Bar */}
      <AnnouncementBanner />

      {/* Main Top Navigation */}
      <Navbar onOpenSearch={() => setIsSearchOpen(true)} />

      {/* Main View Area */}
      <div className="flex-1 pb-16 lg:pb-8">
        {currentView === 'home' && <LandingPage />}
        {currentView === 'feed' && <FeedView />}
        {currentView === 'districts' && <DistrictsView />}
        {currentView === 'departments' && <DepartmentsView />}
        {currentView === 'directory' && <DirectoryView />}
        {currentView === 'idcard' && <DigitalIdCardView />}
        {currentView === 'qa' && <QAView />}
        {currentView === 'documents' && <DocumentsView />}
        {currentView === 'groups' && <GroupsView />}
        {currentView === 'profile' && <ProfileView />}
        {currentView === 'admin' && <AdminDashboard />}
        {(currentView === 'blog-jobs' || currentView === 'jobs' || currentView === 'news' || currentView === 'blog') && <NewsAndJobsView />}
      </div>

      {/* Desktop & Tablet Footer */}
      <Footer />

      {/* Mobile Fixed Bottom Navigation Bar */}
      <MobileBottomNav onOpenSearch={() => setIsSearchOpen(true)} />

      {/* Global Search Modal */}
      <GlobalSearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {/* Auth & Feature Modals */}
      <LoginModal />
      <RegisterModal />
      <OnboardingModal />
      <CreatePostModal />

      {/* Statutory Disclaimer & Content Usage Consent Modal */}
      <DisclaimerModal />

    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
