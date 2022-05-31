const faker = require("faker");
const fs = require("fs");


// Set locale to use Vietnamese
faker.locale = 'en';



// Function random data
const randomUsersList = (n)=> {
    if(n <= 0) return []
    const usersList = []
    Array.from(new Array(n)).forEach((i, j)=> {
        const user = {
            id: j,
            name: faker.name.findName(),
            email: faker.internet.email(),
            password: faker.internet.password(10, true, /[0-9]/),
            gender: faker.name.gender(true),
            avatar: faker.image.people(300, 300, true),
            job: faker.name.jobType(),
            birthday: faker.date.between('1990-01-01T00:00:00.000Z', '1995-01-01T00:00:00.000Z'),
            think: faker.lorem.paragraph(2),
            phone: Number.parseFloat(faker.phone.phoneNumber('09########')),
            address: faker.address.cityName(),
            createdAt: Date.now(),
            updatedAt: Date.now()
        }
        usersList.push(user)
    })
    return usersList
}
const randomPostsList = (n, usersList)=> {
    if(n <= 0) return []
    const postsList = []
    //Loop and push data
    usersList.forEach((user)=> {
        Array.from(new Array(n)).forEach((i, j)=> {
            const post = {
                id: (user.id*10 + j),
                userId: user.id,
                title: faker.name.title(),
                content: faker.lorem.paragraph(40),
                thumbnail: faker.image.nature(600, 600, true),
                category: faker.random.arrayElement(['Life', 'Sport', 'Style', 'Tech', 'Music', 'Cinema', 'Travel', 'Food']),
                likes: faker.mersenne.rand(5, 30),
                createdAt: Date.now(),
                updatedAt: Date.now()
            }
            postsList.push(post)
        })
    })
    return postsList
}
const randomPhotosList = (n, usersList)=> {
    if(n <= 0) return []
    const photosList = []
    usersList.forEach((user, index)=> {
        Array.from(new Array(n)).forEach((i,j)=> {
            const photo = {
                id: (user.id*10 + j),
                userId: user.id,
                thumbnail: faker.image.nature(600, 600, true),
                createdAt: Date.now(),
                updatedAt: Date.now()
            }
            photosList.push(photo)
        })
    })
    return photosList
}
const randomTotalPostsLikesUsersList = (usersList, postsList)=> {
    const totalPostsLikesUsersList = []
    usersList.forEach((user)=> {
        let postsUser = postsList.filter((post)=> post.userId === user.id)
        let totalLikesUser = postsUser.reduce((totalLikes, post)=> totalLikes + post.likes, 0)
        const totalPostsLikesUser = {
            id: faker.datatype.uuid(),
            userId: user.id,
            totalPosts: postsUser.length,
            totalLikes: totalLikesUser,
            createdAt: Date.now(),
            updatedAt: Date.now()
        }
        totalPostsLikesUsersList.push(totalPostsLikesUser)
    })
    return totalPostsLikesUsersList
}
const randomSongsList = (n, usersList)=> {
    if(n <= 0) return []
    const songsList = []
    Array.from(new Array(n)).forEach((i, j)=> {
        const song = {
            id: j,
            userId: usersList[j].id,
            content: faker.random.arrayElement(['Qzc_aX8c8g4', 'cPkE0IbDVs4', 'YfDqONbzYPc', '60ItHLz5WEA', 'YQHsXMglC9A', '3AtDnEC4zak','bo_efYhYU2A','RgKAFK5djSk','RBumgq5yVrA','ShZ978fBl6Y']),
            createdAt: Date.now(),
            updatedAt: Date.now()
        }
        songsList.push(song)
    })
    return songsList
}

// IFFE
(()=>{

//Random data
const usersList = randomUsersList(10)
const postsList = randomPostsList(10, usersList)
const photosList = randomPhotosList(10, usersList)
const totalPostsLikesUsersList = randomTotalPostsLikesUsersList(usersList, postsList)
const songsList = randomSongsList(10, usersList)
//Prepare db object
const db = {
    users: usersList,
    posts: postsList,
    photos: photosList,
    songs: songsList,
    totalPostsLikesUsers: totalPostsLikesUsersList
}

// Write db object to db.json
fs.writeFile('db.json', JSON.stringify(db), ()=>{
  console.log('Generate data successfully!')  
})
})();
