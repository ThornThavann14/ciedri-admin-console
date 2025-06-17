
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
        <p className="text-gray-600">Manage contact information and form submissions</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <MessageSquare className="h-4 w-4 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Total Submissions</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-red-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">New</p>
                <p className="text-2xl font-bold text-red-600">{stats.newCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Eye className="h-4 w-4 text-yellow-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Read</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.readCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Mail className="h-4 w-4 text-green-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Replied</p>
                <p className="text-2xl font-bold text-green-600">{stats.repliedCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="submissions" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="submissions">Contact Submissions</TabsTrigger>
          <TabsTrigger value="info">Contact Information</TabsTrigger>
        </TabsList>
        
        <TabsContent value="submissions" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Contact Submissions List */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Submissions</CardTitle>
                  <CardDescription>
                    Contact form submissions from website visitors
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {contactSubmissions.map((submission) => (
                      <div 
                        key={submission.id}
                        className={`border rounded-lg p-4 cursor-pointer transition-all hover:shadow-md ${
                          selectedSubmission?.id === submission.id ? 'ring-2 ring-blue-500 bg-blue-50' : 'hover:bg-gray-50'
                        }`}
                        onClick={() => handleViewSubmission(submission)}
                      >
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <User className="h-4 w-4 text-gray-500" />
                              <h4 className="font-semibold text-gray-900">{submission.fullName}</h4>
                            </div>
                            <p className="text-sm text-gray-600 flex items-center gap-1 mb-1">
                              <Mail className="h-3 w-3" />
                              {submission.email}
                            </p>
                            {submission.organization && (
                              <p className="text-sm text-gray-600 flex items-center gap-1">
                                <Building className="h-3 w-3" />
                                {submission.organization}
                              </p>
                            )}
                          </div>
                          <div className="flex flex-col items-end gap-2">
                            <Badge className={getStatusColor(submission.status)}>
                              {submission.status.toUpperCase()}
                            </Badge>
                            <span className="text-xs text-gray-500 flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {new Date(submission.submittedAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        <div>
                          <p className="font-medium text-gray-800 mb-1">{submission.subject}</p>
                          <p className="text-sm text-gray-600 line-clamp-2">{submission.message}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contact Details */}
            <div>
              {selectedSubmission ? (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      Contact Details
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedSubmission(null)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div>
                        <Label className="text-sm font-medium text-gray-700">Full Name</Label>
                        <p className="text-gray-900 font-medium">{selectedSubmission.fullName}</p>
                      </div>
                      
                      <div>
                        <Label className="text-sm font-medium text-gray-700">Email</Label>
                        <p className="text-gray-900">{selectedSubmission.email}</p>
                      </div>
                      
                      {selectedSubmission.organization && (
                        <div>
                          <Label className="text-sm font-medium text-gray-700">Organization</Label>
                          <p className="text-gray-900">{selectedSubmission.organization}</p>
                        </div>
                      )}
                      
                      <div>
                        <Label className="text-sm font-medium text-gray-700">Subject</Label>
                        <p className="text-gray-900 font-medium">{selectedSubmission.subject}</p>
                      </div>
                      
                      <div>
                        <Label className="text-sm font-medium text-gray-700">Message</Label>
                        <div className="bg-gray-50 p-3 rounded-md">
                          <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">
                            {selectedSubmission.message}
                          </p>
                        </div>
                      </div>
                      
                      <div>
                        <Label className="text-sm font-medium text-gray-700">Status</Label>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge className={getStatusColor(selectedSubmission.status)}>
                            {selectedSubmission.status.toUpperCase()}
                          </Badge>
                        </div>
                      </div>
                      
                      <div>
                        <Label className="text-sm font-medium text-gray-700">Submitted</Label>
                        <p className="text-gray-600 text-sm">
                          {new Date(selectedSubmission.submittedAt).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-2 pt-4 border-t">
                      <Button 
                        size="sm" 
                        className="bg-blue-600 hover:bg-blue-700"
                        onClick={() => {
                          updateSubmissionStatus(selectedSubmission.id, 'replied');
                          toast.success("Email reply sent!");
                        }}
                      >
                        <Mail className="mr-2 h-4 w-4" />
                        Reply
                      </Button>
                      
                      {selectedSubmission.status === 'new' && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => {
                            updateSubmissionStatus(selectedSubmission.id, 'read');
                            toast.success("Marked as read!");
                          }}
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          Mark as Read
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardHeader>
                    <CardTitle>Select a Submission</CardTitle>
                    <CardDescription>
                      Click on a submission to view details and take actions
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8 text-gray-500">
                      <MessageSquare className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                      <p>No submission selected</p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="info" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Contact Information</CardTitle>
                  <CardDescription>
                    Manage organization contact details and business information
                  </CardDescription>
                </div>
                {!isEditingContact && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsEditingContact(true)}
                  >
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {isEditingContact ? (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="address">Address</Label>
                    <Textarea
                      id="address"
                      value={editedContactInfo.address}
                      onChange={(e) => setEditedContactInfo(prev => ({ ...prev, address: e.target.value }))}
                      rows={3}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        value={editedContactInfo.phone}
                        onChange={(e) => setEditedContactInfo(prev => ({ ...prev, phone: e.target.value }))}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={editedContactInfo.email}
                        onChange={(e) => setEditedContactInfo(prev => ({ ...prev, email: e.target.value }))}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      value={editedContactInfo.website}
                      onChange={(e) => setEditedContactInfo(prev => ({ ...prev, website: e.target.value }))}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="businessHours">Business Hours</Label>
                    <Textarea
                      id="businessHours"
                      value={editedContactInfo.businessHours}
                      onChange={(e) => setEditedContactInfo(prev => ({ ...prev, businessHours: e.target.value }))}
                      rows={4}
                    />
                  </div>
                  
                  <div>
                    <Label>Social Media Links</Label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                      <div>
                        <Label htmlFor="facebook" className="text-sm">Facebook</Label>
                        <Input
                          id="facebook"
                          value={editedContactInfo.socialMedia.facebook}
                          onChange={(e) => setEditedContactInfo(prev => ({ 
                            ...prev, 
                            socialMedia: { ...prev.socialMedia, facebook: e.target.value }
                          }))}
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="linkedin" className="text-sm">LinkedIn</Label>
                        <Input
                          id="linkedin"
                          value={editedContactInfo.socialMedia.linkedin}
                          onChange={(e) => setEditedContactInfo(prev => ({ 
                            ...prev, 
                            socialMedia: { ...prev.socialMedia, linkedin: e.target.value }
                          }))}
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="twitter" className="text-sm">Twitter</Label>
                        <Input
                          id="twitter"
                          value={editedContactInfo.socialMedia.twitter}
                          onChange={(e) => setEditedContactInfo(prev => ({ 
                            ...prev, 
                            socialMedia: { ...prev.socialMedia, twitter: e.target.value }
                          }))}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 pt-4 border-t">
                    <Button onClick={handleSaveContactInfo}>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </Button>
                    <Button variant="outline" onClick={handleCancelEdit}>
                      <X className="mr-2 h-4 w-4" />
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Address</Label>
                    <p className="text-gray-700 flex items-start gap-2 mt-1">
                      <MapPin className="h-4 w-4 mt-0.5 text-gray-500 flex-shrink-0" />
                      {contactInfo.address}
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium text-gray-700">Phone</Label>
                      <p className="text-gray-700 flex items-center gap-2 mt-1">
                        <Phone className="h-4 w-4 text-gray-500" />
                        {contactInfo.phone}
                      </p>
                    </div>
                    
                    <div>
                      <Label className="text-sm font-medium text-gray-700">Email</Label>
                      <p className="text-gray-700 flex items-center gap-2 mt-1">
                        <Mail className="h-4 w-4 text-gray-500" />
                        {contactInfo.email}
                      </p>
                    </div>
                  </div>
                  
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Website</Label>
                    <p className="text-gray-700 flex items-center gap-2 mt-1">
                      <Globe className="h-4 w-4 text-gray-500" />
                      {contactInfo.website}
                    </p>
                  </div>
                  
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Business Hours</Label>
                    <p className="text-gray-700 text-sm mt-1 whitespace-pre-line">
                      {contactInfo.businessHours}
                    </p>
                  </div>
                  
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Social Media</Label>
                    <div className="flex gap-4 mt-2">
                      <a href={contactInfo.socialMedia.facebook} className="text-blue-600 hover:text-blue-800">
                        Facebook
                      </a>
                      <a href={contactInfo.socialMedia.linkedin} className="text-blue-600 hover:text-blue-800">
                        LinkedIn
                      </a>
                      <a href={contactInfo.socialMedia.twitter} className="text-blue-600 hover:text-blue-800">
                        Twitter
                      </a>
                    </div>
                  </div>
                  
                  {/* Map Placeholder */}
                  <div className="bg-gray-100 h-64 rounded-lg flex items-center justify-center mt-6">
                    <div className="text-center text-gray-500">
                      <MapPin className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                      <p className="text-lg font-medium">Interactive Map</p>
                      <p className="text-sm">Google Maps integration would be displayed here</p>
                      <p className="text-xs mt-2">{contactInfo.address}</p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
