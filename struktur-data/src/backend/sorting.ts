export type SortItem = {
  id: number;
  value: number;
};

export type SortStep = {
  array: SortItem[];
  activeIndices: number[];
  message?: string;
};

type SortAlgorithm = "bubble" | "selection" | "insertion";
type SortDirection = "asc" | "desc";

// State backend menyimpan objek terstruktur sejak awal
let numbers: SortItem[] = [];
let globalIdCounter = 0;

function cloneItems(arr: SortItem[]): SortItem[] {
  return arr.map((item) => ({
    id: item.id,
    value: item.value,
  }));
}

export function createArray(size: number): void {
  numbers = [];
  globalIdCounter = 0; // Reset counter ID unik
}

// Mengembalikan objek SortItem[] asli agar Frontend mereferensikan KEY yang sama
export function getNumbers(): SortItem[] {
  return cloneItems(numbers);
}

export function addBatchValues(values: number[]): void {
  for (let value of values) {
    numbers.push({
      id: globalIdCounter, // ID dikunci mati di sini dan melekat pada angkanya secara permanen
      value,
    });
    globalIdCounter++;
  }
}

export function clearArray(): void {
  numbers = [];
  globalIdCounter = 0;
}

function compare(a: number, b: number, direction: SortDirection): boolean {
  return direction === "asc" ? a > b : a < b;
}

// === GENERATE STEPS DENGAN ID YANG TETAP MELEKAT PADA VALUE ===

export function getSortSteps(algorithm: SortAlgorithm, direction: SortDirection): SortStep[] {
  if (numbers.length === 0) return [];

  // Clone data utama untuk disortir di memori lokal fungsi tanpa merusak state utama dulu
  let arr = cloneItems(numbers);
  const steps: SortStep[] = [];

  // Posisikan langkah awal
  steps.push({
    array: cloneItems(arr),
    activeIndices: [],
    message: "Memulai sorting...",
  });

  const n = arr.length;

  if (algorithm === "bubble") {
    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - 1 - i; j++) {
        steps.push({
          array: cloneItems(arr),
          activeIndices: [j, j + 1],
          message: `Membandingkan ${arr[j].value} dan ${arr[j + 1].value}`,
        });

        if (compare(arr[j].value, arr[j + 1].value, direction)) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          steps.push({
            array: cloneItems(arr),
            activeIndices: [j, j + 1],
            message: `Swap posisi elemen`,
          });
        }
      }
    }
  } else if (algorithm === "selection") {
    for (let i = 0; i < n - 1; i++) {
      let swapIndex = i;
      for (let j = i + 1; j < n; j++) {
        steps.push({
          array: cloneItems(arr),
          activeIndices: [swapIndex, j],
          message: `Mencari elemen target penukaran`,
        });

        if (compare(arr[swapIndex].value, arr[j].value, direction)) {
          swapIndex = j;
        }
      }
      if (swapIndex !== i) {
        [arr[i], arr[swapIndex]] = [arr[swapIndex], arr[i]];
        steps.push({
          array: cloneItems(arr),
          activeIndices: [i, swapIndex],
          message: `Swap elemen ke indeks ${i}`,
        });
      }
    }
  } else if (algorithm === "insertion") {
    for (let i = 1; i < n; i++) {
      // Kita buat salinan indeks saat ini untuk melacak posisi elemen 'key' yang bergerak mundur
      let currentIdx = i;

      steps.push({
        array: cloneItems(arr),
        activeIndices: [currentIdx],
        message: `Memilih kunci ${arr[currentIdx].value}`,
      });

      // Lakukan pergeseran dengan cara SWAP (tukar posisi) secara berurutan ke kiri
      while (
        currentIdx > 0 && 
        compare(arr[currentIdx - 1].value, arr[currentIdx].value, direction)
      ) {
        steps.push({
          array: cloneItems(arr),
          activeIndices: [currentIdx - 1, currentIdx],
          message: `Membandingkan ${arr[currentIdx].value} dengan ${arr[currentIdx - 1].value}`,
        });

        // TUKAR POSISI (SWAP): Ini menjamin ID elemen tetap unik & tidak ada duplikat objek
        [arr[currentIdx - 1], arr[currentIdx]] = [arr[currentIdx], arr[currentIdx - 1]];

        // Pindahkan jejak indeks elemen key ke kiri
        currentIdx--;

        steps.push({
          array: cloneItems(arr),
          activeIndices: [currentIdx, currentIdx + 1],
          message: `Menggeser elemen ke kanan`,
        });
      }

      steps.push({
        array: cloneItems(arr),
        activeIndices: [currentIdx],
        message: `Kunci ${arr[currentIdx].value} sudah berada di posisi yang benar`,
      });
    }
  }

  // Masukkan status terurut final
  steps.push({
    array: cloneItems(arr),
    activeIndices: [],
    message: "Sorting selesai!",
  });

  // SEKARANG UPDATE STATE BACKEND DENGAN URUTAN TERBARU HASIL SORTING INI
  numbers = cloneItems(arr);

  return steps;
}