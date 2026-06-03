import { useNavigate } from "react-router-dom";

interface CardProps {
  title: string;
  description: string;
  color: string;
  path?: string;
}

const Card: React.FC<CardProps> = ({ title, description, color, path }) => {
  const navigate = useNavigate();

  return (
    <div
      className={`border border-black text-black w-80 h-85 rounded-xl shadow-xl overflow-hidden hover:scale-105 transition duration-300 flex flex-col justify-between ${color}`}
    >
      <div className="p-5 pt-2 text-justify">
        <h1 className="text-xl text-black font-bold mb-2 mt-1">{title}</h1>
        <p className="text-sm">{description}</p>
      </div>

      <div className="pt-0">
        <button
          className="bg-black/20 rounded-lg p-2 transition w-full hover:bg-black/30 border border-black"
          onClick={() => navigate(path || "/array")}
        >
          Mulai
        </button>
      </div>
    </div>

  );
};

export default Card;
