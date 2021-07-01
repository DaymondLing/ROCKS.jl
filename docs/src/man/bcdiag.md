# Binary Classifier Diagnostics

While `kstest` and `roc` provide diagnostic measures for comparing
model performance, we may want to graphs and tables to 
document its performance, `bcdiag` allows us to do this easily.

```@example bcd
using ROCKS
using Random
using Distributions
using BenchmarkTools
Random.seed!(888)
const x = rand(Uniform(-5, 5), 1_000_000)
const logit = -3.0 .+ 0.5 .* x .+ rand(Normal(0, 0.1), length(x))
const prob = @. 1.0 / (1.0 + exp(-logit))
const target = rand(length(x)) .<= prob
nothing # hide
```

`kstest`:

```@example bcd
kstest(target, prob)
```

`roc`:
```@example bcd
roc(target, prob)
```

These functions are performant:

```@example bcd
@benchmark kstest($target, $prob)
```

```@example bcd
@benchmark roc($target, $prob)
```

## bcdiag

In additional to numeric metrics, often
we would like to have plots and tables as part of final model documentation.
The `bcdiag` function allows easy generation of plots and tables.

Running `bcdiag` prints a quick summary:

```@example bcd
mdiag = bcdiag(target, prob)
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
png("bcd-ksplot.png"); nothing # hide
```

It shows where the maximum separation of the two distributions occur.

![](bcd-ksplot.png)

## rocplot

`rocplot` plots the true positive rate vs. false positive rate (depth is implicit).

```@example bcd
rocplot(mdiag)
png("bcd-rocplot.png"); nothing # hide
```

A perfect model has auc of 1, a random model has auc of 0.5.

![](bcd-rocplot.png)

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
png("bcd-biasplot.png"); nothing # hide
```

![](bcd-biasplot.png)

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
png("bcd-accuracyplot.png"); nothing # hide
```

![](bcd-accuracyplot.png)

## liftcurve

`liftcurve` plots the actual response and predicted response versus depth,
with baserate as 1.

```@example bcd
liftcurve(mdiag)
png("bcd-liftcurve.png"); nothing # hide
```

We can easily see where the model is performing better than average,
approximately the same as average, or below average.

![](bcd-liftcurve.png)

## cumliftcurve

`cumliftcurve` is similar to `liftcurve`, the difference is it is a plot
of *cumulative* response rate from the top of the model.

```@example bcd
cumliftcurve(mdiag)
png("bcd-cumliftcurve.png"); nothing # hide
```

![](bcd-cumliftcurve.png)

## Tables

`bcdiag` uses 100 as the default number of groups, this is good for
generating plots above.

For tables such as decile reports, we may want
to run `bcdiag` with only 10 groups and then generate the tables:

```@example bcd
mdiag10 = bcdiag(target, prob; groups = 10)
```

## liftable

`liftable` is the table from which `liftcurve` is plotted.

```@example bcd
liftable(mdiag10)
```

## cumliftable

`cumliftable` is the *cumulative* version of `liftable`.

```@example bcd
cumliftable(mdiag10)
```
