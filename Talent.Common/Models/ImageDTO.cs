using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Text;

namespace Talent.Common.Models
{
    public class ImageDTO
    {
            public string FileName { get; set; }

            public IFormFile Image { get; set; }
       
    }
}
