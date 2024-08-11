import React from "react";

const DashboardCard = ({ title, count, icon, color, trend }) => (

  <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105">
    <div className="p-5">
      <div className="flex items-center">
        <div className={`flex-shrink-0 rounded-full p-3 ${color}`}>
          {icon}
        </div>
        <div className="ml-5 w-0 flex-1">
          <dl>
            <dt className="text-sm font-medium text-gray-500 truncate">{title}</dt>
            <dd className="flex items-baseline">
              <div className="text-2xl font-semibold text-gray-900">{count}</div>
              <div className={`ml-2 flex items-baseline text-sm font-semibold ${trend.color}`}>
                {trend.icon}
                {trend.value}
              </div>
            </dd>
          </dl>
        </div>
      </div>
    </div>
  </div>
);

export default DashboardCard;
