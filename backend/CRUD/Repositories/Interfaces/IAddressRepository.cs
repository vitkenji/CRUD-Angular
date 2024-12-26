using CRUD.Entities;

namespace CRUD.Repositories.Interfaces
{
    public interface IAddressRepository
    {
        Task CreateAddress(Address address);
        Task DeleteAddress(int personId, int addressId);
    }
}
