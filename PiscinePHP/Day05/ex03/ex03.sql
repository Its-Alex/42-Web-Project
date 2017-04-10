INSERT INTO ft_table (login, groupe, date_de_creation) 
SELECT nom AS login, 'other' AS groupe, date_naissance AS date_de_creation 
FROM fiche_personne 
WHERE nom LIKE '%a%' and LENGTH(nom) < 9 ORDER BY nom ASC LIMIT 10;