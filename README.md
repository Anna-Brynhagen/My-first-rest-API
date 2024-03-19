# My-first-rest-API
For a school assignment, I developed a RESTful API that allows validated user profiles to perform GET, POST, and PATCH requests on their profiles, photos, and albums. This project involved creating a robust API and implementing various endpoints to enable interaction with user data.

This project showcases the development of a REST API using TypeScript, Node.js, Express, Prisma, Express-validator, and bcrypt.
To leverage this repository, commence by executing 'npm install' in the terminal to install all dependencies.
For localhost testing, I utilized the Postman application. For deployment, I employed Railway.

Outlined below are the accessible routes

/**

Sign up a new user /register
router.post("/register") /
/*

Retrieve user profile /profile
router.get("/profile")
*/

/**

Upload a photo /photos
router.post("/photos") /
/*

Retrieve all photos belonging to a user /photos
router.get("/photos") /
/*

Retrieve a specific photo owned by a user /photos/:photoId
router.get("/photos/:photoId") /
/*

Update a specific photo belonging to a user /photos/:photoId
router.patch("/photos/:photoId") /
/*

Create an album /albums
router.post("/albums") /
/*

Retrieve all albums owned by a user /albums
router.get("/albums") /
/*

Retrieve a specific album owned by a user /albums/:albumId
router.get("/albums/:albumId") /
/*

Update a specific album owned by a user /albums/:albumId
router.patch("/albums/:albumId") /
/*

Add a photo to an album owned by a user /albums/:albumId/photos
router.post("/albums/:albumId/photos") */
