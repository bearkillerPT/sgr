import { useState } from "react";
import { Link, Navigate } from "react-router-dom";

import './ListDetail.css';

export interface TodoLists_t {
  id: number;
  name: string;
}
const TodoList: React.FC = () => {
  const [lists, setLists] = useState<TodoLists_t[]>([]);
  const [newListName, setNewListName] = useState('');

  const handleNewListNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewListName(e.target.value);
  };

  const handleAddList = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newListName.trim() === '') return;
    const newList: TodoLists_t = {
      id: Date.now(),
      name: newListName,
    };
    setLists([...lists, newList]);
    setNewListName('');
  };
  const [clickedList, setClickedList] = useState<string|undefined>(undefined);
  return (
    <>
    {clickedList ? <Navigate to={'/list/' + clickedList}/> : null}
    <div className="listEntriesContainer">
      <form onSubmit={handleAddList}>
        <div className="form-group">
          <input
            type="text"
            placeholder="List Name"
            value={newListName}
            className='entryCheckbox'
            onChange={handleNewListNameChange}
          />
        </div>
        <button className='addEntryButton' type="submit">Add List</button>
      </form>
      <div className="listEntriesContainer">
      <h2 className='listName' style={{
        color: 'black',
      }}>Your Lists</h2>
        {lists.length > 0 ? lists.map((list) => (
          <button type="submit" key={list.id} className='entrieContainer' style={{
            width: '100%',
            cursor: 'pointer',
          }} onClick={()=>{
            setClickedList(list.name);
          }}>
            <Link className='noDecoratorLinkListName' to={`/list/${list.name}`}>{list.name}</Link>
          </button>
        )): 
        <div className='entrieContainer' style={{
          width: '100%',
        }}>
          <p className='noListsText'>You have no lists yet.</p>
        </div>
        }
      </div>
    </div></>
  );
};
export default TodoList;