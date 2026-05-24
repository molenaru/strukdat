import { Routes, Route } from "react-router-dom";
import Nav from "./Navbar";
import Card from "./components/Card";

function App() {
  return (
    <div className="min-h-screen">

      <Nav />

      {/* title */}
      <div className="mx-auto flex max-w-3xl items-center gap-x-4 rounded-xl bg-white p-6 shadow-lg outline outline-black/5 dark:bg-slate-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10 mt-10">
        <div className="text-left">
          <div className="text-xl font-medium text-black dark:text-white">Struktur Data</div>
          <p className="text-gray-500 dark:text-gray-400">Memahami alur struktur data dengan visualisasi</p>
        </div>
         <img className="size-12 shrink-0" src="/logo.png" alt="Logo" />
      </div>


      {/* card */}
      <div className="rounded-xl bg-gradient-to-br from-[#c9af3a] via-[#e8e8a5] to-[#53aaed] m-20">

        <div className="flex justify-start pl-10">
          <h1 className="text-4xl font-bold">Struktur Data</h1>
        </div>

        <div className="flex justify-center p-10 pt-0 gap-10 flex-wrap">
          <Card
            title="Bubble Sort"
            description="Ini adalah deskripsi Bubble sort"
            imageUrl="https://cirebonkota.go.id/storage/1/posts/20251209/fEWS497K1H4PCt54rWZE1LGVOXxuoTPYVt9TKAKGZE9V7cWKAtrgFuKuGfLI.jpg"
            color="bg-[#c9af3a]"
          />

          <Card
            title="Bubble Sort"
            description="Ini adalah deskripsi Bubble sort"
            imageUrl="https://cirebonkota.go.id/storage/1/posts/20251209/fEWS497K1H4PCt54rWZE1LGVOXxuoTPYVt9TKAKGZE9V7cWKAtrgFuKuGfLI.jpg"
            color="bg-[#e8e8a5]"
          />

          <Card
            title="Bubble Sort"
            description="Ini adalah deskripsi Bubble sort"
            imageUrl="https://cirebonkota.go.id/storage/1/posts/20251209/fEWS497K1H4PCt54rWZE1LGVOXxuoTPYVt9TKAKGZE9V7cWKAtrgFuKuGfLI.jpg"
            color="bg-[#53aaed]"
          />

          <Card
            title="Bubble Sort"
            description="Ini adalah deskripsi Bubble sort"
            imageUrl="https://cirebonkota.go.id/storage/1/posts/20251209/fEWS497K1H4PCt54rWZE1LGVOXxuoTPYVt9TKAKGZE9V7cWKAtrgFuKuGfLI.jpg"
            color="bg-[#53aaed]"
          />

          <Card
            title="Bubble Sort"
            description="Ini adalah deskripsi Bubble sort"
            imageUrl="https://cirebonkota.go.id/storage/1/posts/20251209/fEWS497K1H4PCt54rWZE1LGVOXxuoTPYVt9TKAKGZE9V7cWKAtrgFuKuGfLI.jpg"
            color="bg-[#53aaed]"
          />


        </div>
      </div>

    </div>
  );
}

export default App;