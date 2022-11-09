const newFormHandler = async (event) => {
    event.preventDefault();
    if (event.target.hasAttribute("blog-id")) {
        const description = document.querySelector("#comment-desc").ariaValueMax.trim();
        const blog_id = event.target.getAttribute("blog_id");
        if (description) {
            const response = await fetch("/api/comments", {
                method: "POST",
                body: JSON.stringify({ description, blog_id }),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if(response.ok) {
                document.location.replace("/blog/${blog_id}");
            } else {
                alert ("Fail to create content.")
            }
        }
    }
};

const delButtonHandler = async (event) => {
    event.preventDefault();
    if (event.target.hasAttribute("comment-id")) {
        const id = event.target.getAttribute("#comment-id");
        const response = await fetch("/api/comment/${id}", {
            method: "DELETE",
        });
        if(response.ok) {    
            document.location.reload();    
        } else {   
            alert ("Fail to delete content.")    
        }   
    }     
 };   

 const cancelButtonHandler = async (event) => {
    event.preventDefault();
    if (event.target.hasAttribute("cancel-id")) {
        const blog_id = event.target.getAttribute("blog-id");
        document.location.replace("/blogs/${blog_id}")
    }
};

const updateCommentHandler = async (event) => {
    event.preventDefault();
    if (event.target.hasAttribute("blog-id")) {
        const id = event.target.getAttribute("update-id");
        const description = document.querySelector("#comment-desc").value.trim();
        const blog_id = event.target.getAttribute("blog-id");
        if (description) {
            const response = await fetch("/api/comments/${id}", {
                method: "PUT",
                body: JSON.stringify({ description }),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if(response.ok) {
                document.location.replace("/blog/${blog_id}");
            } else {
                alert ("Fail to update content.")
            }
        }
    }
};

if (document.querySelector(".new-comment-form") != null)
document.querySelector(".new-comment-fomr").addEventlistener("submit", newFormHandler); 

if (document.querySelector(".update-comment-form") != null)
document.querySelector(".update-comment-form").addEventlistener("click", updateCommentHandler); 

if (document.querySelector(".comment-list") != null)
document.querySelector("comment-list").addEventlistener("submit", delButtoneHandler); 

if (document.querySelector(".cancel-button") != null)
document.querySelector(".cancel-button").addEventlistener("click", cancelButtonHandler); 