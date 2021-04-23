const addBtn = document.getElementById('add-bookmark');
const addForm = document.getElementById('add-bookmark-form');
const formBtn = document.getElementById('add-bookmark-btn');
const popUpWrapper = document.getElementById('pop-up-wrapper');
const overlay = document.getElementById('overlay');
const bookmarksSection = document.getElementById('bookmarks-section');
const permBookmark = document.getElementById('permBookmark');
const closeFormBtn = document.getElementById('closeFormBtn');


// //Hide Add Form
function hideAddForm() {
    popUpWrapper.hidden = "true";
}

// Show Add Form
function showAddForm() {
    popUpWrapper.removeAttribute('hidden');
}

//CreatefaviconImgSrc
function createfaviconImgsrc(l) {
    return `${l.slice(0, (l.indexOf('.com') + 4))}/favicon.ico`;
}

//Create New Bookmark
function createBookmark(id, bookmarkURL, bookmarkNickname) { 
    //Create bookmark div
    let newBookmark = document.createElement("div");
    //Create favicon img element
    let faviconImg = document.createElement('img');
    //Set src for faviconImg
    faviconImg.src = createfaviconImgsrc(bookmarkURL);
    //Set class for styling of faviconImg
    faviconImg.classList.add('favicon');
    //Append faviconIMg to newBookmark
    newBookmark.appendChild(faviconImg);
    //Create anchor tag
    let link = document.createElement(`a`);
    // Assign bookmarkURL to anchor href
    link.href = `${bookmarkURL}`;
        //Set bookmarkNickname to display
    if ((bookmarkNickname === undefined) || !bookmarkNickname) {
        link.textContent = `${bookmarkURL.slice(0, 15)}...`
        link.title = `${bookmarkURL}`;
    } else {
        link.textContent = `${bookmarkNickname}`;
        link.title = `${bookmarkURL}`;
    }
    //Set anchor target to new window
    link.target = '_blank';
    // Add anchor to new bookmark div
    newBookmark.appendChild(link);
    // Create remove-icon/button wrapper
    let removeWrapper = document.createElement('remove-wrapper');
    // Add classList for Styling
    removeWrapper.classList.add('remove-wrapper');
    //Create button element
    let button = document.createElement('button');
    //Append button to remove-wrapper
    removeWrapper.appendChild(button);
    //Create icon element
    let icon = document.createElement('i');
    //Add Font Awesome icon classes to icon
    icon.classList.add('far');
    icon.classList.add('fa-times-circle');
    icon.classList.add('remove');
    //Set id of icon to later provide for deletion
    icon.id = `${id}`;
    //Append icon as a child of button
    button.appendChild(icon);
    //Append remove-wrapper to newBookmark
    newBookmark.appendChild(removeWrapper);
    //Add bookmark class for styling to newBookmark
    newBookmark.classList.add('bookmark');
    //Append newBOokmark to bookmarks section BEFORE the permBookmark
    bookmarksSection.insertBefore(newBookmark, permBookmark);
    addEventListenersToRemoveBtns();
    addForm.reset();
}

function formSubmitToCreateBookmark(e) {
    //Prevent default execution
    e.preventDefault();
    //Declare Variables
    let bookmarkURL = e.srcElement[1].value;
    let bookmarkNickname = e.srcElement[2].value;
    let object = {
        url: `${bookmarkURL}`,
        nickname: `${bookmarkNickname}`
    }
    bookmarksArray.push(object);
    object.id = bookmarksArray.indexOf(object);
    //Add Values to Local Storage
    localStorage.setItem("bookmarks", JSON.stringify(bookmarksArray));
    //
    hideAddForm();
    createBookmark(object.id, object.url, object.nickname);
}

//Remove Bookmark
function removeBookmark(e) {
    //Remove bookmark from DOM
    e.srcElement.parentElement.parentElement.parentElement.remove();
    let i = Number(e.srcElement.id);
    //Remove obj from local storage
    bookmarksArray = bookmarksArray.filter(obj => {return obj.id !== i});
    localStorage.setItem("bookmarks", JSON.stringify(bookmarksArray));
    console.log(bookmarksArray);
}
// Event Listeners

addBtn.addEventListener('click', showAddForm);
addForm.addEventListener('submit', formSubmitToCreateBookmark);
closeFormBtn.addEventListener('click', hideAddForm)
function addEventListenersToRemoveBtns() {
    let removeBtns = document.querySelectorAll('i.remove');
    removeBtns.forEach((btn) => btn.addEventListener('click', removeBookmark));
}



//ON LOAD
addEventListenersToRemoveBtns();
let bookmarksArray = [];


//Check local storage to retrieve if values
if (localStorage.getItem("bookmarks")) {
    bookmarksArray = JSON.parse(localStorage.getItem("bookmarks"));
    bookmarksArray.forEach((obj) => {
        obj.id = bookmarksArray.indexOf(obj);
        let {url , nickname, id} = obj;
        createBookmark(id, url, nickname);
    });
}
