using CRUD.DTO;
using CRUD.Entities;

namespace CRUD.Services.Interfaces
{
    public interface IAddressService
    {
        Task<ViaCEPResponse> GetAddressByCEP(int CEP);
        Task CreateAddress(AddressDTO request, int personId);
        Task DeleteAddress(int personId, int addressId);
    }
}
