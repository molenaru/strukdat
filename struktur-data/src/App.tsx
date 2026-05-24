import { Routes, Route } from "react-router-dom";
import Nav from "./Navbar";
import Card from "./components/Card";
import ArrayComponent from "./Array";

function App() {
  return (
    <div className="min-h-screen">
      <Nav />

      {/* title */}
      <Routes>
        {/* Halaman utama */}
        <Route
          path="/"
          element={
            <div>
              {/* title */}
              <div className="mx-auto flex max-w-3xl items-center gap-x-4 rounded-xl bg-white p-6 shadow-lg outline outline-black/5 dark:bg-slate-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10 mt-10">
                <div className="text-left">
                  <div className="text-xl font-medium text-black dark:text-white">
                    Struktur Data
                  </div>
                  <p className="text-gray-500 dark:text-gray-400">
                    Memahami alur struktur data dengan visualisasi
                  </p>
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
                    title="Array"
                    description="Ini adalah deskripsi Array"
                    imageUrl="https://cirebonkota.go.id/storage/1/posts/20251209/fEWS497K1H4PCt54rWZE1LGVOXxuoTPYVt9TKAKGZE9V7cWKAtrgFuKuGfLI.jpg"
                    color="bg-[#c9af3a]"
                    path="/array"
                  />

                  <Card
                    title="Sorting"
                    description="Ini adalah deskripsi Sorting"
                    imageUrl="https://cirebonkota.go.id/storage/1/posts/20251209/fEWS497K1H4PCt54rWZE1LGVOXxuoTPYVt9TKAKGZE9V7cWKAtrgFuKuGfLI.jpg"
                    color="bg-[#e8e8a5]"
                    path="/sorting"
                  />

                  <Card
                    title="Queue"
                    description="Ini adalah deskripsi Queue"
                    imageUrl="https://cirebonkota.go.id/storage/1/posts/20251209/fEWS497K1H4PCt54rWZE1LGVOXxuoTPYVt9TKAKGZE9V7cWKAtrgFuKuGfLI.jpg"
                    color="bg-[#53aaed]"
                    path="/queue"
                  />

                  <Card
                    title="Stack"
                    description="Ini adalah deskripsi Stack"
                    imageUrl="https://cirebonkota.go.id/storage/1/posts/20251209/fEWS497K1H4PCt54rWZE1LGVOXxuoTPYVt9TKAKGZE9V7cWKAtrgFuKuGfLI.jpg"
                    color="bg-[#53aaed]"
                    path="/stack"
                  />

                  <Card
                    title="Linked List"
                    description="Ini adalah deskripsi Linked List"
                    imageUrl="https://cirebonkota.go.id/storage/1/posts/20251209/fEWS497K1H4PCt54rWZE1LGVOXxuoTPYVt9TKAKGZE9V7cWKAtrgFuKuGfLI.jpg"
                    color="bg-[#53aaed]"
                    path="/linked-list"
                  />
                </div>
              </div>
            </div>
          }
        />
        {/* Halaman array */}
        <Route path="/array" element={<ArrayComponent />} />
      </Routes>
    </div>
  );
}
export default App;
