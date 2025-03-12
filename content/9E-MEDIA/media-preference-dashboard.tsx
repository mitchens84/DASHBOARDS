import React, { useState } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ScatterChart, Scatter } from 'recharts';
import { Calendar, Clock, Film, Tv, Award, BookOpen, Heart, BarChart2, Compass, ArrowRight } from 'lucide-react';

// Data preparation based on the analysis
const ratingDistribution = [
  { name: '10/10', value: 7, description: 'Exceptional', color: '#1e40af' },
  { name: '9/10', value: 19, description: 'Outstanding', color: '#3b82f6' },
  { name: '8/10', value: 36, description: 'Excellent', color: '#60a5fa' },
  { name: '7/10', value: 39, description: 'Good', color: '#93c5fd' },
  { name: '≤6/10', value: 27, description: 'Average or below', color: '#dbeafe' }
];

const genreRatings = [
  { genre: 'Sci-Fi/Fantasy', avgRating: 8.7, count: 42, description: 'Philosophical exploration of consciousness and reality' },
  { genre: 'Documentary', avgRating: 8.5, count: 18, description: 'Ethics, environment, and health topics' },
  { genre: 'Action/Thriller', avgRating: 8.1, count: 35, description: 'Character-driven with ethical dimensions' },
  { genre: 'Drama Series', avgRating: 8.4, count: 22, description: 'Complex, cerebral narratives' },
  { genre: 'Comedy', avgRating: 7.5, count: 12, description: 'Intelligent, well-crafted humor' },
  { genre: 'Crime/Mystery', avgRating: 7.9, count: 17, description: 'Complex mysteries with depth' },
  { genre: 'Historical/Period', avgRating: 7.7, count: 11, description: 'Well-researched, immersive experiences' }
];

const timelineData = [
  { year: 2015, avgRating: 7.8, sciFiCount: 7, docCount: 2, thrillerCount: 5, dramaCount: 3 },
  { year: 2016, avgRating: 7.5, sciFiCount: 8, docCount: 3, thrillerCount: 6, dramaCount: 4 },
  { year: 2017, avgRating: 7.7, sciFiCount: 6, docCount: 4, thrillerCount: 5, dramaCount: 5 },
  { year: 2018, avgRating: 7.6, sciFiCount: 5, docCount: 3, thrillerCount: 4, dramaCount: 3 },
  { year: 2019, avgRating: 7.9, sciFiCount: 6, docCount: 2, thrillerCount: 3, dramaCount: 4 },
  { year: 2020, avgRating: 8.1, sciFiCount: 4, docCount: 5, thrillerCount: 3, dramaCount: 4 },
  { year: 2021, avgRating: 8.3, sciFiCount: 5, docCount: 6, thrillerCount: 4, dramaCount: 3 },
  { year: 2022, avgRating: 8.0, sciFiCount: 4, docCount: 4, thrillerCount: 3, dramaCount: 2 },
  { year: 2023, avgRating: 7.8, sciFiCount: 5, docCount: 3, thrillerCount: 4, dramaCount: 2 },
  { year: 2024, avgRating: 8.1, sciFiCount: 2, docCount: 2, thrillerCount: 1, dramaCount: 1 }
];

const thematicRadarData = [
  { theme: 'Philosophical Depth', score: 9.2 },
  { theme: 'Ethical Dimensions', score: 8.8 },
  { theme: 'Intellectual Stimulation', score: 8.6 },
  { theme: 'Visual Craftsmanship', score: 8.3 },
  { theme: 'Systemic Analysis', score: 8.7 },
  { theme: 'Character Development', score: 7.9 },
  { theme: 'Emotional Impact', score: 7.5 }
];

const philosophicalConnections = [
  { principle: 'MEDITATION', media: 'The Matrix, Westworld', application: 'Exploration of consciousness and perception' },
  { principle: 'CHOSEN_SUFFERING', media: 'Game of Thrones, Earthlings', application: 'Ethical choices in difficult circumstances' },
  { principle: 'SELF_DEFENCE', media: 'John Wick, The Count of Monte Cristo', application: 'Understanding capacity for action' },
  { principle: 'TREAD_LIGHTLY', media: 'Seaspiracy, Earthlings', application: 'Resource usage awareness' },
  { principle: 'RADICAL_ACCEPTANCE', media: 'Shawshank Redemption, The Last of Us', application: 'Adapting to unchangeable circumstances' }
];

const topRatedByCategory = {
  films: [
    { title: 'The Matrix', year: 1999, rating: 10, highlight: 'Reality perception, consciousness' },
    { title: 'Braveheart', year: 1995, rating: 10, highlight: 'Freedom, sacrifice, principles' },
    { title: 'Seaspiracy', year: 2021, rating: 10, highlight: 'Environmental ethics, sustainability' }
  ],
  series: [
    { title: 'Game of Thrones', year: 2011, rating: 10, highlight: 'Power dynamics, ethical choices' },
    { title: 'Sherlock', year: 2010, rating: 10, highlight: 'Analytical thinking, perception' },
    { title: 'Fawlty Towers', year: 1975, rating: 10, highlight: 'Social commentary, humor' }
  ],
  documentaries: [
    { title: 'Seaspiracy', year: 2021, rating: 10, highlight: 'Ocean conservation, ethics' },
    { title: 'Earthlings', year: 2005, rating: 9, highlight: 'Animal welfare, ethical choices' },
    { title: 'What the Health', year: 2017, rating: 9, highlight: 'Nutrition, health systems' }
  ]
};

const recommendations = [
  { category: 'Content Organization', suggestion: 'Three-tier system based on philosophical value', benefit: 'Aligns media consumption with LBS framework' },
  { category: 'Consumption Protocol', suggestion: 'Intention setting before viewing', benefit: 'Transforms passive viewing into active philosophy practice' },
  { category: 'Reflection Practice', suggestion: 'Post-viewing philosophical journaling', benefit: 'Extracts maximum value from each experience' },
  { category: 'Selection Criteria', suggestion: 'Prioritize thematic depth over production value', benefit: 'Ensures alignment with core values' },
  { category: 'Media Fasting', suggestion: 'Periodic abstention from all media', benefit: 'Enhances appreciation and mindfulness' }
];

// Main Dashboard Component
const MediaPreferenceDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const TabButton = ({ id, label, icon }) => {
    const Icon = icon;
    return (
      <button 
        onClick={() => setActiveTab(id)}
        className={`flex items-center p-3 rounded-md ${activeTab === id ? 'bg-blue-100 text-blue-800' : 'hover:bg-gray-100'}`}
      >
        <Icon size={18} className="mr-2" />
        <span>{label}</span>
      </button>
    );
  };

  return (
    <div className="flex flex-col h-full bg-gray-50 text-gray-800">
      <header className="bg-blue-700 text-white p-4">
        <h1 className="text-2xl font-bold">Media Preference Analysis Dashboard</h1>
        <p className="text-blue-100">Insights derived from IMDB ratings (2015-2024)</p>
      </header>

      <nav className="bg-white p-2 shadow flex space-x-2 overflow-x-auto">
        <TabButton id="overview" label="Overview" icon={BarChart2} />
        <TabButton id="genres" label="Genre Analysis" icon={Film} />
        <TabButton id="timeline" label="Evolution of Taste" icon={Calendar} />
        <TabButton id="themes" label="Thematic Patterns" icon={Compass} />
        <TabButton id="philosophy" label="Philosophical Connections" icon={BookOpen} />
        <TabButton id="top" label="Top Rated" icon={Award} />
        <TabButton id="recommendations" label="Recommendations" icon={Heart} />
      </nav>

      <main className="flex-1 p-4 overflow-y-auto">
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-xl font-bold mb-4">Rating Distribution</h2>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={ratingDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={2}
                      dataKey="value"
                      label={({name, percent}) => `${name} (${(percent * 100).toFixed(0)}%)`}
                    >
                      {ratingDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value, name) => [value, name]} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4">
                <p className="text-sm text-gray-600">You're selective with perfect 10 ratings (only 5.5% of titles), reserving them for truly exceptional content that resonates deeply with your values.</p>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-xl font-bold mb-4">Summary of Preferences</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-blue-100 p-2 rounded-full mr-3">
                    <Film size={20} className="text-blue-700" />
                  </div>
                  <div>
                    <h3 className="font-medium">Primary Genres</h3>
                    <p className="text-sm text-gray-600">Strong preference for Science Fiction/Fantasy and thoughtful Documentaries</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-blue-100 p-2 rounded-full mr-3">
                    <Compass size={20} className="text-blue-700" />
                  </div>
                  <div>
                    <h3 className="font-medium">Thematic Focus</h3>
                    <p className="text-sm text-gray-600">Drawn to content with philosophical depth and ethical dimensions</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-blue-100 p-2 rounded-full mr-3">
                    <Calendar size={20} className="text-blue-700" />
                  </div>
                  <div>
                    <h3 className="font-medium">Evolving Taste</h3>
                    <p className="text-sm text-gray-600">Increasing interest in documentaries with ethical themes since 2020</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-blue-100 p-2 rounded-full mr-3">
                    <BookOpen size={20} className="text-blue-700" />
                  </div>
                  <div>
                    <h3 className="font-medium">Philosophical Alignment</h3>
                    <p className="text-sm text-gray-600">Highest ratings for content that resonates with Stoicism and ethical principles</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow md:col-span-2">
              <h2 className="text-xl font-bold mb-4">Key Insights</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                  <h3 className="font-medium text-blue-800">Quality Over Quantity</h3>
                  <p className="text-sm mt-1">Strong preference for fewer, high-quality titles rather than volume consumption</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                  <h3 className="font-medium text-blue-800">Thought-Provoking Content</h3>
                  <p className="text-sm mt-1">Consistent attraction to media that stimulates reflection and philosophical thinking</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                  <h3 className="font-medium text-blue-800">Values Alignment</h3>
                  <p className="text-sm mt-1">Growing preference for content that aligns with environmental and ethical principles</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'genres' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-4 rounded-lg shadow md:col-span-2">
              <h2 className="text-xl font-bold mb-4">Genre Preferences</h2>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={genreRatings}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="genre" />
                    <YAxis domain={[6, 9]} label={{ value: 'Average Rating', angle: -90, position: 'insideLeft' }} />
                    <Tooltip formatter={(value, name) => [value, name === 'avgRating' ? 'Average Rating' : 'Number of Titles']} />
                    <Legend />
                    <Bar dataKey="avgRating" fill="#3b82f6" name="Average Rating" />
                    <Bar dataKey="count" fill="#93c5fd" name="Number of Titles" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4">
                <p className="text-sm text-gray-600">Science Fiction/Fantasy and Documentaries receive your highest average ratings, showing your preference for content that explores philosophical ideas and ethical issues.</p>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-xl font-bold mb-4">Primary Genre: Sci-Fi/Fantasy</h2>
              <ul className="space-y-3">
                <li className="border-l-4 border-blue-500 pl-3">
                  <p className="font-medium">Philosophical Exploration</p>
                  <p className="text-sm text-gray-600">Strong preference for works that explore consciousness, reality, and human potential</p>
                </li>
                <li className="border-l-4 border-blue-500 pl-3">
                  <p className="font-medium">Ethical Dilemmas</p>
                  <p className="text-sm text-gray-600">Drawn to narratives featuring complex moral choices</p>
                </li>
                <li className="border-l-4 border-blue-500 pl-3">
                  <p className="font-medium">Visual Innovation</p>
                  <p className="text-sm text-gray-600">Appreciation for visually striking and innovative presentation</p>
                </li>
                <li className="border-l-4 border-blue-500 pl-3">
                  <p className="font-medium">World-Building Depth</p>
                  <p className="text-sm text-gray-600">Preference for richly developed fictional universes with internal consistency</p>
                </li>
              </ul>
            </div>

            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-xl font-bold mb-4">Secondary Genre: Documentaries</h2>
              <ul className="space-y-3">
                <li className="border-l-4 border-green-500 pl-3">
                  <p className="font-medium">Environmental Focus</p>
                  <p className="text-sm text-gray-600">High ratings for documentaries addressing environmental issues and sustainability</p>
                </li>
                <li className="border-l-4 border-green-500 pl-3">
                  <p className="font-medium">Ethical Considerations</p>
                  <p className="text-sm text-gray-600">Strong interest in animal welfare and ethical treatment topics</p>
                </li>
                <li className="border-l-4 border-green-500 pl-3">
                  <p className="font-medium">Health & Nutrition</p>
                  <p className="text-sm text-gray-600">Consistent engagement with content exploring health systems and nutrition</p>
                </li>
                <li className="border-l-4 border-green-500 pl-3">
                  <p className="font-medium">Systemic Analysis</p>
                  <p className="text-sm text-gray-600">Preference for documentaries that examine root causes and systemic issues</p>
                </li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'timeline' && (
          <div className="grid grid-cols-1 gap-6">
            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-xl font-bold mb-4">Evolution of Taste (2015-2024)</h2>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={timelineData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="avgRating" stroke="#3b82f6" name="Average Rating" strokeWidth={2} />
                    <Line type="monotone" dataKey="docCount" stroke="#10b981" name="Documentaries" />
                    <Line type="monotone" dataKey="sciFiCount" stroke="#6366f1" name="Sci-Fi/Fantasy" />
                    <Line type="monotone" dataKey="thrillerCount" stroke="#f59e0b" name="Thrillers" />
                    <Line type="monotone" dataKey="dramaCount" stroke="#ef4444" name="Drama Series" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4">
                <p className="text-sm text-gray-600">Your average ratings have gradually increased over time, with a notable uptick in documentary viewing since 2020, suggesting a growing interest in factual content with ethical dimensions.</p>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-xl font-bold mb-4">Key Trends</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-medium mb-2">Increasing Documentary Focus</h3>
                  <p className="text-sm text-gray-600">Growing interest in documentaries about environmental and ethical issues (particularly since 2020)</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-medium mb-2">Consistent Sci-Fi Appreciation</h3>
                  <p className="text-sm text-gray-600">Enduring preference for thought-provoking science fiction throughout your viewing history</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-medium mb-2">Series Exploration</h3>
                  <p className="text-sm text-gray-600">Increased engagement with complex, long-form storytelling in series format</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-medium mb-2">Values Alignment</h3>
                  <p className="text-sm text-gray-600">Growing preference for content that aligns with ethical principles (particularly regarding environmental and animal welfare issues)</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'themes' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-xl font-bold mb-4">Thematic Patterns</h2>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart outerRadius={90} data={thematicRadarData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="theme" />
                    <PolarRadiusAxis angle={30} domain={[0, 10]} />
                    <Radar name="Theme Score" dataKey="score" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.5} />
                    <Tooltip />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4">
                <p className="text-sm text-gray-600">Your highest scores consistently go to content with philosophical depth and ethical dimensions, indicating a preference for media that encourages reflection on meaningful questions.</p>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-xl font-bold mb-4">Thematic Elements</h2>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-medium">Philosophical Depth</span>
                    <span className="text-sm text-gray-600">9.2/10</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-800 h-2 rounded-full" style={{ width: '92%' }}></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Films/shows that explore consciousness, reality, ethics, and human nature</p>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-medium">Ethical Dimensions</span>
                    <span className="text-sm text-gray-600">8.8/10</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-700 h-2 rounded-full" style={{ width: '88%' }}></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Strong preference for content addressing moral questions</p>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-medium">Intellectual Stimulation</span>
                    <span className="text-sm text-gray-600">8.6/10</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '86%' }}></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Appreciation for narratives requiring active engagement</p>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-medium">Systemic Analysis</span>
                    <span className="text-sm text-gray-600">8.7/10</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-700 h-2 rounded-full" style={{ width: '87%' }}></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Interest in content that examines broader systems and their impacts</p>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-medium">Emotional Impact</span>
                    <span className="text-sm text-gray-600">7.5/10</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-400 h-2 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Secondary emphasis on emotional resonance compared to intellectual engagement</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'philosophy' && (
          <div className="grid grid-cols-1 gap-6">
            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-xl font-bold mb-4">Philosophical Connections</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Principle</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Media Examples</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Application</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {philosophicalConnections.map((item, index) => (
                      <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-700">{item.principle}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.media}</td>
                        <td className="px-6 py-4 text-sm text-gray-500">{item.application}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4">
                <p className="text-sm text-gray-600">Your highest-rated content consistently aligns with core philosophical principles from your Life Breakdown Structure (LBS), suggesting that media consumption serves as a form of philosophical exploration.</p>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-xl font-bold mb-4">Philosophical Integration Opportunities</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border-l-4 border-blue-500 p-3 bg-blue-50">
                  <h3 className="font-medium">Media as Contemplative Object</h3>
                  <p className="text-sm mt-1">Use thought-provoking content as a focus for MEDITATION practice, contemplating the questions and insights raised</p>
                </div>
                <div className="border-l-4 border-blue-500 p-3 bg-blue-50">
                  <h3 className="font-medium">Voluntary Discomfort Exploration</h3>
                  <p className="text-sm mt-1">Select challenging documentaries and narratives that promote CHOSEN_SUFFERING by confronting difficult truths</p>
                </div>
                <div className="border-l-4 border-blue-500 p-3 bg-blue-50">
                  <h3 className="font-medium">Scenario Analysis</h3>
                  <p className="text-sm mt-1">Use fictional scenarios as thought experiments to test ethical frameworks and prepare for real-world scenarios</p>
                </div>
                <div className="border-l-4 border-blue-500 p-3 bg-blue-50">
                  <h3 className="font-medium">Resource Consciousness</h3>
                  <p className="text-sm mt-1">Apply TREAD_LIGHTLY principles to media consumption through careful curation and mindful viewing</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'top' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-xl font-bold mb-4">Top Rated Films</h2>
              <ul className="divide-y divide-gray-200">
                {topRatedByCategory.films.map((item, index) => (
                  <li key={index} className="py-3">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{item.title}</span>
                      <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded">
                        {item.rating}/10
                      </span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <Clock size={14} className="mr-1" />
                      <span>{item.year}</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{item.highlight}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-xl font-bold mb-4">Top Rated Series</h2>
              <ul className="divide-y divide-gray-200">
                {topRatedByCategory.series.map((item, index) => (
                  <li key={index} className="py-3">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{item.title}</span>
                      <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded">
                        {item.rating}/10
                      </span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <Clock size={14} className="mr-1" />
                      <span>{item.year}</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{item.highlight}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-xl font-bold mb-4">Top Rated Documentaries</h2>
              <ul className="divide-y divide-gray-200">
                {topRatedByCategory.documentaries.map((item, index) => (
                  <li key={index} className="py-3">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{item.title}</span>
                      <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded">
                        {item.rating}/10
                      </span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <Clock size={14} className="mr-1" />
                      <span>{item.year}</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{item.highlight}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'recommendations' && (
          <div className="grid grid-cols-1 gap-6">
            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-xl font-bold mb-4">9E-EXPERIENCE Enhancement Recommendations</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Suggestion</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Benefit</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {recommendations.map((item, index) => (
                      <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-700">{item.category}</td>
                        <td className="px-6 py-4 text-sm text-gray-700">{item.suggestion}</td>
                        <td className="px-6 py-4 text-sm text-gray-500">{item.benefit}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-xl font-bold mb-4">Three-Tier Media Consumption Structure</h2>
              <div className="space-y-4">
                <div className="border-l-4 border-blue-800 p-3 bg-blue-50">
                  <h3 className="font-medium">Tier 1: Philosophical Foundation</h3>
                  <p className="text-sm mt-1">Content with exceptional ethical/consciousness exploration that directly supports philosophical development</p>
                  <div className="flex items-center mt-2">
                    <ArrowRight size={14} className="text-blue-800 mr-1" />
                    <span className="text-sm text-blue-800">Example: The Matrix, Westworld, philosophical documentaries</span>
                  </div>
                </div>
                
                <div className="border-l-4 border-blue-600 p-3 bg-blue-50">
                  <h3 className="font-medium">Tier 2: Systems Understanding</h3>
                  <p className="text-sm mt-1">Documentaries and analyses that illuminate complex systems and their impacts</p>
                  <div className="flex items-center mt-2">
                    <ArrowRight size={14} className="text-blue-800 mr-1" />
                    <span className="text-sm text-blue-800">Example: Seaspiracy, environmental/social documentaries</span>
                  </div>
                </div>
                
                <div className="border-l-4 border-blue-400 p-3 bg-blue-50">
                  <h3 className="font-medium">Tier 3: Recreational Value</h3>
                  <p className="text-sm mt-1">High-quality entertainment with depth that provides relaxation while still offering some intellectual engagement</p>
                  <div className="flex items-center mt-2">
                    <ArrowRight size={14} className="text-blue-800 mr-1" />
                    <span className="text-sm text-blue-800">Example: Well-crafted action/thrillers with ethical dimensions</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="bg-white p-3 text-center text-sm text-gray-600 border-t">
        Analysis based on data from IMDB ratings (2015-2024) | Aligned with 9E-EXPERIENCE LBS Category
      </footer>
    </div>
  );
};

export default MediaPreferenceDashboard;
