
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Eye, Mail, Building, Calendar, MapPin } from "lucide-react";

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

export const ContactManager = () => {
  const [contactSubmissions] = useState<ContactSubmission[]>([
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

  const [selectedSubmission, setSelectedSubmission] = useState<ContactSubmission | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-red-100 text-red-800';
      case 'read': return 'bg-yellow-100 text-yellow-800';
      case 'replied': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleViewSubmission = (submission: ContactSubmission) => {
    setSelectedSubmission(submission);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Contact Management</h2>
        <p className="text-gray-600">Manage contact form submissions and inquiries</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Contact Submissions List */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Contact Submissions</CardTitle>
              <CardDescription>
                Recent contact form submissions from website visitors
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {contactSubmissions.map((submission) => (
                  <div 
                    key={submission.id}
                    className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                    onClick={() => handleViewSubmission(submission)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-semibold text-gray-900">{submission.fullName}</h4>
                        <p className="text-sm text-gray-600 flex items-center gap-1">
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
                          {submission.status}
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
                    <div className="mt-3 flex justify-end">
                      <Button variant="outline" size="sm">
                        <Eye className="mr-2 h-3 w-3" />
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contact Details / Contact Form */}
        <div>
          {selectedSubmission ? (
            <Card>
              <CardHeader>
                <CardTitle>Contact Details</CardTitle>
                <CardDescription>View full contact submission</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <Label className="text-sm font-medium">Full Name</Label>
                    <p className="text-gray-900">{selectedSubmission.fullName}</p>
                  </div>
                  
                  <div>
                    <Label className="text-sm font-medium">Email</Label>
                    <p className="text-gray-900">{selectedSubmission.email}</p>
                  </div>
                  
                  {selectedSubmission.organization && (
                    <div>
                      <Label className="text-sm font-medium">Organization</Label>
                      <p className="text-gray-900">{selectedSubmission.organization}</p>
                    </div>
                  )}
                  
                  <div>
                    <Label className="text-sm font-medium">Subject</Label>
                    <p className="text-gray-900">{selectedSubmission.subject}</p>
                  </div>
                  
                  <div>
                    <Label className="text-sm font-medium">Message</Label>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      {selectedSubmission.message}
                    </p>
                  </div>
                  
                  <div>
                    <Label className="text-sm font-medium">Submitted</Label>
                    <p className="text-gray-600 text-sm">
                      {new Date(selectedSubmission.submittedAt).toLocaleString()}
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    className="bg-blue-600 hover:bg-blue-700"
                    onClick={() => toast.success("Email reply sent!")}
                  >
                    Reply
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => toast.success("Marked as read!")}
                  >
                    Mark as Read
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
                <CardDescription>Organization contact details and location</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <Label className="text-sm font-medium">Address</Label>
                    <p className="text-gray-700 text-sm flex items-start gap-2">
                      <MapPin className="h-4 w-4 mt-0.5 text-gray-500" />
                      123 Norodom Boulevard, Sangkat Tonle Bassac, Khan Chamkarmon, Phnom Penh, Cambodia
                    </p>
                  </div>
                  
                  <div>
                    <Label className="text-sm font-medium">Phone</Label>
                    <p className="text-gray-700">+855 12 345 678</p>
                  </div>
                  
                  <div>
                    <Label className="text-sm font-medium">Email</Label>
                    <p className="text-gray-700">info@ciedri.org</p>
                  </div>
                  
                  <div>
                    <Label className="text-sm font-medium">Business Hours</Label>
                    <p className="text-gray-700 text-sm">
                      Monday - Friday: 8:00 AM - 5:00 PM<br />
                      Saturday: 8:00 AM - 12:00 PM<br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
                
                {/* Map Placeholder */}
                <div className="bg-gray-100 h-40 rounded-lg flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <MapPin className="h-8 w-8 mx-auto mb-2" />
                    <p className="text-sm">Interactive Map</p>
                    <p className="text-xs">(Requires Google Maps integration)</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};
