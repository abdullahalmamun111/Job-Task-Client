import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import axios from "axios";

const TaskBoard = () => {
  const [tasks, setTasks] = useState([]);

  // Backend থেকে টাস্ক লোড করুন
  useEffect(() => {
    axios.get("https://backend-sandy-two-30.vercel.app/tasks")
      .then((res) => setTasks(res.data))
      .catch((err) => console.log(err));
  }, []);

  // টাস্কের পজিশন আপডেট করার জন্য
  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const newTasks = Array.from(tasks);
    const [movedTask] = newTasks.splice(result.source.index, 1);
    newTasks.splice(result.destination.index, 0, movedTask);

    setTasks(newTasks);

    // Backend-এ নতুন অবস্থান আপডেট করুন
    axios.post("https://backend-sandy-two-30.vercel.app/tasks/reorder", {
      tasks: newTasks,
    }).catch((err) => console.log(err));
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="tasks">
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps} style={{ padding: 20 }}>
            {tasks.map((task, index) => (
              <Draggable key={task._id} draggableId={task._id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={{
                      padding: 10,
                      margin: "10px 0",
                      backgroundColor: "lightblue",
                      borderRadius: 5,
                    }}
                  >
                    {task.title}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default TaskBoard;
