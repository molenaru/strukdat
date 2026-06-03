let numbers: (number | null)[] = [];
let currentIndex = 0;

type SortAlgorithm = "bubble" | "selection" | "insertion";
type SortDirection = "asc" | "desc";

export type SortStep = {
  array: number[];
  activeIndices: number[];
  message?: string;
};

export function createArray(size: number): void {
  if (size < 1 || size > 20) {
    throw new Error("Ukuran array harus antara 1–20!");
  }

  numbers = new Array(size).fill(null);
  currentIndex = 0;
}

export function getNumbers(): (number | null)[] {
  return numbers.slice();
}

export function addNextValue(num: number): void {
  if (currentIndex >= numbers.length) {
    throw new Error("Array sudah penuh!");
  }
  numbers[currentIndex] = num;
  currentIndex++;
}

export function addBatchValues(values: number[]): void {
  if (currentIndex + values.length > numbers.length) {
    throw new Error(
      `Jumlah batch (${values.length}) melebihi kapasitas array yang tersisa (${numbers.length - currentIndex})!`
    );
  }

  for (let value of values) {
    numbers[currentIndex] = value;
    currentIndex++;
  }
}

export function updateValue(index: number, num: number): void {
  if (index < 0 || index >= numbers.length) {
    throw new Error("Indeks tidak valid!");
  }
  numbers[index] = num;
}

export function deleteValue(index: number): void {
  if (index < 0 || index >= numbers.length) {
    throw new Error("Indeks tidak valid!");
  }
  numbers.splice(index, 1);
  currentIndex = Math.min(currentIndex, numbers.length);
}

export function clearArray(): void {
  numbers = [];
  currentIndex = 0;
}

function compare(a: number, b: number, direction: SortDirection): boolean {
  return direction === "asc" ? a > b : a < b;
}

function bubbleSort(arr: number[], direction: SortDirection): number[] {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - 1 - i; j++) {
      if (compare(arr[j], arr[j + 1], direction)) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}

function selectionSort(arr: number[], direction: SortDirection): number[] {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let swapIndex = i;
    for (let j = i + 1; j < n; j++) {
      if (compare(arr[swapIndex], arr[j], direction)) {
        swapIndex = j;
      }
    }
    if (swapIndex !== i) {
      [arr[i], arr[swapIndex]] = [arr[swapIndex], arr[i]];
    }
  }
  return arr;
}

function insertionSort(arr: number[], direction: SortDirection): number[] {
  const n = arr.length;
  for (let i = 1; i < n; i++) {
    const key = arr[i];
    let j = i - 1;
    while (j >= 0 && compare(arr[j], key, direction)) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
  }
  return arr;
}

function sortAlgorithm(arr: number[], algorithm: SortAlgorithm, direction: SortDirection): number[] {
  switch (algorithm) {
    case "bubble":
      return bubbleSort(arr, direction);
    case "selection":
      return selectionSort(arr, direction);
    case "insertion":
      return insertionSort(arr, direction);
    default:
      throw new Error("Algoritma sorting tidak dikenal!");
  }
}

function bubbleSortSteps(arr: number[], direction: SortDirection): SortStep[] {
  const steps: SortStep[] = [];
  const n = arr.length;

  steps.push({ array: arr.slice(), activeIndices: [] });

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - 1 - i; j++) {
      steps.push({ array: arr.slice(), activeIndices: [j, j + 1], message: `Membandingkan indeks ${j} dan ${j + 1}` });
      if (compare(arr[j], arr[j + 1], direction)) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        steps.push({ array: arr.slice(), activeIndices: [j, j + 1], message: `Swap indeks ${j} dan ${j + 1}` });
      }
    }
  }

  steps.push({ array: arr.slice(), activeIndices: [] });
  return steps;
}

function selectionSortSteps(arr: number[], direction: SortDirection): SortStep[] {
  const steps: SortStep[] = [];
  const n = arr.length;

  steps.push({ array: arr.slice(), activeIndices: [] });

  for (let i = 0; i < n - 1; i++) {
    let swapIndex = i;
    for (let j = i + 1; j < n; j++) {
      steps.push({ array: arr.slice(), activeIndices: [swapIndex, j], message: `Mencari elemen ${direction === "asc" ? "terkecil" : "terbesar"} untuk indeks ${i}` });
      if (compare(arr[swapIndex], arr[j], direction)) {
        swapIndex = j;
        steps.push({ array: arr.slice(), activeIndices: [swapIndex, j], message: `Update kandidat swap ke indeks ${swapIndex}` });
      }
    }
    if (swapIndex !== i) {
      [arr[i], arr[swapIndex]] = [arr[swapIndex], arr[i]];
      steps.push({ array: arr.slice(), activeIndices: [i, swapIndex], message: `Swap indeks ${i} dan ${swapIndex}` });
    }
  }

  steps.push({ array: arr.slice(), activeIndices: [] });
  return steps;
}

function insertionSortSteps(arr: number[], direction: SortDirection): SortStep[] {
  const steps: SortStep[] = [];
  const n = arr.length;

  steps.push({ array: arr.slice(), activeIndices: [] });

  for (let i = 1; i < n; i++) {
    const key = arr[i];
    let j = i - 1;
    steps.push({ array: arr.slice(), activeIndices: [i], message: `Memilih kunci di indeks ${i}` });
    while (j >= 0 && compare(arr[j], key, direction)) {
      arr[j + 1] = arr[j];
      steps.push({ array: arr.slice(), activeIndices: [j, j + 1], message: `Geser indeks ${j} ke ${j + 1}` });
      j--;
    }
    arr[j + 1] = key;
    steps.push({ array: arr.slice(), activeIndices: [j + 1], message: `Sisipkan kunci di indeks ${j + 1}` });
  }

  steps.push({ array: arr.slice(), activeIndices: [] });
  return steps;
}

export function getSortSteps(algorithm: SortAlgorithm, direction: SortDirection): SortStep[] {
  if (numbers.length === 0) {
    throw new Error("Array belum dibuat!");
  }

  if (numbers.some((item) => item === null)) {
    throw new Error("Semua elemen array harus terisi sebelum sorting!");
  }

  const filledArray = numbers as number[];
  switch (algorithm) {
    case "bubble":
      return bubbleSortSteps(filledArray.slice(), direction);
    case "selection":
      return selectionSortSteps(filledArray.slice(), direction);
    case "insertion":
      return insertionSortSteps(filledArray.slice(), direction);
    default:
      throw new Error("Algoritma sorting tidak dikenal!");
  }
}

export function sortNumbers(algorithm: SortAlgorithm, direction: SortDirection): void {
  if (numbers.length === 0) {
    throw new Error("Array belum dibuat!");
  }

  if (numbers.some((item) => item === null)) {
    throw new Error("Semua elemen array harus terisi sebelum sorting!");
  }

  const filledArray = numbers as number[];
  numbers = sortAlgorithm(filledArray.slice(), algorithm, direction).map((value) => value);
}
