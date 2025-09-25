import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  ArrowLeft,
  MapPin, 
  Calendar, 
  Shield, 
  Leaf, 
  Award,
  Beaker,
  Truck,
  Users,
  BarChart3,
  CheckCircle,
  ShoppingCart,
  Plus,
  Minus,
  Star
} from "lucide-react";

const ProductDetails = () => {
  const { productId } = useParams();
  const [quantity, setQuantity] = useState(1);
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("journey");

  // Mock product data - would come from blockchain API
  const product = {
    id: productId,
    name: "Organic Turmeric Root",
    batchId: "TUR-2024-001234",
    verified: true,
    sustainabilityScore: 95,
    price: 28.99,
    originalPrice: 34.99,
    rating: 4.9,
    reviews: 156,
    inStock: true,
    stockCount: 25,
    category: "Root Powder",
    weight: "200g",
    farmer: {
      name: "Rajesh Kumar",
      farm: "Green Valley Farms",
      location: "Wayanad, Kerala, India",
      experience: "25 years",
      contact: "+91-9876543210"
    },
    harvest: {
      date: "2024-02-15",
      method: "Hand-picked",
      weather: "Optimal conditions",
      soilHealth: 92
    },
    certifications: ["Organic", "Fair Trade", "FHIR Compliant", "Non-GMO"],
    labResults: {
      moisture: "8.2%",
      curcumin: "4.8%",
      pesticides: "None detected",
      heavyMetals: "Below limits",
      microbiology: "Safe"
    },
    supplyChain: [
      {
        stage: "Harvest",
        date: "2024-02-15",
        location: "Green Valley Farms, Kerala",
        actor: "Rajesh Kumar",
        verified: true
      },
      {
        stage: "Processing",
        date: "2024-02-16",
        location: "Kerala Processing Unit",
        actor: "Spice Co-operative",
        verified: true
      },
      {
        stage: "Quality Testing",
        date: "2024-02-18",
        location: "Certified Lab, Kochi",
        actor: "Quality Labs India",
        verified: true
      },
      {
        stage: "Packaging",
        date: "2024-02-20",
        location: "Packaging Center, Kerala",
        actor: "Eco Pack Solutions",
        verified: true
      },
      {
        stage: "Distribution",
        date: "2024-02-22",
        location: "Regional Hub, Mumbai",
        actor: "Green Logistics",
        verified: true
      }
    ]
  };

  const addToCart = () => {
    toast({
      title: "Added to Cart",
      description: `${quantity} x ${product.name} added to your cart.`,
    });
  };

  const buyNow = () => {
    toast({
      title: "Redirecting to Checkout", 
      description: "Taking you to secure checkout...",
    });
  };

  const tabs = [
    { id: "journey", label: "Supply Chain Journey", icon: Truck },
    { id: "farmer", label: "Farmer Details", icon: Users },
    { id: "lab", label: "Lab Results", icon: Beaker },
    { id: "sustainability", label: "Sustainability", icon: Leaf }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <Button asChild variant="ghost" className="mb-4">
          <Link to="/dashboard">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Link>
        </Button>

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              {product.name}
            </h1>
            <p className="text-lg text-muted-foreground">
              Batch ID: {product.batchId}
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <Badge variant={product.verified ? "default" : "destructive"} className="text-sm">
              {product.verified ? "✓ Verified Authentic" : "⚠ Unverified"}
            </Badge>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">Sustainability:</span>
              <Progress value={product.sustainabilityScore} className="w-20 h-2" />
              <span className="text-sm font-medium">{product.sustainabilityScore}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Product Purchase Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div>
          <img
            src="/placeholder.svg"
            alt={product.name}
            className="w-full h-96 object-cover rounded-lg shadow-soft"
          />
        </div>
        
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center">
                <Star className="w-5 h-5 fill-gold text-gold" />
                <span className="ml-1 font-medium">{product.rating}</span>
              </div>
              <span className="text-muted-foreground">({product.reviews} reviews)</span>
              <Badge variant="outline" className="bg-sage/10 text-sage border-sage/20">
                <Leaf className="w-3 h-3 mr-1" />
                Organic Certified
              </Badge>
            </div>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl font-bold text-foreground">${product.price}</span>
              <span className="text-lg text-muted-foreground line-through">${product.originalPrice}</span>
              <Badge className="bg-sage text-foreground">Save ${(product.originalPrice - product.price).toFixed(2)}</Badge>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-muted-foreground" />
              <span className="text-muted-foreground">Origin: {product.farmer.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-sage" />
              <span className="text-muted-foreground">
                {product.inStock ? `In Stock (${product.stockCount} available)` : "Out of Stock"}
              </span>
            </div>
          </div>

          {/* Quantity and Purchase */}
          <div className="space-y-4 p-4 bg-muted/30 rounded-lg">
            <div className="flex items-center gap-4">
              <span className="font-medium">Quantity:</span>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="min-w-[3rem] text-center font-medium">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.min(product.stockCount, quantity + 1))}
                  disabled={quantity >= product.stockCount}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button 
                className="flex-1" 
                size="lg"
                onClick={addToCart}
                disabled={!product.inStock}
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Add to Cart - ${(product.price * quantity).toFixed(2)}
              </Button>
              <Button 
                variant="outline" 
                className="flex-1" 
                size="lg"
                onClick={buyNow}
                disabled={!product.inStock}
              >
                Buy Now
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-2 mb-8 p-1 bg-muted rounded-lg">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? "bg-primary text-primary-foreground shadow-soft"
                  : "text-muted-foreground hover:text-foreground hover:bg-background"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="animate-fade-in">
        {activeTab === "journey" && (
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Truck className="w-5 h-5 text-primary" />
                <span>Blockchain Supply Chain Journey</span>
              </CardTitle>
              <CardDescription>
                Complete traceability from farm to package
              </CardDescription>
            </CardHeader>

            <CardContent>
              <div className="space-y-6">
                {product.supplyChain.map((stage, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="flex flex-col items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        stage.verified ? "bg-green-500" : "bg-red-500"
                      }`}>
                        {stage.verified ? (
                          <CheckCircle className="w-4 h-4 text-white" />
                        ) : (
                          <span className="text-white text-xs">!</span>
                        )}
                      </div>
                      {index < product.supplyChain.length - 1 && (
                        <div className="w-0.5 h-12 bg-border mt-2" />
                      )}
                    </div>

                    <div className="flex-1 pb-8">
                      <div className="bg-card p-4 rounded-lg border border-border shadow-soft">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                          <h4 className="font-semibold text-lg text-foreground">{stage.stage}</h4>
                          <Badge variant={stage.verified ? "default" : "destructive"}>
                            {stage.verified ? "Verified" : "Pending"}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                          <div className="flex items-center space-x-2">
                            <Calendar className="w-4 h-4 text-muted-foreground" />
                            <span className="text-muted-foreground">{stage.date}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <MapPin className="w-4 h-4 text-muted-foreground" />
                            <span className="text-muted-foreground">{stage.location}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Users className="w-4 h-4 text-muted-foreground" />
                            <span className="text-muted-foreground">{stage.actor}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === "farmer" && (
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-primary" />
                <span>Farmer Profile</span>
              </CardTitle>
              <CardDescription>
                Meet the farmer who grew your herbs
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Farmer Details</h4>
                    <div className="space-y-2 text-sm">
                      <p><span className="text-muted-foreground">Name:</span> {product.farmer.name}</p>
                      <p><span className="text-muted-foreground">Farm:</span> {product.farmer.farm}</p>
                      <p><span className="text-muted-foreground">Experience:</span> {product.farmer.experience}</p>
                      <p><span className="text-muted-foreground">Contact:</span> {product.farmer.contact}</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Farm Location</h4>
                    <p className="text-muted-foreground flex items-center space-x-2">
                      <MapPin className="w-4 h-4" />
                      <span>{product.farmer.location}</span>
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Harvest Details</h4>
                    <div className="space-y-2 text-sm">
                      <p><span className="text-muted-foreground">Date:</span> {product.harvest.date}</p>
                      <p><span className="text-muted-foreground">Method:</span> {product.harvest.method}</p>
                      <p><span className="text-muted-foreground">Weather:</span> {product.harvest.weather}</p>
                      <div className="flex items-center space-x-2">
                        <span className="text-muted-foreground">Soil Health:</span>
                        <Progress value={product.harvest.soilHealth} className="w-16 h-2" />
                        <span>{product.harvest.soilHealth}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-foreground mb-3">Certifications</h4>
                <div className="flex flex-wrap gap-2">
                  {product.certifications.map((cert, index) => (
                    <Badge key={index} variant="outline" className="bg-gold/10 border-gold/20 text-foreground">
                      <Award className="w-3 h-3 mr-1" />
                      {cert}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === "lab" && (
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Beaker className="w-5 h-5 text-primary" />
                <span>Laboratory Test Results</span>
              </CardTitle>
              <CardDescription>
                Comprehensive quality and safety analysis
              </CardDescription>
            </CardHeader>

            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.entries(product.labResults).map(([test, result]) => (
                  <div key={test} className="p-4 bg-muted/30 rounded-lg border border-border">
                    <h4 className="font-semibold text-foreground capitalize mb-2">
                      {test.replace(/([A-Z])/g, ' $1')}
                    </h4>
                    <p className="text-lg font-medium text-primary">{result}</p>
                    <div className="flex items-center space-x-1 mt-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-green-600">Passed</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-green-600" />
                  <span className="font-semibold text-green-800">All Tests Passed</span>
                </div>
                <p className="text-green-700 text-sm mt-1">
                  This product meets all quality and safety standards for Ayurvedic herbs.
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === "sustainability" && (
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Leaf className="w-5 h-5 text-primary" />
                <span>Sustainability Impact</span>
              </CardTitle>
              <CardDescription>
                Environmental and social impact metrics
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-foreground">Environmental Impact</h4>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Water Usage</span>
                      <span className="font-medium text-green-600">-40% vs conventional</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Carbon Footprint</span>
                      <span className="font-medium text-green-600">-65% reduction</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Soil Health</span>
                      <div className="flex items-center space-x-2">
                        <Progress value={92} className="w-16 h-2" />
                        <span className="font-medium">92%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Biodiversity Index</span>
                      <div className="flex items-center space-x-2">
                        <Progress value={88} className="w-16 h-2" />
                        <span className="font-medium">88%</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-foreground">Social Impact</h4>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Fair Trade Certified</span>
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Farmers Supported</span>
                      <span className="font-medium">25 families</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Community Investment</span>
                      <span className="font-medium">₹2,50,000</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Women Empowerment</span>
                      <span className="font-medium">60% participation</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <BarChart3 className="w-5 h-5 text-primary" />
                  <span className="font-semibold text-primary">Overall Sustainability Score</span>
                </div>
                <div className="flex items-center space-x-4">
                  <Progress value={product.sustainabilityScore} className="flex-1 h-3" />
                  <span className="text-2xl font-bold text-primary">{product.sustainabilityScore}%</span>
                </div>
                <p className="text-primary/80 text-sm mt-2">
                  Excellent sustainability performance across all metrics
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;