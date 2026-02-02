import type { Op } from "@/utils/operations";

/**
 * Runs text batch operations in a Web Worker.
 * Supports cancel via AbortSignal.
 */
export function runInWorker(
  text: string,
  ops: Op[],
  signal?: AbortSignal,
): Promise<string> {
  const worker = new Worker(
    new URL("../workers/text.worker.ts", import.meta.url),
    { type: "module" },
  );

  return new Promise((resolve, reject) => {
    const cleanup = () => {
      worker.terminate();
      signal?.removeEventListener("abort", onAbort);
    };

    const onAbort = () => {
      cleanup();
      reject(new DOMException("Batch cancelled", "AbortError"));
    };

    worker.onmessage = (e: MessageEvent<string>) => {
      cleanup();
      resolve(e.data);
    };

    worker.onerror = (err) => {
      cleanup();
      reject(err.error ?? new Error("Worker error"));
    };

    signal?.addEventListener("abort", onAbort);

    worker.postMessage({ text, ops });
  });
}
