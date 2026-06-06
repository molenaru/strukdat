import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  createArray,
  getNumbers,
  addBatchValues,
  clearArray,
  getSortSteps,
} from "./backend/sorting";
import type { SortStep, SortItem } from "./backend/sorting"; // Pastikan SortItem di-import

const SortingComponent: React.FC = () => {
  // 1. Ubah state numbers agar menyimpan objek SortItem murni dari backend, bukan hanya angka!
  const [numbers, setNumbers] = useState<SortItem[]>([]);
  const [batchValues, setBatchValues] = useState("");
  const [algorithm, setAlgorithm] = useState<"bubble" | "selection" | "insertion">("bubble");
  const [direction, setDirection] = useState<"asc" | "desc">("asc");
  const [error, setError] = useState("");
  const [closing, setClosing] = useState(false);
  const [steps, setSteps] = useState<SortStep[]>([]);
  const [activeStep, setActiveStep] = useState(0);
  const [isSorting, setIsSorting] = useState(false);
  const [speed, setSpeed] = useState(400);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setClosing(true);
        setTimeout(() => {
          setError("");
          setClosing(false);
        }, 400);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  // Ambil objek utuh dari backend
  const refreshNumbers = () => setNumbers(getNumbers());

  const generateRandomArray = () => {
    const size = Math.floor(Math.random() * 19) + 2;
    const values = Array.from({ length: size }, () => Math.floor(Math.random() * 99) + 1);
    createArray(size);
    addBatchValues(values);
    refreshNumbers();
    setError("");
  };

  useEffect(() => {
    generateRandomArray();
  }, []);

  // 2. KUNCI UTAMA: visibleNumbers sekarang dijamin memiliki ID yang stabil dari backend
  const visibleNumbers: SortItem[] =
    steps.length > 0
      ? steps[Math.min(activeStep, steps.length - 1)].array
      : numbers;

  const activeIndices = isSorting && steps.length > 0 ? steps[activeStep].activeIndices : [];
  const currentMessage = isSorting && steps.length > 0 ? steps[activeStep].message : "";

  useEffect(() => {
    if (!isSorting || steps.length === 0) return;

    const interval = setInterval(() => {
      setActiveStep((prev) => {
        if (prev >= steps.length - 1) {
          clearInterval(interval);
          setIsSorting(false);
          return prev;
        }
        return prev + 1;
      });
    }, speed);

    return () => clearInterval(interval);
  }, [isSorting, steps, speed]);

  const handleLoadBatchValues = () => {
    try {
      const values = batchValues
        .split(",")
        .map((item) => Number(item.trim()))
        .filter((item) => !isNaN(item));

      if (values.length === 0) {
        setError("Format batch harus angka yang dipisah koma!");
        return;
      }
      if (values.length > 20) {
        setError("Batch hanya boleh berisi maksimal 20 angka!");
        return;
      }

      createArray(values.length);
      addBatchValues(values);
      refreshNumbers();
      setBatchValues("");
      setError("");
    } catch (err: any) {
      setError(err.message);
    }
    setSteps([]);
    setActiveStep(0);
  };

  const handleRandomArray = () => {
    try {
      generateRandomArray();
    } catch (err: any) {
      setError(err.message);
    }
    setSteps([]);
    setActiveStep(0);
  };

  const handleClearArray = () => {
    clearArray();
    refreshNumbers();
    setBatchValues("");
    setError("");
    setSteps([]);
    setActiveStep(0);
  };

  // 3. FUNGSI SORT CLEAN & RESET
  const handleSort = () => {
    if (numbers.length === 0) return;

    try {
      // Ambil data langkah baru berdasarkan kondisi state backend saat ini
      const newSteps = getSortSteps(algorithm, direction);

      if (newSteps.length <= 1) {
        setError("Array sudah terurut!");
        return;
      }

      // Reset step dulu ke 0 sebelum memulai jalannya interval baru
      setActiveStep(0);
      setSteps(newSteps);
      setIsSorting(true);
      setError("");
    } catch (err: any) {
      setError(err.message);
    }
  };

  const maxValue = Math.max(...visibleNumbers.map((item) => item.value), 1);

  return (
    <div className="min-h-screen p-6">
      <div className="flex justify-center flex-col sm:flex-row p-5 pt-0 gap-5">
        <div className="text-left outline outline-2 rounded-xl p-6 shadow-lg">
          <div className="text-xl font-medium text-[#FE4020]">
            Sorting
          </div>
          <p className="text-justify mt-2">
            Sorting bukanlah wadah penyimpanan data (struktur data), melainkan sebuah algoritma atau prosedur langkah-demi-langkah untuk menyusun kembali elemen-elemen di dalam suatu struktur data (seperti Array) ke dalam urutan tertentu baik secara urutan naik (ascending, dari kecil ke besar) maupun urutan turun (descending, dari besar ke kecil).</p>

        </div>

        <div className="text-left outline outline-2 rounded-xl p-6 shadow-lg">
          <div className="text-xl font-medium text-[#FE4020]">
            Analogi
          </div>
          <p className="text-justify mt-2">
           Algoritma pengurutan paling sederhana (BubbleSort) yang bekerja dengan cara membandingkan dua elemen yang bersebelahan, lalu menukar posisinya jika urutannya salah. Proses ini diulang terus-menerus sampai seluruh data rapi. Elemen terbesar akan perlahan "mengapung" ke posisi akhir seperti gelembung udara di dalam air.
           </p>
        </div>
      </div>



      <div className="m-5 mt-0 p-4 flex outline outline-2 flex-col rounded-xl mb-8">
        <h1 className="text-xl font-bold text-start mb-4 mt-0">
          Visualisasi
        </h1>

        <div className="flex gap-2 flex-wrap justify-center pb-8 min-h-[120px]">
          <AnimatePresence initial={false}>
            {visibleNumbers.map((item, index) => {
              const isActive = activeIndices.includes(index);

              return (
                <motion.div
                  key={item.id} // <--- SEKARANG DIJAMIN STABIL DAN UNIK TERUS MEMBAWA ID ASLI
                  layout="position"
                  transition={{
                    layout: { duration: 0.4 },
                  }}
                  className="flex flex-col items-center justify-end"
                >
                  <span className="text-xs font-semibold mb-1">
                    {item.value}
                  </span>

                  <motion.div
                    animate={{
                      height: Math.max((item.value / maxValue) * 180, 40),
                    }}
                    transition={{ duration: 0.3 }}
                    className={`w-12 border flex items-center justify-center ${isActive ? "bg-blue-400 border-blue-600" : "bg-gray-200 border-gray-400"
                      }`}
                  />

                  <span className="text-xs mt-1">{index}</span>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
        {currentMessage && (
          <p className="text-md text-blue-400 text-center mt-2">{currentMessage}</p>
        )}
      </div>

      <div className="m-0 p-0 sm:m-5 sm:p-4">
  <div className="p-4 sm:p-6 rounded-xl bg-[#213448] shadow-lg mb-8 outline outline-2 outline-gray-700 w-full box-border">
    <h1 className="text-xl sm:text-2xl font-bold text-white mb-6 mt-0 text-start">
      Konfigurasi
    </h1>

    <div className="space-y-5">
      {/* Add */}
      <div className="grid grid-cols-1 lg:grid-cols-[180px_1fr] items-start lg:items-center gap-2 lg:gap-4">
        <label className="text-start font-semibold text-gray-200 text-sm sm:text-base pt-1 lg:pt-0">
          Add
        </label>

        <div className="flex items-center gap-2 sm:gap-3 flex-wrap w-full">
          <input
            value={batchValues}
            onChange={(e) => setBatchValues(e.target.value)}
            placeholder="Contoh: 1,2,3,4"
            disabled={isSorting}
            className="h-10 sm:h-11 flex-1 sm:flex-none w-full sm:w-52 md:w-64 border border-gray-600 rounded-xl px-3 sm:px-4 bg-white dark:bg-gray-700 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-400 disabled:cursor-not-allowed disabled:opacity-50 min-w-0"
          />

          <button
            onClick={handleLoadBatchValues}
            disabled={isSorting}
            className="h-10 sm:h-11 flex-1 sm:flex-none px-4 sm:px-6 bg-purple-500 hover:bg-purple-600 transition text-white text-sm sm:text-base font-medium rounded-xl disabled:cursor-not-allowed disabled:opacity-60 whitespace-nowrap shrink-0"
          >
            Add
          </button>
        </div>
      </div>

      {/* Aksi Cepat */}
      <div className="grid grid-cols-1 lg:grid-cols-[180px_1fr] items-start lg:items-center gap-2 lg:gap-4">
        <label className="text-start font-semibold text-gray-200 text-sm sm:text-base pt-1 lg:pt-0">
          Aksi Cepat
        </label>

        <div className="flex items-center gap-2 sm:gap-3 flex-wrap w-full">
          <button
            onClick={handleRandomArray}
            disabled={isSorting}
            className="h-10 sm:h-11 flex-1 sm:flex-none px-4 sm:px-6 bg-blue-500 hover:bg-blue-600 transition text-white text-sm sm:text-base font-medium rounded-xl disabled:cursor-not-allowed disabled:opacity-60 whitespace-nowrap shrink-0"
          >
            Random
          </button>

          <button
            onClick={handleClearArray}
            disabled={isSorting || numbers.length === 0}
            className="h-10 sm:h-11 flex-1 sm:flex-none px-4 sm:px-6 bg-red-500 hover:bg-red-600 transition text-white text-sm sm:text-base font-medium rounded-xl disabled:cursor-not-allowed disabled:opacity-60 whitespace-nowrap shrink-0"
          >
            Clear Array
          </button>
        </div>
      </div>

      {/* Pilih Algoritma */}
      <div className="grid grid-cols-1 lg:grid-cols-[180px_1fr] items-start lg:items-center gap-2 lg:gap-4">
        <label className="text-start font-semibold text-gray-200 text-sm sm:text-base pt-1 lg:pt-0">
          Pilih Algoritma
        </label>

        <div className="flex items-center gap-2 sm:gap-3 flex-wrap w-full">
          <select
            value={algorithm}
            onChange={(e) =>
              setAlgorithm(
                e.target.value as "bubble" | "selection" | "insertion"
              )
            }
            className="h-10 text-xs sm:h-11 flex-1 sm:flex-none w-full sm:w-44 md:w-56 border border-gray-600 rounded-xl px-3 sm:px-4 bg-white text-black focus:outline-none focus:ring-2 focus:ring-indigo-400 min-w-0"
          >
            <option value="bubble">Bubble Sort</option>
            <option value="selection">Selection Sort</option>
            <option value="insertion">Insertion Sort</option>
          </select>

          <select
            value={direction}
            onChange={(e) =>
              setDirection(e.target.value as "asc" | "desc")
            }
            className="h-10 text-xs sm:h-11 flex-1 sm:flex-none w-full sm:w-36 border border-gray-600 rounded-xl px-3 sm:px-4 bg-white text-black focus:outline-none focus:ring-2 focus:ring-indigo-400 min-w-0"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>

          <button
            onClick={handleSort}
            disabled={isSorting || numbers.length === 0}
            className="h-10 sm:h-11 flex-1 sm:flex-none px-4 sm:px-6 bg-indigo-500 hover:bg-indigo-600 transition text-white text-sm sm:text-base font-medium rounded-xl disabled:cursor-not-allowed disabled:opacity-60 whitespace-nowrap shrink-0"
          >
            {isSorting ? "Sorting..." : "Sort"}
          </button>
        </div>
      </div>

      {/* Kecepatan */}
      <div className="grid grid-cols-1 lg:grid-cols-[180px_1fr] items-start lg:items-center gap-2 lg:gap-4">
        <label className="text-start font-semibold text-gray-200 text-sm sm:text-base pt-1 lg:pt-0">
          Kecepatan
        </label>

        <div className="flex items-center gap-3 flex-wrap w-full">
          <input
            type="range"
            min={100}
            max={1000}
            value={speed}
            disabled={isSorting}
            onChange={(e) => setSpeed(Number(e.target.value))}
            className="flex-1 sm:flex-none w-full sm:w-48 md:w-56 lg:w-64 accent-indigo-400"
          />

          <span className="text-sm sm:text-base text-gray-200 font-medium whitespace-nowrap">
            {speed} ms
          </span>
        </div>
      </div>
    </div>

    {/* Error Popup */}
    {error && (
      <div className={`fixed top-5 right-2 sm:right-5 z-50 ${closing ? "animate-slide-out" : "animate-slide-in"}`}>
        <div className="bg-red-500 text-white px-4 py-3 rounded-xl shadow-lg flex items-center gap-3 min-w-[250px] sm:min-w-[300px] max-w-[90vw]">
          <p className="flex-1 text-sm sm:text-base break-words">
            {error}
          </p>
          <button
            onClick={() => setError("")}
            className="font-bold hover:opacity-70"
          >
            ✕
          </button>
        </div>
      </div>
    )}
  </div>
</div>

    </div>
  );
};

export default SortingComponent;
