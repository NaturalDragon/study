using System;

namespace FileService.Core.Filter
{
    [AttributeUsage(AttributeTargets.Method, AllowMultiple = false, Inherited = false)]
    public class NoAuthTokenAttribute : Attribute
    {
    }
}
