import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, updateUser } from '../store/store';
import { Card, Button, Input, Badge } from '../components/Common';
import { Mail, Phone, MapPin, Building, Edit2, Save, X, Camera } from 'lucide-react';

const Profile: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    bio: user?.bio || '',
    department: user?.department || '',
  });

  if (!user) return <div>Loading...</div>;

  const handleSave = () => {
    dispatch(updateUser(formData));
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
        name: user.name,
        email: user.email,
        phone: user.phone || '',
        bio: user.bio || '',
        department: user.department || '',
    });
    setIsEditing(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">My Profile</h1>
          <p className="text-slate-500">Manage your personal information and profile details.</p>
        </div>
        {!isEditing ? (
            <Button icon={Edit2} variant="secondary" onClick={() => setIsEditing(true)}>Edit Profile</Button>
        ) : (
            <div className="flex space-x-2">
                <Button variant="secondary" onClick={handleCancel} icon={X}>Cancel</Button>
                <Button onClick={handleSave} icon={Save}>Save Changes</Button>
            </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column: Avatar & Basic Info */}
        <div className="space-y-6">
            <Card className="p-6 text-center">
                <div className="relative inline-block mx-auto mb-4">
                    <img 
                        src={user.avatar} 
                        alt={user.name} 
                        className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                    />
                    {isEditing && (
                        <button className="absolute bottom-0 right-0 p-2 bg-green-700 text-white rounded-full hover:bg-green-800 border-2 border-white">
                            <Camera className="h-4 w-4" />
                        </button>
                    )}
                </div>
                <h2 className="text-xl font-bold text-slate-900">{user.name}</h2>
                <p className="text-slate-500 text-sm mb-3 capitalize">{user.role}</p>
                
                <div className="flex justify-center mb-4">
                     <Badge color={user.role === 'admin' ? 'red' : user.role === 'instructor' ? 'yellow' : 'green'}>
                         {user.role} Account
                     </Badge>
                </div>
                
                <div className="border-t border-slate-100 pt-4 text-left space-y-3">
                    <div className="flex items-center text-sm text-slate-600">
                        <Mail className="h-4 w-4 mr-3 text-slate-400" />
                        <span className="truncate">{user.email}</span>
                    </div>
                    {user.phone && (
                        <div className="flex items-center text-sm text-slate-600">
                            <Phone className="h-4 w-4 mr-3 text-slate-400" />
                            <span>{user.phone}</span>
                        </div>
                    )}
                    {user.department && (
                        <div className="flex items-center text-sm text-slate-600">
                            <Building className="h-4 w-4 mr-3 text-slate-400" />
                            <span>{user.department}</span>
                        </div>
                    )}
                </div>
            </Card>

            <Card className="p-6">
                <h3 className="font-bold text-slate-900 mb-4">Stats Overview</h3>
                <div className="space-y-4">
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-500">Level</span>
                        <span className="font-semibold text-slate-900">{user.level}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-500">Total XP</span>
                        <span className="font-semibold text-green-600">{user.points}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-500">Badges</span>
                        <span className="font-semibold text-slate-900">{user.badges.length}</span>
                    </div>
                </div>
            </Card>
        </div>

        {/* Right Column: Editable Details */}
        <Card className="md:col-span-2 p-8">
            <h3 className="text-lg font-bold text-slate-900 mb-6 border-b border-slate-100 pb-2">Profile Information</h3>
            
            <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1">
                        <label className="block text-sm font-medium text-slate-700">Full Name</label>
                        {isEditing ? (
                            <Input 
                                value={formData.name} 
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                            />
                        ) : (
                            <p className="py-2 text-slate-900">{user.name}</p>
                        )}
                    </div>
                    <div className="space-y-1">
                        <label className="block text-sm font-medium text-slate-700">Email Address</label>
                         {/* Email usually read-only or requires verify */}
                        <p className="py-2 text-slate-500 bg-slate-50 px-3 rounded border border-transparent">{user.email}</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1">
                        <label className="block text-sm font-medium text-slate-700">Phone Number</label>
                        {isEditing ? (
                            <Input 
                                value={formData.phone} 
                                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                placeholder="+255..."
                            />
                        ) : (
                            <p className="py-2 text-slate-900">{user.phone || 'Not set'}</p>
                        )}
                    </div>
                    <div className="space-y-1">
                        <label className="block text-sm font-medium text-slate-700">Department / Faculty</label>
                        {isEditing ? (
                            <Input 
                                value={formData.department} 
                                onChange={(e) => setFormData({...formData, department: e.target.value})}
                                placeholder="e.g. Computer Science"
                            />
                        ) : (
                            <p className="py-2 text-slate-900">{user.department || 'Not set'}</p>
                        )}
                    </div>
                </div>

                <div className="space-y-1">
                    <label className="block text-sm font-medium text-slate-700">Bio</label>
                    {isEditing ? (
                        <textarea 
                            className="block w-full rounded-md border-slate-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm p-3 border"
                            rows={4}
                            value={formData.bio}
                            onChange={(e) => setFormData({...formData, bio: e.target.value})}
                        />
                    ) : (
                        <p className="py-2 text-slate-700 whitespace-pre-wrap leading-relaxed">
                            {user.bio || 'No bio provided.'}
                        </p>
                    )}
                </div>
            </div>
        </Card>
      </div>
    </div>
  );
};

export default Profile;