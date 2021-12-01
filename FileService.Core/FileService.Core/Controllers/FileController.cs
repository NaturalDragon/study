using FileService.Core.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace FileService.Core.Controllers
{
    [Route("api/[controller]")]
    [EnableCors("AllowSameDomain")]
    [ApiController]
    public class FileController : ControllerBase
    {
        /// <summary>
        /// 获取文件
        /// </summary>
        /// <param name="fileQueryRequest"></param>
        /// <returns></returns>
        [HttpPost("GetPaged")]
        public async Task<PageData> GetPaged(FileQueryRequest fileQueryRequest)
        {
            PageData pageData = new PageData(fileQueryRequest.PageIndex, fileQueryRequest.PageSize);
            var path = AppDomain.CurrentDomain.BaseDirectory + "/UploadFiles";
            List<string> filenames =new List<string>();
            DirectoryInfo folder = new DirectoryInfo(path);
            foreach (FileInfo file in folder.GetFiles())
            {
                filenames.Add(file.Name);
            }
            pageData.Total = filenames.Count;
            pageData.Data = filenames.Skip((fileQueryRequest.PageIndex - 1) * fileQueryRequest.PageSize)
                .Take(fileQueryRequest.PageSize);
            return  await Task.FromResult(pageData);
        }
    }
}
