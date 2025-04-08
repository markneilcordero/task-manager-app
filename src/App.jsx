import React, { useState, useEffect } from 'react';
import TaskForm from './TaskForm'; // Import TaskForm component
import TaskList from './TaskList'; // Import TaskList component
import StatsPanel from './StatsPanel'; // Import StatsPanel component
import FilterPanel from './FilterPanel'; // Import FilterPanel component
import SearchBar from './SearchBar'; // Import SearchBar component
import EmptyState from './EmptyState'; // Import EmptyState component
import ToastAlert from './ToastAlert'; // Import ToastAlert component
import useLocalStorage from './useLocalStorage';

export default function App() {
  const [tasks, setTasks] = useLocalStorage('react-tasks', []); // Tasks state
  const [showTaskForm, setShowTaskForm] = useState(false); // To show task form for adding/editing
  const [searchQuery, setSearchQuery] = useState(''); // Search query for filtering tasks
  const [filter, setFilter] = useState({
    status: 'all',
    priority: 'all',
    category: 'all',
  }); // Filter criteria
  const [sortBy, setSortBy] = useState('dueDate'); // Sorting criteria (by due date or priority)
  const [toastMessage, setToastMessage] = useState(''); // Toast message
  const [toastType, setToastType] = useState(''); // Toast type: success, error, info

  // This function will generate 20 example tasks and save them to localStorage
  const generateExampleTasks = () => {
    const exampleTasks = [
      { id: 1, title: "Complete React Project", description: "Finish the React project for the client.", completed: false, priority: "High", category: "Work", dueDate: "2023-04-10" },
      { id: 2, title: "Buy Groceries", description: "Buy groceries including vegetables, fruits, and dairy products.", completed: false, priority: "Medium", category: "Personal", dueDate: "2023-04-05" },
      { id: 3, title: "Write Blog Post", description: "Write a blog post about the new features in React 18.", completed: false, priority: "High", category: "Work", dueDate: "2023-04-08" },
      { id: 4, title: "Finish Reading Book", description: "Complete reading the book 'Atomic Habits' by James Clear.", completed: true, priority: "Low", category: "Personal", dueDate: "2023-03-25" },
      { id: 5, title: "Call Mom", description: "Catch up with mom and ask her how she's doing.", completed: false, priority: "Medium", category: "Personal", dueDate: "2023-04-04" },
      { id: 6, title: "Update Resume", description: "Update the resume with recent work experience and skills.", completed: false, priority: "High", category: "Work", dueDate: "2023-04-15" },
      { id: 7, title: "Exercise", description: "Go for a 30-minute run in the morning.", completed: true, priority: "Medium", category: "Personal", dueDate: "2023-04-03" },
      { id: 8, title: "Prepare Presentation", description: "Prepare slides for the quarterly review meeting on Friday.", completed: false, priority: "High", category: "Work", dueDate: "2023-04-07" },
      { id: 9, title: "Email Invoice to Client", description: "Send the invoice for the completed project to the client.", completed: false, priority: "Medium", category: "Work", dueDate: "2023-04-04" },
      { id: 10, title: "Attend Team Meeting", description: "Join the team meeting at 10:00 AM to discuss project progress.", completed: false, priority: "Medium", category: "Work", dueDate: "2023-04-06" },
      { id: 11, title: "Plan Weekend Trip", description: "Finalize details for the weekend trip to the beach with friends.", completed: false, priority: "Low", category: "Personal", dueDate: "2023-04-12" },
      { id: 12, title: "Organize Desk", description: "Clean and organize your work desk and throw away unnecessary papers.", completed: true, priority: "Low", category: "Personal", dueDate: "2023-04-01" },
      { id: 13, title: "Pay Bills", description: "Pay electricity, water, and internet bills.", completed: false, priority: "High", category: "Personal", dueDate: "2023-04-05" },
      { id: 14, title: "Review Code Pull Requests", description: "Review the pull requests submitted by teammates and provide feedback.", completed: false, priority: "Medium", category: "Work", dueDate: "2023-04-06" },
      { id: 15, title: "Schedule Doctor Appointment", description: "Call the doctor’s office to schedule an appointment for next week.", completed: false, priority: "Medium", category: "Personal", dueDate: "2023-04-07" },
      { id: 16, title: "Buy Birthday Gift", description: "Buy a birthday gift for friend Sarah. She likes jewelry.", completed: false, priority: "Medium", category: "Personal", dueDate: "2023-04-08" },
      { id: 17, title: "Clean the Garage", description: "Spend some time cleaning out and organizing the garage.", completed: false, priority: "Low", category: "Personal", dueDate: "2023-04-10" },
      { id: 18, title: "Attend Conference", description: "Attend the marketing conference from 9 AM to 5 PM on Thursday.", completed: false, priority: "High", category: "Work", dueDate: "2023-04-06" },
      { id: 19, title: "Write Thank You Email", description: "Write a thank-you email to your colleague for their help last week.", completed: false, priority: "Low", category: "Work", dueDate: "2023-04-03" },
      { id: 20, title: "Clean Kitchen", description: "Clean the kitchen, including washing dishes and wiping surfaces.", completed: false, priority: "Medium", category: "Personal", dueDate: "2023-04-04" }
    ];

    setTasks(exampleTasks); // Add the generated tasks to localStorage
    console.log('Example tasks added to localStorage:', exampleTasks); // Log the tasks
  };

  // Check if tasks are already in localStorage and populate if empty
  useEffect(() => {
    if (tasks.length === 0) {
      generateExampleTasks();
    }
  }, [tasks]); // This effect will only run once when `tasks` is empty

  // Add a new task
  const addTask = (task) => {
    setTasks((prevTasks) => [...prevTasks, task]);
    setToastMessage('Task added successfully!');
    setToastType('success');
    setShowTaskForm(false); // Hide the form after adding the task
  };

  // Edit existing task
  const editTask = (updatedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
    setToastMessage('Task updated successfully!');
    setToastType('success');
  };

  // Delete task
  const deleteTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    setToastMessage('Task deleted successfully!');
    setToastType('success');
  };

  // Filter tasks based on search query
  const filteredTasks = tasks.filter(
    (task) =>
      (task.title?.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (task.description?.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Filter tasks based on selected filter
  const finalTasks = filteredTasks.filter((task) => {
    const statusFilter =
      filter.status === 'all' || (filter.status === 'completed' && task.completed) || (filter.status === 'pending' && !task.completed);
    const priorityFilter = filter.priority === 'all' || task.priority === filter.priority;
    const categoryFilter = filter.category === 'all' || task.category === filter.category;
    return statusFilter && priorityFilter && categoryFilter;
  });

  // Sort tasks based on selected criteria (creating a new array to avoid mutating state)
  const sortedTasks = [...finalTasks].sort((a, b) => {
    if (sortBy === 'dueDate') {
      // Handle cases where dueDate might be undefined or invalid
      const dateA = new Date(a.dueDate);
      const dateB = new Date(b.dueDate);
      return isNaN(dateA) ? 1 : isNaN(dateB) ? -1 : dateA - dateB;
    } else {
      return a.priority.localeCompare(b.priority);
    }
  });

  // Close toast after a few seconds
  const closeToast = () => {
    setToastMessage('');
    setToastType('');
  };

  return (
    <div className="container mt-5">
      <ToastAlert message={toastMessage} type={toastType} onClose={closeToast} />

      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <FilterPanel categories={['Work', 'Personal']} filter={filter} setFilter={setFilter} sortBy={sortBy} setSortBy={setSortBy} />
      <StatsPanel tasks={tasks} />

      {showTaskForm && <TaskForm onSave={addTask} />}
      
      {tasks.length === 0 ? (
        <EmptyState onAddTask={() => setShowTaskForm(true)} />
      ) : (
        <TaskList tasks={sortedTasks} onEdit={editTask} onDelete={deleteTask} />
      )}

      <button className="btn btn-primary mt-4" onClick={() => setShowTaskForm(true)}>
        Add New Task
      </button>
    </div>
  );
}
