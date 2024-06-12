// Function to sort the array of games
export function sortGames(games, criteria) { 
  return games.slice().sort((a, b) => {
    // Function to handle N/A values for first_date_released
    const handleReleaseDate = (game) => {
      return game.first_release_date === 'N/A' || typeof game.first_release_date === 'undefined'
        ? -Infinity
        : new Date(game.first_release_date);
    };

    if (criteria === 'name') {
      return a.name.localeCompare(b.name);
    } else if (criteria === 'total_rating') {
      // Handle N/A values for total_rating
      const ratingA = typeof a.total_rating === 'undefined' ? -Infinity : a.total_rating;
      const ratingB = typeof b.total_rating === 'undefined' ? -Infinity : b.total_rating;
      // Sort Ratings
      return ratingB - ratingA;
    } else if (criteria === 'first_release_date') {
      const dateA = handleReleaseDate(a);
      const dateB = handleReleaseDate(b);
      // Sort Release Dates
      return dateB - dateA;
    }
  });
}
