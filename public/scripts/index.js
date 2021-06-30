// FRONT END FILE TO INTERACT WITH THE DOM

const addUrlBtn = document.getElementById('add');
const showBtn = document.getElementById('show');
const bookmarkPage = document.getElementById('grid');
const deleteBm = document.getElementById('delete');









// AJUSTABLE SIDEBAR

var minOffset = 150;
var maxOffset = 400;

$('.handle').mousedown(function(ev, handler) {
  $(document).mousemove(function(ev, handler) {
    var offset = ev.pageX;
    
    offset = offset < minOffset ? minOffset : offset;
    offset = offset > maxOffset ? maxOffset : offset;
    
    $('.sidebar').css('width', offset);
    $('.main-content').css('marginLeft', offset + 10);
  });
});

$(document).mouseup(function(e) {
  $(document).unbind('mousemove');
});

const addBookmark = (bookmarks) => {
   bookmarks.forEach((bookmark) => {
  
    })
  }


// END AJUSTABLE SIDEBAR

// // // Draggable
// function handleDragStart(e) {
//     this.style.opacity = '0.4';
//   }

//   function handleDragEnd(e) {
//     this.style.opacity = '1';
//   }

//   let items = document.querySelectorAll('.grid-container .grid-item');
//   items.forEach(function(item) {
//     item.addEventListener('dragstart', handleDragStart, false);
//     item.addEventListener('dragend', handleDragEnd, false);
//   });

//   document.addEventListener('DOMContentLoaded', (event) => {

//     function handleDragStart(e) {
//       this.style.opacity = '0.4';
//     }
  
//     function handleDragEnd(e) {
//       this.style.opacity = '1';
  
//       items.forEach(function (item) {
//         item.classList.remove('over');
//       });
//     }
  
//     function handleDragOver(e) {
//       if (e.preventDefault) {
//         e.preventDefault();
//       }
  
//       return false;
//     }
  
//     function handleDragEnter(e) {
//       this.classList.add('over');
//     }
  
//     function handleDragLeave(e) {
//       this.classList.remove('over');
//     }
  
//     let items = document.querySelectorAll('.grid-container .grid-item');
//     items.forEach(function(item) {
//       item.addEventListener('dragstart', handleDragStart, false);
//       item.addEventListener('dragover', handleDragOver, false);
//       item.addEventListener('dragenter', handleDragEnter, false);
//       item.addEventListener('dragleave', handleDragLeave, false);
//       item.addEventListener('dragend', handleDragEnd, false);
//     });
//   });

//   function handleDrop(e) {
//     e.stopPropagation(); // stops the browser from redirecting.
//     return false;
//   }

//   function handleDragStart(e) {
//     this.style.opacity = '0.4';
  
//     dragSrcEl = this;
  
//     e.dataTransfer.effectAllowed = 'move';
//     e.dataTransfer.setData('text/html', this.innerHTML);
//   }

//   function handleDrop(e) {
//     e.stopPropagation();
  
//     if (dragSrcEl !== this) {
//       dragSrcEl.innerHTML = this.innerHTML;
//       this.innerHTML = e.dataTransfer.getData('text/html');
//     }
  
//     return false;
//   }


const addUrlToDb = (data) => {

    fetch('apiurldb', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      }
      ,body: JSON.stringify(data),
    })
   
    .then(response => response.json(data))
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
            bookmarks.forEach((bookmark) => {
            let bookmarkCard = `      
               <div class="grid-item card">
                <img class="delete" data-id=${bookmark.id}  src="static/img/sharp_delete.png">
                <img id="myimage" src="${bookmark.Img_url}">
                <div id="mytitle" class="">${bookmark.Title}</div>
                <div id="mydescription" class="">${bookmark.Description}</div>
                <div class="url">
                <a href="${bookmark.Url}" target="blank">${bookmark.Url}</a>
                </div>
              </div>`
              console.log(bookmark.Title)
              bookmarkPage.insertAdjacentHTML('beforeend', bookmarkCard)


          
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
              console.log('Success:', data);
              addBm(data.data);
              trashButton();
            })
            )
          }
        
      //     function myFunction(){
      //       for(let i=1;i<=6; i++) {
      //         getBookmark();
      //   }
      // }


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
                trash.addEventListener('click', (event) => {
                  console.log(trash.dataset.id)
                  deleteBookmark({id: trash.dataset.id})
                  trash.parentNode.remove(); 
                })
            })
        }
        


function clearField() {

  document.getElementById("url-input").value = "";
}

addUrlBtn.addEventListener('click', (event) => {

    let input = document.getElementById('url-input')
    searchUrl(input);
    clearField();
    // getBookmark();


});


showBtn.addEventListener('click', (event) => {
  getBookmark();
});

// deleteBm.addEventListener('click', (event) => {
//   alert('Clicked');
// });
