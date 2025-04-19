import React from 'react';
import Layout from '../components/layout/Layout';
import UserSettings from '../components/settings/UserSettings';

const Settings: React.FC = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Settings</h1>
        <UserSettings />
      </div>
    </Layout>
  );
};

export default Settings;