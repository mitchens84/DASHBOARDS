import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ReadingDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // LBS Category Colors
  const lbsColors = {
    '2L': '#FFD700', // Gold - Life Philosophy
    '4H': '#32CD32', // Lime Green - Health
    '6I': '#FF8C00', // Dark Orange - Intellect
    '5R': '#FF4500', // Orange-Red - Relationships
    '9E': '#7FFFD4', // Aquamarine - Experience
    '8C': '#87CEEB', // Sky Blue - Contribution
    '7A': '#4169E1', // Royal Blue - Achievement
    '0A': '#C0C0C0', // Silver - Admin
    '3P': '#8B4513'  // Saddle Brown - Possessions
  };

  // Summary statistics
  const stats = {
    totalBooks: 102,
    readBooks: 28,
    toReadBooks: 74,
    avgRating: 4.1,
    categoriesCount: 9,
    authorsCount: 98,
    avgPages: 312,
    ratedBooks: 25
  };

  // Extended statistics for the Stats tab
  const extendedStats = [
    {
      category: 'Content Stats',
      items: [
        { label: 'Average Pages', value: '312' },
        { label: 'Longest Book', value: '790 pages (Behave)' },
        { label: 'Shortest Book', value: '83 pages (Lying)' }
      ]
    },
    {
      category: 'Reading Stats',
      items: [
        { label: 'Completion Rate', value: '27.5%' },
        { label: 'Rated Books', value: '25' },
        { label: 'Average Rating', value: '4.1/5' }
      ]
    },
    {
      category: 'Category Stats',
      items: [
        { label: 'Most Common Category', value: '6I (Intellect)' },
        { label: 'Categories Coverage', value: '9 categories' },
        { label: 'Multi-category Books', value: '34%' }
      ]
    }
  ];

  // Reading status data with enhanced tooltip info
  const statusData = [
    { 
      name: 'Read', 
      value: 28, 
      color: '#4ADE80',
      details: 'Completed books with average rating 4.1/5'
    },
    { 
      name: 'To Read', 
      value: 74, 
      color: '#93C5FD',
      details: 'Books in reading queue, prioritized by LBS framework'
    }
  ];

  // Category data with enhanced information
  const categoryData = [
    { 
      category: 'Life Philosophy (2L)', 
      read: 5, 
      toRead: 12,
      avgRating: 4.2,
      priority: 'Very High',
      color: lbsColors['2L']
    },
    { 
      category: 'Health (4H)', 
      read: 6, 
      toRead: 14,
      avgRating: 4.0,
      priority: 'High',
      color: lbsColors['4H']
    },
    { 
      category: 'Intellect (6I)', 
      read: 4, 
      toRead: 18,
      avgRating: 4.1,
      priority: 'High',
      color: lbsColors['6I']
    },
    { 
      category: 'Relationships (5R)', 
      read: 3, 
      toRead: 8,
      avgRating: 4.3,
      priority: 'High',
      color: lbsColors['5R']
    },
    { 
      category: 'Experience (9E)', 
      read: 2, 
      toRead: 6,
      avgRating: 4.0,
      priority: 'Medium',
      color: lbsColors['9E']
    }
  ];

  // Priority reading list with enhanced metadata
  const priorityBooks = [
    {
      title: "Deep Utopia",
      author: "Nick Bostrom",
      category: "6I",
      priority: "Very High",
      avgRating: 3.9,
      pages: 536,
      rationale: "Core text for AI understanding and future implications"
    },
    {
      title: "Outlive",
      author: "Peter Attia",
      category: "4H",
      priority: "Very High",
      avgRating: 4.37,
      pages: 496,
      rationale: "Comprehensive health and longevity framework"
    },
    {
      title: "The Body Keeps the Score",
      author: "Bessel van der Kolk",
      category: "2L",
      priority: "High",
      avgRating: 4.39,
      pages: 464,
      rationale: "Foundational text on trauma and healing"
    },
    {
      title: "Why Buddhism Is True",
      author: "Robert Wright",
      category: "2L",
      priority: "High",
      avgRating: 4.02,
      pages: 336,
      rationale: "Bridges scientific and contemplative approaches"
    },
    {
      title: "How Emotions Are Made",
      author: "Lisa Feldman Barrett",
      category: "4H",
      priority: "High",
      avgRating: 4.11,
      pages: 425,
      rationale: "Key text for understanding emotional intelligence"
    }
  ];

  // Custom tooltip component for the category chart
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-4 shadow-lg rounded-lg border">
          <h3 className="font-bold">{label}</h3>
          <p>Read: {data.read}</p>
          <p>To Read: {data.toRead}</p>
          <p>Average Rating: {data.avgRating}/5</p>
          <p>Priority: {data.priority}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full p-6 bg-gray-50">
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="stats">Detailed Stats</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          {/* Summary Stats */}
          <div className="grid grid-cols-4 gap-4 mb-8">
            {[
              { label: 'Total Books', value: stats.totalBooks },
              { label: 'Read', value: stats.readBooks },
              { label: 'To Read', value: stats.toReadBooks },
              { label: 'Avg Rating', value: `${stats.avgRating}/5` }
            ].map((stat, idx) => (
              <div key={idx} className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-gray-600 text-sm">{stat.label}</h3>
                <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-2 gap-6 mb-8">
            {/* Reading Status Pie Chart */}
            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-lg font-semibold mb-4">Reading Status</h2>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={statusData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {statusData.map((entry, index) => (
                        <Cell key={index} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip content={({ active, payload }) => {
                      if (active && payload && payload[0]) {
                        const data = payload[0].payload;
                        return (
                          <div className="bg-white p-3 shadow-lg rounded-lg border">
                            <p className="font-bold">{data.name}</p>
                            <p>{data.details}</p>
                          </div>
                        );
                      }
                      return null;
                    }} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Category Distribution */}
            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-lg font-semibold mb-4">Category Distribution</h2>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={categoryData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" angle={-45} textAnchor="end" height={60} />
                    <YAxis />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Bar dataKey="read" name="Read" stackId="a">
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                    <Bar dataKey="toRead" name="To Read" stackId="a" fill="#93C5FD" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Priority Reading List */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Priority Reading List</h2>
            <div className="grid grid-cols-1 gap-4">
              {priorityBooks.map((book, idx) => (
                <div 
                  key={idx} 
                  className="border-l-4 pl-4 py-3 bg-gray-50 rounded"
                  style={{ borderColor: lbsColors[book.category] }}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-800">{book.title}</h3>
                      <p className="text-sm text-gray-600">
                        {book.author} • Category: {book.category} • Priority: {book.priority}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">{book.rationale}</p>
                    </div>
                    <div className="text-right text-sm text-gray-600">
                      <p>Rating: {book.avgRating}/5</p>
                      <p>{book.pages} pages</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="stats">
          <div className="grid grid-cols-3 gap-6">
            {extendedStats.map((section, idx) => (
              <div key={idx} className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-lg font-semibold mb-4">{section.category}</h2>
                <div className="space-y-4">
                  {section.items.map((item, itemIdx) => (
                    <div key={itemIdx} className="border-b pb-2">
                      <p className="text-sm text-gray-600">{item.label}</p>
                      <p className="text-lg font-medium">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ReadingDashboard;