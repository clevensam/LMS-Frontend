import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { Card, Button } from '../components/Common';
import { Bell, Shield, Eye, Moon, Globe, Volume2, Save } from 'lucide-react';

const Settings: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  
  const [notifications, setNotifications] = useState({
      email: true,
      push: true,
      updates: false,
      newsletter: false
  });

  const [privacy, setPrivacy] = useState({
      publicProfile: true,
      showActivity: true,
      showStatus: true
  });

  const handleSave = () => {
      alert("Settings saved successfully!");
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
        <p className="text-slate-500">Manage your application preferences and configuration.</p>
      </div>

      {/* General Settings */}
      <Card className="p-6">
          <div className="flex items-center mb-4">
              <Globe className="h-5 w-5 text-green-700 mr-2" />
              <h2 className="text-lg font-bold text-slate-900">General Preferences</h2>
          </div>
          <div className="space-y-4">
              <div className="flex items-center justify-between py-2 border-b border-slate-50">
                  <div>
                      <p className="font-medium text-slate-900">Language</p>
                      <p className="text-xs text-slate-500">Select your preferred interface language</p>
                  </div>
                  <select className="border-slate-300 rounded-md text-sm p-2 bg-slate-50">
                      <option>English (US)</option>
                      <option>Swahili</option>
                      <option>French</option>
                  </select>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-slate-50">
                  <div>
                      <p className="font-medium text-slate-900">Theme</p>
                      <p className="text-xs text-slate-500">Customize appearance</p>
                  </div>
                  <select className="border-slate-300 rounded-md text-sm p-2 bg-slate-50">
                      <option>Light Mode</option>
                      <option>Dark Mode</option>
                      <option>System Default</option>
                  </select>
              </div>
          </div>
      </Card>

      {/* Role Specific Settings */}
      {user?.role === 'student' && (
          <Card className="p-6">
             <div className="flex items-center mb-4">
                  <Eye className="h-5 w-5 text-green-700 mr-2" />
                  <h2 className="text-lg font-bold text-slate-900">Student Privacy</h2>
              </div>
              <div className="space-y-4">
                  <div className="flex items-center justify-between">
                      <span className="text-slate-700">Make profile public</span>
                      <input 
                        type="checkbox" 
                        checked={privacy.publicProfile} 
                        onChange={e => setPrivacy({...privacy, publicProfile: e.target.checked})}
                        className="h-5 w-5 text-green-600 rounded focus:ring-green-500" 
                      />
                  </div>
                  <div className="flex items-center justify-between">
                      <span className="text-slate-700">Show learning activity on leaderboard</span>
                      <input 
                        type="checkbox" 
                        checked={privacy.showActivity} 
                        onChange={e => setPrivacy({...privacy, showActivity: e.target.checked})}
                        className="h-5 w-5 text-green-600 rounded focus:ring-green-500" 
                      />
                  </div>
              </div>
          </Card>
      )}

      {user?.role === 'instructor' && (
          <Card className="p-6">
             <div className="flex items-center mb-4">
                  <Volume2 className="h-5 w-5 text-green-700 mr-2" />
                  <h2 className="text-lg font-bold text-slate-900">Instructor Controls</h2>
              </div>
              <div className="space-y-4">
                  <div className="flex items-center justify-between">
                      <span className="text-slate-700">Email me when student submits assignment</span>
                      <input type="checkbox" defaultChecked className="h-5 w-5 text-green-600 rounded focus:ring-green-500" />
                  </div>
                  <div className="flex items-center justify-between">
                      <span className="text-slate-700">Allow direct messages from students</span>
                      <input type="checkbox" defaultChecked className="h-5 w-5 text-green-600 rounded focus:ring-green-500" />
                  </div>
              </div>
          </Card>
      )}

      {user?.role === 'admin' && (
          <Card className="p-6 border-l-4 border-l-red-500">
             <div className="flex items-center mb-4">
                  <Shield className="h-5 w-5 text-red-600 mr-2" />
                  <h2 className="text-lg font-bold text-slate-900">System Controls</h2>
              </div>
              <div className="space-y-4">
                  <div className="flex items-center justify-between">
                      <span className="text-slate-700">Enable new user registration</span>
                      <input type="checkbox" defaultChecked className="h-5 w-5 text-green-600 rounded focus:ring-green-500" />
                  </div>
                  <div className="flex items-center justify-between">
                      <span className="text-slate-700">System maintenance mode</span>
                      <input type="checkbox" className="h-5 w-5 text-green-600 rounded focus:ring-green-500" />
                  </div>
              </div>
          </Card>
      )}

      {/* Notifications */}
      <Card className="p-6">
          <div className="flex items-center mb-4">
              <Bell className="h-5 w-5 text-green-700 mr-2" />
              <h2 className="text-lg font-bold text-slate-900">Notifications</h2>
          </div>
          <div className="space-y-4">
              <div className="flex items-center justify-between">
                  <span className="text-slate-700">Email Notifications</span>
                  <input 
                    type="checkbox" 
                    checked={notifications.email} 
                    onChange={e => setNotifications({...notifications, email: e.target.checked})}
                    className="h-5 w-5 text-green-600 rounded focus:ring-green-500" 
                  />
              </div>
              <div className="flex items-center justify-between">
                  <span className="text-slate-700">Push Notifications</span>
                  <input 
                    type="checkbox" 
                    checked={notifications.push} 
                    onChange={e => setNotifications({...notifications, push: e.target.checked})}
                    className="h-5 w-5 text-green-600 rounded focus:ring-green-500" 
                  />
              </div>
          </div>
      </Card>

      <div className="flex justify-end">
          <Button onClick={handleSave} icon={Save}>Save Settings</Button>
      </div>
    </div>
  );
};

export default Settings;