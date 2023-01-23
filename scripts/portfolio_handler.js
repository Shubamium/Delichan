import portfolio from '../data/portfolio.js';

// Display All Gallery item
function showPortfolio(gallery,parentEl){
    let imageList = portfolio[gallery] || null;
    if(!imageList){
        console.log("No Category is found!! Check the source code and make sure the category exists!");
        return;
    }

    console.log(gallery);
    imageList.forEach(list => {
        // Add item to the specified element
        parentEl.appendChild(createGalleryItem(list));
    });
    
}
// Create a gallery item element
function createGalleryItem({link,type,size}){
    // Create Element Type
    let galleryEl = document.createElement(type === "video" ? 'video' : 'img');
    // Set the source
    galleryEl.src = link;

    if(type === 'video'){
        galleryEl.setAttribute('controls','');
        galleryEl.setAttribute('loop','');
    }
    // Add lazy loading
    galleryEl.loading = "lazy";
    galleryEl.classList.add(size);

    galleryEl.addEventListener('click',()=>{
        window.open(link,'_blank');
    });
    return galleryEl;
}


export default showPortfolio;