const trash = document.querySelector("#delete")

trash.addEventListener("click", event=>{
    //url of detail page
    const endpoint = `/${trash.dataset.doc}`
    //fetch the url and delete
     fetch(endpoint, {
         method: "DELETE"
     }).then(response => response.json())
     .then(data => window.location.href = data.redirect)
     .catch(err => console.log(err))
})