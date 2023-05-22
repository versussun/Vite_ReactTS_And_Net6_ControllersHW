#See https://aka.ms/customizecontainer to learn how to customize your debug container and how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443
RUN apt-get update
RUN apt-get install -y curl
RUN apt-get install -y libpng-dev libjpeg-dev curl libxi6 build-essential libgl1-mesa-glx
RUN curl -sL https://deb.nodesource.com/setup_18.x | bash -
RUN apt-get install -y nodejs

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
RUN apt-get update
RUN apt-get install -y curl
RUN apt-get install -y libpng-dev libjpeg-dev curl libxi6 build-essential libgl1-mesa-glx
RUN curl -sL https://deb.nodesource.com/setup_18.x | bash -
RUN apt-get install -y nodejs



WORKDIR /src
COPY ["Vite_ReactTS_And_Net6_ControllersHW/Vite_ReactTS_And_Net6_ControllersHW.csproj", "Vite_ReactTS_And_Net6_ControllersHW/"]
RUN dotnet restore "Vite_ReactTS_And_Net6_ControllersHW/Vite_ReactTS_And_Net6_ControllersHW.csproj"
COPY . .
#
WORKDIR "/src/Vite_ReactTS_And_Net6_ControllersHW/ClientApp"
RUN npm install -g typescript
#RUN npm install -g vite
RUN npm i

WORKDIR "/src/Vite_ReactTS_And_Net6_ControllersHW"
#RUN dotnet build "Vite_ReactTS_And_Net6_ControllersHW.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Vite_ReactTS_And_Net6_ControllersHW.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Vite_ReactTS_And_Net6_ControllersHW.dll"]