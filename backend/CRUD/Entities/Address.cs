using CRUD.Enums;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace CRUD.Entities
{
    public class Address
    {
        [Key]
        public int Id { get; set; }
        public int PersonId { get; set; }
        public string? Street { get; set; }
        public string? Number { get; set; }
        public string? Neighborhood { get; set; }
        public string? City { get; set; }
        public int CEP { get; set; }
        public AddressType AddressType { get; set; }
        [ForeignKey("PersonId")]
        [JsonIgnore]
        public Person? Person { get; set; }
    }
}
