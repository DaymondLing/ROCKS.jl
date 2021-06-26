module ROCKS

using LinearAlgebra
using FreqTables
using NamedArrays

using Reexport
@reexport using StatsBase
@reexport using DataFrames
@reexport using Plots

export ranks                # equal count binning
export kstest               # two sample KS and location
export concordance          # Concordance with bounds function
export roc                  # ssynonym for Concordance

export BCDiag
export bcdiag
export ksplot, rocplot, biasplot, accuracyplot
export liftcurve, cumliftcurve
export liftable, cumliftable

include("ranks.jl")
include("kstest.jl")
include("roc.jl")
include("bcdiag.jl")

end # module
