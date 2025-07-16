exports.equipementQuerys = {
  getAll: `SELECT id_equipement, id_produit, nom_equipement, categorie, quantite_stock FROM equipements`,
  getCount: `SELECT COUNT(*) AS count FROM equipements`,
  create: `INSERT INTO equipements (nom_equipement, id_produit, categorie, quantite_stock) 
           VALUES (@nomEquipement, @idProduit, @categorie, @quantiteStock)`,
  update: `UPDATE equipements 
           SET nom_equipement = @nomEquipement, id_produit = @idProduit, 
               categorie = @categorie, quantite_stock = @quantiteStock 
           WHERE id_equipement = @id`,
  delete: `DELETE FROM equipements WHERE id_equipement = @id`,
  getOne: `SELECT id_equipement, id_produit, nom_equipement, categorie, quantite_stock 
           FROM equipements WHERE id_equipement = @id`,
};
