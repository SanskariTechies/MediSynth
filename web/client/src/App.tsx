import React, { useState, useEffect } from 'react';
import { Route, Routes, useParams } from 'react-router-dom';
import { Signin } from './pages/auth/signin';
import { Signup } from './pages/auth/signup';
import { Home } from './pages/home/Home';
import { NotFoundPage } from './pages/extras/NotFound';
import { Header } from './components/common/header';
import { Footer } from './components/common/footer';
import { ForgotForm } from './pages/auth/ForgotForm';
import Dashboard from './pages/dashboard/dashboard';
import {About} from './pages/about/about'
import { Feedback } from './pages/feedback/feedback';
import { Help } from './pages/help/help';

const Routing= () => {
  var { path } = useParams();
  // console.log(path);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 5000);
    return () => clearTimeout(timeout);
  }, []);

  let component;
  if (path === undefined || path === "/") {
    component = <Home />
  } else if ( path === "/about") {
    component = <About />;
  }
  else if ( path === "/feedback") {
    component = <Feedback />;
  }
  else if ( path === "/help") {
    component = <Help />;
  }
  else {
    component = <NotFoundPage />;
  }
  return (
    <>
      <div className="flex flex-col w-full min-h-screen bg-fixed bg-black bg-no-repeat bg-cover bg-opacity-85 backdrop-blur-sm" id="journal-scroll" style={{backgroundImage: `url("/assets/home.jpg")`}}>
        <Header />
        {component}
        <Footer />
      </div>
    </>
    
  );
};

export const App = () => {
  return (
    <Routes>
      {/* Authentication */}
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot" element={<ForgotForm />} />
      {/* Policy */}
      {/* Dashboard */}
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/dashboard/:path" element={<Dashboard />} />
      {/* Other routing */}
      <Route path="/" element={<Dashboard />} />
      <Route path="/about" element={<About />} />
      <Route path="/feedback" element={<Feedback />} />
      <Route path="/help" element={<Help />} />

      <Route path="/:path" element={<Routing />} />
    </Routes>
  );
};
