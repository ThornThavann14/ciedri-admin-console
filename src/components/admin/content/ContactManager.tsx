import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { 
  Eye, 
  Mail, 
  Building, 
  Calendar, 
  MapPin, 
  Phone, 
  Globe,
  Edit,
  Save,
  X,
  Clock,
  User,
  MessageSquare
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ContactSubmission {
  id: string;
  fullName: string;
  email: string;
  organization: string;
  subject: string;
  message: string;
  submittedAt: string;
  status: 'new' | 'read' | 'replied';
}

interface ContactInfo {
  address: string;
  phone: string;
  email: string;
  businessHours: string;
  website: string;
  socialMedia: {
    facebook: string;
    linkedin: string;
    twitter: string;
  };
}

export const ContactManager = () => {
  const [contactSubmissions, setContactSubmissions] = useState<ContactSubmission[]>([
    {
      id: "1",
      fullName: "John Smith",
      email: "john.smith@example.com",
      organization: "Industrial Development Corp",
      subject: "Partnership Inquiry",
      message: "We are interested in exploring partnership opportunities for industrial zone development in Cambodia. Could we schedule a meeting to discuss potential collaboration?",
      submittedAt: "2024-01-15T10:30:00Z",
      status: 'new'
    },
    {
      id: "2",
      fullName: "Sarah Johnson",
      email: "sarah.j@manufacturing.com",
      organization: "Manufacturing Solutions Ltd",
      subject: "Research Request",
      message: "Hello, we would like to request access to your latest manufacturing sector analysis reports. Our company is considering expansion into the Cambodian market.",
      submittedAt: "2024-01-14T14:22:00Z",
      status: 'read'
    },
    {
      id: "3",
      fullName: "David Chen",
      email: "d.chen@consulting.org",
      organization: "",
      subject: "Policy Consultation",
      message: "I am working on a policy paper regarding industrial development in Southeast Asia and would appreciate insights from CIEDRI's research team.",
      submittedAt: "2024-01-13T09:15:00Z",
      status: 'replied'
    }
  ]);

  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    address: "123 Norodom Boulevard, Sangkat Tonle Bassac, Khan Chamkarmon, Phnom Penh, Cambodia",
    phone: "+855 12 345 678",
    email: "info@ciedri.org",
    businessHours: "Monday - Friday: 8:00 AM - 5:00 PM\nSaturday: 8:00 AM - 12:00 PM\nSunday: Closed",
    website: "https://www.ciedri.org",
    socialMedia: {
      facebook: "https://facebook.com/ciedri",
      linkedin: "https://linkedin.com/company/ciedri",
      twitter: "https://twitter.com/ciedri"
    }
  });

  const [selectedSubmission, setSelectedSubmission] = useState<ContactSubmission | null>(null);
  const [isEditingContact, setIsEditingContact] = useState(false);
  const [editedContactInfo, setEditedContactInfo] = useState<ContactInfo>(contactInfo);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-red-100 text-red-800 border-red-200';
      case 'read': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'replied': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleViewSubmission = (submission: ContactSubmission) => {
    setSelectedSubmission(submission);
    if (submission.status === 'new') {
      updateSubmissionStatus(submission.id, 'read');
    }
  };

  const updateSubmissionStatus = (id: string, status: 'new' | 'read' | 'replied') => {
    setContactSubmissions(prev => 
      prev.map(submission => 
        submission.id === id 
          ? { ...submission, status }
          : submission
      )
    );
    if (selectedSubmission?.id === id) {
      setSelectedSubmission(prev => prev ? { ...prev, status } : null);
    }
  };

  const handleSaveContactInfo = () => {
    setContactInfo(editedContactInfo);
    setIsEditingContact(false);
    toast.success("Contact information updated successfully!");
  };

  const handleCancelEdit = () => {
    setEditedContactInfo(contactInfo);
    setIsEditingContact(false);
  };

  const getSubmissionStats = () => {
    const total = contactSubmissions.length;
    const newCount = contactSubmissions.filter(s => s.status === 'new').length;
    const readCount = contactSubmissions.filter(s => s.status === 'read').length;
    const repliedCount = contactSubmissions.filter(s => s.status === 'replied').length;
    
    return { total, newCount, readCount, repliedCount };
  };

  const stats = getSubmissionStats();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Contact Management</h2>
        <p className="text-gray-600">Update your organization's contact information</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>
                Update your organization's contact details and business information
              </CardDescription>
            </div>
            {!isEditingContact && (
              <Button
                onClick={() => setIsEditingContact(true)}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Edit className="mr-2 h-4 w-4" />
                Update Contact Info
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {isEditingContact ? (
            <div className="space-y-4">
              <div>
                <Label htmlFor="address" className="text-sm font-medium">Organization Address</Label>
                <Textarea
                  id="address"
                  value={editedContactInfo.address}
                  onChange={(e) => setEditedContactInfo(prev => ({ ...prev, address: e.target.value }))}
                  rows={3}
                  className="mt-1"
                  placeholder="Enter your organization's full address"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone" className="text-sm font-medium">Phone Number</Label>
                  <Input
                    id="phone"
                    value={editedContactInfo.phone}
                    onChange={(e) => setEditedContactInfo(prev => ({ ...prev, phone: e.target.value }))}
                    className="mt-1"
                    placeholder="+855 XX XXX XXX"
                  />
                </div>
                
                <div>
                  <Label htmlFor="email" className="text-sm font-medium">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={editedContactInfo.email}
                    onChange={(e) => setEditedContactInfo(prev => ({ ...prev, email: e.target.value }))}
                    className="mt-1"
                    placeholder="contact@organization.org"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="website" className="text-sm font-medium">Website URL</Label>
                <Input
                  id="website"
                  value={editedContactInfo.website}
                  onChange={(e) => setEditedContactInfo(prev => ({ ...prev, website: e.target.value }))}
                  className="mt-1"
                  placeholder="https://www.organization.org"
                />
              </div>
              
              <div>
                <Label htmlFor="businessHours" className="text-sm font-medium">Business Hours</Label>
                <Textarea
                  id="businessHours"
                  value={editedContactInfo.businessHours}
                  onChange={(e) => setEditedContactInfo(prev => ({ ...prev, businessHours: e.target.value }))}
                  rows={4}
                  className="mt-1"
                  placeholder="Monday - Friday: 8:00 AM - 5:00 PM"
                />
              </div>
              
              <div>
                <Label className="text-sm font-medium">Social Media Links</Label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                  <div>
                    <Label htmlFor="facebook" className="text-xs text-gray-600">Facebook</Label>
                    <Input
                      id="facebook"
                      value={editedContactInfo.socialMedia.facebook}
                      onChange={(e) => setEditedContactInfo(prev => ({ 
                        ...prev, 
                        socialMedia: { ...prev.socialMedia, facebook: e.target.value }
                      }))}
                      placeholder="https://facebook.com/yourpage"
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="linkedin" className="text-xs text-gray-600">LinkedIn</Label>
                    <Input
                      id="linkedin"
                      value={editedContactInfo.socialMedia.linkedin}
                      onChange={(e) => setEditedContactInfo(prev => ({ 
                        ...prev, 
                        socialMedia: { ...prev.socialMedia, linkedin: e.target.value }
                      }))}
                      placeholder="https://linkedin.com/company/yourcompany"
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="twitter" className="text-xs text-gray-600">Twitter</Label>
                    <Input
                      id="twitter"
                      value={editedContactInfo.socialMedia.twitter}
                      onChange={(e) => setEditedContactInfo(prev => ({ 
                        ...prev, 
                        socialMedia: { ...prev.socialMedia, twitter: e.target.value }
                      }))}
                      placeholder="https://twitter.com/yourhandle"
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex gap-3 pt-4 border-t">
                <Button 
                  onClick={handleSaveContactInfo}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
                <Button 
                  variant="outline" 
                  onClick={handleCancelEdit}
                >
                  <X className="mr-2 h-4 w-4" />
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Address</Label>
                    <p className="text-gray-700 flex items-start gap-2 mt-1 p-3 bg-gray-50 rounded-md">
                      <MapPin className="h-4 w-4 mt-0.5 text-gray-500 flex-shrink-0" />
                      {contactInfo.address}
                    </p>
                  </div>
                  
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Phone</Label>
                    <p className="text-gray-700 flex items-center gap-2 mt-1 p-3 bg-gray-50 rounded-md">
                      <Phone className="h-4 w-4 text-gray-500" />
                      {contactInfo.phone}
                    </p>
                  </div>
                  
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Email</Label>
                    <p className="text-gray-700 flex items-center gap-2 mt-1 p-3 bg-gray-50 rounded-md">
                      <Mail className="h-4 w-4 text-gray-500" />
                      {contactInfo.email}
                    </p>
                  </div>
                  
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Website</Label>
                    <p className="text-gray-700 flex items-center gap-2 mt-1 p-3 bg-gray-50 rounded-md">
                      <Globe className="h-4 w-4 text-gray-500" />
                      {contactInfo.website}
                    </p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Business Hours</Label>
                    <div className="text-gray-700 text-sm mt-1 p-3 bg-gray-50 rounded-md whitespace-pre-line">
                      {contactInfo.businessHours}
                    </div>
                  </div>
                  
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Social Media</Label>
                    <div className="flex flex-wrap gap-3 mt-2">
                      <a 
                        href={contactInfo.socialMedia.facebook} 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 text-sm px-3 py-2 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors"
                      >
                        Facebook
                      </a>
                      <a 
                        href={contactInfo.socialMedia.linkedin}
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 text-sm px-3 py-2 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors"
                      >
                        LinkedIn
                      </a>
                      <a 
                        href={contactInfo.socialMedia.twitter}
                        target="_blank"
                        rel="noopener noreferrer" 
                        className="text-blue-600 hover:text-blue-800 text-sm px-3 py-2 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors"
                      >
                        Twitter
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Map Preview */}
              <div className="bg-gray-100 h-64 rounded-lg flex items-center justify-center mt-6">
                <div className="text-center text-gray-500">
                  <MapPin className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p className="text-lg font-medium">Location Preview</p>
                  <p className="text-sm">Map integration would display your address here</p>
                  <p className="text-xs mt-2 max-w-md">{contactInfo.address}</p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
