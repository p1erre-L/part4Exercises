const _ = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogList) => {
    const reducer = (sum, blog) => {
        return sum + blog.likes
    }
    return blogList.length === 0 ? 0 : blogList.reduce(reducer, 0)
}

const favoriteBlog = (blogList) => {
    if (blogList.length === 0) {
        return 'none'
    }

    let maxLikes = 0
    let favorite = {}

    blogList.forEach((blog, index) => {
        if (blog.likes > maxLikes) {
            maxLikes = blog.likes
            favorite = blogList[index]
        }
    })
    favorite = {
        title: favorite.title,
        author: favorite.author,
        likes: favorite.likes,
    }
    return favorite
}

const mostBlogs = (blogList) => {
    const authorsList = blogList.map((blog) => blog.author)
    const result = _.countBy(authorsList)
    const resultKeys = _.keys(result)
    const resultValues = _.values(result)
    const maxIndex = resultValues.findIndex(
        (value) => value == Math.max(...resultValues)
    )
    return { author: resultKeys[maxIndex], blogs: resultValues[maxIndex] }
}

const mostLikes = (blogList) => {
    const likesList = blogList.map((blog) => {
        return { author: blog.author, likes: blog.likes }
    })
    const result = _.groupBy(likesList, 'author')
    const newResult = _.mapValues(result, (obj) => {
        const result = obj.reduce((sum, value) => {
            return sum + value.likes
        }, 0)
        return result
    })
    const resultKeys = _.keys(newResult)
    const resultValues = _.values(newResult)
    const maxIndex = resultValues.findIndex(
        (value) => value == Math.max(...resultValues)
    )
    return { author: resultKeys[maxIndex], likes: resultValues[maxIndex] }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes,
}
