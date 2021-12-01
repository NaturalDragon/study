using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FileService.Core.Models
{
    public class PageData
    {
        public PageData()
        {
        }
        public PageData(int pageIndex, int pageSize)
        {
            this.PageIndex = pageIndex;
            this.PageSize = pageSize;
        }
        /// <summary>
        /// 页码
        /// </summary>
        public int PageIndex = 1;
        /// <summary>
        /// 页容量
        /// </summary>
        public int PageSize = 20;
        /// <summary>
        /// 总页数
        /// </summary>
        public long RowCount
        {
            get
            {
                return (long)Math.Ceiling((decimal)Total / (decimal)PageSize);
            }
        }

        /// <summary>
        /// 总行数
        /// </summary>
        public long Total { set; get; }

        /// <summary>
        /// 数据集
        /// </summary>
        public object Data { set; get; }


    }
}