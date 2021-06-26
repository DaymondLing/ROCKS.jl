using ROCKS

using Random
using Distributions

Random.seed!(888)
const x = rand(Uniform(-5, 5), 1_000_000)
const logit = -3.0 .+ 0.5 .* x .+ rand(Normal(0, 0.1), length(x))
const prob = @. 1.0 / (1.0 + exp(-logit))
const target = rand(length(x)) .<= prob

kk = kstest(target, x)

cc = concordance(target, x)

perf = bcdiag(target, x)

ksplot(perf)

rocplot(perf)

biasplot(perf)

accuracyplot(perf)

liftcurve(perf)

cumliftcurve(perf)

liftable(perf)

cumliftable(perf)
