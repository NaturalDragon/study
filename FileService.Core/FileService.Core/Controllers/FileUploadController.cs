using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FileService.Core.Models;
using FileService.Core.Utilitys;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FileService.Core.Controllers
{
    [Route("api/[controller]")]
    [EnableCors("AllowSameDomain")]
    [ApiController]
    public class FileUploadController : ControllerBase
    {
        static readonly string baseFolder = "UploadFiles";
        static readonly string imagesFolder = $"{baseFolder}/Images/";
        static readonly string reportFolder = $"{baseFolder}/Report/";
        /// <summary>
        /// 保存文件，原格式，不转换
        /// </summary>
        /// <param name="baseFolder"></param>
        /// <returns></returns>
        private async Task<List<ResponseMsg>> SaveOriginal(string baseFolder,string defaultExtension)
        {
            var request = HttpContext.Request;
            var form = request.Form; 
            string folder = form["folder"];
           // string fileName = form[""];
            List<ResponseMsg> responseMsgsList = new List<ResponseMsg>();
            foreach (var item in form.Files)
            {
                string extions = Path.GetExtension(item.FileName);
                if (string.IsNullOrEmpty(extions))
                {
                    extions = defaultExtension;
                }
                var stream = item.OpenReadStream();
                string fileName = string.Format("{0}{1}", this.DateTimeGuidString(), extions);
                folder = string.IsNullOrEmpty(folder) ? baseFolder : string.Format("{0}{1}/", baseFolder, folder);
                var yearMonthDay = this.GetYearMonthDay();
                string folderPath = string.Format("{0}{1}{2}", AppDomain.CurrentDomain.BaseDirectory, folder, yearMonthDay);
                this.CheckFolder(folderPath);
                using (FileStream fs = new FileStream(folderPath + fileName, FileMode.OpenOrCreate, FileAccess.Write, FileShare.Write))
                {
                    Byte[] buffer = null;
                    buffer = new Byte[item.Length];
                    stream.Read(buffer, 0, buffer.Length);
                    await  fs.WriteAsync(buffer, 0, buffer.Length);
                }
                responseMsgsList.Add(new ResponseMsg {  extension=extions, size=item.Length, data = string.Format("/{0}{1}{2}",
                    folder, yearMonthDay, fileName) });

            }
            return responseMsgsList;
        }
        /// <summary>
        /// 上传图片
        /// </summary>
        /// <returns></returns>
        [HttpPost("UploadImages")]
        public async Task<List<ResponseMsg>> UploadImages()
        {

            var result = await SaveOriginal(imagesFolder,".jpg");
            return result;
                
                 
        }
        /// <summary>
        /// 删除文件
        /// </summary>
        /// <returns></returns>
        [HttpPost("DeleteFile")]
        public ResponseMsg DeleteFile()
        {
            string postStr = GetPostStr();
            FileJson fileJson= Newtonsoft.Json.JsonConvert.DeserializeObject<FileJson>(postStr);
            var filePath = fileJson.FilePath;
            if (string.IsNullOrEmpty(filePath))
            {
                return new ResponseMsg { success = false, message = "请传入文件路径'filePath'参数!" };
            }
            string absolutelyFilePath = string.Format("{0}{1}", AppDomain.CurrentDomain.BaseDirectory, filePath);
            if (!this.CheckFileExist(absolutelyFilePath))
            {
                return new ResponseMsg { success = false, message = string.Format("文件:'{0}'不存在！", filePath) };
            }
            return this.DeleteFile(absolutelyFilePath);
        }

        /// <summary>
        /// 上传报表配置
        /// </summary>
        /// <returns></returns>
        [HttpPost("UploadReport")]
      
        public async Task<ResponseMsg> UploadReport()
        {

            var request = HttpContext.Request;
            var buffer = GetPostByte();//request.Body;
            var yearMonthDay = this.GetYearMonthDay();
            string folderPath = string.Format("{0}{1}{2}", AppDomain.CurrentDomain.BaseDirectory, reportFolder, yearMonthDay);
            this.CheckFolder(folderPath);
            string fileName = string.Format("{0}{1}", this.DateTimeGuidString(), ".json");
            using (FileStream fs = new FileStream(folderPath + fileName, FileMode.OpenOrCreate, FileAccess.Write, FileShare.Write))
            {
               // Byte[] buffer = null;
               // buffer = new Byte[buffer.Length];
              //  stream.Read(buffer, 0, buffer.Length);
                await fs.WriteAsync(buffer, 0, buffer.Length);
            }

            return new ResponseMsg
            {
                data = string.Format("/{0}{1}{2}", reportFolder, yearMonthDay, fileName)
            };
        }

        /// <summary>
        /// 获得Post过来的字符串
        /// </summary>
        /// <returns></returns>
        string GetPostStr()
        {
            using (var ms = new MemoryStream())
            {
                Request.Body.CopyTo(ms);
                var b = ms.ToArray();

                var res = System.Text.Encoding.UTF8.GetString(b);
                return res;
            }
        }
        /// <summary>
        /// 获得Post过来的字节
        /// </summary>
        /// <returns></returns>
        byte[] GetPostByte()
        {
            using (var ms = new MemoryStream())
            {
                Request.Body.CopyTo(ms);
                var b = ms.ToArray();
                return b;
            }
        }


    }
}