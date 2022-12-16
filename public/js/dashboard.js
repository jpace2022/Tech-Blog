const newFormHandler = async (event) => {
    event.preventDefault();
    const name = document
    .querySelector("#blog-name").value;
    const description = document
    .querySelector("#blog-desc").value;

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
    if (event.target.hasAttribute("update-id")) {
        const id = event.target.getAttribute("update-id");
        const description = document.querySelector("#update-desc").value;
        const name = document.querySelector("#update-name").value

    if(name.length > 0 && description.length) {
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


if (document.querySelector(".blog-list") != null)
document.querySelector(".blog-list").addEventListener("click", delButtonHandler); 

if (document.querySelector("update-blog-form") != null)
document.querySelector("update-blog-form").addEventListener("submit", updateBlogHandler); 

