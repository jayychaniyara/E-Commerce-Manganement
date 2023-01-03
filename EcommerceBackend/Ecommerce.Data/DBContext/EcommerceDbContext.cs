using Ecommerce.Business.Model;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ecommerce.Data.DBContext
{
    public class EcommerceDbContext: DbContext
    {
        public EcommerceDbContext(DbContextOptions options) : base(options)
        { 
        }

        public DbSet<SignUp> SignUp { get; set; }
    }
}
