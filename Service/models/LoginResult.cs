using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Service.models
{
    public class LoginResult
    {
        public bool Success { set; get; } = false;

        public string Data { set; get; }

        public string Message { set; get; }
    }
}
