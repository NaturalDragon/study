using FileService.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FileService.Core.Utilitys
{
    public static class LoginUserUltility
    {
       

        /// <summary>
        /// 转换LoginUser
        /// </summary>
        /// <param name="token"></param>
        /// <returns></returns>
        public static LoginUser ParseLoginUser(string token)
        {
            var jsonTemplate = AESCryption.DecryptText(token, AESCryption.Salt);

            var loginUser = Newtonsoft.Json.JsonConvert.DeserializeObject<LoginUser>(jsonTemplate);

            loginUser.Token = token;

            return loginUser;
        }
    }
}
