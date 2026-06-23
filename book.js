
const tabs = document.querySelectorAll('.book-tab');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelectorAll('.book-tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.list-window').forEach(w => w.classList.remove('active'));

        tab.classList.add('active');
        const tabId = tab.getAttribute('data-tab');
        document.getElementById(tabId).classList.add('active');
    });
});
