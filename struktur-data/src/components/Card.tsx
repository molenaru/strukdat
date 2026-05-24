import { useNavigate } from "react-router-dom";

const Card = ({ title, description, imageUrl, color, path }) => {
  const navigate = useNavigate();

  return (
    <div
      className={`w-60 rounded-2xl shadow-xl overflow-hidden hover:scale-105 transition duration-300 ${color}`}
    >
      <img src={imageUrl} alt="Card" className="w-full h-36 object-cover" />
      <div className="p-5 pt-0">
        <h1 className="text-2xl font-bold mb-2">{title}</h1>
        <p className="mb-4">{description}</p>
        <button
          className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg transition w-full"
          onClick={() => navigate(path || "/array")}
        >
          Mulai
        </button>
      </div>
    </div>
  );
};

export default Card;
