exports.utilisateurs = {
    getAll: `SELECT [id_utilisateur]
                , [nom_utilisateur]
                , [mot_de_passe]
                , [role]
                 FROM [dbo].[utilisateurs]`,
    getCount: `SELECT COUNT(*) AS count FROM [dbo].[utilisateurs]`,
    create: `INSERT INTO [dbo].[utilisateurs]
                 ([nom_utilisateur]
                 , [mot_de_passe]
                 , [role])
        VALUES 
                (@nomUtilisateur
                , @motDePasse
                , @role)`,
    update: `UPDATE [dbo].[utilisateurs]
             SET nom_utilisateur = @nomUtilisateur,
                 mot_de_passe = @motDePasse,
                 role = @role
             WHERE id_utilisateur = @id`,
    delete: `DELETE FROM [dbo].[utilisateurs] WHERE id_utilisateur = @id`,
    getOne: `SELECT [id_utilisateur]
                , [nom_utilisateur]
                , [mot_de_passe]
                , [role]
             FROM [dbo].[utilisateurs] WHERE id_utilisateur = @id`,
  };
  