// Function to sort the array of games
export function sortGames(games, criteria, order) {
  return games.slice().sort((a, b) => {
    const handleNA = (value) =>
      // Treat N/A / undefined values to sit at the bottom end of the array
      typeof value === "undefined" ? -Infinity : value;

    let comparison = 0;

    if (criteria === "name") {
      comparison = a.name.localeCompare(b.name);
    } else if (criteria === "total_rating") {
      // Handle N/A features
      const ratingA = handleNA(a.total_rating);
      const ratingB = handleNA(b.total_rating);
      comparison = ratingB - ratingA;
    } else if (criteria === "first_release_date") {
      // Handle N/A features
      const dateA = handleNA(a.first_release_date);
      const dateB = handleNA(b.first_release_date);
      comparison = dateB - dateA;
    }

    return order === "ascending" ? comparison : -comparison;
  });
}
