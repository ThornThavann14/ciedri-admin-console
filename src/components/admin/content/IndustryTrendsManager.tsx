
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Plus, Edit, Trash2, Eye, Calendar, Upload } from "lucide-react";

interface IndustryTrend {
  id: string;
  title: string;
  publishDate: string;
  shortDescription: string;
  fullContent: string;
  coverImage: string;
}

export const IndustryTrendsManager = () => {
  const [trends, setTrends] = useState<IndustryTrend[]>([
    {
      id: "1",
      title: "Digital Transformation in Manufacturing",
      publishDate: "2024-01-15",
      shortDescription: "Exploring how digital technologies are reshaping Cambodia's manufacturing sector",
      fullContent: "The manufacturing sector in Cambodia is undergoing a significant digital transformation...",
      coverImage: ""
    },
    {
      id: "2",
      title: "Sustainable Infrastructure Development",
      publishDate: "2024-01-10",
      shortDescription: "Green infrastructure initiatives driving economic growth",
      fullContent: "Sustainable infrastructure development has become a cornerstone of Cambodia's economic strategy...",
      coverImage: ""
    }
  ]);

  const [editingTrend, setEditingTrend] = useState<IndustryTrend | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSaveTrend = (trendData: Partial<IndustryTrend>) => {
    if (editingTrend) {
      setTrends(prev => prev.map(t => t.id === editingTrend.id ? { ...t, ...trendData } : t));
      toast.success("Industry trend updated successfully!");
    } else {
      const newTrend: IndustryTrend = {
        id: Date.now().toString(),
        title: trendData.title || "",
        publishDate: trendData.publishDate || "",
        shortDescription: trendData.shortDescription || "",
        fullContent: trendData.fullContent || "",
        coverImage: trendData.coverImage || ""
      };
      setTrends(prev => [...prev, newTrend]);
      toast.success("Industry trend created successfully!");
    }
    setIsDialogOpen(false);
    setEditingTrend(null);
  };

  const handleDeleteTrend = (id: string) => {
    setTrends(prev => prev.filter(t => t.id !== id));
    toast.success("Industry trend deleted successfully!");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Industry Trends Management</h2>
          <p className="text-gray-600">Manage industry trends, insights, and market developments</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button 
              className="bg-blue-600 hover:bg-blue-700"
              onClick={() => setEditingTrend(null)}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add New Trend
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingTrend ? "Edit" : "Create"} Industry Trend</DialogTitle>
              <DialogDescription>
                {editingTrend ? "Update the" : "Add a new"} industry trend article
              </DialogDescription>
            </DialogHeader>
            <TrendForm 
              trend={editingTrend} 
              onSave={handleSaveTrend}
              onCancel={() => setIsDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trends.map((trend) => (
          <Card key={trend.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg line-clamp-2">{trend.title}</CardTitle>
                <div className="flex gap-1">
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => {
                      setEditingTrend(trend);
                      setIsDialogOpen(true);
                    }}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => handleDeleteTrend(trend.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <Calendar className="mr-1 h-3 w-3" />
                {new Date(trend.publishDate).toLocaleDateString()}
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                {trend.shortDescription}
              </p>
              <Button variant="outline" size="sm" className="w-full">
                <Eye className="mr-2 h-3 w-3" />
                View Details
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

interface TrendFormProps {
  trend: IndustryTrend | null;
  onSave: (data: Partial<IndustryTrend>) => void;
  onCancel: () => void;
}

const TrendForm = ({ trend, onSave, onCancel }: TrendFormProps) => {
  const [formData, setFormData] = useState({
    title: trend?.title || "",
    publishDate: trend?.publishDate || "",
    shortDescription: trend?.shortDescription || "",
    fullContent: trend?.fullContent || "",
    coverImage: trend?.coverImage || ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Title *</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
          placeholder="Enter trend title (max 100 chars)"
          maxLength={100}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="publishDate">Publish Date *</Label>
        <Input
          id="publishDate"
          type="date"
          value={formData.publishDate}
          onChange={(e) => setFormData(prev => ({ ...prev, publishDate: e.target.value }))}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="shortDescription">Short Description *</Label>
        <Textarea
          id="shortDescription"
          value={formData.shortDescription}
          onChange={(e) => setFormData(prev => ({ ...prev, shortDescription: e.target.value }))}
          placeholder="Enter short description (max 200 chars)"
          maxLength={200}
          rows={3}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="fullContent">Full Content</Label>
        <Textarea
          id="fullContent"
          value={formData.fullContent}
          onChange={(e) => setFormData(prev => ({ ...prev, fullContent: e.target.value }))}
          placeholder="Enter full article content"
          rows={6}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="coverImage">Cover Image</Label>
        <Button variant="outline" type="button" className="w-full">
          <Upload className="mr-2 h-4 w-4" />
          Upload Cover Image
        </Button>
        <p className="text-sm text-gray-500">JPG/PNG, max 2MB</p>
      </div>

      <div className="flex justify-end gap-3">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
          {trend ? "Update" : "Create"} Trend
        </Button>
      </div>
    </form>
  );
};
