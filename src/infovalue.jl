"""
    infovalue(g::Vector{Integer}, b::Vector{Integer}))

Information value calculation of `g`, `b` vector of binned frequency counts

- weight of evidence = log(density g / density b), 0 adjusted
- infovalue = sum (density g - density b) * weight of evidence

Industry rule of thumb:
- iv <= 0.1         no significant change
- 0.1 < iv <= 0.25  minor change
- 0.25 < iv         major change
"""
function infovalue(
    g::Vector{TG} where {TG<:Integer},
    b::Vector{TB} where {TB<:Integer};
    woeadjust = 0.5,
)
    length(g) >= 2 || error("frequency vectors should have at least 2 elements")
    length(g) == length(b) || error("frequency vectors should be the same length")

    # infovalue is class invariant - swapping g/b doesn't matter
    # infovalue is order invariant - re-ordering rows doesn't matter
    # implementation modelled after SAS PROC BINNING where
    # weight of evidence is adjusted to avoid divide by 0

    pb = b ./ sum(b)
    pg = g ./ sum(g)
    pba = (b + (b .== 0) * woeadjust) ./ sum(b)     # adjust only pure bins
    pga = (g + (g .== 0) * woeadjust) ./ sum(g)
    woe = log.(pga ./ pba)
    sum((pg .- pb) .* woe)
end
