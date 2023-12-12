import portfolio from '../data/portfolio.js';

// Display All Gallery item
function showPortfolio(gallery,parentEl){
    // let imageList = portfolio[gallery] || null;
    let errorEl = null;
    async function loadData(){
        try{
            // let response = await fetch(`https://delichan-be.vercel.app/image?tag=${gallery.toLowerCase()}`);
            let response = await fetchGalleryData(gallery.toLowerCase());
            // let imageList = await response.json();
            // console.log(imageList[0]);
            // display(imageList[0]);
						// display(response)
						response.forEach(list => {
							// Add item to the specified element
							parentEl.appendChild(createGalleryItem(list));
					});
            // console.log(imageList.map(data => {return {link:data.url,}}));
        }catch(err){
            // console.log(err,"Gallery Cannot be Loaded");
            errorEl = document.createElement("div"); 
            errorEl.innerHTML = '<p>There was an error when loading the gallery </p><button class="btn" onClick="location.reload()">Reload</button>';
            parentEl.appendChild(errorEl);
        }
        
    }
    loadData();

    function display(data){
        // const getSize = (size)=>{
        //     switch(size){
        //         case 1:
        //             return 'tiny'
        //         case 2:
        //             return 'small'
        //         case 3:
        //             return 'medium'
        //         case 4:
        //             return 'large'
        //         default:
        //             return 'medium'
        //     }
        // }
        // const getType = (type)=>{
        //     return type === 'image' ? type : 'video';
        // }
        // const data = list.map(data=>{
        //     let size = 'medium'; //Default Size
        //     if(data.customMetadata.size){
        //         size = getSize(data.customMetadata.size);
        //     }
        //     let type = getType(data.fileType);
        //     const imageData = {link:data.url,type:type, size:size};
        //     return imageData;
        // });
        data.forEach(list => {
            // Add item to the specified element
            parentEl.appendChild(createGalleryItem(list));
        });
    }
    // try{
    //     let response = await fetch(`https://apsi.imagekit.io/v1/files?tags=${gallery.toLowerCase()}`);
    //     let imageList = await response.json();
    //     console.log(imageList);
    // }catch(err){
    //     console.log(err,"Gallery Cannot be Loaded");
        
    // }


 
    // if(!imageList){
    //     console.log("No Category is found!! Check the source code and make sure the category exists!");
    //     return;
    // }

    // console.log(gallery);
    // imageList.forEach(list => {
    //     // Add item to the specified element
    //     parentEl.appendChild(createGalleryItem(list));
    // });
    
}

// Create a gallery item element
function createGalleryItem({link,type,size,alt}){
    // Create Element Type
    let galleryEl = document.createElement(type === "video" ? 'video' : 'img');
    // Set the source
    galleryEl.src = link;
		galleryEl.alt = alt;
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

// Select the DOM-element, so that you can replace it with content
let PROJECT_ID = "g6re9h6u";
let DATASET = "production";

async function fetchGalleryData(type){
	
		let QUERY = encodeURIComponent(`*[_type == "${type}"]{
			title,
			"size":art.size,
			"imageUrl": art.image.asset->url
		}`);
		// Compose the URL for your project's endpoint and add the query
		let URL = `https://${PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/${DATASET}?query=${QUERY}`;
		const response = await fetch(URL);
		const data = await response.json();
		const formatData = data.result.map(artwork => {
			return {
				alt:artwork.title,
				link:artwork.imageUrl,
				size:artwork.size,
				type:"image",
			}
		})
		return formatData
		// console.error(formatData)
}


// function getImageUrl(asset){
// 	const url = `https://${PROJECT_ID}.api.sanity.io/v1/data/asset/${DATASET}/${asset}`;
// 	const newUrl = `https://cdn.sanity.io/images/${PROJECT_ID}/production/${asset}`
// 	console.log(newUrl)
// 	return ""
// }
export default showPortfolio;

