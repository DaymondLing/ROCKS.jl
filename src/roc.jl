"""
    concordance(class, var, tie)

Computes concordant, tied and discordant pairs.\\
`class` can be either a BitVector or a 2 level categorical target variable in which case
`true` is defined by the last value in sorted sequence.\\
`var` is a Vector of predictor, same length as `class`,\\
`tie` (optional) can be a number (default is 1e-6) that defines a tied region,
or it can be a function that when called with a scalar value will return a tuple
of lower bound and upper bound of a tied region,
useful when you want to do percentage tied region for instance.

Pair-wise comparison between class 1 with class 0 values are made as follows:
- class 1 value > class 0 value is Concordant
- class 1 value ≈ class 0 value (within `tie`) is Tied
- class 1 value < class 0 value is Discordant

Returns:
- concordant, number of concordant comparisons
- tied, number of tied comparisons
- discordant, number of discordant comparisons
- auroc, or C, is (Concordant + 0.5Tied) / Total comparisons; same as numeric integration of ROC curve
- gini, 2C-1, also known as Somer's D, is (Concordant - Discordant) / Total comparisons

Concordance calculation is the same as numeric integration of the ROC curve,
but it allows for fuzzy tied regions which can be useful.

Note:
- Goodman-Kruskal Gamma is (Concordant - Discordant) / (Concordant + Discordant)
- Kendall's Tau is (Concordant - Discordant) / (0.5 x Total count x (Total count - 1))
"""
function concordance(class::BitVector, var::Vector, tie = 1e-6)
    n = length(class)
    n == length(var) || throw(ArgumentError("class and var should be the same length"))
    n1 = sum(class)
    n1 == 0 && throw(ArgumentError("there are no class 1"))
    n0 = n - n1
    n0 == 0 && throw(ArgumentError("there are no class 0"))

    c1 = sort!(var[class])              # sorted var of class 1
    c0 = sort!(var[.!class])            # sorted var of class 0

    conc = 0
    tied = 0
    l_ix = 1
    u_ix = 1
    @inbounds for v in c1               # loop over this usually smaller array
        l_v = v - tie
        u_v = v + tie

        while l_ix <= n0                # first index within [l_v, u_v] window
            l_v <= c0[l_ix] && break
            l_ix += 1                   # could exit as n0 + 1
        end

        while u_ix <= n0                # first index beyond [l_v, u_v] window
            u_v < c0[u_ix] && break
            u_ix += 1                   # could exit as n0 + 1
        end

        conc += (l_ix - 1)              # lower than l_ix are Concordant
        tied += (u_ix - l_ix)           # within window are tied
    end

    pairs = n1 * n0
    disc = pairs - conc - tied
    auc = (conc + 0.5tied) / pairs

    (conc = conc, tied = tied, disc = disc, auc = auc, gini = 2auc - 1)
end

function concordance(class::BitVector, var::Vector, tie::Function)
    n = length(class)
    n == length(var) || throw(ArgumentError("class and var should be the same length"))
    n1 = sum(class)
    n1 == 0 && throw(ArgumentError("there are no class 1"))
    n0 = n - n1
    n0 == 0 && throw(ArgumentError("there are no class 0"))

    c1 = sort!(var[class])              # sorted var of class 1
    c0 = sort!(var[.!class])            # sorted var of class 0

    conc = 0
    tied = 0
    l_ix = 1
    u_ix = 1
    @inbounds for v in c1               # loop over this usually smaller array
        l_v, u_v = tie(v)               # tie scalar function returning lower & upper bound

        while l_ix <= n0                # first index within [l_v, u_v] window
            l_v <= c0[l_ix] && break
            l_ix += 1                   # could exit as n0 + 1
        end

        while u_ix <= n0                # first index beyond [l_v, u_v] window
            u_v < c0[u_ix] && break
            u_ix += 1                   # could exit as n0 + 1
        end

        conc += (l_ix - 1)              # lower than l_ix are Concordant
        tied += (u_ix - l_ix)           # within window are tied
    end

    pairs = n1 * n0
    disc = pairs - conc - tied
    auc = (conc + 0.5tied) / pairs

    (conc = conc, tied = tied, disc = disc, auc = auc, gini = 2auc - 1)
end

function concordance(class::Vector, var::Vector, tie = 1e-6)
    uc = sort!(unique(class))
    length(uc) == 2 || throw(ArgumentError("class must be 2 levels"))

    concordance(class .== uc[2], var, tie)
end


roc = concordance                       # synonym
