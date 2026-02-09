import Button from "./components/button";
import Input from "./components/input";
import List from "./components/list";
import { ContextProvider } from "./contexts/context";

function App() {
  return (
    <ContextProvider>
      <div className="flex w-full h-screen bg-slate-100">
        <div className="m-auto w-125 bg-white shadow-md flex flex-col max-h-[85%]">
          <div className="text-3xl text-center bg-blue-500 text-white p-3 mb-3">
            TodoList Application
          </div>
          <div className="p-3 gap-2 flex">
            <Input />
            <Button />
          </div>
          <div className="flex-1 p-3 gap-2 overflow-y-auto">
            <List />
          </div>
        </div>
      </div>
    </ContextProvider>
  );
}

export default App;
