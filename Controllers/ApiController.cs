using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Net.Mail;
using System.IO;
using System;

namespace LerniaReact.Controllers
{
    [Route("api")]
    public class ApiController : Controller
    {
        const string RECIPE_SEARCH_ID = "101c337c";
        const string RECIPE_SEARCH_KEY = "3648650d1aab3889ab786dab1e70b2d1";
        const string FOOD_DATABASE_ID = "cd4cf0ad";
        const string FOOD_DATABASE_KEY = "63dd569834e24ed866292fc795fbdd31";

        [Route("search/{query}/{parameters}")]
        public async Task Search([FromRoute] string query,[FromRoute] string parameters)
        {
            await Query($"https://api.edamam.com/search?q={query}&app_id={RECIPE_SEARCH_ID}&app_key={RECIPE_SEARCH_KEY}{parameters}");
            //&from={startIndex}&to={lastIndex}&diet={typeOfDiet}&calories={minCalories}-{maxCalories}&health={health}&time={maxCookTime}
        }
        [Route("foodSearch/{query}")]
        public async Task FoodSearch([FromRoute] string query)
        {
            await Query($"https://api.edamam.com/api/food-database/parser?ingr={query}&app_id={FOOD_DATABASE_ID}&app_key={FOOD_DATABASE_KEY}");

        }
        [Route("NutrientsSearch")]
                public async Task NutrientsSearch()
        {
            await Query($"https://api.edamam.com/api/food-database/nutrients?app_id={FOOD_DATABASE_ID}&app_key={FOOD_DATABASE_KEY}");

        }
        [Route("SendMail/{TargetMail}/{MailTitle}/{MailBody}")]
        public void SendMail(string TargetMail, string MailTitle, string MailBody)
        {
          
            string SourceMail = "recipe.project.lernia@gmail.com";
            string Password = "recipeproject666";

            var client = new SmtpClient("stmp.gmail.com", 587){
                Credentials = new NetworkCredential(SourceMail, Password),
                EnableSsl = true
            };
            try {
                  client.Send(SourceMail, TargetMail, MailTitle, MailBody);
                  
            }catch (Exception) {
               
            }
        }
        private async Task Query(string url)
        {
            using (var request = new HttpClient())
            {
                var stream = await request.GetStreamAsync(url);
                Response.ContentType = "application/json";
                await stream.CopyToAsync(Response.Body);
            }
        }
    }
}