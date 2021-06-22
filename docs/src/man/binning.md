# Binning

Binning is a frequent operation in Data Science which groups a
continuous variable into a number of discrete bins.
There are numerous ways of doing this:

1. You have specific cut points in mind, perhaps industry norms
2. You are interested in specific quantile bins
3. You want N groups with equal density
4. You want equal width bins like a histogram
5. You want to highlight the pareto nature of a variable

Let's create a random vector:
```@example bin
using Random, Distributions
Random.seed!(888)
x = rand(Normal(100, 10), 500);
```

## Known cut points

The `CategoricalArrays` package has a `cut` function that creates
a `CategoricalArray` data structure which is the binned vector:

```@example bin
using CategoricalArrays                 # create categorical vectors
using FreqTables                        # package to produce frequency tables

cuts = [80, 90, 100, 110, 120]          # interior cut points
xc = cut(x, cuts, extend = true);       # must extend end points for interior cuts
typeof(xc)
```

### Is it ordered

```@example bin
isordered(xc)
```

### What are the levels

```@example bin
levels(xc)
```

### Internal bin number

```@example bin
levels(xc.refs)             # CategoricalArray uses UInt32
```

### Frequency count

```@example bin
freqtable(xc)
```

## Missing values in the data

If the data contains missing values, `cut` will create missing levels

```@example bin
using Missings

xm = allowmissing(x)                # vector that allows missing values
ix = rand(1:length(xm), 20)
xm[ix] .= missing

xmc = cut(xm, cuts, extend = true)
levels(xmc)
```

Unfortunately, `levels` does not indicate there is a missing level.
It would be more informative if it did inform the user.
The missing level does show up on the frequency tables

```@example bin
freqtable(xmc)
```

```@example bin
freqtable(xmc.refs)         # 0 is bin number for missing
```

## Quantile cuts







## N equal density groups


## N equal width groups

Histogram cuts.




## N equal value groups

Pareto cuts
