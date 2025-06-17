
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Upload, Save, Plus, Edit, Trash2 } from "lucide-react";

export const TrendsCardsManager = () => {
  const [trendItems, setTrendItems] = useState([
    {
      id: 1,
      title: "FDI Growth in Economic Zones",
      description: "Foreign direct investment shows positive trends in special economic zones.",
      category: "FDI",
      date: "2024-01-12",
      status: "Active"
    }
  ]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    date: "",
    linkUrl: "",
    linkText: "Read Full Report",
    displayOrder: 1,
    status: "Active"
  });

  const handleSave = () => {
    toast.success("Investment trend saved successfully!");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Investment Trends Management</h2>
          <p className="text-gray-600">Manage investment trends and economic analysis</p>
        </div>
        <Button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4" />
          Add Trend
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Investment Trend Form</CardTitle>
            <CardDescription>Create or edit investment trend content</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Trend Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Enter trend title"
                maxLength={80}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Trend Description *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Enter trend description"
                rows={3}
                maxLength={200}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="FDI">FDI</SelectItem>
                    <SelectItem value="Economic Zones">Economic Zones</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="date">Date *</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="backgroundImage">Background Image *</Label>
              <div className="flex items-center gap-4">
                <Button variant="outline" className="flex items-center gap-2">
                  <Upload className="h-4 w-4" />
                  Upload Image
                </Button>
                <span className="text-sm text-gray-500">JPG, PNG or WebP (max 3MB)</span>
              </div>
            </div>

            <div className="flex justify-end">
              <Button onClick={handleSave} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700">
                <Save className="h-4 w-4" />
                Save Trend
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Trends List</CardTitle>
            <CardDescription>Manage existing investment trends</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {trendItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">{item.title}</h4>
                    <p className="text-sm text-gray-600">{item.category} • {item.date}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
