import React, { useEffect, useState } from 'react';
import './App.css';
import { createStack, getStack, push, pop, clearStack } from './backend/stack';

const StackComponent: React.FC = () => {
  const [numbers, setNumbers] = useState<number[]>([]);
  const [error, setError] = useState('');
  const [closing, setClosing] = useState(false);
  const [addingIndices, setAddingIndices] = useState<number[]>([]);
  const [removing, setRemoving] = useState(false);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setClosing(true);
        setTimeout(() => {
          setError('');
          setClosing(false);
        }, 400);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const refresh = () => setNumbers(getStack().filter((v) => v != null) as number[]);

  const handlePush = () => {
    const val = Math.floor(Math.random() * 99) + 1;
    try {
      push(val);
      const newNums = getStack().filter((v) => v != null) as number[];
      setNumbers(newNums);
      const addedIndex = newNums.length - 1;
      if (addedIndex >= 0) {
        setAddingIndices([addedIndex]);
        setTimeout(() => setAddingIndices([]), 350);
      }
      setError('');
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handlePop = () => {
    try {
      if (numbers.length === 0) {
        setError('Stack kosong!');
        return;
      }
      setRemoving(true);
      setTimeout(() => {
        try {
          pop();
          refresh();
        } catch (err: any) {
          setError(err.message);
        } finally {
          setRemoving(false);
        }
      }, 350);
      setError('');
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleClear = () => {
    clearStack();
    refresh();
    setError('');
  };

  useEffect(() => {
    try {
      createStack(20);
      refresh();
    } catch (err: any) {
      setError(err.message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="bg-white min-h-screen p-6">
      <h2 className="text-2xl font-bold mb-4 text-black">Stack</h2>

      <div className="container mx-auto p-4 flex flex-col bg-gray-800 rounded-xl mb-8">
        <h1 className="text-xl font-bold text-black dark:text-white text-start mb-4 mt-0">Visualisasi</h1>

        <div className="flex gap-2 flex-wrap justify-center pb-8 min-h-[120px]">
          {numbers.map((num, index) => {
            const base = 'w-12 h-12 border flex items-center justify-center text-black bg-gray-100 relative';
            const isAdding = addingIndices.includes(index);
            const isRemoving = removing && index === numbers.length - 1;
            const classes = `${base} ${isAdding ? 'enqueue-in' : ''} ${isRemoving ? 'dequeue-out' : ''}`;
            const isTop = index === numbers.length - 1;
            let label: string | null = null;
            let labelClass = 'absolute left-1/2 -top-5 -translate-x-1/2 text-xs text-blue-200';
            if (isTop) {
              label = 'Top';
            }
            return (
              <div key={index} className="flex flex-col items-center">
                <div className={classes}>
                  {label && <span className={labelClass}>{label}</span>}
                  <span className="text-black font-semibold">{num}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="container mx-auto p-4 bg-white flex">
        <div className="mx-auto p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg mb-8 border border-gray-200 dark:border-gray-700 w-full">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 mt-0 text-start">Konfigurasi</h1>

          <div className="space-y-5">
            <div className="grid grid-cols-[180px_1fr] items-center gap-4">
              <label className="text-start font-semibold text-gray-700 dark:text-gray-200">Opsi</label>
              <div className="flex items-center gap-3">
                <button onClick={handlePush} className="h-11 min-w-[120px] bg-blue-500 hover:bg-blue-600 transition text-white font-medium rounded-xl">Push</button>
                <button onClick={handlePop} className="h-11 min-w-[120px] bg-yellow-500 hover:bg-yellow-600 transition text-black font-medium rounded-xl">Pop</button>
              </div>
            </div>

            <div className="grid grid-cols-[180px_1fr] items-center gap-4">
              <label className="text-start font-semibold text-gray-700 dark:text-gray-200">Aksi Cepat</label>
              <div className="flex items-center gap-3">
                <button onClick={handleClear} className="h-11 min-w-[140px] bg-red-500 hover:bg-red-600 transition text-white font-medium rounded-xl">Clear</button>
              </div>
            </div>
          </div>

          {error && (
            <div className={`fixed top-5 right-5 z-50 ${closing ? 'animate-slide-out' : 'animate-slide-in'}`}>
              <div className="bg-red-500 text-white px-5 py-3 rounded-xl shadow-lg flex items-center gap-3 min-w-[300px] ">
                <p className="flex-1">{error}</p>
                <button onClick={() => setError('')} className="font-bold hover:opacity-70">✕</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StackComponent;
