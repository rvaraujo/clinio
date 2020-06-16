using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using clinioapi.core.Entities;
using clinioapi.infrastructure;
using clinioapi.services;
using clinioapi.webapi.Filters;
using clinioapi.webapi.ViewModels;
using Microsoft.AspNetCore.Authentication.JwtBearer;
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
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;

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
            services.AddTransient<UserService>();

            var config = new AutoMapper.MapperConfiguration(cfg =>{
                cfg.CreateMap<Patient,PatientViewModel>();
                cfg.CreateMap<PatientViewModel,Patient>();
                cfg.CreateMap<User,UserViewModel>();
                cfg.CreateMap<UserViewModel,User>();
            });
            IMapper mapper = config.CreateMapper();
            services.AddSingleton(mapper);

            services.AddDbContext<ClinioContext>(options =>
                options.UseLazyLoadingProxies()
                .UseNpgsql(Configuration.GetConnectionString("cliniodb"), b => b.MigrationsAssembly("clinioapi.webapi")));
  
            services.AddControllers().AddNewtonsoftJson(options =>
                options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore
            );

            services.AddSwaggerGen(c =>{
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "Backend Clinio - Gerenciador de Consultório Odontológico", Version = "v1.0" });
                var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
                var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
                c.IncludeXmlComments(xmlPath);
                c.OperationFilter<AuthorizeCheckOperationFilter>();
            //    c.AddSecurityRequirement(new OpenApiSecurityRequirement(){
            //        {new OpenApiSecurityScheme{
            //            Reference = new OpenApiReference{
            //                Type = ReferenceType.SecurityScheme,
            //                Id = "Bearer"
            //                },
            //             Scheme = "oauth2",
            //             Name = "Bearer",
            //             In = ParameterLocation.Header,
            //             },
            //         new List<string>()
            //         } 
            //     });
            });

            var key = Encoding.ASCII.GetBytes(Configuration.GetValue<string>("ClinioApiKey"));
            services.AddAuthentication(x =>{	
                x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(x =>{
                x.RequireHttpsMetadata = false;
                x.SaveToken = true;
                x.TokenValidationParameters = new TokenValidationParameters{
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience = false
                };
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseSwagger();

            app.UseSwaggerUI(c =>{
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "Backend");
                c.RoutePrefix = string.Empty;
            });
        
            app.UseHttpsRedirection();

           
            app.UseRouting();

             app.UseCors(option => {
                option.AllowAnyHeader();
                option.AllowAnyOrigin();
                option.AllowAnyMethod();
            });

            app.UseAuthentication();
            app.UseAuthorization();
            

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
