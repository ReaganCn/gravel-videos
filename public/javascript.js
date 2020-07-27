let navContainer = document.getElementById("links-container");

let links = document.getElementsByClassName("categories-link");

for (let i = 0; i< links.length; i++) {
    links[i].addEventListener("click", function (){
        var current = document.getElementsByClassName("active")

        if (current.length > 0) {
            current[0].document.className.replace(" active", "")
        }
        this.className+= " active"
    })
}