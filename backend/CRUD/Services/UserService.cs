using CRUD.DTO;
using CRUD.Entities;
using CRUD.Repositories.Interfaces;
using CRUD.Services.Interfaces;

namespace CRUD.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;

        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<IEnumerable<User>> GetUsers()
        {
            return await _userRepository.getUsers();
        }

        public async Task<User?> GetUserByUsername(string username)
        {
            return await _userRepository.getUserByUsername(username);
        }

        public async Task Login(string username, string password)
        {
            var user = GetUserByUsername(username);
        }

        public async Task PostUser(UserDTO request)
        {
            if (request == null)
            {
                throw new Exception("Request is null");
            }

            if (request.Password != request.ConfirmPassword)
            {
                throw new Exception("Passwords don't match");
            }


            var user = new User
            {
                Username = request.Username,
                Password = request.Password,
                Name = request.Name,
                Admin = request.Admin,
            };

            await _userRepository.PostUser(user);

        }

        public async Task DeleteUser(string username)
        {
            var user = await GetUserByUsername(username);
            if (user == null)
            {
                throw new Exception("User doesn't exist");
            }
            await _userRepository.DeleteUser(username);
        }


    }
}
