import { useRef } from "react";
import { Info, ArrowBigLeftDash, ArrowBigRightDash, FileDown, FileUp, Copy, Trash2, ArrowDownAZ, ArrowUpAZ, ListX } from "lucide-react";

import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  sortAZ,
  sortZA,
  uniqueLines,
} from "@/utils";
import { Button } from "../ui/button";

import { useTextStore } from "@/store/useTextStore";
import { StatusBar } from "../status-bar/StatusBar";

type TextBlockProps = {
  apply: (fn: (lines: string[]) => string[]) => void;
  clear: () => void;
  copyToClipboard: () => Promise<boolean>;
  importFromFile: (content: string) => void;
  exportToFile: () => void;
  lastOperationTime?: number;
};

export const TextBlock = ({ apply, clear, copyToClipboard, exportToFile, importFromFile, lastOperationTime }: TextBlockProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const original = useTextStore((s) => s.original);
  const present = useTextStore((s) => s.history.present);
  const setOriginal = useTextStore((s) => s.setOriginal);
  const undo = useTextStore((s) => s.undo);
  const redo = useTextStore((s) => s.redo);
  const canUndo = useTextStore((s) => s.history.past.length > 0);
  const canRedo = useTextStore((s) => s.history.future.length > 0);
  const isProcessing = useTextStore((s) => s.isProcessing);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        importFromFile(content);
      };
      reader.readAsText(file);
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleImport = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex-1 flex flex-col gap-4 p-4">
      <div className="flex align-center justify-between">
        <div className="flex items-center gap-2">
          <h1>Інструмент ключових слів</h1>

          <Tooltip>
            <TooltipTrigger asChild>
              <Info className="w-4 h-4" />
            </TooltipTrigger>

            <TooltipContent className="max-w-xs">
              <ol className="list-decimal list-inside">
                <li>
                  <span>Введіть ключові слова в поле — по одному на рядок.</span>
                </li>

                <li>
                  <span>За потреби увімкніть одну або кілька опцій «Авто».</span>
                </li>

                <li>
                  <span>Натисніть кнопку, щоб відредагувати ключові слова.</span>
                </li>

                <li>
                  <span>Наведіть курсор на кнопку, щоб побачити підказку.</span>
                </li>

                <li>
                  <span>Вкладки AdWords та Пошук/Заміна дають додаткові функції.</span>
                </li>
              </ol>
            </TooltipContent>
          </Tooltip>
        </div>

        <section className="flex gap-1">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" onClick={undo} disabled={!canUndo || isProcessing}>
                <ArrowBigLeftDash className="size-6" />
              </Button>
            </TooltipTrigger>

            <TooltipContent className="max-w-xs">
              Скасувати
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" onClick={redo} disabled={!canRedo || isProcessing}>
                <ArrowBigRightDash className="size-6" />
              </Button>
            </TooltipTrigger>

            <TooltipContent className="max-w-xs">
              Повторити
            </TooltipContent>
          </Tooltip>
        </section>
      </div>

      <div className="flex flex-1 min-h-0 gap-2">
        <div className="flex-1 flex relative">
          <div className="absolute top-2 right-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" onClick={clear} disabled={isProcessing}>
                  <Trash2 className="size-6" />
                </Button>
              </TooltipTrigger>

              <TooltipContent className="max-w-xs">
                Очистити
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" onClick={handleImport} disabled={isProcessing}>
                  <FileDown className="size-6" />
                </Button>
              </TooltipTrigger>

              <TooltipContent className="max-w-xs">
                Імпортувати
              </TooltipContent>
            </Tooltip>

            <input
              ref={fileInputRef}
              type="file"
              accept=".txt"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>

          <Textarea
            name="keywords"
            className="flex-1 min-h-0 overflow-auto [field-sizing:normal]"
            placeholder="Введіть ключові слова — по одному на рядок."
            value={original}
            onChange={(e) => setOriginal(e.target.value)}
          />
        </div>

        <div className="flex-1 flex relative">
          <div className="absolute top-2 right-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" onClick={() => apply(uniqueLines)} disabled={isProcessing}>
                  <ListX className="size-6" />
                </Button>
              </TooltipTrigger>

              <TooltipContent className="max-w-xs">
                Видалити дублікати
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" onClick={() => apply((lines) => sortAZ(lines))} disabled={isProcessing}>
                  <ArrowDownAZ className="size-6" />
                </Button>
              </TooltipTrigger>

              <TooltipContent className="max-w-xs">
                Сортувати А-Я
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" onClick={() => apply((lines) => sortZA(lines))} disabled={isProcessing}>
                  <ArrowUpAZ className="size-6" />
                </Button>
              </TooltipTrigger>

              <TooltipContent className="max-w-xs">
                Сортувати Я-А
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" onClick={copyToClipboard} disabled={isProcessing}>
                  <Copy className="size-6" />
                </Button>
              </TooltipTrigger>

              <TooltipContent className="max-w-xs">
                Скопіювати в буфер обміну
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" onClick={exportToFile} disabled={isProcessing}>
                  <FileUp className="size-6" />
                </Button>
              </TooltipTrigger>

              <TooltipContent className="max-w-xs">
                Експортувати
              </TooltipContent>
            </Tooltip>
          </div>

          <Textarea
            name="result"
            className="flex-1 min-h-0 overflow-auto [field-sizing:normal]"
            placeholder="Тут з'явиться результат..."
            value={present}
          />
        </div>
      </div>

      <StatusBar lastOperationTime={lastOperationTime} />
    </div>
  );
};
