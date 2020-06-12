FROM mcr.microsoft.com/dotnet/core/aspnet:3.1 AS base
WORKDIR /app

FROM mcr.microsoft.com/dotnet/core/sdk:3.1 AS build
WORKDIR /src
COPY ./clinioapi/clinioapi.sln ./
COPY ./clinioapi/clinioapi.core/*.csproj ./clinioapi.core/
COPY ./clinioapi/clinioapi.infrastructure/*.csproj ./clinioapi.infrastructure/
COPY ./clinioapi/clinioapi.services/*.csproj ./clinioapi.services/
COPY ./clinioapi/clinioapi.webapi/*.csproj ./clinioapi.webapi/

RUN dotnet restore
COPY ./clinioapi/ .

WORKDIR /src/clinioapi.core
RUN dotnet build -c Release -o /app

WORKDIR /src/clinioapi.infrastructure
RUN dotnet build -c Release -o /app

WORKDIR /src/clinioapi.services
RUN dotnet build -c Release -o /app

WORKDIR /src/clinioapi.webapi
RUN dotnet build -c Release -o /app

FROM build AS publish
RUN dotnet publish -c Release -o /app

FROM base AS final
WORKDIR /app
COPY --from=publish /app . 

CMD ASPNETCORE_URLS=http://*:$PORT dotnet clinioapi.webapi.dll