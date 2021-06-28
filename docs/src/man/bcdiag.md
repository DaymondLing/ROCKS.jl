# Binary Classifierr Diagnostics

While `kstest` and `roc` provide diagnostic measures for comparing
model performance, when there is a model of interest,
it is likely that we need to produce many graphs and table to understand and
document its performance, `bcdiag` allows us to do this easily.

```@example bcd
using ROCKS
using Random
using GLM
using DataFrames

function logitgen(intercept::Real, slope::Real, len::Int; seed = 888)
    Random.seed!(seed)
    x = 10 .* rand(len)                     # random uniform [0, 10)
    # sort!(x)                                # x ascending
    logit = @. intercept + slope * x        # logit(prob) = ln(p / (1 + p)) = linear equation
    prob = @. 1. / (1. + exp(-logit))       # probability
    y = rand(len) .<= prob
    y, x
end

y, x = logitgen(-3, 0.6, 100_000)

m = DataFrame(target=y, x=x)
m_logistic = glm(@formula(target ~ x), m, Binomial(), LogitLink())
m.pred = predict(m_logistic)

kstest(m.target, m.pred)
```

```@example bcd
roc(m.target, m.pred)
```

Running `bcdiag` prints a quick summary:

```@example bcd
mdiag = bcdiag(m.target, m.pred)
```

The output structure allows us to create the following plots and tables to understand:
- the ability of the model to separate the two classes
- the accuracy of the probability point estimates
- how to set cutoff for maximum accuracy
- performance of the model at varying cutoff depth

## ksplot

`ksplot` plots the cumulative distribution of class 1 (true positive rate)
and class 0 (false positive rate) versus depth.

```@example bcd
ksplot(mdiag)
savefig("bcd-ksplot.svg"); nothing # hide
```

It shows where the maximum separation of the two distributions occur.

![](bcd-ksplot.svg)

## rocplot

`rocplot` plots the true positive rate vs. false positive rate (depth is implicit).

```@example bcd
rocplot(mdiag)
savefig("bcd-rocplot.svg"); nothing # hide
```

A perfect model has auc of 1, a random model has auc of 0.5.

![](bcd-rocplot.svg)

## biasplot

Both `ksplot` and `rocplot` rely on the ability of the model to
rank order the observations, the score value itself doesn't matter.
For example, if you took the score and perform any monotonic transform,
`ks` and `auc` wouldn't change.
There are occasions where the score value does matter, where the probabilities
need to be accurate, for example, in expected return calculations.
Thus, we need to understand whether the probabilities are accurate,
`biasplot` does this by plotting the observed response rate versus
predicted response rate to look for systemic bias.
This is also called the *calibration* graph.

```@example bcd
biasplot(mdiag)
savefig("bcd-biasplot.svg"); nothing # hide
```

![](bcd-biasplot.svg)

An unbiased model would lie on the diagnonal, systemic shift off the diagonal
represents over or under estimate of the true probability.

## accuracyplot

People often refer to **(TP + TN) / N** as accuracy of the model,
that is, the ability to correctly identify correct cases.
It is used to compare model performance as well - model with higher accuracy
is a better model.
For a probability based classifier, a cutoff is required to turn probability
to predicted class. So, what is the cutoff value to use to achieve
maximum accuracy?

There are many approaches to setting the best cutoff, one way is to
assign utility values to the four outcomes of [TP, FP, FN, TN] and
maximize the sum across different cutoff's.
Accuracy measure uses the utility values of [1, 0, 0, 1] giving TP + TN.
You can assign negative penalty terms for misclassification as well.

Note that this is different from `kstest` - maximum separation on cumulative
distribution (normalized to 100%) does not account for class size difference,
e.g., class 1 may be only 2% of the cases.

```@example bcd
accuracyplot(mdiag)
savefig("bcd-accuracyplot.svg"); nothing # hide
```

![](bcd-accuracyplot.svg)

## liftcurve

`liftcurve` plots the actual response and predicted response versus depth,
with baserate as 1.

```@example bcd
liftcurve(mdiag)
savefig("bcd-liftcurve.svg"); nothing # hide
```

We can easily see where the model is performing better than average,
approximately the same as average, or below average.

![](bcd-liftcurve.svg)

## cumliftcurve

`cumliftcurve` is similar to `liftcurve`, the difference is it is a plot
of *cumulative* response rate from the top of the model.

```@example bcd
cumliftcurve(mdiag)
savefig("bcd-cumliftcurve.svg"); nothing # hide
```

![](bcd-cumliftcurve.svg)

## liftable

`liftable` is the table from which `liftcurve` is plotted.

```@example bcd
liftable(mdiag)
```

## cumliftable

`cumliftable` is the *cumulative* version of `liftable`.

```@example bcd
cumliftable(mdiag)
```
