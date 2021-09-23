using System;
using System.Data.Entity;
using System.Linq;

namespace CustomerInfo.Models
{
    public class Model1 : DbContext
    {
        

        public Model1()
            : base("name=Model1")
        {
        }

        public virtual DbSet<CustomerDetail> CustomerDetail { get; set; }
        public virtual DbSet<Address> Address { get; set; }
        public virtual DbSet<detailInfo> detailInfo { get; set; }
    }

   
}