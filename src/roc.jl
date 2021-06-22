"""
    auroc(class, var; tie = 1e-6)

Calculate area under Receiver Operating Characteristics (ROC) curve,
`class` is a 2 level categorical variable, `var` is the distribution to analyze.
Pair-wise comparison between class 1 values with class 0 values are made as follows:
- class 1 value > class 0 value is Concordant
- class 1 value ≈ class 0 value (within `tie`) is Tied
- class 1 value < class 0 value is Discordant

Returns:
- concordant, number of concordant comparisons
- tied, number of tied comparisons
- discordant, number of discordant comparisons
- auc, or C, is (Concordant + 0.5Tied) / Total comparisons; same as numeric integration of ROC curve
- gini, 2C-1, also known as Somer's D, is (Concordant - Discordant) / Total comparisons

Note there are other rank order measures:
- Goodman-Kruskal Gamma is (Concordant - Discordant) / (Concordant + Discordant), no penalty for ties
- Kendall's Tau is (Concordant - Discordant) / (0.5 N(N-1))
"""
function auroc(class::BitArray{1}, var::Vector; tie = 1e-6)
    n = length(class)
    n == length(var) || error(ArgumentError("class and var should have the same length"))
    n1 = sum(class)
    n1 == 0 && error(ArgumentError("there are no class 1"))
    n0 = n - n1
    n0 == 0 && error(ArgumentError("there are no class 0"))

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

function auroc(class::Vector, var::Vector; tie = 1e-6)
    uc = unique(class)
    length(uc) == 2 || error(ArgumentError("class should have 2 levels"))

    auroc(class .== uc[2], var; tie = tie)
end


"""
    concordance(class, var, tie)

Concordance calculation with flexible tied region (`auroc` uses fixed width region).
`class` is a 2 level categorical variable, `var` is the distribution to analyze,
`tie`(x) returns the lower and upper bound of tied region of x.

Pair-wise comparison between class 1 values with class 0 values are made as follows:
class 1 value > class 0 value is Concordant; class 1 value ≈ class 0 value (within `tie`) is Tied;
class 1 value < class 0 value is Discordant.

Returns:
- concordant, number of concordant comparisons
- tied, number of tied comparisons
- discordant, number of discordant comparisons
- auroc, or C, is (Concordant + 0.5Tied) / Total comparisons; same as numeric integration of ROC curve
- gini, 2C-1, also known as Somer's D, is (Concordant - Discordant) / Total comparisons

Note Goodman-Kruskal Gamma is (Concordant - Discordant) / (Concordant + Discordant);
and Kendall's Tau is (Concordant - Discordant) / (0.5 x Total count x (Total count - 1))
"""
function concordance(class::BitArray{1}, var::Vector, tie)
    n = length(class)
    n == length(var) || error(ArgumentError("class and var should have the same length"))
    n1 = sum(class)
    n1 == 0 && error(ArgumentError("there are no class 1"))
    n0 = n - n1
    n0 == 0 && error(ArgumentError("there are no class 0"))

    c1 = sort!(var[class])              # sorted var of class 1
    c0 = sort!(var[.!class])            # sorted var of class 0

    conc = 0
    tied = 0
    l_ix = 1
    u_ix = 1
    @inbounds for v in c1               # loop over this usually smaller array
        l_v, u_v = tie(v)               # <== tie function

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

function concordance(class::Vector, var::Vector, tie)
    uc = unique(class)
    length(uc) == 2 || error(ArgumentError("class should have 2 levels"))

    concordance(class .== uc[2], var, tie)
end
