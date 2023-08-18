using HackerNewsApi.Entities;
using HackerNewsApi.Services;
using Moq;
using Moq.Protected;
using System.Net;

namespace UnitTestHackerNews
{
    [TestClass]
    public class HackerNewsServiceUnitTests
    {

        [TestMethod]
        public async Task GetNewestStoriesAsync_Success()
        {
            // Arrange
            var mockHandler = new Mock<HttpMessageHandler>(MockBehavior.Strict);
            mockHandler
                .Protected()
                .Setup<Task<HttpResponseMessage>>(
                    "SendAsync",
                    ItExpr.IsAny<HttpRequestMessage>(),
                    ItExpr.IsAny<CancellationToken>()
                )
                .ReturnsAsync(new HttpResponseMessage
                {
                    StatusCode = HttpStatusCode.OK,
                    Content = new StringContent("[1, 2, 3]") // Example story IDs
                });

            var httpClient = new HttpClient(mockHandler.Object);
            var hackerNewsService = new HackerNewsService(httpClient);

            // Act
            List<Story> stories = await hackerNewsService.GetNewestStoriesAsync();

            // Assert
            Assert.AreEqual(3, stories.Count); // Assuming 3 example story IDs
        }


        [TestMethod]
        public async Task GetNewestStoriesAsync_Failure()
        {
            // Arrange
            var mockHandler = new Mock<HttpMessageHandler>(MockBehavior.Strict);
            mockHandler
                .Protected()
                .Setup<Task<HttpResponseMessage>>(
                    "SendAsync",
                    ItExpr.IsAny<HttpRequestMessage>(),
                    ItExpr.IsAny<CancellationToken>()
                )
                .ReturnsAsync(new HttpResponseMessage
                {
                    StatusCode = HttpStatusCode.InternalServerError
                });

            var httpClient = new HttpClient(mockHandler.Object);
            var hackerNewsService = new HackerNewsService(httpClient);

            // Act
            List<Story> stories = await hackerNewsService.GetNewestStoriesAsync();

            // Assert
            Assert.AreEqual(0, stories.Count); // Expecting no stories due to failure
           // Additional assertions can be added based on the expected behavior
        }
    }
}