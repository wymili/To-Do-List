const localStorageKey = 'to-do-list';

function validateIfExistsNewTask() {
    let inputValue = document.getElementById('input-new-task').value;
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]");
    let exists = values.find(x => x.name === inputValue);
    return exists ? true : false;
}

function newTask() {
    let input = document.getElementById('input-new-task');

    if (!input.value) {  // Verifica se o valor está vazio
        input.style.border = "1px solid red";
        alert('Digite algo para inserir em sua lista.');
    } 
    else if (validateIfExistsNewTask()) {
        alert('Já existe uma task com essa descrição.');
    } 
    else {
        let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]");
        values.push({
            name: input.value  // Usa o valor do campo de entrada corretamente
        });
        localStorage.setItem(localStorageKey, JSON.stringify(values));
        input.value = ""; // Limpa o campo de entrada após adicionar a tarefa
        input.style.border = ""; // Remove a borda vermelha ao adicionar uma tarefa com sucesso
        showValues(); // Atualiza a lista exibida após adicionar uma nova tarefa
    }
}

function showValues() {
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]");
    let list = document.getElementById('to-do-list');
    list.innerHTML = ''; // Limpa a lista antes de adicionar novos itens
    for (let i = 0; i < values.length; i++) {
        list.innerHTML += `<li>${values[i]['name']} <button id='btn-ok' onclick='removeItem("${values[i]['name']}")'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16"><path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z"/></svg></button></li>`;
    }
}

function removeItem(data) {
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]");
    let index = values.findIndex(x => x.name === data);
    if (index > -1) {
        values.splice(index, 1);
    }
    localStorage.setItem(localStorageKey, JSON.stringify(values));
    showValues();
}

// Chama `showValues` ao carregar a página para exibir itens existentes
showValues();
