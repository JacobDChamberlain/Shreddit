# Welcome to Shreddit!

[Shreddit](https://shreddittt.herokuapp.com/) is a MVP clone of reddit.com, with a focus on shred-metal guitar music. Users can get the latest info on the world of shred metal guitar here, share updates on your favorite guitarists, post videos and images, plug your own music, and tell other users why you think their favorite band's older stuff was better. Users can join Communities focused on various topics, Post their thoughts, and Comment on each other's Posts.

## Git 'cha Pull

### Technologies Used:
    - Frontend:
        * ReactJs
        * Redux
    - Backend:
        * Flask
        * SQLAlchemy
### Screenshots:
![Screen Shot 2022-05-18 at 6 40 41 PM](https://user-images.githubusercontent.com/91109296/169172940-77473e69-b791-4004-b2cb-c0bfe457dfa0.png)
![Screen Shot 2022-05-18 at 6 40 53 PM](https://user-images.githubusercontent.com/91109296/169172943-17418902-42a6-47da-9eb7-33578de713f1.png)
![Screen Shot 2022-05-18 at 6 41 20 PM](https://user-images.githubusercontent.com/91109296/169172944-e6d395f8-033a-4453-a7b9-c63f720277d9.png)
![Screen Shot 2022-05-18 at 6 43 16 PM](https://user-images.githubusercontent.com/91109296/169172948-3741c82e-b4b9-4b34-9ebd-dec403470dde.png)
![Screen Shot 2022-05-18 at 6 43 47 PM](https://user-images.githubusercontent.com/91109296/169172950-44e0c551-d1ba-4016-b63c-5f2e4a3e6251.png)
![Screen Shot 2022-05-18 at 6 44 27 PM](https://user-images.githubusercontent.com/91109296/169172951-5dd7b8e3-e3db-447c-a3e9-9c44e22df829.png)


### To run locally:
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
