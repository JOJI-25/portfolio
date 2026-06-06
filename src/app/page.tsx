import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import RecruiterDashboard from "@/components/sections/RecruiterDashboard";
import FeaturedProjects from "@/components/sections/FeaturedProjects";
import AboutMe from "@/components/sections/AboutMe";
import LearningJourney from "@/components/sections/LearningJourney";
import SkillsRoadmap from "@/components/sections/SkillsRoadmap";
// import DashboardGallery from "@/components/sections/DashboardGallery";
// import Certifications from "@/components/sections/Certifications";
// import AchievementBadges from "@/components/sections/AchievementBadges";
import GitHubActivity from "@/components/sections/GitHubActivity";
import ContactSection from "@/components/sections/ContactSection";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main-content" tabIndex={-1} className="outline-none">
        <HeroSection />
        <RecruiterDashboard />
        <FeaturedProjects />
        <AboutMe />
        <LearningJourney />
        <SkillsRoadmap />
        {/* <DashboardGallery /> */}
        {/* <Certifications /> */}
        {/* <AchievementBadges /> */}
        <GitHubActivity />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
