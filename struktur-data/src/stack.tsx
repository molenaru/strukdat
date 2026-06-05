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
    <div className="min-h-screen p-6">
      <div className="flex justify-center flex-col sm:flex-row p-5 pt-0 gap-5">
        <div className="text-left outline outline-2 rounded-xl p-6 shadow-lg">
          <div className="text-xl font-medium text-[#FE4020]">
            Stack
          </div>
          <p className="text-justify mt-2">
            Berkebalikan dengan Queue, Stack adalah struktur data linear yang menerapkan prinsip LIFO (Last In, First Out). Elemen yang paling terakhir dimasukkan ke dalam tumpukan justru akan menjadi elemen yang pertama kali dikeluarkan.</p>

        </div>

        <div className="text-left outline outline-2 rounded-xl p-6 shadow-lg">
          <div className="text-xl font-medium text-[#FE4020]">
            Analogi
          </div>
          <p className="text-justify mt-2">
            Bayangkan sebuah tumpukan piring di atas meja makan atau tumpukan buku di dalam kardus sempit. Anda hanya bisa meletakkan piring baru di posisi paling atas, dan jika ingin mengambil piring, Anda wajib mengambil piring yang berada di posisi paling atas terlebih dahulu agar tumpukan di bawahnya tidak roboh.
          </p>
        </div>
      </div>

      <div className="m-5 mt-0 mb-0 p-4 flex flex-col outline outline-2 rounded-xl shrink-0 mb-8 h-[320px]">
        <h1 className="text-xl font-bold text-start mb-4 mt-0">Visualisasi</h1>

        <div className="mt-auto" />

        <div className="flex flex-col-reverse gap-2 items-center w-full overflow-y-auto pr-2 scrollbar-thin">
          {numbers.map((num, index) => {
            const base = 'w-9 h-9 border flex items-center justify-center text-black bg-gray-100 relative shrink-0';
            const isAdding = addingIndices.includes(index);
            const isRemoving = removing && index === numbers.length - 1;
            const classes = `${base} ${isAdding ? 'enqueue-in' : ''} ${isRemoving ? 'dequeue-out' : ''}`;
            const isTop = index === numbers.length - 1;

            let label: string | null = null;
            // KANAN TENGAH: Menggunakan utility dari request kamu sebelumnya agar label 'Top' rapi di sebelah kanan kotak
            let labelClass = 'absolute left-12 top-1/2 -translate-y-1/2 text-xs text-blue-400 whitespace-nowrap';

            if (isTop) {
              label = 'Top';
            }

            return (
              <div key={index} className="flex flex-col items-center relative w-full max-w-[150px]">
                <div className={classes}>
                  {label && <span className={labelClass}>{label}</span>}
                  <span className="text-black font-semibold">{num}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="m-5 p-4flex">
        <div className="mx-auto p-4 md:p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg mb-8 border border-gray-200 dark:border-gray-700 w-full box-border">
          {/* Title */}
          <h1 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white mb-6 mt-0 text-start">
            Konfigurasi
          </h1>

          <div className="space-y-5">
            {/* Opsi (Push / Pop) */}
            <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] items-start md:items-center gap-2 md:gap-4">
              <label className="text-start font-semibold text-gray-700 dark:text-gray-200 pt-1 md:pt-0">
                Opsi
              </label>
              <div className="flex flex-row items-center gap-3 w-full">
                <button
                  onClick={handlePush}
                  className="h-11 flex-1 md:flex-none md:min-w-[120px] bg-blue-500 hover:bg-blue-600 transition text-white font-medium rounded-xl shrink-0"
                >
                  Push
                </button>
                <button
                  onClick={handlePop}
                  className="h-11 flex-1 md:flex-none md:min-w-[120px] bg-yellow-500 hover:bg-yellow-600 transition text-black font-medium rounded-xl shrink-0"
                >
                  Pop
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
                  onClick={handleClear}
                  className="h-11 flex-1 md:flex-none md:min-w-[140px] bg-red-500 hover:bg-red-600 transition text-white font-medium rounded-xl"
                >
                  Clear
                </button>
              </div>
            </div>
          </div>

          {/* Error Toast Notification */}
          {error && (
            <div className={`fixed top-5 right-5 z-50 ${closing ? 'animate-slide-out' : 'animate-slide-in'}`}>
              <div className="bg-red-500 text-white px-5 py-3 rounded-xl shadow-lg flex items-center gap-3 min-w-[280px] sm:min-w-[300px]">
                <p className="text-sm flex-1">{error}</p>
                <button onClick={() => setError('')} className="font-bold hover:opacity-70 text-sm">✕</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StackComponent;
