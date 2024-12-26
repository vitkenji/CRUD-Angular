using CRUD.DTO;
using CRUD.Services.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CRUD.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TelephoneController : ControllerBase
    {
        private readonly ITelephoneService _telephoneService;

        public TelephoneController(ITelephoneService telephoneService)
        {
            _telephoneService = telephoneService;
        }

        [HttpPost("{personId}")]
        public async Task<IActionResult> PostTelephone([FromQuery] TelephoneDTO request, [FromRoute] int personId)
        {
            try
            {
                await _telephoneService.CreateTelephone(request, personId);
                return Ok();
            }
            catch(Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpDelete("{personId}/{telephoneId}")]
        public async Task<IActionResult> DeleteTelephone(int personId, int telephoneId)
        {
            try
            {
                await _telephoneService.DeleteTelephone(personId, telephoneId);
                return Ok();
            }
            catch(Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

    }
    }
