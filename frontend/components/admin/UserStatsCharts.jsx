import React from "react";
import { Card } from "@/components/ui/card";
import { Users, ShoppingBag, Store, UserCheck } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";

const UserStatsCharts = ({ totalUsers, sellerCount, buyerCount, activeUsers }) => {
  // Data for pie chart
  const pieData = [
    { name: "Buyers", value: buyerCount, color: "#3b82f6" },
    { name: "Sellers", value: sellerCount, color: "#f59e0b" },
  ];

  // Data for bar chart
  const barData = [
    { name: "Total", count: totalUsers, color: "#78716c" },
    { name: "Active", count: activeUsers, color: "#16a34a" },
    { name: "Buyers", count: buyerCount, color: "#3b82f6" },
    { name: "Sellers", count: sellerCount, color: "#f59e0b" },
  ];

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
          icon={Users} 
          title="Total Users" 
          value={totalUsers} 
          color="bg-amber-100" 
        />
        <StatCard 
          icon={UserCheck} 
          title="Active Users" 
          value={activeUsers} 
          color="bg-green-100" 
        />
        <StatCard 
          icon={ShoppingBag} 
          title="Buyers" 
          value={buyerCount} 
          color="bg-blue-100" 
        />
        <StatCard 
          icon={Store} 
          title="Sellers" 
          value={sellerCount} 
          color="bg-amber-100" 
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Distribution Pie Chart */}
        <Card className="p-4 bg-white border-amber-200">
          <h3 className="text-lg font-medium text-amber-800 mb-4">User Type Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => [`${value} users`, 'Count']}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* User Stats Bar Chart */}
        <Card className="p-4 bg-white border-amber-200">
          <h3 className="text-lg font-medium text-amber-800 mb-4">User Statistics</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip 
                  formatter={(value) => [`${value} users`, 'Count']}
                  contentStyle={{ backgroundColor: 'rgba(255, 251, 235, 0.9)', borderColor: '#F59E0B' }}
                  cursor={{ fill: 'rgba(245, 158, 11, 0.1)' }}
                />
                <Bar dataKey="count">
                  {barData.map((entry, index) => (
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

export default UserStatsCharts;