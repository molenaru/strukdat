let stack: (number | null)[] = [];
let top = 0;

export function createStack(size: number): void {
  if (size < 1 || size > 20) {
    throw new Error('Ukuran stack harus antara 1–20!');
  }
  stack = new Array(size).fill(null);
  top = 0;
}

export function getStack(): (number | null)[] {
  return stack.slice();
}

export function push(num: number): void {
  if (stack.length === 0) {
    createStack(20);
  }
  if (top >= stack.length) {
    throw new Error('Stack sudah penuh!');
  }
  stack[top] = num;
  top++;
}

export function pop(): void {
  if (stack.length === 0) {
    throw new Error('Stack belum dibuat!');
  }
  if (top === 0) {
    throw new Error('Stack kosong!');
  }
  stack[top - 1] = null;
  top = Math.max(0, top - 1);
}

export function clearStack(): void {
  stack = [];
  top = 0;
}
