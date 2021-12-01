using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FileService.Core.Models
{
    public class ReturnResponse
    {
        public bool Success { get; set; }

        public string Msg { get; set; }

        public object Data { get; set; }
    }
}
