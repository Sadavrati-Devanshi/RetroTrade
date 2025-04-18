import React from "react";
import { Card } from "@/components/ui/card";
import { Package, DollarSign, ShoppingBag, Tag } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";

const ProductStatsCharts = ({ totalProducts, totalValue, categoryBreakdown, conditionBreakdown }) => {
  // Format for currency
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  };

  // Transform category data for chart
  const categoryData = Object.entries(categoryBreakdown).map(([name, value], index) => ({
    name: name.charAt(0).toUpperCase() + name.slice(1),
    value,
    color: getColorForIndex(index)
  }));

  // Transform condition data for chart
  const conditionData = Object.entries(conditionBreakdown).map(([name, value], index) => ({
    name,
    value,
    color: getColorForCondition(name)
  }));

  // Get color for category index
  function getColorForIndex(index) {
    const colors = ['#f59e0b', '#3b82f6', '#10b981', '#8b5cf6', '#ec4899', '#6366f1', '#14b8a6', '#f97316'];
    return colors[index % colors.length];
  }

  // Get color based on condition
  function getColorForCondition(condition) {
    switch (condition) {
      case 'Excellent':
        return '#10b981'; // Green
      case 'Good':
        return '#3b82f6'; // Blue
      case 'Fair':
        return '#f59e0b'; // Amber
      case 'Poor':
        return '#ef4444'; // Red
      default:
        return '#6b7280'; // Gray
    }
  }

  // Card with stats
  const StatCard = ({ icon: Icon, title, value, color }) => (
    <Card className="flex items-center p-4 bg-white border-amber-200">
      <div className={`p-3 rounded-lg mr-3 bg-opacity-20 ${color}`}>
        <Icon className={`h-6 w-6 ${color.replace('bg-', 'text-')}`} />
      </div>
      <div>
        <p className="text-sm font-medium text-amber-500">{title}</p>
        <h3 className="text-2xl font-bold text-amber-900">{value}</h3>
      </div>
    </Card>
  );

  return (
    <div className="mb-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard 
          icon={Package} 
          title="Total Products" 
          value={totalProducts} 
          color="bg-amber-100" 
        />
        <StatCard 
          icon={DollarSign} 
          title="Total Value" 
          value={formatCurrency(totalValue)} 
          color="bg-green-100" 
        />
        <StatCard 
          icon={Tag} 
          title="Categories" 
          value={Object.keys(categoryBreakdown).length} 
          color="bg-blue-100" 
        />
        <StatCard 
          icon={ShoppingBag} 
          title="Conditions" 
          value={Object.keys(conditionBreakdown).length} 
          color="bg-purple-100" 
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Distribution Pie Chart */}
        <Card className="p-4 bg-white border-amber-200">
          <h3 className="text-lg font-medium text-amber-800 mb-4">Category Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => [`${value} products`, 'Count']}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Condition Bar Chart */}
        <Card className="p-4 bg-white border-amber-200">
          <h3 className="text-lg font-medium text-amber-800 mb-4">Product Condition</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={conditionData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip 
                  formatter={(value) => [`${value} products`, 'Count']}
                  contentStyle={{ backgroundColor: 'rgba(255, 251, 235, 0.9)', borderColor: '#F59E0B' }}
                  cursor={{ fill: 'rgba(245, 158, 11, 0.1)' }}
                />
                <Bar dataKey="value">
                  {conditionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ProductStatsCharts;