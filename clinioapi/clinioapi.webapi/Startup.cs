using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using clinioapi.core.Entities;
using clinioapi.infrastructure;
using clinioapi.services;
using clinioapi.webapi.ViewModels;
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
            services.AddTransient<ClinicService>();


            var config = new AutoMapper.MapperConfiguration(cfg =>{
                cfg.CreateMap<Patient,PatientViewModel>();
                cfg.CreateMap<PatientViewModel,Patient>();
            });
            IMapper mapper = config.CreateMapper();
            services.AddSingleton(mapper);

            services.AddDbContext<ClinioContext>(options =>
                options.UseLazyLoadingProxies()
                .UseNpgsql(Configuration.GetConnectionString("cliniodb"), b => b.MigrationsAssembly("clinioapi.webapi")));
  
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
        
            app.UseHttpsRedirection();

           
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
