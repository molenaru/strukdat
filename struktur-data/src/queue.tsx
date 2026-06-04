import React, { useEffect, useState } from 'react';
import './App.css';
import { createQueue, getQueue, enqueue, dequeue, removeAt, clearQueue } from './backend/queue';

const QueueComponent: React.FC = () => {
  const [numbers, setNumbers] = useState<number[]>([]);
  // no manual input; enqueue will generate a random value
  const [error, setError] = useState('');
  const [closing, setClosing] = useState(false);
  const [addingIndices, setAddingIndices] = useState<number[]>([]);
  const [removingIndex, setRemovingIndex] = useState<number | null>(null);
  const [priorityInput, setPriorityInput] = useState('0');
  const [markedPriorityIndex, setMarkedPriorityIndex] = useState<number | null>(null);

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

  const refresh = () => {
    const newNumbers = getQueue().filter((v) => v != null) as number[];
    setNumbers(newNumbers);
    if (newNumbers.length === 0) {
      setPriorityInput('0');
      setMarkedPriorityIndex(null);
    } else {
      const parsedPriority = Number(priorityInput);
      if (!Number.isInteger(parsedPriority) || parsedPriority < 0 || parsedPriority >= newNumbers.length) {
        setPriorityInput('0');
      }
      if (markedPriorityIndex !== null && markedPriorityIndex >= newNumbers.length) {
        setMarkedPriorityIndex(null);
      }
    }
  };

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
      if (numbers.length === 0) {
        setError('Queue kosong!');
        return;
      }
      const removeIndex = markedPriorityIndex !== null && markedPriorityIndex >= 0 && markedPriorityIndex < numbers.length
        ? markedPriorityIndex
        : 0;
      setRemovingIndex(removeIndex);
      setTimeout(() => {
        try {
          if (markedPriorityIndex !== null && markedPriorityIndex >= 0 && markedPriorityIndex < numbers.length) {
            removeAt(markedPriorityIndex);
            setMarkedPriorityIndex(null);
          } else {
            dequeue();
          }
          refresh();
        } catch (err: any) {
          setError(err.message);
        } finally {
          setRemovingIndex(null);
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
    setPriorityInput('0');
    setMarkedPriorityIndex(null);
  };

  const handleMarkPriority = () => {
    if (numbers.length === 0) {
      setError('Queue kosong!');
      return;
    }
    const selectedIndex = Number(priorityInput);
    if (priorityInput.trim() === '' || !Number.isInteger(selectedIndex) || selectedIndex < 0 || selectedIndex >= numbers.length) {
      setError(`Index harus angka antara 0 dan ${Math.max(numbers.length - 1, 0)}`);
      return;
    }
    setMarkedPriorityIndex(selectedIndex);
    setError('');
  };

  const handleClearPriorityMark = () => {
    setMarkedPriorityIndex(null);
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
            const base = 'w-12 h-12 border flex items-center justify-center text-black relative';
            const isAdding = addingIndices.includes(index);
            const isPriority = index === markedPriorityIndex;
            const isRemoving = removingIndex !== null && index === removingIndex;
            const classes = `${base} ${isAdding ? 'enqueue-in' : ''} ${isPriority ? 'bg-purple-500 border-purple-700 shadow-lg text-white' : 'bg-gray-100'} ${isRemoving ? 'dequeue-out' : ''}`;
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
              <div key={index} className="flex flex-col items-center relative">
                {isPriority && (
                  <span className="mb-1 text-xs font-semibold text-purple-700">Priority</span>
                )}
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
              <label className="text-start font-semibold text-gray-700 dark:text-gray-200">Pilih Index Priority</label>
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min={0}
                    max={Math.max(numbers.length - 1, 0)}
                    value={priorityInput}
                    onChange={(e) => setPriorityInput(e.target.value)}
                    disabled={numbers.length === 0}
                    className="h-11 w-24 px-3 border rounded-xl text-black bg-white"
                    placeholder="Index"
                  />
                  <span className="text-sm text-gray-500">max {Math.max(numbers.length - 1, 0)}</span>
                </div>
                <button
                  onClick={handleMarkPriority}
                  disabled={numbers.length === 0}
                  className="h-11 min-w-[140px] bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 disabled:text-gray-600 transition text-white font-medium rounded-xl"
                >
                  OK
                </button>
                <button
                  onClick={handleClearPriorityMark}
                  disabled={markedPriorityIndex === null}
                  className="h-11 min-w-[140px] bg-purple-500 hover:bg-purple-600 disabled:bg-gray-300 disabled:text-gray-600 transition text-white font-medium rounded-xl"
                >
                  Hapus Tanda
                </button>
              </div>
            </div>

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
