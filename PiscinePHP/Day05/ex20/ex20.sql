SELECT id_genre, film.id_distrib, titre
FROM film LEFT JOIN distrib ON film.id_distrib = distrib.id_distrib
WHERE id_genre >= 4 AND id_genre <= 8;