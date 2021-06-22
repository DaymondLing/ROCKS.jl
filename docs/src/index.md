# ROCKS.jl

`ROCKS` is a set of functions for ROC, Concordance, KS, lift curves and tables of a Binary Classifier.
They are designed to let industry practitioners easily understand the performance characteristics
of a binary classifier with adequate speed on large datasets.

## Installation

This package is installable via its URL:

```
] add https://github.com/DaymondLing/ROCKS.jl
```

## Functionalities

`ROCKS` provides the following capabilities:

Area under Receiver Operating Characteristics:
- `roc`, Area Under Receiver Operating Characteristics curve via
    concordance calculation, same results but more informative than numeric integration

Kolmogoriv-Smirnov statistic:
- `kstest`, 2 sample Kolmogorov-Smirnov point estimate and location

Binary Classifier performance plots:
- `bcdiag`, wrapper for `kstest` and `auroc` that facilitates plotting
    the graphs below
- `ksplot`, plot of Kolmogorov-Smirnov separation
- `rocplot`, ROC plot
- `biasplot`, plot of actual response rate vs. predicted probability
- `accuracyplot`, plot of model accuracy given utility values for [TP, FN, FP, TN]
- `liftcurve`, actual and predicted lift curves
- `cumliftcurve`, cumulative actual and predicted lift curves
- `liftable`, actual and predicted lift tables
- `cumliftable`, cumulative actual and predicted lift tables
