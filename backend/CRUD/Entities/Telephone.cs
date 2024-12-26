using CRUD.Enums;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace CRUD.Entities
{
    public class Telephone
    {
        [Key]
        public int Id { get; set; }
        public int PersonId { get; set; }
        public string? Number { get; set; }
        public TelephoneType TelephoneType { get; set; }
        [ForeignKey("PersonId")]
        [JsonIgnore]
        public Person? Person { get; set; }
    }
}
