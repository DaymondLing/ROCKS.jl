module ROCKS

using LinearAlgebra
using FreqTables
using NamedArrays

using Reexport
@reexport using StatsBase
@reexport using DataFrames
@reexport using Plots

export BCDiag, bcdiag
export biasplot, ksplot, rocplot, accuracyplot
export liftcurve, cumliftcurve
export liftable, cumliftable
export kstest               # two sample KS and location
export auroc                # concordance and AUROC
export concordance          # Concordance with bounds function
export ranks                # equal count binning

#export infovalue

include("roc.jl")
include("kstest.jl")
include("ranks.jl")
include("bcdiag.jl")

end # module
