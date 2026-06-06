import React, { useEffect, useState } from 'react';
import './App.css';
import { createArray, getNumbers, addNextValue, addBatchValues, updateValue, deleteValue, clearArray } from './backend/array';

const ArrayComponent: React.FC = () => {
  const [numbers, setNumbers] = useState<(number | null)[]>([]);
  const [arraySize, setArraySize] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [batchValues, setBatchValues] = useState('');
  const [updateIndex, setUpdateIndex] = useState('');
  const [updateValueInput, setUpdateValueInput] = useState('');
  const [deleteIndex, setDeleteIndex] = useState('');
  const [error, setError] = useState('');
  const [closing, setClosing] = useState(false);


  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setClosing(true);

        setTimeout(() => {
          setError("");
          setClosing(false);
        }, 400); // durasi slide out
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleCreateArray = () => {
    const size = Number(arraySize);
    if (isNaN(size) || size < 1 || size > 20) {
      setError("Ukuran array harus angka antara 1–20!");
      return;
    }
    try {
      createArray(size);
      setNumbers(getNumbers());
      setError('');
    } catch (err: any) {
      setError(err.message);
    }
  };

  const generateRandomArray = () => {
    const size = Math.floor(Math.random() * 19) + 2;
    const values = Array.from({ length: size }, () => Math.floor(Math.random() * 99) + 1);
    createArray(size);
    addBatchValues(values);
    setNumbers(getNumbers());
    setError('');
  };

  useEffect(() => {
    generateRandomArray();
  }, []);

  const handleAddValue = () => {
    const val = Number(inputValue);
    if (isNaN(val)) {
      setError("Value harus angka!");
      return;
    }
    try {
      addNextValue(val);
      setNumbers(getNumbers());
      setInputValue('');
      setError('');
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleAddBatchValues = () => {
    try {
      const values = batchValues
        .split(',')
        .map(v => Number(v.trim()))
        .filter(v => !isNaN(v));

      if (values.length === 0) {
        setError("Format batch harus angka dipisah koma!");
        return;
      }

      addBatchValues(values);
      setNumbers(getNumbers());
      setBatchValues('');
      setError('');
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleUpdateValue = () => {
    const idx = Number(updateIndex);
    const val = Number(updateValueInput);
    if (isNaN(idx) || isNaN(val)) {
      setError("Indeks dan value harus angka!");
      return;
    }
    try {
      updateValue(idx, val);
      setNumbers(getNumbers());
      setUpdateIndex('');
      setUpdateValueInput('');
      setError('');
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleRandomArray = () => {
    try {
      generateRandomArray();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleClearArray = () => {
    clearArray();
    setNumbers(getNumbers());
    setError('');
  };

  const handleDeleteValue = () => {
    const idx = Number(deleteIndex);
    if (isNaN(idx)) {
      setError("Indeks harus angka!");
      return;
    }
    try {
      deleteValue(idx);
      setNumbers(getNumbers());
      setDeleteIndex('');
      setError('');
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen p-6">
      <div className="flex justify-center flex-col sm:flex-row p-5 pt-0 gap-5">
        <div className="text-left outline outline-2 rounded-xl p-6 shadow-lg">
          <div className="text-xl font-medium text-[#FE4020]">
            Array
          </div>
          <p className="text-justify mt-2">
            Array adalah struktur data linear yang menyimpan sekumpulan elemen dengan tipe data yang sama di dalam blok memori yang berurutan. Setiap elemen di dalam Array dapat diakses secara langsung melalui sebuah angka penunjuk yang disebut indeks (biasanya dimulai dari angka 0).
          </p>
        </div>

        <div className="text-left outline outline-2 rounded-xl p-6 shadow-lg">
          <div className="text-xl font-medium text-[#FE4020]">
            Analogi
          </div>
          <p className="text-justify mt-2">
            Bayangkan sebuah loker penyimpanan barang yang bernomor urut dari 0 sampai N. Jika Anda tahu nomor lokernya (indeksnya), Anda bisa langsung membuka loker tersebut secara instan tanpa perlu mengecek loker lain satu per satu.
          </p>
        </div>
      </div>

      <div className="m-5 mt-0 mb-2 p-4 flex flex-col outline outline-2 rounded-xl mb-8 shadow-lg ">
        <h1 className="text-xl font-bold text-start mb-4 mt-0">Visualisasi</h1>

        {/* Tampilan array horizontal */}
        <div className="flex gap-2 flex-wrap justify-center pb-8 min-h-[120px]">
          {numbers.map((num, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="w-12 h-12 border flex items-center justify-center text-black bg-gray-100">
                {num !== null ? num : ""}
              </div>
              <span className="text-xs tracking-wide mt-1">Index {index}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="m-2 mt-0 md:p-4 flex  ">

        {/* Section Array */}
        <div className="m-3 p-4 md:p-6 bg-[#213448] rounded-xl shadow-lg mb-8 outline outline-2 w-full">

          {/* Title */}
          <h1 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white mb-6 mt-0 text-start">
            Konfigurasi
          </h1>

          <div className="space-y-5">

            {/* Buat Array */}
            <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] items-start md:items-center gap-2 md:gap-4">
              <label className="text-start font-semibold text-gray-700 dark:text-gray-200 pt-1 md:pt-0">
                Buat Array
              </label>

              <div className="flex flex-row items-center gap-3 w-full">
                <input
                  value={arraySize}
                  onChange={(e) => setArraySize(e.target.value)}
                  placeholder="Ukuran array (1–20)"
                  className="h-11 flex-1 md:flex-initial md:w-64 border border-gray-300 dark:border-gray-600 rounded-xl px-4 bg-white dark:bg-gray-700 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-green-400 min-w-0"
                />
                <button
                  onClick={handleCreateArray}
                  className="h-11 px-4 md:min-w-[120px] bg-green-500 hover:bg-green-600 transition text-white font-medium rounded-xl shrink-0"
                >
                  Buat
                </button>
              </div>
            </div>

            {/* Add Value */}
            <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] items-start md:items-center gap-2 md:gap-4">
              <label className="text-start font-semibold text-gray-700 dark:text-gray-200 pt-1 md:pt-0">
                Add Single Value
              </label>

              <div className="flex flex-row items-center gap-3 w-full">
                <input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Value"
                  disabled={numbers.length === 0}
                  className="h-11 flex-1 md:flex-initial md:w-64 border border-gray-300 dark:border-gray-600 rounded-xl px-4 bg-white dark:bg-gray-700 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:cursor-not-allowed disabled:opacity-50 min-w-0"
                />
                <button
                  onClick={handleAddValue}
                  disabled={numbers.length === 0}
                  className="h-11 px-4 md:min-w-[120px] bg-blue-500 hover:bg-blue-600 transition text-white font-medium rounded-xl disabled:cursor-not-allowed disabled:opacity-60 shrink-0"
                >
                  Add
                </button>
              </div>
            </div>

            {/* Add Batch */}
            <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] items-start md:items-center gap-2 md:gap-4">
              <label className="text-start font-semibold text-gray-700 dark:text-gray-200 pt-1 md:pt-0">
                Add Multi Value
              </label>

              <div className="flex flex-row items-center gap-3 w-full">
                <input
                  value={batchValues}
                  onChange={(e) => setBatchValues(e.target.value)}
                  placeholder="Contoh: 1,2,3,4"
                  disabled={numbers.length === 0}
                  className="h-11 flex-1 md:flex-initial md:w-64 border border-gray-300 dark:border-gray-600 rounded-xl px-4 bg-white dark:bg-gray-700 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-400 disabled:cursor-not-allowed disabled:opacity-50 min-w-0"
                />
                <button
                  onClick={handleAddBatchValues}
                  disabled={numbers.length === 0}
                  className="h-11 px-4 md:min-w-[120px] bg-purple-500 hover:bg-purple-600 transition text-white font-medium rounded-xl disabled:cursor-not-allowed disabled:opacity-60 shrink-0"
                >
                  Add
                </button>
              </div>
            </div>

            {/* Aksi Cepat */}
            <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] items-start md:items-center gap-2 md:gap-4">
              <label className="text-start font-semibold text-gray-700 dark:text-gray-200 pt-1 md:pt-0">
                Aksi Cepat
              </label>
              <div className="flex items-center gap-3 w-full">
                <button
                  onClick={handleRandomArray}
                  className="h-11 flex-1 md:flex-none md:min-w-[140px] bg-blue-500 hover:bg-blue-600 transition text-white font-medium rounded-xl"
                >
                  Random
                </button>
                <button
                  onClick={handleClearArray}
                  disabled={numbers.length === 0}
                  className="h-11 flex-1 md:flex-none md:min-w-[140px] bg-red-500 hover:bg-red-600 transition text-white font-medium rounded-xl disabled:cursor-not-allowed disabled:opacity-60"
                >
                  Clear Array
                </button>
              </div>
            </div>

            {/* Update Value */}
            <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] items-start md:items-center gap-2 md:gap-4">
              <label className="text-start font-semibold text-gray-700 dark:text-gray-200 pt-1 md:pt-0">
                Update Value
              </label>

              <div className="flex flex-row items-center gap-3 w-full">
                <input
                  value={updateIndex}
                  onChange={(e) => setUpdateIndex(e.target.value)}
                  placeholder="Index"
                  disabled={numbers.length === 0}
                  className="h-11 w-20 md:w-28 border border-gray-300 dark:border-gray-600 rounded-xl px-4 bg-white dark:bg-gray-700 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 disabled:cursor-not-allowed disabled:opacity-50 min-w-0"
                />
                <input
                  value={updateValueInput}
                  onChange={(e) => setUpdateValueInput(e.target.value)}
                  placeholder="Value baru"
                  disabled={numbers.length === 0}
                  className="h-11 flex-1 md:flex-initial md:w-32 border border-gray-300 dark:border-gray-600 rounded-xl px-4 bg-white dark:bg-gray-700 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 disabled:cursor-not-allowed disabled:opacity-50 min-w-0"
                />
                <button
                  onClick={handleUpdateValue}
                  disabled={numbers.length === 0}
                  className="h-11 px-4 md:min-w-[120px] bg-yellow-500 hover:bg-yellow-600 transition text-white font-medium rounded-xl disabled:cursor-not-allowed disabled:opacity-60 shrink-0"
                >
                  Update
                </button>
              </div>
            </div>

            {/* Delete Value */}
            <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] items-start md:items-center gap-2 md:gap-4">
              <label className="text-start font-semibold text-gray-700 dark:text-gray-200 pt-1 md:pt-0">
                Delete Value
              </label>

              <div className="flex flex-row items-center gap-3 w-full">
                <input
                  value={deleteIndex}
                  onChange={(e) => setDeleteIndex(e.target.value)}
                  placeholder="Index"
                  disabled={numbers.length === 0}
                  className="h-11 flex-1 md:flex-initial md:w-28 border border-gray-300 dark:border-gray-600 rounded-xl px-4 bg-white dark:bg-gray-700 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-red-400 disabled:cursor-not-allowed disabled:opacity-50 min-w-0"
                />
                <button
                  onClick={handleDeleteValue}
                  disabled={numbers.length === 0}
                  className="h-11 px-4 md:min-w-[120px] bg-red-500 hover:bg-red-600 transition text-white font-medium rounded-xl disabled:cursor-not-allowed disabled:opacity-60 shrink-0"
                >
                  Delete
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Error Popup */}
      {error && (<div
        className={`fixed top-5 right-5 z-50 ${closing ? "animate-slide-out" : "animate-slide-in"
          }`}
      >
        <div className="bg-red-500 text-white px-5 py-3 rounded-xl shadow-lg flex items-center gap-3 min-w-[300px] ">


          {/* Error Text */}
          <p className="flex-1">{error}</p>

          {/* Close Button */}
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
  );
};


export default ArrayComponent;
