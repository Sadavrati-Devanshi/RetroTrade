import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Upload, Save, Trash2 } from 'lucide-react';

const EditUser = () => {
  const [userData, setUserData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'editor',
    status: 'active',
    avatar: '/api/placeholder/150/150'
  });

  const handleChange = (field, value) => {
    setUserData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save user data logic here
    console.log('Saving user data:', userData);
  };

  return (
    <div className="h-full p-6 bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100">
      <div className="flex items-center mb-6">
        <Button variant="ghost" className="mr-2">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-2xl font-semibold text-amber-900">Edit User</h1>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - User Profile */}
        <Card className="lg:col-span-1 bg-white/70 backdrop-blur-sm border-amber-200">
          <CardHeader>
            <CardTitle className="text-amber-900">Profile</CardTitle>
            <CardDescription>Manage user's profile information</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <div className="relative mb-6">
              <Avatar className="w-24 h-24 border-2 border-amber-200">
                <AvatarImage src={userData.avatar} alt={userData.name} />
                <AvatarFallback className="bg-amber-200 text-amber-800">
                  {userData.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <Button size="sm" variant="outline" className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0 bg-white border-amber-200">
                <Upload className="w-4 h-4 text-amber-800" />
              </Button>
            </div>
            
            <div className="w-full space-y-4">
              <div className="p-4 rounded-lg bg-amber-50 border border-amber-200">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-amber-800">Account Status</span>
                  <Switch 
                    checked={userData.status === 'active'} 
                    onCheckedChange={(checked) => handleChange('status', checked ? 'active' : 'inactive')}
                    className="data-[state=checked]:bg-amber-600"
                  />
                </div>
                <p className="text-xs text-amber-700">
                  {userData.status === 'active' 
                    ? 'User has full access to their account' 
                    : 'User access has been suspended'}
                </p>
              </div>
              
              <div className="space-y-2">
                <Label className="text-sm text-amber-800">User ID</Label>
                <Input value="USR-12345" readOnly className="bg-amber-50 border-amber-200 text-amber-800" />
              </div>
              
              <div className="space-y-2">
                <Label className="text-sm text-amber-800">Joined Date</Label>
                <Input value="March 2, 2024" readOnly className="bg-amber-50 border-amber-200 text-amber-800" />
              </div>
              
              <div className="space-y-2">
                <Label className="text-sm text-amber-800">Last Login</Label>
                <Input value="Today at 10:24 AM" readOnly className="bg-amber-50 border-amber-200 text-amber-800" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Right Column - User Details Form */}
        <Card className="lg:col-span-2 bg-white/70 backdrop-blur-sm border-amber-200">
          <CardHeader>
            <CardTitle className="text-amber-900">User Information</CardTitle>
            <CardDescription>Edit user details and permissions</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="general" className="w-full">
              <TabsList className="mb-6 bg-amber-100">
                <TabsTrigger value="general" className="data-[state=active]:bg-amber-200 data-[state=active]:text-amber-900">
                  General
                </TabsTrigger>
                <TabsTrigger value="security" className="data-[state=active]:bg-amber-200 data-[state=active]:text-amber-900">
                  Security
                </TabsTrigger>
                <TabsTrigger value="permissions" className="data-[state=active]:bg-amber-200 data-[state=active]:text-amber-900">
                  Permissions
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="general" className="mt-0">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-amber-800">Full Name</Label>
                      <Input 
                        id="name" 
                        value={userData.name} 
                        onChange={(e) => handleChange('name', e.target.value)}
                        className="border-amber-200 focus:border-amber-400 focus:ring-amber-400"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-amber-800">Email Address</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        value={userData.email} 
                        onChange={(e) => handleChange('email', e.target.value)}
                        className="border-amber-200 focus:border-amber-400 focus:ring-amber-400"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-amber-800">Phone Number</Label>
                      <Input 
                        id="phone" 
                        placeholder="Enter phone number"
                        className="border-amber-200 focus:border-amber-400 focus:ring-amber-400"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="role" className="text-amber-800">User Role</Label>
                      <Select 
                        defaultValue={userData.role}
                        onValueChange={(value) => handleChange('role', value)}
                      >
                        <SelectTrigger className="border-amber-200 focus:ring-amber-400">
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="admin">Administrator</SelectItem>
                          <SelectItem value="editor">Editor</SelectItem>
                          <SelectItem value="viewer">Viewer</SelectItem>
                          <SelectItem value="guest">Guest</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="address" className="text-amber-800">Address</Label>
                    <Input 
                      id="address" 
                      placeholder="Enter address"
                      className="border-amber-200 focus:border-amber-400 focus:ring-amber-400"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="notes" className="text-amber-800">Notes</Label>
                    <textarea 
                      id="notes" 
                      rows={3}
                      placeholder="Additional information about this user"
                      className="w-full p-2 rounded-md border border-amber-200 focus:border-amber-400 focus:ring-amber-400 bg-white/90"
                    />
                  </div>
                </form>
              </TabsContent>
              
              <TabsContent value="security" className="mt-0">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label className="text-amber-800">Reset Password</Label>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" className="border-amber-200 text-amber-800 hover:bg-amber-100">
                        Send Reset Link
                      </Button>
                      <Button variant="outline" className="border-amber-200 text-amber-800 hover:bg-amber-100">
                        Set New Password
                      </Button>
                    </div>
                  </div>
                  
                  <div className="p-4 rounded-lg bg-amber-50 border border-amber-200">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium text-amber-800">Two-Factor Authentication</h4>
                        <p className="text-sm text-amber-700">Add an additional layer of security</p>
                      </div>
                      <Switch className="data-[state=checked]:bg-amber-600" />
                    </div>
                  </div>
                  
                  <div className="p-4 rounded-lg bg-amber-50 border border-amber-200">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium text-amber-800">Account Lockout</h4>
                        <p className="text-sm text-amber-700">Lock account after failed login attempts</p>
                      </div>
                      <Switch defaultChecked className="data-[state=checked]:bg-amber-600" />
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="permissions" className="mt-0">
                <div className="space-y-6">
                  <div className="p-4 rounded-lg bg-amber-50 border border-amber-200">
                    <h4 className="font-medium text-amber-800 mb-4">Access Control</h4>
                    <div className="space-y-3">
                      {["Dashboard", "Users Management", "Content Management", "Settings", "Reports"].map((item) => (
                        <div key={item} className="flex justify-between items-center">
                          <span className="text-sm text-amber-700">{item}</span>
                          <Switch defaultChecked={item !== "Settings"} className="data-[state=checked]:bg-amber-600" />
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="permissions" className="text-amber-800">Permission Groups</Label>
                    <Select defaultValue="standard">
                      <SelectTrigger className="border-amber-200 focus:ring-amber-400">
                        <SelectValue placeholder="Select permissions group" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="restricted">Restricted</SelectItem>
                        <SelectItem value="standard">Standard</SelectItem>
                        <SelectItem value="extended">Extended</SelectItem>
                        <SelectItem value="full">Full Access</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex justify-between border-t border-amber-100 pt-4">
            <Button variant="outline" className="border-red-200 text-red-600 hover:bg-red-50">
              <Trash2 className="w-4 h-4 mr-2" />
              Delete User
            </Button>
            <div className="space-x-2">
              <Button variant="outline" className="border-amber-200 text-amber-800 hover:bg-amber-100">
                Cancel
              </Button>
              <Button onClick={handleSubmit} className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700">
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default EditUser;