# ROCKS.jl

[![Stable](https://img.shields.io/badge/docs-stable-blue.svg)](https://DaymondLing.github.io/ROCKS.jl/dev)
[![Build Status](https://github.com/DaymondLing/ROCKS.jl/workflows/CI/badge.svg)](https://github.com/DaymondLing/ROCKS.jl/actions)
[![Coverage](https://codecov.io/gh/DaymondLing/ROCKS.jl/branch/master/graph/badge.svg)](https://codecov.io/gh/DaymondLing/ROCKS.jl)

`ROCKS` stands for ROC (Receiver Operating Characteristic)
and KS (Kolmogorov-Smirnov Statistic).

Whether building a binary classifier or auditing one built by someone else,
there are many things we'd like to know about its performance characteristics.
The functions in this package makes it easy to calculate
ROC and KS for large problems, e.g., millions of rows,
and produce graphs and tables as model performance documentation.

![KSPlot](./assets/ksplot.png)

![ROCPlot](./assets/rocplot.png)

## Installation

This package is installable via its URL:

```
] add https://github.com/DaymondLing/ROCKS.jl
```

## Functionalities

C-statistic or Area under Receiver Operating Characteristics:
- `roc` computes the C-statistic or Area Under Receiver Operating Characteristic
curve via concordance calculation.
Concordance, while producing the same results as numeric integration
of area under the ROC curve, is more generally useful beyond ROC.

Kolmogorov-Smirnov statistic:
- `kstest`, 2 sample Kolmogorov-Smirnov separation and location estimate

Plots and Tables:
- `bcdiag`, wrapper for `kstest` and `roc` that facilitates using the functions below
- `ksplot`, plot of Kolmogorov-Smirnov separation
- `rocplot`, ROC plot
- `biasplot`, plot of actual response rate vs. predicted probability
- `accuracyplot`, plot of model accuracy given utility values for [TP, FN, FP, TN]
- `liftcurve`, actual and predicted lift curves
- `cumliftcurve`, cumulative actual and predicted lift curves
- `liftable`, actual and predicted lift tables
- `cumliftable`, cumulative actual and predicted lift tables
