using CRUD.Enums;
using Microsoft.EntityFrameworkCore.SqlServer.Query.Internal;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion.Internal;
using System.ComponentModel.DataAnnotations;

namespace CRUD.DTO
{
    public class AddressDTO
    {
        [Required]
        [MaxLength(100)]
        public string? Street {  get; set; }
        [Required]
        [MaxLength(10)]
        public string? Number { get; set; }
        [Required]
        [MaxLength(50)]
        public string? Neighborhood { get; set; }
        [Required]
        [MaxLength(100)]
        public string? City { get; set; }
        [Required]
        [Range(10000000,99999999)]
        public int CEP { get; set; }
        [Required]
        public AddressType addressType { get; set; }
    }
}
