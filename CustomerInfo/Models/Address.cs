using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace CustomerInfo.Models
{
    public class Address
    {
        [Key]
        public int AddressId { get; set; }

        [Required]
        public string addtypeName { get; set; }

        [Required]
        public string address { get; set; }

        [Required]
        public string cityName { get; set; }

        [Required]
        public string zip { get; set; }

        [Required]
        public string countryName { get; set; }

        [Required]
        public string contact { get; set; }
     
    }
}