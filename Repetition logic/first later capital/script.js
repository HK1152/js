function capital() {
    let input = document.getElementById("input").value;
    let output = document.getElementById("output");
    let words = input.split(' ');

    let cap = [];
    let i = 0;

    while (i < words.length) {
        let word = words[i];

        let done = word.at(0).toUpperCase() + word.slice(1);
        cap.push(done);
        i++;
    }

    output.innerHTML = cap.join(' ');
}