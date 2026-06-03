import React, { useEffect, useState } from "react";
import {
  createArray,
  getNumbers,
  addBatchValues,
  clearArray,
  sortNumbers,
  getSortSteps,
} from "./backend/sorting";
import type { SortStep } from "./backend/sorting";

const SortingComponent: React.FC = () => {
  const [numbers, setNumbers] = useState<(number | null)[]>([]);
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

  const visibleNumbers = isSorting && steps.length > 0 ? steps[activeStep].array : numbers.map((item) => item ?? "");
  const activeIndices = isSorting && steps.length > 0 ? steps[activeStep].activeIndices : [];
  const currentMessage = isSorting && steps.length > 0 ? steps[activeStep].message : "";

  useEffect(() => {
    if (!isSorting || steps.length === 0) {
      return;
    }

    const interval = window.setInterval(() => {
      setActiveStep((prevStep) => {
        if (prevStep >= steps.length - 1) {
          window.clearInterval(interval);
          setIsSorting(false);
          try {
            sortNumbers(algorithm, direction);
            refreshNumbers();
          } catch (err: any) {
            setError(err.message);
          }
          return prevStep;
        }
        return prevStep + 1;
      });
    }, speed);

    return () => window.clearInterval(interval);
  }, [isSorting, steps, algorithm, direction, speed]);

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
  };

  const handleRandomArray = () => {
    try {
      const size = Math.floor(Math.random() * 19) + 2;
      const values = Array.from({ length: size }, () => Math.floor(Math.random() * 99) + 1);
      createArray(size);
      addBatchValues(values);
      refreshNumbers();
      setError("");
    } catch (err: any) {
      setError(err.message);
    }
    setSteps([]);
  };

  const handleClearArray = () => {
    clearArray();
    refreshNumbers();
    setBatchValues("");
    setError("");
    setSteps([]);
  };

  const handleSort = () => {
    try {
      const newSteps = getSortSteps(algorithm, direction);
      setSteps(newSteps);
      setActiveStep(0);
      setIsSorting(true);
      setError("");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="bg-white min-h-screen p-6">
      <h2 className="text-2xl font-bold mb-4 text-black">Sorting</h2>

      <div className="container mx-auto p-4 flex flex-col bg-gray-800 rounded-xl mb-8">
        <h1 className="text-xl font-bold text-black dark:text-white text-start mb-4 mt-0">
          Sorting Visualizer
        </h1>

        <div className="flex gap-2 flex-wrap justify-center pb-8 min-h-[120px]">
          {visibleNumbers.map((num, index) => {
            const isActive = activeIndices.includes(index);
            return (
              <div key={index} className="flex flex-col items-center">
                <div
                  className={`w-12 h-12 border flex items-center justify-center text-black bg-gray-100 transition duration-300 ${
                    isActive ? "border-2 border-blue-500 bg-blue-100" : ""
                  }`}
                >
                  {num}
                </div>
                <span className="text-white text-sm">{index}</span>
              </div>
            );
          })}
        </div>
        {currentMessage && (
          <p className="text-sm text-blue-200 text-center mt-2">{currentMessage}</p>
        )}
      </div>

      <div className="container mx-auto p-4 bg-white flex">
        <div className="mx-auto p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg mb-8 border border-gray-200 dark:border-gray-700 w-full">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 mt-0 text-start">
            Konfigurasi Sorting
          </h1>

          <div className="space-y-5">
            <div className="grid grid-cols-[180px_1fr] items-center gap-4">
              <label className="text-start font-semibold text-gray-700 dark:text-gray-200">
                Add Batch
              </label>
              <div className="flex items-center gap-3 flex-wrap">
                <input
                  value={batchValues}
                  onChange={(e) => setBatchValues(e.target.value)}
                  placeholder="Contoh: 1,2,3,4"
                  disabled={isSorting}
                  className="h-11 w-64 border border-gray-300 dark:border-gray-600 rounded-xl px-4 bg-white dark:bg-gray-700 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-400 disabled:cursor-not-allowed disabled:opacity-50"
                />
                <button
                  onClick={handleLoadBatchValues}
                  disabled={isSorting}
                  className="h-11 min-w-[120px] bg-purple-500 hover:bg-purple-600 transition text-white font-medium rounded-xl disabled:cursor-not-allowed disabled:opacity-60"
                >
                  Muat Batch
                </button>
              </div>
            </div>

            <div className="grid grid-cols-[180px_1fr] items-center gap-4">
              <label className="text-start font-semibold text-gray-700 dark:text-gray-200">
                Aksi Cepat
              </label>
              <div className="flex items-center gap-3 flex-wrap">
                <button
                  onClick={handleRandomArray}
                  disabled={isSorting}
                  className="h-11 min-w-[140px] bg-blue-500 hover:bg-blue-600 transition text-white font-medium rounded-xl disabled:cursor-not-allowed disabled:opacity-60"
                >
                  Random
                </button>
                <button
                  onClick={handleClearArray}
                  disabled={isSorting || numbers.length === 0}
                  className="h-11 min-w-[140px] bg-red-500 hover:bg-red-600 transition text-white font-medium rounded-xl disabled:cursor-not-allowed disabled:opacity-60"
                >
                  Clear Array
                </button>
              </div>
            </div>

            <div className="grid grid-cols-[180px_1fr] items-center gap-4">
              <label className="text-start font-semibold text-gray-700 dark:text-gray-200">
                Pilih Algoritma
              </label>
              <div className="flex items-center gap-3 flex-wrap">
                <select
                  value={algorithm}
                  onChange={(e) => setAlgorithm(e.target.value as "bubble" | "selection" | "insertion")}
                  className="h-11 w-64 border border-gray-300 dark:border-gray-600 rounded-xl px-4 bg-white dark:bg-gray-700 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
                >
                  <option value="bubble">Bubble Sort</option>
                  <option value="selection">Selection Sort</option>
                  <option value="insertion">Insertion Sort</option>
                </select>
                <select
                  value={direction}
                  onChange={(e) => setDirection(e.target.value as "asc" | "desc")}
                  className="h-11 w-40 border border-gray-300 dark:border-gray-600 rounded-xl px-4 bg-white dark:bg-gray-700 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
                >
                  <option value="asc">Ascending</option>
                  <option value="desc">Descending</option>
                </select>
                <button
                  onClick={handleSort}
                  disabled={isSorting || numbers.length === 0}
                  className="h-11 min-w-[120px] bg-slate-900 hover:bg-black transition text-white font-medium rounded-xl disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSorting ? "Sorting..." : "Sort"}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-[180px_1fr] items-center gap-4">
              <label className="text-start font-semibold text-gray-700 dark:text-gray-200">
                Kecepatan
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min={100}
                  max={1000}
                  value={speed}
                  disabled={isSorting}
                  onChange={(e) => setSpeed(Number(e.target.value))}
                  className="w-64"
                />
                <span className="text-gray-700 dark:text-gray-200">{speed} ms</span>
              </div>
            </div>
          </div>

          {error && (
            <div
              className={`fixed top-5 right-5 z-50 ${closing ? "animate-slide-out" : "animate-slide-in"}`}
            >
              <div className="bg-red-500 text-white px-5 py-3 rounded-xl shadow-lg flex items-center gap-3 min-w-[300px] ">
                <p className="flex-1">{error}</p>
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
