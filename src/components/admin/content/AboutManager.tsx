
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Save } from "lucide-react";

export const AboutManager = () => {
  const [aboutData, setAboutData] = useState({
    title: "About CIEDRI",
    fullDescription: `The Cambodia Industrial and Economic Development Research Institute (CIEDRI) is a leading research and advisory institution dedicated to promoting sustainable industrial development in Cambodia. Our mission is to provide evidence-based policy recommendations, conduct cutting-edge research, and facilitate knowledge transfer to support Cambodia's economic transformation.

Founded with the vision of becoming the premier think tank for industrial development in Southeast Asia, CIEDRI works closely with government agencies, private sector partners, and international organizations to drive innovation and growth across key industrial sectors.

Our multidisciplinary team of experts brings together decades of experience in economics, policy analysis, industrial planning, and development finance to deliver actionable insights that shape Cambodia's industrial future.`
  });

  const handleSave = () => {
    toast.success("About content saved successfully!");
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">About CIEDRI Management</h2>
        <p className="text-gray-600">Update the about section content for your organization</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>About Content</CardTitle>
          <CardDescription>
            Configure the main information about your organization
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="aboutTitle">Title *</Label>
            <Input
              id="aboutTitle"
              value={aboutData.title}
              onChange={(e) => setAboutData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Enter about section title"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="fullDescription">Full Description *</Label>
            <Textarea
              id="fullDescription"
              value={aboutData.fullDescription}
              onChange={(e) => setAboutData(prev => ({ ...prev, fullDescription: e.target.value }))}
              placeholder="Enter full description about your organization"
              rows={12}
              required
              className="resize-y"
            />
            <p className="text-sm text-gray-500">
              Supports rich text formatting. Use line breaks to separate paragraphs.
            </p>
          </div>

          <div className="flex justify-end">
            <Button onClick={handleSave} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700">
              <Save className="h-4 w-4" />
              Save Changes
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Preview Section */}
      <Card>
        <CardHeader>
          <CardTitle>Preview</CardTitle>
          <CardDescription>
            See how your about section will appear on the website
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="prose max-w-none">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{aboutData.title}</h2>
            <div className="text-gray-700 whitespace-pre-line leading-relaxed">
              {aboutData.fullDescription}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
