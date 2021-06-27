# ROCKS.jl

[![Stable](https://img.shields.io/badge/docs-stable-blue.svg)](https://DaymondLing.github.io/ROCKS.jl/dev)
[![Build Status](https://github.com/DaymondLing/ROCKS.jl/workflows/CI/badge.svg)](https://github.com/DaymondLing/ROCKS.jl/actions)
[![Coverage](https://codecov.io/gh/DaymondLing/ROCKS.jl/branch/master/graph/badge.svg)](https://codecov.io/gh/DaymondLing/ROCKS.jl)

`ROCKS` stands for ROC (C-statistic, Receiver Operating Characteristic)
and KS (Kolmogorov-Smirnov Statistic).

Whether building a binary classifier or auditing one built by someone else,
there are many things we'd like to know about its performance characteristics.
The functions in this package make it easy to calculate
ROC and KS for large problems, e.g., millions of rows,
and produce graphs and tables as model performance documentation.

These work:

![ROCPlot](docs/src/images/rocplot.png)

![KSPlot](docs/src/images/ksplot.png)

<img src="docs/src/images/ksplot.png" />

<img src="docs/src/images/ksplot.png" width="400" />

Try html tags:

<img src="../../docs/src/images/ksplot.png" />
<img src="../docs/src/images/ksplot.png" />
<img src="docs/src/images/ksplot.png" width="400" />
<img src="src/images/ksplot.png" />
<img src="images/ksplot.png" />


## Installation

This package is installable via its URL:

```
] add https://github.com/DaymondLing/ROCKS.jl
```

## Functionalities

ROC:
- `roc` computes the C-statistic (concordance statistic), also known as
Area Under Curve or Receiver Operating Characteristic
via concordance calculation rather than numeric integration.
While producing the same result, concordance is more generally useful than ROC.

Kolmogorov-Smirnov statistic:
- `kstest`, 2 sample Kolmogorov-Smirnov separation and location estimate

Plots:
- `bcdiag`, wrapper for `kstest` and `roc` that facilitates using the functions below
- `ksplot`, plot of Kolmogorov-Smirnov separation
- `rocplot`, ROC plot
- `biasplot`, plot of actual response rate vs. predicted probability
- `accuracyplot`, plot of model accuracy given utility values for [TP, FN, FP, TN]
- `liftcurve`, actual and predicted lift curves
- `cumliftcurve`, cumulative actual and predicted lift curves

The returned plot objects can be modified as necessary.

Tables:
- `liftable`, actual and predicted lift tables
- `cumliftable`, cumulative actual and predicted lift tables

DataFrame tables are returned and can be further processed as desired.

## Requirements

The core of this package is straight forward Julia code which should run
on Julia versions 1.5 or higher. 
It uses `StatsBase` and `FreqTables` for computations,
`Plots` is used for plotting,
and `DataFrames` is used to store/print output tables.