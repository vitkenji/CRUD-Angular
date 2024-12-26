using CRUD.DTO;
using CRUD.Entities;

namespace CRUD.Services.Interfaces
{
    public interface ICollaboratorService
    {
        Task<IEnumerable<Collaborator>> GetCollaborators();
        Task<Collaborator?> GetCollaboratorById(int collaboratorId);
        Task PostCollaborator(CollaboratorDTO request);
        Task DeleteCollaborator(int id);

    }
}
