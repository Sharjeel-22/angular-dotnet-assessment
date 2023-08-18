using HackerNewsApi.Entities;
using HackerNewsApi.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;

namespace HackerNewsApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StoriesController : ControllerBase
    {
        private readonly IHackerNewsService _hackerNewsService;
        private readonly IMemoryCache _cache;

        public StoriesController(IHackerNewsService hackerNewsService, IMemoryCache cache)
        {
            _hackerNewsService = hackerNewsService;
            _cache = cache;
        }

        /// <summary>
        /// Get the newest Hacker News stories.
        /// </summary>
        /// <returns>List of newest stories.</returns>
        [HttpGet("newest")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<List<Story>>> GetNewestStories()
        {
            if (!_cache.TryGetValue("newestStories", out List<Story> stories))
            {
                stories = await _hackerNewsService.GetNewestStoriesAsync();
                _cache.Set("newestStories", stories, TimeSpan.FromMinutes(10));
            }
            return stories;
        }
    }
}
