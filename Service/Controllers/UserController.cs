using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using server.models;
using Service.models;
using System.Threading;
namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {

         [HttpPost("Login")]
        public async Task<LoginResult> Login(PersonDto personDto)
        {
            var result = new LoginResult();
            Thread.Sleep(4000);
            if(personDto.Name=="admin"&&personDto.Password=="123456")
            {
                result.Data = "token122398322";
                result.Success = true;
            }
            return await Task.FromResult(result);
        }
        [HttpPost("TestChannel")]
        public async Task<int> TestChannel()
        {
            Thread.Sleep(2000);
            Random random = new Random();
            var res = random.Next(20, 10000000);
            return await Task.FromResult(res);
        }
        [HttpPost("Search")]
        public async Task<int> Search()
        {
          
            Random random = new Random();
            var res = random.Next(20, 10000000);
            return await Task.FromResult(res);
        }
        [HttpGet("GetUserList")]
        public async Task<IList<Person>> GetUserList(int pageIndex)
        {
            IList<Person> pers = new List<Person>()
            {
                new Person() { Id = Guid.NewGuid().ToString(), Name = "Amy", Age = 19, },
                new Person() { Id = Guid.NewGuid().ToString(), Name = "Ben", Age = 45, },
                new Person() { Id = Guid.NewGuid().ToString(), Name = "Json", Age = 23, },
                new Person() { Id = Guid.NewGuid().ToString(), Name = "Ull", Age = 6, },
                new Person() { Id = Guid.NewGuid().ToString(), Name = "Yhs", Age = 34, },
                new Person() { Id = Guid.NewGuid().ToString(), Name = "Mss", Age = 25, },
                new Person() { Id = Guid.NewGuid().ToString(), Name = "Nhh", Age = 10, },


            };
            return await Task.FromResult(pers);

        }
    }
}
