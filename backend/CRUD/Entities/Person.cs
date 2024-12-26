using System.ComponentModel.DataAnnotations;

namespace CRUD.Entities
{
    public class Person
    {
        [Key]
        public int Id { get; set; }
        public decimal CPF { get; set; }
        public string? Name { get; set; }
        public DateOnly BirthDate { get; set; }
        public string? RG { get; set; }
        public List<Telephone>? Telephones { get; set; }
        public List<Address>? Addresses { get; set; }
    }
}
