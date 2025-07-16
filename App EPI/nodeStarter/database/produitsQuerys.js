exports.produits ={
    getAll:`SELECT [id_produit]
                ,[nom_produit]
                ,[categorie]
                ,[description]
                ,[fournisseur]
            FROM [dbo].[produits]`,
    getCount:`SELECT COUNT(*) AS count FROM [dbo].[produits]`,
    create:`INSERT INTO [dbo].[produits]
                ([nom_produit]
                ,[categorie]
                ,[description]
                ,[fournisseur])
        VALUES 
                (@nomProduit
                , @categorie
                , @description
                , @fournisseur)`,
    update:`UPDATE [dbo].[produits]
           SET nom_produit = @nomProduit,
               categorie = @categorie,
               description = @description,
               fournisseur = @fournisseur
           WHERE id_produit = @id`,
  delete: `DELETE FROM [dbo].[produits] WHERE id_produit = @id`,
  getOne: `SELECT [id_produit]
                , [nom_produit]
                , [categorie]
                , [description]
                , [fournisseur]
           FROM [dbo].[produits] WHERE id_produit = @id`,
}