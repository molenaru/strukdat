import React, { useEffect, useState } from 'react';
import './App.css';
import { createQueue, getQueue, enqueue, dequeue, clearQueue } from './backend/queue';

const QueueComponent: React.FC = () => {
  const [numbers, setNumbers] = useState<number[]>([]);
  // no manual input; enqueue will generate a random value
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

  const refresh = () => setNumbers(getQueue().filter((v) => v != null) as number[]);

  const handleEnqueue = () => {
    // generate random value on enqueue
    const val = Math.floor(Math.random() * 99) + 1;
    try {
      enqueue(val);
      const newNums = getQueue().filter((v) => v != null) as number[];
      setNumbers(newNums);
      // highlight newly added at the end
      const addedIndex = newNums.length - 1;
      if (addedIndex >= 0) {
        setAddingIndices([addedIndex]);
        setTimeout(() => setAddingIndices([]), 350);
      }
      // no input to clear
      setError('');
    } catch (err: any) {
      setError(err.message);
    }
  };

  // enqueue batch removed; use Enqueue single to add random values

  const handleDequeue = () => {
    try {
      // animate front element out, then actually dequeue
      if (numbers.length === 0) {
        setError('Queue kosong!');
        return;
      }
      setRemoving(true);
      setTimeout(() => {
        try {
          dequeue();
          // refresh to only occupied slots so box disappears
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

  // dequeue batch removed; use single Dequeue repeatedly if needed

  // random helper removed

  const handleClear = () => {
    clearQueue();
    refresh();
    setError('');
  };

  useEffect(() => {
    // auto-create empty queue with max size 20 on mount
    try {
      createQueue(20);
      refresh();
    } catch (err: any) {
      setError(err.message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="bg-white min-h-screen p-6">
      <h2 className="text-2xl font-bold mb-4 text-black">Queue</h2>

      <div className="container mx-auto p-4 flex flex-col bg-gray-800 rounded-xl mb-8">
        <h1 className="text-xl font-bold text-black dark:text-white text-start mb-4 mt-0">Visualisasi</h1>

        <div className="flex gap-2 flex-wrap justify-center pb-8 min-h-[120px]">
          {numbers.map((num, index) => {
            const base = 'w-12 h-12 border flex items-center justify-center text-black bg-gray-100 relative';
            const isAdding = addingIndices.includes(index);
            const isRemoving = removing && index === 0;
            const classes = `${base} ${isAdding ? 'enqueue-in' : ''} ${isRemoving ? 'dequeue-out' : ''}`;
            const isFront = index === 0;
            const isRear = index === numbers.length - 1;
            let label: string | null = null;
            let labelClass = 'absolute left-1/2 -top-5 -translate-x-1/2 text-xs text-blue-200';
            if (isFront && isRear) {
              label = 'Keduanya';
            } else if (isFront) {
              label = 'Depan';
            } else if (isRear) {
              label = 'Belakang';
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
            {/* queue dibuat otomatis, tombol buat dihapus */}

            <div className="grid grid-cols-[180px_1fr] items-center gap-4">
              <label className="text-start font-semibold text-gray-700 dark:text-gray-200">Opsi</label>
              <div className="flex items-center gap-3">
                <button onClick={handleEnqueue} className="h-11 min-w-[120px] bg-blue-500 hover:bg-blue-600 transition text-white font-medium rounded-xl">Push</button>
                <button onClick={handleDequeue} className="h-11 min-w-[120px] bg-yellow-500 hover:bg-yellow-600 transition text-black font-medium rounded-xl">Pop</button>
              </div>
            </div>

            {/* enqueue batch dihapus; gunakan Random atau Enqueue single */}

            <div className="grid grid-cols-[180px_1fr] items-center gap-4">
              <label className="text-start font-semibold text-gray-700 dark:text-gray-200">Aksi Cepat</label>
              <div className="flex items-center gap-3">
                {/* Enqueue adds a random number; clear remains here */}
                <button onClick={handleClear} className="h-11 min-w-[140px] bg-red-500 hover:bg-red-600 transition text-white font-medium rounded-xl">Clear</button>
              </div>
            </div>

          </div>

          {error && (<div className={`fixed top-5 right-5 z-50 ${closing ? 'animate-slide-out' : 'animate-slide-in'}`}>
            <div className="bg-red-500 text-white px-5 py-3 rounded-xl shadow-lg flex items-center gap-3 min-w-[300px] ">
              <p className="flex-1">{error}</p>
              <button onClick={() => setError('')} className="font-bold hover:opacity-70">✕</button>
            </div>
          </div>)}
        </div>
      </div>
    </div>
  );
};

export default QueueComponent;
