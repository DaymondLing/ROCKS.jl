# ROC

A good binary classifier should have high sensitivity
(able to recognize True Positive, low False Negative) and high specificity
(able to recognize True Negatives, low False Positive).
A plot of the trade-off curve of True Positive Rate versus False Positive Rate
at various cutoff probabilities is called the
Receiver Operating Characteristic (ROC) curve.
One way to quantify performance is by the area under the ROC curve,
often abbreviated as AUC or C.

AUC is in the range [0, 1], a perfect model has AUC of 1,
a random model has AUC of 0.5,
and a perfectly backwards model would have AUC of -1.

## Example

Create data:

```@example roc
using ROCKS
using Random
using Distributions

Random.seed!(888)
const x = rand(Uniform(-5, 5), 1_000_000)
const logit = -3.0 .+ 0.5 .* x .+ rand(Normal(0, 0.1), length(x))
const prob = @. 1.0 / (1.0 + exp(-logit))
const target = rand(length(x)) .<= prob
nothing # hide
```
 
Now compute roc:

```@example roc
roc(target, prob)
```

`auc` is the area under ROC curve.

## Concordance

Many packages compute AUC via numeric integration of area under the ROC curve.
There is another interpretation of AUC which provides more intuition than
simply as the area under a curve.

If we make all possible pair-wise comparisons between the probabilities of
class 1 with class 0, we can count the incidences of:

- Concordant: class 1 probability > class 0 probability
- Tied: class 1 probability ≈ class 0 probability
- Discordant: class 1 probability < class 0 probability

We can then compute the following metrics:

- AUC: (Concordant + 0.5 Tied) / (N1 * N0)
- Gini: 2AUC - 1, or (Concordant - Discordant) / (N1 * N0)
- Goodman-Kruskal Gamma: (Concordant - Discordant) / (Concordant + Discordant),
no penalty for Tied
- Kendall's Tau: (Concordant - Discordant) / (0.5 * (N1+N0) * (N1+N0-1))

When there are few ties, AUC is the percent of concordant pairs,
this is where the name C-statistic or Concordance-statistic came from.
The mathematical proof can be found at
[Stack Exchange](https://stats.stackexchange.com/questions/180638/how-to-derive-the-probabilistic-interpretation-of-the-auc)
and
[Professor David J. Hand's article](https://pdfs.semanticscholar.org/1fcb/f15898db36990f651c1e5cdc0b405855de2c.pdf).


In this package, `roc` is just a synonym for the `concordance` function,
it returns a named tuple:

- `conc`, number of concordant comparisons
- `tied`, number of tied comparisons
- `disc`, number of discordant comparisons
- `auc`, area under ROC curve, or just area under curve
- `gini`, 2auc - 1

## Fixed width tied region

We can use `concordance` in the more general setting of comparing two 
distributions with control over tied definitions.

Let's create two weibull distributions,

```@example roc
using Random
using Distributions
using StatsBase

Random.seed!(123)
w1 = rand(Weibull(1.3, 30_000), 100_000)
w2 = rand(Weibull(1.3, 33_000), 100_000)

mean(w1), mean(w2)
```

If we consider values within +/- 1,000 as ties:

```@example roc
cls = [fill(0, length(w1)); fill(1, length(w2))]
values = [w1; w2]
c = concordance(cls, values, 1_000)
```

We can compute percentages as follows:

```@example roc
tot = c.conc + c.tied + c.disc
println("Concordant %: ", round(c.conc/tot, digits=4),
        "\nTied       %: ", round(c.tied/tot, digits=4),
        "\nDiscordant %: ", round(c.disc/tot, digits=4))
```

We can interpret it as, if cls[2] on aggregate has higher value than cls[1],
the statement is true concordant% of the time,
the statement is neither true or false tied% of the time,
the statement is false discordant% of the time.
Whereas the simplistic global statement suggests it is true all the time,
we now know the extent to which it is true and can argue that it is in fact
false discordant% of the time and assess decisions made based
on better insights.

## Percentage tied range

Rather than a fixed tied region, it may be appropriate to have variable
tied region, e.g., when comparing income, it would be better to use
a percentage rather than fixed amount.

Here's an example where values within 10% are considered as tied:

```@example roc
c = concordance(cls, values, x -> (0.9*x, 1.1*x))
tot = c.conc + c.tied + c.disc
println("Concordant %: ", round(c.conc/tot, digits=4),
        "\nTied       %: ", round(c.tied/tot, digits=4),
        "\nDiscordant %: ", round(c.disc/tot, digits=4))
```
