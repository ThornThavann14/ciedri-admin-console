
import { 
  LayoutDashboard, 
  FileText, 
  Info, 
  TrendingUp, 
  Briefcase, 
  Users, 
  Phone, 
  Newspaper,
  BookOpen,
  BarChart3,
  MapPin,
  FileBarChart,
  Settings,
  Globe
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

interface AdminSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const sidebarItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "header", label: "Header Section", icon: FileText },
  { id: "about", label: "About CIEDRI", icon: Info },
  { id: "industry-trends", label: "Industry Trends", icon: TrendingUp },
  { id: "service-cards", label: "Industry Services", icon: Briefcase },
  { id: "footer", label: "Footer", icon: Globe },
  { id: "contact", label: "Contact", icon: Phone },
  { id: "news-cards", label: "Industry News", icon: Newspaper },
  { id: "policy-cards", label: "Policy Insights", icon: BookOpen },
  { id: "trends-cards", label: "Investment Trends", icon: BarChart3 },
  { id: "think-tank", label: "Think Tank Perspectives", icon: Users },
  { id: "roundtable", label: "Roundtable Discussions", icon: Users },
  { id: "industry-reports", label: "Industry Reports", icon: FileBarChart },
  { id: "industrial-park-map", label: "Industrial Park Map", icon: MapPin },
];

export const AdminSidebar = ({ activeSection, onSectionChange }: AdminSidebarProps) => {
  const { collapsed } = useSidebar();

  return (
    <Sidebar className={collapsed ? "w-16" : "w-64"} collapsible>
      <SidebarTrigger className="m-2 self-end" />
      
      <div className="p-4 border-b">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">C</span>
          </div>
          {!collapsed && (
            <div>
              <h2 className="font-bold text-lg text-blue-600">CIEDRI</h2>
              <p className="text-xs text-gray-500">Admin Panel</p>
            </div>
          )}
        </div>
      </div>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Content Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton 
                    asChild
                    className={activeSection === item.id ? "bg-blue-100 text-blue-600" : ""}
                  >
                    <button
                      onClick={() => onSectionChange(item.id)}
                      className="flex items-center gap-3 w-full"
                    >
                      <item.icon className="h-4 w-4" />
                      {!collapsed && <span>{item.label}</span>}
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};
