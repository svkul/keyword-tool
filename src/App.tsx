import { useState } from "react";
import { useTextTransform } from "./hooks/useTextTransform";

import { TextBlock } from "./components/text-block/TextBlock";
import { Sidebar } from "./components/sidebar/Sidebar";

function App() {
  const {
    originalText,
    resultText,
    setText,
    apply,
    clear,
    copyToClipboard,
    importFromFile,
    exportToFile
  } = useTextTransform();

  const [lastOperationTime, setLastOperationTime] = useState<number | undefined>();

  const handleApply = (fn: (lines: string[]) => string[]) => {
    const time = apply(fn);
    setLastOperationTime(time);
  };

  return (
    <section className="flex flex-1">
      <Sidebar
        apply={handleApply}
        clear={clear}
        copyToClipboard={copyToClipboard}
        importFromFile={importFromFile}
        exportToFile={exportToFile}
      />

      <TextBlock
        originalText={originalText}
        resultText={resultText}
        setText={setText}
        lastOperationTime={lastOperationTime}
      />
    </section>
  )
}

export default App
