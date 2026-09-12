# RabTech Academy — Task 05
## Dynamic JavaScript DOM Logic & RESTful API Client

### Ready-made implementation
This project implements every requirement listed in Task 05:

1. **Async/await + Fetch** — `js/api.js` calls the public Fake Store REST API.
2. **Real-time search** — `js/app.js` filters products as the user types.
3. **Category tabs** — All, Electronics, Jewellery, Men and Women.
4. **Sorting** — Price low/high, rating and name A–Z.
5. **DOM updates without page reloads** — filtering/sorting re-renders only the product grid.
6. **localStorage state caching** — search, category, sort and cart state are saved.
7. **Error handling** — failed API requests show a user-friendly retry banner.
8. **Loading skeleton** — cards are displayed while the API request is loading.
9. **Modular JavaScript** — `api.js` handles API access and `app.js` handles UI/DOM logic.

### Repository structure

```text
RabTech-5/
├── index.html
├── css/
│   └── style.css
├── js/
│   ├── api.js
│   └── app.js
└── README.md
```

### How to run
Open `index.html` in a browser with an internet connection, or deploy the repository using GitHub Pages.

### Expected demo
The page loads product cards from the REST API. Use the search box, category tabs and sorting dropdown. Add products to the cart and refresh the page to verify that the saved cart count remains because of localStorage.

### Submission
Make the GitHub repository public and submit the repository URL in the RabTech Academy Task 05 deliverable field.
