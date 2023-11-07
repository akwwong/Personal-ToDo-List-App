window.addEventListener('load', () => {

    // global variable - no declaration
    todos = JSON.parse(localStorage.getItem('todos')) || []

    const nameInput = document.querySelector('#name')
    const newToDoForm = document.querySelector('#new-todo-form')
    const username = localStorage.getItem('username') || ''

    nameInput.value = username
    nameInput.addEventListener('change', e => {
        localStorage.setItem('username', e.target.value)
    })

    newToDoForm.addEventListener('submit', e => {
        e.preventDefault()

        const todo = {
            // targets the input name="content" in the html
            content: e.target.elements.content.value,
            category: e.target.elements.category.value,
            done: false,
            createdAt: new Date().getTime()
        }

        // pushes the todo object into array
        todos.push(todo)

        // sets the todo object into the array saved in localStorage
        localStorage.setItem('todos', JSON.stringify(todos))

        e.target.reset()

        displayTodos()
    })

    displayTodos()
})

// display each item in the todo array
function displayTodos () {

    // checks if there are any todos in console
    console.log(todos)

    const todoList = document.querySelector('#todo-list')

    // clears all elements
    todoList.innerHTML = ""

    // accesses global variable
    todos.forEach(todo => {
        const todoItem = document.createElement('div')
        todoItem.classList.add('todo-item')

        const label = document.createElement('label')
		const input = document.createElement('input')
		const span = document.createElement('span')
		const content = document.createElement('div')
		const actions = document.createElement('div')
		const editButton = document.createElement('button')
		const deleteButton = document.createElement('button')

		input.type = 'checkbox'
		input.checked = todo.done
		span.classList.add('bubble')

		if (todo.category == 'personal') {
			span.classList.add('personal')
		} else {
			span.classList.add('business')
		}

		content.classList.add('todo-content')
		actions.classList.add('actions')
		editButton.classList.add('edit')
		deleteButton.classList.add('delete')

		content.innerHTML = `<input type="text" value="${todo.content}" readonly>`
		editButton.innerHTML = 'Edit'
		deleteButton.innerHTML = 'Delete'

		label.appendChild(input)
		label.appendChild(span)
		actions.appendChild(editButton)
		actions.appendChild(deleteButton)

		todoItem.appendChild(label)
		todoItem.appendChild(content)
		todoItem.appendChild(actions)

		todoList.appendChild(todoItem)

        if (todo.done) {
            todoItem.classList.add('done')
        }

        // changes to todo list
        input.addEventListener('change', (e) => {
			todo.done = e.target.checked
			localStorage.setItem('todos', JSON.stringify(todos))

			if (todo.done) {
				todoItem.classList.add('done')
			} else {
				todoItem.classList.remove('done')
			}

            // redisplay todos
			displayTodos()
		})

        // allows user to edit todolist json objects
        editButton.addEventListener('click', e => {
            const input = content.querySelector('input')
            input.removeAttribute('readonly')
            input.focus()
            input.addEventListener('blur', e => {
                input.setAttribute('readOnly', true)
                todo.content = e.target.value
                localStorage.setItem('todos', JSON.stringify(todos))
                displayTodos()
            })
        })

        // allows user to remove that specific todolist json object out of the array
        deleteButton.addEventListener('click', e => {

            // filters that specific json (the todo in the array of todos) out and returns a new array
            todos = todos.filter(t => t != todo)

            // sets the filtered array without that previous object into localStorage
            localStorage.setItem('todos', JSON.stringify(todos))
            displayTodos()
        })
    })
}