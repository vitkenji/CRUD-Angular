using CRUD.Enums;
using System.ComponentModel.DataAnnotations;

namespace CRUD.DTO
{
    public class TelephoneDTO
    {
        [Required]
        public string? Number { get; set; }
        [Required]
        public TelephoneType TelephoneType { get; set; }
    }
}
