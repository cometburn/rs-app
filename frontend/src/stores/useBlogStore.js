import { defineStore, acceptHMRUpdate } from 'pinia'

export const useBlogStore = defineStore('blog', {
  state: () => ({
    blog: {},
    blogs: [],
    successMessage: '',
    errorMessage: '',
  }),
  getters: {
    getBlogs() {
      return this.blogs
    },
    getBlog: (state) => {
      return (id) => state.blogs.find(blog => blog.id === id);
    },
  },
  actions: {
    setBlogs(blogs) {
      this.blogs = blogs;
    },
    setBlog(blog) {
      this.blog = blog;
    },
    deleteBlog(blogId) {
      this.blogs = this.blogs.filter(blog => blog.id !== blogId);
    },
    setSuccessMessage(message) {
      this.successMessage = message;
    },
    setErrorMessage(message) {
      this.errorMessage = message;
    },
    clearMessages() {
      this.successMessage = '';
      this.errorMessage = '';
    },
  },
  persist: true,
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useBlogStore, import.meta.hot))
}
