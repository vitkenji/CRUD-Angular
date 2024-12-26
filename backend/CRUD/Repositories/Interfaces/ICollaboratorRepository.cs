using CRUD.Entities;

namespace CRUD.Repositories.Interfaces
{
    public interface ICollaboratorRepository
    {
        Task<IEnumerable<Collaborator>> GetCollaborators();
        Task<Collaborator?> GetCollaboratorById(int collaboratorId);
        Task PostCollaborator(Collaborator collaborator);
        Task DeleteCollaborator(int personId);

    }
}
