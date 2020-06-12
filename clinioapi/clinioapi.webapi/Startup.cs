using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using clinioapi.infrastructure;
using clinioapi.services;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Localization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace clinioapi.webapi
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddTransient<PatientService>();
            services.AddTransient<AppointmentService>();
            services.AddTransient<ParametersService>();

            services.AddDbContext<ClinioContext>(options =>
                options.UseLazyLoadingProxies()
                .UseNpgsql(Configuration.GetConnectionString("cliniodb"), b => b.MigrationsAssembly("clinioapi.webapi")));

            CultureInfo[] supportedCultures = new[]
                {
                    
                    new CultureInfo("fr-FR")
                };

                services.Configure<RequestLocalizationOptions>(options =>
                {
                    options.DefaultRequestCulture = new RequestCulture("fr-FR");
                    options.SupportedCultures = supportedCultures;
                    options.SupportedUICultures = supportedCultures;
                    options.RequestCultureProviders = new List<IRequestCultureProvider>
                    {
                        new QueryStringRequestCultureProvider(),
                        new CookieRequestCultureProvider()
                    };
                });

            services.AddControllers().AddNewtonsoftJson(options =>
                options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore
            );
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            

            CultureInfo[] supportedCultures = new[]
                {
                    
                    new CultureInfo("fr-FR")
                };
            

            app.UseHttpsRedirection();

            app.UseRequestLocalization(new RequestLocalizationOptions{
                DefaultRequestCulture = new RequestCulture("fr-FR"),
                SupportedCultures = supportedCultures,
                SupportedUICultures= supportedCultures
            });

            app.UseRouting();

             app.UseCors(option => {
                option.AllowAnyHeader();
                option.AllowAnyOrigin();
                option.AllowAnyMethod();
            });

            app.UseAuthorization();
            

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
