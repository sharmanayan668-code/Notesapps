import React, { useState, useEffect } from 'react';

const App = () => {
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [task, setTask] = useState([]);
  const [search, setSearch] = useState('');
  const [editIndex, setEditIndex] = useState(null);

  // Load notes from localStorage
  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    setTask(savedNotes);
  }, []);

  // Save notes to localStorage
  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(task));
  }, [task]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (!input1 || !input2) return;

    const newNote = {
      input1,
      input2,
      time: new Date().toLocaleString(),
    };

    if (editIndex !== null) {
      const updatedTasks = [...task];
      updatedTasks[editIndex] = newNote;
      setTask(updatedTasks);
      setEditIndex(null);
    } else {
      setTask([...task, newNote]);
    }

    setInput1('');
    setInput2('');
  };

  const deleteNote = (index) => {
    const updatedTasks = task.filter((_, i) => i !== index);
    setTask(updatedTasks);
  };

  const editNote = (index) => {
    setInput1(task[index].input1);
    setInput2(task[index].input2);
    setEditIndex(index);
  };

  const filteredNotes = task.filter(
    (note) =>
      note.input1.toLowerCase().includes(search.toLowerCase()) ||
      note.input2.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="h-screen lg:flex bg-white">
      {/* Left Side Form */}
      <form
        onSubmit={submitHandler}
        className="flex justify-between lg:w-1/2 items-start flex-col gap-2 p-5"
      >
        <h1 className="w-full text-center bg-black text-white font-medium border">
          Add Notes
        </h1>
        <input
          onChange={(e) => setInput1(e.target.value)}
          className="px-5 w-full py-2 border outline-none rounded"
          value={input1}
          type="text"
          placeholder="Enter Notes Heading"
        />
        <textarea
          onChange={(e) => setInput2(e.target.value)}
          className="px-5 w-full h-42 py-2 border outline-none rounded"
          value={input2}
          placeholder="Write Details"
        />
        <button className="px-5 w-full py-2 outline-none rounded border bg-black text-white">
          {editIndex !== null ? 'Update Note' : 'Add Note'}
        </button>
      </form>

      {/* Right Side Notes */}
      <div className="flex lg:border-l-4 bg-gray-600 lg:w-1/2 gap-4 flex-col p-10">
        <h1 className="w-full text-center bg-white text-black font-medium border">
          Recent Notes
        </h1>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search notes..."
          className="px-4 py-2 rounded outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="flex flex-wrap h-full overflow-auto gap-5">
          {filteredNotes.map((elem, idx) => (
            <div
              key={idx}
              className="h-auto w-60 text-black p-4 rounded-2xl bg-white shadow-md"
            >
              <h3 className="leading-tight font-bold text-xl">{elem.input1}</h3>
              <p className="mt-2 leading-tight font-medium text-gray-700">
                {elem.input2}
              </p>
              <p className="text-xs text-gray-500 mt-2">{elem.time}</p>
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => editNote(idx)}
                  className="px-3 py-1 bg-blue-500 text-white rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteNote(idx)}
                  className="px-3 py-1 bg-red-500 text-white rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
