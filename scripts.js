document.addEventListener('DOMContentLoaded', () => {
    const linkList = document.getElementById('link-list');
    const contentFrame = document.getElementById('content-frame');
    const addLinkButton = document.getElementById('add-link');

    // Load links from localStorage on extension load
    loadLinksFromLocalStorage();

    // Add link button click event
    addLinkButton.addEventListener('click', () => {
        const linkName = window.prompt("Enter the link name:");
        const linkUrl = window.prompt("Enter the link URL:");

        if (linkName && linkUrl) {
            addLinkToUI(linkName, linkUrl);
            saveLinkToLocalStorage(linkName, linkUrl);
        } else {
            alert("Both name and URL are required.");
        }
    });

    // Add link to UI
    function addLinkToUI(name, url) {
        const li = document.createElement('li');
        const link = document.createElement('a');
        link.href = '#';
        link.textContent = name;
        link.dataset.url = url;

        li.appendChild(link);
        linkList.appendChild(li);

        link.addEventListener('click', (e) => {
            e.preventDefault();
            contentFrame.src = url;
        });
    }

    // Save link to localStorage
    function saveLinkToLocalStorage(name, url) {
        let links = JSON.parse(localStorage.getItem('links')) || [];
        links.push({ name, url });
        localStorage.setItem('links', JSON.stringify(links));
    }

    // Load links from localStorage
    function loadLinksFromLocalStorage() {
        let links = JSON.parse(localStorage.getItem('links')) || [];
        links.forEach(link => {
            addLinkToUI(link.name, link.url);
        });
    }
});
