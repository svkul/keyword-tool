import { Button } from "../ui/button";

export const Sidebar = () => {
  return (
    <div className="p-4 w-80">
      <h1>Sidebar</h1>

      <section className="flex flex-col gap-2">
        <h2>Базові функції:</h2>

        <div className="flex gap-2 flex-wrap">
          <Button>Очистити</Button>
          <Button>Скопіювати в буфер</Button>
          <Button>Імпорт</Button>
          <Button>Експорт</Button>
        </div>
      </section>

      <section className="flex flex-col gap-2">
        <h2>Обробка тексту:</h2>

        <div className="flex gap-2 flex-wrap">
          <Button>Усі великі літери</Button>
          <Button>Усі малі літери</Button>
          <Button>Кожне слово з великої літери</Button>
          <Button>Лише перше слово з великої літери</Button>

          <Button>Додати + перед кожним словом</Button>
          <Button>Видалити + перед словами</Button>
          <Button>Додати лапки навколо рядка</Button>
          <Button>Додати квадратні дужки навколо рядка</Button>
          <Button>Додати - на початок рядка</Button>
          <Button>-[...] на початку (тире + квадратні дужки)</Button>
          <Button>-"..." на початку (тире + лапки)</Button>

          <Button>Видалити зайві пробіли</Button>
          <Button>Видалити табуляцію \t</Button>
          <Button>Видалити все праворуч після підрядка " -" (пробіл+дефіс), включно з дефісом</Button>
          <Button>Замінити пробіли на _</Button>
          <Button>Видалити спецсимволи: () \ ~ ! @ # $ % ^ & * _ = + [ ] \ { } | ; ' : " , / &lt; &gt; ?`</Button>
          <Button>Замінити спецсимволи на пробіли</Button>
        </div>
      </section>

      <section>
        <h2>Пошук / Заміна:</h2>

        <div className="flex gap-2 flex-wrap">
          <Button>Заміна</Button>
          <Button>Заміна</Button>
        </div>
      </section>

      <section>
        <h2>Сортування / Унікальність:</h2>

        <div className="flex gap-2 flex-wrap">
          <Button>Сортувати рядки А-Я (врахувати локаль uk/ru через localeCompare)</Button>
          <Button>Сортувати рядки Я-А</Button>
          <Button>Видалити дублікати рядків</Button>
        </div>
      </section>

      <section>
        <h2>Історія</h2>

        <div className="flex gap-2 flex-wrap">
          <Button>Відміна</Button>
          <Button>Повтор</Button>
        </div>
      </section>
    </div>
  )
}