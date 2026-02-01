import { TextBlock } from "./components/text-block/TextBlock";
import { Sidebar } from "./components/sidebar/Sidebar";

function App() {
  return (
    <section className="flex flex-1">
      <Sidebar />

      <TextBlock />
    </section>
  )
}

export default App
