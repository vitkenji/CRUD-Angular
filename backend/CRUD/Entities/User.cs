using System.ComponentModel.DataAnnotations;

namespace CRUD.Entities
{
    public class User
    {
        [Key]
        public string? Username { get; set; }
        public string? Name { get; set; }
        public string? Password { get; set; }
        public bool Admin { get; set; }

    }
}
