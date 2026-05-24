import React, { useEffect, useState } from 'react';
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

  useEffect(() => {
    setNumbers([]);
  }, []);

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

      {/* Buat array */}
      <div className="mb-4 flex gap-2">
        <input
          value={arraySize}
          onChange={(e) => setArraySize(e.target.value)}
          placeholder="Ukuran array (1–20)"
          className="border rounded px-2 py-1 text-white w-40"
        />
        <button onClick={handleCreateArray} className="bg-green-500 text-white px-3 py-1 rounded">
          Buat Array
        </button>
      </div>

      {/* Add value satu per satu */}
      {numbers.length > 0 && (
        <div className="mb-4 flex gap-2">
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Value"
            className="border rounded px-2 py-1 text-white w-24"
          />
          <button onClick={handleAddValue} className="bg-blue-500 text-white px-3 py-1 rounded">
            Add Value
          </button>
        </div>
      )}

      {/* Add batch values */}
      {numbers.length > 0 && (
        <div className="mb-4 flex gap-2">
          <input
            value={batchValues}
            onChange={(e) => setBatchValues(e.target.value)}
            placeholder="Contoh: 1,2,3,4"
            className="border rounded px-2 py-1 text-white w-40"
          />
          <button onClick={handleAddBatchValues} className="bg-purple-500 text-white px-3 py-1 rounded">
            Add Batch
          </button>
        </div>
      )}

      {/* Update value */}
      {numbers.length > 0 && (
        <div className="mb-4 flex gap-2">
          <input
            value={updateIndex}
            onChange={(e) => setUpdateIndex(e.target.value)}
            placeholder="Indeks"
            className="border rounded px-2 py-1 text-white w-24"
          />
          <input
            value={updateValueInput}
            onChange={(e) => setUpdateValueInput(e.target.value)}
            placeholder="Value baru"
            className="border rounded px-2 py-1 text-white w-24"
          />
          <button onClick={handleUpdateValue} className="bg-yellow-500 text-white px-3 py-1 rounded">
            Update
          </button>
        </div>
      )}

      {/* Delete value */}
      {numbers.length > 0 && (
        <div className="mb-4 flex gap-2">
          <input
            value={deleteIndex}
            onChange={(e) => setDeleteIndex(e.target.value)}
            placeholder="Indeks"
            className="border rounded px-2 py-1 text-white w-24"
          />
          <button onClick={handleDeleteValue} className="bg-red-500 text-white px-3 py-1 rounded">
            Delete
          </button>
        </div>
      )}

      {error && <p className="text-red-500 mb-2">{error}</p>}

      {/* Tampilan array horizontal */}
      <div className="flex gap-2 flex-wrap">
        {numbers.map((num, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="w-16 h-16 border flex items-center justify-center text-black bg-gray-100">
              {num !== null ? num : ""}
            </div>
            <span className="text-red-500 text-sm">Index {index}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArrayComponent;
