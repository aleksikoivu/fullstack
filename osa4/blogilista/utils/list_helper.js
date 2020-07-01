const _ = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const reducer = (sum, blog) => {
        return sum + blog.likes
    }
    return blogs.length === 0
        ? 0
        : blogs.reduce(reducer, 0)
}

//reduceri huolii accumulator, current value, index & source array
const favouriteBlog = (blogs) => {
    const reducer = (sum, blog) => {
        if(blog.likes > sum){
            sum = blog.likes
            //index = currentIndex
        }
        //var bestBlog = blogs.find(blog => blog.likes === sum)
        // console.log(bestBlog)
        return sum
    }
    return blogs.find(blog => blog.likes === (blogs.reduce(reducer,0)))
}

// Täytyis saada siis ulos kirjoittaja jolla on eniten blogeja, ja blogejen määrä
const mostBlogs = (blogs) => {
    const authors = blogs.map(blog => blog.author)
    //console.log(authors)
    var current = 0
    var max = 0
    var mostCommon = 0

    //Ei ehkä helpoin tapa
    for(var i=0; i<authors.length;i++){
        current = 0
        for(var j=0; j<authors.length;j++){
            if(authors[i] === authors[j]){
                current++
            }
            if(current > max){
                max = current
                mostCommon = authors[i]
            }
        }
    }

    var bestOne = {
        author: mostCommon,
        blogs: max
    }
    return bestOne
}

//Täytyis saada ulos kirjoittaja jolla on eniten tykkäyksiä blogissa, sekä tykkäyksien määrä
const mostLikes = (blogs) => {
    const result = blogs.reduce((a, b) => {
        let find = a.find(found => {
            return found.author === b.author
        })

        if(!find){
            return a.concat({ author: b.author, likes: b.likes })
        }

        find.likes += b.likes
        return a
    }, [])

    return favouriteBlog(result)
}


module.exports = {
    dummy,
    totalLikes,
    favouriteBlog,
    mostBlogs,
    mostLikes
}