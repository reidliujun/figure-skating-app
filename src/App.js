import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import CategoryList from './pages/CategoryList';
import CategoryDetail from './pages/CategoryDetail';
import LevelDetail from './pages/LevelDetail';
import NotFound from './pages/NotFound';
import Search from './pages/Search';
import Login from './pages/Login';
import Profile from './pages/Profile';
import TestFirebase from './components/TestFirebase';
import { CompletionProvider } from './context/CompletionContext';
import { AuthProvider } from './context/AuthContext';
import './App.css';
import './firebase/config';

function App() {
  return (
    <AuthProvider>
      <CompletionProvider>
        <Router>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow bg-gray-100">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/categories" element={<CategoryList />} />
                <Route path="/category/:categoryId" element={<CategoryDetail />} />
                <Route path="/category/:categoryId/level/:levelId" element={<LevelDetail />} />
                <Route path="/search" element={<Search />} />
                <Route path="/login" element={<Login />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/test-firebase" element={<TestFirebase />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </CompletionProvider>
    </AuthProvider>
  );
}

export default App;