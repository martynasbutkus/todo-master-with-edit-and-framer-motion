import { useContext, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import TodosContext from "../contexts/TodosContext";

const ListItem = ({ item, itemAnimation }) => {
  const { listData, setListData } = useContext(TodosContext);
  const [editMode, setEditMode] = useState(false);
  const [itemText, setItemText] = useState(item.title);
  const inputRef = useRef(null);

  const handleRemove = async () => {
    await fetch(`https://jsonplaceholder.typicode.com/todos/${item.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const newListData = listData.filter((data) => data.id !== item.id);
    setListData(newListData);
  };
  
  const updateTextAPI = async (itemId, Text) => {
    const resp = await fetch(`https://jsonplaceholder.typicode.com/todos/${itemId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: Text,
      }),
    });
    const updateItem = await resp.json();
    return updateItem;
  };
  

  const handleEdit = async () => {
    if (editMode) {
      const updateItem = await updateTextAPI(item.id, itemText);
      const updatedListData = listData.map((data) =>
        data.id === updateItem.id ? updateItem : data
      );
      setListData(updatedListData);
      setEditMode(false);
    } else {
      setEditMode(!editMode);
    }
  };

  const handleChange = (e) => {
    setItemText(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleEdit();
    }
  };

  useEffect(() => {
    if (editMode) {
      inputRef.current.focus();
    }
  }, [editMode]);

  return (
    <motion.li className="list-item" variants={itemAnimation} layout="position">
      <div className={editMode ? "text hidden" : "text"}>{itemText}</div>
      <textarea
        ref={inputRef}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className={editMode ? "" : "hidden"}
        type="text"
        value={itemText}
      />
      <div className="buttons">
        <button className="edit" onClick={() => handleEdit()}>
          <i className="fa-solid fa-edit"></i>
        </button>

        <button className="remove" onClick={handleRemove}>
          <i className="fa-solid fa-trash"></i>
        </button>
      </div>
    </motion.li>
  );
};

export default ListItem;
