using Microsoft.Extensions.Hosting;
using Net6_Controller_And_VIte;
using System.Diagnostics;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// In production, the Vite files will be served from this directory
builder.Services.AddSpaStaticFiles(configuration =>
{
    configuration.RootPath = "ClientApp/dist";
});


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseStaticFiles();
app.UseSpaStaticFiles();

var posts = new List<Post>()
            {
            new Post{
                Id = Guid.NewGuid(), Author="testAuthor", Description="Lorem Ipsum - это текст-\"рыба\", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной \"рыбой\" для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя Lorem Ipsum для распечатки образцов. Lorem Ipsum не только успешно пережил без заметных изменений пять веков, но и перешагнул в электронный дизайн. Его популяризации в новое время послужили публикация листов Letraset с образцами Lorem Ipsum в 60-х годах и, в более недавнее время, программы электронной вёрстки типа Aldus PageMaker, в шаблонах которых используется Lorem Ipsum.", Preview = "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg", Title="testTitle"
            },
            new Post{
                Id = Guid.NewGuid(), Author="testAutho2", Description="Lorem Ipsum - это текст-\"рыба\", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной \"рыбой\" для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя Lorem Ipsum для распечатки образцов. Lorem Ipsum не только успешно пережил без заметных изменений пять веков, но и перешагнул в электронный дизайн. Его популяризации в новое время послужили публикация листов Letraset с образцами Lorem Ipsum в 60-х годах и, в более недавнее время, программы электронной вёрстки типа Aldus PageMaker, в шаблонах которых используется Lorem Ipsum.", Preview = "https://thumbs.dreamstime.com/b/environment-earth-day-hands-trees-growing-seedlings-bokeh-green-background-female-hand-holding-tree-nature-field-gra-130247647.jpg", Title="testTitle2"
            }
            };

app.UseRouting();
app.UseEndpoints(endpoint =>
{
    endpoint.MapGet("/api/posts", () => posts)
            .WithName("GetPosts");
    endpoint.MapGet("/api/posts/{id}", (Guid id) => posts.FirstOrDefault(i => i.Id == id))
            .WithName("GetPost");

    endpoint.MapPost("/api/posts", (PostCreateRequest postreq) =>
    {
        var post = new Post();
        post.Id = Guid.NewGuid();
        post.Author = postreq.Author;
        post.Description = postreq.Description;
        post.Title = postreq.Title;
        post.Author = postreq.Author;
        post.Preview = postreq.Preview;
        posts.Add(post);
        return post;
    })
    .WithName("CreatePost");
    endpoint.MapPut("/api/posts/{id}", (Guid id, PostCreateRequest model) =>
    {
        var post = posts.FirstOrDefault(i => i.Id == id);
        post.Author = model.Author;
        post.Description = model.Description;
        post.Preview = model.Preview;
        post.Title = model.Title;
        return post;
    })
    .WithName("UpadatePost");

    endpoint.MapDelete("/api/posts/{id}", (Guid id) =>
    {
        posts.Remove(posts.FirstOrDefault(i => i.Id == id));
        return posts;
    })
    .WithName("DeletPost");

});

app.UseSpa(spa =>
{
    if (app.Environment.IsDevelopment())
        spa.UseViteDevelopmentServer(sourcePath: "ClientApp");
});

app.Run();

record class Post
{
    public Guid Id { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public string Preview { get; set; }
    public string Author { get; set; }
}
record class PostCreateRequest
{
    public string Title { get; set; }
    public string Description { get; set; }
    public string Preview { get; set; }
    public string Author { get; set; }
}
