import { computed } from 'vue';
import { useBlogStore } from 'src/stores/useBlogStore';
import { api } from 'src/boot/axios'

export default function useBlog() {
  const blogStore = useBlogStore();

  const blog = computed(() => blogStore.blog);
  const blogs = computed(() => blogStore.blogs);

  const searchBlogs = async (str) => {
    try {
      const response = await api.get('/blogs', {
        params: {
          search: str
        }
      });

      blogStore.setBlogs(response.data.blogs); 
    } catch (error) {
      blogStore.setErrorMessage('Error fetching blogs');
      console.error('Error fetching blogs:', error);
    }
  };


  const fetchBlogs = async () => {
    try {
      const response = await api.get('/blogs');
      blogStore.setBlogs(response.data.blogs); 
    } catch (error) {
      blogStore.setErrorMessage('Error fetching blogs');
      console.error('Error fetching blogs:', error);
    }
  };

  const fetchBlog = async (blogId) => {
    try {
      const response = await api.get(`/blogs/${blogId}`);
      blogStore.setBlog(response.data.blog); 
    } catch (error) {
      blogStore.setErrorMessage('Error fetching blogs');
      console.error('Error fetching blogs:', error);
    }
  };

  const createBlog = async (blogData) => {
    try {
      const response = await api.post('/blogs', blogData);
      blogStore.setBlogs([...blogStore.blogs, response.data.blog]); 
      blogStore.setSuccessMessage('Blog created successfully!');
    } catch (error) {
      blogStore.setErrorMessage('Error creating blog');
      console.error('Error creating blog:', error);
    }
  };

  const updateBlog = async ({ id, title, content }) => {
    try {
      const response = await api.put(`/blogs/${id}`, {
        title,
        content
      })

      const index = blogs.value.findIndex(b => b.id === id)
      if (index !== -1) {
        blogs.value[index] = { ...blogs.value[index], ...response.data.blog }
      }

      blogStore.setBlogs(blogs);

    } catch (error) {
      console.error("Failed to update blog:", error)
    }
  };

  const changeStatus = async (blogId) => {
    try {
      const response = await api.patch(`/blogs/${blogId}/status`);
      const updatedBlogs = blogStore.blogs.map(blog =>
        blog.id === blogId ? { ...blog, status: response.data.status } : blog
      );

      blogStore.setBlogs(updatedBlogs);
      blogStore.setSuccessMessage('Status updated!');
    } catch (error) {
      blogStore.setErrorMessage('Error updating status');
      console.error('Error updating blog status:', error);
    }
  };

  const archiveBlog = async (blogId) => {
    try {
      await api.delete(`/blogs/${blogId}/archive`);
      blogStore.deleteBlog(blogId);
    } catch (error) {
      console.error('Error archiving blog:', error);
    }
  };

  return {
    blog,
    blogs,
    successMessage: blogStore.successMessage,
    errorMessage: blogStore.errorMessage,
    searchBlogs,
    fetchBlogs,
    fetchBlog,
    createBlog,
    updateBlog,
    changeStatus,
    archiveBlog
  };
}
