# ROCKS.jl

A set of functions for ROC, KS, Concordance, lift curves of Binary Classifier.
Designed for adequate performance on large datasets, lets industry practitioners
get to the performance metrics quickly.

[![Stable](https://img.shields.io/badge/docs-stable-blue.svg)](https://DaymondLing.github.io/ROCKS.jl/stable)
[![Dev](https://img.shields.io/badge/docs-dev-blue.svg)](https://DaymondLing.github.io/ROCKS.jl/dev)
[![Build Status](https://github.com/DaymondLing/ROCKS.jl/workflows/CI/badge.svg)](https://github.com/DaymondLing/ROCKS.jl/actions)
[![Coverage](https://codecov.io/gh/DaymondLing/ROCKS.jl/branch/master/graph/badge.svg)](https://codecov.io/gh/DaymondLing/ROCKS.jl)

## Installation

This package is installable via its URL:

```
] add https://github.com/DaymondLing/ROCKS.jl
```

## Purpose

The purpose of ROCKS.jl is to make it easy for industry practitioners to evaluate
the performance of a binary classifier.
It provides the following capabilities:

Kolmogoriv-Smirnov statistic:
- `kstest`, 2 sample Kolmogorov-Smirnov point estimate and location

Area under Receiver Operating Characteristic:
- `auroc`, Area Under Receiver Operatin Characteristics curve via
    concordance calculation rather than numeric integration

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

## Project Status

This is work in progress, development is against the more recent versions of
Julia, e.g., 1.4 and up.
