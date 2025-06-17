
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Upload, Save } from "lucide-react";

export const HeaderManager = () => {
  const [headerData, setHeaderData] = useState({
    title: "Cambodia Industrial and Economic Development Research Institute",
    description: "Leading research and advisory institute for industrial development in Cambodia",
    bannerImage: ""
  });

  const handleSave = () => {
    toast.success("Header content saved successfully!");
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Header Section Management</h2>
        <p className="text-gray-600">Configure the main header content for your website</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Header Content</CardTitle>
          <CardDescription>
            Update the main title, description, and banner image for your website header
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              value={headerData.title}
              onChange={(e) => setHeaderData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Enter header title"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={headerData.description}
              onChange={(e) => setHeaderData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Enter header description"
              rows={4}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bannerImage">Banner Image</Label>
            <div className="flex items-center gap-4">
              <Button variant="outline" className="flex items-center gap-2">
                <Upload className="h-4 w-4" />
                Upload Image
              </Button>
              <span className="text-sm text-gray-500">
                JPG, PNG or WebP (max 5MB)
              </span>
            </div>
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
            See how your header will appear on the website
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-8 rounded-lg">
            <h1 className="text-4xl font-bold mb-4">{headerData.title}</h1>
            <p className="text-xl opacity-90">{headerData.description}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
