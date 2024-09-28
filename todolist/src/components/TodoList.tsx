import TodoCard from './TodoCard'

export default function TodoList({ 
    todos, 
    handleDeleteTodo, 
    handleEditTodo 
}: { 
    todos: string[]; 
    handleDeleteTodo: (index: number) => void; 
    handleEditTodo: (index: number) => void; 
}) {
    return (
        <ul className='main'>
            {todos.map((todo, todoIndex) => {
                return (
                    <TodoCard 
                        key={todoIndex} 
                        index={todoIndex}
                        handleDeleteTodo={(index: number) => handleDeleteTodo(index)}
                        handleEditTodo={(index: number) => handleEditTodo(index)}
                    >
                        <p>{todo}</p>
                    </TodoCard>
                )
            })}
        </ul>
    )
}