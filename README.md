# Gamefinder 3000

Welcome to the Gamefinder 3000 repository!

This project is a website designed for any gamer wanting to know more about their favourite games. Want to know what platforms it is available on? How about what genre it is considered or what date it was released? Using the IGDB API to access the IGDB database, Gamefinder 3000 helps you discover more about the games we learn to love.

You can view a live demo of the website [here](https://xavierprice.github.io/gamefinder-3000/).

Gamefinder 3000 was created using HTML, JavaScript, CSS, Git, and Visual Studio Code with a focus on API development and implementation.

# Project Structure

public/assets: Directory containing all images.
public/css: Directory containing main css file.
public/js: Directory containing js files that handle all frontend requests such as checkArray.js, displayGames.js, main.js and sortGames.js.

server/: Directory containing backend js files that handles nodeJS server hosting (server.js) and games fetching (fetchGames.js)

index.html: Main HTML file for the website.

package.json: Customised file to include dependacies and scripts used throughout the development of the website.

# Overview

The objective of developing Gamefinder 3000 was to fetch a list of games and present its details on a card. This was achieved by using APIs to handle client requests, retrieve an array of games, and then process and display this information within a card.