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
    pages = [
        "Home" => "index.md",
        "User's Guide" => [
            "KS Test" => "man/kstest.md",
            "ROC" => "man/roc.md",
            "Plots and Tables" => "man/bcdiag.md",
        ],
        "Function Reference" => "Reference.md",
    ],
)

deploydocs(; repo = "github.com/DaymondLing/ROCKS.jl.git", devbranch = "main")
