using Ecommerce.Business.Interface;
using Ecommerce.Business.Model;
using Microsoft.AspNetCore.Mvc;

namespace Ecommerce.Client.Controllers
{
    [ApiController]
    [Route("api")]
    public class SignUpController: ControllerBase
    {
        private readonly ISignUpRepository signUpRepository;

        public SignUpController(ISignUpRepository signUpRepository)
        {
            this.signUpRepository = signUpRepository;
        }

        [HttpPost("SignUp/Create")]
        public IActionResult CreateUser(SignUp user)
        {
            if (user == null)
            {
                return BadRequest();
            }
            return Ok(this.signUpRepository.CreateUser(user));
        }

        [HttpGet("SignUp/User")]
        public IActionResult GetAllUsers()
        {
            List<SignUp> user = this.signUpRepository.GetAllUsers();

            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }

        [HttpGet("LogIn/{username}")]

        public IActionResult GetLoginByUsername(string username)
        {
            var users = (this.signUpRepository.GetLoginByUsername(username));
            if (users == null)
            {
                return BadRequest();
            }
            return Ok(users);
        }
    }
}
