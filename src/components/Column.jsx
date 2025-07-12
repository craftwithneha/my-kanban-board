// File: src/components/Column.jsx
import React, { useState } from 'react';
import TaskCard from './TaskCard';
import { Plus, X } from 'lucide-react';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';


export default function Column({ title, tasks, onAdd, onDelete }) {
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState({
  title: '',
  description: '',
  owner: {
    linkedin: '',
    github: '',
  },
});


  const submitTask = () => {
  if (!form.title) return;

  const finalTask = {
    ...form,
    id: Date.now().toString(),
    tags: [], // You can remove this line if not using tags
    owner: {
      ...form.owner,
      avatar: 'https://i.pravatar.cc/150?img=20', // Optional default avatar
      name: 'Owner', // Optional
    },
    due: new Date().toISOString().split('T')[0],
  };

  onAdd(finalTask);
  setForm({
    title: '',
    description: '',
    owner: { linkedin: '', github: '' },
  });
  setAdding(false);
};



  return (
        <div className="bg-white w-full max-w-sm p-3 rounded-lg shadow-sm flex-shrink-0">

      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-lg">{title}</h2>
        <button onClick={() => setAdding(!adding)}>
          <Plus size={18} className="text-blue-500" />
        </button>
      </div>

     {adding && (
  <div className="space-y-2 mb-4 border p-2 rounded bg-gray-50">
    <input
      className="w-full p-1 text-sm border rounded"
      placeholder="Project Name"
      value={form.title}
      onChange={(e) => setForm({ ...form, title: e.target.value })}
    />
    <textarea
      className="w-full p-1 text-sm border rounded"
      placeholder="Description"
      value={form.description}
      onChange={(e) => setForm({ ...form, description: e.target.value })}
    />
    <input
      className="w-full p-1 text-sm border rounded"
      placeholder="LinkedIn URL"
      value={form.owner.linkedin}
      onChange={(e) =>
        setForm({ ...form, owner: { ...form.owner, linkedin: e.target.value } })
      }
    />
    <input
      className="w-full p-1 text-sm border rounded"
      placeholder="GitHub URL"
      value={form.owner.github}
      onChange={(e) =>
        setForm({ ...form, owner: { ...form.owner, github: e.target.value } })
      }
    />

    <div className="flex justify-end gap-2">
      <button
        onClick={() => setAdding(false)}
        className="text-sm text-gray-500 border px-3 py-1 rounded hover:bg-gray-100"
      >
        Cancel
      </button>
      <button
        onClick={submitTask}
        className="text-sm bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
      >
        Add Task
      </button>
    </div>
  </div>
)}
<SortableContext items={tasks.map((task) => task.id)} strategy={verticalListSortingStrategy}>
  <div className="space-y-4">
    {tasks.map((task) => (
      <TaskCard key={task.id} task={task} onDelete={onDelete} />
    ))}
  </div>
</SortableContext>


    </div>
  );
}
