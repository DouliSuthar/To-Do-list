import React, { useState, useEffect } from 'react';
import './TodoList.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const TodoList = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        const storedTasks = JSON.parse(localStorage.getItem('tasks'));
        if (storedTasks) {
            setTasks(storedTasks);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    const addTask = () => {
        if (newTask.trim()) {
            setTasks([...tasks, { text: newTask, completed: false }]);
            setNewTask('');
        }
    };

    const removeTask = (index) => {
        setTasks(tasks.filter((_, i) => i !== index));
    };

    const toggleCompletion = (index) => {
        setTasks(
            tasks.map((task, i) =>
                i === index ? { ...task, completed: !task.completed } : task
            )
        );
    };

    const handleInputChange = (e) => {
        setNewTask(e.target.value);
    };

    const deleteCompletedTasks = () => {
        setTasks(tasks.filter(task => !task.completed));
    };

    const deleteAllTasks = () => {
        setTasks([]);
    };

    const filteredTasks = tasks.filter((task) => {
        if (filter === 'completed') return task.completed;
        if (filter === 'incomplete') return !task.completed;
        return true;
    });

    return (
        <div className="todo-list-container">
            <h1>Todo Input</h1>
            <div className="input-container">
                <input
                    type="text"
                    value={newTask}
                    onChange={handleInputChange}
                    placeholder="New Todo"
                />
                <button onClick={addTask}>Add new task</button>
            </div>
            
            <h2>Todo List</h2>
            <div className="filters">
                <button onClick={() => setFilter('all')}>All</button>
                <button onClick={() => setFilter('completed')}>Done</button>
                <button onClick={() => setFilter('incomplete')}>Todo</button>
            </div>
            <ul className="task-list">
                {filteredTasks.map((task, index) => (
                    <li key={index} className={task.completed ? 'completed' : ''}>
                        {task.text}
                        <div className="task-actions">
                            <button onClick={() => toggleCompletion(index)}>
                                {task.completed ? (
                                    <i className="far fa-check-circle"></i>
                                ) : (
                                    <i className="far fa-circle"></i>
                                )}
                            </button>

                            <button onClick={() => alert("Editing task functionality is not implemented yet.")}>
                                <i className="fas fa-pencil-alt"></i>
                            </button>
                            <button onClick={() => removeTask(index)}>
                                <i className="fas fa-trash"></i>
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
            <div className="delete-buttons">
                <button onClick={deleteCompletedTasks}>Delete done tasks</button>
                <button onClick={deleteAllTasks}>Delete all tasks</button>
            </div>
        </div>
    );
};

export default TodoList;
