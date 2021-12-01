using Configuration.Core;
using FileService.Core.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FileService.Core.Controllers
{
    [EnableCors("AllowSameDomain")]
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        [HttpPost("Login")]
        public  async Task<object> Login(LoginActionRequest loginActionRequest)
        {
            var returnViewResponse = new ReturnResponse();
            returnViewResponse.Success = false;
            var userName =ConfigurationManager.GetValue<string>("manageMent:userName");
            var password = ConfigurationManager.GetValue<string>("manageMent:password");
            if (loginActionRequest.Password.Equals(password)
                && loginActionRequest.UserName.Equals(userName))
            {
                returnViewResponse.Data = Guid.NewGuid().ToString() ;
                returnViewResponse.Success = true;
            }
            else
            {
                returnViewResponse.Msg = "账号或者密码错误!";

            }
            return await Task.FromResult(returnViewResponse);

        }
    }
}
