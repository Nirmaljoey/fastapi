import React, { useEffect, useState, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';

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
  const [profile, setProfile] = useState<Profile>({
    surname: '',
    name: '',
    middleName: '',
    email: '',
    phone: '',
    registrationDate: '',
  });

  // Fetch user profile on mount
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate('/login');
      return;
    }

    const fetchProfile = async () => {
      try {
        const response = await fetch('/auth/users/me', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch profile');
        }

        const data = await response.json();
        setProfile({
          surname: data?.surname || '',
          name: data?.name || '',
          middleName: data?.middleName || '',
          email: data?.email || '',
          phone: data?.phone || '',
          registrationDate: data?.registrationDate || '',
        });
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, [navigate]);

  // Handle input changes
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  // Update profile data
  const handleSave = async () => {
    const token = localStorage.getItem('authToken');
    try {
      const response = await fetch('/auth/users/me', {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          middleName: profile.middleName,
          phone: profile.phone,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Update failed!');
    }
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-gradient-to-r from-yellow-300 to-yellow-500">
      {/* Left Sidebar */}
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

      {/* Main Content */}
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
              <span className="absolute right-2 top-1/2 text-xs text-gray-500">* if required</span>
            </div>
          </div>
          <p className="text-black mb-4 text-sm">
            Personal data is retrieved from your registration details.{' '}
            <a href="https://t.me/manager21yard" className="underline text-sm text-black">
              Contact your manager
            </a>
          </p>
          <div className="text-right mb-6">
            <button
              onClick={handleSave}
              className="bg-yellow-500 text-black py-3 px-5 rounded-xl hover:bg-yellow-400"
            >
              Save data
            </button>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-black">Telephone</label>
            <input
              type="text"
              name="phone"
              value={profile.phone}
              onChange={handleChange}
              className="w-full p-3 border rounded-xl bg-gray-100 text-black"
              placeholder="+79043330309"
            />
          </div>
          <div className="text-right">
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
