function uploadList(event) {
    event.preventDefault();
    const inputText = todoLisInput.value;
    todoLisInput.value = "";

    inputObj = {
        id: Date.now(),
        text: inputText
    };
    makeList(inputObj);
    todo.push(inputObj);
    saveList();
}
