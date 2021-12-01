using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace FileService.Core.Utilitys
{
    public static class GuidHelper
    {
        public static string GuidString(this ControllerBase api)
        {
            return Guid.NewGuid().ToString().Replace("-", "");
        }

        public static string DateTimeGuidString(this ControllerBase api)
        {
            return string.Format("{0:yyyyMMddHHmmffff}{1}", DateTime.Now, Guid.NewGuid().ToString().Replace("-", "")); 
        }
    }
}