using Ecommerce.Business.Interface;
using Ecommerce.Business.Model;
using Ecommerce.Data.DBContext;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ecommerce.Data.Repository
{
    public class SignUpRepository: ISignUpRepository
    {
        private readonly EcommerceDbContext dbContext;
        public SignUpRepository(EcommerceDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public SignUp CreateUser(SignUp user)
        {
            this.dbContext.Add(user);
            this.dbContext.SaveChanges();
            return user;
        }

        public List<SignUp> GetAllUsers()
        {
            return this.dbContext.SignUp.ToList();
        }

        public SignUp GetLoginByUsername(string username)
        {
            return this.dbContext.SignUp.FirstOrDefault(x => x.Username == username);
        }
    }
}
