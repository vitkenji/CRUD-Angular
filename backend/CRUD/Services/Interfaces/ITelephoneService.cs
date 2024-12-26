using CRUD.DTO;

namespace CRUD.Services.Interfaces
{
    public interface ITelephoneService
    {
        Task CreateTelephone(TelephoneDTO request, int personId);
        Task DeleteTelephone(int personId, int telephoneId);
   }
}
