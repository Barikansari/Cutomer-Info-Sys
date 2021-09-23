using Microsoft.Azure.Amqp.Framing;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;


namespace CustomerInfo.Models
{
    public class CustomerDetail
    {
        [Key]
        public int CustomerId { get; set; }

        [Required]
        public string Salutation { get; set; }

        [Required]
        public string First_Name { get; set; }

        [Required]
        public string Last_Name { get; set; }

        [Required]
        public string Phone_Number { get; set; }

        [Required]
        public string Email { get; set; }

        [Required]
        public string Age { get; set; }

        [Required]
        public string Gender { get; set; }

        //[Required]
        //public string Education { get; set; }

        [Required]
        public string Nationality { get; set; }

        public List<Address> AddressList { get; set; }
        public List<EducationData> EducationList { get; set; }
        public List<detailInfo> detailInfoList { get; set; }
    }

    public class EducationData
    {
        public string SelectedEducation { get; set; }
        //public string SelectedEducation { get; set; }
    }
}