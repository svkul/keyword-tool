import { useTextStore } from "@/store/useTextStore";

type StatusBarProps = {
  lastOperationTime?: number;
};

export const StatusBar = ({ lastOperationTime }: StatusBarProps) => {
  const original = useTextStore((s) => s.original);
  const present = useTextStore((s) => s.history.present);
  const isProcessing = useTextStore((s) => s.isProcessing);

  const originalLines = original.split("\n");
  const resultLines = present.split("\n");

  const originalTotal = originalLines.length;
  const originalEmpty = originalLines.filter((line) => line.trim() === "").length;

  const resultTotal = resultLines.length;
  const resultEmpty = resultLines.filter((line) => line.trim() === "").length;

  return (
    <div className="bg-sidebar p-4 flex flex-wrap items-center gap-4 text-sm">
      <div className="flex gap-2">
        <span className="font-semibold">Оригінал:</span>
        <span>Рядків: {originalTotal}</span>
        <span>Порожніх: {originalEmpty}</span>
      </div>

      <div className="flex gap-2">
        <span className="font-semibold">Результат:</span>
        <span>Рядків: {resultTotal}</span>
        <span>Порожніх: {resultEmpty}</span>
      </div>

      {lastOperationTime !== undefined && !isProcessing && (
        <div className="flex gap-2">
          <span className="font-semibold">Остання операція:</span>
          <span>{lastOperationTime.toFixed(2)}ms</span>
        </div>
      )}

      {isProcessing && (
        <div className="flex items-center gap-2 text-muted-foreground">
          <span
            className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent"
            aria-hidden
          />
          <span className="font-semibold">Обробка…</span>
        </div>
      )}
    </div>
  );
};
