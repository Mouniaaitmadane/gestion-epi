exports.employes = {
  getAll: `SELECT [cin]
                , [nom]
                , [prenom]
                , [fonction]
                , [date_embauche]
                , [pointure_chaussures]
                , [taille]
                , [date_depart]
                 FROM [dbo].[employes] `,
  getCount: `SELECT COUNT(*) AS count FROM [dbo].[employes]`,
  create: `INSERT INTO [dbo].[employes]
                 ([nom]
                 , [prenom]
                 , [fonction]
                 , [cin]
                 , [date_embauche]
                 , [pointure_chaussures]
                 , [taille]
                 , [date_depart])
        VALUES 
           (@nom
           , @prenom
           , @fonction
           , @cin
           , @date_embauche
           , @pointure_chaussures
           , @taille
           , @date_depart)`,
  update: `UPDATE [dbo].[employes]
             SET nom = @nom,
                 prenom = @prenom,
                 fonction = @fonction,
                 cin = @cin,
                 date_embauche = @dateEmbauche,
                 pointure_chaussures = @pointureChaussures,
                 taille = @taille,
                 date_depart = @dateDepart
             WHERE id_employee = @id`,
  delete: `DELETE FROM [dbo].[employes] WHERE id_employee = @id`,
  getOne: `SELECT [id_employee]
                , [nom]
                , [prenom]
                , [fonction]
                , [cin]
                , [date_embauche]
                , [pointure_chaussures]
                , [taille]
                , [date_depart]
             FROM [dbo].[employes] WHERE id_employee = @id`,
};
  