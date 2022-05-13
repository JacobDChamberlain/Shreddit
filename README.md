# Welcome to Shreddit!

[Shreddit](https://shreddittt.herokuapp.com/) is a MVP clone of reddit.com, with a focus on shred-metal guitar music. Users can get the latest info on the world of shred metal guitar here, share updates on your favorite guitarists, post videos and images, plug your own music, and tell other users why you think their favorite band's older stuff was better. Users can join Communities focused on various topics, Post their thoughts, and Comment on each other's Posts.

## Git 'cha Pull

## Getting started
1. Clone this repository (only this branch)

   ```bash
   git clone https://github.com/JacobDChamberlain/Shreddit.git
   ```

2. Install dependencies

      ```bash
      pipenv install --dev -r dev-requirements.txt && pipenv install -r requirements.txt
      ```

3. Create a **.env** file based on the example with proper settings for your
   development environment
4. Setup your PostgreSQL user, password and database and make sure it matches your **.env** file

5. Get into your pipenv, migrate your database, seed your database, and run your flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

6. To run the React App in development, checkout the [README](./react-app/README.md) inside the `react-app` directory.
