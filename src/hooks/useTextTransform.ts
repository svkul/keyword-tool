import { useState, useCallback } from "react";

export const useTextTransform = (initialText?: string) => {
  const [originalText, setOriginalText] = useState(initialText || '');
  const [resultText, setResultText] = useState(initialText || '');

  const setText = useCallback((text: string) => {
    setOriginalText(text);
    setResultText(text);
  }, []);

  const apply = useCallback((fn: (lines: string[]) => string[]) => {
    const startTime = performance.now();
    const result = fn(resultText.split('\n')).join('\n');
    const endTime = performance.now();
    setResultText(result);
    return endTime - startTime;
  }, [resultText]);

  const clear = useCallback(() => {
    setOriginalText('');
    setResultText('');
  }, []);

  const copyToClipboard = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(resultText);
      return true;
    } catch (err) {
      console.error('Failed to copy:', err);
      return false;
    }
  }, [resultText]);

  const importFromFile = useCallback((fileContent: string) => {
    setText(fileContent);
  }, [setText]);

  const exportToFile = useCallback(() => {
    const blob = new Blob([resultText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'keywords.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [resultText]);

  return {
    originalText,
    resultText,
    setText,
    apply,
    clear,
    copyToClipboard,
    importFromFile,
    exportToFile,
  };
};