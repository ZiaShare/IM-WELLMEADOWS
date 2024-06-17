document.getElementById('search-button').addEventListener('click', function() {
    const query = document.getElementById('search-input').value;
    search(query);
});

document.getElementById('search-input').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        const query = document.getElementById('search-input').value;
        search(query);
    }
});

function search(query) {
    const results = [
        "Result 1: " + query,
        "Result 2: " + query,
        "Result 3: " + query
    ];
    
    displayResults(results);
}

function displayResults(results) {
    const resultsContainer = document.getElementById('search-results');
    resultsContainer.innerHTML = '';
    
    results.forEach(result => {
        const div = document.createElement('div');
        div.textContent = result;
        resultsContainer.appendChild(div);
    });
}