## Examinator

![NPM](https://img.shields.io/npm/l/react-toastify.svg?label=%F0%9F%93%9Clicense&style=for-the-badge)

### 🎉 Examinator is a simple quiz app, it allows you to create and pass quizzes!

At current stage of development examinator has only one quiz type:

- one correct answer per question;
- all questions in quiz appears in random order;
- questions options appears also in random order.

<kbd>
  <img src="https://user-images.githubusercontent.com/16167616/190920500-0e8fb83a-9fa7-4e7a-9235-c2dc7e38207d.gif"/>

</kbd>

## Basic Features

- Pass available quizzes;
- View your attempts history;
- Get/download quiz result certificate;
- Two languages interface.

## Administrator Features

- Create, delete non-admin users;
- Create, Edit, Delete quizzes;
- Create, Edit, Delete(archicve) questions connected to editing quiz.
- View all users atempts history;
- Delete users atempts history.

## Instalation

You can run it on your local machine.

If you familiar with Heroku you can deploy it on your Heroku account after installing it locally.
Package.json file has "heroku-postbuild" script for Heroku deployment.

Clone latest release branch.

```
$ git clone --branch release --single-branch https://github.com/AndreyKonovalenko/examinator.git
$ cd examinator
```

for server side:

```
$ npm install
```

for client side:

```
$ npm install --prefix client
```

Before run you need setup environment variables in .env
.env file shoud be maulay created in the root folder.

```
NODE_ENV = development
PORT = 5000
MONGO_URI = mongodb+srv://admin:<password>@<clastername>.mongodb.net/?retryWrites=true&w=majority
MONGO_DB = your_monoDB_name
JWT_SECRET = ****
TOKEN_EXPIRES_IN = 1h
```

For backend you need MongoDB, I personally use Atlas cloud database.
Steps for Atlas:

- setup Atlas accout;
- create cluster;
- create new data base with users collection;
- open users collecction and create adminstarator user, \_id will be added automaticly.

Use this user model:

```
"name": "user name",
"username": "admin",
"password": "***",
"admin": true
```

## Important

For password generation use some free online bcrypt Password Generator with 10 Rounds.
If you pass password without encryption, it won't work.

```
npm run prod
```

You can now view app in the browser localhost:5000

Login with admin account, create new users, quizzes, pass quizzes, have fun.
