
import { useState } from "react";
import { AdminSidebar } from "./AdminSidebar";
import { AdminHeader } from "./AdminHeader";
import { DashboardHome } from "./DashboardHome";
import { LoginPage } from "./LoginPage";
import { IndustryTrendsManager } from "./content/IndustryTrendsManager";
import { ServiceCardsManager } from "./content/ServiceCardsManager";
import { FooterManager } from "./content/FooterManager";
import { ContactManager } from "./content/ContactManager";
import { AboutManager } from "./content/AboutManager";
import { HeaderManager } from "./content/HeaderManager";
import { NewsCardsManager } from "./content/NewsCardsManager";
import { PolicyCardsManager } from "./content/PolicyCardsManager";
import { TrendsCardsManager } from "./content/TrendsCardsManager";
import { ThinkTankManager } from "./content/ThinkTankManager";
import { RoundtableManager } from "./content/RoundtableManager";
import { IndustryReportsManager } from "./content/IndustryReportsManager";
import { IndustrialParkMapManager } from "./content/IndustrialParkMapManager";
import { SidebarProvider } from "@/components/ui/sidebar";

export const AdminDashboard = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeSection, setActiveSection] = useState("dashboard");

  if (!isLoggedIn) {
    return <LoginPage onLogin={() => setIsLoggedIn(true)} />;
  }

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <DashboardHome />;
      case "header":
        return <HeaderManager />;
      case "about":
        return <AboutManager />;
      case "industry-trends":
        return <IndustryTrendsManager />;
      case "service-cards":
        return <ServiceCardsManager />;
      case "footer":
        return <FooterManager />;
      case "contact":
        return <ContactManager />;
      case "news-cards":
        return <NewsCardsManager />;
      case "policy-cards":
        return <PolicyCardsManager />;
      case "trends-cards":
        return <TrendsCardsManager />;
      case "think-tank":
        return <ThinkTankManager />;
      case "roundtable":
        return <RoundtableManager />;
      case "industry-reports":
        return <IndustryReportsManager />;
      case "industrial-park-map":
        return <IndustrialParkMapManager />;
      default:
        return <DashboardHome />;
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <AdminSidebar 
          activeSection={activeSection} 
          onSectionChange={setActiveSection} 
        />
        <div className="flex-1 flex flex-col">
          <AdminHeader onLogout={() => setIsLoggedIn(false)} />
          <main className="flex-1 p-6 overflow-auto">
            {renderContent()}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};
