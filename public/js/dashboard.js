const newFormHandler = async (event) => {
    event.preventDefault();

    const name = document
    .querySelector("#blog-name").value;

    const description = document
    .querySelector("#blog-desc").value;

 const cancelButtonHandler = async (event) => {
    event.preventDefault();
        document.location.replace(`/dashboard`)
    }

if (name && description) {
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

const updateBlogHandler = async (event) => {
    event.preventDefault();
    if (event.target.hasAttribute("updoot-id")) {
        const id = event.target.getAttribute("updoot-id");
        const description = document.querySelector("#update-desc").value;
        const name = document.querySelector("#update-name").value

    if(description && name) {
        const response = await fetch(`/api/blogs/${id}`, {
            method: "PUT",
            body: JSON.stringify({ description, name }),
            header: {
                "Content-Type": "application/json",
        },
    });
        if (response.ok) {  
        document.location.replace(`/dashboard`);    
      } else {   
        alert ("Fail to update content.")    
      }   
    }     
  }
};   


const delButtonHandler = async (event) => {
    if (event.target.hasAttribute("data-id")) {
        const id = event.target.getAttribute("data-id");
        const response = await fetch(`/api/blogs/${id}`, {
            method: "DELETE",
            body: JSON.stringify({ description }),
            headers: {
                "Content-Type": "application/json",
            },
        });
        if(response.ok) {
            document.location.replace(`/dashboard`);
        } else {
            alert ("Fail to delete content.")
            
        }
    }
};

if (document.querySelector(".new-blog-form") != null)
document.querySelector(".new-blog-form").addEventListener("submit", newFormHandler); 
console.log(newFormHandler)

if (document.querySelector(".blog-list") != null)
document.querySelector(".blog-list").addEventListener("click", delButtonHandler); 

if (document.querySelector(".update-blog-form") != null)
document.querySelector("update-blog-form").addEventListener("submit", updateBlogHandler); 