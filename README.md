# Advanced To-Do List | Notepad

- Chrome Web Store: [https://chromewebstore.google.com/detail/mibfplaelemmjmeljhlfnhdmmajgdeio?utm_source=item-share-cb]

## Project description

This is an extension for any website, with advanced functionality.

- Add a task.
- Edit a task.
- Copy a task.
- Assign a color to a task.
- Deleting tasks.
- Drag-and-drop functionality has been implemented.
- Data is stored in **localStorage**.

---

## Technologies used

- **React** (components, hooks)
- **CSS** (dimensions are given in the pixel system)

---

## Project structure

### External files and configurations (project root)

- .gitignore
- eslint.config.js
- manifest.json
- package-lock.json
- package.json
- README.md (documentaton)
- vite.config.js (with setting)

### Folders

```
popup/ (action window (to display the panel))
    popup.html
    popup.css
    popup.js
public/
  icons/ (.png for Chrome Web Store)
    icon16.png
    icon32.png
    icon48.png
    icon128.png
  images/ (.png for checkbox)
    checked.png
    unchecked.png
src/
  components/
     images/
        autoclick.png
        checked.png
        donate.png
        github.png
        gmail.png
        unchkened.png
        website.png
     InputRow/
        InputRow.css
        InputRow.jsx
     Main/
       Links/
         Links.css
         Links.jsx
       Main.css
       Main.jsx
     TaskList/
       TaskList.css
       TaskList.jsx
  App.jsx
  content.jsx (entry point, messaging function for panel visibility)

```

### Additionally

- .idea (IDE settings)
