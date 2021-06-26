using ROCKS
using Random
using Distributions

Random.seed!(888)
const x = rand(Uniform(-5, 5), 1_000_000)
const logit = -3.0 .+ 0.5 .* x .+ rand(Normal(0, 0.1), length(x))
const prob = @. 1.0 / (1.0 + exp(-logit))
const target = rand(length(x)) .<= prob

kk = kstest(target, prob)

cc = concordance(target, prob)

perf = bcdiag(target, prob)

kp = ksplot(perf)
png(kp, "ksplot.png")

rp = rocplot(perf)
png(rp, "rocplot.png")

bp = biasplot(perf)
png(bp, "biasplot.png")

ap = accuracyplot(perf)
png(ap, "accuracyplot.png")

lp = liftcurve(perf)
png(lp, "liftcurve.png")

clp = cumliftcurve(perf)
png(clp, "cumliftcurve.png")

liftable(perf)

cumliftable(perf)
