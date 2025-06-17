
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Plus, Edit, Trash2, Upload, Star, Eye } from "lucide-react";

interface ServiceCard {
  id: string;
  cardTitle: string;
  cardDescription: string;
  backgroundImage: string;
  icon: string;
  cardType: string;
  linkUrl: string;
  linkText: string;
  displayOrder: number;
  status: boolean;
  featured: boolean;
}

export const ServiceCardsManager = () => {
  const [serviceCards, setServiceCards] = useState<ServiceCard[]>([
    {
      id: "1",
      cardTitle: "Industry Research",
      cardDescription: "Comprehensive market analysis and research services for industrial development",
      backgroundImage: "",
      icon: "",
      cardType: "Research",
      linkUrl: "/services/research",
      linkText: "Learn More",
      displayOrder: 1,
      status: true,
      featured: true
    },
    {
      id: "2",
      cardTitle: "Strategic Planning",
      cardDescription: "Long-term strategic planning for industrial zones and economic development",
      backgroundImage: "",
      icon: "",
      cardType: "Planning",
      linkUrl: "/services/planning",
      linkText: "Learn More",
      displayOrder: 2,
      status: true,
      featured: false
    },
    {
      id: "3",
      cardTitle: "Policy Consulting",
      cardDescription: "Expert policy advice and consulting for government and private sector",
      backgroundImage: "",
      icon: "",
      cardType: "Consulting",
      linkUrl: "/services/consulting",
      linkText: "Learn More",
      displayOrder: 3,
      status: true,
      featured: false
    }
  ]);

  const [editingCard, setEditingCard] = useState<ServiceCard | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSaveCard = (cardData: Partial<ServiceCard>) => {
    if (editingCard) {
      setServiceCards(prev => prev.map(c => c.id === editingCard.id ? { ...c, ...cardData } : c));
      toast.success("Service card updated successfully!");
    } else {
      const newCard: ServiceCard = {
        id: Date.now().toString(),
        cardTitle: cardData.cardTitle || "",
        cardDescription: cardData.cardDescription || "",
        backgroundImage: cardData.backgroundImage || "",
        icon: cardData.icon || "",
        cardType: cardData.cardType || "Research",
        linkUrl: cardData.linkUrl || "",
        linkText: cardData.linkText || "Learn More",
        displayOrder: cardData.displayOrder || serviceCards.length + 1,
        status: cardData.status ?? true,
        featured: cardData.featured ?? false
      };
      setServiceCards(prev => [...prev, newCard]);
      toast.success("Service card created successfully!");
    }
    setIsDialogOpen(false);
    setEditingCard(null);
  };

  const handleDeleteCard = (id: string) => {
    setServiceCards(prev => prev.filter(c => c.id !== id));
    toast.success("Service card deleted successfully!");
  };

  const handleToggleStatus = (id: string) => {
    setServiceCards(prev => prev.map(c => 
      c.id === id ? { ...c, status: !c.status } : c
    ));
    toast.success("Service card status updated!");
  };

  const cardTypes = ["Research", "Planning", "Consulting", "Analysis"];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Industry Services Management</h2>
          <p className="text-gray-600">Manage service cards and offerings for your organization</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button 
              className="bg-blue-600 hover:bg-blue-700"
              onClick={() => setEditingCard(null)}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Service Card
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingCard ? "Edit" : "Create"} Service Card</DialogTitle>
              <DialogDescription>
                {editingCard ? "Update the" : "Add a new"} service card for your website
              </DialogDescription>
            </DialogHeader>
            <ServiceCardForm 
              card={editingCard} 
              onSave={handleSaveCard}
              onCancel={() => setIsDialogOpen(false)}
              cardTypes={cardTypes}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {serviceCards
          .sort((a, b) => a.displayOrder - b.displayOrder)
          .map((card) => (
            <Card key={card.id} className={`hover:shadow-lg transition-shadow ${!card.status ? 'opacity-60' : ''}`}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-lg">{card.cardTitle}</CardTitle>
                    {card.featured && <Star className="h-4 w-4 text-yellow-500 fill-current" />}
                  </div>
                  <div className="flex gap-1">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => {
                        setEditingCard(card);
                        setIsDialogOpen(true);
                      }}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleDeleteCard(card.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm bg-blue-100 text-blue-700 px-2 py-1 rounded">
                    {card.cardType}
                  </span>
                  <Switch
                    checked={card.status}
                    onCheckedChange={() => handleToggleStatus(card.id)}
                  />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                  {card.cardDescription}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">Order: {card.displayOrder}</span>
                  <Button variant="outline" size="sm">
                    <Eye className="mr-2 h-3 w-3" />
                    Preview
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
      </div>
    </div>
  );
};

interface ServiceCardFormProps {
  card: ServiceCard | null;
  onSave: (data: Partial<ServiceCard>) => void;
  onCancel: () => void;
  cardTypes: string[];
}

const ServiceCardForm = ({ card, onSave, onCancel, cardTypes }: ServiceCardFormProps) => {
  const [formData, setFormData] = useState({
    cardTitle: card?.cardTitle || "",
    cardDescription: card?.cardDescription || "",
    backgroundImage: card?.backgroundImage || "",
    icon: card?.icon || "",
    cardType: card?.cardType || "Research",
    linkUrl: card?.linkUrl || "",
    linkText: card?.linkText || "Learn More",
    displayOrder: card?.displayOrder || 1,
    status: card?.status ?? true,
    featured: card?.featured ?? false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="cardTitle">Card Title *</Label>
          <Input
            id="cardTitle"
            value={formData.cardTitle}
            onChange={(e) => setFormData(prev => ({ ...prev, cardTitle: e.target.value }))}
            placeholder="Enter card title (max 80 chars)"
            maxLength={80}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="cardType">Card Type *</Label>
          <Select 
            value={formData.cardType} 
            onValueChange={(value) => setFormData(prev => ({ ...prev, cardType: value }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select card type" />
            </SelectTrigger>
            <SelectContent>
              {cardTypes.map(type => (
                <SelectItem key={type} value={type}>{type}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="cardDescription">Card Description *</Label>
        <Textarea
          id="cardDescription"
          value={formData.cardDescription}
          onChange={(e) => setFormData(prev => ({ ...prev, cardDescription: e.target.value }))}
          placeholder="Enter card description (max 200 chars)"
          maxLength={200}
          rows={3}
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="linkUrl">Link URL</Label>
          <Input
            id="linkUrl"
            value={formData.linkUrl}
            onChange={(e) => setFormData(prev => ({ ...prev, linkUrl: e.target.value }))}
            placeholder="Enter link URL"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="linkText">Link Text</Label>
          <Input
            id="linkText"
            value={formData.linkText}
            onChange={(e) => setFormData(prev => ({ ...prev, linkText: e.target.value }))}
            placeholder="Enter link text (max 20 chars)"
            maxLength={20}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="displayOrder">Display Order *</Label>
        <Input
          id="displayOrder"
          type="number"
          value={formData.displayOrder}
          onChange={(e) => setFormData(prev => ({ ...prev, displayOrder: parseInt(e.target.value) || 1 }))}
          min="1"
          required
        />
      </div>

      <div className="space-y-4">
        <Button variant="outline" type="button" className="w-full">
          <Upload className="mr-2 h-4 w-4" />
          Upload Background Image
        </Button>
        
        <Button variant="outline" type="button" className="w-full">
          <Upload className="mr-2 h-4 w-4" />
          Upload Icon
        </Button>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Switch
            id="status"
            checked={formData.status}
            onCheckedChange={(checked) => setFormData(prev => ({ ...prev, status: checked }))}
          />
          <Label htmlFor="status">Active</Label>
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="featured"
            checked={formData.featured}
            onCheckedChange={(checked) => setFormData(prev => ({ ...prev, featured: checked }))}
          />
          <Label htmlFor="featured">Featured</Label>
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
          {card ? "Update" : "Create"} Card
        </Button>
      </div>
    </form>
  );
};
