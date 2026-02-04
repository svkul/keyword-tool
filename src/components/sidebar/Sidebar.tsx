import { useState } from "react";
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
  findReplace,
} from "@/utils";

import { useTextStore } from "@/store/useTextStore";
import type { Op } from "@/store/useTextStore";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

type SidebarProps = {
  apply: (fn: (lines: string[]) => string[]) => void;
  applyBatchOps: (ops: Op[]) => Promise<void>;
};

export const Sidebar = ({
  apply,
  applyBatchOps,
}: SidebarProps) => {
  const [findText, setFindText] = useState("");
  const [replaceText, setReplaceText] = useState("");

  const isProcessing = useTextStore((s) => s.isProcessing);
  const cancelBatch = useTextStore((s) => s.cancelBatch);

  const handleFindReplace = () => {
    apply((lines) => findReplace(lines, findText, replaceText));
  };

  return (
    <div className="p-4 w-80 overflow-y-auto">
      <section className="flex flex-col gap-2">
        <h2>Пошук / Заміна:</h2>

        <div className="flex flex-col gap-2">
          <Input
            placeholder="Знайти..."
            value={findText}
            onChange={(e) => setFindText(e.target.value)}
          />

          <Input
            placeholder="Замінити на..."
            value={replaceText}
            onChange={(e) => setReplaceText(e.target.value)}
          />

          <Button className="w-full min-h-9 h-auto py-2 whitespace-normal" onClick={handleFindReplace} disabled={isProcessing}>
            Замінити
          </Button>
        </div>
      </section>

      <section className="flex flex-col gap-2 mt-4">
        <h2>Обробка тексту:</h2>

        <div className="flex flex-col gap-2">
          <Button className="w-full min-h-9 h-auto py-2 whitespace-normal" onClick={() => apply(toUpperCase)} disabled={isProcessing}>
            Усі великі літери
          </Button>

          <Button className="w-full min-h-9 h-auto py-2 whitespace-normal" onClick={() => apply(toLowerCase)} disabled={isProcessing}>
            Усі малі літери
          </Button>

          <Button className="w-full min-h-9 h-auto py-2 whitespace-normal" onClick={() => apply(capitalizeEachWord)} disabled={isProcessing}>
            Кожне слово з великої літери
          </Button>

          <Button className="w-full min-h-9 h-auto py-2 whitespace-normal" onClick={() => apply(capitalizeFirstWord)} disabled={isProcessing}>
            Лише перше слово з великої літери
          </Button>

          <Button className="w-full min-h-9 h-auto py-2 whitespace-normal" onClick={() => apply(addPlusBeforeWords)} disabled={isProcessing}>
            Додати + перед кожним словом
          </Button>

          <Button className="w-full min-h-9 h-auto py-2 whitespace-normal" onClick={() => apply(removePlus)} disabled={isProcessing}>
            Видалити + перед словами
          </Button>

          <Button className="w-full min-h-9 h-auto py-2 whitespace-normal" onClick={() => apply(wrapWithQuotes)} disabled={isProcessing}>
            Додати лапки навколо рядка
          </Button>

          <Button className="w-full min-h-9 h-auto py-2 whitespace-normal" onClick={() => apply(wrapWithBrackets)} disabled={isProcessing}>
            Додати квадратні дужки навколо рядка
          </Button>

          <Button className="w-full min-h-9 h-auto py-2 whitespace-normal" onClick={() => apply(addDash)} disabled={isProcessing}>
            Додати - на початок рядка
          </Button>

          <Button className="w-full min-h-9 h-auto py-2 whitespace-normal" onClick={() => apply(removeDash)} disabled={isProcessing}>
            Видалити - з рядка
          </Button>

          <Button className="w-full min-h-9 h-auto py-2 whitespace-normal" onClick={() => apply(addDashBrackets)} disabled={isProcessing}>
            -[...] на початку (тире + квадратні дужки)
          </Button>

          <Button className="w-full min-h-9 h-auto py-2 whitespace-normal" onClick={() => apply(addDashQuotes)} disabled={isProcessing}>
            -"..." на початку (тире + лапки)
          </Button>

          <Button className="w-full min-h-9 h-auto py-2 whitespace-normal" onClick={() => apply(trimSpaces)} disabled={isProcessing}>
            Видалити зайві пробіли
          </Button>

          <Button className="w-full min-h-9 h-auto py-2 whitespace-normal" onClick={() => apply(removeTabs)} disabled={isProcessing}>
            Видалити табуляцію \t
          </Button>

          <Button className="w-full min-h-9 h-auto py-2 whitespace-normal" onClick={() => apply(removeAfterDash)} disabled={isProcessing}>
            Видалити все праворуч після підрядка " -" (пробіл+дефіс), включно з дефісом
          </Button>

          <Button className="w-full min-h-9 h-auto py-2 whitespace-normal" onClick={() => apply(spacesToUnderscore)} disabled={isProcessing}>
            Замінити пробіли на _
          </Button>

          <Button className="w-full min-h-9 h-auto py-2 whitespace-normal" onClick={() => apply(removeSpecialChars)} disabled={isProcessing}>
            Видалити спецсимволи: () \ ~ ! @ # $ % ^ & * _ = + [ ] \ { } | ; ' : " , / &lt; &gt; ?`
          </Button>

          <Button className="w-full min-h-9 h-auto py-2 whitespace-normal" onClick={() => apply(replaceSpecialCharsWithSpace)} disabled={isProcessing}>
            Замінити спецсимволи на пробіли
          </Button>
        </div>
      </section>

      <section className="flex flex-col gap-2 mt-4">
        <h2>Пакетна обробка</h2>

        <div className="flex flex-col gap-2">
          <Button className="w-full min-h-9 h-auto py-2 whitespace-normal"
            onClick={() =>
              applyBatchOps([
                { type: "trim" },
                { type: "removeSpecialChars" },
                { type: "unique" },
              ])
            }
            disabled={isProcessing}
          >
            Обрізати пробіли + спецсимволи + унікальні
          </Button>

          <Button className="w-full min-h-9 h-auto py-2 whitespace-normal"
            onClick={() =>
              applyBatchOps([
                { type: "lowercase" },
                { type: "trim" },
                { type: "unique" },
              ])
            }
            disabled={isProcessing}
          >
            Малі літери + обрізати пробіли + унікальні
          </Button>

          <Button className="w-full min-h-9 h-auto py-2 whitespace-normal"
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
            Малі літери + обрізати пробіли + унікальні + сортування (укр)
          </Button>

          {isProcessing && (
            <Button className="w-full min-h-9 h-auto py-2 whitespace-normal" variant="outline" onClick={cancelBatch}>
              Скасувати
            </Button>
          )}
        </div>
      </section>
    </div>
  )
}