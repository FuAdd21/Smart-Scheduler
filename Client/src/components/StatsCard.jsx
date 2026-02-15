const StatsCard = ({ title, value, icon }) => {
  return (
    <div className="bg-white shadow-md rounded-xl p-4 flex items-center space-x-4">
      <div className="text-3xl">{icon}</div>
      <div>
        <p className="text-gray-500">{title}</p>
        <p className="text-xl font-bold">{value}</p>
      </div>
    </div>
  );
};

export default StatsCard;

