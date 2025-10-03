let button = document.getElementById('button');
let ul = null;
let arr = ["apple", "banana", "cherry",  "elderberry", "fig", "grape", "honeydew", "kiwi", "lemon", "mango"];
let main = document.getElementById('main');
function Click() {
    if (ul !== null) {
        document.body.removeChild(ul);
    }
    ul = document.createElement('ul');
    for (let i = 0; i < arr.length; i++) {
        let li = document.createElement('li');
        li.textContent = arr[i];
        ul.append(li);      
    }   
    document.body.append(ul);
}

// button.addEventListener('dblclick', Click);  