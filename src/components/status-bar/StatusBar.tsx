import { useTextStore } from "@/store/useTextStore";

type StatusBarProps = {
  lastOperationTime?: number;
};

export const StatusBar = ({ lastOperationTime }: StatusBarProps) => {
  const original = useTextStore((s) => s.original);
  const present = useTextStore((s) => s.history.present);

  const originalLines = original.split("\n");
  const resultLines = present.split("\n");

  const originalTotal = originalLines.length;
  const originalEmpty = originalLines.filter((line) => line.trim() === "").length;

  const resultTotal = resultLines.length;
  const resultEmpty = resultLines.filter((line) => line.trim() === "").length;

  return (
    <div className="bg-sidebar p-4 flex gap-4 text-sm">
      <div className="flex gap-2">
        <span className="font-semibold">Original:</span>
        <span>Lines: {originalTotal}</span>
        <span>Empty: {originalEmpty}</span>
      </div>

      <div className="flex gap-2">
        <span className="font-semibold">Result:</span>
        <span>Lines: {resultTotal}</span>
        <span>Empty: {resultEmpty}</span>
      </div>

      {lastOperationTime !== undefined && (
        <div className="flex gap-2">
          <span className="font-semibold">Last operation:</span>
          <span>{lastOperationTime.toFixed(2)}ms</span>
        </div>
      )}
    </div>
  );
};
