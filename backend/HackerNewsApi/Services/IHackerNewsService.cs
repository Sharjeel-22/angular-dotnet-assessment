using HackerNewsApi.Entities;

namespace HackerNewsApi.Services
{
    public interface IHackerNewsService
    {
        Task<List<Story>> GetNewestStoriesAsync();
    }
}
