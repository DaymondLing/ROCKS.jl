# Kolmogorov-Smirnov Test

[Kolmogorov-Smirnov test](https://en.wikipedia.org/wiki/Kolmogorov%E2%80%93Smirnov_test)
is a test of the equivalence of two distributions.
The test is based on finding the maximum separation between the two cumulative
distribution functions (CDF) and determining the p-value of the test statistic.

For binary classifiers, the predicted probabilities of the two classes should be
different, thus the interest isn't whether the probability distributions
are different, rather, it is how large is the maximal separation and
where does it occur.

Let's generate some data to illustrate the idea.

```@example kstest
using Plots
using Random
using Distributions

Random.seed!(123)

n100a = rand(Normal(100, 10), 1000)
n100b = rand(Normal(100, 10), 1000)
n120  = rand(Normal(120, 10), 1000)
n140  = rand(Normal(140, 10), 1000)

histogram(n100a, nbins = 50, opacity= 0.3)
histogram!(n100b, nbins = 50, opacity= 0.3, legend = nothing)
png("kstest-1.png"); nothing # hide
```

![](kstest-1.png)

Their empirical culumative distribution function can be ploted as follows: 
```@example kstest
function viewcdf(pl, v)
    len = length(v)
    pl(sort(v), (1:len) ./ len, 
    xlabel = "sample", ylabel = "Probability", 
    title = "Empirical Cumluative Distribution", legend = nothing)
end

viewcdf(plot, n100a)
viewcdf(plot!, n100b)
png("kstest-1cdf.png"); nothing # hide
```

![](kstest-1cdf.png)

We can use the `kstest` function to find the maximum separation and its location.
The required input is a vector designating the two classes and another vector of
the values, this is the typical data structure of model scoring on
development or validation data.

```@example kstest
using ROCKS

cls = [fill(0, length(n100a)); fill(1, length(n100b))]
values = [n100a; n100b]
kstest(cls, values)
```

`kstest` returns results in a named tuple:

- `n`, total number of observations
- `n1`, total number of observations in class 1
- `n0`, total number of observations in class 0
- `baserate`, n1 / n, the incidence rate of class 1
- `ks`, the maximum separation between CDF1 and CDF0, a value between [0, 1]
- `ksarg`, argmax, the value where maximum separation is achieved
- `ksdep`, depth of argmax in the sorted values (default sort is from high to low)

ks of 0 means the distributions are indistinguishable,
ks of 1 says the two distributions are complete separable.
These two distributions have negligible separation since they are drawn from the
same distribution.

We now test on moderate separation:

```@example kstest
histogram(n100a, nbins = 50, opacity= 0.3)
histogram!(n120, nbins = 50, opacity= 0.3, legend = nothing)
png("kstest-2.png"); nothing    # hide
```

![](kstest-2.png)

```@example kstest
cls = [fill(0, length(n100a)); fill(1, length(n120))]
values = [n100a; n120]
kstest(cls, values)
```

There's considerable separation between the classes, and ks is larger than before.

Let's test on widely separately data:

```@example kstest
histogram(n100a, nbins = 50, opacity= 0.3)
histogram!(n140, nbins = 50, opacity= 0.3, legend = nothing)
savefig("kstest-3.svg"); nothing    # hide
```

![](kstest-3.svg)

```@example kstest
cls = [fill(0, length(n100a)); fill(1, length(n140))]
values = [n100a; n140]
kstest(cls, values)
```

We can see that the two classes are nearly separable and
ks is now quite high at 0.949.
These examples illustrate how `ks` can serve as an indicator of the ability to
separate the two classes.
