namespace CRUD.Services.Interfaces
{
    public interface IAuthService
    {
        Task<string?> Login(string username, string password);
    }
}
