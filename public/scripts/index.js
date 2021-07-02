// FRONT END FILE TO INTERACT WITH THE DOM

const addUrlBtn = document.getElementById('add');
const showBtn = document.getElementById('show');
const bookmarkPage = document.getElementById('grid');
const deleteBm = document.getElementById('delete');


function openNav() {
  document.getElementById("sidebar").style.width = "250px";
  document.getElementById("main").style.marginLeft = "250px";
  document.querySelector(".openbtn").style.display = "none";
}

function closeNav() {
  document.getElementById("sidebar").style.width = "0";
  document.getElementById("main").style.marginLeft= "0";
  document.querySelector(".openbtn").style.display = "";
}


const addUrlToDb = (data) => {

    fetch('apiurldb', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      }
      ,body: JSON.stringify(data),
    })
   
    // .then(response => response.json(data))
    .then(data => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    })
  }

const searchUrl = (url) => {
    let key    = "885ec0fec8a0214d6c291676c7e57637";
    let target = url.value;
    let data = {key: key, q: target};


    fetch('https://api.linkpreview.net', {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify(data),
    })
    .then(res => res.json())
    .then(data => {
        console.log('YES !!', data);
        addUrlToDb(data);
      })
}



        const addBm = (bookmarks) => {
          bookmarkPage.innerHTML=""
            bookmarks.forEach((bookmark) => {
            let bookmarkCard = `      
               <div class="grid-item card">
               <div class="btn-action">
               <i class="far fa-star"></i>
               <a href="${bookmark.Url}" target="blank"><i class="far fa-eye btn-action"></i></a>
               <img class="delete" data-id=${bookmark.id}  src="static/img/sharp_delete.png">
               </div>
                <img id="myimage" src="${bookmark.Img_url}">
                <div id="mytitle" class="">${bookmark.Title}</div>
                <div id="mydescription" class="">${bookmark.Description}</div>
                <div class="url">
                <a href="${bookmark.Url}" target="blank">${bookmark.Url}</a>
                </div>
              </div>`
              console.log(bookmark.Title)
              bookmarkPage.insertAdjacentHTML('beforeend', bookmarkCard)
              // trashButton();
            })
          }

          const getBookmark = () => {
            fetch('/apigeturl', {
              method: 'POST', // or 'PUT'
              headers: {
                'Content-Type': 'application/json',
              }
            })
            .then(response => response.json()
            .then(data => {
              console.log('COME BACK INFO', data);

              addBm(data.data);
              trashButton();
              
            })
            )
          }




const deleteBookmark = (card) => {
            fetch('/apideleteurl', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(card),
            })
            .then(response => response.json())
            .then(data => {
              console.log('Success:', data);
            })
            .catch((error) => {
              console.error('Error:', error);
            });
          }

        
        const trashButton = () => {
            let trashes = document.querySelectorAll('.delete')
            
            trashes.forEach((trash) =>{
              let parent = trash.closest(".card")
                trash.addEventListener('click', (event) => {
                  console.log(trash.dataset.id)
                  deleteBookmark({id: trash.dataset.id})
                  parent.remove(); 
                })
            })
        }
        
// function reloadPage() {
//           location.reload();
//         }

getBookmark();

function clearInput() {

  document.getElementById("url-input").value = "";
}

addUrlBtn.addEventListener('click', (event) => {

    let input = document.getElementById('url-input')
    searchUrl(input);
    // clearInput();

});


showBtn.addEventListener('click', (event) => {
  getBookmark();
});


