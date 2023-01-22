import waitlist from '../data/waitlist.js';

const navEl = document.getElementById('waitlist-nav');
const waitParentEl = document.getElementById('all_waitlist');


document.addEventListener('DOMContentLoaded',initializeWaitlst);


// Starting point  === Initialize the list when html loaded
function initializeWaitlst(){
    console.log(waitlist);
    createNavigation(Object.keys(waitlist));

    for(const list in waitlist){
        console.log(list);
        waitParentEl.appendChild(createWaitlist(list,waitlist[list]));
    }
    // waitParentEl.appendChild(createWaitlist('January',waitlist.January));
    // waitParentEl.appendChild(createWaitlist('August',waitlist.August));
}



function createWaitlist(name,data){ 
    let waitlist = document.createElement('div');
    waitlist.classList.add('waitlist');
    let header = document.createElement('h2');
    header.textContent = name;
    header.classList.add('title');
    waitlist.setAttribute('data-wl',name);
    waitlist.appendChild(header);

    data.forEach(list =>{
        waitlist.append(createListing(list));
    });
    return waitlist;

}

function createListing({customer,type,date,payment,delivered}){
    let listing = document.createElement('div');
    let content = 
    ` <div class="listing">
        <div class="info_general">
            <h2 class="buyer">${customer}</h2>
            <p class="item">${type}</h2>
            <div class="payment ${payment === 'Half Paid'? 'half' : ''}">
                <p class="payment_status">
                    ${payment}
                </p>
            </div>
        </div>
        <div class="info_time">
                <p class="date">${date}</p>
                <div class="status_container ${delivered === 'Incoming' ? 'incoming' : 'wip'} ">
                    <p class="status">${delivered}</p>
                </div>
        </div>
        </div>
    `;

    listing.innerHTML = content;
    return listing;
}








// Create the navigation
function createNavigation(navigationList){
    // Clear the navigation
    navEl.innerHTML = "";

    let showAll = document.createElement('button');
    showAll.classList.add('btn');
    showAll.textContent = 'All';
    navEl.appendChild(showAll);
    showAll.addEventListener('click',()=>{
        handleNav(showAll,'show');
    });

    navigationList.forEach(nav => {
        let button = document.createElement('button');
        button.classList.add('btn');
        button.textContent = nav;
        navEl.appendChild(button);

        button.addEventListener('click',()=>{
            handleNav(button);
        });

    });
    
}


function handleNav(btn){
    console.log('hie');
    btn.classList.add('selected');
}