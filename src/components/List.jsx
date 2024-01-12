import { useContext, useEffect, useState } from "react";
import ListItem from "./ListItem";
import { motion, AnimatePresence } from "framer-motion";
import TodosContext from "../contexts/TodosContext";

const List = () => {
  const { listData } = useContext(TodosContext);
  const [renderList, setRenderList] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setRenderList(true);
    }, 100);
  }, []);

  const listAnimation = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.3,
      },
    },
  };

  const itemAnimation = {
    hidden: { y: -20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <motion.ul id="todo" variants={listAnimation} initial="hidden" animate={renderList ? "visible" : "hidden"}>
      <AnimatePresence>
        {listData.map((item) => (
          <ListItem
            item={item}
            id={item.id}
            key={item.id}
            itemAnimation={itemAnimation}
            motion={motion}
          >
            {item.title}
          </ListItem>
        ))}
      </AnimatePresence>
    </motion.ul>
  );
};

export default List;
