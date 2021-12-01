using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FileService.Core.Models
{
    public class LoginUser
    {
        /// <summary>
        /// 用户Id.
        /// </summary>
        /// <value>The user identifier.</value>
        public Guid UserId { get; set; }

        /// <summary>
        /// 机构Id.
        /// </summary>
        /// <value>The company identifier.</value>
        public Guid CompanyId { get; set; }

        /// <summary>
        /// 组织机构Id
        /// </summary>
        public string OrgId { get; set; }

        /// <summary>
        /// 用户名称.
        /// </summary>
        /// <value>The name.</value>
        public string Name { get; set; }

        /// <summary>
        /// 用户编码
        /// </summary>
        public string Code { get; set; }

        /// <summary>
        /// 电子邮件.
        /// </summary>
        /// <value>The email.</value>
        public string Email { get; set; }

        /// <summary>
        /// 令牌.
        /// </summary>
        /// <value>The token.</value>
        public string Token { get; set; }

        /// <summary>
        /// 角色Id列表.
        /// </summary>
        /// <value>The role identifier list.</value>
        public string RoleIdList { get; set; }


        /// <summary>
        /// 过期日期
        /// </summary>
        public DateTime ExpireDateTime { get; set; }



    }
}
