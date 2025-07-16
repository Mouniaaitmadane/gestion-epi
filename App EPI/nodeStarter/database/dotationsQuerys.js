exports.dotations = {
    getAll: `SELECT [id_dotation]
                    , [id_employe]
                    , [id_equipement]
                    , [date_dotation]
                    , [quantite]
                     FROM [dbo].[dotations]`,
    getCount: `SELECT COUNT(*) AS count FROM [dbo].[dotations]`,
    create: `INSERT INTO [dbo].[dotations] 
                    ([id_employee]
                    , [id_equipement]
                    , [date_dotation]
                    , [quantite])
        VALUES
             (@idEmployee
             , @idEquipement
             , @dateDotation
             , @quantite)`,
    update: `UPDATE [dbo].[dotations]
             SET id_employee = @idEmployee,
                 id_equipement = @idEquipement,
                 date_dotation = @dateDotation,
                 quantite = @quantite
             WHERE id_dotation = @id`,
    delete: `DELETE FROM [dbo].[dotations] WHERE id_dotation = @id`,
    getOne: `SELECT [id_dotation]
                , [id_employee]
                , [id_equipement]
                , [date_dotation]
                , [quantite]
             FROM [dbo].[dotations] WHERE id_dotation = @id`,
  };
  