const postsContainer = document.getElementById('posts-container');
let blogs = []

// Fetch data from API
async function getData() {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=5")
    const data = await res.json();
    return data;
}

// Add fetched data to empty blogs []
async function addData() {
    if (blogs.length === 0) {
        const posts = await getData();
        await posts.forEach(post => {
            const blog = {
                title: post.title,
                content: post.body
            }
            blogs.push(blog)
        });
    }
    return;
}

// Create Blog
function createBlog() {
    const title = document.getElementById('blog-title');
    const body = document.getElementById('blog-body');

    if (title.value === "" || body.value === "") {
        alert("Fields cannot be empty");
        return;
    }

    const blog = {
        title: title.value,
        content: body.value
    }
    blogs.push(blog);
    title.value = "";
    body.value = "";
    postsContainer.innerHTML = "";
    showBlogs();
}

// Show all Blogs on DOM
async function showBlogs() {
    await addData();
    blogs.forEach((blog, index) => {
        const post = document.createElement('div')
        post.setAttribute("class", "post");
        post.setAttribute("id", index)
        post.innerHTML = `
        <h2>${blog.title}</h2>
        <p>
          ${blog.content}
        </p>
        <button onclick="deletePost(${index})">Delete</button>
        `
        postsContainer.appendChild(post);
    })
}

// Delete blog
function deletePost(index) {
    console.log(index);
    blogs.splice(index, 1);
    postsContainer.innerHTML = "";
    showBlogs();
}

showBlogs();
