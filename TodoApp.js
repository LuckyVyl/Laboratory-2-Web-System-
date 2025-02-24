import React, { useState, useEffect } from 'react';

const TodoApp = () => {
    const [tasks, setTasks] = useState(() => JSON.parse(localStorage.getItem('tasks')) || []);
    const [taskInput, setTaskInput] = useState('');
    const [filter, setFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    const addTask = () => {
        if (taskInput.trim()) {
            setTasks([...tasks, { text: taskInput, completed: false }]);
            setTaskInput(''); // Clear input after adding
        }
    };

    const toggleComplete = (index) => {
        const newTasks = tasks.map((task, i) =>
            i === index ? { ...task, completed: !task.completed } : task
        );
        setTasks(newTasks);
    };

    const deleteTask = (index) => {
        setTasks(tasks.filter((_, i) => i !== index));
    };

    const filteredTasks = tasks.filter(task => {
        const matchesFilter =
            filter === 'all' ||
            (filter === 'complete' && task.completed) ||
            (filter === 'incomplete' && !task.completed);
        const matchesSearch = task.text.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    return (
        <div className="container">
            <h1>To-Do List 📝</h1>
            <input 
                type="text" 
                value={taskInput} 
                onChange={(e) => setTaskInput(e.target.value)} 
                placeholder="Add your task" 
            />
            <button onClick={addTask}>Add Task</button>
            <select onChange={(e) => setFilter(e.target.value)} value={filter}>
                <option value="all">All</option>
                <option value="complete">Complete</option>
                <option value="incomplete">Incomplete</option>
            </select>
            <input 
                type="text" 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)} 
                placeholder="Search tasks..." 
            />
            <div id="taskList">
                {filteredTasks.map((task, index) => (
                    <div className="task" key={index}>
                        <span className={task.completed ? 'completed' : ''}>{task.text}</span>
                        <div>
                            <button onClick={() => toggleComplete(index)}>
                                {task.completed ? 'Undo' : 'Complete'}
                            </button>
                            <button onClick={() => deleteTask(index)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TodoApp;