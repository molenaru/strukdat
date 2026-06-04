let queue: (number | null)[] = [];
let rear = 0;

export function createQueue(size: number): void {
  if (size < 1 || size > 20) {
    throw new Error("Ukuran queue harus antara 1–20!");
  }
  queue = new Array(size).fill(null);
  rear = 0;
}

export function getQueue(): (number | null)[] {
  return queue.slice();
}

export function enqueue(num: number): void {
  // if queue not created, create default max-size queue
  if (queue.length === 0) {
    createQueue(20);
  }
  if (rear >= queue.length) {
    throw new Error("Queue sudah penuh!");
  }
  queue[rear] = num;
  rear++;
}

export function enqueueBatch(values: number[]): void {
  // auto-create default queue if needed
  if (queue.length === 0) {
    createQueue(20);
  }
  if (rear + values.length > queue.length) {
    throw new Error(
      `Jumlah batch (${values.length}) melebihi kapasitas queue yang tersisa (${queue.length - rear})!`
    );
  }
  for (let v of values) {
    queue[rear] = v;
    rear++;
  }
}

export function dequeue(): void {
  if (queue.length === 0) {
    throw new Error("Queue belum dibuat!");
  }
  if (rear === 0) {
    throw new Error("Queue kosong!");
  }
  // shift all filled elements one position left and keep the queue size fixed
  for (let i = 0; i < rear - 1; i++) {
    queue[i] = queue[i + 1];
  }
  queue[rear - 1] = null;
  rear = Math.max(0, rear - 1);
}

export function dequeueBatch(count: number): void {
  if (queue.length === 0) {
    throw new Error("Queue belum dibuat!");
  }
  if (count < 1) {
    throw new Error("Count harus lebih besar dari 0");
  }
  if (count > rear) {
    throw new Error("Jumlah dequeue melebihi elemen di queue!");
  }
  for (let i = 0; i < rear - count; i++) {
    queue[i] = queue[i + count];
  }
  for (let i = rear - count; i < rear; i++) {
    queue[i] = null;
  }
  rear = Math.max(0, rear - count);
}

export function clearQueue(): void {
  queue = [];
  rear = 0;
}
