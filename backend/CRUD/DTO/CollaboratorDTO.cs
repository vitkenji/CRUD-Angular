using CRUD.Enums;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace CRUD.DTO
{
    public class CollaboratorDTO
    {
        [Required]
        [Range(0, double.MaxValue)]
        public int RegistrationNumber { get; set; }
        [Required]
        [MinLength(6)]
        [MaxLength(50)]
        public string? Name { get; set; }
        [Required]
        [Range(0, 99999999999)]
        public decimal CPF { get; set; }
        [Required]
        [JsonConverter(typeof(DateOnly))]
        public DateTime BirthDate { get; set; }

        [Required]
        [MaxLength(10)]
        public string? RG { get; set; }
        [Range(0, 9999.99)]
        public decimal Contribution { get; set; }
        [Required]
        public CollaboratorType CollaboratorType { get; set; }
        [JsonConverter(typeof(DateOnly))]
        public DateTime AdmissionDate { get; set; }
    }
}
