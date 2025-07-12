// File: src/components/KanbanBoard.jsx
import React, { useState } from 'react';
import Column from './Column';
import {
  DndContext,
  closestCenter,
  useDroppable,
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Star } from 'lucide-react';

// 👇 DroppableColumn defined here for simplicity
function DroppableColumn({ id, children }) {
  const { setNodeRef } = useDroppable({ id });
  return (
    <div ref={setNodeRef} className="min-w-[280px] sm:min-w-[320px] lg:min-w-[360px] h-full">
      {children}
    </div>
  );
}

const initialData = {
  'To-do': [
    {
      id: '1',
      title: 'Design Support UI',
      description: 'Landing page for the support team with feedback.',
      due: '2025-07-20',
      tags: ['UI', 'Frontend'],
      owner: {
        name: 'Sarah Ali',
        avatar: 'https://i.pravatar.cc/150?img=32',
        linkedin: 'https://linkedin.com/in/sarah-ali',
        github: 'https://github.com/sarah-ali',
      },
    },
  ],
  'In-progress': [],
  'Done': [],
};

export default function KanbanBoard() {
  const [tasks, setTasks] = useState(initialData);

  const findColumnOfTask = (id) => {
    return Object.keys(tasks).find((column) =>
      tasks[column].some((task) => task.id === id)
    );
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    const sourceColumn = findColumnOfTask(activeId);
    let targetColumn = findColumnOfTask(overId);

    // If dropped on a column (not a card)
    if (!targetColumn && Object.keys(tasks).includes(overId)) {
      targetColumn = overId;
    }

    if (!sourceColumn || !targetColumn) return;
    if (sourceColumn === targetColumn) return;

    const activeTask = tasks[sourceColumn].find((task) => task.id === activeId);

    const updatedSource = tasks[sourceColumn].filter((task) => task.id !== activeId);
    const updatedTarget = [...tasks[targetColumn], activeTask];

    setTasks({
      ...tasks,
      [sourceColumn]: updatedSource,
      [targetColumn]: updatedTarget,
    });
  };

  const handleAddTask = (column, newTask) => {
    setTasks((prev) => ({
      ...prev,
      [column]: [...prev[column], { ...newTask, id: Date.now().toString() }],
    }));
  };

  const handleDeleteTask = (id) => {
    const updated = {};
    for (const col in tasks) {
      updated[col] = tasks[col].filter((t) => t.id !== id);
    }
    setTasks(updated);
  };

  return (
   <div className="py-4 bg-gray-100 min-h-screen overflow-hidden">
  <main className="flex-1 px-2 sm:px-4 md:px-6 lg:px-10 overflow-hidden">
    <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 flex items-center gap-3">
      Kanban Board <Star className="w-5 h-5 text-gray-600" />
    </h1>

    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <div className="flex gap-2 sm:gap-4 md:gap-6 overflow-x-auto pb-2 scrollbar-hide">
        {Object.keys(tasks).map((column) => (
          <DroppableColumn key={column} id={column}>
            <SortableContext
              items={tasks[column].map((task) => task.id)}
              strategy={verticalListSortingStrategy}
            >
              <Column
                title={column}
                tasks={tasks[column]}
                onAdd={(newTask) => handleAddTask(column, newTask)}
                onDelete={handleDeleteTask}
              />
            </SortableContext>
          </DroppableColumn>
        ))}
      </div>
    </DndContext>
  </main>
</div>

  );
}
