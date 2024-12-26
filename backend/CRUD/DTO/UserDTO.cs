using System.ComponentModel.DataAnnotations;

namespace CRUD.DTO
{
    public class UserDTO
    {
        [Required][MinLength(6)][MaxLength(20)]
        public string? Username { get; set; }
        [Required][MinLength(6)][MaxLength(20)]
        public string? Password { get; set; }
        [Required] [MinLength(6)][MaxLength(20)]
        public string? ConfirmPassword { get; set; }
        [Required][MinLength(6)] [MaxLength(50)]
        public string? Name { get; set; }
        [Required]
        public bool Admin   { get; set; }
    }
}
