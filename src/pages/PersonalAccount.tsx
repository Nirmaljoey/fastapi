import React, { useEffect, useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";

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
    surname: "",
    name: "",
    middleName: "",
    email: "",
    phone: "",
    registrationDate: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      console.log(" No token found, redirecting to login...");
      navigate("/login");
      return;
    }

    const fetchProfile = async () => {
      try {
        const response = await fetch("/api/marketplace/auth/users/me", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            "Accept": "application/json",
          },
        });

        if (response.status === 401) {
          console.log(" Unauthorized, clearing token and redirecting...");
          localStorage.removeItem("access_token");
          navigate("/login");
          return;
        }

        if (!response.ok) {
          throw new Error(`Failed to fetch profile: ${response.status}`);
        }

        const responseData = await response.json();
        console.log("Profile data received:", responseData);

        if (responseData.success && responseData.data) {
          setProfile({
            surname: responseData.data.last_name || "",
            name: responseData.data.first_name || "",
            middleName: responseData.data.middle_name || "",
            email: responseData.data.email || "",
            phone: responseData.data.phone || "",
            registrationDate: responseData.data.created_at
              ? new Date(responseData.data.created_at).toLocaleDateString()
              : "",
          });
        } else {
          throw new Error("Invalid API response structure");
        }
      } catch (err: any) {
        console.error(" Error fetching profile:", err);
        setError(err.message || "Failed to load profile data");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const response = await fetch("/api/marketplace/auth/users/me", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          last_name: profile.surname,
          middle_name: profile.middleName,
          phone: profile.phone,
        }),
      });

      if (response.status === 401) {
        localStorage.removeItem("access_token");
        navigate("/login");
        return;
      }

      if (!response.ok) {
        throw new Error(`Failed to update profile: ${response.status}`);
      }

      alert(" Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert(" Update failed!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#F5F5F5] relative">
      <div className="w-1/5 bg-white shadow-xl rounded-3xl p-6 pb-5 mx-4 my-4 ml-28">
        <h1 className="text-4xl font-bold text-center text-black mb-4">Личный кабинет</h1>
        {loading ? (
          <p className="text-gray-500 text-center">Loading user data...</p>
        ) : error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : (
          <>
            <div className="p-3 mb-4 bg-transparent text-center">
              <h2 className="text-xl font-semibold text-black">{profile.name}</h2>
              <p className="text-sm text-black">{profile.email}</p>
            </div>
            <button className="w-full bg-yellow-500 text-black py-2 mb-3 rounded-xl hover:bg-yellow-400 transition duration-300 text-sm">
              <a href="/personal-account/profile/listings" className="text-sm text-black">
                На листинг
              </a>
            </button>
            <button className="w-full bg-yellow-500 text-black py-2 mb-4 rounded-xl hover:bg-yellow-400 transition duration-300 text-sm">
              Support service
            </button>
            <div className="space-y-2">
              <div className="space-y-2">
                <a href="/personal-account/profile" className="block cursor-pointer p-2 rounded-xl hover:bg-yellow-200 text-black transition duration-300 text-sm">
                  My profile
                </a>
              </div>
              <div className="cursor-pointer p-2 rounded-xl hover:bg-yellow-200 text-black transition duration-300 text-sm">
                My companies
              </div>
              <div className="cursor-pointer p-2 rounded-xl hover:bg-yellow-200 text-black transition duration-300 text-sm">
                Request management
              </div>
              <div className="cursor-pointer p-2 rounded-xl hover:bg-yellow-200 text-black transition duration-300 text-sm flex items-center">
                <span className="mr-2">⚙️</span> Settings
              </div>
            </div>
            <div className="text-xs text-gray-700 mt-4 text-center">
              Registration date: {profile.registrationDate}
            </div>
          </>
        )}
      </div>

      <div className="flex-1 p-6 mt-8">
        <h2 className="text-4xl font-bold mb-6 text-black ml-28">Мой профиль</h2>
        <div className="bg-white shadow-xl rounded-xl p-6 w-3/4 mx-auto">
          <h3 className="text-2xl font-semibold mb-4 text-black">Личные данные</h3>
          {error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-black">Фамилия</label>
                  <input
                    type="text"
                    name="surname"
                    value={profile.surname}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-xl bg-gray-100 text-black"
                    placeholder="Enter surname"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-black">Имя</label>
                  <input
                    type="text"
                    name="name"
                    value={profile.name}
                    className="w-full p-3 border rounded-xl bg-gray-200 text-black"
                    disabled
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-black">Отчество</label>
                  <input
                    type="text"
                    name="middleName"
                    value={profile.middleName}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-xl bg-gray-100 text-black"
                    placeholder="Ivanovich"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-black">Телефон</label>
                  <input
                    type="text"
                    name="phone"
                    value={profile.phone}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-xl bg-gray-100 text-black"
                    placeholder="+7 (999) 999-99-99"
                  />
                </div>
              </div>
              <p className="text-black mb-4 text-sm">
                Personal data is retrieved from your registration details.{" "}
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
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PersonalAccount;