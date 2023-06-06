import { useState } from "react";
import { Link } from "react-router-dom";

export interface TodoList_t {
  id: number;
  name: string;
  entries: number;
}
const TodoList: React.FC = () => {
  const [lists, setLists] = useState<TodoList_t[]>([]);
  const [newListName, setNewListName] = useState('');

  const handleNewListNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewListName(e.target.value);
  };

  const handleAddList = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newListName.trim() === '') return;
    const newList: TodoList_t = {
      id: Date.now(),
      name: newListName,
      entries: 0,
    };
    setLists([...lists, newList]);
    setNewListName('');
  };

  return (
    <div className="container">
      <form onSubmit={handleAddList}>
        <div className="form-group">
          <input
            type="text"
            placeholder="List Name"
            value={newListName}
            onChange={handleNewListNameChange}
          />
        </div>
        <button type="submit">Add List</button>
      </form>
      <ul className="todo-list">
        {lists.map((list) => (
          <li key={list.id}>
            <Link to={`/list/${list.id}`}>{list.name}</Link> - {list.entries} entries
          </li>
        ))}
      </ul>
    </div>
  );
};
export default TodoList;