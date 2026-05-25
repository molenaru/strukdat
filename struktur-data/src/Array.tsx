import React, { useEffect, useState } from 'react';
import './App.css';
import { createArray, getNumbers, addNextValue, addBatchValues, updateValue, deleteValue } from './backend/array';

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
    <div className="bg-white min-h-screen p-6">
      <h2 className="text-2xl font-bold mb-4 text-black">Array</h2>

      <div className="container mx-auto p-4 flex flex-col bg-gray-800 rounded-xl mb-8 ">
        <h1 className="text-xl font-bold text-black dark:text-white text-start mb-4 mt-0">Array</h1>

        {/* Tampilan array horizontal */}
        <div className="flex gap-2 flex-wrap justify-center pb-8">
          {numbers.map((num, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="w-12 h-12 border flex items-center justify-center text-black bg-gray-100">
                {num !== null ? num : ""}
              </div>
              <span className="text-white text-sm">{index}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="container mx-auto p-4 bg-white flex">


        {/* section array */}
        <div className="mx-auto p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg mb-8 border border-gray-200 dark:border-gray-700">

          {/* Title */}
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 mt-0  text-start">
            Buat Array
          </h1>

          <div className="space-y-5">

            {/* Buat Array */}
            <div className="grid grid-cols-[180px_1fr] items-center gap-4">
              <label className="text-start font-semibold text-gray-700 dark:text-gray-200">
                Buat Array
              </label>

              <div className="flex items-center gap-3">
                <input
                  value={arraySize}
                  onChange={(e) => setArraySize(e.target.value)}
                  placeholder="Ukuran array (1–20)"
                  className="h-11 w-64 border border-gray-300 dark:border-gray-600 rounded-xl px-4 bg-white dark:bg-gray-700 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-green-400"
                />

                <button
                  onClick={handleCreateArray}
                  className="h-11 min-w-[120px] bg-green-500 hover:bg-green-600 transition text-white font-medium rounded-xl"
                >
                  Buat
                </button>
              </div>
            </div>

            {/* Add Value */}
            {numbers.length > 0 && (
              <div className="grid grid-cols-[180px_1fr] items-center gap-4">
                <label className="text-start font-semibold text-gray-700 dark:text-gray-200">
                  Add Value
                </label>

                <div className="flex items-center gap-3">
                  <input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Value"
                    className="h-11 w-64 border border-gray-300 dark:border-gray-600 rounded-xl px-4 bg-white dark:bg-gray-700 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />

                  <button
                    onClick={handleAddValue}
                    className="h-11 min-w-[120px] bg-blue-500 hover:bg-blue-600 transition text-white font-medium rounded-xl"
                  >
                    Add
                  </button>
                </div>
              </div>
            )}

            {/* Add Batch */}
            {numbers.length > 0 && (
              <div className="grid grid-cols-[180px_1fr] items-center gap-4">
                <label className="text-start font-semibold text-gray-700 dark:text-gray-200">
                  Add Batch
                </label>

                <div className="flex items-center gap-3">
                  <input
                    value={batchValues}
                    onChange={(e) => setBatchValues(e.target.value)}
                    placeholder="Contoh: 1,2,3,4"
                    className="h-11 w-64 border border-gray-300 dark:border-gray-600 rounded-xl px-4 bg-white dark:bg-gray-700 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
                  />

                  <button
                    onClick={handleAddBatchValues}
                    className="h-11 min-w-[120px] bg-purple-500 hover:bg-purple-600 transition text-white font-medium rounded-xl"
                  >
                    Add Batch
                  </button>
                </div>
              </div>
            )}

            {/* Update Value */}
            {numbers.length > 0 && (
              <div className="grid grid-cols-[180px_1fr] items-center gap-4">
                <label className="text-start font-semibold text-gray-700 dark:text-gray-200">
                  Update Value
                </label>

                <div className="flex items-center gap-3">
                  <input
                    value={updateIndex}
                    onChange={(e) => setUpdateIndex(e.target.value)}
                    placeholder="Index"
                    className="h-11 w-28 border border-gray-300 dark:border-gray-600 rounded-xl px-4 bg-white dark:bg-gray-700 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  />

                  <input
                    value={updateValueInput}
                    onChange={(e) => setUpdateValueInput(e.target.value)}
                    placeholder="Value baru"
                    className="h-11 w-32 border border-gray-300 dark:border-gray-600 rounded-xl px-4 bg-white dark:bg-gray-700 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  />

                  <button
                    onClick={handleUpdateValue}
                    className="h-11 min-w-[120px] bg-yellow-500 hover:bg-yellow-600 transition text-white font-medium rounded-xl"
                  >
                    Update
                  </button>
                </div>
              </div>
            )}

            {/* Delete Value */}
            {numbers.length > 0 && (
              <div className="grid grid-cols-[180px_1fr] items-center gap-4">
                <label className="text-start font-semibold text-gray-700 dark:text-gray-200">
                  Delete Value
                </label>

                <div className="flex items-center gap-3">
                  <input
                    value={deleteIndex}
                    onChange={(e) => setDeleteIndex(e.target.value)}
                    placeholder="Index"
                    className="h-11 w-28 border border-gray-300 dark:border-gray-600 rounded-xl px-4 bg-white dark:bg-gray-700 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-red-400"
                  />

                  <button
                    onClick={handleDeleteValue}
                    className="h-11 min-w-[120px] bg-red-500 hover:bg-red-600 transition text-white font-medium rounded-xl"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>

        <div className="p-4"></div>

        <div className="container mx-auto p-4 bg-gray-800 flex flex-col bg-gray-800 rounded-xl mb-8">
          <h1>Hasil</h1>
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
