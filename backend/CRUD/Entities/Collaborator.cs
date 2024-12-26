using CRUD.Enums;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CRUD.Entities
{
    public class Collaborator
    {
        [Key]
        public int Id { get; set; }
        public int PersonId { get; set; }
        [ForeignKey("PersonId")]
        public CollaboratorType CollaboratorType { get; set; }
        public int RegistrationNumber {  get; set; }
        public DateOnly? AdmissionDate { get; set; }
        public decimal? Contribution { get; set; }
        public Person? Person { get; set; }

    }
}
