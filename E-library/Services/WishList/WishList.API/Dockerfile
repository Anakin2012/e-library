#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:5.0 AS base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build
WORKDIR /src
COPY ["Services/WishList/WishList.API/WishList.API.csproj", "Services/WishList/WishList.API/"]
RUN dotnet restore "Services/WishList/WishList.API/WishList.API.csproj"
COPY . .
WORKDIR "/src/Services/WishList/WishList.API"
RUN dotnet build "WishList.API.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "WishList.API.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "WishList.API.dll"]
