using CRUD.Entities;


namespace CRUD.Repositories.Interfaces
{
    public interface ITelephoneRepository
    {
        Task CreateTelephone(Telephone telephone);
        Task DeleteTelephone(int personId, int telephoneId);
    }
}
