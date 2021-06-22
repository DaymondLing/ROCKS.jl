using ROCKS
using Documenter

makedocs(;
    modules = [ROCKS],
    authors = "Daymond Ling",
    repo = "https://github.com/DaymondLing/ROCKS.jl/blob/{commit}{path}#L{line}",
    sitename = "ROCKS.jl",
    format = Documenter.HTML(;
        prettyurls = get(ENV, "CI", "false") == "true",
        canonical = "https://DaymondLing.github.io/ROCKS.jl/stable",
        assets = String[],
    ),
    pages = Any[
        "Home"=>"index.md",
        "Manual"=>Any[
            "Binary Classifier"=>"man/bcdiag.md",
        ],
        "Function Reference"=>"Reference.md",
    ],
)

deploydocs(; repo = "github.com/DaymondLing/ROCKS.jl.git", devbranch = "main")
