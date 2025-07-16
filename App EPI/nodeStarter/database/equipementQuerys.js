exports.equipements = {
    getAll: `SELECT [id_equipement]
                , [id_produit]
                , [nom_equipement]
                , [categorie]
                , [quantite_stock] 
                FROM [dbo].[equipements]`,
    getCount: `SELECT COUNT(*) AS count FROM [dbo].[equipements]`,
    create: `INSERT INTO [dbo].[equipements] 
            ([nom_equipement]
            , [id_produit]
            , [categorie]
            , [quantite_stock])
        VALUES 
            (@nomEquipement
            , @idProduit
            , @categorie
            , @quantiteStock)`,
    
    update: `UPDATE [dbo].[equipements]
             SET nom_equipement = @nomEquipement,
                 id_produit = @idProduit,
                 categorie = @categorie,
                 quantite_stock = @quantiteStock
             WHERE id_equipement = @id`,
    delete: `DELETE FROM [dbo].[equipements] WHERE id_equipement = @id`,
    getOne: `SELECT [id_equipement]
                , [id_produit]
                , [nom_equipement]
                , [categorie]
                , [quantite_stock]
             FROM [dbo].[equipements] WHERE id_equipement = @id`,
  };
  