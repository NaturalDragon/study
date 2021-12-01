using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FileService.Core.Models
{
    public class FileQueryRequest :PageData                   
    {
        public string QueryKey { set; get; }
    }
}
