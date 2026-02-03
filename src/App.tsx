import { useState, useCallback } from "react";
import { useTextStore, type Op } from "./store/useTextStore";

import { TextBlock } from "./components/text-block/TextBlock";
import { Sidebar } from "./components/sidebar/Sidebar";

function App() {
  const applyTransform = useTextStore((s) => s.applyTransform);
  const applyBatchOps = useTextStore((s) => s.applyBatchOps);
  const setText = useTextStore((s) => s.setText);

  const [lastOperationTime, setLastOperationTime] = useState<number | undefined>();

  const clear = useCallback(() => setText(""), [setText]);

  const copyToClipboard = useCallback(async () => {
    const present = useTextStore.getState().history.present;
    try {
      await navigator.clipboard.writeText(present);
      return true;
    } catch (err) {
      console.error("Failed to copy:", err);
      return false;
    }
  }, []);

  const importFromFile = useCallback((content: string) => setText(content), [setText]);

  const exportToFile = useCallback(() => {
    const present = useTextStore.getState().history.present;
    const blob = new Blob([present], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "keywords.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, []);

  const handleApply = useCallback((fn: (lines: string[]) => string[]) => {
    const start = performance.now();
    applyTransform(fn);
    const elapsed = performance.now() - start;
    setLastOperationTime(elapsed);
  }, [applyTransform]);

  const handleApplyBatchOps = useCallback(
    async (ops: Op[]) => {
      const start = performance.now();
      await applyBatchOps(ops);
      const elapsed = performance.now() - start;
      setLastOperationTime(elapsed);
    },
    [applyBatchOps],
  );

  return (
    <section className="flex flex-1">
      <Sidebar
        apply={handleApply}
        applyBatchOps={handleApplyBatchOps}
      />

      <TextBlock apply={handleApply} clear={clear} copyToClipboard={copyToClipboard} importFromFile={importFromFile} exportToFile={exportToFile} lastOperationTime={lastOperationTime} />
    </section>
  );
}

export default App;
