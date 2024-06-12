export function sortGames(games, criteria) {
  return games.sort((a, b) => {
    if (criteria === "name") {
      return a.name.localeCompare(b.name);
    } else if (criteria === "total_rating") {
      const ratingA = a.total_rating === "N/A" ? -Infinity : a.total_rating;
      const ratingB = b.total_rating === "N/A" ? -Infinity : b.total_rating;
      return ratingB - ratingA;
    } else if (criteria === "first_release_date") {
      const dateA =
        a.first_release_date === "N/A"
          ? new Date(0)
          : new Date(a.first_release_date);
      const dateB =
        b.first_release_date === "N/A"
          ? new Date(0)
          : new Date(b.first_release_date);
      if (a.first_release_date === "N/A") return 1;
      if (b.first_release_date === "N/A") return -1;
      return dateA - dateB;
    }
  });
}
