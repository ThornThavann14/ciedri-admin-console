
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Save, Plus, Trash2, Facebook, Linkedin, Globe, MapPin, Phone } from "lucide-react";

interface LinkItem {
  id: string;
  label: string;
  url: string;
}

export const FooterManager = () => {
  const [footerData, setFooterData] = useState({
    title: "CIEDRI",
    description: "Leading research and advisory institute for industrial development in Cambodia",
    facebookUrl: "https://facebook.com/ciedri",
    linkedinUrl: "https://linkedin.com/company/ciedri",
    websiteUrl: "https://ciedri.org",
    location: "123 Norodom Boulevard, Sangkat Tonle Bassac, Khan Chamkarmon, Phnom Penh, Cambodia",
    phone: "+855 12 345 678",
    email: "info@ciedri.org"
  });

  const [quickLinks, setQuickLinks] = useState<LinkItem[]>([
    { id: "1", label: "About Us", url: "/about" },
    { id: "2", label: "Industry Services", url: "/services" },
    { id: "3", label: "Research Reports", url: "/reports" },
    { id: "4", label: "Contact", url: "/contact" }
  ]);

  const [governmentLinks, setGovernmentLinks] = useState<LinkItem[]>([
    { id: "1", label: "Ministry of Industry", url: "https://mih.gov.kh" },
    { id: "2", label: "Council for Development of Cambodia", url: "https://cambodiainvestment.gov.kh" },
    { id: "3", label: "Cambodia Chamber of Commerce", url: "https://ccc.org.kh" }
  ]);

  const handleSave = () => {
    toast.success("Footer content saved successfully!");
  };

  const addQuickLink = () => {
    const newLink: LinkItem = {
      id: Date.now().toString(),
      label: "",
      url: ""
    };
    setQuickLinks(prev => [...prev, newLink]);
  };

  const updateQuickLink = (id: string, field: 'label' | 'url', value: string) => {
    setQuickLinks(prev => prev.map(link => 
      link.id === id ? { ...link, [field]: value } : link
    ));
  };

  const removeQuickLink = (id: string) => {
    setQuickLinks(prev => prev.filter(link => link.id !== id));
  };

  const addGovernmentLink = () => {
    const newLink: LinkItem = {
      id: Date.now().toString(),
      label: "",
      url: ""
    };
    setGovernmentLinks(prev => [...prev, newLink]);
  };

  const updateGovernmentLink = (id: string, field: 'label' | 'url', value: string) => {
    setGovernmentLinks(prev => prev.map(link => 
      link.id === id ? { ...link, [field]: value } : link
    ));
  };

  const removeGovernmentLink = (id: string) => {
    setGovernmentLinks(prev => prev.filter(link => link.id !== id));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Footer Management</h2>
        <p className="text-gray-600">Configure footer content, contact information, and links</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>Organization title and description</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Organization Title *</Label>
              <Input
                id="title"
                value={footerData.title}
                onChange={(e) => setFooterData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Enter organization name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                value={footerData.description}
                onChange={(e) => setFooterData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Enter organization description (max 250 chars)"
                maxLength={250}
                rows={3}
                required
              />
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
            <CardDescription>Contact details and location</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="location" className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Location *
              </Label>
              <Textarea
                id="location"
                value={footerData.location}
                onChange={(e) => setFooterData(prev => ({ ...prev, location: e.target.value }))}
                placeholder="Enter full address"
                rows={3}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone" className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Phone *
                </Label>
                <Input
                  id="phone"
                  value={footerData.phone}
                  onChange={(e) => setFooterData(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="+855 XX XXX XXX"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={footerData.email}
                  onChange={(e) => setFooterData(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="info@ciedri.org"
                  required
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Social Media Links */}
        <Card>
          <CardHeader>
            <CardTitle>Social Media Links</CardTitle>
            <CardDescription>Social media and website URLs</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="facebookUrl" className="flex items-center gap-2">
                <Facebook className="h-4 w-4" />
                Facebook URL *
              </Label>
              <Input
                id="facebookUrl"
                value={footerData.facebookUrl}
                onChange={(e) => setFooterData(prev => ({ ...prev, facebookUrl: e.target.value }))}
                placeholder="https://facebook.com/yourpage"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="linkedinUrl" className="flex items-center gap-2">
                <Linkedin className="h-4 w-4" />
                LinkedIn URL *
              </Label>
              <Input
                id="linkedinUrl"
                value={footerData.linkedinUrl}
                onChange={(e) => setFooterData(prev => ({ ...prev, linkedinUrl: e.target.value }))}
                placeholder="https://linkedin.com/company/yourcompany"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="websiteUrl" className="flex items-center gap-2">
                <Globe className="h-4 w-4" />
                Website URL *
              </Label>
              <Input
                id="websiteUrl"
                value={footerData.websiteUrl}
                onChange={(e) => setFooterData(prev => ({ ...prev, websiteUrl: e.target.value }))}
                placeholder="https://yourwebsite.com"
                required
              />
            </div>
          </CardContent>
        </Card>

        {/* Quick Links */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Quick Links
              <Button variant="outline" size="sm" onClick={addQuickLink}>
                <Plus className="h-4 w-4 mr-1" />
                Add Link
              </Button>
            </CardTitle>
            <CardDescription>Internal navigation links</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {quickLinks.map((link) => (
              <div key={link.id} className="flex gap-2 items-center">
                <Input
                  placeholder="Link label"
                  value={link.label}
                  onChange={(e) => updateQuickLink(link.id, 'label', e.target.value)}
                />
                <Input
                  placeholder="URL"
                  value={link.url}
                  onChange={(e) => updateQuickLink(link.id, 'url', e.target.value)}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeQuickLink(link.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Government Links */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Government Links
              <Button variant="outline" size="sm" onClick={addGovernmentLink}>
                <Plus className="h-4 w-4 mr-1" />
                Add Link
              </Button>
            </CardTitle>
            <CardDescription>External government and partner website links</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {governmentLinks.map((link) => (
                <div key={link.id} className="flex gap-2 items-center">
                  <Input
                    placeholder="Organization name"
                    value={link.label}
                    onChange={(e) => updateGovernmentLink(link.id, 'label', e.target.value)}
                  />
                  <Input
                    placeholder="External URL"
                    value={link.url}
                    onChange={(e) => updateGovernmentLink(link.id, 'url', e.target.value)}
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeGovernmentLink(link.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end">
        <Button onClick={handleSave} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700">
          <Save className="h-4 w-4" />
          Save Footer Settings
        </Button>
      </div>

      {/* Footer Preview */}
      <Card>
        <CardHeader>
          <CardTitle>Footer Preview</CardTitle>
          <CardDescription>See how your footer will appear on the website</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-900 text-white p-8 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="md:col-span-2">
                <h3 className="text-xl font-bold mb-2">{footerData.title}</h3>
                <p className="text-gray-300 mb-4">{footerData.description}</p>
                <div className="flex gap-4">
                  <Facebook className="h-5 w-5" />
                  <Linkedin className="h-5 w-5" />
                  <Globe className="h-5 w-5" />
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-3">Quick Links</h4>
                <ul className="space-y-2">
                  {quickLinks.slice(0, 4).map(link => (
                    <li key={link.id} className="text-gray-300 hover:text-white cursor-pointer">
                      {link.label || "Link"}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-3">Contact</h4>
                <div className="space-y-2 text-gray-300">
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 mt-1 flex-shrink-0" />
                    <span className="text-sm">{footerData.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    <span className="text-sm">{footerData.phone}</span>
                  </div>
                  <div className="text-sm">{footerData.email}</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
