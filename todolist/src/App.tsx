import { useState, useEffect } from "react"
import TodoInput from "./components/TodoInput"
import TodoList from "./components/TodoList"

function App() {
  const [todos, setTodos] = useState<string[]>([])
  const [todoValue, setTodoValue] = useState('')

  function persistData(newList: string[]) {
    localStorage.setItem('todos', JSON.stringify({ todos: newList }))
  }

  function handleAddTodos(newTodo: string) {
    const newTodoList = [...todos, newTodo];
    persistData(newTodoList);
    setTodos(newTodoList);
  }

  function handleDeleteTodo(index: number) {
    const newTodoList = todos.filter((_todo, todoIndex) => {
      return todoIndex !== Number(index)
    })
    persistData(newTodoList)
    setTodos(newTodoList)
  }

  function handleEditTodo(index: number) {
    const valueToBeEdited = todos[index]
    setTodoValue(valueToBeEdited)
    handleDeleteTodo(index)
  }

  useEffect(() => {
    if (!localStorage) {
      return
    }

    const localTodos = localStorage.getItem('todos')
    if (!localTodos) {
      return
    }

    console.log(localTodos);
    const parsedTodos = JSON.parse(localTodos);
    if (Array.isArray(parsedTodos.todos)) {
      setTodos(parsedTodos.todos);
    } else {
      console.error('Invalid todos format in localStorage');
    }

  }, []);

  return (
    <>
      <TodoInput todoValue={todoValue} setTodoValue={setTodoValue} handleAddTodos={handleAddTodos} />
      <TodoList handleEditTodo={handleEditTodo} handleDeleteTodo={handleDeleteTodo} todos={todos} />
    </>
  )
}

export default App