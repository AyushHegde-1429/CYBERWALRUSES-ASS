import React from 'react';
import { Github, Linkedin, Twitter } from 'lucide-react';

interface TeamMemberProps {
  name: string;
  role: string;
  bio: string;
  avatar: string;
  social?: {
    github?: string;
    linkedin?: string;
    twitter?: string;
  };
}

const TeamMember: React.FC<TeamMemberProps> = ({ 
  name, 
  role, 
  bio, 
  avatar,
  social 
}) => {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:transform hover:scale-105 hover:shadow-xl">
      <div className="h-48 overflow-hidden">
        <img 
          src={avatar} 
          alt={`${name}'s profile`} 
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
        />
      </div>
      <div className="p-6">
        <h3 className="text-2xl font-bold text-white mb-2">{name}</h3>
        <p className="text-blue-400 text-lg mb-4">{role}</p>
        <p className="text-gray-300 mb-6 line-clamp-3">{bio}</p>
        <div className="flex space-x-4">
          {social?.github && (
            <a href={social.github} target="_blank" rel="noopener noreferrer" 
               className="text-gray-400 hover:text-white transition-colors">
              <Github size={24} />
            </a>
          )}
          {social?.linkedin && (
            <a href={social.linkedin} target="_blank" rel="noopener noreferrer"
               className="text-gray-400 hover:text-white transition-colors">
              <Linkedin size={24} />
            </a>
          )}
          {social?.twitter && (
            <a href={social.twitter} target="_blank" rel="noopener noreferrer"
               className="text-gray-400 hover:text-white transition-colors">
              <Twitter size={24} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeamMember;