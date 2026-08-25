import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Quote from "./pages/Quote.jsx";
import HowItWorks from "./pages/HowItWorks.jsx";
import FloatingCommunityButton from "./components/community/FloatingCommunityButton.jsx";
import MentionsLegales from "./pages/legal/MentionsLegales.jsx";
import CGU from "./pages/legal/CGU.jsx";
import Confidentialite from "./pages/legal/Confidentialite.jsx";
import AdminLogin from "./pages/admin/Login.jsx";
import ProtectedRoute from "./components/admin/ProtectedRoute.jsx";
import AdminLayout from "./components/admin/AdminLayout.jsx";
import Dashboard from "./pages/admin/Dashboard.jsx";
import Heroes from "./pages/admin/Heroes.jsx";
import Locations from "./pages/admin/Locations.jsx";
import Quotes from "./pages/admin/Quotes.jsx";
import Reviews from "./pages/admin/Reviews.jsx";
import Posts from "./pages/admin/Posts.jsx";
import Sponsors from "./pages/admin/Sponsors.jsx";
import Faqs from "./pages/admin/Faqs.jsx";
import Settings from "./pages/admin/Settings.jsx";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");

  return (
    <>
    <ScrollToTop />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/devis" element={<Quote />} />
      <Route path="/comment-ca-marche" element={<HowItWorks />} />
      <Route path="/mentions-legales" element={<MentionsLegales />} />
      <Route path="/cgu" element={<CGU />} />
      <Route path="/confidentialite" element={<Confidentialite />} />

      <Route path="/admin/login" element={<AdminLogin />} />
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="heroes" element={<Heroes />} />
        <Route path="locations" element={<Locations />} />
        <Route path="quotes" element={<Quotes />} />
        <Route path="reviews" element={<Reviews />} />
        <Route path="posts" element={<Posts />} />
        <Route path="sponsors" element={<Sponsors />} />
        <Route path="faqs" element={<Faqs />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
    {!isAdmin && <FloatingCommunityButton />}
    </>
  );
}
