# ROC

A good binary classifier should have high sensitivity
(able to recognize True Positive) and high specificity
(able to recognize True Negatives, hence have low False Positive).
A plot of the trade-off curve of True Positive Rate versus False Positive Rate
at various cutoff probabilities is called the
Receiver Operating Characteristic (ROC) curve.
One way to quantify performance is by the area under the ROC curve,
often abbreviated as AUC or C,
many packages compute AUC via numeric integration of the ROC curve.
AUC is in the range [0, 1], a perfect model has AUC of 1,
a random model has AUC of 0.5,
and a perfectly backwards model would have AUC of -1.

There is another interpretation of AUC which provides more intuition than
simply as the area under a curve.
If we make all possible pair-wise comparisons between the probabilities of
class 1 with class 0, we can count the incidences of:

- Concordant: class 1 probability > class 0 probability
- Tied: class 1 probability ≈ class 0 probability
- Discordant: class 1 probability < class 0 probability

Then we can compute:

- AUC: (Concordant + 0.5 Tied) / (N1 * N0)
- Gini: 2AUC - 1, or (Concordant - Discordant) / (N1 * N0)
- Goodman-Kruskal Gamma: (Concordant - Discordant) / (Concordant + Discordant), no penalty for Tied
- Kendall's Tau: (Concordant - Discordant) / (0.5 * (N1+N0) * (N1+N0-1))

We can interpret AUC as the percentage of time class 1 probabilities is larger
than class 0 probabilities (ignoring ties).

The mathematical proof can be found at
[Stack Exchange](https://stats.stackexchange.com/questions/180638/how-to-derive-the-probabilistic-interpretation-of-the-auc)
and
[Professor David J. Hand's article](https://pdfs.semanticscholar.org/1fcb/f15898db36990f651c1e5cdc0b405855de2c.pdf).

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
; # hide
```
 
Now compute roc:

```@example roc
roc(target, prob)
```

`roc` returns results in a named tuple:

- `conc`, number of concordant comparisons
- `tied`, number of tied comparisons
- `disc`, number of discordant comparisons
- `auc`, area under ROC curve, or just area under curve
- `gini`, 2auc - 1

## Concordance

`roc` is just a synonym for the `concordance` function.
We can use it in a more general setting of comparing two distributions.

```example roc
using Random
using Distributions
using StatsBase

Random.seed!(123)
w1 = rand(Weibull(1.3, 30_000), 100_000)
w2 = rand(Weibull(1.3, 33_000), 100_000)

mean(w1), mean(w2)
```

## Fixed width tied region

Values +/- 1,000 are considered ties:

```@example roc
cls = [fill(0, length(n100)); fill(1, length(n140))]
values = [n100; n140]
concordance(cls, values, 1_000)
```

## Percentage width tied range

Values within 10% are tied:

```@example roc
pct(x) = 0.9*x, 1.1*x

concordance(cls, values, pct)
```
