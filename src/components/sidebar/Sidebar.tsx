import { useState, useRef } from "react";
import {
  toUpperCase,
  toLowerCase,
  capitalizeEachWord,
  capitalizeFirstWord,
  addPlusBeforeWords,
  removePlus,
  wrapWithQuotes,
  wrapWithBrackets,
  addDash,
  removeDash,
  addDashBrackets,
  addDashQuotes,
  trimSpaces,
  removeTabs,
  removeAfterDash,
  spacesToUnderscore,
  removeSpecialChars,
  replaceSpecialCharsWithSpace,
  sortAZ,
  sortZA,
  uniqueLines,
  findReplace,
} from "@/utils";

import { useTextStore } from "@/store/useTextStore";
import type { Op } from "@/store/useTextStore";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";

type SidebarProps = {
  apply: (fn: (lines: string[]) => string[]) => void;
  applyBatchOps: (ops: Op[]) => Promise<void>;
  clear: () => void;
  copyToClipboard: () => Promise<boolean>;
  importFromFile: (content: string) => void;
  exportToFile: () => void;
};

export const Sidebar = ({
  apply,
  applyBatchOps,
  clear,
  copyToClipboard,
  importFromFile,
  exportToFile,
}: SidebarProps) => {
  const [findText, setFindText] = useState("");
  const [replaceText, setReplaceText] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const undo = useTextStore((s) => s.undo);
  const redo = useTextStore((s) => s.redo);
  const canUndo = useTextStore((s) => s.history.past.length > 0);
  const canRedo = useTextStore((s) => s.history.future.length > 0);
  const isProcessing = useTextStore((s) => s.isProcessing);
  const cancelBatch = useTextStore((s) => s.cancelBatch);

  const handleImport = () => {
    fileInputRef.current?.click();
  };

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
    // Reset input to allow selecting the same file again
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleFindReplace = () => {
    apply((lines) => findReplace(lines, findText, replaceText));
  };

  return (
    <div className="p-4 w-80 overflow-y-auto">
      <h1>Sidebar</h1>

      <section className="flex flex-col gap-2 mt-4">
        <h2>Базові функції:</h2>

        <div className="flex gap-2 flex-wrap">
          <Button onClick={clear} disabled={isProcessing}>
            Очистити
          </Button>
          <Button onClick={copyToClipboard} disabled={isProcessing}>
            Скопіювати в буфер
          </Button>
          <Button onClick={handleImport} disabled={isProcessing}>
            Імпорт
          </Button>
          <Button onClick={exportToFile} disabled={isProcessing}>
            Експорт
          </Button>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept=".txt"
          className="hidden"
          onChange={handleFileChange}
        />
      </section>

      <section className="flex flex-col gap-2 mt-4">
        <h2>Обробка тексту:</h2>

        <div className="flex gap-2 flex-wrap">
          <Button onClick={() => apply(toUpperCase)} disabled={isProcessing}>
            Усі великі літери
          </Button>
          <Button onClick={() => apply(toLowerCase)} disabled={isProcessing}>
            Усі малі літери
          </Button>
          <Button onClick={() => apply(capitalizeEachWord)} disabled={isProcessing}>
            Кожне слово з великої літери
          </Button>
          <Button onClick={() => apply(capitalizeFirstWord)} disabled={isProcessing}>
            Лише перше слово з великої літери
          </Button>

          <Button onClick={() => apply(addPlusBeforeWords)} disabled={isProcessing}>
            Додати + перед кожним словом
          </Button>
          <Button onClick={() => apply(removePlus)} disabled={isProcessing}>
            Видалити + перед словами
          </Button>
          <Button onClick={() => apply(wrapWithQuotes)} disabled={isProcessing}>
            Додати лапки навколо рядка
          </Button>
          <Button onClick={() => apply(wrapWithBrackets)} disabled={isProcessing}>
            Додати квадратні дужки навколо рядка
          </Button>
          <Button onClick={() => apply(addDash)} disabled={isProcessing}>
            Додати - на початок рядка
          </Button>
          <Button onClick={() => apply(removeDash)} disabled={isProcessing}>
            Видалити - з рядка
          </Button>
          <Button onClick={() => apply(addDashBrackets)} disabled={isProcessing}>
            -[...] на початку (тире + квадратні дужки)
          </Button>
          <Button onClick={() => apply(addDashQuotes)} disabled={isProcessing}>
            -"..." на початку (тире + лапки)
          </Button>

          <Button onClick={() => apply(trimSpaces)} disabled={isProcessing}>
            Видалити зайві пробіли
          </Button>
          <Button onClick={() => apply(removeTabs)} disabled={isProcessing}>
            Видалити табуляцію \t
          </Button>
          <Button onClick={() => apply(removeAfterDash)} disabled={isProcessing}>
            Видалити все праворуч після підрядка " -" (пробіл+дефіс), включно з дефісом
          </Button>
          <Button onClick={() => apply(spacesToUnderscore)} disabled={isProcessing}>
            Замінити пробіли на _
          </Button>
          <Button onClick={() => apply(removeSpecialChars)} disabled={isProcessing}>
            Видалити спецсимволи: () \ ~ ! @ # $ % ^ & * _ = + [ ] \ { } | ; ' : " , / &lt; &gt; ?`
          </Button>
          <Button onClick={() => apply(replaceSpecialCharsWithSpace)} disabled={isProcessing}>
            Замінити спецсимволи на пробіли
          </Button>
        </div>
      </section>

      <section className="flex flex-col gap-2 mt-4">
        <h2>Пошук / Заміна:</h2>

        <div className="flex flex-col gap-2">
          <Textarea
            placeholder="Знайти..."
            value={findText}
            onChange={(e) => setFindText(e.target.value)}
            className="h-10"
          />
          <Textarea
            placeholder="Замінити на..."
            value={replaceText}
            onChange={(e) => setReplaceText(e.target.value)}
            className="h-10"
          />
          <Button onClick={handleFindReplace} disabled={isProcessing}>
            Замінити
          </Button>
        </div>
      </section>

      <section className="flex flex-col gap-2 mt-4">
        <h2>Сортування / Унікальність:</h2>

        <div className="flex gap-2 flex-wrap">
          <Button onClick={() => apply((lines) => sortAZ(lines))} disabled={isProcessing}>
            Сортувати рядки А-Я (врахувати локаль uk/ru через localeCompare)
          </Button>
          <Button onClick={() => apply((lines) => sortZA(lines))} disabled={isProcessing}>
            Сортувати рядки Я-А
          </Button>
          <Button onClick={() => apply(uniqueLines)} disabled={isProcessing}>
            Видалити дублікати рядків
          </Button>
        </div>
      </section>

      <section className="flex flex-col gap-2 mt-4">
        <h2>Batch</h2>

        <div className="flex gap-2 flex-wrap items-center">
          <Button
            onClick={() =>
              applyBatchOps([
                { type: "trim" },
                { type: "removeSpecialChars" },
                { type: "unique" },
              ])
            }
            disabled={isProcessing}
          >
            Trim + спецсимволи + унікальні
          </Button>
          <Button
            onClick={() =>
              applyBatchOps([
                { type: "lowercase" },
                { type: "trim" },
                { type: "unique" },
              ])
            }
            disabled={isProcessing}
          >
            Малі літери + trim + унікальні
          </Button>
          <Button
            onClick={() =>
              applyBatchOps([
                { type: "lowercase" },
                { type: "trim" },
                { type: "unique" },
                { type: "sortAz", locale: "uk" },
              ])
            }
            disabled={isProcessing}
          >
            lowercase + trim + unique + sort (uk)
          </Button>
          {isProcessing && (
            <Button variant="outline" onClick={cancelBatch}>
              Скасувати
            </Button>
          )}
        </div>
      </section>

      <section className="flex flex-col gap-2 mt-4">
        <h2>Історія</h2>

        <div className="flex gap-2 flex-wrap">
          <Button onClick={undo} disabled={!canUndo || isProcessing}>
            Відміна
          </Button>

          <Button onClick={redo} disabled={!canRedo || isProcessing}>
            Повтор
          </Button>
        </div>
      </section>
    </div>
  )
}