"""
    kstest(class, var; rev = true)

Calculate empirical 2 sample Kolmogorov-Smirnov statistic and its location.\\
`class` is a 2 level categorical variable, `var` is the distribution to analyze.

Returns:
- n, total number of observations
- n1, number of observations of class 1
- n0, number of observations of class 0
- baserate, incidence rate of class 1
- ks, the maximum separation between the two cumulative distributions
- ksarg, the value of `var` at which maximum separation is achieved
- ksdep, depth of ksarg in the sorted values of `var`
`rev` = true counts depth from high value towards low value
"""
function kstest(class::BitArray{1}, var::Vector; rev = true)
    n = length(class)
    n == length(var) || error(ArgumentError("class and var should have the same length"))
    n1 = sum(class)
    n1 == 0 && error(ArgumentError("there are no class 1"))
    n0 = n - n1
    n0 == 0 && error(ArgumentError("there are no class 0"))

    baserate = n1 / n
    idx = sortperm(var, rev = rev)
    tgt = class[idx]
    cdf1 = cumsum(tgt) ./ n1            # TPR: True Positive Rate
    cdf0 = cumsum(.!tgt) ./ n0          # FPR: False Positive Rate
    sep = cdf1 .- cdf0
    ks, ksidx = findmax(sep)
    ksarg = var[idx[ksidx]]             # var @ max sep
    ksdep = ksidx / n                   # depth @ max sep

    (n = n, n1 = n1, n0 = n0, baserate = baserate, ks = ks, ksarg = ksarg, ksdep = ksdep)
end

function kstest(class::Vector, var::Vector; rev = true)
    uc = sort!(unique(class))
    length(uc) == 2 || error(ArgumentError("class must be 2 levels"))

    kstest(class .== uc[2], var; rev = rev)
end
