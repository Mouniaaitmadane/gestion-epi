exports.ribAtner = {
  getAll: `SELECT * FROM [dbo].[DAF_RIB_ATNER]`, // Retrieve all records from DAF_RIB_ATNER table
  getCount: `SELECT COUNT(*) as count FROM [dbo].[DAF_RIB_ATNER]`, // Count the total number of records in DAF_RIB_ATNER table
  create: `INSERT INTO [dbo].[DAF_RIB_ATNER]
           ([nom]
           ,[rib]
           ,[Redacteur]
           ,[dateCreation])
     VALUES
           (@nom
           ,@rib
           ,@Redacteur
           ,getdate())`, // Create a new record in DAF_RIB_ATNER table with current timestamp
  update: `UPDATE [dbo].[DAF_RIB_ATNER]
        SET [nom] = @nom
      ,[rib] = @rib
      ,[dateModification] = GETDATE()
      ,[ModifierPar] = @ModifierPar
  WHERE id = @id`, // Update a record in DAF_RIB_ATNER table and set modification timestamp
  getOne: `SELECT * FROM [dbo].[DAF_RIB_ATNER] WHERE id = @id`, // Retrieve a single record from DAF_RIB_ATNER table based on id
  getRibAtnerValid: `select *  from DAF_RIB_ATNER 
  where id  not in (select ribAtner from  DAF_Order_virements_Fond  where
  id =@id)
  and id not in (select RibAtnerDestId from DAF_VIREMENTS_Fond where orderVirementFondId =@id)`, // Retrieve valid records from DAF_RIB_ATNER table for virement operations
};
