import React from 'react';
import Layout from '../components/layout/Layout';
import Card, { CardHeader, CardContent } from '../components/ui/Card';
import { teamMembers } from '../data/mockData';
import TeamMember from '../components/about/TeamMember';
import { Zap, Shield, TrendingUp, BarChart2 } from 'lucide-react';

const About: React.FC = () => {
  return (
    <Layout>
      <div className="grid grid-cols-1 gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">About TradePi</h1>
        </div>
        
        <Card>
          <CardHeader>Our Mission</CardHeader>
          <CardContent>
            <div className="prose prose-invert max-w-none">
              <p className="text-lg">
                TradePi is an advanced AI-powered algorithmic trading platform that leverages statistical models, 
                machine learning, and real-time socio-economic analysis to execute trades with precision and efficiency.
              </p>
              <p>
                Our mission is to democratize algorithmic trading by providing sophisticated tools that were 
                previously only available to institutional investors and hedge funds. We believe that by 
                combining cutting-edge technology with user-friendly interfaces, we can empower individual 
                investors to make smarter, data-driven investment decisions.
              </p>
              
              <h3 className="text-xl font-semibold mt-6 mb-4">Our Approach</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
                <div className="bg-gray-800 p-6 rounded-lg flex">
                  <div className="mr-4">
                    <div className="bg-blue-500 bg-opacity-10 p-3 rounded-full">
                      <Zap size={24} className="text-blue-500" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">Statistical Precision</h4>
                    <p className="text-gray-400">
                      Our algorithms analyze vast amounts of market data to identify patterns and anomalies that 
                      human traders might miss, allowing for precise entry and exit points.
                    </p>
                  </div>
                </div>
                
                <div className="bg-gray-800 p-6 rounded-lg flex">
                  <div className="mr-4">
                    <div className="bg-green-500 bg-opacity-10 p-3 rounded-full">
                      <TrendingUp size={24} className="text-green-500" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">Adaptive Learning</h4>
                    <p className="text-gray-400">
                      Our machine learning models continuously evolve, learning from market behavior to improve 
                      strategy performance over time.
                    </p>
                  </div>
                </div>
                
                <div className="bg-gray-800 p-6 rounded-lg flex">
                  <div className="mr-4">
                    <div className="bg-purple-500 bg-opacity-10 p-3 rounded-full">
                      <BarChart2 size={24} className="text-purple-500" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">Diverse Strategies</h4>
                    <p className="text-gray-400">
                      From mean reversion to momentum trading, we offer a range of sophisticated strategies that 
                      can be customized to match your risk tolerance and investment goals.
                    </p>
                  </div>
                </div>
                
                <div className="bg-gray-800 p-6 rounded-lg flex">
                  <div className="mr-4">
                    <div className="bg-yellow-500 bg-opacity-10 p-3 rounded-full">
                      <Shield size={24} className="text-yellow-500" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">Risk Management</h4>
                    <p className="text-gray-400">
                      Our platform incorporates robust risk management techniques to protect your capital and 
                      minimize drawdowns during volatile market conditions.
                    </p>
                  </div>
                </div>
              </div>
              
              <p>
                TradePi is designed for traders of all experience levels. Whether you're a seasoned professional 
                looking to optimize your strategy or a beginner wanting to leverage algorithmic trading, our 
                platform offers the tools and resources you need to succeed in today's complex markets.
              </p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>Our Team</CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {teamMembers.map((member) => (
                <TeamMember
                  key={member.id}
                  name={member.name}
                  role={member.role}
                  bio={member.bio}
                  avatar={member.avatar}
                />
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>Technology Stack</CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold mb-4">Frontend Technologies</h3>
                <ul className="space-y-3">
                  <li className="flex">
                    <div className="bg-blue-500 bg-opacity-10 p-2 rounded-full mr-3">
                      <span className="text-blue-500 font-semibold">R</span>
                    </div>
                    <div>
                      <span className="font-medium">React</span>
                      <p className="text-sm text-gray-400">For building responsive user interfaces</p>
                    </div>
                  </li>
                  <li className="flex">
                    <div className="bg-green-500 bg-opacity-10 p-2 rounded-full mr-3">
                      <span className="text-green-500 font-semibold">TS</span>
                    </div>
                    <div>
                      <span className="font-medium">TypeScript</span>
                      <p className="text-sm text-gray-400">For type-safe code and better developer experience</p>
                    </div>
                  </li>
                  <li className="flex">
                    <div className="bg-purple-500 bg-opacity-10 p-2 rounded-full mr-3">
                      <span className="text-purple-500 font-semibold">TW</span>
                    </div>
                    <div>
                      <span className="font-medium">Tailwind CSS</span>
                      <p className="text-sm text-gray-400">For rapid UI development with utility classes</p>
                    </div>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-4">Backend Technologies</h3>
                <ul className="space-y-3">
                  <li className="flex">
                    <div className="bg-yellow-500 bg-opacity-10 p-2 rounded-full mr-3">
                      <span className="text-yellow-500 font-semibold">PY</span>
                    </div>
                    <div>
                      <span className="font-medium">Python</span>
                      <p className="text-sm text-gray-400">For data processing and machine learning models</p>
                    </div>
                  </li>
                  <li className="flex">
                    <div className="bg-red-500 bg-opacity-10 p-2 rounded-full mr-3">
                      <span className="text-red-500 font-semibold">TF</span>
                    </div>
                    <div>
                      <span className="font-medium">TensorFlow</span>
                      <p className="text-sm text-gray-400">For building and training neural networks</p>
                    </div>
                  </li>
                  <li className="flex">
                    <div className="bg-cyan-500 bg-opacity-10 p-2 rounded-full mr-3">
                      <span className="text-cyan-500 font-semibold">PD</span>
                    </div>
                    <div>
                      <span className="font-medium">Pandas</span>
                      <p className="text-sm text-gray-400">For data manipulation and analysis</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default About;