using CRUD.DTO;
using CRUD.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace CRUD.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AddressController : ControllerBase
    {
        private readonly IAddressService _addressService;
        public AddressController(IAddressService addressService)
        {
            _addressService = addressService;
        }

        [HttpPost("{personId}")]
        public async Task<IActionResult> PostAddress([FromQuery] AddressDTO request, [FromRoute] int personId)
        {
            try
            {
                await _addressService.CreateAddress(request, personId);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpDelete("{personId}/{addressId}")]
        public async Task<IActionResult> DeleteAddress([FromRoute] int personId, [FromRoute] int addressId)
        {
            try
            {
                await _addressService.DeleteAddress(personId, addressId);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }
        [HttpGet]
        public async Task<IActionResult> GetAddressByCEP([FromQuery] int CEP)
        {
            try
            {
                var address = await _addressService.GetAddressByCEP(CEP);
                return Ok(address);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }
    }
}
