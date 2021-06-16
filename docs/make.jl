using ROCKS
using Documenter

DocMeta.setdocmeta!(ROCKS, :DocTestSetup, :(using ROCKS); recursive=true)

makedocs(;
    modules=[ROCKS],
    authors="Daymond Ling",
    repo="https://github.com/DaymondLing/ROCKS.jl/blob/{commit}{path}#{line}",
    sitename="ROCKS.jl",
    format=Documenter.HTML(;
        prettyurls=get(ENV, "CI", "false") == "true",
        canonical="https://DaymondLing.github.io/ROCKS.jl",
        assets=String[],
    ),
    pages=[
        "Home" => "index.md",
    ],
)

deploydocs(;
    repo="github.com/DaymondLing/ROCKS.jl",
)
