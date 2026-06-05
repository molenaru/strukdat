import { Routes, Route } from "react-router-dom";
import Nav from "./Navbar";
import Footer from "./Footer";
import Card from "./components/Card";
import ArrayComponent from "./Array";
import SortingComponent from "./sorting";
import QueueComponent from "./queue";
import StackComponent from "./stack";

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

              {/* <img src="/logo.png" className="h-60 mx-auto items-center p-0 m-0"  alt="" /> */}
              {/* title */}
              <div className="m-5 items-center
               flex rounded-xl p-6 shadow-lg outline outline-2 mt-10">
                <div className="text-left">
                  <div className="text-xl font-medium text-[#3994A3]">
                    EduStruct
                  </div>
                  <p className="text-justify mt-2">
                    EduStruct adalah website yang menyediakan materi tentang struktur data dan algoritma dasar. Materi yang di visualisasikan untuk meningkatkan pemahaman struktur data tidak hanya visual saja tapi dapat berinteraktif. Materi yang tersedia tentang Array, Sorting, Queue dan Stack.
                  </p>
                </div>
              </div>

              <div className="flex justify-center flex-col sm:flex-row p-5 pt-0 gap-5">
                <div className="text-left outline outline-2 rounded-xl p-6 shadow-lg">
                  <div className="text-xl font-medium text-[#FE4020]">
                    Struktur Data
                  </div>
                  <p className="text-justify mt-2">
                    Apa itu Struktur Data? Struktur Data adalah cara sistematis untuk mengatur, menyimpan, dan mengelola data di dalam komputer agar dapat diakses dan dimodifikasi secara efisien. Menguasai struktur data adalah kunci utama untuk menulis kode yang lebih cepat, hemat memori, dan mampu menyelesaikan masalah rumit (problem-solving) layaknya seorang Software Engineer profesional.
                  </p>
                </div>

                <div className="text-left outline outline-2 rounded-xl p-6 shadow-lg">
                  <div className="text-xl font-medium text-[#FE4020]">
                    Struktur Data Penting? 
                  </div>
                  <p className="text-justify mt-2">
                    Mengapa Struktur Data Penting? Di dunia pemrograman, data bukan sekadar angka atau teks. Struktur Data adalah fondasi yang menentukan bagaimana data dikelola. Dengan memilih struktur data yang tepat seperti Array, Stack, atau Queue aplikasi akan berjalan jauh lebih optimal, responsif, dan mudah dikembangkan.
                  </p>
                </div>
              </div>

              {/* card */}
              <div className="rounded-xl outline outline-2 m-5">
                <div className="flex justify-start pl-10">
                  <h1 className="text-4xl text-[#FE3E20] font-bold text-leftr">Modul Pembelajaran</h1>
                </div>

                <div className="flex justify-center p-5 pt-0 gap-10 flex-wrap">
                  <Card
                    title="Array"
                    description="Array adalah struktur data linear yang menyimpan sekumpulan elemen dengan tipe data yang sama di dalam blok memori yang berurutan. Setiap elemen di dalam Array dapat diakses secara langsung melalui sebuah angka penunjuk yang disebut indeks (biasanya dimulai dari angka 0)."
                    color="bg-[#fd5f44]"
                    path="/array"
                  />

                  <Card
                    title="Sorting"
                    description="Sorting bukanlah wadah penyimpanan data (struktur data), melainkan sebuah algoritma atau prosedur langkah-demi-langkah untuk menyusun kembali elemen-elemen di dalam suatu struktur data (seperti Array) ke dalam urutan tertentu baik secara urutan naik (ascending, dari kecil ke besar) maupun urutan turun (descending, dari besar ke kecil)."
                    color="bg-[#FD8534]"
                    path="/sorting"
                  />

                  <Card
                    title="Queue"
                    description="Queue adalah struktur data linear yang menerapkan prinsip FIFO (First In, First Out). Artinya, elemen yang pertama kali dimasukkan ke dalam antrean akan menjadi elemen yang pertama kali dikeluarkan."
                    color="bg-[#FDDB5A]"
                    path="/queue"
                  />

                  <Card
                    title="Stack"
                    description="Berkebalikan dengan Queue, Stack adalah struktur data linear yang menerapkan prinsip LIFO (Last In, First Out). Elemen yang paling terakhir dimasukkan ke dalam tumpukan justru akan menjadi elemen yang pertama kali dikeluarkan."
                    color="bg-[#3A95A4]"
                    path="/stack"
                  />

                  {/* <Card
                    title="Linked List"
                    description="Linked list adalah struktur data linier yang digunakan untuk menyimpan koleksi elemen. Berbeda dengan array konvensional yang menyimpan elemennya di lokasi memori yang berdekatan (kontigu), elemen-elemen pada linked list tersebar di memori namun saling terhubung menggunakan penunjuk (pointer)."
                    color="bg-[#53aaed]"
                    path="/linked-list"
                  /> */}
                </div>
              </div>
            </div>
          }
        />
        {/* Halaman array */}
        <Route path="/array" element={<ArrayComponent />} />
        <Route path="/sorting" element={<SortingComponent />} />
        <Route path="/queue" element={<QueueComponent />} />
        <Route path="/stack" element={<StackComponent />} />
      </Routes>

      <Footer />
    </div>
    
  );
}
export default App;
