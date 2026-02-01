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

import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";

type SidebarProps = {
  apply: (fn: (lines: string[]) => string[]) => void;
  clear: () => void;
  copyToClipboard: () => Promise<boolean>;
  importFromFile: (content: string) => void;
  exportToFile: () => void;
};

export const Sidebar = ({
  apply,
  clear,
  copyToClipboard,
  importFromFile,
  exportToFile
}: SidebarProps) => {
  const [findText, setFindText] = useState('');
  const [replaceText, setReplaceText] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

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
          <Button onClick={clear}>Очистити</Button>
          <Button onClick={copyToClipboard}>Скопіювати в буфер</Button>
          <Button onClick={handleImport}>Імпорт</Button>
          <Button onClick={exportToFile}>Експорт</Button>
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
          <Button onClick={() => apply(toUpperCase)}>Усі великі літери</Button>
          <Button onClick={() => apply(toLowerCase)}>Усі малі літери</Button>
          <Button onClick={() => apply(capitalizeEachWord)}>Кожне слово з великої літери</Button>
          <Button onClick={() => apply(capitalizeFirstWord)}>Лише перше слово з великої літери</Button>

          <Button onClick={() => apply(addPlusBeforeWords)}>Додати + перед кожним словом</Button>
          <Button onClick={() => apply(removePlus)}>Видалити + перед словами</Button>
          <Button onClick={() => apply(wrapWithQuotes)}>Додати лапки навколо рядка</Button>
          <Button onClick={() => apply(wrapWithBrackets)}>Додати квадратні дужки навколо рядка</Button>
          <Button onClick={() => apply(addDash)}>Додати - на початок рядка</Button>
          <Button onClick={() => apply(addDashBrackets)}>-[...] на початку (тире + квадратні дужки)</Button>
          <Button onClick={() => apply(addDashQuotes)}>-"..." на початку (тире + лапки)</Button>

          <Button onClick={() => apply(trimSpaces)}>Видалити зайві пробіли</Button>
          <Button onClick={() => apply(removeTabs)}>Видалити табуляцію \t</Button>
          <Button onClick={() => apply(removeAfterDash)}>Видалити все праворуч після підрядка " -" (пробіл+дефіс), включно з дефісом</Button>
          <Button onClick={() => apply(spacesToUnderscore)}>Замінити пробіли на _</Button>
          <Button onClick={() => apply(removeSpecialChars)}>Видалити спецсимволи: () \ ~ ! @ # $ % ^ & * _ = + [ ] \ { } | ; ' : " , / &lt; &gt; ?`</Button>
          <Button onClick={() => apply(replaceSpecialCharsWithSpace)}>Замінити спецсимволи на пробіли</Button>
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
          <Button onClick={handleFindReplace}>Замінити</Button>
        </div>
      </section>

      <section className="flex flex-col gap-2 mt-4">
        <h2>Сортування / Унікальність:</h2>

        <div className="flex gap-2 flex-wrap">
          <Button onClick={() => apply((lines) => sortAZ(lines))}>Сортувати рядки А-Я (врахувати локаль uk/ru через localeCompare)</Button>
          <Button onClick={() => apply((lines) => sortZA(lines))}>Сортувати рядки Я-А</Button>
          <Button onClick={() => apply(uniqueLines)}>Видалити дублікати рядків</Button>
        </div>
      </section>

      <section className="flex flex-col gap-2 mt-4">
        <h2>Історія</h2>

        <div className="flex gap-2 flex-wrap">
          <Button disabled>Відміна</Button>
          <Button disabled>Повтор</Button>
        </div>
      </section>
    </div>
  )
}