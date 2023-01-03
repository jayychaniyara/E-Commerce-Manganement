using Ecommerce.Business.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ecommerce.Business.Interface
{
    public interface ISignUpRepository
    {
        public List<SignUp> GetAllUsers();

        SignUp CreateUser(SignUp user);

        public SignUp GetLoginByUsername(string username);
    }
}
