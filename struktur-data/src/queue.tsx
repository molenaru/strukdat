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
    <div className="min-h-screen p-6">
      <div className="flex justify-center flex-col sm:flex-row p-5 pt-0 gap-5">
        <div className="text-left outline outline-2 rounded-xl p-6 shadow-lg">
          <div className="text-xl font-medium text-[#FE4020]">
            Queue
          </div>
          <p className="text-justify mt-2">
            Queue adalah struktur data linear yang menerapkan prinsip FIFO (First In, First Out). Artinya, elemen yang pertama kali dimasukkan ke dalam antrean akan menjadi elemen yang pertama kali dikeluarkan.
          </p>

        </div>

        <div className="text-left outline outline-2 rounded-xl p-6 shadow-lg">
          <div className="text-xl font-medium text-[#FE4020]">
            Analogi
          </div>
          <p className="text-justify mt-2">
            Persis seperti antrean pembeli di kasir supermarket atau antrean tiket bioskop. Orang yang datang paling awal akan dilayani pertama kali, sementara orang yang baru datang harus berdiri di barisan paling belakang (Rear/Tail) dan menunggu hingga giliran depannya selesai.
          </p>
        </div>
      </div>

     <div className="m-5 mt-0 mb-0 p-4 flex flex-col outline outline-2 rounded-xl shrink-0 mb-8 h-[320px]">
        <h1 className="text-xl font-bold text-start mb-4 mt-0">Visualisasi</h1>
        <h1 className="text-xl text-center align-middle mb-4 mt-0">Kasir</h1>

        {/* Tambahkan max-h-[300px] (bisa disesuaikan) dan overflow-y-auto */}
        <div className="flex gap-2 justify-start items-center flex-col pb-8 min-h-[120px] max-h-[350px] overflow-y-auto pr-2 scrollbar-thin">
          {numbers.map((num, index) => {
            const base = 'w-9 h-9 border flex items-center justify-center relative shrink-0'; // Tambahkan shrink-0 agar kotak tidak gepeng saat di-scroll
            const isAdding = addingIndices.includes(index);
            const isPriority = index === markedPriorityIndex;
            const isRemoving = removingIndex !== null && index === removingIndex;
            const classes = `${base} ${isAdding ? 'enqueue-in' : ''} ${isPriority ? 'bg-purple-500 border-purple-700 shadow-lg text-white' : 'bg-gray-100'} ${isRemoving ? 'dequeue-out' : ''}`;
            const isFront = index === 0;
            const isRear = index === numbers.length - 1;
            let label: string | null = null;
            let labelClass = 'p-2 absolute left-12 top-1/2 -translate-y-1/2 text-xs text-blue-400 whitespace-nowrap'; // Tambahkan whitespace-nowrap agar teks label tidak patah dua baris

            if (isFront && isRear) {
              label = 'Keduanya';
            } else if (isFront) {
              label = 'Depan';
            } else if (isRear) {
              label = 'Belakang';
            }

            return (
              <div key={index} className="flex flex-col items-center relative w-full max-w-[150px]">
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

      <div className="p-4 flex">
        <div className="m-2 mt-0 p-4 md:m-5 md:p-6 bg-[#213448] rounded-2xl shadow-lg mb-8 outline outline-2 w-full">
          {/* Title */}
          <h1 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white mb-6 mt-0 text-start">
            Konfigurasi
          </h1>

          <div className="space-y-5">
            {/* queue dibuat otomatis, tombol buat dihapus */}

            {/* Opsi (Push / Pop) */}
            <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] items-start md:items-center gap-2 md:gap-4">
              <label className="text-start font-semibold text-gray-700 dark:text-gray-200 pt-1 md:pt-0">
                Opsi
              </label>
              <div className="flex items-center gap-3 w-full">
                <button
                  onClick={handleEnqueue}
                  className="h-11 flex-1 md:flex-none md:min-w-[120px] bg-blue-500 hover:bg-blue-600 transition text-white font-medium rounded-xl"
                >
                  Push
                </button>
                <button
                  onClick={handleDequeue}
                  className="h-11 flex-1 md:flex-none md:min-w-[120px] bg-yellow-500 hover:bg-yellow-600 transition text-black font-medium rounded-xl"
                >
                  Pop
                </button>
              </div>
            </div>

            {/* enqueue batch dihapus; gunakan Random atau Enqueue single */}

            {/* Pilih Index Priority */}
            <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] items-start md:items-center gap-2 md:gap-4">
              <label className="text-start font-semibold text-gray-700 dark:text-gray-200 pt-1 md:pt-0">
                Pilih Index Priority
              </label>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full">
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min={0}
                    max={Math.max(numbers.length - 1, 0)}
                    value={priorityInput}
                    onChange={(e) => setPriorityInput(e.target.value)}
                    disabled={numbers.length === 0}
                    className="h-11 w-24 px-3 border border-gray-300 dark:border-gray-600 rounded-xl text-black bg-white dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50 shrink-0"
                    placeholder="Index"
                  />
                  <span className="text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
                    max {Math.max(numbers.length - 1, 0)}
                  </span>
                </div>

                <div className="flex flex-row gap-3 w-full sm:w-auto">
                  <button
                    onClick={handleMarkPriority}
                    disabled={numbers.length === 0}
                    className="h-11 flex-1 sm:flex-none sm:min-w-[140px] bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 dark:disabled:bg-gray-700 disabled:text-gray-600 dark:disabled:text-gray-400 transition text-white font-medium rounded-xl"
                  >
                    OK
                  </button>
                  <button
                    onClick={handleClearPriorityMark}
                    disabled={markedPriorityIndex === null}
                    className="h-11 flex-1 sm:flex-none sm:min-w-[140px] bg-purple-500 hover:bg-purple-600 disabled:bg-gray-300 dark:disabled:bg-gray-700 disabled:text-gray-600 dark:disabled:text-gray-400 transition text-white font-medium rounded-xl"
                  >
                    Hapus Tanda
                  </button>
                </div>
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

export default QueueComponent;
