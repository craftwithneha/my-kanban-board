// File: src/components/TaskCard.jsx
import React from 'react';
import { Trash2, Github, Linkedin } from 'lucide-react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export default function TaskCard({ task, onDelete }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: task.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
  <div
  ref={setNodeRef}
  {...attributes}
  {...listeners}
  style={style}
  className="bg-white border rounded-lg p-3 shadow-sm hover:shadow-md transition space-y-2 cursor-grab w-full max-w-[320px] mx-auto"
>

      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-sm">{task.title}</h3>
          <p className="text-xs text-gray-500">{task.description}</p>
        </div>
        <button onClick={() => onDelete(task.id)} className="text-gray-400 hover:text-red-500">
          <Trash2 size={16} />
        </button>
      </div>

      <div className="flex gap-2 flex-wrap">
        {task.tags?.map((tag, i) => (
          <span key={i} className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">
            {tag}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between mt-2">
        <div className="flex items-center gap-2">
          <img
            src={task.owner.avatar || 'https://i.pravatar.cc/100'}
            alt={task.owner.name}
            className="w-8 h-8 rounded-full object-cover"
          />
          <span className="text-sm">{task.owner.name}</span>
        </div>
        <div className="flex items-center gap-2">
          {task.owner.linkedin && (
            <a href={task.owner.linkedin} target="_blank" rel="noreferrer">
              <Linkedin size={16} className="text-blue-600" />
            </a>
          )}
          {task.owner.github && (
            <a href={task.owner.github} target="_blank" rel="noreferrer">
              <Github size={16} className="text-gray-800" />
            </a>
          )}
        </div>
      </div>
      <div className="text-right text-xs text-gray-500 mt-1">Due: {task.due}</div>
    </div>
  );
}
