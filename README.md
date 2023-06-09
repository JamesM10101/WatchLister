# WatchLister 📽️

Review and save your favorite movies.

## Live Demo

https://watchlisting.netlify.app/

## Features

✅ Rate & Review Movies

✅ Save Movies To Your Watch List

✅ Like/Dislike Reviews

✅ Light/Dark Mode Toggle

## Tech Stack

**Site:** React, Redux, Material UI, Formik, Yup

**Server:** Node, Express, MongoDB, Mongoose, JWT, bcrypt Helmet, Morgan, cors, Nodemon

## Screenshots

![Home Screenshot](https://i.imgur.com/HmgW4fz.png)

![Interstellar Screenshot](https://i.imgur.com/2mMHh2k.png)

![Profile Screenshot](https://i.imgur.com/0fb0qsi.png)

## Run Locally

Clone the project

```bash
  git clone https://github.com/JamesM10101/WatchLister
```

Go to the site & server directories individually

```bash
  cd site
  cd server
```

Install dependencies in both directories

```bash
  npm install
```

Start the server

```bash
  nodemon server.js
```

Start the site

```bash
  npm run start
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env files

#### Server

`PORT`
`JWT_SECRET`
`MONGO_URL`

#### Site

`PORT`
`REACT_APP_PORT`
`REACT_APP_BACKEND_ADDRESS`

## Roadmap

- Add pages for genres and staff

- Enhance search with filters

- Add more profile update options

## Author

[@JamesM10101](https://www.github.com/jamesm10101)

## License

[MIT](https://choosealicense.com/licenses/mit/)
