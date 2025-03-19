require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT || 5001
app.use(express.json())

// @desc    project apis
app.use('/api/projects', require('./router/projectsRouter.js'))

// @desc    blogs API
app.use('/api/blogs/',require('./router/blogsRouter.js'))

// @desc    Services api
app.use('/api/services', require('./router/servicesRouter.js'))

// @desc    Skills
app.use('/api/skills', require('./router/skillsRouter.js'))

// @desc    newsletter
app.use('/api/newsletter', require('./router/newsletterRouter.js'))

// @desc    testimonials
app.use('/api/testimonials', require('./router/testimonialsRouter.js'))

// @desc    contact form
app.use('/api/contact', require('./router/contactRouter.js'))

// @desc    media api
app.use('/api/media', require('./router/mediaRouter.js'))

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})