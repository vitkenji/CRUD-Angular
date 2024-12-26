using CRUD.Entities;

namespace CRUD.Repositories.Interfaces
{
    public interface IUserRepository
    {
        Task<IEnumerable<User>> getUsers();
        Task<User?> getUserByUsername(string username);
        Task PostUser(User user);
        Task DeleteUser(string username);
    }
}
