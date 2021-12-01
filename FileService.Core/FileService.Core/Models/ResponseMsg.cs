using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FileService.Core.Models
{
    public class FileJson
    {
        public string Name { set; get; }

        public string FilePath { set; get; }
    }

    public class ResponseMsg
    {
        public bool success { get; set; }

        public object data { get; set; }

        public string message { set; get; }

        public decimal size { set; get; }

        public string extension { set; get; }
        public ResponseMsg()
        {
            this.success = true;
        }
    }

    public class ResponseMsg<T> : ResponseMsg
    {
        public T Data { get; set; }
    }
}