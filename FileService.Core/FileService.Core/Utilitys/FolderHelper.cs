using FileService.Core.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace FileService.Core.Utilitys
{
    public static class FolderHelper
    {
        public static void CheckFolder(this ControllerBase api, string folderPath)
        {
            if (!string.IsNullOrWhiteSpace(folderPath))
            {
                if (!Directory.Exists(folderPath))
                {
                    try
                    {
                        Directory.CreateDirectory(folderPath);
                    }
                    catch
                    {
                    }
                }
            }
        }

        public static string GetYearMonthDay(this ControllerBase api)
        {
            var date = DateTime.Now;
            return $"{date.Year}/{date.Month}/{date.Day}/";
        }

        public static bool CheckFileExist(this ControllerBase api, string filePath)
        {
            return File.Exists(filePath);
        }

        public static ResponseMsg DeleteFile(this ControllerBase api, string filePath)
        {
            try
            {
                File.Delete(filePath);
                return new ResponseMsg();
            }
            catch (Exception ex)
            {
                return new ResponseMsg { success = false, message = ex.Message };
            }
        }
    }
}