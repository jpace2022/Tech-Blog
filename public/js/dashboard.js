const newFormHandler = async (event) => {
    event.preventDefault();
    const name = document
    .querySelector("#blog-name").value;
    const description = document
    .querySelector("#blog-desc").value;
    console.log(name, description)

if (name.length > 0 && description.length) {

const response = await fetch("/api/blogs", {
                method: "POST",
                body: JSON.stringify({ name, description }),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if(response.ok) {
                document.location.replace(`/dashboard`);
            } else {
                alert ("Fail to create content.")
            
        }
    }
};  

const cancelButtonHandler = async (event) => {
    event.preventDefault();
        document.location.replace(`/dashboard`)
    }

    const updateBlogHandler = async (event) => {
        event.preventDefault();
            const id = event.target.getAttribute("update-id");
            const description = document.querySelector("#update-desc").value;
            const name = document.querySelector("#update-name").value
    
            await fetch(`/api/blogs/${id}`, {
                method: "PUT",
                body: JSON.stringify({ 
                    name, 
                    description 
                }),
                headers: { "Content-Type": "application/json"},
            });
    };        

const delButtonHandler = async (event) => {
    if (event.target.hasAttribute("data-id")) {
        const id = event.target.getAttribute("data-id");
        const response = await fetch(`/api/blogs/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if(response.ok) {
            document.location.replace(`/dashboard`);
        } else {
            alert ("Fail to delete content.")
            console.log(response)
            
        }
    }
};

if (document.querySelector(".new-blog-form") != null) {
document.querySelector(".new-blog-form").addEventListener("submit", newFormHandler); 
}

if (document.getElementById("deleteButton") != null)
document.getElementById("deleteButton").addEventListener("click", delButtonHandler); 

if (document.getElementById("createButton") != null)
document.getElementById("createButton").addEventListener("click", newFormHandler);

if (document.querySelector(".blog-list") != null)
document.querySelector(".blog-list").addEventListener("click", delButtonHandler); 

if (document.getElementById("updateButton") != null)
document.getElementById("updateButton").addEventListener("click", updateBlogHandler); 

