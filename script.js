document.getElementById("kitapverbuton").addEventListener("click", function(event) {
    kitapver(event);
  });


/* let data;
let json;
//startupdb()
console.log(json); */

async function kitapver(event) {
    event.preventDefault();
    let kitapismi = document.querySelector('[name="bookN"]').value;
    let kitapyazari = document.querySelector('[name="bookAuthor"]').value;
    let kitapbarkod = document.querySelector('[name="bookid"]').value;

    //console.log(kitapismi, kitapyazari, kitapbarkod);

    const data = {
        name: kitapismi,
        author: kitapyazari,
        bookid: kitapbarkod,
    };
    if (!kitapismi || !kitapbarkod | !kitapyazari) {
        alert('Lütfen tüm alanları doldurun.');
        return;  // Alanlar doldurulmadıysa işlem iptal ediliyor
    }
    await startupdb(data);
    if (await startupdb(data) === false) {
        return;
    }

    else {
    fetch('/submit-book', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',  // JSON formatında veri gönder
        },
        body: JSON.stringify(data),  // Verileri JSON formatında gönder
    })
    .then(response => response.json())  // Sunucudan gelen cevabı JSON olarak al
    .then(result => {
        console.log('Success:', result);
        alert('Form başarıyla gönderildi!');
        location.reload();  // Başarılı mesajı
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Form gönderiminde hata oluştu.');
    });}
}


async function startupdb(bookinfo) {
    // Veritabanından başlangıç verilerini çekme
  
    /* await fetch('/api/initial-data-books')
     .then(response => response.json())
     .then(data => {
        console.log('Initial data:', data);
        return data;
      }) ; */
    response = await fetch('/api/initial-data-books')
    data = await response.json();
    console.log('Initial data:', data[0]);
    var objects = data[0]

    var results = [];
    
    var toSearch = bookinfo.name;
    
    for(var i=0; i<objects.length; i++) {
        for(key in objects[i]) {
            if(objects[i][key].indexOf(toSearch)!=-1) {
                if(objects[i][key].author == bookinfo.author && objects[i][key].bookid == bookinfo.bookid) {
                    results.push(objects[i]);


                }
            }
        }
    }
    if (results === 0) {console.log('safe'); return;} else{alert('Kitap sistemde zaten mevcut.'); location.reload(); return false;}
}
 