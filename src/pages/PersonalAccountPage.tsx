import React, { useEffect, useState, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from '../api';

interface Profile {
  surname: string;
  name: string;
  middleName: string;
  email: string;
  phone: string;
  registrationDate: string;
}

const PersonalAccount: React.FC = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getCurrentUser();
        if (!user) {
          navigate('/login');
          return;
        }

        setProfile({
          surname: user.last_name || '—',
          name: user.first_name || '—',
          middleName: user.middle_name || '',
          email: user.email || '—',
          phone: user.phone || '—',
          registrationDate: user.created_at ? new Date(user.created_at).toLocaleDateString() : '—',
        });
      } catch (error) {
        console.error('Error fetching user profile:', error);
        setError('Failed to load profile. Please try again.');
        navigate('/login');
      }
    };

    fetchUser();
  }, [navigate]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!profile) return;
    setProfile((prev) => (prev ? { ...prev, [e.target.name]: e.target.value } : null));
  };

  const handleSave = async () => {
    if (!profile) return;
    const token = localStorage.getItem('authToken');
    if (!token) {
      alert('Unauthorized request. Please login again.');
      navigate('/login');
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/marketplace/auth/users/me`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          middleName: profile.middleName.trim(),
          phone: profile.phone.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error(`Update failed: ${response.statusText}`);
      }

      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Update failed! Please try again.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  if (error) {
    return <div className="text-red-600 text-center p-6">{error}</div>;
  }

  if (!profile) {
    return <div className="text-center p-6">Loading profile...</div>;
  }

  return (
    <div className="flex h-screen bg-gradient-to-r from-yellow-300 to-yellow-500">
      <div className="w-1/4 bg-white shadow-xl rounded-xl p-6">
        <h1 className="text-3xl font-bold mb-6 text-black">Личный кабинет</h1>
        <div className="p-4 mb-6 bg-gray-100 rounded-xl">
          <h2 className="text-xl font-semibold text-black">
            {profile.name} {profile.surname}
          </h2>
          <p className="text-sm text-gray-600">{profile.email}</p>
        </div>
        <button className="w-full bg-yellow-500 text-black py-3 mb-4 rounded-xl hover:bg-yellow-400">
          Create a request
        </button>
        <button className="w-full bg-yellow-500 text-black py-3 mb-6 rounded-xl hover:bg-yellow-400">
          Support service
        </button>
        <div className="cursor-pointer p-4 rounded-xl hover:bg-yellow-200 text-black">
          My profile
        </div>
        <div className="cursor-pointer p-4 rounded-xl hover:bg-yellow-200 text-black">
          My companies
        </div>
        <div className="cursor-pointer p-4 rounded-xl hover:bg-yellow-200 text-black">
          Request management
        </div>
        <div className="cursor-pointer p-4 rounded-xl hover:bg-yellow-200 flex items-center text-black">
          <span className="mr-2">⚙️</span> Settings
        </div>
        <div className="text-sm text-gray-700 mt-6">
          Registration date: {profile.registrationDate}
        </div>
        <button
          onClick={handleLogout}
          className="mt-6 w-full bg-red-600 text-white py-3 rounded-xl hover:bg-red-700"
        >
          Logout
        </button>
      </div>

      <div className="flex-1 p-6">
        <h2 className="text-4xl font-bold mb-6 text-black">My profile</h2>
        <div className="bg-white shadow-xl rounded-xl p-6">
          <h3 className="text-2xl font-semibold mb-4 text-black">Personal Data</h3>
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-black">Surname</label>
              <input
                type="text"
                name="surname"
                value={profile.surname}
                className="w-full p-3 border rounded-xl bg-gray-200 text-black"
                disabled
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-black">Name</label>
              <input
                type="text"
                name="name"
                value={profile.name}
                className="w-full p-3 border rounded-xl bg-gray-200 text-black"
                disabled
              />
            </div>
            <div className="relative">
              <label className="block text-sm font-medium text-black">Middle name</label>
              <input
                type="text"
                name="middleName"
                value={profile.middleName}
                onChange={handleChange}
                className="w-full p-3 border rounded-xl bg-gray-100 text-black"
                placeholder="Ivanovich"
              />
            </div>
            <div className="relative">
              <label className="block text-sm font-medium text-black">Phone</label>
              <input
                type="text"
                name="phone"
                value={profile.phone}
                onChange={handleChange}
                className="w-full p-3 border rounded-xl bg-gray-100 text-black"
                placeholder="+7 900 123 45 67"
              />
            </div>
          </div>
          <div className="text-right mb-6">
            <button
              onClick={handleSave}
              className="bg-yellow-500 text-black py-3 px-5 rounded-xl hover:bg-yellow-400"
            >
              Save data
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalAccount;
