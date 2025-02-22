import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import ListingItem from "../components/ListingItem";
import { Listing } from "../types/listing";

const ListingsPage = () => {
  const navigate = useNavigate();

  const [listings, setListings] = useState<Listing[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const limit = 10;

  const [selectedRegion, setSelectedRegion] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [selectedWork, setSelectedWork] = useState<string>("");
  const [selectedAmount, setSelectedAmount] = useState<string>("");

  const regions = Array.from(
    new Set(listings.map((item) => item.region).filter(Boolean))
  );
  const cities = selectedRegion
    ? Array.from(
      new Set(
        listings
          .filter((item) => item.region === selectedRegion)
          .map((item) => item.city)
          .filter((city): city is string => city !== null) // Type guard to ensure string
      )
    )
    : [];
  const workTypes = Array.from(
    new Set(listings.flatMap((item) => item.works).filter(Boolean))
  );
  const contractAmounts = Array.from(
    new Set(listings.map((item) => item.contract_amount).filter(Boolean))
  );

  const filteredListings = listings.filter((item) => {
    return (
      (selectedRegion ? item.region === selectedRegion : true) &&
      (selectedCity ? item.city === selectedCity : true) &&
      (selectedWork ? item.works.includes(selectedWork) : true) &&
      (selectedAmount ? item.contract_amount === selectedAmount : true)
    );
  });

  const fetchListings = useCallback(
    async (page: number) => {
      setLoading(true);
      setError(null);

      try {
        const token = localStorage.getItem("access_token");
        if (!token) throw new Error("No access token found");

        const offset = (page - 1) * limit;
        const response = await fetch(
          `/api/marketplace/applications/listing?offset=${offset}&limit=${limit}`,
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("API Response:", { offset, limit, listings: data.data });

        if (data.success) {
          const newListings = data.data as Listing[];
          setListings(newListings);

          if (page === 1 && totalPages === 0) {
            const initialFetch = await fetch(
              `/api/marketplace/applications/listing?offset=0&limit=1000`,
              {
                headers: {
                  Accept: "application/json",
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            const initialData = await initialFetch.json();
            if (initialData.success) {
              const totalItems = initialData.data.length;
              setTotalPages(Math.ceil(totalItems / limit));
            }
          }
        } else {
          setError(data.error || "Failed to fetch listings");
        }
      } catch (error: unknown) {
        console.error("Fetch error:", error);
        const errorMessage =
          error instanceof Error
            ? error.message
            : "An error occurred while fetching listings";
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    },
    [limit, totalPages]
  );

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      navigate("/login");
      return;
    }
    fetchListings(currentPage);
  }, [currentPage, navigate, fetchListings]); // Add fetchListings to dependencies

  const handleResetFilters = () => {
    setSelectedRegion("");
    setSelectedCity("");
    setSelectedWork("");
    setSelectedAmount("");
  };

  const pageOptions = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex h-screen bg-gradient-to-r from-gray-100 to-white relative">
      <div className="w-1/5 max-h-[70vh] bg-white shadow-xl rounded-3xl p-6 mx-4 my-4 ml-28 text-black">
        <h2 className="text-lg font-semibold mb-4">Фильтр</h2>
        <div className="space-y-4">
          <select
            onChange={(e) => setSelectedRegion(e.target.value)}
            value={selectedRegion}
            className="w-full p-2 border border-gray-300 rounded-lg bg-transparent text-black"
          >
            <option value="">Регион</option>
            {regions.map((region) => (
              <option key={region} value={region} className="text-black">
                {region}
              </option>
            ))}
          </select>
          <select
            onChange={(e) => setSelectedCity(e.target.value)}
            value={selectedCity}
            className="w-full p-2 border border-gray-300 rounded-lg bg-transparent text-black"
          >
            <option value="">Город</option>
            {cities.length === 0 ? (
              <option disabled>Нет доступных городов</option>
            ) : (
              cities.map((city) => (
                <option key={city} value={city} className="text-black">
                  {city}
                </option>
              ))
            )}
          </select>
          <select
            onChange={(e) => setSelectedWork(e.target.value)}
            value={selectedWork}
            className="w-full p-2 border border-gray-300 rounded-lg bg-transparent text-black"
          >
            <option value="">Вид работ</option>
            {workTypes.map((work) => (
              <option key={work} value={work} className="text-black">
                {work}
              </option>
            ))}
          </select>
          <select
            onChange={(e) => setSelectedAmount(e.target.value)}
            value={selectedAmount}
            className="w-full p-2 border border-gray-300 rounded-lg bg-transparent text-black"
          >
            <option value="">Сумма контракта</option>
            {contractAmounts.map((amount) => (
              <option key={amount} value={amount} className="text-black">
                {amount}
              </option>
            ))}
          </select>
          <div className="flex space-x-2">
            <button
              onClick={handleResetFilters}
              className="w-full bg-gray-200 text-black py-2 rounded-lg hover:bg-gray-300 transition duration-300 font-medium"
            >
              Сбросить
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 p-6 overflow-y-auto text-black">
        <h2 className="text-2xl font-bold mb-4 text-black">Доступные объявления</h2>
        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        {filteredListings.length === 0 && !loading && !error ? (
          <p className="text-center mt-4 text-black">
            Нет объявлений, соответствующих выбранным фильтрам на этой странице.
          </p>
        ) : (
          <div className="space-y-4">
            {filteredListings.map((item) => (
              <ListingItem key={item.id} item={item} />
            ))}
          </div>
        )}
        {loading && <p className="text-center mt-4 text-black">Загрузка...</p>}

        {totalPages > 0 && (
          <div className="flex justify-center items-center mt-6 space-x-4">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-300 text-black rounded-lg disabled:opacity-50"
            >
              Предыдущая
            </button>
            <select
              value={currentPage}
              onChange={(e) => setCurrentPage(Number(e.target.value))}
              className="px-4 py-2 border border-gray-300 rounded-lg bg-transparent text-black"
            >
              {pageOptions.map((page) => (
                <option key={page} value={page}>
                  Страница {page}
                </option>
              ))}
            </select>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-300 text-black rounded-lg disabled:opacity-50 bg-transparent"
            >
              Следующая
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListingsPage;