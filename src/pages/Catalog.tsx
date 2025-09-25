import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Star, Plus, ShoppingCart, Leaf, Award, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

// Dummy product data
const dummyProducts = [
  {
    id: "1",
    name: "Organic Ashwagandha Powder",
    description: "Premium quality Ashwagandha root powder for stress relief and vitality",
    price: 24.99,
    originalPrice: 29.99,
    image: "/placeholder.svg",
    rating: 4.8,
    reviews: 234,
    origin: "Kerala, India",
    category: "Powder",
    sustainability: "Fair Trade",
    organic: true,
    inStock: true
  },
  {
    id: "2", 
    name: "Holy Tulsi Extract Capsules",
    description: "Sacred Tulsi extract in convenient capsule form for daily wellness",
    price: 18.99,
    originalPrice: 22.99,
    image: "/placeholder.svg",
    rating: 4.7,
    reviews: 187,
    origin: "Uttarakhand, India",
    category: "Capsules",
    sustainability: "Organic Certified",
    organic: true,
    inStock: true
  },
  {
    id: "3",
    name: "Triphala Powder - Traditional Blend", 
    description: "Ancient Ayurvedic formulation of three fruits for digestive health",
    price: 16.99,
    originalPrice: 19.99,
    image: "/placeholder.svg",
    rating: 4.9,
    reviews: 312,
    origin: "Rajasthan, India",
    category: "Powder",
    sustainability: "Fair Trade",
    organic: true,
    inStock: true
  },
  {
    id: "4",
    name: "Turmeric Curcumin Extract",
    description: "High potency turmeric extract with 95% curcuminoids",
    price: 32.99,
    originalPrice: 39.99,
    image: "/placeholder.svg",
    rating: 4.6,
    reviews: 156,
    origin: "Tamil Nadu, India",
    category: "Extract",
    sustainability: "Organic Certified",
    organic: true,
    inStock: true
  },
  {
    id: "5",
    name: "Brahmi Memory Support Tablets",
    description: "Enhance cognitive function and memory with pure Brahmi extract",
    price: 21.99,
    originalPrice: 25.99,
    image: "/placeholder.svg",
    rating: 4.5,
    reviews: 98,
    origin: "West Bengal, India",
    category: "Tablets",
    sustainability: "Fair Trade",
    organic: true,
    inStock: false
  },
  {
    id: "6",
    name: "Neem Leaf Powder",
    description: "Natural neem leaves ground to fine powder for skin and health",
    price: 12.99,
    originalPrice: 15.99,
    image: "/placeholder.svg",
    rating: 4.4,
    reviews: 67,
    origin: "Karnataka, India",
    category: "Powder",
    sustainability: "Organic Certified",
    organic: true,
    inStock: true
  }
];

const Catalog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { toast } = useToast();

  const categories = ["All", "Powder", "Capsules", "Extract", "Tablets"];

  const filteredProducts = dummyProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const addToCart = (product: any) => {
    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Authentic Ayurvedic Products
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our collection of premium, blockchain-verified Ayurvedic herbs and supplements
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="transition-all duration-200"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="group hover:shadow-elegant transition-all duration-300 border-none shadow-soft">
              <CardHeader className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3 flex gap-2">
                    {product.organic && (
                      <Badge className="bg-sage text-foreground">
                        <Leaf className="w-3 h-3 mr-1" />
                        Organic
                      </Badge>
                    )}
                    {!product.inStock && (
                      <Badge variant="destructive">Out of Stock</Badge>
                    )}
                  </div>
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-gold text-foreground">
                      <Award className="w-3 h-3 mr-1" />
                      {product.sustainability}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="p-4">
                <div className="mb-2">
                  <Badge variant="outline" className="text-xs">{product.category}</Badge>
                </div>
                
                <CardTitle className="text-lg mb-2 line-clamp-2">{product.name}</CardTitle>
                
                <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                  {product.description}
                </p>

                <div className="flex items-center gap-2 mb-3 text-sm">
                  <MapPin className="w-4 h-4 text-sage" />
                  <span className="text-muted-foreground">{product.origin}</span>
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 fill-gold text-gold" />
                    <span className="text-sm font-medium ml-1">{product.rating}</span>
                  </div>
                  <span className="text-muted-foreground text-sm">({product.reviews} reviews)</span>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-foreground">${product.price}</span>
                    <span className="text-sm text-muted-foreground line-through">${product.originalPrice}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    asChild
                  >
                    <Link to={`/product/${product.id}`}>
                      View Details
                    </Link>
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => addToCart(product)}
                    disabled={!product.inStock}
                    className="flex-1"
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    {product.inStock ? "Add to Cart" : "Out of Stock"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No products found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Catalog;