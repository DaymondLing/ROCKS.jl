# ROCKS.jl

Two of the commonly used metrics to evaluate the performance of
a binary classifier are:
- C-Statistic (concordance statistic) or Area Under Curve or just ROC
(Receiver Operating Characteristic)
- KS-Statistic

This package makes it easy to calculate ROC and KS, and produce
graphs and tables for documentation purposes.

## Installation

This package is installable via its URL:

```
] add https://github.com/DaymondLing/ROCKS.jl
```

## Requirements

The core of this package is straight forward Julia code which should run
on Julia versions 1.4 or higher.
It also uses other packages such as `StatsBase`, `FreqTables` and `Plots`.
`DataFrames` is used to store output documentation tables.
