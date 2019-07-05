using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Amazon.S3.Model;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Talent.Common.Aws;
using Talent.Common.Contracts;

namespace Talent.Common.Services
{
    public class FileService : IFileService
    {
        private readonly IHostingEnvironment _environment;
        private readonly string _tempFolder;
        private IAwsService _awsService;

        public FileService(IHostingEnvironment environment, 
            IAwsService awsService)
        {
            _environment = environment;
            _tempFolder = "images\\";
            _awsService = awsService;
        }

        public async Task<string> GetFileURL(string id, FileType type)
        {
           
            string fileURL = await Task.Run(() => string.Join("/", "http://localhost:60290/images", id));
            return fileURL;


            /*
             * aws storage
             * 
             */
            //string url = await _awsService.GetStaticUrl(id, "bucketName");


        }

        public async Task<string> SaveFile(IFormFile file, FileType type)
        {
            /**
            * local storage
            */
            if (file == null || file.Length == 0)
            {
                return null;
            }
            var path = Path.Combine(Directory.GetCurrentDirectory(), _tempFolder, file.FileName);
            try {
                using (var stream = new FileStream(path, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                    return file.FileName;
                }
            }
            catch (Exception e)
            {
                return "error";
            }
           


            /**
             * aws code
             */
            //String newFileName;
            //String Bucket = "moisesfirstbucket";
            //var extension = "." + file.FileName.Split('.')[file.FileName.Split('.').Length - 1];
            //newFileName = Guid.NewGuid().ToString() + extension;
            //if (await _awsService.PutFileToS3(newFileName, file.OpenReadStream(), Bucket, true))
            //{
            //    return newFileName;
            //}
            //return null;


           
        }

        public async Task<bool> DeleteFile(string id, FileType type)
        {
            /**
             * local storage
             */
            var path = Path.Combine(Directory.GetCurrentDirectory(), _tempFolder, id);
            if (File.Exists(path))
            {
                await Task.Run(() => {
                    File.Delete(path);
                    return true;
                });
            }
            return false;


            /**
             * aws storage
             */
            //return await _awsService.RemoveFileFromS3(id, "moisesfirstbucket");


        }


        #region Document Save Methods

        private async Task<string> SaveFileGeneral(IFormFile file, string bucket, string folder, bool isPublic)
        {
            //Your code here;
            throw new NotImplementedException();
        }
        
        private async Task<bool> DeleteFileGeneral(string id, string bucket)
        {
            //Your code here;
            throw new NotImplementedException();
        }
        #endregion
    }
}
