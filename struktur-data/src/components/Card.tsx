// components/Card.tsx

function Card() {
  return (
    <div className="w-80 rounded-2xl shadow-xl overflow-hidden hover:scale-105 transition duration-300">

      <img
        src="https://picsum.photos/300/200"
        alt="Card"
        className="w-full h-48 object-cover"
      />

      <div className="p-5">

        <h1 className="text-2xl font-bold  mb-2">
          Bubble Sort
        </h1>

        <p className="mb-4">
          Algoritma sorting sederhana menggunakan perbandingan antar elemen.
        </p>

        <button className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg transition">
          Selengkapnya
        </button>

      </div>
    </div>
  );
}

export default Card;