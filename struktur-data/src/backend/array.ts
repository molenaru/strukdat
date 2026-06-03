let numbers: (number | null)[] = [];
let currentIndex = 0;

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
  for (let val of values) {
    numbers[currentIndex] = val;
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
