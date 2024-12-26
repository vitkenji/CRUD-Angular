using CRUD.DTO;
using CRUD.Entities;

namespace CRUD.Services.Interfaces
{
    public interface IUserService
    {
        Task<IEnumerable<User>> GetUsers();
        Task<User?> GetUserByUsername(string username);
        Task PostUser(UserDTO request);
        Task DeleteUser(string username);
        Task Login(string username, string password);
    }
}
