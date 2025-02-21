import React from "react";
import { Listing } from "../types/listing";

interface ListingItemProps {
  item: Listing;
}

const ListingItem: React.FC<ListingItemProps> = ({ item }) => {
  return (
    <div className="border p-4 rounded-lg shadow-lg bg-white flex justify-between items-start hover:shadow-md transition-shadow duration-200">
      <div className="w-3/4">
        <p className="text-xs text-gray-500">Заявка #{item.id}</p>
        <h3 className="text-lg font-semibold">{item.category || "Категория не указана"}</h3>
        <p className="text-sm text-gray-600 mt-1 line-clamp-2">
          {item.description || "Описание отсутствует"}
        </p>
        <p className="text-green-600 text-sm font-medium mt-2">{item.status}</p>
        <p className="text-gray-500 text-sm rounded-md">{item.contract_type}</p>
        <p className="text-sm mt-2 flex items-center">
          📌{" "}
          <strong>
            {item.region}, {item.city ?? "Не указан"}
          </strong>
        </p>
        <p className="text-sm mt-2">
          <strong>Объем работ:</strong> {item.work_scope || "Не указано"}
        </p>
      </div>
      <div className="text-right w-1/4">
        <p className="text-lg font-semibold">{item.contract_amount}</p>
        {item.application_type === "Комиссионная" && (
          <span className="bg-green-200 text-green-700 text-xs px-2 py-1 rounded-md mt-2 inline-block">
            % за комиссию
          </span>
        )}
        <p className="text-sm mt-4 text-gray-500">{item.views} просмотров</p>
      </div>
    </div>
  );
};

export default ListingItem;