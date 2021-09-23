namespace CustomerInfo.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class customerdeatil : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Addresses",
                c => new
                    {
                        AddressId = c.Int(nullable: false, identity: true),
                        Address_Type = c.String(nullable: false),
                        Street_Address = c.String(nullable: false),
                        City_Name = c.String(nullable: false),
                        Zip = c.String(nullable: false),
                        Country_Name = c.String(nullable: false),
                        Contact = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.AddressId);
            
            CreateTable(
                "dbo.CustomerDetails",
                c => new
                    {
                        CustomerId = c.Int(nullable: false, identity: true),
                        Salutation = c.String(nullable: false),
                        First_Name = c.String(nullable: false),
                        Last_Name = c.String(nullable: false),
                        Phone_Number = c.String(nullable: false),
                        Email = c.String(nullable: false),
                        Age = c.Int(nullable: false),
                        Gender = c.String(nullable: false),
                        Education = c.String(nullable: false),
                        Nationality = c.String(nullable: false),
                    })
                .PrimaryKey(t => t.CustomerId);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.CustomerDetails");
            DropTable("dbo.Addresses");
        }
    }
}
