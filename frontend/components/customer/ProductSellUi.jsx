import React from 'react';
import { Card, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Textarea } from '../../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Label } from '../../components/ui/label';
import { Camera, DollarSign, MapPin, Tag, Calendar, ChevronDown } from 'lucide-react';

// The UI component accepts props from the controller
const ProductSellUi = ({ 
  formData, 
  previewImages, 
  handleChange, 
  handleImageUpload, 
  handleSelectChange,
  handleRadioChange,
  handleCheckboxChange,
  handleRemoveImage,
  handleSubmit 
}) => {
  return (
    <div className="w-full max-w-6xl mx-auto bg-white p-4" >
      <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-amber-700 to-amber-500 bg-clip-text text-transparent">
        {formData.id ? 'Update Your Item' : 'List Your Item for Sale'}
      </h1>
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Images */}
          <Card className="col-span-1 bg-white/80 backdrop-blur-md border border-amber-100 shadow-lg rounded-xl overflow-hidden transform transition-all hover:translate-y-[-5px] hover:shadow-xl">
            <CardContent className="p-6 pt-4">
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-amber-800">Item Images</h2>
                
                <div className="grid grid-cols-2 gap-2">
                  {previewImages.map((image, index) => (
                    <div key={index} className="relative aspect-square rounded-lg overflow-hidden bg-amber-50">
                      <img src={image} alt={`Preview ${index + 1}`} className="object-cover w-full h-full" />
                      <button
                        type="button"
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 w-6 h-6 flex items-center justify-center"
                        onClick={() => handleRemoveImage(index)}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                  
                  {/* Upload button */}
                  <label 
                    className="flex flex-col items-center justify-center aspect-square bg-gradient-to-br from-amber-50 to-amber-100 border-2 border-dashed border-amber-200 rounded-lg cursor-pointer hover:bg-amber-100 transition-colors"
                  >
                    <div className="flex flex-col items-center justify-center p-4">
                      <Camera className="w-10 h-10 text-amber-500 mb-2" />
                      <span className="text-amber-700 text-sm font-medium">Add Image</span>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      multiple
                      onChange={handleImageUpload}
                    />
                  </label>
                </div>
                
                <div className="text-sm text-amber-700 mt-2">
                  <p>• Add up to 8 images</p>
                  <p>• First image will be the main display</p>
                  <p>• High-quality images increase chance of sale</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Right Column - Item Details */}
          <Card className="col-span-1 lg:col-span-2 bg-white/80 backdrop-blur-md border border-amber-100 shadow-lg rounded-xl overflow-hidden">
            <CardContent className="p-6 pt-2">
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold text-amber-800 mb-4">Item Details</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="title" className="text-amber-700 font-medium">Title</Label>
                      <div className="relative">
                        <Tag className="absolute p-0.5 left-3 top-3 text-amber-500 w-5 h-5" />
                        <Input 
                          id="title"
                          name="title"
                          placeholder="e.g., Vintage Comfy Bed"
                          value={formData.title}
                          onChange={handleChange}
                          className="pl-10 mt-1 border-amber-200 focus:border-amber-500 focus:ring-amber-500 bg-amber-50/50 rounded-lg"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="description" className="text-amber-700 font-medium">Description</Label>
                      <Textarea 
                        id="description"
                        name="description"
                        placeholder="Describe your item, including details about its history, condition, and any unique features."
                        value={formData.description}
                        onChange={handleChange}
                        rows={4}
                        className="border-amber-200 mt-1  focus:border-amber-500 focus:ring-amber-500 bg-amber-50/50 rounded-lg"
                      />
                    </div>
                    
                   <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
  <div>
    <Label htmlFor="originalPrice" className="text-amber-700 font-medium">Original Price ($)</Label>
    <div className="relative mt-1 p-0.5">
      <DollarSign className="absolute left-3 top-3 text-amber-500 w-5 h-5" />
      <Input 
        id="originalPrice"
        name="originalPrice"
        type="number"
        placeholder="100"
        value={formData.originalPrice}
        onChange={handleChange}
        className="pl-10 border-amber-200 focus:border-amber-500 focus:ring-amber-500 bg-amber-50/50 rounded-lg"
      />
    </div>
  </div>
  
  <div>
    <Label htmlFor="price" className="text-amber-700 font-medium">Price ($)</Label>
    <div className="relative mt-1 p-0.5">
      <DollarSign className="absolute left-3 top-3 text-amber-500 w-5 h-5" />
      <Input 
        id="price"
        name="price"
        type="number"
        placeholder="65"
        value={formData.price}
        onChange={handleChange}
        className="pl-10 border-amber-200 focus:border-amber-500 focus:ring-amber-500 bg-amber-50/50 rounded-lg"
      />
    </div>
  </div>
  <div>
  <Label htmlFor="location" className="text-amber-700 font-medium">Location</Label>
  <div className="relative mt-1 p-0.5">
    <MapPin className="absolute left-3 top-3 text-amber-500 w-5 h-5" />
    <Input 
      id="location"
      name="location"
      type="text"
      value={formData.location}
      onChange={handleChange}
      className="pl-10 border-amber-200 focus:border-amber-500 focus:ring-amber-500 bg-amber-50/50 rounded-lg"
    />
  </div>
</div>
  {/* <div>
  <Label htmlFor="condition" className="text-amber-700 font-medium">Condition</Label>

    <Select
      id="condition"
      name="condition"
      value={formData.condition}
      onValueChange={(value) => handleSelectChange('condition', value)}
            className="w-full pl-3 py-2 border-amber-200 focus:border-amber-500 focus:ring-amber-500 bg-amber-50/50 rounded-lg appearance-none"
    >
      <SelectTrigger className="border-amber-200 focus:border-amber-500 focus:ring-amber-500 mt-1.5 p-3 bg-amber-50/50 rounded-lg">
        <SelectValue placeholder="Select a category" />
      </SelectTrigger>
      <SelectContent>
      
        <SelectItem value="Excellent">Excellent</SelectItem>
        <SelectItem value="Good">Good</SelectItem>
        <SelectItem value="Fair">Fair</SelectItem>
      </SelectContent>
        </Select>
</div> */}
<div>
  <Label htmlFor="condition" className="text-amber-700 font-semibold text-base">
    Condition
  </Label>

  <Select
    id="condition"
    name="condition"
    value={formData.condition}
    onValueChange={(value) => handleSelectChange('condition', value)}
    className="w-full"
  >
    <SelectTrigger className="border border-amber-300 focus:border-amber-500 focus:ring-amber-500 mt-2 p-3 bg-amber-50/50 rounded-xl transition-all duration-300 ease-in-out text-amber-700 hover:border-amber-600 focus:outline-none shadow-sm">
      <SelectValue placeholder="Select a condition" />
    </SelectTrigger>

    <SelectContent className="bg-white border border-amber-200 rounded-xl shadow-lg">
      <SelectItem 
        value="Excellent"
        className="hover:bg-amber-100/80 text-amber-700 cursor-pointer px-4 py-2 transition-colors duration-200"
      >
        Excellent
      </SelectItem>
      <SelectItem 
        value="Good"
        className="hover:bg-amber-100/80 text-amber-700 cursor-pointer px-4 py-2 transition-colors duration-200"
      >
        Good
      </SelectItem>
      <SelectItem 
        value="Fair"
        className="hover:bg-amber-100/80 text-amber-700 cursor-pointer px-4 py-2 transition-colors duration-200"
      >
        Fair
      </SelectItem>
    </SelectContent>
  </Select>
</div>

  {/* <div>
    <Label htmlFor="category" className="text-amber-700 font-medium">Category</Label>
    <Select 
    id="category"
      name="category"
      value={formData.category}
      onValueChange={(value) => handleSelectChange('category', value)}
    >
      <SelectTrigger className="border-amber-200 focus:border-amber-500 focus:ring-amber-500 mt-1.5 p-3 bg-amber-50/50 rounded-lg">
        <SelectValue placeholder="Select a category" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="furniture">Furniture</SelectItem>
        <SelectItem value="electronics">Electronics</SelectItem>
        <SelectItem value="clothing">Clothing</SelectItem>
        <SelectItem value="books">Books</SelectItem>
        <SelectItem value="accessories">Accessories</SelectItem>
      </SelectContent>
    </Select>
  </div> */}
  <div>
  <Label htmlFor="category" className="text-amber-700 font-semibold text-base">
    Category
  </Label>

  <Select 
    id="category"
    name="category"
    value={formData.category}
    onValueChange={(value) => handleSelectChange('category', value)}
  >
    <SelectTrigger className="border border-amber-300 focus:border-amber-500 focus:ring-amber-500 mt-2 p-3 bg-amber-50/50 rounded-xl transition-all duration-300 ease-in-out text-amber-700 hover:border-amber-600 focus:outline-none shadow-sm">
      <SelectValue placeholder="Select a category" />
    </SelectTrigger>

    <SelectContent className="bg-white border border-amber-200 rounded-xl shadow-lg">
      <SelectItem 
        value="furniture"
        className="hover:bg-amber-100/80 text-amber-700 cursor-pointer px-4 py-2 transition-colors duration-200"
      >
        Furniture
      </SelectItem>
      <SelectItem 
        value="electronics"
        className="hover:bg-amber-100/80 text-amber-700 cursor-pointer px-4 py-2 transition-colors duration-200"
      >
        Electronics
      </SelectItem>
      <SelectItem 
        value="clothing"
        className="hover:bg-amber-100/80 text-amber-700 cursor-pointer px-4 py-2 transition-colors duration-200"
      >
        Clothing
      </SelectItem>
      <SelectItem 
        value="books"
        className="hover:bg-amber-100/80 text-amber-700 cursor-pointer px-4 py-2 transition-colors duration-200"
      >
        Books
      </SelectItem>
      <SelectItem 
        value="accessories"
        className="hover:bg-amber-100/80 text-amber-700 cursor-pointer px-4 py-2 transition-colors duration-200"
      >
        Accessories
      </SelectItem>
      <SelectItem 
        value="mixed"
        className="hover:bg-amber-100/80 text-amber-700 cursor-pointer px-4 py-2 transition-colors duration-200"
      >
        Mixed
      </SelectItem>
    </SelectContent>
  </Select>
</div>

</div>


                    <div className="space-y-4">
                      {/* <div>
                        <Label htmlFor="availabilityDate" className="text-amber-700 font-medium">Available From</Label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-3 text-amber-500 w-5 h-5" />
                          <Input 
                            id="availabilityDate"
                            name="availabilityDate"
                            type="name"
                            value={formData.availabilityDate}
                            onChange={handleChange}
                            className="pl-10 border-amber-200 focus:border-amber-500 focus:ring-amber-500 bg-amber-50/50 rounded-lg"
                          />
                        </div>
                      </div> */}
                      
                      <div>
  <Label htmlFor="deliveryOptions" className="text-amber-700 font-medium">Delivery Options</Label>
  <div className="grid grid-cols-2 gap-2 mt-2">
    <div className="flex items-center space-x-2 bg-amber-50 p-3 rounded-lg border border-amber-100">
      <input
        type="radio"
        id="localPickup"
        name="deliveryOptions"
        value="localPickup"
        checked={formData.deliveryOptions === 'localPickup'}
        onChange={(e) => handleRadioChange('deliveryOptions', 'localPickup')}
        className="accent-amber-500 h-4 w-4"
      />
      <Label htmlFor="localPickup" className="text-amber-700">Local Pickup</Label>
    </div>
    
    <div className="flex items-center space-x-2 bg-amber-50 p-3 rounded-lg border border-amber-100">
      <input
        type="radio"
        id="shipping"
        name="deliveryOptions"
        value="shipping"
        checked={formData.deliveryOptions === 'shipping'}
        onChange={(e) => handleRadioChange('deliveryOptions', 'shipping')}
        className="accent-amber-500 h-4 w-4"
      />
      <Label htmlFor="shipping" className="text-amber-700">Shipping</Label>
    </div>
  </div>
</div>
                      
                      {/* <div className="flex items-center space-x-2 mt-2">
                        <input
                          type="checkbox"
                          id="allowNegotiation"
                          name="allowNegotiation"
                          checked={formData.allowNegotiation}
                          onChange={(e) => handleCheckboxChange('allowNegotiation', null, e.target.checked)}
                          className="accent-amber-500 h-4 w-4"
                        />
                        <Label htmlFor="allowNegotiation" className="text-amber-700">Allow price negotiation</Label>
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end mt-8 space-x-4">
                {/* <Button 
                  type="button" 
                  variant="outline"
                  className="border-amber-300 text-amber-700 hover:bg-amber-50"
                >
                  Save as Draft
                </Button> */}
                <Button 
                  type="submit"
                  className="bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-700 hover:to-amber-600 text-white"
                >
                  List Item Now
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </form>
    </div>
  );
};

export default ProductSellUi;