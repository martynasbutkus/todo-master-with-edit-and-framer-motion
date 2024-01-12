import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Input from "./components/Input";
import List from "./components/List";
import TodosContext from "./contexts/TodosContext";

function App() {
  const [listData, setListData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const resp = await fetch("https://jsonplaceholder.typicode.com/todos");
      const result = await resp.json();
      setListData(result);
    };
    fetchData();
  }, []);

  return (
    <>
      <TodosContext.Provider value={{ listData, setListData }}>
        <Header />
        <Input />
        <List />
      </TodosContext.Provider>
    </>
  );
}

export default App;
