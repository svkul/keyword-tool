import { applyOperation, type Op } from "../utils/operations";

self.onmessage = (e: MessageEvent<{ text: string; ops: Op[] }>) => {
  const { text, ops } = e.data;

  let result = text;

  for (const op of ops) {
    result = applyOperation(result, op);
  }

  self.postMessage(result);
};
