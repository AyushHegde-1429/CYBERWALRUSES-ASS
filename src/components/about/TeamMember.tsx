import React from 'react';
import { Github, Linkedin, Twitter } from 'lucide-react';

interface TeamMemberProps {
  name: string;
  role: string;
  bio: string;
  avatar: string;
}

const TeamMember: React.FC<TeamMemberProps> = ({ name, role, bio, avatar }) => {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-md transition-transform hover:transform hover:scale-105">
      <div className="h-48 overflow-hidden">
        <img 
          src={avatar} 
          alt={name} 
          className="w-full h-full object-cover object-center"
        />
      </div>
      <div className="p-5">
        <h3 className="text-xl font-semibold text-white">{name}</h3>
        <p className="text-blue-400 mb-3">{role}</p>
        <p className="text-gray-400 text-sm mb-4">{bio}</p>
        <div className="flex space-x-4">
          <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
            <Linkedin size={20} />
          </a>
          <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
            <Twitter size={20} />
          </a>
          <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
            <Github size={20} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default TeamMember;