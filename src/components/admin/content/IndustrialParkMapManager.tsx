
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Upload, Save, Plus, Edit, Trash2, MapPin, Building, Users } from "lucide-react";

export const IndustrialParkMapManager = () => {
  const [parks, setParks] = useState([
    {
      id: 1,
      name: "Phnom Penh Special Economic Zone",
      location: "Phnom Penh, Cambodia",
      keyIndustries: "Textiles, Electronics, Food Processing",
      area: 360,
      companies: 85,
      status: "Active"
    }
  ]);

  const [formData, setFormData] = useState({
    name: "",
    location: "",
    keyIndustries: "",
    area: "",
    companies: "",
    viewDetailsLink: ""
  });

  const handleSave = () => {
    toast.success("Industrial park saved successfully!");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Industrial Park Map</h2>
          <p className="text-gray-600">Manage industrial parks and economic zones data</p>
        </div>
        <Button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4" />
          Add Park
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Industrial Park Form</CardTitle>
            <CardDescription>Create or edit industrial park information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Park Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Enter park name"
                maxLength={80}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location *</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                placeholder="Enter location"
                maxLength={100}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="keyIndustries">Key Industries *</Label>
              <Textarea
                id="keyIndustries"
                value={formData.keyIndustries}
                onChange={(e) => setFormData(prev => ({ ...prev, keyIndustries: e.target.value }))}
                placeholder="Enter key industries"
                rows={2}
                maxLength={200}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="area">Area (Hectares) *</Label>
                <Input
                  id="area"
                  type="number"
                  value={formData.area}
                  onChange={(e) => setFormData(prev => ({ ...prev, area: e.target.value }))}
                  placeholder="Enter area in hectares"
                  min="0"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="companies">Companies *</Label>
                <Input
                  id="companies"
                  type="number"
                  value={formData.companies}
                  onChange={(e) => setFormData(prev => ({ ...prev, companies: e.target.value }))}
                  placeholder="Number of companies"
                  min="0"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="viewDetailsLink">View Details Link</Label>
              <Input
                id="viewDetailsLink"
                type="url"
                value={formData.viewDetailsLink}
                onChange={(e) => setFormData(prev => ({ ...prev, viewDetailsLink: e.target.value }))}
                placeholder="Enter details URL"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="mapImage">Map Image *</Label>
              <div className="flex items-center gap-4">
                <Button variant="outline" className="flex items-center gap-2">
                  <Upload className="h-4 w-4" />
                  Upload Map
                </Button>
                <span className="text-sm text-gray-500">JPG, PNG or WebP (max 3MB)</span>
              </div>
            </div>

            <div className="flex justify-end">
              <Button onClick={handleSave} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700">
                <Save className="h-4 w-4" />
                Save Park
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Industrial Parks List</CardTitle>
            <CardDescription>Manage existing industrial parks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {parks.map((item) => (
                <div key={item.id} className="p-4 border rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-medium">{item.name}</h4>
                      <div className="space-y-1 text-sm text-gray-600 mt-2">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          <span>{item.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Building className="h-4 w-4" />
                          <span>{item.area} hectares</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4" />
                          <span>{item.companies} companies</span>
                        </div>
                      </div>
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
                  <p className="text-sm text-gray-600 mt-2">{item.keyIndustries}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
