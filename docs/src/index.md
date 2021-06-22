# DSUtils.jl

The intent of DSUtils is to make it easy for industry practitioners to
get their work done.
It provides functions for some routine parts of data science workflow
so that people can focus on problem solving and not break their train
of thought.
The functions should just work and be reasonably performant
on millions of rows of data.

There are no new capabilities per se, indeed, many of the functionalities
are available in other packages.
It is an end user package for people to get their analysis done rather than
a package for others to build packages with.

## Installation

This package is not registered in Julia's general registry yet.
You can add it via its URL:

```
] add https://github.com/DaymondLing/DSUtils.jl
```

## Current capabilities

- Binary classifier performance evaluation
    - `kstest`, 2 sample Kolmogorov-Smirnov separation point estimate and location
    - `auroc`, Area Under Receiver Operating Characteristics curve via
        concordance calculation rather than numeric integration
    - `bcdiag`, wrapper for `kstest` and `auroc` that facilitates
        plotting the graphs and generating tables below
    - `ksplot`, plot of Kolmogorov-Smirnov 2 sample CDF separation
    - `rocplot`, ROC plot
    - `biasplot`, plot of actual response rate vs. predicted probability
    - `accuracyplot`, plot of accuracy given utility values for [TP, FN, FP, TN]
    - `liftcurve`, actual and predicted lift curves
    - `cumliftcurve`, cumulative actual and predicted lift curves
    - `liftable`, actual and predicted lift tables
    - `cumliftable`, cumulative actual and predicted lift tables
    - `infovalue`, change in two frequency distributions

- Binning
    - `ranks`, equal density binning, tied values are always in the same bin

- Dummy encoding
    - `onehot!`, one hot encode a categorical variable, works with missing level
        and missing data, output indicator variables are in a DataFrame
        with named columns

- Missing computation
    - `sumxm`, sum a collection of scalars or vectors (element-wise) treating missing as 0

## Project Status

This is work in progress, development is done on Julia 1.5 although there's
nothing special about the code that would prevent it from working on older
versions of Julia.
