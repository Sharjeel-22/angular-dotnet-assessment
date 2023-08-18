using HackerNewsApi.Entities;
using System.Text.Json;

namespace HackerNewsApi.Services
{
    public class HackerNewsService : IHackerNewsService
    {
        private readonly HttpClient _httpClient;

        public HackerNewsService(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        public async Task<List<Story>> GetNewestStoriesAsync()
        {
            HttpResponseMessage response = await _httpClient.GetAsync("https://hacker-news.firebaseio.com/v0/newstories.json");

            if (response.IsSuccessStatusCode)
            {
                int[] storyIds = await response.Content.ReadFromJsonAsync<int[]>();

                List<Story> stories = new List<Story>();

                var count = 0;

                foreach (int storyId in storyIds)
                {
                    count++;
                    Story storyDetails = await GetStoryDetailsAsync(storyId);
                    stories.Add(storyDetails);
                    if(count == 50)
                    {
                        break;
                    }
                }

                return stories;
            }

            return new List<Story>();
        }

        private async Task<Story> GetStoryDetailsAsync(int storyId)
        {
            HttpResponseMessage storyResponse = await _httpClient.GetAsync($"https://hacker-news.firebaseio.com/v0/item/{storyId}.json");

            if (storyResponse.IsSuccessStatusCode)
            {
                Story story = await storyResponse.Content.ReadFromJsonAsync<Story>();
                return story;
            }

            return null;
        }


        //private async Task<Story> GetStoryDetailsAsync(int storyId)
        //{
        //    HttpResponseMessage storyResponse = await _httpClient.GetAsync($"https://hacker-news.firebaseio.com/v0/item/{storyId}.json")
        //                                                          .ConfigureAwait(false);

        //    if (storyResponse.IsSuccessStatusCode)
        //    {
        //        string jsonContent = await storyResponse.Content.ReadAsStringAsync().ConfigureAwait(false);
        //        Story story = JsonSerializer.Deserialize<Story>(jsonContent);
        //        return story;
        //    }

        //    return null;
        //}


    }
}
